window.COMICS = window.COMICS || [];

/* p148 — B2: шкільні дебати про клімат. Теза, аргумент, контраргумент, висновок. */
COMICS.push({
  id: 'p148',
  level: 'B2',
  category: 'skole',
  title: 'Klimadebatt på skolen',
  titleUk: 'Кліматичні дебати в школі',
  titleEn: 'A climate debate at school',
  summaryUk: 'Клас сперечається, чи має школа заборонити м’ясо в їдальні. Учні вчаться будувати аргумент: теза, доказ, контраргумент і висновок.',
  summaryEn: 'The class debates whether the school canteen should drop meat. The pupils learn to build an argument: claim, evidence, counter-argument and conclusion.',
  summaryNo: 'Klassen debatterer om kantina bør kutte kjøtt. Elevene lærer å bygge et argument: påstand, belegg, motargument og konklusjon.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'Debatt: kjøttfri kantine?', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'nora', x: 310, mood: 'normal' }] }, lines: [
      { who: 'laerer', no: 'Dagens påstand: kantina bør servere vegetarmat tre dager i uka.', uk: 'Сьогоднішня теза: їдальня має подавати вегетаріанську їжу тричі на тиждень.', en: 'Today’s claim: the canteen should serve vegetarian food three days a week.' },
      { who: 'nora', no: 'Jeg er for, og jeg har tall som støtter det.', uk: 'Я за, і в мене є цифри на підтримку.', en: 'I am in favour, and I have figures to back it up.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'nora', x: 310, pose: 'point' }, { id: 'leo', x: 110, mood: 'surprised' }] }, lines: [
      { who: 'nora', no: 'Kjøttproduksjon står for en stor del av klimagassutslippene.', uk: 'Виробництво м’яса дає значну частку викидів парникових газів.', en: 'Meat production accounts for a large share of greenhouse gas emissions.' },
      { who: 'leo', no: 'Men mange elever spiser lite protein fra før. Hva med dem?', uk: 'Але багато учнів і так їдять мало білка. Що з ними?', en: 'But many pupils already eat little protein. What about them?' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'nora', x: 310, mood: 'normal' }, { id: 'leo', x: 110, mood: 'normal' }] }, lines: [
      { who: 'nora', no: 'Et godt motargument. Bønner, linser og egg dekker behovet like godt.', uk: 'Слушний контраргумент. Квасоля, сочевиця і яйця покривають потребу не гірше.', en: 'A good counter-argument. Beans, lentils and eggs cover the need just as well.' },
      { who: 'leo', no: 'Da er jeg villig til å prøve, hvis maten smaker godt.', uk: 'Тоді я готовий спробувати, якщо їжа смачна.', en: 'Then I am willing to try, if the food tastes good.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'laerer', x: 110, mood: 'normal' }, { id: 'nora', x: 310, mood: 'normal' }] }, lines: [
      { who: 'laerer', no: 'Husk å skille mellom fakta og meninger når dere argumenterer.', uk: 'Не забувайте розрізняти факти й думки, коли аргументуєте.', en: 'Remember to distinguish between facts and opinions when you argue.' },
      { who: 'nora', no: 'Tallene er fakta, men «det smaker bedre» er en mening.', uk: 'Цифри — це факти, а «смакує краще» — думка.', en: 'The figures are facts, but “it tastes better” is an opinion.' }
    ]},
    { art: { bg: 'school', board: 'konklusjon', chars: [{ id: 'leo', x: 110, mood: 'happy' }, { id: 'nora', x: 310, mood: 'happy' }] }, lines: [
      { who: 'leo', no: 'Kan vi foreslå to dager først og evaluere til jul?', uk: 'Може, спершу запропонуємо два дні й переглянемо до Різдва?', en: 'Could we propose two days first and evaluate by Christmas?' },
      { who: 'nora', no: 'Det er et fornuftig kompromiss. Jeg skriver det i innlegget vårt.', uk: 'Це розумний компроміс. Я впишу це в наш виступ.', en: 'That is a sensible compromise. I will put it in our statement.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'nora', x: 310, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Dere lyttet til hverandre og endret standpunkt underveis. Det er god debatt.', uk: 'Ви слухали одне одного й змінювали позицію по ходу. Це і є гарна дискусія.', en: 'You listened to each other and changed your position along the way. That is a good debate.' },
      { who: 'nora', no: 'Jeg trodde debatt betydde å vinne. Nå ser jeg det annerledes.', uk: 'Я думала, що дебати — це перемогти. Тепер бачу інакше.', en: 'I thought a debate meant winning. Now I see it differently.' }
    ]}
  ],

  vocab: [
    ['en debatt', 'дискусія, дебати', 'a debate'],
    ['ei påstand', 'теза, твердження', 'a claim'],
    ['et belegg', 'доказ', 'evidence'],
    ['et motargument', 'контраргумент', 'a counter-argument'],
    ['ei konklusjon', 'висновок', 'a conclusion'],
    ['ei kjøttproduksjon', 'виробництво м’яса', 'meat production'],
    ['et klimagassutslipp', 'викиди парникових газів', 'greenhouse gas emissions'],
    ['et protein', 'білок', 'protein'],
    ['ei bønne', 'квасоля', 'a bean'],
    ['ei linse', 'сочевиця', 'a lentil'],
    ['et behov', 'потреба', 'a need'],
    ['villig', 'готовий, охочий', 'willing'],
    ['å skille mellom', 'розрізняти', 'to distinguish between'],
    ['fornuftig', 'розумний', 'sensible'],
    ['et standpunkt', 'позиція', 'a standpoint'],
    ['et innlegg', 'виступ, допис', 'a statement, a post']
  ],

  words: {
    no: { 'dagens': 'сьогоднішня', 'påstand': 'теза', 'kantina': 'їдальня', 'bør': 'має', 'servere': 'подавати', 'vegetarmat': 'вегетаріанська їжа', 'dager': 'дні', 'uka': 'тиждень', 'tall': 'цифри', 'tallene': 'цифри', 'støtter': 'підтримують', 'kjøttproduksjon': 'виробництво м’яса', 'står': 'відповідає за (stå for)', 'stor': 'велика', 'del': 'частка', 'klimagassutslippene': 'викиди парникових газів', 'elever': 'учні', 'spiser': 'їдять', 'lite': 'мало', 'protein': 'білок', 'motargument': 'контраргумент', 'bønner': 'квасоля', 'linser': 'сочевиця', 'egg': 'яйця', 'dekker': 'покривають', 'behovet': 'потреба', 'villig': 'готовий', 'prøve': 'спробувати', 'maten': 'їжа', 'smaker': 'смакує', 'husk': 'пам’ятайте', 'skille': 'розрізняти', 'mellom': 'між', 'fakta': 'факти', 'meninger': 'думки', 'argumenterer': 'аргументуєте', 'mening': 'думка', 'foreslå': 'запропонувати', 'evaluere': 'переглянути', 'jul': 'Різдво', 'fornuftig': 'розумний', 'kompromiss': 'компроміс', 'innlegget': 'виступ', 'lyttet': 'слухали', 'hverandre': 'одне одного', 'endret': 'змінювали', 'standpunkt': 'позицію', 'underveis': 'по ходу', 'debatt': 'дискусія', 'trodde': 'думала', 'betydde': 'означало', 'vinne': 'перемогти', 'annerledes': 'інакше', 'klassen': 'клас', 'debatterer': 'дискутує', 'kutte': 'відмовитися від', 'kjøtt': 'м’ясо', 'elevene': 'учні', 'bygge': 'будувати', 'argument': 'аргумент', 'belegg': 'доказ', 'konklusjon': 'висновок' },
    en: { 'dagens': 'today’s', 'påstand': 'claim', 'kantina': 'the canteen', 'bør': 'should', 'servere': 'to serve', 'vegetarmat': 'vegetarian food', 'dager': 'days', 'uka': 'the week', 'tall': 'figures', 'tallene': 'the figures', 'støtter': 'support', 'kjøttproduksjon': 'meat production', 'står': 'accounts (stå for)', 'stor': 'large', 'del': 'share', 'klimagassutslippene': 'the greenhouse gas emissions', 'elever': 'pupils', 'spiser': 'eat', 'lite': 'little', 'protein': 'protein', 'motargument': 'counter-argument', 'bønner': 'beans', 'linser': 'lentils', 'egg': 'eggs', 'dekker': 'cover', 'behovet': 'the need', 'villig': 'willing', 'prøve': 'to try', 'maten': 'the food', 'smaker': 'tastes', 'husk': 'remember', 'skille': 'to distinguish', 'mellom': 'between', 'fakta': 'facts', 'meninger': 'opinions', 'argumenterer': 'argue', 'mening': 'opinion', 'foreslå': 'to propose', 'evaluere': 'to evaluate', 'jul': 'Christmas', 'fornuftig': 'sensible', 'kompromiss': 'compromise', 'innlegget': 'the statement', 'lyttet': 'listened', 'hverandre': 'each other', 'endret': 'changed', 'standpunkt': 'standpoint', 'underveis': 'along the way', 'debatt': 'debate', 'trodde': 'thought', 'betydde': 'meant', 'vinne': 'to win', 'annerledes': 'differently', 'klassen': 'the class', 'debatterer': 'debates', 'kutte': 'to cut', 'kjøtt': 'meat', 'elevene': 'the pupils', 'bygge': 'to build', 'argument': 'argument', 'belegg': 'evidence', 'konklusjon': 'conclusion' }
  }
});
