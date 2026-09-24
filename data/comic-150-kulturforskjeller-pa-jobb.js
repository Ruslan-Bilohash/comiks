window.COMICS = window.COMICS || [];

/* p150 — B2: культурні відмінності на роботі. Пряма мова, плоска ієрархія, «ja» і «kanskje». */
COMICS.push({
  id: 'p150',
  level: 'B2',
  category: 'jobb',
  title: 'Kulturforskjeller på jobb',
  titleUk: 'Культурні відмінності на роботі',
  titleEn: 'Cultural differences at work',
  summaryUk: 'Руслан не розуміє, чому колеги кажуть «kanskje» замість «ні» і чому начальника звуть на ім’я. Марія пояснює норвезьку робочу культуру.',
  summaryEn: 'Ruslan does not understand why colleagues say “maybe” instead of “no”, or why everyone uses the boss’s first name. Maria explains Norwegian work culture.',
  summaryNo: 'Ruslan skjønner ikke hvorfor kollegene sier «kanskje» i stedet for nei, eller hvorfor alle sier du til sjefen. Maria forklarer norsk arbeidskultur.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'surprised' }, { id: 'maria', x: 100, mood: 'happy' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'ruslan', no: 'Jeg spurte sjefen om ferie, og han sa «vi får se». Betyr det nei?', uk: 'Я спитав керівника про відпустку, а він сказав «побачимо». Це означає «ні»?', en: 'I asked the boss about holiday and he said “we will see”. Does that mean no?' },
      { who: 'maria', no: 'Ikke nødvendigvis. Det betyr ofte at han må sjekke bemanningen først.', uk: 'Не обов’язково. Часто це означає, що йому спершу треба перевірити графік персоналу.', en: 'Not necessarily. It often means he has to check the staffing first.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, pose: 'point' }, { id: 'ruslan', x: 310, mood: 'normal' }] }, lines: [
      { who: 'ruslan', no: 'Hjemme ville sjefen svart ja eller nei med en gang.', uk: 'Удома керівник відповів би «так» чи «ні» одразу.', en: 'Back home the boss would have answered yes or no straight away.' },
      { who: 'maria', no: 'Her er beslutninger ofte kollektive. Folk vil forankre dem i teamet.', uk: 'Тут рішення часто колективні. Люди хочуть узгодити їх у команді.', en: 'Here decisions are often collective. People want to anchor them in the team.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'normal' }, { id: 'maria', x: 100, mood: 'normal' }] }, lines: [
      { who: 'ruslan', no: 'Og hvorfor sier alle fornavn til lederen? Det føles uhøflig for meg.', uk: 'А чому всі звертаються до керівника на ім’я? Для мене це звучить неввічливо.', en: 'And why does everyone use the manager’s first name? It feels impolite to me.' },
      { who: 'maria', no: 'Hierarkiet er flatt. Å bruke fornavn betyr likeverd, ikke mangel på respekt.', uk: 'Ієрархія тут пласка. Звертання на ім’я означає рівність, а не брак поваги.', en: 'The hierarchy is flat. Using first names means equality, not a lack of respect.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, mood: 'normal' }, { id: 'ruslan', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'ruslan', no: 'Men i møter sier folk lite. Er de uenige uten å si det?', uk: 'Але на нарадах люди мало говорять. Вони не згодні, але мовчать?', en: 'But in meetings people say little. Do they disagree without saying so?' },
      { who: 'maria', no: 'Noen gjør det. Derfor er det lurt å spørre direkte: «Hva tenker du om dette?»', uk: 'Дехто так і робить. Тому варто питати прямо: «Hva tenker du om dette?»', en: 'Some do. That is why it is wise to ask directly: “Hva tenker du om dette?”' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'happy' }, { id: 'maria', x: 100, mood: 'happy' }], props: [{ type: 'mug', x: 215, y: 200 }] }, lines: [
      { who: 'ruslan', no: 'Og småpraten i lunsjen? Jeg vet aldri hva jeg skal si.', uk: 'А ця балачка за обідом? Я ніколи не знаю, що казати.', en: 'And the small talk at lunch? I never know what to say.' },
      { who: 'maria', no: 'Vær og helgeplaner er alltid trygt. Ingen forventer dype samtaler.', uk: 'Погода й плани на вихідні — завжди безпечно. Ніхто не чекає глибоких розмов.', en: 'Weather and weekend plans are always safe. Nobody expects deep conversations.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 100, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'ruslan', no: 'Takk. Nå tolker jeg «vi får se» som «jeg sjekker», ikke som avvisning.', uk: 'Дякую. Тепер я тлумачу «побачимо» як «я перевірю», а не як відмову.', en: 'Thanks. Now I read “we will see” as “I will check”, not as a refusal.' },
      { who: 'maria', no: 'Nettopp. Og spør igjen om to dager — det er helt vanlig.', uk: 'Саме так. І перепитай за два дні — це цілком звично.', en: 'Exactly. And ask again in two days — that is completely normal.' }
    ]}
  ],

  vocab: [
    ['ei kulturforskjell', 'культурна відмінність', 'a cultural difference'],
    ['ei bemanning', 'укомплектованість персоналом', 'staffing'],
    ['ei beslutning', 'рішення', 'a decision'],
    ['kollektiv', 'колективний', 'collective'],
    ['å forankre', 'узгодити, закріпити', 'to anchor'],
    ['et hierarki', 'ієрархія', 'a hierarchy'],
    ['flat', 'плаский, плаский', 'flat'],
    ['et fornavn', 'ім’я', 'a first name'],
    ['et likeverd', 'рівність, рівноцінність', 'equality'],
    ['en mangel', 'брак, нестача', 'a lack'],
    ['uhøflig', 'неввічливий', 'impolite'],
    ['uenig', 'незгодний', 'in disagreement'],
    ['ei småprat', 'світська бесіда', 'small talk'],
    ['å tolke', 'тлумачити', 'to interpret'],
    ['ei avvisning', 'відмова', 'a refusal'],
    ['nødvendigvis', 'обов’язково', 'necessarily']
  ],

  words: {
    no: { 'spurte': 'спитав', 'sjefen': 'керівник', 'ferie': 'відпустка', 'får': 'побачимо (vi får se)', 'betyr': 'означає', 'nødvendigvis': 'обов’язково', 'ofte': 'часто', 'sjekke': 'перевірити', 'bemanningen': 'графік персоналу', 'hjemme': 'удома', 'ville': 'би', 'svart': 'відповів', 'gang': 'раз (med en gang — одразу)', 'beslutninger': 'рішення', 'kollektive': 'колективні', 'folk': 'люди', 'forankre': 'узгодити', 'teamet': 'команда', 'fornavn': 'ім’я', 'lederen': 'керівник', 'føles': 'відчувається', 'uhøflig': 'неввічливо', 'hierarkiet': 'ієрархія', 'flatt': 'пласка', 'bruke': 'уживати', 'likeverd': 'рівність', 'mangel': 'брак', 'respekt': 'повага', 'møter': 'наради', 'lite': 'мало', 'uenige': 'незгодні', 'noen': 'дехто', 'derfor': 'тому', 'lurt': 'розумно', 'spørre': 'питати', 'direkte': 'прямо', 'tenker': 'думаєш', 'småpraten': 'балачка', 'lunsjen': 'обід', 'aldri': 'ніколи', 'vær': 'погода', 'helgeplaner': 'плани на вихідні', 'trygt': 'безпечно', 'forventer': 'чекає', 'dype': 'глибокі', 'samtaler': 'розмови', 'tolker': 'тлумачу', 'avvisning': 'відмова', 'nettopp': 'саме так', 'vanlig': 'звично', 'kollegene': 'колеги', 'kanskje': 'можливо', 'arbeidskultur': 'робоча культура', 'skjønner': 'розуміє' },
    en: { 'spurte': 'asked', 'sjefen': 'the boss', 'ferie': 'holiday', 'får': 'we will see (vi får se)', 'betyr': 'means', 'nødvendigvis': 'necessarily', 'ofte': 'often', 'sjekke': 'to check', 'bemanningen': 'the staffing', 'hjemme': 'back home', 'ville': 'would', 'svart': 'answered', 'gang': 'time (med en gang — at once)', 'beslutninger': 'decisions', 'kollektive': 'collective', 'folk': 'people', 'forankre': 'to anchor', 'teamet': 'the team', 'fornavn': 'first name', 'lederen': 'the manager', 'føles': 'feels', 'uhøflig': 'impolite', 'hierarkiet': 'the hierarchy', 'flatt': 'flat', 'bruke': 'to use', 'likeverd': 'equality', 'mangel': 'lack', 'respekt': 'respect', 'møter': 'meetings', 'lite': 'little', 'uenige': 'in disagreement', 'noen': 'some', 'derfor': 'therefore', 'lurt': 'wise', 'spørre': 'to ask', 'direkte': 'directly', 'tenker': 'think', 'småpraten': 'the small talk', 'lunsjen': 'lunch', 'aldri': 'never', 'vær': 'weather', 'helgeplaner': 'weekend plans', 'trygt': 'safe', 'forventer': 'expects', 'dype': 'deep', 'samtaler': 'conversations', 'tolker': 'interpret', 'avvisning': 'refusal', 'nettopp': 'exactly', 'vanlig': 'normal', 'kollegene': 'the colleagues', 'kanskje': 'maybe', 'arbeidskultur': 'work culture', 'skjønner': 'understands' }
  }
});
