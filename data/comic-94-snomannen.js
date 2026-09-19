window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p94',
  level: 'A1',
  category: 'fritid',
  title: 'Snømannen',
  titleUk: 'Сніговик',
  titleEn: 'The Snowman',
  summaryUk: 'Випав сніг! Лео й Нора ліплять сніговика, а потім — сніжкова війна.',
  summaryEn: 'It\'s snowing! Leo and Nora build a snowman — and then there\'s a snowball fight.',
  summaryNo: 'Det snør! Leo og Nora lager en snømann – og så blir det snøballkrig.',
  cover: 3,

  panels: [
    { art: { bg: 'winter', chars: [{ id: 'leo', x: 160, mood: 'grin', pose: 'cheer' }, { id: 'nora', x: 290, mood: 'happy', pose: 'wave' }], fx: 'snow' }, lines: [
      { who: 'narrator', no: 'Det snør! Alt er hvitt.', uk: 'Падає сніг! Усе біле.', en: 'It\'s snowing! Everything is white.' },
      { who: 'leo', no: 'Kom, Nora! Vi lager en snømann!', uk: 'Ходімо, Норо! Зліпимо сніговика!', en: 'Come on, Nora! Let\'s make a snowman!' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'nora', x: 90, pose: 'hold' }, { id: 'leo', x: 320, mood: 'surprised', pose: 'hips' }], props: [{ type: 'snowman', x: 205, stage: 1 }], fx: 'snow' }, lines: [
      { who: 'nora', no: 'Først ruller vi en stor snøball.', uk: 'Спочатку скачаємо велику снігову кулю.', en: 'First we roll a big snowball.' },
      { who: 'leo', no: 'Puh, den er tung!', uk: 'Ух, вона важка!', en: 'Phew, it\'s heavy!' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'leo', x: 75, pose: 'point' }, { id: 'nora', x: 330, mood: 'happy', pose: 'hold' }], props: [{ type: 'snowman', x: 200, stage: 2 }, { type: 'carrot', x: 330, y: 238, front: true }] }, lines: [
      { who: 'leo', no: 'Nå trenger vi et hode.', uk: 'Тепер нам потрібна голова.', en: 'Now we need a head.' },
      { who: 'nora', no: 'Og to øyne og en gulrot!', uk: 'І двоє очей та морквина!', en: 'And two eyes and a carrot!' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'nora', x: 65, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 335, mood: 'happy', pose: 'point', flip: true }], props: [{ type: 'snowman', x: 200, stage: 3, s: 0.95 }], fx: 'stars' }, lines: [
      { who: 'nora', no: 'Ferdig! Han heter Herr Snø.', uk: 'Готово! Його звати пан Сніг.', en: 'Done! His name is Mr Snow.' },
      { who: 'leo', no: 'Han har pappas lue!', uk: 'У нього татова шапка!', en: 'He\'s wearing Dad\'s hat!' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'leo', x: 110, mood: 'surprised', pose: 'hips' }, { id: 'nora', x: 300, mood: 'grin', pose: 'wave' }], props: [{ type: 'snowball', x: 150, y: 150, front: true }], fx: 'snow', sfx: { x: 205, y: 190 } }, lines: [
      { who: 'sfx', no: 'PLASK!', uk: 'ШЛЬОП!', en: 'SPLAT!' },
      { who: 'leo', no: 'Au! Det er kaldt!', uk: 'Ой! Холодно!', en: 'Ouch! It\'s cold!' },
      { who: 'nora', no: 'Snøballkrig!', uk: 'Сніжкова війна!', en: 'Snowball fight!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'nora', x: 70, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 200, mood: 'happy' }, { id: 'pappa', x: 330, mood: 'happy', pose: 'wave' }],
      props: [{ type: 'table', x: 200 }, { type: 'mug', x: 170, y: 234 }, { type: 'mug', x: 235, y: 234 }] }, lines: [
      { who: 'pappa', no: 'Kom inn og varm dere!', uk: 'Заходьте й грійтеся!', en: 'Come in and warm up!' },
      { who: 'nora', no: 'Vi er våte, men glade!', uk: 'Ми мокрі, але щасливі!', en: 'We\'re wet, but happy!' }
    ]}
  ],

  vocab: [
    ['snør', 'падає сніг', 'is snowing'], ['hvitt', 'біле', 'white'], ['lager', 'робимо, ліпимо', 'make'], ['snømann', 'сніговик', 'snowman'], ['først', 'спочатку', 'first'],
    ['ruller', 'качаємо', 'roll'], ['stor', 'великий', 'big'], ['snøball', 'сніжка, снігова куля', 'snowball'], ['tung', 'важкий', 'heavy'], ['hode', 'голова', 'head'],
    ['øyne', 'очі', 'eyes'], ['gulrot', 'морквина', 'carrot'], ['heter', 'звати', 'is called'], ['lue', 'шапка', 'hat, beanie'], ['kaldt', 'холодно', 'cold'],
    ['snøballkrig', 'сніжкова війна', 'snowball fight'], ['varm dere', 'грійтеся', 'warm up'], ['våte', 'мокрі', 'wet'], ['glade', 'радісні, щасливі', 'happy, glad']
  ]
});
