window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p95',
  level: 'A1',
  category: 'fritid',
  title: 'Bursdagen til Nora',
  titleUk: 'День народження Нори',
  titleEn: 'Nora\'s Birthday',
  summaryUk: 'Норі виповнюється вісім! Подарунок, торт і норвезька пісня «Hurra for deg».',
  summaryEn: 'Nora turns eight! A present, cake and the Norwegian birthday song.',
  summaryNo: 'Nora blir åtte år! Gave, kake og sangen «Hurra for deg».',
  cover: 3,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'mia', x: 110, mood: 'happy', pose: 'hold' }, { id: 'leo', x: 290, mood: 'surprised' }], props: [{ type: 'gift', x: 110, y: 240, front: true }] }, lines: [
      { who: 'mia', no: 'I dag har Nora bursdag.', uk: 'Сьогодні в Нори день народження.', en: 'Today is Nora\'s birthday.' },
      { who: 'leo', no: 'Å nei! Jeg har ingen gave!', uk: 'Ой ні! У мене немає подарунка!', en: 'Oh no! I don\'t have a present!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 120, mood: 'happy', pose: 'point' }, { id: 'leo', x: 300, mood: 'grin', pose: 'cheer' }], props: [{ type: 'table', x: 205 }, { type: 'book', x: 205, y: 234 }] }, lines: [
      { who: 'mia', no: 'Du kan tegne en fin tegning til henne.', uk: 'Ти можеш намалювати для неї гарний малюнок.', en: 'You can draw a nice picture for her.' },
      { who: 'leo', no: 'God idé! Jeg tegner en elg.', uk: 'Гарна ідея! Я намалюю лося.', en: 'Good idea! I\'ll draw a moose.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'mia', x: 80, mood: 'grin', pose: 'cheer' }, { id: 'nora', x: 200, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 320, mood: 'happy', pose: 'hold' }], props: [{ type: 'balloons', x: 200, y: 170 }], fx: 'stars' }, lines: [
      { who: 'mia', no: 'Gratulerer med dagen, Nora!', uk: 'З днем народження, Норо!', en: 'Happy birthday, Nora!' },
      { who: 'nora', no: 'Tusen takk! Jeg blir åtte år i dag.', uk: 'Щиро дякую! Мені сьогодні вісім років.', en: 'Thank you so much! I\'m turning eight today.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'nora', x: 110, mood: 'surprised', pose: 'hold' }, { id: 'leo', x: 290, mood: 'happy' }], props: [{ type: 'drawing', x: 110, y: 246, front: true }] }, lines: [
      { who: 'leo', no: 'Her er gaven min. Jeg har tegnet den selv.', uk: 'Ось мій подарунок. Я намалював його сам.', en: 'Here\'s my present. I drew it myself.' },
      { who: 'nora', no: 'En elg! Så søt! Den skal henge på rommet mitt.', uk: 'Лось! Який милий! Він висітиме в моїй кімнаті.', en: 'A moose! So cute! It will hang in my room.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'bestemor', x: 90, mood: 'happy', pose: 'hold' }, { id: 'nora', x: 230, mood: 'grin' }, { id: 'mia', x: 340, mood: 'grin', pose: 'cheer' }],
      props: [{ type: 'table', x: 170 }, { type: 'cake', x: 170, y: 232, s: 0.7 }, { type: 'balloons', x: 330, y: 120, s: 0.8 }] }, lines: [
      { who: 'bestemor', no: 'Nå skal vi synge!', uk: 'А тепер заспіваймо!', en: 'Now let\'s sing!' },
      { who: 'mia', no: 'Hurra for deg som fyller ditt år!', uk: 'Ура тобі, що маєш день народження!', en: 'Hooray for you on your birthday!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'nora', x: 100, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 230, mood: 'happy', pose: 'cheer' }, { id: 'pus', x: 340, mood: 'happy' }], props: [{ type: 'balloons', x: 300, y: 150, s: 0.8 }], fx: 'hearts' }, lines: [
      { who: 'nora', no: 'Dette er den beste bursdagen noensinne!', uk: 'Це найкращий день народження в моєму житті!', en: 'This is the best birthday ever!' },
      { who: 'leo', no: 'Hipp, hipp, hurra!', uk: 'Гіп-гіп, ура!', en: 'Hip, hip, hooray!' }
    ]}
  ],

  vocab: [
    ['bursdag', 'день народження', 'birthday'], ['gave', 'подарунок', 'present, gift'], ['ingen', 'жодного, немає', 'no, none'], ['tegne', 'малювати', 'draw'],
    ['tegning', 'малюнок', 'drawing'], ['til henne', 'для неї', 'for her'], ['god idé', 'гарна ідея', 'good idea'], ['gratulerer med dagen', 'з днем народження', 'happy birthday'],
    ['åtte', 'вісім', 'eight'], ['år', 'рік, роки', 'year(s)'], ['selv', 'сам', 'myself, yourself'], ['søt', 'милий', 'cute, sweet'], ['henge', 'висіти', 'hang'], ['rommet', 'кімната', 'the room'],
    ['synge', 'співати', 'sing'], ['fyller år', 'має день народження', 'has a birthday'], ['noensinne', 'будь-коли', 'ever']
  ]
});
