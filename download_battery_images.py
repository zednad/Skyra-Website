#!/usr/bin/env python3
"""
Skyra Energy – Battery Product Image Downloader & Processor
============================================================
Run this script once from your terminal to download, crop, and align
the three battery product images for the website.

Requirements:
    pip3 install Pillow requests

Usage:
    cd /path/to/skyra-energy
    python3 download_battery_images.py
"""

import os
import sys
import urllib.request

# ── Check dependencies ──────────────────────────────────────────────────────
try:
    from PIL import Image, ImageOps
    import io
except ImportError:
    print("ERROR: Pillow is not installed.")
    print("Run:  pip3 install Pillow")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────────────

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "images", "batteries")

# Target dimensions for all three output images (consistent website display)
OUTPUT_WIDTH  = 800
OUTPUT_HEIGHT = 900
PADDING       = 40          # whitespace padding around the cropped battery (px)
OUTPUT_BG     = (248, 248, 248)  # near-white background to match the website

IMAGES = [
    {
        "name":    "foxess_eq4800",
        "label":   "Fox ESS EQ4800",
        "url":     "https://au.fox-ess.com/Public/Uploads/uploadfile/images/20251206/ECS1pc-564.jpg",
        # Crop box (left, upper, right, lower) as fraction of original image
        # The battery sits in the right ~55% of the 1920×800 image
        "crop_pct": (0.42, 0.0, 1.0, 1.0),
        "format":  "JPEG",
    },
    {
        "name":    "lg_resu_16h",
        "label":   "LG RESU 16H Prime",
        "url":     "https://solarmyplace.com/cdn/shop/products/image_2021_04_22T16_35_54_252Z_1024x1024@2x.png?v=1619110918",
        # Image is already a clean product shot – use the full frame
        "crop_pct": (0.0, 0.0, 1.0, 1.0),
        "format":  "PNG",
    },
    {
        "name":    "sigenergy_sigenstor",
        "label":   "Sigenergy SigenStor",
        "url":     "https://offgridpowerstation.nl/wp-content/uploads/2025/10/products-sigenergy1.jpg",
        # Batteries are centred; trim the narrow black side bars
        "crop_pct": (0.05, 0.0, 0.95, 1.0),
        "format":  "JPEG",
    },
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


# ── Helpers ──────────────────────────────────────────────────────────────────

def download(url: str, label: str) -> bytes:
    print(f"  Downloading {label} …", end="", flush=True)
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    print(f" {len(data)//1024} KB ✓")
    return data


def auto_trim(img: Image.Image, bg_color, threshold: int = 15) -> Image.Image:
    """Remove near-uniform border strips on all four sides."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    left = right = top = bottom = 0

    def row_uniform(y):
        pixels = [rgb.getpixel((x, y)) for x in range(0, w, max(1, w // 50))]
        return all(
            all(abs(p[c] - bg_color[c]) < threshold for c in range(3))
            for p in pixels
        )

    def col_uniform(x):
        pixels = [rgb.getpixel((x, y)) for y in range(0, h, max(1, h // 50))]
        return all(
            all(abs(p[c] - bg_color[c]) < threshold for c in range(3))
            for p in pixels
        )

    while top < h // 2    and row_uniform(top):      top    += 1
    while bottom < h // 2 and row_uniform(h-1-bottom): bottom += 1
    while left < w // 2   and col_uniform(left):     left   += 1
    while right < w // 2  and col_uniform(w-1-right): right  += 1

    if left + right + top + bottom > 0:
        img = img.crop((left, top, w - right, h - bottom))
        print(f"    Trimmed borders: L{left} T{top} R{right} B{bottom}")
    return img


def process(raw: bytes, spec: dict) -> Image.Image:
    img = Image.open(io.BytesIO(raw)).convert("RGBA")
    w, h = img.size

    # 1. Apply manual crop fraction
    lf, tf, rf, bf = spec["crop_pct"]
    box = (int(lf * w), int(tf * h), int(rf * w), int(bf * h))
    img = img.crop(box)

    # 2. Flatten onto near-white background (needed for JPEG with alpha)
    bg = Image.new("RGB", img.size, OUTPUT_BG)
    bg.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
    img = bg

    # 3. Auto-trim uniform-colour borders
    img = auto_trim(img, OUTPUT_BG, threshold=20)

    # 4. Scale to fit inside (OUTPUT_WIDTH - 2*PADDING) × (OUTPUT_HEIGHT - 2*PADDING)
    max_w = OUTPUT_WIDTH  - 2 * PADDING
    max_h = OUTPUT_HEIGHT - 2 * PADDING
    img.thumbnail((max_w, max_h), Image.LANCZOS)

    # 5. Centre on final canvas
    canvas = Image.new("RGB", (OUTPUT_WIDTH, OUTPUT_HEIGHT), OUTPUT_BG)
    x_off = (OUTPUT_WIDTH  - img.width)  // 2
    y_off = (OUTPUT_HEIGHT - img.height) // 2
    canvas.paste(img, (x_off, y_off))

    return canvas


def save(img: Image.Image, name: str, fmt: str) -> str:
    ext  = "jpg" if fmt == "JPEG" else "png"
    path = os.path.join(OUTPUT_DIR, f"{name}.{ext}")
    kw   = {"quality": 92, "optimize": True} if fmt == "JPEG" else {"optimize": True}
    img.save(path, fmt, **kw)
    size = os.path.getsize(path) // 1024
    print(f"    Saved → {path}  ({img.width}×{img.height}, {size} KB)")
    return path


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"\nSkyra Energy – Battery Image Processor")
    print(f"Output: {OUTPUT_DIR}\n")

    saved = []
    for spec in IMAGES:
        print(f"── {spec['label']} ──")
        try:
            raw  = download(spec["url"], spec["label"])
            img  = process(raw, spec)
            path = save(img, spec["name"], spec["format"])
            saved.append(path)
        except Exception as e:
            print(f"  ERROR: {e}")
        print()

    print("=" * 60)
    print(f"Done!  {len(saved)}/{len(IMAGES)} images saved.")
    print("\nAll images are:")
    print(f"  • {OUTPUT_WIDTH}×{OUTPUT_HEIGHT} pixels")
    print(f"  • Consistent framing with {PADDING}px padding")
    print(f"  • Background: RGB{OUTPUT_BG}")
    print("\nAdd them to your website as:")
    for spec in IMAGES:
        ext = "jpg" if spec["format"] == "JPEG" else "png"
        rel = f"public/images/batteries/{spec['name']}.{ext}"
        print(f"  /images/batteries/{spec['name']}.{ext}  ← {spec['label']}")


if __name__ == "__main__":
    main()
