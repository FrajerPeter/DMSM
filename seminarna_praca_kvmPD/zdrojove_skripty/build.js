const fs=require('fs');
const D=JSON.parse(fs.readFileSync('data.json','utf8'));
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,AlignmentType,HeadingLevel,ImageRun,
 ShadingType,BorderStyle,Footer,PageNumber,PageBreak,LevelFormat,Math:OMath,MathRun,MathFraction,MathSubScript,MathSuperScript,MathRadical,VerticalAlign,TableLayoutType}=require('docx');
const FONT='Times New Roman', W=9070;
const f=(x,d=2)=>{if(Math.abs(x)<5e-10)x=0;let s=Number(x).toFixed(d); let [i,dec]=s.split('.'); i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' '); return dec?i+','+dec:i;};
const pct=(x,d=2)=>f(x*100,d)+' %';
// ---------- helpers ----------
function runs(t,base={}){ // **bold**, _italic_
  const out=[]; const re=/(\*\*[^*]+\*\*|~~[^~]+~~)/g; let last=0,m;
  while((m=re.exec(t))){ if(m.index>last) out.push(new TextRun({text:t.slice(last,m.index),...base}));
    const s=m[0]; if(s.startsWith('**')) out.push(new TextRun({text:s.slice(2,-2),bold:true,...base})); else out.push(new TextRun({text:s.slice(2,-2),italics:true,...base}));
    last=m.index+s.length;}
  if(last<t.length) out.push(new TextRun({text:t.slice(last),...base})); return out;}
const P=(t,o={})=>new Paragraph({children:runs(t,o.run||{}),alignment:o.align||AlignmentType.JUSTIFIED,spacing:{after:o.after??120,before:o.before??0},indent:o.indent,keepNext:o.keepNext});
const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun(t)]});
const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(t)]});
const H3=t=>new Paragraph({heading:HeadingLevel.HEADING_3,children:[new TextRun(t)]});
const B=t=>new Paragraph({numbering:{reference:'bul',level:0},children:runs(t),alignment:AlignmentType.JUSTIFIED,spacing:{after:60}});
const N=t=>new Paragraph({numbering:{reference:'num',level:0},children:runs(t),alignment:AlignmentType.JUSTIFIED,spacing:{after:60}});
let tabN=0,figN=0;
const TCap=t=>new Paragraph({children:[new TextRun({text:`Tabuľka ${++tabN}: `,bold:true,size:20}),new TextRun({text:t,size:20})],spacing:{before:160,after:60},keepNext:true});
const FCap=t=>new Paragraph({children:[new TextRun({text:`Obrázok ${++figN}: `,bold:true,size:20}),new TextRun({text:t,size:20})],spacing:{before:40,after:160},alignment:AlignmentType.CENTER});
const Src=t=>new Paragraph({children:[new TextRun({text:'Zdroj: '+t,italics:true,size:18})],spacing:{after:160}});
const bd={style:BorderStyle.SINGLE,size:4,color:'808080'}; const borders={top:bd,bottom:bd,left:bd,right:bd};
function T(head,rows,widths,o={}){
  const sz=o.size||20; const sum=widths.reduce((a,b)=>a+b,0); widths=widths.map(w=>Math.floor(w*W/sum)); widths[widths.length-1]+=W-widths.reduce((a,b)=>a+b,0);
  const mk=(cells,isHead,ri)=>new TableRow({tableHeader:isHead,cantSplit:true,children:cells.map((c,j)=>{
    let txt=c, hl=false, bold=isHead; if(c&&typeof c==='object'){txt=c.t;hl=c.hl;bold=bold||c.b||c.hl;}
    return new TableCell({width:{size:widths[j],type:WidthType.DXA},borders,verticalAlign:VerticalAlign.CENTER,
      shading:isHead?{fill:'D9D9D9',type:ShadingType.CLEAR,color:'auto'}:hl?undefined:(o.zebra&&ri%2)?{fill:'F2F2F2',type:ShadingType.CLEAR,color:'auto'}:undefined,
      margins:{top:40,bottom:40,left:70,right:70},
      children:[new Paragraph({alignment:(j<(o.leftCols??1))?AlignmentType.LEFT:AlignmentType.CENTER,children:[new TextRun({text:String(txt),bold,size:sz,color:'000000',font:o.mono?'Consolas':FONT})]})]});})});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:widths,rows:[mk(head,true,0),...rows.map((r,i)=>mk(r,false,i))]});}
const mr=t=>t;
const EQS=[]; const X=(latex)=>{EQS.push(latex);return new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:60,after:60},children:[new TextRun('§EQ'+(EQS.length-1)+'§')]});};
const IMG=(file,w,h)=>new Paragraph({alignment:AlignmentType.CENTER,keepNext:true,spacing:{line:240,lineRule:'auto',before:120},children:[new ImageRun({type:'png',data:fs.readFileSync(file),transformation:{width:w,height:h}})]});
const PB=()=>new Paragraph({children:[new PageBreak()]});

// ---------- TITLE ----------
const ctr=(t,sz,o={})=>new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:o.after??80,before:o.before??0},children:[new TextRun({text:t,size:sz,bold:o.b,allCaps:o.caps,color:o.color})]});
const title=[
 ctr('VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ',32,{b:true,before:600}),
 ctr('BRNO UNIVERSITY OF TECHNOLOGY',22,{color:'000000',after:400}),
 ctr('FAKULTA PODNIKATELSKÁ',28,{b:true}),
 ctr('FACULTY OF BUSINESS AND MANAGEMENT',22,{color:'000000',after:1600}),
 ctr('SEMINÁRNA PRÁCA',40,{b:true,after:200}),
 ctr('Kvantitativní metody (kvmPD)',28,{after:500}),
 ctr('Optimalizácia prevádzky dátového centra metódou lineárneho programovania',24,{b:true}),
 ctr('a',24),
 ctr('Sieťová analýza investičného projektu rekonštrukcie bytu na prenájom metódou PERT',24,{b:true,after:2200}),
];
const info=[['Predmet:','Kvantitativní metody – kvmPD'],['Garant predmetu:','doc. Ing. Radek Doskočil, Ph.D., MSc'],['Cvičiaca:','Ing. Monika Šebestová, Ph.D.'],
 ['Vypracoval/a:','……………………………………………'],['ID študenta:','……………………………………………'],['Akademický rok:','2026/2027']];
const infoT=new Table({width:{size:W,type:WidthType.DXA},columnWidths:[3000,6070],rows:info.map(([a,b])=>new TableRow({children:[
  new TableCell({width:{size:3000,type:WidthType.DXA},borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},children:[new Paragraph({spacing:{after:80},children:[new TextRun({text:a,bold:true})]})]}),
  new TableCell({width:{size:6070,type:WidthType.DXA},borders:{top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},left:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},children:[new Paragraph({spacing:{after:80},children:[new TextRun(b)]})]})]}))});
title.push(infoT, ctr('Brno, 2026',24,{before:700}), PB());

