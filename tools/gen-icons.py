# -*- coding: utf-8 -*-
"""Komiks-Lab — генератор іконок для ярликів (Windows, Android, iPhone).

Малюємо логотип (жовтий фон із растровими крапками + чорна бульбашка з червоним «NO»)
у великому розмірі й зменшуємо — так краї лишаються чистими на будь-якому розмірі.

    python tools/gen-icons.py

Створює: icons/icon-*.png, icons/maskable-*.png, icons/mono-512.png,
icons/apple-touch-icon.png, icons/favicon.ico, icons/sc-*.png (меню ярлика),
icons/splash/*.png (екрани запуску на iPhone) та app/resources/* для Android-збірки.
"""
import os, math
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = os.path.join(ROOT, 'icons')
SPLASH = os.path.join(ICONS, 'splash')
RES = os.path.join(ROOT, 'app', 'resources')
for d in (ICONS, SPLASH, RES):
    os.makedirs(d, exist_ok=True)

YELLOW, DOT, INK, WHITE, RED, CREAM = '#ffd23f', '#f2c62f', '#141414', '#ffffff', '#ef3e36', '#fff8ea'
SS = 4  # суперсемплінг


def font(px, black=True):
    names = ('seguibl.ttf', 'arialbd.ttf') if black else ('segoeuib.ttf', 'arialbd.ttf')
    for name in names:
        try:
            return ImageFont.truetype(name, px)
        except OSError:
            continue
    return ImageFont.load_default()


def fit_text(d, text, box_w, box_h, black=True):
    """Підбираємо кегль так, щоб напис ліг у прямокутник."""
    lo, hi = 8, int(box_h * 2) + 8
    best = font(lo, black)
    while lo <= hi:
        mid = (lo + hi) // 2
        f = font(mid, black)
        x0, y0, x1, y1 = d.textbbox((0, 0), text, font=f)
        if x1 - x0 <= box_w and y1 - y0 <= box_h:
            best, lo = f, mid + 1
        else:
            hi = mid - 1
    return best


def centered(d, text, f, cx, cy, fill):
    x0, y0, x1, y1 = d.textbbox((0, 0), text, font=f)
    d.text((cx - (x1 + x0) / 2, cy - (y1 + y0) / 2), text, font=f, fill=fill)


def halftone(d, w, h, step, r, fill):
    """Фон «як у коміксі» — рівні ряди крапок."""
    y = step / 2
    while y < h + step:
        x = step / 2
        while x < w + step:
            d.ellipse([x - r, y - r, x + r, y + r], fill=fill)
            x += step
        y += step


def bubble(d, x, y, s, ink=INK, fill=WHITE, text=RED):
    """Бульбашка з хвостиком і написом NO у квадраті (x, y, s)."""
    sw = s * 0.055
    bx0, by0, bx1, by1 = x + s * 0.09, y + s * 0.10, x + s * 0.91, y + s * 0.755
    rad = s * 0.30
    tail = [(x + s * 0.30, y + s * 0.60), (x + s * 0.50, y + s * 0.60), (x + s * 0.315, y + s * 0.945)]
    d.polygon(tail, fill=ink)
    d.rounded_rectangle([bx0, by0, bx1, by1], radius=rad, fill=fill, outline=ink, width=int(sw))
    if text:
        f = fit_text(d, 'NO', (bx1 - bx0) * 0.60, (by1 - by0) * 0.42)
        centered(d, 'NO', f, (bx0 + bx1) / 2, (by0 + by1) / 2, text)


def logo(size, inset=0.0, bg=YELLOW, dots=True, mono=False):
    """inset — скільки лишити порожнього поля по краях (0.19 для maskable)."""
    n = size * SS
    img = Image.new('RGBA', (n, n), (0, 0, 0, 0) if bg is None else bg)
    d = ImageDraw.Draw(img)
    if bg and dots:
        halftone(d, n, n, n * 0.0625, n * 0.0165, DOT)
    pad = n * inset
    s = n - pad * 2
    if mono:
        bubble(d, pad, pad, s, ink=INK, fill=INK, text=None)
    else:
        bubble(d, pad, pad, s)
    return img.resize((size, size), Image.LANCZOS)


