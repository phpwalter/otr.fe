#!/usr/bin/env python3
"""Validate the four user-supplied Suspense skin assets."""
from pathlib import Path
from PIL import Image
root=Path("public/art/suspense")
expected={"hero.png":(1536,1024),"card-cast.png":(325,166),"card-episodes.png":(325,166),"card-feature.png":(680,308)}
failures=[]
for name,size in expected.items():
    path=root/name
    if not path.is_file():
        failures.append(f"Missing {path}")
        continue
    try:
        with Image.open(path) as img:
            img.verify()
        with Image.open(path) as img:
            if img.size!=size: failures.append(f"Incorrect dimensions for {path}: {img.size}, expected {size}")
            if img.mode!="RGBA": failures.append(f"Expected RGBA asset for {path}, found {img.mode}")
    except Exception as err:
        failures.append(f"Cannot read {path}: {err}")
if failures:
    raise SystemExit("\n".join(failures))
print("All four Suspense assets are present and valid.")
