"""
FP DROP — Mobilná aplikácia (Dáta & Katalóg)
Fakulta podnikatelská VUT v Brně
"""

DROPS = [
    {
        "id": "drop-001",
        "code": "DROP 001",
        "title": "FIRST SEMESTER",
        "subtitle": "Nová energia. Čistá tabule. Tvůj univerzitní uniform.",
        "date": "ZÁŘÍ 2026",
        "status": "LIVE",
        "description": "Základní kámen studentského šatníku pro začátek akademického roku na FP VUT. Silné typografické motivy, těžká 240g bavlna a oversized střihy.",
        "themeColor": "#ffffff",
        "campaignHeadline": "YOUR UNIVERSITY. YOUR UNIFORM."
    },
    {
        "id": "drop-002",
        "code": "DROP 002",
        "title": "EXAM SEASON",
        "subtitle": "Kofein v krvi, deadliny v kalendáři a mikina jako útočiště.",
        "date": "LEDEN 2027",
        "status": "COMING_SOON",
        "description": "Kolekce pro přežití zkouškového období na FP. Teplejší materiály, extra pohodlné heavyweight mikiny 450 GSM.",
        "themeColor": "#d4d4d4",
        "campaignHeadline": "NO SLEEP. JUST DEADLINES."
    },
    {
        "id": "drop-003",
        "code": "DROP 003",
        "title": "FP AFTER DARK",
        "subtitle": "Když padne tma nad Brnem a studium jde na chvíli stranou.",
        "date": "BŘEZEN 2027",
        "status": "COMING_SOON",
        "description": "Noční edice pro brněnský noční život a studentské party. Černočerný streetwear s reflexními prvky.",
        "themeColor": "#e5e5e5",
        "campaignHeadline": "BUILT FOR THE BRNO NIGHTS."
    },
    {
        "id": "drop-004",
        "code": "DROP 004",
        "title": "BRNO",
        "subtitle": "Město studentů, funkcionalismu, tramvají a geniálních nápadů.",
        "date": "KVĚTEN 2027",
        "status": "COMING_SOON",
        "description": "Pocta městu, kde studujeme a žijeme. Architektonické linie brněnského brutalismu a funkcionalismu.",
        "themeColor": "#fafafa",
        "campaignHeadline": "MADE IN BRNO. BORN AT FP."
    }
]

