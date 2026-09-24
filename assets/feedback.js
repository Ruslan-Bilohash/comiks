/* Комікс·Lab — 💌 «Написати розробнику»: кнопка на кожній сторінці.
   Помилка, правка, ідея або прохання додати тему для навчання. Захист — приклад-капча (як на стінах),
   лист іде адміністраторам, усе видно в адмінпанелі (admin.php?p=feedback). */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/feedback.php';
  const C = () => window.KomiksCore;
  const T = {
    uk: { btn: '💌 Відгук', title: '💌 Написати розробнику', lead: 'Знайшли помилку, хочете правку або тему для навчання? Напишіть — я читаю все сам.',
      kinds: [['bug', '🐞 Помилка'], ['idea', '💡 Правка / ідея'], ['topic', '📚 Тема для навчання'], ['other', '💬 Інше']],
      ph: { bug: 'Що пішло не так? На якій сторінці й що ви робили?', idea: 'Що змінити або додати?', topic: 'Яку тему чи слова додати в навчання?', other: 'Ваше повідомлення…' },
      mail: 'Пошта (не обов’язково — щоб відповісти)', send: 'Надіслати', cancel: 'Закрити', cap: 'Скільки буде', cap_t: '🧮 Розв’яжіть приклад — і повідомлення полетить!', ok: '✅ Дякую! Повідомлення надіслано.',
      file: '📎 Додати фото або файл', file_d: 'Скріншот, малюнок, PDF або текст — фото стискається автоматично. Матеріали й ідеї теж можна надсилати файлом.', drop: 'Перетягніть файл сюди', rm: '✕ Прибрати', big: 'Файл завеликий — максимум 4 МБ.', kind_err: 'Можна лише зображення, PDF або текстовий файл.', from_page: p => `Сторінка: ${p}`, draft: '📝 Чернетку збережено', intro_t: '💌 Пишіть мені прямо звідси', intro_d: 'Помітили помилку, хочете правку або нову тему для навчання? Кнопка «💌 Відгук» є внизу сторінки, поруч із QR-кодом. Учителі — пишіть, які матеріали потрібні класу.', intro_ok: 'Зрозуміло',
      err: { short: 'Напишіть хоча б кілька слів (від 10 символів).', captcha: 'Приклад розв’язано неправильно. Спробуйте ще раз.', slow_down: 'Забагато повідомлень. Спробуйте за годину.', email: 'Перевірте адресу пошти.', banned: 'Надсилання тимчасово заблоковано.', file: 'Файл не підійшов: лише зображення, PDF або текст.', too_big: 'Файл завеликий для сервера. Надішліть менший або без файла.', server: 'Сервер не зміг обробити запит. Спробуйте ще раз або без файла.', net: 'Немає зв’язку із сервером.' } },
    en: { btn: '💌 Feedback', title: '💌 Write to the developer', lead: 'Found a bug, want a fix or a new learning topic? Write to me — I read everything myself.',
      kinds: [['bug', '🐞 Bug'], ['idea', '💡 Fix / idea'], ['topic', '📚 Learning topic'], ['other', '💬 Other']],
      ph: { bug: 'What went wrong? Which page were you on and what did you do?', idea: 'What should be changed or added?', topic: 'Which topic or words should be added?', other: 'Your message…' },
      mail: 'Email (optional — so I can reply)', send: 'Send', cancel: 'Close', cap: 'How much is', cap_t: '🧮 Solve the sum — and your message flies!', ok: '✅ Thank you! Your message has been sent.',
      file: '📎 Add a photo or file', file_d: 'A screenshot, drawing, PDF or text — photos are compressed automatically. Materials and ideas can be sent as a file too.', drop: 'Drop a file here', rm: '✕ Remove', big: 'The file is too big — 4 MB maximum.', kind_err: 'Only images, PDF or text files are allowed.', from_page: p => `Page: ${p}`, draft: '📝 Draft saved', intro_t: '💌 Write to me right from here', intro_d: 'Found a bug, want a change or a new learning topic? The “💌 Feedback” button is at the bottom of the page, next to the QR code. Teachers — tell me what your class needs.', intro_ok: 'Got it',
      err: { short: 'Please write at least a few words (10 characters).', captcha: 'The sum is wrong. Please try again.', slow_down: 'Too many messages. Try again in an hour.', email: 'Please check the email address.', banned: 'Sending is temporarily blocked.', file: 'The file was rejected: only images, PDF or text.', too_big: 'The file is too big for the server. Send a smaller one or none at all.', server: 'The server could not handle the request. Try again, or without the file.', net: 'No connection to the server.' } },
    no: { btn: '💌 Tilbakemelding', title: '💌 Skriv til utvikleren', lead: 'Fant du en feil, ønsker du en endring eller et nytt tema å lære? Skriv til meg – jeg leser alt selv.',
      kinds: [['bug', '🐞 Feil'], ['idea', '💡 Endring / idé'], ['topic', '📚 Tema å lære'], ['other', '💬 Annet']],
      ph: { bug: 'Hva gikk galt? Hvilken side var du på, og hva gjorde du?', idea: 'Hva bør endres eller legges til?', topic: 'Hvilket tema eller hvilke ord bør legges til?', other: 'Meldingen din …' },
      mail: 'E-post (valgfritt – så jeg kan svare)', send: 'Send', cancel: 'Lukk', cap: 'Hvor mye er', cap_t: '🧮 Løs regnestykket – så sendes meldingen!', ok: '✅ Takk! Meldingen er sendt.',
      file: '📎 Legg ved bilde eller fil', file_d: 'Skjermbilde, tegning, PDF eller tekst – bilder komprimeres automatisk. Materiell og idéer kan også sendes som fil.', drop: 'Slipp filen her', rm: '✕ Fjern', big: 'Filen er for stor – maks 4 MB.', kind_err: 'Bare bilder, PDF eller tekstfiler er tillatt.', from_page: p => `Side: ${p}`, draft: '📝 Kladden er lagret', intro_t: '💌 Skriv til meg herfra', intro_d: 'Fant du en feil, ønsker du en endring eller et nytt tema? «💌 Tilbakemelding»-knappen står nederst på siden, ved QR-koden. Lærere – si fra hva klassen trenger.', intro_ok: 'Skjønner',
      err: { short: 'Skriv i det minste noen ord (minst 10 tegn).', captcha: 'Feil svar på regnestykket. Prøv igjen.', slow_down: 'For mange meldinger. Prøv igjen om en time.', email: 'Sjekk e-postadressen.', banned: 'Sending er midlertidig blokkert.', file: 'Filen ble avvist: bare bilder, PDF eller tekst.', too_big: 'Filen er for stor for serveren. Send en mindre – eller uten fil.', server: 'Serveren klarte ikke å behandle forespørselen. Prøv igjen, eller uten fil.', net: 'Ingen forbindelse med serveren.' } },
    ar: { btn: '💌 ملاحظات', title: '💌 اكتب إلى المطوّر', lead: 'وجدت خطأ، أو تريد تعديلًا أو موضوعًا جديدًا للتعلّم؟ اكتب لي — أقرأ كل الرسائل بنفسي.',
      kinds: [['bug', '🐞 خطأ'], ['idea', '💡 تعديل / فكرة'], ['topic', '📚 موضوع للتعلّم'], ['other', '💬 أخرى']],
      ph: { bug: 'ما الذي حدث؟ في أي صفحة وماذا كنت تفعل؟', idea: 'ما الذي يجب تغييره أو إضافته؟', topic: 'أي موضوع أو كلمات نضيفها؟', other: 'رسالتك…' },
      mail: 'البريد الإلكتروني (اختياري — لأرد عليك)', send: 'إرسال', cancel: 'إغلاق', cap: 'كم يساوي', cap_t: '🧮 حلّ المسألة — وتُرسَل رسالتك!', ok: '✅ شكرًا! تم إرسال رسالتك.',
      file: '📎 أضف صورة أو ملفًا', file_d: 'لقطة شاشة أو رسم أو PDF أو نص — تُضغط الصور تلقائيًا. يمكن إرسال المواد والأفكار كملف أيضًا.', drop: 'أفلِت الملف هنا', rm: '✕ إزالة', big: 'الملف كبير جدًا — 4 ميجابايت كحد أقصى.', kind_err: 'يُسمح بالصور وPDF والملفات النصية فقط.', from_page: p => `الصفحة: ${p}`, draft: '📝 تم حفظ المسودة', intro_t: '💌 اكتب لي من هنا', intro_d: 'وجدت خطأ أو تريد تعديلًا أو موضوعًا جديدًا؟ زر «💌 ملاحظات» في أسفل الصفحة بجانب رمز QR. المعلّمون — أخبروني بما يحتاجه الصف.', intro_ok: 'فهمت',
      err: { short: 'اكتب بضع كلمات على الأقل (10 أحرف).', captcha: 'الإجابة غير صحيحة. حاول مرة أخرى.', slow_down: 'رسائل كثيرة. حاول بعد ساعة.', email: 'تحقّق من البريد الإلكتروني.', banned: 'الإرسال محظور مؤقتًا.', file: 'رُفض الملف: صور أو PDF أو نص فقط.', too_big: 'الملف كبير على الخادم. أرسل ملفًا أصغر أو بدون ملف.', server: 'تعذّر على الخادم معالجة الطلب. حاول مجددًا أو بدون ملف.', net: 'لا اتصال بالخادم.' } }
  };
  const tx = () => T[(C() || {}).ui] || T.en;

  /* 📷 Фото з телефона важать по 3–8 МБ, а сервер приймає значно менше, тому зменшуємо картинку
     прямо в браузері: довга сторона до 1600 px, JPEG зі зниженням якості, поки не влізе в ліміт. */
  let MAX_FILE = 180000; // оновлюється з відповіді сервера (?captcha=1 → max_file)
  const dataUrl = file => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = rej; r.readAsDataURL(file); });
  const bytesOf = url => Math.round((url.length - (url.indexOf(',') + 1)) * 3 / 4);
  async function shrinkImage(file, maxBytes) {
    const src = await dataUrl(file);
    if (bytesOf(src) <= maxBytes) return src;
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    let side = 1600;
    for (let step = 0; step < 4; step++) {
      const k = Math.min(1, side / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      for (let q = 0.82; q >= 0.4; q -= 0.14) {
        const url = c.toDataURL('image/jpeg', q);
        if (bytesOf(url) <= maxBytes) return url;
      }
      side = Math.round(side * 0.7);
    }
    return null; // навіть стиснуте не влізло
  }

  const DRAFT = 'kl.fbDraft';
  const readDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT) || 'null') || null; } catch { return null; } };
  const clearDraft = () => { try { localStorage.removeItem(DRAFT); } catch { /* ignore */ } };

  function open() {
    const K = C(); if (!K) return;
    const { h } = K, L = tx();
    // чернетка: якщо вікно закрили — текст, тип і сторінка не губляться
    const d = readDraft() || {};
    let kind = d.kind || 'bug', cap = null, busy = false;
    let att = d.file ? { data: d.file, name: d.fileName || 'fil', size: d.fileSize || 0, type: d.fileType || '' } : null;
    const fromPage = d.page || location.hash || '#/';
    const saveDraft = () => {
      try {
        localStorage.setItem(DRAFT, JSON.stringify({ kind, text: area.value, email: email.value, page: fromPage,
          file: att && att.size <= 700000 ? att.data : '', fileName: att ? att.name : '', fileSize: att ? att.size : 0, fileType: att ? att.type : '' }));
      } catch { /* сховище переповнене — чернетку не зберігаємо */ }
    };
    const msg = h('p', { class: 'fb-msg' });
    const area = h('textarea', { rows: 5, maxlength: 2000, placeholder: L.ph[kind] || L.ph.bug, required: true, oninput: () => saveDraft() });
    area.value = d.text || '';
    const email = h('input', { type: 'email', placeholder: L.mail, autocomplete: 'email', value: d.email || '', oninput: () => saveDraft() });
    const trap = h('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', class: 'fb-trap' });
    const capBox = h('div', { class: 'fb-cap' });
    const chips = h('div', { class: 'fb-kinds' }, L.kinds.map(([k, label]) =>
      h('button', { type: 'button', class: 'fb-kind' + (k === kind ? ' on' : ''), onclick: e => { kind = k; area.placeholder = L.ph[k]; chips.querySelectorAll('.fb-kind').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); saveDraft(); } }, label)));
    // 📎 матеріали: фото, малюнок, PDF або текстовий файл
    const fileInput = h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif,application/pdf,text/plain', class: 'fb-file-input' });
    const fileBox = h('div', { class: 'fb-file' });
    const drawFile = () => {
      fileBox.replaceChildren();
      if (!att) {
        fileBox.append(h('label', { class: 'fb-file-btn' }, L.file, fileInput), h('small', {}, L.file_d));
        return;
      }
      const kb = Math.max(1, Math.round(att.size / 1024));
      fileBox.append(
        att.type.startsWith('image/') && att.data ? h('img', { class: 'fb-thumb', src: att.data, alt: att.name }) : h('span', { class: 'fb-doc' }, '📄'),
        h('b', {}, att.name), h('small', {}, kb + ' KB'),
        h('button', { class: 'btn small', type: 'button', onclick: () => { att = null; fileInput.value = ''; saveDraft(); drawFile(); } }, L.rm));
    };
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      if (!/^(image\/(png|jpeg|webp|gif)|application\/pdf|text\/plain)$/.test(f.type)) { msg.textContent = L.kind_err; fileInput.value = ''; return; }
      msg.textContent = '';
      try {
        let url;
        if (f.type.startsWith('image/')) url = await shrinkImage(f, MAX_FILE);
        else { url = await dataUrl(f); if (bytesOf(url) > MAX_FILE) url = null; }
        if (!url) { msg.textContent = L.big; fileInput.value = ''; return; }
        att = { data: url, name: f.name.replace(/\.[a-z0-9]+$/i, m => (f.type.startsWith('image/') && url.startsWith('data:image/jpeg') ? '.jpg' : m)), size: bytesOf(url), type: url.slice(5, url.indexOf(';')) };
        saveDraft(); drawFile();
      } catch { msg.textContent = L.kind_err; fileInput.value = ''; }
    });
    const sendBtn = h('button', { class: 'btn accent', type: 'submit' }, L.send);

    // той самий приклад, що й на стіні: велике «2 + 3 = ?», картинки для лічби
    // й чотири кольорові кнопки. Вибрана відповідь лишається позначеною.
    function drawCap() {
      capBox.replaceChildren();
      if (!cap) { capBox.append(h('span', { class: 'fb-caploading' }, '…')); return; }
      const P = window.KomiksPlayers;
      if (P && P.captchaView) {
        const view = P.captchaView(cap, v => { cap.pick = v; drawCap(); }, L.cap_t);
        if (cap.pick != null) {
          const i = cap.opts.indexOf(cap.pick);
          const btn = view.querySelectorAll('.cap-opt')[i];
          if (btn) btn.classList.add('on');
        }
        capBox.append(view);
        return;
      }
      capBox.append(h('b', {}, `${L.cap} ${cap.q.a} ${cap.q.op} ${cap.q.b}?`),
        h('div', { class: 'fb-opts' }, cap.opts.map(v => h('button', { type: 'button', class: 'fb-opt' + (cap.pick === v ? ' on' : ''), onclick: () => { cap.pick = v; drawCap(); } }, String(v)))));
    }
    const loadCap = () => fetch(API + '?captcha=1', { cache: 'no-store', credentials: 'same-origin' }).then(r => r.json())
      .then(j => { cap = j && j.ok ? j : null; if (j && j.max_file) MAX_FILE = j.max_file; drawCap(); }).catch(() => { cap = null; msg.textContent = L.err.net; });

    async function send(e) {
      e.preventDefault();
      if (busy) return; busy = true; sendBtn.disabled = true; msg.textContent = '';
      try {
        const r = await fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' },
          body: JSON.stringify({ action: 'send', kind, text: area.value, email: email.value.trim(), website: trap.value, page: fromPage, lang: K.ui, token: cap ? cap.token : '', answer: cap && cap.pick != null ? cap.pick : -1, file: att ? att.data : '', file_name: att ? att.name : '' }) }).then(x => x.json());
        if (r && r.ok) { K.Sfx.good(); clearDraft(); box.replaceChildren(h('h2', {}, L.title), h('p', { class: 'fb-ok' }, L.ok), h('button', { class: 'btn', type: 'button', onclick: close }, L.cancel)); return; }
        msg.textContent = (r && L.err[r.error]) || L.err.net;
        if (r && r.error === 'captcha') { cap = null; drawCap(); loadCap(); }
      } catch { msg.textContent = L.err.net; }
      busy = false; sendBtn.disabled = false;
    }

    const box = h('form', { class: 'fb-box', onsubmit: send },
      h('h2', {}, L.title), h('p', { class: 'fb-lead' }, L.lead),
      chips, h('p', { class: 'fb-page' }, L.from_page(fromPage)), area, email, fileBox, trap, capBox, msg,
      h('div', { class: 'fb-row' }, sendBtn, h('button', { class: 'btn', type: 'button', onclick: close }, L.cancel)));
    const back = h('div', { class: 'fb-back', onclick: e => { if (e.target === back) close(); } }, box);
    function close() { saveDraft(); back.remove(); document.removeEventListener('keydown', esc); updateBadge(); }
    function esc(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', esc);
    document.body.append(back);
    area.focus();
    drawFile(); drawCap(); loadCap();
  }

  function updateBadge() {
    const d = readDraft();
    const has = !!(d && (d.text || d.file));
    document.querySelectorAll('.fb-btn').forEach(b => {
      b.classList.toggle('has-draft', has);
      b.title = has ? tx().draft : tx().title;
    });
  }
  // кнопка для підвалу й для блоку «Поділитися» біля QR-коду
  function button(cls = 'btn small') {
    const K = C(); if (!K) return null;
    const b = K.h('button', { class: cls + ' fb-btn', type: 'button', title: tx().title, onclick: open }, tx().btn);
    setTimeout(updateBadge, 0);
    return b;
  }
  /* 👋 Перший візит: один раз коротко розповідаємо, де кнопка відгуку.
     Це не модальне вікно — маленька картка внизу, яка сама зникає. */
  function intro() {
    const K = C(); if (!K) return setTimeout(intro, 600);
    try { if (localStorage.getItem('kl.fbIntro') === '1') return; } catch { return; }
    if (document.querySelector('.q-card, .phone-back, .fb-back')) { setTimeout(intro, 20000); return; }
    const L = tx(), { h } = K;
    const close = () => { try { localStorage.setItem('kl.fbIntro', '1'); } catch { /* ignore */ } card.remove(); };
    const card = h('div', { class: 'fb-intro' },
      h('b', {}, L.intro_t), h('p', {}, L.intro_d),
      h('div', { class: 'row-left' },
        h('button', { class: 'btn small accent', type: 'button', onclick: () => { close(); open(); } }, L.btn),
        h('button', { class: 'btn small', type: 'button', onclick: close }, L.intro_ok)));
    document.body.append(card);
    setTimeout(() => { if (document.body.contains(card)) close(); }, 25000);
  }
  setTimeout(intro, 25000);
  window.KomiksFeedback = { open, button, updateBadge };
})();
