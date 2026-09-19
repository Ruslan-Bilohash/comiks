window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p105',
  level: 'A2',
  category: 'hverdag',
  title: 'På bussen',
  titleUk: 'В автобусі',
  titleEn: 'On the Bus',
  summaryUk: 'Денис їде на курси норвезької: як купити квиток у застосунку, де пересісти й коли виходити.',
  summaryEn: 'Denys takes the bus to his Norwegian course: buying a ticket in the app, changing buses and getting off.',
  summaryNo: 'Denys tar bussen til norskkurset: billett i appen, bytte og å gå av på riktig stopp.',
  cover: 1,

  panels: [
    { art: { bg: 'street', chars: [{ id: 'denys', x: 110, pose: 'point' }, { id: 'kari', x: 300, mood: 'happy' }], props: [{ type: 'busstop', x: 205 }] }, lines: [
      { who: 'denys', no: 'Unnskyld, går denne bussen til sentrum?', uk: 'Перепрошую, цей автобус їде до центру?', en: 'Excuse me, does this bus go to the city centre?' },
      { who: 'kari', no: 'Ja, men du må bytte ved jernbanestasjonen.', uk: 'Так, але на залізничному вокзалі треба пересісти.', en: 'Yes, but you have to change at the railway station.' }
    ]},
    { art: { bg: 'bus', sign: 'SENTRUM', chars: [{ id: 'denys', x: 90, pose: 'hold' }, { id: 'kari', x: 320, pose: 'point', flip: true }] }, lines: [
      { who: 'denys', no: 'Kan jeg kjøpe billett hos deg?', uk: 'Можна купити квиток у вас?', en: 'Can I buy a ticket from you?' },
      { who: 'kari', no: 'Nei, du må kjøpe billett i appen før du går på.', uk: 'Ні, квиток треба купити в застосунку, перш ніж заходити.', en: 'No, you have to buy a ticket in the app before you get on.' }
    ]},
    { art: { bg: 'bus', sign: 'SENTRUM', chars: [{ id: 'denys', x: 100, mood: 'happy', pose: 'hold' }, { id: 'kari', x: 320, mood: 'happy' }], props: [{ type: 'phone', x: 100, y: 236, front: true }] }, lines: [
      { who: 'denys', no: 'Et øyeblikk … Nå har jeg kjøpt en voksenbillett.', uk: 'Хвилинку… Тепер я купив дорослий квиток.', en: 'Just a moment… Now I\'ve bought an adult ticket.' },
      { who: 'kari', no: 'Supert. Sett deg, vi kjører nå.', uk: 'Чудово. Сідайте, ми рушаємо.', en: 'Great. Take a seat, we\'re leaving now.' }
    ]},
    { art: { bg: 'bus', sign: 'JERNBANESTASJONEN', chars: [{ id: 'maria', x: 100, mood: 'happy', pose: 'wave' }, { id: 'denys', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'maria', no: 'Hei, Denys! Skal du på jobb?', uk: 'Привіт, Денисе! Їдеш на роботу?', en: 'Hi, Denys! Are you going to work?' },
      { who: 'denys', no: 'Nei, jeg skal på norskkurs. Det begynner klokka ni.', uk: 'Ні, я їду на курси норвезької. Вони починаються о дев’ятій.', en: 'No, I\'m going to a Norwegian course. It starts at nine.' }
    ]},
    { art: { bg: 'bus', sign: 'JERNBANESTASJONEN', chars: [{ id: 'maria', x: 100, pose: 'point' }, { id: 'denys', x: 310 }] }, lines: [
      { who: 'narrator', no: 'Neste stopp: Jernbanestasjonen.', uk: 'Наступна зупинка: Залізничний вокзал.', en: 'Next stop: The railway station.' },
      { who: 'maria', no: 'Her må du gå av og ta trikken.', uk: 'Тут тобі треба вийти й сісти на трамвай.', en: 'Here you have to get off and take the tram.' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 100, mood: 'grin', pose: 'wave' }, { id: 'maria', x: 310, mood: 'happy', pose: 'wave' }], props: [{ type: 'busstop', x: 205 }] }, lines: [
      { who: 'denys', no: 'Takk for hjelpen! Ha en fin dag!', uk: 'Дякую за допомогу! Гарного дня!', en: 'Thanks for the help! Have a nice day!' },
      { who: 'maria', no: 'I like måte! Lykke til på kurset!', uk: 'Навзаєм! Успіхів на курсах!', en: 'Same to you! Good luck with the course!' }
    ]}
  ],

  vocab: [
    ['bussen', 'автобус', 'the bus'], ['sentrum', 'центр міста', 'city centre'], ['bytte', 'пересісти', 'change'], ['jernbanestasjonen', 'залізничний вокзал', 'the railway station'],
    ['kjøpe', 'купувати', 'buy'], ['billett', 'квиток', 'ticket'], ['appen', 'застосунок', 'the app'], ['gå på', 'заходити (в транспорт)', 'get on'],
    ['et øyeblikk', 'хвилинку', 'just a moment'], ['voksenbillett', 'дорослий квиток', 'adult ticket'], ['sett deg', 'сідай', 'take a seat'], ['kjører', 'їдемо', 'drive, leave'],
    ['norskkurs', 'курси норвезької', 'Norwegian course'], ['neste stopp', 'наступна зупинка', 'next stop'], ['gå av', 'виходити', 'get off'], ['trikken', 'трамвай', 'the tram'],
    ['takk for hjelpen', 'дякую за допомогу', 'thanks for the help'], ['i like måte', 'навзаєм', 'same to you'], ['lykke til', 'успіхів', 'good luck']
  ]
});
