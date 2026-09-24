window.COMICS = window.COMICS || [];

/* p139 — B1: складна розмова із сусідом. Як ввічливо поскаржитися й домовитися. */
COMICS.push({
  id: 'p139',
  level: 'B1',
  category: 'bolig',
  title: 'En vanskelig nabosamtale',
  titleUk: 'Складна розмова із сусідом',
  titleEn: 'A difficult talk with a neighbour',
  summaryUk: 'Денис не висипається через нічну музику. Він учиться говорити про проблему спокійно: описати факт, сказати про свої відчуття й запропонувати рішення.',
  summaryEn: 'Denys cannot sleep because of late-night music. He learns to raise the issue calmly: describe the fact, say how it feels and suggest a solution.',
  summaryNo: 'Denys får ikke sove på grunn av musikk om natta. Han lærer å ta det opp rolig: beskrive fakta, si hvordan det oppleves, og foreslå en løsning.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'denys', x: 200, mood: 'sad' }], props: [{ type: 'sofa', x: 320 }, { type: 'clock', x: 90, y: 90 }] }, lines: [
      { who: 'narrator', no: 'Klokka er halv to om natta, og musikken dundrer gjennom veggen.', uk: 'Пів на другу ночі, а музика гримить крізь стіну.', en: 'It is half past one at night and the music is thumping through the wall.' },
      { who: 'denys', no: 'Jeg må si fra, men jeg vil ikke krangle.', uk: 'Треба сказати, але сваритися не хочу.', en: 'I have to say something, but I do not want to argue.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 110, mood: 'normal', pose: 'wave' }, { id: 'morten', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'denys', no: 'Hei! Har du to minutter? Jeg vil gjerne snakke om noe.', uk: 'Привіт! Маєш дві хвилини? Хочу дещо обговорити.', en: 'Hi! Do you have two minutes? I would like to talk about something.' },
      { who: 'morten', no: 'Klart. Er det noe galt?', uk: 'Звісно. Щось не так?', en: 'Sure. Is something wrong?' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 110, mood: 'normal' }, { id: 'morten', x: 310, mood: 'sad' }] }, lines: [
      { who: 'denys', no: 'I går kveld spilte dere musikk til nesten to. Jeg sov nesten ikke.', uk: 'Учора ввечері ви вмикали музику майже до другої. Я майже не спав.', en: 'Last night you played music until almost two. I hardly slept.' },
      { who: 'morten', no: 'Oi. Jeg trodde ikke det hørtes så godt gjennom veggen.', uk: 'Ой. Я не думав, що це так чути крізь стіну.', en: 'Oh. I did not think it carried through the wall like that.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'morten', x: 310, mood: 'normal' }, { id: 'denys', x: 110, mood: 'happy' }] }, lines: [
      { who: 'denys', no: 'Jeg skjønner at dere feiret. Kan vi si ro etter elleve på hverdager?', uk: 'Я розумію, що ви святкували. Домовимося про тишу після одинадцятої в будні?', en: 'I understand that you were celebrating. Can we agree on quiet after eleven on weekdays?' },
      { who: 'morten', no: 'Det er helt greit. Jeg sier fra til de andre også.', uk: 'Цілком нормально. Я скажу й іншим.', en: 'That is absolutely fine. I will tell the others too.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'morten', x: 310, mood: 'happy' }, { id: 'denys', x: 110, mood: 'happy' }] }, lines: [
      { who: 'morten', no: 'Og si fra med en gang neste gang — du trenger ikke vente.', uk: 'І наступного разу кажи одразу — не треба чекати.', en: 'And tell me straight away next time — you do not have to wait.' },
      { who: 'denys', no: 'Takk. Det er lettere når vi snakker sammen.', uk: 'Дякую. Так простіше, коли говоримо одне з одним.', en: 'Thanks. It is easier when we talk to each other.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 120, mood: 'grin', pose: 'cheer' }, { id: 'morten', x: 300, mood: 'grin', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'morten', no: 'Vi har dugnad på lørdag. Blir du med? Da tar jeg med kaffe.', uk: 'У суботу в нас толока. Прийдеш? Я принесу каву.', en: 'We have a communal work day on Saturday. Will you join? I will bring coffee.' },
      { who: 'denys', no: 'Gjerne! Vi ses da.', uk: 'Залюбки! Тоді до зустрічі.', en: 'Gladly! See you then.' }
    ]}
  ],

  vocab: [
    ['en nabo', 'сусід', 'a neighbour'],
    ['å si fra', 'сказати прямо', 'to speak up'],
    ['å krangle', 'сваритися', 'to argue'],
    ['å dundre', 'гримати', 'to thump'],
    ['ei vegg', 'стіна', 'a wall'],
    ['å sove', 'спати', 'to sleep'],
    ['å høres', 'бути чутним', 'to be heard'],
    ['å feire', 'святкувати', 'to celebrate'],
    ['ro', 'тиша', 'quiet'],
    ['en hverdag', 'будній день', 'a weekday'],
    ['helt greit', 'цілком нормально', 'absolutely fine'],
    ['med en gang', 'одразу', 'straight away'],
    ['ei dugnad', 'громадська толока', 'a communal work day'],
    ['lettere', 'легше', 'easier']
  ],

  words: {
    no: { 'klokka': 'година', 'halv': 'пів', 'natta': 'ніч', 'musikken': 'музика', 'dundrer': 'гримить', 'gjennom': 'крізь', 'veggen': 'стіна', 'krangle': 'сваритися', 'minutter': 'хвилини', 'snakke': 'поговорити', 'klart': 'звісно', 'galt': 'не так', 'spilte': 'вмикали, грали', 'musikk': 'музика', 'nesten': 'майже', 'sov': 'спав', 'trodde': 'думав', 'hørtes': 'чулося', 'godt': 'добре', 'skjønner': 'розумію', 'feiret': 'святкували', 'ro': 'тиша', 'elleve': 'одинадцята', 'hverdager': 'будні', 'greit': 'нормально', 'andre': 'інші', 'gang': 'раз (med en gang — одразу)', 'neste': 'наступний', 'vente': 'чекати', 'lettere': 'легше', 'sammen': 'разом', 'dugnad': 'толока', 'lørdag': 'субота', 'kaffe': 'кава', 'gjerne': 'залюбки', 'sove': 'спати', 'grunn': 'причина (på grunn av — через)', 'oppleves': 'відчувається', 'foreslå': 'запропонувати', 'løsning': 'рішення', 'beskrive': 'описати', 'fakta': 'факти', 'rolig': 'спокійно' },
    en: { 'klokka': 'the clock', 'halv': 'half', 'natta': 'the night', 'musikken': 'the music', 'dundrer': 'thumps', 'gjennom': 'through', 'veggen': 'the wall', 'krangle': 'to argue', 'minutter': 'minutes', 'snakke': 'to talk', 'klart': 'sure', 'galt': 'wrong', 'spilte': 'played', 'musikk': 'music', 'nesten': 'almost', 'sov': 'slept', 'trodde': 'thought', 'hørtes': 'was heard', 'godt': 'well', 'skjønner': 'understand', 'feiret': 'celebrated', 'ro': 'quiet', 'elleve': 'eleven', 'hverdager': 'weekdays', 'greit': 'fine', 'andre': 'the others', 'gang': 'time (med en gang — at once)', 'neste': 'next', 'vente': 'to wait', 'lettere': 'easier', 'sammen': 'together', 'dugnad': 'communal work day', 'lørdag': 'Saturday', 'kaffe': 'coffee', 'gjerne': 'gladly', 'sove': 'to sleep', 'grunn': 'reason (på grunn av — because of)', 'oppleves': 'is experienced', 'foreslå': 'to suggest', 'løsning': 'solution', 'beskrive': 'to describe', 'fakta': 'facts', 'rolig': 'calmly' }
  }
});
