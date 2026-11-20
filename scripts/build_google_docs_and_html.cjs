const fs = require('fs');
const path = require('path');

console.log("Generating full HTML document & Google Docs integration module...");

// We will build clean semantic HTML that Google Docs natively understands and formats perfectly on paste
const titlePageHtml = `
<div style="text-align: center; margin-bottom: 50px; font-family: 'Times New Roman', serif;">
  <p style="font-size: 16pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase;">VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ</p>
  <p style="font-size: 14pt; font-weight: bold; margin: 0 0 40px 0; text-transform: uppercase;">FAKULTA PODNIKATELSKÁ</p>
  
  <div style="border: 2px dashed #94a3b8; background-color: #f8fafc; padding: 25px; margin: 30px auto; max-width: 500px; text-align: center;">
    <p style="font-size: 12pt; font-weight: bold; margin: 0; color: #1e293b;">[LOGO VUT / FP VUT]</p>
    <p style="font-size: 10pt; font-style: italic; margin: 5px 0 0 0; color: #64748b;">Oficiální grafický emblém Vysokého učení technického v Brně</p>
  </div>

  <p style="font-size: 12pt; font-style: italic; margin: 40px 0 30px 0;">ÚSTAV MANAGEMENTU A MARKETINGU</p>

  <h1 style="font-size: 18pt; font-weight: bold; margin: 20px 0; line-height: 1.4; text-transform: uppercase; color: #0f172a;">
    FP DROP – NÁVRH A PROPAGACE MOBILNÍ APLIKACE PRO STUDENTY FAKULTY PODNIKATELSKÉ VUT V BRNĚ
  </h1>
  <p style="font-size: 13pt; font-style: italic; margin: 10px 0 60px 0; color: #334155;">
    Semestrální projekt / Návrh digitálního produktu a marketingové strategie
  </p>

  <div style="text-align: left; margin: 60px auto 0 auto; max-width: 600px; font-size: 11pt; line-height: 1.8;">
    <p style="margin: 4px 0;"><strong>Autor projektu:</strong> [JMÉNO AUTORA]</p>
    <p style="margin: 4px 0;"><strong>Studijní program:</strong> [STUDIJNÍ PROGRAM] (Informační management / Podnikání)</p>
    <p style="margin: 4px 0;"><strong>Předmět:</strong> [NÁZEV PŘEDMĚTU] (Digitální marketing a mobilní technologie)</p>
    <p style="margin: 4px 0;"><strong>Vyučující / Vedoucí:</strong> [JMÉNO VYUČUJÍCÍHO]</p>
    <p style="margin: 4px 0;"><strong>Akademický rok:</strong> [AKADEMICKÝ ROK] (2025/2026)</p>
    <p style="margin: 4px 0;"><strong>Místo a datum:</strong> Brno, 2026</p>
  </div>
</div>
`;

const tableOfContentsHtml = `
<div style="page-break-before: always; margin-top: 40px; font-family: 'Times New Roman', serif;">
  <h2 style="font-size: 16pt; font-weight: bold; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 24px;">Obsah</h2>
  <ul style="list-style-type: none; padding-left: 0; line-height: 2; font-size: 11pt;">
    <li><strong>1. Úvod</strong> ..................................................................................................................................... 3</li>
    <li><strong>2. Základní specifikace aplikace a cílový segment</strong> ................................................................... 4
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>2.1 Vymezení produktu FP DROP a řešená problematika .................................................... 4</li>
        <li>2.2 Segmentace uživatelů a studentská komunita FP VUT ................................................ 5</li>
        <li>2.3 Uživatelská persona a motivační faktory ...................................................................... 6</li>
      </ul>
    </li>
    <li><strong>3. Prototyp mobilní aplikace</strong> .................................................................................................... 7
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>3.1 Technické řešení a systémová architektura ................................................................. 7</li>
        <li>3.2 Uživatelské rozhraní a ergonomie ovládání ................................................................. 8</li>
        <li>3.3 Funkční princip prototypu a transakční logika .............................................................. 9</li>
        <li>3.4 Možnosti dalšího rozvoje a produkční roadmapa ........................................................... 10</li>
      </ul>
    </li>
    <li><strong>4. Přístup k tvorbě business profilu</strong> ......................................................................................... 11
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>4.1 Koncepce webové prezentace a informační architektura ............................................... 11</li>
        <li>4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity ................................. 12</li>
      </ul>
    </li>
    <li><strong>5. Přístup k tvorbě obsahu pro sociální sítě</strong> ............................................................................ 13
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>5.1 Strategie působení na síti Instagram .............................................................................. 13</li>
        <li>5.2 Obsahové formáty, publikační harmonogram a tón komunikace .................................. 14</li>
        <li>5.3 Případová ukázka příspěvku a storyboard krátkého videa ............................................. 15</li>
      </ul>
    </li>
    <li><strong>6. Přístup k PPC reklamě</strong> ........................................................................................................... 16
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>6.1 Strategické cíle a detailní zacílení kampaně v Brně ..................................................... 16</li>
        <li>6.2 Modelový rozpočet a odhad výkonnostních ukazatelů .................................................... 17</li>
        <li>6.3 Metodika A/B testování a porovnání kreativních variant ............................................... 18</li>
      </ul>
    </li>
    <li><strong>7. Customer Journey / STDC framework</strong> ................................................................................... 19
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>7.1 Fáze zákaznické cesty v kontextu studentského segmentu ............................................ 19</li>
        <li>7.2 Matice STDC frameworku pro FP DROP ........................................................................... 20</li>
      </ul>
    </li>
    <li><strong>8. Vyhodnocování a měření</strong> ....................................................................................................... 21
      <ul style="list-style-type: none; padding-left: 20px; line-height: 1.8;">
        <li>8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace .................................................. 21</li>
        <li>8.2 Vyhodnocovací cyklus a optimalizační hypotézy ........................................................... 22</li>
      </ul>
    </li>
    <li><strong>9. Závěr</strong> ........................................................................................................................................ 23</li>
    <li><strong>10. Seznam použitých zdrojů</strong> ..................................................................................................... 24</li>
    <li><strong>11. Přílohy</strong> .................................................................................................................................... 25</li>
  </ul>
</div>
`;

