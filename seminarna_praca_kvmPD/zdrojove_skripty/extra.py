import json, math, numpy as np
from scipy.stats import norm
D=json.load(open('data.json'))
T=D['T']; sd=D['sd']
# RN, node reserve
t0,t1=D['t0'],D['t1']
for e in D['edges']:
    i,j=e['i']-1,e['j']-1
    e['RN']=t0[j]-t1[i]-e['te']
D['Rnode']=[b-a for a,b in zip(t0,t1)]
# shortening by 1 week
for k,Tp in [('s1',T-1),('s2',T-2)]:
    z=(Tp-T)/sd; D[k]=dict(Tp=Tp,z=z,p=norm.cdf(z))
# paths & activity criticality (analytic: P(path longer than critical))
acts=D['acts']
paths={'A-D-E-F-G-H-J-K-L':list('ADEFGHJKL'),'B-C-F-G-H-J-K-L':list('BCFGHJKL'),'A-C-F-G-H-J-K-L':list('ACFGHJKL'),'A-D-I-K-L':list('ADIKL'),'B-C... ':[]}
del paths['B-C... ']
P={}
for n,p in paths.items():
    L=sum(acts[a]['te'] for a in p); V=sum(acts[a]['var'] for a in p)
    P[n]=dict(L=L,V=V,s=math.sqrt(V),gap=T-L,p=(0.5 if abs(T-L)<1e-9 else 1-norm.cdf((T-L)/math.sqrt(V))))
    print(n,P[n])
D['paths']=P
# MC criticality index
rng=np.random.default_rng(2026); M=200000
samp={}
for k,v in acts.items():
    a,m,b=v['a'],v['m'],v['b']; al=1+4*(m-a)/(b-a); be=1+4*(b-m)/(b-a); samp[k]=a+(b-a)*rng.beta(al,be,M)
order=['A','B','C','D','E','I','F','G','H','J','K','L']
EF={}
for k in order:
    st=np.zeros(M)
    for p in acts[k]['p']: st=np.maximum(st,EF[p])
    EF[k]=st+samp[k]
# backward critical marking: activity critical if on a longest path
crit={k:np.zeros(M,bool) for k in order}
crit['L'][:]=True
for k in reversed(order):
    succ=[s for s in order if k in acts[s]['p']]
    if succ:
        c=np.zeros(M,bool)
        for s in succ:
            ES_s=np.zeros(M)
            for p in acts[s]['p']: ES_s=np.maximum(ES_s,EF[p])
            c|= crit[s] & np.isclose(EF[k],ES_s)
        crit[k]=c
D['ci']={k:float(crit[k].mean()) for k in order}
print(D['ci'])
print(D['s1'],D['s2'])
json.dump(D,open('data.json','w'),indent=1,ensure_ascii=False)
