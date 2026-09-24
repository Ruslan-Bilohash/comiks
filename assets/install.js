/* Комікс·Lab — 📲 «Встановити застосунок»: ярлик на телефоні (Android) і в меню «Пуск» (Windows).
   Сайт уже є PWA (manifest + sw.js), тут лише зручна кнопка: ловимо beforeinstallprompt
   і показуємо її поруч із QR-кодом у підвалі. На iPhone події немає — там показуємо коротку
   інструкцію «Поділитися → На початковий екран». */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const C = () => window.KomiksCore;
  const T = {
    uk: { btn: '📲 Встановити застосунок', d: 'Ярлик на екрані телефона або в меню «Пуск» — сайт відкривається як звичайний застосунок, навіть без інтернету.',
      ios_t: '📲 Як додати на iPhone', ios: 'Натисніть «Поділитися» внизу Safari, далі «На початковий екран».', ok: 'Зрозуміло',
      done: '✅ Застосунок установлено', installing: 'Встановлюємо…' },
    en: { btn: '📲 Install the app', d: 'A shortcut on your phone or in the Start menu — the site opens like a normal app, even offline.',
      ios_t: '📲 How to add it on iPhone', ios: 'Tap “Share” at the bottom of Safari, then “Add to Home Screen”.', ok: 'Got it',
      done: '✅ The app is installed', installing: 'Installing…' },
    no: { btn: '📲 Installer appen', d: 'En snarvei på telefonen eller i Start-menyen – siden åpnes som en vanlig app, også uten nett.',
      ios_t: '📲 Slik legger du den til på iPhone', ios: 'Trykk «Del» nederst i Safari, og velg «Legg til på Hjem-skjerm».', ok: 'Skjønner',
      done: '✅ Appen er installert', installing: 'Installerer …' },
    ar: { btn: '📲 ثبّت التطبيق', d: 'اختصار على هاتفك أو في قائمة ابدأ — يفتح الموقع كتطبيق عادي، حتى بدون إنترنت.',
      ios_t: '📲 كيف تضيفه على iPhone', ios: 'اضغط «مشاركة» أسفل Safari ثم «إضافة إلى الشاشة الرئيسية».', ok: 'فهمت',
      done: '✅ تم تثبيت التطبيق', installing: 'جارٍ التثبيت…' }
  };
  const tx = () => T[(C() || {}).ui] || T.en;

  let deferred = null;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();          // показуємо власну кнопку замість системної смужки
    deferred = e;
    document.querySelectorAll('.pwa-btn').forEach(b => { b.hidden = false; });
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    document.querySelectorAll('.pwa-btn').forEach(b => { b.textContent = tx().done; b.disabled = true; });
  });

  async function install(btn) {
    const L = tx();
    if (deferred) {
      btn.disabled = true; btn.textContent = L.installing;
      deferred.prompt();
      const res = await deferred.userChoice.catch(() => null);
      deferred = null;
      btn.disabled = false;
      btn.textContent = res && res.outcome === 'accepted' ? L.done : L.btn;
      return;
    }
    if (isIOS()) return iosHelp();
    // деякі браузери не дають події — підказуємо, де шукати пункт меню
    iosHelp(true);
  }

  function iosHelp(desktop) {
    const K = C(); if (!K) return;
    const { h } = K, L = tx();
    const close = () => back.remove();
    const text = desktop
      ? { uk: 'У меню браузера (⋮ або значок ⊕ у рядку адреси) виберіть «Установити застосунок».',
          en: 'In the browser menu (⋮ or the ⊕ icon in the address bar) choose “Install app”.',
          no: 'I nettlesermenyen (⋮ eller ⊕-ikonet i adressefeltet) velger du «Installer app».',
          ar: 'من قائمة المتصفح (⋮ أو أيقونة ⊕ في شريط العنوان) اختر «تثبيت التطبيق».' }[(C() || {}).ui] || L.ios
      : L.ios;
    const back = h('div', { class: 'fb-back', onclick: e => { if (e.target === back) close(); } },
      h('div', { class: 'fb-box' }, h('h2', {}, L.ios_t), h('p', {}, text),
        h('button', { class: 'btn accent', type: 'button', onclick: close }, L.ok)));
    document.body.append(back);
  }

  // кнопка для підвалу (поруч із QR-кодом і відгуком)
  function button(cls = 'btn small') {
    const K = C(); if (!K) return null;
    if (standalone()) return null;                       // уже встановлено — кнопка не потрібна
    const b = K.h('button', { class: cls + ' pwa-btn', type: 'button', title: tx().d, onclick: () => install(b) }, tx().btn);
    b.hidden = !deferred && !isIOS();                    // покажемо, щойно браузер дозволить
    return b;
  }
  // ---------- 📲 сторінка «Встановити застосунок» (#/install) ----------
  // Три платформи без жодного маркету: Windows, Android, iPhone. Кроки того пристрою,
  // з якого людина зайшла, підсвічуємо, решту лишаємо поруч.
  const P = {
    uk: {
      title: '📲 Застосунок Komiks·Lab',
      lead: 'Без App Store і Google Play: сайт ставиться просто з браузера. Іконка на робочому столі або в меню «Пуск», окреме вікно без адресного рядка, уроки працюють і без інтернету.',
      here: 'ви зараз тут',
      win: ['🪟 Windows', [
        'Відкрийте сайт у Microsoft Edge або Google Chrome.',
        'Натисніть «Встановити застосунок» угорі цієї сторінки — або значок ⊕ у рядку адреси.',
        'Підтвердьте «Встановити». Ярлик із нашою іконкою з’явиться на робочому столі й у меню «Пуск».',
        'Правий клік по іконці в панелі задач відкриє швидкі переходи: план, слова, дзвінок, тести.'
      ]],
      and: ['🤖 Android', [
        'Відкрийте сайт у Chrome.',
        'Натисніть «Встановити застосунок» угорі — або меню ⋮ → «Додати на головний екран».',
        'Іконка стане поруч зі звичайними застосунками; довгий тап відкриє швидкі дії.'
      ]],
      ios: ['🍏 iPhone та iPad', [
        'Відкрийте сайт у Safari (у Chrome на iPhone такої кнопки немає).',
        'Натисніть «Поділитися» ⬆️ внизу екрана.',
        'Прогорніть список і виберіть «На початковий екран» → «Додати».',
        'Застосунок відкриється на весь екран, із власною заставкою — без App Store.'
      ]],
      mac: ['🍎 Mac', [
        'Відкрийте сайт у Chrome або Edge.',
        'Меню ⋮ → «Передати, зберегти та поділитися» → «Встановити сторінку як застосунок».',
        'У Safari: меню «Файл» → «Додати в Dock».'
      ]],
      extra_t: 'Якщо браузер не пропонує встановлення',
      extra: 'Firefox і старі браузери не вміють ставити застосунок. Тоді збережіть звичайний ярлик — і за бажання підставте нашу іконку: правий клік по ярлику → «Властивості» → «Змінити значок» → виберіть завантажений файл.',
      url_btn: '🔗 Завантажити ярлик для Windows',
      ico_btn: '🖼️ Завантажити іконку (.ico)',
      done: '✅ Застосунок уже встановлено — ви відкрили його у власному вікні.'
    },
    en: {
      title: '📲 The Komiks·Lab app',
      lead: 'No App Store, no Google Play: the site installs straight from the browser. An icon on your desktop or home screen, its own window without an address bar, and lessons that work offline.',
      here: 'you are here',
      win: ['🪟 Windows', [
        'Open the site in Microsoft Edge or Google Chrome.',
        'Press “Install the app” at the top of this page — or the ⊕ icon in the address bar.',
        'Confirm “Install”. A shortcut with our icon appears on the desktop and in the Start menu.',
        'Right-click the taskbar icon for quick jumps: plan, words, call, tests.'
      ]],
      and: ['🤖 Android', [
        'Open the site in Chrome.',
        'Press “Install the app” at the top — or menu ⋮ → “Add to Home screen”.',
        'The icon sits next to your normal apps; long-press it for quick actions.'
      ]],
      ios: ['🍏 iPhone and iPad', [
        'Open the site in Safari (Chrome on iPhone has no such button).',
        'Tap “Share” ⬆️ at the bottom of the screen.',
        'Scroll down and choose “Add to Home Screen” → “Add”.',
        'It opens full screen with its own splash — no App Store needed.'
      ]],
      mac: ['🍎 Mac', [
        'Open the site in Chrome or Edge.',
        'Menu ⋮ → “Cast, save and share” → “Install page as app”.',
        'In Safari: File → “Add to Dock”.'
      ]],
      extra_t: 'If your browser does not offer installing',
      extra: 'Firefox and older browsers cannot install web apps. Save a plain shortcut instead — and give it our icon if you like: right-click the shortcut → “Properties” → “Change icon” → pick the downloaded file.',
      url_btn: '🔗 Download a Windows shortcut',
      ico_btn: '🖼️ Download the icon (.ico)',
      done: '✅ The app is already installed — you are running it in its own window.'
    },
    no: {
      title: '📲 Appen Komiks·Lab',
      lead: 'Uten App Store og Google Play: siden installeres rett fra nettleseren. Et ikon på skrivebordet eller hjem-skjermen, eget vindu uten adressefelt, og leksjoner som virker uten nett.',
      here: 'du er her',
      win: ['🪟 Windows', [
        'Åpne siden i Microsoft Edge eller Google Chrome.',
        'Trykk «Installer appen» øverst på denne siden – eller ⊕-ikonet i adressefeltet.',
        'Bekreft «Installer». Snarveien med ikonet vårt havner på skrivebordet og i Start-menyen.',
        'Høyreklikk ikonet på oppgavelinja for snarveier: plan, ord, samtale, prøver.'
      ]],
      and: ['🤖 Android', [
        'Åpne siden i Chrome.',
        'Trykk «Installer appen» øverst – eller meny ⋮ → «Legg til på startskjerm».',
        'Ikonet står sammen med vanlige apper; hold inne for hurtigvalg.'
      ]],
      ios: ['🍏 iPhone og iPad', [
        'Åpne siden i Safari (Chrome på iPhone har ikke knappen).',
        'Trykk «Del» ⬆️ nederst på skjermen.',
        'Bla ned og velg «Legg til på Hjem-skjerm» → «Legg til».',
        'Appen åpnes i fullskjerm med egen startskjerm – helt uten App Store.'
      ]],
      mac: ['🍎 Mac', [
        'Åpne siden i Chrome eller Edge.',
        'Meny ⋮ → «Cast, lagre og del» → «Installer siden som app».',
        'I Safari: Arkiv → «Legg til i Dock».'
      ]],
      extra_t: 'Hvis nettleseren ikke tilbyr installering',
      extra: 'Firefox og eldre nettlesere kan ikke installere nettapper. Lagre en vanlig snarvei i stedet – og gi den gjerne ikonet vårt: høyreklikk snarveien → «Egenskaper» → «Endre ikon» → velg den nedlastede fila.',
      url_btn: '🔗 Last ned snarvei for Windows',
      ico_btn: '🖼️ Last ned ikonet (.ico)',
      done: '✅ Appen er allerede installert – du kjører den i sitt eget vindu.'
    },
    ar: {
      title: '📲 تطبيق Komiks·Lab',
      lead: 'بدون App Store أو Google Play: يُثبَّت الموقع من المتصفح مباشرة. أيقونة على سطح المكتب أو الشاشة الرئيسية، ونافذة خاصة بلا شريط عنوان، ودروس تعمل دون إنترنت.',
      here: 'أنت هنا',
      win: ['🪟 Windows', [
        'افتح الموقع في Microsoft Edge أو Google Chrome.',
        'اضغط «ثبّت التطبيق» أعلى هذه الصفحة — أو أيقونة ⊕ في شريط العنوان.',
        'أكّد «تثبيت». سيظهر الاختصار بأيقونتنا على سطح المكتب وفي قائمة ابدأ.',
        'اضغط بالزر الأيمن على الأيقونة في شريط المهام للوصول السريع: الخطة، الكلمات، المكالمة، الاختبارات.'
      ]],
      and: ['🤖 Android', [
        'افتح الموقع في Chrome.',
        'اضغط «ثبّت التطبيق» في الأعلى — أو القائمة ⋮ ← «إضافة إلى الشاشة الرئيسية».',
        'تظهر الأيقونة مع بقية التطبيقات؛ اضغط مطوّلًا للإجراءات السريعة.'
      ]],
      ios: ['🍏 iPhone و iPad', [
        'افتح الموقع في Safari (لا يوجد هذا الزر في Chrome على iPhone).',
        'اضغط «مشاركة» ⬆️ أسفل الشاشة.',
        'مرّر واختر «إضافة إلى الشاشة الرئيسية» ← «إضافة».',
        'يفتح التطبيق بملء الشاشة بشاشة بدء خاصة — دون App Store.'
      ]],
      mac: ['🍎 Mac', [
        'افتح الموقع في Chrome أو Edge.',
        'القائمة ⋮ ← «حفظ ومشاركة» ← «تثبيت الصفحة كتطبيق».',
        'في Safari: ملف ← «إضافة إلى Dock».'
      ]],
      extra_t: 'إذا لم يعرض المتصفح التثبيت',
      extra: 'لا تستطيع Firefox والمتصفحات القديمة تثبيت تطبيقات الويب. احفظ اختصارًا عاديًا — ويمكنك وضع أيقونتنا عليه: زر أيمن ← «خصائص» ← «تغيير الأيقونة» ← اختر الملف المحمَّل.',
      url_btn: '🔗 تنزيل اختصار لنظام Windows',
      ico_btn: '🖼️ تنزيل الأيقونة (.ico)',
      done: '✅ التطبيق مثبَّت بالفعل — أنت تستخدمه في نافذته الخاصة.'
    }
  };
  const px = () => P[(C() || {}).ui] || P.en;
  const isAndroid = () => /android/i.test(navigator.userAgent);
  const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent) && !isIOS();
  const isWin = () => /windows/i.test(navigator.userAgent);

  // простий ярлик .url — для браузерів, які не вміють ставити застосунок
  function downloadUrlFile() {
    const url = location.href.split('#')[0];
    const body = ['[InternetShortcut]', 'URL=' + url, 'IconIndex=0', 'IconFile=' + url + 'icons/favicon.ico', ''].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'application/internet-shortcut' }));
    a.download = 'Komiks-Lab.url';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  function page() {
    const K = C(); if (!K) return null;
    const { h } = K, L = px();
    const mine = isIOS() ? 'ios' : isAndroid() ? 'and' : isMac() ? 'mac' : isWin() ? 'win' : '';
    const card = key => {
      const [name, steps] = L[key];
      return h('div', { class: 'box inst-card' + (key === mine ? ' mine' : '') },
        h('h3', {}, name, key === mine ? h('span', { class: 'inst-here' }, L.here) : null),
        h('ol', { class: 'inst-steps' }, steps.map(t => h('li', {}, t))));
    };
    const btn = button('btn accent big');
    if (btn) btn.hidden = false;                          // на цій сторінці кнопка видима завжди
    const top = standalone()
      ? h('p', { class: 'inst-done' }, L.done)
      : h('div', { class: 'row-left inst-top' }, btn, h('img', { class: 'inst-icon', src: 'icons/icon-192.png', alt: '', width: 72, height: 72 }));
    return h('section', { class: 'install-page' },
      K.pageHead ? K.pageHead(L.title) : h('h1', {}, L.title),
      h('p', { class: 'lead-p' }, L.lead),
      top,
      h('div', { class: 'inst-grid' }, card('win'), card('and'), card('ios'), card('mac')),
      h('div', { class: 'box' }, h('h3', {}, L.extra_t), h('p', {}, L.extra),
        h('div', { class: 'row-left' },
          h('button', { class: 'btn', type: 'button', onclick: downloadUrlFile }, L.url_btn),
          h('a', { class: 'btn', href: 'icons/favicon.ico', download: 'Komiks-Lab.ico' }, L.ico_btn))));
  }

  window.KomiksInstall = { button, page, install: () => install(document.createElement('button')), canInstall: () => !!deferred || isIOS() };
})();
