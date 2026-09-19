/* Комікс·Lab — 🏁 Логік-гонка: живі аватари мчать доріжками й обганяють одне одного за швидкість правильних
   відповідей на логічні задачі (послідовності, візерунки, «зайве», лічба, «що більше», пропущене число).
   Монітор (#/race/host) — траса з усіма гравцями й живий лідер; телефон (#/race/join/<КОД>) — задачі й міні-траса.
   #/race — меню: гра з класом або проти ботів. Нагорода — скриня з рідкісними аксесуарами. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const TX = {
    uk: {
      title: '🏁 Логік-гонка', sub: 'Твій аватар біжить, коли ти правильно розв’язуєш логічні задачі. Чим швидше відповідаєш — тим швидше обганяєш суперників!',
      class_btn: '📺 Гонка з класом', class_d: 'Траса на великому екрані, учні відповідають на телефонах', bots_btn: '🤖 Гонка з ботами', bots_d: 'Грай сам проти трьох суперників',
      dist: 'Дистанція', dists: { 10: 'Коротка · 10', 15: 'Середня · 15', 20: 'Довга · 20' }, limit: 'Ліміт часу', times: { 60: '1 хв', 120: '2 хв', 180: '3 хв', 300: '5 хв' }, left: s => `⏱ ${s}`,
      level: 'Рівень', easy: '🟢 Легко', medium: '🟡 Середньо', hard: '🔴 Складно', expert: '🟣 Експерт', lvd: { easy: '6–8 років: лічба, кубики, годинник, прості ряди', medium: '8–10: машина чисел, решта в магазині, латинський квадрат', hard: '10–12: складні ряди, рівняння з картинками, час', expert: '12+ і дорослим: прості числа, квадрат 4×4, задачі в кілька кроків' }, how: ['Кожна правильна відповідь — крок уперед.', 'Помилка — спотикання на 1,5 с.', 'Перший на фініші перемагає, серія з 5 відповідей може принести 🎁 скриню.'],
      scan: 'Скануй QR-код або відкрий посилання:', code: 'Код', players: n => `Гравці: ${n}`, waiting: 'Чекаємо на гравців…', start: '🏁 Старт!', close: '✖ Закрити', back: '← Назад',
      go: 'Руш!', finish: 'ФІНІШ', leader: 'Лідер', overtake: (a, b) => `⚡ ${a} обганяє ${b}!`, finished: (n, p) => `🏁 ${n} фінішує ${p}-м!`,
      results: '🏆 Результати гонки', again: '🔄 Ще гонка', steps: (a, b) => `${a} / ${b}`, time: 'Час', you: 'ти', place: (r, n) => `Твоє місце: ${r} з ${n}`,
      join_t: '🏁 Логік-гонка', name: 'Твоє ім’я', join: 'Увійти ▶', err_code: 'Введи код (5 символів).', err_name: 'Введи ім’я.', in_room: 'Ти на старті!', wait_start: 'Чекай сигналу вчителя…',
      connecting: 'Підключення…', creating: 'Створюємо трасу…', host_left: 'Гонку завершено або з’єднання втрачено.', err_room: 'Кімнату не знайдено.', err_net: 'Немає з’єднання з інтернетом.',
      trip: 'Ой! Спіткнувся…', streak: n => `🔥 ${n} поспіль`, done_wait: '🏁 Фініш! Чекаємо на інших…', your_pos: (r, n) => `Ти ${r}-й з ${n}`, bots: ['Robo', 'Botto', 'Pixel'], local_warn: '⚠️ Сторінку відкрито з файлу — телефони не приєднаються.'
    },
    en: {
      title: '🏁 Logic Race', sub: 'Your avatar runs when you solve logic puzzles correctly. The faster you answer, the faster you overtake your rivals!',
      class_btn: '📺 Race with the class', class_d: 'The track on the big screen, students answer on their phones', bots_btn: '🤖 Race against bots', bots_d: 'Play alone against three rivals',
      dist: 'Distance', dists: { 10: 'Short · 10', 15: 'Medium · 15', 20: 'Long · 20' }, limit: 'Time limit', times: { 60: '1 min', 120: '2 min', 180: '3 min', 300: '5 min' }, left: s => `⏱ ${s}`,
      level: 'Level', easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard', expert: '🟣 Expert', lvd: { easy: 'Ages 6–8: counting, dice, clocks, simple rows', medium: '8–10: number machine, change in the shop, Latin square', hard: '10–12: tricky rows, picture equations, time', expert: '12+ and adults: primes, 4×4 square, multi-step puzzles' }, how: ['Every right answer is a step forward.', 'A mistake makes you trip for 1.5 s.', 'First to the finish wins; a streak of 5 may bring a 🎁 chest.'],
      scan: 'Scan the QR code or open the link:', code: 'Code', players: n => `Players: ${n}`, waiting: 'Waiting for players…', start: '🏁 Start!', close: '✖ Close', back: '← Back',
      go: 'Go!', finish: 'FINISH', leader: 'Leader', overtake: (a, b) => `⚡ ${a} overtakes ${b}!`, finished: (n, p) => `🏁 ${n} finishes #${p}!`,
      results: '🏆 Race results', again: '🔄 Race again', steps: (a, b) => `${a} / ${b}`, time: 'Time', you: 'you', place: (r, n) => `Your place: ${r} of ${n}`,
      join_t: '🏁 Logic Race', name: 'Your name', join: 'Join ▶', err_code: 'Enter the code (5 characters).', err_name: 'Enter your name.', in_room: 'You are on the start line!', wait_start: 'Wait for the teacher’s signal…',
      connecting: 'Connecting…', creating: 'Building the track…', host_left: 'The race ended or the connection was lost.', err_room: 'Room not found.', err_net: 'No internet connection.',
      trip: 'Oops! You tripped…', streak: n => `🔥 ${n} in a row`, done_wait: '🏁 Finished! Waiting for the others…', your_pos: (r, n) => `You are #${r} of ${n}`, bots: ['Robo', 'Botto', 'Pixel'], local_warn: '⚠️ The page is opened from a file — phones cannot join.'
    },
    no: {
      title: '🏁 Logikkløpet', sub: 'Avataren din løper når du løser logiske oppgaver riktig. Jo raskere du svarer, jo raskere forbikjører du de andre!',
      class_btn: '📺 Løp med klassen', class_d: 'Banen på storskjermen, elevene svarer på mobilen', bots_btn: '🤖 Løp mot roboter', bots_d: 'Spill alene mot tre motstandere',
      dist: 'Distanse', dists: { 10: 'Kort · 10', 15: 'Middels · 15', 20: 'Lang · 20' }, limit: 'Tidsgrense', times: { 60: '1 min', 120: '2 min', 180: '3 min', 300: '5 min' }, left: s => `⏱ ${s}`,
      level: 'Nivå', easy: '🟢 Lett', medium: '🟡 Middels', hard: '🔴 Vanskelig', expert: '🟣 Ekspert', lvd: { easy: '6–8 år: telling, terninger, klokka, enkle rekker', medium: '8–10: tallmaskin, vekslepenger, latinsk kvadrat', hard: '10–12: vanskelige rekker, bildelikninger, tid', expert: '12+ og voksne: primtall, 4×4-kvadrat, oppgaver i flere steg' }, how: ['Hvert riktig svar er et steg fram.', 'Feil svar gjør at du snubler i 1,5 s.', 'Først i mål vinner; 5 riktige på rad kan gi en 🎁 kiste.'],
      scan: 'Skann QR-koden eller åpne lenken:', code: 'Kode', players: n => `Spillere: ${n}`, waiting: 'Venter på spillere …', start: '🏁 Start!', close: '✖ Steng', back: '← Tilbake',
      go: 'Kjør!', finish: 'MÅL', leader: 'Leder', overtake: (a, b) => `⚡ ${a} forbikjører ${b}!`, finished: (n, p) => `🏁 ${n} kommer i mål som nr. ${p}!`,
      results: '🏆 Resultater', again: '🔄 Nytt løp', steps: (a, b) => `${a} / ${b}`, time: 'Tid', you: 'deg', place: (r, n) => `Din plass: ${r} av ${n}`,
      join_t: '🏁 Logikkløpet', name: 'Navnet ditt', join: 'Bli med ▶', err_code: 'Skriv koden (5 tegn).', err_name: 'Skriv navnet ditt.', in_room: 'Du står på startstreken!', wait_start: 'Vent på lærerens signal …',
      connecting: 'Kobler til …', creating: 'Bygger banen …', host_left: 'Løpet er over eller forbindelsen er brutt.', err_room: 'Fant ikke rommet.', err_net: 'Ingen internettforbindelse.',
      trip: 'Oi! Du snublet …', streak: n => `🔥 ${n} på rad`, done_wait: '🏁 I mål! Venter på de andre …', your_pos: (r, n) => `Du er nr. ${r} av ${n}`, bots: ['Robo', 'Botto', 'Pixel'], local_warn: '⚠️ Siden er åpnet fra en fil.'
    }
  };
  TX.ar = {
    title: '🏁 سباق المنطق', sub: 'تركض شخصيتك عندما تحلّ الألغاز المنطقية بشكل صحيح. كلما أجبت أسرع، تجاوزت منافسيك أسرع!',
    class_btn: '📺 سباق مع الصف', class_d: 'المضمار على الشاشة الكبيرة، والتلاميذ يجيبون على هواتفهم', bots_btn: '🤖 سباق ضد الروبوتات', bots_d: 'العب وحدك ضد ثلاثة منافسين',
    dist: 'المسافة', dists: { 10: 'قصيرة · 10', 15: 'متوسطة · 15', 20: 'طويلة · 20' }, limit: 'الحد الزمني', times: { 60: '1 د', 120: '2 د', 180: '3 د', 300: '5 د' }, left: s => `⏱ ${s}`,
    level: 'المستوى', easy: '🟢 سهل', medium: '🟡 متوسط', hard: '🔴 صعب', expert: '🟣 خبير', lvd: { easy: 'من 6 إلى 8 سنوات: العدّ والنرد والساعة وسلاسل بسيطة', medium: '8–10: آلة الأرقام والباقي في المتجر والمربع اللاتيني', hard: '10–12: سلاسل صعبة ومعادلات بالصور والوقت', expert: '12+ وللكبار: الأعداد الأولية ومربع 4×4 وألغاز متعددة الخطوات' }, how: ['كل إجابة صحيحة خطوة إلى الأمام.', 'الخطأ يجعلك تتعثّر 1.5 ثانية.', 'الأول عند خط النهاية يفوز؛ 5 إجابات متتالية قد تمنحك 🎁 صندوقًا.'],
    scan: 'امسح رمز QR أو افتح الرابط:', code: 'الرمز', players: n => `اللاعبون: ${n}`, waiting: 'في انتظار اللاعبين…', start: '🏁 انطلق!', close: '✖ إغلاق', back: '→ رجوع',
    go: 'انطلق!', finish: 'النهاية', leader: 'المتصدّر', overtake: (a, b) => `⚡ ${a} يتجاوز ${b}!`, finished: (n, p) => `🏁 ${n} وصل في المركز ${p}!`,
    results: '🏆 نتائج السباق', again: '🔄 سباق آخر', steps: (a, b) => `${a} / ${b}`, time: 'الوقت', you: 'أنت', place: (r, n) => `مركزك: ${r} من ${n}`,
    join_t: '🏁 سباق المنطق', name: 'اسمك', join: 'انضم ▶', err_code: 'اكتب الرمز (5 أحرف).', err_name: 'اكتب اسمك.', in_room: 'أنت على خط البداية!', wait_start: 'انتظر إشارة المعلّم…',
    connecting: 'جارٍ الاتصال…', creating: 'جارٍ تجهيز المضمار…', host_left: 'انتهى السباق أو انقطع الاتصال.', err_room: 'لم يُعثر على الغرفة.', err_net: 'لا يوجد اتصال بالإنترنت.',
    trip: 'أوه! تعثّرت…', streak: n => `🔥 ${n} متتالية`, done_wait: '🏁 وصلت! في انتظار الآخرين…', your_pos: (r, n) => `أنت رقم ${r} من ${n}`, bots: ['Robo', 'Botto', 'Pixel'], local_warn: '⚠️ الصفحة مفتوحة من ملف — لن تتمكن الهواتف من الانضمام.'
  };
  const MOD = { uk: ['🏁', 'Логік-гонка', 'аватари мчать наввипередки за логіку'], en: ['🏁', 'Logic Race', 'avatars race each other on logic'], no: ['🏁', 'Logikkløpet', 'avatarer kappløper med logikk'], ar: ['🏁', 'سباق المنطق', 'شخصيات تتسابق بالمنطق'] };
  if (window.I18N) for (const l of ['uk', 'en', 'no']) { const I = window.I18N[l]; if (!I) continue; I.nav = Object.assign({}, I.nav, { race: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { race: MOD[l] }); }
  const C = () => window.KomiksCore;
  const tx = (k, ...a) => { const t = TX[C().ui] || TX.en || TX.uk; const v = k in t ? t[k] : (TX.en || TX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : document.createTextNode(code));
  const SITE = 'https://bilohash.com/comiks/', PREFIX = 'komiks-lab-race-', CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  // довжина траси й ліміт часу — налаштовуються; на сторінці завжди одна гонка, тож значення виставляються на старті
  let STEPS = 10, DURATION = 120;
  const TRIP = 1500, DISTS = [10, 15, 20], TIMES = [60, 120, 180, 300];
  const okSteps = v => (DISTS.includes(+v) ? +v : 10), okDur = v => (TIMES.includes(+v) ? +v : 120);
  const useCfg = (steps, dur) => { STEPS = okSteps(steps); DURATION = okDur(dur); };
  const savedCfg = () => [okSteps(C().store.get('raceSteps', 10)), okDur(C().store.get('raceDur', 120))];
  function cfgPickers(onChange) {
    const K = C(), { h } = K, [st, du] = savedCfg();
    const row = (label, list, cur, names, key) => h('div', { class: 'lr-cfg' }, h('span', {}, label),
      list.map(v => h('button', { type: 'button', class: 'lr-cfg-b' + (v === cur ? ' on' : ''), onclick: () => { K.store.set(key, v); onChange(); } }, names[v])));
    return h('div', { class: 'lr-cfgs' }, row('🏁 ' + tx('dist'), DISTS, st, tx('dists'), 'raceSteps'), row('⏱ ' + tx('limit'), TIMES, du, tx('times'), 'raceDur'));
  }
  const LEVELS = ['easy', 'medium', 'hard', 'expert'];
  const genCode = () => Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  const baseUrl = () => (location.protocol.startsWith('http') ? location.href.split('#')[0].split('?')[0] : SITE);
  const myAvatar = () => (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊');
  let libs = null;
  function loadLibs() {
    if (libs) return libs;
    const v = (window.KOMIKS_DATA || {}).version || '';
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
    libs = Promise.all([window.Peer ? null : load('assets/vendor/peerjs.min.js'), window.qrcode ? null : load('assets/vendor/qrcode.js')]).catch(e => { libs = null; throw e; });
    return libs;
  }
  const qrSvg = url => { try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch { return ''; } };
  const mulberry32 = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  /* ================= логічні задачі ================= */
  const TITLES = {
    seq: ['Hva kommer etterpå?', 'Що далі в ряду?', 'What comes next?'],
    pattern: ['Hva kommer etterpå?', 'Що далі у візерунку?', 'What comes next in the pattern?'],
    emoji: ['Finn tallet!', 'Знайди число!', 'Find the number!'],
    odd: ['Hvilken passer ikke?', 'Що тут зайве?', 'Which one does not belong?'],
    count: ['Hvor mange er det?', 'Скільки їх?', 'How many are there?'],
    bigger: ['Hva er størst?', 'Що найбільше?', 'Which is the biggest?'],
    missing: ['Hvilket tall mangler?', 'Якого числа бракує?', 'Which number is missing?'],
    dice: ['Hvor mange prikker til sammen?', 'Скільки крапок разом?', 'How many dots in total?'],
    clock: ['Hva er klokka?', 'Котра година?', 'What time is it?'],
    money: ['Hvor mye får du igjen?', 'Скільки решти ти отримаєш?', 'How much change do you get?'],
    machine: ['Hva gjør maskinen?', 'Що робить чарівна машина?', 'What does the magic machine do?'],
    latin: ['Hva mangler i ruten?', 'Чого бракує в квадраті? (у кожному рядку й стовпчику — усі різні)', 'What is missing? (every row and column has each one once)'],
    later: ['Hva er klokka da?', 'Котра тоді буде година?', 'What time will it be?']
  };
  const FRUIT = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍩', '🧁', '🍪', '⚽', '🚗', '🐱', '⭐'];
  const EMO = ['🍎', '🍌', '⭐', '🌙', '🔴', '🔵', '🟢', '🟡', '🐱', '🐶', '⚽', '🎈', '🍓', '🍀', '❤️', '🔷', '🐟', '🌼'];
  const hhmm = (h, m) => `${((h % 24) + 24) % 24}:${String(m).padStart(2, '0')}`;
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
  const TYPES = {
    easy: ['seq', 'emoji', 'count', 'missing', 'odd', 'dice', 'clock', 'money'],
    medium: ['seq', 'emoji', 'odd', 'count', 'missing', 'bigger', 'clock', 'money', 'machine', 'latin'],
    hard: ['seq', 'emoji', 'odd', 'bigger', 'missing', 'clock', 'money', 'machine', 'latin', 'later'],
    expert: ['seq', 'seq', 'emoji', 'bigger', 'missing', 'machine', 'latin', 'later', 'money']
  };
  function makeQ(rand, level, prev) {
    const R = n => Math.floor(rand() * n);
    const pick = arr => arr[R(arr.length)];
    const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = R(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const nums = (ans, spread) => { const s = new Set([ans]); for (let g = 0; s.size < 4 && g < 80; g++) { const v = ans + pick([-1, 1]) * (1 + R(spread)); if (v >= 0) s.add(v); } for (let v = ans + 1; s.size < 4; v++) s.add(v); return shuffle([...s]); };
    // emoji — «вірусні» рівняння з картинками замість старого візерунка ❤️🌙🌙
    const types = TYPES[level] || TYPES.medium;
    let type = pick(types);
    for (let g = 0; g < 4 && type === prev; g++) type = pick(types); // той самий тип двічі поспіль — рідко
    const X = level === 'expert';
    const strOpts = (ans, gen) => { const s = new Set([ans]); for (let g = 0; s.size < 4 && g < 60; g++) s.add(gen()); return shuffle([...s]); };
    if (type === 'dice') {
      const k = level === 'easy' ? 2 : 3, d = Array.from({ length: k }, () => 1 + R(6)), ans = d.reduce((a, b) => a + b, 0);
      return { type, dice: d, answer: ans, options: nums(ans, 3) };
    }
    if (type === 'clock') {
      const hr = 1 + R(12), mm = level === 'easy' ? pick([0, 0, 30]) : level === 'medium' ? pick([0, 15, 30, 45]) : 5 * R(12);
      const ans = hhmm(hr, mm);
      // типові плутанини: переставлені стрілки, сусідня година, ±15 хв
      const opts = strOpts(ans, () => pick([hhmm(hr === 12 ? 1 : hr + 1, mm), hhmm(hr === 1 ? 12 : hr - 1, mm), hhmm(hr, (mm + 30) % 60), hhmm(Math.max(1, Math.round(mm / 5)) || 12, (hr % 12) * 5), hhmm(hr, (mm + 15) % 60), hhmm(1 + R(12), mm)]));
      return { type, clock: [hr, mm], answer: ans, options: opts };
    }
    if (type === 'later') {
      const hr = 6 + R(15), mm = 5 * R(12), add = X ? pick([35, 50, 75, 95, 125, 150]) : pick([15, 20, 30, 45, 90]);
      const t = hr * 60 + mm + add, ans = hhmm(Math.floor(t / 60), t % 60);
      const opts = strOpts(ans, () => { const d = pick([-15, -10, 10, 15, 60, -60, 5]); const u = t + d; return hhmm(Math.floor(u / 60), ((u % 60) + 60) % 60); });
      return { type, show: `🕐 ${hhmm(hr, mm)}  +  ${add} min`, answer: ans, options: opts };
    }
    if (type === 'money') {
      const shop = shuffle(['🍎', '🍌', '🥐', '🧃', '🍦', '🍫', '✏️', '🎈', '🍪', '🥤']);
      let pay, items;
      if (level === 'easy') { pay = 10; items = [[shop[0], 1, 1 + R(9)]]; }
      else if (level === 'medium') { pay = pick([20, 50]); items = [[shop[0], 1, 2 + R(Math.min(18, pay - 2))]]; }
      else if (level === 'hard') { pay = 50; items = [[shop[0], 1, 5 + R(15)], [shop[1], 1, 3 + R(12)]]; }
      else { pay = 0; items = [[shop[0], 2 + R(3), 6 + R(14)], [shop[1], 1 + R(2), 9 + R(20)]]; }
      const cost = items.reduce((n, [, q, pr]) => n + q * pr, 0);
      if (!pay) pay = [50, 100, 200, 500].find(v => v > cost); // експерт: купюра, якої точно вистачить
      const ans = pay - cost;
      return { type, pay, items, answer: ans, options: nums(ans, level === 'easy' ? 2 : 6), unit: ' kr' };
    }
    if (type === 'machine') {
      // «чарівна машина»: 3 приклади входу → виходу, знайди вихід для нового числа
      let f;
      if (level === 'medium') { const b = 2 + R(8); f = pick([x => x + b, x => 2 * x, x => x * 10]); }
      else if (level === 'hard') { const a = 2 + R(3), b = 1 + R(6), bs = 1 + R(a - 1); f = pick([x => a * x + b, x => a * x - bs, x => x * x]); }
      else { const a = 2 + R(4), b = 1 + R(9), bs = 1 + R(a - 1); f = pick([x => x * x + b, x => a * x - bs, x => (x + b) * 2, x => x * x - x]); }
      const xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, 4), ans = f(xs[3]);
      return { type, pairs: xs.slice(0, 3).map(x => [x, f(x)]), ask: xs[3], answer: ans, options: nums(ans, Math.max(3, Math.round(Math.abs(ans) / 4))) };
    }
    if (type === 'latin') {
      const n = X ? 4 : 3, sym = shuffle(['🍎', '⭐', '🐱', '🔷', '🌙', '🍀', '⚽', '🎈']).slice(0, n);
      const rows = shuffle([...Array(n).keys()]), cols = shuffle([...Array(n).keys()]);
      const grid = rows.map(r => cols.map(c => sym[(r + c) % n]));
      const blanks = level === 'medium' ? 1 : level === 'hard' ? 2 : 3; // більше порожніх клітинок — важче
      const ask = R(n * n), cells = [ask, ...shuffle([...Array(n * n).keys()].filter(i => Math.floor(i / n) !== Math.floor(ask / n))).slice(0, blanks - 1)]; // інші порожні — не в рядку з «?», щоб відповідь була однозначна
      const ans = grid[Math.floor(ask / n)][ask % n];
      return { type, grid: grid.map((row, r) => row.map((e, c) => (r * n + c === ask ? '?' : cells.includes(r * n + c) ? '' : e))), answer: ans, options: shuffle(sym.length >= 4 ? sym.slice(0, 4) : [...sym, pick(['🍓', '🐶'])]), emoji: true };
    }

    if (type === 'seq') {
      let items, ans;
      const kind = level === 'easy' ? pick(['add', 'add', 'sub1']) : pick(level === 'medium' ? ['add', 'add', 'sub', 'mul'] : X ? ['prime', 'tri', 'dbl', 'fib', 'sq', 'alt'] : ['add', 'mul', 'alt', 'fib', 'sq', 'sub']);
      if (kind === 'add') { const a = 1 + R(level === 'easy' ? 5 : 12), d = 1 + R(level === 'easy' ? 3 : 9); items = [0, 1, 2, 3].map(i => a + d * i); ans = a + d * 4; }
      else if (kind === 'sub') { const d = 1 + R(5), a = d * 5 + R(20); items = [0, 1, 2, 3].map(i => a - d * i); ans = a - d * 4; }
      else if (kind === 'mul') { const a = 1 + R(3), m = 2 + R(2); items = [0, 1, 2, 3].map(i => a * Math.pow(m, i)); ans = a * Math.pow(m, 4); }
      else if (kind === 'alt') { const a = 1 + R(9), x = 1 + R(5), y = 1 + R(5) + x; items = [a, a + x, a + x + y, a + 2 * x + y]; ans = a + 2 * x + 2 * y; }
      else if (kind === 'fib') { const a = 1 + R(3), b = a + R(3); items = [a, b, a + b, a + 2 * b]; ans = 2 * a + 3 * b; }
      else if (kind === 'sub1') { const a = 8 + R(12), d = 1 + R(2); items = [0, 1, 2, 3].map(i => a - d * i); ans = a - d * 4; }
      else if (kind === 'prime') { const i0 = R(8); items = PRIMES.slice(i0, i0 + 4); ans = PRIMES[i0 + 4]; }
      else if (kind === 'tri') { const k = 1 + R(4), tri = n => n * (n + 1) / 2; items = [0, 1, 2, 3].map(i => tri(k + i)); ans = tri(k + 4); }
      else if (kind === 'dbl') { let v = 1 + R(4); const b = 1 + R(2); items = []; for (let i = 0; i < 4; i++) { items.push(v); v = v * 2 + b; } ans = v; }
      else { const s0 = 1 + R(3); items = [0, 1, 2, 3].map(i => (s0 + i) * (s0 + i)); ans = (s0 + 4) * (s0 + 4); }
      return { type, show: items.join(',  ') + ',  ?', answer: ans, options: nums(ans, Math.max(3, Math.round(ans / 5))) };
    }
    if (type === 'emoji') {
      // легко: 🍎 + 🍎 = 8 → 🍎 = ?; середньо: + 🍎 + 🍌 = 7 → 🍌 = ?; складно: ще 🍌 + 🍇 = … → 🍇 = ?
      const [x, y, z] = shuffle(FRUIT);
      const vx = 1 + R(level === 'easy' ? 6 : X ? 15 : 9), vy = 1 + R(X ? 15 : 9), vz = 1 + R(X ? 12 : 9);
      let lines, ask, ans;
      if (level === 'easy') { lines = [[x, x, 2 * vx]]; ask = x; ans = vx; }
      else if (level === 'medium') { lines = [[x, x, 2 * vx], [x, y, vx + vy]]; ask = y; ans = vy; }
      else if (X) { lines = [[x, x, 2 * vx, '+'], [x, y, vx * vy, '×'], [y, z, vy + vz, '+']]; ask = z; ans = vz; }
      else { lines = [[x, x, 2 * vx], [x, y, vx + vy], [y, z, vy + vz]]; ask = z; ans = vz; }
      return { type, lines, ask, answer: ans, options: nums(ans, 3) };
    }
    if (type === 'pattern') {
      const pool = shuffle(EMO);
      const unit = level === 'easy' ? [pool[0], pool[1]] : pick([[pool[0], pool[1]], [pool[0], pool[0], pool[1]], [pool[0], pool[1], pool[2]], [pool[0], pool[1], pool[1]]]);
      const len = unit.length === 2 ? 6 : 7;
      const seq = Array.from({ length: len + 1 }, (_, i) => unit[i % unit.length]);
      const ans = seq[len];
      const opts = shuffle([ans, ...shuffle(pool.slice(0, 6).filter(e => e !== ans)).slice(0, 3)]);
      return { type, row: seq.slice(0, len), answer: ans, options: opts, emoji: true };
    }
    if (type === 'odd') {
      const themes = ((window.WORDS || {}).themes || []).filter(t => ['dyr', 'frukt', 'klaer', 'byen', 'mat', 'fritid'].includes(t.id));
      if (themes.length >= 2) {
        const [t1, t2] = shuffle(themes);
        // лише різні емодзі: у темах трапляються однакові картинки для різних слів
        const seen = new Set(), three = [];
        for (const w of shuffle(t1.words)) { if (three.length < 3 && !seen.has(w[3])) { seen.add(w[3]); three.push(w); } }
        const one = shuffle(t2.words).find(w => !seen.has(w[3])) || t2.words[0];
        const items = shuffle([...three, one].map(w => ({ e: w[3], w: w[0] })));
        return { type, answer: one[3], options: items.map(x => x.e), words: Object.fromEntries(items.map(x => [x.e, x.w])), emoji: true };
      }
    }
    if (type === 'count' || type === 'odd') {
      const target = pick(EMO), others = shuffle(EMO.filter(e => e !== target)).slice(0, level === 'easy' ? 1 : 2);
      const n = 3 + R(level === 'easy' ? 6 : 9), extra = 4 + R(6);
      const grid = shuffle([...Array(n).fill(target), ...Array.from({ length: extra }, () => pick(others))]);
      return { type: 'count', target, grid, answer: n, options: nums(n, 3) };
    }
    if (type === 'bigger') {
      const mk = () => { const k = pick(['+', '−', '×']); let a = 2 + R(9), b = 2 + R(9); if (k === '−' && b > a) [a, b] = [b, a];
        if (X) { const c = 2 + R(9), k2 = pick(['+', '−']); const base = k === '+' ? a + b : k === '−' ? a - b : a * b; return k === '×' ? { t: `${a} × ${b} ${k2} ${c}`, v: k2 === '+' ? base + c : base - c } : { t: `${a} ${k} ${b} × ${c}`, v: k === '+' ? a + b * c : a - b * c }; }
        return { t: `${a} ${k} ${b}`, v: k === '+' ? a + b : k === '−' ? a - b : a * b }; };
      const set = []; for (let g = 0; set.length < 4 && g < 60; g++) { const e = mk(); if (!set.some(x => x.v === e.v)) set.push(e); }
      const best = set.reduce((m, x) => (x.v > m.v ? x : m));
      return { type, answer: best.t, options: set.map(x => x.t) };
    }
    // missing: «? + 4 = 9»
    const op = level === 'easy' ? pick(['+', '−']) : X ? pick(['×', '÷', '+', '−']) : pick(['+', '−', '×']);
    let a = 1 + R(level === 'easy' ? 9 : X ? 40 : 12), b = 1 + R(X ? 12 : 9);
    if (op === '÷') { const q = 2 + R(11); a = b * q; const hideA2 = R(2) === 0; return { type: 'missing', show: `${hideA2 ? '?' : a} ÷ ${hideA2 ? b : '?'} = ${q}`, answer: hideA2 ? a : b, options: nums(hideA2 ? a : b, 4) }; }
    if (op === '−' && b > a) [a, b] = [b, a];
    const c = op === '+' ? a + b : op === '−' ? a - b : a * b;
    const hideA = R(2) === 0;
    return { type: 'missing', show: `${hideA ? '?' : a} ${op} ${hideA ? b : '?'} = ${c}`, answer: hideA ? a : b, options: nums(hideA ? a : b, 3) };
  }

  /* ================= траса ================= */
  // runners: [{ id, name, avatar, step, done, place, trip, me }]
  function track(runners, { big = true, steps = STEPS } = {}) {
    const K = C(), { h } = K;
    const rows = runners.map(r => {
      const pos = 2 + (Math.min(r.step, steps) / steps) * 86;
      const cls = ['lr-runner', r.trip ? 'trip' : '', r.boost ? 'dash' : '', r.lead ? 'lead' : '', r.done ? 'done' : '', r.me ? 'me' : ''].filter(Boolean).join(' ');
      return h('div', { class: 'lr-lane' + (r.me ? ' me' : '') },
        h('div', { class: 'lr-tag' }, h('b', {}, r.name), h('small', {}, r.done ? '🏁 ' + r.place : `${Math.min(r.step, steps)}/${steps}`)),
        h('div', { class: 'lr-road' }, h('span', { class: 'lr-finish' }),
          h('div', { class: cls, style: { left: pos + '%' } }, r.lead ? h('span', { class: 'lr-crown' }, '👑') : null, AV(r.avatar, { size: big ? 64 : 40, mood: r.done ? 'cheer' : 'idle' }), h('span', { class: 'lr-dust' }))));
    });
    return h('div', { class: 'lr-track' + (big ? ' big' : ' mini') }, rows);
  }
  const rankOf = list => list.slice().sort((a, b) => (b.done - a.done) || (a.done && b.done ? a.place - b.place : 0) || (b.step - a.step) || (a.last - b.last));

  // кубик із крапками (символи ⚀–⚅ у багатьох шрифтах надто дрібні)
  function diceSvg(n) {
    const P = { 1: [[2, 2]], 2: [[1, 1], [3, 3]], 3: [[1, 1], [2, 2], [3, 3]], 4: [[1, 1], [3, 1], [1, 3], [3, 3]], 5: [[1, 1], [3, 1], [2, 2], [1, 3], [3, 3]], 6: [[1, 1], [3, 1], [1, 2], [3, 2], [1, 3], [3, 3]] }[n] || [];
    return `<svg viewBox="0 0 80 80" role="img" aria-label="${n}"><rect x="4" y="4" width="72" height="72" rx="16" fill="#fff" stroke="#10233a" stroke-width="5"/>` +
      P.map(([x, y]) => `<circle cx="${x * 18 + 4}" cy="${y * 18 + 4}" r="7.5" fill="${n === 1 ? '#ee4035' : '#10233a'}"/>`).join('') + '</svg>';
  }
  // аналоговий годинник для задач «Hva er klokka?»
  function clockSvg(hr, mm) {
    const a = (v, max) => (v / max) * 2 * Math.PI - Math.PI / 2;
    const ha = a((hr % 12) + mm / 60, 12), ma = a(mm, 60);
    let marks = '';
    for (let i = 1; i <= 12; i++) { const t = a(i, 12); marks += `<text x="${(60 + Math.cos(t) * 43).toFixed(1)}" y="${(64 + Math.sin(t) * 43).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="#141414">${i}</text>`; }
    return `<svg viewBox="0 0 120 120" width="150" height="150" role="img" aria-label="klokke"><circle cx="60" cy="60" r="55" fill="#fff" stroke="#141414" stroke-width="5"/>${marks}` +
      `<line x1="60" y1="60" x2="${(60 + Math.cos(ha) * 26).toFixed(1)}" y2="${(60 + Math.sin(ha) * 26).toFixed(1)}" stroke="#141414" stroke-width="7" stroke-linecap="round"/>` +
      `<line x1="60" y1="60" x2="${(60 + Math.cos(ma) * 40).toFixed(1)}" y2="${(60 + Math.sin(ma) * 40).toFixed(1)}" stroke="#ee4035" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="5" fill="#141414"/></svg>`;
  }

  /* ================= картка задачі (телефон / боти) ================= */
  function questionCard(q, onAnswer) {
    const K = C(), { h } = K;
    const [no, uk, en] = TITLES[q.type];
    let prompt;
    if (q.type === 'emoji') prompt = h('div', { class: 'lr-eqs' }, q.lines.map(([a, b, s, op]) => h('div', { class: 'lr-eq' }, h('span', { class: 'e' }, a), h('i', {}, op || '+'), h('span', { class: 'e' }, b), h('i', {}, '='), h('b', {}, s))),
      h('div', { class: 'lr-eq ask' }, h('span', { class: 'e' }, q.ask), h('i', {}, '='), h('b', { class: 'q' }, '?')));
    else if (q.type === 'pattern') prompt = h('div', { class: 'lr-pattern' }, q.row.map(e => h('span', {}, e)), h('span', { class: 'q' }, '?'));
    else if (q.type === 'count') prompt = [h('div', { class: 'lr-count-t' }, 'Hvor mange ', h('span', { class: 'big' }, q.target), '?'), h('div', { class: 'lr-grid' }, q.grid.map(e => h('span', {}, e)))];
    else if (q.type === 'odd' || q.type === 'bigger') prompt = null;
    else if (q.type === 'dice') { prompt = h('div', { class: 'lr-dice' }); prompt.innerHTML = q.dice.map(diceSvg).join(''); }
    else if (q.type === 'clock') { prompt = h('div', { class: 'lr-clock' }); prompt.innerHTML = clockSvg(q.clock[0], q.clock[1]); }
    else if (q.type === 'money') prompt = h('div', { class: 'lr-shop' }, h('div', { class: 'lr-pay' }, '💰 ', h('b', {}, `Du har ${q.pay} kr`)),
      q.items.map(([e, n, pr]) => h('div', { class: 'lr-item' }, h('span', { class: 'e' }, e), h('span', {}, n > 1 ? `${n} × ${pr} kr` : `${pr} kr`))));
    else if (q.type === 'machine') prompt = h('div', { class: 'lr-machine' }, q.pairs.map(([a, b]) => h('div', { class: 'lr-io' }, h('b', {}, a), h('i', {}, '⚙️ →'), h('b', {}, b))),
      h('div', { class: 'lr-io ask' }, h('b', {}, q.ask), h('i', {}, '⚙️ →'), h('b', { class: 'q' }, '?')));
    else if (q.type === 'latin') prompt = h('div', { class: 'lr-latin n' + q.grid.length }, q.grid.flat().map(e => h('span', { class: e === '?' ? 'q' : e ? '' : 'empty' }, e)));
    else prompt = h('div', { class: 'lr-show' }, q.show);
    const colors = ['c1', 'c2', 'c3', 'c4'], shapes = ['▲', '◆', '●', '■'];
    const opts = h('div', { class: 'lr-opts' }, q.options.map((o, i) => h('button', { class: 'lr-opt ' + colors[i], type: 'button', onclick: e => onAnswer(o, e.currentTarget) },
      h('i', { class: 'lr-shape' }, shapes[i]), h('span', { class: q.emoji ? 'emo' : '' }, String(o) + (q.unit || '')), q.words && q.words[o] ? h('small', {}, q.words[o]) : null)));
    return h('div', { class: 'lr-q' }, K.withTr(h('h3', {}, no), K.both(uk, en)), prompt, opts);
  }

  /* ================= гра на телефоні (з кімнатою або ботами) ================= */
  function playerGame(S, { seed, level, onProgress, onFinish, standings }) {
    const K = C(), { h } = K;
    const rand = mulberry32(seed);
    const G = { step: 0, correct: 0, wrong: 0, streak: 0, done: false, t0: Date.now(), lock: false, chest: false };
    const top = h('div', { class: 'lr-me-top' });
    const mini = h('div', { class: 'lr-mini' });
    const area = h('div', { class: 'lr-area' });
    S.ui.replaceChildren(h('div', { class: 'lr-phone' }, top, mini, area));
    const drawTop = () => {
      const pos = standings && standings();
      top.replaceChildren(...[AV(myAvatar(), { size: 46, mood: G.done ? 'cheer' : 'idle' }),
        h('div', { class: 'lr-bar' }, h('i', { style: { width: (G.step / STEPS * 100) + '%' } })),
        h('b', {}, `${G.step}/${STEPS}`), S.endsAt && !G.done ? h('span', { class: 'lr-left' + (S.endsAt - Date.now() < 15000 ? ' hurry' : '') }, tx('left', Math.max(0, Math.ceil((S.endsAt - Date.now()) / 1000)))) : null, pos ? h('span', { class: 'lr-pos' }, tx('your_pos', pos.place, pos.total)) : null, G.streak >= 2 ? h('span', { class: 'lr-streak' }, tx('streak', G.streak)) : null].filter(Boolean));
      if (pos && pos.runners) mini.replaceChildren(track(pos.runners, { big: false }));
    };
    let prevType = null;
    const next = () => {
      if (G.done) return;
      const q = makeQ(rand, level, prevType);
      prevType = q.type;
      area.replaceChildren(questionCard(q, (o, btn) => {
        if (G.lock || G.done) return;
        if (o === q.answer) {
          G.step++; G.correct++; G.streak++; btn.classList.add('good'); K.Sfx.good();
          if (G.step >= STEPS) { G.done = true; G.time = Date.now() - G.t0; }
          onProgress && onProgress(G, true);
          drawTop();
          if (G.streak === 5 && !G.chest && window.KomiksProfile) { G.chest = true; setTimeout(() => window.KomiksProfile.rewardModal(0.6), 300); }
          if (G.done) { onFinish && onFinish(G); return; }
          setTimeout(next, 250);
        } else {
          G.wrong++; G.streak = 0; G.lock = true; btn.classList.add('bad'); K.Sfx.bad();
          onProgress && onProgress(G, false);
          area.classList.add('trip'); const note = h('div', { class: 'lr-trip' }, tx('trip')); area.append(note);
          setTimeout(() => { G.lock = false; area.classList.remove('trip'); next(); }, TRIP);
          drawTop();
        }
      }));
    };
    drawTop(); next();
    G.redraw = drawTop;
    return G;
  }

  /* ================= сцена й меню ================= */
  function scene(cls = '') {
    const K = C(), { h } = K;
    const root = h('section', { class: 'lr ' + cls });
    const ui = h('div', { class: 'lr-ui' });
    root.append(h('div', { class: 'lr-sky', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), ui);
    document.body.classList.add('in-rocket');
    if (window.KomiksMusic) { root.append(window.KomiksMusic.button('lr-music')); window.KomiksMusic.bind(root, 'lobby'); }
    const S = { root, ui, timers: [] };
    // вихід з гри — завжди під рукою (на телефоні інших кнопок сайту не видно)
    if (cls) root.append(h('a', { class: 'cz-exit lr-exit', href: '#/race', title: '✕', 'aria-label': 'Exit', onclick: () => endSession() }, '✕'));
    const watch = setInterval(() => { if (!root.isConnected) { clearInterval(watch); if (!document.querySelector('section.lr')) document.body.classList.remove('in-rocket'); S.timers.forEach(t => clearInterval(t)); if (S.onLeave) S.onLeave(); } }, 500);
    return S;
  }
  function menu() {
    const K = C(), { h } = K;
    const S = scene();
    let level = K.store.get('raceLevel', 'easy');
    const draw = () => S.ui.replaceChildren(h('div', { class: 'lr-menu' },
      h('div', { class: 'lr-hero' }, h('div', { class: 'lr-hero-run' }, ['🦊', '🐼', '🐸', '🦁'].map((a, i) => h('span', { style: { animationDelay: (i * 0.2) + 's' } }, AV(i === 0 ? myAvatar() : a, { size: 76 })))), h('h1', {}, tx('title')), h('p', {}, tx('sub'))),
      h('div', { class: 'lr-levels' }, LEVELS.map(l => h('button', { class: 'lr-lv' + (l === level ? ' on' : ''), type: 'button', onclick: () => { level = l; K.store.set('raceLevel', l); draw(); } }, tx(l)))),
      h('p', { class: 'lr-lvd' }, tx('lvd')[level] || ''),
      cfgPickers(draw),
      h('div', { class: 'lr-choices' },
        h('a', { class: 'lr-choice', href: '#/race/host' }, h('b', {}, tx('class_btn')), h('small', {}, tx('class_d'))),
        h('a', { class: 'lr-choice', href: '#/race/bots' }, h('b', {}, tx('bots_btn')), h('small', {}, tx('bots_d')))),
      h('ul', { class: 'lr-how' }, tx('how').map(x => h('li', {}, x))),
      h('a', { class: 'lr-link', href: '#/' }, tx('back'))));
    draw();
    return S.root;
  }

  /* ================= гонка з ботами ================= */
  function bots(opp) {
    const K = C(), { h } = K;
    const S = scene('solo');
    const level = K.store.get('raceLevel', 'easy');
    useCfg(...savedCfg());
    const pool = (window.KomiksAvatars ? window.KomiksAvatars.list : ['🐼', '🐸', '🦁']).filter(a => a !== myAvatar().split('|')[0]);
    const bot = (name, i) => ({ id: 'b' + i, name, avatar: K.pick(pool) + '|' + K.pick(['cap', 'beanie', 'party', '', '']) + '|' + K.pick(['round', 'sun', '', '']), step: 0, done: false, place: 0, last: 0, speed: ({ easy: 5.2, medium: 4.4, hard: 3.6, expert: 3.0 }[level] || 4.4) + Math.random() * 2.2 });
    const me = { id: 'me', name: (K.currentUser() || {}).name || tx('you'), avatar: myAvatar(), step: 0, done: false, place: 0, last: 0, me: true };
    // суперники — віртуальні гравці зі своєю швидкістю й точністю; #/race/bots/<КОД> — змагання з конкретним гравцем
    const rivals = window.KomiksBots ? window.KomiksBots.opponents(3, level, opp) : null;
    const runners = [me, ...(rivals ? rivals.map((b, i) => ({ id: 'b' + i, name: b.name, avatar: b.avatar, step: 0, done: false, place: 0, last: 0, speed: b.speed, acc: b.acc })) : tx('bots').map(bot))];
    let places = 0, t0 = Date.now();
    const standings = () => { const r = rankOf(runners); r.forEach((x, i) => { x.lead = i === 0 && x.step > 0; }); return { place: r.indexOf(me) + 1, total: r.length, runners }; };
    let G;
    const countdown = h('div', { class: 'lr-count' }, '3');
    S.ui.append(countdown);
    let c = 3;
    const cd = setInterval(() => { c--; if (c > 0) { countdown.textContent = c; K.Sfx.tick(); } else { clearInterval(cd); countdown.textContent = tx('go'); setTimeout(() => countdown.remove(), 500); begin(); } }, 700);
    function begin() {
      t0 = Date.now(); S.endsAt = t0 + DURATION * 1000;
      if (window.KomiksMusic) window.KomiksMusic.play('race');
      G = playerGame(S, { seed: Math.floor(Math.random() * 1e9), level, standings,
        onProgress: g => { me.step = g.step; me.last = Date.now(); if (g.done && !me.done) { me.done = true; me.place = ++places; } },
        onFinish: () => { S.ui.querySelector('.lr-area').replaceChildren(h('div', { class: 'lr-wait' }, tx('done_wait'))); } });
      const tick = setInterval(() => {
        const now = Date.now();
        runners.filter(r => !r.me && !r.done).forEach(r => { if (now - (r.lastMove || t0) > r.speed * 1000 * (0.7 + Math.random() * 0.6)) { r.lastMove = now; if (Math.random() < (r.acc || 0.85)) { r.step++; r.last = now; r.boost = true; setTimeout(() => { r.boost = false; }, 400); if (r.step >= STEPS) { r.done = true; r.place = ++places; } } } });
        if (G) G.redraw();
        if (runners.every(r => r.done) || (me.done && runners.filter(r => !r.done).length === 0) || now - t0 > DURATION * 1000 || (me.done && runners.filter(r => r.done).length >= 3)) { clearInterval(tick); end(); }
      }, 300);
      S.timers.push(tick);
    }
    function end() {
      const rank = rankOf(runners);
      const board = rank.map(r => ({ pid: r.id, name: r.name, avatar: r.avatar, score: r.done ? `🏁 #${r.place}` : `${r.step}/${STEPS}` }));
      const myPlace = rank.indexOf(me) + 1;
      K.recordQuiz('race:' + level, tx('title') + ' · ' + tx(level), Math.min(me.step, STEPS), STEPS, { place: myPlace, of: rank.length });
      if (myPlace === 1) K.bump('raceWins');
      S.ui.replaceChildren(h('div', { class: 'lr-end' }, h('h2', {}, tx('results')),
        window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: 'me', you: tx('you'), fmt: v => v, place: (r, n) => tx('place', r, n), show: true }) : null,
        h('div', { class: 'row-center' }, h('button', { class: 'lr-btn primary', type: 'button', onclick: () => { const el = bots(opp); S.root.replaceWith(el); } }, tx('again')), h('a', { class: 'lr-btn', href: '#/race' }, tx('back')))));
      if (myPlace <= 3) { K.confetti(); K.Sfx.win(); }
      if (window.KomiksProfile) setTimeout(() => window.KomiksProfile.rewardModal(myPlace === 1 ? 1 : myPlace <= 3 ? 0.6 : 0.2), 2600);
    }
    return S.root;
  }

  /* ================= кімната: монітор ведучого ================= */
  let session = null;
  const endSession = () => { if (session) { try { session.destroy(); } catch { /* ignore */ } session = null; } };
  function host() {
    const K = C(), { h } = K;
    endSession();
    const S = scene('host');
    const R = { code: genCode(), players: new Map(), phase: 'creating', level: K.store.get('raceLevel', 'easy'), places: 0, feed: [] };
    session = R;
    S.onLeave = () => { if (session === R) endSession(); };
    const send = (p, m) => { if (p.conn && p.conn.open) { try { p.conn.send(m); } catch { /* ignore */ } } };
    const broadcast = m => R.players.forEach(p => send(p, m));
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: p.online }));
    R.destroy = () => { broadcast({ t: 'closed' }); setTimeout(() => { try { R.peer && R.peer.destroy(); } catch { /* ignore */ } }, 150); };
    let prevOrder = [];
    const feedEl = h('div', { class: 'lr-feed' });
    const toast = text => { const n = h('div', { class: 'lr-toast' }, text); feedEl.prepend(n); setTimeout(() => n.remove(), 3500); while (feedEl.children.length > 3) feedEl.lastChild.remove(); };
    const draw = () => {
      if (!S.root.isConnected) return;
      const url = baseUrl() + '#/race/join/' + R.code;
      if (R.phase === 'creating' || R.phase === 'error') { S.ui.replaceChildren(h('div', { class: 'lr-menu' }, h('h1', {}, tx('title')), h('p', {}, R.phase === 'error' ? tx('err_net') : '⏳ ' + tx('creating')), h('a', { class: 'lr-link', href: '#/race' }, tx('back')))); return; }
      if (R.phase === 'lobby') {
        const pl = [...R.players.values()];
        S.ui.replaceChildren(h('div', { class: 'lr-lobby' },
          h('div', { class: 'lr-card lr-qr-card' }, h('h2', {}, tx('title')), h('div', { class: 'lr-qr' }, K.svgEl(qrSvg(url))), h('p', {}, tx('scan')), h('code', {}, url), h('div', { class: 'lr-code' }, R.code), location.protocol === 'file:' ? h('p', { class: 'lr-warn' }, tx('local_warn')) : null),
          h('div', { class: 'lr-card' },
            h('div', { class: 'lr-levels' }, LEVELS.map(l => h('button', { class: 'lr-lv' + (l === R.level ? ' on' : ''), type: 'button', onclick: () => { R.level = l; K.store.set('raceLevel', l); draw(); } }, tx(l)))),
            cfgPickers(draw),
            h('h3', {}, tx('players', pl.filter(p => p.online).length)),
            pl.length ? h('div', { class: 'lr-startline' }, pl.map(p => h('div', { class: 'lr-starter' + (p.online ? '' : ' off') }, AV(p.avatar, { size: 72 }), h('b', {}, p.name)))) : h('p', {}, tx('waiting')),
            h('div', { class: 'row-center' }, h('button', { class: 'lr-btn primary', type: 'button', disabled: !pl.some(p => p.online), onclick: startRace }, tx('start')), h('a', { class: 'lr-btn', href: '#/race', onclick: endSession }, tx('close'))))));
        return;
      }
      const runners = [...R.players.values()].map(p => ({ id: p.pid, name: p.name, avatar: p.avatar, step: p.step || 0, done: !!p.done, place: p.place || 0, last: p.last || 0, trip: p.tripUntil > Date.now(), boost: p.boostUntil > Date.now() }));
      const rank = rankOf(runners); if (rank[0] && rank[0].step > 0) rank[0].lead = true;
      const left = R.phase === 'race' ? Math.max(0, Math.ceil((R.endsAt - Date.now()) / 1000)) : 0;
      if (R.phase === 'final') {
        const board = rank.map(r => ({ pid: r.id, name: r.name, avatar: r.avatar, score: r.done ? `🏁 #${r.place}` : `${r.step}/${STEPS}` }));
        S.ui.replaceChildren(h('div', { class: 'lr-end' }, h('h2', {}, tx('results')), window.KomiksAvatars ? window.KomiksAvatars.podium(board, { fmt: v => v, show: true }) : null,
          h('div', { class: 'row-center' }, h('button', { class: 'lr-btn primary', type: 'button', onclick: () => { R.phase = 'lobby'; if (window.KomiksMusic) window.KomiksMusic.play('lobby'); R.players.forEach(p => { p.step = 0; p.done = false; p.place = 0; }); broadcast({ t: 'lobby', players: list(), reset: true }); draw(); } }, tx('again')), h('a', { class: 'lr-btn', href: '#/race', onclick: endSession }, tx('close')))));
        return;
      }
      S.ui.replaceChildren(h('div', { class: 'lr-monitor' },
        h('div', { class: 'lr-top' }, h('b', { class: 'lr-logo' }, tx('title')), h('span', { class: 'lr-chip' }, tx(R.level)), h('span', { class: 'lr-chip time' + (left <= 10 ? ' hurry' : '') }, '⏱️ ' + left), h('span', { class: 'lr-chip' }, tx('code') + ': ' + R.code)),
        feedEl, track(runners)));
    };
    function startRace() {
      R.seed = Math.floor(Math.random() * 1e9); R.places = 0; prevOrder = [];
      R.players.forEach(p => { p.step = 0; p.done = false; p.place = 0; p.last = 0; });
      useCfg(...savedCfg());
      R.phase = 'race'; R.endsAt = Date.now() + 2100 + DURATION * 1000;
      broadcast({ t: 'start', seed: R.seed, level: R.level, steps: STEPS, dur: DURATION, startIn: 2100 });
      if (window.KomiksMusic) window.KomiksMusic.play('race');
      draw();
      const tick = setInterval(() => {
        if (R.phase !== 'race') { clearInterval(tick); return; }
        draw();
        // місця для телефонів: хто лідирує та міні-траса (лідер + сусіди)
        const runners = [...R.players.values()].map(p => ({ id: p.pid, name: p.name, avatar: p.avatar, step: p.step || 0, done: !!p.done, place: p.place || 0, last: p.last || 0 }));
        const rank = rankOf(runners);
        R.players.forEach(p => { const i = rank.findIndex(r => r.id === p.pid); const near = rank.filter((r, k) => k === 0 || Math.abs(k - i) <= 2).slice(0, 5).map(r => ({ id: r.id, name: r.name, avatar: r.avatar, step: r.step, done: r.done, place: r.place, lead: r === rank[0] && r.step > 0 })); send(p, { t: 'standings', place: i + 1, total: rank.length, near }); });
        if (Date.now() > R.endsAt + 1500 || (R.players.size && [...R.players.values()].filter(p => p.online).every(p => p.done))) finish();
      }, 500);
      S.timers.push(tick);
    }
    function finish() {
      if (R.phase !== 'race') return;
      R.phase = 'final';
      const runners = [...R.players.values()].map(p => ({ id: p.pid, name: p.name, avatar: p.avatar, fc: p.fc || '', step: p.step || 0, done: !!p.done, place: p.place || 0, last: p.last || 0 }));
      const rank = rankOf(runners);
      broadcast({ t: 'end', board: rank.map(r => ({ pid: r.id, name: r.name, avatar: r.avatar, score: r.done ? `🏁 #${r.place}` : `${r.step}/${STEPS}` })) });
      if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'race-' + R.code + '-' + Date.now().toString(36), topic: tx('title') + ' · ' + tx(R.level), total: STEPS, board: rank.map(r => ({ pid: r.id, name: r.name, avatar: r.avatar, fc: r.fc, score: r.done ? 1000 - r.place * 10 : r.step * 50, correct: r.step, answered: r.step })) });
      K.confetti(); K.Sfx.win(); draw();
    }
    const onMessage = (conn, m) => {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'hello') {
        const pid = String(m.pid || '').slice(0, 40); if (!pid) return;
        const ok = window.KomiksAvatars ? window.KomiksAvatars.valid(m.avatar) : true;
        const p = Object.assign(R.players.get(pid) || {}, { pid, name: String(m.name || '?').slice(0, 20), avatar: ok ? m.avatar : '🙂', conn, online: true, fc: /^[A-HJ-NP-Z2-9]{6}$/.test(m.fc || '') ? m.fc : '' });
        R.players.set(pid, p);
        send(p, { t: 'welcome' }); broadcast({ t: 'lobby', players: list() });
        if (R.phase === 'race') send(p, { t: 'start', seed: R.seed, level: R.level, steps: STEPS, dur: DURATION, startIn: 0 });
        K.Sfx.tick(); draw();
      } else if (m.t === 'prog') {
        const p = [...R.players.values()].find(x => x.conn === conn); if (!p || R.phase !== 'race') return;
        const before = rankOf([...R.players.values()].map(x => ({ id: x.pid, step: x.step || 0, done: !!x.done, place: x.place || 0, last: x.last || 0 }))).map(x => x.id);
        if (m.ok) p.boostUntil = Date.now() + 500; else p.tripUntil = Date.now() + TRIP;
        p.step = Math.min(STEPS, m.step | 0); p.last = Date.now();
        if (p.step >= STEPS && !p.done) { p.done = true; p.place = ++R.places; toast(tx('finished', p.name, p.place)); }
        const after = rankOf([...R.players.values()].map(x => ({ id: x.pid, step: x.step || 0, done: !!x.done, place: x.place || 0, last: x.last || 0 }))).map(x => x.id);
        const was = before.indexOf(p.pid), now = after.indexOf(p.pid);
        if (m.ok && now < was && after[now + 1]) { const other = R.players.get(after[now + 1]); if (other) toast(tx('overtake', p.name, other.name)); }
        draw();
      }
    };
    loadLibs().then(() => {
      const open = () => {
        R.peer = new window.Peer(PREFIX + R.code, { debug: 0 });
        R.peer.on('open', () => { R.phase = 'lobby'; draw(); });
        R.peer.on('error', err => { if (err.type === 'unavailable-id') { try { R.peer.destroy(); } catch { /* ignore */ } R.code = genCode(); open(); return; } if (R.phase === 'creating') { R.phase = 'error'; draw(); } });
        R.peer.on('connection', conn => { conn.on('data', m => onMessage(conn, m)); conn.on('close', () => { for (const p of R.players.values()) if (p.conn === conn) p.online = false; broadcast({ t: 'lobby', players: list() }); draw(); }); });
      };
      open();
    }).catch(() => { R.phase = 'error'; draw(); });
    draw();
    return S.root;
  }

  /* ================= кімната: телефон учня ================= */
  function join(code) {
    const K = C(), { h } = K;
    endSession();
    const S = scene('phone');
    let avatar = myAvatar();
    const saved = K.raw.get('comiks.gameProfile', {});
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: 5, value: (code || '').toUpperCase(), autocapitalize: 'characters', class: 'lr-input code' });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: 20, value: saved.name || (K.currentUser() || {}).name || '', class: 'lr-input' });
      const err = h('p', { class: 'lr-warn' });
      const avBox = window.KomiksProfile ? window.KomiksProfile.joinAvatar(a => { avatar = a; }) : null;
      S.ui.replaceChildren(h('div', { class: 'lr-menu' }, h('form', { class: 'lr-card lr-form', onsubmit: e => {
        e.preventDefault();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.textContent = tx('err_code'); return; }
        if (!n) { err.textContent = tx('err_name'); return; }
        K.raw.set('comiks.gameProfile', Object.assign({}, saved, { name: n, avatar }));
        connect(c, n);
      } }, h('h2', {}, tx('join_t')), h('label', {}, h('span', {}, tx('code')), codeIn), h('label', {}, h('span', {}, tx('name')), nameIn), avBox, err, h('button', { class: 'lr-btn primary', type: 'submit' }, tx('join')))));
    };
    const connect = (c, name) => {
      let pid; try { pid = sessionStorage.getItem('komiks.race.pid') || ('r' + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem('komiks.race.pid', pid); } catch { pid = 'r' + Math.random().toString(36).slice(2, 10); }
      const P = { phase: 'connecting', std: null, G: null };
      session = P;
      S.onLeave = () => { if (session === P) endSession(); };
      P.destroy = () => { try { P.conn && P.conn.close(); } catch { /* ignore */ } try { P.peer && P.peer.destroy(); } catch { /* ignore */ } };
      const status = (text, extra) => S.ui.replaceChildren(h('div', { class: 'lr-menu' }, h('div', { class: 'lr-card lr-wait-card' }, AV(avatar, { size: 120, mood: 'cheer' }), h('b', {}, name), h('p', {}, text), extra || null, h('a', { class: 'lr-link', href: '#/race', onclick: endSession }, tx('back')))));
      const send = m => { try { P.conn && P.conn.open && P.conn.send(m); } catch { /* ignore */ } };
      const fail = t => { if (session === P) { P.phase = 'error'; status(t); } };
      status('⏳ ' + tx('connecting'));
      loadLibs().then(() => {
        P.peer = new window.Peer({ debug: 0 });
        const guard = setTimeout(() => { if (P.phase === 'connecting') fail(tx('err_room')); }, 15000);
        P.peer.on('open', () => {
          P.conn = P.peer.connect(PREFIX + c, { reliable: true });
          P.conn.on('open', () => { clearTimeout(guard); send({ t: 'hello', pid, name, avatar, fc: window.KomiksPlayers ? window.KomiksPlayers.myPublicCode() : '' }); });
          P.conn.on('data', m => {
            if (!m || typeof m !== 'object') return;
            if (m.t === 'welcome' || (m.t === 'lobby' && (P.phase === 'connecting' || P.phase === 'lobby' || m.reset))) {
              P.phase = 'lobby';
              const pl = m.players || P.players || []; if (m.players) P.players = m.players;
              status(tx('wait_start'), h('div', {}, h('h3', {}, tx('in_room')), h('div', { class: 'lr-startline small' }, pl.map(p => h('div', { class: 'lr-starter' + (p.pid === pid ? ' me' : '') }, AV(p.avatar, { size: 48 }), h('b', {}, p.name))))));
            } else if (m.t === 'start') {
              useCfg(m.steps, m.dur); S.endsAt = Date.now() + (m.startIn || 0) + DURATION * 1000;
              P.phase = 'race'; P.level = m.level;
              if (window.KomiksMusic) window.KomiksMusic.play('race');
              const begin = () => { P.G = playerGame(S, { seed: m.seed, level: m.level, standings: () => P.std,
                onProgress: (g, ok) => send({ t: 'prog', step: g.step, ok }),
                onFinish: () => { const a = S.ui.querySelector('.lr-area'); if (a) a.replaceChildren(h('div', { class: 'lr-wait' }, tx('done_wait'))); } }); };
              if (m.startIn) { const cd = h('div', { class: 'lr-count' }, '3'); S.ui.replaceChildren(cd); let n = 3; const t = setInterval(() => { n--; if (n > 0) { cd.textContent = n; K.Sfx.tick(); } else { clearInterval(t); cd.textContent = tx('go'); setTimeout(begin, 400); } }, 700); } else begin();
            } else if (m.t === 'standings') {
              P.std = { place: m.place, total: m.total, runners: (m.near || []).map(r => Object.assign(r, { me: r.id === pid })) };
              if (P.G) P.G.redraw();
            } else if (m.t === 'end') {
              P.phase = 'end';
              const board = m.board || [], me = board.findIndex(b => b.pid === pid);
              S.ui.replaceChildren(h('div', { class: 'lr-end' }, h('h2', {}, tx('results')), window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: tx('you'), fmt: v => v, place: (r, n) => tx('place', r, n), show: true }) : null, h('a', { class: 'lr-btn', href: '#/race', onclick: endSession }, tx('back'))));
              if (me >= 0 && me < 3) { K.confetti(); K.Sfx.win(); }
              if (me === 0) K.bump('raceWins');
              // результат гонки в кімнаті — у профіль: пройдені кроки + місце
              if (me >= 0) { const steps = P.G ? Math.min(P.G.step, STEPS) : 0; K.recordQuiz('race:' + (P.level || 'easy'), tx('title') + ' · ' + tx(P.level || 'easy'), steps, STEPS, { place: me + 1, of: board.length, id: 'race-' + board.map(b => b.pid + b.score).join('|') }); K.bump('games'); }
              if (window.KomiksProfile) setTimeout(() => window.KomiksProfile.rewardModal(me === 0 ? 1 : me >= 0 && me < 3 ? 0.6 : 0.25), 2600);
            } else if (m.t === 'closed' || m.t === 'kick') fail(tx('host_left'));
          });
          P.conn.on('close', () => { if (P.phase !== 'error' && P.phase !== 'end') fail(tx('host_left')); });
        });
        P.peer.on('error', err => { clearTimeout(guard); fail(err.type === 'peer-unavailable' ? tx('err_room') : tx('err_net')); });
      }).catch(() => fail(tx('err_net')));
    };
    form();
    return S.root;
  }

  function render(id, arg) {
    if (id === 'host') return host();
    if (id === 'join') return join(arg);
    if (id === 'bots') return bots(arg && window.KomiksBots && window.KomiksBots.isBot(String(arg).toUpperCase()) ? String(arg).toUpperCase() : null);
    return menu();
  }
  // код відкритої кімнати на цьому моніторі — для запрошень друзям
  const roomCode = () => (session && session.code && (session.phase === 'lobby' || session.phase === 'race') ? session.code : null);
  window.KomiksRace = { render, makeQ, card: questionCard, text: tx, end: endSession, roomCode };
})();
