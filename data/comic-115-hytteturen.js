window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p115',
  level: 'A2',
  category: 'fritid',
  title: 'Hytteturen',
  titleUk: 'Поїздка в хатинку',
  titleEn: 'The Cabin Trip',
  summaryUk: 'Марія кличе Мусу на вихідні в гірську хатинку — без електрики, зате з какао, вафлями й норвезьким затишком.',
  summaryEn: 'Maria invites Musa to a mountain cabin for the weekend — no electricity, but hot chocolate, waffles and Norwegian cosiness.',
  summaryNo: 'Maria inviterer Musa på hyttetur i helga – uten strøm, men med kakao, vafler og norsk kos.',
  cover: 3,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'point' }, { id: 'musa', x: 290 }], props: [{ type: 'officedesk', x: 290 }] }, lines: [
      { who: 'maria', no: 'I helga skal vi på hyttetur. Vil du bli med?', uk: 'На вихідних ми їдемо в хатинку. Хочеш з нами?', en: 'This weekend we are going to a cabin. Do you want to come along?' },
      { who: 'musa', no: 'Ja, gjerne! Men hva er en hytte?', uk: 'Так, залюбки! А що таке «гютте»?', en: 'Yes, I would love to! But what is a “hytte”?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, mood: 'grin' }, { id: 'musa', x: 290, mood: 'surprised', pose: 'hold' }], props: [{ type: 'phone', x: 265, y: 215, front: true }] }, lines: [
      { who: 'maria', no: 'Det er et lite hus på fjellet. Det er ikke strøm der.', uk: 'Це маленький будиночок у горах. Там немає електрики.', en: 'It is a small house in the mountains. There is no electricity there.' },
      { who: 'musa', no: 'Ingen strøm? Hva med mobilen min?', uk: 'Без електрики? А як же мій телефон?', en: 'No electricity? What about my phone?' }
    ]},
    { art: { bg: 'mountain', chars: [{ id: 'maria', x: 120, pose: 'walk' }, { id: 'musa', x: 280, mood: 'sad', pose: 'walk' }], props: [{ type: 'backpack', x: 300, y: 250 }] }, lines: [
      { who: 'maria', no: 'Nå går vi to kilometer til. Er du sliten?', uk: 'Ще два кілометри. Ти втомився?', en: 'Two more kilometres to go. Are you tired?' },
      { who: 'musa', no: 'Litt, men utsikten er fantastisk!', uk: 'Трохи, але краєвид фантастичний!', en: 'A little, but the view is fantastic!' }
    ]},
    { art: { bg: 'mountain', chars: [{ id: 'maria', x: 120, mood: 'happy', pose: 'hold' }, { id: 'musa', x: 280, mood: 'happy' }], props: [{ type: 'thermos', x: 150, y: 240, front: true }, { type: 'mug', x: 255, y: 240, front: true }] }, lines: [
      { who: 'maria', no: 'Vi tar en pause. Vil du ha varm kakao?', uk: 'Зробимо перерву. Хочеш гарячого какао?', en: 'Let us take a break. Would you like some hot chocolate?' },
      { who: 'musa', no: 'Ja takk! I England drikker vi te, men dette er også godt.', uk: 'Так, дякую! В Англії ми п’ємо чай, але це теж смачно.', en: 'Yes please! In England we drink tea, but this is good too.' }
    ]},
    { art: {"bg": "mountain", "chars": [{"id": "musa", "x": 120, "mood": "surprised"}, {"id": "maria", "x": 290, "mood": "grin", "pose": "point"}]}, lines: [
      { who: "narrator", no: "Endelig kommer de fram til hytta.", uk: "Нарешті вони дістаються до хатинки.", en: "At last they reach the cabin." },
      { who: "musa", no: "Den er så liten! Hvor er toalettet?", uk: "Яка вона маленька! А де туалет?", en: "It is so small! Where is the toilet?" },
      { who: "maria", no: "Utedoen er der borte.", uk: "Туалет надворі — он там.", en: "The outdoor toilet is over there." }
    ]},
    { art: {"bg": "mountain", "chars": [{"id": "musa", "x": 120, "mood": "surprised", "pose": "hips"}, {"id": "maria", "x": 290, "mood": "happy"}]}, lines: [
      { who: "musa", no: "Et toalett ute i kulda?", uk: "Туалет надворі, на холоді?", en: "A toilet outside in the cold?" },
      { who: "maria", no: "Ja! Det er en del av hyttelivet.", uk: "Так! Це частина життя в хатинці.", en: "Yes! It is part of cabin life." }
    ]},
    { art: {"bg": "forest", "chars": [{"id": "maria", "x": 110, "pose": "hold"}, {"id": "musa", "x": 290, "mood": "grin", "pose": "hips"}]}, lines: [
      { who: "maria", no: "Nå må vi hente vann i bekken og hugge ved.", uk: "Тепер треба принести води з струмка й нарубати дров.", en: "Now we must fetch water from the stream and chop firewood." },
      { who: "musa", no: "Dette er jo som en treningsleir!", uk: "Та це ж як тренувальний табір!", en: "This is like a training camp!" }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 120, mood: 'grin', pose: 'hold' }, { id: 'musa', x: 280, mood: 'happy', pose: 'cheer' }], props: [{ type: 'table', x: 200 }, { type: 'waffles', x: 200, y: 245 }], fx: 'hearts' }, lines: [
      { who: 'maria', no: 'I kveld lager vi vafler og spiller kort.', uk: 'Сьогодні ввечері печемо вафлі й граємо в карти.', en: 'Tonight we are making waffles and playing cards.' },
      { who: 'musa', no: 'Dette er skikkelig koselig!', uk: 'Це по-справжньому затишно!', en: 'This is really cosy!' }
    ]},
    { art: {"bg": "mountain", "chars": [{"id": "musa", "x": 120, "mood": "surprised", "pose": "point"}, {"id": "maria", "x": 290, "mood": "happy", "pose": "cheer"}], "fx": "stars"}, lines: [
      { who: "narrator", no: "Om kvelden går de ut og ser på himmelen.", uk: "Увечері вони виходять надвір і дивляться на небо.", en: "In the evening they go outside and look at the sky." },
      { who: "musa", no: "Se! Det er nordlys!", uk: "Дивись! Це північне сяйво!", en: "Look! It is the northern lights!" },
      { who: "maria", no: "Du er heldig. Det ser man ikke hver dag.", uk: "Тобі пощастило. Таке бачиш не щодня.", en: "You are lucky. You do not see that every day." }
    ]},
    { art: { bg: 'home', chars: [{ id: 'musa', x: 120, mood: 'grin', pose: 'hips' }, { id: 'maria', x: 280, mood: 'happy', pose: 'wave' }], props: [{ type: 'sofa', x: 200 }] }, lines: [
      { who: 'musa', no: 'Vet du hva? Jeg savner ikke mobilen i det hele tatt.', uk: 'Знаєш що? Я зовсім не сумую за телефоном.', en: 'You know what? I do not miss my phone at all.' },
      { who: 'maria', no: 'Velkommen til Norge, Musa!', uk: 'Ласкаво просимо до Норвегії, Мусо!', en: 'Welcome to Norway, Musa!' }
    ]},
    { art: {"bg": "mountain", "chars": [{"id": "musa", "x": 120, "mood": "grin", "pose": "walk"}, {"id": "maria", "x": 290, "mood": "happy", "pose": "walk"}], "props": [{"type": "backpack", "x": 140, "y": 250}]}, lines: [
      { who: "narrator", no: "På søndag går de ned fra fjellet.", uk: "У неділю вони спускаються з гори.", en: "On Sunday they walk down the mountain." },
      { who: "musa", no: "Neste helg vil jeg på hyttetur igjen!", uk: "Наступних вихідних я знову хочу в хатинку!", en: "Next weekend I want to go to the cabin again!" },
      { who: "maria", no: "Da må du kjøpe dine egne ski.", uk: "Тоді тобі доведеться купити власні лижі.", en: "Then you will have to buy your own skis." }
    ]},
    { art: {"bg": "mountain", "chars": [{"id": "musa", "x": 200, "mood": "grin", "pose": "cheer"}], "fx": "hearts"}, lines: [
      { who: "musa", no: "Ski, piggdekk, regnjakke … Norge er et dyrt, men fantastisk land!", uk: "Лижі, шиповані шини, дощовик… Норвегія — дорога, але фантастична країна!", en: "Skis, studded tyres, a raincoat… Norway is an expensive but fantastic country!" }
    ]}
  ],

  vocab: [
    ['ei hytte', 'хатинка, дача', 'a cabin'],
    ['en hyttetur', 'поїздка в хатинку', 'a cabin trip'],
    ['et fjell', 'гора', 'a mountain'],
    ['strøm', 'електрика', 'electricity'],
    ['sliten', 'втомлений', 'tired'],
    ['en utsikt', 'краєвид', 'a view'],
    ['en pause', 'перерва', 'a break'],
    ['kakao', 'какао', 'hot chocolate'],
    ['vafler', 'вафлі', 'waffles'],
    ['koselig', 'затишний', 'cosy'],
    ['savne', 'сумувати за', 'to miss'],
    ['bli med', 'піти / поїхати разом', 'to come along'],
    ["en utedo", "туалет надворі", "an outdoor toilet"],
    ["en bekk", "струмок", "a stream"],
    ["hugge ved", "рубати дрова", "to chop firewood"],
    ["nordlys", "північне сяйво", "the northern lights"],
    ["heldig", "щасливий, везучий", "lucky"],
    ["himmelen", "небо", "the sky"]
  ],

  words: {
    no: { "fram": "до (komme fram — дістатися)", "toalettet": "туалет", "utedoen": "туалет надворі", "borte": "там (der borte)", "del": "частина", "hyttelivet": "життя в хатинці", "vann": "вода", "bekken": "струмок", "hugge": "рубати", "ved": "дрова", "jo": "ж, адже", "treningsleir": "тренувальний табір", "himmelen": "небо", "nordlys": "північне сяйво", "heldig": "щасливий", "søndag": "неділя", "ned": "вниз", "neste": "наступний", "dine": "твої", "egne": "власні", "land": "країна", "regnjakke": "дощовик", "piggdekk": "шиповані шини", 'hyttetur': 'поїздка в хатинку', 'hytte': 'хатинка', 'fjellet': 'гори', 'strøm': 'електрика', 'mobilen': 'мобільний телефон', 'kilometer': 'кілометри', 'sliten': 'втомлений', 'utsikten': 'краєвид', 'fantastisk': 'фантастичний', 'pause': 'перерва', 'kakao': 'какао', 'england': 'Англія', 'drikker': 'п’ємо', 'vafler': 'вафлі', 'kort': 'карти', 'skikkelig': 'по-справжньому', 'koselig': 'затишно', 'savner': 'сумую', 'hele': 'цілий', 'tatt': 'взятий (i det hele tatt — зовсім)' },
    en: { "fram": "forward (komme fram — arrive)", "toalettet": "the toilet", "utedoen": "the outdoor toilet", "borte": "over there (der borte)", "del": "part", "hyttelivet": "cabin life", "vann": "water", "bekken": "the stream", "hugge": "chop", "ved": "firewood", "jo": "after all, really", "treningsleir": "training camp", "himmelen": "the sky", "nordlys": "northern lights", "heldig": "lucky", "søndag": "Sunday", "ned": "down", "neste": "next", "dine": "your", "egne": "own", "land": "country", "regnjakke": "raincoat", "piggdekk": "studded tyres", 'hyttetur': 'cabin trip', 'hytte': 'cabin', 'fjellet': 'the mountains', 'strøm': 'electricity', 'mobilen': 'the mobile phone', 'kilometer': 'kilometres', 'sliten': 'tired', 'utsikten': 'the view', 'fantastisk': 'fantastic', 'pause': 'break', 'kakao': 'hot chocolate', 'england': 'England', 'drikker': 'drink', 'vafler': 'waffles', 'kort': 'cards', 'skikkelig': 'really', 'koselig': 'cosy', 'savner': 'miss', 'hele': 'whole', 'tatt': 'taken (i det hele tatt — at all)' }
  }
});
