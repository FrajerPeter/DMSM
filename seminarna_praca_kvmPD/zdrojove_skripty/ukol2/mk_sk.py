s=open('u2/body.js').read()
def rep(a,b):
    global s
    assert a in s, a[:80]; s=s.replace(a,b)
def line(start,new):
    global s
    i=s.index(start); j=s.index("\n",i); s=s[:i]+new+s[j:]
line("const NAMES=","const NAMES={A:'Prieskum trhu a prehliadky nehnuteľností',B:'Finančná príprava a predschválenie úveru',C:'Právny audit, podpis zmlúv a kataster',D:'Zameranie a architektonický návrh',E:'Vybavenie ohlásenia/povolenia na úradoch',F:'Búracie práce a odvoz sute',G:'Hrubé inštalácie – voda, elektro',H:'Murárske práce, obklady a sanita',I:'Objednávka a výroba nábytku na mieru',J:'Maliarske práce a pokládka podláh',K:'Kompletizácia a montáž nábytku',L:'Finálne upratovanie, homestaging a inzercia'};")
rep("const body=[]; tabN=5; figN=1;","const body=[]; tabN=4; figN=1;")
rep("body.push(H2('3.1  Zadání projektu'));","body.push(H2('3.1  Zadanie projektu'));")
line("body.push(P('Investor plánuje","body.push(P('Investor plánuje kúpiť starší byt, kompletne ho zrekonštruovať a čo najskôr ho ponúknuť na prenájom. Každý deň oneskorenia znamená ušlé nájomné a ďalšie úroky z hypotekárneho úveru, preto potrebuje poznať strednú dobu realizácie projektu, kritické činnosti a pravdepodobnosť dodržania termínu. Doby trvania činností nie sú presne známe (závisia od ponuky na trhu, od úradov a od dodávateľov), preto je projekt analyzovaný metódou PERT, ktorá pre každú činnosť pracuje s tromi odhadmi doby trvania a predpokladá ich beta rozdelenie. Projekt sa skladá z 12 činností uvedených v Tabuľke 5, odhady dôb trvania sú v dňoch.'));")
rep("body.push(T(['Označenie činnosti','Názov činnosti'","body.push(T(['Činnosť','Názov činnosti'")
rep("TCap('Zoznam činností, ich nadväznosti a tri odhady dôb ich trvania (dni)')","TCap('Zoznam činností, ich nadväznosti a tri odhady doby trvania (dni)')")
rep("body.push(H2('3.2  Výpočet středních dob trvání a rozptylů'));\n","")
rep("body.push(P('Pre každú činnosť sa z troch odhadov vypočíta stredná doba trvania yᵢⱼ a rozptyl σ²ᵢⱼ:',{keepNext:true}));",
    "body.push(P('Pred riešením úloh sa pre každú činnosť vypočíta stredná doba trvania yᵢⱼ (označovaná aj tₑ) a rozptyl σ²ᵢⱼ:',{keepNext:true,before:120}));")
