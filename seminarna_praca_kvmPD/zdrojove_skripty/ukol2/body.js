const G=JSON.parse(fs.readFileSync('u2/d2.json','utf8'));
const A=G.acts, K=Object.keys(A), NODES=G.nodes, R=G.res;
const NAMES={A:'Průzkum trhu a prohlídky nemovitostí',B:'Finanční příprava a předschválení úvěru',C:'Právní audit, podpis smluv a katastr',D:'Zaměření a architektonický návrh',E:'Vyřízení ohlášky/povolení na úřadech',F:'Bourací práce a odvoz suti',G:'Hrubé instalace – voda, elektro',H:'Zednické práce, obklady a sanita',I:'Objednávka a výroba nábytku na míru',J:'Malířské práce a pokládka podlah',K:'Kompletace a montáž nábytku',L:'Finální úklid, homestaging a inzerce'};
const nm=n=>n==='Fikt'?'X0':n;
const body=[]; tabN=5; figN=1;
body.push(H1('3  Úkol 2: Síťová analýza – Investiční proces a rekonstrukce bytu k pronájmu (metoda PERT)'));
body.push(H2('3.1  Zadání projektu'));
body.push(P('Investor plánuje kúpiť starší byt, kompletne ho zrekonštruovať a čo najskôr ho ponúknuť na prenájom. Každý deň oneskorenia znamená ušlé nájomné a ďalšie úroky z hypotekárneho úveru, preto potrebuje poznať strednú dobu realizácie projektu, kritické činnosti a pravdepodobnosť dodržania termínu. Doby trvania činností nie sú presne známe (závisia od ponuky na trhu, od úradov a od dodávateľov), preto je projekt analyzovaný **metódou PERT**. Pre každú činnosť sú známe tri odhady doby trvania v dňoch – optimistický aᵢⱼ, najpravdepodobnejší mᵢⱼ a pesimistický bᵢⱼ (Tabuľka 6).'));
body.push(TCap('Zoznam činností, ich nadväznosti a tri odhady dôb ich trvania (dni)'));
body.push(T(['Označenie činnosti','Názov činnosti','Bezprostredne predchádzajúca činnosť','aᵢⱼ','mᵢⱼ','bᵢⱼ'],K.map(k=>[k,NAMES[k],A[k].p.length?A[k].p.join(', '):'–',A[k].a,A[k].m,A[k].b]),[1.2,4.4,1.9,0.6,0.6,0.6],{leftCols:2,size:18}));
body.push(Src('vlastné spracovanie'));
body.push(P('**Úlohy:**',{keepNext:true}));
['Pomocou hranovo-hranovej matice zostavte sieťový graf projektu.','Pomocou metódy preškrtávania hrán očíslujte (prečíslujte) uzly sieťového grafu.',
 'Metódou PERT vykonajte časovú analýzu v sieťovom grafe a v tabuľke. Nájdite kritickú cestu, stanovte strednú dobu jej trvania a určte základné časové charakteristiky na úrovni činností a uzlov.',
 'Určte pravdepodobnosť, že sa doba realizácie projektu skráti o 10 dní.','Určte, aký bude plánovaný termín doby realizácie projektu, ak pripustíme 10 % riziko oneskorenia projektu.',
 'Pomocou incidenčnej matice určte pravdepodobnosť kritičnosti uzlov, prípadne činností.'].forEach(t=>body.push(N(t)));

body.push(H2('3.2  Výpočet středních dob trvání a rozptylů'));
body.push(P('Pre každú činnosť sa z troch odhadov vypočíta stredná doba trvania yᵢⱼ a rozptyl σ²ᵢⱼ:',{keepNext:true}));
body.push(X('y_{ij} = \\frac{a_{ij} + 4m_{ij} + b_{ij}}{6}\\qquad\\qquad \\sigma_{ij}^{2} = \\left( \\frac{b_{ij} - a_{ij}}{6} \\right)^{2}'));
body.push(TCap('Stredné doby trvania a rozptyly činností (dni)'));
body.push(T(['Činnosť','aᵢⱼ','mᵢⱼ','bᵢⱼ','Výpočet yᵢⱼ','yᵢⱼ','Výpočet σ²ᵢⱼ','σ²ᵢⱼ'],K.map(k=>{const x=A[k];return [k,x.a,x.m,x.b,`(${x.a} + 4·${x.m} + ${x.b}) / 6`,{t:x.y,b:true},`((${x.b} − ${x.a}) / 6)²`,{t:x.v,b:true}];}),[0.9,0.6,0.6,0.6,2.2,0.8,2,0.8],{size:18,zebra:true}));
body.push(Src('vlastné výpočty'));

