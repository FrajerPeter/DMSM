"""
Rozreže mriežku produktových fotiek FP DROP • WINTER '26 (6 riadkov × 4 stĺpce)
na 24 samostatných obrázkov produktov 20–43.

Postup pre každé políčko:
  1. hranice políčok sa nájdu podľa tenkých sivých deliacich čiar,
  2. odreže sa textový nadpis v hornej časti políčka („20 | HOT GIRLS GO TO FP TEE“),
  3. nájde sa ohraničenie samotného produktu (pixely odlišné od svetlého pozadia, vrátane tieňa),
  4. produkt sa vycentruje na štvorcové plátno s farbou pozadia a okrajom a uloží ako JPG.

Použitie (z koreňa projektu):
    pip install pillow numpy
    python scripts/crop_merch_grid.py [cesta/k/mriezke] [vystupny/priecinok] [--view front|back|detail]
Predvolene: assets/merch_grid_winter26.webp -> public/products/winter26/

Zadné a detailné fotky: priprav mriežku v rovnakom rozložení (6 × 4, rovnaké poradie 20–43)
a spusti napr.  python scripts/crop_merch_grid.py assets/merch_grid_winter26_back.webp --view back
Vzniknú súbory 20-…-back.jpg; potom ich doplň do src/data/productImages.ts ako `back:`
(detail produktu potom automaticky zobrazí prepínače FRONT / BACK).
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_INPUT = ROOT / "assets" / "merch_grid_winter26.webp"
DEFAULT_OUTPUT = ROOT / "public" / "products" / "winter26"

ROWS, COLS = 6, 4
OUTPUT_SIZE = 1000          # rovnaké rozlíšenie ako pôvodné produktové fotky
PRODUCT_FILL = 0.80         # produkt zaberie ~80 % dlhšej strany plátna
BODY_TOP = 160              # pod hlavným bannerom s nadpisom kolekcie

# Poradie v mriežke = čísla 20–43 = produkty prod-01 … prod-24 v src/data/products.ts
PRODUCTS = [
    (20, "hot-girls-go-to-fp-tee"), (21, "no-sleep-tee"), (22, "ects-are-temporary-tee"), (23, "fp-after-dark-tee"),
    (24, "brno-tee"), (25, "business-but-make-it-fun-tee"), (26, "trading-deadlines-for-coffee-tee"), (27, "study-party-repeat-tee"),
    (28, "fp-vut-no-explanation-needed-tee"), (29, "probably-in-the-library-tee"), (30, "brno-is-home-tee"), (31, "one-more-semester-tee"),
    (32, "fp-001-signature-hoodie"), (33, "exam-survivor-hoodie"), (34, "brno-brutalism-crewneck"), (35, "deadline-runner-crewneck"),
    (36, "fp-embroidery-dad-cap"), (37, "brno-nightline-snapback"), (38, "campus-survival-tote"), (39, "ects-collector-tote"),
    (40, "kolejni-29-socks"), (41, "no-sleep-socks"), (42, "fp-drop-vinyl-stickers"), (43, "brno-holographic-stickers"),
]


def find_lines(profile: np.ndarray, threshold: float) -> list[int]:
    """Vráti stredy súvislých úsekov, kde profil prekračuje prah (= deliace čiary)."""
    idx = np.where(profile > threshold)[0]
    if idx.size == 0:
        return []
    groups, start, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i != prev + 1:
            groups.append((start + prev) // 2)
            start = i
        prev = i
    groups.append((start + prev) // 2)
    return [int(g) for g in groups]


def grid_bounds(gray: np.ndarray, bg: float) -> tuple[list[int], list[int]]:
    h, w = gray.shape
    line_px = (gray < bg - 8) & (gray > bg - 80)  # tenká sivá čiara, nie tmavý produkt
    vlines = find_lines(line_px[BODY_TOP:].mean(axis=0), 0.6)
    hlines = find_lines(line_px[BODY_TOP:].mean(axis=1), 0.6)
    hlines = [y + BODY_TOP for y in hlines]
    if len(vlines) != COLS - 1 or len(hlines) != ROWS - 1:
        raise SystemExit(f"Neočakávaná mriežka: {len(vlines)} zvislých a {len(hlines)} vodorovných čiar")

    # Vonkajšie okraje: rozsah vodorovných čiar zľava/sprava, prvý riadok s textom zhora, posledný obsah zdola.
    first_line = line_px[hlines[0]]
    xs = np.where(first_line)[0]
    left, right = int(xs.min()), int(xs.max())
    dark_rows = np.where((gray[BODY_TOP:] < 120).any(axis=1))[0] + BODY_TOP
    top = int(dark_rows.min()) - 12
    content_rows = np.where((np.abs(gray - bg) > 14).any(axis=1))[0]
    bottom = min(h - 1, int(content_rows.max()) + 12)
    return [left, *vlines, right], [top, *hlines, bottom]


def label_bottom(cell: np.ndarray) -> int:
    """Spodný okraj textového nadpisu v hornej časti políčka."""
    text_rows = np.where((cell[:80] < 120).sum(axis=1) > 2)[0]
    if text_rows.size == 0:
        return 0
    # nadpis je prvý súvislý blok riadkov s textom
    end = text_rows[0]
    for r in text_rows[1:]:
        if r - end > 4:
            break
        end = r
    return int(end) + 6


def main() -> None:
    args = sys.argv[1:]
    view = "front"
    if "--view" in args:
        i = args.index("--view")
        view = args[i + 1] if i + 1 < len(args) else ""
        del args[i:i + 2]
    if view not in ("front", "back", "detail"):
        raise SystemExit("--view musí byť front, back alebo detail")
    src = Path(args[0]) if len(args) > 0 else DEFAULT_INPUT
    out_dir = Path(args[1]) if len(args) > 1 else DEFAULT_OUTPUT
    suffix = "" if view == "front" else f"-{view}"
    out_dir.mkdir(parents=True, exist_ok=True)

    image = Image.open(src).convert("RGB")
    rgb = np.asarray(image).astype(np.int16)
    gray = np.asarray(image.convert("L")).astype(float)
    bg = float(np.median(gray))
    xs, ys = grid_bounds(gray, bg)

    for index, (number, slug) in enumerate(PRODUCTS):
        r, c = divmod(index, COLS)
        x0, x1 = xs[c] + 4, xs[c + 1] - 4
        y0, y1 = ys[r] + 4, ys[r + 1] - 4
        cell_gray = gray[y0:y1, x0:x1]
        cell_rgb = rgb[y0:y1, x0:x1]

        top = label_bottom(cell_gray)
        body_gray = cell_gray[top:]
        body_rgb = cell_rgb[top:]

        # farba pozadia políčka = medián okrajových pixelov
        border = np.concatenate([body_rgb[:, :3].reshape(-1, 3), body_rgb[:, -3:].reshape(-1, 3), body_rgb[-3:].reshape(-1, 3)])
        cell_bg = np.median(border, axis=0)
        mask = np.abs(body_rgb - cell_bg).max(axis=2) > 10
        rows_any, cols_any = np.where(mask.any(axis=1))[0], np.where(mask.any(axis=0))[0]
        if rows_any.size == 0:
            raise SystemExit(f"V políčku {number} sa nenašiel produkt")
        by0, by1 = int(rows_any.min()), int(rows_any.max()) + 1
        bx0, bx1 = int(cols_any.min()), int(cols_any.max()) + 1

        product = Image.fromarray(body_rgb[by0:by1, bx0:bx1].astype(np.uint8))
        scale = OUTPUT_SIZE * PRODUCT_FILL / max(product.size)
        product = product.resize((round(product.width * scale), round(product.height * scale)), Image.LANCZOS)

        canvas = Image.new("RGB", (OUTPUT_SIZE, OUTPUT_SIZE), tuple(int(v) for v in cell_bg))
        canvas.paste(product, ((OUTPUT_SIZE - product.width) // 2, (OUTPUT_SIZE - product.height) // 2))
        target = out_dir / f"{number}-{slug}{suffix}.jpg"
        canvas.save(target, "JPEG", quality=90, optimize=True, progressive=True)
        shown = target.relative_to(ROOT) if target.is_relative_to(ROOT) else target
        print(f"{number}: {shown}  (produkt {bx1 - bx0}x{by1 - by0} px)")


if __name__ == "__main__":
    main()
