/* Комікс·Lab — 📸 знімки екранів для README на GitHub.
 *
 *   python -m http.server 8941        (у корені проєкту, в іншому вікні)
 *   node tools/gen-screens.js --port 8941
 *
 * Працює через протокол налагодження Microsoft Edge: відкриваємо сторінку, ЧЕКАЄМО, поки
 * потрібний блок справді намалюється, і лише тоді знімаємо. Варіант із --screenshot знімав
 * навпомацки й часто ловив екран завантаження.
 * Готові PNG лягають у docs/screens/.
 */
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'screens');
const portArg = process.argv.indexOf('--port');
const PORT = portArg > -1 ? process.argv[portArg + 1] : '8941';
const CDP = 9333;
const BASE = `http://localhost:${PORT}/tools/shot-init.html?ui=en&go=`;

const EDGE = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p));
if (!EDGE) { console.error('⚠ Microsoft Edge не знайдено — знімки не зроблено.'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

// назва файла · сторінка · ширина · висота · що має з’явитися, перш ніж знімати
const SHOTS = [
  ['home', '#/', 1280, 900, '.play-hero, .hero'],
  ['read', '#/read/p93/1', 1280, 980, '.stage .panel, .panel-art'],
  ['quiz', '#/quiz/p93', 1280, 900, '.q-card .opts'],
  ['words', '#/words/familie', 1280, 900, '.word-grid .word-card'],
  ['today', '#/today', 1280, 820, '.day-tasks .day-task'],
  ['write', '#/write', 1280, 900, '.write-area'],
  ['call', '#/call', 1280, 900, '.call-page, .phone-pick, .call-setup'],
  ['plan', '#/plan', 1280, 1000, '.plan-step, .plan-list, .plan-cfg'],
  ['exam', '#/exam', 1280, 820, '.exam-part'],
  ['cards', '#/cards', 1280, 900, '.flash'],
  ['mobile-home', '#/', 420, 880, '.play-hero, .hero'],
  ['mobile-words', '#/words/mat', 420, 880, '.word-grid .word-card']
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'kl-shot-'));
const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--force-device-scale-factor=1',
  `--remote-debugging-port=${CDP}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

async function cdpList() {
  for (let i = 0; i < 60; i++) {
    try { return await fetch(`http://127.0.0.1:${CDP}/json/list`).then(r => r.json()); } catch { await sleep(250); }
  }
  throw new Error('Edge не відповів на порту налагодження');
}

class Session {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.waiting = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data); const w = this.waiting.get(m.id); if (w) { this.waiting.delete(m.id); w(m); } };
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise(res => this.waiting.set(id, res));
  }
}

(async () => {
  const list = await cdpList();
  const page = list.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  const s = new Session(ws);
  await s.send('Page.enable');
  await s.send('Runtime.enable');

  for (const [name, hash, w, h, ready] of SHOTS) {
    await s.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
    await s.send('Page.navigate', { url: BASE + encodeURIComponent(hash) });
    let ok = false;
    for (let i = 0; i < 80; i++) {                       // чекаємо, поки блок з’явиться
      await sleep(250);
      const r = await s.send('Runtime.evaluate', { expression: `!!document.querySelector(${JSON.stringify(ready)})`, returnByValue: true });
      if (r.result && r.result.result && r.result.result.value) { ok = true; break; }
    }
    await sleep(ok ? 1400 : 400);                        // трохи часу на шрифти й малюнки
    const shot = await s.send('Page.captureScreenshot', { format: 'png' });
    const data = shot.result && shot.result.data;
    if (!data) { console.log(`⚠ ${name}: знімок не вдався`); continue; }
    const file = path.join(OUT, name + '.png');
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    console.log(`📸 docs/screens/${name}.png · ${w}×${h} · ${Math.round(fs.statSync(file).size / 1024)} КБ${ok ? '' : ' · ⚠ блок не з’явився'}`);
  }
  ws.close();
  edge.kill();
  await sleep(300);
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* тимчасова тека лишиться — не страшно */ }
})().catch(e => { console.error('⚠ ' + e.message); edge.kill(); process.exit(1); });