body.push(H2('3.3  Sestavení síťového grafu pomocí hrano-hranové matice (úloha 1)'));
body.push(P('Hranovo-hranová matica je štvorcová matica, ktorá má toľko riadkov a stĺpcov, koľko je v grafe hrán (činností). Prvok v riadku hᵢ a stĺpci hⱼ je rovný 1, ak činnosť hᵢ bezprostredne predchádza činnosti hⱼ. Pod maticou sú zapísané riadky jednotlivých rádov – metóda preškrtávania hrán (podrobne v časti 3.4).'));
const succ={}; K.forEach(k=>succ[k]=K.filter(s=>A[s].p.includes(k)));
// rank rows
const rankRows=[]; let done=new Set(); let r=0;
while(done.size<K.length){
  const cnt={}; K.forEach(c=>{cnt[c]=done.has(c)?null:A[c].p.filter(p=>!done.has(p)).length;});
  const lvl=K.filter(c=>cnt[c]===0);
  rankRows.push([{t:`${r}. rád`,b:true},...K.map(c=>cnt[c]===null?'–':String(cnt[c])),{t:lvl.join(', '),b:true}]);
  lvl.forEach(c=>done.add(c)); r++;
}
body.push(TCap('Hranovo-hranová matica a určenie rádov činností'));
body.push(T(['hᵢ \\ hⱼ',...K,'Činnosti rádu'],K.map(rw=>[{t:rw,b:true},...K.map(c=>succ[rw].includes(c)?{t:'1',b:true}:''),'']).concat(rankRows),[1.1,...Array(12).fill(0.7),1.4],{size:17}));
body.push(Src('vlastné spracovanie'));
body.push(P('Pri konštrukcii hranovo definovaného grafu (činnosť = hrana, uzol = začiatok alebo koniec činnosti) sa postupuje podľa rádov. Činnosti 0. rádu A a B vychádzajú z počiatočného uzla. Činnosť D nadväzuje iba na A, ale činnosť C na A aj B. Preto A končí v samostatnom uzle (z ktorého vychádza D) a do uzla, v ktorom končí B a začína C, vedie z neho **fiktívna činnosť X0** s nulovou dobou trvania (v grafe prerušovanou čiarou). Činnosti E a I majú spoločného predchodcu D, vychádzajú teda z jedného uzla. C a E končia v spoločnom uzle, z ktorého vychádza F; I a J končia v spoločnom uzle, z ktorého vychádza K. Ostatné činnosti tvoria reťazec F → G → H → J a K → L. Graf má **11 uzlov a 13 hrán** (12 činností a 1 fiktívnu činnosť).'));

body.push(H2('3.4  Očíslování uzlů metodou přeškrtávání hran (úloha 2)'));
body.push(P('V hranovo-hranovej matici sa najprv spočítajú jednotky v každom stĺpci (riadok 0. rád). Činnosti so súčtom 0 nemajú predchodcov a tvoria 0. rád (A, B). Ich riadky sa v matici preškrtnú a súčty sa spočítajú znova – činnosti, ktorých súčet klesol na 0, tvoria 1. rád (C, D). Pri už zaradených činnostiach sa zapisuje pomlčka. Postup sa opakuje, kým nie sú zaradené všetky činnosti. Projekt má **9 rádov (0. až 8. rád)**. Podľa rádov sa očíslujú uzly tak, aby každá hrana viedla z uzla s nižším číslom do uzla s vyšším číslom (i < j):'));
body.push(TCap('Očíslovanie uzlov podľa rádov činností'));
body.push(T(['Rád','Činnosti','Hrany (i, j)'],[['0','A, B','A (1, 2), B (1, 3), X0 (2, 3)'],['1','C, D','C (3, 5), D (2, 4)'],['2','E, I','E (4, 5), I (4, 9)'],['3','F','F (5, 6)'],['4','G','G (6, 7)'],['5','H','H (7, 8)'],['6','J','J (8, 9)'],['7','K','K (9, 10)'],['8','L','L (10, 11)']],[0.8,1.5,4],{leftCols:0,size:19,zebra:true}));
body.push(Src('vlastné spracovanie'));