// ---------- ÚVOD ----------
const body=[];
body.push(H1('1  Úvod'));
body.push(P('Kvantitatívne metódy a operačný výzkum poskytujú manažérom exaktné nástroje, pomocou ktorých možno zložité rozhodovacie situácie previesť do podoby matematického modelu, nájsť optimálne riešenie a následne ho ekonomicky interpretovať. Namiesto intuitívneho rozhodovania tak manažér pracuje s overiteľnými číslami – vie, aký výsledok je pri daných obmedzeniach maximálne dosiahnuteľný, ktoré zdroje predstavujú úzke hrdlo a s akou pravdepodobnosťou dodrží plánovaný termín.'));
body.push(P('**Cieľom tejto seminárnej práce** je aplikovať dve základné metódy operačného výskumu na dva praktické problémy z podnikateľského prostredia, vyriešiť ich v súlade s metodikou predmetu Kvantitativní metody a výsledky interpretovať z pohľadu manažérskeho rozhodovania.'));
body.push(P('**Prvý problém (Úkol 1)** sa týka optimalizácie prevádzky dátového centra, ktoré rozdeľuje obmedzenú kapacitu elektrickej siete, chladenia, priestoru v serverových rackoch a dátovej linky medzi šesť typov výpočtových operácií – od ťažby kryptomien cez komerčný cloud hosting až po trénovanie modelov umelej inteligencie. Úloha je formulovaná ako **celočíselná úloha lineárneho programovania** s cieľom maximalizovať denný čistý zisk. Riešenie je vypracované v MS Excel pomocou doplnku Riešiteľ (Řešitel) a nezávisle overené v jazyku Python.'));
body.push(P('**Druhý problém (Úkol 2)** predstavuje investičný projekt nákupu a kompletnej rekonštrukcie bytu určeného na prenájom. Projekt pozostáva z 12 na seba nadväzujúcich činností s neistými dobami trvania, preto je analyzovaný **sieťovou analýzou metódou PERT** (Program Evaluation and Review Technique). Súčasťou riešenia je hranovo-hranová matica, metóda preškrtávania hrán, zostrojenie hranovo definovaného sieťového grafu, časová analýza s určením kritickej cesty, pravdepodobnosť skrátenia doby realizácie, plánovaný termín pri 10 % riziku oneskorenia a pravdepodobnosť kritičnosti uzlov a činností určená pomocou incidenčnej matice.'));
body.push(P('Všetky výpočty v práci boli overené v jazyku Python (knižnice SciPy a PuLP s riešičom CBC, výpočty v presných zlomkoch), takže uvedené hodnoty sú matematicky konzistentné. Výpočty sú zároveň pripravené v priloženom zošite MS Excel ~~Kvantitativni_metody_vypocty.xlsx~~.'));

// ---------- ÚKOL 1 ----------
body.push(H1('2  Úkol 1: Lineární programování – Optimalizace provozu datového centra'));
body.push(H2('2.1  Ekonomický model úlohy'));
body.push(P('Spoločnosť prevádzkuje stredne veľké dátové centrum, ktorého manažment rozhoduje, koľko jednotiek (serverov, rigov, uzlov) jednotlivých typov výpočtových operácií má nasadiť do prevádzky. Každý typ operácie prináša iný denný čistý zisk na jednu jednotku a zároveň v rôznej miere spotrebúva štyri kľúčové zdroje infraštruktúry: elektrickú energiu, chladiaci výkon, fyzický priestor v rackoch a dátovú priepustnosť linky. **Cieľom manažmentu je maximalizovať celkový denný čistý zisk** pri dodržaní technických kapacít, ekologickej regulácie a zmluvných záväzkov (SLA) voči klientom.'));
body.push(P('**Štrukturálne premenné** x₁ až x₆ predstavujú počet nasadených jednotek jednotlivých typov operácií (Tabuľka 1). Keďže ide o fyzické zariadenia, premenné musia byť nezáporné a celočíselné.'));
body.push(TCap('Štrukturálne premenné modelu a ich denný čistý zisk'));
body.push(T(['Premenná','Typ operácie','Zisk [€/deň/ks]'],[
 ['x₁','Ťažba Bitcoinu (ASIC minery)','15'],['x₂','Ťažba altcoinov (GPU rigy)','12'],['x₃','Komerčný cloud hosting (webové servery)','20'],
 ['x₄','Trénovanie modelov umelej inteligencie (AI GPU servery)','35'],['x₅','Validátorské uzly pre Proof-of-Stake siete (PoS)','8'],['x₆','Prenájom dedikovaných databázových serverov','18']],[1,5,2],{leftCols:2,zebra:true}));
body.push(Src('vlastné spracovanie'));
body.push(P('**Obmedzujúce podmienky** vyplývajú z technických parametrov infraštruktúry, regulácie a zmlúv: (1) denná kapacita **elektrickej siete** je 12 000 kWh, (2) **chladiaci výkon** 3 000 kW, (3) **priestor v rackoch** 600 jednotiek U a (4) **dátová priepustnosť** linky 15 000 Mbps – spotreby jednotlivých zariadení sú uvedené v matematickom modeli. (5) **Ekologická regulácia** vyžaduje, aby aspoň 15 % všetkých nasadených jednotiek tvorili nízkoenergetické PoS uzly (x₅). (6) **Zmluvné SLA limity** vyžadujú prevádzku minimálne 50 webových serverov (x₃), 20 AI serverov (x₄) a 15 databázových serverov (x₆). (7) Počet zariadení musí byť **nezáporný a celočíselný**.'));
body.push(H2('2.2  Matematický model úlohy'));
body.push(H3('Definice proměnných'));
body.push(X('x_{1} - x_{6} \\gg \\text{operácie dátového centra: ASIC, GPU, Cloud, AI, PoS, DB}'));
body.push(X('x_{i} - \\text{počet nasadených jednotiek } i\\text{-tého typu operácie v ks}\\quad (i = 1,\\ldots,6)'));
body.push(H3('Omezující podmínky'));
['\\text{E – elektrická sieť:}\\ 30x_{1} + 25x_{2} + 10x_{3} + 40x_{4} + 5x_{5} + 15x_{6} \\leq 12\\,000',
 '\\text{CH – chladenie:}\\ 10x_{1} + 8x_{2} + 2x_{3} + 12x_{4} + x_{5} + 3x_{6} \\leq 3\\,000',
 '\\text{P – priestor v rackoch:}\\ 2x_{1} + 4x_{2} + x_{3} + 4x_{4} + x_{5} + 2x_{6} \\leq 600',
 '\\text{D – dátová linka:}\\ 5x_{1} + 10x_{2} + 100x_{3} + 50x_{4} + 200x_{5} + 80x_{6} \\leq 15\\,000',
 '\\text{EKO – podiel PoS:}\\ x_{5} \\geq 0{,}15\\left( x_{1} + x_{2} + x_{3} + x_{4} + x_{5} + x_{6} \\right)',
 '\\text{EKO – upravený tvar:}\\  - 0{,}15x_{1} - 0{,}15x_{2} - 0{,}15x_{3} - 0{,}15x_{4} + 0{,}85x_{5} - 0{,}15x_{6} \\geq 0',
 '\\text{SLA:}\\ x_{3} \\geq 50;\\quad x_{4} \\geq 20;\\quad x_{6} \\geq 15'].forEach(s=>body.push(X(s)));
body.push(H3('Účelová funkce'));
body.push(X('Z_{\\max} = 15x_{1} + 12x_{2} + 20x_{3} + 35x_{4} + 8x_{5} + 18x_{6}\\quad \\lbrack€/\\text{deň}\\rbrack'));
body.push(H3('Podmínky nezápornosti a celočíselnosti'));
body.push(X('x_{1,2,3,4,5,6} \\geq 0;\\quad x_{i} \\in \\mathbb{Z}\\quad (i = 1,\\ldots,6)'));
body.push(P('Model má 6 štrukturálnych premenných, 5 štrukturálnych obmedzení (E, CH, P, D, EKO), 3 dolné medze zo zmlúv SLA a podmienky nezápornosti a celočíselnosti. Ide teda o **úlohu celočíselného lineárneho programovania**.'));

