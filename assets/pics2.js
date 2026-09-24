/* Комікс·Lab — 🖼️ мальовані іконки, частина 2: дім, кухня, їжа, школа, місто, природа, робота.
   Емодзі в тестах часто незрозумілі (у різних телефонах різні малюнки, а частина слів взагалі
   не має емодзі). Тут — чіткі однозначні малюнки в тому самому стилі, що й pics.js.
   Ключ — норвезьке слово без артикля. Файл лише дописує іконки в window.KomiksPics. */
(() => {
  'use strict';
  if (typeof document === 'undefined' || !window.KomiksPics) return;
  const C = { wood: '#c98f4a', wood2: '#a9702f', paper: '#fffdf5', red: '#ee4035', blue: '#2e86de', green: '#3bb273',
    yellow: '#ffd23f', skin: '#f6c9a0', grey: '#9aa0a6', pink: '#ff8fb8', dark: '#37474f', sky: '#bfe3ff', brown: '#8d6e63' };
  const P = {
    // 🏠 дім
    seng: `<path d="M6 40h52v16H6z" fill="${C.wood}"/><path d="M6 56v6M58 56v6" /><path d="M10 26h20v14H10z" fill="${C.paper}"/><path d="M30 30h24v10H30z" fill="${C.blue}"/><path d="M6 40h52" />`,
    stol: `<path d="M16 30h32v8H16z" fill="${C.wood}"/><path d="M16 12h8v26h-8z" fill="${C.wood2}"/><path d="M20 38v16M44 38v16M20 46h24" />`,
    dør: `<rect x="14" y="8" width="36" height="48" rx="3" fill="${C.wood}"/><rect x="20" y="14" width="24" height="16" rx="2" fill="${C.wood2}"/><circle cx="42" cy="36" r="3" fill="${C.yellow}"/>`,
    vindu: `<rect x="8" y="10" width="48" height="40" rx="3" fill="${C.sky}"/><path d="M32 10v40M8 30h48" stroke-width="4"/><rect x="8" y="10" width="48" height="40" rx="3" fill="none"/>`,
    lampe: `<path d="M20 16h24l8 14H12z" fill="${C.yellow}"/><path d="M32 30v14" /><circle cx="32" cy="50" r="7" fill="${C.paper}"/>`,
    speil: `<rect x="16" y="8" width="32" height="44" rx="16" fill="${C.sky}"/><rect x="16" y="8" width="32" height="44" rx="16" fill="none"/><path d="M24 20c0 8 4 14 10 18" stroke="${C.paper}" stroke-width="4"/>`,
    teppe: `<path d="M8 22h48v24H8z" fill="${C.red}"/><path d="M8 22h48v24H8z" fill="none"/><path d="M16 22v24M32 22v24M48 22v24" stroke="${C.paper}" stroke-width="2"/>`,
    // 🍳 кухня й посуд
    kopp: `<path d="M14 20h28v22a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10z" fill="${C.paper}"/><path d="M42 24h6a6 6 0 0 1 0 12h-6" fill="none"/><path d="M20 12c2 4-2 6 0 8M30 12c2 4-2 6 0 8" stroke-width="2"/>`,
    tallerken: `<ellipse cx="32" cy="34" rx="26" ry="18" fill="${C.paper}"/><ellipse cx="32" cy="34" rx="16" ry="10" fill="none"/>`,
    gaffel: `<path d="M24 8v14M30 8v14M36 8v14" stroke-width="3"/><path d="M22 22h20l-6 10v24h-8V32z" fill="${C.grey}"/>`,
    kniv: `<path d="M18 10c14 2 24 12 26 22l-6 4C34 26 26 18 16 16z" fill="${C.grey}"/><path d="M38 36l10 18h-8l-8-14z" fill="${C.wood2}"/>`,
    skje: `<ellipse cx="26" cy="18" rx="10" ry="13" fill="${C.grey}"/><path d="M30 30l12 26h-8L24 34z" fill="${C.grey}"/>`,
    gryte: `<path d="M12 22h40v20a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10z" fill="${C.grey}"/><path d="M6 26h6M52 26h6" stroke-width="4"/><path d="M14 18h36v4H14z" fill="${C.dark}"/>`,
    kjøleskap: `<rect x="16" y="6" width="32" height="52" rx="4" fill="${C.paper}"/><path d="M16 26h32" /><path d="M40 14v8M40 32v8" stroke-width="3"/>`,
    ovn: `<rect x="10" y="14" width="44" height="40" rx="4" fill="${C.grey}"/><rect x="16" y="26" width="32" height="22" rx="2" fill="${C.dark}"/><circle cx="20" cy="20" r="2.5" fill="${C.paper}"/><circle cx="30" cy="20" r="2.5" fill="${C.paper}"/>`,
    // 🍎 їжа
    brød: `<path d="M10 28c0-10 10-14 22-14s22 4 22 14v18H10z" fill="${C.wood}"/><path d="M18 28c0-6 6-8 14-8s14 2 14 8" fill="none"/>`,
    ost: `<path d="M8 40l24-18h24v18z" fill="${C.yellow}"/><circle cx="36" cy="34" r="3" fill="${C.wood}"/><circle cx="46" cy="30" r="2" fill="${C.wood}"/>`,
    melk: `<path d="M22 8h20v8l6 10v30H16V26l6-10z" fill="${C.paper}"/><path d="M16 34h32" /><path d="M24 40h16v8H24z" fill="${C.blue}"/>`,
    egg: `<ellipse cx="32" cy="36" rx="16" ry="20" fill="${C.paper}"/>`,
    eple: `<path d="M32 18c-10-8-24 0-22 14 2 12 12 22 22 22s20-10 22-22c2-14-12-22-22-14z" fill="${C.red}"/><path d="M32 18c0-6 4-10 8-12" stroke-width="3" fill="none"/><path d="M32 16c6-4 12-2 12-2s-2 8-10 6z" fill="${C.green}"/>`,
    fisk: `<path d="M8 32c8-12 28-14 40-4 4 4 6 8 6 8s-2 4-6 8c-12 10-32 8-40-4z" fill="${C.blue}"/><circle cx="20" cy="30" r="3" fill="${C.paper}"/><path d="M54 36l8 10V22z" fill="${C.blue}"/>`,
    kake: `<path d="M12 34h40v18H12z" fill="${C.pink}"/><path d="M12 34c4-8 36-8 40 0" fill="${C.paper}"/><path d="M32 18v12" stroke-width="3"/><path d="M30 12c4 2 4 6 2 8-4-2-4-6-2-8z" fill="${C.yellow}"/>`,
    suppe: `<ellipse cx="32" cy="38" rx="24" ry="14" fill="${C.paper}"/><ellipse cx="32" cy="36" rx="18" ry="9" fill="${C.wood}"/><path d="M24 14c2 6-4 6-2 12M38 14c2 6-4 6-2 12" fill="none" stroke-width="2"/>`,
    // 🏫 школа й речі
    ryggsekk: `<path d="M18 22c0-8 6-12 14-12s14 4 14 12v28a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="${C.blue}"/><path d="M22 34h20v12H22z" fill="${C.paper}"/><path d="M24 22h16" /><path d="M26 10c4-6 8-6 12 0" fill="none"/>`,
    blyant: `<path d="M14 50l6-18 22-22 8 8-22 22z" fill="${C.yellow}"/><path d="M42 10l8 8 4-4-8-8z" fill="${C.pink}"/><path d="M14 50l8-2-6-6z" fill="${C.dark}"/>`,
    sekk: `<path d="M20 20h24l6 34H14z" fill="${C.wood}"/><path d="M26 20v-6h12v6" fill="none"/>`,
    klasserom: `<rect x="6" y="10" width="52" height="30" rx="3" fill="#2f6b4f"/><path d="M14 20h20M14 28h28" stroke="${C.paper}" stroke-width="3"/><path d="M8 46h48v10H8z" fill="${C.wood}"/>`,
    // 🏙️ місто й транспорт
    buss: `<rect x="6" y="16" width="52" height="28" rx="5" fill="${C.red}"/><rect x="12" y="22" width="14" height="10" fill="${C.sky}"/><rect x="30" y="22" width="14" height="10" fill="${C.sky}"/><circle cx="18" cy="48" r="6" fill="${C.dark}"/><circle cx="46" cy="48" r="6" fill="${C.dark}"/>`,
    tog: `<rect x="10" y="14" width="44" height="26" rx="4" fill="${C.blue}"/><rect x="16" y="20" width="12" height="10" fill="${C.sky}"/><rect x="36" y="20" width="12" height="10" fill="${C.sky}"/><circle cx="20" cy="46" r="5" fill="${C.dark}"/><circle cx="44" cy="46" r="5" fill="${C.dark}"/><path d="M6 52h52" stroke-width="4"/>`,
    sykkel: `<circle cx="16" cy="42" r="12" fill="none" stroke-width="4"/><circle cx="48" cy="42" r="12" fill="none" stroke-width="4"/><path d="M16 42l10-18h12l10 18M26 24h12" fill="none" stroke-width="3"/>`,
    bil: `<path d="M8 40l6-14h36l6 14v10H8z" fill="${C.blue}"/><path d="M18 28h12v10H16zM34 28h12l4 10H34z" fill="${C.sky}"/><circle cx="20" cy="50" r="6" fill="${C.dark}"/><circle cx="44" cy="50" r="6" fill="${C.dark}"/>`,
    hus: `<path d="M8 30L32 10l24 20v26H8z" fill="${C.paper}"/><path d="M6 32L32 10l26 22" fill="none" stroke-width="4"/><rect x="26" y="38" width="12" height="18" fill="${C.wood}"/><rect x="14" y="36" width="8" height="8" fill="${C.sky}"/>`,
    butikk: `<path d="M8 24h48v30H8z" fill="${C.paper}"/><path d="M6 14h52l-4 10H10z" fill="${C.red}"/><rect x="24" y="34" width="16" height="20" fill="${C.wood}"/>`,
    sykehus: `<rect x="10" y="14" width="44" height="42" rx="3" fill="${C.paper}"/><path d="M28 22h8v8h8v8h-8v8h-8v-8h-8v-8h8z" fill="${C.red}"/>`,
    // 🌲 природа й погода
    tre: `<path d="M32 8l14 20H18z" fill="${C.green}"/><path d="M32 20l16 22H16z" fill="${C.green}"/><rect x="28" y="42" width="8" height="14" fill="${C.wood2}"/>`,
    blomst: `<circle cx="32" cy="24" r="7" fill="${C.yellow}"/><circle cx="32" cy="12" r="6" fill="${C.pink}"/><circle cx="44" cy="24" r="6" fill="${C.pink}"/><circle cx="32" cy="36" r="6" fill="${C.pink}"/><circle cx="20" cy="24" r="6" fill="${C.pink}"/><path d="M32 42v14" stroke-width="3"/>`,
    sol: `<circle cx="32" cy="32" r="14" fill="${C.yellow}"/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" stroke-width="4"/>`,
    regn: `<path d="M18 26a12 12 0 0 1 24-4 9 9 0 0 1 2 18H20a10 10 0 0 1-2-14z" fill="${C.paper}"/><path d="M22 48l-4 8M32 48l-4 8M42 48l-4 8" stroke="${C.blue}" stroke-width="4"/>`,
    snø: `<path d="M18 26a12 12 0 0 1 24-4 9 9 0 0 1 2 18H20a10 10 0 0 1-2-14z" fill="${C.paper}"/><circle cx="22" cy="52" r="3" fill="${C.sky}"/><circle cx="32" cy="54" r="3" fill="${C.sky}"/><circle cx="42" cy="52" r="3" fill="${C.sky}"/>`,
    fjell: `<path d="M4 52l18-30 10 16 8-12 20 26z" fill="${C.grey}"/><path d="M16 36l6-10 5 8z" fill="${C.paper}"/><path d="M52 40l-8-12-4 6z" fill="${C.paper}"/>`,
    // 💼 робота й документи
    kontrakt: `<rect x="14" y="6" width="36" height="52" rx="3" fill="${C.paper}"/><path d="M22 18h20M22 26h20M22 34h12" stroke-width="3"/><path d="M22 44c6-4 10 4 16 0" fill="none" stroke-width="3"/>`,
    kalender: `<rect x="8" y="12" width="48" height="44" rx="4" fill="${C.paper}"/><path d="M8 24h48" stroke-width="3"/><path d="M20 12V6M44 12V6" stroke-width="4"/><rect x="16" y="30" width="10" height="8" fill="${C.red}"/>`,
    penger: `<rect x="6" y="18" width="52" height="28" rx="4" fill="${C.green}"/><circle cx="32" cy="32" r="9" fill="${C.paper}"/><path d="M32 26v12M29 29h6M29 35h6" stroke-width="2"/>`,
    nøkkel: `<circle cx="20" cy="32" r="12" fill="none" stroke-width="6"/><path d="M32 32h24M48 32v10M56 32v8" stroke-width="6"/>`,
    telefon: `<rect x="18" y="4" width="28" height="56" rx="6" fill="${C.dark}"/><rect x="22" y="12" width="20" height="36" rx="2" fill="${C.sky}"/><circle cx="32" cy="54" r="3" fill="${C.paper}"/>`,
    datamaskin: `<rect x="6" y="12" width="52" height="32" rx="3" fill="${C.dark}"/><rect x="11" y="17" width="42" height="22" fill="${C.sky}"/><path d="M20 52h24l-4-8H24z" fill="${C.grey}"/>`,
    brev: `<rect x="6" y="16" width="52" height="32" rx="3" fill="${C.paper}"/><path d="M6 18l26 18 26-18" fill="none" stroke-width="3"/>`
  };
  const A = window.KomiksPics.add;
  if (typeof A === 'function') A(P);
})();
