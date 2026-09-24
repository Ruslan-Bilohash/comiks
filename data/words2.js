/*
 * Тематичні слова, частина 2 — рівні A2–B2 для життя в Норвегії:
 * робота, житло, гроші, держустанови, покупки, подорожі, техніка, характер, культура.
 * Формат той самий, що й у data/words.js: [норвезькою (з артиклем), uk, en, emoji].
 * Файл лише дописує теми в кінець WORDS.themes — сторінка «Слова», тести й картки підхоплять їх самі.
 */
(() => {
  'use strict';
  if (!window.WORDS || !Array.isArray(window.WORDS.themes)) return;
  window.WORDS.themes.push(
    { id: 'butikk', icon: '🛒', level: 'A1', no: 'På butikken', uk: 'У магазині', en: 'At the shop', words: [
      ['en butikk', 'магазин', 'a shop', '🏪'], ['ei handleliste', 'список покупок', 'a shopping list', '📝'], ['ei vogn', 'візок', 'a trolley', '🛒'],
      ['en kurv', 'кошик', 'a basket', '🧺'], ['en kasse', 'каса', 'a checkout', '💳'], ['en pose', 'пакет', 'a bag', '🛍️'],
      ['en kvittering', 'чек', 'a receipt', '🧾'], ['et tilbud', 'акція, знижка', 'a special offer', '🏷️'], ['en pris', 'ціна', 'a price', '💰'],
      ['billig', 'дешевий', 'cheap', '🤏'], ['dyr', 'дорогий', 'expensive', '💸'], ['en rabatt', 'знижка', 'a discount', '📉'],
      ['å betale', 'платити', 'to pay', '💳'], ['kontant', 'готівкою', 'in cash', '💵'], ['et kort', 'картка', 'a card', '💳'],
      ['ei hylle', 'полиця', 'a shelf', '🗄️'], ['en vare', 'товар', 'an item', '📦'], ['en kø', 'черга', 'a queue', '🚶'],
      ['åpningstid', 'години роботи', 'opening hours', '🕘'], ['å bytte', 'обміняти', 'to exchange', '🔄'],
      ['holdbar til', 'придатний до', 'best before', '📅'], ['pant', 'застава за тару', 'deposit on bottles', '♻️']
    ] },
    { id: 'kjokken', icon: '🍳', level: 'A1', no: 'På kjøkkenet', uk: 'На кухні', en: 'In the kitchen', words: [
      ['en kopp', 'чашка', 'a cup', '☕'], ['et glass', 'склянка', 'a glass', '🥛'], ['en tallerken', 'тарілка', 'a plate', '🍽️'],
      ['en gaffel', 'виделка', 'a fork', '🍴'], ['en kniv', 'ніж', 'a knife', '🔪'], ['ei skje', 'ложка', 'a spoon', '🥄'],
      ['ei gryte', 'каструля', 'a pot', '🍲'], ['ei panne', 'сковорода', 'a frying pan', '🍳'], ['en ovn', 'духовка', 'an oven', '🔥'],
      ['et kjøleskap', 'холодильник', 'a fridge', '🧊'], ['en fryser', 'морозильник', 'a freezer', '❄️'], ['ei vask', 'раковина', 'a sink', '🚰'],
      ['å koke', 'варити', 'to boil', '🫕'], ['å steke', 'смажити', 'to fry', '🍳'], ['å bake', 'пекти', 'to bake', '🥐'],
      ['å skjære', 'різати', 'to cut', '🔪'], ['å røre', 'мішати', 'to stir', '🥣'], ['å smake', 'куштувати', 'to taste', '😋'],
      ['ei oppvaskmaskin', 'посудомийка', 'a dishwasher', '🧼'], ['en oppskrift', 'рецепт', 'a recipe', '📖']
    ] },
    { id: 'jobb2', icon: '💼', level: 'A2', no: 'På jobb', uk: 'На роботі', en: 'At work', words: [
      ['en jobb', 'робота', 'a job', '💼'], ['en arbeidsgiver', 'роботодавець', 'an employer', '👔'], ['en ansatt', 'працівник', 'an employee', '🧑‍💼'],
      ['en kollega', 'колега', 'a colleague', '🤝'], ['en sjef', 'начальник', 'a boss', '🧑‍💼'], ['en kontrakt', 'договір', 'a contract', '📄'],
      ['ei lønn', 'зарплата', 'a salary', '💰'], ['ei arbeidstid', 'робочий час', 'working hours', '🕗'], ['ei pause', 'перерва', 'a break', '☕'],
      ['et møte', 'зустріч', 'a meeting', '📅'], ['en oppgave', 'завдання', 'a task', '📋'], ['en frist', 'дедлайн', 'a deadline', '⏰'],
      ['en søknad', 'заявка', 'an application', '✉️'], ['en CV', 'резюме', 'a CV', '📃'], ['et intervju', 'співбесіда', 'an interview', '🗣️'],
      ['ei ferie', 'відпустка', 'a holiday', '🏖️'], ['sykemelding', 'лікарняний', 'a sick note', '🤒'], ['overtid', 'понаднормові', 'overtime', '🌙'],
      ['en fagforening', 'профспілка', 'a trade union', '🛡️'], ['ei skiftordning', 'змінний графік', 'shift work', '🔁'],
      ['en verneombud', 'уповноважений з охорони праці', 'a safety representative', '🦺'], ['å søke', 'подавати заявку', 'to apply', '📨']
    ] },
    { id: 'bolig2', icon: '🏠', level: 'A2', no: 'Bolig og leie', uk: 'Житло й оренда', en: 'Housing and renting', words: [
      ['ei leilighet', 'квартира', 'a flat', '🏢'], ['et hus', 'будинок', 'a house', '🏠'], ['ei hybel', 'кімната для оренди', 'a bedsit', '🚪'],
      ['en husleie', 'орендна плата', 'the rent', '💸'], ['et depositum', 'завдаток', 'a deposit', '🏦'], ['ei leiekontrakt', 'договір оренди', 'a lease', '📄'],
      ['en utleier', 'орендодавець', 'a landlord', '🔑'], ['en leietaker', 'орендар', 'a tenant', '🧑'], ['et borettslag', 'житловий кооператив', 'a housing co-op', '🏘️'],
      ['ei oppsigelse', 'розірвання договору', 'a notice to quit', '📤'], ['strøm', 'електрика', 'electricity', '⚡'], ['ei vaskemaskin', 'пральна машина', 'a washing machine', '🧺'],
      ['en bod', 'комірчина', 'a storage room', '📦'], ['en balkong', 'балкон', 'a balcony', '🌇'], ['ei trapp', 'сходи', 'stairs', '🪜'],
      ['en heis', 'ліфт', 'a lift', '🛗'], ['et gulv', 'підлога', 'a floor', '🧹'], ['et tak', 'дах, стеля', 'a roof, ceiling', '🏚️'],
      ['ei dugnad', 'громадський суботник', 'a communal work day', '🧑‍🤝‍🧑'], ['husordensregler', 'правила будинку', 'house rules', '📜'],
      ['å flytte', 'переїжджати', 'to move', '🚚'], ['ei nøkkel', 'ключ', 'a key', '🔑']
    ] },
    { id: 'penger', icon: '🏦', level: 'A2', no: 'Penger og bank', uk: 'Гроші й банк', en: 'Money and the bank', words: [
      ['en bank', 'банк', 'a bank', '🏦'], ['en konto', 'рахунок', 'an account', '🧾'], ['et bankkort', 'банківська картка', 'a bank card', '💳'],
      ['en regning', 'рахунок до оплати', 'a bill', '📨'], ['ei faktura', 'рахунок-фактура', 'an invoice', '🧾'], ['ei betaling', 'платіж', 'a payment', '💸'],
      ['skatt', 'податок', 'tax', '🏛️'], ['et skattekort', 'податкова картка', 'a tax card', '📇'], ['ei selvangivelse', 'податкова декларація', 'a tax return', '📑'],
      ['et lån', 'кредит', 'a loan', '🏧'], ['renter', 'відсотки', 'interest', '📈'], ['ei sparing', 'заощадження', 'savings', '🐖'],
      ['ei inntekt', 'дохід', 'an income', '💰'], ['ei utgift', 'витрата', 'an expense', '📉'], ['et budsjett', 'бюджет', 'a budget', '🧮'],
      ['ei krone', 'крона', 'a krone', '🪙'], ['kontanter', 'готівка', 'cash', '💵'], ['ei forsikring', 'страхування', 'insurance', '🛡️'],
      ['å overføre', 'переказати', 'to transfer', '🔁'], ['å tjene', 'заробляти', 'to earn', '🧑‍💼'],
      ['å spare', 'заощаджувати', 'to save', '🏦'], ['å låne', 'позичати', 'to borrow, lend', '🤝']
    ] },
    { id: 'offentlig', icon: '🏛️', level: 'B1', no: 'Det offentlige', uk: 'Державні установи', en: 'Public services', words: [
      ['ei kommune', 'комуна (муніципалітет)', 'a municipality', '🏛️'], ['et kontor', 'офіс', 'an office', '🏢'], ['en fastlege', 'сімейний лікар', 'a GP', '🩺'],
      ['ei legevakt', 'невідкладна допомога', 'emergency clinic', '🚑'], ['et sykehus', 'лікарня', 'a hospital', '🏥'], ['ei helsestasjon', 'дитяча поліклініка', 'a health clinic', '👶'],
      ['et personnummer', 'персональний номер', 'a national ID number', '🔢'], ['ei oppholdstillatelse', 'дозвіл на проживання', 'a residence permit', '🛂'],
      ['ei søknad', 'заява', 'an application', '📄'], ['et vedtak', 'рішення установи', 'an official decision', '⚖️'], ['ei klage', 'скарга', 'a complaint', '📢'],
      ['et skjema', 'бланк', 'a form', '🗒️'], ['ei frist', 'термін', 'a deadline', '📆'], ['ei bekreftelse', 'підтвердження', 'a confirmation', '✅'],
      ['ei tolketjeneste', 'послуги перекладача', 'interpreting service', '🗣️'], ['ei introduksjonsprogram', 'вступна програма', 'the introduction programme', '📚'],
      ['barnetrygd', 'допомога на дитину', 'child benefit', '👪'], ['dagpenger', 'допомога з безробіття', 'unemployment benefit', '💶'],
      ['ei timeavtale', 'запис на прийом', 'an appointment', '📅'], ['ei legeerklæring', 'довідка від лікаря', 'a medical certificate', '📃']
    ] },
    { id: 'reise', icon: '✈️', level: 'A2', no: 'Reise', uk: 'Подорожі', en: 'Travel', words: [
      ['ei reise', 'подорож', 'a journey', '🧳'], ['en flyplass', 'аеропорт', 'an airport', '🛫'], ['et fly', 'літак', 'a plane', '✈️'],
      ['et tog', 'потяг', 'a train', '🚆'], ['en buss', 'автобус', 'a bus', '🚌'], ['ei ferje', 'пором', 'a ferry', '⛴️'],
      ['en billett', 'квиток', 'a ticket', '🎫'], ['ei avgang', 'відправлення', 'a departure', '🕐'], ['ei ankomst', 'прибуття', 'an arrival', '🛬'],
      ['ei bagasje', 'багаж', 'luggage', '🧳'], ['et pass', 'паспорт', 'a passport', '🛂'], ['et hotell', 'готель', 'a hotel', '🏨'],
      ['ei bestilling', 'бронювання', 'a booking', '📲'], ['en forsinkelse', 'затримка', 'a delay', '⏳'], ['ei retning', 'напрямок', 'a direction', '🧭'],
      ['et kart', 'карта', 'a map', '🗺️'], ['ei grense', 'кордон', 'a border', '🚧'], ['ei rundreise', 'тур', 'a round trip', '🔄'],
      ['å pakke', 'пакувати', 'to pack', '🎒'], ['å bytte tog', 'пересісти на інший потяг', 'to change trains', '🔀'],
      ['ei overnatting', 'ночівля', 'accommodation', '🛏️'], ['ei utsikt', 'краєвид', 'a view', '🏔️']
    ] },
    { id: 'teknologi', icon: '💻', level: 'A2', no: 'Teknologi', uk: 'Техніка й інтернет', en: 'Technology', words: [
      ['ei datamaskin', 'комп’ютер', 'a computer', '💻'], ['en mobil', 'мобільний', 'a mobile', '📱'], ['et nettbrett', 'планшет', 'a tablet', '📲'],
      ['ei skjerm', 'екран', 'a screen', '🖥️'], ['et tastatur', 'клавіатура', 'a keyboard', '⌨️'], ['ei mus', 'мишка', 'a mouse', '🖱️'],
      ['et passord', 'пароль', 'a password', '🔒'], ['en bruker', 'користувач', 'a user', '🧑'], ['ei e-post', 'електронна пошта', 'an email', '✉️'],
      ['ei nettside', 'вебсайт', 'a website', '🌐'], ['ei lenke', 'посилання', 'a link', '🔗'], ['ei fil', 'файл', 'a file', '📁'],
      ['å laste ned', 'завантажити', 'to download', '⬇️'], ['å laste opp', 'вивантажити', 'to upload', '⬆️'], ['å søke', 'шукати', 'to search', '🔎'],
      ['å slette', 'видалити', 'to delete', '🗑️'], ['å lagre', 'зберегти', 'to save', '💾'], ['ei oppdatering', 'оновлення', 'an update', '🔄'],
      ['ei app', 'застосунок', 'an app', '📦'], ['trådløst nett', 'вайфай', 'wireless network', '📶']
    ] },
    { id: 'folk', icon: '🧑‍🤝‍🧑', level: 'A2', no: 'Mennesker', uk: 'Люди: зовнішність і характер', en: 'People: looks and character', words: [
      ['høy', 'високий', 'tall', '📏'], ['lav', 'низький', 'short', '📐'], ['ung', 'молодий', 'young', '🧒'],
      ['gammel', 'старий', 'old', '👴'], ['sterk', 'сильний', 'strong', '💪'], ['snill', 'добрий', 'kind', '😊'],
      ['hyggelig', 'приємний', 'pleasant', '🙂'], ['morsom', 'смішний', 'funny', '😄'], ['alvorlig', 'серйозний', 'serious', '😐'],
      ['rolig', 'спокійний', 'calm', '😌'], ['modig', 'сміливий', 'brave', '🦁'], ['sjenert', 'сором’язливий', 'shy', '😳'],
      ['flink', 'вправний', 'clever, good at', '🎯'], ['lat', 'лінивий', 'lazy', '🦥'], ['ærlig', 'чесний', 'honest', '🤝'],
      ['tålmodig', 'терплячий', 'patient', '⏳'], ['nysgjerrig', 'допитливий', 'curious', '🔍'], ['pålitelig', 'надійний', 'reliable', '🛡️'],
      ['sjenerøs', 'щедрий', 'generous', '🎁'], ['sta', 'упертий', 'stubborn', '🐐'],
      ['et skjegg', 'борода', 'a beard', '🧔'], ['ei brille', 'окуляри', 'glasses', '👓']
    ] },
    { id: 'samtale', icon: '🗣️', level: 'B1', no: 'Samtale', uk: 'Розмова й вирази', en: 'Conversation', words: [
      ['etter min mening', 'на мою думку', 'in my opinion', '💭'], ['jeg er enig', 'я згоден', 'I agree', '👍'], ['jeg er uenig', 'я не згоден', 'I disagree', '👎'],
      ['for eksempel', 'наприклад', 'for example', '📌'], ['på den ene siden', 'з одного боку', 'on the one hand', '🤚'], ['på den andre siden', 'з іншого боку', 'on the other hand', '✋'],
      ['det kommer an på', 'це залежить від', 'it depends on', '⚖️'], ['kan du gjenta?', 'можеш повторити?', 'can you repeat?', '🔁'], ['jeg forstår ikke', 'я не розумію', 'I do not understand', '❓'],
      ['kan du snakke saktere?', 'можеш говорити повільніше?', 'can you speak slower?', '🐢'], ['unnskyld', 'вибач', 'excuse me, sorry', '🙏'], ['det går bra', 'усе гаразд', 'it is fine', '👌'],
      ['med andre ord', 'іншими словами', 'in other words', '🔄'], ['til slutt', 'нарешті', 'finally', '🏁'], ['først og fremst', 'перш за все', 'first of all', '1️⃣'],
      ['dessuten', 'крім того', 'besides', '➕'], ['likevel', 'усе ж таки', 'nevertheless', '🔀'], ['derfor', 'тому', 'therefore', '➡️'],
      ['kanskje', 'можливо', 'maybe', '🤔'], ['selvfølgelig', 'звичайно', 'of course', '✅']
    ] },
    { id: 'hverdagsfraser', icon: '💬', level: 'A1', no: 'Hverdagsfraser', uk: 'Щоденні фрази', en: 'Everyday phrases', words: [
      ['god morgen', 'доброго ранку', 'good morning', '🌅'], ['god kveld', 'доброго вечора', 'good evening', '🌆'], ['ha det bra', 'бувай', 'goodbye', '👋'],
      ['vi ses', 'до зустрічі', 'see you', '🙌'], ['tusen takk', 'дуже дякую', 'thank you very much', '🙏'], ['vær så god', 'будь ласка', 'here you are', '🤲'],
      ['hvordan går det?', 'як справи?', 'how are you?', '🙂'], ['bare bra', 'усе добре', 'just fine', '👍'], ['hva heter du?', 'як тебе звати?', 'what is your name?', '📛'],
      ['hvor kommer du fra?', 'звідки ти?', 'where are you from?', '🌍'], ['jeg bor i …', 'я живу в …', 'I live in …', '🏠'], ['hyggelig å møte deg', 'приємно познайомитися', 'nice to meet you', '🤝'],
      ['kan du hjelpe meg?', 'можеш допомогти?', 'can you help me?', '🆘'], ['hvor mye koster det?', 'скільки коштує?', 'how much is it?', '💰'], ['hvor er toalettet?', 'де туалет?', 'where is the toilet?', '🚻'],
      ['jeg er sulten', 'я голодний', 'I am hungry', '🍽️'], ['jeg er tørst', 'я хочу пити', 'I am thirsty', '🥤'], ['jeg er trøtt', 'я втомився', 'I am tired', '😴'],
      ['lykke til', 'щасти', 'good luck', '🍀'], ['god helg', 'гарних вихідних', 'have a nice weekend', '🎉']
    ] },
    { id: 'miljo', icon: '♻️', level: 'B1', no: 'Miljø', uk: 'Довкілля', en: 'Environment', words: [
      ['et miljø', 'довкілля', 'the environment', '🌍'], ['ei forurensning', 'забруднення', 'pollution', '🏭'], ['et klima', 'клімат', 'climate', '🌡️'],
      ['ei kildesortering', 'сортування сміття', 'waste sorting', '♻️'], ['et avfall', 'відходи', 'waste', '🗑️'], ['ei gjenvinning', 'переробка', 'recycling', '🔄'],
      ['et plast', 'пластик', 'plastic', '🧴'], ['et papir', 'папір', 'paper', '📄'], ['et glass', 'скло', 'glass', '🍾'],
      ['ei matavfall', 'харчові відходи', 'food waste', '🍎'], ['ei energi', 'енергія', 'energy', '⚡'], ['fornybar', 'відновлюваний', 'renewable', '🌬️'],
      ['ei vannkraft', 'гідроенергетика', 'hydropower', '💧'], ['ei elbil', 'електромобіль', 'an electric car', '🔌'], ['ei utslipp', 'викиди', 'emissions', '💨'],
      ['å spare strøm', 'економити електрику', 'to save electricity', '💡'], ['å sortere', 'сортувати', 'to sort', '🧺'], ['å kaste', 'викидати', 'to throw away', '🚮'],
      ['bærekraftig', 'сталий, екологічний', 'sustainable', '🌱'], ['ei natur', 'природа', 'nature', '🌲']
    ] },
    { id: 'friluft', icon: '🏔️', level: 'B1', no: 'Friluftsliv', uk: 'Життя на природі', en: 'Outdoor life', words: [
      ['ei fjelltur', 'похід у гори', 'a mountain hike', '🥾'], ['ei hytte', 'хатинка', 'a cabin', '🛖'], ['et bål', 'багаття', 'a campfire', '🔥'],
      ['et telt', 'намет', 'a tent', '⛺'], ['en ryggsekk', 'рюкзак', 'a rucksack', '🎒'], ['ei matpakke', 'перекус із дому', 'a packed lunch', '🥪'],
      ['en termos', 'термос', 'a thermos', '🍵'], ['ei løype', 'маршрут, лижня', 'a trail, ski track', '🎿'], ['ei ski', 'лижі', 'skis', '⛷️'],
      ['ei skøyte', 'ковзан', 'an ice skate', '⛸️'], ['ei fiskestang', 'вудка', 'a fishing rod', '🎣'], ['et bær', 'ягода', 'a berry', '🫐'],
      ['en sopp', 'гриб', 'a mushroom', '🍄'], ['allemannsretten', 'право вільного доступу до природи', 'the right to roam', '🧭'], ['ei frisk luft', 'свіже повітря', 'fresh air', '🌬️'],
      ['ei utsikt', 'краєвид', 'a view', '🏞️'], ['ei elv', 'річка', 'a river', '🏕️'], ['et vann', 'озеро', 'a lake', '💧'],
      ['å gå tur', 'гуляти', 'to go for a walk', '🚶'], ['å telte', 'ночувати в наметі', 'to camp', '🏕️']
    ] },
    { id: 'kultur2', icon: '🇳🇴', level: 'B2', no: 'Norsk kultur', uk: 'Норвезька культура', en: 'Norwegian culture', words: [
      ['ei grunnlov', 'конституція', 'the constitution', '📜'], ['syttende mai', 'сімнадцяте травня', 'the 17th of May', '🇳🇴'], ['et tog', 'хода, парад', 'a parade', '🎉'],
      ['en bunad', 'бунад (нац. костюм)', 'a national costume', '👗'], ['ei julefeiring', 'святкування Різдва', 'Christmas celebration', '🎄'], ['ei påske', 'Великдень', 'Easter', '🐣'],
      ['ei dugnad', 'громадська толока', 'a communal effort', '🧹'], ['koselig', 'затишний', 'cosy', '🕯️'], ['ei likestilling', 'рівноправність', 'equality', '⚖️'],
      ['ei tillit', 'довіра', 'trust', '🤝'], ['janteloven', 'закон Янте', 'the Law of Jante', '📏'], ['ei folkehøgskole', 'народна вища школа', 'a folk high school', '🎓'],
      ['ei tradisjon', 'традиція', 'a tradition', '🏺'], ['ei dialekt', 'діалект', 'a dialect', '🗣️'], ['nynorsk', 'нюношк', 'Nynorsk', '📘'],
      ['bokmål', 'букмол', 'Bokmål', '📗'], ['ei samisk kultur', 'саамська культура', 'Sámi culture', '🦌'], ['et velferdssamfunn', 'соціальна держава', 'a welfare society', '🏛️'],
      ['ei ytringsfrihet', 'свобода слова', 'freedom of speech', '🗨️'], ['ei frivillighet', 'волонтерство', 'volunteering', '🙌']
    ] },
    { id: 'abstrakt', icon: '🧠', level: 'B2', no: 'Abstrakte ord', uk: 'Абстрактні поняття', en: 'Abstract words', words: [
      ['ei erfaring', 'досвід', 'experience', '🧭'], ['ei mulighet', 'можливість', 'an opportunity', '🚪'], ['ei utfordring', 'виклик', 'a challenge', '🧗'],
      ['ei løsning', 'рішення', 'a solution', '💡'], ['ei årsak', 'причина', 'a cause', '🔍'], ['ei følge', 'наслідок', 'a consequence', '➡️'],
      ['ei utvikling', 'розвиток', 'development', '📈'], ['ei endring', 'зміна', 'a change', '🔄'], ['ei forventning', 'очікування', 'an expectation', '🤞'],
      ['ei holdning', 'ставлення', 'an attitude', '🧍'], ['ei erkjennelse', 'усвідомлення', 'a realisation', '💭'], ['ei betydning', 'значення', 'a meaning', '📖'],
      ['ei sammenheng', 'зв’язок, контекст', 'a connection, context', '🔗'], ['ei forskjell', 'різниця', 'a difference', '↔️'], ['ei likhet', 'подібність', 'a similarity', '🟰'],
      ['ei vurdering', 'оцінка, судження', 'an assessment', '⚖️'], ['ei beslutning', 'рішення (вибір)', 'a decision', '✅'], ['ei ansvar', 'відповідальність', 'responsibility', '🛡️'],
      ['ei erfaringsutveksling', 'обмін досвідом', 'exchange of experience', '🔁'], ['ei sannhet', 'правда', 'truth', '🕯️'],
      ['ei tvil', 'сумнів', 'doubt', '❓'], ['ei tillit', 'довіра', 'confidence, trust', '🤝']
    ] },
    { id: 'arbeidsliv', icon: '📊', level: 'B2', no: 'Arbeidsliv', uk: 'Ділова мова', en: 'Professional life', words: [
      ['ei bedrift', 'підприємство', 'a company', '🏢'], ['ei avdeling', 'відділ', 'a department', '🗂️'], ['et prosjekt', 'проєкт', 'a project', '📐'],
      ['ei framdrift', 'хід роботи', 'progress', '📈'], ['et budsjett', 'бюджет', 'a budget', '💰'], ['ei rapport', 'звіт', 'a report', '📄'],
      ['ei tilbakemelding', 'зворотний зв’язок', 'feedback', '💬'], ['ei presentasjon', 'презентація', 'a presentation', '📊'], ['ei forhandling', 'перемовини', 'a negotiation', '🤝'],
      ['ei avtale', 'домовленість', 'an agreement', '✍️'], ['ei rutine', 'регламент', 'a routine', '🔁'], ['ei kompetanse', 'компетенція', 'competence', '🎓'],
      ['ei opplæring', 'навчання на роботі', 'training', '🧑‍🏫'], ['ei ledelse', 'керівництво', 'management', '🧭'], ['ei medarbeidersamtale', 'бесіда з керівником', 'an appraisal talk', '🗣️'],
      ['ei arbeidsmiljø', 'умови праці', 'the working environment', '🌿'], ['ei effektivitet', 'ефективність', 'efficiency', '⚙️'], ['ei kvalitet', 'якість', 'quality', '✨'],
      ['å delegere', 'делегувати', 'to delegate', '📤'], ['å prioritere', 'визначати пріоритети', 'to prioritise', '🥇'],
      ['å koordinere', 'координувати', 'to coordinate', '🔗'], ['ei framtidsplan', 'план на майбутнє', 'a plan for the future', '🗺️']
    ] }
  );
})();
