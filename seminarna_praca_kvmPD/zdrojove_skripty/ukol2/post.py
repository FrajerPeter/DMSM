import json,subprocess,zipfile,re,sys,shutil
eqs=json.load(open('u2/eqs.json'))
md='\n\n'.join('$$'+e+'$$' for e in eqs)
open('u2/eqs.md','w').write(md)
subprocess.run(['pandoc','u2/eqs.md','-o','u2/eqs.docx'],check=True)
x=zipfile.ZipFile('u2/eqs.docx').read('word/document.xml').decode()
om=re.findall(r'<m:oMathPara>.*?</m:oMathPara>',x,re.S)
assert len(om)==len(eqs),(len(om),len(eqs))
# set font size via rPr? keep default
zin=zipfile.ZipFile('u2/raw.docx'); zout=zipfile.ZipFile('u2/Ukol2_PERT_cele_cisla.docx','w',zipfile.ZIP_DEFLATED)
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