def rounded(img, r=0.22):
    """Скруглюємо кути — так логотип гарно лягає на світлий екран запуску."""
    n = img.size[0] * 4
    mask = Image.new('L', (n, n), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, n - 1, n - 1], radius=n * r, fill=255)
    out = img.convert('RGBA').copy()
    out.putalpha(mask.resize(img.size, Image.LANCZOS))
    return out


# ---------- 1. Звичайні іконки (повний квадрат) ----------
ANY = [48, 64, 72, 96, 128, 144, 152, 192, 256, 384, 512, 1024]
for s in ANY:
    logo(s).convert('RGB').save(os.path.join(ICONS, 'icon-%d.png' % s), optimize=True)

# ---------- 2. Maskable (Android ріже кути — лишаємо безпечне поле) ----------
for s in (192, 512, 1024):
    logo(s, inset=0.19).convert('RGB').save(os.path.join(ICONS, 'maskable-%d.png' % s), optimize=True)

# ---------- 3. Монохромна (тематичні іконки Android) ----------
logo(512, inset=0.14, bg=None, mono=True).save(os.path.join(ICONS, 'mono-512.png'), optimize=True)

# ---------- 4. iPhone: apple-touch-icon без прозорості (iOS сам скруглює) ----------
for s in (180, 167, 152):
    name = 'apple-touch-icon.png' if s == 180 else 'apple-touch-icon-%d.png' % s
    logo(s).convert('RGB').save(os.path.join(ICONS, name), optimize=True)

