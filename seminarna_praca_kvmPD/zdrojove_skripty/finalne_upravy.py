import re, json, sys, os, shutil, zipfile
from xml.sax.saxutils import escape
pages=json.load(open('pages.json')) if os.path.exists('pages.json') else {}
u=open('x/word/document.xml',encoding='utf8').read()
P=re.compile(r'<w:p[ >](?:(?!</w:p>).)*?</w:p>|<w:p(?: [^>]*)?/>',re.S)
def txt(x): return ''.join(re.findall(r'<w:t[^>]*>([^<]*)</w:t>',x))
def find(pred,after=0):
    for mm in P.finditer(u,after):
        if pred(txt(mm.group(0)),mm.group(0)): return mm
    raise Exception('nf')
def first_rpr(x):
    m=re.search(r'<w:r(?: [^>]*)?>(<w:rPr>.*?</w:rPr>)?',x,re.S); return (m.group(1) or '') if m else ''
def ppr(x):
    m=re.search(r'<w:pPr>.*?</w:pPr>',x,re.S); return m.group(0) if m else ''
def run(t,rpr=''): return f'<w:r>{rpr}<w:t xml:space="preserve">{escape(t)}</w:t></w:r>'
def set_text(pred,new,keep_rpr=True):
    global u
    mm=find(pred); x=mm.group(0)
    rpr=first_rpr(x) if keep_rpr else ''
    rpr=re.sub(r'<w:b/>|<w:bCs/>','',rpr) if 'Nadpis' not in x else rpr
    u=u[:mm.start()]+'<w:p>'+ppr(x)+run(new,rpr)+'</w:p>'+u[mm.end():]
def starts(s): return lambda t,x: t.replace('\xa0',' ').startswith(s)
def replace_text(pred,old,new):
    mm=find(pred); t=txt(mm.group(0)); tn=t.replace('\xa0',' ')
    if old not in t and old in tn: t=tn
    assert old in t,(old,t[:60]); set_text(pred,t.replace(old,new))
def insert_after(pred,xml):
    global u
    mm=find(pred); u=u[:mm.end()]+xml+u[mm.end():]
def insert_before(pred,xml):
    global u
    mm=find(pred); u=u[:mm.start()]+xml+u[mm.start():]
def delete(pred):
    global u
    mm=find(pred); u=u[:mm.start()]+u[mm.end():]

# ---------- 1. title page
set_text(lambda t,x:t.replace(' ','')=='Kvantitatívnemetódy' or t=='Kvantitativní metody','Kvantitatívne metódy (kvmPD)')
mm=find(starts('Peter Olej'))
# remove 5 empty paragraphs before name to keep the title page on one page
pre=u[:mm.start()]; k=0
for _ in range(5):
    e=re.search(r'(<w:p(?: [^>]*)?/>)\s*$',pre)
    if not e: break
    pre=pre[:e.start()]; k+=1
tab='<w:tabs><w:tab w:val="left" w:pos="2835"/></w:tabs>'
info=[('Vypracoval:','Peter Olejár'),('ID študenta:','270861'),('Predmet:','Kvantitatívne metódy (kvmPD)'),('Garant predmetu:','doc. Ing. Radek Doskočil, Ph.D., MSc'),('Cvičiaca:','Ing. Monika Šebestová, Ph.D.'),('Akademický rok:','2026/2027')]
blk=''
for i,(a,b) in enumerate(info):
    br='<w:r><w:br w:type="page"/></w:r>' if i==len(info)-1 else ''
    blk+=f'<w:p><w:pPr>{tab}<w:spacing w:after="60"/></w:pPr>{run(a)}<w:r><w:tab/></w:r>{run(b)}{br}</w:p>'
u=pre+blk+u[mm.end():]

