/* Комікс·Lab — 🎯 вхідний тест рівня (#/placement).
   Дванадцять питань: по три з кожного рівня A1–B2. Ми не питаємо «який у тебе рівень»,
   а дивимося, де починаються помилки, і ставимо план саме туди.
   Питання збираються з тих самих коміксів, що й звичайні тести, тож нічого окремо писати не треба. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const C = () => window.KomiksCore;
  const LEVELS = ['A1', 'A2', 'B1', 'B2'];
  const PER = 3;

  const T = {
    uk: { title: '🎯 Тест рівня', nav: '🎯 Тест рівня',
      lead: 'Дванадцять коротких питань — по три з кожного рівня. Не вгадуй: якщо не знаєш, тисни «Не знаю». Так план почнеться саме там, де треба.',
      start: '▶️ Почати', dunno: 'Не знаю', of: (i, n) => `Питання ${i} з ${n}`,
      res: '🏁 Результат', got: (a, b) => `${a} з ${b}`,
      rec: l => `Радимо почати з рівня ${l}`, rec0: 'Радимо почати з самого початку — з алфавіту й перших слів.',
      apply: '✅ Поставити цей рівень у план', applied: 'Готово! План оновлено.', plan: '🎯 Мій план', again: '🔄 Ще раз',
      why: 'Рівень визначаємо просто: рівень зараховано, якщо ти відповів правильно щонайменше на два питання з трьох.',
      listen: '🔊 Послухай і вибери слово', blank: 'Якого слова бракує?', tf: 'Правда чи ні?', yes: '✅ Правда', no: '❌ Неправда' },
    en: { title: '🎯 Level test', nav: '🎯 Level test',
      lead: 'Twelve short questions — three from each level. Do not guess: press “I don’t know” if you are unsure. Then your plan starts exactly where it should.',
      start: '▶️ Start', dunno: 'I don’t know', of: (i, n) => `Question ${i} of ${n}`,
      res: '🏁 Result', got: (a, b) => `${a} of ${b}`,
      rec: l => `We suggest starting at level ${l}`, rec0: 'We suggest starting from the very beginning — the alphabet and first words.',
      apply: '✅ Use this level in my plan', applied: 'Done! Your plan is updated.', plan: '🎯 My plan', again: '🔄 Again',
      why: 'The rule is simple: a level counts as passed when you answer at least two of its three questions correctly.',
      listen: '🔊 Listen and choose the word', blank: 'Which word is missing?', tf: 'True or false?', yes: '✅ True', no: '❌ False' },
    no: { title: '🎯 Nivåtest', nav: '🎯 Nivåtest',
      lead: 'Tolv korte spørsmål – tre fra hvert nivå. Ikke gjett: trykk «Vet ikke» hvis du er usikker. Da starter planen akkurat der den skal.',
      start: '▶️ Start', dunno: 'Vet ikke', of: (i, n) => `Spørsmål ${i} av ${n}`,
      res: '🏁 Resultat', got: (a, b) => `${a} av ${b}`,
      rec: l => `Vi foreslår å starte på nivå ${l}`, rec0: 'Vi foreslår å starte helt fra begynnelsen – alfabetet og de første ordene.',
      apply: '✅ Bruk dette nivået i planen', applied: 'Ferdig! Planen er oppdatert.', plan: '🎯 Planen min', again: '🔄 En gang til',
      why: 'Regelen er enkel: et nivå er bestått når du svarer riktig på minst to av tre spørsmål.',
      listen: '🔊 Lytt og velg ordet', blank: 'Hvilket ord mangler?', tf: 'Riktig eller feil?', yes: '✅ Riktig', no: '❌ Feil' },
    ar: { title: '🎯 اختبار المستوى', nav: '🎯 اختبار المستوى',
      lead: 'اثنا عشر سؤالًا قصيرًا — ثلاثة من كل مستوى. لا تخمّن: اضغط «لا أعرف» إن لم تكن متأكدًا، فتبدأ خطتك من المكان الصحيح.',
      start: '▶️ ابدأ', dunno: 'لا أعرف', of: (i, n) => `السؤال ${i} من ${n}`,
      res: '🏁 النتيجة', got: (a, b) => `${a} من ${b}`,
      rec: l => `ننصح بالبدء من المستوى ${l}`, rec0: 'ننصح بالبدء من البداية — الحروف والكلمات الأولى.',
      apply: '✅ اعتمد هذا المستوى في خطتي', applied: 'تم! حُدّثت خطتك.', plan: '🎯 خطتي', again: '🔄 مرة أخرى',
      why: 'القاعدة بسيطة: يُحتسب المستوى ناجحًا عند الإجابة صحيحًا عن سؤالين من ثلاثة على الأقل.',
      listen: '🔊 استمع واختر الكلمة', blank: 'ما الكلمة الناقصة؟', tf: 'صحيح أم خطأ؟', yes: '✅ صحيح', no: '❌ خطأ' }
  };
  const tx = () => T[(C() || {}).ui] || T.en;

  /* Три питання з кожного рівня: слухання, пропущене слово, «правда чи ні». */
  function build() {
    const K = C();
    const out = [];
    for (const lv of LEVELS) {
      const comics = K.COMICS.filter(c => c.level === lv);
      if (!comics.length) continue;
      const pool = [];
      for (const c of K.shuffle(comics).slice(0, 4)) {
        for (const q of K.comicQuestions(c, false)) if (['listen', 'blank', 'truefalse'].includes(q.type)) pool.push(Object.assign({ lv }, q));
      }
      // намагаємося взяти різні типи, щоб рівень перевірявся з трьох боків
      const byType = {};
      for (const q of K.shuffle(pool)) { byType[q.type] = byType[q.type] || []; byType[q.type].push(q); }
      const picked = [];
      for (const ty of ['listen', 'blank', 'truefalse']) if (byType[ty] && byType[ty].length) picked.push(byType[ty].shift());
      while (picked.length < PER) {
        const rest = K.shuffle(Object.values(byType).flat()).filter(q => !picked.includes(q));
        if (!rest.length) break;
        picked.push(rest[0]);
      }
      out.push(...picked.slice(0, PER));
    }
    return out;
  }

  function render() {
    const K = C(); if (!K) return null;
    const { h } = K, L = tx();
    const root = h('section', { class: 'place-page' });
    let qs = [], i = 0, right = {};

    function intro() {
      root.replaceChildren(K.pageHead(L.title),
        h('p', { class: 'lead-p' }, L.lead),
        h('p', { class: 'hint' }, L.why),
        h('div', { class: 'row-left' },
          h('button', { class: 'btn accent big', type: 'button', onclick: () => { qs = build(); i = 0; right = {}; step(); } }, L.start),
          h('a', { class: 'btn', href: '#/plan' }, L.plan)));
    }

    function answer(q, ok) {
      if (ok) right[q.lv] = (right[q.lv] || 0) + 1;
      i++;
      if (i >= qs.length) result(); else step();
    }

    function step() {
      const q = qs[i];
      const head = h('div', { class: 'place-head' }, h('b', {}, L.of(i + 1, qs.length)), h('span', { class: 'place-lv' }, q.lv));
      const bar = h('div', { class: 'bar' }, h('i', { style: { width: (i / qs.length * 100) + '%' } }));
      let prompt, opts;
      if (q.type === 'listen') {
        prompt = h('div', { class: 'q-prompt center' },
          h('button', { class: 'big-play', type: 'button', onclick: () => K.Speech.speak(q.item.no, 'narrator', { rate: 0.85 }) }, '🔊'),
          h('p', { class: 'hint' }, L.listen));
        opts = h('div', { class: 'opts' }, q.options.map(o => h('button', { class: 'opt word', type: 'button', onclick: () => answer(q, o === q.answer) }, o)));
        setTimeout(() => K.Speech.speak(q.item.no, 'narrator', { rate: 0.85 }), 350);
      } else if (q.type === 'blank') {
        prompt = h('div', { class: 'q-prompt' }, h('div', { class: 'say' }, '«' + q.line.no.replace(q.word, '_____') + '»'), h('p', { class: 'hint' }, L.blank));
        opts = h('div', { class: 'opts' }, q.options.map(o => h('button', { class: 'opt word', type: 'button', onclick: () => answer(q, o === q.answer) }, o)));
      } else {
        prompt = h('div', { class: 'q-prompt' }, h('div', { class: 'say' }, q.statement), h('p', { class: 'hint' }, L.tf));
        opts = h('div', { class: 'opts' }, [true, false].map(v => h('button', { class: 'opt', type: 'button', onclick: () => answer(q, v === q.answer) }, v ? L.yes : L.no)));
      }
      root.replaceChildren(K.pageHead(L.title), bar, h('div', { class: 'q-card' }, head, prompt, opts,
        h('button', { class: 'btn', type: 'button', onclick: () => answer(q, false) }, L.dunno)));
      window.scrollTo({ top: 0 });
    }

    function result() {
      const passed = LEVELS.filter(lv => (right[lv] || 0) >= 2);
      // перший рівень, який не подолано — з нього й починаємо
      const startAt = LEVELS.find(lv => !passed.includes(lv)) || 'B2';
      const from = passed.length === 0 ? 'zero' : startAt;
      const rows = LEVELS.map(lv => {
        const n = right[lv] || 0;
        return h('div', { class: 'place-row' + (n >= 2 ? ' ok' : '') },
          h('b', {}, lv), h('span', { class: 'place-bar' }, h('i', { style: { width: (n / PER * 100) + '%' } })), h('small', {}, L.got(n, PER)));
      });
      const msg = h('p', { class: 'place-msg' });
      const apply = h('button', { class: 'btn accent big', type: 'button', onclick: () => {
        const plan = Object.assign({ from: 'zero', goal: 'A2', pace: 'normal' }, K.store.get('plan', {}));
        plan.from = from;
        const gi = LEVELS.indexOf(plan.goal), fi = LEVELS.indexOf(from);
        if (fi >= 0 && gi >= 0 && fi > gi) plan.goal = LEVELS[Math.min(LEVELS.length - 1, fi + 1)];
        K.store.set('plan', plan);
        msg.textContent = L.applied;
        apply.disabled = true;
        K.Sfx.good();
      } }, L.apply);
      root.replaceChildren(K.pageHead(L.title),
        h('div', { class: 'q-card result' }, h('h2', {}, L.res),
          h('div', { class: 'place-rows' }, rows),
          h('p', { class: 'place-rec' }, from === 'zero' ? L.rec0 : L.rec(from)),
          msg,
          h('div', { class: 'row-center' }, apply, h('a', { class: 'btn', href: '#/plan' }, L.plan),
            h('button', { class: 'btn', type: 'button', onclick: intro }, L.again))));
      window.scrollTo({ top: 0 });
    }

    intro();
    return root;
  }

  window.KomiksPlacement = { render, text: k => tx()[k] };
})();
