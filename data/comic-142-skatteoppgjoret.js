window.COMICS = window.COMICS || [];

/* p142 — B2: податкова декларація й розрахунок. Відрахування, доплата, зміна податкової картки. */
COMICS.push({
  id: 'p142',
  level: 'B2',
  category: 'jobb',
  title: 'Skatteoppgjøret',
  titleUk: 'Податковий розрахунок',
  titleEn: 'The tax settlement',
  summaryUk: 'Денис отримав розрахунок і має доплатити. Колега пояснює, як перевірити декларацію, які відрахування бувають і як змінити податкову картку.',
  summaryEn: 'Denys gets his tax settlement and owes money. A colleague explains how to check the return, which deductions exist and how to change the tax card.',
  summaryNo: 'Denys har fått skatteoppgjøret og må betale restskatt. En kollega forklarer hvordan han sjekker skattemeldingen, hvilke fradrag som finnes, og hvordan han endrer skattekortet.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'sad', pose: 'hold' }, { id: 'kari', x: 100, mood: 'surprised' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'denys', no: 'Jeg har fått skatteoppgjøret, og jeg skylder ni tusen kroner.', uk: 'Я отримав податковий розрахунок і винен дев’ять тисяч крон.', en: 'I have received my tax settlement, and I owe nine thousand kroner.' },
      { who: 'kari', no: 'Det er restskatt. Har du sjekket skattemeldingen i vår?', uk: 'Це доплата. Ти перевіряв декларацію навесні?', en: 'That is underpaid tax. Did you check your tax return in the spring?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'normal' }, { id: 'kari', x: 100, pose: 'point' }], props: [{ type: 'computer', x: 110, y: 175 }] }, lines: [
      { who: 'denys', no: 'Jeg leverte den uten å endre noe. Var det feil?', uk: 'Я подав її, нічого не змінюючи. Це була помилка?', en: 'I submitted it without changing anything. Was that a mistake?' },
      { who: 'kari', no: 'Ikke feil, men tallene er bare et forslag. Du er selv ansvarlig for dem.', uk: 'Не помилка, але цифри там лише попередні. Відповідальність за них — на тобі.', en: 'Not a mistake, but the figures are only a proposal. You are responsible for them yourself.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal' }, { id: 'denys', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'denys', no: 'Hvilke fradrag kunne jeg ha ført opp?', uk: 'Які відрахування я міг би вказати?', en: 'Which deductions could I have claimed?' },
      { who: 'kari', no: 'Reisefradrag, fagforeningskontingent og renter på lån er de vanligste.', uk: 'Найпоширеніші — за проїзд, членські внески профспілки й відсотки за кредитом.', en: 'Travel allowance, union fees and interest on loans are the most common.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'normal' }, { id: 'kari', x: 100, mood: 'normal', pose: 'hold' }], props: [{ type: 'coins', x: 215, y: 205 }] }, lines: [
      { who: 'denys', no: 'Kan jeg klage nå som oppgjøret er ferdig?', uk: 'Чи можу я оскаржити, коли розрахунок уже готовий?', en: 'Can I appeal now that the settlement is done?' },
      { who: 'kari', no: 'Ja, du kan endre skattemeldingen tre år tilbake og få pengene igjen.', uk: 'Так, декларацію можна змінити за три роки назад і повернути гроші.', en: 'Yes, you can amend the return three years back and get the money refunded.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'denys', x: 310, mood: 'happy' }] }, lines: [
      { who: 'kari', no: 'Og endre skattekortet nå, så trekker arbeidsgiveren riktig beløp hver måned.', uk: 'І зміни податкову картку зараз, щоб роботодавець утримував правильну суму щомісяця.', en: 'And change your tax card now, so your employer withholds the right amount each month.' },
      { who: 'denys', no: 'Bedre enn å få en ubehagelig overraskelse neste år.', uk: 'Краще, ніж отримати неприємний сюрприз наступного року.', en: 'Better than getting an unpleasant surprise next year.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'kari', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'kari', no: 'Du kan dele restskatten i to terminer hvis du vil.', uk: 'Доплату можна розділити на два платежі, якщо хочеш.', en: 'You can split the underpaid tax into two instalments if you like.' },
      { who: 'denys', no: 'Da gjør jeg det. Nå skjønner jeg systemet mye bedre.', uk: 'Так і зроблю. Тепер я розумію систему набагато краще.', en: 'Then I will. Now I understand the system much better.' }
    ]}
  ],

  vocab: [
    ['et skatteoppgjør', 'податковий розрахунок', 'a tax settlement'],
    ['ei skattemelding', 'податкова декларація', 'a tax return'],
    ['ei restskatt', 'доплата податку', 'underpaid tax'],
    ['å skylde', 'бути винним (гроші)', 'to owe'],
    ['et fradrag', 'відрахування', 'a deduction'],
    ['et reisefradrag', 'відрахування за проїзд', 'travel allowance'],
    ['ei fagforeningskontingent', 'членський внесок профспілки', 'a union fee'],
    ['renter', 'відсотки', 'interest'],
    ['ansvarlig', 'відповідальний', 'responsible'],
    ['å klage', 'оскаржувати', 'to appeal'],
    ['å endre', 'змінювати', 'to amend, change'],
    ['et skattekort', 'податкова картка', 'a tax card'],
    ['å trekke', 'утримувати (податок)', 'to withhold'],
    ['et beløp', 'сума', 'an amount'],
    ['en termin', 'платіжний період', 'an instalment'],
    ['ubehagelig', 'неприємний', 'unpleasant']
  ],

  words: {
    no: { 'skatteoppgjøret': 'податковий розрахунок', 'skylder': 'винен', 'ni': 'дев’ять', 'tusen': 'тисяч', 'kroner': 'крони', 'restskatt': 'доплата податку', 'restskatten': 'доплата податку', 'sjekket': 'перевіряв', 'skattemeldingen': 'податкова декларація', 'vår': 'весна', 'leverte': 'подав', 'endre': 'змінювати', 'feil': 'помилка', 'tallene': 'цифри', 'forslag': 'пропозиція, попередній варіант', 'selv': 'сам', 'ansvarlig': 'відповідальний', 'fradrag': 'відрахування', 'ført': 'указати (føre opp)', 'reisefradrag': 'відрахування за проїзд', 'fagforeningskontingent': 'внесок профспілки', 'renter': 'відсотки', 'lån': 'кредит', 'vanligste': 'найпоширеніші', 'klage': 'оскаржити', 'oppgjøret': 'розрахунок', 'ferdig': 'готовий', 'tilbake': 'назад', 'pengene': 'гроші', 'igjen': 'назад, знову', 'skattekortet': 'податкова картка', 'trekker': 'утримує', 'arbeidsgiveren': 'роботодавець', 'riktig': 'правильний', 'beløp': 'сума', 'måned': 'місяць', 'bedre': 'краще', 'ubehagelig': 'неприємний', 'overraskelse': 'сюрприз', 'neste': 'наступний', 'dele': 'розділити', 'terminer': 'платіжні періоди', 'skjønner': 'розумію', 'systemet': 'система', 'kollega': 'колега' },
    en: { 'skatteoppgjøret': 'the tax settlement', 'skylder': 'owe', 'ni': 'nine', 'tusen': 'thousand', 'kroner': 'kroner', 'restskatt': 'underpaid tax', 'restskatten': 'the underpaid tax', 'sjekket': 'checked', 'skattemeldingen': 'the tax return', 'vår': 'spring', 'leverte': 'submitted', 'endre': 'to change', 'feil': 'mistake', 'tallene': 'the figures', 'forslag': 'proposal', 'selv': 'yourself', 'ansvarlig': 'responsible', 'fradrag': 'deduction', 'ført': 'entered (føre opp)', 'reisefradrag': 'travel allowance', 'fagforeningskontingent': 'union fee', 'renter': 'interest', 'lån': 'loan', 'vanligste': 'most common', 'klage': 'to appeal', 'oppgjøret': 'the settlement', 'ferdig': 'finished', 'tilbake': 'back', 'pengene': 'the money', 'igjen': 'back, again', 'skattekortet': 'the tax card', 'trekker': 'withholds', 'arbeidsgiveren': 'the employer', 'riktig': 'correct', 'beløp': 'amount', 'måned': 'month', 'bedre': 'better', 'ubehagelig': 'unpleasant', 'overraskelse': 'surprise', 'neste': 'next', 'dele': 'to split', 'terminer': 'instalments', 'skjønner': 'understand', 'systemet': 'the system', 'kollega': 'colleague' }
  }
});
