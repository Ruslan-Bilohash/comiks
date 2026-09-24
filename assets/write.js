/* Комікс·Lab — ✍️ письмо норвезькою з перевіркою (#/write).
   Учень обирає завдання свого рівня, пише кілька речень — і одразу бачить виправлений текст,
   список помилок із поясненням рідною мовою, пораду й зразок відповіді.
   Перевіряє модель на сервері (api/write.php); якщо ключ ШІ не налаштовано, сторінка
   працює в «тихому» режимі: чернетка зберігається, а зразок можна відкрити самому.
   Чернетка й останні роботи лежать у сховищі учня — нічого не губиться. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/write.php';
  const C = () => window.KomiksCore;

  const T = {
    uk: { title: '✍️ Письмо норвезькою', nav: '✍️ Письмо',
      lead: 'Напиши кілька речень норвезькою — і отримаєш виправлений текст, пояснення помилок і зразок. Писати щодня важливіше, ніж писати багато.',
      level: 'Рівень', task: 'Завдання', other: '🎲 Інше завдання', ph: 'Пиши норвезькою…', words: n => `слів: ${n}`,
      check: '✅ Перевірити', checking: 'Перевіряю…', clear: 'Очистити',
      res: '📋 Перевірка', fixed: 'Виправлений текст', errs: 'Помилки', no_errs: '✨ Помилок не знайшов — чудова робота!',
      tip: '💡 Порада', sample: '📗 Зразок відповіді', show_sample: 'Показати зразок', score: n => `Оцінка: ${n} зі 100`,
      left: n => `Перевірок сьогодні: ${n}`, hist: '🗂️ Мої роботи', again: '✍️ Написати ще',
      noai: 'Автоматичної перевірки зараз немає. Текст збережено — порівняй його зі зразком самостійно.',
      err: { short: 'Напиши хоча б одне повне речення.', write_limit: 'Перевірок на сьогодні вже немає. Повертайся завтра — або відкрий Преміум.', no_ai: 'Перевірку ще не налаштовано на сервері.', ai: 'Перевірка не вдалася. Спробуй ще раз.', net: 'Немає зв’язку із сервером.' } },
    en: { title: '✍️ Writing in Norwegian', nav: '✍️ Writing',
      lead: 'Write a few sentences in Norwegian and get your text corrected, your mistakes explained and a model answer. Writing every day matters more than writing a lot.',
      level: 'Level', task: 'Task', other: '🎲 Another task', ph: 'Write in Norwegian…', words: n => `words: ${n}`,
      check: '✅ Check', checking: 'Checking…', clear: 'Clear',
      res: '📋 Feedback', fixed: 'Corrected text', errs: 'Mistakes', no_errs: '✨ No mistakes found — great work!',
      tip: '💡 Tip', sample: '📗 Model answer', show_sample: 'Show the model answer', score: n => `Score: ${n} out of 100`,
      left: n => `Checks left today: ${n}`, hist: '🗂️ My writing', again: '✍️ Write another',
      noai: 'Automatic checking is off right now. Your text is saved — compare it with the model answer yourself.',
      err: { short: 'Write at least one full sentence.', write_limit: 'No checks left today. Come back tomorrow — or get Premium.', no_ai: 'Checking is not set up on the server yet.', ai: 'The check failed. Please try again.', net: 'No connection to the server.' } },
    no: { title: '✍️ Skriving på norsk', nav: '✍️ Skriving',
      lead: 'Skriv noen setninger på norsk, og få teksten rettet, feilene forklart og et eksempelsvar. Å skrive hver dag betyr mer enn å skrive mye.',
      level: 'Nivå', task: 'Oppgave', other: '🎲 En annen oppgave', ph: 'Skriv på norsk …', words: n => `ord: ${n}`,
      check: '✅ Sjekk', checking: 'Sjekker …', clear: 'Tøm',
      res: '📋 Tilbakemelding', fixed: 'Rettet tekst', errs: 'Feil', no_errs: '✨ Fant ingen feil – veldig bra!',
      tip: '💡 Tips', sample: '📗 Eksempelsvar', show_sample: 'Vis eksempelsvaret', score: n => `Poeng: ${n} av 100`,
      left: n => `Sjekker igjen i dag: ${n}`, hist: '🗂️ Tekstene mine', again: '✍️ Skriv en til',
      noai: 'Automatisk retting er av akkurat nå. Teksten er lagret – sammenlign den med eksempelsvaret selv.',
      err: { short: 'Skriv minst én hel setning.', write_limit: 'Ingen sjekker igjen i dag. Kom tilbake i morgen – eller få Premium.', no_ai: 'Retting er ikke satt opp på serveren ennå.', ai: 'Rettingen mislyktes. Prøv igjen.', net: 'Ingen forbindelse med serveren.' } },
    ar: { title: '✍️ الكتابة بالنرويجية', nav: '✍️ الكتابة',
      lead: 'اكتب بضع جمل بالنرويجية واحصل على نص مصحّح وشرح لأخطائك ونموذج إجابة. الكتابة كل يوم أهم من الكتابة كثيرًا.',
      level: 'المستوى', task: 'المهمة', other: '🎲 مهمة أخرى', ph: 'اكتب بالنرويجية…', words: n => `الكلمات: ${n}`,
      check: '✅ تحقّق', checking: 'جارٍ التحقّق…', clear: 'مسح',
      res: '📋 التقييم', fixed: 'النص المصحّح', errs: 'الأخطاء', no_errs: '✨ لا أخطاء — عمل ممتاز!',
      tip: '💡 نصيحة', sample: '📗 نموذج إجابة', show_sample: 'أظهر النموذج', score: n => `النتيجة: ${n} من 100`,
      left: n => `التحققات المتبقية اليوم: ${n}`, hist: '🗂️ نصوصي', again: '✍️ اكتب نصًا آخر',
      noai: 'التصحيح التلقائي متوقف الآن. حُفظ نصك — قارنه بالنموذج بنفسك.',
      err: { short: 'اكتب جملة كاملة على الأقل.', write_limit: 'لا تحققات متبقية اليوم. عد غدًا — أو احصل على بريميوم.', no_ai: 'التصحيح غير مُعد على الخادم بعد.', ai: 'فشل التحقّق. حاول مجددًا.', net: 'لا اتصال بالخادم.' } }
  };
  const tx = () => T[(C() || {}).ui] || T.en;

  /* Завдання: норвезькою (так їх і треба читати) + короткий переклад. */
  const TASKS = {
    A1: [
      ['Fortell om dagen din i dag.', { uk: 'Розкажи про свій сьогоднішній день.', en: 'Tell about your day today.', ar: 'تحدّث عن يومك اليوم.' }],
      ['Skriv om familien din: hvem er de, hva heter de?', { uk: 'Напиши про свою сім’ю: хто вони, як їх звати?', en: 'Write about your family: who they are, what their names are.', ar: 'اكتب عن عائلتك: من هم وما أسماؤهم؟' }],
      ['Hva spiser du til frokost, lunsj og middag?', { uk: 'Що ти їси на сніданок, обід і вечерю?', en: 'What do you eat for breakfast, lunch and dinner?', ar: 'ماذا تأكل في الإفطار والغداء والعشاء؟' }],
      ['Beskriv rommet ditt. Hva er der?', { uk: 'Опиши свою кімнату. Що в ній є?', en: 'Describe your room. What is in it?', ar: 'صِف غرفتك. ماذا فيها؟' }],
      ['Hvordan er været i dag? Hva har du på deg?', { uk: 'Яка сьогодні погода? Що ти вдягнув?', en: 'What is the weather like today? What are you wearing?', ar: 'كيف الطقس اليوم؟ وماذا ترتدي؟' }]
    ],
    A2: [
      ['Fortell om forrige helg. Hva gjorde du?', { uk: 'Розкажи про минулі вихідні. Що ти робив?', en: 'Tell about last weekend. What did you do?', ar: 'تحدّث عن عطلة الأسبوع الماضية. ماذا فعلت؟' }],
      ['Skriv en kort melding til naboen om dugnaden på lørdag.', { uk: 'Напиши коротке повідомлення сусідові про толоку в суботу.', en: 'Write a short message to your neighbour about Saturday’s dugnad.', ar: 'اكتب رسالة قصيرة لجارك عن يوم العمل التطوعي السبت.' }],
      ['Du er syk og må melde fra på jobb. Skriv meldingen.', { uk: 'Ти захворів і маєш повідомити на роботу. Напиши повідомлення.', en: 'You are ill and must tell your workplace. Write the message.', ar: 'أنت مريض وعليك إبلاغ العمل. اكتب الرسالة.' }],
      ['Fortell om veien fra hjemmet ditt til butikken.', { uk: 'Опиши дорогу від дому до магазину.', en: 'Describe the way from your home to the shop.', ar: 'صِف الطريق من بيتك إلى المتجر.' }],
      ['Hva gjør du på fritiden? Skriv om to ting du liker.', { uk: 'Що ти робиш у вільний час? Напиши про дві улюблені справи.', en: 'What do you do in your free time? Write about two things you like.', ar: 'ماذا تفعل في وقت فراغك؟ اكتب عن أمرين تحبهما.' }]
    ],
    B1: [
      ['Skriv en kort søknad på en jobb du har lyst på.', { uk: 'Напиши коротку заяву на роботу, яку хочеш.', en: 'Write a short application for a job you want.', ar: 'اكتب طلب توظيف قصيرًا لوظيفة تريدها.' }],
      ['Du har en klage på en vare du kjøpte. Skriv til butikken.', { uk: 'У тебе скарга на куплений товар. Напиши в магазин.', en: 'You have a complaint about something you bought. Write to the shop.', ar: 'لديك شكوى بشأن سلعة اشتريتها. اكتب إلى المتجر.' }],
      ['Fortell om en gang du flyttet. Hvordan gikk det?', { uk: 'Розкажи, як ти переїжджав. Як усе минуло?', en: 'Tell about a time you moved house. How did it go?', ar: 'تحدّث عن مرة انتقلت فيها للسكن. كيف جرى الأمر؟' }],
      ['Skriv til utleieren om en vannlekkasje på badet.', { uk: 'Напиши орендодавцю про протікання у ванній.', en: 'Write to your landlord about a water leak in the bathroom.', ar: 'اكتب إلى المالك عن تسرّب ماء في الحمّام.' }],
      ['Hva synes du om kollektivtransporten der du bor?', { uk: 'Що ти думаєш про громадський транспорт там, де живеш?', en: 'What do you think about public transport where you live?', ar: 'ما رأيك في النقل العام حيث تسكن؟' }]
    ],
    B2: [
      ['Skriv et leserinnlegg om strømprisene.', { uk: 'Напиши допис у газету про ціни на електрику.', en: 'Write a letter to the editor about electricity prices.', ar: 'اكتب رسالة إلى المحرّر عن أسعار الكهرباء.' }],
      ['Bør alle jobbe fire dager i uka? Begrunn svaret.', { uk: 'Чи мають усі працювати чотири дні на тиждень? Обґрунтуй.', en: 'Should everyone work four days a week? Give your reasons.', ar: 'هل يجب أن يعمل الجميع أربعة أيام أسبوعيًا؟ برّر إجابتك.' }],
      ['Sammenlign livet i hjemlandet ditt og i Norge.', { uk: 'Порівняй життя на батьківщині і в Норвегії.', en: 'Compare life in your home country and in Norway.', ar: 'قارن بين الحياة في بلدك وفي النرويج.' }],
      ['Skriv en kort rapport fra et møte på jobben.', { uk: 'Напиши короткий звіт про робочу нараду.', en: 'Write a short report from a meeting at work.', ar: 'اكتب تقريرًا قصيرًا عن اجتماع في العمل.' }],
      ['Hva kan gjøres for å få flere til å sortere søppel?', { uk: 'Що зробити, щоб більше людей сортувало сміття?', en: 'What can be done to get more people to sort their rubbish?', ar: 'ما الذي يمكن فعله ليفرز عدد أكبر من الناس نفاياتهم؟' }]
    ]
  };
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];

  const draftKey = 'writeDraft';
  const histKey = 'writeHist';

  function render() {
    const K = C(); if (!K) return null;
    const { h, store } = K, L = tx();
    const plan = store.get('plan', {}) || {};
    const saved = store.get(draftKey, {}) || {};
    let level = LEVELS.includes(saved.level) ? saved.level : (LEVELS.includes(plan.goal) ? plan.goal : 'A1');
    let task = saved.task || TASKS[level][0][0];
    let state = null;                                   // { ai, left, limit }

    const root = h('section', { class: 'write-page' });
    const area = h('textarea', { class: 'write-area', rows: 7, placeholder: L.ph, spellcheck: 'false' });
    area.value = saved.text || '';
    const counter = h('small', { class: 'write-count' });
    const msg = h('p', { class: 'fb-msg' });
    const result = h('div', { class: 'write-result' });
    const leftEl = h('small', { class: 'write-left' });

    const wordCount = () => (area.value.trim().match(/[\p{L}\p{N}'’-]+/gu) || []).length;
    const saveDraft = () => store.set(draftKey, { level, task, text: area.value });
    const drawCount = () => { counter.textContent = L.words(wordCount()); };
    area.addEventListener('input', () => { drawCount(); saveDraft(); });

    const taskText = () => {
      const list = TASKS[level];
      const row = list.find(x => x[0] === task) || list[0];
      const tr = row[1][(C() || {}).ui];
      return [row[0], tr && (C() || {}).ui !== 'no' ? tr : ''];
    };
    const taskBox = h('div', { class: 'write-task' });
    function drawTask() {
      const [no, tr] = taskText();
      taskBox.replaceChildren(h('b', { lang: 'nb' }, no), tr ? h('small', {}, tr) : null);
    }
    const nextTask = () => {
      const list = TASKS[level].map(x => x[0]);
      task = list[(list.indexOf(task) + 1) % list.length];
      drawTask(); saveDraft();
    };
    const levelRow = h('div', { class: 'write-levels' }, LEVELS.map(lv => {
      const b = h('button', { class: 'btn small' + (lv === level ? ' accent' : ''), type: 'button', onclick: () => {
        level = lv; task = TASKS[lv][0][0];
        [...levelRow.children].forEach(x => x.classList.toggle('accent', x.textContent === lv));
        drawTask(); saveDraft();
      } }, lv);
      return b;
    }));

    const btn = h('button', { class: 'btn accent big', type: 'button' }, L.check);
    btn.addEventListener('click', check);

    async function check() {
      if (wordCount() < 3) { msg.textContent = L.err.short; return; }
      msg.textContent = ''; btn.disabled = true; btn.textContent = L.checking;
      try {
        const r = await fetch(API, { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' },
          body: JSON.stringify({ action: 'check', task: taskText()[0], level, lang: K.ui, text: area.value })
        }).then(x => x.json());
        if (r && r.ok) { show(r); K.Sfx.good(); keep(r); if (typeof r.left === 'number') leftEl.textContent = L.left(r.left); }
        else msg.textContent = (r && L.err[r.error]) || L.err.net;
      } catch { msg.textContent = L.err.net; }
      btn.disabled = false; btn.textContent = L.check;
    }

    function keep(r) {
      const list = store.get(histKey, []);
      list.unshift({ at: Date.now(), level, task: taskText()[0], text: area.value, fixed: r.fixed, score: r.score });
      store.set(histKey, list.slice(0, 10));
    }

    function show(r) {
      const errs = r.errors || [];
      const sample = h('div', { class: 'write-sample', hidden: true }, h('h4', {}, L.sample), h('p', { lang: 'nb' }, r.sample || ''));
      result.replaceChildren(
        h('div', { class: 'box write-fb' },
          h('h3', {}, L.res, ' ', h('span', { class: 'write-score' }, L.score(r.score || 0))),
          r.fixed ? [h('h4', {}, L.fixed), h('p', { class: 'write-fixed', lang: 'nb' }, r.fixed)] : null,
          h('h4', {}, L.errs),
          errs.length
            ? h('ul', { class: 'write-errs' }, errs.map(e => h('li', {},
              h('s', { lang: 'nb' }, e.wrong), ' → ', h('b', { lang: 'nb' }, e.right), e.why ? h('small', {}, e.why) : null)))
            : h('p', { class: 'write-ok' }, L.no_errs),
          r.tip ? h('p', { class: 'write-tip' }, L.tip + ': ' + r.tip) : null,
          r.sample ? h('button', { class: 'btn small', type: 'button', onclick: e => { sample.hidden = false; e.currentTarget.remove(); } }, L.show_sample) : null,
          sample,
          h('button', { class: 'btn', type: 'button', onclick: () => { area.value = ''; drawCount(); saveDraft(); result.replaceChildren(); area.focus(); } }, L.again)));
      result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // скільки перевірок лишилося й чи взагалі налаштовано ШІ
    fetch(API + '?action=state', { cache: 'no-store', credentials: 'same-origin' }).then(r => r.json()).then(j => {
      state = j && j.ok ? j : null;
      if (!state) return;
      leftEl.textContent = L.left(state.left);
      if (!state.ai) { msg.textContent = L.noai; btn.disabled = true; }
    }).catch(() => { /* офлайн — просто пишемо без перевірки */ });

    const hist = store.get(histKey, []);
    drawTask(); drawCount();
    root.append(
      K.pageHead ? K.pageHead(L.title) : h('h1', {}, L.title),
      h('p', { class: 'lead-p' }, L.lead),
      h('div', { class: 'box' },
        h('div', { class: 'row-left write-top' }, h('b', {}, L.level), levelRow, h('span', { class: 'grow' }), leftEl),
        h('h3', {}, L.task), taskBox,
        h('button', { class: 'btn small', type: 'button', onclick: nextTask }, L.other)),
      area, h('div', { class: 'row-left' }, btn, counter), msg, result,
      hist.length ? h('div', { class: 'box write-hist' }, h('h3', {}, L.hist),
        h('ul', {}, hist.slice(0, 5).map(x => h('li', {},
          h('b', {}, x.level + ' · ' + (x.score || 0) + '/100'), ' ', h('span', {}, x.task))))) : null);
    return root;
  }

  window.KomiksWrite = { render, text: k => tx()[k] };
})();
