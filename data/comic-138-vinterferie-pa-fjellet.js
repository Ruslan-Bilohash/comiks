window.COMICS = window.COMICS || [];

/* p138 — B1: планування зимових канікул на горі. Прогноз, лавинна небезпека, спорядження. */
COMICS.push({
  id: 'p138',
  level: 'B1',
  category: 'natur',
  title: 'Vinterferie på fjellet',
  titleUk: 'Зимові канікули в горах',
  titleEn: 'Winter holiday in the mountains',
  summaryUk: 'Сім’я планує тиждень у хатинці. Тато перевіряє прогноз і лавинну небезпеку, а діти складають список спорядження й вивчають правила гір.',
  summaryEn: 'A family plans a week in a cabin. Dad checks the forecast and the avalanche warning, and the children make a packing list and learn the mountain code.',
  summaryNo: 'Familien planlegger en uke på hytta. Pappa sjekker værmeldingen og skredvarselet, og barna lager pakkeliste og lærer fjellvettreglene.',
  cover: 0,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'pappa', x: 100, mood: 'happy', pose: 'point' }, { id: 'leo', x: 310, mood: 'happy' }], props: [{ type: 'computer', x: 215, y: 190 }] }, lines: [
      { who: 'pappa', no: 'Vi drar på hytta i vinterferien. Sju dager på fjellet!', uk: 'Ми їдемо в хатинку на зимові канікули. Сім днів у горах!', en: 'We are going to the cabin for the winter holiday. Seven days in the mountains!' },
      { who: 'leo', no: 'Endelig! Kan vi ta med akebrettet?', uk: 'Нарешті! Можна взяти санчата?', en: 'Finally! Can we bring the sledge?' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'pappa', x: 100, mood: 'normal' }, { id: 'mia', x: 310, mood: 'surprised' }], props: [{ type: 'phone', x: 215, y: 200 }], fx: 'snow' }, lines: [
      { who: 'pappa', no: 'Værmeldingen lover minus ti og sterk vind på fredag.', uk: 'Прогноз обіцяє мінус десять і сильний вітер у п’ятницю.', en: 'The forecast promises minus ten and strong wind on Friday.' },
      { who: 'mia', no: 'Da bør vi gå på tur torsdag i stedet.', uk: 'Тоді краще піти в похід у четвер.', en: 'Then we should go hiking on Thursday instead.' }
    ]},
    { art: { bg: 'winter', chars: [{ id: 'pappa', x: 100, pose: 'point' }, { id: 'leo', x: 310, mood: 'normal' }], fx: 'snow' }, lines: [
      { who: 'pappa', no: 'Og skredvarselet er på nivå tre. Vi holder oss unna bratte sider.', uk: 'А лавинна небезпека — третій рівень. Триматимемося подалі від крутих схилів.', en: 'And the avalanche warning is level three. We will stay away from steep slopes.' },
      { who: 'leo', no: 'Hva betyr nivå tre?', uk: 'Що означає третій рівень?', en: 'What does level three mean?' },
      { who: 'pappa', no: 'Betydelig fare. Vi går bare i merkede løyper.', uk: 'Значна небезпека. Ідемо лише розміченими маршрутами.', en: 'Considerable danger. We only go on marked trails.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 100, mood: 'happy', pose: 'hold' }, { id: 'leo', x: 310, mood: 'happy' }], props: [{ type: 'backpack', x: 215, y: 250 }] }, lines: [
      { who: 'mia', no: 'Pakkeliste: ull innerst, vindtett ytterst, lue og votter.', uk: 'Список: вовна знизу, вітрівка зверху, шапка й рукавиці.', en: 'Packing list: wool innermost, windproof outermost, hat and mittens.' },
      { who: 'leo', no: 'Og termos med kakao!', uk: 'І термос із какао!', en: 'And a thermos of cocoa!' }
    ]},
    { art: { bg: 'mountain', chars: [{ id: 'pappa', x: 110, mood: 'normal' }, { id: 'mia', x: 300, mood: 'normal' }], props: [{ type: 'thermos', x: 215, y: 210 }] }, lines: [
      { who: 'pappa', no: 'Husk fjellvettreglene: si fra hvor du går, og snu i tide.', uk: 'Пам’ятайте правила гір: скажи, куди йдеш, і вчасно повертайся.', en: 'Remember the mountain code: tell someone where you go, and turn back in time.' },
      { who: 'mia', no: 'Det er ingen skam å snu, sier bestemor alltid.', uk: 'Повернутися — не сором, завжди каже бабуся.', en: '“There is no shame in turning back,” grandma always says.' }
    ]},
    { art: { bg: 'mountain', chars: [{ id: 'leo', x: 120, mood: 'grin', pose: 'cheer' }, { id: 'mia', x: 290, mood: 'grin', pose: 'cheer' }], fx: 'stars' }, lines: [
      { who: 'narrator', no: 'Om kvelden sitter familien foran peisen med varm kakao.', uk: 'Увечері сім’я сидить біля каміна з гарячим какао.', en: 'In the evening the family sits by the fireplace with hot cocoa.' },
      { who: 'leo', no: 'Dette er den beste ferien noensinne!', uk: 'Це найкращі канікули в житті!', en: 'This is the best holiday ever!' }
    ]}
  ],

  vocab: [
    ['ei vinterferie', 'зимові канікули', 'the winter holiday'],
    ['ei hytte', 'хатинка', 'a cabin'],
    ['ei værmelding', 'прогноз погоди', 'a weather forecast'],
    ['sterk vind', 'сильний вітер', 'strong wind'],
    ['et skredvarsel', 'попередження про лавини', 'an avalanche warning'],
    ['bratt', 'крутий', 'steep'],
    ['ei fare', 'небезпека', 'danger'],
    ['merket', 'розмічений', 'marked'],
    ['ei løype', 'маршрут, лижня', 'a trail'],
    ['ull', 'вовна', 'wool'],
    ['vindtett', 'вітронепроникний', 'windproof'],
    ['ei vott', 'рукавиця', 'a mitten'],
    ['fjellvettreglene', 'правила поведінки в горах', 'the mountain code'],
    ['å snu', 'повернути назад', 'to turn back'],
    ['ei skam', 'сором', 'shame']
  ],

  words: {
    no: { 'drar': 'їдемо', 'hytta': 'хатинка', 'vinterferien': 'зимові канікули', 'sju': 'сім', 'dager': 'дні', 'fjellet': 'гора, гори', 'endelig': 'нарешті', 'akebrettet': 'санчата', 'værmeldingen': 'прогноз погоди', 'lover': 'обіцяє', 'minus': 'мінус', 'sterk': 'сильний', 'vind': 'вітер', 'fredag': 'п’ятниця', 'bør': 'варто', 'tur': 'похід', 'torsdag': 'четвер', 'stedet': 'замість (i stedet)', 'skredvarselet': 'попередження про лавини', 'nivå': 'рівень', 'holder': 'триматимемося (holde seg unna)', 'unna': 'подалі', 'bratte': 'круті', 'sider': 'схили, боки', 'betyr': 'означає', 'betydelig': 'значний', 'fare': 'небезпека', 'merkede': 'розмічені', 'løyper': 'маршрути', 'pakkeliste': 'список речей', 'ull': 'вовна', 'innerst': 'найближче до тіла', 'vindtett': 'вітронепроникний', 'ytterst': 'зверху, ззовні', 'lue': 'шапка', 'votter': 'рукавиці', 'termos': 'термос', 'kakao': 'какао', 'husk': 'пам’ятайте', 'fjellvettreglene': 'правила гір', 'snu': 'повернути назад', 'tide': 'час (i tide — вчасно)', 'skam': 'сором', 'alltid': 'завжди', 'kvelden': 'вечір', 'familien': 'сім’я', 'peisen': 'камін', 'varm': 'гаряче', 'beste': 'найкращі', 'ferien': 'канікули', 'noensinne': 'будь-коли', 'planlegger': 'планує' },
    en: { 'drar': 'are going', 'hytta': 'the cabin', 'vinterferien': 'the winter holiday', 'sju': 'seven', 'dager': 'days', 'fjellet': 'the mountain', 'endelig': 'finally', 'akebrettet': 'the sledge', 'værmeldingen': 'the forecast', 'lover': 'promises', 'minus': 'minus', 'sterk': 'strong', 'vind': 'wind', 'fredag': 'Friday', 'bør': 'should', 'tur': 'hike', 'torsdag': 'Thursday', 'stedet': 'instead (i stedet)', 'skredvarselet': 'the avalanche warning', 'nivå': 'level', 'holder': 'keep (holde seg unna)', 'unna': 'away', 'bratte': 'steep', 'sider': 'slopes, sides', 'betyr': 'means', 'betydelig': 'considerable', 'fare': 'danger', 'merkede': 'marked', 'løyper': 'trails', 'pakkeliste': 'packing list', 'ull': 'wool', 'innerst': 'innermost', 'vindtett': 'windproof', 'ytterst': 'outermost', 'lue': 'hat', 'votter': 'mittens', 'termos': 'thermos', 'kakao': 'cocoa', 'husk': 'remember', 'fjellvettreglene': 'the mountain code', 'snu': 'to turn back', 'tide': 'time (i tide — in time)', 'skam': 'shame', 'alltid': 'always', 'kvelden': 'the evening', 'familien': 'the family', 'peisen': 'the fireplace', 'varm': 'hot', 'beste': 'best', 'ferien': 'the holiday', 'noensinne': 'ever', 'planlegger': 'plans' }
  }
});
