window.COMICS = window.COMICS || [];

/* p134 — B1: спортзал. Абонемент, прив’язка, групові заняття, як скасувати. */
COMICS.push({
  id: 'p134',
  level: 'B1',
  category: 'fritid',
  title: 'På treningssenteret',
  titleUk: 'У спортзалі',
  titleEn: 'At the gym',
  summaryUk: 'Лео хоче записатися в спортзал. Тренер пояснює види абонементів, термін прив’язки, групові заняття — і як правильно розірвати договір.',
  summaryEn: 'Leo wants to join a gym. The instructor explains membership types, the binding period, group classes — and how to cancel properly.',
  summaryNo: 'Leo vil begynne på treningssenter. Instruktøren forklarer medlemskap, bindingstid, gruppetimer – og hvordan man sier opp riktig.',
  cover: 0,

  panels: [
    { art: { bg: 'shop', chars: [{ id: 'leo', x: 310, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'leo', no: 'Hei! Jeg vil gjerne bli medlem. Hva koster det?', uk: 'Вітаю! Хочу стати членом клубу. Скільки це коштує?', en: 'Hi! I would like to become a member. What does it cost?' },
      { who: 'morten', no: 'Fire hundre i måneden uten bindingstid, eller tre hundre med ett år.', uk: 'Чотириста на місяць без прив’язки або триста з річним договором.', en: 'Four hundred a month without a binding period, or three hundred with one year.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'morten', x: 100, pose: 'point' }, { id: 'leo', x: 310, mood: 'surprised' }], props: [{ type: 'counter', x: 100 }, { type: 'docs', x: 220, y: 200 }] }, lines: [
      { who: 'leo', no: 'Hva betyr bindingstid egentlig?', uk: 'А що взагалі означає прив’язка?', en: 'What does a binding period actually mean?' },
      { who: 'morten', no: 'At du ikke kan si opp før året er ute, selv om du slutter å trene.', uk: 'Що не можна розірвати договір до кінця року, навіть якщо перестанеш ходити.', en: 'That you cannot cancel before the year is over, even if you stop training.' }
    ]},
    { art: { bg: 'shop', board: 'yoga · spinning · styrke', chars: [{ id: 'morten', x: 100, mood: 'happy' }, { id: 'leo', x: 310, mood: 'happy' }] }, lines: [
      { who: 'leo', no: 'Er gruppetimer inkludert?', uk: 'Групові заняття входять?', en: 'Are group classes included?' },
      { who: 'morten', no: 'Ja, alle timene: yoga, spinning og styrke. Du booker i appen.', uk: 'Так, усі заняття: йога, спінінг і силові. Бронюєш у застосунку.', en: 'Yes, all classes: yoga, spinning and strength. You book in the app.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'leo', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'normal', pose: 'hold' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'leo', no: 'Jeg har aldri trent med vekter før. Får jeg hjelp?', uk: 'Я ніколи не тренувався з вагою. Мені допоможуть?', en: 'I have never trained with weights before. Do I get help?' },
      { who: 'morten', no: 'Du får en gratis innføring med en instruktør første uka.', uk: 'Першого тижня ти отримаєш безкоштовне ознайомче заняття з тренером.', en: 'You get a free introduction with an instructor in the first week.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'morten', x: 100, mood: 'normal' }, { id: 'leo', x: 310, mood: 'surprised' }], props: [{ type: 'counter', x: 100 }, { type: 'phone', x: 220, y: 195 }] }, lines: [
      { who: 'leo', no: 'Og hvis jeg flytter til en annen by?', uk: 'А якщо я перееду в інше місто?', en: 'And what if I move to another town?' },
      { who: 'morten', no: 'Da sier du opp skriftlig med én måneds varsel. Ta vare på bekreftelsen.', uk: 'Тоді подаєш письмову заяву за місяць. Збережи підтвердження.', en: 'Then you cancel in writing with one month’s notice. Keep the confirmation.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'leo', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'leo', no: 'Da tar jeg medlemskap uten bindingstid først.', uk: 'Тоді спершу візьму абонемент без прив’язки.', en: 'Then I will take the membership without a binding period first.' },
      { who: 'morten', no: 'Lurt valg. Velkommen — vi ses på trening!', uk: 'Розумний вибір. Ласкаво просимо — побачимося на тренуванні!', en: 'Smart choice. Welcome — see you at training!' }
    ]}
  ],

  vocab: [
    ['et treningssenter', 'спортзал', 'a gym'],
    ['et medlem', 'член клубу', 'a member'],
    ['et medlemskap', 'абонемент', 'a membership'],
    ['ei bindingstid', 'термін прив’язки', 'a binding period'],
    ['å si opp', 'розірвати договір', 'to cancel, give notice'],
    ['en gruppetime', 'групове заняття', 'a group class'],
    ['å booke', 'бронювати', 'to book'],
    ['ei vekt', 'вага, гантель', 'a weight'],
    ['ei innføring', 'ввідне заняття', 'an introduction'],
    ['en instruktør', 'тренер', 'an instructor'],
    ['skriftlig', 'письмово', 'in writing'],
    ['et varsel', 'попередження, строк', 'notice'],
    ['ei bekreftelse', 'підтвердження', 'a confirmation'],
    ['et valg', 'вибір', 'a choice'],
    ['å trene', 'тренуватися', 'to train']
  ],

  words: {
    no: { 'treningssenteret': 'спортзал', 'medlem': 'член клубу', 'koster': 'коштує', 'hundre': 'сто', 'måneden': 'місяць', 'bindingstid': 'термін прив’язки', 'ett': 'один', 'betyr': 'означає', 'egentlig': 'насправді, взагалі', 'året': 'рік', 'ute': 'закінчився (året er ute)', 'slutter': 'перестанеш', 'trene': 'тренуватися', 'gruppetimer': 'групові заняття', 'inkludert': 'входять', 'timene': 'заняття', 'yoga': 'йога', 'spinning': 'спінінг', 'styrke': 'сила, силові', 'booker': 'бронюєш', 'appen': 'застосунок', 'aldri': 'ніколи', 'trent': 'тренувався', 'vekter': 'ваги, гантелі', 'hjelp': 'допомога', 'gratis': 'безкоштовне', 'innføring': 'ввідне заняття', 'instruktør': 'тренер', 'uka': 'тиждень', 'flytter': 'перееду', 'annen': 'інше', 'by': 'місто', 'skriftlig': 'письмово', 'måneds': 'місячний', 'varsel': 'попередження', 'vare': 'зберігати (ta vare på)', 'bekreftelsen': 'підтвердження', 'medlemskap': 'абонемент', 'lurt': 'розумний', 'valg': 'вибір', 'trening': 'тренування', 'instruktøren': 'тренер' },
    en: { 'treningssenteret': 'the gym', 'medlem': 'member', 'koster': 'costs', 'hundre': 'hundred', 'måneden': 'the month', 'bindingstid': 'binding period', 'ett': 'one', 'betyr': 'means', 'egentlig': 'actually', 'året': 'the year', 'ute': 'over (året er ute)', 'slutter': 'stop', 'trene': 'to train', 'gruppetimer': 'group classes', 'inkludert': 'included', 'timene': 'the classes', 'yoga': 'yoga', 'spinning': 'spinning', 'styrke': 'strength', 'booker': 'book', 'appen': 'the app', 'aldri': 'never', 'trent': 'trained', 'vekter': 'weights', 'hjelp': 'help', 'gratis': 'free', 'innføring': 'introduction', 'instruktør': 'instructor', 'uka': 'the week', 'flytter': 'move', 'annen': 'another', 'by': 'town', 'skriftlig': 'in writing', 'måneds': 'month’s', 'varsel': 'notice', 'vare': 'to keep (ta vare på)', 'bekreftelsen': 'the confirmation', 'medlemskap': 'membership', 'lurt': 'smart', 'valg': 'choice', 'trening': 'training', 'instruktøren': 'the instructor' }
  }
});
