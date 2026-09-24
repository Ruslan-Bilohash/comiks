/* Комікс·Lab — готує вміст застосунку (app/www) із готової збірки сайту (dist).
 *
 *   node app/tools/prepare-web.js            — повний офлайн-застосунок (сайт + аудіо, ~100 МБ)
 *   node app/tools/prepare-web.js --light    — тільки код і 200 найпотрібніших озвучень (~15 МБ)
 *   node app/tools/prepare-web.js --remote   — лише оболонка: застосунок відкриває сайт онлайн
 *
 * Навіщо три режими: у сторах є обмеження на розмір, а повне аудіо важить майже сто мегабайтів.
 * Для першого релізу зручно --light: слова й перші комікси звучать одразу, решта підвантажується
 * з bilohash.com, коли є інтернет.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DIST = path.join(ROOT, 'dist');
const WWW = path.join(__dirname, '..', 'www');
const SITE = 'https://bilohash.com/comiks/';
const mode = process.argv.includes('--remote') ? 'remote' : process.argv.includes('--light') ? 'light' : 'full';

if (!fs.existsSync(DIST)) {
  console.error('✖ Немає dist/. Спершу зберіть сайт: node tools/build.js');
  process.exit(1);
}

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW, { recursive: true });

// оболонка «онлайн»: маленький index.html, який відкриває сайт у вебвʼю
if (mode === 'remote') {
  fs.writeFileSync(path.join(WWW, 'index.html'), `<!doctype html>
<html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Komiks·Lab</title><style>html,body{margin:0;height:100%;background:#fff8ea}iframe{border:0;width:100%;height:100%}</style></head>
<body><iframe src="${SITE}" allow="microphone; autoplay; clipboard-write"></iframe></body></html>
`, 'utf8');
  console.log('✔ app/www: режим «онлайн» — застосунок відкриває', SITE);
  process.exit(0);
}

// копіюємо сайт
const skipTop = new Set(['audio', 'komiks', 'no', 'uk', 'sitemap.xml', 'robots.txt', 'install.php', 'admin.php', 'api']);
function copyDir(src, dst, filter) {
  fs.mkdirSync(dst, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dst, name);
    if (filter && !filter(name, from)) continue;
    const st = fs.statSync(from);
    if (st.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}
copyDir(DIST, WWW, name => !skipTop.has(name));

// аудіо: у light-режимі беремо лише слова й перші комікси
const audioSrc = path.join(DIST, 'audio');
const audioDst = path.join(WWW, 'audio');
let copied = 0;
if (fs.existsSync(audioSrc)) {
  fs.mkdirSync(audioDst, { recursive: true });
  const manifestPath = path.join(DIST, 'data', 'audio.js');
  const manifest = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, 'utf8') : '';
  const keep = new Set();
  if (mode === 'light') {
    // ключі виду word|… і репліки перших п’яти коміксів
    for (const m of manifest.matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g)) {
      const [, key, file] = m;
      if (key.startsWith('word|') || /^line\|p9[0-4]\|/.test(key)) keep.add(file + '.mp3');
    }
  }
  for (const f of fs.readdirSync(audioSrc)) {
    if (mode === 'light' && !keep.has(f)) continue;
    fs.copyFileSync(path.join(audioSrc, f), path.join(audioDst, f));
    copied++;
  }
}

/* У застосунку немає PHP, тому серверні можливості (акаунти, дзвінки, стіни) ходять
   на сайт. Додаємо один рядок, який перенаправляє всі запити api/… на bilohash.com. */
const indexPath = path.join(WWW, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('KOMIKS_API_BASE')) {
  html = html.replace('</head>', `<script>
  /* мобільний застосунок: сервер живе на сайті, локально лежать лише файли */
  window.KOMIKS_API_BASE = '${SITE}';
  (() => {
    const f = window.fetch.bind(window);
    window.fetch = (url, opts) => f(typeof url === 'string' && url.startsWith('api/') ? '${SITE}' + url : url, opts);
  })();
</script>
</head>`);
  fs.writeFileSync(indexPath, html, 'utf8');
}

const size = (dir) => {
  let n = 0;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    n += f.isDirectory() ? size(p) : fs.statSync(p).size;
  }
  return n;
};
console.log(`✔ app/www готово · режим: ${mode} · аудіофайлів: ${copied} · розмір: ${(size(WWW) / 1048576).toFixed(1)} МБ`);
