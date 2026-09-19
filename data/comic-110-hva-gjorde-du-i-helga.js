window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p110',
  level: 'A2',
  category: 'skole',
  title: 'Hva gjorde du i helga?',
  titleUk: 'Що ти робив на вихідних?',
  titleEn: 'What Did You Do at the Weekend?',
  summaryUk: 'Понеділок у класі: усі розповідають про вихідні — і вправляються в минулому часі (var, gikk, spilte, bakte).',
  summaryEn: 'Monday in class: everyone talks about the weekend — and practises the past tense (var, gikk, spilte, bakte).',
  summaryNo: 'Mandag i klassen: alle forteller om helga og øver på preteritum.',
  cover: 0,

  panels: [
    { art: { bg: 'school', board: 'I HELGA', chars: [{ id: 'laerer', x: 110, mood: 'happy', pose: 'wave' }, { id: 'nora', x: 300, mood: 'happy' }] }, lines: [
      { who: 'laerer', no: 'God morgen! Hva gjorde dere i helga?', uk: 'Доброго ранку! Що ви робили на вихідних?', en: 'Good morning! What did you do at the weekend?' },
      { who: 'nora', no: 'Jeg var på hytta med familien min.', uk: 'Я була в дачному будиночку зі своєю сім’єю.', en: 'I was at the cabin with my family.' }
    ]},
    { art: { bg: 'mountain', chars: [{ id: 'nora', x: 110, mood: 'grin', pose: 'cheer' }], props: [{ type: 'thermos', x: 300, y: 266, s: 0.75, front: true }] }, lines: [
      { who: 'narrator', no: 'Det var kaldt, men sola skinte.', uk: 'Було холодно, але світило сонце.', en: 'It was cold, but the sun was shining.' },
      { who: 'nora', no: 'Vi gikk på ski og drakk kakao.', uk: 'Ми каталися на лижах і пили какао.', en: 'We went skiing and drank cocoa.' }
    ]},
    { art: { bg: 'school', board: 'I HELGA', chars: [{ id: 'laerer', x: 100, pose: 'point' }, { id: 'leo', x: 310, mood: 'grin', pose: 'cheer' }] }, lines: [
      { who: 'laerer', no: 'Så fint! Og du, Leo — hva gjorde du?', uk: 'Як гарно! А ти, Лео, що ти робив?', en: 'How nice! And you, Leo — what did you do?' },
      { who: 'leo', no: 'Jeg spilte fotball på lørdag. Vi vant tre–null!', uk: 'У суботу я грав у футбол. Ми виграли 3:0!', en: 'I played football on Saturday. We won three–nil!' }
    ]},
    { art: { bg: 'park', chars: [{ id: 'leo', x: 120, mood: 'grin', pose: 'cheer' }, { id: 'ruslan', x: 300, mood: 'happy', pose: 'wave' }], props: [{ type: 'ball', x: 215 }], fx: 'stars' }, lines: [
      { who: 'ruslan', no: 'Jeg var der også! Leo scoret to mål.', uk: 'Я теж там був! Лео забив два голи.', en: 'I was there too! Leo scored two goals.' },
      { who: 'leo', no: 'Og Ruslan reddet ballen tre ganger.', uk: 'А Руслан тричі врятував м’яч.', en: 'And Ruslan saved the ball three times.' }
    ]},
    { art: { bg: 'kitchen', chars: [{ id: 'alina', x: 100, mood: 'happy', pose: 'hold' }, { id: 'mamma', x: 310, mood: 'happy' }], props: [{ type: 'bread', x: 205, y: 196 }, { type: 'flour', x: 300, y: 236, s: 0.7, front: true }] }, lines: [
      { who: 'alina', no: 'Jeg hjalp mamma hjemme. Vi bakte brød.', uk: 'Я допомагала мамі вдома. Ми пекли хліб.', en: 'I helped Mum at home. We baked bread.' },
      { who: 'mamma', no: 'Alina vasket hele kjøkkenet etterpå.', uk: 'Потім Аліна помила всю кухню.', en: 'Alina washed the whole kitchen afterwards.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'alina', x: 110, mood: 'happy' }, { id: 'denys', x: 300, mood: 'grin', pose: 'point' }], props: [{ type: 'sofa', x: 205 }] }, lines: [
      { who: 'alina', no: 'Om kvelden så vi en film på TV.', uk: 'Увечері ми дивилися фільм по телевізору.', en: 'In the evening we watched a film on TV.' },
      { who: 'denys', no: 'Filmen het «Reisen til fjellet». Den var spennende!', uk: 'Фільм називався «Подорож у гори». Він був захопливий!', en: 'The film was called “The Journey to the Mountain”. It was exciting!' }
    ]},
    { art: { bg: 'street', chars: [{ id: 'denys', x: 100, pose: 'hold' }, { id: 'maria', x: 310, mood: 'happy', pose: 'point' }], props: [{ type: 'busstop', x: 205 }] }, lines: [
      { who: 'denys', no: 'På søndag tok vi bussen til byen og kjøpte nye sko.', uk: 'У неділю ми поїхали автобусом до міста й купили нові черевики.', en: 'On Sunday we took the bus to town and bought new shoes.' },
      { who: 'maria', no: 'De kostet fire hundre kroner, men de var på tilbud.', uk: 'Вони коштували чотириста крон, але були зі знижкою.', en: 'They cost four hundred kroner, but they were on offer.' }
    ]},
    { art: { bg: 'school', board: 'PRETERITUM', chars: [{ id: 'laerer', x: 110, mood: 'grin', pose: 'point' }, { id: 'nora', x: 240, mood: 'happy' }, { id: 'leo', x: 340, mood: 'happy', pose: 'hold' }], props: [{ type: 'book', x: 340, y: 240, front: true }] }, lines: [
      { who: 'laerer', no: 'Bra jobbet, alle sammen! Hørte dere verbene? Var, gikk, spilte, bakte.', uk: 'Молодці всі! Чули дієслова? Var, gikk, spilte, bakte.', en: 'Well done, everyone! Did you hear the verbs? Var, gikk, spilte, bakte.' },
      { who: 'nora', no: 'Det er preteritum — noe som allerede har skjedd.', uk: 'Це минулий час — те, що вже сталося.', en: 'That is the past tense — something that has already happened.' }
    ]}
  ],

  vocab: [
    ['i helga', 'на вихідних', 'at the weekend'], ['hytta', 'дачний будиночок', 'the cabin'], ['skinte', 'світило', 'shone'], ['gikk på ski', 'каталися на лижах', 'went skiing'],
    ['drakk', 'пили', 'drank'], ['kakao', 'какао', 'cocoa'], ['spilte', 'грав', 'played'], ['vant', 'виграли', 'won'], ['scoret', 'забив', 'scored'],
    ['mål', 'гол; мета', 'goal'], ['reddet', 'врятував', 'saved'], ['ganger', 'разів', 'times'], ['hjalp', 'допомагала', 'helped'], ['bakte', 'пекли', 'baked'],
    ['vasket', 'помила', 'washed'], ['etterpå', 'потім', 'afterwards'], ['om kvelden', 'увечері', 'in the evening'], ['het', 'називався', 'was called'],
    ['kostet', 'коштували', 'cost'], ['på tilbud', 'зі знижкою', 'on offer'], ['verbene', 'дієслова', 'the verbs'], ['preteritum', 'минулий час', 'the past tense'],
    ['skjedd', 'сталося', 'happened']
  ]
});
