import { LookbookItem, Persona, TriggerSystemItem, STDCStage, SocialMediaPost, PPCCampaign } from '../types';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'lb-01',
    title: 'LOOK 01 — FIRST SEMESTER ARRIVAL',
    subtitle: 'Kolejní 29 Campus, Ranní světlo',
    dropId: 'drop-001',
    location: 'Brno, Královo Pole',
    vibe: 'Brutalist Concrete & Heavyweight Cotton',
    imageAlt: 'Student v černém oversized tričku HOT GIRLS GO TO FP s plátěnou taškou před moderní betonovou architekturou',
    featuredProductIds: ['prod-01', 'prod-19', 'prod-17'],
    hotspots: [
      { x: 48, y: 38, productId: 'prod-01', label: 'HOT GIRLS GO TO FP TEE — 349 Kč' },
      { x: 32, y: 65, productId: 'prod-19', label: 'CAMPUS SURVIVAL TOTE — 249 Kč' },
      { x: 49, y: 15, productId: 'prod-17', label: 'FP DAD CAP — 349 Kč' }
    ],
    photographer: 'Tomáš M. (FP VUT Student)'
  },
  {
    id: 'lb-02',
    title: 'LOOK 02 — EXAM MARATHON',
    subtitle: 'Studovna & Knihovna VUT Kolejní',
    dropId: 'drop-002',
    location: 'Knihovna VUT',
    vibe: '450 GSM Heavy Hoodie & Espresso Double',
    imageAlt: 'Student v masivní mikině EXAM SURVIVOR a ponožkách Kolejní 29 soustředěný na notebook',
    featuredProductIds: ['prod-14', 'prod-02', 'prod-21'],
    hotspots: [
      { x: 50, y: 35, productId: 'prod-14', label: 'EXAM SURVIVOR HOODIE — 949 Kč' },
      { x: 42, y: 55, productId: 'prod-02', label: 'NO SLEEP JUST DEADLINES TEE — 349 Kč' },
      { x: 60, y: 85, productId: 'prod-21', label: 'KOLEJNÍ 29 SOCKS — 179 Kč' }
    ],
    photographer: 'Viktorie K. (Brno Studio)'
  },
  {
    id: 'lb-03',
    title: 'LOOK 03 — FP AFTER DARK',
    subtitle: 'Jakubské náměstí & Noční Brno',
    dropId: 'drop-003',
    location: 'Jakubské náměstí, Brno',
    vibe: 'Nightline Streetwear, Neon Reflections',
    imageAlt: 'Dvojice studentů v nočním městě v trikách FP AFTER DARK a kšiltovce NIGHTLINE',
    featuredProductIds: ['prod-04', 'prod-18', 'prod-08'],
    hotspots: [
      { x: 45, y: 40, productId: 'prod-04', label: 'FP AFTER DARK TEE — 349 Kč' },
      { x: 55, y: 18, productId: 'prod-18', label: 'NIGHTLINE SNAPBACK — 379 Kč' }
    ],
    photographer: 'Tomáš M.'
  },
  {
    id: 'lb-04',
    title: 'LOOK 04 — MADE IN BRNO',
    subtitle: 'Villa Tugendhat & Funkcionalismus',
    dropId: 'drop-004',
    location: 'Černá Pole, Brno',
    vibe: 'Minimal Architecture & Local Identity',
    imageAlt: 'Modelka v crewnecku Brno Brutalism a tričku Brno is Home před čistými geometrickými liniemi',
    featuredProductIds: ['prod-15', 'prod-11', 'prod-20'],
    hotspots: [
      { x: 50, y: 32, productId: 'prod-15', label: 'BRNO BRUTALISM CREWNECK — 799 Kč' },
      { x: 48, y: 60, productId: 'prod-11', label: 'BRNO IS HOME TEE — 349 Kč' },
      { x: 28, y: 70, productId: 'prod-20', label: 'ECTS COLLECTOR BAG — 279 Kč' }
    ],
    photographer: 'Adam P. (Brno Editorial)'
  }
];

