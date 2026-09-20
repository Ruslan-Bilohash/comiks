<?php
/* Комікс·Lab — спільне ядро API (PHP 8.1+, MySQL/MariaDB або SQLite для локальних тестів).
 * Підключається з auth.php, players.php, wall.php. Напряму не відкривається.
 *
 * Безпека:
 *  - усі запити до БД — підготовлені (PDO, emulate prepares off);
 *  - паролі — password_hash (Argon2id, якщо доступний; інакше bcrypt);
 *  - сесія — випадковий токен у cookie HttpOnly + Secure + SameSite=Lax, у БД лише sha256;
 *  - CSRF — кожен POST має заголовок X-Komiks: 1 (крос-доменний запит так не надішле) + перевірка Origin;
 *  - ліміти частоти в таблиці rate; помилки без деталей назовні (деталі — в error_log).
 */
declare(strict_types=1);
if (!defined('KOMIKS_API')) { http_response_code(404); exit; }

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');

function out(array $a, int $status = 200): void { http_response_code($status); echo json_encode($a, JSON_UNESCAPED_UNICODE); exit; }
function fail(string $err, int $status = 400, array $extra = []): void { out(['ok' => false, 'error' => $err] + $extra, $status); }

/* ---------- налаштування ---------- */
function cfg(?string $key = null) {
  static $c = null;
  if ($c === null) {
    $file = __DIR__ . '/config.php';
    if (!is_file($file)) fail('not_configured', 503);
    $c = require $file;
    if (!is_array($c)) fail('not_configured', 503);
  }
  if ($key === null) return $c;
  $v = $c;
  foreach (explode('.', $key) as $k) { if (!is_array($v) || !array_key_exists($k, $v)) return null; $v = $v[$k]; }
  return $v;
}
function site_url(): string { return rtrim((string)cfg('site_url'), '/') . '/'; }

