window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p93',
  level: 'A1',
  category: 'butikk',
  title: 'På butikken',
  titleUk: 'У магазині',
  titleEn: 'At the Shop',
  summaryUk: 'Мія сама йде по покупки: молоко, хліб, яблука — і треба правильно порахувати крони.',
  summaryEn: 'Mia goes shopping on her own: milk, bread and apples — and she has to count the kroner right.',
  summaryNo: 'Mia handler alene: melk, brød og epler – og hun må telle kronene riktig.',
  cover: 4,

  panels: [
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 110, pose: 'hold' }, { id: 'mia', x: 285, mood: 'happy', pose: 'wave' }] }, lines: [
      { who: 'mamma', no: 'Mia, kan du handle for meg?', uk: 'Міє, можеш сходити для мене в магазин?', en: 'Mia, can you do the shopping for me?' },
      { who: 'mia', no: 'Ja! Hva trenger du?', uk: 'Так! Що тобі потрібно?', en: 'Yes! What do you need?' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 140, mood: 'happy', pose: 'hold' }, { id: 'mia', x: 300, mood: 'grin', pose: 'cheer' }], props: [{ type: 'note', x: 140, y: 222, label: '100', front: true }] }, lines: [
      { who: 'mamma', no: 'Vi trenger melk, brød og epler. Her er hundre kroner.', uk: 'Нам потрібні молоко, хліб і яблука. Ось сто крон.', en: 'We need milk, bread and apples. Here are a hundred kroner.' },
      { who: 'mia', no: 'Takk, mamma!', uk: 'Дякую, мамо!', en: 'Thanks, Mum!' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'mia', x: 110 }, { id: 'kasserer', x: 330, mood: 'happy', pose: 'point', flip: true }], props: [{ type: 'counter', x: 320, front: true }] }, lines: [
      { who: 'mia', no: 'Unnskyld, hvor er melken?', uk: 'Перепрошую, де молоко?', en: 'Excuse me, where is the milk?' },
      { who: 'kasserer', no: 'Melken står der borte, ved brødet.', uk: 'Молоко стоїть он там, біля хліба.', en: 'The milk is over there, by the bread.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'mia', x: 200, mood: 'grin', pose: 'hold' }], props: [{ type: 'apples', x: 200, y: 246, n: 6, front: true }, { type: 'milk', x: 60, y: 128 }, { type: 'bread', x: 140, y: 190 }] }, lines: [
      { who: 'mia', no: 'Jeg tar seks røde epler.', uk: 'Я візьму шість червоних яблук.', en: 'I\'ll take six red apples.' }
    ]},
    { art: { bg: 'shop', chars: [{ id: 'mia', x: 100, mood: 'happy', pose: 'hold' }, { id: 'kasserer', x: 335, y: 306, mood: 'happy' }],
      props: [{ type: 'counter', x: 325, y: 306, front: true }, { type: 'note', x: 100, y: 232, front: true }] }, lines: [
      { who: 'kasserer', no: 'Det blir åtti kroner.', uk: 'З вас вісімдесят крон.', en: 'That will be eighty kroner.' },
      { who: 'mia', no: 'Vær så god, her er hundre.', uk: 'Прошу, ось сто.', en: 'Here you go, here\'s a hundred.' },
      { who: 'kasserer', no: 'Tjue kroner tilbake. Ha en fin dag!', uk: 'Двадцять крон решти. Гарного дня!', en: 'Twenty kroner change. Have a nice day!' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'mamma', x: 90, mood: 'happy', pose: 'hips' }, { id: 'mia', x: 245, mood: 'grin', pose: 'cheer' }, { id: 'pus', x: 350, mood: 'surprised' }],
      props: [{ type: 'table', x: 170 }, { type: 'milk', x: 150, y: 234 }, { type: 'bread', x: 195, y: 234, s: 0.8 }], fx: 'hearts' }, lines: [
      { who: 'mamma', no: 'Så flink du er, Mia! Tusen takk.', uk: 'Яка ти молодець, Міє! Щиро дякую.', en: 'You\'re so clever, Mia! Thank you so much.' },
      { who: 'mia', no: 'Det var lett!', uk: 'Це було легко!', en: 'That was easy!' },
      { who: 'pus', no: 'Mjau! Melk?', uk: 'Няв! Молоко?', en: 'Meow! Milk?' }
    ]}
  ],

  vocab: [
    ['handle', 'робити покупки', 'do the shopping'], ['melk', 'молоко', 'milk'], ['brød', 'хліб', 'bread'], ['epler', 'яблука', 'apples'], ['hundre', 'сто', 'hundred'],
    ['kroner', 'крони', 'kroner (Norwegian money)'], ['unnskyld', 'перепрошую', 'excuse me'], ['hvor', 'де', 'where'], ['der borte', 'он там', 'over there'], ['ved', 'біля', 'by, next to'],
    ['seks', 'шість', 'six'], ['røde', 'червоні', 'red'], ['det blir', 'з вас (буде)', 'that will be'], ['åtti', 'вісімдесят', 'eighty'], ['tjue', 'двадцять', 'twenty'],
    ['tilbake', 'назад, решта', 'back, change'], ['vær så god', 'прошу, будь ласка', 'here you go'], ['ha en fin dag', 'гарного дня', 'have a nice day'], ['lett', 'легко', 'easy']
  ]
});
