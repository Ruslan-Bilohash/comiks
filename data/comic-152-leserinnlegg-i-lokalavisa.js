window.COMICS = window.COMICS || [];

/* p152 — B2: лист до редакції. Як побудувати переконливий текст і не перейти на особистості. */
COMICS.push({
  id: 'p152',
  level: 'B2',
  category: 'kultur',
  title: 'Leserinnlegg i lokalavisa',
  titleUk: 'Лист до місцевої газети',
  titleEn: 'A letter to the local paper',
  summaryUk: 'Марія хоче написати про небезпечний перехід біля школи. Редакторка пояснює, як зробити текст сильним: факти, рішення й жодних образ.',
  summaryEn: 'Maria wants to write about a dangerous crossing near the school. The editor explains how to make the text strong: facts, a solution and no personal attacks.',
  summaryNo: 'Maria vil skrive om et farlig fotgjengerfelt ved skolen. Redaktøren forklarer hvordan teksten blir sterk: fakta, forslag til løsning og ingen personangrep.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'maria', x: 310, mood: 'normal', pose: 'hold' }, { id: 'kari', x: 100, mood: 'happy' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'maria', no: 'Jeg har skrevet et leserinnlegg om fotgjengerfeltet ved skolen.', uk: 'Я написала лист до редакції про пішохідний перехід біля школи.', en: 'I have written a letter to the editor about the crossing near the school.' },
      { who: 'kari', no: 'Bra. Hva er hovedpoenget ditt, i én setning?', uk: 'Добре. Яка ваша головна думка, одним реченням?', en: 'Good. What is your main point, in one sentence?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'maria', x: 310, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'At kommunen må sette opp lys og fartsdempere før det skjer en ulykke.', uk: 'Що комуна має встановити освітлення й лежачих поліцейських, доки не сталася аварія.', en: 'That the municipality must install lights and speed bumps before an accident happens.' },
      { who: 'kari', no: 'Da bør den setningen stå helt øverst, ikke til slutt.', uk: 'Тоді це речення має стояти найперше, а не в кінці.', en: 'Then that sentence should be right at the top, not at the end.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 310, mood: 'surprised' }, { id: 'kari', x: 100, mood: 'normal' }] }, lines: [
      { who: 'kari', no: 'Har du konkrete tall? Antall biler, fartsmålinger, nesten-ulykker?', uk: 'У вас є конкретні цифри? Кількість авто, заміри швидкості, ледь не аварії?', en: 'Do you have concrete figures? Number of cars, speed measurements, near misses?' },
      { who: 'maria', no: 'Ja, foreldregruppa har telt biler i to uker.', uk: 'Так, батьківська група рахувала авто два тижні.', en: 'Yes, the parents’ group counted cars for two weeks.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal', pose: 'hold' }, { id: 'maria', x: 310, mood: 'normal' }] }, lines: [
      { who: 'kari', no: 'Én ting til: unngå personangrep. Kritiser vedtaket, ikke politikeren.', uk: 'І ще одне: без переходу на особистості. Критикуйте рішення, а не політика.', en: 'One more thing: avoid personal attacks. Criticise the decision, not the politician.' },
      { who: 'maria', no: 'Jeg skrev at han ikke bryr seg. Det tar jeg bort.', uk: 'Я написала, що йому байдуже. Це приберу.', en: 'I wrote that he does not care. I will take that out.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 310, mood: 'happy' }, { id: 'kari', x: 100, mood: 'happy' }] }, lines: [
      { who: 'maria', no: 'Hvor langt kan innlegget være?', uk: 'Якої довжини може бути лист?', en: 'How long can the letter be?' },
      { who: 'kari', no: 'Maks tre tusen tegn. Kortere tekster blir oftere lest — og delt.', uk: 'Максимум три тисячі знаків. Коротші тексти читають частіше — і більше поширюють.', en: 'Three thousand characters at most. Shorter texts get read more often — and shared.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'kari', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'kari', no: 'Vi trykker det på torsdag, og kommunen får mulighet til å svare.', uk: 'Надрукуємо в четвер, і комуна матиме змогу відповісти.', en: 'We will print it on Thursday, and the municipality will get a chance to reply.' },
      { who: 'maria', no: 'Da har vi i det minste startet en debatt.', uk: 'Тоді ми принаймні почали дискусію.', en: 'Then at least we have started a debate.' }
    ]}
  ],

  vocab: [
    ['et leserinnlegg', 'лист до редакції', 'a letter to the editor'],
    ['ei lokalavis', 'місцева газета', 'a local paper'],
    ['et fotgjengerfelt', 'пішохідний перехід', 'a pedestrian crossing'],
    ['et hovedpoeng', 'головна думка', 'the main point'],
    ['ei kommune', 'комуна, муніципалітет', 'a municipality'],
    ['en fartsdemper', 'лежачий поліцейський', 'a speed bump'],
    ['ei ulykke', 'нещасний випадок, аварія', 'an accident'],
    ['ei fartsmåling', 'вимірювання швидкості', 'a speed measurement'],
    ['ei foreldregruppe', 'батьківська група', 'a parents’ group'],
    ['å telle', 'рахувати', 'to count'],
    ['et personangrep', 'перехід на особистості', 'a personal attack'],
    ['å kritisere', 'критикувати', 'to criticise'],
    ['et vedtak', 'рішення', 'a decision'],
    ['et tegn', 'знак, символ', 'a character'],
    ['å trykke', 'друкувати', 'to print'],
    ['ei mulighet', 'можливість', 'an opportunity']
  ],

  words: {
    no: { 'skrevet': 'написала', 'leserinnlegg': 'лист до редакції', 'fotgjengerfeltet': 'пішохідний перехід', 'skolen': 'школа', 'hovedpoenget': 'головна думка', 'setning': 'речення', 'kommunen': 'комуна', 'sette': 'встановити', 'lys': 'освітлення', 'fartsdempere': 'лежачі поліцейські', 'skjer': 'станеться', 'ulykke': 'аварія', 'bør': 'має', 'setningen': 'речення', 'stå': 'стояти', 'øverst': 'найвище', 'slutt': 'кінець', 'konkrete': 'конкретні', 'tall': 'цифри', 'antall': 'кількість', 'biler': 'авто', 'fartsmålinger': 'заміри швидкості', 'nesten-ulykker': 'ледь не аварії', 'foreldregruppa': 'батьківська група', 'telt': 'рахувала', 'uker': 'тижні', 'ting': 'річ', 'unngå': 'уникати', 'personangrep': 'перехід на особистості', 'kritiser': 'критикуйте', 'vedtaket': 'рішення', 'politikeren': 'політик', 'skrev': 'написала', 'bryr': 'дбає (bry seg — перейматися)', 'bort': 'геть (ta bort — прибрати)', 'langt': 'довгий', 'innlegget': 'лист, допис', 'maks': 'максимум', 'tusen': 'тисячі', 'tegn': 'знаки', 'kortere': 'коротші', 'tekster': 'тексти', 'oftere': 'частіше', 'lest': 'читають', 'delt': 'поширюють', 'trykker': 'надрукуємо', 'torsdag': 'четвер', 'mulighet': 'можливість', 'svare': 'відповісти', 'minste': 'найменше (i det minste — принаймні)', 'startet': 'почали', 'debatt': 'дискусія', 'redaktøren': 'редакторка', 'farlig': 'небезпечний', 'sterk': 'сильний', 'løsning': 'рішення' },
    en: { 'skrevet': 'written', 'leserinnlegg': 'letter to the editor', 'fotgjengerfeltet': 'the pedestrian crossing', 'skolen': 'the school', 'hovedpoenget': 'the main point', 'setning': 'sentence', 'kommunen': 'the municipality', 'sette': 'to install', 'lys': 'lights', 'fartsdempere': 'speed bumps', 'skjer': 'happens', 'ulykke': 'accident', 'bør': 'should', 'setningen': 'the sentence', 'stå': 'to stand', 'øverst': 'at the top', 'slutt': 'end', 'konkrete': 'concrete', 'tall': 'figures', 'antall': 'number', 'biler': 'cars', 'fartsmålinger': 'speed measurements', 'nesten-ulykker': 'near misses', 'foreldregruppa': 'the parents’ group', 'telt': 'counted', 'uker': 'weeks', 'ting': 'thing', 'unngå': 'to avoid', 'personangrep': 'personal attacks', 'kritiser': 'criticise', 'vedtaket': 'the decision', 'politikeren': 'the politician', 'skrev': 'wrote', 'bryr': 'cares (bry seg)', 'bort': 'away (ta bort — remove)', 'langt': 'long', 'innlegget': 'the letter', 'maks': 'maximum', 'tusen': 'thousand', 'tegn': 'characters', 'kortere': 'shorter', 'tekster': 'texts', 'oftere': 'more often', 'lest': 'read', 'delt': 'shared', 'trykker': 'will print', 'torsdag': 'Thursday', 'mulighet': 'opportunity', 'svare': 'to reply', 'minste': 'least (i det minste — at least)', 'startet': 'started', 'debatt': 'debate', 'redaktøren': 'the editor', 'farlig': 'dangerous', 'sterk': 'strong', 'løsning': 'solution' }
  }
});