rep("'Výpočet yᵢⱼ','yᵢⱼ','Výpočet","'Výpočet yᵢⱼ','yᵢⱼ [dni]','Výpočet")
rep("body.push(H2('3.3  Sestavení síťového grafu pomocí hrano-hranové matice (úloha 1)'));","body.push(H2('3.2  Zostavenie sieťového grafu pomocou hranovo-hranovej matice'));")
line("body.push(P('Hranovo-hranová matica je štvorcová","body.push(P('Hranovo-hranová matica (12 × 12) zachytáva bezprostredné nadväznosti činností: prvok v riadku hᵢ a stĺpci hⱼ je rovný 1, ak činnosť v riadku bezprostredne predchádza činnosti v stĺpci, inak je prázdny. Pod maticou sú zapísané riadky jednotlivých rádov, ktoré vznikajú metódou preškrtávania hrán (časť 3.3).'));")
rep("TCap('Hranovo-hranová matica a určenie rádov činností')","TCap('Hranovo-hranová matica projektu a určenie rádov činností')")
line("body.push(P('Pri konštrukcii hranovo definovaného grafu","body.push(P('Pri zostavovaní hranovo definovaného grafu sa z matice čítajú skupiny činností s rovnakými predchodcami. Činnosti A a B nemajú predchodcov, vychádzajú teda zo spoločného počiatočného uzla. Činnosť D nadväzuje iba na A, ale činnosť C na A aj B – dvojica (A, B) a samotná A teda nemajú rovnakú množinu nasledovníkov. Preto A končí v samostatnom uzle (z ktorého vychádza D) a do uzla, kde končí B a začína C, je z neho vedená **fiktívna činnosť X0** s nulovou dobou trvania (v grafe prerušovanou čiarou). Činnosti E a I majú spoločného predchodcu D, takže vychádzajú z jedného uzla; C a E končia v spoločnom uzle, z ktorého vychádza F; I a J končia v spoločnom uzle, z ktorého vychádza K. Ostatné činnosti tvoria reťazec F → G → H → J a K → L. Výsledný graf má **11 uzlov a 13 hrán** (12 reálnych a 1 fiktívnu činnosť X0).'));")
rep("body.push(H2('3.4  Očíslování uzlů metodou přeškrtávání hran (úloha 2)'));","body.push(H2('3.3  Očíslovanie uzlov metódou preškrtávania hrán'));")
line("body.push(P('V hranovo-hranovej matici sa najprv","body.push(P('Metóda preškrtávania hrán postupne vyhľadáva v hranovo-hranovej matici stĺpce, ktoré neobsahujú žiadnu nepreškrtnutú jednotku – zodpovedajúce činnosti už nemajú nezaradených predchodcov a tvoria aktuálny rád. Riadky týchto činností sa preškrtnú a postup sa opakuje (riadky 0. až 8. rád pod maticou v Tabuľke 7; pomlčka označuje už zaradenú činnosť). Koncové uzly činností sa číslujú v poradí rádov tak, aby každá hrana viedla z uzla s nižším číslom do uzla s vyšším číslom (i < j).'));")
rep("TCap('Očíslovanie uzlov podľa rádov činností')","TCap('Postup metódy preškrtávania hrán a očíslovanie uzlov')")
rep("[0.8,1.5,4],{leftCols:0,size:19,zebra:true}));\nbody.push(Src('vlastné spracovanie'));",
    "[0.8,1.5,4],{leftCols:0,size:19,zebra:true}));\nbody.push(Src('vlastné spracovanie'));\nbody.push(P('Činnosti sú rozdelené do 9 rádov. Počiatočný uzol má číslo 1, koncový uzol číslo 11. Všetky hrany smerujú od nižšieho čísla uzla k vyššiemu, takže očíslovanie je topologicky správne a umožňuje časovú analýzu postupne od uzla 1 po uzol 11.'));")
rep("body.push(H2('3.5  Časová analýza metodou PERT (úloha 3)'));","body.push(H2('3.4  Časová analýza metodou PERT'));")
rep("body.push(H2('3.6  Pravděpodobnost zkrácení doby realizace projektu o 10 dní (úloha 4)'));","body.push(H2('3.5  Pravděpodobnost zkrácení doby realizace projektu (úloha 4)'));")
rep("body.push(H2('3.7  Plánovaný termín při 10% riziku zpoždění (úloha 5)'));","body.push(H2('3.6  Plánovaný termín při 10% riziku zpoždění (úloha 5)'));")
rep("body.push(H2('3.8  Pravděpodobnost kritičnosti uzlů a činností – incidenční matice (úloha 6)'));","body.push(H2('3.7  Pravděpodobnost kritičnosti uzlů a činností pomocí incidenční matice (úloha 6)'));")
rep("body.push(H2('3.9  Manažerská interpretace výsledků'));","body.push(H2('3.8  Manažerská interpretace výsledků'));")
open('u2/body_sk.js','w').write(s)
