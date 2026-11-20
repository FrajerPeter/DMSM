# FP DROP – Kompletný webový projekt & Návod na VS Code a PrestaShop

Tento archív obsahuje kompletný zdrojový kód celého webu **FP DROP** (React, TypeScript, Vite, Tailwind CSS, simulátor mobilnej aplikácie, akademická prípadová štúdia, marketingový hub a exporty).

---

## ČASŤ 1: Ako otvoriť a spustiť celý projekt vo VS Code (krok po kroku)

### 1. Predpoklady na vašom počítači (Windows)
1. **Node.js**:
   - Ak ešte nemáte nainštalovaný Node.js, stiahnite si bezplatnú **LTS verziu** z oficiálnej stránky: [https://nodejs.org](https://nodejs.org).
   - Inštalácia je jednoduchá (stačí klikať „Next“). Tým získate príkazy `node` a `npm`.
2. **Visual Studio Code (VS Code)**:
   - Stiahnite a nainštalujte z [https://code.visualstudio.com](https://code.visualstudio.com).

### 2. Rozbalenie a otvorenie projektu
1. Rozbaľte stiahnutý archív `fp_drop_full_web_project.zip` do ľubovoľného priečinka vo vašom počítači, napríklad:
   `C:\Projekty\fp-drop-web`
2. Otvorte program **Visual Studio Code**.
3. V hornom menu kliknite na:
   **File (Súbor) -> Open Folder... (Otvoriť priečinok...)**
4. Vyberte priečinok `C:\Projekty\fp-drop-web` a potvrďte.

### 3. Inštalácia závislostí a spustenie
1. Vo VS Code otvorte terminál stlačením klávesovej skratky:
   `Ctrl + ~` (alebo v hornom menu **Terminal -> New Terminal**).
2. Do terminálu zadajte príkaz na inštaláciu potrebných knižníc:
   ```bash
   npm install
   ```
   *(Tento príkaz stiahne všetky potrebné balíčky z package.json do zložky node_modules).*

3. Spustite lokálny vývojový server:
   ```bash
   npm run dev
   ```
4. V termináli sa zobrazí odkaz, napr.:
   `Local: http://localhost:5173`
   Kliknite naň s podržaním klávesy `Ctrl` (alebo otvorte prehliadač a zadajte adresu). Celý web vám teraz beží lokálne na vašom PC!

### 4. Vytvorenie produkčného balíčka (pre web a PrestaShop)
Keď chcete projekt vyexportovať do čistých HTML, CSS a JavaScript súborov na zverejnenie:
```bash
npm run build
```
Vytvorí sa priečinok **`dist/`**, ktorý obsahuje hotový optimalizovaný web pripravený na nahratie na ľubovoľný hosting.

---

## ČASŤ 2: Ako zverejniť a prepojiť projekt s PrestaShopom (krok po kroku)

PrestaShop je e-commerce CMS bežiace na PHP a MySQL, určené na predaj produktov, košík a sklad.
Táto aplikácia FP DROP je moderná **React Single Page Application (SPA)**, ktorá slúži ako interaktívny drop portál, mobilný simulátor a prezentácia značky.

Tu sú **3 najlepšie a overené spôsoby**, ako ich v praxi prepojiť:

---

### MOŽNOSŤ A: Samostatná subdoména na rovnakom hostingu (Odporúčané v praxi)
Toto je štandardné riešenie veľkých streetwear značiek (napr. e-shop beží na `eshop.vutdrop.cz` a interaktívna drop platforma na `drop.vutdrop.cz` alebo `app.vutdrop.cz`).

1. **Vytvorenie produkčného buildu**:
   Vo VS Code spustite `npm run build`. Vznikne priečinok `dist/`.
2. **Nahratie na hosting cez FTP / cPanel**:
   - Prihláste sa na váš hosting (kde beží PrestaShop).
   - Vytvorte subdoménu (napr. `app.tvojadomena.sk`) alebo podzložku v `public_html/app/`.
   - Cez FTP (napr. program FileZilla) nahrajte celý obsah zložky `dist/` do priečinka danej subdomény.
3. **Prepojenie v PrestaShope**:
   - Prihláste sa do administrácie PrestaShopu.
   - V menu kliknite na **Vzhľad (Design) -> Odkazy v menu / Hlavné menu (Main Menu)**.
   - Pridajte novú položku menu s názvom **„FP DROP APP / SIMULÁTOR“** a vložte URL adresu subdomény (`https://app.tvojadomena.sk`).
4. **Prepojenie z FP DROP do PrestaShopu**:
   - V súbore `src/data/products.ts` alebo priamo v tlačidle nákupu nastavte odkaz tlačidla „Kúpiť“ na priamu adresu produktu vo vašom PrestaShop e-shope (napr. `https://eshop.tvojadomena.sk/mikiny/1-fp-hoodie-001.html`).

---

### MOŽNOSŤ B: Vloženie do PrestaShopu ako nová CMS stránka (priamo v e-shope)
Ak chcete, aby sa interaktívny simulátor a celá prezentácia zobrazovala priamo vnútri dizajnu PrestaShopu medzi hlavičkou a pätou e-shopu:

1. **Povolenie iframe v PrestaShope**:
   - V administrácii PrestaShopu prejdite do:
     **Nastavenia obchodu (Shop Parameters) -> Všeobecné (General)**.
   - Položku **„Povoliť prvky iframe v poliach HTML“ (Allow iframes on HTML fields)** prepnite na **ÁNO (YES)** a uložte.
2. **Nasadenie React aplikácie**:
   - Aplikáciu môžete mať nahranú na subdoméne (alebo bezplatne na Vercel / Netlify jedným klikom z GitHubu).
3. **Vytvorenie CMS stránky v PrestaShope**:
   - Prejdite do **Vzhľad (Design) -> Stránky (Pages)**.
   - Kliknite na **Pridať novú stránku (Add new page)**.
   - Názov stránky: *FP DROP – Interaktívny priestor pre študentov*.
   - V textovom editore kliknite na tlačidlo **Zdrojový kód (<> / Source Code)** a vložte:
     ```html
     <div style="width: 100%; min-height: 850px; border: none; overflow: hidden;">
       <iframe 
         src="https://app.tvojadomena.sk" 
         width="100%" 
         height="850px" 
         style="border: 0; width: 100%; height: 850px;" 
         allowfullscreen>
       </iframe>
     </div>
     ```
   - Uložte a publikujte stránku. Teraz sa celý interaktívny web zobrazuje priamo vnútri vášho PrestaShopu!

---

### MOŽNOSŤ C: Prepojenie cez PrestaShop REST API (Pre pokročilých)
PrestaShop má vstavané **Webservice API**:
1. V PrestaShope: **Rozšírené parametre (Advanced Parameters) -> Webservice**.
2. Povoľte Webservice a vygenerujte API kľúč s právami na `products`, `categories`, `orders`.
3. V React aplikácii môžete cez `fetch('https://tvoj-eshop.sk/api/products?ws_key=TVOJ_KLUČ&output_format=JSON')` načítavať živé zásoby, ceny a produkty z PrestaShop skladu priamo do rozhrania FP DROP.

---

## ZHRNUTIE ŠTRUKTÚRY ZLOŽIEK PROJEKTU

- `src/` – Zdrojové komponenty Reactu, simulátor, akademická štúdia, e-shop rozhranie.
- `public/` – Statické súbory, logá, obrázky produktov a archív zdrojového kódu webu a mobilného prototypu. Akademický Word dokument nie je súčasťou verejných súborov.
- `package.json` – Zoznam knižníc a konfiguračných skriptov.
- `vite.config.ts` – Konfigurácia rýchleho zostavovača Vite.
# Google Analytics 4 a Microsoft Clarity

Projekt obsahuje voliteľné integrácie oboch služieb. V ukážke zostávajú vypnuté, kým nenastavíte platné ID projektu a návštevník neudelí súhlas s analytikou.

1. Skopírujte `.env.example` do `.env.local` v koreňovom priečinku projektu.
2. Vložte Measurement ID GA4 (`G-...`) do `VITE_GA4_MEASUREMENT_ID`.
3. Vložte Clarity Project ID do `VITE_CLARITY_PROJECT_ID`.
4. Po zmene premenných prostredia reštartujte vývojový server Vite.
5. V paneli súhlasu povoľte analytiku. Stránka potom načíta iba nakonfigurované skripty poskytovateľov.

Do analytiky nevkladajte e-mailové adresy, mená, telefónne čísla, adresy ani voľné texty z vyhľadávania. Formulár newslettera a objednávka sú prototypy: údaje sa neposielajú do mailing listu ani platobnej služby. Ukážkové objednávky sa neposielajú ako udalosti GA4 `purchase`. KPI karty a historické hodnoty lievika sú vzorové dáta, nie živé reporty GA4. Kým nemáte ID služieb, polia nechajte prázdne; analytika ostane vypnutá.


