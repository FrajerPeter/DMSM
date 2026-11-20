const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, Footer, PageNumber
} = require(process.env.CODEX_DOCX_MODULE || 'docx');

const out = path.resolve(__dirname, '../FP_DROP_Project_Documentation_EN.docx');
const sections = [];
const para = (text, opts = {}) => new Paragraph({
  alignment: opts.align || AlignmentType.JUSTIFIED,
  spacing: { after: opts.after ?? 130, line: 300 },
  indent: opts.indent ? { left: 360 } : undefined,
  children: [new TextRun({ text, bold: !!opts.bold, italics: !!opts.italic, size: opts.size || 21, font: 'Arial', color: opts.color || '273444' })]
});
const heading = (text, level = HeadingLevel.HEADING_1) => new Paragraph({
  heading: level, spacing: { before: 120, after: 180 }, keepNext: true,
  children: [new TextRun({ text, font: 'Arial', bold: true, color: level === HeadingLevel.HEADING_1 ? '102A43' : '243B53' })]
});
const bullet = text => new Paragraph({
  bullet: { level: 0 }, spacing: { after: 70, line: 280 },
  children: [new TextRun({ text, font: 'Arial', size: 20, color: '273444' })]
});
const table = (headers, rows, widths) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths: widths || headers.map(() => Math.floor(9000 / headers.length)),
  rows: [headers, ...rows].map((row, ri) => new TableRow({
    tableHeader: ri === 0,
    children: row.map((cell, ci) => new TableCell({
      width: { size: (widths || headers.map(() => Math.floor(9000 / headers.length)))[ci], type: WidthType.DXA },
      shading: ri === 0 ? { fill: '102A43' } : (ri % 2 ? { fill: 'F0F4F8' } : undefined),
      margins: { top: 90, bottom: 90, left: 100, right: 100 },
      borders: Object.fromEntries(['top','bottom','left','right','insideH','insideV'].map(k => [k, { style: BorderStyle.SINGLE, size: 3, color: 'D9E2EC' }])),
      children: [new Paragraph({ spacing: { after: 0, line: 240 }, children: [new TextRun({ text: String(cell), bold: ri === 0, font: 'Arial', size: 17, color: ri === 0 ? 'FFFFFF' : '243B53' })] })]
    }))
  }))
});
const page = (title, blocks) => {
  sections.push(heading(title));
  for (const b of blocks) {
    if (typeof b === 'string') sections.push(para(b));
    else if (b.type === 'h2') sections.push(heading(b.text, HeadingLevel.HEADING_2));
    else if (b.type === 'bullets') b.items.forEach(x => sections.push(bullet(x)));
    else if (b.type === 'table') sections.push(table(b.headers, b.rows, b.widths));
  }
};

sections.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { before: 1500, after: 300 },
  children: [new TextRun({ text: 'FP DROP', bold: true, font: 'Arial', size: 46, color: '102A43' })]
}));
sections.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 220 },
  children: [new TextRun({ text: 'Student Streetwear E-commerce Concept', bold: true, font: 'Arial', size: 28, color: '486581' })]
}));
sections.push(new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { after: 850 },
  children: [new TextRun({ text: 'PROJECT DOCUMENTATION', bold: true, font: 'Arial', size: 22, color: '829AB1' })]
}));
sections.push(para('Academic project integrating a student-focused brand concept, responsive web prototype, mobile application prototype and digital marketing plan.', { align: AlignmentType.CENTER, size: 22 }));
sections.push(para('Prepared for a five-person student team | Brno, Czech Republic | 2026', { align: AlignmentType.CENTER, size: 20 }));
sections.push(para('Demonstration document: FP DROP is a student project concept, not an official VUT store. Product availability, prices, customer profiles, testimonials, campaign budgets and performance figures are illustrative unless explicitly identified as project requirements.', { align: AlignmentType.CENTER, italic: true, size: 17, color: '627D98' }));

