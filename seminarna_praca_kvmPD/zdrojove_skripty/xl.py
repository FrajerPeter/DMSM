from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.workbook.defined_name import DefinedName
wb=Workbook(); ws=wb.active; ws.title='Ukol1_LP'
B=Font(bold=True); H=PatternFill('solid',fgColor='D9D9D9'); HF=Font(bold=True,color='000000')
Y=PatternFill('solid',fgColor='F2F2F2'); G=PatternFill('solid',fgColor='E7E6E6'); thin=Side(style='thin',color='999999')
def box(c): c.border=Border(left=thin,right=thin,top=thin,bottom=thin)
ws['A1']='Úkol 1 – Optimalizace provozu datového centra (lineární programování)'; ws['A1'].font=Font(bold=True,size=14)
hdr=['Ukazatel','x1','x2','x3','x4','x5','x6','Levá strana','Relace','Pravá strana','Rezerva / přebytek']
for j,h in enumerate(hdr): c=ws.cell(3,1+j,h); c.fill=H; c.font=HF; c.alignment=Alignment(horizontal='center',wrap_text=True); box(c)
ops=['Typ operace','Těžba BTC (ASIC)','Těžba altcoinů (GPU)','Cloud hosting','Trénování AI','PoS validátory','Databázové servery']
for j,o in enumerate(ops): c=ws.cell(4,1+j,o); c.font=Font(italic=True); c.alignment=Alignment(wrap_text=True,horizontal='center'); box(c)
ws['A5']='Počet jednotek (měněné buňky)'
for j,v in enumerate([0,0,50,76,25,15]): c=ws.cell(5,2+j,v); c.fill=Y; c.font=B; box(c)
ws['A6']='Zisk [€/den/ks]'
for j,v in enumerate([15,12,20,35,8,18]): box(ws.cell(6,2+j,v))
ws['H6']='=SUMPRODUCT($B$5:$G$5,B6:G6)'; ws['H6'].fill=G; ws['H6'].font=B; ws['I6']='→ max'; ws['J6']='Účelová funkce Z'
rows=[('Elektrická síť [kWh]',[30,25,10,40,5,15],'<=',12000),('Chladicí výkon [kW]',[10,8,2,12,1,3],'<=',3000),
('Prostor v racích [U]',[2,4,1,4,1,2],'<=',600),('Datová propustnost [Mbps]',[5,10,100,50,200,80],'<=',15000),
('Ekologická regulace (podíl PoS ≥ 15 %)',[-0.15,-0.15,-0.15,-0.15,0.85,-0.15],'>=',0)]
ws['A7']='Omezující podmínky'; ws['A7'].font=B
for i,(n,co,rel,rhs) in enumerate(rows):
    r=8+i; ws.cell(r,1,n)
    for j,v in enumerate(co): box(ws.cell(r,2+j,v))
    ws.cell(r,8,f'=SUMPRODUCT($B$5:$G$5,B{r}:G{r})').fill=G; ws.cell(r,9,rel); ws.cell(r,10,rhs)
    ws.cell(r,11,f'=J{r}-H{r}' if rel=='<=' else f'=H{r}-J{r}')
ws['A14']='Dolní meze (SLA)'
for j,v in enumerate([0,0,50,20,0,15]): box(ws.cell(14,2+j,v))
ws['A15']='Horní meze'; 
for j in range(6): ws.cell(15,2+j,'—')
ws['A17']='Nastavení Řešitele:'; ws['A17'].font=B
notes=['Cíl: $H$6 – Max','Měněné buňky: $B$5:$G$5','Omezení: $H$8:$H$11 <= $J$8:$J$11; $H$12 >= $J$12; $B$5:$G$5 >= $B$14:$G$14; $B$5:$G$5 = celé číslo',
'Zaškrtnout: Nastavit neomezené proměnné jako nezáporné; Metoda řešení: Simplex LP']
for i,t in enumerate(notes): ws.cell(18+i,1,t)
ws.column_dimensions['A'].width=40
for col in 'BCDEFG': ws.column_dimensions[col].width=13
ws.column_dimensions['H'].width=14; ws.column_dimensions['J'].width=13; ws.column_dimensions['K'].width=18
ws.row_dimensions[4].height=32
sn="'Ukol1_LP'!"
dn={'solver_opt':f"{sn}$H$6",'solver_typ':'1','solver_adj':f"{sn}$B$5:$G$5",'solver_num':'4',
'solver_lhs1':f"{sn}$H$8:$H$11",'solver_rel1':'1','solver_rhs1':f"{sn}$J$8:$J$11",
'solver_lhs2':f"{sn}$H$12",'solver_rel2':'3','solver_rhs2':f"{sn}$J$12",
'solver_lhs3':f"{sn}$B$5:$G$5",'solver_rel3':'3','solver_rhs3':f"{sn}$B$14:$G$14",
'solver_lhs4':f"{sn}$B$5:$G$5",'solver_rel4':'4','solver_rhs4':'"integer"',
'solver_eng':'2','solver_neg':'1','solver_ver':'3','solver_val':'0','solver_est':'1','solver_lin':'1','solver_int':'0','solver_pre':'0.000001','solver_tol':'0','solver_msl':'2','solver_scl':'1'}
for k,v in dn.items():
    d=DefinedName(k,attr_text=v); d.hidden=True; ws.defined_names[k]=d

