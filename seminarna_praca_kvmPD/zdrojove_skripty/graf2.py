import json, math
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, FancyArrowPatch
plt.rcParams['font.family']='DejaVu Sans'
D=json.load(open('data.json'))
TM,TP=D['t0'],D['t1']
def fm(x):
    if abs(x)<5e-9: x=0
    return str(int(round(x))) if abs(x-round(x))<1e-9 else f"{x:.2f}".replace('.',',')
pos={1:(0.8,6.0),2:(3.9,6.0),3:(7.0,9.7),4:(7.0,6.0),5:(10.1,6.0),6:(13.2,6.0),
     7:(13.2,3.3),8:(13.2,0.6),9:(10.1,0.6),10:(7.0,0.6),11:(3.9,0.6)}
R=0.62
fig,ax=plt.subplots(figsize=(11,8.2),dpi=220)
for e in D['edges']:
    n,i,j=e['n'],e['i'],e['j']; (x1,y1),(x2,y2)=pos[i],pos[j]
    c=e['crit']; col='black' if c else '#555555'; lw=2.4 if c else 1.2
    ls=(0,(5,3)) if n=='Fikt' else '-'
    ax.add_patch(FancyArrowPatch((x1,y1),(x2,y2),arrowstyle='-|>',mutation_scale=15,color=col,lw=lw,linestyle=ls,shrinkA=R*72*1.02*0.78,shrinkB=R*72*1.02*0.78))
    dx,dy=x2-x1,y2-y1; L=math.hypot(dx,dy); ux,uy=dx/L,dy/L
    nx,ny=-uy,ux                      # left normal
    if ny<0 or (abs(ny)<1e-9 and nx>0): nx,ny=-nx,-ny   # "upper" side
    if abs(dx)<1e-9: nx,ny=-1,0       # vertical: upper = left side
    ang=math.degrees(math.atan2(dy,dx))
    if ang>90 or ang<-90: ang+=180
    if abs(dx)<1e-9: ang=0
    y=e['te']; ZM=e['ES']; KM=e['EF']; ZP=e['LS']; KP=e['LF']; RC=e['Rc']
    name='fikt.' if n=='Fikt' else n
    up=[fm(ZM),f"{name}: {fm(y)}",fm(KM)]; dn=[fm(ZP),fm(RC),fm(KP)]
    diag=abs(dx)>1e-9 and abs(dy)>1e-9
    if diag:
        fr={'B':0.42,'Fikt':0.55,'C':0.5,'I':0.5}[n]
        px,py=x1+dx*fr,y1+dy*fr
        ax.text(px,py,f"{fm(ZM)}   {name}: {fm(y)}   {fm(KM)}\n{fm(ZP)}    {fm(RC)}    {fm(KP)}",ha='center',va='center',fontsize=7.6,linespacing=1.5,
                bbox=dict(boxstyle='round,pad=0.25',fc='white',ec=col,lw=0.6),zorder=6)
        continue
    s0=R+0.05; usable=L-2*s0
    vert=abs(dx)<1e-9
    off=0.26 if not vert else 0.18
    for k,(tu,td) in enumerate(zip(up,dn)):
        t=s0+usable*(0.12+0.38*k)
        px,py=x1+ux*t,y1+uy*t
        fw='bold' if (k==1) else 'normal'
        ha_u='right' if vert else 'center'; ha_d='left' if vert else 'center'
        ax.text(px+nx*off,py+ny*off,tu,ha=ha_u,va='center',rotation=ang,rotation_mode='anchor',fontsize=8,fontweight=fw,color='black')
        ax.text(px-nx*off,py-ny*off,td,ha=ha_d,va='center',rotation=ang,rotation_mode='anchor',fontsize=8,color='black',style='italic' if k==1 else 'normal')
for nd,(x,y) in pos.items():
    c=abs(TM[nd-1]-TP[nd-1])<1e-9
    ax.add_patch(Circle((x,y),R,fc='#E6E6E6' if c else 'white',ec='black',lw=1.8 if c else 1.2,zorder=3))
    ax.plot([x-R,x+R],[y,y],color='black',lw=0.8,zorder=4); ax.plot([x,x],[y-R,y],color='black',lw=0.8,zorder=4)
    ax.text(x,y+R*0.45,str(nd),ha='center',va='center',fontsize=12,fontweight='bold',zorder=5)
    ax.text(x-R*0.48,y-R*0.42,fm(TM[nd-1]),ha='center',va='center',fontsize=7.5,zorder=5)
    ax.text(x+R*0.48,y-R*0.42,fm(TP[nd-1]),ha='center',va='center',fontsize=7.5,zorder=5)
# legend (schema i -> j)
lx,ly=9.1,9.7
for x,lab in [(lx,'i'),(lx+4.4,'j')]:
    ax.add_patch(Circle((x,ly),0.55,fc='white',ec='black',lw=1))
    ax.plot([x-0.55,x+0.55],[ly,ly],color='black',lw=0.7); ax.plot([x,x],[ly-0.55,ly],color='black',lw=0.7)
    ax.text(x,ly+0.26,lab,ha='center',va='center',fontsize=11,fontweight='bold')
    ax.text(x-0.26,ly-0.25,'TM',ha='center',va='center',fontsize=7); ax.text(x+0.26,ly-0.25,'TP',ha='center',va='center',fontsize=7)
ax.add_patch(FancyArrowPatch((lx+0.6,ly),(lx+3.8,ly),arrowstyle='-|>',mutation_scale=13,color='black',lw=1.2))
for k,(a,b) in enumerate([('ZM','ZP'),('činnosť: y','RC'),('KM','KP')]):
    px=lx+0.95+1.25*k
    ax.text(px,ly+0.26,a,ha='center',va='center',fontsize=8,fontweight='bold' if k==1 else 'normal')
    ax.text(px,ly-0.26,b,ha='center',va='center',fontsize=8,style='italic' if k==1 else 'normal')
ax.text(lx+2.2,ly-0.95,'Legenda: údaje pri hrane sa čítajú v smere šípky',ha='center',fontsize=8,fontweight='bold')
ax.set_xlim(-0.1,14.4); ax.set_ylim(-0.3,10.5); ax.set_aspect('equal'); ax.axis('off')
plt.tight_layout(); plt.savefig('graf_siet_v2.png',bbox_inches='tight',pad_inches=0.05)
