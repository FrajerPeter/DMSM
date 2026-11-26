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


const body=[]; figN=1;
const H2b=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun(t)]});
body.push(H2b('3.4  Časová analýza metodou PERT (úloha 3)'));
body.push(P('Časová analýza sa vykonáva so strednými dobami trvania činností yᵢⱼ vypočítanými v predchádzajúcej časti. Prebieha v dvoch krokoch:'));
body.push(B('**Výpočet dopredu** (od uzla 1 k uzlu 11) určuje **termín možný TMᵢ** – najskôr možný termín, v ktorom môže nastať udalosť v uzle i. Do počiatočného uzla sa zapíše 0. Pre každý ďalší uzol sa vyberie najväčší zo súčtov termínu možného predchádzajúceho uzla a doby trvania činnosti, ktorá do uzla vstupuje.'));
body.push(B('**Výpočet dozadu** (od uzla 11 k uzlu 1) určuje **termín prípustný TPᵢ** – najneskôr prípustný termín udalosti, pri ktorom sa neoneskorí koniec projektu. Do koncového uzla sa prepíše jeho termín možný. Pre ostatné uzly sa vyberie najmenší z rozdielov termínu prípustného nasledujúceho uzla a doby trvania činnosti, ktorá z uzla vystupuje.'));
body.push(X('TM_{1} = 0;\\qquad TM_{j} = \\max_{i}\\left( TM_{i} + y_{ij} \\right);\\qquad TP_{n} = TM_{n} = T;\\qquad TP_{i} = \\min_{j}\\left( TP_{j} - y_{ij} \\right)'));
body.push(P('Z termínov uzlov sa určia časové charakteristiky činností – začiatok možný ZM, koniec možný KM, začiatok prípustný ZP, koniec prípustný KP a celková rezerva RC:',{keepNext:true}));
body.push(X('ZM_{ij} = TM_{i};\\quad KM_{ij} = ZM_{ij} + y_{ij};\\quad KP_{ij} = TP_{j};\\quad ZP_{ij} = KP_{ij} - y_{ij};\\quad RC_{ij} = TP_{j} - TM_{i} - y_{ij}'));
body.push(P('Výsledky časovej analýzy sú zapísané priamo v sieťovom grafe (Obrázok 2). Každý uzol je rozdelený na tri časti: v hornej polovici je číslo uzla, vľavo dole termín možný TMᵢ a vpravo dole termín prípustný TPᵢ. Pri každej hrane (činnosti) sú nad šípkou uvedené začiatok možný ZM, označenie činnosti so strednou dobou trvania y a koniec možný KM, pod šípkou začiatok prípustný ZP, celková rezerva RC (kurzívou) a koniec prípustný KP. Pri šikmých hranách sú tieto údaje kvôli prehľadnosti v rámčeku v rovnakom poradí (horný riadok ZM – činnosť: y – KM, dolný riadok ZP – RC – KP). Graf je zalomený, takže posledné činnosti J, K a L smerujú sprava doľava – údaje pri hrane sa vždy čítajú v smere šípky.'));
body.push(IMG('graf_siet_v2.png',605,452)); body.push(FCap('Sieťový graf projektu s výsledkami časovej analýzy metódou PERT (vlastné spracovanie)'));
body.push(P('Kritická cesta je v grafe vyznačená hrubou čiernou čiarou a kritické uzly sivou výplňou, fiktívna činnosť prerušovanou čiarou. Kritické sú tie uzly, v ktorých sa termín možný rovná termínu prípustnému (TMᵢ = TPᵢ), a tie činnosti, ktoré majú nulovú celkovú rezervu (RC = 0). Kritickú cestu teda tvoria uzly 1 – 2 – 4 – 5 – 6 – 7 – 8 – 9 – 10 – 11 a činnosti **A → D → E → F → G → H → J → K → L**. **Stredná doba trvania projektu je T = TM₁₁ = 18,67 týždňa.** Nekritické sú činnosti B (RC = 2 týždne), C a fiktívna činnosť (RC = 1 týždeň) a I (RC = 6,33 týždňa).'));
body.push(P('Časové charakteristiky na úrovni uzlov – termín možný TMᵢ (v ďalších tabuľkách označený aj t⁽⁰⁾ᵢ), termín prípustný TPᵢ (t⁽¹⁾ᵢ) a rezerva uzla Rᵢ = TPᵢ − TMᵢ:'));
const doc=new Document({
 creator:'Študent FP VUT',title:'Seminárna práca – Kvantitativní metody',
 styles:{default:{document:{run:{font:FONT,size:24},paragraph:{spacing:{line:276,lineRule:'auto'}}}},
  paragraphStyles:[
   {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:30,bold:true,color:'000000'},paragraph:{spacing:{before:360,after:160},keepNext:true,outlineLevel:0}},
   {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:26,bold:true,color:'000000'},paragraph:{spacing:{before:240,after:120},keepNext:true,outlineLevel:1}},
   {id:'Heading3',name:'Heading 3',basedOn:'Normal',next:'Normal',quickFormat:true,run:{font:FONT,size:24,bold:true},paragraph:{spacing:{before:160,after:80},keepNext:true,outlineLevel:2}}]},
 numbering:{config:[{reference:'bul',levels:[{level:0,format:LevelFormat.BULLET,text:'•',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:283}}}}]},
  {reference:'num',levels:[{level:0,format:LevelFormat.DECIMAL,text:'%1.',alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:567,hanging:340}}}}]}]},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1418,bottom:1418,left:1418,right:1418}}},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:[PageNumber.CURRENT],size:20})]})]}),first:new Footer({children:[new Paragraph('')]})},
  children:[...body]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('raw34.docx',b);fs.writeFileSync('eqs34.json',JSON.stringify(EQS));console.log('ok',EQS.length)});