export const PERSONAS: Persona[] = [
  {
    id: 'p-01',
    name: 'Tereza Nováková',
    title: 'Studentka 1. ročníku (Prvák na FP VUT)',
    age: 19,
    studyYear: '1. ročník bakalářského studia (Ekonomika a management)',
    faculty: 'Fakulta podnikatelská VUT v Brně',
    avatarSeed: 'tereza',
    quote: '„Přistěhovala jsem se do Brna z malého města a chci se cítit součástí fakulty, ale odmítám nosit trapný reklamní textil.“',
    bio: 'Tereza právě nastoupila na FP VUT. Bydlí na kolejích Pod Palackého vrchem. Hledá nové přátele, orientuje se v univerzitním systému a sleduje trendy na TikToku a Instagramu. Klade důraz na estetiku, ráda chodí do brněnských kaváren s notebookem a chce nosit věci, které mají styl.',
    motivations: [
      'Touha zapadnout do univerzitní komunity a najít přátele',
      'Vizuální sebeprezentace na sociálních sítích a kampusu',
      'Kvalitní a pohodlné oblečení na dlouhé přednášky a do studovny',
      'Originální kousky, které nemá každý z běžného řetězce'
    ],
    painPoints: [
      'Běžný školní merch je nekvalitní a má trapný korporátní design',
      'Omezený studentský rozpočet (nemůže kupovat mikiny za 3 000 Kč)',
      'Strach z nevhodné velikosti při online nákupu textilu',
      'Chaos v prvním semestru a stres z nových požadavků'
    ],
    buyingBehavior: [
      '90 % nákupních impulzů přichází přes Instagram Stories a Reels',
      'Nakupuje primárně na mobilním telefonu večer v posteli',
      'Preferuje platbu přes Apple Pay a doručení do Zásilkovny (Z-Box na kolejích)',
      'Oceňuje slevový kód pro prváky (např. 10 % na první nákup)'
    ],
    socialMedia: ['Instagram (denně 2,5 h)', 'TikTok (denně 1,5 h)', 'BeReal', 'Spotify'],
    trigger: 'Vidí spolužačku na přednášce v tričku „HOT GIRLS GO TO FP“ nebo narazí na virální Reel z kampusu.',
    objection: '„Nebude to po dvou vypráních vypadat jako hadr na podlahu?“',
    conversionHook: 'Transparentní specifikace materiálu (240 g/m² těžká bio bavlna), fotky reálných studentek a garance bezplatné výměny velikosti.',
    preferredProducts: ['HOT GIRLS GO TO FP TEE', 'CAMPUS SURVIVAL TOTE BAG', 'FP 001 SIGNATURE HOODIE']
  },
  {
    id: 'p-02',
    name: 'Matěj Kovář',
    title: 'Současný student 3. ročníku (Mazák na FP VUT)',
    age: 22,
    studyYear: '3. ročník bakalářského studia (Finance a obchodní podnikání)',
    faculty: 'Fakulta podnikatelská VUT v Brně',
    avatarSeed: 'matej',
    quote: '„Přežil jsem statistiku, mikro i makro. Zkouškové je o kofeinu a mikině, ve které můžeš přespat ve studovně.“',
    bio: 'Matěj je typický student vyššího ročníku. Kombinuje školu s part-time prací v brněnské marketingové agentuře. Má rád streetwear kulturu, sleduje dropy značek a cení si sebeironického studentského humoru. Zná všechny zkratky a insiderské vtipy o VUT.',
    motivations: [
      'Nadsázka a vyjádření sounáležitosti s fakultní komunitou',
      'Funkční streetwear s heavyweight gramáží a boxy střihem',
      'Pocit exkluzivity z limitovaných dropů (FOMO)',
      'Reprezentace fakulty v městském prostředí i mimo školu'
    ],
    painPoints: [
      'Nenávidí přehnaně uhlazený korporátní marketing',
      'Nedostatek autentického merchu s dobrým střihem pro vysoké postavy',
      'Ztráta času s komplikovaným checkoutem na desktopu',
      'Permanentní nedostatek času v zápočtovém týdnu'
    ],
    buyingBehavior: [
      'Kupuje okamžitě v den spuštění dropu, pokud ho zaujme slogan',
      'Často objednává najednou triko + mikinu pro dosažení dopravy zdarma',
      'Reaguje na countdown a omezený počet kusů (scarcity messaging)',
      'Preferuje osobní odběr na Kolejní 29 mezi přednáškami'
    ],
    socialMedia: ['Instagram', 'LinkedIn (hledá stáže)', 'Reddit (r/czech, r/brno)', 'Twitter/X'],
    trigger: 'E-mailové upozornění nebo Story oznamující spuštění DROP 002: EXAM SEASON s mikinou „EXAM SURVIVOR“.',
    objection: '„Stihne to dorazit ještě před začátkem zkouškového?“',
    conversionHook: 'Rychlé odeslání do 24 hodin, možnost vyzvednutí přímo na Kolejní 29 zdarma a detailní tabulka rozměrů mikin.',
    preferredProducts: ['NO SLEEP JUST DEADLINES TEE', 'EXAM SURVIVOR HOODIE', 'KOLEJNÍ 29 SOCKS']
  },
  {
    id: 'p-03',
    name: 'Ing. Filip Svoboda',
    title: 'Absolvent FP VUT & Juniorní finanční analytik',
    age: 26,
    studyYear: 'Absolvent inženýrského studia (Promoce 2024)',
    faculty: 'Fakulta podnikatelská VUT v Brně',
    avatarSeed: 'filip',
    quote: '„Pět let na FP bylo nejlepších pět let života. Nosím Brno a fakultu hrdě i teď v kanclu v technologickém parku.“',
    bio: 'Filip úspěšně dokončil inženýrské studium na FP před dvěma lety a nyní pracuje jako business analytik v technologické firmě v Brně. Má stabilní příjem, stále se stýká s partou z vejšky a rád vzpomíná na studentská léta. Chce podpořit studentskou iniciativu.',
    motivations: [
      'Nostalgie ke studentským letům a hrdost na absolvovanou fakultu',
      'Lokální patriotismus vůči městu Brnu a čtvrti Královo Pole',
      'Kvalitní minimalistické oblečení vhodné pro Casual Friday',
      'Podpora aktivních studentů a jejich reálných projektů'
    ],
    painPoints: [
      'Nechce nosit věci s příliš křiklavými nebo vulgárními nápisy',
      'Vyžaduje vysokou trvanlivost materiálu a prémiový vzhled',
      'Má málo volného času sledovat sociální sítě celý den'
    ],
    buyingBehavior: [
      'Vyšší průměrná hodnota objednávky (AOV > 1 200 Kč)',
      'Čte obsahové články o zákulisí značky a architektuře Brna',
      'Platí platební kartou online s doručením kurýrem na adresu',
      'Často kupuje dárky i pro své přátele z fakulty'
    ],
    socialMedia: ['LinkedIn', 'Instagram', 'Strava', 'Podcasty (Čestmír, Insider)'],
    trigger: 'Článek o zákulisí vzniku FP DROP sdílený na LinkedInu nebo alumni skupině.',
    objection: '„Není to jen pro náctileté prváky?“',
    conversionHook: 'Subtilní designy z edice BRNO (Brno Brutalism Crewneck, Made in Brno Tee) s čistou architektonickou estetikou.',
    preferredProducts: ['BRNO BRUTALISM CREWNECK', 'MADE IN BRNO TEE', 'BRNO VIBES STICKER PACK']
  }
];

