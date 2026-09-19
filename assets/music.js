/* Комікс·Lab — музика для ігор (WebAudio, без файлів): фонові мелодії, барабанний дріб, фанфари й оплески для переможців.
   KomiksMusic.play('race'|'space'|'quiz'|'lobby') — фонова петля; .stop(); .bind(root, track) — грає, поки root на сторінці;
   .ceremony(sig) — дріб + фанфари + оплески під подіум (один раз на результат); .button() — кнопка 🎵/🔇 (стан у localStorage). */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const KEY = 'comiks.music';
  let ctx = null, master = null, timer = null, cur = null, step = 0, nextT = 0, noiseBuf = null, lastSig = '', lastSigAt = 0;
  const isOn = () => { try { return localStorage.getItem(KEY) !== '0'; } catch { return true; } };
  const setOn = v => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* ignore */ } };
  function ac() {
    const S = window.KomiksCore && window.KomiksCore.Sfx;
    if (!ctx) { ctx = (S && S.ctx) || new (window.AudioContext || window.webkitAudioContext)(); if (S) S.ctx = ctx; }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  function noise() {
    if (noiseBuf) return noiseBuf;
    const c = ac(), b = c.createBuffer(1, c.sampleRate, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return (noiseBuf = b);
  }
  // один тон з оглинаючою (м’який «атака — спад»)
  function note(t, midi, dur, type, vol, dest, cutoff) {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = hz(midi);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = o;
    if (cutoff) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff; o.connect(f); node = f; }
    node.connect(g).connect(dest); o.start(t); o.stop(t + dur + 0.05);
  }
  function kick(t, dest, vol = 0.8) {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.13);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g).connect(dest); o.start(t); o.stop(t + 0.2);
  }
  function hiss(t, dest, { vol = 0.3, dur = 0.12, hp = 1200 } = {}) {
    const c = ac(), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noise(); f.type = 'highpass'; f.frequency.value = hp;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(dest); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  }

  /* ---------- треки: 4 такти по 16 шістнадцятих; мелодія — вісімки (індекс у гамі або '-') ---------- */
  const TRACKS = {
    // 🏁 гонка — бадьорий мажор, «біг»
    race: { bpm: 150, lead: 'square', leadVol: 0.05, cutoff: 2600,
      scale: [72, 74, 76, 79, 81, 84, 86, 88, 91],
      prog: [[48, 'M'], [45, 'm'], [41, 'M'], [43, 'M']],
      mel: '0 2 4 2 3 4 5 - 4 3 2 - 2 3 4 - 3 - 3 4 5 4 3 2 1 2 3 1 4 - - -',
      kick: [0, 4, 8, 12], snare: [4, 12], hat: [2, 6, 10, 14], bass: 'x-x-x-xxx-x-x-xx' },
    // 🚀 космос — мінорні арпеджіо
    space: { bpm: 112, lead: 'triangle', leadVol: 0.06, arp: true,
      scale: [69, 72, 74, 76, 79, 81, 84, 86],
      prog: [[45, 'm'], [41, 'M'], [43, 'M'], [40, 'm']],
      mel: '4 - - 3 2 - 0 - 1 - 2 - 4 - - - 3 - - 2 1 - 0 - 2 - 1 - 0 - - -',
      kick: [0, 10], snare: [4, 12], hat: [2, 6, 10, 14], bass: 'x---x---x-x-x---' },
    // 🎮 вікторина — легка «маримба»
    quiz: { bpm: 118, lead: 'sine', leadVol: 0.09,
      scale: [65, 67, 69, 72, 74, 77, 79, 81],
      prog: [[41, 'M'], [38, 'm'], [46, 'M'], [48, 'M']],
      mel: '2 3 4 - 3 2 0 - 1 2 3 - 5 - 4 - 3 - 4 5 4 3 2 - 1 - 2 3 4 - - -',
      kick: [0, 8], snare: [12], hat: [4, 12], bass: 'x-----x-x-------' },
    // 🛋️ лобі — спокійно, без малого барабана
    lobby: { bpm: 92, lead: 'sine', leadVol: 0.07,
      scale: [60, 62, 64, 67, 69, 72, 74, 76],
      prog: [[48, 'M'], [45, 'm'], [41, 'M'], [43, 'M']],
      mel: '4 - 3 - 2 - - - 3 - 2 - 1 - - - 2 - 3 - 4 - 5 - 4 - 3 - 2 - - -',
      kick: [0], snare: [], hat: [8], bass: 'x-------x-------' }
  };
  const tones = q => (q === 'm' ? [0, 3, 7] : [0, 4, 7]);
  function playStep(T, s, t) {
    const sp = 60 / T.bpm / 4, i = s % 16, [root, q] = T.prog[s >> 4], ch = tones(q);
    if (T.kick.includes(i)) kick(t, master, 0.55);
    if (T.snare.includes(i)) hiss(t, master, { vol: 0.16, dur: 0.14, hp: 1400 });
    if (T.hat.includes(i)) hiss(t, master, { vol: 0.05, dur: 0.04, hp: 7000 });
    if (T.bass[i] === 'x') note(t, root - 12 + (i === 6 || i === 14 ? 7 : 0), sp * 1.8, 'triangle', 0.16, master);
    if (i === 0) ch.forEach(d => note(t, root + 12 + d, sp * 15, 'triangle', 0.025, master, 1800));
    if (T.arp) note(t, root + 24 + ch[i % 3] + (i % 6 > 2 ? 12 : 0), sp * 0.9, 'sawtooth', 0.018, master, 1600);
    if (i % 2 === 0) { const tok = T.mel[s >> 1]; if (tok !== '-') note(t, T.scale[+tok], sp * 1.8, T.lead, T.leadVol, master, T.cutoff); }
  }
  function prep(T) { if (typeof T.mel === 'string') T.mel = T.mel.split(' '); return T; }
  function sched() {
    if (!cur || !master) return;
    const c = ac(), T = prep(TRACKS[cur]);
    if (document.hidden) { nextT = c.currentTime + 0.1; return; }
    if (nextT < c.currentTime) nextT = c.currentTime + 0.05;
    while (nextT < c.currentTime + 0.15) { playStep(T, step, nextT); nextT += 60 / T.bpm / 4; step = (step + 1) % 64; }
  }
  function play(track) {
    if (!TRACKS[track]) return;
    if (cur === track && timer) return;
    stop();
    cur = track;
    if (!isOn()) return;
    try {
      const c = ac();
      master = c.createGain(); master.gain.setValueAtTime(0.0001, c.currentTime); master.gain.exponentialRampToValueAtTime(0.32, c.currentTime + 0.8);
      master.connect(c.destination);
      step = 0; nextT = c.currentTime + 0.1;
      timer = setInterval(sched, 25);
    } catch { /* no audio */ }
  }
  function stop(keepTrack) {
    clearInterval(timer); timer = null;
    if (master) { const m = master, c = ac(); try { m.gain.cancelScheduledValues(c.currentTime); m.gain.setValueAtTime(m.gain.value, c.currentTime); m.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.4); } catch { /* ignore */ } setTimeout(() => { try { m.disconnect(); } catch { /* ignore */ } }, 500); }
    master = null;
    if (!keepTrack) cur = null;
  }
  // грає, поки елемент на сторінці; зникне — музика стихне
  let owner = null;
  function bind(root, track) {
    owner = root;
    if (track) play(track);
    const w = setInterval(() => { if (!root.isConnected) { clearInterval(w); if (owner === root) { owner = null; stop(); } } }, 400);
  }

  /* ---------- для переможців ---------- */
  function fx() { const c = ac(), g = c.createGain(); g.gain.value = 0.5; g.connect(c.destination); return { c, g }; }
  function drumroll(sec = 2) {
    if (!isOn()) return;
    try { const { c, g } = fx(); const t0 = c.currentTime + 0.05; for (let t = 0; t < sec; t += 0.045) hiss(t0 + t, g, { vol: 0.05 + 0.25 * (t / sec), dur: 0.06, hp: 900 }); kick(t0 + sec, g, 0.9); } catch { /* no audio */ }
  }
  function fanfare(delay = 0) {
    if (!isOn()) return;
    try {
      const { c, g } = fx(); const t0 = c.currentTime + 0.05 + delay, b = 0.13;
      // та-да-да-ДАМ: G4 C5 E5 G5 … C6
      [[67, 0, 1], [72, 1, 1], [76, 2, 1], [79, 3, 2], [76, 5, 1], [79, 6, 1], [84, 7, 6]].forEach(([m, at, len]) => {
        note(t0 + at * b, m, len * b + 0.25, 'sawtooth', 0.09, g, 2400);
        note(t0 + at * b, m - 12, len * b + 0.2, 'square', 0.035, g, 1400);
      });
      [60, 64, 67, 72].forEach(m => note(t0 + 7 * b, m, 1.4, 'triangle', 0.06, g));
      kick(t0 + 7 * b, g, 0.9);
    } catch { /* no audio */ }
  }
  function applause(sec = 2.4, delay = 0) {
    if (!isOn()) return;
    try { const { c, g } = fx(); const t0 = c.currentTime + delay; for (let i = 0; i < sec * 55; i++) { const t = t0 + Math.random() * sec; const fade = 1 - (t - t0) / sec; hiss(t, g, { vol: 0.04 + 0.08 * fade * Math.random(), dur: 0.03, hp: 1500 + Math.random() * 3000 }); } } catch { /* no audio */ }
  }
  // церемонія під подіум: 3-є місце (0,3 с) → 2-ге (1,2 с) → 1-ше (2,2 с) з фанфарами
  function ceremony(sig = '') {
    if (sig && sig === lastSig && Date.now() - lastSigAt < 30000) return;
    lastSig = sig; lastSigAt = Date.now();
    stop(true);
    drumroll(2.1); fanfare(2.15); applause(2.6, 2.9);
  }

  function button(cls = '') {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'music-btn ' + cls;
    const paint = () => { const on = isOn(); b.textContent = on ? '🎵' : '🔇'; b.setAttribute('aria-pressed', String(on)); b.title = on ? 'Music: on' : 'Music: off'; b.setAttribute('aria-label', b.title); };
    b.addEventListener('click', () => { const on = !isOn(); setOn(on); if (on) { const t = cur; cur = null; if (t) play(t); } else stop(true); paint(); });
    paint();
    return b;
  }
  window.KomiksMusic = { play, stop: () => stop(), bind, ceremony, fanfare, drumroll, applause, button, isOn, tracks: Object.keys(TRACKS) };
})();
