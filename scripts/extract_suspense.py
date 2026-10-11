#!/usr/bin/env python3
"""Extract artwork from the original, user-owned Suspense landing-page mockup.

Usage:
    python scripts/extract_suspense.py /path/to/suspense-mockup.png
Requires Pillow. Writes public/art/suspense-* assets from the reference 1448x1086 image.
The crops are preliminary: the source is flattened and some text remains baked into pixels.
"""
from pathlib import Path
import argparse
from PIL import Image

CROPS = {
    "suspense-hero.webp": (919, 0, 1448, 700),
    "suspense-episodes.webp": (33, 722, 367, 874),
    "suspense-cast.webp": (395, 723, 694, 876),
    "suspense-featured.webp": (708, 721, 1007, 1016),
    "suspense-card.webp": (708, 721, 1007, 1016),
}

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mockup", type=Path)
    parser.add_argument("--out", type=Path, default=Path("public/art"))
    args = parser.parse_args()
    source = Image.open(args.mockup).convert("RGBA")
    if source.size != (1448, 1086):
        parser.error(f"Expected a 1448x1086 original; found {source.size}")
    args.out.mkdir(parents=True, exist_ok=True)
    for name, bounds in CROPS.items():
        source.crop(bounds).convert("RGB").save(args.out / name, "WEBP", quality=87, method=6)
        print("Generated", args.out / name)
    logo = source.crop((208, 29, 962, 473))
    pixels = logo.load()
    for y in range(logo.height):
        for x in range(logo.width):
            r, g, b, _ = pixels[x, y]
            alpha = max(0, min(255, round((r - max(g, b) * 1.24) * 4.2)))
            pixels[x, y] = (r, g, b, alpha)
    logo.save(args.out / "suspense-logo.png", optimize=True)
    print("Generated", args.out / "suspense-logo.png")

if __name__ == "__main__":
    main()
