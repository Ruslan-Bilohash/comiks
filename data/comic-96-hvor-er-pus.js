window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p96',
  level: 'A1',
  category: 'familie',
  title: 'Hvor er Pus?',
  titleUk: 'Де Пус?',
  titleEn: 'Where Is Pus?',
  summaryUk: 'Кіт Пус зник! Мія та тато шукають його всюди: під диваном, у саду, на дереві…',
  summaryEn: 'Pus the cat is missing! Mia and Dad look everywhere: under the sofa, in the garden, in a tree...',
  summaryNo: 'Katten Pus er borte! Mia og pappa leter overalt: under sofaen, i hagen, i treet …',
  cover: 5,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'mia', x: 200, mood: 'sad', pose: 'hips' }] }, lines: [
      { who: 'mia', no: 'Pappa! Jeg finner ikke Pus!', uk: 'Тату! Я не можу знайти Пуса!', en: 'Dad! I can\'t find Pus!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'pappa', x: 110, pose: 'point' }, { id: 'mia', x: 300, mood: 'sad' }], props: [{ type: 'sofa', x: 250 }] }, lines: [
      { who: 'pappa', no: 'Er han under sofaen?', uk: 'Може, він під диваном?', en: 'Is he under the sofa?' },
      { who: 'mia', no: 'Nei, han er ikke der.', uk: 'Ні, його там немає.', en: 'No, he isn\'t there.' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'mia', x: 120, mood: 'surprised', pose: 'hips' }, { id: 'pappa', x: 300 }], props: [{ type: 'bowl', x: 210, y: 196 }] }, lines: [
      { who: 'mia', no: 'Er han på kjøkkenet?', uk: 'Може, він на кухні?', en: 'Is he in the kitchen?' },
      { who: 'pappa', no: 'Nei. Men maten hans er borte!', uk: 'Ні. Але його їжа зникла!', en: 'No. But his food is gone!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'mia', x: 110, mood: 'sad', pose: 'walk' }, { id: 'pappa', x: 260, pose: 'point', flip: true }], fx: 'none' }, lines: [
      { who: 'pappa', no: 'Kanskje han er i hagen?', uk: 'Може, він у саду?', en: 'Maybe he\'s in the garden?' },
      { who: 'mia', no: 'Pus! Pus! Hvor er du?', uk: 'Пусе! Пусе! Де ти?', en: 'Pus! Pus! Where are you?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'mia', x: 180, mood: 'surprised', pose: 'point' }, { id: 'pus', x: 360, y: 118, mood: 'happy', s: 0.8 }], sfx: { x: 290, y: 60 } }, lines: [
      { who: 'sfx', no: 'MJAU!', uk: 'НЯВ!', en: 'MEOW!' },
      { who: 'mia', no: 'Der er han! Han sitter i treet!', uk: 'Ось він! Він сидить на дереві!', en: 'There he is! He\'s sitting in the tree!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'pappa', x: 100, mood: 'happy', pose: 'hips' }, { id: 'mia', x: 230, mood: 'grin', pose: 'hold' }, { id: 'pus', x: 330, mood: 'happy' }], props: [{ type: 'basket', x: 330, s: 1.3 }], fx: 'hearts' }, lines: [
      { who: 'mia', no: 'Velkommen hjem, Pus! Nå skal du sove i kurven.', uk: 'З поверненням додому, Пусе! Тепер ти спатимеш у кошику.', en: 'Welcome home, Pus! Now you\'ll sleep in the basket.' },
      { who: 'pus', no: 'Mjau ... zzz', uk: 'Няв... хррр', en: 'Meow... zzz' }
    ]}
  ],

  vocab: [
    ['finner', 'знаходжу', 'find'], ['ikke', 'не', 'not'], ['under', 'під', 'under'], ['sofaen', 'диван', 'the sofa'], ['der', 'там', 'there'],
    ['kjøkkenet', 'кухня', 'the kitchen'], ['maten', 'їжа', 'the food'], ['borte', 'зник, немає', 'gone'], ['kanskje', 'може, мабуть', 'maybe'], ['hagen', 'сад', 'the garden'],
    ['hvor', 'де', 'where'], ['sitter', 'сидить', 'sits'], ['treet', 'дерево', 'the tree'], ['velkommen hjem', 'з поверненням додому', 'welcome home'],
    ['sove', 'спати', 'sleep'], ['kurven', 'кошик', 'the basket']
  ]
});
