export type CategorySlug = 'all' | 'men' | 'women' | 'kids' | 'footwear' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ExternalPartner {
  name: string;
  url: string;
  disclosureText: string;
  buttonText?: string;
  badgeText?: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: CategorySlug;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  details: {
    fabric?: string;
    fit?: string;
    care?: string;
    origin?: string;
  };
  sizes: string[];
  colors: ProductColor[];
  isDirectSale: boolean; // true = Sold directly by MineMart; false = External authorized partner
  stock: number;
  externalPartner?: ExternalPartner;
  isTrending: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  section?: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  linkCategory?: CategorySlug;
  ctaText: string;
  active: boolean;
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'customer';
  addresses: Address[];
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${selectedSize}-${selectedColor}`
  productId: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type OrderStatus = 'placed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productTitle: string;
  brand: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface TrackingMilestone {
  status: OrderStatus;
  title: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  createdAt: string;
  trackingMilestones: TrackingMilestone[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  description: string;
  active: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productTitle: string;
  partnerName: string;
  partnerUrl: string;
  timestamp: string;
}
