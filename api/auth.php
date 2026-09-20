<?php
/* Комікс·Lab — акаунти: реєстрація з підтвердженням пошти, лист-привітання, вхід, відновлення пароля,
 * синхронізація прогресу між пристроями.
 *
 * GET  auth.php?action=me                      → { ok, user|null }
 * GET  auth.php?action=verify&token=…          → підтвердження пошти → вхід → лист-привітання → редірект на #/welcome
 * GET  auth.php?action=data                    → { ok, data: {ключ: значення} }            (увійшли)
 * POST { action: "register", name, email, password, lang, consent }
 * POST { action: "login", email, password }    → { ok, user } | error: wrong | unverified
 * POST { action: "logout" }
 * POST { action: "resend", email }             → повторний лист підтвердження
 * POST { action: "forgot", email }             → лист зі скиданням пароля
 * POST { action: "reset", token, password }    → новий пароль + вхід
 * POST { action: "password", old, password }   → зміна пароля (увійшли)
 * POST { action: "update", name?, lang?, share_profile? }
 * POST { action: "delete", password }          → видалити акаунт і всі дані
 * POST { action: "data", items: {k: v} }       → зберегти частину прогресу
 * Усі POST — з заголовком X-Komiks: 1 (CSRF). Відповіді на register/resend/forgot однакові незалежно від того,
 * чи існує пошта, — щоб не можна було перевіряти чужі адреси.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require __DIR__ . '/lib.php';

const LANGS = ['en', 'no', 'uk', 'ar'];
const INVITE_TTL = 30 * 86400;
// дійсне запрошення: не використане, не прострочене, запрошувач досі може запрошувати й не заблокований
function invite_row(string $code): ?array {
  if (!preg_match('/^[a-f0-9]{24}$/', $code)) return null;
  return one('SELECT i.*, u.name AS inviter_name FROM kl_invites i JOIN kl_users u ON u.id = i.inviter_id WHERE i.code_hash = ? AND i.used_at IS NULL AND i.expires_at > ? AND u.blocked_at IS NULL AND (u.can_invite = 1 OR u.is_admin = 1)', [sha('invite:' . $code), time()]);
}
const DATA_KEY = '/^[A-Za-z0-9._:-]{1,64}$/';
function redirect(string $hash): void { header('Content-Type: text/html; charset=utf-8'); header('Location: ' . site_url() . $hash, true, 302); exit; }

$action = (string)($_GET['action'] ?? '');

/* ---------- GET ---------- */
if (method() === 'GET') {
  if ($action === 'me' || $action === '') { $u = current_user(); out(['ok' => true, 'auth' => 1, 'user' => $u ? public_user($u) : null, 'notice' => pending_notice($u ? (int)$u['id'] : null, ip_hash())]); }
  // попередження модератора («так писати не можна») — для акаунта або (гостям) за IP
  if ($action === 'notice') { $u = current_user(); out(['ok' => true, 'notice' => pending_notice($u ? (int)$u['id'] : null, ip_hash())]); }
  // перевірка запрошення перед реєстрацією: хто запросив (лише ім’я)
  if ($action === 'invite') {
    $inv = invite_row((string)($_GET['code'] ?? ''));
    out(['ok' => true, 'valid' => (bool)$inv, 'from' => $inv ? $inv['inviter_name'] : null]);
  }
  if ($action === 'invites') {
    $u = require_user();
    $rows = q('SELECT i.created_at, i.expires_at, i.used_at, u.name AS used_name FROM kl_invites i LEFT JOIN kl_users u ON u.id = i.used_by WHERE i.inviter_id = ? ORDER BY i.created_at DESC LIMIT 50', [$u['id']])->fetchAll();
    out(['ok' => true, 'invites' => array_map(fn($r) => ['created' => gmdate('c', (int)$r['created_at']), 'expires' => gmdate('c', (int)$r['expires_at']), 'used' => $r['used_at'] ? gmdate('c', (int)$r['used_at']) : null, 'name' => $r['used_name']], $rows)]);
  }
  if ($action === 'verify') {
    if (limited('verify:' . ip_hash(), 30, 3600)) redirect('#/verify-failed');
    $u = take_token((string)($_GET['token'] ?? ''), 'verify');
    if (!$u) redirect('#/verify-failed');
    $first = empty($u['verified_at']);
    if ($first) q('UPDATE kl_users SET verified_at = ? WHERE id = ?', [time(), $u['id']]);
    start_session((int)$u['id']);
    if ($first) send_template($u, 'welcome', site_url() . '#/');
    redirect('#/welcome');
  }
  if ($action === 'data') {
    $u = require_user();
    $data = [];
    foreach (q('SELECT k, v FROM kl_user_data WHERE user_id = ?', [$u['id']])->fetchAll() as $r) $data[$r['k']] = json_decode($r['v'], true);
    out(['ok' => true, 'data' => $data]);
  }
  if ($action === 'demos') {
    seed_demo_users();
    $list = [];
    foreach (demo_catalog() as $d) {
      $list[] = ['who' => $d['who'], 'name' => $d['name'], 'level' => $d['level'], 'avatar' => $d['avatar'], 'blurb' => $d['blurb']];
    }
    out(['ok' => true, 'demos' => $list]);
  }
  fail('action', 404);
}

