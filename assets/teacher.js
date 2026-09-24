/* Комікс·Lab — 🎓 «Я вчитель»: заявка на безкоштовний Преміум для вчителів (#/teacher).
   Підтвердити можна будь-яким зручним способом: робоча пошта, посилання на сторінку школи,
   фото посвідчення чи розкладу. Рішення ухвалює людина в адмінпанелі. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/teacher.php';
  const C = () => window.KomiksCore;
  const T = {
    uk: { title: '🎓 Для вчителів — Преміум безкоштовно',
      lead: 'Учителям, викладачам норвезької та вихователям ми даємо повний Преміум безкоштовно: усі комікси, ігри, тести й турніри для класу без обмежень. Потрібно лише підтвердити, що ви навчаєте.',
      li: ['📝 Тести без обмежень для вас і для класу', '🏁 Турніри класу: Логік-гонка, Math Rocket, шахи з QR-кодом', '🎯 План навчання й рейтинг учнів', '✉️ Запрошення для колег'],
      how: 'Як підтвердити — будь-яким зручним способом:', how_li: ['посилання на сторінку школи, де видно ваше ім’я;', 'фото робочого посвідчення або бейджа (дані можна закрити пальцем);', 'скан розкладу, шкільна пошта, лист від адміністрації;', 'будь-що інше, що переконає нас.'],
      school: 'Школа, курси або садок *', role: 'Що викладаєте (напр. «норвезька, 5 клас»)', country: 'Країна чи місто', proof: 'Розкажіть коротко, що ви навчаєте, і як це перевірити *',
      link: 'Посилання (сторінка школи, профіль)', file: '📎 Додати фото або PDF', rm: '✕ Прибрати', send: 'Надіслати заявку', cancel: 'Скасувати заявку',
      pending: '⏳ Заявку надіслано. Ми перевіримо її вручну — зазвичай за день-два. Відповідь прийде на вашу пошту.',
      ok: '🎓 Ваш акаунт підтверджено як учительський. Преміум увімкнено назавжди — дякуємо за вашу роботу!',
      no: '❌ Цього разу підтвердити не вдалося. Надішліть заявку ще раз із чіткішим підтвердженням.',
      login: 'Щоб надіслати заявку, увійдіть в акаунт.', login_btn: 'Увійти', sent: 'Надіслано',
      err: { short: 'Напишіть назву школи й кілька слів про те, що ви навчаєте.', link: 'Посилання має починатися з http:// або https://', file: 'Файл не підійшов: лише зображення або PDF.', too_big: 'Файл завеликий для сервера — надішліть менший або без файла.', server: 'Сервер не зміг обробити заявку. Спробуйте ще раз або без файла.', already: 'У вас уже є вчительський Преміум.', slow_down: 'Забагато спроб. Спробуйте завтра.', auth: 'Спочатку увійдіть в акаунт.', net: 'Немає зв’язку із сервером.' } },
    en: { title: '🎓 Teachers get Premium free',
      lead: 'Teachers, Norwegian tutors and kindergarten staff get full Premium for free: all comics, games, tests and class tournaments without limits. You only need to confirm that you teach.',
      li: ['📝 Unlimited tests for you and your class', '🏁 Class tournaments: Logic Race, Math Rocket, chess with a QR code', '🎯 Study plan and pupil ranking', '✉️ Invitations for colleagues'],
      how: 'Confirm it in any way that suits you:', how_li: ['a link to the school page that shows your name;', 'a photo of your staff card or badge (you may cover private details);', 'a timetable, a school email address, a letter from the administration;', 'anything else that convinces us.'],
      school: 'School, course or kindergarten *', role: 'What you teach (e.g. “Norwegian, year 5”)', country: 'Country or town', proof: 'Tell us briefly what you teach and how we can check it *',
      link: 'Link (school page, profile)', file: '📎 Add a photo or PDF', rm: '✕ Remove', send: 'Send the application', cancel: 'Cancel the application',
      pending: '⏳ Your application has been sent. We check it by hand — usually within a day or two. The answer will come to your email.',
      ok: '🎓 Your account is confirmed as a teacher account. Premium is on forever — thank you for your work!',
      no: '❌ We could not confirm it this time. Please send a new application with clearer proof.',
      login: 'Please sign in to send an application.', login_btn: 'Sign in', sent: 'Sent',
      err: { short: 'Please write the school name and a few words about what you teach.', link: 'The link must start with http:// or https://', file: 'The file was rejected: only an image or PDF.', too_big: 'The file is too big for the server — send a smaller one or none.', server: 'The server could not handle the application. Try again, or without the file.', already: 'You already have teacher Premium.', slow_down: 'Too many attempts. Try again tomorrow.', auth: 'Please sign in first.', net: 'No connection to the server.' } },
    no: { title: '🎓 Lærere får Premium gratis',
      lead: 'Lærere, norsklærere og barnehageansatte får full Premium gratis: alle tegneserier, spill, prøver og klasseturneringer uten grenser. Du trenger bare å bekrefte at du underviser.',
      li: ['📝 Prøver uten grenser for deg og klassen', '🏁 Klasseturneringer: Logikkløpet, Matte-raketten, sjakk med QR-kode', '🎯 Læringsplan og rangering for elevene', '✉️ Invitasjoner til kolleger'],
      how: 'Bekreft det på den måten som passer deg:', how_li: ['en lenke til skolens side der navnet ditt står;', 'et bilde av ansattkortet ditt (du kan dekke til private detaljer);', 'en timeplan, en skole-e-post, et brev fra ledelsen;', 'noe annet som overbeviser oss.'],
      school: 'Skole, kurs eller barnehage *', role: 'Hva du underviser i (f.eks. «norsk, 5. trinn»)', country: 'Land eller by', proof: 'Fortell kort hva du underviser i og hvordan vi kan sjekke det *',
      link: 'Lenke (skolens side, profil)', file: '📎 Legg ved bilde eller PDF', rm: '✕ Fjern', send: 'Send søknaden', cancel: 'Trekk søknaden',
      pending: '⏳ Søknaden er sendt. Vi sjekker den manuelt – vanligvis på en dag eller to. Svaret kommer på e-post.',
      ok: '🎓 Kontoen din er bekreftet som lærerkonto. Premium er på for alltid – takk for jobben du gjør!',
      no: '❌ Vi klarte ikke å bekrefte det denne gangen. Send en ny søknad med tydeligere dokumentasjon.',
      login: 'Logg inn for å sende en søknad.', login_btn: 'Logg inn', sent: 'Sendt',
      err: { short: 'Skriv navnet på skolen og noen ord om hva du underviser i.', link: 'Lenken må begynne med http:// eller https://', file: 'Filen ble avvist: bare bilde eller PDF.', too_big: 'Filen er for stor for serveren – send en mindre, eller uten fil.', server: 'Serveren klarte ikke å behandle søknaden. Prøv igjen, eller uten fil.', already: 'Du har allerede lærer-Premium.', slow_down: 'For mange forsøk. Prøv igjen i morgen.', auth: 'Logg inn først.', net: 'Ingen forbindelse med serveren.' } },
    ar: { title: '🎓 البريميوم مجاني للمعلّمين',
      lead: 'يحصل المعلّمون ومدرّسو النرويجية والعاملون في الروضة على بريميوم كامل مجانًا: كل القصص والألعاب والاختبارات وبطولات الصف بلا حدود. يكفي أن تؤكّد أنك تُدرّس.',
      li: ['📝 اختبارات بلا حدود لك ولصفّك', '🏁 بطولات الصف: سباق المنطق، Math Rocket، الشطرنج برمز QR', '🎯 خطة التعلّم وتصنيف التلاميذ', '✉️ دعوات للزملاء'],
      how: 'أكّد ذلك بأي طريقة مناسبة:', how_li: ['رابط لصفحة المدرسة يظهر فيه اسمك؛', 'صورة لبطاقة العمل (يمكنك إخفاء البيانات الخاصة)؛', 'جدول الحصص أو بريد المدرسة أو رسالة من الإدارة؛', 'أي شيء آخر يقنعنا.'],
      school: 'المدرسة أو الدورة أو الروضة *', role: 'ماذا تُدرّس (مثلًا «النرويجية، الصف الخامس»)', country: 'البلد أو المدينة', proof: 'اكتب باختصار ماذا تُدرّس وكيف نتحقّق *',
      link: 'رابط (صفحة المدرسة، ملف شخصي)', file: '📎 أضف صورة أو PDF', rm: '✕ إزالة', send: 'إرسال الطلب', cancel: 'إلغاء الطلب',
      pending: '⏳ تم إرسال الطلب. نراجعه يدويًا — عادة خلال يوم أو يومين. سيصلك الرد على بريدك.',
      ok: '🎓 تم تأكيد حسابك كحساب معلّم. البريميوم مفعّل للأبد — شكرًا لعملك!',
      no: '❌ لم نتمكّن من التأكيد هذه المرة. أرسل طلبًا جديدًا بإثبات أوضح.',
      login: 'سجّل الدخول لإرسال الطلب.', login_btn: 'تسجيل الدخول', sent: 'أُرسل',
      err: { short: 'اكتب اسم المدرسة وبضع كلمات عمّا تُدرّس.', link: 'يجب أن يبدأ الرابط بـ http:// أو https://', file: 'رُفض الملف: صورة أو PDF فقط.', too_big: 'الملف كبير على الخادم — أرسل ملفًا أصغر أو بدون ملف.', server: 'تعذّر على الخادم معالجة الطلب. حاول مجددًا أو بدون ملف.', already: 'لديك بريميوم المعلّم بالفعل.', slow_down: 'محاولات كثيرة. حاول غدًا.', auth: 'سجّل الدخول أولًا.', net: 'لا اتصال بالخادم.' } }
  };
  const tx = () => T[(C() || {}).ui] || T.en;
  // фото заявки стискаємо так само, як у формі відгуку (фото з телефона надто важкі для сервера)
  let MAX_FILE = 180000;
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
      for (let q = 0.82; q >= 0.4; q -= 0.14) { const url = c.toDataURL('image/jpeg', q); if (bytesOf(url) <= maxBytes) return url; }
      side = Math.round(side * 0.7);
    }
    return null;
  }
  const post = body => fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) }).then(r => r.json()).catch(() => null);

  function render() {
    const K = C(), { h } = K, L = tx();
    const box = h('div', { class: 'tc-box' }, h('p', {}, '…'));
    const root = h('section', { class: 'tc-page' }, K.pageHead(L.title),
      h('div', { class: 'tc-card' }, h('p', { class: 'lead-p' }, L.lead), h('ul', {}, L.li.map(x => h('li', {}, x)))), box);

    const msg = h('p', { class: 'fb-msg' });
    function form() {
      let att = null;
      const school = h('input', { type: 'text', maxlength: 120, placeholder: L.school, required: true });
      const role = h('input', { type: 'text', maxlength: 80, placeholder: L.role });
      const country = h('input', { type: 'text', maxlength: 60, placeholder: L.country });
      const link = h('input', { type: 'url', maxlength: 190, placeholder: L.link });
      const proof = h('textarea', { rows: 4, maxlength: 1200, placeholder: L.proof, required: true });
      const fileInput = h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,application/pdf', class: 'fb-file-input' });
      const fileBox = h('div', { class: 'fb-file' });
      const drawFile = () => {
        fileBox.replaceChildren();
        if (!att) { fileBox.append(h('label', { class: 'fb-file-btn' }, L.file, fileInput)); return; }
        fileBox.append(att.type.startsWith('image/') ? h('img', { class: 'fb-thumb', src: att.data, alt: att.name }) : h('span', { class: 'fb-doc' }, '📄'),
          h('b', {}, att.name), h('button', { class: 'btn small', type: 'button', onclick: () => { att = null; fileInput.value = ''; drawFile(); } }, L.rm));
      };
      fileInput.addEventListener('change', async () => {
        const f = fileInput.files && fileInput.files[0]; if (!f) return;
        if (!/^(image\/(png|jpeg|webp)|application\/pdf)$/.test(f.type)) { msg.textContent = L.err.file; fileInput.value = ''; return; }
        try {
          let url;
          if (f.type.startsWith('image/')) url = await shrinkImage(f, MAX_FILE);
          else { url = await dataUrl(f); if (bytesOf(url) > MAX_FILE) url = null; }
          if (!url) { msg.textContent = L.err.too_big; fileInput.value = ''; return; }
          att = { data: url, name: f.name, type: url.slice(5, url.indexOf(';')) };
          msg.textContent = ''; drawFile();
        } catch { msg.textContent = L.err.file; fileInput.value = ''; }
      });
      drawFile();
      const btn = h('button', { class: 'btn accent big', type: 'submit' }, L.send);
      const send = async e => {
        e.preventDefault(); btn.disabled = true; msg.textContent = '';
        const r = await post({ action: 'apply', school: school.value, role: role.value, country: country.value, proof: proof.value, link: link.value, file: att ? att.data : '', file_name: att ? att.name : '' });
        btn.disabled = false;
        if (r && r.ok) { K.Sfx && K.Sfx.good(); draw(); return; }
        msg.textContent = (r && L.err[r.error]) || L.err.net;
      };
      return h('form', { class: 'tc-form', onsubmit: send },
        h('h3', {}, L.how), h('ul', { class: 'tc-how' }, L.how_li.map(x => h('li', {}, x))),
        school, role, country, proof, link, fileBox, msg, btn);
    }

    async function draw() {
      const st = await fetch(API + '?action=state', { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);
      if (!st || !st.ok) { box.replaceChildren(h('p', {}, L.err.net)); return; }
      if (st.max_file) MAX_FILE = st.max_file;
      if (!st.auth) { box.replaceChildren(h('p', {}, L.login), h('a', { class: 'btn accent', href: '#/login' }, L.login_btn)); return; }
      if (st.teacher) { box.replaceChildren(h('p', { class: 'tc-ok' }, L.ok)); return; }
      if (st.status === 'pending') {
        box.replaceChildren(h('p', { class: 'tc-wait' }, L.pending),
          h('button', { class: 'btn', type: 'button', onclick: async () => { await post({ action: 'cancel' }); draw(); } }, L.cancel));
        return;
      }
      if (st.status === 'no') box.replaceChildren(h('p', { class: 'tc-no' }, L.no + (st.note ? ' ' + st.note : '')), form());
      else box.replaceChildren(form());
    }
    draw();
    return root;
  }
  window.KomiksTeacher = { render, text: () => tx() };
})();
