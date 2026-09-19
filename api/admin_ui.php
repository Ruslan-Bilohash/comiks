<?php
/* Комікс·Lab — спільний HTML-каркас для install.php та admin.php (напряму не відкривається). */
declare(strict_types=1);
if (!defined('KOMIKS_API')) { http_response_code(404); exit; }

// HTML замість JSON + суворі заголовки безпеки (скрипти лише з nonce, без вбудовування в iframe)
function html_mode(): string {
  $nonce = base64_encode(random_bytes(16));
  header('Content-Type: text/html; charset=utf-8');
  header('X-Frame-Options: DENY');
  header('X-Robots-Tag: noindex, nofollow');
  header("Content-Security-Policy: default-src 'self'; script-src 'nonce-$nonce'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
  set_exception_handler(function (Throwable $e) {
    error_log('[komiks-admin] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
    http_response_code(500);
    echo '<!doctype html><meta charset="utf-8"><title>Помилка</title><p style="font:16px system-ui;padding:24px">Помилка сервера. Деталі — у журналі помилок PHP (hPanel → Advanced → PHP error logs).</p>';
    exit;
  });
  return $nonce;
}
function e($s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function when(?int $t): string {
  if (!$t) return '—';
  $d = time() - $t;
  if ($d < 60) return 'щойно';
  if ($d < 3600) return intdiv($d, 60) . ' хв тому';
  if ($d < 86400) return intdiv($d, 3600) . ' год тому';
  if ($d < 86400 * 30) return intdiv($d, 86400) . ' дн тому';
  return date('d.m.Y', $t);
}

function page_open(string $title, string $nonce, array $nav = [], string $active = '', ?array $me = null): void {
  ?><!doctype html>
<html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title><?= e($title) ?> · Komiks·Lab Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800&family=Rubik:wght@700;800&display=swap">
<style>
:root { --ink:#141414; --paper:#fff8ea; --paper2:#fff1d0; --white:#fff; --yellow:#ffd23f; --red:#ee4035; --blue:#2e86de; --green:#3bb273; --purple:#7e57c2; --muted:#5d5346; --line:#e9dcc2; }
* { box-sizing:border-box; }
body { margin:0; font:600 15px/1.45 Nunito, system-ui, sans-serif; color:var(--ink); background:var(--paper); background-image:radial-gradient(#e8d9b8 1px, transparent 1px); background-size:18px 18px; }
a { color:var(--blue); }
h1, h2, h3 { font-family:Rubik, 'Arial Black', system-ui, sans-serif; line-height:1.15; margin:0 0 10px; }
h1 { font-size:1.6rem; } h2 { font-size:1.2rem; } h3 { font-size:1.02rem; }
.top { position:sticky; top:0; z-index:5; display:flex; align-items:center; gap:14px; padding:10px 18px; background:var(--white); border-bottom:4px solid var(--ink); }
.brand { display:flex; align-items:center; gap:8px; font:800 1.1rem Rubik, sans-serif; color:var(--ink); text-decoration:none; white-space:nowrap; }
.brand i { font-style:normal; display:grid; place-items:center; width:34px; height:34px; border:3px solid var(--ink); border-radius:50%; background:var(--yellow); }
.brand small { font:700 .72rem Nunito, sans-serif; background:var(--ink); color:var(--yellow); padding:2px 7px; border-radius:6px; }
.nav { display:flex; gap:6px; overflow-x:auto; scrollbar-width:none; flex:1; }
.nav::-webkit-scrollbar { display:none; }
.nav a { flex:none; padding:7px 12px; border:3px solid transparent; border-radius:11px; color:var(--ink); text-decoration:none; font-weight:800; white-space:nowrap; }
.nav a:hover { border-color:var(--ink); background:var(--paper); }
.nav a.on { background:var(--ink); color:var(--yellow); }
.who { display:flex; align-items:center; gap:8px; white-space:nowrap; }
.who form { margin:0; }
main { max-width:1180px; margin:0 auto; padding:22px 16px 60px; }
.card { background:var(--white); border:3px solid var(--ink); border-radius:16px; box-shadow:4px 4px 0 var(--ink); padding:16px 18px; margin-bottom:18px; min-width:0; }
.grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fit, minmax(min(100%, 320px), 1fr)); align-items:start; }
.stats { display:grid; gap:12px; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); margin-bottom:18px; }
.stat { background:var(--white); border:3px solid var(--ink); border-radius:16px; box-shadow:4px 4px 0 var(--ink); padding:12px 14px; position:relative; overflow:hidden; }
.stat b { display:block; font:800 1.9rem Rubik, sans-serif; }
.stat small { color:var(--muted); font-weight:800; }
.stat span { position:absolute; right:10px; top:8px; font-size:1.5rem; opacity:.9; }
.stat.y { background:#fff4c7; } .stat.g { background:#dff6e8; } .stat.b { background:#e0edff; } .stat.r { background:#ffe5e1; } .stat.p { background:#ece4fb; }
.btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; font:800 .95rem Nunito, sans-serif; color:var(--ink); background:var(--white); border:3px solid var(--ink); border-radius:11px; box-shadow:3px 3px 0 var(--ink); cursor:pointer; text-decoration:none; white-space:nowrap; }
.btn:hover { transform:translate(-1px,-1px); box-shadow:4px 4px 0 var(--ink); }
.btn:active { transform:translate(2px,2px); box-shadow:0 0 0 var(--ink); }
.btn.pri { background:var(--yellow); } .btn.ok { background:#c9f0d9; } .btn.danger { background:var(--red); color:var(--white); } .btn.sm { padding:4px 9px; font-size:.84rem; box-shadow:2px 2px 0 var(--ink); }
.row { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
.row form { margin:0; }
label.f { display:grid; gap:4px; font-weight:800; margin-bottom:10px; }
label.f small { color:var(--muted); font-weight:600; }
input[type=text], input[type=email], input[type=password], input[type=search], input[type=number], input[type=url], select { width:100%; font:600 1rem Nunito, sans-serif; padding:9px 12px; border:3px solid var(--ink); border-radius:11px; background:var(--paper); }
input:focus, select:focus { outline:none; background:var(--white); box-shadow:3px 3px 0 var(--blue); }
.check { display:flex; gap:8px; align-items:center; font-weight:700; margin:6px 0 12px; }
.check input { width:20px; height:20px; accent-color:var(--green); }
.cols2 { display:grid; gap:0 14px; grid-template-columns:repeat(auto-fit, minmax(min(100%, 220px), 1fr)); }
.msg { padding:10px 14px; border:3px solid var(--ink); border-radius:12px; margin-bottom:16px; font-weight:800; }
.msg.ok { background:#dff6e8; } .msg.err { background:#ffe5e1; } .msg.warn { background:#fff4c7; }
.muted { color:var(--muted); }
.pill { display:inline-block; padding:1px 8px; border:2px solid var(--ink); border-radius:99px; font-size:.78rem; font-weight:800; background:var(--paper); white-space:nowrap; }
.pill.g { background:#c9f0d9; } .pill.r { background:#ffd2cc; } .pill.y { background:var(--yellow); } .pill.b { background:#cfe2ff; } .pill.p { background:#e2d6fb; }
.pill.A1 { background:#c9f0d9; } .pill.A2 { background:#cfe2ff; } .pill.B1 { background:#ffe2b8; } .pill.B2 { background:#ffd2cc; }
table.t { width:100%; border-collapse:collapse; }
.t th { text-align:left; font-size:.8rem; text-transform:uppercase; letter-spacing:.04em; color:var(--muted); padding:6px 8px; border-bottom:3px solid var(--ink); }
.t td { padding:9px 8px; border-bottom:2px dashed var(--line); vertical-align:middle; }
.t tr:hover td { background:var(--paper); }
.u-name { display:flex; align-items:center; gap:10px; }
.u-ava { flex:none; width:36px; height:36px; display:grid; place-items:center; border:2px solid var(--ink); border-radius:50%; background:var(--yellow); font:800 1rem Rubik, sans-serif; }
.u-name b { display:block; } .u-name small { color:var(--muted); word-break:break-all; }
.filters { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:14px; }
.filters input[type=search] { flex:1 1 220px; width:auto; }
.chips { display:flex; flex-wrap:wrap; gap:6px; }
.chips a { padding:5px 11px; border:2px solid var(--ink); border-radius:99px; color:var(--ink); text-decoration:none; font-weight:800; font-size:.88rem; background:var(--white); }
.chips a.on { background:var(--ink); color:var(--yellow); }
.bars { display:flex; align-items:flex-end; gap:3px; height:120px; padding-top:8px; }
.bars i { flex:1; min-width:4px; background:var(--blue); border:2px solid var(--ink); border-bottom:0; border-radius:5px 5px 0 0; position:relative; }
.bars i:hover::after { content:attr(data-t); position:absolute; bottom:100%; left:50%; transform:translateX(-50%); background:var(--ink); color:var(--white); font-size:.75rem; padding:2px 6px; border-radius:6px; white-space:nowrap; }
.bars-x { display:flex; justify-content:space-between; color:var(--muted); font-size:.78rem; border-top:3px solid var(--ink); padding-top:3px; }
.list { display:grid; gap:8px; margin:0; padding:0; list-style:none; }
.list li { display:flex; gap:10px; align-items:center; justify-content:space-between; padding:8px 10px; border:2px solid var(--ink); border-radius:12px; background:var(--paper); }
.list li > div { min-width:0; }
.cat { margin-bottom:22px; }
.cat h2 { display:flex; align-items:center; gap:8px; }
.comics { display:grid; gap:10px; grid-template-columns:repeat(auto-fill, minmax(min(100%, 250px), 1fr)); }
.comic { display:grid; gap:4px; padding:10px 12px; background:var(--white); border:3px solid var(--ink); border-radius:14px; box-shadow:3px 3px 0 var(--ink); }
.comic b { font-family:Rubik, sans-serif; }
.comic small { color:var(--muted); }
.kv { display:grid; grid-template-columns:max-content 1fr; gap:6px 14px; margin:0; }
.kv dt { color:var(--muted); font-weight:800; } .kv dd { margin:0; word-break:break-word; }
.pager { display:flex; gap:8px; justify-content:center; margin-top:14px; }
code { background:var(--paper2); padding:1px 6px; border-radius:6px; font-size:.9em; }
.auth-wrap { min-height:100vh; display:grid; place-items:center; padding:20px 14px; }
.auth { width:min(560px, 100%); }
.auth .card { padding:24px; }
.auth .brand { justify-content:center; margin-bottom:14px; font-size:1.3rem; }
.req { display:grid; gap:6px; margin:0 0 16px; padding:0; list-style:none; }
.req li { display:flex; justify-content:space-between; gap:10px; padding:6px 10px; border:2px solid var(--ink); border-radius:10px; background:var(--paper); }
fieldset { border:3px dashed var(--ink); border-radius:14px; padding:12px 14px 4px; margin:0 0 16px; }
legend { font:800 1rem Rubik, sans-serif; padding:0 6px; }
@media (max-width:760px) {
  .top { flex-wrap:wrap; padding:8px 12px; gap:8px; }
  .nav { order:3; flex-basis:100%; }
  .who .email { display:none; }
  main { padding:16px 12px 50px; }
  .t thead { display:none; }
  .t, .t tbody, .t tr, .t td { display:block; width:100%; }
  .t tr { border:3px solid var(--ink); border-radius:14px; margin-bottom:10px; background:var(--white); padding:4px 0; }
  .t td { border:0; padding:5px 12px; }
  .t td[data-l]::before { content:attr(data-l) ': '; color:var(--muted); font-weight:800; font-size:.82rem; }
  .kv { grid-template-columns:1fr; } .kv dt { margin-top:6px; }
  .btn { white-space:normal; text-align:left; }
}
</style></head><body>
<?php if ($nav): ?>
<header class="top">
  <a class="brand" href="admin.php"><i>K</i> Komiks·Lab <small>ADMIN</small></a>
  <nav class="nav"><?php foreach ($nav as $k => $label): ?><a href="admin.php?p=<?= e($k) ?>" class="<?= $k === $active ? 'on' : '' ?>"><?= e($label) ?></a><?php endforeach; ?></nav>
  <?php if ($me): ?><div class="who"><span class="u-ava"><?= e(mb_first($me['name'])) ?></span><span class="email muted"><?= e($me['email']) ?></span>
    <a class="btn sm" href="./" target="_blank" rel="noopener">↗ Сайт</a>
    <form method="post" action="admin.php?p=logout"><input type="hidden" name="csrf" value="<?= e(admin_csrf()) ?>"><button class="btn sm">Вийти</button></form></div><?php endif; ?>
</header>
<main>
<?php endif;
}
function page_close(string $nonce, bool $wrapped = true): void {
  if ($wrapped) echo "</main>\n";
  // підтвердження небезпечних дій: <form data-confirm="…">
  echo '<script nonce="' . e($nonce) . '">document.addEventListener("submit",function(ev){var m=ev.target.getAttribute("data-confirm");if(m&&!confirm(m))ev.preventDefault();});</script>';
  echo "</body></html>";
}
function mb_first(string $s): string { return preg_match('/^./u', $s, $m) ? mb_upper($m[0]) : '?'; }
function mb_upper(string $s): string { return function_exists('mb_strtoupper') ? mb_strtoupper($s, 'UTF-8') : strtoupper($s); }

// CSRF для форм адмінки: HMAC від сесійного токена (без сесії — від cookie-«нонса» інсталятора)
function admin_csrf(): string { return hash_hmac('sha256', 'admin|' . sha((string)($_COOKIE[SESSION_COOKIE] ?? '')), (string)cfg('secret')); }
function check_admin_csrf(): void {
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '') && parse_url($origin, PHP_URL_HOST) !== parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) { http_response_code(403); exit('csrf'); }
  if (!hash_equals(admin_csrf(), (string)($_POST['csrf'] ?? ''))) { http_response_code(403); exit('csrf'); }
}
