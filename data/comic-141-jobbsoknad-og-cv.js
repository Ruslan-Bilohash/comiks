window.COMICS = window.COMICS || [];

/* p141 — B2: мотиваційний лист і CV. Структура, конкретні приклади, рекомендації. */
COMICS.push({
  id: 'p141',
  level: 'B2',
  category: 'jobb',
  title: 'Jobbsøknad og CV',
  titleUk: 'Мотиваційний лист і резюме',
  titleEn: 'Job application and CV',
  summaryUk: 'Аліна пише заявку на роботу, а Марія підказує, як зробити її переконливою: конкретні приклади замість загальних слів і CV на одну сторінку.',
  summaryEn: 'Alina writes a job application and Maria shows how to make it convincing: concrete examples instead of vague phrases, and a one-page CV.',
  summaryNo: 'Alina skriver en jobbsøknad, og Maria viser hvordan den blir overbevisende: konkrete eksempler i stedet for vage fraser, og en CV på én side.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'sad' }, { id: 'maria', x: 310, mood: 'happy' }], props: [{ type: 'computer', x: 215, y: 190 }] }, lines: [
      { who: 'alina', no: 'Jeg har skrevet søknaden tre ganger, men den føles kjedelig.', uk: 'Я тричі переписала заявку, але вона здається нудною.', en: 'I have written the application three times, but it feels dull.' },
      { who: 'maria', no: 'La meg lese. Ofte er problemet at teksten er for generell.', uk: 'Дай прочитаю. Часто проблема в тому, що текст надто загальний.', en: 'Let me read it. Often the problem is that the text is too general.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 310, pose: 'point' }, { id: 'alina', x: 110, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'maria', no: 'Her står det «jeg er strukturert og motivert». Det skriver alle.', uk: 'Тут написано «я структурована й мотивована». Так пишуть усі.', en: 'Here it says “I am structured and motivated”. Everyone writes that.' },
      { who: 'alina', no: 'Hva skal jeg skrive i stedet?', uk: 'А що писати натомість?', en: 'What should I write instead?' },
      { who: 'maria', no: 'Vis det med et eksempel: hva gjorde du, og hva ble resultatet?', uk: 'Покажи це прикладом: що ти зробила і яким був результат?', en: 'Show it with an example: what did you do, and what was the result?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'happy' }, { id: 'maria', x: 310, mood: 'normal' }] }, lines: [
      { who: 'alina', no: 'Jeg innførte en ny rutine som kuttet ventetiden med tjue prosent.', uk: 'Я запровадила новий порядок, який скоротив час очікування на двадцять відсотків.', en: 'I introduced a new routine that cut the waiting time by twenty per cent.' },
      { who: 'maria', no: 'Nettopp sånn. Det er konkret, og det kan du snakke om i intervjuet.', uk: 'Саме так. Це конкретно, і про це можна розповісти на співбесіді.', en: 'Exactly like that. It is concrete, and you can talk about it in the interview.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'maria', x: 310, mood: 'normal', pose: 'hold' }, { id: 'alina', x: 110, mood: 'normal' }], props: [{ type: 'note', x: 215 }] }, lines: [
      { who: 'maria', no: 'CV-en bør være på én side: utdanning, erfaring og språk.', uk: 'Резюме має бути на одну сторінку: освіта, досвід і мови.', en: 'The CV should be one page: education, experience and languages.' },
      { who: 'alina', no: 'Skal jeg ha med bilde og fødselsdato?', uk: 'Чи додавати фото й дату народження?', en: 'Should I include a photo and date of birth?' },
      { who: 'maria', no: 'Ikke nødvendig i Norge. Referanser skriver du «oppgis ved forespørsel».', uk: 'У Норвегії це не обов’язково. Про рекомендації пиши «надам за запитом».', en: 'Not necessary in Norway. For references write “available on request”.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'surprised' }, { id: 'maria', x: 310, mood: 'happy' }] }, lines: [
      { who: 'alina', no: 'Og hvis jeg ikke oppfyller alle kravene i annonsen?', uk: 'А якщо я не відповідаю всім вимогам з оголошення?', en: 'And what if I do not meet all the requirements in the advert?' },
      { who: 'maria', no: 'Søk likevel. Skriv hva du kan lære raskt, og vær ærlig om resten.', uk: 'Усе одно подавайся. Напиши, що можеш швидко опанувати, і будь чесною щодо решти.', en: 'Apply anyway. Write what you can learn quickly and be honest about the rest.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'grin', pose: 'cheer' }, { id: 'maria', x: 310, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Send søknaden i dag. Ring gjerne kontaktpersonen først og still ett spørsmål.', uk: 'Надішли заявку сьогодні. І краще спершу зателефонуй контактній особі й постав одне питання.', en: 'Send the application today. Better still, ring the contact person first and ask one question.' },
      { who: 'alina', no: 'Da blir jeg husket. Takk for hjelpen!', uk: 'Тоді мене запам’ятають. Дякую за допомогу!', en: 'Then they will remember me. Thanks for the help!' }
    ]}
  ],

  vocab: [
    ['ei jobbsøknad', 'заявка на роботу', 'a job application'],
    ['generell', 'загальний', 'general, vague'],
    ['et eksempel', 'приклад', 'an example'],
    ['et resultat', 'результат', 'a result'],
    ['å innføre', 'запровадити', 'to introduce'],
    ['ei rutine', 'усталений порядок', 'a routine'],
    ['ei ventetid', 'час очікування', 'waiting time'],
    ['en prosent', 'відсоток', 'per cent'],
    ['konkret', 'конкретний', 'concrete'],
    ['ei utdanning', 'освіта', 'education'],
    ['ei erfaring', 'досвід', 'experience'],
    ['ei referanse', 'рекомендація', 'a reference'],
    ['ei forespørsel', 'запит', 'a request'],
    ['å oppfylle krav', 'відповідати вимогам', 'to meet requirements'],
    ['ei annonse', 'оголошення', 'an advert'],
    ['ærlig', 'чесний', 'honest']
  ],

  words: {
    no: { 'skrevet': 'написала', 'søknaden': 'заявка', 'ganger': 'рази', 'føles': 'здається', 'kjedelig': 'нудною', 'lese': 'прочитати', 'ofte': 'часто', 'problemet': 'проблема', 'teksten': 'текст', 'generell': 'загальний', 'står': 'написано', 'strukturert': 'структурована', 'motivert': 'мотивована', 'skriver': 'пишуть', 'alle': 'усі', 'stedet': 'замість (i stedet)', 'vis': 'покажи', 'eksempel': 'приклад', 'gjorde': 'зробила', 'resultatet': 'результат', 'innførte': 'запровадила', 'rutine': 'порядок', 'kuttet': 'скоротив', 'ventetiden': 'час очікування', 'tjue': 'двадцять', 'prosent': 'відсотків', 'nettopp': 'саме', 'sånn': 'так', 'konkret': 'конкретно', 'intervjuet': 'співбесіда', 'cv-en': 'резюме', 'bør': 'має', 'side': 'сторінка', 'utdanning': 'освіта', 'erfaring': 'досвід', 'språk': 'мови', 'bilde': 'фото', 'fødselsdato': 'дата народження', 'nødvendig': 'потрібно', 'norge': 'Норвегія', 'referanser': 'рекомендації', 'oppgis': 'надаються', 'forespørsel': 'запит', 'oppfyller': 'відповідаю', 'kravene': 'вимоги', 'annonsen': 'оголошення', 'søk': 'подавайся', 'likevel': 'усе одно', 'lære': 'навчитися', 'raskt': 'швидко', 'ærlig': 'чесна', 'resten': 'решта', 'send': 'надішли', 'ring': 'зателефонуй', 'kontaktpersonen': 'контактна особа', 'still': 'постав', 'spørsmål': 'питання', 'husket': 'запам’ятають', 'overbevisende': 'переконлива', 'vage': 'розпливчасті', 'fraser': 'фрази' },
    en: { 'skrevet': 'written', 'søknaden': 'the application', 'ganger': 'times', 'føles': 'feels', 'kjedelig': 'dull', 'lese': 'to read', 'ofte': 'often', 'problemet': 'the problem', 'teksten': 'the text', 'generell': 'general', 'står': 'it says', 'strukturert': 'structured', 'motivert': 'motivated', 'skriver': 'write', 'alle': 'everyone', 'stedet': 'instead (i stedet)', 'vis': 'show', 'eksempel': 'example', 'gjorde': 'did', 'resultatet': 'the result', 'innførte': 'introduced', 'rutine': 'routine', 'kuttet': 'cut', 'ventetiden': 'the waiting time', 'tjue': 'twenty', 'prosent': 'per cent', 'nettopp': 'exactly', 'sånn': 'like that', 'konkret': 'concrete', 'intervjuet': 'the interview', 'cv-en': 'the CV', 'bør': 'should', 'side': 'page', 'utdanning': 'education', 'erfaring': 'experience', 'språk': 'languages', 'bilde': 'photo', 'fødselsdato': 'date of birth', 'nødvendig': 'necessary', 'norge': 'Norway', 'referanser': 'references', 'oppgis': 'are given', 'forespørsel': 'request', 'oppfyller': 'meet', 'kravene': 'the requirements', 'annonsen': 'the advert', 'søk': 'apply', 'likevel': 'anyway', 'lære': 'to learn', 'raskt': 'quickly', 'ærlig': 'honest', 'resten': 'the rest', 'send': 'send', 'ring': 'call', 'kontaktpersonen': 'the contact person', 'still': 'ask', 'spørsmål': 'question', 'husket': 'remembered', 'overbevisende': 'convincing', 'vage': 'vague', 'fraser': 'phrases' }
  }
});
