window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p112',
  level: 'A1',
  category: 'butikk',
  title: 'På posten',
  titleUk: 'На пошті',
  titleEn: 'At the Post Office',
  summaryUk: 'Муса забирає посилку від мами з Лондона: код для отримання, документ і приємний сюрприз.',
  summaryEn: 'Musa picks up a parcel from his mum in London: the pickup code, his ID and a nice surprise.',
  summaryNo: 'Musa henter en pakke fra mamma i London: hentekode, legitimasjon og en hyggelig overraskelse.',
  cover: 4,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'musa', x: 200, mood: 'happy', pose: 'hold' }], props: [{ type: 'phone', x: 225, y: 215, front: true }] }, lines: [
      { who: 'narrator', no: 'Musa får en melding på telefonen.', uk: 'Муса отримує повідомлення на телефон.', en: 'Musa gets a message on his phone.' },
      { who: 'musa', no: 'Å, pakken min er kommet!', uk: 'О, моя посилка прийшла!', en: 'Oh, my parcel has arrived!' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 110, mood: 'happy' }, { id: 'musa', x: 290, pose: 'wave' }], props: [{ type: 'counter', x: 110 }] }, lines: [
      { who: 'kasserer', no: 'Hei! Hva kan jeg hjelpe deg med?', uk: 'Привіт! Чим можу допомогти?', en: 'Hi! How can I help you?' },
      { who: 'musa', no: 'Hei! Jeg skal hente en pakke.', uk: 'Привіт! Я хочу забрати посилку.', en: 'Hi! I am here to pick up a parcel.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 110 }, { id: 'musa', x: 290, pose: 'hold' }], props: [{ type: 'counter', x: 110 }, { type: 'phone', x: 265, y: 215, front: true }] }, lines: [
      { who: 'kasserer', no: 'Har du hentekoden?', uk: 'У тебе є код для отримання?', en: 'Do you have the pickup code?' },
      { who: 'musa', no: 'Ja, her er koden på telefonen.', uk: 'Так, ось код у телефоні.', en: 'Yes, here is the code on my phone.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 110, pose: 'point' }, { id: 'musa', x: 290, pose: 'hold' }], props: [{ type: 'counter', x: 110 }, { type: 'docs', x: 265, y: 230, front: true }] }, lines: [
      { who: 'kasserer', no: 'Takk. Kan jeg få se legitimasjon?', uk: 'Дякую. Можна побачити документ?', en: 'Thanks. May I see some ID?' },
      { who: 'musa', no: 'Selvfølgelig. Her er passet mitt.', uk: 'Звичайно. Ось мій паспорт.', en: 'Of course. Here is my passport.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 110, mood: 'grin', pose: 'hold' }, { id: 'musa', x: 290, mood: 'happy' }], props: [{ type: 'counter', x: 110 }, { type: 'boxes', x: 200, front: true }] }, lines: [
      { who: 'kasserer', no: 'Vær så god. Pakken er ganske tung!', uk: 'Прошу. Посилка досить важка!', en: 'Here you go. The parcel is quite heavy!' },
      { who: 'musa', no: 'Tusen takk! Ha en fin dag!', uk: 'Дуже дякую! Гарного дня!', en: 'Thank you so much! Have a nice day!' }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "pose": "point"}, {"id": "musa", "x": 290, "mood": "happy", "pose": "hold"}], "props": [{"type": "counter", "x": 110}, {"type": "note", "x": 265, "y": 225, "front": true}]}, lines: [
      { who: "kasserer", no: "Vil du også sende noe i dag?", uk: "Хочеш сьогодні ще щось надіслати?", en: "Would you like to send anything today as well?" },
      { who: "musa", no: "Ja, faktisk! Jeg vil sende et brev til London.", uk: "Так, до речі! Хочу надіслати листа до Лондона.", en: "Yes, actually! I want to send a letter to London." }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110}, {"id": "musa", "x": 290, "pose": "hold"}], "props": [{"type": "counter", "x": 110}, {"type": "coins", "x": 200, "y": 250}]}, lines: [
      { who: "kasserer", no: "Et brev til England koster trettifem kroner.", uk: "Лист до Англії коштує тридцять п’ять крон.", en: "A letter to England costs thirty-five kroner." },
      { who: "musa", no: "Kan jeg betale med kort?", uk: "Можна заплатити карткою?", en: "Can I pay by card?" },
      { who: "kasserer", no: "Ja, med kort eller Vipps.", uk: "Так, карткою або через Vipps.", en: "Yes, by card or with Vipps." }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "musa", "x": 120, "mood": "surprised"}, {"id": "kasserer", "x": 290, "mood": "grin", "pose": "hold"}], "props": [{"type": "phone", "x": 265, "y": 215, "front": true}]}, lines: [
      { who: "musa", no: "Vipps? Hva er det?", uk: "Vipps? Що це таке?", en: "Vipps? What is that?" },
      { who: "kasserer", no: "Det er en app for å betale med mobilen. Alle i Norge bruker den!", uk: "Це застосунок, щоб платити телефоном. Ним користується вся Норвегія!", en: "It is an app for paying with your phone. Everyone in Norway uses it!" }
    ]},
    { art: {"bg": "street", "chars": [{"id": "musa", "x": 200, "mood": "sad", "pose": "walk"}], "props": [{"type": "boxes", "x": 200, "y": 230, "front": true, "s": 0.7}]}, lines: [
      { who: "narrator", no: "Musa bærer den tunge pakken hjem.", uk: "Муса несе важку посилку додому.", en: "Musa carries the heavy parcel home." },
      { who: "musa", no: "Uff, den er tyngre enn jeg trodde!", uk: "Ух, вона важча, ніж я думав!", en: "Phew, it is heavier than I thought!" }
    ]},
    { art: {"bg": "street", "chars": [{"id": "leo", "x": 90, "mood": "grin", "pose": "cheer"}, {"id": "nora", "x": 170, "mood": "happy", "pose": "wave"}, {"id": "musa", "x": 300, "mood": "happy", "pose": "hold"}], "props": [{"type": "boxes", "x": 300, "y": 230, "front": true, "s": 0.7}]}, lines: [
      { who: "leo", no: "Pappa! Hva er i pakken?", uk: "Тату! Що в посилці?", en: "Dad! What is in the parcel?" },
      { who: "musa", no: "Det er en overraskelse. Vi åpner den hjemme.", uk: "Це сюрприз. Відкриємо вдома.", en: "It is a surprise. We will open it at home." }
    ]},
    { art: { bg: 'home', chars: [{ id: 'musa', x: 200, mood: 'grin', pose: 'cheer' }], props: [{ type: 'boxes', x: 110 }, { type: 'mug', x: 300, y: 250 }], fx: 'hearts' }, lines: [
      { who: 'narrator', no: 'Hjemme åpner Musa pakken.', uk: 'Удома Муса відкриває посилку.', en: 'At home, Musa opens the parcel.' },
      { who: 'musa', no: 'Te og kjeks fra mamma i London! Nå føler jeg meg hjemme.', uk: 'Чай і печиво від мами з Лондона! Тепер я почуваюся як удома.', en: 'Tea and biscuits from Mum in London! Now I feel at home.' }
    ]},
    { art: {"bg": "home", "chars": [{"id": "musa", "x": 120, "mood": "grin", "pose": "hold"}, {"id": "nora", "x": 280, "mood": "surprised"}], "props": [{"type": "mug", "x": 150, "y": 225, "front": true}, {"type": "milk", "x": 210, "y": 250}]}, lines: [
      { who: "musa", no: "Nå lager jeg en kopp ekte engelsk te.", uk: "Зараз я зроблю чашку справжнього англійського чаю.", en: "Now I am making a cup of real English tea." },
      { who: "nora", no: "Med melk, pappa? Det er rart!", uk: "З молоком, тату? Це дивно!", en: "With milk, Dad? That is weird!" },
      { who: "musa", no: "Nei, det er britisk!", uk: "Ні, це по-британськи!", en: "No, it is British!" }
    ]}
  ],

  vocab: [
    ['en pakke', 'посилка', 'a parcel'],
    ['hente', 'забрати', 'to pick up'],
    ['en hentekode', 'код для отримання', 'a pickup code'],
    ['en melding', 'повідомлення', 'a message'],
    ['legitimasjon', 'документ, посвідчення особи', 'ID'],
    ['et pass', 'паспорт', 'a passport'],
    ['tung', 'важкий', 'heavy'],
    ['hjelpe', 'допомагати', 'to help'],
    ['te', 'чай', 'tea'],
    ['kjeks', 'печиво', 'biscuits'],
    ['vær så god', 'прошу, будь ласка', 'here you go'],
    ["sende", "надсилати", "to send"],
    ["et brev", "лист", "a letter"],
    ["betale med kort", "платити карткою", "to pay by card"],
    ["bære", "нести", "to carry"],
    ["en overraskelse", "сюрприз", "a surprise"],
    ["en kopp", "чашка", "a cup"]
  ],

  words: {
    no: { 'hentekoden': 'код для отримання', 'legitimasjon': 'документ, посвідчення особи', 'passet': 'паспорт', 'selvfølgelig': 'звичайно', 'kjeks': 'печиво', 'føler': 'почуваюся', 'hjemme': 'вдома', 'london': 'Лондон', 'kommet': 'прийшов, прибув' },
    en: { 'hentekoden': 'the pickup code', 'legitimasjon': 'ID', 'passet': 'the passport', 'selvfølgelig': 'of course', 'kjeks': 'biscuits', 'føler': 'feel', 'hjemme': 'at home', 'london': 'London', 'kommet': 'arrived' }
  }
});
