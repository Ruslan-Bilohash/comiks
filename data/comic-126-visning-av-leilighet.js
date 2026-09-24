window.COMICS = window.COMICS || [];

/* p126 — B1: перегляд квартири. Що питати на visning, про що домовлятися й на що дивитися. */
COMICS.push({
  id: 'p126',
  level: 'B1',
  category: 'bolig',
  title: 'Visning av leilighet',
  titleUk: 'Перегляд квартири',
  titleEn: 'Viewing a flat',
  summaryUk: 'Аліна шукає квартиру й приходить на перегляд. Вона питає про комунальні, депозит і правила будинку — і дізнається, що договір буває на визначений строк.',
  summaryEn: 'Alina is looking for a flat and comes to a viewing. She asks about bills, the deposit and house rules — and learns that a lease can be for a fixed period.',
  summaryNo: 'Alina leter etter leilighet og er på visning. Hun spør om strøm, depositum og husordensregler – og får vite at kontrakten kan være tidsbestemt.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'alina', x: 300, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'keys', x: 215, y: 200 }] }, lines: [
      { who: 'morten', no: 'Hei, velkommen på visning! Leiligheten er på femtifem kvadratmeter.', uk: 'Вітаю на перегляді! Квартира має п’ятдесят п’ять квадратних метрів.', en: 'Hi, welcome to the viewing! The flat is fifty-five square metres.' },
      { who: 'alina', no: 'Den virker lys og koselig. Når er den ledig?', uk: 'Вона здається світлою й затишною. Коли вона вільна?', en: 'It seems bright and cosy. When is it available?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 100, pose: 'point' }, { id: 'alina', x: 310, mood: 'normal' }], props: [{ type: 'sofa', x: 100 }, { type: 'plant', x: 230 }] }, lines: [
      { who: 'morten', no: 'Fra første november. Husleia er tolv tusen i måneden.', uk: 'Із першого листопада. Оренда — дванадцять тисяч на місяць.', en: 'From the first of November. The rent is twelve thousand a month.' },
      { who: 'alina', no: 'Er strøm og internett inkludert?', uk: 'Електрика та інтернет входять?', en: 'Are electricity and internet included?' },
      { who: 'morten', no: 'Internett er inkludert, strøm kommer i tillegg.', uk: 'Інтернет входить, електрика — окремо.', en: 'Internet is included, electricity comes on top.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 310, mood: 'surprised' }, { id: 'morten', x: 100, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 200 }] }, lines: [
      { who: 'alina', no: 'Hvor stort er depositumet?', uk: 'Який розмір завдатку?', en: 'How big is the deposit?' },
      { who: 'morten', no: 'Tre måneders husleie på en egen depositumskonto.', uk: 'Три місячні оренди на окремому депозитному рахунку.', en: 'Three months’ rent in a separate deposit account.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 100, mood: 'normal' }, { id: 'alina', x: 310, mood: 'normal' }], props: [{ type: 'table', x: 215 }] }, lines: [
      { who: 'alina', no: 'Er kontrakten tidsbestemt eller løpende?', uk: 'Договір на визначений строк чи безстроковий?', en: 'Is the contract for a fixed period or open-ended?' },
      { who: 'morten', no: 'Løpende, med tre måneders oppsigelse for begge parter.', uk: 'Безстроковий, із тримісячним попередженням для обох сторін.', en: 'Open-ended, with three months’ notice for both parties.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 310, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy', pose: 'hips' }], props: [{ type: 'boxes', x: 215 }] }, lines: [
      { who: 'alina', no: 'Er det lov å ha katt her?', uk: 'Чи можна тут тримати кота?', en: 'Is it allowed to have a cat here?' },
      { who: 'morten', no: 'Ja, men husordensreglene sier ro etter klokka elleve.', uk: 'Так, але правила будинку вимагають тиші після одинадцятої.', en: 'Yes, but the house rules require quiet after eleven o’clock.' },
      { who: 'alina', no: 'Det passer meg godt.', uk: 'Мені це підходить.', en: 'That suits me well.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 110, mood: 'happy' }], fx: 'stars' }, lines: [
      { who: 'alina', no: 'Jeg er veldig interessert. Hva er neste steg?', uk: 'Мене це дуже цікавить. Який наступний крок?', en: 'I am very interested. What is the next step?' },
      { who: 'morten', no: 'Send meg en e-post i kveld, så sender jeg kontrakten i morgen.', uk: 'Напишіть мені ввечері — і завтра я надішлю договір.', en: 'Send me an email tonight, and I will send the contract tomorrow.' }
    ]}
  ],

  vocab: [
    ['ei visning', 'перегляд житла', 'a viewing'],
    ['en kvadratmeter', 'квадратний метр', 'a square metre'],
    ['ledig', 'вільний', 'available'],
    ['ei husleie', 'орендна плата', 'the rent'],
    ['inkludert', 'включено', 'included'],
    ['i tillegg', 'додатково', 'in addition'],
    ['et depositum', 'завдаток', 'a deposit'],
    ['ei depositumskonto', 'депозитний рахунок', 'a deposit account'],
    ['tidsbestemt', 'на визначений строк', 'for a fixed period'],
    ['løpende', 'безстроковий', 'open-ended'],
    ['ei oppsigelse', 'попередження про розірвання', 'notice'],
    ['en part', 'сторона (договору)', 'a party'],
    ['husordensregler', 'правила будинку', 'house rules'],
    ['ro', 'тиша', 'quiet'],
    ['et steg', 'крок', 'a step']
  ],

  words: {
    no: { 'visning': 'перегляд житла', 'leiligheten': 'квартира', 'femtifem': 'п’ятдесят п’ять', 'kvadratmeter': 'квадратні метри', 'virker': 'здається', 'lys': 'світла', 'koselig': 'затишна', 'ledig': 'вільна', 'første': 'перше', 'november': 'листопад', 'husleia': 'орендна плата', 'tolv': 'дванадцять', 'tusen': 'тисяч', 'måneden': 'місяць', 'strøm': 'електрика', 'internett': 'інтернет', 'inkludert': 'включено', 'tillegg': 'додаток (i tillegg — окремо)', 'stort': 'великий', 'depositumet': 'завдаток', 'måneders': 'місяців', 'egen': 'окремий', 'depositumskonto': 'депозитний рахунок', 'kontrakten': 'договір', 'tidsbestemt': 'на визначений строк', 'løpende': 'безстроковий', 'oppsigelse': 'попередження', 'begge': 'обидві', 'parter': 'сторони', 'lov': 'дозволено (er det lov — чи можна)', 'katt': 'кіт', 'husordensreglene': 'правила будинку', 'ro': 'тиша', 'klokka': 'година', 'elleve': 'одинадцята', 'passer': 'підходить', 'interessert': 'зацікавлена', 'neste': 'наступний', 'steg': 'крок', 'kveld': 'вечір', 'sender': 'надішлю', 'leter': 'шукає' },
    en: { 'visning': 'viewing', 'leiligheten': 'the flat', 'femtifem': 'fifty-five', 'kvadratmeter': 'square metres', 'virker': 'seems', 'lys': 'bright', 'koselig': 'cosy', 'ledig': 'available', 'første': 'first', 'november': 'November', 'husleia': 'the rent', 'tolv': 'twelve', 'tusen': 'thousand', 'måneden': 'the month', 'strøm': 'electricity', 'internett': 'internet', 'inkludert': 'included', 'tillegg': 'addition (i tillegg — on top)', 'stort': 'big', 'depositumet': 'the deposit', 'måneders': 'months’', 'egen': 'separate, own', 'depositumskonto': 'deposit account', 'kontrakten': 'the contract', 'tidsbestemt': 'fixed-term', 'løpende': 'open-ended', 'oppsigelse': 'notice', 'begge': 'both', 'parter': 'parties', 'lov': 'allowed', 'katt': 'cat', 'husordensreglene': 'the house rules', 'ro': 'quiet', 'klokka': 'the clock', 'elleve': 'eleven', 'passer': 'suits', 'interessert': 'interested', 'neste': 'next', 'steg': 'step', 'kveld': 'evening', 'sender': 'will send', 'leter': 'is looking' }
  }
});
