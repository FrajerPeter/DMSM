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
      children:String(txt).split('\n').map(line=>new Paragraph({alignment:(j<(o.leftCols??1))?AlignmentType.LEFT:AlignmentType.CENTER,children:[new TextRun({text:line,bold,size:sz,color:'000000',font:o.mono?'Consolas':FONT})]}))});})});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:widths,rows:[mk(head,true,0),...rows.map((r,i)=>mk(r,false,i))]});}
const mr=t=>t;
const EQS=[]; const X=(latex)=>{EQS.push(latex);return new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:60,after:60},children:[new TextRun('§EQ'+(EQS.length-1)+'§')]});};
const IMG=(file,w,h)=>new Paragraph({alignment:AlignmentType.CENTER,keepNext:true,spacing:{line:240,lineRule:'auto',before:120},children:[new ImageRun({type:'png',data:fs.readFileSync(file),transformation:{width:w,height:h}})]});
const PB=()=>new Paragraph({children:[new PageBreak()]});