# ---------- 5. Windows: .ico з усіма розмірами (ярлик, вкладка, панель задач) ----------
logo(256).save(os.path.join(ICONS, 'favicon.ico'), format='ICO',
               sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
logo(150).convert('RGB').save(os.path.join(ICONS, 'mstile-150.png'), optimize=True)


# ---------- 6. Іконки швидких дій (правий клік по ярлику / довгий тап) ----------
def tile(size, draw_glyph):
    n = size * SS
    img = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([n * .04, n * .04, n * .96, n * .96], radius=n * .26, fill=YELLOW, outline=INK, width=int(n * .05))
    draw_glyph(d, n)
    return img.resize((size, size), Image.LANCZOS)


def g_plan(d, n):
    for r, c in ((.30, RED), (.20, WHITE), (.10, INK)):
        d.ellipse([n / 2 - n * r, n / 2 - n * r, n / 2 + n * r, n / 2 + n * r], fill=c, outline=INK, width=int(n * .035))


def g_words(d, n):
    d.rounded_rectangle([n * .20, n * .24, n * .80, n * .76], radius=n * .08, fill=WHITE, outline=INK, width=int(n * .05))
    for i, w in enumerate((.42, .34, .26)):
        y = n * (.38 + i * .13)
        d.rounded_rectangle([n * .29, y, n * (.29 + w), y + n * .065], radius=n * .03, fill=INK)


def g_call(d, n):
    d.rounded_rectangle([n * .32, n * .17, n * .68, n * .83], radius=n * .12, fill=INK)
    d.rounded_rectangle([n * .38, n * .27, n * .62, n * .70], radius=n * .04, fill=WHITE)
    d.ellipse([n * .46, n * .73, n * .54, n * .80], fill=WHITE)


def g_tests(d, n):
    pts = []
    for i in range(10):
        a = math.radians(-90 + i * 36)
        r = n * (.34 if i % 2 == 0 else .15)
        pts.append((n / 2 + r * math.cos(a), n / 2 + r * math.sin(a)))
    d.polygon(pts, fill=RED)
    d.line(pts + [pts[0]], fill=INK, width=int(n * .045), joint='curve')


for name, glyph in (('plan', g_plan), ('words', g_words), ('call', g_call), ('tests', g_tests)):
    tile(96, glyph).convert('RGB').save(os.path.join(ICONS, 'sc-%s.png' % name), optimize=True)

# ---------- 7. Екрани запуску для iPhone/iPad ----------
IOS = [(1179, 2556), (1284, 2778), (1170, 2532), (1125, 2436), (1242, 2688), (828, 1792),
       (750, 1334), (1242, 2208), (1536, 2048), (1668, 2388), (1620, 2160), (2048, 2732)]
mark = rounded(logo(512))
for w, h in IOS:
    img = Image.new('RGB', (w, h), CREAM)
    d = ImageDraw.Draw(img)
    halftone(d, w, h, min(w, h) * 0.07, min(w, h) * 0.006, '#f6ecd6')
    s = int(min(w, h) * 0.42)
    m = mark.resize((s, s), Image.LANCZOS)
    top = (h - s) // 2 - int(h * 0.06)
    img.paste(m, ((w - s) // 2, top), m)
    f = fit_text(d, 'Komiks·Lab', w * 0.62, h * 0.045)
    centered(d, 'Komiks·Lab', f, w / 2, top + s + h * 0.045, INK)
    img.save(os.path.join(SPLASH, 'splash-%dx%d.png' % (w, h)), optimize=True)

# ---------- 8. Вихідні файли для мобільної збірки (@capacitor/assets) ----------
logo(1024).convert('RGB').save(os.path.join(RES, 'icon.png'), optimize=True)
logo(1024, inset=0.19, bg=None, dots=False).save(os.path.join(RES, 'icon-foreground.png'), optimize=True)
Image.new('RGB', (1024, 1024), YELLOW).save(os.path.join(RES, 'icon-background.png'), optimize=True)
for name, bg in (('splash.png', CREAM), ('splash-dark.png', '#1b1710')):
    img = Image.new('RGB', (2732, 2732), bg)
    s = 900
    m = rounded(logo(s))
    img.paste(m, ((2732 - s) // 2, (2732 - s) // 2), m)
    img.save(os.path.join(RES, name), optimize=True)

print('gotovo: icons/, icons/splash/, app/resources/')

# ---------- 9. Картинки для вікна встановлення (Chrome/Edge показують їх у діалозі) ----------
SHOTS = {
    'screenshot-wide.png': (1920, 1080),
    'screenshot-narrow.png': (1080, 1920),
}
LINES = ['65 tegneserier A1-B2 med ekte stemmer',
         '2010 norske ord med lyd og oversettelse',
         'Prover, spill og samtaler med AI']
for name, (w, h) in SHOTS.items():
    img = Image.new('RGB', (w, h), CREAM)
    d = ImageDraw.Draw(img)
    halftone(d, w, h, min(w, h) * 0.06, min(w, h) * 0.005, '#f6ecd6')
    wide = w > h
    s = int(min(w, h) * (0.34 if wide else 0.30))
    m = rounded(logo(512)).resize((s, s), Image.LANCZOS)
    top = int(h * (0.18 if wide else 0.14))
    img.paste(m, ((w - s) // 2, top), m)
    y = top + s + h * 0.04
    f = fit_text(d, 'Komiks·Lab', w * 0.7, h * 0.08)
    centered(d, 'Komiks·Lab', f, w / 2, y, INK)
    x0, y0, x1, y1 = d.textbbox((0, 0), 'Komiks·Lab', font=f)
    y += (y1 - y0) / 2 + h * 0.045
    fl = fit_text(d, max(LINES, key=len), w * 0.78, h * 0.035, black=False)
    for line in LINES:
        bw = d.textbbox((0, 0), line, font=fl)
        cw, ch = bw[2] - bw[0], bw[3] - bw[1]
        d.rounded_rectangle([w / 2 - cw / 2 - w * .03, y - ch * .9, w / 2 + cw / 2 + w * .03, y + ch * 1.0],
                            radius=ch, fill=WHITE, outline=INK, width=max(3, int(min(w, h) * .006)))
        centered(d, line, fl, w / 2, y + ch * .05, INK)
        y += ch * 2.6
    img.save(os.path.join(ICONS, name), optimize=True)
print('screenshots ok')