page('1. Executive Summary', [
  'FP DROP is a proposed student streetwear brand and digital commerce experience inspired by the everyday culture of the Faculty of Business and Management at Brno University of Technology (VUT). The project connects a React and Vite web prototype, a Python-based mobile application prototype, a product and content concept, and a measurable digital marketing plan. Its purpose is to demonstrate how a focused student brand could build awareness, help customers evaluate products, and support a coherent shopping journey across web and mobile touchpoints.',
  'The project is designed as an academic prototype. The current interface demonstrates navigation, product discovery, editorial content, account screens, and selected shopping interactions. It does not represent a production-ready store: there is no verified inventory, payment processing, persistent customer account, fulfilment operation, or confirmed integration with VUT systems. All sample names, profile details, orders, testimonials and campaign results must therefore be treated as fictional or planning assumptions.',
  'The proposed marketing approach combines Instagram-first creative, locally relevant audience targeting, a CZK 10,000 monthly Meta Ads budget model, and three A/B experiments. Measurement is planned around GA4 and Microsoft Clarity after configuration, consent review and deployment to a suitable public environment. The customer journey uses the See–Think–Do–Care framework and distinguishes prototype actions from real purchases.',
  { type: 'h2', text: 'Project objectives' },
  { type: 'bullets', items: [
    'Create a recognisable, student-centred streetwear concept connected to Brno campus life.',
    'Demonstrate responsive product discovery and an accessible web-to-mobile experience.',
    'Specify an actionable social and paid media plan, including targeting, budget and controlled creative tests.',
    'Define customer journey stages and measurement events without presenting demo interactions as completed commerce.'
  ] }
]);

page('2. Brand Concept and Value Proposition', [
  'FP DROP is positioned around limited, themed collections that express student identity and campus humour. The concept aims to make university merchandise feel wearable in everyday life rather than like a conventional souvenir. Proposed product families include T-shirts, hoodies, sweatshirts and accessories. Collection names such as First Semester, Exam Season and FP After Dark are creative directions for the prototype, not confirmed release dates.',
  'The core value proposition is a locally meaningful design, clear product information and a mobile-friendly discovery experience. A student should be able to understand the idea behind a design, compare sizes, inspect materials and see the proposed price before deciding whether to continue. The brand voice is direct, playful and community-aware, while avoiding claims of official university endorsement or unverified manufacturing credentials.',
  { type: 'h2', text: 'Brand principles' },
  { type: 'bullets', items: [
    'Student relevance: use situations and language that reflect real campus routines, validated with student feedback.',
    'Transparent commerce: distinguish actual stock, shipping terms, discounts and product specifications from prototype data.',
    'Inclusive design: provide legible content, keyboard-accessible controls, mobile layouts and straightforward size guidance.',
    'Responsible identity: make clear that the project is independent unless formal permission to represent VUT is obtained.'
  ] },
  'Before any commercial launch, the team should validate the name, visual identity, licensing and any references to VUT. Product sourcing, fabric composition, printing methods, pricing, returns and delivery must be confirmed with real suppliers and documented before being advertised.'
]);

page('3. Target Audience and Customer Needs', [
  'The primary audience is university students in Brno who want casual clothing with a sense of belonging and a recognisable local point of view. The initial planning segment focuses on adults aged approximately 18–26 in Brno and nearby areas. This is a campaign hypothesis for testing, not a verified market-size claim. The concept may also appeal to alumni, university staff and friends of students, but those groups should be evaluated separately rather than assumed to behave like current students.',
  'Audience research should explore what students currently buy, which price ranges feel reasonable, how they choose garment sizes, whether they value campus pick-up, and what would make an independent student brand trustworthy. Short interviews, a small survey and usability sessions can test these questions before a paid campaign is scaled. Findings should be reported with sample size, recruitment method and limitations.',
  { type: 'h2', text: 'Jobs, motivations and barriers' },
  { type: 'table', headers: ['Customer need', 'Possible motivation', 'Barrier to address'], rows: [
    ['Express identity', 'Wear a design that feels connected to student life.', 'Design may feel too niche or not suitable outside campus.'],
    ['Choose confidently', 'Check fit, fabric, price and care before purchase.', 'Missing measurements or unverified product claims.'],
    ['Buy conveniently', 'Browse on a phone and understand the next step.', 'Unclear checkout, delivery or return information.'],
    ['Trust the project', 'Know who operates the store and what happens to data.', 'Prototype screens may imply real accounts or stock.']
  ] },
  'Use real feedback with permission. Do not publish invented student quotations as testimonials. If the team uses illustrative personas or example customer profiles, label them as fictional scenarios and avoid using real student identifiers.'
]);

