// Ukážkové blogové články FP DROP (akademický prototyp).
// Texty sú redakčné koncepty značky, nie výpovede konkrétnych študentov.

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  perex: string;
  category: string;
  date: string; // ISO dátum
  readMinutes: number;
  author: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  sections: BlogSection[];
  relatedProductIds: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ako-vznikol-fp-drop',
    title: 'Ako vznikol FP DROP: od nápadu na chodbe po prvý drop',
    perex:
      'Študentský merch nemusí byť nudné tričko s logom fakulty. Pozreli sme sa na to, prečo FP DROP funguje ako limitované kolekcie a čo sa deje predtým, než kúsok vôbec vyrobíme.',
    category: 'VUT FP',
    date: '2026-09-15',
    readMinutes: 4,
    author: 'Redakcia FP DROP',
    coverImage: '/products/winter26/32-fp-001-signature-hoodie.jpg',
    coverAlt: 'Čierna mikina FP 001 Signature Hoodie',
    tags: ['značka', 'dropy', 'komunita'],
    relatedProductIds: ['prod-13', 'prod-01', 'prod-23'],
    sections: [
      {
        paragraphs: [
          'Na začiatku bola jednoduchá otázka: prečo si študenti Fakulty podnikateľskej kupujú oblečenie s logami cudzích univerzít, ale to svoje nosia len na promóciách? Odpoveď bola rovnako jednoduchá — klasický univerzitný merch pôsobí ako povinná uniforma, nie ako niečo, čo by si človek obliekol dobrovoľne.'
        ]
      },
      {
        heading: 'Drop namiesto stáleho katalógu',
        paragraphs: [
          'FP DROP preto nefunguje ako bežný e-shop s nekonečnou ponukou. Každý semester prinesie jednu limitovanú kolekciu — drop — s vlastnou témou: začiatok semestra, skúškové, brnianske noci alebo samotné Brno.',
          'Limitované množstvo má praktický dôvod: vyrábame len to, o čo je skutočný záujem, a znižujeme tak riziko neprodaných zásob. Zároveň každý kúsok zostáva niečím, čo nemá celá fakulta.'
        ]
      },
      {
        heading: 'Ako vzniká jeden kúsok',
        paragraphs: ['Od nápadu po hotový produkt prechádza každý návrh niekoľkými krokmi:'],
        list: [
          'zber nápadov — vtipy a hlášky, ktorým rozumie len komunita FP,',
          'skice a typografia v štýle švajčiarskeho brutalizmu,',
          'anketa na Instagrame, ktorý motív ide do výroby,',
          'výber materiálu a dodávateľa s dôrazom na organickú bavlnu,',
          'predobjednávky a limitovaná výroba.'
        ]
      },
      {
        heading: 'Čo bude ďalej',
        paragraphs: [
          'DROP 001 „First Semester“ je len začiatok. Ďalšie kolekcie chceme ešte viac otvoriť študentom — či už hlasovaním o motívoch, alebo spoluprácou so študentskými spolkami. Ak máš nápad, ktorý by mal skončiť na tričku, daj nám vedieť.'
        ]
      }
    ]
  },
  {
    slug: 'outfit-na-cely-den-v-brne',
    title: 'Študentský deň v Brne: od rannej prednášky na Kolejní po večerné mesto',
    perex:
      'Ranná prednáška, tímový projekt, knižnica a večer s kamarátmi v centre. Ukazujeme, ako poskladať študentský outfit, ktorý zvládne celý deň bez prezliekania.',
    category: 'ŽIVOT V BRNE',
    date: '2026-11-02',
    readMinutes: 4,
    author: 'Redakcia FP DROP',
    coverImage: '/products/winter26/30-brno-is-home-tee.jpg',
    coverAlt: 'Tričko BRNO IS HOME s mapou Brna',
    tags: ['lifestyle', 'outfit', 'Brno', 'študentský život'],
    relatedProductIds: ['prod-11', 'prod-04', 'prod-17', 'prod-19', 'prod-21'],
    sections: [
      {
        paragraphs: [
          'Študentský deň má málokedy jasný koniec. Preto staviame na kúskoch, ktoré sa dajú vrstviť a ktoré vyzerajú dobre v posluchárni aj v bare.'
        ]
      },
      {
        heading: '8:00 — prednáška na Kolejní',
        paragraphs: [
          'Základ tvorí oversized tričko z ťažkej bavlny. Ráno ho prekry mikinou alebo crewneckom — v posluchárňach býva chladno a vrstva navyše sa hodí aj na cestu električkou.'
        ]
      },
      {
        heading: '13:00 — tímový projekt a knižnica',
        paragraphs: [
          'Plátenná taška Campus Survival Tote unesie 16-palcový notebook, skriptá aj nabíjačku. Dad cap s vyšívaným logom zachráni deň, keď nestihneš ranné umývanie vlasov.'
        ]
      },
      {
        heading: '20:00 — večerné Brno',
        paragraphs: [
          'Mikinu hoď do tašky a nechaj vyniknúť tričko. Tričko FP AFTER DARK s neónovou siluetou nočného mesta je presne na to — a ak sa večer pretiahne, nočná linka ťa odvezie domov.'
        ],
        list: [
          'tričko FP AFTER DARK ako hlavný kúsok,',
          'kšiltovka na deň, žiadna na večer,',
          'ponožky Kolejní 29 ako detail, ktorý pochopia len zasvätení.'
        ]
      },
      {
        heading: 'Tip na záver',
        paragraphs: [
          'Vyber si jednu výraznú vec — potlač, kšiltovku alebo tašku — a zvyšok nechaj jednoduchý. Streetwear funguje najlepšie, keď nepôsobí nasilu.'
        ]
      }
    ]
  },
  {
    slug: 'winter-26-drop',
    title: 'Winter ’26 drop: 24 kúskov na zimný semester',
    perex:
      'Zimná kolekcia FP DROP je tu. Heavyweight tričká, hrejivé mikiny, šiltovky, tašky aj ponožky — prechádzame celým dropom a radíme, čo si vybrať na skúškové aj na zimné Brno.',
    category: 'DROP',
    date: '2026-11-20',
    readMinutes: 5,
    author: 'Redakcia FP DROP',
    coverImage: '/products/winter26/33-exam-survivor-hoodie.jpg',
    coverAlt: 'Krémová mikina EXAM SURVIVOR z kolekcie Winter ’26',
    tags: ['Winter ’26', 'drop', 'mikiny', 'skúškové'],
    relatedProductIds: ['prod-14', 'prod-13', 'prod-16', 'prod-22'],
    sections: [
      {
        paragraphs: [
          'Zimný semester na FP má svoj rytmus: zápočty, seminárky, skúškové a medzi tým vianočné trhy na Zelňáku. Winter ’26 drop sme navrhli presne pre tieto týždne — 24 kúskov, ktoré spája tlmená paleta, výrazná typografia a humor, ktorému rozumie každý, kto niekedy odovzdával prácu päť minút pred polnocou.'
        ]
      },
      {
        heading: 'Tričká: dvanásť hlášok z fakulty',
        paragraphs: [
          'Základom dropu je dvanásť oversized tričiek z ťažkej bavlny 220–240 g/m². Okrem klasík ako HOT GIRLS GO TO FP či NO SLEEP pribudli nové farby: krémové BRNO, pieskové BUSINESS BUT MAKE IT FUN, espresso hnedé TRADING DEADLINES FOR COFFEE alebo lesná zelená PROBABLY IN THE LIBRARY.',
          'Tip: tričká majú voľnejší „boxy“ strih. Ak chceš klasický fit, vezmi o číslo menšie.'
        ]
      },
      {
        heading: 'Mikiny a crewnecky na skúškové',
        paragraphs: [
          'Hviezdou zimy je krémová mikina EXAM SURVIVOR s počesaným fleecom vo vnútri. Kto preferuje čiernu, siahne po vlajkovej FP 001 SIGNATURE HOODIE so skrytou kapsičkou na ISIC kartu. Pre vrstvenie pod kabát sú tu dva crewnecky — BRNO BRUTALISM s motívom brnianskej architektúry a DEADLINE RUNNER.'
        ]
      },
      {
        heading: 'Doplnky, ktoré dotvoria outfit',
        paragraphs: ['Drop dopĺňajú kúsky, ktoré sa hodia aj ako darček pod stromček:'],
        list: [
          'FP EMBROIDERY DAD CAP a BRNO NIGHTLINE SNAPBACK,',
          'plátené tašky CAMPUS SURVIVAL TOTE a ECTS COLLECTOR TOTE na notebook aj skriptá,',
          'ponožky KOLEJNÍ 29 a NO SLEEP,',
          'balíčky vinylových a holografických nálepiek na notebook či fľašu.'
        ]
      },
      {
        heading: 'Limitované množstvo',
        paragraphs: [
          'Ako každý drop, aj Winter ’26 vyrábame v obmedzených sériách podľa záujmu. Keď sa kúsok vypredá, späť sa už nevráti — sleduj preto sekciu Dropy a náš Instagram, kde dávame vedieť o posledných kusoch.'
        ]
      }
    ]
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find(post => post.slug === slug);

export const formatBlogDate = (iso: string): string =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
