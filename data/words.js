/*
 * Тематичні слова для вивчення: [норвезькою (з артиклем для іменників), uk, en, emoji].
 * Нова тема — додайте об’єкт у WORDS.themes: сторінка «Слова», тести, картки й гра підхоплять її.
 */
window.WORDS = {
  themes: [
    { id: 'familie', icon: '👨‍👩‍👧', level: 'A1', no: 'Familien', uk: 'Сім’я', en: 'Family', words: [
      ['en mor', 'мати', 'a mother', '👩'], ['en far', 'батько', 'a father', '👨'], ['en bror', 'брат', 'a brother', '👦'], ['ei søster', 'сестра', 'a sister', '👧'],
      ['en sønn', 'син', 'a son', '👶'], ['ei datter', 'донька', 'a daughter', '👧'], ['en bestemor', 'бабуся', 'a grandmother', '👵'], ['en bestefar', 'дідусь', 'a grandfather', '👴'],
      ['en onkel', 'дядько', 'an uncle', '🧔'], ['ei tante', 'тітка', 'an aunt', '👩‍🦰'], ['en fetter', 'двоюрідний брат', 'a (male) cousin', '🧑'], ['ei kusine', 'двоюрідна сестра', 'a (female) cousin', '👩'],
      ['en mann', 'чоловік', 'a man, husband', '🤵'], ['ei kone', 'дружина', 'a wife', '👰'], ['et barn', 'дитина', 'a child', '🧒'], ['en baby', 'немовля', 'a baby', '👶'],
      ['foreldre', 'батьки', 'parents', '👪'], ['søsken', 'брати й сестри', 'siblings', '👫'], ['en kjæreste', 'кохана людина', 'a boyfriend, girlfriend', '💑'], ['et barnebarn', 'онук, онука', 'a grandchild', '🧒']
    ] },
    { id: 'farger', icon: '🎨', level: 'A1', no: 'Farger', uk: 'Кольори', en: 'Colours', words: [
      ['rød', 'червоний', 'red', '🟥'], ['blå', 'синій', 'blue', '🟦'], ['gul', 'жовтий', 'yellow', '🟨'], ['grønn', 'зелений', 'green', '🟩'],
      ['svart', 'чорний', 'black', '⬛'], ['hvit', 'білий', 'white', '⬜'], ['brun', 'коричневий', 'brown', '🟫'], ['oransje', 'помаранчевий', 'orange', '🟧'],
      ['lilla', 'фіолетовий', 'purple', '🟪'], ['rosa', 'розовий', 'pink', '🌸'], ['grå', 'сірий', 'grey', '🐘'], ['lyseblå', 'голубий', 'light blue', '🩵'],
      ['mørk', 'темний', 'dark', '🌑'], ['lys', 'світлий', 'light', '💡'], ['gull', 'золото', 'gold', '🥇'], ['sølv', 'срібло', 'silver', '🥈']
    ] },
    { id: 'klaer', icon: '👕', level: 'A1', no: 'Klær', uk: 'Одяг', en: 'Clothes', words: [
      ['ei jakke', 'куртка', 'a jacket', '🧥'], ['en genser', 'светр', 'a sweater', '🧶'], ['ei bukse', 'штани', 'trousers', '👖'], ['et skjørt', 'спідниця', 'a skirt', '👗'],
      ['en kjole', 'сукня', 'a dress', '👗'], ['en t-skjorte', 'футболка', 'a T-shirt', '👕'], ['ei skjorte', 'сорочка', 'a shirt', '👔'], ['en sko', 'черевик', 'a shoe', '👞'],
      ['en støvel', 'чобіт', 'a boot', '🥾'], ['en sokk', 'шкарпетка', 'a sock', '🧦'], ['ei lue', 'шапка', 'a woolly hat', '🧢'], ['et skjerf', 'шарф', 'a scarf', '🧣'],
      ['en vott', 'рукавиця', 'a mitten', '🧤'], ['en hatt', 'капелюх', 'a hat', '🎩'], ['en regnjakke', 'дощовик', 'a raincoat', '🌧️'], ['en pyjamas', 'піжама', 'pyjamas', '🛌'],
      ['en badedrakt', 'купальник', 'a swimsuit', '👙'], ['en sekk', 'рюкзак', 'a backpack', '🎒'], ['et belte', 'пасок', 'a belt', '🪢'], ['en bunad', 'бунад', 'a bunad', '🇳🇴']
    ] },
    { id: 'kropp', icon: '🧍', level: 'A1', no: 'Kroppen', uk: 'Тіло', en: 'The body', words: [
      ['et hode', 'голова', 'a head', '🙂'], ['et hår', 'волосся', 'hair', '💇'], ['et øye', 'око', 'an eye', '👁️'], ['et øre', 'вухо', 'an ear', '👂'],
      ['en nese', 'ніс', 'a nose', '👃'], ['en munn', 'рот', 'a mouth', '👄'], ['en tann', 'зуб', 'a tooth', '🦷'], ['en hals', 'горло, шия', 'a throat, neck', '🧣'],
      ['en arm', 'рука (від плеча)', 'an arm', '💪'], ['ei hånd', 'кисть руки', 'a hand', '✋'], ['en finger', 'палець', 'a finger', '☝️'], ['en mage', 'живіт', 'a stomach', '🤰'],
      ['en rygg', 'спина', 'a back', '🧍'], ['et bein', 'нога', 'a leg', '🦵'], ['en fot', 'стопа', 'a foot', '🦶'], ['et kne', 'коліно', 'a knee', '🦵'],
      ['et hjerte', 'серце', 'a heart', '❤️'], ['et ansikt', 'обличчя', 'a face', '😊']
    ] },
    { id: 'mat', icon: '🍽️', level: 'A1', no: 'Mat og drikke', uk: 'Їжа й напої', en: 'Food and drink', words: [
      ['et brød', 'хліб', 'bread', '🍞'], ['en ost', 'сир', 'cheese', '🧀'], ['ei pølse', 'сосиска', 'a sausage', '🌭'], ['et egg', 'яйце', 'an egg', '🥚'],
      ['en fisk', 'риба', 'a fish', '🐟'], ['et kjøtt', 'м’ясо', 'meat', '🥩'], ['en kylling', 'курка', 'chicken', '🍗'], ['en pizza', 'піца', 'a pizza', '🍕'],
      ['en suppe', 'суп', 'soup', '🍲'], ['en ris', 'рис', 'rice', '🍚'], ['en pasta', 'макарони', 'pasta', '🍝'], ['ei kake', 'торт', 'a cake', '🎂'],
      ['en is', 'морозиво', 'an ice cream', '🍦'], ['et smør', 'масло', 'butter', '🧈'], ['en melk', 'молоко', 'milk', '🥛'], ['en kaffe', 'кава', 'coffee', '☕'],
      ['en te', 'чай', 'tea', '🍵'], ['en juice', 'сік', 'juice', '🧃'], ['et vann', 'вода', 'water', '💧'], ['en sjokolade', 'шоколад', 'chocolate', '🍫'],
      ['en vaffel', 'вафля', 'a waffle', '🧇'], ['en frokost', 'сніданок', 'breakfast', '🥣'], ['en lunsj', 'обід (ланч)', 'lunch', '🥪'], ['en middag', 'обід/вечеря', 'dinner', '🍽️']
    ] },
    { id: 'frukt', icon: '🍎', level: 'A1', no: 'Frukt og grønnsaker', uk: 'Фрукти й овочі', en: 'Fruit and vegetables', words: [
      ['et eple', 'яблуко', 'an apple', '🍎'], ['en banan', 'банан', 'a banana', '🍌'], ['en appelsin', 'апельсин', 'an orange', '🍊'], ['ei pære', 'груша', 'a pear', '🍐'],
      ['en drue', 'виноградина', 'a grape', '🍇'], ['et jordbær', 'полуниця', 'a strawberry', '🍓'], ['et blåbær', 'чорниця', 'a blueberry', '🫐'], ['en sitron', 'лимон', 'a lemon', '🍋'],
      ['en melon', 'диня', 'a melon', '🍈'], ['en ananas', 'ананас', 'a pineapple', '🍍'], ['en gulrot', 'морква', 'a carrot', '🥕'], ['en potet', 'картоплина', 'a potato', '🥔'],
      ['en tomat', 'помідор', 'a tomato', '🍅'], ['en agurk', 'огірок', 'a cucumber', '🥒'], ['en løk', 'цибуля', 'an onion', '🧅'], ['en paprika', 'перець', 'a pepper', '🫑'],
      ['en sopp', 'гриб', 'a mushroom', '🍄'], ['en mais', 'кукурудза', 'corn', '🌽'], ['en brokkoli', 'броколі', 'broccoli', '🥦'], ['en salat', 'салат', 'lettuce, salad', '🥬']
    ] },
    { id: 'dyr', icon: '🐾', level: 'A1', no: 'Dyr', uk: 'Тварини', en: 'Animals', words: [
      ['en hund', 'собака', 'a dog', '🐕'], ['en katt', 'кіт', 'a cat', '🐈'], ['en hest', 'кінь', 'a horse', '🐴'], ['ei ku', 'корова', 'a cow', '🐄'],
      ['en gris', 'свиня', 'a pig', '🐖'], ['en sau', 'вівця', 'a sheep', '🐑'], ['ei geit', 'коза', 'a goat', '🐐'], ['ei høne', 'курка', 'a hen', '🐔'],
      ['en fugl', 'птах', 'a bird', '🐦'], ['en fisk', 'риба', 'a fish', '🐟'], ['en mus', 'миша', 'a mouse', '🐭'], ['en kanin', 'кролик', 'a rabbit', '🐰'],
      ['en elg', 'лось', 'a moose', '🫎'], ['en bjørn', 'ведмідь', 'a bear', '🐻'], ['en ulv', 'вовк', 'a wolf', '🐺'], ['en rev', 'лис', 'a fox', '🦊'],
      ['et reinsdyr', 'північний олень', 'a reindeer', '🦌'], ['en hval', 'кит', 'a whale', '🐋'], ['en sel', 'тюлень', 'a seal', '🦭'], ['en ugle', 'сова', 'an owl', '🦉'],
      ['en løve', 'лев', 'a lion', '🦁'], ['en elefant', 'слон', 'an elephant', '🐘'], ['en slange', 'змія', 'a snake', '🐍'], ['en sommerfugl', 'метелик', 'a butterfly', '🦋']
    ] },
    { id: 'hjem', icon: '🏠', level: 'A1', no: 'Hjemme', uk: 'Дім', en: 'At home', words: [
      ['et hus', 'будинок', 'a house', '🏠'], ['en leilighet', 'квартира', 'a flat', '🏢'], ['et rom', 'кімната', 'a room', '🚪'], ['et kjøkken', 'кухня', 'a kitchen', '🍳'],
      ['en stue', 'вітальня', 'a living room', '🛋️'], ['et soverom', 'спальня', 'a bedroom', '🛏️'], ['et bad', 'ванна кімната', 'a bathroom', '🛁'], ['en dør', 'двері', 'a door', '🚪'],
      ['et vindu', 'вікно', 'a window', '🪟'], ['et bord', 'стіл', 'a table', '🪑'], ['en stol', 'стілець', 'a chair', '🪑'], ['en seng', 'ліжко', 'a bed', '🛏️'],
      ['en sofa', 'диван', 'a sofa', '🛋️'], ['en lampe', 'лампа', 'a lamp', '💡'], ['et kjøleskap', 'холодильник', 'a fridge', '🧊'], ['en komfyr', 'плита', 'a cooker', '🔥'],
      ['en dusj', 'душ', 'a shower', '🚿'], ['et toalett', 'туалет', 'a toilet', '🚽'], ['en nøkkel', 'ключ', 'a key', '🔑'], ['en hage', 'сад', 'a garden', '🌷']
    ] },
    { id: 'skole', icon: '🏫', level: 'A1', no: 'Skolen', uk: 'Школа', en: 'School', words: [
      ['en lærer', 'учитель', 'a teacher', '🧑‍🏫'], ['en elev', 'учень', 'a pupil', '🧑‍🎓'], ['et klasserom', 'клас', 'a classroom', '🏫'], ['ei tavle', 'дошка', 'a board', '🟩'],
      ['ei bok', 'книжка', 'a book', '📖'], ['en blyant', 'олівець', 'a pencil', '✏️'], ['en penn', 'ручка', 'a pen', '🖊️'], ['et viskelær', 'гумка', 'an eraser', '🧽'],
      ['en linjal', 'лінійка', 'a ruler', '📏'], ['ei saks', 'ножиці', 'scissors', '✂️'], ['en sekk', 'рюкзак', 'a school bag', '🎒'], ['en pult', 'парта', 'a desk', '🪑'],
      ['et friminutt', 'перерва', 'a break', '⚽'], ['en lekse', 'домашнє завдання', 'homework', '📝'], ['en prøve', 'контрольна', 'a test', '📄'], ['matte', 'математика', 'maths', '➗'],
      ['norsk', 'норвезька мова', 'Norwegian (subject)', '🇳🇴'], ['gym', 'фізкультура', 'PE', '🤸'], ['en datamaskin', 'комп’ютер', 'a computer', '💻'], ['en timeplan', 'розклад', 'a timetable', '🗓️']
    ] },
    { id: 'tid', icon: '📅', level: 'A1', no: 'Dager og måneder', uk: 'Дні та місяці', en: 'Days and months', words: [
      ['mandag', 'понеділок', 'Monday', '1️⃣'], ['tirsdag', 'вівторок', 'Tuesday', '2️⃣'], ['onsdag', 'середа', 'Wednesday', '3️⃣'], ['torsdag', 'четвер', 'Thursday', '4️⃣'],
      ['fredag', 'пʼятниця', 'Friday', '5️⃣'], ['lørdag', 'субота', 'Saturday', '6️⃣'], ['søndag', 'неділя', 'Sunday', '7️⃣'], ['januar', 'січень', 'January', '❄️'],
      ['februar', 'лютий', 'February', '⛄'], ['mars', 'березень', 'March', '🌱'], ['april', 'квітень', 'April', '🌷'], ['mai', 'травень', 'May', '🇳🇴'],
      ['juni', 'червень', 'June', '☀️'], ['juli', 'липень', 'July', '🏖️'], ['august', 'серпень', 'August', '🌻'], ['september', 'вересень', 'September', '🍂'],
      ['oktober', 'жовтень', 'October', '🎃'], ['november', 'листопад', 'November', '🌧️'], ['desember', 'грудень', 'December', '🎄'], ['i dag', 'сьогодні', 'today', '📍'],
      ['i går', 'учора', 'yesterday', '⬅️'], ['i morgen', 'завтра', 'tomorrow', '➡️'], ['ei uke', 'тиждень', 'a week', '🗓️'], ['et år', 'рік', 'a year', '🎆']
    ] },
    { id: 'vaer', icon: '🌦️', level: 'A1', no: 'Været og årstider', uk: 'Погода й пори року', en: 'Weather and seasons', words: [
      ['sol', 'сонце', 'sun', '☀️'], ['regn', 'дощ', 'rain', '🌧️'], ['snø', 'сніг', 'snow', '❄️'], ['vind', 'вітер', 'wind', '💨'],
      ['tåke', 'туман', 'fog', '🌫️'], ['torden', 'грім', 'thunder', '⛈️'], ['et lyn', 'блискавка', 'lightning', '⚡'], ['en regnbue', 'веселка', 'a rainbow', '🌈'],
      ['en skye', 'хмара', 'a cloud', '☁️'], ['varm', 'теплий', 'warm', '🥵'], ['kald', 'холодний', 'cold', '🥶'], ['våt', 'мокрий', 'wet', '💦'],
      ['vinter', 'зима', 'winter', '⛄'], ['vår', 'весна', 'spring', '🌷'], ['sommer', 'літо', 'summer', '🌞'], ['høst', 'осінь', 'autumn', '🍁'],
      ['en grad', 'градус', 'a degree', '🌡️'], ['is', 'лід', 'ice', '🧊'], ['nordlys', 'північне сяйво', 'northern lights', '🌌'], ['en storm', 'шторм', 'a storm', '🌪️']
    ] },
    { id: 'folelser', icon: '😊', level: 'A2', no: 'Følelser', uk: 'Почуття', en: 'Feelings', words: [
      ['glad', 'радий', 'happy', '😊'], ['lei seg', 'засмучений', 'sad', '😢'], ['sint', 'злий', 'angry', '😠'], ['redd', 'наляканий', 'scared', '😨'],
      ['trøtt', 'втомлений', 'tired', '😴'], ['sulten', 'голодний', 'hungry', '🤤'], ['tørst', 'спраглий', 'thirsty', '🥤'], ['syk', 'хворий', 'ill', '🤒'],
      ['nervøs', 'нервовий', 'nervous', '😬'], ['stolt', 'гордий', 'proud', '🦚'], ['overrasket', 'здивований', 'surprised', '😮'], ['forelsket', 'закоханий', 'in love', '😍'],
      ['flau', 'присоромлений', 'embarrassed', '😳'], ['kjedelig', 'нудно', 'boring', '🥱'], ['spent', 'схвильований (в очікуванні)', 'excited', '🤩'], ['rolig', 'спокійний', 'calm', '😌'],
      ['bekymret', 'стурбований', 'worried', '😟'], ['fornøyd', 'задоволений', 'satisfied', '🙂'], ['ensom', 'самотній', 'lonely', '🥺'], ['sjalu', 'ревнивий', 'jealous', '😒']
    ] },
    { id: 'byen', icon: '🚌', level: 'A2', no: 'Byen og transport', uk: 'Місто й транспорт', en: 'Town and transport', words: [
      ['en buss', 'автобус', 'a bus', '🚌'], ['en trikk', 'трамвай', 'a tram', '🚋'], ['et tog', 'потяг', 'a train', '🚆'], ['en T-bane', 'метро', 'an underground train', '🚇'],
      ['en bil', 'машина', 'a car', '🚗'], ['en sykkel', 'велосипед', 'a bicycle', '🚲'], ['et fly', 'літак', 'a plane', '✈️'], ['en båt', 'човен', 'a boat', '⛵'],
      ['en ferje', 'пором', 'a ferry', '⛴️'], ['en drosje', 'таксі', 'a taxi', '🚕'], ['en gate', 'вулиця', 'a street', '🛣️'], ['et lyskryss', 'світлофор', 'traffic lights', '🚦'],
      ['en butikk', 'магазин', 'a shop', '🏪'], ['et apotek', 'аптека', 'a pharmacy', '💊'], ['et sykehus', 'лікарня', 'a hospital', '🏥'], ['en bank', 'банк', 'a bank', '🏦'],
      ['en kirke', 'церква', 'a church', '⛪'], ['en park', 'парк', 'a park', '🌳'], ['en kafé', 'кафе', 'a café', '☕'], ['et bibliotek', 'бібліотека', 'a library', '📚'],
      ['en holdeplass', 'зупинка', 'a stop', '🚏'], ['en billett', 'квиток', 'a ticket', '🎫'], ['en stasjon', 'станція, вокзал', 'a station', '🚉'], ['en flyplass', 'аеропорт', 'an airport', '🛫']
    ] },
    { id: 'yrker', icon: '👩‍⚕️', level: 'A2', no: 'Yrker', uk: 'Професії', en: 'Jobs', words: [
      ['en lege', 'лікар', 'a doctor', '👩‍⚕️'], ['en sykepleier', 'медсестра, медбрат', 'a nurse', '🧑‍⚕️'], ['en lærer', 'учитель', 'a teacher', '🧑‍🏫'], ['en kokk', 'кухар', 'a cook', '🧑‍🍳'],
      ['en politi', 'поліцейський', 'a police officer', '👮'], ['en brannmann', 'пожежник', 'a firefighter', '🧑‍🚒'], ['en bonde', 'фермер', 'a farmer', '🧑‍🌾'], ['en snekker', 'тесля', 'a carpenter', '🪚'],
      ['en elektriker', 'електрик', 'an electrician', '🔌'], ['en frisør', 'перукар', 'a hairdresser', '💇'], ['en sjåfør', 'водій', 'a driver', '🚚'], ['en pilot', 'пілот', 'a pilot', '🧑‍✈️'],
      ['en ingeniør', 'інженер', 'an engineer', '👷'], ['en advokat', 'адвокат', 'a lawyer', '⚖️'], ['en tannlege', 'стоматолог', 'a dentist', '🦷'], ['en kasserer', 'касир', 'a cashier', '🧾'],
      ['en rørlegger', 'сантехнік', 'a plumber', '🔧'], ['en renholder', 'прибиральник', 'a cleaner', '🧹'], ['en programmerer', 'програміст', 'a programmer', '👩‍💻'], ['en journalist', 'журналіст', 'a journalist', '📰']
    ] },
    { id: 'natur', icon: '🏔️', level: 'A2', no: 'Naturen', uk: 'Природа', en: 'Nature', words: [
      ['et fjell', 'гора', 'a mountain', '⛰️'], ['en fjord', 'фйорд', 'a fjord', '🏞️'], ['en skog', 'ліс', 'a forest', '🌲'], ['et tre', 'дерево', 'a tree', '🌳'],
      ['en blomst', 'квітка', 'a flower', '🌼'], ['et gress', 'трава', 'grass', '🌿'], ['en innsjø', 'озеро', 'a lake', '🏞️'], ['ei elv', 'річка', 'a river', '🌊'],
      ['et hav', 'океан, море', 'a sea', '🌊'], ['en strand', 'пляж', 'a beach', '🏖️'], ['ei øy', 'острів', 'an island', '🏝️'], ['en foss', 'водоспад', 'a waterfall', '💦'],
      ['en stein', 'камінь', 'a stone', '🪨'], ['en isbre', 'льодовик', 'a glacier', '🧊'], ['en himmel', 'небо', 'a sky', '🌤️'], ['en stjerne', 'зірка', 'a star', '⭐'],
      ['en måne', 'місяць', 'a moon', '🌙'], ['et bær', 'ягода', 'a berry', '🫐'], ['en sti', 'стежка', 'a path', '🥾'], ['en hytte', 'дачний будиночок', 'a cabin', '🛖']
    ] },
    { id: 'fritid', icon: '⚽', level: 'A2', no: 'Fritid og sport', uk: 'Дозвілля й спорт', en: 'Free time and sport', words: [
      ['fotball', 'футбол', 'football', '⚽'], ['ski', 'лижі', 'skiing', '⛷️'], ['skøyter', 'ковзани', 'skating', '⛸️'], ['svømming', 'плавання', 'swimming', '🏊'],
      ['håndball', 'гандбол', 'handball', '🤾'], ['sykling', 'велоспорт', 'cycling', '🚴'], ['løping', 'біг', 'running', '🏃'], ['dans', 'танці', 'dancing', '💃'],
      ['musikk', 'музика', 'music', '🎵'], ['en gitar', 'гітара', 'a guitar', '🎸'], ['et piano', 'піаніно', 'a piano', '🎹'], ['en film', 'фільм', 'a film', '🎬'],
      ['et spill', 'гра', 'a game', '🎮'], ['en tur', 'похід, прогулянка', 'a trip, walk', '🥾'], ['fisking', 'риболовля', 'fishing', '🎣'], ['tegning', 'малювання', 'drawing', '🎨'],
      ['lesing', 'читання', 'reading', '📚'], ['et bursdagsselskap', 'день народження (вечірка)', 'a birthday party', '🎉'], ['en konsert', 'концерт', 'a concert', '🎤'], ['en ferie', 'відпустка, канікули', 'a holiday', '🧳']
    ] },
    { id: 'helse', icon: '🩺', level: 'B1', no: 'Helse', uk: 'Здоров’я', en: 'Health', words: [
      ['vondt', 'боляче', 'painful, it hurts', '🤕'], ['feber', 'температура, гарячка', 'fever', '🌡️'], ['hoste', 'кашель', 'a cough', '😷'], ['en forkjølelse', 'застуда', 'a cold', '🤧'],
      ['hodepine', 'головний біль', 'a headache', '🤯'], ['en medisin', 'ліки', 'medicine', '💊'], ['en resept', 'рецепт', 'a prescription', '📋'], ['en time', 'запис (до лікаря)', 'an appointment', '🕒'],
      ['en fastlege', 'сімейний лікар', 'a GP', '👩‍⚕️'], ['en legevakt', 'невідкладна допомога', 'an emergency clinic', '🚑'], ['en allergi', 'алергія', 'an allergy', '🌼'], ['et plaster', 'пластир', 'a plaster', '🩹'],
      ['en sprøyte', 'укол', 'an injection', '💉'], ['sykmeldt', 'на лікарняному', 'on sick leave', '🛌'], ['frisk', 'здоровий', 'healthy, well', '💪'], ['en tannlege', 'стоматолог', 'a dentist', '🦷'],
      ['blodtrykk', 'тиск', 'blood pressure', '🩸'], ['en ambulanse', 'швидка', 'an ambulance', '🚑'], ['svimmel', 'запаморочення', 'dizzy', '😵'], ['brukket', 'зламаний', 'broken', '🦴']
    ] },
    { id: 'verb', icon: '🏃', level: 'A1', no: 'Hverdagsverb', uk: 'Дієслова на кожен день', en: 'Everyday verbs', words: [
      ['å spise', 'їсти', 'to eat', '🍽️'], ['å drikke', 'пити', 'to drink', '🥤'], ['å sove', 'спати', 'to sleep', '😴'], ['å gå', 'іти', 'to walk, go', '🚶'],
      ['å løpe', 'бігти', 'to run', '🏃'], ['å lese', 'читати', 'to read', '📖'], ['å skrive', 'писати', 'to write', '✍️'], ['å snakke', 'говорити', 'to speak', '🗣️'],
      ['å høre', 'чути, слухати', 'to hear', '👂'], ['å se', 'бачити', 'to see', '👀'], ['å kjøpe', 'купувати', 'to buy', '🛒'], ['å lage mat', 'готувати їжу', 'to cook', '🍳'],
      ['å vaske', 'мити', 'to wash', '🧼'], ['å jobbe', 'працювати', 'to work', '💼'], ['å leke', 'гратися', 'to play', '🧸'], ['å synge', 'співати', 'to sing', '🎤'],
      ['å danse', 'танцювати', 'to dance', '💃'], ['å svømme', 'плавати', 'to swim', '🏊'], ['å kjøre', 'їхати, керувати', 'to drive', '🚗'], ['å ringe', 'дзвонити', 'to call', '📞'],
      ['å åpne', 'відчиняти', 'to open', '🔓'], ['å lukke', 'зачиняти', 'to close', '🔒'], ['å hjelpe', 'допомагати', 'to help', '🤝'], ['å lære', 'вчити(ся)', 'to learn', '🧠']
    ] },
    { id: 'adjektiv', icon: '↔️', level: 'A2', no: 'Motsetninger', uk: 'Протилежності', en: 'Opposites', words: [
      ['stor', 'великий', 'big', '🐘'], ['liten', 'маленький', 'small', '🐭'], ['lang', 'довгий', 'long', '🦒'], ['kort', 'короткий', 'short', '✂️'],
      ['ny', 'новий', 'new', '✨'], ['gammel', 'старий', 'old', '🏚️'], ['ung', 'молодий', 'young', '👶'], ['rask', 'швидкий', 'fast', '🐆'],
      ['treg', 'повільний', 'slow', '🐢'], ['tung', 'важкий', 'heavy', '🏋️'], ['lett', 'легкий', 'light, easy', '🪶'], ['varm', 'гарячий, теплий', 'warm', '🔥'],
      ['kald', 'холодний', 'cold', '🧊'], ['dyr', 'дорогий', 'expensive', '💎'], ['billig', 'дешевий', 'cheap', '🏷️'], ['full', 'повний', 'full', '🥛'],
      ['tom', 'порожній', 'empty', '🫙'], ['ren', 'чистий', 'clean', '🧼'], ['skitten', 'брудний', 'dirty', '🐷'], ['vanskelig', 'складний', 'difficult', '🧩']
    ] }
  ]
};
