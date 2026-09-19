// Створює заготовку нового коміксу (6 намальованих кадрів) і реєструє її в data/index.js:
//   node tools/new-comic.js 97 "Norsk tittel" "Українська назва" [--private]
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const [num, title = 'Ny historie', titleUk = 'Нова історія'] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const isPrivate = process.argv.includes('--private');
if (!num) { console.log('Використання: node tools/new-comic.js <номер> "Norsk tittel" "Українська назва" [--private]'); process.exit(1); }

const slug = title.toLowerCase().replace(/[åä]/g, 'a').replace(/[øö]/g, 'o').replace(/æ/g, 'ae').normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || 'historie';
const id = 'p' + String(num).padStart(2, '0');
const file = `data/comic-${String(num).padStart(2, '0')}-${slug}.js`;
const abs = path.join(ROOT, file);
if (fs.existsSync(abs)) { console.log('Файл уже існує: ' + file); process.exit(1); }

const q = s => String(s).split('\\').join('\\\\').split("'").join("\\'");
const bgs = ['home', 'park', 'kitchen', 'school', 'forest', 'home'];
const panels = bgs.map(bg => `    { art: { bg: '${bg}', chars: [{ id: 'mia', x: 120, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 280 }], props: [] }, lines: [
      { who: 'mia', no: '', uk: '', en: '' },
      { who: 'leo', no: '', uk: '', en: '' }
    ]}`).join(',\n');

fs.writeFileSync(abs, `window.COMICS = window.COMICS || [];

/* Довідка по полях art — data/_template.js */
COMICS.push({
  id: '${id}',
  level: 'A1',                    // A1 | A2 | B1 | B2
  category: 'hverdag',             // див. data/basics.js → categories
  title: '${q(title)}',
  titleUk: '${q(titleUk)}',
  titleEn: '',
  summaryUk: '',
  summaryEn: '',
  summaryNo: '',
  cover: 0,

  panels: [
${panels}
  ],

  // ключові слова для карток, «Пар» і тестів: [норвезькою, українською, англійською]
  vocab: [
  ],

  // слова для «наведи на слово», яких ще немає в data/dictionary.js
  words: { no: {}, en: {} }
});
`, 'utf8');

const regPath = path.join(ROOT, 'data/index.js');
const reg = fs.readFileSync(regPath, 'utf8');
const line = `    { file: '${file}'${isPrivate ? ', private: true' : ''} }`;
fs.writeFileSync(regPath, reg.replace(/(comics:\s*\[[\s\S]*?)(\n\s*\]\s*\n\s*\};?)/, (m, a, b) => `${a.replace(/\s*$/, '')},\n${line}${b}`), 'utf8');
console.log(`✔ Створено ${file} (id ${id}) і додано в data/index.js.`);
console.log('Далі: заповніть кадри → node tools/check.js → tools\\update.bat');