set_exception_handler(function (Throwable $e) { error_log('[komiks-api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine()); fail('server', 500); });

/* ---------- база даних ---------- */
function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;
  $d = cfg('db');
  $pdo = new PDO($d['dsn'], $d['user'] ?? null, $d['pass'] ?? null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES => false,
  ]);
  if (is_mysql()) $pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
  else $pdo->exec('PRAGMA foreign_keys = ON');
  migrate($pdo);
  seed_demo_users();
  return $pdo;
}
function is_mysql(): bool { return str_starts_with((string)cfg('db.dsn'), 'mysql:'); }
function q(string $sql, array $args = []): PDOStatement { $st = db()->prepare($sql); $st->execute($args); return $st; }
function one(string $sql, array $args = []): ?array { $r = q($sql, $args)->fetch(); return $r ?: null; }
// вставка або оновлення за первинним ключем (MySQL: ON DUPLICATE KEY, SQLite: ON CONFLICT)
function upsert(string $table, array $keys, array $row): void {
  $cols = array_keys($row);
  $ph = implode(',', array_fill(0, count($cols), '?'));
  $upd = array_values(array_diff($cols, $keys));
  if (is_mysql()) $sql = "INSERT INTO $table (" . implode(',', $cols) . ") VALUES ($ph) ON DUPLICATE KEY UPDATE " . implode(',', array_map(fn($c) => "$c=VALUES($c)", $upd));
  else $sql = "INSERT INTO $table (" . implode(',', $cols) . ") VALUES ($ph) ON CONFLICT(" . implode(',', $keys) . ") DO UPDATE SET " . implode(',', array_map(fn($c) => "$c=excluded.$c", $upd));
  q($sql, array_values($row));
}

const SCHEMA_VERSION = 5;
function migrate(PDO $pdo): void {
  $my = is_mysql();
  $pk = $my ? 'INT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
  $eng = $my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci' : '';
  $pdo->exec("CREATE TABLE IF NOT EXISTS kl_meta (k VARCHAR(40) PRIMARY KEY, v VARCHAR(255) NOT NULL)$eng");
  $st = $pdo->prepare('SELECT v FROM kl_meta WHERE k = ?'); $st->execute(['schema']);
  if ((int)($st->fetchColumn() ?: 0) >= SCHEMA_VERSION) return;
  $uid = $my ? 'INT UNSIGNED' : 'INTEGER';
  $tables = [
    "CREATE TABLE IF NOT EXISTS kl_users (id $pk, email VARCHAR(190) NOT NULL UNIQUE, name VARCHAR(40) NOT NULL, pass_hash VARCHAR(255) NOT NULL, lang VARCHAR(5) NOT NULL DEFAULT 'en', friend_code CHAR(6) NOT NULL UNIQUE, share_profile TINYINT NOT NULL DEFAULT 0, verified_at INT NULL, created_at INT NOT NULL, last_login INT NULL, consent_at INT NOT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_tokens (token_hash CHAR(64) PRIMARY KEY, user_id $uid NOT NULL, kind VARCHAR(12) NOT NULL, expires_at INT NOT NULL, used_at INT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_sessions (token_hash CHAR(64) PRIMARY KEY, user_id $uid NOT NULL, created_at INT NOT NULL, expires_at INT NOT NULL, last_seen INT NOT NULL, ua VARCHAR(190) NOT NULL DEFAULT '')$eng",
    "CREATE TABLE IF NOT EXISTS kl_user_data (user_id $uid NOT NULL, k VARCHAR(64) NOT NULL, v MEDIUMTEXT NOT NULL, updated_at INT NOT NULL, PRIMARY KEY (user_id, k))$eng",
    "CREATE TABLE IF NOT EXISTS kl_rate (k VARCHAR(100) PRIMARY KEY, n INT NOT NULL, reset_at INT NOT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_players (code CHAR(6) PRIMARY KEY, user_id $uid NULL, secret_hash CHAR(64) NOT NULL, name VARCHAR(40) NOT NULL, avatar VARCHAR(80) NOT NULL, learn VARCHAR(80) NOT NULL, level VARCHAR(3) NOT NULL, stars INT NOT NULL, badges INT NOT NULL, streak INT NOT NULL, act VARCHAR(16) NOT NULL, snap TEXT NOT NULL, seen INT NOT NULL, updated INT NOT NULL, since INT NOT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_walls (owner CHAR(6) PRIMARY KEY, secret_hash CHAR(64) NULL, open TINYINT NOT NULL DEFAULT 1)$eng",
    "CREATE TABLE IF NOT EXISTS kl_comments (id CHAR(12) PRIMARY KEY, owner CHAR(6) NOT NULL, name VARCHAR(40) NOT NULL, avatar VARCHAR(80) NOT NULL, text VARCHAR(1200) NOT NULL, akey_hash CHAR(64) NOT NULL, created_at INT NOT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_captcha_used (nonce CHAR(16) PRIMARY KEY, exp INT NOT NULL)$eng",
    // v3: запрошення від преміум-друзів, тимчасові блокування стін, попередження модератора
    "CREATE TABLE IF NOT EXISTS kl_invites (code_hash CHAR(64) PRIMARY KEY, inviter_id $uid NOT NULL, created_at INT NOT NULL, expires_at INT NOT NULL, used_by $uid NULL, used_at INT NULL)$eng",
    "CREATE TABLE IF NOT EXISTS kl_bans (id $pk, user_id $uid NULL, ip_hash CHAR(64) NULL, until_at INT NOT NULL, reason VARCHAR(120) NOT NULL DEFAULT '', by_id $uid NULL, created_at INT NOT NULL)$eng",
    // v4: особисті повідомлення й блокування
    "CREATE TABLE IF NOT EXISTS kl_messages (id $pk, from_id $uid NOT NULL, to_id $uid NOT NULL, text VARCHAR(1000) NOT NULL, created_at INT NOT NULL, read_at INT NULL, reported_at INT NULL, hidden_from TINYINT NOT NULL DEFAULT 0, hidden_to TINYINT NOT NULL DEFAULT 0)$eng",
    "CREATE TABLE IF NOT EXISTS kl_blocks (user_id $uid NOT NULL, blocked_id $uid NOT NULL, created_at INT NOT NULL, PRIMARY KEY (user_id, blocked_id))$eng",
    "CREATE TABLE IF NOT EXISTS kl_notices (id $pk, user_id $uid NULL, ip_hash CHAR(64) NULL, kind VARCHAR(12) NOT NULL, text VARCHAR(300) NOT NULL DEFAULT '', by_id $uid NULL, created_at INT NOT NULL, seen_at INT NULL)$eng",
  ];
  foreach ($tables as $t) $pdo->exec($t);
  foreach (['CREATE INDEX kl_tokens_user ON kl_tokens (user_id)', 'CREATE INDEX kl_sessions_user ON kl_sessions (user_id)', 'CREATE INDEX kl_comments_owner ON kl_comments (owner, created_at)', 'CREATE INDEX kl_players_seen ON kl_players (seen)'] as $ix) {
    try { $pdo->exec($ix); } catch (Throwable $e) { /* індекс уже є */ }
  }
  // v2: ролі та блокування (ALTER — лише якщо стовпця ще немає)
  foreach (['is_admin TINYINT NOT NULL DEFAULT 0', 'blocked_at INT NULL', 'is_moderator TINYINT NOT NULL DEFAULT 0', 'premium TINYINT NOT NULL DEFAULT 0', 'can_invite TINYINT NOT NULL DEFAULT 0', 'msg_pref TINYINT NOT NULL DEFAULT 1', 'premium_until INT NULL', "invited_by $uid NULL", 'is_demo TINYINT NOT NULL DEFAULT 0'] as $col) {
    try { $pdo->exec("ALTER TABLE kl_users ADD COLUMN $col"); } catch (Throwable $e) { /* уже є */ }
  }
  foreach (["user_id $uid NULL", 'ip_hash CHAR(64) NULL'] as $col) {
    try { $pdo->exec("ALTER TABLE kl_comments ADD COLUMN $col"); } catch (Throwable $e) { /* уже є */ }
  }
  foreach (['CREATE INDEX kl_bans_user ON kl_bans (user_id)', 'CREATE INDEX kl_bans_ip ON kl_bans (ip_hash)', 'CREATE INDEX kl_notices_user ON kl_notices (user_id)', 'CREATE INDEX kl_invites_inviter ON kl_invites (inviter_id)', 'CREATE INDEX kl_msg_to ON kl_messages (to_id, read_at)', 'CREATE INDEX kl_msg_pair ON kl_messages (from_id, to_id, created_at)'] as $ix) {
    try { $pdo->exec($ix); } catch (Throwable $e) { /* уже є */ }
  }
  import_legacy_files($pdo);
  $st = $pdo->prepare($my ? 'REPLACE INTO kl_meta (k, v) VALUES (?, ?)' : 'INSERT OR REPLACE INTO kl_meta (k, v) VALUES (?, ?)');
  $st->execute(['schema', (string)SCHEMA_VERSION]);
}
// одноразово переносимо дані з попередньої файлової версії (api/data/*.php) у БД
function import_legacy_files(PDO $pdo): void {
  $dir = __DIR__ . '/data';
  if (!is_dir($dir)) return;
  $read = function (string $f) { $raw = (string)@file_get_contents($f); $g = "<?php exit; ?>\n"; if (str_starts_with($raw, $g)) $raw = substr($raw, strlen($g)); return json_decode($raw, true) ?: []; };
  $pf = "$dir/players.php";
  if (is_file($pf)) {
    $ins = $pdo->prepare('INSERT INTO kl_players (code, user_id, secret_hash, name, avatar, learn, level, stars, badges, streak, act, snap, seen, updated, since) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    foreach ($read($pf) as $p) { try { $ins->execute([$p['code'], $p['secret'], $p['name'], $p['avatar'], implode(',', $p['learn'] ?? []), $p['level'] ?? '', (int)$p['stars'], (int)$p['badges'], (int)$p['streak'], $p['act'] ?? '', $p['snap'] ?? '', (int)$p['seen'], (int)$p['updated'], (int)($p['since'] ?? $p['seen'])]); } catch (Throwable $e) { /* дубль */ } }
    @rename($pf, "$dir/players.imported.php");
  }
  foreach (glob("$dir/wall_*.php") ?: [] as $wf) {
    $w = $read($wf); $owner = substr(basename($wf, '.php'), 5);
    if (!preg_match('/^[A-HJ-NP-Z2-9]{6}$/', $owner)) continue;
    try { $pdo->prepare('INSERT INTO kl_walls (owner, secret_hash, open) VALUES (?, ?, ?)')->execute([$owner, $w['secret'] ?? null, !empty($w['open']) || !isset($w['open']) ? 1 : 0]); } catch (Throwable $e) { /* дубль */ }
    $ins = $pdo->prepare('INSERT INTO kl_comments (id, owner, name, avatar, text, akey_hash, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    foreach ($w['comments'] ?? [] as $c) { try { $ins->execute([$c['id'], $owner, $c['name'], $c['avatar'], $c['text'], $c['akey'] ?? '', strtotime($c['date']) ?: time()]); } catch (Throwable $e) { /* дубль */ } }
    @rename($wf, "$dir/" . basename($wf, '.php') . '.imported.php');
  }
}

/* ---------- запит, CSRF, ліміти ---------- */
function method(): string { return $_SERVER['REQUEST_METHOD'] ?? 'GET'; }
function input(): array {
  static $in = null;
  if ($in !== null) return $in;
  if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 262144) fail('too_big', 413);
  $in = json_decode((string)file_get_contents('php://input'), true);
  if (!is_array($in)) $in = [];
  return $in;
}
// POST лише з нашого сайту: власний заголовок (браузер не пошле його з чужого сайту без дозволу CORS) + збіг Origin
function require_csrf(): void {
  if (($_SERVER['HTTP_X_KOMIKS'] ?? '') !== '1') fail('csrf', 403);
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  if ($origin !== '') {
    $site = parse_url(site_url());
    $o = parse_url($origin);
    $okHost = ($o['host'] ?? '') === ($site['host'] ?? '') || in_array($o['host'] ?? '', (array)(cfg('dev_hosts') ?? []), true);
    if (!$okHost) fail('csrf', 403);
  }
}
function ip_hash(): string { return hash('sha256', 'ip:' . ($_SERVER['REMOTE_ADDR'] ?? '?') . ':' . cfg('secret')); }
// не більше $max подій за $window секунд для ключа; повертає true, якщо ліміт вичерпано
function limited(string $key, int $max, int $window): bool {
  $k = substr(hash('sha256', $key . ':' . cfg('secret')), 0, 40) . ':' . $window;
  $now = time();
  $row = one('SELECT n, reset_at FROM kl_rate WHERE k = ?', [$k]);
  if (!$row || $row['reset_at'] <= $now) { upsert('kl_rate', ['k'], ['k' => $k, 'n' => 1, 'reset_at' => $now + $window]); return false; }
  if ((int)$row['n'] >= $max) return true;
  q('UPDATE kl_rate SET n = n + 1 WHERE k = ?', [$k]);
  return false;
}
// лише перевірити, не рахуючи подію (для «зафіксувати після успіху»)
function peek_limited(string $key, int $max, int $window): bool {
  $k = substr(hash('sha256', $key . ':' . cfg('secret')), 0, 40) . ':' . $window;
  $row = one('SELECT n, reset_at FROM kl_rate WHERE k = ?', [$k]);
  return $row && $row['reset_at'] > time() && (int)$row['n'] >= $max;
}
function rate_or_fail(string $key, int $max, int $window): void { if (limited($key, $max, $window)) fail('slow_down', 429); }
function clean_text(string $s, int $max): string {
  $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>]/u', '', $s) ?? '';
  $s = trim(preg_replace("/\n{3,}/", "\n\n", str_replace("\r", '', $s)) ?? '');
  return preg_match('/^.{0,' . $max . '}/us', $s, $m) ? $m[0] : '';
}
function has_link(string $t): bool { return (bool)preg_match('~(https?://|www\.|\.(com|net|org|ru|ua|no|io|ly|me|gg)\b|t\.me/)~i', $t); }
function rand_hex(int $bytes = 32): string { return bin2hex(random_bytes($bytes)); }
function sha(string $s): string { return hash('sha256', $s); }

/* ---------- сесії ---------- */
const SESSION_COOKIE = 'kl_s';
const SESSION_DAYS = 30;
function cookie_opts(int $expires): array {
  $path = parse_url(site_url(), PHP_URL_PATH) ?: '/';
  $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
  return ['expires' => $expires, 'path' => $path, 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax'];
}
function start_session(int $userId): void {
  $token = rand_hex(32);
  $now = time();
  q('INSERT INTO kl_sessions (token_hash, user_id, created_at, expires_at, last_seen, ua) VALUES (?, ?, ?, ?, ?, ?)', [sha($token), $userId, $now, $now + SESSION_DAYS * 86400, $now, substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 190)]);
  q('UPDATE kl_users SET last_login = ? WHERE id = ?', [$now, $userId]);
  setcookie(SESSION_COOKIE, $token, cookie_opts($now + SESSION_DAYS * 86400));
  $_COOKIE[SESSION_COOKIE] = $token;
}
function end_session(): void {
  $t = (string)($_COOKIE[SESSION_COOKIE] ?? '');
  if ($t !== '') q('DELETE FROM kl_sessions WHERE token_hash = ?', [sha($t)]);
  setcookie(SESSION_COOKIE, '', cookie_opts(time() - 3600));
}
function current_user(): ?array {
  static $u = false;
  if ($u !== false) return $u;
  $t = (string)($_COOKIE[SESSION_COOKIE] ?? '');
  if (!preg_match('/^[a-f0-9]{64}$/', $t)) return $u = null;
  $row = one('SELECT s.token_hash, s.expires_at, s.last_seen, u.* FROM kl_sessions s JOIN kl_users u ON u.id = s.user_id WHERE s.token_hash = ?', [sha($t)]);
  if (!$row || $row['expires_at'] < time() || !empty($row['blocked_at'])) { if ($row) q('DELETE FROM kl_sessions WHERE token_hash = ?', [$row['token_hash']]); return $u = null; }
  if (time() - (int)$row['last_seen'] > 3600) q('UPDATE kl_sessions SET last_seen = ? WHERE token_hash = ?', [time(), $row['token_hash']]);
  return $u = $row;
}
function require_user(): array { $u = current_user(); if (!$u) fail('auth', 401); return $u; }
// ролі: адміністратор > модератор (чистить стіни, дає тимчасові блокування, попередження) > користувач
function is_staff(?array $u): bool { return $u && (!empty($u['is_admin']) || !empty($u['is_moderator'])); }
function role_of(array $u): string { return !empty($u['is_admin']) ? 'admin' : (!empty($u['is_moderator']) ? 'moderator' : 'user'); }
// діюче блокування стіни для користувача або IP (для гостей)
// акаунт перевіряємо лише за акаунтом; IP-блоки й попередження стосуються тільки гостей
function active_ban(?int $userId, string $ipHash): ?array {
  return $userId ? one('SELECT * FROM kl_bans WHERE until_at > ? AND user_id = ? ORDER BY until_at DESC LIMIT 1', [time(), $userId])
    : one('SELECT * FROM kl_bans WHERE until_at > ? AND user_id IS NULL AND ip_hash = ? ORDER BY until_at DESC LIMIT 1', [time(), $ipHash]);
}
function pending_notice(?int $userId, string $ipHash): ?array {
  $since = time() - 14 * 86400;
  return $userId ? one('SELECT id, kind, text, created_at FROM kl_notices WHERE seen_at IS NULL AND created_at > ? AND user_id = ? ORDER BY created_at LIMIT 1', [$since, $userId])
    : one('SELECT id, kind, text, created_at FROM kl_notices WHERE seen_at IS NULL AND created_at > ? AND user_id IS NULL AND ip_hash = ? ORDER BY created_at LIMIT 1', [$since, $ipHash]);
}
function public_user(array $u): array {
  return ['id' => (int)$u['id'], 'name' => $u['name'], 'email' => $u['email'], 'lang' => $u['lang'], 'friend_code' => $u['friend_code'], 'share_profile' => (bool)$u['share_profile'], 'verified' => !empty($u['verified_at']), 'demo' => !empty($u['is_demo']), 'created' => gmdate('c', (int)$u['created_at']),
    // преміум — безкоштовно назавжди (друзі адміністратора та запрошені ними); персонал — теж
    'premium' => !empty($u['premium']) || is_staff($u) || (!empty($u['premium_until']) && (int)$u['premium_until'] > time()), 'premium_until' => !empty($u['premium_until']) ? gmdate('c', (int)$u['premium_until']) : null, 'msg_pref' => (int)($u['msg_pref'] ?? 1), 'can_invite' => !empty($u['can_invite']) || !empty($u['is_admin']), 'role' => role_of($u)];
}

/* ---------- користувачі (спільне для auth.php, install.php, admin.php) ---------- */
const VERIFY_TTL = 48 * 3600;
const RESET_TTL = 3600;

function hash_password(string $p): string { return password_hash($p, defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT); }
function valid_email(string $e): bool { return strlen($e) <= 190 && (bool)filter_var($e, FILTER_VALIDATE_EMAIL); }
function password_problem(string $p): ?string {
  if (strlen($p) < 8) return 'pass_short';
  if (strlen($p) > 200) return 'pass_long';
  if (in_array(strtolower($p), ['12345678', '123456789', 'password', 'qwertyui', 'qwerty123', '11111111', 'passord1', 'komikslab', 'iloveyou'], true)) return 'pass_weak';
  return null;
}
function new_token(int $userId, string $kind, int $ttl): string {
  $t = rand_hex(32);
  q('UPDATE kl_tokens SET used_at = ? WHERE user_id = ? AND kind = ? AND used_at IS NULL', [time(), $userId, $kind]); // старі посилання більше не діють
  q('INSERT INTO kl_tokens (token_hash, user_id, kind, expires_at) VALUES (?, ?, ?, ?)', [sha($t), $userId, $kind, time() + $ttl]);
  return $t;
}
function take_token(string $t, string $kind): ?array {
  if (!preg_match('/^[a-f0-9]{64}$/', $t)) return null;
  $row = one('SELECT * FROM kl_tokens WHERE token_hash = ? AND kind = ?', [sha($t), $kind]);
  if (!$row || $row['used_at'] || $row['expires_at'] < time()) return null;
  q('UPDATE kl_tokens SET used_at = ? WHERE token_hash = ?', [time(), $row['token_hash']]);
  return one('SELECT * FROM kl_users WHERE id = ?', [$row['user_id']]);
}
/** Демо-учні для класу: вхід без пароля (кнопка на #/login). Коди — 6 символів без I/O/0/1. */
function demo_catalog(): array {
  return [
    ['who' => 'kaja', 'name' => 'Kaja', 'email' => 'kaja@demo.bilohash.com', 'code' => 'KAJA2N', 'lang' => 'no', 'level' => 'A1', 'learn' => 'norsk', 'avatar' => '🐧|beanie||norflag|ice', 'blurb' => 'A1 · lundefugl', 'stars' => 18, 'badges' => 3, 'streak' => 5],
    ['who' => 'espen', 'name' => 'Espen', 'email' => 'espen@demo.bilohash.com', 'code' => 'ESPEN7', 'lang' => 'no', 'level' => 'A2', 'learn' => 'norsk,math', 'avatar' => '🐻|gamer||norflag|aurora', 'blurb' => 'A2 · elg i vest', 'stars' => 34, 'badges' => 6, 'streak' => 9],
    ['who' => 'liv', 'name' => 'Liv', 'email' => 'liv@demo.bilohash.com', 'code' => 'LIV2NT', 'lang' => 'no', 'level' => 'A1', 'learn' => 'norsk', 'avatar' => '🦊|wizard|||ice', 'blurb' => 'A1 · rev', 'stars' => 12, 'badges' => 2, 'streak' => 3],
    ['who' => 'sondre', 'name' => 'Sondre', 'email' => 'sondre@demo.bilohash.com', 'code' => 'SOND3R', 'lang' => 'no', 'level' => 'A2', 'learn' => 'norsk,logic', 'avatar' => '🐺|astro||bolt|neon', 'blurb' => 'A2 · logikk', 'stars' => 41, 'badges' => 7, 'streak' => 11],
    ['who' => 'hana', 'name' => 'Hana', 'email' => 'hana@demo.bilohash.com', 'code' => 'HANA2K', 'lang' => 'en', 'level' => 'B1', 'learn' => 'norsk,english', 'avatar' => '🦉|jester||norflag|midnight', 'blurb' => 'B1 · ugle', 'stars' => 55, 'badges' => 9, 'streak' => 14],
    ['who' => 'tarek', 'name' => 'Tarek', 'email' => 'tarek@demo.bilohash.com', 'code' => 'TAREK2', 'lang' => 'no', 'level' => 'A2', 'learn' => 'norsk,math', 'avatar' => '🐯|samurai|cyber||lava', 'blurb' => 'A2 · tiger', 'stars' => 29, 'badges' => 5, 'streak' => 7],
    ['who' => 'noor', 'name' => 'Noor', 'email' => 'noor@demo.bilohash.com', 'code' => 'NUR2KA', 'lang' => 'no', 'level' => 'A1', 'learn' => 'norsk', 'avatar' => '🐰|unicorn||bolt|ice', 'blurb' => 'A1 · kanin', 'stars' => 8, 'badges' => 2, 'streak' => 2],
    ['who' => 'olav', 'name' => 'Olav', 'email' => 'olav@demo.bilohash.com', 'code' => 'ULAV2N', 'lang' => 'no', 'level' => 'B1', 'learn' => 'norsk,logic,math', 'avatar' => '🦁|astro|laser|norflag|lava', 'blurb' => 'B1 · løve', 'stars' => 62, 'badges' => 11, 'streak' => 20],
  ];
}
function seed_demo_users(): void {
  try {
    db()->exec('ALTER TABLE kl_users ADD COLUMN is_demo TINYINT NOT NULL DEFAULT 0');
  } catch (Throwable $e) { /* already there */ }
  $now = time();
  $dummy = hash_password(rand_hex(24));
  foreach (demo_catalog() as $d) {
    $u = one('SELECT id FROM kl_users WHERE email = ?', [$d['email']]);
    if (!$u) {
      try {
        q('INSERT INTO kl_users (email, name, pass_hash, lang, friend_code, share_profile, created_at, consent_at, verified_at, is_demo, msg_pref) VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, 1, 0)',
          [$d['email'], $d['name'], $dummy, $d['lang'], $d['code'], $now, $now, $now]);
      } catch (Throwable $e) { /* code/email collision */ }
      $u = one('SELECT id FROM kl_users WHERE email = ?', [$d['email']]);
      if (!$u) continue;
    } else {
      q('UPDATE kl_users SET is_demo = 1, name = ?, lang = ?, share_profile = 1, verified_at = COALESCE(verified_at, ?), msg_pref = 0 WHERE id = ?',
        [$d['name'], $d['lang'], $now, $u['id']]);
    }
    $uid = (int)$u['id'];
    upsert('kl_players', ['code'], [
      'code' => $d['code'], 'user_id' => $uid, 'secret_hash' => sha('komiks-players:demo-' . $d['code']),
      'name' => $d['name'], 'avatar' => $d['avatar'], 'learn' => $d['learn'], 'level' => $d['level'],
      'stars' => $d['stars'], 'badges' => $d['badges'], 'streak' => $d['streak'], 'act' => 'read',
      'snap' => '', 'seen' => $now, 'updated' => $now, 'since' => $now - 14 * 86400,
    ]);
  }
}
function unique_friend_code(): string {
  $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for ($i = 0; $i < 20; $i++) {
    $c = ''; for ($j = 0; $j < 6; $j++) $c .= $chars[random_int(0, strlen($chars) - 1)];
    if (str_starts_with($c, 'BQ')) continue; // BQ… — коди віртуальних гравців
    if (!one('SELECT id FROM kl_users WHERE friend_code = ?', [$c])) return $c;
  }
  throw new RuntimeException('friend code');
}
function send_verify(array $u): void { send_template($u, 'verify', site_url() . 'api/auth.php?action=verify&token=' . new_token((int)$u['id'], 'verify', VERIFY_TTL)); }

/** Бали з тестів і ігор → kl_players.stars (головна й рейтинг). */
function user_data_val(int $userId, string $k, $default = null) {
  $r = one('SELECT v FROM kl_user_data WHERE user_id = ? AND k = ?', [$userId, $k]);
  if (!$r) return $default;
  $v = json_decode($r['v'], true);
  return $v === null ? $default : $v;
}
function refresh_rank(array $u): void {
  if (!$u || !empty($u['is_demo'])) return;
  $code = strtoupper((string)($u['friend_code'] ?? ''));
  if (!preg_match('/^[A-HJ-NP-Z2-9]{6}$/', $code)) return;
  $uid = (int)$u['id'];
  $prog = user_data_val($uid, 'progress', []);
  if (!is_array($prog)) $prog = [];
  $stars = 0;
  $tests = 0;
  foreach ($prog as $pr) {
    if (!is_array($pr)) continue;
    $s = max(0, (int)($pr['stars'] ?? 0));
    $stars += $s;
    if ($s > 0) $tests++;
  }
  $stats = user_data_val($uid, 'stats', []);
  if (!is_array($stats)) $stats = [];
  $games = max(0, (int)($stats['games'] ?? 0));
  $race = max(0, (int)($stats['raceWins'] ?? 0));
  $days = user_data_val($uid, 'days', []);
  $dayN = is_array($days) ? count($days) : 0;
  $math = max(0, (int)user_data_val($uid, 'mathBest', 0));
  $score = $stars * 10 + $tests * 5 + $dayN * 3 + $games * 4 + $race * 12 + min(400, $math);
  $score = max(0, min(100000, $score));
  $badges = max(0, min(100, (int)($stats['perfect'] ?? 0) + ($race > 0 ? 1 : 0) + ($math >= 150 ? 1 : 0)));
  $avatar = user_data_val($uid, 'avatar', '🦊');
  if (!is_string($avatar) || $avatar === '') $avatar = '🦊';
  $avatar = substr($avatar, 0, 60);
  $now = time();
  $prev = one('SELECT * FROM kl_players WHERE code = ?', [$code]);
  upsert('kl_players', ['code'], [
    'code' => $code,
    'user_id' => $uid,
    'secret_hash' => $prev['secret_hash'] ?? sha('komiks-players:rank:' . $uid),
    'name' => $u['name'],
    'avatar' => $avatar,
    'learn' => $prev['learn'] ?? 'norsk',
    'level' => $prev['level'] ?? 'A1',
    'stars' => $score,
    'badges' => $badges,
    'streak' => min(10000, $dayN),
    'act' => $prev['act'] ?? 'play',
    'snap' => $prev['snap'] ?? '',
    'seen' => $now,
    'updated' => $now,
    'since' => (int)($prev['since'] ?? $now),
  ]);
}
function refresh_all_ranks(): int {
  $n = 0;
  foreach (q('SELECT * FROM kl_users WHERE COALESCE(is_demo, 0) = 0')->fetchAll() as $u) {
    refresh_rank($u);
    $n++;
  }
  return $n;
}
// повне видалення акаунта з усіма даними
function delete_user_all(array $u): void {
  $db = db(); $db->beginTransaction();
  foreach (['kl_user_data', 'kl_sessions', 'kl_tokens'] as $t) q("DELETE FROM $t WHERE user_id = ?", [$u['id']]);
  q('DELETE FROM kl_players WHERE user_id = ? OR code = ?', [$u['id'], $u['friend_code']]);
  q('DELETE FROM kl_comments WHERE owner = ?', [$u['friend_code']]);
  q('DELETE FROM kl_walls WHERE owner = ?', [$u['friend_code']]);
  q('DELETE FROM kl_users WHERE id = ?', [$u['id']]);
  $db->commit();
}

/* ---------- пошта ---------- */
function send_mail(string $to, string $subject, string $html, string $text): bool {
  $m = cfg('mail');
  $from = $m['from'] ?? 'no-reply@localhost';
  $fromName = $m['from_name'] ?? 'Komiks·Lab';
  $boundary = 'kl_' . rand_hex(12);
  $enc = fn($s) => '=?UTF-8?B?' . base64_encode($s) . '?=';
  $headers = [
    'Date: ' . date('r'), 'From: ' . $enc($fromName) . " <$from>", 'Reply-To: ' . ($m['reply_to'] ?? $from), 'Message-ID: <' . rand_hex(16) . '@' . (explode('@', $from)[1] ?? 'localhost') . '>',
    'MIME-Version: 1.0', "Content-Type: multipart/alternative; boundary=\"$boundary\"",
  ];
  $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text)) .
          "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html)) . "--$boundary--\r\n";
  $transport = $m['transport'] ?? 'mail';
  try {
    if ($transport === 'log') {
      $dir = __DIR__ . '/data/mail'; @mkdir($dir, 0750, true);
      @file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
      file_put_contents($dir . '/' . date('Ymd-His') . '-' . preg_replace('/[^a-z0-9]+/i', '_', $to) . '.html', "<!-- To: $to | Subject: $subject -->\n" . $html);
      return true;
    }
    if ($transport === 'smtp') return smtp_send($m, $from, $to, 'To: ' . $to . "\r\nSubject: " . $enc($subject) . "\r\n" . implode("\r\n", $headers) . "\r\n\r\n" . $body);
    return mail($to, $enc($subject), $body, implode("\r\n", $headers), '-f' . $from);
  } catch (Throwable $e) { error_log('[komiks-mail] ' . $e->getMessage()); return false; }
}
// мінімальний SMTP-клієнт: SSL (465) або STARTTLS (587), AUTH LOGIN
function smtp_send(array $m, string $from, string $to, string $data): bool {
  $host = $m['host']; $port = (int)($m['port'] ?? 465); $secure = $m['secure'] ?? 'ssl';
  $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
  $fp = stream_socket_client(($secure === 'ssl' ? 'ssl://' : 'tcp://') . "$host:$port", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
  if (!$fp) throw new RuntimeException("smtp connect: $errstr");
  stream_set_timeout($fp, 15);
  $read = function () use ($fp) { $r = ''; while (($line = fgets($fp, 515)) !== false) { $r .= $line; if (strlen($line) < 4 || $line[3] === ' ') break; } return $r; };
  $cmd = function (string $c, array $ok) use ($fp, $read) { fwrite($fp, $c . "\r\n"); $r = $read(); if (!in_array((int)substr($r, 0, 3), $ok, true)) throw new RuntimeException('smtp: ' . trim(explode("\r\n", $r)[0]) . ' after ' . explode(' ', $c)[0]); return $r; };
  $read();
  $ehloHost = parse_url(site_url(), PHP_URL_HOST) ?: 'localhost';
  $cmd("EHLO $ehloHost", [250]);
  if ($secure === 'tls') { $cmd('STARTTLS', [220]); if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) throw new RuntimeException('smtp starttls'); $cmd("EHLO $ehloHost", [250]); }
  if (!empty($m['user'])) { $cmd('AUTH LOGIN', [334]); $cmd(base64_encode($m['user']), [334]); $cmd(base64_encode((string)$m['pass']), [235]); }
  $cmd("MAIL FROM:<$from>", [250]);
  $cmd("RCPT TO:<$to>", [250, 251]);
  $cmd('DATA', [354]);
  $data = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], ["\n", "\n"], $data));
  fwrite($fp, str_replace("\n", "\r\n", $data) . "\r\n.\r\n");
  $r = $read(); if ((int)substr($r, 0, 3) !== 250) throw new RuntimeException('smtp data: ' . trim($r));
  @fwrite($fp, "QUIT\r\n"); fclose($fp);
  return true;
}

