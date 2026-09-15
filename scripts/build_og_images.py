"""Build the Open Graph share cards in public/og.

Every page on the site gets a 1200x630 card so a shared link carries a picture
rather than a bare blue rectangle. The cards are generated rather than
hand-made, so a new practice area or team member is one line of data and a
re-run, and they are committed as static files rather than rendered on demand:
the photography is the point of the card, and compositing a 2336x3504 camera
original is work better done once at build time than per crawler request.

Run with:

    npm run og:build

Fonts: Butler ships as woff2, which Pillow cannot read, so the script converts
it in memory with fontTools. That needs `brotli` installed alongside it.
"""

from __future__ import annotations

import io
import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
FONT_DIR = ROOT / "src" / "app" / "fonts"

W, H = 1200, 630

BRAND_950 = (0x00, 0x18, 0x1B)
BRAND_900 = (0x00, 0x25, 0x29)
COPPER_400 = (0xDE, 0x8A, 0x56)
COPPER_300 = (0xE9, 0xA9, 0x7F)
BONE = (0xF7, 0xF5, 0xF1)
WHITE = (0xFF, 0xFF, 0xFF)


# --------------------------------------------------------------------------
# Fonts


def load_font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    """Butler at a size, converted out of woff2 on the fly and cached."""
    key = (weight, size)
    if key in _FONT_CACHE:
        return _FONT_CACHE[key]
    if weight not in _TTF_CACHE:
        f = TTFont(FONT_DIR / f"butler-{weight}.woff2")
        f.flavor = None
        buf = io.BytesIO()
        f.save(buf)
        _TTF_CACHE[weight] = buf.getvalue()
    font = ImageFont.truetype(io.BytesIO(_TTF_CACHE[weight]), size)
    _FONT_CACHE[key] = font
    return font


_TTF_CACHE: dict[str, bytes] = {}
_FONT_CACHE: dict[tuple[str, int], ImageFont.FreeTypeFont] = {}


