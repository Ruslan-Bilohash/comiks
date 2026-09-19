// Завантажує дані застосунку (реєстр data/index.js) у Node для службових скриптів
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');

module.exports = function load({ skipAudio = false } = {}) {
  const win = {}; win.window = win; vm.createContext(win);
  const run = f => { const p = path.join(ROOT, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), win, { filename: f }); };
  run('data/index.js');
  const reg = win.KOMIKS_DATA;
  reg.shared.filter(f => !(skipAudio && f.endsWith('audio.js'))).forEach(run);
  win.COMICS = [];
  for (const entry of reg.comics) {
    const before = win.COMICS.length;
    run(entry.file);
    win.COMICS.slice(before).forEach(c => { c._file = entry.file; c._private = !!entry.private; });
  }
  win.DICT = win.DICT || { no: {}, uk: {} };
  for (const c of win.COMICS) if (c.words) for (const l of ['no', 'uk', 'en']) win.DICT[l] = Object.assign(win.DICT[l] || {}, c.words[l] || {});
  return win;
};
module.exports.ROOT = ROOT;