/* ---------- POST ---------- */
if (method() !== 'POST') fail('method', 405);
require_csrf();
$in = input();
$action = (string)($in['action'] ?? $action);
$ip = ip_hash();

if ($action === 'register') {
  rate_or_fail('reg:' . $ip, 6, 3600);
  $name = clean_text((string)($in['name'] ?? ''), 30);
  $email = strtolower(trim((string)($in['email'] ?? '')));
  $pass = (string)($in['password'] ?? '');
  $lang = in_array($in['lang'] ?? '', LANGS, true) ? $in['lang'] : 'en';
  if (mb_strlen_safe($name) < 2 || has_link($name)) fail('name');
  if (!valid_email($email)) fail('email');
  if ($p = password_problem($pass)) fail($p);
  if (empty($in['consent'])) fail('consent');
  rate_or_fail('reg-mail:' . $email, 3, 3600);
  $existing = one('SELECT * FROM kl_users WHERE email = ?', [$email]);
  if ($existing) {
    // однакова відповідь: не розкриваємо, що пошта вже зареєстрована
    if (empty($existing['verified_at'])) send_verify($existing);
    else send_template($existing, 'exists', site_url() . '#/login');
    out(['ok' => true, 'next' => 'verify']);
  }
  q('INSERT INTO kl_users (email, name, pass_hash, lang, friend_code, share_profile, created_at, consent_at) VALUES (?, ?, ?, ?, ?, 0, ?, ?)', [$email, $name, hash_password($pass), $lang, unique_friend_code(), time(), time()]);
  $u = one('SELECT * FROM kl_users WHERE email = ?', [$email]);
  // запрошення від преміум-друга: новий акаунт — безкоштовний назавжди (сам він запрошувати не може)
  $inv = invite_row((string)($in['invite'] ?? ''));
  if ($inv) {
    q('UPDATE kl_invites SET used_by = ?, used_at = ? WHERE code_hash = ? AND used_at IS NULL', [$u['id'], time(), $inv['code_hash']]);
    q('UPDATE kl_users SET premium = 1, invited_by = ? WHERE id = ?', [$inv['inviter_id'], $u['id']]);
  }
  send_verify($u);
  // адміністраторам — лист про нового учасника (ім’я, пошта, мова, чиє запрошення)
  notify_admins('🆕 Новий користувач: ' . $u['name'], [['Ім’я', $u['name']], ['Пошта', $u['email']], ['Мова', $u['lang']], ['Запрошення', $inv ? 'від ' . $inv['inviter_name'] . ' (💎 преміум)' : '—']], 'admin.php?p=user&id=' . (int)$u['id']);
  out(['ok' => true, 'next' => 'verify']);
}