export const TRIGGER_SYSTEM: TriggerSystemItem[] = [
  {
    id: 'trig-01',
    triggerName: 'Začátek nového akademického roku (Září/Říjen)',
    studentContext: 'Prváci přicházejí do cizího města, hledají sounáležitost; vyšší ročníky obnovují šatník po prázdninách.',
    brandResponse: 'Launch DROP 001: FIRST SEMESTER s kampaní „Your University. Your Uniform.“',
    uiTouchpoint: 'Homepage Hero Banner s odpočtem a přímým CTA „SHOP DROP 001“, promo kód PRVAK10.',
    expectedOutcome: 'Okamžitá vlna objednávek a registrací k newsletteru pro získání 10% slevy.',
    kpiMetric: 'Noví zákazníci, Conversion Rate > 3,5 %, Newsletter signups'
  },
  {
    id: 'trig-02',
    triggerName: 'Začátek zkouškového období a zápočtového týdne (Leden/Květen)',
    studentContext: 'Vysoký stres, hodiny prosezené v knihovně a u počítače, touha po humoru a pohodlném teplém oblečení.',
    brandResponse: 'Launch DROP 002: EXAM SEASON s mikinami EXAM SURVIVOR a tričky NO SLEEP JUST DEADLINES.',
    uiTouchpoint: 'Tematická kategorie v menu „Zkouškové přežití“, bundle slevy (mikina + ponožky Kolejní 29).',
    expectedOutcome: 'Zvýšení průměrné hodnoty objednávky (AOV) prodejem těžkých mikin s vyšší marží.',
    kpiMetric: 'Average Order Value (AOV > 800 Kč), Prodeje kategorie HOODIES'
  },
  {
    id: 'trig-03',
    triggerName: 'Spatření spolužáka v triku na chodbě Kolejní 29 / v menze',
    studentContext: 'Social Proof v reálném světě: Student vidí atraktivní kus oblečení s trefným sloganem na živém člověku.',
    brandResponse: 'Diskrétní tkaný štítek na lemu trika „FP DROP — fpdrop.cz“ + snadná vyhledatelnost.',
    uiTouchpoint: 'Rychlé mobilní vyhledávání na webu s našeptávačem sloganů („hot girls“, „no sleep“).',
    expectedOutcome: 'Direct & Organic Search návštěvnost s okamžitým přechodem na detail konkrétního produktu.',
    kpiMetric: 'Direct Traffic, Vyhledávací dotazy v interním vyhledávání'
  },
  {
    id: 'trig-04',
    triggerName: 'Zhlédnutí virálního Instagram Reelu z brněnského kampusu',
    studentContext: 'Zábavné video srovnávající očekávání vs. realitu studia na FP nebo rozhovory se studenty.',
    brandResponse: 'Odkaz v biu směřující přímo na dynamickou vstupní stránku daného dropu (Drop Landing Page).',
    uiTouchpoint: 'Mobile-first zobrazení optimalizované pro otevření v in-app prohlížeči Instagramu, 1-click Apple Pay.',
    expectedOutcome: 'Rychlý impulsivní nákup bez nutnosti složité registrace.',
    kpiMetric: 'Mobile Conversion Rate, Nákupy přes mobil > 80 %'
  },
  {
    id: 'trig-05',
    triggerName: 'Indikace nízkého stavu skladu („Poslední 4 kusy skladem“)',
    studentContext: 'Strach ze zmeškání příležitosti (FOMO) u limitovaných streetwearových sérií.',
    brandResponse: 'Dynamický štítek „LAST PIECES“ na produktové kartě a detailu s reálným odpočtem kusů.',
    uiTouchpoint: 'Červený pulzující indikátor „Pouze 4 kusy ve velikosti L“ v nákupním modulu.',
    expectedOutcome: 'Odstranění váhání a zkrácení doby od zobrazení produktu k přidání do košíku.',
    kpiMetric: 'Add to Cart Rate, Snížení opuštění košíku'
  },
  {
    id: 'trig-06',
    triggerName: 'Dosažení hranice dopravy zdarma (Košík dosáhl např. 700 Kč)',
    studentContext: 'Student nechce platit 69 Kč za dopravu, raději si přihodí drobný doplněk.',
    brandResponse: 'Interaktivní progress bar v košíku: „Přidej ještě zboží za 301 Kč a dopravu máš ZDARMA!“',
    uiTouchpoint: '1-click doporučení doplňků přímo v košíku (Ponožky Kolejní 29 za 179 Kč nebo samolepky za 99 Kč).',
    expectedOutcome: 'Okamžitý cross-sell doplňků a navýšení finální hodnoty košíku.',
    kpiMetric: 'Cross-sell conversion rate, Nárůst AOV o 25 %'
  }
];

export const STDC_FRAMEWORK: STDCStage[] = [
  {
    stage: 'SEE',
    title: 'SEE (Povědomí a pozornost)',
    definition: 'Nejširší adresné publikum: Všichni studenti vysokých škol v Brně (cca 65 000 studentů), se zaměřením na studenty FP VUT (cca 3 500 studentů), kteří mají zájem o módu, studentský život a městskou kulturu.',
    channels: ['Instagram Reels', 'TikTok', 'Plakáty a samolepky v kampusu Kolejní 29', 'Word of mouth mezi studenty'],
    marketingActivity: 'Publikování zábavných videí z prostředí fakulty, virální formáty „Když studuješ na FP“, guerilla polepy notebooků.',
    contentExample: 'Reel: „5 typů lidí na přednášce z mikroekonomie“ s přirozeným umístěním trika FP DROP.',
    websiteFeature: 'Vizuálně čistý Homepage, animovaný ticker sloganů, video lookbook teaser, jasná vizuální identita.',
    ga4Events: ['page_view', 'scroll (75 %)', 'view_promotion'],
    kpis: ['Dosah (Reach)', 'Imprese', 'Míra zhlédnutí videa do konce (VTR)', 'Návštěvnost webu z organických sítí']
  },
  {
    stage: 'THINK',
    title: 'THINK (Zájem a zvažování)',
    definition: 'Uživatelé, kteří aktivně zvažují pořízení stylového oblečení na univerzitu, líbí se jim koncept značky, ale porovnávají střih, cenu a materiály.',
    channels: ['Instagram Stories', 'Blog & Magazín FP DROP', 'Meta Ads (Retargeting na návštěvníky profilu)', 'Google Search'],
    marketingActivity: 'Publikování článků o zákulisí výroby, materiálu 240g/m² bavlny, detailní fotky detailů, průvodce velikostmi, ankety o sloganech.',
    contentExample: 'Článek: „Behind Drop 001: Proč jsme odmítli levný reklamní textil“ + Story s anketou o střihu mikin.',
    websiteFeature: 'Editorial LOOKBOOK s interaktivními štítky „Shop This Look“, sekce NEWS s 8 články, interaktivní tabulka velikostí s rozměry v cm.',
    ga4Events: ['view_item', 'view_item_list', 'select_item', 'search', 'click_lookbook_hotspot'],
    kpis: ['Doba strávená na stránce (> 2:30 min)', 'Počet zobrazených stránek na relaci', 'Míra prokliku z blogu na produkt (> 15 %)']
  },
  {
    stage: 'DO',
    title: 'DO (Nákupní konverze)',
    definition: 'Uživatelé s vysokým nákupním záměrem: Vybrali si konkrétní produkt/velikost nebo reagují na limitovanou dostupnost právě probíhajícího dropu.',
    channels: ['Meta Ads (Dynamický retargeting opuštěných košíků)', 'E-mailové notifikace na spuštění dropu', 'Přímé odkazy v IG Stories'],
    marketingActivity: 'Výkonnostní kampaně zaměřené na konverze, komunikace scarcity („Poslední kusy skladem“), promo kód pro prváky PRVAK10.',
    contentExample: 'Instagram Story: „DROP 001: Zbývá posledních 14 kusů HOT GIRLS GO TO FP TEE. Odesíláme zítra přes Zásilkovnu.“',
    websiteFeature: 'Rychlý slide-out košík, progress bar pro dopravu zdarma (od 1 000 Kč), 1-step checkout, platba Apple Pay / kartou, volba Zásilkovny.',
    ga4Events: ['add_to_cart', 'remove_from_cart', 'view_cart', 'begin_checkout', 'add_shipping_info', 'add_payment_info', 'purchase'],
    kpis: ['E-commerce Conversion Rate (> 3,0 %)', 'Average Order Value (AOV)', 'Míra opuštění košíku (< 60 %)', 'Cost per Acquisition (CPA)']
  },
  {
    stage: 'CARE',
    title: 'CARE (Péče a retence zákazníků)',
    definition: 'Stávající zákazníci, kteří již nakoupili alespoň jeden kousek z dropu a jsou hrdými nositeli značky FP DROP.',
    channels: ['Post-purchase e-maily', 'VIP přístup k novým dropům', 'Komunitní Discord/Instagram Close Friends', 'UGC reposting'],
    marketingActivity: 'Unboxing zážitek s prémiovým balením a samolepkami zdarma v balíčku, výzva ke sdílení fotky na Instagramu s označením @fpdrop.',
    contentExample: 'E-mail 5 dní po doručení: „Jak sedí tvé nové triko? Označ nás na story a získej VIP přednostní přístup k DROP 002: EXAM SEASON.“',
    websiteFeature: 'Můj profil s historií objednávek, Wishlist oblíbených kousků, sekce Student Stories & Memes, exkluzivní odemykání dropů.',
    ga4Events: ['newsletter_signup', 'add_to_wishlist', 'share', 'repeat_purchase'],
    kpis: ['Repeat Purchase Rate (> 22 %)', 'Customer Lifetime Value (CLV)', 'Počet UGC označení na Instagramu', 'NPS spokojenost']
  }
];

