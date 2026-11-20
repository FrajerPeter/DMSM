const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  Footer,
  PageNumber,
  ShadingType
} = require('docx');

console.log("Generating 100% compliant, zero-error DOCX for Microsoft Word...");

// Helper: converts any text (even with \n and \n\n) into completely valid OpenXML Paragraphs without any \n in <w:t>
function p(text, options = {}) {
  const {
    bold = false,
    italic = false,
    align = AlignmentType.JUSTIFIED,
    spaceBefore = 0,
    spaceAfter = 140,
    lineSpacing = 360,
    heading = undefined,
    size = 24, // 12pt
    color = "000000",
    pageBreakBefore = false
  } = options;

  // Split multiple paragraphs
  const blocks = String(text).split('\n\n');
  if (blocks.length > 1) {
    const list = [];
    blocks.forEach((block, idx) => {
      const isFirst = idx === 0;
      list.push(...p(block.trim(), {
        ...options,
        pageBreakBefore: isFirst ? pageBreakBefore : false
      }));
    });
    return list;
  }

  // Handle single \n line breaks using TextRun break: 1 (which emits <w:br/>, NEVER \n in <w:t>)
  const lines = text.split('\n');
  const runs = [];
  lines.forEach((line, idx) => {
    runs.push(
      new TextRun({
        text: line,
        bold: bold,
        italics: italic,
        font: "Times New Roman",
        size: size,
        color: color,
        break: idx > 0 ? 1 : 0
      })
    );
  });

  return [
    new Paragraph({
      heading: heading,
      alignment: align,
      pageBreakBefore: pageBreakBefore,
      spacing: {
        before: spaceBefore,
        after: spaceAfter,
        line: lineSpacing
      },
      children: runs
    })
  ];
}

function h1(text, pageBreakBefore = false) {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      pageBreakBefore: pageBreakBefore,
      spacing: { before: 360, after: 140 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: text,
          bold: true,
          font: "Times New Roman",
          size: 32, // 16pt
          color: "0F172A"
        })
      ]
    })
  ];
}

function h2(text) {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({
          text: text,
          bold: true,
          font: "Times New Roman",
          size: 28, // 14pt
          color: "1E293B"
        })
      ]
    })
  ];
}

function placeholderBox(title, subtitle) {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 8, color: "94A3B8" },
        bottom: { style: BorderStyle.SINGLE, size: 8, color: "94A3B8" },
        left: { style: BorderStyle.SINGLE, size: 8, color: "94A3B8" },
        right: { style: BorderStyle.SINGLE, size: 8, color: "94A3B8" }
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: "F8FAFC", type: ShadingType.CLEAR, color: "auto" },
              margins: { top: 160, bottom: 160, left: 200, right: 200 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: title,
                      bold: true,
                      font: "Times New Roman",
                      size: 22,
                      color: "1E293B"
                    })
                  ]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 0 },
                  children: [
                    new TextRun({
                      text: subtitle,
                      italics: true,
                      font: "Times New Roman",
                      size: 18,
                      color: "64748B"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),
    new Paragraph({ spacing: { before: 0, after: 140 } })
  ];
}

function createTable(title, headers, rows, widthsPercent = null) {
  const elements = [
    new Paragraph({
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          font: "Times New Roman",
          size: 22,
          color: "0F172A"
        })
      ]
    })
  ];

  const colCount = headers.length;
  const colWidth = Math.floor(100 / colCount);

  const headerCells = headers.map((h, i) => {
    const w = widthsPercent ? widthsPercent[i] : colWidth;
    const lines = h.split('\n');
    const runs = lines.map((l, lIdx) => new TextRun({
      text: l,
      bold: true,
      font: "Times New Roman",
      size: 20,
      color: "FFFFFF",
      break: lIdx > 0 ? 1 : 0
    }));

    return new TableCell({
      width: { size: w, type: WidthType.PERCENTAGE },
      shading: { fill: "0F172A", type: ShadingType.CLEAR, color: "auto" },
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: [
        new Paragraph({
          spacing: { after: 0, line: 240 },
          children: runs
        })
      ]
    });
  });

  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: headerCells
    })
  ];

  rows.forEach((row, rIdx) => {
    const bg = rIdx % 2 === 1 ? "F8FAFC" : "FFFFFF";
    const cells = row.map((cellText, i) => {
      const w = widthsPercent ? widthsPercent[i] : colWidth;
      const lines = String(cellText).split('\n');
      const runs = lines.map((l, lIdx) => new TextRun({
        text: l,
        font: "Times New Roman",
        size: 20,
        color: "1E293B",
        break: lIdx > 0 ? 1 : 0
      }));

      return new TableCell({
        width: { size: w, type: WidthType.PERCENTAGE },
        shading: { fill: bg, type: ShadingType.CLEAR, color: "auto" },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [
          new Paragraph({
            spacing: { after: 0, line: 260 },
            children: runs
          })
        ]
      });
    });

    tableRows.push(
      new TableRow({
        children: cells
      })
    );
  });

  elements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 8, color: "CBD5E1" },
        bottom: { style: BorderStyle.SINGLE, size: 12, color: "334155" },
        insideH: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0" },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideV: { style: BorderStyle.NONE }
      },
      rows: tableRows
    })
  );

  elements.push(new Paragraph({ spacing: { before: 0, after: 140 } }));
  return elements;
}

