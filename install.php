<?php
/* Комікс·Lab — інсталятор: MySQL, пошта, перший адміністратор.
 * Відкрийте https://ваш-сайт/comiks/install.php → заповніть форму → потрапите в адмін-панель (admin.php).
 * Безпека: працює, лише поки в базі немає жодного адміністратора; хост БД — лише localhost (база того самого хостингу);
 * якщо config.php уже є — треба ввести пароль бази з нього. Після встановлення файл можна (і варто) видалити.
 */
declare(strict_types=1);
define('KOMIKS_API', 1);
require __DIR__ . '/api/lib.php';
require __DIR__ . '/api/admin_ui.php';
$nonce = html_mode();
header('Cache-Control: no-store');

$cfgFile = __DIR__ . '/api/config.php';
$hasCfg = is_file($cfgFile);
$errors = []; $done = null;

// уже встановлено?
function admin_exists(): bool { try { return (bool)one('SELECT id FROM kl_users WHERE is_admin = 1 LIMIT 1'); } catch (Throwable $e) { return false; } }
if ($hasCfg && admin_exists()) {
  page_open('Встановлено', $nonce);
  echo '<div class="auth-wrap"><div class="auth"><div class="brand"><i>K</i> Komiks·Lab</div><div class="card"><h1>✅ Уже встановлено</h1><p>Адміністратор створений. Увійдіть в адмін-панель.</p><p class="msg warn">Для безпеки видаліть файл <code>install.php</code> із сервера (hPanel → File Manager).</p><a class="btn pri" href="admin.php">Відкрити адмін-панель →</a></div></div></div>';
  page_close($nonce, false); exit;
}

// захист форми: cookie-нонс + приховане поле (double submit)
if (empty($_COOKIE['kl_inst']) || !preg_match('/^[a-f0-9]{32}$/', (string)$_COOKIE['kl_inst'])) { $_COOKIE['kl_inst'] = rand_hex(16); }
setcookie('kl_inst', $_COOKIE['kl_inst'], ['expires' => time() + 3600, 'path' => dirname($_SERVER['SCRIPT_NAME']) ?: '/', 'httponly' => true, 'samesite' => 'Strict', 'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off']);
$formToken = $_COOKIE['kl_inst'];

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
$guessUrl = ($https ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost') . rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/') . '/';
$v = fn(string $k, string $d = '') => (string)($_POST[$k] ?? $d);

