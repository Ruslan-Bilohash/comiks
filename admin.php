<?php
/* Комікс·Lab — адмін-панель: користувачі, матеріали (комікси), спільнота (стіни, каталог), система.
 * Доступ — лише акаунтам з is_admin = 1 (перший створює install.php). Сесія та сама, що й на сайті (cookie kl_s).
 * Усі дії — POST з CSRF-токеном; небезпечні — з підтвердженням.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
if (!is_file(__DIR__ . '/api/config.php')) { header('Location: install.php'); exit; }
require __DIR__ . '/api/lib.php';
require __DIR__ . '/api/admin_ui.php';
$nonce = html_mode();

$p = preg_replace('/[^a-z]/', '', (string)($_GET['p'] ?? 'dash')) ?: 'dash';
$post = ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST';
$me = current_user();
$isAdmin = $me && !empty($me['is_admin']);
$isStaff = $me && is_staff($me) && empty($me['blocked_at']);
$NAV = $isAdmin ? ['dash' => '📊 Огляд', 'users' => '👥 Користувачі', 'materials' => '📚 Матеріали', 'community' => '💬 Спільнота', 'system' => '⚙️ Система'] : ['community' => '💬 Спільнота'];
if ($isStaff && !$isAdmin && !in_array($p, ['community', 'logout', 'login'], true)) $p = 'community'; // модератор бачить лише модерацію
function go(string $to, string $m = ''): void { $qs = trim($to . ($m !== '' ? '&m=' . $m : ''), '&'); header('Location: admin.php' . ($qs !== '' ? '?' . $qs : '')); exit; }
function int_in(string $k): int { return max(0, (int)($_POST[$k] ?? $_GET[$k] ?? 0)); }

/* ---------- вхід ---------- */
if (!$isStaff) {
  $err = '';
  if ($post && $p === 'login') {
    $email = strtolower(trim((string)($_POST['email'] ?? '')));
    if (limited('admin-login:' . ip_hash(), 10, 900)) $err = 'Забагато спроб. Зачекайте 15 хвилин.';
    else {
      $u = valid_email($email) ? one('SELECT * FROM kl_users WHERE email = ?', [$email]) : null;
      $ok = password_verify((string)($_POST['password'] ?? ''), $u['pass_hash'] ?? '$2y$10$usesomesillystringfore7hnbRJHxXVLeakoG8K30oukPsA.ztMG');
      if ($u && $ok && is_staff($u) && empty($u['blocked_at'])) { start_session((int)$u['id']); go(!empty($u['is_admin']) ? '' : 'p=community'); }
      $err = 'Неправильна пошта або пароль, або акаунт не має прав адміністратора чи модератора.';
    }
  }
  page_open('Вхід', $nonce); ?>
  <div class="auth-wrap"><div class="auth" style="width:min(420px,100%)"><div class="brand"><i>K</i> Komiks·Lab <small>ADMIN</small></div>
    <div class="card"><h1>🔐 Вхід</h1>
      <?php if ($me && !$isStaff): ?><div class="msg warn">Ви увійшли як <?= e($me['email']) ?>, але цей акаунт не адміністратор і не модератор.</div><?php endif; ?>
      <?php if ($err): ?><div class="msg err"><?= e($err) ?></div><?php endif; ?>
      <form method="post" action="admin.php?p=login">
        <label class="f">Пошта<input type="email" name="email" autocomplete="username" required autofocus></label>
        <label class="f">Пароль<input type="password" name="password" autocomplete="current-password" required></label>
        <button class="btn pri">Увійти →</button>
      </form>
      <?php if (is_file(__DIR__ . '/install.php')): ?><p class="muted" style="margin-bottom:0">Ще не створили адміністратора? <a href="install.php">Інсталятор</a></p><?php endif; ?>
    </div></div></div>
  <?php page_close($nonce, false); exit;
}

