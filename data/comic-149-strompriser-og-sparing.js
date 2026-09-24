window.COMICS = window.COMICS || [];

/* p149 — B2: ціни на електрику. Спот чи фіксована, støtteordning, як економити вдома. */
COMICS.push({
  id: 'p149',
  level: 'B2',
  category: 'bolig',
  title: 'Strømpriser og sparing',
  titleUk: 'Ціни на електрику й економія',
  titleEn: 'Electricity prices and saving',
  summaryUk: 'Рахунок за грудень шокував. Сусід пояснює спотову ціну, державну підтримку й прості способи зменшити споживання.',
  summaryEn: 'The December bill was a shock. A neighbour explains spot prices, the state support scheme and simple ways to use less.',
  summaryNo: 'Regningen for desember ble et sjokk. Naboen forklarer spotpris, strømstøtte og enkle måter å bruke mindre på.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'denys', x: 110, mood: 'sad', pose: 'hold' }, { id: 'morten', x: 310, mood: 'surprised' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'denys', no: 'Strømregningen for desember er dobbelt så høy som i fjor.', uk: 'Рахунок за електрику за грудень удвічі вищий, ніж торік.', en: 'The electricity bill for December is twice as high as last year.' },
      { who: 'morten', no: 'Har du spotpris eller fastpris på avtalen din?', uk: 'У тебе спотова чи фіксована ціна в договорі?', en: 'Do you have a spot price or a fixed price in your contract?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 310, pose: 'point' }, { id: 'denys', x: 110, mood: 'normal' }], props: [{ type: 'computer', x: 215, y: 190 }] }, lines: [
      { who: 'denys', no: 'Spotpris. Jeg trodde det alltid var billigst.', uk: 'Спотова. Я думав, що вона завжди найдешевша.', en: 'Spot price. I thought it was always the cheapest.' },
      { who: 'morten', no: 'Over tid er den ofte det, men i kalde uker svinger den kraftig.', uk: 'У довгій перспективі — часто так, але в холодні тижні вона сильно коливається.', en: 'Over time it often is, but in cold weeks it swings a lot.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 310, mood: 'normal' }, { id: 'denys', x: 110, mood: 'surprised' }] }, lines: [
      { who: 'denys', no: 'Finnes det noen støtte?', uk: 'Чи існує якась підтримка?', en: 'Is there any support?' },
      { who: 'morten', no: 'Ja, staten dekker en andel når snittprisen overstiger en grense. Det kommer automatisk på regningen.', uk: 'Так, держава покриває частину, коли середня ціна перевищує межу. Це автоматично враховують у рахунку.', en: 'Yes, the state covers a share when the average price exceeds a limit. It appears automatically on the bill.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'denys', x: 110, mood: 'normal' }, { id: 'morten', x: 310, mood: 'happy' }], props: [{ type: 'clock', x: 215, y: 100 }] }, lines: [
      { who: 'denys', no: 'Hva kan jeg gjøre selv for å bruke mindre?', uk: 'Що я можу зробити сам, щоб споживати менше?', en: 'What can I do myself to use less?' },
      { who: 'morten', no: 'Senk temperaturen om natta, vask på kvelden og tett trekken rundt vinduene.', uk: 'Знизь температуру на ніч, пери ввечері й затули протяг біля вікон.', en: 'Lower the temperature at night, do the laundry in the evening and seal the draught around the windows.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 310, mood: 'normal' }, { id: 'denys', x: 110, mood: 'normal' }] }, lines: [
      { who: 'denys', no: 'Lønner det seg å bytte til fastpris nå?', uk: 'Чи вигідно зараз переходити на фіксовану ціну?', en: 'Is it worth switching to a fixed price now?' },
      { who: 'morten', no: 'Det er et veddemål. Fastpris gir ro, men du betaler for forutsigbarheten.', uk: 'Це як парі. Фіксована дає спокій, але ти платиш за передбачуваність.', en: 'It is a bet. A fixed price gives peace of mind, but you pay for the predictability.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'denys', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 310, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'denys', no: 'Jeg begynner med sparetiltakene og følger med på prisene en måned.', uk: 'Почну з заходів економії й місяць постежу за цінами.', en: 'I will start with the saving measures and follow the prices for a month.' },
      { who: 'morten', no: 'Klokt. Små vaner gir ofte størst utslag.', uk: 'Мудро. Маленькі звички часто дають найбільший ефект.', en: 'Wise. Small habits often make the biggest difference.' }
    ]}
  ],

  vocab: [
    ['ei strømregning', 'рахунок за електрику', 'an electricity bill'],
    ['en spotpris', 'спотова ціна', 'a spot price'],
    ['en fastpris', 'фіксована ціна', 'a fixed price'],
    ['å svinge', 'коливатися', 'to fluctuate'],
    ['ei strømstøtte', 'державна підтримка на електрику', 'electricity support'],
    ['ei andel', 'частка', 'a share'],
    ['en snittpris', 'середня ціна', 'an average price'],
    ['å overstige', 'перевищувати', 'to exceed'],
    ['ei grense', 'межа', 'a limit'],
    ['å senke', 'знижувати', 'to lower'],
    ['en trekk', 'протяг', 'a draught'],
    ['å lønne seg', 'бути вигідним', 'to be worth it'],
    ['et veddemål', 'парі, ставка', 'a bet'],
    ['ei forutsigbarhet', 'передбачуваність', 'predictability'],
    ['et sparetiltak', 'захід з економії', 'a saving measure'],
    ['et utslag', 'ефект, результат', 'an effect']
  ],

  words: {
    no: { 'strømregningen': 'рахунок за електрику', 'desember': 'грудень', 'dobbelt': 'удвічі', 'høy': 'високий', 'fjor': 'торік (i fjor)', 'spotpris': 'спотова ціна', 'fastpris': 'фіксована ціна', 'avtalen': 'договір', 'trodde': 'думав', 'alltid': 'завжди', 'billigst': 'найдешевша', 'tid': 'час', 'ofte': 'часто', 'kalde': 'холодні', 'uker': 'тижні', 'svinger': 'коливається', 'kraftig': 'сильно', 'finnes': 'існує', 'støtte': 'підтримка', 'staten': 'держава', 'dekker': 'покриває', 'andel': 'частка', 'snittprisen': 'середня ціна', 'overstiger': 'перевищує', 'grense': 'межа', 'automatisk': 'автоматично', 'regningen': 'рахунок', 'bruke': 'споживати', 'mindre': 'менше', 'senk': 'знизь', 'temperaturen': 'температура', 'natta': 'ніч', 'vask': 'пери', 'kvelden': 'вечір', 'tett': 'затули', 'trekken': 'протяг', 'vinduene': 'вікна', 'lønner': 'вигідно (lønne seg)', 'bytte': 'перейти', 'veddemål': 'парі', 'ro': 'спокій', 'betaler': 'платиш', 'forutsigbarheten': 'передбачуваність', 'begynner': 'почну', 'sparetiltakene': 'заходи економії', 'følger': 'стежу', 'prisene': 'ціни', 'måned': 'місяць', 'klokt': 'мудро', 'små': 'маленькі', 'vaner': 'звички', 'størst': 'найбільший', 'utslag': 'ефект', 'sjokk': 'шок', 'naboen': 'сусід', 'enkle': 'прості', 'måter': 'способи' },
    en: { 'strømregningen': 'the electricity bill', 'desember': 'December', 'dobbelt': 'twice', 'høy': 'high', 'fjor': 'last year (i fjor)', 'spotpris': 'spot price', 'fastpris': 'fixed price', 'avtalen': 'the contract', 'trodde': 'thought', 'alltid': 'always', 'billigst': 'cheapest', 'tid': 'time', 'ofte': 'often', 'kalde': 'cold', 'uker': 'weeks', 'svinger': 'fluctuates', 'kraftig': 'sharply', 'finnes': 'exists', 'støtte': 'support', 'staten': 'the state', 'dekker': 'covers', 'andel': 'share', 'snittprisen': 'the average price', 'overstiger': 'exceeds', 'grense': 'limit', 'automatisk': 'automatically', 'regningen': 'the bill', 'bruke': 'to use', 'mindre': 'less', 'senk': 'lower', 'temperaturen': 'the temperature', 'natta': 'the night', 'vask': 'wash', 'kvelden': 'the evening', 'tett': 'seal', 'trekken': 'the draught', 'vinduene': 'the windows', 'lønner': 'is worth it (lønne seg)', 'bytte': 'to switch', 'veddemål': 'bet', 'ro': 'peace', 'betaler': 'pay', 'forutsigbarheten': 'the predictability', 'begynner': 'start', 'sparetiltakene': 'the saving measures', 'følger': 'follow', 'prisene': 'the prices', 'måned': 'month', 'klokt': 'wise', 'små': 'small', 'vaner': 'habits', 'størst': 'biggest', 'utslag': 'effect', 'sjokk': 'shock', 'naboen': 'the neighbour', 'enkle': 'simple', 'måter': 'ways' }
  }
});
