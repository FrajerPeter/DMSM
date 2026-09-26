import fs from 'fs';
import sharp from 'sharp';

// Ensure directories exist
const DIRS = [
  'public/products',
  'src/assets/products',
  'product-assets',
  'assets/products'
];
for (const dir of DIRS) {
  fs.mkdirSync(dir, { recursive: true });
}

// Fonts
const gothicB64 = fs.readFileSync('/tmp/fonts/Gothic.ttf').toString('base64');
const interB64 = fs.readFileSync('/tmp/fonts/Inter.ttf').toString('base64');
const bebasB64 = fs.readFileSync('/tmp/fonts/Bebas.ttf').toString('base64');
const monoB64 = fs.readFileSync('/tmp/fonts/Mono.ttf').toString('base64');

async function run() {
  console.log('--- Generating Clean Pure Black T-Shirts (No Grey Text/Shadow) ---');

  const width = 1000;
  const height = 1000;

  // 1. Studio backdrop: clean neutral light studio gradient matching user reference
  const bgSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="studio" cx="50%" cy="42%" r="68%">
          <stop offset="0%" stop-color="#F2F2F5" />
          <stop offset="60%" stop-color="#E2E3E7" />
          <stop offset="100%" stop-color="#CACBCD" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#studio)" />
    </svg>
  `;
  const bgBuffer = await sharp(Buffer.from(bgSvg)).toBuffer();

  // 2. Prepare high-resolution Pure Black T-Shirt front, back, and shadow
  const shirtFrontRaw = await sharp('/tmp/isolated_pure_black_tee.png')
    .resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const shirtBackRaw = await sharp('/tmp/isolated_pure_black_back.png')
    .resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Soft ambient contact shadow onto studio background
  const shadowFront = await sharp(shirtFrontRaw)
    .tint({ r: 25, g: 25, b: 35 })
    .blur(16)
    .modulate({ brightness: 0.15 })
    .toBuffer();

  const shadowBack = await sharp(shirtBackRaw)
    .tint({ r: 25, g: 25, b: 35 })
    .blur(16)
    .modulate({ brightness: 0.15 })
    .toBuffer();

  // Save utility to write to all target directories
  async function saveJpg(sharpPipeline, filename) {
    const buf = await sharpPipeline.jpeg({ quality: 94, mozjpeg: true }).toBuffer();
    for (const d of DIRS) {
      fs.writeFileSync(`${d}/${filename}`, buf);
    }
    // Also update dist if exists
    if (fs.existsSync('dist/products')) {
      fs.writeFileSync(`dist/products/${filename}`, buf);
    }
    console.log('Saved:', filename);
  }

  // Base generator for a T-Shirt
  async function generateTee({
    idPrefix,
    frontPrintSvg,
    backPrintSvg
  }) {
    // 1. FRONT VIEW: Crisp pure white text directly on pure black t-shirt
    const frontPipeline = sharp(bgBuffer).composite([
      { input: shadowFront, top: 110, left: 100, blend: 'multiply' },
      { input: shirtFrontRaw, top: 100, left: 100, blend: 'over' },
      { input: Buffer.from(frontPrintSvg), blend: 'over' }
    ]);
    await saveJpg(frontPipeline, `${idPrefix}-front.jpg`);

    // 2. BACK VIEW
    const backPipeline = sharp(bgBuffer).composite([
      { input: shadowBack, top: 110, left: 100, blend: 'multiply' },
      { input: shirtBackRaw, top: 100, left: 100, blend: 'over' },
      { input: Buffer.from(backPrintSvg || frontPrintSvg), blend: 'over' }
    ]);
    await saveJpg(backPipeline, `${idPrefix}-back.jpg`);

    // 3. DETAIL VIEW: Macro crop of chest and pure white screenprint
    const fullFront = await sharp(bgBuffer).composite([
      { input: shadowFront, top: 110, left: 100, blend: 'multiply' },
      { input: shirtFrontRaw, top: 100, left: 100, blend: 'over' },
      { input: Buffer.from(frontPrintSvg), blend: 'over' }
    ]).png().toBuffer();

    const detailPipeline = sharp(fullFront)
      .extract({ left: 180, top: 150, width: 640, height: 640 })
      .resize(1000, 1000, { kernel: 'lanczos3' });

    await saveJpg(detailPipeline, `${idPrefix}-detail.jpg`);
  }

  // =========================================================================
  // 1. HOT GIRLS GO TO FP TEE (Clean pure black, NO grey background text/shadow)
  // =========================================================================
  await generateTee({
    idPrefix: 'hot-girls',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'GothicStudio';
            src: url('data:font/ttf;base64,${gothicB64}') format('truetype');
          }
        </style>
        <text x="500" y="405" fill="#FFFFFF" font-family="GothicStudio" font-size="58" letter-spacing="0.04em" text-anchor="middle">
          HOT GIRLS
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="GothicStudio" font-size="58" letter-spacing="0.04em" text-anchor="middle">
          GO TO FP
        </text>
      </svg>
    `,
    backPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
          @font-face {
            font-family: 'MonoStudio';
            src: url('data:font/ttf;base64,${monoB64}') format('truetype');
          }
        </style>
        <text x="500" y="315" fill="#FFFFFF" font-family="InterStudio" font-weight="800" font-size="22" letter-spacing="0.15em" text-anchor="middle">
          FP DROP
        </text>
        <text x="500" y="345" fill="#AAAAAA" font-family="MonoStudio" font-size="12" letter-spacing="0.25em" text-anchor="middle">
          001 / BRNO • KOLEJNÍ 29
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 2. NO SLEEP TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'no-sleep',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'BebasStudio';
            src: url('data:font/ttf;base64,${bebasB64}') format('truetype');
          }
          @font-face {
            font-family: 'MonoStudio';
            src: url('data:font/ttf;base64,${monoB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="BebasStudio" font-size="74" letter-spacing="0.05em" text-anchor="middle">
          NO SLEEP
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="BebasStudio" font-size="62" letter-spacing="0.08em" text-anchor="middle">
          JUST DEADLINES
        </text>
        <text x="500" y="515" fill="#CCCCCC" font-family="MonoStudio" font-size="12" letter-spacing="0.25em" text-anchor="middle">
          FP VUT 2026 / SURVIVOR EDITION
        </text>
      </svg>
    `,
    backPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'MonoStudio';
            src: url('data:font/ttf;base64,${monoB64}') format('truetype');
          }
        </style>
        <text x="500" y="325" fill="#EEEEEE" font-family="MonoStudio" font-size="14" letter-spacing="0.2em" text-anchor="middle">
          [ EXAM SURVIVOR ]
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 3. ECTS ARE TEMPORARY TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'ects',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          ECTS ARE
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          TEMPORARY
        </text>
      </svg>
    `,
    backPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="325" fill="#FFFFFF" font-family="InterStudio" font-weight="800" font-size="20" letter-spacing="0.08em" text-anchor="middle">
          STYLE IS PERMANENT
        </text>
        <text x="500" y="355" fill="#AAAAAA" font-family="InterStudio" font-weight="500" font-size="13" letter-spacing="0.15em" text-anchor="middle">
          — FP VUT
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 4. FP AFTER DARK TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'fp-after-dark',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'BebasStudio';
            src: url('data:font/ttf;base64,${bebasB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="BebasStudio" font-size="78" letter-spacing="0.08em" text-anchor="middle">
          FP AFTER
        </text>
        <text x="500" y="485" fill="#FFFFFF" font-family="BebasStudio" font-size="78" letter-spacing="0.08em" text-anchor="middle">
          DARK
        </text>
      </svg>
    `,
    backPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'MonoStudio';
            src: url('data:font/ttf;base64,${monoB64}') format('truetype');
          }
        </style>
        <text x="500" y="320" fill="#FFFFFF" font-family="MonoStudio" font-size="16" letter-spacing="0.25em" text-anchor="middle">
          BRNO NIGHTLINE
        </text>
        <text x="500" y="350" fill="#AAAAAA" font-family="MonoStudio" font-size="13" letter-spacing="0.15em" text-anchor="middle">
          00:00 — 05:00
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 5. BRNO TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'brno',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="46" letter-spacing="0.05em" text-anchor="middle">
          MADE IN
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="64" letter-spacing="0.12em" text-anchor="middle">
          BRNO
        </text>
      </svg>
    `,
    backPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'MonoStudio';
            src: url('data:font/ttf;base64,${monoB64}') format('truetype');
          }
        </style>
        <text x="500" y="325" fill="#FFFFFF" font-family="MonoStudio" font-size="16" letter-spacing="0.2em" text-anchor="middle">
          49.2244° N • 16.5748° E
        </text>
        <text x="500" y="355" fill="#AAAAAA" font-family="MonoStudio" font-size="12" letter-spacing="0.15em" text-anchor="middle">
          FP VUT CAMPUS
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 6. BUSINESS BUT MAKE IT FUN TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'business',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="390" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="44" letter-spacing="-0.01em" text-anchor="middle">
          BUSINESS
        </text>
        <text x="500" y="445" fill="#FFFFFF" font-family="InterStudio" font-weight="800" font-size="38" letter-spacing="0.02em" text-anchor="middle">
          BUT MAKE
        </text>
        <text x="500" y="505" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="0.05em" text-anchor="middle">
          IT FUN
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 7. TRADING DEADLINES FOR COFFEE TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'trading',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'BebasStudio';
            src: url('data:font/ttf;base64,${bebasB64}') format('truetype');
          }
        </style>
        <text x="500" y="400" fill="#FFFFFF" font-family="BebasStudio" font-size="64" letter-spacing="0.05em" text-anchor="middle">
          TRADING DEADLINES
        </text>
        <text x="500" y="465" fill="#FFFFFF" font-family="BebasStudio" font-size="64" letter-spacing="0.05em" text-anchor="middle">
          FOR COFFEE
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 8. STUDY. PARTY. REPEAT. TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'study-party',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="405" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="44" letter-spacing="0.02em" text-anchor="middle">
          STUDY. PARTY.
        </text>
        <text x="500" y="470" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="0.05em" text-anchor="middle">
          REPEAT.
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 9. NO EXPLANATION NEEDED TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'no-explanation',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="390" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="0.06em" text-anchor="middle">
          FP VUT
        </text>
        <text x="500" y="445" fill="#EEEEEE" font-family="InterStudio" font-weight="800" font-size="34" letter-spacing="0.08em" text-anchor="middle">
          NO EXPLANATION
        </text>
        <text x="500" y="495" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="44" letter-spacing="0.06em" text-anchor="middle">
          NEEDED
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 10. PROBABLY IN THE LIBRARY TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'library',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="48" letter-spacing="-0.01em" text-anchor="middle">
          PROBABLY IN
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="48" letter-spacing="-0.01em" text-anchor="middle">
          THE LIBRARY
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 11. BRNO IS HOME TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'brno-home',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'GothicStudio';
            src: url('data:font/ttf;base64,${gothicB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="GothicStudio" font-size="64" letter-spacing="0.04em" text-anchor="middle">
          BRNO IS HOME
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="GothicStudio" font-size="44" letter-spacing="0.06em" text-anchor="middle">
          FP COMMUNITY
        </text>
      </svg>
    `
  });

  // =========================================================================
  // 12. ONE MORE SEMESTER TEE
  // =========================================================================
  await generateTee({
    idPrefix: 'one-more',
    frontPrintSvg: `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          @font-face {
            font-family: 'InterStudio';
            src: url('data:font/ttf;base64,${interB64}') format('truetype');
          }
        </style>
        <text x="500" y="415" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          ONE MORE
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          SEMESTER
        </text>
      </svg>
    `
  });

  // =========================================================================
  // HOODIES & SWEATSHIRTS
  // =========================================================================
  console.log('Generating Hoodies & Sweatshirts...');

  const hoodieBase = await sharp('public/base/hoodie.jpg')
    .resize(1000, 1000, { fit: 'cover' })
    .toBuffer();

  const hoodiePrintSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'InterStudio';
          src: url('data:font/ttf;base64,${interB64}') format('truetype');
        }
      </style>
      <text x="500" y="480" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="44" letter-spacing="0.08em" text-anchor="middle">
        FP 001
      </text>
      <text x="500" y="525" fill="#CCCCCC" font-family="InterStudio" font-weight="700" font-size="18" letter-spacing="0.25em" text-anchor="middle">
        SIGNATURE EDITION
      </text>
    </svg>
  `;

  await saveJpg(
    sharp(hoodieBase).composite([{ input: Buffer.from(hoodiePrintSvg), blend: 'over' }]),
    'hoodie-001-front.jpg'
  );
  await saveJpg(sharp(hoodieBase), 'hoodie-001-back.jpg');
  await saveJpg(
    sharp(hoodieBase)
      .composite([{ input: Buffer.from(hoodiePrintSvg), blend: 'over' }])
      .extract({ left: 250, top: 350, width: 500, height: 500 })
      .resize(1000, 1000),
    'hoodie-001-detail.jpg'
  );

  const examPrintSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'BebasStudio';
          src: url('data:font/ttf;base64,${bebasB64}') format('truetype');
        }
      </style>
      <text x="500" y="485" fill="#FFFFFF" font-family="BebasStudio" font-size="64" letter-spacing="0.08em" text-anchor="middle">
        EXAM SURVIVOR
      </text>
    </svg>
  `;
  await saveJpg(
    sharp(hoodieBase).composite([{ input: Buffer.from(examPrintSvg), blend: 'over' }]),
    'exam-hoodie-front.jpg'
  );

  // Sweatshirts
  const sweatBase = await sharp('public/base/sweatshirt.jpg')
    .resize(1000, 1000, { fit: 'cover' })
    .toBuffer();

  const sweatBrnoSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'InterStudio';
          src: url('data:font/ttf;base64,${interB64}') format('truetype');
        }
      </style>
      <text x="500" y="470" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="44" letter-spacing="0.1em" text-anchor="middle">
        BRNO
      </text>
      <text x="500" y="515" fill="#CCCCCC" font-family="InterStudio" font-weight="700" font-size="20" letter-spacing="0.2em" text-anchor="middle">
        BRUTALISM
      </text>
    </svg>
  `;
  await saveJpg(
    sharp(sweatBase).composite([{ input: Buffer.from(sweatBrnoSvg), blend: 'over' }]),
    'sweatshirt-brno-front.jpg'
  );

  const sweatDeadlineSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'BebasStudio';
          src: url('data:font/ttf;base64,${bebasB64}') format('truetype');
        }
      </style>
      <text x="500" y="485" fill="#FFFFFF" font-family="BebasStudio" font-size="64" letter-spacing="0.08em" text-anchor="middle">
        DEADLINE RUNNER
      </text>
    </svg>
  `;
  await saveJpg(
    sharp(sweatBase).composite([{ input: Buffer.from(sweatDeadlineSvg), blend: 'over' }]),
    'sweatshirt-deadline-front.jpg'
  );

  // Accessories: Caps, Totes, Socks, Stickers
  console.log('Generating Accessories photography...');
  const capBase = await sharp('public/base/cap.jpg').resize(1000, 1000, { fit: 'cover' }).toBuffer();
  await saveJpg(sharp(capBase), 'dad-cap-front.jpg');
  await saveJpg(sharp(capBase).modulate({ brightness: 0.9 }), 'snapback-front.jpg');

  const toteBase = await sharp('public/base/tote.jpg').resize(1000, 1000, { fit: 'cover' }).toBuffer();
  const toteCampusSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face {
          font-family: 'InterStudio';
          src: url('data:font/ttf;base64,${interB64}') format('truetype');
        }
      </style>
      <text x="500" y="580" fill="#FFFFFF" font-family="InterStudio" font-weight="900" font-size="34" letter-spacing="0.08em" text-anchor="middle">
        CAMPUS SURVIVAL
      </text>
      <text x="500" y="620" fill="#CCCCCC" font-family="InterStudio" font-weight="700" font-size="16" letter-spacing="0.2em" text-anchor="middle">
        FP VUT • BRNO
      </text>
    </svg>
  `;
  await saveJpg(sharp(toteBase).composite([{ input: Buffer.from(toteCampusSvg), blend: 'over' }]), 'tote-campus-front.jpg');
  await saveJpg(sharp(toteBase), 'tote-ects-front.jpg');

  const socksBase = await sharp('public/base/socks.jpg').resize(1000, 1000, { fit: 'cover' }).toBuffer();
  await saveJpg(sharp(socksBase), 'socks-kolejni-front.jpg');
  await saveJpg(sharp(socksBase), 'socks-nosleep-front.jpg');

  const stickersBase = await sharp('public/base/stickers.jpg').resize(1000, 1000, { fit: 'cover' }).toBuffer();
  await saveJpg(sharp(stickersBase), 'stickers-pack.jpg');
  await saveJpg(sharp(stickersBase), 'stickers-holo.jpg');

  console.log('✅ ALL PRODUCTS REGENERATED WITH PURE BLACK COTTON & CRISP TEXT!');
}

run().catch(console.error);
