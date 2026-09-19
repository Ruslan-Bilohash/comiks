window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p104',
  level: 'A1',
  category: 'hverdag',
  title: 'Hva er klokka?',
  titleUk: 'Котра година?',
  titleEn: 'What Time Is It?',
  summaryUk: 'Один день Нори від ранку до вечора — вчимося називати час: «halv ni», «kvart over», «kvart på».',
  summaryEn: 'A day in Nora\'s life from morning to night — learn to tell the time: “halv ni”, “kvart over”, “kvart på”.',
  summaryNo: 'En dag med Nora fra morgen til kveld – lær å si hva klokka er.',
  cover: 1,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'nora', x: 110, mood: 'sad', pose: 'hips' }, { id: 'bestemor', x: 310, mood: 'happy', pose: 'point', flip: true }], props: [{ type: 'clock', x: 205, y: 120, time: '07:00' }] }, lines: [
      { who: 'nora', no: 'Bestemor, hva er klokka?', uk: 'Бабусю, котра година?', en: 'Grandma, what time is it?' },
      { who: 'bestemor', no: 'Klokka er sju. Du må stå opp.', uk: 'Сьома година. Тобі треба вставати.', en: 'It\'s seven o\'clock. You must get up.' }
    ]},
    { art: { bg: 'school', board: '08:30', clock: false, chars: [{ id: 'nora', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'laerer', x: 310, mood: 'happy', pose: 'wave' }], props: [{ type: 'clock', x: 205, y: 225, time: '08:30' }] }, lines: [
      { who: 'narrator', no: 'Klokka er halv ni.', uk: 'Пів на дев’яту.', en: 'It\'s half past eight.' },
      { who: 'nora', no: 'Nå begynner skolen!', uk: 'Зараз починається школа!', en: 'School starts now!' }
    ]},
    { art: { bg: 'school', board: '12:15', clock: false, chars: [{ id: 'leo', x: 100, mood: 'sad', pose: 'hips' }, { id: 'nora', x: 310, mood: 'happy', pose: 'point', flip: true }], props: [{ type: 'clock', x: 205, y: 225, time: '12:15' }] }, lines: [
      { who: 'leo', no: 'Er det lunsj snart?', uk: 'Скоро обід?', en: 'Is it lunch soon?' },
      { who: 'nora', no: 'Ja, klokka er kvart over tolv.', uk: 'Так, чверть на першу.', en: 'Yes, it\'s a quarter past twelve.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'leo', x: 100, mood: 'grin', pose: 'wave' }, { id: 'nora', x: 310, mood: 'grin', pose: 'cheer' }], props: [{ type: 'ball', x: 150 }, { type: 'clock', x: 205, y: 292, pole: 80, time: '15:00' }] }, lines: [
      { who: 'leo', no: 'Skal vi spille fotball klokka tre?', uk: 'Пограємо у футбол о третій?', en: 'Shall we play football at three?' },
      { who: 'nora', no: 'Ja! Vi møtes i parken.', uk: 'Так! Зустрінемося в парку.', en: 'Yes! Let\'s meet in the park.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'bestemor', x: 100, mood: 'surprised', pose: 'hips' }, { id: 'nora', x: 310, mood: 'surprised' }], props: [{ type: 'clock', x: 205, y: 292, pole: 80, time: '17:45' }] }, lines: [
      { who: 'bestemor', no: 'Nora! Klokka er kvart på seks. Middagen er klar!', uk: 'Норо! За чверть шоста. Вечеря готова!', en: 'Nora! It\'s a quarter to six. Dinner is ready!' },
      { who: 'nora', no: 'Oi, tiden går så fort!', uk: 'Ой, час так швидко летить!', en: 'Oops, time flies so fast!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'bestemor', x: 110, mood: 'happy', pose: 'hold' }, { id: 'nora', x: 300, mood: 'happy', pose: 'wave' }], props: [{ type: 'clock', x: 205, y: 120, time: '20:00' }], fx: 'stars' }, lines: [
      { who: 'bestemor', no: 'Klokka er åtte. Nå er det leggetid.', uk: 'Восьма година. Час спати.', en: 'It\'s eight o\'clock. Now it\'s bedtime.' },
      { who: 'nora', no: 'God natt, bestemor!', uk: 'На добраніч, бабусю!', en: 'Good night, Grandma!' }
    ]}
  ],

  vocab: [
    ['hva er klokka', 'котра година', 'what time is it'], ['sju', 'сім', 'seven'], ['stå opp', 'вставати', 'get up'],
    ['halv ni', 'пів на дев’яту (8:30)', 'half past eight (8:30)'], ['begynner', 'починається', 'starts'], ['lunsj', 'обід', 'lunch'], ['snart', 'скоро', 'soon'],
    ['kvart over tolv', 'чверть на першу (12:15)', 'a quarter past twelve (12:15)'], ['klokka tre', 'о третій', 'at three o\'clock'], ['møtes', 'зустрічаємося', 'meet'],
    ['kvart på seks', 'за чверть шоста (17:45)', 'a quarter to six (5:45)'], ['middagen', 'вечеря (основна їжа дня)', 'dinner'], ['tiden', 'час', 'the time'],
    ['fort', 'швидко', 'fast'], ['leggetid', 'час спати', 'bedtime'], ['god natt', 'на добраніч', 'good night']
  ]
});
