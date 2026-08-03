#!/usr/bin/env python3
"""
Extract each employee's Word (.docx) bio into a plain-text file inside that
person's team folder, so the text is easy to reuse later.

    <Employee folder>/<Name>/<something>.docx
        -> <out>/<person-slug>/bio.txt

A .docx is just a zip; the visible text lives in word/document.xml, so this uses
only the standard library (no python-docx needed). People without a .docx (the
already-curated portraits) are simply skipped.
"""
from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

DEFAULT_SRC = r"C:\Users\hp\Downloads\Employee bio and headshots (1) (extract.me)\Employee bio and headshots"
DEFAULT_OUT = r"C:\Users\hp\projects\tbest\public\team"


def slugify(text: str) -> str:
    text = re.sub(r"[^a-z0-9]+", "-", text.strip().lower())
    return text.strip("-") or "item"


def docx_to_text(path: Path) -> str:
    """Return the visible paragraph text of a .docx, preserving line breaks."""
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml")
    root = ET.fromstring(xml)
    lines: list[str] = []
    for para in root.iter(f"{W}p"):
        parts: list[str] = []
        # Walk descendants in document order: text runs and explicit breaks.
        for node in para.iter():
            tag = node.tag
            if tag == f"{W}t" and node.text:
                parts.append(node.text)
            elif tag in (f"{W}br", f"{W}cr"):
                parts.append("\n")
            elif tag == f"{W}tab":
                parts.append("\t")
        lines.append("".join(parts))
    text = "\n".join(lines)
    text = re.sub(r"[ \t]+\n", "\n", text)      # trim trailing spaces
    text = re.sub(r"\n{3,}", "\n\n", text)       # collapse big gaps
    return text.strip()


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract .docx bios to bio.txt per person.")
    ap.add_argument("--src", default=DEFAULT_SRC)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--force", action="store_true", help="Overwrite existing bio.txt.")
    args = ap.parse_args()

    src_root = Path(args.src)
    out_dir = Path(args.out)
    if not src_root.is_dir():
        print(f"ERROR: source not found: {src_root}", file=sys.stderr)
        return 2

    people = sorted(p for p in src_root.iterdir() if p.is_dir())
    wrote = skipped = nodoc = 0
    for person in people:
        slug = slugify(person.name)
        docs = sorted(f for f in person.iterdir()
                      if f.is_file() and f.suffix.lower() == ".docx")
        if not docs:
            print(f"{person.name:<24} (no .docx)")
            nodoc += 1
            continue
        # If somehow more than one, take the first and note the rest.
        doc = docs[0]
        dest_dir = out_dir / slug
        dest = dest_dir / "bio.txt"
        if dest.exists() and not args.force:
            print(f"{person.name:<24} skip (bio.txt exists)")
            skipped += 1
            continue
        try:
            text = docx_to_text(doc)
        except Exception as exc:  # noqa: BLE001
            print(f"{person.name:<24} FAILED: {exc}")
            continue
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8")
        wc = len(text.split())
        extra = f"  (+{len(docs)-1} more docx ignored)" if len(docs) > 1 else ""
        print(f"{person.name:<24} -> {slug}/bio.txt  ({wc} words){extra}")
        wrote += 1

    print(f"\nWrote {wrote} bio.txt, {skipped} skipped, {nodoc} had no .docx.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