export const SOCIAL_POSTS: SocialMediaPost[] = [
  // 15 Posts
  {
    id: 'sp-01',
    format: 'Post',
    title: 'Drop 001 Teaser — Monochromní minimalismus',
    visualDescription: 'Černobílá detailní fotografie límce trika s tkaným labelem FP DROP a texturou 240g česané bavlny.',
    caption: 'Tvoje univerzita. Tvůj uniform. Zapomeň na levný reklamní textil. DROP 001: FIRST SEMESTER je online. Odkaz v biu. 🖤',
    cta: 'Nakupuj na fpdrop.cz',
    targetAudience: 'Studenti FP VUT 18–24',
    stdcStage: 'SEE',
    expectedMetrics: 'Dosah: 4 200, Uložení: 180'
  },
  {
    id: 'sp-02',
    format: 'Post',
    title: 'HOT GIRLS GO TO FP — Hero Showcase',
    visualDescription: 'Fotografie studentky v oversized triku před brutalistním betonovým schodištěm na Kolejní 29.',
    caption: 'Fakta jsou fakta. Není třeba nic dodávat. 🔥 Limitovaný kousek z Drop 001 skladem v omezeném množství.',
    cta: 'Zkontroluj velikosti na webu',
    targetAudience: 'Studentky i studenti VUT',
    stdcStage: 'THINK',
    expectedMetrics: 'Lajky: 620, Komentáře: 45'
  },
  {
    id: 'sp-03',
    format: 'Post',
    title: 'Materiálový rozbor — 240 GSM Organic Cotton',
    visualDescription: 'Čistý produktový flatlay na světle šedém kameni s technickými popisky gramáže a švů.',
    caption: 'Proč naše trika váží dvakrát víc než běžný merch? 100% organická bavlna, zpevněný průkrčník, žádné vytahané švy po třetím vyprání.',
    cta: 'Více o výrobě na našem blogu',
    targetAudience: 'Kvalitativně orientovaní studenti',
    stdcStage: 'THINK',
    expectedMetrics: 'Uložení: 210, Prokliky: 140'
  },
  {
    id: 'sp-04',
    format: 'Post',
    title: 'Kolejní 29 ponožky — Detail outfitu',
    visualDescription: 'Detail tenisek a žebrovaných ponožek KOLEJNÍ 29 v balení 2-pack na brněnské dlažbě.',
    caption: 'Drobný detail, který mluví za vše. Dvoubalení ponožek KOLEJNÍ 29 pro dlouhé dny na kampusu. Cena 179 Kč.',
    cta: 'Přidej do košíku k objednávce',
    targetAudience: 'Běžní studenti hledající drobnost',
    stdcStage: 'DO',
    expectedMetrics: 'Konverze košíku: +18 %'
  },
  {
    id: 'sp-05',
    format: 'Post',
    title: 'ECTS ARE TEMPORARY — Poslední kusy',
    visualDescription: 'Zadní strana vintage charcoal trika s grafickým nápisem „STYLE IS PERMANENT“.',
    caption: 'Zápočty přicházejí a odcházejí. Styl zůstává. Zbývají poslední 4 kusy ve velikostech M a L. Restock nebude.',
    cta: 'Ukořisti svůj kus na webu',
    targetAudience: 'Studenti 2. a 3. ročníku',
    stdcStage: 'DO',
    expectedMetrics: 'Vyprodáno do 24 h'
  },
  {
    id: 'sp-06',
    format: 'Post',
    title: 'Brno Nightline — Noc po přednáškách',
    visualDescription: 'Noční street fotka z Jakubského náměstí, model v kšiltovce NIGHTLINE a černé mikině.',
    caption: 'Když v pátek v 17:00 zaklapneš notebook a Brno se probouzí. FP After Dark kolekce navržená pro brněnské noci.',
    cta: 'Prozkoumej noční drop',
    targetAudience: 'Part-time a společenští studenti',
    stdcStage: 'SEE',
    expectedMetrics: 'Dosah: 3 800'
  },
  {
    id: 'sp-07',
    format: 'Post',
    title: 'Unboxing experience — Samolepky ke každé objednávce',
    visualDescription: 'Otevřená černá matná krabice s hedvábným papírem, trikem a balíčkem samolepek zdarma.',
    caption: 'Každý detail se počítá. Ke každé objednávce nad 500 Kč balíme zdarma sadu matných vinylových samolepek pro tvůj notebook.',
    cta: 'Objednej do 14:00, odesíláme dnes',
    targetAudience: 'Všichni potenciální zákazníci',
    stdcStage: 'DO',
    expectedMetrics: 'Sdílení: 85'
  },
  {
    id: 'sp-08',
    format: 'Post',
    title: 'Meme: Když máš ve 23:58 nahrávat seminárku',
    visualDescription: 'Typografická grafika s rotujícím loading kolečkem a nápisem NO SLEEP JUST DEADLINES.',
    caption: 'Ten pocit, když školní systém hlásí přetížení serveru. Všichni jsme tam byli. 💀 Triko pro přežití zkouškového je live.',
    cta: 'Ulož si na zkouškové',
    targetAudience: 'Komunita FP VUT',
    stdcStage: 'SEE',
    expectedMetrics: 'Sdílení: 420, Lajky: 890'
  },
  {
    id: 'sp-09',
    format: 'Post',
    title: 'Brno Architecture — Vila Tugendhat & Funkcionalismus',
    visualDescription: 'Editorial lookbook s crewneckem Brno Brutalism na pozadí čistých funkcionalistických oken.',
    caption: 'Brno je město architektury. Propojili jsme geometrické linie moravské metropole s identitou naší fakulty. Kolekce BRNO.',
    cta: 'Čti článek v magazínu',
    targetAudience: 'Esteticky založení studenti a alumni',
    stdcStage: 'THINK',
    expectedMetrics: 'Uložení: 190'
  },
  {
    id: 'sp-10',
    format: 'Post',
    title: 'Kolejní taška Campus Survival — Co v ní nosíš?',
    visualDescription: 'Plochá kompozice: černá plátěná taška, MacBook, sešit ekonomie, káva a AirPods.',
    caption: 'Plátěnka, co unese 15 kg skript a nezradí tě v půlce cesty na tramvaj. 320g organické plátno s vnitřní kapsou na zip.',
    cta: 'Koupit za 249 Kč',
    targetAudience: 'Studentky a studenti hledající tašku',
    stdcStage: 'DO',
    expectedMetrics: 'Prodeje: 35 ks za týden'
  },
  {
    id: 'sp-11',
    format: 'Post',
    title: 'Community Repost — Student Stories',
    visualDescription: 'Karusel 4 fotek reálných studentů FP označených v našich kouscích na chodbách i v kavárnách.',
    caption: 'Vy tvoříte FP DROP. Děkujeme za každou fotku z přednášek i z cest. Označuj @fpdrop a dostaň se do dalšího výběru.',
    cta: 'Sdílej svůj fit s #FPDROP',
    targetAudience: 'Stávající zákazníci (CARE)',
    stdcStage: 'CARE',
    expectedMetrics: 'UGC fotky: +25 nových zmínek'
  },
  {
    id: 'sp-12',
    format: 'Post',
    title: 'Business But Make It Fun — Slogan edice',
    visualDescription: 'Detail nápisu BUSINESS BUT MAKE IT FUN tištěného bílou barvou na prsou černého trika.',
    caption: 'Ekonomie a management nemusí znamenat šedý oblek a nudu v open-space. FP je o startupové odvaze dělat věci jinak.',
    cta: 'Objednej online na fpdrop.cz',
    targetAudience: 'Studenti managementu',
    stdcStage: 'THINK',
    expectedMetrics: 'Lajky: 390'
  },
  {
    id: 'sp-13',
    format: 'Post',
    title: 'Průvodce velikostmi — Jak vybrat perfektní fit',
    visualDescription: 'Infografika s modelkou (168 cm, vel. S) a modelem (185 cm, vel. L) porovnávající standardní vs. boxy střih.',
    caption: 'Bojíš se, že ti triko nesedne? Naše kousky mají přirozený uvolněný oversized střih. Podívej se na náš tahák velikostí.',
    cta: 'Otevři Size Guide na webu',
    targetAudience: 'Váhající zákazníci ve fázi THINK',
    stdcStage: 'THINK',
    expectedMetrics: 'Snížení dotazů na podporu o 40 %'
  },
  {
    id: 'sp-14',
    format: 'Post',
    title: 'Zkouškové se blíží — Exam Survivor Hoodie',
    visualDescription: 'Fotografie studenta v kapuci 450 GSM mikiny sedícího v prázdné noční aule.',
    caption: 'Až přijde leden a zkouškové, budeš za tuhle 450gramovou mikinu vděčný. Nejteplejší kousek z naší dílny.',
    cta: 'Předobjednej před vyprodáním',
    targetAudience: 'Všichni studenti před zkouškovým',
    stdcStage: 'DO',
    expectedMetrics: 'Předobjednávky: 40 ks'
  },
  {
    id: 'sp-15',
    format: 'Post',
    title: 'Behind the Scenes — Sítotisková dílna v Brně',
    visualDescription: 'Videozáznam z ručního nanášení barvy přes síto na textil v brněnské tiskařské dílně.',
    caption: 'Žádný digitální levný potisk, co se po měsíci oloupe. Poctivý sítotisk barva po barvě přímo u nás v Brně. 🖤',
    cta: 'Podpoř lokální studentský projekt',
    targetAudience: 'Podporovatelé lokální výroby',
    stdcStage: 'CARE',
    expectedMetrics: 'Zhlédnutí: 5 400, Uložení: 280'
  },

  // 5 Reels
  {
    id: 'reel-01',
    format: 'Reel',
    title: 'Reel 01: Očekávání vs. Realita prvního týdne na FP VUT',
    visualDescription: 'Rychlý dynamický střih: Scéna 1 - Oblek a kufřík jako z Wall Street vs. Scéna 2 - Oversized triko FP DROP, káva v kelímku a běh na tramvaj č. 12.',
    caption: 'První týden na ekonomce: očekávání vs. krutá realita. 💀 Kdo se v tom poznává? Triko na přežití semestru najdeš v biu.',
    cta: 'Link v bio na DROP 001',
    targetAudience: 'Prváci a druháci FP VUT',
    stdcStage: 'SEE',
    expectedMetrics: 'Přehrání: 18 500, Sdílení: 640'
  },
  {
    id: 'reel-02',
    format: 'Reel',
    title: 'Reel 02: Ptáme se studentů na Kolejní 29: Co máš na sobě?',
    visualDescription: 'Pouliční minirozhovor ve stylu „Streetwear Check“ na kampusu FP VUT. Moderátor zpovídá stylové studenty, kteří komentují svůj outfit a ukazují detaily FP DROP.',
    caption: 'Jak se obléká Fakulta podnikatelská? Prozkoumali jsme kampus Kolejní 29 a narazili na pár top fitů. Napiš do komentářů svůj oblíbený kousek! 👇',
    cta: 'Sleduj @fpdrop pro další díly',
    targetAudience: 'Širší brněnská studentská komunita',
    stdcStage: 'SEE',
    expectedMetrics: 'Přehrání: 24 000, Komentáře: 95'
  },
  {
    id: 'reel-03',
    format: 'Reel',
    title: 'Reel 03: Jak se balí studentská objednávka pro Zásilkovnu',
    visualDescription: 'Uklidňující ASMR video: skládání 240g trička, balení do černého hedvábného papíru, přiložení holografických samolepek a zalepení minimalistické černé pásky.',
    caption: 'Balíme vaše objednávky z DROP 001. Dnes do 14:00 odesíláme další várku směr Zásilkovna. Kdo už má svůj balíček na cestě? 📦🖤',
    cta: 'Doprava zdarma od 1 000 Kč na webu',
    targetAudience: 'Zákazníci ve fázi DO a váhající v THINK',
    stdcStage: 'DO',
    expectedMetrics: 'Přehrání: 12 000, Uložení: 150'
  },
  {
    id: 'reel-04',
    format: 'Reel',
    title: 'Reel 04: 3 způsoby jak nastylovat oversized FP mikinu na přednášku i večer',
    visualDescription: 'Rychlé přechody módního stylingu: 1. Do školy s volnými cargo kalhotami a batohem, 2. Do knihovny s vrstveným trikem, 3. Na večerní drink s koženou bundou.',
    caption: 'Jeden kousek, tři různé vibes. Jak nosíš naši 450 GSM signature mikinu ty? Napiš 1, 2 nebo 3 do komentářů.',
    cta: 'Objev celou kolekci v Lookbooku',
    targetAudience: 'Zájemci o módu a styling',
    stdcStage: 'THINK',
    expectedMetrics: 'Přehrání: 16 000, Prokliky na web: 320'
  },
  {
    id: 'reel-05',
    format: 'Reel',
    title: 'Reel 05: Když ti profesor řekne, že ECTS jsou to nejdůležitější v životě',
    visualDescription: 'Student sedí v aule, naslouchá profesorovi, kamera pomalu zoomuje na zadní nápis na jeho triku: „ECTS ARE TEMPORARY — STYLE IS PERMANENT“.',
    caption: 'S veškerým respektem k panu docentovi... 😉 Označ někoho, kdo potřebuje tohle triko na příští přednášku.',
    cta: 'Poslední kusy na fpdrop.cz',
    targetAudience: 'Komunita VUT s humorem',
    stdcStage: 'SEE',
    expectedMetrics: 'Přehrání: 29 000, Sdílení: 850'
  },

  // 5 Stories
  {
    id: 'st-01',
    format: 'Story',
    title: 'Story 01: Countdown do spuštění Drop 002',
    visualDescription: 'Černá interaktivní obrazovka s odpočítávacím timerem do pátku 18:00 a textem „EXAM SEASON DROP IS COMING“.',
    caption: 'Nastav si připomenutí. Prvních 50 objednávek získá speciální dárek k přežití zkouškového.',
    cta: 'Nastavit připomenutí (Remind me)',
    targetAudience: 'Sledující na Instagramu',
    stdcStage: 'THINK',
    expectedMetrics: 'Klepnutí na odpočet: 480'
  },
  {
    id: 'st-02',
    format: 'Story',
    title: 'Story 02: Hlasování o sloganu pro další limitovanou sérii',
    visualDescription: 'Anketní samolepka se dvěma možnostmi: A: „PROBABLY IN THE LIBRARY“ vs. B: „TRADING DEADLINES FOR COFFEE“.',
    caption: 'Vy rozhodujete o tom, co půjde do tiskárny. Který slogan chceš na novém triku?',
    cta: 'Hlasuj v anketě',
    targetAudience: 'Komunita a stávající fanoušci',
    stdcStage: 'CARE',
    expectedMetrics: 'Zapojení do ankety: 1 150 hlasů'
  },
  {
    id: 'st-03',
    format: 'Story',
    title: 'Story 03: Q&A o materiálech a velikostech',
    visualDescription: 'Otázková nálepka „Zeptej se na cokoliv ohledně velikostí a materiálů DROP 001“. Odpovídáme v reálném čase.',
    caption: 'Nejste si jistí velikostí? Napište nám výšku a střih, doporučíme ideální variantu.',
    cta: 'Zeptej se v rámečku',
    targetAudience: 'Uživatelé před nákupem',
    stdcStage: 'THINK',
    expectedMetrics: 'Odpovědí na dotazy: 35'
  },
  {
    id: 'st-04',
    format: 'Story',
    title: 'Story 04: Skladový alarm — Poslední kusy trička HOT GIRLS',
    visualDescription: 'Fotografie skladu s textem: „Zbývá posledních 6 kusů velikosti M. Další várka až v prosinci.“',
    caption: 'Pokud jsi váhal/a, teď je ten moment.',
    cta: 'Přejít do e-shopu (Link)',
    targetAudience: 'Zákazníci s nedokončeným nákupem',
    stdcStage: 'DO',
    expectedMetrics: 'Prokliky odkazu: 280, Vyprodáno'
  },
  {
    id: 'st-05',
    format: 'Story',
    title: 'Story 05: Reposty zákazníků z kampusu',
    visualDescription: 'Série 4 rychlých repostů Stories studentů, kteří si vyzvedli balíček a vyfotili se na fakultě.',
    caption: 'Dneska vás na Kolejní potkáváme na každém kroku. Děkujeme za support! 🖤',
    cta: 'Označuj @fpdrop',
    targetAudience: 'Všichni fanoušci',
    stdcStage: 'CARE',
    expectedMetrics: 'Imprese: 3 100'
  }
];

