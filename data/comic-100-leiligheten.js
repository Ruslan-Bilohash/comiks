window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p100',
  level: 'B1',
  category: 'bolig',
  title: 'Leiligheten',
  titleUk: 'Квартира',
  titleEn: 'The Apartment',
  summaryUk: 'Руслан і Аліна оглядають квартиру: оренда, застава, домашні тварини й договір.',
  summaryEn: 'Ruslan and Alina view an apartment: rent, deposit, pets and the contract.',
  summaryNo: 'Ruslan og Alina er på visning: husleie, depositum, kjæledyr og kontrakt.',
  cover: 5,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, mood: 'happy', pose: 'wave', s: 0.9 }, { id: 'alina', x: 250, mood: 'happy', s: 0.9 }, { id: 'ruslan', x: 350, s: 0.9 }], props: [{ type: 'plant', x: 180 }] }, lines: [
      { who: 'maria', no: 'Velkommen! Leiligheten har tre rom, kjøkken og bad.', uk: 'Ласкаво просимо! У квартирі три кімнати, кухня й ванна.', en: 'Welcome! The apartment has three rooms, a kitchen and a bathroom.' },
      { who: 'alina', no: 'Så lys og fin den er! Hvor stor er den?', uk: 'Яка вона світла й гарна! Яка її площа?', en: 'How bright and nice it is! How big is it?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, pose: 'point', s: 0.9 }, { id: 'ruslan', x: 300, pose: 'hips', s: 0.9 }] }, lines: [
      { who: 'maria', no: 'Den er på sekstifem kvadratmeter, og den har balkong.', uk: 'Шістдесят п’ять квадратних метрів, і є балкон.', en: 'It\'s sixty-five square metres, and it has a balcony.' },
      { who: 'ruslan', no: 'Hvor mye koster den i måneden?', uk: 'Скільки вона коштує на місяць?', en: 'How much does it cost per month?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, pose: 'hold', s: 0.9 }, { id: 'ruslan', x: 300, mood: 'surprised', s: 0.9 }], props: [{ type: 'docs', x: 100, y: 240, front: true }] }, lines: [
      { who: 'maria', no: 'Husleia er tolv tusen kroner, og strøm er ikke inkludert.', uk: 'Оренда — дванадцять тисяч крон, електрика не входить.', en: 'The rent is twelve thousand kroner, and electricity is not included.' },
      { who: 'ruslan', no: 'Det er ganske dyrt, men beliggenheten er god.', uk: 'Це досить дорого, але розташування хороше.', en: 'That\'s quite expensive, but the location is good.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 100, s: 0.9 }, { id: 'maria', x: 300, pose: 'hold', s: 0.9 }] }, lines: [
      { who: 'alina', no: 'Må vi betale depositum?', uk: 'Нам треба платити заставу?', en: 'Do we have to pay a deposit?' },
      { who: 'maria', no: 'Ja, tre måneders husleie. Pengene står på en egen konto.', uk: 'Так, оренда за три місяці. Гроші лежать на окремому рахунку.', en: 'Yes, three months\' rent. The money is kept in a separate account.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'ruslan', x: 100, pose: 'hips', s: 0.9 }, { id: 'maria', x: 300, mood: 'happy', s: 0.9 }] }, lines: [
      { who: 'ruslan', no: 'Er det lov å ha kjæledyr? Vi har en katt.', uk: 'Чи можна тримати домашніх тварин? У нас є кіт.', en: 'Are pets allowed? We have a cat.' },
      { who: 'maria', no: 'En katt går fint, så lenge den er rolig.', uk: 'Кіт — це нормально, якщо він спокійний.', en: 'A cat is fine, as long as it is calm.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 90, mood: 'grin', pose: 'cheer', s: 0.9 }, { id: 'maria', x: 300, mood: 'happy', pose: 'hold', s: 0.9 }], props: [{ type: 'boxes', x: 195 }, { type: 'keys', x: 300, y: 236, front: true }] }, lines: [
      { who: 'alina', no: 'Vi tar den! Når kan vi flytte inn?', uk: 'Ми її беремо! Коли можна заїжджати?', en: 'We\'ll take it! When can we move in?' },
      { who: 'maria', no: 'Første oktober. Dere får nøklene når kontrakten er signert.', uk: 'Першого жовтня. Ключі отримаєте, коли договір буде підписаний.', en: 'The first of October. You\'ll get the keys once the contract is signed.' }
    ]}
  ],

  vocab: [
    ['leiligheten', 'квартира', 'the apartment'], ['rom', 'кімнати', 'rooms'], ['kjøkken', 'кухня', 'kitchen'], ['bad', 'ванна кімната', 'bathroom'],
    ['lys', 'світла', 'bright'], ['kvadratmeter', 'квадратні метри', 'square metres'], ['balkong', 'балкон', 'balcony'], ['i måneden', 'на місяць', 'per month'],
    ['husleia', 'оренда', 'the rent'], ['strøm', 'електрика', 'electricity'], ['inkludert', 'включено', 'included'], ['ganske', 'досить', 'quite'],
    ['dyrt', 'дорого', 'expensive'], ['beliggenheten', 'розташування', 'the location'], ['betale', 'платити', 'pay'], ['depositum', 'застава', 'deposit'],
    ['konto', 'рахунок', 'account'], ['lov', 'дозволено', 'allowed'], ['kjæledyr', 'домашні тварини', 'pets'], ['flytte inn', 'заїхати', 'move in'],
    ['nøklene', 'ключі', 'the keys'], ['kontrakten', 'договір', 'the contract'], ['signert', 'підписаний', 'signed']
  ]
});
