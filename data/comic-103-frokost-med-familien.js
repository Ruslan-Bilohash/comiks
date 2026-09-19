window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p103',
  level: 'A1',
  category: 'mat',
  title: 'Frokost med familien',
  titleUk: 'Сніданок із сім’єю',
  titleEn: 'Breakfast with the Family',
  summaryUk: 'Недільний сніданок: брунуст, молоко, яйця — і норвезький ланчбокс до школи.',
  summaryEn: 'Sunday breakfast: brown cheese, milk, eggs — and a Norwegian packed lunch for school.',
  summaryNo: 'Søndagsfrokost med brunost, melk og egg – og matpakke til skolen.',
  cover: 3,

  panels: [
    { art: { bg: 'kitchen', chars: [{ id: 'pappa', x: 120, mood: 'happy', pose: 'wave' }, { id: 'mia', x: 300, mood: 'happy' }], props: [{ type: 'clock', x: 330, y: 110 }] }, lines: [
      { who: 'narrator', no: 'Det er søndag morgen.', uk: 'Недільний ранок.', en: 'It\'s Sunday morning.' },
      { who: 'pappa', no: 'God morgen! Frokosten er klar.', uk: 'Доброго ранку! Сніданок готовий.', en: 'Good morning! Breakfast is ready.' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'mia', x: 90, mood: 'grin', pose: 'hips' }, { id: 'mamma', x: 300, mood: 'happy', pose: 'hold' }], props: [{ type: 'bread', x: 200, y: 196 }, { type: 'cheese', x: 300, y: 236, s: 0.8, front: true }] }, lines: [
      { who: 'mia', no: 'Jeg er så sulten!', uk: 'Я така голодна!', en: 'I\'m so hungry!' },
      { who: 'mamma', no: 'Vil du ha brød med brunost?', uk: 'Хочеш хліб із брунустом?', en: 'Would you like bread with brown cheese?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mia', x: 80, mood: 'happy' }, { id: 'leo', x: 320, mood: 'grin', pose: 'point', flip: true }], props: [{ type: 'table', x: 200 }, { type: 'glass', x: 165, y: 234 }, { type: 'eggs', x: 210, y: 234, s: 0.8 }, { type: 'milk', x: 245, y: 234, s: 0.8 }] }, lines: [
      { who: 'mia', no: 'Ja, takk! Og et glass melk.', uk: 'Так, дякую! І склянку молока.', en: 'Yes, please! And a glass of milk.' },
      { who: 'leo', no: 'Jeg vil ha egg og juice.', uk: 'А я хочу яйце й сік.', en: 'I want an egg and juice.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'pappa', x: 90, mood: 'happy', pose: 'hold' }, { id: 'leo', x: 310, mood: 'grin', pose: 'cheer' }], props: [{ type: 'table', x: 200 }, { type: 'cheese', x: 200, y: 234 }], fx: 'stars' }, lines: [
      { who: 'pappa', no: 'Brunost er typisk norsk. Den er søt og god.', uk: 'Брунуст — типово норвезький. Він солодкий і смачний.', en: 'Brown cheese is typically Norwegian. It is sweet and tasty.' },
      { who: 'leo', no: 'Den smaker som karamell!', uk: 'Він смакує як карамель!', en: 'It tastes like caramel!' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'mamma', x: 100, pose: 'point' }, { id: 'mia', x: 300, mood: 'happy', pose: 'hold' }], props: [{ type: 'bread', x: 200, y: 196, s: 0.8 }, { type: 'apples', x: 300, y: 244, n: 1, front: true }] }, lines: [
      { who: 'mamma', no: 'Husk å smøre matpakke til skolen.', uk: 'Не забудь зробити собі ланчбокс до школи.', en: 'Remember to make a packed lunch for school.' },
      { who: 'mia', no: 'Jeg tar med et eple også.', uk: 'Я ще візьму яблуко.', en: 'I\'ll take an apple too.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'pappa', x: 90, mood: 'surprised', pose: 'point' }, { id: 'leo', x: 230, mood: 'grin', pose: 'wave' }, { id: 'mia', x: 340, mood: 'happy', pose: 'walk' }], props: [{ type: 'clock', x: 180, y: 110, time: '07:50' }, { type: 'backpack', x: 290 }] }, lines: [
      { who: 'pappa', no: 'Skynd dere, bussen går om ti minutter!', uk: 'Поспішайте, автобус їде за десять хвилин!', en: 'Hurry up, the bus leaves in ten minutes!' },
      { who: 'leo', no: 'Ha det, mamma og pappa!', uk: 'Бувайте, мамо й тату!', en: 'Bye, Mum and Dad!' }
    ]}
  ],

  vocab: [
    ['søndag', 'неділя', 'Sunday'], ['frokosten', 'сніданок', 'the breakfast'], ['klar', 'готовий', 'ready'], ['sulten', 'голодний', 'hungry'],
    ['brød', 'хліб', 'bread'], ['brunost', 'брунуст (коричневий сир)', 'brown cheese'], ['ja, takk', 'так, дякую', 'yes, please'],
    ['et glass', 'склянка', 'a glass'], ['egg', 'яйця', 'eggs'], ['juice', 'сік', 'juice'], ['typisk', 'типовий', 'typical'],
    ['søt', 'солодкий', 'sweet'], ['smaker', 'смакує', 'tastes'], ['husk', 'пам’ятай', 'remember'], ['smøre matpakke', 'робити бутерброди', 'make a packed lunch'],
    ['eple', 'яблуко', 'apple'], ['skynd dere', 'поспішайте', 'hurry up'], ['minutter', 'хвилини', 'minutes'], ['ha det', 'бувай', 'bye']
  ]
});
