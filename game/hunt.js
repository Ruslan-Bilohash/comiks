/* Boblejakt — klasse-spill med QR. Rommet går via vårt API (game/room.php), ikke PeerJS.
   Lyd, musikk, nedtelling, bobler. /comiks/game/ eller SPA #/hunt. */
(() => {
  'use strict';
  if (typeof document !== 'undefined') (function loadCss() {
    if (document.querySelector('link[data-bh]')) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.setAttribute('data-bh', '1');
    const v = (window.KOMIKS_DATA || {}).version || Date.now().toString(36);
    const inGame = /\/game(\/|$)/.test(location.pathname);
    l.href = (inGame ? 'hunt.css' : 'game/hunt.css') + '?v=' + encodeURIComponent(v);
    document.head.appendChild(l);
  })();

  const SITE = 'https://bilohash.com/comiks/';
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const ROUND_SEC = 10;
  const TX = {
    uk: {
      title: 'Boblejakt', tag: 'КЛАСОВА ВЕЧІРКА', sub: 'Малюнок. Норвезьке слово. Бульбашка. Хто швидше — той король класу!',
      host: '📺 Відкрити кімнату', join: '📱 Я учень', how: 'Вчитель — на ТВ. Діти сканують QR. Музика, очки, подіум.',
      creating: 'Задуваємо бульбашки…', scan: 'Наведи камеру на QR', players: n => (n ? `${n} уже в грі!` : 'Чекаємо героїв…'),
      start: '🚀 Поїхали!', close: 'Закрити', back: '← Меню', rounds: 'Раундів', next: 'Далі ▶', results: 'Подіум',
      again: 'Ще раз!', join_t: 'Залітай у полювання', name: 'Твоє ім’я', go: 'Увійти ▶', wait: 'Зачекай вчителя… зараз буде весело!',
      ask: 'Hva er dette?', listen: 'Ще раз!', locked: 'Є!', ok: 'BRA!', bad: 'Oisann!',
      err_code: 'Код — 5 літер.', err_name: 'Напиши ім’я!', err_room: 'Кімнату не знайдено. Відкрий QR ще раз.',
      err_net: 'Немає мережі.', host_left: 'Кімнату закрито.', local: 'Відкрий гру з https://bilohash.com/comiks/game/ — не з файлу.',
      you: 'ти', place: (r, n) => `#${r} з ${n}`, combo: n => `🔥 ×${n}`, go3: '3', go2: '2', go1: '1', go0: 'JAKTES!'
    },
    en: {
      title: 'Boblejakt', tag: 'CLASS PARTY', sub: 'A picture. A Norwegian word. A bubble. Fastest tap wins the round!',
      host: '📺 Open a room', join: '📱 I’m a pupil', how: 'Teacher on the TV. Kids scan the QR. Music, points, podium.',
      creating: 'Blowing bubbles…', scan: 'Point the camera at the QR', players: n => (n ? `${n} already in!` : 'Waiting for heroes…'),
      start: '🚀 Let’s go!', close: 'Close', back: '← Menu', rounds: 'Rounds', next: 'Next ▶', results: 'Podium',
      again: 'Again!', join_t: 'Jump into the hunt', name: 'Your name', go: 'Enter ▶', wait: 'Wait for the teacher… party time soon!',
      ask: 'Hva er dette?', listen: 'Again!', locked: 'In!', ok: 'BRA!', bad: 'Oisann!',
      err_code: 'The code is 5 characters.', err_name: 'Type your name!', err_room: 'Room not found. Scan the QR again.',
      err_net: 'No network.', host_left: 'The room closed.', local: 'Open https://bilohash.com/comiks/game/ — not a file.',
      you: 'you', place: (r, n) => `#${r} of ${n}`, combo: n => `🔥 ×${n}`, go3: '3', go2: '2', go1: '1', go0: 'HUNT!'
    },
    no: {
      title: 'Boblejakt', tag: 'Klassefest', sub: 'Et bilde. Et norsk ord. En boble. Den raskeste vinner runden!',
      host: '📺 Åpne rom', join: '📱 Jeg er elev', how: 'Lærer på TV. Elevene skanner QR. Musikk, poeng, pall.',
      creating: 'Blåser bobler…', scan: 'Rett kameraet mot QR-koden', players: n => (n ? `${n} er med!` : 'Venter på helter…'),
      start: '🚀 Kjør!', close: 'Lukk', back: '← Meny', rounds: 'Runder', next: 'Neste ▶', results: 'Pall',
      again: 'En gang til!', join_t: 'Hopp inn i jakten', name: 'Navnet ditt', go: 'Inn ▶', wait: 'Vent på læreren… festen starter snart!',
      ask: 'Hva er dette?', listen: 'Igjen!', locked: 'Inne!', ok: 'BRA!', bad: 'Oisann!',
      err_code: 'Koden er 5 tegn.', err_name: 'Skriv navnet ditt!', err_room: 'Fant ikke rommet. Skann QR på nytt.',
      err_net: 'Ingen nett.', host_left: 'Rommet er stengt.', local: 'Åpne https://bilohash.com/comiks/game/ — ikke en fil.',
      you: 'deg', place: (r, n) => `#${r} av ${n}`, combo: n => `🔥 ×${n}`, go3: '3', go2: '2', go1: '1', go0: 'JAKT!'
    }
  };
  const lang = () => {
    const k = (window.KomiksCore && window.KomiksCore.ui) || document.documentElement.lang || 'no';
    if (k === 'nb' || k === 'no') return 'no';
    return TX[k] ? k : 'no';
  };
  const tx = (key, ...a) => {
    const t = TX[lang()] || TX.no;
    const v = t[key] != null ? t[key] : TX.en[key];
    return typeof v === 'function' ? v(...a) : v;
  };
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
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : h('span', { class: 'bh-emo' }, String(code || '🦊').split('|')[0]));
  const genCode = () => Array.from({ length: 5 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  const inGameDir = () => /\/game(\/|$)/.test(location.pathname);
  const api = () => (inGameDir() ? 'room.php' : 'game/room.php');
  const gameUrl = () => SITE + 'game/';
  const qrSvg = url => {
    try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 7, margin: 1, scalable: true }); } catch { return ''; }
  };

  /* ---------- lyd ---------- */
  let actx = null, musicOn = true, musicT = null, musicStep = 0;
  try { musicOn = localStorage.getItem('comiks.music') !== '0'; } catch { /* ignore */ }
  const ac = () => {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  };
  const tone = (f, d, type, vol, slide) => {
    if (!musicOn) return;
    try {
      const c = ac(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.05);
    } catch { /* ignore */ }
  };
  const sfx = {
    tap: () => tone(880, 0.06, 'square', 0.08),
    ok: () => { tone(523, 0.1, 'square', 0.14); setTimeout(() => tone(784, 0.16, 'square', 0.16), 70); setTimeout(() => tone(1046, 0.22, 'triangle', 0.14), 140); },
    bad: () => { tone(220, 0.18, 'sawtooth', 0.1, 90); },
    tick: () => tone(660, 0.05, 'square', 0.06),
    go: () => { tone(392, 0.12, 'square', 0.12); setTimeout(() => tone(523, 0.12, 'square', 0.12), 160); setTimeout(() => tone(784, 0.28, 'triangle', 0.16), 320); },
    win: () => { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.22, 'triangle', 0.14), i * 90)); },
    pop: () => tone(1200, 0.05, 'triangle', 0.07, 400)
  };
  function music(on) {
    clearInterval(musicT); musicT = null;
    if (!on || !musicOn) return;
    const notes = [60, 64, 67, 64, 69, 67, 64, 62];
    musicStep = 0;
    musicT = setInterval(() => {
      if (document.hidden) return;
      const n = notes[musicStep % notes.length];
      tone(440 * Math.pow(2, (n - 69) / 12), 0.18, musicStep % 4 === 0 ? 'triangle' : 'square', 0.04);
      if (musicStep % 4 === 0) tone(110, 0.12, 'sine', 0.06);
      musicStep++;
    }, 220);
  }
  const unlock = () => { try { ac(); } catch { /* ignore */ } };

  function pool() {
    const out = [];
    ((window.WORDS && window.WORDS.themes) || []).forEach(th => (th.words || []).forEach(w => {
      if (w && w[0] && w[3]) out.push({ no: w[0], uk: w[1], en: w[2], emoji: w[3], theme: th.id });
    }));
    return out;
  }
  function makeRounds(n) {
    const all = pool();
    if (all.length < 8) return [];
    const pick = a => a[Math.floor(Math.random() * a.length)];
    const sh = a => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
    const used = new Set(), rounds = [];
    for (let i = 0; i < n && used.size < all.length; i++) {
      let item = pick(all), g = 0;
      while (used.has(item.no) && g++ < 50) item = pick(all);
      used.add(item.no);
      const same = all.filter(x => x.theme === item.theme && x.no !== item.no);
      const rest = all.filter(x => x.no !== item.no);
      const distract = sh(same.length >= 3 ? same : rest).slice(0, 3).map(x => x.no);
      while (distract.length < 3) distract.push(pick(rest).no);
      rounds.push({ emoji: item.emoji, no: item.no, uk: item.uk, en: item.en, options: sh([item.no, ...distract.slice(0, 3)]) });
    }
    return rounds;
  }
  const AVATAR = () => (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊');
  const post = body => fetch(api(), { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) })
    .then(r => r.json().catch(() => ({ ok: false }))).catch(() => ({ ok: false, error: 'net' }));
  const getJSON = url => fetch(url, { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);

  function speakNo(text) {
    if (window.KomiksCore && window.KomiksCore.Speech) return window.KomiksCore.Speech.speak(text, 'narrator');
    try {
      const AUDIO = window.AUDIO || {};
      const hit = Object.keys(AUDIO).find(k => k.toLowerCase().indexOf(String(text).toLowerCase().replace(/^en |^ei |^et /, '')) >= 0);
      if (hit) {
        const a = new Audio((inGameDir() ? '../' : '') + 'audio/' + AUDIO[hit] + '.mp3');
        return a.play().catch(() => synth(text));
      }
    } catch { /* ignore */ }
    synth(text);
  }
  function synth(text) {
    try { const u = new SpeechSynthesisUtterance(text); u.lang = 'nb-NO'; u.rate = 0.92; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { /* ignore */ }
  }

  let session = null;
  const endSession = () => { if (session) { session.dead = true; clearInterval(session.tick); music(false); session = null; } };

  function mount(el) {
    document.body.classList.add('bh-live', 'bh');
    const root = h('div', { class: 'bh-app' });
    const fx = h('div', { class: 'bh-fx', 'aria-hidden': 'true' });
    const uiBox = h('div', { class: 'bh-ui' });
    root.append(fx, uiBox);
    el.replaceChildren(root);
    const watch = setInterval(() => { if (!root.isConnected) { clearInterval(watch); document.body.classList.remove('bh-live'); endSession(); } }, 400);
    return { root, ui: uiBox, fx, burst(kind) {
      for (let i = 0; i < (kind === 'win' ? 28 : 12); i++) {
        const b = h('i', { class: 'bh-part ' + (kind || 'pop') });
        b.style.left = (8 + Math.random() * 84) + '%';
        b.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
        b.style.setProperty('--h', ['#ffd23f', '#2e86de', '#ee4035', '#3bb273', '#fff'][i % 5]);
        fx.append(b); setTimeout(() => b.remove(), 900);
      }
    } };
  }

  function menu(el) {
    unlock();
    const S = mount(el);
    music(true);
    S.ui.replaceChildren(h('div', { class: 'bh-splash' },
      h('div', { class: 'bh-float' }, h('span', {}, '🫧'), h('span', {}, '💬'), h('span', {}, '🦊'), h('span', {}, '⭐'), h('span', {}, '🇳🇴')),
      h('p', { class: 'bh-kicker' }, tx('tag')),
      h('h1', {}, tx('title')),
      h('p', { class: 'bh-sub' }, tx('sub')),
      h('div', { class: 'bh-row' },
        h('button', { class: 'bh-btn pri big', type: 'button', onclick: () => { sfx.go(); host(el); } }, tx('host')),
        h('button', { class: 'bh-btn ghost big', type: 'button', onclick: () => { sfx.tap(); join(el, ''); } }, tx('join'))),
      h('p', { class: 'bh-how' }, tx('how')),
      location.protocol === 'file:' ? h('p', { class: 'bh-warn' }, tx('local')) : null));
  }

  function host(el) {
    unlock();
    const S = mount(el);
    endSession();
    const R = { code: genCode(), token: '', players: new Map(), phase: 'creating', i: 0, rounds: [], want: 10, after: 0, dead: false };
    session = R;
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: true, score: p.score || 0, combo: p.combo || 0 }));
    const pushState = () => post({ action: 'state', code: R.code, token: R.token, state: { phase: R.phase, players: list(), i: R.i, total: (R.rounds || []).length, round: R.phase === 'play' || R.phase === 'reveal' ? Object.assign({}, R.rounds[R.i], { endsAt: R.endsAt, reveal: R.phase === 'reveal' }) : null, want: R.want } });
    const draw = () => {
      if (!S.root.isConnected || R.dead) return;
      const pl = [...R.players.values()];
      if (R.phase === 'creating') {
        S.ui.replaceChildren(h('div', { class: 'bh-splash' }, h('h1', {}, tx('title')), h('p', {}, tx('creating'))));
        return;
      }
      if (R.phase === 'lobby') {
        const url = gameUrl() + '#/join/' + R.code;
        const qr = h('div', { class: 'bh-qr' }); qr.innerHTML = qrSvg(url);
        S.ui.replaceChildren(h('div', { class: 'bh-host' },
          h('div', { class: 'bh-tv' },
            h('p', { class: 'bh-kicker' }, tx('scan')),
            qr,
            h('div', { class: 'bh-code' }, R.code),
            h('p', { class: 'bh-url' }, url)),
          h('div', { class: 'bh-side' },
            h('h2', {}, tx('title')),
            h('p', {}, tx('rounds')),
            h('div', { class: 'bh-row' }, [8, 10, 14].map(n => h('button', { class: 'bh-chip' + (R.want === n ? ' on' : ''), type: 'button', onclick: () => { R.want = n; sfx.tap(); draw(); } }, String(n)))),
            h('h3', {}, tx('players', pl.length)),
            pl.length ? h('div', { class: 'bh-people' }, pl.map(p => h('div', { class: 'bh-p in' }, AV(p.avatar, { size: 70, mood: 'cheer' }), h('b', {}, p.name)))) : h('p', { class: 'bh-waitline' }, '🫧 ' + tx('players', 0)),
            h('div', { class: 'bh-row' },
              h('button', { class: 'bh-btn pri big', type: 'button', disabled: !pl.length, onclick: start }, tx('start')),
              h('button', { class: 'bh-btn ghost', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close'))))));
        return;
      }
      if (R.phase === 'count') {
        S.ui.replaceChildren(h('div', { class: 'bh-count' }, h('b', {}, R.countTxt || '3')));
        return;
      }
      if (R.phase === 'final') {
        const board = list().sort((a, b) => b.score - a.score);
        S.ui.replaceChildren(h('div', { class: 'bh-final' },
          h('p', { class: 'bh-kicker' }, tx('results')),
          h('h2', {}, '🏆'),
          window.KomiksAvatars ? window.KomiksAvatars.podium(board, { fmt: v => v + ' p', show: true }) : scoreboard(board),
          scoreboard(board),
          h('div', { class: 'bh-row' },
            h('button', { class: 'bh-btn pri big', type: 'button', onclick: () => { R.phase = 'lobby'; R.players.forEach(p => { p.score = 0; p.combo = 0; p.ans = null; }); music(true); draw(); pushState(); } }, tx('again')),
            h('button', { class: 'bh-btn ghost', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close')))));
        return;
      }
      const q = R.rounds[R.i] || {};
      const left = Math.max(0, Math.ceil((R.endsAt - Date.now()) / 1000));
      S.ui.replaceChildren(
        h('div', { class: 'bh-top' }, h('span', { class: 'bh-kicker' }, tx('title')), h('span', { class: 'bh-chip on' }, (R.i + 1) + '/' + R.rounds.length), h('span', { class: 'bh-timer' + (left <= 3 ? ' hurry' : '') }, left + 's'), h('span', { class: 'bh-chip' }, R.code)),
        h('div', { class: 'bh-arena' },
          h('div', { class: 'bh-pic' + (R.phase === 'reveal' ? ' reveal' : '') }, h('span', { class: 'bh-emoji' }, q.emoji)),
          h('div', { class: 'bh-ask' }, tx('ask')),
          R.phase === 'reveal' ? h('div', { class: 'bh-word' }, q.no) : h('button', { class: 'bh-btn yell', type: 'button', onclick: () => speakNo(q.no) }, '🔊 ' + tx('listen'))),
        scoreboard(list().sort((a, b) => b.score - a.score), q));
    };
    function scoreboard(board, q) {
      return h('div', { class: 'bh-board' }, board.map((p, i) => h('div', { class: 'bh-row-sc' + (i === 0 ? ' lead' : '') },
        AV(p.avatar, { size: 36 }),
        h('b', {}, (i + 1) + '. ' + p.name),
        h('span', {}, p.combo > 1 && R.phase === 'play' ? tx('combo', p.combo) : ''),
        h('em', {}, (p.score || 0) + ' p'),
        q && R.phase === 'reveal' ? h('small', {}, p.ans == null ? '…' : (p.ans === q.no ? '✓' : '✕')) : null)));
    }
    async function start() {
      unlock(); sfx.go(); music(false);
      R.rounds = makeRounds(R.want);
      R.i = 0;
      R.players.forEach(p => { p.score = 0; p.combo = 0; p.ans = null; });
      R.phase = 'count';
      for (const t of ['go3', 'go2', 'go1', 'go0']) {
        R.countTxt = tx(t); sfx.tick(); draw(); await new Promise(r => setTimeout(r, t === 'go0' ? 700 : 550));
        if (R.dead) return;
      }
      sendRound();
    }
    function sendRound() {
      const q = R.rounds[R.i];
      if (!q) { finish(); return; }
      R.phase = 'play';
      R.endsAt = Date.now() + ROUND_SEC * 1000;
      R.players.forEach(p => { p.ans = null; });
      speakNo(q.no);
      S.burst('pop');
      draw();
      pushState();
      clearInterval(R.roundTick);
      R.roundTick = setInterval(() => {
        if (R.dead || R.phase !== 'play') { clearInterval(R.roundTick); return; }
        if (Date.now() % 1000 < 250) sfx.tick();
        draw();
        const all = [...R.players.values()];
        if (Date.now() >= R.endsAt || (all.length && all.every(p => p.ans != null))) reveal();
      }, 200);
    }
    function reveal() {
      if (R.phase !== 'play') return;
      R.phase = 'reveal';
      clearInterval(R.roundTick);
      const q = R.rounds[R.i];
      const hits = [...R.players.values()].filter(p => p.ans === q.no);
      if (hits.length) { sfx.ok(); S.burst('win'); } else sfx.bad();
      draw();
      pushState();
      setTimeout(() => { if (!R.dead && R.phase === 'reveal') { R.i += 1; sendRound(); } }, 2600);
    }
    function finish() {
      R.phase = 'final';
      music(true); sfx.win(); S.burst('win');
      if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'hunt-' + R.code, topic: tx('title'), total: R.rounds.length, board: list() });
      if (window.KomiksCore) try { window.KomiksCore.confetti(); } catch { /* ignore */ }
      draw(); pushState();
    }
    function onEvent(m) {
      if (!m || !m.t) return;
      if (m.t === 'hello') {
        const p = Object.assign(R.players.get(m.pid) || { score: 0, combo: 0 }, { pid: m.pid, name: m.name || '?', avatar: m.avatar || '🙂' });
        R.players.set(m.pid, p);
        sfx.pop(); S.burst('pop');
        draw();
      } else if (m.t === 'ans' && R.phase === 'play') {
        const p = R.players.get(m.pid); if (!p || p.ans != null) return;
        const q = R.rounds[R.i];
        p.ans = String(m.pick || '');
        if (p.ans === q.no) {
          const left = Math.max(0, R.endsAt - Date.now());
          p.combo = (p.combo || 0) + 1;
          p.score = (p.score || 0) + Math.max(120, Math.round(1000 * left / (ROUND_SEC * 1000))) + (p.combo > 1 ? p.combo * 40 : 0);
        } else p.combo = 0;
        draw();
      } else if (m.t === 'ping') {
        const p = R.players.get(m.pid); if (p) p.seen = Date.now();
      }
    }
    async function loop() {
      if (R.dead) return;
      const j = await getJSON(api() + '?action=events&code=' + encodeURIComponent(R.code) + '&token=' + encodeURIComponent(R.token) + '&after=' + R.after);
      if (j && j.ok) {
        (j.msgs || []).forEach(onEvent);
        R.after = j.after || R.after;
      }
      await pushState();
      R.tick = setTimeout(loop, 350);
    }
    post({ action: 'open', code: R.code }).then(j => {
      if (!j || !j.ok) { S.ui.replaceChildren(h('div', { class: 'bh-splash' }, h('h1', {}, tx('title')), h('p', { class: 'bh-warn' }, tx('err_net')))); return; }
      R.token = j.token;
      R.phase = 'lobby';
      music(true);
      draw();
      loop();
    });
    draw();
  }

  function join(el, code) {
    unlock();
    const S = mount(el);
    endSession();
    let avatar = AVATAR();
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('comiks.gameProfile') || '{}'); } catch { /* ignore */ }
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: '5', value: (code || '').toUpperCase(), autocapitalize: 'characters' });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: '20', value: saved.name || '' });
      const err = h('p', { class: 'bh-warn', hidden: true });
      S.ui.replaceChildren(h('form', { class: 'bh-join' },
        h('p', { class: 'bh-kicker' }, tx('title')),
        h('h2', {}, tx('join_t')),
        h('label', {}, h('span', {}, tx('code')), codeIn),
        h('label', {}, h('span', {}, tx('name')), nameIn),
        err,
        h('button', { class: 'bh-btn pri big', type: 'submit' }, tx('go'))));
      S.ui.querySelector('form').addEventListener('submit', e => {
        e.preventDefault(); unlock();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.hidden = false; err.textContent = tx('err_code'); sfx.bad(); return; }
        if (!n) { err.hidden = false; err.textContent = tx('err_name'); sfx.bad(); return; }
        try { localStorage.setItem('comiks.gameProfile', JSON.stringify({ name: n, avatar })); } catch { /* ignore */ }
        connect(c, n);
      });
      if ((code || '').length === 5 && saved.name) setTimeout(() => S.ui.querySelector('form').requestSubmit(), 200);
    };
    const connect = (c, name) => {
      let pid;
      try { pid = sessionStorage.getItem('komiks.hunt.pid') || ('h' + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem('komiks.hunt.pid', pid); } catch { pid = 'h' + Math.random().toString(36).slice(2, 10); }
      const P = { dead: false, last: '', locked: false, i: -1 };
      session = P;
      const status = text => S.ui.replaceChildren(h('div', { class: 'bh-wait' }, AV(avatar, { size: 120, mood: 'cheer' }), h('b', {}, name), h('p', {}, text), h('div', { class: 'bh-dots' }, h('i'), h('i'), h('i'))));
      const send = msg => post({ action: 'event', code: c, pid, msg });
      status('🫧 ' + tx('wait'));
      send({ t: 'hello', name, avatar }).then(j => {
        if (!j || !j.ok) { status(tx(j && j.error === 'room' ? 'err_room' : 'err_net')); sfx.bad(); return; }
        sfx.ok(); music(true);
        const loop = async () => {
          if (P.dead) return;
          const j2 = await getJSON(api() + '?action=state&code=' + encodeURIComponent(c));
          if (!j2 || !j2.ok) { if (j2 && j2.error === 'room') { status(tx('err_room')); P.dead = true; return; } P.tick = setTimeout(loop, 800); return; }
          const st = j2.state || {};
          const key = st.phase + ':' + st.i + ':' + (st.round && st.round.reveal);
          if (key !== P.last) {
            P.last = key;
            if (st.phase === 'lobby' || st.phase === 'count') {
              music(true);
              status(st.phase === 'count' ? (st.round && st.round.no) || '3' : tx('wait') + ' · ' + tx('players', (st.players || []).length));
            } else if (st.phase === 'play' && st.round && !st.round.reveal) {
              if (P.i !== st.i) { P.i = st.i; P.locked = false; sfx.pop(); music(false); }
              const q = st.round;
              const opts = h('div', { class: 'bh-opts' }, (q.options || []).map((w, i) => h('button', { class: 'bh-opt c' + i, type: 'button', onclick: ev => {
                if (P.locked) return;
                P.locked = true; sfx.tap();
                send({ t: 'ans', pick: w, i: st.i });
                ev.currentTarget.classList.add('pick');
                [...opts.querySelectorAll('button')].forEach(b => { b.disabled = true; });
              } }, w)));
              S.ui.replaceChildren(h('div', { class: 'bh-phone' },
                h('div', { class: 'bh-emoji' }, q.emoji),
                h('div', { class: 'bh-ask' }, tx('ask')),
                opts));
            } else if (st.round && st.round.reveal) {
              const ans = st.round.no;
              S.ui.querySelectorAll('.bh-opt').forEach(b => {
                if (b.textContent === ans) { b.classList.add('ok'); } else if (b.classList.contains('pick')) b.classList.add('bad');
              });
              const mine = (st.players || []).find(p => p.pid === pid);
              if (mine && S.ui.querySelector('.bh-opt.pick.ok')) { sfx.ok(); S.burst && S.burst('win'); }
              else if (S.ui.querySelector('.bh-opt.pick.bad')) sfx.bad();
            } else if (st.phase === 'final') {
              music(true); sfx.win();
              const board = st.players || [];
              const me = board.find(p => p.pid === pid);
              S.ui.replaceChildren(h('div', { class: 'bh-final' },
                h('h2', {}, tx('results')),
                window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: tx('you'), fmt: v => v + ' p', show: true }) : null,
                me ? h('p', { class: 'bh-me' }, tx('place', board.indexOf(me) + 1, board.length) + ' · ' + (me.score || 0) + ' p') : null,
                h('button', { class: 'bh-btn ghost', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('back'))));
            }
          }
          send({ t: 'ping' });
          P.tick = setTimeout(loop, 400);
        };
        loop();
      });
    };
    form();
  }

  function standalone() {
    const root = document.getElementById('bh-root');
    if (!root) return false;
    let cur = '';
    const go = () => {
      const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
      const key = parts.join('/');
      if (key === cur && cur) return;
      cur = key;
      if (parts[0] === 'host') host(root);
      else if (parts[0] === 'join') join(root, parts[1] || '');
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
  window.KomiksHunt = { render };
  if (typeof document !== 'undefined' && document.getElementById('bh-root')) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', standalone);
    else standalone();
  }
  if (typeof window !== 'undefined' && window.I18N) {
    const MOD = { uk: ['💬', 'Бульбашки', 'класова вечірка з QR'], en: ['💬', 'Boblejakt', 'class party with QR'], no: ['💬', 'Boblejakt', 'klassefest med QR'] };
    ['uk', 'en', 'no'].forEach(l => { const I = window.I18N[l]; if (!I) return; I.nav = Object.assign({}, I.nav, { hunt: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { hunt: MOD[l] }); });
  }
})();
