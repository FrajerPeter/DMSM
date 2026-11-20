#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generuje aj identický RTF formát (Rich Text Format), ktorý Microsoft Word
otvorí na 1000 % bez akejkoľvek chybovej hlášky aj pri striktných nastaveniach Windows.
"""

import os

def rtf_escape(text):
    res = []
    for c in text:
        code = ord(c)
        if code < 128 and c not in ['\\', '{', '}']:
            res.append(c)
        elif c in ['\\', '{', '}']:
            res.append('\\' + c)
        else:
            res.append(f'\\u{code}?')
    return ''.join(res)

with open("/app/applet/scripts/generate_docx_official.js", "r", encoding="utf-8") as f:
    full_code = f.read()

# Let's write a python generator for RTF
rtf_content = [
    r"{\rtf1\ansi\deff0",
    r"{\fonttbl{\f0\froman\fcharset0 Times New Roman;}{\f1\fswiss\fcharset0 Arial;}}",
    r"{\colortbl;\red15\green23\blue42;\red30\green41\blue59;\red100\green116\blue139;\red16\green185\blue129;}",
    r"\paperw11906\paperh16838\margl1440\margr1440\margt1440\margb1440",
    r"\widowctrl\qj\fs24\sl360\slmult1"
]

def add_p(text, bold=False, italic=False, align="qj", fs=24, sa=140, sb=0):
    escaped = rtf_escape(text)
    b_tag = r"\b " if bold else ""
    b_end = r"\b0 " if bold else ""
    i_tag = r"\i " if italic else ""
    i_end = r"\i0 " if italic else ""
    al_tag = f"\\{align}"
    rtf_content.append(f"\\pard{al_tag}\\sb{sb}\\sa{sa}\\sl360\\slmult1 {b_tag}{i_tag}\\fs{fs} {escaped}{i_end}{b_end}\\par")

def add_h1(text):
    rtf_content.append(r"\page")
    add_p(text, bold=True, fs=32, align="ql", sb=360, sa=140)

def add_h2(text):
    add_p(text, bold=True, fs=28, align="ql", sb=240, sa=100)

# Titulná strana
add_p("VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ", bold=True, align="qc", fs=28, sb=240, sa=60)
add_p("FAKULTA PODNIKATELSKÁ", bold=True, align="qc", fs=26, sb=0, sa=360)
add_p("[LOGO VUT / FP VUT]", bold=True, align="qc", fs=24, sb=200, sa=200)
add_p("ÚSTAV MANAGEMENTU A MARKETINGU", italic=True, align="qc", fs=22, sb=360, sa=480)
add_p("FP DROP – NÁVRH A PROPAGACE MOBILNÍ APLIKACE PRO STUDENTY FAKULTY PODNIKATELSKÉ VUT V BRNĚ", bold=True, align="qc", fs=32, sb=240, sa=140)
add_p("Semestrální projekt / Návrh digitálního produktu a marketingové strategie", italic=True, align="qc", fs=24, sb=0, sa=720)
add_p("Autor projektu:          [JMÉNO AUTORA]", align="ql", fs=22, sb=400, sa=60)
add_p("Studijní program:        [STUDIJNÍ PROGRAM] (Informační management / Podnikání)", align="ql", fs=22, sb=0, sa=60)
add_p("Předmět:                 [NÁZEV PŘEDMĚTU] (Digitální marketing a mobilní technologie)", align="ql", fs=22, sb=0, sa=60)
add_p("Vyučující / Vedoucí:     [JMÉNO VYUČUJÍCÍHO]", align="ql", fs=22, sb=0, sa=60)
add_p("Akademický rok:          [AKADEMICKÝ ROK] (2025/2026)", align="ql", fs=22, sb=0, sa=60)
add_p("Místo vypracování:       Brno", align="ql", fs=22, sb=0, sa=200)

# Obsah
add_h1("Obsah")
add_p("1. Úvod ......................................................................................................................................... 3")
add_p("2. Základní specifikace aplikace a cílový segment ................................................................... 4")
add_p("   2.1 Vymezení produktu FP DROP a řešená problematika .................................................... 4")
add_p("   2.2 Segmentace uživatelů a studentská komunita FP VUT ................................................ 5")
add_p("   2.3 Uživatelská persona a motivační faktory ...................................................................... 6")
add_p("3. Prototyp mobilní aplikace .................................................................................................... 7")
add_p("   3.1 Technické řešení a systémová architektura ................................................................. 7")
add_p("   3.2 Uživatelské rozhraní a ergonomie ovládání ................................................................. 8")
add_p("   3.3 Funkční princip prototypu a transakční logika .............................................................. 9")
add_p("   3.4 Možnosti dalšího rozvoje a produkční roadmapa ........................................................... 10")
add_p("4. Přístup k tvorbě business profilu ......................................................................................... 11")
add_p("   4.1 Koncepce webové prezentace a informační architektura ............................................... 11")
add_p("   4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity ................................. 12")
add_p("5. Přístup k tvorbě obsahu pro sociální sítě ............................................................................ 13")
add_p("   5.1 Strategie působení na síti Instagram .............................................................................. 13")
add_p("   5.2 Obsahové formáty, publikační harmonogram a tón komunikace .................................. 14")
add_p("   5.3 Případová ukázka příspěvku a storyboard krátkého videa ............................................. 15")
add_p("6. Přístup k PPC reklamě ........................................................................................................... 16")
add_p("   6.1 Strategické cíle a detailní zacílení kampaně v Brně ..................................................... 16")
add_p("   6.2 Modelový rozpočet a odhad výkonnostních ukazatelů .................................................... 17")
add_p("   6.3 Metodika A/B testování a porovnání kreativních variant ............................................... 18")
add_p("7. Customer Journey / STDC framework ................................................................................... 19")
add_p("   7.1 Fáze zákaznické cesty v kontextu studentského segmentu ............................................ 19")
add_p("   7.2 Matice STDC frameworku pro FP DROP ........................................................................... 20")
add_p("8. Vyhodnocování a měření ....................................................................................................... 21")
add_p("   8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace .................................................. 21")
add_p("   8.2 Vyhodnocovací cyklus a optimalizační hypotézy ........................................................... 22")
add_p("9. Závěr ........................................................................................................................................ 23")
add_p("10. Seznam použitých zdrojů ..................................................................................................... 24")
add_p("11. Přílohy .................................................................................................................................... 25")

# 1. Úvod
add_h1("1. Úvod")
add_p("Vysokoškolské prostředí prochází v posledních letech zásadní proměnou v oblasti komunikace mezi institucí a jejími studenty. Nastupující generace studentů, primárně reprezentovaná generací Z, vykazuje výrazně odlišné vzorce chování při konzumaci informací ve srovnání s předchozími ročníky. Tradiční formální kanály, jako jsou oficiální univerzitní webové nástěnky, hromadné e-mailové zprávy nebo nepřehledné informační systémy, se setkávají s klesající mírou pozornosti a nízkou mírou zapojení (engagementu). Studenti požadují bezprostřední, vizuálně atraktivní a především mobilně orientovaný obsah, který odpovídá jejich životnímu stylu a dynamice studentského života.")
add_p("Mobilní aplikace v tomto kontextu nepředstavují pouze další distribuční kanál, nýbrž klíčový styčný bod celého digitálního ekosystému. Schopnost doručit personalizovanou notifikaci, nabídnout interaktivní katalog, umožnit rychlou objednávku na jedno kliknutí a poskytnout zázemí pro komunitní identifikaci je pro moderní vzdělávací a přidružené komerční aktivity zásadní. Právě na pomezí komunitního života, moderního vysokoškolského marketingu a e-commerce vzniká projekt FP DROP, který je primárně zacílen na studenty a přátele Fakulty podnikatelské Vysokého učení technického v Brně (FP VUT).")
add_p("Fakulta podnikatelská VUT, sídlící v moderním univerzitním kampusu Pod Palackého vrchem na adrese Kolejní 29, sdružuje více než 3 000 studentů v bakalářských, magisterských a doktorských programech zaměřených na ekonomiku, management, systémové inženýrství a informatiku. Přestože fakulta disponuje silným akademickým zázemím a aktivním akademickým spolkem, dosud postrádala moderní, ucelený digitální nástroj, který by integroval studentský lifestyle, autentický streetwearový merch, aktuální časové kapacity semestru (deadliny, zápočty, zkoušková období) a přímou mobilní interakci. Výrobky s univerzitní tématikou byly často distribuovány nárazově, fyzicky či přes zastaralá webová rozhraní postrádající emocionální náboj a studentskou nadsázku.")
add_p("Hlavním cílem tohoto semestrálního projektu je komplexní návrh, prototypový vývoj a marketingová strategie mobilní aplikace FP DROP. Projekt pokrývá celý životní cyklus digitálního produktu od analýzy cílové skupiny přes funkční prototypování v jazyce Python ve vývojovém prostředí Visual Studio Code až po návrh akviziční PPC kampaně, obsahového marketingu a frameworku zákaznické cesty (STDC). Výsledkem předkládané práce je funkční softwarový artefakt doprovázený rigorózní marketingovou a analytickou studií, připravenou k praktickému nasazení na půdě Fakulty podnikatelské VUT v Brně.")

# 2. Specifikace
add_h1("2. Základní specifikace aplikace a cílový segment")
add_h2("2.1 Vymezení produktu FP DROP a řešená problematika")
add_p("FP DROP je koncipován jako specializovaná mobilní komunitní a e-commerce platforma určená pro studenty, vyučující a absolventy Fakulty podnikatelské VUT. Jádrem konceptu je princip tzv. limitovaných edicí neboli „dropů“. Místo celoročního nabízení statického, generického merche pracuje platforma s časově ohraničenými kolekcemi, které reagují na biorytmus akademického roku na Kolejní 29. Jednotlivé dropy (např. DROP 001 – First Semester, DROP 002 – Exam Season, DROP 003 – FP After Dark a DROP 004 – Brno Brutalism) odrážejí aktuální prožívání studentů – od euforie a seznamování v září přes kofeinem sycené deadliny v lednu až po jarní studentské večírky.")
add_p("Projekt reaguje na tři hlavní problémy současného stavu. Prvním problémem je roztříštěnost komunikace: informace o studentských aktivitách a komunitních předmětech jsou rozptýleny mezi neoficiální skupiny na sociálních sítích, univerzitní e-maily a fyzické nástěnky. Druhým problémem je nízká atraktivita a zastaralost dosavadního merchandisingu, který nerespektuje soudobé streetwearové trendy (oversized boxy střihy, těžká gramáž 240–420 GSM, čistá brutalistická typografie). Třetím problémem je absence přímého distribučního kanálu s nulovým poštovným, který by využíval přirozenou koncentraci studentů v areálu kampusu Pod Palackého vrchem.")

add_h2("2.2 Segmentace uživatelů a studentská komunita FP VUT")
add_p("Pro potřeby návrhu mobilní aplikace a navazující marketingové strategie byla provedena podrobná segmentace uživatelské báze. Z hlediska demografických a behaviorálních charakteristik dělíme uživatele do tří segmentů:")
add_p("1. Primární segment – Aktivní studenti prezenčního studia FP VUT (cca 2 200 osob): Studenti ve věku 19 až 25 let, kteří denně navštěvují přednášky a semináře v budovách P2, P3 a P4 na Kolejní 29 nebo bydlí na přilehlých vysokoškolských kolejích Pod Palackého vrchem. Tento segment vykazuje intenzivní využívání chytrých telefonů (průměrný screen time přesahuje 5,5 hodiny denně), preferuje rychlé nákupy přes Apple Pay / Google Pay, citlivě vnímá slevové akce navázané na průkaz ISIC a aktivně buduje svou sociální identitu v rámci ročníku.")
add_p("2. Sekundární segment – Kombinovaní studenti a čerství absolventi (cca 1 000 osob): Studenti kombinované formy studia a absolventi v horizontu 1 až 3 let po ukončení studia. Na fakultu docházejí nárazově (páteční a sobotní bloky), mají vlastní finanční příjem a nákup vnímají především jako nostalgické gesto, vyjádření sounáležitosti s alma mater nebo součást profesního networkingu.")
add_p("3. Terciární segment – Uchazeči o studium a středoškoláci (cca 3 500 osob ročně): Návštěvníci Dnů otevřených dveří, veletrhu Gaudeamus Brno a sledující sociálních sítí. V aplikaci hledají autentický pohled do zákulisí fakulty a neformální studentskou kulturu, která často rozhoduje o volbě vysoké školy.")

add_h2("2.3 Uživatelská persona a motivační faktory")
add_p("Uživatelská persona reprezentuje typického studenta:")
add_p("Jméno a věk: Bc. Martin Dvořák, 22 let\nRole: Student 1. ročníku navazujícího magisterského studia, Informační management, FP VUT\nBydliště: Koleje Pod Palackého vrchem, Kolejní 29, Brno\nTechnologické vybavení: iPhone 15 Pro, MacBook Air M2, 100% mobilní komunikace\nPlatformy: Instagram (Reels), TikTok, WhatsApp, Discord, IS VUT\nCíle: Absolvovat semestr, vybudovat síť kontaktů, vypadat dobře na kampusu, nosit kvalitní reprezentativní textil s nadsázkou\nFrustrace: Zastaralý merch, neosobní komunikace, nutnost platit poštovné\nVztah k FP DROP: Stahuje aplikaci kvůli limitovanému dropu triček 'HOT GIRLS GO TO FP', slevě na ISIC a bezplatnému osobnímu odběru na Kolejní 29.")

# 3. Prototyp
add_h1("3. Prototyp mobilní aplikace")
add_h2("3.1 Technické řešení a systémová architektura")
add_p("Prototyp mobilní aplikace FP DROP byl kompletně navržen a implementován v programovacím jazyce Python (verze 3.10+) v integrovaném vývojovém prostředí Visual Studio Code (VS Code). Volba Pythonu pro vývoj prototypu byla motivována vysokou rychlostí iterace, transparentní čitelností kódu a možností nabídnout studentům a hodnotitelům více režimů běhu bez nutnosti složitého instalování těžkopádných nativních mobilních SDK.")
add_p("Zdrojový kód aplikace je strukturován do samostatného modulu python_mobile_app/, který obsahuje následující klíčové komponenty:\n\n• main.py: Vstupní bod a koordinátor aplikace. Obsahuje CLI rozhraní (knihovna argparse), které zpracovává spouštěcí argumenty --web, --flet a volitelný parametr --port. Implementuje inteligentní fallback logiku: pokud uživatel zvolí spuštění nativního GUI přes framework Flet (--flet), avšak knihovna není v systému nainstalována, aplikace nevypíše fatální chybu, ale automaticky přepne na bezbariérový Web Mobile Simulator.\n\n• app_web.py: Nativní emulátor mobilního zařízení iPhone 16 Pro běžící na vestavěném HTTP serveru Pythonu (http.server a socketserver). Tato komponenta má naprosto nulové externí závislosti (Zero External Dependencies) a funguje na jakékoliv čisté instalaci Pythonu. Server dynamicky serializuje datové modely do JSONu, injektuje je do responzivní mobilní šablony využívající Tailwind CSS a zajišťuje běh na lokálním portu 5050. Součástí je automatické otevření prohlížeče (webbrowser.open).\n\n• app_flet.py: Alternativní nativní implementace využívající moderní framework Flet (postavený na Flutter pro Python). Tento režim umožňuje kompilaci do nativního okna s podporou hardwarové akcelerace, nativních gest a přepínání Dark Mode.\n\n• data.py: Centralizovaný datový model obsahující strukturované katalogy produktů (PRODUCTS), harmonogram a popisy edicí (DROPS), studentský profil (STUDENT_PROFILE) včetně věrnostního programu a provázání na akademický trigger systém.\n\n• .vscode/launch.json a run_app.bat: Konfigurační soubory pro komfortní spuštění. Pro VS Code je připraven debug profil pro spuštění stiskem klávesy F5. Pro Windows je vytvořen dávkový skript run_app.bat, který automaticky detekuje systémové příkazy py, python a python3 a eliminuje potíže s přesměrováním na Microsoft Store.")

add_h2("3.2 Uživatelské rozhraní a ergonomie ovládání")
add_p("Uživatelské rozhraní prototypu striktně respektuje ergonomické standardy moderních operačních systémů iOS a Android. Vizuální jazyk byl navržen v souladu s brutalistickou estetikou streetwearové značky FP DROP: hluboké černé pozadí (Jet Black #050505), vysoce kontrastní bílé typografické prvky (fonty Space Grotesk a JetBrains Mono), doplňková akcentní smaragdová barva (#10B981) indikující skladovou dostupnost a subtilní mikrointerakce.\n\nPohyb v aplikaci je zprostředkován spodní navigační lištou (Bottom Navigation Bar) s pěti primárními záložkami:\n1. HOME: Dynamický hero banner probíhajícího dropu (DROP 001 – FIRST SEMESTER) s indikátorem 'SKLADEM V BRNĚ', rychlý widget se studentským slevovým kódem FPVUT10 (10% sleva) a mřížka nejpopulárnějších produktů.\n2. SHOP: Dvousloupcový mobilní grid s rychlými kategoriálními filtry (ALL, T-SHIRTS, HOODIES, ACCESSORIES) s cenami v Kč a přímým vložením do košíku.\n3. DROPS: Vertikální časová osa prezentující ediční plán pro celý akademický rok (Drop 001 až 004) se statusy LIVE a COMING SOON.\n4. WISHLIST: Interaktivní správa uložených kousků před spuštěním dropu klepnutím na srdíčko.\n5. PROFILE: Personalizovaná obrazovka identity studenta (Demo Student, sample ISIC: DEMO-ISIC-0000), úroveň VIP SENIOR, získané ECTS kredity (142 ECTS) a historie objednávek s možností sledování stavu doručení na Kolejní 29.")

add_h2("3.3 Funkční princip prototypu a transakční logika")
add_p("Prototyp disponuje plně interaktivní stavovou logikou na klientské straně simulátoru. Uživatel může otevřít detail libovolného produktu s fotogalerií s čistou bílou typografií bez rušivých stínů, podrobnou materiálovou specifikací (100% bio bavlna 240 g/m² nebo 420 GSM fleece u mikin), přesným počtem zbývajících kusů v Brně a voličem velikostí (XS až XXL).\n\nNákupní košík dynamicky kalkuluje položky, aplikuje studentskou ISIC slevu 10 % a nastavuje dopravu s osobním odběrem na Kolejní 29 zdarma (0 Kč). Objednávka se dokončuje akcí '1-Click Zaplatit', která provede simulaci transakce, vyprázdní košík, zobrazí potvrzení a přesměruje uživatele do historie objednávek v profilu.")

add_h2("3.4 Možnosti dalšího rozvoje a produkční roadmapa")
add_p("Současná podoba prototypu představuje plnohodnotný 'proof-of-concept'. Pro přechod do produkčního provozu je navržena tato roadmapa:\n• Backendová infrastruktura: Přechod na REST API / GraphQL backend postavený na frameworku FastAPI (Python) nebo Node.js s relační databází PostgreSQL a cachovací vrstvou Redis.\n• Autentizace přes IS VUT: Implementace protokolu OAuth 2.0 / Shibboleth pro přihlašování přes oficiální VUT login, což zajistí 100% spolehlivé ověření statusu studenta a nároku na slevu.\n• Push notifikace (FCM): Nasazení Firebase Cloud Messaging pro okamžité informování o uvolnění nového dropu do prodeje (Drop Alarm), blížícím se vyprodání velikostí a oznámení o připravenosti balíčku k vyzvednutí na recepci Kolejní 29.\n• Platební brána: Napojení certifikované platební brány (Stripe / Comgate / Apple Pay / Google Pay) splňující standard PCI-DSS.")

# 4. Business profil
add_h1("4. Přístup k tvorbě business profilu")
add_h2("4.1 Koncepce webové prezentace a informační architektura")
add_p("Mobilní aplikace FP DROP je podpořena reprezentativním webovým business profilem (landing page), který slouží jako konverzní brána pro desktopové uživatele, vyhledávače a marketingové kampaně. Webová prezentace plní funkci oficiálního uzlu, buduje důvěryhodnost značky a stimuluje stažení mobilní aplikace.\n\nInformační architektura jednostránkové webové prezentace (SPA) zahrnuje:\n1. Hero sekce: Dominantní claim 'YOUR UNIVERSITY. YOUR UNIFORM.', velkoformátová fotografie z kampusu, odpočet do konce aktuálního dropu a tlačítka 'Stáhnout mobilní aplikaci' a 'Prozkoumat kolekci'.\n2. O projektu a filozofie: Studentský streetwear pro FP VUT, udržitelná produkce (100% bio bavlna, lokální sítotisk v Brně, etická výroba) a hrdost na fakultu sídlící na Kolejní 29.\n3. Přehled funkcí aplikace: Přednostní přístup k dropům o 24 hodin dříve, automatická ISIC sleva 10 %, sledování stavu přípravy objednávky a push notifikace.\n4. Lookbook & Aktuální Drop: Vizuální galerie modelů přímo z areálu kampusu Pod Palackého vrchem a Technologického parku.\n5. Studentská zóna & FAQ: Odpovědi na dotazy ohledně velikostí, osobního odběru na fakultě, výměny zboží a ISIC slev.\n6. Zápatí s rychlými odkazy: Kontaktní údaje, propojení na sociální sítě (@fp_drop), odkaz na stažení dokumentace a spuštění simulátoru.")

add_h2("4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity")
add_p("Pro kontinuální optimalizaci konverzního poměru (CRO) a pochopení chování návštěvníků je web vybaven analytickým měřením kombinujícím Google Analytics 4 (GA4) a Microsoft Clarity.\n\nGoogle Analytics 4 sleduje klíčové mikro a makro konverzní události:\n• app_download_click: Kliknutí na odkaz ke stažení mobilní aplikace (iOS vs. Android).\n• coupon_copied: Zkopírování slevového kódu FPVUT10 do schránky.\n• view_item_detail: Zobrazení detailní specifikace konkrétního kusu oblečení.\n• simulator_opened: Spuštění vestavěného mobilního simulátoru přímo na webu.\n\nMicrosoft Clarity doplňuje kvantitativní data o teplotní mapy (heatmaps) a anonymizované nahrávky relací (session recordings). Nástroj identifikuje tzv. 'dead clicks' (kliky na statické prvky) a 'rage clicks' (opakované frustrované klikání při pomalé odezvě), což poskytuje okamžitou zpětnou vazbu pro optimalizaci rozvržení prvků a zkrácení konverzní cesty.")

# 5. Sociální sítě
add_h1("5. Přístup k tvorbě obsahu pro sociální sítě")
add_h2("5.1 Strategie působení na síti Instagram")
add_p("Sociální sítě představují pro projekt FP DROP primární akviziční i retenční kanál. Jako hlavní platforma byl vybrán Instagram (doplněný o organický TikTok). Instagram v segmentu vysokoškoláků ve věku 19–25 let v ČR dosahuje přes 84% penetrace a slouží jako primární vizuální vyhledávač módních trendů a komunitního dění.\n\nStrategie profilu @fp_drop je postavena na principu absolutní autenticity. Značka se vyhýbá sterilním fotobankovým snímkům. Využívá estetiku 'lo-fi' fotografie focené na analogové 35mm kinofilmy přímo v prostorách FP VUT (chodby, posluchárna P384, respirium, koleje Pod Palackého vrchem) a zapojuje skutečné studenty v rolích modelů a tvůrců obsahu.")

add_h2("5.2 Obsahové formáty, publikační harmonogram a tón komunikace")
add_p("Obsahový plán kombinuje tři základní formáty sítě Instagram:\n\n1. Instagram Reels (3× týdně): Formát s nejvyšším virálním dosahem. Studentský humor, parodie na zápočtový týden a zkouškové, dynamické představení nového merche a 'day in the life' střípky ze studia na FP VUT s trending audio stopami.\n\n2. Instagram Stories (4–8 denně): Ankety, kvízy o fakultě, odpočty do spuštění dropu (Countdown Sticker), zákulisní pohledy z výroby textilu a reposty obsahu studentů (User Generated Content – UGC).\n\n3. Karusely ve feedu (1–2× týdně): Lookbooky, tabulky velikostí, gramáž látek a příběhy stojící za slogany.\n\nTón komunikace (Tone of Voice) je sebevědomý, odlehčený, studentsky neformální, avšak nikdy vulgární. Pracuje s nadsázkou a interními fakultními reáliemi ('ECTS are temporary, drip is forever', 'Fronta na kafe v respiriu').")

add_h2("5.3 Případová ukázka příspěvku a storyboard krátkého videa")
add_p("Návrh feed příspěvku (Karusel – 3 snímky):\n• Vizuál: Snímek 1 – Dvojice studentů na schodech budovy P2 na Kolejní 29 v tričkách 'HOT GIRLS GO TO FP' a mikině 'EXAM SURVIVOR'. Snímek 2 – Makro detail vyšitého štítku a hutné 240g bavlny. Snímek 3 – Grafika mobilní aplikace se slevovým kódem.\n• Text příspěvku: 'Semestr oficiálně začal. Starý sešity vyhozený, nový předměty zapsaný a tvůj šatník potřebuje upgrade. DROP 001 právě přistál v mobilní aplikaci FP DROP. 100% bio bavlna, oversized střih a nulový poštovný při vyzvednutí na Kolejní 29. Zadej kód FPVUT10 a ušetři 10 % s ISICem. Odkaz na stažení v biu.'\n• Hashtagy: #FPVUT #VUTvBrne #FakultaPodnikatelska #Kolejni29 #BrnoStudents #FPDROP #StudentStreetwear\n\nStoryboard krátkého videa (Instagram Reels / TikTok – 15 sekund):\n• 0:00–0:03 (Hook): Student běžící po schodech na Kolejní 29 s kávou. Text na obrazovce: 'Když máš za 2 minuty přednášku z managementu, ale outfit musí být 10/10.'\n• 0:03–0:08 (Dynamický střih): Rychlé přechody studentů v prostorách fakulty ukazující detaily triček a mikin v pohybu.\n• 0:08–0:12 (Představení aplikace): Pohled na displej iPhonu – otevření aplikace FP DROP, přidání trička do košíku jedním klikem a volba 'Kolejní 29 – Osobní odběr zdarma'.\n• 0:12–0:15 (Call to Action): Závěrečný packshot s logem aplikace a výzvou: 'Stahuj aplikaci FP DROP. Limitovaná edice DROP 001 LIVE.'")

# 6. PPC
add_h1("6. Přístup k PPC reklamě")
add_h2("6.1 Strategické cíle a detailní zacílení kampaně v Brně")
add_p("Placená výkonnostní reklama (PPC) plní roli akceleračního nástroje při spouštění nových dropů. Jelikož je rozpočet studentského projektu limitovaný, kampaň je hyper-lokálně zacílena na relevantní komunitu v Brně prostřednictvím Meta Ads (Instagram Stories a Reels).\n\nParametry cílení v Meta Ads Manageru:\n• Geografické zacílení: Brno a okolí do 15 km se zvýšenou vahou na lokalitu Královo Pole / Medlánky (radius 2 km kolem kampusu Kolejní 29).\n• Věk a jazyk: 18–26 let, čeština a slovenština (zohlednění početné slovenské komunity na VUT).\n• Zájmy a chování: Vysokoškolské vzdělávání, VUT v Brně, Fakulta podnikatelská VUT, streetwear, městská móda, vysokoškoláci.\n• Vyloučení: Uživatelé mimo věk 18–26 let a uživatelé trvale žijící mimo Jihomoravský kraj.")

add_h2("6.2 Modelový rozpočet a odhad výkonnostních ukazatelů")
add_p("Modelový měsíční rozpočet činí 15 000 Kč rozdělený do 3 fází:\n1. Fáze Awareness (Povědomí): 35 % rozpočtu (5 250 Kč), 175 000 zobrazení, odhadované CPC 2,50 Kč, CTR 1,2 %, cíl 2 100 kliků na odkaz.\n2. Fáze Traffic & Install (Návštěvnost a stažení): 45 % rozpočtu (6 750 Kč), 135 000 zobrazení, CPC 3,80 Kč, CTR 1,8 %, cíl 1 776 prokliků a 530 instalací.\n3. Fáze Retargeting (Košík a nákup): 20 % rozpočtu (3 000 Kč), 30 000 zobrazení, CPC 6,50 Kč, CTR 3,2 %, cíl 460 prokliků a 95 dokončených objednávek.\nCelkem modelová kampaň: 15 000 Kč, 340 000 zobrazení, průměrné CPC 3,65 Kč, průměrné CTR 1,85 %, celkem 4 336 návštěv a 625 aktivací.")

add_h2("6.3 Metodika A/B testování a porovnání kreativních variant")
add_p("A/B testování porovnává dvě varianty:\n• Varianta A (Komunitní / Emocionální motiv): Headline 'HOT GIRLS GO TO FP – A ty studuješ kde?', vizuál momentky ze schodů fakulty P2, sdělení sounáležitosti a životního stylu, CTA 'STÁHNOUT APLIKACI'.\n• Varianta B (Produktový / Racionální motiv): Headline 'OFICIÁLNÍ MERCH FP VUT – Kvalita, co vydrží zkouškový.', studiový vizuál s důrazem na 420g bio bavlnu, ISIC slevu 10 % a odběr zdarma, CTA 'ZÍSKAT 10% SLEVU'.\nHypotéza: Varianta A dosáhne vyššího CTR (> 2,2 %) a levnější akvizice, Varianta B získá vyšší konverzní poměr objednávek (> 4,5 %).")

# 7. STDC
add_h1("7. Customer Journey / STDC framework")
add_h2("7.1 Fáze zákaznické cesty v kontextu studentského segmentu")
add_p("Framework STDC (See – Think – Do – Care) podle Avinashe Kaushika strukturuje marketingové aktivity podle nákupního rozpoložení studenta:\n1. Fáze SEE (Povědomí): Široké publikum studentů FP VUT. Uživatel nehledá nové oblečení, vnímá podněty na kampusu, vidí spolužáky v tričkách nebo narazí na Reels video.\n2. Fáze THINK (Zvažování): Student značku zaregistroval, líbí se mu design, zkoumá tabulku velikostí, ověřuje kvalitu materiálu a zjišťuje slevu.\n3. Fáze DO (Konverze): Okamžik rozhodnutí. Student stahuje aplikaci, vkládá kousek do košíku, zadává kód FPVUT10 a volí bezplatné vyzvednutí na Kolejní 29.\n4. Fáze CARE (Péče a loajalita): Převzetí objednávky, nošení merche, sdílení fotek na sociálních sítích a zapnutí notifikací na další drop.")

add_h2("7.2 Matice STDC frameworku pro FP DROP")
add_p("• Fáze SEE: Cíl: pobavit se, zjistit novinky. Kanál: Instagram Reels, TikTok, plakáty na Kolejní 29. Obsah: virální videa z kampusu. CTA: 'Sleduj @fp_drop'. KPI: dosah, video views.\n• Fáze THINK: Cíl: ověřit velikost a materiál. Kanál: Web landing page, Stories, mobilní simulátor. Obsah: specifikace 240g bavlny, unboxing. CTA: 'Prozkoumat kolekci'. KPI: CTR, čas na webu, kopírování kódu.\n• Fáze DO: Cíl: rychle objednat s odběrem zdarma. Kanál: mobilní aplikace FP DROP, retargetingové reklamy. Obsah: stav skladu v Brně, 1-Click nákup. CTA: 'Koupit na 1-Click'. KPI: konverzní poměr, instalace, AOV.\n• Fáze CARE: Cíl: získat status VIP studenta. Kanál: push notifikace, e-mail do VIP klubu, Stories UGC. Obsah: výzva k označení #FPDROP, přednostní přístup k Drop 002. CTA: 'Sdílej svůj fit'. KPI: opakovaný nákup, UGC zmínky.")

# 8. Měření
add_h1("8. Vyhodnocování a měření")
add_h2("8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace")
add_p("Systém metrik rozdělený do 4 oblastí:\n1. Webová prezentace (Landing Page): Unikátní návštěvníci (cíl > 5 000/měsíc), Engagement Rate (> 65 %), konverze stažení aplikace (> 12 %), hloubka scrollu (GA4, Microsoft Clarity).\n2. Sociální sítě (Instagram / TikTok): Měsíční dosah (> 15 000 účtů), Engagement Rate na post (> 5,8 %), zhlédnutí Reels (> 3 000/video), kliky na odkaz v biu (Meta Business Suite).\n3. Placená PPC reklama (Meta Ads): Průměrné CTR (> 1,8 %), CPC (< 4,00 Kč), cena za instalaci CPI (< 14,00 Kč), ROAS (> 3,8x) v Meta Ads Manageru.\n4. Mobilní aplikace (Prototyp / Produkce): Měsíční aktivní uživatelé MAU (> 1 200 studentů), retence D30 (> 35 %), konverzní poměr košíku (> 8,5 %) v aplikační analytice.")

add_h2("8.2 Vyhodnocovací cyklus a optimalizační hypotézy")
add_p("Optimalizační cyklus probíhá v dvoutýdenních sprintu Build-Measure-Learn podle metodiky Lean Startup. Data z Microsoft Clarity a GA4 identifikují třecí plochy (např. nechtěné klikání na statické prvky) a tým nasazuje A/B testy k jejich odstranění.")

# 9. Závěr
add_h1("9. Závěr")
add_p("Předložený semestrální projekt prokázal proveditelnost, technologickou životaschopnost a marketingový potenciál komunitního digitálního produktu FP DROP určeného pro studenty Fakulty podnikatelské VUT v Brně. V souladu se zadáním byl vyvinut funkční prototyp mobilní aplikace v programovacím jazyce Python, který byl provázán s detailní specifikací uživatelských segmentů, architekturou webového business profilu a robustní marketingovou strategií pokrývající sociální sítě, PPC reklamu a model zákaznické cesty STDC.")
add_p("Hlavní přínos projektu spočívá v překonání tradičního formálního pojetí univerzitního merchandisingu. Namísto pasivního prodeje generických upomínkových předmětů staví FP DROP na autentické identitě studentů, respektuje jejich každodenní potřeby na kampusu Kolejní 29 a nabízí prvotřídní textilní zpracování doplněné o moderní mobilní nákupní zkušenost. Technické řešení prototypu, umožňující okamžité spuštění jak ve formě zero-dependency webového simulátoru, tak ve formě nativního Flet rozhraní, poskytuje vynikající základ pro budoucí produkční vývoj.")
add_p("Mezi limity současného řešení patří především lokální charakter běhu prototypu bez perzistentního cloudového backendu a absence přímé integrace na oficiální rozhraní Informačního systému VUT. Tyto limity však byly v práci detailně analyzovány a byla navržena jasná roadmapa pro jejich odstranění v navazující fázi projektu. Projekt FP DROP představuje komplexní, akademicky i prakticky podložený koncept, který má reálný potenciál posílit prestiž a komunitní soudržnost Fakulty podnikatelské Vysokého učení technického v Brně.")

# 10. Zdroje
add_h1("10. Seznam použitých zdrojů")
add_p("1. CHAFFEY, Dave a Fiona ELLIS-CHADWICK. Digital Marketing: Strategy, Implementation and Practice. 7th ed. Harlow: Pearson, 2019. ISBN 978-1-292-22341-4.")
add_p("2. KAUSHIK, Avinash. See-Think-Do-Care: A Winning Consumer-Oriented Marketing Framework. Occam's Razor by Avinash Kaushik [online]. 2015. Dostupné z: https://www.kaushik.net/avinash/see-think-do-care-win-content-marketing-framework/")
add_p("3. KOTLER, Philip, Kevin Lane KELLER a Alexander CHERNEV. Marketing Management. 16th ed. Harlow: Pearson, 2021. ISBN 978-0-137-34415-4.")
add_p("4. KRUG, Steve. Nenuťte uživatele přemýšlet!: Korigovaný přístup k použitelnosti webu a mobilních aplikací. 3. vyd. Brno: BizBooks, 2014. ISBN 978-80-265-0242-5.")
add_p("5. NORMAN, Donald A. The Design of Everyday Things: Revised and Expanded Edition. New York: Basic Books, 2013. ISBN 978-0-465-05065-9.")
add_p("6. RIES, Eric. The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses. New York: Crown Business, 2011. ISBN 978-0-307-88789-4.")
add_p("7. VUT V BRNĚ. Fakulta podnikatelská: Oficiální webové stránky a strategické dokumenty [online]. Brno: VUT, 2026. Dostupné z: https://www.fbm.vutbr.cz/")
add_p("8. VUT V BRNĚ. Jednotný vizuální styl Vysokého učení technického v Brně: Grafický manuál [online]. Brno: VUT, 2024. Dostupné z: https://www.vut.cz/vut/symboly")
add_p("9. ČSN ISO 690:2022. Informace a dokumentace – Pravidla pro bibliografické odkazy a citace informačních zdrojů. Praha: Česká agentura pro standardizaci, 2022.")
add_p("10. PYTHON SOFTWARE FOUNDATION. Python 3.12 Documentation: The Python Standard Library [online]. Wilmington: PSF, 2025. Dostupné z: https://docs.python.org/3.12/")
add_p("11. FLET PROJECT. Flet: Build Flutter apps in Python [online]. 2026. Dostupné z: https://flet.dev/docs/")

# 11. Přílohy
add_h1("11. Přílohy")
add_p("[PŘÍLOHA 1 – SCREENSHOT HLAVNÍ OBRAZOVKY MOBILNÍHO SIMULÁTORU]\nNáhled úvodní obrazovky HOME v emulátoru iPhone 16 Pro s hero bannerem DROP 001 a slevovým widgetem FPVUT10", italic=True)
add_p("[PŘÍLOHA 2 – SCREENSHOT KATALOGU PRODUKTŮ A FILTROVÁNÍ]\nDvousloupcový responzivní katalog se zobrazením produktů 'HOT GIRLS GO TO FP', 'NO SLEEP' a filtrací kategorií", italic=True)
add_p("[PŘÍLOHA 3 – SCREENSHOT PROSTŘEDÍ VS CODE A SPUŠTĚNÍ PROTOTYPU]\nSnímek integrovaného vývojového prostředí Visual Studio Code se strukturou souborů main.py, data.py a terminálovým výstupem", italic=True)
add_p("[PŘÍLOHA 4 – DIAGRAM SYSTÉMOVÉ ARCHITEKTURY EKOSYSTÉMU FP DROP]\nSchéma propojení webové landing page, mobilního simulátoru, analytických nástrojů GA4/Clarity a Meta Ads", italic=True)
add_p("[PŘÍLOHA 5 – NÁVRHY REKLAMNÍCH FORMÁTŮ META ADS PRO A/B TESTOVÁNÍ]\nGrafické vizuály varianty A (komunitní motiv na kampusu Kolejní 29) a varianty B (produktový detail s ISIC slevou)", italic=True)

rtf_content.append("}")

full_rtf = "\n".join(rtf_content)

with open("/app/applet/public/FP_DROP_projekt_VUT.rtf", "w", encoding="ascii", errors="ignore") as f:
    f.write(full_rtf)

with open("/app/applet/FP_DROP_projekt_VUT.rtf", "w", encoding="ascii", errors="ignore") as f:
    f.write(full_rtf)

print("✅ RTF súbor úspešne vygenerovaný: /app/applet/public/FP_DROP_projekt_VUT.rtf")
