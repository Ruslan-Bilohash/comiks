window.COMICS = window.COMICS || [];

/* p128 — B1: у стоматолога. Симптоми, лікування, ціна й наступний візит. */
COMICS.push({
  id: 'p128',
  level: 'B1',
  category: 'helse',
  title: 'Hos tannlegen',
  titleUk: 'У стоматолога',
  titleEn: 'At the dentist',
  summaryUk: 'У Дениса болить зуб. Стоматологиня знаходить дірку, пояснює лікування, ціну й нагадує, що дітям до вісімнадцяти лікують безкоштовно.',
  summaryEn: 'Denys has toothache. The dentist finds a cavity, explains the treatment and the price, and reminds him that dental care is free for children under eighteen.',
  summaryNo: 'Denys har vondt i en tann. Tannlegen finner et hull, forklarer behandlingen og prisen, og minner om at barn under atten år får gratis tannbehandling.',
  cover: 0,

  panels: [
    { art: { bg: 'office', chars: [{ id: 'denys', x: 300, mood: 'sad' }, { id: 'kari', x: 100, mood: 'happy' }], props: [{ type: 'stetoskop', x: 215, y: 190 }] }, lines: [
      { who: 'kari', no: 'God dag, Denys. Hva er problemet i dag?', uk: 'Добрий день, Денисе. Що вас турбує сьогодні?', en: 'Good afternoon, Denys. What is the problem today?' },
      { who: 'denys', no: 'Jeg har hatt vondt i en tann i over en uke.', uk: 'У мене вже понад тиждень болить зуб.', en: 'I have had a toothache for over a week.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, pose: 'point' }, { id: 'denys', x: 310, mood: 'surprised' }] }, lines: [
      { who: 'kari', no: 'Gjør det vondt når du drikker noe kaldt?', uk: 'Болить, коли ви п’єте щось холодне?', en: 'Does it hurt when you drink something cold?' },
      { who: 'denys', no: 'Ja, og når jeg tygger på venstre side.', uk: 'Так, і коли жую на лівому боці.', en: 'Yes, and when I chew on the left side.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal', pose: 'hold' }, { id: 'denys', x: 310, mood: 'sad' }], props: [{ type: 'note', x: 215 }] }, lines: [
      { who: 'kari', no: 'Jeg tar et røntgenbilde … Her er det et lite hull.', uk: 'Зроблю рентген… Ось тут маленька дірка.', en: 'I will take an X-ray … There is a small cavity here.' },
      { who: 'denys', no: 'Må tannen trekkes?', uk: 'Зуб треба видаляти?', en: 'Does the tooth have to be pulled out?' },
      { who: 'kari', no: 'Nei da. Vi borer og legger en fylling i dag.', uk: 'Та ні. Сьогодні просвердлимо й поставимо пломбу.', en: 'Not at all. We will drill and put in a filling today.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 310, mood: 'normal' }, { id: 'kari', x: 100, mood: 'happy' }] }, lines: [
      { who: 'denys', no: 'Gjør det vondt?', uk: 'Це боляче?', en: 'Does it hurt?' },
      { who: 'kari', no: 'Du får bedøvelse først, så kjenner du bare litt trykk.', uk: 'Спершу зроблю знеболення, тож ви відчуєте лише легкий тиск.', en: 'You get an anaesthetic first, so you will only feel a little pressure.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'kari', x: 100, mood: 'normal' }, { id: 'denys', x: 310, mood: 'surprised' }], props: [{ type: 'coins', x: 215, y: 200 }] }, lines: [
      { who: 'denys', no: 'Hva koster behandlingen?', uk: 'Скільки коштує лікування?', en: 'How much does the treatment cost?' },
      { who: 'kari', no: 'Omtrent tusen kroner. Voksne betaler selv hos tannlegen.', uk: 'Близько тисячі крон. Дорослі оплачують стоматолога самі.', en: 'About a thousand kroner. Adults pay for the dentist themselves.' },
      { who: 'kari', no: 'Men barn under atten år får gratis behandling.', uk: 'А діти до вісімнадцяти лікуються безкоштовно.', en: 'But children under eighteen get free treatment.' }
    ]},
    { art: { bg: 'office', chars: [{ id: 'denys', x: 300, mood: 'grin', pose: 'cheer' }, { id: 'kari', x: 100, mood: 'happy', pose: 'wave' }], fx: 'stars' }, lines: [
      { who: 'kari', no: 'Ferdig! Husk å pusse tennene to ganger om dagen og bruke tanntråd.', uk: 'Готово! Не забувайте чистити зуби двічі на день і користуватися ниткою.', en: 'All done! Remember to brush twice a day and use dental floss.' },
      { who: 'denys', no: 'Takk. Da bestiller jeg kontroll om et halvt år.', uk: 'Дякую. Тоді запишуся на огляд за півроку.', en: 'Thank you. Then I will book a check-up in six months.' }
    ]}
  ],

  vocab: [
    ['en tannlege', 'стоматолог', 'a dentist'],
    ['ei tann', 'зуб', 'a tooth'],
    ['å ha vondt', 'боліти', 'to be in pain'],
    ['å tygge', 'жувати', 'to chew'],
    ['et røntgenbilde', 'рентген', 'an X-ray'],
    ['et hull', 'дірка, карієс', 'a cavity'],
    ['å trekke ei tann', 'видалити зуб', 'to pull out a tooth'],
    ['å bore', 'свердлити', 'to drill'],
    ['ei fylling', 'пломба', 'a filling'],
    ['ei bedøvelse', 'знеболення', 'an anaesthetic'],
    ['et trykk', 'тиск', 'pressure'],
    ['ei behandling', 'лікування', 'treatment'],
    ['å pusse tenner', 'чистити зуби', 'to brush your teeth'],
    ['en tanntråd', 'зубна нитка', 'dental floss'],
    ['en kontroll', 'плановий огляд', 'a check-up']
  ],

  words: {
    no: { 'tannlegen': 'стоматолог', 'problemet': 'проблема', 'vondt': 'боляче', 'tann': 'зуб', 'tannen': 'зуб', 'tennene': 'зуби', 'uke': 'тиждень', 'drikker': 'п’єте', 'kaldt': 'холодне', 'tygger': 'жую', 'venstre': 'лівий', 'side': 'бік', 'røntgenbilde': 'рентген', 'hull': 'дірка', 'trekkes': 'видаляти', 'borer': 'свердлимо', 'legger': 'ставимо', 'fylling': 'пломба', 'bedøvelse': 'знеболення', 'kjenner': 'відчуваєте', 'trykk': 'тиск', 'koster': 'коштує', 'behandlingen': 'лікування', 'behandling': 'лікування', 'omtrent': 'приблизно', 'tusen': 'тисяча', 'kroner': 'крони', 'voksne': 'дорослі', 'betaler': 'платять', 'selv': 'самі', 'barn': 'діти', 'under': 'до, під', 'atten': 'вісімнадцять', 'gratis': 'безкоштовно', 'ferdig': 'готово', 'husk': 'запам’ятайте', 'pusse': 'чистити', 'ganger': 'рази', 'dagen': 'день', 'bruke': 'користуватися', 'tanntråd': 'зубна нитка', 'bestiller': 'запишуся', 'kontroll': 'огляд', 'halvt': 'пів (et halvt år — півроку)', 'finner': 'знаходить' },
    en: { 'tannlegen': 'the dentist', 'problemet': 'the problem', 'vondt': 'painful', 'tann': 'tooth', 'tannen': 'the tooth', 'tennene': 'the teeth', 'uke': 'week', 'drikker': 'drink', 'kaldt': 'cold', 'tygger': 'chew', 'venstre': 'left', 'side': 'side', 'røntgenbilde': 'X-ray', 'hull': 'cavity', 'trekkes': 'be pulled out', 'borer': 'drill', 'legger': 'put in', 'fylling': 'filling', 'bedøvelse': 'anaesthetic', 'kjenner': 'feel', 'trykk': 'pressure', 'koster': 'costs', 'behandlingen': 'the treatment', 'behandling': 'treatment', 'omtrent': 'about', 'tusen': 'thousand', 'kroner': 'kroner', 'voksne': 'adults', 'betaler': 'pay', 'selv': 'themselves', 'barn': 'children', 'under': 'under', 'atten': 'eighteen', 'gratis': 'free', 'ferdig': 'done', 'husk': 'remember', 'pusse': 'to brush', 'ganger': 'times', 'dagen': 'the day', 'bruke': 'to use', 'tanntråd': 'dental floss', 'bestiller': 'book', 'kontroll': 'check-up', 'halvt': 'half (et halvt år — six months)', 'finner': 'finds' }
  }
});
