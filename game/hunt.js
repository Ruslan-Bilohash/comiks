/* Boblejakt — klasse-spill med QR: læreren viser emoji + norsk lyd, elevene trykker riktig boble.
   Kjøres fra /comiks/game/ eller i SPA som #/hunt. PeerJS som de andre klasserommene. */
(() => {
  'use strict';
  (function loadCss() {
    if (typeof document === 'undefined') return;
    if (document.querySelector('link[data-bh]')) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.setAttribute('data-bh', '1');
    const v = (window.KOMIKS_DATA || {}).version || '';
    l.href = (/\/game(\/|$)/.test(location.pathname) ? 'hunt.css' : 'game/hunt.css') + (v ? '?v=' + encodeURIComponent(v) : '');
    document.head.appendChild(l);
  })();
  const SITE = 'https://bilohash.com/comiks/';
  const PREFIX = 'komiks-lab-hunt-';
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const ROUND_SEC = 12;
  const TX = {
    uk: {
      title: '💬 Бульбашкове полювання', sub: 'Вчитель показує малюнок і каже норвезьке слово. Учні на телефонах тиснуть правильну бульбашку — хто швидше, той виграє.',
      host: '📺 Кімната для класу', join: '📱 Приєднатися', how: 'Відкрий на ТВ, покажи QR — телефони тиснуть бульбашки.',
      creating: 'Готуємо кімнату…', scan: 'Скануй QR або відкрий посилання:', code: 'Код', players: n => `Гравці: ${n}`, waiting: 'Чекаємо на гравців…',
      start: 'Старт ▶', close: 'Закрити', back: '← Назад', rounds: 'Раундів', play: 'Грати як',
      ask: 'Hva er dette?', listen: 'Слухай норвезькою', next: 'Далі ▶', results: '🏆 Результати', again: 'Ще раз',
      join_t: 'Приєднатися до полювання', name: 'Твоє ім’я', go: 'Увійти ▶', connecting: 'З’єднання…',
      wait: 'Чекай на вчителя…', locked: 'Відповідь прийнято', ok: 'Так!', bad: 'Ні…',
      err_code: 'Код — 5 символів.', err_name: 'Напиши ім’я.', err_room: 'Кімнату не знайдено.', err_net: 'Немає інтернету.',
      host_left: 'Кімнату закрито.', local: '⚠️ Сторінку відкрито з файлу — телефони не зайдуть.', you: 'ти',
      place: (r, n) => `Місце ${r} з ${n}`
    },
    en: {
      title: '💬 Bubble Hunt', sub: 'The teacher shows a picture and says the Norwegian word. Pupils tap the right bubble on their phones — fastest wins.',
      host: '📺 Class room', join: '📱 Join', how: 'Open on the TV, show the QR — phones tap the bubbles.',
      creating: 'Preparing the room…', scan: 'Scan the QR or open the link:', code: 'Code', players: n => `Players: ${n}`, waiting: 'Waiting for players…',
      start: 'Start ▶', close: 'Close', back: '← Back', rounds: 'Rounds', play: 'Play as',
      ask: 'Hva er dette?', listen: 'Listen in Norwegian', next: 'Next ▶', results: '🏆 Results', again: 'Play again',
      join_t: 'Join the hunt', name: 'Your name', go: 'Enter ▶', connecting: 'Connecting…',
      wait: 'Wait for the teacher…', locked: 'Answer in', ok: 'Yes!', bad: 'Nope…',
      err_code: 'The code is 5 characters.', err_name: 'Enter your name.', err_room: 'Room not found.', err_net: 'No internet.',
      host_left: 'The room was closed.', local: '⚠️ Opened from a file — phones cannot join.', you: 'you',
      place: (r, n) => `Place ${r} of ${n}`
    },
    no: {
      title: '💬 Boblejakt', sub: 'Læreren viser et bilde og sier det norske ordet. Elevene trykker riktig boble på mobilen — den raskeste vinner.',
      host: '📺 Klasserom', join: '📱 Bli med', how: 'Åpne på TV, vis QR — telefonene trykker på boblene.',
      creating: 'Lager rommet…', scan: 'Skann QR-koden eller åpne lenken:', code: 'Kode', players: n => `Spillere: ${n}`, waiting: 'Venter på spillere…',
      start: 'Start ▶', close: 'Lukk', back: '← Tilbake', rounds: 'Runder', play: 'Spill som',
      ask: 'Hva er dette?', listen: 'Lytt på norsk', next: 'Neste ▶', results: '🏆 Resultater', again: 'En gang til',
      join_t: 'Bli med i jakten', name: 'Navnet ditt', go: 'Gå inn ▶', connecting: 'Kobler til…',
      wait: 'Vent på læreren…', locked: 'Svar sendt', ok: 'Ja!', bad: 'Nei…',
      err_code: 'Koden er 5 tegn.', err_name: 'Skriv navnet ditt.', err_room: 'Fant ikke rommet.', err_net: 'Ingen nett.',
      host_left: 'Rommet er stengt.', local: '⚠️ Siden er åpnet fra en fil — mobiler kommer ikke inn.', you: 'deg',
      place: (r, n) => `Plass ${r} av ${n}`
    }
  };
  const ui = () => {
    const k = (window.KomiksCore && window.KomiksCore.ui) || document.documentElement.lang || 'no';
    return TX[k] ? k : (k === 'nb' ? 'no' : 'no');
  };
  const tx = (key, ...a) => {
    const t = TX[ui()] || TX.no;
    const v = t[key] != null ? t[key] : TX.no[key];
    return typeof v === 'function' ? v(...a) : v;
  };
  const h = (tag, attrs, ...kids) => {
    if (window.KomiksCore && window.KomiksCore.h) return window.KomiksCore.h(tag, attrs, ...kids);
    const el = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'onclick') el.addEventListener('click', v);
      else if (k === 'onsubmit') el.addEventListener('submit', v);
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'innerHTML') el.innerHTML = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    kids.flat().forEach(c => { if (c == null || c === false) return; el.append(c.nodeType ? c : document.createTextNode(c)); });
    return el;
  };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : h('span', {}, String(code || '🙂').split('|')[0]));
  const genCode = () => Array.from({ length: 5 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  const gameUrl = () => {
    const here = location.href.split('#')[0].split('?')[0];
    if (/\/game\/?$/.test(here) || here.indexOf('/game/') >= 0) return here.replace(/\/?$/, '/');
    return SITE + 'game/';
  };
  const qrSvg = url => {
    try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch { return ''; }
  };
  function loadLibs() {
    const v = (window.KOMIKS_DATA || {}).version || '';
    const base = /\/game(\/|$)/.test(location.pathname) ? '../' : '';
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src + (v ? '?v=' + encodeURIComponent(v) : ''); s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
    return Promise.all([
      window.Peer ? null : load(base + 'assets/vendor/peerjs.min.js'),
      window.qrcode ? null : load(base + 'assets/vendor/qrcode.js')
    ]);
  }
  function speakNo(text) {
    if (window.KomiksCore && window.KomiksCore.Speech) return window.KomiksCore.Speech.speak(text, 'narrator');
    try {
      const AUDIO = window.AUDIO || {};
      const key = Object.keys(AUDIO).find(k => k.toLowerCase().indexOf(String(text).toLowerCase()) >= 0);
      if (key) {
        const a = new Audio((location.pathname.indexOf('/game') >= 0 ? '../' : '') + 'audio/' + AUDIO[key] + '.mp3');
        return a.play().catch(() => {});
      }
    } catch { /* ignore */ }
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'nb-NO'; u.rate = 0.92;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch { /* ignore */ }
  }
  function pool() {
    const out = [];
    const themes = (window.WORDS && window.WORDS.themes) || [];
    themes.forEach(th => (th.words || []).forEach(w => {
      if (w && w[0] && w[3]) out.push({ no: w[0], uk: w[1], en: w[2], emoji: w[3], theme: th.id });
    }));
    return out;
  }
  function makeRounds(n) {
    const all = pool();
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const sh = a => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
    const used = new Set();
    const rounds = [];
    for (let i = 0; i < n && used.size < all.length; i++) {
      let item = pick(all); let g = 0;
      while (used.has(item.no) && g++ < 40) item = pick(all);
      used.add(item.no);
      const same = all.filter(x => x.theme === item.theme && x.no !== item.no);
      const rest = all.filter(x => x.no !== item.no);
      const distract = sh((same.length >= 3 ? same : rest)).slice(0, 3).map(x => x.no);
      while (distract.length < 3) distract.push(pick(rest).no);
      rounds.push({ emoji: item.emoji, no: item.no, uk: item.uk, en: item.en, options: sh([item.no].concat(distract.slice(0, 3))) });
    }
    return rounds;
  }
  const myAvatar = () => (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊');
  let session = null;
  const endSession = () => { if (session) { try { session.destroy(); } catch { /* ignore */ } session = null; } };

  function mount(el) {
    document.body.classList.add('bh-live');
    const root = h('section', { class: 'bh-wrap' });
    const uiBox = h('div', {});
    root.append(h('a', { class: 'bh-exit', href: location.pathname.indexOf('/game') >= 0 ? '#/' : '#/hunt', onclick: () => endSession() }, '✕'), uiBox);
    el.replaceChildren(root);
    const watch = setInterval(() => { if (!root.isConnected) { clearInterval(watch); document.body.classList.remove('bh-live'); endSession(); } }, 400);
    return { root, ui: uiBox };
  }

  function menu(el) {
    const S = mount(el);
    S.ui.replaceChildren(h('div', { class: 'bh-hero' },
      h('div', { class: 'bh-bubbles' }, h('span', {}, '💬'), h('span', {}, '🫧'), h('span', {}, '🇳🇴')),
      h('h1', {}, tx('title')), h('p', {}, tx('sub')),
      h('div', { class: 'bh-row' },
        h('button', { class: 'bh-btn pri', type: 'button', onclick: () => host(el) }, tx('host')),
        h('button', { class: 'bh-btn yell', type: 'button', onclick: () => join(el, '') }, tx('join'))),
      h('p', {}, tx('how'))));
  }

  function host(el) {
    const S = mount(el);
    endSession();
    const R = { code: genCode(), players: new Map(), phase: 'creating', i: 0, rounds: [], want: 10 };
    session = R;
    const send = (p, m) => { if (p.conn && p.conn.open) try { p.conn.send(m); } catch { /* ignore */ } };
    const broadcast = m => R.players.forEach(p => send(p, m));
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: p.online, score: p.score || 0 }));
    R.destroy = () => { broadcast({ t: 'closed' }); setTimeout(() => { try { R.peer && R.peer.destroy(); } catch { /* ignore */ } }, 120); };
    const url = () => gameUrl() + '#/join/' + R.code;
    const draw = () => {
      if (!S.root.isConnected) return;
      if (R.phase === 'creating' || R.phase === 'error') {
        S.ui.replaceChildren(h('div', { class: 'bh-hero' }, h('h1', {}, tx('title')), h('p', {}, R.phase === 'error' ? tx('err_net') : tx('creating'))));
        return;
      }
      if (R.phase === 'lobby') {
        const pl = [...R.players.values()];
        S.ui.replaceChildren(h('div', { class: 'bh-lobby' },
          h('div', { class: 'bh-card' },
            h('h2', {}, tx('title')),
            (() => { const q = h('div', { class: 'bh-qr' }); q.innerHTML = qrSvg(url()); return q; })(),
            h('div', { class: 'bh-code' }, R.code),
            h('p', {}, tx('scan')),
            h('p', { class: 'bh-url' }, url()),
            location.protocol === 'file:' ? h('p', { class: 'bh-warn' }, tx('local')) : null),
          h('div', { class: 'bh-card' },
            h('p', {}, tx('rounds')),
            h('div', { class: 'bh-row' }, [8, 10, 12].map(n => h('button', { class: 'bh-btn' + (R.want === n ? ' yell' : ''), type: 'button', onclick: () => { R.want = n; draw(); } }, String(n)))),
            h('h3', {}, tx('players', pl.filter(p => p.online).length)),
            pl.length ? h('div', { class: 'bh-people' }, pl.map(p => h('div', { class: 'bh-p' + (p.online ? '' : ' off') }, AV(p.avatar, { size: 64 }), h('b', {}, p.name)))) : h('p', {}, tx('waiting')),
            h('div', { class: 'bh-row' },
              h('button', { class: 'bh-btn pri', type: 'button', disabled: !pl.some(p => p.online), onclick: start }, tx('start')),
              h('button', { class: 'bh-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close'))))));
        return;
      }
      if (R.phase === 'final') {
        const board = [...R.players.values()].sort((a, b) => (b.score || 0) - (a.score || 0));
        S.ui.replaceChildren(h('div', { class: 'bh-card bh-stage' },
          h('h2', {}, tx('results')),
          window.KomiksAvatars ? window.KomiksAvatars.podium(board.map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.score || 0 })), { fmt: v => v, show: true }) : scoreList(board),
          h('div', { class: 'bh-row' },
            h('button', { class: 'bh-btn pri', type: 'button', onclick: () => { R.phase = 'lobby'; R.players.forEach(p => { p.score = 0; p.ans = null; }); broadcast({ t: 'lobby', players: list(), reset: true }); draw(); } }, tx('again')),
            h('button', { class: 'bh-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close')))));
        return;
      }
      const q = R.rounds[R.i];
      const left = Math.max(0, Math.ceil((R.endsAt - Date.now()) / 1000));
      const board = [...R.players.values()].sort((a, b) => (b.score || 0) - (a.score || 0));
      S.ui.replaceChildren(
        h('div', { class: 'bh-top' }, h('b', {}, tx('title')), h('span', { class: 'bh-chip' }, (R.i + 1) + ' / ' + R.rounds.length), h('span', { class: 'bh-timer' + (left <= 3 ? ' hurry' : '') }, left + 's'), h('span', { class: 'bh-chip' }, R.code)),
        h('div', { class: 'bh-card bh-stage' },
          h('div', { class: 'bh-emoji' }, q.emoji),
          h('div', { class: 'bh-ask' }, tx('ask')),
          h('button', { class: 'bh-btn yell', type: 'button', onclick: () => speakNo(q.no) }, '🔊 ' + tx('listen')),
          R.phase === 'reveal' ? h('p', {}, h('b', {}, q.no)) : null,
          R.phase === 'reveal' ? h('button', { class: 'bh-btn pri', type: 'button', onclick: nextRound }, tx('next')) : null),
        h('div', { class: 'bh-card' }, scoreList(board, q)));
    };
    function scoreList(board, q) {
      return h('div', { class: 'bh-board' }, board.map((p, i) => h('div', { class: 'bh-row-sc' },
        h('span', {}, i + 1 + '.'), h('span', {}, p.name + (p.ans && q && R.phase === 'reveal' ? (p.ans === q.no ? ' ✓' : ' ✕') : '')), h('b', {}, String(p.score || 0)))));
    }
    function start() {
      R.rounds = makeRounds(R.want);
      R.i = 0;
      R.players.forEach(p => { p.score = 0; p.ans = null; p.at = 0; });
      sendRound();
    }
    function sendRound() {
      const q = R.rounds[R.i];
      if (!q) { finish(); return; }
      R.phase = 'play';
      R.started = Date.now();
      R.endsAt = R.started + ROUND_SEC * 1000;
      R.players.forEach(p => { p.ans = null; p.at = 0; });
      broadcast({ t: 'round', i: R.i, total: R.rounds.length, emoji: q.emoji, options: q.options, endsAt: R.endsAt });
      speakNo(q.no);
      draw();
      clearInterval(R.tick);
      R.tick = setInterval(() => {
        if (R.phase !== 'play') { clearInterval(R.tick); return; }
        draw();
        const online = [...R.players.values()].filter(p => p.online);
        if (Date.now() >= R.endsAt || (online.length && online.every(p => p.ans))) reveal();
      }, 200);
    }
    function reveal() {
      if (R.phase !== 'play') return;
      R.phase = 'reveal';
      clearInterval(R.tick);
      const q = R.rounds[R.i];
      broadcast({ t: 'reveal', i: R.i, answer: q.no, board: list() });
      draw();
    }
    function nextRound() {
      R.i += 1;
      if (R.i >= R.rounds.length) finish();
      else sendRound();
    }
    function finish() {
      R.phase = 'final';
      const board = list().sort((a, b) => b.score - a.score);
      broadcast({ t: 'end', board });
      if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'hunt-' + R.code, topic: tx('title'), total: R.rounds.length, board: board.map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.score, correct: 0, answered: R.rounds.length })) });
      if (window.KomiksCore) { window.KomiksCore.confetti(); window.KomiksCore.Sfx.win(); }
      draw();
    }
    const onMessage = (conn, m) => {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'hello') {
        const pid = String(m.pid || '').slice(0, 40); if (!pid) return;
        const p = Object.assign(R.players.get(pid) || { score: 0 }, { pid, name: String(m.name || '?').slice(0, 20), avatar: m.avatar || '🙂', conn, online: true });
        R.players.set(pid, p);
        send(p, { t: 'welcome' });
        broadcast({ t: 'lobby', players: list() });
        if (R.phase === 'play') {
          const q = R.rounds[R.i];
          send(p, { t: 'round', i: R.i, total: R.rounds.length, emoji: q.emoji, options: q.options, endsAt: R.endsAt });
        }
        draw();
      } else if (m.t === 'ans') {
        const p = [...R.players.values()].find(x => x.conn === conn);
        if (!p || R.phase !== 'play' || p.ans != null) return;
        const q = R.rounds[R.i];
        p.ans = String(m.pick || '');
        p.at = Date.now();
        if (p.ans === q.no) {
          const left = Math.max(0, R.endsAt - p.at);
          p.score = (p.score || 0) + Math.max(100, Math.round(1000 * left / (ROUND_SEC * 1000)));
        }
        draw();
      }
    };
    loadLibs().then(() => {
      const open = () => {
        R.peer = new window.Peer(PREFIX + R.code, { debug: 0 });
        R.peer.on('open', () => { R.phase = 'lobby'; draw(); });
        R.peer.on('error', err => {
          if (err.type === 'unavailable-id') { try { R.peer.destroy(); } catch { /* ignore */ } R.code = genCode(); open(); return; }
          if (R.phase === 'creating') { R.phase = 'error'; draw(); }
        });
        R.peer.on('connection', conn => {
          conn.on('data', m => onMessage(conn, m));
          conn.on('close', () => { for (const p of R.players.values()) if (p.conn === conn) p.online = false; broadcast({ t: 'lobby', players: list() }); draw(); });
        });
      };
      open();
    }).catch(() => { R.phase = 'error'; draw(); });
    draw();
  }

  function join(el, code) {
    const S = mount(el);
    endSession();
    let avatar = myAvatar();
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('comiks.gameProfile') || '{}'); } catch { /* ignore */ }
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: '5', value: (code || '').toUpperCase() });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: '20', value: saved.name || '' });
      const err = h('p', { class: 'bh-warn', hidden: true });
      S.ui.replaceChildren(h('form', { class: 'bh-card bh-form', onsubmit: e => {
        e.preventDefault();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.hidden = false; err.textContent = tx('err_code'); return; }
        if (!n) { err.hidden = false; err.textContent = tx('err_name'); return; }
        try { localStorage.setItem('comiks.gameProfile', JSON.stringify({ name: n, avatar })); } catch { /* ignore */ }
        connect(c, n);
      } }, h('h2', {}, tx('join_t')), h('label', {}, h('span', {}, tx('code')), codeIn), h('label', {}, h('span', {}, tx('name')), nameIn), err, h('button', { class: 'bh-btn pri', type: 'submit' }, tx('go'))));
    };
    const connect = (c, name) => {
      let pid;
      try { pid = sessionStorage.getItem('komiks.hunt.pid') || ('h' + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem('komiks.hunt.pid', pid); } catch { pid = 'h' + Math.random().toString(36).slice(2, 10); }
      const P = { phase: 'connecting' };
      session = P;
      P.destroy = () => { try { P.conn && P.conn.close(); } catch { /* ignore */ } try { P.peer && P.peer.destroy(); } catch { /* ignore */ } };
      const status = text => S.ui.replaceChildren(h('div', { class: 'bh-wait bh-card' }, AV(avatar, { size: 110, mood: 'cheer' }), h('b', {}, name), h('p', {}, text)));
      const send = m => { try { P.conn && P.conn.open && P.conn.send(m); } catch { /* ignore */ } };
      status('⏳ ' + tx('connecting'));
      loadLibs().then(() => {
        P.peer = new window.Peer({ debug: 0 });
        const guard = setTimeout(() => { if (P.phase === 'connecting') status(tx('err_room')); }, 15000);
        P.peer.on('open', () => {
          P.conn = P.peer.connect(PREFIX + c, { reliable: true });
          P.conn.on('open', () => { clearTimeout(guard); send({ t: 'hello', pid, name, avatar }); });
          P.conn.on('data', m => {
            if (!m || typeof m !== 'object') return;
            if (m.t === 'welcome' || (m.t === 'lobby' && m.reset)) { P.phase = 'lobby'; status(tx('wait')); }
            if (m.t === 'closed') { P.phase = 'end'; status(tx('host_left')); }
            if (m.t === 'round') {
              P.phase = 'play'; P.locked = false;
              const opts = h('div', { class: 'bh-opts' }, m.options.map((w, i) => h('button', { class: 'bh-opt c' + i, type: 'button', onclick: ev => {
                if (P.locked) return;
                P.locked = true;
                send({ t: 'ans', i: m.i, pick: w });
                ev.currentTarget.style.outline = '4px solid #141414';
                [...opts.children].forEach(b => { b.disabled = true; });
              } }, w)));
              S.ui.replaceChildren(h('div', { class: 'bh-card bh-stage' },
                h('div', { class: 'bh-emoji' }, m.emoji),
                h('div', { class: 'bh-ask' }, tx('ask')),
                opts));
            }
            if (m.t === 'reveal') {
              S.ui.querySelectorAll('.bh-opt').forEach(b => {
                if (b.textContent === m.answer) b.classList.add('ok');
                else if (b.style.outline) b.classList.add('bad');
              });
            }
            if (m.t === 'end') {
              const board = m.board || [];
              const me = board.find(p => p.pid === pid);
              S.ui.replaceChildren(h('div', { class: 'bh-card bh-stage' },
                h('h2', {}, tx('results')),
                window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: tx('you'), fmt: v => v, show: true }) : null,
                me ? h('p', {}, tx('place', board.indexOf(me) + 1, board.length) + ' · ' + (me.score || 0) + ' p') : null,
                h('a', { class: 'bh-btn', href: '#/' }, tx('back'))));
            }
          });
          P.conn.on('close', () => { if (P.phase !== 'end') status(tx('host_left')); });
        });
        P.peer.on('error', () => status(tx('err_room')));
      }).catch(() => status(tx('err_net')));
    };
    form();
  }

  function standalone() {
    const root = document.getElementById('bh-root');
    if (!root) return false;
    const go = () => {
      const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
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
    setTimeout(() => {
      if (id === 'host') host(box);
      else if (id === 'join') join(box, arg || '');
      else menu(box);
    }, 0);
    return box;
  }

  window.KomiksHunt = { render };
  if (typeof document !== 'undefined' && document.getElementById('bh-root')) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', standalone);
    else standalone();
  }
  if (window.I18N) {
    const MOD = { uk: ['💬', 'Бульбашки', 'полювання на норвезькі слова з QR'], en: ['💬', 'Bubble Hunt', 'Norwegian word hunt with QR'], no: ['💬', 'Boblejakt', 'ordjakt med QR-kode'] };
    ['uk', 'en', 'no'].forEach(l => { const I = window.I18N[l]; if (!I) return; I.nav = Object.assign({}, I.nav, { hunt: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { hunt: MOD[l] }); });
  }
})();
