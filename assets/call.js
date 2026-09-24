/* Комікс·Lab — 📞 телефонна розмова норвезькою з вигаданим персонажем.
   Дзвінок виглядає як справжній: гудки (норвезький ритм 1 с + 4 с паузи), аватар, «Svar / Avvis».
   Розмова коротка й проста. Якщо на сервері налаштовано ключ ШІ (api/config.php → 'ai'),
   співрозмовник відповідає живим текстом; якщо ні — веде розмову за сценарієм із цього файлу.
   Голос — нейронний синтез із сервера (api/tts.php); якщо його не налаштовано, читає браузер.
   Персонажі вигадані, про це сказано в «Допомозі» і в умовах. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/call.php';
  const C = () => window.KomiksCore;

  const T = {
    uk: { title: '📞 Дзвінок норвезькою', lead: 'Коротка жива розмова телефоном. Обери, хто дзвонить і про що — і говори вголос або пиши.',
      who: 'Хто дзвонить', scene: 'Про що розмова', start: '📞 Подзвонити мені', incoming: 'Вхідний дзвінок', answer: '✅ Відповісти', decline: '✖ Відхилити',
      speak: '🎙️ Говорити', listening: '🎙️ Слухаю…', send: 'Надіслати', ph: 'Напиши відповідь норвезькою…', hint: '💡 Переклад', hang: '📵 Завершити',
      ended: '📞 Дзвінок завершено', again: '🔄 Ще один дзвінок', sum: 'Ось що прозвучало в розмові:', words: 'Нові слова з розмови',
      offer: n => `📞 ${n} дзвонить тобі!`, offer_d: 'Коротка розмова норвезькою — 1 хвилина.', later: 'Не зараз', noai: 'Розмова за сценарієм (ШІ на сервері не налаштовано).',
      mic_no: 'Мікрофон недоступний — пиши текстом.', left: n => `Реплік сьогодні: ${n}`, live: '🎧 Живий голос', live_d: 'Справжня розмова голосом: персонаж чує тебе й відповідає сам.', live_on: '🎧 Голосовий дзвінок', live_wait: 'З’єднуємо…', live_talk: 'Говори — тебе чують', live_left: n => `Голосових дзвінків сьогодні: ${n}`, mute: '🔇 Вимкнути мікрофон', unmute: '🎙️ Увімкнути мікрофон', text_mode: '⌨️ Писати текстом',
      err: { rt_limit: 'Голосові дзвінки на сьогодні вичерпано — далі можна писати текстом.', realtime: 'Не вдалося підняти голосовий дзвінок. Спробуй ще раз або пиши текстом.', no_realtime: 'Голосовий режим не налаштовано — говоримо текстом.', call_limit: 'На сьогодні ліміт розмов вичерпано. Повертайся завтра!', no_ai: 'Живу розмову ще не налаштовано — говоримо за сценарієм.', ai: 'Співрозмовник не відповів. Спробуй ще раз.', net: 'Немає зв’язку із сервером.' },
      scenes: [['smaprat', '☕ Побалакати'], ['kafe', '🍰 У кафе'], ['butikk', '🛒 У магазині'], ['nabo', '🏠 Сусід'], ['jobb', '💼 Робота'], ['lege', '🩺 У лікаря'], ['skole', '🏫 Школа'], ['reise', '🚌 Подорож']] },
    en: { title: '📞 A call in Norwegian', lead: 'A short, live phone call. Choose who calls and what about — then speak out loud or type.',
      who: 'Who is calling', scene: 'What about', start: '📞 Call me', incoming: 'Incoming call', answer: '✅ Answer', decline: '✖ Decline',
      speak: '🎙️ Speak', listening: '🎙️ Listening…', send: 'Send', ph: 'Write your answer in Norwegian…', hint: '💡 Translation', hang: '📵 Hang up',
      ended: '📞 Call ended', again: '🔄 One more call', sum: 'Here is what was said:', words: 'New words from the call',
      offer: n => `📞 ${n} is calling you!`, offer_d: 'A short call in Norwegian — one minute.', later: 'Not now', noai: 'Scripted conversation (no AI key on the server).',
      mic_no: 'No microphone — please type instead.', left: n => `Turns left today: ${n}`, live: '🎧 Live voice', live_d: 'A real voice conversation: the character hears you and answers by itself.', live_on: '🎧 Voice call', live_wait: 'Connecting…', live_talk: 'Speak — they can hear you', live_left: n => `Voice calls left today: ${n}`, mute: '🔇 Mute', unmute: '🎙️ Unmute', text_mode: '⌨️ Type instead',
      err: { rt_limit: 'No voice calls left today — you can keep writing.', realtime: 'The voice call could not start. Try again or write instead.', no_realtime: 'Voice mode is not set up — let us write instead.', call_limit: 'You have used today’s calls. Come back tomorrow!', no_ai: 'Live conversation is not set up yet — we will use a script.', ai: 'No answer from your partner. Try again.', net: 'No connection to the server.' },
      scenes: [['smaprat', '☕ Small talk'], ['kafe', '🍰 At a café'], ['butikk', '🛒 At the shop'], ['nabo', '🏠 Neighbour'], ['jobb', '💼 Work'], ['lege', '🩺 At the doctor'], ['skole', '🏫 School'], ['reise', '🚌 Travel']] },
    no: { title: '📞 En samtale på norsk', lead: 'En kort telefonsamtale. Velg hvem som ringer og hva dere snakker om – snakk høyt eller skriv.',
      who: 'Hvem ringer', scene: 'Hva dere snakker om', start: '📞 Ring meg', incoming: 'Innkommende anrop', answer: '✅ Svar', decline: '✖ Avvis',
      speak: '🎙️ Snakk', listening: '🎙️ Hører …', send: 'Send', ph: 'Skriv svaret ditt på norsk …', hint: '💡 Oversettelse', hang: '📵 Legg på',
      ended: '📞 Samtalen er avsluttet', again: '🔄 En samtale til', sum: 'Dette ble sagt:', words: 'Nye ord fra samtalen',
      offer: n => `📞 ${n} ringer deg!`, offer_d: 'En kort samtale på norsk – ett minutt.', later: 'Ikke nå', noai: 'Samtale etter manus (ingen KI-nøkkel på serveren).',
      mic_no: 'Ingen mikrofon – skriv i stedet.', left: n => `Svar igjen i dag: ${n}`, live: '🎧 Levende stemme', live_d: 'En ekte samtale med stemme: figuren hører deg og svarer selv.', live_on: '🎧 Stemmesamtale', live_wait: 'Kobler til …', live_talk: 'Snakk – de hører deg', live_left: n => `Stemmesamtaler igjen i dag: ${n}`, mute: '🔇 Slå av mikrofonen', unmute: '🎙️ Slå på mikrofonen', text_mode: '⌨️ Skriv i stedet',
      err: { rt_limit: 'Ingen stemmesamtaler igjen i dag – du kan fortsette å skrive.', realtime: 'Stemmesamtalen startet ikke. Prøv igjen, eller skriv.', no_realtime: 'Stemmemodus er ikke satt opp – vi skriver i stedet.', call_limit: 'Du har brukt opp dagens samtaler. Kom tilbake i morgen!', no_ai: 'Levende samtale er ikke satt opp ennå – vi følger et manus.', ai: 'Ingen svar. Prøv igjen.', net: 'Ingen forbindelse med serveren.' },
      scenes: [['smaprat', '☕ Småprat'], ['kafe', '🍰 På kafé'], ['butikk', '🛒 På butikken'], ['nabo', '🏠 Nabo'], ['jobb', '💼 Jobb'], ['lege', '🩺 Hos legen'], ['skole', '🏫 Skole'], ['reise', '🚌 Reise']] },
    ar: { title: '📞 مكالمة بالنرويجية', lead: 'مكالمة قصيرة حيّة. اختر من يتصل وعن ماذا — ثم تكلّم بصوتك أو اكتب.',
      who: 'من يتصل', scene: 'موضوع المكالمة', start: '📞 اتصل بي', incoming: 'مكالمة واردة', answer: '✅ ردّ', decline: '✖ رفض',
      speak: '🎙️ تكلّم', listening: '🎙️ أستمع…', send: 'إرسال', ph: 'اكتب ردّك بالنرويجية…', hint: '💡 الترجمة', hang: '📵 إنهاء',
      ended: '📞 انتهت المكالمة', again: '🔄 مكالمة أخرى', sum: 'هذا ما قيل:', words: 'كلمات جديدة من المكالمة',
      offer: n => `📞 ${n} يتصل بك!`, offer_d: 'مكالمة قصيرة بالنرويجية — دقيقة واحدة.', later: 'ليس الآن', noai: 'محادثة وفق سيناريو (لا مفتاح ذكاء اصطناعي على الخادم).',
      mic_no: 'لا يوجد ميكروفون — اكتب بدلًا من ذلك.', left: n => `الردود المتبقية اليوم: ${n}`, live: '🎧 صوت حيّ', live_d: 'محادثة صوتية حقيقية: الشخصية تسمعك وتجيب بنفسها.', live_on: '🎧 مكالمة صوتية', live_wait: 'جارٍ الاتصال…', live_talk: 'تكلّم — هم يسمعونك', live_left: n => `المكالمات الصوتية المتبقية اليوم: ${n}`, mute: '🔇 كتم', unmute: '🎙️ إلغاء الكتم', text_mode: '⌨️ اكتب بدلًا من ذلك',
      err: { rt_limit: 'لا مكالمات صوتية متبقية اليوم — يمكنك المتابعة بالكتابة.', realtime: 'تعذّر بدء المكالمة الصوتية. حاول مجددًا أو اكتب.', no_realtime: 'الوضع الصوتي غير مفعّل — سنكتب بدلًا من ذلك.', call_limit: 'انتهت مكالمات اليوم. عد غدًا!', no_ai: 'المحادثة الحيّة غير مفعّلة بعد — سنتبع سيناريو.', ai: 'لا ردّ. حاول مرة أخرى.', net: 'لا اتصال بالخادم.' },
      scenes: [['smaprat', '☕ دردشة'], ['kafe', '🍰 في المقهى'], ['butikk', '🛒 في المتجر'], ['nabo', '🏠 الجار'], ['jobb', '💼 العمل'], ['lege', '🩺 عند الطبيب'], ['skole', '🏫 المدرسة'], ['reise', '🚌 السفر']] }
  };
  const tx = () => T[(C() || {}).ui] || T.en;

/* 🎭 Вигадані співрозмовники. Аватар описано так само, як у гравців
   (тварина|шапка|окуляри|значок|фон) — його малює KomiksAvatars, тому персонаж виглядає
   як живий герой сайту, а не як емодзі. tts — голос нейронного синтезу (OpenAI),
   voice — запасний персонаж для голосу браузера. */
  const PEOPLE = [
    { id: 'kaja', name: 'Kaja', emoji: '🐧', ava: '🐧|beanie||norflag|ice', voice: 'nora', tts: 'female', rt: 'marin',
      city: 'Tromsø', tag: { uk: 'любить каву й довгі прогулянки', en: 'loves coffee and long walks', no: 'glad i kaffe og lange turer', ar: 'تحب القهوة والمشي الطويل' } },
    { id: 'espen', name: 'Espen', emoji: '🐻', ava: '🐻|gamer|cyber||neon', voice: 'pappa', tts: 'male', rt: 'ash',
      city: 'Bergen', tag: { uk: 'працює в кав’ярні, багато жартує', en: 'works in a café, jokes a lot', no: 'jobber på kafé og tuller mye', ar: 'يعمل في مقهى ويمزح كثيرًا' } },
    { id: 'musa', name: 'Musa', emoji: '🚴', ava: '🦊|gamer||bolt|aurora', voice: 'musa', tts: 'male', rt: 'verse',
      city: 'Drammen', tag: { uk: 'їздить велосипедом у будь-яку погоду', en: 'cycles in any weather', no: 'sykler i all slags vær', ar: 'يركب دراجته في كل الأحوال' } },
    { id: 'liv', name: 'Liv', emoji: '🦊', ava: '🦄|unicorn||norflag|midnight', voice: 'mia', tts: 'young', rt: 'coral',
      city: 'Trondheim', tag: { uk: 'студентка, обожнює вафлі', en: 'a student who adores waffles', no: 'student og glad i vafler', ar: 'طالبة تعشق الوافل' } },
    { id: 'olav', name: 'Olav', emoji: '🦁', ava: '🦁|astro|laser|norflag|lava', voice: 'laerer', tts: 'male', rt: 'ballad',
      city: 'Oslo', tag: { uk: 'учитель, говорить спокійно й чітко', en: 'a teacher, speaks calmly and clearly', no: 'lærer, snakker rolig og tydelig', ar: 'معلّم يتكلم بهدوء ووضوح' } },
    { id: 'noor', name: 'Noor', emoji: '🐰', ava: '🐰|wizard|cyber|bolt|ice', voice: 'maria', tts: 'warm', rt: 'sage',
      city: 'Stavanger', tag: { uk: 'медсестра, дуже привітна', en: 'a nurse, very friendly', no: 'sykepleier og veldig hyggelig', ar: 'ممرضة ولطيفة جدًا' } },
    { id: 'jonas', name: 'Jonas', emoji: '🐺', ava: '🐺|samurai||bolt|neon', voice: 'denys', tts: 'male', rt: 'echo',
      city: 'Kristiansand', tag: { uk: 'майстер на всі руки, сусід', en: 'a handy neighbour', no: 'nabo og altmuligmann', ar: 'جار بارع في كل شيء' } },
    { id: 'sigrid', name: 'Sigrid', emoji: '🦢', ava: '🦉|jester||norflag|aurora', voice: 'kari', tts: 'female2', rt: 'shimmer',
      city: 'Ålesund', tag: { uk: 'працює в магазині біля моря', en: 'works in a shop by the sea', no: 'jobber i en butikk ved sjøen', ar: 'تعمل في متجر قرب البحر' } }
  ];
  // мальований аватар персонажа (як у гравців); якщо модуль ще не завантажився — емодзі
  function avatarEl(p, size) {
    const A = window.KomiksAvatars, K = C();
    if (A && K) { try { const el = A.el(p.ava, { size, mood: 'happy' }); if (el) return el; } catch { /* нижче емодзі */ } }
    return (K || { h: null }).h ? K.h('span', { class: 'call-ava' }, p.emoji) : null;
  }
  const tagOf = p => (p.tag || {})[(C() || {}).ui] || (p.tag || {}).en || '';

  /* 🔔 Гудки: норвезький ритм — 1 секунда сигналу, 4 секунди тиші, тон 425 Гц.
     Робимо через WebAudio, щоб не тягнути окремий файл. */
  function ringer() {
    let ctx = null, timer = 0, stopped = false;
    const beep = () => {
      if (stopped) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = 425;
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.03);
        g.gain.setValueAtTime(0.16, ctx.currentTime + 0.95);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
        o.connect(g).connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + 1.02);
      } catch { /* звук недоступний — дзвінок усе одно працює */ }
      if (navigator.vibrate) { try { navigator.vibrate([400, 200, 400]); } catch { /* ignore */ } }
      timer = setTimeout(beep, 5000);
    };
    beep();
    return () => { stopped = true; clearTimeout(timer); if (navigator.vibrate) { try { navigator.vibrate(0); } catch { /* ignore */ } } try { ctx && ctx.close(); } catch { /* ignore */ } };
  }

  /* 💬 Запасний сценарій — працює без ключа ШІ: коротка розмова з розгалуженням за темою. */
  const SCRIPT = {
    smaprat: [['Hei! Det er meg. Hvordan går det med deg?', 'Hi! It is me. How are you?'],
      ['Så fint! Hva gjør du nå?', 'How nice! What are you doing now?'],
      ['Spennende. Hva skal du gjøre i helga?', 'Exciting. What are you doing this weekend?'],
      ['Det høres bra ut. Er været fint hos deg?', 'That sounds good. Is the weather nice where you are?'],
      ['Ja, her regner det litt. Vi snakkes snart – ha det!', 'Yes, it is raining a little here. Talk soon — bye!']],
    kafe: [['Hei! Jeg sitter på kafé. Vil du komme?', 'Hi! I am at a café. Do you want to come?'],
      ['Flott! Hva vil du ha – kaffe eller te?', 'Great! What would you like — coffee or tea?'],
      ['Jeg tar en kanelbolle. Er du sulten?', 'I will have a cinnamon bun. Are you hungry?'],
      ['Jeg venter ved vinduet. Hvor lang tid trenger du?', 'I am waiting by the window. How long do you need?'],
      ['Perfekt, vi ses om litt. Ha det!', 'Perfect, see you soon. Bye!']],
    butikk: [['Hei! Jeg står på butikken. Trenger vi melk?', 'Hi! I am at the shop. Do we need milk?'],
      ['Ok. Skal jeg kjøpe brød også?', 'OK. Should I buy bread too?'],
      ['Det er tilbud på epler i dag. Vil du ha?', 'There is an offer on apples today. Do you want some?'],
      ['Jeg betaler nå. Noe mer?', 'I am paying now. Anything else?'],
      ['Da kommer jeg hjem snart. Ha det!', 'Then I will be home soon. Bye!']],
    nabo: [['Hei, det er naboen din. Har du tid et øyeblikk?', 'Hi, it is your neighbour. Do you have a moment?'],
      ['Vi har dugnad på lørdag. Kan du komme?', 'We have a communal work day on Saturday. Can you come?'],
      ['Fint! Kan du ta med en kost eller en rake?', 'Great! Can you bring a broom or a rake?'],
      ['Vi begynner klokka ti. Passer det?', 'We start at ten o’clock. Does that suit you?'],
      ['Supert. Vi ses på lørdag – ha det!', 'Super. See you on Saturday — bye!']],
    jobb: [['Hei! Det er meg fra jobben. Har du tid?', 'Hi! It is me from work. Do you have time?'],
      ['Vi har et møte klokka to. Kan du være med?', 'We have a meeting at two. Can you join?'],
      ['Bra. Har du sett rapporten min?', 'Good. Have you seen my report?'],
      ['Takk! Jeg sender deg e-post etterpå. Ok?', 'Thanks! I will email you afterwards. OK?'],
      ['Da sier vi det. Ha en fin dag – ha det!', 'Then it is settled. Have a nice day — bye!']],
    lege: [['Hei, det er legekontoret. Hvordan har du det i dag?', 'Hi, this is the doctor’s office. How are you today?'],
      ['Har du feber eller vondt noe sted?', 'Do you have a fever or pain anywhere?'],
      ['Jeg forstår. Hvor lenge har det vært sånn?', 'I understand. How long has it been like this?'],
      ['Vi kan gi deg time i morgen klokka ni. Passer det?', 'We can give you an appointment tomorrow at nine. Does that suit you?'],
      ['Bra, da ses vi da. God bedring – ha det!', 'Good, see you then. Get well soon — bye!']],
    skole: [['Hei! Det er fra skolen. Er alt bra med leksene?', 'Hi! This is from school. Is everything fine with the homework?'],
      ['Hvilket fag liker du best?', 'Which subject do you like best?'],
      ['Så bra. Har du prøve denne uka?', 'Very good. Do you have a test this week?'],
      ['Husk å ta med matpakke i morgen. Ok?', 'Remember to bring a packed lunch tomorrow. OK?'],
      ['Fint, lykke til! Ha det bra!', 'Good, good luck! Bye!']],
    reise: [['Hei! Skal vi reise til hytta på fredag?', 'Hi! Shall we go to the cabin on Friday?'],
      ['Vi kan ta toget klokka seks. Passer det?', 'We can take the train at six. Does that suit you?'],
      ['Husk varme klær og matpakke. Har du sekk?', 'Remember warm clothes and food. Do you have a rucksack?'],
      ['Det blir fint vær, tror jeg. Gleder du deg?', 'The weather will be nice, I think. Are you looking forward to it?'],
      ['Supert! Vi snakkes – ha det!', 'Great! Talk to you later — bye!']]
  };

  /* 🔊 Голос співрозмовника. Репліки народжуються на льоту, тому записаних mp3 для них немає.
     Якщо на сервері налаштовано нейронний синтез (api/tts.php) — беремо його: звучить як жива людина.
     Якщо ні — читає браузер, і тоді ми хоча б вибираємо найкращий норвезький голос системи. */
  const TTS = 'api/tts.php';
  let ttsReady = null;               // null — ще не питали, true/false — відповідь сервера
  const ttsCache = new Map();        // текст → data-URL (щоб не платити за повтор)
  let current = null;
  function stopVoice() { if (current) { try { current.pause(); } catch { /* ignore */ } current = null; } const K = C(); if (K && K.stopAll) K.stopAll(); }
  function browserVoice(text, K) {
    // найкращий доступний норвезький голос: спершу нейронні (Microsoft/Google), далі будь-який nb/no
    try {
      const vs = speechSynthesis.getVoices() || [];
      const no = vs.filter(v => /^(nb|no)\b/i.test(v.lang || ''));
      const best = no.find(v => /neural|natural|online/i.test(v.name)) || no.find(v => /google|microsoft/i.test(v.name)) || no[0];
      if (best) {
        const u = new SpeechSynthesisUtterance(text);
        u.voice = best; u.lang = best.lang || 'nb-NO'; u.rate = 0.97; u.pitch = 1.02;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
        return true;
      }
    } catch { /* немає синтезу — нижче спробуємо загальний шлях */ }
    if (K && K.Speech) { K.Speech.speak(text, 'narrator', { rate: 0.95 }); return true; }
    return false;
  }
  let voiceOf = null;  // персонаж, чиїм голосом зараз говоримо
  async function voiceSay(text, K, who) {
    if (who) voiceOf = who;
    stopVoice();
    if (ttsReady === null) {
      const st = await fetch(TTS + '?action=state', { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);
      ttsReady = !!(st && st.ok && st.ready);
    }
    if (!ttsReady) return browserVoice(text, K);
    try {
      let url = ttsCache.get(((voiceOf || {}).tts || '') + '|' + text);
      if (!url) {
        // кеш тримаємо окремо для кожного голосу
        const r = await fetch(TTS, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify({ action: 'say', text, voice: (voiceOf || {}).tts || '' }) }).then(x => x.json());
        if (!r || !r.ok || !r.audio) throw new Error('tts');
        url = r.audio; ttsCache.set(((voiceOf || {}).tts || '') + '|' + text, url);
      }
      const a = new Audio(url);
      current = a;
      await a.play();
      return true;
    } catch { return browserVoice(text, K); }
  }

  /* 🎧 Живий голос (OpenAI Realtime). Сервер видає одноразовий ключ на 60 секунд,
     браузер відкриває WebRTC просто до моделі: мікрофон → модель → голос у динамік.
     Наш ключ у браузер не потрапляє. Якщо не налаштовано — лишається текстовий режим. */
  const RT = 'api/realtime.php';
  const rtState = () => fetch(RT + '?action=state', { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);
  async function rtStart(person, scene, level, handlers) {
    const r = await fetch(RT, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' },
      body: JSON.stringify({ action: 'session', who: person.name, scene, level, voice: person.rt || 'marin' }) }).then(x => x.json()).catch(() => null);
    if (!r || !r.ok) return { error: (r && r.error) || 'net' };
    const pc = new RTCPeerConnection();
    const audio = new Audio();
    audio.autoplay = true;
    pc.ontrack = e => { audio.srcObject = e.streams[0]; };
    let mic = null;
    try { mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); }
    catch { pc.close(); return { error: 'mic' }; }
    mic.getTracks().forEach(t => pc.addTrack(t, mic));
    const ch = pc.createDataChannel('oai-events');
    ch.onmessage = e => {
      let m = null; try { m = JSON.parse(e.data); } catch { return; }
      // субтитри: що сказав персонаж і що почув від тебе
      if (m.type === 'response.audio_transcript.done' && m.transcript) handlers.said(m.transcript);
      else if (m.type === 'conversation.item.input_audio_transcription.completed' && m.transcript) handlers.heard(m.transcript);
      else if (m.type === 'error') handlers.fail((m.error || {}).message || 'error');
    };
    // вітання: щойно канал відкрився, просимо персонажа заговорити першим
    ch.onopen = () => {
      try {
        const greet = (r.greeting || '').trim();
        ch.send(JSON.stringify({ type: 'response.create', response: greet
          ? { instructions: 'Start the call now. Say this in Norwegian, in your own words: ' + greet }
          : { instructions: 'Start the call now with a short Norwegian greeting and one simple question.' } }));
      } catch { /* модель заговорить сама */ }
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    /* OpenAI має дві адреси для WebRTC: нову /v1/realtime/calls і стару /v1/realtime.
       Сервер підказує, яку використати, але про всяк випадок пробуємо й другу. */
    const urls = r.api === 'beta'
      ? ['https://api.openai.com/v1/realtime?model=', 'https://api.openai.com/v1/realtime/calls?model=']
      : ['https://api.openai.com/v1/realtime/calls?model=', 'https://api.openai.com/v1/realtime?model='];
    let answer = null;
    for (const base of urls) {
      const res = await fetch(base + encodeURIComponent(r.model), {
        method: 'POST', body: offer.sdp,
        headers: { Authorization: 'Bearer ' + r.token, 'Content-Type': 'application/sdp', 'OpenAI-Beta': 'realtime=v1' }
      }).catch(() => null);
      if (res && res.ok) { answer = await res.text(); break; }
    }
    if (!answer) { pc.close(); mic.getTracks().forEach(t => t.stop()); return { error: 'realtime' }; }
    await pc.setRemoteDescription({ type: 'answer', sdp: answer });
    return {
      left: r.left,
      mute(on) { mic.getTracks().forEach(t => { t.enabled = !on; }); },
      stop() { try { ch.close(); } catch { /* ignore */ } try { pc.close(); } catch { /* ignore */ } mic.getTracks().forEach(t => t.stop()); audio.srcObject = null; }
    };
  }

  const state = () => fetch(API + '?action=state', { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => null);
  const say = body => fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) }).then(r => r.json()).catch(() => null);

  function render() {
    const K = C(), { h } = K, L = tx();
    let person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
    let scene = L.scenes[0][0];
    let ai = false, left = null, live = false, rtOk = false;

    const root = h('section', { class: 'call-page' }, K.pageHead(L.title));
    const info = h('p', { class: 'hint' });
    const pickWho = h('div', { class: 'call-people' }, PEOPLE.map(p =>
      h('button', { type: 'button', class: 'call-person' + (p.id === person.id ? ' on' : ''), title: p.city + ' — ' + tagOf(p), onclick: e => { person = p; pickWho.querySelectorAll('.call-person').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); } },
        avatarEl(p, 56), h('b', {}, p.name), h('small', {}, p.city))));
    const pickScene = h('div', { class: 'call-scenes' }, L.scenes.map(([id, label]) =>
      h('button', { type: 'button', class: 'call-scene' + (id === scene ? ' on' : ''), onclick: e => { scene = id; pickScene.querySelectorAll('.call-scene').forEach(b => b.classList.remove('on')); e.currentTarget.classList.add('on'); } }, label)));

    const modeBox = h('div', { class: 'call-mode' });
    const drawMode = () => {
      modeBox.replaceChildren();
      if (!rtOk) return;
      const cb = h('input', { type: 'checkbox', checked: live });
      cb.addEventListener('change', () => { live = cb.checked; });
      modeBox.append(h('label', { class: 'check' }, cb, h('span', {}, h('b', {}, L.live), h('small', {}, L.live_d))));
    };
    root.append(h('p', { class: 'lead-p' }, L.lead),
      h('div', { class: 'box' }, h('h3', {}, L.who), pickWho, h('h3', {}, L.scene), pickScene, modeBox,
        h('div', { class: 'row-left' }, h('button', { class: 'btn accent big', type: 'button', onclick: () => incoming(root, person, scene, ai, live && rtOk) }, L.start)), info));

    state().then(st => {
      if (!st || !st.ok) { info.textContent = L.err.net; return; }
      ai = !!st.ai; left = st.left;
      info.textContent = (ai ? L.left(st.left) : L.noai);
    });
    rtState().then(st => {
      if (!st || !st.ok || !st.ready) return;
      rtOk = true; live = true;
      info.textContent = L.live_left(st.left);
      drawMode();
    });
    return root;
  }

  /* 📱 Екран вхідного дзвінка — як на справжньому телефоні: темний екран, великий аватар,
     годинник угорі, дві круглі кнопки внизу. На телефоні займає весь дисплей, на ПК — рамка телефона. */
  const clockNow = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  function phoneShell(K, cls, ...kids) {
    const { h } = K;
    return h('div', { class: 'phone-back' },
      h('div', { class: 'phone ' + cls },
        h('div', { class: 'phone-bar' }, h('span', {}, clockNow()), h('span', {}, '📶 🔋')),
        h('div', { class: 'phone-screen' }, ...kids)));
  }
  function incoming(root, person, scene, ai, live) {
    const K = C(), { h } = K, L = tx();
    const stopRing = ringer();
    const close = () => { stopRing(); box.remove(); document.body.classList.remove('in-call'); };
    const box = phoneShell(K, 'ringing',
      h('div', { class: 'ph-top' }, h('span', { class: 'ph-label' }, L.incoming), h('span', { class: 'ph-sub' }, 'mobil')),
      h('div', { class: 'ph-who' }, h('span', { class: 'ph-ava ring' }, avatarEl(person, 132)),
        h('b', {}, person.name), h('small', {}, person.city + ' · ' + tagOf(person))),
      h('div', { class: 'ph-actions' },
        h('button', { class: 'ph-btn red', type: 'button', title: L.decline, onclick: close }, '📵'),
        h('button', { class: 'ph-btn green shake', type: 'button', title: L.answer, onclick: () => { close(); talk(root, person, scene, ai, live); } }, '📞')),
      h('div', { class: 'ph-hint' }, L.answer + ' / ' + L.decline));
    document.body.append(box);
    document.body.classList.add('in-call');
    setTimeout(() => { if (document.body.contains(box)) close(); }, 30000); // ніхто не взяв слухавку
  }

  // ☎️ сама розмова
  function talk(root, person, scene, ai, live) {
    const K = C(), { h } = K, L = tx();
    const history = [];
    let step = 0, busy = false, ended = false;
    const log = h('div', { class: 'call-log' });
    const msg = h('p', { class: 'fb-msg' });
    const input = h('input', { type: 'text', placeholder: L.ph, autocomplete: 'off',
      onkeydown: e => { if (e.key === 'Enter') { e.preventDefault(); send(input.value); } } });
    const micBtn = h('button', { class: 'btn', type: 'button', onclick: () => listen() }, L.speak);
    const sendBtn = h('button', { class: 'ph-btn send', type: 'button', title: L.send, onclick: () => send(input.value) }, '➤');
    const hangBtn = h('button', { class: 'btn danger', type: 'button', onclick: () => hangUp() }, L.hang);
    const micIcon = () => wrap && wrap.querySelector('.ph-controls .ph-btn');

    const bubble = (who, text, hint) => {
      const row = h('div', { class: 'call-row ' + who });
      const b = h('div', { class: 'call-bub' }, h('span', { lang: 'nb' }, text));
      if (who === 'ai') {
        b.append(h('button', { class: 'play small', type: 'button', title: '🔊', onclick: () => voiceSay(text, K, person) }, '🔊'));
        if (hint) b.append(h('button', { class: 'btn small ghost', type: 'button', onclick: e => { e.currentTarget.replaceWith(h('small', { class: 'call-hint' }, hint)); } }, L.hint));
      }
      row.append(who === 'ai' ? h('span', { class: 'call-mini' }, avatarEl(person, 34)) : null, b);
      log.append(row);
      log.scrollTop = log.scrollHeight;
    };

    const speak = (text, hint) => { bubble('ai', text, hint); history.push({ r: 'ai', t: text }); voiceSay(text, K, person); };

    // сценарій без ШІ
    function scripted() {
      const list = SCRIPT[scene] || SCRIPT.smaprat;
      const [no, en] = list[Math.min(step, list.length - 1)];
      step++;
      speak(no, en);
      if (step >= list.length) setTimeout(() => finish(), 1200);
    }

    async function send(text) {
      text = String(text || '').trim();
      if (!text || busy || ended) return;
      input.value = '';
      bubble('me', text);
      history.push({ r: 'me', t: text });
      if (!ai) { setTimeout(scripted, 500); return; }
      busy = true; sendBtn.disabled = true;
      const r = await say({ action: 'say', who: person.name, scene, level: K.settings.level === 'kids' ? 'A1' : 'A2', lang: K.ui, history: history.slice(0, -1), text });
      busy = false; sendBtn.disabled = false;
      if (r && r.ok) {
        speak(r.reply, r.hint);
        if (r.done) setTimeout(() => finish(), 1500);
        return;
      }
      if (r && r.error === 'no_ai') { ai = false; msg.textContent = L.err.no_ai; scripted(); return; }
      msg.textContent = (r && L.err[r.error]) || L.err.net;
    }

    // 🎙️ розпізнавання мови — той самий механізм, що й у тестах
    function listen() {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { msg.textContent = L.mic_no; return; }
      const rec = new SR();
      rec.lang = 'nb-NO'; rec.interimResults = false; rec.maxAlternatives = 1;
      micBtn.textContent = L.listening; micBtn.classList.add('rec');
      const mi = micIcon(); if (mi) mi.classList.add('rec');
      rec.onresult = e => { const t = e.results[0][0].transcript; send(t); };
      rec.onerror = () => { msg.textContent = L.mic_no; };
      rec.onend = () => { micBtn.textContent = L.speak; micBtn.classList.remove('rec'); const mi = micIcon(); if (mi) mi.classList.remove('rec'); };
      try { rec.start(); } catch { micBtn.textContent = L.speak; micBtn.classList.remove('rec'); }
    }

    function finish() {
      if (ended) return;
      ended = true;
      stopVoice();
      const words = history.filter(x => x.r === 'ai').flatMap(x => (x.t.match(/\p{L}{4,}/gu) || [])).map(w => w.toLowerCase());
      const uniqW = [...new Set(words)].slice(0, 10);
      clearInterval(tick);
      if (rt) { try { rt.stop(); } catch { /* ignore */ } rt = null; }
      panel.replaceChildren(h('div', { class: 'call-end' },
        h('h3', {}, L.ended),
        h('p', { class: 'hint' }, L.sum),
        h('div', { class: 'call-words' }, uniqW.map(w => h('button', { class: 'btn small', type: 'button', onclick: () => K.Speech.speak(w, 'narrator', { rate: 0.85 }) }, '🔊 ' + w))),
        h('div', { class: 'row-center' },
          h('button', { class: 'btn accent', type: 'button', onclick: () => { wrap.remove(); document.body.classList.remove('in-call'); incoming(root, person, scene, ai, live); } }, L.again),
          h('button', { class: 'btn', type: 'button', onclick: () => { wrap.remove(); document.body.classList.remove('in-call'); } }, '✕'))));
      // розмова рахується як практика
      try { K.bump && K.bump('calls'); } catch { /* ignore */ }
    }
    function hangUp() { finish(); }

    // таймер розмови, як на телефоні
    const timeEl = h('span', { class: 'ph-timer' }, '00:00');
    const t0 = Date.now();
    const tick = setInterval(() => {
      const s2 = Math.floor((Date.now() - t0) / 1000);
      timeEl.textContent = String(Math.floor(s2 / 60)).padStart(2, '0') + ':' + String(s2 % 60).padStart(2, '0');
    }, 1000);
    const panel = h('div', { class: 'ph-call' },
      h('div', { class: 'ph-callhead' }, h('span', { class: 'ph-ava small' }, avatarEl(person, 64)),
        h('b', {}, person.name), timeEl, h('span', { class: 'ph-scene' }, (tx().scenes.find(x => x[0] === scene) || [])[1])),
      log, msg,
      h('div', { class: 'ph-controls' },
        h('button', { class: 'ph-btn', type: 'button', title: L.speak, onclick: () => listen() }, '🎙️'),
        input, sendBtn,
        h('button', { class: 'ph-btn red', type: 'button', title: L.hang, onclick: () => hangUp() }, '📵')));
    micBtn.classList.add('hidden');
    hangBtn.classList.add('hidden');
    const wrap = phoneShell(K, 'talking', panel);
    document.body.append(wrap);
    document.body.classList.add('in-call');
    // перша репліка — від персонажа
    let rt = null, muted = false;
    if (live) startLive();
    else if (ai) send('');
    else scripted();
    setTimeout(() => { if (!live) input.focus(); }, 300);

    async function startLive() {
      panel.classList.add('live');
      msg.textContent = L.live_wait;
      const r = await rtStart(person, scene, K.settings.level === 'kids' ? 'A1' : 'A2', {
        said: t => { if (!ended) bubble('ai', t); },
        heard: t => { if (!ended) bubble('me', t); },
        fail: () => { /* службові помилки не показуємо — розмова триває */ }
      });
      if (r.error) {
        panel.classList.remove('live');
        live = false;
        msg.textContent = L.err[r.error] || (r.error === 'mic' ? L.mic_no : L.err.net);
        if (ai) send(''); else scripted();
        return;
      }
      rt = r;
      msg.textContent = L.live_talk;
      // кнопка мікрофона в живому режимі вимикає звук, а не слухає окремо
      const mic = panel.querySelector('.ph-controls .ph-btn');
      if (mic) {
        mic.title = L.mute;
        mic.onclick = () => { muted = !muted; rt.mute(muted); mic.textContent = muted ? '🔇' : '🎙️'; mic.title = muted ? L.unmute : L.mute; mic.classList.toggle('rec', !muted); };
        mic.classList.add('rec');
      }
      input.placeholder = L.live_talk;
    }
  }

  /* 🔔 Періодична пропозиція «тобі дзвонять» — не частіше ніж раз на 6 годин,
     лише на спокійних сторінках і ніколи під час тесту чи гри. Вимикається в налаштуваннях. */
  function maybeOffer() {
    const K = C(); if (!K) return;
    if (K.settings.callOffer === false) return;
    const quiet = ['#/', '#/plan', '#/words', '#/cards', '#/account', '#/players'];
    const hash = location.hash || '#/';
    if (!quiet.includes(hash)) return;
    if (document.querySelector('.q-card, .call-back, .call-wrap, .fb-back')) return;
    const last = K.store.get('callOfferAt', 0);
    if (Date.now() - last < 6 * 3600 * 1000) return;
    K.store.set('callOfferAt', Date.now());
    const L = tx(), { h } = K;
    const person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
    const scene = L.scenes[Math.floor(Math.random() * L.scenes.length)][0];
    const card = h('div', { class: 'call-offer' },
      h('span', { class: 'call-mini' }, avatarEl(person, 44)),
      h('div', {}, h('b', {}, L.offer(person.name)), h('small', {}, L.offer_d)),
      h('button', { class: 'btn accent small', type: 'button', onclick: () => { card.remove(); location.hash = '#/call'; setTimeout(() => { const r = document.querySelector('.call-page'); if (r) incoming(r, person, scene, true); }, 600); } }, L.answer),
      h('button', { class: 'btn small', type: 'button', onclick: () => card.remove() }, L.later));
    document.body.append(card);
    setTimeout(() => card.remove(), 20000);
  }
  setTimeout(maybeOffer, 45000);
  window.addEventListener('hashchange', () => setTimeout(maybeOffer, 12000));

  window.KomiksCall = { render, people: PEOPLE, text: () => tx() };
})();
