/* Комікс·Lab — профілі гравців і значки.
   #/player — мій профіль; #/player/<id> — профіль іншого акаунта на цьому пристрої (якщо він дозволив показ);
   #/player/s/<дані> — профіль із посилання «Поділитися» (знімок результатів у самому посиланні, без сервера);
   #/players — гравці цього пристрою. Стіна: писати можуть лише зареєстровані після дитячого прикладу (капча) з антифлудом.
   KomiksPlayers.badgeGrid(snap) — сучасні значки-медалі (16 шт.) з прогресом. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const TX = {
    uk: {
      title: '👤 Профіль гравця', me: 'Мій профіль', since: d => `з нами з ${d}`, private: '🔒 Гравець закрив свій профіль.', notfound: 'Гравця не знайдено.',
      st: { read: 'комікси', tests: 'тести', stars: 'зірки', known: 'слова «знаю»', streak: 'днів поспіль', race: 'перемоги в гонці', rocket: 'рекорд Math Rocket', games: 'ігри разом' },
      badges: (a, b) => `🏅 Отримані значки · ${a} з ${b}`, recent: '📈 Останні результати', none: 'Ще немає результатів.',
      share_t: '🌍 Показ профілю', share_on: 'Дозволити бачити мій профіль, прогрес і результати', share_d: 'Інші гравці цього пристрою та ті, кому ти надішлеш посилання, побачать аватар, ім’я, зірки, значки й результати тестів. Пошта й пароль не показуються ніколи.',
      share_btn: '📤 Поділитися профілем', view: '👁️ Переглянути профіль', snapshot: d => `📸 Знімок профілю від ${d}`, open_site: '📚 Відкрити Комікс·Lab',
     
      wall: '💬 Стіна', wall_ph: 'Напиши щось приємне…', post: 'Написати', login_to: 'Увійди або зареєструйся, щоб писати на стіні.', wall_local: 'Коментарі зберігаються на цьому пристрої.', wall_shared: '🌍 Коментарі бачать усі, хто відкриває цей профіль. Пиши по-доброму!', wall_empty: 'Поки що тут порожньо — напиши першим!', del: 'Видалити', wall_snap: 'Стіну видно на пристрої гравця. Тут — лише його результати.', cap_t: '🧮 Розв’яжи приклад — і коментар полетить!', cap_wrong: 'Ой, не так! Ось новий приклад 🙂', cancel: 'Скасувати', wait: n => `⏳ Наступний коментар — через ${n} с`, err: { slow_down: 'Зачекай трохи перед наступним коментарем.', wall_busy: 'На цій стіні зараз дуже багато коментарів — спробуй за кілька хвилин.', repeat: 'Такий коментар уже є.', links: 'Посилання на стіні заборонені.', closed: 'Власник закрив коментарі.', net: 'Не вдалося надіслати — перевір інтернет.' },
      players: '👥 Гравці', players_d: 'Акаунти на цьому пристрої, які відкрили свій профіль.', open: 'Профіль →', you: 'ти',
      ex: { words50: ['50 слів', 'познач «знаю» 50 слів'], words200: ['Поліглот', '200 слів у двох курсах'], race1: ['Перша перемога', 'виграй Логік-гонку'], race10: ['Чемпіон гонок', '10 перемог у Логік-гонці'], rocket: ['Космонавт', '150 очок у Math Rocket'], games5: ['Командний гравець', '5 ігор разом'], collector: ['Колекціонер', '10 речей для аватара'], stars30: ['Зоряний', 'збери 30 зірок'] }
    },
    en: {
      title: '👤 Player profile', me: 'My profile', since: d => `member since ${d}`, private: '🔒 This player keeps the profile private.', notfound: 'Player not found.',
      st: { read: 'comics', tests: 'tests', stars: 'stars', known: 'words “I know”', streak: 'day streak', race: 'race wins', rocket: 'Math Rocket best', games: 'group games' },
      badges: (a, b) => `🏅 Badges earned · ${a} of ${b}`, recent: '📈 Latest results', none: 'No results yet.',
      share_t: '🌍 Profile visibility', share_on: 'Let others see my profile, progress and results', share_d: 'Other players on this device and anyone you send the link to will see your avatar, name, stars, badges and test results. E-mail and password are never shown.',
      share_btn: '📤 Share my profile', view: '👁️ View profile', snapshot: d => `📸 Profile snapshot from ${d}`, open_site: '📚 Open Komiks·Lab',
     
      wall: '💬 Wall', wall_ph: 'Write something nice…', post: 'Post', login_to: 'Log in or sign up to write on the wall.', wall_local: 'Comments are stored on this device.', wall_shared: '🌍 Everyone who opens this profile sees the comments. Be kind!', wall_empty: 'Nothing here yet — be the first!', del: 'Delete', wall_snap: 'The wall lives on the player’s device. Here you see their results.', cap_t: '🧮 Solve the sum — and your comment flies!', cap_wrong: 'Oops, not quite! Here is a new one 🙂', cancel: 'Cancel', wait: n => `⏳ Next comment in ${n} s`, err: { slow_down: 'Wait a little before the next comment.', wall_busy: 'This wall is very busy right now — try again in a few minutes.', repeat: 'This comment is already here.', links: 'Links are not allowed on the wall.', closed: 'The owner has closed comments.', net: 'Could not send — check your internet.' },
      players: '👥 Players', players_d: 'Accounts on this device with a public profile.', open: 'Profile →', you: 'you',
      ex: { words50: ['50 words', 'mark 50 words as known'], words200: ['Polyglot', '200 words in both courses'], race1: ['First win', 'win the Logic Race'], race10: ['Race champion', '10 Logic Race wins'], rocket: ['Astronaut', '150 points in Math Rocket'], games5: ['Team player', '5 group games'], collector: ['Collector', '10 avatar items'], stars30: ['Star student', 'collect 30 stars'] }
    },
    no: {
      title: '👤 Spillerprofil', me: 'Min profil', since: d => `medlem siden ${d}`, private: '🔒 Spilleren har en privat profil.', notfound: 'Fant ikke spilleren.',
      st: { read: 'tegneserier', tests: 'tester', stars: 'stjerner', known: 'ord «jeg kan»', streak: 'dager på rad', race: 'seire i løpet', rocket: 'rekord i raketten', games: 'spill sammen' },
      badges: (a, b) => `🏅 Merker · ${a} av ${b}`, recent: '📈 Siste resultater', none: 'Ingen resultater ennå.',
      share_t: '🌍 Synlig profil', share_on: 'La andre se profilen, fremgangen og resultatene mine', share_d: 'Andre spillere på denne enheten og alle som får lenken, ser avatar, navn, stjerner, merker og resultater. E-post og passord vises aldri.',
      share_btn: '📤 Del profilen', view: '👁️ Se profilen', snapshot: d => `📸 Profilbilde fra ${d}`, open_site: '📚 Åpne Komiks·Lab',
     
      wall: '💬 Vegg', wall_ph: 'Skriv noe hyggelig …', post: 'Skriv', login_to: 'Logg inn eller registrer deg for å skrive på veggen.', wall_local: 'Kommentarene lagres på denne enheten.', wall_shared: '🌍 Alle som åpner profilen, ser kommentarene. Vær snill!', wall_empty: 'Tomt her ennå – skriv først!', del: 'Slett', wall_snap: 'Veggen finnes på spillerens enhet. Her ser du resultatene.', cap_t: '🧮 Løs regnestykket – så sendes kommentaren!', cap_wrong: 'Oi, ikke helt! Her er et nytt 🙂', cancel: 'Avbryt', wait: n => `⏳ Neste kommentar om ${n} s`, err: { slow_down: 'Vent litt før neste kommentar.', wall_busy: 'Det er veldig travelt på denne veggen nå – prøv igjen om noen minutter.', repeat: 'Denne kommentaren finnes allerede.', links: 'Lenker er ikke tillatt på veggen.', closed: 'Eieren har stengt kommentarene.', net: 'Kunne ikke sende – sjekk internett.' },
      players: '👥 Spillere', players_d: 'Kontoer på denne enheten med åpen profil.', open: 'Profil →', you: 'deg',
      ex: { words50: ['50 ord', 'merk 50 ord som kjente'], words200: ['Polyglott', '200 ord i begge kursene'], race1: ['Første seier', 'vinn Logikkløpet'], race10: ['Løpsmester', '10 seire i Logikkløpet'], rocket: ['Astronaut', '150 poeng i raketten'], games5: ['Lagspiller', '5 spill sammen'], collector: ['Samler', '10 ting til avataren'], stars30: ['Stjerneelev', 'samle 30 stjerner'] }
    }
  };
  TX.ar = {
    title: '👤 ملف اللاعب', me: 'ملفي', since: d => `عضو منذ ${d}`, private: '🔒 هذا اللاعب يُبقي ملفه خاصًا.', notfound: 'لم يُعثر على اللاعب.',
    st: { read: 'قصص', tests: 'اختبارات', stars: 'نجوم', known: 'كلمات «أعرفها»', streak: 'أيام متتالية', race: 'انتصارات السباق', rocket: 'أفضل نتيجة في Math Rocket', games: 'ألعاب جماعية' },
    badges: (a, b) => `🏅 الأوسمة · ${a} من ${b}`, recent: '📈 آخر النتائج', none: 'لا نتائج بعد.',
    share_t: '🌍 ظهور الملف', share_on: 'اسمح للآخرين برؤية ملفي وتقدّمي ونتائجي', share_d: 'سيرى الآخرون شخصيتك واسمك ونجومك وأوسمتك ونتائج اختباراتك. البريد وكلمة المرور لا يظهران أبدًا.',
    share_btn: '📤 شارك ملفي', view: '👁️ عرض الملف', snapshot: d => `📸 لقطة من الملف بتاريخ ${d}`, open_site: '📚 افتح Komiks·Lab',
    wall: '💬 الجدار', wall_ph: 'اكتب شيئًا لطيفًا…', post: 'نشر', login_to: 'سجّل الدخول لتكتب على الجدار.', wall_local: 'تُحفظ التعليقات على هذا الجهاز.', wall_shared: '🌍 كل من يفتح هذا الملف يرى التعليقات. كن لطيفًا!', wall_empty: 'لا شيء هنا بعد — كن الأول!', del: 'حذف', wall_snap: 'الجدار على جهاز اللاعب. هنا ترى نتائجه.', cap_t: '🧮 حلّ المسألة — ويُنشر تعليقك!', cap_wrong: 'أوه، ليس تمامًا! إليك مسألة جديدة 🙂', cancel: 'إلغاء', wait: n => `⏳ التعليق التالي بعد ${n} ث`, err: { slow_down: 'انتظر قليلًا قبل التعليق التالي.', wall_busy: 'هذا الجدار مزدحم الآن — حاول بعد دقائق.', repeat: 'هذا التعليق موجود بالفعل.', links: 'الروابط غير مسموحة على الجدار.', closed: 'أغلق صاحب الجدار التعليقات.', net: 'تعذّر الإرسال — تحقّق من الإنترنت.' },
    players: '👥 اللاعبون', players_d: 'حسابات على هذا الجهاز بملف عام.', open: 'الملف ←', you: 'أنت',
    ex: { words50: ['50 كلمة', 'علّم 50 كلمة كمعروفة'], words200: ['متعدّد اللغات', '200 كلمة في الدورتين'], race1: ['أول فوز', 'افز بسباق المنطق'], race10: ['بطل السباق', '10 انتصارات في السباق'], rocket: ['رائد فضاء', '150 نقطة في Math Rocket'], games5: ['لاعب فريق', '5 ألعاب جماعية'], collector: ['جامع', '10 أغراض للشخصية'], stars30: ['تلميذ متألّق', 'اجمع 30 نجمة'] }
  };
  const C = () => window.KomiksCore;
  const px = (k, ...a) => { const t = TX[C().ui] || TX.en || TX.uk; const v = k in t ? t[k] : (TX.en || TX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : document.createTextNode(String(code || '🙂').split('|')[0]));

  /* ---------- знімок прогресу (свого або іншого акаунта) ---------- */
  const reader = uid => (k, d) => (uid ? C().raw.get(`comiks.u.${uid}.${k}`, d) : C().store.get(k, d));
  const iso = d => d.toISOString().slice(0, 10);
  function streakOf(days) {
    const set = new Set(days || []), d = new Date();
    if (!set.has(iso(d))) d.setDate(d.getDate() - 1);
    let n = 0; while (set.has(iso(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function snapshot(uid) {
    const K = C(), get = reader(uid);
    const u = uid ? (K.raw.get('comiks.users', {})[uid] || null) : K.currentUser();
    const prog = get('progress', {}), stats = get('stats', {});
    return {
      name: u ? u.name : '?', avatar: get('avatar', null) || (uid ? '🦊' : (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊')), created: u ? u.created : '',
      comics: K.COMICS.length, read: K.COMICS.filter(c => get('seen.' + c.id, []).length >= c.panels.length).length,
      tests: Object.values(prog).filter(x => x.stars > 0).length, stars: Object.values(prog).reduce((n, x) => n + (x.stars || 0), 0),
      known: (get('wordsKnown', []) || []).length, knownEn: (get('wordsKnownEn', []) || []).length,
      cards: Object.values(get('cards', {})).filter(x => x.box >= 3).length, streak: streakOf(get('days', [])),
      quizzes: stats.quizzes || 0, perfect: stats.perfect || 0, pairs: stats.pairs || 0, speak3: stats.speak3 || 0, roles: stats.roles || 0,
      games: stats.games || 0, raceWins: stats.raceWins || 0, mathBest: get('mathBest', 0) || 0, items: (get('unlockedItems', []) || []).length,
      recent: (get('quizlog', []) || []).slice(0, 8).map(q => ({ t: q.title, s: q.score, of: q.total, st: q.stars, d: String(q.date || '').slice(0, 10), pl: q.place || 0, pn: q.of || 0 }))
    };
  }

  /* ---------- значки ---------- */
  const BADGES = [
    { id: 'first', core: 0, ic: 'checklist', col: '#d81b60', goal: 1, val: s => s.quizzes },
    { id: 'perfect', core: 1, ic: 'star', col: '#f9a825', goal: 1, val: s => s.perfect },
    { id: 'books', core: 2, ic: 'book', col: '#5e35b1', goal: s => s.comics, val: s => s.read },
    { id: 'pairs', core: 3, ic: 'layout', col: '#00897b', goal: 3, val: s => s.pairs },
    { id: 'voice', core: 4, ic: 'sound', col: '#1e88e5', goal: 10, val: s => s.speak3 },
    { id: 'actor', core: 5, ic: 'smile', col: '#8e24aa', goal: 1, val: s => s.roles },
    { id: 'cards', core: 6, ic: 'tag', col: '#43a047', goal: 20, val: s => s.cards },
    { id: 'streak3', core: 7, ic: 'fire', col: '#f4511e', goal: 3, val: s => s.streak },
    { id: 'words50', ic: 'tag', col: '#00838f', goal: 50, val: s => s.known },
    { id: 'words200', ic: 'globe', col: '#3949ab', goal: 200, val: s => s.known + s.knownEn },
    { id: 'race1', ic: 'flag', col: '#2e7d32', goal: 1, val: s => s.raceWins },
    { id: 'race10', ic: 'trophy', col: '#c62828', goal: 10, val: s => s.raceWins },
    { id: 'rocket', ic: 'rocket', col: '#e53935', goal: 150, val: s => s.mathBest },
    { id: 'games5', ic: 'gamepad', col: '#6d4c41', goal: 5, val: s => s.games },
    { id: 'collector', ic: 'heart', col: '#ec407a', goal: 10, val: s => s.items },
    { id: 'stars30', ic: 'star', col: '#fb8c00', goal: 30, val: s => s.stars }
  ];
  const goalOf = (b, s) => Math.max(1, typeof b.goal === 'function' ? b.goal(s) : b.goal);
  const isGot = (b, s) => (b.val(s) || 0) >= goalOf(b, s);
  function badgeText(b) {
    const K = C();
    if (b.core != null) { const list = K.tx('badges') || []; return list[b.core] || [b.id, '']; }
    return px('ex')[b.id] || [b.id, ''];
  }
  let gid = 0;
  function medal(b, got, size = 84) {
    const inner = window.KomiksIcons ? window.KomiksIcons.svg(b.ic).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') : '';
    const col = got ? b.col : '#aab2bf', id = 'bd' + (++gid);
    const s = `<svg class="medal" viewBox="0 0 100 118" width="${size}" height="${Math.round(size * 1.18)}" aria-hidden="true">
<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<path d="M32 76 L20 114 L36 105 L45 117 L52 84Z" fill="${got ? '#ee4035' : '#cfd5de'}" stroke="#141414" stroke-width="3" stroke-linejoin="round"/>
<path d="M68 76 L80 114 L64 105 L55 117 L48 84Z" fill="${got ? '#2e86de' : '#cfd5de'}" stroke="#141414" stroke-width="3" stroke-linejoin="round"/>
<polygon points="50,4 91,27 91,73 50,96 9,73 9,27" fill="${col}" stroke="#141414" stroke-width="4" stroke-linejoin="round"/>
<polygon points="50,4 91,27 91,73 50,96 9,73 9,27" fill="url(#${id})"/>
<polygon points="50,15 81,33 81,67 50,85 19,67 19,33" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2.5" stroke-dasharray="${got ? '0' : '4 4'}"/>
<g transform="translate(26 26) scale(2)" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
${got ? '' : '<g transform="translate(66 64)"><circle r="13" fill="#141414"/><rect x="-6" y="-2" width="12" height="9" rx="2" fill="#fff"/><path d="M-4 -2 v-3 a4 4 0 0 1 8 0 v3" fill="none" stroke="#fff" stroke-width="2.4"/></g>'}
</svg>`;
    return C().svgEl(s);
  }
  function badgeGrid(snap, { small = false } = {}) {
    const K = C(), { h } = K;
    const s = snap || snapshot('');
    const got = BADGES.filter(b => isGot(b, s)).length;
    // спершу отримані, далі — найближчі до отримання
    const order = BADGES.slice().sort((a, b) => (isGot(b, s) - isGot(a, s)) || ((b.val(s) || 0) / goalOf(b, s) - (a.val(s) || 0) / goalOf(a, s)));
    return h('div', { class: 'bdg-wrap' }, h('h3', { class: 'sec-sub' }, px('badges', got, BADGES.length)),
      h('div', { class: 'bdg-grid' + (small ? ' small' : '') }, order.map((b, i) => {
        const ok = isGot(b, s), [name, desc] = badgeText(b), v = Math.min(b.val(s) || 0, goalOf(b, s)), g = goalOf(b, s);
        return h('div', { class: 'bdg' + (ok ? ' got' : ''), style: { '--i': i, '--c': b.col }, title: desc },
          medal(b, ok, small ? 64 : 84), h('b', {}, name), h('small', {}, ok ? (K.t('badge_got') || '✓') : desc),
          ok ? null : h('span', { class: 'bdg-bar' }, h('i', { style: { width: Math.round(v / g * 100) + '%' } }), h('em', {}, `${v}/${g}`)));
      })));
  }

  /* ---------- посилання-знімок ---------- */
  const enc = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const dec = s => { try { const b = s.replace(/-/g, '+').replace(/_/g, '/'); return JSON.parse(decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4))))); } catch { return null; } };
  const NUMS = ['comics', 'read', 'tests', 'stars', 'known', 'knownEn', 'cards', 'streak', 'quizzes', 'perfect', 'pairs', 'speak3', 'roles', 'games', 'raceWins', 'mathBest', 'items'];
  function shareUrl(s) {
    const o = { n: s.name, a: s.avatar, fc: window.KomiksFriends ? window.KomiksFriends.myCode() : '', c: s.created, at: iso(new Date()), v: NUMS.map(k => s[k] | 0), r: s.recent.slice(0, 5).map(q => [String(q.t || '').slice(0, 40), q.s | 0, q.of | 0, q.st | 0, q.d || '', q.pl | 0, q.pn | 0]) };
    const base = location.href.split('#')[0].split('?')[0];
    return base + '#/player/s/' + enc(o);
  }
  function fromShare(code) {
    const o = dec(code || '');
    if (!o || typeof o.n !== 'string' || !Array.isArray(o.v)) return null;
    const s = { fc: /^[A-HJ-NP-Z2-9]{6}$/.test(o.fc || '') ? o.fc : '', name: o.n.slice(0, 20), avatar: window.KomiksAvatars && window.KomiksAvatars.valid(o.a) ? o.a : '🙂', created: String(o.c || '').slice(0, 30), at: String(o.at || '').slice(0, 10), recent: [] };
    NUMS.forEach((k, i) => { s[k] = Math.max(0, Math.min(100000, o.v[i] | 0)); });
    s.recent = (Array.isArray(o.r) ? o.r : []).slice(0, 5).map(q => ({ t: String(q[0] || '').slice(0, 40), s: q[1] | 0, of: q[2] | 0, st: Math.min(3, q[3] | 0), d: String(q[4] || '').slice(0, 10), pl: Math.min(99, q[5] | 0), pn: Math.min(99, q[6] | 0) }));
    return s;
  }

  /* ---------- стіна: спільна через api/wall.php (якщо сервер підтримує PHP), інакше — на цьому пристрої.
     Перед відправкою — дитячий приклад (+/−, «гарні» числа до 10 з яблучками); антифлуд — на сервері й відлік тут ---------- */
  const wallKey = uid => 'comiks.wall.' + uid;
  const API = 'api/wall.php';
  let apiState = null;
  const apiOk = () => apiState || (apiState = (location.protocol.startsWith('http') ? fetch(API + '?owner=PING', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(j => !!(j && j.ok && j.wall)).catch(() => false) : Promise.resolve(false)));
  // X-Komiks: 1 — захист від CSRF (сервер без нього відхиляє POST); cookie сесії — щоб сервер знав акаунт і модератора
  const api = body => fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) }).then(r => r.json().catch(() => ({ ok: false, error: 'net' }))).catch(() => ({ ok: false, error: 'net' }));
  const rnd = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
  const keyOf = k => { const K = C(); let v = K.store.get(k, null); if (!v || String(v).length < 32) { v = rnd(); K.store.set(k, v); } return v; };
  const codeOf = uid => (uid ? C().raw.get(`comiks.u.${uid}.friendCode`, null) : (window.KomiksFriends ? window.KomiksFriends.myCode() : null));
  const claimed = new Set();
  async function claim(code) { if (!code || claimed.has(code)) return; claimed.add(code); await api({ action: 'claim', owner: code, secret: keyOf('wallSecret') }); }
  async function setWallOpen(open) { const code = codeOf(''); if (!code || !(await apiOk())) return; await claim(code); await api({ action: 'close', owner: code, secret: keyOf('wallSecret'), open }); }
  // приклад: із сервера (перевіряє сервер) або локальний
  function localCaptcha() {
    const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    let a, b, op, ans;
    if (Math.random() < 0.5) { a = R(1, 9); b = R(1, 9); op = '+'; ans = a + b; } else { a = R(4, 12); b = R(1, a - 1); op = '-'; ans = a - b; }
    const opts = new Set([ans]); while (opts.size < 4) { const v = ans + R(-3, 3); if (v >= 0) opts.add(v); }
    return { q: { a, op, b }, opts: [...opts].sort(() => Math.random() - 0.5), local: ans };
  }
  const FRUIT = ['🍎', '🍓', '🍊', '⭐', '🎈', '🐞', '🍪', '🌼'];
  function captchaView(cap, onPick, title) {   // title — свій заголовок (вікно відгуку)
    const { h } = C();
    const { a, op, b } = cap.q, sign = op === '+' ? '+' : '−', icon = FRUIT[(a * 3 + b) % FRUIT.length];
    const dots = (n, cross = 0) => h('span', { class: 'cap-dots' }, Array.from({ length: n }, (_, i) => h('i', { class: i >= n - cross ? 'x' : '' }, icon)));
    return h('div', { class: 'cap', role: 'group' },
      h('b', { class: 'cap-t' }, title || px('cap_t')),
      h('div', { class: 'cap-eq' }, h('span', { class: 'cap-n n1' }, a), h('span', { class: 'cap-op' }, sign), h('span', { class: 'cap-n n2' }, b), h('span', { class: 'cap-op' }, '='), h('span', { class: 'cap-n q' }, '?')),
      op === '+' ? h('div', { class: 'cap-pics' }, dots(a), h('em', {}, '+'), dots(b)) : h('div', { class: 'cap-pics' }, dots(a, b)),
      h('div', { class: 'cap-opts' }, cap.opts.map((v, i) => h('button', { class: 'cap-opt c' + (i + 1), type: 'button', onclick: () => onPick(v) }, v))));
  }
  // модерація стіни (адмін / модератор): прибрати, попередити анімацією, тимчасово заборонити писати
  const MODX = {
    uk: { del: '🗑 Прибрати', warn: '⚠️ Попередити', ban: h => `⛔ ${h === 1 ? '1 год' : h === 24 ? '1 добу' : '7 днів'}`, done: 'Готово ✓', q: 'Застосувати до автора цього допису?', banned: until => `Тобі тимчасово заборонено писати на стінах (до ${until}).`, badge: '🛡 Модерація' },
    en: { del: '🗑 Remove', warn: '⚠️ Warn', ban: h => `⛔ ${h === 1 ? '1 h' : h === 24 ? '1 day' : '7 days'}`, done: 'Done ✓', q: 'Apply to the author of this comment?', banned: until => `You are temporarily not allowed to write on walls (until ${until}).`, badge: '🛡 Moderation' },
    ar: { del: '🗑 إزالة', warn: '⚠️ تحذير', ban: h => `⛔ ${h === 1 ? 'ساعة' : h === 24 ? 'يوم' : '7 أيام'}`, done: 'تم ✓', q: 'تطبيق ذلك على كاتب هذا التعليق؟', banned: until => `يُمنع عليك مؤقتًا الكتابة على الجدران (حتى ${until}).`, badge: '🛡 إشراف' },
    no: { del: '🗑 Fjern', warn: '⚠️ Advar', ban: h => `⛔ ${h === 1 ? '1 t' : h === 24 ? '1 døgn' : '7 dager'}`, done: 'Ferdig ✓', q: 'Bruke dette på forfatteren av innlegget?', banned: until => `Du kan midlertidig ikke skrive på vegger (til ${until}).`, badge: '🛡 Moderering' }
  };
  const mx = (k, ...a) => { const t = MODX[C().ui] || MODX.en; const v = t[k]; return typeof v === 'function' ? v(...a) : v; };
  function wall({ localId = null, code = null, own = false } = {}) {
    const K = C(), { h } = K;
    const me = K.currentUser(), meId = me ? me.id : null;
    const box = h('div', { class: 'box pl-wall' }, h('h3', {}, px('wall')), h('p', { class: 'muted' }, '⏳'));
    const S = { mode: 'local', items: [], open: true, msg: '', draft: '', cap: null, waitUntil: K.store.get('wallWaitUntil', 0) };
    const fmt = d => { try { return new Date(d).toLocaleString(K.ui === 'uk' ? 'uk-UA' : K.ui === 'no' ? 'nb-NO' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };
    const mine = () => K.store.get('wallMine', []);
    const setWait = sec => { S.waitUntil = Date.now() + sec * 1000; K.store.set('wallWaitUntil', S.waitUntil); };
    async function load() {
      if (code && await apiOk()) {
        S.mode = 'server';
        if (own) await claim(code);
        const r = await fetch(API + '?owner=' + code, { cache: 'no-store' }).then(x => x.json()).catch(() => null);
        S.items = r && r.ok ? r.comments : []; S.open = !r || r.open !== false; S.mod = !!(r && r.mod); S.ban = !!(r && r.ban);
      } else if (localId) {
        S.mode = 'local';
        S.items = K.raw.get(wallKey(localId), []).map(m => ({ id: m.id, name: m.name, avatar: m.av, text: m.text, date: m.date, from: m.from }));
      } else S.mode = 'none';
      draw();
    }
    async function askCaptcha() {
      if (S.mode === 'server') { const r = await fetch(API + '?captcha=1', { cache: 'no-store' }).then(x => x.json()).catch(() => null); S.cap = r && r.ok ? r : null; if (!S.cap) { S.msg = px('err').net; } }
      else S.cap = localCaptcha();
      draw();
    }
    async function send(answer) {
      const text = S.draft.trim().slice(0, 300); if (!text || !me) return;
      const avatar = window.KomiksProfile ? window.KomiksProfile.avatar() : '🙂';
      if (S.mode === 'server') {
        const r = await api({ action: 'post', owner: code, name: me.name, avatar, text, akey: keyOf('wallAuthorKey'), token: S.cap.token, answer });
        if (!r.ok) {
          if (r.error === 'captcha') { K.Sfx.bad(); S.msg = px('cap_wrong'); return askCaptcha(); }
          if (r.error === 'slow_down' && r.wait) setWait(Math.min(r.wait, 3600));
          S.cap = null; S.msg = r.error === 'banned' ? mx('banned', fmt(r.until)) : px('err')[r.error] || px('err').net; draw(); return;
        }
        K.store.set('wallMine', [code + ':' + r.comment.id, ...mine()].slice(0, 300));
        setWait(r.wait || 30);
      } else {
        if (answer !== S.cap.local) { K.Sfx.bad(); S.msg = px('cap_wrong'); return askCaptcha(); }
        if (/(https?:\/\/|www\.|t\.me\/)/i.test(text)) { S.cap = null; S.msg = px('err').links; draw(); return; }
        const all = K.raw.get(wallKey(localId), []);
        all.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), from: meId, name: me.name, av: avatar, text, date: new Date().toISOString() });
        K.raw.set(wallKey(localId), all.slice(0, 200));
        setWait(30);
      }
      S.draft = ''; S.cap = null; S.msg = ''; K.Sfx.good(); if (K.confetti) K.confetti(40); load();
    }
    async function del(m) {
      if (S.mode === 'server') await api({ action: 'delete', owner: code, id: m.id, key: own ? keyOf('wallSecret') : keyOf('wallAuthorKey') });
      else K.raw.set(wallKey(localId), K.raw.get(wallKey(localId), []).filter(x => x.id !== m.id));
      load();
    }
    const canDel = m => (S.mode === 'server' ? own || mine().includes(code + ':' + m.id) : !!meId && (meId === localId || meId === m.from));
    async function mod(m, action, hours) {
      if (action !== 'mod_delete' && !confirm(mx('q'))) return;
      const r = await api({ action, owner: code, id: m.id, hours });
      S.msg = r.ok ? mx('done') : px('err').net; load();
    }
    const modBar = m => h('div', { class: 'pl-mod' }, h('button', { type: 'button', onclick: () => mod(m, 'mod_delete') }, mx('del')), h('button', { type: 'button', onclick: () => mod(m, 'mod_warn') }, mx('warn')),
      S.ban ? [1, 24, 168].map(hh => h('button', { type: 'button', class: 'ban', onclick: () => mod(m, 'mod_ban', hh) }, mx('ban', hh))) : null);
    let tick = 0;
    function draw() {
      clearInterval(tick);
      if (S.mode === 'none') { box.replaceChildren(h('h3', {}, px('wall')), h('p', { class: 'muted' }, px('wall_snap'))); return; }
      const left = () => Math.max(0, Math.ceil((S.waitUntil - Date.now()) / 1000));
      let form;
      if (!S.open) form = h('p', { class: 'hint' }, px('err').closed);
      else if (!me) form = h('p', { class: 'hint' }, px('login_to'), ' ', h('a', { href: '#/login' }, '→'));
      else if (S.cap) form = h('div', { class: 'pl-capwrap' }, captchaView(S.cap, v => send(v)), h('button', { class: 'btn', type: 'button', onclick: () => { S.cap = null; draw(); } }, px('cancel')));
      else {
        const input = h('textarea', { maxlength: 300, rows: 3, placeholder: px('wall_ph'), class: 'pl-input' });
        input.value = S.draft;
        input.addEventListener('input', () => { S.draft = input.value; });
        const btn = h('button', { class: 'btn accent', type: 'button', onclick: () => { S.draft = input.value; if (!S.draft.trim() || left() > 0) return; S.msg = ''; askCaptcha(); } }, px('post'));
        const waitEl = h('small', { class: 'pl-wait' });
        const upd = () => { const n = left(); btn.disabled = n > 0; waitEl.textContent = n > 0 ? px('wait', n) : ''; if (!n) clearInterval(tick); };
        upd(); if (left() > 0) tick = setInterval(() => { if (!box.isConnected) return clearInterval(tick); upd(); }, 1000);
        form = h('div', {}, h('div', { class: 'pl-post' }, AV(window.KomiksProfile ? window.KomiksProfile.avatar() : '🙂', { size: 48 }), input, btn), waitEl);
      }
      box.replaceChildren(h('h3', {}, px('wall'), S.mod ? h('span', { class: 'pl-modbadge' }, mx('badge')) : null), form, S.msg ? h('p', { class: 'lr-warn' }, S.msg) : null,
        S.items.length ? h('ul', { class: 'pl-comments' }, S.items.map(m => h('li', { class: 'pl-comment' },
          AV(window.KomiksAvatars && window.KomiksAvatars.valid(m.avatar) ? m.avatar : '🙂', { size: 44 }), h('div', {}, h('b', {}, m.name), h('small', {}, fmt(m.date)), h('p', {}, m.text), S.mod ? modBar(m) : null),
          canDel(m) ? h('button', { class: 'pl-del', type: 'button', title: px('del'), 'aria-label': px('del'), onclick: () => del(m) }, '✕') : null))) : h('p', { class: 'muted' }, px('wall_empty')),
        h('p', { class: 'hint' }, S.mode === 'server' ? px('wall_shared') : px('wall_local')));
    }
    load();
    return box;
  }

  /* ---------- сторінка профілю ---------- */
  const fmtDay = d => { try { return new Date(d).toLocaleDateString(C().ui === 'uk' ? 'uk-UA' : C().ui === 'no' ? 'nb-NO' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return d || ''; } };
  function profileView(s, { own = false, wallOpts = null, shared = false, noWall = false } = {}) {
    const K = C(), { h } = K;
    const cells = [['read', `${s.read}/${s.comics}`], ['tests', s.tests], ['stars', '⭐ ' + s.stars], ['known', s.known + s.knownEn], ['streak', '🔥 ' + s.streak], ['race', '🏁 ' + s.raceWins], ['rocket', '🚀 ' + s.mathBest], ['games', '🎮 ' + s.games]];
    const recent = s.recent.length ? h('ul', { class: 'pl-recent' }, s.recent.map(q => h('li', {}, h('span', { class: 'pl-st' }, '⭐'.repeat(q.st) + '☆'.repeat(3 - q.st)), h('b', {}, q.t), h('small', {}, (q.pl ? `🏆 ${q.pl}/${q.pn} · ` : '') + `${q.s}/${q.of} · ${q.d}`)))) : h('p', { class: 'muted' }, px('none'));
    return h('section', { class: 'player' }, K.pageHead(own ? '👤 ' + px('me') : px('title'), own ? '#/account' : '#/players'),
      shared ? h('p', { class: 'pl-snap' }, px('snapshot', s.at || '')) : null,
      h('div', { class: 'pl-hero' },
        h('div', { class: 'pl-spot' }, AV(s.avatar, { size: 170, mood: 'cheer' })),
        h('div', { class: 'pl-id' }, h('h2', {}, s.name), s.created ? h('small', {}, px('since', fmtDay(s.created))) : null,
          h('div', { class: 'pl-cells' }, cells.map(([k, v]) => h('div', { class: 'pl-cell' }, h('b', {}, v), h('small', {}, px('st')[k])))),
          own ? h('div', { class: 'row-left' }, h('a', { class: 'btn', href: '#/avatar' }, '🎨 Avatar')) : null,
          shared ? h('a', { class: 'btn accent', href: '#/' }, px('open_site')) : null)),
      badgeGrid(s),
      h('div', { class: 'pl-cols' }, h('div', { class: 'box' }, h('h3', {}, px('recent')), recent),
        noWall ? null : wallOpts ? wall(wallOpts) : h('div', { class: 'box' }, h('h3', {}, px('wall')), h('p', { class: 'muted' }, px('wall_snap')))));
  }
  function render(id, arg) {
    const K = C(), { h } = K;
    const me = K.currentUser();
    if (id === 'c' && /^[A-HJ-NP-Z2-9]{6}$/.test(String(arg || '').toUpperCase())) return byCode(String(arg).toUpperCase());
    if (id === 's') { const s = fromShare(arg); return s ? profileView(s, { shared: true, wallOpts: s.fc ? { code: s.fc } : null }) : h('section', {}, K.pageHead(px('title')), h('p', {}, px('notfound'))); }
    if (!id || (me && id === me.id)) {
      if (!me) { location.hash = '#/login'; return h('div'); }
      return profileView(snapshot(''), { own: true, wallOpts: { localId: me.id, code: codeOf(''), own: true } });
    }
    const users = K.raw.get('comiks.users', {});
    if (!users[id]) return h('section', {}, K.pageHead(px('title'), '#/players'), h('p', {}, px('notfound')));
    if (!K.raw.get(`comiks.u.${id}.shareProfile`, false)) return h('section', {}, K.pageHead(px('title'), '#/players'), h('div', { class: 'box center' }, AV(K.raw.get(`comiks.u.${id}.avatar`, '🦊'), { size: 120, mood: 'sad' }), h('h2', {}, users[id].name), h('p', {}, px('private'))));
    return profileView(snapshot(id), { wallOpts: { localId: id, code: codeOf(id) } });
  }
  /* ---------- каталог гравців (api/players.php): пошук, фільтри, «дружити», «позмагатися» ---------- */
  const DX = {
    uk: { official: '💬 офіційний акаунт', botTag: '🤖 віртуальний гравець', title: '🔎 Гравці', intro: 'Шукай інших учнів, дивись їхні профілі, додавай у друзі й змагайся в іграх.', ph: 'Ім’я або код друга…', all: 'Усі', level_all: 'Будь-який рівень', online: 'Лише онлайн', found: n => `Знайдено: ${n}`, more: 'Показати ще',
      learn: { norsk: '🇳🇴 Норвезька', english: '🇬🇧 Англійська', math: '🧮 Математика', logic: '🧩 Логіка' }, none: 'Нікого не знайдено — зміни фільтри.', off: 'Спільний пошук працює на сайті bilohash.com. Нижче — гравці цього пристрою.',
      not_listed: 'Тебе поки не видно в пошуку — інші не можуть тебе знайти.', show_me: '🔎 Показати мене в пошуку', to_account: 'До кабінету', on_device: '💻 На цьому пристрої',
      profile: '👤 Профіль', befriend: '➕ Дружити', friend: '✓ Друг', pending: '⏳ Запит надіслано', compete: '🏁 Позмагатися', you: 'це ти', online_now: '🟢 онлайн', seen: d => `був(ла) ${d}`, compete_later: 'Запит у друзі надіслано — змагайтеся, щойно друг прийме й буде онлайн.', loading: '⏳ Шукаємо…', s_stars: 'зірки', s_badges: 'значки', s_days: 'днів поспіль', c_total: 'гравців', c_near: l => `твого рівня ${l}`, same: '✨ твій рівень', rec: l => `✨ Рекомендовано: спершу гравці твого рівня (${l})` },
    en: { official: '💬 official account', botTag: '🤖 virtual player', title: '🔎 Players', intro: 'Find other learners, view their profiles, add friends and compete in games.', ph: 'Name or friend code…', all: 'All', level_all: 'Any level', online: 'Online only', found: n => `Found: ${n}`, more: 'Show more',
      learn: { norsk: '🇳🇴 Norwegian', english: '🇬🇧 English', math: '🧮 Maths', logic: '🧩 Logic' }, none: 'Nobody found — change the filters.', off: 'Shared search works on bilohash.com. Below are the players on this device.',
      not_listed: 'You are not visible in search yet — others cannot find you.', show_me: '🔎 Show me in search', to_account: 'To my account', on_device: '💻 On this device',
      profile: '👤 Profile', befriend: '➕ Add friend', friend: '✓ Friend', pending: '⏳ Request sent', compete: '🏁 Compete', you: 'this is you', online_now: '🟢 online', seen: d => `seen ${d}`, compete_later: 'Friend request sent — compete as soon as they accept and are online.', loading: '⏳ Searching…', s_stars: 'stars', s_badges: 'badges', s_days: 'day streak', c_total: 'players', c_near: l => `at your level ${l}`, same: '✨ your level', rec: l => `✨ Recommended: players at your level (${l}) first` },
    no: { official: '💬 offisiell konto', botTag: '🤖 virtuell spiller', title: '🔎 Spillere', intro: 'Finn andre elever, se profilene deres, legg til venner og konkurrer i spill.', ph: 'Navn eller vennekode …', all: 'Alle', level_all: 'Alle nivåer', online: 'Bare pålogget', found: n => `Funnet: ${n}`, more: 'Vis flere',
      learn: { norsk: '🇳🇴 Norsk', english: '🇬🇧 Engelsk', math: '🧮 Matte', logic: '🧩 Logikk' }, none: 'Fant ingen – endre filtrene.', off: 'Felles søk virker på bilohash.com. Under ser du spillerne på denne enheten.',
      not_listed: 'Du er ikke synlig i søket ennå – andre finner deg ikke.', show_me: '🔎 Vis meg i søket', to_account: 'Til min side', on_device: '💻 På denne enheten',
      profile: '👤 Profil', befriend: '➕ Bli venn', friend: '✓ Venn', pending: '⏳ Forespørsel sendt', compete: '🏁 Konkurrer', you: 'dette er deg', online_now: '🟢 pålogget', seen: d => `sist sett ${d}`, compete_later: 'Venneforespørsel sendt – konkurrer når vennen godtar og er pålogget.', loading: '⏳ Søker …', s_stars: 'stjerner', s_badges: 'merker', s_days: 'dager på rad', c_total: 'spillere', c_near: l => `på ditt nivå ${l}`, same: '✨ ditt nivå', rec: l => `✨ Anbefalt: spillere på ditt nivå (${l}) først` }
  };
  DX.ar = { official: '💬 حساب رسمي', botTag: '🤖 لاعب افتراضي', title: '🔎 اللاعبون', intro: 'ابحث عن متعلّمين آخرين، وشاهد ملفاتهم، وأضف أصدقاء وتنافس في الألعاب.', ph: 'الاسم أو رمز الصديق…', all: 'الكل', level_all: 'أي مستوى', online: 'المتصلون فقط', found: n => `النتائج: ${n}`, more: 'عرض المزيد',
    learn: { norsk: '🇳🇴 النرويجية', english: '🇬🇧 الإنجليزية', math: '🧮 الرياضيات', logic: '🧩 المنطق' }, none: 'لم يُعثر على أحد — غيّر عوامل التصفية.', off: 'البحث المشترك يعمل على bilohash.com. أدناه لاعبو هذا الجهاز.',
    not_listed: 'أنت غير ظاهر في البحث بعد — لا يستطيع الآخرون إيجادك.', show_me: '🔎 أظهرني في البحث', to_account: 'إلى حسابي', on_device: '💻 على هذا الجهاز',
    profile: '👤 الملف', befriend: '➕ أضف صديقًا', friend: '✓ صديق', pending: '⏳ أُرسل الطلب', compete: '🏁 تنافس', you: 'هذا أنت', online_now: '🟢 متصل', seen: d => `شوهد ${d}`, compete_later: 'أُرسل طلب الصداقة — تنافسا حالما يقبل ويكون متصلًا.', loading: '⏳ جارٍ البحث…', s_stars: 'نجوم', s_badges: 'أوسمة', s_days: 'أيام متتالية', c_total: 'لاعب', c_near: l => `بمستواك ${l}`, same: '✨ مستواك', rec: l => `✨ مقترح: اللاعبون بمستواك (${l}) أولًا` };
  const dx = (k, ...a) => { const t = DX[C().ui] || DX.en || DX.uk; const v = k in t ? t[k] : (DX.en || DX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const DIR_API = 'api/players.php';
  let dirState = null;
  const dirOk = () => dirState || (dirState = (location.protocol.startsWith('http') ? fetch(DIR_API + '?ping=1', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).then(j => !!(j && j.ok && j.players)).catch(() => false) : Promise.resolve(false)));
  const dirPost = body => fetch(DIR_API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) }).then(r => r.json().catch(() => ({ ok: false }))).catch(() => ({ ok: false }));
  // що вчить гравець: за прогресом і словами
  function learnOf() {
    const K = C(), keys = Object.keys(K.store.get('progress', {})), s = snapshot('');
    const out = [];
    if (s.read || s.known || keys.some(k => !/^(en|math|race|rocket)/.test(k))) out.push('norsk');
    if (s.knownEn || keys.some(k => k.startsWith('en'))) out.push('english');
    if (s.mathBest || keys.some(k => k.startsWith('math') || k === 'rocket')) out.push('math');
    if (s.raceWins || keys.some(k => k.startsWith('race'))) out.push('logic');
    return out.length ? out : ['norsk'];
  }
  function levelOf() {
    const K = C(), order = ['A1', 'A2', 'B1', 'B2'];
    let best = -1;
    K.COMICS.forEach(c => { if (K.store.get('seen.' + c.id, []).length) best = Math.max(best, order.indexOf(c.level)); });
    Object.keys(K.store.get('progress', {})).forEach(k => { if (k.startsWith('level:')) best = Math.max(best, order.indexOf(k.slice(6))); });
    return best >= 0 ? order[best] : 'A1';
  }
  // своя картка в каталозі: оновлюється, поки ти на сайті; вимкнув показ — зникає з пошуку
  let lastPub = 0;
  async function publish(force) {
    const K = C(); const me = K.currentUser();
    if (!me || !(await dirOk())) return;
    const code = codeOf(''); if (!code) return;
    if (!K.store.get('shareProfile', false)) {
      if (K.store.get('dirListed', false)) { await dirPost({ action: 'remove', code, secret: keyOf('wallSecret') }); K.store.set('dirListed', false); }
      return;
    }
    if (!force && Date.now() - lastPub < 60000) return;
    lastPub = Date.now();
    const s = snapshot('');
    const card = { name: me.name, avatar: s.avatar, learn: learnOf(), level: levelOf(), stars: s.stars, badges: BADGES.filter(b => isGot(b, s)).length, streak: s.streak,
      act: ((location.hash || '#/').split('/')[1] || '').slice(0, 12), snap: shareUrl(s).split('#/player/s/')[1] || '' };
    const r = await dirPost({ action: 'upsert', code, secret: keyOf('wallSecret'), card });
    if (r.ok) K.store.set('dirListed', true);
  }
  if (typeof window !== 'undefined') {
    setTimeout(() => { if (window.KomiksCore) publish(true); }, 6000);
    setInterval(() => { if (window.KomiksCore) publish(false); }, 240000);
    window.addEventListener('hashchange', () => { if (window.KomiksCore) publish(false); });
  }
  // кнопки дружби/змагання для картки чи профілю
  function socialButtons(code, onChange) {
    const K = C(), { h } = K, F = window.KomiksFriends;
    if (!F || !K.currentUser()) return null;
    if (code === codeOf('')) return h('span', { class: 'dir-you' }, dx('you'));
    const f = F.list().find(x => x.code === code), on = F.online().includes(code);
    const say = t => { const n = h('p', { class: 'hint dir-msg' }, t); return n; };
    const wrap = h('div', { class: 'dir-act' });
    const befriend = () => { const m = F.add(code); if (onChange) onChange(); if (m) wrap.append(say(m)); };
    if (f && f.status === 'friend') wrap.append(h('span', { class: 'dir-chip ok' }, dx('friend')), on ? h('button', { class: 'btn accent', type: 'button', onclick: () => F.together(code) }, dx('compete')) : null);
    else if (f && f.status === 'pending') wrap.append(h('span', { class: 'dir-chip' }, dx('pending')));
    else if (f && f.status === 'incoming') wrap.append(h('button', { class: 'btn accent', type: 'button', onclick: () => { F.accept(code); if (onChange) onChange(); } }, '✓ ' + dx('friend')));
    else wrap.append(h('button', { class: 'btn', type: 'button', onclick: befriend }, dx('befriend')), h('button', { class: 'btn accent', type: 'button', onclick: () => { if (window.KomiksBots && window.KomiksBots.isBot(code)) { location.hash = '#/race/bots/' + code; return; } F.add(code); wrap.replaceChildren(say(dx('compete_later'))); } }, dx('compete')));
    if (window.KomiksMessages) { const mb = window.KomiksMessages.writeBtn(code); if (mb) wrap.append(mb); } // ✉️ написати гравцеві
    return wrap;
  }
  // онлайн-статус бачать лише друзі (PeerJS між друзями); іншим гравцям він не показується
  const friendOn = code => !!(window.KomiksFriends && window.KomiksFriends.online().includes(code));
  /* 🟢 Онлайн бачимо лише в друзів — крім двох випадків: віртуальні гравці (боти) завжди онлайн,
     і офіційний акаунт Комікс·Lab (адміністратор) — щоб до нього завжди можна було звернутися. */
  const showOnline = p => !!(p && (p.bot || p.official)) || friendOn(p && p.code);
  function dirCard(p, redraw, i = 0) {
    const K = C(), { h } = K;
    const on = showOnline(p), same = p.level === levelOf();
    const stat = (ic, v, label) => h('div', { class: 'dir-stat' }, h('b', {}, ic + ' ' + v), h('small', {}, label));
    return h('div', { class: 'dir-card lv-' + (p.level || 'A1') + (on ? ' on' : ''), style: { '--i': i } },
      h('div', { class: 'dir-band' }, h('span', { class: 'dir-lvl' }, p.level || 'A1'),
        on ? h('span', { class: 'dir-live' }, h('i'), dx('online_now').replace('🟢 ', '')) : same ? h('span', { class: 'dir-seen' }, dx('same')) : null,
        p.official ? h('span', { class: 'dir-tag off' }, dx('official')) : p.bot ? h('span', { class: 'dir-tag' }, dx('botTag')) : null),
      h('a', { class: 'dir-ava', href: '#/player/c/' + p.code, 'aria-label': dx('profile') }, AV(p.bot || (window.KomiksAvatars && window.KomiksAvatars.valid(p.avatar)) ? p.avatar : '🙂', { size: 104, mood: on ? 'cheer' : 'idle' })),
      h('b', { class: 'dir-name' }, p.name),
      h('div', { class: 'dir-tags' }, (p.learn || []).map(l => h('span', { class: 'dir-chip' }, dx('learn')[l] || l))),
      h('div', { class: 'dir-stats' }, stat('⭐', p.stars, dx('s_stars')), stat('🏅', p.badges, dx('s_badges')), stat('🔥', p.streak, dx('s_days'))),
      h('div', { class: 'dir-side' }, h('a', { class: 'btn', href: '#/player/c/' + p.code }, dx('profile')), socialButtons(p.code, redraw)));
  }
  // віртуальні гравці під фільтри пошуку; сортування: схожий рівень → друзі онлайн → більше зірок
  function botMatches(F) {
    if (!window.KomiksBots) return [];
    const q = (F.q || '').toLowerCase();
    return window.KomiksBots.cards().filter(p => (!q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) && (!F.learn || p.learn.includes(F.learn)) && (!F.level || p.level === F.level));
  }
  const LV = ['A1', 'A2', 'B1', 'B2'];
  const sortDir = arr => { const my = LV.indexOf(levelOf()), d = p => Math.abs(Math.max(0, LV.indexOf(p.level)) - my);
    return arr.slice().sort((a, b) => (d(a) - d(b)) || (showOnline(b) - showOnline(a)) || (b.stars - a.stars)); };
  function list() {
    const K = C(), { h } = K;
    const me = K.currentUser();
    const root = h('section', { class: 'players' });
    const F = { q: '', learn: '', level: '', page: 0, items: [], total: 0, loading: false, server: null };
    let timer = 0;
    const load = async (append = false) => {
      F.server = await dirOk();
      if (!F.server) { F.items = sortDir(botMatches(F)); F.total = F.items.length; draw(); return; }
      F.loading = true; if (!append) draw();
      const qs = new URLSearchParams({ q: F.q, learn: F.learn, level: F.level, near: levelOf(), page: String(F.page) });
      const r = await fetch(DIR_API + '?' + qs, { cache: 'no-store' }).then(x => x.json()).catch(() => null);
      F.loading = false;
      const botsHit = botMatches(F);
      if (r && r.ok) { F.items = append ? F.items.concat(r.players) : sortDir(botsHit.concat(r.players)); F.total = r.total + botsHit.length; }
      draw();
    };
    const local = () => {
      const users = Object.values(K.raw.get('comiks.users', {})).filter(u => (me && u.id === me.id) || K.raw.get(`comiks.u.${u.id}.shareProfile`, false));
      return users.length ? h('div', {}, h('h3', { class: 'sec-sub' }, dx('on_device')), h('div', { class: 'pl-list' }, users.map(u => { const s = snapshot(me && u.id === me.id ? '' : u.id); const got = BADGES.filter(b => isGot(b, s)).length;
        return h('a', { class: 'pl-card', href: '#/player/' + u.id }, AV(s.avatar, { size: 90, mood: 'cheer' }), h('b', {}, u.name + (me && u.id === me.id ? ` (${px('you')})` : '')), h('small', {}, `⭐ ${s.stars} · 🏅 ${got}/${BADGES.length}`), h('span', { class: 'pl-open' }, px('open'))); }))) : null;
    };
    const search = h('input', { type: 'search', class: 'dir-q', placeholder: dx('ph'), maxlength: 30 });
    search.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { F.q = search.value.trim(); F.page = 0; load(); }, 300); });
    const chips = h('div', { class: 'dir-filters' });
    const levelSel = h('select', { class: 'dir-level' }, h('option', { value: '' }, dx('level_all')), ['A1', 'A2', 'B1', 'B2'].map(l => h('option', { value: l }, l)));
    levelSel.addEventListener('change', () => { F.level = levelSel.value; F.page = 0; load(); });
    const results = h('div', { class: 'dir-results' });
    const drawChips = () => chips.replaceChildren(...[['', dx('all')], ...Object.entries(dx('learn'))].map(([v, label]) => h('button', { type: 'button', class: 'dir-f' + (F.learn === v ? ' on' : ''), onclick: () => { F.learn = v; F.page = 0; drawChips(); load(); } }, label)));
    function draw() {
      if (F.server === false && !F.items.length) { results.replaceChildren(h('p', { class: 'hint' }, dx('off')), local()); return; }
      if (F.loading && !F.items.length) { results.replaceChildren(h('div', { class: 'dir-list' }, Array.from({ length: 6 }, () => h('div', { class: 'dir-card skel' }, h('i'), h('i'), h('i'))))); return; }
      results.replaceChildren(h('p', { class: 'dir-found' }, dx('found', F.total), !F.q && !F.level ? h('small', { class: 'dir-rec' }, ' · ' + dx('rec', levelOf())) : null),
        F.items.length ? h('div', { class: 'dir-list' }, F.items.map((p, i) => dirCard(p, draw, i))) : h('div', { class: 'dir-empty' }, h('span', {}, '🔭'), h('p', {}, dx('none'))),
        F.items.length < F.total ? h('button', { class: 'btn', type: 'button', onclick: () => { F.page++; load(true); } }, dx('more')) : null,
        local());
    }
    drawChips();
    // банер: аватари, що літають, і живі лічильники
    const cTotal = h('b', {}, '…'), cNear = h('b', {}, '…'), myLv = levelOf();
    const floaters = (window.KomiksAvatars ? window.KomiksAvatars.list : ['🦊', '🐼', '🐸']).slice().sort(() => Math.random() - 0.5).slice(0, 8);
    const hero = h('section', { class: 'dir-hero' },
      h('div', { class: 'dir-fly', 'aria-hidden': 'true' }, floaters.map((a, i) => h('span', { style: { '--i': i, left: (48 + (i * 13) % 46) + '%', top: (6 + (i * 37) % 72) + '%' } }, AV(a, { size: 58, mood: 'cheer' })))),
      h('div', { class: 'dir-hero-in' },
        h('a', { class: 'dir-back', href: '#/', 'aria-label': 'Back' }, '←'),
        h('h1', {}, dx('title')), h('p', {}, dx('intro')),
        h('div', { class: 'dir-counters' }, h('span', {}, cTotal, h('small', {}, dx('c_total'))), h('span', {}, cNear, h('small', {}, dx('c_near', myLv))))));
    const nBots = window.KomiksBots ? window.KomiksBots.list.length : 0;
    const nBotsNear = window.KomiksBots ? window.KomiksBots.cards().filter(b => b.level === myLv).length : 0;
    dirOk().then(ok => { if (!ok) { cTotal.textContent = nBots || '—'; cNear.textContent = nBotsNear; return; }
      fetch(DIR_API + '?page=0', { cache: 'no-store' }).then(x => x.json()).then(j => { cTotal.textContent = (j && j.ok ? j.total : 0) + nBots; }).catch(() => {});
      fetch(DIR_API + '?level=' + myLv, { cache: 'no-store' }).then(x => x.json()).then(j => { cNear.textContent = (j && j.ok ? j.total : 0) + nBotsNear; }).catch(() => {}); });
    root.classList.add('dir-page');
    root.append(hero,
      me && !K.store.get('shareProfile', false) ? h('div', { class: 'note-box' }, dx('not_listed'), ' ',
        h('button', { class: 'btn small accent', type: 'button', onclick: () => { setShare(true); load(); } }, dx('show_me')), ' ', h('a', { class: 'btn small', href: '#/privacy' }, '🔒')) : null,
      h('div', { class: 'dir-bar' }, h('label', { class: 'dir-search' }, h('span', { 'aria-hidden': 'true' }, '🔎'), search), chips, h('div', { class: 'dir-row' }, levelSel)),
      results);
    load();
    return root;
  }
  // профіль за кодом друга (з каталогу)
  function byCode(code) {
    const K = C(), { h } = K;
    if (window.KomiksBots && window.KomiksBots.isBot(code)) {
      const view = profileView(window.KomiksBots.snapshot(code), { noWall: true });
      const act = socialButtons(code, () => view.replaceWith(byCode(code)));
      if (act) view.querySelector('.pl-id').append(act);
      return view;
    }
    const root = h('section', {}, K.pageHead(px('title'), '#/players'), h('p', { class: 'muted' }, dx('loading')));
    (async () => {
      const ok = await dirOk();
      const r = ok ? await fetch(DIR_API + '?code=' + encodeURIComponent(code), { cache: 'no-store' }).then(x => x.json()).catch(() => null) : null;
      const s = r && r.ok ? fromShare(r.player.snap) : null;
      if (!s) { root.replaceChildren(K.pageHead(px('title'), '#/players'), h('p', {}, px('notfound'))); return; }
      s.name = r.player.name; s.avatar = r.player.avatar;
      const view = profileView(s, { wallOpts: { code }, online: showOnline({ code, official: !!r.player.official }) });
      const act = socialButtons(code, () => root.replaceWith(byCode(code)));
      if (act) view.querySelector('.pl-id').append(act);
      root.replaceWith(view);
    })();
    return root;
  }
  // блок у кабінеті: дозвіл показу, перегляд, «Поділитися»
  function accountBox() {
    const K = C(), { h } = K;
    const me = K.currentUser(); if (!me) return null;
    const box = h('div', { class: 'box pl-share' });
    const draw = () => {
      const on = !!K.store.get('shareProfile', false);
      const cb = h('input', { type: 'checkbox', checked: on, onchange: () => { K.store.set('shareProfile', cb.checked); setWallOpen(cb.checked); publish(true); draw(); } });
      const share = on && window.KomiksExtras && window.KomiksExtras.shareButton ? window.KomiksExtras.shareButton(shareUrl(snapshot('')), `${me.name} · Komiks·Lab`) : null;
      box.replaceChildren(h('h3', {}, px('share_t')), h('label', { class: 'pl-toggle' }, cb, h('span', {}, px('share_on'))), h('p', { class: 'hint' }, px('share_d')),
        h('div', { class: 'row-left' }, h('a', { class: 'btn', href: '#/player' }, px('view')), h('a', { class: 'btn', href: '#/players' }, px('players')), h('a', { class: 'btn accent', href: '#/friends' }, '👥 ' + ({ uk: 'Друзі', en: 'Friends', no: 'Venner' }[C().ui] || 'Друзі')), share));
    };
    draw();
    return box;
  }
    // код для ігор і рейтингу: лише залогінений гравець із дозволеним показом профілю
  const myPublicCode = () => { const K = C(); return K.currentUser() && K.store.get('shareProfile', false) ? (codeOf('') || '') : ''; };
  // для сторінки конфіденційності: показ у пошуку й відкрита стіна
  const setShare = on => { const K = C(); K.store.set('shareProfile', !!on); setWallOpen(!!on && K.store.get('wallOpen', true) !== false); publish(true); };
  const setWall = on => setWallOpen(!!on);
  window.KomiksPlayers = { render, list, accountBox, badgeGrid, snapshot, shareUrl, fromShare, publish, myPublicCode, setShare, setWall, BADGES,
    captchaView };                                       // той самий приклад використовує вікно відгуку
})();
