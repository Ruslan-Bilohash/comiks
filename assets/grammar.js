/* Комікс·Lab — граматика: сторінка з правилами, тести «Velg riktig ord» і «Hva er klokka?».
   Дані — data/grammar.js (window.GRAMMAR). Тести — лише норвезькою, пояснення — мовою інтерфейсу. */
(() => {
  'use strict';

  const GX = {
    uk: {
      nav: 'Граматика', module: ['📐', 'Граматика', 'займенники, дієслова, порядок слів'],
      title: '📐 Норвезька граматика', intro: 'Короткі правила з таблицями та прикладами — від A1 до B2. Натисни 🔊, щоб почути приклад, наведи на слово — побачиш переклад. Після кожної теми — тест норвезькою.',
      rule: '📏 Правило', forms: '📋 Форми', examples: '💬 Приклади', test: '🧩 Тест з теми', mix_test: '🧩 Тест з усієї граматики', level: l => `Рівень ${l}`,
      tests: '📐 Граматика й годинник', clock: ['🕒', 'Котра година?', 'годинник норвезькою: halv, kvart over, kvart på'], step: x => `Граматика: ${x}`,
      clock_title: '🕒 Котра година? — Hva er klokka?', clock_rule: 'Норвежці рахують півгодини до НАСТУПНОЇ години: halv ni = 8:30. Kvart over tre = 3:15, kvart på fire = 3:45. Ti på halv fem = 4:20, fem over halv fem = 4:35.',
      topics: 'Теми', q_grammar: 'Вибери правильне слово', q_clock: 'Котра година на годиннику?'
    },
    en: {
      nav: 'Grammar', module: ['📐', 'Grammar', 'pronouns, verbs, word order'],
      title: '📐 Norwegian grammar', intro: 'Short rules with tables and examples — from A1 to B2. Press 🔊 to hear an example and hover over a word to see its translation. Every topic ends with a test in Norwegian.',
      rule: '📏 Rule', forms: '📋 Forms', examples: '💬 Examples', test: '🧩 Topic test', mix_test: '🧩 Test on all grammar', level: l => `Level ${l}`,
      tests: '📐 Grammar and the clock', clock: ['🕒', 'What time is it?', 'telling the time in Norwegian: halv, kvart over, kvart på'], step: x => `Grammar: ${x}`,
      clock_title: '🕒 What time is it? — Hva er klokka?', clock_rule: 'Norwegians count the half hour towards the NEXT hour: halv ni = 8:30. Kvart over tre = 3:15, kvart på fire = 3:45. Ti på halv fem = 4:20, fem over halv fem = 4:35.',
      topics: 'Topics', q_grammar: 'Choose the right word', q_clock: 'What time does the clock show?'
    },
    no: {
      nav: 'Grammatikk', module: ['📐', 'Grammatikk', 'pronomen, verb, ordstilling'],
      title: '📐 Norsk grammatikk', intro: 'Korte regler med tabeller og eksempler — fra A1 til B2. Trykk på 🔊 for å høre et eksempel. Hvert tema har en test på norsk.',
      rule: '📏 Regel', forms: '📋 Former', examples: '💬 Eksempler', test: '🧩 Test i temaet', mix_test: '🧩 Test i all grammatikk', level: l => `Nivå ${l}`,
      tests: '📐 Grammatikk og klokka', clock: ['🕒', 'Hva er klokka?', 'klokka på norsk: halv, kvart over, kvart på'], step: x => `Grammatikk: ${x}`,
      clock_title: '🕒 Hva er klokka?', clock_rule: 'Vi sier halv om halvtimen før NESTE time: halv ni = 8:30. Kvart over tre = 3:15, kvart på fire = 3:45. Ti på halv fem = 4:20, fem over halv fem = 4:35.',
      topics: 'Temaer', q_grammar: 'Velg riktig ord', q_clock: 'Hva er klokka?'
    }
  };
  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { grammar: GX[l].nav });
    I.modules = Object.assign({}, I.modules, { grammar: GX[l].module, clock: GX[l].clock });
    if (l !== 'no') I.qtr = Object.assign({}, I.qtr, { grammar: GX[l].q_grammar, clock: GX[l].q_clock });
  }

  const C = () => window.KomiksCore;
  GX.ar = {
    nav: 'القواعد', module: ['📐', 'القواعد', 'الضمائر والأفعال وترتيب الكلمات'],
    title: '📐 قواعد اللغة النرويجية', intro: 'قواعد قصيرة مع جداول وأمثلة — من A1 إلى B2. اضغط 🔊 لتسمع مثالًا ومرّر فوق كلمة لترى ترجمتها. كل موضوع ينتهي باختبار بالنرويجية.',
    rule: '📏 القاعدة', forms: '📋 الصيغ', examples: '💬 أمثلة', test: '🧩 اختبار الموضوع', mix_test: '🧩 اختبار كل القواعد', level: l => `المستوى ${l}`,
    tests: '📐 القواعد والساعة', clock: ['🕒', 'كم الساعة؟', 'قول الوقت بالنرويجية: halv وkvart over وkvart på'], step: x => `القواعد: ${x}`,
    clock_title: '🕒 كم الساعة؟ — Hva er klokka?', clock_rule: 'يحسب النرويجيون نصف الساعة نحو الساعة التالية: halv ni = 8:30. Kvart over tre = 3:15، kvart på fire = 3:45. Ti på halv fem = 4:20، fem over halv fem = 4:35.',
    topics: 'المواضيع', q_grammar: 'اختر الكلمة الصحيحة', q_clock: 'كم الساعة على هذه الساعة؟'
  };
  const gx = (k, ...a) => { const tbl = GX[C().ui] || GX.en || GX.uk; const v = k in tbl ? tbl[k] : (GX.en || GX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const topics = () => (window.GRAMMAR || { topics: [] }).topics;
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const label = id => { const tp = topics().find(x => x.id === id); if (!tp) return id; const ui = C().ui; return ui === 'no' ? tp.no : `${tp.no} — ${tp[ui] || tp.en || tp.uk}`; };
  const stars = key => (((C().store.get('progress', {}))[key]) || {}).stars || 0;

  /* ---------------- завдання ---------------- */
  function makeQ(tp, [sent, answer, wrong], nOpt) {
    const K = C();
    const at = sent.indexOf('_');
    const sentence = sent.replace('_', answer).replace(/\s*\([^)]*\)\s*$/, '');
    return { type: 'grammar', topic: tp.id, sentence, before: sent.slice(0, at), after: sent.slice(at + 1), answer, options: K.shuffle([answer, ...K.sample(wrong, nOpt - 1)]) };
  }
  // filter: null — усі теми; 'level:A2' — теми до цього рівня включно; інакше — id теми
  function questions(filter, n) {
    const K = C();
    const nOpt = K.settings.level === 'kids' ? 3 : 4;
    let list = topics();
    if (filter && filter.startsWith('level:')) { const max = LEVELS.indexOf(filter.slice(6)); list = list.filter(tp => LEVELS.indexOf(tp.level) <= max); }
    else if (filter) list = list.filter(tp => tp.id === filter);
    const all = list.flatMap(tp => tp.items.map(it => [tp, it]));
    return K.shuffle(all).slice(0, n).map(([tp, it]) => makeQ(tp, it, nOpt));
  }
  const quizSize = () => (C().settings.level === 'kids' ? 10 : 14);
  const quiz = topic => questions(topic || null, quizSize());

  /* ---------------- годинник ---------------- */
  const HOURS = ['tolv', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve'];
  function clockText(hh, mm) {
    const H = n => HOURS[((n % 12) + 12) % 12], cur = H(hh), nxt = H(hh + 1);
    return ({ 0: 'klokka ' + cur, 5: 'fem over ' + cur, 10: 'ti over ' + cur, 15: 'kvart over ' + cur, 20: 'ti på halv ' + nxt, 25: 'fem på halv ' + nxt,
      30: 'halv ' + nxt, 35: 'fem over halv ' + nxt, 40: 'ti over halv ' + nxt, 45: 'kvart på ' + nxt, 50: 'ti på ' + nxt, 55: 'fem på ' + nxt })[mm];
  }
  function clock(n, easy) {
    const K = C();
    const mins = easy ? [0, 15, 30, 45] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const nOpt = K.settings.level === 'kids' ? 3 : 4;
    const seen = new Set();
    const out = [];
    for (let guard = 0; out.length < n && guard < n * 10; guard++) {
      const hh = 1 + Math.floor(Math.random() * 12), mm = K.pick(mins), answer = clockText(hh, mm);
      if (seen.has(answer)) continue; seen.add(answer);
      const pool = K.uniq([...mins.map(m => clockText(hh, m)), clockText(hh + 1, mm), clockText(hh - 1, mm), clockText(hh + 1, (mm + 30) % 60)]).filter(x => x !== answer);
      out.push({ type: 'clock', hh, mm, time: hh + ':' + String(mm).padStart(2, '0'), answer, sentence: 'Klokka er ' + answer.replace(/^klokka /, ''), options: K.shuffle([answer, ...K.sample(pool, nOpt - 1)]) });
    }
    return out;
  }
  const clockSVG = time => `<svg viewBox="-40 -76 80 80" xmlns="http://www.w3.org/2000/svg">${C().ART.propRaw('clock', { time })}</svg>`;

  /* ---------------- сторінка ---------------- */
  function render(focus) {
    const K = C(), { h } = K;
    const ui = K.ui;
    const say = (text, rate = 0.9) => () => K.claim().then(() => K.Speech.speak(text, 'narrator', { rate }));
    const ar = en => (K.arFor ? K.arFor(en) : null) || en; // арабська — з data/arabic.js за англійським текстом
    const trCol = row => (ui === 'en' ? row[2] : ui === 'ar' ? ar(row[2]) : row[1]);
    const topicEl = tp => h('article', { class: 'gram-topic box', id: 'g-' + tp.id },
      h('header', { class: 'gram-head' }, h('span', { class: 'gram-ico' }, tp.icon), h('div', {}, K.withTr(h('h3', {}, tp.no), K.both(tp.uk, tp.en)), ui !== 'no' ? h('small', {}, tp[ui] || tp.en || tp.uk) : null),
        h('span', { class: 'lvl lvl-' + tp.level }, tp.level), K.stars(stars('grammar:' + tp.id))),
      h('h4', {}, gx('rule')), h('p', { class: 'gram-rule' }, tp.rule[ui] || (ui === 'ar' ? ar(tp.rule.en) : null) || tp.rule.en || tp.rule.uk),
      h('h4', {}, gx('forms')),
      h('div', { class: 'table-wrap' }, h('table', { class: 'gram-table' }, h('tbody', {}, tp.table.map(row => h('tr', {},
        h('td', {}, h('button', { class: 'play', type: 'button', 'aria-label': 'Lytt', onclick: say(row[0].replace(/→/g, ',').replace(/\+ inf\./, '')) }, '🔊')),
        K.withTr(h('td', { class: 'no-cell' }, row[0]), K.both(row[1], row[2])), h('td', { class: 'tr-cell' }, trCol(row))))))),
      h('h4', {}, gx('examples')),
      h('ul', { class: 'gram-ex' }, tp.examples.map(ex => h('li', {}, h('button', { class: 'play', type: 'button', 'aria-label': 'Lytt', onclick: say(ex[0]) }, '🔊'),
        K.withTr(h('span', { class: 'ex-no' }, K.wordSpans(null, ex[0])), K.both(ex[1], ex[2]))))),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/grammar/' + tp.id }, gx('test'))));
    const chips = h('div', { class: 'gram-chips' }, topics().map(tp => h('a', { class: 'chip lvl-' + tp.level, href: '#/grammar/' + tp.id }, tp.icon + ' ' + (ui === 'no' ? tp.no : tp[ui] || tp.en || tp.uk))));
    const clockBox = h('article', { class: 'gram-topic box', id: 'g-clock' },
      h('header', { class: 'gram-head' }, h('span', { class: 'gram-ico' }, '🕒'), h('div', {}, h('h3', {}, gx('clock_title'))), h('span', { class: 'lvl lvl-A1' }, 'A1'), K.stars(stars('clock'))),
      h('p', { class: 'gram-rule' }, gx('clock_rule')),
      h('div', { class: 'clock-row' }, [['8:30', 'halv ni'], ['3:15', 'kvart over tre'], ['3:45', 'kvart på fire'], ['4:20', 'ti på halv fem'], ['4:35', 'fem over halv fem']].map(([tm, txt]) =>
        h('button', { class: 'clock-card', type: 'button', onclick: say('Klokka er ' + txt) }, h('span', { class: 'clock-svg' }, K.svgEl(clockSVG(tm))), h('b', {}, tm), h('span', {}, txt)))),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/clock' }, gx('test'))));
    const root = h('section', { class: 'grammar' }, K.pageHead(gx('title')),
      h('p', { class: 'lead-p' }, gx('intro')),
      h('div', { class: 'row-left' }, h('a', { class: 'btn accent', href: '#/quiz/grammar' }, gx('mix_test')), K.stars(stars('grammar'))),
      h('h3', { class: 'sec-sub' }, gx('topics')), chips,
      ...LEVELS.flatMap(l => { const list = topics().filter(tp => tp.level === l); return list.length ? [h('h3', { class: 'sec-sub' }, gx('level', l)), ...list.map(topicEl), l === 'A1' ? clockBox : null] : []; }));
    if (focus) setTimeout(() => { const el = document.getElementById('g-' + focus); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    return root;
  }

  window.KomiksGrammar = { topics, label, questions, quiz, clock, clockText, clockSVG, render, text: gx, stars };
})();