# ---- PERT ----
p=wb.create_sheet('Ukol2_PERT')
acts=[('A','Průzkum trhu a prohlídky nemovitostí','-',2,3,4),('B','Finanční příprava a předschválení úvěru','-',1,2,3),
('C','Právní audit, podpis smluv a katastr','A, B',3,4,5),('D','Zaměření a architektonický návrh','A',1,2,3),
('E','Vyřízení ohlášky/povolení na úřadech','D',2,3,4),('F','Bourací práce a odvoz suti','C, E',1,1,2),
('G','Hrubé instalace – voda, elektro','F',1,2,3),('H','Zednické práce, obklady a sanita','G',2,2,4),
('I','Objednávka a výroba nábytku na míru','D',3,4,6),('J','Malířské práce a pokládka podlah','H',1,2,3),
('K','Kompletace a montáž nábytku','I, J',1,2,3),('L','Finální úklid, homestaging a inzerce','K',1,1,2)]
p['A1']='Úkol 2 – PERT: Nákup a rekonstrukce bytu k pronájmu'; p['A1'].font=Font(bold=True,size=14)
hd=['Činnost','Popis','Předchůdci','a','m','b','t_e','σ²','ES','EF','LS','LF','Rc','Kritická']
for j,h in enumerate(hd): c=p.cell(3,1+j,h); c.fill=H; c.font=HF; c.alignment=Alignment(horizontal='center'); box(c)
row={a[0]:4+i for i,a in enumerate(acts)}
pred={a[0]:[x.strip() for x in a[2].split(',')] if a[2]!='-' else [] for a in acts}
succ={k:[s for s in pred if k in pred[s]] for k in pred}
for i,(k,d,pr,a,m,b) in enumerate(acts):
    r=4+i
    for j,v in enumerate([k,d,pr,a,m,b]): box(p.cell(r,1+j,v))
    p.cell(r,7,f'=(D{r}+4*E{r}+F{r})/6'); p.cell(r,8,f'=((F{r}-D{r})/6)^2')
    p.cell(r,9,'=0' if not pred[k] else '=MAX('+','.join(f'J{row[q]}' for q in pred[k])+')')
    p.cell(r,10,f'=I{r}+G{r}')
    p.cell(r,12,'=$C$18' if not succ[k] else '=MIN('+','.join(f'K{row[q]}' for q in succ[k])+')')
    p.cell(r,11,f'=L{r}-G{r}'); p.cell(r,13,f'=ROUND(K{r}-I{r},6)'); p.cell(r,14,f'=IF(M{r}=0,"ANO","ne")')
    for j in range(7,15): box(p.cell(r,j)); p.cell(r,j).number_format='0.000'
p.column_dimensions['B'].width=42
lab=[('Očekávaná doba projektu T [týdny]','=MAX(J4:J15)'),('Rozptyl kritické cesty σ²','=SUMIF(N4:N15,"ANO",H4:H15)'),('Směrodatná odchylka σ','=SQRT(C19)'),
('Plánovaný termín T1 [týdny]',17),('Z1','=(C21-C18)/C20'),('P(T ≤ T1)','=_xlfn.NORM.S.DIST(C22,TRUE)'),
('Plánovaný termín T2 [týdny]',20),('Z2','=(C24-C18)/C20'),('P(T ≤ T2)','=_xlfn.NORM.S.DIST(C25,TRUE)'),
('Požadovaná pravděpodobnost',0.95),('Z_p','=_xlfn.NORM.S.INV(C27)'),('Termín pro požadovanou pravděpodobnost','=C18+C28*C20'),
('Požadovaná pravděpodobnost',0.90),('Z_p','=_xlfn.NORM.S.INV(C30)'),('Termín pro požadovanou pravděpodobnost','=C18+C31*C20')]
for i,(l,f) in enumerate(lab):
    p.cell(18+i,1,l).font=B; p.merge_cells(start_row=18+i,start_column=1,end_row=18+i,end_column=2); c=p.cell(18+i,3,f); c.fill=G; c.number_format='0.0000'
wb.save('Kvantitativni_metody_vypocty.xlsx')
