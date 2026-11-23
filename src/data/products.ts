import { Product } from '../types';
import { PRODUCT_IMAGES } from './productImages';

const BASE_PRODUCTS: Omit<Product, 'imageUrl' | 'images'>[] = [
  {
    id: 'prod-01',
    name: 'HOT GIRLS GO TO FP TEE',
    slogan: 'HOT GIRLS\nGO TO FP',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    originalPrice: 399,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'LIMITED',
    color: 'Čierna (Washed Black)',
    fit: 'Oversized Boxy Fit',
    material: '100 % česaná bio bavlna (240 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 14,
    description: 'Ikonický kúsok našej komunity inšpirovaný estetikou moderného streetwearu. Ťažká organická bavlna, spevnený golier a výrazná typografia na hrudi. Navrhnuté pre študentky aj študentov, ktorí berú štúdium s nadhľadom a štýlom.',
    highlights: [
      'Heavyweight 240 g/m² organická bavlna',
      'Kvalitná sieťotlač odolná voči praniu na 30 °C',
      'Unisex voľný oversized strih so spadnutými ramenami',
      'Tkaný štítok FP DROP na spodnom leme'
    ],
    mockDetails: {
      textLines: ['HOT GIRLS', 'GO TO FP'],
      textColor: '#FFFFFF',
      baseColor: '#121212',
      backTextLines: ['FP DROP', '001 / BRNO']
    }
  },
  {
    id: 'prod-02',
    name: 'NO SLEEP TEE',
    slogan: 'NO SLEEP\nJUST DEADLINES',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'NEW',
    color: 'Sýta čierna (Jet Black)',
    fit: 'Boxy Heavyweight Fit',
    material: '100 % bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 28,
    description: 'Oficiálna uniforma zápočtového týždňa a skúškového maratónu. Vtip, ktorý pochopí každý, kto niekedy písal seminárku o tretej ráno v knižnici alebo na izbe na Kolejní.',
    highlights: [
      'Pevná bavlnená gramáž s hodvábnym omakom',
      'Typografia v štýle švajčiarskeho brutalizmu',
      'Dvojité prešitie rukávov a lemu',
      'Lokálna sieťotlač v brnianskej dielni'
    ],
    mockDetails: {
      textLines: ['NO SLEEP', 'JUST DEADLINES'],
      textColor: '#FFFFFF',
      baseColor: '#0A0A0A',
      backTextLines: ['EXAM SURVIVOR', 'FP VUT 2026']
    }
  },
  {
    id: 'prod-03',
    name: 'ECTS ARE TEMPORARY TEE',
    slogan: 'ECTS\nARE TEMPORARY',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 399,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'LAST PIECES',
    color: 'Vintage uhľová (Charcoal)',
    fit: 'Oversized Street Cut',
    material: '100 % enzymaticky praná bavlna (250 g/m²)',
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 4,
    description: 'Kredity prichádzajú a odchádzajú, ale vkus a spomienky na Brno zostávajú. Prémiové vintage prané tričko s jemne štruktúrovaným povrchom a nápisom vzadu.',
    highlights: [
      'Enzymatické vintage pranie pre mäkký autentický pocit',
      'Grafika vzadu s výpočtom semestrálnych kreditov',
      'Vyšší rebrovaný golier, ktorý drží tvar',
      'Posledné kusy zo série 001'
    ],
    mockDetails: {
      textLines: ['ECTS ARE', 'TEMPORARY'],
      textColor: '#F5F5F5',
      baseColor: '#1A1A1A',
      backTextLines: ['STYLE IS', 'PERMANENT', '— FP VUT']
    }
  },
  {
    id: 'prod-04',
    name: 'FP AFTER DARK TEE',
    slogan: 'FP\nAFTER DARK',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-003',
    dropName: 'DROP 003 — FP AFTER DARK',
    status: 'LIMITED',
    color: 'Námornícka modrá (Midnight Navy)',
    fit: 'Relaxed Street Cut',
    material: '100 % česaná bavlna (230 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 19,
    description: 'Tričko na tie najlepšie zážitky po skončení prednášok. Klubové večery vo Flédě, nočné rozjazdy z hlavnej stanice a debaty pri pive na Jakubskom námestí.',
    highlights: [
      'Výrazná neónová potlač nočného Brna',
      'Vhodné na denné nosenie aj večerné akcie',
      'Komfortný mäkký materiál',
      'Limitovaný náklad 100 kusov'
    ],
    mockDetails: {
      textLines: ['FP AFTER', 'DARK'],
      textColor: '#FFFFFF',
      baseColor: '#0D0D0D',
      backTextLines: ['BRNO NIGHTLINE', '00:00 — 05:00']
    }
  },
  {
    id: 'prod-05',
    name: 'BRNO TEE',
    slogan: 'MADE IN\nBRNO',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 329,
    dropId: 'drop-004',
    dropName: 'DROP 004 — BRNO',
    status: 'AVAILABLE',
    color: 'Krémová (Off-White)',
    fit: 'Standard Oversize Fit',
    material: '100 % bavlna (220 g/m²)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 42,
    description: 'Hrdé vyhlásenie o meste, ktoré nám dáva priestor rásť, študovať a tvoriť. Čistý geometrický dizajn inšpirovaný brnianskym minimalizmom.',
    highlights: [
      'Univerzálny nadčasový strih',
      'Minimalistická typografia na hrudi',
      'GPS súradnice kampusu Kolejní na rukáve',
      'Priedušná prírodná bavlna'
    ],
    mockDetails: {
      textLines: ['MADE IN', 'BRNO'],
      textColor: '#FFFFFF',
      baseColor: '#141414',
      backTextLines: ['49.2244° N', '16.5748° E']
    }
  },
  {
    id: 'prod-06',
    name: 'BUSINESS BUT MAKE IT FUN TEE',
    slogan: 'BUSINESS\nBUT MAKE IT FUN',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'AVAILABLE',
    color: 'Piesková (Sand Beige)',
    fit: 'Oversized Boxy',
    material: '100 % bio bavlna (240 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 22,
    description: 'Kto hovorí, že ekonómia a manažment musia byť nuda v sivom obleku? FP VUT je o inováciách, startupoch a odvahe robiť veci inak.',
    highlights: [
      'Priestranný strih so širokými rukávmi',
      'Hebká bavlnená väzba',
      'Vhodné k voľným nohaviciam aj rifliam',
      'Pranie na 30 °C'
    ],
    mockDetails: {
      textLines: ['BUSINESS', 'BUT MAKE', 'IT FUN'],
      textColor: '#FFFFFF',
      baseColor: '#0E0E0E'
    }
  },
  {
    id: 'prod-07',
    name: 'TRADING DEADLINES FOR COFFEE TEE',
    slogan: 'TRADING\nDEADLINES\nFOR COFFEE',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'AVAILABLE',
    color: 'Tmavohnedá (Espresso Brown)',
    fit: 'Oversized Fit',
    material: '100 % bavlna (230 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 31,
    description: 'Základná ekonomická rovnica každého študenta FP: výmenný kurz medzi blížiacim sa termínom odovzdania a tretím dvojitým espressom dňa.',
    highlights: [
      'Typografia inšpirovaná burzovými tickermi',
      'Príjemná priedušnosť pri celodennom nosení',
      'Stálofarebná potlač',
      'Navrhnuté v Brne'
    ],
    mockDetails: {
      textLines: ['TRADING', 'DEADLINES', 'FOR COFFEE'],
      textColor: '#FFFFFF',
      baseColor: '#111111'
    }
  },
  {
    id: 'prod-08',
    name: 'STUDY. PARTY. REPEAT. TEE',
    slogan: 'STUDY.\nPARTY.\nREPEAT.',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 329,
    dropId: 'drop-003',
    dropName: 'DROP 003 — FP AFTER DARK',
    status: 'AVAILABLE',
    color: 'Midnight Black',
    fit: 'Unisex Street Fit',
    material: '100 % bavlna (220 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 16,
    description: 'Svätá trojica semestrálneho života. Jednoduchý a úderný nápis, ktorý zhŕňa celý študentský kolobeh od októbra do mája.',
    highlights: [
      'Kontrastná potlač',
      'Klasický crewneck golier',
      'Certifikácia OEKO-TEX Standard 100',
      'Otestované na študentských akciách'
    ],
    mockDetails: {
      textLines: ['STUDY.', 'PARTY.', 'REPEAT.'],
      textColor: '#FFFFFF',
      baseColor: '#0A0A0A'
    }
  },
  {
    id: 'prod-09',
    name: 'FP VUT NO EXPLANATION NEEDED TEE',
    slogan: 'FP VUT\nNO EXPLANATION\nNEEDED',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'SOLD OUT',
    color: 'Sivý melír (Heather Gray)',
    fit: 'Boxy Fit',
    material: '100 % bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false,
    stockCount: 0,
    description: 'Keď vojdeš do miestnosti a všetci vedia. Vypredaný limitovaný kúsok z pilotného spustenia Drop 001. Pripravujeme naskladnenie v ďalšom drope.',
    highlights: [
      'Vypredané počas prvých 48 hodín',
      'Kultový kúsok prvej edície',
      'Hustá bavlnená priadza',
      'Prihlás sa na odber info o naskladnení'
    ],
    mockDetails: {
      textLines: ['FP VUT', 'NO EXPLANATION', 'NEEDED'],
      textColor: '#E5E5E5',
      baseColor: '#121212'
    }
  },
  {
    id: 'prod-10',
    name: 'PROBABLY IN THE LIBRARY TEE',
    slogan: 'PROBABLY\nIN THE\nLIBRARY',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 299,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'AVAILABLE',
    color: 'Fľašovo zelená (Forest Green)',
    fit: 'Relaxed Daily Fit',
    material: '100 % bavlna (200 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 35,
    description: 'Diskrétne ospravedlnenie pre spolubývajúcich aj kamarátov. Tričko na tiché dni strávené medzi regálmi v knižnici VUT na Kolejní.',
    highlights: [
      'Odľahčená príjemná gramáž 200 g/m²',
      'Výrazný nápis s motívom otvorenej knihy',
      'Ideálna vrstva pod mikinu alebo košeľu',
      'Študentská cena 299 Kč'
    ],
    mockDetails: {
      textLines: ['PROBABLY IN', 'THE LIBRARY'],
      textColor: '#FFFFFF',
      baseColor: '#1F1F1F'
    }
  },
  {
    id: 'prod-11',
    name: 'BRNO IS HOME TEE',
    slogan: 'BRNO\nIS HOME',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 349,
    dropId: 'drop-004',
    dropName: 'DROP 004 — BRNO',
    status: 'AVAILABLE',
    color: 'Carbon Black',
    fit: 'Oversized Boxy',
    material: '100 % česaná bio bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 25,
    description: 'Či si rodený Brňák, alebo si sa sem kvôli FP presťahoval z druhého konca republiky či zo Slovenska. Brno sa stane domovom.',
    highlights: [
      'Silná komunitná identita',
      'Masívna 240 g organická bavlna',
      'Dvojitý steh na golieri',
      'Unisex silueta'
    ],
    mockDetails: {
      textLines: ['BRNO IS', 'HOME'],
      textColor: '#FFFFFF',
      baseColor: '#141414',
      backTextLines: ['FP COMMUNITY', 'EST. BRNO']
    }
  },
  {
    id: 'prod-12',
    name: 'ONE MORE SEMESTER TEE',
    slogan: 'ONE MORE\nSEMESTER',
    category: 'T-SHIRTS',
    garmentType: 'tee',
    price: 399,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'LAST PIECES',
    color: 'Biela (Optic White)',
    fit: 'Heavyweight Oversized',
    material: '100 % ťažká bavlna (250 g/m²)',
    sizes: ['M', 'L'],
    inStock: true,
    stockCount: 6,
    description: 'Univerzálna študentská lož aj nádej. Pre tých, ktorí píšu diplomovku, finišujú štátnice alebo si len jednoducho predĺžili mladosť.',
    highlights: [
      'Posledných 6 kusov skladom',
      'Exkluzívna ťažká gramáž',
      'Vysoký rebrovaný lem pri krku',
      'Kultový slogan'
    ],
    mockDetails: {
      textLines: ['ONE MORE', 'SEMESTER'],
      textColor: '#FFFFFF',
      baseColor: '#181818'
    }
  },
  {
    id: 'prod-13',
    name: 'FP 001 SIGNATURE HOODIE',
    slogan: 'FP DROP\nKOLEJNÍ 29',
    category: 'HOODIES',
    garmentType: 'hoodie',
    price: 899,
    originalPrice: 999,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'LIMITED',
    color: 'Hlboká čierna',
    fit: 'Ultra Heavyweight Oversized',
    material: '80 % bavlna, 20 % recyklovaný polyester (450 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 11,
    description: 'Vlajková loď celého projektu. Extrémne teplá a masívna mikina s kapucňou s gramážou 450 GSM. Hlboká dvojitá kapucňa bez šnúrok v čistom high-fashion streetwearovom strihu. Udrží ťa v teple aj v najchladnejších posluchárňach.',
    highlights: [
      'Extrémna gramáž 450 g/m², french terry úplet',
      'Dvojvrstvová kapucňa, ktorá drží tvar',
      'Diskrétne vyšívané logo FP DROP na zápästí',
      'Priestranné klokanie vrecko'
    ],
    mockDetails: {
      textLines: ['FP DROP', 'KOLEJNÍ 29'],
      textColor: '#FFFFFF',
      baseColor: '#0A0A0A',
      backTextLines: ['YOUR UNIVERSITY', 'YOUR UNIFORM']
    }
  },
  {
    id: 'prod-14',
    name: 'EXAM SURVIVOR HOODIE',
    slogan: 'EXAM\nSURVIVOR',
    category: 'HOODIES',
    garmentType: 'hoodie',
    price: 949,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'NEW',
    color: 'Krémová (Ecru)',
    fit: 'Boxy Heavyweight',
    material: '85 % bio bavlna, 15 % polyester (420 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 18,
    description: 'Tvoja druhá koža počas skúškového maratónu. Vnútorná počesaná fleecová vrstva pre maximálny komfort, pevné náplety a brutálny streetwearový strih.',
    highlights: [
      'Počesaný hrejivý fleece vnútri',
      'Zosilnené švy v namáhaných miestach',
      'Kvalitné kovové očká a široké sťahovacie šnúrky',
      'Minimalistický nápis na hrudi'
    ],
    mockDetails: {
      textLines: ['EXAM', 'SURVIVOR'],
      textColor: '#F0F0F0',
      baseColor: '#1C1C1C'
    }
  },
  {
    id: 'prod-15',
    name: 'BRNO BRUTALISM CREWNECK',
    slogan: 'BRNO\nBRUTALISM',
    category: 'SWEATSHIRTS',
    garmentType: 'sweatshirt',
    price: 799,
    dropId: 'drop-004',
    dropName: 'DROP 004 — BRNO',
    status: 'AVAILABLE',
    color: 'Sivý melír (Heather Gray)',
    fit: 'Boxy Crewneck Fit',
    material: '100 % bavlna french terry (380 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 20,
    description: 'Čistý crewneck sveter bez kapucne. Architektonické línie, ťažká nepočesaná bavlna a decentný akcent. Perfektná alternatíva k saku na neformálne skúšky.',
    highlights: [
      '380 g/m² prémiový francúzsky froté úplet',
      'Široké rebrované manžety a spodný lem',
      'Čistý streetwearový profil',
      'Jednoduchá kombinovateľnosť'
    ],
    mockDetails: {
      textLines: ['BRNO', 'BRUTALISM'],
      textColor: '#FFFFFF',
      baseColor: '#111111'
    }
  },
  {
    id: 'prod-16',
    name: 'DEADLINE RUNNER CREWNECK',
    slogan: 'DEADLINE\nRUNNER',
    category: 'SWEATSHIRTS',
    garmentType: 'sweatshirt',
    price: 749,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'AVAILABLE',
    color: 'Onyx',
    fit: 'Relaxed Unisex Fit',
    material: '80 % bavlna, 20 % polyester (360 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 24,
    description: 'Pre chvíle, keď odovzdávaš o 23:59 a systém ešte stihne nahrať PDF. Ľahká športovo-streetwearová elegancia do posluchárne.',
    highlights: [
      'Príjemná zmes s tvarovou stálosťou',
      'Elastické manžety s podielom elastanu',
      'Odolná sieťotlač',
      'Vyrobené v limitovanej sérii'
    ],
    mockDetails: {
      textLines: ['DEADLINE', 'RUNNER'],
      textColor: '#FFFFFF',
      baseColor: '#161616'
    }
  },
  {
    id: 'prod-17',
    name: 'FP EMBROIDERY DAD CAP',
    slogan: 'FP DROP',
    category: 'ACCESSORIES',
    garmentType: 'cap',
    price: 349,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'AVAILABLE',
    color: 'Black Washed Twill',
    fit: 'Low Profile Adjustable',
    material: '100 % bavlna, ťažký kepr',
    sizes: ['ONE SIZE (nastaviteľná)'],
    inStock: true,
    stockCount: 30,
    description: 'Neštruktúrovaná bavlnená šiltovka s 3D bielou výšivkou loga FP. Kovová pracka vzadu na dokonalé nastavenie veľkosti.',
    highlights: [
      'Pevný bavlnený kepr 280 g/m²',
      'Kovové zapínanie s gravírovaním',
      'Zahnutý šilt v klasickom štýle 90. rokov',
      'Biela kontrastná výšivka'
    ],
    mockDetails: {
      textLines: ['FP DROP'],
      textColor: '#FFFFFF',
      baseColor: '#121212'
    }
  },
  {
    id: 'prod-18',
    name: 'BRNO NIGHTLINE SNAPBACK',
    slogan: 'NIGHTLINE',
    category: 'ACCESSORIES',
    garmentType: 'cap',
    price: 379,
    dropId: 'drop-003',
    dropName: 'DROP 003 — FP AFTER DARK',
    status: 'LIMITED',
    color: 'Pitch Black',
    fit: '5-Panel Flat Peak',
    material: '100 % bavlna',
    sizes: ['ONE SIZE'],
    inStock: true,
    stockCount: 15,
    description: 'Moderná päťpanelová šiltovka s rovným šiltom a výraznou výšivkou NIGHTLINE. Kúsok stvorený na piatkové brnianske noci.',
    highlights: [
      'Moderná 5-panelová konštrukcia',
      'Tyrkysová výšivka NIGHTLINE',
      'Ventilačné očká po obvode',
      'Nastaviteľný plastový pások'
    ],
    mockDetails: {
      textLines: ['NIGHTLINE', 'BRNO'],
      textColor: '#FFFFFF',
      baseColor: '#0A0A0A'
    }
  },
  {
    id: 'prod-19',
    name: 'CAMPUS SURVIVAL TOTE',
    slogan: 'CAMPUS\nSURVIVAL',
    category: 'ACCESSORIES',
    garmentType: 'tote',
    price: 249,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'AVAILABLE',
    color: 'Prírodná (Natural Canvas)',
    fit: 'Extra Large Capacity (20 L)',
    material: '100 % ťažké bavlnené plátno (320 g/m²)',
    sizes: ['ONE SIZE (38 × 42 × 10 cm)'],
    inStock: true,
    stockCount: 45,
    description: 'Zabudni na chatrné plátenky z veľtrhu. Táto taška z 320 g plátna pojme 16" MacBook Pro, tri učebnice mikroekonómie, fľašu s vodou aj desiatu z menzy.',
    highlights: [
      'Unesie až 15 kg bez naťahovania úch',
      'Zosilnené krížové prešitie popruhov',
      'Dno so záševkom pre väčší objem',
      'Vnútorné vrecko na zips na telefón a kľúče'
    ],
    mockDetails: {
      textLines: ['CAMPUS', 'SURVIVAL', 'FP VUT'],
      textColor: '#FFFFFF',
      baseColor: '#171717'
    }
  },
  {
    id: 'prod-20',
    name: 'ECTS COLLECTOR TOTE',
    slogan: 'ECTS\nCOLLECTOR',
    category: 'ACCESSORIES',
    garmentType: 'tote',
    price: 279,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'AVAILABLE',
    color: 'Prírodná (Natural Canvas)',
    fit: 'Large Volume with Base',
    material: '100 % recyklované plátno (340 g/m²)',
    sizes: ['ONE SIZE (40 × 44 cm)'],
    inStock: true,
    stockCount: 38,
    description: 'Vrece na zbieranie zápočtov a kreditov. Prírodné plátenné prevedenie s výraznou čiernou typografiou a dlhými uchami cez plece.',
    highlights: [
      'Vyrobené z recyklovaných bavlnených vlákien',
      'Dlhé uchá (70 cm) pohodlné na pleci aj cez zimnú bundu',
      'Vysoká odolnosť proti oderu',
      'Kvalitná vodou riediteľná sieťotlač'
    ],
    mockDetails: {
      textLines: ['ECTS', 'COLLECTOR'],
      textColor: '#F5F5F5',
      baseColor: '#111111'
    }
  },
  {
    id: 'prod-21',
    name: 'KOLEJNÍ 29 SOCKS',
    slogan: 'KOLEJNÍ 29',
    category: 'ACCESSORIES',
    garmentType: 'socks',
    price: 179,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'AVAILABLE',
    color: 'Biela (White)',
    fit: 'Mid-Calf Ribbed Crew',
    material: '82 % česaná bavlna, 15 % polyamid, 3 % elastan',
    sizes: ['38–41', '42–46'],
    inStock: true,
    stockCount: 52,
    description: 'Rebrované streetwearové ponožky v balení po 2 pároch (biele s tyrkysovým nápisom KOLEJNÍ 29). Zosilnená päta a špička pre maximálnu výdrž na kampuse.',
    highlights: [
      'Dvojbalenie v matnej papierovej páske',
      'Zosilnené froté polstrovanie chodidla',
      'Pružný rebrovaný lem, ktorý neškrtí a nezosúva sa',
      'Tkaný nápis KOLEJNÍ 29 aj na chodidle'
    ],
    mockDetails: {
      textLines: ['KOLEJNÍ 29'],
      textColor: '#FFFFFF',
      baseColor: '#121212'
    }
  },
  {
    id: 'prod-22',
    name: 'NO SLEEP SOCKS',
    slogan: 'NO SLEEP',
    category: 'ACCESSORIES',
    garmentType: 'socks',
    price: 169,
    dropId: 'drop-002',
    dropName: 'DROP 002 — EXAM SEASON',
    status: 'AVAILABLE',
    color: 'All Black',
    fit: 'Athletic High Cut',
    material: '80 % bavlna, 17 % polyamid, 3 % elastan',
    sizes: ['38–41', '42–46'],
    inStock: true,
    stockCount: 40,
    description: 'Športovo ladené čierne ponožky na dlhé dni aj noci. Priedušná zóna cez priehlavok zaručuje vetranie aj v teniskách počas skúškového.',
    highlights: [
      'Tlmenie nárazov pri došľape',
      'Anatomické tvarovanie pre ľavé a pravé chodidlo',
      'Ploché švy na špičke proti otlakom',
      'Študentská cena'
    ],
    mockDetails: {
      textLines: ['NO SLEEP', 'FP DROP'],
      textColor: '#FFFFFF',
      baseColor: '#0E0E0E'
    }
  },
  {
    id: 'prod-23',
    name: 'FP DROP VINYL STICKERS',
    slogan: 'FP STICKERS',
    category: 'ACCESSORIES',
    garmentType: 'stickers',
    price: 99,
    dropId: 'drop-001',
    dropName: 'DROP 001 — FIRST SEMESTER',
    status: 'AVAILABLE',
    color: 'Monochrome Vinyl',
    fit: 'Die-cut, rôzne formáty (5–10 cm)',
    material: 'Vodeodolný matný UV laminovaný vinyl',
    sizes: ['Sada 10 ks'],
    inStock: true,
    stockCount: 88,
    description: 'Sada matných vinylových nálepiek na notebook, iPad, fľašu alebo zošit. Obsahuje hlášky "NO SLEEP", "KOLEJNÍ 29" a logo FP DROP.',
    highlights: [
      '4 originálne dizajny v balení',
      '100 % vodeodolné s UV ochranou proti vyblednutiu',
      'Nezanechávajú lepidlo pri odlepení z notebooku',
      'Darček zadarmo ku každej objednávke nad 500 Kč'
    ],
    mockDetails: {
      textLines: ['FP DROP', '10X PACK'],
      textColor: '#FFFFFF',
      baseColor: '#1A1A1A'
    }
  },
  {
    id: 'prod-24',
    name: 'BRNO HOLOGRAPHIC STICKERS',
    slogan: 'BRNO VIBES',
    category: 'ACCESSORIES',
    garmentType: 'stickers',
    price: 119,
    dropId: 'drop-004',
    dropName: 'DROP 004 — BRNO',
    status: 'LIMITED',
    color: 'Holographic & Matte Black',
    fit: 'Die-cut nálepky (8 ks)',
    material: 'Holografická prémiová fólia 3M',
    sizes: ['Sada 8 ks'],
    inStock: true,
    stockCount: 65,
    description: 'Limitovaná sada nálepiek s dúhovým holografickým odleskom a brnianskou tematikou. Vynikne na každom sivom alebo čiernom MacBooku.',
    highlights: [
      'Efektný holografický lom svetla',
      'Extrémna odolnosť voči poškriabaniu',
      'Presný tvarový orez die-cut',
      'Limitovaná edícia'
    ],
    mockDetails: {
      textLines: ['BRNO VIBES', 'HOLO PACK'],
      textColor: '#E0E7FF',
      baseColor: '#151515'
    }
  }
];

export const PRODUCTS: Product[] = BASE_PRODUCTS.map((prod) => {
  const imgSet = PRODUCT_IMAGES[prod.id] || { front: '/products/winter26/20-hot-girls-go-to-fp-tee.jpg' };
  return {
    ...prod,
    imageUrl: imgSet.front,
    images: imgSet
  };
});

