<?php
/* Комікс·Lab — каталог гравців для пошуку (лише ті, хто дозволив показ профілю). Дані — у БД (kl_players).
 *
 * GET  players.php?ping=1                              → { ok, players: 1 }
 * GET  players.php?q=&learn=&level=&near=A2&page=0&sort=stars → { ok, total, players: [...] } (без онлайн-статусу)
 * GET  players.php?code=ABC234                         → { ok, player } (з знімком профілю)
 * POST { action: "upsert", code, secret, card }        → опублікувати/оновити свою картку
 * POST { action: "remove", code, secret }              → прибрати себе з пошуку
 * Власник картки — хто першим її створив (секрет), або залогінений користувач із цим кодом друга.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require __DIR__ . '/lib.php';

const CODE_RE = '/^[A-HJ-NP-Z2-9]{6}$/';
const LEARN = ['norsk', 'english', 'math', 'logic'];
const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const PAGE = 24;

function card_out(array $p, bool $withSnap = false): array {
  $c = ['code' => $p['code'], 'name' => $p['name'], 'avatar' => $p['avatar'], 'learn' => $p['learn'] === '' ? [] : explode(',', $p['learn']), 'level' => $p['level'], 'stars' => (int)$p['stars'], 'badges' => (int)$p['badges'], 'streak' => (int)$p['streak'], 'active' => (int)($p['active'] ?? 0)];
  // онлайн-статус і «коли був» — не публічні: їх бачать лише друзі (напряму через PeerJS, assets/friends.js)
  if ($withSnap) $c['snap'] = $p['snap'];
  return $c;
}

if (method() === 'GET') {
  if (($_GET['ping'] ?? '') === '1') { db(); out(['ok' => true, 'players' => 1]); }
  if (isset($_GET['code'])) {
    $code = strtoupper((string)$_GET['code']);
    if (!preg_match(CODE_RE, $code)) fail('not_found', 404);
    $p = one('SELECT * FROM kl_players WHERE code = ?', [$code]);
    if (!$p) fail('not_found', 404);
    out(['ok' => true, 'player' => card_out($p, true)]);
  }
  $where = []; $args = [];
  $qs = clean_text((string)($_GET['q'] ?? ''), 30);
  if ($qs !== '') { $where[] = '(LOWER(name) LIKE ? OR code LIKE ?)'; $like = '%' . str_replace(['%', '_'], ['\%', '\_'], strtolower($qs)) . '%'; $args[] = $like; $args[] = strtoupper($like); }
  $learn = $_GET['learn'] ?? '';
  if (in_array($learn, LEARN, true)) { $where[] = "(',' || learn || ',') LIKE ?"; $args[] = '%,' . $learn . ',%'; }
  $level = $_GET['level'] ?? '';
  if (in_array($level, LEVELS, true)) { $where[] = 'level = ?'; $args[] = $level; }
  $w = $where ? ' WHERE ' . implode(' AND ', $where) : '';
  if (is_mysql()) $w = str_replace("(',' || learn || ',')", "CONCAT(',', learn, ',')", $w);
  $total = (int)one("SELECT COUNT(*) AS n FROM kl_players$w", $args)['n'];
  $page = max(0, min(50, (int)($_GET['page'] ?? 0)));
  // near=A2 — рекомендації: спершу гравці зі схожим рівнем навчання, далі активніші
  $near = array_search($_GET['near'] ?? '', LEVELS, true);
  $lvlNum = "(CASE level WHEN 'A1' THEN 0 WHEN 'A2' THEN 1 WHEN 'B1' THEN 2 WHEN 'B2' THEN 3 ELSE 0 END)";
  $sort = (string)($_GET['sort'] ?? '');
  $order = $near !== false ? "ABS($lvlNum - " . (int)$near . '), stars DESC, updated DESC'
    : ($sort === 'stars' ? 'stars DESC, badges DESC' : ($sort === 'active' ? 'active DESC, seen DESC, stars DESC' : 'updated DESC'));
  $rows = q("SELECT * FROM kl_players$w ORDER BY $order LIMIT " . PAGE . ' OFFSET ' . ($page * PAGE), $args)->fetchAll();
  out(['ok' => true, 'total' => $total, 'page' => $page, 'players' => array_map('card_out', $rows)]);
}

if (method() !== 'POST') fail('method', 405);
require_csrf();
$in = input();
$code = strtoupper((string)($in['code'] ?? ''));
$secret = (string)($in['secret'] ?? '');
if (!preg_match(CODE_RE, $code)) fail('code');
if (strlen($secret) < 16 || strlen($secret) > 128) fail('secret');
rate_or_fail('players:' . ip_hash(), 120, 3600);
$me = current_user();
$prev = one('SELECT * FROM kl_players WHERE code = ?', [$code]);
$isOwner = ($me && $me['friend_code'] === $code) || ($prev && hash_equals($prev['secret_hash'], sha('komiks-players:' . $secret)));
$action = (string)($in['action'] ?? '');

if ($action === 'upsert') {
  if ($prev && !$isOwner) fail('taken', 403);
  $c = is_array($in['card'] ?? null) ? $in['card'] : [];
  $name = clean_text((string)($c['name'] ?? ''), 20);
  if ($name === '' || has_link($name)) fail('name');
  $snap = (string)($c['snap'] ?? '');
  if (strlen($snap) > 3000 || !preg_match('/^[A-Za-z0-9_-]*$/', $snap)) fail('snap');
  $now = time();
  if ($prev && $now - (int)$prev['updated'] < 45) { q('UPDATE kl_players SET seen = ?, act = ? WHERE code = ?', [$now, clean_text((string)($c['act'] ?? ''), 12), $code]); out(['ok' => true]); }
  upsert('kl_players', ['code'], [
    'code' => $code, 'user_id' => $me && $me['friend_code'] === $code ? (int)$me['id'] : ($prev['user_id'] ?? null),
    'secret_hash' => $prev['secret_hash'] ?? sha('komiks-players:' . $secret),
    'name' => $name, 'avatar' => clean_text((string)($c['avatar'] ?? ''), 60) ?: '🙂',
    'learn' => implode(',', array_values(array_intersect(LEARN, is_array($c['learn'] ?? null) ? $c['learn'] : []))),
    'level' => in_array($c['level'] ?? '', LEVELS, true) ? $c['level'] : '',
    'stars' => max(0, min(100000, (int)($c['stars'] ?? 0))), 'badges' => max(0, min(100, (int)($c['badges'] ?? 0))), 'streak' => max(0, min(10000, (int)($c['streak'] ?? 0))),
    'act' => clean_text((string)($c['act'] ?? ''), 12), 'snap' => $snap, 'seen' => $now, 'updated' => $now, 'since' => (int)($prev['since'] ?? $now),
  ]);
  out(['ok' => true]);
}
if ($action === 'remove') {
  if (!$prev) out(['ok' => true]);
  if (!$isOwner) fail('forbidden', 403);
  q('DELETE FROM kl_players WHERE code = ?', [$code]);
  out(['ok' => true]);
}
fail('action');