function tableHtml(title, headers, rows) {
  let h = `<div style="margin: 25px 0; font-family: 'Times New Roman', serif;">`;
  h += `<p style="font-weight: bold; font-style: italic; margin-bottom: 8px; font-size: 11pt;">${title}</p>`;
  h += `<table style="width: 100%; border-collapse: collapse; font-size: 10pt; line-height: 1.4; border: 1px solid #334155;">`;
  h += `<thead><tr style="background-color: #0f172a; color: #ffffff;">`;
  headers.forEach(head => {
    h += `<th style="padding: 10px 12px; text-align: left; font-weight: bold; border: 1px solid #334155;">${head}</th>`;
  });
  h += `</tr></thead><tbody>`;
  rows.forEach((row, idx) => {
    const bg = idx % 2 === 1 ? '#f8fafc' : '#ffffff';
    h += `<tr style="background-color: ${bg};">`;
    row.forEach(cell => {
      h += `<td style="padding: 8px 12px; border: 1px solid #cbd5e1; vertical-align: top;">${cell.replace(/\n/g, '<br/>')}</td>`;
    });
    h += `</tr>`;
  });
  h += `</tbody></table></div>`;
  return h;
}

function placeholderBoxHtml(title, desc) {
  return `
  <div style="border: 2px dashed #94a3b8; background-color: #f8fafc; padding: 25px; margin: 25px 0; text-align: center; font-family: 'Times New Roman', serif;">
    <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin: 0 0 6px 0;">${title}</p>
    <p style="font-size: 9.5pt; font-style: italic; color: #64748b; margin: 0;">${desc}</p>
  </div>
  `;
}