# ---------- 2. headings
set_text(starts('2  Úkol 1'),'2  Úloha 1: Lineárne programovanie – Optimalizácia prevádzky dátového centra')
set_text(starts('Definice prom'),'Definícia premenných')
set_text(starts('Omezující podm'),'Obmedzujúce podmienky')
set_text(lambda t,x:t.startswith('Účelová funkce'),'Účelová funkcia')
set_text(starts('Podmínky nezáp'),'Podmienky nezápornosti a celočíselnosti')
set_text(starts('3  Úkol 2'),'3  Úloha 2: Sieťová analýza – Investičný proces a rekonštrukcia bytu na prenájom')
set_text(starts('3.4  Časová analýza'),'3.4  Časová analýza metódou PERT')
set_text(starts('3.5  Pravdepodobnosť'),'3.5  Pravdepodobnosť dodržania plánovaných termínov')
set_text(starts('3.6  Plánovaný termín'),'3.6  Plánovaný termín realizácie projektu')
set_text(starts('3.7  Pravdepodobnosť'),'3.7  Pravdepodobnosť kritickosti uzlov a činností pomocou incidenčnej matice')
set_text(starts('3.8  Manažerská'),'3.8  Manažérska interpretácia výsledkov')
set_text(starts('5  Seznam'),'5  Zoznam použitej literatúry')
u=u.replace('<w:pPr><w:pStyle w:val="Nadpis1"/></w:pPr>'+run('5  Zoznam použitej literatúry'),'<w:pPr><w:pStyle w:val="Nadpis1"/><w:pageBreakBefore/></w:pPr>'+run('5  Zoznam použitej literatúry'))
assert 'pageBreakBefore' in u
delete(lambda t,x: t.strip()=='' and 'Nadpis2' in x)

