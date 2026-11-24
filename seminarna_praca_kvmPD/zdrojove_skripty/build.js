const fs=require('fs');
const D=JSON.parse(fs.readFileSync('data.json','utf8'));
const {Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,WidthType,AlignmentType,HeadingLevel,ImageRun,
 ShadingType,BorderStyle,Footer,PageNumber,PageBreak,LevelFormat,Math:OMath,MathRun,MathFraction,MathSubScript,MathSuperScript,MathRadical,VerticalAlign,TableLayoutType}=require('docx');
const FONT='Times New Roman', W=9070;
const f=(x,d=2)=>{let s=Number(x).toFixed(d); let [i,dec]=s.split('.'); i=i.replace(/\B(?=(\d{3})+(?!\d))/g,' '); return dec?i+','+dec:i;};
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
    let txt=c, hl=false, bold=isHead; if(c&&typeof c==='object'){txt=c.t;hl=c.hl;bold=bold||c.b;}
    return new TableCell({width:{size:widths[j],type:WidthType.DXA},borders,verticalAlign:VerticalAlign.CENTER,
      shading:isHead?{fill:'1F4E79',type:ShadingType.CLEAR,color:'auto'}:hl?{fill:'FADBD8',type:ShadingType.CLEAR,color:'auto'}:(o.zebra&&ri%2)?{fill:'F2F2F2',type:ShadingType.CLEAR,color:'auto'}:undefined,
      margins:{top:40,bottom:40,left:70,right:70},
      children:[new Paragraph({alignment:(j<(o.leftCols??1))?AlignmentType.LEFT:AlignmentType.CENTER,children:[new TextRun({text:String(txt),bold,size:sz,color:isHead?'FFFFFF':undefined,font:o.mono?'Consolas':FONT})]})]});})});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:widths,rows:[mk(head,true,0),...rows.map((r,i)=>mk(r,false,i))]});}
const mr=t=>t;
const EQ=(children,o={})=>new Paragraph({alignment:AlignmentType.CENTER,keepNext:o.kn,spacing:{before:80,after:80},children:[new TextRun({text:children.join(''),font:'Cambria Math',size:23})]});
const sub=(b,x)=>b+({e:'ₑ',p:'ₚ'}[x]||x);
const frac=(n,d)=>{const a=n.join(''),b=d.join('');return (a.length>1?'('+a+')':a)+' / '+b;};
const IMG=(file,w,h)=>new Paragraph({alignment:AlignmentType.CENTER,keepNext:true,spacing:{line:240,lineRule:'auto',before:120},children:[new ImageRun({type:'png',data:fs.readFileSync(file),transformation:{width:w,height:h}})]});
const PB=()=>new Paragraph({children:[new PageBreak()]});

