window.COMICS = window.COMICS || [];

/* p121 — eiendomsord, частина 1: min/mi/mitt/mine та din/di/ditt/dine.
   Форма залежить від роду й числа предмета: en sekk → min sekk, ei bok → mi bok,
   et pennal → mitt pennal, sko (flertall) → mine sko. */
COMICS.push({
  id: 'p121',
  level: 'A1',
  category: 'skole',
  title: 'Min, mi, mitt eller mine?',
  titleUk: 'Min, mi, mitt чи mine?',
  titleEn: 'Min, mi, mitt or mine?',
  summaryUk: 'У школі все переплуталось: чий це рюкзак, чия книжка й чиї черевики? Лео й Міа вчаться казати «мій, моя, моє, мої» норвезькою — форма залежить від роду й числа предмета.',
  summaryEn: 'Everything is mixed up at school: whose backpack, whose book and whose shoes? Leo and Mia learn to say “my” and “your” in Norwegian — the form depends on the gender and number of the thing.',
  summaryNo: 'Alt er blandet sammen på skolen: hvem sin sekk, hvem si bok og hvem sine sko? Leo og Mia lærer å si «min, mi, mitt, mine» – formen følger ordet.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'min · mi · mitt · mine', chars: [{ id: 'leo', x: 110, mood: 'surprised' }, { id: 'mia', x: 300, mood: 'happy', pose: 'hold' }], props: [{ type: 'backpack', x: 210, y: 250 }] }, lines: [
      { who: 'leo', no: 'Hei! Det er sekken min!', uk: 'Гей! Це мій рюкзак!', en: 'Hey! That is my backpack!' },
      { who: 'mia', no: 'Nei, dette er min sekk. Din sekk er blå.', uk: 'Ні, це мій рюкзак. Твій рюкзак синій.', en: 'No, this is my backpack. Your backpack is blue.' }
    ]},
    { art: { bg: 'school', board: 'en sekk → min sekk', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'leo', x: 310, mood: 'normal' }], props: [{ type: 'desk', x: 310 }] }, lines: [
      { who: 'laerer', no: 'En sekk er hankjønn. Derfor sier vi min sekk.', uk: 'En sekk — чоловічий рід. Тому кажемо min sekk.', en: 'En sekk is masculine. That is why we say min sekk.' },
      { who: 'leo', no: 'Og sekken min betyr det samme?', uk: 'А sekken min означає те саме?', en: 'And does sekken min mean the same?' },
      { who: 'laerer', no: 'Ja! Begge er riktige. Sekken min er mest vanlig.', uk: 'Так! Обидва правильні. Sekken min — найзвичніше.', en: 'Yes! Both are correct. Sekken min is the most common.' }
    ]},
    { art: { bg: 'school', board: 'ei bok → mi bok', chars: [{ id: 'mia', x: 110, mood: 'grin', pose: 'hold' }, { id: 'laerer', x: 310, mood: 'happy' }], props: [{ type: 'book', x: 210 }] }, lines: [
      { who: 'mia', no: 'Ei bok er hunkjønn. Så det er boka mi!', uk: 'Ei bok — жіночий рід. Отже, це boka mi!', en: 'Ei bok is feminine. So it is boka mi!' },
      { who: 'laerer', no: 'Helt riktig. Mi bok eller boka mi.', uk: 'Цілком правильно. Mi bok або boka mi.', en: 'Quite right. Mi bok or boka mi.' }
    ]},
    { art: { bg: 'school', board: 'et pennal → mitt pennal', chars: [{ id: 'leo', x: 110, mood: 'happy', pose: 'point' }, { id: 'mia', x: 310, mood: 'normal' }], props: [{ type: 'desk', x: 110 }, { type: 'note', x: 230 }] }, lines: [
      { who: 'leo', no: 'Et pennal er intetkjønn. Da sier vi mitt pennal.', uk: 'Et pennal — середній рід. Тоді кажемо mitt pennal.', en: 'Et pennal is neuter. Then we say mitt pennal.' },
      { who: 'mia', no: 'Og ditt pennal ligger på pulten din.', uk: 'А твій пенал лежить на твоїй парті.', en: 'And your pencil case is on your desk.' }
    ]},
    { art: { bg: 'school', board: 'flertall → mine', chars: [{ id: 'mia', x: 110, mood: 'surprised' }, { id: 'leo', x: 310, mood: 'grin', pose: 'hips' }] }, lines: [
      { who: 'mia', no: 'Hvor er skoene mine? Jeg har bare én sko!', uk: 'Де мої черевики? У мене лише один черевик!', en: 'Where are my shoes? I only have one shoe!' },
      { who: 'leo', no: 'Mange ting = mine. Skoene dine står ved døra.', uk: 'Багато речей = mine. Твої черевики стоять біля дверей.', en: 'Many things = mine. Your shoes are by the door.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 110, mood: 'happy', pose: 'hips' }, { id: 'leo', x: 310, mood: 'happy' }], props: [{ type: 'table', x: 210 }, { type: 'mug', x: 230, y: 200 }] }, lines: [
      { who: 'mamma', no: 'Er dette koppen din eller koppen min?', uk: 'Це твоя чашка чи моя?', en: 'Is this your cup or my cup?' },
      { who: 'leo', no: 'Det er min kopp. Din kopp er rød!', uk: 'Це моя чашка. Твоя чашка червона!', en: 'It is my cup. Your cup is red!' }
    ]},
    { art: { bg: 'school', board: 'min sekk · mi bok\nmitt pennal · mine sko', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'mia', x: 310, mood: 'grin' }] }, lines: [
      { who: 'laerer', no: 'Husk: min, mi, mitt, mine. Og du: din, di, ditt, dine.', uk: 'Запам’ятай: min, mi, mitt, mine. А ти: din, di, ditt, dine.', en: 'Remember: min, mi, mitt, mine. And you: din, di, ditt, dine.' },
      { who: 'mia', no: 'Det er som en liten sang!', uk: 'Це наче маленька пісенька!', en: 'It is like a little song!' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'leo', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'mia', x: 310, mood: 'grin', pose: 'cheer' }], props: [{ type: 'backpack', x: 215, y: 250 }], fx: 'stars' }, lines: [
      { who: 'leo', no: 'Nå vet jeg det: sekken min, boka mi, pennalet mitt!', uk: 'Тепер я знаю: sekken min, boka mi, pennalet mitt!', en: 'Now I know it: sekken min, boka mi, pennalet mitt!' },
      { who: 'mia', no: 'Og skoene mine står ved døra!', uk: 'А мої черевики стоять біля дверей!', en: 'And my shoes are by the door!' }
    ]}
  ],

  vocab: [
    ['min / mi / mitt / mine', 'мій / моя / моє / мої', 'my'],
    ['din / di / ditt / dine', 'твій / твоя / твоє / твої', 'your'],
    ['hankjønn', 'чоловічий рід (en)', 'masculine (en)'],
    ['hunkjønn', 'жіночий рід (ei)', 'feminine (ei)'],
    ['intetkjønn', 'середній рід (et)', 'neuter (et)'],
    ['flertall', 'множина', 'plural'],
    ['en sekk', 'рюкзак', 'a backpack'],
    ['ei bok', 'книжка', 'a book'],
    ['et pennal', 'пенал', 'a pencil case'],
    ['en sko', 'черевик', 'a shoe'],
    ['en kopp', 'чашка', 'a cup'],
    ['ei dør', 'двері', 'a door'],
    ['begge', 'обидва', 'both'],
    ['vanlig', 'звичайний', 'common, usual'],
    ['det samme', 'те саме', 'the same']
  ],

  words: {
    no: { 'sekken': 'рюкзак', 'sekk': 'рюкзак', 'min': 'мій', 'mi': 'моя', 'mitt': 'моє', 'mine': 'мої', 'din': 'твій', 'di': 'твоя', 'ditt': 'твоє', 'dine': 'твої', 'dette': 'це', 'blå': 'синій', 'hankjønn': 'чоловічий рід', 'hunkjønn': 'жіночий рід', 'intetkjønn': 'середній рід', 'flertall': 'множина', 'derfor': 'тому', 'sier': 'кажемо', 'betyr': 'означає', 'samme': 'те саме', 'begge': 'обидва', 'riktige': 'правильні', 'riktig': 'правильно', 'mest': 'най- (mest vanlig — найзвичніше)', 'vanlig': 'звичайний', 'bok': 'книжка', 'boka': 'книжка', 'helt': 'цілком', 'pennal': 'пенал', 'pennalet': 'пенал', 'ligger': 'лежить', 'pulten': 'парта', 'skoene': 'черевики', 'sko': 'черевик, черевики', 'bare': 'лише', 'én': 'один', 'mange': 'багато', 'ting': 'речі', 'står': 'стоять', 'ved': 'біля', 'døra': 'двері', 'koppen': 'чашка', 'kopp': 'чашка', 'rød': 'червона', 'husk': 'запам’ятай', 'som': 'наче, як', 'liten': 'маленька', 'sang': 'пісня', 'blandet': 'перемішано', 'hvem': 'хто, чий' },
    en: { 'sekken': 'the backpack', 'sekk': 'backpack', 'min': 'my', 'mi': 'my (feminine)', 'mitt': 'my (neuter)', 'mine': 'my (plural)', 'din': 'your', 'di': 'your (feminine)', 'ditt': 'your (neuter)', 'dine': 'your (plural)', 'dette': 'this', 'blå': 'blue', 'hankjønn': 'masculine', 'hunkjønn': 'feminine', 'intetkjønn': 'neuter', 'flertall': 'plural', 'derfor': 'therefore', 'sier': 'say', 'betyr': 'means', 'samme': 'the same', 'begge': 'both', 'riktige': 'correct', 'riktig': 'correct', 'mest': 'most', 'vanlig': 'common', 'bok': 'book', 'boka': 'the book', 'helt': 'completely', 'pennal': 'pencil case', 'pennalet': 'the pencil case', 'ligger': 'lies, is', 'pulten': 'the desk', 'skoene': 'the shoes', 'sko': 'shoe, shoes', 'bare': 'only', 'én': 'one', 'mange': 'many', 'ting': 'things', 'står': 'stand, are', 'ved': 'by', 'døra': 'the door', 'koppen': 'the cup', 'kopp': 'cup', 'rød': 'red', 'husk': 'remember', 'som': 'like, as', 'liten': 'little', 'sang': 'song', 'blandet': 'mixed', 'hvem': 'who, whose' }
  }
});
