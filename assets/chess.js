/* Комікс·Lab — ♟ Sjakk: шахи з 3D-фігурами, ботами, рейтингом Ело, грою на одному пристрої, онлайн із другом
   і турніром для класу (монітор із QR-кодом, пари по раундах, шахові годинники). Нотація й озвучка — норвезькою:
   K konge, D dronning, T tårn, L løper, S springer, bonde. Маршрути: #/chess, #/chess/bot/<КОД>, #/chess/local,
   #/chess/room (з другом), #/chess/host (клас), #/chess/join/<КОД>. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;

  /* ================= рушій (без DOM: той самий код працює у Web Worker) ================= */
  function engine() {
    const FILES = 'abcdefgh';
    const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    const KG = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]], ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const col = p => (p ? (p === p.toUpperCase() ? 'w' : 'b') : null);
    const up = p => p.toUpperCase();
    const at = (r, f) => (r >= 0 && r < 8 && f >= 0 && f < 8 ? r * 8 + f : -1);
    const sqName = i => FILES[i % 8] + (8 - (i >> 3));
    const sqIdx = s => (8 - Number(s[1])) * 8 + FILES.indexOf(s[0]);
    const START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    function fromFEN(fen) {
      const [pos, t, c, ep, hm, fm] = String(fen || START).trim().split(/\s+/);
      const b = [];
      for (const ch of pos.replace(/\//g, '')) { if (/\d/.test(ch)) for (let i = 0; i < +ch; i++) b.push(''); else b.push(ch); }
      if (b.length !== 64) throw new Error('fen');
      return { b, t: t === 'b' ? 'b' : 'w', c: c && c !== '-' ? c : '', ep: ep && ep !== '-' ? sqIdx(ep) : -1, hm: +hm || 0, fm: +fm || 1 };
    }
    function toFEN(st) {
      const rows = [];
      for (let r = 0; r < 8; r++) { let s = '', e = 0; for (let f = 0; f < 8; f++) { const p = st.b[r * 8 + f]; if (!p) e++; else { if (e) { s += e; e = 0; } s += p; } } if (e) s += e; rows.push(s); }
      return `${rows.join('/')} ${st.t} ${st.c || '-'} ${st.ep >= 0 ? sqName(st.ep) : '-'} ${st.hm} ${st.fm}`;
    }
    const posKey = st => toFEN(st).split(' ').slice(0, 4).join(' ');
    // чи атакує сторона `by` клітинку sq
    function attacked(b, sq, by) {
      const r = sq >> 3, f = sq % 8;
      const pr = by === 'w' ? r + 1 : r - 1, pawn = by === 'w' ? 'P' : 'p';
      for (const df of [-1, 1]) { const i = at(pr, f + df); if (i >= 0 && b[i] === pawn) return true; }
      const kn = by === 'w' ? 'N' : 'n', kg = by === 'w' ? 'K' : 'k';
      for (const [dr, df] of KN) { const i = at(r + dr, f + df); if (i >= 0 && b[i] === kn) return true; }
      for (const [dr, df] of KG) { const i = at(r + dr, f + df); if (i >= 0 && b[i] === kg) return true; }
      const slide = (dirs, set) => { for (const [dr, df] of dirs) { let rr = r + dr, ff = f + df; while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const p = b[rr * 8 + ff]; if (p) { if (col(p) === by && set.includes(up(p))) return true; break; } rr += dr; ff += df; } } return false; };
      return slide(DIAG, ['B', 'Q']) || slide(ORTH, ['R', 'Q']);
    }
    const kingSq = (b, c) => b.indexOf(c === 'w' ? 'K' : 'k');
    const inCheck = st => { const k = kingSq(st.b, st.t); return k >= 0 && attacked(st.b, k, st.t === 'w' ? 'b' : 'w'); };
    function pseudo(st) {
      const out = [], b = st.b, me = st.t, them = me === 'w' ? 'b' : 'w';
      const add = (f, to, extra) => out.push(Object.assign({ f, to, p: b[f], cap: b[to] || '' }, extra));
      for (let i = 0; i < 64; i++) {
        const p = b[i]; if (!p || col(p) !== me) continue;
        const r = i >> 3, f = i % 8, P = up(p);
        if (P === 'P') {
          const dir = me === 'w' ? -1 : 1, startR = me === 'w' ? 6 : 1, lastR = me === 'w' ? 0 : 7;
          const push = (to, extra) => { if ((to >> 3) === lastR) for (const pr of ['Q', 'R', 'B', 'N']) add(i, to, Object.assign({ promo: me === 'w' ? pr : pr.toLowerCase() }, extra)); else add(i, to, extra); };
          const one = at(r + dir, f);
          if (one >= 0 && !b[one]) { push(one); const two = at(r + 2 * dir, f); if (r === startR && !b[two]) add(i, two, { dbl: true }); }
          for (const df of [-1, 1]) { const to = at(r + dir, f + df); if (to < 0) continue; if (b[to] && col(b[to]) === them) push(to); else if (to === st.ep) add(i, to, { ep: true, cap: me === 'w' ? 'p' : 'P' }); }
        } else if (P === 'N' || P === 'K') {
          for (const [dr, df] of (P === 'N' ? KN : KG)) { const to = at(r + dr, f + df); if (to >= 0 && col(b[to]) !== me) add(i, to); }
          if (P === 'K') {
            const home = me === 'w' ? 60 : 4, [kc, qc] = me === 'w' ? ['K', 'Q'] : ['k', 'q'];
            if (i === home && !attacked(b, home, them)) {
              if (st.c.includes(kc) && !b[home + 1] && !b[home + 2] && b[home + 3] === (me === 'w' ? 'R' : 'r') && !attacked(b, home + 1, them) && !attacked(b, home + 2, them)) add(i, home + 2, { castle: 'K' });
              if (st.c.includes(qc) && !b[home - 1] && !b[home - 2] && !b[home - 3] && b[home - 4] === (me === 'w' ? 'R' : 'r') && !attacked(b, home - 1, them) && !attacked(b, home - 2, them)) add(i, home - 2, { castle: 'Q' });
            }
          }
        } else {
          const dirs = P === 'B' ? DIAG : P === 'R' ? ORTH : DIAG.concat(ORTH);
          for (const [dr, df] of dirs) { let rr = r + dr, ff = f + df; while (rr >= 0 && rr < 8 && ff >= 0 && ff < 8) { const to = rr * 8 + ff; if (b[to]) { if (col(b[to]) === them) add(i, to); break; } add(i, to); rr += dr; ff += df; } }
        }
      }
      return out;
    }
    function make(st, m) {
      const b = st.b.slice(), me = st.t;
      b[m.to] = m.promo || b[m.f]; b[m.f] = '';
      if (m.ep) b[m.to + (me === 'w' ? 8 : -8)] = '';
      if (m.castle) { const home = me === 'w' ? 60 : 4; if (m.castle === 'K') { b[home + 1] = b[home + 3]; b[home + 3] = ''; } else { b[home - 1] = b[home - 4]; b[home - 4] = ''; } }
      let c = st.c;
      const strip = chars => { for (const ch of chars) c = c.replace(ch, ''); };
      if (m.p === 'K') strip('KQ'); if (m.p === 'k') strip('kq');
      for (const sq of [m.f, m.to]) { if (sq === 63) strip('K'); if (sq === 56) strip('Q'); if (sq === 7) strip('k'); if (sq === 0) strip('q'); }
      return { b, t: me === 'w' ? 'b' : 'w', c, ep: m.dbl ? (m.f + m.to) / 2 : -1, hm: up(m.p) === 'P' || m.cap ? 0 : st.hm + 1, fm: st.fm + (me === 'b' ? 1 : 0) };
    }
    function legal(st) { return pseudo(st).filter(m => { const n = make(st, m); const k = kingSq(n.b, st.t); return k >= 0 && !attacked(n.b, k, n.t); }); }
    function insufficient(b) {
      const rest = b.filter(p => p && up(p) !== 'K');
      if (!rest.length) return true;
      return rest.length === 1 && ['B', 'N'].includes(up(rest[0]));
    }
    // стан партії: mate | stalemate | fifty | repetition | material | check | ok
    function status(st, keys) {
      const moves = legal(st), chk = inCheck(st);
      if (!moves.length) return chk ? 'mate' : 'stalemate';
      if (st.hm >= 100) return 'fifty';
      if (insufficient(st.b)) return 'material';
      if (keys && keys.length) { const k = posKey(st); if (keys.filter(x => x === k).length >= 3) return 'repetition'; }
      return chk ? 'check' : 'ok';
    }
    // норвезька нотація: K konge, D dronning, T tårn, L løper, S springer; пішак — без літери
    const NO = { K: 'K', Q: 'D', R: 'T', B: 'L', N: 'S', P: '' };
    function san(st, m) {
      if (m.castle) return m.castle === 'K' ? 'O-O' : 'O-O-O';
      const P = up(m.p); let s = NO[P];
      if (P !== 'P') {
        const others = legal(st).filter(x => x.to === m.to && x.p === m.p && x.f !== m.f);
        if (others.length) { const sameFile = others.some(x => x.f % 8 === m.f % 8), sameRank = others.some(x => (x.f >> 3) === (m.f >> 3)); s += !sameFile ? FILES[m.f % 8] : !sameRank ? String(8 - (m.f >> 3)) : sqName(m.f); }
      }
      if (m.cap) s += (P === 'P' ? FILES[m.f % 8] : '') + 'x';
      s += sqName(m.to);
      if (m.promo) s += '=' + NO[up(m.promo)];
      const n = make(st, m), stt = status(n);
      return s + (stt === 'mate' ? '#' : stt === 'check' ? '+' : '');
    }
    /* ---- штучний інтелект: негамакс з альфа-бета, тихий пошук по взяттях, таблиці позицій ---- */
    const VAL = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };
    function pst(P, r, f, white) {
      const rr = white ? r : 7 - r, cent = (3.5 - Math.abs(f - 3.5)) + (3.5 - Math.abs(rr - 3.5));
      if (P === 'P') return (6 - rr) * 9 + (f >= 2 && f <= 5 ? (6 - rr) * 2 : 0);
      if (P === 'N') return cent * 7 - 18;
      if (P === 'B') return cent * 4;
      if (P === 'R') return rr === 1 ? 18 : 0;
      if (P === 'Q') return cent * 2;
      if (P === 'K') return rr === 7 ? (f === 6 || f === 2 ? 25 : 8) : -12 * (7 - rr);
      return 0;
    }
    function evaluate(st) { // з точки зору сторони, що ходить
      let s = 0;
      for (let i = 0; i < 64; i++) { const p = st.b[i]; if (!p) continue; const w = p === up(p), P = up(p); const v = VAL[P] + pst(P, i >> 3, i % 8, w); s += w ? v : -v; }
      return st.t === 'w' ? s : -s;
    }
    const orderScore = m => (m.cap ? 10 * VAL[up(m.cap)] - VAL[up(m.p)] : 0) + (m.promo ? 800 : 0);
    const sortMoves = ms => ms.sort((a, b) => orderScore(b) - orderScore(a));
    let nodes = 0, deadline = 0, stop = false;
    function quiesce(st, alpha, beta, qd) {
      nodes++;
      const stand = evaluate(st);
      if (stand >= beta) return beta;
      if (alpha < stand) alpha = stand;
      if (qd <= 0) return alpha;
      for (const m of sortMoves(legal(st).filter(x => x.cap || x.promo))) {
        const sc = -quiesce(make(st, m), -beta, -alpha, qd - 1);
        if (sc >= beta) return beta;
        if (sc > alpha) alpha = sc;
      }
      return alpha;
    }
    function negamax(st, depth, alpha, beta, ply, useQ) {
      if ((++nodes & 1023) === 0 && deadline && Date.now() > deadline) stop = true;
      if (stop) return 0;
      const ms = legal(st);
      if (!ms.length) return inCheck(st) ? -100000 + ply : 0;
      if (st.hm >= 100) return 0;
      if (depth <= 0) return useQ ? quiesce(st, alpha, beta, 4) : evaluate(st);
      for (const m of sortMoves(ms)) {
        const sc = -negamax(make(st, m), depth - 1, -beta, -alpha, ply + 1, useQ);
        if (stop) return 0;
        if (sc >= beta) return beta;
        if (sc > alpha) alpha = sc;
      }
      return alpha;
    }
    // рівні: baby (майже випадково), easy, medium, hard, master (ітеративне поглиблення ~1,2 с)
    function best(st, level) {
      const ms = legal(st); if (!ms.length) return null;
      const rnd = n => Math.floor(Math.random() * n);
      if (level === 'baby') { const caps = ms.filter(m => m.cap); return caps.length && Math.random() < 0.6 ? caps[rnd(caps.length)] : ms[rnd(ms.length)]; }
      const cfg = { easy: [1, 70, false], medium: [2, 25, true], hard: [3, 8, true], master: [5, 0, true] }[level] || [2, 25, true];
      const [maxDepth, noise, useQ] = cfg;
      nodes = 0; stop = false; deadline = level === 'master' ? Date.now() + 1200 : level === 'hard' ? Date.now() + 2500 : 0;
      let bestMove = ms[0];
      for (let d = 1; d <= maxDepth; d++) {
        let alpha = -Infinity, cand = null, candScore = -Infinity;
        const ordered = sortMoves(ms.slice()); if (bestMove) ordered.sort((a, b) => (b === bestMove) - (a === bestMove));
        for (const m of ordered) {
          // з «шумом» (слабші рівні) рахуємо корінь із повним вікном: межі альфа-бета + шум перестрибували справжній мат
          const sc = -negamax(make(st, m), d - 1, -Infinity, noise ? Infinity : -alpha, 1, useQ) + (noise ? (Math.random() * 2 - 1) * noise : 0);
          if (stop) break;
          if (sc > candScore) { candScore = sc; cand = m; }
          if (sc > alpha) alpha = sc;
        }
        if (stop) break;
        if (cand) bestMove = cand;
        if (level !== 'master' && d === maxDepth) break;
      }
      return bestMove;
    }
    return { START, fromFEN, toFEN, posKey, legal, make, status, san, inCheck, best, sqName, sqIdx, col, evaluate };
  }
  const E = engine();

  // бот думає у фоновому потоці, щоб сторінка не «замерзала»; якщо Worker недоступний — у головному
  let worker = null, wid = 0;
  const waits = new Map();
  function think(fen, level) {
    return new Promise(res => {
      try {
        if (!worker) {
          const src = `const E=(${engine.toString()})();onmessage=e=>{const d=e.data;let m=null;try{m=E.best(E.fromFEN(d.fen),d.level);}catch(x){}postMessage({id:d.id,m});};`;
          worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
          worker.onmessage = e => { const r = waits.get(e.data.id); if (r) { waits.delete(e.data.id); r(e.data.m); } };
        }
        const id = ++wid; waits.set(id, res); worker.postMessage({ id, fen, level });
      } catch { setTimeout(() => res(E.best(E.fromFEN(fen), level)), 30); }
    });
  }

  /* ================= тексти ================= */
  const TX = {
    uk: {
      title: '♟ Шахи', sub: 'Справжні шахи з об’ємними фігурами: грай із ботами, з другом або влаштуй турнір для всього класу. Ходи записуються норвезькою — вчишся, поки граєш!',
      bot: '🤖 Грати з ботом', bot_d: 'Обери суперника з драбини рейтингу', local: '👥 Удвох на одному пристрої', local_d: 'Передавайте телефон чи планшет по черзі', room: '🌐 З другом онлайн', room_d: 'Посилання або QR — і граєте на різних пристроях', host: '📺 Турнір для класу', host_d: 'Монітор із QR-кодом, учні грають на телефонах, пари по раундах і таблиця',
      rating: 'Рейтинг', your: 'Твій рейтинг Ело', stats: (w, d, l) => `Перемог ${w} · нічиїх ${d} · поразок ${l}`, ladder: '🏆 Драбина рейтингу', you: 'ти', play: '▶ Грати', color: 'Твій колір', white: '⚪ Білі', black: '⚫ Чорні', random: '🎲 Випадково',
      time: 'Час на партію', none: 'Без годинника', min: n => `${n} хв`, learn: '🔊 Фігури норвезькою', learn_d: 'Натисни — і почуєш назву. Такі ж літери в записі ходів.',
      names: { K: ['Konge', 'король'], Q: ['Dronning', 'ферзь'], R: ['Tårn', 'тура'], B: ['Løper', 'слон'], N: ['Springer', 'кінь'], P: ['Bonde', 'пішак'] },
      turn_w: 'Хід білих', turn_b: 'Хід чорних', your_turn: 'Твій хід!', thinking: n => `${n} думає…`, check: 'Шах!', mate: 'Мат!', draw: 'Нічия',
      reasons: { mate: 'мат', stalemate: 'пат', fifty: 'правило 50 ходів', repetition: 'триразове повторення', material: 'замало фігур для мату', resign: 'здача', time: 'закінчився час', agree: 'за згодою', left: 'суперник вийшов' },
      win: '🏆 Перемога!', lose: 'Поразка', res_draw: '🤝 Нічия', elo: (a, d) => `Рейтинг: ${a} (${d >= 0 ? '+' : ''}${d})`, again: '🔄 Ще партія', menu: '♟ До меню', resign: '🏳 Здатися', resign_q: 'Точно здатися?', undo: '↩ Назад', flip: '🔄 Повернути', view3d: '🧊 3D', view2d: '▦ 2D',
      draw_offer: '🤝 Нічия?', draw_sent: 'Пропозицію нічиєї надіслано', draw_in: n => `${n} пропонує нічию`, accept: 'Погодитися', decline: 'Ні', moves: 'Ходи', promo: 'Оберіть фігуру',
      scan: 'Скануй QR-код або відкрий посилання:', code: 'Код', players: n => `Гравці: ${n}`, waiting: 'Чекаємо на гравців…', start: '▶ Почати раунд', next_round: n => `▶ Раунд ${n}`, finish: '🏁 Завершити турнір', close: '✖ Закрити', round: n => `Раунд ${n}`,
      bye: n => `${n} відпочиває цей раунд (+1 очко)`, standings: '📊 Таблиця', pts: 'очки', games_t: 'Партії', in_progress: 'триває', final: '🏆 Підсумки турніру', host_plays: 'Я теж граю', need2: 'Потрібно щонайменше двоє гравців.',
      join_t: '♟ Шаховий турнір', name: 'Твоє ім’я', join: 'Увійти ▶', err_code: 'Введи код (5 символів).', err_name: 'Введи ім’я.', in_room: 'Ти в кімнаті!', wait_round: 'Чекай на початок раунду…', wait_next: 'Партію завершено. Чекаємо на наступний раунд…',
      connecting: 'Підключення…', creating: 'Створюємо кімнату…', host_left: 'Кімнату закрито або з’єднання втрачено.', err_room: 'Кімнату не знайдено.', err_net: 'Немає з’єднання з інтернетом.', room_wait: 'Надішли другові посилання — партія почнеться, щойно він приєднається.', copy: '📋 Копіювати', copied: 'Скопійовано ✓', local_warn: '⚠️ Сторінку відкрито з файлу — інші пристрої не приєднаються.',
      vs: 'проти', level: { baby: '🐣 Новачок', easy: '🟢 Легкий', medium: '🟡 Середній', hard: '🔴 Сильний', master: '🟣 Майстер' }, captured: 'Взяті', coach: 'Порада: спершу виводь коней і слонів, захищай короля рокіровкою (O-O).'
    },
    en: {
      title: '♟ Chess', sub: 'Real chess with 3D pieces: play bots, a friend, or run a tournament for the whole class. Moves are written in Norwegian — you learn while you play!',
      bot: '🤖 Play a bot', bot_d: 'Pick an opponent from the rating ladder', local: '👥 Two players, one device', local_d: 'Pass the phone or tablet in turns', room: '🌐 Play a friend online', room_d: 'A link or QR — and you play on different devices', host: '📺 Class tournament', host_d: 'A monitor with a QR code, students play on phones, rounds and a table',
      rating: 'Rating', your: 'Your Elo rating', stats: (w, d, l) => `Wins ${w} · draws ${d} · losses ${l}`, ladder: '🏆 Rating ladder', you: 'you', play: '▶ Play', color: 'Your colour', white: '⚪ White', black: '⚫ Black', random: '🎲 Random',
      time: 'Time per game', none: 'No clock', min: n => `${n} min`, learn: '🔊 The pieces in Norwegian', learn_d: 'Tap to hear the name. The same letters are used in the move list.',
      names: { K: ['Konge', 'king'], Q: ['Dronning', 'queen'], R: ['Tårn', 'rook'], B: ['Løper', 'bishop'], N: ['Springer', 'knight'], P: ['Bonde', 'pawn'] },
      turn_w: 'White to move', turn_b: 'Black to move', your_turn: 'Your move!', thinking: n => `${n} is thinking…`, check: 'Check!', mate: 'Checkmate!', draw: 'Draw',
      reasons: { mate: 'checkmate', stalemate: 'stalemate', fifty: '50-move rule', repetition: 'threefold repetition', material: 'not enough material', resign: 'resignation', time: 'time ran out', agree: 'by agreement', left: 'opponent left' },
      win: '🏆 You won!', lose: 'You lost', res_draw: '🤝 Draw', elo: (a, d) => `Rating: ${a} (${d >= 0 ? '+' : ''}${d})`, again: '🔄 Another game', menu: '♟ Chess menu', resign: '🏳 Resign', resign_q: 'Really resign?', undo: '↩ Undo', flip: '🔄 Flip', view3d: '🧊 3D', view2d: '▦ 2D',
      draw_offer: '🤝 Draw?', draw_sent: 'Draw offer sent', draw_in: n => `${n} offers a draw`, accept: 'Accept', decline: 'No', moves: 'Moves', promo: 'Choose a piece',
      scan: 'Scan the QR code or open the link:', code: 'Code', players: n => `Players: ${n}`, waiting: 'Waiting for players…', start: '▶ Start round', next_round: n => `▶ Round ${n}`, finish: '🏁 Finish tournament', close: '✖ Close', round: n => `Round ${n}`,
      bye: n => `${n} sits out this round (+1 point)`, standings: '📊 Standings', pts: 'pts', games_t: 'Games', in_progress: 'playing', final: '🏆 Tournament results', host_plays: 'I play too', need2: 'At least two players are needed.',
      join_t: '♟ Chess tournament', name: 'Your name', join: 'Join ▶', err_code: 'Enter the code (5 characters).', err_name: 'Enter your name.', in_room: 'You are in the room!', wait_round: 'Wait for the round to start…', wait_next: 'Game over. Waiting for the next round…',
      connecting: 'Connecting…', creating: 'Creating the room…', host_left: 'The room was closed or the connection was lost.', err_room: 'Room not found.', err_net: 'No internet connection.', room_wait: 'Send your friend the link — the game starts as soon as they join.', copy: '📋 Copy', copied: 'Copied ✓', local_warn: '⚠️ The page is opened from a file — other devices cannot join.',
      vs: 'vs', level: { baby: '🐣 Beginner', easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Strong', master: '🟣 Master' }, captured: 'Captured', coach: 'Tip: develop knights and bishops first and keep your king safe by castling (O-O).'
    },
    no: {
      title: '♟ Sjakk', sub: 'Ekte sjakk med 3D-brikker: spill mot roboter, en venn eller lag turnering for hele klassen. Trekkene skrives på norsk – du lærer mens du spiller!',
      bot: '🤖 Spill mot robot', bot_d: 'Velg motstander fra ratingstigen', local: '👥 To spillere, én enhet', local_d: 'Send mobilen eller nettbrettet på tur', room: '🌐 Spill med en venn på nett', room_d: 'En lenke eller QR – og dere spiller på hver deres enhet', host: '📺 Klasseturnering', host_d: 'Skjerm med QR-kode, elevene spiller på mobilen, runder og tabell',
      rating: 'Rating', your: 'Din Elo-rating', stats: (w, d, l) => `Seire ${w} · remis ${d} · tap ${l}`, ladder: '🏆 Ratingstigen', you: 'deg', play: '▶ Spill', color: 'Din farge', white: '⚪ Hvit', black: '⚫ Svart', random: '🎲 Tilfeldig',
      time: 'Tid per parti', none: 'Uten klokke', min: n => `${n} min`, learn: '🔊 Brikkene på norsk', learn_d: 'Trykk for å høre navnet. De samme bokstavene brukes i trekklisten.',
      names: { K: ['Konge', 'konge'], Q: ['Dronning', 'dronning'], R: ['Tårn', 'tårn'], B: ['Løper', 'løper'], N: ['Springer', 'springer'], P: ['Bonde', 'bonde'] },
      turn_w: 'Hvit i trekket', turn_b: 'Svart i trekket', your_turn: 'Ditt trekk!', thinking: n => `${n} tenker …`, check: 'Sjakk!', mate: 'Sjakk matt!', draw: 'Remis',
      reasons: { mate: 'sjakk matt', stalemate: 'patt', fifty: '50-trekksregelen', repetition: 'tredobbel gjentakelse', material: 'for lite materiell', resign: 'oppgitt', time: 'tiden gikk ut', agree: 'etter avtale', left: 'motstanderen forlot partiet' },
      win: '🏆 Du vant!', lose: 'Du tapte', res_draw: '🤝 Remis', elo: (a, d) => `Rating: ${a} (${d >= 0 ? '+' : ''}${d})`, again: '🔄 Nytt parti', menu: '♟ Til sjakkmenyen', resign: '🏳 Gi opp', resign_q: 'Vil du virkelig gi opp?', undo: '↩ Angre', flip: '🔄 Snu', view3d: '🧊 3D', view2d: '▦ 2D',
      draw_offer: '🤝 Remis?', draw_sent: 'Remistilbud sendt', draw_in: n => `${n} tilbyr remis`, accept: 'Godta', decline: 'Nei', moves: 'Trekk', promo: 'Velg brikke',
      scan: 'Skann QR-koden eller åpne lenken:', code: 'Kode', players: n => `Spillere: ${n}`, waiting: 'Venter på spillere …', start: '▶ Start runden', next_round: n => `▶ Runde ${n}`, finish: '🏁 Avslutt turneringen', close: '✖ Steng', round: n => `Runde ${n}`,
      bye: n => `${n} står over denne runden (+1 poeng)`, standings: '📊 Tabell', pts: 'poeng', games_t: 'Partier', in_progress: 'pågår', final: '🏆 Turneringsresultat', host_plays: 'Jeg spiller også', need2: 'Det trengs minst to spillere.',
      join_t: '♟ Sjakkturnering', name: 'Navnet ditt', join: 'Bli med ▶', err_code: 'Skriv koden (5 tegn).', err_name: 'Skriv navnet ditt.', in_room: 'Du er i rommet!', wait_round: 'Vent til runden starter …', wait_next: 'Partiet er ferdig. Venter på neste runde …',
      connecting: 'Kobler til …', creating: 'Lager rommet …', host_left: 'Rommet er stengt eller forbindelsen er brutt.', err_room: 'Fant ikke rommet.', err_net: 'Ingen internettforbindelse.', room_wait: 'Send lenken til vennen din – partiet starter når hen blir med.', copy: '📋 Kopier', copied: 'Kopiert ✓', local_warn: '⚠️ Siden er åpnet fra en fil.',
      vs: 'mot', level: { baby: '🐣 Nybegynner', easy: '🟢 Lett', medium: '🟡 Middels', hard: '🔴 Sterk', master: '🟣 Mester' }, captured: 'Slått', coach: 'Tips: få ut springere og løpere først, og sett kongen i sikkerhet med rokade (O-O).'
    }
  };
  TX.ar = {
    title: '♟ الشطرنج', sub: 'شطرنج حقيقي بقطع ثلاثية الأبعاد: العب مع الروبوتات أو مع صديق أو نظّم بطولة للصف كله. تُكتب النقلات بالنرويجية — تتعلّم وأنت تلعب!',
    bot: '🤖 العب مع روبوت', bot_d: 'اختر خصمًا من سلّم التصنيف', local: '👥 لاعبان على جهاز واحد', local_d: 'تناوبا على الهاتف أو الجهاز اللوحي', room: '🌐 العب مع صديق عبر الإنترنت', room_d: 'رابط أو رمز QR — وتلعبان على جهازين مختلفين', host: '📺 بطولة الصف', host_d: 'شاشة برمز QR، والتلاميذ يلعبون على هواتفهم، بجولات وجدول',
    rating: 'التصنيف', your: 'تصنيفك (Elo)', stats: (w, d, l) => `فوز ${w} · تعادل ${d} · خسارة ${l}`, ladder: '🏆 سلّم التصنيف', you: 'أنت', play: '▶ العب', color: 'لونك', white: '⚪ الأبيض', black: '⚫ الأسود', random: '🎲 عشوائي',
    time: 'وقت المباراة', none: 'بدون ساعة', min: n => `${n} د`, learn: '🔊 القطع بالنرويجية', learn_d: 'اضغط لتسمع الاسم. الحروف نفسها تُستخدم في تسجيل النقلات.',
    names: { K: ['Konge', 'الملك'], Q: ['Dronning', 'الوزير'], R: ['Tårn', 'القلعة'], B: ['Løper', 'الفيل'], N: ['Springer', 'الحصان'], P: ['Bonde', 'البيدق'] },
    turn_w: 'دور الأبيض', turn_b: 'دور الأسود', your_turn: 'دورك!', thinking: n => `${n} يفكّر…`, check: 'كِش!', mate: 'كِش مات!', draw: 'تعادل',
    reasons: { mate: 'كِش مات', stalemate: 'جمود (بات)', fifty: 'قاعدة الخمسين نقلة', repetition: 'تكرار ثلاثي', material: 'قطع غير كافية للإماتة', resign: 'استسلام', time: 'انتهى الوقت', agree: 'بالاتفاق', left: 'غادر الخصم' },
    win: '🏆 فزت!', lose: 'خسرت', res_draw: '🤝 تعادل', elo: (a, d) => `التصنيف: ${a} (${d >= 0 ? '+' : ''}${d})`, again: '🔄 مباراة أخرى', menu: '♟ قائمة الشطرنج', resign: '🏳 استسلام', resign_q: 'هل تريد الاستسلام حقًا؟', undo: '↩ تراجع', flip: '🔄 اقلب', view3d: '🧊 ثلاثي', view2d: '▦ ثنائي',
    draw_offer: '🤝 تعادل؟', draw_sent: 'أُرسل عرض التعادل', draw_in: n => `${n} يعرض التعادل`, accept: 'قبول', decline: 'لا', moves: 'النقلات', promo: 'اختر قطعة',
    scan: 'امسح رمز QR أو افتح الرابط:', code: 'الرمز', players: n => `اللاعبون: ${n}`, waiting: 'في انتظار اللاعبين…', start: '▶ ابدأ الجولة', next_round: n => `▶ الجولة ${n}`, finish: '🏁 أنهِ البطولة', close: '✖ إغلاق', round: n => `الجولة ${n}`,
    bye: n => `${n} يستريح هذه الجولة (+1 نقطة)`, standings: '📊 الترتيب', pts: 'نقاط', games_t: 'المباريات', in_progress: 'جارية', final: '🏆 نتائج البطولة', host_plays: 'أنا ألعب أيضًا', need2: 'يلزم لاعبان على الأقل.',
    join_t: '♟ بطولة الشطرنج', name: 'اسمك', join: 'انضم ▶', err_code: 'اكتب الرمز (5 أحرف).', err_name: 'اكتب اسمك.', in_room: 'أنت في الغرفة!', wait_round: 'انتظر بدء الجولة…', wait_next: 'انتهت المباراة. في انتظار الجولة التالية…',
    connecting: 'جارٍ الاتصال…', creating: 'جارٍ إنشاء الغرفة…', host_left: 'أُغلقت الغرفة أو انقطع الاتصال.', err_room: 'لم يُعثر على الغرفة.', err_net: 'لا يوجد اتصال بالإنترنت.', room_wait: 'أرسل الرابط إلى صديقك — تبدأ المباراة حين ينضم.', copy: '📋 نسخ', copied: 'تم النسخ ✓', local_warn: '⚠️ الصفحة مفتوحة من ملف — لن تتمكن الأجهزة الأخرى من الانضمام.',
    vs: 'ضد', level: { baby: '🐣 مبتدئ', easy: '🟢 سهل', medium: '🟡 متوسط', hard: '🔴 قوي', master: '🟣 أستاذ' }, captured: 'المأسورة', coach: 'نصيحة: أخرج الأحصنة والأفيال أولًا، واحمِ ملكك بالتبييت (O-O).'
  };
  const MOD = { uk: ['♟', 'Шахи', '3D-шахи з ботами й турніром для класу'], en: ['♟', 'Chess', '3D chess with bots and class tournaments'], no: ['♟', 'Sjakk', '3D-sjakk med roboter og klasseturnering'], ar: ['♟', 'الشطرنج', 'شطرنج ثلاثي الأبعاد مع روبوتات وبطولات للصف'] };
  if (window.I18N) for (const l of Object.keys(MOD)) { const I = window.I18N[l]; if (!I) continue; I.nav = Object.assign({}, I.nav, { chess: MOD[l][1] }); I.modules = Object.assign({}, I.modules, { chess: MOD[l] }); }
  const C = () => window.KomiksCore;
  const tx = (k, ...a) => { const t = TX[C().ui] || TX.en; const v = k in t ? t[k] : TX.en[k]; return typeof v === 'function' ? v(...a) : v; };
  // що озвучуємо (tools/build-audio-list.js бере цей список для нейроголосів)
  const SAY = ['Konge', 'Dronning', 'Tårn', 'Løper', 'Springer', 'Bonde', 'Sjakk!', 'Sjakk matt!', 'Patt!', 'Remis!', 'Du vant!', 'Godt trekk!'];
  const say = text => { const K = C(); if (K.settings.cheerVoice === false) return; K.claim().then(() => K.Speech.speak(text, 'narrator')); };
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : document.createTextNode(String(code || '🙂').split('|')[0]));
  const myAvatar = () => (window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊');
  const myName = () => (C().currentUser() || {}).name || C().raw.get('comiks.gameProfile', {}).name || tx('you');

  /* ================= рейтинг Ело й драбина ================= */
  const LEVEL_OF = { easy: 'easy', medium: 'medium', hard: 'hard', pro: 'master' };
  const ELO_OF = { baby: 450, easy: 700, medium: 1000, hard: 1300, master: 1650 };
  const ROBO = { code: 'ROBO', name: 'Robo', avatar: '🤖', diff: 'baby' };
  function ladderBots() {
    const list = (window.KomiksBots ? window.KomiksBots.list : []).map((b, i) => ({ code: b.code, name: b.name, avatar: b.avatar, level: LEVEL_OF[b.diff] || 'medium', elo: ELO_OF[LEVEL_OF[b.diff] || 'medium'] + ((i * 37) % 90) - 40 }));
    return [{ code: ROBO.code, name: ROBO.name, avatar: ROBO.avatar, level: 'baby', elo: ELO_OF.baby }, ...list].sort((a, b) => a.elo - b.elo);
  }
  const botBy = code => ladderBots().find(b => b.code === code) || ladderBots()[1] || ladderBots()[0];
  const myElo = () => C().store.get('chessElo', 800);
  const myStats = () => Object.assign({ w: 0, d: 0, l: 0, hist: [] }, C().store.get('chessStats', {}));
  // результат партії для гравця: 1 перемога, 0.5 нічия, 0 поразка → новий Ело, запис у профіль
  function recordResult(score, oppElo, oppName, key) {
    const K = C(), me = myElo();
    const exp = 1 / (1 + Math.pow(10, (oppElo - me) / 400));
    const kf = myStats().w + myStats().d + myStats().l < 20 ? 40 : 24;
    const next = Math.max(100, Math.round(me + kf * (score - exp)));
    const st = myStats(); if (score === 1) st.w++; else if (score === 0) st.l++; else st.d++;
    st.hist = [...(st.hist || []), next].slice(-30);
    K.store.set('chessElo', next); K.store.set('chessStats', st);
    K.recordQuiz('chess:' + key, `♟ Sjakk ${tx('vs')} ${oppName}`, score * 2, 2, {});
    if (score === 1) { K.bump('chessWins'); K.bump('games'); } else K.bump('games');
    return { elo: next, delta: next - me };
  }

  /* ================= 3D-фігури (SVG з градієнтами) ================= */
  const SHAPES = {
    P: '<path d="M36 97c2-15 6-24 8-31h12c2 7 6 16 8 31z"/><ellipse cx="50" cy="67" rx="14" ry="4.5"/><circle cx="50" cy="51" r="15"/>',
    R: '<path d="M32 97l3-45h30l3 45z"/><path d="M29 52V27h10v8h7v-8h8v8h7v-8h10v25z"/><rect x="31" y="50" width="38" height="6" rx="2"/>',
    B: '<path d="M36 97c4-17 6-26 7-35h14c1 9 3 18 7 35z"/><ellipse cx="50" cy="62" rx="13" ry="4"/><path d="M50 19c14 11 17 26 9 41H41c-8-15-5-30 9-41z"/><path class="cut" d="M54 29l-9 15"/><circle cx="50" cy="15" r="5"/>',
    N: '<path d="M33 97c0-17 5-26 12-34-9 1-17-3-19-11-1-6 7-12 13-17 3-9 9-16 16-18l2-7 5 8c11 6 15 22 12 41-2 14-6 26-4 38z"/><circle class="eye" cx="46" cy="35" r="2.6"/><path class="cut" d="M62 26c4 8 5 16 3 26"/>',
    Q: '<path d="M34 97c4-20 6-30 8-41h16c2 11 4 21 8 41z"/><path d="M29 25l8 24 7-26 6 24 6-24 7 26 8-24-4 31H33z"/><ellipse cx="50" cy="57" rx="17" ry="4.5"/><circle cx="29" cy="23" r="4"/><circle cx="44" cy="20" r="4"/><circle cx="56" cy="20" r="4"/><circle cx="71" cy="23" r="4"/>',
    K: '<path d="M34 97c4-20 6-30 8-41h16c2 11 4 21 8 41z"/><path d="M34 57c-3-13 2-24 16-25 14 1 19 12 16 25z"/><ellipse cx="50" cy="57" rx="17" ry="4.5"/><path d="M47 8h6v8h7v6h-7v10h-6V22h-7v-6h7z"/>'
  };
  const BASE = '<ellipse class="sh" cx="50" cy="121" rx="36" ry="8"/><path d="M19 118l5-13h52l5 13z"/><rect x="26" y="96" width="48" height="10" rx="4"/><ellipse cx="50" cy="118" rx="31" ry="5"/>';
  function ensureDefs() {
    if (document.getElementById('cz-defs')) return;
    const d = document.createElement('div');
    d.innerHTML = '<svg id="cz-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<linearGradient id="czW" x1="0" x2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset=".45" stop-color="#f3e6c8"/><stop offset="1" stop-color="#b99d6b"/></linearGradient>' +
      '<linearGradient id="czB" x1="0" x2="1"><stop offset="0" stop-color="#6d6f86"/><stop offset=".4" stop-color="#34364a"/><stop offset="1" stop-color="#0d0e17"/></linearGradient>' +
      '<radialGradient id="czS"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs></svg>';
    document.body.append(d.firstChild);
  }
  const pieceSvg = p => { const w = p === p.toUpperCase(), P = p.toUpperCase(); return `<svg class="cz-svg ${w ? 'w' : 'b'}" viewBox="0 0 100 130" aria-hidden="true"><g class="body">${BASE}${SHAPES[P]}</g><path class="gloss" d="M36 104c2-30 6-48 10-58" /></svg>`; };
  const pieceName = p => { const n = tx('names')[p.toUpperCase()]; return n ? `${n[0]} (${n[1]})` : ''; };

  /* ================= дошка ================= */
  // G: { st, flip, three, sel, last, targets, interactive(color)?, onMove(m) }
  function boardEl(G) {
    const K = C(), { h } = K;
    ensureDefs();
    const board = h('div', { class: 'cz-board' + (G.three ? ' three' : '') });
    const stage = h('div', { class: 'cz-stage' + (G.three ? ' three' : '') }, h('div', { class: 'cz-frame' }, board));
    const idxAt = (r, f) => (G.flip ? (7 - r) * 8 + (7 - f) : r * 8 + f);
    const posOf = i => { const r = i >> 3, f = i % 8; return G.flip ? [7 - r, 7 - f] : [r, f]; };
    const ms = G.sel >= 0 ? E.legal(G.st).filter(m => m.f === G.sel) : [];
    const chk = E.inCheck(G.st) ? G.st.b.indexOf(G.st.t === 'w' ? 'K' : 'k') : -1;
    for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
      const i = idxAt(r, f), light = (r + f) % 2 === 0;
      const tgt = ms.find(m => m.to === i);
      const cls = ['cz-sq', light ? 'l' : 'd', G.sel === i ? 'sel' : '', G.last && (G.last.f === i || G.last.to === i) ? 'last' : '', tgt ? (tgt.cap ? 'cap' : 'tgt') : '', chk === i ? 'chk' : ''].filter(Boolean).join(' ');
      const sq = h('div', { class: cls, 'data-i': i, onclick: () => G.click && G.click(i) });
      if (f === 0) sq.append(h('small', { class: 'cz-rank' }, String(8 - (i >> 3))));
      if (r === 7) sq.append(h('small', { class: 'cz-file' }, 'abcdefgh'[i % 8]));
      board.append(sq);
    }
    for (let i = 0; i < 64; i++) {
      const p = G.st.b[i]; if (!p) continue;
      const [r, f] = posOf(i);
      const el = h('div', { class: 'cz-pc' + (G.st.t === E.col(p) && G.canPick && G.canPick(E.col(p)) ? ' mine' : '') + (chk === i ? ' chk' : ''), style: { left: f * 12.5 + '%', top: r * 12.5 + '%' }, 'data-i': i, title: pieceName(p) });
      const fig = h('div', { class: 'cz-fig', onclick: () => G.click && G.click(i) });
      fig.innerHTML = pieceSvg(p);
      el.append(h('i', { class: 'cz-shadow' }), fig);
      board.append(el);
    }
    // плавний рух фігури останнього ходу (FLIP)
    if (G.animate && G.last) {
      const el = board.querySelector(`.cz-pc[data-i="${G.last.to}"]`);
      if (el) {
        const [r0, f0] = posOf(G.last.f), [r1, f1] = posOf(G.last.to);
        el.style.transition = 'none'; el.style.transform = `translate(${(f0 - f1) * 100}%, ${(r0 - r1) * 100}%)`;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = ''; el.style.transform = ''; }));
      }
      G.animate = false;
    }
    return stage;
  }

  /* ================= спільний стіл: дошка + гравці + годинник + ходи ================= */
  // cfg: { players: {w:{name,avatar,elo}, b:{...}}, me: 'w'|'b'|null(обидва), tc: хвилини|0, canUndo, onMove(m, G) → після ходу, onEnd(res, G), extraBtns(G) }
  function table(cfg) {
    const K = C(), { h } = K;
    const G = { st: E.fromFEN(cfg.fen || E.START), keys: [], sans: [], last: null, sel: -1, flip: cfg.me === 'b', three: K.store.get('chess3d', true), over: null, clocks: cfg.tc ? { w: cfg.tc * 60000, b: cfg.tc * 60000 } : null, tickAt: 0, busy: false, drawOffer: null };
    G.keys.push(E.posKey(G.st));
    const root = h('section', { class: 'cz-game' });
    const statusEl = h('div', { class: 'cz-status' });
    const movesEl = h('ol', { class: 'cz-moves' });
    const clockEl = { w: h('b', { class: 'cz-clock' }), b: h('b', { class: 'cz-clock' }) };
    const capEl = { w: h('span', { class: 'cz-caps' }), b: h('span', { class: 'cz-caps' }) };
    const boardWrap = h('div', { class: 'cz-boardwrap' });
    const fmtClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
    const playerBar = c => { const p = cfg.players[c] || {}; return h('div', { class: 'cz-player ' + c + (G.st.t === c && !G.over ? ' turn' : '') }, AV(p.avatar || '🙂', { size: 44, mood: G.over ? (G.over.winner === c ? 'cheer' : G.over.winner ? 'sad' : 'idle') : 'idle' }), h('div', {}, h('b', {}, p.name || '?'), h('small', {}, (c === 'w' ? '⚪' : '⚫') + (p.elo ? ' · ' + p.elo : '')), capEl[c]), G.clocks ? clockEl[c] : null); };
    G.canPick = color => !G.over && !G.busy && (cfg.me ? cfg.me === color : true);
    G.click = i => {
      if (G.over || G.busy) return;
      const p = G.st.b[i];
      const mine = p && E.col(p) === G.st.t && G.canPick(G.st.t);
      if (G.sel >= 0) {
        const cand = E.legal(G.st).filter(m => m.f === G.sel && m.to === i);
        if (cand.length) { if (cand.length > 1) return promoPick(cand); return G.play(cand[0], true); }
      }
      if (mine) { G.sel = G.sel === i ? -1 : i; K.Sfx.tick(); if (G.sel >= 0) say(tx('names')[p.toUpperCase()][0]); draw(); }
      else if (G.sel >= 0) { G.sel = -1; draw(); }
    };
    function promoPick(cand) {
      const box = h('div', { class: 'cz-promo' }, h('b', {}, tx('promo')), h('div', {}, cand.map(m => { const b = h('button', { type: 'button', onclick: () => { box.remove(); G.play(m, true); } }); b.innerHTML = pieceSvg(m.promo); return b; })));
      root.append(box);
    }
    const capturedOf = () => { const start = { P: 8, N: 2, B: 2, R: 2, Q: 1 }; const out = { w: [], b: [] }; for (const c of ['w', 'b']) for (const [P, n] of Object.entries(start)) { const have = G.st.b.filter(x => x === (c === 'w' ? P : P.toLowerCase())).length; for (let k = have; k < n; k++) out[c === 'w' ? 'b' : 'w'].push(c === 'w' ? P : P.toLowerCase()); } return out; };
    // хід: застосувати, записати, озвучити, перевірити кінець партії
    G.play = (m, byUser) => {
      if (G.over) return;
      const s = E.san(G.st, m);
      if (G.clocks && G.tickAt) { G.clocks[G.st.t] -= Date.now() - G.tickAt; }
      G.st = E.make(G.st, m); G.keys.push(E.posKey(G.st)); G.sans.push(s); G.last = { f: m.f, to: m.to }; G.sel = -1; G.animate = true; G.tickAt = Date.now();
      const stt = E.status(G.st, G.keys);
      if (m.cap) K.Sfx.good(); else K.Sfx.tick();
      if (stt === 'mate') { say('Sjakk matt!'); end({ winner: G.st.t === 'w' ? 'b' : 'w', reason: 'mate' }); }
      else if (['stalemate', 'fifty', 'repetition', 'material'].includes(stt)) { say(stt === 'stalemate' ? 'Patt!' : 'Remis!'); end({ winner: null, reason: stt }); }
      else if (stt === 'check') say('Sjakk!');
      draw();
      if (cfg.onMove) cfg.onMove(m, G, byUser);
    };
    function end(res) { if (G.over) return; G.over = res; draw(); if (cfg.onEnd) cfg.onEnd(res, G); }
    G.end = end;
    G.undo = () => { if (G.sans.length < 2 || G.over || G.busy) return; const fens = G.fens; if (!fens || fens.length < 3) return; fens.pop(); fens.pop(); G.st = E.fromFEN(fens[fens.length - 1]); G.sans.splice(-2); G.keys.splice(-2); G.last = null; G.sel = -1; draw(); };
    G.fens = [E.toFEN(G.st)];
    const origPlay = G.play; G.play = (m, byUser) => { origPlay(m, byUser); G.fens.push(E.toFEN(G.st)); };
    // стан ззовні (онлайн): FEN + останній хід
    G.setRemote = (fen, last, sans, clocks) => { G.st = E.fromFEN(fen); G.last = last || null; if (sans) G.sans = sans.slice(); if (clocks) { G.clocks = clocks; G.tickAt = Date.now(); } G.sel = -1; G.animate = !!last; draw(); };
    function statusText() {
      if (G.over) { const r = tx('reasons')[G.over.reason] || ''; return (G.over.winner ? (G.over.winner === 'w' ? '⚪ ' : '⚫ ') + (cfg.players[G.over.winner] || {}).name + ' · ' : tx('draw') + ' · ') + r; }
      if (G.busy && cfg.thinkingName) return tx('thinking', cfg.thinkingName);
      const chk = E.inCheck(G.st) ? tx('check') + ' ' : '';
      return chk + (cfg.me && cfg.me === G.st.t ? tx('your_turn') : tx(G.st.t === 'w' ? 'turn_w' : 'turn_b'));
    }
    function draw() {
      const cap = capturedOf();
      for (const c of ['w', 'b']) { capEl[c].innerHTML = cap[c].map(pieceSvg).join(''); }
      statusEl.textContent = statusText(); statusEl.className = 'cz-status' + (E.inCheck(G.st) && !G.over ? ' chk' : '') + (G.over ? ' over' : '');
      movesEl.replaceChildren(...Array.from({ length: Math.ceil(G.sans.length / 2) }, (_, i) => h('li', {}, h('span', {}, G.sans[i * 2]), h('span', {}, G.sans[i * 2 + 1] || ''))));
      movesEl.scrollTop = movesEl.scrollHeight;
      const top = G.flip ? 'w' : 'b', bottom = G.flip ? 'b' : 'w';
      boardWrap.replaceChildren(playerBar(top), boardEl(G), playerBar(bottom));
      tickClocks();
    }
    function tickClocks() { if (!G.clocks) return; for (const c of ['w', 'b']) { const left = G.clocks[c] - (G.st.t === c && G.tickAt && !G.over ? Date.now() - G.tickAt : 0); clockEl[c].textContent = fmtClock(left); clockEl[c].classList.toggle('low', left < 30000); clockEl[c].classList.toggle('run', G.st.t === c && !G.over && !!G.tickAt); } }
    G.draw = draw;
    const tools = h('div', { class: 'cz-tools' },
      h('button', { class: 'cz-btn', type: 'button', onclick: () => { G.three = !G.three; K.store.set('chess3d', G.three); draw(); tools.querySelector('.v3').textContent = G.three ? tx('view2d') : tx('view3d'); } , }, ''),
      h('button', { class: 'cz-btn', type: 'button', onclick: () => { G.flip = !G.flip; draw(); } }, tx('flip')),
      document.documentElement.requestFullscreen ? h('button', { class: 'cz-btn cz-fs', type: 'button', title: 'Fullscreen', onclick: () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); else document.documentElement.requestFullscreen().catch(() => {}); } }, '⛶') : null,
      cfg.canUndo ? h('button', { class: 'cz-btn', type: 'button', onclick: () => G.undo() }, tx('undo')) : null,
      cfg.extraBtns ? cfg.extraBtns(G) : null,
      h('button', { class: 'cz-btn danger', type: 'button', onclick: () => { if (!G.over && confirm(tx('resign_q'))) { if (cfg.onResign) cfg.onResign(G); else end({ winner: (cfg.me || G.st.t) === 'w' ? 'b' : 'w', reason: 'resign' }); } } }, tx('resign')));
    tools.firstChild.classList.add('v3'); tools.firstChild.textContent = G.three ? tx('view2d') : tx('view3d');
    root.append(h('div', { class: 'cz-main' }, boardWrap), h('aside', { class: 'cz-side' }, statusEl, tools, h('div', { class: 'cz-movebox' }, h('b', {}, tx('moves'), h('small', {}, ' · K D T L S')), movesEl), cfg.side ? cfg.side(G) : null));
    // годинник: хто вичерпав час — програв
    if (G.clocks) {
      const t = setInterval(() => {
        if (!root.isConnected) return clearInterval(t);
        tickClocks();
        if (!G.over && G.tickAt && cfg.localClock !== false) { const left = G.clocks[G.st.t] - (Date.now() - G.tickAt); if (left <= 0) { G.clocks[G.st.t] = 0; end({ winner: G.st.t === 'w' ? 'b' : 'w', reason: 'time' }); } }
      }, 250);
    }
    G.root = root;
    draw();
    return G;
  }

  /* ================= сцена, модалка результату ================= */
  function scene(cls = '') {
    const K = C(), { h } = K;
    const root = h('section', { class: 'cz ' + cls });
    // партія — окремий режим на весь екран (без шапки й футера сайту); меню — звичайна сторінка
    const immersive = cls !== 'cz-menu-p';
    if (immersive) { document.body.classList.add('in-game', 'in-chess'); document.querySelectorAll('.cz-exit').forEach(x => x.remove()); document.body.append(h('a', { class: 'cz-exit', href: '#/chess', title: '✕', 'aria-label': 'Exit', onclick: () => { endSession(); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); } }, '✕')); }
    const watch = setInterval(() => { if (!root.isConnected) { clearInterval(watch); if (!document.querySelector('section.cz.cz-play, section.cz.cz-host')) { document.body.classList.remove('in-game', 'in-chess'); document.querySelectorAll('.cz-exit').forEach(x => x.remove()); } if (root.onLeave) root.onLeave(); } }, 500);
    return root;
  }
  function resultModal(res, meColor, extra) {
    const K = C(), { h } = K;
    const won = res.winner && res.winner === meColor, lost = res.winner && res.winner !== meColor;
    const box = h('div', { class: 'free-modal cz-result' }, h('div', { class: 'free-card cz-result-card ' + (won ? 'win' : lost ? 'lose' : 'draw') },
      h('div', { class: 'cz-result-hero' }, AV(myAvatar(), { size: 120, mood: won ? 'cheer' : lost ? 'sad' : 'idle' }), won ? h('span', { class: 'cz-crown' }, '👑') : null),
      h('h2', {}, won ? tx('win') : lost ? tx('lose') : tx('res_draw')), h('p', {}, tx('reasons')[res.reason] || ''), extra && extra.elo ? h('p', { class: 'cz-elo ' + (extra.elo.delta >= 0 ? 'up' : 'down') }, tx('elo', extra.elo.elo, extra.elo.delta)) : null,
      h('div', { class: 'row-center' }, extra && extra.again ? h('button', { class: 'btn accent', type: 'button', onclick: () => { box.remove(); extra.again(); } }, tx('again')) : null, h('button', { class: 'btn', type: 'button', onclick: () => box.remove() }, '✓'), h('a', { class: 'btn', href: '#/chess', onclick: () => box.remove() }, tx('menu')))));
    document.body.append(box);
    if (won) { K.confetti(); K.Sfx.win(); say('Du vant!'); if (window.KomiksProfile) setTimeout(() => window.KomiksProfile.rewardModal(0.8), 2600); }
  }

  /* ================= меню ================= */
  function menu() {
    const K = C(), { h } = K;
    const root = scene('cz-menu-p');
    const st = myStats(), elo = myElo();
    const bots = ladderBots();
    let pickBot = K.store.get('chessBot', bots[1] ? bots[1].code : 'ROBO');
    let color = K.store.get('chessColor', 'w'), tc = +K.store.get('chessTime', 0);
    const draw = () => {
      const ladder = [...bots.map(b => Object.assign({}, b, { me: false })), { code: 'ME', name: myName(), avatar: myAvatar(), elo, me: true }].sort((a, b) => b.elo - a.elo);
      const hero = { st: E.fromFEN('r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 5'), three: true, flip: false, sel: -1 };
      const spark = st.hist && st.hist.length > 1 ? (() => { const mn = Math.min(...st.hist), mx = Math.max(...st.hist), w = 160, hh = 40; const pts = st.hist.map((v, i) => `${(i / (st.hist.length - 1) * w).toFixed(1)},${(hh - (v - mn) / Math.max(1, mx - mn) * hh).toFixed(1)}`).join(' '); const s = h('div', { class: 'cz-spark' }); s.innerHTML = `<svg viewBox="0 0 ${w} ${hh}" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`; return s; })() : null;
      const chip = (cur, v, label, on) => h('button', { type: 'button', class: 'cz-chip' + (cur === v ? ' on' : ''), onclick: on }, label);
      root.replaceChildren(h('div', { class: 'cz-menu' },
        h('div', { class: 'cz-hero' }, h('div', { class: 'cz-hero-t' }, h('h1', {}, tx('title')), h('p', {}, tx('sub')),
          h('div', { class: 'cz-me' }, AV(myAvatar(), { size: 64, mood: 'cheer' }), h('div', {}, h('small', {}, tx('your')), h('b', { class: 'cz-me-elo' }, elo), h('small', {}, tx('stats', st.w, st.d, st.l))), spark)),
          h('div', { class: 'cz-hero-board' }, boardEl(hero))),
        h('div', { class: 'cz-modes' },
          h('div', { class: 'cz-mode big' }, h('b', {}, tx('bot')), h('small', {}, tx('bot_d')),
            h('div', { class: 'cz-botpick' }, bots.map(b => h('button', { type: 'button', class: 'cz-bot' + (b.code === pickBot ? ' on' : ''), onclick: () => { pickBot = b.code; K.store.set('chessBot', b.code); draw(); } }, AV(b.avatar, { size: 46, mood: b.code === pickBot ? 'cheer' : 'idle' }), h('b', {}, b.name), h('small', {}, tx('level')[b.level]), h('i', {}, b.elo)))),
            h('div', { class: 'cz-opts' }, h('span', {}, tx('color')), chip(color, 'w', tx('white'), () => { color = 'w'; K.store.set('chessColor', 'w'); draw(); }), chip(color, 'b', tx('black'), () => { color = 'b'; K.store.set('chessColor', 'b'); draw(); }), chip(color, 'r', tx('random'), () => { color = 'r'; K.store.set('chessColor', 'r'); draw(); })),
            h('div', { class: 'cz-opts' }, h('span', {}, tx('time')), [0, 3, 5, 10, 15].map(m => chip(tc, m, m ? tx('min', m) : tx('none'), () => { tc = m; K.store.set('chessTime', m); draw(); }))),
            h('a', { class: 'btn accent big', href: '#/chess/bot/' + pickBot }, tx('play'))),
          h('a', { class: 'cz-mode', href: '#/chess/local' }, h('b', {}, tx('local')), h('small', {}, tx('local_d'))),
          h('a', { class: 'cz-mode', href: '#/chess/room' }, h('b', {}, tx('room')), h('small', {}, tx('room_d'))),
          h('a', { class: 'cz-mode', href: '#/chess/host' }, h('b', {}, tx('host')), h('small', {}, tx('host_d')))),
        h('div', { class: 'cz-grid2' },
          h('div', { class: 'box cz-ladder' }, h('h3', {}, tx('ladder')), h('ol', {}, ladder.map((p, i) => h('li', { class: p.me ? 'me' : '' }, h('span', { class: 'n' }, i + 1), AV(p.avatar, { size: 34 }), h('b', {}, p.name + (p.me ? ` (${tx('you')})` : '')), h('i', {}, p.elo), !p.me ? h('a', { class: 'btn small', href: '#/chess/bot/' + p.code }, '▶') : h('span'))))),
          h('div', { class: 'box cz-learn' }, h('h3', {}, tx('learn')), h('p', { class: 'hint' }, tx('learn_d')),
            h('div', { class: 'cz-learn-grid' }, ['K', 'Q', 'R', 'B', 'N', 'P'].map(P => { const b = h('button', { type: 'button', onclick: () => say(tx('names')[P][0]) }); b.innerHTML = pieceSvg(P); b.append(h('b', {}, tx('names')[P][0]), h('small', {}, tx('names')[P][1] + ' · ' + ({ K: 'K', Q: 'D', R: 'T', B: 'L', N: 'S', P: '—' })[P])); return b; })),
            h('p', { class: 'hint' }, '💡 ' + tx('coach')))),
        h('a', { class: 'lr-link', href: '#/' }, '←')));
    };
    draw();
    return root;
  }

  /* ================= гра з ботом ================= */
  function vsBot(code) {
    const K = C(), { h } = K;
    const root = scene('cz-play');
    const bot = botBy(code);
    const pref = K.store.get('chessColor', 'w');
    const me = pref === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : pref;
    const tc = +K.store.get('chessTime', 0);
    const players = { [me]: { name: myName(), avatar: myAvatar(), elo: myElo() }, [me === 'w' ? 'b' : 'w']: { name: bot.name, avatar: bot.avatar, elo: bot.elo } };
    const botMove = async G => {
      if (G.over || G.st.t === me) return;
      G.busy = true; G.draw();
      const t0 = Date.now();
      const m = await think(E.toFEN(G.st), bot.level);
      await new Promise(r => setTimeout(r, Math.max(0, 550 - (Date.now() - t0))));
      G.busy = false;
      if (!root.isConnected || G.over) return;
      const real = m && E.legal(G.st).find(x => x.f === m.f && x.to === m.to && (x.promo || '') === (m.promo || ''));
      if (real) G.play(real, false); else G.draw();
    };
    const G = table({ players, me, tc, canUndo: true, thinkingName: bot.name,
      onMove: (m, g) => { if (!g.over && g.st.t !== me) botMove(g); },
      onEnd: res => { const score = res.winner ? (res.winner === me ? 1 : 0) : 0.5; const elo = recordResult(score, bot.elo, bot.name, bot.level); resultModal(res, me, { elo, again: () => { const el = vsBot(code); root.replaceWith(el); } }); } });
    root.append(h('div', { class: 'cz-head' }, h('a', { class: 'lr-link', href: '#/chess' }, '← ' + tx('title')), h('b', {}, `${myName()} ${tx('vs')} ${bot.name} · ${tx('level')[bot.level]}`)), G.root);
    if (me === 'b') setTimeout(() => botMove(G), 600);
    return root;
  }

  /* ================= удвох на одному пристрої ================= */
  function local() {
    const K = C(), { h } = K;
    const root = scene('cz-play');
    const tc = +K.store.get('chessTime', 0);
    const G = table({ players: { w: { name: '⚪ ' + tx('white').replace(/^\S+\s/, ''), avatar: myAvatar() }, b: { name: '⚫ ' + tx('black').replace(/^\S+\s/, ''), avatar: '🐼' } }, me: null, tc,
      canUndo: true, onEnd: res => { K.recordQuiz('chess:local', '♟ Sjakk · 👥', res.winner ? 2 : 1, 2, {}); resultModal(res, res.winner || 'w', { again: () => root.replaceWith(local()) }); } });
    root.append(h('div', { class: 'cz-head' }, h('a', { class: 'lr-link', href: '#/chess' }, '← ' + tx('title')), h('b', {}, tx('local'))), G.root);
    return root;
  }

  /* ================= онлайн: кімната (з другом або турнір класу) ================= */
  const SITE = 'https://bilohash.com/comiks/', PREFIX = 'komiks-lab-chess-', CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genCode = () => Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  const baseUrl = () => (location.protocol.startsWith('http') ? location.href.split('#')[0].split('?')[0] : SITE);
  let libs = null;
  function loadLibs() {
    if (libs) return libs;
    const v = (window.KOMIKS_DATA || {}).version || '';
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
    libs = Promise.all([window.Peer ? null : load('assets/vendor/peerjs.min.js'), window.qrcode ? null : load('assets/vendor/qrcode.js')]).catch(e => { libs = null; throw e; });
    return libs;
  }
  const qrSvg = url => { try { const q = window.qrcode(0, 'M'); q.addData(url); q.make(); return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); } catch { return ''; } };
  let session = null;
  const endSession = () => { if (session) { try { session.destroy(); } catch { /* ignore */ } session = null; } };

  // ведучий: friend=true — він сам грає з одним другом; інакше — монітор турніру класу
  function host(friend) {
    const K = C(), { h } = K;
    endSession();
    const root = scene(friend ? 'cz-play' : 'cz-host');
    const R = { code: genCode(), players: new Map(), phase: 'creating', round: 0, games: new Map(), tc: +K.store.get('chessTime', friend ? 10 : 5), played: new Set(), whites: new Map(), feed: [], hostPlays: !!friend };
    session = R; root.onLeave = () => { if (session === R) endSession(); };
    const send = (p, m) => { if (p && p.conn && p.conn.open) { try { p.conn.send(m); } catch { /* ignore */ } } };
    const broadcast = m => R.players.forEach(p => send(p, m));
    R.destroy = () => { broadcast({ t: 'closed' }); clearInterval(R.clock); setTimeout(() => { try { R.peer && R.peer.destroy(); } catch { /* ignore */ } }, 150); };
    const HOST = 'host';
    if (R.hostPlays) R.players.set(HOST, { pid: HOST, name: myName(), avatar: myAvatar(), elo: myElo(), online: true, local: true, pts: 0 });
    const list = () => [...R.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: p.online, pts: p.pts || 0 }));
    const table_ = () => [...R.players.values()].sort((a, b) => (b.pts || 0) - (a.pts || 0) || (b.elo || 0) - (a.elo || 0)).map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, pts: p.pts || 0 }));
    let myG = null; // партія ведучого (режим «з другом»)
    const toast = text => { R.feed.unshift(text); R.feed = R.feed.slice(0, 4); if (!R.hostPlays) draw(); };
    // пари: за очками, без повторних зустрічей; непарний — вихідний (+1)
    function pair() {
      const pool = [...R.players.values()].filter(p => p.online).sort((a, b) => (b.pts || 0) - (a.pts || 0) || Math.random() - 0.5);
      const pairs = [];
      while (pool.length > 1) {
        const a = pool.shift();
        let j = pool.findIndex(b => !R.played.has([a.pid, b.pid].sort().join('|'))); if (j < 0) j = 0;
        const b = pool.splice(j, 1)[0];
        const wa = R.whites.get(a.pid) || 0, wb = R.whites.get(b.pid) || 0;
        pairs.push(wa <= wb ? [a, b] : [b, a]);
      }
      return { pairs, bye: pool[0] || null };
    }
    function startRound() {
      const online = [...R.players.values()].filter(p => p.online);
      if (online.length < 2) { alert(tx('need2')); return; }
      R.round++; R.phase = 'play'; R.games.clear();
      const { pairs, bye } = pair();
      if (bye) { bye.pts = (bye.pts || 0) + 1; send(bye, { t: 'bye', round: R.round }); toast(tx('bye', bye.name)); }
      pairs.forEach(([w, b], k) => {
        const gid = R.round + '-' + k, st = E.fromFEN(E.START);
        const g = { gid, w: w.pid, b: b.pid, st, keys: [E.posKey(st)], sans: [], last: null, over: null, clocks: R.tc ? { w: R.tc * 60000, b: R.tc * 60000 } : null, tickAt: Date.now() };
        R.games.set(gid, g); R.played.add([w.pid, b.pid].sort().join('|')); R.whites.set(w.pid, (R.whites.get(w.pid) || 0) + 1);
        for (const [p, color, opp] of [[w, 'w', b], [b, 'b', w]]) {
          if (p.local) startMine(g, color, opp);
          else send(p, { t: 'game', gid, color, fen: E.START, opp: { name: opp.name, avatar: opp.avatar, elo: opp.elo || 800 }, me: { name: p.name, avatar: p.avatar, elo: p.elo || 800 }, tc: R.tc, clocks: g.clocks, round: R.round });
        }
      });
      if (window.KomiksMusic) window.KomiksMusic.play('race');
      draw();
    }
    const stateMsg = g => ({ t: 'state', gid: g.gid, fen: E.toFEN(g.st), last: g.last, sans: g.sans, over: g.over, clocks: g.clocks });
    const toBoth = (g, m) => { for (const pid of [g.w, g.b]) { const p = R.players.get(pid); if (p && !p.local) send(p, m); } };
    function finishGame(g, over) {
      if (g.over) return;
      g.over = over;
      const pw = R.players.get(g.w), pb = R.players.get(g.b);
      if (over.winner === 'w') pw.pts = (pw.pts || 0) + 1; else if (over.winner === 'b') pb.pts = (pb.pts || 0) + 1; else { pw.pts = (pw.pts || 0) + 0.5; pb.pts = (pb.pts || 0) + 0.5; }
      toBoth(g, stateMsg(g));
      broadcast({ t: 'standings', table: table_() });
      if (myG && myG.gid === g.gid && !myG.G.over) myG.G.end(over);
      toast(`${pw.name} – ${pb.name}: ${over.winner === 'w' ? '1–0' : over.winner === 'b' ? '0–1' : '½–½'}`);
      if ([...R.games.values()].every(x => x.over)) R.phase = 'between';
      draw();
    }
    // хід від будь-кого: ведучий перевіряє чергу й правила
    function applyMove(g, pid, mv) {
      if (!g || g.over) return false;
      const color = g.st.t; if ((color === 'w' ? g.w : g.b) !== pid) return false;
      const m = E.legal(g.st).find(x => x.f === mv.f && x.to === mv.to && (x.promo || '') === (mv.promo || ''));
      if (!m) { const p = R.players.get(pid); if (p && !p.local) send(p, stateMsg(g)); return false; }
      if (g.clocks) g.clocks[color] -= Date.now() - g.tickAt;
      g.sans.push(E.san(g.st, m)); g.st = E.make(g.st, m); g.keys.push(E.posKey(g.st)); g.last = { f: m.f, to: m.to }; g.tickAt = Date.now();
      const stt = E.status(g.st, g.keys);
      toBoth(g, stateMsg(g));
      if (stt === 'mate') finishGame(g, { winner: color, reason: 'mate' });
      else if (['stalemate', 'fifty', 'repetition', 'material'].includes(stt)) finishGame(g, { winner: null, reason: stt });
      else if (!R.hostPlays) draw();
      return true;
    }
    // партія на екрані ведучого (режим «з другом»)
    function startMine(g, color, opp) {
      const G = table({ players: { [color]: { name: myName(), avatar: myAvatar(), elo: myElo() }, [color === 'w' ? 'b' : 'w']: { name: opp.name, avatar: opp.avatar, elo: opp.elo } }, me: color, tc: R.tc, localClock: false,
        onMove: (m, gg, byUser) => { if (byUser) applyMove(g, HOST, m); },
        onResign: () => finishGame(g, { winner: color === 'w' ? 'b' : 'w', reason: 'resign' }),
        extraBtns: () => h('button', { class: 'cz-btn', type: 'button', onclick: () => { const o = R.players.get(color === 'w' ? g.b : g.w); send(o, { t: 'drawoffer', gid: g.gid, from: myName() }); toastMine(tx('draw_sent')); } }, tx('draw_offer')),
        onEnd: res => { const score = res.winner ? (res.winner === color ? 1 : 0) : 0.5; const elo = recordResult(score, opp.elo || 800, opp.name, 'online'); resultModal(res, color, { elo, again: () => { R.phase = 'between'; startRound(); } }); } });
      myG = { gid: g.gid, G, color };
      root.replaceChildren(h('div', { class: 'cz-head' }, h('a', { class: 'lr-link', href: '#/chess', onclick: endSession }, '← ' + tx('title')), h('b', {}, `${myName()} ${tx('vs')} ${opp.name}`), h('span', { class: 'lr-chip' }, tx('code') + ': ' + R.code)), G.root);
    }
    const toastMine = text => { if (!myG) return; const n = h('div', { class: 'cz-toast' }, text); myG.G.root.append(n); setTimeout(() => n.remove(), 3500); };
    // годинники на боці ведучого (він суддя)
    R.clock = setInterval(() => {
      if (!root.isConnected) return;
      for (const g of R.games.values()) {
        if (g.over || !g.clocks) continue;
        const left = g.clocks[g.st.t] - (Date.now() - g.tickAt);
        if (left <= 0) { g.clocks[g.st.t] = 0; finishGame(g, { winner: g.st.t === 'w' ? 'b' : 'w', reason: 'time' }); }
      }
      if (!R.hostPlays && R.phase === 'play') { const el = root.querySelector('.cz-host-clock'); if (el) draw(); }
    }, 1000);
    function draw() {
      if (!root.isConnected) return;
      if (R.hostPlays && myG && R.phase !== 'lobby') { myG.G.draw(); return; }
      const url = baseUrl() + '#/chess/join/' + R.code;
      if (R.phase === 'creating' || R.phase === 'error') { root.replaceChildren(h('div', { class: 'cz-menu' }, h('h1', {}, tx('title')), h('p', {}, R.phase === 'error' ? tx('err_net') : '⏳ ' + tx('creating')), h('a', { class: 'lr-link', href: '#/chess' }, '←'))); return; }
      const qrCard = h('div', { class: 'box cz-qr-card' }, h('div', { class: 'cz-qr' }, K.svgEl(qrSvg(url))), h('p', {}, tx('scan')), h('code', {}, url), h('div', { class: 'cz-code' }, R.code),
        h('button', { class: 'btn small', type: 'button', onclick: e => { navigator.clipboard && navigator.clipboard.writeText(url); e.target.textContent = tx('copied'); } }, tx('copy')), location.protocol === 'file:' ? h('p', { class: 'lr-warn' }, tx('local_warn')) : null);
      const tcPick = h('div', { class: 'cz-opts' }, h('span', {}, tx('time')), [0, 3, 5, 10, 15].map(m => h('button', { type: 'button', class: 'cz-chip' + (R.tc === m ? ' on' : ''), onclick: () => { R.tc = m; K.store.set('chessTime', m); draw(); } }, m ? tx('min', m) : tx('none'))));
      const standings = h('div', { class: 'box cz-standings' }, h('h3', {}, tx('standings')), h('ol', {}, table_().map((p, i) => h('li', {}, h('span', { class: 'n' }, i + 1), AV(p.avatar, { size: 32 }), h('b', {}, p.name), h('i', {}, `${p.pts} ${tx('pts')}`)))));
      if (R.phase === 'lobby') {
        const pl = [...R.players.values()].filter(p => !p.local);
        root.replaceChildren(h('div', { class: 'cz-lobby' }, h('div', { class: 'cz-head' }, h('a', { class: 'lr-link', href: '#/chess', onclick: endSession }, '← ' + tx('title')), h('h2', {}, R.hostPlays ? tx('room') : tx('host'))),
          h('div', { class: 'cz-grid2' }, qrCard, h('div', { class: 'box' }, R.hostPlays ? h('p', { class: 'lead-p' }, tx('room_wait')) : null, tcPick,
            h('h3', {}, tx('players', pl.filter(p => p.online).length)),
            pl.length ? h('div', { class: 'cz-lobby-list' }, pl.map(p => h('div', { class: 'cz-lobby-p' + (p.online ? '' : ' off') }, AV(p.avatar, { size: 56 }), h('b', {}, p.name), h('small', {}, p.elo || '')))) : h('p', { class: 'hint' }, tx('waiting')),
            R.hostPlays ? null : h('div', { class: 'row-left' }, h('button', { class: 'btn accent big', type: 'button', disabled: pl.filter(p => p.online).length < 2, onclick: startRound }, tx('start')), h('a', { class: 'btn', href: '#/chess', onclick: endSession }, tx('close')))))));
        return;
      }
      if (R.phase === 'final') {
        const board = table_().map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.pts + ' ' + tx('pts') }));
        root.replaceChildren(h('div', { class: 'cz-menu' }, h('h1', {}, tx('final')), window.KomiksAvatars ? window.KomiksAvatars.podium(board, { fmt: v => v, show: true }) : null, standings, h('div', { class: 'row-center' }, h('a', { class: 'btn', href: '#/chess', onclick: endSession }, tx('close')))));
        return;
      }
      // турнір: міні-дошки всіх партій + таблиця
      const games = [...R.games.values()];
      const mini = g => { const pw = R.players.get(g.w), pb = R.players.get(g.b); const fmt = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
        const cl = c => (g.clocks ? fmt(g.clocks[c] - (!g.over && g.st.t === c ? Date.now() - g.tickAt : 0)) : '');
        return h('div', { class: 'cz-mini' + (g.over ? ' over' : '') }, h('div', { class: 'cz-mini-p' }, AV(pb.avatar, { size: 26 }), h('b', {}, pb.name), h('i', { class: 'cz-host-clock' }, cl('b'))), boardEl({ st: g.st, last: g.last, sel: -1, three: false, flip: false }),
          h('div', { class: 'cz-mini-p' }, AV(pw.avatar, { size: 26 }), h('b', {}, pw.name), h('i', { class: 'cz-host-clock' }, cl('w'))), h('small', { class: 'cz-mini-res' }, g.over ? (g.over.winner === 'w' ? '1–0' : g.over.winner === 'b' ? '0–1' : '½–½') + ' · ' + (tx('reasons')[g.over.reason] || '') : `${tx('in_progress')} · ${g.sans.length} ${tx('moves').toLowerCase()}`)); };
      root.replaceChildren(h('div', { class: 'cz-monitor' },
        h('div', { class: 'cz-head' }, h('b', { class: 'cz-logo' }, tx('title')), h('span', { class: 'lr-chip' }, tx('round', R.round)), h('span', { class: 'lr-chip' }, tx('code') + ': ' + R.code), R.tc ? h('span', { class: 'lr-chip' }, '⏱ ' + tx('min', R.tc)) : null),
        R.feed.length ? h('div', { class: 'cz-feed' }, R.feed.map(f => h('span', {}, f))) : null,
        h('div', { class: 'cz-monitor-grid' }, h('div', { class: 'cz-minis' }, games.map(mini)), h('div', {}, standings,
          h('div', { class: 'box' }, R.phase === 'between' ? h('button', { class: 'btn accent big', type: 'button', onclick: startRound }, tx('next_round', R.round + 1)) : null,
            h('button', { class: 'btn', type: 'button', onclick: () => { R.phase = 'final'; const board = table_().map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.pts + ' ' + tx('pts') })); broadcast({ t: 'end', board }); if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: 'chess-' + R.code + '-' + R.round, topic: tx('title'), total: R.round, board: table_().map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: Math.round(p.pts * 100), correct: p.pts, answered: R.round })) }); K.confetti(); K.Sfx.win(); draw(); } }, tx('finish')),
            h('p', { class: 'hint' }, tx('scan')), h('div', { class: 'cz-qr small' }, K.svgEl(qrSvg(url))))))));
    }
    const onMessage = (conn, m) => {
      if (!m || typeof m !== 'object') return;
      const p = [...R.players.values()].find(x => x.conn === conn);
      if (m.t === 'hello') {
        const pid = String(m.pid || '').slice(0, 40); if (!pid || pid === HOST) return;
        if (R.hostPlays && !R.players.has(pid) && [...R.players.values()].filter(x => !x.local).length >= 1) { try { conn.send({ t: 'full' }); } catch { /* ignore */ } return; }
        const ok = window.KomiksAvatars ? window.KomiksAvatars.valid(m.avatar) : true;
        const np = Object.assign(R.players.get(pid) || { pts: 0 }, { pid, name: String(m.name || '?').slice(0, 20), avatar: ok ? m.avatar : '🙂', conn, online: true, elo: Math.max(100, Math.min(3000, m.elo | 0 || 800)) });
        R.players.set(pid, np);
        send(np, { t: 'welcome' }); broadcast({ t: 'lobby', players: list() });
        // повернувся посеред партії — надсилаємо її стан
        for (const g of R.games.values()) if ((g.w === pid || g.b === pid) && !g.over) { const color = g.w === pid ? 'w' : 'b', opp = R.players.get(color === 'w' ? g.b : g.w); send(np, { t: 'game', gid: g.gid, color, fen: E.toFEN(g.st), sans: g.sans, last: g.last, opp: { name: opp.name, avatar: opp.avatar, elo: opp.elo || 800 }, me: { name: np.name, avatar: np.avatar, elo: np.elo }, tc: R.tc, clocks: g.clocks, round: R.round }); }
        K.Sfx.tick();
        if (R.hostPlays && R.phase === 'lobby') startRound(); else draw();
        return;
      }
      if (!p) return;
      const g = R.games.get(m.gid);
      if (m.t === 'move') { if (applyMove(g, p.pid, m) && myG && g && myG.gid === g.gid) myG.G.setRemote(E.toFEN(g.st), g.last, g.sans, g.clocks); }
      else if (m.t === 'resign' && g && !g.over && (g.w === p.pid || g.b === p.pid)) finishGame(g, { winner: g.w === p.pid ? 'b' : 'w', reason: 'resign' });
      else if (m.t === 'drawoffer' && g && !g.over) { const oppPid = g.w === p.pid ? g.b : g.w; const o = R.players.get(oppPid); if (o && o.local) drawAsk(g, p.name); else send(o, { t: 'drawoffer', gid: g.gid, from: p.name }); }
      else if (m.t === 'drawok' && g && !g.over) finishGame(g, { winner: null, reason: 'agree' });
    };
    function drawAsk(g, from) { if (!myG) return; const box = h('div', { class: 'cz-toast ask' }, tx('draw_in', from), h('button', { class: 'btn small', type: 'button', onclick: () => { box.remove(); finishGame(g, { winner: null, reason: 'agree' }); } }, tx('accept')), h('button', { class: 'btn small', type: 'button', onclick: () => box.remove() }, tx('decline'))); myG.G.root.append(box); }
    loadLibs().then(() => {
      const open = () => {
        R.peer = new window.Peer(PREFIX + R.code, { debug: 0 });
        R.peer.on('open', () => { R.phase = 'lobby'; draw(); });
        R.peer.on('error', err => { if (err.type === 'unavailable-id') { try { R.peer.destroy(); } catch { /* ignore */ } R.code = genCode(); open(); return; } if (R.phase === 'creating') { R.phase = 'error'; draw(); } });
        R.peer.on('connection', conn => { conn.on('data', m => onMessage(conn, m)); conn.on('close', () => { for (const p of R.players.values()) if (p.conn === conn) { p.online = false; for (const g of R.games.values()) if (!g.over && (g.w === p.pid || g.b === p.pid)) setTimeout(() => { if (!p.online && !g.over) finishGame(g, { winner: g.w === p.pid ? 'b' : 'w', reason: 'left' }); }, 60000); } broadcast({ t: 'lobby', players: list() }); draw(); }); });
      };
      open();
    }).catch(() => { R.phase = 'error'; draw(); });
    draw();
    return root;
  }

  /* ================= телефон учасника ================= */
  function join(code) {
    const K = C(), { h } = K;
    endSession();
    const root = scene('cz-play');
    let avatar = myAvatar();
    const saved = K.raw.get('comiks.gameProfile', {});
    const form = () => {
      const codeIn = h('input', { type: 'text', maxlength: 5, value: (code || '').toUpperCase(), autocapitalize: 'characters', class: 'lr-input code' });
      codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      const nameIn = h('input', { type: 'text', maxlength: 20, value: saved.name || (K.currentUser() || {}).name || '', class: 'lr-input' });
      const err = h('p', { class: 'lr-warn' });
      const avBox = window.KomiksProfile ? window.KomiksProfile.joinAvatar(a => { avatar = a; }) : null;
      root.replaceChildren(h('div', { class: 'cz-menu' }, h('form', { class: 'box cz-join', onsubmit: e => {
        e.preventDefault();
        const c = codeIn.value.trim(), n = nameIn.value.trim();
        if (c.length !== 5) { err.textContent = tx('err_code'); return; }
        if (!n) { err.textContent = tx('err_name'); return; }
        K.raw.set('comiks.gameProfile', Object.assign({}, saved, { name: n, avatar }));
        connect(c, n);
      } }, h('h2', {}, tx('join_t')), h('label', { class: 'field' }, h('span', {}, tx('code')), codeIn), h('label', { class: 'field' }, h('span', {}, tx('name')), nameIn), avBox, err, h('button', { class: 'btn accent big', type: 'submit' }, tx('join')))));
    };
    const connect = (c, name) => {
      let pid; try { pid = sessionStorage.getItem('komiks.chess.pid') || ('c' + Math.random().toString(36).slice(2, 10)); sessionStorage.setItem('komiks.chess.pid', pid); } catch { pid = 'c' + Math.random().toString(36).slice(2, 10); }
      const P = { phase: 'connecting', G: null, gid: null, color: null, table: [] };
      session = P; root.onLeave = () => { if (session === P) endSession(); };
      P.destroy = () => { try { P.conn && P.conn.close(); } catch { /* ignore */ } try { P.peer && P.peer.destroy(); } catch { /* ignore */ } };
      const send = m => { try { P.conn && P.conn.open && P.conn.send(m); } catch { /* ignore */ } };
      const standingsBox = () => P.table.length ? h('div', { class: 'box cz-standings' }, h('h3', {}, tx('standings')), h('ol', {}, P.table.map((p, i) => h('li', { class: p.pid === pid ? 'me' : '' }, h('span', { class: 'n' }, i + 1), AV(p.avatar, { size: 28 }), h('b', {}, p.name), h('i', {}, `${p.pts} ${tx('pts')}`))))) : null;
      const status = (text, extra) => root.replaceChildren(h('div', { class: 'cz-menu' }, h('div', { class: 'box cz-wait' }, AV(avatar, { size: 110, mood: 'cheer' }), h('b', {}, name), h('p', {}, text), extra || null, h('a', { class: 'lr-link', href: '#/chess', onclick: endSession }, '←')), standingsBox()));
      const fail = t => { if (session === P) { P.phase = 'error'; status(t); } };
      status('⏳ ' + tx('connecting'));
      loadLibs().then(() => {
        P.peer = new window.Peer({ debug: 0 });
        const guard = setTimeout(() => { if (P.phase === 'connecting') fail(tx('err_room')); }, 15000);
        P.peer.on('open', () => {
          P.conn = P.peer.connect(PREFIX + c, { reliable: true });
          P.conn.on('open', () => { clearTimeout(guard); send({ t: 'hello', pid, name, avatar, elo: myElo() }); });
          P.conn.on('data', m => {
            if (!m || typeof m !== 'object') return;
            if (m.t === 'welcome' || (m.t === 'lobby' && (P.phase === 'connecting' || P.phase === 'lobby'))) {
              P.phase = 'lobby'; const pl = m.players || P.players || []; if (m.players) P.players = m.players;
              status(tx('wait_round'), h('div', {}, h('h3', {}, tx('in_room')), h('div', { class: 'cz-lobby-list small' }, pl.map(p => h('div', { class: 'cz-lobby-p' + (p.pid === pid ? ' me' : '') }, AV(p.avatar, { size: 40 }), h('b', {}, p.name))))));
            } else if (m.t === 'game') {
              P.phase = 'play'; P.gid = m.gid; P.color = m.color; P.opp = m.opp;
              P.G = table({ players: { [m.color]: m.me, [m.color === 'w' ? 'b' : 'w']: m.opp }, me: m.color, tc: m.tc, localClock: false, fen: m.fen,
                onMove: (mv, G, byUser) => { if (byUser) send({ t: 'move', gid: P.gid, f: mv.f, to: mv.to, promo: mv.promo || '' }); },
                onResign: () => send({ t: 'resign', gid: P.gid }),
                extraBtns: () => h('button', { class: 'cz-btn', type: 'button', onclick: () => { send({ t: 'drawoffer', gid: P.gid }); toast(tx('draw_sent')); } }, tx('draw_offer')),
                onEnd: res => { if (P.recorded === P.gid) return; P.recorded = P.gid; const score = res.winner ? (res.winner === P.color ? 1 : 0) : 0.5; const elo = recordResult(score, (P.opp || {}).elo || 800, (P.opp || {}).name || '?', 'online'); resultModal(res, P.color, { elo }); setTimeout(() => { if (session === P && P.phase === 'play') status(tx('wait_next')); }, 2500); } });
              if (m.sans) P.G.setRemote(m.fen, m.last, m.sans, m.clocks); else if (m.clocks) { P.G.clocks = m.clocks; P.G.tickAt = Date.now(); }
              root.replaceChildren(h('div', { class: 'cz-head' }, h('b', {}, tx('round', m.round || 1)), h('span', {}, `${tx('vs')} ${m.opp.name}`)), P.G.root);
              if (window.KomiksMusic) window.KomiksMusic.play('race');
            } else if (m.t === 'state' && P.G && m.gid === P.gid) {
              P.G.setRemote(m.fen, m.last, m.sans, m.clocks);
              if (m.over && !P.G.over) P.G.end(m.over);
              else if (!m.over) { const stt = E.status(P.G.st); if (stt === 'check') say('Sjakk!'); }
            } else if (m.t === 'drawoffer' && P.G && m.gid === P.gid) {
              const box = h('div', { class: 'cz-toast ask' }, tx('draw_in', m.from || P.opp.name), h('button', { class: 'btn small', type: 'button', onclick: () => { box.remove(); send({ t: 'drawok', gid: P.gid }); } }, tx('accept')), h('button', { class: 'btn small', type: 'button', onclick: () => box.remove() }, tx('decline')));
              P.G.root.append(box);
            } else if (m.t === 'bye') { P.phase = 'lobby'; status(tx('bye', name)); }
            else if (m.t === 'standings') { P.table = m.table || []; }
            else if (m.t === 'end') { P.phase = 'end'; const board = m.board || [], me = board.findIndex(b => b.pid === pid); root.replaceChildren(h('div', { class: 'cz-menu' }, h('h1', {}, tx('final')), window.KomiksAvatars ? window.KomiksAvatars.podium(board, { meId: pid, you: tx('you'), fmt: v => v, show: true }) : null, h('a', { class: 'btn', href: '#/chess', onclick: endSession }, tx('menu')))); if (me >= 0 && me < 3) { K.confetti(); K.Sfx.win(); } }
            else if (m.t === 'full') fail(tx('err_room'));
            else if (m.t === 'closed') fail(tx('host_left'));
          });
          P.conn.on('close', () => { if (P.phase !== 'error' && P.phase !== 'end') fail(tx('host_left')); });
        });
        P.peer.on('error', err => { clearTimeout(guard); fail(err.type === 'peer-unavailable' ? tx('err_room') : tx('err_net')); });
      }).catch(() => fail(tx('err_net')));
      const toast = text => { if (!P.G) return; const n = h('div', { class: 'cz-toast' }, text); P.G.root.append(n); setTimeout(() => n.remove(), 3500); };
    };
    form();
    return root;
  }

  // блок для сторінки рейтингу: драбина шахів
  function ratingBox() {
    const K = C(), { h } = K;
    const ladder = [...ladderBots(), { code: 'ME', name: myName(), avatar: myAvatar(), elo: myElo(), me: true }].sort((a, b) => b.elo - a.elo);
    return h('div', { class: 'box rating-box cz-ladder' }, h('h3', {}, '♟ ' + tx('ladder')), h('ol', {}, ladder.map((p, i) => h('li', { class: p.me ? 'me' : '' }, h('span', { class: 'n' }, i + 1), AV(p.avatar, { size: 30 }), h('b', {}, p.name), h('i', {}, p.elo)))), h('a', { class: 'btn accent', href: '#/chess' }, tx('play')));
  }

  function render(id, arg) {
    if (id === 'bot') return vsBot(String(arg || '').toUpperCase());
    if (id === 'local') return local();
    if (id === 'room') return host(true);
    if (id === 'host') return host(false);
    if (id === 'join') return join(arg);
    return menu();
  }
  window.KomiksChess = { render, ratingBox, engine: E, text: tx, SAY, end: endSession, roomCode: () => (session && session.code && session.phase !== 'final' ? session.code : null) };
})();
