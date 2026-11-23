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
    category: 'ZO ZÁKULISIA',
    date: '2026-09-15',
    readMinutes: 4,
    author: 'Redakcia FP DROP',
    coverImage: '/products/hoodie-001-front.jpg',
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
    slug: 'heavyweight-bavlna-sprievodca',
    title: 'Prečo práve heavyweight bavlna? Sprievodca materiálmi FP DROP',
    perex:
      '240 g/m² pri tričkách, 420 g/m² pri mikinách. Čo tie čísla znamenajú, prečo na nich záleží a ako sa o kúsky starať, aby vydržali celé štúdium.',
    category: 'PRODUKTY',
    date: '2026-10-08',
    readMinutes: 5,
    author: 'Redakcia FP DROP',
    coverImage: '/products/no-sleep-front.jpg',
    coverAlt: 'Čierne tričko NO SLEEP z ťažkej bavlny',
    tags: ['materiály', 'tričká', 'mikiny', 'starostlivosť'],
    relatedProductIds: ['prod-02', 'prod-14', 'prod-03'],
    sections: [
      {
        paragraphs: [
          'Gramáž (g/m²) udáva, koľko váži štvorcový meter látky. Bežné reklamné tričko má okolo 150 g/m² — je tenké, po pár praniach stratí tvar a golier sa zvlní. Preto sme sa pri FP DROP rozhodli ísť opačnou cestou.'
        ]
      },
      {
        heading: 'Tričká: 220–240 g/m²',
        paragraphs: [
          'Ťažšia bavlna lepšie drží oversized „boxy“ strih, nepresvitá a príjemne padá. Spevnený golier si zachová tvar aj po desiatkach praní. Väčšina tričiek je z česanej organickej bavlny, ktorá je jemnejšia na dotyk a šetrnejšia k prírode.'
        ]
      },
      {
        heading: 'Mikiny: 400–450 g/m²',
        paragraphs: [
          'Mikiny sú stavané na dlhé večery v knižnici aj na cestu električkou cez zimné Brno. Vnútorný počesaný fleece hreje, ale dýcha, a dvojitá kapucňa drží tvar aj bez šnúrok. Vlajková FP 001 Signature Hoodie má navyše skrytú kapsičku na ISIC kartu.'
        ]
      },
      {
        heading: 'Ako sa o kúsky starať',
        paragraphs: ['Pár jednoduchých pravidiel výrazne predĺži životnosť potlače aj látky:'],
        list: [
          'per naruby pri 30 °C,',
          'nepoužívaj sušičku — bavlna sa môže zraziť,',
          'nežehli priamo na potlač,',
          'tmavé kúsky per s tmavými, aby si zachovali sýtu čiernu.'
        ]
      },
      {
        heading: 'Udržateľnosť nie je len slovo',
        paragraphs: [
          'Kvalitnejší kúsok, ktorý vydrží roky, je ekologickejší než tri lacné tričká, ktoré skončia v koši po jednom semestri. Preto radšej vyrábame menej, ale poriadne.'
        ]
      }
    ]
  },
  {
    slug: 'outfit-na-cely-den-v-brne',
    title: 'Jeden outfit na celý deň: od rannej prednášky po večerné Brno',
    perex:
      'Ranná prednáška, tímový projekt, knižnica a večer s kamarátmi v centre. Ukazujeme, ako poskladať študentský outfit, ktorý zvládne celý deň bez prezliekania.',
    category: 'LIFESTYLE',
    date: '2026-11-02',
    readMinutes: 4,
    author: 'Redakcia FP DROP',
    coverImage: '/products/fp-after-dark-front.jpg',
    coverAlt: 'Tričko FP AFTER DARK na večerné Brno',
    tags: ['lifestyle', 'outfit', 'Brno', 'študentský život'],
    relatedProductIds: ['prod-04', 'prod-17', 'prod-19', 'prod-21'],
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
          'Mikinu hoď do tašky a nechaj vyniknúť tričko. Kolekcia FP After Dark má reflexný detail pod golierom, takže si ťa všimnú aj pri ceste domov nočnou linkou.'
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
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find(post => post.slug === slug);

export const formatBlogDate = (iso: string): string =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
