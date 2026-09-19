/*
 * Базові модулі: норвезький алфавіт, числа, слова для тесту «Hva er dette?», рівні та категорії.
 * Переклади: uk — українською, en — англійською.
 */
window.BASICS = {
  // [літера, як звучить назва літери, приклад, емодзі, uk, en]
  alphabet: [
    ['A', 'a', 'ape', '🐒', 'мавпа', 'monkey'],
    ['B', 'be', 'bil', '🚗', 'автомобіль', 'car'],
    ['C', 'se', 'cowboy', '🤠', 'ковбой', 'cowboy'],
    ['D', 'de', 'dør', '🚪', 'двері', 'door'],
    ['E', 'e', 'eple', '🍎', 'яблуко', 'apple'],
    ['F', 'eff', 'fisk', '🐟', 'риба', 'fish'],
    ['G', 'ge', 'gris', '🐷', 'свиня', 'pig'],
    ['H', 'hå', 'hus', '🏠', 'будинок', 'house'],
    ['I', 'i', 'is', '🍦', 'морозиво', 'ice cream'],
    ['J', 'je', 'jente', '👧', 'дівчинка', 'girl'],
    ['K', 'kå', 'katt', '🐱', 'кіт', 'cat'],
    ['L', 'ell', 'løve', '🦁', 'лев', 'lion'],
    ['M', 'emm', 'melk', '🥛', 'молоко', 'milk'],
    ['N', 'enn', 'nese', '👃', 'ніс', 'nose'],
    ['O', 'o', 'ost', '🧀', 'сир', 'cheese'],
    ['P', 'pe', 'pære', '🍐', 'груша', 'pear'],
    ['Q', 'ku', 'quiz', '❓', 'вікторина', 'quiz'],
    ['R', 'ærr', 'regn', '🌧️', 'дощ', 'rain'],
    ['S', 'ess', 'sol', '☀️', 'сонце', 'sun'],
    ['T', 'te', 'tog', '🚂', 'потяг', 'train'],
    ['U', 'u', 'ugle', '🦉', 'сова', 'owl'],
    ['V', 've', 'vann', '💧', 'вода', 'water'],
    ['W', 'dobbelt-ve', 'wienerbrød', '🥐', 'булочка', 'Danish pastry'],
    ['X', 'eks', 'xylofon', '🎹', 'ксилофон', 'xylophone'],
    ['Y', 'y', 'yoghurt', '🥣', 'йогурт', 'yoghurt'],
    ['Z', 'sett', 'zebra', '🦓', 'зебра', 'zebra'],
    ['Æ', 'æ', 'ærme', '👕', 'рукав', 'sleeve'],
    ['Ø', 'ø', 'øre', '👂', 'вухо', 'ear'],
    ['Å', 'å', 'åtte', '8️⃣', 'вісім', 'eight']
  ],
  // підказки до особливих норвезьких літер
  special: {
    'Æ': { uk: 'звучить як широке «е», як у слові «етика»', en: 'sounds like the “a” in “cat”', no: 'uttales som en åpen e-lyd' },
    'Ø': { uk: 'губи як для «о», а кажеш «е»', en: 'like the “u” in “burn” with rounded lips', no: 'rund leppene som for o og si e' },
    'Å': { uk: 'звучить як «о»', en: 'sounds like the “o” in “more”', no: 'uttales som o i «gå»' }
  },
  // числа, які озвучені окремо
  numbers: {
    0: 'null', 1: 'en', 2: 'to', 3: 'tre', 4: 'fire', 5: 'fem', 6: 'seks', 7: 'sju', 8: 'åtte', 9: 'ni', 10: 'ti',
    11: 'elleve', 12: 'tolv', 13: 'tretten', 14: 'fjorten', 15: 'femten', 16: 'seksten', 17: 'sytten', 18: 'atten', 19: 'nitten',
    20: 'tjue', 30: 'tretti', 40: 'førti', 50: 'femti', 60: 'seksti', 70: 'sytti', 80: 'åtti', 90: 'nitti', 100: 'hundre', 1000: 'tusen'
  },
  // слова для питання «Hva er dette?» (тип предмета з assets/art.js → норвезьке слово)
  pictures: [
    ['cake', 'kake', 'торт', 'cake'], ['eggs', 'egg', 'яйця', 'eggs'], ['milk', 'melk', 'молоко', 'milk'], ['bread', 'brød', 'хліб', 'bread'],
    ['apples', 'epler', 'яблука', 'apples'], ['ball', 'ball', 'м’яч', 'ball'], ['basket', 'kurv', 'кошик', 'basket'], ['mushroom', 'sopp', 'гриб', 'mushroom'],
    ['umbrella', 'paraply', 'парасолька', 'umbrella'], ['snowman', 'snømann', 'сніговик', 'snowman'], ['carrot', 'gulrot', 'морквина', 'carrot'],
    ['mug', 'kopp', 'чашка', 'cup'], ['elg', 'elg', 'лось', 'moose'], ['gift', 'gave', 'подарунок', 'present'], ['balloons', 'ballonger', 'кульки', 'balloons'],
    ['book', 'bok', 'книжка', 'book'], ['backpack', 'sekk', 'рюкзак', 'backpack'], ['table', 'bord', 'стіл', 'table'], ['sofa', 'sofa', 'диван', 'sofa'],
    ['computer', 'datamaskin', 'комп’ютер', 'computer'], ['keys', 'nøkler', 'ключі', 'keys'], ['phone', 'telefon', 'телефон', 'phone'],
    ['plant', 'plante', 'рослина', 'plant'], ['rake', 'rive', 'граблі', 'rake'], ['waffles', 'vafler', 'вафлі', 'waffles'], ['boxes', 'esker', 'коробки', 'boxes'],
    ['flour', 'mel', 'борошно', 'flour'], ['clock', 'klokke', 'годинник', 'clock'], ['flag', 'flagg', 'прапор', 'flag'], ['xmastree', 'juletre', 'ялинка', 'Christmas tree'], ['tent', 'telt', 'намет', 'tent'], ['cheese', 'brunost', 'брунуст (коричневий сир)', 'brown cheese'], ['icecream', 'is', 'морозиво', 'ice cream'], ['thermos', 'termos', 'термос', 'thermos'], ['sugar', 'sukker', 'цукор', 'sugar'], ['butter', 'smør', 'масло', 'butter'], ['bowl', 'bolle', 'миска', 'bowl']
  ],
  levels: ['A1', 'A2', 'B1', 'B2'],
  categories: {
    hverdag: { icon: '🏘️', uk: 'Повсякдення', en: 'Everyday life', no: 'Hverdag', ar: 'الحياة اليومية' },
    familie: { icon: '👨‍👩‍👧', uk: 'Сім’я', en: 'Family', no: 'Familie', ar: 'العائلة' },
    skole: { icon: '🏫', uk: 'Школа', en: 'School', no: 'Skole', ar: 'المدرسة' },
    mat: { icon: '🍰', uk: 'Їжа', en: 'Food', no: 'Mat', ar: 'الطعام' },
    natur: { icon: '🌲', uk: 'Природа', en: 'Nature', no: 'Natur', ar: 'الطبيعة' },
    fritid: { icon: '⛄', uk: 'Дозвілля', en: 'Free time', no: 'Fritid', ar: 'وقت الفراغ' },
    butikk: { icon: '🛒', uk: 'Покупки', en: 'Shopping', no: 'Handel', ar: 'التسوّق' },
    helse: { icon: '🩺', uk: 'Здоров’я', en: 'Health', no: 'Helse', ar: 'الصحة' },
    jobb: { icon: '💼', uk: 'Робота', en: 'Work', no: 'Jobb', ar: 'العمل' },
    bolig: { icon: '🏠', uk: 'Житло', en: 'Housing', no: 'Bolig', ar: 'السكن' },
    kultur: { icon: '🇳🇴', uk: 'Норвезька культура', en: 'Norwegian culture', no: 'Norsk kultur', ar: 'الثقافة النرويجية' }
  },
  // ідеї наступних історій (показуються в плані навчання як «Скоро»)
  upcoming: [
    ['A1', 'familie', 'Familien min', 'Моя сім’я', 'My family'],
    ['A1', 'hverdag', 'Farger og klær', 'Кольори й одяг', 'Colours and clothes'],
    ['A1', 'natur', 'Været i Norge', 'Погода в Норвегії', 'The weather in Norway'],
    ['A2', 'helse', 'På apoteket', 'В аптеці', 'At the pharmacy'],
    ['A2', 'fritid', 'Fotballtrening', 'Футбольне тренування', 'Football practice'],
    ['A2', 'fritid', 'På biblioteket', 'У бібліотеці', 'At the library'],
    ['B1', 'helse', 'På legevakta', 'У невідкладній допомозі', 'At the emergency clinic'],
    ['B1', 'hverdag', 'Hos NAV', 'У NAV (служба зайнятості)', 'At NAV'],
    ['B1', 'bolig', 'Naboen klager', 'Сусід скаржиться', 'The neighbour complains'],
    ['B2', 'jobb', 'Medarbeidersamtalen', 'Розмова з керівником', 'The performance review'],
    ['B2', 'hverdag', 'Foreldremøte', 'Батьківські збори', 'The parents\' meeting'],
    ['B2', 'kultur', 'Valg og demokrati i Norge', 'Вибори й демократія в Норвегії', 'Elections and democracy in Norway']
  ]
};

// число → норвезькою (сучасний лічильний порядок: 21 = tjueen)
window.BASICS.numberWord = function (n) {
  const N = window.BASICS.numbers;
  if (N[n] != null && n !== 1000) return N[n];
  if (n === 1000) return 'tusen';
  if (n < 100) return N[Math.floor(n / 10) * 10] + (n % 10 ? N[n % 10] : '');
  if (n < 1000) { const h = Math.floor(n / 100), r = n % 100; return (h === 1 ? 'hundre' : N[h] + ' hundre') + (r ? ' og ' + window.BASICS.numberWord(r) : ''); }
  return String(n);
};
