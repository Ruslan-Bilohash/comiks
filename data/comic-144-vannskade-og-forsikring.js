window.COMICS = window.COMICS || [];

/* p144 — B2: залило водою. Заява до страхової, франшиза, таксатор і відповідальність. */
COMICS.push({
  id: 'p144',
  level: 'B2',
  category: 'bolig',
  title: 'Vannskade og forsikring',
  titleUk: 'Залило водою: страховий випадок',
  titleEn: 'Water damage and insurance',
  summaryUk: 'У Нори лопнула труба. Вона повідомляє страхову, дізнається про франшизу, чекає на оцінювача й розуміє, чому фотографії важливі.',
  summaryEn: 'A pipe bursts in Nora’s flat. She reports it to the insurer, learns about the excess, waits for the assessor and sees why photos matter.',
  summaryNo: 'Et rør sprakk hos Nora. Hun melder skaden til forsikringen, lærer om egenandel, venter på takstmannen og skjønner hvorfor bilder er viktige.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'nora', x: 200, mood: 'sad', pose: 'point' }], props: [{ type: 'phone', x: 320, y: 200 }] }, lines: [
      { who: 'narrator', no: 'Et rør sprakk om natta, og gulvet på badet stod under vann.', uk: 'Уночі лопнула труба, і підлога у ванній опинилася під водою.', en: 'A pipe burst during the night, and the bathroom floor was under water.' },
      { who: 'nora', no: 'Først stenger jeg hovedkrana, så ringer jeg forsikringen.', uk: 'Спершу перекриваю головний кран, потім телефоную у страхову.', en: 'First I turn off the main tap, then I call the insurance company.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'nora', x: 310, mood: 'normal' }, { id: 'kari', x: 100, mood: 'happy' }], props: [{ type: 'phone', x: 215, y: 200 }] }, lines: [
      { who: 'kari', no: 'Takk for at du melder fra raskt. Har du tatt bilder av skaden?', uk: 'Дякую, що швидко повідомили. Ви сфотографували пошкодження?', en: 'Thank you for reporting it quickly. Have you taken photos of the damage?' },
      { who: 'nora', no: 'Ja, både av rommet og av røret som sprakk.', uk: 'Так, і кімнату, і трубу, що лопнула.', en: 'Yes, both of the room and of the pipe that burst.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'nora', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'nora', no: 'Hvor mye må jeg betale selv?', uk: 'Скільки мені доведеться платити самій?', en: 'How much do I have to pay myself?' },
      { who: 'kari', no: 'Egenandelen er fire tusen. Resten dekker forsikringen hvis skaden er plutselig.', uk: 'Франшиза — чотири тисячі. Решту покриває страхова, якщо шкода раптова.', en: 'The excess is four thousand. The insurance covers the rest if the damage was sudden.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'nora', x: 310, mood: 'normal' }, { id: 'kari', x: 100, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'nora', no: 'Og hvis røret var gammelt og dårlig vedlikeholdt?', uk: 'А якщо труба була стара й погано доглянута?', en: 'And if the pipe was old and badly maintained?' },
      { who: 'kari', no: 'Da kan erstatningen bli redusert. Takstmannen vurderer årsaken.', uk: 'Тоді відшкодування можуть зменшити. Оцінювач визначить причину.', en: 'Then the compensation may be reduced. The assessor decides on the cause.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'morten', x: 100, mood: 'normal', pose: 'hold' }, { id: 'nora', x: 310, mood: 'normal' }], props: [{ type: 'boxes', x: 215 }] }, lines: [
      { who: 'morten', no: 'Jeg tørker ut veggene nå. Ikke kast noe før taksten er ferdig.', uk: 'Я зараз просушу стіни. Нічого не викидайте, доки оцінка не готова.', en: 'I am drying the walls now. Do not throw anything away before the assessment is finished.' },
      { who: 'nora', no: 'Forstått. Jeg tar vare på alle kvitteringer også.', uk: 'Зрозуміло. Я ще й збережу всі чеки.', en: 'Understood. I will keep all receipts as well.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'nora', x: 310, mood: 'grin', pose: 'cheer' }, { id: 'kari', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'kari', no: 'Saken er registrert. Du får oppgjør når håndverkeren har sendt faktura.', uk: 'Справу зареєстровано. Виплату отримаєте, коли майстер надішле рахунок.', en: 'The case is registered. You get the payout once the contractor has sent the invoice.' },
      { who: 'nora', no: 'Takk. Det gikk mye bedre enn jeg fryktet.', uk: 'Дякую. Усе пройшло значно краще, ніж я боялася.', en: 'Thank you. That went much better than I feared.' }
    ]}
  ],

  vocab: [
    ['ei vannskade', 'пошкодження водою', 'water damage'],
    ['et rør', 'труба', 'a pipe'],
    ['å sprekke', 'лопнути', 'to burst'],
    ['ei hovedkran', 'головний кран', 'the main tap'],
    ['ei forsikring', 'страхування', 'insurance'],
    ['å melde fra', 'повідомити', 'to report'],
    ['ei egenandel', 'франшиза', 'an excess, deductible'],
    ['å dekke', 'покривати', 'to cover'],
    ['plutselig', 'раптовий', 'sudden'],
    ['vedlikeholdt', 'доглянутий', 'maintained'],
    ['ei erstatning', 'відшкодування', 'compensation'],
    ['å redusere', 'зменшувати', 'to reduce'],
    ['en takstmann', 'оцінювач', 'an assessor'],
    ['ei årsak', 'причина', 'a cause'],
    ['et oppgjør', 'виплата, розрахунок', 'a payout'],
    ['en håndverker', 'майстер, ремонтник', 'a tradesman']
  ],

  words: {
    no: { 'rør': 'труба', 'røret': 'труба', 'sprakk': 'лопнула', 'natta': 'ніч', 'gulvet': 'підлога', 'badet': 'ванна', 'stod': 'стояла', 'vann': 'вода', 'stenger': 'перекриваю', 'hovedkrana': 'головний кран', 'ringer': 'телефоную', 'forsikringen': 'страхова', 'melder': 'повідомляєте', 'raskt': 'швидко', 'bilder': 'фотографії', 'skaden': 'пошкодження', 'både': 'і… і', 'rommet': 'кімната', 'betale': 'платити', 'selv': 'сама', 'egenandelen': 'франшиза', 'fire': 'чотири', 'tusen': 'тисячі', 'resten': 'решта', 'dekker': 'покриває', 'plutselig': 'раптова', 'gammelt': 'стара', 'dårlig': 'погано', 'vedlikeholdt': 'доглянута', 'erstatningen': 'відшкодування', 'redusert': 'зменшене', 'takstmannen': 'оцінювач', 'vurderer': 'визначає', 'årsaken': 'причина', 'tørker': 'просушую', 'veggene': 'стіни', 'kast': 'викидай', 'taksten': 'оцінка', 'ferdig': 'готова', 'forstått': 'зрозуміло', 'vare': 'зберігати (ta vare på)', 'kvitteringer': 'чеки', 'saken': 'справа', 'registrert': 'зареєстровано', 'oppgjør': 'виплата', 'håndverkeren': 'майстер', 'faktura': 'рахунок', 'fryktet': 'боялася', 'skjønner': 'розуміє', 'venter': 'чекає' },
    en: { 'rør': 'pipe', 'røret': 'the pipe', 'sprakk': 'burst', 'natta': 'the night', 'gulvet': 'the floor', 'badet': 'the bathroom', 'stod': 'stood', 'vann': 'water', 'stenger': 'turn off', 'hovedkrana': 'the main tap', 'ringer': 'call', 'forsikringen': 'the insurance', 'melder': 'report', 'raskt': 'quickly', 'bilder': 'photos', 'skaden': 'the damage', 'både': 'both', 'rommet': 'the room', 'betale': 'to pay', 'selv': 'yourself', 'egenandelen': 'the excess', 'fire': 'four', 'tusen': 'thousand', 'resten': 'the rest', 'dekker': 'covers', 'plutselig': 'sudden', 'gammelt': 'old', 'dårlig': 'badly', 'vedlikeholdt': 'maintained', 'erstatningen': 'the compensation', 'redusert': 'reduced', 'takstmannen': 'the assessor', 'vurderer': 'assesses', 'årsaken': 'the cause', 'tørker': 'am drying', 'veggene': 'the walls', 'kast': 'throw', 'taksten': 'the assessment', 'ferdig': 'finished', 'forstått': 'understood', 'vare': 'to keep (ta vare på)', 'kvitteringer': 'receipts', 'saken': 'the case', 'registrert': 'registered', 'oppgjør': 'payout', 'håndverkeren': 'the tradesman', 'faktura': 'invoice', 'fryktet': 'feared', 'skjønner': 'understands', 'venter': 'waits' }
  }
});
