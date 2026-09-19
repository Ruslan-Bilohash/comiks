/* Комікс·Lab — єдиний набір іконок (SVG, лінійний стиль 24×24) замість емодзі в тестах, плитках і модулях.
   KomiksIcons.svg(name) — рядок SVG; .el(name) — DOM-вузол; .chip(type, label) — мітка типу завдання;
   .forKey(key) — іконка для плитки тесту за ключем прогресу; .strip(text) — прибрати емодзі на початку. */
(() => {
  'use strict';
  const P = {
    headphones: '<path d="M3 15v-3a9 9 0 0 1 18 0v3"/><path d="M3 15h3.5v6H4.5A1.5 1.5 0 0 1 3 19.5z"/><path d="M21 15h-3.5v6h2a1.5 1.5 0 0 0 1.5-1.5z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 12h18M12 3v18"/>',
    sort: '<path d="M4 6h9M4 12h6M4 18h3"/><path d="M17 4v16M14 17l3 3 3-3"/>',
    pencil: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    checkx: '<path d="M3 12.5l3 3 6-6.5"/><path d="M15 9l6 6M21 9l-6 6"/>',
    speech: '<path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.8-5.3A8.5 8.5 0 1 1 21 11.5z"/><path d="M8 10.5h8M8 14h5"/>',
    abc: '<path d="M3 19l5-14 5 14M4.8 14.5h6.4"/><path d="M17.5 11a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM20.5 11v8"/>',
    hash: '<path d="M5 9h15M4 15h15M10 3L8 21M16 3l-2 18"/>',
    book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 19.5A2 2 0 0 0 6 21h13"/><path d="M9 7h6M9 11h4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8 6.5h8M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
    rocket: '<path d="M5 15.5c-1.4 1.2-2 4.5-2 4.5s3.3-.6 4.5-2c.7-.8.7-2-.1-2.7a2 2 0 0 0-2.4.2z"/><path d="M12 15l-3-3a21 21 0 0 1 2-3.9A12.9 12.9 0 0 1 21.5 2.5c0 2.6-.8 7.2-5.5 10.5a22 22 0 0 1-4 2z"/><path d="M9 12H4.5s.6-2.9 2-3.9c1.5-1 4.5 0 4.5 0M12 15v4.5s2.9-.6 3.9-2c1-1.5 0-4.5 0-4.5"/>',
    trophy: '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    gamepad: '<rect x="2" y="6.5" width="20" height="11" rx="5.5"/><path d="M6.5 12h4M8.5 10v4M15.5 11.5h.01M18 13h.01"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20.5a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20.5a6.5 6.5 0 0 0-4-6"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    checklist: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 8l1.5 1.5L12 7M14.5 8.5H16M8 13l1.5 1.5L12 12M14.5 13.5H16M8 17.5h8"/>',
    tag: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    comic: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 11h9V3M12 11v10"/><path d="M15 6.5h3M15 9h2"/>',
    level: '<path d="M4 20v-5M10 20V10M16 20V4M2 20h20"/>',
    star: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    fire: '<path d="M12 3c.8 3.4 5 5.6 5 10.2a5 5 0 0 1-10 0c0-2.1 1-3.6 2.2-4.6.2 1.6.9 2.6 1.9 3.1-.1-3.2.1-6 .9-8.7z"/>',
    chess: '<path d="M7 21h10"/><path d="M8 18h8l-1-4c2-1.5 2.5-4.5.5-7L13 4.5 12 6l-3 1.5L7 12l3-1 .5 3z"/><path d="M11 8.5h.01"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h12l-2.5 4.5L17 13H5"/>',
    heart: '<path d="M12 20s-7.5-4.6-9-9.5C2 7 4.3 4 7.5 4c1.9 0 3.4 1 4.5 2.6C13.1 5 14.6 4 16.5 4 19.7 4 22 7 21 10.5 19.5 15.4 12 20 12 20z"/>'
  };
  // тип завдання → [іконка, колір]
  const TYPES = {
    who: ['speech', '#7e57c2'], panel: ['layout', '#1e88e5'], order: ['sort', '#00897b'], listen: ['headphones', '#d81b60'],
    picture: ['image', '#f4511e'], blank: ['pencil', '#3949ab'], type: ['keyboard', '#546e7a'], truefalse: ['checkx', '#2e7d32'],
    letter: ['abc', '#8e24aa'], firstletter: ['abc', '#8e24aa'], number: ['hash', '#ef6c00'], numword: ['hash', '#ef6c00'], numtype: ['keyboard', '#ef6c00'],
    grammar: ['book', '#5e35b1'], clock: ['clock', '#00838f'], emoji: ['smile', '#f9a825'], speaker: ['eye', '#6d4c41'], math: ['calc', '#e53935']
  };
  const MODULES = { race: ['flag', '#1565c0'], chess: ['chess', '#37474f'], game: ['gamepad', '#e53935'], words: ['tag', '#00897b'], grammar: ['book', '#5e35b1'], english: ['globe', '#1e88e5'], math: ['calc', '#ef6c00'],
    alphabet: ['abc', '#8e24aa'], numbers: ['hash', '#f9a825'], plan: ['map', '#43a047'], tests: ['checklist', '#d81b60'], rating: ['trophy', '#ffb300'], cards: ['layout', '#546e7a'] };
  const svg = (name, size = 24) => `<svg class="ic ic-${name}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.star}</svg>`;
  const el = (name, size) => { const t = document.createElement('template'); t.innerHTML = svg(name, size); return t.content.firstChild; };
  const strip = text => String(text || '').replace(/^[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍\s]+/u, '');
  // мітка типу завдання: кольорова іконка + текст
  function chip(type, label) {
    const [ic, col] = TYPES[type] || ['star', '#546e7a'];
    const s = document.createElement('span');
    s.className = 'q-type q-chip'; s.style.setProperty('--c', col);
    s.append(el(ic, 16), document.createTextNode(strip(label)));
    return s;
  }
  // іконка для плитки тесту за ключем прогресу
  function forKey(key) {
    const k = String(key || '');
    if (k.startsWith('level:')) return ['level', '#3949ab'];
    if (k === 'alphabet') return ['abc', '#8e24aa'];
    if (k === 'numbers') return ['hash', '#ef6c00'];
    if (k === 'clock') return ['clock', '#00838f'];
    if (k.startsWith('grammar')) return ['book', '#5e35b1'];
    if (k.startsWith('words')) return ['tag', '#00897b'];
    if (k.startsWith('enw')) return ['tag', '#1e88e5'];
    if (k.startsWith('en:')) return ['globe', '#1e88e5'];
    if (k === 'rocket') return ['rocket', '#e53935'];
    if (k.startsWith('chess')) return ['chess', '#37474f'];
    if (k.startsWith('race')) return ['flag', '#2e7d32'];
    if (k.startsWith('math')) return ['calc', '#ef6c00'];
    return ['comic', '#f4511e'];
  }
  function badge(name, color, size = 22) {
    const s = document.createElement('span');
    s.className = 'ic-badge'; s.style.setProperty('--c', color);
    s.append(el(name, size));
    return s;
  }
  window.KomiksIcons = { svg, el, chip, forKey, badge, strip, TYPES, MODULES, names: Object.keys(P) };
})();