body.push(H2('3.5  Časová analýza metodou PERT (úloha 3)'));
body.push(P('Časová analýza sa vykonáva so strednými dobami trvania činností yᵢⱼ. **Výpočet dopredu** (od uzla 1 k uzlu 11) určuje **termín možný TMᵢ** – do počiatočného uzla sa zapíše 0 a pre každý ďalší uzol sa vyberie najväčší zo súčtov termínu možného predchádzajúceho uzla a doby trvania vstupujúcej činnosti. **Výpočet dozadu** (od uzla 11 k uzlu 1) určuje **termín prípustný TPᵢ** – do koncového uzla sa prepíše jeho termín možný a pre ostatné uzly sa vyberie najmenší z rozdielov termínu prípustného nasledujúceho uzla a doby trvania vystupujúcej činnosti:',{keepNext:true}));
body.push(X('TM_{1} = 0;\\qquad TM_{j} = \\max_{i}\\left( TM_{i} + y_{ij} \\right);\\qquad TP_{n} = TM_{n} = T;\\qquad TP_{i} = \\min_{j}\\left( TP_{j} - y_{ij} \\right)'));
body.push(P('Z termínov uzlov sa určia časové charakteristiky činností – začiatok možný ZM, koniec možný KM, začiatok prípustný ZP, koniec prípustný KP, celková rezerva RC, voľná rezerva RV a nezávislá rezerva RN:',{keepNext:true}));
body.push(X('ZM_{ij} = TM_{i};\\quad KM_{ij} = ZM_{ij} + y_{ij};\\quad KP_{ij} = TP_{j};\\quad ZP_{ij} = KP_{ij} - y_{ij};\\quad RC_{ij} = TP_{j} - TM_{i} - y_{ij}'));
body.push(X('RV_{ij} = TM_{j} - TM_{i} - y_{ij};\\qquad RN_{ij} = TM_{j} - TP_{i} - y_{ij}'));
body.push(P('Výsledky sú zapísané v sieťovom grafe (Obrázok 2). V uzle je hore jeho číslo, vľavo dole termín možný TMᵢ a vpravo dole termín prípustný TPᵢ. Pri každej hrane sú nad šípkou ZM, označenie činnosti s dobou trvania y a KM, pod šípkou ZP, celková rezerva RC (kurzívou) a KP. Pri šikmých hranách sú údaje v rámčeku v rovnakom poradí. Graf je kvôli prehľadnosti zalomený – činnosti J, K a L smerujú sprava doľava a údaje sa vždy čítajú v smere šípky. Kritická cesta je vyznačená hrubou čiarou a kritické uzly sivou výplňou.'));
body.push(IMG('u2/graf_siet_dni.png',605,452)); body.push(FCap('Sieťový graf projektu s výsledkami časovej analýzy metódou PERT, doby v dňoch (vlastné spracovanie)'));
body.push(TCap('Časové charakteristiky uzlov (dni)'));
body.push(T(['Uzol i',...NODES.map((_,i)=>String(i+1))],[['TMᵢ',...NODES.map(n=>String(n.TM))],['TPᵢ',...NODES.map(n=>String(n.TP))],['RIᵢ = TPᵢ − TMᵢ',...NODES.map(n=>({t:String(n.RI),b:n.RI===0}))]],[2,...Array(11).fill(1)],{size:18}));
body.push(Src('vlastné výpočty'));
body.push(TCap('Časové charakteristiky činností (dni)'));
body.push(T(['Činnosť','(i, j)','yᵢⱼ','σ²ᵢⱼ','ZM','KM','ZP','KP','RC','RV','RN'],G.edges.map(e=>{const w=s=>e.crit?{t:String(s),hl:true}:String(s);return [w(nm(e.n)),w(`(${e.i}, ${e.j})`),w(e.y),w(e.v),w(e.ZM),w(e.KM),w(e.ZP),w(e.KP),w(e.RC),w(e.RV),w(e.RN)];}),[1,1.1,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8,0.8],{size:18}));
body.push(Src('vlastné výpočty; tučne sú vyznačené kritické činnosti'));
body.push(P(`**Kritická cesta** prechádza uzlami 1 – 2 – 4 – 5 – 6 – 7 – 8 – 9 – 10 – 11 a tvoria ju činnosti **A → D → E → F → G → H → J → K → L** (TMᵢ = TPᵢ v uzloch a RC = 0 pri činnostiach). **Stredná doba trvania projektu je T = 128 dní** (približne 18 týždňov). Rozptyl doby trvania projektu je súčtom rozptylov kritických činností:`,{keepNext:true}));
body.push(X('\\sigma^{2} = 4 + 1 + 9 + 1 + 4 + 4 + 4 + 1 + 1 = 29;\\qquad \\sigma = \\sqrt{29} \\doteq 5{,}385\\ \\text{dňa}'));
body.push(P('Nekritické sú činnosti B (RC = 14 dní), C a fiktívna činnosť X0 (RC = 7 dní) a I (RC = 43 dní).'));

