/*
 * Тематичні слова, частина 3 — те, що щодня трапляється в Норвегії:
 * числа, напрямки, питальні слова, діти й садок, авто й дорога, пошта, зима,
 * готування, цифрові послуги, безпека, школа й батьки, NAV і права.
 * Формат той самий, що й у data/words.js: [норвезькою (з артиклем), uk, en, emoji].
 * Файл лише дописує теми в кінець WORDS.themes — сторінка «Слова», тести й картки підхоплять їх самі.
 */
(() => {
  'use strict';
  if (!window.WORDS || !Array.isArray(window.WORDS.themes)) return;
  window.WORDS.themes.push(
    { id: 'tall2', icon: '🔢', level: 'A1', no: 'Tall og mengde', uk: 'Числа й кількість', en: 'Numbers and quantity', words: [
      ['et tall', 'число', 'a number', '🔢'], ['ei mengde', 'кількість', 'an amount', '⚖️'], ['halv', 'половина', 'half', '➗'],
      ['en kvart', 'чверть', 'a quarter', '🍕'], ['et dusin', 'дюжина', 'a dozen', '🥚'], ['et par', 'пара', 'a pair', '👟'],
      ['mange', 'багато', 'many', '📚'], ['få', 'мало', 'few', '🤏'], ['nok', 'достатньо', 'enough', '👌'],
      ['for mye', 'забагато', 'too much', '🫗'], ['omtrent', 'приблизно', 'about, roughly', '〰️'], ['minst', 'щонайменше', 'at least', '⬇️'],
      ['høyst', 'щонайбільше', 'at most', '⬆️'], ['dobbelt', 'подвійний', 'double', '✌️'], ['en halvpart', 'половина (частка)', 'a half', '🥧'],
      ['en tredjedel', 'третина', 'a third', '🍰'], ['et prosent', 'відсоток', 'a per cent', '％'], ['en sum', 'сума', 'a sum', '🧮'],
      ['å telle', 'рахувати', 'to count', '🔟'], ['å måle', 'міряти', 'to measure', '📏']
    ] },
    { id: 'retning', icon: '🧭', level: 'A1', no: 'Hvor? Retning og sted', uk: 'Де? Напрямок і місце', en: 'Where? Direction and place', words: [
      ['her', 'тут', 'here', '📍'], ['der', 'там', 'there', '👉'], ['foran', 'спереду', 'in front of', '⏩'],
      ['bak', 'позаду', 'behind', '⏪'], ['over', 'над', 'above', '🔼'], ['under', 'під', 'under', '🔽'],
      ['ved siden av', 'поруч', 'next to', '↔️'], ['mellom', 'між', 'between', '🔀'], ['inne', 'усередині', 'inside', '🏠'],
      ['ute', 'надворі', 'outside', '🌳'], ['oppe', 'угорі', 'up there', '🧗'], ['nede', 'унизу', 'down there', '🪜'],
      ['til høyre', 'праворуч', 'to the right', '➡️'], ['til venstre', 'ліворуч', 'to the left', '⬅️'], ['rett fram', 'прямо', 'straight ahead', '⬆️'],
      ['langt', 'далеко', 'far', '🛣️'], ['nær', 'близько', 'near', '🤝'], ['rundt', 'навколо', 'around', '🔄'],
      ['gjennom', 'крізь', 'through', '🚪'], ['tilbake', 'назад', 'back', '↩️']
    ] },
    { id: 'sporreord', icon: '❓', level: 'A1', no: 'Spørreord og småord', uk: 'Питальні й короткі слова', en: 'Question words and small words', words: [
      ['hva', 'що', 'what', '❓'], ['hvem', 'хто', 'who', '🧑'], ['hvor', 'де', 'where', '📍'],
      ['når', 'коли', 'when', '🕒'], ['hvorfor', 'чому', 'why', '🤔'], ['hvordan', 'як', 'how', '🛠️'],
      ['hvilken', 'який', 'which', '🔍'], ['hvor mye', 'скільки (неліч.)', 'how much', '💰'], ['hvor mange', 'скільки (ліч.)', 'how many', '🔢'],
      ['alltid', 'завжди', 'always', '♾️'], ['ofte', 'часто', 'often', '🔁'], ['noen ganger', 'іноді', 'sometimes', '🎲'],
      ['sjelden', 'рідко', 'rarely', '🌒'], ['aldri', 'ніколи', 'never', '🚫'], ['allerede', 'уже', 'already', '✅'],
      ['ennå', 'ще', 'yet, still', '⏳'], ['kanskje', 'можливо', 'maybe', '🤷'], ['derfor', 'тому', 'therefore', '➡️'],
      ['likevel', 'усе одно', 'anyway, still', '🔁'], ['heldigvis', 'на щастя', 'luckily', '🍀']
    ] },
    { id: 'barn', icon: '🧸', level: 'A1', no: 'Barn og barnehage', uk: 'Діти й садок', en: 'Children and kindergarten', words: [
      ['en barnehage', 'дитячий садок', 'a kindergarten', '🧸'], ['en barnehagelærer', 'вихователь', 'a kindergarten teacher', '👩‍🏫'], ['ei avdeling', 'група (відділення)', 'a department, group', '🚪'],
      ['en bleie', 'підгузок', 'a nappy', '🍼'], ['en smokk', 'соска', 'a dummy', '👶'], ['en barnevogn', 'коляска', 'a pram', '🛒'],
      ['et leketøy', 'іграшка', 'a toy', '🧩'], ['ei dukke', 'лялька', 'a doll', '🪆'], ['en sandkasse', 'пісочниця', 'a sandpit', '🏖️'],
      ['ei huske', 'гойдалка', 'a swing', '🎠'], ['ei sklie', 'гірка', 'a slide', '🛝'], ['en matpakke', 'ланчбокс', 'a packed lunch', '🥪'],
      ['en tur', 'прогулянка', 'a walk, an outing', '🥾'], ['ei hviletid', 'тиха година', 'nap time', '😴'], ['en henting', 'забирання дитини', 'pick-up', '🚗'],
      ['ei levering', 'приведення дитини', 'drop-off', '🏃'], ['en foreldresamtale', 'розмова з батьками', 'a parent meeting', '🗣️'], ['et barnebidrag', 'аліменти', 'child support', '💸'],
      ['ei barnetrygd', 'допомога на дитину', 'child benefit', '🏦'], ['en vaksine', 'щеплення', 'a vaccine', '💉']
    ] },
    { id: 'bil', icon: '🚗', level: 'A2', no: 'Bil og trafikk', uk: 'Авто й дорога', en: 'Car and traffic', words: [
      ['et førerkort', 'водійські права', 'a driving licence', '🪪'], ['en bilnøkkel', 'ключ від авта', 'a car key', '🔑'], ['et ratt', 'кермо', 'a steering wheel', '🎡'],
      ['ei bremse', 'гальмо', 'a brake', '🛑'], ['et dekk', 'шина', 'a tyre', '🛞'], ['et piggdekk', 'шипована шина', 'a studded tyre', '❄️'],
      ['en bensin', 'бензин', 'petrol', '⛽'], ['ei lading', 'заряджання', 'charging', '🔌'], ['ei bompenge', 'плата за проїзд', 'a toll', '💳'],
      ['en fartsgrense', 'обмеження швидкості', 'a speed limit', '🚸'], ['ei fotoboks', 'камера швидкості', 'a speed camera', '📸'], ['et kryss', 'перехрестя', 'a crossroads', '➕'],
      ['en rundkjøring', 'кругова', 'a roundabout', '🔄'], ['et fotgjengerfelt', 'пішохідний перехід', 'a pedestrian crossing', '🚶'], ['ei kø', 'затор', 'a queue, a jam', '🚗'],
      ['en parkering', 'парковка', 'parking', '🅿️'], ['ei bot', 'штраф', 'a fine', '🧾'], ['et verksted', 'автосервіс', 'a garage, workshop', '🔧'],
      ['ei forsikring', 'страхування', 'insurance', '🛡️'], ['ei ulykke', 'аварія', 'an accident', '⚠️'], ['en glatt vei', 'слизька дорога', 'a slippery road', '🧊'],
      ['å rygge', 'здавати назад', 'to reverse', '↩️']
    ] },
    { id: 'post', icon: '📦', level: 'A2', no: 'Post og pakker', uk: 'Пошта й посилки', en: 'Post and parcels', words: [
      ['et postkontor', 'поштове відділення', 'a post office', '🏤'], ['en pakke', 'посилка', 'a parcel', '📦'], ['et brev', 'лист', 'a letter', '✉️'],
      ['en konvolutt', 'конверт', 'an envelope', '📨'], ['et frimerke', 'марка', 'a stamp', '🏷️'], ['ei adresse', 'адреса', 'an address', '🏠'],
      ['et postnummer', 'поштовий індекс', 'a postcode', '🔢'], ['en avsender', 'відправник', 'a sender', '📤'], ['en mottaker', 'одержувач', 'a recipient', '📥'],
      ['et sporingsnummer', 'номер відстеження', 'a tracking number', '🔍'], ['en hentefrist', 'термін отримання', 'a pick-up deadline', '⏰'], ['ei pakkeboks', 'поштомат', 'a parcel locker', '🗄️'],
      ['et postbud', 'листоноша', 'a postman', '🚶'], ['ei vekt', 'вага', 'weight', '⚖️'], ['ei forsendelse', 'відправлення', 'a shipment', '🚚'],
      ['en retur', 'повернення', 'a return', '↩️'], ['ei toll', 'мито', 'customs duty', '🛃'], ['å levere', 'здати, доставити', 'to deliver, hand in', '🤲'],
      ['å hente', 'забрати', 'to collect', '🙌'], ['å sende', 'відправити', 'to send', '📮']
    ] },
    { id: 'vinter2', icon: '⛷️', level: 'A2', no: 'Vinter og ski', uk: 'Зима й лижі', en: 'Winter and skiing', words: [
      ['ei ski', 'лижа', 'a ski', '🎿'], ['en skistav', 'лижна палиця', 'a ski pole', '🥢'], ['ei skiløype', 'лижня', 'a ski track', '〰️'],
      ['ei skøyte', 'ковзан', 'a skate', '⛸️'], ['ei akebrett', 'санчата (дощечка)', 'a sledge', '🛷'], ['en snømann', 'сніговик', 'a snowman', '⛄'],
      ['ei snøfille', 'сніжинка', 'a snowflake', '❄️'], ['et snøfall', 'снігопад', 'a snowfall', '🌨️'], ['ei brøyting', 'розчищення снігу', 'snow clearing', '🚜'],
      ['en måking', 'прибирання снігу лопатою', 'shovelling', '🧹'], ['ei strøing', 'посипання піском', 'gritting', '🧂'], ['ei kulde', 'холод', 'cold', '🥶'],
      ['ei frostrøyk', 'морозний туман', 'frost smoke', '🌫️'], ['et lag med ull', 'шар вовни', 'a layer of wool', '🧶'], ['ei votter', 'рукавиці', 'mittens', '🧤'],
      ['ei termos', 'термос', 'a thermos', '🍵'], ['ei kvikklunsj', 'шоколадка в похід', 'a hiking chocolate bar', '🍫'], ['ei vinterferie', 'зимові канікули', 'winter holiday', '🏔️'],
      ['ei hytte', 'хатина', 'a cabin', '🛖'], ['ei peis', 'камін', 'a fireplace', '🔥']
    ] },
    { id: 'matlaging', icon: '🍲', level: 'A2', no: 'Matlaging', uk: 'Готування', en: 'Cooking', words: [
      ['ei oppskrift', 'рецепт', 'a recipe', '📜'], ['en ingrediens', 'інгредієнт', 'an ingredient', '🧾'], ['ei skje', 'ложка (міра)', 'a spoonful', '🥄'],
      ['en kopp', 'чашка (міра)', 'a cup', '🥛'], ['et gram', 'грам', 'a gram', '⚖️'], ['ei steking', 'смаження', 'frying', '🍳'],
      ['ei koking', 'варіння', 'boiling', '🫕'], ['ei baking', 'випікання', 'baking', '🥐'], ['å skjære', 'різати', 'to cut', '🔪'],
      ['å røre', 'мішати', 'to stir', '🥣'], ['å smake', 'куштувати', 'to taste', '👅'], ['å krydre', 'приправляти', 'to season', '🧂'],
      ['et krydder', 'спеція', 'a spice', '🌶️'], ['ei mel', 'борошно', 'flour', '🌾'], ['et sukker', 'цукор', 'sugar', '🍬'],
      ['ei gjær', 'дріжджі', 'yeast', '🫧'], ['en deig', 'тісто', 'dough', '🥟'], ['ei stekeovn', 'духовка', 'an oven', '🔥'],
      ['en grad', 'градус', 'a degree', '🌡️'], ['ei rest', 'залишок їжі', 'leftovers', '🍱']
    ] },
    { id: 'digital', icon: '📱', level: 'B1', no: 'Digital hverdag', uk: 'Цифрові послуги', en: 'Digital everyday life', words: [
      ['ei innlogging', 'вхід у систему', 'a login', '🔐'], ['et passord', 'пароль', 'a password', '🔑'], ['ei elektronisk ID', 'електронна ID', 'an electronic ID', '🪪'],
      ['ei tofaktor', 'двофакторна перевірка', 'two-factor check', '🔒'], ['ei innboks', 'вхідні', 'an inbox', '📥'], ['et vedlegg', 'вкладення', 'an attachment', '📎'],
      ['ei skjema', 'форма, бланк', 'a form', '📝'], ['ei utfylling', 'заповнення', 'filling in', '✍️'], ['ei bekreftelse', 'підтвердження', 'a confirmation', '✅'],
      ['ei betalingsapp', 'застосунок для оплат', 'a payment app', '📲'], ['en nettbank', 'інтернет-банк', 'online banking', '🏦'], ['ei digital postkasse', 'цифрова поштова скринька', 'a digital mailbox', '📬'],
      ['ei timebestilling', 'запис на прийом', 'booking an appointment', '📅'], ['ei personvern', 'захист даних', 'privacy', '🛡️'], ['ei svindel', 'шахрайство', 'fraud', '🚨'],
      ['ei lenke', 'посилання', 'a link', '🔗'], ['ei nedlasting', 'завантаження', 'a download', '⬇️'], ['ei oppdatering', 'оновлення', 'an update', '🆕'],
      ['ei brukerstøtte', 'підтримка користувачів', 'user support', '🎧'], ['å logge ut', 'вийти', 'to log out', '🚪']
    ] },
    { id: 'sikkerhet', icon: '🚨', level: 'A2', no: 'Sikkerhet og nød', uk: 'Безпека й екстрені випадки', en: 'Safety and emergencies', words: [
      ['ei nødnummer', 'екстрений номер', 'an emergency number', '☎️'], ['ei brannvesen', 'пожежна служба', 'the fire service', '🚒'], ['et politi', 'поліція', 'the police', '👮'],
      ['ei ambulanse', 'швидка', 'an ambulance', '🚑'], ['en legevakt', 'невідкладна допомога', 'the emergency clinic', '🏥'], ['en brann', 'пожежа', 'a fire', '🔥'],
      ['en røykvarsler', 'димовий сповіщувач', 'a smoke alarm', '🔔'], ['et brannslukningsapparat', 'вогнегасник', 'a fire extinguisher', '🧯'], ['ei rømningsvei', 'шлях евакуації', 'an escape route', '🚪'],
      ['ei førstehjelp', 'перша допомога', 'first aid', '🩹'], ['ei skade', 'травма', 'an injury', '🤕'], ['ei fare', 'небезпека', 'danger', '⚠️'],
      ['ei advarsel', 'попередження', 'a warning', '📢'], ['ei redningsvest', 'рятувальний жилет', 'a life vest', '🦺'], ['en hjelm', 'шолом', 'a helmet', '⛑️'],
      ['ei refleks', 'світловідбивач', 'a reflector', '✨'], ['ei tyveri', 'крадіжка', 'a theft', '🥷'], ['ei anmeldelse', 'заява в поліцію', 'a police report', '📄'],
      ['å ringe 113', 'дзвонити 113', 'to call 113', '📞'], ['å passe på', 'пильнувати', 'to look after', '👀']
    ] },
    { id: 'foreldre', icon: '🎒', level: 'B1', no: 'Skole og foreldre', uk: 'Школа й батьки', en: 'School and parents', words: [
      ['et foreldremøte', 'батьківські збори', 'a parents’ meeting', '👨‍👩‍👧'], ['ei utviklingssamtale', 'розмова про успіхи учня', 'a progress talk', '🗣️'], ['en kontaktlærer', 'класний керівник', 'a form teacher', '👩‍🏫'],
      ['ei melding', 'повідомлення', 'a message', '💬'], ['et fravær', 'пропуски', 'absence', '📉'], ['ei permisjon', 'дозвіл на відсутність', 'leave of absence', '📝'],
      ['ei lekse', 'домашнє завдання', 'homework', '📚'], ['ei prøve', 'контрольна', 'a test', '🧪'], ['en karakter', 'оцінка', 'a grade', '🔢'],
      ['ei vurdering', 'оцінювання', 'an assessment', '⚖️'], ['ei skolefritidsordning', 'група продовженого дня (SFO)', 'after-school club', '🧸'], ['en skolebuss', 'шкільний автобус', 'a school bus', '🚌'],
      ['ei skolestart', 'початок навчального року', 'the start of school', '🍎'], ['ei mobbing', 'булінг', 'bullying', '🚫'], ['et skolemiljø', 'шкільне середовище', 'the school environment', '🏫'],
      ['ei dugnad', 'толока', 'voluntary work day', '🧹'], ['ei klassetur', 'поїздка класу', 'a class trip', '🚐'], ['ei leirskole', 'табір-школа', 'a camp school', '⛺'],
      ['en rådgiver', 'шкільний радник', 'a counsellor', '🧭'], ['ei spesialundervisning', 'спеціальне навчання', 'special education', '🤝']
    ] },
    { id: 'rettigheter', icon: '⚖️', level: 'B1', no: 'NAV og rettigheter', uk: 'NAV і права', en: 'NAV and rights', words: [
      ['ei ytelse', 'виплата', 'a benefit', '💶'], ['ei dagpenger', 'допомога з безробіття', 'unemployment benefit', '🧾'], ['ei sykepenger', 'лікарняні', 'sick pay', '🩺'],
      ['ei uføretrygd', 'пенсія з інвалідності', 'disability benefit', '♿'], ['ei alderspensjon', 'пенсія за віком', 'a retirement pension', '👵'], ['ei arbeidsavklaring', 'оцінка працездатності', 'work assessment', '📋'],
      ['ei saksbehandler', 'фахівець у справі', 'a caseworker', '🧑‍💼'], ['ei søknad', 'заява', 'an application', '📄'], ['ei klage', 'скарга', 'a complaint, appeal', '📣'],
      ['et vedtak', 'рішення', 'a decision', '🖋️'], ['ei frist', 'кінцевий термін', 'a deadline', '⏳'], ['ei dokumentasjon', 'документи-підтвердження', 'documentation', '🗂️'],
      ['ei rettighet', 'право', 'a right', '⚖️'], ['ei plikt', 'обов’язок', 'a duty', '📌'], ['ei meldekort', 'картка звітності NAV', 'a NAV report card', '🗓️'],
      ['ei aktivitetsplan', 'план активності', 'an activity plan', '🎯'], ['et tiltak', 'захід, програма', 'a measure, programme', '🛠️'], ['ei veiledning', 'консультація', 'guidance', '🧭'],
      ['ei bostøtte', 'допомога на житло', 'housing benefit', '🏠'], ['ei sosialhjelp', 'соціальна допомога', 'social assistance', '🤝']
    ] }
  );
})();
