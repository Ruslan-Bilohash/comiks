/* Комікс·Lab — 🎬 демо-версія для GitHub.
 *
 *   node tools/make-demo.js <тека>
 *
 * Бере вже скопійовану теку з повним проєктом і лишає в ній навчальний мінімум:
 * по дві історії кожного рівня, одну добірку слів і словник рівно під ці історії.
 * Решта контенту (решта коміксів, теми слів, англійський курс, арабські переклади)
 * лишається тільки на bilohash.com/comiks — у відкритий репозиторій вона не їде.
 * Рушій, малюнки, іконки й інструменти лишаються повністю: демо має працювати.
 */
const fs = require('fs'), path = require('path'), vm = require('vm');

const DIR = process.argv[2];
if (!DIR || !fs.existsSync(path.join(DIR, 'data', 'index.js'))) {
  console.error('Вкажіть теку з копією проєкту: node tools/make-demo.js <тека>');
  process.exit(1);
}
const PER_LEVEL = 2;
const DROP_SHARED = ['data/words2.js', 'data/words3.js', 'data/english.js', 'data/dictionary-en.js', 'data/arabic.js', 'assets/english.js'];

// файли даних написані для браузера (window.COMICS, COMICS.push) — виконуємо їх так само, як tools/load.js
const ctx = () => { const w = {}; w.window = w; vm.createContext(w); return w; };
const run = (w, f) => { const p = path.join(DIR, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), w, { filename: f }); return w; };

// 1) які комікси лишаємо: по дві найперші історії кожного рівня
const reg = run(ctx(), 'data/index.js').KOMIKS_DATA;
const entries = reg.comics.filter(e => !e.private);
const levels = {}, keep = [];
for (const e of entries) {
  const w = run(ctx(), e.file);
  const c = (w.COMICS || [])[0];
  if (!c) continue;
  const lv = c.level || 'A1';
  levels[lv] = (levels[lv] || 0) + 1;
  if (levels[lv] <= PER_LEVEL) keep.push({ entry: e, comic: c });
}
const keepFiles = new Set(keep.map(k => k.entry.file));

// 2) новий реєстр
const shared = reg.shared.filter(f => !DROP_SHARED.includes(f));
const head = `/*
 * РЕЄСТР ДЕМО-ВЕРСІЇ Комікс·Lab
 * ----------------------------
 * Це відкрита демо-збірка: ${keep.length} історій із ${entries.length}, одна добірка слів
 * і словник рівно під ці історії. Повний курс — на https://bilohash.com/comiks/
 */
`;
fs.writeFileSync(path.join(DIR, 'data', 'index.js'),
  head + 'window.KOMIKS_DATA = ' + JSON.stringify({ version: 'demo', shared, comics: keep.map(k => ({ file: k.entry.file })) }, null, 2) + ';\n', 'utf8');

// 3) прибираємо зайві файли даних
let removed = 0;
for (const e of entries) if (!keepFiles.has(e.file)) { fs.rmSync(path.join(DIR, e.file), { force: true }); removed++; }
for (const f of DROP_SHARED) { const p = path.join(DIR, f); if (fs.existsSync(p)) { fs.rmSync(p, { force: true }); removed++; } }

// 4) словник обрізаємо до слів, які справді трапляються в демо-історіях
const words = new Set();
for (const { comic } of keep) {
  comic.vocab.forEach(([no]) => words.add(String(no).toLowerCase()));
  comic.panels.forEach(p => p.lines.forEach(l => (String(l.no).match(/[\p{L}'’-]+/gu) || []).forEach(t => words.add(t.toLowerCase()))));
}
const full = run(ctx(), 'data/dictionary.js').DICT || { no: {}, en: {} };
const cut = src => Object.fromEntries(Object.entries(src || {}).filter(([k]) => words.has(k.toLowerCase())));
const demoDict = { no: cut(full.no), en: cut(full.en) };
fs.writeFileSync(path.join(DIR, 'data', 'dictionary.js'),
  '/* Словник демо-версії: лише слова з відкритих історій. Повний — на bilohash.com/comiks */\nwindow.DICT = '
  + JSON.stringify(demoDict, null, 1) + ';\n', 'utf8');

// 5) маніфест озвучки лишаємо тільки для текстів, які є в демо
const texts = new Set(words);
for (const { comic } of keep) comic.panels.forEach(p => p.lines.forEach(l => texts.add(l.no)));
for (const th of ((run(ctx(), 'data/words.js').WORDS || {}).themes || [])) for (const [no] of th.words) texts.add(no);
const fullAudio = run(ctx(), 'data/audio.js').AUDIO || {};
const audio = {};
for (const [k, v] of Object.entries(fullAudio)) {
  const text = k.split('|').slice(-1)[0];
  if (texts.has(text) || texts.has(text.toLowerCase())) audio[k] = v;
}
fs.writeFileSync(path.join(DIR, 'data', 'audio.js'),
  '/* Озвучка демо-версії. mp3 у репозиторій не кладемо — згенеруйте tools/gen_audio.py */\nwindow.AUDIO = '
  + JSON.stringify(audio) + ';\n', 'utf8');

console.log(`🎬 демо: ${keep.length} історій із ${entries.length} · рівні: ${keep.map(k => k.comic.level).join(', ')}`);
console.log(`   словник: ${Object.keys(demoDict.no).length} слів · озвучка: ${Object.keys(audio).length} ключів · прибрано файлів: ${removed}`);
