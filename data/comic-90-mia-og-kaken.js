window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p90',
  level: 'A1',
  category: 'mat',
  title: 'Mia og den magiske kaken',
  titleUk: 'Мія і чарівний торт',
  titleEn: 'Mia and the Magic Cake',
  summaryUk: 'Мія та Лео печуть торт для мами, а кіт Пус усе ускладнює.',
  summaryEn: 'Mia and Leo bake a cake for Mum, but Pus the cat makes a mess.',
  summaryNo: 'Mia og Leo baker en kake til mamma, men katten Pus lager kaos.',
  cover: 4,

  panels: [
    { art: { bg: 'kitchen', chars: [{ id: 'mia', x: 150, mood: 'happy', pose: 'wave' }], props: [{ type: 'bowl', x: 310, y: 196, s: 0.8 }] }, lines: [
      { who: 'narrator', no: 'Det er lørdag morgen.', uk: 'Суботній ранок.', en: 'It\'s Saturday morning.' },
      { who: 'mia', no: 'Jeg vil bake en kake til mamma!', uk: 'Я хочу спекти торт для мами!', en: 'I want to bake a cake for Mum!' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'leo', x: 100, mood: 'happy', pose: 'point' }, { id: 'mia', x: 310, mood: 'happy' }],
      props: [{ type: 'eggs', x: 170, y: 196 }, { type: 'flour', x: 215, y: 196 }, { type: 'sugar', x: 256, y: 196 }] }, lines: [
      { who: 'leo', no: 'Kan jeg hjelpe deg?', uk: 'Можна я тобі допоможу?', en: 'Can I help you?' },
      { who: 'mia', no: 'Ja! Vi trenger mel, egg og sukker.', uk: 'Так! Нам потрібні борошно, яйця й цукор.', en: 'Yes! We need flour, eggs and sugar.' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'leo', x: 110, mood: 'angry', pose: 'point' }, { id: 'pus', x: 290, y: 196, mood: 'happy' }],
      props: [{ type: 'butter', x: 350, y: 196 }] }, lines: [
      { who: 'pus', no: 'Mjau!', uk: 'Няв!', en: 'Meow!' },
      { who: 'leo', no: 'Pus, ikke spis smøret!', uk: 'Пусе, не їж масло!', en: 'Pus, don\'t eat the butter!' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'mia', x: 200, mood: 'surprised', pose: 'cheer' }], props: [{ type: 'bowl', x: 90, y: 196 }], fx: 'flour', sfx: { x: 330, y: 110 } }, lines: [
      { who: 'sfx', no: 'PUFF!', uk: 'ПУФ!', en: 'POOF!' },
      { who: 'mia', no: 'Å nei! Mel over hele kjøkkenet!', uk: 'Ой ні! Борошно по всій кухні!', en: 'Oh no! Flour all over the kitchen!' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'leo', x: 80 }, { id: 'mia', x: 320, mood: 'happy', pose: 'hold' }], props: [{ type: 'cake', x: 200, y: 196, skew: true }], fx: 'stars' }, lines: [
      { who: 'leo', no: 'Kaken er ferdig. Den er litt skjev ...', uk: 'Торт готовий. Він трохи кривенький...', en: 'The cake is ready. It\'s a bit crooked...' },
      { who: 'mia', no: 'Men den lukter så godt!', uk: 'Зате як смачно пахне!', en: 'But it smells so good!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 60, mood: 'grin', pose: 'cheer' }, { id: 'mamma', x: 250, mood: 'happy', pose: 'hold' }, { id: 'pus', x: 350, mood: 'happy' }],
      props: [{ type: 'table', x: 145 }, { type: 'cake', x: 145, y: 234, s: 0.7 }], fx: 'hearts' }, lines: [
      { who: 'mamma', no: 'Tusen takk, mine skatter! Dette er den beste kaken i verden!', uk: 'Щиро дякую, мої скарби! Це найкращий торт у світі!', en: 'Thank you so much, my darlings! This is the best cake in the world!' },
      { who: 'pus', no: 'Mjau, mjau!', uk: 'Няв, няв!', en: 'Meow, meow!' }
    ]}
  ],

  vocab: [
    ['lørdag', 'субота', 'Saturday'], ['morgen', 'ранок', 'morning'], ['bake', 'пекти', 'bake'], ['kake', 'торт', 'cake'], ['hjelpe', 'допомагати', 'help'],
    ['trenger', 'потребуємо, треба', 'need'], ['mel', 'борошно', 'flour'], ['egg', 'яйця', 'eggs'], ['sukker', 'цукор', 'sugar'], ['ikke', 'не', 'not'],
    ['spis', 'їж', 'eat! (command)'], ['smøret', 'масло', 'the butter'], ['kjøkkenet', 'кухня', 'the kitchen'], ['ferdig', 'готовий', 'ready, finished'], ['skjev', 'кривий', 'crooked'],
    ['lukter', 'пахне', 'smells'], ['godt', 'добре, смачно', 'good, tasty'], ['tusen takk', 'щиро дякую', 'thank you so much'], ['skatter', 'скарби', 'darlings, treasures'],
    ['beste', 'найкращий', 'best'], ['verden', 'світ', 'world']
  ]
});
