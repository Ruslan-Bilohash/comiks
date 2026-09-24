window.COMICS = window.COMICS || [];

/* p131 — B1: автобус запізнюється. Як спитати про заміну, пересадку й повернення грошей. */
COMICS.push({
  id: 'p131',
  level: 'B1',
  category: 'hverdag',
  title: 'Bussen er forsinket',
  titleUk: 'Автобус запізнюється',
  titleEn: 'The bus is delayed',
  summaryUk: 'Через сніг автобус спізнюється на двадцять хвилин. Водійка пояснює, як зробити пересадку, а Марія дізнається про компенсацію за таксі.',
  summaryEn: 'Snow makes the bus twenty minutes late. The driver explains the connection, and Maria learns about the taxi refund rule.',
  summaryNo: 'Snøen gjør at bussen er tjue minutter forsinket. Sjåføren forklarer overgangen, og Maria får vite om taxigarantien.',
  cover: 0,

  panels: [
    { art: { bg: 'bus', chars: [{ id: 'maria', x: 300, mood: 'sad' }, { id: 'kari', x: 100, mood: 'normal' }], props: [{ type: 'busstop', x: 210 }], fx: 'snow' }, lines: [
      { who: 'narrator', no: 'Det snør, og bussen står fast i kø.', uk: 'Іде сніг, і автобус застряг у заторі.', en: 'It is snowing and the bus is stuck in traffic.' },
      { who: 'maria', no: 'Unnskyld, hvor forsinket er vi?', uk: 'Перепрошую, наскільки ми запізнюємося?', en: 'Excuse me, how delayed are we?' }
    ]},
    { art: { bg: 'bus', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'maria', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'kari', no: 'Omtrent tjue minutter. Veien er glatt i dag.', uk: 'Приблизно на двадцять хвилин. Сьогодні слизька дорога.', en: 'About twenty minutes. The road is slippery today.' },
      { who: 'maria', no: 'Da rekker jeg ikke toget mitt klokka ti.', uk: 'Тоді я не встигаю на свій потяг о десятій.', en: 'Then I will not catch my train at ten.' }
    ]},
    { art: { bg: 'bus', chars: [{ id: 'maria', x: 310, mood: 'normal' }, { id: 'kari', x: 100, mood: 'happy' }], props: [{ type: 'phone', x: 215, y: 195 }] }, lines: [
      { who: 'kari', no: 'Det går et tog tjue minutter senere. Sjekk appen.', uk: 'Є потяг на двадцять хвилин пізніше. Подивіться в застосунку.', en: 'There is a train twenty minutes later. Check the app.' },
      { who: 'maria', no: 'Stemmer, jeg ser det. Må jeg kjøpe ny billett?', uk: 'Так, бачу. Треба купувати новий квиток?', en: 'Right, I can see it. Do I have to buy a new ticket?' },
      { who: 'kari', no: 'Nei, billetten gjelder hele dagen på denne strekningen.', uk: 'Ні, квиток діє весь день на цьому маршруті.', en: 'No, the ticket is valid all day on this route.' }
    ]},
    { art: { bg: 'bus', chars: [{ id: 'kari', x: 100, mood: 'normal' }, { id: 'maria', x: 310, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'Og hvis jeg hadde måttet ta taxi?', uk: 'А якби мені довелося взяти таксі?', en: 'And what if I had had to take a taxi?' },
      { who: 'kari', no: 'Da kan du søke om refusjon hvis forsinkelsen er over tjue minutter.', uk: 'Тоді можна подати на відшкодування, якщо запізнення понад двадцять хвилин.', en: 'Then you can claim a refund if the delay is more than twenty minutes.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'maria', x: 200, mood: 'happy', pose: 'hold' }], props: [{ type: 'phone', x: 300, y: 200 }], fx: 'snow' }, lines: [
      { who: 'narrator', no: 'Maria går av og finner togperrongen.', uk: 'Марія виходить і знаходить платформу.', en: 'Maria gets off and finds the platform.' },
      { who: 'maria', no: 'Heldigvis har jeg god tid nå.', uk: 'На щастя, тепер у мене досить часу.', en: 'Luckily I have plenty of time now.' }
    ]},
    { art: { bg: 'bus', chars: [{ id: 'maria', x: 300, mood: 'grin', pose: 'wave' }, { id: 'kari', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Takk for hjelpen! Ha en fin dag videre.', uk: 'Дякую за допомогу! Гарного дня.', en: 'Thanks for your help! Have a nice day.' },
      { who: 'kari', no: 'I like måte. Kjør forsiktig der ute!', uk: 'І вам того самого. Обережно на дорозі!', en: 'Same to you. Take care out there!' }
    ]}
  ],

  vocab: [
    ['forsinket', 'із запізненням', 'delayed'],
    ['ei forsinkelse', 'запізнення', 'a delay'],
    ['å stå fast', 'застрягти', 'to be stuck'],
    ['glatt', 'слизький', 'slippery'],
    ['å rekke', 'встигнути', 'to catch, to make it'],
    ['en overgang', 'пересадка', 'a connection'],
    ['ei strekning', 'маршрут, ділянка', 'a route'],
    ['å gjelde', 'бути дійсним', 'to be valid'],
    ['ei refusjon', 'відшкодування', 'a refund'],
    ['ei perrong', 'платформа', 'a platform'],
    ['heldigvis', 'на щастя', 'luckily'],
    ['å gå av', 'виходити (з транспорту)', 'to get off'],
    ['forsiktig', 'обережно', 'carefully'],
    ['i like måte', 'і вам того самого', 'same to you']
  ],

  words: {
    no: { 'snør': 'сніжить', 'bussen': 'автобус', 'står': 'стоїть', 'fast': 'застряг (stå fast)', 'kø': 'затор', 'unnskyld': 'перепрошую', 'forsinket': 'із запізненням', 'omtrent': 'приблизно', 'tjue': 'двадцять', 'minutter': 'хвилини', 'veien': 'дорога', 'glatt': 'слизька', 'rekker': 'встигаю', 'toget': 'потяг', 'tog': 'потяг', 'klokka': 'година', 'senere': 'пізніше', 'sjekk': 'перевір', 'appen': 'застосунок', 'stemmer': 'правильно, так', 'kjøpe': 'купувати', 'billett': 'квиток', 'billetten': 'квиток', 'gjelder': 'діє', 'hele': 'увесь', 'dagen': 'день', 'denne': 'цей', 'strekningen': 'маршрут', 'hadde': 'мав би', 'måttet': 'мусила', 'taxi': 'таксі', 'søke': 'подати заяву', 'refusjon': 'відшкодування', 'forsinkelsen': 'запізнення', 'togperrongen': 'платформа', 'heldigvis': 'на щастя', 'god': 'багато (god tid — досить часу)', 'hjelpen': 'допомога', 'videre': 'далі', 'måte': 'спосіб (i like måte — і вам того самого)', 'kjør': 'їдь', 'forsiktig': 'обережно', 'sjåføren': 'водійка' },
    en: { 'snør': 'is snowing', 'bussen': 'the bus', 'står': 'stands', 'fast': 'stuck', 'kø': 'queue, traffic', 'unnskyld': 'excuse me', 'forsinket': 'delayed', 'omtrent': 'about', 'tjue': 'twenty', 'minutter': 'minutes', 'veien': 'the road', 'glatt': 'slippery', 'rekker': 'catch, make it', 'toget': 'the train', 'tog': 'train', 'klokka': 'at (o’clock)', 'senere': 'later', 'sjekk': 'check', 'appen': 'the app', 'stemmer': 'that is right', 'kjøpe': 'to buy', 'billett': 'ticket', 'billetten': 'the ticket', 'gjelder': 'is valid', 'hele': 'the whole', 'dagen': 'the day', 'denne': 'this', 'strekningen': 'the route', 'hadde': 'had', 'måttet': 'had to', 'taxi': 'taxi', 'søke': 'to claim', 'refusjon': 'refund', 'forsinkelsen': 'the delay', 'togperrongen': 'the platform', 'heldigvis': 'luckily', 'god': 'plenty (god tid)', 'hjelpen': 'the help', 'videre': 'onwards', 'måte': 'way (i like måte — same to you)', 'kjør': 'drive', 'forsiktig': 'carefully', 'sjåføren': 'the driver' }
  }
});
