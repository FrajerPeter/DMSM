import json,numpy as np
from scipy.stats import norm
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
D=json.load(open('u2/d2.json')); r=D['res']; mu=r['T']; sd=r['sd']
xs=np.linspace(mu-4*sd,mu+4*sd,500); f=norm.pdf(xs,mu,sd)
fig,ax=plt.subplots(figsize=(8,3.4),dpi=200)
ax.plot(xs,f,color='black',lw=2)
t90=r['q90']['Tp']
ax.fill_between(xs[xs<=t90],f[xs<=t90],color='#CCCCCC',label='P(t ≤ 134,9) = 90 %')
ax.fill_between(xs[xs<=118],f[xs<=118],color='#333333',label='P(t ≤ 118) = 3,17 %')
for v,l in [(mu,'T = 128'),(118,'118'),(t90,'134,9')]:
    ax.axvline(v,color='gray',ls=':',lw=1); ax.text(v,norm.pdf(mu,mu,sd)*1.03,l,ha='center',fontsize=8)
ax.set_xlabel('Doba realizácie projektu [dni]'); ax.set_ylabel('Hustota pravdepodobnosti')
ax.spines[['top','right']].set_visible(False); ax.legend(frameon=False,fontsize=8,loc='upper left'); ax.set_ylim(0,norm.pdf(mu,mu,sd)*1.15)
plt.tight_layout(); plt.savefig('u2/graf_normal_dni.png')
