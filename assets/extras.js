/* Комікс·Lab — рейтинг гравців, сторінка «Допомога» та QR-блок «Відкрий на телефоні».
   Сервера немає: рейтинг рахується з даних цього пристрою (акаунти + ігри «Гра разом», проведені або зіграні тут). */
(() => {
  'use strict';
  const SITE = 'https://bilohash.com/comiks/';
  const HIST = 'comiks.gameHistory';

  const EX = {
    uk: {
      nav: 'Рейтинг', module: ['🏆', 'Рейтинг', 'гравці, переможці й учні'],
      r_global: '🌍 Загальний рейтинг', r_global_d: 'Залогінені гравці, які відкрили свій профіль. Натисни на гравця — побачиш його профіль, значки й результати.', view_profile: 'Переглянути профіль', find_players: '🔎 Шукати гравців',
      r_title: '🏆 Рейтинг і гравці', r_intro: 'Хто найкраще знає норвезьку? Тут — переможці «Гри разом» і учні з акаунтами на цьому пристрої.',
      r_local: '💾 Рейтинг зберігається на цьому пристрої (у браузері). Ігри потрапляють сюди, коли ти ведеш кімнату або граєш у ній.',
      r_players: '🎮 Гравці «Гри разом»', r_students: '👩‍🎓 Учні на цьому пристрої', r_recent: '🕹️ Останні ігри',
      th_rank: '#', th_player: 'Гравець', th_games: 'Ігор', th_wins: '🥇 Перемог', th_points: 'Бали', th_acc: 'Точність', th_speed: 'Сер. час',
      th_student: 'Учень', th_stars: '⭐ Зірки', th_tests: 'Тестів', th_days: 'Днів навчання', th_score: 'Рахунок',
      no_games: 'Ще немає ігор. Створи кімнату в «Гра разом» — і тут з’являться переможці!', play: '🎮 Грати разом', guest: 'Гість (без акаунта)',
      no_students: 'Зареєструйся, щоб потрапити в рейтинг учнів.', register: '✍️ Реєстрація', clear: '🗑️ Очистити історію ігор', clear_q: 'Видалити історію ігор на цьому пристрої?',
      score_hint: 'Рахунок = зірки × 10 + пройдені тести × 5 + дні навчання × 3 + ігри × 2.', you: 'ти', players_n: n => `${n} гравц.`,
      qr_title: '📱 Відкрий Комікс·Lab на телефоні', qr_text: 'Скануй QR-код камерою телефона — сайт відкриється одразу. Зручно для уроку: покажи код на екрані, і всі учні зайдуть за секунду.', qr_copy: '📋 Копіювати посилання', qr_copied: 'Скопійовано ✓', qr_share: '📤 Поділитися',
      help_title: '❓ Допомога: як користуватися Комікс·Lab', help_intro: 'Комікс·Lab — безкоштовний тренажер норвезької мови для дітей і дорослих. Тут усе пояснено коротко: з чого почати, як читати, тестуватися й грати разом.',
      quick: '🚀 Швидкий старт за 5 кроків', faq: '💬 Часті питання', sections: '🧭 Розділи сайту', open: 'Відкрити →',
      steps: [
        ['🔤', 'Вивчи алфавіт і звуки', 'Літери, голосні, дзвінкі й глухі, склади та звукосполучення (kj, skj, hv…).', '#/alphabet'],
        ['📚', 'Прочитай перший комікс A1', 'Слухай кожен кадр, наводь на слова — побачиш переклад українською та англійською.', '#/'],
        ['🧩', 'Пройди тест до коміксу', 'Усі тести норвезькою. 3 зірки — тема засвоєна.', '#/tests'],
        ['📐', 'Розберися з граматикою', 'Займенники hun, han, vi, oss, dere, de; дієслова; порядок слів — із таблицями й тестами.', '#/grammar'],
        ['🗺️', 'Склади план і грай разом', 'План розкладе навчання по тижнях, а «Гра разом» перетворить повторення на змагання.', '#/plan']
      ],
      areas: [
        ['📚', 'Комікси', 'Історії рівнів A1–B2 з живим озвученням. Фільтри за рівнем, темою й статусом. «Озвучити кадр», «Увесь комікс», вимова через мікрофон, рольова гра.', '#/'],
        ['🖱️', 'Переклад при наведенні', 'Уся навчальна мова — норвезька. Наведи на репліку чи слово (на телефоні — торкнись слова) — підказка покаже українську й англійську. Працює і в тестах, і в грі.', null],
        ['📐', 'Граматика', 'Правила з таблицями й прикладами: особові й присвійні займенники, дієслова в теперішньому й минулому часі, модальні дієслова, en/ei/et, прикметники, прийменники, порядок слів V2, сполучники, пасив. Після кожної теми — тест.', '#/grammar'],
        ['🔤', 'Алфавіт і звуки', '29 літер, голосні, дзвінкі й глухі приголосні, дифтонги, звукосполучення, німі літери, довгі й короткі голосні, конструктор складів.', '#/alphabet'],
        ['🔢', 'Числа й годинник', 'Числа від 0 до 1000 із конструктором; «Hva er klokka?» — як норвежці називають час (halv ni = 8:30).', '#/numbers'],
        ['🧮', 'Математика', 'Таблиця множення з картинками, тренажер (+ − × ÷) і космічна гра «Math Rocket». Кожен приклад читається норвезькою: «tre ganger fire er tolv».', '#/math'],
        ['🇬🇧', 'Англійська', 'Окремий курс в іншому стилі коміксу: 8 історій, британські голоси, тести англійською, 400+ слів за темами з позначкою «Знаю».', '#/english'],
        ['🧩', 'Тести', 'Тести до кожного коміксу, рівнів A1–B2, граматики, алфавіту, чисел і годинника. Для дітей — 10 питань і 3 варіанти, для дорослих — 14 і 4.', '#/tests'],
        ['🎮', 'Гра разом', 'Кімнати з QR-кодом для класу чи друзів. Ведучий обирає тему (або «🎲 Випадкова кімната»), учасники відповідають на телефонах на час. Питання чесні для всіх — без імен персонажів: відповідь видно на малюнку чи чути в озвученні. На телефоні гра займає весь екран.', '#/game'],
        ['🏆', 'Рейтинг', 'Переможці ігор і учні з акаунтами на цьому пристрої: бали, перемоги, точність і швидкість.', '#/rating'],
        ['🗺️', 'План навчання', 'Обери стартовий рівень, мету й темп — план розкладе комікси, граматику й тести по тижнях і сам відмічатиме виконане.', '#/plan'],
        ['🃏', 'Картки й «Пари»', 'Картки слів з інтервальним повторенням і гра на пам’ять «слово — переклад».', '#/cards'],
        ['👤', 'Акаунт і налаштування', 'Акаунт із паролем (за замовчуванням 12345), email — за бажанням. У налаштуваннях: режим «Дитина / Дорослий», голос, швидкість, рівень за замовчуванням.', '#/settings']
      ],
      faqs: [
        ['Хто такі гравці онлайн — Emma, Jonas, Magnus…?', 'Частина суперників — віртуальні гравці для тренування: вони завжди онлайн, мають різну складність і власні костюми. Вони допомагають грати й змагатися навіть тоді, коли друзів немає в мережі. Справжні гравці — це ті, кого ти додав у друзі за кодом або QR.'],
        ['Це безкоштовно?', 'Так. Реєстрація не обов’язкова — прогрес гостя теж зберігається в браузері.'],
        ['Чому тести тільки норвезькою?', 'Щоб звикати думати норвезькою. Переклад будь-якого слова з’являється при наведенні або торканні.'],
        ['Не чути голосу — що робити?', 'Перевір звук і беззвучний режим телефона, увімкни записані голоси в налаштуваннях. Найкраще працюють Edge і Chrome.'],
        ['Як провести гру в класі?', 'Відкрий «Гра разом» на комп’ютері з проєктором, створи кімнату й покажи QR-код. Учні сканують код телефонами й вводять ім’я. Не став галочку «Я теж граю» — тоді бачиш рейтинг і швидкість відповідей.'],
        ['Учні не знають історію — це нечесно?', 'Ні. У грі за замовчуванням лише питання, які можна розв’язати без знання сюжету: слова на слух, картинки, граматика, годинник, числа. Питань «хто це сказав» за іменами в грі немає: замість них показується намальований кадр, а відповідь видно на малюнку.'],
        ['Де зберігаються мої дані?', 'Лише в цьому браузері на цьому пристрої. Паролі й записи голосу нікуди не надсилаються. Тому й рейтинг — локальний.'],
        ['Хто створив історії й малюнки?', 'Усі історії, персонажі, малюнки й переклади вигадані та створені за допомогою штучного інтелекту й можуть містити неточності.']
      ]
    },
    en: {
      nav: 'Ranking', module: ['🏆', 'Ranking', 'players, winners and students'],
      r_global: '🌍 Global ranking', r_global_d: 'Logged-in players with a public profile. Tap a player to see their profile, badges and results.', view_profile: 'View profile', find_players: '🔎 Find players',
      r_title: '🏆 Ranking and players', r_intro: 'Who knows Norwegian best? Here are the winners of “Play together” and the students with accounts on this device.',
      r_local: '💾 The ranking is stored on this device (in the browser). Games appear here when you host a room or play in one.',
      r_players: '🎮 “Play together” players', r_students: '👩‍🎓 Students on this device', r_recent: '🕹️ Recent games',
      th_rank: '#', th_player: 'Player', th_games: 'Games', th_wins: '🥇 Wins', th_points: 'Points', th_acc: 'Accuracy', th_speed: 'Avg time',
      th_student: 'Student', th_stars: '⭐ Stars', th_tests: 'Tests', th_days: 'Study days', th_score: 'Score',
      no_games: 'No games yet. Create a room in “Play together” and the winners will show up here!', play: '🎮 Play together', guest: 'Guest (no account)',
      no_students: 'Sign up to appear in the student ranking.', register: '✍️ Sign up', clear: '🗑️ Clear game history', clear_q: 'Delete the game history on this device?',
      score_hint: 'Score = stars × 10 + tests passed × 5 + study days × 3 + games × 2.', you: 'you', players_n: n => `${n} players`,
      qr_title: '📱 Open Komiks·Lab on your phone', qr_text: 'Scan the QR code with your phone camera and the site opens at once. Great for lessons: show the code on the screen and every student is in within seconds.', qr_copy: '📋 Copy link', qr_copied: 'Copied ✓', qr_share: '📤 Share',
      help_title: '❓ Help: how to use Komiks·Lab', help_intro: 'Komiks·Lab is a free Norwegian trainer for children and adults. Everything is explained briefly here: where to start, how to read, take tests and play together.',
      quick: '🚀 Quick start in 5 steps', faq: '💬 FAQ', sections: '🧭 Site sections', open: 'Open →',
      steps: [
        ['🔤', 'Learn the alphabet and sounds', 'Letters, vowels, voiced and voiceless consonants, syllables and letter combinations (kj, skj, hv…).', '#/alphabet'],
        ['📚', 'Read your first A1 comic', 'Listen to every panel and hover over words to see Ukrainian and English translations.', '#/'],
        ['🧩', 'Take the comic test', 'All tests are in Norwegian. 3 stars means you have mastered it.', '#/tests'],
        ['📐', 'Get the grammar right', 'Pronouns hun, han, vi, oss, dere, de; verbs; word order — with tables and tests.', '#/grammar'],
        ['🗺️', 'Make a plan and play together', 'The plan spreads your learning over weeks, and “Play together” turns revision into a competition.', '#/plan']
      ],
      areas: [
        ['📚', 'Comics', 'A1–B2 stories with real voices. Filters by level, topic and status. “Read panel aloud”, “Whole comic”, pronunciation with the microphone, role play.', '#/'],
        ['🖱️', 'Translation on hover', 'The learning language is Norwegian. Hover over a line or word (tap a word on a phone) — the tooltip shows Ukrainian and English. It also works in tests and games.', null],
        ['📐', 'Grammar', 'Rules with tables and examples: personal and possessive pronouns, present and past tense, modal verbs, en/ei/et, adjectives, prepositions, V2 word order, conjunctions, the passive. Each topic ends with a test.', '#/grammar'],
        ['🔤', 'Alphabet and sounds', '29 letters, vowels, voiced and voiceless consonants, diphthongs, letter combinations, silent letters, long and short vowels, a syllable builder.', '#/alphabet'],
        ['🔢', 'Numbers and the clock', 'Numbers from 0 to 1000 with a builder; “Hva er klokka?” — how Norwegians tell the time (halv ni = 8:30).', '#/numbers'],
        ['🧮', 'Maths', 'Times tables with pictures, a trainer (+ − × ÷) and the space game “Math Rocket”. Every sum is read aloud in Norwegian.', '#/math'],
        ['🇬🇧', 'English', 'A separate course in a different comic style: 8 stories, British voices, tests in English and 400+ words by topic.', '#/english'],
        ['🧩', 'Tests', 'Tests for every comic, levels A1–B2, grammar, alphabet, numbers and the clock. Children get 10 questions with 3 options, adults 14 with 4.', '#/tests'],
        ['🎮', 'Play together', 'QR-code rooms for classes or friends. The host picks a topic (or “🎲 Random room”) and players answer on their phones against the clock. Questions are fair — no character names: the answer is visible in the picture or audible. On a phone the game fills the whole screen.', '#/game'],
        ['🏆', 'Ranking', 'Game winners and students with accounts on this device: points, wins, accuracy and speed.', '#/rating'],
        ['🗺️', 'Study plan', 'Choose your starting level, goal and pace — the plan spreads comics, grammar and tests over weeks and ticks off what you finish.', '#/plan'],
        ['🃏', 'Flashcards and Pairs', 'Spaced-repetition word cards and a memory game matching words and translations.', '#/cards'],
        ['👤', 'Account and settings', 'An account with a password (default 12345), email optional. Settings: Child / Adult mode, voice, speed and default level.', '#/settings']
      ],
      faqs: [
        ['Who are the online players — Emma, Jonas, Magnus…?', 'Some opponents are virtual practice players: always online, with different difficulty levels and their own costumes. They let you play and compete even when your friends are offline. Real players are the ones you added as friends by code or QR.'],
        ['Is it free?', 'Yes. Signing up is optional — guest progress is saved in the browser too.'],
        ['Why are the tests only in Norwegian?', 'To help you think in Norwegian. The translation of any word appears on hover or tap.'],
        ['I can’t hear the voice — what now?', 'Check the volume and your phone’s silent mode, and enable the recorded voices in Settings. Edge and Chrome work best.'],
        ['How do I run a game in class?', 'Open “Play together” on a computer with a projector, create a room and show the QR code. Students scan it and enter their names. Leave “I am playing too” unticked to watch the ranking and answer speed.'],
        ['Students don’t know the story — is that unfair?', 'No. By default the game only asks questions that can be solved without knowing the plot: words by ear, pictures, grammar, the clock and numbers. There are no “who said this” questions with names: instead a drawn panel is shown and the answer is visible in the picture.'],
        ['Where is my data stored?', 'Only in this browser on this device. Passwords and voice recordings are never sent anywhere. That is why the ranking is local too.'],
        ['Who made the stories and pictures?', 'All stories, characters, drawings and translations are invented and created with artificial intelligence and may contain mistakes.']
      ]
    },
    no: {
      nav: 'Rangering', module: ['🏆', 'Rangering', 'spillere, vinnere og elever'],
      r_global: '🌍 Toppliste for alle', r_global_d: 'Innloggede spillere med åpen profil. Trykk på en spiller for å se profil, merker og resultater.', view_profile: 'Se profilen', find_players: '🔎 Finn spillere',
      r_title: '🏆 Rangering og spillere', r_intro: 'Hvem kan mest norsk? Her er vinnerne av «Spill sammen» og elevene med konto på denne enheten.',
      r_local: '💾 Rangeringen lagres på denne enheten (i nettleseren). Spill kommer hit når du leder et rom eller spiller i det.',
      r_players: '🎮 Spillere i «Spill sammen»', r_students: '👩‍🎓 Elever på denne enheten', r_recent: '🕹️ Siste spill',
      th_rank: '#', th_player: 'Spiller', th_games: 'Spill', th_wins: '🥇 Seire', th_points: 'Poeng', th_acc: 'Treff', th_speed: 'Snitt-tid',
      th_student: 'Elev', th_stars: '⭐ Stjerner', th_tests: 'Tester', th_days: 'Dager', th_score: 'Sum',
      no_games: 'Ingen spill ennå. Lag et rom i «Spill sammen», så dukker vinnerne opp her!', play: '🎮 Spill sammen', guest: 'Gjest (uten konto)',
      no_students: 'Registrer deg for å komme med på elevlisten.', register: '✍️ Registrer deg', clear: '🗑️ Slett spillhistorikken', clear_q: 'Slette spillhistorikken på denne enheten?',
      score_hint: 'Sum = stjerner × 10 + tester × 5 + dager × 3 + spill × 2.', you: 'deg', players_n: n => `${n} spillere`,
      qr_title: '📱 Åpne Komiks·Lab på mobilen', qr_text: 'Skann QR-koden med mobilkameraet, så åpnes siden med en gang. Fint i timen: vis koden på skjermen, så er alle inne på sekunder.', qr_copy: '📋 Kopier lenken', qr_copied: 'Kopiert ✓', qr_share: '📤 Del',
      help_title: '❓ Hjelp: slik bruker du Komiks·Lab', help_intro: 'Komiks·Lab er en gratis norsktrener for barn og voksne. Her står kort hvordan du starter, leser, tar tester og spiller sammen.',
      quick: '🚀 Kom i gang på 5 steg', faq: '💬 Ofte stilte spørsmål', sections: '🧭 Delene av nettstedet', open: 'Åpne →',
      steps: [
        ['🔤', 'Lær alfabetet og lydene', 'Bokstaver, vokaler, stemte og ustemte konsonanter, stavelser og lydkombinasjoner (kj, skj, hv …).', '#/alphabet'],
        ['📚', 'Les den første A1-serien', 'Lytt til hver rute og hold over ordene for å se oversettelsen.', '#/'],
        ['🧩', 'Ta testen til serien', 'Alle tester er på norsk. 3 stjerner betyr at du kan det.', '#/tests'],
        ['📐', 'Lær grammatikken', 'Pronomen hun, han, vi, oss, dere, de; verb; ordstilling — med tabeller og tester.', '#/grammar'],
        ['🗺️', 'Lag en plan og spill sammen', 'Planen fordeler læringen på uker, og «Spill sammen» gjør repetisjon til konkurranse.', '#/plan']
      ],
      areas: [
        ['📚', 'Tegneserier', 'Historier på nivå A1–B2 med ekte stemmer, filtre, opplesning, uttale med mikrofon og rollespill.', '#/'],
        ['🖱️', 'Oversettelse', 'Hold over en replikk eller et ord (trykk på mobil) — du ser ukrainsk og engelsk. Det virker også i tester og spill.', null],
        ['📐', 'Grammatikk', 'Regler med tabeller og eksempler: pronomen, verb i presens og preteritum, modalverb, en/ei/et, adjektiv, preposisjoner, V2, konjunksjoner og passiv. Test etter hvert tema.', '#/grammar'],
        ['🔤', 'Alfabet og lyder', '29 bokstaver, vokaler, stemte og ustemte konsonanter, diftonger, lydkombinasjoner, stumme bokstaver og stavelser.', '#/alphabet'],
        ['🔢', 'Tall og klokka', 'Tall fra 0 til 1000 og «Hva er klokka?» (halv ni = 8:30).', '#/numbers'],
        ['🧮', 'Matte', 'Gangetabellen med bilder, trening og romspillet «Matte-raketten». Hvert regnestykke leses på norsk.', '#/math'],
        ['🇬🇧', 'Engelsk', 'Et eget kurs i en annen tegneseriestil med tester på engelsk.', '#/english'],
        ['🧩', 'Tester', 'Tester for hver serie, nivåene A1–B2, grammatikk, alfabet, tall og klokka.', '#/tests'],
        ['🎮', 'Spill sammen', 'Rom med QR-kode for klassen. Spillederen velger tema (eller «🎲 Tilfeldig rom»), og alle svarer på mobilen. Ingen navn på figurer: svaret ser du på bildet. På mobilen fyller spillet hele skjermen.', '#/game'],
        ['🏆', 'Rangering', 'Vinnere og elever på denne enheten: poeng, seire, treff og fart.', '#/rating'],
        ['🗺️', 'Læringsplan', 'Velg nivå, mål og tempo — planen fordeler serier, grammatikk og tester på uker.', '#/plan'],
        ['🃏', 'Ordkort og Par', 'Ordkort med repetisjon og et huskespill.', '#/cards'],
        ['👤', 'Konto og innstillinger', 'Konto med passord (standard 12345), valgfri e-post. Barn / Voksen, stemme, fart og standardnivå.', '#/settings']
      ],
      faqs: [
        ['Hvem er spillerne på nett – Emma, Jonas, Magnus …?', 'Noen av motstanderne er virtuelle øvingsspillere: alltid pålogget, med ulik vanskelighetsgrad og egne kostymer. De gjør at du kan spille og konkurrere selv når vennene dine ikke er pålogget. Ekte spillere er de du har lagt til som venner med kode eller QR.'],
        ['Er det gratis?', 'Ja. Du trenger ikke konto — fremgangen lagres i nettleseren.'],
        ['Hvorfor er testene bare på norsk?', 'For at du skal venne deg til å tenke på norsk. Hold over et ord for å se oversettelsen.'],
        ['Jeg hører ikke stemmen?', 'Sjekk lyden og lydløs modus, og slå på innspilte stemmer i innstillingene. Edge og Chrome fungerer best.'],
        ['Hvordan spiller vi i klassen?', 'Åpne «Spill sammen» på storskjermen, lag et rom og vis QR-koden. Elevene skanner og skriver navnet sitt.'],
        ['Elevene kjenner ikke historien?', 'Spillet bruker som standard bare spørsmål som kan løses uten å kjenne handlingen. Det finnes ingen spørsmål med navn: svaret ser du alltid på bildet.'],
        ['Hvor lagres dataene mine?', 'Bare i denne nettleseren. Derfor er også rangeringen lokal.'],
        ['Hvem har laget historiene?', 'Alt er laget med kunstig intelligens og kan inneholde feil.']
      ]
    }
  };
  EX.ar = {
    nav: 'التصنيف', module: ['🏆', 'التصنيف', 'اللاعبون والفائزون والتلاميذ'],
    r_global: '🌍 التصنيف العام', r_global_d: 'لاعبون مسجّلون بملف شخصي عام. اضغط على لاعب لترى ملفه وأوسمته ونتائجه.', view_profile: 'عرض الملف', find_players: '🔎 ابحث عن لاعبين',
    r_title: '🏆 التصنيف واللاعبون', r_intro: 'من يعرف النرويجية أفضل؟ هنا الفائزون في «العبوا معًا» والتلاميذ الذين لديهم حسابات.',
    r_local: '💾 يُحفظ التصنيف على هذا الجهاز. تظهر الألعاب هنا عندما تنشئ غرفة أو تلعب فيها.',
    r_players: '🎮 لاعبو «العبوا معًا»', r_students: '👩‍🎓 التلاميذ على هذا الجهاز', r_recent: '🕹️ آخر الألعاب',
    th_rank: '#', th_player: 'اللاعب', th_games: 'الألعاب', th_wins: '🥇 الانتصارات', th_points: 'النقاط', th_acc: 'الدقة', th_speed: 'متوسط الوقت',
    th_student: 'التلميذ', th_stars: '⭐ النجوم', th_tests: 'الاختبارات', th_days: 'أيام التعلّم', th_score: 'النتيجة',
    no_games: 'لا توجد ألعاب بعد. أنشئ غرفة في «العبوا معًا» وسيظهر الفائزون هنا!', play: '🎮 العبوا معًا', guest: 'زائر (بلا حساب)',
    no_students: 'سجّل لتظهر في تصنيف التلاميذ.', register: '✍️ إنشاء حساب', clear: '🗑️ امسح سجل الألعاب', clear_q: 'حذف سجل الألعاب على هذا الجهاز؟',
    score_hint: 'النتيجة = النجوم × 10 + الاختبارات × 5 + أيام التعلّم × 3 + الألعاب × 2.', you: 'أنت', players_n: n => `${n} لاعب`,
    qr_title: '📱 افتح Komiks·Lab على هاتفك', qr_text: 'امسح رمز QR بكاميرا الهاتف ويفتح الموقع فورًا. رائع للدروس: اعرض الرمز على الشاشة ويدخل كل التلاميذ خلال ثوانٍ.', qr_copy: '📋 انسخ الرابط', qr_copied: 'تم النسخ ✓', qr_share: '📤 مشاركة',
    help_title: '❓ المساعدة: كيف تستخدم Komiks·Lab', help_intro: 'Komiks·Lab مدرّب مجاني للغة النرويجية للأطفال والكبار. هنا شرح مختصر: من أين تبدأ، وكيف تقرأ وتختبر نفسك وتلعب مع الآخرين.',
    quick: '🚀 بداية سريعة في 5 خطوات', faq: '💬 أسئلة شائعة', sections: '🧭 أقسام الموقع', open: 'افتح ←',
    steps: [
      ['🔤', 'تعلّم الحروف والأصوات', 'الحروف والحركات والحروف الساكنة والمقاطع وتركيبات الحروف (kj وskj وhv…).', '#/alphabet'],
      ['📚', 'اقرأ أول قصة A1', 'استمع إلى كل لقطة ومرّر فوق الكلمات لترى الترجمة.', '#/'],
      ['🧩', 'اختبر نفسك في القصة', 'كل الاختبارات بالنرويجية. 3 نجوم تعني أنك أتقنتها.', '#/tests'],
      ['📐', 'أتقن القواعد', 'الضمائر hun وhan وvi وoss وdere وde؛ الأفعال؛ ترتيب الكلمات — مع جداول واختبارات.', '#/grammar'],
      ['🗺️', 'ضع خطة والعب مع الآخرين', 'تقسّم الخطة تعلّمك على الأسابيع، و«العبوا معًا» تحوّل المراجعة إلى منافسة.', '#/plan']
    ],
    areas: [
      ['📚', 'القصص', 'قصص A1–B2 بأصوات حقيقية. تصفية حسب المستوى والموضوع. قراءة بصوت، نطق بالميكروفون، لعب أدوار.', '#/'],
      ['🖱️', 'الترجمة عند التمرير', 'لغة التعلّم هي النرويجية. مرّر فوق جملة أو كلمة (اضغط على الهاتف) لترى الترجمة. تعمل أيضًا في الاختبارات والألعاب.', null],
      ['📐', 'القواعد', 'قواعد مع جداول وأمثلة: الضمائر، الأزمنة، الأفعال المساعدة، en/ei/et، الصفات، حروف الجر، ترتيب V2. كل موضوع ينتهي باختبار.', '#/grammar'],
      ['🔤', 'الحروف والأصوات', '29 حرفًا، الحركات، الحروف الساكنة، التركيبات، الحروف الصامتة، مركّب المقاطع.', '#/alphabet'],
      ['🔢', 'الأرقام والساعة', 'الأرقام من 0 إلى 1000 مع مركّب؛ «Hva er klokka?» — كيف يقول النرويجيون الوقت (halv ni = 8:30).', '#/numbers'],
      ['🧮', 'الرياضيات', 'جدول الضرب بالصور ومدرّب (+ − × ÷) ولعبة «Math Rocket» الفضائية. كل مسألة تُقرأ بالنرويجية.', '#/math'],
      ['🇬🇧', 'الإنجليزية', 'دورة منفصلة: 8 قصص بأصوات بريطانية واختبارات بالإنجليزية وأكثر من 400 كلمة.', '#/english'],
      ['🧩', 'الاختبارات', 'اختبارات لكل قصة والمستويات A1–B2 والقواعد والحروف والأرقام والساعة.', '#/tests'],
      ['🎮', 'العبوا معًا', 'غرف برمز QR للصف أو الأصدقاء. يختار المضيف موضوعًا ويجيب اللاعبون على هواتفهم في وقت محدّد.', '#/game'],
      ['♟', 'الشطرنج', 'شطرنج ثلاثي الأبعاد مع روبوتات وتصنيف Elo وبطولات للصف. النقلات بالنرويجية.', '#/chess'],
      ['🏆', 'التصنيف', 'الفائزون في الألعاب والتلاميذ: النقاط والانتصارات والدقة والسرعة.', '#/rating'],
      ['🗺️', 'خطة التعلّم', 'اختر مستواك وهدفك وسرعتك — وتوزّع الخطة القصص والقواعد والاختبارات على الأسابيع.', '#/plan'],
      ['🃏', 'البطاقات والأزواج', 'بطاقات بالتكرار المتباعد ولعبة ذاكرة لمطابقة الكلمات.', '#/cards'],
      ['👤', 'الحساب والإعدادات', 'حساب يحفظ تقدّمك على كل أجهزتك. الإعدادات: وضع الطفل/البالغ والصوت والسرعة.', '#/settings']
    ],
    faqs: [
      ['من هؤلاء اللاعبون المتصلون — Emma وJonas وMagnus…؟', 'بعض الخصوم لاعبون افتراضيون للتدريب: متصلون دائمًا وبمستويات صعوبة مختلفة. الأصدقاء الحقيقيون هم من أضفتهم بالرمز أو QR.'],
      ['هل هو مجاني؟', 'نعم. التسجيل اختياري.'],
      ['لماذا الاختبارات بالنرويجية فقط؟', 'لتعتاد التفكير بالنرويجية. تظهر ترجمة أي كلمة عند التمرير أو الضغط.'],
      ['لا أسمع الصوت — ماذا أفعل؟', 'تحقّق من مستوى الصوت ومن الوضع الصامت في الهاتف، وشغّل الأصوات المسجّلة في الإعدادات. يعمل Edge وChrome بشكل أفضل.'],
      ['كيف أدير لعبة في الصف؟', 'افتح «العبوا معًا» على حاسوب متصل بجهاز عرض، وأنشئ غرفة واعرض رمز QR. يمسحه التلاميذ ويكتبون أسماءهم.'],
      ['أين تُحفظ بياناتي؟', 'في حسابك على الخادم وفي هذا المتصفح. لا نرسل كلمات المرور أو التسجيلات الصوتية إلى أي مكان.'],
      ['من صنع القصص والصور؟', 'كل القصص والشخصيات والرسومات والترجمات مختلقة وأُنشئت بالذكاء الاصطناعي وقد تحتوي على أخطاء.']
    ]
  };
  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { rating: EX[l].nav });
    I.modules = Object.assign({}, I.modules, { rating: EX[l].module });
  }
  const C = () => window.KomiksCore;
  const ex = (k, ...a) => { const tbl = EX[C().ui] || EX.en || EX.uk; const v = k in tbl ? tbl[k] : (EX.en || EX.uk)[k]; return typeof v === 'function' ? v(...a) : v; };

  /* ---------------- історія ігор ---------------- */
  function saveGame(g) {
    const K = C();
    if (!g || !g.id || !Array.isArray(g.board) || !g.board.length) return;
    const list = K.raw.get(HIST, []).filter(x => x.id !== g.id);
    list.unshift({ id: g.id, date: new Date().toISOString(), topic: g.topic || '', total: g.total || 0, board: g.board.slice(0, 60).map(b => ({ name: String(b.name || '?').slice(0, 20), avatar: b.avatar || '🙂', fc: /^[A-HJ-NP-Z2-9]{6}$/.test(b.fc || '') ? b.fc : '', score: b.score | 0, correct: b.correct | 0, answered: b.answered | 0, sumMs: b.sumMs | 0 })) });
    K.raw.set(HIST, list.slice(0, 100));
  }
  function playersTable(list) {
    const map = new Map();
    list.forEach(g => g.board.forEach((b, i) => {
      const key = (window.KomiksAvatars ? window.KomiksAvatars.base(b.avatar) : b.avatar) + '|' + b.name.toLowerCase();
      const p = map.get(key) || { name: b.name, avatar: b.avatar, games: 0, wins: 0, points: 0, correct: 0, total: 0, answered: 0, sumMs: 0 };
      if (b.fc) p.fc = b.fc;
      p.games++; if (i === 0) p.wins++; p.points += b.score; p.correct += b.correct; p.total += g.total || 0; p.answered += b.answered; p.sumMs += b.sumMs;
      map.set(key, p);
    }));
    return [...map.values()].sort((a, b) => b.points - a.points || b.wins - a.wins);
  }
  function studentsTable() {
    const K = C();
    const users = K.raw.get('comiks.users', {});
    const statsOf = prefix => {
      const prog = K.raw.get(prefix + 'progress', {}), stats = K.raw.get(prefix + 'stats', {}), days = K.raw.get(prefix + 'days', []);
      const stars = Object.values(prog).reduce((a, p) => a + ((p && p.stars) || 0), 0), tests = Object.values(prog).filter(p => p && p.stars > 0).length;
      const games = stats.games || 0;
      return { stars, tests, days: days.length, games, score: stars * 10 + tests * 5 + days.length * 3 + games * 2 };
    };
    const rows = Object.values(users).map(u => Object.assign({ id: u.id, name: u.name }, statsOf(`comiks.u.${u.id}.`)));
    const guest = statsOf('comiks.');
    if (guest.score > 0) rows.push(Object.assign({ id: null, name: ex('guest') }, guest));
    return rows.sort((a, b) => b.score - a.score);
  }

  function renderRating() {
    const K = C(), { h } = K;
    const hist = K.raw.get(HIST, []);
    const players = playersTable(hist), students = studentsTable();
    const me = K.currentUser();
    const medal = i => ['🥇', '🥈', '🥉'][i] || String(i + 1);
    const sec = ms => (ms / 1000).toFixed(1) + ' s';
    const podium = players.length ? (window.KomiksAvatars ? window.KomiksAvatars.podium(players.slice(0, 12).map((p, i) => ({ pid: 'r' + i, name: p.name, avatar: p.avatar, score: p.points })), { points: '⭐' }) : null) : null;
    const global = h('div', { class: 'box rating-box global-rating', hidden: true });
    const frOn = code => !!(window.KomiksFriends && window.KomiksFriends.online().includes(code)); // онлайн бачать лише друзі
    const withBots = j => { const bots = window.KomiksBots ? window.KomiksBots.cards() : []; const real = j && j.ok && j.players ? j.players : []; return { ok: true, players: real.concat(bots).sort((a, b) => b.stars - a.stars || b.badges - a.badges) }; };
    fetch('api/players.php?sort=stars', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null).then(withBots).then(j => {
      if (!j || !j.ok || !j.players || !j.players.length) return;
      global.hidden = false;
      global.replaceChildren(h('h3', {}, ex('r_global')), h('p', { class: 'hint' }, ex('r_global_d')),
        h('div', { class: 'gr-list' }, j.players.slice(0, 24).map((p, i) => h('a', { class: 'gr-item' + (frOn(p.code) ? ' on' : ''), href: '#/player/c/' + p.code },
          h('span', { class: 'gr-rank' }, medal(i)), window.KomiksAvatars ? window.KomiksAvatars.el(p.bot || window.KomiksAvatars.valid(p.avatar) ? p.avatar : '🙂', { size: 52, mood: i < 3 ? 'cheer' : 'idle' }) : null,
          h('span', { class: 'gr-name' }, h('b', {}, p.name), h('small', {}, (p.level || '') + (frOn(p.code) ? ' · 🟢' : ''))), h('span', { class: 'gr-score' }, '⭐ ' + p.stars, h('small', {}, '🏅 ' + p.badges))))),
        h('a', { class: 'btn', href: '#/players' }, ex('find_players')));
    }).catch(() => {});
    const root = h('section', { class: 'rating' }, K.pageHead(ex('r_title')),
      h('p', { class: 'lead-p' }, ex('r_intro')), global, window.KomiksChess ? window.KomiksChess.ratingBox() : null,
      h('div', { class: 'box rating-box' }, h('h3', {}, ex('r_players')),
        players.length ? [podium, h('div', { class: 'table-wrap' }, h('table', { class: 'checktable rating-table' },
          h('thead', {}, h('tr', {}, ['th_rank', 'th_player', 'th_games', 'th_wins', 'th_points', 'th_acc', 'th_speed'].map(k => h('th', {}, ex(k))))),
          h('tbody', {}, players.map((p, i) => h('tr', { class: i < 3 ? 'top' + (i + 1) : '' }, h('td', {}, medal(i)), h('td', { class: 'rt-player' }, p.fc ? h('a', { class: 'rt-link', href: '#/player/c/' + p.fc, title: ex('view_profile') }, window.KomiksAvatars ? window.KomiksAvatars.el(p.avatar, { size: 34 }) : p.avatar, ' ', h('b', {}, p.name), ' 👤') : [window.KomiksAvatars ? window.KomiksAvatars.el(p.avatar, { size: 34 }) : p.avatar, ' ', h('b', {}, p.name)]),
            h('td', {}, p.games), h('td', {}, p.wins), h('td', {}, h('b', {}, p.points)), h('td', {}, p.total ? Math.round(p.correct / p.total * 100) + ' %' : '—'), h('td', {}, p.answered ? sec(p.sumMs / p.answered) : '—'))))))]
          : [h('p', { class: 'hint' }, ex('no_games')), h('a', { class: 'btn accent', href: '#/game' }, ex('play'))]),
      h('div', { class: 'box rating-box' }, h('h3', {}, ex('r_students')),
        students.length ? h('div', { class: 'table-wrap' }, h('table', { class: 'checktable rating-table' },
          h('thead', {}, h('tr', {}, ['th_rank', 'th_student', 'th_stars', 'th_tests', 'th_days', 'th_score'].map(k => h('th', {}, ex(k))))),
          h('tbody', {}, students.map((s, i) => h('tr', { class: (me && s.id === me.id ? 'me ' : '') + (i < 3 ? 'top' + (i + 1) : '') }, h('td', {}, medal(i)), h('td', {}, (me && s.id === me.id) || K.raw.get(`comiks.u.${s.id}.shareProfile`, false) ? h('a', { class: 'rt-link', href: '#/player/' + (me && s.id === me.id ? '' : s.id) }, h('b', {}, s.name), ' 👤') : h('b', {}, s.name), me && s.id === me.id ? ` (${ex('you')})` : ''),
            h('td', {}, s.stars), h('td', {}, s.tests), h('td', {}, s.days), h('td', {}, h('b', {}, s.score)))))))
          : null,
        !me ? h('p', { class: 'hint' }, ex('no_students'), ' ', h('a', { href: '#/register' }, ex('register'))) : null,
        h('p', { class: 'hint' }, ex('score_hint'))),
      hist.length ? h('div', { class: 'box rating-box' }, h('h3', {}, ex('r_recent')),
        h('ul', { class: 'recent-games' }, hist.slice(0, 12).map(g => h('li', {}, h('span', { class: 'rg-date' }, new Date(g.date).toLocaleString(K.ui === 'uk' ? 'uk-UA' : K.ui === 'no' ? 'nb-NO' : 'en-GB', { dateStyle: 'short', timeStyle: 'short' })),
          h('span', { class: 'rg-topic' }, g.topic), h('span', { class: 'rg-top' }, g.board.slice(0, 3).map((b, i) => h('span', {}, ['🥇', '🥈', '🥉'][i] + ' ' + (window.KomiksAvatars ? window.KomiksAvatars.base(b.avatar) : b.avatar) + ' ' + b.name + ' · ' + b.score))), h('small', {}, ex('players_n', g.board.length))))),
        h('button', { class: 'btn small', type: 'button', onclick: () => { if (confirm(ex('clear_q'))) { K.raw.del(HIST); K.route(); } } }, ex('clear'))) : null,
      h('p', { class: 'hint' }, ex('r_local')));
    return root;
  }

  /* ---------------- допомога ---------------- */
  function renderHelp() {
    const K = C(), { h } = K;
    return h('section', { class: 'help help2' }, K.pageHead(ex('help_title')),
      h('p', { class: 'lead-p' }, ex('help_intro')),
      h('h3', { class: 'sec-sub' }, ex('quick')),
      h('ol', { class: 'quick-steps' }, ex('steps').map(([icon, title, text, href], i) => h('li', {}, h('a', { href, class: 'qs-card' }, h('span', { class: 'how-num' }, i + 1), h('span', { class: 'qs-ico' }, icon), h('b', {}, title), h('span', {}, text))))),
      h('h3', { class: 'sec-sub' }, ex('sections')),
      h('div', { class: 'help-grid' }, ex('areas').map(([icon, title, text, href]) => h('div', { class: 'help-item' }, h('span', { class: 'help-icon' }, icon), h('div', {}, h('h3', {}, title), h('p', {}, text), href ? h('a', { class: 'help-open', href }, ex('open')) : null)))),
      h('h3', { class: 'sec-sub' }, ex('faq')),
      h('div', { class: 'faq' }, ex('faqs').map(([q, a]) => h('details', { class: 'faq-item' }, h('summary', {}, q), h('p', {}, a)))),
      h('p', { style: { marginTop: '18px' } }, h('a', { class: 'btn', href: '#/terms' }, '📄 ' + K.navT('terms'))));
  }

  /* ---------------- QR «Відкрий на телефоні» (перед футером) ---------------- */
  let qrLib = null;
  const loadQr = () => qrLib || (qrLib = window.qrcode ? Promise.resolve() : new Promise((res, rej) => {
    const v = (window.KOMIKS_DATA || {}).version || '';
    const s = document.createElement('script'); s.src = 'assets/vendor/qrcode.js' + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => { qrLib = null; rej(); }; document.head.appendChild(s);
  }));
  /* «Поділитися»: на телефоні — системне меню, на ПК — меню месенджерів і копіювання */
  function shareButton(url, title = 'Komiks·Lab — lær norsk med tegneserier') {
    const K = C(), { h } = K;
    const enc = encodeURIComponent(url), txt = encodeURIComponent(title);
    const items = [
      ['Telegram', '#229ed9', 'T', `https://t.me/share/url?url=${enc}&text=${txt}`],
      ['WhatsApp', '#25d366', 'W', `https://wa.me/?text=${txt}%20${enc}`],
      ['Viber', '#7360f2', 'V', `viber://forward?text=${txt}%20${enc}`],
      ['Facebook', '#1877f2', 'f', `https://www.facebook.com/sharer/sharer.php?u=${enc}`],
      ['Messenger', '#0084ff', 'M', `https://www.facebook.com/dialog/send?link=${enc}&app_id=291494419107518&redirect_uri=${enc}`],
      ['E-mail', '#ef6c00', '@', `mailto:?subject=${txt}&body=${enc}`]
    ];
    const copied = h('span');
    const menu = h('div', { class: 'share-menu', role: 'menu', hidden: true },
      items.map(([name, col, letter, href]) => h('a', { href, target: '_blank', rel: 'noopener', role: 'menuitem' }, h('span', { class: 'share-dot', style: { background: col } }, letter), name)),
      h('button', { type: 'button', role: 'menuitem', onclick: async () => { try { await navigator.clipboard.writeText(url); copied.textContent = ' ✓'; } catch { /* ignore */ } } }, h('span', { class: 'share-dot', style: { background: '#546e7a' } }, '⧉'), ex('qr_copy').replace(/^📋\s*/, ''), copied));
    const btn = h('button', { class: 'btn small accent', type: 'button', 'aria-haspopup': 'menu', onclick: async e => {
      e.stopPropagation();
      if (navigator.share && matchMedia('(pointer: coarse)').matches) { try { await navigator.share({ title, url }); return; } catch { /* скасовано — показуємо меню */ } }
      menu.hidden = !menu.hidden;
    } }, ex('qr_share'));
    document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target)) menu.hidden = true; });
    return h('span', { class: 'share-wrap' }, btn, menu);
  }

  function qrPromo() {
    const K = C(), { h } = K;
    const foot = K.$('.foot'); if (!foot) return;
    let box = K.$('#qrPromo');
    if (!box) { box = h('section', { id: 'qrPromo', class: 'qr-promo' }); foot.before(box); }
    const code = h('div', { class: 'qr-promo-code' });
    const copy = h('button', { class: 'btn small', type: 'button', onclick: async () => { try { await navigator.clipboard.writeText(SITE); copy.textContent = ex('qr_copied'); } catch { /* ignore */ } } }, ex('qr_copy'));
    const share = shareButton(SITE);
    box.replaceChildren(h('div', { class: 'qr-promo-inner' }, code,
      h('div', { class: 'qr-promo-text' }, h('h3', {}, ex('qr_title')), h('p', {}, ex('qr_text')), h('a', { class: 'qr-promo-url', href: SITE }, SITE.replace(/^https:\/\//, '')), h('div', { class: 'row-left' }, copy, share))));
    loadQr().then(() => { try { const qr = window.qrcode(0, 'M'); qr.addData(SITE); qr.make(); code.replaceChildren(K.svgEl(qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true }))); } catch { /* ignore */ } }).catch(() => {});
  }


  /* ---------------- «Журнал» на головній: опис ігор і розділів з кнопкою «Спробувати» ---------------- */
  const JX = {
    uk: {
      masthead: 'Журнал Комікс·Lab', issue: d => `Випуск від ${d}`, tag: 'Ігри й новинки, які варто спробувати сьогодні', try: 'Спробувати →',
      lead: ['💬 НОВА ГРА', 'Бульбашкове полювання для класу', 'Вчитель відкриває кімнату й показує QR. На екрані — малюнок і норвезьке слово вголос. Учні на телефонах тиснуть правильну бульбашку — хто швидше, той виграє.', '#/hunt/host', '📺 Відкрити кімнату'],
      cards: [
        ['💬 НОВА ГРА', 'Бульбашки / Boblejakt', 'Малюнок + норвезьке слово. QR для класу, бульбашки на телефонах. Окрема сторінка: /comiks/game/', '#/hunt'],
        ['🏁 ГРА', 'Логік-гонка', 'Живі аватари мчать доріжками: хто швидше розв’язує логічні задачі, той обганяє. Траса на моніторі, відповіді — на телефонах. Можна й проти ботів!', '#/race'],
        ['🚀 ГРА', 'Math Rocket', 'Космічна гра на 60 секунд: розв’язуй приклади, збивай астероїди й слухай кожну відповідь норвезькою.', '#/math/rocket'],
        ['🇬🇧 КУРС', 'Англійська через комікси', 'Окремий курс в іншому стилі малюнка: 8 історій, британські голоси, тести англійською й 400+ слів за темами.', '#/english'],
        ['🧮 МАТЕМАТИКА', 'Таблиця множення з картинками', 'Натисни на клітинку — побачиш згенерований малюнок і почуєш «tre ganger fire er tolv».', '#/math'],
        ['📐 ГРАМАТИКА', 'hun, han, vi, dere, de', '16 тем від A1 до B2 з таблицями, прикладами й тестами.', '#/grammar'],
        ['📝 СЛОВА', 'Познач, що вже знаєш', '400+ слів з емодзі й озвученням. Позначка «✓ Знаю» рахується в кабінеті.', '#/words'],
        ['🏆 РЕЙТИНГ', 'Хто найкращий у класі?', 'Переможці ігор, бали, точність і швидкість відповідей.', '#/rating']
      ]
    },
    en: {
      masthead: 'Komiks·Lab Magazine', issue: d => `Issue of ${d}`, tag: 'Games and new features worth trying today', try: 'Try it →',
      lead: ['💬 NEW GAME', 'Bubble Hunt for the class', 'The teacher opens a room and shows a QR code. The screen shows a picture and says the Norwegian word. Pupils tap the right bubble on their phones — fastest wins.', '#/hunt/host', '📺 Open room'],
      cards: [
        ['💬 NEW GAME', 'Bubble Hunt', 'Picture + Norwegian word. Class QR, bubbles on phones. Separate page: /comiks/game/', '#/hunt'],
        ['🏁 GAME', 'Logic Race', 'Live avatars race along the track: solve logic puzzles faster to overtake. The track on the monitor, answers on phones. You can also race bots!', '#/race'],
        ['🚀 GAME', 'Math Rocket', 'A 60-second space game: solve sums, shoot asteroids and hear every answer in Norwegian.', '#/math/rocket'],
        ['🇬🇧 COURSE', 'English through comics', 'A separate course in a different drawing style: 8 stories, British voices, tests in English and 400+ words by topic.', '#/english'],
        ['🧮 MATHS', 'Times tables with pictures', 'Tap a cell to see a generated picture and hear “tre ganger fire er tolv”.', '#/math'],
        ['📐 GRAMMAR', 'hun, han, vi, dere, de', '16 topics from A1 to B2 with tables, examples and tests.', '#/grammar'],
        ['📝 WORDS', 'Mark what you already know', '400+ words with emoji and audio. The “✓ I know it” mark is counted in your account.', '#/words'],
        ['🏆 RANKING', 'Who is the best in class?', 'Game winners, points, accuracy and answer speed.', '#/rating']
      ]
    },
    no: {
      masthead: 'Komiks·Lab Magasin', issue: d => `Utgave ${d}`, tag: 'Spill og nyheter du bør prøve i dag', try: 'Prøv →',
      lead: ['💬 NYTT SPILL', 'Boblejakt for klassen', 'Læreren åpner et rom og viser QR. Skjermen viser et bilde og sier det norske ordet. Elevene trykker riktig boble på mobilen — den raskeste vinner.', '#/hunt/host', '📺 Åpne rom'],
      cards: [
        ['💬 NYTT SPILL', 'Boblejakt', 'Bilde + norsk ord. QR for klassen, bobler på mobilen. Egen side: /comiks/game/', '#/hunt'],
        ['🏁 SPILL', 'Logikkløpet', 'Levende avatarer løper om kapp: løs logiske oppgaver raskere og forbikjør de andre. Banen på skjermen, svarene på mobilen.', '#/race'],
        ['🚀 SPILL', 'Matte-raketten', 'Et romspill på 60 sekunder: løs regnestykker, skyt asteroider og hør svaret på norsk.', '#/math/rocket'],
        ['🇬🇧 KURS', 'Engelsk med tegneserier', 'Et eget kurs i en annen tegnestil: 8 historier, britiske stemmer og tester på engelsk.', '#/english'],
        ['🧮 MATTE', 'Gangetabellen med bilder', 'Trykk på en rute for å se et bilde og høre «tre ganger fire er tolv».', '#/math'],
        ['📐 GRAMMATIKK', 'hun, han, vi, dere, de', '16 temaer fra A1 til B2 med tabeller, eksempler og tester.', '#/grammar'],
        ['📝 ORD', 'Merk det du kan', 'Over 400 ord med emoji og lyd. Merket «✓ Jeg kan det» telles på siden din.', '#/words'],
        ['🏆 RANGERING', 'Hvem er best i klassen?', 'Vinnere, poeng, treff og svartid.', '#/rating']
      ]
    }
  };

  JX.ar = {
    masthead: 'مجلة Komiks·Lab', issue: d => `عدد ${d}`, tag: 'ألعاب وميزات جديدة تستحق التجربة اليوم', try: 'جرّب ←',
    lead: ['🎮 لعبة الأسبوع', 'العبوا معًا: الصف كله على شاشة واحدة', 'يفتح المعلّم غرفة ويعرض رمز QR — يمسحه التلاميذ بهواتفهم ويكتبون أسماءهم ويلعبون فورًا. أسئلة بالنرويجية بوقت محدّد، ونقاط للسرعة، وجدول للمتصدّرين بعد كل جولة.', '#/game', '🎲 غرفة عشوائية'],
    cards: [
      ['♟ جديد', 'الشطرنج ثلاثي الأبعاد', 'العب مع الروبوتات أو مع صديق أو نظّم بطولة للصف. تصنيف Elo والنقلات بالنرويجية.', '#/chess'],
      ['🏁 لعبة', 'سباق المنطق', 'شخصيات تتسابق: من يحلّ الألغاز أسرع يتقدّم. المضمار على الشاشة والإجابات على الهواتف.', '#/race'],
      ['🚀 لعبة', 'Math Rocket', 'لعبة فضائية: حلّ المسائل وأسقط الكويكبات واسمع كل إجابة بالنرويجية.', '#/math/rocket'],
      ['🇬🇧 دورة', 'الإنجليزية بالقصص المصوّرة', '8 قصص بأصوات بريطانية واختبارات بالإنجليزية وأكثر من 400 كلمة.', '#/english'],
      ['📐 القواعد', 'hun, han, vi, dere, de', '16 موضوعًا من A1 إلى B2 مع جداول وأمثلة واختبارات.', '#/grammar'],
      ['📝 الكلمات', 'علّم ما تعرفه', 'أكثر من 400 كلمة بالرموز التعبيرية والصوت.', '#/words'],
      ['🏆 التصنيف', 'من الأفضل في الصف؟', 'الفائزون والنقاط والدقة وسرعة الإجابة.', '#/rating']
    ]
  };
  /* ---------------- головна: «Створи героя — грай разом» + зала слави ---------------- */
  const PH = {
    uk: { kick: '🎮 ГРАЙ РАЗОМ', title: 'Створи свого героя — і змагайся з сім’єю чи друзями', text: 'Обери тваринку, колір, шапку й окуляри — герой закріплюється за твоїм акаунтом і бігає, літає й стоїть на подіумі в усіх іграх. Рідкісні речі випадають зі скрині за перемоги.',
      make: '✨ Створити героя', edit: '🎨 Змінити героя', steps: ['Створи героя', 'Відкрий гру на ТВ чи ноутбуці', 'Рідні скануть QR телефонами — і старт!'],
      together: '👨‍👩‍👧 Разом', solo: '🙋 Сам', games: [['flag', '#2e7d32', 'Скарби', 'Біжи персонажем, збирай речі й числа. Норвезька озвучка. QR для класу.', '#/run/host', 'game/'], ['chat', '#6a1b9a', 'Бульбашки', 'Малюнок + норвезьке слово. Телефони тиснуть бульбашку — хто швидше.', '#/hunt/host', 'game/'], ['flag', '#2e7d32', 'Логік-гонка', 'Герої мчать доріжками — хто швидше розв’язує логічні задачі.', '#/race/host', '#/race/bots'], ['rocket', '#e53935', 'Math Rocket', 'Космічна арифметика на 60 секунд.', '#/math/race', '#/math/rocket'], ['chess', '#37474f', 'Шахи', '3D-шахи: турнір для класу або партія з другом.', '#/chess/host', '#/chess'], ['gamepad', '#1e88e5', 'Гра разом', 'Вікторина норвезькою для всієї родини чи класу.', '#/game', '#/tests']],
      fame: '🏆 Зала слави', fame_d: 'Переможці останніх ігор на цьому пристрої' },
    en: { kick: '🎮 PLAY TOGETHER', title: 'Create your hero — and compete with family or friends', text: 'Pick an animal, colour, hat and glasses — your hero is tied to your account and runs, flies and stands on the podium in every game. Rare items drop from chests when you win.',
      make: '✨ Create a hero', edit: '🎨 Edit your hero', steps: ['Create your hero', 'Open a game on the TV or laptop', 'Family scans the QR with phones — go!'],
      together: '👨‍👩‍👧 Together', solo: '🙋 Solo', games: [['flag', '#2e7d32', 'Treasure Run', 'Run as your avatar, grab things and numbers. Spoken Norwegian. Class QR.', '#/run/host', 'game/'], ['chat', '#6a1b9a', 'Bubble Hunt', 'A picture + a Norwegian word. Phones tap the bubble — fastest wins.', '#/hunt/host', 'game/'], ['flag', '#2e7d32', 'Logic Race', 'Heroes race along the track — whoever solves logic puzzles faster.', '#/race/host', '#/race/bots'], ['rocket', '#e53935', 'Math Rocket', 'Space arithmetic in 60 seconds.', '#/math/race', '#/math/rocket'], ['chess', '#37474f', 'Chess', '3D chess: a class tournament or a game with a friend.', '#/chess/host', '#/chess'], ['gamepad', '#1e88e5', 'Play together', 'A Norwegian quiz for the whole family or class.', '#/game', '#/tests']],
      fame: '🏆 Hall of fame', fame_d: 'Winners of the latest games on this device' },
    no: { kick: '🎮 SPILL SAMMEN', title: 'Lag din egen helt – og konkurrer med familie eller venner', text: 'Velg dyr, farge, lue og briller – helten hører til kontoen din og løper, flyr og står på pallen i alle spill. Sjeldne ting finner du i kister når du vinner.',
      make: '✨ Lag en helt', edit: '🎨 Endre helten', steps: ['Lag helten din', 'Åpne et spill på TV-en eller PC-en', 'Familien skanner QR-koden med mobilen – start!'],
      together: '👨‍👩‍👧 Sammen', solo: '🙋 Alene', games: [['flag', '#2e7d32', 'Skattejakt', 'Løp som avataren, samle ting og tall. Norsk tale. QR til klassen.', '#/run/host', 'game/'], ['chat', '#6a1b9a', 'Boblejakt', 'Bilde + norsk ord. Telefonene trykker boblen — den raskeste vinner.', '#/hunt/host', 'game/'], ['flag', '#2e7d32', 'Logikkløpet', 'Heltene løper om kapp – den som løser oppgavene raskest.', '#/race/host', '#/race/bots'], ['rocket', '#e53935', 'Matte-raketten', 'Romregning på 60 sekunder.', '#/math/race', '#/math/rocket'], ['chess', '#37474f', 'Sjakk', '3D-sjakk: klasseturnering eller et parti med en venn.', '#/chess/host', '#/chess'], ['gamepad', '#1e88e5', 'Spill sammen', 'Norsk quiz for hele familien eller klassen.', '#/game', '#/tests']],
      fame: '🏆 Æresgalleriet', fame_d: 'Vinnerne av de siste spillene på denne enheten' }
  };
  PH.ar = { kick: '🎮 العبوا معًا', title: 'أنشئ بطلك — وتنافس مع العائلة أو الأصدقاء', text: 'اختر حيوانًا ولونًا وقبعة ونظارة — بطلك مرتبط بحسابك ويركض ويطير ويقف على منصة التتويج في كل الألعاب. تسقط أغراض نادرة من الصناديق عند الفوز.',
    make: '✨ أنشئ بطلًا', edit: '🎨 عدّل بطلك', steps: ['أنشئ بطلك', 'افتح لعبة على التلفاز أو الحاسوب', 'تمسح العائلة رمز QR بالهواتف — انطلقوا!'],
    together: '👨‍👩‍👧 معًا', solo: '🙋 وحدي', games: [['chat', '#6a1b9a', 'صيد الفقاعات', 'صورة + كلمة نرويجية. الهواتف تضغط الفقاعة — الأسرع يفوز.', '#/hunt/host', 'game/'], ['flag', '#2e7d32', 'سباق المنطق', 'الأبطال يتسابقون — الأسرع في حلّ الألغاز يفوز.', '#/race/host', '#/race/bots'], ['rocket', '#e53935', 'Math Rocket', 'حساب فضائي في 60 ثانية.', '#/math/race', '#/math/rocket'], ['chess', '#37474f', 'الشطرنج', 'شطرنج ثلاثي الأبعاد: بطولة للصف أو مباراة مع صديق.', '#/chess/host', '#/chess'], ['gamepad', '#1e88e5', 'العبوا معًا', 'مسابقة بالنرويجية للعائلة أو الصف.', '#/game', '#/tests']],
    fame: '🏆 قاعة المشاهير', fame_d: 'الفائزون في آخر الألعاب على هذا الجهاز' };
  const AVX = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(code, o) : document.createTextNode(String(code).split('|')[0]));
  function playHero() {
    const K = C(), { h } = K;
    const T = PH[K.ui] || PH.en || PH.uk;
    const me = window.KomiksProfile ? window.KomiksProfile.avatar() : '🦊';
    const custom = K.store.get('avatar', null);
    const ic = (n, c) => (window.KomiksIcons ? window.KomiksIcons.badge(n, c, 24) : null);
    const hist = K.raw.get(HIST, []).filter(g => g.board && g.board[0]).slice(0, 6);
    const fame = hist.length ? h('div', { class: 'ph-fame' }, h('h3', {}, T.fame), h('small', {}, T.fame_d),
      h('div', { class: 'ph-fame-row' }, hist.map((g, i) => h('div', { class: 'ph-winner', style: { '--i': i } },
        h('span', { class: 'ph-plinth' }, AVX(g.board[0].avatar, { size: 78, mood: 'cheer', crown: true })), h('b', {}, g.board[0].name), h('small', {}, g.topic || ''))))) : null;
    return h('section', { class: 'play-hero' },
      h('div', { class: 'ph-left' },
        h('span', { class: 'jr-kick' }, T.kick), h('h2', {}, T.title), h('p', {}, T.text),
        h('ol', { class: 'ph-steps' }, T.steps.map(s => h('li', {}, s))),
        h('div', { class: 'ph-games' }, T.games.map(([icon, col, name, desc, together, solo]) => h('div', { class: 'ph-game', style: { '--c': col } },
          ic(icon, col), h('div', { class: 'ph-game-t' }, h('b', {}, name), h('small', {}, desc)),
          h('div', { class: 'ph-game-a' }, h('a', { class: 'btn accent', href: together }, T.together), h('a', { class: 'btn', href: solo }, T.solo)))))),
      h('div', { class: 'ph-right' },
        h('div', { class: 'ph-spot' }, h('div', { class: 'ph-me' }, AVX(me, { size: 190, mood: 'cheer' })), h('span', { class: 'ph-floor' })),
        h('a', { class: 'btn primary big', href: '#/avatar' }, custom ? T.edit : T.make),
        h('a', { class: 'btn', href: '#/friends' }, { uk: '👥 Додати друзів', en: '👥 Add friends', no: '👥 Legg til venner', ar: '👥 أضف أصدقاء' }[K.ui] || '👥')),
      fame);
  }
  // ілюстрація для журналу: телевізор із трасою й телефони гравців із нікнеймами
  const CREW = [['🦊|cap|round|scarf|orange', 'Nora_07'], ['🐼|phones|sun||', 'Ali.K'], ['🐸|party|nerd|bowtie|mint', 'SuperMamma'], ['🦁|crown|aviator|medal|gold', 'Pappa_P']];
  function leadArt() {
    const K = C(), { h } = K;
    const lanes = CREW.slice(0, 3).map(([av, nick], i) => h('div', { class: 'jt-lane' }, h('span', { class: 'jt-nick' }, nick), h('div', { class: 'jt-road' }, h('span', { class: 'jt-run', style: { '--x': [62, 44, 28][i] + '%', '--i': i } }, AVX(av, { size: 34 })), h('i', { class: 'jt-finish' }))));
    const tv = h('div', { class: 'jt-tv' }, h('div', { class: 'jt-screen' }, h('div', { class: 'jt-bar' }, h('b', {}, '🏁 LIVE'), h('span', {}, '⏱ 0:42')), lanes), h('span', { class: 'jt-stand' }));
    const phones = h('div', { class: 'jt-phones' }, CREW.slice(0, 3).map(([av, nick], i) => h('div', { class: 'jt-phone', style: { '--i': i } },
      h('span', { class: 'jt-notch' }), AVX(av, { size: 46, mood: 'cheer' }), h('b', {}, nick), h('div', { class: 'jt-btns' }, h('i', { class: 'a' }), h('i', { class: 'b' }), h('i', { class: 'c' }), h('i', { class: 'd' })))));
    return h('div', { class: 'jr-lead-art jt', 'aria-hidden': 'true' }, tv, phones);
  }

  /* ---------------- карта сайту (#/sitemap) ---------------- */
  const SM = {
    uk: { title: '🗺️ Карта сайту', comics: n => `📚 Комікси (${n})`, learn: '🎓 Навчання', games: '🎮 Ігри', me: '👤 Кабінет', level: l => `Рівень ${l}` },
    en: { title: '🗺️ Site map', comics: n => `📚 Comics (${n})`, learn: '🎓 Learning', games: '🎮 Games', me: '👤 Account', level: l => `Level ${l}` },
    no: { title: '🗺️ Nettstedskart', comics: n => `📚 Tegneserier (${n})`, learn: '🎓 Læring', games: '🎮 Spill', me: '👤 Min side', level: l => `Nivå ${l}` }
  };
  SM.ar = { title: '🗺️ خريطة الموقع', comics: n => `📚 القصص (${n})`, learn: '🎓 التعلّم', games: '🎮 الألعاب', me: '👤 الحساب', level: l => `المستوى ${l}` };
  function renderSitemap() {
    const K = C(), { h } = K, T = SM[K.ui] || SM.en || SM.uk;
    const nav = k => K.navT(k);
    const titleOf = c => (K.ui === 'uk' ? c.titleUk : K.ui === 'en' ? c.titleEn : c.title) || c.title;
    const levels = ['A1', 'A2', 'B1', 'B2'];
    const groups = levels.map(l => [l, K.COMICS.filter(c => c.level === l)]).filter(([, list]) => list.length);
    const links = list => h('ul', { class: 'sm-list' }, list.map(([href, label]) => h('li', {}, h('a', { href }, label))));
    return h('section', { class: 'sitemap' }, K.pageHead(T.title),
      h('div', { class: 'sm-cols' },
        h('div', { class: 'sm-box' }, h('h3', {}, T.learn), links([['#/', nav('comics')], ['#/words', nav('words')], ['#/grammar', nav('grammar')], ['#/english', nav('english')], ['#/math', nav('math')], ['#/alphabet', nav('alphabet')], ['#/numbers', nav('numbers')], ['#/cards', nav('cards')], ['#/plan', nav('plan')], ['#/tests', nav('tests')]])),
        h('div', { class: 'sm-box' }, h('h3', {}, T.games), links([['#/race', '🏁 ' + nav('race')], ['#/race/host', '📺 ' + nav('race') + ' · QR'], ['#/math/rocket', '🚀 Math Rocket'], ['#/math/race', '👥 Math Rocket · QR'], ['#/game', nav('game')], ['#/rating', nav('rating')]])),
        h('div', { class: 'sm-box' }, h('h3', {}, T.me), links([['#/account', nav('account') || '👤'], ['#/avatar', '🎨 Avatar'], ['#/help', nav('help') || '❓']]))),
      h('h2', { class: 'sec-title' }, T.comics(K.COMICS.length)),
      h('div', { class: 'sm-cols' }, groups.map(([l, list]) => h('div', { class: 'sm-box' }, h('h3', {}, T.level(l)), links(list.map(c => [`#/read/${c.id}`, titleOf(c)]))))));
  }
  function journal() {
    const K = C(), { h } = K;
    const T = JX[K.ui] || JX.en || JX.uk;
    const d = new Date().toLocaleDateString(K.ui === 'uk' ? 'uk-UA' : K.ui === 'no' ? 'nb-NO' : K.ui === 'ar' ? 'ar' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const [kick, title, text, href, extra] = T.lead;
    return h('section', { class: 'journal' },
      h('header', { class: 'jr-mast' }, h('b', { class: 'jr-name' }, '📰 ' + T.masthead), h('span', { class: 'jr-issue' }, T.issue(d)), h('span', { class: 'jr-tag' }, T.tag)),
      h('div', { class: 'jr-body' },
        h('article', { class: 'jr-lead' },
          h('span', { class: 'jr-kick' }, kick), h('h2', {}, title), h('p', {}, text),
          leadArt(),
          h('div', { class: 'row-left' }, h('a', { class: 'btn accent big', href }, T.try), h('a', { class: 'btn', href }, extra))),
        h('div', { class: 'jr-cards' }, T.cards.map(([k, t, p, hr]) => h('a', { class: 'jr-card', href: hr }, h('span', { class: 'jr-kick' }, k), h('b', {}, t), h('span', { class: 'jr-text' }, p), h('span', { class: 'jr-try' }, T.try))))));
  }

  window.KomiksExtras = { renderRating, renderHelp, qrPromo, saveGame, journal, playHero, renderSitemap, shareButton, text: ex };
})();