const chapters = [
  {
    num: "1",
    id: "uvod",
    title: "1. Úvod",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">1. Úvod</h2>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Vysokoškolské prostředí prochází v posledních letech zásadní proměnou v oblasti komunikace mezi institucí a jejími studenty. Nastupující generace studentů, primárně reprezentovaná generací Z, vykazuje výrazně odlišné vzorce chování při konzumaci informací ve srovnání s předchozími ročníky. Tradiční formální kanály, jako jsou oficiální univerzitní webové nástěnky, hromadné e-mailové zprávy nebo nepřehledné informační systémy, se setkávají s klesající mírou pozornosti a nízkou mírou zapojení (engagementu). Studenti požadují bezprostřední, vizuálně atraktivní a především mobilně orientovaný obsah, který odpovídá jejich životnímu stylu a dynamice studentského života.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Mobilní aplikace v tomto kontextu nepředstavují pouze další distribuční kanál, nýbrž klíčový styčný bod celého digitálního ekosystému. Schopnost doručit personalizovanou notifikaci, nabídnout interaktivní katalog, umožnit rychlou objednávku na jedno kliknutí a poskytnout zázemí pro komunitní identifikaci je pro moderní vzdělávací a přidružené komerční aktivity zásadní. Právě na pomezí komunitního života, moderního vysokoškolského marketingu a e-commerce vzniká projekt FP DROP, který je primárně zacílen na studenty a přátele Fakulty podnikatelské Vysokého učení technického v Brně (FP VUT).
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Fakulta podnikatelská VUT, sídlící v moderním univerzitním kampusu Pod Palackého vrchem na adrese Kolejní 29, sdružuje více než 3 000 studentů v bakalářských, magisterských a doktorských programech zaměřených na ekonomiku, management, systémové inženýrství a informatiku. Přestože fakulta disponuje silným akademickým zázemím a aktivním akademickým spolkem, dosud postrádala moderní, ucelený digitální nástroj, který by integroval studentský lifestyle, autentický streetwearový merch, aktuální časové kapacity semestru (deadliny, zápočty, zkoušková období) a přímou mobilní interakci. Výrobky s univerzitní tématikou byly často distribuovány nárazově, fyzicky či přes zastaralá webová rozhraní postrádající emocionální náboj a studentskou nadsázku.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Hlavním cílem tohoto semestrálního projektu je komplexní návrh, prototypový vývoj a marketingová strategie mobilní aplikace FP DROP. Projekt pokrývá celý životní cyklus digitálního produktu od analýzy cílové skupiny přes funkční prototypování v jazyce Python ve vývojovém prostředí Visual Studio Code až po návrh akviziční PPC kampaně, obsahového marketingu a frameworku zákaznické cesty (STDC). Výsledkem předkládané práce je funkční softwarový artefakt doprovázený rigorózní marketingovou a analytickou studií, připravenou k praktickému nasazení na půdě Fakulty podnikatelské VUT v Brně.
</p>
`
  },
  {
    num: "2",
    id: "specifikace",
    title: "2. Základní specifikace aplikace a cílový segment",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">2. Základní specifikace aplikace a cílový segment</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">2.1 Vymezení produktu FP DROP a řešená problematika</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
FP DROP je koncipován jako specializovaná mobilní komunitní a e-commerce platforma určená pro studenty, vyučující a absolventy Fakulty podnikatelské VUT. Jádrem konceptu je princip tzv. limitovaných edicí neboli „dropů“. Místo celoročního nabízení statického, generického merche pracuje platforma s časově ohraničenými kolekcemi, které reagují na biorytmus akademického roku na Kolejní 29. Jednotlivé dropy (např. DROP 001 – First Semester, DROP 002 – Exam Season, DROP 003 – FP After Dark a DROP 004 – Brno Brutalism) odrážejí aktuální prožívání studentů – od euforie a seznamování v září přes kofeinem sycené deadliny v lednu až po jarní studentské večírky.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Projekt reaguje na tři hlavní problémy současného stavu. Prvním problémem je roztříštěnost komunikace: informace o studentských aktivitách a komunitních předmětech jsou rozptýleny mezi neoficiální skupiny na sociálních sítích, univerzitní e-maily a fyzické nástěnky. Druhým problémem je nízká atraktivita a zastaralost dosavadního merchandisingu, který nerespektuje soudobé streetwearové trendy (oversized boxy střihy, těžká gramáž 240–420 GSM, čistá brutalistická typografie). Třetím problémem je absence přímého distribučního kanálu s nulovým poštovným, který by využíval přirozenou koncentraci studentů v areálu kampusu Pod Palackého vrchem.
</p>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">2.2 Segmentace uživatelů a studentská komunita FP VUT</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Pro potřeby návrhu mobilní aplikace a navazující marketingové strategie byla provedena podrobná segmentace uživatelské báze. Z hlediska demografických a behaviorálních charakteristik dělíme uživatele do tří segmentů:
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
<strong>1. Primární segment – Aktivní studenti prezenčního studia FP VUT (cca 2 200 osob):</strong> Studenti ve věku 19 až 25 let, kteří denně navštěvují přednášky a semináře v budovách P2, P3 a P4 na Kolejní 29 nebo bydlí na přilehlých vysokoškolských kolejích Pod Palackého vrchem. Tento segment vykazuje intenzivní využívání chytrých telefonů (průměrný screen time přesahuje 5,5 hodiny denně), preferuje rychlé nákupy přes Apple Pay / Google Pay, citlivě vnímá slevové akce navázané na průkaz ISIC a aktivně buduje svou sociální identitu v rámci ročníku.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
<strong>2. Sekundární segment – Kombinovaní studenti a čerství absolventi (cca 1 000 osob):</strong> Studenti kombinované formy studia a absolventi v horizontu 1 až 3 let po ukončení studia. Na fakultu docházejí nárazově (páteční a sobotní bloky), mají vlastní finanční příjem a nákup vnímají především jako nostalgické gesto, vyjádření sounáležitosti s alma mater nebo součást profesního networkingu.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
<strong>3. Terciární segment – Uchazeči o studium a středoškoláci (cca 3 500 osob ročně):</strong> Návštěvníci Dnů otevřených dveří, veletrhu Gaudeamus Brno a sledující sociálních sítí. V aplikaci hledají autentický pohled do zákulisí fakulty a neformální studentskou kulturu, která často rozhoduje o volbě vysoké školy.
</p>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">2.3 Uživatelská persona a motivační faktory</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Na základě hloubkového porozumění primárnímu segmentu byla vytvořena detailní uživatelská persona, která sloužila jako referenční bod při definování funkčních požadavků na prototyp mobilní aplikace a tón marketingové komunikace.
</p>
${tableHtml(
  "Tabulka 1: Uživatelská persona studenta Fakulty podnikatelské VUT v Brně",
  ["Parametr", "Charakteristika persony"],
  [
    ["Jméno a věk", "Bc. Martin Dvořák, 22 let"],
    ["Role a ročník", "Student 1. ročníku navazujícího magisterského studia, obor Informační management, FP VUT"],
    ["Bydliště a lokalita", "Fiktivní studentská lokalita v Brně"],
    ["Technologické vybavení", "iPhone 15 Pro, MacBook Air M2, Apple Watch. 100% mobilní komunikace."],
    ["Používané platformy", "Instagram (Reels), TikTok, WhatsApp, Discord, Spotify, IS VUT."],
    ["Cíle a motivace", "Úspěšně absolvovat semestr, vybudovat síť kontaktů, vypadat dobře na kampusu i večer v centru Brna, nosit kvalitní oblečení reprezentující jeho fakultu s nadsázkou."],
    ["Frustrace a překážky", "Nepřehledný informační systém, neosobní a formální komunikace fakulty, nudný a nekvalitní promo merch z tenkého textilu, nutnost platit poštovné za věci, které by mohl vyzvednout na vrátnici."],
    ["Vztah k FP DROP", "Aplikaci stahuje kvůli okamžitému přístupu k limitovanému dropu triček 'HOT GIRLS GO TO FP', možnosti využít 10% slevu na ISIC a osobnímu odběru zdarma na Kolejní 29."]
  ]
)}
`
  },
  {
    num: "3",
    id: "prototyp",
    title: "3. Prototyp mobilní aplikace",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">3. Prototyp mobilní aplikace</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">3.1 Technické řešení a systémová architektura</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Prototyp mobilní aplikace FP DROP byl kompletně navržen a implementován v programovacím jazyce Python (verze 3.10+) v integrovaném vývojovém prostředí Visual Studio Code (VS Code). Volba Pythonu pro vývoj prototypu byla motivována vysokou rychlostí iterace, transparentní čitelností kódu a možností nabídnout studentům a hodnotitelům více režimů běhu bez nutnosti složitého instalování těžkopádných nativních mobilních SDK (jako Android Studio nebo Xcode).
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Zdrojový kód aplikace je strukturován do samostatného modulu <code>python_mobile_app/</code>, který obsahuje následující klíčové komponenty:
</p>
<ul style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>main.py:</strong> Vstupní bod a koordinátor aplikace. Obsahuje CLI rozhraní (knihovna argparse), které zpracovává spouštěcí argumenty --web, --flet a volitelný parametr --port. Implementuje inteligentní fallback logiku: pokud uživatel zvolí spuštění nativního GUI přes framework Flet (--flet), avšak knihovna není v systému nainstalována, aplikace nevypíše fatální chybu, ale automaticky přepne na bezbariérový Web Mobile Simulator.</li>
  <li><strong>app_web.py:</strong> Nativní emulátor mobilního zařízení iPhone 16 Pro běžící na vestavěném HTTP serveru Pythonu (http.server a socketserver). Tato komponenta má naprosto nulové externí závislosti (Zero External Dependencies) a funguje na jakékoliv čisté instalaci Pythonu. Server dynamicky serializuje datové modely do JSONu, injektuje je do responzivní mobilní šablony využívající Tailwind CSS a zajišťuje běh na lokálním portu 5050. Součástí je automatické otevření prohlížeče (webbrowser.open).</li>
  <li><strong>app_flet.py:</strong> Alternativní nativní implementace využívající moderní framework Flet (postavený na Flutter pro Python). Tento režim umožňuje kompilaci do nativního okna s podporou hardwarové akcelerace, nativních gest a přepínání Dark Mode.</li>
  <li><strong>data.py:</strong> Centralizovaný datový model obsahující strukturované katalogy produktů (PRODUCTS), harmonogram a popisy edicí (DROPS), studentský profil (STUDENT_PROFILE) včetně věrnostního programu a provázání na akademický trigger systém.</li>
  <li><strong>.vscode/launch.json a run_app.bat:</strong> Konfigurační soubory pro komfortní spuštění. Pro VS Code je připraven debug profil pro spuštění stiskem klávesy F5. Pro Windows je vytvořen dávkový skript run_app.bat, který automaticky detekuje systémové příkazy py, python a python3 a eliminuje potíže s přesměrováním na Microsoft Store.</li>
</ul>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">3.2 Uživatelské rozhraní a ergonomie ovládání</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Uživatelské rozhraní prototypu striktně respektuje ergonomické standardy moderních operačních systémů iOS a Android. Vizuální jazyk byl navržen v souladu s brutalistickou estetikou streetwearové značky FP DROP: hluboké černé pozadí (Jet Black #050505), vysoce kontrastní bílé typografické prvky (fonty Space Grotesk a JetBrains Mono), doplňková akcentní smaragdová barva (#10B981) indikující skladovou dostupnost a subtilní mikrointerakce.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Pohyb v aplikaci je zprostředkován spodní navigační lištou (Bottom Navigation Bar) s pěti primárními záložkami:
</p>
<ol style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>HOME:</strong> Dynamický hero banner probíhajícího dropu (DROP 001 – FIRST SEMESTER) s indikátorem 'SKLADEM V BRNĚ', rychlý widget se studentským slevovým kódem FPVUT10 (10% sleva) a mřížka nejpopulárnějších produktů.</li>
  <li><strong>SHOP:</strong> Dvousloupcový mobilní grid s rychlými kategoriálními filtry (ALL, T-SHIRTS, HOODIES, ACCESSORIES) s cenami v Kč a přímým vložením do košíku.</li>
  <li><strong>DROPS:</strong> Vertikální časová osa prezentující ediční plán pro celý akademický rok (Drop 001 až 004) se statusy LIVE a COMING SOON.</li>
  <li><strong>WISHLIST:</strong> Interaktivní správa uložených kousků před spuštěním dropu klepnutím na srdíčko.</li>
  <li><strong>PROFILE:</strong> Personalizovaná obrazovka identity studenta (Demo Student, sample ISIC: DEMO-ISIC-0000), úroveň VIP SENIOR, získané ECTS kredity (142 ECTS) a historie objednávek s možností sledování stavu doručení na Kolejní 29.</li>
</ol>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">3.3 Funkční princip prototypu a transakční logika</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Prototyp disponuje plně interaktivní stavovou logikou na klientské straně simulátoru. Uživatel může otevřít detail libovolného produktu s fotogalerií s čistou bílou typografií bez rušivých stínů, podrobnou materiálovou specifikací (100% bio bavlna 240 g/m² nebo 420 GSM fleece u mikin), přesným počtem zbývajících kusů v Brně a voličem velikostí (XS až XXL).
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Nákupní košík dynamicky kalkuluje položky, aplikuje studentskou ISIC slevu 10 % a nastavuje dopravu s osobním odběrem na Kolejní 29 zdarma (0 Kč). Objednávka se dokončuje akcí '1-Click Zaplatit', která provede simulaci transakce, vyprázdní košík, zobrazí potvrzení a přesměruje uživatele do historie objednávek v profilu.
</p>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">3.4 Možnosti dalšího rozvoje a produkční roadmapa</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Současná podoba prototypu představuje plnohodnotný 'proof-of-concept'. Pro přechod do produkčního provozu je navržena tato roadmapa:
</p>
<ul style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>Backendová infrastruktura:</strong> Přechod na REST API / GraphQL backend postavený na frameworku FastAPI (Python) nebo Node.js s relační databází PostgreSQL a cachovací vrstvou Redis.</li>
  <li><strong>Autentizace přes IS VUT:</strong> Implementace protokolu OAuth 2.0 / Shibboleth pro přihlašování přes oficiální VUT login, což zajistí 100% spolehlivé ověření statusu studenta a nároku na slevu.</li>
  <li><strong>Push notifikace (FCM):</strong> Nasazení Firebase Cloud Messaging pro okamžité informování o uvolnění nového dropu do prodeje (Drop Alarm), blížícím se vyprodání velikostí a oznámení o připravenosti balíčku k vyzvednutí na recepci Kolejní 29.</li>
  <li><strong>Platební brána:</strong> Napojení certifikované platební brány (Stripe / Comgate / Apple Pay / Google Pay) splňující standard PCI-DSS.</li>
</ul>
`
  },
  {
    num: "4",
    id: "business-profil",
    title: "4. Přístup k tvorbě business profilu",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">4. Přístup k tvorbě business profilu</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">4.1 Koncepce webové prezentace a informační architektura</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Mobilní aplikace FP DROP je podpořena reprezentativním webovým business profilem (landing page), který slouží jako konverzní brána pro desktopové uživatele, vyhledávače a marketingové kampaně. Webová prezentace plní funkci oficiálního uzlu, buduje důvěryhodnost značky a stimuluje stažení mobilní aplikace.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Informační architektura jednostránkové webové prezentace (SPA) zahrnuje:
</p>
<ol style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>Hero sekce:</strong> Dominantní claim 'YOUR UNIVERSITY. YOUR UNIFORM.', velkoformátová fotografie z kampusu, odpočet do konce aktuálního dropu a tlačítka 'Stáhnout mobilní aplikaci' a 'Prozkoumat kolekci'.</li>
  <li><strong>O projektu a filozofie:</strong> Studentský streetwear pro FP VUT, udržitelná produkce (100% bio bavlna, lokální sítotisk v Brně, etická výroba) a hrdost na fakultu sídlící na Kolejní 29.</li>
  <li><strong>Přehled funkcí aplikace:</strong> Přednostní přístup k dropům o 24 hodin dříve, automatická ISIC sleva 10 %, sledování stavu přípravy objednávky a push notifikace.</li>
  <li><strong>Lookbook & Aktuální Drop:</strong> Vizuální galerie modelů přímo z areálu kampusu Pod Palackého vrchem a Technologického parku.</li>
  <li><strong>Studentská zóna & FAQ:</strong> Odpovědi na dotazy ohledně velikostí, osobního odběru na fakultě, výměny zboží a ISIC slev.</li>
  <li><strong>Zápatí s rychlými odkazy:</strong> Kontaktní údaje, propojení na sociální sítě (@fp_drop), akademická případová studie a spuštění simulátoru.</li>
</ol>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Integrace Google Analytics 4 (GA4) a Microsoft Clarity je připravena přes ID v souboru .env.local. Služby se načtou pouze po výslovném souhlasu návštěvníka. Bez platných ID zůstávají ukázkové KPI oddělené od živých dat a události se ukládají jen lokálně.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Po souhlasu a nakonfigurování GA4 se mohou odesílat události z reálných interakcí. Do analytiky se neposílají e-mailové adresy ani volné texty z vyhledávání. Prototypové objednávky nejsou událost purchase a newsletterový formulář není připojen k rozesílce.
</p>
<ul style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>page_view, select_item, view_item:</strong> Návštěva stránky a interakce s katalogem a detailem produktu.</li>
  <li><strong>add_to_cart, remove_from_cart, begin_checkout:</strong> Interakce s ukázkovým košíkem a checkoutem.</li>
  <li><strong>search, read_article, wishlist_toggle, apply_promo_code:</strong> Další interakce webového prototypu.</li>
  <li><strong>demo_order_completed:</strong> Pouze lokální událost; nesmí se vykazovat jako skutečný nákup.</li>
</ul>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Po souhlasu Microsoft Clarity doplní kvantitativní data o teplotní mapy a nahrávky relací. Obsah vstupních polí zůstává maskovaný; v EHP se předává Consent V2 signal. Bez souhlasu se Clarity nenačítá.
</p>
`
  },
  {
    num: "5",
    id: "socialni-site",
    title: "5. Přístup k tvorbě obsahu pro sociální sítě",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">5. Přístup k tvorbě obsahu pro sociální sítě</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">5.1 Strategie působení na síti Instagram</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Sociální sítě představují pro projekt FP DROP primární akviziční i retenční kanál. Jako hlavní platforma byl vybrán Instagram (doplněný o organický TikTok). Instagram v segmentu vysokoškoláků ve věku 19–25 let v ČR dosahuje přes 84% penetrace a slouží jako primární vizuální vyhledávač módních trendů a komunitního dění.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Strategie profilu @fp_drop je postavena na principu absolutní autenticity. Značka se vyhýbá sterilním fotobankovým snímkům. Využívá estetiku 'lo-fi' fotografie focené na analogové 35mm kinofilmy přímo v prostorách FP VUT (chodby, posluchárna P384, respirium, koleje Pod Palackého vrchem) a zapojuje skutečné studenty v rolích modelů a tvůrců obsahu.
</p>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">5.2 Obsahové formáty, publikační harmonogram a tón komunikace</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Obsahový plán kombinuje tři základní formáty sítě Instagram:
</p>
<ol style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>Instagram Reels (3× týdně):</strong> Formát s nejvyšším virálním dosahem. Studentský humor, parodie na zápočtový týden a zkouškové, dynamické představení nového merche a 'day in the life' střípky ze studia na FP VUT s trending audio stopami.</li>
  <li><strong>Instagram Stories (4–8 denně):</strong> Ankety, kvízy o fakultě, odpočty do spuštění dropu (Countdown Sticker), zákulisní pohledy z výroby textilu a reposty obsahu studentů (User Generated Content – UGC).</li>
  <li><strong>Karusely ve feedu (1–2× týdně):</strong> Lookbooky, tabulky velikostí, gramáž látek a příběhy stojící za slogany.</li>
</ol>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Tón komunikace (Tone of Voice) je sebevědomý, odlehčený, studentsky neformální, avšak nikdy vulgární. Pracuje s nadsázkou a interními fakultními reáliemi ('ECTS are temporary, drip is forever', 'Fronta na kafe v respiriu').
</p>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">5.3 Případová ukázka příspěvku a storyboard krátkého videa</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
<strong>Návrh feed příspěvku (Karusel – 3 snímky):</strong><br/>
• <strong>Vizuál:</strong> Snímek 1 – Dvojice studentů na schodech budovy P2 na Kolejní 29 v tričkách 'HOT GIRLS GO TO FP' a mikině 'EXAM SURVIVOR'. Snímek 2 – Makro detail vyšitého štítku a hutné 240g bavlny. Snímek 3 – Grafika mobilní aplikace se slevovým kódem.<br/>
• <strong>Text příspěvku:</strong> 'Semestr oficiálně začal. Starý sešity vyhozený, nový předměty zapsaný a tvůj šatník potřebuje upgrade. DROP 001 právě přistál v mobilní aplikaci FP DROP. 100% bio bavlna, oversized střih a nulový poštovný při vyzvednutí na Kolejní 29. Zadej kód FPVUT10 a ušetři 10 % s ISICem. Odkaz na stažení v biu.'<br/>
• <strong>Hashtagy:</strong> #FPVUT #VUTvBrne #FakultaPodnikatelska #Kolejni29 #BrnoStudents #FPDROP #StudentStreetwear
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
<strong>Storyboard krátkého videa (Instagram Reels / TikTok – 15 sekund):</strong><br/>
• <strong>0:00–0:03 (Hook):</strong> Student běžící po schodech na Kolejní 29 s kávou. Text na obrazovce: 'Když máš za 2 minuty přednášku z managementu, ale outfit musí být 10/10.'<br/>
• <strong>0:03–0:08 (Dynamický střih):</strong> Rychlé přechody studentů v prostorách fakulty ukazující detaily triček a mikin v pohybu.<br/>
• <strong>0:08–0:12 (Představení aplikace):</strong> Pohled na displej iPhonu – otevření aplikace FP DROP, přidání trička do košíku jedním klikem a volba 'Kolejní 29 – Osobní odběr zdarma'.<br/>
• <strong>0:12–0:15 (Call to Action):</strong> Závěrečný packshot s logem aplikace a výzvou: 'Stahuj aplikaci FP DROP. Limitovaná edice DROP 001 LIVE.'
</p>
`
  },
  {
    num: "6",
    id: "ppc",
    title: "6. Přístup k PPC reklamě",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">6. Přístup k PPC reklamě</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">6.1 Strategické cíle a detailní zacílení kampaně v Brně</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Placená výkonnostní reklama (PPC) plní roli akceleračního nástroje při spouštění nových dropů. Jelikož je rozpočet studentského projektu limitovaný, kampaň je hyper-lokálně zacílena na relevantní komunitu v Brně prostřednictvím Meta Ads (Instagram Stories a Reels).
</p>
<ul style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>Geografické zacílení:</strong> Brno a okolí do 15 km se zvýšenou vahou na lokalitu Královo Pole / Medlánky (radius 2 km kolem kampusu Kolejní 29).</li>
  <li><strong>Věk a jazyk:</strong> 18–26 let, čeština a slovenština (zohlednění početné slovenské komunity na VUT).</li>
  <li><strong>Zájmy a chování:</strong> Vysokoškolské vzdělávání, VUT v Brně, Fakulta podnikatelská VUT, streetwear, městská móda, vysokoškoláci.</li>
  <li><strong>Vyloučení:</strong> Uživatelé mimo věk 18–26 let a uživatelé trvale žijící mimo Jihomoravský kraj.</li>
</ul>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">6.2 Modelový rozpočet a odhad výkonnostních ukazatelů</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Pro úvodní 30denní akviziční vlnu byl navržen modelový rozpočet 15 000 Kč rozdělený do tří fází konverzního trychtýře:
</p>
${tableHtml(
  "Tabulka 2: Modelový rozpočet a odhad výkonnostních ukazatelů PPC kampaně (30 dní)",
  ["Fáze kampaně", "Podíl", "Rozpočet", "Zobrazení (Impr.)", "Odhad CPC", "Odhad CTR", "Cílové konverze"],
  [
    ["1. Awareness (Povědomí)", "35 %", "5 250 Kč", "175 000", "2,50 Kč", "1,2 %", "2 100 kliknutí na odkaz"],
    ["2. Traffic & Install (Návštěvy / Stažení)", "45 %", "6 750 Kč", "135 000", "3,80 Kč", "1,8 %", "1 776 prokliků / 530 instalací"],
    ["3. Retargeting (Košík / Nákup)", "20 %", "3 000 Kč", "30 000", "6,50 Kč", "3,2 %", "460 prokliků / 95 objednávek"],
    ["CELKEM MODELOVÁ KAMPAŇ", "100 %", "15 000 Kč", "340 000", "3,65 Kč (průměr)", "1,85 % (průměr)", "4 336 návštěv / 625 aktivací"]
  ]
)}

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">6.3 Metodika A/B testování a porovnání kreativních variant</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Během prvních 10 dnů je rozpočet fáze Traffic rozdělen rovnoměrně (50:50) mezi dvě odlišné kreativní varianty za účelem zjištění nižší ceny za instalaci aplikace (Cost per Install – CPI).
</p>
${tableHtml(
  "Tabulka 3: Porovnání kreativních variant pro A/B testování v systému Meta Ads",
  ["Parametr testu", "Varianta A (Komunitní / Emocionální motiv)", "Varianta B (Produktový / Racionální motiv)"],
  [
    ["Hlavní headline", "'HOT GIRLS GO TO FP – A ty studuješ kde?'", "'OFICIÁLNÍ MERCH FP VUT – Kvalita, co vydrží zkouškový.'"],
    ["Vizuální formát", "Momentka ze schodů fakulty P2, studentky v oversized tričkách, analogový filtr, autentická atmosféra.", "Čisté produktové studio na černém pozadí, makro detail 420g bavlny a pevný límec."],
    ["Hlavní sdělení", "Příslušnost k nejlepší fakultě, nadsázka, studentská komunita a lifestyle.", "Prvotřídní bio bavlna, dlouhá životnost, 10% ISIC sleva a odběr na vrátnici zdarma."],
    ["Call to Action", "'STÁHNOUT APLIKACI'", "'ZÍSKAT 10% SLEVU'"],
    ["Cílové KPI", "Míra prokliku (CTR) a počet stažení aplikace.", "Konverzní poměr objednávek a hodnota košíku (AOV)."],
    ["Hypotéza testu", "Varianta A dosáhne vyššího CTR (> 2,2 %) a nižšího CPI díky silné sociální rezonanci sloganu.", "Varianta B dosáhne vyššího nákupního konverzního poměru (> 4,5 %) u zájemců o teplé mikiny."]
  ]
)}
`
  },
  {
    num: "7",
    id: "customer-journey",
    title: "7. Customer Journey / STDC framework",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">7. Customer Journey / STDC framework</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">7.1 Fáze zákaznické cesty v kontextu studentského segmentu</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Pro zmapování interakce studenta s ekosystémem byl aplikován framework STDC (See – Think – Do – Care) podle Avinashe Kaushika, který strukturuje marketingové aktivity podle nákupního a myšlenkového rozpoložení uživatele:
</p>
<ul style="font-size: 12pt; line-height: 1.6; margin-bottom: 14px;">
  <li><strong>1. Fáze SEE (Povědomí):</strong> Široké publikum studentů FP VUT. Uživatel nehledá nové oblečení, vnímá podněty na kampusu, vidí spolužáky v tričkách nebo narazí na Reels video.</li>
  <li><strong>2. Fáze THINK (Zvažování):</strong> Student značku zaregistroval, líbí se mu design, zkoumá tabulku velikostí, ověřuje kvalitu materiálu a zjišťuje slevu.</li>
  <li><strong>3. Fáze DO (Konverze):</strong> Okamžik rozhodnutí. Student otevře mobilní webový prototyp, vloží kousek do košíku a projde ukázkovým checkoutem; skutečná platba ani odběr zatím nejsou připojené.</li>
<li><strong>4. Fáze CARE (Péče a loajalita):</strong> Zákazník převezme objednávku, nosí merch, sdílí fotografie a může dostávat upozornění na další drop po připojení produkčního systému.</li>
</ul>

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">7.2 Matice STDC frameworku pro FP DROP</h3>
${tableHtml(
  "Tabulka 4: Strategická matice STDC frameworku pro aplikaci FP DROP",
  ["Fáze STDC", "Cíl a potřeba uživatele", "Marketingový kanál", "Typ obsahu", "Call to Action", "Klíčové KPI", "Způsob měření"],
  [
    ["SEE (Povědomí)", "Pobavit se, zjistit, co se děje na fakultě.", "Instagram Reels, TikTok, plakáty v respiriu na Kolejní 29.", "Virální studentská videa, momentky z kampusu bez prodejního tlaku.", "'Sleduj @fp_drop'", "Impressions, unikátní dosah, video views.", "Meta Insights, TikTok Analytics."],
    ["THINK (Zvažování)", "Ověřit velikost a materiál, porovnat cenu s konkurencí.", "Web landing page, Stories, mobilní simulátor, recenze.", "Specifikace 240g bavlny a 420g mikin, tabulka velikostí, unboxing.", "'Prozkoumat kolekci' / 'Vyzkoušet appku'", "CTR, čas na webu, počet zkopírování slevového kódu.", "GA4 (relace > 1 min), Microsoft Clarity."],
    ["DO (Konverze)", "Rychle objednat kousek s vyzvednutím na fakultě zdarma.", "Mobilní webový prototyp FP DROP, retargetingové reklamy a navržené drop notifikace.", "Ukázka dostupnosti a zjednodušený ukázkový checkout.", "'Prohlédnout produkt' / 'Pokračovat k ukázkovému checkoutu'", "Dokončení ukázkového checkoutu a hodnota objednávky (AOV) v produkčním měření.", "Lokální demo události; GA4 e-commerce až po připojení backendu a platby."],
    ["CARE (Loajalita)", "Získat status VIP studenta, vědět o dalším dropu.", "Navržené e-mailové či push notifikace po produkčním nasazení a Stories UGC.", "Výzva ke sdílení fotky s #FPDROP a přednostní přístup k DROP 002.", "'Sdílej svůj fit' / 'Nastavit upozornění'", "Opakovaný nákup, UGC zmínky a retence po nasazení backendu.", "Produkční analytika až po připojení služeb; Instagram Insights."]
  ]
)}
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">7.3 Detailní zákaznická cesta FP DROP</h3>
<p style="font-size: 11pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">Mapa odlišuje dnešní prototyp od produkčních procesů. Checkout je ukázkový, bez skutečné platby, skladového systému, dopravce a rozesílky e-mailů. Událost demo_order_completed zůstává v lokálním inspectoru; GA4 purchase lze odeslat až po potvrzení skutečné platby. E-mailové adresy ani obsah vyhledávání se do analytiky neposílají.</p>
${tableHtml(
  "Tabulka 5: Zákaznická cesta od prvního kontaktu po doporučení",
  ["Fáze / STDC", "Spouštěč, potřeba a bariéra", "Dotykové body a reakce", "Události a KPI"],
  [
    ["1. Objevení / SEE", "Reel, doporučení spolužáka nebo kampaň na fakultě; student chce pochopit odlišnost od běžného merche.", "Instagram, doporučení, QR kód a mobilní vstupní stránka bez povinné registrace.", "page_view, view_promotion; dosah, CTR, UTM návštěvy a podíl mobilních návštěv."],
    ["2. Zvažování / THINK", "Porovnává cenu, materiál, střih, velikost a důvěryhodnost značky.", "Katalog, detail produktu, lookbook, magazín a tabulka velikostí; uvést cenu, gramáž i dostupnost.", "view_item_list, view_item, search, read_article; přechod na detail, kliknutí na rozměry a uložení do oblíbených."],
    ["3. Nákup / DO", "Vybral produkt a velikost; chce znát konečnou cenu a způsob převzetí.", "Košík a přehledná ukázka objednávky, doprava zdarma a osobní odběr.", "add_to_cart, begin_checkout; dokončení a opuštění checkoutu. purchase až po skutečné platbě."],
    ["4. Převzetí / CARE", "Čeká na zásilku nebo výdej a chce znát stav objednávky.", "Prototyp zobrazí potvrzení; v produkci připojit backend, potvrzovací e-mail a sledování zásilky.", "demo_order_completed pouze lokálně; převzetí a čas doručení až po napojení backendu."],
    ["5. Návrat a doporučení / CARE", "Zákazník vidí další drop nebo chce sdílet outfit.", "UGC, oblíbené produkty a v produkci newsletter po registraci se souhlasem.", "Odeslání ukázkového formuláře zůstává lokální; po napojení měřit návraty, opakované nákupy a UGC."]
  ]
)}

`
  },
  {
    num: "8",
    id: "mereni-a-analytika",
    title: "8. Vyhodnocování a měření",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">8. Vyhodnocování a měření</h2>
<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Efektivní řízení digitálního projektu vyžaduje ucelený systém metrik rozdělený do čtyř vzájemně propojených oblastí:
</p>
${tableHtml(
  "Tabulka 5: Přehled metrik a měřicích nástrojů digitálního ekosystému FP DROP",
  ["Oblast ekosystému", "Klíčové sledované metriky", "Nástroj měření", "Frekvence", "Cílová referenční hodnota"],
  [
    ["1. Webová prezentace (Landing Page)", "Unikátní návštěvníci (Users), Engagement Rate, konverze stažení aplikace, hloubka scrollu.", "GA4 / Microsoft Clarity po konfiguraci ID a souhlasu návštěvníka", "Týdně", "> 5 000 návštěv/měsíc, Engagement Rate > 65 %, Download CR > 12 %"],
    ["2. Sociální sítě (Instagram / TikTok)", "Organický zásah (Reach), míra zapojení (ER per post), zhlédnutí Reels, kliky na odkaz v biu.", "Meta Business Suite, Instagram Native Insights", "Denně / Týdně", "Měsíční dosah > 15 000 účtů, ER > 5,8 %, Reels views > 3 000/video"],
    ["3. Placená PPC reklama (Meta Ads)", "Cena za tisíc zobrazení (CPM), cena za proklik (CPC), míra prokliku (CTR), cena za instalaci (CPI), ROAS.", "Meta Ads Manager", "Průběžně (real-time)", "CTR > 1,8 %, průměrné CPC < 4,00 Kč, CPI < 14,00 Kč, ROAS > 3,8x"],
    ["4. Mobilní aplikace (Prototyp / Produkce)", "Aktivní uživatelé (DAU / MAU), míra udržení (Retention D1, D7, D30), konverzní poměr košíku.", "Aplikační logy, Firebase Analytics / Mixpanel", "Měsíčně", "MAU > 1 200 studentů, D30 Retention > 35 %, Checkout CR > 8,5 %"]
  ]
)}

<h3 style="font-size: 14pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #1e293b;">8.2 Vyhodnocovací cyklus a optimalizační hypotézy</h3>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Naměřená data slouží jako podklad pro dvoutýdenní optimalizační cyklus (Build-Measure-Learn smyčka podle metodiky Lean Startup). Příklad z praxe: Microsoft Clarity odhalí, že mobilní návštěvníci opakovaně klikají na statický obrázek mikiny v domnění, že jde o galerii barev (dead click). Tým formuluje hypotézu: přeměna obrázku na swipe karusel zvýší čas na stránce o 15 % a zvedne prokliky do aplikace o 3 procentní body. Následně se nasadí A/B test a provede verifikace.
</p>
`
  },
  {
    num: "9",
    id: "zaver",
    title: "9. Závěr",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">9. Závěr</h2>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Předložený semestrální projekt prokázal proveditelnost, technologickou životaschopnost a marketingový potenciál komunitního digitálního produktu FP DROP určeného pro studenty Fakulty podnikatelské VUT v Brně. V souladu se zadáním byl vyvinut funkční prototyp mobilní aplikace v programovacím jazyce Python, který byl provázán s detailní specifikací uživatelských segmentů, architekturou webového business profilu a robustní marketingovou strategií pokrývající sociální sítě, PPC reklamu a model zákaznické cesty STDC.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Hlavní přínos projektu spočívá v překonání tradičního formálního pojetí univerzitního merchandisingu. Namísto pasivního prodeje generických upomínkových předmětů staví FP DROP na autentické identitě studentů, respektuje jejich každodenní potřeby na kampusu Kolejní 29 a nabízí prvotřídní textilní zpracování doplněné o moderní mobilní nákupní zkušenost. Technické řešení prototypu, umožňující okamžité spuštění jak ve formě zero-dependency webového simulátoru, tak ve formě nativního Flet rozhraní, poskytuje vynikající základ pro budoucí produkční vývoj.
</p>
<p style="font-size: 12pt; line-height: 1.5; text-align: justify; margin-bottom: 14px;">
Mezi limity současného řešení patří především lokální charakter běhu prototypu bez perzistentního cloudového backendu a absence přímé integrace na oficiální rozhraní Informačního systému VUT. Tyto limity však byly v práci detailně analyzovány a byla navržena jasná roadmapa pro jejich odstranění v navazující fázi projektu. Projekt FP DROP představuje komplexní, akademicky i prakticky podložený koncept, který má reálný potenciál posílit prestiž a komunitní soudržnost Fakulty podnikatelské Vysokého učení technického v Brně.
</p>
`
  },
  {
    num: "10",
    id: "zdroje",
    title: "10. Seznam použitých zdrojů",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">10. Seznam použitých zdrojů</h2>
<ol style="font-size: 11pt; line-height: 1.8; margin-bottom: 14px;">
  <li>CHAFFEY, Dave a Fiona ELLIS-CHADWICK. Digital Marketing: Strategy, Implementation and Practice. 7th ed. Harlow: Pearson, 2019. ISBN 978-1-292-22341-4.</li>
  <li>KAUSHIK, Avinash. See-Think-Do-Care: A Winning Consumer-Oriented Marketing Framework. Occam's Razor by Avinash Kaushik [online]. 2015 [cit. 2026-10-05]. Dostupné z: https://www.kaushik.net/avinash/see-think-do-care-win-content-marketing-framework/</li>
  <li>KOTLER, Philip, Kevin Lane KELLER a Alexander CHERNEV. Marketing Management. 16th ed. Harlow: Pearson, 2021. ISBN 978-0-137-34415-4.</li>
  <li>KRUG, Steve. Nenuťte uživatele přemýšlet!: Korigovaný přístup k použitelnosti webu a mobilních aplikací. 3. vyd. Brno: BizBooks, 2014. ISBN 978-80-265-0242-5.</li>
  <li>NORMAN, Donald A. The Design of Everyday Things: Revised and Expanded Edition. New York: Basic Books, 2013. ISBN 978-0-465-05065-9.</li>
  <li>RIES, Eric. The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses. New York: Crown Business, 2011. ISBN 978-0-307-88789-4.</li>
  <li>VUT V BRNĚ. Fakulta podnikatelská: Oficiální webové stránky a strategické dokumenty [online]. Brno: VUT, 2026 [cit. 2026-10-05]. Dostupné z: https://www.fbm.vutbr.cz/</li>
  <li>VUT V BRNĚ. Jednotný vizuální styl Vysokého učení technického v Brně: Grafický manuál [online]. Brno: VUT, 2024 [cit. 2026-10-05]. Dostupné z: https://www.vut.cz/vut/symboly</li>
  <li>ČSN ISO 690:2022. Informace a dokumentace – Pravidla pro bibliografické odkazy a citace informačních zdrojů. Praha: Česká agentura pro standardizaci, 2022.</li>
  <li>PYTHON SOFTWARE FOUNDATION. Python 3.12 Documentation: The Python Standard Library [online]. Wilmington: PSF, 2025 [cit. 2026-10-05]. Dostupné z: https://docs.python.org/3.12/</li>
  <li>FLET PROJECT. Flet: Build Flutter apps in Python [online]. 2026 [cit. 2026-10-05]. Dostupné z: https://flet.dev/docs/</li>
</ol>
`
  },
  {
    num: "11",
    id: "prilohy",
    title: "11. Přílohy",
    contentHtml: `
<h2 style="font-size: 16pt; font-weight: bold; margin-top: 35px; margin-bottom: 15px; color: #0f172a;">11. Přílohy</h2>
<p style="font-size: 11pt; font-style: italic; line-height: 1.5; margin-bottom: 20px; color: #475569;">
Přílohová část obsahuje předpřipravené rámečky s popisky pro snadné vložení reálných snímků obrazovky (screenshotů), diagramů architektury a grafických materiálů přímo v aplikaci Microsoft Word nebo Google Docs.
</p>
${placeholderBoxHtml(
  "[PŘÍLOHA 1 – SCREENSHOT HLAVNÍ OBRAZOVKY MOBILNÍHO SIMULÁTORU]",
  "Náhled úvodní obrazovky HOME v emulátoru iPhone 16 Pro s hero bannerem DROP 001 a slevovým widgetem FPVUT10"
)}
${placeholderBoxHtml(
  "[PŘÍLOHA 2 – SCREENSHOT KATALOGU PRODUKTŮ A FILTROVÁNÍ]",
  "Dvousloupcový responzivní katalog se zobrazením produktů 'HOT GIRLS GO TO FP', 'NO SLEEP' a filtrací kategorií"
)}
${placeholderBoxHtml(
  "[PŘÍLOHA 3 – SCREENSHOT PROSTŘEDÍ VS CODE A SPUŠTĚNÍ PROTOTYPU]",
  "Snímek integrovaného vývojového prostředí Visual Studio Code se strukturou souborů main.py, data.py a terminálovým výstupem"
)}
${placeholderBoxHtml(
  "[PŘÍLOHA 4 – DIAGRAM SYSTÉMOVÉ ARCHITEKTURY EKOSYSTÉMU FP DROP]",
  "Schéma propojení webové landing page, mobilního simulátoru, analytických nástrojů GA4/Clarity a Meta Ads"
)}
${placeholderBoxHtml(
  "[PŘÍLOHA 5 – NÁVRHY REKLAMNÍCH FORMÁTŮ META ADS PRO A/B TESTOVÁNÍ]",
  "Grafické vizuály varianty A (komunitní motiv na kampusu Kolejní 29) a varianty B (produktový detail s ISIC slevou)"
)}
`
  }
];

