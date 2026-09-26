export type ProductStatus = 'LIMITED' | 'NEW' | 'SOLD OUT' | 'LAST PIECES' | 'AVAILABLE';
export type ProductCategory = 'ALL' | 'T-SHIRTS' | 'HOODIES' | 'SWEATSHIRTS' | 'ACCESSORIES';
export type GarmentType = 'tee' | 'hoodie' | 'sweatshirt' | 'cap' | 'tote' | 'socks' | 'stickers';

export interface Product {
  id: string;
  name: string;
  slogan: string;
  category: ProductCategory;
  garmentType: GarmentType;
  price: number;
  originalPrice?: number;
  dropId: string;
  dropName: string;
  status: ProductStatus;
  color: string;
  fit: string;
  material: string;
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  description: string;
  highlights: string[];
  imageUrl: string;
  images: {
    front: string;
    back?: string;
    detail?: string;
  };
  mockDetails: {
    textLines: string[];
    textColor: string;
    baseColor: string;
    backTextLines?: string[];
    accentTag?: string;
  };
}

export interface Drop {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  date: string;
  status: 'LIVE' | 'COMING_SOON' | 'ARCHIVED';
  description: string;
  productIds: string[];
  themeColor: string;
  campaignHeadline: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'zasilkovna' | 'ppl' | 'pickup';
  pickupBranch?: string;
  paymentMethod: 'card' | 'applepay' | 'transfer';
  note?: string;
}

export interface Order {
  orderId: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: 'CONFIRMED' | 'PREPARING' | 'DISPATCHED';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  category: string;
  excerpt: string;
  content: string[];
  relatedProductIds: string[];
  quote?: string;
}

export interface LookbookHotspot {
  x: number; // percentage
  y: number; // percentage
  productId: string;
  label: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  dropId: string;
  location: string;
  vibe: string;
  imageAlt: string;
  featuredProductIds: string[];
  hotspots: LookbookHotspot[];
  photographer: string;
}

export interface Persona {
  id: string;
  name: string;
  title: string;
  age: number;
  studyYear: string;
  faculty: string;
  avatarSeed: string;
  quote: string;
  bio: string;
  motivations: string[];
  painPoints: string[];
  buyingBehavior: string[];
  socialMedia: string[];
  trigger: string;
  objection: string;
  conversionHook: string;
  preferredProducts: string[];
}

export interface TriggerSystemItem {
  id: string;
  triggerName: string;
  studentContext: string;
  brandResponse: string;
  uiTouchpoint: string;
  expectedOutcome: string;
  kpiMetric: string;
}

export interface STDCStage {
  stage: 'SEE' | 'THINK' | 'DO' | 'CARE';
  title: string;
  definition: string;
  channels: string[];
  marketingActivity: string;
  contentExample: string;
  websiteFeature: string;
  ga4Events: string[];
  kpis: string[];
}

export interface SocialMediaPost {
  id: string;
  format: 'Post' | 'Reel' | 'Story';
  title: string;
  visualDescription: string;
  caption: string;
  cta: string;
  targetAudience: string;
  stdcStage: 'SEE' | 'THINK' | 'DO' | 'CARE';
  expectedMetrics: string;
}

export interface PPCCampaign {
  id: string;
  name: string;
  stage: 'AWARENESS' | 'CONSIDERATION' | 'CONVERSION' | 'REMARKETING';
  budgetCZK: number;
  objective: string;
  targeting: {
    locations: string[];
    age: string;
    interests: string[];
    customAudiences: string;
  };
  creativeA: {
    format: string;
    headline: string;
    copy: string;
    focus: string;
  };
  creativeB: {
    format: string;
    headline: string;
    copy: string;
    focus: string;
  };
  kpis: {
    ctr: string;
    cpc: string;
    cvr: string;
    roas: string;
    cpa: string;
  };
}

export interface AnalyticsEventLog {
  id: string;
  timestamp: string;
  eventName: string;
  params: Record<string, any>;
}