page('4. Product and Digital Experience', [
  'The web prototype is built with React, TypeScript and Vite. Its principal areas include the home page, shop, product details, collection drops, lookbook, magazine content, brand information and a demonstration account. The mobile application prototype explores similar product and account flows in Python. These artefacts support design discussion and coursework demonstration; they are not connected to one production catalogue or backend.',
  'A proposed product page should show a descriptive name, price, selected colour, size options, garment measurements, material and care information, availability status, delivery or collection terms, and an accessible image description. Until supplier data is verified, material and production details should be labelled as proposed. “Add to bag” and checkout screens should use demo wording when no real transaction can occur.',
  { type: 'h2', text: 'Prototype-to-production requirements' },
  { type: 'bullets', items: [
    'Replace local demo state with a secure product, stock, customer and order backend.',
    'Integrate a compliant payment provider and test order confirmation, cancellation and refund handling.',
    'Add verified delivery, collection, privacy, returns and contact information.',
    'Test responsive layouts, accessibility, browser compatibility and performance with representative users.',
    'Remove sample personal details and ensure any analytics or marketing integrations follow consent requirements.'
  ] },
  'The web and Python application should be presented as complementary prototypes, with a clear explanation of which interactions are simulated and which services are operational. A download or demo should never imply that a real order, ISIC verification or account registration has taken place.'
]);

page('5. Social Content and Creative Direction', [
  'Instagram is the proposed lead channel because the concept depends on visual storytelling and short-form creative. TikTok can be explored as a secondary organic channel if the team can produce suitable video consistently. The plan below is a proposed cadence, not evidence that accounts or publishing operations are active.',
  { type: 'table', headers: ['Format', 'Planning cadence', 'Example content'], rows: [
    ['Reels / short video', 'Up to 3 per week during a campaign', 'Campus-inspired outfit transitions, design process, exam-period humour.'],
    ['Stories', 'Several per active day', 'Polls, size questions, concept previews and countdowns clearly marked as mock-ups.'],
    ['Feed carousel', '1–2 per week', 'Collection concept, size guide, material details and design rationale.']
  ] },
  { type: 'h2', text: 'Example 15-second video storyboard' },
  { type: 'bullets', items: [
    '0–3 seconds: opening hook about choosing an outfit before an early lecture.',
    '3–8 seconds: show two or three outfit combinations and close-up design details.',
    '8–12 seconds: demonstrate the prototype product page and size guide; label it as a concept.',
    '12–15 seconds: invite viewers to explore the collection concept or provide feedback.'
  ] },
  'Creative should use original or properly licensed images and music. Obtain consent from anyone recognisable in photos or videos. Do not stage fake customer reviews, falsely imply that products are selling out, or claim an official relationship with the university. Captions should include an understandable call to action and any necessary prototype disclosure.'
]);

page('6. PPC Advertising: Objective and Audience Targeting', [
  'Paid social advertising is proposed as a controlled way to test whether the FP DROP concept can reach relevant students and generate meaningful product-page engagement. Meta Ads Manager would be used to plan and manage Instagram placements, with Meta Business Suite supporting page and content operations. The campaign described here is a planning model; no media spend, audience delivery or commercial result is claimed to have occurred.',
  'The initial objective should match the maturity of the project. While the site is a prototype without payment processing, optimise for a measurable upper-funnel action such as landing-page views, collection exploration or a clearly labelled feedback form. Do not optimise for purchases or report a return on ad spend until genuine, consented transactions can be measured. After a compliant checkout is available, conversion optimisation can be introduced with verified event configuration.',
  { type: 'h2', text: 'Proposed audience setup' },
  { type: 'bullets', items: [
    'Location: Brno and a practical surrounding radius, initially tested against a broader South Moravian audience. Use location settings that reflect people living in or recently in the area where available and appropriate.',
    'Age: adults 18–26 for the first test. Do not target minors. Review platform settings and current advertising rules before launch.',
    'Language: Czech and Slovak creative variants can be tested separately; language selection should not be treated as a perfect proxy for nationality or student status.',
    'Interests: use a small number of relevant signals such as streetwear, university life and fashion where the platform makes them available. Avoid stacking so many interests that delivery becomes too narrow.',
    'Warm audiences: only after sufficient consented traffic exists, create site-visitor or video-engagement audiences under the applicable platform and privacy rules. Exclude recent converters only when real conversion records are available.',
    'Placements: begin with Advantage+ placements or a limited set of Instagram Feed, Stories and Reels placements, then compare placement-level results without overreacting to small samples.'
  ] },
  'The team should define one primary audience and one comparison audience at a time. Keep geography, age, objective and optimisation event stable when comparing creative. Use UTM parameters consistently, check the landing page on mobile, and pause ads if the destination is unavailable, misleading or inconsistent with the ad promise.'
]);

