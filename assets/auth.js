/* Комікс·Lab — серверні акаунти (api/auth.php, MySQL): реєстрація з підтвердженням пошти, лист-привітання,
   вхід, відновлення пароля, синхронізація прогресу між пристроями.
   Якщо сервер недоступний (файл, немає config.php) — сайт працює як раніше, з локальними акаунтами.
   Сторінки: #/login, #/register, #/verify-sent, #/welcome, #/verify-failed, #/forgot, #/reset/<токен>. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/auth.php';
  const GLOBAL = new Set(['users', 'session', 'consent', 'welcomed', 'ui']);
  const S = { server: false, user: null, dirty: new Set(), timer: 0 };
  let readyDone; S.ready = new Promise(r => { readyDone = r; });
  const C = () => window.KomiksCore;
  const TX = {
    uk: {
      login_t: 'Вхід', login_d: 'Увійди, щоб прогрес зберігався на всіх пристроях.', email: 'Пошта', pass: 'Пароль', pass2: 'Повтори пароль', name: 'Ім’я або нікнейм', login_btn: 'Увійти', no_acc: 'Ще немає акаунта?', reg_link: 'Зареєструватися', forgot_link: 'Забули пароль?',
      demo_h: 'Спробуй без пароля', demo_d: 'Демо-учні для класу. Натисни ім’я — і одразу в грі.', demo_as: n => 'Грати як ' + n, demo_note: 'Це демо-акаунт без пароля. Його можуть відкрити інші в класі — не зберігай тут особисте.',
      reg_t: 'Створи акаунт', reg_d: 'Безкоштовно. Прогрес, аватар і друзі — на всіх твоїх пристроях.', reg_btn: 'Створити акаунт', have_acc: 'Уже є акаунт?', consent: 'Я погоджуюсь з умовами використання (за дитину погоджуються батьки).', terms: 'Умови', move: 'Перенести мій поточний прогрес у новий акаунт',
      strength: ['дуже слабкий', 'слабкий', 'непоганий', 'надійний', 'дуже надійний'], pass_hint: 'Щонайменше 8 символів. Краще — фраза з кількох слів.',
      sent_t: 'Перевір свою пошту 📬', sent_d: e => `Ми надіслали лист на <b>${e}</b>. Натисни в ньому кнопку «Підтвердити пошту» — і акаунт буде готовий.`, sent_tips: ['Лист зазвичай приходить за хвилину.', 'Не бачиш? Зазирни в «Спам» або «Промоакції».', 'Посилання діє 48 годин.'], resend: 'Надіслати ще раз', resend_in: s => `Надіслати ще раз через ${s} с`, resent: 'Готово! Перевір пошту ще раз.', wrong_email: 'Помилилися в адресі? Зареєструйтеся ще раз',
      welcome_t: n => `Пошту підтверджено! Ласкаво просимо, ${n}! 🎉`, welcome_d: 'Твій акаунт активний, а на пошту вже летить лист-привітання. Прогрес тепер зберігається на сервері й доступний на будь-якому пристрої.', next_t: 'З чого почати', steps: [['🎨', 'Створи героя', 'Обери тваринку, шапку й окуляри', '#/avatar'], ['📖', 'Перший комікс', 'Прочитай історію з живими голосами', '#/'], ['🔎', 'Знайди друзів', 'Змагайся з іншими гравцями', '#/players']], to_account: 'До кабінету',
      fail_t: 'Посилання не спрацювало 😕', fail_d: 'Посилання для підтвердження вже використане або застаріло. Введи пошту — надішлемо нове.', send_new: 'Надіслати нове посилання',
      forgot_t: 'Забули пароль?', forgot_d: 'Введи пошту акаунта — ми надішлемо посилання для нового пароля.', forgot_btn: 'Надіслати посилання', forgot_ok: 'Якщо така пошта зареєстрована, лист уже в дорозі. Посилання діє 1 годину.',
      reset_t: 'Новий пароль 🔑', reset_btn: 'Зберегти пароль', reset_ok: 'Пароль змінено — ти увійшов.',
      acc_t: '🔐 Акаунт і безпека', verified: '✅ Пошту підтверджено', change_pass: 'Змінити пароль', old_pass: 'Поточний пароль', new_pass: 'Новий пароль', save: 'Зберегти', saved: 'Збережено ✓', logout: '🚪 Вийти', del_t: 'Видалити акаунт', del_d: 'Буде видалено акаунт, прогрес, профіль і коментарі. Цю дію не можна скасувати.', del_btn: 'Видалити назавжди', del_confirm: 'Точно видалити акаунт і всі дані?', synced: '☁️ Прогрес синхронізується з сервером',
      err: { wrong: 'Неправильна пошта або пароль.', unverified: 'Пошту ще не підтверджено. Перевір лист або надішли його ще раз.', pass_short: 'Пароль закороткий — щонайменше 8 символів.', pass_weak: 'Цей пароль надто простий.', pass_long: 'Пароль задовгий.', name: 'Вкажи ім’я (2–30 символів, без посилань).', email: 'Перевір адресу пошти.', consent: 'Потрібна згода з умовами.', slow_down: 'Забагато спроб. Спробуй за кілька хвилин.', token: 'Посилання застаріло — запроси нове.', mismatch: 'Паролі не збігаються.', net: 'Немає зв’язку з сервером. Спробуй ще раз.', server: 'Помилка сервера. Спробуй пізніше.', csrf: 'Онови сторінку й спробуй ще раз.', blocked: 'Акаунт заблоковано. Напиши нам, якщо це помилка.', demo: 'Демо-акаунт не змінює пароль і не видаляється.' }
    },
    en: {
      login_t: 'Log in', login_d: 'Log in to keep your progress on all your devices.', email: 'Email', pass: 'Password', pass2: 'Repeat password', name: 'Name or nickname', login_btn: 'Log in', no_acc: 'No account yet?', reg_link: 'Sign up', forgot_link: 'Forgot password?',
      demo_h: 'Try without a password', demo_d: 'Class demo pupils. Tap a name and you are in.', demo_as: n => 'Play as ' + n, demo_note: 'This is a shared demo account with no password. Do not store anything personal here.',
      reg_t: 'Create your account', reg_d: 'Free. Your progress, avatar and friends — on every device.', reg_btn: 'Create account', have_acc: 'Already have an account?', consent: 'I agree to the terms of use (a parent agrees for a child).', terms: 'Terms', move: 'Move my current progress into the new account',
      strength: ['very weak', 'weak', 'okay', 'strong', 'very strong'], pass_hint: 'At least 8 characters. A phrase of several words is best.',
      sent_t: 'Check your email 📬', sent_d: e => `We sent an email to <b>${e}</b>. Tap “Confirm my email” in it and your account will be ready.`, sent_tips: ['It usually arrives within a minute.', 'Can’t see it? Check Spam or Promotions.', 'The link works for 48 hours.'], resend: 'Send again', resend_in: s => `Send again in ${s} s`, resent: 'Done! Check your inbox again.', wrong_email: 'Wrong address? Sign up again',
      welcome_t: n => `Email confirmed! Welcome, ${n}! 🎉`, welcome_d: 'Your account is active and a welcome email is on its way. Your progress is now saved on the server and available on any device.', next_t: 'Where to start', steps: [['🎨', 'Create your hero', 'Pick an animal, a hat and glasses', '#/avatar'], ['📖', 'First comic', 'Read a story with real voices', '#/'], ['🔎', 'Find friends', 'Compete with other players', '#/players']], to_account: 'To my account',
      fail_t: 'That link didn’t work 😕', fail_d: 'The confirmation link has already been used or has expired. Enter your email and we will send a new one.', send_new: 'Send a new link',
      forgot_t: 'Forgot your password?', forgot_d: 'Enter your account email and we will send a link to set a new password.', forgot_btn: 'Send link', forgot_ok: 'If that email is registered, the message is on its way. The link works for 1 hour.',
      reset_t: 'New password 🔑', reset_btn: 'Save password', reset_ok: 'Password changed — you are logged in.',
      acc_t: '🔐 Account & security', verified: '✅ Email confirmed', change_pass: 'Change password', old_pass: 'Current password', new_pass: 'New password', save: 'Save', saved: 'Saved ✓', logout: '🚪 Log out', del_t: 'Delete account', del_d: 'Your account, progress, profile and comments will be deleted. This cannot be undone.', del_btn: 'Delete forever', del_confirm: 'Really delete your account and all data?', synced: '☁️ Progress syncs with the server',
      err: { wrong: 'Wrong email or password.', unverified: 'Your email is not confirmed yet. Check the email or send it again.', pass_short: 'The password is too short — at least 8 characters.', pass_weak: 'This password is too simple.', pass_long: 'The password is too long.', name: 'Enter a name (2–30 characters, no links).', email: 'Check the email address.', consent: 'Please accept the terms.', slow_down: 'Too many attempts. Try again in a few minutes.', token: 'The link has expired — request a new one.', mismatch: 'Passwords do not match.', net: 'No connection to the server. Please try again.', server: 'Server error. Please try later.', csrf: 'Refresh the page and try again.', blocked: 'This account is blocked. Contact us if this is a mistake.', demo: 'A demo account cannot change password or be deleted.' }
    },
    no: {
      login_t: 'Logg inn', login_d: 'Logg inn for å ha fremgangen på alle enhetene dine.', email: 'E-post', pass: 'Passord', pass2: 'Gjenta passord', name: 'Navn eller kallenavn', login_btn: 'Logg inn', no_acc: 'Har du ikke konto?', reg_link: 'Registrer deg', forgot_link: 'Glemt passord?',
      demo_h: 'Prøv uten passord', demo_d: 'Demo-elever til klassen. Trykk et navn — så er du inne.', demo_as: n => 'Spill som ' + n, demo_note: 'Dette er en felles demokonto uten passord. Ikke lagre noe personlig her.',
      reg_t: 'Lag en konto', reg_d: 'Gratis. Fremgang, avatar og venner – på alle enheter.', reg_btn: 'Lag konto', have_acc: 'Har du allerede konto?', consent: 'Jeg godtar vilkårene (for barn godtar foreldrene).', terms: 'Vilkår', move: 'Flytt fremgangen min til den nye kontoen',
      strength: ['svært svakt', 'svakt', 'greit', 'sterkt', 'svært sterkt'], pass_hint: 'Minst 8 tegn. En setning med flere ord er best.',
      sent_t: 'Sjekk e-posten din 📬', sent_d: e => `Vi har sendt en e-post til <b>${e}</b>. Trykk på «Bekreft e-posten» – så er kontoen klar.`, sent_tips: ['Den kommer vanligvis innen ett minutt.', 'Ser du den ikke? Sjekk søppelpost.', 'Lenken virker i 48 timer.'], resend: 'Send på nytt', resend_in: s => `Send på nytt om ${s} s`, resent: 'Ferdig! Sjekk innboksen igjen.', wrong_email: 'Feil adresse? Registrer deg på nytt',
      welcome_t: n => `E-posten er bekreftet! Velkommen, ${n}! 🎉`, welcome_d: 'Kontoen er aktiv, og en velkomst-e-post er på vei. Fremgangen lagres nå på serveren og er tilgjengelig på alle enheter.', next_t: 'Kom i gang', steps: [['🎨', 'Lag helten din', 'Velg dyr, lue og briller', '#/avatar'], ['📖', 'Første tegneserie', 'Les en historie med ekte stemmer', '#/'], ['🔎', 'Finn venner', 'Konkurrer med andre spillere', '#/players']], to_account: 'Til min side',
      fail_t: 'Lenken virket ikke 😕', fail_d: 'Bekreftelseslenken er brukt eller utløpt. Skriv inn e-posten, så sender vi en ny.', send_new: 'Send ny lenke',
      forgot_t: 'Glemt passordet?', forgot_d: 'Skriv inn e-posten til kontoen, så sender vi en lenke for nytt passord.', forgot_btn: 'Send lenke', forgot_ok: 'Hvis e-posten er registrert, er meldingen på vei. Lenken virker i 1 time.',
      reset_t: 'Nytt passord 🔑', reset_btn: 'Lagre passord', reset_ok: 'Passordet er endret – du er logget inn.',
      acc_t: '🔐 Konto og sikkerhet', verified: '✅ E-posten er bekreftet', change_pass: 'Endre passord', old_pass: 'Nåværende passord', new_pass: 'Nytt passord', save: 'Lagre', saved: 'Lagret ✓', logout: '🚪 Logg ut', del_t: 'Slett konto', del_d: 'Kontoen, fremgangen, profilen og kommentarene slettes. Dette kan ikke angres.', del_btn: 'Slett for alltid', del_confirm: 'Vil du virkelig slette kontoen og alle data?', synced: '☁️ Fremgangen synkroniseres med serveren',
      err: { wrong: 'Feil e-post eller passord.', unverified: 'E-posten er ikke bekreftet ennå. Sjekk e-posten eller send den på nytt.', pass_short: 'Passordet er for kort – minst 8 tegn.', pass_weak: 'Dette passordet er for enkelt.', pass_long: 'Passordet er for langt.', name: 'Skriv et navn (2–30 tegn, uten lenker).', email: 'Sjekk e-postadressen.', consent: 'Du må godta vilkårene.', slow_down: 'For mange forsøk. Prøv igjen om noen minutter.', token: 'Lenken er utløpt – be om en ny.', mismatch: 'Passordene er ikke like.', net: 'Ingen forbindelse til serveren. Prøv igjen.', server: 'Serverfeil. Prøv senere.', csrf: 'Last inn siden på nytt og prøv igjen.', blocked: 'Kontoen er sperret. Kontakt oss hvis dette er en feil.', demo: 'Demokontoen kan ikke bytte passord eller slettes.' }
    }
  };
  TX.ar = {
    login_t: 'تسجيل الدخول', login_d: 'سجّل الدخول ليُحفظ تقدّمك على كل أجهزتك.', email: 'البريد الإلكتروني', pass: 'كلمة المرور', pass2: 'أعد كتابة كلمة المرور', name: 'الاسم أو اللقب', login_btn: 'دخول', no_acc: 'ليس لديك حساب؟', reg_link: 'أنشئ حسابًا', forgot_link: 'نسيت كلمة المرور؟',
    demo_h: 'جرّب بلا كلمة مرور', demo_d: 'تلاميذ تجريبيون للصف. اضغط الاسم وادخل.', demo_as: n => 'العب كـ ' + n, demo_note: 'حساب تجريبي مشترك بلا كلمة مرور. لا تحفظ فيه شيئًا شخصيًا.',
    reg_t: 'أنشئ حسابك', reg_d: 'مجانًا. تقدّمك وشخصيتك وأصدقاؤك — على كل أجهزتك.', reg_btn: 'إنشاء الحساب', have_acc: 'لديك حساب؟', consent: 'أوافق على شروط الاستخدام (عن الطفل يوافق أحد الوالدين).', terms: 'الشروط', move: 'انقل تقدّمي الحالي إلى الحساب الجديد',
    strength: ['ضعيفة جدًا', 'ضعيفة', 'مقبولة', 'قوية', 'قوية جدًا'], pass_hint: '8 أحرف على الأقل. الأفضل عبارة من عدة كلمات.',
    sent_t: 'تحقّق من بريدك 📬', sent_d: e => `أرسلنا رسالة إلى <b>${e}</b>. اضغط فيها على «تأكيد البريد» ويصبح حسابك جاهزًا.`, sent_tips: ['تصل الرسالة عادةً خلال دقيقة.', 'لا تراها؟ تحقّق من مجلد الرسائل غير المرغوب فيها.', 'الرابط صالح لمدة 48 ساعة.'], resend: 'أرسل مجددًا', resend_in: s => `أرسل مجددًا بعد ${s} ث`, resent: 'تم! تحقّق من بريدك مرة أخرى.', wrong_email: 'أخطأت في العنوان؟ سجّل من جديد',
    welcome_t: n => `تم تأكيد البريد! أهلًا بك يا ${n}! 🎉`, welcome_d: 'حسابك مفعّل، ورسالة ترحيب في طريقها إليك. يُحفظ تقدّمك الآن على الخادم ويمكنك الوصول إليه من أي جهاز.', next_t: 'من أين تبدأ', steps: [['🎨', 'أنشئ بطلك', 'اختر حيوانًا وقبعة ونظارة', '#/avatar'], ['📖', 'القصة الأولى', 'اقرأ قصة بأصوات حقيقية', '#/'], ['🔎', 'ابحث عن أصدقاء', 'تنافس مع لاعبين آخرين', '#/players']], to_account: 'إلى حسابي',
    fail_t: 'الرابط لم يعمل 😕', fail_d: 'رابط التأكيد مستخدم أو منتهي الصلاحية. اكتب بريدك وسنرسل رابطًا جديدًا.', send_new: 'أرسل رابطًا جديدًا',
    forgot_t: 'نسيت كلمة المرور؟', forgot_d: 'اكتب بريد حسابك وسنرسل رابطًا لتعيين كلمة مرور جديدة.', forgot_btn: 'أرسل الرابط', forgot_ok: 'إن كان هذا البريد مسجّلًا فالرسالة في طريقها. الرابط صالح لساعة واحدة.',
    reset_t: 'كلمة مرور جديدة 🔑', reset_btn: 'حفظ كلمة المرور', reset_ok: 'تم تغيير كلمة المرور — لقد سجّلت الدخول.',
    acc_t: '🔐 الحساب والأمان', verified: '✅ تم تأكيد البريد', change_pass: 'تغيير كلمة المرور', old_pass: 'كلمة المرور الحالية', new_pass: 'كلمة المرور الجديدة', save: 'حفظ', saved: 'تم الحفظ ✓', logout: '🚪 تسجيل الخروج', del_t: 'حذف الحساب', del_d: 'سيُحذف الحساب والتقدّم والملف الشخصي والتعليقات. لا يمكن التراجع عن ذلك.', del_btn: 'احذف نهائيًا', del_confirm: 'هل تريد حقًا حذف الحساب وكل البيانات؟', synced: '☁️ يُزامَن التقدّم مع الخادم',
    err: { wrong: 'بريد أو كلمة مرور خاطئة.', unverified: 'لم يُؤكَّد البريد بعد. تحقّق من الرسالة أو أرسلها مجددًا.', pass_short: 'كلمة المرور قصيرة جدًا — 8 أحرف على الأقل.', pass_weak: 'كلمة المرور هذه بسيطة جدًا.', pass_long: 'كلمة المرور طويلة جدًا.', name: 'اكتب اسمًا (2–30 حرفًا، بلا روابط).', email: 'تحقّق من عنوان البريد.', consent: 'يلزم الموافقة على الشروط.', slow_down: 'محاولات كثيرة. حاول بعد بضع دقائق.', token: 'انتهت صلاحية الرابط — اطلب رابطًا جديدًا.', mismatch: 'كلمتا المرور غير متطابقتين.', net: 'لا يوجد اتصال بالخادم. حاول مجددًا.', server: 'خطأ في الخادم. حاول لاحقًا.', csrf: 'حدّث الصفحة وحاول مجددًا.', blocked: 'هذا الحساب محظور. تواصل معنا إن كان ذلك خطأ.', demo: 'لا يمكن تغيير كلمة مرور الحساب التجريبي أو حذفه.' }
  };
  const PX3 = {
    uk: { inv_banner: n => `🎟 Тебе запросив(ла) ${n}! Цей акаунт буде безкоштовним назавжди 💎`, inv_bad: 'Це запрошення вже використане або застаріло — можна зареєструватися звичайно.',
      premium: '💎 Преміум — безкоштовно назавжди', staff: { admin: '👑 Адміністратор', moderator: '🛡 Модератор' }, inv_t: '🎟 Запросити друга', inv_d: 'Друзі, яких ти запросиш, отримають безкоштовний акаунт назавжди. Посилання одноразове й діє 30 днів.',
      inv_new: '🎟 Створити посилання', copy: '📋 Копіювати', copied: 'Скопійовано ✓', share: '📤 Поділитися', inv_used: n => `✅ ${n} приєднався(лася)`, inv_wait: d => `⏳ чекає до ${d}`, inv_old: '⌛ застаріло', inv_list: 'Мої запрошення',
      imp_t: '📥 Перенести прогрес з цього пристрою', imp_d: 'Зірки, пройдені тести, слова, аватар і код друга з локального акаунта перейдуть у серверний — найкращі результати зберігаються.', imp_guest: 'Гостьовий прогрес', imp_done: n => `Готово! Перенесено записів: ${n}. Оновлюємо сторінку…`,
      warn_t: 'Так писати не можна 🙅', warn_d: 'Модератор прибрав твій допис зі стіни. Будь добрим до інших — пиши те, що приємно читати.', ban_t: 'Пауза для стіни ⏸️', ban_d: 'Модератор прибрав твій допис і тимчасово заборонив писати на стінах. Грати й навчатися можна далі!', your_text: 'Твій допис:', understood: 'Зрозуміло 👍' },
    en: { inv_banner: n => `🎟 ${n} invited you! This account will be free forever 💎`, inv_bad: 'This invitation is already used or expired — you can still sign up normally.',
      premium: '💎 Premium — free forever', staff: { admin: '👑 Administrator', moderator: '🛡 Moderator' }, inv_t: '🎟 Invite a friend', inv_d: 'Friends you invite get a free account forever. Each link works once and lasts 30 days.',
      inv_new: '🎟 Create a link', copy: '📋 Copy', copied: 'Copied ✓', share: '📤 Share', inv_used: n => `✅ ${n} joined`, inv_wait: d => `⏳ waiting until ${d}`, inv_old: '⌛ expired', inv_list: 'My invitations',
      imp_t: '📥 Move progress from this device', imp_d: 'Stars, finished tests, words, avatar and friend code from the local account move into your server account — the best results are kept.', imp_guest: 'Guest progress', imp_done: n => `Done! Records moved: ${n}. Reloading…`,
      warn_t: 'That is not OK 🙅', warn_d: 'A moderator removed your comment from a wall. Be kind to others — write things that are nice to read.', ban_t: 'Wall pause ⏸️', ban_d: 'A moderator removed your comment and paused your wall writing for a while. You can still play and learn!', your_text: 'Your comment:', understood: 'Got it 👍' },
    no: { inv_banner: n => `🎟 ${n} har invitert deg! Denne kontoen blir gratis for alltid 💎`, inv_bad: 'Invitasjonen er brukt eller utløpt – du kan registrere deg som vanlig.',
      premium: '💎 Premium – gratis for alltid', staff: { admin: '👑 Administrator', moderator: '🛡 Moderator' }, inv_t: '🎟 Inviter en venn', inv_d: 'Venner du inviterer, får en gratis konto for alltid. Hver lenke virker én gang i 30 dager.',
      inv_new: '🎟 Lag en lenke', copy: '📋 Kopier', copied: 'Kopiert ✓', share: '📤 Del', inv_used: n => `✅ ${n} ble med`, inv_wait: d => `⏳ venter til ${d}`, inv_old: '⌛ utløpt', inv_list: 'Mine invitasjoner',
      imp_t: '📥 Flytt fremgang fra denne enheten', imp_d: 'Stjerner, fullførte tester, ord, avatar og vennekode fra den lokale kontoen flyttes til serverkontoen – de beste resultatene beholdes.', imp_guest: 'Gjestefremgang', imp_done: n => `Ferdig! Flyttet ${n} poster. Laster inn på nytt …`,
      warn_t: 'Sånn kan vi ikke skrive 🙅', warn_d: 'En moderator fjernet innlegget ditt fra en vegg. Vær snill mot andre – skriv noe som er hyggelig å lese.', ban_t: 'Pause fra veggen ⏸️', ban_d: 'En moderator fjernet innlegget ditt og satte skriving på vegger på pause en stund. Du kan fortsatt spille og lære!', your_text: 'Innlegget ditt:', understood: 'Skjønner 👍' }
  };
  PX3.ar = { inv_banner: n => `🎟 دعاك ${n}! سيكون هذا الحساب مجانيًا إلى الأبد 💎`, inv_bad: 'هذه الدعوة مستخدمة أو منتهية — يمكنك التسجيل بشكل عادي.',
    premium: '💎 مميّز — مجاني إلى الأبد', staff: { admin: '👑 مدير', moderator: '🛡 مشرف' }, inv_t: '🎟 ادعُ صديقًا', inv_d: 'الأصدقاء الذين تدعوهم يحصلون على حساب مجاني إلى الأبد. كل رابط يُستخدم مرة واحدة ويصلح 30 يومًا.',
    inv_new: '🎟 أنشئ رابطًا', copy: '📋 نسخ', copied: 'تم النسخ ✓', share: '📤 مشاركة', inv_used: n => `✅ انضم ${n}`, inv_wait: d => `⏳ ينتظر حتى ${d}`, inv_old: '⌛ منتهية', inv_list: 'دعواتي',
    imp_t: '📥 انقل التقدّم من هذا الجهاز', imp_d: 'تنتقل النجوم والاختبارات المنجزة والكلمات والشخصية ورمز الصديق من الحساب المحلي إلى حسابك على الخادم — وتُحفظ أفضل النتائج.', imp_guest: 'تقدّم الزائر', imp_done: n => `تم! نُقل ${n} سجلًا. جارٍ تحديث الصفحة…`,
    warn_t: 'هذا غير مقبول 🙅', warn_d: 'أزال مشرف تعليقك من الجدار. كن لطيفًا مع الآخرين — اكتب ما يسعد قراءته.', ban_t: 'استراحة من الجدار ⏸️', ban_d: 'أزال مشرف تعليقك وأوقف الكتابة على الجدران لفترة. ما زال بإمكانك اللعب والتعلّم!', your_text: 'تعليقك:', understood: 'فهمت 👍' };
  const a3 = (k, ...a) => { const t = PX3[C().ui] || PX3.en; const v = t[k]; return typeof v === 'function' ? v(...a) : v; };
  const ax = (k, ...a) => { const t = TX[C().ui] || TX.en; const v = k in t ? t[k] : TX.en[k]; return typeof v === 'function' ? v(...a) : v; };
  const errText = e => (ax('err')[e] || ax('err').server);

  /* ---------- запити ---------- */
  const post = (action, body) => fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(Object.assign({ action }, body || {})) })
    .then(r => r.json().catch(() => ({ ok: false, error: r.status >= 500 ? 'server' : 'net' }))).catch(() => ({ ok: false, error: 'net' }));
  const get = action => fetch(API + '?action=' + action, { credentials: 'same-origin', cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null);

  /* ---------- сесія ↔ локальне сховище ---------- */
  const sidOf = u => 's' + u.id;
  function applyUser(u, { pull = true } = {}) {
    const K = C();
    S.user = u;
    const cur = K.raw.get('comiks.session', null);
    if (!u) { if (cur && String(cur).startsWith('s')) { K.setSession(null); K.route(); } return Promise.resolve(); }
    const sid = sidOf(u);
    const all = K.raw.get('comiks.users', {});
    all[sid] = Object.assign({}, all[sid], { id: sid, name: u.name, email: u.email, created: u.created, server: true, verified: u.verified });
    K.raw.set('comiks.users', all);
    const switched = cur !== sid;
    // з якого локального акаунта цього пристрою прийшли (для автоматичного перенесення прогресу)
    if (switched && cur && !String(cur).startsWith('s')) S.importFrom = String(cur);
    if (switched) K.setSession(sid);
    K.raw.set(`comiks.u.${sid}.friendCode`, u.friend_code); // один код друга на всіх пристроях
    return (pull ? pullData(sid) : Promise.resolve()).then(() => { if (switched) K.route(); });
  }
  /* ---- перенесення прогресу з пристрою в серверний акаунт: розумне злиття ---- */
  const GLOBAL_KEYS = GLOBAL;
  const SKIP_IMPORT = new Set(['friendCode', 'dirListed', 'wallWaitUntil', 'gameProfile', 'gameHistory', 'readHint', 'a11y', 'music']); // глобальні налаштування пристрою не переносимо
  function mergeVal(a, b, key) {
    if (a === undefined || a === null) return b;
    if (b === undefined || b === null) return a;
    if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b); // рекорди, зірки, лічильники — найкраще
    if (Array.isArray(a) && Array.isArray(b)) {
      const seen = new Set(a.map(x => JSON.stringify(x))), out = a.slice();
      b.forEach(x => { const k = JSON.stringify(x); if (!seen.has(k)) { seen.add(k); out.push(x); } });
      if (key === 'quizlog') out.sort((x, y) => String(y.date || '').localeCompare(String(x.date || '')));
      return out.slice(0, 3000);
    }
    if (typeof a === 'object' && typeof b === 'object') { const o = Object.assign({}, a); for (const k of Object.keys(b)) o[k] = mergeVal(a[k], b[k], k); return o; }
    return a; // рядки (аватар, налаштування) — лишаємо поточні
  }
  const guestHasData = () => { try { return !!localStorage.getItem('comiks.stats') || !!localStorage.getItem('comiks.progress'); } catch { return false; } };
  // from: id локального акаунта ('u…') або '' — гостьовий прогрес
  async function importLocal(from, sid) {
    const K = C(), pre = from ? `comiks.u.${from}.` : 'comiks.';
    let n = 0;
    try {
      const keys = []; for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
      for (const full of keys) {
        if (!full.startsWith(pre)) continue;
        const k = full.slice(pre.length);
        if (!from && (full.startsWith('comiks.u.') || GLOBAL_KEYS.has(k) || k === 'users')) continue;
        if (SKIP_IMPORT.has(k) || k.startsWith('wall.') || !/^[A-Za-z0-9._:-]{1,64}$/.test(k)) continue;
        let val; try { val = JSON.parse(localStorage.getItem(full)); } catch { continue; }
        const cur = K.raw.get(`comiks.u.${sid}.${k}`, null);
        const merged = mergeVal(cur, val, k);
        if (JSON.stringify(merged) !== JSON.stringify(cur)) { K.raw.set(`comiks.u.${sid}.${k}`, merged); S.dirty.add(k); n++; }
      }
    } catch { /* ignore */ }
    // старий код друга: друзі, стіна й картка в пошуку лишаються твоїми
    const oldCode = from ? K.raw.get(`comiks.u.${from}.friendCode`, null) : K.raw.get('comiks.friendCode', null);
    const secret = from ? K.raw.get(`comiks.u.${from}.wallSecret`, null) : K.raw.get('comiks.wallSecret', null);
    if (oldCode && S.user && oldCode !== S.user.friend_code) {
      const r = await post('adopt_code', { code: oldCode, secret: secret || '' });
      if (r.ok) { S.user.friend_code = r.friend_code; K.raw.set(`comiks.u.${sid}.friendCode`, r.friend_code); if (secret) { K.raw.set(`comiks.u.${sid}.wallSecret`, secret); S.dirty.add('wallSecret'); } }
    }
    if (n) schedule(300);
    return n;
  }
  // локальні акаунти на цьому пристрої, з яких можна перенести прогрес
  const localAccounts = () => Object.values(C().raw.get('comiks.users', {})).filter(x => x && x.id && !String(x.id).startsWith('s'));
  function scopedKeys(sid) {
    const pre = `comiks.u.${sid}.`, out = [];
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(pre)) out.push(k.slice(pre.length)); } } catch { /* ignore */ }
    return out;
  }
  async function pullData(sid) {
    const K = C();
    const j = await get('data');
    if (!j || !j.ok) return;
    const keys = Object.keys(j.data || {});
    if (!keys.length) {
      // перший вхід на сервері: переносимо прогрес локального акаунта цього пристрою (або гостьовий) і відправляємо все
      if (S.importFrom) await importLocal(S.importFrom, sid);
      else if (!K.raw.get('comiks.session', null) || K.raw.get('comiks.session', null) === sid) { if (guestHasData()) await importLocal('', sid); }
      scopedKeys(sid).filter(k => /^[A-Za-z0-9._:-]{1,64}$/.test(k)).forEach(k => S.dirty.add(k));
      schedule(300);
      return;
    }
    keys.forEach(k => K.raw.set(`comiks.u.${sid}.${k}`, j.data[k]));
  }
  function schedule(ms = 2000) { clearTimeout(S.timer); S.timer = setTimeout(push, ms); }
  async function push(keepalive = false) {
    if (!S.server || !S.user || !S.dirty.size) return;
    const K = C(), items = {};
    [...S.dirty].slice(0, 80).forEach(k => { items[k] = K.store.get(k, null); S.dirty.delete(k); });
    const body = JSON.stringify({ action: 'data', items });
    if (keepalive) { try { fetch(API, { method: 'POST', credentials: 'same-origin', keepalive: true, headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body }); } catch { /* ignore */ } return; }
    const r = await fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body }).then(x => x.json()).catch(() => null);
    if (!r || !r.ok) Object.keys(items).forEach(k => S.dirty.add(k)); // спробуємо пізніше
    if (S.dirty.size) schedule(r && r.ok ? 500 : 15000);
  }
  function hookStore() {
    const K = C(), st = K.store;
    const set = st.set, del = st.del;
    st.set = (k, v) => { set(k, v); if (S.server && S.user && !GLOBAL.has(k)) { S.dirty.add(k); schedule(); } };
    st.del = k => { del(k); if (S.server && S.user && !GLOBAL.has(k)) { S.dirty.add(k); schedule(); } };
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') push(true); });
  }

  /* ---------- дії ---------- */
  async function logout() {
    await push();
    await post('logout');
    S.user = null;
    C().setSession(null); location.hash = '#/'; C().route();
  }

  /* ---------- UI ---------- */
  const h = (...a) => C().h(...a);
  const field = (label, input, extra) => h('label', { class: 'au-field' }, h('span', {}, label), input, extra || null);
  const input = (type, attrs = {}) => h('input', Object.assign({ type, class: 'au-input' }, attrs));
  function strengthMeter(inp) {
    const bar = h('i'), txt = h('small', {});
    const box = h('div', { class: 'au-strength' }, h('span', { class: 'au-bar' }, bar), txt);
    const score = p => { let s = 0; if (p.length >= 8) s++; if (p.length >= 12) s++; if (/[A-ZÆØÅ]/.test(p) && /[a-zæøå]/.test(p)) s++; if (/\d/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p) || p.split(/\s+/).length >= 3) s++; return Math.min(4, p.length < 8 ? Math.min(1, s) : s); };
    inp.addEventListener('input', () => { const s = inp.value ? score(inp.value) : -1; box.dataset.s = s; bar.style.width = ((s + 1) * 20) + '%'; txt.textContent = s >= 0 ? ax('strength')[s] : ''; });
    return box;
  }
  const shell = (cls, ...kids) => h('section', { class: 'au-wrap ' + cls }, h('div', { class: 'au-card' }, ...kids));
  const art = emoji => h('div', { class: 'au-art', 'aria-hidden': 'true' }, h('span', {}, emoji));
  const msgEl = () => h('p', { class: 'au-msg', role: 'alert' });
  const busy = (btn, on) => { btn.disabled = on; btn.classList.toggle('busy', on); };

  function loginView() {
    const K = C();
    const email = input('email', { autocomplete: 'email', required: true }), pass = input('password', { autocomplete: 'current-password', required: true });
    const msg = msgEl(), btn = h('button', { class: 'btn accent big', type: 'submit' }, ax('login_btn'));
    const extra = h('div', {});
    const demos = h('div', { class: 'au-demos', hidden: true });
    const pickDemo = async (who, b) => {
      msg.textContent = ''; busy(b, true);
      const r = await post('demo', { who });
      busy(b, false);
      if (!r.ok) { msg.textContent = errText(r.error); return; }
      await applyUser(r.user);
      location.hash = '#/account'; K.route();
    };
    get('demos').then(j => {
      if (!j || !j.ok || !j.demos || !j.demos.length) return;
      demos.hidden = false;
      const Av = window.KomiksAvatars;
      demos.replaceChildren(
        h('p', { class: 'au-demo-h' }, ax('demo_h')),
        h('p', { class: 'au-hint' }, ax('demo_d')),
        h('div', { class: 'au-demo-grid' }, ...j.demos.map(d => h('button', { type: 'button', class: 'au-demo', title: ax('demo_as', d.name), onclick: ev => pickDemo(d.who, ev.currentTarget) },
          Av ? Av.el(d.avatar, { size: 52, mood: 'cheer' }) : h('span', {}, '🙂'),
          h('b', {}, d.name),
          h('small', {}, d.blurb || d.level))))
      );
    });
    const form = h('form', { class: 'au-form' }, field(ax('email'), email), field(ax('pass'), pass, h('a', { class: 'au-link', href: '#/forgot' }, ax('forgot_link'))), msg, extra, btn);
    form.addEventListener('submit', async e => {
      e.preventDefault(); msg.textContent = ''; extra.replaceChildren(); busy(btn, true);
      const r = await post('login', { email: email.value.trim(), password: pass.value });
      busy(btn, false);
      if (!r.ok) {
        msg.textContent = errText(r.error);
        if (r.error === 'unverified') extra.append(h('button', { class: 'btn', type: 'button', onclick: async ev => { busy(ev.target, true); await post('resend', { email: email.value.trim() }); try { sessionStorage.setItem('kl.pendingEmail', email.value.trim()); } catch { /* ignore */ } location.hash = '#/verify-sent'; } }, ax('resend')));
        return;
      }
      await applyUser(r.user);
      location.hash = '#/account'; K.route();
    });
    setTimeout(() => email.focus(), 50);
    return shell('au-login', art('🔐'), h('h2', {}, ax('login_t')), h('p', { class: 'au-lead' }, ax('login_d')), demos, form,
      h('p', { class: 'au-alt' }, ax('no_acc'), ' ', h('a', { href: '#/register' }, ax('reg_link'))));
  }
  function registerView(invite) {
    const K = C();
    const code = /^[a-f0-9]{24}$/.test(String(invite || '')) ? String(invite) : '';
    const banner = h('div', { class: 'au-invite', hidden: true });
    if (code) get('invite&code=' + code).then(j => { banner.hidden = false; banner.classList.toggle('bad', !(j && j.valid)); banner.textContent = j && j.valid ? a3('inv_banner', j.from) : a3('inv_bad'); });
    const name = input('text', { autocomplete: 'nickname', maxlength: 30, required: true }), email = input('email', { autocomplete: 'email', required: true });
    const pass = input('password', { autocomplete: 'new-password', required: true, minlength: 8 }), consent = h('input', { type: 'checkbox' }), move = h('input', { type: 'checkbox', checked: true });
    const msg = msgEl(), btn = h('button', { class: 'btn accent big', type: 'submit' }, ax('reg_btn'));
    const guestHasData = !K.currentUser() && !!K.store.get('stats', null);
    const form = h('form', { class: 'au-form' }, field(ax('name'), name), field(ax('email'), email), field(ax('pass'), pass, h('small', { class: 'au-hint' }, ax('pass_hint'))), strengthMeter(pass),
      h('label', { class: 'au-check' }, consent, h('span', {}, ax('consent'), ' ', h('a', { href: '#/terms', target: '_blank' }, ax('terms')))),
      guestHasData ? h('label', { class: 'au-check' }, move, h('span', {}, ax('move'))) : null, msg, btn);
    form.addEventListener('submit', async e => {
      e.preventDefault(); msg.textContent = '';
      if (!consent.checked) { msg.textContent = errText('consent'); return; }
      busy(btn, true);
      const r = await post('register', { name: name.value.trim(), email: email.value.trim(), password: pass.value, lang: K.ui, consent: true, invite: code || undefined });
      busy(btn, false);
      if (!r.ok) { msg.textContent = errText(r.error); return; }
      try { sessionStorage.setItem('kl.pendingEmail', email.value.trim()); sessionStorage.setItem('kl.moveGuest', guestHasData && move.checked ? '1' : ''); } catch { /* ignore */ }
      location.hash = '#/verify-sent';
    });
    setTimeout(() => name.focus(), 50);
    return shell('au-register', art(code ? '🎟' : '✨'), h('h2', {}, ax('reg_t')), banner, h('p', { class: 'au-lead' }, ax('reg_d')), form,
      window.KomiksProfile && window.KomiksProfile.freeNote ? window.KomiksProfile.freeNote() : null,
      h('p', { class: 'au-alt' }, ax('have_acc'), ' ', h('a', { href: '#/login' }, ax('login_btn'))));
  }
  function resendButton(getEmail) {
    const btn = h('button', { class: 'btn', type: 'button' }, ax('resend'));
    const note = h('small', { class: 'au-hint' });
    let left = 0, t = 0;
    const tick = () => { if (left <= 0) { clearInterval(t); btn.disabled = false; btn.textContent = ax('resend'); return; } btn.textContent = ax('resend_in', left--); };
    btn.addEventListener('click', async () => { const e = getEmail(); if (!e) return; btn.disabled = true; const r = await post('resend', { email: e }); note.textContent = r.ok ? ax('resent') : errText(r.error); left = 60; tick(); t = setInterval(tick, 1000); });
    return h('div', { class: 'au-resend' }, btn, note);
  }
  function sentView() {
    let email = ''; try { email = sessionStorage.getItem('kl.pendingEmail') || ''; } catch { /* ignore */ }
    const safe = email.replace(/[<>&"]/g, '');
    const p = h('p', { class: 'au-lead' }); p.innerHTML = ax('sent_d', safe || '…');
    return shell('au-sent', h('div', { class: 'au-mail', 'aria-hidden': 'true' }, h('span', { class: 'env' }, '✉️'), h('i'), h('i'), h('i')), h('h2', {}, ax('sent_t')), p,
      h('ul', { class: 'au-tips' }, ax('sent_tips').map(x => h('li', {}, x))),
      resendButton(() => email), h('p', { class: 'au-alt' }, h('a', { href: '#/register' }, ax('wrong_email'))));
  }
  function welcomeView() {
    const K = C();
    const box = shell('au-welcome', h('div', { class: 'au-spinner' }));
    (async () => {
      const j = await get('me');
      if (!j || !j.user) { location.hash = '#/login'; return; }
      // перенести гостьовий прогрес, якщо користувач так вибрав під час реєстрації
      let move = ''; try { move = sessionStorage.getItem('kl.moveGuest') || ''; sessionStorage.removeItem('kl.moveGuest'); } catch { /* ignore */ }
      if (move && K.copyGuestProgressTo) K.copyGuestProgressTo(sidOf(j.user));
      await applyUser(j.user);
      const av = window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊';
      box.querySelector('.au-card').replaceChildren(
        h('div', { class: 'au-hero' }, window.KomiksAvatars ? window.KomiksAvatars.el(av, { size: 150, mood: 'cheer' }) : h('span', {}, '🎉'), h('div', { class: 'au-rays', 'aria-hidden': 'true' })),
        h('h2', {}, ax('welcome_t', j.user.name)), h('p', { class: 'au-lead' }, ax('welcome_d')),
        h('h3', {}, ax('next_t')),
        h('div', { class: 'au-steps' }, ax('steps').map(([ic, t, d, href], i) => h('a', { class: 'au-step', href, style: { '--i': i } }, h('span', {}, ic), h('b', {}, t), h('small', {}, d)))),
        h('a', { class: 'btn accent big', href: '#/account' }, ax('to_account')));
      K.confetti(); K.Sfx.win();
    })();
    return box;
  }
  function failView() {
    const email = input('email', { autocomplete: 'email' });
    return shell('au-fail', art('🔗'), h('h2', {}, ax('fail_t')), h('p', { class: 'au-lead' }, ax('fail_d')), h('div', { class: 'au-form' }, field(ax('email'), email), resendButton(() => email.value.trim())));
  }
  function forgotView() {
    const email = input('email', { autocomplete: 'email', required: true });
    const msg = msgEl(), btn = h('button', { class: 'btn accent big', type: 'submit' }, ax('forgot_btn'));
    const form = h('form', { class: 'au-form' }, field(ax('email'), email), msg, btn);
    form.addEventListener('submit', async e => { e.preventDefault(); busy(btn, true); const r = await post('forgot', { email: email.value.trim() }); busy(btn, false); msg.textContent = r.ok ? ax('forgot_ok') : errText(r.error); msg.classList.toggle('ok', !!r.ok); });
    return shell('au-forgot', art('🔑'), h('h2', {}, ax('forgot_t')), h('p', { class: 'au-lead' }, ax('forgot_d')), form, h('p', { class: 'au-alt' }, h('a', { href: '#/login' }, ax('login_btn'))));
  }
  function resetView(token) {
    const K = C();
    const p1 = input('password', { autocomplete: 'new-password', minlength: 8, required: true }), p2 = input('password', { autocomplete: 'new-password', required: true });
    const msg = msgEl(), btn = h('button', { class: 'btn accent big', type: 'submit' }, ax('reset_btn'));
    const form = h('form', { class: 'au-form' }, field(ax('new_pass'), p1, h('small', { class: 'au-hint' }, ax('pass_hint'))), strengthMeter(p1), field(ax('pass2'), p2), msg, btn);
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (p1.value !== p2.value) { msg.textContent = errText('mismatch'); return; }
      busy(btn, true);
      const r = await post('reset', { token: String(token || ''), password: p1.value });
      busy(btn, false);
      if (!r.ok) { msg.textContent = errText(r.error); return; }
      await applyUser(r.user);
      location.hash = '#/account'; K.route();
    });
    return shell('au-reset', art('🔑'), h('h2', {}, ax('reset_t')), form);
  }
  function render(view, arg) {
    if (view === 'login') return loginView();
    if (view === 'register') return registerView(arg);
    if (view === 'verify-sent') return sentView();
    if (view === 'welcome') return welcomeView();
    if (view === 'verify-failed') return failView();
    if (view === 'forgot') return forgotView();
    if (view === 'reset') return resetView(arg);
    return loginView();
  }
  // блок у кабінеті: пошта, зміна пароля, вихід, видалення акаунта
  function accountBox() {
    const K = C(), u = S.user; if (!u) return null;
    const oldP = input('password', { autocomplete: 'current-password' }), newP = input('password', { autocomplete: 'new-password' });
    const pm = h('small', { class: 'au-hint' });
    const delP = input('password', { autocomplete: 'current-password' }), dm = h('small', { class: 'au-msg' });
    const savePass = async () => { pm.textContent = ''; const r = await post('password', { old: oldP.value, password: newP.value }); pm.textContent = r.ok ? ax('saved') : errText(r.error); if (r.ok) { oldP.value = ''; newP.value = ''; } };
    const del = async () => { if (!confirm(ax('del_confirm'))) return; const r = await post('delete', { password: delP.value }); if (!r.ok) { dm.textContent = errText(r.error); return; }
      try { const pre = `comiks.u.${sidOf(u)}.`, ks = []; for (let i = 0; i < localStorage.length; i++) ks.push(localStorage.key(i)); ks.filter(k => k.startsWith(pre)).forEach(k => localStorage.removeItem(k)); } catch { /* ignore */ }
      const all = K.raw.get('comiks.users', {}); delete all[sidOf(u)]; K.raw.set('comiks.users', all); S.user = null; K.setSession(null); location.hash = '#/'; K.route(); };
    return h('div', { class: 'box au-acc' }, h('h3', {}, ax('acc_t')),
      h('p', {}, h('b', {}, u.demo ? u.name : u.email), h('br'),
        u.demo ? h('span', { class: 'au-badge prem' }, ax('demo_h')) : [h('span', { class: 'au-badge' }, ax('verified')), ' ', h('span', { class: 'au-badge sync' }, ax('synced'))],
        u.premium ? [' ', h('span', { class: 'au-badge prem' }, a3('premium'))] : null, u.role && u.role !== 'user' ? [' ', h('span', { class: 'au-badge staff' }, a3('staff')[u.role])] : null,
        u.role === 'admin' ? [' ', h('a', { class: 'au-badge staff', href: 'admin.php' }, '⚙️ Admin')] : null),
      u.demo ? h('p', { class: 'au-hint' }, ax('demo_note')) : null,
      u.can_invite && !u.demo ? inviteBox() : null,
      u.demo ? null : importBox(),
      u.demo ? null : h('details', { class: 'au-det' }, h('summary', {}, ax('change_pass')), field(ax('old_pass'), oldP), field(ax('new_pass'), newP), h('div', { class: 'row-left' }, h('button', { class: 'btn', type: 'button', onclick: savePass }, ax('save')), pm)),
      h('div', { class: 'row-left' }, h('button', { class: 'btn', type: 'button', onclick: logout }, ax('logout'))),
      u.demo ? null : h('details', { class: 'au-det danger' }, h('summary', {}, ax('del_t')), h('p', { class: 'au-hint' }, ax('del_d')), field(ax('pass'), delP), h('button', { class: 'btn accent', type: 'button', onclick: del }, ax('del_btn')), dm));
  }

  function importBox() {
    const K = C(), sid = sidOf(S.user);
    const list = localAccounts(), guest = guestHasData();
    if (!list.length && !guest) return null;
    const msg = h('small', { class: 'au-hint' });
    const run = async (from, btn) => { busy(btn, true); const n = await importLocal(from, sid); await push(); busy(btn, false); msg.textContent = a3('imp_done', n); K.Sfx.good(); setTimeout(() => location.reload(), 1600); };
    return h('div', { class: 'au-invite-box au-import' }, h('b', {}, a3('imp_t')), h('p', { class: 'au-hint' }, a3('imp_d')),
      h('div', { class: 'row-left' }, list.map(x => h('button', { class: 'btn small', type: 'button', onclick: e => run(x.id, e.currentTarget) }, '📥 ' + (x.name || x.id))), guest ? h('button', { class: 'btn small', type: 'button', onclick: e => run('', e.currentTarget) }, '📥 ' + a3('imp_guest')) : null), msg);
  }
  // 🎟 запрошення друзів (лише преміум-друзі, яких додав адміністратор)
  function inviteBox() {
    const K = C();
    const out = h('div', { class: 'au-inv-out' }), list = h('ul', { class: 'au-inv-list' });
    const fmtD = d => { try { return new Date(d).toLocaleDateString(K.ui === 'uk' ? 'uk-UA' : K.ui === 'no' ? 'nb-NO' : 'en-GB'); } catch { return ''; } };
    const loadList = async () => {
      const j = await get('invites'); const rows = j && j.ok ? j.invites : [];
      list.replaceChildren(...rows.map(r => h('li', {}, r.used ? a3('inv_used', r.name || '🙂') : new Date(r.expires) < new Date() ? a3('inv_old') : a3('inv_wait', fmtD(r.expires)), h('small', {}, fmtD(r.created)))));
    };
    const create = async ev => {
      busy(ev.target, true); const r = await post('invite_create'); busy(ev.target, false);
      if (!r.ok) { out.replaceChildren(h('p', { class: 'au-msg' }, errText(r.error))); return; }
      const inp = h('input', { class: 'au-input', readonly: true, value: r.url, onclick: e => e.target.select() });
      const copyBtn = h('button', { class: 'btn small', type: 'button', onclick: async () => { try { await navigator.clipboard.writeText(r.url); } catch { inp.select(); document.execCommand('copy'); } copyBtn.textContent = a3('copied'); } }, a3('copy'));
      out.replaceChildren(inp, h('div', { class: 'row-left' }, copyBtn, navigator.share ? h('button', { class: 'btn small', type: 'button', onclick: () => navigator.share({ title: 'Komiks·Lab', url: r.url }).catch(() => {}) }, a3('share')) : null));
      loadList();
    };
    loadList();
    return h('div', { class: 'au-invite-box' }, h('b', {}, a3('inv_t')), h('p', { class: 'au-hint' }, a3('inv_d')), h('button', { class: 'btn accent', type: 'button', onclick: create }, a3('inv_new')), out,
      h('details', { class: 'au-det' }, h('summary', {}, a3('inv_list')), list));
  }
  // анімоване попередження від модератора: тамагочі хитає головою «так не можна»
  let noticeOpen = false;
  function showNotice(n) {
    if (!n || noticeOpen) return;
    noticeOpen = true;
    const K = C(), av = window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊';
    const ban = n.kind === 'ban';
    const close = () => { post('notice_seen', { id: n.id }); box.remove(); noticeOpen = false; };
    const box = h('div', { class: 'free-modal au-notice', role: 'alertdialog', 'aria-modal': 'true' },
      h('div', { class: 'free-card au-notice-card' },
        h('div', { class: 'au-notice-hero' }, window.KomiksAvatars ? window.KomiksAvatars.el(av, { size: 130, mood: 'sad' }) : h('span', {}, '🙅'), h('span', { class: 'au-notice-no' }, '🙅')),
        h('h2', {}, a3(ban ? 'ban_t' : 'warn_t')), h('p', {}, a3(ban ? 'ban_d' : 'warn_d')),
        n.text ? h('blockquote', { class: 'au-notice-q' }, h('small', {}, a3('your_text')), h('s', {}, n.text)) : null,
        h('button', { class: 'btn accent big', type: 'button', onclick: close }, a3('understood'))));
    document.body.append(box);
    K.Sfx.bad();
  }
  const pollNotice = () => { if (S.server && document.visibilityState === 'visible') get('notice').then(j => { if (j && j.notice) showNotice(j.notice); }); };

  /* ---------- старт ---------- */
  function init() {
    if (!window.KomiksCore) { setTimeout(init, 50); return; }
    hookStore();
    if (!location.protocol.startsWith('http')) { readyDone(false); return; }
    get('me').then(async j => {
      if (!j || !j.auth) return false;
      S.server = true;
      await applyUser(j.user || null);
      if (j.notice) setTimeout(() => showNotice(j.notice), 1200);
      setInterval(pollNotice, 180000);
      const view = (location.hash || '#/').split('/')[1] || '';
      if (['login', 'register', 'account'].includes(view)) C().route(); // перемалювати серверною версією
      return true;
    }).then(readyDone, () => readyDone(false));
  }
  window.KomiksAuth = { render, accountBox, logout, push, get server() { return S.server; }, get user() { return S.user; }, ready: () => S.ready };
  init();
})();
