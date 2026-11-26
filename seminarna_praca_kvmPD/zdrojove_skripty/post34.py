import json,subprocess,zipfile,re,sys,shutil
eqs=json.load(open('eqs34.json'))
md='\n\n'.join('$$'+e+'$$' for e in eqs)
open('eqs34.md','w').write(md)
subprocess.run(['pandoc','eqs34.md','-o','eqs34.docx'],check=True)
x=zipfile.ZipFile('eqs34.docx').read('word/document.xml').decode()
om=re.findall(r'<m:oMathPara>.*?</m:oMathPara>',x,re.S)
assert len(om)==len(eqs),(len(om),len(eqs))
# set font size via rPr? keep default
zin=zipfile.ZipFile('raw34.docx'); zout=zipfile.ZipFile('Sekcia_3_4_sietovy_graf.docx','w',zipfile.ZIP_DEFLATED)
for it in zin.infolist():
    data=zin.read(it.filename)
    if it.filename=='word/document.xml':
        d=data.decode()
        def rep(m):
            k=int(m.group(2)); ppr=m.group(1)
            return '<w:p>'+ppr+om[k]+'</w:p>'
        d,n=re.subn(r'<w:p>(<w:pPr>(?:(?!</w:pPr>).)*</w:pPr>)<w:r>(?:(?!</w:r>).)*?<w:t[^>]*>§EQ(\d+)§</w:t></w:r></w:p>',rep,d,flags=re.S)
        assert n==len(eqs),(n,len(eqs))
        data=d.encode()
    if not it.filename.endswith('/'): zout.writestr(it,data)
zout.close(); print('replaced',n)