// лист усім адміністраторам (напр., про нову реєстрацію): таблиця «поле — значення» + кнопка в адмінку
function notify_admins(string $subject, array $rows, string $adminPath = 'admin.php'): void {
  try {
    $to = array_column(q('SELECT email FROM kl_users WHERE is_admin = 1 AND blocked_at IS NULL LIMIT 5')->fetchAll(), 'email');
    $extra = cfg('notify'); if (is_string($extra) && valid_email($extra)) $to[] = $extra;
    $to = array_unique($to); if (!$to) return;
    $e = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
    $table = '<table style="border-collapse:collapse;width:100%">' . implode('', array_map(fn($r) => '<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#777">' . $e($r[0]) . '</td><td style="padding:6px 10px;border-bottom:1px solid #eee;font-weight:700">' . $e($r[1]) . '</td></tr>', $rows)) . '</table>';
    $html = mail_layout('uk', $subject, $table, 'Відкрити в адмін-панелі', site_url() . $adminPath, date('d.m.Y H:i'), 'Komiks·Lab · сповіщення для адміністратора');
    $text = $subject . "\n\n" . implode("\n", array_map(fn($r) => $r[0] . ': ' . $r[1], $rows)) . "\n\n" . site_url() . $adminPath;
    foreach ($to as $addr) send_mail($addr, $subject, $html, $text);
  } catch (Throwable $e) { error_log('[komiks-notify] ' . $e->getMessage()); }
}

