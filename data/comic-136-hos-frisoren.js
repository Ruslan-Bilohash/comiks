window.COMICS = window.COMICS || [];

/* p136 — B1: у перукарні. Записатися, описати бажану стрижку, чайові й наступний запис. */
COMICS.push({
  id: 'p136',
  level: 'B1',
  category: 'hverdag',
  title: 'Hos frisøren',
  titleUk: 'У перукарні',
  titleEn: 'At the hairdresser',
  summaryUk: 'Нора записується на стрижку. Вона вчиться описувати, чого хоче, питає ціну й дізнається, що чайові в Норвегії не обов’язкові.',
  summaryEn: 'Nora books a haircut. She learns how to describe what she wants, asks about the price and finds out that tips are not expected in Norway.',
  summaryNo: 'Nora bestiller time hos frisøren. Hun lærer å forklare hva hun vil ha, spør om prisen og får vite at tips ikke er vanlig i Norge.',
  cover: 0,

  panels: [
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'happy' }, { id: 'alina', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'nora', no: 'Hei! Har dere en ledig time i dag?', uk: 'Вітаю! Є вільний час сьогодні?', en: 'Hi! Do you have a free slot today?' },
      { who: 'alina', no: 'Vi har en avbestilling klokka to. Passer det?', uk: 'Є скасований запис о другій. Вам підходить?', en: 'We have a cancellation at two. Does that suit you?' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'alina', x: 100, pose: 'point' }, { id: 'nora', x: 310, mood: 'normal' }] }, lines: [
      { who: 'alina', no: 'Hva slags klipp tenker du på?', uk: 'Яку стрижку ви хочете?', en: 'What kind of cut are you thinking of?' },
      { who: 'nora', no: 'Bare litt kortere, omtrent tre centimeter, og litt lag.', uk: 'Трохи коротше, приблизно три сантиметри, і трохи каскаду.', en: 'Just a bit shorter, about three centimetres, and some layers.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'surprised' }, { id: 'alina', x: 100, mood: 'normal' }] }, lines: [
      { who: 'alina', no: 'Vil du ha lugg?', uk: 'Чілку робимо?', en: 'Would you like a fringe?' },
      { who: 'nora', no: 'Nei takk, jeg lar det være. Men gjerne litt farge senere.', uk: 'Ні, дякую, залишу як є. Але згодом можна трохи фарби.', en: 'No thanks, I will leave it. But maybe some colour later.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'alina', x: 100, mood: 'happy' }, { id: 'nora', x: 310, mood: 'happy' }], props: [{ type: 'counter', x: 100 }, { type: 'coins', x: 220, y: 200 }] }, lines: [
      { who: 'nora', no: 'Hva koster klipp og vask?', uk: 'Скільки коштує стрижка з миттям?', en: 'How much are a cut and a wash?' },
      { who: 'alina', no: 'Sekshundre kroner. Farge kommer i tillegg.', uk: 'Шістсот крон. Фарбування — окремо.', en: 'Six hundred kroner. Colour comes on top.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 310, mood: 'normal' }, { id: 'alina', x: 100, mood: 'normal' }], props: [{ type: 'phone', x: 220, y: 195 }] }, lines: [
      { who: 'nora', no: 'Skal jeg gi tips?', uk: 'Чайові давати?', en: 'Should I leave a tip?' },
      { who: 'alina', no: 'Det er ikke vanlig her. Prisen er som den er.', uk: 'Тут це не заведено. Ціна така, як є.', en: 'It is not usual here. The price is the price.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'nora', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'alina', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'alina', no: 'Ferdig! Vil du bestille ny time om tre måneder?', uk: 'Готово! Записати вас за три місяці?', en: 'All done! Would you like to book again in three months?' },
      { who: 'nora', no: 'Ja takk, samme dag og tid hvis det går.', uk: 'Так, дякую, той самий день і час, якщо можна.', en: 'Yes please, the same day and time if possible.' }
    ]}
  ],

  vocab: [
    ['en frisør', 'перукар', 'a hairdresser'],
    ['ei ledig time', 'вільний запис', 'a free appointment'],
    ['ei avbestilling', 'скасування', 'a cancellation'],
    ['et klipp', 'стрижка', 'a haircut'],
    ['kortere', 'коротше', 'shorter'],
    ['et lag', 'шар, каскад', 'a layer'],
    ['ei lugg', 'чілка', 'a fringe'],
    ['ei farge', 'фарба, колір', 'colour'],
    ['ei vask', 'миття', 'a wash'],
    ['i tillegg', 'додатково', 'on top'],
    ['tips', 'чайові', 'a tip'],
    ['vanlig', 'звичний, заведений', 'usual'],
    ['å bestille time', 'записатися', 'to book an appointment'],
    ['senere', 'пізніше', 'later']
  ],

  words: {
    no: { 'frisøren': 'перукарка', 'ledig': 'вільний', 'time': 'запис, година', 'avbestilling': 'скасування', 'klokka': 'о (годині)', 'passer': 'підходить', 'slags': 'який (hva slags — який саме)', 'klipp': 'стрижка', 'tenker': 'думаєте', 'kortere': 'коротше', 'omtrent': 'приблизно', 'centimeter': 'сантиметри', 'lag': 'шари, каскад', 'lugg': 'чілка', 'lar': 'залишу (la være)', 'gjerne': 'охоче', 'farge': 'фарба', 'senere': 'пізніше', 'koster': 'коштує', 'vask': 'миття', 'sekshundre': 'шістсот', 'kroner': 'крони', 'tillegg': 'додатково', 'tips': 'чайові', 'vanlig': 'заведено', 'prisen': 'ціна', 'ferdig': 'готово', 'bestille': 'записати', 'måneder': 'місяці', 'samme': 'той самий', 'dag': 'день', 'tid': 'час', 'går': 'вийде (hvis det går — якщо можна)', 'bestiller': 'записується' },
    en: { 'frisøren': 'the hairdresser', 'ledig': 'free', 'time': 'appointment, hour', 'avbestilling': 'cancellation', 'klokka': 'at (o’clock)', 'passer': 'suits', 'slags': 'kind (hva slags — what kind)', 'klipp': 'haircut', 'tenker': 'are thinking', 'kortere': 'shorter', 'omtrent': 'about', 'centimeter': 'centimetres', 'lag': 'layers', 'lugg': 'fringe', 'lar': 'let (la være — leave it)', 'gjerne': 'gladly', 'farge': 'colour', 'senere': 'later', 'koster': 'costs', 'vask': 'wash', 'sekshundre': 'six hundred', 'kroner': 'kroner', 'tillegg': 'in addition', 'tips': 'tip', 'vanlig': 'usual', 'prisen': 'the price', 'ferdig': 'done', 'bestille': 'to book', 'måneder': 'months', 'samme': 'same', 'dag': 'day', 'tid': 'time', 'går': 'works (hvis det går — if possible)', 'bestiller': 'books' }
  }
});
