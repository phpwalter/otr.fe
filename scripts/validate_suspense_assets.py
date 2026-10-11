#!/usr/bin/env python3
"""Validate Suspense artwork dimensions and required source assets.

Run from the repository root:
  python scripts/validate_suspense_assets.py

Requires Pillow (pip install Pillow). This checks file integrity and naming;
it does NOT claim pixel-perfect visual matching or a successful browser build.
"""
from pathlib import Path
from PIL import Image

ART = Path("public/art")
EXPECTED = {
    "suspense-hero.webp": (529, 700),
    "suspense-episodes.webp": (334, 152),
    "suspense-cast.webp": (299, 153),
    "suspense-featured.webp": (299, 295),
    "suspense-logo.png": (754, 444),
}
failed = False
for filename, dimensions in EXPECTED.items():
    path = ART / filename
    if not path.is_file():
        print(f"MISSING: {path}")
        failed = True
        continue
    try:
        with Image.open(path) as img:
            img.verify()
        with Image.open(path) as img:
            if img.size != dimensions:
                print(f"WRONG SIZE: {path}: {img.size}, expected {dimensions}")
                failed = True
            elif filename.endswith(".png") and "A" not in img.getbands():
                print(f"NO ALPHA: {path}")
                failed = True
            else:
                print(f"OK: {path} ({img.width} x {img.height})")
    except Exception as exc:
        print(f"INVALID: {path}: {exc}")
        failed = True
if failed:
    raise SystemExit(1)
print("All required Suspense artwork files passed integrity checks.")
