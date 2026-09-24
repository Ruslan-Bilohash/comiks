window.COMICS = window.COMICS || [];

/* p145 — B2: дискусія про віддалену роботу. Аргументи «за» і «проти», компроміс. */
COMICS.push({
  id: 'p145',
  level: 'B2',
  category: 'jobb',
  title: 'Hjemmekontor eller kontor?',
  titleUk: 'Вдома чи в офісі?',
  titleEn: 'Home office or office?',
  summaryUk: 'На нараді команда сперечається про віддалену роботу: продуктивність проти спільноти. Вони вчаться наводити аргументи й знаходять компроміс.',
  summaryEn: 'At a meeting the team argues about remote work: productivity versus community. They practise giving arguments and find a compromise.',
  summaryNo: 'På møtet diskuterer teamet hjemmekontor: produktivitet mot fellesskap. De øver på å argumentere og finner et kompromiss.',
  cover: 0,

  panels: [
    { art: { bg: 'office', board: 'Sak: hjemmekontor', chars: [{ id: 'laerer', x: 100, mood: 'happy', pose: 'point' }, { id: 'denys', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'laerer', no: 'Dagens sak er hvor mange dager vi skal ha hjemmekontor. Hva mener dere?', uk: 'Сьогоднішнє питання — скільки днів працювати вдома. Що думаєте?', en: 'Today’s item is how many days we should work from home. What do you think?' },
      { who: 'denys', no: 'Jeg får mye mer gjort hjemme. Ingen avbryter meg hvert kvarter.', uk: 'Удома я встигаю значно більше. Ніхто не перебиває мене щочверть години.', en: 'I get far more done at home. Nobody interrupts me every fifteen minutes.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, mood: 'surprised', pose: 'point' }, { id: 'denys', x: 310, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'På den andre siden mister vi de små samtalene som skaper tillit.', uk: 'З іншого боку, ми втрачаємо ті маленькі розмови, що створюють довіру.', en: 'On the other hand, we lose the small conversations that build trust.' },
      { who: 'denys', no: 'Det er et godt poeng, men vi kan løse det med faste fellesdager.', uk: 'Слушна думка, але це можна вирішити спільними днями в офісі.', en: 'That is a fair point, but we can solve it with fixed days together.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal' }, { id: 'maria', x: 310, mood: 'normal' }] }, lines: [
      { who: 'kari', no: 'Nyansatte trenger dessuten noen å spørre. Det er vanskeligere over skjerm.', uk: 'До того ж новим працівникам потрібен хтось, у кого спитати. Через екран це складніше.', en: 'New employees also need someone to ask. That is harder over a screen.' },
      { who: 'maria', no: 'Enig. Kanskje de bør være mer på kontoret de første månedene.', uk: 'Згодна. Можливо, їм варто перші місяці частіше бути в офісі.', en: 'Agreed. Perhaps they should be in the office more during the first months.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'laerer', x: 100, pose: 'hold' }, { id: 'denys', x: 310, mood: 'happy' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'laerer', no: 'La oss oppsummere: to faste dager sammen, resten velger man selv.', uk: 'Підсумуймо: два фіксовані дні разом, решту кожен обирає сам.', en: 'Let us sum up: two fixed days together, the rest is up to each person.' },
      { who: 'denys', no: 'Det virker som et rimelig kompromiss.', uk: 'Здається, це розумний компроміс.', en: 'That seems like a reasonable compromise.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 310, mood: 'normal' }, { id: 'laerer', x: 100, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'Kan vi evaluere ordningen om tre måneder?', uk: 'Чи можемо переглянути цей порядок за три місяці?', en: 'Can we evaluate the arrangement in three months?' },
      { who: 'laerer', no: 'Ja, da måler vi både resultater og trivsel før vi bestemmer noe permanent.', uk: 'Так, тоді ми виміряємо і результати, і задоволення, перш ніж щось закріплювати.', en: 'Yes, then we will measure both results and wellbeing before we decide anything permanent.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'laerer', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Takk for en saklig diskusjon. Alle fikk sagt det de mente.', uk: 'Дякую за предметну дискусію. Кожен зміг висловитися.', en: 'Thank you for a factual discussion. Everyone got to say what they thought.' },
      { who: 'denys', no: 'Og vi ble enige uten å krangle. Det er sjelden på møter!', uk: 'І ми домовилися без сварки. Рідкість на нарадах!', en: 'And we agreed without arguing. That is rare at meetings!' }
    ]}
  ],

  vocab: [
    ['et hjemmekontor', 'робота вдома', 'a home office'],
    ['ei produktivitet', 'продуктивність', 'productivity'],
    ['et fellesskap', 'спільнота', 'a community'],
    ['å avbryte', 'перебивати', 'to interrupt'],
    ['et kvarter', 'чверть години', 'a quarter of an hour'],
    ['på den andre siden', 'з іншого боку', 'on the other hand'],
    ['ei tillit', 'довіра', 'trust'],
    ['nyansatt', 'новий працівник', 'a new employee'],
    ['å oppsummere', 'підсумувати', 'to sum up'],
    ['rimelig', 'розумний, прийнятний', 'reasonable'],
    ['et kompromiss', 'компроміс', 'a compromise'],
    ['å evaluere', 'оцінювати, переглядати', 'to evaluate'],
    ['ei ordning', 'порядок, схема', 'an arrangement'],
    ['ei trivsel', 'задоволення, комфорт', 'wellbeing'],
    ['permanent', 'постійний', 'permanent'],
    ['saklig', 'предметний, по суті', 'factual, to the point']
  ],

  words: {
    no: { 'dagens': 'сьогоднішнє', 'sak': 'питання', 'dager': 'дні', 'hjemmekontor': 'робота вдома', 'mener': 'думаєте', 'gjort': 'зроблено (få gjort — встигнути)', 'hjemme': 'удома', 'avbryter': 'перебиває', 'hvert': 'кожні', 'kvarter': 'чверть години', 'andre': 'інший', 'siden': 'бік (på den andre siden — з іншого боку)', 'mister': 'втрачаємо', 'små': 'маленькі', 'samtalene': 'розмови', 'skaper': 'створюють', 'tillit': 'довіра', 'poeng': 'думка, зауваження', 'løse': 'вирішити', 'faste': 'фіксовані', 'fellesdager': 'спільні дні', 'nyansatte': 'нові працівники', 'dessuten': 'до того ж', 'spørre': 'спитати', 'vanskeligere': 'складніше', 'skjerm': 'екран', 'enig': 'згодна', 'kanskje': 'можливо', 'bør': 'варто', 'kontoret': 'офіс', 'første': 'перші', 'månedene': 'місяці', 'oppsummere': 'підсумувати', 'resten': 'решта', 'velger': 'обирає', 'virker': 'здається', 'rimelig': 'розумний', 'kompromiss': 'компроміс', 'evaluere': 'переглянути', 'ordningen': 'порядок', 'måler': 'вимірюємо', 'resultater': 'результати', 'trivsel': 'задоволення', 'bestemmer': 'вирішуємо', 'permanent': 'постійне', 'saklig': 'предметна', 'diskusjon': 'дискусія', 'sagt': 'сказати', 'mente': 'думав', 'enige': 'згодні', 'krangle': 'сваритися', 'sjelden': 'рідко', 'møter': 'наради', 'møtet': 'нарада', 'teamet': 'команда', 'diskuterer': 'обговорює', 'produktivitet': 'продуктивність', 'fellesskap': 'спільнота', 'argumentere': 'аргументувати', 'finner': 'знаходять' },
    en: { 'dagens': 'today’s', 'sak': 'item', 'dager': 'days', 'hjemmekontor': 'home office', 'mener': 'think', 'gjort': 'done (få gjort — to get done)', 'hjemme': 'at home', 'avbryter': 'interrupts', 'hvert': 'every', 'kvarter': 'quarter of an hour', 'andre': 'other', 'siden': 'side (på den andre siden — on the other hand)', 'mister': 'lose', 'små': 'small', 'samtalene': 'the conversations', 'skaper': 'create', 'tillit': 'trust', 'poeng': 'point', 'løse': 'to solve', 'faste': 'fixed', 'fellesdager': 'shared days', 'nyansatte': 'new employees', 'dessuten': 'besides', 'spørre': 'to ask', 'vanskeligere': 'harder', 'skjerm': 'screen', 'enig': 'agreed', 'kanskje': 'perhaps', 'bør': 'should', 'kontoret': 'the office', 'første': 'first', 'månedene': 'the months', 'oppsummere': 'to sum up', 'resten': 'the rest', 'velger': 'chooses', 'virker': 'seems', 'rimelig': 'reasonable', 'kompromiss': 'compromise', 'evaluere': 'to evaluate', 'ordningen': 'the arrangement', 'måler': 'measure', 'resultater': 'results', 'trivsel': 'wellbeing', 'bestemmer': 'decide', 'permanent': 'permanent', 'saklig': 'factual', 'diskusjon': 'discussion', 'sagt': 'said', 'mente': 'thought', 'enige': 'in agreement', 'krangle': 'to argue', 'sjelden': 'rarely', 'møter': 'meetings', 'møtet': 'the meeting', 'teamet': 'the team', 'diskuterer': 'discusses', 'produktivitet': 'productivity', 'fellesskap': 'community', 'argumentere': 'to argue', 'finner': 'find' }
  }
});
