// Збирає data/arabic.js (window.AR_EN) з перекладів у tools/arabic/*.txt: node tools/build-arabic.js
const fs = require('fs');
const D = require('path').join(__dirname, 'arabic') + '/'; // tools/arabic: *.txt «номер|переклад» + списки англійських рядків
const a = JSON.parse(fs.readFileSync(D + 'en_strings.json', 'utf8'));
const L = a.filter(x => x[1] === 'title' || x[1] === 'line').map(x => x[0]);
const R = a.filter(x => x[1] !== 'title' && x[1] !== 'line').map(x => x[0]);
const map = {}; let miss = [];
const read = (prefix, list) => { for (const f of fs.readdirSync(D).filter(f => f.startsWith(prefix)).sort()) for (const line of fs.readFileSync(D + f, 'utf8').split(/\r?\n/)) { const m = /^(\d+)\|(.+)$/.exec(line); if (!m) continue; const en = list[+m[1]]; if (en) map[en] = m[2].trim(); } };
read('L', L); read('R', R); read('S', JSON.parse(fs.existsSync(D + 'extra_strings.json') ? fs.readFileSync(D + 'extra_strings.json', 'utf8') : '[]'));
for (const s of [...L, ...R]) if (!map[s]) miss.push(s);
const out = '/* العربية — переклади для підказок: англійський текст → арабський (генерується tools/…; див. CLAUDE.md).\n   Завантажується лише тоді, коли учень обрав арабську мову перекладу. */\nwindow.AR_EN = ' + JSON.stringify(map, null, 0).replace(/","/g, '",\n"') + ';\n';
fs.writeFileSync(require('path').join(__dirname, '..', 'data', 'arabic.js'), out);
console.log('entries', Object.keys(map).length, 'missing', miss.length, miss.slice(0, 10), 'KB', Math.round(out.length / 1024));
