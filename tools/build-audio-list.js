// Складає список аудіо для генерації нейроголосами: node tools/build-audio-list.js
// Результат: tools/audio-items.json → python tools/gen_audio.py
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const W = require('./load.js')({ skipAudio: true });
const CH = W.CHARACTERS;

const NATIVE = { no: { f: 'nb-NO-PernilleNeural', m: 'nb-NO-FinnNeural' }, uk: { f: 'uk-UA-PolinaNeural', m: 'uk-UA-OstapNeural' }, en: { f: 'en-GB-SoniaNeural', m: 'en-GB-RyanNeural' } };
const MULTI = {
  f: ['en-US-EmmaMultilingualNeural', 'en-US-AvaMultilingualNeural', 'fr-FR-VivienneMultilingualNeural', 'de-DE-SeraphinaMultilingualNeural', 'pt-BR-ThalitaMultilingualNeural'],
  m: ['en-US-AndrewMultilingualNeural', 'en-US-BrianMultilingualNeural', 'de-DE-FlorianMultilingualNeural', 'fr-FR-RemyMultilingualNeural', 'it-IT-GiuseppeMultilingualNeural', 'en-AU-WilliamMultilingualNeural']
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hz = v => (v >= 0 ? '+' : '') + Math.round(v) + 'Hz';
const pct = v => (v >= 0 ? '+' : '') + Math.round(v) + '%';

// кожному персонажу — свій багатомовний голос (по колу в межах статі)
const multiIndex = {};
const counters = { f: 0, m: 0 };
for (const [id, c] of Object.entries(CH)) {
  if (id === 'narrator' || id === 'sfx') continue;
  const g = c.gender === 'f' ? 'f' : 'm';
  multiIndex[id] = MULTI[g][counters[g]++ % MULTI[g].length];
}

// Чисті голоси без зміни тону й темпу — так нейроголоси звучать природно
const CLEAN = { pitch: '+0Hz', rate: '+0%' };
function voiceFor(mode, who, lang, text) {
  const c = CH[who] || CH.narrator;
  if (mode === 'cheer') return { voice: NATIVE[lang].f, ...CLEAN };
  const cast = { voice: NATIVE[lang][c.gender === 'f' ? 'f' : 'm'], ...CLEAN };
  if (mode === 'cast') return cast;
  // multi: короткі репліки й українські без і/ї/є/ґ читаємо рідним голосом — щоб не сплутати мову
  const words = text.split(/\s+/).filter(w => /\p{L}{2,}/u.test(w)).length;
  const safeUk = lang !== 'uk' || /[іїєґ]/i.test(text);
  if (!multiIndex[who] || words < 3 || !safeUk) return cast;
  return { voice: multiIndex[who], ...CLEAN };
}

const files = new Map(); // file -> {file, text, voice, pitch, rate, keys:[]}
function add(key, text, v) {
  const file = crypto.createHash('md5').update([v.voice, v.pitch, v.rate, text].join('|')).digest('hex').slice(0, 16);
  if (!files.has(file)) files.set(file, { file, text, ...v, keys: [] });
  files.get(file).keys.push(key);
}

for (const c of W.COMICS) for (const p of c.panels) for (const l of p.lines) for (const lang of ['no']) {
  for (const mode of ['cheer', 'cast', 'multi']) add(`${mode}|${l.who}|${lang}|${l[lang]}`, l[lang], voiceFor(mode, l.who, lang, l[lang]));
}

// англійський курс (data/english.js): репліки й слова англійськими голосами
for (const c of ((W.ENGLISH || {}).comics || [])) for (const p of c.panels) for (const l of p.lines) {
  for (const mode of ['cheer', 'cast', 'multi']) add(`${mode}|${l.who}|en|${l.en}`, l.en, voiceFor(mode, l.who, 'en', l.en));
}

const wordVoice = lang => ({ voice: NATIVE[lang].f, ...CLEAN });
const words = { no: new Set(), uk: new Set() };
Object.keys(W.DICT.no).forEach(w => words.no.add(w));
for (const c of W.COMICS) for (const [no] of c.vocab) words.no.add(no.toLowerCase());
// алфавіт, числа, слова для «Hva er dette?»
const BASICS = W.BASICS || {};
for (const [, name, word] of BASICS.alphabet || []) { words.no.add(name.toLowerCase()); words.no.add(word.toLowerCase()); }
if (BASICS.numberWord) { for (let n = 0; n <= 100; n++) words.no.add(BASICS.numberWord(n)); for (let n = 200; n <= 900; n += 100) words.no.add(BASICS.numberWord(n)); words.no.add('tusen'); }
for (const [, no] of BASICS.pictures || []) words.no.add(no.toLowerCase());
// слова за темами, граматика, звуки й склади, години — усе, що можна натиснути й почути
const phrases = new Set();
for (const th of ((W.WORDS || {}).themes || [])) for (const [no] of th.words) words.no.add(no.toLowerCase());
for (const tp of ((W.GRAMMAR || {}).topics || [])) {
  (tp.table || []).forEach(r => phrases.add(String(r[0]).replace(/→/g, ',').replace(/\+ inf\./, '').trim()));
  (tp.examples || []).forEach(r => phrases.add(r[0]));
  (tp.items || []).forEach(it => phrases.add(String(it[0]).replace('_', it[1]).replace(/\s*\([^)]*\)\s*$/, '')));
}
const PH = (W.BASICS || {}).phonetics;
if (PH) {
  for (const k of ['vowels', 'voiced', 'voiceless', 'silent']) (PH[k].items || []).forEach(([a, w]) => { words.no.add(String(w).toLowerCase()); if (/^[a-zæøå]$/i.test(a)) words.no.add(a.toLowerCase()); });
  PH.pairs.items.forEach(([a, b, wa, wb]) => { words.no.add(wa); words.no.add(wb); words.no.add(a); words.no.add(b); });
  PH.diphthongs.items.forEach(([d, ws]) => { words.no.add(d); ws.forEach(w => words.no.add(w)); });
  PH.combos.items.forEach(c => c.words.forEach(w => words.no.add(w)));
  PH.long.items.forEach(([a, b]) => { words.no.add(a); words.no.add(b); });
  PH.syllables.words.forEach(([, w]) => words.no.add(w));
  PH.syllables.consonants.forEach(c => (PH.vowels.items || []).forEach(([v]) => words.no.add(c + v.toLowerCase())));
}
// «Hva er klokka?» — усі варіанти часу
const HOURS = ['tolv', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve'];
const H = n => HOURS[((n % 12) + 12) % 12];
for (let hh = 1; hh <= 12; hh++) for (const mm of [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]) {
  const cur = H(hh), nxt = H(hh + 1);
  const t = { 0: 'klokka ' + cur, 5: 'fem over ' + cur, 10: 'ti over ' + cur, 15: 'kvart over ' + cur, 20: 'ti på halv ' + nxt, 25: 'fem på halv ' + nxt,
    30: 'halv ' + nxt, 35: 'fem over halv ' + nxt, 40: 'ti over halv ' + nxt, 45: 'kvart på ' + nxt, 50: 'ti på ' + nxt, 55: 'fem på ' + nxt }[mm];
  phrases.add('Klokka er ' + t.replace(/^klokka /, ''));
  words.no.add(t);
}
// математика: «tre ganger fire er tolv», «tolv delt på fire er tre», «tre pluss to er fem», «fem minus to er tre»
if (BASICS.numberWord) {
  const N = BASICS.numberWord;
  for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) { phrases.add(`${N(a)} ganger ${N(b)} er ${N(a * b)}`); phrases.add(`${N(a * b)} delt på ${N(b)} er ${N(a)}`); }
  for (let a = 0; a <= 20; a++) for (let b = 0; a + b <= 20; b++) phrases.add(`${N(a)} pluss ${N(b)} er ${N(a + b)}`);
  for (let a = 0; a <= 20; a++) for (let b = 0; b <= a; b++) phrases.add(`${N(a)} minus ${N(b)} er ${N(a - b)}`);
  // питання без відповіді: «tre ganger fire» (звучить на початку питання в «Грі разом»)
  for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) { phrases.add(`${N(a)} ganger ${N(b)}`); phrases.add(`${N(a * b)} delt på ${N(b)}`); }
  for (let a = 0; a <= 20; a++) for (let b = 0; a + b <= 20; b++) phrases.add(`${N(a)} pluss ${N(b)}`);
  for (let a = 0; a <= 20; a++) for (let b = 0; b <= a; b++) phrases.add(`${N(a)} minus ${N(b)}`);
  ['pluss', 'minus', 'ganger', 'delt på', 'er', 'lik'].forEach(w => words.no.add(w));
  // похвала голосом (KomiksCore.cheer)
  // беремо списки CHEER_OK / CHEER_NO прямо з assets/app.js, щоб озвучка не відставала від коду
  const appSrc = fs.readFileSync(path.join(__dirname, '..', 'assets', 'app.js'), 'utf8');
  for (const name of ['CHEER_OK', 'CHEER_NO']) {
    const m = new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`).exec(appSrc);
    if (!m) throw new Error(`${name} не знайдено в assets/app.js`);
    (m[1].match(/'[^']+'/g) || []).forEach(q => phrases.add(q.slice(1, -1)));
  }
  // шахи: назви фігур і «Sjakk!» — список SAY з assets/chess.js
  const chessSrc = fs.readFileSync(path.join(__dirname, '..', 'assets', 'chess.js'), 'utf8');
  const cm = /const SAY = \[([^\]]*)\];/.exec(chessSrc);
  if (!cm) throw new Error('SAY не знайдено в assets/chess.js');
  (cm[1].match(/'[^']+'/g) || []).forEach(q => phrases.add(q.slice(1, -1)));
}
// ключ — у нижньому регістрі: так шукає Speech.audioFile (раніше фрази з великої літери не знаходилися)
for (const p of phrases) add(`word|no|${p.toLowerCase()}`, p, wordVoice('no'));
for (const w of words.no) add(`word|no|${w}`, w, wordVoice('no'));

// англійські слова: словник курсу, vocab історій і назви предметів
const wordsEn = new Set();
Object.keys(((W.DICT_EN || {}).uk) || {}).forEach(w => wordsEn.add(w.toLowerCase()));
for (const c of ((W.ENGLISH || {}).comics || [])) {
  c.vocab.forEach(([en]) => wordsEn.add(en.toLowerCase()));
  // кожне слово з реплік — його можна натиснути в читалці
  c.panels.forEach(p => p.lines.forEach(l => (l.en.match(/[\p{L}\p{N}'’-]+/gu) || []).forEach(t => wordsEn.add(t.toLowerCase()))));
}
for (const [, , , en] of (BASICS.pictures || [])) if (en) wordsEn.add(en.toLowerCase());
for (const th of ((W.WORDS || {}).themes || [])) for (const w of th.words) if (w[2]) wordsEn.add(w[2].toLowerCase());
for (const w of wordsEn) add(`word|en|${w}`, w, wordVoice('en'));

// зразки для перемикача голосу
const samples = [
  ['cheer', 'mia', 'no', 'Hei hei! Nå leser jeg med glad stemme!'],
  ['cast', 'pappa', 'no', 'Nå har alle figurene sin egen stemme.'],
  ['multi', 'nora', 'no', 'Nå snakker alle med forskjellige stemmer!']
];
for (const [mode, who, lang, text] of samples) add(`${mode}|${who}|${lang}|${text}`, text, voiceFor(mode, who, lang, text));

const out = [...files.values()];
fs.writeFileSync(path.join(__dirname, 'audio-items.json'), JSON.stringify(out, null, 1));
console.log(`files: ${out.length}, keys: ${out.reduce((s, x) => s + x.keys.length, 0)}`);
