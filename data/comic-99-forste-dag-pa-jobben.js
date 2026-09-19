window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p99',
  level: 'A2',
  category: 'jobb',
  title: 'Første dag på jobben',
  titleUk: 'Перший день на роботі',
  titleEn: 'First Day at Work',
  summaryUk: 'Денис виходить на нову роботу. Колега Гамфрі показує офіс і розповідає про норвезький ланчбокс.',
  summaryEn: 'Denys starts a new job. His colleague Humphrey shows him the office and the Norwegian packed lunch.',
  summaryNo: 'Denys begynner i ny jobb. Kollegaen Humphrey viser ham kontoret og den norske matpakken.',
  cover: 2,

  panels: [
    { art: { bg: 'office', sign: 'KONTOR', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'wave' }, { id: 'denys', x: 300, mood: 'happy' }] }, lines: [
      { who: 'maria', no: 'God morgen, Denys! Velkommen til oss.', uk: 'Доброго ранку, Денисе! Ласкаво просимо до нас.', en: 'Good morning, Denys! Welcome to the team.' },
      { who: 'denys', no: 'Takk! Jeg gleder meg til å begynne.', uk: 'Дякую! Я з нетерпінням чекаю початку.', en: 'Thanks! I\'m looking forward to starting.' }
    ]},
    { art: { bg: 'office', sign: 'KONTOR', chars: [{ id: 'maria', x: 70, pose: 'point' }, { id: 'humphrey', x: 215, mood: 'happy', pose: 'wave' }, { id: 'denys', x: 345, mood: 'happy' }] }, lines: [
      { who: 'maria', no: 'Dette er Humphrey. Han skal hjelpe deg den første uka.', uk: 'Це Гамфрі. Він допомагатиме тобі перший тиждень.', en: 'This is Humphrey. He will help you during the first week.' },
      { who: 'humphrey', no: 'Hei! Jeg kommer fra Kenya, men jeg har bodd i Norge i ti år.', uk: 'Привіт! Я з Кенії, але живу в Норвегії вже десять років.', en: 'Hi! I\'m from Kenya, but I\'ve lived in Norway for ten years.' }
    ]},
    { art: { bg: 'office', sign: 'KONTOR', chars: [{ id: 'humphrey', x: 70, pose: 'point' }, { id: 'denys', x: 330 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
      { who: 'humphrey', no: 'Her er pulten din og datamaskinen din.', uk: 'Ось твій робочий стіл і твій комп’ютер.', en: 'Here is your desk and your computer.' },
      { who: 'denys', no: 'Hva er passordet?', uk: 'Який пароль?', en: 'What\'s the password?' },
      { who: 'humphrey', no: 'Du lager et nytt passord selv.', uk: 'Новий пароль ти створюєш сам.', en: 'You make a new password yourself.' }
    ]},
    { art: { bg: 'office', sign: 'LUNSJ 12:00', chars: [{ id: 'humphrey', x: 100, mood: 'happy' }, { id: 'denys', x: 300, mood: 'surprised', pose: 'hips' }] }, lines: [
      { who: 'humphrey', no: 'Vi spiser lunsj sammen klokka tolv. Har du matpakke?', uk: 'Ми обідаємо разом о дванадцятій. У тебе є ланчбокс?', en: 'We eat lunch together at twelve. Do you have a packed lunch?' },
      { who: 'denys', no: 'Matpakke? Nei, det har jeg glemt!', uk: 'Ланчбокс? Ні, я забув!', en: 'A packed lunch? No, I forgot!' }
    ]},
    { art: { bg: 'office', sign: 'LUNSJ 12:00', chars: [{ id: 'humphrey', x: 110, mood: 'happy', pose: 'hold' }, { id: 'denys', x: 300, mood: 'grin' }], props: [{ type: 'bread', x: 110, y: 236, s: 0.7, front: true }] }, lines: [
      { who: 'humphrey', no: 'Ikke noe problem. Du kan få en av mine brødskiver.', uk: 'Не проблема. Можеш узяти один із моїх бутербродів.', en: 'No problem. You can have one of my sandwiches.' },
      { who: 'denys', no: 'Så snilt! Nå forstår jeg norsk kultur.', uk: 'Як мило! Тепер я розумію норвезьку культуру.', en: 'How kind! Now I understand Norwegian culture.' }
    ]},
    { art: { bg: 'office', sign: 'KONTOR', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'hips' }, { id: 'denys', x: 300, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Hvordan var den første dagen?', uk: 'Як минув перший день?', en: 'How was the first day?' },
      { who: 'denys', no: 'Veldig bra! Kollegaene er hyggelige.', uk: 'Дуже добре! Колеги приємні.', en: 'Very good! My colleagues are nice.' }
    ]}
  ],

  vocab: [
    ['velkommen til oss', 'ласкаво просимо до нас', 'welcome to the team'], ['gleder meg', 'з нетерпінням чекаю', 'look forward'],
    ['begynne', 'починати', 'start'], ['uka', 'тиждень', 'the week'], ['bodd', 'жив', 'lived'], ['pulten', 'робочий стіл', 'the desk'],
    ['datamaskinen', 'комп’ютер', 'the computer'], ['passordet', 'пароль', 'the password'], ['lunsj', 'обід', 'lunch'], ['sammen', 'разом', 'together'],
    ['matpakke', 'ланчбокс з бутербродами', 'packed lunch'], ['glemt', 'забув', 'forgotten'], ['brødskiver', 'бутерброди', 'sandwiches'],
    ['snilt', 'мило, люб’язно', 'kind'], ['forstår', 'розумію', 'understand'], ['kollegaene', 'колеги', 'the colleagues'], ['hyggelige', 'приємні', 'nice']
  ]
});