/* ---------- шаблони листів (inline-стилі для поштових програм) ---------- */
function mail_layout(string $lang, string $title, string $intro, string $button, string $url, string $after, string $footer): string {
  $e = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
  $site = site_url();
  return '<!doctype html><html lang="' . $e($lang) . '" dir="' . ($lang === 'ar' ? 'rtl' : 'ltr') . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $e($title) . '</title></head>'
    . '<body style="margin:0;padding:0;background:#fff8ea;font-family:Arial,Helvetica,sans-serif;color:#141414">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8ea;padding:24px 12px"><tr><td align="center">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:4px solid #141414;border-radius:22px;overflow:hidden">'
    . '<tr><td style="background:#ffd23f;padding:20px 26px;border-bottom:4px solid #141414;font-size:24px;font-weight:900">💬 Komiks<span style="color:#ee4035">·Lab</span></td></tr>'
    . '<tr><td style="padding:28px 26px 8px"><h1 style="margin:0 0 12px;font-size:26px;line-height:1.2">' . $e($title) . '</h1><p style="margin:0 0 18px;font-size:16px;line-height:1.55">' . $intro . '</p>'
    . '<p style="margin:0 0 22px"><a href="' . $e($url) . '" style="display:inline-block;background:#ee4035;color:#ffffff;text-decoration:none;font-weight:900;font-size:17px;padding:14px 26px;border-radius:999px;border:3px solid #141414">' . $e($button) . '</a></p>'
    . '<p style="margin:0 0 18px;font-size:14px;line-height:1.55;color:#444">' . $after . '</p></td></tr>'
    . '<tr><td style="padding:14px 26px 22px;border-top:2px dashed #e0d6bf;font-size:12px;line-height:1.5;color:#777">' . $footer . '<br><a href="' . $e($site) . '" style="color:#1565c0">' . $e(preg_replace('~^https?://~', '', rtrim($site, '/'))) . '</a></td></tr>'
    . '</table></td></tr></table></body></html>';
}
function mail_texts(string $lang): array {
  $T = [
    'en' => [
      'verify_subject' => 'Confirm your email — Komiks·Lab', 'verify_title' => 'Confirm your email 📬',
      'verify_intro' => 'Hi %s! Thanks for joining Komiks·Lab. Tap the button to confirm your email and activate your account.', 'verify_btn' => 'Confirm my email',
      'verify_after' => 'The link works for 48 hours. If you did not sign up, just ignore this email — nothing will happen.',
      'welcome_subject' => 'Welcome to Komiks·Lab! 🎉', 'welcome_title' => 'Welcome aboard, %s! 🎉',
      'welcome_intro' => 'Your email is confirmed and your account is ready. Here is how to start:<br>📖 read your first Norwegian comic with real voices,<br>🎨 create your hero in the avatar studio,<br>🏁 race friends in the Logic Race and collect badges.', 'welcome_btn' => 'Start learning',
      'welcome_after' => 'Your progress is now saved in your account and follows you on every device.',
      'reset_subject' => 'Reset your password — Komiks·Lab', 'reset_title' => 'Reset your password 🔑', 'reset_intro' => 'Hi %s! Someone (hopefully you) asked to reset the password for your Komiks·Lab account.', 'reset_btn' => 'Choose a new password', 'reset_after' => 'The link works for 1 hour. If it was not you, ignore this email — your password stays the same.',
      'exists_subject' => 'You already have a Komiks·Lab account', 'exists_title' => 'You already have an account 🙂', 'exists_intro' => 'Hi %s! Someone tried to sign up with this email, but you already have an account.', 'exists_btn' => 'Log in', 'exists_after' => 'Forgot your password? Use “Forgot password” on the login page.',
      'setpass_subject' => 'An account was created for you — Komiks·Lab', 'setpass_title' => 'Welcome, %s! 💎', 'setpass_intro' => 'A free Komiks·Lab account has been created for you. Choose your own password and start learning Norwegian with comics.', 'setpass_btn' => 'Choose my password', 'setpass_after' => 'The link works for 7 days. After that you can use “Forgot password” on the login page.',
      'footer' => 'You got this email because this address was used on Komiks·Lab — learn Norwegian with comics.'
    ],
    'no' => [
      'verify_subject' => 'Bekreft e-posten din – Komiks·Lab', 'verify_title' => 'Bekreft e-posten din 📬',
      'verify_intro' => 'Hei %s! Takk for at du ble med i Komiks·Lab. Trykk på knappen for å bekrefte e-posten og aktivere kontoen.', 'verify_btn' => 'Bekreft e-posten',
      'verify_after' => 'Lenken virker i 48 timer. Hvis du ikke har registrert deg, kan du se bort fra denne e-posten.',
      'welcome_subject' => 'Velkommen til Komiks·Lab! 🎉', 'welcome_title' => 'Velkommen, %s! 🎉',
      'welcome_intro' => 'E-posten er bekreftet, og kontoen er klar. Slik kommer du i gang:<br>📖 les din første norske tegneserie med ekte stemmer,<br>🎨 lag helten din i avatarstudioet,<br>🏁 konkurrer med venner i Logikkløpet og samle merker.', 'welcome_btn' => 'Begynn å lære',
      'welcome_after' => 'Fremgangen din lagres nå på kontoen og følger deg på alle enheter.',
      'reset_subject' => 'Tilbakestill passordet – Komiks·Lab', 'reset_title' => 'Nytt passord 🔑', 'reset_intro' => 'Hei %s! Noen (forhåpentligvis du) har bedt om å tilbakestille passordet til Komiks·Lab-kontoen din.', 'reset_btn' => 'Velg nytt passord', 'reset_after' => 'Lenken virker i 1 time. Hvis det ikke var deg, kan du se bort fra e-posten.',
      'exists_subject' => 'Du har allerede en konto i Komiks·Lab', 'exists_title' => 'Du har allerede en konto 🙂', 'exists_intro' => 'Hei %s! Noen prøvde å registrere seg med denne e-posten, men du har allerede en konto.', 'exists_btn' => 'Logg inn', 'exists_after' => 'Glemt passordet? Bruk «Glemt passord» på innloggingssiden.',
      'setpass_subject' => 'Det er laget en konto til deg – Komiks·Lab', 'setpass_title' => 'Velkommen, %s! 💎', 'setpass_intro' => 'Det er laget en gratis Komiks·Lab-konto til deg. Velg ditt eget passord og begynn å lære norsk med tegneserier.', 'setpass_btn' => 'Velg passord', 'setpass_after' => 'Lenken virker i 7 dager. Etterpå kan du bruke «Glemt passord» på innloggingssiden.',
      'footer' => 'Du fikk denne e-posten fordi adressen ble brukt på Komiks·Lab – lær norsk med tegneserier.'
    ],
    'uk' => [
      'verify_subject' => 'Підтвердіть пошту — Komiks·Lab', 'verify_title' => 'Підтвердіть свою пошту 📬',
      'verify_intro' => 'Привіт, %s! Дякуємо, що приєдналися до Komiks·Lab. Натисніть кнопку, щоб підтвердити пошту й активувати акаунт.', 'verify_btn' => 'Підтвердити пошту',
      'verify_after' => 'Посилання діє 48 годин. Якщо ви не реєструвалися — просто проігноруйте цей лист.',
      'welcome_subject' => 'Ласкаво просимо до Komiks·Lab! 🎉', 'welcome_title' => 'Ласкаво просимо, %s! 🎉',
      'welcome_intro' => 'Пошту підтверджено, акаунт готовий. З чого почати:<br>📖 прочитайте перший норвезький комікс з живими голосами,<br>🎨 створіть свого героя в студії аватара,<br>🏁 змагайтеся з друзями в Логік-гонці й збирайте значки.', 'welcome_btn' => 'Почати навчання',
      'welcome_after' => 'Тепер ваш прогрес зберігається в акаунті й доступний на будь-якому пристрої.',
      'reset_subject' => 'Скидання пароля — Komiks·Lab', 'reset_title' => 'Новий пароль 🔑', 'reset_intro' => 'Привіт, %s! Хтось (сподіваємось, ви) попросив скинути пароль до акаунта Komiks·Lab.', 'reset_btn' => 'Задати новий пароль', 'reset_after' => 'Посилання діє 1 годину. Якщо це були не ви — просто проігноруйте лист.',
      'exists_subject' => 'У вас уже є акаунт Komiks·Lab', 'exists_title' => 'У вас уже є акаунт 🙂', 'exists_intro' => 'Привіт, %s! Хтось спробував зареєструватися з цією поштою, але акаунт уже існує.', 'exists_btn' => 'Увійти', 'exists_after' => 'Забули пароль? Скористайтеся «Забули пароль?» на сторінці входу.',
      'setpass_subject' => 'Для вас створено акаунт — Komiks·Lab', 'setpass_title' => 'Ласкаво просимо, %s! 💎', 'setpass_intro' => 'Для вас створено безкоштовний акаунт Komiks·Lab. Задайте свій пароль і починайте вчити норвезьку через комікси.', 'setpass_btn' => 'Задати пароль', 'setpass_after' => 'Посилання діє 7 днів. Потім можна скористатися «Забули пароль?» на сторінці входу.',
      'footer' => 'Ви отримали цей лист, бо цю адресу вказали на Komiks·Lab — вивчення норвезької через комікси.'
    ],
    'ar' => [
      'verify_subject' => 'أكّد بريدك الإلكتروني — Komiks·Lab', 'verify_title' => 'أكّد بريدك الإلكتروني 📬',
      'verify_intro' => 'مرحبًا %s! شكرًا لانضمامك إلى Komiks·Lab. اضغط الزر لتأكيد بريدك وتفعيل حسابك.', 'verify_btn' => 'تأكيد البريد',
      'verify_after' => 'الرابط صالح لمدة 48 ساعة. إن لم تسجّل، فتجاهل هذه الرسالة.',
      'welcome_subject' => 'أهلًا بك في Komiks·Lab! 🎉', 'welcome_title' => 'أهلًا بك يا %s! 🎉',
      'welcome_intro' => 'تم تأكيد بريدك وحسابك جاهز. من أين تبدأ:<br>📖 اقرأ أول قصة نرويجية بأصوات حقيقية،<br>🎨 أنشئ بطلك في استوديو الشخصيات،<br>🏁 تسابق مع أصدقائك في سباق المنطق واجمع الأوسمة.', 'welcome_btn' => 'ابدأ التعلّم',
      'welcome_after' => 'يُحفظ تقدّمك الآن في حسابك ويرافقك على كل أجهزتك.',
      'reset_subject' => 'إعادة تعيين كلمة المرور — Komiks·Lab', 'reset_title' => 'كلمة مرور جديدة 🔑', 'reset_intro' => 'مرحبًا %s! طلب أحدهم (نأمل أنه أنت) إعادة تعيين كلمة مرور حسابك في Komiks·Lab.', 'reset_btn' => 'اختر كلمة مرور جديدة', 'reset_after' => 'الرابط صالح لساعة واحدة. إن لم تكن أنت، فتجاهل هذه الرسالة.',
      'exists_subject' => 'لديك حساب في Komiks·Lab بالفعل', 'exists_title' => 'لديك حساب بالفعل 🙂', 'exists_intro' => 'مرحبًا %s! حاول أحدهم التسجيل بهذا البريد، لكن لديك حساب بالفعل.', 'exists_btn' => 'تسجيل الدخول', 'exists_after' => 'نسيت كلمة المرور؟ استخدم «نسيت كلمة المرور؟» في صفحة الدخول.',
      'setpass_subject' => 'أُنشئ لك حساب — Komiks·Lab', 'setpass_title' => 'أهلًا بك يا %s! 💎', 'setpass_intro' => 'أُنشئ لك حساب مجاني في Komiks·Lab. اختر كلمة مرورك وابدأ تعلّم النرويجية بالقصص المصوّرة.', 'setpass_btn' => 'اختر كلمة المرور', 'setpass_after' => 'الرابط صالح لمدة 7 أيام. بعدها يمكنك استخدام «نسيت كلمة المرور؟» في صفحة الدخول.',
      'footer' => 'وصلتك هذه الرسالة لأن هذا العنوان استُخدم في Komiks·Lab — تعلّم النرويجية بالقصص المصوّرة.'
    ],
  ];
  return $T[$lang] ?? $T['en'];
}
function send_template(array $user, string $kind, string $url): bool {
  $lang = in_array($user['lang'] ?? 'en', ['en', 'no', 'uk', 'ar'], true) ? $user['lang'] : 'en';
  $T = mail_texts($lang);
  $name = htmlspecialchars((string)$user['name'], ENT_QUOTES, 'UTF-8');
  $title = sprintf($T[$kind . '_title'], (string)$user['name']);
  $intro = sprintf($T[$kind . '_intro'], $name);
  $html = mail_layout($lang, $title, $intro, $T[$kind . '_btn'], $url, $T[$kind . '_after'], $T['footer']);
  $text = strip_tags(str_replace('<br>', "\n", sprintf($T[$kind . '_intro'], (string)$user['name']))) . "\n\n" . $T[$kind . '_btn'] . ': ' . $url . "\n\n" . strip_tags($T[$kind . '_after']);
  return send_mail((string)$user['email'], $T[$kind . '_subject'], $html, $text);
}
