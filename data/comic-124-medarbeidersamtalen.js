window.COMICS = window.COMICS || [];

/* p124 — «Бесіда з керівником»: щорічна medarbeidersamtale.
   Рівень B2: складніші конструкції (jeg opplever at…, på sikt, å ta ansvar for),
   ділова лексика й ввічливе обговорення зарплати. Вісім кадрів. */
COMICS.push({
  id: 'p124',
  level: 'B2',
  category: 'jobb',
  title: 'Medarbeidersamtalen',
  titleUk: 'Бесіда з керівником',
  titleEn: 'The appraisal talk',
  summaryUk: 'Раз на рік у Норвегії кожен працівник має розмову з керівником: що вдалося, що складно й куди рухатися далі. Денис готується, говорить про навантаження, курси — і обережно піднімає питання зарплати.',
  summaryEn: 'Once a year every employee in Norway has a talk with their manager: what went well, what is hard and where to go next. Denys prepares, talks about his workload and courses — and carefully raises the question of salary.',
  summaryNo: 'En gang i året har alle ansatte i Norge en medarbeidersamtale: hva som har gått bra, hva som er krevende og veien videre. Denys forbereder seg, snakker om arbeidsmengde og kurs – og tar forsiktig opp lønn.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'denys', x: 110, mood: 'normal' }, { id: 'laerer', x: 310, mood: 'happy', pose: 'wave' }], props: [{ type: 'officedesk', x: 110 }, { type: 'docs', x: 240, y: 205 }] }, lines: [
      { who: 'narrator', no: 'En gang i året har alle ansatte en medarbeidersamtale med lederen sin.', uk: 'Раз на рік кожен працівник має бесіду зі своїм керівником.', en: 'Once a year every employee has an appraisal talk with their manager.' },
      { who: 'laerer', no: 'Velkommen, Denys. Sett deg. Hvordan har året vært for deg?', uk: 'Вітаю, Денисе. Сідай. Яким був для тебе цей рік?', en: 'Welcome, Denys. Have a seat. How has the year been for you?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 110, mood: 'happy' }, { id: 'laerer', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 110 }] }, lines: [
      { who: 'denys', no: 'Stort sett bra. Jeg har lært mye, særlig etter at jeg tok over prosjektet.', uk: 'Загалом добре. Я багато навчився, особливо після того, як узяв проєкт.', en: 'Mostly good. I have learned a lot, especially after I took over the project.' },
      { who: 'laerer', no: 'Det har vi lagt merke til. Kundene er veldig fornøyde.', uk: 'Ми це помітили. Клієнти дуже задоволені.', en: 'We have noticed that. The clients are very pleased.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'laerer', x: 110, pose: 'point' }, { id: 'denys', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 110 }, { type: 'computer', x: 120, y: 175 }] }, lines: [
      { who: 'laerer', no: 'Er det noe som er krevende i hverdagen din?', uk: 'Чи є щось складне у твоїй щоденній роботі?', en: 'Is there anything demanding in your everyday work?' },
      { who: 'denys', no: 'Jeg opplever at arbeidsmengden har økt ganske mye i høst.', uk: 'Я відчуваю, що навантаження цієї осені помітно зросло.', en: 'I feel that the workload has increased quite a lot this autumn.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 110, mood: 'normal', pose: 'hips' }, { id: 'laerer', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 110 }] }, lines: [
      { who: 'denys', no: 'Jeg rekker oppgavene, men jeg må ofte jobbe overtid på fredager.', uk: 'Я встигаю виконувати завдання, але в п’ятницю часто доводиться працювати понаднормово.', en: 'I manage the tasks, but I often have to work overtime on Fridays.' },
      { who: 'laerer', no: 'Takk for at du sier ifra. Da bør vi fordele oppgavene annerledes.', uk: 'Дякую, що сказав. Тоді варто розподілити завдання інакше.', en: 'Thank you for speaking up. Then we should distribute the tasks differently.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'laerer', x: 110, mood: 'happy' }, { id: 'denys', x: 310, mood: 'happy' }], props: [{ type: 'officedesk', x: 110 }, { type: 'book', x: 235, y: 200 }] }, lines: [
      { who: 'laerer', no: 'Hva ønsker du å utvikle deg videre i?', uk: 'У чому ти хочеш розвиватися далі?', en: 'What would you like to develop further?' },
      { who: 'denys', no: 'Jeg vil gjerne ta et kurs i prosjektledelse, og på sikt lede et team.', uk: 'Хотів би пройти курс з управління проєктами, а згодом керувати командою.', en: 'I would like to take a course in project management, and lead a team in time.' },
      { who: 'laerer', no: 'Det støtter jeg. Vi har budsjett til kurs til våren.', uk: 'Я це підтримую. У нас є бюджет на курси навесні.', en: 'I support that. We have a budget for courses in the spring.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 110, mood: 'surprised' }, { id: 'laerer', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 110 }, { type: 'coins', x: 240, y: 205 }] }, lines: [
      { who: 'denys', no: 'Kan vi også snakke om lønn? Ansvaret mitt har blitt større.', uk: 'Чи можемо ми також поговорити про зарплату? Моя відповідальність зросла.', en: 'Can we also talk about salary? My responsibility has grown.' },
      { who: 'laerer', no: 'Helt greit å ta det opp. Lønn avgjøres i den årlige forhandlingen i mai.', uk: 'Цілком нормально це підняти. Зарплату визначають на щорічних перемовинах у травні.', en: 'It is perfectly fine to raise that. Salary is decided in the annual negotiation in May.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'laerer', x: 110, pose: 'hold' }, { id: 'denys', x: 310, mood: 'happy' }], props: [{ type: 'officedesk', x: 110 }, { type: 'docs', x: 235, y: 205 }] }, lines: [
      { who: 'laerer', no: 'Jeg skriver ned tre mål for neste år. Er du enig i dem?', uk: 'Я запишу три цілі на наступний рік. Ти з ними згоден?', en: 'I will write down three goals for next year. Do you agree with them?' },
      { who: 'denys', no: 'Ja, men jeg vil gjerne ha en tilbakemelding hvert kvartal.', uk: 'Так, але я хотів би отримувати зворотний зв’язок щокварталу.', en: 'Yes, but I would like feedback every quarter.' },
      { who: 'laerer', no: 'Avtale. Det blir en god rutine for oss begge.', uk: 'Домовились. Це буде корисна практика для нас обох.', en: 'Agreed. That will be a good routine for both of us.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 130, mood: 'grin', pose: 'cheer' }, { id: 'laerer', x: 300, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Takk for en åpen og nyttig samtale, Denys.', uk: 'Дякую за відверту й корисну розмову, Денисе.', en: 'Thank you for an open and useful conversation, Denys.' },
      { who: 'denys', no: 'Takk selv. Nå vet jeg hva jeg skal jobbe mot.', uk: 'Вам дякую. Тепер я знаю, до чого працювати.', en: 'Thank you too. Now I know what to work towards.' }
    ]}
  ],

  vocab: [
    ['ei medarbeidersamtale', 'бесіда з керівником', 'an appraisal talk'],
    ['en leder', 'керівник', 'a manager'],
    ['ei arbeidsmengde', 'навантаження', 'a workload'],
    ['krevende', 'вимогливий, складний', 'demanding'],
    ['å oppleve at', 'відчувати, що', 'to feel that'],
    ['å rekke', 'встигати', 'to manage in time'],
    ['overtid', 'понаднормові', 'overtime'],
    ['å si ifra', 'сказати прямо', 'to speak up'],
    ['å fordele', 'розподіляти', 'to distribute'],
    ['ei prosjektledelse', 'управління проєктами', 'project management'],
    ['på sikt', 'згодом, у перспективі', 'in the long run'],
    ['et ansvar', 'відповідальність', 'responsibility'],
    ['ei forhandling', 'перемовини', 'a negotiation'],
    ['ei tilbakemelding', 'зворотний зв’язок', 'feedback'],
    ['et mål', 'ціль', 'a goal'],
    ['ei rutine', 'усталений порядок', 'a routine'],
    ['fornøyd', 'задоволений', 'pleased']
  ],

  words: {
    no: { 'medarbeidersamtale': 'бесіда з керівником', 'gang': 'раз', 'året': 'рік', 'ansatte': 'працівники', 'lederen': 'керівник', 'velkommen': 'ласкаво просимо', 'sett': 'сідай (sette seg)', 'stort': 'великою мірою (stort sett — загалом)', 'særlig': 'особливо', 'tok': 'узяв', 'over': 'над, через (ta over — перейняти)', 'prosjektet': 'проєкт', 'lagt': 'клали (legge merke til — помітити)', 'merke': 'помітка (legge merke til — помітити)', 'kundene': 'клієнти', 'fornøyde': 'задоволені', 'krevende': 'складний, вимогливий', 'hverdagen': 'щоденне життя', 'opplever': 'відчуваю', 'arbeidsmengden': 'навантаження', 'økt': 'зросло', 'ganske': 'досить', 'høst': 'осінь', 'rekker': 'встигаю', 'oppgavene': 'завдання', 'ofte': 'часто', 'jobbe': 'працювати', 'overtid': 'понаднормово', 'fredager': 'п’ятниці', 'ifra': 'звідти (si ifra — сказати прямо)', 'fordele': 'розподілити', 'annerledes': 'інакше', 'ønsker': 'хочеш', 'utvikle': 'розвивати', 'videre': 'далі', 'kurs': 'курс', 'prosjektledelse': 'управління проєктами', 'sikt': 'перспектива (på sikt — згодом)', 'lede': 'керувати', 'team': 'команда', 'støtter': 'підтримую', 'budsjett': 'бюджет', 'våren': 'весна', 'lønn': 'зарплата', 'ansvaret': 'відповідальність', 'større': 'більший', 'blitt': 'став, стало (bli → har blitt)', 'greit': 'нормально', 'opp': 'угору (ta opp — підняти питання)', 'avgjøres': 'вирішується', 'årlige': 'щорічний', 'forhandlingen': 'перемовини', 'mai': 'травень', 'skriver': 'пишу', 'ned': 'вниз (skrive ned — записати)', 'mål': 'цілі', 'neste': 'наступний', 'enig': 'згоден', 'dem': 'їх', 'tilbakemelding': 'зворотний зв’язок', 'hvert': 'кожен', 'kvartal': 'квартал', 'avtale': 'домовленість', 'rutine': 'усталений порядок', 'begge': 'обоє', 'åpen': 'відкритий', 'nyttig': 'корисний', 'samtale': 'розмова', 'selv': 'сам (takk selv — і вам дякую)' },
    en: { 'medarbeidersamtale': 'appraisal talk', 'gang': 'time', 'året': 'the year', 'ansatte': 'employees', 'lederen': 'the manager', 'velkommen': 'welcome', 'sett': 'sit down', 'stort': 'largely (stort sett — mostly)', 'særlig': 'especially', 'tok': 'took', 'over': 'over (ta over — take over)', 'prosjektet': 'the project', 'lagt': 'laid (legge merke til — to notice)', 'merke': 'mark (legge merke til — to notice)', 'kundene': 'the clients', 'fornøyde': 'pleased', 'krevende': 'demanding', 'hverdagen': 'everyday life', 'opplever': 'experience, feel', 'arbeidsmengden': 'the workload', 'økt': 'increased', 'ganske': 'quite', 'høst': 'autumn', 'rekker': 'manage in time', 'oppgavene': 'the tasks', 'ofte': 'often', 'jobbe': 'to work', 'overtid': 'overtime', 'fredager': 'Fridays', 'ifra': 'from (si ifra — to speak up)', 'fordele': 'to distribute', 'annerledes': 'differently', 'ønsker': 'wish', 'utvikle': 'to develop', 'videre': 'further', 'kurs': 'course', 'prosjektledelse': 'project management', 'sikt': 'sight (på sikt — in the long run)', 'lede': 'to lead', 'team': 'team', 'støtter': 'support', 'budsjett': 'budget', 'våren': 'the spring', 'lønn': 'salary', 'ansvaret': 'the responsibility', 'større': 'bigger', 'blitt': 'become (bli → has become)', 'greit': 'fine', 'opp': 'up (ta opp — to raise)', 'avgjøres': 'is decided', 'årlige': 'annual', 'forhandlingen': 'the negotiation', 'mai': 'May', 'skriver': 'write', 'ned': 'down (skrive ned — write down)', 'mål': 'goals', 'neste': 'next', 'enig': 'in agreement', 'dem': 'them', 'tilbakemelding': 'feedback', 'hvert': 'every', 'kvartal': 'quarter', 'avtale': 'agreement', 'rutine': 'routine', 'begge': 'both', 'åpen': 'open', 'nyttig': 'useful', 'samtale': 'conversation', 'selv': 'yourself (takk selv — thank you too)' }
  }
});