body.push(H2('2.3  Řešení matematického modelu v MS Excel (doplněk Řešitel)'));
body.push(P('Model bol prenesený do hárku ~~Ukol1_LP~~ v MS Excel. Rozloženie hárku je uvedené v Tabuľke 2 – žlté bunky B5:G5 sú meniace sa bunky (hodnoty premenných), zelené bunky obsahujú vzorce. Ľavé strany všetkých obmedzení aj účelová funkcia sa počítajú funkciou **SUMPRODUCT**, ktorá vynásobí vektor premenných vektorom koeficientov a výsledky sčíta.'));
body.push(TCap('Rozloženie modelu v hárku MS Excel (zobrazené optimálne riešenie)'));
const lpRows=[['Počet ks (B5:G5)','0','0','50','76','25','15','–','','',''],
 ['Zisk €/ks (riadok 6)','15','12','20','35','8','18',{t:'4 130',b:true},'max','',''],
 ['Elektrina (r. 8)','30','25','10','40','5','15','3 890','≤','12 000','8 110'],
 ['Chladenie (r. 9)','10','8','2','12','1','3','1 082','≤','3 000','1 918'],
 ['Priestor (r. 10)','2','4','1','4','1','2','409','≤','600','191'],
 [{t:'Linka (r. 11)',hl:true},{t:'5',hl:true},{t:'10',hl:true},{t:'100',hl:true},{t:'50',hl:true},{t:'200',hl:true},{t:'80',hl:true},{t:'15 000',hl:true},{t:'≤',hl:true},{t:'15 000',hl:true},{t:'0',hl:true}],
 ['Eko (r. 12)','−0,15','−0,15','−0,15','−0,15','0,85','−0,15','0,10','≥','0','0,10'],
 ['Dolná medza (r. 14)','0','0','50','20','0','15','','','','']];
body.push(T(['Stĺpec A','B (x₁)','C (x₂)','D (x₃)','E (x₄)','F (x₅)','G (x₆)','H: ľavá strana','I','J: pravá strana','K: rezerva'],lpRows,[2.2,1,1,1,1,1,1,1.4,0.8,1.3,1.2],{size:17}));
body.push(Src('vlastné spracovanie v MS Excel'));
body.push(TCap('Vzorce použité v hárku Ukol1_LP'));
body.push(T(['Bunka','Vzorec','Význam'],[
 ['H6','=SUMPRODUCT($B$5:$G$5;B6:G6)','hodnota účelovej funkcie Z'],['H8','=SUMPRODUCT($B$5:$G$5;B8:G8)','spotreba elektrickej energie'],
 ['H9','=SUMPRODUCT($B$5:$G$5;B9:G9)','potrebný chladiaci výkon'],['H10','=SUMPRODUCT($B$5:$G$5;B10:G10)','obsadené rackové jednotky'],
 ['H11','=SUMPRODUCT($B$5:$G$5;B11:G11)','vyťaženie dátovej linky'],['H12','=SUMPRODUCT($B$5:$G$5;B12:G12)','ekologická podmienka'],
 ['K8 (až K11)','=J8-H8','nevyužitá kapacita zdroja'],['K12','=H12-J12','prebytok ekologickej podmienky']],[1.3,3.6,3],{leftCols:3,size:19,zebra:true}));
body.push(Src('vlastné spracovanie (v českej/slovenskej verzii Excelu sa ako oddeľovač argumentov používa bodkočiarka)'));
body.push(P('**Nastavenie doplnku Riešiteľ** (karta Údaje → Riešiteľ):',{keepNext:true}));
body.push(B('**Nastaviť cieľ:** $H$6, **Do:** Max.'));
body.push(B('**Zmenou premenných buniek:** $B$5:$G$5.'));
body.push(B('**Podliehajúce obmedzeniam:** $H$8:$H$11 <= $J$8:$J$11 (kapacity zdrojov); $H$12 >= $J$12 (ekologická regulácia); $B$5:$G$5 >= $B$14:$G$14 (SLA dolné medze); $B$5:$G$5 = int (celé číslo).'));
body.push(B('Zaškrtnuté **Nastaviť neobmedzené premenné ako nezáporné**; **metóda riešenia: Simplex LP** (pri celočíselných obmedzeniach Riešiteľ automaticky kombinuje simplexovú metódu s metódou vetiev a hraníc). V možnostiach je vhodné nastaviť optimalitu celočíselného riešenia na 0 %, aby Riešiteľ nevrátil len približné celočíselné riešenie.'));
body.push(P('Priložený súbor Excel už obsahuje tieto nastavenia Riešiteľa, takže po otvorení stačí spustiť Riešiteľa a stlačiť tlačidlo Riešiť.'));
body.push(TCap('Optimálne riešenie úlohy'));
body.push(T(['Ukazovateľ','x₁','x₂','x₃','x₄','x₅','x₆','Z [€/deň]'],[
 [{t:'Celočíselné optimum (ILP)',b:true},'0','0','50','76','25','15',{t:'4 130,00',b:true}],
 ['Spojitá relaxácia (LP)','0','0','50','76,276','24,931','15','4 139,10'],
 ['Zisk z operácie [€/deň]','0','0','1 000','2 660','200','270','4 130,00']],[3,1,1,1,1,1,1,1.6],{leftCols:1}));
body.push(Src('vlastné výpočty (MS Excel – Riešiteľ, overené v Pythone: PuLP/CBC)'));
body.push(P(`Optimálne celočíselné riešenie je **x₁ = 0, x₂ = 0, x₃ = 50, x₄ = 76, x₅ = 25, x₆ = 15** s maximálnym denným ziskom **Z = 4 130 €**. Spojitá relaxácia (bez požiadavky celočíselnosti) dáva teoretické maximum 4 139,10 € pri x₄ = 76,276 a x₅ = 24,931; zaokrúhlenie by však porušilo podmienky, preto je nutné celočíselné riešenie. Strata spôsobená celočíselnosťou je len 9,10 €/deň (0,22 %). Riešenie bolo overené aj úplným prehľadaním všetkých prípustných celočíselných kombinácií v okolí optima – iné riešenie so ziskom 4 130 € neexistuje, **optimum je teda jednoznačné**.`));

body.push(H2('2.4  Ekonomická interpretace vypočtených výsledků'));
body.push(P('**Odporúčaná skladba prevádzky:** dátové centrum by malo nasadiť **76 AI GPU serverov** na trénovanie modelov umelej inteligencie, **25 PoS validátorských uzlov**, a webové (50 ks) a databázové servery (15 ks) iba v rozsahu zmluvných SLA minimov. Ťažba Bitcoinu ani altcoinov sa za daných podmienok neoplatí. Celkom bude v prevádzke 166 jednotiek a **maximálny denný čistý zisk dosiahne 4 130 €**, t. j. približne 123 900 € za 30-dňový mesiac a 1,507 mil. € ročne. Najväčší podiel na zisku (64,4 %) má trénovanie AI.'));
body.push(TCap('Využitie zdrojov v optimálnom riešení'));
body.push(T(['Zdroj / podmienka','Kapacita','Využitie','Rezerva','Využitie [%]','Stav'],[
 ['Elektrická sieť [kWh]','12 000','3 890','8 110','32,4 %','voľná kapacita'],['Chladiaci výkon [kW]','3 000','1 082','1 918','36,1 %','voľná kapacita'],
 ['Priestor v rackoch [U]','600','409','191','68,2 %','voľná kapacita'],[{t:'Dátová linka [Mbps]',hl:true},{t:'15 000',hl:true},{t:'15 000',hl:true},{t:'0',hl:true},{t:'100,0 %',hl:true},{t:'úzke hrdlo',hl:true,b:true}],
 [{t:'Ekologická regulácia',hl:true},{t:'≥ 15 % PoS',hl:true},{t:'15,06 %',hl:true},{t:'0,10',hl:true},{t:'–',hl:true},{t:'prakticky aktívna',hl:true,b:true}],
 ['SLA x₃ ≥ 50','50','50','0','–','na dolnej medzi'],['SLA x₄ ≥ 20','20','76','56','–','prekročená'],['SLA x₆ ≥ 15','15','15','0','–','na dolnej medzi']],[2.6,1.2,1.2,1.1,1.2,1.7],{leftCols:1,size:19}));
