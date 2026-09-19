window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p119',
  level: 'A2',
  category: 'hverdag',
  title: 'Sykkelgalningen',
  titleUk: 'Велосипедний божевільний',
  titleEn: 'The Bike Maniac',
  summaryUk: 'Муса їздить велосипедом усюди — навіть у мінус десять. Шини він міняє щомісяця, а сусіди прозвали його «велобожевільним з Драммена».',
  summaryEn: 'Musa cycles everywhere — even at minus ten degrees. He changes his tyres every month, and the neighbours call him “the bike maniac from Drammen”.',
  summaryNo: 'Musa sykler overalt – selv i minus ti grader. Han bytter dekk hver måned, og naboene kaller ham «sykkelgalningen fra Drammen».',
  cover: 5,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'musa', x: 100, mood: 'grin', pose: 'cheer' }], props: [{ type: 'bike', x: 270 }] }, lines: [
      { who: 'narrator', no: 'Musa sykler overalt – til jobben, til butikken og til skolen.', uk: 'Муса їздить велосипедом усюди — на роботу, в магазин і до школи.', en: 'Musa cycles everywhere — to work, to the shop and to school.' },
      { who: 'musa', no: 'Bil er gøy, men sykkel er best!', uk: 'Машина — це круто, але велосипед — найкраще!', en: 'Cars are fun, but bikes are the best!' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 110, mood: 'surprised' }, { id: 'musa', x: 290, mood: 'grin', pose: 'hips' }], props: [{ type: 'officedesk', x: 110 }] }, lines: [
      { who: 'denys', no: 'Syklet du hit i dag også? Det er minus ti grader!', uk: 'Ти й сьогодні приїхав велосипедом? Мінус десять градусів!', en: 'Did you cycle here today too? It is minus ten degrees!' },
      { who: 'musa', no: 'Selvfølgelig! Jeg er ikke redd for kulda.', uk: 'Звичайно! Я не боюся холоду.', en: 'Of course! I am not afraid of the cold.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'musa', x: 110, mood: 'angry', pose: 'hips' }, { id: 'leo', x: 330, mood: 'grin' }], props: [{ type: 'bike', x: 220 }] }, lines: [
      { who: 'musa', no: 'Å nei! Punktering igjen!', uk: 'О ні! Знову пробите колесо!', en: 'Oh no! A flat tyre again!' },
      { who: 'leo', no: 'Pappa, det er tredje gang denne måneden!', uk: 'Тату, це вже втретє цього місяця!', en: 'Dad, that is the third time this month!' }
    ]},
    { art: {"bg": "street", "chars": [{"id": "musa", "x": 100, "mood": "grin", "pose": "hips"}, {"id": "leo", "x": 320, "mood": "happy", "pose": "cheer"}], "props": [{"type": "bike", "x": 215}, {"type": "backpack", "x": 60, "y": 270}]}, lines: [
      { who: "musa", no: "Ingen problem. Jeg har verktøy i sekken.", uk: "Без проблем. У мене в рюкзаку інструменти.", en: "No problem. I have tools in my backpack." },
      { who: "leo", no: "Kan jeg hjelpe deg, pappa?", uk: "Можна я тобі допоможу, тату?", en: "Can I help you, Dad?" },
      { who: "musa", no: "Ja! Hold sykkelen mens jeg tar av hjulet.", uk: "Так! Тримай велосипед, поки я знімаю колесо.", en: "Yes! Hold the bike while I take the wheel off." }
    ]},
    { art: {"bg": "street", "chars": [{"id": "musa", "x": 110, "mood": "sad"}, {"id": "leo", "x": 300, "mood": "grin", "pose": "hips"}], "props": [{"type": "bike", "x": 215}]}, lines: [
      { who: "musa", no: "Hmm, dekket er helt ødelagt. Vi må til sykkelbutikken.", uk: "Хм, шина зовсім зіпсована. Треба йти у веломагазин.", en: "Hmm, the tyre is completely ruined. We need to go to the bike shop." },
      { who: "leo", no: "Igjen?!", uk: "Знову?!", en: "Again?!" }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'grin' }, { id: 'musa', x: 340, pose: 'hold' }], props: [{ type: 'counter', x: 100 }, { type: 'bike', x: 235, s: 0.75, front: true }] }, lines: [
      { who: 'kasserer', no: 'Hei igjen, Musa! Trenger du nye dekk?', uk: 'Знову привіт, Мусо! Потрібні нові шини?', en: 'Hi again, Musa! Do you need new tyres?' },
      { who: 'musa', no: 'Ja, som vanlig. Jeg bytter dekk hver måned.', uk: 'Так, як завжди. Я міняю шини щомісяця.', en: 'Yes, as usual. I change my tyres every month.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, pose: 'point' }, { id: 'musa', x: 340, mood: 'grin' }], props: [{ type: 'counter', x: 100 }, { type: 'bike', x: 235, s: 0.75, studs: true, front: true }] }, lines: [
      { who: 'kasserer', no: 'Om vinteren anbefaler jeg piggdekk. Da sklir du ikke på isen.', uk: 'Взимку раджу шиповані шини. Тоді не будеш ковзати на льоду.', en: 'In winter I recommend studded tyres. Then you will not slip on the ice.' },
      { who: 'musa', no: 'Perfekt! Da kan jeg sykle enda fortere.', uk: 'Ідеально! Тоді я зможу їздити ще швидше.', en: 'Perfect! Then I can cycle even faster.' }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 100, "pose": "hold"}, {"id": "musa", "x": 340, "mood": "grin", "pose": "cheer"}], "props": [{"type": "counter", "x": 100}]}, lines: [
      { who: "kasserer", no: "Du trenger også lys og refleks. Det er mørkt om vinteren.", uk: "Тобі ще потрібні ліхтарі й світловідбивачі. Узимку темно.", en: "You also need lights and reflectors. It is dark in winter." },
      { who: "musa", no: "Jeg har tre lykter og en gul refleksvest!", uk: "У мене три ліхтарі й жовтий світловідбивний жилет!", en: "I have three lamps and a yellow hi-vis vest!" },
      { who: "kasserer", no: "Da ser alle deg!", uk: "Тоді тебе всі побачать!", en: "Then everyone will see you!" }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 100, "mood": "happy"}, {"id": "musa", "x": 340, "pose": "hold"}], "props": [{"type": "counter", "x": 100}, {"type": "phone", "x": 318, "y": 215, "front": true}]}, lines: [
      { who: "kasserer", no: "Det blir tolv hundre kroner til sammen.", uk: "Разом тисяча двісті крон.", en: "That will be twelve hundred kroner altogether." },
      { who: "musa", no: "Kan jeg betale med Vipps?", uk: "Можна заплатити через Vipps?", en: "Can I pay with Vipps?" },
      { who: "kasserer", no: "Selvfølgelig! Takk, og god tur!", uk: "Звичайно! Дякую, і гарної дороги!", en: "Of course! Thanks, and have a good ride!" }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'musa', x: 100, mood: 'grin', pose: 'cheer' }], props: [{ type: 'bike', x: 270, studs: true }], fx: 'snow' }, lines: [
      { who: 'musa', no: 'Snø, is og mørke – ingenting stopper meg!', uk: 'Сніг, лід і темрява — ніщо мене не зупинить!', en: 'Snow, ice and darkness — nothing stops me!' },
      { who: 'narrator', no: 'Naboene kaller ham «sykkelgalningen fra Drammen».', uk: 'Сусіди називають його «велобожевільним з Драммена».', en: 'The neighbours call him “the bike maniac from Drammen”.' }
    ]},
    { art: {"bg": "office", "chars": [{"id": "denys", "x": 110, "mood": "surprised"}, {"id": "musa", "x": 290, "mood": "grin", "pose": "hips"}], "props": [{"type": "officedesk", "x": 110}]}, lines: [
      { who: "denys", no: "Hvordan var sykkelturen i dag?", uk: "Як сьогодні покатався?", en: "How was the bike ride today?" },
      { who: "musa", no: "Fantastisk! Jeg syklet forbi tre biler i køen.", uk: "Фантастично! Я обігнав три машини в заторі.", en: "Fantastic! I rode past three cars in the queue." },
      { who: "denys", no: "Du er helt gal, Musa!", uk: "Ти зовсім божевільний, Мусо!", en: "You are completely mad, Musa!" }
    ]},
    { art: {"bg": "street", "chars": [{"id": "musa", "x": 100, "mood": "grin", "pose": "cheer"}, {"id": "leo", "x": 330, "mood": "happy", "pose": "cheer"}], "props": [{"type": "bike", "x": 215}], "fx": "stars"}, lines: [
      { who: "narrator", no: "Om våren er det sykkelløp i Drammen.", uk: "Навесні в Драммені проходить велогонка.", en: "In spring there is a bike race in Drammen." },
      { who: "musa", no: "Jeg skal vinne! Jeg har jo nye dekk – igjen!", uk: "Я переможу! У мене ж нові шини — знову!", en: "I am going to win! I have new tyres — again!" },
      { who: "leo", no: "Heia, pappa!", uk: "Вперед, тату!", en: "Go, Dad!" }
    ]}
  ],

  vocab: [
    ['en sykkel', 'велосипед', 'a bike'],
    ['sykle', 'їхати велосипедом', 'to cycle'],
    ['et dekk', 'шина', 'a tyre'],
    ['bytte', 'міняти', 'to change'],
    ['en punktering', 'проколоте колесо', 'a flat tyre'],
    ['piggdekk', 'шиповані шини', 'studded tyres'],
    ['is', 'лід', 'ice'],
    ['skli', 'ковзати', 'to slip'],
    ['kulda', 'холод', 'the cold'],
    ['minus ti grader', 'мінус десять градусів', 'minus ten degrees'],
    ['anbefale', 'радити', 'to recommend'],
    ['overalt', 'усюди', 'everywhere'],
    ["verktøy", "інструменти", "tools"],
    ["et hjul", "колесо", "a wheel"],
    ["ødelagt", "зламаний, зіпсований", "broken, ruined"],
    ["en refleks", "світловідбивач", "a reflector"],
    ["ei lykt", "ліхтар", "a lamp"],
    ["en kø", "черга, затор", "a queue"],
    ["et sykkelløp", "велогонка", "a bike race"]
  ],

  words: {
    no: { "problem": "проблема", "verktøy": "інструменти", "sekken": "рюкзак", "hold": "тримай", "mens": "поки", "hjulet": "колесо", "hmm": "хм", "dekket": "шина", "ødelagt": "зіпсований", "sykkelbutikken": "веломагазин", "lys": "світло, ліхтарі", "refleks": "світловідбивач", "mørkt": "темно", "lykter": "ліхтарі", "gul": "жовтий", "refleksvest": "світловідбивний жилет", "alle": "усі", "hundre": "сто", "sammen": "разом (til sammen)", "vipps": "Vipps (застосунок для оплати)", "tur": "поїздка", "sykkelturen": "велопрогулянка", "forbi": "повз", "køen": "затор, черга", "gal": "божевільний", "våren": "весна", "sykkelløp": "велогонка", "vinne": "перемогти", "heia": "вперед!", 'best': 'найкращий', 'sykler': 'їздить велосипедом', 'overalt': 'усюди', 'gøy': 'весело, круто', 'sykkel': 'велосипед', 'syklet': 'їхав велосипедом', 'hit': 'сюди', 'minus': 'мінус', 'grader': 'градуси', 'redd': 'наляканий (være redd — боятися)', 'kulda': 'холод', 'punktering': 'проколоте колесо', 'tredje': 'третій', 'dekk': 'шини', 'vanlig': 'звичайно (som vanlig — як завжди)', 'bytter': 'міняю', 'anbefaler': 'раджу', 'piggdekk': 'шиповані шини', 'sklir': 'ковзаєш', 'isen': 'лід', 'perfekt': 'ідеально', 'enda': 'ще (з порівнянням)', 'mørke': 'темрява', 'ingenting': 'ніщо', 'stopper': 'зупиняє', 'naboene': 'сусіди', 'kaller': 'називають', 'sykkelgalningen': 'велобожевільний', 'drammen': 'Драммен', 'sykle': 'їхати велосипедом' },
    en: { "problem": "problem", "verktøy": "tools", "sekken": "the backpack", "hold": "hold", "mens": "while", "hjulet": "the wheel", "hmm": "hmm", "dekket": "the tyre", "ødelagt": "ruined", "sykkelbutikken": "the bike shop", "lys": "lights", "refleks": "reflector", "mørkt": "dark", "lykter": "lamps", "gul": "yellow", "refleksvest": "hi-vis vest", "alle": "everyone", "hundre": "hundred", "sammen": "together (til sammen — altogether)", "vipps": "Vipps (payment app)", "tur": "trip, ride", "sykkelturen": "the bike ride", "forbi": "past", "køen": "the queue", "gal": "mad", "våren": "spring", "sykkelløp": "bike race", "vinne": "win", "heia": "go! (cheer)", 'best': 'best', 'sykler': 'cycles', 'overalt': 'everywhere', 'gøy': 'fun', 'sykkel': 'bike', 'syklet': 'cycled', 'hit': 'here', 'minus': 'minus', 'grader': 'degrees', 'redd': 'afraid', 'kulda': 'the cold', 'punktering': 'flat tyre', 'tredje': 'third', 'dekk': 'tyres', 'vanlig': 'usual (som vanlig — as usual)', 'bytter': 'change', 'anbefaler': 'recommend', 'piggdekk': 'studded tyres', 'sklir': 'slip', 'isen': 'the ice', 'perfekt': 'perfect', 'enda': 'even (with comparatives)', 'mørke': 'darkness', 'ingenting': 'nothing', 'stopper': 'stops', 'naboene': 'the neighbours', 'kaller': 'call', 'sykkelgalningen': 'the bike maniac', 'drammen': 'Drammen', 'sykle': 'cycle' }
  }
});
