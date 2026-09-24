window.COMICS = window.COMICS || [];

/* p127 — B1: батьківські збори. Як спитати про клас, домовитися й запропонувати допомогу. */
COMICS.push({
  id: 'p127',
  level: 'B1',
  category: 'skole',
  title: 'Foreldremøte',
  titleUk: 'Батьківські збори',
  titleEn: 'A parents’ meeting',
  summaryUk: 'Муса вперше йде на батьківські збори. Учителька розповідає про клас, поїздку й правила з телефонами, а батьки домовляються, хто що робить.',
  summaryEn: 'Musa goes to a parents’ meeting for the first time. The teacher talks about the class, a school trip and phone rules, and the parents agree who does what.',
  summaryNo: 'Musa er på foreldremøte for første gang. Læreren forteller om klassen, en tur og mobilreglene, og foreldrene blir enige om hvem som gjør hva.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'Foreldremøte 18.00', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'musa', x: 310, mood: 'happy' }], props: [{ type: 'desk', x: 310 }] }, lines: [
      { who: 'laerer', no: 'Velkommen til foreldremøte! Hyggelig at så mange kunne komme.', uk: 'Вітаю на батьківських зборах! Приємно, що стільки людей змогли прийти.', en: 'Welcome to the parents’ meeting! Nice that so many could come.' },
      { who: 'musa', no: 'Takk. Det er første gang for meg.', uk: 'Дякую. Для мене це вперше.', en: 'Thank you. It is my first time.' }
    ]},
    { art: { bg: 'school', board: 'trivsel · lekser · tur', chars: [{ id: 'laerer', x: 110, pose: 'point' }, { id: 'musa', x: 310, mood: 'normal' }] }, lines: [
      { who: 'laerer', no: 'Klassen fungerer godt, og elevene trives sammen.', uk: 'Клас працює добре, і учням разом комфортно.', en: 'The class works well and the pupils get on together.' },
      { who: 'laerer', no: 'Vi jobber mest med lesing og samarbeid dette halvåret.', uk: 'Цього півріччя ми найбільше працюємо над читанням і співпрацею.', en: 'This term we mostly work on reading and cooperation.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'musa', x: 310, mood: 'surprised', pose: 'point' }, { id: 'laerer', x: 110, mood: 'normal' }], props: [{ type: 'phone', x: 215, y: 200 }] }, lines: [
      { who: 'musa', no: 'Jeg lurer på mobilreglene. Har elevene med seg telefon?', uk: 'Мене цікавлять правила щодо телефонів. Учні беруть їх із собою?', en: 'I am wondering about the phone rules. Do the pupils bring phones?' },
      { who: 'laerer', no: 'Telefonene ligger i en boks i skoletiden. Det fungerer fint.', uk: 'Телефони лежать у коробці під час уроків. Це добре працює.', en: 'The phones stay in a box during school hours. It works well.' }
    ]},
    { art: { bg: 'school', board: 'tur 12. mai', chars: [{ id: 'laerer', x: 110, mood: 'happy' }, { id: 'musa', x: 310, mood: 'happy' }], props: [{ type: 'backpack', x: 215, y: 250 }] }, lines: [
      { who: 'laerer', no: 'I mai drar klassen på tur. Vi trenger to voksne som blir med.', uk: 'У травні клас їде на екскурсію. Потрібні двоє дорослих супроводжуючих.', en: 'In May the class goes on a trip. We need two adults to come along.' },
      { who: 'musa', no: 'Jeg kan bli med hvis det er på en fredag.', uk: 'Я можу поїхати, якщо це в п’ятницю.', en: 'I can come if it is on a Friday.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'laerer', x: 110, pose: 'hold' }, { id: 'musa', x: 310, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'laerer', no: 'Flott. Dere får et skriv med tider og pakkeliste.', uk: 'Чудово. Ви отримаєте лист із часом і списком речей.', en: 'Great. You will get a letter with times and a packing list.' },
      { who: 'musa', no: 'Hvordan gir jeg beskjed hvis sønnen min blir syk?', uk: 'Як повідомити, якщо мій син захворіє?', en: 'How do I let you know if my son is ill?' },
      { who: 'laerer', no: 'Meld fra i skoleappen før klokka åtte.', uk: 'Повідомте через шкільний застосунок до восьмої.', en: 'Report it in the school app before eight o’clock.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'musa', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Takk for at dere kom. Ta kontakt når som helst.', uk: 'Дякую, що прийшли. Звертайтеся будь-коли.', en: 'Thank you for coming. Get in touch any time.' },
      { who: 'musa', no: 'Nå føler jeg meg mye tryggere. Takk!', uk: 'Тепер я почуваюся значно впевненіше. Дякую!', en: 'Now I feel much more confident. Thanks!' }
    ]}
  ],

  vocab: [
    ['et foreldremøte', 'батьківські збори', 'a parents’ meeting'],
    ['å trives', 'почуватися добре', 'to feel comfortable'],
    ['et samarbeid', 'співпраця', 'cooperation'],
    ['et halvår', 'півріччя', 'a term, half-year'],
    ['mobilregler', 'правила щодо телефонів', 'phone rules'],
    ['ei skoletid', 'навчальний час', 'school hours'],
    ['å bli med', 'приєднатися', 'to come along'],
    ['et skriv', 'інформаційний лист', 'a written notice'],
    ['ei pakkeliste', 'список речей', 'a packing list'],
    ['å gi beskjed', 'повідомити', 'to let someone know'],
    ['å melde fra', 'офіційно повідомити', 'to report'],
    ['trygg', 'упевнений, безпечний', 'safe, confident'],
    ['når som helst', 'будь-коли', 'any time'],
    ['å lure på', 'цікавитися, питати себе', 'to wonder']
  ],

  words: {
    no: { 'foreldremøte': 'батьківські збори', 'hyggelig': 'приємно', 'mange': 'багато', 'kunne': 'змогли', 'komme': 'прийти', 'gang': 'раз', 'klassen': 'клас', 'fungerer': 'працює', 'elevene': 'учні', 'trives': 'почуваються добре', 'sammen': 'разом', 'jobber': 'працюємо', 'mest': 'найбільше', 'lesing': 'читання', 'samarbeid': 'співпраця', 'halvåret': 'півріччя', 'lurer': 'цікавлюся (lure på)', 'mobilreglene': 'правила щодо телефонів', 'telefon': 'телефон', 'telefonene': 'телефони', 'ligger': 'лежать', 'boks': 'коробка', 'skoletiden': 'навчальний час', 'fint': 'добре', 'mai': 'травень', 'drar': 'їде', 'tur': 'поїздка', 'trenger': 'потрібні', 'voksne': 'дорослі', 'fredag': 'п’ятниця', 'flott': 'чудово', 'skriv': 'лист', 'tider': 'час, розклад', 'pakkeliste': 'список речей', 'beskjed': 'повідомлення (gi beskjed — повідомити)', 'sønnen': 'син', 'syk': 'хворий', 'meld': 'повідом', 'skoleappen': 'шкільний застосунок', 'åtte': 'восьма', 'helst': 'будь-що (når som helst — будь-коли)', 'føler': 'почуваюся', 'tryggere': 'упевненіше' },
    en: { 'foreldremøte': 'parents’ meeting', 'hyggelig': 'nice', 'mange': 'many', 'kunne': 'could', 'komme': 'to come', 'gang': 'time', 'klassen': 'the class', 'fungerer': 'works', 'elevene': 'the pupils', 'trives': 'feel comfortable', 'sammen': 'together', 'jobber': 'work', 'mest': 'mostly', 'lesing': 'reading', 'samarbeid': 'cooperation', 'halvåret': 'the term', 'lurer': 'wonder', 'mobilreglene': 'the phone rules', 'telefon': 'phone', 'telefonene': 'the phones', 'ligger': 'lie, stay', 'boks': 'box', 'skoletiden': 'school hours', 'fint': 'fine', 'mai': 'May', 'drar': 'goes', 'tur': 'trip', 'trenger': 'need', 'voksne': 'adults', 'fredag': 'Friday', 'flott': 'great', 'skriv': 'written notice', 'tider': 'times', 'pakkeliste': 'packing list', 'beskjed': 'message (gi beskjed — to let know)', 'sønnen': 'the son', 'syk': 'ill', 'meld': 'report', 'skoleappen': 'the school app', 'åtte': 'eight', 'helst': 'preferably (når som helst — any time)', 'føler': 'feel', 'tryggere': 'more confident' }
  }
});
