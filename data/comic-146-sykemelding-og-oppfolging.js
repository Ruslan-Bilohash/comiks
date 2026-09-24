window.COMICS = window.COMICS || [];

/* p146 — B2: лікарняний і супровід. Egenmelding, gradert sykmelding, план повернення. */
COMICS.push({
  id: 'p146',
  level: 'B2',
  category: 'helse',
  title: 'Sykmelding og oppfølging',
  titleUk: 'Лікарняний і повернення на роботу',
  titleEn: 'Sick leave and follow-up',
  summaryUk: 'У Руслана болить спина. Лікар пропонує частковий лікарняний, а керівник складає план повернення — без тиску, але з домовленостями.',
  summaryEn: 'Ruslan has back pain. The doctor suggests a graded sick note, and his manager makes a return-to-work plan — without pressure, but with clear agreements.',
  summaryNo: 'Ruslan har vondt i ryggen. Legen foreslår gradert sykmelding, og lederen lager en oppfølgingsplan – uten press, men med tydelige avtaler.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'sad' }, { id: 'kari', x: 100, mood: 'normal' }], props: [{ type: 'stetoskop', x: 215, y: 190 }] }, lines: [
      { who: 'kari', no: 'Ryggen trenger hvile, men full sykmelding er ikke alltid det beste.', uk: 'Спині потрібен відпочинок, але повний лікарняний не завжди найкраще рішення.', en: 'Your back needs rest, but a full sick note is not always the best option.' },
      { who: 'ruslan', no: 'Hva mener du med det?', uk: 'Що ви маєте на увазі?', en: 'What do you mean by that?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'ruslan', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'kari', no: 'Gradert sykmelding: du jobber femti prosent og trener opp ryggen gradvis.', uk: 'Частковий лікарняний: працюєш на п’ятдесят відсотків і поступово розробляєш спину.', en: 'A graded sick note: you work fifty per cent and build your back up gradually.' },
      { who: 'ruslan', no: 'Er det lov selv om jeg ikke klarer tunge løft?', uk: 'Це дозволено, навіть якщо я не можу піднімати важке?', en: 'Is that allowed even if I cannot lift heavy things?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal' }, { id: 'ruslan', x: 310, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'kari', no: 'Ja, arbeidsgiver skal tilrettelegge. Jeg skriver hvilke oppgaver du bør unngå.', uk: 'Так, роботодавець має пристосувати умови. Я напишу, яких завдань варто уникати.', en: 'Yes, the employer must adapt your tasks. I will write which duties you should avoid.' },
      { who: 'ruslan', no: 'Det gjør det lettere å snakke med sjefen.', uk: 'Так буде легше говорити з керівником.', en: 'That makes it easier to talk to my boss.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'morten', x: 100, mood: 'happy' }, { id: 'ruslan', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'morten', no: 'Takk for at du sier fra tidlig. Vi lager en oppfølgingsplan sammen.', uk: 'Дякую, що сказав завчасно. Складемо план супроводу разом.', en: 'Thanks for telling me early. We will make a follow-up plan together.' },
      { who: 'ruslan', no: 'Jeg kan ta kundesamtaler og opplæring, men ikke lageret.', uk: 'Я можу вести розмови з клієнтами й навчання, але не склад.', en: 'I can take customer calls and training, but not the warehouse.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'morten', x: 100, pose: 'hold' }, { id: 'ruslan', x: 310, mood: 'happy' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'morten', no: 'Vi skriver det ned og tar en samtale hver fjortende dag.', uk: 'Запишемо це й говоритимемо кожні два тижні.', en: 'We will write it down and have a talk every fortnight.' },
      { who: 'ruslan', no: 'Og hvis ryggen blir verre igjen?', uk: 'А якщо спині знову стане гірше?', en: 'And if my back gets worse again?' },
      { who: 'morten', no: 'Da justerer vi planen. Helsa er viktigst.', uk: 'Тоді скоригуємо план. Здоров’я найважливіше.', en: 'Then we adjust the plan. Health comes first.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'ruslan', no: 'Jeg var redd for å miste jobben, men dette føles trygt.', uk: 'Я боявся втратити роботу, але тепер почуваюся спокійно.', en: 'I was afraid of losing my job, but this feels safe.' },
      { who: 'morten', no: 'Ingen mister jobben av å bli syk. Vi finner løsninger.', uk: 'Ніхто не втрачає роботу через хворобу. Ми знаходимо рішення.', en: 'Nobody loses their job for being ill. We find solutions.' }
    ]}
  ],

  vocab: [
    ['ei sykmelding', 'лікарняний', 'a sick note'],
    ['gradert', 'частковий, поетапний', 'graded'],
    ['ei hvile', 'відпочинок', 'rest'],
    ['gradvis', 'поступово', 'gradually'],
    ['et løft', 'підняття ваги', 'a lift'],
    ['å tilrettelegge', 'пристосувати умови', 'to adapt, accommodate'],
    ['ei oppgave', 'завдання', 'a task'],
    ['å unngå', 'уникати', 'to avoid'],
    ['en oppfølgingsplan', 'план супроводу', 'a follow-up plan'],
    ['ei opplæring', 'навчання на роботі', 'training'],
    ['et lager', 'склад', 'a warehouse'],
    ['å justere', 'коригувати', 'to adjust'],
    ['ei helse', 'здоров’я', 'health'],
    ['ei løsning', 'рішення', 'a solution'],
    ['trygg', 'спокійний, безпечний', 'safe']
  ],

  words: {
    no: { 'ryggen': 'спина', 'trenger': 'потребує', 'hvile': 'відпочинок', 'full': 'повний', 'sykmelding': 'лікарняний', 'alltid': 'завжди', 'beste': 'найкраще', 'mener': 'маєте на увазі', 'gradert': 'частковий', 'jobber': 'працюєш', 'femti': 'п’ятдесят', 'prosent': 'відсотків', 'trener': 'розробляєш', 'gradvis': 'поступово', 'lov': 'дозволено', 'klarer': 'можу', 'tunge': 'важкі', 'løft': 'підняття', 'arbeidsgiver': 'роботодавець', 'tilrettelegge': 'пристосувати', 'skriver': 'напишу', 'oppgaver': 'завдання', 'bør': 'варто', 'unngå': 'уникати', 'lettere': 'легше', 'sjefen': 'керівник', 'tidlig': 'завчасно', 'lager': 'складемо; склад', 'oppfølgingsplan': 'план супроводу', 'sammen': 'разом', 'kundesamtaler': 'розмови з клієнтами', 'opplæring': 'навчання', 'lageret': 'склад', 'ned': 'вниз (skrive ned — записати)', 'samtale': 'розмова', 'fjortende': 'чотирнадцятий (hver fjortende dag — кожні два тижні)', 'verre': 'гірше', 'justerer': 'коригуємо', 'planen': 'план', 'helsa': 'здоров’я', 'viktigst': 'найважливіше', 'redd': 'наляканий', 'miste': 'утратити', 'jobben': 'робота', 'føles': 'відчувається', 'trygt': 'спокійно', 'mister': 'втрачає', 'syk': 'хворий', 'løsninger': 'рішення', 'legen': 'лікар', 'foreslår': 'пропонує', 'lederen': 'керівник', 'press': 'тиск', 'tydelige': 'чіткі', 'avtaler': 'домовленості' },
    en: { 'ryggen': 'the back', 'trenger': 'needs', 'hvile': 'rest', 'full': 'full', 'sykmelding': 'sick note', 'alltid': 'always', 'beste': 'best', 'mener': 'mean', 'gradert': 'graded', 'jobber': 'work', 'femti': 'fifty', 'prosent': 'per cent', 'trener': 'train', 'gradvis': 'gradually', 'lov': 'allowed', 'klarer': 'manage', 'tunge': 'heavy', 'løft': 'lifts', 'arbeidsgiver': 'employer', 'tilrettelegge': 'to adapt', 'skriver': 'write', 'oppgaver': 'tasks', 'bør': 'should', 'unngå': 'to avoid', 'lettere': 'easier', 'sjefen': 'the boss', 'tidlig': 'early', 'lager': 'make; warehouse', 'oppfølgingsplan': 'follow-up plan', 'sammen': 'together', 'kundesamtaler': 'customer calls', 'opplæring': 'training', 'lageret': 'the warehouse', 'ned': 'down (skrive ned — write down)', 'samtale': 'talk', 'fjortende': 'fourteenth (hver fjortende dag — every fortnight)', 'verre': 'worse', 'justerer': 'adjust', 'planen': 'the plan', 'helsa': 'health', 'viktigst': 'most important', 'redd': 'afraid', 'miste': 'to lose', 'jobben': 'the job', 'føles': 'feels', 'trygt': 'safe', 'mister': 'loses', 'syk': 'ill', 'løsninger': 'solutions', 'legen': 'the doctor', 'foreslår': 'suggests', 'lederen': 'the manager', 'press': 'pressure', 'tydelige': 'clear', 'avtaler': 'agreements' }
  }
});
