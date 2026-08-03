#!/usr/bin/env python3
"""
Make a transparent-background version of every team candidate image, keeping the
originals in place.

Walks the per-person subfolders under public/team/ and, for each image, POSTs it
to the QuickTools background remover (`/api/v1/remove-bg`, API-key auth) and saves
the returned transparent PNG next to it:

    team/<slug>/beza-2-final.jpg   ->  team/<slug>/beza-2-final-nobg.png

Idempotent: files that already end in "-nobg" are skipped, and existing "-nobg"
outputs are skipped unless you pass --force. bio.txt and other non-images are
ignored. The curated portraits in the team/ root are not touched (only subfolders
are processed).
"""
from __future__ import annotations

import argparse
import sys
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

DEFAULT_DIR = r"C:\Users\hp\projects\tbest\public\team"
DEFAULT_BASE_URL = "http://159.69.214.45:8090"
DEFAULT_API_KEY = "qt_twGmxbHpWkCObpf-5Te0KKZ-9yZ7x1DmClR1AmdC5W8"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
CONTENT_TYPE = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".webp": "image/webp", ".bmp": "image/bmp", ".tif": "image/tiff", ".tiff": "image/tiff",
}


def prepare_upload(path: Path, max_dim: int) -> tuple[str, bytes, str]:
    """Return (filename, bytes, content_type), downscaling oversized images so the
    background remover (and its PNG encode) stays fast. Small images are sent
    byte-for-byte untouched. Alpha is preserved; opaque images become JPEG."""
    suffix = path.suffix.lower()
    with Image.open(path) as im:
        im.load()
        w, h = im.size
        if max(w, h) <= max_dim:
            return path.name, path.read_bytes(), CONTENT_TYPE.get(suffix, "application/octet-stream")

        ratio = max_dim / max(w, h)
        resized = im.resize((max(1, round(w * ratio)), max(1, round(h * ratio))), Image.LANCZOS)
        has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        buf = BytesIO()
        if has_alpha:
            resized.convert("RGBA").save(buf, format="PNG", optimize=False)
            return f"{path.stem}.png", buf.getvalue(), "image/png"
        resized.convert("RGB").save(buf, format="JPEG", quality=90)
        return f"{path.stem}.jpg", buf.getvalue(), "image/jpeg"


def human(n: float) -> str:
    size = float(n)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.0f}{unit}" if unit == "B" else f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}GB"


def main() -> int:
    ap = argparse.ArgumentParser(description="Remove backgrounds for team images via QuickTools API.")
    ap.add_argument("--dir", default=DEFAULT_DIR, help="team/ folder with per-person subfolders.")
    ap.add_argument("--base-url", default=DEFAULT_BASE_URL)
    ap.add_argument("--api-key", default=DEFAULT_API_KEY)
    ap.add_argument("--max-dim", type=int, default=1000,
                    help="Downscale the long side to this before bg removal (default 1000).")
    ap.add_argument("--timeout", type=int, default=180, help="Per-request timeout (s).")
    ap.add_argument("--force", action="store_true", help="Re-create existing -nobg outputs.")
    ap.add_argument("--dry-run", action="store_true", help="List work, upload nothing.")
    args = ap.parse_args()

    root = Path(args.dir)
    if not root.is_dir():
        print(f"ERROR: folder not found: {root}", file=sys.stderr)
        return 2

    url = args.base_url.rstrip("/") + "/api/v1/remove-bg"
    people = sorted(d for d in root.iterdir() if d.is_dir())
    print(f"Target : {root}")
    print(f"API    : {url}")
    print(f"People : {len(people)}")
    print("-" * 72)

    session = requests.Session()
    total = ok = skipped = failed = 0

    for person in people:
        images = sorted(
            f for f in person.iterdir()
            if f.is_file()
            and f.suffix.lower() in IMAGE_EXTS
            and not f.stem.endswith("-nobg")
        )
        if not images:
            continue
        print(f"\n{person.name}/  ({len(images)} image(s))")

        for img in images:
            total += 1
            dest = img.with_name(f"{img.stem}-nobg.png")
            if dest.exists() and not args.force:
                print(f"  - {img.name:<34} skip (nobg exists)")
                skipped += 1
                continue
            if args.dry_run:
                print(f"  - {img.name:<34} would -> {dest.name}")
                continue

            try:
                up_name, up_bytes, up_ctype = prepare_upload(img, args.max_dim)
                resp = session.post(
                    url,
                    headers={"X-API-Key": args.api_key},
                    files={"file": (up_name, up_bytes, up_ctype)},
                    timeout=args.timeout,
                )
                if resp.status_code != 200:
                    raise RuntimeError(f"HTTP {resp.status_code}: {resp.text[:160]}")
            except Exception as exc:  # noqa: BLE001
                print(f"  - {img.name:<34} FAILED: {exc}")
                failed += 1
                continue

            dest.write_bytes(resp.content)
            ok += 1
            shrunk = "" if up_name == img.name else " (downscaled)"
            print(f"  - {img.name:<34} -> {dest.name}  ({human(len(resp.content))} PNG){shrunk}")

    print("\n" + "=" * 72)
    print(f"Processed {total} image(s): {ok} cut out, {skipped} skipped, {failed} failed.")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
