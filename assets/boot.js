/* Завантажує дані з реєстру data/index.js (паралельно, виконання — по черзі), потім запускає застосунок.
   ?v=<версія> змушує браузер брати свіжі файли після оновлення. Працює і з file://, і на хостингу. */
(function () {
  var reg = window.KOMIKS_DATA || { shared: [], comics: [] };
  var v = reg.version ? '?v=' + encodeURIComponent(reg.version) : '';
  var files = reg.shared.concat(reg.comics.map(function (c) { return c.file; }), ['assets/app.js']);
  // завантажуємо всі файли паралельно, а виконуємо строго по черзі (async = false) — сторінка з’являється в рази швидше
  files.forEach(function (f) {
    var s = document.createElement('script');
    s.src = f + v; s.async = false;
    s.onerror = function () { if (window.console) console.warn('Не вдалося завантажити', f); };
    document.body.appendChild(s);
  });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/localhost|127\.0\.0\.1/.test(location.hostname)) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* офлайн-режим необов'язковий */ });
  }
})();
