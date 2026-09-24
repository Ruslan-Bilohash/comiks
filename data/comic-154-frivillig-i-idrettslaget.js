window.COMICS = window.COMICS || [];

/* p154 — B2: волонтерство в спортклубі. Kiosk, kampoppsett, politiattest і чому це важливо. */
COMICS.push({
  id: 'p154',
  level: 'B2',
  category: 'fritid',
  title: 'Frivillig i idrettslaget',
  titleUk: 'Волонтером у спортклубі',
  titleEn: 'Volunteering at the sports club',
  summaryUk: 'Муса записує доньку у футбол і дізнається, що клуб тримається на батьках-волонтерах: кіоск, поїздки, довідка про несудимість і дух спільноти.',
  summaryEn: 'Musa signs his daughter up for football and learns that the club runs on volunteer parents: the kiosk, driving to matches, a police certificate and community spirit.',
  summaryNo: 'Musa melder datteren på fotball og får vite at klubben drives av frivillige foreldre: kiosk, kjøring til kamper, politiattest og dugnadsånd.',
  cover: 0,

  panels: [
    { art: { bg: 'park', chars: [{ id: 'musa', x: 310, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'ball', x: 215, y: 250 }] }, lines: [
      { who: 'musa', no: 'Hei! Datteren min vil begynne på fotball. Er det plass i laget?', uk: 'Вітаю! Моя донька хоче почати грати у футбол. Є місце в команді?', en: 'Hi! My daughter wants to start playing football. Is there a place in the team?' },
      { who: 'morten', no: 'Absolutt. Vi tar imot alle, uansett nivå.', uk: 'Звісно. Ми беремо всіх, незалежно від рівня.', en: 'Absolutely. We take everyone, whatever their level.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'morten', x: 100, pose: 'point' }, { id: 'musa', x: 310, mood: 'normal' }] }, lines: [
      { who: 'morten', no: 'Treningsavgiften er tusen i året, og klubben drives av frivillige.', uk: 'Внесок — тисяча на рік, а клуб тримається на волонтерах.', en: 'The training fee is a thousand a year, and the club is run by volunteers.' },
      { who: 'musa', no: 'Hva forventes av foreldrene?', uk: 'Чого очікують від батьків?', en: 'What is expected of the parents?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'morten', x: 100, mood: 'normal' }, { id: 'musa', x: 310, mood: 'surprised' }], props: [{ type: 'waffles', x: 215, y: 200 }] }, lines: [
      { who: 'morten', no: 'Kioskvakt noen ganger i sesongen og kjøring til bortekamper.', uk: 'Кілька разів за сезон чергувати в кіоску й возити на виїзні матчі.', en: 'A few kiosk shifts a season and driving to away matches.' },
      { who: 'musa', no: 'Det klarer jeg. Jeg jobber turnus, men helgene er ofte ledige.', uk: 'Це я подужаю. Я працюю позмінно, але вихідні часто вільні.', en: 'I can manage that. I work shifts, but weekends are often free.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'normal', pose: 'hold' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'musa', no: 'Trenger jeg noe papir for å være med som trener?', uk: 'Чи потрібні документи, щоб бути тренером?', en: 'Do I need any paperwork to help as a coach?' },
      { who: 'morten', no: 'Ja, politiattest. Alle som jobber med barn må levere den.', uk: 'Так, довідка про несудимість. Її подають усі, хто працює з дітьми.', en: 'Yes, a police certificate. Everyone who works with children must submit one.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'morten', x: 100, mood: 'happy' }, { id: 'musa', x: 310, mood: 'happy' }] }, lines: [
      { who: 'musa', no: 'Hvorfor gidder folk å bruke så mye fritid på dette?', uk: 'Чому люди взагалі витрачають стільки вільного часу на це?', en: 'Why do people bother to spend so much free time on this?' },
      { who: 'morten', no: 'Fordi klubben er limet i nabolaget. Uten dugnad hadde det ikke vært noe tilbud.', uk: 'Бо клуб — це клей, що тримає район. Без спільної праці не було б жодних занять.', en: 'Because the club is the glue in the neighbourhood. Without volunteering there would be nothing on offer.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'musa', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 100, mood: 'grin', pose: 'wave' }], props: [{ type: 'ball', x: 215, y: 250 }], fx: 'stars' }, lines: [
      { who: 'musa', no: 'Sett meg opp på kiosken i september. Jeg tar med baklava også.', uk: 'Запишіть мене в кіоск на вересень. І я принесу пахлаву.', en: 'Put me down for the kiosk in September. I will bring baklava too.' },
      { who: 'morten', no: 'Da blir du årets mest populære forelder!', uk: 'Тоді ти станеш найпопулярнішим батьком року!', en: 'Then you will be the most popular parent of the year!' }
    ]}
  ],

  vocab: [
    ['frivillig', 'волонтер; добровільний', 'a volunteer; voluntary'],
    ['et idrettslag', 'спортивний клуб', 'a sports club'],
    ['ei treningsavgift', 'внесок за тренування', 'a training fee'],
    ['å drive', 'керувати, вести', 'to run'],
    ['å forvente', 'очікувати', 'to expect'],
    ['ei kioskvakt', 'чергування в кіоску', 'a kiosk shift'],
    ['en sesong', 'сезон', 'a season'],
    ['ei bortekamp', 'виїзний матч', 'an away match'],
    ['ei turnus', 'змінний графік', 'shift work'],
    ['ei politiattest', 'довідка про несудимість', 'a police certificate'],
    ['å levere', 'подавати', 'to submit'],
    ['å gidde', 'мати охоту', 'to bother'],
    ['et lim', 'клей', 'glue'],
    ['et nabolag', 'район, сусідство', 'a neighbourhood'],
    ['ei dugnadsånd', 'дух спільної праці', 'community spirit'],
    ['et tilbud', 'пропозиція, послуга', 'an offer']
  ],

  words: {
    no: { 'datteren': 'донька', 'begynne': 'почати', 'fotball': 'футбол', 'plass': 'місце', 'laget': 'команда', 'absolutt': 'звісно', 'imot': 'до себе (ta imot — приймати)', 'uansett': 'незалежно від', 'nivå': 'рівень', 'treningsavgiften': 'внесок за тренування', 'tusen': 'тисяча', 'året': 'рік', 'klubben': 'клуб', 'drives': 'тримається, керується', 'frivillige': 'волонтери', 'forventes': 'очікують', 'foreldrene': 'батьки', 'kioskvakt': 'чергування в кіоску', 'ganger': 'рази', 'sesongen': 'сезон', 'kjøring': 'возіння', 'bortekamper': 'виїзні матчі', 'klarer': 'подужаю', 'turnus': 'змінний графік', 'helgene': 'вихідні', 'ofte': 'часто', 'ledige': 'вільні', 'papir': 'документ', 'trener': 'тренер', 'politiattest': 'довідка про несудимість', 'barn': 'діти', 'levere': 'подати', 'gidder': 'мають охоту', 'folk': 'люди', 'fritid': 'вільний час', 'fordi': 'бо', 'limet': 'клей', 'nabolaget': 'район', 'dugnad': 'спільна праця', 'tilbud': 'заняття, пропозиція', 'sett': 'запишіть', 'kiosken': 'кіоск', 'september': 'вересень', 'baklava': 'пахлава', 'årets': 'року', 'mest': 'най-', 'populære': 'популярний', 'forelder': 'батько', 'melder': 'записує', 'kamper': 'матчі', 'dugnadsånd': 'дух спільної праці' },
    en: { 'datteren': 'the daughter', 'begynne': 'to start', 'fotball': 'football', 'plass': 'place', 'laget': 'the team', 'absolutt': 'absolutely', 'imot': 'in (ta imot — to welcome)', 'uansett': 'whatever', 'nivå': 'level', 'treningsavgiften': 'the training fee', 'tusen': 'thousand', 'året': 'the year', 'klubben': 'the club', 'drives': 'is run', 'frivillige': 'volunteers', 'forventes': 'is expected', 'foreldrene': 'the parents', 'kioskvakt': 'kiosk shift', 'ganger': 'times', 'sesongen': 'the season', 'kjøring': 'driving', 'bortekamper': 'away matches', 'klarer': 'can manage', 'turnus': 'shift work', 'helgene': 'the weekends', 'ofte': 'often', 'ledige': 'free', 'papir': 'paper', 'trener': 'coach', 'politiattest': 'police certificate', 'barn': 'children', 'levere': 'to submit', 'gidder': 'bother', 'folk': 'people', 'fritid': 'free time', 'fordi': 'because', 'limet': 'the glue', 'nabolaget': 'the neighbourhood', 'dugnad': 'voluntary work', 'tilbud': 'offer', 'sett': 'put', 'kiosken': 'the kiosk', 'september': 'September', 'baklava': 'baklava', 'årets': 'of the year', 'mest': 'most', 'populære': 'popular', 'forelder': 'parent', 'melder': 'signs up', 'kamper': 'matches', 'dugnadsånd': 'community spirit' }
  }
});
