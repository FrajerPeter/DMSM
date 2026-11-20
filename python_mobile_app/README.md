# FP DROP — Mobilný Prototyp v Pythone (VS Code)

**Projekt pre Fakultu podnikatelskú VUT v Brně (FP VUT)**  
Tento repozitár obsahuje kompletný funkčný prototyp mobilnej aplikácie pre streetwear značku **FP DROP**, naprogramovaný v **Pythone** a pripravený na okamžité spustenie vo **Visual Studio Code (VS Code)**.

---

## 📱 Prehľad architektúry a obrazoviek

V súlade so zadaním projektu sú implementované kľúčové obrazovky e-commerce mobilnej aplikácie:

1. **HOME (Úvodná obrazovka):**
   - Hero banner prebiehajúceho dropu (`DROP 001 — FIRST SEMESTER`) so statusom *SKLADEM V BRNĚ*.
   - Rýchly kupónový widget s ISIC zľavou (`FPVUT10` – 10% zľava).
   - Ticker najpredávanejších streetwear kúskov (Hot Girls Go To FP, No Sleep Just Deadlines, Signature Hoodie).

2. **SHOP (Katalóg s filtrami):**
   - Kategórie: `T-SHIRTS`, `HOODIES`, `ACCESSORIES`.
   - 2-stĺpcový responzívny mobilný grid.
   - Rýchly výber veľkostí (XS, S, M, L, XL, XXL).
   - Indikátory skladovej dostupnosti v Brne.

3. **DROPS (Časová os limitovaných edícií):**
   - Časová os edícií `DROP 001` až `DROP 004` (First Semester, Exam Season, FP After Dark, Brno Brutalism).
   - Statusy `LIVE` a `COMING SOON`.

4. **WISHLIST (Zoznam obľúbených):**
   - Interaktívne ukladanie a odstraňovanie produktov jedným kliknutím na srdiečko.
   - Možnosť presunúť položky priamo do košíka.

5. **CART & 1-CLICK CHECKOUT:**
   - Prehľad vybraných položiek, veľkostí a počtu kusov.
   - Automatický výpočet 10% študentskej zľavy a dopravy zadarmo (osobný odber Kolejní 29, Brno).
   - Rýchle dokončenie objednávky jedným tlačidlom.

6. **PROFIL ŠTUDENTA:**
   - ISIC identifikátor (`DEMO-ISIC-0000`), študijný program a nazbierané ECTS kredity.
   - História objednávok a sledovanie zásielky.

---

## 🚀 Návod na spustenie vo VS Code

### 1. Otvorenie projektu vo VS Code
1. Otvorte VS Code.
2. Zvoľte **File -> Open Folder...** a vyberte priečinok `python_mobile_app`.

### 2. Spustenie aplikácie (Režim 1: Bez inštalácie – Pure Python)
Aplikácia využíva vstavanú štandardnú knižnicu Pythonu, takže funguje okamžite bez nutnosti čokoľvek inštalovať:
```bash
python main.py
```
alebo stlačte klávesu **`F5`** vo VS Code.
V prehliadači sa automaticky otvorí mobilný emulátor iPhone 16 Pro na adrese `http://localhost:5050`.

### 3. Spustenie aplikácie (Režim 2: Flet / Flutter Mobile)
Ak chcete natívne mobilné okno pomocou frameworku Flet:
```bash
pip install -r requirements.txt
python main.py --flet
```

---

## 📂 Štruktúra súborov

```
python_mobile_app/
│
├── main.py                 # Hlavný spúšťač aplikácie (podpora --web aj --flet)
├── app_web.py              # Zero-dependency mobilný simulátor (iPhone 16 Pro)
├── app_flet.py             # Natívny Flutter UI framework pre Python
├── data.py                 # Databáza produktov, dropov a profilu študenta
├── requirements.txt        # Zoznam závislostí
├── README.md               # Dokumentácia k projektu
│
└── .vscode/
    └── launch.json         # Prednastavená konfigurácia pre F5 vo VS Code
```

---

## 🎓 Akademický kontext
- **Inštitúcia:** Vysoké učení technické v Brně (VUT)
- **Fakulta:** Fakulta podnikatelská (FP)
- **Lokalita:** Kolejní 29, 612 00 Brno
- **Akademický rok:** 2025/2026
