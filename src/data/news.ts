import { Article } from '../types';

// Editorial copy and bylines are sample content for the academic prototype.
export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    title: 'Prečo študenti nosia čiernu: psychológia, minimalizmus a streetwear na FP VUT',
    slug: 'proc-studenti-nosi-cernou',
    subtitle: 'Čierna nie je nedostatkom fantázie. Je to praktický základ šatníka moderného vysokoškoláka.',
    date: '18. septembra 2026',
    readTime: '4 min čítania',
    author: 'Matej Kovář',
    authorRole: 'študent FP • ukážkový profil',
    category: 'ŠTÝL A KULTÚRA',
    excerpt: 'Keď ráno utekáš na prednášku o ôsmej na Kolejní 29, nechceš dlho premýšľať nad kombináciou farieb. Čierna zjednoduší výber a nechá priestor na dôležitejšie veci.',
    quote: '„Čierna nie je len farba. Je to postoj: mám dôležitejšie veci na práci než sledovať každý trend, a pritom chcem vyzerať dobre.“',
    content: [
      'Prejdi sa o ôsmej ráno vestibulom Fakulty podnikateľskej VUT v Brne a všimneš si jednu vec: čierne tričká, mikiny, batohy a tmavé džínsy.',
      'Nie je to náhoda. Únava z rozhodovania je jav, pri ktorom nás množstvo každodenných volieb vyčerpáva. Jednoduchý šatník môže ráno ušetriť čas a energiu. Pre študenta, ktorý balansuje medzi zápočtami, skúškami a brigádou, je čierny streetwear praktickou voľbou.',
      'Čierna zároveň vytvára čistý základ, ktorý sa ľahko kombinuje. V spojení s kvalitným materiálom a výraznou typografiou vzniká estetika, ktorá nestojí na veľkom logu ani na krátkodobom trende.',
      'Aj preto je základná kolekcia FP DROP navrhnutá v čiernych a antracitových odtieňoch s kontrastnou bielou potlačou.'
    ],
    relatedProductIds: ['prod-01', 'prod-13', 'prod-03']
  },
  {
    id: 'art-02',
    title: '5 vecí, ktoré pochopí len študent FP VUT v Brne',
    slug: '5-veci-ktere-pochopi-jen-student-fp-vut',
    subtitle: 'Od schodov na Kolejní až po kávové rituály medzi prednáškami.',
    date: '12. septembra 2026',
    readTime: '5 min čítania',
    author: 'Terézia Novotná',
    authorRole: 'študentka FP • ukážkový profil',
    category: 'KOMUNITA',
    excerpt: 'Každá fakulta má svoje rituály. Toto je päť ukážkových postrehov o každodennom živote na podnikateľskej fakulte.',
    quote: '„Keď na oslave povieš ECTS a niekto si povzdychne, možno študuje s tebou na VUT.“',
    content: [
      '1. Ranná cesta do kopca na Kolejní 29: Či už ideš dvanástkou na Červinkovu alebo električkou smerom k Technologickému parku, posledný úsek ku kampusu ťa ráno preberie.',
      '2. Káva a termíny: Kávomaty na fakulte a blízke kaviarne pomáhajú zvládnuť dlhé dni. Počas zápočtového týždňa sa káva stáva súčasťou študijnej rutiny.',
      '3. Debata medzi fakultami: Každá študijná oblasť prináša iný pohľad. Pri spoločnom projekte sa hodí rozumieť číslam aj tomu, ako predstaviť nápad ľuďom.',
      '4. Obed v menze: Miesto, kde sa pri jednom stole stretnú prváci, starší študenti aj vyučujúci.',
      '5. Nočné spoje z hlavnej stanice: Brniansky večer sa niekedy končí čakaním na nočný autobus. Aj vtedy je cesta späť súčasťou študentského života.'
    ],
    relatedProductIds: ['prod-02', 'prod-07', 'prod-21']
  },
  {
    id: 'art-03',
    title: 'Ako zvládnuť skúškové a nezblázniť sa: úprimný sprievodca',
    slug: 'jak-prezit-zkouskove-a-nezblaznit-se',
    subtitle: 'Pomodoro, plánovanie kreditov a pohodlné oblečenie na dlhé študijné dni.',
    date: '5. septembra 2026',
    readTime: '6 min čítania',
    author: 'Dávid Beneš',
    authorRole: 'absolvent FP • ukážkový profil',
    category: 'ŠTUDENTSKÝ ŽIVOT',
    excerpt: 'Skúškové preverí vedomosti aj schopnosť oddychovať. Tu je niekoľko nápadov, ako si obdobie skúšok lepšie zorganizovať.',
    content: [
      'Každý semester si povieš, že sa tentoraz budeš učiť priebežne. Potom príde december a na stole sa stretnú skriptá, projekty aj termíny skúšok.',
      'Pravidlo číslo 1: Priprav si pracovné prostredie. Skús si rozdeliť učivo na menšie časti a presunúť sa do knižnice alebo študijnej zóny, kde sa ľahšie sústredíš.',
      'Pravidlo číslo 2: Spánok nie je slabosť. Dlhé ponocovanie zhoršuje sústredenie aj pamäť. Oddych je súčasťou prípravy.',
      'Pravidlo číslo 3: Naplánuj si prestávku a malú odmenu. Po skúške si dopraj kávu s kamarátmi, prechádzku centrom alebo večer bez skrípt.'
    ],
    relatedProductIds: ['prod-14', 'prod-02', 'prod-22']
  },
  {
    id: 'art-04',
    title: 'Sprievodca Brnom: kam na výberovú kávu a kam na pivo po prednáškach',
    slug: 'brno-student-guide-kava-a-pivo',
    subtitle: 'Ukážkový výber miest od Kráľovho Poľa až po Jakubské námestie.',
    date: '28. augusta 2026',
    readTime: '5 min čítania',
    author: 'Eliška Dvořáková',
    authorRole: 'redaktorský profil • fiktívny',
    category: 'SPRIEVODCA BRNOM',
    excerpt: 'Brno je plné študentských miest. Toto je ukážková mapa zákutí, kde sa dá učiť, stretnúť s priateľmi alebo osláviť koniec zápočtov.',
    content: [
      'Prečo majú študenti radi Brno? Mnohé miesta sú blízko seba a kaviarne aj kultúrne priestory ponúkajú veľa možností, ako tráviť čas medzi prednáškami.',
      'Výberová káva na učenie: Ak potrebuješ zásuvku a pokoj na notebook, pozri si kaviarne v okolí Veveří a centra. Pred návštevou si over otváracie hodiny a podmienky na prácu.',
      'Pivo a stretnutia pri Jakubovi: Jakubské námestie je obľúbeným miestom na stretnutie v centre. V piatok večer sa tu ľahko dohodne skupina spolužiakov.',
      'Hudba a nočný život: V Brne nájdeš koncerty aj klubové večery. Ak plánuješ večer vonku, vopred si skontroluj program a nočné spojenie späť.'
    ],
    relatedProductIds: ['prod-05', 'prod-11', 'prod-18']
  },
  {
    id: 'art-05',
    title: 'Za kolekciou Drop 001: od náčrtu po bavlnenú látku',
    slug: 'behind-drop-001-vyroba-a-strih',
    subtitle: 'Návrh študentského merchu, ktorý chce byť nositeľným streetwearom.',
    date: '20. augusta 2026',
    readTime: '4 min čítania',
    author: 'Matej Kovář',
    authorRole: 'produktový tím • ukážkový profil',
    category: 'ZO ZÁKULISIA ZNAČKY',
    excerpt: 'FP DROP skúma, ako by mohla vyzerať súčasná kolekcia oblečenia s fakultnou identitou. Parametre materiálu sú zatiaľ návrhom na overenie.',
    quote: '„Pri návrhu sme hľadali strih a materiál, ktorý bude pôsobiť pohodlne aj po celom dni na prednáškach.“',
    content: [
      'Pri návrhu univerzitného oblečenia je ľahké sústrediť sa iba na logo. My sme si položili otázku, aký strih a grafiku by študenti naozaj chceli nosiť aj mimo kampusu.',
      'Cieľom FP DROP je navrhnúť uvoľnené strihy, výraznú typografiu a jednoduchú farebnosť. Ide o tvorivý koncept, nie o výsledok potvrdený výrobou.',
      'V ukážkových návrhoch pracujeme s bavlnenými tričkami a ťažšími mikinami. Gramáž, zloženie, certifikáciu aj spôsob tlače bude potrebné overiť u dodávateľa pred akoukoľvek výrobou.',
      'Drop 001: First Semester predstavuje prvú navrhnutú kolekciu. Jej názvy a vizuály slúžia na prezentáciu študentského projektu.'
    ],
    relatedProductIds: ['prod-01', 'prod-06', 'prod-23']
  },
  {
    id: 'art-06',
    title: 'Ako vznikal návrh FP Hoodie: anatomický pohľad na voľný strih',
    slug: 'jak-jsme-navrhovali-fp-hoodie',
    subtitle: 'Prečo návrh nemá šnúrky, používa dvojitú kapucňu a voľnejší tvar.',
    date: '10. augusta 2026',
    readTime: '3 min čítania',
    author: 'Lukáš Dobeš',
    authorRole: 'produktový tím • ukážkový profil',
    category: 'ŠTÝL A KULTÚRA',
    excerpt: 'Mikina je základom streetwearu. Tento článok opisuje návrhové rozhodnutia v prototype, nie overený hotový výrobok.',
    content: [
      'Pri návrhu mikiny na dlhé dni na prednáškach záleží na každom detaile. Prototyp skúma, ako môže pohodlie fungovať spolu s čistým vzhľadom.',
      'Jedným z návrhových rozhodnutí je kapucňa bez šnúrok. Alternatívou je dvojvrstvový materiál, ktorý by jej pomohol držať tvar; konkrétne riešenie musí potvrdiť vzorka od výrobcu.',
      'Voľnejšie ramená a kratší, širší strih patria medzi prvky, ktoré tím zvažuje. Výsledný strih treba overiť na vzorkách a používateľskom testovaní.',
      'Konkrétna gramáž a zloženie zostávajú návrhovými parametrami, kým ich nepotvrdí dodávateľ.'
    ],
    relatedProductIds: ['prod-13', 'prod-15', 'prod-17']
  },
  {
    id: 'art-07',
    title: 'Študentský streetwear v Brne: keď univerzitný merch dostane nový nápad',
    slug: 'studentsky-streetwear-v-brne',
    subtitle: 'Študentské projekty skúmajú nové spôsoby, ako vyjadriť vzťah k univerzite.',
    date: '2. augusta 2026',
    readTime: '4 min čítania',
    author: 'Terézia Novotná',
    authorRole: 'študentka FP • ukážkový profil',
    category: 'ANALÝZA',
    excerpt: 'Ako možno navrhnúť univerzitné oblečenie, ktoré osloví aj mimo kampusu? Pohľad študentského projektu na identitu a dizajn.',
    content: [
      'Univerzitné oblečenie môže byť viac než suvenír. V zahraničí sa často spája s identitou školy, športovými tímami aj mestskou módou.',
      'Aj v Česku a na Slovensku sa pohľad na univerzitný merch mení. O výsledku rozhoduje kvalita návrhu, cena, spôsob výroby aj to, či sa v ňom študenti cítia prirodzene.',
      'FP DROP je akademický koncept, ktorý skúša spojiť fakultné motívy, študentský humor a súčasný streetwear. To, či by takáto kolekcia uspela, musí ukázať prieskum a reálne testovanie.'
    ],
    relatedProductIds: ['prod-05', 'prod-09', 'prod-19']
  },
  {
    id: 'art-08',
    title: 'ECTS sú len číslo, štýl je osobný: príbeh študentského konceptu',
    slug: 'ects-jsou-jen-cislo-styl-je-vecny',
    subtitle: 'Ako vznikol FP DROP ako semestrálny marketingový projekt.',
    date: '25. júla 2026',
    readTime: '4 min čítania',
    author: 'Matej Kovář',
    authorRole: 'člen tímu • ukážkový profil',
    category: 'AKADEMICKÝ PROJEKT',
    excerpt: 'Web, produktové vizualizácie a marketingové návrhy FP DROP vznikli ako študentská práca na FP VUT.',
    content: [
      'Keď sme dostali zadanie pripraviť koncept e-commerce projektu a marketingový plán pre FP VUT, chceli sme sa venovať téme blízkej študentom.',
      'Projekt skúma možnosť navrhnúť fakultné oblečenie, ktoré by študenti vnímali ako súčasť svojho štýlu. Ide o hypotézu na overenie, nie o potvrdený dopyt.',
      'FP DROP spája návrhy limitovaných kolekcií, digitálny marketing a humor zo študentského života. Spätná väzba od spolužiakov a vyučujúcich pomôže koncept ďalej rozvíjať.'
    ],
    relatedProductIds: ['prod-03', 'prod-01', 'prod-11']
  }
];
