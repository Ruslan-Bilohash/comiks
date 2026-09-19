/* Комікс·Lab — «Математика»: таблиця множення з картинками, тренажер (+ − × ÷) і гра «Math Rocket»
   у новому «космічному» стилі. Кожен приклад читається норвезькою: «tre ganger fire er tolv». */
(() => {
  'use strict';
  const MX = {
    uk: {
      nav: 'Математика', module: ['🧮', 'Математика', 'таблиця множення, тренажер і гра'],
      title: '🧮 Математика норвезькою', intro: 'Рахуй і вчи числа одночасно: кожен приклад звучить норвезькою («tre ganger fire er tolv»). Таблиця множення з картинками, тренажер і космічна гра на швидкість.',
      table: '✖️ Таблиця множення', table_hint: 'Натисни на клітинку — побачиш картинку, почуєш приклад норвезькою.', row: n => `Ряд ×${n}`, drill: '🧩 Тренувати цей ряд',
      trainer: '➕ Тренажер', op: 'Дія', range: 'Числа', r10: 'до 10', r20: 'до 20', r100: 'до 100', start: '▶️ Почати', rocket: '🚀 Math Rocket',
      rocket_intro: 'Космічна гра на 60 секунд: розв’язуй приклади й збивай астероїди з правильною відповіддю. Помилка — мінус 3 секунди.',
      easy: '🟢 Легко (+ −)', medium: '🟡 Середньо (×)', hard: '🔴 Складно (усе)', best: n => `🏆 Рекорд: ${n}`, score: n => `Очки: ${n}`, time: s => `⏱️ ${s}`, combo: n => `🔥 ×${n}`,
      over: '🚀 Політ завершено!', again: '🔄 Ще раз', new_best: '🎉 Новий рекорд!', words: '🗣️ Математика норвезькою', result: (a, b) => `${a} з ${b} правильних`,
      words_list: [['pluss', '+'], ['minus', '−'], ['ganger', '×'], ['delt på', '÷'], ['er', '='], ['lik', '= (дорівнює)']],
      tests: '🧮 Математика', test_mul: 'Таблиця множення', test_add: 'Додавання й віднімання', back: '← Назад'
    },
    en: {
      nav: 'Maths', module: ['🧮', 'Maths', 'times tables, trainer and a game'],
      title: '🧮 Maths in Norwegian', intro: 'Count and learn numbers at the same time: every sum is read aloud in Norwegian (“tre ganger fire er tolv”). Times tables with pictures, a trainer and a space speed game.',
      table: '✖️ Times tables', table_hint: 'Tap a cell to see a picture and hear the sum in Norwegian.', row: n => `Row ×${n}`, drill: '🧩 Practise this row',
      trainer: '➕ Trainer', op: 'Operation', range: 'Numbers', r10: 'up to 10', r20: 'up to 20', r100: 'up to 100', start: '▶️ Start', rocket: '🚀 Math Rocket',
      rocket_intro: 'A 60-second space game: solve sums and shoot the asteroid with the right answer. A mistake costs 3 seconds.',
      easy: '🟢 Easy (+ −)', medium: '🟡 Medium (×)', hard: '🔴 Hard (all)', best: n => `🏆 Best: ${n}`, score: n => `Score: ${n}`, time: s => `⏱️ ${s}`, combo: n => `🔥 ×${n}`,
      over: '🚀 Flight over!', again: '🔄 Play again', new_best: '🎉 New record!', words: '🗣️ Maths words in Norwegian', result: (a, b) => `${a} of ${b} correct`,
      words_list: [['pluss', '+'], ['minus', '−'], ['ganger', '×'], ['delt på', '÷'], ['er', '='], ['lik', '= (equals)']],
      tests: '🧮 Maths', test_mul: 'Times tables', test_add: 'Addition and subtraction', back: '← Back'
    },
    no: {
      nav: 'Matte', module: ['🧮', 'Matte', 'gangetabellen, trening og spill'],
      title: '🧮 Matte på norsk', intro: 'Regn og lær tallene samtidig: hvert regnestykke leses høyt på norsk. Gangetabellen med bilder, trening og et romspill på tid.',
      table: '✖️ Gangetabellen', table_hint: 'Trykk på en rute for å se et bilde og høre regnestykket.', row: n => `Rad ×${n}`, drill: '🧩 Øv på denne raden',
      trainer: '➕ Trening', op: 'Regneart', range: 'Tall', r10: 'til 10', r20: 'til 20', r100: 'til 100', start: '▶️ Start', rocket: '🚀 Matte-raketten',
      rocket_intro: 'Et romspill på 60 sekunder: løs regnestykkene og skyt asteroiden med riktig svar. Feil svar koster 3 sekunder.',
      easy: '🟢 Lett (+ −)', medium: '🟡 Middels (×)', hard: '🔴 Vanskelig (alt)', best: n => `🏆 Rekord: ${n}`, score: n => `Poeng: ${n}`, time: s => `⏱️ ${s}`, combo: n => `🔥 ×${n}`,
      over: '🚀 Ferden er over!', again: '🔄 Spill igjen', new_best: '🎉 Ny rekord!', words: '🗣️ Matteord på norsk', result: (a, b) => `${a} av ${b} riktige`,
      words_list: [['pluss', '+'], ['minus', '−'], ['ganger', '×'], ['delt på', '÷'], ['er', '='], ['lik', '=']],
      tests: '🧮 Matte', test_mul: 'Gangetabellen', test_add: 'Pluss og minus', back: '← Tilbake'
    }
  };
  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { math: MX[l].nav });
    I.modules = Object.assign({}, I.modules, { math: MX[l].module });
    if (l !== 'no') I.qtr = Object.assign({}, I.qtr, { math: l === 'uk' ? 'Скільки буде? Вибери відповідь' : 'What is the answer?' });
  }
  const C = () => window.KomiksCore;
  MX.ar = {
    nav: 'الرياضيات', module: ['🧮', 'الرياضيات', 'جدول الضرب ومدرّب ولعبة'],
    title: '🧮 الرياضيات بالنرويجية', intro: 'احسب وتعلّم الأرقام في آنٍ واحد: كل مسألة تُقرأ بالنرويجية («tre ganger fire er tolv»). جدول الضرب بالصور ومدرّب ولعبة سرعة فضائية.',
    table: '✖️ جدول الضرب', table_hint: 'اضغط على خانة لترى صورة وتسمع المسألة بالنرويجية.', row: n => `الصف ×${n}`, drill: '🧩 تدرّب على هذا الصف',
    trainer: '➕ المدرّب', op: 'العملية', range: 'الأرقام', r10: 'حتى 10', r20: 'حتى 20', r100: 'حتى 100', start: '▶️ ابدأ', rocket: '🚀 Math Rocket',
    rocket_intro: 'لعبة فضائية: حلّ المسائل وأسقط الكويكب ذا الإجابة الصحيحة. الخطأ يكلّفك 3 ثوانٍ.',
    easy: '🟢 سهل (+ −)', medium: '🟡 متوسط (×)', hard: '🔴 صعب (الكل)', best: n => `🏆 الأفضل: ${n}`, score: n => `النقاط: ${n}`, time: s => `⏱️ ${s}`, combo: n => `🔥 ×${n}`,
    over: '🚀 انتهت الرحلة!', again: '🔄 العب مجددًا', new_best: '🎉 رقم قياسي جديد!', words: '🗣️ كلمات الرياضيات بالنرويجية', result: (a, b) => `${a} من ${b} صحيحة`,
    words_list: [['pluss', '+'], ['minus', '−'], ['ganger', '×'], ['delt på', '÷'], ['er', '='], ['lik', '= (يساوي)']],
    tests: '🧮 الرياضيات', test_mul: 'جدول الضرب', test_add: 'الجمع والطرح', back: '→ رجوع'
  };
  const mx = (k, ...a) => { const tbl = MX[C().ui] || MX.en || MX.uk; const v = k in tbl ? tbl[k] : (MX.en || MX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const NW = n => C().B.numberWord(n);
  const OPS = { '+': 'pluss', '−': 'minus', '×': 'ganger', '÷': 'delt på' };
  // норвезькою: «tre ganger fire er tolv»
  const phrase = (a, op, b, c) => `${NW(a)} ${OPS[op]} ${NW(b)} er ${NW(c)}`;
  // питання без відповіді: «tre ganger fire» — звучить, поки гравці думають
  const ask = (a, op, b) => `${NW(a)} ${OPS[op]} ${NW(b)}`;
  const say = text => C().claim().then(() => C().Speech.speak(text, 'narrator', { rate: 0.9 }));
  const stars = key => (((C().store.get('progress', {}))[key]) || {}).stars || 0;
  const ITEMS = ['🍎', '⭐', '🐟', '🍓', '🎈', '🌼', '🍪', '🚗', '🐞', '⚽'];

  /* згенерована картинка до прикладу: a рядів по b предметів (множення) або дві групи (додавання) */
  function pictureSVG(a, op, b) {
    const icon = ITEMS[(a * 7 + b * 3) % ITEMS.length];
    const cell = 30;
    if (op === '×' || op === '÷') {
      const rows = op === '×' ? a : b, cols = op === '×' ? b : (a / b);
      const w = cols * cell + 20, hgt = rows * cell + 20;
      let s = `<rect x="2" y="2" width="${w - 4}" height="${hgt - 4}" rx="12" fill="#fffbe8" stroke="#141414" stroke-width="3"/>`;
      for (let r = 0; r < rows; r++) {
        s += `<rect x="8" y="${10 + r * cell}" width="${w - 16}" height="${cell - 4}" rx="8" fill="${r % 2 ? '#e3f2fd' : '#fff3c4'}"/>`;
        for (let c = 0; c < cols; c++) s += `<text x="${10 + c * cell + cell / 2}" y="${10 + r * cell + cell / 2 + 7}" text-anchor="middle" font-size="20">${icon}</text>`;
      }
      return `<svg viewBox="0 0 ${w} ${hgt}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a} ${op} ${b}">${s}</svg>`;
    }
    const left = a, right = b;
    const per = 5, rowsL = Math.ceil(left / per) || 1, rowsR = Math.ceil(right / per) || 1;
    const gw = per * 24 + 16, h = Math.max(rowsL, rowsR) * 26 + 24, w = gw * 2 + 50;
    const group = (n, x0, cross) => { let s = `<rect x="${x0}" y="4" width="${gw}" height="${h - 8}" rx="12" fill="#fffbe8" stroke="#141414" stroke-width="3"/>`; for (let i = 0; i < n; i++) { const x = x0 + 10 + (i % per) * 24 + 10, y = 12 + Math.floor(i / per) * 26 + 18; s += `<text x="${x}" y="${y}" text-anchor="middle" font-size="18" opacity="${cross ? 0.35 : 1}">${icon}</text>`; if (cross) s += `<path d="M${x - 9},${y - 14} L${x + 9},${y + 2}" stroke="#e53935" stroke-width="3"/>`; } return s; };
    const sign = `<text x="${gw + 25}" y="${h / 2 + 10}" text-anchor="middle" font-size="30" font-weight="900" fill="#141414">${op}</text>`;
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a} ${op} ${b}">${group(left, 2, false)}${sign}${group(right, gw + 48, op === '−')}</svg>`;
  }

  /* генератор прикладів */
  function makeTask(op, max) {
    const K = C();
    const R = n => Math.floor(Math.random() * (n + 1));
    let a, b, c;
    if (op === '+') { a = R(max); b = R(max - a); c = a + b; }
    else if (op === '−') { a = R(max); b = R(a); c = a - b; }
    else if (op === '×') { a = 1 + R(9); b = 1 + R(9); c = a * b; }
    else { b = 1 + R(9); c = 1 + R(9); a = b * c; }
    const near = new Set([c]);
    for (let guard = 0; near.size < 4 && guard < 50; guard++) {
      const d = op === '×' || op === '÷' ? K.pick([-10, -b, -a, -2, -1, 1, 2, a, b, 10].filter(x => x)) : K.pick([-3, -2, -1, 1, 2, 3, 10, -10]);
      const v = c + d; if (v >= 0) near.add(v);
    }
    return { a, op, b, answer: c, options: K.shuffle([...near]), text: `${a} ${op} ${b}`, say: phrase(a, op, b, c), ask: ask(a, op, b) };
  }
  const opsFor = mode => ({ add: ['+', '−'], mul: ['×'], div: ['÷'], all: ['+', '−', '×', '÷'], '+': ['+'], '−': ['−'], '×': ['×'], '÷': ['÷'] })[mode] || ['+'];
  // питання для тестів і гри «Грати разом»: type 'math'
  function questions(mode, n, max = 20) {
    const K = C();
    return K.range(n).map(() => { const t = makeTask(K.pick(opsFor(mode)), max); return { type: 'math', a: t.a, op: t.op, b: t.b, expr: t.text, sayText: t.say, askText: t.ask, answer: t.answer, options: t.options }; });
  }

  /* промо-блок гри: анімований космос, ракета, рекорди й дві кнопки */
  function rocketPromo() {
    const K = C(), { h } = K;
    const RK = window.KomiksRocket, rt = k => (RK ? RK.text(k) : k);
    const best = RK ? Math.max(...['tiny', 'easy', 'medium', 'hard', 'expert'].map(RK.bestOf), K.store.get('mathBest', 0)) : K.store.get('mathBest', 0);
    const ship = `<svg viewBox="-40 -60 80 120" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rpB" x1="0" x2="1"><stop offset="0" stop-color="#8391a6"/><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#6f7c90"/></linearGradient><linearGradient id="rpF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#ffc446"/><stop offset="1" stop-color="#ff3c00" stop-opacity="0"/></linearGradient></defs>`
      + `<path class="rp-flame" d="M-8,18 Q0,62 8,18Z" fill="url(#rpF)"/><path d="M-10,4 L-22,22 L-9,19Z M10,4 L22,22 L9,19Z" fill="#d62839"/>`
      + `<path d="M0,-34 C13,-20 13,8 10,20 L-10,20 C-13,8 -13,-20 0,-34Z" fill="url(#rpB)"/><path d="M0,-34 C6,-28 8.5,-23 9,-19 L-9,-19 C-8.5,-23 -6,-28 0,-34Z" fill="#d62839"/>`
      + `<circle cy="-5" r="6.4" fill="#0b2545"/><circle cy="-5" r="4.6" fill="#48cae4"/></svg>`;
    return h('div', { class: 'mr-promo' },
      h('div', { class: 'mr-promo-stars', 'aria-hidden': 'true' }),
      h('div', { class: 'mr-promo-art', 'aria-hidden': 'true' }, h('span', { class: 'rp-rock r1' }), h('span', { class: 'rp-rock r2' }), h('span', { class: 'rp-rock r3' }), h('span', { class: 'rp-ship' }, K.svgEl(ship))),
      h('div', { class: 'mr-promo-text' },
        h('span', { class: 'mr-badge' }, rt('badge')),
        h('h3', {}, '🚀 ' + rt('title')),
        h('p', {}, rt('subtitle')),
        h('div', { class: 'mr-promo-stats' }, h('span', {}, '🏆 ' + (RK ? RK.text('best', best) : best)), h('span', {}, '⏱️ 60 s'), h('span', {}, '🎯 + − × ÷')),
        h('div', { class: 'mr-promo-actions' },
          h('a', { class: 'mr-btn primary', href: '#/math/rocket' }, rt('play')),
          h('a', { class: 'mr-btn', href: '#/math/race' }, rt('with_class')))));
  }

  /* ---------------- сторінка ---------------- */
  function render(section) {
    const K = C(), { h } = K;
    const detail = h('div', { class: 'mul-detail' });
    const showCell = (a, b) => {
      K.$$('.mul-grid .on', grid).forEach(x => x.classList.remove('on', 'hl'));
      K.$$('.mul-grid [data-a="' + a + '"], .mul-grid [data-b="' + b + '"]', grid).forEach(x => x.classList.add('hl'));
      const cell = grid.querySelector(`[data-a="${a}"][data-b="${b}"]`); if (cell) cell.classList.add('on');
      const text = phrase(a, '×', b, a * b);
      detail.replaceChildren(
        h('div', { class: 'mul-eq' }, `${a} × ${b} = `, h('b', {}, a * b)),
        h('button', { class: 'btn primary', type: 'button', onclick: () => say(text) }, '🔊 ' + text),
        h('div', { class: 'mul-pic' }, K.svgEl(pictureSVG(a, '×', b))),
        h('a', { class: 'btn accent', href: '#/math/drill/' + a }, mx('drill') + ' ×' + a));
      say(text);
    };
    const grid = h('div', { class: 'mul-grid', role: 'grid' });
    grid.append(h('span', { class: 'mul-h corner' }, '×'));
    for (let b = 1; b <= 10; b++) grid.append(h('span', { class: 'mul-h', 'data-b': b }, b));
    for (let a = 1; a <= 10; a++) {
      grid.append(h('span', { class: 'mul-h', 'data-a': a }, a));
      for (let b = 1; b <= 10; b++) grid.append(h('button', { class: 'mul-c', type: 'button', 'data-a': a, 'data-b': b, title: `${a} × ${b}`, onclick: () => showCell(a, b) }, a * b));
    }
    detail.append(h('p', { class: 'hint' }, mx('table_hint')));

    // тренажер
    const opSel = h('select', {}, [['add', '+ −'], ['+', '+'], ['−', '−'], ['mul', '×'], ['div', '÷'], ['all', '+ − × ÷']].map(([v, l]) => h('option', { value: v }, l)));
    const rangeSel = h('select', {}, [[10, mx('r10')], [20, mx('r20')], [100, mx('r100')]].map(([v, l]) => h('option', { value: v, selected: v === 20 }, l)));
    const trainerBox = h('div', { class: 'box math-trainer' }, h('h3', {}, mx('trainer')),
      h('div', { class: 'two-fields' }, h('label', { class: 'field' }, h('span', {}, mx('op')), opSel), h('label', { class: 'field' }, h('span', {}, mx('range')), rangeSel)),
      h('button', { class: 'btn accent big', type: 'button', onclick: () => { location.hash = `#/quiz/math/${encodeURIComponent(opSel.value)}/${rangeSel.value}`; } }, mx('start')));

    const root = h('section', { class: 'math-page' }, K.pageHead(mx('title')),
      h('p', { class: 'lead-p' }, mx('intro')),
      rocketPromo(),
      h('h3', { class: 'sec-sub' }, mx('table')),
      h('div', { class: 'mul-wrap' }, grid, detail),
      trainerBox,
      h('div', { class: 'box' }, h('h3', {}, mx('words')), h('div', { class: 'ph-grid' }, mx('words_list').map(([w, s]) => h('button', { class: 'ph-chip', type: 'button', onclick: () => say(w) }, h('b', {}, s), h('small', {}, w))))));
    if (section === 'table') setTimeout(() => grid.scrollIntoView({ behavior: 'smooth' }), 60);
    return root;
  }

  /* ---------------- тест (10 прикладів) ---------------- */
  function quiz(mode, max) {
    const K = C(), { h } = K;
    const m = decodeURIComponent(mode || 'mul'), mxv = parseInt(max, 10) || 20;
    const drillRow = m.startsWith('row') ? parseInt(m.slice(3), 10) : 0;
    const build = () => drillRow
      ? K.shuffle(K.range(10).map(i => { const b = i + 1, c = drillRow * b; const t = { a: drillRow, op: '×', b, answer: c }; const near = new Set([c]); while (near.size < 4) { const v = c + K.pick([-drillRow, drillRow, -1, 1, 2, -2, 10]); if (v > 0) near.add(v); } return { type: 'math', ...t, expr: `${drillRow} × ${b}`, sayText: phrase(drillRow, '×', b, c), askText: ask(drillRow, '×', b), options: K.shuffle([...near]) }; }))
      : questions(m, 10, mxv);
    const key = drillRow ? 'math:row' + drillRow : 'math:' + m;
    const S = { qs: build(), i: 0, score: 0 };
    const root = h('section', { class: 'quiz math-quiz' });
    const draw = () => {
      if (S.i >= S.qs.length) return result();
      const q = S.qs[S.i];
      const card = h('div', { class: 'q-card' }, window.KomiksIcons ? window.KomiksIcons.chip('math', 'Matte') : h('span', { class: 'q-type' }, '🧮 Matte'), K.withTr(h('h3', { class: 'q-title' }, 'Hvor mye blir det?'), K.both('Скільки буде?', 'What is the answer?')));
      const opts = h('div', { class: 'opts two math-opts' });
      // спочатку звучить питання («tre ganger fire»); після вибору — «Veldig bra! tolv» або «Ikke bra. Prøv igjen!»
      const askNow = () => say(q.askText || q.sayText);
      setTimeout(askNow, 350);
      let tries = 0;
      q.options.forEach(o => {
        const b = h('button', { class: 'opt', type: 'button' }, h('span', { class: 'big-letter' }, String(o)));
        b.addEventListener('click', () => {
          if (opts.classList.contains('locked') || b.disabled) return;
          const ok = o === q.answer;
          if (!ok && tries === 0) { tries++; b.classList.add('bad'); b.disabled = true; K.Sfx.bad(); K.cheer(false); return; }
          opts.classList.add('locked');
          K.$$('.opt', opts).forEach((x, j) => { if (q.options[j] === q.answer) x.classList.add('good'); else if (x !== b && !x.disabled) x.classList.add('dim'); });
          if (!ok) b.classList.add('bad');
          if (ok && tries === 0) S.score++;
          if (ok) { K.Sfx.good(); K.cheer(true, NW(q.answer)); } else { K.Sfx.bad(); say(q.sayText); }
          card.append(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no') }, h('span', { style: { fontSize: '2rem' } }, ok ? '🎉' : '🤔'), h('span', { class: 'msg' }, `${q.expr} = ${q.answer}`, h('br'), h('em', {}, q.sayText)),
            h('button', { class: 'btn ' + (ok ? 'good' : 'yellow'), type: 'button', onclick: () => { S.i++; draw(); } }, S.i + 1 < S.qs.length ? 'Neste ▶' : 'Resultat 🏁')));
        });
        opts.append(b);
      });
      card.append(h('div', { class: 'q-prompt center math-prompt' }, h('button', { class: 'big-play', type: 'button', 'aria-label': 'Lytt', onclick: askNow }, '🔊'), h('div', { class: 'math-expr' }, `${q.expr} = ?`), h('div', { class: 'mul-pic' }, K.svgEl(pictureSVG(q.a, q.op, q.b)))), opts);
      root.replaceChildren(h('div', { class: 'q-head' }, h('a', { class: 'btn', href: '#/math' }, mx('back')), h('h2', {}, '🧮 ' + (drillRow ? mx('row', drillRow) : ({ mul: '✖️ ×', add: '➕ + −', div: '➗ ÷', all: '+ − × ÷' }[m] || m))), h('span', { class: 'stat' }, `⭐ ${S.score}`)),
        h('div', { class: 'bar' }, h('i', { style: { width: (S.i / S.qs.length * 100) + '%' } })), card);
    };
    const result = () => {
      const pct = Math.round(S.score / S.qs.length * 100);
      K.recordQuiz(key, '🧮 ' + (drillRow ? mx('row', drillRow) : m), S.score, S.qs.length);
      if (pct >= 60) { K.confetti(); K.Sfx.win(); }
      root.replaceChildren(h('div', { class: 'q-card result' }, h('div', { class: 'big-stars' }, K.stars(pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0)),
        h('h2', {}, mx('result', S.score, S.qs.length)),
        h('div', { class: 'row-center' }, h('button', { class: 'btn accent', type: 'button', onclick: () => { S.qs = build(); S.i = 0; S.score = 0; draw(); } }, mx('again')), h('a', { class: 'btn', href: '#/math' }, mx('back')))));
    };
    draw();
    return root;
  }

  function route(id, arg) {
    const RK = window.KomiksRocket;
    if (id === 'rocket' && RK) return RK.solo();
    if (id === 'race' && RK) return RK.host();
    if (id === 'join' && RK) return RK.join(arg);
    if (id === 'drill') { location.replace('#/quiz/math/row' + (parseInt(arg, 10) || 2) + '/10'); return render(); }
    return render(id);
  }

  window.KomiksMath = { render: route, quiz, questions, pictureSVG, phrase, ask, text: mx, stars };
})();
