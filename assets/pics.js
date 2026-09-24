/* Комікс·Lab — 🖼️ мальовані іконки для тестів і карток слів.
   Емодзі не мають багатьох шкільних і «тілесних» слів (парта, дошка, гумка, горло, коліно…),
   а деякі збігаються (спідниця = сукня, коліно = нога). Тут — чіткі однозначні малюнки в стилі сайту.
   Ключ — норвезьке слово без артикля (pult, tavle…). window.KomiksPics.el('pult', 120). */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const INK = '#141414';
  // спільні кольори: щоб іконки виглядали як одна родина
  const C = { wood: '#c98f4a', wood2: '#a9702f', paper: '#fffdf5', red: '#ee4035', blue: '#2e86de', green: '#3bb273', yellow: '#ffd23f', skin: '#f6c9a0', grey: '#9aa0a6', pink: '#ff8fb8', dark: '#37474f' };
  const P = {
    // 🏫 школа
    pult: `<path d="M8 26h48v8H8z" fill="${C.wood}"/><path d="M12 34v22M52 34v22M20 34v6h24v-6" fill="none"/><path d="M16 40h32v6H16z" fill="${C.wood2}"/><rect x="24" y="18" width="16" height="8" rx="2" fill="${C.paper}"/>`,
    tavle: `<rect x="6" y="10" width="52" height="34" rx="3" fill="#2f6b4f"/><path d="M14 20h22M14 28h30M14 36h16" stroke="${C.paper}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M6 44h52v6H6z" fill="${C.wood}"/><rect x="40" y="45" width="12" height="4" rx="2" fill="${C.paper}"/>`,
    viskelær: `<path d="M12 38 34 16a6 6 0 0 1 8 0l10 10a6 6 0 0 1 0 8L30 56H16a4 4 0 0 1-4-4z" fill="${C.pink}"/><path d="M26 24l16 16" fill="none"/><path d="M12 48h20" fill="none"/>`,
    friminutt: `<circle cx="32" cy="34" r="20" fill="${C.yellow}"/><path d="M32 22v12l8 6" fill="none" stroke-width="4"/><path d="M12 14l8-6M52 14l-8-6" fill="none" stroke-width="4"/>`,
    lekse: `<rect x="12" y="8" width="40" height="48" rx="4" fill="${C.paper}"/><path d="M20 20h24M20 30h24M20 40h16" fill="none" stroke-width="3"/><path d="M44 48l10-10 6 6-10 10-7 1z" fill="${C.yellow}"/>`,
    prøve: `<rect x="12" y="6" width="40" height="52" rx="4" fill="${C.paper}"/><path d="M20 18h16M20 28h24M20 38h12" fill="none" stroke-width="3"/><path d="M34 44l6 6 12-14" fill="none" stroke="${C.green}" stroke-width="6" stroke-linecap="round"/>`,
    timeplan: `<rect x="8" y="12" width="48" height="44" rx="4" fill="${C.paper}"/><path d="M8 24h48" fill="none" stroke-width="3"/><path d="M24 12V6M40 12V6" stroke-width="4" fill="none"/><path d="M24 24v32M40 24v32M8 38h48" fill="none" stroke-width="2"/><rect x="10" y="26" width="12" height="10" fill="${C.blue}" opacity=".35"/><rect x="42" y="40" width="12" height="10" fill="${C.green}" opacity=".35"/>`,
    // 🧍 тіло
    hals: `<path d="M20 8h24v14c0 6 4 8 10 10v24H10V32c6-2 10-4 10-10z" fill="${C.skin}"/><path d="M24 22c3 4 5 6 8 6s5-2 8-6" fill="none" stroke-width="3"/><circle cx="32" cy="14" r="3" fill="${C.red}"/>`,
    mage: `<path d="M22 10h20v10c8 4 12 12 12 20a22 22 0 0 1-44 0c0-8 4-16 12-20z" fill="${C.skin}"/><circle cx="32" cy="42" r="3" fill="${C.wood2}"/>`,
    rygg: `<path d="M24 8h16l4 12v28l-4 10H24l-4-10V20z" fill="${C.skin}"/><path d="M32 16v36" fill="none" stroke-width="4"/><path d="M26 22h12M26 30h12M26 38h12" fill="none" stroke-width="3"/>`,
    kne: `<path d="M22 4h18v22l4 16-4 18H24l-4-18 2-16z" fill="${C.skin}"/><circle cx="32" cy="32" r="9" fill="#f3b184"/><circle cx="32" cy="32" r="9" fill="none" stroke-width="3"/>`,
    // 👕 одяг
    skjørt: `<path d="M18 12h28l-4 10H22z" fill="${C.blue}"/><path d="M22 22h20l12 30H10z" fill="${C.blue}"/><path d="M26 22l-6 30M38 22l6 30" fill="none" stroke-width="2" opacity=".6"/>`,
    belte: `<path d="M4 26h56v12H4z" fill="${C.wood2}"/><rect x="24" y="20" width="18" height="24" rx="3" fill="${C.yellow}"/><rect x="30" y="26" width="6" height="12" rx="2" fill="${C.paper}"/>`,
    // 🎨 кольори без емодзі
    grå: `<rect x="8" y="8" width="48" height="48" rx="8" fill="${C.grey}"/>`,
    rosa: `<rect x="8" y="8" width="48" height="48" rx="8" fill="${C.pink}"/>`,
    // 👨‍👩‍👧 рідні (емодзі-люди надто схожі)
    onkel: `<circle cx="32" cy="20" r="12" fill="${C.skin}"/><path d="M20 20a12 12 0 0 1 24 0" fill="${C.dark}"/><path d="M24 26c2 6 6 8 8 8s6-2 8-8" fill="none" stroke-width="3"/><path d="M12 56c0-10 9-16 20-16s20 6 20 16z" fill="${C.blue}"/>`,
    tante: `<circle cx="32" cy="20" r="12" fill="${C.skin}"/><path d="M18 22c0-10 6-14 14-14s14 4 14 14c0-4-6-6-14-6s-14 2-14 6z" fill="${C.wood2}"/><path d="M12 56c0-10 9-16 20-16s20 6 20 16z" fill="${C.pink}"/>`,
    fetter: `<circle cx="32" cy="22" r="11" fill="${C.skin}"/><path d="M21 20c2-8 20-8 22 0l-2 4c-2-4-18-4-18 0z" fill="${C.wood2}"/><path d="M14 56c0-9 8-14 18-14s18 5 18 14z" fill="${C.green}"/>`,
    kusine: `<circle cx="32" cy="22" r="11" fill="${C.skin}"/><path d="M21 22c0-9 5-13 11-13s11 4 11 13v10l-4-8c-4 2-14 2-18 0v8z" fill="${C.yellow}"/><path d="M14 56c0-9 8-14 18-14s18 5 18 14z" fill="${C.red}"/>`
  };
  const KEYS = Object.keys(P);   // поповнюється через add()
  const norm = w => String(w || '').toLowerCase().replace(/^(en|ei|et|å)\s+/, '').trim();
  const has = w => Object.prototype.hasOwnProperty.call(P, norm(w));
  const svg = (w, size = 96) => {
    const k = norm(w); if (!has(k)) return '';
    return `<svg class="pic-svg" viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-hidden="true" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round">${P[k]}</svg>`;
  };
  const el = (w, size = 96) => { const d = document.createElement('span'); d.className = 'pic'; d.innerHTML = svg(w, size); return d.firstChild ? d : null; };
  // інші файли можуть дописувати свої іконки (див. pics2.js)
  function add(more) { Object.assign(P, more); KEYS.length = 0; KEYS.push(...Object.keys(P)); }
  window.KomiksPics = { has, svg, el, add, get keys() { return KEYS; } };
})();
