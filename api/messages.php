<?php
/* Комікс·Lab — особисті повідомлення між гравцями.
 * Хто може писати, вирішує отримувач (kl_users.msg_pref): 0 — ніхто, 1 — лише друзі (за замовчуванням), 2 — усі.
 * «Друг» — той, хто є в списку друзів отримувача зі статусом friend (синхронізований ключ friends у kl_user_data).
 *
 * GET  messages.php?action=threads            → { ok, threads: [{ code, name, avatar, last, at, unread, mine }] }
 * GET  messages.php?action=thread&code=ABC234 → { ok, with: {...}, can, reason, messages: [...] } (позначає прочитаними)
 * GET  messages.php?action=unread             → { ok, n }
 * GET  messages.php?action=can&code=ABC234    → { ok, can, reason }
 * GET  messages.php?action=blocks             → { ok, blocks: [{ code, name }] }
 * POST { action: "send", code, text }         → { ok, message }
 * POST { action: "block", code, on }          → заблокувати / розблокувати
 * POST { action: "report", id }               → поскаржитися модераторам
 * POST { action: "hide", code }               → прибрати розмову зі свого списку
 * POST { action: "prefs", msg: 0|1|2 }        → хто може мені писати
 * Безпека: лише залогінені й підтверджені; без посилань; ліміти частоти; тимчасові блокування модератора діють і тут.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require __DIR__ . '/lib.php';

const CODE_RE = '/^[A-HJ-NP-Z2-9]{6}$/';
const MAX_LEN = 1000;

function user_by_code(string $code): ?array {
  $code = strtoupper($code);
  if (!preg_match(CODE_RE, $code)) return null;
  return one('SELECT * FROM kl_users WHERE friend_code = ? AND blocked_at IS NULL', [$code]);
}
function avatar_of(int $id): string {
  $r = one("SELECT v FROM kl_user_data WHERE user_id = ? AND k = 'avatar'", [$id]);
  $v = $r ? json_decode($r['v'], true) : null;
  return is_string($v) && strlen($v) < 80 ? $v : '🙂';
}
// чи є $code у списку друзів користувача $ownerId (статус friend)
function is_friend_of(int $ownerId, string $code): bool {
  $r = one("SELECT v FROM kl_user_data WHERE user_id = ? AND k = 'friends'", [$ownerId]);
  $list = $r ? json_decode($r['v'], true) : [];
  foreach ((array)$list as $f) if (is_array($f) && ($f['code'] ?? '') === $code && ($f['status'] ?? '') === 'friend') return true;
  return false;
}
function blocked_between(int $a, int $b): bool { return (bool)one('SELECT 1 AS x FROM kl_blocks WHERE (user_id = ? AND blocked_id = ?) OR (user_id = ? AND blocked_id = ?)', [$a, $b, $b, $a]); }
// чи може $me написати $to: повертає [bool, причина]
function can_write(array $me, ?array $to): array {
  if (!$to) return [false, 'not_found'];
  if ((int)$to['id'] === (int)$me['id']) return [false, 'self'];
  if (empty($me['verified_at'])) return [false, 'unverified'];
  if (blocked_between((int)$me['id'], (int)$to['id'])) return [false, 'blocked'];
  if (active_ban((int)$me['id'], ip_hash())) return [false, 'banned'];
  if (is_staff($me)) return [true, 'ok']; // адміністрація може написати будь-кому
  $pref = (int)($to['msg_pref'] ?? 1);
  if ($pref === 0) return [false, 'closed'];
  if ($pref === 1 && !is_friend_of((int)$to['id'], $me['friend_code'])) return [false, 'friends_only'];
  return [true, 'ok'];
}
function msg_out(array $m, int $meId): array {
  return ['id' => (int)$m['id'], 'mine' => (int)$m['from_id'] === $meId, 'text' => $m['text'], 'at' => gmdate('c', (int)$m['created_at']), 'read' => !empty($m['read_at'])];
}

$me = require_user();
$meId = (int)$me['id'];

if (method() === 'GET') {
  $action = (string)($_GET['action'] ?? '');
  if ($action === 'unread') out(['ok' => true, 'n' => (int)one('SELECT COUNT(*) AS n FROM kl_messages WHERE to_id = ? AND read_at IS NULL AND hidden_to = 0', [$meId])['n']]);
  if ($action === 'threads') {
    $rows = q('SELECT CASE WHEN from_id = ? THEN to_id ELSE from_id END AS other, MAX(id) AS last_id, SUM(CASE WHEN to_id = ? AND read_at IS NULL THEN 1 ELSE 0 END) AS unread
      FROM kl_messages WHERE (from_id = ? AND hidden_from = 0) OR (to_id = ? AND hidden_to = 0) GROUP BY other ORDER BY last_id DESC LIMIT 60', [$meId, $meId, $meId, $meId])->fetchAll();
    $out = [];
    foreach ($rows as $r) {
      $u = one('SELECT id, name, friend_code FROM kl_users WHERE id = ?', [$r['other']]); if (!$u) continue;
      $m = one('SELECT * FROM kl_messages WHERE id = ?', [$r['last_id']]);
      $out[] = ['code' => $u['friend_code'], 'name' => $u['name'], 'avatar' => avatar_of((int)$u['id']), 'last' => $m['text'], 'at' => gmdate('c', (int)$m['created_at']), 'mine' => (int)$m['from_id'] === $meId, 'unread' => (int)$r['unread']];
    }
    out(['ok' => true, 'threads' => $out]);
  }
  if ($action === 'thread' || $action === 'can') {
    $to = user_by_code((string)($_GET['code'] ?? ''));
    [$can, $why] = can_write($me, $to);
    if ($action === 'can') out(['ok' => true, 'can' => $can, 'reason' => $why]);
    if (!$to) fail('not_found', 404);
    $tid = (int)$to['id'];
    q('UPDATE kl_messages SET read_at = ? WHERE to_id = ? AND from_id = ? AND read_at IS NULL', [time(), $meId, $tid]);
    $rows = q('SELECT * FROM (SELECT * FROM kl_messages WHERE ((from_id = ? AND to_id = ? AND hidden_from = 0) OR (from_id = ? AND to_id = ? AND hidden_to = 0)) ORDER BY id DESC LIMIT 150) t ORDER BY id', [$meId, $tid, $tid, $meId])->fetchAll();
    out(['ok' => true, 'with' => ['code' => $to['friend_code'], 'name' => $to['name'], 'avatar' => avatar_of($tid)], 'can' => $can, 'reason' => $why,
      'blocked' => (bool)one('SELECT 1 AS x FROM kl_blocks WHERE user_id = ? AND blocked_id = ?', [$meId, $tid]), 'messages' => array_map(fn($m) => msg_out($m, $meId), $rows)]);
  }
  if ($action === 'blocks') {
    $rows = q('SELECT u.friend_code AS code, u.name FROM kl_blocks b JOIN kl_users u ON u.id = b.blocked_id WHERE b.user_id = ? ORDER BY b.created_at DESC', [$meId])->fetchAll();
    out(['ok' => true, 'blocks' => $rows]);
  }
  fail('action', 404);
}

if (method() !== 'POST') fail('method', 405);
require_csrf();
$in = input();
$action = (string)($in['action'] ?? '');

if ($action === 'prefs') {
  $v = (int)($in['msg'] ?? 1);
  if (!in_array($v, [0, 1, 2], true)) fail('bad');
  q('UPDATE kl_users SET msg_pref = ? WHERE id = ?', [$v, $meId]);
  out(['ok' => true, 'msg_pref' => $v]);
}
if ($action === 'send') {
  $to = user_by_code((string)($in['code'] ?? ''));
  [$can, $why] = can_write($me, $to);
  if (!$can) fail($why, 403);
  $text = clean_text((string)($in['text'] ?? ''), MAX_LEN);
  if ($text === '') fail('empty');
  if (has_link($text)) fail('links');
  if (limited('msg-min:' . $meId, 12, 60)) fail('slow_down', 429);
  if (limited('msg-day:' . $meId, 300, 86400)) fail('slow_down', 429);
  q('INSERT INTO kl_messages (from_id, to_id, text, created_at) VALUES (?, ?, ?, ?)', [$meId, (int)$to['id'], $text, time()]);
  $id = (int)db()->lastInsertId();
  q('UPDATE kl_messages SET hidden_from = 0 WHERE from_id = ? AND to_id = ?', [$meId, (int)$to['id']]); // розмова знову з’являється в списку
  q('UPDATE kl_messages SET hidden_to = 0 WHERE from_id = ? AND to_id = ?', [(int)$to['id'], $meId]);
  out(['ok' => true, 'message' => msg_out(one('SELECT * FROM kl_messages WHERE id = ?', [$id]), $meId)]);
}
if ($action === 'block') {
  $to = user_by_code((string)($in['code'] ?? ''));
  if (!$to || (int)$to['id'] === $meId) fail('not_found', 404);
  if (!empty($in['on'])) { try { q('INSERT INTO kl_blocks (user_id, blocked_id, created_at) VALUES (?, ?, ?)', [$meId, (int)$to['id'], time()]); } catch (Throwable $e) { /* уже */ } }
  else q('DELETE FROM kl_blocks WHERE user_id = ? AND blocked_id = ?', [$meId, (int)$to['id']]);
  out(['ok' => true]);
}
if ($action === 'report') {
  $m = one('SELECT * FROM kl_messages WHERE id = ? AND to_id = ?', [(int)($in['id'] ?? 0), $meId]);
  if (!$m) fail('not_found', 404);
  if (!$m['reported_at']) {
    q('UPDATE kl_messages SET reported_at = ? WHERE id = ?', [time(), $m['id']]);
    $from = one('SELECT name, email FROM kl_users WHERE id = ?', [$m['from_id']]);
    notify_admins('🚩 Скарга на повідомлення', [['Від', ($from['name'] ?? '?') . ' <' . ($from['email'] ?? '') . '>'], ['Кому', $me['name']], ['Текст', mb_strlen_safe2($m['text']) > 300 ? substr($m['text'], 0, 300) . '…' : $m['text']]], 'admin.php?p=community');
  }
  out(['ok' => true]);
}
if ($action === 'hide') {
  $to = user_by_code((string)($in['code'] ?? ''));
  if (!$to) fail('not_found', 404);
  q('UPDATE kl_messages SET hidden_from = 1 WHERE from_id = ? AND to_id = ?', [$meId, (int)$to['id']]);
  q('UPDATE kl_messages SET hidden_to = 1 WHERE to_id = ? AND from_id = ?', [$meId, (int)$to['id']]);
  out(['ok' => true]);
}
fail('action');

function mb_strlen_safe2(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : (int)preg_match_all('/./us', $s); }
