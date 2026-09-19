// Перевірка даних: node tools/check.js
// Показує помилки в коміксах і норвезькі слова без перекладу (з готовою заготовкою для вставки).
const W = require('./load.js')({ skipAudio: true });
const ART = W.KomiksArt || { props: [], backgrounds: [], moods: [], poses: [] };
const errors = [], warns = [];
const ids = new Set();
const tokens = s => (s.toLowerCase().match(/[\p{L}\p{N}’'-]+/gu) || []);
const missing = new Map(), missingEn = new Map();

for (const c of W.COMICS) {
  const at = `${c.id} (${c._file})`;
  if (ids.has(c.id)) errors.push(`${at}: id повторюється`);
  ids.add(c.id);
  for (const k of ['title', 'titleUk', 'summaryUk', 'panels', 'vocab']) if (!c[k] || (Array.isArray(c[k]) && !c[k].length)) errors.push(`${at}: немає поля ${k}`);
  (c.panels || []).forEach((p, pi) => {
    const where = `${at} кадр ${pi + 1}`;
    const a = p.art;
    if (!a) warns.push(`${where}: немає art — кадр буде намальовано спрощено`);
    else {
      if (a.bg && !ART.backgrounds.includes(a.bg)) errors.push(`${where}: невідомий фон «${a.bg}» (є: ${ART.backgrounds.join(', ')})`);
      (a.chars || []).forEach(x => {
        if (!W.CHARACTERS[x.id] || !W.CHARACTERS[x.id].look) errors.push(`${where}: персонаж «${x.id}» без look у data/characters.js`);
        if (x.mood && !ART.moods.includes(x.mood)) errors.push(`${where}: невідома емоція «${x.mood}» (є: ${ART.moods.join(', ')})`);
        if (x.pose && !ART.poses.includes(x.pose)) errors.push(`${where}: невідома поза «${x.pose}» (є: ${ART.poses.join(', ')})`);
      });
      (a.props || []).forEach(x => { if (!ART.props.includes(x.type)) errors.push(`${where}: невідомий предмет «${x.type}» (є: ${ART.props.join(', ')})`); });
      const inScene = new Set((a.chars || []).map(x => x.id));
      (p.lines || []).forEach(l => { if (l.who !== 'sfx' && l.who !== 'narrator' && !inScene.has(l.who)) warns.push(`${where}: ${l.who} говорить, але не намальований у кадрі`); });
    }
    if (!p.lines || !p.lines.length) warns.push(`${where}: немає реплік`);
    (p.lines || []).forEach((l, li) => {
      if (!W.CHARACTERS[l.who]) errors.push(`${where}.${li + 1}: невідомий персонаж «${l.who}» — додайте в data/characters.js`);
      if (!l.no || !l.uk) errors.push(`${where}.${li + 1}: немає тексту no/uk`);
      if (!l.en) errors.push(`${where}.${li + 1}: немає англійського перекладу en`);
      for (const w of tokens(l.no || '')) {
        if (!W.DICT.no[w] && !W.DICT.no[w.replace(/’/g, "'")]) missing.set(w, `${c.id}: ${l.no}`);
        if (!(W.DICT.en || {})[w] && !(W.DICT.en || {})[w.replace(/’/g, "'")]) missingEn.set(w, `${c.id}: ${l.no}`);
      }
    });
  });
  if (!c.titleEn) errors.push(`${at}: немає поля titleEn`);
  for (const k of ['summaryEn', 'summaryNo', 'category', 'level']) if (!c[k]) errors.push(`${at}: немає поля ${k}`);
  if (c.category && W.BASICS && !W.BASICS.categories[c.category]) errors.push(`${at}: невідома категорія «${c.category}» (є: ${Object.keys(W.BASICS.categories).join(', ')})`);
  if (c.level && W.BASICS && !W.BASICS.levels.includes(c.level)) errors.push(`${at}: невідомий рівень «${c.level}»`);
  (c.vocab || []).forEach(v => { if (!Array.isArray(v) || v.length !== 3) errors.push(`${at}: vocab має бути [no, uk, en], а не ${JSON.stringify(v)}`); });
}

// граматика, звуки, годинник, імена в тестах («Mamma sier: …») — теж із перекладом при наведенні
const extraText = [];
for (const tp of ((W.GRAMMAR || {}).topics || [])) {
  if (!tp.id || !tp.level || !tp.no || !tp.uk || !tp.en || !tp.rule || !Array.isArray(tp.items)) errors.push(`граматика ${tp.id}: бракує полів id/level/no/uk/en/rule/items`);
  (tp.table || []).forEach(r => { extraText.push([r[0], 'grammar ' + tp.id]); if (r.length !== 3) errors.push(`граматика ${tp.id}: рядок таблиці має бути [no, uk, en]`); });
  (tp.examples || []).forEach(r => { extraText.push([r[0], 'grammar ' + tp.id]); if (r.length !== 3) errors.push(`граматика ${tp.id}: приклад має бути [no, uk, en]`); });
  (tp.items || []).forEach(it => {
    if (!Array.isArray(it) || it.length !== 3 || !String(it[0]).includes('_') || !Array.isArray(it[2]) || it[2].length < 3) { errors.push(`граматика ${tp.id}: завдання ${JSON.stringify(it)} — формат [«речення з _», відповідь, [3 хибні]]`); return; }
    if (it[2].includes(it[1])) errors.push(`граматика ${tp.id}: відповідь «${it[1]}» є серед хибних`);
    extraText.push([it[0].replace('_', it[1]), 'grammar ' + tp.id]);
    // хибні варіанти часто навмисно неіснуючі форми (snakkte, boer) — їх не перекладаємо
  });
}
// англійський курс: структура історій і покриття словника
const missEn = new Map();
for (const c of ((W.ENGLISH || {}).comics || [])) {
  const at = `англійська ${c.id}`;
  for (const k of ['id', 'level', 'title', 'titleUk', 'summaryUk', 'summaryEn', 'category']) if (!c[k]) errors.push(`${at}: немає поля ${k}`);
  if (c.style !== 'strip') warns.push(`${at}: стиль не «strip» — англійські історії мають інший вигляд`);
  (c.panels || []).forEach((p, pi) => {
    const a2 = (p.art || {});
    if (a2.bg && !ART.backgrounds.includes(a2.bg)) errors.push(`${at}.${pi + 1}: невідомий фон «${a2.bg}»`);
    (a2.chars || []).forEach(x => { if (!W.CHARACTERS[x.id]) errors.push(`${at}.${pi + 1}: невідомий персонаж «${x.id}»`); });
    (a2.props || []).forEach(x => { if (!ART.props.includes(x.type)) errors.push(`${at}.${pi + 1}: невідомий предмет «${x.type}»`); });
    const inScene = new Set((a2.chars || []).map(x => x.id));
    (p.lines || []).forEach((l, li) => {
      if (!l.en || !l.uk || !l.no) errors.push(`${at}.${pi + 1}.${li + 1}: потрібні en, uk і no`);
      if (!W.CHARACTERS[l.who]) errors.push(`${at}.${pi + 1}.${li + 1}: невідомий персонаж «${l.who}»`);
      if (l.who !== 'narrator' && l.who !== 'sfx' && !inScene.has(l.who)) warns.push(`${at}.${pi + 1}: ${l.who} говорить, але не намальований`);
      for (const w of String(l.en || '').toLowerCase().match(/[\p{L}']+/gu) || []) {
        const D = W.DICT_EN || { uk: {} };
        const inVocab = (c.vocab || []).some(([en]) => en.toLowerCase() === w || en.toLowerCase().split(/\s+/).includes(w));
        if (!(D.uk || {})[w] && !inVocab) missEn.set(w, `${c.id}: ${l.en}`);
      }
    });
  });
  (c.vocab || []).forEach(v => { if (!Array.isArray(v) || v.length !== 3) errors.push(`${at}: vocab має бути [en, uk, no], а не ${JSON.stringify(v)}`); });
}
if (missEn.size) {
  console.log(`
Бракує англійських слів у data/dictionary-en.js — ${missEn.size}:`);
  for (const [w, ctx] of missEn) console.log(`    '${w}': '',   // ${ctx.slice(0, 70)}`);
  errors.push(`англійський словник: бракує ${missEn.size} слів`);
}

// тематичні слова
const seenWord = new Set();
for (const th of ((W.WORDS || {}).themes || [])) {
  if (!th.id || !th.level || !th.no || !th.uk || !th.en || !th.icon || !Array.isArray(th.words)) { errors.push(`слова ${th.id}: бракує полів id/level/no/uk/en/icon/words`); continue; }
  if (W.BASICS && !W.BASICS.levels.includes(th.level)) errors.push(`слова ${th.id}: невідомий рівень «${th.level}»`);
  if (th.words.length < 8) warns.push(`слова ${th.id}: лише ${th.words.length} слів — додайте ще`);
  const inTheme = new Set();
  th.words.forEach(w => {
    if (!Array.isArray(w) || w.length !== 4 || !w.every(Boolean)) { errors.push(`слова ${th.id}: слово має бути [no, uk, en, emoji], а не ${JSON.stringify(w)}`); return; }
    if (inTheme.has(w[0])) errors.push(`слова ${th.id}: слово «${w[0]}» повторюється в темі`);
    inTheme.add(w[0]);
    const key = th.id + '|' + w[0];
    if (seenWord.has(key)) errors.push(`слова: дубль «${w[0]}»`);
    seenWord.add(key);
  });
}

const PH = (W.BASICS || {}).phonetics;
if (PH) {
  for (const k of ['vowels', 'voiced', 'voiceless', 'silent']) (PH[k].items || []).forEach(([, w]) => extraText.push([w, 'phonetics']));
  PH.pairs.items.forEach(([, , a, b]) => extraText.push([a + ' ' + b, 'phonetics']));
  PH.diphthongs.items.forEach(([, ws]) => extraText.push([ws.join(' '), 'phonetics']));
  PH.combos.items.forEach(c => extraText.push([c.words.join(' '), 'phonetics']));
  PH.long.items.forEach(([a, b]) => extraText.push([a + ' ' + b, 'phonetics']));
  PH.syllables.words.forEach(([, w]) => extraText.push([w, 'phonetics']));
}
extraText.push(['klokka er ett to tre fire fem seks sju åtte ni ti elleve tolv halv kvart over på sier', 'clock / tests']);
Object.values(W.CHARACTERS).forEach(ch => { if (ch.no) extraText.push([ch.no, 'characters']); });
for (const [text, where] of extraText) for (const w of tokens(text)) {
  if (!W.DICT.no[w] && !W.DICT.no[w.replace(/’/g, "'")]) missing.set(w, `${where}: ${text}`);
  if (!(W.DICT.en || {})[w] && !(W.DICT.en || {})[w.replace(/’/g, "'")]) missingEn.set(w, `${where}: ${text}`);
}

console.log(`Коміксів: ${W.COMICS.length} · реплік: ${W.COMICS.reduce((s, c) => s + c.panels.reduce((a, p) => a + p.lines.length, 0), 0)} · норвезьких слів у словнику: ${Object.keys(W.DICT.no).length}`);
warns.forEach(w => console.log('⚠ ' + w));
errors.forEach(e => console.log('✖ ' + e));
if (missing.size) {
  console.log(`\nБракує перекладу — ${missing.size} слів. Вставте в data/dictionary.js (розділ no) або в words.no коміксу:`);
  for (const [w, ctx] of missing) console.log(`    '${w}': '',   // ${ctx.slice(0, 70)}`);
}
if (missingEn.size) {
  console.log(`\nБракує англійського перекладу — ${missingEn.size} слів. Вставте в data/dictionary.js (розділ en) або в words.en коміксу:`);
  for (const [w, ctx] of missingEn) console.log(`    '${w}': '',   // ${ctx.slice(0, 70)}`);
}
if (!errors.length && !missing.size && !missingEn.size) console.log('✔ Усе гаразд: кожне норвезьке слово має переклад українською та англійською.');
process.exitCode = errors.length ? 1 : 0;
