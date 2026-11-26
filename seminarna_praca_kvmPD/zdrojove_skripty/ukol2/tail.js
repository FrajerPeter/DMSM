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
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('u2/raw.docx',b);fs.writeFileSync('u2/eqs.json',JSON.stringify(EQS));console.log('ok',EQS.length)});
