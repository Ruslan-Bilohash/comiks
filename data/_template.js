/*
 * ШАБЛОН НОВОГО КОМІКСУ (довідка по полях; цей файл НЕ завантажується)
 * --------------------------------------------------------------------
 * Найпростіше: node tools/new-comic.js 97 "Norsk tittel" "Українська назва"
 * Потім: заповнити кадри → node tools/check.js → tools\update.bat
 *
 * Малюнок кадру (art) генерує assets/art.js:
 *   bg:    kitchen | school | forest | shop | winter | home | park   (school: board — текст на дошці)
 *   chars: [{ id, x (0–400), y? (земля), mood, pose, flip?, s? }]
 *          mood: normal | happy | grin | surprised | sad | angry
 *          pose: down | wave | cheer | point | hold | hips | walk
 *   props: [{ type, x, y? (низ предмета; земля ≈ 290), s?, front? (перед персонажами) }]
 *          cake bowl eggs flour sugar butter milk bread apples note coins backpack desk table
 *          counter ball basket(berries) mushroom berries umbrella snowman(stage 1–3) snowball
 *          carrot mug elg gift balloons book drawing sofa
 *   fx:    flour | snow | rain | hearts | stars
 *   sfx:   { x, y } — де намалювати звук (репліка who: 'sfx')
 * Бульбашки з текстом малюються автоматично над тим, хто говорить (він має бути в chars).
 * Персонажі: data/characters.js (mia, leo, nora, pus, mamma, pappa, laerer, kasserer, bestemor).
 * 'narrator' — текст у жовтій рамці, 'sfx' — звук.
 */
window.COMICS = window.COMICS || [];

COMICS.push({
  id: 'p97',
  level: 'A1',                      // A1 | A2 | B1 | B2
  category: 'hverdag',               // data/basics.js → categories
  title: 'Tittel på norsk',
  titleUk: 'Назва українською',
  titleEn: 'English title',
  summaryUk: 'Короткий опис сюжету українською.',
  summaryEn: 'Short summary in English.',
  summaryNo: 'Kort beskrivelse på norsk.',
  cover: 0,                         // який кадр показати на обкладинці

  panels: [
    {
      art: { bg: 'park', chars: [{ id: 'mia', x: 120, mood: 'happy', pose: 'wave' }, { id: 'leo', x: 280, mood: 'grin' }], props: [{ type: 'ball', x: 200 }] },
      lines: [
        { who: 'mia', no: 'Hei, Leo!', uk: 'Привіт, Лео!', en: 'Hi, Leo!' },
        { who: 'leo', no: 'Hei! Skal vi spille?', uk: 'Привіт! Пограємо?', en: 'Hi! Shall we play?' }
      ]
    }
  ],

  // ключові слова для карток, «Пар» і тестів: [норвезькою, українською, англійською]
  vocab: [
    ['hei', 'привіт', 'hi'],
    ['spille', 'грати', 'play']
  ],

  // слова для «наведи на слово», яких ще немає в data/dictionary.js
  words: { no: { 'skal': 'будемо, збираємося' }, en: { 'skal': 'shall, going to' } }
});
