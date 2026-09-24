window.COMICS = window.COMICS || [];

/* p125 — B1: перший візит у NAV. Як пояснити ситуацію, що таке vedtak і які папери потрібні. */
COMICS.push({
  id: 'p125',
  level: 'B1',
  category: 'jobb',
  title: 'På NAV-kontoret',
  titleUk: 'У NAV',
  titleEn: 'At the NAV office',
  summaryUk: 'Руслан утратив роботу й уперше йде в NAV. Консультантка пояснює, як подати заяву, які документи потрібні та скільки чекати на рішення.',
  summaryEn: 'Ruslan has lost his job and visits NAV for the first time. The adviser explains how to apply, which documents are needed and how long the decision takes.',
  summaryNo: 'Ruslan har mistet jobben og er hos NAV for første gang. Veilederen forklarer hvordan han søker, hvilke papirer han trenger, og hvor lenge han må vente på vedtaket.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 300, mood: 'sad' }, { id: 'maria', x: 100, mood: 'happy' }], props: [{ type: 'officedesk', x: 100 }, { type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'narrator', no: 'Ruslan mistet jobben i forrige måned. I dag er han hos NAV.', uk: 'Руслан утратив роботу минулого місяця. Сьогодні він у NAV.', en: 'Ruslan lost his job last month. Today he is at NAV.' },
      { who: 'maria', no: 'Velkommen. Hva kan jeg hjelpe deg med i dag?', uk: 'Вітаю. Чим можу допомогти сьогодні?', en: 'Welcome. How can I help you today?' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 300, mood: 'normal' }, { id: 'maria', x: 100, mood: 'normal' }], props: [{ type: 'officedesk', x: 100 }] }, lines: [
      { who: 'ruslan', no: 'Bedriften måtte kutte kostnader, så jeg ble oppsagt.', uk: 'Компанія мусила скоротити витрати, тож мене звільнили.', en: 'The company had to cut costs, so I was made redundant.' },
      { who: 'maria', no: 'Det var kjedelig å høre. Da kan du søke om dagpenger.', uk: 'Прикро це чути. Тоді ви можете подати на допомогу з безробіття.', en: 'I am sorry to hear that. Then you can apply for unemployment benefit.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, pose: 'point' }, { id: 'ruslan', x: 310, mood: 'surprised' }], props: [{ type: 'officedesk', x: 100 }, { type: 'computer', x: 110, y: 175 }] }, lines: [
      { who: 'ruslan', no: 'Hvilke papirer trenger jeg?', uk: 'Які документи мені потрібні?', en: 'Which papers do I need?' },
      { who: 'maria', no: 'Oppsigelsen, arbeidsavtalen og de tre siste lønnsslippene.', uk: 'Повідомлення про звільнення, трудовий договір і три останні розрахункові листки.', en: 'The notice, your employment contract and the last three payslips.' },
      { who: 'ruslan', no: 'Alt det har jeg hjemme.', uk: 'Усе це в мене вдома.', en: 'I have all of that at home.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'maria', x: 100, mood: 'happy' }, { id: 'ruslan', x: 310, mood: 'normal' }], props: [{ type: 'officedesk', x: 100 }, { type: 'phone', x: 220, y: 200 }] }, lines: [
      { who: 'maria', no: 'Du søker digitalt med BankID. Det tar omtrent tjue minutter.', uk: 'Заяву подають онлайн через BankID. Це займає приблизно двадцять хвилин.', en: 'You apply online with BankID. It takes about twenty minutes.' },
      { who: 'ruslan', no: 'Og hvor lenge må jeg vente på svar?', uk: 'А скільки чекати на відповідь?', en: 'And how long do I have to wait for an answer?' },
      { who: 'maria', no: 'Vanligvis tre til fire uker. Du får et vedtak i innboksen din.', uk: 'Зазвичай три-чотири тижні. Рішення прийде у вашу поштову скриньку.', en: 'Usually three to four weeks. You get a decision in your inbox.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 300, mood: 'normal' }, { id: 'maria', x: 100, mood: 'normal', pose: 'hold' }], props: [{ type: 'officedesk', x: 100 }, { type: 'docs', x: 215, y: 205 }] }, lines: [
      { who: 'ruslan', no: 'Må jeg gjøre noe mens jeg venter?', uk: 'Чи треба щось робити, поки чекаю?', en: 'Do I have to do anything while I wait?' },
      { who: 'maria', no: 'Ja, du må sende meldekort hver fjortende dag og søke jobber aktivt.', uk: 'Так, кожні два тижні треба надсилати звіт і активно шукати роботу.', en: 'Yes, you must send a report card every fortnight and look for work actively.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'ruslan', x: 300, mood: 'happy', pose: 'wave' }, { id: 'maria', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'ruslan', no: 'Takk. Nå forstår jeg hva jeg skal gjøre.', uk: 'Дякую. Тепер я розумію, що робити.', en: 'Thank you. Now I understand what to do.' },
      { who: 'maria', no: 'Bare ta kontakt hvis noe er uklart. Lykke til!', uk: 'Звертайтеся, якщо щось незрозуміло. Щасти!', en: 'Just get in touch if anything is unclear. Good luck!' }
    ]}
  ],

  vocab: [
    ['å miste jobben', 'утратити роботу', 'to lose your job'],
    ['ei oppsigelse', 'звільнення', 'a notice of dismissal'],
    ['dagpenger', 'допомога з безробіття', 'unemployment benefit'],
    ['ei arbeidsavtale', 'трудовий договір', 'an employment contract'],
    ['en lønnsslipp', 'розрахунковий листок', 'a payslip'],
    ['å søke digitalt', 'подавати онлайн', 'to apply online'],
    ['et vedtak', 'офіційне рішення', 'an official decision'],
    ['et meldekort', 'звіт про статус', 'a report card for NAV'],
    ['ei innboks', 'скринька повідомлень', 'an inbox'],
    ['å kutte kostnader', 'скорочувати витрати', 'to cut costs'],
    ['en veileder', 'консультант', 'an adviser'],
    ['uklar', 'незрозумілий', 'unclear'],
    ['aktivt', 'активно', 'actively'],
    ['hver fjortende dag', 'кожні два тижні', 'every fortnight']
  ],

  words: {
    no: { 'nav': 'NAV (служба зайнятості й соцдопомоги)', 'mistet': 'утратив', 'jobben': 'робота', 'forrige': 'минулий', 'måned': 'місяць', 'velkommen': 'ласкаво просимо', 'bedriften': 'підприємство', 'måtte': 'мусила', 'kutte': 'скоротити', 'kostnader': 'витрати', 'oppsagt': 'звільнений', 'kjedelig': 'прикро, нудно', 'høre': 'чути', 'søke': 'подавати заяву, шукати', 'dagpenger': 'допомога з безробіття', 'papirer': 'документи', 'oppsigelsen': 'повідомлення про звільнення', 'arbeidsavtalen': 'трудовий договір', 'siste': 'останні', 'lønnsslippene': 'розрахункові листки', 'hjemme': 'удома', 'digitalt': 'онлайн', 'bankid': 'BankID (електронний підпис)', 'omtrent': 'приблизно', 'tjue': 'двадцять', 'minutter': 'хвилини', 'lenge': 'довго', 'vente': 'чекати', 'svar': 'відповідь', 'vanligvis': 'зазвичай', 'uker': 'тижні', 'vedtak': 'рішення', 'innboksen': 'скринька повідомлень', 'mens': 'поки', 'meldekort': 'звіт для NAV', 'fjortende': 'чотирнадцятий (hver fjortende dag — кожні два тижні)', 'aktivt': 'активно', 'jobber': 'роботи', 'kontakt': 'звʼязок (ta kontakt — звернутися)', 'uklart': 'незрозуміло', 'lykke': 'щастя (lykke til — щасти)', 'veilederen': 'консультантка' },
    en: { 'nav': 'NAV (welfare and labour office)', 'mistet': 'lost', 'jobben': 'the job', 'forrige': 'last', 'måned': 'month', 'velkommen': 'welcome', 'bedriften': 'the company', 'måtte': 'had to', 'kutte': 'to cut', 'kostnader': 'costs', 'oppsagt': 'made redundant', 'kjedelig': 'sad, boring', 'høre': 'to hear', 'søke': 'to apply, to look for', 'dagpenger': 'unemployment benefit', 'papirer': 'papers', 'oppsigelsen': 'the notice', 'arbeidsavtalen': 'the employment contract', 'siste': 'last', 'lønnsslippene': 'the payslips', 'hjemme': 'at home', 'digitalt': 'online', 'bankid': 'BankID (digital ID)', 'omtrent': 'about', 'tjue': 'twenty', 'minutter': 'minutes', 'lenge': 'long', 'vente': 'to wait', 'svar': 'answer', 'vanligvis': 'usually', 'uker': 'weeks', 'vedtak': 'decision', 'innboksen': 'the inbox', 'mens': 'while', 'meldekort': 'report card for NAV', 'fjortende': 'fourteenth (hver fjortende dag — every fortnight)', 'aktivt': 'actively', 'jobber': 'jobs', 'kontakt': 'contact', 'uklart': 'unclear', 'lykke': 'luck (lykke til — good luck)', 'veilederen': 'the adviser' }
  }
});
