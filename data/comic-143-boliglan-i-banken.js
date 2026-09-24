window.COMICS = window.COMICS || [];

/* p143 — B2: іпотека в банку. Фінансування, власний внесок, фіксована чи плаваюча ставка. */
COMICS.push({
  id: 'p143',
  level: 'B2',
  category: 'bolig',
  title: 'Boliglån i banken',
  titleUk: 'Іпотека в банку',
  titleEn: 'A mortgage at the bank',
  summaryUk: 'Муса й Марія хочуть купити квартиру. Банкірка рахує, скільки вони можуть позичити, і пояснює різницю між фіксованою та плаваючою ставкою.',
  summaryEn: 'Musa and Maria want to buy a flat. The bank adviser works out how much they can borrow and explains fixed versus floating interest.',
  summaryNo: 'Musa og Maria vil kjøpe leilighet. Bankrådgiveren regner ut hvor mye de kan låne, og forklarer forskjellen på fast og flytende rente.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'musa', x: 250, mood: 'happy' }, { id: 'maria', x: 350, mood: 'happy' }, { id: 'alina', x: 90, mood: 'happy' }], props: [{ type: 'officedesk', x: 90 }, { type: 'computer', x: 100, y: 175 }] }, lines: [
      { who: 'alina', no: 'Velkommen. Dere ønsker å søke om finansieringsbevis, stemmer det?', uk: 'Вітаю. Ви хочете подати на підтвердження фінансування, так?', en: 'Welcome. You want to apply for a mortgage certificate, is that right?' },
      { who: 'musa', no: 'Ja, vi vurderer å kjøpe leilighet til våren.', uk: 'Так, ми думаємо купити квартиру навесні.', en: 'Yes, we are considering buying a flat in the spring.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 90, pose: 'point' }, { id: 'maria', x: 330, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'alina', no: 'Hvor mye har dere i egenkapital?', uk: 'Скільки у вас власних коштів?', en: 'How much do you have as your own capital?' },
      { who: 'maria', no: 'Omtrent åtte hundre tusen. Er det nok?', uk: 'Приблизно вісімсот тисяч. Цього достатньо?', en: 'About eight hundred thousand. Is that enough?' },
      { who: 'alina', no: 'Kravet er femten prosent av kjøpesummen, så det holder til en bolig rundt fem millioner.', uk: 'Вимога — п’ятнадцять відсотків вартості, тож вистачить на житло приблизно до п’яти мільйонів.', en: 'The requirement is fifteen per cent of the price, so it covers a home of around five million.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 330, mood: 'surprised' }, { id: 'alina', x: 90, mood: 'normal' }] }, lines: [
      { who: 'musa', no: 'Hva blir månedskostnaden?', uk: 'Яким буде щомісячний платіж?', en: 'What will the monthly cost be?' },
      { who: 'alina', no: 'Med dagens rente omtrent tjueto tusen, pluss felleskostnader.', uk: 'За нинішньою ставкою приблизно двадцять дві тисячі плюс комунальні внески.', en: 'At today’s rate about twenty-two thousand, plus shared costs.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'alina', x: 90, mood: 'normal', pose: 'hold' }, { id: 'maria', x: 330, mood: 'normal' }] }, lines: [
      { who: 'maria', no: 'Bør vi velge fast eller flytende rente?', uk: 'Обирати фіксовану чи плаваючу ставку?', en: 'Should we choose a fixed or a floating rate?' },
      { who: 'alina', no: 'Fast rente gir forutsigbarhet, flytende er ofte billigere over tid. Det er en avveining.', uk: 'Фіксована дає передбачуваність, плаваюча зазвичай дешевша в довгій перспективі. Це компроміс.', en: 'A fixed rate gives predictability, a floating one is often cheaper over time. It is a trade-off.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 250, mood: 'normal' }, { id: 'maria', x: 350, mood: 'surprised' }, { id: 'alina', x: 90, mood: 'normal' }] }, lines: [
      { who: 'musa', no: 'Hva skjer hvis renta stiger kraftig?', uk: 'Що буде, якщо ставка різко зросте?', en: 'What happens if the interest rate rises sharply?' },
      { who: 'alina', no: 'Vi stresstester økonomien deres med fem prosent høyere rente før vi godkjenner lånet.', uk: 'Ми перевіряємо ваш бюджет із ставкою на п’ять відсотків вищою, перш ніж схвалити кредит.', en: 'We stress-test your finances with five per cent higher interest before approving the loan.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 330, mood: 'grin', pose: 'cheer' }, { id: 'alina', x: 90, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'alina', no: 'Dere får svar på to virkedager, og beviset varer i tre måneder.', uk: 'Відповідь буде за два робочі дні, а підтвердження дійсне три місяці.', en: 'You will get an answer within two working days, and the certificate lasts three months.' },
      { who: 'maria', no: 'Perfekt. Da begynner vi å gå på visninger.', uk: 'Чудово. Тоді починаємо ходити на перегляди.', en: 'Perfect. Then we will start going to viewings.' }
    ]}
  ],

  vocab: [
    ['et boliglån', 'іпотека', 'a mortgage'],
    ['et finansieringsbevis', 'підтвердження фінансування', 'a mortgage certificate'],
    ['ei egenkapital', 'власні кошти', 'own capital, equity'],
    ['ei kjøpesum', 'сума покупки', 'the purchase price'],
    ['ei månedskostnad', 'щомісячний платіж', 'a monthly cost'],
    ['ei rente', 'відсоткова ставка', 'an interest rate'],
    ['fast rente', 'фіксована ставка', 'a fixed rate'],
    ['flytende rente', 'плаваюча ставка', 'a floating rate'],
    ['ei forutsigbarhet', 'передбачуваність', 'predictability'],
    ['ei avveining', 'компроміс, зважування', 'a trade-off'],
    ['felleskostnader', 'комунальні внески', 'shared costs'],
    ['å stressteste', 'перевіряти на стійкість', 'to stress-test'],
    ['å godkjenne', 'схвалювати', 'to approve'],
    ['en virkedag', 'робочий день', 'a working day'],
    ['å vurdere', 'розглядати, оцінювати', 'to consider']
  ],

  words: {
    no: { 'velkommen': 'вітаю', 'ønsker': 'хочете', 'søke': 'подати', 'finansieringsbevis': 'підтвердження фінансування', 'stemmer': 'так, правильно', 'vurderer': 'розглядаємо', 'kjøpe': 'купити', 'leilighet': 'квартира', 'våren': 'весна', 'egenkapital': 'власні кошти', 'omtrent': 'приблизно', 'åtte': 'вісім', 'hundre': 'сто', 'tusen': 'тисяч', 'nok': 'досить', 'kravet': 'вимога', 'femten': 'п’ятнадцять', 'prosent': 'відсотків', 'kjøpesummen': 'сума покупки', 'holder': 'вистачає', 'bolig': 'житло', 'rundt': 'приблизно', 'fem': 'п’ять', 'millioner': 'мільйонів', 'månedskostnaden': 'щомісячний платіж', 'dagens': 'сьогоднішній', 'rente': 'ставка', 'renta': 'ставка', 'tjueto': 'двадцять два', 'pluss': 'плюс', 'felleskostnader': 'комунальні внески', 'bør': 'варто', 'velge': 'обрати', 'fast': 'фіксована', 'flytende': 'плаваюча', 'forutsigbarhet': 'передбачуваність', 'ofte': 'часто', 'billigere': 'дешевша', 'tid': 'час', 'avveining': 'компроміс', 'skjer': 'станеться', 'stiger': 'зросте', 'kraftig': 'різко', 'stresstester': 'перевіряємо на стійкість', 'økonomien': 'бюджет, фінанси', 'høyere': 'вища', 'godkjenner': 'схвалюємо', 'lånet': 'кредит', 'svar': 'відповідь', 'virkedager': 'робочі дні', 'beviset': 'підтвердження', 'varer': 'діє', 'måneder': 'місяці', 'begynner': 'починаємо', 'visninger': 'перегляди', 'bankrådgiveren': 'банківська консультантка', 'regner': 'рахує', 'forskjellen': 'різниця', 'låne': 'позичити' },
    en: { 'velkommen': 'welcome', 'ønsker': 'wish', 'søke': 'to apply', 'finansieringsbevis': 'mortgage certificate', 'stemmer': 'that is right', 'vurderer': 'are considering', 'kjøpe': 'to buy', 'leilighet': 'flat', 'våren': 'the spring', 'egenkapital': 'own capital', 'omtrent': 'about', 'åtte': 'eight', 'hundre': 'hundred', 'tusen': 'thousand', 'nok': 'enough', 'kravet': 'the requirement', 'femten': 'fifteen', 'prosent': 'per cent', 'kjøpesummen': 'the purchase price', 'holder': 'is enough', 'bolig': 'home', 'rundt': 'around', 'fem': 'five', 'millioner': 'million', 'månedskostnaden': 'the monthly cost', 'dagens': 'today’s', 'rente': 'interest rate', 'renta': 'the rate', 'tjueto': 'twenty-two', 'pluss': 'plus', 'felleskostnader': 'shared costs', 'bør': 'should', 'velge': 'to choose', 'fast': 'fixed', 'flytende': 'floating', 'forutsigbarhet': 'predictability', 'ofte': 'often', 'billigere': 'cheaper', 'tid': 'time', 'avveining': 'trade-off', 'skjer': 'happens', 'stiger': 'rises', 'kraftig': 'sharply', 'stresstester': 'stress-test', 'økonomien': 'the finances', 'høyere': 'higher', 'godkjenner': 'approve', 'lånet': 'the loan', 'svar': 'answer', 'virkedager': 'working days', 'beviset': 'the certificate', 'varer': 'lasts', 'måneder': 'months', 'begynner': 'start', 'visninger': 'viewings', 'bankrådgiveren': 'the bank adviser', 'regner': 'works out', 'forskjellen': 'the difference', 'låne': 'to borrow' }
  }
});
