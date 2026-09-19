window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p97',
  level: 'A1',
  category: 'hverdag',
  title: 'Hyggelig å hilse på deg!',
  titleUk: 'Приємно познайомитися!',
  titleEn: 'Nice to Meet You!',
  summaryUk: 'Руслан і Аліна з України переїхали до Норвегії й знайомляться з сусідкою Марією.',
  summaryEn: 'Ruslan and Alina from Ukraine have moved to Norway and meet their neighbour Maria.',
  summaryNo: 'Ruslan og Alina fra Ukraina har flyttet til Norge og hilser på naboen Maria.',
  cover: 2,

  panels: [
    { art: { bg: 'park', chars: [{ id: 'maria', x: 90, mood: 'happy', pose: 'wave' }, { id: 'ruslan', x: 250 }, { id: 'alina', x: 340, mood: 'happy' }], props: [{ type: 'boxes', x: 170 }] }, lines: [
      { who: 'narrator', no: 'Ruslan og Alina har flyttet til Norge.', uk: 'Руслан і Аліна переїхали до Норвегії.', en: 'Ruslan and Alina have moved to Norway.' },
      { who: 'maria', no: 'Hei! Er dere nye her?', uk: 'Привіт! Ви тут нові?', en: 'Hi! Are you new here?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'ruslan', x: 100, mood: 'happy' }, { id: 'alina', x: 300, mood: 'happy', pose: 'wave' }] }, lines: [
      { who: 'ruslan', no: 'Ja, vi bor i nummer fire.', uk: 'Так, ми живемо в будинку номер чотири.', en: 'Yes, we live at number four.' },
      { who: 'alina', no: 'Jeg heter Alina, og dette er Ruslan.', uk: 'Мене звати Аліна, а це Руслан.', en: 'My name is Alina, and this is Ruslan.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'maria', x: 110, mood: 'grin', pose: 'wave' }, { id: 'alina', x: 300, mood: 'happy' }] }, lines: [
      { who: 'maria', no: 'Hyggelig å hilse på dere! Jeg heter Maria.', uk: 'Приємно познайомитися! Мене звати Марія.', en: 'Nice to meet you! My name is Maria.' },
      { who: 'maria', no: 'Hvor kommer dere fra?', uk: 'Звідки ви?', en: 'Where are you from?' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'ruslan', x: 100, mood: 'happy', pose: 'hold' }, { id: 'alina', x: 300, mood: 'happy' }] }, lines: [
      { who: 'ruslan', no: 'Vi kommer fra Ukraina, fra Kyiv.', uk: 'Ми з України, з Києва.', en: 'We come from Ukraine, from Kyiv.' },
      { who: 'alina', no: 'Vi lærer norsk hver dag.', uk: 'Ми щодня вчимо норвезьку.', en: 'We learn Norwegian every day.' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'maria', x: 100, mood: 'grin', pose: 'cheer' }, { id: 'ruslan', x: 300, mood: 'grin', pose: 'hips' }], fx: 'stars' }, lines: [
      { who: 'maria', no: 'Dere snakker veldig bra!', uk: 'Ви дуже добре говорите!', en: 'You speak very well!' },
      { who: 'ruslan', no: 'Takk! Litt etter litt.', uk: 'Дякуємо! Потроху.', en: 'Thanks! Little by little.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 70, mood: 'grin', pose: 'cheer' }, { id: 'ruslan', x: 190, mood: 'happy' }, { id: 'maria', x: 330, mood: 'happy', pose: 'hold' }],
      props: [{ type: 'mug', x: 330, y: 226, front: true }] }, lines: [
      { who: 'maria', no: 'Vil dere komme på kaffe i morgen?', uk: 'Хочете завтра прийти на каву?', en: 'Would you like to come for coffee tomorrow?' },
      { who: 'alina', no: 'Ja, gjerne! Tusen takk.', uk: 'Так, залюбки! Щиро дякуємо.', en: 'Yes, we\'d love to! Thank you so much.' }
    ]}
  ],

  vocab: [
    ['hyggelig å hilse på', 'приємно познайомитися', 'nice to meet'], ['flyttet', 'переїхали', 'moved'], ['nye', 'нові', 'new'],
    ['bor', 'живемо', 'live'], ['nummer', 'номер', 'number'], ['hvor kommer', 'звідки', 'where … from'], ['lærer', 'вчимо', 'learn'],
    ['hver dag', 'щодня', 'every day'], ['snakker', 'говорите', 'speak'], ['veldig bra', 'дуже добре', 'very well'],
    ['litt etter litt', 'потроху', 'little by little'], ['kaffe', 'кава', 'coffee'], ['i morgen', 'завтра', 'tomorrow'], ['gjerne', 'залюбки', 'gladly']
  ]
});
