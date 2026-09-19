window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p98',
  level: 'A2',
  category: 'helse',
  title: 'Hos legen',
  titleUk: 'У лікаря',
  titleEn: 'At the Doctor',
  summaryUk: 'Аліна захворіла й іде до лікаря Гамфрі. Як пояснити, що болить?',
  summaryEn: 'Alina is ill and visits Doctor Humphrey. How do you explain what hurts?',
  summaryNo: 'Alina er syk og går til doktor Humphrey. Hvordan forklarer man hva som gjør vondt?',
  cover: 1,

  panels: [
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 90, mood: 'sad' }, { id: 'humphrey', x: 300, mood: 'happy', pose: 'wave', coat: true }] }, lines: [
      { who: 'alina', no: 'Hei, jeg har time klokka ti.', uk: 'Добрий день, у мене запис на десяту.', en: 'Hello, I have an appointment at ten o\'clock.' },
      { who: 'humphrey', no: 'Velkommen! Jeg er doktor Humphrey. Hva kan jeg hjelpe deg med?', uk: 'Ласкаво просимо! Я лікар Гамфрі. Чим можу допомогти?', en: 'Welcome! I\'m Doctor Humphrey. How can I help you?' }
    ]},
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 90, mood: 'sad', pose: 'hold' }, { id: 'humphrey', x: 300, coat: true }] }, lines: [
      { who: 'alina', no: 'Jeg har vondt i halsen, og jeg har feber.', uk: 'У мене болить горло, і в мене температура.', en: 'I have a sore throat, and I have a fever.' },
      { who: 'humphrey', no: 'Hvor lenge har du vært syk?', uk: 'Як довго ти хворієш?', en: 'How long have you been ill?' }
    ]},
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 90, mood: 'sad' }, { id: 'humphrey', x: 300, pose: 'point', flip: true, coat: true }] }, lines: [
      { who: 'alina', no: 'I tre dager. Jeg sover dårlig om natta.', uk: 'Три дні. Я погано сплю вночі.', en: 'For three days. I sleep badly at night.' },
      { who: 'humphrey', no: 'Kan du åpne munnen og si «a»?', uk: 'Можеш відкрити рота й сказати «а»?', en: 'Can you open your mouth and say “ah”?' }
    ]},
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 110, mood: 'surprised' }, { id: 'humphrey', x: 300, mood: 'happy', coat: true }] }, lines: [
      { who: 'alina', no: 'Aaaa ...', uk: 'А-а-а...', en: 'Aaaah...' },
      { who: 'humphrey', no: 'Halsen er litt rød, men det er ikke farlig.', uk: 'Горло трохи червоне, але це не небезпечно.', en: 'Your throat is a bit red, but it isn\'t dangerous.' }
    ]},
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 90 }, { id: 'humphrey', x: 300, pose: 'hold', coat: true }], props: [{ type: 'docs', x: 300, y: 232, front: true }] }, lines: [
      { who: 'humphrey', no: 'Du må drikke mye vann og hvile i noen dager.', uk: 'Тобі треба пити багато води й відпочивати кілька днів.', en: 'You must drink lots of water and rest for a few days.' },
      { who: 'alina', no: 'Trenger jeg medisin?', uk: 'Мені потрібні ліки?', en: 'Do I need medicine?' }
    ]},
    { art: { bg: 'office', sign: 'LEGEKONTOR', chars: [{ id: 'alina', x: 100, mood: 'grin', pose: 'wave' }, { id: 'humphrey', x: 300, mood: 'happy', pose: 'wave', coat: true }], props: [{ type: 'plant', x: 200 }] }, lines: [
      { who: 'humphrey', no: 'Du kan ta paracet hvis du har vondt. God bedring!', uk: 'Можеш прийняти парацетамол, якщо болить. Одужуй!', en: 'You can take paracetamol if it hurts. Get well soon!' },
      { who: 'alina', no: 'Tusen takk, doktor. Ha en fin dag!', uk: 'Щиро дякую, лікарю. Гарного дня!', en: 'Thank you so much, doctor. Have a nice day!' }
    ]}
  ],

  vocab: [
    ['time', 'запис (до лікаря)', 'appointment'], ['klokka ti', 'о десятій', 'at ten o\'clock'], ['vondt i halsen', 'болить горло', 'sore throat'],
    ['feber', 'температура', 'fever'], ['hvor lenge', 'як довго', 'how long'], ['syk', 'хворий', 'ill, sick'], ['sover dårlig', 'погано сплю', 'sleep badly'],
    ['om natta', 'вночі', 'at night'], ['munnen', 'рот', 'the mouth'], ['farlig', 'небезпечний', 'dangerous'], ['vann', 'вода', 'water'],
    ['hvile', 'відпочивати', 'rest'], ['noen dager', 'кілька днів', 'a few days'], ['medisin', 'ліки', 'medicine'], ['god bedring', 'одужуй', 'get well soon']
  ]
});