PRODUCTS = [
    {
        "id": "prod-01",
        "name": "HOT GIRLS GO TO FP TEE",
        "slogan": "HOT GIRLS\nGO TO FP",
        "category": "T-SHIRTS",
        "garmentType": "tee",
        "price": 349,
        "originalPrice": 399,
        "dropId": "drop-001",
        "status": "LIMITED",
        "color": "Černá (Pure Jet Black)",
        "fit": "Oversized Boxy Fit",
        "material": "100% česaná bio bavlna (240 g/m²)",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "inStock": True,
        "stockCount": 14,
        "description": "Ikonický kousek naší komunity inspirovaný estetikou moderního streetwearu. Těžká organická bavlna, zpevněný límec a výrazná bílá typografie na hrudi.",
        "highlights": [
            "Heavyweight 240 g/m² organická bavlna",
            "Kvalitní sítotisk odolný vůči praní na 30 °C",
            "Unisex uvolněný oversized střih s padlými rameny",
            "Tkaný štítek FP DROP na spodním lemu"
        ],
        "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-02",
        "name": "NO SLEEP TEE",
        "slogan": "NO SLEEP\nJUST DEADLINES",
        "category": "T-SHIRTS",
        "garmentType": "tee",
        "price": 349,
        "originalPrice": None,
        "dropId": "drop-002",
        "status": "NEW",
        "color": "Sytě černá (Jet Black)",
        "fit": "Boxy Heavyweight Fit",
        "material": "100% bavlna (240 g/m²)",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "inStock": True,
        "stockCount": 28,
        "description": "Oficiální uniforma zápočtového týdne a zkouškového maratonu. Vtip, který pochopí každý, kdo někdy psal seminární práci ve tři ráno.",
        "highlights": [
            "Pevná bavlněná gramáž s hedvábným omakem",
            "Typografie ve stylu švýcarského brutalismu",
            "Bezešvé dvojité prošití rukávů a lemu"
        ],
        "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-03",
        "name": "ECTS ARE TEMPORARY TEE",
        "slogan": "ECTS\nARE TEMPORARY",
        "category": "T-SHIRTS",
        "garmentType": "tee",
        "price": 349,
        "originalPrice": None,
        "dropId": "drop-001",
        "status": "AVAILABLE",
        "color": "Charcoal Black",
        "fit": "Classic Drop Shoulder",
        "material": "100% organická bavlna (220 g/m²)",
        "sizes": ["S", "M", "L", "XL"],
        "inStock": True,
        "stockCount": 19,
        "description": "Kredity přijdou a odejdou, ale tvůj osobitý styl zůstane. Minimalistický design pro studenty, kteří znají své priority.",
        "highlights": [
            "Měkký praný sepraný efekt",
            "Potisk sítotiskem na hrudi a zádech",
            "Ekologická certifikace GOTS"
        ],
        "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-04",
        "name": "FP AFTER DARK TEE",
        "slogan": "FP\nAFTER DARK",
        "category": "T-SHIRTS",
        "garmentType": "tee",
        "price": 349,
        "originalPrice": None,
        "dropId": "drop-003",
        "status": "AVAILABLE",
        "color": "Onyx Black",
        "fit": "Oversized Street Fit",
        "material": "100% bavlna (240 g/m²)",
        "sizes": ["M", "L", "XL"],
        "inStock": True,
        "stockCount": 8,
        "description": "Když skončí přednášky na Kolejní a Brno ožije. Vysoce kontrastní bílý sítotisk na prémiovém černém textilu.",
        "highlights": [
            "Reflexní drobný detail vzadu pod límcem",
            "Silný lem u krku, který drží tvar",
            "Unisex střih"
        ],
        "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-13",
        "name": "FP 001 SIGNATURE HOODIE",
        "slogan": "FP 001\nSIGNATURE",
        "category": "HOODIES",
        "garmentType": "hoodie",
        "price": 799,
        "originalPrice": 899,
        "dropId": "drop-001",
        "status": "LIMITED",
        "color": "Černá (Pitch Black)",
        "fit": "Heavyweight Relaxed Boxy",
        "material": "80% česaná bavlna, 20% recyklovaný polyester (420 g/m²)",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "inStock": True,
        "stockCount": 9,
        "description": "Vlajková loď prvního dropu. Poctivá 420g gramáž, dvojitá kapuce držící perfektní tvar a klokaní kapsa se skrytou přihrádkou na ISIC kartu.",
        "highlights": [
            "Ultra-heavy 420 GSM česaný fleece",
            "Dvojitá masivní kapuce bez šňůrek pro čistý profil",
            "Tajná kapsička na ISIC kartu uvnitř klokanky",
            "Kovový zip a zpevněné žebrování"
        ],
        "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-14",
        "name": "EXAM SURVIVOR HOODIE",
        "slogan": "EXAM\nSURVIVOR",
        "category": "HOODIES",
        "garmentType": "hoodie",
        "price": 799,
        "originalPrice": None,
        "dropId": "drop-002",
        "status": "NEW",
        "color": "Uhlová (Charcoal Dark)",
        "fit": "Cozy Oversized Fit",
        "material": "85% organická bavlna, 15% recyklovaný fleece (400 g/m²)",
        "sizes": ["M", "L", "XL"],
        "inStock": True,
        "stockCount": 16,
        "description": "Dokonalý spojenec na dvanáctihodinové studijní seance. Měkký vnitřní fleece a prostorná kapuce, do které se můžeš schovat před světem.",
        "highlights": [
            "Pohodlný volný střih s padlými rameny",
            "Prodyšný a přitom hřejivý materiál",
            "Decentní výšivka na rukávu"
        ],
        "image": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-17",
        "name": "FP DAD CAP",
        "slogan": "FP VUT",
        "category": "ACCESSORIES",
        "garmentType": "cap",
        "price": 249,
        "originalPrice": None,
        "dropId": "drop-001",
        "status": "AVAILABLE",
        "color": "Černá (Washed Twill)",
        "fit": "Unstructured 6-Panel Low Profile",
        "material": "100% bavlna kepr (Chino Twill)",
        "sizes": ["ONE SIZE"],
        "inStock": True,
        "stockCount": 24,
        "description": "Klasická bavlněná kšiltovka s decentní bílou výšivkou loga. Nastavitelný mosazný pásek vzadu a zahnutý kšilt.",
        "highlights": [
            "100% bavlna chino kepr",
            "Kovová spona s gravírovaným logem",
            "Univerzální nastavitelná velikost"
        ],
        "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "prod-19",
        "name": "CAMPUS TOTE BAG",
        "slogan": "FP DROP",
        "category": "ACCESSORIES",
        "garmentType": "tote",
        "price": 149,
        "originalPrice": 199,
        "dropId": "drop-001",
        "status": "AVAILABLE",
        "color": "Přírodní černá",
        "fit": "38 x 42 cm, dlouhá ucha 70 cm",
        "material": "100% těžké bavlněné plátno (340 g/m²)",
        "sizes": ["ONE SIZE"],
        "inStock": True,
        "stockCount": 35,
        "description": "Nezničitelná taška z pevného plátna. Zvládne 16-palcový MacBook, skripta, nabíječku i nákup po cestě ze školy.",
        "highlights": [
            "Nosnost až 15 kg s křížově prošitými uchy",
            "Vnitřní kapsička na klíče a telefon",
            "Ekologická alternativa k plastovým taškám"
        ],
        "image": "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80"
    }
]

STUDENT_PROFILE = {
    "name": "Demo Student (ukážkový profil)",
    "isic": "DEMO-ISIC-0000",
    "faculty": "Fakulta podnikatelská VUT v Brně",
    "studyProgram": "Informační management & Podnikání",
    "campusLocation": "FP VUT campus, Brno (demo location)",
    "ectsCredits": 142,
    "loyaltyLevel": "UKÁŽKOVÝ STATUS (10 % ZĽAVA)",
    "couponCode": "FPVUT10",
    "orderHistory": [
        {
            "orderId": "FP-2026-0891",
            "date": "14. 09. 2026",
            "item": "HOT GIRLS GO TO FP TEE (L)",
            "status": "Doručeno (Zásilkovna Kolejní)",
            "total": "349 Kč"
        }
    ]
}

TRIGGER_SYSTEM = [
    {
        "trigger": "Zahájení semestru (Září)",
        "context": "Prváci a studenti nastupují na Kolejní 29. Hledají sociální status a začlenění.",
        "response": "Launch DROP 001 — 'First Semester'. Důraz na 'HOT GIRLS GO TO FP'.",
        "kpi": "Konverze z Instagram Stories > 4.2%"
    },
    {
        "trigger": "Zkouškové období (Leden)",
        "context": "Stres, kofein, noční práce na projektech.",
        "response": "Launch DROP 002 — 'NO SLEEP JUST DEADLINES' + Heavyweight mikiny 420 GSM.",
        "kpi": "Opakovaný nákup (Repeat Purchase Rate) > 31%"
    }
]