body.push(Src('vlastné výpočty'));
body.push(IMG('graf_lp.png',560,224)); body.push(FCap('Percentuálne využitie kapacít dátového centra v optimálnom riešení (vlastné spracovanie)'));
body.push(P('**Úzkym hrdlom** dátového centra je jednoznačne **dátová priepustnosť linky**, ktorá je vyčerpaná na 100 % (15 000 Mbps). Prakticky aktívna je aj **ekologická podmienka** – podiel PoS uzlov je 25/166 = 15,06 %, teda iba nepatrne nad zákonným minimom (rezerva 0,10). Naopak elektrická sieť (využitá na 32,4 %), chladenie (36,1 %) a priestor v rackoch (68,2 %) majú výraznú voľnú kapacitu: 8 110 kWh, 1 918 kW a 191 U. Investovať do posilnenia napájania alebo chladenia by preto v súčasnosti nemalo žiadny efekt na zisk.'));
body.push(P('Citlivostná analýza spojitej relaxácie (prehľad citlivosti Riešiteľa) prináša ďalšie manažérsky cenné informácie:'));
body.push(B('**Tieňová cena dátovej linky je ≈ 0,427 €/Mbps/deň.** Každých ďalších 1 000 Mbps konektivity by (v rozsahu platnosti) zvýšilo denný zisk približne o 427 €. Ak upgrade linky stojí menej ako cca 12 800 € mesačne, je ekonomicky výhodný – ide o najefektívnejšiu investíciu.'));
body.push(B('Hodnota 0,427 €/Mbps zodpovedá ziskovosti „balíčka“ jedného AI servera spolu s 3/17 PoS uzla, ktorý ekologická regulácia vyžaduje: (35 + 8·3/17) / (50 + 200·3/17) = 36,41 / 85,29 = 0,4269 €/Mbps. Rovnako počítaný balíček pri ťažbe Bitcoinu dáva len 16,41 / 40,29 = 0,4073 €/Mbps, preto x₁ v optime nie je.'));
body.push(B('**Redukované náklady:** ťažba Bitcoinu (x₁) by sa začala oplácať, ak by jej zisk vzrástol o viac ako 0,79 € na 15,79 €/deň/ks (napr. pri raste kurzu BTC). Ťažba altcoinov (x₂) by potrebovala zvýšenie zisku o 5,92 € na 17,92 €/deň. Každý webový server nad SLA minimum by znížil zisk o 36,34 € a každý databázový server o 29,81 € – tieto služby totiž nadmerne vyťažujú úzke hrdlo (linku).'));
body.push(B('**Ekologická regulácia** má tieňovú cenu −91,03: jej sprísnenie (napr. z 15 % na 20 % PoS uzlov) by zisk ďalej znižovalo, pretože PoS uzly sú najnáročnejšie na priepustnosť (200 Mbps) a pritom majú najnižší zisk.'));
body.push(P('**Manažérske odporúčanie:** zamerať obchodnú stratégiu na AI výpočty, neobnovovať ťažobné zariadenia, prioritne investovať do zvýšenia kapacity dátovej linky a pri vyjednávaní nových SLA zmlúv na webhosting či databázy požadovať cenu, ktorá pokryje náklady obetovanej príležitosti na priepustnosť (min. 0,427 €/Mbps/deň).'));

// ---------- ÚKOL 2 ----------
const A=D.acts, K=Object.keys(A);
const NAMES={A:'Průzkum trhu a prohlídky nemovitostí',B:'Finanční příprava a předschválení úvěru',C:'Právní audit, podpis smluv a katastr',D:'Zaměření a architektonický návrh',E:'Vyřízení ohlášky/povolení na úřadech',F:'Bourací práce a odvoz suti',G:'Hrubé instalace – voda, elektro',H:'Zednické práce, obklady a sanita',I:'Objednávka a výroba nábytku na míru',J:'Malířské práce a pokládka podlah',K:'Kompletace a montáž nábytku',L:'Finální úklid, homestaging a inzerce'};
const EDG={}; D.edges.forEach(e=>EDG[e.n]=e);
body.push(H1('3  Úkol 2: Síťová analýza – Investiční proces a rekonstrukce bytu k pronájmu (metoda PERT)'));
body.push(H2('3.1  Zadání projektu'));
body.push(P('Investor plánuje kúpiť starší byt, kompletne ho zrekonštruovať a čo najskôr ho ponúknuť na prenájom. Každý týždeň oneskorenia znamená ušlé nájomné a ďalšie úroky z hypotekárneho úveru, preto potrebuje poznať strednú dobu realizácie projektu, kritické činnosti a pravdepodobnosť dodržania termínu. Doby trvania činností nie sú presne známe (závisia od ponuky na trhu, od úradov a od dodávateľov), preto je projekt analyzovaný **metódou PERT**, ktorá pre každú činnosť pracuje s tromi odhadmi doby trvania a predpokladá ich beta rozdelenie. Projekt sa skladá z 12 činností uvedených v Tabuľke 6 (odhady sú v týždňoch).'));
body.push(TCap('Zoznam činností, ich nadväznosti a tri odhady doby trvania (týždne)'));
body.push(T(['Označenie činnosti','Názov činnosti','Bezprostredne predchádzajúca činnosť','aᵢⱼ','mᵢⱼ','bᵢⱼ'],K.map(k=>[k,NAMES[k],A[k].p.length?A[k].p.join(', '):'–',A[k].a,A[k].m,A[k].b]),[1.2,4.4,1.9,0.6,0.6,0.6],{leftCols:2,size:18}));
body.push(Src('vlastné spracovanie'));
body.push(P('**Úlohy** (v súlade so zadaním cvičenia k metóde PERT):',{keepNext:true}));
['Pomocou hranovo-hranovej matice zostavte sieťový graf projektu.','Pomocou metódy preškrtávania hrán očíslujte (prečíslujte) uzly sieťového grafu.',
 'Metódou PERT vykonajte časovú analýzu v sieťovom grafe a v tabuľke. Nájdite kritickú cestu, stanovte strednú dobu jej trvania a určte základné časové charakteristiky na úrovni činností a uzlov.',
 'Určte pravdepodobnosť, že sa doba realizácie projektu skráti o 1 týždeň (a pravdepodobnosť dodržania termínov 17 a 20 týždňov).',
 'Určte plánovaný termín realizácie projektu, ak pripustíme 10 % riziko oneskorenia projektu.',
 'Pomocou incidenčnej matice určte pravdepodobnosť kritičnosti uzlov, prípadne činností.'].forEach(t=>body.push(N(t)));
