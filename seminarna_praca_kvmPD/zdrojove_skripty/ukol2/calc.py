import json, math
from fractions import Fraction as Fr
from scipy.stats import norm
acts={'A':([],15,21,27),'B':([],8,14,20),'C':(['A','B'],22,28,34),'D':(['A'],11,14,17),'E':(['D'],14,20,32),
'F':(['C','E'],6,6,12),'G':(['F'],8,14,20),'H':(['G'],14,14,26),'I':(['D'],22,28,40),'J':(['H'],8,14,20),
'K':(['I','J'],11,14,17),'L':(['K'],6,6,12)}
y={k:Fr(a+4*m+b,6) for k,(p,a,m,b) in acts.items()}; v={k:Fr(b-a,6)**2 for k,(p,a,m,b) in acts.items()}
assert all(x.denominator==1 for x in list(y.values())+list(v.values())), (y,v)
edges=[('A',1,2),('B',1,3),('Fikt',2,3),('C',3,5),('D',2,4),('E',4,5),('F',5,6),('G',6,7),('H',7,8),('I',4,9),('J',8,9),('K',9,10),('L',10,11)]
yy={n:(y.get(n,0)) for n,_,_ in edges}; vv={n:(v.get(n,0)) for n,_,_ in edges}
N=11
TM=[0]*N; sTM=[0]*N
for j in range(2,N+1):
    inc=[(n,i) for n,i,k in edges if k==j]
    TM[j-1]=max(TM[i-1]+yy[n] for n,i in inc); sTM[j-1]=max(sTM[i-1]+vv[n] for n,i in inc)
T=TM[-1]; TP=[T]*N; sTP=[0]*N
for i in range(N-1,0,-1):
    out=[(n,k) for n,ii,k in edges if ii==i]
    TP[i-1]=min(TP[k-1]-yy[n] for n,k in out); sTP[i-1]=max(sTP[k-1]+vv[n] for n,k in out)
E=[]
for n,i,j in edges:
    ZM=TM[i-1]; KM=ZM+yy[n]; KP=TP[j-1]; ZP=KP-yy[n]; RC=KP-ZM-yy[n]; RV=TM[j-1]-ZM-yy[n]; RN=TM[j-1]-TP[i-1]-yy[n]
    d=dict(n=n,i=i,j=j,y=int(yy[n]),v=int(vv[n]),ZM=int(ZM),KM=int(KM),ZP=int(ZP),KP=int(KP),RC=int(RC),RV=int(RV),RN=int(RN),crit=RC==0)
    if RC!=0:
        s=sTM[i-1]+vv[n]+sTP[j-1]; d['s']=int(s); d['u']=-RC/math.sqrt(s); d['F']=norm.cdf(d['u'])
    E.append(d); print(d)
nodes=[]
for k in range(N):
    R=TP[k]-TM[k]; s=sTM[k]+sTP[k]; u=-R/math.sqrt(s) if s else 0.0
    nodes.append(dict(TM=int(TM[k]),TP=int(TP[k]),RI=int(R),sTM=int(sTM[k]),sTP=int(sTP[k]),u=u,F=norm.cdf(u))); print(k+1,nodes[-1])
crit=[e['n'] for e in E if e['crit'] and e['n']!='Fikt']; V=sum(v[c] for c in crit); sd=math.sqrt(V)
print('T',T,'crit',crit,'V',V,'sd',sd, 'sTM end',sTM[-1])
res=dict(T=int(T),V=int(V),sd=sd)
for d in [10]:
    z=-d/sd; res['short']=dict(d=d,Tp=int(T)-d,z=z,p=norm.cdf(z))
res['q90']=dict(z=norm.ppf(.9),Tp=int(T)+norm.ppf(.9)*sd); res['q95']=dict(z=norm.ppf(.95),Tp=int(T)+norm.ppf(.95)*sd)
res['tab']={str(t):dict(z=(t-int(T))/sd,p=norm.cdf((t-int(T))/sd)) for t in [118,120,124,128,132,136,140]}
print(res)
json.dump(dict(acts={k:dict(p=a[0],a=a[1],m=a[2],b=a[3],y=int(y[k]),v=int(v[k])) for k,a in acts.items()},edges=E,nodes=nodes,crit=crit,res=res),open('u2/d2.json','w'),indent=1,ensure_ascii=False)
