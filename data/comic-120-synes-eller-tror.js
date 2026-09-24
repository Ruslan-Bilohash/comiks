window.COMICS = window.COMICS || [];

/* p120 — «Jeg synes, jeg tror»: різниця між думкою (synes) і припущенням (tror).
   Вісім кадрів, прості речення, у кожному кадрі одна пара synes/tror. */
COMICS.push({
  id: 'p120',
  level: 'A2',
  category: 'hverdag',
  title: 'Synes eller tror?',
  titleUk: 'Synes чи tror?',
  titleEn: 'Synes or tror?',
  summaryUk: 'Нора не може вибрати: «я думаю» — це synes чи tror? Муса пояснює просто: synes — це моя думка про те, що я вже знаю, а tror — це здогад про те, чого я ще не знаю.',
  summaryEn: 'Nora cannot decide: is “I think” synes or tror? Musa explains it simply: synes is my opinion about something I know, tror is a guess about something I do not know yet.',
  summaryNo: 'Nora klarer ikke å velge: heter det «jeg synes» eller «jeg tror»? Musa forklarer enkelt: synes er min mening om noe jeg kjenner, tror er en gjetning om noe jeg ikke vet ennå.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'synes / tror', chars: [{ id: 'nora', x: 110, mood: 'sad' }, { id: 'musa', x: 300, mood: 'happy', pose: 'wave' }], props: [{ type: 'desk', x: 110 }] }, lines: [
      { who: 'nora', no: 'Musa, jeg forstår ikke. Synes eller tror?', uk: 'Мусо, я не розумію. Synes чи tror?', en: 'Musa, I do not understand. Synes or tror?' },
      { who: 'musa', no: 'Det er lett. Synes er min mening. Tror er min gjetning.', uk: 'Це легко. Synes — це моя думка. Tror — це мій здогад.', en: 'It is easy. Synes is my opinion. Tror is my guess.' }
    ]},
    { art: { bg: 'school', board: 'Jeg synes …', chars: [{ id: 'musa', x: 120, mood: 'grin', pose: 'point' }, { id: 'nora', x: 300, mood: 'happy' }] }, lines: [
      { who: 'musa', no: 'Jeg har smakt kaka. Jeg synes den er god.', uk: 'Я куштував торт. Я вважаю, що він смачний.', en: 'I have tasted the cake. I think it is good.' },
      { who: 'nora', no: 'Så synes handler om noe du kjenner?', uk: 'Отже, synes — про те, що ти знаєш?', en: 'So synes is about something you know?' },
      { who: 'musa', no: 'Nettopp. Jeg vet hvordan den smaker.', uk: 'Саме так. Я знаю, який він на смак.', en: 'Exactly. I know how it tastes.' }
    ]},
    { art: { bg: 'school', board: 'Jeg tror …', chars: [{ id: 'musa', x: 120, mood: 'normal', pose: 'hips' }, { id: 'nora', x: 300, mood: 'surprised' }], props: [{ type: 'clock', x: 340, y: 70 }] }, lines: [
      { who: 'musa', no: 'Jeg har ikke smakt suppa. Jeg tror den er god.', uk: 'Я не куштував супу. Думаю (припускаю), що він смачний.', en: 'I have not tasted the soup. I think (guess) it is good.' },
      { who: 'nora', no: 'Aha! Tror er når du ikke vet sikkert.', uk: 'Ага! Tror — це коли не знаєш напевно.', en: 'Aha! Tror is when you do not know for sure.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 110, mood: 'happy', pose: 'hold' }, { id: 'nora', x: 300, mood: 'grin' }], props: [{ type: 'book', x: 200 }] }, lines: [
      { who: 'mia', no: 'Jeg synes denne boka er morsom. Jeg har lest den to ganger.', uk: 'Я вважаю, що ця книжка смішна. Я читала її двічі.', en: 'I think this book is funny. I have read it twice.' },
      { who: 'nora', no: 'Og jeg tror den nye boka også er morsom.', uk: 'А я думаю, що нова книжка теж смішна.', en: 'And I think the new book is funny too.' },
      { who: 'mia', no: 'Du har ikke lest den, så du tror. Riktig!', uk: 'Ти її не читала, тому tror. Правильно!', en: 'You have not read it, so you guess. Correct!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'leo', x: 110, mood: 'surprised', pose: 'point' }, { id: 'musa', x: 310, mood: 'happy' }], fx: 'rain' }, lines: [
      { who: 'leo', no: 'Tror du det blir sol i morgen?', uk: 'Думаєш, завтра буде сонце?', en: 'Do you think it will be sunny tomorrow?' },
      { who: 'musa', no: 'Jeg tror det. Men jeg vet ikke sikkert.', uk: 'Думаю, так. Але напевно не знаю.', en: 'I think so. But I do not know for sure.' },
      { who: 'leo', no: 'Jeg synes regn er kjedelig!', uk: 'А я вважаю, що дощ нудний!', en: 'I think rain is boring!' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'happy' }, { id: 'nora', x: 320, mood: 'normal', pose: 'hold' }], props: [{ type: 'counter', x: 100 }, { type: 'apples', x: 230 }] }, lines: [
      { who: 'nora', no: 'Jeg synes eplene her er billige.', uk: 'Я вважаю, що яблука тут дешеві.', en: 'I think the apples here are cheap.' },
      { who: 'kasserer', no: 'Takk! Jeg tror vi får nye epler i morgen.', uk: 'Дякую! Думаю, завтра будуть нові яблука.', en: 'Thank you! I think we will get new apples tomorrow.' }
    ]},
    { art: { bg: 'school', board: 'synes = mening\ntror = gjetning', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'nora', x: 310, mood: 'grin', pose: 'cheer' }] }, lines: [
      { who: 'laerer', no: 'Husk: jeg synes om noe jeg kjenner, jeg tror om noe jeg ikke vet.', uk: 'Запам’ятай: synes — про те, що знаю; tror — про те, чого не знаю.', en: 'Remember: synes about something I know, tror about something I do not know.' },
      { who: 'nora', no: 'Og «jeg tror på deg» betyr at jeg stoler på deg!', uk: 'А «jeg tror på deg» означає, що я тобі вірю!', en: 'And “jeg tror på deg” means I believe in you!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'nora', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'musa', x: 300, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'nora', no: 'Nå forstår jeg! Jeg synes norsk er gøy.', uk: 'Тепер я розумію! Я вважаю, що норвезька — це весело.', en: 'Now I understand! I think Norwegian is fun.' },
      { who: 'musa', no: 'Og jeg tror du blir veldig flink!', uk: 'А я думаю, що ти станеш дуже вправною!', en: 'And I think you will become very good!' }
    ]}
  ],

  vocab: [
    ['å synes', 'вважати (мати думку)', 'to think (have an opinion)'],
    ['å tro', 'думати, припускати; вірити', 'to think, to guess; to believe'],
    ['en mening', 'думка', 'an opinion'],
    ['en gjetning', 'здогад', 'a guess'],
    ['å smake', 'куштувати; бути на смак', 'to taste'],
    ['å kjenne', 'знати, бути знайомим', 'to know, to be familiar with'],
    ['sikkert', 'напевно', 'for sure'],
    ['ei suppe', 'суп', 'a soup'],
    ['morsom', 'смішний', 'funny'],
    ['kjedelig', 'нудний', 'boring'],
    ['billig', 'дешевий', 'cheap'],
    ['å stole på', 'довіряти', 'to trust'],
    ['nettopp', 'саме так', 'exactly'],
    ['to ganger', 'двічі', 'twice'],
    ['flink', 'вправний, молодець', 'good at, clever']
  ],

  words: {
    no: { 'synes': 'вважаю (моя думка)', 'tror': 'думаю, припускаю', 'mening': 'думка', 'gjetning': 'здогад', 'min': 'мій, моя', 'lett': 'легко', 'smakt': 'куштував', 'kaka': 'торт', 'den': 'він/вона (про предмет)', 'god': 'смачний, хороший', 'handler': 'ідеться (handle om — бути про)', 'kjenner': 'знаю, знайомий', 'nettopp': 'саме так', 'hvordan': 'як', 'smaker': 'на смак', 'suppa': 'суп', 'sikkert': 'напевно', 'aha': 'ага', 'denne': 'ця', 'boka': 'книжка', 'morsom': 'смішна', 'lest': 'читав, читала', 'ganger': 'разів', 'nye': 'нова, нові', 'også': 'теж', 'riktig': 'правильно', 'sol': 'сонце', 'morgen': 'ранок (i morgen — завтра)', 'regn': 'дощ', 'kjedelig': 'нудний', 'eplene': 'яблука', 'billige': 'дешеві', 'får': 'отримаємо', 'epler': 'яблука', 'husk': 'запам’ятай', 'noe': 'щось', 'betyr': 'означає', 'stoler': 'довіряю (stole på)', 'forstår': 'розумію', 'gøy': 'весело', 'blir': 'станеш, буде', 'flink': 'вправний, молодець', 'veldig': 'дуже', 'klarer': 'можу, справляюся' },
    en: { 'synes': 'think (opinion)', 'tror': 'think, guess', 'mening': 'opinion', 'gjetning': 'guess', 'min': 'my', 'lett': 'easy', 'smakt': 'tasted', 'kaka': 'the cake', 'den': 'it', 'god': 'good, tasty', 'handler': 'is about (handle om)', 'kjenner': 'know, am familiar with', 'nettopp': 'exactly', 'hvordan': 'how', 'smaker': 'tastes', 'suppa': 'the soup', 'sikkert': 'for sure', 'aha': 'aha', 'denne': 'this', 'boka': 'the book', 'morsom': 'funny', 'lest': 'read (past participle)', 'ganger': 'times', 'nye': 'new', 'også': 'too', 'riktig': 'correct', 'sol': 'sun', 'morgen': 'morning (i morgen — tomorrow)', 'regn': 'rain', 'kjedelig': 'boring', 'eplene': 'the apples', 'billige': 'cheap', 'får': 'will get', 'epler': 'apples', 'husk': 'remember', 'noe': 'something', 'betyr': 'means', 'stoler': 'trust (stole på)', 'forstår': 'understand', 'gøy': 'fun', 'blir': 'will become', 'flink': 'good at, clever', 'veldig': 'very', 'klarer': 'manage' }
  }
});
