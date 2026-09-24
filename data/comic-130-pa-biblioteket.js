window.COMICS = window.COMICS || [];

/* p130 — B1: бібліотека. Картка читача, строки, продовження, безкоштовні курси й мовне кафе. */
COMICS.push({
  id: 'p130',
  level: 'B1',
  category: 'fritid',
  title: 'På biblioteket',
  titleUk: 'У бібліотеці',
  titleEn: 'At the library',
  summaryUk: 'Нора хоче взяти книжки й дізнається, що бібліотека в Норвегії — це ще й безкоштовні курси, мовне кафе та місце для роботи.',
  summaryEn: 'Nora wants to borrow books and discovers that a Norwegian library is also free courses, a language café and a place to work.',
  summaryNo: 'Nora vil låne bøker og oppdager at biblioteket også har gratis kurs, språkkafé og plass til å jobbe.',
  cover: 0,

  panels: [
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'happy' }, { id: 'kasserer', x: 100, mood: 'happy' }], props: [{ type: 'counter', x: 100 }, { type: 'book', x: 220 }] }, lines: [
      { who: 'nora', no: 'Hei! Jeg vil gjerne låne bøker. Hva trenger jeg?', uk: 'Вітаю! Я хочу брати книжки. Що для цього потрібно?', en: 'Hi! I would like to borrow books. What do I need?' },
      { who: 'kasserer', no: 'Bare legitimasjon. Lånekortet er gratis.', uk: 'Лише документ. Читацька картка безкоштовна.', en: 'Just ID. The library card is free.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, pose: 'hold' }, { id: 'nora', x: 310, mood: 'surprised' }], props: [{ type: 'counter', x: 100 }, { type: 'docs', x: 220, y: 205 }] }, lines: [
      { who: 'kasserer', no: 'Her er kortet ditt. Lånetiden er fire uker.', uk: 'Ось ваша картка. Термін — чотири тижні.', en: 'Here is your card. The loan period is four weeks.' },
      { who: 'nora', no: 'Kan jeg forlenge hvis jeg ikke blir ferdig?', uk: 'Можна продовжити, якщо не встигну дочитати?', en: 'Can I extend it if I do not finish?' },
      { who: 'kasserer', no: 'Ja, to ganger — i appen eller her i skranken.', uk: 'Так, двічі — у застосунку або тут, на стійці.', en: 'Yes, twice — in the app or here at the desk.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'normal' }, { id: 'kasserer', x: 100, mood: 'normal' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'nora', no: 'Hva skjer hvis jeg leverer for sent?', uk: 'Що буде, якщо здам із запізненням?', en: 'What happens if I return it late?' },
      { who: 'kasserer', no: 'Du får en påminnelse. Barn slipper gebyr helt.', uk: 'Вам надійде нагадування. Діти взагалі не платять штрафу.', en: 'You get a reminder. Children pay no fee at all.' }
    ]},
    { art: { bg: 'shop', board: 'språkkafé onsdag', chars: [{ id: 'kasserer', x: 100, pose: 'point' }, { id: 'nora', x: 310, mood: 'happy' }] }, lines: [
      { who: 'kasserer', no: 'På onsdager har vi språkkafé. Du kan øve norsk gratis.', uk: 'По середах у нас мовне кафе. Можна безкоштовно практикувати норвезьку.', en: 'On Wednesdays we have a language café. You can practise Norwegian for free.' },
      { who: 'nora', no: 'Det var akkurat det jeg trengte!', uk: 'Саме цього мені й бракувало!', en: 'That is exactly what I needed!' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'normal', pose: 'hold' }, { id: 'kasserer', x: 100, mood: 'happy' }], props: [{ type: 'computer', x: 220, y: 190 }] }, lines: [
      { who: 'nora', no: 'Kan jeg sitte og jobbe her også?', uk: 'Чи можна тут ще й попрацювати?', en: 'Can I sit and work here too?' },
      { who: 'kasserer', no: 'Ja, vi har lesesal, trådløst nett og grupperom du kan bestille.', uk: 'Так, є читальна зала, вайфай і кімнати для груп, які можна забронювати.', en: 'Yes, we have a reading room, wireless internet and group rooms you can book.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'kasserer', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'book', x: 215 }], fx: 'stars' }, lines: [
      { who: 'nora', no: 'Da tar jeg disse tre bøkene og kommer igjen på onsdag.', uk: 'Тоді беру ці три книжки й повернуся в середу.', en: 'Then I will take these three books and come back on Wednesday.' },
      { who: 'kasserer', no: 'God lesing! Vi ses.', uk: 'Приємного читання! До зустрічі.', en: 'Happy reading! See you.' }
    ]}
  ],

  vocab: [
    ['et bibliotek', 'бібліотека', 'a library'],
    ['å låne', 'позичати, брати', 'to borrow'],
    ['ei legitimasjon', 'документ, посвідчення', 'ID'],
    ['et lånekort', 'читацька картка', 'a library card'],
    ['ei lånetid', 'термін користування', 'a loan period'],
    ['å forlenge', 'продовжити', 'to extend'],
    ['ei skranke', 'стійка обслуговування', 'a service desk'],
    ['å levere', 'здавати, повертати', 'to return, hand in'],
    ['ei påminnelse', 'нагадування', 'a reminder'],
    ['et gebyr', 'штраф, збір', 'a fee'],
    ['en språkkafé', 'мовне кафе', 'a language café'],
    ['å øve', 'практикувати', 'to practise'],
    ['ei lesesal', 'читальна зала', 'a reading room'],
    ['et grupperom', 'кімната для груп', 'a group room'],
    ['å bestille', 'бронювати', 'to book']
  ],

  words: {
    no: { 'biblioteket': 'бібліотека', 'låne': 'брати, позичати', 'bøker': 'книжки', 'bøkene': 'книжки', 'legitimasjon': 'документ', 'lånekortet': 'читацька картка', 'gratis': 'безкоштовно', 'kortet': 'картка', 'lånetiden': 'термін користування', 'fire': 'чотири', 'uker': 'тижні', 'forlenge': 'продовжити', 'ferdig': 'готова, закінчила', 'ganger': 'рази', 'appen': 'застосунок', 'skranken': 'стійка', 'skjer': 'трапиться', 'leverer': 'здам', 'sent': 'пізно', 'påminnelse': 'нагадування', 'slipper': 'уникають', 'gebyr': 'штраф', 'helt': 'зовсім', 'onsdager': 'середи', 'onsdag': 'середа', 'språkkafé': 'мовне кафе', 'øve': 'практикувати', 'norsk': 'норвезька', 'akkurat': 'саме', 'trengte': 'бракувало, потребувала', 'sitte': 'сидіти', 'jobbe': 'працювати', 'lesesal': 'читальна зала', 'trådløst': 'бездротовий', 'nett': 'мережа', 'grupperom': 'кімната для груп', 'bestille': 'бронювати', 'disse': 'ці', 'tre': 'три', 'igjen': 'знову', 'lesing': 'читання', 'oppdager': 'відкриває для себе' },
    en: { 'biblioteket': 'the library', 'låne': 'to borrow', 'bøker': 'books', 'bøkene': 'the books', 'legitimasjon': 'ID', 'lånekortet': 'the library card', 'gratis': 'free', 'kortet': 'the card', 'lånetiden': 'the loan period', 'fire': 'four', 'uker': 'weeks', 'forlenge': 'to extend', 'ferdig': 'finished', 'ganger': 'times', 'appen': 'the app', 'skranken': 'the desk', 'skjer': 'happens', 'leverer': 'return', 'sent': 'late', 'påminnelse': 'reminder', 'slipper': 'avoid', 'gebyr': 'fee', 'helt': 'completely', 'onsdager': 'Wednesdays', 'onsdag': 'Wednesday', 'språkkafé': 'language café', 'øve': 'to practise', 'norsk': 'Norwegian', 'akkurat': 'exactly', 'trengte': 'needed', 'sitte': 'to sit', 'jobbe': 'to work', 'lesesal': 'reading room', 'trådløst': 'wireless', 'nett': 'network', 'grupperom': 'group room', 'bestille': 'to book', 'disse': 'these', 'tre': 'three', 'igjen': 'again', 'lesing': 'reading', 'oppdager': 'discovers' }
  }
});
