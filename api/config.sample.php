<?php
/* Комікс·Lab — налаштування API. Скопіюйте цей файл як config.php (на сервері, у папці comiks/api/)
 * і заповніть. config.php НЕ входить у збірку dist і не перезаписується при оновленнях.
 *
 * Hostinger:
 *  1) hPanel → Databases → MySQL Databases: створіть базу й користувача — впишіть назву, логін і пароль нижче
 *     (хост зазвичай «localhost»).
 *  2) hPanel → Emails: створіть скриньку, напр. no-reply@bilohash.com — впишіть її в mail.from та mail.user,
 *     пароль — у mail.pass. SMTP Hostinger: smtp.hostinger.com, порт 465, ssl.
 *  3) secret — довгий випадковий рядок (наприклад, 64 символи), не змінюйте його після запуску.
 */
return [
  'site_url' => 'https://bilohash.com/comiks/',
  'secret'   => 'ЗАМІНІТЬ-НА-ДОВГИЙ-ВИПАДКОВИЙ-РЯДОК-64-СИМВОЛИ',
  'db' => [
    'dsn'  => 'mysql:host=localhost;dbname=u000000000_komiks;charset=utf8mb4',
    'user' => 'u000000000_komiks',
    'pass' => 'ПАРОЛЬ_БАЗИ',
  ],
  'mail' => [
    'transport' => 'smtp',              // smtp | mail (функція PHP mail) | log (лише для тестів — пише листи у файли)
    'host'      => 'smtp.hostinger.com',
    'port'      => 465,
    'secure'    => 'ssl',               // ssl (465) або tls (587, STARTTLS)
    'user'      => 'no-reply@bilohash.com',
    'pass'      => 'ПАРОЛЬ_ПОШТИ',
    'from'      => 'no-reply@bilohash.com',
    'from_name' => 'Komiks·Lab',
    'reply_to'  => 'no-reply@bilohash.com',
  ],
  // хости для локальної розробки, з яких дозволені POST-запити (на сервері залиште порожнім)
  'dev_hosts' => [],
];
