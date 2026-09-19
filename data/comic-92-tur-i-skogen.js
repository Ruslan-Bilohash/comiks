window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p92',
  level: 'A1',
  category: 'natur',
  title: 'Tur i skogen',
  titleUk: 'Прогулянка в лісі',
  titleEn: 'A Walk in the Forest',
  summaryUk: 'Тато, Мія та Лео йдуть у ліс по чорниці — і зустрічають справжнього лося!',
  summaryEn: 'Dad, Mia and Leo go blueberry picking in the forest — and meet a real moose!',
  summaryNo: 'Pappa, Mia og Leo går på tur i skogen og møter en ekte elg!',
  cover: 3,

  panels: [
    { art: { bg: 'forest', chars: [{ id: 'pappa', x: 90, mood: 'happy', pose: 'wave' }, { id: 'mia', x: 230, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 335, mood: 'happy', pose: 'walk' }], props: [{ type: 'basket', x: 180 }] }, lines: [
      { who: 'pappa', no: 'I dag går vi på tur i skogen!', uk: 'Сьогодні ми йдемо на прогулянку в ліс!', en: 'Today we\'re going for a walk in the forest!' },
      { who: 'mia', no: 'Hurra! Jeg tar med kurven.', uk: 'Ура! Я візьму з собою кошик.', en: 'Hooray! I\'ll bring the basket.' }
    ]},
    { art: { bg: 'forest', chars: [{ id: 'leo', x: 100, mood: 'surprised', pose: 'point' }, { id: 'pappa', x: 300, pose: 'hips' }], props: [{ type: 'mushroom', x: 205 }] }, lines: [
      { who: 'leo', no: 'Se, der er en sopp!', uk: 'Дивіться, там гриб!', en: 'Look, there\'s a mushroom!' },
      { who: 'pappa', no: 'Den soppen er giftig. Ikke spis den!', uk: 'Цей гриб отруйний. Не їж його!', en: 'That mushroom is poisonous. Don\'t eat it!' }
    ]},
    { art: { bg: 'forest', chars: [{ id: 'mia', x: 110, mood: 'happy', pose: 'hold' }, { id: 'leo', x: 300, mood: 'grin' }], props: [{ type: 'berries', x: 205 }, { type: 'basket', x: 110, y: 256, s: 0.8, berries: true, front: true }] }, lines: [
      { who: 'mia', no: 'Her er det mange blåbær!', uk: 'Тут багато чорниць!', en: 'There are lots of blueberries here!' },
      { who: 'leo', no: 'Nam! De er så søte!', uk: 'Ням! Вони такі солодкі!', en: 'Yum! They\'re so sweet!' }
    ]},
    { art: { bg: 'forest', chars: [{ id: 'leo', x: 60, mood: 'surprised', pose: 'cheer' }, { id: 'mia', x: 150, mood: 'surprised' }], props: [{ type: 'elg', x: 320, s: 0.9 }], sfx: { x: 340, y: 60 } }, lines: [
      { who: 'sfx', no: 'KNAKK!', uk: 'ТРІСЬ!', en: 'CRACK!' },
      { who: 'leo', no: 'Hva var det?', uk: 'Що це було?', en: 'What was that?' },
      { who: 'mia', no: 'En elg! Den er kjempestor!', uk: 'Лось! Він величезний!', en: 'A moose! It\'s huge!' }
    ]},
    { art: { bg: 'forest', chars: [{ id: 'mia', x: 80, mood: 'sad' }, { id: 'pappa', x: 210 }, { id: 'leo', x: 330, mood: 'sad', pose: 'walk' }], props: [{ type: 'umbrella', x: 222, y: 150, front: true }], fx: 'rain' }, lines: [
      { who: 'narrator', no: 'Så begynner det å regne.', uk: 'Потім починається дощ.', en: 'Then it starts to rain.' },
      { who: 'pappa', no: 'Vær stille. Nå går vi rolig hjem.', uk: 'Тихо. Тепер спокійно йдемо додому.', en: 'Be quiet. Now we walk home calmly.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 70, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 200, mood: 'happy' }, { id: 'pappa', x: 330, mood: 'happy', pose: 'hold' }],
      props: [{ type: 'table', x: 200 }, { type: 'mug', x: 165, y: 234 }, { type: 'mug', x: 240, y: 234 }] }, lines: [
      { who: 'pappa', no: 'Nå skal vi drikke varm kakao.', uk: 'А тепер питимемо гаряче какао.', en: 'Now we\'re going to drink hot cocoa.' },
      { who: 'mia', no: 'Det var en fin tur!', uk: 'Це була чудова прогулянка!', en: 'That was a lovely walk!' },
      { who: 'leo', no: 'Og vi så en ekte elg!', uk: 'І ми бачили справжнього лося!', en: 'And we saw a real moose!' }
    ]}
  ],

  vocab: [
    ['tur', 'прогулянка, похід', 'walk, trip'], ['skogen', 'ліс', 'the forest'], ['kurven', 'кошик', 'the basket'], ['sopp', 'гриб', 'mushroom'], ['giftig', 'отруйний', 'poisonous'],
    ['mange', 'багато', 'many, lots of'], ['blåbær', 'чорниці', 'blueberries'], ['søte', 'солодкі', 'sweet'], ['elg', 'лось', 'moose'], ['kjempestor', 'величезний', 'huge'],
    ['stille', 'тихо', 'quiet'], ['rolig', 'спокійно', 'calmly'], ['regne', 'дощити', 'rain'], ['hjem', 'додому', 'home (going home)'], ['drikke', 'пити', 'drink'],
    ['varm', 'гарячий, теплий', 'hot, warm'], ['kakao', 'какао', 'cocoa'], ['fin', 'гарний, чудовий', 'nice, lovely'], ['ekte', 'справжній', 'real']
  ]
});
