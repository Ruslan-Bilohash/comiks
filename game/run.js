/* Skattejakt — løp og samle. Alene virker uten rom/PHP. Klasse via game/room.php. */
(() => {
  'use strict';
  if (typeof document !== 'undefined') (function () {
    if (document.querySelector('link[data-sj]')) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.setAttribute('data-sj', '1');
    const v = (window.KOMIKS_DATA && window.KOMIKS_DATA.version) || '1';
    l.href = (/\/game(\/|$)/.test(location.pathname) ? 'run.css' : 'game/run.css') + '?v=' + encodeURIComponent(v);
    document.head.appendChild(l);
  })();

  const SITE = 'https://bilohash.com/comiks/';
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const DUR = 60;
  const TX = {
    no: {
      tag: 'KLASSESPILL', title: 'Skattejakt', sub: 'Løp, samle epler og tall. Hver ting sies på norsk. Du kan spille alene!',
      solo: '🎮 Spill alene', host: '📺 Klasse med QR', join: '📱 Jeg har kode', how: 'Alene: trykk den grønne knappen. Klasse: læreren viser QR, elevene styrer på mobilen.',
      start: '🏁 Løp!', close: 'Tilbake', wait: 'Venter…', scan: 'Skann QR',
      join_t: 'Bli med', name: 'Navn', go: 'Inn ▶', code: 'Kode', menu: 'Meny',
      err_code: '5 tegn', err_name: 'Skriv navn', err_room: 'Fant ikke rommet', err_net: 'Ingen nett — spill alene i stedet',
      left: 'Venstre', mid: 'Midt', right: 'Høyre', last: 'Du tok',
      results: 'Resultat', again: 'Igjen!', you: 'deg', players: n => n + ' med',
      hint0: 'Bytt fil med de tre store knappene!'
    },
    uk: {
      tag: 'КЛАСОВА ГРА', title: 'Скарби', sub: 'Біжи, збирай яблука й числа. Кожна річ звучить норвезькою. Можна одному!',
      solo: '🎮 Грати одному', host: '📺 Клас з QR', join: '📱 Є код', how: 'Один: тисни зелену кнопку. Клас: учитель показує QR, діти керують на телефоні.',
      start: '🏁 Бігти!', close: 'Назад', wait: 'Чекаємо…', scan: 'Скануй QR',
      join_t: 'Зайти', name: 'Ім’я', go: 'Увійти ▶', code: 'Код', menu: 'Меню',
      err_code: '5 літер', err_name: 'Напиши ім’я', err_room: 'Немає кімнати', err_net: 'Немає мережі — грай одному',
      left: 'Ліворуч', mid: 'Центр', right: 'Праворуч', last: 'Взяв',
      results: 'Результат', again: 'Ще раз!', you: 'ти', players: n => n + ' гравців',
      hint0: 'Міняй доріжку трьома великими кнопками!'
    },
    en: {
      tag: 'CLASS GAME', title: 'Treasure Run', sub: 'Run, grab apples and numbers. Each pickup is spoken in Norwegian. Play alone too!',
      solo: '🎮 Play alone', host: '📺 Class QR', join: '📱 I have a code', how: 'Solo: tap the green button. Class: teacher shows QR, kids steer on the phone.',
      start: '🏁 Run!', close: 'Back', wait: 'Waiting…', scan: 'Scan QR',
      join_t: 'Join', name: 'Name', go: 'Go ▶', code: 'Code', menu: 'Menu',
      err_code: '5 chars', err_name: 'Type a name', err_room: 'Room not found', err_net: 'No network — play alone instead',
      left: 'Left', mid: 'Mid', right: 'Right', last: 'You got',
      results: 'Results', again: 'Again!', you: 'you', players: n => n + ' in',
      hint0: 'Switch lanes with the three big buttons!'
    }
  };
  const lang = () => {
    const k = (window.KomiksCore && window.KomiksCore.ui) || (typeof document !== 'undefined' && document.documentElement.lang) || 'no';
    return TX[k] ? k : (k === 'nb' ? 'no' : 'no');
  };
  const tx = (k, ...a) => {
    const t = TX[lang()] || TX.no;
    const v = t[k] != null ? t[k] : TX.en[k];
    return typeof v === 'function' ? v(...a) : v;
  };
  const h = (tag, attrs, ...kids) => {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
    kids.flat(Infinity).forEach(c => { if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c))); });
    return el;
  };
  function AV(code, o) {
    try { if (window.KomiksAvatars) return window.KomiksAvatars.el(code || '🦊', o || { size: 48 }); } catch (e) { /* ignore */ }
    const s = h('span', { class: 'sj-emo' }, String(code || '🦊').split('|')[0]);
    s.style.fontSize = ((o && o.size) || 48) / 2 + 'px';
    return s;
  }
  const genCode = () => Array.from({ length: 5 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  const inGame = () => /\/game(\/|$)/.test(location.pathname);
  const api = () => (inGame() ? 'room.php' : 'game/room.php');
  const gameUrl = () => SITE + 'game/';
  const post = body => fetch(api(), { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) })
    .then(r => r.json().catch(() => ({ ok: false }))).catch(() => ({ ok: false, error: 'net' }));
  const getJSON = url => fetch(url, { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);
  const qrSvg = url => {
    try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 7, margin: 1, scalable: true }); } catch (e) { return ''; }
  };

  let actx = null, mus = null, session = null;
  const ac = () => { if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); return actx; };
  function beep(f, d, type, vol) {
    try {
      const c = ac(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.1, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + 0.03);
    } catch (e) { /* ignore */ }
  }
  const sfx = {
    grab: () => { beep(720, 0.07); setTimeout(() => beep(1080, 0.1, 'triangle', 0.1), 40); },
    go: () => { beep(392, 0.1); setTimeout(() => beep(784, 0.18, 'triangle', 0.12), 120); },
    win: () => [523, 659, 784].forEach((f, i) => setTimeout(() => beep(f, 0.16, 'triangle', 0.12), i * 90))
  };
  function music(on) {
    clearInterval(mus); mus = null;
    if (!on) return;
    const n = [60, 64, 67, 64, 72, 67]; let i = 0;
    mus = setInterval(() => {
      if (document.hidden) return;
      beep(440 * Math.pow(2, (n[i % n.length] - 69) / 12), 0.14, 'triangle', 0.03);
      i++;
    }, 210);
  }
  function speakNo(text) {
    try {
      if (window.KomiksCore && window.KomiksCore.Speech) { window.KomiksCore.Speech.speak(text, 'narrator'); return; }
      const u = new SpeechSynthesisUtterance(text); u.lang = 'nb-NO'; u.rate = 0.95;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  function bag() {
    const out = [];
    try {
      ((window.WORDS && window.WORDS.themes) || []).forEach(th => (th.words || []).forEach(w => {
        if (w && w[0] && w[3]) out.push({ no: w[0], emoji: w[3] });
      }));
    } catch (e) { /* ignore */ }
    ['null', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti'].forEach((no, n) => {
      out.push({ no, emoji: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][n], extra: true });
    });
    ['🍎', '🚲', '🍞', '🐟', '⭐', '🎈', '⚽', '🌻'].forEach((e, i) => {
      if (!out.some(x => x.emoji === e)) out.push({ no: ['et eple', 'en sykkel', 'brød', 'en fisk', 'en stjerne', 'en ballong', 'en ball', 'en blomst'][i], emoji: e });
    });
    return out.length ? out : [{ no: 'et eple', emoji: '🍎' }];
  }
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const HINTS = ['Bytt fil med knappene!', 'Se hva som kommer foran!', 'Tall gir to poeng!', 'Hør ordet når du tar det!', 'Bra! Fortsett å løpe!'];
  const AVATAR = () => { try { return window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊'; } catch (e) { return '🦊'; } };
  const youName = () => (lang() === 'uk' ? 'Ти' : lang() === 'en' ? 'You' : 'Du');
  const endSession = () => {
    if (!session) return;
    session.dead = true;
    if (session.sim) clearInterval(session.sim);
    if (session.tick) clearTimeout(session.tick);
    if (session.keys) window.removeEventListener('keydown', session.keys);
    music(false);
    session = null;
  };

  function mount(el) {
    document.body.classList.add('sj-live');
    const root = h('div', { class: 'sj-app' });
    const ui = h('div', { class: 'sj-ui' });
    root.append(ui);
    el.replaceChildren(root);
    const w = setInterval(() => {
      if (root.isConnected) return;
      clearInterval(w);
      if (session && session.mountRoot === root) endSession();
      if (!document.querySelector('.sj-app')) document.body.classList.remove('sj-live');
    }, 500);
    return { root, ui, host: el };
  }

  function menu(el) {
    const S = mount(el);
    music(true);
    S.ui.replaceChildren(h('div', { class: 'sj-splash' },
      h('p', { class: 'sj-kicker' }, tx('tag')),
      h('h1', {}, tx('title')),
      h('p', { class: 'sj-sub' }, tx('sub')),
      h('div', { class: 'sj-row' },
        h('button', { class: 'sj-btn go big', type: 'button', onclick: () => { try { ac(); } catch (e) {} sfx.go(); playSolo(el); } }, tx('solo')),
        h('button', { class: 'sj-btn pri big', type: 'button', onclick: () => { try { ac(); } catch (e) {} host(el); } }, tx('host'))),
      h('div', { class: 'sj-row' },
        h('button', { class: 'sj-btn', type: 'button', onclick: () => join(el, '') }, tx('join')),
        h('a', { class: 'sj-btn', href: '/comiks/#/hunt' }, '💬 Boblejakt')),
      h('p', {}, tx('how'))));
  }

  function addMe(R, name) {
    const me = { pid: 'me', name: name || youName(), avatar: AVATAR(), lane: 1, score: 0, last: '', local: true };
    R.players.set('me', me);
    return me;
  }
  function addBots(R) {
    [['Pia', '🦊'], ['Nils', '🐻']].forEach(([name, avatar], i) => {
      R.players.set('bot' + i, { pid: 'bot' + i, name, avatar, lane: i === 0 ? 0 : 2, score: 0, last: '', bot: true });
    });
  }

  function playWorld(S, R) {
    const stuff = bag();
    if (R.sim) { clearInterval(R.sim); R.sim = null; }
    R.phase = 'play';
    R.dead = false;
    R.x = 0;
    R.t0 = Date.now();
    R.items = [];
    R.hint = tx('hint0');
    R.lastWord = '';
    R.players.forEach(p => { p.score = 0; p.last = ''; if (!p.bot && p.local) p.lane = 1; });
    let nid = 1;
    const timerEl = h('span', { class: 'sj-timer' }, DUR + 's');
    const hintTxt = h('span', {}, R.hint);
    const hintEl = h('div', { class: 'sj-hint' }, h('b', {}, 'Pia-AI: '), hintTxt);
    const wordEl = h('div', { class: 'sj-word' }, '…');
    const scoreEl = h('div', { class: 'sj-board' });
    const lanes = [0, 1, 2].map(() => h('div', { class: 'sj-lane' }));
    const world = h('div', { class: 'sj-world' }, h('div', { class: 'sj-hills' }), h('div', { class: 'sj-lanes' }, ...lanes));
    const me = R.players.get('me');
    const pads = h('div', { class: 'sj-pads' },
      h('button', { class: 'sj-pad', type: 'button' }, '◀ ' + tx('left')),
      h('button', { class: 'sj-pad on', type: 'button' }, '● ' + tx('mid')),
      h('button', { class: 'sj-pad', type: 'button' }, tx('right') + ' ▶'));
    function setLane(n) {
      if (!me || R.dead || R.phase !== 'play') return;
      me.lane = Math.max(0, Math.min(2, n));
      [...pads.children].forEach((b, i) => b.classList.toggle('on', i === me.lane));
      placeRunners();
    }
    [...pads.children].forEach((b, i) => b.addEventListener('click', () => setLane(i)));
    if (R.keys) window.removeEventListener('keydown', R.keys);
    R.keys = e => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { e.preventDefault(); setLane(me.lane - 1); }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { e.preventDefault(); setLane(me.lane + 1); }
    };
    window.addEventListener('keydown', R.keys);
    const backTo = S.host || S.root.parentNode || S.root;
    S.ui.replaceChildren(
      h('div', { class: 'sj-hud' },
        h('span', { class: 'sj-kicker' }, tx('title')),
        timerEl,
        R.code ? h('span', { class: 'sj-code' }, R.code) : h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(backTo); } }, tx('menu'))),
      hintEl, world, wordEl, pads, scoreEl
    );
    function spawn(dist) {
      if (R.items.length > 18) return;
      const w = pick(stuff);
      const it = {
        id: nid++, lane: Math.floor(Math.random() * 3),
        x: R.x + (dist != null ? dist : (420 + Math.random() * 280)),
        emoji: w.emoji, no: w.no, extra: !!w.extra,
        el: h('div', { class: 'sj-item' }, w.emoji)
      };
      lanes[it.lane].append(it.el);
      R.items.push(it);
    }
    function placeRunners() {
      const keys = [...R.players.keys()];
      R.players.forEach(p => {
        if (!p.el) {
          p.el = h('div', { class: 'sj-runner' + (p.local ? ' me' : '') });
          p.el.append(AV(p.avatar, { size: 56, mood: 'cheer' }));
        }
        if (p.el.parentNode !== lanes[p.lane]) lanes[p.lane].append(p.el);
        p.el.style.left = (12 + (keys.indexOf(p.pid) * 7)) + '%';
      });
    }
    function board() {
      const arr = [...R.players.values()].sort((a, b) => b.score - a.score);
      scoreEl.replaceChildren(...arr.map((p, i) => h('div', { class: 'sj-row-sc' + (i === 0 ? ' lead' : '') },
        AV(p.avatar, { size: 28 }), h('b', {}, p.name), h('em', {}, String(p.score)), h('small', {}, p.last || ''))));
    }
    function grab(p, it) {
      it.gone = true;
      it.el.classList.add('sj-pop');
      setTimeout(() => { try { it.el.remove(); } catch (e) { /* ignore */ } }, 280);
      p.score += it.extra ? 2 : 1;
      p.last = it.no;
      R.lastWord = it.no;
      if (p.local) {
        wordEl.textContent = tx('last') + ': ' + it.no;
        hintTxt.textContent = ' Ja! ' + it.no + '!';
        sfx.grab();
        speakNo(it.no);
      }
      board();
    }
    spawn(160); spawn(280); spawn(400);
    placeRunners();
    board();
    music(true);
    sfx.go();
    speakNo('Vi løper! Samle ting!');
    R.sim = setInterval(() => {
      if (R.dead || R.phase !== 'play') { clearInterval(R.sim); R.sim = null; return; }
      R.x += 10;
      const left = Math.max(0, DUR - (Date.now() - R.t0) / 1000);
      timerEl.textContent = Math.ceil(left) + 's';
      if (Math.random() < 0.28) spawn();
      R.players.forEach(p => {
        if (!p.bot) return;
        if (Math.random() < 0.12) {
          const ahead = R.items.filter(it => !it.gone && (it.x - R.x) > 40 && (it.x - R.x) < 360);
          if (ahead.length) p.lane = ahead.sort((a, b) => a.x - b.x)[0].lane;
          else p.lane = Math.floor(Math.random() * 3);
        }
      });
      placeRunners();
      R.items.forEach(it => {
        const pct = (it.x - R.x) / 6.4;
        it.el.style.left = pct + '%';
        if (pct < -12) { it.gone = true; it.el.remove(); }
      });
      R.players.forEach(p => {
        R.items.forEach(it => {
          if (it.gone || it.lane !== p.lane) return;
          const pct = (it.x - R.x) / 6.4;
          if (pct > 2 && pct < 28) grab(p, it);
        });
      });
      R.items = R.items.filter(it => !it.gone);
      if (Math.random() < 0.03) hintTxt.textContent = ' ' + pick(HINTS);
      if (left <= 0) {
        R.phase = 'final';
        clearInterval(R.sim); R.sim = null;
        if (R.keys) { window.removeEventListener('keydown', R.keys); R.keys = null; }
        music(false);
        sfx.win();
        speakNo('Ferdig! Bra jobba!');
        const arr = [...R.players.values()].sort((a, b) => b.score - a.score);
        try {
          if (window.KomiksExtras) window.KomiksExtras.saveGame({
            id: 'run-' + (R.code || 'solo'), topic: tx('title'), total: arr[0] ? arr[0].score : 0,
            board: arr.map(p => ({ name: p.name, avatar: p.avatar, score: p.score }))
          });
        } catch (e) { /* ignore */ }
        S.ui.replaceChildren(h('div', { class: 'sj-card sj-final' },
          h('h2', {}, tx('results')),
          arr.map((p, i) => h('div', { class: 'sj-row-sc' + (i === 0 ? ' lead' : '') }, AV(p.avatar, { size: 40 }), h('b', {}, (i + 1) + '. ' + p.name), h('em', {}, p.score + ' ⭐'))),
          h('div', { class: 'sj-row' },
            h('button', { class: 'sj-btn go big', type: 'button', onclick: () => playSolo(backTo) }, tx('again')),
            h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(backTo); } }, tx('close')))));
      }
    }, 70);
  }

  function playSolo(el) {
    endSession();
    const S = mount(el);
    const R = { players: new Map(), phase: 'play', dead: false, mountRoot: S.root };
    session = R;
    addMe(R, youName());
    addBots(R);
    playWorld(S, R);
  }

  function host(el) {
    endSession();
    const S = mount(el);
    const R = { code: genCode(), token: '', players: new Map(), phase: 'lobby', after: 0, dead: false, mountRoot: S.root };
    session = R;
    addMe(R, youName());
    const url = gameUrl() + '#/run/join/' + R.code;
    const showLobby = (note) => {
      if (R.dead || R.phase !== 'lobby') return;
      const qr = h('div', { class: 'sj-qr' });
      qr.innerHTML = qrSvg(url);
      const pl = [...R.players.values()];
      S.ui.replaceChildren(h('div', { class: 'sj-host' },
        h('div', { class: 'sj-card' }, h('p', { class: 'sj-kicker' }, tx('scan')), qr, h('div', { class: 'sj-code' }, R.code), h('p', { class: 'sj-url' }, url)),
        h('div', { class: 'sj-card' },
          h('h2', {}, tx('title')),
          note ? h('p', { class: 'sj-warn' }, note) : null,
          h('h3', {}, tx('players', pl.length)),
          h('div', { class: 'sj-people' }, pl.map(p => h('div', { class: 'sj-p' }, AV(p.avatar, { size: 56 }), h('b', {}, p.name)))),
          h('p', {}, tx('how')),
          h('div', { class: 'sj-row' },
            h('button', { class: 'sj-btn go big', type: 'button', onclick: () => { try { ac(); } catch (e) {} playWorld(S, R); } }, tx('start')),
            h('button', { class: 'sj-btn', type: 'button', onclick: () => playSolo(el) }, tx('solo')),
            h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close'))))));
    };
    showLobby();
    music(true);
    post({ action: 'open', code: R.code }).then(j => {
      if (!j || !j.ok) { showLobby(tx('err_net')); return; }
      R.token = j.token;
      const loop = async () => {
        if (R.dead) return;
        const ev = await getJSON(api() + '?action=events&code=' + encodeURIComponent(R.code) + '&token=' + encodeURIComponent(R.token) + '&after=' + R.after);
        if (ev && ev.ok) {
          (ev.msgs || []).forEach(m => {
            if (!m) return;
            if (m.t === 'hello') {
              R.players.set(m.pid, { pid: m.pid, name: m.name || '?', avatar: m.avatar || '🦊', lane: 1, score: 0, last: '' });
              if (R.phase === 'lobby') showLobby();
            } else if ((m.t === 'lane' || m.t === 'move') && R.players.get(m.pid)) {
              const lane = parseInt(m.lane, 10);
              if (!isNaN(lane)) R.players.get(m.pid).lane = Math.max(0, Math.min(2, lane));
            }
          });
          R.after = ev.after || R.after;
        }
        if (R.token) {
          await post({
            action: 'state', code: R.code, token: R.token,
            state: {
              kind: 'run', phase: R.phase,
              left: R.t0 ? Math.max(0, DUR - (Date.now() - R.t0) / 1000) : DUR,
              hint: R.hint || '', lastWord: R.lastWord || '',
              players: [...R.players.values()].filter(p => !p.bot).map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, lane: p.lane, score: p.score, last: p.last }))
            }
          });
        }
        R.tick = setTimeout(loop, 300);
      };
      loop();
    });
  }

  function join(el, code) {
    endSession();
    const S = mount(el);
    let avatar = AVATAR(), saved = {};
    try { saved = JSON.parse(localStorage.getItem('comiks.gameProfile') || '{}'); } catch (e) { /* ignore */ }
    const codeIn = h('input', { type: 'text', maxlength: '5', value: (code || '').toUpperCase(), autocomplete: 'off' });
    codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
    const nameIn = h('input', { type: 'text', maxlength: '20', value: saved.name || '' });
    const err = h('p', { class: 'sj-warn', hidden: true });
    const form = h('form', { class: 'sj-card sj-join' },
      h('h2', {}, tx('join_t')),
      h('label', {}, h('span', {}, tx('code')), codeIn),
      h('label', {}, h('span', {}, tx('name')), nameIn),
      err,
      h('button', { class: 'sj-btn go big', type: 'submit' }, tx('go')),
      h('button', { class: 'sj-btn', type: 'button', onclick: () => playSolo(el) }, tx('solo')));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const c = codeIn.value.trim(), n = nameIn.value.trim();
      if (c.length !== 5) { err.hidden = false; err.textContent = tx('err_code'); return; }
      if (!n) { err.hidden = false; err.textContent = tx('err_name'); return; }
      try { localStorage.setItem('comiks.gameProfile', JSON.stringify({ name: n, avatar })); } catch (err2) { /* ignore */ }
      enter(c, n);
    });
    S.ui.replaceChildren(form);
    const enter = (c, name) => {
      let pid;
      try { pid = sessionStorage.getItem('komiks.run.pid') || ('r' + Math.random().toString(36).slice(2, 8)); sessionStorage.setItem('komiks.run.pid', pid); } catch (e) { pid = 'r' + Math.random().toString(36).slice(2, 8); }
      const P = { dead: false, lane: 1, mountRoot: S.root };
      session = P;
      const send = msg => post({ action: 'event', code: c, pid, msg });
      const status = t => S.ui.replaceChildren(h('div', { class: 'sj-card sj-phone' }, AV(avatar, { size: 90 }), h('b', {}, name), h('p', {}, t), h('button', { class: 'sj-btn go', type: 'button', onclick: () => playSolo(el) }, tx('solo'))));
      status(tx('wait'));
      send({ t: 'hello', name, avatar }).then(j => {
        if (!j || !j.ok) { status(tx('err_room')); return; }
        const setLane = n => { P.lane = n; send({ t: 'lane', lane: n }); };
        const loop = async () => {
          if (P.dead) return;
          const st = await getJSON(api() + '?action=state&code=' + encodeURIComponent(c));
          if (!st || !st.ok) { P.tick = setTimeout(loop, 700); return; }
          const s = st.state || {};
          const mep = (s.players || []).find(p => p.pid === pid);
          if (s.phase === 'play') {
            const last = (mep && mep.last) || '';
            if (last && last !== P.said) { P.said = last; speakNo(last); sfx.grab(); }
            S.ui.replaceChildren(h('div', { class: 'sj-phone' },
              h('div', { class: 'sj-timer' }, Math.ceil(s.left || 0) + 's'),
              AV(avatar, { size: 80, mood: 'cheer' }),
              h('div', { class: 'sj-word' }, last ? tx('last') + ': ' + last : '…'),
              h('p', {}, s.hint || ''),
              h('div', { class: 'sj-pads' },
                h('button', { class: 'sj-pad' + (P.lane === 0 ? ' on' : ''), type: 'button', onclick: () => setLane(0) }, '◀'),
                h('button', { class: 'sj-pad' + (P.lane === 1 ? ' on' : ''), type: 'button', onclick: () => setLane(1) }, '●'),
                h('button', { class: 'sj-pad' + (P.lane === 2 ? ' on' : ''), type: 'button', onclick: () => setLane(2) }, '▶'))));
          } else if (s.phase === 'final') {
            P.dead = true; sfx.win();
            const board = (s.players || []).slice().sort((a, b) => b.score - a.score);
            S.ui.replaceChildren(h('div', { class: 'sj-card sj-final' }, h('h2', {}, tx('results')),
              board.map((p, i) => h('div', { class: 'sj-row-sc' }, h('b', {}, (i + 1) + '. ' + p.name), h('em', {}, p.score))),
              h('button', { class: 'sj-btn go', type: 'button', onclick: () => playSolo(el) }, tx('solo')),
              h('button', { class: 'sj-btn', type: 'button', onclick: () => { endSession(); menu(el); } }, tx('close'))));
            return;
          }
          send({ t: 'ping' });
          P.tick = setTimeout(loop, 350);
        };
        loop();
      });
    };
  }

  function standalone() {
    const root = document.getElementById('sj-root');
    if (!root) return;
    let cur = 'init';
    const go = () => {
      const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
      const key = parts.join('/');
      if (key === cur) return;
      cur = key;
      if (parts[0] === 'run' && parts[1] === 'join') join(root, parts[2] || '');
      else if (parts[0] === 'join') join(root, parts[1] || '');
      else if (parts[0] === 'host') host(root);
      else if (parts[0] === 'solo') playSolo(root);
      else menu(root);
    };
    window.addEventListener('hashchange', go);
    go();
  }
  function render(id, arg) {
    const box = document.createElement('div');
    if (id === 'host') host(box);
    else if (id === 'join') join(box, arg || '');
    else if (id === 'solo') playSolo(box);
    else menu(box);
    return box;
  }
  window.KomiksRun = { render };
  if (typeof document !== 'undefined' && document.getElementById('sj-root')) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', standalone);
    else standalone();
  }
  if (window.I18N) {
    const MOD = { uk: ['🏃', 'Скарби', 'біжи і збирай слова'], en: ['🏃', 'Treasure Run', 'run and collect words'], no: ['🏃', 'Skattejakt', 'løp og samle ord'] };
    ['uk', 'en', 'no'].forEach(l => { const I = window.I18N[l]; if (!I) return; I.nav = Object.assign({}, I.nav, { run: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { run: MOD[l] }); });
  }
})();