// вимоги сервера
$req = [
  ['PHP 8.1 або новіший', version_compare(PHP_VERSION, '8.1.0', '>='), PHP_VERSION],
  ['Розширення pdo_mysql', extension_loaded('pdo_mysql'), ''],
  ['Розширення openssl (SMTP з SSL)', extension_loaded('openssl'), ''],
  ['Папка api/ доступна для запису', is_writable(__DIR__ . '/api') || $hasCfg, $hasCfg ? 'config.php уже є' : ''],
];
$reqOk = !in_array(false, array_column(array_slice($req, 0, 2), 1), true) && ($hasCfg || $req[3][1]);

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
  if (!hash_equals($formToken, (string)($_POST['tok'] ?? ''))) $errors[] = 'Сесія форми застаріла — оновіть сторінку й спробуйте ще раз.';
  if ($hasCfg && limited('install:' . ip_hash(), 15, 900)) $errors[] = 'Забагато спроб. Зачекайте 15 хвилин.';
  $an = trim($v('admin_name')); $ae = strtolower(trim($v('admin_email'))); $ap = $v('admin_pass'); $ap2 = $v('admin_pass2');
  if ($an === '' || mb_strlen_s($an) > 40) $errors[] = 'Вкажіть ім’я адміністратора (до 40 символів).';
  if (!valid_email($ae)) $errors[] = 'Перевірте пошту адміністратора.';
  if (strlen($ap) < 10) $errors[] = 'Пароль адміністратора — щонайменше 10 символів.';
  elseif ($ap !== $ap2) $errors[] = 'Паролі адміністратора не збігаються.';

  if (!$hasCfg) {
    $host = trim($v('db_host', 'localhost')); $name = trim($v('db_name')); $user = trim($v('db_user')); $pass = $v('db_pass');
    $site = trim($v('site_url', $guessUrl));
    if (!in_array($host, ['localhost', '127.0.0.1'], true)) $errors[] = 'Хост бази — лише localhost (база на тому самому хостингу Hostinger).';
    if (!preg_match('/^[A-Za-z0-9_]{1,64}$/', $name) || !preg_match('/^[A-Za-z0-9_]{1,64}$/', $user)) $errors[] = 'Назва бази й користувач — лише латиниця, цифри та _.';
    if (!filter_var($site, FILTER_VALIDATE_URL) || !preg_match('~^https?://~', $site)) $errors[] = 'Перевірте адресу сайту.';
    $mailUser = strtolower(trim($v('mail_user'))); $mailPass = $v('mail_pass');
    $smtpHost = trim($v('smtp_host', 'smtp.hostinger.com')); $smtpPort = (int)$v('smtp_port', '465'); $secure = $v('smtp_secure', 'ssl') === 'tls' ? 'tls' : 'ssl';
    if (!valid_email($mailUser)) $errors[] = 'Вкажіть скриньку для відправки листів (напр. no-reply@ваш-домен).';
    if (!preg_match('/^[a-z0-9.-]+$/i', $smtpHost) || $smtpPort < 1 || $smtpPort > 65535) $errors[] = 'Перевірте SMTP-сервер і порт.';
    if (!$errors) {
      try {
        $dsn = "mysql:host=$host;dbname=$name;charset=utf8mb4";
        new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_TIMEOUT => 5]);
      } catch (Throwable $e) { $errors[] = 'Не вдалося під’єднатися до бази: перевірте назву, користувача й пароль. (' . e(preg_replace('/SQLSTATE\[\w+\]\s*\[\d+\]\s*/', '', $e->getMessage())) . ')'; }
    }
    if (!$errors) {
      $config = [
        'site_url' => rtrim($site, '/') . '/',
        'secret' => rand_hex(32),
        'db' => ['dsn' => $dsn, 'user' => $user, 'pass' => $pass],
        'mail' => ['transport' => 'smtp', 'host' => $smtpHost, 'port' => $smtpPort, 'secure' => $secure, 'user' => $mailUser, 'pass' => $mailPass,
          'from' => $mailUser, 'from_name' => trim($v('from_name', 'Komiks·Lab')) ?: 'Komiks·Lab', 'reply_to' => $mailUser],
        'dev_hosts' => [],
      ];
      $php = "<?php\n/* Комікс·Lab — налаштування, створено install.php " . date('Y-m-d H:i') . ". Не публікуйте цей файл. */\nreturn " . var_export($config, true) . ";\n";
      if (@file_put_contents($cfgFile, $php, LOCK_EX) === false) $errors[] = 'Не вдалося записати api/config.php — дайте папці api/ право на запис (755) або створіть файл вручну з config.sample.php.';
      else { @chmod($cfgFile, 0640); $hasCfg = true; }
    }
  } else {
    // config.php уже є — підтверджуємо, що ви власник: пароль бази з нього
    $cfgPass = (string)(cfg('db.pass') ?? '');
    $local = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true);
    if ($cfgPass === '' ? !$local : !hash_equals($cfgPass, $v('db_confirm'))) $errors[] = 'Пароль бази не збігається з api/config.php.';
  }

  if (!$errors && $hasCfg) {
    db(); // створює таблиці (міграції)
    if (admin_exists()) { header('Location: admin.php'); exit; }
    $now = time();
    $u = one('SELECT * FROM kl_users WHERE email = ?', [$ae]);
    if ($u) q('UPDATE kl_users SET name = ?, pass_hash = ?, is_admin = 1, verified_at = COALESCE(verified_at, ?), blocked_at = NULL WHERE id = ?', [$an, hash_password($ap), $now, $u['id']]);
    else q('INSERT INTO kl_users (email, name, pass_hash, lang, friend_code, share_profile, verified_at, created_at, consent_at, is_admin) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, 1)', [$ae, $an, hash_password($ap), 'uk', unique_friend_code(), $now, $now, $now]);
    $u = one('SELECT * FROM kl_users WHERE email = ?', [$ae]);
    @mkdir(__DIR__ . '/api/data', 0750, true);
    @file_put_contents(__DIR__ . '/api/data/.htaccess', "Require all denied\nDeny from all\n");
    $mailOk = null;
    if (!empty($_POST['test_mail'])) {
      $html = mail_layout('uk', 'Пошта працює ✅', 'Це тестовий лист з інсталятора Komiks·Lab. Якщо ви його бачите — підтвердження реєстрації та листи-привітання будуть доходити до користувачів.', 'Відкрити адмін-панель', site_url() . 'admin.php', '', 'Komiks·Lab');
      $mailOk = send_mail($ae, 'Komiks·Lab: тестовий лист', $html, "Пошта працює. Адмін-панель: " . site_url() . 'admin.php');
    }
    start_session((int)$u['id']);
    setcookie('kl_inst', '', ['expires' => time() - 3600, 'path' => dirname($_SERVER['SCRIPT_NAME']) ?: '/']);
    $done = $mailOk;
  }
}

