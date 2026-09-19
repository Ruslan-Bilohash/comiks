/* Комікс·Lab — ✉️ особисті повідомлення (api/messages.php) і 🔒 налаштування конфіденційності.
   #/messages — розмови, #/messages/<КОД> — листування з гравцем, #/privacy — хто мене бачить і хто може писати.
   Писати можуть лише залогінені; отримувач обирає: ніхто / лише друзі / усі. Є блокування й скарга модераторам. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return;
  const API = 'api/messages.php';
  const C = () => window.KomiksCore;
  const TX = {
    uk: { title: '✉️ Повідомлення', empty: 'Поки що жодної розмови. Відкрий профіль друга й натисни «✉️ Написати».', write: '✉️ Написати', ph: 'Напиши повідомлення…', send: 'Надіслати', you: 'ти',
      login: 'Увійди, щоб листуватися з друзями.', back: '← Розмови', block: '🚫 Заблокувати', unblock: '✅ Розблокувати', report: '🚩 Поскаржитися', reported: 'Скаргу надіслано модераторам. Дякуємо!', hide: '🗑 Прибрати розмову', block_q: 'Заблокувати цього гравця? Він не зможе тобі писати.', hide_q: 'Прибрати розмову зі списку?',
      why: { closed: 'Цей гравець не приймає повідомлень.', friends_only: 'Цей гравець приймає повідомлення лише від друзів. Додай його в друзі — і, коли він прийме, зможете листуватися.', blocked: 'Листування заблоковано.', banned: 'Тобі тимчасово заборонено писати.', unverified: 'Спершу підтверди пошту.', self: 'Це ти 🙂', not_found: 'Гравця не знайдено або він ще не має акаунта на сервері.', links: 'Посилання в повідомленнях заборонені.', slow_down: 'Забагато повідомлень — зачекай хвилинку.', empty: 'Напиши щось 🙂', net: 'Немає зв’язку. Спробуй ще раз.' },
      new_msg: n => `✉️ Нове повідомлення від ${n}`, privacy: '🔒 Конфіденційність', p_intro: 'Тут ти вирішуєш, хто тебе бачить і хто може тобі писати. Пошту й пароль не бачить ніхто.',
      p_search: '🔎 Показувати мене в пошуку гравців', p_search_d: 'Інші зможуть знайти тебе за ім’ям, побачити аватар, рівень, зірки й значки та додати в друзі.',
      p_msg: '✉️ Хто може мені писати', p_msg_opts: [['0', '🙅 Ніхто'], ['1', '👥 Лише друзі'], ['2', '🌍 Усі гравці']], p_wall: '💬 Відкрита стіна в профілі', p_wall_d: 'Інші можуть лишати коментарі на твоїй стіні (з капчею й модерацією).',
      p_blocks: '🚫 Заблоковані', p_none: 'Нікого не заблоковано.', saved: 'Збережено ✓', local: 'Повідомлення працюють для акаунтів на сервері bilohash.com.' },
    en: { title: '✉️ Messages', empty: 'No conversations yet. Open a friend’s profile and tap “✉️ Message”.', write: '✉️ Message', ph: 'Write a message…', send: 'Send', you: 'you',
      login: 'Log in to message your friends.', back: '← Conversations', block: '🚫 Block', unblock: '✅ Unblock', report: '🚩 Report', reported: 'Reported to the moderators. Thank you!', hide: '🗑 Remove conversation', block_q: 'Block this player? They will not be able to message you.', hide_q: 'Remove this conversation from the list?',
      why: { closed: 'This player does not accept messages.', friends_only: 'This player only accepts messages from friends. Add them as a friend — once they accept, you can chat.', blocked: 'Messaging is blocked.', banned: 'You are temporarily not allowed to write.', unverified: 'Confirm your email first.', self: 'That is you 🙂', not_found: 'Player not found or they do not have a server account yet.', links: 'Links are not allowed in messages.', slow_down: 'Too many messages — wait a minute.', empty: 'Write something 🙂', net: 'No connection. Try again.' },
      new_msg: n => `✉️ New message from ${n}`, privacy: '🔒 Privacy', p_intro: 'Decide who can see you and who can message you. Nobody ever sees your email or password.',
      p_search: '🔎 Show me in player search', p_search_d: 'Others can find you by name, see your avatar, level, stars and badges and add you as a friend.',
      p_msg: '✉️ Who can message me', p_msg_opts: [['0', '🙅 Nobody'], ['1', '👥 Friends only'], ['2', '🌍 All players']], p_wall: '💬 Open wall on my profile', p_wall_d: 'Others can leave comments on your wall (with a captcha and moderation).',
      p_blocks: '🚫 Blocked players', p_none: 'Nobody is blocked.', saved: 'Saved ✓', local: 'Messages work for server accounts on bilohash.com.' },
    no: { title: '✉️ Meldinger', empty: 'Ingen samtaler ennå. Åpne profilen til en venn og trykk «✉️ Skriv».', write: '✉️ Skriv', ph: 'Skriv en melding …', send: 'Send', you: 'deg',
      login: 'Logg inn for å sende meldinger til venner.', back: '← Samtaler', block: '🚫 Blokker', unblock: '✅ Opphev blokkering', report: '🚩 Rapporter', reported: 'Rapportert til moderatorene. Takk!', hide: '🗑 Fjern samtalen', block_q: 'Blokkere denne spilleren? Hen kan ikke skrive til deg.', hide_q: 'Fjerne samtalen fra listen?',
      why: { closed: 'Denne spilleren tar ikke imot meldinger.', friends_only: 'Denne spilleren tar bare imot meldinger fra venner. Legg hen til som venn – når hen godtar, kan dere skrive.', blocked: 'Meldinger er blokkert.', banned: 'Du kan midlertidig ikke skrive.', unverified: 'Bekreft e-posten først.', self: 'Det er deg 🙂', not_found: 'Fant ikke spilleren, eller hen har ikke konto på serveren ennå.', links: 'Lenker er ikke tillatt i meldinger.', slow_down: 'For mange meldinger – vent litt.', empty: 'Skriv noe 🙂', net: 'Ingen forbindelse. Prøv igjen.' },
      new_msg: n => `✉️ Ny melding fra ${n}`, privacy: '🔒 Personvern', p_intro: 'Bestem hvem som ser deg og hvem som kan skrive til deg. Ingen ser e-posten eller passordet ditt.',
      p_search: '🔎 Vis meg i spillersøket', p_search_d: 'Andre kan finne deg på navn, se avatar, nivå, stjerner og merker og legge deg til som venn.',
      p_msg: '✉️ Hvem kan skrive til meg', p_msg_opts: [['0', '🙅 Ingen'], ['1', '👥 Bare venner'], ['2', '🌍 Alle spillere']], p_wall: '💬 Åpen vegg på profilen', p_wall_d: 'Andre kan legge igjen kommentarer på veggen din (med captcha og moderering).',
      p_blocks: '🚫 Blokkerte', p_none: 'Ingen er blokkert.', saved: 'Lagret ✓', local: 'Meldinger virker for serverkontoer på bilohash.com.' },
    ar: { title: '✉️ الرسائل', empty: 'لا محادثات بعد. افتح ملف صديق واضغط «✉️ راسِل».', write: '✉️ راسِل', ph: 'اكتب رسالة…', send: 'إرسال', you: 'أنت',
      login: 'سجّل الدخول لتراسل أصدقاءك.', back: '→ المحادثات', block: '🚫 حظر', unblock: '✅ إلغاء الحظر', report: '🚩 إبلاغ', reported: 'أُرسل البلاغ إلى المشرفين. شكرًا!', hide: '🗑 إزالة المحادثة', block_q: 'حظر هذا اللاعب؟ لن يتمكن من مراسلتك.', hide_q: 'إزالة المحادثة من القائمة؟',
      why: { closed: 'هذا اللاعب لا يستقبل الرسائل.', friends_only: 'هذا اللاعب يستقبل الرسائل من الأصدقاء فقط. أضفه صديقًا — وعندما يقبل يمكنكما المراسلة.', blocked: 'المراسلة محظورة.', banned: 'يُمنع عليك الكتابة مؤقتًا.', unverified: 'أكّد بريدك أولًا.', self: 'هذا أنت 🙂', not_found: 'لم يُعثر على اللاعب أو ليس لديه حساب على الخادم بعد.', links: 'الروابط غير مسموحة في الرسائل.', slow_down: 'رسائل كثيرة — انتظر دقيقة.', empty: 'اكتب شيئًا 🙂', net: 'لا يوجد اتصال. حاول مجددًا.' },
      new_msg: n => `✉️ رسالة جديدة من ${n}`, privacy: '🔒 الخصوصية', p_intro: 'قرّر من يراك ومن يمكنه مراسلتك. لا أحد يرى بريدك أو كلمة مرورك.',
      p_search: '🔎 أظهرني في البحث عن اللاعبين', p_search_d: 'يمكن للآخرين إيجادك بالاسم ورؤية شخصيتك ومستواك ونجومك وأوسمتك وإضافتك صديقًا.',
      p_msg: '✉️ من يمكنه مراسلتي', p_msg_opts: [['0', '🙅 لا أحد'], ['1', '👥 الأصدقاء فقط'], ['2', '🌍 كل اللاعبين']], p_wall: '💬 جدار مفتوح في ملفي', p_wall_d: 'يمكن للآخرين ترك تعليقات على جدارك (مع تحقّق وإشراف).',
      p_blocks: '🚫 المحظورون', p_none: 'لا يوجد محظورون.', saved: 'تم الحفظ ✓', local: 'تعمل الرسائل لحسابات الخادم على bilohash.com.' }
  };
  const tx = (k, ...a) => { const t = TX[C().ui] || TX.en; const v = k in t ? t[k] : TX.en[k]; return typeof v === 'function' ? v(...a) : v; };
  const why = r => (tx('why')[r] || tx('why').net);
  const AV = (code, o) => (window.KomiksAvatars ? window.KomiksAvatars.el(window.KomiksAvatars.valid(code) ? code : '🙂', o) : document.createTextNode('🙂'));
  const authed = () => !!(window.KomiksAuth && window.KomiksAuth.server && window.KomiksAuth.user);
  const get = (action, extra = '') => fetch(`${API}?action=${action}${extra}`, { credentials: 'same-origin', cache: 'no-store' }).then(r => r.json()).catch(() => ({ ok: false, error: 'net' }));
  const post = body => fetch(API, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json', 'X-Komiks': '1' }, body: JSON.stringify(body) }).then(r => r.json()).catch(() => ({ ok: false, error: 'net' }));
  const when = iso => { try { const d = new Date(iso), now = new Date(); const L = C().ui === 'uk' ? 'uk-UA' : C().ui === 'no' ? 'nb-NO' : C().ui === 'ar' ? 'ar' : 'en-GB'; return d.toDateString() === now.toDateString() ? d.toLocaleTimeString(L, { hour: '2-digit', minute: '2-digit' }) : d.toLocaleDateString(L, { day: 'numeric', month: 'short' }); } catch { return ''; } };

  /* ---------- ✉️ у шапці: лічильник непрочитаних, сповіщення про нові ---------- */
  let unread = 0, pollT = 0;
  function badge() {
    const K = C(); if (!K) return;
    let b = document.getElementById('msgBtn');
    if (!authed()) { if (b) b.remove(); return; }
    if (!b) { const acc = document.getElementById('accBtn'); if (!acc) return; b = K.h('a', { id: 'msgBtn', class: 'btn msg-btn', href: '#/messages', title: tx('title') }); acc.before(b); }
    b.replaceChildren('✉️', unread ? K.h('i', { class: 'msg-n' }, unread > 99 ? '99+' : String(unread)) : null);
  }
  async function poll() {
    clearTimeout(pollT);
    if (authed() && document.visibilityState === 'visible') {
      const j = await get('unread');
      if (j.ok) { if (j.n > unread && unread >= 0 && !location.hash.startsWith('#/messages')) { const K = C(); K.Sfx.tick(); } unread = j.n; badge(); document.title = document.title.replace(/^\(\d+\) /, '') ; if (unread) document.title = `(${unread}) ` + document.title; }
    }
    pollT = setTimeout(poll, 40000);
  }
  const start = () => { if (!window.KomiksCore || !window.KomiksAuth) return setTimeout(start, 300); window.KomiksAuth.ready().then(() => { badge(); poll(); }); };
  start();
  window.addEventListener('hashchange', () => setTimeout(badge, 50));

  /* ---------- список розмов ---------- */
  function threads() {
    const K = C(), { h } = K;
    const root = h('section', { class: 'msgs' }, K.pageHead(tx('title')), h('div', { class: 'msg-list' }, h('p', { class: 'muted' }, '⏳')));
    if (!authed()) { root.lastChild.replaceChildren(h('p', {}, tx('login'), ' ', h('a', { class: 'btn small', href: '#/login' }, '→'))); return root; }
    get('threads').then(j => {
      const list = j.ok ? j.threads : [];
      root.lastChild.replaceChildren(...(list.length ? list.map(t => h('a', { class: 'msg-thread' + (t.unread ? ' unread' : ''), href: '#/messages/' + t.code },
        AV(t.avatar, { size: 50, mood: t.unread ? 'cheer' : 'idle' }), h('div', {}, h('b', {}, t.name), h('small', { dir: 'auto' }, (t.mine ? tx('you') + ': ' : '') + t.last)),
        h('span', { class: 'msg-meta' }, h('small', {}, when(t.at)), t.unread ? h('i', { class: 'msg-n' }, t.unread) : null))) : [h('p', { class: 'hint' }, tx('empty'))]),
        h('a', { class: 'btn', href: '#/privacy' }, tx('privacy')));
    });
    return root;
  }

  /* ---------- листування ---------- */
  function thread(code) {
    const K = C(), { h } = K;
    code = String(code || '').toUpperCase();
    const root = h('section', { class: 'msgs msg-chat' });
    const box = h('div', { class: 'msg-bubbles' }), head = h('div', { class: 'msg-head' }), foot = h('div', { class: 'msg-foot' }), note = h('p', { class: 'msg-note' });
    root.append(h('a', { class: 'lr-link', href: '#/messages' }, tx('back')), head, box, note, foot);
    if (!authed()) { note.textContent = tx('login'); return root; }
    let last = 0, timer = 0, data = null;
    const render = j => {
      data = j;
      head.replaceChildren(AV(j.with.avatar, { size: 54, mood: 'cheer' }), h('div', {}, h('b', {}, j.with.name), h('small', {}, j.with.code)),
        h('div', { class: 'msg-actions' }, h('a', { class: 'btn small', href: '#/player/c/' + j.with.code }, '👤'),
          h('button', { class: 'btn small', type: 'button', onclick: async () => { if (!j.blocked && !confirm(tx('block_q'))) return; await post({ action: 'block', code, on: !j.blocked }); load(); } }, j.blocked ? tx('unblock') : tx('block')),
          h('button', { class: 'btn small', type: 'button', onclick: async () => { if (!confirm(tx('hide_q'))) return; await post({ action: 'hide', code }); location.hash = '#/messages'; } }, tx('hide'))));
      const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 60;
      box.replaceChildren(...j.messages.map(m => h('div', { class: 'msg-b ' + (m.mine ? 'mine' : 'theirs') }, h('p', { dir: 'auto' }, m.text), h('small', {}, when(m.at) + (m.mine && m.read ? ' ✓✓' : '')),
        !m.mine ? h('button', { class: 'msg-rep', type: 'button', title: tx('report'), onclick: async e => { await post({ action: 'report', id: m.id }); e.target.replaceWith(h('em', {}, tx('reported'))); } }, '🚩') : null)));
      if (j.messages.length !== last || atBottom) box.scrollTop = box.scrollHeight;
      last = j.messages.length;
      note.textContent = j.can ? '' : why(j.reason);
      foot.hidden = !j.can;
    };
    const input = h('textarea', { rows: 2, maxlength: 1000, placeholder: tx('ph'), class: 'msg-input', dir: 'auto' });
    const sendBtn = h('button', { class: 'btn accent', type: 'button', onclick: () => send() }, tx('send'));
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
    foot.append(input, sendBtn);
    async function send() {
      const text = input.value.trim(); if (!text) return;
      sendBtn.disabled = true; const r = await post({ action: 'send', code, text }); sendBtn.disabled = false;
      if (!r.ok) { note.textContent = why(r.error); return; }
      input.value = ''; K.Sfx.good(); load();
    }
    async function load() {
      clearTimeout(timer);
      const j = await get('thread', '&code=' + code);
      if (!root.isConnected) return;
      if (!j.ok) { note.textContent = why(j.error); foot.hidden = true; return; }
      render(j); unread = Math.max(0, unread - (j.messages.filter(m => !m.mine).length ? 0 : 0)); poll();
      timer = setTimeout(() => { if (root.isConnected) load(); }, 8000);
    }
    load();
    setTimeout(() => input.focus(), 100);
    return root;
  }

  /* ---------- 🔒 конфіденційність ---------- */
  function privacy() {
    const K = C(), { h } = K;
    const root = h('section', { class: 'privacy' }, K.pageHead(tx('privacy')), h('p', { class: 'lead-p' }, tx('p_intro')));
    const me = K.currentUser();
    if (!me) { root.append(h('p', {}, tx('login'), ' ', h('a', { class: 'btn small', href: '#/login' }, '→'))); return root; }
    const saved = h('small', { class: 'ok-msg' });
    const flash = () => { saved.textContent = tx('saved'); clearTimeout(flash.t); flash.t = setTimeout(() => { saved.textContent = ''; }, 1500); };
    const P = window.KomiksPlayers;
    const toggle = (checked, onChange) => { const cb = h('input', { type: 'checkbox', checked }); cb.addEventListener('change', () => { onChange(cb.checked); flash(); }); return cb; };
    root.append(
      h('div', { class: 'box priv-row' }, h('label', { class: 'pl-toggle' }, toggle(!!K.store.get('shareProfile', false), on => P && P.setShare(on)), h('span', {}, h('b', {}, tx('p_search')), h('small', {}, tx('p_search_d'))))),
      h('div', { class: 'box priv-row' }, h('label', { class: 'pl-toggle' }, toggle(K.store.get('wallOpen', true) !== false, on => { K.store.set('wallOpen', on); if (P && P.setWall) P.setWall(on); }), h('span', {}, h('b', {}, tx('p_wall')), h('small', {}, tx('p_wall_d'))))));
    if (authed()) {
      const cur = String(window.KomiksAuth.user.msg_pref ?? 1);
      const group = h('div', { class: 'priv-seg' }, tx('p_msg_opts').map(([v, label]) => h('label', { class: 'priv-opt' + (v === cur ? ' on' : '') },
        h('input', { type: 'radio', name: 'msgpref', value: v, checked: v === cur, onchange: async () => { const r = await post({ action: 'prefs', msg: +v }); if (r.ok) { window.KomiksAuth.user.msg_pref = +v; group.querySelectorAll('.priv-opt').forEach(x => x.classList.toggle('on', x.querySelector('input').checked)); flash(); } } }), h('span', {}, label))));
      const blocks = h('ul', { class: 'au-inv-list' }, h('li', {}, '⏳'));
      get('blocks').then(j => { const list = j.ok ? j.blocks : []; blocks.replaceChildren(...(list.length ? list.map(b => h('li', {}, h('span', {}, b.name + ' · ' + b.code), h('button', { class: 'btn small', type: 'button', onclick: async e => { await post({ action: 'block', code: b.code, on: false }); e.target.closest('li').remove(); } }, tx('unblock')))) : [h('li', {}, tx('p_none'))])); });
      root.append(h('div', { class: 'box' }, h('h3', {}, tx('p_msg')), group), h('div', { class: 'box' }, h('h3', {}, tx('p_blocks')), blocks));
    } else root.append(h('p', { class: 'hint' }, tx('local')));
    root.append(saved);
    return root;
  }

  // кнопка «✉️ Написати» для профілю / картки гравця
  const writeBtn = code => (authed() && code && !(window.KomiksBots && window.KomiksBots.isBot(code)) && code !== (window.KomiksAuth.user || {}).friend_code ? C().h('a', { class: 'btn', href: '#/messages/' + code }, tx('write')) : null);
  function render(view, id) { if (view === 'privacy') return privacy(); return id ? thread(id) : threads(); }
  window.KomiksMessages = { render, writeBtn, badge, text: tx };
})();
