window.COMICS = window.COMICS || [];

/* p133 — B1: підготовка до Norskprøven. Частини іспиту, запис, поради вчителя. */
COMICS.push({
  id: 'p133',
  level: 'B1',
  category: 'skole',
  title: 'Norskprøven',
  titleUk: 'Іспит із норвезької',
  titleEn: 'The Norwegian exam',
  summaryUk: 'Аліна готується до Norskprøven. Учитель пояснює чотири частини іспиту, як записатися й що робити, якщо хвилюєшся на співбесіді.',
  summaryEn: 'Alina is preparing for the Norwegian exam. The teacher explains the four parts, how to register and what to do if you get nervous in the speaking test.',
  summaryNo: 'Alina forbereder seg til norskprøven. Læreren forklarer de fire delene, hvordan man melder seg opp, og hva man gjør hvis man blir nervøs i muntlig.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'Norskprøven', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'point' }, { id: 'alina', x: 310, mood: 'normal' }], props: [{ type: 'desk', x: 310 }] }, lines: [
      { who: 'alina', no: 'Jeg vil ta norskprøven til våren. Hvor begynner jeg?', uk: 'Я хочу скласти іспит навесні. З чого почати?', en: 'I want to take the Norwegian exam in spring. Where do I begin?' },
      { who: 'laerer', no: 'Først melder du deg opp på nettet, senest seks uker før.', uk: 'Спершу реєструєшся онлайн, щонайпізніше за шість тижнів.', en: 'First you register online, at the latest six weeks before.' }
    ]},
    { art: { bg: 'school', board: 'lytte · lese · skrive · snakke', chars: [{ id: 'laerer', x: 110, pose: 'point' }, { id: 'alina', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'laerer', no: 'Prøven har fire deler: lytte, lese, skrive og snakke.', uk: 'Іспит має чотири частини: слухання, читання, письмо й говоріння.', en: 'The exam has four parts: listening, reading, writing and speaking.' },
      { who: 'alina', no: 'Er alle delene på samme dag?', uk: 'Усі частини в один день?', en: 'Are all the parts on the same day?' },
      { who: 'laerer', no: 'Nei, muntlig er som regel en annen dag.', uk: 'Ні, усна частина зазвичай іншого дня.', en: 'No, the speaking test is usually on another day.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'alina', x: 310, mood: 'sad' }, { id: 'laerer', x: 110, mood: 'normal' }] }, lines: [
      { who: 'alina', no: 'Jeg er mest redd for muntlig. Jeg blir så nervøs.', uk: 'Найбільше боюся усної. Я дуже хвилююся.', en: 'I am most afraid of the speaking test. I get so nervous.' },
      { who: 'laerer', no: 'Husk at du kan be om å gjenta: «Kan du si det en gang til?»', uk: 'Пам’ятай, що можна попросити повторити: «Kan du si det en gang til?»', en: 'Remember that you can ask them to repeat: “Kan du si det en gang til?”' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'laerer', x: 110, mood: 'happy' }, { id: 'alina', x: 310, mood: 'happy' }], props: [{ type: 'book', x: 215, y: 200 }] }, lines: [
      { who: 'laerer', no: 'Øv på å begrunne meningene dine: «Jeg mener … fordi …».', uk: 'Тренуйся обґрунтовувати думку: «Jeg mener … fordi …».', en: 'Practise giving reasons: “Jeg mener … fordi …”.' },
      { who: 'alina', no: 'Og hvis jeg ikke kan et ord?', uk: 'А якщо я не знаю якогось слова?', en: 'And if I do not know a word?' },
      { who: 'laerer', no: 'Forklar det med andre ord. Det teller som god kommunikasjon.', uk: 'Поясни іншими словами. Це зараховують як добру комунікацію.', en: 'Explain it in other words. That counts as good communication.' }
    ]},
    { art: { bg: 'school', board: 'A2 · B1 · B2', chars: [{ id: 'alina', x: 310, mood: 'normal' }, { id: 'laerer', x: 110, mood: 'normal' }] }, lines: [
      { who: 'alina', no: 'Hvilket nivå trenger jeg for å studere videre?', uk: 'Який рівень потрібен, щоб навчатися далі?', en: 'Which level do I need in order to study further?' },
      { who: 'laerer', no: 'Vanligvis B2 til universitetet og B1 til mange jobber.', uk: 'Зазвичай B2 для університету й B1 для багатьох робіт.', en: 'Usually B2 for university and B1 for many jobs.' }
    ]},
    { art: { bg: 'school', chars: [{ id: 'alina', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Du har god ordforråd allerede. Bare fortsett å snakke hver dag.', uk: 'У тебе вже гарний словниковий запас. Просто говори щодня.', en: 'You already have a good vocabulary. Just keep speaking every day.' },
      { who: 'alina', no: 'Takk! Da melder jeg meg opp i kveld.', uk: 'Дякую! Тоді зареєструюся сьогодні ввечері.', en: 'Thank you! Then I will register tonight.' }
    ]}
  ],

  vocab: [
    ['ei prøve', 'іспит, тест', 'an exam, a test'],
    ['å melde seg opp', 'зареєструватися на іспит', 'to register for an exam'],
    ['senest', 'щонайпізніше', 'at the latest'],
    ['ei del', 'частина', 'a part'],
    ['muntlig', 'усний', 'oral, spoken'],
    ['skriftlig', 'письмовий', 'written'],
    ['nervøs', 'знервований', 'nervous'],
    ['å gjenta', 'повторити', 'to repeat'],
    ['å begrunne', 'обґрунтовувати', 'to give reasons'],
    ['ei mening', 'думка', 'an opinion'],
    ['å forklare', 'пояснювати', 'to explain'],
    ['ei kommunikasjon', 'спілкування', 'communication'],
    ['et nivå', 'рівень', 'a level'],
    ['et ordforråd', 'словниковий запас', 'vocabulary'],
    ['å fortsette', 'продовжувати', 'to continue']
  ],

  words: {
    no: { 'norskprøven': 'іспит із норвезької', 'våren': 'весна', 'begynner': 'починаю', 'melder': 'реєструєшся (melde seg opp)', 'opp': 'угору (melde seg opp — зареєструватися)', 'nettet': 'інтернет', 'senest': 'щонайпізніше', 'seks': 'шість', 'uker': 'тижні', 'før': 'до', 'prøven': 'іспит', 'fire': 'чотири', 'deler': 'частини', 'delene': 'частини', 'lytte': 'слухати', 'lese': 'читати', 'skrive': 'писати', 'snakke': 'говорити', 'samme': 'той самий', 'muntlig': 'усна частина', 'regel': 'правило (som regel — зазвичай)', 'annen': 'інший', 'redd': 'наляканий', 'nervøs': 'знервована', 'husk': 'пам’ятай', 'gjenta': 'повторити', 'øv': 'тренуйся', 'begrunne': 'обґрунтовувати', 'meningene': 'думки', 'mener': 'вважаю', 'fordi': 'тому що', 'ord': 'слово', 'forklar': 'поясни', 'andre': 'інші', 'teller': 'зараховується', 'kommunikasjon': 'спілкування', 'nivå': 'рівень', 'studere': 'навчатися', 'videre': 'далі', 'vanligvis': 'зазвичай', 'universitetet': 'університет', 'jobber': 'роботи', 'ordforråd': 'словниковий запас', 'allerede': 'уже', 'fortsett': 'продовжуй', 'kveld': 'вечір', 'forbereder': 'готується' },
    en: { 'norskprøven': 'the Norwegian exam', 'våren': 'the spring', 'begynner': 'begin', 'melder': 'register (melde seg opp)', 'opp': 'up (melde seg opp — to register)', 'nettet': 'the internet', 'senest': 'at the latest', 'seks': 'six', 'uker': 'weeks', 'før': 'before', 'prøven': 'the exam', 'fire': 'four', 'deler': 'parts', 'delene': 'the parts', 'lytte': 'to listen', 'lese': 'to read', 'skrive': 'to write', 'snakke': 'to speak', 'samme': 'same', 'muntlig': 'oral part', 'regel': 'rule (som regel — usually)', 'annen': 'another', 'redd': 'afraid', 'nervøs': 'nervous', 'husk': 'remember', 'gjenta': 'to repeat', 'øv': 'practise', 'begrunne': 'to give reasons', 'meningene': 'the opinions', 'mener': 'think, mean', 'fordi': 'because', 'ord': 'word', 'forklar': 'explain', 'andre': 'other', 'teller': 'counts', 'kommunikasjon': 'communication', 'nivå': 'level', 'studere': 'to study', 'videre': 'further', 'vanligvis': 'usually', 'universitetet': 'the university', 'jobber': 'jobs', 'ordforråd': 'vocabulary', 'allerede': 'already', 'fortsett': 'keep on', 'kveld': 'evening', 'forbereder': 'prepares' }
  }
});