page_open('Встановлення', $nonce);
echo '<div class="auth-wrap"><div class="auth"><div class="brand"><i>K</i> Komiks·Lab <small>INSTALL</small></div>';
if ($done !== null || (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && !$errors)) {
  echo '<div class="card"><h1>🎉 Готово!</h1><p>База даних налаштована, таблиці створені, адміністратор увійшов.</p>';
  if ($done === true) echo '<p class="msg ok">📬 Тестовий лист надіслано — перевірте скриньку (і «Спам»).</p>';
  if ($done === false) echo '<p class="msg err">Тестовий лист не надіслався. Перевірте пароль скриньки та SMTP у розділі «Система» адмін-панелі.</p>';
  echo '<p class="msg warn">Для безпеки видаліть <code>install.php</code> із сервера.</p><a class="btn pri" href="admin.php">Перейти в адмін-панель →</a></div>';
  echo '</div></div>'; page_close($nonce, false); exit;
}
?>
<div class="card">
  <h1>Встановлення</h1>
  <p class="muted">Кілька хвилин — і сайт працюватиме з MySQL, справжніми листами підтвердження та адмін-панеллю.</p>
  <ul class="req"><?php foreach ($req as [$label, $ok, $note]): ?><li><span><?= e($label) ?><?= $note ? ' <small class="muted">' . e($note) . '</small>' : '' ?></span><b><?= $ok ? '✅' : '❌' ?></b></li><?php endforeach; ?></ul>
  <?php foreach ($errors as $er): ?><div class="msg err"><?= $er ?></div><?php endforeach; ?>
  <?php if (!$reqOk): ?><div class="msg err">Сервер не відповідає вимогам. У hPanel → Advanced → PHP Configuration виберіть PHP 8.3 і ввімкніть pdo_mysql.</div><?php endif; ?>
  <form method="post" autocomplete="off">
    <input type="hidden" name="tok" value="<?= e($formToken) ?>">
    <?php if (!$hasCfg): ?>
    <fieldset><legend>🗄️ База MySQL</legend>
      <p class="muted" style="margin-top:0">hPanel → Databases → MySQL Databases: створіть базу й користувача та впишіть їх сюди.</p>
      <div class="cols2">
        <label class="f">Назва бази<input type="text" name="db_name" value="<?= e($v('db_name')) ?>" placeholder="u123456789_komiks" required></label>
        <label class="f">Користувач<input type="text" name="db_user" value="<?= e($v('db_user')) ?>" placeholder="u123456789_komiks" required></label>
        <label class="f">Пароль бази<input type="password" name="db_pass" required></label>
        <label class="f">Хост<input type="text" name="db_host" value="<?= e($v('db_host', 'localhost')) ?>"><small>На Hostinger — localhost</small></label>
      </div>
      <label class="f">Адреса сайту<input type="url" name="site_url" value="<?= e($v('site_url', $guessUrl)) ?>" required><small>Там, де лежить index.html (з / у кінці)</small></label>
    </fieldset>
    <fieldset><legend>📬 Пошта для листів</legend>
      <p class="muted" style="margin-top:0">hPanel → Emails: створіть скриньку, напр. <code>no-reply@ваш-домен</code>.</p>
      <div class="cols2">
        <label class="f">Скринька<input type="email" name="mail_user" value="<?= e($v('mail_user')) ?>" placeholder="no-reply@bilohash.com" required></label>
        <label class="f">Пароль скриньки<input type="password" name="mail_pass" required></label>
        <label class="f">Ім’я відправника<input type="text" name="from_name" value="<?= e($v('from_name', 'Komiks·Lab')) ?>"></label>
        <label class="f">SMTP-сервер<input type="text" name="smtp_host" value="<?= e($v('smtp_host', 'smtp.hostinger.com')) ?>"></label>
        <label class="f">Порт<input type="number" name="smtp_port" value="<?= e($v('smtp_port', '465')) ?>"></label>
        <label class="f">Шифрування<select name="smtp_secure"><option value="ssl">SSL (465)</option><option value="tls"<?= $v('smtp_secure') === 'tls' ? ' selected' : '' ?>>STARTTLS (587)</option></select></label>
      </div>
    </fieldset>
    <?php else: ?>
    <fieldset><legend>🔐 Підтвердження власника</legend>
      <p class="muted" style="margin-top:0">Файл <code>api/config.php</code> уже є. Щоб створити адміністратора, введіть пароль бази з нього.</p>
      <label class="f">Пароль бази<input type="password" name="db_confirm"></label>
    </fieldset>
    <?php endif; ?>
    <fieldset><legend>👑 Адміністратор</legend>
      <div class="cols2">
        <label class="f">Ім’я<input type="text" name="admin_name" value="<?= e($v('admin_name')) ?>" maxlength="40" required></label>
        <label class="f">Пошта<input type="email" name="admin_email" value="<?= e($v('admin_email')) ?>" required></label>
        <label class="f">Пароль<input type="password" name="admin_pass" minlength="10" autocomplete="new-password" required><small>Щонайменше 10 символів</small></label>
        <label class="f">Повторіть пароль<input type="password" name="admin_pass2" minlength="10" autocomplete="new-password" required></label>
      </div>
      <label class="check"><input type="checkbox" name="test_mail" value="1" checked> Надіслати тестовий лист на цю пошту</label>
    </fieldset>
    <button class="btn pri" <?= $reqOk ? '' : 'disabled' ?>>🚀 Встановити</button>
  </form>
</div>
</div></div>
<?php page_close($nonce, false);

function mb_strlen_s(string $s): int { return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : (int)preg_match_all('/./us', $s); }
