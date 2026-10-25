/**
 * ============================================================================
 * MINEMART FASHION — CORE DATA TYPES
 * "Wear Your Identity"
 * ============================================================================
 */

export interface ProductItem {
  id: string;
  name: string;
  price: string | number;
  originalPrice?: string | number;
  image: string; // Primary product image
  images?: string[]; // Optional 1-5 gallery photos for product quick-view modal
  productUrl: string; // Affiliate purchase URL opened on "Shop Now"
  categoryTag?: string; // e.g. "Dress", "Shoes", "Watch", "Bag", "Shirt"
  brand?: string;
  description?: string;
}

export interface Outfit {
  id: string;
  name: string;
  image: string; // Main outfit photo
  images?: string[]; // Multiple photos / angles for clickable thumbnails switcher
  price?: string; // e.g. "₹3,499"
  category?: string; // e.g. "Aesthetic Women"
  description?: string;
  sectionId: string; // e.g. "section1"
  items: ProductItem[]; // 5 related individual products used in this look
  isTrending?: boolean;
}

export interface SectionData {
  id: string; // "section1", "section2", etc.
  title: string;
  subtitle: string;
  badge?: string;
  outfits: Outfit[];
}