body.push(H2('3.6  Pravděpodobnost zkrácení doby realizace projektu o 10 dní (úloha 4)'));
body.push(P('Doba realizácie projektu má približne normálne rozdelenie so strednou hodnotou T = 128 dní a smerodajnou odchýlkou σ = 5,385 dňa. Pravdepodobnosť dodržania plánovaného termínu Tₚ sa určí pomocou normovanej premennej u a hodnoty distribučnej funkcie F(u) normovaného normálneho rozdelenia:',{keepNext:true}));
body.push(X('u = \\frac{T_{p} - T}{\\sigma};\\qquad P\\left( t \\leq T_{p} \\right) = F(u)'));
body.push(P('Pri skrátení o 10 dní je plánovaný termín Tₚ = 128 − 10 = 118 dní:',{keepNext:true}));
body.push(X('u = \\frac{118 - 128}{5{,}385} = - 1{,}86;\\qquad F( - 1{,}86) = 1 - F(1{,}86) = 1 - 0{,}9683 = 0{,}0317'));
body.push(P(`**Pravdepodobnosť, že sa doba realizácie projektu skráti o 10 dní, je iba 3,17 %.** Skrátenie projektu je teda veľmi nepravdepodobné.`));

body.push(H2('3.7  Plánovaný termín při 10% riziku zpoždění (úloha 5)'));
body.push(P('Ak pripustíme 10 % riziko oneskorenia, musí byť termín dodržaný s pravdepodobnosťou 90 %. Z tabuľky normovaného normálneho rozdelenia je pre F(u) = 0,90 hodnota u = 1,28:',{keepNext:true}));
body.push(X('T_{p} = T + u \\cdot \\sigma = 128 + 1{,}28 \\cdot 5{,}385 = 134{,}89 \\doteq 135\\ \\text{dní}'));
body.push(P('**Pri 10 % riziku oneskorenia je plánovaný termín realizácie projektu 135 dní.**'));
body.push(IMG('u2/graf_normal_dni.png',520,221)); body.push(FCap('Normálne rozdelenie doby realizácie projektu (vlastné spracovanie)'));

