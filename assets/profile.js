/* Комікс·Lab — профіль учня: 🎨 студія аватара (тварина + шапка + окуляри + річ на шию, частина речей
   відкривається за зірки з тестів) і 🎁 безкоштовний доступ 30 годин для акаунта.
   Аватар зберігається в акаунті (`avatar`) і автоматично використовується в усіх іграх (KomiksProfile.avatar()). */
(() => {
  'use strict';
  if (typeof document === 'undefined') return; // службові скрипти Node
  const FREE_HOURS = 30;
  // 'soft' — після 30 годин показуємо повідомлення; 'hard' — закриваємо навчальні розділи (коли з’явиться оплата)
  const FREE_MODE = 'soft';
  const TICK = 15; // секунд

  const PX = {
    uk: {
      studio: '🎨 Мій аватар', studio_intro: 'Обери тваринку й одягни її! Нові речі відкриваються за зірки, які ти отримуєш у тестах. Аватар закріплений за твоїм акаунтом і з’являється в усіх іграх.',
      tabs: { base: '🐾 Тваринка', color: '🎨 Колір', hat: '🎩 Шапки', glasses: '🕶️ Окуляри', neck: '🎀 На шию' }, from_game: '🎁 з гри', from_game_t: 'Рідкісна річ — випадає зі скрині в іграх (Логік-гонка, Math Rocket, Гра разом).', natural: 'Природний',
      chest_t: '🎁 Скриня!', chest_open: 'Відкрити', got: 'Нова річ!', wear: '👕 Надягнути', later: 'Пізніше', collection: n => `Колекція: ${n}`, none: 'Без нічого', stars_have: n => `⭐ У тебе ${n} зірок`, need: n => `⭐ ${n}`,
      locked: n => `Відкриється, коли матимеш ${n} ⭐. Проходь тести!`, random: '🎲 Випадково', saved: 'Збережено ✓', guest_hint: 'Увійди або зареєструйся — і аватар закріпиться за твоїм акаунтом.',
      open_studio: '🎨 Налаштувати аватар', in_games: 'Цей аватар бачать усі в «Грі разом» і Math Rocket.', change: '🎨 Змінити в кабінеті', yours: 'Твій аватар з кабінету', other: 'Обрати іншу тваринку',
      free_title: '🎁 Безкоштовно — 30 годин', free_used: (u, l) => `Використано: ${u} · залишилось: ${l}`, free_note: 'Рахується лише час активного навчання на сайті, коли ти в акаунті.',
      free_reg: '🎁 Після реєстрації — 30 годин навчання безкоштовно.', free_over_t: '🎉 Твої 30 безкоштовних годин використано!', free_over: 'Дякуємо, що навчаєшся з Комікс·Lab. Ти можеш і далі користуватися сайтом — ми повідомимо про нові можливості.', ok: 'Зрозуміло', h: 'год', m: 'хв'
    },
    en: {
      studio: '🎨 My avatar', studio_intro: 'Pick an animal and dress it up! New items unlock with the stars you earn in tests. The avatar belongs to your account and appears in every game.',
      tabs: { base: '🐾 Animal', color: '🎨 Colour', hat: '🎩 Hats', glasses: '🕶️ Glasses', neck: '🎀 Neck' }, from_game: '🎁 from games', from_game_t: 'A rare item — it drops from chests in games (Logic Race, Math Rocket, Play together).', natural: 'Natural',
      chest_t: '🎁 A chest!', chest_open: 'Open', got: 'New item!', wear: '👕 Wear it', later: 'Later', collection: n => `Collection: ${n}`, none: 'Nothing', stars_have: n => `⭐ You have ${n} stars`, need: n => `⭐ ${n}`,
      locked: n => `Unlocks at ${n} ⭐. Keep taking tests!`, random: '🎲 Random', saved: 'Saved ✓', guest_hint: 'Log in or sign up and the avatar will be saved to your account.',
      open_studio: '🎨 Customise avatar', in_games: 'Everyone sees this avatar in “Play together” and Math Rocket.', change: '🎨 Change in my account', yours: 'Your avatar', other: 'Pick another animal',
      free_title: '🎁 Free — 30 hours', free_used: (u, l) => `Used: ${u} · left: ${l}`, free_note: 'Only active learning time on the site while logged in is counted.',
      free_reg: '🎁 After signing up — 30 hours of learning for free.', free_over_t: '🎉 Your 30 free hours are used up!', free_over: 'Thank you for learning with Komiks·Lab. You can keep using the site — we will let you know about new options.', ok: 'Got it', h: 'h', m: 'min'
    },
    no: {
      studio: '🎨 Min avatar', studio_intro: 'Velg et dyr og kle det på! Nye ting låses opp med stjernene du får i testene. Avataren hører til kontoen din og vises i alle spill.',
      tabs: { base: '🐾 Dyr', color: '🎨 Farge', hat: '🎩 Hatter', glasses: '🕶️ Briller', neck: '🎀 Hals' }, from_game: '🎁 fra spill', from_game_t: 'En sjelden ting – den finnes i kister i spillene.', natural: 'Naturlig',
      chest_t: '🎁 En kiste!', chest_open: 'Åpne', got: 'Ny ting!', wear: '👕 Ta på', later: 'Senere', collection: n => `Samling: ${n}`, none: 'Ingenting', stars_have: n => `⭐ Du har ${n} stjerner`, need: n => `⭐ ${n}`,
      locked: n => `Låses opp ved ${n} ⭐. Ta flere tester!`, random: '🎲 Tilfeldig', saved: 'Lagret ✓', guest_hint: 'Logg inn eller registrer deg, så lagres avataren på kontoen din.',
      open_studio: '🎨 Tilpass avataren', in_games: 'Alle ser denne avataren i «Spill sammen» og Matte-raketten.', change: '🎨 Endre på Min side', yours: 'Din avatar', other: 'Velg et annet dyr',
      free_title: '🎁 Gratis — 30 timer', free_used: (u, l) => `Brukt: ${u} · igjen: ${l}`, free_note: 'Bare aktiv læringstid mens du er logget inn telles.',
      free_reg: '🎁 Etter registrering — 30 timer gratis læring.', free_over_t: '🎉 De 30 gratis timene er brukt opp!', free_over: 'Takk for at du lærer med Komiks·Lab. Du kan fortsatt bruke siden – vi sier fra om nye muligheter.', ok: 'Skjønner', h: 't', m: 'min'
    }
  };
  PX.ar = {
    studio: '🎨 شخصيتي', studio_intro: 'اختر حيوانًا وألبسه! تُفتح أغراض جديدة بالنجوم التي تكسبها في الاختبارات. الشخصية مرتبطة بحسابك وتظهر في كل الألعاب.',
    tabs: { base: '🐾 الحيوان', color: '🎨 اللون', hat: '🎩 القبعات', glasses: '🕶️ النظارات', neck: '🎀 للرقبة' }, from_game: '🎁 من الألعاب', from_game_t: 'غرض نادر — يسقط من الصناديق في الألعاب.', natural: 'طبيعي',
    chest_t: '🎁 صندوق!', chest_open: 'افتح', got: 'غرض جديد!', wear: '👕 ارتدِه', later: 'لاحقًا', collection: n => `المجموعة: ${n}`, none: 'بلا شيء', stars_have: n => `⭐ لديك ${n} نجمة`, need: n => `⭐ ${n}`,
    locked: n => `يُفتح عند ${n} ⭐. واصل الاختبارات!`, random: '🎲 عشوائي', saved: 'تم الحفظ ✓', guest_hint: 'سجّل الدخول لتُحفظ الشخصية في حسابك.',
    open_studio: '🎨 عدّل الشخصية', in_games: 'يرى الجميع هذه الشخصية في «العبوا معًا» وMath Rocket.', change: '🎨 غيّرها في حسابي', yours: 'شخصيتك', other: 'اختر حيوانًا آخر',
    free_title: '🎁 مجانًا — 30 ساعة', free_used: (u, l) => `المستخدم: ${u} · المتبقي: ${l}`, free_note: 'يُحسب فقط وقت التعلّم الفعلي على الموقع أثناء تسجيل الدخول.',
    free_reg: '🎁 بعد التسجيل — 30 ساعة تعلّم مجانًا.', free_over_t: '🎉 استخدمت ساعاتك المجانية الثلاثين!', free_over: 'شكرًا لتعلّمك مع Komiks·Lab. يمكنك مواصلة استخدام الموقع — سنخبرك بالخيارات الجديدة.', ok: 'فهمت', h: 'س', m: 'د'
  };
  const C = () => window.KomiksCore;
  const px = (k, ...a) => { const tbl = PX[C().ui] || PX.en || PX.uk; const v = k in tbl ? tbl[k] : (PX.en || PX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const AVS = () => window.KomiksAvatars;

  /* ---------------- аватар акаунта ---------------- */
  function avatar() {
    const K = C();
    const own = K.store.get('avatar', null);
    if (own && AVS() && AVS().valid(own)) return own;
    const g = K.raw.get('comiks.gameProfile', {});
    return g.avatar && AVS() && AVS().valid(g.avatar) ? g.avatar : '🦊';
  }
  const hasOwn = () => { const v = C().store.get('avatar', null); return !!(v && AVS() && AVS().valid(v)); };
  function setAvatar(code) {
    const K = C();
    K.store.set('avatar', code);
    const g = K.raw.get('comiks.gameProfile', {});
    K.raw.set('comiks.gameProfile', Object.assign({}, g, { avatar: code }));
    refreshHeader();
  }
  // рідкісні речі (game: true) відкриваються лише нагородою з ігор; список — `unlockedItems`
  const unlocked = () => C().store.get('unlockedItems', []);
  const isOpen = (slot, id, it, have) => (it.game ? unlocked().includes(slot + ':' + id) : (it.stars || 0) <= have);
  function grant() {
    const A = AVS(); if (!A) return null;
    const have = starsTotal();
    const pool = [];
    for (const [slot, items] of Object.entries(A.catalog)) for (const [id, it] of Object.entries(items)) if (!isOpen(slot, id, it, have)) pool.push({ slot, id, it });
    if (!pool.length) return null;
    // рідкісні речі випадають частіше
    const weighted = pool.flatMap(x => (x.it.game ? [x, x, x] : [x]));
    const pick = weighted[Math.floor(Math.random() * weighted.length)];
    C().store.set('unlockedItems', [...unlocked(), pick.slot + ':' + pick.id]);
    return pick;
  }
  // скриня з нагородою: анімація відкриття, аватар у новій речі, «Надягнути»
  function rewardModal(chance = 1) {
    if (Math.random() > chance) return false;
    const K = C(), { h } = K, A = AVS(); if (!A) return false;
    const got = grant(); if (!got) return false;
    const lang = K.ui;
    const cfg = A.parse(avatar());
    const tryOn = A.encode(Object.assign({}, cfg, { [got.slot]: got.id }));
    const stage = h('div', { class: 'rw-stage' }, h('div', { class: 'rw-chest' }, h('span', { class: 'rw-lid' }), h('span', { class: 'rw-box' }), h('span', { class: 'rw-glow' })));
    const box = h('div', { class: 'free-modal rw-modal', role: 'dialog', 'aria-modal': 'true' });
    const card = h('div', { class: 'free-card rw-card' }, h('h2', {}, px('chest_t')), stage,
      h('button', { class: 'btn accent big', type: 'button', onclick: open }, px('chest_open')));
    box.append(card);
    document.body.append(box);
    K.Sfx.tick();
    function open() {
      stage.classList.add('open'); K.Sfx.win(); if (K.confetti) K.confetti();
      setTimeout(() => {
        card.replaceChildren(h('h2', {}, px('got')), h('div', { class: 'rw-show' }, A.el(tryOn, { size: 170, mood: 'cheer' })),
          h('b', { class: 'rw-name' }, (got.it[lang] || got.it.uk) + (got.it.game ? ' ✨' : '')),
          h('div', { class: 'row-center' },
            h('button', { class: 'btn accent', type: 'button', onclick: () => { setAvatar(tryOn); box.remove(); } }, px('wear')),
            h('button', { class: 'btn', type: 'button', onclick: () => box.remove() }, px('later'))));
      }, 900);
    }
    return true;
  }
  function starsTotal() {
    const prog = C().store.get('progress', {});
    return Object.values(prog).reduce((a, p) => a + ((p && p.stars) || 0), 0);
  }
  function refreshHeader() {
    const K = C(); if (!K || !AVS()) return;
    const ico = document.querySelector('#accBtn .acc-ico');
    if (ico && K.currentUser()) { ico.replaceChildren(AVS().el(avatar(), { size: 30 })); ico.classList.add('has-av'); }
  }

  /* ---------------- студія аватара ---------------- */
  let tab = 'base';
  function studio() {
    const K = C(), { h } = K, A = AVS();
    if (!A) return h('p', {}, '…');
    const cfg = A.parse(avatar());
    const have = starsTotal();
    const preview = h('div', { class: 'st-preview' });
    const saved = h('span', { class: 'st-saved' });
    const nameEl = h('b', { class: 'st-name' });
    const drawName = () => { nameEl.textContent = (K.currentUser() || {}).name || A.name(cfg.base); };
    const showPreview = mood => preview.replaceChildren(A.el(A.encode(cfg), { size: 220, mood }));
    const save = () => { setAvatar(A.encode(cfg)); drawName(); saved.textContent = px('saved'); clearTimeout(save.t); save.t = setTimeout(() => { saved.textContent = ''; }, 1600); showPreview('cheer'); clearTimeout(save.m); save.m = setTimeout(() => showPreview('idle'), 1800); K.Sfx.tick(); };
    const grid = h('div', { class: 'st-grid' });
    const tabsEl = h('div', { class: 'st-tabs', role: 'tablist' });
    const drawTabs = () => tabsEl.replaceChildren(...Object.entries(px('tabs')).map(([k, label]) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(tab === k), class: 'st-tab' + (tab === k ? ' on' : ''), onclick: () => { tab = k; drawTabs(); drawGrid(); } }, label)));
    const card = (code, label, selected, lockAt, onPick) => {
      // lockAt: число зірок або 'game' — рідкісна річ, ще не знайдена
      const game = lockAt === 'game' || lockAt === 'gameOpen';
      const locked = lockAt === 'game' || (!game && lockAt > have);
      const b = h('button', { type: 'button', class: 'st-item' + (selected ? ' on' : '') + (locked ? ' locked' : '') + (game ? ' rare' : ''), title: lockAt === 'game' ? px('from_game_t') : locked ? px('locked', lockAt) : label, 'aria-pressed': String(selected), disabled: locked },
        A.el(code, { size: 74, mood: selected ? 'cheer' : 'idle' }), h('small', {}, label),
        lockAt === 'game' ? h('span', { class: 'st-lock rare' }, px('from_game')) : lockAt === 'gameOpen' ? h('span', { class: 'st-cost rare' }, '✨') : locked ? h('span', { class: 'st-lock' }, '🔒 ' + px('need', lockAt)) : lockAt ? h('span', { class: 'st-cost' }, px('need', lockAt)) : null);
      if (!locked) b.addEventListener('click', onPick);
      return b;
    };
    const drawGrid = () => {
      const lang = K.ui;
      if (tab === 'base') {
        grid.replaceChildren(...A.list.map(e => card(A.encode(Object.assign({}, cfg, { base: e })), A.name(e), cfg.base === e, 0, () => { cfg.base = e; save(); drawGrid(); })));
        return;
      }
      const items = A.catalog[tab];
      const none = card(A.encode(Object.assign({}, cfg, { [tab]: '' })), tab === 'color' ? px('natural') : px('none'), !cfg[tab], 0, () => { cfg[tab] = ''; save(); drawGrid(); });
      const opened = unlocked();
      grid.replaceChildren(none, ...Object.entries(items).map(([id, it]) => card(A.encode(Object.assign({}, cfg, { [tab]: id })), it[lang] || it.en || it.uk, cfg[tab] === id,
        it.game ? (opened.includes(tab + ':' + id) ? 'gameOpen' : 'game') : it.stars, () => { cfg[tab] = id; save(); drawGrid(); })));
    };
    const random = () => {
      cfg.base = K.pick(A.list);
      for (const k of ['hat', 'glasses', 'neck', 'color']) { const open = Object.entries(A.catalog[k]).filter(([id, it]) => isOpen(k, id, it, have)).map(([id]) => id); cfg[k] = Math.random() < 0.35 || !open.length ? '' : K.pick(open); }
      save(); drawGrid();
    };
    drawTabs(); drawGrid(); showPreview('idle'); drawName();
    return h('section', { class: 'studio' }, K.pageHead(px('studio'), K.currentUser() ? '#/account' : '#/'),
      h('p', { class: 'lead-p' }, px('studio_intro')),
      !K.currentUser() ? h('p', { class: 'hint st-guest' }, px('guest_hint'), ' ', h('a', { href: '#/register' }, K.navT('register'))) : null,
      h('div', { class: 'st-wrap' },
        h('div', { class: 'st-stage' }, preview, nameEl, h('span', { class: 'st-stars' }, px('stars_have', have)), h('span', { class: 'st-coll' }, px('collection', Object.entries(A.catalog).reduce((n, [slot, items]) => n + Object.entries(items).filter(([id, it]) => isOpen(slot, id, it, have)).length, 0) + ' / ' + Object.values(A.catalog).reduce((n, o) => n + Object.keys(o).length, 0))),
          h('div', { class: 'row-center' }, h('button', { class: 'btn', type: 'button', onclick: random }, px('random')), saved), h('small', { class: 'hint' }, px('in_games'))),
        h('div', { class: 'st-panel' }, tabsEl, grid)));
  }

  /* ---------------- 🎁 30 годин безкоштовно ---------------- */
  let lastActive = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true, capture: true }));
  const usage = () => C().store.get('usageSec', 0);
  const fmt = sec => { const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60); return `${h} ${px('h')} ${m} ${px('m')}`; };
  // преміум (друзі адміністратора та запрошені ними) — без ліміту безкоштовних годин
  const isPremium = () => !!(window.KomiksAuth && window.KomiksAuth.user && window.KomiksAuth.user.premium);
  function tick() {
    const K = C(); if (!K || !K.currentUser() || isPremium()) return;
    if (document.hidden || Date.now() - lastActive > 60000) return;
    const used = usage() + TICK;
    K.store.set('usageSec', used);
    if (used >= FREE_HOURS * 3600 && !K.store.get('freeNotice', false)) { K.store.set('freeNotice', true); overNotice(); }
  }
  setInterval(tick, TICK * 1000);
  function overNotice() {
    const K = C(), { h } = K;
    const box = h('div', { class: 'free-modal', role: 'dialog', 'aria-modal': 'true' }, h('div', { class: 'free-card' }, h('h2', {}, px('free_over_t')), h('p', {}, px('free_over')), h('button', { class: 'btn accent', type: 'button', onclick: () => box.remove() }, px('ok'))));
    document.body.append(box);
  }
  function freeBox() {
    const K = C(), { h } = K;
    if (isPremium()) return null; // статус «💎 Преміум» показано в блоці акаунта
    const used = usage(), left = Math.max(0, FREE_HOURS * 3600 - used), pct = Math.min(100, used / (FREE_HOURS * 36));
    return h('div', { class: 'box free-box' }, h('h3', {}, px('free_title')),
      h('div', { class: 'free-bar' }, h('i', { style: { width: pct + '%' } })),
      h('p', {}, px('free_used', fmt(used), fmt(left))), h('p', { class: 'hint' }, px('free_note')));
  }
  function avatarBox() {
    const K = C(), { h } = K, A = AVS();
    if (!A) return null;
    return h('div', { class: 'box av-box' }, h('h3', {}, px('studio')),
      h('a', { class: 'av-box-prev', href: '#/avatar', 'aria-label': px('open_studio') }, A.el(avatar(), { size: 150, mood: 'cheer' })),
      h('p', { class: 'hint' }, px('in_games')),
      h('a', { class: 'btn accent', href: '#/avatar' }, px('open_studio')));
  }
  // ліміт «30 годин» скасовано: тепер діє акція «перші 100» і підписка, тож нічого не обіцяємо
  const freeNote = () => null;

  /* для форм приєднання до ігор: показати аватар акаунта замість вибору */
  function joinAvatar(onChange) {
    const K = C(), { h } = K, A = AVS();
    if (!A) return null;
    let cur = avatar();
    const box = h('div', { class: 'join-av' });
    const draw = picking => {
      if (!picking && K.currentUser() && hasOwn()) {
        box.replaceChildren(h('div', { class: 'join-av-me' }, A.el(cur, { size: 110, mood: 'cheer' }), h('div', {}, h('b', {}, px('yours')), h('a', { href: '#/avatar' }, px('change')), h('button', { class: 'linkish', type: 'button', onclick: () => draw(true) }, px('other')))));
      } else {
        box.replaceChildren(A.picker(cur, e => { cur = A.encode(Object.assign(A.parse(cur), { base: e })); onChange(cur); }));
      }
    };
    draw(false);
    onChange(cur);
    return box;
  }


  /* ---------- напарник: твій аватар у кожному тесті — радіє правильній відповіді, сумує після помилки ---------- */
  function buddyWatch() {
    let el = null, last = '', raf = 0;
    const BUB = { ok: ['Veldig bra!', 'Supert!', 'Kjempefint!', 'Bra jobba!', 'Strålende!', 'Knallbra!', 'Helt riktig!', 'Du er flink!', 'Perfekt!', 'Topp!', 'Herlig!', 'Fantastisk!'],
      no: ['Prøv igjen!', 'Nesten!', 'Ikke gi opp!', 'Ikke helt …', 'Tenk litt til!', 'Du klarer det neste gang!'], idle: ['Du klarer det!', 'Lykke til!', 'Tenk litt …', 'Jeg heier på deg!', 'Ta den tiden du trenger!'] };
    const pickOne = a => a[Math.floor(Math.random() * a.length)];
    // 🔊/🔇 біля тамагочі — вмикає й вимикає озвучку похвали (те саме, що в налаштуваннях)
    const muteBtn = () => {
      const K = C(), on = K.settings.cheerVoice !== false;
      return K.h('button', { class: 'buddy-mute', type: 'button', title: on ? 'Mute' : 'Sound on', 'aria-label': on ? 'Mute' : 'Sound on', onclick: e => { e.stopPropagation(); K.setCheerVoice(!on); } }, on ? '🔊' : '🔇');
    };
    document.addEventListener('cheervoice', () => { const b = el && el.querySelector('.buddy-mute'); if (b) b.replaceWith(muteBtn()); });
    const render = state => {
      const A = AVS(); if (!A || !el) return;
      const mood = state === 'ok' ? 'cheer' : state === 'no' ? 'sad' : 'idle';
      // правильна відповідь — випадковий трюк: сальто, оберт, пружина, танець або «вертоліт»
      const trick = state === 'ok' ? pickOne(['flip', 'backflip', 'spin', 'bounce', 'dance', 'heli']) : '';
      el.className = 'buddy ' + state + (trick ? ' trick-' + trick : '');
      el.replaceChildren(muteBtn(), C().h('span', { class: 'buddy-bub' }, pickOne(BUB[state] || BUB.idle)), A.el(avatar(), { size: 92, mood }),
        state === 'ok' ? C().h('span', { class: 'buddy-sparks', 'aria-hidden': 'true' }, Array.from({ length: 8 }, (_, i) => C().h('i', { style: { '--i': i } }, i % 2 ? '⭐' : '✨'))) : null);
    };
    const check = () => {
      raf = 0;
      const b = document.body;
      const card = document.querySelector('main .q-card:not(.result)');
      const show = card && !b.classList.contains('in-rocket') && !b.classList.contains('in-game');
      if (!show) { if (el) { el.remove(); el = null; last = ''; } return; }
      if (!el) { el = document.createElement('div'); document.body.append(el); last = ''; } // без aria-hidden: усередині є кнопка звуку
      const fb = card.querySelector('.feedback');
      const state = fb ? (fb.classList.contains('ok') ? 'ok' : 'no') : card.querySelector('.opt.bad') ? 'no' : 'idle';
      const sig = state + '|' + (card.querySelector('.q-title') || {}).textContent + '|' + card.querySelectorAll('.opt.bad').length;
      if (sig !== last) { last = sig; render(state); }
    };
    new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(check); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  if (document.body) buddyWatch(); else document.addEventListener("DOMContentLoaded", buddyWatch);
  window.KomiksProfile = { avatar, setAvatar, studio, freeBox, avatarBox, freeNote, joinAvatar, refreshHeader, starsTotal, grant, rewardModal, unlocked, FREE_HOURS };
})();