// Full clean HTML for clipboard copy into Google Docs:
const fullBodyHtml = titlePageHtml + tableOfContentsHtml + chapters.map(c => c.contentHtml).join('\n<hr style="border:0;border-top:1px solid #e2e8f0;margin:30px 0;"/>\n');

// Standalone web page with toolbar:
const standaloneHtmlPage = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FP DROP — Školní projekt (FP VUT v Brně)</title>
  <style>
    body {
      background-color: #f1f5f9;
      color: #0f172a;
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
      padding: 0;
    }
    .toolbar {
      position: sticky;
      top: 0;
      background: #0f172a;
      color: white;
      padding: 12px 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .toolbar-title {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .toolbar-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .btn {
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #10b981;
      color: #000;
    }
    .btn-primary:hover {
      background: #34d399;
    }
    .btn-secondary {
      background: #334155;
      color: white;
    }
    .btn-secondary:hover {
      background: #475569;
    }
    .btn-accent {
      background: #3b82f6;
      color: white;
    }
    .btn-accent:hover {
      background: #60a5fa;
    }
    .paper {
      max-width: 900px;
      margin: 30px auto;
      background: white;
      padding: 60px 80px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border-radius: 4px;
      box-sizing: border-box;
    }
    @media (max-width: 768px) {
      .paper {
        padding: 24px 20px;
        margin: 12px auto;
      }
    }
    @media print {
      .toolbar { display: none !important; }
      body { background: white; }
      .paper { box-shadow: none; padding: 0; margin: 0; max-width: 100%; }
    }
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #10b981;
      color: black;
      font-weight: bold;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      font-family: system-ui, sans-serif;
      display: none;
      z-index: 2000;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-title">
      🎓 FP VUT • Akademická dokumentace FP DROP
    </div>
    <div class="toolbar-actions">
      <button class="btn btn-secondary" onclick="window.print()">
        🖨️ Tlačiť / PDF
      </button>
    </div>
  </div>

  <main class="paper">
    ${fullBodyHtml}
  </main>

</body>
</html>
`;

// Generate TypeScript module for React App
const tsModuleContent = `// Auto-generated academic project content used by the on-page dossier
export interface AcademicChapter {
  num: string;
  id: string;
  title: string;
  contentHtml: string;
}

export const ACADEMIC_CHAPTERS: AcademicChapter[] = ${JSON.stringify(chapters, null, 2)};

export const FULL_PROJECT_HTML = ${JSON.stringify(fullBodyHtml)};
`;

const tsPath = path.join(__dirname, "../src/data/fullAcademicDocument.ts");
fs.writeFileSync(tsPath, tsModuleContent, 'utf-8');
console.log(`✅ Vygenerovaný TypeScript modul: ${tsPath}`);
