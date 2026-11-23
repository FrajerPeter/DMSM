import { Drop } from '../types';

export const DROPS: Drop[] = [
  {
    id: 'drop-001',
    code: 'DROP 001',
    title: 'FIRST SEMESTER',
    subtitle: 'Nová energia. Čistá tabuľa. Tvoja univerzitná uniforma.',
    date: 'SEPTEMBER 2026',
    status: 'LIVE',
    description: 'Základný kameň študentského šatníka na začiatok akademického roka na FP VUT. Silné typografické motívy, ťažká 240 g bavlna a oversized strihy, ktoré obstoja na prednáškach aj na internáte.',
    productIds: ['prod-01', 'prod-03', 'prod-06', 'prod-09', 'prod-12', 'prod-13', 'prod-17', 'prod-19', 'prod-21', 'prod-23'],
    themeColor: '#ffffff',
    campaignHeadline: 'YOUR UNIVERSITY. YOUR UNIFORM.'
  },
  {
    id: 'drop-002',
    code: 'DROP 002',
    title: 'EXAM SEASON',
    subtitle: 'Kofeín v krvi, deadliny v kalendári a mikina ako útočisko.',
    date: 'JANUÁR 2027',
    status: 'COMING_SOON',
    description: 'Kolekcia na prežitie skúškového obdobia na FP. Teplejšie materiály, extra pohodlné heavyweight mikiny 450 GSM, minimalistické motívy a humor pre tých, ktorí poznajú rozdiel medzi zápočtom a skúškou.',
    productIds: ['prod-02', 'prod-07', 'prod-10', 'prod-14', 'prod-16', 'prod-20', 'prod-22'],
    themeColor: '#d4d4d4',
    campaignHeadline: 'NO SLEEP. JUST DEADLINES.'
  },
  {
    id: 'drop-003',
    code: 'DROP 003',
    title: 'FP AFTER DARK',
    subtitle: 'Keď padne tma nad Brnom a štúdium ide na chvíľu bokom.',
    date: 'MAREC 2027',
    status: 'COMING_SOON',
    description: 'Nočná edícia pre brniansky nočný život a študentské party. Čierny streetwear s reflexnými a vysoko kontrastnými prvkami. Limitovaná edícia pre kluby, bary a neskoré návraty nočnou linkou.',
    productIds: ['prod-04', 'prod-08', 'prod-18'],
    themeColor: '#e5e5e5',
    campaignHeadline: 'BUILT FOR THE BRNO NIGHTS.'
  },
  {
    id: 'drop-004',
    code: 'DROP 004',
    title: 'BRNO',
    subtitle: 'Mesto študentov, funkcionalizmu, električiek a geniálnych nápadov.',
    date: 'MÁJ 2027',
    status: 'COMING_SOON',
    description: 'Pocta mestu, kde študujeme a žijeme. Architektonické línie brnianskeho brutalizmu a funkcionalizmu prepojené s identitou Fakulty podnikateľskej VUT. Lokálne navrhnuté, v Brne ušité.',
    productIds: ['prod-05', 'prod-11', 'prod-15', 'prod-24'],
    themeColor: '#fafafa',
    campaignHeadline: 'MADE IN BRNO. BORN AT FP.'
  }
];