def sans(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    """Montserrat is a Google font and not vendored, so the eyebrow and the
    body line fall back to a grotesque that is on every Windows box. The card
    is a picture, not a page: the display face is what has to be Butler."""
    name = "segoeuisb.ttf" if bold else "segoeui.ttf"
    for candidate in (Path("C:/Windows/Fonts") / name, Path("C:/Windows/Fonts/segoeui.ttf")):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


# --------------------------------------------------------------------------
# Drawing helpers


def cover(img: Image.Image, w: int, h: int, focus_y: float = 0.5) -> Image.Image:
    """Resize and crop to exactly w x h, keeping `focus_y` of the source in
    view — 0.0 anchors the top, which is where faces are in a standing
    portrait."""
    img = img.convert("RGB")
    scale = max(w / img.width, h / img.height)
    nw, nh = round(img.width * scale), round(img.height * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    left = round((nw - w) / 2)
    top = round((nh - h) * focus_y)
    return img.crop((left, top, left + w, top + h))


def scrim(size: tuple[int, int], side: str = "left", strength: float = 0.94) -> Image.Image:
    """A soft wash of brand teal, so type stays legible over any photograph."""
    w, h = size
    grad = Image.new("L", (w, 1))
    px = grad.load()
    for x in range(w):
        t = x / max(w - 1, 1)
        if side == "left":
            # Opaque at the left edge, easing to clear around two thirds across.
            v = max(0.0, 1.0 - (t / 0.58)) ** 1.25
        else:
            v = max(0.0, (t - 0.28) / 0.72) ** 1.35
        px[x, 0] = int(255 * strength * v)
    grad = grad.resize((w, h))
    wash = Image.new("RGB", (w, h), BRAND_950)
    wash.putalpha(grad)
    return wash


def bottom_scrim(size: tuple[int, int], strength: float = 0.92) -> Image.Image:
    """Dark at the foot of the frame for the title, with a lighter wash back
    across the top: the wordmark sits up there and several of these
    photographs have a pale studio wall behind it."""
    w, h = size
    grad = Image.new("L", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        # Reaches well up the frame: a three-line title over a bright sky
        # needs cover a long way above the baseline, not just at the foot.
        v = max(0.0, (t - 0.02) / 0.98) ** 0.75
        top = max(0.0, 1.0 - t / 0.30) ** 1.6 * 0.62
        px[0, y] = int(255 * min(1.0, strength * v + top))
    grad = grad.resize((w, h))
    wash = Image.new("RGB", (w, h), BRAND_950)
    wash.putalpha(grad)
    return wash


def top_wash(size: tuple[int, int], strength: float = 0.55) -> Image.Image:
    """Just enough shade under the wordmark to hold it against a light wall."""
    w, h = size
    grad = Image.new("L", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = int(255 * strength * max(0.0, 1.0 - t / 0.26) ** 1.6)
    grad = grad.resize((w, h))
    wash = Image.new("RGB", (w, h), BRAND_950)
    wash.putalpha(grad)
    return wash


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_w: int) -> list[str]:
    words, lines, line = text.split(), [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= max_w or not line:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def tracked(draw: ImageDraw.ImageDraw, xy, text: str, font, fill, tracking: float):
    """Letter-spaced text — the site's .eyebrow is 0.18em, and Pillow has no
    tracking of its own."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def wordmark(draw: ImageDraw.ImageDraw, x: int, y: int):
    f = load_font("semibold", 30)
    draw.text((x, y), "TBeST", font=f, fill=WHITE)
    w = draw.textlength("TBeST", font=f)
    tracked(draw, (x + w + 12, y + 11), "LAW LLP", sans(13, bold=True), COPPER_400, 2.2)


# --------------------------------------------------------------------------
# Card layouts


def card_portrait(photo: Path, eyebrow: str, title: str, sub: str, out: Path):
    """A person: photograph on the right, type on a teal panel to the left."""
    base = cover(Image.open(photo), W, H, focus_y=0.12)
    base = Image.alpha_composite(base.convert("RGBA"), scrim((W, H), "left"))
    base = Image.alpha_composite(base, top_wash((W, H)))
    d = ImageDraw.Draw(base)

    pad = 72
    max_w = 620

    wordmark(d, pad, 56)

    y = 180
    if eyebrow:
        tracked(d, (pad, y), eyebrow.upper(), sans(17, bold=True), COPPER_300, 3.0)
        y += 46

    tf = load_font("regular", 76 if len(title) <= 22 else 62)
    for line in wrap(d, title, tf, max_w):
        d.text((pad, y), line, font=tf, fill=WHITE)
        y += int(tf.size * 1.14)

    if sub:
        y += 16
        sf = sans(21)
        for line in wrap(d, sub, sf, max_w)[:3]:
            d.text((pad, y), line, font=sf, fill=(0xC9, 0xD6, 0xD8))
            y += 33

    save(base, out)


def card_wide(photo: Path | None, eyebrow: str, title: str, sub: str, out: Path,
              focus_y: float = 0.4):
    """A page: photograph full-bleed, type across the bottom."""
    if photo is not None:
        base = cover(Image.open(photo), W, H, focus_y=focus_y)
        base = Image.alpha_composite(base.convert("RGBA"), bottom_scrim((W, H)))
    else:
        base = Image.new("RGBA", (W, H), BRAND_900 + (255,))
    d = ImageDraw.Draw(base)

    pad = 72
    max_w = W - pad * 2

    wordmark(d, pad, 56)

    tf = load_font("regular", 72 if len(title) <= 30 else 58)
    lines = wrap(d, title, tf, max_w)[:3]
    sf = sans(22)
    sub_lines = wrap(d, sub, sf, min(max_w, 860))[:2] if sub else []

    block = len(lines) * int(tf.size * 1.14) + (len(sub_lines) * 34 + 18 if sub_lines else 0)
    y = H - pad - block

    if eyebrow:
        tracked(d, (pad, y - 44), eyebrow.upper(), sans(17, bold=True), COPPER_300, 3.0)

    for line in lines:
        d.text((pad, y), line, font=tf, fill=WHITE)
        y += int(tf.size * 1.14)
    if sub_lines:
        y += 18
        for line in sub_lines:
            d.text((pad, y), line, font=sf, fill=(0xC9, 0xD6, 0xD8))
            y += 34

    save(base, out)


def save(img: Image.Image, out: Path):
    out.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(out, "JPEG", quality=86, optimize=True, progressive=True)
    written.append(out)


written: list[Path] = []


# --------------------------------------------------------------------------
# Entry point


@dataclass
class Card:
    out: str
    layout: str
    photo: str | None
    eyebrow: str
    title: str
    sub: str
    focusY: float = 0.4


def manifest() -> list[Card]:
    """Ask Node for the roster, so this script never holds a second copy of it."""
    proc = subprocess.run(
        [
            "node",
            "--require", "./scripts/image-stub-cjs.cjs",
            "--import", "tsx",
            "--import", "./scripts/image-stub-loader.mjs",
            "scripts/og-manifest.mts",
        ],
        cwd=ROOT, capture_output=True, text=True, encoding="utf-8",
    )
    if proc.returncode != 0:
        sys.exit(f"og-manifest failed:\n{proc.stderr}")
    return [Card(**row) for row in json.loads(proc.stdout)]


def resolve_photo(ref: str | None) -> Path | None:
    if not ref:
        return None
    if ref.startswith("PUBLIC:"):
        return ROOT / "public" / ref[len("PUBLIC:"):].lstrip("/")
    return Path(ref)


def main() -> None:
    cards = manifest()
    missing: list[str] = []

    for card in cards:
        photo = resolve_photo(card.photo)
        if photo is not None and not photo.exists():
            missing.append(f"{card.out}: {photo}")
            photo = None

        out = OUT / card.out
        if card.layout == "portrait" and photo is not None:
            card_portrait(photo, card.eyebrow, card.title, card.sub, out)
        else:
            card_wide(photo, card.eyebrow, card.title, card.sub, out, card.focusY)

    total = sum(p.stat().st_size for p in written)
    print(f"{len(written)} cards -> public/og  ({total / 1048576:.2f} MB)")
    by_dir: dict[str, int] = {}
    for p in written:
        by_dir[p.parent.name] = by_dir.get(p.parent.name, 0) + 1
    for name, n in sorted(by_dir.items()):
        print(f"  {name:12} {n}")
    if missing:
        print("\nmissing source photographs:")
        for m in missing:
            print("  " + m)


if __name__ == "__main__":
    main()
