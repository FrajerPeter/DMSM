export interface ProductImageSet {
  front: string;
  back?: string;
  detail?: string;
}

// Produktové fotky kolekcie FP DROP • WINTER '26 (položky 20–43 z mriežky assets/merch_grid_winter26.webp).
// Vyrezané skriptom scripts/crop_merch_grid.py. Pôvodné zadné/detailné fotky nezodpovedali novým návrhom,
// preto má každý produkt zatiaľ len prednú fotku (galéria v detaile zobrazí iba dostupné pohľady).
const WINTER26 = '/products/winter26';

export const PRODUCT_IMAGES: Record<string, ProductImageSet> = {
  'prod-01': { front: `${WINTER26}/20-hot-girls-go-to-fp-tee.jpg` },
  'prod-02': { front: `${WINTER26}/21-no-sleep-tee.jpg` },
  'prod-03': { front: `${WINTER26}/22-ects-are-temporary-tee.jpg` },
  'prod-04': { front: `${WINTER26}/23-fp-after-dark-tee.jpg` },
  'prod-05': { front: `${WINTER26}/24-brno-tee.jpg` },
  'prod-06': { front: `${WINTER26}/25-business-but-make-it-fun-tee.jpg` },
  'prod-07': { front: `${WINTER26}/26-trading-deadlines-for-coffee-tee.jpg` },
  'prod-08': { front: `${WINTER26}/27-study-party-repeat-tee.jpg` },
  'prod-09': { front: `${WINTER26}/28-fp-vut-no-explanation-needed-tee.jpg` },
  'prod-10': { front: `${WINTER26}/29-probably-in-the-library-tee.jpg` },
  'prod-11': { front: `${WINTER26}/30-brno-is-home-tee.jpg` },
  'prod-12': { front: `${WINTER26}/31-one-more-semester-tee.jpg` },
  'prod-13': { front: `${WINTER26}/32-fp-001-signature-hoodie.jpg` },
  'prod-14': { front: `${WINTER26}/33-exam-survivor-hoodie.jpg` },
  'prod-15': { front: `${WINTER26}/34-brno-brutalism-crewneck.jpg` },
  'prod-16': { front: `${WINTER26}/35-deadline-runner-crewneck.jpg` },
  'prod-17': { front: `${WINTER26}/36-fp-embroidery-dad-cap.jpg` },
  'prod-18': { front: `${WINTER26}/37-brno-nightline-snapback.jpg` },
  'prod-19': { front: `${WINTER26}/38-campus-survival-tote.jpg` },
  'prod-20': { front: `${WINTER26}/39-ects-collector-tote.jpg` },
  'prod-21': { front: `${WINTER26}/40-kolejni-29-socks.jpg` },
  'prod-22': { front: `${WINTER26}/41-no-sleep-socks.jpg` },
  'prod-23': { front: `${WINTER26}/42-fp-drop-vinyl-stickers.jpg` },
  'prod-24': { front: `${WINTER26}/43-brno-holographic-stickers.jpg` }
};

export function getProductImageUrl(productId: string, view: 'front' | 'back' | 'detail' = 'front'): string {
  const images = PRODUCT_IMAGES[productId];
  if (!images) {
    return `${WINTER26}/20-hot-girls-go-to-fp-tee.jpg`;
  }
  if (view === 'back' && images.back) {
    return images.back;
  }
  if (view === 'detail' && images.detail) {
    return images.detail;
  }
  return images.front;
}