// ---------- TITLE ----------
const ctr=(t,sz,o={})=>new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:o.after??80,before:o.before??0},children:[new TextRun({text:t,size:sz,bold:o.b,allCaps:o.caps,color:o.color})]});
const title=[
 ctr('VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ',32,{b:true,before:600}),
 ctr('BRNO UNIVERSITY OF TECHNOLOGY',22,{color:'595959',after:400}),
 ctr('FAKULTA PODNIKATELSKÁ',28,{b:true}),
 ctr('FACULTY OF BUSINESS AND MANAGEMENT',22,{color:'595959',after:1600}),
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
body.push(P('**Druhý problém (Úkol 2)** predstavuje investičný projekt nákupu a kompletnej rekonštrukcie bytu určeného na prenájom. Projekt pozostáva z 12 na seba nadväzujúcich činností s neistými dobami trvania, preto je analyzovaný **sieťovou analýzou metódou PERT** (Program Evaluation and Review Technique). Súčasťou riešenia je hranovo-hranová matica, metóda preškrtávania hrán, zostrojenie hranovo definovaného sieťového grafu, časová analýza s určením kritickej cesty, pravdepodobnostná analýza dodržania plánovaných termínov a incidenčná matica grafu.'));
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
body.push(P('**Obmedzujúce podmienky** vyplývajú z technických parametrov infraštruktúry, regulácie a zmlúv:'));
body.push(N('**Kapacita elektrickej siete** – denná dostupná energia je 12 000 kWh; spotreba jednotlivých zariadení je 30, 25, 10, 40, 5 a 15 kWh/deň.'));
body.push(N('**Chladiaci výkon** – klimatizačná infraštruktúra dokáže odviesť 3 000 kW tepla; zariadenia vyžadujú 10, 8, 2, 12, 1 a 3 kW.'));
body.push(N('**Fyzický priestor** – v rackoch je k dispozícii 600 rackových jednotiek (U); zariadenia zaberajú 2, 4, 1, 4, 1 a 2 U.'));
body.push(N('**Dátová priepustnosť** – konektivita dátového centra je 15 000 Mbps; jednotlivé operácie vyťažujú linku 5, 10, 100, 50, 200 a 80 Mbps.'));
body.push(N('**Ekologická regulácia** – aspoň 15 % všetkých nasadených jednotiek musia tvoriť nízkoenergetické PoS validátorské uzly (x₅).'));
body.push(N('**Zmluvné SLA limity** – podnik má uzavreté zmluvy, ktoré vyžadujú prevádzku minimálne 50 webových serverov (x₃), 20 AI serverov (x₄) a 15 databázových serverov (x₆).'));
body.push(N('**Nezápornosť a celočíselnosť** – počet zariadení nemôže byť záporný ani necelý.'));

body.push(H2('2.2  Matematický model úlohy'));
body.push(P('Účelová funkcia (maximalizácia denného čistého zisku v €):',{keepNext:true}));
body.push(EQ([mr('Z = 15x₁ + 12x₂ + 20x₃ + 35x₄ + 8x₅ + 18x₆ → max')]));
body.push(P('za podmienok (štrukturálne obmedzenia):',{keepNext:true}));
['30x₁ + 25x₂ + 10x₃ + 40x₄ + 5x₅ + 15x₆ ≤ 12 000   (elektrická sieť, kWh)','10x₁ + 8x₂ + 2x₃ + 12x₄ + 1x₅ + 3x₆ ≤ 3 000   (chladenie, kW)',
 '2x₁ + 4x₂ + 1x₃ + 4x₄ + 1x₅ + 2x₆ ≤ 600   (priestor, U)','5x₁ + 10x₂ + 100x₃ + 50x₄ + 200x₅ + 80x₆ ≤ 15 000   (dátová linka, Mbps)',
 '−0,15x₁ − 0,15x₂ − 0,15x₃ − 0,15x₄ + 0,85x₅ − 0,15x₆ ≥ 0   (ekologická regulácia)'].forEach(s=>body.push(EQ([mr(s)])));
body.push(P('Ekologická podmienka vznikla úpravou požiadavky x₅ ≥ 0,15·(x₁ + x₂ + x₃ + x₄ + x₅ + x₆), po prevedení všetkých členov na ľavú stranu. Ďalej platia dolné medze (SLA) a podmienky nezápornosti a celočíselnosti:',{keepNext:true}));
body.push(EQ([mr('x₃ ≥ 50,   x₄ ≥ 20,   x₆ ≥ 15')]));
body.push(EQ([mr('x₁, x₂, …, x₆ ≥ 0,   xⱼ ∈ ℤ   (j = 1, …, 6)')]));
body.push(P('Model má teda 6 štrukturálnych premenných, 5 štrukturálnych obmedzení, 3 dolné medze a podmienky nezápornosti a celočíselnosti. Ide o **úlohu celočíselného lineárneho programovania** (ILP).'));

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
body.push(H1('3  Úkol 2: Síťová analýza – Investiční proces a rekonstrukce bytu k pronájmu (metoda PERT)'));
body.push(P('Investor plánuje kúpiť starší byt, kompletne ho zrekonštruovať a čo najskôr ho ponúknuť na prenájom. Každý týždeň oneskorenia znamená ušlé nájomné a ďalšie úroky z hypotekárneho úveru, preto potrebuje poznať očakávanú dĺžku projektu, kritické činnosti a pravdepodobnosť dodržania termínu, ktorý môže prisľúbiť budúcemu nájomcovi či banke. Doby trvania činností nie sú presne známe (závisia od ponuky na trhu, od úradov a od dodávateľov), preto je vhodnou metódou **PERT**, ktorá pracuje s tromi časovými odhadmi a predpokladá beta rozdelenie doby trvania činností.'));
body.push(H2('3.1  Výpočet středních dob trvání a rozptylů'));
body.push(P('Pre každú činnosť sú zadané tri odhady v týždňoch: optimistický (a), najpravdepodobnejší (m) a pesimistický (b). Stredná (očakávaná) doba trvania a rozptyl sa vypočítajú podľa vzťahov:',{keepNext:true}));
body.push(EQ([sub('t','e'),mr(' = '),frac([mr('a + 4m + b')],[mr('6')]),mr(',          '),'σ²',mr(' = '),'[(b − a) / 6]²']));
body.push(TCap('Vstupné údaje, stredné doby trvania a rozptyly činností'));
body.push(T(['Čin.','Popis činnosti','Predch.','a','m','b','tₑ [týž.]','σ²'],K.map(k=>{const x=A[k];const c=D.crit.includes(k);const w=s=>c?{t:s,hl:true}:s;
  return [w(k),w(({A:'Průzkum trhu a prohlídky nemovitostí',B:'Finanční příprava a předschválení úvěru',C:'Právní audit, podpis smluv a katastr',D:'Zaměření a architektonický návrh',E:'Vyřízení ohlášky/povolení na úřadech',F:'Bourací práce a odvoz suti',G:'Hrubé instalace – voda, elektro',H:'Zednické práce, obklady a sanita',I:'Objednávka a výroba nábytku na míru',J:'Malířské práce a pokládka podlah',K:'Kompletace a montáž nábytku',L:'Finální úklid, homestaging a inzerce'})[k]),
  w(x.p.length?x.p.join(', '):'–'),w(x.a),w(x.m),w(x.b),w(f(x.te,3)+(x.te_s.includes('/')?' ('+x.te_s+')':'')),w(f(x.var,4)+' ('+x.var_s+')')];}),[0.6,4.2,0.9,0.45,0.45,0.45,1.45,1.3],{leftCols:2,size:18}));
body.push(Src('vlastné výpočty; farebne sú zvýraznené činnosti, ktoré ležia na kritickej ceste'));
body.push(P('Napríklad pre činnosť I platí tₑ = (3 + 4·4 + 6)/6 = 25/6 ≈ 4,167 týždňa a σ² = ((6 − 3)/6)² = 0,25. Najväčšiu neistotu (rozptyl 0,25) má práve výroba nábytku na mieru, ktorá má výrazne posunutý pesimistický odhad.'));

body.push(H2('3.2  Hrano-hranová matice a metoda přeškrtávání hran'));
body.push(P('Hranovo-hranová matica M (12 × 12) zachytáva bezprostredné nadväznosti činností: prvok mᵢⱼ = 1, ak činnosť v riadku i bezprostredne predchádza činnosti v stĺpci j, inak je prvok prázdny (0). Stĺpec teda ukazuje predchodcov danej činnosti, riadok jej nasledovníkov.'));
const L12=K; const succ={}; L12.forEach(k=>succ[k]=L12.filter(s=>A[s].p.includes(k)));
body.push(TCap('Hranovo-hranová matica projektu (riadok = predchodca, stĺpec = nasledovník)'));
const rank={A:0,B:0,C:1,D:1,E:2,I:2,F:3,G:4,H:5,J:6,K:7,L:8};
body.push(T(['',...L12,'Σ'],L12.map(r=>[{t:r,b:true},...L12.map(c=>succ[r].includes(c)?{t:'1',b:true}:''),String(succ[r].length)]).concat([[{t:'Σ',b:true},...L12.map(c=>String(A[c].p.length)),'14'],[{t:'Rád',b:true},...L12.map(c=>({t:String(rank[c]),b:true})),'']]),Array(14).fill(1),{size:19}));
body.push(Src('vlastné spracovanie'));
body.push(P('**Metóda preškrtávania hrán** postupne hľadá stĺpce, ktoré neobsahujú žiadnu jednotku (činnosti bez nepreškrtnutých predchodcov). Tieto činnosti tvoria aktuálny rád; následne sa preškrtnú ich riadky a postup sa opakuje, kým nie sú zaradené všetky činnosti. Priebeh je uvedený v Tabuľke 8.'));
body.push(TCap('Postup metódy preškrtávania hrán'));
body.push(T(['Krok','Stĺpce bez jednotiek (nové činnosti)','Rád','Preškrtnuté riadky'],[
 ['1','A, B (nemajú predchodcov)','0','A, B'],['2','C (pôvodne A, B), D (pôvodne A)','1','C, D'],['3','E (D), I (D)','2','E, I'],
 ['4','F (C, E)','3','F'],['5','G (F)','4','G'],['6','H (G)','5','H'],['7','J (H)','6','J'],['8','K (I, J)','7','K'],['9','L (K)','8','L']],[0.8,4.2,0.8,2],{leftCols:0,size:19,zebra:true}));
body.push(Src('vlastné spracovanie'));
body.push(P('Činnosti sú rozdelené do **9 rádov (0. až 8. rád)**. Podľa rádov sú očíslované uzly sieťového grafu tak, aby každá hrana viedla z uzla s nižším číslom do uzla s vyšším číslom (i < j). Počiatočný uzol 1 je začiatkom činností 0. rádu A a B. Keďže činnosť C vyžaduje dokončenie A aj B, ale činnosť D iba A, musí byť zavedená **fiktívna činnosť** (2 → 3) s nulovou dobou trvania: A končí v uzle 2 (z ktorého vychádza D), B končí v uzle 3 a fiktívna hrana zabezpečí, že C (3 → 5) začne až po skončení A aj B. Ďalej D končí v uzle 4 (začiatok E a I), C a E sa stretávajú v uzle 5 (začiatok F) a postupne nasledujú uzly 6 až 11. Výsledný graf má **11 uzlov a 13 hrán** (12 reálnych a 1 fiktívnu).'));

body.push(H2('3.3  Síťový graf'));
body.push(P('Na Obrázku 2 je hranovo definovaný sieťový graf (AOA – activity on arrow). Činnosti sú znázornené hranami s uvedenou strednou dobou trvania, uzly predstavujú udalosti. V hornej časti uzla je jeho číslo, vľavo dole najskôr možný termín t⁽⁰⁾ a vpravo dole najneskôr prípustný termín t⁽¹⁾. Kritická cesta je vyznačená červenou farbou, fiktívna činnosť prerušovanou čiarou.',{keepNext:true}));
body.push(IMG('graf_siet.png',605,180)); body.push(FCap('Hranovo definovaný sieťový graf projektu s výsledkami časovej analýzy (vlastné spracovanie)'));

body.push(H2('3.4  Časová analýza'));
body.push(P('Časová analýza prebieha v dvoch krokoch. **Výpočet dopredu** stanoví najskôr možné začiatky a konce činností: ESᵢⱼ = t⁽⁰⁾ᵢ, EFᵢⱼ = ESᵢⱼ + tₑ, pričom t⁽⁰⁾ⱼ = max(EF činností vstupujúcich do uzla j) a t⁽⁰⁾₁ = 0. **Výpočet dozadu** od konca projektu (t⁽¹⁾₁₁ = T = t⁽⁰⁾₁₁) stanoví najneskôr prípustné konce a začiatky: LFᵢⱼ = t⁽¹⁾ⱼ, LSᵢⱼ = LFᵢⱼ − tₑ, kde t⁽¹⁾ᵢ = min(LS činností vystupujúcich z uzla i). Celková rezerva Rc = LS − ES = LF − EF, voľná rezerva Rv = t⁽⁰⁾ⱼ − EF.'));
body.push(TCap('Časová analýza projektu (v týždňoch)'));
body.push(T(['Čin.','Hrana (i, j)','tₑ','ES','EF','LS','LF','Rc','Rv','Kritická'],D.edges.map(e=>{const c=e.crit;const w=s=>c?{t:s,hl:true}:s;return [w(e.n==='Fikt'?'fiktívna':e.n),w(`(${e.i}, ${e.j})`),w(f(e.te,3)),w(f(e.ES,3)),w(f(e.EF,3)),w(f(e.LS,3)),w(f(e.LF,3)),w(f(e.Rc,3)),w(f(e.Rv,3)),w(c?'áno':'nie')];}),[1.2,1.2,1,1,1,1,1,1,1,1],{size:18}));
body.push(Src('vlastné výpočty (overené v MS Excel aj v Pythone v presných zlomkoch)'));
body.push(P(`**Kritická cesta** prechádza uzlami 1 – 2 – 4 – 5 – 6 – 7 – 8 – 9 – 10 – 11 a tvoria ju činnosti **A → D → E → F → G → H → J → K → L** (všetky s nulovou celkovou rezervou). **Očakávaná doba trvania projektu je T = 56/3 ≈ 18,67 týždňa** (asi 4,3 mesiaca). Nekritické sú len tri činnosti: B (Rc = 2 týždne, Rv = 1 týždeň), C (Rc = 1 týždeň) a I (Rc = Rv = 6,33 týždňa). Fiktívna činnosť (2, 3) má rezervu 1 týždeň. Kritická cesta obsahuje 9 z 12 činností, čo znamená, že projekt je časovo veľmi „napätý“.`));

body.push(H2('3.5  Analýza pravděpodobnosti dodržení plánovaných termínů'));
body.push(P('Podľa centrálnej limitnej vety možno dobu trvania projektu T (súčet dôb trvania kritických činností) aproximovať normálnym rozdelením so strednou hodnotou rovnou dĺžke kritickej cesty a rozptylom rovným súčtu rozptylov kritických činností:',{keepNext:true}));
body.push(EQ(['σ²',mr(' = '),mr('σ²(A) + σ²(D) + σ²(E) + σ²(F) + σ²(G) + σ²(H) + σ²(J) + σ²(K) + σ²(L)')]));
body.push(EQ(['σ²',mr(' = 7·(1/9) + 2·(1/36) = 5/6 ≈ 0,8333,      σ = '),'√(5/6)',mr(' ≈ 0,9129 týždňa')]));
body.push(P('Pravdepodobnosť dokončenia projektu do plánovaného termínu Tₚ sa vypočíta pomocou normovanej premennej Z a distribučnej funkcie normovaného normálneho rozdelenia Φ (v Exceli NORM.S.DIST(Z;1)):',{keepNext:true}));
body.push(EQ([mr('Z = '),frac([sub('T','p'),mr(' − T')],[mr('σ')]),mr(',        P(T ≤ '),sub('T','p'),mr(') = Φ(Z)')]));
body.push(P('**Termín 17 týždňov** (ambiciózny plán investora): Z = (17 − 18,667)/0,9129 = −1,8257 → P = Φ(−1,8257) = **3,39 %**. Dokončiť projekt za 17 týždňov je prakticky nereálne.'));
body.push(P('**Termín 20 týždňov:** Z = (20 − 18,667)/0,9129 = 1,4606 → P = Φ(1,4606) = **92,79 %**. Tento termín je dodržateľný s vysokou pravdepodobnosťou.'));
const pr=D.probs;
body.push(TCap('Pravdepodobnosť dodržania vybraných plánovaných termínov'));
body.push(T(['Plánovaný termín Tₚ [týždne]','17','18','19','20','21'],[
 ['Z',...['17','18','19','20','21'].map(k=>f(pr[k].z,4))],[{t:'P(T ≤ Tₚ)',b:true},...['17','18','19','20','21'].map(k=>({t:pct(pr[k].p),b:true}))]],[2.6,1,1,1,1,1],{leftCols:1}));
body.push(Src('vlastné výpočty'));
body.push(P('**Termín pre požadovanú pravdepodobnosť** dostaneme inverzným postupom: Tₚ = T + zₚ·σ, kde zₚ je kvantil normovaného normálneho rozdelenia (v Exceli NORM.S.INV(p)):',{keepNext:true}));
const q=D.quant;
body.push(T(['Požadovaná pravdepodobnosť p','zₚ','Tₚ = 18,667 + zₚ · 0,9129','Zaokrúhlene'],[
 ['90 %',f(q['0.9'].z,4),f(q['0.9'].T,3)+' týždňa','20 týždňov'],[{t:'95 % (odporúčané)',b:true},{t:f(q['0.95'].z,4),b:true},{t:f(q['0.95'].T,3)+' týždňa',b:true},{t:'21 týždňov',b:true}],['99 %',f(q['0.99'].z,4),f(q['0.99'].T,3)+' týždňa','21 týždňov']],[2.6,1.2,2.8,1.6],{leftCols:1}));
body.push(Src('vlastné výpočty'));
body.push(IMG('graf_normal.png',540,230)); body.push(FCap('Normálne rozdelenie doby trvania projektu a pravdepodobnosti dodržania termínov (vlastné spracovanie)'));
body.push(P(`Pri požadovanej spoľahlivosti 95 % je potrebné plánovať termín **20,17 týždňa**; v praxi je vhodné zmluvne sa zaviazať na **21 týždňov** (pravdepodobnosť 99,47 %). Pre kontrolu bola v Pythone vykonaná aj simulácia Monte Carlo (200 000 behov, beta-PERT rozdelenie všetkých 12 činností). Tá zohľadňuje aj takmer kritickú cestu B – C s rezervou 1 týždeň a dáva strednú dobu ${f(D.mc.mean,2)} týždňa, P(T ≤ 20) ≈ ${pct(D.mc.p20,1)} a 95 % kvantil ${f(D.mc.q95,2)} týždňa. Klasický PERT je teda mierne optimistický, odporúčaný termín 21 týždňov však obstojí aj pri tejto presnejšej analýze.`));

body.push(H2('3.6  Incidenční matice'));
body.push(P('Incidenčná matica S (uzly × hrany) má 11 riadkov a 13 stĺpcov. Prvok sᵢₖ = −1, ak hrana k z uzla i vychádza, sᵢₖ = +1, ak do uzla i vstupuje, inak 0. Každý stĺpec tak obsahuje práve jednu −1 (začiatočný uzol činnosti) a jednu +1 (koncový uzol). Kritické hrany sú zvýraznené.'));
const nm=D.names.map(n=>n==='Fikt'?'fikt.':n);
body.push(TCap('Incidenčná matica sieťového grafu (uzly × hrany)'));
body.push(T(['Uzol',...nm],D.inc.map((row,i)=>[{t:String(i+1),b:true},...row.map((v,j)=>{const s=v===0?'':(v>0?'+1':'−1');return D.edges[j].crit&&v!==0?{t:s,hl:true,b:true}:s;})]).concat([[{t:'tₑ',b:true},...D.edges.map(e=>f(e.te,2))]]),[1.1,...Array(13).fill(1)],{size:17}));
body.push(Src('vlastné spracovanie'));
body.push(P('**Určenie kritickej cesty pomocou incidenčnej matice.** Pri výpočte dopredu sa pre každý uzol j (riadok) nájdu stĺpce s hodnotou +1 (vstupujúce hrany); v týchto stĺpcoch sa podľa hodnoty −1 určí počiatočný uzol i a platí t⁽⁰⁾ⱼ = max(t⁽⁰⁾ᵢ + tₑ). Pri výpočte dozadu sa v riadku uzla i hľadajú hodnoty −1 (vystupujúce hrany) a platí t⁽¹⁾ᵢ = min(t⁽¹⁾ⱼ − tₑ). Hrana (i, j) je kritická, ak t⁽⁰⁾ᵢ = t⁽¹⁾ᵢ, t⁽⁰⁾ⱼ = t⁽¹⁾ⱼ a zároveň t⁽¹⁾ⱼ − t⁽⁰⁾ᵢ − tₑ = 0. Tento algoritmus bol naprogramovaný v Pythone priamo nad incidenčnou maticou a potvrdil kritickú cestu A – D – E – F – G – H – J – K – L s dĺžkou 18,67 týždňa.'));
body.push(P('**Pravdepodobnosť kritickosti uzlov.** Najskorší termín uzla t⁽⁰⁾ⱼ je náhodná veličina so strednou hodnotou t⁽⁰⁾ⱼ a rozptylom σ²ⱼ, ktorý sa rovná súčtu rozptylov činností na najdlhšej ceste do uzla j. Pravdepodobnosť, že udalosť nastane najneskôr v prípustnom termíne t⁽¹⁾ⱼ (a neohrozí koniec projektu), je Pⱼ = Φ((t⁽¹⁾ⱼ − t⁽⁰⁾ⱼ)/σⱼ); doplnok 1 − Pⱼ vyjadruje pravdepodobnosť, že sa uzol stane kritickým, t. j. jeho oneskorenie posunie koniec projektu.'));
body.push(TCap('Termíny uzlov a pravdepodobnosť ich kritickosti'));
body.push(T(['Uzol','t⁽⁰⁾','t⁽¹⁾','Rezerva','σ²ⱼ','Pⱼ = Φ(·)','1 − Pⱼ (riziko kritickosti)'],D.t0.map((t,i)=>{const c=Math.abs(D.t1[i]-t)<1e-9; const w=s=>c?{t:s,hl:true}:s;
  return [w(String(i+1)),w(f(t,3)),w(f(D.t1[i],3)),w(f(D.t1[i]-t,3)),w(D.s0s[i]==='0'?'0':D.s0s[i]+' = '+f(D.s0[i],4)),w(i===0?'100,00 %':pct(D.nodeP[i])),w(i===0?'0,00 % (štart)':pct(1-D.nodeP[i]))];}),[0.8,1,1,1,1.8,1.3,2],{size:18}));
body.push(Src('vlastné výpočty'));
body.push(P('Všetky uzly okrem uzla 3 ležia na kritickej ceste, majú nulovú rezervu a pravdepodobnosť ich dodržania je iba 50 % – každé oneskorenie na nich sa prenáša priamo do konca projektu. Uzol 3 (dokončenie financovania a predpoklad pre podpis zmlúv) má rezervu 1 týždeň a pri σ = 1/3 týždňa je pravdepodobnosť jeho kritickosti len 0,13 %.'));

body.push(H2('3.7  Manažerská interpretace výsledků'));
body.push(B('**Realistický termín:** očakávaná doba projektu je 18,67 týždňa. Termín 17 týždňov je dosiahnuteľný iba s pravdepodobnosťou 3,39 %, preto by ho investor nemal sľubovať. Termín 20 týždňov má pravdepodobnosť 92,79 %; pre zmluvy s nájomcom a banku (začiatok splácania) odporúčame **21 týždňov**, čo zodpovedá spoľahlivosti nad 99 %.'));
body.push(B('**Kritické činnosti:** 9 z 12 činností je kritických. Najväčšie riziko predstavujú činnosti so širokým rozpätím odhadov a malou ovplyvniteľnosťou: **vybavovanie ohlášky na úradoch (E)**, kde je vhodné podať kompletnú dokumentáciu a využiť skúseného projektanta, a **murárske práce s obkladmi (H)** s pesimistickým odhadom 4 týždne – odporúča sa zmluvne zaviazať dodávateľa termínom a sankciou za omeškanie.'));
body.push(B('**Využitie rezerv:** objednávka nábytku na mieru (I) má rezervu 6,33 týždňa – nábytok možno objednať až v 11. týždni a odložiť tak výdavok, alebo využiť rezervu na výber lacnejšieho dodávateľa. Finančnú prípravu (B) možno začať až o 2 týždne neskôr bez ohrozenia termínu, odporúča sa však začať hneď, pretože cesta B – C je takmer kritická (rezerva 1 týždeň).'));
body.push(B('**Možnosti skrátenia projektu:** skracovať má zmysel iba kritické činnosti (napr. paralelný výkon elektroinštalácie a vodoinštalácie v G, viac pracovníkov pri H a J). Pri skrátení kritickej cesty o viac ako 1 týždeň je potrebné sledovať cestu cez B a C, ktorá by sa stala kritickou.'));
body.push(B('**Finančný dopad:** pri predpokladanom nájomnom napr. 800 € mesačne stojí každý týždeň oneskorenia približne 185 € ušlého príjmu plus úroky z úveru, čo ospravedlňuje investície do zrýchlenia kritických činností.'));

// ---------- ZÁVĚR ----------
body.push(H1('4  Závěr'));
body.push(P('Seminárna práca preukázala praktickú využiteľnosť dvoch základných metód operačného výskumu pri riešení reálnych manažérskych problémov.'));
body.push(P('V **Úkole 1** bol zostavený ekonomický a matematický model optimalizácie prevádzky dátového centra so 6 celočíselnými premennými, 5 štrukturálnymi obmedzeniami a dolnými medzami vyplývajúcimi zo SLA. Riešením v MS Excel (Riešiteľ, Simplex LP s celočíselnými podmienkami) a overením v Pythone bolo nájdené jednoznačné optimum: 50 webových serverov, 76 AI GPU serverov, 25 PoS validátorov a 15 databázových serverov, s **maximálnym denným ziskom 4 130 €**. Analýza ukázala, že úzkym hrdlom je **dátová linka** (100 % využitie) a že ekologická regulácia je takmer presne naplnená, zatiaľ čo energia, chladenie a priestor majú voľné kapacity. Pre manažment z toho vyplýva jasné odporúčanie: orientovať sa na AI výpočty, opustiť ťažbu kryptomien a investovať do zvýšenia priepustnosti linky, ktorej tieňová cena je približne 0,427 €/Mbps za deň.'));
body.push(P('V **Úkole 2** bol metódou PERT analyzovaný investičný projekt nákupu a rekonštrukcie bytu na prenájom s 12 činnosťami. Pomocou hranovo-hranovej matice a metódy preškrtávania hrán boli činnosti rozdelené do 9 rádov, zostrojený hranovo definovaný sieťový graf s jednou fiktívnou činnosťou a vykonaná časová analýza. Kritickú cestu tvoria činnosti **A – D – E – F – G – H – J – K – L**, očakávaná doba projektu je **18,67 týždňa** so smerodajnou odchýlkou 0,913 týždňa. Pravdepodobnosť dokončenia do 17 týždňov je iba 3,39 %, do 20 týždňov 92,79 %; pre 95 % istotu je potrebné plánovať 20,17 týždňa, odporúčaný zmluvný termín je 21 týždňov. Výsledky boli potvrdené aj prostredníctvom incidenčnej matice a simuláciou Monte Carlo.'));
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
   {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:30,bold:true,color:'1F4E79'},paragraph:{spacing:{before:360,after:160},keepNext:true,outlineLevel:0}},
   {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:26,bold:true,color:'1F4E79'},paragraph:{spacing:{before:240,after:120},keepNext:true,outlineLevel:1}},
   {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:24,bold:true},paragraph:{spacing:{before:160,after:80},keepNext:true,outlineLevel:2}}]},
 numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:283}}}}]},
  {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:340}}}}]}]},
 sections:[{properties:{titlePage:true,page:{size:{width:11906,height:16838},margin:{top:1418,bottom:1418,left:1418,right:1418}}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:[PageNumber.CURRENT],size:20})]})]}),first:new Footer({children:[new Paragraph('')]})},
  children:[...title,...body]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Seminarna_praca_kvmPD.docx',b);console.log('ok')});
