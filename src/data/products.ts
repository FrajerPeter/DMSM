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
    color: 'Černá (Washed Black)',
    fit: 'Oversized Boxy Fit',
    material: '100% česaná bio bavlna (240 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 14,
    description: 'Ikonický kousek naší komunity inspirovaný estetikou moderního streetwearu. Těžká organická bavlna, zpevněný límec a výrazná bílá typografie na hrudi. Navrženo pro studentky i studenty, kteří berou studium s nadsázkou a stylem.',
    highlights: [
      'Heavyweight 240 g/m² organická bavlna',
      'Kvalitní sítotisk odolný vůči praní na 30 °C',
      'Unisex uvolněný oversized střih s padlými rameny',
      'Tkaný štítek FP DROP na spodním lemu'
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
    color: 'Sytě černá (Jet Black)',
    fit: 'Boxy Heavyweight Fit',
    material: '100% bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 28,
    description: 'Oficiální uniforma zápočtového týdne a zkouškového maratonu. Vtip, který pochopí každý, kdo někdy psal seminární práci ve tři ráno v knihovně nebo na pokoji na Kolejní.',
    highlights: [
      'Pevná bavlněná gramáž s hedvábným omakem',
      'Typografie ve stylu švýcarského brutalismu',
      'Bezešvé dvojité prošití rukávů a lemu',
      'Lokální sítotisk v brněnské dílně'
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
    color: 'Vintage Uhlová (Charcoal)',
    fit: 'Oversized Street Cut',
    material: '100% enzymaticky praná bavlna (250 g/m²)',
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 4,
    description: 'Kredity přicházejí a odcházejí, ale vkus a vzpomínky na Brno zůstávají. Prémiové vintage prané triko s jemně strukturovaným povrchem a zadním detailním nápisem.',
    highlights: [
      'Enzymatické vintage oprání pro měkký autentický feeling',
      'Zadní grafika s kalkulací semestrálních kreditů',
      'Vyšší žebrovaný límec držící tvar',
      'Poslední kusy ze série 001'
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
    color: 'Onyx Black',
    fit: 'Relaxed Street Cut',
    material: '100% česaná bavlna (230 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 19,
    description: 'Triko pro ty nejlepší zážitky po skončení přednášek. Klubové večery na Flédě, rozjezdy z Hlavního nádraží a debaty u piva na Jakubském náměstí.',
    highlights: [
      'Decentní reflexní tisk odrážející světlo',
      'Vhodné na denní nošení i večerní akce',
      'Komfortní měkký materiál',
      'Limitovaný náklad 100 kusů'
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
    color: 'Pure Black',
    fit: 'Standard Oversize Fit',
    material: '100% bavlna (220 g/m²)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 42,
    description: 'Hrdé prohlášení o městě, které nám dává prostor růst, studovat a tvořit. Čistý geometrický design inspirovaný brněnským minimalismem.',
    highlights: [
      'Univerzální nadčasový střih',
      'Minimalistická typografie na hrudi',
      'GPS souřadnice kampusu Kolejní na rukávu',
      'Prodyšná přírodní bavlna'
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
    color: 'Matná černá',
    fit: 'Oversized Boxy',
    material: '100% bio bavlna (240 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 22,
    description: 'Kdo říká, že ekonomka a management musí být nuda v šedém obleku? FP VUT je o inovacích, startupech a odvaze dělat věci jinak.',
    highlights: [
      'Prostorný střih s širokými rukávy',
      'Hebká bavlněná vazba',
      'Vhodné k volným kalhotám i džínsům',
      'Praní na 30 °C'
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
    color: 'Soot Black',
    fit: 'Oversized Fit',
    material: '100% bavlna (230 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 31,
    description: 'Základní ekonomická rovnice každého studenta FP: směnný kurz mezi blížícím se termínem odevzdání a třetím dvojitým espressem dne.',
    highlights: [
      'Typografie inspirovaná burzovními tikery',
      'Příjemná prodyšnost při celodenním nošení',
      'Stálobarevný tisk',
      'Designováno v Brně'
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
    material: '100% bavlna (220 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 16,
    description: 'Svatá trojice semestrálního života. Jednoduchý a úderný nápis, který shrnuje celý studentský koloběh od října do května.',
    highlights: [
      'Kontrastní čistě bílý tisk',
      'Klasický crewneck límeček',
      'Certifikace OEKO-TEX Standard 100',
      'Testováno na studentských akcích'
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
    color: 'Deep Black',
    fit: 'Boxy Fit',
    material: '100% bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: false,
    stockCount: 0,
    description: 'Když vejdeš do místnosti a všichni vědí. Vyprodaný limitovaný kousek z pilotního spuštění Drop 001. Připravujeme restock v příštím dropu.',
    highlights: [
      'Vyprodáno během prvních 48 hodin',
      'Kultovní kousek první edice',
      'Hustá bavlněná příze',
      'Přihlas se k odběru pro info o restocku'
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
    color: 'Asphalt Gray',
    fit: 'Relaxed Daily Fit',
    material: '100% bavlna (200 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 35,
    description: 'Diskrétní omluvenka pro spolubydlící i přátele. Triko pro tiché dny strávené mezi regály v knihovně VUT na Kolejní.',
    highlights: [
      'Odlehčená příjemná gramáž 200 g/m²',
      'Decentní velikost písma na levé straně hrudi',
      'Ideální vrstva pod mikinu nebo košili',
      'Studentská cena 299 Kč'
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
    material: '100% česaná bio bavlna (240 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 25,
    description: 'Ať už jsi rodilý Brňák, nebo ses sem přestěhoval kvůli FP z druhého konce republiky nebo ze Slovenska. Brno se stane domovem.',
    highlights: [
      'Silná komunitní identita',
      'Masivní 240g organická bavlna',
      'Dvojitý steh na límci',
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
    color: 'Vintage Black',
    fit: 'Heavyweight Oversized',
    material: '100% těžká bavlna (250 g/m²)',
    sizes: ['M', 'L'],
    inStock: true,
    stockCount: 6,
    description: 'Univerzální studentská lež i naděje. Pro ty, kteří píší diplomku, finišují státnice, nebo si jen prostě prodloužili mládí.',
    highlights: [
      'Posledních 6 kusů skladem',
      'Exkluzivní těžká gramáž',
      'Vysoký žebrovaný lem u krku',
      'Kultovní slogan'
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
    color: 'Hluboká černá',
    fit: 'Ultra Heavyweight Oversized',
    material: '80% bavlna, 20% recyklovaný polyester (450 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 11,
    description: 'Vlajková loď celého projektu. Extrémně teplá a masivní mikina s kapucí o gramáži 450 GSM. Hluboká dvojitá kapuce bez šňůrek v čistém high-fashion streetwear střihu. Udrží tě v teple i v nejstudenějších posluchárnách.',
    highlights: [
      'Extrémní gramáž 450 g/m² french terry úplet',
      'Dvojvrstvá bezešvá kapuce držící tvar',
      'Diskrétní vyšívané logo FP DROP na zápěstí',
      'Prostorná klokaní kapsa'
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
    color: 'Washed Charcoal',
    fit: 'Boxy Heavyweight',
    material: '85% bio bavlna, 15% polyester (420 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 18,
    description: 'Tvá druhá kůže během zkouškového maratonu. Vnitřní počesaná fleece vrstva pro maximální komfort, pevné náplety a brutální streetwearový fit.',
    highlights: [
      'Počesaný hřejivý fleece uvnitř',
      'Zesílené švy v namáhaných místech',
      'Kvalitní kovová očka a široké stahovací šňůry',
      'Minimalistický nápis na kapuci'
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
    color: 'Jet Black',
    fit: 'Boxy Crewneck Fit',
    material: '100% bavlna french terry (380 g/m²)',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 20,
    description: 'Čistý crewneck sweatshirt bez kapuce. Architektonické linie, těžká nepodčesaná bavlna a decentní bílý akcent. Perfektní alternativa k saku na neformální zkoušky.',
    highlights: [
      '380 g/m² prémiový francouzský froté úplet',
      'Široké žebrované manžety a spodní lem',
      'Čistý streetwear profil',
      'Snadná kombinovatelnost'
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
    material: '80% bavlna, 20% polyester (360 g/m²)',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 24,
    description: 'Pro chvíle, kdy odevzdáváš ve 23:59 a systém ještě stíhá nahrát PDF. Lehká sportovně-streetwearová elegance do posluchárny.',
    highlights: [
      'Příjemná směs s tvarovou stálostí',
      'Elastické manžety s podílem elastanu',
      'Odolný sítotisk',
      'Vyrobeno v limitované sérii'
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
    material: '100% bavlna těžký kepr',
    sizes: ['ONE SIZE (Nastavitelná)'],
    inStock: true,
    stockCount: 30,
    description: 'Nestrukturovaná bavlněná kšiltovka s 3D bílou výšivkou loga FP DROP. Kovová přezka na zadní straně pro dokonalé nastavení velikosti.',
    highlights: [
      'Pevný bavlněný kepr 280 g/m²',
      'Kovové zapínání s gravírováním',
      'Zahnutý kšilt v klasickém 90s stylu',
      'Bílá kontrastní výšivka'
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
    material: '100% bavlna',
    sizes: ['ONE SIZE'],
    inStock: true,
    stockCount: 15,
    description: 'Pětipanelová moderní kšiltovka s rovným kšiltem a reflexním potiskem NIGHTLINE. Kousek stvořený pro páteční brněnské noci.',
    highlights: [
      'Moderní 5-panel konstrukce',
      'Reflexní prvek viditelný ve tmě',
      'Ventilační očka po obvodu',
      'Nastavitelný plastový pásek'
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
    color: 'Přírodní černá (Heavy Canvas)',
    fit: 'Extra Large Capacity (20 L)',
    material: '100% těžké bavlněné plátno (320 g/m²)',
    sizes: ['ONE SIZE (38 × 42 × 10 cm)'],
    inStock: true,
    stockCount: 45,
    description: 'Zapomeň na chatrné plátěnky z veletrhu. Tato taška z 320g plátna pojme 16" MacBook Pro, tři učebnice mikroekonomie, láhev s vodou i svačinu z menzy.',
    highlights: [
      'Unese až 15 kg bez natahování uch',
      'Zesílené křížové prošití popruhů',
      'Dno se záševkem pro větší objem',
      'Vnitřní kapsička na zip pro telefon a klíče'
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
    color: 'Deep Black Canvas',
    fit: 'Large Volume with Base',
    material: '100% recyklované plátno (340 g/m²)',
    sizes: ['ONE SIZE (40 × 44 cm)'],
    inStock: true,
    stockCount: 38,
    description: 'Pytel na sbírání zápočtů a kreditů. Elegantní celočerné provedení s minimalistickým typografickým sloganem a dlouhými uchy přes rameno.',
    highlights: [
      'Vyrobeno z recyklovaných bavlněných vláken',
      'Dlouhá ucha (70 cm) pohodlná na rameni přes zimní bundu',
      'Vysoká odolnost proti oděru',
      'Kvalitní vodou ředitelný sítotisk'
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
    color: 'Černá & Bílá (Dvojbalení)',
    fit: 'Mid-Calf Ribbed Crew',
    material: '82% česaná bavlna, 15% polyamid, 3% elastan',
    sizes: ['38–41', '42–46'],
    inStock: true,
    stockCount: 52,
    description: 'Žebrované streetwearové ponožky v balení po 2 párech (jeden černý s bílým nápisem, jeden bílý s černým). Zesílená pata a špička pro maximální výdrž na campusu.',
    highlights: [
      'Dvojbalení v luxusní matné papírové pásce',
      'Zesílené froté polstrování chodidla',
      'Pružný žebrovaný lem, který neškrtí a nesjíždí',
      'Tkaný nápis KOLEJNÍ 29 na zadní straně lýtka'
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
    material: '80% bavlna, 17% polyamid, 3% elastan',
    sizes: ['38–41', '42–46'],
    inStock: true,
    stockCount: 40,
    description: 'Sportovně laděné černé ponožky pro dlouhé dny i noci. Prodyšná zóna přes nárt zaručuje větrání i v teniskách během zkouškového.',
    highlights: [
      'Tlumení nárazů v došlapu',
      'Anatomické tvarování pro levé a pravé chodidlo',
      'Ploché švy na špičce proti otlakům',
      'Studentský cenový strop'
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
    fit: 'Die-cut Různé formáty (5–10 cm)',
    material: 'Voděodolný matný UV laminovaný vinyl',
    sizes: ['Sada 10 ks'],
    inStock: true,
    stockCount: 88,
    description: 'Sada 10 matných vinylových samolepek pro polepení notebooku, iPadu, láhve na pití nebo sešitu. Obsahuje hlášky "HOT GIRLS GO TO FP", "NO SLEEP", "KOLEJNÍ 29" a logo FP DROP.',
    highlights: [
      '10 originálních designů v balení',
      '100% voděodolné s UV ochranou proti vyblednutí',
      'Nezanechávají lepidlo při odlepení z notebooku',
      'Dárek zdarma ke každé objednávce nad 500 Kč'
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
    fit: 'Die-cut Samolepky (8 ks)',
    material: 'Holografická prémiová fólie 3M',
    sizes: ['Sada 8 ks'],
    inStock: true,
    stockCount: 65,
    description: 'Limitovaná sada samolepek s duhovým holografickým odleskem a brněnskou tematikou. Vynikne na každém šedém nebo černém MacBooku.',
    highlights: [
      'Efektní holografický lom světla',
      'Extrémní odolnost vůči poškrábání',
      'Přesný tvarový ořez die-cut',
      'Limitovaná edice'
    ],
    mockDetails: {
      textLines: ['BRNO VIBES', 'HOLO PACK'],
      textColor: '#E0E7FF',
      baseColor: '#151515'
    }
  }
];

export const PRODUCTS: Product[] = BASE_PRODUCTS.map((prod) => {
  const imgSet = PRODUCT_IMAGES[prod.id] || { front: '/products/hot-girls-front.jpg' };
  return {
    ...prod,
    imageUrl: imgSet.front,
    images: imgSet
  };
});

