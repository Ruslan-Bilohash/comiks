/* Skattejakt — løp sammen, samle ting og tall. Norsk tale + AI-hint. HTTP-rom (game/room.php). */
(() => {
  'use strict';
  if (typeof document !== 'undefined') (function css() {
    if (document.querySelector('link[data-sj]')) return;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.setAttribute('data-sj', '1');
    const v = (window.KOMIKS_DATA || {}).version || Date.now().toString(36);
    l.href = (/\/game(\/|$)/.test(location.pathname) ? 'run.css' : 'game/run.css') + '?v=' + encodeURIComponent(v);
    document.head.appendChild(l);
  })();
  const SITE = 'https://bilohash.com/comiks/';
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const DUR = 60;
  const LANES = 3;
  const TX = {
    no: {
      tag: 'NYTT KLASSESPILL', title: 'Skattejakt', sub: 'Løp med avataren din, samle epler, tall og ting. Alt du tar, sies på norsk. Pia-AI hvisker hint!',
      host: '📺 TV / lærer', join: '📱 Elev', how: 'Læreren åpner rommet. Elevene skanner QR, styrer med tre knapper, samler mest.',
      creating: 'Lager stien…', scan: 'Skann og løp!', players: n => n ? `${n} løpere` : 'Venter på løpere…',
      start: '🏁 Løp!', close: 'Lukk', back: '← Meny', wait: 'Klar på startstreken…',
      join_t: 'Med på skattejakten', name: 'Navnet ditt', go: 'Løp ▶', code: 'Kode',
      err_code: '5 tegn.', err_name: 'Skriv navn.', err_room: 'Fant ikke rommet. Skann QR på nytt.', err_net: 'Ingen nett.',
      left: 'Venstre', mid: 'Midten', right: 'Høyre', last: 'Du tok:',
      results: 'Hvem samlet mest?', again: 'En gang til!', you: 'deg',
      local: 'Åpne https://bilohash.com/comiks/game/ i nettleseren.'
    },
    uk: {
      tag: 'НОВА КЛАСОВА ГРА', title: 'Полювання на скарби', sub: 'Біжи своїм персонажем, збирай яблука, числа й речі. Кожен предмет звучить норвезькою. ШІ-Пія підказує!',
      host: '📺 ТВ / учитель', join: '📱 Учень', how: 'Учитель відкриває кімнату. Діти сканують QR, керують трьома кнопками, хто збере більше.',
      creating: 'Стежка стелиться…', scan: 'Скануй і біжи!', players: n => n ? `${n} бігунів` : 'Чекаємо бігунів…',
      start: '🏁 Бігти!', close: 'Закрити', back: '← Меню', wait: 'На старті…',
      join_t: 'У скарбниці', name: 'Твоє ім’я', go: 'Бігти ▶', code: 'Код',
      err_code: '5 літер.', err_name: 'Напиши ім’я.', err_room: 'Кімнату не знайдено. QR ще раз.', err_net: 'Немає мережі.',
      left: 'Ліворуч', mid: 'По центру', right: 'Праворуч', last: 'Ти взяв:',
      results: 'Хто зібрав більше?', again: 'Ще раз!', you: 'ти',
      local: 'Відкрий https://bilohash.com/comiks/game/ у браузері.'
    },
    en: {
      tag: 'NEW CLASS GAME', title: 'Treasure Run', sub: 'Run as your avatar, grab apples, numbers and things. Every pickup is spoken in Norwegian. Pia-AI whispers hints!',
      host: '📺 TV / teacher', join: '📱 Pupil', how: 'Teacher opens a room. Kids scan QR, steer with three buttons, collect the most.',
      creating: 'Laying the path…', scan: 'Scan and run!', players: n => n ? `${n} runners` : 'Waiting for runners…',
      start: '🏁 Run!', close: 'Close', back: '← Menu', wait: 'On the start line…',
      join_t: 'Join the hunt', name: 'Your name', go: 'Run ▶', code: 'Code',
      err_code: '5 characters.', err_name: 'Type your name.', err_room: 'Room not found. Scan QR again.', err_net: 'No network.',
      left: 'Left', mid: 'Middle', right: 'Right', last: 'You got:',
      results: 'Who grabbed most?', again: 'Again!', you: 'you',
      local: 'Open https://bilohash.com/comiks/game/ in the browser.'
    }
  };
  const lang = () => {
    const k = (window.KomiksCore && window.KomiksCore.ui) || document.documentElement.lang || 'no';
    if (k === 'nb' || k === 'no') return 'no';
    return TX[k] ? k : 'no';
  };
  const tx = (k, ...a) => { const t = TX[lang()] || TX.no; const v = t[k] != null ? t[k] : TX.en[k]; return typeof v === 'function' ? v(...a) : v; };
  const h = (tag, attrs, ...kids) => {
    if (window.KomiksCore && window.KomiksCore.h) return window.KomiksCore.h(tag, attrs, ...kids);
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    kids.flat(Infinity).forEach(c => { if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(c)); });
    return el;
  };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : h('span', {}, String(code || '🦊').split('|')[0]));
  const genCode = () => Array.from({ length: 5 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  const inGame = () => /\/game(\/|$)/.test(location.pathname);
  const api = () => (inGame() ? 'room.php' : 'game/room.php');
  const gameUrl = () => SITE + 'game/';
  const qrSvg = url => { try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 7, margin: 1, scalable: true }); } catch { return ''; } };
  const post = body => fetch(api(), { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) })
    .then(r => r.json().catch(() => ({ ok: false }))).catch(() => ({ ok: false, error: 'net' }));
  const getJSON = url => fetch(url, { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);

  let actx = null, mus = null;
  const ac = () => { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); return actx; };
  const beep = (f, d, type, vol) => {
    try {
      const c = ac(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.04);
    } catch { /* ignore */ }
  };
  const sfx = {
    grab: () => { beep(660, 0.08, 'square', 0.1); setTimeout(() => beep(990, 0.12, 'triangle', 0.1), 50); },
    go: () => { beep(392, 0.12); setTimeout(() => beep(523, 0.12), 120); setTimeout(() => beep(784, 0.2), 240); },
    win: () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.18, 'triangle', 0.12), i * 80)),
    tick: () => beep(880, 0.04, 'square', 0.05)
  };
  function music(on) {
    clearInterval(mus); mus = null;
    if (!on) return;
    const n = [60, 64, 67, 64, 69, 67, 72, 67]; let i = 0;
    mus = setInterval(() => {
      if (document.hidden) return;
      beep(440 * Math.pow(2, (n[i % n.length] - 69) / 12), 0.16, i % 2 ? 'square' : 'triangle', 0.035);
      if (i % 4 === 0) beep(98, 0.1, 'sine', 0.05);
      i++;
    }, 200);
  }
  function speakNo(text) {
    if (window.KomiksCore && window.KomiksCore.Speech) return window.KomiksCore.Speech.speak(text, 'narrator');
    try {
      const u = new SpeechSynthesisUtterance(text); u.lang = 'nb-NO'; u.rate = 0.95;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch { /* ignore */ }
  }

  function bag() {
    const out = [];
    ((window.WORDS && window.WORDS.themes) || []).forEach(th => (th.words || []).forEach(w => {
      if (w && w[0] && w[3] && String(w[3]).length <= 4) out.push({ no: w[0], uk: w[1], en: w[2], emoji: w[3] });
    }));
    const nums = ['null', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti'];
    nums.forEach((no, n) => out.push({ no, uk: String(n), en: String(n), emoji: n === 10 ? '🔟' : (n + '️⃣'), num: true }));
    return out.length ? out : [{ no: 'et eple', emoji: '🍎', uk: 'яблуко', en: 'apple' }];
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const HINTS = [
    'Se til høyre — der kommer noe!',
    'Bytt fil hvis det er tomt foran deg!',
    'Bra fart! Ta det som lyser.',
    'Hør ordet når du tar tingen.',
    'Tall gir ekstra poeng!',
    'Hold deg i midten om du er i tvil.',
    'En til! Du klarer det.',
    'Ikke glem å puste. Og løpe!'
  ];

  let session = null;
  const endSession = () => { if (session) { session.dead = true; clearInterval(session.tick); clearInterval(session.sim); music(false); session = null; } };
  const AVATAR = () => (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊');

  function mount(el) {
    document.body.classList.add('sj-live');
    const root = h('div', { class: 'sj-app' });
    const uiBox = h('div', { class: 'sj-ui' });
    root.append(uiBox);
    el.replaceChildren(root);
    const w = setInterval(() => { if (!root.isConnected) { clearInterval(w); document.body.classList.remove('sj-live'); endSession(); } }, 400);
    return { root, ui: uiBox };
  }

  function menu(el) {
    const S = mount(el); music(true);
    S.ui.replaceChildren(h('div', { class: 'sj-splash' },
      h('p', { class: 'sj-kicker' }, tx('tag')),
      h('h1', {}, tx('title')),
      h('p', { class: 'sj-sub' }, tx('sub')),
      h('div', { class: 'sj-row' },
        h('button', { class: 'sj-btn pri big', type: 'button', onclick: () => { sfx.go(); host(el); } }, tx('host')),
        h('button', { class: 'sj-btn big', type: 'button', onclick: () => join(el, '') }, tx('join'))),
      h('p', {}, tx('how')),
      h('p', {}, h('a', { class: 'sj-btn', href: '/comiks/#/hunt' }, '💬 Boblejakt')),
      location.protocol === 'file:' ? h('p', { class: 'sj-warn' }, tx('local')) : null));
  }

  function host(el) {
    const S = mount(el); endSession();
    const stuff = bag();
    const R = { code: genCode(), token: '', players: new Map(), phase: 'creating', items: [], x: 0, t0: 0, after: 0, hint: HINTS[0], lastWord: '', dead: false };
    session = R;
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, lane: p.lane, score: p.score, last: p.last || '' }));
    const snap = () => ({ kind: 'run', phase: R.phase, x: Math.round(R.x), left: Math.max(0, DUR - (Date.now() - R.t0) / 1000), hint: R.hint, lastWord: R.lastWord,
      players: list(), items: R.items.filter(it => it.x > R.x - 80 && it.x < R.x + 900).map(it => ({ id: it.id, lane: it.lane, x: Math.round(it.x), emoji: it.emoji, no: it.no })) });
    const push = () => post({ action: 'state', code: R.code, token: R.token, state: snap() });

    const draw = () => {
      if (!S.root.isConnected || R.dead) return;
      const pl = [...R.players.values()];
      if (R.phase === 'creating') { S.ui.replaceChildren(h('div', { class: 'sj-splash' }, h('h1', {}, tx('title')), h('p', {}, tx('creating')))); return; }
      if (R.phase === 'lobby') {
        const url = gameUrl() + '#/run/join/' + R.code;
        const qr = h('div', { class: 'sj-qr' }); qr.innerHTML = qrSvg(url);
        S.ui.replaceChildren(h('div', { class: 'sj-host' },
          h('div', { class: 'sj-card' }, h('p', { class: 'sj-kicker' }, tx('scan')), qr, h('div', { class: 'sj-code' }, R.code), h('p', { class: 'sj-url' }, url)),
          h('div', { class: 'sj-card' }, h('h2', {}, tx('title')), h('h3', {}, tx('players', pl.length)),
            pl.length ? h('div', { class: 'sj-people' }, pl.map(p => h('div', { class: 'sj-p' }, AV(p.avatar, { size: 64, mood: 'cheer' }), h('b', {}, p.name)))) : h('p', {}, tx('players', 0)),
            h('div', { class: 'sj-row' },
              h('button', { class: 'sj-btn go big', type: 'button', disabled: !pl.length, onclick: start }, tx('start')),
              h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close'))))));
        return;
      }
      if (R.phase === 'final') {
        const board = list().sort((a, b) => b.score - a.score);
        S.ui.replaceChildren(h('div', { class: 'sj-card sj-final' },
          h('h2', {}, tx('results')),
          window.KomiksAvatars ? window.KomiksAvatars.podium(board.map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.score })), { fmt: v => v, show: true }) : null,
          board.map((p, i) => h('div', { class: 'sj-row-sc' + (i === 0 ? ' lead' : '') }, AV(p.avatar, { size: 36 }), h('b', {}, (i + 1) + '. ' + p.name), h('em', {}, p.score + ' ⭐'), h('small', {}, p.last))),
          h('div', { class: 'sj-row' },
            h('button', { class: 'sj-btn go', type: 'button', onclick: () => { R.phase = 'lobby'; R.players.forEach(p => { p.score = 0; p.lane = 1; p.last = ''; }); music(true); draw(); push(); } }, tx('again')),
            h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close')))));
        return;
      }
      const cam = R.x;
      const lanes = [0, 1, 2].map(lane => h('div', { class: 'sj-lane' },
        R.items.filter(it => it.lane === lane && it.x > cam - 40 && it.x < cam + 780).map(it => h('div', { class: 'sj-item', style: { left: ((it.x - cam) / 780 * 100) + '%' } }, it.emoji)),
        pl.filter(p => p.lane === lane).map((p, i) => h('div', { class: 'sj-runner', style: { left: (8 + i * 7) + '%' } }, AV(p.avatar, { size: 52, mood: 'cheer' })))
      ));
      const left = Math.max(0, Math.ceil(DUR - (Date.now() - R.t0) / 1000));
      S.ui.replaceChildren(
        h('div', { class: 'sj-hud' }, h('span', { class: 'sj-kicker' }, tx('title')), h('span', { class: 'sj-timer' }, left + 's'), h('span', { class: 'sj-code' }, R.code)),
        h('div', { class: 'sj-hint' }, h('b', {}, 'Pia-AI: '), R.hint, R.lastWord ? h('span', {}, ' · «' + R.lastWord + '»') : null),
        h('div', { class: 'sj-world' }, h('div', { class: 'sj-hills' }), h('div', { class: 'sj-lanes' }, ...lanes)),
        h('div', { class: 'sj-board' }, list().sort((a, b) => b.score - a.score).map((p, i) => h('div', { class: 'sj-row-sc' + (i === 0 ? ' lead' : '') },
          AV(p.avatar, { size: 32 }), h('b', {}, p.name), h('em', {}, p.score), h('small', {}, p.last)))));
    };

    let nid = 1;
    function spawn() {
      const w = pick(stuff);
      R.items.push({ id: nid++, lane: Math.floor(Math.random() * LANES), x: R.x + 520 + Math.random() * 420, emoji: w.emoji, no: w.no, taken: false });
      if (R.items.length > 40) R.items = R.items.filter(it => it.x > R.x - 100);
    }
    function start() {
      sfx.go(); music(true);
      R.phase = 'play'; R.x = 0; R.t0 = Date.now(); R.items = []; R.lastWord = '';
      R.players.forEach(p => { p.score = 0; p.lane = 1; p.last = ''; });
      spawn(); spawn(); spawn();
      draw();
      clearInterval(R.sim);
      R.sim = setInterval(() => {
        if (R.dead || R.phase !== 'play') { clearInterval(R.sim); return; }
        R.x += 7.2;
        if (Math.random() < 0.18) spawn();
        R.players.forEach(p => {
          R.items.forEach(it => {
            if (it.taken || it.lane !== p.lane) return;
            if (Math.abs(it.x - (R.x + 70)) < 36) {
              it.taken = true; p.score += it.no && /\d|null|en|to|tre|fire|fem|seks|sju|åtte|ni|ti/.test(it.no) ? 2 : 1;
              p.last = it.no; R.lastWord = it.no; sfx.grab(); speakNo(it.no);
              R.hint = pick(['Ja! ' + it.no + '!', 'Bra tatt: ' + it.no, 'Hør: ' + it.no, HINTS[Math.floor(Math.random() * HINTS.length)]]);
            }
          });
        });
        R.items = R.items.filter(it => !it.taken);
        if (Date.now() - R.t0 > DUR * 1000) {
          R.phase = 'final'; music(false); sfx.win();
          if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'run-' + R.code, topic: tx('title'), total: DUR, board: list() });
        }
        if (Math.random() < 0.04) R.hint = pick(HINTS);
        draw();
      }, 80);
    }
    function onEvent(m) {
      if (!m || !m.t) return;
      if (m.t === 'hello') {
        R.players.set(m.pid, { pid: m.pid, name: m.name || '?', avatar: m.avatar || '🦊', lane: 1, score: 0, last: '' });
        draw();
      } else if (m.t === 'lane' || m.t === 'move') {
        const p = R.players.get(m.pid); if (!p) return;
        const lane = Math.max(0, Math.min(2, parseInt(m.lane, 10)));
        if (!isNaN(lane)) p.lane = lane;
      }
    }
    async function loop() {
      if (R.dead) return;
      const j = await getJSON(api() + '?action=events&code=' + encodeURIComponent(R.code) + '&token=' + encodeURIComponent(R.token) + '&after=' + R.after);
      if (j && j.ok) { (j.msgs || []).forEach(onEvent); R.after = j.after || R.after; }
      await push();
      R.tick = setTimeout(loop, 280);
    }
    post({ action: 'open', code: R.code }).then(j => {
      if (!j || !j.ok) { S.ui.replaceChildren(h('div', { class: 'sj-splash' }, h('p', { class: 'sj-warn' }, tx('err_net')))); return; }
      R.token = j.token; R.phase = 'lobby'; music(true); draw(); loop();
    });
    draw();
  }

  function join(el, code) {
    const S = mount(el); endSession();
    let avatar = AVATAR(), saved = {};
    try { saved = JSON.parse(localStorage.getItem('comiks.gameProfile') || '{}'); } catch { /* ignore */ }
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: '5', value: (code || '').toUpperCase() });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: '20', value: saved.name || '' });
      const err = h('p', { class: 'sj-warn', hidden: true });
      const formEl = h('form', { class: 'sj-card sj-join' }, h('p', { class: 'sj-kicker' }, tx('title')), h('h2', {}, tx('join_t')),
        h('label', {}, h('span', {}, tx('code')), codeIn), h('label', {}, h('span', {}, tx('name')), nameIn), err,
        h('button', { class: 'sj-btn go big', type: 'submit' }, tx('go')));
      formEl.addEventListener('submit', e => {
        e.preventDefault();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.hidden = false; err.textContent = tx('err_code'); return; }
        if (!n) { err.hidden = false; err.textContent = tx('err_name'); return; }
        try { localStorage.setItem('comiks.gameProfile', JSON.stringify({ name: n, avatar })); } catch { /* ignore */ }
        play(c, n);
      });
      S.ui.replaceChildren(formEl);
      if ((code || '').length === 5 && saved.name) setTimeout(() => formEl.requestSubmit(), 180);
    };
    const play = (c, name) => {
      let pid; try { pid = sessionStorage.getItem('komiks.run.pid') || ('r' + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem('komiks.run.pid', pid); } catch { pid = 'r' + Math.random().toString(36).slice(2, 10); }
      const P = { dead: false, lane: 1, lastKey: '' };
      session = P;
      const send = msg => post({ action: 'event', code: c, pid, msg });
      const status = t => S.ui.replaceChildren(h('div', { class: 'sj-card sj-phone' }, AV(avatar, { size: 110, mood: 'cheer' }), h('b', {}, name), h('p', {}, t)));
      status(tx('wait'));
      send({ t: 'hello', name, avatar }).then(j => {
        if (!j || !j.ok) { status(tx(j && j.error === 'room' ? 'err_room' : 'err_net')); return; }
        music(true);
        const setLane = lane => { P.lane = lane; send({ t: 'lane', lane }); sfx.tick(); paint(); };
        const paint = (st) => {
          const me = ((st && st.players) || []).find(p => p.pid === pid);
          const last = (me && me.last) || '';
          if (last && last !== P.lastSpoken) { P.lastSpoken = last; speakNo(last); sfx.grab(); }
          const left = st && st.left != null ? Math.ceil(st.left) : '—';
          S.ui.replaceChildren(h('div', { class: 'sj-phone' },
            h('div', { class: 'sj-hud' }, h('span', { class: 'sj-kicker' }, tx('title')), h('span', { class: 'sj-timer' }, left + 's')),
            AV(avatar, { size: 90, mood: 'cheer' }),
            h('div', { class: 'sj-word' }, last ? tx('last') + ' ' + last : '…'),
            h('p', {}, st && st.hint ? 'Pia-AI: ' + st.hint : ''),
            h('div', { class: 'sj-pads' },
              h('button', { class: 'sj-pad' + (P.lane === 0 ? ' on' : ''), type: 'button', onclick: () => setLane(0) }, '◀ ' + tx('left')),
              h('button', { class: 'sj-pad' + (P.lane === 1 ? ' on' : ''), type: 'button', onclick: () => setLane(1) }, '● ' + tx('mid')),
              h('button', { class: 'sj-pad' + (P.lane === 2 ? ' on' : ''), type: 'button', onclick: () => setLane(2) }, tx('right') + ' ▶'))
          ));
        };
        const loop = async () => {
          if (P.dead) return;
          const j2 = await getJSON(api() + '?action=state&code=' + encodeURIComponent(c));
          if (!j2 || !j2.ok) { if (j2 && j2.error === 'room') { status(tx('err_room')); P.dead = true; return; } P.tick = setTimeout(loop, 700); return; }
          const st = j2.state || {};
          if (st.phase === 'final') {
            music(false); sfx.win();
            const board = (st.players || []).slice().sort((a, b) => b.score - a.score);
            const me = board.find(p => p.pid === pid);
            S.ui.replaceChildren(h('div', { class: 'sj-card sj-final' },
              h('h2', {}, tx('results')),
              window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: tx('you'), fmt: v => v, show: true }) : null,
              me ? h('p', {}, me.name + ': ' + me.score + ' ⭐') : null,
              h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('back'))));
            P.dead = true; return;
          }
          if (st.phase === 'play') paint(st);
          else status(tx('wait') + ' · ' + tx('players', (st.players || []).length));
          send({ t: 'ping' });
          P.tick = setTimeout(loop, 320);
        };
        loop();
      });
    };
    form();
  }

  function standalone() {
    const root = document.getElementById('sj-root') || document.getElementById('bh-root');
    if (!root) return false;
    let cur = '';
    const go = () => {
      const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
      const key = parts.join('/');
      if (key === cur && cur) return;
      cur = key;
      if (parts[0] === 'run' && parts[1] === 'join') join(root, parts[2] || '');
      else if (parts[0] === 'join') join(root, parts[1] || '');
      else if (parts[0] === 'host' || parts[0] === 'run') host(root);
      else if (parts[0] === 'hunt') return;
      else menu(root);
    };
    window.addEventListener('hashchange', go);
    go();
    return true;
  }
  function render(id, arg) {
    const box = document.createElement('div');
    if (id === 'host') host(box);
    else if (id === 'join') join(box, arg || '');
    else menu(box);
    return box;
  }
  window.KomiksRun = { render };
  if (typeof document !== 'undefined' && (document.getElementById('sj-root') || (document.getElementById('bh-root') && !window.KomiksHunt))) {
    /* hunt owns bh-root if present; launcher uses sj-root */
  }
  if (typeof document !== 'undefined' && document.getElementById('sj-root')) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', standalone);
    else standalone();
  }
  if (window.I18N) {
    const MOD = { uk: ['🏃', 'Скарби', 'біжи і збирай норвезькі слова'], en: ['🏃', 'Treasure Run', 'run and grab Norwegian words'], no: ['🏃', 'Skattejakt', 'løp og samle norske ord'] };
    ['uk', 'en', 'no'].forEach(l => { const I = window.I18N[l]; if (!I) return; I.nav = Object.assign({}, I.nav, { run: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { run: MOD[l] }); });
  }
})();
