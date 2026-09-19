window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p111',
  level: 'A1',
  category: 'skole',
  title: 'Første dag på norskkurs',
  titleUk: 'Перший день на курсі норвезької',
  titleEn: 'First Day at Norwegian Class',
  summaryUk: 'Муса з Великої Британії, що живе в Драммені з двома дітьми, приходить на курс норвезької. Вчитель Мортен учить його знайомитися.',
  summaryEn: 'Musa from the UK, who lives in Drammen with his two children, starts a Norwegian course. Teacher Morten shows him how to introduce himself.',
  summaryNo: 'Musa fra Storbritannia bor i Drammen med de to barna sine. Nå begynner han på norskkurs, og lærer Morten lærer ham å presentere seg.',
  cover: 1,

  panels: [
    { art: { bg: 'school', board: 'Hei!', chars: [{ id: 'morten', x: 110, mood: 'happy', pose: 'wave' }, { id: 'musa', x: 290, mood: 'normal', pose: 'walk' }] }, lines: [
      { who: 'morten', no: 'Hei og velkommen! Jeg heter Morten. Jeg er læreren din.', uk: 'Привіт і ласкаво просимо! Мене звати Мортен. Я твій вчитель.', en: 'Hi and welcome! My name is Morten. I am your teacher.' },
      { who: 'musa', no: 'Hei! Jeg heter Musa.', uk: 'Привіт! Мене звати Муса.', en: 'Hi! My name is Musa.' }
    ]},
    { art: { bg: 'school', board: 'Hvor kommer du fra?', chars: [{ id: 'morten', x: 110, pose: 'point' }, { id: 'musa', x: 290, mood: 'happy' }] }, lines: [
      { who: 'morten', no: 'Hvor kommer du fra, Musa?', uk: 'Звідки ти, Мусо?', en: 'Where are you from, Musa?' },
      { who: 'musa', no: 'Jeg kommer fra Storbritannia. Jeg bor i Drammen nå.', uk: 'Я з Великої Британії. Тепер я живу в Драммені.', en: 'I am from the UK. I live in Drammen now.' }
    ]},
    { art: { bg: 'school', board: 'Hvilke språk snakker du?', chars: [{ id: 'morten', x: 110, mood: 'grin' }, { id: 'musa', x: 290, pose: 'hips' }] }, lines: [
      { who: 'morten', no: 'Hvilke språk snakker du?', uk: 'Якими мовами ти розмовляєш?', en: 'Which languages do you speak?' },
      { who: 'musa', no: 'Jeg snakker engelsk og litt fransk. Og nå lærer jeg norsk!', uk: 'Я розмовляю англійською і трохи французькою. А тепер вчу норвезьку!', en: 'I speak English and a little French. And now I am learning Norwegian!' }
    ]},
    { art: { bg: 'school', board: 'Hva jobber du med?', chars: [{ id: 'morten', x: 110, pose: 'hold' }, { id: 'musa', x: 290, mood: 'happy' }], props: [{ type: 'book', x: 110, y: 230, front: true }] }, lines: [
      { who: 'morten', no: 'Så bra! Hva jobber du med?', uk: 'Чудово! Ким ти працюєш?', en: 'Great! What do you work as?' },
      { who: 'musa', no: 'Jeg er ingeniør. Jeg har fått ny jobb i Norge.', uk: 'Я інженер. Я отримав нову роботу в Норвегії.', en: 'I am an engineer. I have got a new job in Norway.' },
      { who: 'musa', no: 'Og jeg har to barn. De går på skole her.', uk: 'І в мене двоє дітей. Вони ходять тут до школи.', en: 'And I have two children. They go to school here.' }
    ]},
    { art: { bg: 'school', board: 'Norsk er ...', chars: [{ id: 'musa', x: 120, mood: 'surprised' }, { id: 'morten', x: 290, mood: 'grin', pose: 'hips' }] }, lines: [
      { who: 'musa', no: 'Norsk er vanskelig! Hvordan sier man «kj»?', uk: 'Норвезька складна! Як вимовляти «kj»?', en: 'Norwegian is difficult! How do you say “kj”?' },
      { who: 'morten', no: 'Si «kjøkken». Det er lettere enn det ser ut!', uk: 'Скажи «kjøkken». Це легше, ніж здається!', en: 'Say “kjøkken”. It is easier than it looks!' }
    ]},
    { art: {"bg": "school", "board": "1 2 3 4 5", "chars": [{"id": "morten", "x": 110, "mood": "happy", "pose": "point"}, {"id": "musa", "x": 290, "mood": "grin"}]}, lines: [
      { who: "morten", no: "Nå øver vi på tallene. Kan du telle til fem?", uk: "Тепер потренуємо числа. Можеш порахувати до п’яти?", en: "Now let us practise numbers. Can you count to five?" },
      { who: "musa", no: "En, to, tre, fire, fem! Lett!", uk: "Один, два, три, чотири, п’ять! Легко!", en: "One, two, three, four, five! Easy!" }
    ]},
    { art: {"bg": "school", "board": "7 = sju / syv", "chars": [{"id": "morten", "x": 110, "mood": "grin", "pose": "hips"}, {"id": "musa", "x": 290, "mood": "surprised"}]}, lines: [
      { who: "morten", no: "Bra! Og sju? Vi kan også si syv.", uk: "Добре! А сім? Можна сказати й «syv».", en: "Good! And seven? We can also say “syv”." },
      { who: "musa", no: "To ord for det samme tallet? Norsk er rart!", uk: "Два слова для одного числа? Норвезька дивна!", en: "Two words for the same number? Norwegian is strange!" }
    ]},
    { art: {"bg": "school", "board": "mandag · tirsdag · onsdag", "chars": [{"id": "morten", "x": 110, "pose": "point"}, {"id": "musa", "x": 290, "mood": "happy", "pose": "hips"}]}, lines: [
      { who: "morten", no: "Hvilken dag er det i dag?", uk: "Який сьогодні день?", en: "What day is it today?" },
      { who: "musa", no: "I dag er det mandag. I går var det søndag.", uk: "Сьогодні понеділок. Учора була неділя.", en: "Today is Monday. Yesterday was Sunday." }
    ]},
    { art: {"bg": "school", "board": "Pause ☕", "chars": [{"id": "musa", "x": 120, "mood": "happy", "pose": "hold"}, {"id": "morten", "x": 290, "mood": "grin", "pose": "hold"}], "props": [{"type": "mug", "x": 145, "y": 225, "front": true}, {"type": "mug", "x": 265, "y": 225, "front": true}]}, lines: [
      { who: "narrator", no: "Etter en time tar klassen pause.", uk: "Через годину клас робить перерву.", en: "After an hour the class takes a break." },
      { who: "musa", no: "Morten, drikker nordmenn mye kaffe?", uk: "Мортене, норвежці п’ють багато кави?", en: "Morten, do Norwegians drink a lot of coffee?" },
      { who: "morten", no: "Ja! Vi drikker kaffe hele dagen – også om kvelden.", uk: "Так! Ми п’ємо каву цілий день — і ввечері теж.", en: "Yes! We drink coffee all day — in the evening too." }
    ]},
    { art: {"bg": "school", "board": "Lekse ✏️", "chars": [{"id": "morten", "x": 110, "pose": "hold"}, {"id": "musa", "x": 290, "mood": "happy"}], "props": [{"type": "book", "x": 110, "y": 230, "front": true}]}, lines: [
      { who: "morten", no: "Til torsdag skal du skrive fem setninger om familien din.", uk: "До четверга напиши п’ять речень про свою сім’ю.", en: "By Thursday you must write five sentences about your family." },
      { who: "musa", no: "Det klarer jeg. Jeg skriver om barna mine.", uk: "Я впораюся. Напишу про своїх дітей.", en: "I can do that. I will write about my children." }
    ]},
    { art: {"bg": "school", "board": "10 uker", "chars": [{"id": "musa", "x": 120, "pose": "point"}, {"id": "morten", "x": 290, "mood": "happy", "pose": "hips"}]}, lines: [
      { who: "musa", no: "Hvor lenge varer kurset?", uk: "Скільки триває курс?", en: "How long does the course last?" },
      { who: "morten", no: "Kurset varer i ti uker, to kvelder i uka.", uk: "Курс триває десять тижнів, два вечори на тиждень.", en: "The course lasts ten weeks, two evenings a week." }
    ]},
    { art: { bg: 'school', board: 'Ha det!', chars: [{ id: 'morten', x: 110, mood: 'happy', pose: 'wave' }, { id: 'musa', x: 290, mood: 'happy', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'morten', no: 'Flott jobba i dag! Vi ses på torsdag.', uk: 'Чудова робота сьогодні! Побачимося в четвер.', en: 'Great job today! See you on Thursday.' },
      { who: 'musa', no: 'Tusen takk, Morten! Ha det bra!', uk: 'Дуже дякую, Мортене! До побачення!', en: 'Thank you so much, Morten! Goodbye!' }
    ]}
  ],

  vocab: [
    ['å hete', 'зватися', 'to be called'],
    ['komme fra', 'бути родом з', 'to come from'],
    ['bo', 'жити', 'to live'],
    ['språk', 'мова', 'language'],
    ['snakke', 'розмовляти', 'to speak'],
    ['lære', 'вчити', 'to learn'],
    ['jobbe', 'працювати', 'to work'],
    ['ingeniør', 'інженер', 'engineer'],
    ['vanskelig', 'складний', 'difficult'],
    ['lett', 'легкий', 'easy'],
    ['lærer', 'вчитель', 'teacher'],
    ['Storbritannia', 'Велика Британія', 'the United Kingdom'],
    ['et barn – to barn', 'дитина – двоє дітей', 'a child – two children'],
    ["telle", "рахувати", "to count"],
    ["i dag – i går", "сьогодні – учора", "today – yesterday"],
    ["en pause", "перерва", "a break"],
    ["ei lekse", "домашнє завдання", "homework"],
    ["ei setning", "речення", "a sentence"],
    ["vare", "тривати", "to last"]
  ],

  words: {
    no: { 'hvilke': 'які', 'fransk': 'французька', 'fått': 'отримав (від få)', 'sier': 'каже, вимовляє', 'man': 'хтось, люди (безособове)', 'lettere': 'легше', 'ser': 'виглядає', 'flott': 'чудово', 'jobba': 'попрацював', 'torsdag': 'четвер', 'storbritannia': 'Велика Британія', 'ingeniør': 'інженер', 'læreren': 'вчитель' },
    en: { 'hvilke': 'which', 'fransk': 'French', 'fått': 'got (from få)', 'sier': 'says', 'man': 'one, you (impersonal)', 'lettere': 'easier', 'ser': 'looks', 'flott': 'great', 'jobba': 'worked', 'torsdag': 'Thursday', 'storbritannia': 'the United Kingdom', 'ingeniør': 'engineer', 'læreren': 'the teacher' }
  }
});
