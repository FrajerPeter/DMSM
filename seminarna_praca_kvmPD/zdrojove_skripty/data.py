import json, math, numpy as np
from fractions import Fraction as F
from scipy.stats import norm
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyArrowPatch
plt.rcParams['font.family']='DejaVu Sans'
# ---------- PERT AOA ----------
acts={'A':([],2,3,4),'B':([],1,2,3),'C':(['A','B'],3,4,5),'D':(['A'],1,2,3),'E':(['D'],2,3,4),
'F':(['C','E'],1,1,2),'G':(['F'],1,2,3),'H':(['G'],2,2,4),'I':(['D'],3,4,6),'J':(['H'],1,2,3),
'K':(['I','J'],1,2,3),'L':(['K'],1,1,2)}
te={k:F(a+4*m+b,6) for k,(p,a,m,b) in acts.items()}
var={k:F(b-a,6)**2 for k,(p,a,m,b) in acts.items()}
edges=[('A',1,2),('B',1,3),('Fikt',2,3),('C',3,5),('D',2,4),('E',4,5),('F',5,6),('G',6,7),('H',7,8),('I',4,9),('J',8,9),('K',9,10),('L',10,11)]
dur={e[0]:(te.get(e[0],F(0))) for e in edges}
vv={e[0]:(var.get(e[0],F(0))) for e in edges}
N=11
# incidence matrix
names=[e[0] for e in edges]
Inc=[[0]*len(edges) for _ in range(N)]
for j,(n,i,k) in enumerate(edges): Inc[i-1][j]=-1; Inc[k-1][j]=1
# forward via incidence
t0=[F(0)]*N; s0=[F(0)]*N
for r in range(N):
    inc=[j for j in range(len(edges)) if Inc[r][j]==1]
    best=None
    for j in inc:
        i=[q for q in range(N) if Inc[q][j]==-1][0]
        val=t0[i]+dur[names[j]]
        if best is None or val>best[0] or (val==best[0] and s0[i]+vv[names[j]]>best[1]): best=(val,s0[i]+vv[names[j]])
    if best: t0[r],s0[r]=best
T=t0[-1]; t1=[T]*N
for r in reversed(range(N)):
    out=[j for j in range(len(edges)) if Inc[r][j]==-1]
    if out: t1[r]=min(t1[[q for q in range(N) if Inc[q][j]==1][0]]-dur[names[j]] for j in out)
print('T',T,[str(x) for x in t0],[str(x) for x in t1],[str(x) for x in s0])
nodeP=[]
for r in range(N):
    if s0[r]==0: p=1.0
    else: p=norm.cdf(float(t1[r]-t0[r])/math.sqrt(float(s0[r])))
    nodeP.append(p)
print('nodeP',nodeP)
edgeinfo=[]
for (n,i,k) in edges:
    ES=t0[i-1]; EF=ES+dur[n]; LF=t1[k-1]; LS=LF-dur[n]; Rc=LS-ES; Rv=t0[k-1]-EF
    edgeinfo.append(dict(n=n,i=i,j=k,te=float(dur[n]),ES=float(ES),EF=float(EF),LS=float(LS),LF=float(LF),Rc=float(Rc),Rv=float(Rv),crit=(Rc==0)))
crit=[e['n'] for e in edgeinfo if e['crit'] and e['n']!='Fikt']
V=sum(var[c] for c in crit); sd=math.sqrt(float(V))
print('crit',crit,V,sd)
# monte carlo beta-pert
rng=np.random.default_rng(2026); M=200000
samp={}
for k,(p,a,m,b) in acts.items():
    al=1+4*(m-a)/(b-a); be=1+4*(b-m)/(b-a)
    samp[k]=a+(b-a)*rng.beta(al,be,M)
EFs={}
for k in ['A','B','C','D','E','I','F','G','H','J','K','L']:
    st=np.zeros(M)
    for p in acts[k][0]: st=np.maximum(st,EFs[p])
    EFs[k]=st+samp[k]
Tmc=EFs['L']
mc=dict(mean=float(Tmc.mean()),sd=float(Tmc.std()),p17=float((Tmc<=17).mean()),p20=float((Tmc<=20).mean()),q95=float(np.quantile(Tmc,.95)),q90=float(np.quantile(Tmc,.9)))
print('MC',mc)
probs={str(d):dict(z=(d-float(T))/sd,p=norm.cdf((d-float(T))/sd)) for d in [17,18,19,20,21]}
quant={str(p):dict(z=norm.ppf(p),T=float(T)+norm.ppf(p)*sd) for p in [0.9,0.95,0.99]}
print(probs,quant)
# ---------- LP ----------
lp=dict(x=[0,0,50,76,25,15],Z=4130,cont=[0,0,50,76.2758621,24.9310345,15],Zc=4139.103448,
 dual=dict(net=0.4268966,eco=-91.034483),rc=[-0.78966,-5.92414,-36.34483,0,0,-29.80690])
json.dump(dict(acts={k:dict(p=v[0],a=v[1],m=v[2],b=v[3],te=float(te[k]),var=float(var[k]),te_s=str(te[k]),var_s=str(var[k])) for k,v in acts.items()},
  edges=edgeinfo,inc=Inc,names=names,t0=[float(x) for x in t0],t1=[float(x) for x in t1],s0=[float(x) for x in s0],s0s=[str(x) for x in s0],nodeP=nodeP,
  T=float(T),Ts=str(T),V=float(V),Vs=str(V),sd=sd,crit=crit,probs=probs,quant=quant,mc=mc,lp=lp),open('data.json','w'),indent=1,ensure_ascii=False)

