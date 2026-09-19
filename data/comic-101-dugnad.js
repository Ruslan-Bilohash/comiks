window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p101',
  level: 'B1',
  category: 'kultur',
  title: 'Dugnad i borettslaget',
  titleUk: 'Толока в житловому кооперативі',
  titleEn: 'Community Work Day',
  summaryUk: 'Денис уперше бере участь у норвезькому «дугнаді» — спільній роботі сусідів. А в кінці — вафлі!',
  summaryEn: 'Denys joins his first Norwegian “dugnad” — neighbours working together. And there are waffles at the end!',
  summaryNo: 'Denys er med på sin første dugnad. Naboene jobber sammen – og til slutt blir det vafler!',
  cover: 4,

  panels: [
    { art: { bg: 'park', chars: [{ id: 'denys', x: 200, mood: 'surprised', pose: 'hips', s: 0.9 }], props: [{ type: 'rake', x: 320 }, { type: 'trashbag', x: 80 }] }, lines: [
      { who: 'narrator', no: 'Lørdag er det dugnad i borettslaget.', uk: 'У суботу в житловому кооперативі толока.', en: 'On Saturday there is a community work day in the housing cooperative.' },
      { who: 'denys', no: 'Hva betyr egentlig dugnad?', uk: 'Що насправді означає «дугнад»?', en: 'What does dugnad actually mean?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'maria', x: 100, mood: 'happy', s: 0.9 }, { id: 'denys', x: 300, s: 0.9 }] }, lines: [
      { who: 'maria', no: 'Det betyr at naboene jobber sammen uten å få betalt.', uk: 'Це означає, що сусіди працюють разом безкоштовно.', en: 'It means that the neighbours work together without getting paid.' },
      { who: 'maria', no: 'Vi rydder, maler og planter blomster.', uk: 'Ми прибираємо, фарбуємо й садимо квіти.', en: 'We tidy up, paint and plant flowers.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'humphrey', x: 100, mood: 'happy', pose: 'hold', s: 0.9 }, { id: 'denys', x: 300, s: 0.9 }], props: [{ type: 'rake', x: 150, s: 0.7, front: true }, { type: 'trashbag', x: 225 }] }, lines: [
      { who: 'humphrey', no: 'Jeg raker løv. Kan du bære avfallssekkene?', uk: 'Я згрібаю листя. Можеш понести мішки для сміття?', en: 'I\'m raking leaves. Can you carry the rubbish bags?' },
      { who: 'denys', no: 'Selvfølgelig! Hvor skal de?', uk: 'Звісно! Куди їх нести?', en: 'Of course! Where do they go?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'humphrey', x: 90, pose: 'point', s: 0.9 }, { id: 'denys', x: 280, mood: 'sad', pose: 'walk', s: 0.9 }], props: [{ type: 'trashbag', x: 330, y: 290, front: true }] }, lines: [
      { who: 'humphrey', no: 'Til containeren ved parkeringsplassen.', uk: 'До контейнера біля парковки.', en: 'To the container by the car park.' },
      { who: 'denys', no: 'Puh, de er tyngre enn jeg trodde.', uk: 'Ух, вони важчі, ніж я думав.', en: 'Phew, they\'re heavier than I thought.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'maria', x: 100, mood: 'grin', pose: 'hold', s: 0.9 }, { id: 'humphrey', x: 300, mood: 'grin', pose: 'cheer', s: 0.9 }], props: [{ type: 'waffles', x: 100, y: 234, front: true }] }, lines: [
      { who: 'maria', no: 'Når vi er ferdige, blir det vafler og kaffe til alle!', uk: 'Коли закінчимо, для всіх будуть вафлі й кава!', en: 'When we\'re done, there will be waffles and coffee for everyone!' },
      { who: 'humphrey', no: 'Det er den beste delen av dugnaden.', uk: 'Це найкраща частина толоки.', en: 'That\'s the best part of the dugnad.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'denys', x: 100, mood: 'grin', pose: 'cheer', s: 0.9 }, { id: 'maria', x: 300, mood: 'happy', pose: 'wave', s: 0.9 }], fx: 'hearts' }, lines: [
      { who: 'denys', no: 'Nå kjenner jeg alle naboene. Dugnad er en fin tradisjon!', uk: 'Тепер я знаю всіх сусідів. Дугнад — гарна традиція!', en: 'Now I know all the neighbours. Dugnad is a nice tradition!' },
      { who: 'maria', no: 'Velkommen til Norge, Denys!', uk: 'Ласкаво просимо до Норвегії, Денисе!', en: 'Welcome to Norway, Denys!' }
    ]}
  ],

  vocab: [
    ['dugnad', 'толока, спільна безоплатна робота', 'community work day'], ['borettslaget', 'житловий кооператив', 'the housing cooperative'],
    ['betyr', 'означає', 'means'], ['egentlig', 'насправді', 'actually'], ['naboene', 'сусіди', 'the neighbours'], ['uten', 'без', 'without'],
    ['få betalt', 'отримувати оплату', 'get paid'], ['rydder', 'прибираємо', 'tidy up'], ['maler', 'фарбуємо', 'paint'], ['planter', 'садимо', 'plant'],
    ['blomster', 'квіти', 'flowers'], ['raker løv', 'згрібаю листя', 'rake leaves'], ['bære', 'нести', 'carry'], ['avfallssekkene', 'мішки для сміття', 'the rubbish bags'],
    ['selvfølgelig', 'звісно', 'of course'], ['parkeringsplassen', 'парковка', 'the car park'], ['tyngre', 'важчі', 'heavier'], ['trodde', 'думав', 'thought'],
    ['vafler', 'вафлі', 'waffles'], ['delen', 'частина', 'the part'], ['kjenner', 'знаю (людей)', 'know (people)'], ['tradisjon', 'традиція', 'tradition']
  ]
});
