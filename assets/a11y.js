/* Комікс·Lab — ♿ доступність: розмір тексту, контраст, шрифт для легкого читання, інтервал,
   підкреслені посилання, зупинка анімацій, великий курсор, відтінки сірого. Налаштування — `comiks.a11y`. */
(() => {
  'use strict';
  if (typeof document === 'undefined') return; // службові скрипти Node
  const KEY = 'comiks.a11y';
  const T = {
    uk: { btn: 'Доступність', title: '♿ Доступність', size: 'Розмір тексту', smaller: 'Зменшити текст', bigger: 'Збільшити текст', contrast: 'Висока контрастність', font: 'Шрифт для легкого читання', spacing: 'Більший інтервал між рядками', links: 'Підкреслювати посилання', still: 'Зупинити анімацію', cursor: 'Великий курсор', gray: 'Відтінки сірого', reset: '↺ Скинути все', close: 'Закрити', hint: 'Налаштування зберігаються на цьому пристрої.' },
    en: { btn: 'Accessibility', title: '♿ Accessibility', size: 'Text size', smaller: 'Smaller text', bigger: 'Bigger text', contrast: 'High contrast', font: 'Easy-to-read font', spacing: 'More line spacing', links: 'Underline links', still: 'Stop animations', cursor: 'Big cursor', gray: 'Greyscale', reset: '↺ Reset all', close: 'Close', hint: 'Settings are saved on this device.' },
    no: { btn: 'Tilgjengelighet', title: '♿ Tilgjengelighet', size: 'Tekststørrelse', smaller: 'Mindre tekst', bigger: 'Større tekst', contrast: 'Høy kontrast', font: 'Lettlest skrift', spacing: 'Større linjeavstand', links: 'Understrek lenker', still: 'Stopp animasjoner', cursor: 'Stor markør', gray: 'Gråtoner', reset: '↺ Tilbakestill', close: 'Lukk', hint: 'Innstillingene lagres på denne enheten.' }
  };
  T.ar = { btn: 'إمكانية الوصول', title: '♿ إمكانية الوصول', size: 'حجم النص', smaller: 'نص أصغر', bigger: 'نص أكبر', contrast: 'تباين عالٍ', font: 'خط سهل القراءة', spacing: 'تباعد أكبر بين الأسطر', links: 'تسطير الروابط', still: 'إيقاف الحركة', cursor: 'مؤشر كبير', gray: 'تدرّج رمادي', reset: '↺ إعادة الضبط', close: 'إغلاق', hint: 'تُحفظ الإعدادات على هذا الجهاز.' };
  const OPTS = [['contrast', '🌓'], ['font', '🔤'], ['spacing', '↕️'], ['links', '🔗'], ['still', '⏸️'], ['cursor', '🖱️'], ['gray', '⚫']];
  const SIZES = [90, 100, 112, 125, 140, 160];
  const read = () => { try { return Object.assign({ size: 100 }, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { return { size: 100 }; } };
  const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ } };
  const lang = () => { try { return JSON.parse(localStorage.getItem('comiks.ui') || '"uk"') || 'uk'; } catch { return 'uk'; } };
  const tx = k => (T[(window.KomiksCore && window.KomiksCore.ui) || lang()] || T.en || T.uk)[k];

  function apply(s) {
    const root = document.documentElement;
    root.style.fontSize = s.size && s.size !== 100 ? s.size + '%' : '';
    OPTS.forEach(([k]) => root.classList.toggle('a11y-' + k, !!s[k]));
  }
  let state = read();
  apply(state);

  let panel = null, btn = null;
  const set = patch => { state = Object.assign({}, state, patch); save(state); apply(state); render(); };
  function render() {
    if (!panel) return;
    const i = SIZES.indexOf(state.size);
    panel.innerHTML = '';
    const el = (tag, attrs = {}, ...kids) => { const n = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (k.startsWith('on')) n.addEventListener(k.slice(2), v); else if (v !== false && v != null) n.setAttribute(k, v === true ? '' : v); } kids.flat().forEach(c => c != null && n.append(c)); return n; };
    panel.append(
      el('div', { class: 'a11y-head' }, el('b', { id: 'a11yTitle' }, tx('title')), el('button', { type: 'button', class: 'a11y-x', 'aria-label': tx('close'), onclick: close }, '✕')),
      el('div', { class: 'a11y-size' },
        el('span', {}, tx('size')),
        el('button', { type: 'button', 'aria-label': tx('smaller'), disabled: i <= 0, onclick: () => set({ size: SIZES[Math.max(0, i - 1)] }) }, 'A−'),
        el('output', { 'aria-live': 'polite' }, state.size + '%'),
        el('button', { type: 'button', 'aria-label': tx('bigger'), disabled: i >= SIZES.length - 1, onclick: () => set({ size: SIZES[Math.min(SIZES.length - 1, i + 1)] }) }, 'A+')),
      el('div', { class: 'a11y-grid' }, OPTS.map(([k, ic]) => el('button', { type: 'button', class: 'a11y-opt' + (state[k] ? ' on' : ''), 'aria-pressed': String(!!state[k]), onclick: () => set({ [k]: !state[k] }) }, el('span', { class: 'a11y-ic', 'aria-hidden': 'true' }, ic), el('span', {}, tx(k))))),
      el('div', { class: 'a11y-foot' }, el('small', {}, tx('hint')), el('button', { type: 'button', class: 'a11y-reset', onclick: () => { state = { size: 100 }; save(state); apply(state); render(); } }, tx('reset'))));
  }
  function open() {
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'a11y-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'a11yTitle');
      document.body.append(panel);
    }
    render(); panel.hidden = false; btn.setAttribute('aria-expanded', 'true');
    const first = panel.querySelector('button'); if (first) first.focus();
  }
  function close() { if (panel) panel.hidden = true; if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.focus(); } }
  function mount() {
    if (btn) return;
    btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'a11y-btn'; btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span aria-hidden="true">♿</span>';
    btn.setAttribute('aria-label', tx('btn')); btn.title = tx('btn');
    btn.addEventListener('click', () => (panel && !panel.hidden ? close() : open()));
    document.body.append(btn);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel && !panel.hidden) close(); });
    document.addEventListener('click', e => { if (panel && !panel.hidden && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) close(); });
  }
  const relabel = () => { if (btn) { btn.setAttribute('aria-label', tx('btn')); btn.title = tx('btn'); } if (panel && !panel.hidden) render(); };
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
  window.addEventListener('hashchange', relabel);
  window.KomiksA11y = { open, close, apply: () => apply(state), relabel };
})();
