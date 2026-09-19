window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p117',
  level: 'A2',
  category: 'familie',
  title: 'I barnehagen',
  titleUk: 'У дитсадку',
  titleEn: 'At Kindergarten',
  summaryUk: 'Аліна приводить Мію в дитсадок: дощовий одяг, застуда і коли забирати дитину.',
  summaryEn: 'Alina drops Mia off at kindergarten: rain clothes, a little cold and when to pick her up.',
  summaryNo: 'Alina leverer Mia i barnehagen: regntøy, forkjølelse og når hun skal hentes.',
  cover: 5,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'alina', x: 130, pose: 'walk' }, { id: 'mia', x: 250, mood: 'happy', pose: 'walk' }], props: [{ type: 'backpack', x: 270, y: 250 }] }, lines: [
      { who: 'narrator', no: 'Det er mandag morgen. Alina følger Mia til barnehagen.', uk: 'Понеділок, ранок. Аліна веде Мію в дитсадок.', en: 'It is Monday morning. Alina takes Mia to kindergarten.' },
      { who: 'alina', no: 'Har du med deg sekken din, Mia?', uk: 'Ти взяла свій рюкзак, Міє?', en: 'Have you got your backpack, Mia?' },
      { who: 'mia', no: 'Ja, mamma!', uk: 'Так, мамо!', en: 'Yes, Mum!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'mia', x: 260, mood: 'grin', pose: 'cheer' }, { id: 'alina', x: 345 }] }, lines: [
      { who: 'laerer', no: 'God morgen, Mia! Så fint å se deg!', uk: 'Доброго ранку, Міє! Як приємно тебе бачити!', en: 'Good morning, Mia! How nice to see you!' },
      { who: 'mia', no: 'Hei! Kan jeg leke ute?', uk: 'Привіт! Можна мені гратися надворі?', en: 'Hi! Can I play outside?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'laerer', x: 110, pose: 'point' }, { id: 'alina', x: 290, pose: 'hold' }], props: [{ type: 'umbrella', x: 290, front: true }], fx: 'rain' }, lines: [
      { who: 'laerer', no: 'Ja, men først må du ta på deg regntøyet. Det regner i dag.', uk: 'Так, але спершу вдягни дощовий одяг. Сьогодні дощ.', en: 'Yes, but first you must put on your rain clothes. It is raining today.' },
      { who: 'alina', no: 'Regntøyet ligger i sekken.', uk: 'Дощовий одяг у рюкзаку.', en: 'The rain clothes are in the backpack.' }
    ]},
    { art: {"bg": "park", "chars": [{"id": "laerer", "x": 110, "mood": "happy", "pose": "point"}, {"id": "mia", "x": 280, "mood": "grin", "pose": "cheer"}], "fx": "rain"}, lines: [
      { who: "laerer", no: "I dag skal vi lage bål og grille pølser i skogen.", uk: "Сьогодні ми розпалимо багаття й посмажимо сосиски в лісі.", en: "Today we are going to make a campfire and grill sausages in the forest." },
      { who: "mia", no: "Jippi! Jeg elsker pølser!", uk: "Ура! Я обожнюю сосиски!", en: "Yippee! I love sausages!" }
    ]},
    { art: {"bg": "park", "chars": [{"id": "alina", "x": 110, "mood": "surprised"}, {"id": "laerer", "x": 290, "mood": "happy", "pose": "hips"}]}, lines: [
      { who: "alina", no: "Lager dere bål med så små barn?", uk: "Ви розпалюєте багаття з такими малими дітьми?", en: "You make campfires with such small children?" },
      { who: "laerer", no: "Ja, trygt og med voksne. Barna lærer mye ute i naturen.", uk: "Так, безпечно й з дорослими. Діти багато вчаться на природі.", en: "Yes, safely and with adults. The children learn a lot outdoors in nature." }
    ]},
    { art: { bg: 'park', chars: [{ id: 'alina', x: 110, mood: 'sad' }, { id: 'laerer', x: 290, pose: 'hips' }] }, lines: [
      { who: 'alina', no: 'Mia er litt forkjølet. Kan hun være ute i dag?', uk: 'Мія трохи застуджена. Їй можна бути надворі сьогодні?', en: 'Mia has a bit of a cold. Can she be outside today?' },
      { who: 'laerer', no: 'Ja, det går fint. Hvis hun får feber, ringer vi deg.', uk: 'Так, усе гаразд. Якщо в неї буде температура, ми тобі зателефонуємо.', en: 'Yes, that is fine. If she gets a fever, we will call you.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'alina', x: 110, pose: 'hold' }, { id: 'laerer', x: 290, mood: 'happy' }] }, lines: [
      { who: 'alina', no: 'Når må jeg hente henne?', uk: 'Коли мені її забрати?', en: 'When do I have to pick her up?' },
      { who: 'laerer', no: 'Barnehagen stenger klokka fem, men mange henter klokka fire.', uk: 'Дитсадок зачиняється о п’ятій, але багато хто забирає о четвертій.', en: 'The kindergarten closes at five, but many pick up at four.' }
    ]},
    { art: {"bg": "park", "chars": [{"id": "laerer", "x": 110, "pose": "hold"}, {"id": "alina", "x": 290, "mood": "happy"}], "props": [{"type": "note", "x": 140, "y": 225, "front": true}]}, lines: [
      { who: "laerer", no: "Husk at vi har foreldremøte på torsdag.", uk: "Пам’ятайте, у четвер батьківські збори.", en: "Remember we have a parents’ meeting on Thursday." },
      { who: "alina", no: "Takk! Hva skal vi snakke om?", uk: "Дякую! Про що будемо говорити?", en: "Thanks! What will we talk about?" },
      { who: "laerer", no: "Om turer, mat og det nye året.", uk: "Про прогулянки, їжу й новий рік.", en: "About trips, food and the new year." }
    ]},
    { art: {"bg": "park", "chars": [{"id": "alina", "x": 110, "pose": "hold"}, {"id": "laerer", "x": 290, "pose": "point"}], "props": [{"type": "backpack", "x": 130, "y": 250}]}, lines: [
      { who: "alina", no: "Mangler Mia noe i garderoben?", uk: "Мії чогось бракує в шафці?", en: "Is Mia missing anything in her cubby?" },
      { who: "laerer", no: "Ja, ekstra sokker, en genser og en lue.", uk: "Так, запасних шкарпеток, светра й шапки.", en: "Yes, extra socks, a sweater and a hat." }
    ]},
    { art: { bg: 'park', chars: [{ id: 'mia', x: 140, mood: 'happy', pose: 'wave' }, { id: 'alina', x: 290, mood: 'happy', pose: 'wave' }], fx: 'hearts' }, lines: [
      { who: 'mia', no: 'Ha det, mamma! Jeg er glad i deg!', uk: 'Бувай, мамо! Я тебе люблю!', en: 'Bye, Mum! I love you!' },
      { who: 'alina', no: 'Ha det bra, vennen min! Kos deg!', uk: 'Бувай, сонечко! Гарного дня!', en: 'Bye, sweetie! Have fun!' }
    ]},
    { art: {"bg": "park", "chars": [{"id": "mia", "x": 130, "mood": "grin", "pose": "cheer"}, {"id": "alina", "x": 290, "mood": "surprised"}]}, lines: [
      { who: "narrator", no: "Klokka fire kommer Alina tilbake.", uk: "О четвертій Аліна повертається.", en: "At four o’clock Alina comes back." },
      { who: "mia", no: "Mamma! Jeg har vært ute hele dagen!", uk: "Мамо! Я була надворі цілий день!", en: "Mum! I have been outside all day!" },
      { who: "alina", no: "Du er helt skitten! Men du ser så glad ut.", uk: "Ти вся брудна! Але в тебе такий щасливий вигляд.", en: "You are completely dirty! But you look so happy." }
    ]},
    { art: {"bg": "forest", "chars": [{"id": "mia", "x": 130, "mood": "grin", "pose": "cheer"}, {"id": "alina", "x": 290, "mood": "happy", "pose": "wave"}], "props": [{"type": "elg", "x": 340, "s": 0.5}]}, lines: [
      { who: "mia", no: "Vi grillet pølser og så en elg i skogen!", uk: "Ми смажили сосиски й бачили лося в лісі!", en: "We grilled sausages and saw a moose in the forest!" },
      { who: "alina", no: "En elg? For et eventyr! Nå går vi hjem og spiser middag.", uk: "Лося? Оце пригода! А тепер ідемо додому вечеряти.", en: "A moose? What an adventure! Now let us go home and have dinner." }
    ]}
  ],

  vocab: [
    ['en barnehage', 'дитсадок', 'a kindergarten'],
    ['en sekk', 'рюкзак', 'a backpack'],
    ['regntøy', 'дощовий одяг', 'rain clothes'],
    ['leke', 'гратися', 'to play'],
    ['ute', 'надворі', 'outside'],
    ['forkjølet', 'застуджений', 'having a cold'],
    ['feber', 'температура, гарячка', 'a fever'],
    ['hente', 'забирати', 'to pick up'],
    ['stenge', 'зачинятися', 'to close'],
    ['følge', 'проводжати', 'to walk someone (to)'],
    ['være glad i', 'любити', 'to love'],
    ['kose seg', 'гарно проводити час', 'to have a nice time'],
    ["et bål", "багаття", "a campfire"],
    ["ei pølse", "сосиска", "a sausage"],
    ["et foreldremøte", "батьківські збори", "a parents’ meeting"],
    ["sokker", "шкарпетки", "socks"],
    ["ei lue", "шапка", "a hat"],
    ["skitten", "брудний", "dirty"],
    ["en elg", "лось", "a moose"]
  ],

  words: {
    no: { "bål": "багаття", "grille": "смажити на грилі", "pølser": "сосиски", "skogen": "ліс", "jippi": "ура", "elsker": "обожнюю", "dere": "ви", "trygt": "безпечно", "voksne": "дорослі", "naturen": "природа", "foreldremøte": "батьківські збори", "turer": "прогулянки", "mat": "їжа", "året": "рік", "mangler": "бракує", "garderoben": "шафка, гардероб", "ekstra": "запасні", "sokker": "шкарпетки", "genser": "светр", "lue": "шапка", "vært": "була", "skitten": "брудна", "grillet": "смажили", "elg": "лось", "eventyr": "пригода", "middag": "вечеря, обід", 'følger': 'проводжає, веде', 'barnehagen': 'дитсадок', 'sekken': 'рюкзак', 'leke': 'гратися', 'regntøyet': 'дощовий одяг', 'forkjølet': 'застуджена', 'feber': 'температура', 'ringer': 'зателефонуємо', 'stenger': 'зачиняється', 'vennen': 'друже, сонечко (ласкаво)', 'kos': 'розважайся', 'henne': 'її', 'henter': 'забирають' },
    en: { "bål": "campfire", "grille": "grill", "pølser": "sausages", "skogen": "the forest", "jippi": "yippee", "elsker": "love", "dere": "you (plural)", "trygt": "safely", "voksne": "adults", "naturen": "nature", "foreldremøte": "parents’ meeting", "turer": "trips", "mat": "food", "året": "the year", "mangler": "is missing", "garderoben": "the cubby, the cloakroom", "ekstra": "extra", "sokker": "socks", "genser": "sweater", "lue": "hat", "vært": "been", "skitten": "dirty", "grillet": "grilled", "elg": "moose", "eventyr": "adventure", "middag": "dinner", 'følger': 'takes, walks', 'barnehagen': 'the kindergarten', 'sekken': 'the backpack', 'leke': 'play', 'regntøyet': 'the rain clothes', 'forkjølet': 'has a cold', 'feber': 'fever', 'ringer': 'call', 'stenger': 'closes', 'vennen': 'sweetie (lit. friend)', 'kos': 'enjoy', 'henne': 'her', 'henter': 'pick up' }
  }
});