async function run() {
  const children = [];

  // ==========================================
  // TITULNÍ STRANA
  // ==========================================
  children.push(...p("VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ", { align: AlignmentType.CENTER, bold: true, size: 28, spaceBefore: 200, spaceAfter: 60 }));
  children.push(...p("FAKULTA PODNIKATELSKÁ", { align: AlignmentType.CENTER, bold: true, size: 26, spaceBefore: 0, spaceAfter: 360 }));

  children.push(...placeholderBox("[LOGO VUT / FP VUT]", "Oficiální grafický emblém Vysokého učení technického v Brně"));

  children.push(...p("ÚSTAV MANAGEMENTU A MARKETINGU", { align: AlignmentType.CENTER, italic: true, size: 22, spaceBefore: 360, spaceAfter: 480 }));

  children.push(...p("FP DROP – NÁVRH A PROPAGACE MOBILNÍ APLIKACE PRO STUDENTY FAKULTY PODNIKATELSKÉ VUT V BRNĚ", {
    align: AlignmentType.CENTER,
    bold: true,
    size: 32, // 16pt
    spaceBefore: 240,
    spaceAfter: 140,
    lineSpacing: 380
  }));

  children.push(...p("Semestrální projekt / Návrh digitálního produktu a marketingové strategie", {
    align: AlignmentType.CENTER,
    italic: true,
    size: 24,
    spaceBefore: 0,
    spaceAfter: 720
  }));

  children.push(...p("Autor projektu:          [JMÉNO AUTORA]", { align: AlignmentType.LEFT, size: 22, spaceBefore: 400, spaceAfter: 60 }));
  children.push(...p("Studijní program:        [STUDIJNÍ PROGRAM] (Informační management / Podnikání)", { align: AlignmentType.LEFT, size: 22, spaceBefore: 0, spaceAfter: 60 }));
  children.push(...p("Předmět:                 [NÁZEV PŘEDMĚTU] (Digitální marketing a mobilní technologie)", { align: AlignmentType.LEFT, size: 22, spaceBefore: 0, spaceAfter: 60 }));
  children.push(...p("Vyučující / Vedoucí:     [JMÉNO VYUČUJÍCÍHO]", { align: AlignmentType.LEFT, size: 22, spaceBefore: 0, spaceAfter: 60 }));
  children.push(...p("Akademický rok:          [AKADEMICKÝ ROK] (2025/2026)", { align: AlignmentType.LEFT, size: 22, spaceBefore: 0, spaceAfter: 60 }));
  children.push(...p("Místo vypracování:       Brno", { align: AlignmentType.LEFT, size: 22, spaceBefore: 0, spaceAfter: 200 }));

  // ==========================================
  // OBSAH (Page Break)
  // ==========================================
  children.push(...h1("Obsah", true));
  children.push(...p("1. Úvod ......................................................................................................................................... 3", { spaceAfter: 60 }));
  children.push(...p("2. Základní specifikace aplikace a cílový segment ................................................................... 4", { spaceAfter: 60 }));
  children.push(...p("   2.1 Vymezení produktu FP DROP a řešená problematika .................................................... 4", { spaceAfter: 60 }));
  children.push(...p("   2.2 Segmentace uživatelů a studentská komunita FP VUT ................................................ 5", { spaceAfter: 60 }));
  children.push(...p("   2.3 Uživatelská persona a motivační faktory ...................................................................... 6", { spaceAfter: 60 }));
  children.push(...p("3. Prototyp mobilní aplikace .................................................................................................... 7", { spaceAfter: 60 }));
  children.push(...p("   3.1 Technické řešení a systémová architektura ................................................................. 7", { spaceAfter: 60 }));
  children.push(...p("   3.2 Uživatelské rozhraní a ergonomie ovládání ................................................................. 8", { spaceAfter: 60 }));
  children.push(...p("   3.3 Funkční princip prototypu a transakční logika .............................................................. 9", { spaceAfter: 60 }));
  children.push(...p("   3.4 Možnosti dalšího rozvoje a produkční roadmapa ........................................................... 10", { spaceAfter: 60 }));
  children.push(...p("4. Přístup k tvorbě business profilu ......................................................................................... 11", { spaceAfter: 60 }));
  children.push(...p("   4.1 Koncepce webové prezentace a informační architektura ............................................... 11", { spaceAfter: 60 }));
  children.push(...p("   4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity ................................. 12", { spaceAfter: 60 }));
  children.push(...p("5. Přístup k tvorbě obsahu pro sociální sítě ............................................................................ 13", { spaceAfter: 60 }));
  children.push(...p("   5.1 Strategie působení na síti Instagram .............................................................................. 13", { spaceAfter: 60 }));
  children.push(...p("   5.2 Obsahové formáty, publikační harmonogram a tón komunikace .................................. 14", { spaceAfter: 60 }));
  children.push(...p("   5.3 Případová ukázka příspěvku a storyboard krátkého videa ............................................. 15", { spaceAfter: 60 }));
  children.push(...p("6. Přístup k PPC reklamě ........................................................................................................... 16", { spaceAfter: 60 }));
  children.push(...p("   6.1 Strategické cíle a detailní zacílení kampaně v Brně ..................................................... 16", { spaceAfter: 60 }));
  children.push(...p("   6.2 Modelový rozpočet a odhad výkonnostních ukazatelů .................................................... 17", { spaceAfter: 60 }));
  children.push(...p("   6.3 Metodika A/B testování a porovnání kreativních variant ............................................... 18", { spaceAfter: 60 }));
  children.push(...p("7. Customer Journey / STDC framework ................................................................................... 19", { spaceAfter: 60 }));
  children.push(...p("   7.1 Fáze zákaznické cesty v kontextu studentského segmentu ............................................ 19", { spaceAfter: 60 }));
  children.push(...p("   7.2 Matice STDC frameworku pro FP DROP ........................................................................... 20", { spaceAfter: 60 }));
  children.push(...p("8. Vyhodnocování a měření ....................................................................................................... 21", { spaceAfter: 60 }));
  children.push(...p("   8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace .................................................. 21", { spaceAfter: 60 }));
  children.push(...p("   8.2 Vyhodnocovací cyklus a optimalizační hypotézy ........................................................... 22", { spaceAfter: 60 }));
  children.push(...p("9. Závěr ........................................................................................................................................ 23", { spaceAfter: 60 }));
  children.push(...p("10. Seznam použitých zdrojů ..................................................................................................... 24", { spaceAfter: 60 }));
  children.push(...p("11. Přílohy .................................................................................................................................... 25", { spaceAfter: 180 }));

  // ==========================================
  // 1. ÚVOD (Page Break)
  // ==========================================
  children.push(...h1("1. Úvod", true));
  children.push(...p(
    "Vysokoškolské prostředí prochází v posledních letech zásadní proměnou v oblasti komunikace mezi institucí " +
    "a jejími studenty. Nastupující generace studentů, primárně reprezentovaná generací Z, vykazuje výrazně odlišné " +
    "vzorce chování při konzumaci informací ve srovnání s předchozími ročníky. Tradiční formální kanály, jako jsou " +
    "oficiální univerzitní webové nástěnky, hromadné e-mailové zprávy nebo nepřehledné informační systémy, se setkávají " +
    "s klesající mírou pozornosti a nízkou mírou zapojení (engagementu). Studenti požadují bezprostřední, vizuálně " +
    "atraktivní a především mobilně orientovaný obsah, který odpovídá jejich životnímu stylu a dynamice studentského života."
  ));
  children.push(...p(
    "Mobilní aplikace v tomto kontextu nepředstavují pouze další distribuční kanál, nýbrž klíčový styčný bod celého " +
    "digitálního ekosystému. Schopnost doručit personalizovanou notifikaci, nabídnout interaktivní katalog, umožnit " +
    "rychlou objednávku na jedno kliknutí a poskytnout zázemí pro komunitní identifikaci je pro moderní vzdělávací " +
    "a přidružené komerční aktivity zásadní. Právě na pomezí komunitního života, moderního vysokoškolského marketingu " +
    "a e-commerce vzniká projekt FP DROP, který je primárně zacílen na studenty a přátele Fakulty podnikatelské " +
    "Vysokého učení technického v Brně (FP VUT)."
  ));
  children.push(...p(
    "Fakulta podnikatelská VUT, sídlící v moderním univerzitním kampusu Pod Palackého vrchem na adrese Kolejní 29, " +
    "sdružuje více než 3 000 studentů v bakalářských, magisterských a doktorských programech zaměřených na ekonomiku, " +
    "management, systémové inženýrství a informatiku. Přestože fakulta disponuje silným akademickým zázemím a aktivním " +
    "akademickým spolkem, dosud postrádala moderní, ucelený digitální nástroj, který by integroval studentský lifestyle, " +
    "autentický streetwearový merch, aktuální časové kapacity semestru (deadliny, zápočty, zkoušková období) a přímou " +
    "mobilní interakci. Výrobky s univerzitní tématikou byly často distribuovány nárazově, fyzicky či přes zastaralá " +
    "webová rozhraní postrádající emocionální náboj a studentskou nadsázku."
  ));
  children.push(...p(
    "Hlavním cílem tohoto semestrálního projektu je komplexní návrh, prototypový vývoj a marketingová strategie " +
    "mobilní aplikace FP DROP. Projekt pokrývá celý životní cyklus digitálního produktu od analýzy cílové skupiny " +
    "přes funkční prototypování v jazyce Python ve vývojovém prostředí Visual Studio Code až po návrh akviziční " +
    "PPC kampaně, obsahového marketingu a frameworku zákaznické cesty (STDC). Výsledkem předkládané práce je " +
    "funkční softwarový artefakt doprovázený rigorózní marketingovou a analytickou studií, připravenou k praktickému " +
    "nasazení na půdě Fakulty podnikatelské VUT v Brně."
  ));

  // ==========================================
  // 2. ZÁKLADNÍ SPECIFIKACE A CÍLOVÝ SEGMENT (Page Break)
  // ==========================================
  children.push(...h1("2. Základní specifikace aplikace a cílový segment", true));
  children.push(...h2("2.1 Vymezení produktu FP DROP a řešená problematika"));
  children.push(...p(
    "FP DROP je koncipován jako specializovaná mobilní komunitní a e-commerce platforma určená pro studenty, vyučující " +
    "a absolventy Fakulty podnikatelské VUT. Jádrem konceptu je princip tzv. limitovaných edicí neboli „dropů“. " +
    "Místo celoročního nabízení statického, generického merche pracuje platforma s časově ohraničenými kolekcemi, " +
    "které reagují na biorytmus akademického roku na Kolejní 29. Jednotlivé dropy (např. DROP 001 – First Semester, " +
    "DROP 002 – Exam Season, DROP 003 – FP After Dark a DROP 004 – Brno Brutalism) odrážejí aktuální prožívání " +
    "studentů – od euforie a seznamování v září přes kofeinem sycené deadliny v lednu až po jarní studentské večírky."
  ));
  children.push(...p(
    "Projekt reaguje na tři hlavní problémy současného stavu. Prvním problémem je roztříštěnost komunikace: " +
    "informace o studentských aktivitách a komunitních předmětech jsou rozptýleny mezi neoficiální skupiny na sociálních " +
    "sítích, univerzitní e-maily a fyzické nástěnky. Druhým problémem je nízká atraktivita a zastaralost dosavadního " +
    "merchandisingu, který nerespektuje soudobé streetwearové trendy (oversized boxy střihy, těžká gramáž 240–420 GSM, " +
    "čistá brutalistická typografie). Třetím problémem je absence přímého distribučního kanálu s nulovým poštovným, " +
    "který by využíval přirozenou koncentraci studentů v areálu kampusu Pod Palackého vrchem."
  ));

  children.push(...h2("2.2 Segmentace uživatelů a studentská komunita FP VUT"));
  children.push(...p(
    "Pro potřeby návrhu mobilní aplikace a navazující marketingové strategie byla provedena podrobná segmentace " +
    "uživatelské báze. Z hlediska demografických a behaviorálních charakteristik dělíme uživatele do tří segmentů:\n\n" +
    "1. Primární segment – Aktivní studenti prezenčního studia FP VUT (cca 2 200 osob): Studenti ve věku 19 až 25 let, " +
    "kteří denně navštěvují přednášky a semináře v budovách P2, P3 a P4 na Kolejní 29 nebo bydlí na přilehlých vysokoškolských " +
    "kolejích Pod Palackého vrchem. Tento segment vykazuje intenzivní využívání chytrých telefonů (průměrný screen time přesahuje " +
    "5,5 hodiny denně), preferuje rychlé nákupy přes Apple Pay / Google Pay, citlivě vnímá slevové akce navázané na průkaz ISIC " +
    "a aktivně buduje svou sociální identitu v rámci ročníku.\n\n" +
    "2. Sekundární segment – Kombinovaní studenti a čerství absolventi (cca 1 000 osob): Studenti kombinované formy studia " +
    "a absolventi v horizontu 1 až 3 let po ukončení studia. Na fakultu docházejí nárazově (páteční a sobotní bloky), mají " +
    "vlastní finanční příjem a nákup vnímají především jako nostalgické gesto, vyjádření sounáležitosti s alma mater nebo " +
    "součást profesního networkingu.\n\n" +
    "3. Terciární segment – Uchazeči o studium a středoškoláci (cca 3 500 osob ročně): Návštěvníci Dnů otevřených dveří, " +
    "veletrhu Gaudeamus Brno a sledující sociálních sítí. V aplikaci hledají autentický pohled do zákulisí fakulty a neformální " +
    "studentskou kulturu, která často rozhoduje o volbě vysoké školy."
  ));

  children.push(...h2("2.3 Uživatelská persona a motivační faktory"));
  children.push(...p(
    "Na základě hloubkového porozumění primárnímu segmentu byla vytvořena detailní uživatelská persona, která sloužila " +
    "jako referenční bod při definování funkčních požadavků na prototyp mobilní aplikace a tón marketingové komunikace."
  ));

  children.push(...createTable(
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
    ],
    [30, 70]
  ));

  // ==========================================
  // 3. PROTOTYP MOBILNÍ APLIKACE (Page Break)
  // ==========================================
  children.push(...h1("3. Prototyp mobilní aplikace", true));
  children.push(...h2("3.1 Technické řešení a systémová architektura"));
  children.push(...p(
    "Prototyp mobilní aplikace FP DROP byl kompletně navržen a implementován v programovacím jazyce Python (verze 3.10+) " +
    "v integrovaném vývojovém prostředí Visual Studio Code (VS Code). Volba Pythonu pro vývoj prototypu byla motivována " +
    "vysokou rychlostí iterace, transparentní čitelností kódu a možností nabídnout studentům a hodnotitelům více režimů běhu " +
    "bez nutnosti složitého instalování těžkopádných nativních mobilních SDK (jako Android Studio nebo Xcode).\n\n" +
    "Zdrojový kód aplikace je strukturován do samostatného modulu python_mobile_app/, který obsahuje následující klíčové komponenty:\n\n" +
    "• main.py: Vstupní bod a koordinátor aplikace. Obsahuje CLI rozhraní (knihovna argparse), které zpracovává spouštěcí " +
    "argumenty --web, --flet a volitelný parametr --port. Implementuje inteligentní fallback logiku: pokud uživatel zvolí spuštění " +
    "nativního GUI přes framework Flet (--flet), avšak knihovna není v systému nainstalována, aplikace nevypíše fatální chybu, " +
    "ale automaticky přepne na bezbariérový Web Mobile Simulator.\n\n" +
    "• app_web.py: Nativní emulátor mobilního zařízení iPhone 16 Pro běžící na vestavěném HTTP serveru Pythonu (http.server " +
    "a socketserver). Tato komponenta má naprosto nulové externí závislosti (Zero External Dependencies) a funguje na jakékoliv " +
    "čisté instalaci Pythonu. Server dynamicky serializuje datové modely do JSONu, injektuje je do responzivní mobilní šablony " +
    "využívající Tailwind CSS a zajišťuje běh na lokálním portu 5050. Součástí je automatické otevření prohlížeče (webbrowser.open).\n\n" +
    "• app_flet.py: Alternativní nativní implementace využívající moderní framework Flet (postavený na Flutter pro Python). " +
    "Tento režim umožňuje kompilaci do nativního okna s podporou hardwarové akcelerace, nativních gest a přepínání Dark Mode.\n\n" +
    "• data.py: Centralizovaný datový model obsahující strukturované katalogy produktů (PRODUCTS), harmonogram a popisy edicí " +
    "(DROPS), studentský profil (STUDENT_PROFILE) včetně věrnostního programu a provázání na akademický trigger systém.\n\n" +
    "• .vscode/launch.json a run_app.bat: Konfigurační soubory pro komfortní spuštění. Pro VS Code je připraven debug profil " +
    "pro spuštění stiskem klávesy F5. Pro Windows je vytvořen dávkový skript run_app.bat, který automaticky detekuje systémové " +
    "příkazy py, python a python3 a eliminuje potíže s přesměrováním na Microsoft Store."
  ));

  children.push(...h2("3.2 Uživatelské rozhraní a ergonomie ovládání"));
  children.push(...p(
    "Uživatelské rozhraní prototypu striktně respektuje ergonomické standardy moderních operačních systémů iOS a Android. " +
    "Vizuální jazyk byl navržen v souladu s brutalistickou estetikou streetwearové značky FP DROP: hluboké černé pozadí " +
    "(Jet Black #050505), vysoce kontrastní bílé typografické prvky (fonty Space Grotesk a JetBrains Mono), doplňková " +
    "akcentní smaragdová barva (#10B981) indikující skladovou dostupnost a subtilní mikrointerakce.\n\n" +
    "Pohyb v aplikaci je zprostředkován spodní navigační lištou (Bottom Navigation Bar) s pěti primárními záložkami:\n" +
    "1. HOME: Dynamický hero banner probíhajícího dropu (DROP 001 – FIRST SEMESTER) s indikátorem 'SKLADEM V BRNĚ', rychlý widget " +
    "se studentským slevovým kódem FPVUT10 (10% sleva) a mřížka nejpopulárnějších produktů.\n" +
    "2. SHOP: Dvousloupcový mobilní grid s rychlými kategoriálními filtry (ALL, T-SHIRTS, HOODIES, ACCESSORIES) s cenami v Kč " +
    "a přímým vložením do košíku.\n" +
    "3. DROPS: Vertikální časová osa prezentující ediční plán pro celý akademický rok (Drop 001 až 004) se statusy LIVE a COMING SOON.\n" +
    "4. WISHLIST: Interaktivní správa uložených kousků před spuštěním dropu klepnutím na srdíčko.\n" +
    "5. PROFILE: Personalizovaná obrazovka identity studenta (Demo Student, sample ISIC: DEMO-ISIC-0000), úroveň VIP SENIOR, " +
    "získané ECTS kredity (142 ECTS) a historie objednávek s možností sledování stavu doručení na Kolejní 29."
  ));

  children.push(...h2("3.3 Funkční princip prototypu a transakční logika"));
  children.push(...p(
    "Prototyp disponuje plně interaktivní stavovou logikou na klientské straně simulátoru. Uživatel může otevřít detail " +
    "libovolného produktu s fotogalerií s čistou bílou typografií bez rušivých stínů, podrobnou materiálovou specifikací " +
    "(100% bio bavlna 240 g/m² nebo 420 GSM fleece u mikin), přesným počtem zbývajících kusů v Brně a voličem velikostí (XS až XXL).\n\n" +
    "Nákupní košík dynamicky kalkuluje položky, aplikuje studentskou ISIC slevu 10 % a nastavuje dopravu s osobním odběrem " +
    "na Kolejní 29 zdarma (0 Kč). Objednávka se dokončuje akcí '1-Click Zaplatit', která provede simulaci transakce, vyprázdní košík, " +
    "zobrazí potvrzení a přesměruje uživatele do historie objednávek v profilu."
  ));

  children.push(...h2("3.4 Možnosti dalšího rozvoje a produkční roadmapa"));
  children.push(...p(
    "Současná podoba prototypu představuje plnohodnotný 'proof-of-concept'. Pro přechod do produkčního provozu je navržena tato roadmapa:\n\n" +
    "• Backendová infrastruktura: Přechod na REST API / GraphQL backend postavený na frameworku FastAPI (Python) nebo Node.js " +
    "s relační databází PostgreSQL a cachovací vrstvou Redis.\n\n" +
    "• Autentizace přes IS VUT: Implementace protokolu OAuth 2.0 / Shibboleth pro přihlašování přes oficiální VUT login, což zajistí " +
    "100% spolehlivé ověření statusu studenta a nároku na slevu.\n\n" +
    "• Push notifikace (FCM): Nasazení Firebase Cloud Messaging pro okamžité informování o uvolnění nového dropu do prodeje (Drop Alarm), " +
    "blížícím se vyprodání velikostí a oznámení o připravenosti balíčku k vyzvednutí na recepci Kolejní 29.\n\n" +
    "• Platební brána: Napojení certifikované platební brány (Stripe / Comgate / Apple Pay / Google Pay) splňující standard PCI-DSS."
  ));

  // ==========================================
  // 4. BUSINESS PROFIL (Page Break)
  // ==========================================
  children.push(...h1("4. Přístup k tvorbě business profilu", true));
  children.push(...h2("4.1 Koncepce webové prezentace a informační architektura"));
  children.push(...p(
    "Mobilní aplikace FP DROP je podpořena reprezentativním webovým business profilem (landing page), který slouží jako konverzní " +
    "brána pro desktopové uživatele, vyhledávače a marketingové kampaně. Webová prezentace plní funkci oficiálního uzlu, buduje " +
    "důvěryhodnost značky a stimuluje stažení mobilní aplikace.\n\n" +
    "Informační architektura jednostránkové webové prezentace (SPA) zahrnuje:\n\n" +
    "1. Hero sekce: Dominantní claim 'YOUR UNIVERSITY. YOUR UNIFORM.', velkoformátová fotografie z kampusu, odpočet do konce " +
    "aktuálního dropu a tlačítka 'Stáhnout mobilní aplikaci' a 'Prozkoumat kolekci'.\n\n" +
    "2. O projektu a filozofie: Studentský streetwear pro FP VUT, udržitelná produkce (100% bio bavlna, lokální sítotisk v Brně, " +
    "etická výroba) a hrdost na fakultu sídlící na Kolejní 29.\n\n" +
    "3. Přehled funkcí aplikace: Přednostní přístup k dropům o 24 hodin dříve, automatická ISIC sleva 10 %, sledování stavu přípravy " +
    "objednávky a push notifikace.\n\n" +
    "4. Lookbook & Aktuální Drop: Vizuální galerie modelů přímo z areálu kampusu Pod Palackého vrchem a Technologického parku.\n\n" +
    "5. Studentská zóna & FAQ: Odpovědi na dotazy ohledně velikostí, osobního odběru na fakultě, výměny zboží a ISIC slev.\n\n" +
    "6. Zápatí s rychlými odkazy: Kontaktní údaje, propojení na sociální sítě (@fp_drop), odkaz na stažení dokumentace a spuštění simulátoru."
  ));

  children.push(...h2("4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity"));
  children.push(...p(
    "Pro kontinuální optimalizaci konverzního poměru (CRO) a pochopení chování návštěvníků je web vybaven analytickým měřením " +
    "kombinujícím Google Analytics 4 (GA4) a Microsoft Clarity.\n\n" +
    "Google Analytics 4 sleduje klíčové mikro a makro konverzní události:\n" +
    "• app_download_click: Kliknutí na odkaz ke stažení mobilní aplikace (iOS vs. Android).\n" +
    "• coupon_copied: Zkopírování slevového kódu FPVUT10 do schránky.\n" +
    "• view_item_detail: Zobrazení detailní specifikace konkrétního kusu oblečení.\n" +
    "• simulator_opened: Spuštění vestavěného mobilního simulátoru přímo na webu.\n\n" +
    "Microsoft Clarity doplňuje kvantitativní data o teplotní mapy (heatmaps) a anonymizované nahrávky relací (session recordings). " +
    "Nástroj identifikuje tzv. 'dead clicks' (kliky na statické prvky) a 'rage clicks' (opakované frustrované klikání při pomalé odezvě), " +
    "což poskytuje okamžitou zpětnou vazbu pro optimalizaci rozvržení prvků a zkrácení konverzní cesty."
  ));

  // ==========================================
  // 5. SOCIÁLNÍ SÍTĚ A VIDEO (Page Break)
  // ==========================================
  children.push(...h1("5. Přístup k tvorbě obsahu pro sociální sítě", true));
  children.push(...h2("5.1 Strategie působení na síti Instagram"));
  children.push(...p(
    "Sociální sítě představují pro projekt FP DROP primární akviziční i retenční kanál. Jako hlavní platforma byl vybrán Instagram " +
    "(doplněný o organický TikTok). Instagram v segmentu vysokoškoláků ve věku 19–25 let v ČR dosahuje přes 84% penetrace a slouží " +
    "jako primární vizuální vyhledávač módních trendů a komunitního dění.\n\n" +
    "Strategie profilu @fp_drop je postavena na principu absolutní autenticity. Značka se vyhýbá sterilním fotobankovým snímkům. " +
    "Využívá estetiku 'lo-fi' fotografie focené na analogové 35mm kinofilmy přímo v prostorách FP VUT (chodby, posluchárna P384, " +
    "respirium, koleje Pod Palackého vrchem) a zapojuje skutečné studenty v rolích modelů a tvůrců obsahu."
  ));

  children.push(...h2("5.2 Obsahové formáty, publikační harmonogram a tón komunikace"));
  children.push(...p(
    "Obsahový plán kombinuje tři základní formáty sítě Instagram:\n\n" +
    "1. Instagram Reels (3× týdně): Formát s nejvyšším virálním dosahem. Studentský humor, parodie na zápočtový týden a zkouškové, " +
    "dynamické představení nového merche a 'day in the life' střípky ze studia na FP VUT s trending audio stopami.\n\n" +
    "2. Instagram Stories (4–8 denně): Ankety, kvízy o fakultě, odpočty do spuštění dropu (Countdown Sticker), zákulisní pohledy " +
    "z výroby textilu a reposty obsahu studentů (User Generated Content – UGC).\n\n" +
    "3. Karusely ve feedu (1–2× týdně): Lookbooky, tabulky velikostí, gramáž látek a příběhy stojící za slogany.\n\n" +
    "Tón komunikace (Tone of Voice) je sebevědomý, odlehčený, studentsky neformální, avšak nikdy vulgární. Pracuje s nadsázkou " +
    "a interními fakultními reáliemi ('ECTS are temporary, drip is forever', 'Fronta na kafe v respiriu')."
  ));

  children.push(...h2("5.3 Případová ukázka příspěvku a storyboard krátkého videa"));
  children.push(...p(
    "Návrh feed příspěvku (Karusel – 3 snímky):\n" +
    "• Vizuál: Snímek 1 – Dvojice studentů na schodech budovy P2 na Kolejní 29 v tričkách 'HOT GIRLS GO TO FP' a mikině 'EXAM SURVIVOR'. " +
    "Snímek 2 – Makro detail vyšitého štítku a hutné 240g bavlny. Snímek 3 – Grafika mobilní aplikace se slevovým kódem.\n" +
    "• Text příspěvku: 'Semestr oficiálně začal. Starý sešity vyhozený, nový předměty zapsaný a tvůj šatník potřebuje upgrade. " +
    "DROP 001 právě přistál v mobilní aplikaci FP DROP. 100% bio bavlna, oversized střih a nulový poštovný při vyzvednutí na Kolejní 29. " +
    "Zadej kód FPVUT10 a ušetři 10 % s ISICem. Odkaz na stažení v biu.'\n" +
    "• Hashtagy: #FPVUT #VUTvBrne #FakultaPodnikatelska #Kolejni29 #BrnoStudents #FPDROP #StudentStreetwear\n\n" +
    "Storyboard krátkého videa (Instagram Reels / TikTok – 15 sekund):\n" +
    "• 0:00–0:03 (Hook): Student běžící po schodech na Kolejní 29 s kávou. Text na obrazovce: 'Když máš za 2 minuty přednášku z managementu, " +
    "ale outfit musí být 10/10.'\n" +
    "• 0:03–0:08 (Dynamický střih): Rychlé přechody studentů v prostorách fakulty ukazující detaily triček a mikin v pohybu.\n" +
    "• 0:08–0:12 (Představení aplikace): Pohled na displej iPhonu – otevření aplikace FP DROP, přidání trička do košíku jedním klikem " +
    "a volba 'Kolejní 29 – Osobní odběr zdarma'.\n" +
    "• 0:12–0:15 (Call to Action): Závěrečný packshot s logem aplikace a výzvou: 'Stahuj aplikaci FP DROP. Limitovaná edice DROP 001 LIVE.'"
  ));

  // ==========================================
  // 6. PPC REKLAMA (Page Break)
  // ==========================================
  children.push(...h1("6. Přístup k PPC reklamě", true));
  children.push(...h2("6.1 Strategické cíle a detailní zacílení kampaně v Brně"));
  children.push(...p(
    "Placená výkonnostní reklama (PPC) plní roli akceleračního nástroje při spouštění nových dropů. Jelikož je rozpočet studentského " +
    "projektu limitovaný, kampaň je hyper-lokálně zacílena na relevantní komunitu v Brně prostřednictvím Meta Ads (Instagram Stories a Reels).\n\n" +
    "Parametry cílení v Meta Ads Manageru:\n" +
    "• Geografické zacílení: Brno a okolí do 15 km se zvýšenou vahou na lokalitu Královo Pole / Medlánky (radius 2 km kolem kampusu Kolejní 29).\n" +
    "• Věk a jazyk: 18–26 let, čeština a slovenština (zohlednění početné slovenské komunity na VUT).\n" +
    "• Zájmy a chování: Vysokoškolské vzdělávání, VUT v Brně, Fakulta podnikatelská VUT, streetwear, městská móda, vysokoškoláci.\n" +
    "• Vyloučení: Uživatelé mimo věk 18–26 let a uživatelé trvale žijící mimo Jihomoravský kraj."
  ));

  children.push(...h2("6.2 Modelový rozpočet a odhad výkonnostních ukazatelů"));
  children.push(...p(
    "Pro úvodní 30denní akviziční vlnu byl navržen modelový rozpočet 15 000 Kč rozdělený do tří fází konverzního trychtýře:"
  ));

  children.push(...createTable(
    "Tabulka 2: Modelový rozpočet a odhad výkonnostních ukazatelů PPC kampaně (30 dní)",
    ["Fáze kampaně", "Podíl", "Rozpočet", "Zobrazení (Impr.)", "Odhad CPC", "Odhad CTR", "Cílové konverze"],
    [
      ["1. Awareness (Povědomí)", "35 %", "5 250 Kč", "175 000", "2,50 Kč", "1,2 %", "2 100 kliknutí na odkaz"],
      ["2. Traffic & Install (Návštěvy / Stažení)", "45 %", "6 750 Kč", "135 000", "3,80 Kč", "1,8 %", "1 776 prokliků / 530 instalací"],
      ["3. Retargeting (Košík / Nákup)", "20 %", "3 000 Kč", "30 000", "6,50 Kč", "3,2 %", "460 prokliků / 95 objednávek"],
      ["CELKEM MODELOVÁ KAMPAŇ", "100 %", "15 000 Kč", "340 000", "3,65 Kč (průměr)", "1,85 % (průměr)", "4 336 návštěv / 625 aktivací"]
    ],
    [22, 10, 14, 16, 12, 12, 14]
  ));

  children.push(...h2("6.3 Metodika A/B testování a porovnání kreativních variant"));
  children.push(...p(
    "Během prvních 10 dnů je rozpočet fáze Traffic rozdělen rovnoměrně (50:50) mezi dvě odlišné kreativní varianty za účelem zjištění " +
    "nižší ceny za instalaci aplikace (Cost per Install – CPI)."
  ));

  children.push(...createTable(
    "Tabulka 3: Porovnání kreativních variant pro A/B testování v systému Meta Ads",
    ["Parametr testu", "Varianta A (Komunitní / Emocionální motiv)", "Varianta B (Produktový / Racionální motiv)"],
    [
      ["Hlavní headline", "'HOT GIRLS GO TO FP – A ty studuješ kde?'", "'OFICIÁLNÍ MERCH FP VUT – Kvalita, co vydrží zkouškový.'"],
      ["Vizuální formát", "Momentka ze schodů fakulty P2, studentky v oversized tričkách, analogový filtr, autentická atmosféra.", "Čisté produktové studio na černém pozadí, makro detail 420g bavlny a pevný límec."],
      ["Hlavní sdělení", "Příslušnost k nejlepší fakultě, nadsázka, studentská komunita a lifestyle.", "Prvotřídní bio bavlna, dlouhá životnost, 10% ISIC sleva a odběr na vrátnici zdarma."],
      ["Call to Action", "'STÁHNOUT APLIKACI'", "'ZÍSKAT 10% SLEVU'"],
      ["Cílové KPI", "Míra prokliku (CTR) a počet stažení aplikace.", "Konverzní poměr objednávek a hodnota košíku (AOV)."],
      ["Hypotéza testu", "Varianta A dosáhne vyššího CTR (> 2,2 %) a nižšího CPI díky silné sociální rezonanci sloganu.", "Varianta B dosáhne vyššího nákupního konverzního poměru (> 4,5 %) u zájemců o teplé mikiny."]
    ],
    [22, 39, 39]
  ));

  // ==========================================
  // 7. CUSTOMER JOURNEY / STDC (Page Break)
  // ==========================================
  children.push(...h1("7. Customer Journey / STDC framework", true));
  children.push(...h2("7.1 Fáze zákaznické cesty v kontextu studentského segmentu"));
  children.push(...p(
    "Pro zmapování interakce studenta s ekosystémem byl aplikován framework STDC (See – Think – Do – Care) podle Avinashe Kaushika, " +
    "který strukturuje marketingové aktivity podle nákupního a myšlenkového rozpoložení uživatele:\n\n" +
    "1. Fáze SEE (Povědomí): Široké publikum studentů FP VUT. Uživatel nehledá nové oblečení, vnímá podněty na kampusu, vidí spolužáky " +
    "v tričkách nebo narazí na Reels video.\n\n" +
    "2. Fáze THINK (Zvažování): Student značku zaregistroval, líbí se mu design, zkoumá tabulku velikostí, ověřuje kvalitu materiálu a zjišťuje slevu.\n\n" +
    "3. Fáze DO (Konverze): Okamžik rozhodnutí. Student stahuje aplikaci, vkládá kousek do košíku, zadává kód FPVUT10 a volí bezplatné vyzvednutí na Kolejní 29.\n\n" +
    "4. Fáze CARE (Péče a loajalita): Převzetí objednávky, nošení merche, sdílení fotek na sociálních sítích a zapnutí notifikací na další drop."
  ));

  children.push(...h2("7.2 Matice STDC frameworku pro FP DROP"));
  children.push(...createTable(
    "Tabulka 4: Strategická matice STDC frameworku pro aplikaci FP DROP",
    ["Fáze STDC", "Cíl a potřeba uživatele", "Marketingový kanál", "Typ obsahu", "Call to Action", "Klíčové KPI", "Způsob měření"],
    [
      ["SEE (Povědomí)", "Pobavit se, zjistit, co se děje na fakultě.", "Instagram Reels, TikTok, plakáty v respiriu na Kolejní 29.", "Virální studentská videa, momentky z kampusu bez prodejního tlaku.", "'Sleduj @fp_drop'", "Impressions, unikátní dosah, video views.", "Meta Insights, TikTok Analytics."],
      ["THINK (Zvažování)", "Ověřit velikost a materiál, porovnat cenu s konkurencí.", "Web landing page, Stories, mobilní simulátor, recenze.", "Specifikace 240g bavlny a 420g mikin, tabulka velikostí, unboxing.", "'Prozkoumat kolekci' / 'Vyzkoušet appku'", "CTR, čas na webu, počet zkopírování slevového kódu.", "GA4 (relace > 1 min), Microsoft Clarity."],
      ["DO (Konverze)", "Rychle objednat kousek s vyzvednutím na fakultě zdarma.", "Mobilní aplikace FP DROP, retargetingové reklamy, push notifikace.", "Upozornění na poslední kusy skladem v Brně, 1-Click objednávka.", "'Koupit na 1-Click' / 'Dokončit objednávku'", "Konverzní poměr (CR), stažení aplikace, hodnota objednávky (AOV).", "Interní databáze objednávek, GA4 e-commerce."],
      ["CARE (Loajalita)", "Získat status VIP studenta, vědět o dalším dropu.", "Push notifikace v aplikaci, e-mail s pozvánkou do VIP klubu, Stories UGC.", "Výzva ke sdílení fotky s #FPDROP, přednostní přístup k DROP 002.", "'Sdílej svůj fit' / 'Zapnout Drop Alarm'", "Opakovaný nákup, UGC zmínky, 30-day retention v aplikaci.", "Aplikační analytika Firebase, Instagram mentions."]
    ],
    [12, 16, 14, 18, 12, 14, 14]
  ));

  // ==========================================
  // 8. VYHODNOCOVÁNÍ A MĚŘENÍ (Page Break)
  // ==========================================
  children.push(...h1("8. Vyhodnocování a měření", true));
  children.push(...h2("8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace"));
  children.push(...p(
    "Efektivní řízení digitálního projektu vyžaduje ucelený systém metrik rozdělený do čtyř vzájemně propojených oblastí:"
  ));

  children.push(...createTable(
    "Tabulka 5: Přehled metrik a měřicích nástrojů digitálního ekosystému FP DROP",
    ["Oblast ekosystému", "Klíčové sledované metriky", "Nástroj měření", "Frekvence", "Cílová referenční hodnota"],
    [
      ["1. Webová prezentace (Landing Page)", "Unikátní návštěvníci (Users), Engagement Rate, konverze stažení aplikace, hloubka scrollu.", "Google Analytics 4, Microsoft Clarity", "Týdně", "> 5 000 návštěv/měsíc, Engagement Rate > 65 %, Download CR > 12 %"],
      ["2. Sociální sítě (Instagram / TikTok)", "Organický zásah (Reach), míra zapojení (ER per post), zhlédnutí Reels, kliky na odkaz v biu.", "Meta Business Suite, Instagram Native Insights", "Denně / Týdně", "Měsíční dosah > 15 000 účtů, ER > 5,8 %, Reels views > 3 000/video"],
      ["3. Placená PPC reklama (Meta Ads)", "Cena za tisíc zobrazení (CPM), cena za proklik (CPC), míra prokliku (CTR), cena za instalaci (CPI), ROAS.", "Meta Ads Manager", "Průběžně (real-time)", "CTR > 1,8 %, průměrné CPC < 4,00 Kč, CPI < 14,00 Kč, ROAS > 3,8x"],
      ["4. Mobilní aplikace (Prototyp / Produkce)", "Aktivní uživatelé (DAU / MAU), míra udržení (Retention D1, D7, D30), konverzní poměr košíku.", "Aplikační logy, Firebase Analytics / Mixpanel", "Měsíčně", "MAU > 1 200 studentů, D30 Retention > 35 %, Checkout CR > 8,5 %"]
    ],
    [22, 26, 18, 12, 22]
  ));

  children.push(...h2("8.2 Vyhodnocovací cyklus a optimalizační hypotézy"));
  children.push(...p(
    "Naměřená data slouží jako podklad pro dvoutýdenní optimalizační cyklus (Build-Measure-Learn smyčka podle metodiky Lean Startup). " +
    "Příklad z praxe: Microsoft Clarity odhalí, že mobilní návštěvníci opakovaně klikají na statický obrázek mikiny v domnění, " +
    "že jde o galerii barev (dead click). Tým formuluje hypotézu: přeměna obrázku na swipe karusel zvýší čas na stránce o 15 % " +
    "a zvedne prokliky do aplikace o 3 procentní body. Následně se nasadí A/B test a provede verifikace."
  ));

  // ==========================================
  // 9. ZÁVĚR (Page Break)
  // ==========================================
  children.push(...h1("9. Závěr", true));
  children.push(...p(
    "Předložený semestrální projekt prokázal proveditelnost, technologickou životaschopnost a marketingový potenciál " +
    "komunitního digitálního produktu FP DROP určeného pro studenty Fakulty podnikatelské VUT v Brně. V souladu se zadáním " +
    "byl vyvinut funkční prototyp mobilní aplikace v programovacím jazyce Python, který byl provázán s detailní specifikací " +
    "uživatelských segmentů, architekturou webového business profilu a robustní marketingovou strategií pokrývající sociální " +
    "sítě, PPC reklamu a model zákaznické cesty STDC."
  ));
  children.push(...p(
    "Hlavní přínos projektu spočívá v překonání tradičního formálního pojetí univerzitního merchandisingu. Namísto pasivního " +
    "prodeje generických upomínkových předmětů staví FP DROP na autentické identitě studentů, respektuje jejich každodenní " +
    "potřeby na kampusu Kolejní 29 a nabízí prvotřídní textilní zpracování doplněné o moderní mobilní nákupní zkušenost. " +
    "Technické řešení prototypu, umožňující okamžité spuštění jak ve formě zero-dependency webového simulátoru, tak ve formě " +
    "nativního Flet rozhraní, poskytuje vynikající základ pro budoucí produkční vývoj."
  ));
  children.push(...p(
    "Mezi limity současného řešení patří především lokální charakter běhu prototypu bez perzistentního cloudového backendu " +
    "a absence přímé integrace na oficiální rozhraní Informačního systému VUT. Tyto limity však byly v práci detailně " +
    "analyzovány a byla navržena jasná roadmapa pro jejich odstranění v navazující fázi projektu. Projekt FP DROP představuje " +
    "komplexní, akademicky i prakticky podložený koncept, který má reálný potenciál posílit prestiž a komunitní soudržnost " +
    "Fakulty podnikatelské Vysokého učení technického v Brně."
  ));

  // ==========================================
  // 10. ZDROJE (Page Break)
  // ==========================================
  children.push(...h1("10. Seznam použitých zdrojů", true));
  const sources = [
    "1. CHAFFEY, Dave a Fiona ELLIS-CHADWICK. Digital Marketing: Strategy, Implementation and Practice. 7th ed. Harlow: Pearson, 2019. ISBN 978-1-292-22341-4.",
    "2. KAUSHIK, Avinash. See-Think-Do-Care: A Winning Consumer-Oriented Marketing Framework. Occam's Razor by Avinash Kaushik [online]. 2015 [cit. 2026-10-05]. Dostupné z: https://www.kaushik.net/avinash/see-think-do-care-win-content-marketing-framework/",
    "3. KOTLER, Philip, Kevin Lane KELLER a Alexander CHERNEV. Marketing Management. 16th ed. Harlow: Pearson, 2021. ISBN 978-0-137-34415-4.",
    "4. KRUG, Steve. Nenuťte uživatele přemýšlet!: Korigovaný přístup k použitelnosti webu a mobilních aplikací. 3. vyd. Brno: BizBooks, 2014. ISBN 978-80-265-0242-5.",
    "5. NORMAN, Donald A. The Design of Everyday Things: Revised and Expanded Edition. New York: Basic Books, 2013. ISBN 978-0-465-05065-9.",
    "6. RIES, Eric. The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses. New York: Crown Business, 2011. ISBN 978-0-307-88789-4.",
    "7. VUT V BRNĚ. Fakulta podnikatelská: Oficiální webové stránky a strategické dokumenty [online]. Brno: VUT, 2026 [cit. 2026-10-05]. Dostupné z: https://www.fbm.vutbr.cz/",
    "8. VUT V BRNĚ. Jednotný vizuální styl Vysokého učení technického v Brně: Grafický manuál [online]. Brno: VUT, 2024 [cit. 2026-10-05]. Dostupné z: https://www.vut.cz/vut/symboly",
    "9. ČSN ISO 690:2022. Informace a dokumentace – Pravidla pro bibliografické odkazy a citace informačních zdrojů. Praha: Česká agentura pro standardizaci, 2022.",
    "10. PYTHON SOFTWARE FOUNDATION. Python 3.12 Documentation: The Python Standard Library [online]. Wilmington: PSF, 2025 [cit. 2026-10-05]. Dostupné z: https://docs.python.org/3.12/",
    "11. FLET PROJECT. Flet: Build Flutter apps in Python [online]. 2026 [cit. 2026-10-05]. Dostupné z: https://flet.dev/docs/"
  ];
  sources.forEach(s => children.push(...p(s, { spaceBefore: 40, spaceAfter: 80, size: 22 })));

  // ==========================================
  // 11. PŘÍLOHY (Page Break)
  // ==========================================
  children.push(...h1("11. Přílohy", true));
  children.push(...p(
    "Přílohová část obsahuje předpřipravené rámečky s popisky pro snadné vložení reálných snímků obrazovky (screenshotů), " +
    "diagramů architektury a grafických materiálů přímo v aplikaci Microsoft Word.",
    { italic: true, spaceAfter: 180 }
  ));

  children.push(...placeholderBox(
    "[PŘÍLOHA 1 – SCREENSHOT HLAVNÍ OBRAZOVKY MOBILNÍHO SIMULÁTORU]",
    "Náhled úvodní obrazovky HOME v emulátoru iPhone 16 Pro s hero bannerem DROP 001 a slevovým widgetem FPVUT10"
  ));

  children.push(...placeholderBox(
    "[PŘÍLOHA 2 – SCREENSHOT KATALOGU PRODUKTŮ A FILTROVÁNÍ]",
    "Dvousloupcový responzivní katalog se zobrazením produktů 'HOT GIRLS GO TO FP', 'NO SLEEP' a filtrací kategorií"
  ));

  children.push(...placeholderBox(
    "[PŘÍLOHA 3 – SCREENSHOT PROSTŘEDÍ VS CODE A SPUŠTĚNÍ PROTOTYPU]",
    "Snímek integrovaného vývojového prostředí Visual Studio Code se strukturou souborů main.py, data.py a terminálovým výstupem"
  ));

  children.push(...placeholderBox(
    "[PŘÍLOHA 4 – DIAGRAM SYSTÉMOVÉ ARCHITEKTURY EKOSYSTÉMU FP DROP]",
    "Schéma propojení webové landing page, mobilního simulátoru, analytických nástrojů GA4/Clarity a Meta Ads"
  ));

  children.push(...placeholderBox(
    "[PŘÍLOHA 5 – NÁVRHY REKLAMNÍCH FORMÁTŮ META ADS PRO A/B TESTOVÁNÍ]",
    "Grafické vizuály varianty A (komunitní motiv na kampusu Kolejní 29) a varianty B (produktový detail s ISIC slevou)"
  ));

  // Build document
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Times New Roman",
            size: 24, // 12pt
            color: "000000"
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 360, // 1.5 spacing
              after: 120
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 2.54 cm
          }
        },
        children: children
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const targetPublic = path.join(__dirname, "../public/FP_DROP_projekt_VUT.docx");
  const targetRoot = path.join(__dirname, "../FP_DROP_projekt_VUT.docx");

  fs.writeFileSync(targetPublic, buffer);
  fs.writeFileSync(targetRoot, buffer);

  console.log(`✅ Úspěšně vygenerován 100% validní Word soubor (.docx):`);
  console.log(`   - ${targetPublic} (${buffer.length} bajtů)`);
  console.log(`   - ${targetRoot}`);
}

run().catch(err => {
  console.error("Chyba při generování DOCX:", err);
  process.exit(1);
});