body.push(P('Pred riešením úloh sa pre každú činnosť vypočíta stredná doba trvania yᵢⱼ (označovaná aj tₑ) a rozptyl σ²ᵢⱼ:',{keepNext:true,before:120}));
body.push(X('y_{ij} = \\frac{a_{ij} + 4m_{ij} + b_{ij}}{6}\\qquad\\qquad \\sigma_{ij}^{2} = \\left( \\frac{b_{ij} - a_{ij}}{6} \\right)^{2}'));
body.push(TCap('Stredné doby trvania a rozptyly činností'));
body.push(T(['Činnosť','aᵢⱼ','mᵢⱼ','bᵢⱼ','Výpočet yᵢⱼ','yᵢⱼ [týždne]','σ²ᵢⱼ'],K.map(k=>{const x=A[k];return [k,x.a,x.m,x.b,`(${x.a} + 4·${x.m} + ${x.b}) / 6`,f(x.te,3)+(x.te_s.includes('/')?' ('+x.te_s+')':''),f(x.var,4)+' ('+x.var_s+')'];}),[0.9,0.6,0.6,0.6,2.2,1.7,1.6],{size:18,zebra:true}));
body.push(Src('vlastné výpočty'));

body.push(H2('3.2  Sestavení síťového grafu pomocí hrano-hranové matice (úloha 1)'));
body.push(P('Hranovo-hranová matica (12 × 12) zachytáva bezprostredné nadväznosti činností: prvok v riadku i a stĺpci j je rovný 1, ak činnosť v riadku bezprostredne predchádza činnosti v stĺpci, inak je prázdny. Súčet stĺpca udáva počet bezprostredných predchodcov činnosti, súčet riadku počet jej bezprostredných nasledovníkov.'));
const L12=K; const succ={}; L12.forEach(k=>succ[k]=L12.filter(s=>A[s].p.includes(k)));
body.push(TCap('Hranovo-hranová matica projektu (riadok = predchodca, stĺpec = nasledovník)'));
const rank={A:0,B:0,C:1,D:1,E:2,I:2,F:3,G:4,H:5,J:6,K:7,L:8};
body.push(T(['',...L12,'Σ'],L12.map(r=>[{t:r,b:true},...L12.map(c=>succ[r].includes(c)?{t:'1',b:true}:''),String(succ[r].length)]).concat([[{t:'Σ',b:true},...L12.map(c=>String(A[c].p.length)),'14']]),Array(14).fill(1),{size:19}));
body.push(Src('vlastné spracovanie'));
body.push(P('Pri zostavovaní hranovo definovaného grafu (činnosť = hrana, uzol = udalosť) sa z matice čítajú skupiny činností s rovnakými predchodcami. Činnosti A a B nemajú predchodcov, vychádzajú teda zo spoločného počiatočného uzla. Činnosť D nadväzuje iba na A, ale činnosť C na A aj B – dvojica (A, B) a samotná A teda nemajú rovnakú množinu nasledovníkov. Preto A končí v samostatnom uzle (z ktorého vychádza D) a do uzla, kde končí B a začína C, je z neho vedená **fiktívna činnosť** s nulovou dobou trvania. Činnosti E a I majú spoločného predchodcu D, takže vychádzajú z jedného uzla; C a E končia v spoločnom uzle, z ktorého vychádza F; I a J končia v spoločnom uzle, z ktorého vychádza K. Ostatné činnosti tvoria reťazec F → G → H → J a K → L. Výsledný graf má **11 uzlov a 13 hrán** (12 reálnych a 1 fiktívnu).'));

body.push(H2('3.3  Očíslování uzlů metodou přeškrtávání hran (úloha 2)'));
body.push(P('Metóda preškrtávania hrán postupne vyhľadáva v hranovo-hranovej matici stĺpce, ktoré neobsahujú žiadnu nepreškrtnutú jednotku – zodpovedajúce činnosti už nemajú nezaradených predchodcov a tvoria aktuálny rád. Riadky týchto činností sa preškrtnú a postup sa opakuje. Koncové uzly činností sa číslujú v poradí rádov tak, aby každá hrana viedla z uzla s nižším číslom do uzla s vyšším číslom (i < j).'));
body.push(TCap('Postup metódy preškrtávania hrán a očíslovanie uzlov'));
body.push(T(['Krok','Stĺpce bez jednotiek','Rád','Preškrtnuté riadky','Činnosti ako hrany (i, j)'],[
 ['1','A, B','0','A, B','A (1, 2), B (1, 3), fiktívna (2, 3)'],['2','C, D','1','C, D','C (3, 5), D (2, 4)'],['3','E, I','2','E, I','E (4, 5), I (4, 9)'],
 ['4','F','3','F','F (5, 6)'],['5','G','4','G','G (6, 7)'],['6','H','5','H','H (7, 8)'],['7','J','6','J','J (8, 9)'],['8','K','7','K','K (9, 10)'],['9','L','8','L','L (10, 11)']],[0.7,1.6,0.6,1.5,3.6],{leftCols:0,size:19,zebra:true}));
body.push(Src('vlastné spracovanie'));
body.push(P('Činnosti sú rozdelené do **9 rádov (0. až 8. rád)**. Počiatočný uzol má číslo 1, koncový uzol číslo 11. Všetky hrany smerujú od nižšieho čísla uzla k vyššiemu, takže očíslovanie je topologicky správne a umožňuje časovú analýzu postupne od uzla 1 po uzol 11.'));

