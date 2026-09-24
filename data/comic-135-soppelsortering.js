window.COMICS = window.COMICS || [];

/* p135 — B1: сортування сміття. Кольори пакетів, pant, миючий центр і штрафи. */
COMICS.push({
  id: 'p135',
  level: 'B1',
  category: 'hverdag',
  title: 'Søppelsortering',
  titleUk: 'Сортування сміття',
  titleEn: 'Sorting waste',
  summaryUk: 'Сусідка пояснює Марії систему сортування: сині пакети для пластику, зелені для їжі, тара з pant і поїздка на станцію з рештою.',
  summaryEn: 'A neighbour explains the sorting system to Maria: blue bags for plastic, green for food waste, bottles with a deposit and a trip to the recycling station.',
  summaryNo: 'Naboen forklarer sorteringen for Maria: blå poser til plast, grønne til matavfall, flasker med pant og en tur til gjenvinningsstasjonen.',
  cover: 0,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'maria', x: 300, mood: 'surprised', pose: 'hold' }, { id: 'bestemor', x: 100, mood: 'happy' }], props: [{ type: 'trashbag', x: 215, y: 240 }] }, lines: [
      { who: 'maria', no: 'Unnskyld, hvilken pose skal jeg bruke til plast?', uk: 'Перепрошую, у який пакет класти пластик?', en: 'Excuse me, which bag do I use for plastic?' },
      { who: 'bestemor', no: 'Blå pose til plast og grønn pose til matavfall.', uk: 'Синій пакет для пластику й зелений для харчових відходів.', en: 'A blue bag for plastic and a green bag for food waste.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 100, pose: 'point' }, { id: 'maria', x: 310, mood: 'normal' }], props: [{ type: 'boxes', x: 215 }] }, lines: [
      { who: 'maria', no: 'Og resten?', uk: 'А решта?', en: 'And the rest?' },
      { who: 'bestemor', no: 'Restavfall i vanlig pose. Papp og papir i egen container.', uk: 'Залишки — у звичайний пакет. Картон і папір — в окремий контейнер.', en: 'Residual waste in an ordinary bag. Cardboard and paper in a separate container.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 90, mood: 'happy' }, { id: 'bestemor', x: 215, mood: 'normal', pose: 'point' }, { id: 'maria', x: 335, mood: 'happy', pose: 'hold' }], props: [{ type: 'counter', x: 90 }, { type: 'glass', x: 160, y: 200 }] }, lines: [
      { who: 'bestemor', no: 'Flasker og bokser har pant. Du får penger tilbake i butikken.', uk: 'На пляшках і банках є застава. У магазині гроші повертають.', en: 'Bottles and cans have a deposit. You get money back in the shop.' },
      { who: 'maria', no: 'Så pantemaskinen skriver ut en kvittering?', uk: 'Тобто автомат друкує чек?', en: 'So the machine prints a receipt?' },
      { who: 'kasserer', no: 'Ja, og du kan velge å gi pengene til et veldedig formål.', uk: 'Так, і ви можете віддати гроші на благодійність.', en: 'Yes, and you can choose to give the money to charity.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 100, mood: 'normal' }, { id: 'maria', x: 310, mood: 'surprised' }], props: [{ type: 'car', x: 215 }] }, lines: [
      { who: 'maria', no: 'Hvor kaster jeg gammel maling og elektronikk?', uk: 'Куди викидати стару фарбу й електроніку?', en: 'Where do I throw old paint and electronics?' },
      { who: 'bestemor', no: 'På gjenvinningsstasjonen. Farlig avfall må aldri i vanlig søppel.', uk: 'На станцію переробки. Небезпечні відходи ніколи не можна в звичайне сміття.', en: 'At the recycling station. Hazardous waste must never go in ordinary rubbish.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'maria', x: 310, mood: 'normal' }, { id: 'bestemor', x: 100, mood: 'normal' }], props: [{ type: 'note', x: 215 }] }, lines: [
      { who: 'maria', no: 'Hva skjer hvis man sorterer feil?', uk: 'Що буде, якщо сортувати неправильно?', en: 'What happens if you sort it wrong?' },
      { who: 'bestemor', no: 'Renovasjonen kan la sekken stå igjen, og borettslaget får et gebyr.', uk: 'Сміттєвоз може не забрати мішок, а кооператив отримає штраф.', en: 'The refuse service may leave the bag, and the housing co-op gets a fee.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'maria', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'bestemor', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Nå skjønner jeg systemet. Takk for hjelpen, nabo!', uk: 'Тепер я розумію систему. Дякую за допомогу, сусідко!', en: 'Now I understand the system. Thanks for the help, neighbour!' },
      { who: 'bestemor', no: 'Bare hyggelig. Det blir fort en vane.', uk: 'Нема за що. Це швидко стає звичкою.', en: 'You are welcome. It quickly becomes a habit.' }
    ]}
  ],

  vocab: [
    ['ei søppelsortering', 'сортування сміття', 'waste sorting'],
    ['en pose', 'пакет', 'a bag'],
    ['et matavfall', 'харчові відходи', 'food waste'],
    ['et restavfall', 'змішані відходи', 'residual waste'],
    ['ei papp', 'картон', 'cardboard'],
    ['en container', 'контейнер', 'a container'],
    ['pant', 'застава за тару', 'a deposit on bottles'],
    ['ei pantemaskin', 'автомат прийому тари', 'a bottle deposit machine'],
    ['veldedig', 'благодійний', 'charitable'],
    ['ei gjenvinningsstasjon', 'станція переробки', 'a recycling station'],
    ['farlig avfall', 'небезпечні відходи', 'hazardous waste'],
    ['ei renovasjon', 'вивіз сміття', 'refuse collection'],
    ['et borettslag', 'житловий кооператив', 'a housing co-op'],
    ['et gebyr', 'штраф, збір', 'a fee'],
    ['ei vane', 'звичка', 'a habit']
  ],

  words: {
    no: { 'unnskyld': 'перепрошую', 'pose': 'пакет', 'plast': 'пластик', 'blå': 'синій', 'grønn': 'зелений', 'matavfall': 'харчові відходи', 'resten': 'решта', 'restavfall': 'змішані відходи', 'vanlig': 'звичайний', 'papp': 'картон', 'papir': 'папір', 'egen': 'окремий', 'container': 'контейнер', 'flasker': 'пляшки', 'bokser': 'банки', 'pant': 'застава за тару', 'penger': 'гроші', 'tilbake': 'назад', 'butikken': 'магазин', 'pantemaskinen': 'автомат прийому тари', 'skriver': 'друкує', 'kvittering': 'чек', 'velge': 'обрати', 'veldedig': 'благодійний', 'formål': 'мета, ціль', 'kaster': 'викидаю', 'gammel': 'стара', 'maling': 'фарба', 'elektronikk': 'електроніка', 'gjenvinningsstasjonen': 'станція переробки', 'farlig': 'небезпечний', 'avfall': 'відходи', 'aldri': 'ніколи', 'søppel': 'сміття', 'skjer': 'станеться', 'sorterer': 'сортувати', 'feil': 'неправильно', 'renovasjonen': 'служба вивозу сміття', 'sekken': 'мішок', 'stå': 'стояти (la stå igjen — залишити)', 'borettslaget': 'житловий кооператив', 'gebyr': 'штраф', 'skjønner': 'розумію', 'systemet': 'система', 'nabo': 'сусідка', 'hyggelig': 'приємно (bare hyggelig — нема за що)', 'fort': 'швидко', 'vane': 'звичка', 'poser': 'пакети', 'sorteringen': 'сортування', 'naboen': 'сусідка' },
    en: { 'unnskyld': 'excuse me', 'pose': 'bag', 'plast': 'plastic', 'blå': 'blue', 'grønn': 'green', 'matavfall': 'food waste', 'resten': 'the rest', 'restavfall': 'residual waste', 'vanlig': 'ordinary', 'papp': 'cardboard', 'papir': 'paper', 'egen': 'separate', 'container': 'container', 'flasker': 'bottles', 'bokser': 'cans', 'pant': 'deposit', 'penger': 'money', 'tilbake': 'back', 'butikken': 'the shop', 'pantemaskinen': 'the deposit machine', 'skriver': 'prints', 'kvittering': 'receipt', 'velge': 'to choose', 'veldedig': 'charitable', 'formål': 'purpose, cause', 'kaster': 'throw', 'gammel': 'old', 'maling': 'paint', 'elektronikk': 'electronics', 'gjenvinningsstasjonen': 'the recycling station', 'farlig': 'hazardous', 'avfall': 'waste', 'aldri': 'never', 'søppel': 'rubbish', 'skjer': 'happens', 'sorterer': 'sort', 'feil': 'wrongly', 'renovasjonen': 'the refuse service', 'sekken': 'the bag', 'stå': 'to stand (la stå igjen — to leave)', 'borettslaget': 'the housing co-op', 'gebyr': 'fee', 'skjønner': 'understand', 'systemet': 'the system', 'nabo': 'neighbour', 'hyggelig': 'nice (bare hyggelig — you are welcome)', 'fort': 'quickly', 'vane': 'habit', 'poser': 'bags', 'sorteringen': 'the sorting', 'naboen': 'the neighbour' }
  }
});
