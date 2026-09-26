import { Drop } from '../types';

export const DROPS: Drop[] = [
  {
    id: 'drop-001',
    code: 'DROP 001',
    title: 'FIRST SEMESTER',
    subtitle: 'Nová energie. Čistá tabule. Tvůj univerzitní uniform.',
    date: 'ZÁŘÍ 2026',
    status: 'LIVE',
    description: 'Základní kámen studentského šatníku pro začátek akademického roku na FP VUT. Silné typografické motivy, těžká 240g bavlna a oversized střihy, které obstojí na přednáškách i na kolejích.',
    productIds: ['prod-01', 'prod-03', 'prod-06', 'prod-09', 'prod-12', 'prod-13', 'prod-17', 'prod-19', 'prod-21', 'prod-23'],
    themeColor: '#ffffff',
    campaignHeadline: 'YOUR UNIVERSITY. YOUR UNIFORM.'
  },
  {
    id: 'drop-002',
    code: 'DROP 002',
    title: 'EXAM SEASON',
    subtitle: 'Kofein v krvi, deadliny v kalendáři a mikina jako útočiště.',
    date: 'LEDEN 2027',
    status: 'COMING_SOON',
    description: 'Kolekce pro přežití zkouškového období na FP. Teplejší materiály, extra pohodlné heavyweight mikiny 450 GSM, minimalistické motivy a humor pro ty, kteří znají rozdíl mezi zápočtem a zkouškou.',
    productIds: ['prod-02', 'prod-07', 'prod-10', 'prod-14', 'prod-16', 'prod-20', 'prod-22'],
    themeColor: '#d4d4d4',
    campaignHeadline: 'NO SLEEP. JUST DEADLINES.'
  },
  {
    id: 'drop-003',
    code: 'DROP 003',
    title: 'FP AFTER DARK',
    subtitle: 'Když padne tma nad Brnem a studium jde na chvíli stranou.',
    date: 'BŘEZEN 2027',
    status: 'COMING_SOON',
    description: 'Noční edice pro brněnský noční život a studentské party. Černočerný streetwear s reflexními a vysoce kontrastními prvky. Limitovaná edice pro kluby, bary a pozdní návraty noční rozjezdovou linkou.',
    productIds: ['prod-04', 'prod-08', 'prod-18'],
    themeColor: '#e5e5e5',
    campaignHeadline: 'BUILT FOR THE BRNO NIGHTS.'
  },
  {
    id: 'drop-004',
    code: 'DROP 004',
    title: 'BRNO',
    subtitle: 'Město studentů, funkcionalismu, tramvají a geniálních nápadů.',
    date: 'KVĚTEN 2027',
    status: 'COMING_SOON',
    description: 'Pocta městu, kde studujeme a žijeme. Architektonické linie brněnského brutalismu a funkcionalismu propojené s identitou Fakulty podnikatelské VUT. Lokálně navrženo, v Brně ušito.',
    productIds: ['prod-05', 'prod-11', 'prod-15', 'prod-24'],
    themeColor: '#fafafa',
    campaignHeadline: 'MADE IN BRNO. BORN AT FP.'
  }
];