export const PPC_STRATEGY: {
  monthlyBudget: number;
  currency: string;
  campaigns: PPCCampaign[];
  abTests: Array<{
    id: string;
    title: string;
    hypothesis: string;
    variantA: string;
    variantB: string;
    testMetric: string;
    simulatedResult: string;
    conclusion: string;
  }>;
} = {
  monthlyBudget: 10000,
  currency: 'CZK',
  campaigns: [
    {
      id: 'ppc-01',
      name: '01_AWARENESS_BRNO_STUDENTS',
      stage: 'AWARENESS',
      budgetCZK: 2500,
      objective: 'Dosah & Video Views (Brand Awareness)',
      targeting: {
        locations: ['Brno + okolí 15 km (se zaměřením na Královo Pole a Technologický park)'],
        age: '18–25 let',
        interests: ['Streetwear', 'Vysoké učení technické v Brně', 'Móda', 'Studentský život', 'Hypebeast'],
        customAudiences: 'Vyloučeni stávající zákazníci'
      },
      creativeA: {
        format: 'Instagram Reel (9:16 video)',
        headline: 'YOUR UNIVERSITY. YOUR UNIFORM.',
        copy: 'Nová vlna studentského streetwearu pro FP VUT. Zapomeň na nudný merch. Prozkoumej Drop 001: First Semester.',
        focus: 'Dynamické video z kampusu se studenty v mikinách a tričkách'
      },
      creativeB: {
        format: 'Karusel fotek z Lookbooku (1:1 čtverec)',
        headline: 'HOT GIRLS GO TO FP & DALŠÍ DROPY',
        copy: 'Heavyweight bavlna 240 g/m², lokální brněnský sítotisk a unisex oversized střih. Objev studentskou kolekci.',
        focus: 'Čisté editorial snímky s cenovkami produktů'
      },
      kpis: {
        ctr: '2.85 %',
        cpc: '2.10 Kč',
        cvr: '0.8 %',
        roas: '1.9x',
        cpa: '260 Kč'
      }
    },
    {
      id: 'ppc-02',
      name: '02_CONSIDERATION_TRAFFIC_LOOKBOOK',
      stage: 'CONSIDERATION',
      budgetCZK: 3500,
      objective: 'Návštěvnost webu a prohlížení obsahu (Traffic & View Content)',
      targeting: {
        locations: ['Brno, Jihomoravský kraj'],
        age: '18–26 let',
        interests: ['Online nakupování', 'Móda a oděvy', 'Studentské slevy'],
        customAudiences: 'Engaged users z Instagramu za posledních 60 dní + Návštěvníci blogu'
      },
      creativeA: {
        format: 'Instagram Feed Single Image (4:5)',
        headline: 'ČERNÁ NENÍ NUDA. JE TO UNIFORMA FP.',
        copy: 'Proč studenti nosí černou? Přečti si příběh za Drop 001 a prohlédni si lookbook z kampusu na Kolejní 29.',
        focus: 'Kontrastní detail typografie s proklikem na Lookbook'
      },
      creativeB: {
        format: 'Kolekce s okamžitým zážitkem (Instant Experience)',
        headline: 'VYBER SI SVŮJ FIT NA PŘEDNÁŠKY',
        copy: 'Oversized mikiny 450 GSM a limitovaná trička od 299 Kč. Prohlédni si celou nabídku přímo v aplikaci.',
        focus: 'Interaktivní katalog s přímým nákupním modulem'
      },
      kpis: {
        ctr: '3.90 %',
        cpc: '3.20 Kč',
        cvr: '2.4 %',
        roas: '3.6x',
        cpa: '135 Kč'
      }
    },
    {
      id: 'ppc-03',
      name: '03_CONVERSION_CATALOG_SALES',
      stage: 'CONVERSION',
      budgetCZK: 2500,
      objective: 'Nákupy na webu (Purchases / Add to Cart)',
      targeting: {
        locations: ['Česká republika (se zaměřením na studenty v Brně)'],
        age: '18–26 let',
        interests: ['Street fashion', 'Nákupy'],
        customAudiences: 'Uživatelé, kteří navštívili produkt za 30 dní, ale nenakoupili'
      },
      creativeA: {
        format: 'Dynamický produktový katalog (DPA)',
        headline: 'TVŮJ VÝBĚR Z DROP 001 TĚ ČEKÁ',
        copy: 'Skladové zásoby mizí. 100% bio bavlna, doprava do Zásilkovny za 69 Kč nebo osobní odběr zdarma na FP.',
        focus: 'Dynamicky zobrazený naposledy prohlížený produkt'
      },
      creativeB: {
        format: 'Slevový voucher kreativa (Single Image)',
        headline: 'KÓD: PRVAK10 — SLEVA 10 % NA PRVNÍ DROP',
        copy: 'Vítej na FP. Získej 10% studentskou slevu na celou objednávku. Použij kód PRVAK10 v košíku.',
        focus: 'Minimalistická typografická kupónová grafika'
      },
      kpis: {
        ctr: '4.60 %',
        cpc: '4.80 Kč',
        cvr: '5.2 %',
        roas: '6.4x',
        cpa: '92 Kč'
      }
    },
    {
      id: 'ppc-04',
      name: '04_REMARKETING_ABANDONED_CART',
      stage: 'REMARKETING',
      budgetCZK: 1500,
      objective: 'Záchrana opuštěných košíků (Cart Recovery & Conversions)',
      targeting: {
        locations: ['Česká republika'],
        age: '18–30 let',
        interests: [],
        customAudiences: 'Přidali do košíku za posledních 14 dní A ZÁROVEŇ Nenakoupili'
      },
      creativeA: {
        format: 'Carousel se zbožím v košíku + Scarcity copy',
        headline: 'NECHAL/A JSI NĚCO V KOŠÍKU?',
        copy: 'Tvé vybrané kousky jsou v košíku rezervované jen do vyprodání zásob. Dokonči objednávku ještě dnes.',
        focus: 'Konkrétní položky zanechané v košíku'
      },
      creativeB: {
        format: 'Doprava zdarma reminder',
        headline: 'DOPRAVA ZDARMA OD 1 000 KČ',
        copy: 'Vyzvedni si své věci zdarma přímo na Kolejní 29 nebo na Z-Boxu. Neplať zbytečné poštovné.',
        focus: 'Připomenutí benefitů rychlého doručení'
      },
      kpis: {
        ctr: '5.40 %',
        cpc: '5.10 Kč',
        cvr: '8.8 %',
        roas: '8.2x',
        cpa: '58 Kč'
      }
    }
  ],
  abTests: [
    {
      id: 'ab-01',
      title: 'A/B Test 1: Produktové studio vs. Autentický lifestylový lookbook na kampusu',
      hypothesis: 'Lifestylová fotografie studenta přímo v areálu FP VUT vygeneruje vyšší míru prokliku (CTR) a konverzní poměr než čisté studiové produktové foto, protože buduje silnější sounáležitost a autenticitu.',
      variantA: 'Varianta A: Čisté studiové foto trička na šedém pozadí (Ghost mannequin / flatlay)',
      variantB: 'Varianta B: Lifestylová momentka studentky v aule Kolejní 29 s kávou v ruce a přirozeným světlem',
      testMetric: 'CTR (Click-Through Rate) a CVR (Conversion Rate)',
      simulatedResult: 'Varianta B dosáhla o +38 % vyšší CTR (4.1 % vs. 2.97 %) a o +24 % vyšší CVR. Lidé lépe vnímají, jak střih sedí na reálné postavě.',
      conclusion: 'Potvrzeno. Lifestylový obsah z reálného prostředí fakulty funguje dramaticky lépe pro akvizici i engagement.'
    },
    {
      id: 'ab-02',
      title: 'A/B Test 2: Emoční slogan-driven copy vs. Racionální materiálové copy',
      hypothesis: 'Mladí studenti nakupují streetwear primárně na základě emocí a vtipu („HOT GIRLS GO TO FP“), nikoliv na základě technických údajů o gramáži bavlny.',
      variantA: 'Varianta A: Emoční hravý text („HOT GIRLS GO TO FP. Nehledej vysvětlení, objev Drop 001.“)',
      variantB: 'Varianta B: Racionální materiálový text („Prémiová 240g bio bavlna, zpevněný průkrčník, unisex střih.“)',
      testMetric: 'ROAS (Return on Ad Spend) a Add to Cart Rate',
      simulatedResult: 'Varianta A dosáhla ROAS 5.2x oproti Varianta B s ROAS 3.4x v horní fázi funnelu (SEE/THINK). V remarketingu (DO) však varianta B pomohla odstranit poslední obavu o kvalitu.',
      conclusion: 'Kombinace: Pro akvizici nasazovat emoční slogany, v retargetingu doplňovat materiálovou jistotu.'
    },
    {
      id: 'ab-03',
      title: 'A/B Test 3: Standardní fotka ve feedu (1:1) vs. Vertikální video Reel (9:16)',
      hypothesis: 'Formát 9:16 Reels s dynamickým sestřihem a hudbou přinese nižší cenu za proklik (CPC) a vyšší dosah u cílové skupiny 18–24 let.',
      variantA: 'Varianta A: Statická čtvercová fotografie v Instagram Feedu',
      variantB: 'Varianta B: 15sekundový dynamický Instagram Reel se zvukovým trendem a textovými titulky',
      testMetric: 'CPC (Cena za proklik) a Cost per 1 000 Impressions (CPM)',
      simulatedResult: 'Varianta B přinesla CPC 1.80 Kč (oproti 3.40 Kč u varianty A) a o 65 % vyšší dosah na vloženou korunu rozpočtu.',
      conclusion: 'Jednoznačné doporučení: 70 % rozpočtu na horní fázi trychtýře alokovat do vertikálních Reels formátů.'
    }
  ]
};

