window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p113',
  level: 'A1',
  category: 'hverdag',
  title: 'For et vær!',
  titleUk: 'Ну й погода!',
  titleEn: 'What Weather!',
  summaryUk: 'У Бергені Муса говорить з бабусею про погоду. Британцю дощ не страшний!',
  summaryEn: 'On a trip to Bergen, Musa chats about the weather with an elderly lady. For a Brit, rain is nothing new!',
  summaryNo: 'På besøk i Bergen snakker Musa med ei eldre dame om været. For en brite er regn ikke noe nytt!',
  cover: 3,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 110, mood: 'surprised' }, { id: 'musa', x: 290, pose: 'hold' }], props: [{ type: 'umbrella', x: 290, front: true }], fx: 'rain' }, lines: [
      { who: 'narrator', no: 'Musa er på besøk i Bergen.', uk: 'Муса в гостях у Бергені.', en: 'Musa is visiting Bergen.' },
      { who: 'bestemor', no: 'Hei! For et vær i dag!', uk: 'Привіт! Ну й погода сьогодні!', en: 'Hi! What weather today!' },
      { who: 'musa', no: 'Ja, det regner og regner!', uk: 'Так, дощ і дощ!', en: 'Yes, it rains and rains!' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 110, pose: 'point' }, { id: 'musa', x: 290, mood: 'happy', pose: 'hold' }], props: [{ type: 'umbrella', x: 290, front: true }], fx: 'rain' }, lines: [
      { who: 'bestemor', no: 'Du er ikke norsk, er du vel?', uk: 'Ти ж не норвежець, правда?', en: 'You are not Norwegian, are you?' },
      { who: 'musa', no: 'Nei, jeg kommer fra London, men nå bor jeg i Drammen.', uk: 'Ні, я з Лондона, але тепер живу в Драммені.', en: 'No, I am from London, but now I live in Drammen.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 110, mood: 'grin' }, { id: 'musa', x: 290, mood: 'grin', pose: 'hold' }], props: [{ type: 'umbrella', x: 290, front: true }], fx: 'rain' }, lines: [
      { who: 'bestemor', no: 'Her i Bergen regner det nesten hver dag.', uk: 'Тут, у Бергені, дощ іде майже щодня.', en: 'Here in Bergen it rains almost every day.' },
      { who: 'musa', no: 'Da er jeg vant til det. I London regner det også!', uk: 'Тоді я звик. У Лондоні теж постійно дощ!', en: 'Then I am used to it. It rains in London too!' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'bestemor', x: 110, mood: 'happy', pose: 'hips' }, { id: 'musa', x: 290, mood: 'grin', pose: 'hold' }], props: [{ type: 'umbrella', x: 290, front: true }], fx: 'rain' }, lines: [
      { who: 'bestemor', no: 'Det finnes ikke dårlig vær, bare dårlige klær!', uk: 'Не буває поганої погоди — буває поганий одяг!', en: 'There is no bad weather, only bad clothes!' },
      { who: 'musa', no: 'Ha ha! Da må jeg kjøpe en god regnjakke.', uk: 'Ха-ха! Тоді мені треба купити гарний дощовик.', en: 'Ha ha! Then I must buy a good raincoat.' }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "mood": "happy"}, {"id": "musa", "x": 290, "pose": "hips"}], "props": [{"type": "counter", "x": 110}]}, lines: [
      { who: "narrator", no: "Musa går inn i en butikk for å kjøpe regntøy.", uk: "Муса заходить у магазин купити дощовий одяг.", en: "Musa goes into a shop to buy rain clothes." },
      { who: "kasserer", no: "Hei! Leter du etter noe?", uk: "Привіт! Щось шукаєте?", en: "Hi! Are you looking for something?" },
      { who: "musa", no: "Ja, en regnjakke og gode støvler.", uk: "Так, дощовик і гарні чоботи.", en: "Yes, a raincoat and good boots." }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "pose": "point"}, {"id": "musa", "x": 290, "mood": "surprised"}], "props": [{"type": "counter", "x": 110}]}, lines: [
      { who: "kasserer", no: "Denne jakka er vanntett og varm. Den koster to tusen kroner.", uk: "Ця куртка непромокна й тепла. Коштує дві тисячі крон.", en: "This jacket is waterproof and warm. It costs two thousand kroner." },
      { who: "musa", no: "To tusen? Norge er dyrt!", uk: "Дві тисячі? Норвегія дорога!", en: "Two thousand? Norway is expensive!" }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "mood": "grin"}, {"id": "musa", "x": 290, "mood": "grin", "pose": "hold"}], "props": [{"type": "counter", "x": 110}]}, lines: [
      { who: "musa", no: "Men jeg tar den. Jeg vil ikke bli våt hver dag.", uk: "Але я її беру. Не хочу мокнути щодня.", en: "But I will take it. I do not want to get wet every day." },
      { who: "kasserer", no: "Et godt valg! Nå er du klar for Bergen.", uk: "Гарний вибір! Тепер ти готовий до Бергена.", en: "A good choice! Now you are ready for Bergen." }
    ]},
    { art: {"bg": "street", "chars": [{"id": "musa", "x": 120, "mood": "happy", "pose": "cheer"}, {"id": "bestemor", "x": 290, "mood": "grin", "pose": "hips"}], "fx": "rain"}, lines: [
      { who: "musa", no: "Nå kan det bare regne! Jeg er tørr og varm!", uk: "Тепер нехай собі дощить! Мені сухо й тепло!", en: "Now it can rain all it likes! I am dry and warm!" },
      { who: "bestemor", no: "Ser du? Det finnes bare dårlige klær!", uk: "Бачиш? Буває тільки поганий одяг!", en: "You see? There are only bad clothes!" }
    ]},
    { art: {"bg": "kitchen", "chars": [{"id": "bestemor", "x": 110, "mood": "happy", "pose": "hold"}, {"id": "musa", "x": 290, "mood": "happy"}], "props": [{"type": "table", "x": 200}, {"type": "mug", "x": 180, "y": 245}, {"type": "bread", "x": 225, "y": 245}]}, lines: [
      { who: "bestemor", no: "Vil du ha en kopp kaffe og en skillingsbolle?", uk: "Хочеш чашку кави й скіллінгсболле?", en: "Would you like a cup of coffee and a skillingsbolle?" },
      { who: "musa", no: "Gjerne! Hva er en skillingsbolle?", uk: "Залюбки! А що таке скіллінгсболле?", en: "I would love to! What is a skillingsbolle?" },
      { who: "bestemor", no: "En søt bolle med kanel. Bergen er kjent for dem.", uk: "Солодка булочка з корицею. Берген ними славиться.", en: "A sweet cinnamon bun. Bergen is famous for them." }
    ]},
    { art: { bg: 'park', chars: [{ id: 'musa', x: 200, mood: 'happy', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'narrator', no: 'Neste dag skinner sola.', uk: 'Наступного дня світить сонце.', en: 'The next day the sun is shining.' },
      { who: 'musa', no: 'Endelig sol! Jeg elsker Norge!', uk: 'Нарешті сонце! Я люблю Норвегію!', en: 'Finally, sunshine! I love Norway!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'bestemor', x: 110, mood: 'happy', pose: 'wave' }, { id: 'musa', x: 290, mood: 'surprised' }] }, lines: [
      { who: 'bestemor', no: 'Nyt det! I morgen kommer det kanskje snø.', uk: 'Насолоджуйся! Завтра, може, піде сніг.', en: 'Enjoy it! Tomorrow it might snow.' },
      { who: 'musa', no: 'Snø? I mai?!', uk: 'Сніг? У травні?!', en: 'Snow? In May?!' }
    ]},
    { art: {"bg": "winter", "chars": [{"id": "musa", "x": 200, "mood": "surprised", "pose": "cheer"}], "fx": "snow"}, lines: [
      { who: "narrator", no: "Dagen etter snør det faktisk.", uk: "Наступного дня справді йде сніг.", en: "The next day it really does snow." },
      { who: "musa", no: "Snø i mai! Nå tror jeg på alt i Norge!", uk: "Сніг у травні! Тепер я вірю в усе в Норвегії!", en: "Snow in May! Now I will believe anything in Norway!" }
    ]}
  ],

  vocab: [
    ['været', 'погода', 'the weather'],
    ['regne', 'іти (про дощ)', 'to rain'],
    ['sola', 'сонце', 'the sun'],
    ['snø', 'сніг', 'snow'],
    ['hver dag', 'щодня', 'every day'],
    ['dårlig', 'поганий', 'bad'],
    ['klær', 'одяг', 'clothes'],
    ['en regnjakke', 'дощовик', 'a raincoat'],
    ['vant til', 'звиклий до', 'used to'],
    ['endelig', 'нарешті', 'finally'],
    ['nyte', 'насолоджуватися', 'to enjoy'],
    ['i morgen', 'завтра', 'tomorrow'],
    ["lete etter", "шукати", "to look for"],
    ["støvler", "чоботи", "boots"],
    ["vanntett", "непромокний", "waterproof"],
    ["dyr", "дорогий", "expensive"],
    ["våt – tørr", "мокрий – сухий", "wet – dry"],
    ["en kanelbolle", "булочка з корицею", "a cinnamon bun"]
  ],

  words: {
    no: { "skillingsbolle": "скіллінгсболле (бергенська булочка з корицею)", "kanel": "кориця", "bolle": "булочка", "kjent": "відомий", "støvler": "чоботи", "vanntett": "непромокна", "jakka": "куртка", "våt": "мокрий", "tørr": "сухий", "valg": "вибір", "klar": "готовий", "leter": "шукаєте", "snør": "іде сніг", "faktisk": "справді", "dyrt": "дорого", 'vel': 'хіба ж, правда ж', 'bergen': 'Берген', 'vant': 'звиклий', 'finnes': 'існує, буває', 'regnjakke': 'дощовик', 'skinner': 'світить', 'endelig': 'нарешті', 'elsker': 'люблю', 'nyt': 'насолоджуйся', 'mai': 'травень', 'london': 'Лондон', 'storbritannia': 'Велика Британія' },
    en: { "skillingsbolle": "skillingsbolle (Bergen cinnamon bun)", "kanel": "cinnamon", "bolle": "bun", "kjent": "famous", "støvler": "boots", "vanntett": "waterproof", "jakka": "the jacket", "våt": "wet", "tørr": "dry", "valg": "choice", "klar": "ready", "leter": "are looking", "snør": "is snowing", "faktisk": "actually, really", "dyrt": "expensive", 'vel': 'surely, right', 'bergen': 'Bergen', 'vant': 'used (to)', 'finnes': 'exists, there is', 'regnjakke': 'raincoat', 'skinner': 'is shining', 'endelig': 'finally', 'elsker': 'love', 'nyt': 'enjoy', 'mai': 'May', 'london': 'London', 'storbritannia': 'the United Kingdom' }
  }
});
