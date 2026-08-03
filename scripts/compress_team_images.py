#!/usr/bin/env python3
"""
Compress the employee headshot/photo folders through the QuickTools image
compressor and drop the results into tbest/public/team/.

For every image inside each person's folder we POST it to the compressor's
programmatic endpoint (`/api/v1/compress`, API-key auth) and save the returned,
smaller image into a per-person subfolder:

    <out>/<person-slug>/<original-name-slug>.<ext>

e.g.  Bezawit Fekede/BEZA 2 Final.jpg  ->  team/bezawit-fekede/beza-2-final.jpg

Nothing is deleted or overwritten unless you pass --force; the curated portraits
that live directly in public/team/ (benyam-tafesse.png, ...) are never touched
because the candidates go into subfolders.

Usage (defaults are filled in for this machine):

    python scripts/compress_team_images.py
    python scripts/compress_team_images.py --scale 0.5 --quality 80
    python scripts/compress_team_images.py --base-url http://127.0.0.1:8000 --api-key qt_local...

The default target is the *remote* server, because the API key was created there.
To use a local instance you must run it (uvicorn) and mint a local key first.
"""
from __future__ import annotations

import argparse
import mimetypes
import re
import sys
from pathlib import Path

import requests

# --------------------------------------------------------------------------- #
# Defaults for this machine. Override any of them with CLI flags.
# --------------------------------------------------------------------------- #
DEFAULT_SRC = r"C:\Users\hp\Downloads\Employee bio and headshots (1) (extract.me)\Employee bio and headshots"
DEFAULT_OUT = r"C:\Users\hp\projects\tbest\public\team"
DEFAULT_BASE_URL = "http://159.69.214.45:8090"          # live server
DEFAULT_API_KEY = "qt_twGmxbHpWkCObpf-5Te0KKZ-9yZ7x1DmClR1AmdC5W8"

# The compressor accepts these; anything else (e.g. .docx) is skipped.
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
CONTENT_TYPE = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
    ".png": "image/png", ".webp": "image/webp",
    ".bmp": "image/bmp", ".tif": "image/tiff", ".tiff": "image/tiff",
}


def slugify(text: str) -> str:
    """'Bezawit Fekede' -> 'bezawit-fekede'; keeps a-z 0-9, collapses the rest."""
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "item"


def human(n: float) -> str:
    size = float(n)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.0f}{unit}" if unit == "B" else f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}GB"


def compress_one(session: requests.Session, url: str, api_key: str,
                 src: Path, scale: float, quality: int, timeout: int):
    """POST one image, return (bytes, out_ext, headers) or raise."""
    ctype = CONTENT_TYPE.get(src.suffix.lower(), "application/octet-stream")
    with src.open("rb") as fh:
        resp = session.post(
            url,
            headers={"X-API-Key": api_key},
            files={"file": (src.name, fh, ctype)},
            data={"scale": str(scale), "quality": str(quality)},
            timeout=timeout,
        )
    if resp.status_code != 200:
        raise RuntimeError(f"HTTP {resp.status_code}: {resp.text[:200]}")
    out_format = resp.headers.get("X-Output-Format", "JPEG").upper()
    out_ext = "jpg" if out_format == "JPEG" else "png"
    return resp.content, out_ext, resp.headers


def main() -> int:
    ap = argparse.ArgumentParser(description="Compress team photos via QuickTools API.")
    ap.add_argument("--src", default=DEFAULT_SRC, help="Root folder of per-person subfolders.")
    ap.add_argument("--out", default=DEFAULT_OUT, help="Output folder (public/team).")
    ap.add_argument("--base-url", default=DEFAULT_BASE_URL, help="Compressor base URL.")
    ap.add_argument("--api-key", default=DEFAULT_API_KEY, help="QuickTools API key.")
    ap.add_argument("--scale", type=float, default=0.6, help="Resize factor 0.05-1.0 (default 0.6).")
    ap.add_argument("--quality", type=int, default=82, help="JPEG quality 1-100 (default 82).")
    ap.add_argument("--timeout", type=int, default=120, help="Per-request timeout (s).")
    ap.add_argument("--force", action="store_true", help="Overwrite existing outputs.")
    ap.add_argument("--dry-run", action="store_true", help="List what would happen, upload nothing.")
    args = ap.parse_args()

    src_root = Path(args.src)
    out_dir = Path(args.out)
    if not src_root.is_dir():
        print(f"ERROR: source folder not found: {src_root}", file=sys.stderr)
        return 2
    out_dir.mkdir(parents=True, exist_ok=True)

    url = args.base_url.rstrip("/") + "/api/v1/compress"
    people = sorted([p for p in src_root.iterdir() if p.is_dir()])
    if not people:
        print(f"No person subfolders in {src_root}", file=sys.stderr)
        return 2

    print(f"Source : {src_root}")
    print(f"Target : {out_dir}")
    print(f"API    : {url}  (scale={args.scale}, quality={args.quality})")
    print(f"People : {len(people)}")
    print("-" * 72)

    session = requests.Session()
    total = ok = skipped = failed = 0
    bytes_in = bytes_out = 0

    for person in people:
        slug = slugify(person.name)
        images = sorted([f for f in person.iterdir()
                         if f.is_file() and f.suffix.lower() in IMAGE_EXTS])
        if not images:
            print(f"\n{person.name}  (no images)")
            continue
        person_dir = out_dir / slug          # each person gets their own subfolder
        print(f"\n{person.name}  ->  team/{slug}/  ({len(images)} image(s))")

        for img in images:
            total += 1
            stem_slug = slugify(img.stem)
            # extension is decided by the server's response; assume jpg for the
            # skip-check, then rewrite if the real output turns out to be png.
            candidate = person_dir / f"{stem_slug}.jpg"
            candidate_png = person_dir / f"{stem_slug}.png"
            if not args.force and (candidate.exists() or candidate_png.exists()):
                print(f"  - {img.name:<28} skip (already exists)")
                skipped += 1
                continue

            if args.dry_run:
                print(f"  - {img.name:<28} would -> {slug}/{candidate.name}")
                continue

            try:
                data, ext, headers = compress_one(
                    session, url, args.api_key, img, args.scale, args.quality, args.timeout
                )
            except Exception as exc:  # noqa: BLE001
                print(f"  - {img.name:<28} FAILED: {exc}")
                failed += 1
                continue

            person_dir.mkdir(parents=True, exist_ok=True)
            dest = person_dir / f"{stem_slug}.{ext}"
            dest.write_bytes(data)
            oin = int(headers.get("X-Original-Bytes", img.stat().st_size))
            oout = int(headers.get("X-Compressed-Bytes", len(data)))
            saved = headers.get("X-Saved-Percent", "?")
            dims = headers.get("X-New-Dimensions", "?")
            bytes_in += oin
            bytes_out += oout
            ok += 1
            print(f"  - {img.name:<28} {human(oin)} -> {human(oout)}  "
                  f"(-{saved}%, {dims})  ->  {slug}/{dest.name}")

    print("\n" + "=" * 72)
    print(f"Processed {total} image(s): {ok} compressed, {skipped} skipped, {failed} failed.")
    if ok:
        overall = (1 - bytes_out / bytes_in) * 100 if bytes_in else 0
        print(f"Total size: {human(bytes_in)} -> {human(bytes_out)}  (-{overall:.1f}%)")
        print(f"Output in : {out_dir}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