# ---------- 3. text fixes
replace_text(starts('Štrukturálne premenné x'),'jednotek','jednotiek')
replace_text(starts('Nastavenie doplnku Riešiteľ'),'Riešiteľ :','Riešiteľ:')
u=re.sub(r'(<w:t[^>]*>)kapacita(</w:t>)',r'\1Kapacita\2',u)
replace_text(starts('Výsledky sú zapísané v sieťovom grafe'),'(Obrázok 2)','(Obrázok 1)')
replace_text(starts('Obrázok 2:'),'Obrázok 2:','Obrázok 1:')
set_text(starts('Určte pravdepodobnosť, že sa doba'),'Určte pravdepodobnosť dodržania zvolených plánovaných termínov vrátane skrátenia doby realizácie projektu o 10 dní.')
set_text(starts('Určte, aký bude plánovaný termín'),'Určte plánovaný termín realizácie projektu pri 10 % riziku oneskorenia a plánovaný termín s odporúčanou pravdepodobnosťou dodržania.')
# citations
def cite(prefix,old,new): replace_text(starts(prefix),old,new)
cite('Spoločnosť prevádzkuje','voči klientom.','voči klientom [1, 8].')
cite('Model obsahuje 6 premenných','lineárneho programovania.','lineárneho programovania [5].')
cite('Metóda riešenia: Simplex LP','celočíselné riešenie.','celočíselné riešenie [8].')
cite('Citlivostná analýza z Riešiteľa','zmenili podmienky.','zmenili podmienky [4].')
cite('Investor plánuje','beta rozdelenie.','beta rozdelenie [2, 3].')
cite('Hranovo-hranová matica (12','metódou preškrtávania hrán.','metódou preškrtávania hrán [6].')
cite('Doba realizácie projektu má približne','normálneho rozdelenia:','normálneho rozdelenia [1]:')
cite('Incidenčná matica je štvorcová','Postup výpočtu:','Postup výpočtu [7]:')
# 3.8 first bullet
set_text(starts('Realistický termín'),'Realistický termín: stredná doba realizácie projektu je 128 dní (približne 18 týždňov, 4,2 mesiaca). Skrátenie o 10 dní je pravdepodobné len na 3,17 %, preto by investor nemal plánovať kratší termín. Ako plánovaný termín s odporúčanou pravdepodobnosťou dodržania je vhodných 129 dní (pravdepodobnosť 0,57). Ako bezpečný zmluvný termín voči budúcemu nájomcovi a pri plánovaní splátok úveru odporúčame 135 dní, ktorý pripúšťa iba 10 % riziko oneskorenia.')
# conclusion
set_text(starts('V Úlohe 1 bol'),'V Úlohe 1 bol zostavený ekonomický a matematický model optimalizácie prevádzky dátového centra so 6 celočíselnými premennými, 5 štrukturálnymi obmedzeniami a dolnými medzami vyplývajúcimi zo SLA. Riešením v MS Excel (Riešiteľ, Simplex LP s celočíselnými podmienkami) bolo nájdené jednoznačné optimum: 50 webových serverov, 76 AI GPU serverov, 25 PoS validátorov a 15 databázových serverov s maximálnym denným ziskom 4 130 €. Analýza ukázala, že kritickým (limitujúcim) zdrojom je dátová linka (100 % využitie) a že ekologická regulácia je takmer presne naplnená, zatiaľ čo energia, chladenie a priestor majú voľné kapacity. Pre manažment z toho vyplýva jasné odporúčanie: orientovať sa na AI výpočty, opustiť ťažbu kryptomien a investovať do zvýšenia priepustnosti linky, ktorej tieňová cena je približne 0,427 €/Mbps za deň.')
set_text(starts('V Úlohe 2 bol'),'V Úlohe 2 bol metódou PERT analyzovaný investičný projekt nákupu a rekonštrukcie bytu na prenájom s 12 činnosťami. Pomocou hranovo-hranovej matice bol zostavený sieťový graf s jednou fiktívnou činnosťou X0 a metódou preškrtávania hrán boli činnosti rozdelené do 9 rádov a očíslovaných 11 uzlov. Časová analýza určila kritickú cestu A – D – E – F – G – H – J – K – L so strednou dobou trvania 128 dní a rozptylom 29. Pravdepodobnosť skrátenia realizácie o 10 dní je len 3,17 %. Plánovaný termín s odporúčanou pravdepodobnosťou dodržania je 129 dní a pri 10 % riziku oneskorenia 135 dní. Pomocou incidenčnej matice bola určená pravdepodobnosť kritickosti uzlov a činností – nekritický uzol 3 a činnosti C a X0 sa stanú kritickými s pravdepodobnosťou približne 7 %.')
mm=find(starts('V Úlohe 2 bol')); body_ppr=ppr(mm.group(0))
insert_after(starts('V Úlohe 2 bol'),'<w:p>'+body_ppr+run('Pri vypracovaní seminárnej práce bol využitý nástroj umelej inteligencie (jazykový model Claude), a to najmä pri overovaní správnosti vypočítaných výsledkov a pri kontrole matematických postupov a vzorcov. Všetky výsledky boli následne skontrolované a interpretované autorom práce.')+'</w:p>')
# global wording
u=u.replace('kritičnosti','kritickosti').replace('kritičnosť','kritickosť')

# ---------- 4. renumber tables 11-13 -> 13-15
for a,b in [('Tabuľka 13: Kritickosť nekritických','Tabuľka 15: Kritickosť nekritických'),('Tabuľka 12: Kritickosť uzlov','Tabuľka 14: Kritickosť uzlov'),('Tabuľka 11: Incidenčná','Tabuľka 13: Incidenčná')]:
    replace_text(starts(a[:12]) if False else (lambda t,x,a=a: t.startswith(a)),a,b)

# ---------- 5. new tables
mm=find(starts('Tabuľka 10:')); cap_ppr=ppr(mm.group(0)); cap_rpr=first_rpr(mm.group(0))
i=u.index('<w:tbl>',mm.end()); tblx=u[i:u.index('</w:tbl>',i)+8]
tblPr=re.search(r'<w:tblPr>.*?</w:tblPr>',tblx,re.S).group(0)
tcs=re.findall(r'<w:tc>.*?</w:tc>',tblx,re.S)
hdr_tc=tcs[0]; body_tc=[c for c in tcs if 'D9D9D9' not in c][0]
def cell(tc,text,w,center=True):
    t=re.sub(r'<w:tcW w:w="\d+"',f'<w:tcW w:w="{w}"',tc,1)
    p=re.search(r'<w:p[ >].*?</w:p>',t,re.S).group(0)
    rpr=re.sub(r'<w:b/>|<w:bCs/>','',first_rpr(p))
    jc='<w:jc w:val="center"/>' if center else ''
    newp=f'<w:p><w:pPr><w:keepNext/>{jc}</w:pPr>{run(text,rpr)}</w:p>'
    return t.replace(p,newp)
