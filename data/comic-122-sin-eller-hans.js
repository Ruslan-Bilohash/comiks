window.COMICS = window.COMICS || [];

/* p122 — eiendomsord, частина 2: hans, hennes, vår/vårt/våre, deres і хитрий sin/si/sitt/sine.
   Правило: sin вказує на підмет того самого речення (Musa tar sykkelen sin — свій),
   hans/hennes — на іншу особу (Musa tar sykkelen hans — чужий). */
COMICS.push({
  id: 'p122',
  level: 'A2',
  category: 'familie',
  title: 'Sin eller hans?',
  titleUk: 'Sin чи hans?',
  titleEn: 'Sin or hans?',
  summaryUk: 'Муса взяв велосипед — свій чи сусідів? Одне слово змінює все: sin означає «свій», а hans — «його» (чужий). Сім’я розбирає hans, hennes, vår і deres на простих прикладах.',
  summaryEn: 'Musa took a bike — his own or the neighbour’s? One word changes everything: sin means “his own”, hans means “his” (someone else’s). The family sorts out hans, hennes, vår and deres with simple examples.',
  summaryNo: 'Musa tok en sykkel – sin egen eller naboens? Ett ord forandrer alt: sin betyr sin egen, hans betyr en annens. Familien går gjennom hans, hennes, vår og deres.',
  cover: 0,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'musa', x: 110, mood: 'grin', pose: 'hold' }, { id: 'denys', x: 320, mood: 'surprised', pose: 'point' }], props: [{ type: 'bike', x: 225 }] }, lines: [
      { who: 'denys', no: 'Musa tar sykkelen sin. Eller tar han sykkelen min?', uk: 'Муса бере свій велосипед. Чи він бере мій велосипед?', en: 'Musa takes his own bike. Or is he taking my bike?' },
      { who: 'musa', no: 'Rolig! Jeg tar sykkelen min – altså sykkelen sin.', uk: 'Спокійно! Я беру свій велосипед — тобто sykkelen sin.', en: 'Easy! I am taking my own bike — that is sykkelen sin.' }
    ]},
    { art: { bg: 'home', board: 'sin = sin egen', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'point' }, { id: 'nora', x: 320, mood: 'normal' }], props: [{ type: 'sofa', x: 320 }] }, lines: [
      { who: 'maria', no: 'Regelen er enkel. Sin peker på den som gjør noe.', uk: 'Правило просте. Sin вказує на того, хто діє.', en: 'The rule is simple. Sin points to the one who is doing something.' },
      { who: 'nora', no: 'Nora leser boka si. Det er min egen bok?', uk: 'Nora leser boka si. Це моя власна книжка?', en: 'Nora leser boka si. Is that my own book?' },
      { who: 'maria', no: 'Ja, akkurat!', uk: 'Так, саме так!', en: 'Yes, exactly!' }
    ]},
    { art: { bg: 'home', board: 'hans / hennes', chars: [{ id: 'maria', x: 110, mood: 'normal', pose: 'hips' }, { id: 'leo', x: 320, mood: 'surprised' }], props: [{ type: 'book', x: 215 }] }, lines: [
      { who: 'maria', no: 'Men «Nora leser boka hans» betyr en annen persons bok.', uk: 'Але «Nora leser boka hans» означає книжку іншої людини.', en: 'But “Nora leser boka hans” means another person’s book.' },
      { who: 'leo', no: 'Hans er guttens, og hennes er jentas?', uk: 'Hans — хлопцеве, а hennes — дівчаче?', en: 'Hans belongs to the boy, and hennes to the girl?' },
      { who: 'maria', no: 'Riktig. Hans = han sin. Hennes = hun sin.', uk: 'Правильно. Hans = його. Hennes = її.', en: 'Correct. Hans = his. Hennes = hers.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'musa', x: 110, mood: 'happy', pose: 'point' }, { id: 'leo', x: 230, mood: 'happy' }, { id: 'nora', x: 340, mood: 'grin' }], props: [{ type: 'ball', x: 190, y: 250 }] }, lines: [
      { who: 'musa', no: 'Leo kaster ballen sin. Nora kaster ballen hans.', uk: 'Лео кидає свій м’яч. Нора кидає його м’яч.', en: 'Leo throws his own ball. Nora throws his ball.' },
      { who: 'nora', no: 'To baller, to ord. Nå ser jeg forskjellen!', uk: 'Два м’ячі, два слова. Тепер я бачу різницю!', en: 'Two balls, two words. Now I see the difference!' }
    ]},
    { art: { bg: 'home', board: 'vår · vårt · våre', chars: [{ id: 'mamma', x: 110, mood: 'happy', pose: 'hips' }, { id: 'mia', x: 320, mood: 'happy' }], props: [{ type: 'table', x: 215 }] }, lines: [
      { who: 'mamma', no: 'Dette er huset vårt, og hagen er vår.', uk: 'Це наш дім, а сад — наш.', en: 'This is our house, and the garden is ours.' },
      { who: 'mia', no: 'Og bøkene våre står i hylla!', uk: 'А наші книжки стоять на полиці!', en: 'And our books are on the shelf!' }
    ]},
    { art: { bg: 'school', board: 'deres', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'mia', x: 320, mood: 'normal' }], props: [{ type: 'desk', x: 320 }] }, lines: [
      { who: 'laerer', no: 'Deres betyr både «deres» til dere og «deres» til dem.', uk: 'Deres означає і «ваш», і «їхній».', en: 'Deres means both “your” (plural) and “their”.' },
      { who: 'mia', no: 'Er dette pennalet deres?', uk: 'Це ваш пенал?', en: 'Is this your pencil case?' },
      { who: 'laerer', no: 'Nei, det er pennalet deres – barna i klasse 2B.', uk: 'Ні, це їхній пенал — дітей із класу 2B.', en: 'No, it is their pencil case — the children in class 2B.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 110, mood: 'grin', pose: 'point' }, { id: 'musa', x: 320, mood: 'happy' }], props: [{ type: 'car', x: 225 }] }, lines: [
      { who: 'denys', no: 'Musa vasker bilen sin. Jeg vasker bilen hans også!', uk: 'Муса миє свою машину. Я мию і його машину!', en: 'Musa washes his own car. I wash his car too!' },
      { who: 'musa', no: 'Takk, nabo! Du er best.', uk: 'Дякую, сусіде! Ти найкращий.', en: 'Thanks, neighbour! You are the best.' }
    ]},
    { art: { bg: 'home', board: 'sin · hans · hennes\nvår · deres', chars: [{ id: 'nora', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 320, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'nora', no: 'Sin er min egen, hans og hennes er en annens.', uk: 'Sin — власний, hans і hennes — чужий.', en: 'Sin is one’s own, hans and hennes belong to someone else.' },
      { who: 'maria', no: 'Og vår er vår – hele familien vår!', uk: 'А vår — наш, уся наша сім’я!', en: 'And vår is ours — our whole family!' }
    ]}
  ],

  vocab: [
    ['sin / si / sitt / sine', 'свій / своя / своє / свої', 'one’s own'],
    ['hans', 'його (чужий)', 'his (someone else’s)'],
    ['hennes', 'її', 'hers'],
    ['vår / vårt / våre', 'наш / наше / наші', 'our'],
    ['deres', 'ваш; їхній', 'your (plural); their'],
    ['en regel', 'правило', 'a rule'],
    ['enkel', 'простий', 'simple'],
    ['egen', 'власний', 'own'],
    ['en forskjell', 'різниця', 'a difference'],
    ['å peke på', 'вказувати на', 'to point at'],
    ['å kaste', 'кидати', 'to throw'],
    ['å vaske', 'мити', 'to wash'],
    ['en nabo', 'сусід', 'a neighbour'],
    ['ei hylle', 'полиця', 'a shelf'],
    ['akkurat', 'саме так', 'exactly']
  ],

  words: {
    no: { 'sin': 'свій', 'si': 'своя', 'sitt': 'своє', 'sine': 'свої', 'hans': 'його', 'hennes': 'її', 'vår': 'наш', 'vårt': 'наше', 'våre': 'наші', 'deres': 'ваш; їхній', 'sykkelen': 'велосипед', 'tar': 'бере', 'rolig': 'спокійно', 'altså': 'тобто', 'regelen': 'правило', 'enkel': 'простий', 'peker': 'вказує', 'gjør': 'робить', 'noe': 'щось', 'leser': 'читає', 'boka': 'книжка', 'egen': 'власний', 'akkurat': 'саме так', 'annen': 'інший', 'annens': 'іншої людини', 'persons': 'людини', 'guttens': 'хлопця', 'jentas': 'дівчинки', 'kaster': 'кидає', 'ballen': 'м’яч', 'baller': 'м’ячі', 'ord': 'слова', 'ser': 'бачу', 'forskjellen': 'різницю', 'huset': 'дім', 'hagen': 'сад', 'bøkene': 'книжки', 'hylla': 'полиця', 'både': 'і… і', 'dem': 'їм, їх', 'pennalet': 'пенал', 'barna': 'діти', 'klasse': 'клас', '2b': '2Б (назва класу)', 'vasker': 'миє', 'bilen': 'машина', 'nabo': 'сусід', 'naboens': 'сусідів', 'best': 'найкращий', 'hele': 'уся', 'familien': 'сім’я', 'forandrer': 'змінює', 'alt': 'усе', 'ett': 'одне', 'gjennom': 'через (gå gjennom — розібрати)', 'tok': 'узяв' },
    en: { 'sin': 'his/her own', 'si': 'his/her own (fem.)', 'sitt': 'his/her own (neut.)', 'sine': 'his/her own (pl.)', 'hans': 'his', 'hennes': 'hers', 'vår': 'our', 'vårt': 'our (neuter)', 'våre': 'our (plural)', 'deres': 'your (pl.); their', 'sykkelen': 'the bike', 'tar': 'takes', 'rolig': 'calm, easy', 'altså': 'that is', 'regelen': 'the rule', 'enkel': 'simple', 'peker': 'points', 'gjør': 'does', 'noe': 'something', 'leser': 'reads', 'boka': 'the book', 'egen': 'own', 'akkurat': 'exactly', 'annen': 'other', 'annens': 'another person’s', 'persons': 'person’s', 'guttens': 'the boy’s', 'jentas': 'the girl’s', 'kaster': 'throws', 'ballen': 'the ball', 'baller': 'balls', 'ord': 'words', 'ser': 'see', 'forskjellen': 'the difference', 'huset': 'the house', 'hagen': 'the garden', 'bøkene': 'the books', 'hylla': 'the shelf', 'både': 'both', 'dem': 'them', 'pennalet': 'the pencil case', 'barna': 'the children', 'klasse': 'class', '2b': '2B (class name)', 'vasker': 'washes', 'bilen': 'the car', 'nabo': 'neighbour', 'naboens': 'the neighbour’s', 'best': 'best', 'hele': 'whole', 'familien': 'the family', 'forandrer': 'changes', 'alt': 'everything', 'ett': 'one', 'gjennom': 'through', 'tok': 'took' }
  }
});
