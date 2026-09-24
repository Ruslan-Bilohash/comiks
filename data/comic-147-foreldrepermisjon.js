window.COMICS = window.COMICS || [];

/* p147 — B2: батьківська відпустка. Квоти, розподіл тижнів, 80 чи 100 відсотків. */
COMICS.push({
  id: 'p147',
  level: 'B2',
  category: 'familie',
  title: 'Foreldrepermisjon',
  titleUk: 'Батьківська відпустка',
  titleEn: 'Parental leave',
  summaryUk: 'Муса й Марія чекають на дитину й планують відпустку: батьківська квота, спільний період і вибір між 80 та 100 відсотками виплати.',
  summaryEn: 'Musa and Maria are expecting a baby and plan the leave: the father’s quota, the shared period and the choice between 80 and 100 per cent pay.',
  summaryNo: 'Musa og Maria venter barn og planlegger permisjonen: fedrekvote, fellesperiode og valget mellom 80 og 100 prosent.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, mood: 'happy' }, { id: 'musa', x: 310, mood: 'happy' }], props: [{ type: 'sofa', x: 100 }, { type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'maria', no: 'Vi må søke om foreldrepenger før permisjonen starter.', uk: 'Треба подати на батьківські виплати до початку відпустки.', en: 'We have to apply for parental benefit before the leave starts.' },
      { who: 'musa', no: 'Hvor lenge kan vi være hjemme til sammen?', uk: 'Скільки ми разом можемо бути вдома?', en: 'How long can we be at home in total?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, pose: 'point' }, { id: 'musa', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'maria', no: 'Førtini uker med full lønn, eller femtini uker med åtti prosent.', uk: 'Сорок дев’ять тижнів із повною виплатою або п’ятдесят дев’ять із вісімдесятьма відсотками.', en: 'Forty-nine weeks at full pay, or fifty-nine weeks at eighty per cent.' },
      { who: 'musa', no: 'Totalbeløpet blir omtrent det samme, ikke sant?', uk: 'Загальна сума виходить приблизно та сама, правда?', en: 'The total amount is roughly the same, right?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'maria', x: 100, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'Ja, men lengre tid hjemme gir lavere månedsinntekt.', uk: 'Так, але довший час удома означає менший місячний дохід.', en: 'Yes, but a longer period at home means a lower monthly income.' },
      { who: 'musa', no: 'Da velger vi hundre prosent og kortere permisjon.', uk: 'Тоді обираємо сто відсотків і коротшу відпустку.', en: 'Then we choose a hundred per cent and shorter leave.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 100, mood: 'happy', pose: 'hold' }, { id: 'musa', x: 310, mood: 'happy' }] }, lines: [
      { who: 'musa', no: 'Hvor mange uker er forbeholdt meg?', uk: 'Скільки тижнів закріплено саме за мною?', en: 'How many weeks are reserved for me?' },
      { who: 'maria', no: 'Femten uker er fedrekvote. De kan ikke overføres til meg.', uk: 'П’ятнадцять тижнів — батьківська квота. Її не можна передати мені.', en: 'Fifteen weeks are the father’s quota. They cannot be transferred to me.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'morten', x: 100, mood: 'happy' }, { id: 'musa', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'musa', no: 'Jeg vil ta permisjon fra mars. Hvor lang varsel trenger dere?', uk: 'Хочу піти у відпустку з березня. Наскільки заздалегідь вас попередити?', en: 'I want to take leave from March. How much notice do you need?' },
      { who: 'morten', no: 'Minst tolv uker. Da rekker vi å finne en vikar.', uk: 'Щонайменше дванадцять тижнів. Тоді встигнемо знайти заміну.', en: 'At least twelve weeks. Then we have time to find a stand-in.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'musa', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 100, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Da er alt klart: søknaden er sendt, og jobben er varslet.', uk: 'Отже, усе готово: заяву подано, роботу попереджено.', en: 'So everything is ready: the application is sent and work has been notified.' },
      { who: 'musa', no: 'Nå gleder jeg meg bare til å være hjemme med barnet.', uk: 'Тепер я просто чекаю, коли буду вдома з дитиною.', en: 'Now I am just looking forward to being at home with the baby.' }
    ]}
  ],

  vocab: [
    ['ei foreldrepermisjon', 'батьківська відпустка', 'parental leave'],
    ['foreldrepenger', 'батьківські виплати', 'parental benefit'],
    ['ei fedrekvote', 'батьківська квота', 'the father’s quota'],
    ['ei fellesperiode', 'спільний період', 'the shared period'],
    ['ei lønn', 'зарплата', 'pay, salary'],
    ['et totalbeløp', 'загальна сума', 'the total amount'],
    ['ei månedsinntekt', 'місячний дохід', 'monthly income'],
    ['forbeholdt', 'закріплений за', 'reserved for'],
    ['å overføre', 'передавати', 'to transfer'],
    ['et varsel', 'попередження, строк', 'notice'],
    ['en vikar', 'заміна, тимчасовий працівник', 'a stand-in'],
    ['å varsle', 'попереджати', 'to notify'],
    ['ei søknad', 'заява', 'an application'],
    ['å glede seg til', 'чекати з нетерпінням', 'to look forward to']
  ],

  words: {
    no: { 'søke': 'подати', 'foreldrepenger': 'батьківські виплати', 'permisjonen': 'відпустка', 'permisjon': 'відпустка', 'starter': 'починається', 'lenge': 'довго', 'hjemme': 'удома', 'sammen': 'разом', 'førtini': 'сорок дев’ять', 'uker': 'тижні', 'full': 'повна', 'lønn': 'зарплата', 'femtini': 'п’ятдесят дев’ять', 'åtti': 'вісімдесят', 'prosent': 'відсотків', 'totalbeløpet': 'загальна сума', 'omtrent': 'приблизно', 'samme': 'та сама', 'sant': 'правда', 'lengre': 'довший', 'tid': 'час', 'lavere': 'менший', 'månedsinntekt': 'місячний дохід', 'velger': 'обираємо', 'hundre': 'сто', 'kortere': 'коротша', 'forbeholdt': 'закріплено за', 'femten': 'п’ятнадцять', 'fedrekvote': 'батьківська квота', 'overføres': 'передаватися', 'mars': 'березень', 'varsel': 'попередження', 'minst': 'щонайменше', 'tolv': 'дванадцять', 'rekker': 'встигаємо', 'finne': 'знайти', 'vikar': 'заміна', 'klart': 'готово', 'søknaden': 'заява', 'sendt': 'надіслано', 'jobben': 'робота', 'varslet': 'попереджено', 'gleder': 'чекаю з нетерпінням', 'barnet': 'дитина', 'venter': 'чекають', 'planlegger': 'планують', 'valget': 'вибір', 'mellom': 'між', 'fellesperiode': 'спільний період' },
    en: { 'søke': 'to apply', 'foreldrepenger': 'parental benefit', 'permisjonen': 'the leave', 'permisjon': 'leave', 'starter': 'starts', 'lenge': 'long', 'hjemme': 'at home', 'sammen': 'together', 'førtini': 'forty-nine', 'uker': 'weeks', 'full': 'full', 'lønn': 'pay', 'femtini': 'fifty-nine', 'åtti': 'eighty', 'prosent': 'per cent', 'totalbeløpet': 'the total amount', 'omtrent': 'about', 'samme': 'the same', 'sant': 'true', 'lengre': 'longer', 'tid': 'time', 'lavere': 'lower', 'månedsinntekt': 'monthly income', 'velger': 'choose', 'hundre': 'hundred', 'kortere': 'shorter', 'forbeholdt': 'reserved for', 'femten': 'fifteen', 'fedrekvote': 'father’s quota', 'overføres': 'be transferred', 'mars': 'March', 'varsel': 'notice', 'minst': 'at least', 'tolv': 'twelve', 'rekker': 'have time', 'finne': 'to find', 'vikar': 'stand-in', 'klart': 'ready', 'søknaden': 'the application', 'sendt': 'sent', 'jobben': 'work', 'varslet': 'notified', 'gleder': 'look forward', 'barnet': 'the baby', 'venter': 'are expecting', 'planlegger': 'plan', 'valget': 'the choice', 'mellom': 'between', 'fellesperiode': 'shared period' }
  }
});
