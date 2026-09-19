/*
 * Англійський курс — окремі історії в ІНШОМУ стилі коміксу (`style: 'strip'`: растрові крапки, рамка,
 * прямокутні бульбашки, інший шрифт). Структура як у норвезьких коміксів, але репліки:
 *   { who, en, uk, no } — en показується в кадрі, uk і no з’являються при наведенні.
 * vocab: [en, uk, no]. Нова історія — додайте об’єкт у ENGLISH.comics.
 */
window.ENGLISH = {
  comics: [
    {
      id: 'e1', level: 'A1', category: 'skole', style: 'strip',
      title: 'A New Friend at School', titleUk: 'Новий друг у школі', titleNo: 'En ny venn på skolen',
      summaryUk: 'Перший день у новій школі: як привітатися, назвати своє ім’я, вік і звідки ти.',
      summaryEn: 'The first day at a new school: how to say hello, give your name, age and where you are from.',
      cover: 0,
      panels: [
        { art: { bg: 'school', board: 'WELCOME!', clock: false, chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'nora', x: 310, mood: 'surprised' }] }, lines: [
          { who: 'laerer', en: 'Good morning! Welcome to our class.', uk: 'Доброго ранку! Ласкаво просимо до нашого класу.', no: 'God morgen! Velkommen til klassen vår.' },
          { who: 'nora', en: 'Hello! Thank you.', uk: 'Привіт! Дякую.', no: 'Hei! Takk.' }
        ]},
        { art: { bg: 'school', board: 'WELCOME!', clock: false, chars: [{ id: 'leo', x: 100, mood: 'happy', pose: 'wave' }, { id: 'nora', x: 310, mood: 'happy' }] }, lines: [
          { who: 'leo', en: 'Hi! What is your name?', uk: 'Привіт! Як тебе звати?', no: 'Hei! Hva heter du?' },
          { who: 'nora', en: 'My name is Nora. What is your name?', uk: 'Мене звати Нора. А тебе як?', no: 'Jeg heter Nora. Hva heter du?' }
        ]},
        { art: { bg: 'school', board: 'WELCOME!', clock: false, chars: [{ id: 'leo', x: 100, mood: 'grin', pose: 'hips' }, { id: 'nora', x: 310, mood: 'happy', pose: 'wave' }] }, lines: [
          { who: 'leo', en: 'I am Leo. Nice to meet you!', uk: 'Я Лео. Приємно познайомитися!', no: 'Jeg er Leo. Hyggelig å møte deg!' },
          { who: 'nora', en: 'Nice to meet you too.', uk: 'Мені теж приємно.', no: 'Hyggelig å møte deg også.' }
        ]},
        { art: { bg: 'school', board: 'HOW OLD?', clock: false, chars: [{ id: 'leo', x: 100, pose: 'point' }, { id: 'nora', x: 310, mood: 'happy', pose: 'hold' }] }, lines: [
          { who: 'leo', en: 'How old are you?', uk: 'Скільки тобі років?', no: 'Hvor gammel er du?' },
          { who: 'nora', en: 'I am nine years old. And you?', uk: 'Мені дев’ять років. А тобі?', no: 'Jeg er ni år gammel. Og du?' }
        ]},
        { art: { bg: 'school', board: 'WHERE FROM?', clock: false, chars: [{ id: 'leo', x: 100, mood: 'happy' }, { id: 'humphrey', x: 300, mood: 'grin', pose: 'wave' }] }, lines: [
          { who: 'leo', en: 'I am ten. Where are you from, Humphrey?', uk: 'Мені десять. Звідки ти, Гамфрі?', no: 'Jeg er ti. Hvor kommer du fra, Humphrey?' },
          { who: 'humphrey', en: 'I am from Kenya, but I live here now.', uk: 'Я з Кенії, але зараз живу тут.', no: 'Jeg er fra Kenya, men jeg bor her nå.' }
        ]},
        { art: { bg: 'park', chars: [{ id: 'leo', x: 90, mood: 'grin', pose: 'cheer' }, { id: 'nora', x: 210, mood: 'grin', pose: 'wave' }, { id: 'humphrey', x: 330, mood: 'happy', pose: 'hold' }], props: [{ type: 'ball', x: 150 }], fx: 'stars' }, lines: [
          { who: 'nora', en: 'Can we play together after school?', uk: 'Можемо пограти разом після школи?', no: 'Kan vi leke sammen etter skolen?' },
          { who: 'humphrey', en: 'Yes, of course! See you at three.', uk: 'Так, звісно! Побачимось о третій.', no: 'Ja, selvfølgelig! Vi ses klokka tre.' }
        ]}
      ],
      vocab: [
        ['hello', 'привіт', 'hei'], ['good morning', 'доброго ранку', 'god morgen'], ['welcome', 'ласкаво просимо', 'velkommen'],
        ['thank you', 'дякую', 'takk'], ['what is your name', 'як тебе звати', 'hva heter du'], ['my name is', 'мене звати', 'jeg heter'],
        ['nice to meet you', 'приємно познайомитися', 'hyggelig å møte deg'], ['how old are you', 'скільки тобі років', 'hvor gammel er du'],
        ['years old', 'років (про вік)', 'år gammel'], ['where are you from', 'звідки ти', 'hvor kommer du fra'], ['I live here', 'я живу тут', 'jeg bor her'],
        ['play together', 'гратися разом', 'leke sammen'], ['after school', 'після школи', 'etter skolen'], ['of course', 'звісно', 'selvfølgelig'],
        ['see you', 'до зустрічі', 'vi ses'], ['friend', 'друг', 'venn'], ['class', 'клас', 'klasse'], ['too', 'теж', 'også']
      ]
    },
    {
      id: 'e2', level: 'A1', category: 'butikk', style: 'strip',
      title: 'At the Supermarket', titleUk: 'У супермаркеті', titleNo: 'I supermarkedet',
      summaryUk: 'Покупки англійською: як попросити, скільки коштує, порахувати решту й подякувати.',
      summaryEn: 'Shopping in English: asking for things, prices, change and saying thank you.',
      cover: 1,
      panels: [
        { art: { bg: 'shop', chars: [{ id: 'mia', x: 110, mood: 'happy', pose: 'hold' }, { id: 'mamma', x: 300, mood: 'happy', pose: 'point' }], props: [{ type: 'basket', x: 110, y: 240, front: true }] }, lines: [
          { who: 'mamma', en: 'We need milk, bread and six apples.', uk: 'Нам потрібні молоко, хліб і шість яблук.', no: 'Vi trenger melk, brød og seks epler.' },
          { who: 'mia', en: 'I can find the apples!', uk: 'Я можу знайти яблука!', no: 'Jeg kan finne eplene!' }
        ]},
        { art: { bg: 'shop', chars: [{ id: 'mia', x: 120, mood: 'grin', pose: 'cheer' }], props: [{ type: 'apples', x: 290, y: 200, n: 6 }] }, lines: [
          { who: 'narrator', en: 'The apples are on the shelf.', uk: 'Яблука лежать на полиці.', no: 'Eplene ligger i hylla.' },
          { who: 'mia', en: 'One, two, three, four, five, six. Done!', uk: 'Один, два, три, чотири, п’ять, шість. Готово!', no: 'En, to, tre, fire, fem, seks. Ferdig!' }
        ]},
        { art: { bg: 'shop', chars: [{ id: 'mia', x: 100, pose: 'point' }, { id: 'kasserer', x: 310, mood: 'happy' }], props: [{ type: 'counter', x: 205 }] }, lines: [
          { who: 'mia', en: 'Excuse me, how much is the bread?', uk: 'Перепрошую, скільки коштує хліб?', no: 'Unnskyld, hva koster brødet?' },
          { who: 'kasserer', en: 'It is two pounds fifty.', uk: 'Два фунти п’ятдесят.', no: 'Det koster to pund og femti.' }
        ]},
        { art: { bg: 'shop', chars: [{ id: 'mia', x: 100, mood: 'happy', pose: 'hold' }, { id: 'kasserer', x: 310, pose: 'point' }], props: [{ type: 'counter', x: 205 }, { type: 'coins', x: 205, y: 205, front: true }] }, lines: [
          { who: 'kasserer', en: 'That is eight pounds altogether, please.', uk: 'Разом вісім фунтів, будь ласка.', no: 'Det blir åtte pund til sammen.' },
          { who: 'mia', en: 'Here you are. I have a ten pound note.', uk: 'Ось, будь ласка. У мене десять фунтів.', no: 'Vær så god. Jeg har en ti-punds seddel.' }
        ]},
        { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'happy', pose: 'hold' }, { id: 'mia', x: 310, mood: 'grin' }], props: [{ type: 'counter', x: 205 }] }, lines: [
          { who: 'kasserer', en: 'Your change is two pounds. Thank you!', uk: 'Ваша решта — два фунти. Дякую!', no: 'Du får to pund tilbake. Takk!' },
          { who: 'mia', en: 'Thank you very much. Goodbye!', uk: 'Щиро дякую. До побачення!', no: 'Tusen takk. Ha det!' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'mia', x: 100, mood: 'grin', pose: 'cheer' }, { id: 'mamma', x: 300, mood: 'happy', pose: 'hold' }], props: [{ type: 'table', x: 200 }, { type: 'bread', x: 200, y: 234, s: 0.8 }], fx: 'hearts' }, lines: [
          { who: 'mamma', en: 'Well done! You bought everything yourself.', uk: 'Молодець! Ти купила все сама.', no: 'Bra jobbet! Du kjøpte alt selv.' },
          { who: 'mia', en: 'Shopping in English is easy!', uk: 'Робити покупки англійською легко!', no: 'Det er lett å handle på engelsk!' }
        ]}
      ],
      vocab: [
        ['we need', 'нам потрібно', 'vi trenger'], ['milk', 'молоко', 'melk'], ['bread', 'хліб', 'brød'], ['apple', 'яблуко', 'eple'],
        ['shelf', 'полиця', 'hylle'], ['how much is it', 'скільки це коштує', 'hva koster det'], ['pound', 'фунт (гроші)', 'pund'],
        ['altogether', 'разом', 'til sammen'], ['here you are', 'ось, будь ласка', 'vær så god'], ['change', 'решта', 'vekslepenger'],
        ['thank you very much', 'щиро дякую', 'tusen takk'], ['goodbye', 'до побачення', 'ha det'], ['excuse me', 'перепрошую', 'unnskyld'],
        ['please', 'будь ласка', 'vær så snill'], ['well done', 'молодець', 'bra jobbet'], ['easy', 'легко', 'lett'], ['to buy', 'купувати', 'å kjøpe'],
        ['yourself', 'сам, сама', 'selv']
      ]
    },
    {
      id: 'e3', level: 'A2', category: 'natur', style: 'strip',
      title: 'A Rainy Day in London', titleUk: 'Дощовий день у Лондоні', titleNo: 'En regnværsdag i London',
      summaryUk: 'Погода, плани й транспорт: що робити, коли дощ зіпсував прогулянку.',
      summaryEn: 'Weather, plans and transport: what to do when the rain spoils your walk.',
      cover: 0,
      panels: [
        { art: { bg: 'street', chars: [{ id: 'maria', x: 110, mood: 'sad' }, { id: 'denys', x: 300, pose: 'point' }], props: [{ type: 'umbrella', x: 110, y: 170, front: true }], fx: 'rain' }, lines: [
          { who: 'maria', en: 'Oh no, it is raining again!', uk: 'О ні, знову дощ!', no: 'Å nei, det regner igjen!' },
          { who: 'denys', en: 'Welcome to London. Did you bring an umbrella?', uk: 'Ласкаво просимо до Лондона. Ти взяв парасольку?', no: 'Velkommen til London. Tok du med paraply?' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'maria', x: 110, pose: 'hold' }, { id: 'denys', x: 300, mood: 'sad', pose: 'hips' }], fx: 'rain' }, lines: [
          { who: 'maria', en: 'Yes, but the wind is very strong.', uk: 'Так, але вітер дуже сильний.', no: 'Ja, men vinden er veldig sterk.' },
          { who: 'denys', en: 'We cannot walk in the park today.', uk: 'Сьогодні ми не можемо гуляти в парку.', no: 'Vi kan ikke gå tur i parken i dag.' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'point' }, { id: 'denys', x: 300, mood: 'surprised' }], props: [{ type: 'busstop', x: 205, label: 'BUS' }], fx: 'rain' }, lines: [
          { who: 'maria', en: 'Let us take the bus to the museum instead.', uk: 'Давай краще поїдемо автобусом до музею.', no: 'La oss ta bussen til museet i stedet.' },
          { who: 'denys', en: 'Great idea! Which bus goes there?', uk: 'Чудова ідея! Який автобус туди їде?', no: 'God idé! Hvilken buss går dit?' }
        ]},
        { art: { bg: 'bus', sign: 'MUSEUM', chars: [{ id: 'maria', x: 100, mood: 'happy', pose: 'hold' }, { id: 'denys', x: 310, mood: 'happy' }], props: [{ type: 'phone', x: 100, y: 236, front: true }] }, lines: [
          { who: 'maria', en: 'Number twenty-four. It takes fifteen minutes.', uk: 'Двадцять четвертий. Їхати п’ятнадцять хвилин.', no: 'Nummer tjuefire. Det tar femten minutter.' },
          { who: 'denys', en: 'Perfect. The museum is free on Sundays.', uk: 'Чудово. У неділю музей безкоштовний.', no: 'Perfekt. Museet er gratis på søndager.' }
        ]},
        { art: { bg: 'office', sign: 'MUSEUM', chars: [{ id: 'denys', x: 100, mood: 'grin', pose: 'point' }, { id: 'maria', x: 310, mood: 'happy', pose: 'hold' }], props: [{ type: 'docs', x: 205, y: 232 }] }, lines: [
          { who: 'denys', en: 'Look at this old map of the city!', uk: 'Поглянь на цю стару мапу міста!', no: 'Se på dette gamle kartet over byen!' },
          { who: 'maria', en: 'I love rainy days when we find something new.', uk: 'Люблю дощові дні, коли ми знаходимо щось нове.', no: 'Jeg elsker regnværsdager når vi finner noe nytt.' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'denys', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 300, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
          { who: 'narrator', en: 'In the evening the sun came out.', uk: 'Увечері визирнуло сонце.', no: 'Om kvelden kom sola fram.' },
          { who: 'denys', en: 'Look, a rainbow! The weather here changes fast.', uk: 'Дивись, веселка! Погода тут швидко змінюється.', no: 'Se, en regnbue! Været her skifter fort.' }
        ]}
      ],
      vocab: [
        ['it is raining', 'іде дощ', 'det regner'], ['umbrella', 'парасолька', 'paraply'], ['wind', 'вітер', 'vind'], ['strong', 'сильний', 'sterk'],
        ['we cannot', 'ми не можемо', 'vi kan ikke'], ['instead', 'натомість', 'i stedet'], ['let us take', 'давай поїдемо', 'la oss ta'],
        ['museum', 'музей', 'museum'], ['which bus', 'який автобус', 'hvilken buss'], ['it takes', 'це займає (часу)', 'det tar'],
        ['free', 'безкоштовний', 'gratis'], ['map', 'мапа', 'kart'], ['city', 'місто', 'by'], ['rainy day', 'дощовий день', 'regnværsdag'],
        ['something new', 'щось нове', 'noe nytt'], ['rainbow', 'веселка', 'regnbue'], ['weather', 'погода', 'vær'], ['to change', 'змінюватися', 'å skifte']
      ]
    },
    {
      id: 'e4', level: 'A2', category: 'familie', style: 'strip',
      title: 'My Birthday Party', titleUk: 'Моя вечірка до дня народження', titleNo: 'Bursdagsfesten min',
      summaryUk: 'Запрошення, подарунки й побажання — як говорити про свято англійською.',
      summaryEn: 'Invitations, presents and wishes — talking about a celebration in English.',
      cover: 4,
      panels: [
        { art: { bg: 'home', chars: [{ id: 'nora', x: 110, mood: 'grin', pose: 'hold' }, { id: 'mamma', x: 300, mood: 'happy' }], props: [{ type: 'note', x: 110, y: 236, label: 'PARTY', front: true }] }, lines: [
          { who: 'nora', en: 'My birthday is on Saturday. Can I invite my friends?', uk: 'Мій день народження в суботу. Можна запросити друзів?', no: 'Bursdagen min er på lørdag. Kan jeg invitere vennene mine?' },
          { who: 'mamma', en: 'Of course. How many people?', uk: 'Звісно. Скільки людей?', no: 'Selvfølgelig. Hvor mange personer?' }
        ]},
        { art: { bg: 'school', board: 'PARTY!', clock: false, chars: [{ id: 'nora', x: 100, mood: 'happy', pose: 'wave' }, { id: 'mia', x: 310, mood: 'grin' }] }, lines: [
          { who: 'nora', en: 'Would you like to come to my party?', uk: 'Хочеш прийти на мою вечірку?', no: 'Har du lyst til å komme i bursdagen min?' },
          { who: 'mia', en: 'I would love to! What time does it start?', uk: 'З радістю! О котрій вона починається?', no: 'Veldig gjerne! Når begynner den?' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'nora', x: 100, pose: 'point' }, { id: 'mia', x: 310, mood: 'happy', pose: 'hold' }], props: [{ type: 'clock', x: 205, y: 120, time: '16:00' }] }, lines: [
          { who: 'nora', en: 'It starts at four o\'clock in the afternoon.', uk: 'Вона починається о четвертій дня.', no: 'Den begynner klokka fire på ettermiddagen.' },
          { who: 'mia', en: 'See you on Saturday then!', uk: 'Тоді побачимось у суботу!', no: 'Vi ses på lørdag, da!' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'mia', x: 90, mood: 'grin', pose: 'hold' }, { id: 'leo', x: 210, mood: 'happy', pose: 'hold' }, { id: 'nora', x: 330, mood: 'surprised', pose: 'cheer' }], props: [{ type: 'gift', x: 90, y: 236, front: true }, { type: 'balloons', x: 300, y: 120 }] }, lines: [
          { who: 'mia', en: 'Happy birthday, Nora! This present is for you.', uk: 'З днем народження, Норо! Цей подарунок для тебе.', no: 'Gratulerer med dagen, Nora! Denne gaven er til deg.' },
          { who: 'nora', en: 'Thank you! Can I open it now?', uk: 'Дякую! Можна відкрити зараз?', no: 'Takk! Kan jeg åpne den nå?' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'nora', x: 100, mood: 'grin', pose: 'cheer' }, { id: 'leo', x: 310, mood: 'grin', pose: 'wave' }], props: [{ type: 'cake', x: 205, y: 232 }, { type: 'balloons', x: 340, y: 110 }], fx: 'stars' }, lines: [
          { who: 'leo', en: 'Make a wish and blow out the candles!', uk: 'Загадай бажання і задми свічки!', no: 'Ønsk deg noe og blås ut lysene!' },
          { who: 'nora', en: 'I wish for a happy year for everyone!', uk: 'Бажаю всім щасливого року!', no: 'Jeg ønsker meg et godt år for alle!' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'nora', x: 90, mood: 'happy', pose: 'wave' }, { id: 'mia', x: 210, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 330, mood: 'grin', pose: 'wave' }], fx: 'hearts' }, lines: [
          { who: 'nora', en: 'Thank you all for coming. It was a great party!', uk: 'Дякую всім, що прийшли. Це була чудова вечірка!', no: 'Takk til alle som kom. Det var en flott fest!' },
          { who: 'mia', en: 'See you at school on Monday. Goodnight!', uk: 'Побачимось у школі в понеділок. На добраніч!', no: 'Vi ses på skolen på mandag. God natt!' }
        ]}
      ],
      vocab: [
        ['birthday', 'день народження', 'bursdag'], ['to invite', 'запрошувати', 'å invitere'], ['friends', 'друзі', 'venner'],
        ['how many', 'скільки (штук)', 'hvor mange'], ['would you like to', 'хотів би ти', 'har du lyst til'], ['party', 'вечірка', 'fest'],
        ['what time', 'о котрій годині', 'når'], ['it starts', 'починається', 'den begynner'], ['in the afternoon', 'по обіді', 'på ettermiddagen'],
        ['happy birthday', 'з днем народження', 'gratulerer med dagen'], ['present', 'подарунок', 'gave'], ['to open', 'відкривати', 'å åpne'],
        ['make a wish', 'загадай бажання', 'ønsk deg noe'], ['candles', 'свічки', 'lys'], ['everyone', 'усі', 'alle'],
        ['thank you all', 'дякую всім', 'takk til alle'], ['great', 'чудовий', 'flott'], ['goodnight', 'на добраніч', 'god natt']
      ]
    },
    {
      id: 'e5', level: 'A2', category: 'helse', style: 'strip',
      title: 'At the Doctor’s', titleUk: 'У лікаря', titleNo: 'Hos legen',
      summaryUk: 'Як описати, що болить, зрозуміти поради лікаря й купити ліки в аптеці англійською.',
      summaryEn: 'How to say what hurts, understand the doctor’s advice and buy medicine at the pharmacy.',
      cover: 1,
      panels: [
        { art: { bg: 'office', sign: 'CLINIC', chars: [{ id: 'alina', x: 110, mood: 'sad' }, { id: 'humphrey', x: 300, mood: 'happy', coat: true, pose: 'wave' }] }, lines: [
          { who: 'humphrey', en: 'Good afternoon. What seems to be the problem?', uk: 'Добрий день. Що вас турбує?', no: 'God ettermiddag. Hva er problemet?' },
          { who: 'alina', en: 'I have a sore throat and a headache.', uk: 'У мене болить горло й голова.', no: 'Jeg har vondt i halsen og hodepine.' }
        ]},
        { art: { bg: 'office', sign: 'CLINIC', chars: [{ id: 'alina', x: 110, mood: 'sad', pose: 'hold' }, { id: 'humphrey', x: 300, coat: true, pose: 'point' }] }, lines: [
          { who: 'humphrey', en: 'How long have you felt like this?', uk: 'Як довго ви так почуваєтеся?', no: 'Hvor lenge har du følt deg slik?' },
          { who: 'alina', en: 'Since Tuesday. I also feel very tired.', uk: 'З вівторка. А ще я дуже втомлена.', no: 'Siden tirsdag. Jeg er også veldig trøtt.' }
        ]},
        { art: { bg: 'office', sign: 'CLINIC', chars: [{ id: 'humphrey', x: 110, coat: true, pose: 'hold' }, { id: 'alina', x: 300, mood: 'surprised' }], props: [{ type: 'stetoskop', x: 150, y: 230, front: true }] }, lines: [
          { who: 'humphrey', en: 'Let me check your temperature. You have a fever.', uk: 'Дайте перевірю температуру. У вас гарячка.', no: 'La meg sjekke temperaturen. Du har feber.' },
          { who: 'alina', en: 'Is it serious, doctor?', uk: 'Це серйозно, лікарю?', no: 'Er det alvorlig, doktor?' }
        ]},
        { art: { bg: 'office', sign: 'CLINIC', chars: [{ id: 'humphrey', x: 110, mood: 'happy', coat: true, pose: 'point' }, { id: 'alina', x: 300, mood: 'happy' }], props: [{ type: 'docs', x: 110, y: 232, front: true }] }, lines: [
          { who: 'humphrey', en: 'No, it is just a cold. Drink a lot of water and rest.', uk: 'Ні, це просто застуда. Пийте багато води й відпочивайте.', no: 'Nei, det er bare en forkjølelse. Drikk mye vann og hvil.' },
          { who: 'alina', en: 'Should I stay at home tomorrow?', uk: 'Мені завтра залишитися вдома?', no: 'Bør jeg være hjemme i morgen?' }
        ]},
        { art: { bg: 'shop', chars: [{ id: 'alina', x: 100, pose: 'point' }, { id: 'kasserer', x: 310, mood: 'happy' }], props: [{ type: 'counter', x: 205 }] }, lines: [
          { who: 'alina', en: 'Hello, I need something for a sore throat, please.', uk: 'Добрий день, мені потрібно щось від болю в горлі, будь ласка.', no: 'Hei, jeg trenger noe mot sår hals, takk.' },
          { who: 'kasserer', en: 'Take one of these tablets three times a day.', uk: 'Приймайте одну таблетку тричі на день.', no: 'Ta én av disse tablettene tre ganger om dagen.' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'happy', pose: 'hold' }, { id: 'ruslan', x: 300, mood: 'happy', pose: 'hold' }], props: [{ type: 'mug', x: 205, y: 232, front: true }], fx: 'hearts' }, lines: [
          { who: 'ruslan', en: 'I made you some hot tea with honey.', uk: 'Я зробив тобі гарячого чаю з медом.', no: 'Jeg har laget varm te med honning til deg.' },
          { who: 'alina', en: 'Thank you! I already feel a little better.', uk: 'Дякую! Мені вже трохи краще.', no: 'Takk! Jeg føler meg allerede litt bedre.' }
        ]}
      ],
      vocab: [
        ['what seems to be the problem', 'що вас турбує', 'hva er problemet'], ['sore throat', 'біль у горлі', 'sår hals'], ['headache', 'головний біль', 'hodepine'],
        ['how long', 'як довго', 'hvor lenge'], ['since', 'з (якогось часу)', 'siden'], ['tired', 'втомлений', 'trøtt'], ['temperature', 'температура', 'temperatur'],
        ['fever', 'гарячка', 'feber'], ['serious', 'серйозний', 'alvorlig'], ['a cold', 'застуда', 'en forkjølelse'], ['to rest', 'відпочивати', 'å hvile'],
        ['should I', 'чи мені слід', 'bør jeg'], ['stay at home', 'залишатися вдома', 'være hjemme'], ['tablets', 'таблетки', 'tabletter'],
        ['three times a day', 'тричі на день', 'tre ganger om dagen'], ['honey', 'мед', 'honning'], ['a little better', 'трохи краще', 'litt bedre'], ['already', 'вже', 'allerede']
      ]
    },
    {
      id: 'e6', level: 'A2', category: 'fritid', style: 'strip',
      title: 'Weekend Plans', titleUk: 'Плани на вихідні', titleNo: 'Planer for helga',
      summaryUk: 'Говоримо про майбутнє з «going to»: пікнік, погода та кого запросити.',
      summaryEn: 'Talking about the future with “going to”: a picnic, the weather and who to invite.',
      cover: 3,
      panels: [
        { art: { bg: 'home', chars: [{ id: 'leo', x: 110, mood: 'happy', pose: 'point' }, { id: 'pappa', x: 300, mood: 'happy', pose: 'hold' }] }, lines: [
          { who: 'leo', en: 'Dad, what are we going to do this weekend?', uk: 'Тату, що ми робитимемо на цих вихідних?', no: 'Pappa, hva skal vi gjøre i helga?' },
          { who: 'pappa', en: 'I think we are going to have a picnic.', uk: 'Думаю, ми влаштуємо пікнік.', no: 'Jeg tror vi skal ha piknik.' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'mia', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'pappa', x: 300, pose: 'hips' }] }, lines: [
          { who: 'mia', en: 'Yes! Can we go to the lake?', uk: 'Так! Можна поїхати до озера?', no: 'Ja! Kan vi dra til sjøen?' },
          { who: 'pappa', en: 'Good idea. But first let us check the weather.', uk: 'Гарна ідея. Але спершу перевіримо погоду.', no: 'God idé. Men først sjekker vi været.' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'leo', x: 110, pose: 'hold' }, { id: 'mia', x: 300, mood: 'happy' }], props: [{ type: 'phone', x: 110, y: 236, front: true }] }, lines: [
          { who: 'leo', en: 'It is going to be sunny and warm on Saturday.', uk: 'У суботу буде сонячно й тепло.', no: 'Det blir sol og varmt på lørdag.' },
          { who: 'mia', en: 'Perfect! I am going to make sandwiches.', uk: 'Чудово! Я зроблю бутерброди.', no: 'Perfekt! Jeg skal lage smørbrød.' }
        ]},
        { art: { bg: 'home', chars: [{ id: 'leo', x: 110, mood: 'grin', pose: 'point' }, { id: 'pappa', x: 300, mood: 'happy' }] }, lines: [
          { who: 'leo', en: 'Can I invite my friend Humphrey too?', uk: 'Можна я запрошу ще свого друга Гамфрі?', no: 'Kan jeg invitere vennen min Humphrey også?' },
          { who: 'pappa', en: 'Of course. The more, the merrier!', uk: 'Звісно. Чим більше, тим веселіше!', no: 'Selvfølgelig. Jo flere, jo bedre!' }
        ]},
        { art: { bg: 'mountain', chars: [{ id: 'mia', x: 100, mood: 'grin', pose: 'hold' }, { id: 'leo', x: 220, mood: 'grin', pose: 'cheer' }, { id: 'humphrey', x: 330, mood: 'happy', pose: 'wave', s: 0.9 }], props: [{ type: 'basket', x: 100, y: 240, front: true }] }, lines: [
          { who: 'narrator', en: 'On Saturday the whole family went to the lake.', uk: 'У суботу вся родина поїхала до озера.', no: 'På lørdag dro hele familien til sjøen.' },
          { who: 'humphrey', en: 'What a beautiful place! Thank you for inviting me.', uk: 'Яке гарне місце! Дякую, що запросили.', no: 'For et vakkert sted! Takk for at dere inviterte meg.' }
        ]},
        { art: { bg: 'mountain', chars: [{ id: 'pappa', x: 110, mood: 'happy', pose: 'point' }, { id: 'mia', x: 300, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
          { who: 'pappa', en: 'Next weekend we are going to go camping.', uk: 'Наступних вихідних ми поїдемо в похід з наметом.', no: 'Neste helg skal vi på telttur.' },
          { who: 'mia', en: 'I cannot wait!', uk: 'Не можу дочекатися!', no: 'Jeg gleder meg!' }
        ]}
      ],
      vocab: [
        ['weekend', 'вихідні', 'helg'], ['going to', 'збиратися (майбутнє)', 'skal'], ['picnic', 'пікнік', 'piknik'], ['lake', 'озеро', 'innsjø'],
        ['first', 'спершу', 'først'], ['to check', 'перевіряти', 'å sjekke'], ['sunny', 'сонячно', 'solfylt'], ['warm', 'тепло', 'varmt'],
        ['sandwiches', 'бутерброди', 'smørbrød'], ['to invite', 'запрошувати', 'å invitere'], ['the more, the merrier', 'чим більше, тим веселіше', 'jo flere, jo bedre'],
        ['whole family', 'уся родина', 'hele familien'], ['beautiful place', 'гарне місце', 'vakkert sted'], ['next weekend', 'наступні вихідні', 'neste helg'],
        ['go camping', 'піти в похід з наметом', 'dra på telttur'], ['I cannot wait', 'не можу дочекатися', 'jeg gleder meg'], ['I think', 'я думаю', 'jeg tror']
      ]
    },
    {
      id: 'e7', level: 'B1', category: 'jobb', style: 'strip',
      title: 'The Job Interview', titleUk: 'Співбесіда', titleNo: 'Jobbintervjuet',
      summaryUk: 'Співбесіда англійською: досвід роботи (present perfect), сильні сторони й запитання до роботодавця.',
      summaryEn: 'A job interview in English: work experience (present perfect), strengths and questions for the employer.',
      cover: 2,
      panels: [
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'wave', s: 0.9 }, { id: 'denys', x: 300, pose: 'hold', s: 0.9 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
          { who: 'maria', en: 'Thank you for coming. Please, take a seat.', uk: 'Дякую, що прийшли. Сідайте, будь ласка.', no: 'Takk for at du kom. Vær så god, sett deg.' },
          { who: 'denys', en: 'Thank you for inviting me to the interview.', uk: 'Дякую, що запросили мене на співбесіду.', no: 'Takk for at jeg ble invitert til intervju.' }
        ]},
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, pose: 'point', s: 0.9 }, { id: 'denys', x: 300, mood: 'happy', s: 0.9 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
          { who: 'maria', en: 'Could you tell me a little about yourself?', uk: 'Розкажіть, будь ласка, трохи про себе.', no: 'Kan du fortelle litt om deg selv?' },
          { who: 'denys', en: 'I am an engineer. I have worked in logistics for five years.', uk: 'Я інженер. Я працюю в логістиці п’ять років.', no: 'Jeg er ingeniør. Jeg har jobbet med logistikk i fem år.' }
        ]},
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, pose: 'hold', s: 0.9 }, { id: 'denys', x: 300, mood: 'grin', pose: 'point', s: 0.9 }], props: [{ type: 'docs', x: 205, y: 232 }] }, lines: [
          { who: 'maria', en: 'Have you ever managed a team?', uk: 'Ви колись керували командою?', no: 'Har du noen gang ledet et team?' },
          { who: 'denys', en: 'Yes, I have led a team of eight people in Kyiv.', uk: 'Так, я керував командою з восьми людей у Києві.', no: 'Ja, jeg har ledet et team på åtte personer i Kyiv.' }
        ]},
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'hold', s: 0.9 }, { id: 'denys', x: 300, mood: 'happy', pose: 'hips', s: 0.9 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
          { who: 'maria', en: 'What are your greatest strengths?', uk: 'Які ваші найсильніші сторони?', no: 'Hva er dine største styrker?' },
          { who: 'denys', en: 'I am reliable, I learn quickly and I work well under pressure.', uk: 'Я надійний, швидко вчуся й добре працюю під тиском.', no: 'Jeg er pålitelig, lærer fort og jobber godt under press.' }
        ]},
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, mood: 'happy', s: 0.9 }, { id: 'denys', x: 300, pose: 'point', s: 0.9 }], props: [{ type: 'officedesk', x: 205 }] }, lines: [
          { who: 'maria', en: 'Do you have any questions for us?', uk: 'У вас є запитання до нас?', no: 'Har du noen spørsmål til oss?' },
          { who: 'denys', en: 'Yes. What would a typical working day look like?', uk: 'Так. Як виглядав би типовий робочий день?', no: 'Ja. Hvordan ville en vanlig arbeidsdag sett ut?' }
        ]},
        { art: { bg: 'office', sign: 'INTERVIEW', chars: [{ id: 'maria', x: 110, mood: 'grin', pose: 'wave', s: 0.9 }, { id: 'denys', x: 300, mood: 'grin', pose: 'cheer', s: 0.9 }], fx: 'stars' }, lines: [
          { who: 'maria', en: 'We will contact you by the end of the week.', uk: 'Ми зв’яжемося з вами до кінця тижня.', no: 'Vi tar kontakt med deg innen slutten av uka.' },
          { who: 'denys', en: 'Thank you for your time. I look forward to hearing from you.', uk: 'Дякую за ваш час. Чекатиму на вашу відповідь.', no: 'Takk for at du tok deg tid. Jeg ser fram til å høre fra dere.' }
        ]}
      ],
      vocab: [
        ['take a seat', 'сідайте', 'sett deg'], ['interview', 'співбесіда', 'intervju'], ['tell me about yourself', 'розкажіть про себе', 'fortell om deg selv'],
        ['engineer', 'інженер', 'ingeniør'], ['I have worked', 'я працював (досі)', 'jeg har jobbet'], ['logistics', 'логістика', 'logistikk'],
        ['have you ever', 'чи ви колись', 'har du noen gang'], ['to manage', 'керувати', 'å lede'], ['team', 'команда', 'team'],
        ['strengths', 'сильні сторони', 'styrker'], ['reliable', 'надійний', 'pålitelig'], ['under pressure', 'під тиском', 'under press'],
        ['typical working day', 'типовий робочий день', 'vanlig arbeidsdag'], ['to contact', 'зв’язатися', 'å ta kontakt'],
        ['by the end of the week', 'до кінця тижня', 'innen slutten av uka'], ['I look forward to', 'я з нетерпінням чекаю', 'jeg ser fram til'], ['quickly', 'швидко', 'fort']
      ]
    },
    {
      id: 'e8', level: 'B1', category: 'hverdag', style: 'strip',
      title: 'Lost in the City', titleUk: 'Заблукав у місті', titleNo: 'Borte i byen',
      summaryUk: 'Як запитати дорогу: прямо, ліворуч, праворуч, навпроти, на розі — і не заблукати.',
      summaryEn: 'Asking for directions: straight on, left, right, opposite, on the corner — and not getting lost.',
      cover: 3,
      panels: [
        { art: { bg: 'street', chars: [{ id: 'ruslan', x: 110, mood: 'sad', pose: 'hold' }, { id: 'nora', x: 300, mood: 'happy' }], props: [{ type: 'phone', x: 110, y: 236, front: true }] }, lines: [
          { who: 'ruslan', en: 'Excuse me, could you help me? I think I am lost.', uk: 'Перепрошую, можете допомогти? Здається, я заблукав.', no: 'Unnskyld, kan du hjelpe meg? Jeg tror jeg har gått meg vill.' },
          { who: 'nora', en: 'Of course. Where do you want to go?', uk: 'Звісно. Куди вам треба?', no: 'Selvfølgelig. Hvor skal du?' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'ruslan', x: 110, pose: 'point' }, { id: 'nora', x: 300, mood: 'happy', pose: 'point', flip: true }] }, lines: [
          { who: 'ruslan', en: 'I am looking for the city library.', uk: 'Я шукаю міську бібліотеку.', no: 'Jeg leter etter byens bibliotek.' },
          { who: 'nora', en: 'Go straight on and turn left at the traffic lights.', uk: 'Ідіть прямо й поверніть ліворуч на світлофорі.', no: 'Gå rett fram og ta til venstre ved lyskrysset.' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'ruslan', x: 110, mood: 'surprised' }, { id: 'nora', x: 300, pose: 'point' }], props: [{ type: 'busstop', x: 205, label: 'BUS' }] }, lines: [
          { who: 'nora', en: 'Then walk past the bus stop. The library is opposite the bank.', uk: 'Потім пройдіть повз зупинку. Бібліотека навпроти банку.', no: 'Så går du forbi bussholdeplassen. Biblioteket ligger rett overfor banken.' },
          { who: 'ruslan', en: 'Is it far from here?', uk: 'Це далеко звідси?', no: 'Er det langt herfra?' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'ruslan', x: 110, mood: 'happy' }, { id: 'nora', x: 300, mood: 'happy', pose: 'hold' }] }, lines: [
          { who: 'nora', en: 'No, it only takes about ten minutes on foot.', uk: 'Ні, пішки лише хвилин десять.', no: 'Nei, det tar bare rundt ti minutter å gå.' },
          { who: 'ruslan', en: 'Great. And is there a café near the library?', uk: 'Чудово. А біля бібліотеки є кав’ярня?', no: 'Flott. Og finnes det en kafé i nærheten av biblioteket?' }
        ]},
        { art: { bg: 'bus', sign: 'LIBRARY', chars: [{ id: 'kari', x: 110, mood: 'happy', pose: 'point' }, { id: 'ruslan', x: 300, mood: 'surprised' }] }, lines: [
          { who: 'narrator', en: 'Later, Ruslan took the wrong bus.', uk: 'Пізніше Руслан сів не на той автобус.', no: 'Senere tok Ruslan feil buss.' },
          { who: 'kari', en: 'This bus does not go there. Get off at the next stop and cross the road.', uk: 'Цей автобус туди не їде. Вийдіть на наступній і перейдіть дорогу.', no: 'Denne bussen går ikke dit. Gå av på neste stopp og kryss veien.' }
        ]},
        { art: { bg: 'street', chars: [{ id: 'ruslan', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'nora', x: 300, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
          { who: 'ruslan', en: 'Finally! The library is on the corner, just like you said.', uk: 'Нарешті! Бібліотека на розі, як ви й казали.', no: 'Endelig! Biblioteket ligger på hjørnet, akkurat som du sa.' },
          { who: 'nora', en: 'Well done! Now you will never get lost again.', uk: 'Молодець! Тепер ви більше ніколи не заблукаєте.', no: 'Bra jobbet! Nå går du deg aldri vill igjen.' }
        ]}
      ],
      vocab: [
        ['I am lost', 'я заблукав', 'jeg har gått meg vill'], ['could you help me', 'чи можете допомогти', 'kan du hjelpe meg'], ['looking for', 'шукаю', 'leter etter'],
        ['library', 'бібліотека', 'bibliotek'], ['go straight on', 'ідіть прямо', 'gå rett fram'], ['turn left', 'поверніть ліворуч', 'ta til venstre'],
        ['traffic lights', 'світлофор', 'lyskryss'], ['walk past', 'пройдіть повз', 'gå forbi'], ['opposite', 'навпроти', 'rett overfor'],
        ['far from here', 'далеко звідси', 'langt herfra'], ['on foot', 'пішки', 'til fots'], ['near', 'біля', 'i nærheten av'], ['wrong bus', 'не той автобус', 'feil buss'],
        ['get off', 'виходити', 'gå av'], ['cross the road', 'перейти дорогу', 'krysse veien'], ['on the corner', 'на розі', 'på hjørnet'], ['finally', 'нарешті', 'endelig']
      ]
    }
  ]
};
