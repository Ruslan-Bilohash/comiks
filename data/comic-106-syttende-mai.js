window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p106',
  level: 'A2',
  category: 'kultur',
  title: '17. mai',
  titleUk: '17 травня — День конституції',
  titleEn: 'The 17th of May',
  summaryUk: 'Руслан уперше святкує національний день Норвегії: дитяча хода, бунад, прапорці й багато морозива.',
  summaryEn: 'Ruslan celebrates Norway\'s national day for the first time: the children\'s parade, bunads, flags and lots of ice cream.',
  summaryNo: 'Ruslan feirer nasjonaldagen for første gang: barnetog, bunad, flagg og masse is.',
  cover: 0,

  panels: [
    { art: { bg: 'street', flags: true, chars: [{ id: 'mia', x: 120, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 290, mood: 'grin', pose: 'wave' }], props: [{ type: 'flag', x: 150, y: 200, front: true }, { type: 'flag', x: 320, y: 190, front: true }] }, lines: [
      { who: 'narrator', no: '17. mai er Norges nasjonaldag.', uk: '17 травня — національне свято Норвегії.', en: 'The 17th of May is Norway\'s national day.' },
      { who: 'mia', no: 'Hipp hipp hurra for Norge!', uk: 'Гіп-гіп ура Норвегії!', en: 'Hip hip hooray for Norway!' }
    ]},
    { art: { bg: 'street', flags: true, chars: [{ id: 'ruslan', x: 100, pose: 'hips' }, { id: 'pappa', x: 310, mood: 'happy', pose: 'hold' }] }, lines: [
      { who: 'ruslan', no: 'Hvorfor feirer dere i dag?', uk: 'Чому ви святкуєте сьогодні?', en: 'Why are you celebrating today?' },
      { who: 'pappa', no: 'Norge fikk sin egen grunnlov 17. mai 1814.', uk: 'Сімнадцятого травня 1814 року Норвегія отримала власну конституцію.', en: 'Norway got its own constitution on 17 May 1814.' }
    ]},
    { art: { bg: 'street', flags: true, chars: [{ id: 'nora', x: 90, mood: 'grin', pose: 'point' }, { id: 'leo', x: 220, mood: 'happy', pose: 'walk' }, { id: 'mia', x: 330, mood: 'grin', pose: 'walk' }], props: [{ type: 'flag', x: 250, y: 205, front: true }, { type: 'flag', x: 360, y: 205, front: true }] }, lines: [
      { who: 'nora', no: 'Se, barnetoget kommer!', uk: 'Дивіться, дитяча хода йде!', en: 'Look, the children\'s parade is coming!' },
      { who: 'leo', no: 'Alle barna går med flagg og synger.', uk: 'Усі діти йдуть із прапорцями й співають.', en: 'All the children walk with flags and sing.' }
    ]},
    { art: { bg: 'street', flags: true, chars: [{ id: 'pappa', x: 100, mood: 'happy', pose: 'point' }, { id: 'ruslan', x: 310, mood: 'surprised' }, { id: 'maria', x: 205, mood: 'happy', s: 0.85 }] }, lines: [
      { who: 'pappa', no: 'Mange har på seg bunad i dag.', uk: 'Багато хто сьогодні вдягнув бунад.', en: 'Many people are wearing a bunad today.' },
      { who: 'ruslan', no: 'Hva er en bunad?', uk: 'Що таке бунад?', en: 'What is a bunad?' }
    ]},
    { art: { bg: 'street', flags: true, chars: [{ id: 'pappa', x: 100, pose: 'hold' }, { id: 'ruslan', x: 310, mood: 'grin' }] }, lines: [
      { who: 'pappa', no: 'Det er en tradisjonell drakt fra et bestemt sted i Norge.', uk: 'Це традиційний костюм з певного регіону Норвегії.', en: 'It is a traditional costume from a particular place in Norway.' },
      { who: 'ruslan', no: 'Den er veldig vakker!', uk: 'Він дуже гарний!', en: 'It is very beautiful!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'leo', x: 100, mood: 'grin', pose: 'hold' }, { id: 'mia', x: 300, mood: 'grin', pose: 'cheer' }], props: [{ type: 'icecream', x: 100, y: 262, s: 0.8, front: true }, { type: 'flag', x: 360, y: 290 }], fx: 'stars' }, lines: [
      { who: 'leo', no: 'På 17. mai får barna spise så mye is de vil!', uk: 'На 17 травня діти можуть їсти скільки завгодно морозива!', en: 'On the 17th of May children can eat as much ice cream as they want!' },
      { who: 'mia', no: 'Jeg vil ha tre is og en pølse!', uk: 'Я хочу три морозива й сосиску!', en: 'I want three ice creams and a hot dog!' }
    ]}
  ],

  vocab: [
    ['nasjonaldag', 'національне свято', 'national day'], ['hipp hipp hurra', 'гіп-гіп ура', 'hip hip hooray'], ['hvorfor', 'чому', 'why'],
    ['feirer', 'святкуєте', 'celebrate'], ['grunnlov', 'конституція', 'constitution'], ['barnetoget', 'дитяча хода', 'the children\'s parade'],
    ['barna', 'діти', 'the children'], ['flagg', 'прапорці', 'flags'], ['synger', 'співають', 'sing'], ['har på seg', 'вдягнули', 'wear'],
    ['bunad', 'бунад (народний костюм)', 'bunad (folk costume)'], ['tradisjonell', 'традиційний', 'traditional'], ['drakt', 'костюм', 'costume'],
    ['bestemt', 'певний', 'particular'], ['vakker', 'гарний', 'beautiful'], ['is', 'морозиво', 'ice cream'], ['pølse', 'сосиска', 'hot dog, sausage']
  ]
});