export const TRACEABILITY_MATRIX = [
  {
    projectRequirement: '1. Základní specifikace aplikace & Trigger System (min. 1 normostrana)',
    implementation: 'Definice brandu FP DROP, hodnot, cílové skupiny a psychologie nákupu studentů',
    websiteFeature: 'Hero drop bannery, interaktivní našeptávač, dynamic scarcity alerty a student discount trigger',
    marketingActivity: 'Trigger-based kampaně navázané na semestr, zkouškové a virální sociální trendy',
    kpi: 'Conversion Rate (> 3 %), Míra dokončení nákupu, Čas do první objednávky'
  },
  {
    projectRequirement: '2. Prototyp mobilní aplikace & business profil',
    implementation: 'Responzivní mobile-first UI s dedikovaným módem mobilní aplikace a bottom navigací',
    websiteFeature: 'Interaktivní přepínač mobilního simulátoru, spodní lišta (Home, Shop, Drop, Wishlist, Profil)',
    marketingActivity: 'Optimalizace nákupní cesty pro sociální sítě (in-app IG prohlížeč), 1-click checkout',
    kpi: 'Mobilní podíl na tržbách (> 75 %), Rychlost načtení (< 1,2 s), Mobile Bounce Rate'
  },
  {
    projectRequirement: '3. Přístup k tvorbě postů na sociální sítě (video, min. 1 normostrana, IG)',
    implementation: 'Kompletní plán 15 postů, 5 Reels videí a 5 Stories s detailními scénáři a STDC fázemi',
    websiteFeature: 'Živý náhled Instagram feedu na webu, sekce Student Stories a Lookbook propojitelné s UGC',
    marketingActivity: 'Pravidelný publikační kalendář, TikTok & Reels trendy, ankety v Stories a soutěže',
    kpi: 'Engagement Rate (> 8,5 %), Počet zhlédnutí Reels, Míra uložení postů'
  },
  {
    projectRequirement: '4. PPC reklama v Meta Ads Manager (Targeting, 10k budget, 3 A/B testy)',
    implementation: '4 kampaně v plném marketingovém trychtýři, rozpočet 10 000 CZK měsíčně, 3 exaktní A/B experimenty',
    websiteFeature: 'Parametrické UTM tagování, dedikované vstupní stránky pro jednotlivé dropy, promo kupony',
    marketingActivity: 'Meta Business Suite Ads Manager: Akvizice, provoz na Lookbook, katalogový prodej, remarketing košíků',
    kpi: 'Celkový ROAS (> 4,5x), Průměrná CPC (< 3,80 Kč), CTR (> 3,5 %), CPA (< 120 Kč)'
  },
  {
    projectRequirement: '5. Customer Journey & STDC framework (Tabulka efektivity, min. 1,5 normostrany)',
    implementation: '4 primární zákaznické cesty (IG Reel, Google/Blog, Kampus word-of-mouth, Returning)',
    websiteFeature: 'Propojený ekosystém: Blog → Produkt → Košík → Zásilkovna → Post-purchase péče',
    marketingActivity: 'Obsahový marketing, retargetingové sekvence, VIP klub stávajících zákazníků',
    kpi: 'Průchodnost jednotlivých fází STDC, Repeat Purchase Rate (> 20 %)'
  },
  {
    projectRequirement: '6. Měření v Google Analytics 4 & Microsoft Clarity',
    implementation: 'Event architektura se 14 standardními a custom událostmi (view_item, purchase, atd.)',
    websiteFeature: 'Vestavěný živý GA4 Event Debugger / Inspector v reálném čase přímo v aplikaci',
    marketingActivity: 'Vyhodnocování konverzních cest, heatmapy chování uživatelů, analýza scroll hloubky',
    kpi: '100% spolehlivost logování e-commerce událostí, Míra opuštění kroků checkoutu'
  },
  {
    projectRequirement: '7. E-commerce KPI Dashboard a vyhodnocení projektu',
    implementation: 'Interaktivní manažerský analytický dashboard s klíčovými metrikami a grafy',
    websiteFeature: 'Zobrazení tržeb, objednávek, AOV, CVR, opuštění košíku, top produktů a Meta Ads ROAS',
    marketingActivity: 'Pravidelný reporting výkonnosti, optimalizace rozpočtu do nejziskovějších produktů',
    kpi: 'Obrat (148 250 Kč), 284 objednávek, AOV 522 Kč, CVR 3,42 %, ROAS 4,8x'
  }
];

