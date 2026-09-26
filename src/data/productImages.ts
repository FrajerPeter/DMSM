export interface ProductImageSet {
  front: string;
  back?: string;
  detail?: string;
}

export const PRODUCT_IMAGES: Record<string, ProductImageSet> = {
  'prod-01': {
    front: '/products/hot-girls-front.jpg',
    back: '/products/hot-girls-back.jpg',
    detail: '/products/hot-girls-detail.jpg'
  },
  'prod-02': {
    front: '/products/no-sleep-front.jpg',
    back: '/products/no-sleep-back.jpg',
    detail: '/products/no-sleep-detail.jpg'
  },
  'prod-03': {
    front: '/products/ects-front.jpg',
    back: '/products/ects-back.jpg',
    detail: '/products/ects-detail.jpg'
  },
  'prod-04': {
    front: '/products/fp-after-dark-front.jpg',
    back: '/products/fp-after-dark-back.jpg',
    detail: '/products/fp-after-dark-detail.jpg'
  },
  'prod-05': {
    front: '/products/brno-front.jpg',
    back: '/products/brno-back.jpg',
    detail: '/products/brno-detail.jpg'
  },
  'prod-06': {
    front: '/products/business-front.jpg',
    back: '/products/brno-back.jpg',
    detail: '/products/hot-girls-detail.jpg'
  },
  'prod-07': {
    front: '/products/trading-front.jpg',
    back: '/products/no-sleep-back.jpg',
    detail: '/products/no-sleep-detail.jpg'
  },
  'prod-08': {
    front: '/products/study-party-front.jpg',
    back: '/products/hot-girls-back.jpg',
    detail: '/products/hot-girls-detail.jpg'
  },
  'prod-09': {
    front: '/products/no-explanation-front.jpg',
    back: '/products/brno-back.jpg',
    detail: '/products/ects-detail.jpg'
  },
  'prod-10': {
    front: '/products/library-front.jpg',
    back: '/products/no-sleep-back.jpg',
    detail: '/products/no-sleep-detail.jpg'
  },
  'prod-11': {
    front: '/products/brno-home-front.jpg',
    back: '/products/brno-back.jpg',
    detail: '/products/brno-detail.jpg'
  },
  'prod-12': {
    front: '/products/one-more-front.jpg',
    back: '/products/ects-back.jpg',
    detail: '/products/ects-detail.jpg'
  },
  'prod-13': {
    front: '/products/hoodie-001-front.jpg',
    back: '/products/hoodie-001-back.jpg',
    detail: '/products/hoodie-001-detail.jpg'
  },
  'prod-14': {
    front: '/products/exam-hoodie-front.jpg',
    back: '/products/hoodie-001-back.jpg',
    detail: '/products/hoodie-001-detail.jpg'
  },
  'prod-15': {
    front: '/products/sweatshirt-brno-front.jpg',
    back: '/products/sweatshirt-brno-front.jpg',
    detail: '/products/hoodie-001-detail.jpg'
  },
  'prod-16': {
    front: '/products/sweatshirt-deadline-front.jpg',
    back: '/products/sweatshirt-deadline-front.jpg',
    detail: '/products/hoodie-001-detail.jpg'
  },
  'prod-17': {
    front: '/products/dad-cap-front.jpg',
    back: '/products/dad-cap-front.jpg'
  },
  'prod-18': {
    front: '/products/snapback-front.jpg',
    back: '/products/snapback-front.jpg'
  },
  'prod-19': {
    front: '/products/tote-campus-front.jpg',
    back: '/products/tote-campus-front.jpg'
  },
  'prod-20': {
    front: '/products/tote-ects-front.jpg',
    back: '/products/tote-ects-front.jpg'
  },
  'prod-21': {
    front: '/products/socks-kolejni-front.jpg',
    back: '/products/socks-kolejni-front.jpg'
  },
  'prod-22': {
    front: '/products/socks-nosleep-front.jpg',
    back: '/products/socks-nosleep-front.jpg'
  },
  'prod-23': {
    front: '/products/stickers-pack.jpg',
    back: '/products/stickers-pack.jpg'
  },
  'prod-24': {
    front: '/products/stickers-holo.jpg',
    back: '/products/stickers-holo.jpg'
  }
};

export function getProductImageUrl(productId: string, view: 'front' | 'back' | 'detail' = 'front'): string {
  const images = PRODUCT_IMAGES[productId];
  if (!images) {
    return '/products/hot-girls-front.jpg';
  }
  if (view === 'back' && images.back) {
    return images.back;
  }
  if (view === 'detail' && images.detail) {
    return images.detail;
  }
  return images.front;
}
