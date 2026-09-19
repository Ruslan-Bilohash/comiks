/* Комікс·Lab — друзі: код друга, запити, хто онлайн, запрошення «вчимося разом», обійми при зустрічі.
   Без власного сервера: кожен акаунт у мережі — PeerJS-вузол `komiks-lab-u-<КОД>`; друзі з’єднуються напряму.
   Статус онлайн бачать лише прийняті друзі (невідомим відповідаємо тільки на «запит у друзі»).
   #/friends — сторінка; #/friends/add/<КОД> — посилання-запрошення (QR). Близькі друзі (⭐) обіймаються, інші — «дай п’ять». */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const TX = {
    uk: {
      title: '👥 Друзі', my_code: 'Мій код друга', share: '📤 Надіслати запрошення', scan: 'Скануй, щоб додатися в друзі', add_t: '➕ Додати друга', add_ph: 'Код друга (6 символів)', add: 'Додати',
      online: 'онлайн', offline: 'не в мережі', pending: '⏳ чекає підтвердження', incoming: 'хоче дружити', accept: '✓ Прийняти', decline: '✕', remove: 'Видалити з друзів', best: '⭐ Близький друг', best_hint: 'Близькі друзі обіймаються при зустрічі 🤗',
      none: 'Поки немає друзів. Надішли свій код або QR — і вчіться разом!', login: 'Щоб додавати друзів і бачити, хто онлайн, увійди або зареєструйся.', login_btn: 'Увійти',
      together: '🎓 Вчитися разом', inv_race: '🏁 Логік-гонка', inv_game: '🎮 Моя кімната', hug: '🤗 Обійняти', five: '✋ Дай п’ять',
      t_request: n => `${n} хоче додати тебе в друзі`, t_accept: n => `${n} тепер твій друг! 🎉`, t_online: n => `${n} зараз онлайн`, t_invite: (n, g) => `${n} кличе тебе: ${g}`, join: 'Приєднатися ▶', later: 'Пізніше',
      sent: 'Запит надіслано. Друг побачить його, коли буде онлайн.', bad_code: 'Код — 6 символів.', self: 'Це твій власний код 🙂', exists: 'Ви вже друзі або запит надіслано.',
      no_room: 'Спочатку відкрий кімнату в «Грі разом».', invited: n => `Запрошення надіслано: ${n}`, net: '⚠️ Немає з’єднання — статус онлайн недоступний.', count: n => `${n} онлайн`,
      privacy: 'Твій статус бачать тільки друзі. Код можна змінити — старі посилання перестануть працювати.', new_code: '🔄 Новий код', meet_best: 'Близькі друзі зустрілися!', meet: 'Друзі зустрілися!', snooze: 'Не показувати годину', anim_t: '🤗 Анімація дружби', anim: { auto: 'Звичайна (у грі — маленька в куті)', mini: 'Лише маленька в куті', off: 'Вимкнено' }, anim_d: 'Автоматично — не частіше 3 разів на годину.', profile: '👤 Профіль', find: '🔎 Знайти гравців',
      act: { read: '📖 читає комікс', words: '📝 вчить слова', grammar: '📐 граматика', english: '🇬🇧 англійська', math: '🧮 математика', race: '🏁 у Логік-гонці', game: '🎮 у грі', join: '🎮 у грі', quiz: '🧩 проходить тест', tests: '🧩 тести', alphabet: '🔤 алфавіт', numbers: '🔢 числа', avatar: '🎨 одягає аватар', friends: '👥 друзі', '': '🏠 на сайті' }
    },
    en: {
      title: '👥 Friends', my_code: 'My friend code', share: '📤 Send an invite', scan: 'Scan to become friends', add_t: '➕ Add a friend', add_ph: 'Friend code (6 characters)', add: 'Add',
      online: 'online', offline: 'offline', pending: '⏳ waiting for approval', incoming: 'wants to be friends', accept: '✓ Accept', decline: '✕', remove: 'Remove friend', best: '⭐ Best friend', best_hint: 'Best friends hug when they meet 🤗',
      none: 'No friends yet. Send your code or QR — and learn together!', login: 'Log in or sign up to add friends and see who is online.', login_btn: 'Log in',
      together: '🎓 Learn together', inv_race: '🏁 Logic Race', inv_game: '🎮 My room', hug: '🤗 Hug', five: '✋ High five',
      t_request: n => `${n} wants to be your friend`, t_accept: n => `${n} is now your friend! 🎉`, t_online: n => `${n} is online`, t_invite: (n, g) => `${n} invites you: ${g}`, join: 'Join ▶', later: 'Later',
      sent: 'Request sent. Your friend will see it when online.', bad_code: 'The code has 6 characters.', self: 'That is your own code 🙂', exists: 'You are already friends or the request is sent.',
      no_room: 'Open a room in “Play together” first.', invited: n => `Invite sent: ${n}`, net: '⚠️ No connection — online status unavailable.', count: n => `${n} online`,
      privacy: 'Only your friends see your status. You can change the code — old links will stop working.', new_code: '🔄 New code', meet_best: 'Best friends met!', meet: 'Friends met!', snooze: 'Hide for an hour', anim_t: '🤗 Friendship animation', anim: { auto: 'Normal (small in the corner during games)', mini: 'Only small in the corner', off: 'Off' }, anim_d: 'Automatically — at most 3 times an hour.', profile: '👤 Profile', find: '🔎 Find players',
      act: { read: '📖 reading a comic', words: '📝 learning words', grammar: '📐 grammar', english: '🇬🇧 English', math: '🧮 maths', race: '🏁 in the Logic Race', game: '🎮 in a game', join: '🎮 in a game', quiz: '🧩 taking a test', tests: '🧩 tests', alphabet: '🔤 alphabet', numbers: '🔢 numbers', avatar: '🎨 dressing the avatar', friends: '👥 friends', '': '🏠 on the site' }
    },
    no: {
      title: '👥 Venner', my_code: 'Vennekoden min', share: '📤 Send invitasjon', scan: 'Skann for å bli venner', add_t: '➕ Legg til venn', add_ph: 'Vennekode (6 tegn)', add: 'Legg til',
      online: 'pålogget', offline: 'ikke pålogget', pending: '⏳ venter på svar', incoming: 'vil bli venn', accept: '✓ Godta', decline: '✕', remove: 'Fjern venn', best: '⭐ Bestevenn', best_hint: 'Bestevenner klemmer når de møtes 🤗',
      none: 'Ingen venner ennå. Send koden eller QR-koden – og lær sammen!', login: 'Logg inn eller registrer deg for å legge til venner og se hvem som er pålogget.', login_btn: 'Logg inn',
      together: '🎓 Lær sammen', inv_race: '🏁 Logikkløpet', inv_game: '🎮 Rommet mitt', hug: '🤗 Klem', five: '✋ Gi meg fem',
      t_request: n => `${n} vil bli vennen din`, t_accept: n => `${n} er nå vennen din! 🎉`, t_online: n => `${n} er pålogget`, t_invite: (n, g) => `${n} inviterer deg: ${g}`, join: 'Bli med ▶', later: 'Senere',
      sent: 'Forespørselen er sendt. Vennen ser den når hen er pålogget.', bad_code: 'Koden har 6 tegn.', self: 'Det er din egen kode 🙂', exists: 'Dere er allerede venner, eller forespørselen er sendt.',
      no_room: 'Åpne et rom i «Spill sammen» først.', invited: n => `Invitasjon sendt: ${n}`, net: '⚠️ Ingen forbindelse – kan ikke vise hvem som er pålogget.', count: n => `${n} pålogget`,
      privacy: 'Bare vennene dine ser statusen din. Du kan bytte kode – gamle lenker slutter å virke.', new_code: '🔄 Ny kode', meet_best: 'Bestevenner møttes!', meet: 'Venner møttes!', snooze: 'Skjul i en time', anim_t: '🤗 Venneanimasjon', anim: { auto: 'Vanlig (liten i hjørnet under spill)', mini: 'Bare liten i hjørnet', off: 'Av' }, anim_d: 'Automatisk – høyst 3 ganger i timen.', profile: '👤 Profil', find: '🔎 Finn spillere',
      act: { read: '📖 leser en tegneserie', words: '📝 lærer ord', grammar: '📐 grammatikk', english: '🇬🇧 engelsk', math: '🧮 matte', race: '🏁 i Logikkløpet', game: '🎮 i et spill', join: '🎮 i et spill', quiz: '🧩 tar en test', tests: '🧩 tester', alphabet: '🔤 alfabetet', numbers: '🔢 tall', avatar: '🎨 kler på avataren', friends: '👥 venner', '': '🏠 på siden' }
    }
  };
  if (window.I18N) for (const [l, n] of [['uk', 'Друзі'], ['en', 'Friends'], ['no', 'Venner']]) { const I = window.I18N[l]; if (I) I.nav = Object.assign({}, I.nav, { friends: n }); }
  const C = () => window.KomiksCore;
  TX.ar = {
    title: '👥 الأصدقاء', my_code: 'رمز الصديق الخاص بي', share: '📤 أرسل دعوة', scan: 'امسح لتصبحا صديقين', add_t: '➕ أضف صديقًا', add_ph: 'رمز الصديق (6 أحرف)', add: 'إضافة',
    online: 'متصل', offline: 'غير متصل', pending: '⏳ بانتظار الموافقة', incoming: 'يريد أن يكون صديقك', accept: '✓ قبول', decline: '✕', remove: 'إزالة الصديق', best: '⭐ أفضل صديق', best_hint: 'أفضل الأصدقاء يتعانقون عند اللقاء 🤗',
    none: 'لا أصدقاء بعد. أرسل رمزك أو QR — وتعلّموا معًا!', login: 'سجّل الدخول لتضيف أصدقاء وترى من المتصل.', login_btn: 'دخول',
    together: '🎓 تعلّموا معًا', inv_race: '🏁 سباق المنطق', inv_game: '🎮 غرفتي', hug: '🤗 عناق', five: '✋ كفّ',
    t_request: n => `${n} يريد أن يكون صديقك`, t_accept: n => `${n} أصبح صديقك! 🎉`, t_online: n => `${n} متصل الآن`, t_invite: (n, g) => `${n} يدعوك: ${g}`, join: 'انضم ▶', later: 'لاحقًا',
    sent: 'أُرسل الطلب. سيراه صديقك عندما يتصل.', bad_code: 'الرمز من 6 أحرف.', self: 'هذا رمزك أنت 🙂', exists: 'أنتما صديقان بالفعل أو أُرسل الطلب.',
    no_room: 'افتح غرفة في «العبوا معًا» أولًا.', invited: n => `أُرسلت الدعوة: ${n}`, net: '⚠️ لا يوجد اتصال — حالة الاتصال غير متاحة.', count: n => `${n} متصل`,
    privacy: 'أصدقاؤك فقط يرون حالتك. يمكنك تغيير الرمز — ستتوقف الروابط القديمة عن العمل.', new_code: '🔄 رمز جديد', meet_best: 'التقى أفضل الأصدقاء!', meet: 'التقى الأصدقاء!', snooze: 'إخفاء لمدة ساعة', anim_t: '🤗 رسوم الصداقة', anim: { auto: 'عادي (صغير في الزاوية أثناء الألعاب)', mini: 'صغير في الزاوية فقط', off: 'مُطفأ' }, anim_d: 'تلقائيًا — 3 مرات في الساعة كحد أقصى.', profile: '👤 الملف', find: '🔎 ابحث عن لاعبين',
    act: { read: '📖 يقرأ قصة', words: '📝 يتعلّم الكلمات', grammar: '📐 القواعد', english: '🇬🇧 الإنجليزية', math: '🧮 الرياضيات', race: '🏁 في سباق المنطق', game: '🎮 في لعبة', join: '🎮 في لعبة', quiz: '🧩 في اختبار', tests: '🧩 الاختبارات', alphabet: '🔤 الحروف', numbers: '🔢 الأرقام', avatar: '🎨 يلبس شخصيته', friends: '👥 الأصدقاء', chess: '♟ يلعب الشطرنج', '': '🏠 على الموقع' }
  };
  const fx = (k, ...a) => { const t = TX[C().ui] || TX.en || TX.uk; const v = k in t ? t[k] : (TX.en || TX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : document.createTextNode(String(code || '🙂').split('|')[0]));
  const PREFIX = 'komiks-lab-u-', CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', CODE_RE = /^[A-HJ-NP-Z2-9]{6}$/;
  const genCode = () => Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  const validAv = a => (window.KomiksAvatars ? window.KomiksAvatars.valid(a) : typeof a === 'string' && a.length < 60);
  const clean = (s, n = 20) => String(s || '').replace(/[\x00-\x1f<>]/g, '').trim().slice(0, n);

  /* ---------- дані друзів (в акаунті) ---------- */
  const myCode = () => { const K = C(); let c = K.store.get('friendCode', null); if (!CODE_RE.test(c || '')) { c = genCode(); K.store.set('friendCode', c); } return c; };
  const list = () => (C().store.get('friends', []) || []).filter(f => f && CODE_RE.test(f.code));
  const save = arr => { C().store.set('friends', arr.slice(0, 100)); emit(); };
  const find = code => list().find(f => f.code === code);
  const upsert = (code, patch) => { const arr = list(); const i = arr.findIndex(f => f.code === code); if (i >= 0) arr[i] = Object.assign(arr[i], patch); else arr.push(Object.assign({ code, name: '?', avatar: '🙂', status: 'pending', best: false, since: new Date().toISOString() }, patch)); save(arr); };
  const me = () => { const u = C().currentUser(); return u ? { code: myCode(), name: u.name, avatar: window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊' } : null; };
  const actNow = () => ((location.hash || '#/').split('/')[1] || '').slice(0, 12);

  /* ---------- мережа ---------- */
  const N = { peer: null, uid: null, conns: new Map(), online: new Map(), met: new Set(), ok: false, netErr: false, poll: 0, listeners: new Set() };
  const emit = () => N.listeners.forEach(f => { try { f(); } catch { /* ignore */ } });
  let libs = null;
  function loadPeer() {
    if (window.Peer) return Promise.resolve();
    if (libs) return libs;
    const v = (window.KOMIKS_DATA || {}).version || '';
    libs = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'assets/vendor/peerjs.min.js' + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => { libs = null; rej(new Error('peerjs')); }; document.head.appendChild(s); });
    return libs;
  }
  function send(code, m) { const c = N.conns.get(code); if (c && c.open) { try { c.send(m); return true; } catch { /* ignore */ } } return false; }
  function hello(code) { const m = me(); if (m) send(code, { t: 'hello', code: m.code, name: m.name, avatar: m.avatar, act: actNow() }); }
  function attach(conn, code) {
    conn.on('open', () => {
      if (code) { N.conns.set(code, conn); const f = find(code); if (f && f.status === 'friend') hello(code); else if (f && f.status === 'pending') { const m = me(); if (m) send(code, { t: 'request', code: m.code, name: m.name, avatar: m.avatar }); } }
    });
    conn.on('data', m => onMsg(conn, m));
    conn.on('close', () => { for (const [k, c] of N.conns) if (c === conn) { N.conns.delete(k); if (N.online.delete(k)) emit(); } });
    conn.on('error', () => {});
  }
  function connectTo(code) {
    if (window.KomiksBots && window.KomiksBots.isBot(code)) return;
    if (!N.peer || N.peer.destroyed || N.peer.disconnected) return;
    const c = N.conns.get(code); if (c && c.open) return;
    try { const conn = N.peer.connect(PREFIX + code, { reliable: true }); N.conns.set(code, conn); attach(conn, code); } catch { /* ignore */ }
  }
  function onMsg(conn, m) {
    if (!m || typeof m !== 'object' || !CODE_RE.test(m.code || '') && m.t !== 'act' && m.t !== 'hug' && m.t !== 'invite') return;
    // хто пише: з повідомлення (hello/request/accept) або за з’єднанням
    let code = m.code;
    if (!code) for (const [k, c] of N.conns) if (c === conn) code = k;
    if (!code) return;
    // друг змінив код — переносимо запис на новий код
    if (m.t === 'recode') {
      let old = null; for (const [k, c] of N.conns) if (c === conn) old = k;
      if (old && old !== m.code && find(old) && !find(m.code)) { save(list().map(x => (x.code === old ? Object.assign(x, { code: m.code }) : x))); N.conns.delete(old); N.online.delete(old); emit(); }
      return;
    }
    const f = find(code), mine = me(); if (!mine) return;
    if (m.t === 'request') {
      if (code === mine.code) return;
      N.conns.set(code, conn);
      const name = clean(m.name), avatar = validAv(m.avatar) ? m.avatar : '🙂';
      if (f && (f.status === 'friend' || f.status === 'pending')) { upsert(code, { status: 'friend', name, avatar }); send(code, { t: 'accept', code: mine.code, name: mine.name, avatar: mine.avatar }); markOnline(code, m.act); return; }
      if (list().filter(x => x.status === 'incoming').length >= 30) return;
      if (!f) { upsert(code, { status: 'incoming', name, avatar }); toast(fx('t_request', name), [[fx('accept'), () => accept(code)], [fx('later'), null]], avatar); C().Sfx.tick(); }
      return;
    }
    if (!f) return; // незнайомим більше нічого не показуємо
    N.conns.set(code, conn);
    if (m.t === 'accept' || m.t === 'hello') {
      const wasPending = f.status === 'pending';
      if (f.status === 'incoming' && m.t === 'hello') return;
      upsert(code, { status: 'friend', name: clean(m.name) || f.name, avatar: validAv(m.avatar) ? m.avatar : f.avatar });
      if (m.t === 'hello' && !N.online.has(code)) hello(code); // відповідаємо, щоб друг теж побачив нас
      if (wasPending) toast(fx('t_accept', clean(m.name) || f.name), null, m.avatar);
      markOnline(code, m.act, true);
      return;
    }
    if (f.status !== 'friend') return;
    if (m.t === 'act') { if (N.online.has(code)) { N.online.get(code).act = clean(m.act, 12); emit(); } }
    else if (m.t === 'hug') meet(find(code), true, m.best === true);
    else if (m.t === 'invite') {
      const game = m.game === 'race' ? 'race' : m.game === 'game' ? 'game' : null, room = String(m.room || '').toUpperCase();
      if (!game || !/^[A-Z0-9]{5}$/.test(room)) return;
      const url = game === 'race' ? '#/race/join/' + room : '#/join/' + room;
      toast(fx('t_invite', f.name, game === 'race' ? fx('inv_race') : fx('inv_game')), [[fx('join'), () => { location.hash = url; }], [fx('later'), null]], f.avatar);
      if (window.KomiksMusic) window.KomiksMusic.fanfare(); else C().Sfx.good();
    }
  }
  function markOnline(code, act, greet) {
    const first = !N.online.has(code);
    N.online.set(code, { act: clean(act, 12), at: Date.now() });
    emit();
    // перша зустріч за сесію — обійми (близькі) або «дай п’ять»
    if (first && greet && !N.met.has(code)) { N.met.add(code); const f = find(code); if (f) { toast(fx('t_online', f.name), null, f.avatar); if (f.best) meet(f, false); } }
  }
  function start() {
    if (!window.KomiksCore) return;
    const u = C().currentUser();
    const uid = u ? u.id : null;
    if (uid === N.uid && (N.peer || !uid)) return;
    stop(); N.uid = uid;
    if (!uid) return;
    loadPeer().then(() => {
      if (N.uid !== uid) return;
      const peer = new window.Peer(PREFIX + myCode(), { debug: 0 });
      N.peer = peer;
      peer.on('open', () => { N.ok = true; N.netErr = false; emit(); pollNow(); });
      peer.on('connection', conn => attach(conn, null));
      peer.on('disconnected', () => { N.ok = false; emit(); setTimeout(() => { try { if (N.peer === peer && !peer.destroyed) peer.reconnect(); } catch { /* ignore */ } }, 5000); });
      peer.on('error', err => {
        if (err.type === 'peer-unavailable') { const m = /komiks-lab-u-([A-Z0-9]{6})/.exec(err.message || ''); if (m) { N.conns.delete(m[1]); if (N.online.delete(m[1])) emit(); } return; }
        if (err.type === 'unavailable-id') { N.ok = false; emit(); return; } // той самий акаунт уже онлайн в іншій вкладці
        if (err.type === 'network' || err.type === 'server-error' || err.type === 'socket-error') { N.netErr = true; emit(); }
      });
      N.poll = setInterval(pollNow, 25000);
    }).catch(() => { N.netErr = true; emit(); });
  }
  function pollNow() { if (!N.peer || !N.ok) return; list().forEach(f => { if (f.status === 'friend' || f.status === 'pending') connectTo(f.code); }); }
  function stop() { clearInterval(N.poll); N.conns.forEach(c => { try { c.close(); } catch { /* ignore */ } }); N.conns.clear(); N.online.clear(); try { N.peer && N.peer.destroy(); } catch { /* ignore */ } N.peer = null; N.ok = false; emit(); }
  // зміна сторінки → друзі бачать, чим ти зайнятий
  let lastAct = null;
  window.addEventListener('hashchange', () => { const a = actNow(); if (a === lastAct) return; lastAct = a; for (const code of N.online.keys()) send(code, { t: 'act', act: a }); });
  setInterval(start, 4000); // вхід/вихід з акаунта
  setTimeout(start, 1500);

  // віртуальні гравці (KomiksBots): завжди онлайн, з’єднання через мережу не потрібне
  const BOTS = () => window.KomiksBots;
  const isBot = code => !!(BOTS() && BOTS().isBot(code));
  const onl = code => N.online.get(code) || (isBot(code) && (find(code) || {}).status === 'friend' ? { act: BOTS().activity(code) } : null);
  /* ---------- дії ---------- */
  function add(code) {
    const m = me(); if (!m) return fx('login');
    code = String(code || '').toUpperCase().trim();
    if (!CODE_RE.test(code)) return fx('bad_code');
    if (code === m.code) return fx('self');
    const f = find(code);
    if (f && f.status === 'incoming') { accept(code); return ''; }
    if (f) return fx('exists');
    if (isBot(code)) {
      // бот «читає» запит і приймає його за кілька секунд — як жива людина
      const b = BOTS().get(code);
      upsert(code, { status: 'pending', name: b.name, avatar: b.avatar });
      setTimeout(() => { const f0 = find(code); if (!f0 || f0.status !== 'pending') return; upsert(code, { status: 'friend' }); toast(fx('t_accept', b.name), null, b.avatar); const f = find(code); if (f) meet(f, false); }, 1800 + Math.random() * 2500);
      return fx('sent');
    }
    upsert(code, { status: 'pending' });
    connectTo(code);
    return fx('sent');
  }
  function accept(code) {
    const m = me(); if (!m) return;
    upsert(code, { status: 'friend' });
    if (!send(code, { t: 'accept', code: m.code, name: m.name, avatar: m.avatar })) connectTo(code);
    const f = find(code); if (f) meet(f, false);
  }
  const remove = code => { save(list().filter(f => f.code !== code)); N.online.delete(code); const c = N.conns.get(code); if (c) { try { c.close(); } catch { /* ignore */ } } N.conns.delete(code); emit(); };
  const setBest = (code, v) => upsert(code, { best: !!v });
  function hug(code) { const f = find(code); if (!f) return; if (!isBot(code)) send(code, { t: 'hug', best: !!f.best }); meet(f, true, false, true); }
  function invite(code, game) {
    const room = game === 'race' ? (window.KomiksRace && window.KomiksRace.roomCode()) : (window.KomiksGame && window.KomiksGame.roomCode());
    if (!room) return false;
    return send(code, { t: 'invite', game, room });
  }
  // «Вчитися разом»: відкриваємо трасу й надсилаємо код, щойно кімната готова
  function together(code) {
    if (isBot(code)) { location.hash = '#/race/bots/' + code; return; } // з ботом — одразу на трасу
    const f = find(code); if (!f) return;
    location.hash = '#/race/host';
    let n = 0;
    const t = setInterval(() => { n++; if (invite(code, 'race')) { clearInterval(t); toast(fx('invited', f.name), null, f.avatar); } else if (n > 40) clearInterval(t); }, 500);
  }
  // новий код: друзям онлайн повідомляємо його одразу, щоб дружба не загубилася
  function newCode() {
    const nc = genCode();
    for (const code of N.online.keys()) send(code, { t: 'recode', code: nc });
    setTimeout(() => { stop(); C().store.set('friendCode', nc); N.uid = null; start(); emit(); }, 400);
  }

  /* ---------- анімація зустрічі: аватари біжать назустріч і обіймаються ---------- */
  // режим: auto — велика поза грою й маленька в куті під час гри; mini — завжди маленька; off — лише текстове сповіщення.
  // Автоматичні зустрічі й чужі обійми — не частіше 3 разів на годину; «🔕» ховає анімацію на годину.
  let meeting = false;
  const MEET_LIMIT = 3;
  const inGame = () => document.body.classList.contains('in-rocket') || document.body.classList.contains('in-game') || !!document.querySelector('main .q-card:not(.result)');
  function meetAllowed(self) {
    const K = C(), mode = K.store.get('meetMode', 'auto');
    if (mode === 'off') return false;
    if (self) return true;
    if (K.store.get('meetSnoozeUntil', 0) > Date.now()) return false;
    const log = (K.store.get('meetLog', []) || []).filter(t => Date.now() - t < 3600000);
    if (log.length >= MEET_LIMIT) return false;
    K.store.set('meetLog', [...log, Date.now()]);
    return true;
  }
  function meetMini(f, best) {
    const K = C(), { h } = K, m = me();
    const box = h('div', { class: 'meet-mini' + (best ? ' best' : ''), role: 'status' },
      h('span', { class: 'mm-pair' }, AV(m.avatar, { size: 44, mood: 'cheer' }), h('i', {}, best ? '🤗' : '✋'), AV(f.avatar, { size: 44, mood: 'cheer' })),
      h('small', {}, (best ? fx('meet_best') : fx('meet')) + ' · ' + f.name),
      h('button', { class: 'mm-x', type: 'button', title: fx('snooze'), 'aria-label': fx('snooze'), onclick: () => { K.store.set('meetSnoozeUntil', Date.now() + 3600000); close(); } }, '🔕'));
    document.body.append(box);
    K.Sfx.tick();
    const close = () => { box.classList.add('out'); setTimeout(() => { box.remove(); meeting = false; }, 300); };
    setTimeout(close, 3200);
  }
  function meet(f, explicit, theyBest = false, self = false) {
    if (meeting || !f) return;
    const K = C(), { h } = K, m = me(); if (!m) return;
    if (!meetAllowed(self)) return;
    meeting = true;
    const best = !!f.best || theyBest; // обіймаються, якщо хоч один назвав іншого близьким
    if (K.store.get('meetMode', 'auto') === 'mini' || inGame()) { meetMini(f, best); return; }
    const hearts = h('div', { class: 'meet-hearts', 'aria-hidden': 'true' }, Array.from({ length: 12 }, (_, i) => h('i', { style: { '--i': i } }, best ? ['💖', '💛', '💜', '💚'][i % 4] : ['✨', '⭐', '🎉'][i % 3])));
    const box = h('div', { class: 'meet' + (best ? ' best' : ' five'), role: 'status' },
      h('div', { class: 'meet-stage' },
        h('div', { class: 'meet-p left' }, AV(m.avatar, { size: 130, mood: 'cheer' }), h('b', {}, m.name)),
        h('div', { class: 'meet-mid', 'aria-hidden': 'true' }, best ? '🤗' : '✋'),
        h('div', { class: 'meet-p right' }, AV(f.avatar, { size: 130, mood: 'cheer' }), h('b', {}, f.name)),
        hearts),
      h('p', { class: 'meet-t' }, best ? fx('meet_best') : fx('meet')));
    document.body.append(box);
    if (window.KomiksMusic && window.KomiksMusic.isOn()) window.KomiksMusic.fanfare(0.9); else K.Sfx.win();
    const close = () => { box.classList.add('out'); setTimeout(() => { box.remove(); meeting = false; }, 400); };
    box.addEventListener('click', close);
    setTimeout(close, explicit ? 3600 : 4200);
  }

  /* ---------- сповіщення ---------- */
  function toast(text, actions, avatar) {
    const { h } = C();
    let wrap = document.querySelector('.fr-toasts');
    if (!wrap) { wrap = h('div', { class: 'fr-toasts', 'aria-live': 'polite' }); document.body.append(wrap); }
    const t = h('div', { class: 'fr-toast' }, avatar ? AV(avatar, { size: 44, mood: 'cheer' }) : null, h('span', {}, text));
    const close = () => { t.classList.add('out'); setTimeout(() => t.remove(), 300); };
    if (actions) t.append(h('div', { class: 'fr-toast-a' }, actions.map(([label, fn]) => h('button', { class: 'btn' + (fn ? ' accent' : ''), type: 'button', onclick: () => { close(); if (fn) fn(); } }, label))));
    wrap.prepend(t);
    while (wrap.children.length > 4) wrap.lastChild.remove();
    setTimeout(close, actions ? 20000 : 5000);
  }

  /* ---------- плаваюча кнопка «друзі онлайн» ---------- */
  function pill() {
    const { h } = C();
    const b = h('a', { class: 'fr-pill', href: '#/friends', 'aria-label': fx('title') });
    const draw = () => {
      const on = C().currentUser() && list().length;
      b.hidden = !on;
      if (!on) return;
      const online = list().filter(f => onl(f.code));
      const incoming = list().filter(f => f.status === 'incoming').length;
      b.replaceChildren(...[h('span', { class: 'fr-faces' }, online.slice(0, 3).map(f => AV(f.avatar, { size: 30 }))), h('b', {}, '👥 ' + fx('count', online.length)), incoming ? h('i', { class: 'fr-badge' }, incoming) : null].filter(Boolean));
      b.classList.toggle('live', online.length > 0);
    };
    N.listeners.add(draw); draw();
    return b;
  }
  // ядро (app.js) може завантажитися пізніше — чекаємо на нього
  const mountPill = () => { if (!window.KomiksCore || !document.body) { setTimeout(mountPill, 200); return; } document.body.append(pill()); };
  mountPill();

  /* ---------- сторінка #/friends ---------- */
  function render(id, arg) {
    const K = C(), { h } = K;
    const root = h('section', { class: 'friends' });
    if (id === 'add' && arg && K.currentUser()) { const msg = add(arg); if (msg) setTimeout(() => toast(msg), 300); history.replaceState(null, '', '#/friends'); }
    const draw = () => {
      if (!root.isConnected && root.__drawn) { N.listeners.delete(draw); return; }
      root.__drawn = true;
      if (!K.currentUser()) { root.replaceChildren(K.pageHead(fx('title')), h('div', { class: 'box center' }, h('p', {}, fx('login')), h('a', { class: 'btn accent', href: '#/login' }, fx('login_btn')))); return; }
      const code = myCode();
      const url = location.href.split('#')[0].split('?')[0] + '#/friends/add/' + code;
      let qr = null;
      if (window.qrcode) { try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); qr = K.svgEl(q.createSvgTag({ cellSize: 5, margin: 2, scalable: true })); } catch { /* ignore */ } }
      const input = h('input', { type: 'text', maxlength: 6, placeholder: fx('add_ph'), class: 'fr-input', autocapitalize: 'characters' });
      input.addEventListener('input', () => { input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const msg = h('p', { class: 'hint' });
      const doAdd = () => { msg.textContent = add(input.value) || ''; input.value = ''; };
      input.addEventListener('keydown', e => { if (e.key === 'Enter') doAdd(); });
      const fr = list().sort((a, b) => (!!onl(b.code) - !!onl(a.code)) || ((b.status === 'incoming') - (a.status === 'incoming')) || (b.best - a.best) || a.name.localeCompare(b.name));
      const room = window.KomiksGame && window.KomiksGame.roomCode();
      const card = f => {
        const on = onl(f.code);
        const status = f.status === 'incoming' ? fx('incoming') : f.status === 'pending' ? fx('pending') : on ? (fx('act')[on.act] || fx('act')['']) : fx('offline');
        return h('div', { class: 'fr-card' + (on ? ' on' : '') + (f.best ? ' best' : '') + ' ' + f.status },
          h('div', { class: 'fr-ava' }, AV(f.avatar, { size: 84, mood: on ? 'cheer' : 'idle' }), h('i', { class: 'fr-dot', title: on ? fx('online') : fx('offline') })),
          h('div', { class: 'fr-info' }, h('b', {}, (f.best ? '⭐ ' : '') + f.name), h('small', {}, status), h('code', {}, f.code), f.status === 'friend' ? h('a', { class: 'fr-prof', href: '#/player/c/' + f.code }, fx('profile')) : null),
          h('div', { class: 'fr-act' },
            f.status === 'incoming' ? [h('button', { class: 'btn accent', type: 'button', onclick: () => accept(f.code) }, fx('accept')), h('button', { class: 'btn', type: 'button', onclick: () => remove(f.code) }, fx('decline'))] : null,
            f.status === 'friend' && on ? [h('button', { class: 'btn accent', type: 'button', onclick: () => together(f.code) }, fx('together')),
              room ? h('button', { class: 'btn', type: 'button', onclick: () => { if (invite(f.code, 'game')) toast(fx('invited', f.name), null, f.avatar); } }, fx('inv_game') + ' ' + room) : null,
              h('button', { class: 'btn', type: 'button', onclick: () => hug(f.code) }, f.best ? fx('hug') : fx('five'))] : null,
            f.status === 'friend' ? h('label', { class: 'fr-best', title: fx('best_hint') }, h('input', { type: 'checkbox', checked: !!f.best, onchange: e => setBest(f.code, e.target.checked) }), h('span', {}, fx('best'))) : null,
            f.status !== 'incoming' ? h('button', { class: 'fr-x', type: 'button', title: fx('remove'), 'aria-label': fx('remove'), onclick: () => { if (confirm(fx('remove') + '?')) remove(f.code); } }, '✕') : null));
      };
      const share = window.KomiksExtras && window.KomiksExtras.shareButton ? window.KomiksExtras.shareButton(url, `Komiks·Lab · ${fx('scan')} · ${code}`) : null;
      // обгортка h() відкидає null (рідний replaceChildren друкує «null»)
      root.replaceChildren(h('div', { class: 'fr-page' }, K.pageHead(fx('title')),
        N.netErr ? h('p', { class: 'lr-warn' }, fx('net')) : null,
        h('div', { class: 'fr-top' },
          h('div', { class: 'box fr-me' }, h('h3', {}, fx('my_code')), h('div', { class: 'fr-code' }, code), qr ? h('div', { class: 'fr-qr' }, qr) : null, h('small', {}, fx('scan')), h('div', { class: 'row-left' }, share, h('button', { class: 'btn', type: 'button', onclick: newCode }, fx('new_code'))), h('p', { class: 'hint' }, fx('privacy'))),
          h('div', { class: 'box' }, h('h3', {}, fx('add_t')), h('div', { class: 'row-left' }, input, h('button', { class: 'btn accent', type: 'button', onclick: doAdd }, fx('add'))), msg,
            h('a', { class: 'btn', href: '#/players' }, fx('find')),
            h('h3', { class: 'fr-anim-t' }, fx('anim_t')),
            h('div', { class: 'fr-anim' }, Object.entries(fx('anim')).map(([v, label]) => h('label', {}, h('input', { type: 'radio', name: 'meetMode', checked: K.store.get('meetMode', 'auto') === v, onchange: () => K.store.set('meetMode', v) }), h('span', {}, label)))),
            h('p', { class: 'hint' }, fx('best_hint'), ' ', fx('anim_d')))),
        fr.length ? h('div', { class: 'fr-list' }, fr.map(card)) : h('p', { class: 'fr-none' }, fx('none'))));
    };
    N.listeners.add(draw);
    // QR-бібліотека — лениво
    if (!window.qrcode) { const s = document.createElement('script'); s.src = 'assets/vendor/qrcode.js'; s.onload = draw; document.head.appendChild(s); }
    draw();
    return root;
  }
  window.KomiksFriends = { render, add, accept, remove, hug, invite, together, list, online: () => [...N.online.keys(), ...list().filter(f => f.status === 'friend' && isBot(f.code)).map(f => f.code)], myCode, start };
})();
