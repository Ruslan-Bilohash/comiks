// Перевірка озвучення: node tools/audit-audio.js [--dist]
// Збирає всі тексти, які застосунок озвучує (репліки, слова, граматика, звуки, годинник, математика, англійська),
// і перевіряє, що для кожного є ключ у data/audio.js та файл audio/<id>.mp3.
// Без запису браузер переходить на синтез мовлення — на пристроях без норвезького голосу його майже не чути.
const fs = require('fs'), path = require('path');
const W = require('./load.js')();
const ROOT = require('./load.js').ROOT;
const useDist = process.argv.includes('--dist');
const AUDIO = useDist ? (() => { const s = fs.readFileSync(path.join(ROOT, 'dist/data/audio.js'), 'utf8'); return JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1)); })() : (W.AUDIO || {});
const audioDir = path.join(ROOT, useDist ? 'dist/audio' : 'audio');
const norm = s => String(s).toLowerCase().replace(/[.,!?;:«»"“”()…]/g, '').replace(/\s+/g, ' ').trim();
const MODES = ['cheer', 'cast', 'multi'];

const missing = new Map(), missingFile = new Set();
let checked = 0;
function need(area, text, who = 'narrator', lang = 'no', modes = ['cheer']) {
  if (!text) return;
  for (const mode of modes) {
    checked++;
    const f = AUDIO[`${mode}|${who}|${lang}|${text}`] || AUDIO[`word|${lang}|${String(text).toLowerCase()}`] || AUDIO[`word|${lang}|${norm(text)}`];
    if (!f) { const k = area + ' · ' + lang; if (!missing.has(k)) missing.set(k, new Set()); missing.get(k).add(text); }
    else if (!fs.existsSync(path.join(audioDir, f + '.mp3'))) missingFile.add(f + '.mp3 ← ' + text);
  }
}
const tokens = s => String(s).match(/[\p{L}\p{N}'’-]+/gu) || [];

// 1) комікси: репліки в усіх режимах голосу + кожне слово (клік по слову)
for (const c of W.COMICS) {
  for (const p of c.panels) for (const l of p.lines) {
    if (l.who === 'sfx') continue;
    need('комікси: репліки', l.no, l.who, 'no', MODES);
    tokens(l.no).forEach(t => need('комікси: слова', t));
  }
  c.vocab.forEach(([no]) => need('комікси: словник історії', no));
}
// 2) алфавіт і звуки
const B = W.BASICS || {};
(B.alphabet || []).forEach(([, name, word]) => { need('алфавіт', name); need('алфавіт', word); });
const PH = B.phonetics;
if (PH) {
  for (const k of ['vowels', 'voiced', 'voiceless', 'silent']) PH[k].items.forEach(([a, w]) => { need('звуки', w); if (/^[a-zæøå]$/i.test(a)) need('звуки: літери', a.toLowerCase()); });
  PH.pairs.items.forEach(([, , a, b]) => { need('звуки: пари', a); need('звуки: пари', b); });
  PH.diphthongs.items.forEach(([, ws]) => ws.forEach(w => need('звуки: дифтонги', w)));
  PH.combos.items.forEach(c => c.words.forEach(w => need('звуки: сполучення', w)));
  PH.long.items.forEach(([a, b]) => { need('звуки: довгі/короткі', a); need('звуки: довгі/короткі', b); });
  PH.syllables.words.forEach(([, w]) => need('звуки: слова по складах', w));
  PH.syllables.consonants.forEach(c => PH.vowels.items.forEach(([v]) => need('звуки: склади', c + v.toLowerCase())));
}
// 3) числа (сітка 0–20, десятки, 100, 1000; конструктор — 0–100)
if (B.numberWord) { for (let n = 0; n <= 100; n++) need('числа', B.numberWord(n)); [200, 300, 400, 500, 600, 700, 800, 900, 1000].forEach(n => need('числа', B.numberWord(n))); }
(B.pictures || []).forEach(([, no, , en]) => { need('картинки «Hva er dette?»', no); if (en) need('картинки (англ.)', en.toLowerCase(), 'narrator', 'en'); });
// 4) граматика: форми, приклади, речення тестів, годинник
for (const tp of ((W.GRAMMAR || {}).topics || [])) {
  tp.table.forEach(r => need('граматика: таблиці', String(r[0]).replace(/→/g, ',').replace(/\+ inf\./, '').trim()));
  tp.examples.forEach(r => { need('граматика: приклади', r[0]); tokens(r[0]).forEach(t => need('граматика: слова прикладів', t)); });
  tp.items.forEach(it => need('граматика: тести', String(it[0]).replace('_', it[1]).replace(/\s*\([^)]*\)\s*$/, '')));
}
const HOURS = ['tolv', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve'];
const H = n => HOURS[((n % 12) + 12) % 12];
for (let hh = 1; hh <= 12; hh++) for (const mm of [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]) {
  const cur = H(hh), nxt = H(hh + 1);
  const t = { 0: 'klokka ' + cur, 5: 'fem over ' + cur, 10: 'ti over ' + cur, 15: 'kvart over ' + cur, 20: 'ti på halv ' + nxt, 25: 'fem på halv ' + nxt, 30: 'halv ' + nxt, 35: 'fem over halv ' + nxt, 40: 'ti over halv ' + nxt, 45: 'kvart på ' + nxt, 50: 'ti på ' + nxt, 55: 'fem på ' + nxt }[mm];
  need('годинник', 'Klokka er ' + t.replace(/^klokka /, ''));
}
// 5) слова за темами (норв. + англ.)
for (const th of ((W.WORDS || {}).themes || [])) th.words.forEach(([no, , en]) => { need('слова за темами', no); if (en) need('слова за темами (англ.)', en.toLowerCase(), 'narrator', 'en'); });
// 6) математика
if (B.numberWord) {
  const N = B.numberWord;
  for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) { need('математика ×', `${N(a)} ganger ${N(b)} er ${N(a * b)}`); need('математика ÷', `${N(a * b)} delt på ${N(b)} er ${N(a)}`); }
  for (let a = 0; a <= 20; a++) for (let b = 0; a + b <= 20; b++) need('математика +', `${N(a)} pluss ${N(b)} er ${N(a + b)}`);
  for (let a = 0; a <= 20; a++) for (let b = 0; b <= a; b++) need('математика −', `${N(a)} minus ${N(b)} er ${N(a - b)}`);
  ['pluss', 'minus', 'ganger', 'delt på', 'er', 'lik'].forEach(w => need('математика: слова', w));
}
// 7) англійський курс
for (const c of ((W.ENGLISH || {}).comics || [])) {
  for (const p of c.panels) for (const l of p.lines) { need('англійська: репліки', l.en, l.who, 'en', MODES); tokens(l.en).forEach(t => need('англійська: слова', t.toLowerCase(), 'narrator', 'en')); }
  c.vocab.forEach(([en]) => need('англійська: словник', en.toLowerCase(), 'narrator', 'en'));
}

let total = 0;
for (const [area, set] of missing) {
  total += set.size;
  const list = [...set];
  console.log(`✖ ${area}: без запису ${list.length} — ${list.slice(0, 12).map(x => `«${x}»`).join(', ')}${list.length > 12 ? ' …' : ''}`);
}
if (missingFile.size) { console.log(`✖ Ключ є, а файлу немає: ${missingFile.size}`); [...missingFile].slice(0, 10).forEach(x => console.log('   ' + x)); }
console.log(`\nПеревірено озвучень: ${checked} · без запису: ${total} · битих посилань на файли: ${missingFile.size}${useDist ? ' (dist)' : ''}`);
if (!total && !missingFile.size) console.log('✔ Кожен текст, який озвучує сайт, має записаний голос.');
process.exitCode = total || missingFile.size ? 1 : 0;