body.push(H2('3.4  Časová analýza metodou PERT (úloha 3)'));
body.push(P('Časová analýza sa vykonáva so strednými dobami trvania yᵢⱼ. **Výpočet dopredu** určuje najskôr možné termíny uzlov t⁽⁰⁾, **výpočet dozadu** najneskôr prípustné termíny t⁽¹⁾:',{keepNext:true}));
body.push(X('t_{1}^{(0)} = 0;\\qquad t_{j}^{(0)} = \\max_{i}\\left( t_{i}^{(0)} + y_{ij} \\right);\\qquad t_{n}^{(1)} = t_{n}^{(0)} = T;\\qquad t_{i}^{(1)} = \\min_{j}\\left( t_{j}^{(1)} - y_{ij} \\right)'));
body.push(P('Výsledky sú zapísané priamo v sieťovom grafe (Obrázok 2): v hornej časti uzla je jeho číslo, vľavo dole t⁽⁰⁾ᵢ a vpravo dole t⁽¹⁾ᵢ. Kritická cesta je vyznačená hrubou čiernou čiarou a kritické uzly sivou výplňou, fiktívna činnosť prerušovanou čiarou.',{keepNext:true}));
body.push(IMG('graf_siet.png',605,180)); body.push(FCap('Sieťový graf projektu s výsledkami časovej analýzy metódou PERT (vlastné spracovanie)'));
body.push(P('**Časové charakteristiky na úrovni uzlov** – najskôr možný termín t⁽⁰⁾ᵢ, najneskôr prípustný termín t⁽¹⁾ᵢ a rezerva uzla Rᵢ = t⁽¹⁾ᵢ − t⁽⁰⁾ᵢ:'));
body.push(TCap('Časové charakteristiky uzlov (týždne)'));
const nodes=D.t0.map((t,i)=>i);
body.push(T(['Uzol i',...nodes.map(i=>String(i+1))],[['t⁽⁰⁾ᵢ',...nodes.map(i=>f(D.t0[i],2))],['t⁽¹⁾ᵢ',...nodes.map(i=>f(D.t1[i],2))],['Rᵢ',...nodes.map(i=>({t:f(D.Rnode[i],2),b:Math.abs(D.Rnode[i])<1e-9}))]],[1.2,...Array(11).fill(1)],{size:18}));
body.push(Src('vlastné výpočty'));
body.push(P('**Časové charakteristiky na úrovni činností** sa určia z termínov uzlov podľa vzťahov (ZM – začiatok možný, KM – koniec možný, ZP – začiatok prípustný, KP – koniec prípustný, RC – celková rezerva, RV – voľná rezerva, RN – nezávislá rezerva):',{keepNext:true}));
body.push(X('ZM_{ij} = t_{i}^{(0)};\\quad KM_{ij} = t_{i}^{(0)} + y_{ij};\\quad KP_{ij} = t_{j}^{(1)};\\quad ZP_{ij} = t_{j}^{(1)} - y_{ij}'));
body.push(X('RC_{ij} = t_{j}^{(1)} - t_{i}^{(0)} - y_{ij};\\quad RV_{ij} = t_{j}^{(0)} - t_{i}^{(0)} - y_{ij};\\quad RN_{ij} = t_{j}^{(0)} - t_{i}^{(1)} - y_{ij}'));
body.push(TCap('Časová analýza činností metódou PERT (týždne)'));
body.push(T(['Čin.','(i, j)','yᵢⱼ','σ²ᵢⱼ','ZMᵢⱼ','KMᵢⱼ','ZPᵢⱼ','KPᵢⱼ','RCᵢⱼ','RVᵢⱼ','RNᵢⱼ'],D.edges.map(e=>{const c=e.crit;const w=s=>c?{t:s,hl:true}:s;const v=e.n==='Fikt'?0:A[e.n].var;
  return [w(e.n==='Fikt'?'fikt.':e.n),w(`(${e.i}, ${e.j})`),w(f(e.te,3)),w(f(v,4)),w(f(e.ES,3)),w(f(e.EF,3)),w(f(e.LS,3)),w(f(e.LF,3)),w(f(e.Rc,3)),w(f(e.Rv,3)),w(f(e.RN,3))];}),[0.8,0.95,0.95,0.95,1,1,1,1,1,1,1],{size:17}));
body.push(Src('vlastné výpočty (overené v MS Excel aj v Pythone v presných zlomkoch); tučne sú vyznačené kritické činnosti'));
body.push(P('**Kritická cesta** prechádza uzlami 1 – 2 – 4 – 5 – 6 – 7 – 8 – 9 – 10 – 11 a tvoria ju činnosti **A → D → E → F → G → H → J → K → L** (všetky majú RC = 0). **Stredná doba trvania kritickej cesty, a teda celého projektu, je T = 56/3 ≈ 18,67 týždňa.** Rozptyl a smerodajná odchýlka doby trvania projektu sú súčtom rozptylov kritických činností:',{keepNext:true}));
body.push(X('\\sigma_{T}^{2} = \\sum_{(i,j) \\in KC}\\sigma_{ij}^{2} = 7 \\cdot \\frac{1}{9} + 2 \\cdot \\frac{1}{36} = \\frac{5}{6} \\doteq 0{,}8333;\\qquad \\sigma_{T} = \\sqrt{\\frac{5}{6}} \\doteq 0{,}9129\\ \\text{týždňa}'));
body.push(P('Nekritické sú iba činnosti B (RC = 2 týždne), C (RC = 1 týždeň), fiktívna činnosť (RC = 1 týždeň) a I (RC = 6,33 týždňa). Kritická cesta obsahuje 9 z 12 činností, projekt je teda časovo veľmi napätý.'));

body.push(H2('3.5  Pravděpodobnost zkrácení doby realizace projektu (úloha 4)'));
body.push(P('Podľa centrálnej limitnej vety má doba realizácie projektu približne normálne rozdelenie so strednou hodnotou T a rozptylom σ²ᴛ. Pravdepodobnosť, že projekt bude dokončený do plánovaného termínu Tₚ, sa určí pomocou normovanej premennej Z a distribučnej funkcie normovaného normálneho rozdelenia Φ (v Exceli NORM.S.DIST):',{keepNext:true}));
body.push(X('P\\left( t \\leq T_{p} \\right) = \\Phi(Z),\\qquad Z = \\frac{T_{p} - T}{\\sigma_{T}}'));
body.push(P(`**Skrátenie doby realizácie o 1 týždeň** (Tₚ = 18,667 − 1 = 17,667 týždňa):`,{keepNext:true}));
body.push(X(`Z = \\frac{17{,}667 - 18{,}667}{0{,}9129} = - 1{,}0954\\qquad P = \\Phi( - 1{,}0954) = 1 - \\Phi(1{,}0954) \\doteq 0{,}1367`));
body.push(P(`Pravdepodobnosť, že sa doba realizácie projektu skráti aspoň o 1 týždeň, je iba **${pct(D.s1.p)}**. Skrátenie o 2 týždne (Tₚ = 16,667) má pravdepodobnosť len ${pct(D.s2.p)}. Pre úplnosť sú v Tabuľke 13 uvedené aj pravdepodobnosti dodržania ďalších termínov – ambiciózny termín 17 týždňov je dosiahnuteľný s pravdepodobnosťou **3,39 %**, termín 20 týždňov s pravdepodobnosťou **92,79 %**.`));
const pr=D.probs;
body.push(TCap('Pravdepodobnosť dodržania vybraných plánovaných termínov'));
body.push(T(['Tₚ [týždne]','16,67 (−2)','17','17,67 (−1)','18','19','20','21'],[
 ['Z',f(D.s2.z,4),f(pr['17'].z,4),f(D.s1.z,4),...['18','19','20','21'].map(k=>f(pr[k].z,4))],[{t:'P(t ≤ Tₚ)',b:true},{t:pct(D.s2.p),b:true},{t:pct(pr['17'].p),b:true},{t:pct(D.s1.p),b:true},...['18','19','20','21'].map(k=>({t:pct(pr[k].p),b:true}))]],[1.5,1.2,1,1.2,1,1,1,1],{leftCols:1,size:18}));
body.push(Src('vlastné výpočty'));

body.push(H2('3.6  Plánovaný termín při 10% riziku zpoždění (úloha 5)'));
body.push(P('Ak pripustíme riziko oneskorenia α = 10 %, hľadáme termín Tₚ, ktorý bude dodržaný s pravdepodobnosťou 1 − α = 90 %. Z tabuliek normovaného normálneho rozdelenia (v Exceli NORM.S.INV(0,9)) je z₀,₉₀ = 1,2816:',{keepNext:true}));
body.push(X('T_{p} = T + z_{1 - \\alpha} \\cdot \\sigma_{T} = 18{,}667 + 1{,}2816 \\cdot 0{,}9129 \\doteq 19{,}84\\ \\text{týždňa}'));
const q=D.quant;
body.push(P(`Pri 10 % riziku oneskorenia je plánovaný termín realizácie projektu **${f(q['0.9'].T,2)} týždňa**, t. j. po zaokrúhlení **20 týždňov** (pravdepodobnosť dodržania 92,79 %). Pri prísnejšom 5 % riziku by bolo potrebné plánovať ${f(q['0.95'].T,2)} týždňa a pri 1 % riziku ${f(q['0.99'].T,2)} týždňa.`));
body.push(IMG('graf_normal.png',520,221)); body.push(FCap('Normálne rozdelenie doby realizácie projektu a pravdepodobnosti dodržania termínov (vlastné spracovanie)'));

