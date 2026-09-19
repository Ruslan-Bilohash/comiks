/* Комікс·Lab — 🚀 Math Rocket: анімована гра на canvas (паралакс зірок, астероїди з кратерами, ракета з полум’ям,
   лазер, вибухи з частинками, звуки WebAudio) + режим «З класом»: кімната з QR-кодом, усі грають одночасно
   на телефонах з однаковими прикладами (спільний seed), учитель бачить живий рейтинг.
   Маршрути: #/math/rocket (одиночна гра), #/math/race (ведучий), #/math/join/<КОД> (учасник). */
(() => {
  'use strict';
  const RX = {
    uk: {
      badge: 'НОВЕ · 60 секунд', title: 'Math Rocket', subtitle: 'Космічна гра на швидкість: збивай астероїд із правильною відповіддю, поки він не долетів до ракети.',
      play: '▶ Грати', dur: 'Тривалість раунду', durs: { 30: '30 с', 60: '1 хв', 90: '1,5 хв', 120: '2 хв' }, with_class: '👥 Грати з класом', levels: 'Обери рівень', tiny: ['🐣', 'Малюк', 'додавання й віднімання до 10, повільно'], expert: ['🟣', 'Експерт', 'усе разом, найшвидше + «? × 7 = 56»'], easy: ['🟢', 'Легко', 'додавання й віднімання до 20'], medium: ['🟡', 'Середньо', 'таблиця множення'], hard: ['🔴', 'Складно', '+ − × ÷ разом і швидше'],
      best: n => `Рекорд: ${n}`, how_title: 'Як грати', how: ['Торкнись астероїда з правильною відповіддю — ракета вистрілить.', 'Клавіші 1–4 теж стріляють (зліва направо).', 'Помилка або астероїд біля ракети — мінус 3 секунди.', 'Серія правильних відповідей збільшує множник ×5.'],
      back: '← До математики', phone: '📱 Відкрий гру на телефоні', score: 'Очки', combo: 'Серія', time: 'Час', level: 'Рівень',
      over: 'Політ завершено!', new_best: '🏆 Новий рекорд!', again: '🔄 Ще раз', change: '⚙️ Рівень', correct: 'Правильно', accuracy: 'Точність', avg: 'Сер. час', your_best: 'Рекорд',
      miss: '−3 с', go: 'Старт!', get_ready: 'Приготуйся…',
      race_title: '👥 Math Rocket з класом', race_intro: 'Покажи QR-код на екрані — учні сканують його телефонами й за мить у кімнаті. Усі отримують однакові приклади, а тут видно живий рейтинг.',
      scan: 'Скануй QR-код або відкрий посилання:', copy: '📋 Копіювати', copied: 'Скопійовано ✓', players: n => `Гравці: ${n}`, waiting_players: 'Чекаємо на гравців…',
      start: '🚀 Старт для всіх', need_players: 'Потрібен хоча б один гравець.', live: '📡 Живий рейтинг', final: '🏆 Результати', again_room: '🔄 Ще раунд', close: '✖ Закрити кімнату',
      join_title: '👥 Math Rocket з класом', name: 'Твоє ім’я', avatar: 'Аватар', join_go: 'Увійти ▶', code: 'Код кімнати', err_code: 'Введи код (5 символів).', err_name: 'Введи ім’я.',
      connecting: 'Підключення…', creating: 'Створюємо кімнату…', in_room: 'Ти в кімнаті!', wait_start: 'Чекай, доки вчитель натисне «Старт».', you: 'ти',
      done_wait: 'Час вийшов! Чекаємо на результати класу…', your_place: (r, n) => `Твоє місце: ${r} з ${n}`, host_left: 'Кімнату закрито або з’єднання втрачено.',
      err_room: 'Кімнату не знайдено. Перевір код.', err_net: 'Не вдалося з’єднатися. Потрібен інтернет.', local_warn: '⚠️ Сторінку відкрито з файлу — телефони не зможуть приєднатися. Відкрий гру на сайті.',
      kicked: 'Тебе прибрано з кімнати.', remove: 'Прибрати', points: 'очок'
    },
    en: {
      badge: 'NEW · 60 seconds', title: 'Math Rocket', subtitle: 'A space speed game: shoot the asteroid with the right answer before it reaches your rocket.',
      play: '▶ Play', dur: 'Round length', durs: { 30: '30 s', 60: '1 min', 90: '1.5 min', 120: '2 min' }, with_class: '👥 Play with the class', levels: 'Choose a level', tiny: ['🐣', 'Little one', 'adding and taking away to 10, slowly'], expert: ['🟣', 'Expert', 'everything mixed, fastest + “? × 7 = 56”'], easy: ['🟢', 'Easy', 'addition and subtraction to 20'], medium: ['🟡', 'Medium', 'times tables'], hard: ['🔴', 'Hard', '+ − × ÷ mixed and faster'],
      best: n => `Best: ${n}`, how_title: 'How to play', how: ['Tap the asteroid with the right answer — the rocket fires.', 'Keys 1–4 fire too (left to right).', 'A mistake or an asteroid near the rocket costs 3 seconds.', 'A streak of right answers raises the multiplier up to ×5.'],
      back: '← Back to maths', phone: '📱 Open the game on a phone', score: 'Score', combo: 'Streak', time: 'Time', level: 'Level',
      over: 'Flight over!', new_best: '🏆 New record!', again: '🔄 Play again', change: '⚙️ Level', correct: 'Correct', accuracy: 'Accuracy', avg: 'Avg time', your_best: 'Best',
      miss: '−3 s', go: 'Go!', get_ready: 'Get ready…',
      race_title: '👥 Math Rocket with the class', race_intro: 'Show the QR code on the screen — students scan it with their phones and join in seconds. Everyone gets the same sums and you see a live ranking here.',
      scan: 'Scan the QR code or open the link:', copy: '📋 Copy', copied: 'Copied ✓', players: n => `Players: ${n}`, waiting_players: 'Waiting for players…',
      start: '🚀 Start for everyone', need_players: 'At least one player is needed.', live: '📡 Live ranking', final: '🏆 Results', again_room: '🔄 Another round', close: '✖ Close the room',
      join_title: '👥 Math Rocket with the class', name: 'Your name', avatar: 'Avatar', join_go: 'Join ▶', code: 'Room code', err_code: 'Enter the code (5 characters).', err_name: 'Enter your name.',
      connecting: 'Connecting…', creating: 'Creating the room…', in_room: 'You are in the room!', wait_start: 'Wait for the teacher to press “Start”.', you: 'you',
      done_wait: 'Time is up! Waiting for the class results…', your_place: (r, n) => `Your place: ${r} of ${n}`, host_left: 'The room was closed or the connection was lost.',
      err_room: 'Room not found. Check the code.', err_net: 'Could not connect. An internet connection is required.', local_warn: '⚠️ The page is opened from a file — phones cannot join. Open the game on the website.',
      kicked: 'You were removed from the room.', remove: 'Remove', points: 'points'
    },
    no: {
      badge: 'NYTT · 60 sekunder', title: 'Matte-raketten', subtitle: 'Et romspill på tid: skyt asteroiden med riktig svar før den når raketten.',
      play: '▶ Spill', dur: 'Rundelengde', durs: { 30: '30 s', 60: '1 min', 90: '1,5 min', 120: '2 min' }, with_class: '👥 Spill med klassen', levels: 'Velg nivå', tiny: ['🐣', 'Liten', 'pluss og minus til 10, rolig'], expert: ['🟣', 'Ekspert', 'alt blandet, raskest + «? × 7 = 56»'], easy: ['🟢', 'Lett', 'pluss og minus til 20'], medium: ['🟡', 'Middels', 'gangetabellen'], hard: ['🔴', 'Vanskelig', '+ − × ÷ blandet og raskere'],
      best: n => `Rekord: ${n}`, how_title: 'Slik spiller du', how: ['Trykk på asteroiden med riktig svar – raketten skyter.', 'Tastene 1–4 skyter også (fra venstre).', 'Feil svar eller asteroide ved raketten koster 3 sekunder.', 'Mange riktige på rad gir opptil ×5.'],
      back: '← Til matte', phone: '📱 Åpne spillet på mobilen', score: 'Poeng', combo: 'Rekke', time: 'Tid', level: 'Nivå',
      over: 'Ferden er over!', new_best: '🏆 Ny rekord!', again: '🔄 Spill igjen', change: '⚙️ Nivå', correct: 'Riktige', accuracy: 'Treff', avg: 'Snitt-tid', your_best: 'Rekord',
      miss: '−3 s', go: 'Kjør!', get_ready: 'Gjør deg klar …',
      race_title: '👥 Matte-raketten med klassen', race_intro: 'Vis QR-koden på skjermen – elevene skanner den og er med på sekunder. Alle får de samme regnestykkene, og her ser du resultatlisten live.',
      scan: 'Skann QR-koden eller åpne lenken:', copy: '📋 Kopier', copied: 'Kopiert ✓', players: n => `Spillere: ${n}`, waiting_players: 'Venter på spillere …',
      start: '🚀 Start for alle', need_players: 'Minst én spiller trengs.', live: '📡 Live resultatliste', final: '🏆 Resultater', again_room: '🔄 Ny runde', close: '✖ Steng rommet',
      join_title: '👥 Matte-raketten med klassen', name: 'Navnet ditt', avatar: 'Avatar', join_go: 'Bli med ▶', code: 'Romkode', err_code: 'Skriv koden (5 tegn).', err_name: 'Skriv navnet ditt.',
      connecting: 'Kobler til …', creating: 'Lager rommet …', in_room: 'Du er i rommet!', wait_start: 'Vent til læreren trykker «Start».', you: 'deg',
      done_wait: 'Tiden er ute! Venter på resultatene …', your_place: (r, n) => `Din plass: ${r} av ${n}`, host_left: 'Rommet er stengt eller forbindelsen er brutt.',
      err_room: 'Fant ikke rommet. Sjekk koden.', err_net: 'Kunne ikke koble til. Du trenger internett.', local_warn: '⚠️ Siden er åpnet fra en fil – mobiler kan ikke bli med.',
      kicked: 'Du ble fjernet fra rommet.', remove: 'Fjern', points: 'poeng'
    }
  };
  RX.ar = {
    badge: 'جديد · 60 ثانية', title: 'Math Rocket', subtitle: 'لعبة سرعة فضائية: أسقط الكويكب ذا الإجابة الصحيحة قبل أن يصل إلى صاروخك.',
    play: '▶ العب', dur: 'مدة الجولة', durs: { 30: '30 ث', 60: '1 د', 90: '1.5 د', 120: '2 د' }, with_class: '👥 العب مع الصف', levels: 'اختر المستوى', tiny: ['🐣', 'صغير', 'الجمع والطرح حتى 10، ببطء'], expert: ['🟣', 'خبير', 'كل العمليات، الأسرع + «? × 7 = 56»'], easy: ['🟢', 'سهل', 'الجمع والطرح حتى 20'], medium: ['🟡', 'متوسط', 'جدول الضرب'], hard: ['🔴', 'صعب', '+ − × ÷ معًا وأسرع'],
    best: n => `الأفضل: ${n}`, how_title: 'كيف تلعب', how: ['اضغط على الكويكب ذي الإجابة الصحيحة — يطلق الصاروخ النار.', 'المفاتيح 1–4 تطلق النار أيضًا (من اليسار إلى اليمين).', 'الخطأ أو وصول الكويكب إلى الصاروخ يكلّفك 3 ثوانٍ.', 'الإجابات المتتالية ترفع المضاعِف حتى ×5.'],
    back: '→ إلى الرياضيات', phone: '📱 افتح اللعبة على الهاتف', score: 'النقاط', combo: 'السلسلة', time: 'الوقت', level: 'المستوى',
    over: 'انتهت الرحلة!', new_best: '🏆 رقم قياسي جديد!', again: '🔄 العب مجددًا', change: '⚙️ المستوى', correct: 'صحيحة', accuracy: 'الدقة', avg: 'متوسط الوقت', your_best: 'الأفضل',
    miss: '−3 ث', go: 'انطلق!', get_ready: 'استعد…',
    race_title: '👥 Math Rocket مع الصف', race_intro: 'اعرض رمز QR على الشاشة — يمسحه التلاميذ بهواتفهم وينضمّون خلال ثوانٍ. الجميع يحصلون على المسائل نفسها وترى هنا التصنيف مباشرة.',
    scan: 'امسح رمز QR أو افتح الرابط:', copy: '📋 نسخ', copied: 'تم النسخ ✓', players: n => `اللاعبون: ${n}`, waiting_players: 'في انتظار اللاعبين…',
    start: '🚀 ابدأ للجميع', need_players: 'يلزم لاعب واحد على الأقل.', live: '📡 التصنيف المباشر', final: '🏆 النتائج', again_room: '🔄 جولة أخرى', close: '✖ أغلق الغرفة',
    join_title: '👥 Math Rocket مع الصف', name: 'اسمك', avatar: 'الشخصية', join_go: 'انضم ▶', code: 'رمز الغرفة', err_code: 'اكتب الرمز (5 أحرف).', err_name: 'اكتب اسمك.',
    connecting: 'جارٍ الاتصال…', creating: 'جارٍ إنشاء الغرفة…', in_room: 'أنت في الغرفة!', wait_start: 'انتظر حتى يضغط المعلّم «ابدأ».', you: 'أنت',
    done_wait: 'انتهى الوقت! في انتظار نتائج الصف…', your_place: (r, n) => `مركزك: ${r} من ${n}`, host_left: 'أُغلقت الغرفة أو انقطع الاتصال.',
    err_room: 'لم يُعثر على الغرفة. تحقّق من الرمز.', err_net: 'تعذّر الاتصال. يلزم اتصال بالإنترنت.', local_warn: '⚠️ الصفحة مفتوحة من ملف — لن تتمكن الهواتف من الانضمام. افتح اللعبة على الموقع.',
    kicked: 'أُخرجت من الغرفة.', remove: 'إخراج', points: 'نقاط'
  };
  const C = () => window.KomiksCore;
  const rx = (k, ...a) => { const tbl = RX[C().ui] || RX.en || RX.uk; const v = k in tbl ? tbl[k] : (RX.en || RX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const SITE = 'https://bilohash.com/comiks/';
  const PREFIX = 'komiks-lab-rocket-';
  const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const AVATARS = ['🦊', '🐼', '🐸', '🦁', '🐧', '🐙', '🦄', '🐝', '🐢', '🐬', '🦉', '🐻', '🐯', '🐨', '🦖', '🐳'];
  const LEVELS = ['tiny', 'easy', 'medium', 'hard', 'expert'];
  const DURATION = 60;
  const DURS = [30, 60, 90, 120];
  const durOf = () => { const d = +C().store.get('mathDur', DURATION); return DURS.includes(d) ? d : DURATION; };
  // перемикач тривалості раунду
  function durPicker(cur, onPick) {
    const { h } = C();
    return h('div', { class: 'mr-dur', role: 'radiogroup', 'aria-label': rx('dur') }, h('span', {}, '⏱ ' + rx('dur')),
      DURS.map(d => h('button', { type: 'button', class: 'mr-dur-b' + (d === cur ? ' on' : ''), role: 'radio', 'aria-checked': String(d === cur), onclick: () => onPick(d) }, rx('durs')[d])));
  }
  const genCode = () => Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  const baseUrl = () => (location.protocol.startsWith('http') ? location.href.split('#')[0].split('?')[0] : SITE);
  const bestKey = lv => 'mathBest_' + lv;
  const bestOf = lv => C().store.get(bestKey(lv), 0);

  /* ---------------- бібліотеки (PeerJS, QR) ---------------- */
  let libs = null;
  function loadLibs() {
    if (libs) return libs;
    const v = (window.KOMIKS_DATA || {}).version || '';
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
    libs = Promise.all([window.Peer ? null : load('assets/vendor/peerjs.min.js'), window.qrcode ? null : load('assets/vendor/qrcode.js')]).catch(e => { libs = null; throw e; });
    return libs;
  }
  const qrSvg = url => { try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch { return ''; } };

  /* ---------------- приклади (однакові для всіх у кімнаті — спільний seed) ---------------- */
  const AV = (emoji, opts) => (window.KomiksAvatars ? window.KomiksAvatars.el(emoji, opts) : document.createTextNode(emoji));
  const mulberry32 = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function makeTask(rand, level, solved) {
    const R = n => Math.floor(rand() * (n + 1));
    const pickR = arr => arr[Math.floor(rand() * arr.length)];
    const ops = level === 'tiny' || level === 'easy' ? ['+', '−'] : level === 'medium' ? ['×'] : level === 'expert' ? ['×', '÷', '×', '÷', '+', '−'] : ['+', '−', '×', '÷'];
    // числа в межах, для яких є записане норвезьке озвучення (+ − до 20, × ÷ до 10×10); складність — швидкість, мікс і пропущене число
    const max = level === 'tiny' ? 10 : 20;
    const op = pickR(ops);
    let a, b, c;
    if (op === '+') { a = R(max); b = R(max - a); c = a + b; }
    else if (op === '−') { a = R(max); b = R(a); c = a - b; }
    else if (op === '×') { a = 1 + R(9); b = 1 + R(9); c = a * b; }
    else { b = 1 + R(9); c = 1 + R(9); a = b * c; }
    const opts = new Set([c]);
    const deltas = op === '×' || op === '÷' ? [-10, -a, -b, -1, 1, a, b, 10, 2, -2] : [-10, -3, -2, -1, 1, 2, 3, 10];
    for (let g = 0; opts.size < 4 && g < 60; g++) { const v = c + pickR(deltas.filter(Boolean)); if (v >= 0) opts.add(v); }
    for (let v = c + 4; opts.size < 4; v++) opts.add(v);
    const options = [...opts];
    for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
    const phrase = window.KomiksMath ? window.KomiksMath.phrase(a, op, b, c) : `${a} ${op} ${b} = ${c}`;
    // експерт: кожен третій приклад — з пропущеним числом («? × 7 = 56»); після влучання звучить увесь приклад
    if (level === 'expert' && rand() < 0.35) {
      const hideA = rand() < 0.5, miss = hideA ? a : b;
      const mo = new Set([miss]);
      for (let g = 0; mo.size < 4 && g < 60; g++) { const v = miss + pickR([-3, -2, -1, 1, 2, 3, 5]); if (v >= 1) mo.add(v); }
      for (let v = miss + 4; mo.size < 4; v++) mo.add(v);
      const mOpts = [...mo];
      for (let i = mOpts.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [mOpts[i], mOpts[j]] = [mOpts[j], mOpts[i]]; }
      return { a, op, b, answer: miss, options: mOpts, text: `${hideA ? '?' : a} ${op} ${hideA ? b : '?'}`, full: `${hideA ? '?' : a} ${op} ${hideA ? b : '?'} = ${c}`, say: phrase, ask: '' };
    }
    return { a, op, b, answer: c, options, text: `${a} ${op} ${b}`, say: phrase, ask: window.KomiksMath && window.KomiksMath.ask ? window.KomiksMath.ask(a, op, b) : '' };
  }

  /* ---------------- звуки ---------------- */
  let ac = null;
  const audio = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch { ac = null; } } if (ac && ac.state === 'suspended') ac.resume(); return ac; };
  function zap() {
    const a = audio(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
    o.type = 'sawtooth'; o.frequency.setValueAtTime(1500, t); o.frequency.exponentialRampToValueAtTime(240, t + 0.14);
    g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.18);
  }
  function boom(big = 1) {
    const a = audio(); if (!a) return;
    const t = a.currentTime, len = 0.5 * big;
    const buf = a.createBuffer(1, Math.floor(a.sampleRate * len), a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    const src = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    src.buffer = buf; f.type = 'lowpass'; f.frequency.setValueAtTime(1600, t); f.frequency.exponentialRampToValueAtTime(90, t + len);
    g.gain.setValueAtTime(0.28, t); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(f).connect(g).connect(a.destination); src.start(t);
  }
  function buzz() {
    const a = audio(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
    o.type = 'square'; o.frequency.setValueAtTime(140, t); o.frequency.linearRampToValueAtTime(80, t + 0.25);
    g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + 0.3);
  }

  /* ================= рушій (canvas) ================= */
  function createEngine(canvas, hooks = {}) {
    const g = canvas.getContext('2d');
    const E = { mode: 'idle', W: 0, H: 0, S: 1, t: 0, stars: [], rocks: [], lasers: [], parts: [], rings: [], pops: [], shake: 0, flash: 0, flashRGB: '255,255,255', warp: 1,
      ship: { x: 0, y: 0, tx: 0, tilt: 0, boost: 0, shield: 0 }, task: null, fall: 60, raf: 0, last: 0, running: false };
    let neb = null;
    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      E.W = Math.max(320, r.width); E.H = Math.max(400, r.height);
      canvas.width = Math.round(E.W * dpr); canvas.height = Math.round(E.H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      E.S = Math.max(0.8, Math.min(1.6, Math.min(E.W, E.H * 1.2) / 700));
      E.ship.y = E.H - 90 * E.S; if (!E.ship.x || E.ship.x > E.W) { E.ship.x = E.W / 2; E.ship.tx = E.W / 2; }
      // туманність — малюємо один раз на розмір
      neb = document.createElement('canvas'); neb.width = Math.round(E.W); neb.height = Math.round(E.H);
      const n = neb.getContext('2d');
      const bg = n.createLinearGradient(0, 0, 0, E.H); bg.addColorStop(0, '#030615'); bg.addColorStop(0.55, '#07102b'); bg.addColorStop(1, '#10143d'); n.fillStyle = bg; n.fillRect(0, 0, E.W, E.H);
      [[0.18, 0.22, 0.55, '0,229,255', 0.16], [0.82, 0.35, 0.5, '255,60,172', 0.14], [0.55, 0.85, 0.6, '120,75,255', 0.2], [0.1, 0.8, 0.35, '255,209,102', 0.07]].forEach(([x, y, rr, col, al]) => {
        const gr = n.createRadialGradient(E.W * x, E.H * y, 0, E.W * x, E.H * y, Math.max(E.W, E.H) * rr);
        gr.addColorStop(0, `rgba(${col},${al})`); gr.addColorStop(1, `rgba(${col},0)`); n.fillStyle = gr; n.fillRect(0, 0, E.W, E.H);
      });
      if (!E.stars.length) for (let i = 0; i < 180; i++) E.stars.push({ x: Math.random() * E.W, y: Math.random() * E.H, z: [0.25, 0.55, 1][i % 3], tw: Math.random() * 6 });
    }
    function rockShape(r) {
      const n = 11 + Math.floor(Math.random() * 5), verts = [];
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = r * (0.8 + Math.random() * 0.28); verts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
      const craters = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({ x: (Math.random() - 0.5) * r * 1.1, y: (Math.random() - 0.5) * r * 1.1, r: r * (0.1 + Math.random() * 0.16) }));
      const hue = [[120, 104, 90], [104, 96, 110], [130, 110, 84], [96, 108, 118]][Math.floor(Math.random() * 4)];
      return { verts, craters, hue };
    }
    // travel — скільки секунд астероїд летить до ракети (не залежить від розміру екрана)
    function spawnTask(task, travel) {
      if (!E.W || !E.H) resize();
      E.task = task; E.fall = travel;
      E.rocks.forEach(r => { if (!r.fade) r.fade = 0.001; });
      const n = task.options.length, lane = E.W / n;
      const r0 = Math.min(lane * 0.36, 64 * E.S, E.H * 0.09);
      task.options.forEach((v, i) => {
        const r = r0 * (0.92 + Math.random() * 0.16);
        const top = Math.max(150, E.H * 0.2) + r;
        E.rocks.push(Object.assign({ born: E.t + i * 0.07, x: lane * (i + 0.5) + (Math.random() - 0.5) * lane * 0.2, y: top + Math.random() * E.H * 0.06, vx: (Math.random() - 0.5) * 10, vy: 0,
          r, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.9, value: v, correct: v === task.answer, hit: 0, fade: 0, dead: false, slot: i, task }, rockShape(r)));
        const rock = E.rocks[E.rocks.length - 1], dangerY = E.ship.y - 50 * E.S;
        rock.vy = Math.max(12, (dangerY - (rock.y + rock.r)) / (travel * (0.92 + Math.random() * 0.16)));
      });
    }
    function decor() { // астероїди-декорації для меню
      if (E.rocks.length > 5) return;
      const r = (18 + Math.random() * 40) * E.S;
      E.rocks.push(Object.assign({ x: Math.random() * E.W, y: -r, vx: (Math.random() - 0.5) * 20, vy: 18 + Math.random() * 30, r, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.6, value: null, correct: false, hit: 0, fade: 0, dead: false, decor: true }, rockShape(r)));
    }
    function burst(x, y, r, colors, n, speed) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, v = speed * (0.3 + Math.random());
        E.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: 0.5 + Math.random() * 0.7, size: (1.5 + Math.random() * 3.5) * E.S, color: colors[i % colors.length], glow: colors === SPARK });
      }
    }
    const SPARK = ['#fff6d5', '#ffd166', '#ff9f1c', '#ffffff'];
    function explode(rock) {
      rock.dead = true;
      burst(rock.x, rock.y, rock.r, SPARK, 46, 360 * E.S);
      burst(rock.x, rock.y, rock.r, [`rgb(${rock.hue.join(',')})`, '#5c5048', '#3b322c'], 26, 220 * E.S);
      E.rings.push({ x: rock.x, y: rock.y, r: rock.r * 0.4, life: 0, max: 0.45 });
      E.shake = Math.max(E.shake, 8); E.flash = 0.22; E.flashRGB = '255,240,200';
      boom(rock.r > 50 ? 1.2 : 1);
    }
    function fire(rock) {
      const s = E.ship;
      s.tx = Math.max(40, Math.min(E.W - 40, rock.x));
      E.lasers.push({ x1: s.x, y1: s.y - 40 * E.S, x2: rock.x, y2: rock.y, life: 0, max: 0.2, good: rock.correct });
      s.boost = 1; zap();
      if (rock.correct) explode(rock);
      else { rock.hit = 1; E.shake = 14; E.flash = 0.3; E.flashRGB = '255,60,90'; buzz(); }
    }
    function pop(x, y, text, color) { E.pops.push({ x, y, text, color, life: 0, max: 1 }); }
    function hitTest(px, py) {
      let best = null;
      for (const r of E.rocks) { if (r.dead || r.fade || r.decor) continue; const d = Math.hypot(px - r.x, py - r.y); if (d < r.r * 1.2 && (!best || d < best.d)) best = { r, d }; }
      return best && best.r;
    }
    function drawRock(r) {
      g.save(); g.translate(r.x, r.y);
      // поява: астероїд «вилітає» з глибини космосу
      const age = r.born != null ? E.t - r.born : 1;
      if (age < 0) { g.restore(); return; }
      if (age < 0.35) { const k = age / 0.35, e = 1 - Math.pow(1 - k, 3); g.scale(0.2 + 0.8 * e, 0.2 + 0.8 * e); }
      const alpha = (r.fade ? Math.max(0, 1 - r.fade / 0.45) : 1) * (age < 0.35 ? Math.min(1, age / 0.2) : 1);
      g.globalAlpha = alpha;
      g.save(); g.rotate(r.rot);
      // тінь-сяйво
      g.shadowColor = r.hit ? 'rgba(255,60,90,.9)' : 'rgba(0,229,255,.25)'; g.shadowBlur = r.hit ? 26 : 14;
      const [cr, cg, cb] = r.hue;
      const gr = g.createRadialGradient(-r.r * 0.35, -r.r * 0.4, r.r * 0.1, 0, 0, r.r * 1.1);
      gr.addColorStop(0, `rgb(${cr + 70},${cg + 64},${cb + 56})`); gr.addColorStop(0.55, `rgb(${cr},${cg},${cb})`); gr.addColorStop(1, `rgb(${cr * 0.35 | 0},${cg * 0.35 | 0},${cb * 0.38 | 0})`);
      g.fillStyle = r.hit ? '#ff4d6d' : gr;
      g.beginPath(); r.verts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill();
      g.shadowBlur = 0;
      // кратери
      for (const c of r.craters) {
        const cg2 = g.createRadialGradient(c.x + c.r * 0.3, c.y + c.r * 0.3, 0, c.x, c.y, c.r);
        cg2.addColorStop(0, 'rgba(0,0,0,.45)'); cg2.addColorStop(0.8, 'rgba(0,0,0,.2)'); cg2.addColorStop(1, 'rgba(255,255,255,.08)');
        g.fillStyle = cg2; g.beginPath(); g.arc(c.x, c.y, c.r, 0, Math.PI * 2); g.fill();
      }
      // світловий край
      g.strokeStyle = 'rgba(255,230,200,.25)'; g.lineWidth = 2; g.beginPath(); r.verts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.stroke();
      g.restore();
      if (r.value != null) {
        const fs = Math.round(r.r * (String(r.value).length > 2 ? 0.5 : 0.62));
        g.font = `900 ${fs}px Rubik, system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.lineWidth = Math.max(3, fs * 0.16); g.strokeStyle = 'rgba(5,8,22,.85)'; g.strokeText(String(r.value), 0, 2);
        g.fillStyle = '#ffffff'; g.fillText(String(r.value), 0, 2);
      }
      g.restore();
    }
    function drawShip() {
      const s = E.ship, S = E.S;
      g.save(); g.translate(s.x, s.y + Math.sin(E.t * 2.2) * 3 * S); g.rotate(s.tilt); g.scale(S * 1.35, S * 1.35);
      // полум’я
      const fl = 22 + Math.sin(E.t * 38) * 4 + Math.random() * 3 + s.boost * 16;
      const fg = g.createLinearGradient(0, 18, 0, 18 + fl);
      fg.addColorStop(0, 'rgba(255,255,230,1)'); fg.addColorStop(0.3, 'rgba(255,196,70,.95)'); fg.addColorStop(0.7, 'rgba(255,90,30,.6)'); fg.addColorStop(1, 'rgba(255,40,0,0)');
      g.globalCompositeOperation = 'lighter';
      g.fillStyle = fg; g.beginPath(); g.moveTo(-8, 18); g.quadraticCurveTo(0, 18 + fl * 1.25, 8, 18); g.closePath(); g.fill();
      g.globalCompositeOperation = 'source-over';
      // стабілізатори
      g.fillStyle = '#d62839';
      g.beginPath(); g.moveTo(-10, 4); g.lineTo(-22, 22); g.lineTo(-9, 19); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(10, 4); g.lineTo(22, 22); g.lineTo(9, 19); g.closePath(); g.fill();
      // корпус
      const bg = g.createLinearGradient(-13, 0, 13, 0); bg.addColorStop(0, '#8391a6'); bg.addColorStop(0.45, '#ffffff'); bg.addColorStop(1, '#6f7c90');
      g.fillStyle = bg; g.beginPath(); g.moveTo(0, -34); g.bezierCurveTo(13, -20, 13, 8, 10, 20); g.lineTo(-10, 20); g.bezierCurveTo(-13, 8, -13, -20, 0, -34); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1; g.stroke();
      // ніс
      g.fillStyle = '#d62839'; g.beginPath(); g.moveTo(0, -34); g.bezierCurveTo(6, -28, 8.5, -23, 9, -19); g.lineTo(-9, -19); g.bezierCurveTo(-8.5, -23, -6, -28, 0, -34); g.fill();
      // ілюмінатор
      g.fillStyle = '#0b2545'; g.beginPath(); g.arc(0, -5, 6.4, 0, Math.PI * 2); g.fill();
      const wg = g.createRadialGradient(-1.5, -7, 0.5, 0, -5, 5); wg.addColorStop(0, '#bdf4ff'); wg.addColorStop(1, '#1ba3c9');
      g.fillStyle = wg; g.beginPath(); g.arc(0, -5, 4.6, 0, Math.PI * 2); g.fill();
      // щит після помилки
      if (s.shield > 0) { g.strokeStyle = `rgba(255,70,110,${s.shield})`; g.lineWidth = 3; g.beginPath(); g.arc(0, -4, 34, 0, Math.PI * 2); g.stroke(); }
      g.restore();
    }
    function step(dt) {
      E.t += dt;
      const s = E.ship;
      s.x += (s.tx - s.x) * Math.min(1, dt * 6); s.tilt = Math.max(-0.35, Math.min(0.35, (s.tx - s.x) / 300));
      s.boost = Math.max(0, s.boost - dt * 3); s.shield = Math.max(0, s.shield - dt * 1.5);
      // частинки вихлопу
      if (Math.random() < 0.9) E.parts.push({ x: s.x + (Math.random() - 0.5) * 8 * E.S, y: s.y + 30 * E.S, vx: (Math.random() - 0.5) * 30, vy: 120 + Math.random() * 90, life: 0, max: 0.35 + Math.random() * 0.3, size: (2 + Math.random() * 3) * E.S, color: ['#ffd166', '#ff9f1c', '#ff5d3a'][Math.floor(Math.random() * 3)], glow: true });
      const warp = E.warp * (1 + s.boost);
      for (const st of E.stars) { st.y += (26 + 190 * st.z * st.z) * warp * dt; if (st.y > E.H) { st.y = -4; st.x = Math.random() * E.W; } }
      for (const r of E.rocks) {
        if (r.born != null && E.t < r.born) continue;
        r.x += r.vx * dt; r.y += r.vy * dt; r.rot += r.vr * dt;
        if (r.hit) r.hit = Math.max(0, r.hit - dt * 2.5);
        if (r.fade) { r.fade += dt; r.vy *= 0.97; }
        if (r.x < r.r) r.vx = Math.abs(r.vx); if (r.x > E.W - r.r) r.vx = -Math.abs(r.vx);
      }
      if (E.mode === 'play' && E.task) {
        const danger = E.rocks.find(r => r.task === E.task && r.correct && !r.dead && !r.fade && r.y + r.r > s.y - 50 * E.S);
        if (danger && hooks.onMiss) hooks.onMiss(danger);
      }
      E.rocks = E.rocks.filter(r => !r.dead && !(r.fade && r.fade > 0.45) && r.y < E.H + r.r * 2);
      if (E.mode === 'idle' && Math.random() < dt * 0.8) decor();
      for (const p of E.parts) { p.life += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.985; p.vy *= 0.985; }
      E.parts = E.parts.filter(p => p.life < p.max);
      for (const l of E.lasers) l.life += dt; E.lasers = E.lasers.filter(l => l.life < l.max);
      for (const r of E.rings) r.life += dt; E.rings = E.rings.filter(r => r.life < r.max);
      for (const p of E.pops) { p.life += dt; p.y -= 50 * dt; } E.pops = E.pops.filter(p => p.life < p.max);
      E.shake *= Math.pow(0.02, dt); E.flash = Math.max(0, E.flash - dt * 1.4);
    }
    function draw() {
      const { W, H } = E;
      g.save();
      if (E.shake > 0.3) g.translate((Math.random() - 0.5) * E.shake, (Math.random() - 0.5) * E.shake);
      if (neb) g.drawImage(neb, 0, 0, W, H);
      // зорі (дальні — точки, ближні — штрихи)
      for (const st of E.stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(E.t * 1.3 + st.tw)) * st.z;
        g.fillStyle = `rgba(255,255,255,${a})`;
        const len = st.z > 0.9 ? 2 + 10 * E.warp * (1 + E.ship.boost) : 0;
        if (len > 3) { g.fillRect(st.x, st.y - len, 1.6, len); } else { g.fillRect(st.x, st.y, 1.4 * st.z + 0.6, 1.4 * st.z + 0.6); }
      }
      for (const r of E.rocks) drawRock(r);
      // лазери
      g.globalCompositeOperation = 'lighter';
      for (const l of E.lasers) {
        const k = 1 - l.life / l.max;
        g.strokeStyle = l.good ? `rgba(125,249,255,${k})` : `rgba(255,90,120,${k})`; g.lineWidth = 5 * E.S * k + 1; g.shadowColor = l.good ? '#7df9ff' : '#ff5a78'; g.shadowBlur = 20;
        g.beginPath(); g.moveTo(l.x1, l.y1); g.lineTo(l.x2, l.y2); g.stroke();
        g.strokeStyle = `rgba(255,255,255,${k})`; g.lineWidth = 1.5; g.beginPath(); g.moveTo(l.x1, l.y1); g.lineTo(l.x2, l.y2); g.stroke();
      }
      g.shadowBlur = 0;
      for (const p of E.parts) {
        const k = 1 - p.life / p.max;
        g.globalAlpha = k; g.fillStyle = p.color;
        g.beginPath(); g.arc(p.x, p.y, p.size * (p.glow ? k + 0.3 : 1), 0, Math.PI * 2); g.fill();
      }
      g.globalAlpha = 1;
      for (const r of E.rings) {
        const k = r.life / r.max;
        g.strokeStyle = `rgba(255,220,150,${1 - k})`; g.lineWidth = 6 * (1 - k) + 1;
        g.beginPath(); g.arc(r.x, r.y, r.r + k * 110 * E.S, 0, Math.PI * 2); g.stroke();
      }
      g.globalCompositeOperation = 'source-over';
      drawShip();
      for (const p of E.pops) {
        const k = 1 - p.life / p.max;
        g.globalAlpha = Math.min(1, k * 1.6);
        g.font = `900 ${Math.round(26 * E.S)}px Rubik, system-ui, sans-serif`; g.textAlign = 'center';
        g.lineWidth = 5; g.strokeStyle = 'rgba(5,8,22,.9)'; g.strokeText(p.text, p.x, p.y); g.fillStyle = p.color; g.fillText(p.text, p.x, p.y);
      }
      g.globalAlpha = 1;
      g.restore();
      if (E.flash > 0) { g.fillStyle = `rgba(${E.flashRGB},${E.flash})`; g.fillRect(0, 0, W, H); }
    }
    function loop(now) {
      if (!E.running) return;
      if (!canvas.isConnected) { E.running = false; if (E.ro) E.ro.disconnect(); if (hooks.onDetach) hooks.onDetach(); return; }
      const dt = Math.min(0.05, (now - (E.last || now)) / 1000); E.last = now;
      if (!document.hidden) { step(dt); draw(); }
      E.raf = requestAnimationFrame(loop);
    }
    function start() { if (E.running) return; E.running = true; E.last = 0; resize(); E.raf = requestAnimationFrame(loop); }
    // розмір полотна відстежуємо постійно (поворот телефона, зміна вікна, перший показ)
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (canvas.isConnected) resize(); }); ro.observe(canvas); E.ro = ro; }
    function stop() { E.running = false; cancelAnimationFrame(E.raf); if (E.ro) E.ro.disconnect(); }
    function clearRocks() { E.rocks.forEach(r => { if (!r.fade) r.fade = 0.001; }); E.task = null; }
    return { E, start, stop, resize, spawnTask, fire, hitTest, pop, clearRocks, explode };
  }

  /* ================= одна сцена: canvas + шар інтерфейсу ================= */
  function scene() {
    const K = C(), { h } = K;
    const root = h('section', { class: 'mr' });
    const canvas = h('canvas', { class: 'mr-canvas', 'aria-hidden': 'true' });
    const ui = h('div', { class: 'mr-ui' });
    root.append(canvas, ui);
    const S = { root, canvas, ui, cleanup: [] };
    root.__mr = S; // для діагностики в консолі
    S.engine = createEngine(canvas, {
      onMiss: rock => S.onMiss && S.onMiss(rock),
      onDetach: () => { if (!document.querySelector('section.lr')) document.body.classList.remove('in-rocket'); S.cleanup.forEach(f => { try { f(); } catch { /* ignore */ } }); }
    });
    const onResize = () => S.engine.resize();
    window.addEventListener('resize', onResize);
    S.cleanup.push(() => window.removeEventListener('resize', onResize));
    document.body.classList.add('in-rocket');
    if (window.KomiksMusic) { root.append(window.KomiksMusic.button('mr-music')); window.KomiksMusic.bind(root, 'space'); }
    const boot = () => { if (root.isConnected) S.engine.start(); else requestAnimationFrame(boot); };
    setTimeout(boot, 0);
    return S;
  }

  /* ================= гра (одиночна або в кімнаті) ================= */
  // endAt — спільний для кімнати момент завершення (локальний час); без нього — 60 с після відліку
  function runGame(S, { level, seed, onScore, onEnd, practice = true, endAt = 0, dur = DURATION }) {
    const K = C(), { h } = K;
    const E = S.engine.E;
    const rand = mulberry32(seed || Math.floor(Math.random() * 1e9));
    const G = { score: 0, combo: 1, correct: 0, wrong: 0, times: [], end: 0, taskAt: 0, over: false, locked: false };
    const scoreEl = h('b', {}, '0'), comboEl = h('b', {}, '×1'), timeFill = h('i'), timeTxt = h('b', {}, dur), expr = h('div', { class: 'mr-expr' });
    const quit = h('button', { class: 'mr-x', type: 'button', 'aria-label': 'Exit', onclick: () => { G.over = true; clearInterval(G.timer); onEnd && onEnd(G, true); } }, '✕');
    // пілот — твій аватар
    const pilot = window.KomiksProfile && window.KomiksAvatars ? h('span', { class: 'mr-pilot' }, window.KomiksAvatars.el(window.KomiksProfile.avatar(), { size: 52 })) : null;
    S.ui.replaceChildren(
      h('div', { class: 'mr-hud' }, pilot,
        h('span', { class: 'mr-chip' }, h('small', {}, rx('score')), scoreEl),
        h('span', { class: 'mr-chip combo' }, h('small', {}, rx('combo')), comboEl),
        h('span', { class: 'mr-chip time' }, h('small', {}, rx('time')), timeTxt),
        quit),
      h('div', { class: 'mr-timebar' }, timeFill),
      expr);
    // час польоту астероїда: малюк 14 с, легко 11, середньо 10, складно 8, експерт 7; швидшає з кожною правильною відповіддю
    const fallSpeed = () => Math.max(level === 'tiny' ? 8 : 3.5, ({ tiny: 14, easy: 11, medium: 10, hard: 8, expert: 7 }[level] || 10) - G.correct * (level === 'hard' || level === 'expert' ? 0.22 : level === 'tiny' ? 0.1 : 0.16));
    const next = () => {
      if (G.over) return;
      const t = makeTask(rand, level, G.correct);
      G.task = t; G.taskAt = performance.now(); G.locked = false;
      expr.textContent = t.full || `${t.text} = ?`; expr.classList.remove('bump'); void expr.offsetWidth; expr.classList.add('bump');
      S.engine.spawnTask(t, fallSpeed());
    };
    const penalty = (x, y) => {
      G.end -= 3000; G.combo = 1; G.wrong++;
      E.ship.shield = 1;
      S.engine.pop(x, y, rx('miss'), '#ff6b88');
      comboEl.textContent = '×1';
      onScore && onScore(G);
    };
    const shoot = rock => {
      if (G.over || G.locked || !rock || rock.task !== G.task) return;
      S.engine.fire(rock);
      if (rock.correct) {
        G.locked = true;
        const secs = (performance.now() - G.taskAt) / 1000;
        const pts = 10 * G.combo + Math.max(0, Math.round((6 - secs) * 2));
        G.score += pts; G.correct++; G.times.push(secs); G.combo = Math.min(5, G.combo + 1);
        S.engine.pop(rock.x, rock.y - rock.r, '+' + pts, '#7df9ff');
        scoreEl.textContent = G.score; comboEl.textContent = '×' + G.combo;
        scoreEl.parentNode.classList.remove('mr-hit'); void scoreEl.offsetWidth; scoreEl.parentNode.classList.add('mr-hit');
        // фразу беремо зараз: за 420 мс G.task уже буде наступним прикладом
        const said = G.task.say;
        K.claim().then(() => K.Speech.speak(said, 'narrator', { rate: 1.05 }));
        onScore && onScore(G);
        setTimeout(() => { S.engine.clearRocks(); next(); }, 420);
      } else {
        penalty(rock.x, rock.y - rock.r);
      }
    };
    S.onMiss = rock => { if (G.over || rock.missed) return; rock.missed = true; rock.fade = 0.001; S.engine.explode(rock); penalty(E.ship.x, E.ship.y - 80 * E.S); S.engine.clearRocks(); setTimeout(next, 350); };
    const pointer = e => { const b = S.canvas.getBoundingClientRect(); shoot(S.engine.hitTest(e.clientX - b.left, e.clientY - b.top)); };
    const keys = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= 4) { const list = E.rocks.filter(r => r.task === G.task && !r.dead && !r.fade).sort((a, b) => a.x - b.x); shoot(list[n - 1]); } };
    S.canvas.addEventListener('pointerdown', pointer);
    window.addEventListener('keydown', keys);
    S.cleanup.push(() => window.removeEventListener('keydown', keys));
    // відлік 3-2-1
    E.mode = 'play'; E.warp = 1.4;
    const count = h('div', { class: 'mr-count' });
    S.ui.append(count);
    let c = 3;
    const tick = () => {
      if (!S.root.isConnected) return;
      if (c > 0) { count.textContent = c; count.classList.remove('go'); void count.offsetWidth; count.classList.add('go'); K.Sfx.tick(); c--; setTimeout(tick, 700); return; }
      count.textContent = rx('go'); count.classList.add('go', 'start'); setTimeout(() => count.remove(), 600);
      G.end = endAt || Date.now() + dur * 1000;
      next();
      let hiddenAt = 0;
      const vis = () => { if (document.hidden) hiddenAt = Date.now(); else if (hiddenAt && practice) { G.end += Date.now() - hiddenAt; hiddenAt = 0; } };
      document.addEventListener('visibilitychange', vis);
      S.cleanup.push(() => document.removeEventListener('visibilitychange', vis));
      G.timer = setInterval(() => {
        if (!S.root.isConnected) { clearInterval(G.timer); return; }
        const left = Math.max(0, G.end - Date.now());
        timeTxt.textContent = Math.ceil(left / 1000);
        timeFill.style.width = Math.min(100, left / (dur * 10)) + '%';
        timeFill.parentNode.classList.toggle('hurry', left < 10000);
        if (left <= 0 && !G.over) { G.over = true; clearInterval(G.timer); S.engine.clearRocks(); E.mode = 'idle'; E.warp = 1; expr.textContent = ''; onEnd && onEnd(G, false); }
      }, 100);
    };
    tick();
    return G;
  }
  const statsOf = G => ({ correct: G.correct, wrong: G.wrong, acc: G.correct + G.wrong ? Math.round(G.correct / (G.correct + G.wrong) * 100) : 0, avg: G.times.length ? (G.times.reduce((a, b) => a + b, 0) / G.times.length).toFixed(1) : '—' });

  /* ================= меню й одиночна гра ================= */
  function solo() {
    const K = C(), { h } = K;
    const S = scene();
    let level = K.store.get('mathLevel', 'easy');
    const menu = () => {
      S.engine.E.mode = 'idle'; S.engine.E.warp = 1;
      const qr = h('div', { class: 'mr-qr' });
      loadLibs().then(() => { const svg = qrSvg(baseUrl() + '#/math/rocket'); if (svg) qr.replaceChildren(K.svgEl(svg)); }).catch(() => qr.remove());
      S.ui.replaceChildren(h('div', { class: 'mr-menu' },
        h('div', { class: 'mr-brand' }, h('span', { class: 'mr-badge' }, rx('badge').replace(/\d+\s.*$/, '⏱ ' + rx('durs')[durOf()])), h('h1', {}, rx('title')), h('p', {}, rx('subtitle'))),
        h('div', { class: 'mr-levels', role: 'radiogroup', 'aria-label': rx('levels') }, LEVELS.map(lv => {
          const [ic, name, desc] = rx(lv);
          return h('button', { class: 'mr-level' + (lv === level ? ' on' : ''), type: 'button', role: 'radio', 'aria-checked': String(lv === level), onclick: () => { level = lv; K.store.set('mathLevel', lv); menu(); } },
            h('span', { class: 'mr-lv-ic' }, ic), h('b', {}, name), h('small', {}, desc), h('span', { class: 'mr-lv-best' }, rx('best', bestOf(lv))));
        })),
        durPicker(durOf(), d => { K.store.set('mathDur', d); menu(); }),
        h('div', { class: 'mr-actions' },
          h('button', { class: 'mr-btn primary', type: 'button', onclick: () => { audio(); play(); } }, rx('play')),
          h('a', { class: 'mr-btn', href: '#/math/race' }, rx('with_class'))),
        h('div', { class: 'mr-info' },
          h('div', { class: 'mr-how' }, h('b', {}, rx('how_title')), h('ol', {}, rx('how').map(x => h('li', {}, x)))),
          h('div', { class: 'mr-qrbox' }, qr, h('small', {}, rx('phone')))),
        h('a', { class: 'mr-link', href: '#/math' }, rx('back'))));
    };
    const play = () => runGame(S, { level, dur: durOf(), onEnd: (G, quit) => (quit ? menu() : over(G)) });
    const over = G => {
      const st = statsOf(G), prev = bestOf(level), isBest = G.score > prev;
      if (isBest) K.store.set(bestKey(level), G.score);
      K.store.set('mathBest', Math.max(K.store.get('mathBest', 0), G.score));
      K.recordQuiz('rocket', '🚀 Math Rocket', G.correct, Math.max(1, G.correct + G.wrong));
      K.bump('rocket');
      if (isBest && G.score > 0) { K.confetti(); K.Sfx.win(); }
      const stars = G.score >= 400 ? 3 : G.score >= 200 ? 2 : G.score >= 60 ? 1 : 0;
      S.ui.replaceChildren(h('div', { class: 'mr-over' }, h('div', { class: 'mr-card' },
        h('span', { class: 'mr-badge' }, rx(level)[0] + ' ' + rx(level)[1]),
        h('h2', {}, rx('over')),
        h('div', { class: 'mr-final' }, G.score),
        h('div', { class: 'mr-stars' }, [0, 1, 2].map(i => h('span', { class: i < stars ? 'on' : '' }, '★'))),
        isBest && G.score > 0 ? h('p', { class: 'mr-newbest' }, rx('new_best')) : null,
        h('div', { class: 'mr-stats' },
          h('div', {}, h('b', {}, st.correct), h('small', {}, rx('correct'))),
          h('div', {}, h('b', {}, st.acc + '%'), h('small', {}, rx('accuracy'))),
          h('div', {}, h('b', {}, st.avg + (st.avg === '—' ? '' : ' s')), h('small', {}, rx('avg'))),
          h('div', {}, h('b', {}, Math.max(prev, G.score)), h('small', {}, rx('your_best')))),
        h('div', { class: 'mr-actions' }, h('button', { class: 'mr-btn primary', type: 'button', onclick: play }, rx('again')), h('button', { class: 'mr-btn', type: 'button', onclick: menu }, rx('change'))),
        h('a', { class: 'mr-link', href: '#/math' }, rx('back')))));
    };
    menu();
    return S.root;
  }

  /* ================= кімната «З класом»: ведучий ================= */
  let session = null;
  const endSession = () => { if (session) { try { session.destroy(); } catch { /* ignore */ } session = null; } };
  function host() {
    const K = C(), { h } = K;
    endSession();
    const S = scene();
    const R = { code: genCode(), peer: null, players: new Map(), phase: 'creating', level: K.store.get('mathLevel', 'easy'), dur: durOf(), seed: 0, round: 0 };
    session = R;
    const send = (p, m) => { if (p.conn && p.conn.open) { try { p.conn.send(m); } catch { /* ignore */ } } };
    const broadcast = m => R.players.forEach(p => send(p, m));
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: p.online, score: p.score || 0 }));
    const ranking = () => [...R.players.values()].sort((a, b) => (b.score || 0) - (a.score || 0));
    R.destroy = () => { clearTimeout(R.endTimer); broadcast({ t: 'closed' }); setTimeout(() => { try { R.peer && R.peer.destroy(); } catch { /* ignore */ } }, 150); };
    S.cleanup.push(() => { if (session === R) endSession(); });
    const draw = () => {
      if (!S.root.isConnected) return;
      const url = baseUrl() + '#/math/join/' + R.code;
      if (R.phase === 'creating' || R.phase === 'error') {
        S.ui.replaceChildren(h('div', { class: 'mr-menu' }, h('div', { class: 'mr-brand' }, h('h1', {}, rx('race_title')), h('p', {}, R.phase === 'error' ? R.error : '⏳ ' + rx('creating'))), h('a', { class: 'mr-link', href: '#/math/rocket' }, rx('back'))));
        return;
      }
      if (R.phase === 'lobby') {
        const players = [...R.players.values()];
        const copy = h('button', { class: 'mr-btn small', type: 'button', onclick: async () => { try { await navigator.clipboard.writeText(url); copy.textContent = rx('copied'); } catch { /* ignore */ } } }, rx('copy'));
        S.ui.replaceChildren(h('div', { class: 'mr-lobby' },
          h('div', { class: 'mr-card mr-join-card' },
            h('span', { class: 'mr-badge' }, rx('race_title')),
            h('div', { class: 'mr-bigqr' }, K.svgEl(qrSvg(url))),
            h('p', {}, rx('scan')), h('code', { class: 'mr-url' }, url), copy,
            h('div', { class: 'mr-code' }, R.code),
            location.protocol === 'file:' ? h('p', { class: 'mr-warn' }, rx('local_warn')) : null),
          h('div', { class: 'mr-card' },
            h('p', { class: 'mr-sub' }, rx('race_intro')),
            h('div', { class: 'mr-levels small' }, LEVELS.map(lv => { const [ic, name] = rx(lv); return h('button', { class: 'mr-level' + (lv === R.level ? ' on' : ''), type: 'button', onclick: () => { R.level = lv; draw(); } }, h('span', { class: 'mr-lv-ic' }, ic), h('b', {}, name)); })),
            durPicker(R.dur, d => { R.dur = d; K.store.set('mathDur', d); draw(); }),
            h('h3', {}, rx('players', players.filter(p => p.online).length)),
            players.length ? h('ul', { class: 'mr-players' }, players.map(p => h('li', { class: p.online ? '' : 'off' }, AV(p.avatar, { size: 40 }), h('b', {}, p.name),
              h('button', { class: 'mr-kick', type: 'button', title: rx('remove'), onclick: () => { send(p, { t: 'kick' }); R.players.delete(p.pid); broadcast({ t: 'lobby', players: list() }); draw(); } }, '✕')))) : h('p', { class: 'mr-sub' }, rx('waiting_players')),
            h('div', { class: 'mr-actions' }, h('button', { class: 'mr-btn primary', type: 'button', disabled: !players.some(p => p.online), onclick: startRace }, rx('start')), h('a', { class: 'mr-btn', href: '#/math/rocket', onclick: endSession }, rx('close'))),
            !players.some(p => p.online) ? h('p', { class: 'mr-sub' }, rx('need_players')) : null)));
        return;
      }
      // гонка або фінал: живий рейтинг
      const rank = ranking(), top = Math.max(1, ...rank.map(p => p.score || 0));
      const left = R.phase === 'race' ? Math.max(0, Math.ceil((R.endsAt - Date.now()) / 1000)) : 0;
      S.ui.replaceChildren(h('div', { class: 'mr-board-wrap' }, h('div', { class: 'mr-card mr-board' },
        h('div', { class: 'mr-board-head' }, h('h2', {}, R.phase === 'final' ? rx('final') : rx('live')), R.phase === 'race' ? h('span', { class: 'mr-chip time' }, h('small', {}, rx('time')), h('b', {}, left)) : null, h('span', { class: 'mr-badge' }, rx(R.level)[0] + ' ' + rx(R.level)[1])),
        R.phase === 'final' ? (window.KomiksAvatars ? window.KomiksAvatars.podium(rank.map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.score || 0 })), { points: rx('points'), show: true }) : null) : null,
        h('ol', { class: 'mr-rank' }, rank.map((p, i) => h('li', { class: p.online ? '' : 'off' },
          h('span', { class: 'mr-r-n' }, i + 1), h('span', { class: 'mr-r-ava' }, AV(p.avatar, { size: 34 })), h('b', { class: 'mr-r-name' }, p.name),
          h('span', { class: 'mr-r-bar' }, h('i', { style: { width: Math.round((p.score || 0) / top * 100) + '%' } })),
          h('b', { class: 'mr-r-score' }, p.score || 0), h('small', {}, `✔${p.correct || 0} ✘${p.wrong || 0}`)))),
        R.phase === 'final' ? h('div', { class: 'mr-actions' }, h('button', { class: 'mr-btn primary', type: 'button', onclick: () => { R.phase = 'lobby'; R.players.forEach(p => { p.score = 0; p.correct = 0; p.wrong = 0; p.done = false; }); broadcast({ t: 'lobby', players: list(), reset: true }); draw(); } }, rx('again_room')),
          h('a', { class: 'mr-btn', href: '#/rating', onclick: endSession }, '🏆'), h('a', { class: 'mr-btn', href: '#/math/rocket', onclick: endSession }, rx('close'))) : null)));
    };
    function startRace() {
      R.seed = Math.floor(Math.random() * 1e9); R.round++;
      R.players.forEach(p => { p.score = 0; p.correct = 0; p.wrong = 0; p.done = false; });
      R.phase = 'race';
      R.endsAt = Date.now() + 2100 + R.dur * 1000;
      broadcast({ t: 'start', seed: R.seed, level: R.level, dur: R.dur, startIn: 2100 });
      S.engine.E.warp = 2;
      draw();
      clearInterval(R.tick); R.tick = setInterval(() => { if (!S.root.isConnected) { clearInterval(R.tick); return; } if (R.phase === 'race') draw(); }, 500);
      clearTimeout(R.endTimer); R.endTimer = setTimeout(finish, 2100 + R.dur * 1000 + 2500);
    }
    function finish() {
      if (R.phase !== 'race') return;
      R.phase = 'final'; clearInterval(R.tick); S.engine.E.warp = 1;
      const rank = ranking();
      const board = rank.map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, fc: p.fc || '', score: p.score || 0, correct: p.correct || 0, answered: (p.correct || 0) + (p.wrong || 0) }));
      broadcast({ t: 'end', board });
      if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'rocket-' + R.code + '-' + R.round, topic: '🚀 Math Rocket · ' + rx(R.level)[1], total: Math.max(1, ...board.map(b => b.answered)), board });
      K.confetti(); K.Sfx.win();
      draw();
    }
    const onMessage = (conn, m) => {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'hello') {
        const pid = String(m.pid || '').slice(0, 40); if (!pid) return;
        const prev = R.players.get(pid);
        const p = Object.assign(prev || { score: 0, correct: 0, wrong: 0 }, { pid, name: String(m.name || '?').slice(0, 20), avatar: (window.KomiksAvatars ? window.KomiksAvatars.valid(m.avatar) : AVATARS.includes(m.avatar)) ? m.avatar : '🙂', conn, online: true, fc: /^[A-HJ-NP-Z2-9]{6}$/.test(m.fc || '') ? m.fc : '' });
        R.players.set(pid, p);
        send(p, { t: 'welcome', code: R.code });
        broadcast({ t: 'lobby', players: list() });
        if (R.phase === 'race') send(p, { t: 'start', seed: R.seed, level: R.level, dur: R.dur, startIn: 0, late: true, left: Math.max(0, R.endsAt - Date.now()) });
        K.Sfx.tick(); draw();
      } else if (m.t === 'score') {
        const p = [...R.players.values()].find(x => x.conn === conn); if (!p || R.phase !== 'race') return;
        p.score = m.score | 0; p.correct = m.correct | 0; p.wrong = m.wrong | 0; if (m.done) p.done = true;
        if ([...R.players.values()].filter(x => x.online).every(x => x.done)) setTimeout(finish, 600);
      }
    };
    loadLibs().then(() => {
      const open = () => {
        R.peer = new window.Peer(PREFIX + R.code, { debug: 0 });
        R.peer.on('open', () => { R.phase = 'lobby'; draw(); });
        R.peer.on('error', err => { if (err.type === 'unavailable-id') { try { R.peer.destroy(); } catch { /* ignore */ } R.code = genCode(); open(); return; } if (R.phase === 'creating') { R.phase = 'error'; R.error = rx('err_net'); draw(); } });
        R.peer.on('connection', conn => {
          conn.on('data', m => onMessage(conn, m));
          conn.on('close', () => { for (const p of R.players.values()) if (p.conn === conn) p.online = false; broadcast({ t: 'lobby', players: list() }); draw(); });
        });
      };
      open();
    }).catch(() => { R.phase = 'error'; R.error = rx('err_net'); draw(); });
    draw();
    return S.root;
  }

  /* ================= кімната «З класом»: учасник ================= */
  function join(code) {
    const K = C(), { h } = K;
    endSession();
    const S = scene();
    const saved = K.raw.get('comiks.gameProfile', {});
    let avatar = (window.KomiksProfile ? window.KomiksProfile.avatar() : saved.avatar) || AVATARS[Math.floor(Math.random() * AVATARS.length)];
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: 5, value: (code || '').toUpperCase(), autocapitalize: 'characters', class: 'mr-input code' });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: 20, value: saved.name || (K.currentUser() || {}).name || '', class: 'mr-input' });
      const err = h('p', { class: 'mr-warn', role: 'alert' });
      const avas = window.KomiksProfile ? window.KomiksProfile.joinAvatar(a => { avatar = a; }) : window.KomiksAvatars ? window.KomiksAvatars.picker(avatar, a => { avatar = a; }) : h('div', { class: 'mr-avatars' }, AVATARS.map(a => h('button', { type: 'button', class: a === avatar ? 'on' : '', onclick: e => { avatar = a; K.$$('button', avas).forEach(b => b.classList.toggle('on', b === e.currentTarget)); } }, a)));
      S.ui.replaceChildren(h('div', { class: 'mr-menu' }, h('form', { class: 'mr-card mr-form', onsubmit: e => {
        e.preventDefault();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.textContent = rx('err_code'); return; }
        if (!n) { err.textContent = rx('err_name'); return; }
        K.raw.set('comiks.gameProfile', { name: n, avatar });
        audio();
        connect(c, n);
      } },
        h('span', { class: 'mr-badge' }, rx('join_title')),
        h('label', {}, h('span', {}, rx('code')), codeIn), h('label', {}, h('span', {}, rx('name')), nameIn),
        h('div', {}, h('span', { class: 'mr-lbl' }, rx('avatar')), avas), err,
        h('button', { class: 'mr-btn primary', type: 'submit' }, rx('join_go')))));
      setTimeout(() => (codeIn.value ? nameIn : codeIn).focus(), 60);
    };
    const connect = (c, name) => {
      let pid = null;
      try { pid = sessionStorage.getItem('komiks.rocket.pid'); if (!pid) { pid = 'r' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('komiks.rocket.pid', pid); } } catch { pid = 'r' + Math.random().toString(36).slice(2, 10); }
      const P = { peer: null, conn: null, phase: 'connecting', players: [], G: null };
      session = P;
      P.destroy = () => { try { P.conn && P.conn.close(); } catch { /* ignore */ } try { P.peer && P.peer.destroy(); } catch { /* ignore */ } };
      S.cleanup.push(() => { if (session === P) endSession(); });
      const status = (text, extra) => S.ui.replaceChildren(h('div', { class: 'mr-menu' }, h('div', { class: 'mr-card mr-wait' }, h('div', { class: 'mr-wait-ava' }, AV(avatar, { size: 120, mood: 'cheer' })), h('b', {}, name), h('p', {}, text), extra || null, h('a', { class: 'mr-link', href: '#/math/rocket', onclick: endSession }, rx('back')))));
      const lobby = () => status(rx('wait_start'), h('div', {}, h('h3', {}, rx('in_room') + ' · ' + rx('players', P.players.filter(p => p.online).length)), h('ul', { class: 'mr-players' }, P.players.map(p => h('li', { class: p.pid === pid ? 'me' : '' }, AV(p.avatar, { size: 36 }), h('b', {}, p.name + (p.pid === pid ? ` (${rx('you')})` : '')))))));
      const send = m => { try { P.conn && P.conn.open && P.conn.send(m); } catch { /* ignore */ } };
      const fail = t => { if (session !== P) return; P.phase = 'error'; status(t); };
      status('⏳ ' + rx('connecting'));
      loadLibs().then(() => {
        P.peer = new window.Peer({ debug: 0 });
        const guard = setTimeout(() => { if (P.phase === 'connecting') fail(rx('err_room')); }, 15000);
        P.peer.on('open', () => {
          P.conn = P.peer.connect(PREFIX + c, { reliable: true });
          P.conn.on('open', () => { clearTimeout(guard); send({ t: 'hello', pid, name, avatar, fc: window.KomiksPlayers ? window.KomiksPlayers.myPublicCode() : '' }); });
          P.conn.on('data', m => {
            if (!m || typeof m !== 'object') return;
            if (m.t === 'welcome') { P.phase = 'lobby'; lobby(); K.Sfx.good(); }
            else if (m.t === 'lobby') { P.players = m.players || []; if (P.phase === 'lobby' || m.reset) { P.phase = 'lobby'; lobby(); } }
            else if (m.t === 'start') {
              P.phase = 'race';
              const dur = DURS.includes(+m.dur) ? +m.dur : DURATION;
              const endAt = Date.now() + (m.late ? (m.left || 0) : (m.startIn || 0) + dur * 1000);
              const begin = () => {
                P.G = runGame(S, { level: LEVELS.includes(m.level) ? m.level : 'easy', seed: m.seed, practice: false, endAt, dur,
                  onScore: G => send({ t: 'score', score: G.score, correct: G.correct, wrong: G.wrong }),
                  onEnd: (G, quit) => { send({ t: 'score', score: G.score, correct: G.correct, wrong: G.wrong, done: true }); P.phase = 'done'; status(quit ? rx('wait_start') : rx('done_wait'), h('div', { class: 'mr-final small' }, G.score)); } });
              };
              setTimeout(begin, Math.max(0, (m.startIn || 0) - 2100));
            }
            else if (m.t === 'end') {
              if (P.G && !P.G.over) { P.G.over = true; clearInterval(P.G.timer); S.engine.clearRocks(); S.engine.E.mode = 'idle'; S.engine.E.warp = 1; }
              const board = m.board || [], me = board.findIndex(b => b.pid === pid);
              if (me >= 0 && me < 3) { K.confetti(); K.Sfx.win(); }
              if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'rocket-' + c + '-' + (board.map(b => b.score).join('.')), topic: '🚀 Math Rocket', total: Math.max(1, ...board.map(b => b.answered || 0)), board });
              // результат ракети в кімнаті — у профіль: правильні відповіді + місце
              if (me >= 0) { const b = board[me]; K.recordQuiz('rocket', '🚀 Math Rocket', b.correct || 0, Math.max(1, b.answered || 0), { place: me + 1, of: board.length, id: 'rocket-' + c + '-' + board.map(x => x.score).join('.') }); K.bump('games'); }
              P.phase = 'end';
              status(me >= 0 ? rx('your_place', me + 1, board.length) : rx('final'), window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: rx('you'), points: rx('points'), place: (r, n) => rx('your_place', r, n), show: true }) : null);
            }
            else if (m.t === 'kick') fail(rx('kicked'));
            else if (m.t === 'closed') fail(rx('host_left'));
          });
          P.conn.on('close', () => { if (P.phase !== 'error' && P.phase !== 'end') fail(rx('host_left')); });
        });
        P.peer.on('error', err => { clearTimeout(guard); fail(err.type === 'peer-unavailable' ? rx('err_room') : rx('err_net')); });
      }).catch(() => fail(rx('err_net')));
    };
    form();
    return S.root;
  }

  window.KomiksRocket = { solo, host, join, end: endSession, text: rx, bestOf };
})();
