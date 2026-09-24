window.COMICS = window.COMICS || [];

/* p153 — B2: права орендаря. Підвищення плати, ремонт, доступ орендодавця, Husleietvistutvalget. */
COMICS.push({
  id: 'p153',
  level: 'B2',
  category: 'bolig',
  title: 'Rettigheter som leietaker',
  titleUk: 'Права орендаря',
  titleEn: 'Your rights as a tenant',
  summaryUk: 'Орендодавець хоче підняти плату й заходити без попередження. Юристка пояснює, що закон дозволяє, а що ні, і куди скаржитися.',
  summaryEn: 'The landlord wants to raise the rent and enter without notice. A legal adviser explains what the law allows and where to complain.',
  summaryNo: 'Utleieren vil øke husleia og komme inn uten varsel. En jurist forklarer hva loven tillater, og hvor man kan klage.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'sad', pose: 'hold' }, { id: 'maria', x: 100, mood: 'happy' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'ruslan', no: 'Utleieren varslet at husleia øker med femten prosent fra neste måned.', uk: 'Орендодавець повідомив, що плата зросте на п’ятнадцять відсотків уже з наступного місяця.', en: 'The landlord announced that the rent will rise fifteen per cent from next month.' },
      { who: 'maria', no: 'Det høres ikke lovlig ut. Hva sier kontrakten din?', uk: 'Це не схоже на законне. Що написано у вашому договорі?', en: 'That does not sound lawful. What does your contract say?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, pose: 'point' }, { id: 'ruslan', x: 310, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'Husleia kan som hovedregel bare justeres etter konsumprisindeksen én gang i året.', uk: 'Як правило, орендну плату можна коригувати лише за індексом цін раз на рік.', en: 'As a general rule the rent can only be adjusted by the consumer price index once a year.' },
      { who: 'ruslan', no: 'Og han må varsle på forhånd?', uk: 'І він має попередити заздалегідь?', en: 'And he has to give notice in advance?' },
      { who: 'maria', no: 'Ja, skriftlig og minst én måned før.', uk: 'Так, письмово й щонайменше за місяць.', en: 'Yes, in writing and at least one month before.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'surprised' }, { id: 'maria', x: 100, mood: 'normal' }] }, lines: [
      { who: 'ruslan', no: 'Han kommer også innom uten å si fra, for å «sjekke leiligheten».', uk: 'Він ще й заходить без попередження, щоб «перевірити квартиру».', en: 'He also drops in without telling me, to “check the flat”.' },
      { who: 'maria', no: 'Det har han ikke lov til. Boligen er ditt hjem mens du leier den.', uk: 'Цього він не має права робити. Поки ви орендуєте, житло — ваш дім.', en: 'He is not allowed to. The home is yours while you rent it.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, mood: 'normal', pose: 'hold' }, { id: 'ruslan', x: 310, mood: 'normal' }] }, lines: [
      { who: 'ruslan', no: 'Kjøleskapet har vært ødelagt i tre uker. Hvem betaler?', uk: 'Холодильник зламаний уже три тижні. Хто платить?', en: 'The fridge has been broken for three weeks. Who pays?' },
      { who: 'maria', no: 'Utleier har vedlikeholdsplikt. Du kan kreve utbedring eller avslag i leia.', uk: 'Орендодавець зобов’язаний утримувати житло. Можете вимагати ремонту або зниження плати.', en: 'The landlord has a duty to maintain. You can demand repair or a reduction in rent.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'normal' }, { id: 'maria', x: 100, mood: 'normal' }] }, lines: [
      { who: 'ruslan', no: 'Hva om han ikke gjør noe?', uk: 'А якщо він нічого не зробить?', en: 'What if he does nothing?' },
      { who: 'maria', no: 'Da sender du et skriftlig krav med frist, og klager til Husleietvistutvalget etterpå.', uk: 'Тоді надсилаєте письмову вимогу зі строком, а потім скаржитеся до комісії з орендних спорів.', en: 'Then you send a written demand with a deadline and complain to the rent disputes tribunal afterwards.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Skriv alltid på e-post, så har du dokumentasjon.', uk: 'Завжди пишіть на пошту — тоді у вас є докази.', en: 'Always write by email, then you have documentation.' },
      { who: 'ruslan', no: 'Takk. Nå vet jeg både hva jeg kan kreve og hvordan.', uk: 'Дякую. Тепер я знаю і що можу вимагати, і як.', en: 'Thank you. Now I know both what I can demand and how.' }
    ]}
  ],

  vocab: [
    ['en leietaker', 'орендар', 'a tenant'],
    ['en utleier', 'орендодавець', 'a landlord'],
    ['ei husleie', 'орендна плата', 'the rent'],
    ['å justere', 'коригувати', 'to adjust'],
    ['ei konsumprisindeks', 'індекс споживчих цін', 'the consumer price index'],
    ['som hovedregel', 'як правило', 'as a general rule'],
    ['å varsle', 'попереджати', 'to give notice'],
    ['på forhånd', 'заздалегідь', 'in advance'],
    ['lovlig', 'законний', 'lawful'],
    ['ei vedlikeholdsplikt', 'обов’язок утримувати житло', 'a duty to maintain'],
    ['ei utbedring', 'усунення недоліків', 'a repair'],
    ['et avslag i leia', 'зниження орендної плати', 'a rent reduction'],
    ['et krav', 'вимога', 'a demand'],
    ['ei frist', 'строк', 'a deadline'],
    ['å klage', 'скаржитися', 'to complain'],
    ['ei dokumentasjon', 'документальні докази', 'documentation']
  ],

  words: {
    no: { 'utleieren': 'орендодавець', 'utleier': 'орендодавець', 'varslet': 'повідомив', 'husleia': 'орендна плата', 'øker': 'зростає', 'femten': 'п’ятнадцять', 'prosent': 'відсотків', 'neste': 'наступний', 'måned': 'місяць', 'høres': 'звучить', 'lovlig': 'законно', 'kontrakten': 'договір', 'hovedregel': 'загальне правило', 'justeres': 'коригуватися', 'konsumprisindeksen': 'індекс споживчих цін', 'gang': 'раз', 'året': 'рік', 'varsle': 'попередити', 'forhånd': 'заздалегідь (på forhånd)', 'skriftlig': 'письмово', 'minst': 'щонайменше', 'innom': 'заходить (komme innom)', 'sjekke': 'перевірити', 'leiligheten': 'квартира', 'lov': 'право (ha lov til — мати право)', 'boligen': 'житло', 'hjem': 'дім', 'leier': 'орендуєш', 'kjøleskapet': 'холодильник', 'ødelagt': 'зламаний', 'uker': 'тижні', 'betaler': 'платить', 'vedlikeholdsplikt': 'обов’язок утримувати', 'kreve': 'вимагати', 'utbedring': 'усунення недоліків', 'avslag': 'зниження', 'leia': 'орендна плата', 'sender': 'надсилаєте', 'krav': 'вимога', 'frist': 'строк', 'klager': 'скаржитеся', 'husleietvistutvalget': 'комісія з орендних спорів', 'etterpå': 'після цього', 'alltid': 'завжди', 'e-post': 'електронна пошта', 'dokumentasjon': 'докази', 'jurist': 'юристка', 'loven': 'закон', 'tillater': 'дозволяє' },
    en: { 'utleieren': 'the landlord', 'utleier': 'landlord', 'varslet': 'announced', 'husleia': 'the rent', 'øker': 'rises', 'femten': 'fifteen', 'prosent': 'per cent', 'neste': 'next', 'måned': 'month', 'høres': 'sounds', 'lovlig': 'lawful', 'kontrakten': 'the contract', 'hovedregel': 'general rule', 'justeres': 'be adjusted', 'konsumprisindeksen': 'the consumer price index', 'gang': 'time', 'året': 'the year', 'varsle': 'to give notice', 'forhånd': 'advance (på forhånd)', 'skriftlig': 'in writing', 'minst': 'at least', 'innom': 'drops in (komme innom)', 'sjekke': 'to check', 'leiligheten': 'the flat', 'lov': 'permission (ha lov til)', 'boligen': 'the home', 'hjem': 'home', 'leier': 'rent', 'kjøleskapet': 'the fridge', 'ødelagt': 'broken', 'uker': 'weeks', 'betaler': 'pays', 'vedlikeholdsplikt': 'duty to maintain', 'kreve': 'to demand', 'utbedring': 'repair', 'avslag': 'reduction', 'leia': 'the rent', 'sender': 'send', 'krav': 'demand', 'frist': 'deadline', 'klager': 'complain', 'husleietvistutvalget': 'the rent disputes tribunal', 'etterpå': 'afterwards', 'alltid': 'always', 'e-post': 'email', 'dokumentasjon': 'documentation', 'jurist': 'legal adviser', 'loven': 'the law', 'tillater': 'allows' }
  }
});
