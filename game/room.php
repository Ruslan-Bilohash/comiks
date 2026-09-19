<?php
/* Boblejakt-rom: HTTP-postkasse slik at klassen kommer inn uten PeerJS.
 * POST { action, code, token?, pid?, msg?, state? }
 * GET  ?action=state&code=     → { ok, state }
 * GET  ?action=events&code=&after=&token=
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require dirname(__DIR__) . '/api/lib.php';

const CODE_RE = '/^[A-HJ-NP-Z2-9]{5}$/';
const TTL = 7200;

function hunt_tables(): void {
  $my = is_mysql();
  $eng = $my ? ' ENGINE=InnoDB DEFAULT CHARSET=utf8mb4' : '';
  $pk = $my ? 'BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
  db()->exec("CREATE TABLE IF NOT EXISTS kl_hunt (code CHAR(5) PRIMARY KEY, token_hash CHAR(64) NOT NULL, state MEDIUMTEXT NOT NULL, updated INT NOT NULL)$eng");
  db()->exec("CREATE TABLE IF NOT EXISTS kl_hunt_ev (id $pk, code CHAR(5) NOT NULL, body TEXT NOT NULL, ts INT NOT NULL)$eng");
  try { db()->exec('CREATE INDEX kl_hunt_ev_code ON kl_hunt_ev (code, id)'); } catch (Throwable $e) { /* ok */ }
}

function hunt_code(string $c): string {
  $c = strtoupper($c);
  if (!preg_match(CODE_RE, $c)) fail('code');
  return $c;
}

function hunt_clean(): void {
  $cut = time() - TTL;
  q('DELETE FROM kl_hunt WHERE updated < ?', [$cut]);
  q('DELETE FROM kl_hunt_ev WHERE ts < ?', [$cut]);
}

hunt_tables();
$action = (string)($_GET['action'] ?? '');
if (method() === 'GET' && $action === 'state') {
  $code = hunt_code((string)($_GET['code'] ?? ''));
  $row = one('SELECT state, updated FROM kl_hunt WHERE code = ?', [$code]);
  if (!$row) fail('room', 404);
  $state = json_decode($row['state'], true) ?: new stdClass();
  out(['ok' => true, 'state' => $state, 'updated' => (int)$row['updated']]);
}
if (method() === 'GET' && $action === 'events') {
  $code = hunt_code((string)($_GET['code'] ?? ''));
  $token = (string)($_GET['token'] ?? '');
  $after = (int)($_GET['after'] ?? 0);
  $row = one('SELECT token_hash FROM kl_hunt WHERE code = ?', [$code]);
  if (!$row || !hash_equals($row['token_hash'], hash('sha256', 'hunt:' . $token))) fail('token', 403);
  $msgs = [];
  $max = $after;
  foreach (q('SELECT id, body FROM kl_hunt_ev WHERE code = ? AND id > ? ORDER BY id ASC LIMIT 80', [$code, $after])->fetchAll() as $r) {
    $msgs[] = json_decode($r['body'], true);
    $max = (int)$r['id'];
  }
  out(['ok' => true, 'msgs' => array_values(array_filter($msgs)), 'after' => $max]);
}

if (method() !== 'POST') fail('method', 405);
require_csrf();
rate_or_fail('hunt:' . ip_hash(), 240, 60);
$in = input();
$action = (string)($in['action'] ?? $action);
$code = hunt_code((string)($in['code'] ?? ''));
hunt_clean();

if ($action === 'open') {
  $token = bin2hex(random_bytes(16));
  $now = time();
  $state = json_encode(['phase' => 'lobby', 'players' => [], 'want' => 10], JSON_UNESCAPED_UNICODE);
  q('REPLACE INTO kl_hunt (code, token_hash, state, updated) VALUES (?, ?, ?, ?)', [$code, hash('sha256', 'hunt:' . $token), $state, $now]);
  q('DELETE FROM kl_hunt_ev WHERE code = ?', [$code]);
  out(['ok' => true, 'token' => $token, 'code' => $code]);
}

if ($action === 'state') {
  $token = (string)($in['token'] ?? '');
  $row = one('SELECT token_hash FROM kl_hunt WHERE code = ?', [$code]);
  if (!$row || !hash_equals($row['token_hash'], hash('sha256', 'hunt:' . $token))) fail('token', 403);
  $state = $in['state'] ?? null;
  if (!is_array($state)) fail('state');
  q('UPDATE kl_hunt SET state = ?, updated = ? WHERE code = ?', [json_encode($state, JSON_UNESCAPED_UNICODE), time(), $code]);
  out(['ok' => true]);
}

if ($action === 'event') {
  $pid = preg_replace('/[^A-Za-z0-9_-]/', '', (string)($in['pid'] ?? ''));
  if (strlen($pid) < 4 || strlen($pid) > 40) fail('pid');
  $msg = $in['msg'] ?? null;
  if (!is_array($msg) || !isset($msg['t'])) fail('msg');
  $t = (string)$msg['t'];
  if (!in_array($t, ['hello', 'ans', 'ping', 'move', 'lane'], true)) fail('msg');
  $msg['pid'] = $pid;
  if ($t === 'hello') {
    $msg['name'] = mb_substr(trim((string)($msg['name'] ?? '?')), 0, 20);
    $msg['avatar'] = mb_substr((string)($msg['avatar'] ?? '🙂'), 0, 80);
  }
  if ($t === 'ans') $msg['pick'] = mb_substr((string)($msg['pick'] ?? ''), 0, 40);
  q('INSERT INTO kl_hunt_ev (code, body, ts) VALUES (?, ?, ?)', [$code, json_encode($msg, JSON_UNESCAPED_UNICODE), time()]);
  out(['ok' => true]);
}

fail('action', 404);
