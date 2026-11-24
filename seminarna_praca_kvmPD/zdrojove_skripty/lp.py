import pulp
from scipy.optimize import linprog
import numpy as np
c=[15,12,20,35,8,18]
A=[[30,25,10,40,5,15],[10,8,2,12,1,3],[2,4,1,4,1,2],[5,10,100,50,200,80]]
b=[12000,3000,600,15000]
names=['el','chl','rack','net']
# ILP
for cat in ['Integer','Continuous']:
    p=pulp.LpProblem('dc',pulp.LpMaximize)
    lb=[0,0,50,20,0,15]
    x=[pulp.LpVariable(f'x{i+1}',lowBound=lb[i],cat=cat) for i in range(6)]
    p+=pulp.lpSum(c[i]*x[i] for i in range(6))
    for k in range(4): p+=pulp.lpSum(A[k][i]*x[i] for i in range(6))<=b[k],names[k]
    p+= -0.15*(x[0]+x[1]+x[2]+x[3]+x[5])+0.85*x[4]>=0,'eco'
    p.solve(pulp.PULP_CBC_CMD(msg=0))
    xv=[v.value() for v in x]
    print(cat,pulp.LpStatus[p.status],xv,pulp.value(p.objective))
    for k in range(4): print(names[k],sum(A[k][i]*xv[i] for i in range(6)),b[k])
    print('eco',-0.15*(sum(xv)-xv[4])+0.85*xv[4], 'share',xv[4]/sum(xv))
    if cat=='Continuous':
        for n,cn in p.constraints.items(): print(n,cn.pi,cn.slack)
        for v in x: print(v.name,v.dj)
