window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p116',
  level: 'B1',
  category: 'jobb',
  title: 'Skattekortet',
  titleUk: 'Податкова картка',
  titleEn: 'The Tax Card',
  summaryUk: 'Перший робочий тиждень Муси: податкова картка, D-номер, банківський рахунок і перша зарплата в Норвегії.',
  summaryEn: 'Musa’s first week at work: the tax card, a D-number, a bank account and his first salary in Norway.',
  summaryNo: 'Musas første uke på jobben: skattekort, D-nummer, bankkonto og den første lønna i Norge.',
  cover: 5,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, mood: 'happy', pose: 'wave' }, { id: 'musa', x: 290 }], props: [{ type: 'officedesk', x: 110 }] }, lines: [
      { who: 'maria', no: 'Velkommen til jobben, Musa! Har du bestilt skattekort?', uk: 'Ласкаво просимо на роботу, Мусо! Ти вже замовив податкову картку?', en: 'Welcome to the job, Musa! Have you ordered a tax card?' },
      { who: 'musa', no: 'Skattekort? Nei, hva er det?', uk: 'Податкову картку? Ні, а що це?', en: 'A tax card? No, what is that?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, pose: 'point' }, { id: 'musa', x: 290, mood: 'surprised' }], props: [{ type: 'docs', x: 110, y: 235, front: true }] }, lines: [
      { who: 'maria', no: 'Uten skattekort må vi trekke femti prosent skatt av lønna di.', uk: 'Без податкової картки ми мусимо утримувати п’ятдесят відсотків податку з твоєї зарплати.', en: 'Without a tax card we have to deduct fifty per cent tax from your salary.' },
      { who: 'musa', no: 'Femti prosent? Det er altfor mye!', uk: 'П’ятдесят відсотків? Це занадто багато!', en: 'Fifty per cent? That is far too much!' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, pose: 'hold' }, { id: 'musa', x: 290, mood: 'happy', pose: 'hips' }], props: [{ type: 'computer', x: 200, y: 250 }, { type: 'officedesk', x: 200 }] }, lines: [
      { who: 'maria', no: 'Du bestiller det på nettet hos Skatteetaten. Du trenger et fødselsnummer eller et D-nummer.', uk: 'Замовляєш онлайн у податковій службі. Тобі потрібен персональний номер або D-номер.', en: 'You order it online from the Tax Administration. You need a national ID number or a D-number.' },
      { who: 'musa', no: 'Jeg har et D-nummer. Jeg fikk det da jeg kom til Norge.', uk: 'У мене є D-номер. Я отримав його, коли приїхав до Норвегії.', en: 'I have a D-number. I got it when I came to Norway.' }
    ]},
    { art: {"bg": "office", "chars": [{"id": "musa", "x": 120, "mood": "surprised", "pose": "hold"}, {"id": "maria", "x": 290, "mood": "happy"}], "props": [{"type": "computer", "x": 150, "y": 250}, {"type": "officedesk", "x": 150}]}, lines: [
      { who: "musa", no: "Jeg må logge inn med BankID. Hva er det?", uk: "Мені треба увійти через BankID. Що це?", en: "I have to log in with BankID. What is that?" },
      { who: "maria", no: "Det er en elektronisk ID. Du får den i banken.", uk: "Це електронний ідентифікатор. Його дають у банку.", en: "It is an electronic ID. You get it from the bank." }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "mood": "happy"}, {"id": "musa", "x": 290, "pose": "hold"}], "props": [{"type": "counter", "x": 110}, {"type": "docs", "x": 265, "y": 230, "front": true}]}, lines: [
      { who: "narrator", no: "Musa går til banken for å åpne en konto.", uk: "Муса йде в банк відкрити рахунок.", en: "Musa goes to the bank to open an account." },
      { who: "kasserer", no: "Velkommen! Har du pass og D-nummer?", uk: "Ласкаво просимо! У вас є паспорт і D-номер?", en: "Welcome! Do you have a passport and a D-number?" },
      { who: "musa", no: "Ja, her er begge deler.", uk: "Так, ось обидва.", en: "Yes, here are both." }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "mood": "grin"}, {"id": "musa", "x": 290, "mood": "surprised"}], "props": [{"type": "counter", "x": 110}]}, lines: [
      { who: "kasserer", no: "Om en uke får du bankkort og BankID.", uk: "За тиждень отримаєте банківську картку й BankID.", en: "In a week you will get a bank card and BankID." },
      { who: "musa", no: "En uke? I England tar det én dag!", uk: "Тиждень? В Англії це займає один день!", en: "A week? In England it takes one day!" },
      { who: "kasserer", no: "Velkommen til Norge!", uk: "Ласкаво просимо до Норвегії!", en: "Welcome to Norway!" }
    ]},
    { art: { bg: 'office', chars: [{ id: 'musa', x: 120, pose: 'hold' }, { id: 'maria', x: 290, mood: 'happy' }], props: [{ type: 'computer', x: 150, y: 250 }, { type: 'officedesk', x: 150 }] }, lines: [
      { who: 'musa', no: 'Her spør de hvor mye jeg tjener i år. Det vet jeg ikke helt.', uk: 'Тут питають, скільки я заробляю цього року. Я точно не знаю.', en: 'Here they ask how much I earn this year. I am not quite sure.' },
      { who: 'maria', no: 'Skriv hva du tror. Du kan alltid endre det senere.', uk: 'Напиши, скільки думаєш. Ти завжди можеш змінити це пізніше.', en: 'Write what you think. You can always change it later.' }
    ]},
    { art: {"bg": "office", "chars": [{"id": "maria", "x": 110, "pose": "point"}, {"id": "musa", "x": 290, "mood": "surprised"}], "props": [{"type": "docs", "x": 110, "y": 235, "front": true}]}, lines: [
      { who: "maria", no: "Husk også å sjekke skattemeldingen hver vår.", uk: "Не забувай також перевіряти податкову декларацію щовесни.", en: "Also remember to check your tax return every spring." },
      { who: "musa", no: "Skattemelding? Enda et nytt ord!", uk: "Податкова декларація? Ще одне нове слово!", en: "Tax return? Yet another new word!" }
    ]},
    { art: {"bg": "office", "chars": [{"id": "maria", "x": 110, "mood": "grin", "pose": "hips"}, {"id": "musa", "x": 290, "mood": "happy", "pose": "cheer"}]}, lines: [
      { who: "maria", no: "Der ser du hvor mye skatt du har betalt. Kanskje får du penger tilbake!", uk: "Там видно, скільки податку ти заплатив. Можливо, отримаєш гроші назад!", en: "There you see how much tax you have paid. Maybe you will get money back!" },
      { who: "musa", no: "Penger tilbake? Det liker jeg!", uk: "Гроші назад? Мені це подобається!", en: "Money back? I like that!" }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 110, pose: 'point' }, { id: 'musa', x: 290 }], props: [{ type: 'coins', x: 200, y: 250 }] }, lines: [
      { who: 'maria', no: 'Lønna kommer den tjuende hver måned, rett inn på kontoen din.', uk: 'Зарплата надходить двадцятого числа щомісяця прямо на твій рахунок.', en: 'Your salary comes on the twentieth of every month, straight into your account.' },
      { who: 'musa', no: 'Må jeg ha en norsk bankkonto?', uk: 'Мені потрібен норвезький банківський рахунок?', en: 'Do I need a Norwegian bank account?' },
      { who: 'maria', no: 'Ja, det er enklest.', uk: 'Так, так найпростіше.', en: 'Yes, that is easiest.' }
    ]},
    { art: { bg: 'home', chars: [{ id: 'musa', x: 200, mood: 'grin', pose: 'cheer' }], props: [{ type: 'phone', x: 150, y: 240, front: true }], fx: 'stars' }, lines: [
      { who: 'narrator', no: 'En måned senere.', uk: 'Через місяць.', en: 'A month later.' },
      { who: 'musa', no: 'Min første lønn i Norge! Nå kan jeg endelig kjøpe en god regnjakke.', uk: 'Моя перша зарплата в Норвегії! Тепер я нарешті можу купити гарний дощовик.', en: 'My first salary in Norway! Now I can finally buy a good raincoat.' }
    ]},
    { art: {"bg": "shop", "chars": [{"id": "kasserer", "x": 110, "mood": "surprised"}, {"id": "musa", "x": 290, "mood": "grin", "pose": "cheer"}], "props": [{"type": "counter", "x": 110}, {"type": "bike", "x": 230, "s": 0.7, "front": true}]}, lines: [
      { who: "narrator", no: "Musa går rett til sportsbutikken.", uk: "Муса йде прямо до спортивного магазину.", en: "Musa goes straight to the sports shop." },
      { who: "musa", no: "Én regnjakke – og nye dekk til sykkelen!", uk: "Один дощовик — і нові шини для велосипеда!", en: "One raincoat — and new tyres for my bike!" },
      { who: "kasserer", no: "Igjen? Du var jo her forrige måned!", uk: "Знову? Ти ж був тут минулого місяця!", en: "Again? You were here last month!" }
    ]}
  ],

  vocab: [
    ['et skattekort', 'податкова картка', 'a tax card'],
    ['skatt', 'податок', 'tax'],
    ['ei lønn', 'зарплата', 'a salary'],
    ['trekke', 'утримувати', 'to deduct'],
    ['bestille', 'замовляти', 'to order'],
    ['et fødselsnummer', 'персональний номер', 'a national ID number'],
    ['et D-nummer', 'D-номер (тимчасовий)', 'a D-number'],
    ['tjene', 'заробляти', 'to earn'],
    ['endre', 'змінювати', 'to change'],
    ['en bankkonto', 'банківський рахунок', 'a bank account'],
    ['prosent', 'відсоток', 'per cent'],
    ['på nettet', 'онлайн', 'online'],
    ["BankID", "BankID (електронний підпис)", "BankID (electronic ID)"],
    ["åpne en konto", "відкрити рахунок", "to open an account"],
    ["et bankkort", "банківська картка", "a bank card"],
    ["ei skattemelding", "податкова декларація", "a tax return"],
    ["penger tilbake", "повернення грошей", "money back"],
    ["forrige måned", "минулого місяця", "last month"]
  ],

  words: {
    no: { "logge": "увійти (logge inn)", "inn": "в, всередину", "bankid": "BankID (електронний підпис)", "elektronisk": "електронний", "id": "ідентифікатор", "banken": "банк", "åpne": "відкрити", "konto": "рахунок", "begge": "обидва", "deler": "частини (begge deler — обидва)", "bankkort": "банківська картка", "uke": "тиждень", "tar": "займає", "husk": "пам’ятай", "sjekke": "перевірити", "skattemeldingen": "податкова декларація", "vår": "весна", "skattemelding": "податкова декларація", "ord": "слово", "betalt": "заплатив", "penger": "гроші", "tilbake": "назад", "liker": "подобається", "rett": "прямо", "sportsbutikken": "спортивний магазин", "dekk": "шини", "sykkelen": "велосипед", "forrige": "минулий", 'skattekort': 'податкова картка', 'bestilt': 'замовив', 'trekke': 'утримувати', 'femti': 'п’ятдесят', 'prosent': 'відсотків', 'skatt': 'податок', 'lønna': 'зарплата', 'altfor': 'занадто', 'nettet': 'інтернет', 'skatteetaten': 'Податкова служба Норвегії', 'fødselsnummer': 'персональний номер', 'd-nummer': 'D-номер', 'fikk': 'отримав', 'spør': 'питають', 'tjener': 'заробляю', 'endre': 'змінити', 'senere': 'пізніше', 'tjuende': 'двадцяте', 'kontoen': 'рахунок', 'bankkonto': 'банківський рахунок', 'enklest': 'найпростіше', 'lønn': 'зарплата' },
    en: { "logge": "log (logge inn — log in)", "inn": "in", "bankid": "BankID (electronic ID)", "elektronisk": "electronic", "id": "ID", "banken": "the bank", "åpne": "open", "konto": "account", "begge": "both", "deler": "parts (begge deler — both)", "bankkort": "bank card", "uke": "week", "tar": "takes", "husk": "remember", "sjekke": "check", "skattemeldingen": "the tax return", "vår": "spring", "skattemelding": "tax return", "ord": "word", "betalt": "paid", "penger": "money", "tilbake": "back", "liker": "like", "rett": "straight", "sportsbutikken": "the sports shop", "dekk": "tyres", "sykkelen": "the bike", "forrige": "last, previous", 'skattekort': 'tax card', 'bestilt': 'ordered', 'trekke': 'deduct', 'femti': 'fifty', 'prosent': 'per cent', 'skatt': 'tax', 'lønna': 'the salary', 'altfor': 'far too', 'nettet': 'the internet', 'skatteetaten': 'the Norwegian Tax Administration', 'fødselsnummer': 'national ID number', 'd-nummer': 'D-number', 'fikk': 'got', 'spør': 'ask', 'tjener': 'earn', 'endre': 'change', 'senere': 'later', 'tjuende': 'twentieth', 'kontoen': 'the account', 'bankkonto': 'bank account', 'enklest': 'easiest', 'lønn': 'salary' }
  }
});
