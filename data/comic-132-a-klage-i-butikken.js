window.COMICS = window.COMICS || [];

/* p132 — B1: повернення товару. Reklamasjon, гарантія, чек і ввічлива незгода. */
COMICS.push({
  id: 'p132',
  level: 'B1',
  category: 'butikk',
  title: 'Å klage på en vare',
  titleUk: 'Повернути товар',
  titleEn: 'Making a complaint about a product',
  summaryUk: 'У Руслана за два місяці зламалися навушники. Він дізнається, що таке рекламація, чому чек важливий і що право діє два роки.',
  summaryEn: 'Ruslan’s headphones broke after two months. He learns what a formal complaint is, why the receipt matters and that the right lasts two years.',
  summaryNo: 'Ruslans hodetelefoner gikk i stykker etter to måneder. Han lærer hva reklamasjon er, hvorfor kvitteringen er viktig, og at retten varer i to år.',
  cover: 0,

  panels: [
    { art: { bg: 'shop', chars: [{ id: 'ruslan', x: 310, mood: 'sad', pose: 'hold' }, { id: 'kasserer', x: 100, mood: 'happy' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'ruslan', no: 'Hei. Jeg kjøpte disse hodetelefonene for to måneder siden.', uk: 'Вітаю. Я купив ці навушники два місяці тому.', en: 'Hello. I bought these headphones two months ago.' },
      { who: 'kasserer', no: 'Hva er problemet med dem?', uk: 'Що з ними не так?', en: 'What is the problem with them?' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'ruslan', x: 310, mood: 'normal' }, { id: 'kasserer', x: 100, mood: 'normal' }], props: [{ type: 'counter', x: 100 }, { type: 'phone', x: 220, y: 195 }] }, lines: [
      { who: 'ruslan', no: 'Venstre side har sluttet å virke, og jeg har brukt dem normalt.', uk: 'Лівий бік перестав працювати, а користувався я ними звичайно.', en: 'The left side has stopped working, and I have used them normally.' },
      { who: 'kasserer', no: 'Da har du rett til å reklamere. Har du kvitteringen?', uk: 'Тоді ви маєте право на рекламацію. Чек є?', en: 'Then you have the right to complain. Do you have the receipt?' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'ruslan', x: 310, mood: 'happy', pose: 'hold' }, { id: 'kasserer', x: 100, pose: 'point' }], props: [{ type: 'counter', x: 100 }, { type: 'note', x: 220 }] }, lines: [
      { who: 'ruslan', no: 'Jeg har den i appen. Holder det?', uk: 'Він у мене в застосунку. Цього досить?', en: 'I have it in the app. Is that enough?' },
      { who: 'kasserer', no: 'Ja, en digital kvittering er like god.', uk: 'Так, електронний чек так само підходить.', en: 'Yes, a digital receipt is just as good.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'normal', pose: 'hold' }, { id: 'ruslan', x: 310, mood: 'surprised' }], props: [{ type: 'counter', x: 100 }, { type: 'boxes', x: 220 }] }, lines: [
      { who: 'kasserer', no: 'Vi sender dem til reparasjon. Det tar omtrent to uker.', uk: 'Ми відправимо їх у ремонт. Це займе близько двох тижнів.', en: 'We will send them for repair. It takes about two weeks.' },
      { who: 'ruslan', no: 'Kan jeg heller få pengene tilbake?', uk: 'А можна натомість повернути гроші?', en: 'Could I get my money back instead?' },
      { who: 'kasserer', no: 'Hvis samme feil skjer igjen, har du krav på det.', uk: 'Якщо та сама несправність повториться — ви матимете на це право.', en: 'If the same fault happens again, you are entitled to that.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'happy' }, { id: 'ruslan', x: 310, mood: 'normal' }], props: [{ type: 'counter', x: 100 }, { type: 'docs', x: 220, y: 200 }] }, lines: [
      { who: 'ruslan', no: 'Hvor lenge gjelder reklamasjonsretten?', uk: 'Скільки діє право на рекламацію?', en: 'How long does the right to complain last?' },
      { who: 'kasserer', no: 'To år på vanlige varer, fem år på ting som skal vare lenge.', uk: 'Два роки на звичайні товари, п’ять — на те, що має служити довго.', en: 'Two years on ordinary goods, five on things meant to last.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'ruslan', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'kasserer', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'kasserer', no: 'Du får en SMS når de er tilbake i butikken.', uk: 'Вам прийде SMS, коли вони повернуться в магазин.', en: 'You will get a text when they are back in the shop.' },
      { who: 'ruslan', no: 'Supert. Takk for hjelpen!', uk: 'Чудово. Дякую за допомогу!', en: 'Great. Thanks for your help!' }
    ]}
  ],

  vocab: [
    ['å klage', 'скаржитися', 'to complain'],
    ['å reklamere', 'подати рекламацію', 'to make a formal complaint'],
    ['ei reklamasjonsrett', 'право на рекламацію', 'the right to complain'],
    ['ei kvittering', 'чек', 'a receipt'],
    ['ei vare', 'товар', 'goods, an item'],
    ['en feil', 'несправність, помилка', 'a fault'],
    ['å virke', 'працювати, діяти', 'to work'],
    ['ei reparasjon', 'ремонт', 'a repair'],
    ['å ha krav på', 'мати право на', 'to be entitled to'],
    ['pengene tilbake', 'повернення грошей', 'a refund'],
    ['digital', 'електронний', 'digital'],
    ['å vare', 'тривати, служити', 'to last'],
    ['hodetelefoner', 'навушники', 'headphones'],
    ['normalt', 'звичайно', 'normally']
  ],

  words: {
    no: { 'kjøpte': 'купив', 'disse': 'ці', 'hodetelefonene': 'навушники', 'måneder': 'місяці', 'siden': 'тому', 'problemet': 'проблема', 'dem': 'ними, їх', 'venstre': 'лівий', 'side': 'бік', 'sluttet': 'перестав', 'virke': 'працювати', 'brukt': 'користувався', 'normalt': 'звичайно', 'rett': 'право', 'reklamere': 'подати рекламацію', 'kvitteringen': 'чек', 'appen': 'застосунок', 'holder': 'вистачає', 'digital': 'електронний', 'kvittering': 'чек', 'like': 'так само', 'sender': 'відправимо', 'reparasjon': 'ремонт', 'uker': 'тижні', 'heller': 'радше, натомість', 'pengene': 'гроші', 'tilbake': 'назад', 'samme': 'та сама', 'feil': 'несправність', 'skjer': 'трапиться', 'igjen': 'знову', 'krav': 'вимога (ha krav på — мати право на)', 'lenge': 'довго', 'gjelder': 'діє', 'reklamasjonsretten': 'право на рекламацію', 'vanlige': 'звичайні', 'varer': 'товари; триває', 'ting': 'речі', 'vare': 'служити, тривати', 'sms': 'SMS', 'butikken': 'магазин', 'supert': 'чудово', 'stykker': 'шматки (gå i stykker — зламатися)' },
    en: { 'kjøpte': 'bought', 'disse': 'these', 'hodetelefonene': 'the headphones', 'måneder': 'months', 'siden': 'ago', 'problemet': 'the problem', 'dem': 'them', 'venstre': 'left', 'side': 'side', 'sluttet': 'stopped', 'virke': 'to work', 'brukt': 'used', 'normalt': 'normally', 'rett': 'right', 'reklamere': 'to make a complaint', 'kvitteringen': 'the receipt', 'appen': 'the app', 'holder': 'is enough', 'digital': 'digital', 'kvittering': 'receipt', 'like': 'just as', 'sender': 'send', 'reparasjon': 'repair', 'uker': 'weeks', 'heller': 'rather, instead', 'pengene': 'the money', 'tilbake': 'back', 'samme': 'same', 'feil': 'fault', 'skjer': 'happens', 'igjen': 'again', 'krav': 'claim (ha krav på — be entitled to)', 'lenge': 'long', 'gjelder': 'is valid', 'reklamasjonsretten': 'the right to complain', 'vanlige': 'ordinary', 'varer': 'goods; lasts', 'ting': 'things', 'vare': 'to last', 'sms': 'text message', 'butikken': 'the shop', 'supert': 'great', 'stykker': 'pieces (gå i stykker — to break)' }
  }
});