def table(rows,widths):
    g=''.join(f'<w:gridCol w:w="{w}"/>' for w in widths)
    out=f'<w:tbl>{tblPr}<w:tblGrid>{g}</w:tblGrid>'
    for ri,r in enumerate(rows):
        hdr=ri==0
        out+='<w:tr><w:trPr><w:cantSplit/>'+('<w:tblHeader/>' if hdr else '')+'</w:trPr>'
        for ci,c in enumerate(r): out+=cell(hdr_tc if (hdr or ci==0) and hdr else (hdr_tc if False else body_tc) if not hdr else hdr_tc,c,widths[ci],center=ci>0)
        out+='</w:tr>'
    return out+'</w:tbl>'
def tcells(widths): return widths
mm=find(starts('Pravdepodobnosť, že sa doba realizácie projektu skráti')); bp=ppr(mm.group(0)); brpr=first_rpr(mm.group(0))
def para(t): return '<w:p>'+bp+run(t,brpr)+'</w:p>'
def para2(t):
    p2=re.sub(r'<w:spacing [^>]*/>','',bp).replace('<w:pPr>','<w:pPr><w:spacing w:before="160" w:after="120"/>',1)
    return '<w:p>'+p2+run(t,brpr)+'</w:p>'
def cap(t): return '<w:p>'+cap_ppr+run(t,cap_rpr)+'</w:p>'
W=9070
cols=[1630]+[1063]*7; cols[-1]=W-sum(cols[:-1])
t11=table([['Tₚ [dni]','118','120','124','128','132','136','140'],['u','−1,86','−1,49','−0,74','0,00','0,74','1,49','2,23'],['F(u)','0,03','0,07','0,23','0,50','0,77','0,93','0,99']],cols)
blk=para('Okrem skrátenia o 10 dní bola posúdená aj pravdepodobnosť dodržania ďalších plánovaných termínov. Výsledky sú uvedené v Tabuľke 11.')+cap('Tabuľka 11: Pravdepodobnosť dodržania vybraných plánovaných termínov')+t11+para2('Termíny kratšie ako 124 dní majú pravdepodobnosť dodržania nižšiu ako 25 % a sú pre investora príliš rizikové. Naopak termíny nad 136 dní sú dodržateľné takmer s istotou, ale zbytočne predlžujú dobu, počas ktorej byt neprináša nájomné.')
insert_after(starts('Pravdepodobnosť, že sa doba realizácie projektu skráti'),blk)
cols=[1630]+[1488]*5; cols[-1]=W-sum(cols[:-1])
t12=table([['Tₚ [dni]','124','125','128','129','130'],['u','−0,74','−0,56','0,00','0,19','0,37'],['F(u)','0,23','0,29','0,50','0,57','0,64']],cols)
blk=para('Podľa odporúčaných hodnôt by sa pravdepodobnosť dodržania plánovaného termínu mala pohybovať v intervale 0,25 až 0,60. Pri nižšej pravdepodobnosti hrozí vysoké riziko oneskorenia, pri vyššej sa zbytočne viažu rezervy času a zdrojov. Tomuto intervalu zodpovedajú termíny od 125 do 129 dní (Tabuľka 12).')+cap('Tabuľka 12: Plánované termíny v odporúčanom intervale pravdepodobnosti')+t12+para2('Ako postačujúci plánovaný termín s odporúčanou pravdepodobnosťou preto stanovujeme 129 dní, ktorý bude dodržaný s pravdepodobnosťou 0,57. Termín 135 dní pri 10 % riziku oneskorenia je vhodný ako bezpečný zmluvný termín voči nájomcovi.')
insert_after(starts('Pri 10 % riziku oneskorenia je plánovaný termín realizácie projektu 135'),blk)

