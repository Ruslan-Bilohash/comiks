window.COMICS = window.COMICS || [];

/* p129 — B1: перший день на новій роботі. HMS, обхід, обід і робочі домовленості. */
COMICS.push({
  id: 'p129',
  level: 'B1',
  category: 'jobb',
  title: 'Første dag på ny jobb',
  titleUk: 'Перший день на новій роботі',
  titleEn: 'First day at a new job',
  summaryUk: 'Аліна виходить на нову роботу. Керівник показує робоче місце, розповідає про правила безпеки, обід і як просити відгул.',
  summaryEn: 'Alina starts a new job. Her manager shows her the workplace and explains safety rules, lunch and how to ask for time off.',
  summaryNo: 'Alina begynner i ny jobb. Lederen viser arbeidsplassen og forteller om HMS, lunsj og hvordan hun ber om fri.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'alina', x: 300, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'morten', no: 'Velkommen til oss, Alina! Godt å ha deg på laget.', uk: 'Ласкаво просимо, Аліно! Добре, що ти в команді.', en: 'Welcome to us, Alina! Good to have you on the team.' },
      { who: 'alina', no: 'Takk! Jeg gleder meg til å komme i gang.', uk: 'Дякую! Не можу дочекатися почати.', en: 'Thank you! I am looking forward to getting started.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'morten', x: 100, pose: 'point' }, { id: 'alina', x: 310, mood: 'normal' }], props: [{ type: 'computer', x: 110, y: 175 }, { type: 'keys', x: 230, y: 200 }] }, lines: [
      { who: 'morten', no: 'Her er pulten din, nøkkelkortet og passordet til maskinen.', uk: 'Ось твоя парта, картка-ключ і пароль до комп’ютера.', en: 'Here is your desk, your key card and the password for the computer.' },
      { who: 'alina', no: 'Skal jeg bytte passord med en gang?', uk: 'Мені одразу змінити пароль?', en: 'Should I change the password right away?' },
      { who: 'morten', no: 'Ja, det er lurt.', uk: 'Так, це розумно.', en: 'Yes, that is wise.' }
    ]},
    { art: { bg: 'office', board: 'HMS', chars: [{ id: 'morten', x: 100, mood: 'normal' }, { id: 'alina', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'morten', no: 'Vi tar en runde om HMS: rømningsvei, førstehjelp og verneutstyr.', uk: 'Пройдімо охорону праці: аварійний вихід, перша допомога й засоби захисту.', en: 'Let us go through safety: emergency exit, first aid and protective gear.' },
      { who: 'alina', no: 'Hvem sier jeg fra til hvis noe skjer?', uk: 'Кому повідомляти, якщо щось трапиться?', en: 'Who do I report to if something happens?' },
      { who: 'morten', no: 'Til meg eller verneombudet vårt, Kari.', uk: 'Мені або нашій уповноваженій з охорони праці Карі.', en: 'To me or to our safety representative, Kari.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 310, mood: 'happy' }, { id: 'morten', x: 100, mood: 'happy' }], props: [{ type: 'waffles', x: 215, y: 200 }] }, lines: [
      { who: 'morten', no: 'Lunsjen er klokka elleve. De fleste har med matpakke.', uk: 'Обід об одинадцятій. Більшість приносить їжу з дому.', en: 'Lunch is at eleven. Most people bring a packed lunch.' },
      { who: 'alina', no: 'Fint. Er det vanlig å spise sammen?', uk: 'Добре. Зазвичай їдять разом?', en: 'Nice. Is it normal to eat together?' },
      { who: 'morten', no: 'Ja, alle sitter i kantina en halv time.', uk: 'Так, усі сидять у їдальні пів години.', en: 'Yes, everyone sits in the canteen for half an hour.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'morten', x: 100, pose: 'hold' }, { id: 'alina', x: 310, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'alina', no: 'Hvordan ber jeg om fri hvis barnet blir sykt?', uk: 'Як попросити відгул, якщо дитина захворіє?', en: 'How do I ask for time off if my child gets ill?' },
      { who: 'morten', no: 'Da bruker du egenmelding eller omsorgsdager. Send melding før åtte.', uk: 'Тоді береш лікарняний за власною заявою або дні по догляду. Напиши до восьмої.', en: 'Then you use self-certification or carer’s days. Send a message before eight.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 110, mood: 'happy' }], fx: 'stars' }, lines: [
      { who: 'morten', no: 'Spør om alt du lurer på. Ingen forventer at du kan alt i dag.', uk: 'Питай про все, що незрозуміло. Ніхто не чекає, що ти все знатимеш сьогодні.', en: 'Ask about anything you wonder about. Nobody expects you to know everything today.' },
      { who: 'alina', no: 'Takk, det gjør det mye lettere.', uk: 'Дякую, так набагато легше.', en: 'Thanks, that makes it much easier.' }
    ]}
  ],

  vocab: [
    ['et lag', 'команда', 'a team'],
    ['å glede seg til', 'чекати з нетерпінням', 'to look forward to'],
    ['et nøkkelkort', 'картка-ключ', 'a key card'],
    ['HMS', 'охорона праці', 'health and safety'],
    ['ei rømningsvei', 'аварійний вихід', 'an emergency exit'],
    ['ei førstehjelp', 'перша допомога', 'first aid'],
    ['et verneutstyr', 'засоби захисту', 'protective gear'],
    ['et verneombud', 'уповноважений з охорони праці', 'a safety representative'],
    ['ei matpakke', 'їжа з дому', 'a packed lunch'],
    ['ei kantine', 'їдальня', 'a canteen'],
    ['å be om fri', 'просити відгул', 'to ask for time off'],
    ['ei egenmelding', 'лікарняний за власною заявою', 'self-certified sick leave'],
    ['omsorgsdager', 'дні догляду за дитиною', 'carer’s days'],
    ['å si fra', 'повідомити', 'to speak up, report'],
    ['lurt', 'розумно', 'wise']
  ],

  words: {
    no: { 'velkommen': 'ласкаво просимо', 'laget': 'команда', 'gleder': 'радію (glede seg til — чекати з нетерпінням)', 'gang': 'раз (komme i gang — почати)', 'pulten': 'парта, робочий стіл', 'nøkkelkortet': 'картка-ключ', 'passordet': 'пароль', 'maskinen': 'комп’ютер', 'bytte': 'змінити', 'passord': 'пароль', 'lurt': 'розумно', 'runde': 'обхід', 'hms': 'охорона праці', 'rømningsvei': 'аварійний вихід', 'førstehjelp': 'перша допомога', 'verneutstyr': 'засоби захисту', 'skjer': 'трапиться', 'verneombudet': 'уповноважена з охорони праці', 'lunsjen': 'обід', 'elleve': 'одинадцята', 'fleste': 'більшість', 'matpakke': 'їжа з дому', 'vanlig': 'звично', 'spise': 'їсти', 'kantina': 'їдальня', 'halv': 'пів', 'time': 'година', 'ber': 'прошу', 'fri': 'вільний час, відгул', 'barnet': 'дитина', 'sykt': 'хворе', 'egenmelding': 'лікарняний за власною заявою', 'omsorgsdager': 'дні догляду', 'melding': 'повідомлення', 'åtte': 'восьма', 'spør': 'питай', 'lurer': 'цікавишся', 'forventer': 'очікує', 'lettere': 'легше', 'arbeidsplassen': 'робоче місце' },
    en: { 'velkommen': 'welcome', 'laget': 'the team', 'gleder': 'look forward (glede seg til)', 'gang': 'time (komme i gang — get started)', 'pulten': 'the desk', 'nøkkelkortet': 'the key card', 'passordet': 'the password', 'maskinen': 'the computer', 'bytte': 'to change', 'passord': 'password', 'lurt': 'wise', 'runde': 'round, walk-through', 'hms': 'health and safety', 'rømningsvei': 'emergency exit', 'førstehjelp': 'first aid', 'verneutstyr': 'protective gear', 'skjer': 'happens', 'verneombudet': 'the safety representative', 'lunsjen': 'lunch', 'elleve': 'eleven', 'fleste': 'most', 'matpakke': 'packed lunch', 'vanlig': 'usual', 'spise': 'to eat', 'kantina': 'the canteen', 'halv': 'half', 'time': 'hour', 'ber': 'ask', 'fri': 'time off', 'barnet': 'the child', 'sykt': 'ill', 'egenmelding': 'self-certified sick leave', 'omsorgsdager': 'carer’s days', 'melding': 'message', 'åtte': 'eight', 'spør': 'ask', 'lurer': 'wonder', 'forventer': 'expects', 'lettere': 'easier', 'arbeidsplassen': 'the workplace' }
  }
});