body.push(H2('3.8  Pravděpodobnost kritičnosti uzlů a činností – incidenční matice (úloha 6)'));
body.push(P('Incidenčná matica je štvorcová matica, ktorá má počet riadkov a stĺpcov rovný počtu uzlov grafu (11). V bunke (i, j) každej činnosti je dole zapísaná doba trvania a v zátvorke rozptyl yᵢⱼ(σ²ᵢⱼ). Vpravo hore sa zapisuje TMᵢ + yᵢⱼ a pod ním (σ²TMᵢ + σ²ᵢⱼ), vľavo hore TPⱼ − yᵢⱼ a pod ním (σ²TPⱼ + σ²ᵢⱼ). **Postup výpočtu:**'));
['Do TM a σ²TM prvého riadka sa zapíše 0. TMⱼ ďalšieho riadka je najvyššia hodnota TMᵢ + yᵢⱼ v j-tom stĺpci, σ²TMⱼ je najvyššia hodnota σ²TMᵢ + σ²ᵢⱼ v j-tom stĺpci.',
 'Hodnota TM posledného uzla sa prepíše do TP posledného stĺpca a σ²TP posledného uzla je 0.',
 'TPᵢ je najnižšia hodnota TPⱼ − yᵢⱼ v i-tom riadku, σ²TPᵢ je najvyššia hodnota σ²TPⱼ + σ²ᵢⱼ v i-tom riadku.',
 'Rezerva uzla RIᵢ = TPᵢ − TMᵢ.'].forEach((t,i)=>body.push(P(`${i+1}) ${t}`,{indent:{left:567,hanging:283},after:60})));
const NN=11; const cell={}; G.edges.forEach(e=>cell[`${e.i}-${e.j}`]=e);
const mrow=i=>[{t:String(i+1),b:true},...Array.from({length:NN},(_,j)=>{const e=cell[`${i+1}-${j+1}`]; if(!e) return '';
   const n=NODES; const zp=n[j].TP-e.y, km=n[i].TM+e.y, vtp=n[j].sTP+e.v, vtm=n[i].sTM+e.v;
   const t=`${zp}   ${km}\n(${vtp}) (${vtm})\n${nm(e.n)}: ${e.y}(${e.v})`; return e.crit?{t,b:true}:t;}),{t:String(NODES[i].TM),b:true},String(NODES[i].sTM)];
body.push(TCap('Incidenčná matica sieťového grafu'));
body.push(T(['i \\ j',...Array.from({length:NN},(_,j)=>String(j+1)),'TMᵢ','σ²TMᵢ'],Array.from({length:NN},(_,i)=>mrow(i)).concat([
  [{t:'TPⱼ',b:true},...NODES.map(n=>({t:String(n.TP),b:true})),'',''],[{t:'σ²TPⱼ',b:true},...NODES.map(n=>String(n.sTP)),'',''],[{t:'RIⱼ',b:true},...NODES.map(n=>String(n.RI)),'','']]),[0.9,...Array(11).fill(1),0.8,0.8],{size:13}));
body.push(Src('vlastné spracovanie; v bunke: TPⱼ − yᵢⱼ | TMᵢ + yᵢⱼ, pod tým (σ²TPⱼ + σ²ᵢⱼ) | (σ²TMᵢ + σ²ᵢⱼ), dole činnosť: yᵢⱼ(σ²ᵢⱼ); tučne kritické činnosti'));
body.push(P('**Kritickosť uzlov.** Z incidenčnej matice sa prevezmú hodnoty TM, TP, RI, σ²TM a σ²TP a pre každý uzol sa vypočíta normovaná premenná u. Hodnota distribučnej funkcie F(u) vyjadruje pravdepodobnosť, s ktorou sa nekritický uzol stane kritickým (povedie cez neho kritická cesta):',{keepNext:true}));
body.push(X('u_{i} = \\frac{- \\left( TP_{i} - TM_{i} \\right)}{\\sqrt{\\sigma^{2}TP_{i} + \\sigma^{2}TM_{i}}}'));
body.push(TCap('Kritickosť uzlov'));
const fu=x=>f(x,2).replace('-','−');
body.push(T(['Uzol',...NODES.map((_,i)=>String(i+1))],[['TMᵢ',...NODES.map(n=>String(n.TM))],['TPᵢ',...NODES.map(n=>String(n.TP))],['RIᵢ',...NODES.map(n=>String(n.RI))],
 ['σ²TMᵢ',...NODES.map(n=>String(n.sTM))],['σ²TPᵢ',...NODES.map(n=>String(n.sTP))],['u',...NODES.map(n=>n.RI?fu(n.u):'0')],[{t:'F(u)',b:true},...NODES.map(n=>({t:f(n.F,2),b:true}))]],[1.3,...Array(11).fill(1)],{size:18}));
