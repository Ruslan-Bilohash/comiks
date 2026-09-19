/* Комікс·Lab — «Гра разом»: кімнати з QR-кодом, учасники, тест норвезькою на час.
   Без сервера: пристрої з’єднуються напряму через WebRTC (PeerJS, assets/vendor/peerjs.min.js).
   Ведучий (host) зберігає стан гри; учасники (player) лише показують питання й надсилають відповіді. */
(() => {
  'use strict';

  /* ---------------- тексти ---------------- */
  const GT = {
    uk: {
      nav: 'Гра разом', module: ['🎮', 'Гра разом', 'кімнати з QR-кодом для класу й друзів'],
      term: ['Гра в кімнатах', 'У режимі «Гра разом» пристрої з’єднуються напряму через WebRTC; для першого з’єднання використовується публічний сервер PeerJS. Між учасниками передаються лише ім’я, аватар і відповіді. Після закриття кімнати нічого не зберігається.'],
      title: '🎮 Гра разом', intro: 'Створи кімнату на великому екрані чи телефоні — учасники сканують QR-код, вводять ім’я й разом проходять норвезький тест на час. Бали за правильні й швидкі відповіді!',
      host_card: ['📺', 'Створити кімнату', 'для вчителя, батьків чи ведучого'], join_card: ['📱', 'Приєднатися', 'маю код або QR-код кімнати'],
      how: ['Ведучий створює кімнату й показує QR-код.', 'Учасники сканують код телефоном і вводять ім’я.', 'Усі бачать список учасників — ведучий натискає «Почати».', 'Питання норвезькою на час, після кожного — таблиця лідерів.'],
      setup: '⚙️ Налаштування гри', source: 'Тест', count: 'Кількість питань', time: 'Час на питання', sec: n => `${n} с`,
      host_plays: 'Я теж граю на цьому пристрої', sound: 'Звук питань на телефонах учасників', create: 'Створити кімнату ▶',
      src_level: l => `Рівень ${l} (усі комікси)`, src_alpha: 'Алфавіт', src_numbers: 'Числа', src_comics: 'Окремий комікс',
      join_title: '📱 Приєднатися до гри', code: 'Код кімнати', code_ph: 'напр. K7Q2M', name: 'Твоє ім’я', avatar: 'Обери аватар', join_go: 'Увійти в кімнату ▶',
      err_code: 'Введи код кімнати (5 символів).', err_name: 'Введи ім’я.',
      connecting: 'Підключення…', creating: 'Створюємо кімнату…', room: 'Кімната', scan: 'Скануй QR-код або відкрий посилання:',
      copy: '📋 Копіювати', copied: 'Скопійовано ✓', players: n => `Учасники: ${n}`, waiting_players: 'Чекаємо на учасників… Попроси всіх відсканувати QR-код.',
      start: '🚀 Почати гру', need_players: 'Потрібен хоча б один учасник.', remove: 'Прибрати', close_room: '✖ Закрити кімнату',
      you_in: 'Ти в кімнаті!', wait_start: 'Чекай, доки ведучий почне гру…', q_of: (i, n) => `Питання ${i} з ${n}`,
      answered: (a, b) => `Відповіли: ${a} з ${b}`, sent: 'Відповідь прийнята! Чекаємо на інших…', time_up: '⏰ Час вийшов!',
      correct: n => `✅ Правильно! +${n} балів`, wrong: '❌ Неправильно', no_answer: '⏰ Без відповіді',
      rank: (r, n) => `Твоє місце: ${r} з ${n}`, score: n => `${n} балів`, board: '🏆 Таблиця лідерів', next: 'Наступне питання ▶', auto: s => `автоматично через ${s} с`,
      results: 'Результати 🏁', podium: '🏆 Переможці', again: '🔄 Зіграти ще раз', leave: '🚪 Вийти', final_place: (r, n) => `Ти на ${r}-му місці з ${n}!`,
      host_left: 'Ведучий завершив гру або з’єднання втрачено.', kicked: 'Ведучий прибрав тебе з кімнати.',
      err_room: 'Кімнату не знайдено. Перевір код — або ведучий уже закрив гру.', err_net: 'Не вдалося з’єднатися. Потрібен інтернет (і сучасний браузер).',
      local_warn: '⚠️ Сторінку відкрито з файлу — телефони не зможуть приєднатися за QR-кодом. Відкрий гру на сайті https://bilohash.com/comiks/',
      host_name: 'Ведучий', back: '← Назад', you: 'ти',
      src_cat: c => `Тема: ${c}`, live: '⏱️ Хто вже відповів', q_stats: '⏱️ Відповіді на це питання', stats_title: '📊 Статистика учнів',
      t_name: 'Учень', t_answer: 'Відповідь', t_time: 'Час', t_points: 'Бали', t_correct: 'Правильних', t_avg: 'Середній час', t_best: 'Найшвидше', t_rank: 'Місце', teacher_hint: 'Порада вчителю: не ставте галочку «Я теж граю» — тоді ви спостерігаєте за рейтингом і швидкістю учнів.',
      random_room: '🎲 Випадкова кімната', random_hint: 'Одним натиском: мікс слів, картинок, граматики, годинника й чисел — знати історії не потрібно.',
      src_mix: '🎲 Мікс усього (без знання історій)', src_clock: '🕒 Котра година?', src_grammar: '📐 Граматика (усі теми)', topic: 'Тема',
      read_first: '📖 Спершу читаємо комікс разом — тоді будуть і питання «Хто це сказав?»', story_mode: 'Перед грою', sm_none: '🚀 Одразу до питань', sm_read: '📖 Спершу читаємо комікс разом',
      fair_hint: '✅ Питання чесні для всіх — жодних імен і сюжету напам’ять: слова на слух, картинки й емодзі, кадри коміксу (відповідь видно на малюнку), граматика, годинник і числа. Історію можна прочитати разом перед грою.',
      story_title: '📖 Читаємо разом', story_of: (i, n) => `Кадр ${i} з ${n}`, story_next: 'Далі ▶', story_prev: '◀ Назад', story_go: '🚀 До питань', story_wait: 'Читай і слухай уважно — потім будуть питання!', story_play: '🔊 Слухати кадр',
    },
    en: {
      nav: 'Play together', module: ['🎮', 'Play together', 'QR-code rooms for classes and friends'],
      term: ['Game rooms', 'In “Play together”, devices connect directly via WebRTC; the public PeerJS server is used only to set up the connection. Only names, avatars and answers are exchanged between players. Nothing is stored after the room is closed.'],
      title: '🎮 Play together', intro: 'Create a room on a big screen or a phone — players scan the QR code, enter their name and take a Norwegian quiz against the clock. Points for correct and fast answers!',
      host_card: ['📺', 'Create a room', 'for teachers, parents or a game host'], join_card: ['📱', 'Join a game', 'I have a room code or QR code'],
      how: ['The host creates a room and shows the QR code.', 'Players scan the code with a phone and enter a name.', 'Everyone sees who joined — the host presses “Start”.', 'Timed questions in Norwegian with a leaderboard after each one.'],
      setup: '⚙️ Game settings', source: 'Quiz', count: 'Number of questions', time: 'Time per question', sec: n => `${n} s`,
      host_plays: 'I am playing on this device too', sound: 'Question audio on players’ phones', create: 'Create room ▶',
      src_level: l => `Level ${l} (all comics)`, src_alpha: 'Alphabet', src_numbers: 'Numbers', src_comics: 'Single comic',
      join_title: '📱 Join a game', code: 'Room code', code_ph: 'e.g. K7Q2M', name: 'Your name', avatar: 'Pick an avatar', join_go: 'Enter the room ▶',
      err_code: 'Enter the room code (5 characters).', err_name: 'Enter your name.',
      connecting: 'Connecting…', creating: 'Creating the room…', room: 'Room', scan: 'Scan the QR code or open the link:',
      copy: '📋 Copy', copied: 'Copied ✓', players: n => `Players: ${n}`, waiting_players: 'Waiting for players… Ask everyone to scan the QR code.',
      start: '🚀 Start the game', need_players: 'At least one player is needed.', remove: 'Remove', close_room: '✖ Close the room',
      you_in: 'You are in the room!', wait_start: 'Wait for the host to start the game…', q_of: (i, n) => `Question ${i} of ${n}`,
      answered: (a, b) => `Answered: ${a} of ${b}`, sent: 'Answer received! Waiting for the others…', time_up: '⏰ Time is up!',
      correct: n => `✅ Correct! +${n} points`, wrong: '❌ Wrong', no_answer: '⏰ No answer',
      rank: (r, n) => `Your place: ${r} of ${n}`, score: n => `${n} points`, board: '🏆 Leaderboard', next: 'Next question ▶', auto: s => `automatically in ${s} s`,
      results: 'Results 🏁', podium: '🏆 Winners', again: '🔄 Play again', leave: '🚪 Leave', final_place: (r, n) => `You finished ${r} of ${n}!`,
      host_left: 'The host ended the game or the connection was lost.', kicked: 'The host removed you from the room.',
      err_room: 'Room not found. Check the code — or the host has already closed the game.', err_net: 'Could not connect. An internet connection (and a modern browser) is required.',
      local_warn: '⚠️ The page is opened from a file — phones can’t join with the QR code. Open the game on https://bilohash.com/comiks/',
      host_name: 'Host', back: '← Back', you: 'you',
      src_cat: c => `Topic: ${c}`, live: '⏱️ Who has answered', q_stats: '⏱️ Answers to this question', stats_title: '📊 Student statistics',
      t_name: 'Student', t_answer: 'Answer', t_time: 'Time', t_points: 'Points', t_correct: 'Correct', t_avg: 'Average time', t_best: 'Fastest', t_rank: 'Place', teacher_hint: 'Tip for teachers: leave “I am playing too” unticked — then you can watch the ranking and the students’ speed.',
      random_room: '🎲 Random room', random_hint: 'One click: a mix of words, pictures, grammar, clock and numbers — no need to know the stories.',
      src_mix: '🎲 Mix of everything (no story knowledge)', src_clock: '🕒 What time is it?', src_grammar: '📐 Grammar (all topics)', topic: 'Topic',
      read_first: '📖 Read the comic together first — then “Who said this?” questions are included', story_mode: 'Before the game', sm_none: '🚀 Straight to the questions', sm_read: '📖 Read the comic together first',
      fair_hint: '✅ Questions are fair for everyone — no names and nothing to memorise: words by ear, pictures and emoji, comic panels (the answer is visible in the drawing), grammar, the clock and numbers. You can read a story together before the game.',
      story_title: '📖 Reading together', story_of: (i, n) => `Panel ${i} of ${n}`, story_next: 'Next ▶', story_prev: '◀ Back', story_go: '🚀 To the questions', story_wait: 'Read and listen carefully — questions come next!', story_play: '🔊 Listen to the panel',
    },
    no: {
      nav: 'Spill sammen', module: ['🎮', 'Spill sammen', 'rom med QR-kode for klassen og venner'],
      term: ['Spillrom', 'I «Spill sammen» kobles enhetene direkte via WebRTC; den offentlige PeerJS-serveren brukes bare til å sette opp forbindelsen. Bare navn, avatar og svar sendes mellom deltakerne. Ingenting lagres etter at rommet er stengt.'],
      title: '🎮 Spill sammen', intro: 'Lag et rom på storskjermen eller mobilen — deltakerne skanner QR-koden, skriver navnet sitt og tar en norsktest på tid. Poeng for riktige og raske svar!',
      host_card: ['📺', 'Lag et rom', 'for lærere, foreldre eller en spilleder'], join_card: ['📱', 'Bli med', 'jeg har en romkode eller QR-kode'],
      how: ['Spillederen lager et rom og viser QR-koden.', 'Deltakerne skanner koden med mobilen og skriver navnet sitt.', 'Alle ser hvem som er med — spillederen trykker «Start».', 'Spørsmål på norsk på tid, med resultatliste etter hvert spørsmål.'],
      setup: '⚙️ Innstillinger for spillet', source: 'Test', count: 'Antall spørsmål', time: 'Tid per spørsmål', sec: n => `${n} s`,
      host_plays: 'Jeg spiller også på denne enheten', sound: 'Lyd på deltakernes mobiler', create: 'Lag rom ▶',
      src_level: l => `Nivå ${l} (alle tegneserier)`, src_alpha: 'Alfabetet', src_numbers: 'Tall', src_comics: 'Én tegneserie',
      join_title: '📱 Bli med i spillet', code: 'Romkode', code_ph: 'f.eks. K7Q2M', name: 'Navnet ditt', avatar: 'Velg avatar', join_go: 'Gå inn i rommet ▶',
      err_code: 'Skriv romkoden (5 tegn).', err_name: 'Skriv navnet ditt.',
      connecting: 'Kobler til …', creating: 'Lager rommet …', room: 'Rom', scan: 'Skann QR-koden eller åpne lenken:',
      copy: '📋 Kopier', copied: 'Kopiert ✓', players: n => `Deltakere: ${n}`, waiting_players: 'Venter på deltakere … Be alle skanne QR-koden.',
      start: '🚀 Start spillet', need_players: 'Minst én deltaker trengs.', remove: 'Fjern', close_room: '✖ Steng rommet',
      you_in: 'Du er i rommet!', wait_start: 'Vent til spillederen starter spillet …', q_of: (i, n) => `Spørsmål ${i} av ${n}`,
      answered: (a, b) => `Svart: ${a} av ${b}`, sent: 'Svaret er mottatt! Venter på de andre …', time_up: '⏰ Tiden er ute!',
      correct: n => `✅ Riktig! +${n} poeng`, wrong: '❌ Feil', no_answer: '⏰ Ikke svart',
      rank: (r, n) => `Din plass: ${r} av ${n}`, score: n => `${n} poeng`, board: '🏆 Resultatliste', next: 'Neste spørsmål ▶', auto: s => `automatisk om ${s} s`,
      results: 'Resultater 🏁', podium: '🏆 Vinnere', again: '🔄 Spill igjen', leave: '🚪 Gå ut', final_place: (r, n) => `Du kom på ${r}. plass av ${n}!`,
      host_left: 'Spillederen avsluttet spillet, eller forbindelsen ble brutt.', kicked: 'Spillederen fjernet deg fra rommet.',
      err_room: 'Fant ikke rommet. Sjekk koden — eller spillederen har stengt spillet.', err_net: 'Kunne ikke koble til. Du trenger internett (og en moderne nettleser).',
      local_warn: '⚠️ Siden er åpnet fra en fil — mobiler kan ikke bli med via QR-koden. Åpne spillet på https://bilohash.com/comiks/',
      host_name: 'Spilleder', back: '← Tilbake', you: 'deg',
      src_cat: c => `Tema: ${c}`, live: '⏱️ Hvem har svart', q_stats: '⏱️ Svar på dette spørsmålet', stats_title: '📊 Statistikk for elevene',
      t_name: 'Elev', t_answer: 'Svar', t_time: 'Tid', t_points: 'Poeng', t_correct: 'Riktige', t_avg: 'Snitt-tid', t_best: 'Raskest', t_rank: 'Plass', teacher_hint: 'Tips til lærere: ikke kryss av for «Jeg spiller også» — da kan du følge med på resultatlisten og elevenes svartid.',
      random_room: '🎲 Tilfeldig rom', random_hint: 'Ett klikk: en blanding av ord, bilder, grammatikk, klokka og tall — du trenger ikke kjenne historiene.',
      src_mix: '🎲 Litt av alt (uten historiekunnskap)', src_clock: '🕒 Hva er klokka?', src_grammar: '📐 Grammatikk (alle temaer)', topic: 'Tema',
      read_first: '📖 Les tegneserien sammen først — da kommer også spørsmål som «Hvem sa dette?»', story_mode: 'Før spillet', sm_none: '🚀 Rett til spørsmålene', sm_read: '📖 Les tegneserien sammen først',
      fair_hint: '✅ Spørsmålene er rettferdige for alle – ingen navn og ingenting å huske utenat: ord på lyd, bilder og emoji, ruter fra tegneseriene (svaret vises i tegningen), grammatikk, klokka og tall.',
      story_title: '📖 Vi leser sammen', story_of: (i, n) => `Rute ${i} av ${n}`, story_next: 'Neste ▶', story_prev: '◀ Tilbake', story_go: '🚀 Til spørsmålene', story_wait: 'Les og lytt godt — så kommer spørsmålene!', story_play: '🔊 Lytt til ruten',
    }
  };
  // підмішуємо тексти гри в загальний i18n (меню, модуль на головній, умови використання)
  if (window.I18N) for (const l of ['uk', 'en', 'no']) {
    const I = window.I18N[l]; if (!I) continue;
    I.nav = Object.assign({}, I.nav, { game: GT[l].nav });
    I.modules = Object.assign({}, I.modules, { game: GT[l].module });
    if (Array.isArray(I.terms) && !I.terms.some(x => x[0] === GT[l].term[0])) I.terms = [...I.terms.slice(0, -1), GT[l].term, ...I.terms.slice(-1)];
  }

  if (window.I18N) {
    const Q = { uk: 'Котра година на годиннику?', en: 'What time does the clock show?' };
    const S = { uk: 'Подивись на кадр: хто це каже? (репліка в бульбашці)', en: 'Look at the panel: who says this? (the line is in the speech bubble)' };
    for (const l of ['uk', 'en']) if (window.I18N[l]) window.I18N[l].qtr = Object.assign({}, window.I18N[l].qtr, { clock: Q[l], speaker: S[l] });
  }
  const C = () => window.KomiksCore;
  GT.ar = {
    nav: 'العبوا معًا', module: ['🎮', 'العبوا معًا', 'غرف برمز QR للصف والأصدقاء'],
    term: ['غرف اللعب', 'في «العبوا معًا» تتصل الأجهزة مباشرةً عبر WebRTC؛ يُستخدم خادم PeerJS العام فقط لإعداد الاتصال. لا يُحفظ شيء بعد إغلاق الغرفة.'],
    title: '🎮 العبوا معًا', intro: 'أنشئ غرفة على شاشة كبيرة أو هاتف — يمسح اللاعبون رمز QR ويكتبون أسماءهم ويجيبون عن مسابقة بالنرويجية في وقت محدّد. نقاط للإجابات الصحيحة والسريعة!',
    host_card: ['📺', 'أنشئ غرفة', 'للمعلّمين والآباء ومقدّمي الألعاب'], join_card: ['📱', 'انضم إلى لعبة', 'لديّ رمز الغرفة أو QR'],
    how: ['ينشئ المضيف غرفة ويعرض رمز QR.', 'يمسح اللاعبون الرمز بالهاتف ويكتبون أسماءهم.', 'يرى الجميع من انضم — ويضغط المضيف «ابدأ».', 'أسئلة بالنرويجية بوقت محدّد مع جدول المتصدّرين بعد كل سؤال.'],
    setup: '⚙️ إعدادات اللعبة', source: 'المسابقة', count: 'عدد الأسئلة', time: 'الوقت لكل سؤال', sec: n => `${n} ث`,
    host_plays: 'ألعب أيضًا على هذا الجهاز', sound: 'صوت السؤال على هواتف اللاعبين', create: 'أنشئ الغرفة ▶',
    src_level: l => `المستوى ${l} (كل القصص)`, src_alpha: 'الحروف', src_numbers: 'الأرقام', src_comics: 'قصة واحدة',
    join_title: '📱 انضم إلى لعبة', code: 'رمز الغرفة', code_ph: 'مثلًا K7Q2M', name: 'اسمك', avatar: 'اختر شخصية', join_go: 'ادخل الغرفة ▶',
    err_code: 'اكتب رمز الغرفة (5 أحرف).', err_name: 'اكتب اسمك.',
    connecting: 'جارٍ الاتصال…', creating: 'جارٍ إنشاء الغرفة…', room: 'الغرفة', scan: 'امسح رمز QR أو افتح الرابط:',
    copy: '📋 نسخ', copied: 'تم النسخ ✓', players: n => `اللاعبون: ${n}`, waiting_players: 'في انتظار اللاعبين… اطلب من الجميع مسح رمز QR.',
    start: '🚀 ابدأ اللعبة', need_players: 'يلزم لاعب واحد على الأقل.', remove: 'إخراج', close_room: '✖ أغلق الغرفة',
    you_in: 'أنت في الغرفة!', wait_start: 'انتظر حتى يبدأ المضيف اللعبة…', q_of: (i, n) => `السؤال ${i} من ${n}`,
    answered: (a, b) => `أجاب: ${a} من ${b}`, sent: 'استُلمت الإجابة! في انتظار الآخرين…', time_up: '⏰ انتهى الوقت!',
    correct: n => `✅ صحيح! +${n} نقطة`, wrong: '❌ خطأ', no_answer: '⏰ لا إجابة',
    rank: (r, n) => `مركزك: ${r} من ${n}`, score: n => `${n} نقطة`, board: '🏆 المتصدّرون', next: 'السؤال التالي ▶', auto: s => `تلقائيًا بعد ${s} ث`,
    results: 'النتائج 🏁', podium: '🏆 الفائزون', again: '🔄 العب مجددًا', leave: '🚪 غادر', final_place: (r, n) => `أنهيت في المركز ${r} من ${n}!`,
    host_left: 'أنهى المضيف اللعبة أو انقطع الاتصال.', kicked: 'أخرجك المضيف من الغرفة.',
    err_room: 'لم يُعثر على الغرفة. تحقّق من الرمز — أو ربما أغلق المضيف اللعبة.', err_net: 'تعذّر الاتصال. يلزم اتصال بالإنترنت ومتصفح حديث.',
    local_warn: '⚠️ الصفحة مفتوحة من ملف — لن تتمكن الهواتف من الانضمام برمز QR. افتح اللعبة على https://bilohash.com/comiks/',
    host_name: 'المضيف', back: '→ رجوع', you: 'أنت',
    src_cat: c => `الموضوع: ${c}`, live: '⏱️ من أجاب', q_stats: '⏱️ الإجابات عن هذا السؤال', stats_title: '📊 إحصائيات التلاميذ',
    t_name: 'التلميذ', t_answer: 'الإجابة', t_time: 'الوقت', t_points: 'النقاط', t_correct: 'صحيحة', t_avg: 'متوسط الوقت', t_best: 'الأسرع', t_rank: 'المركز', teacher_hint: 'نصيحة للمعلّمين: اترك «ألعب أيضًا» غير محدّد — لترى التصنيف وسرعة التلاميذ.',
    random_room: '🎲 غرفة عشوائية', random_hint: 'بنقرة واحدة: خليط من الكلمات والصور والقواعد والساعة والأرقام — لا حاجة لمعرفة القصص.',
    src_mix: '🎲 خليط من كل شيء (دون معرفة القصص)', src_clock: '🕒 كم الساعة؟', src_grammar: '📐 القواعد (كل المواضيع)', topic: 'الموضوع',
    read_first: '📖 اقرأوا القصة معًا أولًا — ثم تُضاف أسئلة «من قال هذا؟»', story_mode: 'قبل اللعبة', sm_none: '🚀 مباشرة إلى الأسئلة', sm_read: '📖 اقرأوا القصة معًا أولًا',
    fair_hint: '✅ الأسئلة عادلة للجميع — بلا أسماء ولا حفظ: كلمات بالسمع، صور ورموز، لقطات من القصص (الإجابة ظاهرة في الرسم)، قواعد، الساعة والأرقام.',
    story_title: '📖 القراءة معًا', story_of: (i, n) => `اللقطة ${i} من ${n}`, story_next: '◀ التالي', story_prev: 'السابق ▶', story_go: '🚀 إلى الأسئلة', story_wait: 'اقرأ واستمع جيدًا — الأسئلة قادمة!', story_play: '🔊 استمع إلى اللقطة'
  };
  const g = (k, ...a) => { const tbl = GT[C().ui] || GT.en || GT.uk; const v = k in tbl ? tbl[k] : (GT.en || GT.uk)[k]; return typeof v === 'function' ? v(...a) : v; };
  const PREFIX = 'komiks-lab-room-';
  const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const AVATARS = ['🦊', '🐼', '🐸', '🦁', '🐧', '🐙', '🦄', '🐝', '🐢', '🐬', '🦉', '🐻', '🐯', '🐨', '🦖', '🐳'];
  // У грі немає питань за іменами («Хто сказав?» зі списком імен) — учасники можуть не знати історію.
  // Замість них — «speaker»: видно намальований кадр із репліками, а варіанти — портрети без імен.
  const MULTI_TYPES = new Set(['speaker', 'panel', 'listen', 'picture', 'blank', 'letter', 'firstletter', 'number', 'numword', 'clock', 'grammar', 'emoji', 'math']);
  // питання, для яких треба знати сюжет, — лише після спільного читання коміксу
  const STORY_TYPES = new Set(['speaker', 'panel']);
  const LETTERS = ['A', 'B', 'C', 'D'];
  const EN_Q = { emoji: ['What is this?', '🇬🇧 Words'], listen: ['Listen and choose the word', '🇬🇧 Listening'] };
  const EXTRA_Q = { math: ['Hvor mye blir det?', '🧮 Matte'], clock: ['Hva er klokka?', '🕒 Klokka'], grammar: ['Velg riktig ord', '📐 Grammatikk'], speaker: ['Se på ruten: hvem sier dette?', '🗣️ Bilde'] };
  const genCode = () => Array.from({ length: 5 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  const joinUrl = code => location.href.split('#')[0].split('?')[0] + '#/join/' + code;

  /* ---------------- бібліотеки (вантажимо лише для гри) ---------------- */
  let libs = null;
  function loadLibs() {
    if (libs) return libs;
    const v = (window.KOMIKS_DATA || {}).version || '';
    const load = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src + (v ? '?v=' + v : ''); s.onload = res; s.onerror = () => rej(new Error(src)); document.head.appendChild(s); });
    libs = Promise.all([window.Peer ? null : load('assets/vendor/peerjs.min.js'), window.qrcode ? null : load('assets/vendor/qrcode.js')]).catch(e => { libs = null; throw e; });
    return libs;
  }

  /* ---------------- поточна сесія ---------------- */
  let session = null;
  function endSession() { if (session) { try { session.destroy(); } catch { /* ignore */ } session = null; } gameMode(null); }
  // під час гри ховаємо шапку/футер, а на телефоні вміщуємо питання в один екран
  function gameMode(phase) {
    const b = document.body, was = b.classList.contains('game-fit');
    const inGame = !!phase && !['creating', 'connecting', 'error', 'kicked'].includes(phase);
    const fit = phase === 'question' || phase === 'reveal' || phase === 'story';
    b.classList.toggle('in-game', inGame);
    const M = window.KomiksMusic;
    if (M) { if (!phase || phase === 'error' || phase === 'kicked') M.stop(); else if (phase === 'lobby') M.play('lobby'); else if (phase === 'question' || phase === 'reveal' || phase === 'story') M.play('quiz'); }
    const mb = document.querySelector('.game-music');
    if (M && inGame && !mb) document.body.append(M.button('game-music')); else if (!inGame && mb) mb.remove();
    b.classList.toggle('game-fit', fit);
    if (fit && !was) window.scrollTo(0, 0);
  }
  function onRoute(view) { if (session && view !== 'game' && view !== 'join') endSession(); }

  /* ---------------- питання: серіалізація та показ ---------------- */
  const clockQuestions = (n, easy) => (window.KomiksGrammar ? window.KomiksGrammar.clock(n, easy) : []);
  // режим сюжетних питань для окремого коміксу: none | read (читаємо разом) | review (повторення)
  const storyModeOf = cfg => cfg.storyMode || (cfg.readFirst === false ? 'none' : 'read');
  // «Hvem sier dette?» — відповідь видно на малюнку: репліка в бульбашці над потрібним персонажем
  function speakerQuestions(comics, n) {
    const K = C();
    const nOpt = K.settings.level === 'kids' ? 3 : 4;
    const pool = [];
    comics.forEach(c => c.panels.forEach((p, pi) => {
      const chars = ((p.art || {}).chars || []).map(x => x.id).filter(id => K.CH[id]);
      if (chars.length < 2) return;
      p.lines.forEach(l => { if (chars.includes(l.who) && l.no.length > 6) pool.push({ c, pi, line: l, chars }); });
    }));
    return K.shuffle(pool).slice(0, n).map(x => ({
      type: 'speaker', c: x.c, pi: x.pi, line: Object.assign({ pi: x.pi }, x.line),
      answer: x.line.who, options: K.shuffle([x.line.who, ...K.sample(x.chars.filter(id => id !== x.line.who), nOpt - 1)])
    }));
  }
  const comicsOf = src => {
    const K = C();
    if (src === 'mix') return K.COMICS;
    if (src.startsWith('level:')) return K.COMICS.filter(c => c.level === src.slice(6));
    if (src.startsWith('cat:')) return K.COMICS.filter(c => c.category === src.slice(4));
    return K.COMICS.filter(c => c.id === src);
  };
  const grammarQs = (topic, n) => { const G = window.KomiksGrammar; return G ? G.questions(topic, n) : []; };
  const wordQs = (theme, n) => { const Wd = window.KomiksWords; return Wd ? Wd.questions(theme, n) : []; };
  // рівномірно перемішуємо типи, щоб не було 5 однакових питань поспіль
  function interleave(qs, count) {
    const K = C(), buckets = new Map();
    K.shuffle(qs).forEach(q => { if (!buckets.has(q.type)) buckets.set(q.type, []); buckets.get(q.type).push(q); });
    const out = [];
    let last = null;
    while (out.length < count && buckets.size) {
      const types = K.shuffle([...buckets.keys()]);
      const tp = types.find(x => x !== last) || types[0];
      const b = buckets.get(tp);
      out.push(b.pop()); last = tp;
      if (!b.length) buckets.delete(tp);
    }
    return out;
  }
  function makeQuestions(cfg) {
    const K = C();
    const src = cfg.source, want = cfg.count;
    const story = storyModeOf(cfg) === 'read' && K.COMICS.some(x => x.id === src);
    let qs = [];
    if (src === 'alphabet') for (let k = 0; k < 4; k++) qs.push(...K.buildAlphabetQuiz());
    else if (src === 'numbers') for (let k = 0; k < 4; k++) qs.push(...K.buildNumbersQuiz());
    else if (src === 'clock') qs = clockQuestions(want * 2, false);
    else if (src === 'grammar' || src.startsWith('gram:')) qs = grammarQs(src === 'grammar' ? null : src.slice(5), want * 2);
    else if (src === 'words' || src.startsWith('word:')) qs = wordQs(src === 'words' ? null : src.slice(5), want * 2);
    else if (src.startsWith('math:')) qs = window.KomiksMath ? window.KomiksMath.questions(src.slice(5), want * 2, 20) : [];
    else if (src === 'en-words' || src.startsWith('en-word:')) qs = window.KomiksEnglish ? window.KomiksEnglish.wordQuestions(src === 'en-words' ? null : src.slice(8), want * 2) : [];
    else {
      const comics = comicsOf(src);
      qs.push(...speakerQuestions(comics, Math.ceil(want / 4)));
      const rounds = Math.max(1, Math.min(8, Math.ceil(want * 3 / Math.max(1, comics.length * 8))));
      for (let k = 0; k < rounds; k++) comics.forEach(c => qs.push(...K.buildComicQuiz(c)));
      const easy = src === 'level:A1' || K.settings.level === 'kids';
      const withClock = src === 'mix' || src === 'level:A1' || src === 'level:A2' || src === 'cat:hverdag' || src === 'p104';
      if (withClock) qs.push(...clockQuestions(Math.ceil(want / (src === 'p104' ? 2 : 5)), easy));
      const lvl = src.startsWith('level:') ? src.slice(6) : src === 'mix' ? null : (comics[0] || {}).level;
      if (!story) { qs.push(...grammarQs(lvl ? 'level:' + lvl : null, Math.ceil(want / 4))); qs.push(...wordQs(lvl ? 'level:' + lvl : null, Math.ceil(want / 3))); }
      if (src === 'mix') { qs.push(...K.sample(K.buildNumbersQuiz(), 2), ...K.sample(K.buildAlphabetQuiz(), 2)); }
    }
    qs = qs.filter(q => MULTI_TYPES.has(q.type));
    const seen = new Set();
    qs = qs.filter(q => { const key = q.type + '|' + JSON.stringify(q.line ? q.line.no : q.item || q.n || q.sentence || (q.hh + ':' + q.mm)) + '|' + (q.word || ''); if (seen.has(key)) return false; seen.add(key); return true; });
    let out = interleave(qs, want);
    if (story) { // після спільного читання — питання про кадри першими, поки історія свіжа
      out = [...out.filter(q => STORY_TYPES.has(q.type)), ...out.filter(q => !STORY_TYPES.has(q.type))];
    }
    return out.map(q => ({ full: q, pub: publicQ(q), answer: answerIndex(q) }));
  }
  function answerIndex(q) { return q.type === 'truefalse' ? (q.answer ? 0 : 1) : q.options.indexOf(q.answer); }
  function publicQ(q) {
    const K = C();
    const o = { type: q.type };
    if (q.c) o.c = q.c.id;
    if (q.line) o.line = { no: q.line.no, uk: q.line.uk, en: q.line.en, who: q.line.who, pi: q.line.pi };
    if (q.type === 'truefalse') { o.options = [true, false]; o.statement = q.statement; }
    else o.options = q.options;
    if (q.type === 'speaker') o.pi = q.pi;
    if (q.lang) o.lang = q.lang;
    if (q.type === 'math') { o.expr = q.expr; o.a = q.a; o.b = q.b; o.op = q.op; o.askText = q.askText; }
    if (q.type === 'listen') o.say = q.item.no;
    if (q.type === 'emoji') o.emoji = q.item.emoji;
    if (q.type === 'picture') o.pict = q.item.type;
    if (q.type === 'blank') { const at = q.line.no.indexOf(q.word); o.before = q.line.no.slice(0, at); o.after = q.line.no.slice(at + q.word.length); delete o.line.no; o.sayLine = q.line.no; }
    if (q.type === 'letter') o.say = q.item[1];
    if (q.type === 'firstletter') { o.say = q.item[2]; o.emoji = q.item[3]; o.mask = '?' + q.item[2].slice(1).replace(/./g, '_'); }
    if (q.type === 'number') o.say = K.B.numberWord(q.n);
    if (q.type === 'numword') o.show = K.B.numberWord(q.n);
    if (q.type === 'clock') o.time = q.hh + ':' + String(q.mm).padStart(2, '0');
    if (q.type === 'grammar') { o.before = q.before; o.after = q.after; o.sentence = q.sentence; o.topic = q.topic; }
    return o;
  }
  function sayOf(pq) { return pq.askText || pq.say || pq.sayLine || pq.sayText || (pq.line && pq.line.no) || pq.show || ''; }
  function playQ(pq) { const K = C(); const text = sayOf(pq); if (!text) return; K.claim().then(() => K.Speech.speak(text, (pq.line && pq.line.who) || 'narrator', { rate: 0.9, lang: pq.lang || 'no' })); }

  function questionView(pq, { onChoose = null, choice = null, reveal = null, counts = null, big = false } = {}) {
    const K = C(), { h } = K;
    const comic = pq.c ? K.COMICS.find(x => x.id === pq.c) : null;
    const [title, tag] = (pq.lang === 'en' && EN_Q[pq.type]) || K.QNO[pq.type] || EXTRA_Q[pq.type] || ['', ''];
    const playBtn = h('button', { class: 'big-play', type: 'button', 'aria-label': 'Lytt', onclick: () => playQ(pq) }, '🔊');
    let prompt;
    if (pq.type === 'speaker') prompt = [comic ? h('div', { class: 'panel-mini speaker-pic' }, K.panelView(comic, pq.pi, { bubbles: true })) : null, playBtn, h('div', { class: 'say' }, '«', K.wordSpans(comic, pq.line.no), '»')];
    else if (pq.type === 'who' || pq.type === 'panel') prompt = [playBtn, h('div', { class: 'say' }, '«', K.wordSpans(comic, pq.line.no), '»')];
    else if (pq.type === 'listen' || pq.type === 'letter' || pq.type === 'number') prompt = [playBtn];
    else if (pq.type === 'picture') prompt = [h('div', { class: 'pict' }, K.svgEl(K.ART ? K.ART.propSVG(pq.pict) : '<svg/>'))];
    else if (pq.type === 'blank') prompt = [playBtn, h('div', { class: 'say' }, K.wordSpans(comic, pq.before), h('span', { class: 'blank' }, reveal != null ? pq.options[reveal] : '?'), K.wordSpans(comic, pq.after))];
    else if (pq.type === 'truefalse') prompt = [comic ? h('div', { class: 'panel-mini' }, K.panelView(comic, pq.line.pi, { bubbles: false })) : null, h('div', { class: 'say' }, K.wordSpans(comic, pq.statement))];
    else if (pq.type === 'firstletter') prompt = [playBtn, h('div', { class: 'say big' }, pq.emoji + ' ' + pq.mask)];
    else if (pq.type === 'numword') prompt = [h('div', { class: 'say big' }, pq.show)];
    else if (pq.type === 'emoji') prompt = [h('div', { class: 'emoji-big' }, pq.emoji)];
    else if (pq.type === 'math') prompt = [h('div', { class: 'math-expr' }, pq.expr + ' = ?'), window.KomiksMath ? h('div', { class: 'mul-pic' }, K.svgEl(window.KomiksMath.pictureSVG(pq.a, pq.op, pq.b))) : null];
    else if (pq.type === 'clock') prompt = [h('div', { class: 'pict clock-pict' }, K.svgEl(window.KomiksGrammar.clockSVG(pq.time)))];
    else if (pq.type === 'grammar') prompt = [h('span', { class: 'gram-q-ico' }, '📐'), h('div', { class: 'say' }, K.wordSpans(null, pq.before), h('span', { class: 'blank' }, reveal != null ? pq.options[reveal] : '___'), K.wordSpans(null, pq.after)), reveal != null ? h('button', { class: 'big-play', type: 'button', 'aria-label': 'Lytt', onclick: () => K.claim().then(() => K.Speech.speak(pq.sentence, 'narrator', { rate: 0.9 })) }, '🔊') : null];
    const total = counts ? counts.reduce((a, b) => a + b, 0) : 0;
    const optLabel = (o, k) => {
      // портрет без імені: емодзі-аватар + «hun/han» — щоб не треба було знати персонажів
      if (pq.type === 'speaker' || pq.type === 'who') return h('span', { class: 'ava big-ava', style: { background: K.ch(o).color } }, K.ch(o).emoji);
      if (pq.type === 'panel') return [h('span', { class: 'badge' }, LETTERS[k]), comic ? K.panelView(comic, o, { bubbles: false }) : String(o)];
      if (pq.type === 'truefalse') return h('span', {}, o ? K.NO.true : K.NO.false);
      if (['letter', 'firstletter', 'number', 'numword', 'math'].includes(pq.type)) return h('span', { class: 'big-letter' }, String(o));
      return ['picture', 'emoji'].includes(pq.type) || pq.lang === 'en' ? h('span', {}, String(o)) : K.hoverWords(comic, String(o));
    };
    const shape = ['g-red', 'g-blue', 'g-yellow', 'g-green'];
    const opts = h('div', { class: 'opts game-opts' + (pq.type === 'panel' ? ' pics' : '') + (pq.options.length === 2 ? ' two' : '') + (onChoose && choice == null && reveal == null ? '' : ' locked') },
      pq.options.map((o, k) => {
        const cls = ['opt', shape[k % 4], pq.type === 'panel' ? 'pic' : '', ['listen', 'picture', 'blank', 'grammar', 'clock'].includes(pq.type) ? 'word' : ''];
        if (choice === k) cls.push('chosen');
        if (reveal != null) cls.push(k === reveal ? 'good' : choice === k ? 'bad' : 'dim');
        return h('button', { class: cls.join(' '), type: 'button', onclick: () => { if (onChoose && choice == null && reveal == null) onChoose(k); } },
          optLabel(o, k), counts ? h('span', { class: 'vote-count' }, counts[k] || 0) : null,
          counts && total ? h('i', { class: 'vote-bar', style: { width: Math.round((counts[k] || 0) / total * 100) + '%' } }) : null);
      }));
    return h('div', { class: 'q-card game-q' + (big ? ' big' : '') }, window.KomiksIcons ? window.KomiksIcons.chip(pq.type, tag) : h('span', { class: 'q-type' }, tag), K.withTr(h('h3', { class: 'q-title' }, title), K.qtr(pq.type)), h('div', { class: 'q-prompt' + (pq.type === 'picture' ? ' center' : '') }, prompt), opts);
  }

  function playPanel(c, idx) {
    const K = C();
    K.claim().then(async () => { for (const l of c.panels[idx].lines) { if (l.who === 'sfx') continue; await K.Speech.speak(l.no, l.who); } });
  }
  function storyView(c, idx, controls) {
    const K = C(), { h } = K;
    const lines = c.panels[idx].lines.filter(l => l.who !== 'sfx');
    return h('div', { class: 'story-view' },
      h('div', { class: 'story-pic' }, K.panelView(c, idx, { bubbles: true })),
      h('ul', { class: 'story-lines' }, lines.map(l => h('li', {}, h('b', { style: { color: K.ch(l.who).color } }, K.ch(l.who).emoji + ' ' + K.ch(l.who).no + ': '), K.withTr(h('span', {}, K.wordSpans(c, l.no)), K.both(l.uk, l.en))))),
      h('div', { class: 'story-ctrl' }, h('button', { class: 'btn', type: 'button', onclick: () => playPanel(c, idx) }, g('story_play')), ...(controls || [])));
  }
  function sourceLabel(src) {
    const K = C();
    if (src === 'mix') return g('src_mix');
    if (src === 'clock') return g('src_clock');
    if (src === 'alphabet') return g('src_alpha');
    if (src === 'numbers') return g('src_numbers');
    if (src === 'grammar') return g('src_grammar');
    if (src.startsWith('gram:')) { const G = window.KomiksGrammar; return '📐 ' + (G ? G.label(src.slice(5)) : src.slice(5)); }
    if (src.startsWith('math:')) return { 'math:mul': '🧮 ✖️ ×', 'math:add': '🧮 ➕ + −', 'math:all': '🧮 + − × ÷' }[src] || src;
    if (src === 'en-words') return '🇬🇧 English: all words';
    if (src.startsWith('en-word:')) { const th = window.WORDS && window.WORDS.themes.find(x => x.id === src.slice(8)); return th ? `🇬🇧 ${th.icon} ${th.en}` : src; }
    if (src === 'words') return '📝 ' + (window.KomiksWords ? window.KomiksWords.text('all_test').replace(/^🧩\s*/, '') : 'Ord');
    if (src.startsWith('word:')) { const Wd = window.KomiksWords; return Wd ? Wd.label(src.slice(5)) : src.slice(5); }
    if (src.startsWith('level:')) return g('src_level', src.slice(6));
    if (src.startsWith('cat:')) return g('src_cat', K.catLabel(src.slice(4)));
    const c = K.COMICS.find(x => x.id === src);
    return c ? `${c.level} · ${c.title}` : src;
  }
  function boardView(board, meId, limit = 5) {
    const { h } = C();
    return h('ol', { class: 'board' }, board.slice(0, limit).map((p, i) => h('li', { class: (p.pid === meId ? 'me ' : '') + (i < 3 ? 'top' + (i + 1) : '') },
      h('span', { class: 'b-rank' }, i + 1), h('span', { class: 'b-ava' }, AV(p.avatar, { size: 30 })), h('span', { class: 'b-name' }, p.name), p.gained ? h('span', { class: 'b-gain' }, '+' + p.gained) : null, h('b', { class: 'b-score' }, p.score))));
  }
  // живі аватари (SVG) — якщо модуль завантажено; інакше емодзі
  const AV = (emoji, opts) => (window.KomiksAvatars ? window.KomiksAvatars.el(emoji, opts) : document.createTextNode(emoji));
  function stageView(board, meId) {
    if (!window.KomiksAvatars) return podiumView(board);
    return window.KomiksAvatars.podium(board, { meId, you: g('you'), fmt: n => g('score', n), place: (r, n) => g('final_place', r, n), show: true });
  }
  function podiumView(board) {
    const { h } = C();
    const order = [1, 0, 2].map(i => board[i]).filter(Boolean);
    return h('div', { class: 'podium' }, order.map(p => { const place = board.indexOf(p) + 1; return h('div', { class: 'pod pod-' + place }, h('span', { class: 'pod-ava' }, window.KomiksAvatars ? window.KomiksAvatars.base(p.avatar) : p.avatar), h('b', {}, p.name), h('small', {}, g('score', p.score)), h('div', { class: 'pod-step' }, place)); }));
  }
  function timerView(deadline, duration) {
    const { h } = C();
    const num = h('b', {}, Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    const bar = h('i', { style: { width: '100%' } });
    const el = h('div', { class: 'g-timer' }, num, h('div', { class: 'bar' }, bar));
    const tick = () => {
      if (!el.isConnected) return;
      const left = Math.max(0, deadline - Date.now());
      num.textContent = Math.ceil(left / 1000);
      bar.style.width = (left / (duration * 1000) * 100) + '%';
      el.classList.toggle('hurry', left < 5000);
      if (left > 0) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return el;
  }
  const errorBox = (text, back = '#/game') => { const { h } = C(); return h('div', { class: 'q-card result' }, h('div', { style: { fontSize: '3.5rem' } }, '😕'), h('h2', {}, text), h('a', { class: 'btn primary', href: back }, g('back'))); };

  /* ================= ВЕДУЧИЙ ================= */
  function startHost(cfg) {
    const K = C(), { h } = K;
    const root = h('section', { class: 'game host' });
    const S = { role: 'host', view: 'game', root, cfg, code: genCode(), peer: null, phase: 'creating', error: null, players: new Map(), qs: [], i: -1, answers: new Map(), qStart: 0, timer: null, autoTimer: null, lastReveal: null, board: [] };
    session = S;
    const u = K.currentUser();
    if (cfg.hostPlays) S.players.set('host', { pid: 'host', name: (u && u.name) || g('host_name'), avatar: '👑', score: 0, online: true, local: true });

    const newStats = () => ({ answered: 0, correct: 0, sumMs: 0, bestMs: null });
    S.players.forEach(p => { p.stats = newStats(); });
    const online = () => [...S.players.values()].filter(p => p.online);
    const sec = ms => (ms / 1000).toFixed(1) + ' s';
    const lobbyList = () => [...S.players.values()].map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, online: p.online, score: p.score }));
    const send = (p, msg) => { if (p.conn && p.conn.open) { try { p.conn.send(msg); } catch { /* ignore */ } } };
    const broadcast = msg => S.players.forEach(p => send(p, msg));
    const ranking = () => [...S.players.values()].sort((a, b) => b.score - a.score).map(p => ({ pid: p.pid, name: p.name, avatar: p.avatar, score: p.score, gained: p.gained || 0, fc: p.fc || '', correct: (p.stats && p.stats.correct) || 0, answered: (p.stats && p.stats.answered) || 0 }));

    S.destroy = () => { clearInterval(S.timer); clearInterval(S.autoTimer); broadcast({ t: 'closed' }); setTimeout(() => { try { S.peer && S.peer.destroy(); } catch { /* ignore */ } }, 150); };

    function openPeer() {
      S.peer = new window.Peer(PREFIX + S.code, { debug: 0 });
      S.peer.on('open', () => { S.phase = 'lobby'; draw(); });
      S.peer.on('error', err => {
        if (err.type === 'unavailable-id') { try { S.peer.destroy(); } catch { /* ignore */ } S.code = genCode(); openPeer(); return; }
        if (S.phase === 'creating') { S.phase = 'error'; S.error = g('err_net'); draw(); }
      });
      S.peer.on('connection', conn => {
        conn.on('data', msg => onMessage(conn, msg));
        conn.on('close', () => { for (const p of S.players.values()) if (p.conn === conn) { p.online = false; } broadcast({ t: 'lobby', players: lobbyList() }); draw(); checkAllAnswered(); });
      });
    }
    function onMessage(conn, msg) {
      if (!msg || typeof msg !== 'object') return;
      if (msg.t === 'hello') {
        const pid = String(msg.pid || '').slice(0, 40); if (!pid || pid === 'host') return;
        const prev = S.players.get(pid);
        const p = { pid, name: String(msg.name || '?').slice(0, 20), avatar: (window.KomiksAvatars ? window.KomiksAvatars.valid(msg.avatar) : AVATARS.includes(msg.avatar)) ? msg.avatar : '🙂', score: prev ? prev.score : 0, stats: prev ? prev.stats : newStats(), conn, online: true, fc: /^[A-HJ-NP-Z2-9]{6}$/.test(msg.fc || '') ? msg.fc : '' };
        S.players.set(pid, p);
        send(p, { t: 'welcome', code: S.code, pid });
        broadcast({ t: 'lobby', players: lobbyList() });
        if (S.phase === 'story') send(p, storyMsg());
        if (S.phase === 'question') send(p, questionMsg());
        if (S.phase === 'reveal' && S.lastReveal) send(p, revealMsgFor(p));
        if (S.phase === 'end') send(p, { t: 'end', board: S.board, id: S.gameId, topic: sourceLabel(S.cfg.source), total: S.qs.length });
        K.Sfx.tick();
        draw();
      } else if (msg.t === 'answer') {
        const p = [...S.players.values()].find(x => x.conn === conn);
        if (p) answer(p, msg.i, msg.choice);
      }
    }
    function answer(p, i, choice) {
      if (S.phase !== 'question' || i !== S.i || S.answers.has(p.pid)) return;
      const k = parseInt(choice, 10);
      if (!(k >= 0 && k < S.qs[S.i].pub.options.length)) return;
      S.answers.set(p.pid, { choice: k, ms: Date.now() - S.qStart });
      draw();
      checkAllAnswered();
    }
    function checkAllAnswered() { if (S.phase === 'question' && online().length && online().every(p => S.answers.has(p.pid))) reveal(); }
    const questionMsg = () => ({ t: 'question', i: S.i, total: S.qs.length, q: S.qs[S.i].pub, duration: S.cfg.time, left: Math.max(0, S.cfg.time * 1000 - (Date.now() - S.qStart)), sound: S.cfg.sound });

    const storyComic = () => (storyModeOf(S.cfg) === 'read' ? K.COMICS.find(c => c.id === S.cfg.source) : null);
    const storyMsg = () => ({ t: 'story', c: S.cfg.source, idx: S.storyIdx, total: storyComic().panels.length });
    function startGame() {
      S.qs = makeQuestions(S.cfg);
      S.gameId = S.code + '-' + Date.now().toString(36);
      S.players.forEach(p => { p.score = 0; p.gained = 0; p.stats = newStats(); });
      S.i = -1;
      if (storyComic()) { S.phase = 'story'; S.storyIdx = 0; broadcast(storyMsg()); draw(); playPanel(storyComic(), 0); return; }
      nextQuestion();
    }
    function storyGo(d) {
      const c = storyComic();
      S.storyIdx += d;
      if (S.storyIdx < 0) S.storyIdx = 0;
      if (S.storyIdx >= c.panels.length) { K.stopAll(); return nextQuestion(); }
      broadcast(storyMsg()); draw(); playPanel(c, S.storyIdx);
    }
    S.storyGo = storyGo;
    function nextQuestion() {
      clearInterval(S.autoTimer);
      S.i++;
      if (S.i >= S.qs.length) return end();
      S.phase = 'question'; S.answers = new Map(); S.qStart = Date.now();
      S.players.forEach(p => { p.gained = 0; });
      broadcast(questionMsg());
      draw();
      playQ(S.qs[S.i].pub);
      clearInterval(S.timer);
      S.timer = setInterval(() => { if (Date.now() - S.qStart >= S.cfg.time * 1000) reveal(); }, 250);
    }
    function reveal() {
      if (S.phase !== 'question') return;
      clearInterval(S.timer);
      const q = S.qs[S.i];
      const counts = q.pub.options.map(() => 0);
      S.answers.forEach(a => { counts[a.choice]++; });
      S.players.forEach(p => {
        const a = S.answers.get(p.pid);
        p.lastChoice = a ? a.choice : null;
        p.lastMs = a ? a.ms : null;
        p.lastCorrect = !!a && a.choice === q.answer;
        if (!p.stats) p.stats = newStats();
        if (a) { p.stats.answered++; p.stats.sumMs += a.ms; p.stats.bestMs = p.stats.bestMs == null ? a.ms : Math.min(p.stats.bestMs, a.ms); if (p.lastCorrect) p.stats.correct++; }
        p.gained = p.lastCorrect ? 500 + Math.round(500 * Math.max(0, 1 - a.ms / (S.cfg.time * 1000))) : 0;
        p.score += p.gained;
      });
      S.board = ranking();
      S.lastReveal = { counts };
      S.phase = 'reveal';
      S.players.forEach(p => send(p, revealMsgFor(p)));
      K.Sfx.good();
      if (q.full && q.full.sayText) { const said = q.full.sayText; setTimeout(() => { if (S.phase === 'reveal') K.claim().then(() => K.Speech.speak(said, 'narrator', { rate: 0.9 })); }, 350); }
      draw();
      let left = 12;
      S.autoLeft = left;
      clearInterval(S.autoTimer);
      S.autoTimer = setInterval(() => { left--; S.autoLeft = left; const el = root.querySelector('.auto-left'); if (el) el.textContent = g('auto', left); if (left <= 0) nextQuestion(); }, 1000);
    }
    function revealMsgFor(p) {
      const q = S.qs[S.i];
      return { t: 'reveal', i: S.i, total: S.qs.length, q: q.pub, correct: q.answer, counts: S.lastReveal.counts, board: S.board.slice(0, 5), you: { choice: p.lastChoice, correct: p.lastCorrect, gained: p.gained, score: p.score, rank: S.board.findIndex(b => b.pid === p.pid) + 1, total: S.board.length } };
    }
    function end() {
      clearInterval(S.timer); clearInterval(S.autoTimer);
      S.phase = 'end'; S.board = ranking().map(b => { const st = (S.players.get(b.pid) || {}).stats || {}; return Object.assign(b, { correct: st.correct || 0, answered: st.answered || 0, sumMs: Math.round(st.sumMs || 0) }); });
      const topic = sourceLabel(S.cfg.source);
      broadcast({ t: 'end', board: S.board, id: S.gameId, topic, total: S.qs.length });
      if (window.KomiksExtras) window.KomiksExtras.saveGame({ id: S.gameId, topic, total: S.qs.length, board: S.board });
      K.confetti(); K.Sfx.win(); K.bump('games');
      draw();
    }

    function qStatsTable(q) {
      const rows = [...S.players.values()].sort((a, b) => (a.lastMs == null) - (b.lastMs == null) || (a.lastMs || 0) - (b.lastMs || 0));
      return h('div', { class: 'table-wrap' }, h('table', { class: 'checktable stats-table' },
        h('thead', {}, h('tr', {}, h('th', {}, g('t_name')), h('th', {}, g('t_answer')), h('th', {}, g('t_time')), h('th', {}, g('t_points')))),
        h('tbody', {}, rows.map(p => h('tr', { class: p.lastCorrect ? 'ok' : p.lastChoice == null ? '' : 'no' }, h('td', {}, h('span', { class: 'td-av' }, AV(p.avatar, { size: 26 }), ' ' + p.name)),
          h('td', {}, p.lastChoice == null ? '—' : (LETTERS[p.lastChoice] || '?') + ' ' + (p.lastCorrect ? '✔' : '✘')), h('td', {}, p.lastMs == null ? '—' : sec(p.lastMs)), h('td', {}, '+' + (p.gained || 0)))))));
    }
    function finalStatsTable() {
      return h('div', { class: 'table-wrap' }, h('table', { class: 'checktable stats-table' },
        h('thead', {}, h('tr', {}, h('th', {}, g('t_rank')), h('th', {}, g('t_name')), h('th', {}, g('t_correct')), h('th', {}, g('t_avg')), h('th', {}, g('t_best')), h('th', {}, g('t_points')))),
        h('tbody', {}, S.board.map((b, i) => { const p = S.players.get(b.pid) || { stats: newStats() }; const st = p.stats || newStats(); return h('tr', {}, h('td', {}, i + 1), h('td', {}, h('span', { class: 'td-av' }, AV(b.avatar, { size: 26 }), ' ' + b.name)), h('td', {}, `${st.correct} / ${S.qs.length}`), h('td', {}, st.answered ? sec(st.sumMs / st.answered) : '—'), h('td', {}, st.bestMs == null ? '—' : sec(st.bestMs)), h('td', {}, h('b', {}, b.score))); }))));
    }
    function draw() {
      if (session !== S) return;
      gameMode(S.phase);
      const kids = [];
      const head = h('div', { class: 'q-head' }, h('a', { class: 'btn', href: '#/game', onclick: () => endSession() }, g('close_room')), h('h2', {}, g('title')), S.code && S.phase !== 'creating' ? h('span', { class: 'room-code small' }, S.code) : null);
      kids.push(head);
      if (S.phase === 'creating') kids.push(h('p', { class: 'lead-p center' }, '⏳ ' + g('creating')));
      else if (S.phase === 'error') kids.push(errorBox(S.error));
      else if (S.phase === 'lobby') {
        const url = joinUrl(S.code);
        let qrSvg = '';
        try { const qr = window.qrcode(0, 'M'); qr.addData(url); qr.make(); qrSvg = qr.createSvgTag({ cellSize: 7, margin: 2, scalable: true }); } catch { /* ignore */ }
        const copyBtn = h('button', { class: 'btn small', type: 'button', onclick: async () => { try { await navigator.clipboard.writeText(url); copyBtn.textContent = g('copied'); } catch { /* ignore */ } } }, g('copy'));
        const plist = [...S.players.values()];
        kids.push(h('div', { class: 'lobby-grid' },
          h('div', { class: 'qr-box' }, h('div', { class: 'qr' }, qrSvg ? K.svgEl(qrSvg) : null),
            h('p', { class: 'hint' }, g('scan')), h('code', { class: 'join-url' }, url), copyBtn,
            h('div', { class: 'room-code' }, S.code),
            location.protocol === 'file:' ? h('p', { class: 'warn-inline' }, g('local_warn')) : null),
          h('div', { class: 'players-box' },
            h('p', { class: 'topic-chip' }, g('topic') + ': ', h('b', {}, sourceLabel(S.cfg.source)), K.COMICS.some(c => c.id === S.cfg.source) ? ' · ' + g('sm_' + storyModeOf(S.cfg)) : ''),
            h('h3', {}, g('players', plist.filter(p => p.online).length)),
            plist.length ? h('ul', { class: 'players' }, plist.map(p => h('li', { class: p.online ? '' : 'off' }, h('span', { class: 'p-ava' }, AV(p.avatar, { size: 44 })), h('span', { class: 'p-name' }, p.name),
              p.local ? null : h('button', { class: 'p-kick', type: 'button', title: g('remove'), onclick: () => { send(p, { t: 'kick' }); S.players.delete(p.pid); setTimeout(() => { try { p.conn.close(); } catch { /* ignore */ } }, 100); broadcast({ t: 'lobby', players: lobbyList() }); draw(); } }, '✕'))))
              : h('p', { class: 'hint' }, g('waiting_players')),
            h('button', { class: 'btn accent big', type: 'button', disabled: !online().length, onclick: startGame }, g('start')),
            !online().length ? h('p', { class: 'hint' }, g('need_players')) : null)));
      } else if (S.phase === 'story') {
        const c = storyComic(), last = S.storyIdx + 1 >= c.panels.length;
        kids.push(h('div', { class: 'g-bar' }, h('b', {}, g('story_title')), h('span', { class: 'answered' }, g('story_of', S.storyIdx + 1, c.panels.length))));
        kids.push(storyView(c, S.storyIdx, [
          h('button', { class: 'btn', type: 'button', disabled: S.storyIdx === 0, onclick: () => storyGo(-1) }, g('story_prev')),
          h('button', { class: 'btn accent', type: 'button', onclick: () => storyGo(1) }, last ? g('story_go') : g('story_next')),
          last ? null : h('button', { class: 'btn small', type: 'button', onclick: () => { S.storyIdx = c.panels.length - 1; storyGo(1); } }, g('story_go'))]));
      } else if (S.phase === 'question') {
        const q = S.qs[S.i];
        const onl = online();
        const hostP = S.players.get('host');
        kids.push(h('div', { class: 'g-bar' }, h('b', {}, g('q_of', S.i + 1, S.qs.length)), timerView(S.qStart + S.cfg.time * 1000, S.cfg.time),
          h('span', { class: 'answered' }, g('answered', S.answers.size, onl.length)),
          h('span', { class: 'answered-avas' }, onl.map(p => h('span', { class: S.answers.has(p.pid) ? 'on' : '' }, AV(p.avatar, { size: 26 }))))));
        const mine = hostP ? S.answers.get('host') : null;
        const live = [...S.answers.entries()].sort((a, b) => a[1].ms - b[1].ms).map(([id, a]) => { const p = S.players.get(id); return p ? h('li', {}, h('span', { class: 'p-ava' }, AV(p.avatar, { size: 44 })), h('span', { class: 'p-name' }, p.name), h('b', {}, sec(a.ms))) : null; });
        kids.push(h('div', { class: 'host-q-grid' }, questionView(q.pub, { big: true, onChoose: hostP ? k => answer(hostP, S.i, k) : null, choice: mine ? mine.choice : null }),
          h('div', { class: 'board-box' }, h('h3', {}, g('live')), live.length ? h('ol', { class: 'live-list' }, live) : h('p', { class: 'hint' }, '…'))));
      } else if (S.phase === 'reveal') {
        const q = S.qs[S.i];
        const hostP = S.players.get('host');
        kids.push(h('div', { class: 'g-bar' }, h('b', {}, g('q_of', S.i + 1, S.qs.length)), h('span', { class: 'answered' }, g('answered', S.answers.size, online().length))));
        kids.push(h('div', { class: 'reveal-grid' },
          questionView(q.pub, { reveal: q.answer, counts: S.lastReveal.counts, choice: hostP ? hostP.lastChoice : null }),
          h('div', { class: 'board-box' }, h('h3', {}, g('board')), boardView(S.board, 'host'),
            h('h3', {}, g('q_stats')), qStatsTable(q),
            h('button', { class: 'btn accent big', type: 'button', onclick: nextQuestion }, S.i + 1 < S.qs.length ? g('next') : g('results')),
            h('p', { class: 'hint auto-left' }, g('auto', S.autoLeft || 12)))));
      } else if (S.phase === 'end') {
        kids.push(h('div', { class: 'q-card result kh-card' }, h('h2', {}, g('podium')), stageView(S.board, null), h('h3', {}, g('stats_title')), finalStatsTable(),
          h('div', { class: 'row-center' }, h('button', { class: 'btn accent', type: 'button', onclick: () => { S.phase = 'lobby'; S.players.forEach(p => { p.score = 0; p.gained = 0; }); broadcast({ t: 'lobby', players: lobbyList(), reset: true }); draw(); } }, g('again')),
            h('a', { class: 'btn', href: '#/rating', onclick: () => endSession() }, '🏆 ' + C().navT('rating')),
            h('a', { class: 'btn', href: '#/game', onclick: () => endSession() }, g('close_room')))));
      }
      root.replaceChildren(...kids);
    }
    S.draw = draw;
    draw();
    loadLibs().then(openPeer).catch(() => { S.phase = 'error'; S.error = g('err_net'); draw(); });
    return root;
  }

  /* ================= УЧАСНИК ================= */
  function startPlayer(code, name, avatar) {
    const K = C(), { h } = K;
    const root = h('section', { class: 'game player' });
    let pid = null;
    try { pid = sessionStorage.getItem('komiks.game.pid'); if (!pid) { pid = 'p' + Math.random().toString(36).slice(2, 10); sessionStorage.setItem('komiks.game.pid', pid); } } catch { pid = 'p' + Math.random().toString(36).slice(2, 10); }
    const S = { role: 'player', view: 'join', root, code, name, avatar, pid, phase: 'connecting', players: [], q: null, choice: null, deadline: 0, duration: 20, reveal: null, board: [], error: null, peer: null, conn: null };
    session = S;
    S.destroy = () => { try { S.conn && S.conn.close(); } catch { /* ignore */ } try { S.peer && S.peer.destroy(); } catch { /* ignore */ } };
    const fail = text => { if (session !== S) return; S.phase = 'error'; S.error = text; draw(); };

    function connect() {
      S.peer = new window.Peer({ debug: 0 });
      const guard = setTimeout(() => { if (S.phase === 'connecting') fail(g('err_room')); }, 15000);
      S.peer.on('open', () => {
        S.conn = S.peer.connect(PREFIX + code, { reliable: true });
        S.conn.on('open', () => { clearTimeout(guard); S.conn.send({ t: 'hello', pid, name, avatar, fc: window.KomiksPlayers ? window.KomiksPlayers.myPublicCode() : '' }); });
        S.conn.on('data', onMessage);
        S.conn.on('close', () => { if (S.phase !== 'error' && S.phase !== 'kicked') fail(g('host_left')); });
      });
      S.peer.on('error', err => { clearTimeout(guard); fail(err.type === 'peer-unavailable' ? g('err_room') : g('err_net')); });
    }
    function onMessage(msg) {
      if (!msg || typeof msg !== 'object') return;
      if (msg.t === 'welcome') { S.phase = S.phase === 'connecting' ? 'lobby' : S.phase; K.Sfx.good(); }
      else if (msg.t === 'lobby') { S.players = msg.players || []; if (msg.reset || S.phase === 'connecting') S.phase = 'lobby'; }
      else if (msg.t === 'story') { const first = S.phase !== 'story'; S.phase = 'story'; S.story = msg; const c = K.COMICS.find(x => x.id === msg.c); if (c && (first || msg.idx !== S.storyIdx) && S.sound !== false) playPanel(c, msg.idx); S.storyIdx = msg.idx; }
      else if (msg.t === 'question') { S.phase = 'question'; S.q = msg.q; S.i = msg.i; S.total = msg.total; S.choice = null; S.duration = msg.duration; S.deadline = Date.now() + (msg.left != null ? msg.left : msg.duration * 1000); if (msg.sound) playQ(msg.q); }
      else if (msg.t === 'reveal') { S.phase = 'reveal'; S.q = msg.q; S.i = msg.i; S.total = msg.total; S.reveal = msg; if (msg.you.correct) K.Sfx.good(); else K.Sfx.bad(); }
      else if (msg.t === 'end') { S.phase = 'end'; S.board = msg.board || []; if (window.KomiksExtras && msg.id) window.KomiksExtras.saveGame({ id: msg.id, topic: msg.topic, total: msg.total, board: S.board }); const me = S.board.findIndex(b => b.pid === pid); if (me >= 0 && me < 3) { K.confetti(); K.Sfx.win(); }
        // результат гри — у профіль і чек-лист: правильні відповіді з усіх питань + місце
        if (me >= 0 && !S.recorded) { S.recorded = true; const b = S.board[me]; K.recordQuiz('game:' + String(msg.topic || 'quiz').slice(0, 40), '🎮 ' + (msg.topic || g('title')), b.correct || 0, msg.total || b.answered || 1, { place: me + 1, of: S.board.length, id: msg.id }); if (me === 0) K.bump('gameWins'); }
        K.bump('games'); }
      else if (msg.t === 'kick') { S.phase = 'kicked'; S.error = g('kicked'); }
      else if (msg.t === 'closed') { S.phase = 'error'; S.error = g('host_left'); }
      draw();
    }
    function choose(k) {
      if (S.phase !== 'question' || S.choice != null) return;
      S.choice = k;
      try { S.conn.send({ t: 'answer', i: S.i, choice: k }); } catch { /* ignore */ }
      K.Sfx.tick();
      draw();
    }
    function draw() {
      if (session !== S) return;
      gameMode(S.phase);
      const kids = [h('div', { class: 'q-head' }, h('a', { class: 'btn', href: '#/game', onclick: () => endSession() }, g('leave')), h('span', { class: 'me-chip' }, AV(avatar, { size: 28 }), name), h('span', { class: 'room-code small' }, code))];
      if (S.phase === 'connecting') kids.push(h('p', { class: 'lead-p center' }, '⏳ ' + g('connecting')));
      else if (S.phase === 'error' || S.phase === 'kicked') kids.push(errorBox(S.error));
      else if (S.phase === 'lobby') {
        kids.push(h('div', { class: 'q-card center' }, h('div', { class: 'lobby-me' }, AV(avatar, { size: 130, mood: 'cheer' })), h('h2', {}, g('you_in')), h('p', { class: 'lead-p' }, g('wait_start')),
          h('h3', {}, g('players', S.players.filter(p => p.online).length)),
          h('ul', { class: 'players' }, S.players.map(p => h('li', { class: (p.online ? '' : 'off ') + (p.pid === pid ? 'me' : '') }, h('span', { class: 'p-ava' }, AV(p.avatar, { size: 44 })), h('span', { class: 'p-name' }, p.name + (p.pid === pid ? ` (${g('you')})` : '')))))));
      } else if (S.phase === 'story') {
        const c = K.COMICS.find(x => x.id === S.story.c);
        kids.push(h('div', { class: 'g-bar' }, h('b', {}, g('story_title')), h('span', { class: 'answered' }, g('story_of', S.story.idx + 1, S.story.total))));
        kids.push(c ? storyView(c, S.story.idx, [h('span', { class: 'hint' }, g('story_wait'))]) : h('p', { class: 'lead-p center' }, '⏳'));
      } else if (S.phase === 'question') {
        kids.push(h('div', { class: 'g-bar' }, h('b', {}, g('q_of', S.i + 1, S.total)), timerView(S.deadline, S.duration)));
        kids.push(questionView(S.q, { onChoose: choose, choice: S.choice }));
        if (S.choice != null) kids.push(h('p', { class: 'sent-msg' }, g('sent')));
      } else if (S.phase === 'reveal') {
        const y = S.reveal.you;
        kids.push(h('div', { class: 'you-result ' + (y.correct ? 'ok' : 'no') }, h('b', {}, y.correct ? g('correct', y.gained) : y.choice == null ? g('no_answer') : g('wrong')),
          h('span', {}, g('score', y.score), ' · ', g('rank', y.rank, y.total))));
        kids.push(questionView(S.q, { reveal: S.reveal.correct, choice: y.choice, counts: S.reveal.counts }));
        kids.push(h('div', { class: 'board-box' }, h('h3', {}, g('board')), boardView(S.reveal.board, pid)));
      } else if (S.phase === 'end') {
        const me = S.board.findIndex(b => b.pid === pid);
        kids.push(h('div', { class: 'q-card result kh-card' }, h('h2', {}, g('podium')), stageView(S.board, pid),
          h('div', { class: 'row-center' }, h('a', { class: 'btn accent', href: '#/rating', onclick: () => endSession() }, '🏆 ' + C().navT('rating')), h('a', { class: 'btn', href: '#/game', onclick: () => endSession() }, g('leave')))));
      }
      root.replaceChildren(...kids);
    }
    S.draw = draw;
    draw();
    loadLibs().then(connect).catch(() => fail(g('err_net')));
    return root;
  }

  /* ================= СТОРІНКИ ================= */
  function renderGameHome() {
    const K = C(), { h } = K;
    const cfg = Object.assign({ source: 'mix', count: 10, time: 20, hostPlays: false, sound: true, readFirst: true }, K.store.get('gameCfg', {}));
    const levels = K.B.levels.filter(l => K.COMICS.some(c => c.level === l));
    const G = window.KomiksGrammar;
    const src = h('select', {},
      h('option', { value: 'mix', selected: cfg.source === 'mix' }, g('src_mix')),
      h('optgroup', { label: '🎓' }, levels.map(l => h('option', { value: 'level:' + l, selected: cfg.source === 'level:' + l }, g('src_level', l)))),
      h('optgroup', { label: '🏷️' }, K.uniq(K.COMICS.map(c => c.category)).filter(Boolean).map(cat => h('option', { value: 'cat:' + cat, selected: cfg.source === 'cat:' + cat }, g('src_cat', K.catLabel(cat))))),
      h('optgroup', { label: '📝' }, h('option', { value: 'words', selected: cfg.source === 'words' }, '📝 ' + (window.KomiksWords ? window.KomiksWords.text('all_test').replace(/^🧩\s*/, '') : 'Ord')), window.KomiksWords ? window.KomiksWords.themes().map(th => h('option', { value: 'word:' + th.id, selected: cfg.source === 'word:' + th.id }, th.icon + ' ' + th.no)) : null),
      window.KomiksMath ? h('optgroup', { label: '🧮' }, [['math:mul', '🧮 ✖️ ×'], ['math:add', '🧮 ➕ + −'], ['math:all', '🧮 + − × ÷']].map(([v, l]) => h('option', { value: v, selected: cfg.source === v }, l))) : null,
      window.KomiksEnglish ? h('optgroup', { label: '🇬🇧 English' }, h('option', { value: 'en-words', selected: cfg.source === 'en-words' }, '🇬🇧 English: all words'), window.WORDS ? window.WORDS.themes.map(th => h('option', { value: 'en-word:' + th.id, selected: cfg.source === 'en-word:' + th.id }, `🇬🇧 ${th.icon} ${th.en}`)) : null) : null,
      h('optgroup', { label: '📐' }, h('option', { value: 'grammar', selected: cfg.source === 'grammar' }, g('src_grammar')), G ? G.topics().map(tp => h('option', { value: 'gram:' + tp.id, selected: cfg.source === 'gram:' + tp.id }, '📐 ' + G.label(tp.id))) : null),
      h('optgroup', { label: '🔤' }, h('option', { value: 'alphabet', selected: cfg.source === 'alphabet' }, g('src_alpha')), h('option', { value: 'numbers', selected: cfg.source === 'numbers' }, g('src_numbers')), h('option', { value: 'clock', selected: cfg.source === 'clock' }, g('src_clock'))),
      h('optgroup', { label: '📚 ' + g('src_comics') }, K.COMICS.map(c => h('option', { value: c.id, selected: cfg.source === c.id }, `${c.level} · ${c.title}`))));
    const count = h('select', {}, [5, 10, 15, 20, 25, 30].map(n => h('option', { value: n, selected: cfg.count === n }, n)));
    const time = h('select', {}, [5, 10, 15, 20, 30, 45, 60].map(n => h('option', { value: n, selected: cfg.time === n }, g('sec', n))));
    const hostPlays = h('input', { type: 'checkbox', checked: cfg.hostPlays });
    const sound = h('input', { type: 'checkbox', checked: cfg.sound });
    const mode0 = storyModeOf(cfg);
    const storySel = h('select', {}, ['read', 'none'].map(m => h('option', { value: m, selected: mode0 === m }, g('sm_' + m))));
    const readRow = h('label', { class: 'field' }, h('span', {}, g('story_mode')), storySel);
    const syncRead = () => { readRow.hidden = !K.COMICS.some(c => c.id === src.value); };
    src.addEventListener('change', syncRead); syncRead();
    const create = random => {
      const c2 = { source: src.value, count: parseInt(count.value, 10), time: parseInt(time.value, 10), hostPlays: hostPlays.checked, sound: sound.checked, storyMode: storySel.value };
      K.store.set('gameCfg', c2);
      if (random) c2.source = 'mix';
      endSession();
      const root = startHost(c2);
      const app = document.getElementById('app');
      app.replaceChildren(root);
      window.scrollTo({ top: 0 });
    };
    const codeIn = h('input', { type: 'text', maxlength: 5, autocapitalize: 'characters', placeholder: g('code_ph'), class: 'code-input' });
    codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
    const [hi, ht, hd] = g('host_card'), [ji, jt, jd] = g('join_card');
    return h('section', { class: 'game-home' }, K.pageHead(g('title')),
      h('p', { class: 'lead-p' }, g('intro')),
      h('ol', { class: 'how-grid game-how' }, g('how').map((text, i) => h('li', { class: 'how-step' }, h('span', { class: 'how-num' }, i + 1), h('span', {}, text)))),
      h('div', { class: 'game-choice' },
        h('div', { class: 'box' }, h('h3', {}, `${hi} ${ht}`), h('p', { class: 'hint' }, hd), h('h4', {}, g('setup')),
          h('label', { class: 'field' }, h('span', {}, g('source')), src),
          h('div', { class: 'two-fields' }, h('label', { class: 'field' }, h('span', {}, g('count')), count), h('label', { class: 'field' }, h('span', {}, g('time')), time)),
          readRow, h('label', { class: 'check' }, hostPlays, g('host_plays')), h('label', { class: 'check' }, sound, g('sound')),
          h('p', { class: 'hint fair-hint' }, g('fair_hint')),
          h('p', { class: 'hint' }, g('teacher_hint')),
          h('button', { class: 'btn accent big', type: 'button', onclick: () => create(false) }, g('create')),
          h('button', { class: 'btn yellow big', type: 'button', title: g('random_hint'), onclick: () => create(true) }, g('random_room')),
          h('p', { class: 'hint' }, g('random_hint'))),
        h('div', { class: 'box' }, h('h3', {}, `${ji} ${jt}`), h('p', { class: 'hint' }, jd),
          h('label', { class: 'field' }, h('span', {}, g('code')), codeIn),
          h('button', { class: 'btn primary big', type: 'button', onclick: () => { if (codeIn.value.length === 5) location.hash = '#/join/' + codeIn.value; } }, g('join_go')))));
  }

  function renderJoin(code) {
    const K = C(), { h } = K;
    const u = K.currentUser();
    const saved = K.raw.get('comiks.gameProfile', {});
    let avatar = (window.KomiksProfile ? window.KomiksProfile.avatar() : saved.avatar) || K.pick(AVATARS);
    const codeIn = h('input', { type: 'text', maxlength: 5, value: (code || '').toUpperCase(), autocapitalize: 'characters', placeholder: g('code_ph'), class: 'code-input' });
    codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
    const nameIn = h('input', { type: 'text', maxlength: 20, value: saved.name || (u && u.name) || '', autocomplete: 'nickname' });
    const err = h('p', { class: 'form-err', role: 'alert' });
    const avas = window.KomiksProfile ? window.KomiksProfile.joinAvatar(a => { avatar = a; }) : window.KomiksAvatars ? window.KomiksAvatars.picker(avatar, a => { avatar = a; }) : h('div', { class: 'avatar-pick' }, AVATARS.map(a => h('button', { type: 'button', class: a === avatar ? 'on' : '', onclick: e => { avatar = a; K.$$('button', avas).forEach(b => b.classList.toggle('on', b === e.currentTarget)); } }, a)));
    const go = () => {
      const c = codeIn.value.trim(), n = nameIn.value.trim();
      if (c.length !== 5) { err.textContent = g('err_code'); return; }
      if (!n) { err.textContent = g('err_name'); return; }
      K.raw.set('comiks.gameProfile', { name: n, avatar });
      endSession();
      const root = startPlayer(c, n, avatar);
      document.getElementById('app').replaceChildren(root);
      window.scrollTo({ top: 0 });
    };
    const form = h('form', { class: 'auth box', onsubmit: e => { e.preventDefault(); go(); } },
      h('h2', {}, g('join_title')),
      h('label', { class: 'field' }, h('span', {}, g('code')), codeIn),
      h('label', { class: 'field' }, h('span', {}, g('name')), nameIn),
      h('div', { class: 'field' }, h('span', {}, g('avatar')), avas),
      err, h('button', { class: 'btn accent big', type: 'submit' }, g('join_go')));
    setTimeout(() => (codeIn.value ? nameIn : codeIn).focus(), 50);
    return h('section', { class: 'auth-wrap' }, form);
  }

  function render(view, id) {
    // активна гра переживає перемальовування (наприклад, зміну мови)
    if (session && ((view === 'game' && session.role === 'host') || (view === 'join' && session.role === 'player' && (!id || id === session.code)))) { session.draw(); return session.root; }
    if (view === 'join') return renderJoin(id);
    return renderGameHome();
  }

  const roomCode = () => (session && session.role === 'host' && session.code && !['creating', 'error'].includes(session.phase) ? session.code : null);
  window.KomiksGame = { render, onRoute, end: endSession, roomCode };
})();
