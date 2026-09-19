<?php
/* Комікс·Lab — спільна стіна профілю (коментарі між пристроями). Дані — у БД (kl_walls, kl_comments).
 *
 * GET  wall.php?owner=PING                             → { ok, wall: 2 }
 * GET  wall.php?owner=ABC234                           → { ok, open, comments }
 * GET  wall.php?captcha=1                              → { ok, q:{a,op,b}, opts, token } — приклад для дітей
 * POST { action: "claim",  owner, secret }             → власник закріплює стіну
 * POST { action: "post",   owner, name, avatar, text, akey, token, answer }
 * POST { action: "delete", owner, id, key }            → секрет власника або ключ автора
 * POST { action: "close",  owner, secret, open }
 * Модератор / адмін: { action: "mod_delete" | "mod_warn" | "mod_ban", owner, id, hours } — прибрати допис,
 *   надіслати авторові анімоване попередження, тимчасово заборонити писати (акаунт і IP) на 1 год / 1 добу / 7 днів.
 * Антифлуд: капча (одноразова, 5 хв, прив’язана до IP), 1 допис/30 с і 20/добу з IP, ≤10/10 хв на стіну,
 * без повторів і посилань, лише текст ≤300 символів.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require __DIR__ . '/lib.php';

const CODE_RE = '/^[A-HJ-NP-Z2-9]{6}$/';
const MAX_TEXT = 300;
const MAX_COMMENTS = 200;
const CAPTCHA_TTL = 300;

function wall_secret(string $s): string { return sha('komiks-wall:' . $s); }
function captcha_sign(string $payload, int $answer): string { return hash_hmac('sha256', $payload . '|' . $answer . '|' . ip_hash(), (string)cfg('secret')); }
function new_captcha(): array {
  if (random_int(0, 1) === 0) { $a = random_int(1, 9); $b = random_int(1, 9); $op = '+'; $ans = $a + $b; }
  else { $a = random_int(4, 12); $b = random_int(1, $a - 1); $op = '-'; $ans = $a - $b; }
  $opts = [$ans];
  while (count($opts) < 4) { $v = $ans + random_int(-3, 3); if ($v >= 0 && !in_array($v, $opts, true)) $opts[] = $v; }
  shuffle($opts);
  $payload = (time() + CAPTCHA_TTL) . '.' . bin2hex(random_bytes(8));
  return ['q' => ['a' => $a, 'op' => $op, 'b' => $b], 'opts' => $opts, 'token' => $payload . '.' . captcha_sign($payload, $ans)];
}
function check_captcha(string $token, int $answer): bool {
  if (!preg_match('/^(\d{10})\.([a-f0-9]{16})\.([a-f0-9]{64})$/', $token, $m)) return false;
  [, $exp, $nonce, $sig] = $m;
  if ((int)$exp < time() || !hash_equals(captcha_sign("$exp.$nonce", $answer), $sig)) return false;
  q('DELETE FROM kl_captcha_used WHERE exp < ?', [time()]);
  try { q('INSERT INTO kl_captcha_used (nonce, exp) VALUES (?, ?)', [$nonce, (int)$exp]); } catch (Throwable $e) { return false; } // уже використаний
  return true;
}
function norm_text(string $t): string { return preg_replace('/\s+/u', ' ', strtolower(trim($t))) ?? $t; }
function wall_row(string $owner): array { return one('SELECT * FROM kl_walls WHERE owner = ?', [$owner]) ?? ['owner' => $owner, 'secret_hash' => null, 'open' => 1]; }

if (method() === 'GET') {
  if (isset($_GET['captcha'])) { rate_or_fail('captcha:' . ip_hash(), 120, 3600); out(['ok' => true] + new_captcha()); }
  $owner = strtoupper((string)($_GET['owner'] ?? ''));
  if ($owner === 'PING') { db(); out(['ok' => true, 'wall' => 2]); }
  if (!preg_match(CODE_RE, $owner)) fail('owner');
  $w = wall_row($owner);
  $rows = $w['open'] ? q('SELECT id, name, avatar, text, created_at FROM kl_comments WHERE owner = ? ORDER BY created_at DESC LIMIT ' . MAX_COMMENTS, [$owner])->fetchAll() : [];
  out(['ok' => true, 'open' => (bool)$w['open'], 'mod' => is_staff(current_user()), 'comments' => array_map(fn($c) => ['id' => $c['id'], 'name' => $c['name'], 'avatar' => $c['avatar'], 'text' => $c['text'], 'date' => gmdate('c', (int)$c['created_at'])], $rows)]);
}

if (method() !== 'POST') fail('method', 405);
require_csrf();
$in = input();
$owner = strtoupper((string)($in['owner'] ?? ''));
if (!preg_match(CODE_RE, $owner)) fail('owner');
$action = (string)($in['action'] ?? '');
$me = current_user();

if ($action === 'claim') {
  $secret = (string)($in['secret'] ?? '');
  if (strlen($secret) < 16 || strlen($secret) > 128) fail('secret');
  $w = wall_row($owner);
  if (!$w['secret_hash']) { upsert('kl_walls', ['owner'], ['owner' => $owner, 'secret_hash' => wall_secret($secret), 'open' => (int)$w['open']]); out(['ok' => true]); }
  hash_equals($w['secret_hash'], wall_secret($secret)) ? out(['ok' => true]) : fail('taken', 403);
}
if ($action === 'post') {
  $text = clean_text((string)($in['text'] ?? ''), MAX_TEXT);
  $name = clean_text((string)($in['name'] ?? ''), 20);
  $avatar = clean_text((string)($in['avatar'] ?? ''), 60) ?: '🙂';
  $akey = (string)($in['akey'] ?? '');
  if ($text === '' || $name === '') fail('empty');
  if (strlen($akey) < 16 || strlen($akey) > 128) fail('akey');
  if (has_link($text) || has_link($name)) fail('links');
  $ban = active_ban($me ? (int)$me['id'] : null, ip_hash());
  if ($ban) fail('banned', 403, ['until' => gmdate('c', (int)$ban['until_at'])]);
  if (peek_limited('wall-gap:' . ip_hash(), 1, 30)) fail('slow_down', 429, ['wait' => 30]);
  if (peek_limited('wall-day:' . ip_hash(), 20, 86400)) fail('slow_down', 429, ['wait' => 3600]);
  if (!check_captcha((string)($in['token'] ?? ''), (int)($in['answer'] ?? -1))) fail('captcha', 403);
  if (!wall_row($owner)['open']) fail('closed', 403);
  if ((int)one('SELECT COUNT(*) AS n FROM kl_comments WHERE owner = ? AND created_at > ?', [$owner, time() - 600])['n'] >= 10) fail('wall_busy', 429);
  $n = norm_text($text);
  foreach (q('SELECT text FROM kl_comments WHERE owner = ? ORDER BY created_at DESC LIMIT 20', [$owner])->fetchAll() as $c) if (norm_text($c['text']) === $n) fail('repeat', 429);
  $id = bin2hex(random_bytes(6));
  limited('wall-gap:' . ip_hash(), 1, 30); limited('wall-day:' . ip_hash(), 20, 86400); // антифлуд — лише після успішної перевірки
  q('INSERT INTO kl_comments (id, owner, name, avatar, text, akey_hash, created_at, user_id, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [$id, $owner, $me ? $me['name'] : $name, $avatar, $text, wall_secret($akey), time(), $me ? (int)$me['id'] : null, ip_hash()]);
  q('DELETE FROM kl_comments WHERE owner = ? AND id NOT IN (SELECT id FROM (SELECT id FROM kl_comments WHERE owner = ? ORDER BY created_at DESC LIMIT ' . MAX_COMMENTS . ') t)', [$owner, $owner]);
  out(['ok' => true, 'comment' => ['id' => $id, 'name' => $me ? $me['name'] : $name, 'avatar' => $avatar, 'text' => $text, 'date' => gmdate('c')], 'wait' => 30]);
}
if ($action === 'delete') {
  $id = (string)($in['id'] ?? ''); $key = (string)($in['key'] ?? '');
  if (!preg_match('/^[a-f0-9]{12}$/', $id) || $key === '') fail('bad');
  $c = one('SELECT * FROM kl_comments WHERE id = ? AND owner = ?', [$id, $owner]);
  $w = wall_row($owner);
  $h = wall_secret($key);
  $ok = $c && (($w['secret_hash'] && hash_equals($w['secret_hash'], $h)) || hash_equals($c['akey_hash'], $h) || ($me && $me['friend_code'] === $owner) || is_staff($me));
  if (!$ok) fail('forbidden', 403);
  q('DELETE FROM kl_comments WHERE id = ?', [$id]);
  out(['ok' => true]);
}
if (in_array($action, ['mod_delete', 'mod_warn', 'mod_ban'], true)) {
  if (!is_staff($me)) fail('forbidden', 403);
  $c = one('SELECT * FROM kl_comments WHERE id = ? AND owner = ?', [(string)($in['id'] ?? ''), $owner]);
  if (!$c) fail('not_found', 404);
  // автор з акаунтом — лише за акаунтом (у класі чи сім'ї спільний IP); гість — за IP
  $who = $c['user_id'] ? [(int)$c['user_id'], null] : [null, $c['ip_hash'] ?: null];
  if ($who[0] && ($t = one('SELECT is_admin, is_moderator FROM kl_users WHERE id = ?', [$who[0]])) && is_staff($t) && empty($me['is_admin'])) fail('forbidden', 403); // модератор не карає колег
  if ($action === 'mod_warn' || $action === 'mod_ban') {
    q('INSERT INTO kl_notices (user_id, ip_hash, kind, text, by_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [$who[0], $who[1], $action === 'mod_ban' ? 'ban' : 'warn', clean_text($c['text'], 300), $me['id'], time()]);
  }
  if ($action === 'mod_ban') {
    $hours = in_array((int)($in['hours'] ?? 0), [1, 24, 168], true) ? (int)$in['hours'] : 24;
    q('INSERT INTO kl_bans (user_id, ip_hash, until_at, reason, by_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [$who[0], $who[1], time() + $hours * 3600, 'wall', $me['id'], time()]);
  }
  q('DELETE FROM kl_comments WHERE id = ?', [$c['id']]); // погане повідомлення зникає за будь-якої дії модератора
  out(['ok' => true]);
}
if ($action === 'close') {
  $w = wall_row($owner);
  $ok = ($w['secret_hash'] && hash_equals($w['secret_hash'], wall_secret((string)($in['secret'] ?? '')))) || ($me && $me['friend_code'] === $owner);
  if (!$ok) fail('forbidden', 403);
  upsert('kl_walls', ['owner'], ['owner' => $owner, 'secret_hash' => $w['secret_hash'], 'open' => !empty($in['open']) ? 1 : 0]);
  out(['ok' => true]);
}
fail('action');
