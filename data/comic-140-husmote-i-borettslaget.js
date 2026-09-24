window.COMICS = window.COMICS || [];

/* p140 — B2: збори кооперативу. Порядок денний, пропозиція, голосування, протокол. */
COMICS.push({
  id: 'p140',
  level: 'B2',
  category: 'bolig',
  title: 'Husmøte i borettslaget',
  titleUk: 'Збори житлового кооперативу',
  titleEn: 'A housing co-op meeting',
  summaryUk: 'Жильці вирішують, чи ставити зарядки для електромобілів. Муса вчиться виступати за порядком денним: внести пропозицію, аргументувати й проголосувати.',
  summaryEn: 'The residents decide whether to install EV chargers. Musa learns how a formal meeting works: make a proposal, argue for it and vote.',
  summaryNo: 'Beboerne skal bestemme om de vil sette opp ladepunkter for elbil. Musa lærer hvordan et husmøte fungerer: fremme et forslag, argumentere og stemme.',
  cover: 0,

  panels: [
    { art: { bg: 'office', board: 'Saksliste 1–4', chars: [{ id: 'laerer', x: 100, mood: 'happy', pose: 'point' }, { id: 'musa', x: 310, mood: 'normal' }], props: [{ type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'laerer', no: 'Velkommen til husmøtet. Vi følger sakslista og har fire saker i kveld.', uk: 'Вітаю на зборах. Ідемо за порядком денним — сьогодні чотири питання.', en: 'Welcome to the house meeting. We follow the agenda and have four items tonight.' },
      { who: 'musa', no: 'Hvordan ber jeg om ordet?', uk: 'Як попросити слова?', en: 'How do I ask for the floor?' },
      { who: 'laerer', no: 'Rekk opp hånda, så får du ordet etter tur.', uk: 'Підніміть руку — і отримаєте слово по черзі.', en: 'Raise your hand, and you get the floor in turn.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 310, mood: 'happy', pose: 'point' }, { id: 'laerer', x: 100, mood: 'normal' }] }, lines: [
      { who: 'musa', no: 'Jeg foreslår at vi setter opp to ladepunkter i garasjen.', uk: 'Пропоную встановити дві зарядні точки в гаражі.', en: 'I propose that we install two charging points in the garage.' },
      { who: 'laerer', no: 'Godt forslag. Kan du begrunne det kort?', uk: 'Гарна пропозиція. Можете коротко обґрунтувати?', en: 'Good proposal. Can you justify it briefly?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'surprised' }] }, lines: [
      { who: 'musa', no: 'Stadig flere kjøper elbil, og felles lading blir billigere enn egne anlegg.', uk: 'Дедалі більше людей купують електромобілі, а спільна зарядка дешевша за власні установки.', en: 'More and more people buy EVs, and shared charging is cheaper than individual installations.' },
      { who: 'morten', no: 'Men hvem betaler? Jeg har ingen bil i det hele tatt.', uk: 'А хто платитиме? У мене взагалі немає авто.', en: 'But who pays? I do not have a car at all.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 310, mood: 'normal' }, { id: 'morten', x: 100, mood: 'normal' }], props: [{ type: 'coins', x: 215, y: 205 }] }, lines: [
      { who: 'musa', no: 'Et godt poeng. Derfor foreslår jeg at brukerne betaler per kilowattime.', uk: 'Слушне зауваження. Тому пропоную, щоб користувачі платили за кіловат-годину.', en: 'A fair point. That is why I suggest that users pay per kilowatt-hour.' },
      { who: 'morten', no: 'Da er jeg med på det. Investeringen tas fra vedlikeholdsfondet?', uk: 'Тоді я підтримую. Інвестицію беремо з ремонтного фонду?', en: 'Then I am in favour. Is the investment taken from the maintenance fund?' }
    ]},
    { art: { bg: 'office', board: 'for 14 · mot 3', chars: [{ id: 'laerer', x: 100, pose: 'point' }, { id: 'musa', x: 310, mood: 'happy' }] }, lines: [
      { who: 'laerer', no: 'Da stemmer vi. Fjorten for, tre mot, ingen blanke. Forslaget er vedtatt.', uk: 'Тоді голосуємо. Чотирнадцять за, троє проти, утриманих немає. Пропозицію ухвалено.', en: 'Then we vote. Fourteen in favour, three against, no abstentions. The proposal is adopted.' },
      { who: 'musa', no: 'Blir det ført i protokollen?', uk: 'Це занесуть до протоколу?', en: 'Will it be entered in the minutes?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'laerer', x: 100, mood: 'happy', pose: 'hold' }, { id: 'musa', x: 310, mood: 'grin', pose: 'cheer' }], props: [{ type: 'docs', x: 215, y: 205 }], fx: 'stars' }, lines: [
      { who: 'laerer', no: 'Ja, protokollen sendes ut innen en uke, og styret innhenter tilbud.', uk: 'Так, протокол розішлють протягом тижня, а правління збере пропозиції від фірм.', en: 'Yes, the minutes go out within a week, and the board will collect quotes.' },
      { who: 'musa', no: 'Flott. Da var mitt første husmøte lettere enn jeg trodde.', uk: 'Чудово. Мої перші збори виявилися легшими, ніж я думав.', en: 'Great. So my first house meeting was easier than I expected.' }
    ]}
  ],

  vocab: [
    ['et husmøte', 'збори мешканців', 'a house meeting'],
    ['ei saksliste', 'порядок денний', 'an agenda'],
    ['ei sak', 'питання, справа', 'an item, a case'],
    ['å be om ordet', 'просити слова', 'to ask for the floor'],
    ['et forslag', 'пропозиція', 'a proposal'],
    ['å fremme et forslag', 'внести пропозицію', 'to put forward a proposal'],
    ['å begrunne', 'обґрунтувати', 'to justify'],
    ['et ladepunkt', 'зарядна точка', 'a charging point'],
    ['ei investering', 'інвестиція', 'an investment'],
    ['et vedlikeholdsfond', 'ремонтний фонд', 'a maintenance fund'],
    ['å stemme', 'голосувати', 'to vote'],
    ['blank stemme', 'утримався', 'an abstention'],
    ['å vedta', 'ухвалити', 'to adopt, to pass'],
    ['en protokoll', 'протокол', 'the minutes'],
    ['et styre', 'правління', 'a board']
  ],

  words: {
    no: { 'husmøtet': 'збори мешканців', 'husmøte': 'збори мешканців', 'følger': 'дотримуємося', 'sakslista': 'порядок денний', 'saker': 'питання', 'kveld': 'вечір', 'ber': 'прошу', 'ordet': 'слово (be om ordet)', 'rekk': 'підніми', 'hånda': 'рука', 'tur': 'черга (etter tur — по черзі)', 'foreslår': 'пропоную', 'setter': 'ставимо', 'ladepunkter': 'зарядні точки', 'garasjen': 'гараж', 'forslag': 'пропозиція', 'begrunne': 'обґрунтувати', 'kort': 'коротко', 'stadig': 'дедалі', 'flere': 'більше', 'kjøper': 'купують', 'elbil': 'електромобіль', 'felles': 'спільний', 'lading': 'зарядка', 'billigere': 'дешевше', 'egne': 'власні', 'anlegg': 'установки', 'betaler': 'платить', 'ingen': 'жодного', 'hele': 'усе (i det hele tatt — узагалі)', 'tatt': 'узято (i det hele tatt)', 'poeng': 'зауваження, думка', 'derfor': 'тому', 'brukerne': 'користувачі', 'kilowattime': 'кіловат-година', 'investeringen': 'інвестиція', 'vedlikeholdsfondet': 'ремонтний фонд', 'stemmer': 'голосуємо', 'fjorten': 'чотирнадцять', 'mot': 'проти', 'blanke': 'утримані', 'forslaget': 'пропозиція', 'vedtatt': 'ухвалено', 'ført': 'занесено', 'protokollen': 'протокол', 'sendes': 'розсилається', 'innen': 'протягом', 'styret': 'правління', 'innhenter': 'збирає', 'tilbud': 'пропозиції (від фірм)', 'lettere': 'легше', 'trodde': 'думав', 'beboerne': 'мешканці', 'bestemme': 'вирішити', 'argumentere': 'аргументувати' },
    en: { 'husmøtet': 'the house meeting', 'husmøte': 'house meeting', 'følger': 'follow', 'sakslista': 'the agenda', 'saker': 'items', 'kveld': 'evening', 'ber': 'ask', 'ordet': 'the floor (be om ordet)', 'rekk': 'raise', 'hånda': 'the hand', 'tur': 'turn (etter tur — in turn)', 'foreslår': 'propose', 'setter': 'set up', 'ladepunkter': 'charging points', 'garasjen': 'the garage', 'forslag': 'proposal', 'begrunne': 'to justify', 'kort': 'briefly', 'stadig': 'increasingly', 'flere': 'more', 'kjøper': 'buy', 'elbil': 'electric car', 'felles': 'shared', 'lading': 'charging', 'billigere': 'cheaper', 'egne': 'own', 'anlegg': 'installations', 'betaler': 'pays', 'ingen': 'no', 'hele': 'whole (i det hele tatt — at all)', 'tatt': 'taken (i det hele tatt)', 'poeng': 'point', 'derfor': 'therefore', 'brukerne': 'the users', 'kilowattime': 'kilowatt-hour', 'investeringen': 'the investment', 'vedlikeholdsfondet': 'the maintenance fund', 'stemmer': 'vote', 'fjorten': 'fourteen', 'mot': 'against', 'blanke': 'blank, abstentions', 'forslaget': 'the proposal', 'vedtatt': 'adopted', 'ført': 'entered', 'protokollen': 'the minutes', 'sendes': 'is sent', 'innen': 'within', 'styret': 'the board', 'innhenter': 'collects', 'tilbud': 'quotes', 'lettere': 'easier', 'trodde': 'expected', 'beboerne': 'the residents', 'bestemme': 'to decide', 'argumentere': 'to argue' }
  }
});
