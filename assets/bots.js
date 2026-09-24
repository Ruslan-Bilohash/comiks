/* Комікс·Lab — 10 віртуальних гравців (боти-суперники). Завжди онлайн, мають власні рівні, складність,
   статистику й ексклюзивні костюми (KomiksAvatars.botCatalog — гравці не можуть їх обрати).
   Використовуються в пошуку гравців, загальному рейтингу, друзях (приймають запит, завжди онлайн) і Логік-гонці.
   Про віртуальних гравців сказано в «Допомозі» (прозорість щодо ШІ). */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  // diff: easy | medium | hard | pro → швидкість (с на крок) і точність у гонці
  const DIFF = { easy: { speed: 6.6, acc: 0.74 }, medium: { speed: 5.3, acc: 0.82 }, hard: { speed: 4.3, acc: 0.88 }, pro: { speed: 3.5, acc: 0.94 } };
  const BOTS = [
    { code: 'BQEM2A', name: 'Emma', avatar: '🐰|unicorn||bolt|ice', level: 'A1', diff: 'easy', learn: ['norsk'], stars: 14, badges: 4, streak: 6, games: 18, raceWins: 1, mathBest: 60, known: 48, knownEn: 0 },
    { code: 'BQJN3S', name: 'Jonas', avatar: '🐻|gamer|cyber||neon', level: 'A2', diff: 'medium', learn: ['norsk', 'math'], stars: 27, badges: 6, streak: 11, games: 41, raceWins: 5, mathBest: 140, known: 130, knownEn: 0 },
    { code: 'BQSF4E', name: 'Sofie', avatar: '🦄|wizard||norflag|aurora', level: 'A2', diff: 'medium', learn: ['english', 'norsk'], stars: 31, badges: 7, streak: 9, games: 33, raceWins: 4, mathBest: 90, known: 110, knownEn: 95 },
    { code: 'BQLK5S', name: 'Lukas', avatar: '🐯|samurai|laser||lava', level: 'B1', diff: 'hard', learn: ['logic', 'math'], stars: 46, badges: 9, streak: 17, games: 77, raceWins: 19, mathBest: 260, known: 210, knownEn: 40 },
    { code: 'BQAS6H', name: 'Aisha', avatar: '🦉|astro|cyber|bolt|midnight', level: 'B1', diff: 'hard', learn: ['norsk', 'english'], stars: 52, badges: 10, streak: 23, games: 64, raceWins: 14, mathBest: 180, known: 320, knownEn: 180 },
    { code: 'BQMG7N', name: 'Magnus', avatar: '🦁|astro|laser|norflag|lava', level: 'B2', diff: 'pro', learn: ['norsk', 'math', 'logic'], stars: 71, badges: 13, streak: 42, games: 128, raceWins: 51, mathBest: 390, known: 520, knownEn: 60 },
    { code: 'BQNG8D', name: 'Ingrid', avatar: '🐧|jester||norflag|ice', level: 'A1', diff: 'easy', learn: ['math'], stars: 9, badges: 3, streak: 4, games: 12, raceWins: 0, mathBest: 110, known: 35, knownEn: 0 },
    { code: 'BQTH9E', name: 'Theo', avatar: '🐵|gamer|||neon', level: 'A2', diff: 'medium', learn: ['logic'], stars: 22, badges: 5, streak: 8, games: 55, raceWins: 9, mathBest: 120, known: 80, knownEn: 20 },
    { code: 'BQLE2H', name: 'Leah', avatar: '🦊|wizard|cyber|bolt|midnight', level: 'B2', diff: 'hard', learn: ['norsk'], stars: 63, badges: 12, streak: 30, games: 49, raceWins: 12, mathBest: 150, known: 610, knownEn: 0 },
    { code: 'BQFP3L', name: 'Filip', avatar: '🐺|samurai|cyber||aurora', level: 'B2', diff: 'pro', learn: ['logic', 'math'], stars: 68, badges: 12, streak: 35, games: 142, raceWins: 58, mathBest: 420, known: 300, knownEn: 110 },
    // сильніші суперники для верхівки рейтингу — щоб було куди рости
    { code: 'BQSG4M', name: 'Sigrid', avatar: '🦢|wizard|laser|norflag|aurora', level: 'B2', diff: 'pro', learn: ['norsk', 'english', 'logic'], stars: 84, badges: 15, streak: 61, games: 176, raceWins: 72, mathBest: 450, known: 720, knownEn: 260 },
    { code: 'BQHK5N', name: 'Henrik', avatar: '🐗|astro|cyber|bolt|lava', level: 'B2', diff: 'pro', learn: ['math', 'logic'], stars: 79, badges: 14, streak: 48, games: 205, raceWins: 88, mathBest: 520, known: 410, knownEn: 90 },
    { code: 'BQYS6A', name: 'Yasmin', avatar: '🦩|jester||norflag|midnight', level: 'B1', diff: 'hard', learn: ['norsk', 'english'], stars: 58, badges: 11, streak: 27, games: 96, raceWins: 21, mathBest: 210, known: 480, knownEn: 300 },
    { code: 'BQOL7V', name: 'Oliver', avatar: '🦝|gamer|cyber||neon', level: 'A2', diff: 'medium', learn: ['norsk', 'logic'], stars: 36, badges: 8, streak: 14, games: 68, raceWins: 11, mathBest: 170, known: 190, knownEn: 45 },
    { code: 'BQMR8T', name: 'Marte', avatar: '🦌|beanie||norflag|ice', level: 'A2', diff: 'medium', learn: ['norsk'], stars: 33, badges: 7, streak: 18, games: 52, raceWins: 7, mathBest: 130, known: 240, knownEn: 0 },
    { code: 'BQAD9M', name: 'Adam', avatar: '🐨|samurai||bolt|neon', level: 'A1', diff: 'easy', learn: ['norsk', 'math'], stars: 16, badges: 4, streak: 7, games: 24, raceWins: 2, mathBest: 90, known: 70, knownEn: 10 },
    { code: 'BQEL2V', name: 'Elise', avatar: '🦔|unicorn||norflag|ice', level: 'A1', diff: 'easy', learn: ['norsk'], stars: 11, badges: 3, streak: 5, games: 19, raceWins: 1, mathBest: 70, known: 52, knownEn: 0 },
    { code: 'BQKR3M', name: 'Karim', avatar: '🦅|astro|laser||midnight', level: 'B1', diff: 'hard', learn: ['norsk', 'math', 'logic'], stars: 61, badges: 12, streak: 33, games: 118, raceWins: 34, mathBest: 330, known: 360, knownEn: 140 },
    { code: 'BQTV4R', name: 'Tuva', avatar: '🐿️|wizard|cyber||aurora', level: 'A2', diff: 'medium', learn: ['english', 'norsk'], stars: 29, badges: 6, streak: 12, games: 47, raceWins: 6, mathBest: 110, known: 160, knownEn: 210 },
    { code: 'BQJH5A', name: 'Johan', avatar: '🦫|gamer||norflag|lava', level: 'B1', diff: 'hard', learn: ['math', 'norsk'], stars: 54, badges: 10, streak: 21, games: 103, raceWins: 27, mathBest: 290, known: 270, knownEn: 60 }
  ];
  const MAP = new Map(BOTS.map(b => [b.code, b]));
  const ACTS = ['words', 'race', 'math', 'read', 'grammar', 'quiz', 'english', 'race'];
  const isBot = code => MAP.has(String(code || ''));
  const get = code => MAP.get(code) || null;
  // чим зайнятий зараз — змінюється кожні ~2 хвилини, у кожного свій ритм
  const activity = code => { const i = BOTS.findIndex(b => b.code === code); return ACTS[(Math.floor(Date.now() / 120000) + i * 3) % ACTS.length]; };
  // картка для пошуку/рейтингу (як з api/players.php)
  const card = b => ({ code: b.code, name: b.name, avatar: b.avatar, learn: b.learn, level: b.level, stars: b.stars, badges: b.badges, streak: b.streak, act: activity(b.code), online: true, seen: new Date().toISOString(), bot: true });
  const cards = () => BOTS.map(card);
  // знімок профілю — у форматі KomiksPlayers.snapshot
  function snapshot(code) {
    const b = get(code); if (!b) return null;
    const K = window.KomiksCore, comics = K ? K.COMICS.length : 30;
    const since = new Date(Date.now() - (60 + b.games) * 86400000).toISOString();
    const T = { race: '🏁 Logikkløpet', rocket: '🚀 Math Rocket', game: '🎮 Spill sammen', level: `Nivåtest ${b.level}`, words: 'Ord: Familie' };
    const day = n => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
    const d = DIFF[b.diff], pct = x => Math.round(x * 10);
    const recent = [
      { t: T.race, s: 10, of: 10, st: 3, d: day(0), pl: b.diff === 'pro' ? 1 : 2, pn: 4 },
      { t: T.rocket, s: pct(d.acc), of: 10, st: d.acc >= 0.9 ? 3 : 2, d: day(1), pl: b.diff === 'easy' ? 3 : 1, pn: 5 },
      { t: T.level, s: pct(d.acc) - 1, of: 10, st: d.acc >= 0.88 ? 2 : 1, d: day(2), pl: 0, pn: 0 },
      { t: T.game, s: pct(d.acc), of: 10, st: 2, d: day(4), pl: b.diff === 'hard' ? 2 : 3, pn: 6 },
      { t: T.words, s: 8, of: 10, st: 2, d: day(6), pl: 0, pn: 0 }
    ];
    return { name: b.name, avatar: b.avatar, created: since, comics, read: Math.min(comics, Math.round(comics * ({ easy: 0.2, medium: 0.45, hard: 0.7, pro: 0.95 })[b.diff])),
      tests: Math.round(b.stars / 2.2), stars: b.stars, known: b.known, knownEn: b.knownEn, cards: Math.round(b.known / 5), streak: b.streak,
      quizzes: Math.round(b.games * 1.4), perfect: Math.round(b.badges / 2), pairs: Math.round(b.games / 10), speak3: Math.round(b.games / 6), roles: b.diff === 'easy' ? 0 : 2,
      games: b.games, raceWins: b.raceWins, mathBest: b.mathBest, items: b.badges, recent, fc: '', bot: true };
  }
  // суперники для гонки: обраний бот + інші зі схожою складністю
  function opponents(n = 3, level = 'easy', forced = null) {
    const pool = { easy: ['easy', 'medium'], medium: ['medium', 'hard'], hard: ['hard', 'pro'], expert: ['pro'] }[level] || ['medium'];
    const mult = { easy: 1, medium: 1.1, hard: 1.25, expert: 1.4 }[level] || 1;
    const shuffled = BOTS.filter(b => b.code !== forced).sort(() => Math.random() - 0.5);
    const pick = [...(forced && get(forced) ? [get(forced)] : []), ...shuffled.filter(b => pool.includes(b.diff)), ...shuffled].filter((b, i, a) => a.indexOf(b) === i).slice(0, n);
    return pick.map(b => ({ code: b.code, name: b.name, avatar: b.avatar, speed: DIFF[b.diff].speed * mult * (0.9 + Math.random() * 0.2), acc: DIFF[b.diff].acc }));
  }
  window.KomiksBots = { list: BOTS, isBot, get, card, cards, snapshot, activity, opponents, DIFF };
})();