body.push(H2('3.7  Pravděpodobnost kritičnosti uzlů a činností pomocí incidenční matice (úloha 6)'));
body.push(P('Incidenčná matica sieťového grafu je štvorcová matica rádu 11 (uzly × uzly). V bunke (i, j) je pri metóde PERT každý časový údaj zdvojený – stredná doba trvania yᵢⱼ a rozptyl σ²ᵢⱼ činnosti z uzla i do uzla j. Na hlavnej diagonále sa počas výpočtu zapisujú termíny uzlov t⁽⁰⁾ᵢ / t⁽¹⁾ᵢ. Výpočet dopredu postupuje po stĺpcoch (t⁽⁰⁾ⱼ = max(t⁽⁰⁾ᵢ + yᵢⱼ) cez nenulové bunky stĺpca j), výpočet dozadu po riadkoch (t⁽¹⁾ᵢ = min(t⁽¹⁾ⱼ − yᵢⱼ) cez nenulové bunky riadka i). Spolu s termínom t⁽⁰⁾ⱼ sa prenáša aj rozptyl σ²ⱼ = σ²ᵢ + σ²ᵢⱼ cez tú bunku, ktorá určila maximum.'));
body.push(TCap('Incidenčná matica sieťového grafu (bunka: yᵢⱼ / σ²ᵢⱼ; diagonála: t⁽⁰⁾ᵢ / t⁽¹⁾ᵢ)'));
const NN=11; const cell={}; D.edges.forEach(e=>cell[`${e.i}-${e.j}`]=e);
body.push(T(['i \\ j',...Array.from({length:NN},(_,j)=>String(j+1))],Array.from({length:NN},(_,i)=>[{t:String(i+1),b:true},...Array.from({length:NN},(_,j)=>{
   if(i===j) return {t:f(D.t0[i],2)+' / '+f(D.t1[i],2),b:true};
   const e=cell[`${i+1}-${j+1}`]; if(!e) return '';
   const v=e.n==='Fikt'?0:A[e.n].var; return e.crit?{t:f(e.te,2)+' / '+f(v,3),hl:true}:f(e.te,2)+' / '+f(v,3);})]),[0.7,...Array(11).fill(1)],{size:14}));
body.push(Src('vlastné spracovanie; tučne sú vyznačené kritické činnosti a termíny uzlov'));
body.push(P('**Kritická cesta z incidenčnej matice:** činnosť (i, j) je kritická, ak t⁽⁰⁾ᵢ = t⁽¹⁾ᵢ, t⁽⁰⁾ⱼ = t⁽¹⁾ⱼ a zároveň t⁽¹⁾ⱼ − t⁽⁰⁾ᵢ − yᵢⱼ = 0. Táto podmienka platí pre bunky (1,2), (2,4), (4,5), (5,6), (6,7), (7,8), (8,9), (9,10) a (10,11), teda pre činnosti A, D, E, F, G, H, J, K, L. Výsledok je zhodný s časovou analýzou v grafe a v tabuľke (úloha 3).'));
body.push(P('**Pravdepodobnosť kritičnosti uzla.** Najskôr možný termín uzla je náhodná veličina so strednou hodnotou t⁽⁰⁾ⱼ a rozptylom σ²ⱼ. Pravdepodobnosť, že udalosť nastane najneskôr v prípustnom termíne t⁽¹⁾ⱼ, je Pⱼ = Φ((t⁽¹⁾ⱼ − t⁽⁰⁾ⱼ) / σⱼ). Doplnok 1 − Pⱼ je pravdepodobnosť, že uzol bude kritický (jeho oneskorenie posunie koniec projektu).',{keepNext:true}));
body.push(TCap('Pravdepodobnosť kritičnosti uzlov'));
body.push(T(['Uzol','t⁽⁰⁾ⱼ','t⁽¹⁾ⱼ','Rⱼ','σ²ⱼ','Z = Rⱼ / σⱼ','Pⱼ','Pravdep. kritičnosti 1 − Pⱼ'],D.t0.map((t,i)=>{const c=Math.abs(D.t1[i]-t)<1e-9; const w=s=>c?{t:s,hl:true}:s;
  const z=D.s0[i]===0?'–':f((D.t1[i]-t)/Math.sqrt(D.s0[i]),3);
  return [w(String(i+1)),w(f(t,3)),w(f(D.t1[i],3)),w(f(D.t1[i]-t,3)),w(D.s0s[i]==='0'?'0':D.s0s[i]+' = '+f(D.s0[i],4)),w(z),w(i===0?'100,00 %':pct(D.nodeP[i])),w(i===0?'– (štart)':pct(1-D.nodeP[i]))];}),[0.7,1,1,0.9,1.7,1.1,1.1,1.8],{size:17}));
body.push(Src('vlastné výpočty'));
body.push(P('Všetky uzly okrem uzla 3 majú nulovú rezervu, a teda pravdepodobnosť kritičnosti 50 % – ich oneskorenie sa s rovnakou pravdepodobnosťou ako dodržanie premietne do konca projektu. Uzol 3 (koniec financovania, začiatok právneho auditu) má rezervu 1 týždeň a pravdepodobnosť jeho kritičnosti je len 0,13 %.'));
body.push(P('**Pravdepodobnosť kritičnosti činností.** Nekritická činnosť sa stane kritickou, ak najdlhšia cesta, ktorá ňou prechádza, prekročí strednú dobu projektu T. Táto cesta je kratšia o celkovú rezervu RCᵢⱼ, takže P(kritičnosť) = 1 − Φ(RCᵢⱼ / σ_cesty). Výsledky dopĺňa index kritičnosti zo simulácie Monte Carlo (200 000 behov, beta-PERT rozdelenie dôb trvania), ktorý udáva podiel behov, v ktorých činnosť ležala na kritickej ceste.',{keepNext:true}));
const pt=D.paths;
const ci=D.ci;
body.push(TCap('Pravdepodobnosť kritičnosti činností'));
body.push(T(['Činnosť','RCᵢⱼ','Najdlhšia cesta cez činnosť','σ_cesty','P(kritičnosť) analyticky','Index kritičnosti (Monte Carlo)'],[
 ['A','0','A–D–E–F–G–H–J–K–L','0,9129','kritická',pct(ci.A,1)],['B','2','B–C–F–G–H–J–K–L',f(pt['B-C-F-G-H-J-K-L'].s,4),pct(pt['B-C-F-G-H-J-K-L'].p),pct(ci.B,1)],
 ['C (a fikt.)','1','A–fikt.–C–F–…–L',f(pt['A-C-F-G-H-J-K-L'].s,4),pct(pt['A-C-F-G-H-J-K-L'].p),pct(ci.C,1)],['D, E','0','A–D–E–F–G–H–J–K–L','0,9129','kritické',pct(ci.D,1)],
 ['I','6,333','A–D–I–K–L',f(pt['A-D-I-K-L'].s,4),'≈ 0,00 %',pct(ci.I,1)],['F, G, H, J, K, L','0','spoločný úsek všetkých ciest','–','kritické','100,0 %']],[1.4,0.8,2.6,0.9,1.5,1.6],{leftCols:1,size:17}));
body.push(Src('vlastné výpočty (Python)'));
body.push(P('Činnosti F až L ležia na všetkých cestách projektu, sú teda kritické s istotou. Činnosti D a E sú kritické v 93,5 % prípadov – v zostávajúcich 6,5 % sa kritickou stáva súbežná cesta cez fiktívnu činnosť a právny audit C (analyticky 11,97 %). Činnosť B je kritická len výnimočne (0,3 %) a výroba nábytku I nikdy.'));

