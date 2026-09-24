/* Комікс·Lab — «Слова»: тематичні словники з емодзі, озвученням, режимом навчання й тестами.
   Дані — data/words.js (window.WORDS). Тести лише норвезькою: «Hva er dette?» за емодзі та «Lytt og velg». */
(() => {
  'use strict';
  const WX = {
    uk: {
      nav: 'Слова', module: ['📝', 'Слова', 'понад 400 слів за темами з озвученням'],
      title: '📝 Слова за темами', intro: 'Найпотрібніші норвезькі слова: сім’я, їжа, одяг, тварини, місто, професії, почуття… Натисни на картку — почуєш слово. Для іменників показано рід: en, ei або et.',
      themes: '🗂️ Теми', words_n: n => `${n} слів`, learn: '🙈 Сховати переклад', show: '👀 Показати переклад', play_all: '🔊 Прослухати всі', test: '🧩 Тест з теми',
      all_test: '🧩 Тест з усіх слів', tip: 'Порада: сховай переклад і спробуй згадати значення, потім натисни на картку, щоб перевірити.', back: '← Усі теми', tests: '📝 Слова за темами',
      step: x => `Слова: ${x}`, gender: 'en — чоловічий, ei — жіночий, et — середній рід',
      say: 'Сказати вголос', know: 'Знаю', know_hint: 'Позначай слова, які вже знаєш, — лічильник потрапляє в кабінет.', known_n: (a, b) => `✅ Знаю: ${a} з ${b}`, known_all: n => `✅ Знаю: ${n}`, reset_known: '↩️ Зняти позначки теми'
    },
    en: {
      nav: 'Words', module: ['📝', 'Words', '400+ words by topic with audio'],
      title: '📝 Words by topic', intro: 'The most useful Norwegian words: family, food, clothes, animals, town, jobs, feelings… Tap a card to hear the word. Nouns show their gender: en, ei or et.',
      themes: '🗂️ Topics', words_n: n => `${n} words`, learn: '🙈 Hide translation', show: '👀 Show translation', play_all: '🔊 Listen to all', test: '🧩 Topic test',
      all_test: '🧩 Test on all words', tip: 'Tip: hide the translation and try to remember the meaning, then tap the card to check.', back: '← All topics', tests: '📝 Words by topic',
      step: x => `Words: ${x}`, gender: 'en — masculine, ei — feminine, et — neuter',
      say: 'Say it out loud', know: 'I know it', know_hint: 'Mark the words you already know — the counter shows up in your account.', known_n: (a, b) => `✅ Known: ${a} of ${b}`, known_all: n => `✅ Known: ${n}`, reset_known: '↩️ Clear marks in this topic'
    },
    no: {
      nav: 'Ord', module: ['📝', 'Ord', 'over 400 ord etter tema, med lyd'],
      title: '📝 Ord etter tema', intro: 'De viktigste norske ordene: familie, mat, klær, dyr, byen, yrker, følelser … Trykk på et kort for å høre ordet. Substantiv står med kjønn: en, ei eller et.',
      themes: '🗂️ Temaer', words_n: n => `${n} ord`, learn: '🙈 Skjul oversettelsen', show: '👀 Vis oversettelsen', play_all: '🔊 Hør alle', test: '🧩 Test i temaet',
      all_test: '🧩 Test i alle ordene', tip: 'Tips: skjul oversettelsen og prøv å huske betydningen.', back: '← Alle temaer', tests: '📝 Ord etter tema',
      step: x => `Ord: ${x}`, gender: 'en — hankjønn, ei — hunkjønn, et — intetkjønn',
      say: 'Si det høyt', know: 'Jeg kan det', know_hint: 'Merk ordene du allerede kan – telleren vises på siden din.', known_n: (a, b) => `✅ Kan: ${a} av ${b}`, known_all: n => `✅ Kan: ${n}`, reset_known: '↩️ Fjern merkene i temaet'
    }
  };
  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { words: WX[l].nav });
    I.modules = Object.assign({}, I.modules, { words: WX[l].module });
    if (l !== 'no') I.qtr = Object.assign({}, I.qtr, { emoji: l === 'uk' ? 'Що це? Вибери норвезьке слово' : 'What is this? Choose the Norwegian word' });
  }
  const C = () => window.KomiksCore;
  WX.ar = {
    nav: 'الكلمات', module: ['📝', 'الكلمات', 'أكثر من 400 كلمة حسب المواضيع مع الصوت'],
    title: '📝 الكلمات حسب المواضيع', intro: 'أهم الكلمات النرويجية: العائلة، الطعام، الملابس، الحيوانات، المدينة، المهن، المشاعر… اضغط على بطاقة لتسمع الكلمة. تُظهر الأسماء جنسها: en أو ei أو et.',
    themes: '🗂️ المواضيع', words_n: n => `${n} كلمة`, learn: '🙈 أخفِ الترجمة', show: '👀 أظهر الترجمة', play_all: '🔊 استمع إلى الكل', test: '🧩 اختبار الموضوع',
    all_test: '🧩 اختبار كل الكلمات', tip: 'نصيحة: أخفِ الترجمة وحاول تذكّر المعنى، ثم اضغط على البطاقة للتحقق.', back: '→ كل المواضيع', tests: '📝 الكلمات حسب المواضيع',
    step: x => `الكلمات: ${x}`, gender: 'en — مذكّر، ei — مؤنّث، et — محايد',
    say: 'قلها بصوت عالٍ', know: 'أعرفها', know_hint: 'علّم الكلمات التي تعرفها — يظهر العدد في حسابك.', known_n: (a, b) => `✅ أعرفها: ${a} من ${b}`, known_all: n => `✅ أعرفها: ${n}`, reset_known: '↩️ امسح العلامات في هذا الموضوع'
  };
  const wx = (k, ...a) => { const tbl = WX[C().ui] || WX.en || WX.uk; const v = k in tbl ? tbl[k] : (WX.en || WX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const themes = () => (window.WORDS || { themes: [] }).themes;
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const stars = key => (((C().store.get('progress', {}))[key]) || {}).stars || 0;
  const tName = th => (C().ui === 'no' ? th.no : th[C().ui] || th.en || th.uk);
  const label = id => { const th = themes().find(x => x.id === id); return th ? `${th.icon} ${th.no}` : id; };
  /* слова, позначені «знаю» (ключ «тема|слово») — рахуються в кабінеті */
  const knownList = () => C().store.get('wordsKnown', []);
  const keyOf = (themeId, no) => themeId + '|' + no;
  const isKnown = (themeId, no) => knownList().includes(keyOf(themeId, no));
  function toggleKnown(themeId, no) {
    const K = C(), key = keyOf(themeId, no), list = knownList();
    const next = list.includes(key) ? list.filter(x => x !== key) : [...list, key];
    K.store.set('wordsKnown', next);
    return next.includes(key);
  }
  const knownCount = themeId => { const list = knownList(); return themeId ? list.filter(x => x.startsWith(themeId + '|')).length : list.length; };

  /* ---------------- завдання ---------------- */
  function questions(filter, n) {
    const K = C();
    const nOpt = K.settings.level === 'kids' ? 3 : 4;
    let list = themes();
    if (filter && filter.startsWith('level:')) { const max = LEVELS.indexOf(filter.slice(6)); list = list.filter(th => LEVELS.indexOf(th.level) <= max); }
    else if (filter) list = list.filter(th => th.id === filter);
    const all = list.flatMap(th => th.words.map(w => [th, w]));
    return K.shuffle(all).slice(0, n).map(([th, w], i) => {
      // варіанти з тієї ж теми, без слів з однаковим емодзі чи значенням
      const pool = K.uniq(th.words.filter(x => x[0] !== w[0] && x[3] !== w[3] && x[1] !== w[1]).map(x => x[0]));
      const options = K.shuffle([w[0], ...K.sample(pool, nOpt - 1)]);
      return i % 2 === 0
        ? { type: 'emoji', theme: th.id, item: { no: w[0], uk: w[1], en: w[2], emoji: w[3] }, answer: w[0], options }
        : { type: 'listen', theme: th.id, item: { no: w[0], uk: w[1], en: w[2] }, answer: w[0], options };
    });
  }
  const quizSize = () => (C().settings.level === 'kids' ? 10 : 14);
  const quiz = id => questions(id || null, quizSize());

  /* ---------------- сторінка ---------------- */
  let hideTr = false;
  function render(id) {
    const K = C(), { h } = K;
    const ui = K.ui;
    const th = id ? themes().find(x => x.id === id) : null;
    const say = text => K.claim().then(() => K.Speech.speak(text, 'narrator', { rate: 0.9 }));
    if (!th) {
      const total = themes().reduce((a, x) => a + x.words.length, 0);
      return h('section', { class: 'words-page' }, K.pageHead(wx('title')),
        h('p', { class: 'lead-p' }, wx('intro')),
        h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/words' }, wx('all_test')), h('span', { class: 'hint' }, wx('words_n', total)), h('span', { class: 'known-chip' }, wx('known_all', knownCount())), K.stars(stars('words'))),
        h('p', { class: 'hint' }, '✅ ' + wx('know_hint')),
        h('p', { class: 'hint' }, '💡 ' + wx('gender')),
        ...LEVELS.flatMap(l => { const list = themes().filter(x => x.level === l); return list.length ? [h('h3', { class: 'sec-sub' }, l),
          h('div', { class: 'theme-grid' }, list.map(x => K.withTr(h('a', { class: 'theme-tile', href: '#/words/' + x.id }, h('span', { class: 'tt-ico' }, x.icon), h('b', {}, x.no), ui !== 'no' ? h('small', {}, x[ui] || x.en || x.uk) : null, h('span', { class: 'tt-meta' }, wx('words_n', x.words.length), ' · ', wx('known_n', knownCount(x.id), x.words.length), ' ', K.stars(stars('words:' + x.id)))), K.both(x.uk, x.en))))] : []; }));
    }
    const grid = h('div', { class: 'word-grid' + (hideTr ? ' hide-tr' : '') });
    const counter = h('span', { class: 'known-chip' }, wx('known_n', knownCount(th.id), th.words.length));
    const refreshCounter = () => { counter.textContent = wx('known_n', knownCount(th.id), th.words.length); };
    grid.append(...th.words.map(([no, uk, en, emoji]) => {
      const mark = h('button', { class: 'wc-know', type: 'button', title: wx('know'), 'aria-label': wx('know'), 'aria-pressed': String(isKnown(th.id, no)) }, '✓');
      // 🎙️ сказати слово вголос і почути оцінку вимови (де браузер це вміє)
      const recOut = h('div', { class: 'wc-rec' });
      const sayBtn = K.canRecord && K.canRecord()
        ? h('button', { class: 'wc-say', type: 'button', title: wx('say'), 'aria-label': wx('say'), onclick: e => { e.stopPropagation(); K.practice(no, recOut, e.currentTarget); } }, '🎙️')
        : null;
      const card = h('div', { class: 'word-card' + (isKnown(th.id, no) ? ' known' : '') },
        h('button', { class: 'wc-main', type: 'button', onclick: () => { say(no); card.classList.add('peek'); } },
          h('span', { class: 'wc-emoji' }, window.KomiksPics && window.KomiksPics.has(no) ? window.KomiksPics.el(no, 46) : emoji), h('b', { class: 'wc-no' }, no), h('span', { class: 'wc-tr' }, ui === 'en' ? en : ui === 'no' ? `${uk} · ${en}` : uk)),
        mark, sayBtn, recOut);
      mark.addEventListener('click', e => {
        e.stopPropagation();
        const on = toggleKnown(th.id, no);
        card.classList.toggle('known', on);
        mark.setAttribute('aria-pressed', String(on));
        K.Sfx.tick();
        refreshCounter();
      });
      return K.withTr(card, K.both(uk, en));
    }));
    const toggle = h('button', { class: 'btn', type: 'button', onclick: () => { hideTr = !hideTr; grid.classList.toggle('hide-tr', hideTr); K.$$('.word-card', grid).forEach(c => c.classList.remove('peek')); toggle.textContent = hideTr ? wx('show') : wx('learn'); } }, hideTr ? wx('show') : wx('learn'));
    const playAll = async () => { await K.claim(); for (const [no] of th.words) { await K.Speech.speak(no, 'narrator', { rate: 0.9 }); await K.sleep(200); } };
    return h('section', { class: 'words-page' }, K.pageHead(`${th.icon} ${th.no}` + (ui !== 'no' ? ` — ${tName(th)}` : ''), '#/words'),
      h('div', { class: 'gram-chips' }, themes().map(x => h('a', { class: 'chip' + (x.id === th.id ? ' on' : ''), href: '#/words/' + x.id }, x.icon + ' ' + (ui === 'no' ? x.no : x[ui] || x.en || x.uk)))),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/words/' + th.id }, wx('test')), toggle, h('button', { class: 'btn', type: 'button', onclick: playAll }, wx('play_all')), counter, h('span', { class: 'lvl lvl-' + th.level }, th.level), K.stars(stars('words:' + th.id))),
      h('p', { class: 'hint' }, wx('tip')),
      grid);
  }

  window.KomiksWords = { themes, label, questions, quiz, render, text: wx, name: tName, stars, knownCount, isKnown, toggleKnown };
})();
