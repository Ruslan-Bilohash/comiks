window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p91',
  level: 'A1',
  category: 'skole',
  title: 'Første dag på skolen',
  titleUk: 'Перший день у школі',
  titleEn: 'First Day at School',
  summaryUk: 'Лео вперше йде до норвезької школи. Страшно? Лише спочатку!',
  summaryEn: 'Leo starts at a Norwegian school. Is it scary? Only at first!',
  summaryNo: 'Leo skal begynne på en norsk skole. Er det skummelt? Bare litt!',
  cover: 2,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 120, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 280, mood: 'sad' }], props: [{ type: 'backpack', x: 340 }] }, lines: [
      { who: 'mamma', no: 'God morgen, Leo! I dag er din første dag på skolen.', uk: 'Доброго ранку, Лео! Сьогодні твій перший день у школі.', en: 'Good morning, Leo! Today is your first day at school.' },
      { who: 'leo', no: 'Jeg er litt redd, mamma.', uk: 'Мені трохи страшно, мамо.', en: 'I\'m a little scared, Mum.' }
    ]},
    { art: { bg: 'school', board: 'Velkommen!', chars: [{ id: 'laerer', x: 105, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 295 }] }, lines: [
      { who: 'laerer', no: 'Hei og velkommen! Jeg heter Ingrid. Hva heter du?', uk: 'Привіт і ласкаво просимо! Мене звати Інгрід. Як тебе звати?', en: 'Hi and welcome! My name is Ingrid. What\'s your name?' },
      { who: 'leo', no: 'Jeg heter Leo. Jeg kommer fra Ukraina.', uk: 'Мене звати Лео. Я з України.', en: 'My name is Leo. I come from Ukraine.' }
    ]},
    { art: { bg: 'school', board: 'Hei!', chars: [{ id: 'nora', x: 95, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 305, mood: 'grin', pose: 'cheer' }], props: [{ type: 'desk', x: 200 }] }, lines: [
      { who: 'nora', no: 'Hei, Leo! Vil du sitte ved siden av meg?', uk: 'Привіт, Лео! Хочеш сісти поруч зі мною?', en: 'Hi, Leo! Do you want to sit next to me?' },
      { who: 'leo', no: 'Ja, gjerne!', uk: 'Так, залюбки!', en: 'Yes, I\'d love to!' }
    ]},
    { art: { bg: 'school', board: '1 + 2 = ?', chars: [{ id: 'laerer', x: 60, pose: 'point' }, { id: 'leo', x: 225, mood: 'grin', pose: 'cheer' }, { id: 'nora', x: 340, mood: 'surprised' }] }, lines: [
      { who: 'laerer', no: 'Hvor mye er en pluss to?', uk: 'Скільки буде один плюс два?', en: 'What is one plus two?' },
      { who: 'leo', no: 'Tre!', uk: 'Три!', en: 'Three!' },
      { who: 'nora', no: 'Så flink du er!', uk: 'Який ти молодець!', en: 'You\'re so clever!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'nora', x: 130, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 290, mood: 'happy', pose: 'walk' }], props: [{ type: 'ball', x: 210 }], sfx: { x: 335, y: 62 } }, lines: [
      { who: 'sfx', no: 'RIIING!', uk: 'ДЗИІНЬ!', en: 'RIIING!' },
      { who: 'narrator', no: 'Friminutt!', uk: 'Перерва!', en: 'Break time!' },
      { who: 'nora', no: 'Kom, vi spiller fotball!', uk: 'Ходімо грати у футбол!', en: 'Come on, let\'s play football!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 110, mood: 'happy', pose: 'hold' }, { id: 'leo', x: 280, mood: 'grin', pose: 'cheer' }], props: [{ type: 'backpack', x: 345 }], fx: 'stars' }, lines: [
      { who: 'mamma', no: 'Hvordan var det på skolen?', uk: 'Як було в школі?', en: 'How was school?' },
      { who: 'leo', no: 'Kjempegøy! Nora er min nye venn!', uk: 'Супер! Нора — моя нова подруга!', en: 'Super fun! Nora is my new friend!' }
    ]}
  ],

  vocab: [
    ['god morgen', 'доброго ранку', 'good morning'], ['i dag', 'сьогодні', 'today'], ['første', 'перший', 'first'], ['skolen', 'школа', 'school'],
    ['redd', 'наляканий, страшно', 'scared'], ['velkommen', 'ласкаво просимо', 'welcome'], ['heter', 'звати', 'is called'], ['kommer fra', 'походить з', 'comes from'],
    ['sitte', 'сидіти', 'sit'], ['ved siden av', 'поруч з', 'next to'], ['gjerne', 'залюбки', 'gladly, I\'d love to'], ['hvor mye', 'скільки', 'how much'],
    ['pluss', 'плюс', 'plus'], ['tre', 'три', 'three'], ['flink', 'молодець, здібний', 'clever, good at'], ['friminutt', 'перерва', 'break (at school)'],
    ['spiller', 'граємо', 'play'], ['fotball', 'футбол', 'football'], ['hvordan', 'як', 'how'], ['kjempegøy', 'дуже весело, супер', 'super fun'], ['venn', 'друг, подруга', 'friend']
  ]
});