body.push(H2('3.8  Manažerská interpretace výsledků'));
body.push(B('**Realistický termín:** stredná doba projektu je 18,67 týždňa. Skrátenie o 1 týždeň je pravdepodobné len na 13,67 % a termín 17 týždňov na 3,39 %, preto by ich investor nemal sľubovať. Pri 10 % riziku oneskorenia je plánovaný termín 19,84 ≈ **20 týždňov**; pre zmluvy s nájomcom odporúčame 21 týždňov (99,47 %).'));
body.push(B('**Kritické činnosti:** 9 z 12 činností je kritických. Najväčšie riziko predstavujú **vybavovanie ohlášky na úradoch (E)**, kde je vhodné podať kompletnú dokumentáciu a využiť skúseného projektanta, a **murárske práce s obkladmi (H)** s pesimistickým odhadom 4 týždne – odporúča sa zmluvne zaviazať dodávateľa termínom a sankciou za omeškanie.'));
body.push(B('**Využitie rezerv:** výroba nábytku na mieru (I) má rezervu 6,33 týždňa – nábytok možno objednať až v 11. týždni a odložiť tak výdavok. Finančnú prípravu (B) možno začať o 2 týždne neskôr; právny audit C má rezervu len 1 týždeň a pri skracovaní projektu sa stane kritickým ako prvý.'));

// ---------- ZÁVĚR ----------
body.push(H1('4  Závěr'));
body.push(P('Seminárna práca preukázala praktickú využiteľnosť dvoch základných metód operačného výskumu pri riešení reálnych manažérskych problémov.'));
body.push(P('V **Úkole 1** bol zostavený ekonomický a matematický model optimalizácie prevádzky dátového centra so 6 celočíselnými premennými, 5 štrukturálnymi obmedzeniami a dolnými medzami vyplývajúcimi zo SLA. Riešením v MS Excel (Riešiteľ, Simplex LP s celočíselnými podmienkami) a overením v Pythone bolo nájdené jednoznačné optimum: 50 webových serverov, 76 AI GPU serverov, 25 PoS validátorov a 15 databázových serverov, s **maximálnym denným ziskom 4 130 €**. Analýza ukázala, že úzkym hrdlom je **dátová linka** (100 % využitie) a že ekologická regulácia je takmer presne naplnená, zatiaľ čo energia, chladenie a priestor majú voľné kapacity. Pre manažment z toho vyplýva jasné odporúčanie: orientovať sa na AI výpočty, opustiť ťažbu kryptomien a investovať do zvýšenia priepustnosti linky, ktorej tieňová cena je približne 0,427 €/Mbps za deň.'));
body.push(P('V **Úkole 2** bol metódou PERT analyzovaný investičný projekt nákupu a rekonštrukcie bytu na prenájom s 12 činnosťami. Pomocou hranovo-hranovej matice bol zostavený sieťový graf s jednou fiktívnou činnosťou, metódou preškrtávania hrán boli činnosti rozdelené do 9 rádov a očíslovaných 11 uzlov. Časová analýza v grafe aj v tabuľke určila kritickú cestu **A – D – E – F – G – H – J – K – L** so strednou dobou trvania **18,67 týždňa** a smerodajnou odchýlkou 0,913 týždňa. Pravdepodobnosť skrátenia realizácie o 1 týždeň je 13,67 %, dodržania termínu 17 týždňov 3,39 % a termínu 20 týždňov 92,79 %. Pri 10 % riziku oneskorenia je plánovaný termín 19,84 ≈ 20 týždňov. Incidenčná matica potvrdila kritickú cestu a umožnila určiť pravdepodobnosť kritičnosti uzlov (50 % pre kritické uzly, 0,13 % pre uzol 3) a činností (najrizikovejšia nekritická činnosť je právny audit C s 11,97 %).'));
body.push(P('Obe analýzy ukazujú hlavný prínos kvantitatívnych metód pre manažérske rozhodovanie: premieňajú neurčité otázky („čo sa oplatí prevádzkovať?“, „kedy bude byt pripravený na prenájom?“) na presné, overiteľné odpovede a zároveň odhaľujú úzke hrdlá, rezervy a riziká, na ktoré má manažér zamerať pozornosť a investície.'));

// ---------- LITERATURA ----------
body.push(H1('5  Seznam použité literatury'));
const lit=[
 ['DOSTÁL, Petr, Karel RAIS a Radek DOSKOČIL. ','Ekonomicko-matematické metody','. Kunovice: Evropský polytechnický institut, 2007. ISBN 978-80-7314-122-6.'],
 ['FIALA, Petr. ','Projektové řízení: modely, metody, analýzy','. 1. vyd. Praha: Professional Publishing, 2004. ISBN 80-86419-24-X.'],
 ['FIALA, Petr. ','Řízení projektů','. 2. přeprac. vyd. Praha: Oeconomica, 2008. ISBN 978-80-245-1413-0.'],
 ['GROS, Ivan. ','Kvantitativní metody v manažerském rozhodování','. 1. vyd. Praha: Grada, 2003. Expert. ISBN 80-247-0421-8.'],
 ['JABLONSKÝ, Josef. ','Operační výzkum: kvantitativní modely pro ekonomické rozhodování','. 1. vyd. Praha: Professional Publishing, 2002. ISBN 80-86419-23-1.'],
 ['RAIS, Karel a Radek DOSKOČIL. ','Operační a systémová analýza I','. Brno: Akademické nakladatelství CERM, 2011. ISBN 978-80-214-4364-8.'],
 ['RAIS, Karel, Petr DOSTÁL a Radek DOSKOČIL. ','Operační a systémová analýza II','. Brno: Akademické nakladatelství CERM, 2007. ISBN 978-80-214-3371-7.'],
 ['ŠUBRT, Tomáš a kol. ','Ekonomicko-matematické metody','. 3. upr. a rozš. vyd. Plzeň: Aleš Čeněk, 2019. ISBN 978-80-7380-762-7.']];
lit.forEach(([a,t,r],i)=>body.push(new Paragraph({alignment:AlignmentType.LEFT,spacing:{after:100},indent:{left:567,hanging:567},children:[new TextRun(`[${i+1}]\t${a}`),new TextRun({text:t,italics:true}),new TextRun(r)]})));

const doc=new Document({
 creator:'Študent FP VUT',title:'Seminárna práca – Kvantitativní metody',
 styles:{default:{document:{run:{font:FONT,size:24},paragraph:{spacing:{line:276,lineRule:'auto'}}}},
  paragraphStyles:[
   {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:30,bold:true,color:'000000'},paragraph:{spacing:{before:360,after:160},keepNext:true,outlineLevel:0}},
   {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:26,bold:true,color:'000000'},paragraph:{spacing:{before:240,after:120},keepNext:true,outlineLevel:1}},
   {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:24,bold:true},paragraph:{spacing:{before:160,after:80},keepNext:true,outlineLevel:2}}]},
 numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:283}}}}]},
  {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:340}}}}]}]},
 sections:[{properties:{titlePage:true,page:{size:{width:11906,height:16838},margin:{top:1418,bottom:1418,left:1418,right:1418}}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:[PageNumber.CURRENT],size:20})]})]}),first:new Footer({children:[new Paragraph('')]})},
  children:[...title,...body]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('raw.docx',b);fs.writeFileSync('eqs.json',JSON.stringify(EQS));console.log('ok',EQS.length)});