# ---------- network graph ----------
pos={1:(0,1),2:(1.6,2),3:(3.2,0),4:(3.2,2),5:(4.8,1),6:(6.2,1),7:(7.6,1),8:(9.0,1),9:(10.4,1),10:(11.8,1),11:(13.2,1)}
fig,ax=plt.subplots(figsize=(15,4.6),dpi=200); R=0.42
def fmt(x): return f"{x:.2f}".replace('.',',')
for (n,i,k) in edges:
    e=[q for q in edgeinfo if q['n']==n][0]
    col='#C0392B' if e['crit'] else '#34495E'; lw=2.6 if e['crit'] else 1.4; ls='--' if n=='Fikt' else '-'
    rad=-0.35 if n=='I' else 0
    a=FancyArrowPatch(pos[i],pos[k],connectionstyle=f'arc3,rad={rad}',arrowstyle='-|>',mutation_scale=16,color=col,lw=lw,linestyle=ls,shrinkA=R*72*0.95,shrinkB=R*72*0.95)
    ax.add_patch(a)
    x=(pos[i][0]+pos[k][0])/2; y=(pos[i][1]+pos[k][1])/2
    if n=='I': x,y=6.6,2.72
    lab='fiktívna\n(0)' if n=='Fikt' else f"{n} ({fmt(e['te'])})"
    dy=0.22 if n not in('B','C','Fikt') else 0
    dx=0.45 if n=='Fikt' else 0
    ax.text(x+dx,y+dy,lab,ha='center',va='bottom' if dy else 'center',fontsize=9.5,color=col,fontweight='bold' if e['crit'] else 'normal',
            bbox=dict(fc='white',ec='none',pad=0.5))
for nd,(x,y) in pos.items():
    c=t0[nd-1]==t1[nd-1]
    ax.add_patch(Circle((x,y),R,fc='#FDEDEC' if c else 'white',ec='#C0392B' if c else '#34495E',lw=2))
    ax.plot([x-R,x+R],[y,y],color='#34495E',lw=0.8); ax.plot([x,x],[y-R,y],color='#34495E',lw=0.8)
    ax.text(x,y+R*0.45,str(nd),ha='center',va='center',fontsize=11,fontweight='bold')
    ax.text(x-R*0.47,y-R*0.45,fmt(float(t0[nd-1])),ha='center',va='center',fontsize=7.5)
    ax.text(x+R*0.47,y-R*0.45,fmt(float(t1[nd-1])),ha='center',va='center',fontsize=7.5)
ax.set_xlim(-0.6,13.8); ax.set_ylim(-0.6,3.3); ax.set_aspect('equal'); ax.axis('off')
plt.tight_layout(); plt.savefig('graf_siet.png',bbox_inches='tight'); plt.close()

# normal distribution chart
mu=float(T); xs=np.linspace(mu-4*sd,mu+4*sd,400)
fig,ax=plt.subplots(figsize=(8,3.4),dpi=200)
ax.plot(xs,norm.pdf(xs,mu,sd),color='#2C3E50',lw=2)
ax.fill_between(xs[xs<=20],norm.pdf(xs[xs<=20],mu,sd),color='#5DADE2',alpha=.35,label='P(T ≤ 20) = 92,79 %')
ax.fill_between(xs[xs<=17],norm.pdf(xs[xs<=17],mu,sd),color='#C0392B',alpha=.7,label='P(T ≤ 17) = 3,39 %')
for v,l in [(mu,'μ = 18,67'),(17,'17'),(20,'20'),(quant['0.95']['T'],'95 %: 20,17')]:
    ax.axvline(v,color='gray',ls=':',lw=1); ax.text(v,norm.pdf(mu,mu,sd)*1.03,l,ha='center',fontsize=8)
ax.set_xlabel('Doba dokončenia projektu T [týždne]'); ax.set_ylabel('Hustota pravdepodobnosti')
ax.spines[['top','right']].set_visible(False); ax.legend(frameon=False,fontsize=8,loc='upper left'); ax.set_ylim(0,norm.pdf(mu,mu,sd)*1.15)
plt.tight_layout(); plt.savefig('graf_normal.png'); plt.close()

# LP resource utilization chart
res=['Elektrická sieť\n(kWh)','Chladenie\n(kW)','Priestor v rackoch\n(U)','Dátová linka\n(Mbps)']
used=[3890,1082,409,15000]; cap=[12000,3000,600,15000]
fig,ax=plt.subplots(figsize=(8,3.2),dpi=200)
pct=[u/c*100 for u,c in zip(used,cap)]
ax.barh(res,[100]*4,color='#EAECEE'); bars=ax.barh(res,pct,color=['#5DADE2','#5DADE2','#5DADE2','#C0392B'])
for i,(p,u,c) in enumerate(zip(pct,used,cap)): ax.text(min(p,100)+1 if p<90 else p-1,i,f"{p:.1f} % ({u:,} / {c:,})".replace(',',' ').replace('.',','),va='center',ha='left' if p<90 else 'right',fontsize=8.5,color='black' if p<90 else 'white')
ax.set_xlim(0,105); ax.invert_yaxis(); ax.set_xlabel('Využitie kapacity [%]'); ax.spines[['top','right']].set_visible(False)
plt.tight_layout(); plt.savefig('graf_lp.png'); plt.close()
