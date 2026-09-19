/*
 * Граматика норвезької (bokmål): теми, правила й банк завдань.
 * rule — пояснення (uk/en/no); table — форми [норвезькою, uk, en]; examples — речення [no, uk, en].
 * items — завдання: [речення з «_», правильна відповідь, [хибні варіанти]].
 *   Підказка в дужках, напр. «(jeg)», є частиною речення. Усі завдання — лише норвезькою.
 * Нова тема: додайте об’єкт у GRAMMAR.topics — тести, гра й сторінка підхоплять її автоматично.
 */
window.GRAMMAR = {
  topics: [
    {
      id: 'pron-subj', level: 'A1', icon: '🙋',
      no: 'Personlige pronomen', uk: 'Особові займенники', en: 'Personal pronouns',
      rule: {
        uk: 'Займенник замінює іменник. Hun — про жінку чи дівчинку, han — про чоловіка чи хлопця, den/det — про речі (den для en/ei-слів, det для et-слів). Dere — «ви» (кілька людей), de — «вони». Увага: De [di] пишеться як «de», а «dem» — це «їх».',
        en: 'A pronoun replaces a noun. Hun is for a woman or girl, han for a man or boy, den/det for things (den for en/ei words, det for et words). Dere is “you” (several people), de is “they”.',
        no: 'Et pronomen erstatter et substantiv. Hun brukes om en kvinne eller jente, han om en mann eller gutt, den/det om ting (den for en/ei-ord, det for et-ord). Dere er flere personer du snakker til, de er flere personer du snakker om.'
      },
      table: [['jeg', 'я', 'I'], ['du', 'ти', 'you (one person)'], ['han', 'він', 'he'], ['hun', 'вона', 'she'], ['den / det', 'воно (про речі)', 'it'], ['vi', 'ми', 'we'], ['dere', 'ви (кілька людей)', 'you (several people)'], ['de', 'вони', 'they']],
      examples: [['Mia er sju år. Hun går på skolen.', 'Мії сім років. Вона ходить до школи.', 'Mia is seven. She goes to school.'], ['Leo og jeg er venner. Vi spiller fotball.', 'Лео і я — друзі. Ми граємо у футбол.', 'Leo and I are friends. We play football.'], ['Mamma og pappa er hjemme. De lager middag.', 'Мама й тато вдома. Вони готують обід.', 'Mum and Dad are at home. They are making dinner.']],
      items: [
        ['Mia er sju år. _ går på skolen.', 'Hun', ['Han', 'De', 'Vi']],
        ['Leo har en ball. _ spiller fotball.', 'Han', ['Hun', 'Dere', 'Det']],
        ['Mamma og pappa er hjemme. _ lager middag.', 'De', ['Vi', 'Hun', 'Dere']],
        ['Leo og jeg er venner. _ spiller sammen.', 'Vi', ['De', 'Dere', 'Han']],
        ['Hei, Nora og Mia! Hvor skal _ i dag?', 'dere', ['de', 'vi', 'hun']],
        ['Jeg har et hus. _ er stort.', 'Det', ['Den', 'Hun', 'De']],
        ['Jeg har en bil. _ er rød.', 'Den', ['Det', 'Han', 'De']],
        ['Bestemor er snill. _ baker boller.', 'Hun', ['Han', 'Den', 'Vi']],
        ['Humphrey kommer fra Kenya. _ bor i Oslo nå.', 'Han', ['Hun', 'De', 'Det']],
        ['Hva heter _? – Jeg heter Denys.', 'du', ['han', 'dere', 'hun']],
        ['Alina og Ruslan er fra Ukraina. _ lærer norsk.', 'De', ['Dere', 'Vi', 'Hun']],
        ['Hei! _ heter Maria.', 'Jeg', ['Hun', 'Du', 'Vi']]
      ]
    },
    {
      id: 'question-words', level: 'A1', icon: '❓',
      no: 'Spørreord', uk: 'Питальні слова', en: 'Question words',
      rule: {
        uk: 'Питальне слово стоїть на початку, одразу за ним — дієслово: «Hvor bor du?». Hva — що, hvem — хто, hvor — де/куди, når — коли, hvorfor — чому, hvordan — як, hvor mange — скільки.',
        en: 'The question word comes first and the verb right after it: “Hvor bor du?”. Hva — what, hvem — who, hvor — where, når — when, hvorfor — why, hvordan — how, hvor mange — how many.',
        no: 'Spørreordet står først, og verbet kommer rett etter: «Hvor bor du?».'
      },
      table: [['hva', 'що', 'what'], ['hvem', 'хто', 'who'], ['hvor', 'де, куди', 'where'], ['når', 'коли', 'when'], ['hvorfor', 'чому', 'why'], ['hvordan', 'як', 'how'], ['hvor mange', 'скільки (штук)', 'how many'], ['hvilken / hvilket', 'який', 'which']],
      examples: [['Hvor bor du? – Jeg bor i Bergen.', 'Де ти живеш? — Я живу в Бергені.', 'Where do you live? – I live in Bergen.'], ['Når begynner skolen?', 'Коли починається школа?', 'When does school start?']],
      items: [
        ['_ heter du? – Jeg heter Leo.', 'Hva', ['Hvem', 'Hvor', 'Når']],
        ['_ bor du? – Jeg bor i Oslo.', 'Hvor', ['Hva', 'Når', 'Hvem']],
        ['_ er det? – Det er Nora.', 'Hvem', ['Hva', 'Hvor', 'Hvordan']],
        ['_ begynner skolen? – Klokka åtte.', 'Når', ['Hvor', 'Hvem', 'Hvorfor']],
        ['_ har du det? – Bare bra, takk!', 'Hvordan', ['Hvorfor', 'Hva', 'Hvem']],
        ['_ er du trist? – Fordi katten er borte.', 'Hvorfor', ['Hvordan', 'Når', 'Hvor']],
        ['_ søsken har du? – Jeg har to brødre.', 'Hvor mange', ['Hvor', 'Hva', 'Hvordan']],
        ['_ koster melka? – Den koster tjue kroner.', 'Hva', ['Hvem', 'Når', 'Hvorfor']],
        ['_ kommer du fra? – Fra Ukraina.', 'Hvor', ['Hvem', 'Når', 'Hva']],
        ['_ buss går til sentrum? – Buss nummer 31.', 'Hvilken', ['Hvem', 'Hvordan', 'Hvorfor']]
      ]
    },
    {
      id: 'verb-present', level: 'A1', icon: '🏃',
      no: 'Verb i presens', uk: 'Дієслова: теперішній час', en: 'Verbs: present tense',
      rule: {
        uk: 'У теперішньому часі до інфінітива додаємо -r, і форма однакова для всіх осіб: jeg snakker, du snakker, de snakker. Неправильні: være → er, gjøre → gjør, si → sier, vite → vet, ha → har.',
        en: 'In the present tense add -r to the infinitive, and the form is the same for every person: jeg snakker, du snakker, de snakker. Irregular: være → er, gjøre → gjør, si → sier, vite → vet, ha → har.',
        no: 'I presens legger vi til -r på infinitiv, og formen er lik for alle personer. Uregelmessige: være → er, gjøre → gjør, si → sier, vite → vet.'
      },
      table: [['å snakke → snakker', 'говорити → говорю/говорить', 'speak → speak(s)'], ['å spise → spiser', 'їсти → їм/їсть', 'eat → eat(s)'], ['å bo → bor', 'жити → живу/живе', 'live → live(s)'], ['å være → er', 'бути → є', 'be → am/is/are'], ['å ha → har', 'мати → маю/має', 'have → have/has'], ['å gjøre → gjør', 'робити → роблю/робить', 'do → do/does']],
      examples: [['Jeg snakker litt norsk.', 'Я трохи розмовляю норвезькою.', 'I speak a little Norwegian.'], ['Vi bor i Norge.', 'Ми живемо в Норвегії.', 'We live in Norway.']],
      items: [
        ['Jeg _ norsk hver dag. (snakke)', 'snakker', ['snakke', 'snakket', 'snakk']],
        ['Mia _ frokost. (spise)', 'spiser', ['spise', 'spist', 'spiste']],
        ['Vi _ i Bergen. (bo)', 'bor', ['bo', 'bodde', 'boer']],
        ['Han _ lege. (være)', 'er', ['være', 'var', 'ere']],
        ['Du _ en fin sykkel. (ha)', 'har', ['ha', 'hadde', 'haer']],
        ['Hva _ du? (gjøre)', 'gjør', ['gjøre', 'gjører', 'gjorde']],
        ['De _ på bussen. (vente)', 'venter', ['vente', 'ventet', 'venta']],
        ['Nora _ en bok. (lese)', 'leser', ['lese', 'leste', 'leses']],
        ['Jeg _ ikke. (vite)', 'vet', ['vite', 'viter', 'visste']],
        ['Pappa _ «God morgen!». (si)', 'sier', ['si', 'sa', 'siier']],
        ['Leo _ til skolen. (gå)', 'går', ['gå', 'gikk', 'gåer']]
      ]
    },
    {
      id: 'modal', level: 'A1', icon: '🔑',
      no: 'Modalverb + infinitiv', uk: 'Модальні дієслова', en: 'Modal verbs',
      rule: {
        uk: 'Після kan, vil, skal, må, bør дієслово стоїть в інфінітиві без «å» і без -r: «Jeg kan snakke norsk», а не «kan snakker». Після інших дієслів (liker, begynner, prøver) — з «å»: «Jeg liker å lese».',
        en: 'After kan, vil, skal, må and bør the verb is in the infinitive without “å” and without -r: “Jeg kan snakke norsk”. After other verbs (liker, begynner, prøver) use “å”: “Jeg liker å lese”.',
        no: 'Etter kan, vil, skal, må og bør står verbet i infinitiv uten «å». Etter andre verb bruker vi «å»: «Jeg liker å lese».'
      },
      table: [['kan', 'можу, вмію', 'can'], ['vil', 'хочу', 'want to'], ['skal', 'буду, збираюся', 'shall, am going to'], ['må', 'мушу', 'must'], ['bør', 'слід, варто', 'should'], ['liker å + inf.', 'люблю (щось робити)', 'like to']],
      examples: [['Jeg kan snakke litt norsk.', 'Я можу трохи говорити норвезькою.', 'I can speak a little Norwegian.'], ['Vi skal reise til Tromsø.', 'Ми поїдемо до Тромсе.', 'We are going to travel to Tromsø.'], ['Jeg liker å lese.', 'Я люблю читати.', 'I like to read.']],
      items: [
        ['Jeg kan _ norsk. (snakke)', 'snakke', ['snakker', 'å snakke', 'snakket']],
        ['Vi må _ nå! (gå)', 'gå', ['går', 'å gå', 'gikk']],
        ['Vil du _ kaffe? (ha)', 'ha', ['har', 'å ha', 'hadde']],
        ['Leo skal _ fotball i dag. (spille)', 'spille', ['spiller', 'å spille', 'spilt']],
        ['Jeg liker _ bøker. (lese)', 'å lese', ['leser', 'lese', 'leste']],
        ['Du bør _ til legen. (gå)', 'gå', ['går', 'å gå', 'gått']],
        ['Mia begynner _ tegne.', 'å', ['og', 'at', 'for']],
        ['Kan du _ meg? (hjelpe)', 'hjelpe', ['hjelper', 'å hjelpe', 'hjalp']],
        ['Vi prøver _ norsk hver dag. (snakke)', 'å snakke', ['snakke', 'snakker', 'snakket']],
        ['Hun vil _ lege. (bli)', 'bli', ['blir', 'å bli', 'ble']]
      ]
    },
    {
      id: 'nouns', level: 'A1', icon: '📦',
      no: 'Substantiv: en, ei, et', uk: 'Іменники: en, ei, et', en: 'Nouns: en, ei, et',
      rule: {
        uk: 'Кожен іменник має рід: en (чоловічий), ei (жіночий, можна замінити на en), et (середній). Означена форма — артикль у кінці: en bil → bilen, ei bok → boka (boken), et hus → huset.',
        en: 'Every noun has a gender: en (masculine), ei (feminine, can be replaced by en) and et (neuter). The definite form puts the article at the end: en bil → bilen, ei bok → boka (boken), et hus → huset.',
        no: 'Alle substantiv har kjønn: en (hankjønn), ei (hunkjønn, kan også være en) og et (intetkjønn). Bestemt form: en bil → bilen, ei bok → boka, et hus → huset.'
      },
      table: [['en bil → bilen', 'машина → (ця) машина', 'a car → the car'], ['ei bok → boka', 'книжка → (ця) книжка', 'a book → the book'], ['et hus → huset', 'будинок → (цей) будинок', 'a house → the house'], ['en katt → katten', 'кіт → (цей) кіт', 'a cat → the cat'], ['et eple → eplet', 'яблуко → (це) яблуко', 'an apple → the apple']],
      examples: [['Jeg har en katt. Katten heter Pus.', 'У мене є кіт. Кота звати Пус.', 'I have a cat. The cat is called Pus.'], ['Vi bor i et hus. Huset er gult.', 'Ми живемо в будинку. Будинок жовтий.', 'We live in a house. The house is yellow.']],
      items: [
        ['Jeg har _ katt.', 'en', ['et', 'ei', 'den']],
        ['Vi bor i _ hus.', 'et', ['en', 'ei', 'det']],
        ['Mia spiser _ eple.', 'et', ['en', 'ei', 'den']],
        ['Leo har en hund. _ heter Max.', 'Hunden', ['Hundet', 'Hund', 'En hund']],
        ['Vi har et hus. _ er rødt.', 'Huset', ['Husen', 'Hus', 'Et hus']],
        ['Jeg leser ei bok. _ er spennende.', 'Boka', ['Boket', 'Bok', 'Ei bok']],
        ['Pappa kjøper _ bil.', 'en', ['et', 'det', 'den']],
        ['Har du _ billett?', 'en', ['et', 'ei', 'det']],
        ['Kan jeg få et glass melk? _ er kaldt.', 'Glasset', ['Glassen', 'Glass', 'Et glass']],
        ['Jeg bor i en leilighet. _ er liten.', 'Leiligheten', ['Leilighetet', 'Leilighet', 'En leilighet']]
      ]
    },
    {
      id: 'pron-obj', level: 'A2', icon: '🤝',
      no: 'Pronomen som objekt', uk: 'Займенники в знахідному відмінку', en: 'Object pronouns',
      rule: {
        uk: 'Коли займенник — не той, хто діє, а той, на кого спрямована дія, він змінюється: jeg → meg, du → deg, han → ham (han), hun → henne, vi → oss, dere → dere, de → dem. «Jeg ser henne», «Hun hjelper oss».',
        en: 'When a pronoun is the object of the action it changes form: jeg → meg, du → deg, han → ham (han), hun → henne, vi → oss, dere → dere, de → dem. “Jeg ser henne”, “Hun hjelper oss”.',
        no: 'Når pronomenet er objekt, bruker vi objektsform: meg, deg, ham, henne, oss, dere, dem.'
      },
      table: [['jeg → meg', 'я → мене, мені', 'I → me'], ['du → deg', 'ти → тебе, тобі', 'you → you'], ['han → ham', 'він → його, йому', 'he → him'], ['hun → henne', 'вона → її, їй', 'she → her'], ['vi → oss', 'ми → нас, нам', 'we → us'], ['dere → dere', 'ви → вас, вам', 'you → you (plural)'], ['de → dem', 'вони → їх, їм', 'they → them']],
      examples: [['Kan du hjelpe meg?', 'Можеш мені допомогти?', 'Can you help me?'], ['Vi ringer henne i kveld.', 'Ми подзвонимо їй увечері.', 'We will call her tonight.'], ['Bestemor besøker oss på søndag.', 'Бабуся відвідає нас у неділю.', 'Grandma is visiting us on Sunday.']],
      items: [
        ['Kan du hjelpe _? (jeg)', 'meg', ['jeg', 'min', 'oss']],
        ['Jeg elsker _, mamma! (du)', 'deg', ['du', 'din', 'dere']],
        ['Nora er her. Ser du _? (hun)', 'henne', ['hun', 'hennes', 'ham']],
        ['Leo ringer. Vil du snakke med _? (han)', 'ham', ['han', 'hans', 'henne']],
        ['Bestemor besøker _ i helga. (vi)', 'oss', ['vi', 'vår', 'dem']],
        ['Jeg ser dere! Ser dere _? (jeg)', 'meg', ['jeg', 'deg', 'oss']],
        ['Mia og Leo venter. Vi møter _ i parken. (de)', 'dem', ['de', 'deres', 'dere']],
        ['Læreren hjelper _ med leksene. (vi)', 'oss', ['vi', 'dem', 'vår']],
        ['Takk for at du inviterte _! (vi)', 'oss', ['vi', 'dere', 'våre']],
        ['Vi kommer til _ i morgen, Nora og Mia. (dere)', 'dere', ['de', 'dem', 'oss']],
        ['Pus er sulten. Kan du gi _ mat? (den)', 'den', ['det', 'dem', 'ham']]
      ]
    },
    {
      id: 'possessive', level: 'A2', icon: '🏠',
      no: 'Eiendomspronomen', uk: 'Присвійні займенники', en: 'Possessive pronouns',
      rule: {
        uk: 'Присвійний займенник узгоджується з предметом: min bil (en), mi bok (ei), mitt hus (et), mine bøker (множина). Так само din/di/ditt/dine, vår/vårt/våre. Hans, hennes, deres — не змінюються. Зазвичай стоїть після слова: «bilen min».',
        en: 'A possessive agrees with the thing owned: min bil (en), mi bok (ei), mitt hus (et), mine bøker (plural). The same for din/di/ditt/dine and vår/vårt/våre. Hans, hennes and deres never change. It usually comes after the noun: “bilen min”.',
        no: 'Eiendomspronomenet bøyes etter substantivet: min bil, mi bok, mitt hus, mine bøker. Hans, hennes og deres bøyes ikke. Vanligvis står det etter substantivet: «bilen min».'
      },
      table: [['min / mi / mitt / mine', 'мій, моя, моє, мої', 'my'], ['din / di / ditt / dine', 'твій, твоя, твоє, твої', 'your'], ['hans', 'його', 'his'], ['hennes', 'її', 'her'], ['vår / vårt / våre', 'наш, наше, наші', 'our'], ['deres', 'ваш; їхній', 'your (pl.); their']],
      examples: [['Dette er bilen min.', 'Це моя машина.', 'This is my car.'], ['Huset vårt er gult.', 'Наш будинок жовтий.', 'Our house is yellow.'], ['Hvor er skoene dine?', 'Де твої черевики?', 'Where are your shoes?']],
      items: [
        ['Dette er bilen _. (jeg)', 'min', ['mitt', 'mine', 'meg']],
        ['Dette er huset _. (jeg)', 'mitt', ['min', 'mine', 'meg']],
        ['Hvor er skoene _? (du)', 'dine', ['din', 'ditt', 'deg']],
        ['Nora leter etter katten _. (hun)', 'sin', ['hennes', 'hun', 'henne']],
        ['Huset _ er gult. (vi)', 'vårt', ['vår', 'våre', 'oss']],
        ['Barna _ går på skolen. (vi)', 'våre', ['vår', 'vårt', 'oss']],
        ['Er dette jakka _, Leo? (du)', 'di', ['ditt', 'dine', 'deg']],
        ['Mia er her. Sykkelen _ står ute. (hun)', 'hennes', ['hans', 'hun', 'henne']],
        ['Humphrey er glad. Datteren _ har bursdag. (han)', 'hans', ['hennes', 'ham', 'han']],
        ['Mamma og pappa selger bilen _. (de)', 'sin', ['deres', 'dem', 'de']],
        ['Er dette bøkene _, barn? (dere)', 'deres', ['dere', 'deg', 'dine']]
      ]
    },
    {
      id: 'verb-past', level: 'A2', icon: '⏪',
      no: 'Verb i preteritum', uk: 'Дієслова: минулий час', en: 'Verbs: past tense',
      rule: {
        uk: 'Минулий час (preteritum) — для завершених дій у минулому: «I går spiste jeg pizza». Правильні дієслова отримують -et, -te, -de або -dde: snakket, spiste, levde, bodde. Багато частих дієслів — неправильні: gå → gikk, se → så, være → var, ha → hadde, gjøre → gjorde, si → sa, komme → kom.',
        en: 'The past tense (preteritum) is for finished actions in the past: “I går spiste jeg pizza”. Regular verbs take -et, -te, -de or -dde: snakket, spiste, levde, bodde. Many common verbs are irregular: gå → gikk, se → så, være → var, ha → hadde, gjøre → gjorde, si → sa, komme → kom.',
        no: 'Preteritum brukes om noe som skjedde og er ferdig. Svake verb får -et, -te, -de eller -dde. Sterke verb endrer seg: gå → gikk, se → så, være → var.'
      },
      table: [['snakke → snakket', 'говорити → говорив', 'speak → spoke'], ['spise → spiste', 'їсти → їв', 'eat → ate'], ['bo → bodde', 'жити → жив', 'live → lived'], ['gå → gikk', 'іти → ішов', 'go → went'], ['være → var', 'бути → був', 'be → was'], ['ha → hadde', 'мати → мав', 'have → had'], ['se → så', 'бачити → бачив', 'see → saw'], ['komme → kom', 'приходити → прийшов', 'come → came']],
      examples: [['I går gikk vi på kino.', 'Учора ми ходили в кіно.', 'Yesterday we went to the cinema.'], ['Jeg bodde i Kyiv før.', 'Раніше я жив у Києві.', 'I lived in Kyiv before.']],
      items: [
        ['I går _ jeg pizza. (spise)', 'spiste', ['spiser', 'spist', 'spisa']],
        ['I går _ vi på kino. (gå)', 'gikk', ['går', 'gådde', 'gått']],
        ['Før _ jeg i Kyiv. (bo)', 'bodde', ['bor', 'boet', 'bott']],
        ['Det _ kaldt i går. (være)', 'var', ['er', 'været', 'vært']],
        ['Vi _ en elg i skogen i fjor. (se)', 'så', ['ser', 'sett', 'seet']],
        ['Leo _ for sent i dag tidlig. (komme)', 'kom', ['kommer', 'kommet', 'komte']],
        ['Mia _ med bestemor i telefonen. (snakke)', 'snakket', ['snakker', 'snakkte', 'snakk']],
        ['Hva _ du i helga? (gjøre)', 'gjorde', ['gjør', 'gjøret', 'gjort']],
        ['Vi _ ikke tid i går. (ha)', 'hadde', ['har', 'haet', 'hatt']],
        ['Hun _ «Hei!» og smilte. (si)', 'sa', ['sier', 'siet', 'sagt']],
        ['Jeg _ på bussen i ti minutter. (vente)', 'ventet', ['venter', 'ventte', 'vent']]
      ]
    },
    {
      id: 'adjective', level: 'A2', icon: '🎨',
      no: 'Adjektiv', uk: 'Прикметники', en: 'Adjectives',
      rule: {
        uk: 'Прикметник узгоджується з іменником: en stor bil, et stort hus (+t), store biler (+e у множині). В означеній формі завжди -e: den store bilen, det store huset. Деякі не змінюються: bra, gratis, moderne.',
        en: 'An adjective agrees with its noun: en stor bil, et stort hus (+t), store biler (+e in the plural). In the definite form it always takes -e: den store bilen, det store huset. Some never change: bra, gratis, moderne.',
        no: 'Adjektivet bøyes: en stor bil, et stort hus, store biler. I bestemt form får det alltid -e: den store bilen.'
      },
      table: [['en stor bil', 'велика машина', 'a big car'], ['et stort hus', 'великий будинок', 'a big house'], ['store biler', 'великі машини', 'big cars'], ['den store bilen', 'ця велика машина', 'the big car'], ['en fin dag / et fint vær', 'гарний день / гарна погода', 'a nice day / nice weather']],
      examples: [['Vi har et stort hus.', 'У нас великий будинок.', 'We have a big house.'], ['Den røde bilen er ny.', 'Ця червона машина нова.', 'The red car is new.']],
      items: [
        ['Vi har et _ hus. (stor)', 'stort', ['stor', 'store', 'storer']],
        ['Jeg har en _ bil. (rød)', 'rød', ['rødt', 'røde', 'røder']],
        ['De har tre _ barn. (liten)', 'små', ['liten', 'lite', 'litene']],
        ['Det er et _ eple. (grønn)', 'grønt', ['grønn', 'grønne', 'grønnt']],
        ['Den _ bilen er ny. (rød)', 'røde', ['rød', 'rødt', 'røder']],
        ['Vi har _ vær i dag. (fin)', 'fint', ['fin', 'fine', 'finn']],
        ['Mia har _ sko. (ny)', 'nye', ['ny', 'nytt', 'nyer']],
        ['Det _ huset ligger ved sjøen. (gammel)', 'gamle', ['gammel', 'gammelt', 'gamlet']],
        ['Kaffen er _. (varm)', 'varm', ['varmt', 'varme', 'varmer']],
        ['Vannet er _. (kald)', 'kaldt', ['kald', 'kalde', 'kaldet']],
        ['Nora er en _ jente. (glad)', 'glad', ['gladt', 'glade', 'gladd']]
      ]
    },
    {
      id: 'prepositions', level: 'A2', icon: '📍',
      no: 'Preposisjoner', uk: 'Прийменники', en: 'Prepositions',
      rule: {
        uk: 'I — всередині (i Norge, i Oslo, i huset), på — на поверхні та в багатьох місцях (på skolen, på jobb, på butikken, på kino), til — куди (til byen), fra — звідки (fra Ukraina), med — з кимось/чимось (med bussen), om — про (om morgenen — вранці).',
        en: 'I — inside (i Norge, i Oslo, i huset), på — on and at many places (på skolen, på jobb, på butikken, på kino), til — to (til byen), fra — from (fra Ukraina), med — with/by (med bussen), om — about (om morgenen — in the morning).',
        no: 'I brukes om land og byer, på om mange steder (skolen, jobb, butikken), til om retning, fra om hvor noe kommer fra, med om hvem eller hva man er sammen med.'
      },
      table: [['i Norge / i Bergen', 'в Норвегії / у Бергені', 'in Norway / in Bergen'], ['på skolen / på jobb', 'у школі / на роботі', 'at school / at work'], ['til butikken', 'до магазину', 'to the shop'], ['fra Ukraina', 'з України', 'from Ukraine'], ['med bussen', 'автобусом', 'by bus'], ['om morgenen', 'вранці', 'in the morning']],
      examples: [['Jeg kommer fra Ukraina, men bor i Norge.', 'Я з України, але живу в Норвегії.', 'I come from Ukraine, but I live in Norway.'], ['Vi reiser til Bergen med toget.', 'Ми їдемо до Бергена потягом.', 'We are travelling to Bergen by train.']],
      items: [
        ['Jeg bor _ Norge.', 'i', ['på', 'til', 'med']],
        ['Leo er _ skolen nå.', 'på', ['i', 'til', 'fra']],
        ['Denys kommer _ Ukraina.', 'fra', ['til', 'på', 'med']],
        ['Vi går _ butikken for å kjøpe melk.', 'til', ['fra', 'i', 'om']],
        ['Mamma reiser _ bussen.', 'med', ['på', 'til', 'fra']],
        ['Humphrey er _ jobb til klokka fire.', 'på', ['i', 'til', 'med']],
        ['Kaka står _ bordet.', 'på', ['i', 'til', 'fra']],
        ['Melka er _ kjøleskapet.', 'i', ['på', 'til', 'med']],
        ['Jeg drikker kaffe _ morgenen.', 'om', ['på', 'i', 'med']],
        ['Vi snakker _ været.', 'om', ['på', 'med', 'til']],
        ['Nora bor _ Oslo.', 'i', ['på', 'til', 'fra']]
      ]
    },
    {
      id: 'word-order', level: 'A2', icon: '🔀',
      no: 'Ordstilling (V2)', uk: 'Порядок слів (V2)', en: 'Word order (V2)',
      rule: {
        uk: 'У норвезькому розповідному реченні дієслово завжди стоїть на ДРУГОМУ місці. Якщо речення починається не з підмета (i dag, nå, i morgen), підмет переходить після дієслова: «Jeg går på jobb» → «I dag går jeg på jobb».',
        en: 'In a Norwegian statement the verb is always in SECOND place. If the sentence starts with something other than the subject (i dag, nå, i morgen), the subject moves after the verb: “Jeg går på jobb” → “I dag går jeg på jobb”.',
        no: 'Verbet står alltid på plass nummer to i en fortellende setning. Starter setningen med noe annet enn subjektet, kommer subjektet etter verbet: «I dag går jeg på jobb».'
      },
      table: [['Jeg spiser frokost nå.', 'Я зараз снідаю.', 'I am having breakfast now.'], ['Nå spiser jeg frokost.', 'Зараз я снідаю.', 'Now I am having breakfast.'], ['I morgen reiser vi.', 'Завтра ми їдемо.', 'Tomorrow we are leaving.'], ['Om vinteren er det kaldt.', 'Взимку холодно.', 'In winter it is cold.']],
      examples: [['I dag går jeg på jobb.', 'Сьогодні я йду на роботу.', 'Today I am going to work.'], ['Etter skolen spiller Leo fotball.', 'Після школи Лео грає у футбол.', 'After school Leo plays football.']],
      items: [
        ['I dag _ på jobb.', 'går jeg', ['jeg går', 'gå jeg', 'jeg gå']],
        ['Nå _ frokost.', 'spiser vi', ['vi spiser', 'spise vi', 'vi spise']],
        ['I morgen _ til Bergen.', 'reiser de', ['de reiser', 'reise de', 'de reise']],
        ['Etter skolen _ fotball.', 'spiller Leo', ['Leo spiller', 'spille Leo', 'Leo spille']],
        ['Om vinteren _ kaldt i Norge.', 'er det', ['det er', 'være det', 'det være']],
        ['Klokka åtte _ skolen.', 'begynner', ['begynne', 'å begynne', 'begynt']],
        ['I går _ en film.', 'så vi', ['vi så', 'se vi', 'vi ser']],
        ['På lørdag _ bestemor.', 'besøker vi', ['vi besøker', 'besøke vi', 'vi besøke']],
        ['Heldigvis _ tid.', 'har jeg', ['jeg har', 'ha jeg', 'jeg ha']],
        ['Hver morgen _ kaffe.', 'drikker mamma', ['mamma drikker', 'drikke mamma', 'mamma drikke']]
      ]
    },
    {
      id: 'conjunctions', level: 'B1', icon: '🔗',
      no: 'Konjunksjoner og subjunksjoner', uk: 'Сполучники', en: 'Conjunctions',
      rule: {
        uk: 'Og (і), men (але), eller (або), så (тож) з’єднують два рівноправні речення. Fordi (тому що), at (що), når (коли), hvis (якщо), selv om (хоча), mens (поки), før (перш ніж) починають підрядне речення — у ньому ikke стоїть ПЕРЕД дієсловом: «…fordi jeg ikke har tid».',
        en: 'Og (and), men (but), eller (or) and så (so) join two main clauses. Fordi (because), at (that), når (when), hvis (if), selv om (although), mens (while) and før (before) start a subordinate clause — there ikke comes BEFORE the verb: “…fordi jeg ikke har tid”.',
        no: 'Og, men, eller og så binder sammen helsetninger. Fordi, at, når, hvis, selv om og mens innleder leddsetninger — der står «ikke» foran verbet.'
      },
      table: [['og', 'і', 'and'], ['men', 'але', 'but'], ['eller', 'або', 'or'], ['fordi', 'тому що', 'because'], ['at', 'що', 'that'], ['når', 'коли', 'when'], ['hvis', 'якщо', 'if'], ['selv om', 'хоча', 'although']],
      examples: [['Jeg blir hjemme fordi jeg er syk.', 'Я лишаюся вдома, бо хворий.', 'I am staying home because I am ill.'], ['Han sier at han ikke har tid.', 'Він каже, що не має часу.', 'He says that he does not have time.']],
      items: [
        ['Jeg blir hjemme _ jeg er syk.', 'fordi', ['men', 'eller', 'hvis']],
        ['Hun er trøtt, _ hun må jobbe.', 'men', ['fordi', 'hvis', 'at']],
        ['Vil du ha te _ kaffe?', 'eller', ['men', 'at', 'fordi']],
        ['Vi går på tur _ det ikke regner.', 'hvis', ['men', 'eller', 'og']],
        ['Han sier _ han kommer i morgen.', 'at', ['om', 'men', 'hvis']],
        ['_ jeg var liten, bodde jeg i Lviv.', 'Da', ['Når', 'Hvis', 'At']],
        ['_ jeg kommer hjem, lager jeg middag.', 'Når', ['Da', 'At', 'Men']],
        ['Vi går ut, _ det er kaldt.', 'selv om', ['fordi', 'at', 'eller']],
        ['Jeg kommer ikke fordi jeg _ tid.', 'ikke har', ['har ikke', 'ikke ha', 'ha ikke']],
        ['Pappa lager mat _ barna ser på TV.', 'mens', ['men', 'at', 'eller']],
        ['Jeg var sulten, _ jeg spiste et eple.', 'så', ['fordi', 'at', 'hvis']]
      ]
    },
    {
      id: 'reflexive', level: 'B1', icon: '🪞',
      no: 'Sin / si / sitt / sine og refleksive verb', uk: 'Sin/si/sitt/sine та зворотні дієслова', en: 'Sin/si/sitt/sine and reflexive verbs',
      rule: {
        uk: 'Sin/si/sitt/sine — «свій»: коли власник — підмет у 3-й особі. «Kari ringer broren sin» (свого брата), але «Kari ringer broren hennes» (брата іншої жінки). Зворотні дієслова мають seg/meg/deg/oss: «Jeg gleder meg», «Vi setter oss».',
        en: 'Sin/si/sitt/sine means “one’s own” when the owner is the third-person subject: “Kari ringer broren sin” (her own brother), but “Kari ringer broren hennes” (another woman’s brother). Reflexive verbs take seg/meg/deg/oss: “Jeg gleder meg”, “Vi setter oss”.',
        no: 'Sin/si/sitt/sine viser tilbake til subjektet i tredje person. Refleksive verb: jeg gleder meg, du gleder deg, han gleder seg, vi gleder oss.'
      },
      table: [['Kari ringer broren sin.', 'Карі дзвонить своєму братові.', 'Kari calls her (own) brother.'], ['Kari ringer broren hennes.', 'Карі дзвонить її (іншої) братові.', 'Kari calls her (someone else’s) brother.'], ['jeg gleder meg', 'я радію, чекаю з нетерпінням', 'I look forward'], ['han setter seg', 'він сідає', 'he sits down'], ['vi skynder oss', 'ми поспішаємо', 'we hurry']],
      examples: [['Leo leter etter ballen sin.', 'Лео шукає свій м’яч.', 'Leo is looking for his ball.'], ['Vi gleder oss til ferien.', 'Ми з нетерпінням чекаємо відпустки.', 'We are looking forward to the holiday.']],
      items: [
        ['Leo leter etter ballen _. (Leos egen)', 'sin', ['hans', 'sitt', 'seg']],
        ['Mia vasker huset _. (Mias eget)', 'sitt', ['sin', 'hennes', 'sine']],
        ['Nora og Leo besøker bestemoren _. (deres egen)', 'sin', ['deres', 'sine', 'dem']],
        ['Humphrey snakker med barna _. (hans egne)', 'sine', ['sin', 'hans', 'sitt']],
        ['Leo er borte. Mia leter etter sykkelen _. (Leos)', 'hans', ['sin', 'seg', 'ham']],
        ['Jeg gleder _ til jul.', 'meg', ['seg', 'deg', 'min']],
        ['Vi må skynde _!', 'oss', ['seg', 'vi', 'vår']],
        ['Han setter _ ved bordet.', 'seg', ['ham', 'sin', 'han']],
        ['Gleder du _ til ferien?', 'deg', ['du', 'seg', 'din']],
        ['Barna kler på _ før de går ut.', 'seg', ['dem', 'sine', 'de']],
        ['Kari ringer til søsteren _. (Karis egen)', 'si', ['hennes', 'sin', 'sitt']]
      ]
    },
    {
      id: 'perfect', level: 'B1', icon: '✅',
      no: 'Perfektum', uk: 'Перфект (har + дієприкметник)', en: 'Present perfect',
      rule: {
        uk: 'Perfektum = har + перфектна форма. Уживається, коли результат важливий зараз або дія триває досі: «Jeg har bodd i Norge i to år». З точним минулим часом (i går, i 2020) — preteritum. Форми: snakket, spist, bodd, gått, vært, hatt, sett, kommet, gjort, sagt.',
        en: 'The present perfect is har + past participle. Use it when the result matters now or the action is still going on: “Jeg har bodd i Norge i to år”. With a specific past time (i går, i 2020) use the past tense. Forms: snakket, spist, bodd, gått, vært, hatt, sett, kommet, gjort, sagt.',
        no: 'Perfektum er har + perfektum partisipp. Vi bruker det når resultatet er viktig nå, eller handlingen fortsatt pågår.'
      },
      table: [['har snakket', 'говорив (уже)', 'have spoken'], ['har spist', 'поїв', 'have eaten'], ['har bodd', 'прожив', 'have lived'], ['har gått', 'пішов', 'have gone'], ['har vært', 'був', 'have been'], ['har sett', 'бачив', 'have seen'], ['har gjort', 'зробив', 'have done'], ['har sagt', 'сказав', 'have said']],
      examples: [['Jeg har bodd i Norge i to år.', 'Я живу в Норвегії вже два роки.', 'I have lived in Norway for two years.'], ['Har du vært i Tromsø?', 'Ти бував у Тромсе?', 'Have you been to Tromsø?']],
      items: [
        ['Jeg har _ i Norge i to år. (bo)', 'bodd', ['bodde', 'bor', 'boet']],
        ['Har du _ i Tromsø? (være)', 'vært', ['var', 'er', 'værte']],
        ['Vi har allerede _ middag. (spise)', 'spist', ['spiste', 'spiser', 'spiset']],
        ['Hun har _ på jobb. (gå)', 'gått', ['gikk', 'går', 'gådd']],
        ['Har dere _ nordlyset? (se)', 'sett', ['så', 'ser', 'seet']],
        ['Jeg har aldri _ det før. (gjøre)', 'gjort', ['gjorde', 'gjør', 'gjøret']],
        ['Hva har han _? (si)', 'sagt', ['sa', 'sier', 'siet']],
        ['Pakken har _. (komme)', 'kommet', ['kom', 'kommer', 'komt']],
        ['I går _ jeg på kino. (gå)', 'gikk', ['har gått', 'går', 'gått']],
        ['Vi har _ norsk i et halvt år. (lære)', 'lært', ['lærte', 'lærer', 'læret']],
        ['Har du _ billetten? (kjøpe)', 'kjøpt', ['kjøpte', 'kjøper', 'kjøpet']]
      ]
    },
    {
      id: 'passive', level: 'B2', icon: '🏗️',
      no: 'Passiv', uk: 'Пасивний стан', en: 'The passive',
      rule: {
        uk: 'Пасив показує, що з чимось відбувається дія. Bli + дієприкметник — для конкретної події: «Huset ble bygd i 1990». S-пасив — для правил і регулярних дій: «Butikken åpnes klokka ni», «Det snakkes norsk her». Після модальних: «Søknaden må sendes i dag».',
        en: 'The passive shows that something is done to the subject. Bli + participle for a specific event: “Huset ble bygd i 1990”. The s-passive for rules and regular actions: “Butikken åpnes klokka ni”, “Det snakkes norsk her”. After modals: “Søknaden må sendes i dag”.',
        no: 'Bli-passiv brukes om en konkret hendelse: «Huset ble bygd i 1990». S-passiv brukes om regler og vaner og etter modalverb: «Søknaden må sendes i dag».'
      },
      table: [['Huset ble bygd i 1990.', 'Будинок був збудований у 1990 році.', 'The house was built in 1990.'], ['Butikken åpnes klokka ni.', 'Магазин відкривається о дев’ятій.', 'The shop opens at nine.'], ['Søknaden må sendes i dag.', 'Заяву треба надіслати сьогодні.', 'The application must be sent today.'], ['Boka er skrevet av Ibsen.', 'Книжку написав Ібсен.', 'The book was written by Ibsen.']],
      examples: [['Det snakkes mange språk i Oslo.', 'В Осло розмовляють багатьма мовами.', 'Many languages are spoken in Oslo.'], ['Stillingen ble lyst ut i mars.', 'Вакансію оголосили в березні.', 'The position was advertised in March.']],
      items: [
        ['Huset ble _ i 1990. (bygge)', 'bygd', ['bygget seg', 'bygges', 'bygde']],
        ['Butikken _ klokka ni hver dag. (åpne)', 'åpnes', ['åpnet', 'ble åpnet', 'åpner seg']],
        ['Søknaden må _ innen fredag. (sende)', 'sendes', ['sendt', 'sender', 'sendte']],
        ['Det _ mange språk i Oslo. (snakke)', 'snakkes', ['snakket', 'snakker', 'blir snakke']],
        ['Vinduet ble _ av vinden. (knuse)', 'knust', ['knuses', 'knuste', 'knuser']],
        ['Møtet _ til neste uke. (flytte)', 'ble flyttet', ['flyttes seg', 'flyttet seg', 'har flytte']],
        ['Røyking er _ på bussen. (forby)', 'forbudt', ['forbyr', 'forbys', 'forbød']],
        ['Skjemaet skal _ med blokkbokstaver. (fylle ut)', 'fylles ut', ['fylt ut', 'fyller ut', 'fylte ut']],
        ['Boka er _ av en norsk forfatter. (skrive)', 'skrevet', ['skrives', 'skrev', 'skriver']],
        ['Stillingen ble _ i mars. (lyse ut)', 'lyst ut', ['lyses ut', 'lyser ut', 'lyste ut']]
      ]
    },
    {
      id: 'b2-connectors', level: 'B2', icon: '🧠',
      no: 'Formelle bindeord', uk: 'Зв’язки для текстів і дискусій', en: 'Formal linking words',
      rule: {
        uk: 'Для есе, листів і дискусій: derfor (тому), likevel (проте, все ж), dessuten (крім того), ettersom (оскільки), selv om (хоча), i motsetning til (на відміну від), på grunn av (через) + іменник, for å (щоб) + інфінітив. Після derfor/likevel/dessuten на початку — інверсія: «Derfor må vi…».',
        en: 'For essays, letters and debates: derfor (therefore), likevel (nevertheless), dessuten (moreover), ettersom (since), selv om (although), i motsetning til (unlike), på grunn av (because of) + noun, for å (in order to) + infinitive. Derfor/likevel/dessuten at the start trigger inversion: “Derfor må vi…”.',
        no: 'Bindeord gjør teksten tydelig: derfor, likevel, dessuten, ettersom, selv om, i motsetning til, på grunn av, for å. Etter derfor, likevel og dessuten først i setningen kommer verbet før subjektet.'
      },
      table: [['derfor', 'тому', 'therefore'], ['likevel', 'проте, все ж', 'nevertheless'], ['dessuten', 'крім того', 'moreover'], ['ettersom', 'оскільки', 'since, as'], ['på grunn av', 'через (щось)', 'because of'], ['for å', 'щоб', 'in order to'], ['i motsetning til', 'на відміну від', 'unlike']],
      examples: [['Det regnet. Likevel gikk vi på tur.', 'Ішов дощ. Проте ми пішли в похід.', 'It was raining. Nevertheless we went hiking.'], ['Toget var forsinket på grunn av snøen.', 'Потяг запізнився через сніг.', 'The train was delayed because of the snow.']],
      items: [
        ['Det regnet. _ gikk vi på tur.', 'Likevel', ['Derfor', 'Fordi', 'Ettersom']],
        ['Toget var forsinket _ snøen.', 'på grunn av', ['fordi', 'derfor', 'for å']],
        ['Hun jobber kveld _ tjene mer penger.', 'for å', ['fordi', 'på grunn av', 'derfor']],
        ['Leiligheten er billig. _ ligger den sentralt.', 'Dessuten', ['Likevel', 'Selv om', 'Fordi']],
        ['Jeg var syk. _ ble jeg hjemme.', 'Derfor', ['Likevel', 'Selv om', 'På grunn av']],
        ['_ norsk er vanskelig, liker jeg å lære det.', 'Selv om', ['Derfor', 'Dessuten', 'På grunn av']],
        ['_ de fleste land har Norge allemannsrett.', 'I motsetning til', ['På grunn av', 'Ettersom', 'Derfor']],
        ['_ bussen ikke kom, tok vi taxi.', 'Ettersom', ['Derfor', 'Likevel', 'Dessuten']],
        ['Derfor _ vi finne en løsning.', 'må', ['vi må', 'å må', 'måtte vi']],
        ['Prisene har økt. _ bruker folk mindre penger.', 'Derfor', ['Selv om', 'For å', 'I motsetning til']]
      ]
    }
  ]
};