if ($action === 'invite_create') {
  $u = require_user();
  if (empty($u['can_invite']) && empty($u['is_admin'])) fail('forbidden', 403);
  rate_or_fail('invite:' . $u['id'], 30, 86400);
  $open = (int)one('SELECT COUNT(*) AS n FROM kl_invites WHERE inviter_id = ? AND used_at IS NULL AND expires_at > ?', [$u['id'], time()])['n'];
  if ($open >= 20) fail('too_many');
  $code = rand_hex(12);
  q('INSERT INTO kl_invites (code_hash, inviter_id, created_at, expires_at) VALUES (?, ?, ?, ?)', [sha('invite:' . $code), $u['id'], time(), time() + INVITE_TTL]);
  out(['ok' => true, 'url' => site_url() . '#/register/' . $code, 'days' => 30]);
}
// перенесення прогресу з пристрою: акаунт переймає старий код друга (друзі, стіна й картка в пошуку лишаються),
// але лише з доказом володіння — секретом стіни/картки з того ж пристрою; зайнятий іншим акаунтом код не віддаємо
if ($action === 'adopt_code') {
  $u = require_user();
  rate_or_fail('adopt:' . $u['id'], 10, 3600);
  $code = strtoupper((string)($in['code'] ?? ''));
  $secret = (string)($in['secret'] ?? '');
  if (!preg_match('/^[A-HJ-NP-Z2-9]{6}$/', $code) || str_starts_with($code, 'BQ')) fail('code');
  if ($code === $u['friend_code']) out(['ok' => true, 'friend_code' => $code]);
  if (one('SELECT id FROM kl_users WHERE friend_code = ? AND id <> ?', [$code, $u['id']])) fail('taken', 409);
  $pl = one('SELECT secret_hash FROM kl_players WHERE code = ?', [$code]);
  $wl = one('SELECT secret_hash FROM kl_walls WHERE owner = ?', [$code]);
  $proved = ($pl && $secret !== '' && hash_equals($pl['secret_hash'], sha('komiks-players:' . $secret))) || ($wl && $wl['secret_hash'] && $secret !== '' && hash_equals($wl['secret_hash'], sha('komiks-wall:' . $secret)));
  if (($pl || ($wl && $wl['secret_hash'])) && !$proved) fail('forbidden', 403);
  q('UPDATE kl_users SET friend_code = ? WHERE id = ?', [$code, $u['id']]);
  if ($pl) q('UPDATE kl_players SET user_id = ? WHERE code = ?', [$u['id'], $code]);
  out(['ok' => true, 'friend_code' => $code]);
}
if ($action === 'notice_seen') {
  $u = current_user();
  q('UPDATE kl_notices SET seen_at = ? WHERE id = ? AND seen_at IS NULL AND (ip_hash = ?' . ($u ? ' OR user_id = ?' : '') . ')', $u ? [time(), (int)($in['id'] ?? 0), $ip, $u['id']] : [time(), (int)($in['id'] ?? 0), $ip]);
  out(['ok' => true]);
}

if ($action === 'demo') {
  rate_or_fail('demo-ip:' . $ip, 40, 900);
  seed_demo_users();
  $who = strtolower(preg_replace('/[^a-z]/', '', (string)($in['who'] ?? '')));
  $u = $who !== '' ? one('SELECT * FROM kl_users WHERE is_demo = 1 AND email = ?', [$who . '@demo.bilohash.com']) : null;
  if (!$u) fail('wrong', 401);
  if (!empty($u['blocked_at'])) fail('blocked', 403);
  start_session((int)$u['id']);
  out(['ok' => true, 'user' => public_user($u)]);
}

if ($action === 'login') {
  $email = strtolower(trim((string)($in['email'] ?? '')));
  $pass = (string)($in['password'] ?? '');
  rate_or_fail('login-ip:' . $ip, 20, 900);
  rate_or_fail('login-mail:' . $email, 8, 900);
  $u = valid_email($email) ? one('SELECT * FROM kl_users WHERE email = ?', [$email]) : null;
  if ($u && !empty($u['is_demo'])) {
    start_session((int)$u['id']);
    out(['ok' => true, 'user' => public_user($u)]);
  }
  // однаковий час відповіді для неіснуючої пошти
  $ok = password_verify($pass, $u['pass_hash'] ?? '$2y$10$usesomesillystringfore7hnbRJHxXVLeakoG8K30oukPsA.ztMG');
  if (!$u || !$ok) fail('wrong', 401);
  if (empty($u['verified_at'])) fail('unverified', 403);
  if (!empty($u['blocked_at'])) fail('blocked', 403);
  if (password_needs_rehash($u['pass_hash'], defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT)) q('UPDATE kl_users SET pass_hash = ? WHERE id = ?', [hash_password($pass), $u['id']]);
  start_session((int)$u['id']);
  out(['ok' => true, 'user' => public_user($u)]);
}

if ($action === 'logout') { end_session(); out(['ok' => true]); }

