#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
FP DROP — Kompletní generátor akademického projektu pro VUT FP
Výstup: FP_DROP_projekt_VUT.docx
Cílový rozsah: cca 13 normostran čistého textu bez příloh (cca 23 500 - 25 000 znaků vč. mezer)
"""

import os
import sys
import zipfile
import xml.sax.saxutils

def escape_xml(s):
    return xml.sax.saxutils.escape(str(s))

class DocxBuilder:
    def __init__(self):
        self.paragraphs = []
        self.char_count_with_spaces = 0
        self.char_count_without_spaces = 0

    def add_p(self, text, style="Normal", align=None, bold=False, italic=False, space_before=0, space_after=120, line_spacing=360):
        clean_text = str(text).strip()
        if clean_text:
            self.char_count_with_spaces += len(clean_text) + 1
            self.char_count_without_spaces += len(clean_text.replace(" ", "").replace("\n", ""))

        xml_align = f'<w:jc w:val="{align}"/>' if align else '<w:jc w:val="both"/>'
        xml_pPr = f'''<w:pPr>
            <w:pStyle w:val="{style}"/>
            {xml_align}
            <w:spacing w:before="{space_before}" w:after="{space_after}" w:line="{line_spacing}" w:lineRule="auto"/>
        </w:pPr>'''
        
        xml_rPr = '<w:rPr>'
        xml_rPr += '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>'
        if bold:
            xml_rPr += '<w:b/>'
        if italic:
            xml_rPr += '<w:i/>'
        xml_rPr += '</w:rPr>'

        p_xml = f'''<w:p>
            {xml_pPr}
            <w:r>
                {xml_rPr}
                <w:t xml:space="preserve">{escape_xml(text)}</w:t>
            </w:r>
        </w:p>'''
        self.paragraphs.append(p_xml)

    def add_heading(self, text, level=1):
        clean_text = str(text).strip()
        self.char_count_with_spaces += len(clean_text) + 1
        self.char_count_without_spaces += len(clean_text.replace(" ", "").replace("\n", ""))

        style_name = f"Heading{level}"
        sizes = {1: "32", 2: "28", 3: "24"} # 16pt, 14pt, 12pt
        sz = sizes.get(level, "24")
        space_before = 360 if level == 1 else (240 if level == 2 else 160)
        space_after = 120 if level == 1 else (90 if level == 2 else 60)

        p_xml = f'''<w:p>
            <w:pPr>
                <w:pStyle w:val="{style_name}"/>
                <w:keepNext/>
                <w:spacing w:before="{space_before}" w:after="{space_after}"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
                    <w:b/>
                    <w:sz w:val="{sz}"/>
                    <w:color w:val="0F172A"/>
                </w:rPr>
                <w:t>{escape_xml(text)}</w:t>
            </w:r>
        </w:p>'''
        self.paragraphs.append(p_xml)

    def add_page_break(self):
        self.paragraphs.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')

    def add_placeholder_box(self, label, subtitle=""):
        p_xml = f'''<w:p>
            <w:pPr>
                <w:jc w:val="center"/>
                <w:spacing w:before="180" w:after="180"/>
                <w:pBdr>
                    <w:top w:val="single" w:sz="12" w:space="12" w:color="94A3B8"/>
                    <w:left w:val="single" w:sz="12" w:space="12" w:color="94A3B8"/>
                    <w:bottom w:val="single" w:sz="12" w:space="12" w:color="94A3B8"/>
                    <w:right w:val="single" w:sz="12" w:space="12" w:color="94A3B8"/>
                </w:pBdr>
                <w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/>
            </w:pPr>
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                    <w:b/>
                    <w:sz w:val="22"/>
                    <w:color w:val="334155"/>
                </w:rPr>
                <w:t>{escape_xml(label)}</w:t>
            </w:r>
            <w:r>
                <w:br/>
                <w:rPr>
                    <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                    <w:i/>
                    <w:sz w:val="18"/>
                    <w:color w:val="64748B"/>
                </w:rPr>
                <w:t>{escape_xml(subtitle)}</w:t>
            </w:r>
        </w:p>'''
        self.paragraphs.append(p_xml)

    def add_table(self, title, headers, rows, col_widths=None):
        clean_title = str(title).strip()
        self.char_count_with_spaces += len(clean_title) + 1

        self.add_p(title, style="Normal", bold=True, space_before=140, space_after=60)

        total_width = 9000
        n_cols = len(headers)
        if not col_widths:
            col_widths = [str(int(total_width / n_cols))] * n_cols

        header_cells = []
        for h, w in zip(headers, col_widths):
            header_cells.append(f'''<w:tc>
                    <w:tcPr>
                        <w:tcW w:w="{w}" w:type="dxa"/>
                        <w:shd w:val="clear" w:color="auto" w:fill="0F172A"/>
                        <w:tcMar>
                            <w:top w:w="120" w:type="dxa"/>
                            <w:left w:w="140" w:type="dxa"/>
                            <w:bottom w:w="120" w:type="dxa"/>
                            <w:right w:w="140" w:type="dxa"/>
                        </w:tcMar>
                    </w:tcPr>
                    <w:p>
                        <w:pPr><w:jc w:val="left"/><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                                <w:b/>
                                <w:sz w:val="20"/>
                                <w:color w:val="FFFFFF"/>
                            </w:rPr>
                            <w:t>{escape_xml(h)}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>''')

        grid_cols = "".join(f'<w:gridCol w:w="{w}"/>' for w in col_widths)
        tbl_xml = f'''<w:tbl>
            <w:tblPr>
                <w:tblW w:w="{total_width}" w:type="dxa"/>
                <w:jc w:val="center"/>
                <w:tblBorders>
                    <w:top w:val="single" w:sz="8" w:space="0" w:color="CBD5E1"/>
                    <w:left w:val="none"/>
                    <w:bottom w:val="single" w:sz="12" w:space="0" w:color="334155"/>
                    <w:right w:val="none"/>
                    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>
                    <w:insideV w:val="none"/>
                </w:tblBorders>
            </w:tblPr>
            <w:tblGrid>
                {grid_cols}
            </w:tblGrid>
            <w:tr>
                <w:trPr>
                    <w:tblHeader/>
                    <w:cantSplit/>
                </w:trPr>
                {"".join(header_cells)}
            </w:tr>'''

        for r_idx, row in enumerate(rows):
            bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
            tbl_xml += f'''<w:tr><w:trPr><w:cantSplit/></w:trPr>'''
            for val, w in zip(row, col_widths):
                tbl_xml += f'''<w:tc>
                    <w:tcPr>
                        <w:tcW w:w="{w}" w:type="dxa"/>
                        <w:shd w:val="clear" w:color="auto" w:fill="{bg}"/>
                        <w:tcMar>
                            <w:top w:w="100" w:type="dxa"/>
                            <w:left w:w="140" w:type="dxa"/>
                            <w:bottom w:w="100" w:type="dxa"/>
                            <w:right w:w="140" w:type="dxa"/>
                        </w:tcMar>
                    </w:tcPr>
                    <w:p>
                        <w:pPr><w:jc w:val="left"/><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr>
                        <w:r>
                            <w:rPr>
                                <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
                                <w:sz w:val="20"/>
                                <w:color w:val="1E293B"/>
                            </w:rPr>
                            <w:t>{escape_xml(val)}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>'''
            tbl_xml += '</w:tr>'

        tbl_xml += '</w:tbl>'
        self.paragraphs.append(tbl_xml)
        self.add_p("", space_before=0, space_after=140)

    def build_docx(self, filename):
        content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
</Types>'''

        root_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

        doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
</Relationships>'''

        footer_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:p>
    <w:pPr>
      <w:jc w:val="right"/>
    </w:pPr>
    <w:r>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
        <w:sz w:val="20"/>
        <w:color w:val="64748B"/>
      </w:rPr>
      <w:fldSimple w:instr="PAGE"/>
    </w:r>
  </w:p>
</w:ftr>'''

        settings_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:evenAndOddHeaders w:val="0"/>
</w:settings>'''

        styles_xml = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Times New Roman" w:eastAsia="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
        <w:sz w:val="24"/>
        <w:szCs w:val="24"/>
        <w:color w:val="000000"/>
        <w:lang w:val="cs-CZ"/>
      </w:rPr>
    </w:rPrDefault>
    <w:pPrDefault>
      <w:pPr>
        <w:jc w:val="both"/>
        <w:spacing w:line="360" w:lineRule="auto" w:after="120"/>
      </w:pPr>
    </w:pPrDefault>
  </w:docDefaults>

  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>

  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:keepNext/>
      <w:spacing w:before="360" w:after="140"/>
      <w:jc w:val="left"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="32"/>
      <w:color w:val="0F172A"/>
    </w:rPr>
  </w:style>

  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:keepNext/>
      <w:spacing w:before="240" w:after="100"/>
      <w:jc w:val="left"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="28"/>
      <w:color w:val="1E293B"/>
    </w:rPr>
  </w:style>

  <w:style w:type="paragraph" w:styleId="Heading3">
    <w:name w:val="heading 3"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:keepNext/>
      <w:spacing w:before="160" w:after="60"/>
      <w:jc w:val="left"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="24"/>
      <w:color w:val="334155"/>
    </w:rPr>
  </w:style>
</w:styles>'''

        body_content = "\n".join(self.paragraphs)
        document_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {body_content}
    <w:sectPr>
      <w:footerReference w:type="default" r:id="rId3"/>
      <w:titlePg/>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>'''

        with zipfile.ZipFile(filename, 'w', compression=zipfile.ZIP_DEFLATED) as z:
            z.writestr('[Content_Types].xml', content_types)
            z.writestr('_rels/.rels', root_rels)
            z.writestr('word/_rels/document.xml.rels', doc_rels)
            z.writestr('word/footer1.xml', footer_xml)
            z.writestr('word/settings.xml', settings_xml)
            z.writestr('word/styles.xml', styles_xml)
            z.writestr('word/document.xml', document_xml)

        print(f"✅ Soubor DOCX úspěšně vygenerován: {filename}")
        print(f"📊 Statistika čistého textu:")
        print(f"   - Počet znaků včetně mezer: {self.char_count_with_spaces:,}")
        print(f"   - Počet znaků bez mezer:    {self.char_count_without_spaces:,}")
        print(f"   - Počet normostran (1 NS = 1 800 znaků vč. mezer): {self.char_count_with_spaces / 1800:.2f} NS")

def generate_academic_project():
    doc = DocxBuilder()

    # ==========================================
    # TITULNÍ STRANA
    # ==========================================
    doc.add_p("VYSOKÉ UČENÍ TECHNICKÉ V BRNĚ", align="center", bold=True, space_before=240, space_after=60)
    doc.add_p("FAKULTA PODNIKATELSKÁ", align="center", bold=True, space_before=0, space_after=400)

    doc.add_placeholder_box("[LOGO VUT / FP VUT]", "Oficiální grafický emblém Vysokého učení technického v Brně")

    doc.add_p("ÚSTAV MANAGEMENTU A MARKETINGU", align="center", italic=True, space_before=400, space_after=600)

    doc.add_p("FP DROP – NÁVRH A PROPAGACE MOBILNÍ APLIKACE PRO STUDENTY FAKULTY PODNIKATELSKÉ VUT V BRNĚ",
              align="center", bold=True, space_before=300, space_after=180, line_spacing=400)
    doc.add_p("Semestrální projekt / Návrh digitálního produktu a marketingové strategie",
              align="center", italic=True, space_before=0, space_after=900)

    doc.add_p("Autor projektu:          [JMÉNO AUTORA]", align="left", space_before=600, space_after=60)
    doc.add_p("Studijní program:        [STUDIJNÍ PROGRAM] (Informační management / Podnikání)", align="left", space_before=0, space_after=60)
    doc.add_p("Předmět:                 [NÁZEV PŘEDMĚTU] (Digitální marketing a mobilní technologie)", align="left", space_before=0, space_after=60)
    doc.add_p("Vyučující / Vedoucí:     [JMÉNO VYUČUJÍCÍHO]", align="left", space_before=0, space_after=60)
    doc.add_p("Akademický rok:          [AKADEMICKÝ ROK] (2025/2026)", align="left", space_before=0, space_after=60)
    doc.add_p("Místo vypracování:       Brno", align="left", space_before=0, space_after=240)

    doc.add_page_break()

    # ==========================================
    # OBSAH
    # ==========================================
    doc.add_heading("Obsah", level=1)
    doc.add_p("1. Úvod ......................................................................................................................................... 3", space_after=60)
    doc.add_p("2. Základní specifikace aplikace a cílový segment ................................................................... 4", space_after=60)
    doc.add_p("   2.1 Vymezení produktu FP DROP a řešená problematika .................................................... 4", space_after=60)
    doc.add_p("   2.2 Segmentace uživatelů a studentská komunita FP VUT ................................................ 5", space_after=60)
    doc.add_p("   2.3 Uživatelská persona a motivační faktory ...................................................................... 6", space_after=60)
    doc.add_p("3. Prototyp mobilní aplikace .................................................................................................... 7", space_after=60)
    doc.add_p("   3.1 Technické řešení a systémová architektura ................................................................. 7", space_after=60)
    doc.add_p("   3.2 Uživatelské rozhraní a ergonomie ovládání ................................................................. 8", space_after=60)
    doc.add_p("   3.3 Funkční princip prototypu a transakční logika .............................................................. 9", space_after=60)
    doc.add_p("   3.4 Možnosti dalšího rozvoje a produkční roadmapa ........................................................... 10", space_after=60)
    doc.add_p("4. Přístup k tvorbě business profilu ......................................................................................... 11", space_after=60)
    doc.add_p("   4.1 Koncepce webové prezentace a informační architektura ............................................... 11", space_after=60)
    doc.add_p("   4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity ................................. 12", space_after=60)
    doc.add_p("5. Přístup k tvorbě obsahu pro sociální sítě ............................................................................ 13", space_after=60)
    doc.add_p("   5.1 Strategie působení na síti Instagram .............................................................................. 13", space_after=60)
    doc.add_p("   5.2 Obsahové formáty, publikační harmonogram a tón komunikace .................................. 14", space_after=60)
    doc.add_p("   5.3 Případová ukázka příspěvku a storyboard krátkého videa ............................................. 15", space_after=60)
    doc.add_p("6. Přístup k PPC reklamě ........................................................................................................... 16", space_after=60)
    doc.add_p("   6.1 Strategické cíle a detailní zacílení kampaně v Brně ..................................................... 16", space_after=60)
    doc.add_p("   6.2 Modelový rozpočet a odhad výkonnostních ukazatelů .................................................... 17", space_after=60)
    doc.add_p("   6.3 Metodika A/B testování a porovnání kreativních variant ............................................... 18", space_after=60)
    doc.add_p("7. Customer Journey / STDC framework ................................................................................... 19", space_after=60)
    doc.add_p("   7.1 Fáze zákaznické cesty v kontextu studentského segmentu ............................................ 19", space_after=60)
    doc.add_p("   7.2 Matice STDC frameworku pro FP DROP ........................................................................... 20", space_after=60)
    doc.add_p("8. Vyhodnocování a měření ....................................................................................................... 21", space_after=60)
    doc.add_p("   8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace .................................................. 21", space_after=60)
    doc.add_p("   8.2 Vyhodnocovací cyklus a optimalizační hypotézy ........................................................... 22", space_after=60)
    doc.add_p("9. Závěr ........................................................................................................................................ 23", space_after=60)
    doc.add_p("10. Seznam použitých zdrojů ..................................................................................................... 24", space_after=60)
    doc.add_p("11. Přílohy .................................................................................................................................... 25", space_after=180)

    doc.add_page_break()

    # ==========================================
    # 1. ÚVOD
    # ==========================================
    doc.add_heading("1. Úvod", level=1)
    
    doc.add_p(
        "Vysokoškolské prostředí prochází v posledních letech zásadní proměnou v oblasti komunikace mezi institucí "
        "a jejími studenty. Nastupující generace studentů, primárně reprezentovaná generací Z, vykazuje výrazně odlišné "
        "vzorce chování při konzumaci informací ve srovnání s předchozími ročníky. Tradiční formální kanály, jako jsou "
        "oficiální univerzitní webové nástěnky, hromadné e-mailové zprávy nebo nepřehledné informační systémy, se setkávají "
        "s klesající mírou pozornosti a nízkou mírou zapojení (engagementu). Studenti požadují bezprostřední, vizuálně "
        "atraktivní a především mobilně orientovaný obsah, který odpovídá jejich životnímu stylu a dynamice studentského života."
    )
    doc.add_p(
        "Mobilní aplikace v tomto kontextu nepředstavují pouze další distribuční kanál, nýbrž klíčový styčný bod celého "
        "digitálního ekosystému. Schopnost doručit personalizovanou notifikaci, nabídnout interaktivní katalog, umožnit "
        "rychlou objednávku na jedno kliknutí a poskytnout zázemí pro komunitní identifikaci je pro moderní vzdělávací "
        "a přidružené komerční aktivity zásadní. Právě na pomezí komunitního života, moderního vysokoškolského marketingu "
        "a e-commerce vzniká projekt FP DROP, který je primárně zacílen na studenty a přátele Fakulty podnikatelské "
        "Vysokého učení technického v Brně (FP VUT)."
    )
    doc.add_p(
        "Fakulta podnikatelská VUT, sídlící v moderním univerzitním kampusu Pod Palackého vrchem na adrese Kolejní 29, "
        "sdružuje více než 3 000 studentů v bakalářských, magisterských a doktorských programech zaměřených na ekonomiku, "
        "management, systémové inženýrství a informatiku. Přestože fakulta disponuje silným akademickým zázemím a aktivním "
        "akademickým spolkem, dosud postrádala moderní, ucelený digitální nástroj, který by integroval studentský lifestyle, "
        "autentický streetwearový merch, aktuální časové kapacity semestru (deadliny, zápočty, zkoušková období) a přímou "
        "mobilní interakci. Výrobky s univerzitní tématikou byly často distribuovány nárazově, fyzicky či přes zastaralá "
        "webová rozhraní postrádající emocionální náboj a studentskou nadsázku."
    )
    doc.add_p(
        "Hlavním cílem tohoto semestrálního projektu je komplexní návrh, prototypový vývoj a marketingová strategie "
        "mobilní aplikace FP DROP. Projekt pokrývá celý životní cyklus digitálního produktu od analýzy cílové skupiny "
        "přes funkční prototypování v jazyce Python ve vývojovém prostředí Visual Studio Code až po návrh akviziční "
        "PPC kampaně, obsahového marketingu a frameworku zákaznické cesty (STDC). Výsledkem předkládané práce je "
        "funkční softwarový artefakt doprovázený rigorózní marketingovou a analytickou studií, připravenou k praktickému "
        "nasazení na půdě Fakulty podnikatelské VUT v Brně."
    )

    doc.add_page_break()

    # ==========================================
    # 2. ZÁKLADNÍ SPECIFIKACE APLIKACE A CÍLOVÝ SEGMENT
    # ==========================================
    doc.add_heading("2. Základní specifikace aplikace a cílový segment", level=1)

    doc.add_heading("2.1 Vymezení produktu FP DROP a řešená problematika", level=2)
    doc.add_p(
        "FP DROP je koncipován jako specializovaná mobilní komunitní a e-commerce platforma určená pro studenty, vyučující "
        "a absolventy Fakulty podnikatelské VUT. Jádrem konceptu je princip tzv. limitovaných edicí neboli „dropů“. "
        "Místo celoročního nabízení statického, generického merche pracuje platforma s časově ohraničenými kolekcemi, "
        "které reagují na biorytmus akademického roku na Kolejní 29. Jednotlivé dropy (např. DROP 001 – First Semester, "
        "DROP 002 – Exam Season, DROP 003 – FP After Dark a DROP 004 – Brno Brutalism) odrážejí aktuální prožívání "
        "studentů – od euforie a seznamování v září přes kofeinem sycené deadliny v lednu až po jarní studentské večírky."
    )
    doc.add_p(
        "Projekt reaguje na tři hlavní problémy současného stavu. Prvním problémem je roztříštěnost komunikace: "
        "informace o studentských aktivitách a komunitních předmětech jsou rozptýleny mezi neoficiální skupiny na sociálních "
        "sítích, univerzitní e-maily a fyzické nástěnky. Druhým problémem je nízká atraktivita a zastaralost dosavadního "
        "merchandisingu, který nerespektuje soudobé streetwearové trendy (oversized boxy střihy, těžká gramáž 240–420 GSM, "
        "čistá brutalistická typografie). Třetím problémem je absence přímého distribučního kanálu s nulovým poštovným, "
        "který by využíval přirozenou koncentraci studentů v areálu kampusu Pod Palackého vrchem."
    )

    doc.add_heading("2.2 Segmentace uživatelů a studentská komunita FP VUT", level=2)
    doc.add_p(
        "Pro potřeby návrhu mobilní aplikace a navazující marketingové strategie byla provedena podrobná segmentace "
        "uživatelské báze. Z hlediska demografických a behaviorálních charakteristik dělíme uživatele do tří segmentů:"
    )
    doc.add_p(
        "1. Primární segment – Aktivní studenti prezenčního studia FP VUT (cca 2 200 osob): Studenti ve věku 19 až 25 let, "
        "kteří denně navštěvují přednášky a semináře v budovách P2, P3 a P4 na Kolejní 29 nebo bydlí na přilehlých vysokoškolských "
        "kolejích Pod Palackého vrchem. Tento segment vykazuje intenzivní využívání chytrých telefonů (průměrný screen time přesahuje "
        "5,5 hodiny denně), preferuje rychlé nákupy přes Apple Pay / Google Pay, citlivě vnímá slevové akce navázané na průkaz ISIC "
        "a aktivně buduje svou sociální identitu v rámci ročníku."
    )
    doc.add_p(
        "2. Sekundární segment – Kombinovaní studenti a čerství absolventi (cca 1 000 osob): Studenti kombinované formy studia "
        "a absolventi v horizontu 1 až 3 let po ukončení studia. Na fakultu docházejí nárazově (páteční a sobotní bloky), mají "
        "vlastní finanční příjem a nákup vnímají především jako nostalgické gesto, vyjádření sounáležitosti s alma mater nebo "
        "součást profesního networkingu."
    )
    doc.add_p(
        "3. Terciární segment – Uchazeči o studium a středoškoláci (cca 3 500 osob ročně): Návštěvníci Dnů otevřených dveří, "
        "veletrhu Gaudeamus Brno a sledující sociálních sítí. V aplikaci hledají autentický pohled do zákulisí fakulty a neformální "
        "studentskou kulturu, která často rozhoduje o volbě vysoké školy."
    )

    doc.add_heading("2.3 Uživatelská persona a motivační faktory", level=2)
    doc.add_p(
        "Na základě hloubkového porozumění primárnímu segmentu byla vytvořena detailní uživatelská persona, která sloužila "
        "jako referenční bod při definování funkčních požadavků na prototyp mobilní aplikace a tón marketingové komunikace."
    )

    doc.add_table(
        "Tabulka 1: Uživatelská persona studenta Fakulty podnikatelské VUT v Brně",
        ["Parametr", "Charakteristika persony"],
        [
            ["Jméno a věk", "Bc. Martin Dvořák, 22 let"],
            ["Role a ročník", "Student 1. ročníku navazujícího magisterského studia, obor Informační management, FP VUT"],
            ["Bydliště a lokalita", "Fiktivní studentská lokalita v Brně"],
            ["Technologické vybavení", "iPhone 15 Pro, MacBook Air M2, Apple Watch. 100% mobilní komunikace."],
            ["Používané platformy", "Instagram (Reels), TikTok, WhatsApp, Discord, Spotify, IS VUT."],
            ["Cíle a motivace", "Úspěšně absolvovat semestr, vybudovat síť kontaktů, vypadat dobře na kampusu i večer v centru Brna, nosit kvalitní oblečení reprezentující jeho fakultu s nadsázkou."],
            ["Frustrace a překážky", "Nepřehledný informační systém, neosobní a formální komunikace fakulty, nudný a nekvalitní promo merch z tenkého textilu, nutnost platit poštovné za věci, které by mohl vyzvednout na vrátnici."],
            ["Vztah k FP DROP", "Aplikaci stahuje kvůli okamžitému přístupu k limitovanému dropu triček 'HOT GIRLS GO TO FP', možnosti využít 10% slevu na ISIC a osobnímu odběru zdarma na Kolejní 29."]
        ],
        ["2800", "6200"]
    )

    doc.add_p(
        "Z tabulky persony jednoznačně vyplývá, že hodnota aplikace FP DROP spočívá v syntéze komunitního pocitu sounáležitosti "
        "a maximální transakční jednoduchosti. Aplikace nesmí působit jako korporátní e-shop, ale jako studentský kapesní průvodce "
        "životem na FP VUT."
    )

    doc.add_page_break()

    # ==========================================
    # 3. PROTOTYP MOBILNÍ APLIKACE
    # ==========================================
    doc.add_heading("3. Prototyp mobilní aplikace", level=1)

    doc.add_heading("3.1 Technické řešení a systémová architektura", level=2)
    doc.add_p(
        "Prototyp mobilní aplikace FP DROP byl kompletně navržen a implementován v programovacím jazyce Python (verze 3.10+) "
        "v integrovaném vývojovém prostředí Visual Studio Code (VS Code). Volba Pythonu pro vývoj prototypu byla motivována "
        "vysokou rychlostí iterace, transparentní čitelností kódu a možností nabídnout studentům a hodnotitelům více režimů běhu "
        "bez nutnosti složitého instalování těžkopádných nativních mobilních SDK (jako Android Studio nebo Xcode)."
    )
    doc.add_p(
        "Zdrojový kód aplikace je strukturován do samostatného modulu `python_mobile_app/`, který obsahuje následující klíčové komponenty:"
    )
    doc.add_p(
        "• `main.py`: Vstupní bod a koordinátor aplikace. Obsahuje CLI rozhraní (pomocí knihovny `argparse`), které zpracovává "
        "spouštěcí argumenty `--web`, `--flet` a volitelný parametr `--port`. Soubor rovněž implementuje inteligentní fallback logiku: "
        "pokud uživatel zvolí spuštění nativního GUI přes moderní framework Flet (`--flet`), avšak daná knihovna není v systémovém "
        "prostředí nainstalována, aplikace nevypíše fatální chybu, ale automaticky přepne na bezbarierový Web Mobile Simulator."
    )
    doc.add_p(
        "• `app_web.py`: Nativní emulátor mobilního zařízení iPhone 16 Pro běžící na vestavěném HTTP serveru Pythonu (`http.server` "
        "a `socketserver`). Tato komponenta má naprosto nulové externí závislosti (Zero External Dependencies) a funguje na jakékoliv "
        "čisté instalaci Pythonu. Server dynamicky serializuje datové modely do JSONu, injektuje je do responzivní mobilní šablony "
        "využívající Tailwind CSS a zajišťuje hladký běh na lokálním portu 5050. Součástí je automatické otevření systémového prohlížeče "
        "při startu (`webbrowser.open`)."
    )
    doc.add_p(
        "• `app_flet.py`: Alternativní nativní implementace využívající moderní framework Flet (postavený na jádře Flutter pro Python). "
        "Tento režim umožňuje kompilaci do nativního desktopového a mobilního okna s podporou hardwarové akcelerace, nativních gest "
        "a přepínání temného režimu (Dark Mode)."
    )
    doc.add_p(
        "• `data.py`: Centralizovaný datový model obsahující strukturované katalogy produktů (`PRODUCTS`), harmonogram a popisy edicí "
        "(`DROPS`), studentský profil (`STUDENT_PROFILE`) včetně věrnostního programu a provázání na akademický trigger systém."
    )
    doc.add_p(
        "• `.vscode/launch.json` a `run_app.bat`: Konfigurační soubory pro komfortní spuštění ve vývojovém prostředí. Pro uživatele "
        "VS Code je připraven debug profil umožňující start stiskem jediné klávesy F5. Pro prostředí Windows je vytvořen spouštěcí "
        "skript `run_app.bat`, který automaticky detekuje systémové příkazy `py`, `python` a `python3` a eliminuje známé potíže "
        "s přesměrováním na Microsoft Store."
    )

    doc.add_heading("3.2 Uživatelské rozhraní a ergonomie ovládání", level=2)
    doc.add_p(
        "Uživatelské rozhraní prototypu striktně respektuje ergonomické standardy moderních operačních systémů iOS a Android. "
        "Vizuální jazyk byl navržen v souladu s brutalistickou estetikou streetwearové značky FP DROP: hluboké černé pozadí "
        "(Jet Black #050505), vysoce kontrastní bílé typografické prvky (fonty Space Grotesk a JetBrains Mono), doplňková "
        "akcentní smaragdová barva (#10B981) indikující skladovou dostupnost a subtilní mikrointerakce."
    )
    doc.add_p(
        "Pohyb v aplikaci je zprostředkován spodní navigační lištou (Bottom Navigation Bar), která obsahuje pět primárních záložek:"
    )
    doc.add_p(
        "1. HOME (Úvodní obrazovka): Obsahuje dynamický hero banner právě probíhajícího dropu (DROP 001 – FIRST SEMESTER) "
        "s pulzujícím indikátorem 'SKLADEM V BRNĚ', rychlý widget se studentským slevovým kódem FPVUT10 (10% sleva s možností "
        "zkopírování do schránky jedním kliknutím) a mřížku čtyř nejpopulárnějších produktů."
    )
    doc.add_p(
        "2. SHOP (Katalóg s filtrami): Přehledný dvousloupcový mobilní grid s rychlými kategoriálními filtry (ALL, T-SHIRTS, "
        "HOODIES, ACCESSORIES). Každá produktová karta zobrazuje status kusu (LIMITED / NEW), název, cenu v Kč, gramáž materiálu "
        "a tlačítko pro rychlé vložení výchozí velikosti do košíku."
    )
    doc.add_p(
        "3. DROPS (Časová osa limitovaných edicí): Vertikální časová osa prezentující ediční plán pro celý akademický rok. "
        "Studenti zde vidí nejen minulé a aktuální dropy, ale i připravované kolekce s přesným termínem uvedení a koncepčním sloganem."
    )
    doc.add_p(
        "4. WISHLIST (Oblíbené položky): Interaktivní správa uložených kousků. Uživatel může kliknutím na ikonu srdce kdykoliv "
        "přidat nebo odebrat libovolný produkt, přičemž stav se okamžitě synchronizuje napříč celou aplikací."
    )
    doc.add_p(
        "5. PROFIL (Studentské konto): Personalizovaná obrazovka zobrazující identitu studenta (Demo Student, sample ISIC: DEMO-ISIC-0000), "
        "úroveň ve věrnostním systému (VIP SENIOR), počet získaných ECTS kreditů (142 ECTS) a historii předchozích objednávek "
        "s možností sledování stavu doručení na Kolejní 29."
    )

    doc.add_heading("3.3 Funkční princip prototypu a transakční logika", level=2)
    doc.add_p(
        "Prototyp disponuje plně interaktivní stavovou logikou implementovanou na klientské straně simulátoru. Uživatel může "
        "otevřít detail libovolného produktu, kde se zobrazí fotogalerie s čistou bílou typografií bez rušivých šedých stínů, "
        "podrobná materiálová specifikace (např. 100% česaná bio bavlna 240 g/m² nebo 420 GSM fleece u mikin), přesný počet "
        "zbývajících kusů na skladě v Brně a interaktivní volič velikostí (XS až XXL)."
    )
    doc.add_p(
        "Nákupní košík (Cart) dynamicky sčítá položky, umožňuje měnit kusy či odebírat produkty a automaticky aplikuje "
        "studentskou slevu ve výši 10 %. Doprava je při volbě osobního odběru v areálu FP VUT (Kolejní 29) nastavena jako "
        "trvale bezplatná (0 Kč). Objednávkový proces je zakončen akcí '1-Click Zaplatit', která provede simulaci platební "
        "transakce, vyprázdní košík, vyvolá potvrzovací notifikaci a přesměruje uživatele do historie objednávek v profilu."
    )

    doc.add_heading("3.4 Možnosti dalšího rozvoje a produkční roadmapa", level=2)
    doc.add_p(
        "Současná podoba prototypu představuje plnohodnotný 'proof-of-concept' ověřující uživatelskou přívětivost, informační "
        "architekturu a vizuální identitu. Pro přechod do ostrého produkčního provozu je navržena následující technická roadmapa:"
    )
    doc.add_p(
        "• Backendová infrastruktura a databáze: Přechod od statického souboru `data.py` k robustnímu REST API / GraphQL backendu "
        "postavenému na frameworku FastAPI (Python) nebo Node.js s relační databází PostgreSQL a cachovací vrstvou Redis."
    )
    doc.add_p(
        "• Autentizace přes univerzitní systém IS VUT: Implementace protokolu OAuth 2.0 / Shibboleth, který umožní studentům "
        "přihlašovat se prostřednictvím jejich oficiálního VUT loginu. Tím bude zajištěno automatické a stoprocentně spolehlivé "
        "ověření platnosti statusu studenta a nároku na slevu bez nutnosti ručního zadávání kódů."
    )
    doc.add_p(
        "• Push notifikace a real-time eventy: Nasazení technologie Firebase Cloud Messaging (FCM) pro okamžité informování "
        "o uvolnění nového dropu do prodeje (tzv. Drop Alarm), blížícím se vyprodání velikostí a oznámení o připravenosti balíčku "
        "k vyzvednutí na recepci Kolejní 29."
    )
    doc.add_p(
        "• Integrace platební brány: Napojení certifikované platební brány (Stripe / Comgate / Apple Pay / Google Pay) splňující "
        "standard PCI-DSS pro bezpečné a okamžité online platby."
    )

    doc.add_page_break()

    # ==========================================
    # 4. PŘÍSTUP K TVORBĚ BUSINESS PROFILU
    # ==========================================
    doc.add_heading("4. Přístup k tvorbě business profilu", level=1)

    doc.add_heading("4.1 Koncepce webové prezentace a informační architektura", level=2)
    doc.add_p(
        "Mobilní aplikace FP DROP nemůže existovat ve vakuu; její úspěch je podmíněn existencí reprezentativního webového "
        "business profilu (landing page), který slouží jako primární konverzní brána pro desktopové uživatele, vyhledávače "
        "a externí marketingové kampaně. Webová prezentace plní funkci oficiálního informačního uzlu, buduje důvěryhodnost "
        "značky a přímo stimuluje stažení mobilní aplikace."
    )
    doc.add_p(
        "Informační architektura webu byla navržena jako jednostránková responzivní landing page (Single Page Application) "
        "s jasnou vizuální hierarchií a následující strukturou sekcí:"
    )
    doc.add_p(
        "1. Hero sekce (Úvod): Dominantní typografický claim 'YOUR UNIVERSITY. YOUR UNIFORM.', velkoformátová fotografie "
        "reálného studenta v tričku z aktuální kolekce, odpočet do konce právě běžícího dropu a primární Call-to-Action tlačítka "
        "'Stáhnout mobilní aplikaci' (App Store / Google Play odznaky) a 'Prozkoumat kolekci'."
    )
    doc.add_p(
        "2. O projektu a filozofie FP DROP: Stručné představení myšlenky komunitního streetwearu pro FP VUT. Důraz na udržitelnou "
        "produkci (100% bio bavlna, lokální sítotisk v Brně, etická výroba) a hrdost na fakultu sídlící na Kolejní 29."
    )
    doc.add_p(
        "3. Interaktivní přehled funkcí aplikace: Prezentace klíčových výhod mobilní aplikace – přednostní přístup k limitovaným "
        "dropům o 24 hodin dříve než na webu, automatická ISIC sleva 10 %, sledování stavu přípravy objednávky a push notifikace."
    )
    doc.add_p(
        "4. Lookbook & Aktuální Drop: Vizuální galerie modelů přímo z areálu kampusu Pod Palackého vrchem, studentských kolejí "
        "a Technologického parku. Zákazník vidí reálné proporce střihů a detaily materiálů."
    )
    doc.add_p(
        "5. Studentská zóna & FAQ: Odpovědi na nejčastější dotazy týkající se velikostí, způsobů osobního odběru na fakultě, "
        "možností výměny nevhodné velikosti a postupu při uplatnění studentského slevového kódu."
    )
    doc.add_p(
        "6. Zápatí (Footer) s rychlými odkazy: Kontaktní údaje, přímé propojení na sociální sítě (@fp_drop), odkaz na stažení "
        "projektové dokumentace a interaktivní spuštění mobilního simulátoru."
    )

    doc.add_heading("4.2 Analytická infrastruktura: Google Analytics 4 a Microsoft Clarity", level=2)
    doc.add_p(
        "Pro kontinuální optimalizaci konverzního poměru (CRO) a pochopení chování návštěvníků je web vybaven pokročilým "
        "analytickým měřením. Byla zvolena kombinace kvantitativního nástroje Google Analytics 4 (GA4) a behaviorálního "
        "nástroje Microsoft Clarity."
    )
    doc.add_p(
        "Google Analytics 4 je konfigurován prostřednictvím Google Tag Manageru (GTM) pro sledování klíčových mikro a makro "
        "konverzí formou událostí (Custom Events):"
    )
    doc.add_p(
        "• `app_download_click`: Kliknutí na odkaz ke stažení mobilní aplikace s rozlišením platformy (iOS vs. Android).\n"
        "• `coupon_copied`: Zkopírování slevového kódu FPVUT10 do schránky.\n"
        "• `view_item_detail`: Zobrazení detailní specifikace konkrétního kusu oblečení.\n"
        "• `simulator_opened`: Spuštění vestavěného mobilního simulátoru přímo na webu."
    )
    doc.add_p(
        "Microsoft Clarity doplňuje číselná data o hluboký vhled do uživatelské zkušenosti pomocí teplotních map (heatmaps) "
        "a anonymizovaných nahrávek relací (session recordings). Nástroj umožňuje identifikovat tzv. 'dead clicks' (kliknutí "
        "na prvky, které uživatel mylně považuje za interaktivní) a 'rage clicks' (opakované frustrované klikání při pomalé odezvě), "
        "což poskytuje okamžitou zpětnou vazbu pro úpravu rozvržení prvků a zkrácení konverzní cesty."
    )

    doc.add_page_break()

    # ==========================================
    # 5. PŘÍSTUP K TVORBĚ OBSAHU PRO SOCIÁLNÍ SÍTĚ
    # ==========================================
    doc.add_heading("5. Přístup k tvorbě obsahu pro sociální sítě", level=1)

    doc.add_heading("5.1 Strategie působení na síti Instagram", level=2)
    doc.add_p(
        "Sociální sítě představují pro projekt FP DROP primární akviziční i retenční kanál. Na základě analýzy chování "
        "cílové skupiny byl jako hlavní platforma vybrán Instagram (doplněný o sekundární organické působení na síti TikTok). "
        "Instagram v segmentu vysokoškoláků ve věku 19–25 let v České republice dosahuje přes 84% penetrace a slouží studentům "
        "jako primární vizuální vyhledávač módních trendů a komunitního dění."
    )
    doc.add_p(
        "Strategie profilu `@fp_drop` je postavena na principu absolutní autenticity. Značka se striktně vyhýbá sterilním "
        "produktovým fotografiím z fotobank a formálnímu akademickému jazyku. Místo toho využívá estetiku 'lo-fi' fotografie, "
        "záběry focené na analogové 35mm kinofilmy přímo v prostorách Fakulty podnikatelské (chodby, posluchárna P384, respirium, "
        "areál kolejí Pod Palackého vrchem) a zapojuje skutečné studenty FP VUT v rolích modelů a tvůrců obsahu."
    )

    doc.add_heading("5.2 Obsahové formáty, publikační harmonogram a tón komunikace", level=2)
    doc.add_p(
        "Obsahový plán kombinuje tři základní formáty sociální sítě Instagram:"
    )
    doc.add_p(
        "1. Instagram Reels (Krátká dynamická videa, frekvence 3× týdně): Formát s nejvyšším organickým virálním dosahem. "
        "Zaměřuje se na studentský humor, parodie na zápočtový týden a zkouškové období, dynamické představení nového merche "
        "a 'day in the life' střípky ze studia na FP VUT. Videa využívají aktuální trending audio stopy."
    )
    doc.add_p(
        "2. Instagram Stories (Denní komunikace, 4–8 stories denně): Interaktivní formát pro udržení denní pozornosti. Využívá "
        "funkce anket, kvízů o fakultě, odpočtů do spuštění dropu (Countdown Sticker), zákulisních pohledů z výroby textilu "
        "a repostů obsahu vytvářeného samotnými studenty (User Generated Content – UGC)."
    )
    doc.add_p(
        "3. Karuselové příspěvky ve feedu (1–2× týdně): Detailní produktové lookbooky prezentující střihy, tabulky velikostí, "
        "reálnou gramáž látek a textové příběhy stojící za jednotlivými slogany."
    )
    doc.add_p(
        "Tón komunikace (Tone of Voice) je sebevědomý, odlehčený, studentsky neformální, avšak nikdy vulgární či dehonestující. "
        "Pracuje s nadsázkou, interními fakultními reáliemi (např. 'ECTS are temporary, drip is forever', 'Fronta na kafe v respiriu') "
        "a buduje pocit hrdosti na příslušnost k podnikatelské komunitě."
    )

    doc.add_heading("5.3 Případová ukázka příspěvku a storyboard krátkého videa", level=2)
    doc.add_p(
        "Pro ilustraci praktické aplikace obsahové strategie uvádíme konkrétní specifikaci organického příspěvku a storyboard "
        "propagačního videa Reels určeného pro zahájení semestru:"
    )
    doc.add_p(
        "Návrh feed příspěvku (Karusel – 3 snímky):\n"
        "• Vizuál: Snímek 1 – Dvojice studentů opírající se o zábradlí před fakultou P2 na Kolejní 29 v tričkách 'HOT GIRLS GO TO FP' "
        "a mikině 'EXAM SURVIVOR'. Snímek 2 – Makro detail vyšitého štítku a hutné 240g bavlny. Snímek 3 – Grafika mobilní aplikace "
        "s aktivním slevovým kódem.\n"
        "• Doprovodný text (Copywriting): 'Semestr oficiálně začal. Starý sešity vyhozený, nový předměty zapsaný a tvůj šatník "
        "potřebuje upgrade. DROP 001 právě přistál v mobilní aplikaci FP DROP. 100% bio bavlna, oversized střih a nulový poštovný "
        "při vyzvednutí na Kolejní 29. Zadej kód FPVUT10 a ušetři 10 % s ISICem. Odkaz na stažení v biu.'\n"
        "• Hashtagy: #FPVUT #VUTvBrne #FakultaPodnikatelska #Kolejni29 #BrnoStudents #FPDROP #StudentStreetwear"
    )
    doc.add_p(
        "Storyboard krátkého videa (Instagram Reels / TikTok – stopáž 15 sekund):\n"
        "• 0:00–0:03 (Hook): Záběr na studenta běžícího po schodech na Kolejní 29 s kelímkem kávy. Text na displeji: 'Když máš za 2 minuty "
        "přednášku z managementu, ale outfit musí být 10/10.'\n"
        "• 0:03–0:08 (Dynamický střih do rytmu hudby): Rychlé přechody různých studentů v prostorách fakulty ukazující detaily triček "
        "a mikin FP DROP v reálném pohybu.\n"
        "• 0:08–0:12 (Představení aplikace): Pohled na displej iPhonu – otevření aplikace FP DROP, přidání trička do košíku jedním klikem "
        "a výběr vyzvednutí 'Kolejní 29 – Osobní odběr zdarma'.\n"
        "• 0:12–0:15 (Call to Action): Závěrečný packshot s logem aplikace a textem: 'Stahuj aplikaci FP DROP. Limitovaná edice DROP 001 LIVE.'"
    )

    doc.add_page_break()

    # ==========================================
    # 6. PŘÍSTUP K PPC REKLAMĚ
    # ==========================================
    doc.add_heading("6. Přístup k PPC reklamě", level=1)

    doc.add_heading("6.1 Strategické cíle a detailní zacílení kampaně v Brně", level=2)
    doc.add_p(
        "Placená výkonnostní reklama (PPC) plní v projektu FP DROP roli akceleračního nástroje při spouštění nových dropů. "
        "Jelikož je rozpočet studentského projektu limitovaný, kampaň nesmí plýtvat prostředky na široké celorepublikové cílení, "
        "ale musí být hyper-lokálně a zájmově zacílena na relevantní komunitu v Brně."
    )
    doc.add_p(
        "Kampaň je realizována prostřednictvím reklamního systému Meta Ads (Facebook a Instagram) s primárním umístěním v Instagram "
        "Stories a Instagram Reels, které vykazují u dané demografické skupiny nejnižší cenu za proklik (CPC) a nejvyšší míru zaujetí."
    )
    doc.add_p(
        "Parametry cílení v Meta Ads Manageru:\n"
        "• Geografické zacílení: Město Brno a okolí do 15 km se zvýšenou vahou na lokalitu Královo Pole / Medlánky (radius 2 km "
        "kolem kampusu Pod Palackého vrchem, Kolejní 29, PSČ 612 00).\n"
        "• Věk a jazyk: 18–26 let, jazyk čeština a slovenština (zohlednění početné slovenské studentské komunity na VUT).\n"
        "• Zájmové cílení a chování: Vysokoškolské vzdělávání, Vysoké učení technické v Brně, Fakulta podnikatelská VUT, streetwear, "
        "městská móda, studenti vysokých škol.\n"
        "• Vyloučení: Uživatelé mimo věkovou kategorii 18–26 let a uživatelé trvale žijící mimo Jihomoravský kraj."
    )

    doc.add_heading("6.2 Modelový rozpočet a odhad výkonnostních ukazatelů", level=2)
    doc.add_p(
        "Pro úvodní akviziční vlnu trvající 30 dní (spojenou se zahájením akademického roku a představením DROP 001) byl navržen "
        "modelový měsíční rozpočet ve výši 15 000 Kč. Rozpočet je rozdělen do tří funkčních fází podle konverzního trychtýře."
    )

    doc.add_table(
        "Tabulka 2: Modelový rozpočet a odhad výkonnostních ukazatelů PPC kampaně (30 dní)",
        ["Fáze kampaně", "Podíl rozpočtu", "Částka (Kč)", "Plánované zobrazení (Impression)", "Očekávané CPC", "Očekávané CTR", "Cílové konverze (Kliky / Instalace)"],
        [
            ["1. Awareness (Povědomí o aplikaci)", "35 %", "5 250 Kč", "175 000", "2,50 Kč", "1,2 %", "2 100 kliknutí na odkaz"],
            ["2. Traffic & Install (Návštěvnost / Stažení)", "45 %", "6 750 Kč", "135 000", "3,80 Kč", "1,8 %", "1 776 prokliků / 530 instalací"],
            ["3. Retargeting (Opuštěný košík / Nákup)", "20 %", "3 000 Kč", "30 000", "6,50 Kč", "3,2 %", "460 prokliků / 95 objednávek"],
            ["CELKEM MODELOVÁ KAMPAŇ", "100 %", "15 000 Kč", "340 000", "3,65 Kč (průměr)", "1,85 % (průměr)", "4 336 návštěv / 625 aktivací"]
        ],
        ["2000", "1100", "1100", "1300", "1100", "1100", "1300"]
    )

    doc.add_p(
        "Modelovaný rozpočet počítá s průměrnou cenou za tisíc zobrazení (CPM) ve výši cca 30–45 Kč, což odpovídá standardním "
        "aukčním cenám pro studentský segment v Brně mimo hlavní vánoční nákupní sezónu."
    )

    doc.add_heading("6.3 Metodika A/B testování a porovnání kreativních variant", level=2)
    doc.add_p(
        "Klíčovým prvkem optimalizace placené reklamy je rigorózní A/B testování kreativních sdělení. Během prvních 10 dnů "
        "kampaně je rozpočet fáze Traffic rozdělen rovnoměrně (50:50) mezi dvě odlišné konceptuální varianty s cílem zjistit, "
        "který psychologický spouštěč dosahuje nižší ceny za stažení aplikace (Cost per Install – CPI)."
    )

    doc.add_table(
        "Tabulka 3: Porovnání kreativních variant pro A/B testování v systému Meta Ads",
        ["Parametr testu", "Varianta A (Komunitní / Emocionální motiv)", "Varianta B (Produktový / Racionální motiv)"],
        [
            ["Hlavní headline", "'HOT GIRLS GO TO FP – A ty studuješ kde?'", "'OFICIÁLNÍ MERCH FP VUT – Kvalita, co vydrží zkouškový.'"],
            ["Vizuální formát", "Momentka ze schodů fakulty P2, dvojice studentek v oversized tričkách, analogový filtr, autentická nálada.", "Čisté produktové studio na černém pozadí, detailní makro pohled na 420g gramáž bavlny a pevný límec."],
            ["Hlavní sdělení", "Příslušnost k nejlepší fakultě, nadsázka, studentská komunita a lifestyle.", "Prvotřídní udržitelný materiál, dlouhá životnost textilu, 10% ISIC sleva a odběr na vrátnici zdarma."],
            ["Call to Action", "'STÁHNOUT APLIKACI'", "'ZÍSKAT 10% SLEVU'"],
            ["Cílové KPI", "Míra prokliku (CTR) a počet stažení aplikace.", "Konverzní poměr objednávek a průměrná hodnota košíku (AOV)."],
            ["Hypotéza testu", "Varianta A dosáhne vyššího CTR (> 2,2 %) a nižšího CPI díky silné sociální rezonanci sloganu.", "Varianta B dosáhne vyššího konverzního poměru na nákup (> 4,5 %) u studentů hledajících praktické teplé mikiny."]
        ],
        ["2200", "3400", "3400"]
    )

    doc.add_p(
        "Na základě průběžných výsledků po vyčerpání 30 % rozpočtu bude méně výkonná varianta automaticky utlumena a uvolněné "
        "prostředky budou alokovány do vítězného konceptu, což maximalizuje celkovou návratnost investic do reklamy (ROAS)."
    )

    doc.add_page_break()

    # ==========================================
    # 7. CUSTOMER JOURNEY / STDC FRAMEWORK
    # ==========================================
    doc.add_heading("7. Customer Journey / STDC framework", level=1)

    doc.add_heading("7.1 Fáze zákaznické cesty v kontextu studentského segmentu", level=2)
    doc.add_p(
        "Pro komplexní uchopení interakce studenta s ekosystémem FP DROP byl aplikován osvědčený framework STDC (See – Think – "
        "Do – Care), jehož autorem je Avinash Kaushik. Tento model umožňuje strukturovat marketingové aktivity podle aktuálního "
        "nákupního a myšlenkového rozpoložení uživatele, namísto paušálního tlaku na okamžitý prodej."
    )
    doc.add_p(
        "1. Fáze SEE (Zásah a povědomí): Zahrnuje nejširší publikum všech studentů FP VUT a přilehlých fakult. Uživatel v této "
        "fázi nehledá nové oblečení, ale vnímá vizuální podněty na kampusu, vidí spolužáky v nových tričkách nebo narazí "
        "na organické video na Instagramu.\n"
        "2. Fáze THINK (Zvažování a zájem): Student již značku FP DROP zaregistroval, líbí se mu design, ale zvažuje, zda se mu "
        "investice vyplatí. Zkoumá tabulku velikostí, zjišťuje, zda je materiál dostatečně kvalitní, a ověřuje dostupnost slevy.\n"
        "3. Fáze DO (Konverze a akce): Okamžik rozhodnutí. Student stahuje aplikaci, vkládá vybrané tričko či mikinu do košíku, "
        "uplatňuje slevový kód FPVUT10 a volí bezplatné vyzvednutí na Kolejní 29.\n"
        "4. Fáze CARE (Péče a loajalita): Fáze po převzetí objednávky. Zahrnuje spokojenost s nošením merche, sdílení fotek "
        "na sociálních sítích, využívání aplikace pro sledování dalších dropů a doporučení spolužákům v ročníku."
    )

    doc.add_heading("7.2 Matice STDC frameworku pro FP DROP", level=2)
    doc.add_p(
        "Následující tabulka detailně rozpracovává jednotlivé fáze frameworku STDC pro projekt mobilní aplikace FP DROP:"
    )

    doc.add_table(
        "Tabulka 4: Strategická matice STDC frameworku pro aplikaci FP DROP",
        ["Fáze STDC", "Cíl a potřeba uživatele", "Marketingový kanál", "Typ obsahu a sdělení", "Call to Action (CTA)", "Klíčové KPI", "Způsob měření"],
        [
            [
                "SEE\n(Povědomí)",
                "Pobavit se, zabít čas mezi přednáškami, zjistit, co se děje na fakultě.",
                "Instagram Reels, organický TikTok, outdoor plakáty v respiriu na Kolejní 29.",
                "Virální studentská videa, momentky z kampusu, teasery na nový drop bez prodejního tlaku.",
                "'Sleduj @fp_drop'",
                "Počet zobrazení (Impressions), unikátní dosah, míra zhlédnutí videa do 100 %.",
                "Meta Insights, TikTok Analytics, odhad zásahu v areálu."
            ],
            [
                "THINK\n(Zvažování)",
                "Zjistit podrobnosti o merchi, ověřit velikost a materiál, porovnat cenu s konkurencí.",
                "Webová landing page, Instagram Stories, mobilní simulátor, recenze spolužáků.",
                "Detailní specifikace gramáže (240g bavlna, 420g fleece), tabulka velikostí, unboxing videa.",
                "'Prozkoumat kolekci' / 'Vyzkoušet appku'",
                "Míra prokliku (CTR), čas strávený na webu, počet zkopírování slevového kódu.",
                "Google Analytics 4 (relace > 1 min), Microsoft Clarity (scroll depth)."
            ],
            [
                "DO\n(Konverze)",
                "Rychle a bezpečně objednat vybraný kousek s vyzvednutím na fakultě zdarma.",
                "Mobilní aplikace FP DROP, retargetingové Meta Ads (opuštěný košík), push notifikace.",
                "Upozornění na poslední kusy skladem v Brně, garance výměny velikosti, 1-Click objednávka.",
                "'Koupit na 1-Click' / 'Dokončit objednávku'",
                "Konverzní poměr (CR), počet stažení aplikace, průměrná hodnota objednávky (AOV).",
                "Interní databáze objednávek, GA4 e-commerce tracking, Meta Pixel konverze."
            ],
            [
                "CARE\n(Loajalita)",
                "Pochlubit se outfitem na kampusu, získat status VIP studenta, vědět o dalším dropu.",
                "Push notifikace v aplikaci, děkovný e-mail s pozvánkou do VIP klubu, Instagram Stories UGC.",
                "Výzva ke sdílení fotky s hashtagem #FPDROP, přednostní přístup k DROP 002, věrnostní odznaky.",
                "'Sdílej svůj fit' / 'Zapnout Drop Alarm'",
                "Míra opakovaného nákupu (Repeat Purchase), počet UGC zmínek, retence v aplikaci (30-day Retention).",
                "Mobilní analytika Firebase/Mixpanel, Instagram mentions tracking."
            ]
        ],
        ["1100", "1500", "1300", "1600", "1100", "1200", "1200"]
    )

    doc.add_p(
        "Díky této matici má projekt jasně stanovenou metriku pro každý komunikační kanál, což zabraňuje neefektivnímu "
        "vyhodnocování povědomostních formátů optikou okamžitých tržeb a naopak prodejních formátů optikou počtu lajků."
    )

    doc.add_page_break()

    # ==========================================
    # 8. VYHODNOCOVÁNÍ A MĚŘENÍ
    # ==========================================
    doc.add_heading("8. Vyhodnocování a měření", level=1)

    doc.add_heading("8.1 Metriky webu, sociálních sítí, PPC a mobilní aplikace", level=2)
    doc.add_p(
        "Efektivní řízení digitálního projektu vyžaduje ucelený systém metrik rozdělený do čtyř vzájemně propojených oblastí. "
        "Každá část ekosystému FP DROP disponuje specifickými ukazateli výkonnosti:"
    )

    doc.add_table(
        "Tabulka 5: Přehled metrik a měřicích nástrojů digitálního ekosystému FP DROP",
        ["Oblast ekosystému", "Klíčové sledované metriky", "Primární nástroj měření", "Frekvence sledování", "Cílová referenční hodnota"],
        [
            ["1. Webová prezentace (Landing Page)", "Unikátní návštěvníci (Users), míra zapojení (Engagement Rate), konverze stažení aplikace, hloubka scrollování.", "Google Analytics 4, Microsoft Clarity", "Týdně", "> 5 000 návštěv/měsíc, Engagement Rate > 65 %, Download CR > 12 %"],
            ["2. Sociální sítě (Instagram / TikTok)", "Organický zásah (Reach), míra zapojení na příspěvek (ER per post), zhlédnutí Reels, počet kliknutí na odkaz v biu.", "Meta Business Suite, Instagram Native Insights", "Denně / Týdně", "Účetní dosah > 15 000 účtů/měsíc, ER > 5,8 %, Reels views > 3 000/video"],
            ["3. Placená PPC reklama (Meta Ads)", "Cena za tisíc zobrazení (CPM), cena za proklik (CPC), míra prokliku (CTR), cena za instalaci (CPI), návratnost ROAS.", "Meta Ads Manager", "Průběžně (real-time)", "CTR > 1,8 %, průměrné CPC < 4,00 Kč, CPI < 14,00 Kč, ROAS > 3,8x"],
            ["4. Mobilní aplikace (Prototyp / Produkce)", "Aktivní uživatelé (DAU / MAU), míra udržení (Retention D1, D7, D30), konverzní poměr košíku, doba do dokončení nákupu.", "Aplikační logy, Firebase Analytics / Mixpanel", "Měsíčně", "MAU > 1 200 studentů, D30 Retention > 35 %, Checkout CR > 8,5 %"]
        ],
        ["1800", "2200", "1800", "1200", "2000"]
    )

    doc.add_heading("8.2 Vyhodnocovací cyklus a optimalizační hypotézy", level=2)
    doc.add_p(
        "Naměřená data nejsou shromažďována samoúčelně, nýbrž slouží jako palivo pro dvoutýdenní optimalizační cyklus "
        "(tzv. Build-Measure-Learn smyčka podle metodiky Lean Startup). Tým projektu na pravidelných poradách vyhodnocuje "
        "odchylky reality od plánovaných hodnot a formuluje optimalizační hypotézy."
    )
    doc.add_p(
        "Příklad optimalizačního cyklu v praxi:\n"
        "• Zjištění z měření: Microsoft Clarity odhalil, že 28 % mobilních návštěvníků webu opakovaně kliká na statický obrázek "
        "mikiny v domnění, že jde o interaktivní galerii barevných variant (dead click).\n"
        "• Formulace hypotézy: Přeměna statického obrázku na horizontální swipe karusel zvýší čas strávený na stránce o 15 % "
        "a zvedne míru prokliku do mobilní aplikace o 3 procentní body.\n"
        "• Nasazení a verifikace: Úprava kódu webu, nasazení A/B testu a ověření hypotézy po nasbírání 1 000 návštěv."
    )

    doc.add_page_break()

    # ==========================================
    # 9. ZÁVĚR
    # ==========================================
    doc.add_heading("9. Závěr", level=1)
    doc.add_p(
        "Předložený semestrální projekt prokázal proveditelnost, technologickou životaschopnost a marketingový potenciál "
        "komunitního digitálního produktu FP DROP určeného pro studenty Fakulty podnikatelské VUT v Brně. V souladu se zadáním "
        "byl vyvinut funkční prototyp mobilní aplikace v programovacím jazyce Python, který byl provázán s detailní specifikací "
        "uživatelských segmentů, architekturou webového business profilu a robustní marketingovou strategií pokrývající sociální "
        "sítě, PPC reklamu a model zákaznické cesty STDC."
    )
    doc.add_p(
        "Hlavní přínos projektu spočívá v překonání tradičního formálního pojetí univerzitního merchandisingu. Namísto pasivního "
        "prodeje generických upomínkových předmětů staví FP DROP na autentické identitě studentů, respektuje jejich každodenní "
        "potřeby na kampusu Kolejní 29 a nabízí prvotřídní textilní zpracování doplněné o moderní mobilní nákupní zkušenost. "
        "Technické řešení prototypu, umožňující okamžité spuštění jak ve formě zero-dependency webového simulátoru, tak ve formě "
        "nativního Flet rozhraní, poskytuje vynikající základ pro budoucí produkční vývoj."
    )
    doc.add_p(
        "Mezi limity současného řešení patří především lokální charakter běhu prototypu bez perzistentního cloudového backendu "
        "a absence přímé integrace na oficiální rozhraní Informačního systému VUT. Tyto limity však byly v práci detailně "
        "analyzovány a byla navržena jasná roadmapa pro jejich odstranění v navazující fázi projektu. Projekt FP DROP představuje "
        "komplexní, akademicky i prakticky podložený koncept, který má reálný potenciál posílit prestiž a komunitní soudržnost "
        "Fakulty podnikatelské Vysokého učení technického v Brně."
    )

    doc.add_page_break()

    # ==========================================
    # 10. SEZNAM POUŽITÝCH ZDROJŮ
    # ==========================================
    doc.add_heading("10. Seznam použitých zdrojů", level=1)
    
    sources = [
        "1. CHAFFEY, Dave a Fiona ELLIS-CHADWICK. Digital Marketing: Strategy, Implementation and Practice. 7th ed. Harlow: Pearson, 2019. ISBN 978-1-292-22341-4.",
        "2. KAUSHIK, Avinash. See-Think-Do-Care: A Winning Consumer-Oriented Marketing Framework. Occam's Razor by Avinash Kaushik [online]. 2015 [cit. 2026-10-05]. Dostupné z: https://www.kaushik.net/avinash/see-think-do-care-win-content-marketing-framework/",
        "3. KOTLER, Philip, Kevin Lane KELLER a Alexander CHERNEV. Marketing Management. 16th ed. Harlow: Pearson, 2021. ISBN 978-0-137-34415-4.",
        "4. KRUG, Steve. Nenuťte uživatele přemýšlet!: Korigovaný přístup k použitelnosti webu a mobilních aplikací. 3. vyd. Brno: BizBooks, 2014. ISBN 978-80-265-0242-5.",
        "5. NORMAN, Donald A. The Design of Everyday Things: Revised and Expanded Edition. New York: Basic Books, 2013. ISBN 978-0-465-05065-9.",
        "6. RIES, Eric. The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses. New York: Crown Business, 2011. ISBN 978-0-307-88789-4.",
        "7. VUT V BRNĚ. Fakulta podnikatelská: Oficiální webové stránky a strategické dokumenty [online]. Brno: VUT, 2026 [cit. 2026-10-05]. Dostupné z: https://www.fbm.vutbr.cz/",
        "8. VUT V BRNĚ. Jednotný vizuální styl Vysokého učení technického v Brně: Grafický manuál [online]. Brno: VUT, 2024 [cit. 2026-10-05]. Dostupné z: https://www.vut.cz/vut/symboly",
        "9. ČSN ISO 690:2022. Informace a dokumentace – Pravidla pro bibliografické odkazy a citace informačních zdrojů. Praha: Česká agentura pro standardizaci, 2022.",
        "10. PYTHON SOFTWARE FOUNDATION. Python 3.12 Documentation: The Python Standard Library [online]. Wilmington: PSF, 2025 [cit. 2026-10-05]. Dostupné z: https://docs.python.org/3.12/",
        "11. FLET PROJECT. Flet: Build Flutter apps in Python [online]. 2026 [cit. 2026-10-05]. Dostupné z: https://flet.dev/docs/"
    ]
    for s in sources:
        doc.add_p(s, space_before=40, space_after=80)

    doc.add_page_break()

    # ==========================================
    # 11. PŘÍLOHY
    # ==========================================
    doc.add_heading("11. Přílohy", level=1)
    
    doc.add_p(
        "Přílohová část obsahuje předpřipravené rámečky s popisky pro snadné vložení reálných snímků obrazovky (screenshotů), "
        "diagramů architektury a grafických materiálů přímo v aplikaci Microsoft Word.",
        italic=True, space_after=180
    )

    doc.add_placeholder_box(
        "[PŘÍLOHA 1 – SCREENSHOT HLAVNÍ OBRAZOVKY MOBILNÍHO SIMULÁTORU]",
        "Náhled úvodní obrazovky HOME v emulátoru iPhone 16 Pro s hero bannerem DROP 001 a slevovým widgetem FPVUT10"
    )

    doc.add_placeholder_box(
        "[PŘÍLOHA 2 – SCREENSHOT KATALOGU PRODUKTŮ A FILTROVÁNÍ]",
        "Dvousloupcový responzivní katalog se zobrazením produktů 'HOT GIRLS GO TO FP', 'NO SLEEP' a filtrací kategorií"
    )

    doc.add_placeholder_box(
        "[PŘÍLOHA 3 – SCREENSHOT PROSTŘEDÍ VS CODE A SPUŠTĚNÍ PROTOTYPU]",
        "Snímek integrovaného vývojového prostředí Visual Studio Code se strukturou souborů main.py, data.py a terminálovým výstupem"
    )

    doc.add_placeholder_box(
        "[PŘÍLOHA 4 – DIAGRAM SYSTÉMOVÉ ARCHITEKTURY EKOSYSTÉMU FP DROP]",
        "Schéma propojení webové landing page, mobilního simulátoru, analytických nástrojů GA4/Clarity a Meta Ads"
    )

    doc.add_placeholder_box(
        "[PŘÍLOHA 5 – NÁVRHY REKLAMNÍCH FORMÁTŮ META ADS PRO A/B TESTOVÁNÍ]",
        "Grafické vizuály varianty A (komunitní motiv na kampusu Kolejní 29) a varianty B (produktový detail s ISIC slevou)"
    )

    # Save documents
    target_public = "/app/applet/public/FP_DROP_projekt_VUT.docx"
    target_root = "/app/applet/FP_DROP_projekt_VUT.docx"
    
    doc.build_docx(target_public)
    # copy to root
    import shutil
    shutil.copyfile(target_public, target_root)
    print(f"✅ Zkopírováno do: {target_root}")

if __name__ == "__main__":
    generate_academic_project()