/* ---------- дії (POST) ---------- */
if ($post) {
  check_admin_csrf();
  $do = (string)($_POST['do'] ?? ($p === 'logout' ? 'logout' : ''));
  $id = int_in('id');
  $target = $id ? one('SELECT * FROM kl_users WHERE id = ?', [$id]) : null;
  $self = $target && (int)$target['id'] === (int)$me['id'];
  $back = 'p=user&id=' . $id;
  // модератору дозволено лише модерацію стін
  $modOnly = ['logout', 'comment_del', 'comment_warn', 'comment_ban', 'unban'];
  if (!$isAdmin && !in_array($do, $modOnly, true)) go('p=community', 'forbidden');
  $cmt = isset($_POST['cid']) ? one('SELECT * FROM kl_comments WHERE id = ?', [(string)$_POST['cid']]) : null;
  $flag = fn(string $col, int $v) => q("UPDATE kl_users SET $col = ? WHERE id = ?", [$v, $id]);
  switch ($do) {
    case 'premium_on': if ($target) $flag('premium', 1); go($back, 'saved');
    case 'premium_off': if ($target) $flag('premium', 0); go($back, 'saved');
    case 'invite_on': if ($target) { $flag('can_invite', 1); $flag('premium', 1); } go($back, 'saved');
    case 'invite_off': if ($target) $flag('can_invite', 0); go($back, 'saved');
    case 'mod_on': if ($target) $flag('is_moderator', 1); go($back, 'saved');
    case 'mod_off': if ($target) $flag('is_moderator', 0); go($back, 'saved');
    case 'wall_ban':
      $hours = in_array((int)($_POST['hours'] ?? 0), [1, 24, 168, 720], true) ? (int)$_POST['hours'] : 24;
      if ($target && !$self) { q('INSERT INTO kl_bans (user_id, ip_hash, until_at, reason, by_id, created_at) VALUES (?, NULL, ?, ?, ?, ?)', [$id, time() + $hours * 3600, 'admin', $me['id'], time()]); q('INSERT INTO kl_notices (user_id, kind, text, by_id, created_at) VALUES (?, ?, ?, ?, ?)', [$id, 'ban', '', $me['id'], time()]); }
      go($back, $self ? 'self' : 'banned');
    case 'warn': if ($target && !$self) q('INSERT INTO kl_notices (user_id, kind, text, by_id, created_at) VALUES (?, ?, ?, ?, ?)', [$id, 'warn', '', $me['id'], time()]); go($back, $self ? 'self' : 'warned');
    case 'unban': q('UPDATE kl_bans SET until_at = ? WHERE id = ?', [time(), int_in('ban')]); go($isAdmin && $id ? $back : 'p=community', 'unbanned');
    case 'comment_warn': case 'comment_ban':
      if ($cmt) {
        $who = $cmt['user_id'] ? [(int)$cmt['user_id'], null] : [null, $cmt['ip_hash'] ?: null]; // акаунт — за акаунтом, гість — за IP
        $victim = $who[0] ? one('SELECT * FROM kl_users WHERE id = ?', [$who[0]]) : null;
        if ($victim && is_staff($victim) && !$isAdmin) go('p=community', 'forbidden');
        q('INSERT INTO kl_notices (user_id, ip_hash, kind, text, by_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [$who[0], $who[1], $do === 'comment_ban' ? 'ban' : 'warn', mb_substr_s($cmt['text'], 300), $me['id'], time()]);
        if ($do === 'comment_ban') { $hours = in_array((int)($_POST['hours'] ?? 0), [1, 24, 168], true) ? (int)$_POST['hours'] : 24; q('INSERT INTO kl_bans (user_id, ip_hash, until_at, reason, by_id, created_at) VALUES (?, ?, ?, ?, ?, ?)', [$who[0], $who[1], time() + $hours * 3600, 'wall', $me['id'], time()]); }
        q('DELETE FROM kl_comments WHERE id = ?', [$cmt['id']]);
      }
      go('p=community', $do === 'comment_ban' ? 'banned' : 'warned');
    case 'set_pass':
      // пароль, який адмін повідомить другові сам (краще — лист «Задати пароль»); ті самі правила, що й при реєстрації
      $np = (string)($_POST['pass'] ?? '');
      if (!$target) go($back);
      if ($prob = password_problem($np)) go($back, 'pw_' . $prob);
      q('UPDATE kl_users SET pass_hash = ?, verified_at = COALESCE(verified_at, ?) WHERE id = ?', [hash_password($np), time(), $id]);
      q('DELETE FROM kl_sessions WHERE user_id = ?', [$id]);
      go($back, 'pw_set');
    case 'create_user':
      $name = clean_text((string)($_POST['name'] ?? ''), 30); $email = strtolower(trim((string)($_POST['email'] ?? '')));
      if ($name === '' || !valid_email($email)) go('p=users', 'bad_input');
      if (one('SELECT id FROM kl_users WHERE email = ?', [$email])) go('p=users', 'exists');
      $lang = in_array($_POST['lang'] ?? '', ['uk', 'en', 'no', 'ar'], true) ? $_POST['lang'] : 'uk';
      $now = time();
      q('INSERT INTO kl_users (email, name, pass_hash, lang, friend_code, share_profile, verified_at, created_at, consent_at, premium, can_invite, is_moderator) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?)',
        [$email, $name, hash_password(rand_hex(24)), $lang, unique_friend_code(), $now, $now, $now, empty($_POST['premium']) ? 0 : 1, empty($_POST['can_invite']) ? 0 : 1, empty($_POST['moderator']) ? 0 : 1]);
      $nu = one('SELECT * FROM kl_users WHERE email = ?', [$email]);
      // посилання «задати пароль» діє 7 днів; лист іде мовою друга
      $sent = send_template($nu, 'setpass', site_url() . '#/reset/' . new_token((int)$nu['id'], 'reset', 7 * 86400));
      go('p=user&id=' . (int)$nu['id'], $sent ? 'created' : 'created_nomail');
    case 'logout': end_session(); go('');
    case 'verify': if ($target) q('UPDATE kl_users SET verified_at = ? WHERE id = ? AND verified_at IS NULL', [time(), $id]); go($back, 'verified');
    case 'resend': if ($target && empty($target['verified_at'])) send_verify($target); go($back, 'sent');
    case 'reset': if ($target) send_template($target, 'reset', site_url() . '#/reset/' . new_token($id, 'reset', RESET_TTL)); go($back, 'sent');
    case 'block': if ($target && !$self) { q('UPDATE kl_users SET blocked_at = ? WHERE id = ?', [time(), $id]); q('DELETE FROM kl_sessions WHERE user_id = ?', [$id]); q('DELETE FROM kl_players WHERE user_id = ? OR code = ?', [$id, $target['friend_code']]); } go($back, $self ? 'self' : 'blocked');
    case 'unblock': if ($target) q('UPDATE kl_users SET blocked_at = NULL WHERE id = ?', [$id]); go($back, 'unblocked');
    case 'admin_on': if ($target) q('UPDATE kl_users SET is_admin = 1 WHERE id = ?', [$id]); go($back, 'saved');
    case 'admin_off': if ($target && !$self) q('UPDATE kl_users SET is_admin = 0 WHERE id = ?', [$id]); go($back, $self ? 'self' : 'saved');
    case 'kick': if ($target && !$self) q('DELETE FROM kl_sessions WHERE user_id = ?', [$id]); go($back, $self ? 'self' : 'kicked');
    case 'delete':
      if (!$target || $self) go($back, 'self');
      if (strtolower(trim((string)($_POST['confirm'] ?? ''))) !== $target['email']) go($back, 'confirm');
      delete_user_all($target); go('p=users', 'deleted');
    case 'comment_del': q('DELETE FROM kl_comments WHERE id = ?', [(string)($_POST['cid'] ?? '')]); go('p=community', 'deleted');
    case 'player_del': q('DELETE FROM kl_players WHERE code = ?', [strtoupper((string)($_POST['code'] ?? ''))]); go('p=community', 'deleted');
    case 'test_mail':
      $html = mail_layout('uk', 'Пошта працює ✅', 'Тестовий лист з адмін-панелі Komiks·Lab.', 'Адмін-панель', site_url() . 'admin.php', '', 'Komiks·Lab');
      go('p=system', send_mail($me['email'], 'Komiks·Lab: тестовий лист', $html, 'Пошта працює.') ? 'mail_ok' : 'mail_fail');
    case 'my_pass':
      if (!password_verify((string)($_POST['old'] ?? ''), $me['pass_hash'])) go('p=system', 'wrong');
      $np = (string)($_POST['new'] ?? '');
      if (strlen($np) < 10) go('p=system', 'short');
      q('UPDATE kl_users SET pass_hash = ? WHERE id = ?', [hash_password($np), $me['id']]);
      q('DELETE FROM kl_sessions WHERE user_id = ? AND token_hash <> ?', [$me['id'], sha((string)$_COOKIE[SESSION_COOKIE])]);
      go('p=system', 'saved');
  }
  go('p=' . $p);
}

$MSG = ['verified' => ['ok', 'Пошту позначено підтвердженою.'], 'sent' => ['ok', 'Лист надіслано.'], 'blocked' => ['ok', 'Користувача заблоковано, його сесії завершено.'], 'unblocked' => ['ok', 'Блокування знято.'],
  'saved' => ['ok', 'Збережено.'], 'kicked' => ['ok', 'Усі сесії користувача завершено.'], 'deleted' => ['ok', 'Видалено.'], 'self' => ['err', 'Цю дію не можна виконати над власним акаунтом.'],
  'confirm' => ['err', 'Для видалення введіть пошту користувача точно.'], 'mail_ok' => ['ok', '📬 Тестовий лист надіслано на вашу пошту.'], 'mail_fail' => ['err', 'Лист не надіслався — перевірте налаштування пошти в api/config.php.'],
  'wrong' => ['err', 'Поточний пароль неправильний.'], 'short' => ['err', 'Новий пароль — щонайменше 10 символів.'],
  'banned' => ['ok', '⛔ Тимчасове блокування стін застосовано, автор побачить анімоване повідомлення.'], 'unbanned' => ['ok', 'Блокування знято.'], 'warned' => ['ok', '⚠️ Попередження надіслано — автор побачить анімацію «так не можна».'],
  'forbidden' => ['err', 'Недостатньо прав.'], 'bad_input' => ['err', 'Вкажіть ім’я та правильну пошту.'], 'exists' => ['err', 'Акаунт з такою поштою вже є — відкрийте його й увімкніть преміум.'],
  'pw_set' => ['ok', '🔑 Пароль задано. Передайте його другові особисто й попросіть змінити в кабінеті.'], 'pw_pass_short' => ['err', 'Пароль закороткий — щонайменше 8 символів (12345 не підходить).'], 'pw_pass_weak' => ['err', 'Цей пароль у списку найпростіших — його підберуть за секунди. Оберіть інший.'], 'pw_pass_long' => ['err', 'Пароль задовгий.'],
  'created' => ['ok', '🎉 Акаунт створено. Другу надіслано лист із посиланням, щоб задати пароль (діє 7 днів).'], 'created_nomail' => ['err', 'Акаунт створено, але лист не надіслався — перевірте пошту в «Системі» й натисніть «Надіслати посилання для нового пароля».']];
$flash = $MSG[(string)($_GET['m'] ?? '')] ?? null;

page_open($NAV[$p] ?? 'Користувач', $nonce, $NAV, $p === 'user' ? 'users' : $p, $me);
if ($flash) echo '<div class="msg ' . $flash[0] . '">' . e($flash[1]) . '</div>';
if (is_file(__DIR__ . '/install.php')) echo '<div class="msg warn">⚠️ Файл <code>install.php</code> ще на сервері — видаліть його (hPanel → File Manager).</div>';
$csrf = '<input type="hidden" name="csrf" value="' . e(admin_csrf()) . '">';
function act(string $do, int $id, string $label, string $cls = '', string $confirm = '', string $extra = ''): string {
  global $csrf;
  return '<form method="post" action="admin.php?p=user&amp;id=' . $id . '"' . ($confirm ? ' data-confirm="' . e($confirm) . '"' : '') . '>' . $csrf . '<input type="hidden" name="do" value="' . e($do) . '"><input type="hidden" name="id" value="' . $id . '">' . $extra . '<button class="btn sm ' . $cls . '">' . $label . '</button></form>';
}
function status_pills(array $u): string {
  $s = '';
  if (!empty($u['is_admin'])) $s .= '<span class="pill y">👑 адмін</span> ';
  if (!empty($u['is_moderator'])) $s .= '<span class="pill b">🛡 модератор</span> ';
  if (!empty($u['premium'])) $s .= '<span class="pill p">💎 преміум</span> ';
  if (!empty($u['can_invite'])) $s .= '<span class="pill p">🎟 запрошує</span> ';
  if (!empty($u['blocked_at'])) $s .= '<span class="pill r">⛔ заблоковано</span> ';
  $s .= !empty($u['verified_at']) ? '<span class="pill g">✓ підтверджено</span>' : '<span class="pill">⏳ не підтверджено</span>';
  return $s;
}
function user_cell(array $u): string { return '<div class="u-name"><span class="u-ava">' . e(mb_first($u['name'])) . '</span><div><b>' . e($u['name']) . '</b><small>' . e($u['email']) . '</small></div></div>'; }

/* ---------- огляд ---------- */
if ($p === 'dash') {
  $now = time(); $week = $now - 7 * 86400;
  $n = fn(string $sql, array $a = []) => (int)(one($sql, $a)['n'] ?? 0);
  $stats = [
    ['👥', 'Користувачів', $n('SELECT COUNT(*) n FROM kl_users'), 'y'],
    ['✅', 'Підтвердили пошту', $n('SELECT COUNT(*) n FROM kl_users WHERE verified_at IS NOT NULL'), 'g'],
    ['🆕', 'Нових за 7 днів', $n('SELECT COUNT(*) n FROM kl_users WHERE created_at >= ?', [$week]), 'b'],
    ['🔥', 'Активні за 7 днів', $n('SELECT COUNT(DISTINCT user_id) n FROM kl_sessions WHERE last_seen >= ?', [$week]), 'r'],
    ['🔎', 'У каталозі гравців', $n('SELECT COUNT(*) n FROM kl_players'), 'p'],
    ['💬', 'Коментарів на стінах', $n('SELECT COUNT(*) n FROM kl_comments'), ''],
  ];
  $days = array_fill(0, 30, 0);
  foreach (q('SELECT created_at FROM kl_users WHERE created_at >= ?', [strtotime('today') - 29 * 86400])->fetchAll() as $r) {
    $i = 29 - intdiv(strtotime('today') - strtotime(date('Y-m-d', (int)$r['created_at'])), 86400);
    if ($i >= 0 && $i < 30) $days[$i]++;
  }
  $max = max(1, max($days));
  echo '<h1>Огляд</h1><div class="stats">';
  foreach ($stats as [$ic, $label, $val, $c]) echo '<div class="stat ' . $c . '"><span>' . $ic . '</span><b>' . $val . '</b><small>' . e($label) . '</small></div>';
  echo '</div><div class="grid"><div class="card"><h2>📈 Реєстрації за 30 днів</h2><div class="bars">';
  foreach ($days as $i => $d) echo '<i style="height:' . max(3, round($d / $max * 100)) . '%;' . ($d ? '' : 'background:var(--line)') . '" data-t="' . date('d.m', strtotime('today') - (29 - $i) * 86400) . ': ' . $d . '"></i>';
  echo '</div><div class="bars-x"><span>' . date('d.m', strtotime('today') - 29 * 86400) . '</span><span>сьогодні</span></div></div>';
  echo '<div class="card"><h2>🆕 Нові користувачі</h2><ul class="list">';
  foreach (q('SELECT * FROM kl_users ORDER BY created_at DESC LIMIT 7')->fetchAll() as $u) echo '<li><div>' . user_cell($u) . '</div><a class="btn sm" href="admin.php?p=user&amp;id=' . (int)$u['id'] . '">→</a></li>';
  echo '</ul><p style="margin:12px 0 0"><a href="admin.php?p=users">Усі користувачі →</a></p></div>';
  echo '<div class="card"><h2>⭐ Найкращі гравці</h2><ul class="list">';
  $top = q('SELECT name, code, level, stars, badges FROM kl_players ORDER BY stars DESC LIMIT 6')->fetchAll();
  foreach ($top as $t) echo '<li><div><b>' . e($t['name']) . '</b> <span class="pill ' . e($t['level']) . '">' . e($t['level'] ?: '—') . '</span></div><span>⭐ ' . (int)$t['stars'] . ' · 🏅 ' . (int)$t['badges'] . '</span></li>';
  if (!$top) echo '<li class="muted">Поки порожньо — гравці з’являться, коли ввімкнуть «Показувати профіль».</li>';
  echo '</ul></div><div class="card"><h2>💬 Останні коментарі</h2><ul class="list">';
  $cm = q('SELECT * FROM kl_comments ORDER BY created_at DESC LIMIT 5')->fetchAll();
  foreach ($cm as $c) echo '<li><div><b>' . e($c['name']) . '</b> → <code>' . e($c['owner']) . '</code><br><small>' . e($c['text']) . '</small></div><small class="muted">' . when((int)$c['created_at']) . '</small></li>';
  if (!$cm) echo '<li class="muted">Коментарів ще немає.</li>';
  echo '</ul></div></div>';
}

/* ---------- користувачі ---------- */
if ($p === 'users') {
  $qs = trim((string)($_GET['q'] ?? '')); $f = (string)($_GET['f'] ?? 'all'); $page = max(0, (int)($_GET['page'] ?? 0)); $per = 30;
  $where = []; $args = [];
  if ($qs !== '') { $where[] = '(LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR friend_code = ?)'; $like = '%' . strtolower($qs) . '%'; array_push($args, $like, $like, strtoupper($qs)); }
  $FILTERS = ['all' => 'Усі', 'verified' => '✓ Підтверджені', 'pending' => '⏳ Не підтвердили', 'admins' => '👑 Адміни', 'mods' => '🛡 Модератори', 'premium' => '💎 Преміум', 'blocked' => '⛔ Заблоковані'];
  if ($f === 'verified') $where[] = 'verified_at IS NOT NULL';
  if ($f === 'pending') $where[] = 'verified_at IS NULL';
  if ($f === 'admins') $where[] = 'is_admin = 1';
  if ($f === 'blocked') $where[] = 'blocked_at IS NOT NULL';
  if ($f === 'mods') $where[] = 'is_moderator = 1';
  if ($f === 'premium') $where[] = 'premium = 1';
  $w = $where ? ' WHERE ' . implode(' AND ', $where) : '';
  $total = (int)one("SELECT COUNT(*) n FROM kl_users$w", $args)['n'];
  $rows = q("SELECT u.*, (SELECT COUNT(*) FROM kl_user_data d WHERE d.user_id = u.id) AS nkeys FROM kl_users u$w ORDER BY created_at DESC LIMIT $per OFFSET " . ($page * $per), $args)->fetchAll();
  echo '<h1>Користувачі <small class="muted">(' . $total . ')</small></h1>';
  echo '<details class="card"><summary style="cursor:pointer;font:800 1.05rem Rubik,sans-serif">➕ Створити безкоштовний акаунт другу</summary><form method="post" action="admin.php?p=users" style="margin-top:12px">' . $csrf . '<input type="hidden" name="do" value="create_user">'
    . '<div class="cols2"><label class="f">Ім’я<input type="text" name="name" maxlength="30" required placeholder="Alina"></label><label class="f">Пошта<input type="email" name="email" required></label>'
    . '<label class="f">Мова листа<select name="lang"><option value="uk">Українська</option><option value="en">English</option><option value="no">Norsk</option><option value="ar">العربية</option></select></label></div>'
    . '<label class="check"><input type="checkbox" name="premium" value="1" checked> 💎 Преміум — безкоштовно назавжди</label><label class="check"><input type="checkbox" name="can_invite" value="1" checked> 🎟 Може запрошувати друзів (їхні акаунти теж безкоштовні)</label><label class="check"><input type="checkbox" name="moderator" value="1"> 🛡 Модератор (чистить стіни, дає тимчасові блокування)</label>'
    . '<p class="muted">Акаунт одразу підтверджений. Другу прийде лист із посиланням, щоб задати свій пароль.</p><button class="btn pri">Створити й надіслати лист</button></form></details><div class="card"><form class="filters" method="get"><input type="hidden" name="p" value="users"><input type="hidden" name="f" value="' . e($f) . '"><input type="search" name="q" value="' . e($qs) . '" placeholder="Ім’я, пошта або код друга…"><button class="btn">🔎 Шукати</button></form><div class="chips" style="margin-bottom:14px">';
  foreach ($FILTERS as $k => $label) echo '<a class="' . ($k === $f ? 'on' : '') . '" href="admin.php?p=users&amp;f=' . $k . '&amp;q=' . urlencode($qs) . '">' . e($label) . '</a>';
  echo '</div><table class="t"><thead><tr><th>Користувач</th><th>Статус</th><th>Код</th><th>Реєстрація</th><th>Останній вхід</th><th>Дані</th><th></th></tr></thead><tbody>';
  foreach ($rows as $u) echo '<tr><td>' . user_cell($u) . '</td><td>' . status_pills($u) . '</td><td data-l="Код"><code>' . e($u['friend_code']) . '</code></td><td data-l="Реєстрація">' . date('d.m.Y', (int)$u['created_at']) . '</td><td data-l="Вхід">' . when($u['last_login'] ? (int)$u['last_login'] : null) . '</td><td data-l="Ключів прогресу">' . (int)$u['nkeys'] . '</td><td><a class="btn sm" href="admin.php?p=user&amp;id=' . (int)$u['id'] . '">Відкрити →</a></td></tr>';
  if (!$rows) echo '<tr><td colspan="7" class="muted">Нікого не знайдено.</td></tr>';
  echo '</tbody></table><div class="pager">';
  $base = 'admin.php?p=users&amp;f=' . e($f) . '&amp;q=' . urlencode($qs) . '&amp;page=';
  if ($page > 0) echo '<a class="btn sm" href="' . $base . ($page - 1) . '">← Назад</a>';
  if (($page + 1) * $per < $total) echo '<a class="btn sm" href="' . $base . ($page + 1) . '">Далі →</a>';
  echo '</div></div>';
}

/* ---------- картка користувача ---------- */
if ($p === 'user') {
  $id = int_in('id');
  $u = one('SELECT * FROM kl_users WHERE id = ?', [$id]);
  if (!$u) { echo '<div class="card"><h1>Не знайдено</h1><a href="admin.php?p=users">← До списку</a></div>'; }
  else {
    $data = q('SELECT k, LENGTH(v) AS size, updated_at FROM kl_user_data WHERE user_id = ? ORDER BY updated_at DESC', [$id])->fetchAll();
    $get = function (string $k) use ($id) { $r = one('SELECT v FROM kl_user_data WHERE user_id = ? AND k = ?', [$id, $k]); return $r ? json_decode($r['v'], true) : null; };
    $progress = (array)($get('progress') ?? []);
    $tests = 0; $stars = 0; foreach ($progress as $pr) { if (is_array($pr) && ($pr['stars'] ?? 0) > 0) { $tests++; $stars += (int)$pr['stars']; } }
    $read = 0; foreach ($data as $d) if (str_starts_with($d['k'], 'seen.')) $read++;
    $known = count((array)($get('wordsKnown') ?? []));
    $sessions = q('SELECT created_at, last_seen, ua FROM kl_sessions WHERE user_id = ? AND expires_at > ? ORDER BY last_seen DESC LIMIT 10', [$id, time()])->fetchAll();
    $player = one('SELECT level, stars, badges FROM kl_players WHERE code = ?', [$u['friend_code']]);
    echo '<p><a href="admin.php?p=users">← Усі користувачі</a></p><div class="card"><div class="row" style="justify-content:space-between"><div class="u-name"><span class="u-ava" style="width:56px;height:56px;font-size:1.4rem">' . e(mb_first($u['name'])) . '</span><div><h1 style="margin:0">' . e($u['name']) . '</h1><small>' . e($u['email']) . '</small></div></div><div>' . status_pills($u) . '</div></div></div>';
    echo '<div class="stats">';
    foreach ([['📖', 'Коміксів відкрито', $read, 'y'], ['🧩', 'Тестів пройдено', $tests, 'g'], ['⭐', 'Зірок у тестах', $stars, 'b'], ['📝', 'Слів вивчено', $known, 'p'], ['🗂️', 'Ключів прогресу', count($data), '']] as [$ic, $l, $val, $c]) echo '<div class="stat ' . $c . '"><span>' . $ic . '</span><b>' . $val . '</b><small>' . $l . '</small></div>';
    echo '</div><div class="grid"><div class="card"><h2>👤 Дані</h2><dl class="kv"><dt>ID</dt><dd>' . (int)$u['id'] . '</dd><dt>Код друга</dt><dd><code>' . e($u['friend_code']) . '</code></dd><dt>Мова</dt><dd>' . e($u['lang']) . '</dd>'
      . '<dt>Реєстрація</dt><dd>' . date('d.m.Y H:i', (int)$u['created_at']) . '</dd><dt>Пошту підтверджено</dt><dd>' . ($u['verified_at'] ? date('d.m.Y H:i', (int)$u['verified_at']) : '—') . '</dd>'
      . '<dt>Останній вхід</dt><dd>' . when($u['last_login'] ? (int)$u['last_login'] : null) . '</dd><dt>Профіль у пошуку</dt><dd>' . ($player ? '✅ ' . e($player['level']) . ' · ⭐ ' . (int)$player['stars'] . ' · 🏅 ' . (int)$player['badges'] : 'прихований') . '</dd>'
      . ($u['blocked_at'] ? '<dt>Заблоковано</dt><dd>' . date('d.m.Y H:i', (int)$u['blocked_at']) . '</dd>' : '') . '</dl>'
      . ($player ? '<p style="margin-bottom:0"><a href="./#/player/c/' . e($u['friend_code']) . '" target="_blank" rel="noopener">Публічний профіль ↗</a></p>' : '') . '</div>';
    echo '<div class="card"><h2>🛠️ Дії</h2><div class="row">';
    if (!$u['verified_at']) { echo act('verify', $id, '✓ Підтвердити пошту', 'ok'); echo act('resend', $id, '📬 Надіслати лист підтвердження'); }
    echo act('reset', $id, '🔑 Надіслати посилання для нового пароля', '', 'Надіслати користувачу лист для зміни пароля?');
    echo act('kick', $id, '🚪 Завершити всі сесії', '', 'Вийти з усіх пристроїв цього користувача?');
    echo $u['is_admin'] ? act('admin_off', $id, '👑 Забрати права адміна', '', 'Забрати права адміністратора?') : act('admin_on', $id, '👑 Зробити адміном', '', 'Надати повний доступ до адмін-панелі?');
    echo $u['blocked_at'] ? act('unblock', $id, '✅ Розблокувати', 'ok') : act('block', $id, '⛔ Заблокувати', 'danger', 'Заблокувати користувача? Він не зможе увійти, а профіль зникне з пошуку.');
    echo '</div><h3 style="margin-top:14px">💎 Доступ і ролі</h3><div class="row">';
    echo !empty($u['premium']) ? act('premium_off', $id, '💎 Зняти преміум') : act('premium_on', $id, '💎 Зробити преміум (безкоштовно)', 'ok');
    echo !empty($u['can_invite']) ? act('invite_off', $id, '🎟 Заборонити запрошувати') : act('invite_on', $id, '🎟 Дозволити запрошувати друзів', 'ok');
    echo !empty($u['is_moderator']) ? act('mod_off', $id, '🛡 Зняти модератора') : act('mod_on', $id, '🛡 Зробити модератором', '', 'Модератор зможе прибирати дописи на стінах і тимчасово блокувати авторів. Продовжити?');
    echo '</div><h3 style="margin-top:14px">🔑 Пароль</h3><div class="row">';
    echo act('set_pass', $id, 'Задати пароль вручну', '', 'Задати новий пароль і завершити всі сесії користувача?', '<input type="text" name="pass" minlength="8" placeholder="щонайменше 8 символів" autocomplete="off" style="margin-bottom:8px;max-width:260px">');
    echo '</div><h3 style="margin-top:14px">💬 Стіни</h3><div class="row">';
    echo act('warn', $id, '⚠️ Надіслати попередження');
    foreach ([1 => '1 год', 24 => '1 добу', 168 => '7 днів', 720 => '30 днів'] as $hh => $lbl) echo act('wall_ban', $id, '⛔ Заборонити писати на ' . $lbl, '', 'Тимчасово заборонити писати на стінах?', '<input type="hidden" name="hours" value="' . $hh . '">');
    $bans = q('SELECT * FROM kl_bans WHERE user_id = ? AND until_at > ? ORDER BY until_at DESC', [$id, time()])->fetchAll();
    foreach ($bans as $b) echo act('unban', $id, '✅ Зняти блок до ' . date('d.m H:i', (int)$b['until_at']), 'ok', '', '<input type="hidden" name="ban" value="' . (int)$b['id'] . '">');
    $invs = q('SELECT i.created_at, i.used_at, x.name, x.id AS xid FROM kl_invites i LEFT JOIN kl_users x ON x.id = i.used_by WHERE i.inviter_id = ? ORDER BY i.created_at DESC LIMIT 30', [$id])->fetchAll();
    $invited = $u['invited_by'] ? one('SELECT id, name FROM kl_users WHERE id = ?', [(int)$u['invited_by']]) : null;
    if ($invited) echo '</div><p style="margin-top:12px">🎟 Запрошення від <a href="admin.php?p=user&amp;id=' . (int)$invited['id'] . '">' . e($invited['name']) . '</a></p><div>';
    if ($invs) { echo '</div><h3 style="margin-top:14px">🎟 Запрошення (' . count($invs) . ')</h3><ul class="list">'; foreach ($invs as $iv) echo '<li><span>' . ($iv['used_at'] ? '✅ <a href="admin.php?p=user&amp;id=' . (int)$iv['xid'] . '">' . e($iv['name']) . '</a>' : '⏳ ще не використане') . '</span><small class="muted">' . date('d.m.Y', (int)$iv['created_at']) . '</small></li>'; echo '</ul><div>'; }
    echo '</div><hr style="border:0;border-top:3px dashed var(--line);margin:16px 0"><h3>🗑️ Видалити акаунт</h3><p class="muted">Видаляє акаунт, прогрес, профіль і коментарі. Введіть пошту користувача для підтвердження.</p>';
    echo act('delete', $id, 'Видалити назавжди', 'danger', 'Видалити акаунт і всі дані назавжди?', '<input type="email" name="confirm" placeholder="' . e($u['email']) . '" style="margin-bottom:8px">');
    echo '</div><div class="card"><h2>💻 Активні сесії (' . count($sessions) . ')</h2><ul class="list">';
    foreach ($sessions as $s) echo '<li><div><small>' . e(ua_short($s['ua'])) . '</small></div><small class="muted">' . when((int)$s['last_seen']) . '</small></li>';
    if (!$sessions) echo '<li class="muted">Немає активних сесій.</li>';
    echo '</ul></div><div class="card"><h2>🗂️ Прогрес на сервері</h2><details><summary style="cursor:pointer;font-weight:800">Показати ключі (' . count($data) . ')</summary><ul class="list" style="margin-top:10px">';
    foreach ($data as $d) echo '<li><code>' . e($d['k']) . '</code><small class="muted">' . number_format((int)$d['size'] / 1024, 1) . ' КБ · ' . when((int)$d['updated_at']) . '</small></li>';
    echo '</ul></details></div></div>';
  }
}
function mb_substr_s(string $s, int $n): string { return preg_match('/^.{0,' . $n . '}/us', $s, $m) ? $m[0] : substr($s, 0, $n); }
function ua_short(string $ua): string {
  $os = preg_match('/iPhone|iPad/', $ua) ? '📱 iOS' : (str_contains($ua, 'Android') ? '📱 Android' : (str_contains($ua, 'Windows') ? '💻 Windows' : (str_contains($ua, 'Mac OS') ? '💻 macOS' : (str_contains($ua, 'Linux') ? '💻 Linux' : '🌐'))));
  $br = str_contains($ua, 'Edg/') ? 'Edge' : (str_contains($ua, 'Firefox') ? 'Firefox' : (str_contains($ua, 'Chrome') ? 'Chrome' : (str_contains($ua, 'Safari') ? 'Safari' : '')));
  return trim("$os $br") ?: 'невідомий пристрій';
}

/* ---------- матеріали ---------- */
if ($p === 'materials') {
  $CATS = ['hverdag' => '☀️ Щоденне життя', 'familie' => '👨‍👩‍👧 Сім’я', 'skole' => '🏫 Школа', 'jobb' => '💼 Робота', 'fritid' => '⚽ Дозвілля', 'mat' => '🍎 Їжа', 'butikk' => '🛒 Магазин',
    'natur' => '🌲 Природа', 'helse' => '🩺 Здоров’я', 'bolig' => '🏠 Житло', 'kultur' => '🎭 Культура'];
  $lvF = (string)($_GET['lv'] ?? '');
  $comics = [];
  foreach (glob(__DIR__ . '/data/comic-*.js') ?: [] as $file) {
    $src = (string)file_get_contents($file);
    $g = fn(string $k) => preg_match("/\\b$k:\\s*'((?:[^'\\\\]|\\\\.)*)'/", $src, $m) ? stripcslashes($m[1]) : '';
    $c = ['id' => $g('id'), 'level' => $g('level'), 'cat' => $g('category'), 'title' => $g('title'), 'uk' => $g('titleUk'), 'en' => $g('titleEn'),
      'panels' => preg_match_all('/\{\s*art:/', $src), 'lines' => preg_match_all('/\bwho:\s*\'/', $src), 'kb' => round(filesize($file) / 1024)];
    if ($c['id'] !== '') $comics[] = $c;
  }
  $byLv = array_count_values(array_column($comics, 'level'));
  $audio = count(glob(__DIR__ . '/audio/*.mp3') ?: []);
  echo '<h1>Матеріали</h1><div class="stats"><div class="stat y"><span>📚</span><b>' . count($comics) . '</b><small>Коміксів</small></div><div class="stat g"><span>🖼️</span><b>' . array_sum(array_column($comics, 'panels')) . '</b><small>Кадрів</small></div><div class="stat b"><span>💬</span><b>' . array_sum(array_column($comics, 'lines')) . '</b><small>Реплік</small></div><div class="stat p"><span>🔊</span><b>' . $audio . '</b><small>Аудіофайлів</small></div></div>';
  echo '<div class="chips" style="margin-bottom:16px"><a class="' . ($lvF === '' ? 'on' : '') . '" href="admin.php?p=materials">Усі рівні</a>';
  foreach (['A1', 'A2', 'B1', 'B2'] as $l) echo '<a class="' . ($lvF === $l ? 'on' : '') . '" href="admin.php?p=materials&amp;lv=' . $l . '">' . $l . ' <small>(' . ($byLv[$l] ?? 0) . ')</small></a>';
  echo '</div>';
  $groups = [];
  foreach ($comics as $c) if ($lvF === '' || $c['level'] === $lvF) $groups[$c['cat']][] = $c;
  $ord = function (string $k) use ($CATS): int { $i = array_search($k, array_keys($CATS), true); return $i === false ? 99 : (int)$i; };
  uksort($groups, fn($a, $b) => $ord((string)$a) <=> $ord((string)$b));
  foreach ($groups as $cat => $list) {
    usort($list, fn($a, $b) => strcmp($a['level'], $b['level']) ?: strnatcmp($a['id'], $b['id']));
    echo '<section class="cat"><h2>' . e($CATS[$cat] ?? $cat) . ' <span class="pill">' . count($list) . '</span></h2><div class="comics">';
    foreach ($list as $c) echo '<div class="comic"><div class="row" style="justify-content:space-between"><span class="pill ' . e($c['level']) . '">' . e($c['level']) . '</span><code>' . e($c['id']) . '</code></div><b>' . e($c['title']) . '</b><small>🇺🇦 ' . e($c['uk']) . '<br>🇬🇧 ' . e($c['en']) . '</small><small>🖼️ ' . $c['panels'] . ' кадрів · 💬 ' . $c['lines'] . ' реплік · ' . $c['kb'] . ' КБ</small><div class="row"><a class="btn sm" href="./#/read/' . e($c['id']) . '/0" target="_blank" rel="noopener">📖 Читати</a><a class="btn sm" href="./#/quiz/' . e($c['id']) . '" target="_blank" rel="noopener">🧩 Тест</a></div></div>';
    echo '</div></section>';
  }
  if (!$groups) echo '<div class="card muted">Коміксів цього рівня немає.</div>';
  $other = ['data/grammar.js' => '📐 Граматика (A1–B2)', 'data/words.js' => '📝 Слова за темами', 'data/english.js' => '🇬🇧 Англійська', 'data/basics.js' => '🔤 Алфавіт і числа', 'data/dictionary.js' => '📖 Словник NO→UK', 'data/dictionary-en.js' => '📖 Словник EN', 'data/characters.js' => '🎭 Персонажі'];
  echo '<div class="card"><h2>🧰 Інші навчальні матеріали</h2><ul class="list">';
  foreach ($other as $f => $label) if (is_file(__DIR__ . '/' . $f)) echo '<li><b>' . $label . '</b><small class="muted"><code>' . e($f) . '</code> · ' . round(filesize(__DIR__ . '/' . $f) / 1024) . ' КБ · ' . date('d.m.Y', filemtime(__DIR__ . '/' . $f)) . '</small></li>';
  echo '</ul><p class="muted" style="margin-bottom:0">Матеріали редагуються у вихідному проєкті й заливаються новою збіркою <code>dist/</code>.</p></div>';
}

/* ---------- спільнота ---------- */
if ($p === 'community') {
  echo '<h1>Спільнота</h1><div class="grid"><div class="card"><h2>💬 Коментарі на стінах</h2><ul class="list">';
  $cm = q('SELECT * FROM kl_comments ORDER BY created_at DESC LIMIT 60')->fetchAll();
  $cform = fn(array $c, string $do, string $label, string $cls = '', string $confirm = '', string $extra = '') => '<form method="post" action="admin.php?p=community"' . ($confirm ? ' data-confirm="' . e($confirm) . '"' : '') . '>' . $csrf . '<input type="hidden" name="do" value="' . $do . '"><input type="hidden" name="cid" value="' . e($c['id']) . '">' . $extra . '<button class="btn sm ' . $cls . '">' . $label . '</button></form>';
  foreach ($cm as $c) echo '<li style="flex-wrap:wrap"><div style="flex:1 1 220px"><b>' . e($c['name']) . '</b>' . (!empty($c['user_id']) ? ($isAdmin ? ' <a href="admin.php?p=user&amp;id=' . (int)$c['user_id'] . '">акаунт</a>' : ' <span class="pill">акаунт</span>') : ' <span class="pill">гість</span>') . ' → <a href="./#/player/c/' . e($c['owner']) . '" target="_blank" rel="noopener"><code>' . e($c['owner']) . '</code></a> <small class="muted">' . when((int)$c['created_at']) . '</small><br>' . e($c['text']) . '</div><div class="row">'
    . $cform($c, 'comment_del', '🗑', 'danger', 'Видалити коментар?') . $cform($c, 'comment_warn', '⚠️ Попередити', '', 'Прибрати допис і показати авторові анімацію «так не можна»?')
    . $cform($c, 'comment_ban', '⛔ 1 год', '', 'Прибрати допис і заборонити авторові писати 1 годину?', '<input type="hidden" name="hours" value="1">') . $cform($c, 'comment_ban', '⛔ 1 добу', '', 'Прибрати допис і заборонити авторові писати 1 добу?', '<input type="hidden" name="hours" value="24">') . $cform($c, 'comment_ban', '⛔ 7 днів', '', 'Прибрати допис і заборонити авторові писати 7 днів?', '<input type="hidden" name="hours" value="168">') . '</div></li>';
  if (!$cm) echo '<li class="muted">Коментарів ще немає.</li>';
  $bans = q('SELECT b.*, u.name FROM kl_bans b LEFT JOIN kl_users u ON u.id = b.user_id WHERE b.until_at > ? ORDER BY b.until_at DESC LIMIT 50', [time()])->fetchAll();
  echo '</ul></div><div class="card"><h2>⛔ Діючі блокування стін (' . count($bans) . ')</h2><ul class="list">';
  foreach ($bans as $b) echo '<li><div><b>' . e($b['name'] ?: 'гість (за IP)') . '</b><br><small class="muted">до ' . date('d.m.Y H:i', (int)$b['until_at']) . '</small></div><form method="post" action="admin.php?p=community">' . $csrf . '<input type="hidden" name="do" value="unban"><input type="hidden" name="ban" value="' . (int)$b['id'] . '"><button class="btn sm ok">Зняти</button></form></li>';
  if (!$bans) echo '<li class="muted">Блокувань немає.</li>';
  if (!$isAdmin) { echo '</ul></div></div>'; } else echo '</ul></div><div class="card"><h2>🔎 Каталог гравців</h2><table class="t"><thead><tr><th>Гравець</th><th>Рівень</th><th>⭐</th><th>Оновлено</th><th></th></tr></thead><tbody>';
  $pl = $isAdmin ? q('SELECT p.code, p.name, p.level, p.stars, p.updated, u.id AS uid FROM kl_players p LEFT JOIN kl_users u ON u.id = p.user_id ORDER BY p.updated DESC LIMIT 60')->fetchAll() : [];
  foreach ($pl as $x) echo '<tr><td><b>' . e($x['name']) . '</b> <code>' . e($x['code']) . '</code>' . ($x['uid'] ? ' <a href="admin.php?p=user&amp;id=' . (int)$x['uid'] . '">акаунт</a>' : '') . '</td><td data-l="Рівень"><span class="pill ' . e($x['level']) . '">' . e($x['level'] ?: '—') . '</span></td><td data-l="Зірки">' . (int)$x['stars'] . '</td><td data-l="Оновлено">' . when((int)$x['updated']) . '</td><td><form method="post" action="admin.php?p=community" data-confirm="Прибрати гравця з пошуку?">' . $csrf . '<input type="hidden" name="do" value="player_del"><input type="hidden" name="code" value="' . e($x['code']) . '"><button class="btn sm">Прибрати</button></form></td></tr>';
  if (!$pl && $isAdmin) echo '<tr><td colspan="5" class="muted">Каталог порожній.</td></tr>';
  if ($isAdmin) echo '</tbody></table></div></div>';
}

/* ---------- система ---------- */
if ($p === 'system') {
  $drv = db()->getAttribute(PDO::ATTR_DRIVER_NAME); $ver = db()->getAttribute(PDO::ATTR_SERVER_VERSION);
  $schema = one("SELECT v FROM kl_meta WHERE k = 'schema'")['v'] ?? '?';
  $m = (array)cfg('mail');
  $perm = substr(sprintf('%o', fileperms(__DIR__ . '/api/config.php')), -4);
  echo '<h1>Система</h1><div class="grid"><div class="card"><h2>🖥️ Сервер</h2><dl class="kv"><dt>PHP</dt><dd>' . PHP_VERSION . '</dd><dt>База</dt><dd>' . e($drv) . ' ' . e($ver) . '</dd><dt>Схема БД</dt><dd>v' . e($schema) . '</dd><dt>Адреса сайту</dt><dd>' . e(site_url()) . '</dd><dt>config.php</dt><dd>права ' . e($perm) . '</dd><dt>install.php</dt><dd>' . (is_file(__DIR__ . '/install.php') ? '⚠️ є — видаліть' : '✅ видалено') . '</dd></dl></div>';
  echo '<div class="card"><h2>📬 Пошта</h2><dl class="kv"><dt>Спосіб</dt><dd>' . e($m['transport'] ?? 'mail') . '</dd><dt>SMTP</dt><dd>' . e(($m['host'] ?? '—') . ':' . ($m['port'] ?? '')) . ' ' . e($m['secure'] ?? '') . '</dd><dt>Відправник</dt><dd>' . e(($m['from_name'] ?? '') . ' <' . ($m['from'] ?? '') . '>') . '</dd></dl>'
    . '<form method="post" action="admin.php?p=system" style="margin-top:12px">' . $csrf . '<input type="hidden" name="do" value="test_mail"><button class="btn pri">📨 Надіслати тестовий лист на ' . e($me['email']) . '</button></form></div>';
  echo '<div class="card"><h2>🔑 Мій пароль</h2><form method="post" action="admin.php?p=system">' . $csrf . '<input type="hidden" name="do" value="my_pass"><label class="f">Поточний пароль<input type="password" name="old" autocomplete="current-password" required></label><label class="f">Новий пароль<input type="password" name="new" minlength="10" autocomplete="new-password" required><small>Щонайменше 10 символів. Інші ваші сесії буде завершено.</small></label><button class="btn">Зберегти</button></form></div></div>';
}

page_close($nonce);
