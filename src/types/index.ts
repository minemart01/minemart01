/**
 * ============================================================================
 * MINEMART CORE TYPE DEFINITIONS
 * ============================================================================
 */

export interface Category {
  id: string; // e.g. "aesthetic-women", "mens-fashion", "streetwear"
  name: string;
  image: string;
  description: string;
  kicker?: string;
  itemCount?: number;
  badge?: string;
}

export interface Outfit {
  id: string; // e.g. "outfit-001"
  categoryId: string; // references Category.id
  title: string;
  image: string;
  description?: string;
  price?: string | number;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isPopular?: boolean;
  tags?: string[];
  likes?: number;
  featuredOrder?: number;
}

export interface OutfitItem {
  id: string; // e.g. "item-001"
  outfitId: string; // references Outfit.id
  name: string;
  image: string;
  price?: number;
  originalPrice?: number;
  brand?: string;
  productUrl: string; // Valid external retailer affiliate link
  categoryTag?: string; // e.g. "Shirt", "Pants", "Shoes", "Bag", "Accessories", "Watch"
  description?: string;
}

export interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  ctaText: string;
  categoryId: string; // links to category
  active: boolean;
}

export interface HomeSection {
  id: string;
  title: string;
  kicker?: string;
  description?: string;
  type: 'carousel' | 'grid' | 'categories';
  categoryId?: string; // target category when user clicks "View All"
  outfitIds?: string[]; // specific curated outfit IDs, or auto-filtered if omitted
  filterType?: 'trending' | 'new-arrivals' | 'popular' | 'category';
  badge?: string;
}

/** Legacy & utility types preserved for backward compatibility */
export type CategorySlug = 'all' | 'men' | 'women' | 'kids' | 'footwear' | 'accessories' | string;

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

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
  isDirectSale: boolean;
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
  id: string;
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