export const MOCK_DASHBOARD_DATA = {
  summary: {
    revenue: 148250,
    revenueChange: '+28.4 %',
    orders: 284,
    ordersChange: '+34.2 %',
    conversionRate: 3.42,
    conversionRateChange: '+0.6 %',
    averageOrderValue: 522,
    averageOrderValueChange: '+45 Kč',
    addToCartRate: 9.8,
    cartAbandonmentRate: 58.2,
    totalVisits: 8304,
    uniqueVisitors: 6120
  },
  trafficSources: [
    { source: 'Instagram (Reels + Bio)', percentage: 54, visits: 4484, revenue: 86400, convRate: 3.8 },
    { source: 'Meta Ads (Placená kampaň)', percentage: 24, visits: 1993, revenue: 38200, convRate: 3.6 },
    { source: 'Přímá návštěvnost (Direct)', percentage: 12, visits: 996, revenue: 15450, convRate: 3.1 },
    { source: 'Organické vyhledávání & Blog', percentage: 7, visits: 581, revenue: 6200, convRate: 2.1 },
    { source: 'Referral & VUT sítě', percentage: 3, visits: 250, revenue: 2000, convRate: 2.4 }
  ],
  topProducts: [
    { id: 'prod-01', name: 'HOT GIRLS GO TO FP TEE', salesCount: 86, revenue: 30014, views: 1840 },
    { id: 'prod-13', name: 'FP 001 SIGNATURE HOODIE', salesCount: 38, revenue: 34162, views: 1420 },
    { id: 'prod-02', name: 'NO SLEEP JUST DEADLINES TEE', salesCount: 52, revenue: 18148, views: 1110 },
    { id: 'prod-14', name: 'EXAM SURVIVOR HOODIE', salesCount: 16, revenue: 15184, views: 790 },
    { id: 'prod-19', name: 'CAMPUS SURVIVAL TOTE BAG', salesCount: 42, revenue: 10458, views: 890 },
    { id: 'prod-21', name: 'KOLEJNÍ 29 SOCKS (2-PACK)', salesCount: 50, revenue: 8950, views: 950 }
  ],
  funnelSteps: [
    { step: 'Zobrazení webu (Sessions)', count: 8304, percentage: 100 },
    { step: 'Zobrazení detailu produktu (view_item)', count: 4890, percentage: 58.9 },
    { step: 'Přidání do košíku (add_to_cart)', count: 814, percentage: 9.8 },
    { step: 'Zahájení objednávky (begin_checkout)', count: 480, percentage: 5.78 },
    { step: 'Dokončený nákup (purchase)', count: 284, percentage: 3.42 }
  ]
};