# ---------- 6. double spaces in body text (not headings)
def dsp(mm):
    x=mm.group(0)
    if 'Nadpis' in x: return x
    return re.sub(r'(<w:t[^>]*>)([^<]*)(</w:t>)',lambda m:m.group(1)+re.sub(r'(?<=\S)  +(?=\S)',' ',m.group(2))+m.group(3),x)
u=P.sub(dsp,u)
# runs ending with space followed by run starting with space
u=re.sub(r'(<w:t xml:space="preserve">[^<]*\S) (</w:t></w:r><w:r(?: [^>]*)?>(?:<w:rPr>(?:(?!</w:rPr>).)*</w:rPr>)?<w:t xml:space="preserve">) ',r'\1 \2',u)

# ---------- 7. equation decimals: merge "d" "," "d" runs into one normal-text run
mr=r'<m:r>(?:<m:rPr>(?:(?!</m:rPr>).)*</m:rPr>)?(?:<w:rPr>(?:(?!</w:rPr>).)*</w:rPr>)?<m:t(?: [^>]*)?>%s</m:t></m:r>'
pat=re.compile(mr%r'(-?\d+)'+mr%','+mr%r'(\d+)',re.S)
u,ndec=pat.subn(lambda m:f'<m:r><m:rPr><m:nor/></m:rPr><w:rPr><w:rFonts w:ascii="Cambria Math" w:hAnsi="Cambria Math"/></w:rPr><m:t>{m.group(1)},{m.group(2)}</m:t></m:r>',u)


# ---------- remove empty paragraphs before literature heading
mm=find(lambda t,x: t.replace('\xa0',' ').startswith('5  Zoznam') and 'Nadpis1' in x)
pre=u[:mm.start()]
while True:
    e=re.search(r'(<w:p(?: [^>]*)?>(?:<w:pPr>(?:(?!</w:pPr>).)*</w:pPr>)?</w:p>|<w:p(?: [^>]*)?/>)$',pre,re.S)
    if not e: break
    pre=pre[:e.start()]
u=pre+u[mm.start():]

# ---------- 8. table of contents
heads=[]
for mm in P.finditer(u):
    x=mm.group(0); st=re.search(r'<w:pStyle w:val="(Nadpis[12])"',x)
    if st and txt(x).strip(): heads.append((st.group(1),txt(x).strip()))
def tocline(lvl,t,pg,first=False,last=False):
    ind='<w:ind w:left="0"/>' if lvl=='Nadpis1' else '<w:ind w:left="440"/>'
    sp='<w:spacing w:before="120" w:after="60"/>' if lvl=='Nadpis1' else '<w:spacing w:after="40"/>'
    pre=''
    if first: pre='<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\o "1-2" \\h \\z \\u </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r>'
    post='<w:r><w:fldChar w:fldCharType="end"/></w:r>' if last else ''
    return f'<w:p><w:pPr><w:tabs><w:tab w:val="right" w:leader="dot" w:pos="9060"/></w:tabs>{sp}{ind}</w:pPr>{pre}{run(t)}<w:r><w:tab/></w:r>{run(str(pages.get(t,0)))}{post}</w:p>'
toc='<w:p><w:pPr><w:keepNext/><w:spacing w:before="0" w:after="240"/></w:pPr><w:r><w:rPr><w:b/><w:bCs/><w:sz w:val="30"/><w:szCs w:val="30"/></w:rPr><w:t>Obsah</w:t></w:r></w:p>'
for k,(lvl,t) in enumerate(heads): toc+=tocline(lvl,t,0,first=k==0,last=k==len(heads)-1)
toc+='<w:p><w:r><w:br w:type="page"/></w:r></w:p>'
insert_before(lambda t,x:t.strip()=='1  Úvod' and 'Nadpis1' in x,toc)
json.dump([t for _,t in heads],open('heads.json','w'),ensure_ascii=False)
open('y/word/document.xml','w',encoding='utf8').write(u)
print('ok decimals merged',ndec,'removed empty',k, 'heads',len(heads))
