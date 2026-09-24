window.COMICS = window.COMICS || [];

/* p137 — B1: автосервіс. EU-kontroll, кошторис, гарантія на ремонт і підмінне авто. */
COMICS.push({
  id: 'p137',
  level: 'B1',
  category: 'hverdag',
  title: 'På bilverkstedet',
  titleUk: 'В автосервісі',
  titleEn: 'At the garage',
  summaryUk: 'Муса приїхав на техогляд, але механік чує дивний звук у гальмах. Вони обговорюють кошторис, гарантію й підмінне авто.',
  summaryEn: 'Musa comes for the annual check, but the mechanic hears a strange noise in the brakes. They discuss the estimate, the guarantee and a courtesy car.',
  summaryNo: 'Musa kommer til EU-kontroll, men mekanikeren hører en rar lyd i bremsene. De snakker om pristilbud, garanti og lånebil.',
  cover: 0,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'car', x: 215 }] }, lines: [
      { who: 'musa', no: 'Hei! Jeg har time til EU-kontroll klokka ni.', uk: 'Вітаю! У мене запис на техогляд о дев’ятій.', en: 'Hi! I have an appointment for the annual check at nine.' },
      { who: 'morten', no: 'Perfekt. Sett bilen på plass to, så tar vi den inn nå.', uk: 'Чудово. Поставте авто на місце два, і ми одразу заберемо.', en: 'Perfect. Put the car in bay two and we will take it in now.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'morten', x: 100, pose: 'point' }, { id: 'musa', x: 310, mood: 'surprised' }], props: [{ type: 'car', x: 215 }] }, lines: [
      { who: 'morten', no: 'Bremsene lager en rar lyd. Har du merket det?', uk: 'Гальма видають дивний звук. Ви помічали?', en: 'The brakes make a strange noise. Have you noticed it?' },
      { who: 'musa', no: 'Ja, særlig om morgenen når det er kaldt.', uk: 'Так, особливо вранці, коли холодно.', en: 'Yes, especially in the morning when it is cold.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'morten', x: 100, mood: 'normal', pose: 'hold' }, { id: 'musa', x: 310, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'morten', no: 'Bremseklossene er slitt. Jeg sender deg et pristilbud på SMS.', uk: 'Колодки стерті. Надішлю вам кошторис у SMS.', en: 'The brake pads are worn. I will send you an estimate by text.' },
      { who: 'musa', no: 'Gjør det. Jeg vil ikke ha noe arbeid uten avtale.', uk: 'Так, будь ласка. Не хочу жодних робіт без погодження.', en: 'Please do. I do not want any work without agreeing first.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'normal' }], props: [{ type: 'phone', x: 215, y: 200 }] }, lines: [
      { who: 'musa', no: 'Hvor lang garanti er det på arbeidet?', uk: 'Яка гарантія на роботу?', en: 'How long is the guarantee on the work?' },
      { who: 'morten', no: 'To år på deler og arbeid. Alt står på fakturaen.', uk: 'Два роки на деталі й роботу. Усе зазначено в рахунку.', en: 'Two years on parts and labour. It is all on the invoice.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'morten', x: 100, mood: 'happy' }, { id: 'musa', x: 310, mood: 'happy' }], props: [{ type: 'keys', x: 215, y: 200 }] }, lines: [
      { who: 'musa', no: 'Jeg må hente barna klokka fire. Rekker dere det?', uk: 'Мені треба забрати дітей о четвертій. Встигнете?', en: 'I have to pick up the children at four. Will you manage?' },
      { who: 'morten', no: 'Ja. Og trenger du lånebil, har vi én ledig i dag.', uk: 'Так. А якщо потрібне підмінне авто — одне вільне сьогодні є.', en: 'Yes. And if you need a courtesy car, we have one free today.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'musa', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'car', x: 200 }], fx: 'stars' }, lines: [
      { who: 'morten', no: 'Bilen er godkjent, og bremsene er som nye.', uk: 'Авто пройшло техогляд, а гальма як нові.', en: 'The car has passed, and the brakes are like new.' },
      { who: 'musa', no: 'Tusen takk for rask hjelp!', uk: 'Щиро дякую за швидку допомогу!', en: 'Thank you very much for the quick help!' }
    ]}
  ],

  vocab: [
    ['et bilverksted', 'автосервіс', 'a garage'],
    ['EU-kontroll', 'техогляд', 'the annual vehicle test'],
    ['ei brems', 'гальмо', 'a brake'],
    ['ei bremskloss', 'гальмівна колодка', 'a brake pad'],
    ['slitt', 'зношений', 'worn'],
    ['ei lyd', 'звук', 'a sound'],
    ['rar', 'дивний', 'strange'],
    ['å merke', 'помічати', 'to notice'],
    ['et pristilbud', 'кошторис', 'a price estimate'],
    ['ei avtale', 'домовленість', 'an agreement'],
    ['ei garanti', 'гарантія', 'a guarantee'],
    ['ei del', 'деталь', 'a part'],
    ['ei faktura', 'рахунок', 'an invoice'],
    ['ei lånebil', 'підмінне авто', 'a courtesy car'],
    ['godkjent', 'схвалений, пройшов', 'approved, passed']
  ],

  words: {
    no: { 'bilverkstedet': 'автосервіс', 'time': 'запис', 'eu-kontroll': 'техогляд', 'klokka': 'о (годині)', 'ni': 'дев’ята', 'perfekt': 'чудово', 'sett': 'поставте', 'bilen': 'авто', 'plass': 'місце', 'inn': 'усередину', 'bremsene': 'гальма', 'lager': 'видають', 'rar': 'дивний', 'lyd': 'звук', 'merket': 'помічали', 'særlig': 'особливо', 'morgenen': 'ранок', 'kaldt': 'холодно', 'bremseklossene': 'гальмівні колодки', 'slitt': 'стерті', 'sender': 'надішлю', 'pristilbud': 'кошторис', 'sms': 'SMS', 'arbeid': 'робота', 'avtale': 'домовленість', 'garanti': 'гарантія', 'arbeidet': 'робота', 'deler': 'деталі', 'står': 'зазначено', 'fakturaen': 'рахунок', 'hente': 'забрати', 'barna': 'діти', 'fire': 'четверта', 'rekker': 'встигнете', 'trenger': 'потрібне', 'lånebil': 'підмінне авто', 'ledig': 'вільне', 'godkjent': 'пройшло техогляд', 'nye': 'нові', 'rask': 'швидка', 'hjelp': 'допомога', 'mekanikeren': 'механік' },
    en: { 'bilverkstedet': 'the garage', 'time': 'appointment', 'eu-kontroll': 'annual vehicle test', 'klokka': 'at (o’clock)', 'ni': 'nine', 'perfekt': 'perfect', 'sett': 'put', 'bilen': 'the car', 'plass': 'bay, place', 'inn': 'in', 'bremsene': 'the brakes', 'lager': 'make', 'rar': 'strange', 'lyd': 'sound', 'merket': 'noticed', 'særlig': 'especially', 'morgenen': 'the morning', 'kaldt': 'cold', 'bremseklossene': 'the brake pads', 'slitt': 'worn', 'sender': 'will send', 'pristilbud': 'price estimate', 'sms': 'text message', 'arbeid': 'work', 'avtale': 'agreement', 'garanti': 'guarantee', 'arbeidet': 'the work', 'deler': 'parts', 'står': 'is stated', 'fakturaen': 'the invoice', 'hente': 'to pick up', 'barna': 'the children', 'fire': 'four', 'rekker': 'will manage', 'trenger': 'need', 'lånebil': 'courtesy car', 'ledig': 'free', 'godkjent': 'passed', 'nye': 'new', 'rask': 'quick', 'hjelp': 'help', 'mekanikeren': 'the mechanic' }
  }
});
