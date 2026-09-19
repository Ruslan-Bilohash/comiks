/* Комікс·Lab — англійський курс: історії в іншому стилі коміксу (`style: 'strip'`) і тести англійською.
   Дані — data/english.js (window.ENGLISH), словник — data/dictionary-en.js (window.DICT_EN).
   Завдання тестів — англійською; при наведенні на слово видно українською та норвезькою. */
(() => {
  'use strict';
  const EN = {
    uk: {
      nav: 'Англійська', module: ['🇬🇧', 'Англійська', 'окремий курс в іншому стилі коміксу'],
      title: '🇬🇧 Англійська через комікси', intro: 'Окремий курс: інший стиль малюнка, історії англійською та тести англійською мовою. Наведи на слово — побачиш переклад українською та норвезькою.',
      read: '📖 Читати', test: '🧩 Тест', tests_title: '🇬🇧 Англійські тести', words: n => `${n} слів`,
      panel_of: (i, n) => `Кадр ${i} з ${n}`, prev: '◀ Назад', next: 'Далі ▶', play: '🔊 Озвучити кадр', all: '▶️ Увесь комікс',
      to_test: '🧩 До тесту', vocab: n => `📒 Слова історії (${n})`, back: '← Усі історії', level: l => `Рівень ${l}`,
      step: x => `Англійська: ${x}`, lang_note: '🇬🇧 Цей розділ — англійською. Норвезька частина сайту не змінюється.',
      stories: '📚 Історії', words_title: '📝 Англійські слова за темами', words_intro: 'Ті самі 19 тем, що й у норвезькому розділі, — тепер англійською. Натисни на картку, щоб почути слово, і постав ✓, якщо вже знаєш його.',
      words_btn: '📝 Слова за темами', all_words_test: '🧩 Тест з усіх слів', known_n: (a, b) => `✅ Знаю: ${a} з ${b}`, known_all: n => `✅ Знаю: ${n}`, know: 'Знаю',
      hide: '🙈 Сховати переклад', show: '👀 Показати переклад', play_all: '🔊 Прослухати всі', topic_test: '🧩 Тест з теми', back_words: '← Усі теми'
    },
    en: {
      nav: 'English', module: ['🇬🇧', 'English', 'a separate course in a different comic style'],
      title: '🇬🇧 English through comics', intro: 'A separate course: a different drawing style, stories in English and tests in English. Hover over a word to see the Ukrainian and Norwegian translation.',
      read: '📖 Read', test: '🧩 Test', tests_title: '🇬🇧 English tests', words: n => `${n} words`,
      panel_of: (i, n) => `Panel ${i} of ${n}`, prev: '◀ Back', next: 'Next ▶', play: '🔊 Read the panel', all: '▶️ Whole comic',
      to_test: '🧩 Go to the test', vocab: n => `📒 Words in this story (${n})`, back: '← All stories', level: l => `Level ${l}`,
      step: x => `English: ${x}`, lang_note: '🇬🇧 This section is in English. The Norwegian part of the site stays as it is.',
      stories: '📚 Stories', words_title: '📝 English words by topic', words_intro: 'The same 19 topics as in the Norwegian section — now in English. Tap a card to hear the word and tick ✓ if you already know it.',
      words_btn: '📝 Words by topic', all_words_test: '🧩 Test on all words', known_n: (a, b) => `✅ Known: ${a} of ${b}`, known_all: n => `✅ Known: ${n}`, know: 'I know it',
      hide: '🙈 Hide translation', show: '👀 Show translation', play_all: '🔊 Listen to all', topic_test: '🧩 Topic test', back_words: '← All topics'
    },
    no: {
      nav: 'Engelsk', module: ['🇬🇧', 'Engelsk', 'et eget kurs i en annen tegneseriestil'],
      title: '🇬🇧 Engelsk med tegneserier', intro: 'Et eget kurs: en annen tegnestil, historier på engelsk og tester på engelsk. Hold over et ord for å se oversettelsen til ukrainsk og norsk.',
      read: '📖 Les', test: '🧩 Test', tests_title: '🇬🇧 Engelske tester', words: n => `${n} ord`,
      panel_of: (i, n) => `Rute ${i} av ${n}`, prev: '◀ Tilbake', next: 'Neste ▶', play: '🔊 Les ruten', all: '▶️ Hele serien',
      to_test: '🧩 Til testen', vocab: n => `📒 Ord i historien (${n})`, back: '← Alle historier', level: l => `Nivå ${l}`,
      step: x => `Engelsk: ${x}`, lang_note: '🇬🇧 Denne delen er på engelsk.',
      stories: '📚 Historier', words_title: '📝 Engelske ord etter tema', words_intro: 'De samme 19 temaene som i den norske delen – nå på engelsk. Trykk på et kort for å høre ordet og kryss av ✓ hvis du kan det.',
      words_btn: '📝 Ord etter tema', all_words_test: '🧩 Test i alle ordene', known_n: (a, b) => `✅ Kan: ${a} av ${b}`, known_all: n => `✅ Kan: ${n}`, know: 'Jeg kan det',
      hide: '🙈 Skjul oversettelsen', show: '👀 Vis oversettelsen', play_all: '🔊 Hør alle', topic_test: '🧩 Test i temaet', back_words: '← Alle temaer'
    }
  };
  // тексти завдань — англійською (сам тест), підказка при наведенні — uk/en
  const QE = {
    who: ['Who says this?', '🗣️ Listening'], panel: ['Which picture is this line from?', '🖼️ Pictures'],
    listen: ['Listen and choose the word', '🎧 Listening'], picture: ['What is this?', '🖼️ Picture'],
    blank: ['Which word is missing?', '✏️ Grammar'], emoji: ['What is this?', '📝 Words']
  };
  const QTIP = {
    uk: { who: 'Хто це каже?', panel: 'З якого кадру ця репліка?', listen: 'Послухай і вибери слово', picture: 'Що це?', blank: 'Якого слова бракує?', emoji: 'Що це? Вибери англійське слово' },
    en: { who: 'Who says this?', panel: 'Which picture is this line from?', listen: 'Listen and choose the word', picture: 'What is this?', blank: 'Which word is missing?', emoji: 'What is this? Choose the English word' }
  };
  const UI = {
    uk: { exit: '← Вийти', next: 'Далі ▶', result: 'Результат 🏁', correct: 'Правильна відповідь: ', again: '🔄 Ще раз', reread: '📖 Прочитати знову', home: '🏠 На головну', score: (s, n, p) => `${s} з ${n} правильних · ${p} %` },
    en: { exit: '← Exit', next: 'Next ▶', result: 'Result 🏁', correct: 'Correct answer: ', again: '🔄 Try again', reread: '📖 Read again', home: '🏠 Home', score: (s, n, p) => `${s} of ${n} correct · ${p} %` },
    no: { exit: '← Avslutt', next: 'Neste ▶', result: 'Resultat 🏁', correct: 'Riktig svar: ', again: '🔄 Prøv igjen', reread: '📖 Les igjen', home: '🏠 Hjem', score: (s, n, p) => `${s} av ${n} riktige · ${p} %` }
  };
  const PRAISE = ['Great!', 'Well done!', 'Excellent!', 'Nice work!'];

  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { english: EN[l].nav });
    I.modules = Object.assign({}, I.modules, { english: EN[l].module });
  }

  const C = () => window.KomiksCore;
  const ex = (k, ...a) => { const tbl = EN[C().ui] || EN.en || EN.uk; const v = k in tbl ? tbl[k] : (EN.en || EN.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const ui = (k, ...a) => { const tbl = UI[C().ui] || UI.en || UI.uk; const v = typeof tbl[k] === 'function' ? tbl[k](...a) : tbl[k]; return v; };
  const comics = () => ((window.ENGLISH || { comics: [] }).comics);
  const byId = id => comics().find(c => c.id === id);
  const stars = key => (((C().store.get('progress', {}))[key]) || {}).stars || 0;
  const tip = type => C().both(QTIP.uk[type], QTIP.en[type]);

  /* переклад слова: словник англійських слів + vocab історій */
  let emap = null;
  function lookupEn(word) {
    const K = C();
    const w = K.norm(word);
    if (!w) return null;
    if (!emap) {
      emap = new Map();
      const D = window.DICT_EN || {};
      for (const [k, v] of Object.entries(D.uk || {})) emap.set(K.norm(k), { uk: v, no: (D.no || {})[k] || '' });
      comics().forEach(c => c.vocab.forEach(([en, uk, no]) => { const key = K.norm(en); if (!emap.has(key)) emap.set(key, { uk, no }); }));
    }
    const hit = emap.get(w);
    return hit ? { uk: hit.uk, no: hit.no || '' } : null;
  }
  /* ---------------- слова за темами (дані — data/words.js, поле en) ---------------- */
  const themes = () => ((window.WORDS || { themes: [] }).themes);
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const knownList = () => C().store.get('wordsKnownEn', []);
  const kKey = (t, en) => t + '|' + en;
  const isKnown = (t, en) => knownList().includes(kKey(t, en));
  function toggleKnown(t, en) { const list = knownList(), k = kKey(t, en); const next = list.includes(k) ? list.filter(x => x !== k) : [...list, k]; C().store.set('wordsKnownEn', next); return next.includes(k); }
  const knownCount = t => { const l = knownList(); return t ? l.filter(x => x.startsWith(t + '|')).length : l.length; };
  // filter: null — усі теми; 'level:A2' — до рівня; інакше id теми. Питання: емодзі або на слух
  function wordQuestions(filter, n) {
    const K = C();
    const nOpt = K.settings.level === 'kids' ? 3 : 4;
    let list = themes();
    if (filter && filter.startsWith('level:')) { const max = LEVELS.indexOf(filter.slice(6)); list = list.filter(t => LEVELS.indexOf(t.level) <= max); }
    else if (filter) list = list.filter(t => t.id === filter);
    const all = list.flatMap(t => t.words.map(w => [t, w]));
    return K.shuffle(all).slice(0, n).map(([t, w], i) => {
      const pool = K.uniq(t.words.filter(x => x[2] !== w[2] && x[3] !== w[3] && x[1] !== w[1]).map(x => x[2]));
      const options = K.shuffle([w[2], ...K.sample(pool, nOpt - 1)]);
      const item = { no: w[2], en: w[2], uk: w[1], nb: w[0], emoji: w[3] };
      return i % 2 === 0 ? { type: 'emoji', lang: 'en', theme: t.id, item, answer: w[2], options } : { type: 'listen', lang: 'en', theme: t.id, item, word: w[2], answer: w[2], options };
    });
  }

  const speak = (text, who = 'narrator', rate = 1) => C().claim().then(() => C().Speech.speak(text, who, { rate, lang: 'en' }));
  function enWords(text) {
    const K = C(), { h } = K;
    const wrap = h('span', { class: 'words' });
    for (const tk of String(text).match(/[\p{L}\p{N}'’-]+|[^\p{L}\p{N}'’-]+/gu) || []) {
      if (!/[\p{L}\p{N}]/u.test(tk)) { wrap.append(tk); continue; }
      const w = h('span', { class: 'w' }, tk);
      const tr = lookupEn(tk);
      K.withTr(w, tr && (tr.uk || tr.no) ? tr : null);
      w.addEventListener('click', e => { e.stopPropagation(); speak(tk, 'narrator', 0.9); });
      wrap.append(w);
    }
    return wrap;
  }

  /* ---------------- сторінки ---------------- */
  function renderList() {
    const K = C(), { h } = K;
    return h('section', { class: 'english' }, K.pageHead(ex('title')),
      h('p', { class: 'lead-p' }, ex('intro')),
      h('p', { class: 'hint' }, ex('lang_note')),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/english/words' }, ex('words_btn')), h('a', { class: 'btn', href: '#/quiz/en-words' }, ex('all_words_test')), h('span', { class: 'known-chip' }, ex('known_all', knownCount()))),
      h('h3', { class: 'sec-sub' }, ex('stories')),
      h('div', { class: 'grid' }, comics().map(c => h('article', { class: 'card strip-card' },
        h('a', { class: 'card-cover', href: `#/english/${c.id}/0` }, K.svgEl(K.ART.panel(c, c.cover || 0, { lang: 'en', tr: 'uk+no', bubbles: false, chars: K.CH, style: 'strip' }))),
        h('div', { class: 'card-body' },
          h('span', { class: 'lvl lvl-' + c.level }, c.level),
          h('h3', {}, c.title), h('p', { class: 'muted' }, c.summaryUk),
          h('div', { class: 'row-left' },
            h('a', { class: 'btn primary', href: `#/english/${c.id}/0` }, ex('read')),
            h('a', { class: 'btn accent', href: `#/quiz/en/${c.id}` }, ex('test')),
            K.stars(stars('en:' + c.id)),
            h('span', { class: 'hint' }, ex('words', c.vocab.length))))))));
  }

  function renderRead(id, idx) {
    const K = C(), { h } = K;
    const c = byId(id); if (!c) return renderList();
    const i = Math.max(0, Math.min(c.panels.length - 1, idx | 0));
    const panel = c.panels[i];
    const playPanel = async () => { await K.claim(); for (const l of panel.lines) { await K.Speech.speak(l.en, l.who, { lang: 'en' }); await K.sleep(160); } };
    const playAll = async () => {
      await K.claim();
      for (let k = i; k < c.panels.length; k++) {
        location.hash = `#/english/${c.id}/${k}`;
        for (const l of c.panels[k].lines) { await K.Speech.speak(l.en, l.who, { lang: 'en' }); await K.sleep(160); }
      }
    };
    const line = l => h('li', {}, h('button', { class: 'play', type: 'button', 'aria-label': 'Listen', onclick: () => speak(l.en, l.who) }, '🔊'),
      h('b', { style: { color: K.ch(l.who).color } }, K.ch(l.who).emoji + ' ' + (K.ch(l.who).en || K.ch(l.who).no) + ': '),
      K.withTr(h('span', { class: 'en-line' }, enWords(l.en)), { uk: l.uk, no: l.no || '' }));
    const seen = K.store.get('en.seen.' + c.id, []);
    if (!seen.includes(i)) K.store.set('en.seen.' + c.id, [...seen, i]);
    return h('section', { class: 'reader english-reader' },
      K.pageHead(`🇬🇧 ${c.title}`, '#/english'),
      h('div', { class: 'row-left' }, h('span', { class: 'lvl lvl-' + c.level }, c.level), h('span', { class: 'hint' }, ex('panel_of', i + 1, c.panels.length))),
      h('div', { class: 'en-stage' },
        h('div', { class: 'panel-frame strip-frame' }, K.svgEl(K.ART.panel(c, i, { lang: 'en', tr: 'uk+no', chars: K.CH, style: 'strip' }))),
        h('ul', { class: 'lines' }, panel.lines.map(line))),
      h('div', { class: 'row-left' },
        h('a', { class: 'btn', href: `#/english/${c.id}/${i - 1}`, hidden: i === 0 }, ex('prev')),
        h('button', { class: 'btn primary', type: 'button', onclick: playPanel }, ex('play')),
        h('button', { class: 'btn', type: 'button', onclick: playAll }, ex('all')),
        i + 1 < c.panels.length ? h('a', { class: 'btn accent', href: `#/english/${c.id}/${i + 1}` }, ex('next')) : h('a', { class: 'btn accent', href: `#/quiz/en/${c.id}` }, ex('to_test'))),
      h('h3', { class: 'sec-sub' }, ex('vocab', c.vocab.length)),
      h('div', { class: 'word-grid' }, c.vocab.map(([en, uk, no]) => K.withTr(h('button', { class: 'word-card', type: 'button', onclick: () => speak(en) },
        h('span', { class: 'wc-main' }, h('b', { class: 'wc-no' }, en), h('span', { class: 'wc-tr' }, uk))), { uk, no }))));
  }

  /* ---------------- тест ---------------- */
  function buildQuiz(c) {
    const K = C();
    const kids = K.settings.level === 'kids', nOpt = kids ? 3 : 4;
    const all = c.panels.flatMap((p, pi) => p.lines.map(l => ({ ...l, pi })));
    const talk = all.filter(l => l.who !== 'narrator' && l.en.length > 8);
    const speakers = K.uniq(talk.map(l => l.who));
    const opts = (ans, pool) => K.shuffle([ans, ...K.sample(K.uniq(pool).filter(x => x !== ans), nOpt - 1)]);
    const qs = [];
    if (speakers.length >= 2) K.sample(talk, 3).forEach(l => qs.push({ type: 'who', line: l, answer: l.who, options: opts(l.who, speakers) }));
    K.sample(talk, 2).forEach(l => qs.push({ type: 'panel', line: l, answer: l.pi, options: opts(l.pi, K.range(c.panels.length)) }));
    K.sample(c.vocab, 3).forEach(([en]) => qs.push({ type: 'listen', word: en, answer: en, options: opts(en, c.vocab.map(v => v[0])) }));
    const pics = (K.B.pictures || []).map(([type, , , en]) => ({ type, en })).filter(p => p.en);
    K.sample(pics, 2).forEach(p => qs.push({ type: 'picture', pict: p.type, answer: p.en, options: opts(p.en, pics.map(x => x.en)) }));
    const pool = K.uniq(all.flatMap(x => (x.en.match(/[A-Za-z']{4,}/g) || [])));
    K.shuffle(talk.filter(l => (l.en.match(/[A-Za-z']{4,}/g) || []).length >= 2)).slice(0, kids ? 2 : 4).forEach(l => {
      const w = K.pick(l.en.match(/[A-Za-z']{4,}/g));
      qs.push({ type: 'blank', line: l, word: w, answer: w, options: opts(w, pool) });
    });
    return K.shuffle(qs).slice(0, kids ? 10 : 12);
  }

  function renderQuiz(id) {
    const c = byId(id); if (!c) return renderList();
    return runQuiz({ key: 'en:' + c.id, title: c.title, build: () => buildQuiz(c), c, reread: `#/english/${c.id}/0` });
  }
  function renderWordsQuiz(themeId) {
    const K = C();
    const t = themes().find(x => x.id === themeId);
    return runQuiz({ key: 'enw:' + (t ? t.id : 'all'), title: t ? `${t.icon} ${t.en}` : 'Words', build: () => wordQuestions(t ? t.id : null, K.settings.level === 'kids' ? 10 : 14), reread: t ? '#/english/words/' + t.id : '#/english/words' });
  }
  function runQuiz({ key, title, build, c = null, reread = '#/english' }) {
    const K = C(), { h } = K;
    const S = { qs: build(), i: 0, score: 0 };
    const root = h('section', { class: 'quiz english-quiz' });
    const draw = () => {
      K.stopAll();
      if (S.i >= S.qs.length) return result();
      const q = S.qs[S.i];
      const [title, tag] = QE[q.type];
      const scoreEl = h('span', { class: 'stat' }, `⭐ ${S.score}`);
      const card = h('div', { class: 'q-card' }, window.KomiksIcons ? window.KomiksIcons.chip(q.type, tag) : h('span', { class: 'q-type' }, tag), K.withTr(h('h3', { class: 'q-title' }, title), tip(q.type)));
      const body = h('div', {});
      card.append(body);
      const sayIt = () => {
        if (q.type === 'listen') speak(q.word, 'narrator', 0.85);
        else if (q.type === 'picture' || q.type === 'emoji') speak(q.answer, 'narrator', 0.9);
        else if (q.line) speak(q.line.en, q.line.who);
      };
      const finish = ok => {
        if (ok) { S.score++; K.Sfx.good(); } else K.Sfx.bad();
        const label = q.type === 'panel' ? '#' + (q.answer + 1) : q.type === 'who' ? (K.ch(q.answer).en || K.ch(q.answer).no) : q.answer;
        const nextBtn = h('button', { class: 'btn ' + (ok ? 'good' : 'yellow'), type: 'button', onclick: () => { S.i++; draw(); } }, S.i + 1 < S.qs.length ? ui('next') : ui('result'));
        card.append(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), role: 'status' },
          h('span', { style: { fontSize: '2rem' } }, ok ? K.pick(['🎉', '🌟', '👏']) : '🤔'),
          h('span', { class: 'msg' }, ok ? K.pick(PRAISE) : [ui('correct'), h('em', {}, String(label))]),
          h('button', { class: 'play', type: 'button', onclick: sayIt }, '🔊'), nextBtn));
        scoreEl.textContent = `⭐ ${S.score}`;
        if (!ok) setTimeout(sayIt, 400);
        nextBtn.focus({ preventScroll: true });
      };
      const choice = (options, render, isRight, cls = '') => {
        const wrap = h('div', { class: 'opts ' + cls });
        const btns = options.map(o => {
          const b = h('button', { class: 'opt', type: 'button' }, render(o));
          b.addEventListener('click', () => {
            if (wrap.classList.contains('locked')) return;
            wrap.classList.add('locked');
            const ok = isRight(o);
            btns.forEach((x, j) => { if (isRight(options[j])) x.classList.add('good'); else if (x !== b) x.classList.add('dim'); });
            if (!ok) b.classList.add('bad');
            finish(ok);
          });
          return b;
        });
        wrap.append(...btns);
        return wrap;
      };
      const bigPlay = fn => { const b = h('button', { class: 'big-play', type: 'button', 'aria-label': 'Listen', onclick: fn }, '🔊'); setTimeout(fn, 400); return b; };
      if (q.type === 'who') {
        body.append(h('div', { class: 'q-prompt' }, bigPlay(() => speak(q.line.en, q.line.who)), h('div', { class: 'say' }, '«', enWords(q.line.en), '»')),
          choice(q.options, w => [h('span', { class: 'ava', style: { background: K.ch(w).color } }, K.ch(w).emoji), h('span', {}, K.ch(w).en || K.ch(w).no)], w => w === q.answer));
      } else if (q.type === 'panel') {
        body.append(h('div', { class: 'q-prompt' }, bigPlay(() => speak(q.line.en, q.line.who)), h('div', { class: 'say' }, '«', enWords(q.line.en), '»')),
          choice(q.options, pi => h('div', { class: 'panel-frame strip-frame' }, K.svgEl(K.ART.panel(c, pi, { lang: 'en', bubbles: false, chars: K.CH, style: 'strip' }))), pi => pi === q.answer, 'pics'));
        K.$$('.opt', body).forEach(b => b.classList.add('pic'));
      } else if (q.type === 'listen') {
        body.append(h('div', { class: 'q-prompt' }, bigPlay(() => speak(q.word, 'narrator', 0.85)), h('button', { class: 'btn', type: 'button', onclick: () => speak(q.word, 'narrator', 0.6) }, '🐢')),
          choice(q.options, o => o, o => o === q.answer));
        K.$$('.opt', body).forEach(b => b.classList.add('word'));
      } else if (q.type === 'emoji') {
        body.append(h('div', { class: 'q-prompt center' }, h('div', { class: 'emoji-big' }, q.item.emoji)),
          choice(q.options, o => o, o => o === q.answer));
        K.$$('.opt', body).forEach(b => b.classList.add('word'));
      } else if (q.type === 'picture') {
        body.append(h('div', { class: 'q-prompt center' }, h('div', { class: 'pict' }, K.svgEl(K.ART.propSVG(q.pict)))),
          choice(q.options, o => o, o => o === q.answer));
        K.$$('.opt', body).forEach(b => b.classList.add('word'));
      } else if (q.type === 'blank') {
        const at = q.line.en.indexOf(q.word);
        const sentence = h('div', { class: 'say' }, enWords(q.line.en.slice(0, at)), h('span', { class: 'blank' }, '?'), enWords(q.line.en.slice(at + q.word.length)));
        body.append(h('div', { class: 'q-prompt' }, h('span', { class: 'ava', style: { background: K.ch(q.line.who).color, width: '64px', height: '64px' } }, K.ch(q.line.who).emoji), sentence),
          choice(q.options, o => o, o => o === q.answer));
        K.$$('.opt', body).forEach(b => b.classList.add('word'));
      }
      root.replaceChildren(
        h('div', { class: 'q-head' }, h('a', { class: 'btn', href: reread }, ui('exit')), h('h2', {}, `🇬🇧 ${title}`), scoreEl),
        h('div', { class: 'bar', role: 'progressbar' }, h('i', { style: { width: (S.i / S.qs.length * 100) + '%' } })),
        card);
    };
    const result = () => {
      const pct = Math.round(S.score / S.qs.length * 100);
      K.recordQuiz(key, '🇬🇧 ' + title, S.score, S.qs.length);
      if (pct >= 60) { K.confetti(); K.Sfx.win(); }
      root.replaceChildren(h('div', { class: 'q-card result' },
        h('div', { class: 'big-stars' }, K.stars(pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0)),
        h('h2', {}, ui('result')), h('p', { class: 'score' }, ui('score', S.score, S.qs.length, pct)),
        h('div', { class: 'row-center' },
          h('button', { class: 'btn accent', type: 'button', onclick: () => { S.qs = build(); S.i = 0; S.score = 0; draw(); } }, ui('again')),
          h('a', { class: 'btn', href: reread }, ui('reread')),
          h('a', { class: 'btn', href: '#/english' }, ui('home')))));
    };
    draw();
    return root;
  }

  let hideTr = false;
  function renderWords(themeId) {
    const K = C(), { h } = K;
    const t = themeId ? themes().find(x => x.id === themeId) : null;
    if (!t) {
      return h('section', { class: 'english words-page' }, K.pageHead(ex('words_title'), '#/english'),
        h('p', { class: 'lead-p' }, ex('words_intro')),
        h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/en-words' }, ex('all_words_test')), h('span', { class: 'known-chip' }, ex('known_all', knownCount())), K.stars(stars('enw:all'))),
        ...LEVELS.flatMap(l => { const list = themes().filter(x => x.level === l); return list.length ? [h('h3', { class: 'sec-sub' }, l),
          h('div', { class: 'theme-grid' }, list.map(x => K.withTr(h('a', { class: 'theme-tile strip-card', href: '#/english/words/' + x.id }, h('span', { class: 'tt-ico' }, x.icon), h('b', {}, x.en), h('small', {}, x.uk),
            h('span', { class: 'tt-meta' }, ex('known_n', knownCount(x.id), x.words.length), ' ', K.stars(stars('enw:' + x.id)))), { uk: x.uk, no: x.no })))] : []; }));
    }
    const grid = h('div', { class: 'word-grid' + (hideTr ? ' hide-tr' : '') });
    const counter = h('span', { class: 'known-chip' }, ex('known_n', knownCount(t.id), t.words.length));
    grid.append(...t.words.map(([no, uk, en, emoji]) => {
      const mark = h('button', { class: 'wc-know', type: 'button', title: ex('know'), 'aria-label': ex('know'), 'aria-pressed': String(isKnown(t.id, en)) }, '✓');
      const card = h('div', { class: 'word-card strip-word' + (isKnown(t.id, en) ? ' known' : '') },
        h('button', { class: 'wc-main', type: 'button', onclick: () => { speak(en, 'narrator', 0.9); card.classList.add('peek'); } },
          h('span', { class: 'wc-emoji' }, emoji), h('b', { class: 'wc-no' }, en), h('span', { class: 'wc-tr' }, uk)), mark);
      mark.addEventListener('click', e => { e.stopPropagation(); const on = toggleKnown(t.id, en); card.classList.toggle('known', on); mark.setAttribute('aria-pressed', String(on)); K.Sfx.tick(); counter.textContent = ex('known_n', knownCount(t.id), t.words.length); });
      return K.withTr(card, { uk, no });
    }));
    const toggle = h('button', { class: 'btn', type: 'button', onclick: () => { hideTr = !hideTr; grid.classList.toggle('hide-tr', hideTr); toggle.textContent = hideTr ? ex('show') : ex('hide'); } }, hideTr ? ex('show') : ex('hide'));
    const playAll = async () => { await K.claim(); for (const w of t.words) { await K.Speech.speak(w[2], 'narrator', { rate: 0.9, lang: 'en' }); await K.sleep(200); } };
    return h('section', { class: 'english words-page' }, K.pageHead(`${t.icon} ${t.en} — ${t.uk}`, '#/english/words'),
      h('div', { class: 'gram-chips' }, themes().map(x => h('a', { class: 'chip' + (x.id === t.id ? ' on' : ''), href: '#/english/words/' + x.id }, x.icon + ' ' + x.en))),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/en-words/' + t.id }, ex('topic_test')), toggle, h('button', { class: 'btn', type: 'button', onclick: playAll }, ex('play_all')), counter, h('span', { class: 'lvl lvl-' + t.level }, t.level), K.stars(stars('enw:' + t.id))),
      grid);
  }

  window.KomiksEnglish = { comics, byId, render: renderList, read: renderRead, quiz: renderQuiz, words: renderWords, wordsQuiz: renderWordsQuiz, wordQuestions, knownCount, text: ex, stars, lookup: lookupEn };
})();
