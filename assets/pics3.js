/* Комікс·Lab — 🖼️ мальовані іконки, частина 3: рідні, тіло, одяг, кухня, дорога, пошта,
   зима, безпека, школа й цифрові послуги.
   Емодзі-люди на всіх телефонах схожі одне на одного (👦 👧 🧒 👶), а частина нових слів
   узагалі не має емодзі. Тут — однозначні малюнки в тому самому стилі, що й pics.js/pics2.js.
   Ключ — норвезьке слово без артикля. Файл лише дописує іконки в window.KomiksPics. */
(() => {
  'use strict';
  if (typeof document === 'undefined' || !window.KomiksPics) return;
  const C = { wood: '#c98f4a', wood2: '#a9702f', paper: '#fffdf5', red: '#ee4035', blue: '#2e86de', green: '#3bb273',
    yellow: '#ffd23f', skin: '#f6c9a0', grey: '#9aa0a6', pink: '#ff8fb8', dark: '#37474f', sky: '#bfe3ff',
    brown: '#8d6e63', white: '#ffffff', snow: '#eaf4ff', silver: '#cfd8dc', orange: '#ff9f43' };

  /* Люди: спільний шаблон із великим обличчям, а розрізняє їх зачіска, колір одягу
     й маленька деталь: окуляри в дідуся й бабусі, бант у сестри, кепка в брата,
     краватка в чоловіка, хвостики в доньки. Так брат, син і тато більше не однакові. */
  const head = (cy, r) => `<circle cx="32" cy="${cy}" r="${r}" fill="${C.skin}"/>`;
  const faceBits = (cy, r) => `<circle cx="${32 - r * 0.38}" cy="${cy}" r="1.9" fill="#141414" stroke="none"/>`
    + `<circle cx="${32 + r * 0.38}" cy="${cy}" r="1.9" fill="#141414" stroke="none"/>`
    + `<path d="M${32 - r * 0.42} ${cy + r * 0.45}c${r * 0.42} ${r * 0.34} ${r * 0.42} ${r * 0.34} ${r * 0.84} 0" fill="none" stroke-width="2.5" stroke-linecap="round"/>`;
  const shoulders = col => `<path d="M11 58c0-11 9-17 21-17s21 6 21 17z" fill="${col}"/>`;
  const glasses = cy => `<circle cx="26" cy="${cy}" r="5" fill="none" stroke-width="2"/><circle cx="38" cy="${cy}" r="5" fill="none" stroke-width="2"/><path d="M31 ${cy}h2" stroke-width="2"/>`;
  const grown = (hair, clothes, extra = '') => `${head(23, 13)}${hair}${faceBits(22, 13)}${shoulders(clothes)}${extra}`;
  const kid = (hair, clothes, extra = '') => `${head(26, 11)}${hair}${faceBits(25, 11)}<path d="M15 58c0-9 7-14 17-14s17 5 17 14z" fill="${clothes}"/>${extra}`;

  const H = {
    shortDark: `<path d="M19 22c0-9 6-13 13-13s13 4 13 13l-3-4c-4-3-16-3-20 0z" fill="${C.dark}"/>`,
    shortBrown: `<path d="M19 22c0-9 6-13 13-13s13 4 13 13l-3-4c-4-3-16-3-20 0z" fill="${C.wood2}"/>`,
    longBrown: `<path d="M18 26c0-13 6-19 14-19s14 6 14 19v10l-5-12c-6 3-13 3-18 0l-5 12z" fill="${C.wood2}"/>`,
    longYellow: `<path d="M18 26c0-13 6-19 14-19s14 6 14 19v10l-5-12c-6 3-13 3-18 0l-5 12z" fill="${C.yellow}"/>`,
    bunSilver: `<path d="M19 22c0-9 6-13 13-13s13 4 13 13l-3-4c-4-3-16-3-20 0z" fill="${C.silver}"/><circle cx="32" cy="6" r="5" fill="${C.silver}"/>`,
    tuft: `<path d="M22 24c0-8 4-12 10-12s10 4 10 12c-3-4-17-4-20 0z" fill="${C.dark}"/><path d="M32 12c0-4 4-4 5-7" fill="none" stroke-width="3"/>`,
    pigtails: `<path d="M22 24c0-8 4-12 10-12s10 4 10 12c-3-4-17-4-20 0z" fill="${C.wood2}"/><circle cx="17" cy="26" r="5" fill="${C.wood2}"/><circle cx="47" cy="26" r="5" fill="${C.wood2}"/>`,
    cap: `<path d="M19 22c0-8 6-12 13-12s13 4 13 12H19z" fill="${C.red}"/><path d="M45 22h8v4H19v-4" fill="${C.red}"/>`,
    soft: `<path d="M23 25c0-7 4-10 9-10s9 3 9 10c-3-3-15-3-18 0z" fill="${C.wood}"/>`
  };

  const P = {
    // 👨‍👩‍👧 рідні — у кожного своя зачіска, колір і деталь
    mor: grown(H.longBrown, C.pink),
    far: grown(H.shortDark, C.blue, `<path d="M24 30c3 4 13 4 16 0" fill="${C.dark}" opacity=".35" stroke="none"/>`),
    bestemor: grown(H.bunSilver, C.green, glasses(22)),
    bestefar: `${head(23, 13)}<path d="M19 22c0-9 6-13 13-13s13 4 13 13c-3-5-8-6-13-6s-10 1-13 6z" fill="${C.silver}"/>${faceBits(21, 13)}${glasses(21)}<path d="M23 31c3 5 15 5 18 0 1 7-3 12-9 12s-10-5-9-12z" fill="${C.silver}"/>${shoulders(C.brown)}`,
    mann: grown(H.shortBrown, C.dark, `<path d="M30 42h4l3 9-5 4-5-4z" fill="${C.red}"/>`),
    kone: grown(H.longYellow, C.red, `<path d="M32 46l3 3-3 3-3-3z" fill="${C.paper}"/>`),
    bror: kid(H.cap, C.green),
    søster: kid(H.longYellow, C.red, `<path d="M42 16l5-3 1 5z" fill="${C.pink}"/>`),
    sønn: kid(H.tuft, C.blue),
    datter: kid(H.pigtails, C.pink),
    barn: kid(H.soft, C.yellow),
    baby: `${head(29, 12)}<path d="M26 20c2-4 10-4 12 0" fill="none" stroke-width="2.5"/>${faceBits(28, 12)}<path d="M16 58c0-9 7-14 16-14s16 5 16 14z" fill="${C.sky}"/><circle cx="46" cy="30" r="5" fill="${C.pink}"/><path d="M46 30v-6" stroke-width="2.5"/>`,
    leietaker: grown(H.shortDark, C.green, `<rect x="38" y="42" width="16" height="12" rx="2" fill="${C.paper}"/><path d="M41 46h10M41 50h6" stroke-width="2"/>`),
    bruker: grown(H.shortBrown, C.blue, `<rect x="40" y="40" width="13" height="19" rx="3" fill="${C.dark}"/><rect x="42" y="43" width="9" height="12" fill="${C.sky}" stroke="none"/>`),

    // 🧍 тіло й здоров’я
    hode: `<circle cx="32" cy="30" r="18" fill="${C.skin}"/><path d="M18 24c2-12 26-12 28 0" fill="${C.wood2}"/><circle cx="26" cy="30" r="2" fill="#141414" stroke="none"/><circle cx="38" cy="30" r="2" fill="#141414" stroke="none"/><path d="M26 38c3 3 9 3 12 0" fill="none" stroke-width="3"/>`,
    ansikt: `<circle cx="32" cy="32" r="20" fill="${C.yellow}"/><circle cx="25" cy="27" r="2.5" fill="#141414" stroke="none"/><circle cx="39" cy="27" r="2.5" fill="#141414" stroke="none"/><path d="M22 38c5 6 15 6 20 0" fill="none" stroke-width="4" stroke-linecap="round"/>`,
    arm: `<path d="M14 18c8-4 18-2 24 6l10 14c3 4-2 9-6 6l-8-8" fill="${C.skin}"/><path d="M20 14c6 8 8 12 8 18" fill="none" stroke-width="3"/><path d="M16 22c6-2 12 0 16 6" fill="none" stroke-width="2" opacity=".6"/>`,
    tann: `<path d="M18 14c8-6 20-6 28 0 4 3 2 12-2 22-2 6-6 6-7 0l-3-10h-4l-3 10c-1 6-5 6-7 0-4-10-6-19-2-22z" fill="${C.paper}"/><path d="M26 22c2-2 10-2 12 0" fill="none" stroke-width="2" opacity=".5"/>`,
    frisk: `<circle cx="32" cy="32" r="20" fill="${C.green}"/><path d="M22 33l7 8 14-16" fill="none" stroke="${C.paper}" stroke-width="6" stroke-linecap="round"/>`,

    // 👗 одяг
    kjole: `<path d="M24 10h16v8l-3 4h-10l-3-4z" fill="${C.pink}"/><path d="M27 22h10l13 32H14z" fill="${C.pink}"/><path d="M20 46h24" stroke-width="2" opacity=".5"/><circle cx="32" cy="26" r="2" fill="${C.paper}" stroke="none"/>`,
    støvel: `<path d="M20 8h14v30h12c4 0 8 4 8 10v6H20z" fill="${C.brown}"/><path d="M20 44h34" stroke-width="3"/><path d="M24 14h6M24 22h6" stroke-width="2" opacity=".6"/>`,
    regnjakke: `<path d="M22 12h20l12 8-6 8-4-3v29H20V25l-4 3-6-8z" fill="${C.yellow}"/><path d="M32 12v42" stroke-width="2"/><path d="M26 10h12l-6 6z" fill="${C.wood2}"/>`,
    bunad: `<path d="M24 10h16l4 8-4 4v8H24v-8l-4-4z" fill="${C.dark}"/><path d="M24 30h16l6 24H18z" fill="${C.dark}"/><path d="M22 40h20" stroke="${C.red}" stroke-width="3"/><path d="M28 34h8" stroke="${C.yellow}" stroke-width="3"/><path d="M26 48h12" stroke="${C.paper}" stroke-width="2"/>`,

    // 🍳 кухня і їжа
    glass: `<path d="M22 10h20l-3 40c0 3-2 4-7 4s-7-1-7-4z" fill="${C.sky}"/><path d="M23 24h18" stroke-width="2" opacity=".6"/>`,
    kaffe: `<path d="M12 22h32v18a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12z" fill="${C.paper}"/><path d="M44 26h6a6 6 0 0 1 0 12h-6" fill="none" stroke-width="3"/><path d="M14 30h30v10a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10z" fill="${C.wood2}"/><path d="M22 14c0-3 4-3 4-6M32 14c0-3 4-3 4-6" fill="none" stroke-width="2.5"/>`,
    te: `<path d="M12 24h30v16a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12z" fill="${C.paper}"/><path d="M42 28h6a5 5 0 0 1 0 10h-6" fill="none" stroke-width="3"/><path d="M26 26h6v8h-6z" fill="${C.green}"/><path d="M29 26v-8h8" fill="none" stroke-width="2"/>`,
    frokost: `<ellipse cx="32" cy="36" rx="22" ry="12" fill="${C.paper}"/><path d="M12 34c6 6 34 6 40 0" fill="none" stroke-width="2" opacity=".5"/><path d="M22 30c4-4 16-4 20 0" fill="${C.wood}"/><path d="M40 16v14" stroke-width="3"/><path d="M40 16c4 0 6 4 4 8" fill="none" stroke-width="3"/>`,
    lunsj: `<path d="M10 24h44v6H10z" fill="${C.wood}"/><path d="M12 30h40v8H12z" fill="${C.green}"/><path d="M12 38h40v6H12z" fill="${C.yellow}"/><path d="M10 44h44v6H10z" fill="${C.wood}"/>`,
    middag: `<circle cx="32" cy="34" r="18" fill="${C.paper}"/><circle cx="32" cy="34" r="11" fill="none" stroke-width="2" opacity=".5"/><path d="M6 18v12c0 3 2 5 4 5v13M10 18v10" fill="none" stroke-width="3"/><path d="M56 18c-3 0-5 4-5 9s2 6 5 6v15" fill="none" stroke-width="3"/>`,
    panne: `<ellipse cx="28" cy="36" rx="18" ry="12" fill="${C.dark}"/><ellipse cx="28" cy="34" rx="14" ry="8" fill="${C.grey}"/><path d="M46 34h14" stroke-width="5" stroke-linecap="round"/>`,
    steke: `<ellipse cx="28" cy="38" rx="18" ry="11" fill="${C.dark}"/><ellipse cx="28" cy="36" rx="13" ry="7" fill="${C.paper}"/><circle cx="28" cy="36" r="4" fill="${C.yellow}" stroke="none"/><path d="M46 36h14" stroke-width="5" stroke-linecap="round"/><path d="M22 18c0 4 4 4 4 8M34 16c0 4 4 4 4 8" fill="none" stroke-width="2.5" opacity=".7"/>`,
    oppskrift: `<rect x="10" y="8" width="44" height="48" rx="4" fill="${C.paper}"/><path d="M18 20h20M18 28h28M18 36h24M18 44h14" stroke-width="3"/><circle cx="46" cy="44" r="7" fill="${C.red}"/><path d="M43 44h6M46 41v6" stroke="${C.paper}" stroke-width="2.5"/>`,

    // 🚗 дорога
    førerkort: `<rect x="6" y="16" width="52" height="32" rx="5" fill="${C.sky}"/><rect x="12" y="22" width="16" height="20" rx="3" fill="${C.paper}"/><circle cx="20" cy="30" r="4" fill="${C.skin}"/><path d="M14 40c0-4 3-6 6-6s6 2 6 6z" fill="${C.blue}"/><path d="M34 26h18M34 34h18M34 40h12" stroke-width="3"/>`,
    dekk: `<circle cx="32" cy="32" r="22" fill="${C.dark}"/><circle cx="32" cy="32" r="10" fill="${C.silver}"/><path d="M32 10v8M32 46v8M10 32h8M46 32h8M17 17l6 6M47 47l-6-6M47 17l-6 6M17 47l6-6" stroke-width="3"/>`,
    bensin: `<rect x="10" y="14" width="26" height="40" rx="4" fill="${C.red}"/><rect x="15" y="20" width="16" height="10" rx="2" fill="${C.paper}"/><path d="M36 22h8a4 4 0 0 1 4 4v16a4 4 0 0 0 8 0V26l-4-6" fill="none" stroke-width="3"/><path d="M10 54h26" stroke-width="3"/>`,
    parkering: `<rect x="10" y="8" width="44" height="48" rx="8" fill="${C.blue}"/><path d="M26 44V20h8a8 8 0 0 1 0 16h-8" fill="none" stroke="${C.paper}" stroke-width="6" stroke-linejoin="round"/>`,
    kø: `<rect x="8" y="12" width="20" height="12" rx="3" fill="${C.red}"/><rect x="8" y="28" width="20" height="12" rx="3" fill="${C.blue}"/><rect x="8" y="44" width="20" height="12" rx="3" fill="${C.green}"/><path d="M36 18h20M36 34h20M36 50h20" stroke-width="3" opacity=".5"/><circle cx="12" cy="24" r="2" fill="#141414" stroke="none"/><circle cx="24" cy="24" r="2" fill="#141414" stroke="none"/>`,
    rundkjøring: `<circle cx="32" cy="32" r="20" fill="none" stroke-width="5"/><circle cx="32" cy="32" r="7" fill="${C.green}"/><path d="M32 4v8M32 52v8M4 32h8M52 32h8" stroke-width="4"/><path d="M44 18l6-6M50 12h-8M50 12v8" fill="none" stroke-width="3"/>`,
    bot: `<rect x="12" y="8" width="40" height="48" rx="4" fill="${C.paper}"/><path d="M20 20h24M20 28h24M20 36h16" stroke-width="3"/><circle cx="42" cy="44" r="9" fill="${C.red}"/><path d="M38 44h8" stroke="${C.paper}" stroke-width="3"/>`,

    // 📦 пошта
    pakke: `<path d="M8 22l24-12 24 12v24L32 58 8 46z" fill="${C.wood}"/><path d="M8 22l24 12 24-12M32 34v24" stroke-width="3"/><path d="M24 16l24 12" stroke-width="3" opacity=".5"/><path d="M26 28h12v8H26z" fill="${C.red}" stroke="none"/>`,
    brev: `<rect x="6" y="16" width="52" height="34" rx="4" fill="${C.paper}"/><path d="M6 20l26 18 26-18" fill="none" stroke-width="3"/><path d="M6 48l18-14M58 48L40 34" stroke-width="2" opacity=".6"/>`,
    frimerke: `<rect x="12" y="10" width="40" height="44" rx="2" fill="${C.yellow}" stroke-dasharray="4 3"/><rect x="18" y="16" width="28" height="32" rx="2" fill="${C.paper}"/><path d="M22 40l8-10 6 7 5-5 5 8z" fill="${C.green}"/><circle cx="26" cy="24" r="3" fill="${C.red}" stroke="none"/>`,
    postkontor: `<path d="M6 26 32 8l26 18v30H6z" fill="${C.paper}"/><path d="M6 26 32 8l26 18" fill="none" stroke-width="3"/><rect x="22" y="34" width="20" height="22" rx="2" fill="${C.red}"/><path d="M16 18h32" stroke="${C.yellow}" stroke-width="5"/>`,
    pakkeboks: `<rect x="8" y="10" width="48" height="46" rx="4" fill="${C.silver}"/><path d="M32 10v46M8 26h48M8 42h48" stroke-width="3"/><circle cx="24" cy="18" r="2" fill="#141414" stroke="none"/><circle cx="48" cy="34" r="2" fill="#141414" stroke="none"/><circle cx="24" cy="50" r="2" fill="#141414" stroke="none"/>`,

    // ⛷️ зима
    ski: `<path d="M14 54c14 4 22 4 36 0" fill="none" stroke-width="4"/><path d="M12 12l14 38M26 12l14 38" stroke-width="4" stroke-linecap="round"/><path d="M20 30h14" stroke-width="3"/><path d="M46 14v34" stroke-width="3"/><path d="M42 48h8" stroke-width="3"/>`,
    skøyte: `<path d="M18 10h16v22h-16z" fill="${C.blue}"/><path d="M14 32h26v8H14z" fill="${C.paper}"/><path d="M12 44h34c4 0 6 2 6 6H12z" fill="none" stroke-width="4"/><path d="M20 14h12M20 20h12" stroke-width="2" opacity=".6"/>`,
    snømann: `<circle cx="32" cy="44" r="14" fill="${C.snow}"/><circle cx="32" cy="24" r="10" fill="${C.snow}"/><path d="M22 14h20l-2-6H24z" fill="${C.dark}"/><path d="M20 14h24" stroke-width="3"/><circle cx="28" cy="22" r="1.8" fill="#141414" stroke="none"/><circle cx="36" cy="22" r="1.8" fill="#141414" stroke="none"/><path d="M32 26l8 2-8 2z" fill="${C.orange}" stroke="none"/><path d="M18 40H6M46 40h12" stroke-width="3"/>`,
    termos: `<rect x="20" y="14" width="24" height="42" rx="6" fill="${C.green}"/><rect x="22" y="6" width="20" height="10" rx="3" fill="${C.silver}"/><path d="M20 30h24" stroke-width="3"/><path d="M44 24h8v12h-8" fill="none" stroke-width="3"/>`,
    brøyting: `<rect x="18" y="26" width="26" height="16" rx="3" fill="${C.orange}"/><path d="M44 30h8l4 8v4H44z" fill="${C.orange}"/><circle cx="26" cy="48" r="6" fill="${C.dark}"/><circle cx="48" cy="48" r="6" fill="${C.dark}"/><path d="M6 24v24l10-4V28z" fill="${C.silver}"/><circle cx="32" cy="20" r="3" fill="${C.yellow}" stroke="none"/>`,

    // 🚨 безпека
    brann: `<path d="M32 6c8 10 4 14 10 20 6 6 8 12 8 16a18 18 0 0 1-36 0c0-8 6-12 8-18 2 4 4 6 6 6-2-8 0-16 4-24z" fill="${C.red}"/><path d="M32 30c4 6 6 8 6 14a6 6 0 0 1-12 0c0-4 2-8 6-14z" fill="${C.yellow}" stroke="none"/>`,
    hjelm: `<path d="M8 40a24 24 0 0 1 48 0z" fill="${C.yellow}"/><path d="M28 16c0 8-8 12-10 22M36 16c0 8 8 12 10 22" fill="none" stroke-width="3"/><path d="M6 40h52v6H6z" fill="${C.wood2}"/>`,
    refleks: `<circle cx="32" cy="32" r="14" fill="${C.yellow}"/><circle cx="32" cy="32" r="6" fill="${C.paper}"/><path d="M32 4v8M32 52v8M4 32h8M52 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" stroke-width="3"/>`,
    førstehjelp: `<rect x="8" y="16" width="48" height="36" rx="6" fill="${C.red}"/><path d="M24 12h16v6H24z" fill="${C.dark}"/><path d="M32 24v20M22 34h20" stroke="${C.paper}" stroke-width="6" stroke-linecap="round"/>`,
    politi: `<path d="M32 6l20 8v16c0 14-9 22-20 28-11-6-20-14-20-28V14z" fill="${C.blue}"/><path d="M32 18v20M22 28h20" stroke="${C.yellow}" stroke-width="4"/>`,

    // 🎒 школа й батьки
    foreldremøte: `<circle cx="18" cy="22" r="8" fill="${C.skin}"/><path d="M6 44c0-7 5-11 12-11s12 4 12 11z" fill="${C.blue}"/><circle cx="44" cy="22" r="8" fill="${C.skin}"/><path d="M32 44c0-7 5-11 12-11s12 4 12 11z" fill="${C.pink}"/><rect x="14" y="48" width="36" height="10" rx="3" fill="${C.wood}"/>`,
    karakter: `<rect x="10" y="8" width="44" height="48" rx="4" fill="${C.paper}"/><path d="M20 20h24M20 46h24" stroke-width="3" opacity=".5"/><path d="M26 40V24h6a6 6 0 0 1 0 8h-6" fill="none" stroke="${C.green}" stroke-width="5"/><path d="M38 24v16" fill="none" stroke="${C.green}" stroke-width="5"/>`,
    fravær: `<rect x="8" y="12" width="48" height="44" rx="4" fill="${C.paper}"/><path d="M8 24h48" stroke-width="3"/><path d="M20 12V6M44 12V6" stroke-width="4"/><path d="M24 36l16 12M40 36L24 48" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/>`,
    skolebuss: `<rect x="6" y="14" width="52" height="30" rx="6" fill="${C.yellow}"/><rect x="12" y="20" width="12" height="10" rx="2" fill="${C.sky}"/><rect x="28" y="20" width="12" height="10" rx="2" fill="${C.sky}"/><rect x="44" y="20" width="8" height="10" rx="2" fill="${C.sky}"/><circle cx="18" cy="48" r="6" fill="${C.dark}"/><circle cx="46" cy="48" r="6" fill="${C.dark}"/><path d="M6 36h52" stroke-width="3"/>`,
    lekser: `<rect x="8" y="14" width="30" height="40" rx="3" fill="${C.paper}"/><path d="M14 24h18M14 32h18M14 40h12" stroke-width="3"/><path d="M40 44l14-16 6 5-14 16-8 3z" fill="${C.yellow}"/>`,

    // 📱 цифрові послуги
    passord: `<rect x="12" y="28" width="40" height="28" rx="5" fill="${C.yellow}"/><path d="M22 28v-8a10 10 0 0 1 20 0v8" fill="none" stroke-width="4"/><circle cx="32" cy="40" r="4" fill="${C.dark}" stroke="none"/><path d="M32 44v6" stroke-width="3"/>`,
    innlogging: `<rect x="8" y="14" width="30" height="36" rx="4" fill="${C.paper}"/><path d="M26 32h26" stroke-width="4"/><path d="M44 24l10 8-10 8" fill="none" stroke-width="4" stroke-linejoin="round"/><circle cx="18" cy="26" r="4" fill="${C.skin}"/><path d="M12 40c0-4 3-6 6-6s6 2 6 6z" fill="${C.blue}"/>`,
    nettbank: `<path d="M6 26 32 12l26 14z" fill="${C.paper}"/><path d="M12 28h6v18h-6zM29 28h6v18h-6zM46 28h6v18h-6z" fill="${C.blue}"/><path d="M6 50h52v6H6z" fill="${C.wood}"/><circle cx="32" cy="20" r="3" fill="${C.yellow}" stroke="none"/>`,
    skjema: `<rect x="12" y="6" width="40" height="52" rx="4" fill="${C.paper}"/><path d="M20 18h16M20 28h24M20 38h24" stroke-width="3"/><rect x="20" y="44" width="10" height="8" rx="2" fill="${C.sky}"/><path d="M36 48h10" stroke-width="3"/>`,
    svindel: `<path d="M32 6l26 46H6z" fill="${C.red}"/><path d="M32 22v16" stroke="${C.paper}" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="44" r="3" fill="${C.paper}" stroke="none"/>`,

    // 🧭 інше, що часто плуталося
    sti: `<path d="M24 58c0-10 12-12 12-22S22 24 22 14" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"/><path d="M24 58c0-10 12-12 12-22S22 24 22 14" fill="none" stroke="${C.wood}" stroke-width="3" stroke-dasharray="5 5"/><path d="M8 58h48" stroke-width="3" opacity=".4"/><path d="M48 20l6 10h-12z" fill="${C.green}"/>`,
    fjelltur: `<path d="M4 50 22 22l10 14 8-12 20 26z" fill="${C.grey}"/><path d="M22 22l6 9h-12zM40 24l5 7h-10z" fill="${C.snow}" stroke="none"/><circle cx="50" cy="14" r="6" fill="${C.yellow}"/><path d="M4 50h56" stroke-width="3"/>`,
    leilighet: `<rect x="10" y="10" width="44" height="46" rx="3" fill="${C.paper}"/><rect x="16" y="18" width="10" height="10" fill="${C.sky}"/><rect x="38" y="18" width="10" height="10" fill="${C.sky}"/><rect x="16" y="34" width="10" height="10" fill="${C.sky}"/><rect x="38" y="34" width="10" height="10" fill="${C.yellow}"/><rect x="27" y="44" width="10" height="12" rx="2" fill="${C.wood}"/>`,
    kontor: `<rect x="8" y="14" width="48" height="34" rx="4" fill="${C.paper}"/><rect x="14" y="20" width="22" height="16" rx="2" fill="${C.sky}"/><path d="M42 20h8v16h-8z" fill="${C.green}"/><path d="M6 48h52v8H6z" fill="${C.wood}"/><path d="M18 42h16" stroke-width="3"/>`,
    kø_alt: `<circle cx="32" cy="32" r="0" fill="none"/>`
  };
  delete P.kø_alt;
  window.KomiksPics.add(P);
})();
