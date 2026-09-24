window.COMICS = window.COMICS || [];

/* p123 — «На аптеці»: як попросити ліки, пояснити симптоми й зрозуміти дозування.
   Рівень A2, вісім кадрів. Корисні фрази: Jeg har vondt i…, Hvor ofte…, Trenger jeg resept? */
COMICS.push({
  id: 'p123',
  level: 'A2',
  category: 'helse',
  title: 'På apoteket',
  titleUk: 'В аптеці',
  titleEn: 'At the pharmacy',
  summaryUk: 'У Марії болить горло, і вона йде в аптеку. Фармацевт питає про симптоми, пропонує таблетки й пояснює, як їх приймати — і чи потрібен рецепт.',
  summaryEn: 'Maria has a sore throat and goes to the pharmacy. The pharmacist asks about her symptoms, suggests tablets and explains how to take them — and whether a prescription is needed.',
  summaryNo: 'Maria har vondt i halsen og går på apoteket. Farmasøyten spør om symptomer, foreslår tabletter og forklarer hvordan hun skal ta dem – og om hun trenger resept.',
  cover: 0,

  panels: [
    { art: { bg: 'shop', chars: [{ id: 'maria', x: 300, mood: 'sad' }, { id: 'kasserer', x: 100, mood: 'happy' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'narrator', no: 'Maria har vondt i halsen og går på apoteket.', uk: 'У Марії болить горло, і вона йде в аптеку.', en: 'Maria has a sore throat and goes to the pharmacy.' },
      { who: 'kasserer', no: 'Hei! Hva kan jeg hjelpe deg med?', uk: 'Вітаю! Чим можу допомогти?', en: 'Hello! How can I help you?' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'maria', x: 300, mood: 'sad', pose: 'hold' }, { id: 'kasserer', x: 100, mood: 'normal' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'maria', no: 'Jeg har vondt i halsen og litt feber.', uk: 'У мене болить горло й невелика температура.', en: 'I have a sore throat and a slight fever.' },
      { who: 'kasserer', no: 'Hvor lenge har du vært syk?', uk: 'Як довго ви хворієте?', en: 'How long have you been ill?' },
      { who: 'maria', no: 'I tre dager nå.', uk: 'Уже три дні.', en: 'For three days now.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, pose: 'point' }, { id: 'maria', x: 310, mood: 'normal' }], props: [{ type: 'counter', x: 100 }, { type: 'stetoskop', x: 220, y: 180 }] }, lines: [
      { who: 'kasserer', no: 'Har du hoste eller hodepine også?', uk: 'Кашель чи головний біль теж є?', en: 'Do you have a cough or a headache as well?' },
      { who: 'maria', no: 'Litt hoste, men ikke hodepine.', uk: 'Трохи кашель, але голова не болить.', en: 'A little cough, but no headache.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'happy', pose: 'hold' }, { id: 'maria', x: 310, mood: 'happy' }], props: [{ type: 'counter', x: 100 }] }, lines: [
      { who: 'kasserer', no: 'Da foreslår jeg disse tablettene og sugetabletter mot sår hals.', uk: 'Тоді я раджу ці таблетки й льодяники від болю в горлі.', en: 'Then I suggest these tablets and lozenges for a sore throat.' },
      { who: 'maria', no: 'Trenger jeg resept?', uk: 'Мені потрібен рецепт?', en: 'Do I need a prescription?' },
      { who: 'kasserer', no: 'Nei, disse får du uten resept.', uk: 'Ні, ці можна без рецепта.', en: 'No, you can get these without a prescription.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, pose: 'point' }, { id: 'maria', x: 310, mood: 'surprised' }], props: [{ type: 'counter', x: 100 }, { type: 'note', x: 215 }] }, lines: [
      { who: 'maria', no: 'Hvor ofte skal jeg ta dem?', uk: 'Як часто їх приймати?', en: 'How often should I take them?' },
      { who: 'kasserer', no: 'Én tablett tre ganger om dagen, etter maten.', uk: 'По одній таблетці тричі на день, після їжі.', en: 'One tablet three times a day, after food.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'normal' }, { id: 'maria', x: 310, mood: 'normal', pose: 'hold' }], props: [{ type: 'counter', x: 100 }, { type: 'glass', x: 225, y: 195 }] }, lines: [
      { who: 'kasserer', no: 'Drikk mye vann og hvil deg. Er du allergisk mot noe?', uk: 'Пийте багато води й відпочивайте. У вас є на щось алергія?', en: 'Drink plenty of water and rest. Are you allergic to anything?' },
      { who: 'maria', no: 'Nei, jeg er ikke allergisk.', uk: 'Ні, у мене немає алергії.', en: 'No, I am not allergic.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 100, mood: 'happy' }, { id: 'maria', x: 310, mood: 'happy', pose: 'hold' }], props: [{ type: 'counter', x: 100 }, { type: 'coins', x: 220, y: 200 }] }, lines: [
      { who: 'kasserer', no: 'Det blir 149 kroner. Betaler du med kort?', uk: 'З вас 149 крон. Платитимете карткою?', en: 'That will be 149 kroner. Are you paying by card?' },
      { who: 'maria', no: 'Ja takk. Og hvis jeg ikke blir bedre?', uk: 'Так, дякую. А якщо мені не стане краще?', en: 'Yes, please. And if I do not get better?' },
      { who: 'kasserer', no: 'Da bør du bestille time hos fastlegen.', uk: 'Тоді варто записатися до сімейного лікаря.', en: 'Then you should book an appointment with your GP.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'kasserer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'maria', x: 310, mood: 'happy', pose: 'wave' }], props: [{ type: 'counter', x: 110 }], fx: 'stars' }, lines: [
      { who: 'kasserer', no: 'God bedring!', uk: 'Одужуйте!', en: 'Get well soon!' },
      { who: 'maria', no: 'Tusen takk for hjelpen. Ha det bra!', uk: 'Щиро дякую за допомогу. До побачення!', en: 'Thank you very much for your help. Goodbye!' }
    ]}
  ],

  vocab: [
    ['et apotek', 'аптека', 'a pharmacy'],
    ['en farmasøyt', 'фармацевт', 'a pharmacist'],
    ['vondt i halsen', 'біль у горлі', 'a sore throat'],
    ['en feber', 'температура', 'a fever'],
    ['en hoste', 'кашель', 'a cough'],
    ['ei hodepine', 'головний біль', 'a headache'],
    ['en tablett', 'таблетка', 'a tablet'],
    ['ei sugetablett', 'льодяник', 'a lozenge'],
    ['en resept', 'рецепт', 'a prescription'],
    ['ei dose', 'доза', 'a dose'],
    ['å hvile', 'відпочивати', 'to rest'],
    ['allergisk', 'алергічний', 'allergic'],
    ['å bestille time', 'записатися на прийом', 'to book an appointment'],
    ['en fastlege', 'сімейний лікар', 'a GP'],
    ['god bedring', 'одужуйте', 'get well soon']
  ],

  words: {
    no: { 'apoteket': 'аптека', 'apotek': 'аптека', 'vondt': 'боляче (ha vondt i — боліти)', 'halsen': 'горло', 'hals': 'горло', 'feber': 'температура', 'syk': 'хворий', 'lenge': 'довго', 'dager': 'дні', 'hoste': 'кашель', 'hodepine': 'головний біль', 'tablettene': 'таблетки', 'tabletter': 'таблетки', 'tablett': 'таблетка', 'sugetabletter': 'льодяники', 'sår': 'болючий (sår hals — болить горло)', 'foreslår': 'раджу, пропоную', 'disse': 'ці', 'resept': 'рецепт', 'trenger': 'потрібно', 'uten': 'без', 'ofte': 'часто', 'ganger': 'разів', 'dagen': 'день (om dagen — на день)', 'etter': 'після', 'maten': 'їжа', 'drikk': 'пий', 'mye': 'багато', 'vann': 'вода', 'hvil': 'відпочинь', 'allergisk': 'алергічний', 'mot': 'проти, на', 'noe': 'щось', 'kroner': 'крони', 'betaler': 'платите', 'kort': 'картка', 'hvis': 'якщо', 'bedre': 'краще', 'bør': 'варто', 'bestille': 'замовити, записатися', 'time': 'прийом, година', 'fastlegen': 'сімейний лікар', 'bedring': 'одужання (god bedring — одужуйте)', 'hjelpen': 'допомога', 'litt': 'трохи', 'tre': 'три', '149': 'сто сорок дев’ять', 'blir': 'буде, стане', 'farmasøyten': 'фармацевт' },
    en: { 'apoteket': 'the pharmacy', 'apotek': 'pharmacy', 'vondt': 'painful (ha vondt i — to have pain in)', 'halsen': 'the throat', 'hals': 'throat', 'feber': 'fever', 'syk': 'ill', 'lenge': 'long', 'dager': 'days', 'hoste': 'cough', 'hodepine': 'headache', 'tablettene': 'the tablets', 'tabletter': 'tablets', 'tablett': 'tablet', 'sugetabletter': 'lozenges', 'sår': 'sore', 'foreslår': 'suggest', 'disse': 'these', 'resept': 'prescription', 'trenger': 'need', 'uten': 'without', 'ofte': 'often', 'ganger': 'times', 'dagen': 'the day (om dagen — a day)', 'etter': 'after', 'maten': 'the food', 'drikk': 'drink', 'mye': 'a lot', 'vann': 'water', 'hvil': 'rest', 'allergisk': 'allergic', 'mot': 'against, to', 'noe': 'anything', 'kroner': 'kroner', 'betaler': 'pay', 'kort': 'card', 'hvis': 'if', 'bedre': 'better', 'bør': 'should', 'bestille': 'to book', 'time': 'appointment, hour', 'fastlegen': 'the GP', 'bedring': 'recovery (god bedring — get well soon)', 'hjelpen': 'the help', 'litt': 'a little', 'tre': 'three', '149': 'one hundred and forty-nine', 'blir': 'will be', 'farmasøyten': 'the pharmacist' }
  }
});
