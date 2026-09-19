/* Фонетика для сторінки алфавіту: голосні, дзвінкі/глухі, дифтонги, звукосполучення, склади.
   items: [літера, слово-приклад]. Переклад слів береться зі словника (data/dictionary.js). */
window.BASICS = window.BASICS || {};
window.BASICS.phonetics = {
  title: { uk: '🗣️ Звуки норвезької: що треба знати учню', en: '🗣️ Norwegian sounds: what every learner needs', no: '🗣️ Norske lyder: dette må du kunne' },
  intro: { uk: 'Натисни на картку — почуєш звук і слово. Наведи — побачиш переклад.', en: 'Tap a card to hear the sound and a word. Hover to see the translation.', no: 'Trykk på et kort for å høre lyden og et ord.' },
  vowels: {
    title: { uk: '🅰️ Голосні (vokaler) — 9', en: '🅰️ Vowels (vokaler) — 9', no: '🅰️ Vokaler — 9' },
    text: { uk: 'A, E, I, O, U, Y, Æ, Ø, Å. Увага: O часто звучить як [у] (sol, bok), U — щось середнє між [ю] і [у] (hus), Y — як [ю] з витягнутими губами (by).', en: 'A, E, I, O, U, Y, Æ, Ø, Å. Note: O often sounds like [oo] (sol, bok), U is between [ü] and [oo] (hus), Y is like [ü] with rounded lips (by).', no: 'A, E, I, O, U, Y, Æ, Ø, Å. O uttales ofte som [u] (sol, bok).' },
    items: [['A', 'mat'], ['E', 'melk'], ['I', 'is'], ['O', 'sol'], ['U', 'hus'], ['Y', 'by'], ['Æ', 'bær'], ['Ø', 'øye'], ['Å', 'båt']]
  },
  voiced: {
    title: { uk: '🔔 Дзвінкі приголосні (stemte)', en: '🔔 Voiced consonants (stemte)', no: '🔔 Stemte konsonanter' },
    text: { uk: 'Вимовляються з голосом — горло вібрує: B, D, G, J, L, M, N, R, V.', en: 'Pronounced with the voice — your throat vibrates: B, D, G, J, L, M, N, R, V.', no: 'Stemmebåndene vibrerer: B, D, G, J, L, M, N, R, V.' },
    items: [['B', 'bok'], ['D', 'dag'], ['G', 'god'], ['J', 'ja'], ['L', 'lys'], ['M', 'mamma'], ['N', 'natt'], ['R', 'rød'], ['V', 'vann']]
  },
  voiceless: {
    title: { uk: '🤫 Глухі приголосні (ustemte)', en: '🤫 Voiceless consonants (ustemte)', no: '🤫 Ustemte konsonanter' },
    text: { uk: 'Без голосу, лише повітря: F, H, K, P, S, T. C, Q, X, Z трапляються переважно в запозиченнях.', en: 'No voice, only air: F, H, K, P, S, T. C, Q, X and Z appear mostly in loanwords.', no: 'Uten stemme: F, H, K, P, S, T. C, Q, X og Z finnes mest i lånord.' },
    items: [['F', 'fisk'], ['H', 'hei'], ['K', 'kake'], ['P', 'pus'], ['S', 'sol'], ['T', 'takk']]
  },
  pairs: {
    title: { uk: '↔️ Пари «дзвінкий — глухий»', en: '↔️ Voiced — voiceless pairs', no: '↔️ Par: stemt — ustemt' },
    text: { uk: 'Губи й язик у тому самому положенні — різниця лише в голосі. І від цього змінюється значення слова!', en: 'Lips and tongue are in the same position — only the voice differs, and it changes the meaning!', no: 'Munnen er lik — bare stemmen er forskjellig.' },
    items: [['b', 'p', 'bil', 'pil'], ['d', 't', 'dag', 'tak'], ['g', 'k', 'gå', 'kake'], ['v', 'f', 'vin', 'fin']]
  },
  diphthongs: {
    title: { uk: '🔀 Дифтонги (diftonger)', en: '🔀 Diphthongs (diftonger)', no: '🔀 Diftonger' },
    text: { uk: 'Дві голосні вимовляються як один склад, плавно переходячи одна в одну.', en: 'Two vowels pronounced as one syllable, gliding into each other.', no: 'To vokaler uttales som én stavelse.' },
    items: [['ei', ['nei', 'hei', 'vei']], ['øy', ['øy', 'høy', 'gøy']], ['au', ['sau', 'haug', 'maur']], ['ai', ['hai', 'kai']], ['oi', ['hoi']]]
  },
  combos: {
    title: { uk: '🧩 Звукосполучення: пишемо так — кажемо інакше', en: '🧩 Letter combinations: written one way, said another', no: '🧩 Lydkombinasjoner' },
    text: { uk: 'Найважливіше для читання: кілька літер дають один звук.', en: 'The most important reading rules: several letters make one sound.', no: 'Flere bokstaver gir én lyd.' },
    items: [
      { spell: 'sj, skj, sk + i/y/ei/øy', sound: '[ʃ] ш', uk: 'як українське «ш»', en: 'like English “sh”', no: 'sj-lyd', words: ['sjø', 'skje', 'ski', 'skyte'] },
      { spell: 'kj, tj, k + i/y/ei/øy', sound: '[ç] хь', uk: 'м’яке «хь», язик біля піднебіння', en: 'a soft “h” with the tongue near the palate (like German “ich”)', no: 'kj-lyd', words: ['kjøre', 'tjue', 'kino', 'kirke'] },
      { spell: 'rs', sound: '[ʃ] ш', uk: 'r + s разом звучать як «ш»', en: 'r + s together sound like “sh”', no: 'r + s blir sj-lyd', words: ['norsk', 'kurs', 'først'] },
      { spell: 'rt, rd, rn, rl', sound: '[ʈ ɖ ɳ ɭ]', uk: '«r» зливається з наступною літерою, язик загинається назад', en: 'the “r” merges with the next letter, tongue curled back', no: 'retroflekse lyder', words: ['kart', 'bord', 'barn', 'ærlig'] },
      { spell: 'hv, hj', sound: '[v] [j]', uk: '«h» не вимовляється', en: 'the “h” is silent', no: 'h er stum', words: ['hva', 'hvor', 'hjem', 'hjelpe'] },
      { spell: 'gj, g + i/y/ei/øy', sound: '[j] й', uk: 'звучить як «й»', en: 'sounds like “y” in “yes”', no: 'uttales som j', words: ['gjest', 'gi', 'gyldig'] },
      { spell: 'ng', sound: '[ŋ]', uk: 'носове «н», «г» не чути', en: 'nasal “ng” as in “sing”', no: 'ng-lyd', words: ['ring', 'lang', 'penger'] },
      { spell: 'nk', sound: '[ŋk]', uk: 'носове «н» + «к»', en: 'nasal “ng” + “k”', no: 'ng-lyd + k', words: ['tenke', 'bank', 'drikke'] },
      { spell: 'o', sound: '[u] у', uk: 'часто звучить як «у»', en: 'often sounds like “oo”', no: 'o uttales ofte som u', words: ['sol', 'bok', 'god', 'skole'] },
      { spell: 'u', sound: '[ʉ]', uk: 'між «ю» і «у», губи трубочкою', en: 'between “ü” and “oo”, rounded lips', no: 'u-lyd', words: ['hus', 'du', 'ut'] }
    ]
  },
  silent: {
    title: { uk: '🤐 Німі літери', en: '🤐 Silent letters', no: '🤐 Stumme bokstaver' },
    text: { uk: 'Часто не вимовляються: D у кінці після голосної чи l/n, G у -lig, H перед v/j, T у «det» і в артиклі -et.', en: 'Often silent: D at the end after a vowel or l/n, G in -lig, H before v/j, T in “det” and in the article -et.', no: 'Ofte stumme: d, g i -lig, h foran v/j, t i «det» og -et.' },
    items: [['med', 'med'], ['god', 'god'], ['kald', 'kald'], ['land', 'land'], ['hyggelig', 'hyggelig'], ['hvem', 'hvem'], ['det', 'det'], ['huset', 'huset']]
  },
  long: {
    title: { uk: '⏱️ Довгі й короткі голосні', en: '⏱️ Long and short vowels', no: '⏱️ Lange og korte vokaler' },
    text: { uk: 'Голосна ДОВГА перед однією приголосною і КОРОТКА перед подвоєною: tak [та:к] — takk [так].', en: 'A vowel is LONG before one consonant and SHORT before a double consonant: tak — takk.', no: 'Lang vokal før én konsonant, kort vokal før dobbel konsonant: tak — takk.' },
    items: [['tak', 'takk'], ['hat', 'hatt'], ['vin', 'vinn'], ['mat', 'matt'], ['søt', 'søtt']]
  },
  syllables: {
    title: { uk: '🧱 Склади (stavelser)', en: '🧱 Syllables (stavelser)', no: '🧱 Stavelser' },
    text: { uk: 'Обери приголосну, потім голосну — почуєш склад. Так учаться читати норвезькі діти: ma, me, mi, mo, mu…', en: 'Pick a consonant, then a vowel — you will hear the syllable. This is how Norwegian children learn to read: ma, me, mi, mo, mu…', no: 'Velg en konsonant og en vokal — hør stavelsen: ma, me, mi, mo, mu …' },
    consonants: ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v'],
    wordsTitle: { uk: '📖 Слова по складах', en: '📖 Words split into syllables', no: '📖 Ord delt i stavelser' },
    words: [['mam-ma', 'mamma'], ['pap-pa', 'pappa'], ['ka-ke', 'kake'], ['sko-le', 'skole'], ['ba-nan', 'banan'], ['bes-te-mor', 'bestemor'], ['vin-du', 'vindu'], ['fot-ball', 'fotball'], ['bib-li-o-tek', 'bibliotek'], ['sjo-ko-la-de', 'sjokolade']]
  }
};
