/* Комікс·Lab — 🏁 пробний Norskprøven (#/exam).
   Три частини, як на справжньому іспиті: слухання, читання й письмо.
   Питання збираються з коміксів обраного рівня, письмо перевіряє сторінка «Письмо».
   Результат кожної частини зберігається як звичайний тест, тож його видно і в журналі,
   і в «Моєму аналізі». Наприкінці показуємо орієнтовний рівень — це тренування, не офіційна оцінка. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const C = () => window.KomiksCore;

  const T = {
    uk: { title: '🏁 Пробний Norskprøven', nav: '🏁 Пробний іспит',
      lead: 'Тренування у форматі норвезького іспиту: слухання, читання й письмо. Роби частини підряд — і побачиш свій орієнтовний рівень.',
      disclaimer: '⚠️ Це тренування, а не офіційний іспит. Результат орієнтовний і потрібен, щоб зрозуміти, де ти зараз.',
      level: 'Рівень', start: 'Почати', again: 'Пройти ще раз', open: 'Відкрити', done: 'Готово',
      p1: '🎧 Частина 1 — слухання', p1d: '10 реплік на слух, тексту не видно.',
      p2: '📖 Частина 2 — читання', p2d: '10 питань на розуміння прочитаного.',
      p3: '✍️ Частина 3 — письмо', p3d: 'Один короткий текст із перевіркою.',
      res: '🏁 Твій результат', of: '%', total: 'Разом', lvl: l => `Орієнтовний рівень: ${l}`,
      lvl_d: 'Порада: якщо частина дала менше ніж 60 %, повернись до коміксів свого рівня й повтори слова.',
      notyet: 'Частина ще не пройдена', time: m => `Час: ${m} хв` },
    en: { title: '🏁 Norskprøven mock test', nav: '🏁 Mock exam',
      lead: 'Practice in the format of the Norwegian exam: listening, reading and writing. Do the parts one after another and see your approximate level.',
      disclaimer: '⚠️ This is practice, not the official exam. The result is a rough guide to where you are now.',
      level: 'Level', start: 'Start', again: 'Take it again', open: 'Open', done: 'Done',
      p1: '🎧 Part 1 — listening', p1d: '10 spoken lines, the text stays hidden.',
      p2: '📖 Part 2 — reading', p2d: '10 reading comprehension questions.',
      p3: '✍️ Part 3 — writing', p3d: 'One short text with feedback.',
      res: '🏁 Your result', of: '%', total: 'Total', lvl: l => `Approximate level: ${l}`,
      lvl_d: 'Tip: if a part scored under 60 %, go back to the comics at your level and revise the words.',
      notyet: 'Not done yet', time: m => `Time: ${m} min` },
    no: { title: '🏁 Prøve-norskprøve', nav: '🏁 Prøveeksamen',
      lead: 'Øving i samme format som norskprøven: lytting, lesing og skriving. Ta delene etter hverandre, så ser du omtrent hvilket nivå du er på.',
      disclaimer: '⚠️ Dette er øving, ikke den offisielle prøven. Resultatet er bare en pekepinn.',
      level: 'Nivå', start: 'Start', again: 'Ta den på nytt', open: 'Åpne', done: 'Ferdig',
      p1: '🎧 Del 1 – lytting', p1d: '10 replikker på lyd, teksten er skjult.',
      p2: '📖 Del 2 – lesing', p2d: '10 spørsmål om forståelse.',
      p3: '✍️ Del 3 – skriving', p3d: 'Én kort tekst med retting.',
      res: '🏁 Resultatet ditt', of: '%', total: 'Til sammen', lvl: l => `Omtrentlig nivå: ${l}`,
      lvl_d: 'Tips: fikk du under 60 % på en del, gå tilbake til tegneseriene på nivået ditt og repeter ordene.',
      notyet: 'Ikke tatt ennå', time: m => `Tid: ${m} min` },
    ar: { title: '🏁 اختبار Norskprøven التجريبي', nav: '🏁 اختبار تجريبي',
      lead: 'تدريب بصيغة الاختبار النرويجي: استماع وقراءة وكتابة. أنجز الأجزاء تباعًا لترى مستواك التقريبي.',
      disclaimer: '⚠️ هذا تدريب وليس الاختبار الرسمي. النتيجة تقريبية.',
      level: 'المستوى', start: 'ابدأ', again: 'أعد الاختبار', open: 'افتح', done: 'تم',
      p1: '🎧 الجزء 1 — الاستماع', p1d: '10 جمل مسموعة، النص مخفي.',
      p2: '📖 الجزء 2 — القراءة', p2d: '10 أسئلة فهم.',
      p3: '✍️ الجزء 3 — الكتابة', p3d: 'نص قصير واحد مع تصحيح.',
      res: '🏁 نتيجتك', of: '٪', total: 'المجموع', lvl: l => `المستوى التقريبي: ${l}`,
      lvl_d: 'نصيحة: إذا كانت نتيجة جزء أقل من 60٪، عد إلى قصص مستواك وراجع الكلمات.',
      notyet: 'لم يُنجز بعد', time: m => `الوقت: ${m} دقيقة` }
  };
  const tx = () => T[(C() || {}).ui] || T.en;
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const levelKey = 'examLevel';

  const lvl = () => {
    const K = C();
    const saved = K.store.get(levelKey, null);
    if (LEVELS.includes(saved)) return saved;
    const plan = K.store.get('plan', {}) || {};
    return LEVELS.includes(plan.goal) ? plan.goal : 'A2';
  };
  const partKey = n => `exam:${lvl()}:${n}`;
  const best = n => { const p = (C().store.get('progress', {}) || {})[partKey(n)]; return p ? p.best : null; };

  /* Питання беремо з коміксів рівня: частина 1 — лише на слух, частина 2 — лише на читання. */
  function questions(part) {
    const K = C();
    const level = lvl();
    const pool = K.COMICS.filter(c => c.level === level);
    const list = pool.length ? pool : K.COMICS;
    const want = part === '1' ? ['hear'] : ['truefalse', 'panel', 'blank', 'who'];
    const qs = [];
    for (const c of list) {
      for (const q of K.comicQuestions(c, false)) if (want.includes(q.type)) qs.push(q);
    }
    return K.shuffle(qs).slice(0, 10);
  }

  function render() {
    const K = C(); if (!K) return null;
    const { h } = K, L = tx();
    const scores = ['1', '2'].map(n => best(n));
    const w = K.store.get('writeHist', [])[0];
    const wrote = w && Date.now() - w.at < 36e5 * 12 ? w.score : null;      // письмо зараховуємо за останні 12 годин
    const all = [scores[0], scores[1], wrote].filter(x => typeof x === 'number');
    const avg = all.length ? Math.round(all.reduce((a, b) => a + b, 0) / all.length) : null;
    const guess = avg == null ? null : avg < 50 ? 'A1' : avg < 70 ? 'A2' : avg < 85 ? 'B1' : 'B2';

    const levelRow = h('div', { class: 'row-left' }, LEVELS.map(x => h('button', {
      class: 'btn small' + (x === lvl() ? ' accent' : ''), type: 'button',
      onclick: () => { K.store.set(levelKey, x); K.route(); }
    }, x)));

    const part = (n, title, note, href, score) => h('div', { class: 'box exam-part' + (score != null ? ' done' : '') },
      h('h3', {}, title, score != null ? h('span', { class: 'exam-score' }, score + L.of) : null),
      h('p', {}, note),
      h('a', { class: 'btn' + (score == null ? ' accent' : ''), href }, score == null ? L.start : L.again));

    return h('section', { class: 'exam-page' }, K.pageHead(L.title),
      h('p', { class: 'lead-p' }, L.lead),
      h('p', { class: 'exam-warn' }, L.disclaimer),
      h('div', { class: 'row-left exam-lvl' }, h('b', {}, L.level), levelRow),
      part('1', L.p1, L.p1d, '#/quiz/exam/1', scores[0]),
      part('2', L.p2, L.p2d, '#/quiz/exam/2', scores[1]),
      part('3', L.p3, L.p3d, '#/write', wrote),
      avg != null ? h('div', { class: 'box exam-res' }, h('h3', {}, L.res),
        h('p', { class: 'exam-total' }, L.total + ': ' + avg + L.of),
        h('p', { class: 'exam-guess' }, L.lvl(guess)),
        h('p', { class: 'hint' }, L.lvl_d)) : null);
  }

  window.KomiksExam = { render, questions, text: k => tx()[k], level: lvl };
})();
