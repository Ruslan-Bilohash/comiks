window.COMICS = window.COMICS || [];

/* p151 — B2: презентація. Структура, зв’язки між думками, робота з питаннями. */
COMICS.push({
  id: 'p151',
  level: 'B2',
  category: 'jobb',
  title: 'Å holde en presentasjon',
  titleUk: 'Як виступити з презентацією',
  titleEn: 'Giving a presentation',
  summaryUk: 'Аліна вперше виступає перед відділом. Колега допомагає скоротити слайди, підготувати вступ і спокійно відповідати на складні питання.',
  summaryEn: 'Alina presents to the department for the first time. A colleague helps her cut the slides, prepare an opening and answer tough questions calmly.',
  summaryNo: 'Alina skal holde sin første presentasjon for avdelingen. En kollega hjelper henne å kutte lysbilder, forberede innledningen og svare rolig på vanskelige spørsmål.',
  cover: 0,

  panels: [
    { art: { bg: 'office', board: '24 lysbilder', chars: [{ id: 'alina', x: 310, mood: 'sad' }, { id: 'denys', x: 100, mood: 'surprised' }], props: [{ type: 'computer', x: 215, y: 190 }] }, lines: [
      { who: 'alina', no: 'Jeg har laget tjuefire lysbilder til et femten minutters innlegg.', uk: 'Я зробила двадцять чотири слайди на п’ятнадцятихвилинний виступ.', en: 'I have made twenty-four slides for a fifteen-minute talk.' },
      { who: 'denys', no: 'Det er altfor mange. Regn med ett lysbilde per to minutter.', uk: 'Це надто багато. Рахуй один слайд на дві хвилини.', en: 'That is far too many. Reckon one slide per two minutes.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 100, pose: 'point' }, { id: 'alina', x: 310, mood: 'normal' }] }, lines: [
      { who: 'denys', no: 'Start med hovedbudskapet. Hva skal folk huske etterpå?', uk: 'Почни з головного меседжу. Що люди мають запам’ятати?', en: 'Start with the main message. What should people remember afterwards?' },
      { who: 'alina', no: 'At den nye rutinen sparer oss for to timer i uka.', uk: 'Що новий порядок економить нам дві години на тиждень.', en: 'That the new routine saves us two hours a week.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 310, mood: 'happy' }, { id: 'denys', x: 100, mood: 'normal' }] }, lines: [
      { who: 'denys', no: 'Perfekt. Si det i første setning, og bruk resten på å vise hvordan.', uk: 'Чудово. Скажи це першим реченням, а решту присвяти тому, як саме.', en: 'Perfect. Say that in the first sentence and use the rest to show how.' },
      { who: 'alina', no: 'Og bindeord mellom delene: «for det første», «videre», «til slutt».', uk: 'І слова-зв’язки між частинами: «по-перше», «далі», «нарешті».', en: 'And linking words between the parts: “firstly”, “next”, “finally”.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 100, mood: 'normal' }, { id: 'alina', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'alina', no: 'Hva om noen stiller et spørsmål jeg ikke kan svare på?', uk: 'А якщо хтось поставить питання, на яке я не знаю відповіді?', en: 'What if someone asks a question I cannot answer?' },
      { who: 'denys', no: 'Da sier du det ærlig og lover å komme tilbake med svaret. Det svekker deg ikke.', uk: 'Тоді чесно кажеш і обіцяєш повернутися з відповіддю. Це тебе не послаблює.', en: 'Then you say so honestly and promise to come back with the answer. It does not weaken you.' }
    ]},
    { art: { bg: 'office', board: 'spar 2 t/uke', chars: [{ id: 'alina', x: 310, mood: 'happy', pose: 'point' }, { id: 'laerer', x: 100, mood: 'happy' }] }, lines: [
      { who: 'alina', no: 'Kort sagt: rutinen sparer oss to timer i uka, og den er enkel å innføre.', uk: 'Коротко: цей порядок економить дві години на тиждень і його легко запровадити.', en: 'In short: the routine saves us two hours a week and it is easy to introduce.' },
      { who: 'laerer', no: 'Tydelig og konkret. Har du tenkt på hva det koster å innføre den?', uk: 'Чітко й конкретно. Ви думали, скільки коштує її запровадження?', en: 'Clear and concrete. Have you thought about what it costs to introduce?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'denys', x: 100, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'alina', no: 'Et godt spørsmål — jeg sjekker tallene og sender dem i morgen.', uk: 'Слушне питання — перевірю цифри й надішлю завтра.', en: 'A good question — I will check the figures and send them tomorrow.' },
      { who: 'denys', no: 'Sånn skal det gjøres. Du var rolig hele veien.', uk: 'Саме так і треба. Ти була спокійна від початку до кінця.', en: 'That is how it is done. You were calm the whole way.' }
    ]}
  ],

  vocab: [
    ['ei presentasjon', 'презентація', 'a presentation'],
    ['et lysbilde', 'слайд', 'a slide'],
    ['et innlegg', 'виступ', 'a talk'],
    ['et hovedbudskap', 'головна думка', 'the main message'],
    ['ei rutine', 'порядок дій', 'a routine'],
    ['å spare', 'економити', 'to save'],
    ['et bindeord', 'слово-зв’язка', 'a linking word'],
    ['for det første', 'по-перше', 'firstly'],
    ['til slutt', 'нарешті', 'finally'],
    ['å stille et spørsmål', 'поставити питання', 'to ask a question'],
    ['ærlig', 'чесно', 'honestly'],
    ['å love', 'обіцяти', 'to promise'],
    ['å svekke', 'послаблювати', 'to weaken'],
    ['kort sagt', 'коротко кажучи', 'in short'],
    ['tydelig', 'чіткий', 'clear'],
    ['rolig', 'спокійний', 'calm']
  ],

  words: {
    no: { 'laget': 'зробила', 'tjuefire': 'двадцять чотири', 'lysbilder': 'слайди', 'lysbilde': 'слайд', 'femten': 'п’ятнадцять', 'minutters': 'хвилинний', 'innlegg': 'виступ', 'altfor': 'надто', 'mange': 'багато', 'regn': 'рахуй', 'per': 'на', 'minutter': 'хвилини', 'start': 'почни', 'hovedbudskapet': 'головна думка', 'folk': 'люди', 'huske': 'запам’ятати', 'etterpå': 'після', 'rutinen': 'порядок', 'sparer': 'економить', 'timer': 'години', 'uka': 'тиждень', 'perfekt': 'чудово', 'setning': 'речення', 'resten': 'решта', 'vise': 'показати', 'hvordan': 'як', 'bindeord': 'слова-зв’язки', 'mellom': 'між', 'delene': 'частини', 'videre': 'далі', 'slutt': 'кінець (til slutt — нарешті)', 'stiller': 'ставить', 'spørsmål': 'питання', 'svare': 'відповісти', 'ærlig': 'чесно', 'lover': 'обіцяєш', 'tilbake': 'назад', 'svaret': 'відповідь', 'svekker': 'послаблює', 'kort': 'коротко', 'sagt': 'кажучи', 'enkel': 'легкий', 'innføre': 'запровадити', 'tydelig': 'чітко', 'konkret': 'конкретно', 'tenkt': 'думали', 'koster': 'коштує', 'sjekker': 'перевірю', 'tallene': 'цифри', 'sender': 'надішлю', 'sånn': 'так', 'gjøres': 'робиться', 'rolig': 'спокійна', 'hele': 'увесь', 'veien': 'шлях (hele veien — від початку до кінця)', 'avdelingen': 'відділ', 'kutte': 'скоротити', 'forberede': 'підготувати', 'innledningen': 'вступ', 'vanskelige': 'складні' },
    en: { 'laget': 'made', 'tjuefire': 'twenty-four', 'lysbilder': 'slides', 'lysbilde': 'slide', 'femten': 'fifteen', 'minutters': 'minute', 'innlegg': 'talk', 'altfor': 'far too', 'mange': 'many', 'regn': 'reckon', 'per': 'per', 'minutter': 'minutes', 'start': 'start', 'hovedbudskapet': 'the main message', 'folk': 'people', 'huske': 'to remember', 'etterpå': 'afterwards', 'rutinen': 'the routine', 'sparer': 'saves', 'timer': 'hours', 'uka': 'the week', 'perfekt': 'perfect', 'setning': 'sentence', 'resten': 'the rest', 'vise': 'to show', 'hvordan': 'how', 'bindeord': 'linking words', 'mellom': 'between', 'delene': 'the parts', 'videre': 'next', 'slutt': 'end (til slutt — finally)', 'stiller': 'asks', 'spørsmål': 'question', 'svare': 'to answer', 'ærlig': 'honestly', 'lover': 'promise', 'tilbake': 'back', 'svaret': 'the answer', 'svekker': 'weakens', 'kort': 'short', 'sagt': 'said (kort sagt — in short)', 'enkel': 'easy', 'innføre': 'to introduce', 'tydelig': 'clear', 'konkret': 'concrete', 'tenkt': 'thought', 'koster': 'costs', 'sjekker': 'will check', 'tallene': 'the figures', 'sender': 'will send', 'sånn': 'like that', 'gjøres': 'is done', 'rolig': 'calm', 'hele': 'the whole', 'veien': 'the way', 'avdelingen': 'the department', 'kutte': 'to cut', 'forberede': 'to prepare', 'innledningen': 'the opening', 'vanskelige': 'difficult' }
  }
});
