// Збірка: node tools/build.js
//  1) нова версія файлів (?v=…) — браузер завжди отримує свіжий застосунок, а не старий з кешу
//  2) SEO: статичний текст сторінки, canonical, Open Graph
//  3) og-image.png та іконки через Microsoft Edge (headless), якщо їх немає або --images
//  4) публічна версія в dist/ (без private-коміксів, лише потрібне аудіо) + sitemap.xml, robots.txt
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const load = require('./load.js');
const ROOT = load.ROOT;
const site = JSON.parse(fs.readFileSync(path.join(__dirname, 'site.json'), 'utf8'));
const base = site.siteUrl.replace(/\/?$/, '/');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const wr = (f, s) => fs.writeFileSync(path.join(ROOT, f), s, 'utf8');

// 1) версія
const version = Date.now().toString(36);
wr('data/index.js', rd('data/index.js').replace(/version:\s*'[^']*'/, `version: '${version}'`));
const W = load();
// скільки тематичних слів у наборі — цифру в SEO-тексті рахуємо, а не пишемо руками
const WORDS_N = ((W.WORDS || {}).themes || []).reduce((n, t) => n + t.words.length, 0);
const THEMES_N = ((W.WORDS || {}).themes || []).length;

function prerender(comics) {
  const items = comics.map(c => `  <article>
    <h3>${esc(c.titleEn || c.title)} <small lang="nb">(${esc(c.title)}, ${esc(c.level || '')})</small></h3>
    <p>${esc(c.summaryEn || '')}</p>
    <p lang="nb">${esc(c.summaryNo || '')}</p>
    <p>Words: ${c.vocab.map(([no, , en]) => `<span lang="nb">${esc(no)}</span> — ${esc(en || '')}`).join(' · ')}</p>
    <p><a href="${base}komiks/${c.id}/">Read “${esc(c.titleEn || c.title)}” — Norwegian comic with English translation</a></p>
  </article>`).join('\n');
  return `<!-- prerender:start -->
<section class="seo-static">
  <h1>Learn Norwegian with Comics — a free Norwegian course with real voices</h1>
  <p>Komiks·Lab helps you learn Norwegian (Bokmål) through short, funny comics about real life in Norway. Every line is read aloud by a natural Norwegian voice, and every word has an English translation when you hover or tap it. Levels A1, A2, B1 and B2 — from your first “Hei!” to talking with colleagues, landlords and doctors.</p>
  <p>Made for expats, international workers and families moving to Norway, and for anyone preparing for a Norwegian course or the Norskprøven exam.</p>
  <p>🤖 All stories, characters, drawings and voices are fictional and created with artificial intelligence.</p>
  <h2>What you get</h2>
  <ul>
    <li>Voiced Norwegian comics: listen to every line, slow it down, repeat.</li>
    <li>English translation of every word and sentence on hover, with grammar hints.</li>
    <li>Norwegian grammar with tables: pronouns, present and past tense, en/ei/et nouns, adjectives, prepositions and word order.</li>
    <li>${WORDS_N} words in ${THEMES_N} topics: work, housing, food, health, family, traffic, winter, public services and free time — each with a picture and audio.</li>
    <li>Tests in Norwegian, flashcards with spaced repetition, the Logic Race and Math Rocket games, and a personal study plan.</li>
    <li>Play together: a teacher or a friend opens a room with a QR code and everyone answers on their phones.</li>
  </ul>
  <h2>Norwegian comics for everyday life in Norway (A1–B2)</h2>
${items}
  <h2>FAQ</h2>
  <h3>Can I learn Norwegian from zero here?</h3>
  <p>Yes. Start with the A1 comics — simple phrases like “Hvor kommer du fra?” — and every word is translated into English.</p>
  <h3>Is it free?</h3>
  <p>You can start for free in your browser on a phone, tablet or computer — no installation needed.</p>
  <h3>Is it Bokmål or Nynorsk?</h3>
  <p>All lessons use Bokmål, the written standard most people in Norway use.</p>
  <h2 lang="nb">Lær norsk med tegneserier</h2>
  <p lang="nb">Komiks·Lab er en nettside for å lære norsk (bokmål) for voksne og barn: tegneserier på nivå A1, A2, B1 og B2 med ekte stemmer, ordforklaringer på engelsk, grammatikk, ordforråd, tester og spill. For deg som flytter til Norge, jobber i Norge eller går på norskkurs.</p>
</section>
<noscript><p>Please enable JavaScript to use Komiks·Lab.</p></noscript>
<!-- prerender:end -->`;
}
function applyHtml(html, comics) {
  return html
    .replace(/<!-- prerender:start -->[\s\S]*?<!-- prerender:end -->/, prerender(comics))
    .replace(/<!-- seo:canonical -->[\s\S]*?<!-- \/seo:canonical -->/, `<!-- seo:canonical --><link rel="canonical" href="${base}"><!-- /seo:canonical -->`)
    .replace(/<!-- seo:og -->[\s\S]*?<!-- \/seo:og -->/, `<!-- seo:og --><meta property="og:url" content="${base}">
<meta property="og:image" content="${base}og-image.png">
<meta property="og:locale" content="en_GB">
<meta property="og:locale:alternate" content="nb_NO">
<meta property="og:locale:alternate" content="uk_UA">
<link rel="alternate" hreflang="en" href="${base}">
<link rel="alternate" hreflang="x-default" href="${base}">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Course', name: 'Learn Norwegian with Comics — Komiks·Lab',
  description: 'Online Norwegian course with voiced comics A1–B2, English translation of every word, grammar, vocabulary and tests. Made for expats moving to Norway.',
  inLanguage: ['en', 'nb', 'uk'], isAccessibleForFree: true, url: base, image: base + 'og-image.png',
  teaches: 'Norwegian (Bokmål), A1–B2', educationalLevel: 'A1, A2, B1, B2',
  provider: { '@type': 'Organization', name: 'Komiks·Lab', url: base },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT20M' }
})}</script><!-- /seo:og -->`)
    .replace(/<!-- ver:css -->[\s\S]*?<!-- \/ver:css -->/, `<!-- ver:css --><link rel="stylesheet" href="assets/style.css?v=${version}"><!-- /ver:css -->`)
    .replace(/<!-- ver:js -->[\s\S]*?<!-- \/ver:js -->/, `<!-- ver:js --><script src="data/index.js?v=${version}"></script>\n<script src="assets/boot.js?v=${version}"></script><!-- /ver:js -->`);
}
wr('index.html', applyHtml(rd('index.html'), W.COMICS));

// 3) картинки
const EDGE = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
function shot(html, out, w, hgt) {
  if (!EDGE) return console.log('⚠ Edge не знайдено — пропускаю ' + out);
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${w},${hgt}`, '--virtual-time-budget=6000', `--screenshot=${path.join(ROOT, out)}`, 'file:///' + path.join(__dirname, html).replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('🖼  ' + out);
}
const force = process.argv.includes('--images');
fs.mkdirSync(path.join(ROOT, 'icons'), { recursive: true });
if (force || !fs.existsSync(path.join(ROOT, 'og-image.png'))) shot('og.html', 'og-image.png', 1200, 630);
// набір іконок для ярликів (Windows, Android, iPhone) малює tools/gen-icons.py
if (force || !fs.existsSync(path.join(ROOT, 'icons/favicon.ico'))) {
  try {
    execFileSync('python', [path.join(__dirname, 'gen-icons.py')], { cwd: ROOT, stdio: 'ignore' });
    console.log('🖼  icons/ — іконки й екрани запуску перемальовано');
  } catch { console.log('⚠ іконки не перемальовано (потрібен python + Pillow): tools/gen-icons.py'); }
}

// 4) dist/
const DIST = path.join(ROOT, 'dist');
// очищаємо вміст, а не саму папку — так збірка працює, навіть якщо dist відкрита в Провіднику
fs.mkdirSync(DIST, { recursive: true });
for (const e of fs.readdirSync(DIST)) {
  try { fs.rmSync(path.join(DIST, e), { recursive: true, force: true, maxRetries: 3 }); } catch (err) { console.log(`⚠ Не вдалося видалити dist/${e}: ${err.code}`); }
}
const copyDir = d => {                                   // тека цілком (icons/ з усіма розмірами)
  const src = path.join(ROOT, d); if (!fs.existsSync(src)) return;
  fs.mkdirSync(path.join(DIST, d), { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.isDirectory()) copyDir(path.join(d, e.name));
    else fs.copyFileSync(path.join(src, e.name), path.join(DIST, d, e.name));
  }
};
const copy = f => { const src = path.join(ROOT, f); if (!fs.existsSync(src)) return; const dst = path.join(DIST, f); fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); };
const pub = W.COMICS.filter(c => !c._private);
const reg = W.KOMIKS_DATA;
['assets/app.js', 'assets/art.js', 'assets/i18n.js', 'assets/a11y.js', 'assets/icons.js', 'assets/avatars.js', 'assets/profile.js', 'assets/game.js', 'game/index.html', 'assets/grammar.js', 'assets/words.js', 'assets/english.js', 'assets/math.js', 'assets/music.js', 'assets/rocket.js', 'assets/race.js', 'assets/chess.js', 'assets/messages.js', 'assets/pics.js', 'assets/pics2.js', 'assets/pics3.js', 'assets/news.js', 'assets/feedback.js', 'assets/premium.js', 'assets/teacher.js', 'assets/call.js', 'assets/write.js', 'assets/exam.js', 'assets/placement.js', 'assets/install.js', 'assets/bots.js', 'assets/players.js', 'assets/friends.js', 'assets/auth.js', 'api/wall.php', 'api/players.php', 'api/lib.php', 'api/auth.php', 'api/feedback.php', 'api/billing.php', 'api/teacher.php', 'api/call.php', 'api/write.php', 'api/tts.php', 'api/realtime.php', 'api/health.php', 'api/edge_tts.php', 'api/stripe-webhook.php', 'api/messages.php', 'api/config.sample.php', 'api/.htaccess', 'api/admin_ui.php', 'admin.php', 'install.php', 'assets/extras.js', 'assets/vendor/peerjs.min.js', 'assets/vendor/qrcode.js', 'assets/boot.js', 'assets/style.css', 'data/characters.js', 'data/dictionary.js', 'data/basics.js', 'data/phonetics.js', 'data/grammar.js', 'data/words.js', 'data/words2.js', 'data/words3.js', 'data/english.js', 'data/dictionary-en.js', 'data/arabic.js', 'manifest.webmanifest', 'sw.js', 'og-image.png', 'browserconfig.xml'].forEach(copy);
copyDir('icons');
pub.forEach(c => copy(c._file));
fs.writeFileSync(path.join(DIST, 'data/index.js'), `window.KOMIKS_DATA = ${JSON.stringify({ version, shared: reg.shared, comics: reg.comics.filter(e => !e.private) }, null, 2)};\n`, 'utf8');

const pubTexts = new Set(['Hei hei! Nå leser jeg med glad stemme!', 'Nå har alle figurene sin egen stemme.', 'Nå snakker alle med forskjellige stemmer!']);
pub.forEach(c => c.panels.forEach(p => p.lines.forEach(l => pubTexts.add(l.no))));
// англійський курс: репліки теж мають озвучення
for (const c of ((W.ENGLISH || {}).comics || [])) c.panels.forEach(p => p.lines.forEach(l => pubTexts.add(l.en)));
const audio = {};
for (const [key, file] of Object.entries(W.AUDIO || {})) {
  const [kind, , , ...rest] = key.split('|');
  if (kind === 'word' || pubTexts.has(rest.join('|'))) { audio[key] = file; copy(`audio/${file}.mp3`); }
}
fs.writeFileSync(path.join(DIST, 'data/audio.js'), `window.AUDIO = ${JSON.stringify(audio)};\n`, 'utf8');
fs.writeFileSync(path.join(DIST, 'index.html'), applyHtml(rd('index.html'), pub), 'utf8');
fs.writeFileSync(path.join(DIST, 'sw.js'), rd('sw.js').replace(/komiks-v[\w-]+/, 'komiks-' + version), 'utf8');


// 5) статичні сторінки коміксів трьома мовами (окремі адреси + hreflang) і карта сайту
//    /komiks/<id>/ — англійська (x-default), /no/komiks/<id>/ — норвезька, /uk/komiks/<id>/ — українська
const CHS = (W.CHARACTERS || {});
const PAGE_CSS = `body{margin:0;font:17px/1.55 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#fff8ea;color:#141414}
main{max-width:860px;margin:0 auto;padding:20px 16px 60px}a{color:#1565c0}header.top{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;padding:12px 16px;background:#ffd23f;border-bottom:4px solid #141414}
header.top b{font:900 1.3rem system-ui}header.top nav{display:flex;gap:10px;flex-wrap:wrap}h1{font-size:clamp(1.7rem,5vw,2.4rem);line-height:1.15;margin:.4em 0}h1 small{font-size:.55em;color:#555}.lvl{display:inline-block;padding:2px 10px;border-radius:999px;background:#141414;color:#ffd23f;font-weight:800;font-size:.85rem}
.cta{display:inline-block;margin:10px 0;padding:14px 22px;border-radius:999px;background:#ee4035;color:#fff;font-weight:900;text-decoration:none;border:3px solid #141414;box-shadow:4px 4px 0 #141414}
.card{background:#fff;border:3px solid #141414;border-radius:16px;padding:14px 16px;margin:14px 0}.line{margin:6px 0}.line small{color:#666;display:block}
table{border-collapse:collapse;width:100%}td{border-bottom:1px solid #eee;padding:6px 4px}ul.list{columns:2 260px;padding-left:18px}footer{margin-top:30px;color:#666;font-size:.9rem}
figure{margin:0 0 14px}figure img{width:100%;height:auto;display:block;border:3px solid #141414;border-radius:16px;background:#fff}figcaption{color:#666;font-size:.9rem;margin-top:6px}
.strip{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin:14px 0}
.crumbs{font-size:.9rem;color:#555;margin:10px 0 0}.crumbs a{color:#1565c0}`;
const L10N = {
  en: { dir: '', html: 'en', hl: 'en', locale: 'en_GB', flag: '🇬🇧 English', top: 'Learn Norwegian with comics →', all: 'All Norwegian comics', ai: '🤖 All stories, characters, drawings and voices are fictional and created with AI.',
    lvl: l => `Norwegian ${l}`, cta: '📖 Read the comic with Norwegian audio', dlg: 'Dialogue in Norwegian with English translation', words: 'Norwegian words from this comic', more: l => `More Norwegian comics, level ${l}`,
    name: c => c.titleEn || c.title, sum: c => c.summaryEn || '', tr: l => l.en || '', voc: v => v[2] || '', who: ch => ch.en || ch.no,
    title: c => `${c.titleEn || c.title} (${c.title}) — Learn Norwegian with a comic, ${c.level} | Komiks·Lab`, desc: c => `Learn Norwegian with “${c.titleEn || c.title}”: ${c.summaryEn || ''} Norwegian audio and English translation.`,
    hubT: 'Norwegian Comics for Learners (A1–B2) — Learn Norwegian | Komiks·Lab', hubD: n => `${n} Norwegian comics with audio and English translation for beginners and expats moving to Norway.`, hubH: n => `Norwegian comics for learners (${n})`, hubP: 'Short stories about everyday life in Norway, with Norwegian audio and English translation.', level: l => `Level ${l}` },
  no: { dir: 'no/', html: 'nb', hl: 'nb', locale: 'nb_NO', flag: '🇳🇴 Norsk', top: 'Lær norsk med tegneserier →', all: 'Alle tegneserier på norsk', ai: '🤖 Alle historier, figurer, tegninger og stemmer er oppdiktet og laget med kunstig intelligens.',
    lvl: l => `Norsk ${l}`, cta: '📖 Les tegneserien med lyd', dlg: 'Replikker på norsk med engelsk oversettelse', words: 'Ord fra tegneserien', more: l => `Flere tegneserier på nivå ${l}`,
    name: c => c.title, sum: c => c.summaryNo || '', tr: l => l.en || '', voc: v => v[2] || '', who: ch => ch.no,
    title: c => `${c.title} – norsk tegneserie med lyd, nivå ${c.level} | Komiks·Lab`, desc: c => `${c.summaryNo || ''} Lær norsk med lyd og oversettelse – for voksne, barn og deg som er ny i Norge.`,
    hubT: 'Tegneserier for å lære norsk (A1–B2) | Komiks·Lab', hubD: n => `${n} tegneserier med lyd for å lære norsk – for voksne, barn og innvandrere. Gratis på nett.`, hubH: n => `Tegneserier for å lære norsk (${n})`, hubP: 'Korte historier om hverdagen i Norge, med norsk lyd og oversettelse.', level: l => `Nivå ${l}` },
  uk: { dir: 'uk/', html: 'uk', hl: 'uk', locale: 'uk_UA', flag: '🇺🇦 Українська', top: 'Вчити норвезьку через комікси →', all: 'Усі комікси норвезькою', ai: '🤖 Усі історії, персонажі, малюнки й озвучення вигадані та створені за допомогою ШІ.',
    lvl: l => `Норвезька ${l}`, cta: '📖 Читати комікс з озвученням', dlg: 'Діалог норвезькою з перекладом українською', words: 'Норвезькі слова з коміксу', more: l => `Ще комікси рівня ${l}`,
    name: c => c.titleUk || c.title, sum: c => c.summaryUk || '', tr: l => l.uk || '', voc: v => v[1] || '', who: ch => ch.uk || ch.no,
    title: c => `${c.titleUk || c.title} (${c.title}) — норвезька через комікси, рівень ${c.level} | Komiks·Lab`, desc: c => `Вчіть норвезьку з коміксом «${c.titleUk || c.title}»: ${c.summaryUk || ''} Озвучення норвезькою й переклад українською.`,
    hubT: 'Комікси для вивчення норвезької (A1–B2) | Komiks·Lab', hubD: n => `${n} коміксів норвезькою з озвученням і перекладом українською — для дорослих і дітей.`, hubH: n => `Комікси для вивчення норвезької (${n})`, hubP: 'Короткі історії про життя в Норвегії з норвезьким озвученням і перекладом українською.', level: l => `Рівень ${l}` }
};
const LANGS3 = Object.keys(L10N);
const pageUrl = (lang, id) => `${base}${L10N[lang].dir}komiks/${id ? id + '/' : ''}`;
const alternates = id => LANGS3.map(l => `<link rel="alternate" hreflang="${L10N[l].hl}" href="${pageUrl(l, id)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${pageUrl('en', id)}">`;
const pageShell = ({ L, title, desc, url, id, body, jsonld, image = '' }) => `<!doctype html>
<html lang="${L.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${alternates(id)}
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image || base + 'og-image.png'}"><meta property="og:locale" content="${L.locale}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${image || base + 'og-image.png'}">
<link rel="icon" href="${base}icons/favicon.ico" sizes="16x16 32x32 48x48 256x256">
<link rel="apple-touch-icon" sizes="180x180" href="${base}icons/apple-touch-icon.png">
${jsonld ? (Array.isArray(jsonld) ? jsonld : [jsonld]).map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n') : ''}
<style>${PAGE_CSS}</style>
</head>
<body>
<header class="top"><b>📚 Komiks·Lab</b><nav>${LANGS3.filter(l => L10N[l] !== L).map(l => `<a href="${pageUrl(l, id)}" hreflang="${L10N[l].hl}">${L10N[l].flag}</a>`).join('')}<a href="${base}">${L.top}</a></nav></header>
<main>
${body}
<footer><p>${L.ai}</p><p><a href="${pageUrl(Object.keys(L10N).find(k => L10N[k] === L), '')}">${L.all}</a> · <a href="${base}">Komiks·Lab</a></p></footer>
</main>
</body>
</html>
`;
// 🖼️ малюнки для статичних сторінок: обкладинка + перші кадри кожного коміксу (SVG, без тексту сторінки)
const ARTW = W.KomiksArt || null;
const IMG_DIR = path.join(DIST, 'img');
function comicImages(c) {
  if (!ARTW) return [];
  fs.mkdirSync(IMG_DIR, { recursive: true });
  const out = [];
  const titleFor = c.titleEn || c.title;
  try {
    const cov = ARTW.cover(c, { title: titleFor, badge: c.level || '', chars: CHS });
    fs.writeFileSync(path.join(IMG_DIR, `${c.id}.svg`), cov, 'utf8');
    out.push({ file: `img/${c.id}.svg`, alt: titleFor, cover: true });
  } catch (e) { /* обкладинка не вийшла — не критично */ }
  const n = Math.min(3, (c.panels || []).length);
  for (let i = 0; i < n; i++) {
    try {
      const svg = ARTW.panel(c, i, { lang: 'no', tr: null, chars: CHS });
      fs.writeFileSync(path.join(IMG_DIR, `${c.id}-${i + 1}.svg`), svg, 'utf8');
      out.push({ file: `img/${c.id}-${i + 1}.svg`, alt: (c.panels[i].lines || []).map(l => l.no).join(' ') || titleFor, i });
    } catch (e) { /* кадр пропускаємо */ }
  }
  return out;
}
const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const byLevel = LEVELS.map(l => [l, pub.filter(c => c.level === l)]).concat([['—', pub.filter(c => !LEVELS.includes(c.level))]]).filter(([, l]) => l.length);
const IMGS = {};
for (const c of pub) IMGS[c.id] = comicImages(c);
for (const lang of LANGS3) {
  const L = L10N[lang];
  for (const c of pub) {
    const url = pageUrl(lang, c.id);
    const lines = c.panels.flatMap(p => p.lines).slice(0, 40);
    const others = pub.filter(x => x.id !== c.id && x.level === c.level).slice(0, 8);
    const imgs = IMGS[c.id] || [];
    const cover = imgs.find(x => x.cover);
    const strip = imgs.filter(x => !x.cover);
    const crumbs = `<p class="crumbs"><a href="${base}">Komiks·Lab</a> › <a href="${pageUrl(lang, '')}">${esc(L.all)}</a> › ${esc(L.name(c))}</p>`;
    const body = `${crumbs}
<p><span class="lvl">${esc(L.lvl(c.level || ''))}</span></p>
<h1>${esc(L.name(c))}${L.name(c) !== c.title ? ` <small lang="nb">— ${esc(c.title)}</small>` : ''}</h1>
<p><b>${esc(L.sum(c))}</b></p>
${lang !== 'no' ? `<p lang="nb">🇳🇴 ${esc(c.summaryNo || '')}</p>` : ''}
${cover ? `<figure><img src="${base}${cover.file}" width="400" height="300" alt="${esc(L.name(c))} — ${esc(L.lvl(c.level || ''))}" loading="eager"></figure>` : ''}
<a class="cta" href="${base}#/read/${c.id}">${L.cta}</a>
${strip.length ? `<div class="strip">${strip.map(im => `<figure><img src="${base}${im.file}" width="400" height="300" alt="${esc(im.alt)}" loading="lazy"><figcaption lang="nb">${esc(im.alt)}</figcaption></figure>`).join('')}</div>` : ''}
<section class="card"><h2>${L.dlg}</h2>
${lines.map(l => `<p class="line"><b>${esc(L.who(CHS[l.who] || { no: l.who }))}:</b> <span lang="nb">${esc(l.no)}</span><small>${esc(L.tr(l))}</small></p>`).join('\n')}
</section>
<section class="card"><h2>${L.words}</h2><table>
${c.vocab.map(v => `<tr><td lang="nb"><b>${esc(v[0])}</b></td><td>${esc(L.voc(v))}</td></tr>`).join('\n')}
</table></section>
${others.length ? `<section><h2>${esc(L.more(c.level || ''))}</h2><ul class="list">${others.map(o => `<li><a href="${pageUrl(lang, o.id)}">${esc(L.name(o))}</a>${L.name(o) !== o.title ? ` <span lang="nb">(${esc(o.title)})</span>` : ''}</li>`).join('')}</ul></section>` : ''}`;
    const jsonld = [
      { '@context': 'https://schema.org', '@type': 'LearningResource', name: L.name(c), description: L.sum(c), inLanguage: [L.html, 'nb'], educationalLevel: c.level, learningResourceType: 'Comic', isAccessibleForFree: true, url, image: imgs.map(im => base + im.file), teaches: (c.vocab || []).slice(0, 12).map(v => v[0]).join(', '), isPartOf: { '@type': 'Course', name: 'Komiks·Lab', url: base } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Komiks·Lab', item: base },
        { '@type': 'ListItem', position: 2, name: L.all, item: pageUrl(lang, '') },
        { '@type': 'ListItem', position: 3, name: L.name(c), item: url }] }];
    const f = path.join(DIST, L.dir, 'komiks', c.id, 'index.html');
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, pageShell({ L, title: L.title(c), desc: L.desc(c).slice(0, 160), url, id: c.id, body, jsonld, image: '' }), 'utf8');
  }
  fs.mkdirSync(path.join(DIST, L.dir, 'komiks'), { recursive: true });
  const hubList = { '@context': 'https://schema.org', '@type': 'ItemList', name: L.hubH(pub.length), numberOfItems: pub.length,
    itemListElement: pub.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: pageUrl(lang, c.id), name: L.name(c) })) };
  fs.writeFileSync(path.join(DIST, L.dir, 'komiks', 'index.html'), pageShell({ L, title: L.hubT, desc: L.hubD(pub.length), url: pageUrl(lang, ''), id: '', jsonld: hubList,
    body: `<h1>${esc(L.hubH(pub.length))}</h1>\n<p>${esc(L.hubP)}</p>\n` + byLevel.map(([l, list]) => `<section><h2>${esc(L.level(l))}</h2><div class="strip">${list.map(c => {
      const im = (IMGS[c.id] || []).find(x => x.cover);
      return `<figure><a href="${pageUrl(lang, c.id)}">${im ? `<img src="${base}${im.file}" width="400" height="300" alt="${esc(L.name(c))}" loading="lazy">` : ''}<figcaption><b>${esc(L.name(c))}</b>${L.name(c) !== c.title ? ` <span lang="nb">(${esc(c.title)})</span>` : ''}</figcaption></a></figure>`;
    }).join('')}</div></section>`).join('\n') }), 'utf8');
}

const today = new Date().toISOString().slice(0, 10);
const smAlt = id => LANGS3.map(l => `    <xhtml:link rel="alternate" hreflang="${L10N[l].hl}" href="${pageUrl(l, id)}"/>`).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('en', id)}"/>`;
// картинки коміксу теж у мапі сайту — щоб малюнки потрапили в пошук зображень
const smImg = id => (IMGS[id] || []).map(im => `    <image:image><image:loc>${base}${im.file}</image:loc><image:title>${esc(im.alt)}</image:title></image:image>`).join('\n');
const smUrl = (loc, prio, freq, id) => {
  const extra = id === undefined ? '' : '\n' + smAlt(id) + (id ? '\n' + smImg(id) : '') + '\n  ';
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority>${extra}</url>`;
};
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${smUrl(base, '1.0', 'weekly')}
${LANGS3.map(l => smUrl(pageUrl(l, ''), '0.9', 'weekly', '')).join('\n')}
${pub.flatMap(c => LANGS3.map(l => smUrl(pageUrl(l, c.id), l === 'en' ? '0.8' : '0.7', 'monthly', c.id))).join('\n')}
</urlset>
`, 'utf8');
// запобіжник: у dist не може бути жодного конфігу з паролями — лише зразок
for (const bad of ['api/config.php', 'api/config.local.php']) {
  const f = path.join(DIST, bad);
  if (fs.existsSync(f)) { fs.unlinkSync(f); console.log('⚠ прибрано з dist:', bad); }
}
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`, 'utf8');

const size = dir => fs.readdirSync(dir, { withFileTypes: true }).reduce((s, e) => s + (e.isDirectory() ? size(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size), 0);
console.log(`✔ версія ${version} · index.html оновлено (SEO + ${W.COMICS.length} коміксів)`);
console.log(`✔ dist/: ${pub.length} коміксів, ${Object.keys(audio).length} аудіо-ключів, ${(size(DIST) / 1048576).toFixed(1)} МБ · сайт: ${base}`);
if (base.includes('example.com')) console.log('ℹ Вкажіть адресу сайту в tools/site.json і запустіть збірку ще раз.');
