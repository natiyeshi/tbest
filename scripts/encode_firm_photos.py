#!/usr/bin/env python3
"""
Re-encode the firm's 2026 shoot from the camera originals into the WebP files
the site actually serves (`public/new/team/b*.webp`).

The first pass through these was compressed hard enough to show — and it also
*upscaled* the portrait-orientation frames (b35-b38) past their native width,
which only ever softens a picture. This pass fixes both: the long edge is
capped, never stretched, and the quality is high enough that `next/image`'s
own re-encode is the only visible generation of loss.

    python scripts/encode_firm_photos.py
    python scripts/encode_firm_photos.py --quality 92 --max-edge 3000
    python scripts/encode_firm_photos.py --dry-run

Defaults are filled in for this machine; the originals live outside the repo.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

DEFAULT_SRC = r"C:\Users\hp\OneDrive\Desktop\TBeST\team"
DEFAULT_OUT = Path(__file__).resolve().parent.parent / "public" / "new" / "team"

# Wide enough to fill a full-screen lightbox on a high-density display without
# carrying a 3504px original around for a 600px bento cell.
DEFAULT_MAX_EDGE = 2800
# WebP is efficient enough at 88 that the extra weight over the old files buys
# back the detail in faces and fabric; below ~85 the group shots start to mush.
DEFAULT_QUALITY = 88


def human(n: float) -> str:
    size = float(n)
    for unit in ("B", "KB", "MB"):
        if size < 1024 or unit == "MB":
            return f"{size:.0f}{unit}" if unit == "B" else f"{size:.0f}{unit}"
        size /= 1024
    return f"{size:.1f}MB"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--src", default=DEFAULT_SRC, help="Folder of camera originals.")
    ap.add_argument("--out", default=str(DEFAULT_OUT), help="Folder of served WebP files.")
    ap.add_argument("--max-edge", type=int, default=DEFAULT_MAX_EDGE,
                    help=f"Cap on the longest side, in px (default {DEFAULT_MAX_EDGE}). Never upscales.")
    ap.add_argument("--quality", type=int, default=DEFAULT_QUALITY,
                    help=f"WebP quality 1-100 (default {DEFAULT_QUALITY}).")
    ap.add_argument("--dry-run", action="store_true", help="Report what would change, write nothing.")
    args = ap.parse_args()

    src_dir, out_dir = Path(args.src), Path(args.out)
    if not src_dir.is_dir():
        print(f"ERROR: originals not found: {src_dir}", file=sys.stderr)
        return 2
    out_dir.mkdir(parents=True, exist_ok=True)

    originals = sorted(src_dir.glob("b*.jpg"))
    if not originals:
        print(f"ERROR: no b*.jpg in {src_dir}", file=sys.stderr)
        return 2

    print(f"{len(originals)} original(s): {src_dir}")
    print(f"  ->  {out_dir}   (max edge {args.max_edge}px, quality {args.quality})")
    print("-" * 72)

    before = after = 0
    for original in originals:
        dest = out_dir / f"{original.stem}.webp"
        was = dest.stat().st_size if dest.exists() else 0

        # EXIF orientation is baked in here; the browser would not see the tag
        # on the re-encode, so a rotated frame has to be rotated for real.
        image = ImageOps.exif_transpose(Image.open(original)).convert("RGB")
        w, h = image.size
        scale = min(1.0, args.max_edge / max(w, h))
        if scale < 1.0:
            image = image.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

        if not args.dry_run:
            image.save(dest, "WEBP", quality=args.quality, method=6)

        now = dest.stat().st_size if dest.exists() and not args.dry_run else 0
        before += was
        after += now
        print(f"  {original.name:<10} {w}x{h} -> {image.size[0]}x{image.size[1]}"
              f"   {human(was)} -> {human(now)}")

    print("-" * 72)
    print(f"Total: {human(before)} -> {human(after)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
