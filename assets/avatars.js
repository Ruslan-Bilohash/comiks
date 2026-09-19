/* Комікс·Lab — живі аватари-тваринки (SVG): дихають, кліпають, у переможців — танець.
   Ідентифікатор аватара лишається емодзі (🦊, 🐼 …), щоб не змінювати протокол гри; малюнок будується тут.
   Також — сцена переможців як у Kahoot: п’єдестал із трьома найкращими та «публіка» з рештою гравців. */
(() => {
  'use strict';
  // палітри й ознаки кожної тваринки
  const A = {
    '🦊': { name: 'Rev', body: '#ff8a3d', belly: '#fff3e6', dark: '#5a2a0c', ears: 'point', earIn: '#ffffff', tail: 'fox', muzzle: '#fff3e6' },
    '🐼': { name: 'Panda', body: '#ffffff', belly: '#f1f1f1', dark: '#1e1e24', ears: 'round', earCol: '#1e1e24', patches: true, limbs: '#1e1e24' },
    '🐸': { name: 'Frosk', body: '#56c26b', belly: '#c8f2c6', dark: '#1d4d27', ears: 'none', frog: true },
    '🦁': { name: 'Løve', body: '#ffc247', belly: '#fff0c2', dark: '#6b3d06', ears: 'round', earCol: '#e89a20', mane: '#d9772b', muzzle: '#fff0c2' },
    '🐧': { name: 'Pingvin', body: '#27303f', belly: '#ffffff', dark: '#10151e', ears: 'none', beak: '#ffa629', feet: '#ffa629', faceWhite: true },
    '🐙': { name: 'Blekksprut', body: '#ff6fa8', belly: '#ffd2e5', dark: '#6b1438', ears: 'none', tentacles: true, spots: '#ff9fc6' },
    '🦄': { name: 'Enhjørning', body: '#fbf6ff', belly: '#ffffff', dark: '#5b3f7a', ears: 'point', earIn: '#ffc2e2', horn: true, maneCols: ['#ff8ccf', '#8fd3ff', '#c9a5ff'] },
    '🐝': { name: 'Bie', body: '#ffd23f', belly: '#fff3b0', dark: '#1e1e24', ears: 'none', stripes: '#1e1e24', antennae: true, wings: true },
    '🐢': { name: 'Skilpadde', body: '#8fd16a', belly: '#e8f7c8', dark: '#2e5d1a', ears: 'none', shell: '#6a4b2a' },
    '🐬': { name: 'Delfin', body: '#5aa9e6', belly: '#dff1ff', dark: '#153a5c', ears: 'none', fin: true },
    '🦉': { name: 'Ugle', body: '#9b6b43', belly: '#f3dcc2', dark: '#3b2412', ears: 'tuft', owl: true, beak: '#ffb02e' },
    '🐻': { name: 'Bjørn', body: '#a0673a', belly: '#e8c49e', dark: '#3a2210', ears: 'round', earCol: '#a0673a', muzzle: '#e8c49e', nose: true },
    '🐯': { name: 'Tiger', body: '#ff9a2e', belly: '#fff3e0', dark: '#2b1a0a', ears: 'round', earCol: '#ff9a2e', stripes: '#2b1a0a', muzzle: '#fff3e0' },
    '🐨': { name: 'Koala', body: '#a9b3bf', belly: '#e9edf2', dark: '#2c333d', ears: 'fluffy', earCol: '#a9b3bf', bigNose: true },
    '🦖': { name: 'Dino', body: '#3cc9a2', belly: '#c9f5e7', dark: '#0f4a3b', ears: 'none', spikes: '#ff9f43' },
    '🐳': { name: 'Hval', body: '#3f7fd9', belly: '#d4e6ff', dark: '#10305c', ears: 'none', spout: true },
    '🐱': { name: 'Katt', body: '#ffb366', belly: '#fff1e0', dark: '#5a3210', ears: 'point', earIn: '#ffc2d1', whiskers: true, muzzle: '#fff1e0' },
    '🐶': { name: 'Hund', body: '#e0b07a', belly: '#fff3e0', dark: '#4a2c10', ears: 'floppy', earCol: '#8a5a2b', muzzle: '#fff3e0' },
    '🐰': { name: 'Kanin', body: '#f4f2f8', belly: '#ffffff', dark: '#4a4458', ears: 'long', earIn: '#ffc2d1', teeth: true, whiskers: true },
    '🐵': { name: 'Ape', body: '#8d5a36', belly: '#e8c09a', dark: '#3a220e', ears: 'side', earCol: '#d9a57a', faceCol: '#e8c09a' },
    '🐷': { name: 'Gris', body: '#ffb3c7', belly: '#ffd9e4', dark: '#7a2d45', ears: 'tri', earCol: '#ff8fb0', snout: '#ff8fb0' },
    '🐮': { name: 'Ku', body: '#ffffff', belly: '#f4f4f4', dark: '#2b2b2b', ears: 'side', earCol: '#ffffff', cowSpots: true, horns: '#f3e3c3', snout: '#ffc2d1' },
    '🐤': { name: 'Kylling', body: '#ffe14d', belly: '#fff3a8', dark: '#6b4a00', ears: 'none', beak: '#ff9f1c', feet: '#ff9f1c', tuft: true },
    '🐭': { name: 'Mus', body: '#b8bec8', belly: '#eef0f4', dark: '#3a3f4a', ears: 'bigRound', earCol: '#b8bec8', whiskers: true, pinkNose: true },
    '🦔': { name: 'Pinnsvin', body: '#d8b48c', belly: '#f6e6d2', dark: '#3a2410', ears: 'none', hedgehog: '#6b4a2e', muzzle: '#f6e6d2' },
    '🐘': { name: 'Elefant', body: '#9fb3c8', belly: '#dce6f0', dark: '#2c3e50', ears: 'elephant', earCol: '#9fb3c8', trunk: true },
    '🐲': { name: 'Drage', body: '#e2474b', belly: '#ffd166', dark: '#5a0f14', ears: 'none', horns: '#ffd166', spikes: '#ffd166', dragonWings: '#ff8a8e' },
    '🤖': { name: 'Robot', body: '#b0bec5', belly: '#e3eaee', dark: '#263238', ears: 'bolt', robot: true },
    '👽': { name: 'Romvesen', body: '#7ee081', belly: '#c9f7c9', dark: '#1d5c20', ears: 'none', alien: true },
    '🦈': { name: 'Hai', body: '#6f8fa8', belly: '#ffffff', dark: '#1f3547', ears: 'none', fin: true, teeth: true, sharkFace: true },
    '🐺': { name: 'Ulv', body: '#8e9aab', belly: '#e8ecf2', dark: '#2c333d', ears: 'point', earIn: '#cfd6e0', muzzle: '#e8ecf2', tail: 'fox' },
    '🦝': { name: 'Vaskebjørn', body: '#9e9e9e', belly: '#eeeeee', dark: '#212121', ears: 'round', earCol: '#9e9e9e', raccoon: true, muzzle: '#eeeeee' },
    '🐿️': { name: 'Ekorn', body: '#d9772b', belly: '#fff0dc', dark: '#4a2208', ears: 'point', earIn: '#ffc2a0', squirrel: true, teeth: true },
    '🐹': { name: 'Hamster', body: '#f2c27a', belly: '#fff6e6', dark: '#5a3a10', ears: 'round', earCol: '#f2c27a', hamster: true, pinkNose: true, whiskers: true },
    '🦌': { name: 'Hjort', body: '#b07a4a', belly: '#f3dcc2', dark: '#3a220e', ears: 'point', earIn: '#f3dcc2', antlers: '#6d4c41', muzzle: '#f3dcc2', deerSpots: true },
    '🐑': { name: 'Sau', body: '#fafafa', belly: '#ffffff', dark: '#3a3a3a', ears: 'side', earCol: '#5d5d5d', wool: true, faceCol: '#5d5d5d' },
    '🦇': { name: 'Flaggermus', body: '#5b4b8a', belly: '#9d8fc9', dark: '#1d1438', ears: 'point', earIn: '#ff9fc6', dragonWings: '#3d2f6b', fangs: true },
    '🦜': { name: 'Papegøye', body: '#35c24a', belly: '#ffe14d', dark: '#0f4a18', ears: 'none', beak: '#ffb02e', tuft: true, parrot: true },
    '🐞': { name: 'Marihøne', body: '#e53935', belly: '#1e1e24', dark: '#1e1e24', ears: 'none', ladybug: true, antennae: true },
    '🦩': { name: 'Flamingo', body: '#ff8fb8', belly: '#ffd2e5', dark: '#7a1f45', ears: 'none', beak: '#1e1e24', tuft: true, feet: '#ff5f96' },
    '👑': { name: 'Spilleder', body: '#8f6bff', belly: '#e6dcff', dark: '#2b1a6b', ears: 'round', earCol: '#8f6bff', crown: true },
    '🙂': { name: 'Venn', body: '#ffcf4d', belly: '#fff3c4', dark: '#5a3d00', ears: 'none' }
  };
  const LIST = Object.keys(A).filter(k => k !== '👑' && k !== '🙂');
  /* ---------------- аксесуари: шапки, окуляри, речі на шию ---------------- */
  // stars — скільки зірок з тестів треба, щоб відкрити річ
  const HATS = {
    cap: { stars: 0, uk: 'Кепка', en: 'Cap', no: 'Caps', draw: () => `<path d="M30 30 C30 2 90 2 90 30Z" fill="#e53935" stroke="#5a0f0f" stroke-width="3"/><path d="M56 28 L112 32 Q108 40 56 36Z" fill="#c62828" stroke="#5a0f0f" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="6" r="4" fill="#ff8a80"/><path d="M44 12 C50 8 56 8 60 8" stroke="#ff8a80" stroke-width="3" fill="none"/>` },
    beanie: { stars: 0, uk: 'Шапка', en: 'Beanie', no: 'Lue', draw: () => `<path d="M28 34 C28 -2 92 -2 92 34Z" fill="#3f7fd9" stroke="#10305c" stroke-width="3"/><rect x="26" y="26" width="68" height="12" rx="6" fill="#ffd23f" stroke="#10305c" stroke-width="3"/><circle cx="60" cy="-4" r="9" fill="#ffd23f" stroke="#10305c" stroke-width="3"/>` },
    party: { stars: 3, uk: 'Святковий ковпак', en: 'Party hat', no: 'Festhatt', draw: () => `<path d="M42 28 L60 -26 L78 28Z" fill="#ff5fa2" stroke="#6b1438" stroke-width="3" stroke-linejoin="round"/><path d="M48 12 L72 12 M52 0 L68 0 M55 -12 L65 -12" stroke="#ffd23f" stroke-width="4"/><circle cx="60" cy="-28" r="6" fill="#ffd23f" stroke="#6b1438" stroke-width="2.5"/>` },
    flower: { stars: 5, uk: 'Квітка', en: 'Flower', no: 'Blomst', draw: () => `<g transform="translate(86 22)">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="-9" rx="7" ry="10" fill="#ff8ccf" stroke="#8a1f5a" stroke-width="2" transform="rotate(${r})"/>`).join('')}<circle r="6" fill="#ffd23f" stroke="#8a1f5a" stroke-width="2"/></g>` },
    bow: { stars: 5, uk: 'Бантик', en: 'Hair bow', no: 'Sløyfe', draw: () => `<g transform="translate(80 20)"><path d="M0 0 L-18 -12 L-18 12Z M0 0 L18 -12 L18 12Z" fill="#ff4d8d" stroke="#7a1238" stroke-width="2.5" stroke-linejoin="round"/><circle r="5" fill="#ff85b3" stroke="#7a1238" stroke-width="2.5"/></g>` },
    phones: { stars: 8, uk: 'Навушники', en: 'Headphones', no: 'Hodetelefoner', draw: () => `<path d="M16 64 C12 10 108 10 104 64" fill="none" stroke="#263238" stroke-width="7" stroke-linecap="round"/><rect x="4" y="54" width="18" height="28" rx="8" fill="#00c2d7" stroke="#263238" stroke-width="3"/><rect x="98" y="54" width="18" height="28" rx="8" fill="#00c2d7" stroke="#263238" stroke-width="3"/>` },
    chef: { stars: 10, uk: 'Кухарський ковпак', en: 'Chef hat', no: 'Kokkelue', draw: () => `<rect x="38" y="12" width="44" height="16" rx="3" fill="#fff" stroke="#546e7a" stroke-width="3"/><path d="M38 14 C24 12 24 -10 40 -8 C42 -22 60 -22 62 -12 C68 -24 88 -18 84 -4 C98 -2 96 16 82 14Z" fill="#fff" stroke="#546e7a" stroke-width="3" stroke-linejoin="round"/>` },
    cowboy: { stars: 15, uk: 'Ковбойський капелюх', en: 'Cowboy hat', no: 'Cowboyhatt', draw: () => `<path d="M8 26 C20 38 100 38 112 26 C100 30 84 28 80 26 L76 2 C70 -4 50 -4 44 2 L40 26 C36 28 20 30 8 26Z" fill="#a0673a" stroke="#3a2210" stroke-width="3" stroke-linejoin="round"/><path d="M42 18 H78" stroke="#ffd23f" stroke-width="4"/>` },
    top: { stars: 20, uk: 'Циліндр', en: 'Top hat', no: 'Flosshatt', draw: () => `<ellipse cx="60" cy="26" rx="38" ry="8" fill="#1e1e24" stroke="#000" stroke-width="3"/><rect x="38" y="-20" width="44" height="46" rx="4" fill="#26262e" stroke="#000" stroke-width="3"/><rect x="38" y="12" width="44" height="8" fill="#e53935"/>` },
    grad: { stars: 30, uk: 'Шапка випускника', en: 'Graduation cap', no: 'Studenthatt', draw: () => `<path d="M38 18 L38 30 C50 36 70 36 82 30 L82 18Z" fill="#26262e" stroke="#000" stroke-width="3"/><path d="M14 14 L60 -2 L106 14 L60 30Z" fill="#26262e" stroke="#000" stroke-width="3" stroke-linejoin="round"/><path d="M60 14 L96 18 L96 38" stroke="#ffd23f" stroke-width="3" fill="none"/><circle cx="96" cy="40" r="4" fill="#ffd23f"/>` },
    viking: { stars: 40, uk: 'Шолом вікінга', en: 'Viking helmet', no: 'Vikinghjelm', draw: () => `<path d="M28 32 C28 0 92 0 92 32Z" fill="#b0bec5" stroke="#37474f" stroke-width="3"/><rect x="26" y="26" width="68" height="10" rx="4" fill="#8d6e63" stroke="#37474f" stroke-width="3"/><path d="M30 20 C14 16 8 -2 14 -12 C18 0 26 6 36 10Z" fill="#fff3e0" stroke="#5d4037" stroke-width="3" stroke-linejoin="round"/><path d="M90 20 C106 16 112 -2 106 -12 C102 0 94 6 84 10Z" fill="#fff3e0" stroke="#5d4037" stroke-width="3" stroke-linejoin="round"/>` },
    band: { stars: 2, uk: 'Пов’язка спортсмена', en: 'Sweatband', no: 'Svettebånd', draw: () => `<rect x="18" y="34" width="84" height="12" rx="6" fill="#e53935" stroke="#5a0f0f" stroke-width="3"/><path d="M22 40 H98" stroke="#fff" stroke-width="3"/>` },
    bunny: { stars: 4, uk: 'Вушка кролика', en: 'Bunny ears', no: 'Kaninører', draw: () => `<path d="M24 30 C28 22 92 22 96 30" fill="none" stroke="#ff85b3" stroke-width="6" stroke-linecap="round"/><path d="M42 26 C34 -18 52 -24 54 22Z" fill="#fff" stroke="#8a1f4a" stroke-width="3"/><path d="M78 26 C86 -18 68 -24 66 22Z" fill="#fff" stroke="#8a1f4a" stroke-width="3"/><path d="M45 20 C40 -6 50 -10 51 18Z M75 20 C80 -6 70 -10 69 18Z" fill="#ffc2d1"/>` },
    beret: { stars: 6, uk: 'Берет', en: 'Beret', no: 'Alpelue', draw: () => `<ellipse cx="54" cy="20" rx="36" ry="13" fill="#3949ab" stroke="#1a237e" stroke-width="3" transform="rotate(-10 54 20)"/><path d="M52 6 L54 -2" stroke="#1a237e" stroke-width="4" stroke-linecap="round"/>` },
    propeller: { stars: 8, uk: 'Кепка з пропелером', en: 'Propeller cap', no: 'Propellcaps', draw: () => `<path d="M30 30 C30 4 90 4 90 30Z" fill="#ffd23f" stroke="#6b4a00" stroke-width="3"/><path d="M60 6 C54 16 54 24 56 30 M60 6 C66 16 66 24 64 30" stroke="#e53935" stroke-width="5" fill="none"/><path d="M60 6 V-4" stroke="#333" stroke-width="3"/><g class="av-prop"><ellipse cx="46" cy="-6" rx="14" ry="4" fill="#4dabff" stroke="#10305c" stroke-width="2"/><ellipse cx="74" cy="-6" rx="14" ry="4" fill="#ff5fa2" stroke="#6b1438" stroke-width="2"/></g><circle cx="60" cy="-6" r="3.5" fill="#333"/>` },
    santa: { stars: 12, uk: 'Шапка Санти', en: 'Santa hat', no: 'Nisselue', draw: () => `<path d="M28 30 C30 -4 72 -16 100 12 L92 30Z" fill="#e53935" stroke="#5a0f0f" stroke-width="3" stroke-linejoin="round"/><rect x="24" y="24" width="72" height="13" rx="6.5" fill="#fff" stroke="#9e9e9e" stroke-width="2.5"/><circle cx="102" cy="14" r="8" fill="#fff" stroke="#9e9e9e" stroke-width="2.5"/>` },
    detective: { stars: 18, uk: 'Капелюх детектива', en: 'Detective hat', no: 'Detektivlue', draw: () => `<path d="M26 32 C26 0 94 0 94 32Z" fill="#a1887f" stroke="#3e2723" stroke-width="3"/><path d="M38 8 L38 30 M52 4 L52 30 M68 4 L68 30 M82 8 L82 30 M30 18 H90" stroke="#6d4c41" stroke-width="2" opacity=".7"/><path d="M26 30 L14 40 L30 38Z M94 30 L106 40 L90 38Z" fill="#a1887f" stroke="#3e2723" stroke-width="3" stroke-linejoin="round"/>` },
    sombrero: { stars: 25, uk: 'Сомбреро', en: 'Sombrero', no: 'Sombrero', draw: () => `<ellipse cx="60" cy="28" rx="58" ry="11" fill="#ffca28" stroke="#8d6e00" stroke-width="3"/><path d="M40 28 C40 -8 80 -8 80 28Z" fill="#ffca28" stroke="#8d6e00" stroke-width="3"/><path d="M42 20 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5" stroke="#e53935" stroke-width="3" fill="none"/>` },
    witch: { stars: 0, game: true, uk: 'Капелюх чарівниці', en: 'Witch hat', no: 'Heksehatt', draw: () => `<ellipse cx="60" cy="28" rx="50" ry="9" fill="#5e35b1" stroke="#1a0f3d" stroke-width="3"/><path d="M36 28 L58 -20 C66 -26 80 -22 84 -14 C76 -16 70 -12 68 -6 L84 28Z" fill="#6a3de8" stroke="#1a0f3d" stroke-width="3" stroke-linejoin="round"/><rect x="38" y="18" width="46" height="8" fill="#ffd23f"/><path d="M50 4 l2 4 4 .5 -3 3 .8 4 -3.8 -2 -3.8 2 .8 -4 -3 -3 4 -.5z" fill="#ffd23f"/>` },
    pirate: { stars: 0, game: true, uk: 'Піратський капелюх', en: 'Pirate hat', no: 'Piratlue', draw: () => `<path d="M14 26 C24 -6 96 -6 106 26 C92 20 80 30 60 30 C40 30 28 20 14 26Z" fill="#1e1e24" stroke="#000" stroke-width="3" stroke-linejoin="round"/><path d="M20 22 C40 28 80 28 100 22" stroke="#ffd23f" stroke-width="3" fill="none"/><circle cx="60" cy="10" r="6" fill="#fff"/><path d="M54 18 L66 22 M66 18 L54 22" stroke="#fff" stroke-width="2.5"/>` },
    halo: { stars: 0, game: true, uk: 'Німб', en: 'Halo', no: 'Glorie', draw: () => `<g class="av-halo"><ellipse cx="60" cy="-4" rx="30" ry="8" fill="none" stroke="#ffe066" stroke-width="6"/><ellipse cx="60" cy="-4" rx="30" ry="8" fill="none" stroke="#fff8c4" stroke-width="2"/></g>` },
    tiara: { stars: 0, game: true, uk: 'Тіара', en: 'Tiara', no: 'Tiara', draw: () => `<path d="M30 30 C40 18 80 18 90 30 L84 12 L72 22 L60 4 L48 22 L36 12Z" fill="#e0e0e0" stroke="#607d8b" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="14" r="5" fill="#ff4d8d" stroke="#607d8b" stroke-width="2"/><circle cx="42" cy="22" r="3" fill="#4dabff"/><circle cx="78" cy="22" r="3" fill="#4dabff"/>` },
    knight: { stars: 0, game: true, uk: 'Шолом лицаря', en: 'Knight helmet', no: 'Ridderhjelm', draw: () => `<path d="M24 40 C24 -2 96 -2 96 40Z" fill="#b0bec5" stroke="#37474f" stroke-width="3"/><path d="M60 2 V40 M30 30 H90" stroke="#78909c" stroke-width="3"/><path d="M60 2 C66 -14 84 -16 92 -8 C80 -8 72 -2 68 4Z" fill="#e53935" stroke="#5a0f0f" stroke-width="2.5"/>` },
    crown: { stars: 60, uk: 'Корона', en: 'Crown', no: 'Krone', draw: () => `<path d="M34 26 L40 2 L51 16 L60 -4 L69 16 L80 2 L86 26Z" fill="#ffd23f" stroke="#8a5a00" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="12" r="4" fill="#ff4d6d"/><circle cx="45" cy="17" r="3" fill="#4dabff"/><circle cx="75" cy="17" r="3" fill="#4dabff"/>` }
  };
  const GLASSES = {
    round: { stars: 0, uk: 'Круглі окуляри', en: 'Round glasses', no: 'Runde briller', draw: y => `<g fill="rgba(200,230,255,.25)" stroke="#263238" stroke-width="3.5"><circle cx="42" cy="${y}" r="14"/><circle cx="78" cy="${y}" r="14"/></g><path d="M56 ${y} Q60 ${y - 4} 64 ${y}" stroke="#263238" stroke-width="3" fill="none"/>` },
    nerd: { stars: 0, uk: 'Товсті окуляри', en: 'Nerd glasses', no: 'Nerdebriller', draw: y => `<g fill="rgba(255,255,255,.15)" stroke="#111" stroke-width="5"><rect x="26" y="${y - 12}" width="32" height="24" rx="6"/><rect x="62" y="${y - 12}" width="32" height="24" rx="6"/></g><path d="M58 ${y - 2} H62" stroke="#111" stroke-width="5"/>` },
    sun: { stars: 4, uk: 'Сонцезахисні', en: 'Sunglasses', no: 'Solbriller', draw: y => `<path d="M24 ${y - 10} H96 V${y - 4} Q94 ${y + 14} 80 ${y + 14} Q66 ${y + 14} 64 ${y - 2} H56 Q54 ${y + 14} 40 ${y + 14} Q26 ${y + 14} 24 ${y - 4}Z" fill="#141414" stroke="#000" stroke-width="2.5"/><path d="M32 ${y - 4} L40 ${y - 4} M70 ${y - 4} L78 ${y - 4}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>` },
    heart: { stars: 8, uk: 'Окуляри-серця', en: 'Heart glasses', no: 'Hjertebriller', draw: y => [42, 78].map(x => `<path d="M${x} ${y + 12} C${x - 20} ${y} ${x - 14} ${y - 16} ${x} ${y - 6} C${x + 14} ${y - 16} ${x + 20} ${y} ${x} ${y + 12}Z" fill="rgba(255,64,129,.75)" stroke="#8a1f4a" stroke-width="3" stroke-linejoin="round"/>`).join('') + `<path d="M54 ${y - 4} H66" stroke="#8a1f4a" stroke-width="3"/>` },
    star: { stars: 12, uk: 'Окуляри-зірки', en: 'Star glasses', no: 'Stjernebriller', draw: y => [42, 78].map(x => `<path d="M${x} ${y - 15} L${x + 4.5} ${y - 5} L${x + 15} ${y - 4} L${x + 7} ${y + 3} L${x + 9} ${y + 14} L${x} ${y + 8} L${x - 9} ${y + 14} L${x - 7} ${y + 3} L${x - 15} ${y - 4} L${x - 4.5} ${y - 5}Z" fill="rgba(255,210,63,.8)" stroke="#8a5a00" stroke-width="2.5" stroke-linejoin="round"/>`).join('') + `<path d="M55 ${y - 4} H65" stroke="#8a5a00" stroke-width="3"/>` },
    mono: { stars: 18, uk: 'Монокль', en: 'Monocle', no: 'Monokkel', draw: y => `<circle cx="78" cy="${y}" r="14" fill="rgba(200,230,255,.25)" stroke="#b8860b" stroke-width="3.5"/><path d="M90 ${y + 8} Q98 ${y + 30} 88 ${y + 46}" stroke="#b8860b" stroke-width="2" fill="none"/>` },
    glasses3d: { stars: 6, uk: '3D-окуляри', en: '3D glasses', no: '3D-briller', draw: y => `<rect x="24" y="${y - 12}" width="72" height="24" rx="4" fill="#fff" stroke="#263238" stroke-width="3"/><rect x="29" y="${y - 8}" width="26" height="16" rx="2" fill="rgba(229,57,53,.8)"/><rect x="65" y="${y - 8}" width="26" height="16" rx="2" fill="rgba(0,188,212,.8)"/>` },
    aviator: { stars: 15, uk: 'Авіатори', en: 'Aviators', no: 'Pilotbriller', draw: y => `<g fill="rgba(121,85,72,.75)" stroke="#b8860b" stroke-width="2.5"><path d="M26 ${y - 8} H56 C58 ${y + 10} 50 ${y + 16} 40 ${y + 16} C30 ${y + 16} 24 ${y + 6} 26 ${y - 8}Z"/><path d="M64 ${y - 8} H94 C96 ${y + 6} 90 ${y + 16} 80 ${y + 16} C70 ${y + 16} 62 ${y + 10} 64 ${y - 8}Z"/></g><path d="M56 ${y - 6} H64 M26 ${y - 10} H94" stroke="#b8860b" stroke-width="2.5"/>` },
    vr: { stars: 35, uk: 'VR-окуляри', en: 'VR headset', no: 'VR-briller', draw: y => `<path d="M6 ${y} H114" stroke="#263238" stroke-width="7"/><rect x="20" y="${y - 16}" width="80" height="32" rx="10" fill="#263238" stroke="#000" stroke-width="3"/><rect x="26" y="${y - 10}" width="68" height="20" rx="7" fill="url(#vrG)"/><defs><linearGradient id="vrG" x1="0" x2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#7b61ff"/></linearGradient></defs>` },
    pixel: { stars: 0, game: true, uk: 'Піксельні окуляри', en: 'Pixel shades', no: 'Pikselbriller', draw: y => `<path d="M22 ${y - 8} H98 V${y - 2} H94 V${y + 2} H90 V${y + 6} H72 V${y + 2} H68 V${y - 2} H52 V${y + 2} H48 V${y + 6} H30 V${y + 2} H26 V${y - 2} H22Z" fill="#141414"/><rect x="30" y="${y - 4}" width="4" height="4" fill="#fff"/><rect x="72" y="${y - 4}" width="4" height="4" fill="#fff"/>` },
    patch: { stars: 0, game: true, uk: 'Піратська пов’язка', en: 'Eye patch', no: 'Øyelapp', draw: y => `<path d="M14 ${y - 22} L106 ${y + 10}" stroke="#141414" stroke-width="3"/><ellipse cx="78" cy="${y}" rx="15" ry="14" fill="#141414"/>` },
    mask: { stars: 0, game: true, uk: 'Маска супергероя', en: 'Hero mask', no: 'Heltemaske', draw: y => `<path fill-rule="evenodd" d="M18 ${y - 4} C30 ${y - 18} 50 ${y - 16} 60 ${y - 8} C70 ${y - 16} 90 ${y - 18} 102 ${y - 4} C98 ${y + 14} 76 ${y + 18} 60 ${y + 8} C44 ${y + 18} 22 ${y + 14} 18 ${y - 4}Z M32 ${y} a10 8 0 1 0 20 0 a10 8 0 1 0 -20 0Z M68 ${y} a10 8 0 1 0 20 0 a10 8 0 1 0 -20 0Z" fill="#e53935" stroke="#5a0f0f" stroke-width="2.5"/>` },
    ski: { stars: 25, uk: 'Лижна маска', en: 'Ski goggles', no: 'Skibriller', draw: y => `<path d="M8 ${y} H112" stroke="#263238" stroke-width="6"/><rect x="24" y="${y - 14}" width="72" height="28" rx="14" fill="url(#skiG)" stroke="#263238" stroke-width="3.5"/><defs><linearGradient id="skiG" x1="0" x2="1"><stop offset="0" stop-color="#ff9f1c"/><stop offset=".5" stop-color="#ff3cac"/><stop offset="1" stop-color="#7b61ff"/></linearGradient></defs><path d="M32 ${y - 6} H48" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>` }
  };
  const NECK = {
    bowtie: { stars: 0, uk: 'Метелик', en: 'Bow tie', no: 'Tversløyfe', draw: () => `<path d="M60 108 L42 98 L42 118Z M60 108 L78 98 L78 118Z" fill="#e53935" stroke="#5a0f0f" stroke-width="2.5" stroke-linejoin="round"/><circle cx="60" cy="108" r="5" fill="#c62828" stroke="#5a0f0f" stroke-width="2.5"/>` },
    scarf: { stars: 3, uk: 'Шарф', en: 'Scarf', no: 'Skjerf', draw: () => `<path d="M24 100 C40 112 80 112 96 100 L98 110 C80 122 40 122 22 110Z" fill="#43a047" stroke="#1b5e20" stroke-width="3" stroke-linejoin="round"/><path d="M78 112 L82 134 L94 132 L88 108Z" fill="#43a047" stroke="#1b5e20" stroke-width="3" stroke-linejoin="round"/><path d="M30 106 l4 6 M44 110 l3 6 M60 112 v6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` },
    tie: { stars: 6, uk: 'Краватка', en: 'Tie', no: 'Slips', draw: () => `<path d="M54 100 L66 100 L63 108 L57 108Z" fill="#3949ab" stroke="#1a237e" stroke-width="2.5" stroke-linejoin="round"/><path d="M57 108 L63 108 L68 128 L60 136 L52 128Z" fill="#3f51b5" stroke="#1a237e" stroke-width="2.5" stroke-linejoin="round"/><path d="M58 116 L64 120 M56 124 L65 128" stroke="#ffd23f" stroke-width="2"/>` },
    necklace: { stars: 10, uk: 'Намисто', en: 'Necklace', no: 'Halskjede', draw: () => Array.from({ length: 9 }, (_, i) => { const t = Math.PI * (0.15 + i / 8 * 0.7); return `<circle cx="${(60 - Math.cos(t) * 30).toFixed(1)}" cy="${(96 + Math.sin(t) * 14).toFixed(1)}" r="4.5" fill="${['#ff4d8d', '#ffd23f', '#4dabff'][i % 3]}" stroke="#333" stroke-width="1.5"/>`; }).join('') },
    bell: { stars: 4, uk: 'Нашийник із дзвіночком', en: 'Bell collar', no: 'Bjellehalsbånd', draw: () => `<path d="M26 100 C40 110 80 110 94 100" stroke="#e53935" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M52 108 C52 98 68 98 68 108 L70 114 H50Z" fill="#ffd23f" stroke="#8a5a00" stroke-width="2.5"/><circle cx="60" cy="116" r="2.5" fill="#8a5a00"/>` },
    lei: { stars: 8, uk: 'Гавайська гірлянда', en: 'Flower lei', no: 'Blomsterkrans', draw: () => Array.from({ length: 11 }, (_, i) => { const t = Math.PI * (0.1 + i / 10 * 0.8); return `<circle cx="${(60 - Math.cos(t) * 36).toFixed(1)}" cy="${(96 + Math.sin(t) * 16).toFixed(1)}" r="7" fill="${['#ff5fa2', '#ffd23f', '#7ee081', '#ff8a3d'][i % 4]}" stroke="#8a1f4a" stroke-width="1.5"/>`; }).join('') },
    stripes: { stars: 12, uk: 'Смугастий шарф', en: 'Striped scarf', no: 'Stripete skjerf', draw: () => `<path d="M22 100 C40 114 80 114 98 100 L100 112 C80 126 40 126 20 112Z" fill="#fff" stroke="#b71c1c" stroke-width="3"/><path d="M34 106 L36 118 M50 110 L50 122 M66 110 L66 122 M82 106 L80 118" stroke="#e53935" stroke-width="6"/><path d="M28 112 L22 138 L36 138 L40 116Z" fill="#fff" stroke="#b71c1c" stroke-width="3"/><path d="M26 124 H38" stroke="#e53935" stroke-width="5"/>` },
    chain: { stars: 0, game: true, uk: 'Золотий ланцюг', en: 'Gold chain', no: 'Gullkjede', draw: () => `<path d="M30 96 C40 118 80 118 90 96" stroke="#ffd23f" stroke-width="6" fill="none" stroke-dasharray="6 3"/><path d="M60 112 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1z" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/>` },
    cape: { stars: 0, game: true, uk: 'Плащ героя', en: 'Hero cape', no: 'Heltekappe', back: () => `<path class="av-cape" d="M24 84 C10 110 6 132 2 142 C40 136 80 136 118 142 C114 132 110 110 96 84Z" fill="#e53935" stroke="#5a0f0f" stroke-width="3" stroke-linejoin="round"/>`, draw: () => `<circle cx="30" cy="92" r="6" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/><circle cx="90" cy="92" r="6" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/>` },
    medal: { stars: 30, uk: 'Медаль', en: 'Medal', no: 'Medalje', draw: () => `<path d="M46 96 L56 118 L64 118 L74 96" fill="none" stroke="#e53935" stroke-width="6"/><circle cx="60" cy="124" r="11" fill="#ffd23f" stroke="#8a5a00" stroke-width="3"/><path d="M60 117 l2.3 4.7 5.2 .8 -3.8 3.6 .9 5.1 -4.6 -2.4 -4.6 2.4 .9 -5.1 -3.8 -3.6 5.2 -.8z" fill="#fff3b0"/>` }
  };
  // body — колір, grad — градієнт (для рідкісних), game — лише з нагород
  const COLORS = {
    red: { stars: 0, uk: 'Червоний', en: 'Red', no: 'Rød', body: '#ef5350' },
    orange: { stars: 0, uk: 'Помаранчевий', en: 'Orange', no: 'Oransje', body: '#ffa040' },
    yellow: { stars: 0, uk: 'Жовтий', en: 'Yellow', no: 'Gul', body: '#ffd54f' },
    green: { stars: 2, uk: 'Зелений', en: 'Green', no: 'Grønn', body: '#66bb6a' },
    mint: { stars: 4, uk: 'М’ятний', en: 'Mint', no: 'Mint', body: '#7ee8c8' },
    sky: { stars: 4, uk: 'Блакитний', en: 'Sky blue', no: 'Himmelblå', body: '#64b5f6' },
    navy: { stars: 8, uk: 'Синій', en: 'Navy', no: 'Marineblå', body: '#3f51b5' },
    purple: { stars: 8, uk: 'Фіолетовий', en: 'Purple', no: 'Lilla', body: '#9c6ade' },
    pink: { stars: 6, uk: 'Рожевий', en: 'Pink', no: 'Rosa', body: '#f48fb1' },
    choco: { stars: 10, uk: 'Шоколадний', en: 'Chocolate', no: 'Sjokolade', body: '#8d6e63' },
    snow: { stars: 12, uk: 'Сніжний', en: 'Snow', no: 'Snø', body: '#f5f7fb' },
    night: { stars: 20, uk: 'Нічний', en: 'Night', no: 'Natt', body: '#37474f' },
    gold: { stars: 0, game: true, uk: 'Золотий', en: 'Gold', no: 'Gull', grad: ['#fff3a8', '#ffd23f', '#c98a00'] },
    galaxy: { stars: 0, game: true, uk: 'Галактика', en: 'Galaxy', no: 'Galakse', grad: ['#7b61ff', '#ff3cac', '#00e5ff'] },
    rainbow: { stars: 0, game: true, uk: 'Веселка', en: 'Rainbow', no: 'Regnbue', grad: ['#ff5f5f', '#ffd23f', '#5fd35f', '#4dabff', '#b36bff'] }
  };
  const CATALOG = { hat: HATS, glasses: GLASSES, neck: NECK, color: COLORS };
  // Ексклюзивні костюми віртуальних гравців: їх немає в CATALOG, тож у студії, скрині й valid() гравця вони недоступні
  const BOT = {
    hat: {
      astro: { uk: 'Шолом астронавта', en: 'Space helmet', no: 'Romhjelm', draw: () => `<circle cx="60" cy="56" r="60" fill="rgba(180,230,255,.22)" stroke="#cfd8dc" stroke-width="5"/><path d="M22 34 Q36 12 58 8" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".75"/><rect x="42" y="-8" width="36" height="10" rx="4" fill="#90a4ae" stroke="#37474f" stroke-width="2"/><circle cx="60" cy="-12" r="5" fill="#ff5252" stroke="#37474f" stroke-width="2"/>` },
      samurai: { uk: 'Шолом самурая', en: 'Samurai helmet', no: 'Samuraihjelm', draw: () => `<path d="M24 34 C24 0 96 0 96 34Z" fill="#b71c1c" stroke="#3e0a0a" stroke-width="3"/><path d="M60 10 L40 -26 M60 10 L80 -26" stroke="#ffd23f" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="14" r="7" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/><rect x="16" y="30" width="88" height="9" rx="4" fill="#212121"/>` },
      wizard: { uk: 'Капелюх мага', en: 'Wizard hat', no: 'Trollmannshatt', draw: () => `<path d="M30 30 L66 -46 L90 30Z" fill="#283593" stroke="#0d1447" stroke-width="3" stroke-linejoin="round"/><ellipse cx="60" cy="30" rx="46" ry="9" fill="#283593" stroke="#0d1447" stroke-width="3"/><path d="M58 0 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1z" fill="#ffd23f"/><path d="M70 -20 l2 4 4 .6 -3 3 .7 4 -3.7 -2 -3.7 2 .7 -4 -3 -3 4 -.6z" fill="#fff59d"/>` },
      gamer: { uk: 'Геймерські навушники', en: 'Gamer headset', no: 'Gamer-headset', draw: () => `<path d="M22 52 C22 2 98 2 98 52" stroke="#212121" stroke-width="9" fill="none"/><rect x="10" y="44" width="18" height="28" rx="7" fill="#00e676" stroke="#1b5e20" stroke-width="3"/><rect x="92" y="44" width="18" height="28" rx="7" fill="#00e676" stroke="#1b5e20" stroke-width="3"/><path d="M20 70 Q28 88 46 88" stroke="#212121" stroke-width="4" fill="none"/><circle cx="48" cy="88" r="5" fill="#00e676" stroke="#1b5e20" stroke-width="2"/>` },
      jester: { uk: 'Ковпак блазня', en: 'Jester hat', no: 'Narrelue', draw: () => `<path d="M28 32 L18 -14 L46 14 L60 -26 L74 14 L102 -14 L92 32Z" fill="#8e24aa" stroke="#3a0d4a" stroke-width="3" stroke-linejoin="round"/>${[[18, -16], [60, -28], [102, -16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/>`).join('')}<rect x="24" y="26" width="72" height="9" rx="4" fill="#00bcd4" stroke="#3a0d4a" stroke-width="2"/>` },
      unicorn: { uk: 'Ріг єдинорога', en: 'Unicorn horn', no: 'Enhjørningshorn', draw: () => `<path d="M53 24 L62 -34 L71 24Z" fill="#fff59d" stroke="#8a5a00" stroke-width="3" stroke-linejoin="round"/><path d="M55 12 L69 7 M57 -4 L67 -8 M59 -19 L65 -21" stroke="#ff80ab" stroke-width="3" stroke-linecap="round"/>` }
    },
    glasses: {
      cyber: { uk: 'Кібер-візор', en: 'Cyber visor', no: 'Kybervisir', draw: y => `<path d="M16 ${y - 11} H104 L97 ${y + 11} H23Z" fill="rgba(0,229,255,.6)" stroke="#006064" stroke-width="3" stroke-linejoin="round"/><path d="M26 ${y - 3} H94" stroke="#fff" stroke-width="2.5" opacity=".85"/>` },
      laser: { uk: 'Лазерні окуляри', en: 'Laser shades', no: 'Laserbriller', draw: y => `<path d="M18 ${y - 9} H102 V${y + 3} Q88 ${y + 13} 74 ${y + 5} L60 ${y} L46 ${y + 5} Q32 ${y + 13} 18 ${y + 3}Z" fill="rgba(255,23,68,.8)" stroke="#5a0f0f" stroke-width="3" stroke-linejoin="round"/><path d="M28 ${y - 4} H44 M76 ${y - 4} H92" stroke="#ffcdd2" stroke-width="3" stroke-linecap="round"/>` }
    },
    neck: {
      norflag: { uk: 'Шарф із прапором Норвегії', en: 'Norway scarf', no: 'Norgesskjerf', draw: () => `<path d="M22 100 C40 114 80 114 98 100 L100 112 C80 126 40 126 20 112Z" fill="#ef2b2d" stroke="#7f0000" stroke-width="3"/><path d="M50 108 V122 M22 107 C40 118 80 118 98 106" stroke="#fff" stroke-width="7" fill="none"/><path d="M50 108 V122 M22 107 C40 118 80 118 98 106" stroke="#002868" stroke-width="3.5" fill="none"/>` },
      bolt: { uk: 'Кулон-блискавка', en: 'Lightning pendant', no: 'Lynanheng', draw: () => `<path d="M34 98 C44 114 76 114 86 98" stroke="#263238" stroke-width="3" fill="none"/><path d="M64 110 L52 126 H60 L56 140 L70 122 H62 L66 110Z" fill="#ffd23f" stroke="#8a5a00" stroke-width="2.5" stroke-linejoin="round"/>` }
    },
    color: {
      lava: { uk: 'Лава', en: 'Lava', no: 'Lava', grad: ['#ffb000', '#ff4d4d', '#b3002d'] },
      ice: { uk: 'Лід', en: 'Ice', no: 'Is', grad: ['#ffffff', '#b3e5fc', '#4fc3f7'] },
      neon: { uk: 'Неон', en: 'Neon', no: 'Neon', grad: ['#b2ff59', '#00e5ff', '#76ff03'] },
      aurora: { uk: 'Північне сяйво', en: 'Aurora', no: 'Nordlys', grad: ['#00c9a7', '#845ec2', '#ff6f91'] },
      midnight: { uk: 'Опівніч', en: 'Midnight', no: 'Midnatt', grad: ['#5c6bc0', '#283593', '#1a1446'] }
    }
  };
  const HT = k => HATS[k] || BOT.hat[k], GL = k => GLASSES[k] || BOT.glasses[k], NK = k => NECK[k] || BOT.neck[k], CL = k => COLORS[k] || BOT.color[k];
  // «🦊|cap|sun|bowtie» → { base, hat, glasses, neck }
  function parse(code) {
    const parts = String(code || '🙂').split('|');
    return { base: A[parts[0]] ? parts[0] : '🙂', hat: HT(parts[1]) ? parts[1] : '', glasses: GL(parts[2]) ? parts[2] : '', neck: NK(parts[3]) ? parts[3] : '', color: CL(parts[4]) ? parts[4] : '' };
  }
  const encode = c => [c.base, c.hat || '', c.glasses || '', c.neck || '', c.color || ''].join('|').replace(/\|+$/, '');
  const valid = code => typeof code === 'string' && code.length <= 60 && (() => { const parts = code.split('|'); return !!A[parts[0]] && (!parts[1] || !!HATS[parts[1]]) && (!parts[2] || !!GLASSES[parts[2]]) && (!parts[3] || !!NECK[parts[3]]) && (!parts[4] || !!COLORS[parts[4]]) && parts.length <= 5; })();
  const base = code => parse(code).base;

  let uid = 0;

  /* SVG одного аватара. mood: idle | cheer | sad; place — медаль для переможців */
  function svg(code, { size = 64, mood = 'idle', crown = false } = {}) {
    const cfg = parse(code);
    const emoji = cfg.base;
    let a = A[emoji] || A['🙂'];
    let defs = '';
    if (cfg.color) {
      const col = CL(cfg.color);
      let fill = col.body;
      if (col.grad) { const gid = 'avc' + (uid + 1); defs = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">${col.grad.map((c, i) => `<stop offset="${(i / (col.grad.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient></defs>`; fill = `url(#${gid})`; }
      a = Object.assign({}, a, { body: fill, earCol: a.earCol === a.body ? fill : a.earCol, limbs: a.limbs && a.limbs === a.dark ? a.limbs : a.limbs });
    }
    const id = 'av' + (++uid);
    const d = a.dark;
    const happy = mood !== 'sad';
    let back = '', ears = '', deco = '', front = '';
    // вуха
    if (a.ears === 'point') ears = `<path d="M30 42 L24 10 L50 30Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M90 42 L96 10 L70 30Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M32 34 L29 18 L43 29Z" fill="${a.earIn}"/><path d="M88 34 L91 18 L77 29Z" fill="${a.earIn}"/>`;
    if (a.ears === 'round') ears = `<circle cx="30" cy="30" r="13" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="90" cy="30" r="13" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="30" cy="30" r="6" fill="${a.belly}" opacity=".8"/><circle cx="90" cy="30" r="6" fill="${a.belly}" opacity=".8"/>`;
    if (a.ears === 'fluffy') ears = `<circle cx="24" cy="36" r="19" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="96" cy="36" r="19" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="24" cy="37" r="10" fill="#f4f6f9"/><circle cx="96" cy="37" r="10" fill="#f4f6f9"/>`;
    if (a.ears === 'tuft') ears = `<path d="M30 40 L26 14 L46 30Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M90 40 L94 14 L74 30Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>`;
    if (a.ears === 'floppy') ears = `<path d="M26 30 C8 34 6 66 18 72 C26 60 30 46 36 36Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M94 30 C112 34 114 66 102 72 C94 60 90 46 84 36Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>`;
    if (a.ears === 'long') ears = `<g class="av-ears-long"><path d="M42 30 C30 -14 50 -22 54 26Z" fill="${a.body}" stroke="${d}" stroke-width="3"/><path d="M78 30 C90 -14 70 -22 66 26Z" fill="${a.body}" stroke="${d}" stroke-width="3"/><path d="M45 24 C38 -6 49 -12 51 22Z" fill="${a.earIn}"/><path d="M75 24 C82 -6 71 -12 69 22Z" fill="${a.earIn}"/></g>`;
    if (a.ears === 'side') ears = `<circle cx="12" cy="64" r="12" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="108" cy="64" r="12" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="12" cy="64" r="5" fill="#ffc2d1" opacity=".8"/><circle cx="108" cy="64" r="5" fill="#ffc2d1" opacity=".8"/>`;
    if (a.ears === 'tri') ears = `<path d="M30 36 L28 12 L50 26Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M90 36 L92 12 L70 26Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>`;
    if (a.ears === 'bigRound') ears = `<circle cx="22" cy="26" r="20" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="98" cy="26" r="20" fill="${a.earCol}" stroke="${d}" stroke-width="3"/><circle cx="22" cy="26" r="11" fill="#ffc2d1"/><circle cx="98" cy="26" r="11" fill="#ffc2d1"/>`;
    if (a.ears === 'elephant') ears = `<g class="av-ears-flap"><path d="M22 40 C-12 30 -14 88 16 92 C24 80 26 60 30 48Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M98 40 C132 30 134 88 104 92 C96 80 94 60 90 48Z" fill="${a.earCol}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M16 50 C2 50 2 80 14 84" fill="none" stroke="#ffc2d1" stroke-width="5" opacity=".7"/><path d="M104 50 C118 50 118 80 106 84" fill="none" stroke="#ffc2d1" stroke-width="5" opacity=".7"/></g>`;
    if (a.ears === 'bolt') ears = `<rect x="4" y="54" width="12" height="22" rx="3" fill="#78909c" stroke="${d}" stroke-width="3"/><rect x="104" y="54" width="12" height="22" rx="3" fill="#78909c" stroke="${d}" stroke-width="3"/>`;
    // позаду тіла
    if (a.tail === 'fox') back += `<path class="av-tail" d="M92 108 C122 100 124 70 106 62 C112 80 102 92 86 96Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M106 62 C112 70 112 78 108 84 C104 78 104 70 106 62Z" fill="#fff"/>`;
    if (a.mane) back += `<g fill="${a.mane}" stroke="${d}" stroke-width="3">${Array.from({ length: 12 }, (_, i) => { const t = i / 12 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(t) * 40).toFixed(1)}" cy="${(58 + Math.sin(t) * 38).toFixed(1)}" r="13"/>`; }).join('')}</g>`;
    if (a.shell) back += `<ellipse cx="60" cy="82" rx="50" ry="44" fill="${a.shell}" stroke="${d}" stroke-width="3"/><path d="M28 70 L44 58 L60 66 L76 58 L92 70 M40 96 L50 80 L70 80 L80 96" fill="none" stroke="#3d2a15" stroke-width="3" stroke-linejoin="round"/>`;
    if (a.wings) back += `<g class="av-wings"><ellipse cx="24" cy="62" rx="18" ry="11" fill="#cfefff" stroke="${d}" stroke-width="2.5" opacity=".9" transform="rotate(-30 24 62)"/><ellipse cx="96" cy="62" rx="18" ry="11" fill="#cfefff" stroke="${d}" stroke-width="2.5" opacity=".9" transform="rotate(30 96 62)"/></g>`;
    if (a.squirrel) back += `<path class="av-tail" d="M90 116 C130 110 126 40 96 30 C112 50 110 80 88 96Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M100 44 C112 60 112 84 98 100" stroke="${a.belly}" stroke-width="5" fill="none" opacity=".7"/>`;
    if (a.wool) back += `<g fill="#fafafa" stroke="#bdbdbd" stroke-width="2.5">${Array.from({ length: 14 }, (_, i) => { const t = i / 14 * Math.PI * 2; return `<circle cx="${(60 + Math.cos(t) * 44).toFixed(1)}" cy="${(72 + Math.sin(t) * 48).toFixed(1)}" r="15"/>`; }).join('')}</g>`;
    if (a.antlers) back += `<g stroke="${a.antlers}" stroke-width="6" fill="none" stroke-linecap="round"><path d="M40 24 C34 8 28 0 20 -4 M34 12 L22 10 M40 24 C40 10 44 0 48 -6"/><path d="M80 24 C86 8 92 0 100 -4 M86 12 L98 10 M80 24 C80 10 76 0 72 -6"/></g>`;
    if (a.dragonWings) back += `<g class="av-wings"><path d="M22 60 C-6 30 -10 70 4 84 C8 72 14 70 20 76Z" fill="${a.dragonWings}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M98 60 C126 30 130 70 116 84 C112 72 106 70 100 76Z" fill="${a.dragonWings}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/></g>`;
    if (a.hedgehog) back += `<g fill="${a.hedgehog}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round">${Array.from({ length: 13 }, (_, i) => { const t = Math.PI * (1.02 + i / 12 * 0.96); const x1 = 60 + Math.cos(t) * 44, y1 = 70 + Math.sin(t) * 50, x2 = 60 + Math.cos(t) * 62, y2 = 70 + Math.sin(t) * 68, t2 = t + 0.18; return `<path d="M${(60 + Math.cos(t - 0.14) * 44).toFixed(1)} ${(70 + Math.sin(t - 0.14) * 50).toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${(60 + Math.cos(t2) * 44).toFixed(1)} ${(70 + Math.sin(t2) * 50).toFixed(1)}Z"/>`; }).join('')}</g>`;
    if (a.fin) back += `<path d="M58 22 C66 8 80 6 84 8 C76 14 72 22 72 30Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>`;
    if (a.spikes) back += `<g fill="${a.spikes}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"><path d="M40 26 L46 8 L54 24Z"/><path d="M54 22 L60 4 L66 22Z"/><path d="M66 24 L74 8 L80 26Z"/></g>`;
    if (a.maneCols) back += `<path d="M36 22 C50 4 76 6 88 22 C76 16 60 18 52 30Z" fill="${a.maneCols[0]}"/><path d="M84 24 C98 34 100 56 92 70 C90 56 86 44 76 36Z" fill="${a.maneCols[1]}"/><path d="M90 40 C100 52 98 66 92 76" stroke="${a.maneCols[2]}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    // тіло (голова й тулуб — одна «краплина»)
    const legs = a.tentacles
      ? `<g class="av-legs" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linecap="round">${[26, 44, 62, 80, 96].map((x, i) => `<path d="M${x} 108 q${i % 2 ? 6 : -6} 14 ${i % 2 ? -2 : 2} 22" fill="none" stroke="${a.body}" stroke-width="11"/>`).join('')}</g>`
      : `<ellipse cx="44" cy="126" rx="13" ry="8" fill="${a.feet || a.limbs || a.dark}" stroke="${d}" stroke-width="2.5"/><ellipse cx="76" cy="126" rx="13" ry="8" fill="${a.feet || a.limbs || a.dark}" stroke="${d}" stroke-width="2.5"/>`;
    const body = `<path d="M60 18 C92 18 108 44 108 76 C108 108 88 124 60 124 C32 124 12 108 12 76 C12 44 28 18 60 18Z" fill="${a.body}" stroke="${d}" stroke-width="3.5"/>`;
    let belly = `<ellipse cx="60" cy="96" rx="30" ry="24" fill="${a.belly}"/>`;
    if (a.faceWhite) belly = `<path d="M60 34 C82 34 94 50 94 74 C94 102 80 118 60 118 C40 118 26 102 26 74 C26 50 38 34 60 34Z" fill="${a.belly}"/>`;
    // декор на тілі
    if (a.stripes && emoji === '🐝') deco += `<path d="M16 86 H104 M20 104 H100" stroke="${a.stripes}" stroke-width="8" stroke-linecap="round" opacity=".92"/>`;
    if (a.stripes && emoji === '🐯') deco += `<g stroke="${a.stripes}" stroke-width="4" stroke-linecap="round" fill="none"><path d="M60 20 v10 M50 22 l3 9 M70 22 l-3 9"/><path d="M14 70 h10 M16 84 h9 M106 70 h-10 M104 84 h-9"/></g>`;
    if (a.spots) deco += `<circle cx="36" cy="46" r="5" fill="${a.spots}"/><circle cx="86" cy="40" r="6" fill="${a.spots}"/><circle cx="92" cy="58" r="4" fill="${a.spots}"/>`;
    if (a.cowSpots) deco += `<path d="M22 60 C30 50 42 56 38 66 C34 76 20 72 22 60Z M84 90 C94 84 104 92 98 102 C92 110 80 100 84 90Z M70 28 C78 24 86 30 82 36 C78 42 68 36 70 28Z" fill="${d}"/>`;
    if (a.faceCol) deco += `<path d="M60 44 C84 44 94 58 92 76 C90 94 78 100 60 100 C42 100 30 94 28 76 C26 58 36 44 60 44Z" fill="${a.faceCol}"/>`;
    if (a.robot) deco += `<rect x="30" y="40" width="60" height="40" rx="12" fill="#1f2a30" opacity=".9"/><circle cx="24" cy="102" r="3" fill="#78909c"/><circle cx="96" cy="102" r="3" fill="#78909c"/><path d="M44 106 H76" stroke="#78909c" stroke-width="4" stroke-linecap="round"/>`;
    if (a.sharkFace) deco += `<path d="M22 84 C40 100 80 100 98 84 C94 110 80 120 60 120 C40 120 26 110 22 84Z" fill="${a.belly}"/><path d="M26 58 l6 4 M26 66 l6 4 M94 58 l-6 4 M94 66 l-6 4" stroke="${d}" stroke-width="2.5" stroke-linecap="round"/>`;
    if (a.raccoon) deco += `<path d="M20 58 C30 44 50 50 60 58 C70 50 90 44 100 58 C96 72 80 72 60 66 C40 72 24 72 20 58Z" fill="${d}" opacity=".85"/>`;
    if (a.hamster) deco += `<ellipse cx="28" cy="84" rx="14" ry="11" fill="#fff6e6"/><ellipse cx="92" cy="84" rx="14" ry="11" fill="#fff6e6"/>`;
    if (a.deerSpots) deco += `<circle cx="30" cy="92" r="4" fill="#fff" opacity=".8"/><circle cx="92" cy="96" r="4" fill="#fff" opacity=".8"/><circle cx="86" cy="80" r="3" fill="#fff" opacity=".8"/>`;
    if (a.ladybug) deco += `<path d="M60 20 V124" stroke="${d}" stroke-width="3"/><circle cx="36" cy="92" r="8" fill="${d}"/><circle cx="84" cy="92" r="8" fill="${d}"/><circle cx="30" cy="66" r="6" fill="${d}"/><circle cx="90" cy="66" r="6" fill="${d}"/><path d="M34 34 C44 26 76 26 86 34 C80 44 40 44 34 34Z" fill="${d}"/>`;
    if (a.parrot) deco += `<path d="M14 80 C8 96 14 112 26 118 C24 104 24 92 22 82Z" fill="#1e88e5" stroke="${d}" stroke-width="2.5"/><path d="M106 80 C112 96 106 112 94 118 C96 104 96 92 98 82Z" fill="#1e88e5" stroke="${d}" stroke-width="2.5"/>`;
    if (a.owl) deco += `<g stroke="${d}" stroke-width="2.5" fill="none" stroke-linecap="round"><path d="M48 98 q4 5 8 0 M60 104 q4 5 8 0 M56 90 q4 5 8 0"/></g>`;
    // обличчя
    const eyeY = a.frog ? 30 : 58;
    const eyeR = a.owl ? 15 : 12;
    let eyes = '';
    if (a.frog) eyes += `<circle cx="38" cy="30" r="17" fill="${a.body}" stroke="${d}" stroke-width="3.5"/><circle cx="82" cy="30" r="17" fill="${a.body}" stroke="${d}" stroke-width="3.5"/>`;
    if (a.owl) eyes += `<circle cx="42" cy="58" r="21" fill="${a.belly}" stroke="${d}" stroke-width="3"/><circle cx="78" cy="58" r="21" fill="${a.belly}" stroke="${d}" stroke-width="3"/>`;
    if (a.patches) eyes += `<ellipse cx="41" cy="60" rx="15" ry="18" fill="${d}" transform="rotate(20 41 60)"/><ellipse cx="79" cy="60" rx="15" ry="18" fill="${d}" transform="rotate(-20 79 60)"/>`;
    const eye = x => `<g class="av-eye"><ellipse cx="${x}" cy="${eyeY}" rx="${eyeR * 0.82}" ry="${eyeR}" fill="#fff" stroke="${d}" stroke-width="2.5"/><circle class="av-pupil" cx="${x + 1}" cy="${eyeY + 2}" r="${eyeR * 0.5}" fill="#141414"/><circle cx="${x + 4}" cy="${eyeY - 3}" r="${eyeR * 0.2}" fill="#fff"/></g>`;
    eyes += eye(42) + eye(78);
    const cheeks = `<circle cx="28" cy="82" r="7" fill="#ff7a9c" opacity=".45"/><circle cx="92" cy="82" r="7" fill="#ff7a9c" opacity=".45"/>`;
    let muzzle = '';
    if (a.muzzle) muzzle = `<ellipse cx="60" cy="82" rx="20" ry="14" fill="${a.muzzle}"/>`;
    let nose = '';
    if (a.snout) nose = `<ellipse cx="60" cy="80" rx="17" ry="12" fill="${a.snout}" stroke="${d}" stroke-width="2.5"/><ellipse cx="54" cy="80" rx="3" ry="4.5" fill="${d}"/><ellipse cx="66" cy="80" rx="3" ry="4.5" fill="${d}"/>`;
    else if (a.trunk) nose = `<path class="av-trunk" d="M52 70 C50 92 50 104 40 112 C46 118 58 110 62 96 C64 86 68 78 68 70Z" fill="${a.body}" stroke="${d}" stroke-width="3" stroke-linejoin="round"/>`;
    else if (a.pinkNose) nose = `<ellipse cx="60" cy="74" rx="5" ry="4" fill="#ff7aa2" stroke="${d}" stroke-width="2"/>`;
    else if (a.robot || a.alien || a.sharkFace || a.dragonWings) nose = '';
    else if (a.bigNose) nose = `<ellipse cx="60" cy="76" rx="11" ry="13" fill="${d}"/><ellipse cx="57" cy="71" rx="3" ry="4" fill="#fff" opacity=".5"/>`;
    else if (a.beak) nose = `<path d="M52 72 L68 72 L60 86Z" fill="${a.beak}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/>`;
    else if (!a.frog && !a.fin && !a.spout && !a.tentacles && !a.spikes && !a.stripes || emoji === '🐯') nose = `<ellipse cx="60" cy="74" rx="6" ry="4.5" fill="${d}"/>`;
    const mouthY = a.beak ? 94 : a.frog ? 76 : 88;
    const mouth = mood === 'cheer'
      ? `<path d="M${a.frog ? 36 : 46} ${mouthY - 4} Q60 ${mouthY + 18} ${a.frog ? 84 : 74} ${mouthY - 4}Z" fill="#7a1f2b" stroke="${d}" stroke-width="3" stroke-linejoin="round"/><path d="M52 ${mouthY + 5} Q60 ${mouthY + 12} 68 ${mouthY + 5}" fill="#ff7a8a"/>`
      : happy ? `<path d="M${a.frog ? 34 : 48} ${mouthY - 2} Q60 ${mouthY + 10} ${a.frog ? 86 : 72} ${mouthY - 2}" fill="none" stroke="${d}" stroke-width="3.5" stroke-linecap="round"/>`
      : `<path d="M48 ${mouthY + 6} Q60 ${mouthY - 4} 72 ${mouthY + 6}" fill="none" stroke="${d}" stroke-width="3.5" stroke-linecap="round"/>`;
    let extra = '';
    if (a.fangs) extra += `<path d="M52 ${mouthY + 1} l3 7 l3 -7 M62 ${mouthY + 1} l3 7 l3 -7" fill="#fff" stroke="${d}" stroke-width="1.5" stroke-linejoin="round"/>`;
    if (a.whiskers) extra += `<g stroke="${d}" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M44 78 L22 74 M44 82 L22 84 M76 78 L98 74 M76 82 L98 84"/></g>`;
    if (a.teeth) extra += a.sharkFace ? `<path d="M46 ${mouthY + 1} l3 5 l3 -5 l3 5 l3 -5 l3 5 l3 -5 l3 5 l3 -5" fill="#fff" stroke="${d}" stroke-width="1.5" stroke-linejoin="round"/>` : `<rect x="54" y="${mouthY + 1}" width="12" height="9" rx="2" fill="#fff" stroke="${d}" stroke-width="2"/><path d="M60 ${mouthY + 1} v9" stroke="${d}" stroke-width="1.5"/>`;
    // руки
    const armCol = a.limbs || a.body;
    const arms = a.tentacles ? '' : `<g class="av-arm av-arm-l" style="transform-origin:22px 86px"><path d="M22 86 Q6 96 10 110" fill="none" stroke="${d}" stroke-width="14" stroke-linecap="round"/><path d="M22 86 Q6 96 10 110" fill="none" stroke="${armCol}" stroke-width="9" stroke-linecap="round"/></g><g class="av-arm av-arm-r" style="transform-origin:98px 86px"><path d="M98 86 Q114 96 110 110" fill="none" stroke="${d}" stroke-width="14" stroke-linecap="round"/><path d="M98 86 Q114 96 110 110" fill="none" stroke="${armCol}" stroke-width="9" stroke-linecap="round"/></g>`;
    // над головою
    if (a.horns) front += `<path d="M36 26 C28 12 30 4 38 2 C38 10 42 18 46 22Z" fill="${a.horns}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/><path d="M84 26 C92 12 90 4 82 2 C82 10 78 18 74 22Z" fill="${a.horns}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (a.tuft) front += `<path d="M56 20 C52 6 58 2 60 10 C62 0 70 4 64 20Z" fill="${a.body}" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/>`;
    if (a.robot) front += `<path d="M60 18 V2" stroke="${d}" stroke-width="3"/><circle class="av-spout" cx="60" cy="0" r="6" fill="#ff5252" stroke="${d}" stroke-width="2.5"/>`;
    if (a.alien) front += `<g class="av-antennae" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M44 22 Q36 4 28 0"/><path d="M76 22 Q84 4 92 0"/></g><circle cx="28" cy="0" r="6" fill="#b6ff7a" stroke="${d}" stroke-width="2"/><circle cx="92" cy="0" r="6" fill="#b6ff7a" stroke="${d}" stroke-width="2"/>`;
    if (a.horn) front += `<path d="M52 22 L60 -6 L68 22Z" fill="#ffd23f" stroke="${d}" stroke-width="2.5" stroke-linejoin="round"/><path d="M55 14 L65 10 M57 6 L63 3" stroke="#e0a800" stroke-width="2"/>`;
    if (a.antennae) front += `<g class="av-antennae" stroke="${d}" stroke-width="3" fill="none" stroke-linecap="round"><path d="M46 22 Q40 6 30 4"/><path d="M74 22 Q80 6 90 4"/></g><circle cx="30" cy="4" r="5" fill="${d}"/><circle cx="90" cy="4" r="5" fill="${d}"/>`;
    if (a.spout) front += `<g class="av-spout" fill="#7fd3ff" stroke="#2a6fb0" stroke-width="2"><path d="M60 16 C56 4 48 0 42 2 C48 6 52 12 56 18Z"/><path d="M60 16 C64 4 72 0 78 2 C72 6 68 12 64 18Z"/><circle cx="60" cy="4" r="4"/></g>`;
    if (a.crown || crown) front += `<g class="av-crown"><path d="M36 20 L42 0 L52 14 L60 -4 L68 14 L78 0 L84 20Z" fill="#ffd23f" stroke="#8a5a00" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="10" r="3.5" fill="#ff4d6d"/><circle cx="46" cy="14" r="2.5" fill="#4dabff"/><circle cx="74" cy="14" r="2.5" fill="#4dabff"/></g>`;
    const cls = `av av-${mood}`;
    return `<svg class="${cls}" width="${size}" height="${Math.round(size * 1.18)}" viewBox="-8 -12 136 152" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${a.name}">
${defs}<g class="av-jump"><ellipse class="av-shadow" cx="60" cy="134" rx="40" ry="6" fill="rgba(0,0,0,.22)"/>
<g class="av-body" id="${id}">${NK(cfg.neck) && NK(cfg.neck).back ? NK(cfg.neck).back(a) : ''}${back}${ears}${legs}${body}${belly}${deco}${arms}${muzzle}${eyes}${cheeks}${nose}${mouth}${extra}${NK(cfg.neck) ? NK(cfg.neck).draw(a) : ''}${GL(cfg.glasses) ? GL(cfg.glasses).draw(eyeY, a) : ''}${front}${HT(cfg.hat) ? `<g transform="translate(0 ${a.frog ? -14 : a.ears === 'long' ? -2 : 0})">${HT(cfg.hat).draw(a)}</g>` : ''}</g></g></svg>`;
  }
  const el = (emoji, opts) => { const t = document.createElement('template'); t.innerHTML = svg(emoji, opts).trim(); return t.content.firstChild; };
  const name = code => (A[parse(code).base] || A['🙂']).name;

  /* ---------------- сцена переможців (як у Kahoot) ---------------- */
  // board: [{ pid, name, avatar, score }], meId — підсвітити «мене»
  function podium(board, { meId = null, you = 'you', points = 'pts', fmt = null, place = (r, n) => `${r}/${n}`, show = false } = {}) {
    const sc = n => (fmt ? fmt(n) : `${n} ${points}`);
    const h = (tag, attrs = {}, ...kids) => { const n = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (k === 'style') { for (const [sk, sv] of Object.entries(v)) { if (sk.startsWith('--')) n.style.setProperty(sk, sv); else n.style[sk] = sv; } } else if (v !== false && v != null) n.setAttribute(k, v); } kids.flat().forEach(c => c != null && n.append(c instanceof Node ? c : String(c))); return n; };
    const top = [1, 0, 2].map(i => board[i]).filter(Boolean);
    const stage = h('div', { class: 'kh-stage' },
      h('div', { class: 'kh-lights', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
      h('div', { class: 'kh-podium' }, top.map(p => {
        const r = board.indexOf(p) + 1;
        const me = meId && p.pid === meId;
        return h('div', { class: `kh-col kh-p${r}${me ? ' kh-me' : ''}`, style: { '--d': (r === 1 ? 2.2 : r === 2 ? 1.2 : 0.3) + 's' } },
          h('div', { class: 'kh-hero' }, el(p.avatar, { size: r === 1 ? 168 : 132, mood: 'cheer', crown: r === 1 }), me ? h('span', { class: 'kh-you' }, you) : null),
          h('div', { class: 'kh-name' }, p.name),
          h('div', { class: 'kh-score' }, sc(p.score)),
          h('div', { class: 'kh-block' }, h('span', { class: 'kh-medal' }, r === 1 ? '🥇' : r === 2 ? '🥈' : '🥉'), h('b', {}, r)));
      })));
    const rest = board.slice(3);
    const crowd = rest.length ? h('div', { class: 'kh-crowd' }, rest.map((p, i) => {
      const me = meId && p.pid === meId;
      return h('div', { class: 'kh-fan' + (me ? ' kh-me' : ''), style: { '--i': i } }, el(p.avatar, { size: 80, mood: me ? 'cheer' : 'idle' }), h('b', {}, `${i + 4}. ${p.name}`), h('small', {}, sc(p.score)), me ? h('span', { class: 'kh-you' }, you) : null);
    })) : null;
    const mine = meId ? board.findIndex(b => b.pid === meId) : -1;
    // show: церемонія нагородження — дріб, фанфари й оплески (один раз на той самий результат)
    if (show && window.KomiksMusic) window.KomiksMusic.ceremony(board.slice(0, 3).map(b => b.name + ':' + b.score).join('|'));
    const sparks = show && board.length ? h('div', { class: 'kh-sparks', 'aria-hidden': 'true' }, Array.from({ length: 14 }, (_, i) => h('i', { style: { '--i': i } }))) : null;
    if (sparks) stage.append(sparks);
    return h('div', { class: 'kh' + (show ? ' kh-show' : '') }, stage, crowd, mine >= 0 ? h('p', { class: 'kh-place' }, place(mine + 1, board.length)) : null);
  }

  /* вибір аватара: великі живі картки */
  function picker(current, onPick) {
    current = base(current);
    const wrap = document.createElement('div');
    wrap.className = 'av-picker';
    LIST.forEach(emoji => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'av-pick' + (emoji === current ? ' on' : ''); b.title = name(emoji); b.setAttribute('aria-label', name(emoji)); b.setAttribute('aria-pressed', String(emoji === current));
      b.append(el(emoji, { size: 58, mood: emoji === current ? 'cheer' : 'idle' }));
      b.addEventListener('click', () => {
        wrap.querySelectorAll('.av-pick').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); x.replaceChildren(el(x === b ? emoji : x.__emoji, { size: 58, mood: on ? 'cheer' : 'idle' })); });
        onPick(emoji);
      });
      b.__emoji = emoji;
      wrap.append(b);
    });
    return wrap;
  }

  window.KomiksAvatars = { svg, el, name, podium, picker, list: LIST, parse, encode, valid, base, catalog: CATALOG, botCatalog: BOT };
})();
