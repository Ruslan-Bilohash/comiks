/*
 * Персонажі Комікс·Lab.
 * no / uk / en — ім'я; emoji — аватар; color — колір аватара; gender — стать голосу (m/f);
 * pitch / rate — тембр голосу браузера; from — звідки персонаж (no / uk / en);
 * look — як персонаж намальований (assets/art.js):
 *   type: kid | adult | cat, skin, hair, hairStyle: short | spiky | pigtails | long | bun | curly | bald,
 *   shirt, pants, dress, tights, shoes, glasses, beard, apron, accent (колір гумок), fur, stripes
 */
window.CHARACTERS = {
  narrator: { no: 'Forteller', uk: 'Оповідач', en: 'Narrator', emoji: '📜', color: '#a1887f', gender: 'f', pitch: 1.0, rate: 0.95 },
  sfx:      { no: 'Lyd',       uk: 'Звук',     en: 'Sound',    emoji: '💥', color: '#ff7a1a', gender: 'm', pitch: 0.8, rate: 0.9 },

  mia: { no: 'Mia', uk: 'Мія', en: 'Mia', emoji: '👧', color: '#ff80ab', gender: 'f', pitch: 1.5, rate: 1.05,
    look: { type: 'kid', skin: '#f6c9a0', hair: '#8a4b25', hairStyle: 'pigtails', accent: '#ffd23f', shirt: '#ff6fa3', dress: true, tights: '#ffe082', shoes: '#c2185b' } },
  leo: { no: 'Leo', uk: 'Лео', en: 'Leo', emoji: '👦', color: '#4fc3f7', gender: 'm', pitch: 1.4, rate: 1.05,
    look: { type: 'kid', skin: '#f1c27d', hair: '#c9822b', hairStyle: 'spiky', shirt: '#29b6f6', pants: '#3949ab', shoes: '#e53935' } },
  nora: { no: 'Nora', uk: 'Нора', en: 'Nora', emoji: '👧🏾', color: '#ffca28', gender: 'f', pitch: 1.45, rate: 1.05,
    look: { type: 'kid', skin: '#a0673f', hair: '#2b1b12', hairStyle: 'curly', shirt: '#ffca28', pants: '#e53935', shoes: '#5e35b1' } },
  pus: { no: 'Katten Pus', uk: 'Кіт Пус', en: 'Pus the cat', emoji: '🐱', color: '#ffb74d', gender: 'f', pitch: 1.9, rate: 1.0,
    look: { type: 'cat', fur: '#ffb74d', stripes: '#e65100' } },
  mamma: { no: 'Mamma', uk: 'Мама', en: 'Mum', emoji: '👩', color: '#ba68c8', gender: 'f', pitch: 1.1, rate: 0.98,
    look: { type: 'adult', skin: '#f6c9a0', hair: '#8a4b25', hairStyle: 'long', shirt: '#ba68c8', dress: true, tights: '#f6c9a0', shoes: '#6a1b9a' } },
  pappa: { no: 'Pappa', uk: 'Тато', en: 'Dad', emoji: '👨', color: '#43a047', gender: 'm', pitch: 0.95, rate: 0.98,
    look: { type: 'adult', skin: '#f1c27d', hair: '#4e342e', hairStyle: 'short', beard: true, glasses: true, shirt: '#43a047', pants: '#455a64' } },
  laerer: { no: 'Lærer Ingrid', uk: 'Вчителька Інгрід', en: 'Teacher Ingrid', emoji: '👩‍🏫', color: '#26a69a', gender: 'f', pitch: 1.15, rate: 0.95,
    look: { type: 'adult', skin: '#fce1c8', hair: '#d84315', hairStyle: 'bun', glasses: true, shirt: '#26a69a', dress: true, tights: '#455a64', shoes: '#37474f' } },
  kasserer: { no: 'Kasserer Ola', uk: 'Касир Ула', en: 'Cashier Ola', emoji: '🧑‍💼', color: '#e53935', gender: 'm', pitch: 1.0, rate: 1.0,
    look: { type: 'adult', skin: '#e0ac69', hair: '#6d4c41', hairStyle: 'short', shirt: '#e53935', apron: true, pants: '#37474f' } },
  bestemor: { no: 'Bestemor', uk: 'Бабуся', en: 'Grandma', emoji: '👵', color: '#8e24aa', gender: 'f', pitch: 0.95, rate: 0.9,
    look: { type: 'adult', skin: '#f6d5b8', hair: '#e0e0e0', hairStyle: 'bun', glasses: true, shirt: '#8e24aa', dress: true, tights: '#f6d5b8', shoes: '#4a148c' } },

  /* дорослі персонажі для історій A2–B2 */
  humphrey: { no: 'Humphrey', uk: 'Гамфрі', en: 'Humphrey', from: { no: 'fra Kenya', uk: 'з Кенії (Африка)', en: 'from Kenya (Africa)' }, emoji: '👨🏿', color: '#ff9800', gender: 'm', pitch: 0.95, rate: 1.0,
    look: { type: 'adult', skin: '#5b3a29', hair: '#1b1b1b', hairStyle: 'short', shirt: '#ff9800', pants: '#37474f', shoes: '#3e2723' } },
  ruslan: { no: 'Ruslan', uk: 'Руслан', en: 'Ruslan', from: { no: 'fra Ukraina', uk: 'з України', en: 'from Ukraine' }, emoji: '🧔', color: '#1e88e5', gender: 'm', pitch: 0.95, rate: 1.0,
    look: { type: 'adult', skin: '#f1c27d', hair: '#6d4c41', hairStyle: 'short', beard: true, shirt: '#1e88e5', pants: '#263238', shoes: '#212121' } },
  alina: { no: 'Alina', uk: 'Аліна', en: 'Alina', from: { no: 'fra Ukraina', uk: 'з України', en: 'from Ukraine' }, emoji: '👱‍♀️', color: '#ec407a', gender: 'f', pitch: 1.1, rate: 1.0,
    look: { type: 'adult', skin: '#f6d0b1', hair: '#e0b04a', hairStyle: 'long', shirt: '#ec407a', dress: true, tights: '#f6d0b1', shoes: '#880e4f' } },
  denys: { no: 'Denys', uk: 'Денис', en: 'Denys', from: { no: 'fra Ukraina', uk: 'з України', en: 'from Ukraine' }, emoji: '👨', color: '#7cb342', gender: 'm', pitch: 1.0, rate: 1.0,
    look: { type: 'adult', skin: '#f1c27d', hair: '#212121', hairStyle: 'spiky', glasses: true, shirt: '#7cb342', pants: '#3e2723', shoes: '#212121' } },
  maria: { no: 'Maria', uk: 'Марія', en: 'Maria', from: { no: 'fra Bergen', uk: 'з Бергена', en: 'from Bergen' }, emoji: '👩‍🦰', color: '#26c6da', gender: 'f', pitch: 1.1, rate: 1.0,
    look: { type: 'adult', skin: '#fce1c8', hair: '#8d3b2a', hairStyle: 'bun', shirt: '#26c6da', dress: true, tights: '#fce1c8', shoes: '#006064' } },
  kari: { no: 'Sjåfør Kari', uk: 'Водійка Карі', en: 'Kari the driver', from: { no: 'fra Oslo', uk: 'з Осло', en: 'from Oslo' }, emoji: '🚌', color: '#1565c0', gender: 'f', pitch: 1.05, rate: 1.0,
    look: { type: 'adult', skin: '#e0ac69', hair: '#3e2723', hairStyle: 'bun', shirt: '#1565c0', pants: '#263238', shoes: '#212121' } },
  // головний герой історій для англомовних: британець, який переїхав до Норвегії
  musa: { no: 'Musa', uk: 'Муса', en: 'Musa', from: { no: 'fra Storbritannia', uk: 'з Великої Британії', en: 'from the UK' }, emoji: '🧑🏽', color: '#3949ab', gender: 'm', pitch: 1.0, rate: 1.0,
    // високий, жилистий, з бородою й скуйовдженим волоссям — «крейзі мен», ганяє на велосипеді й на крутих тачках
    look: { type: 'adult', tall: true, slim: true, beard: true, skin: '#e8c19a', hair: '#1b1b1b', hairStyle: 'spiky', shirt: '#37474f', pants: '#263238', shoes: '#212121' } },
  morten: { no: 'Lærer Morten', uk: 'Вчитель Мортен', en: 'Teacher Morten', from: { no: 'fra Norge', uk: 'з Норвегії', en: 'from Norway' }, emoji: '👨‍🏫', color: '#2e7d32', gender: 'm', pitch: 0.95, rate: 1.0,
    look: { type: 'adult', skin: '#fce1c8', hair: '#c8a165', hairStyle: 'short', beard: true, glasses: true, shirt: '#2e7d32', pants: '#37474f', shoes: '#3e2723' } },
  // дві доньки Муси — без імен (так попросив автор): старша й молодша сестра
  storesoster: { no: 'Storesøster', uk: 'Старша донька', en: 'Older daughter', emoji: '👧🏽', color: '#8e24aa', gender: 'f', pitch: 1.35, rate: 1.05,
    look: { type: 'kid', skin: '#e8c19a', hair: '#1b1b1b', hairStyle: 'long', accent: '#ab47bc', shirt: '#8e24aa', pants: '#263238', shoes: '#ec407a' } },
  lillesoster: { no: 'Lillesøster', uk: 'Молодша донька', en: 'Younger daughter', emoji: '👧🏽', color: '#26a69a', gender: 'f', pitch: 1.5, rate: 1.05,
    look: { type: 'kid', skin: '#e8c19a', hair: '#2b1b12', hairStyle: 'pigtails', accent: '#ffd23f', shirt: '#26a69a', dress: true, tights: '#b2dfdb', shoes: '#00796b' } }
};
