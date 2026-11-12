export type ProductCategory = 
  | 'Smartphones'
  | 'iPhones'
  | 'Samsung Galaxy'
  | 'Android Phones'
  | 'Smartwatches'
  | 'Tablets'
  | 'Earbuds'
  | 'Neckbands'
  | 'Bluetooth Speakers'
  | 'Mobile Accessories'
  | 'Chargers and Cables'
  | 'Feature Phones';

export type ProductBrand = 
  | 'Apple'
  | 'Samsung'
  | 'OnePlus'
  | 'Xiaomi'
  | 'Redmi'
  | 'Realme'
  | 'Vivo'
  | 'OPPO'
  | 'Motorola'
  | 'iQOO'
  | 'Nothing'
  | 'Itel';

export interface ProductVariant {
  storage: string;
  ram?: string;
  price: number;
  mrp: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: ProductBrand;
  category: ProductCategory;
  price: number;
  mrp: number;
  discountPercentage: number;
  images: string[];
  description: string;
  storage: string;
  ram?: string;
  colors: ProductColor[];
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isLatest?: boolean;
  isTrending?: boolean;
  isBestDeal?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  warranty: string;
  emiStartsFrom?: number;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  quantity: number;
  color: string;
  storage: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryMethod: 'Express Delivery' | 'Store Pickup (Jaipur)';
  paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking' | 'EMI';
  paymentStatus: 'Pending' | 'Paid';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
}

export interface ExchangeRequest {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  oldBrand: string;
  oldModel: string;
  storage: string;
  phoneCondition: 'Flawless' | 'Good' | 'Average' | 'Cracked / Damaged';
  batteryHealth: 'Above 85%' | '75% - 85%' | 'Below 75% / Service';
  expectedPrice: number;
  estimatedValuationMin: number;
  estimatedValuationMax: number;
  status: 'New' | 'Contacted' | 'Evaluated' | 'Completed' | 'Rejected';
  notes?: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  customerName: string;
  customerCity?: string;
  rating: number;
  date: string;
  reviewText: string;
  verifiedPurchase: boolean;
  avatarUrl?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  openingHours: string;
  announcementText: string;
  freeShippingThreshold: number;
  enableCod: boolean;
  enableExchange: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}