body.push(Src('vlastné výpočty'));
const n3=NODES[2];
body.push(P(`Všetky uzly okrem uzla 3 ležia na kritickej ceste (RI = 0, u = 0, F(u) = 0,50). Pre uzol 3 platí u = −7 / √(19 + 4) = −1,46 a F(−1,46) = 1 − 0,9278 = 0,07 – **uzol 3 sa stane kritickým s pravdepodobnosťou približne 7 %**.`));
body.push(P('**Kritickosť činností.** Pre nekritické činnosti sa z incidenčnej matice prevezmú TMᵢ, TPⱼ, σ²TMᵢ a σ²TPⱼ, doplní sa stredná doba yᵢⱼ a rozptyl σ²ᵢⱼ a vypočíta sa:',{keepNext:true}));
body.push(X('u_{ij} = \\frac{- \\left( TP_{j} - TM_{i} - y_{ij} \\right)}{\\sqrt{\\sigma^{2}TM_{i} + \\sigma_{ij}^{2} + \\sigma^{2}TP_{j}}}'));
body.push(TCap('Kritickosť nekritických činností'));
body.push(T(['Činnosť','i','j','TMᵢ','TPⱼ','yᵢⱼ','σ²TMᵢ','σ²TPⱼ','σ²ᵢⱼ','u','F(u)'],G.edges.filter(e=>!e.crit).map(e=>[nm(e.n),e.i,e.j,NODES[e.i-1].TM,NODES[e.j-1].TP,e.y,NODES[e.i-1].sTM,NODES[e.j-1].sTP,e.v,fu(e.u),{t:f(e.F,2),b:true}]),[1,0.6,0.6,0.8,0.8,0.8,0.9,0.9,0.8,0.9,0.9],{size:18}));
body.push(Src('vlastné výpočty'));
body.push(P('Činnosť C a fiktívna činnosť X0 sa stanú kritickými s pravdepodobnosťou približne 7 %, činnosť B len s pravdepodobnosťou 0,18 % (F(u) ≈ 0,00) a výroba nábytku I prakticky nikdy (u = −10,75). Kritické činnosti A, D, E, F, G, H, J, K a L majú F(u) = 0,50.'));

body.push(H2('3.9  Manažerská interpretace výsledků'));
body.push(B('**Realistický termín:** stredná doba realizácie projektu je 128 dní (približne 18 týždňov, 4,2 mesiaca). Skrátenie o 10 dní je pravdepodobné len na 3,17 %, preto by investor nemal plánovať kratší termín. Pri 10 % riziku oneskorenia je plánovaný termín **135 dní** – tento termín je vhodné uviesť v zmluve s budúcim nájomcom aj pri plánovaní splátok úveru.'));
body.push(B('**Kritické činnosti:** 9 z 12 činností je kritických, projekt je teda časovo veľmi napätý. Najväčšiu neistotu majú **vybavovanie ohlásenia na úradoch (E)** a **výroba nábytku (I)** s rozptylom 9. Pri činnosti E je vhodné podať kompletnú dokumentáciu a využiť skúseného projektanta, pri murárskych prácach (H) zmluvne zaviazať dodávateľa termínom a sankciou za omeškanie.'));
body.push(B('**Využitie rezerv:** výroba nábytku na mieru (I) má celkovú rezervu 43 dní – nábytok možno objednať až okolo 78. dňa a odložiť tak výdavok. Finančnú prípravu (B) možno začať až o 14 dní neskôr. Najrizikovejšia je činnosť C (právny audit) s rezervou 7 dní, ktorá sa stane kritickou s pravdepodobnosťou približne 7 % – jej priebeh je potrebné sledovať.'));