page('7. PPC Advertising: Budget and A/B Testing', [
  'The coursework planning requirement specifies a CZK 10,000 monthly budget and three A/B tests. The following allocation is a proposed test plan, not an approved or spent budget. It assumes a short learning cycle and should be adjusted to the team’s actual funding, audience size and platform forecasts. Amounts include media only; creative production and any taxes or service fees would need separate consideration.',
  { type: 'table', headers: ['Campaign stage', 'Share', 'Monthly model', 'Purpose'], rows: [
    ['Awareness / video views', '30%', 'CZK 3,000', 'Test reach and video attention for the student concept.'],
    ['Consideration / landing-page views', '50%', 'CZK 5,000', 'Compare creative and drive qualified prototype visits.'],
    ['Warm-audience follow-up', '20%', 'CZK 2,000', 'Re-engage eligible visitors after sufficient audience volume exists.']
  ] },
  { type: 'h2', text: 'Three controlled experiments' },
  { type: 'table', headers: ['Test', 'Variant A vs. B', 'Primary measure'], rows: [
    ['1. Visual style', 'Product studio image vs. campus-inspired lookbook.', 'Outbound CTR; landing-page view rate as a quality check.'],
    ['2. Message', 'Emotional student identity vs. factual product and size information.', 'Cost per qualified landing-page view.'],
    ['3. Format', 'Static feed image vs. vertical short-form video.', 'Cost per engaged visit, with placement and watch-time context.']
  ] },
  'Run one experiment at a time where possible. Split delivery evenly between variants, keep the audience and objective unchanged, and change only the creative element named in the test. Set a minimum run period and review delivery volume before choosing a winner. A small student audience may not generate enough observations for a statistically reliable conclusion; in that case, report the result as directional learning rather than proof. Avoid changing budgets or creative mid-test unless there is a technical, safety or policy issue.',
  'Record the hypothesis, dates, audience, placement, spend, impressions, reach, frequency, link clicks, outbound CTR, landing-page views and cost per result. Add a short qualitative review of comments and landing-page behaviour. A high click-through rate alone does not prove purchase intent. For a live store, add add-to-cart, checkout and purchase events only after validating event deduplication, consent and transaction values. ROAS should be reported only when revenue data is genuine and attributable under a documented method.',
  'After each test, retain the control, summarise what was learned and decide whether to iterate, combine evidence from a further test, or stop the idea. Avoid declaring a winning ad from a few clicks. The budget model should be revisited after the first learning cycle using actual CPM, CPC, audience reach and the team’s capacity to respond to enquiries.'
]);

page('8. Customer Journey and STDC Framework', [
  'The customer journey organises messages around the customer’s intent, rather than simply listing channels. The See–Think–Do–Care framework is used as a planning lens. Each stage needs a clear user need, useful content, an appropriate next action and a measure. Because the current experience is a prototype, journey maps should distinguish simulated actions from real commercial outcomes.',
  { type: 'table', headers: ['Stage', 'Customer question', 'Touchpoint and response', 'Example measure'], rows: [
    ['SEE', 'What is this brand and why is it relevant to me?', 'Short video, social post or campus concept; explain the project clearly.', 'Reach, video completion, qualified visits.'],
    ['THINK', 'Is the design, fit, price and trust level right for me?', 'Product page, size guide, lookbook and transparent prototype notice.', 'Product views, size-guide use, engaged sessions.'],
    ['DO', 'Can I complete the next step safely and easily?', 'Prototype feedback action now; secure checkout only after implementation.', 'Demo CTA completion now; purchase conversion only in production.'],
    ['CARE', 'What happens after an order, and would I return?', 'In production: support, delivery updates, returns and permission-based follow-up.', 'Support resolution, repeat purchase and opt-in engagement.']
  ] },
  'At the prototype stage, replace purchase language with actions the site can actually perform, such as viewing a product or submitting feedback. Do not collect unnecessary personal information. If a feedback form is introduced, explain its purpose and retention. A future production journey should include order confirmation, delivery tracking, returns and customer support, each linked to a responsible team process.'
]);

page('9. Analytics, Privacy and Evaluation', [
  'GA4 and Microsoft Clarity are proposed tools for evaluating the web experience after their IDs, consent behaviour and deployment have been checked. The presence of code or a project account alone does not prove that data is arriving correctly. Before launch, verify page views, key events, UTM attribution, consent behaviour and the exclusion of personal information. Clarity recordings and heatmaps should be configured to mask sensitive fields and avoid capturing credentials, payment data or unnecessary identifiers.',
  { type: 'table', headers: ['Area', 'Example measure', 'Review'], rows: [
    ['Acquisition', 'Sessions by source, campaign and device.', 'Weekly during campaign; compare with ad platform totals carefully.'],
    ['Engagement', 'Product views, size-guide interaction, engaged sessions.', 'Review high-exit pages and mobile usability issues.'],
    ['Prototype intent', 'Demo CTA or feedback-form completion.', 'Label as a prototype action; do not call it a purchase.'],
    ['Production commerce', 'Add-to-cart, checkout and purchase with value.', 'Enable only after backend and payment event validation.']
  ] },
  'Use a measurement plan that states the event name, trigger, parameters, owner and validation method. Do not send names, email addresses, ISIC identifiers, search text or other personal data to analytics. Confirm privacy notices and consent requirements with the project supervisor or appropriate adviser before enabling tracking for real visitors.',
  'Targets such as CTR, conversion rate or monthly reach should initially be treated as hypotheses. Establish a baseline from observed data, report sample size and dates, and explain what cannot be inferred. Avoid presenting projected figures as achieved results.'
]);

