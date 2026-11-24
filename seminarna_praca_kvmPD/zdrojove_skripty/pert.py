from fractions import Fraction as F
from scipy.stats import norm
import math
acts={'A':([],2,3,4),'B':([],1,2,3),'C':(['A','B'],3,4,5),'D':(['A'],1,2,3),'E':(['D'],2,3,4),
'F':(['C','E'],1,1,2),'G':(['F'],1,2,3),'H':(['G'],2,2,4),'I':(['D'],3,4,6),'J':(['H'],1,2,3),
'K':(['I','J'],1,2,3),'L':(['K'],1,1,2)}
te={k:F(a+4*m+b,6) for k,(p,a,m,b) in acts.items()}
var={k:F(b-a,6)**2 for k,(p,a,m,b) in acts.items()}
for k in acts: print(k,te[k],float(te[k]),var[k],float(var[k]))
# ranks by crossing
rem=set(acts);rank={};r=0
while rem:
    lvl=[k for k in rem if all(p not in rem for p in acts[k][0])]
    for k in lvl: rank[k]=r
    print('rad',r,sorted(lvl)); rem-=set(lvl); r+=1
ES={};EF={}
order=sorted(acts,key=lambda k:rank[k])
for k in order:
    ES[k]=max([EF[p] for p in acts[k][0]],default=F(0)); EF[k]=ES[k]+te[k]
T=max(EF.values());LF={};LS={}
for k in reversed(order):
    succ=[s for s in acts if k in acts[s][0]]
    LF[k]=min([LS[s] for s in succ],default=T); LS[k]=LF[k]-te[k]
for k in order: print(k,float(ES[k]),float(EF[k]),float(LS[k]),float(LF[k]),float(LS[k]-ES[k]), ES[k],EF[k],LS[k],LF[k],LS[k]-ES[k])
crit=[k for k in order if LS[k]==ES[k]]
print('T',T,float(T),'crit',crit)
V=sum(var[k] for k in crit);print('var',V,float(V),'sd',math.sqrt(V))
sd=math.sqrt(V)
for Td in [17,18,19,20]:
    z=(Td-float(T))/sd; print(Td,z,norm.cdf(z))
for p in [.9,.95,.99]: print(p,norm.ppf(p),float(T)+norm.ppf(p)*sd)
# free reserves
for k in order:
    succ=[s for s in acts if k in acts[s][0]]
    fr=min([ES[s] for s in succ],default=T)-EF[k]; print('free',k,float(fr))