if ($action === 'resend' || $action === 'forgot') {
  $email = strtolower(trim((string)($in['email'] ?? '')));
  rate_or_fail($action . '-ip:' . $ip, 10, 3600);
  if (valid_email($email) && !limited($action . '-mail:' . $email, 3, 3600)) {
    $u = one('SELECT * FROM kl_users WHERE email = ?', [$email]);
    if ($u && $action === 'resend' && empty($u['verified_at'])) send_verify($u);
    if ($u && $action === 'forgot') send_template($u, 'reset', site_url() . '#/reset/' . new_token((int)$u['id'], 'reset', RESET_TTL));
  }
  out(['ok' => true]); // завжди однаково
}

if ($action === 'reset') {
  rate_or_fail('reset:' . $ip, 10, 3600);
  $pass = (string)($in['password'] ?? '');
  if ($p = password_problem($pass)) fail($p);
  $u = take_token((string)($in['token'] ?? ''), 'reset');
  if (!$u) fail('token', 400);
  q('UPDATE kl_users SET pass_hash = ?, verified_at = COALESCE(verified_at, ?) WHERE id = ?', [hash_password($pass), time(), $u['id']]);
  q('DELETE FROM kl_sessions WHERE user_id = ?', [$u['id']]); // вийти на всіх пристроях
  start_session((int)$u['id']);
  out(['ok' => true, 'user' => public_user(one('SELECT * FROM kl_users WHERE id = ?', [$u['id']]))]);
}

/* ---------- лише для тих, хто увійшов ---------- */
$u = require_user();

if ($action === 'password') {
  if (!empty($u['is_demo'])) fail('demo', 403);
  rate_or_fail('pass:' . $u['id'], 10, 3600);
  if (!password_verify((string)($in['old'] ?? ''), $u['pass_hash'])) fail('wrong', 401);
  $pass = (string)($in['password'] ?? '');
  if ($p = password_problem($pass)) fail($p);
  q('UPDATE kl_users SET pass_hash = ? WHERE id = ?', [hash_password($pass), $u['id']]);
  $keep = sha((string)$_COOKIE[SESSION_COOKIE]);
  q('DELETE FROM kl_sessions WHERE user_id = ? AND token_hash <> ?', [$u['id'], $keep]); // інші пристрої — вийти
  out(['ok' => true]);
}

if ($action === 'update') {
  $sets = []; $args = [];
  if (isset($in['name'])) { $n = clean_text((string)$in['name'], 30); if (mb_strlen_safe($n) < 2 || has_link($n)) fail('name'); $sets[] = 'name = ?'; $args[] = $n; }
  if (isset($in['lang']) && in_array($in['lang'], LANGS, true)) { $sets[] = 'lang = ?'; $args[] = $in['lang']; }
  if (isset($in['share_profile'])) { $sets[] = 'share_profile = ?'; $args[] = $in['share_profile'] ? 1 : 0; }
  if ($sets) { $args[] = $u['id']; q('UPDATE kl_users SET ' . implode(', ', $sets) . ' WHERE id = ?', $args); }
  out(['ok' => true, 'user' => public_user(one('SELECT * FROM kl_users WHERE id = ?', [$u['id']]))]);
}

if ($action === 'delete') {
  if (!empty($u['is_demo'])) fail('demo', 403);
  rate_or_fail('del:' . $u['id'], 5, 3600);
  if (!password_verify((string)($in['password'] ?? ''), $u['pass_hash'])) fail('wrong', 401);
  delete_user_all($u);
  end_session();
  out(['ok' => true]);
}

if ($action === 'data') {
  rate_or_fail('data:' . $u['id'], 240, 3600);
  $items = $in['items'] ?? null;
  if (!is_array($items) || count($items) > 80) fail('items');
  $now = time();
  foreach ($items as $k => $v) {
    if (!is_string($k) || !preg_match(DATA_KEY, $k)) continue;
    if ($v === null) { q('DELETE FROM kl_user_data WHERE user_id = ? AND k = ?', [$u['id'], $k]); continue; }
    $json = json_encode($v, JSON_UNESCAPED_UNICODE);
    if ($json === false || strlen($json) > 200000) continue;
    upsert('kl_user_data', ['user_id', 'k'], ['user_id' => $u['id'], 'k' => $k, 'v' => $json, 'updated_at' => $now]);
  }
  $cnt = (int)one('SELECT COUNT(*) AS n FROM kl_user_data WHERE user_id = ?', [$u['id']])['n'];
  if ($cnt > 400) fail('too_many_keys', 413);
  refresh_rank($u);
  out(['ok' => true]);
}

fail('action', 404);

function mb_strlen_safe(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : (int)preg_match_all('/./us', $s); }