page('10. Team Delivery, Risks and Roadmap', [
  'The project is intended for a five-person team. Responsibilities can be divided by workstream while maintaining shared review of the final customer experience. One person may coordinate product and business assumptions, another the web prototype, another the mobile prototype, another marketing and creative, and another research, analytics and documentation. These are suggested roles; the team should assign named owners based on its actual skills and course requirements.',
  { type: 'table', headers: ['Phase', 'Work', 'Exit condition'], rows: [
    ['1. Validate', 'Review assignment criteria, interview students, confirm scope and project disclosures.', 'Documented requirements and research limitations.'],
    ['2. Prototype', 'Refine responsive web and mobile flows; label sample data and inactive commerce.', 'Usability feedback and an accurate demo.'],
    ['3. Prepare', 'Confirm supplier, legal, privacy, content and analytics requirements.', 'Launch checklist approved by the team.'],
    ['4. Pilot', 'Run a small, time-boxed campaign and controlled creative tests.', 'Results reported with spend and sample context.'],
    ['5. Improve', 'Prioritise usability fixes and decide whether production work is justified.', 'Roadmap based on evidence and capacity.']
  ] },
  { type: 'h2', text: 'Key risks and mitigations' },
  { type: 'bullets', items: [
    'Misleading availability or endorsement: label prototype data and obtain permission before using university marks.',
    'Privacy or tracking errors: minimise data, use consent-aware analytics and mask sensitive fields.',
    'Unverified commercial claims: confirm materials, discounts, stock and fulfilment before publication.',
    'Weak test evidence: use controlled experiments, report uncertainty and avoid overclaiming results.',
    'Team capacity: limit launch scope and assign an owner for each operational promise.'
  ] }
]);

page('11. Conclusion and References', [
  'FP DROP demonstrates how a student streetwear concept can connect brand identity, web and mobile prototyping, social content, paid media planning and a customer journey. The strongest next step is validation: learn from students, clarify what the team can genuinely provide, improve the prototype around observed needs and keep every sample or unverified claim visibly identified.',
  'The proposed CZK 10,000 monthly Meta Ads model and three A/B experiments provide a structured coursework plan. They should be treated as a hypothesis for a small pilot, not as proof of market demand or a promise of performance. GA4 and Microsoft Clarity can support learning only after correct configuration, consent review and event validation. A real e-commerce launch would additionally require operational, technical, privacy and legal readiness.',
  { type: 'h2', text: 'Selected references and project sources' },
  { type: 'bullets', items: [
    'Kaushik, A. See–Think–Do–Care framework. Occam’s Razor, 2015. https://www.kaushik.net/avinash/see-think-do-care-win-content-marketing-framework/',
    'Chaffey, D. and Ellis-Chadwick, F. Digital Marketing: Strategy, Implementation and Practice. 7th ed., Pearson, 2019.',
    'Kotler, P., Keller, K. L. and Chernev, A. Marketing Management. 16th ed., Pearson, 2021.',
    'Project implementation: FP DROP React/Vite web prototype, Python mobile prototype, and campaign requirements recorded in the project source files.',
    'All budgets, audiences, sample customer scenarios and performance indicators in this report are proposals or examples unless explicitly described as course requirements.'
  ] }
]);

const doc = new Document({
  creator: 'FP DROP Student Project Team',
  title: 'FP DROP Project Documentation',
  subject: 'English project report (maximum 15 pages)',
  styles: { default: { document: { run: { font: 'Arial', size: 21, color: '273444' }, paragraph: { spacing: { line: 300, after: 130 } } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1250, right: 1250, bottom: 1250, left: 1250 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'FP DROP · Student project concept  |  Page ', font: 'Arial', size: 16, color: '829AB1' }), PageNumber.CURRENT] })] }) },
    children: sections
  }]
});

Packer.toBuffer(doc).then(buffer => require('fs').writeFileSync(out, buffer));
