import sharp from 'sharp';
import fs from 'fs';

fs.mkdirSync('public/products', { recursive: true });

async function generateAll() {
  console.log('Generating realistic studio product photography matching uploaded references...');

  const width = 1000;
  const height = 1000;

  // 1. Studio Backdrop with soft diffuse key light
  const studioBgBuffer = await sharp(Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#32363c" />
          <stop offset="55%" stop-color="#202226" />
          <stop offset="100%" stop-color="#121315" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)" />
    </svg>
  `)).toBuffer();

  // 2. Real Black Cotton T-Shirt Bases (Isolated from real studio photography)
  const shirtFront = await sharp('/tmp/isolated_real_tee.png')
    .modulate({ brightness: 0.85, contrast: 1.25 })
    .toBuffer();

  const shirtBack = await sharp('/tmp/isolated_real_tee_back.png')
    .modulate({ brightness: 0.85, contrast: 1.25 })
    .toBuffer();

  // Macro detail base (crop of collar and chest)
  const shirtMacro = await sharp('/tmp/isolated_real_tee.png')
    .extract({ left: 150, top: 80, width: 700, height: 700 })
    .resize(1000, 1000, { fit: 'cover' })
    .modulate({ brightness: 0.88, contrast: 1.25 })
    .toBuffer();

  // Helper to composite shirt photo and screenprint onto studio backdrop
  async function makeTee(printSvg, outPath, side = 'front') {
    const base = side === 'back' ? shirtBack : side === 'macro' ? shirtMacro : shirtFront;
    const printBuf = Buffer.from(printSvg);

    await sharp(studioBgBuffer)
      .composite([
        { input: base, blend: 'over' },
        { input: printBuf, blend: 'over' }
      ])
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(outPath);

    console.log('Saved:', outPath);
  }

  // =========================================================================
  // 1. HOT GIRLS GO TO FP TEE (Exact match to User Uploaded Reference Image 2)
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.01em" text-anchor="middle">
          HOT GIRLS
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.01em" text-anchor="middle">
          GO TO FP
        </text>
      </g>
    </svg>`,
    'public/products/hot-girls-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="320" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="24" letter-spacing="0.1em" text-anchor="middle">
          FP DROP
        </text>
        <text x="500" y="355" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.2em" text-anchor="middle">
          KOLEJNÍ 29 • BRNO
        </text>
      </g>
    </svg>`,
    'public/products/hot-girls-back.jpg',
    'back'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.9))">
        <text x="500" y="550" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="75" letter-spacing="-0.02em" text-anchor="middle">
          HOT GIRLS
        </text>
        <text x="500" y="640" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="75" letter-spacing="-0.02em" text-anchor="middle">
          GO TO FP
        </text>
      </g>
    </svg>`,
    'public/products/hot-girls-detail.jpg',
    'macro'
  );

  // =========================================================================
  // 2. BADDEST BITCHES STUDY FP TEE (Exact match to User Uploaded Reference Image 1)
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.015em" text-anchor="middle">
          Baddest bitches
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.015em" text-anchor="middle">
          study FP
        </text>
      </g>
    </svg>`,
    'public/products/baddest-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="320" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="24" letter-spacing="0.1em" text-anchor="middle">
          FP DROP
        </text>
        <text x="500" y="355" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.2em" text-anchor="middle">
          DROP 001 • BRNO
        </text>
      </g>
    </svg>`,
    'public/products/baddest-back.jpg',
    'back'
  );

  // =========================================================================
  // 3. NO SLEEP JUST DEADLINES TEE (Clean Bold Sans-serif)
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          NO SLEEP
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          JUST DEADLINES
        </text>
      </g>
    </svg>`,
    'public/products/no-sleep-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="325" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="26" letter-spacing="0.05em" text-anchor="middle">
          EXAM SURVIVOR
        </text>
        <text x="500" y="360" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.2em" text-anchor="middle">
          FP VUT 2026
        </text>
      </g>
    </svg>`,
    'public/products/no-sleep-back.jpg',
    'back'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.9))">
        <text x="500" y="550" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="75" letter-spacing="-0.02em" text-anchor="middle">
          NO SLEEP
        </text>
        <text x="500" y="635" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="64" letter-spacing="-0.02em" text-anchor="middle">
          JUST DEADLINES
        </text>
      </g>
    </svg>`,
    'public/products/no-sleep-detail.jpg',
    'macro'
  );

  // =========================================================================
  // 4. ECTS ARE TEMPORARY TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          ECTS ARE
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.02em" text-anchor="middle">
          TEMPORARY
        </text>
      </g>
    </svg>`,
    'public/products/ects-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="320" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="26" letter-spacing="-0.01em" text-anchor="middle">
          STYLE IS PERMANENT
        </text>
        <text x="500" y="355" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="0.2em" text-anchor="middle">
          — FP VUT
        </text>
      </g>
    </svg>`,
    'public/products/ects-back.jpg',
    'back'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.9))">
        <text x="500" y="550" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="75" letter-spacing="-0.02em" text-anchor="middle">
          ECTS ARE
        </text>
        <text x="500" y="640" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="70" letter-spacing="-0.02em" text-anchor="middle">
          TEMPORARY
        </text>
      </g>
    </svg>`,
    'public/products/ects-detail.jpg',
    'macro'
  );

  // =========================================================================
  // 5. FP AFTER DARK TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="420" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.01em" text-anchor="middle">
          FP AFTER DARK
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="700" font-size="28" letter-spacing="0.12em" text-anchor="middle">
          00:00 — 05:00
        </text>
      </g>
    </svg>`,
    'public/products/fp-after-dark-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="325" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="24" letter-spacing="0.08em" text-anchor="middle">
          BRNO NIGHTLINE
        </text>
        <text x="500" y="360" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="0.2em" text-anchor="middle">
          FLÉDA • JAKUBÁK • KOLEJNÍ 29
        </text>
      </g>
    </svg>`,
    'public/products/fp-after-dark-back.jpg',
    'back'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.9))">
        <text x="500" y="580" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="70" letter-spacing="-0.01em" text-anchor="middle">
          FP AFTER DARK
        </text>
      </g>
    </svg>`,
    'public/products/fp-after-dark-detail.jpg',
    'macro'
  );

  // =========================================================================
  // 6. BRNO TEE (MADE IN BRNO)
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="0.06em" text-anchor="middle">
          MADE IN
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="56" letter-spacing="-0.01em" text-anchor="middle">
          BRNO
        </text>
      </g>
    </svg>`,
    'public/products/brno-front.jpg'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="325" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="16" letter-spacing="0.15em" text-anchor="middle">
          49.2244° N, 16.5748° E
        </text>
        <text x="500" y="358" fill="#888888" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="0.2em" text-anchor="middle">
          CAMPUS KOLEJNÍ 29
        </text>
      </g>
    </svg>`,
    'public/products/brno-back.jpg',
    'back'
  );

  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 3px 4px rgba(0,0,0,0.9))">
        <text x="500" y="580" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="80" letter-spacing="-0.01em" text-anchor="middle">
          BRNO
        </text>
      </g>
    </svg>`,
    'public/products/brno-detail.jpg',
    'macro'
  );

  // =========================================================================
  // 7. ONE MORE SEMESTER TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          ONE MORE
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          SEMESTER
        </text>
      </g>
    </svg>`,
    'public/products/one-more-front.jpg'
  );

  // =========================================================================
  // 8. BRNO NIGHTLINE TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.01em" text-anchor="middle">
          BRNO
        </text>
        <text x="500" y="480" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.01em" text-anchor="middle">
          NIGHTLINE
        </text>
      </g>
    </svg>`,
    'public/products/brno-home-front.jpg'
  );

  // =========================================================================
  // 9. BUSINESS BUT MAKE IT FUN TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          BUSINESS
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="42" letter-spacing="-0.02em" text-anchor="middle">
          BUT MAKE IT FUN
        </text>
      </g>
    </svg>`,
    'public/products/business-front.jpg'
  );

  // =========================================================================
  // 10. TRADING DEADLINES FOR COFFEE TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="40" letter-spacing="-0.02em" text-anchor="middle">
          TRADING DEADLINES
        </text>
        <text x="500" y="470" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="44" letter-spacing="-0.02em" text-anchor="middle">
          FOR COFFEE
        </text>
      </g>
    </svg>`,
    'public/products/trading-front.jpg'
  );

  // =========================================================================
  // 11. PROBABLY IN THE LIBRARY TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          PROBABLY IN
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          THE LIBRARY
        </text>
      </g>
    </svg>`,
    'public/products/library-front.jpg'
  );

  // =========================================================================
  // 12. FP VUT NO EXPLANATION NEEDED TEE
  // =========================================================================
  await makeTee(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="500" y="415" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="0.02em" text-anchor="middle">
          FP VUT
        </text>
        <text x="500" y="475" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="36" letter-spacing="-0.01em" text-anchor="middle">
          NO EXPLANATION NEEDED
        </text>
      </g>
    </svg>`,
    'public/products/no-explanation-front.jpg'
  );

  // =========================================================================
  // 13. FP 001 SIGNATURE HOODIE (450 GSM Heavyweight Studio Photography)
  // =========================================================================
  const hoodieBase = await sharp('public/base/hoodie.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.95, contrast: 1.18 })
    .toBuffer();

  const printHoodieFront = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="470" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          FP DROP
        </text>
        <text x="500" y="525" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="700" font-size="26" letter-spacing="0.15em" text-anchor="middle">
          KOLEJNÍ 29
        </text>
      </g>
    </svg>
  `);

  await sharp(hoodieBase)
    .composite([{ input: printHoodieFront, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/hoodie-001-front.jpg');

  const printHoodieBack = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="460" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="38" letter-spacing="-0.01em" text-anchor="middle">
          YOUR UNIVERSITY.
        </text>
        <text x="500" y="515" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="38" letter-spacing="-0.01em" text-anchor="middle">
          YOUR UNIFORM.
        </text>
      </g>
    </svg>
  `);

  await sharp(hoodieBase)
    .composite([{ input: printHoodieBack, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/hoodie-001-back.jpg');

  // =========================================================================
  // 14. EXAM SURVIVOR HOODIE
  // =========================================================================
  const printExamHoodie = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="470" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.02em" text-anchor="middle">
          EXAM
        </text>
        <text x="500" y="525" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.02em" text-anchor="middle">
          SURVIVOR
        </text>
      </g>
    </svg>
  `);

  await sharp(hoodieBase)
    .composite([{ input: printExamHoodie, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/exam-hoodie-front.jpg');

  // =========================================================================
  // 15. BRNO BRUTALISM CREWNECK
  // =========================================================================
  const sweatBase = await sharp('public/base/sweatshirt.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.94, contrast: 1.2 })
    .toBuffer();

  const printSweatBrno = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="450" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          BRNO
        </text>
        <text x="500" y="510" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="52" letter-spacing="-0.02em" text-anchor="middle">
          BRUTALISM
        </text>
      </g>
    </svg>
  `);

  await sharp(sweatBase)
    .composite([{ input: printSweatBrno, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/sweatshirt-brno-front.jpg');

  // =========================================================================
  // 16. DEADLINE RUNNER CREWNECK
  // =========================================================================
  const printSweatDeadline = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="450" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.02em" text-anchor="middle">
          DEADLINE
        </text>
        <text x="500" y="510" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="50" letter-spacing="-0.02em" text-anchor="middle">
          RUNNER
        </text>
      </g>
    </svg>
  `);

  await sharp(sweatBase)
    .composite([{ input: printSweatDeadline, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/sweatshirt-deadline-front.jpg');

  // =========================================================================
  // 17. FP EMBROIDERY DAD CAP
  // =========================================================================
  const capBase = await sharp('public/base/cap.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.96, contrast: 1.15 })
    .toBuffer();

  const printCap = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="515" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="900" font-size="34" letter-spacing="0.1em" text-anchor="middle">
          FP DROP
        </text>
      </g>
    </svg>
  `);

  await sharp(capBase)
    .composite([{ input: printCap, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/dad-cap-front.jpg');

  // =========================================================================
  // 18. BRNO NIGHTLINE SNAPBACK
  // =========================================================================
  const printSnapback = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.9))">
        <text x="500" y="515" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="900" font-size="28" letter-spacing="0.08em" text-anchor="middle">
          NIGHTLINE BRNO
        </text>
      </g>
    </svg>
  `);

  await sharp(capBase)
    .composite([{ input: printSnapback, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/snapback-front.jpg');

  // =========================================================================
  // 19. CAMPUS SURVIVAL TOTE
  // =========================================================================
  const toteBase = await sharp('public/base/tote.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.92, contrast: 1.2 })
    .toBuffer();

  const printToteCampus = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.85))">
        <text x="500" y="550" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="44" letter-spacing="-0.02em" text-anchor="middle">
          CAMPUS SURVIVAL
        </text>
        <text x="500" y="605" fill="#E5E5E5" font-family="'JetBrains Mono', monospace" font-weight="bold" font-size="20" letter-spacing="0.15em" text-anchor="middle">
          FP VUT
        </text>
      </g>
    </svg>
  `);

  await sharp(toteBase)
    .composite([{ input: printToteCampus, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/tote-campus-front.jpg');

  // =========================================================================
  // 20. ECTS COLLECTOR TOTE
  // =========================================================================
  const printToteEcts = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 3px rgba(0,0,0,0.85))">
        <text x="500" y="550" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          ECTS
        </text>
        <text x="500" y="605" fill="#FFFFFF" font-family="'Plus Jakarta Sans', 'Inter', 'Helvetica Neue', 'Arial', sans-serif" font-weight="800" font-size="46" letter-spacing="-0.02em" text-anchor="middle">
          COLLECTOR
        </text>
      </g>
    </svg>
  `);

  await sharp(toteBase)
    .composite([{ input: printToteEcts, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/tote-ects-front.jpg');

  // =========================================================================
  // 21. KOLEJNÍ 29 SOCKS
  // =========================================================================
  const socksBase = await sharp('public/base/socks.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.96, contrast: 1.15 })
    .toBuffer();

  const printSocksKolejni = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="400" y="420" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="20" letter-spacing="0.15em" text-anchor="middle" transform="rotate(-90 400 420)">
          KOLEJNÍ 29
        </text>
        <text x="600" y="420" fill="#111111" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="20" letter-spacing="0.15em" text-anchor="middle" transform="rotate(-90 600 420)">
          KOLEJNÍ 29
        </text>
      </g>
    </svg>
  `);

  await sharp(socksBase)
    .composite([{ input: printSocksKolejni, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/socks-kolejni-front.jpg');

  // =========================================================================
  // 22. NO SLEEP SOCKS
  // =========================================================================
  const printSocksNoSleep = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g filter="drop-shadow(0 2px 2px rgba(0,0,0,0.85))">
        <text x="400" y="420" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="20" letter-spacing="0.15em" text-anchor="middle" transform="rotate(-90 400 420)">
          NO SLEEP
        </text>
        <text x="600" y="420" fill="#111111" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="20" letter-spacing="0.15em" text-anchor="middle" transform="rotate(-90 600 420)">
          FP DROP
        </text>
      </g>
    </svg>
  `);

  await sharp(socksBase)
    .composite([{ input: printSocksNoSleep, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/socks-nosleep-front.jpg');

  // =========================================================================
  // 23. STICKERS PACK
  // =========================================================================
  const stickersBase = await sharp('public/base/stickers.jpg')
    .resize(1000, 1000, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.95, contrast: 1.15 })
    .toBuffer();

  const printStickers = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(220, 300) rotate(-12)" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.85))">
        <rect width="260" height="75" rx="8" fill="#000" stroke="#fff" stroke-width="5" />
        <text x="130" y="48" fill="#fff" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="22" letter-spacing="-0.02em" text-anchor="middle">
          HOT GIRLS GO TO FP
        </text>
      </g>

      <g transform="translate(480, 360) rotate(8)" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.85))">
        <rect width="250" height="80" rx="8" fill="#fff" stroke="#000" stroke-width="4" />
        <text x="125" y="52" fill="#000" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="24" letter-spacing="-0.02em" text-anchor="middle">
          NO SLEEP TEE
        </text>
      </g>

      <g transform="translate(300, 560) rotate(-6)" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.85))">
        <rect width="270" height="65" rx="6" fill="#141414" stroke="#555" stroke-width="3" />
        <text x="135" y="42" fill="#fff" font-family="'JetBrains Mono', monospace" font-size="18" letter-spacing="0.2em" text-anchor="middle">
          BRNO • KOLEJNÍ 29
        </text>
      </g>

      <g transform="translate(520, 600) rotate(14)" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.85))">
        <rect width="240" height="60" rx="6" fill="#1f2937" stroke="#4b5563" stroke-width="3" />
        <text x="120" y="38" fill="#f3f4f6" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="bold" font-size="16" text-anchor="middle">
          ECTS ARE TEMPORARY
        </text>
      </g>
    </svg>
  `);

  await sharp(stickersBase)
    .composite([{ input: printStickers, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/stickers-pack.jpg');

  // 24. Holographic Stickers
  const printHolo = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E0E7FF" />
          <stop offset="25%" stop-color="#F472B6" />
          <stop offset="50%" stop-color="#38BDF8" />
          <stop offset="75%" stop-color="#34D399" />
          <stop offset="100%" stop-color="#FBBF24" />
        </linearGradient>
      </defs>
      <g transform="translate(320, 400) rotate(-8)" filter="drop-shadow(0 12px 18px rgba(0,0,0,0.9))">
        <rect width="360" height="100" rx="10" fill="url(#holo)" stroke="#fff" stroke-width="4" />
        <text x="180" y="65" fill="#000000" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="900" font-size="36" letter-spacing="-0.02em" text-anchor="middle">
          BRNO VIBES
        </text>
      </g>
    </svg>
  `);

  await sharp(stickersBase)
    .composite([{ input: printHolo, blend: 'over' }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile('public/products/stickers-holo.jpg');

  console.log('ALL REALISTIC PRODUCT PHOTOGRAPHY GENERATED SUCCESSFULLY!');
}

generateAll().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
