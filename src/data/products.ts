/**
 * ============================================================================
 * MINEMART PRODUCT CATALOG (src/data/products.ts)
 * ============================================================================
 * 
 * Welcome to the MineMart Product Manager!
 * 
 * To ADD, EDIT, or REMOVE products from your website, this is the ONLY file
 * you need to touch. Every product added to the `PRODUCTS` array below will
 * automatically appear in:
 *   - The Homepage sections (Trending, Best Sellers, Top Deals, New Arrivals, Recommended)
 *   - The Category pages (Men, Women, Kids, Footwear, Accessories)
 *   - Search and Filter results
 *   - Product Detail Pages
 *   - Shopping Cart, Wishlist, and Checkout (for direct items)
 *   - External Partner redirect (for affiliate items with productUrl)
 * 
 * ----------------------------------------------------------------------------
 * HOW TO ADD A NEW PRODUCT IN 3 SIMPLE STEPS:
 * ----------------------------------------------------------------------------
 * 1. Scroll to the bottom of the `PRODUCTS` list below.
 * 2. Copy one of the sample product entries provided at the bottom.
 * 3. Paste it before the closing `];`, change the details (name, price, image link, etc.), and save!
 * 
 * ----------------------------------------------------------------------------
 * USING PRODUCT IMAGES:
 * ----------------------------------------------------------------------------
 * - Online Web Links: You can use any direct web image URL:
 *     image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"
 * 
 * - Local Images in /public folder: Place your image inside the project's `public/`
 *   folder (e.g. `public/my-shirt.jpg`) and reference it with a leading slash:
 *     image: "/my-shirt.jpg"
 * 
 * ----------------------------------------------------------------------------
 * DIRECT SALES VS EXTERNAL AFFILIATE / PARTNER LINKS:
 * ----------------------------------------------------------------------------
 * - MineMart Direct Sale: Do NOT include `productUrl`. Customers can pick size/color,
 *   add to cart, apply promo codes, and complete checkout on MineMart!
 * 
 * - External Retailer / Affiliate: Include `productUrl` with your authorized link.
 *   Customers will see a "Buy on Authorized Retailer" button that takes them directly
 *   to your partner store!
 * ============================================================================
 */

import { Product, ProductColor, CategorySlug } from '../types';

/**
 * Clean, Beginner-Friendly Product Interface
 */
export interface SimpleProduct {
  /** Unique ID for the product, e.g. "product-001" or "prod-999" (required) */
  id: string;

  /** Name / Title of the product, e.g. "Men's Casual Shirt" (required) */
  name: string;

  /**
   * Product Category (required). Options:
   * "Men" | "Women" | "Kids" | "Footwear" | "Accessories"
   */
  category: 'Men' | 'Women' | 'Kids' | 'Footwear' | 'Accessories' | string;

  /** Current selling price in dollars, e.g. 799 or 49 (optional, defaults to 799) */
  price?: number;

  /**
   * Product image (required). Can be:
   * 1. Direct web image link: "https://images.unsplash.com/..."
   * 2. Local image in /public folder: "/shirt.jpg"
   * 3. Internal asset path: "/src/assets/images/..."
   */
  image: string;

  /**
   * Optional Authorized Affiliate or Partner Retailer URL:
   * - If provided: MineMart displays a "Buy on Authorized Retailer" button.
   * - If omitted: MineMart sells it directly with cart, sizes and checkout!
   */
  productUrl?: string;

  /**
   * Optional Homepage Section to feature this product in:
   * Options: "Trending" | "Best Sellers" | "New Arrivals" | "Deals" | "Recommended"
   */
  section?: 'Trending' | 'Best Sellers' | 'New Arrivals' | 'Deals' | 'Recommended' | string;

  /** Brand or label name, e.g. "MineMart Atelier", "Nordstrom", "Nike" (optional) */
  brand?: string;

  /** Original price / MRP before discount, e.g. 1299 or 89 (optional) */
  originalPrice?: number;

  /** Discount percentage, e.g. 38 for 38% off (optional, auto-calculated if originalPrice is given) */
  discount?: number;

  /** Product description shown on the product detail page (optional) */
  description?: string;

  /** Available sizes, e.g. ["S", "M", "L", "XL"] or ["UK 8", "UK 9", "UK 10"] (optional) */
  sizes?: string[];

  /**
   * Available colors. You can use simple color names like:
   * ["Black", "Blue", "White", "Beige", "Olive", "Navy"]
   * or color objects with hex codes: [{ name: "Olive", hex: "#606c38" }] (optional)
   */
  colors?: (string | { name: string; hex: string })[];

  /** Sub-category, e.g. "Shirts", "Dresses", "Sneakers", "Bags" (optional) */
  subCategory?: string;

  /** Additional gallery images for the product page (optional) */
  additionalImages?: string[];

  /** Name of the external retailer, e.g. "Nordstrom", "MatchesFashion", "Farfetch" (optional) */
  partnerName?: string;

  /** Stock count for direct MineMart sales (optional, default: 20) */
  stock?: number;

  /** Customer rating from 1.0 to 5.0 (optional, default: 4.8) */
  rating?: number;

  /** Number of reviews (optional, default: 24) */
  reviewCount?: number;

  /** Show this product in the Homepage "Trending Products" carousel? (optional) */
  isTrending?: boolean;

  /** Show this product in the Homepage "New Arrivals" carousel? (optional) */
  isNewArrival?: boolean;

  /** Show this product in the "Featured Curations" list? (optional) */
  isFeatured?: boolean;

  /** Material/fabric composition, e.g. "100% Linen", "Mulberry Silk" (optional) */
  fabric?: string;

  /** Garment fit, e.g. "Tailored Regular Fit", "Oversized" (optional) */
  fit?: string;

  /** Care instructions, e.g. "Dry clean only", "Machine wash cold" (optional) */
  care?: string;

  /** Country or region of origin, e.g. "Crafted in Portugal" (optional) */
  origin?: string;
}

/**
 * ============================================================================
 * YOUR PRODUCT LIST (Add, edit, or remove products below)
 * ============================================================================
 */
export const PRODUCTS: SimpleProduct[] = [
  // 1. Men's Linen-Wool Blazer (MineMart Direct)
  {
    id: "prod-101",
    name: "...",
    brand: "MineMart Atelier",
    price: 189,
    originalPrice: 249,
    image: "/src/assets/images/product_mens_linen_jacket_1791391886873.jpg",
    additionalImages: [
      "/src/assets/images/hero_fashion_editorial_1791391868816.jpg",
    ],
    category: "Men",
    subCategory: "Blazers",
    description: "Constructed from a breathable Italian linen and wool blend, this single-breasted jacket features patch pockets, horn buttons, and a soft natural shoulder for refined versatile dressing.",
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Beige", "Slate Gray", "Navy"],
    discount: 24,
    stock: 14,
    rating: 4.8,
    reviewCount: 38,
    section: "Trending",
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: "65% Italian Linen, 35% Virgin Wool",
    fit: "Relaxed Tailored Fit",
    care: "Dry clean only",
    origin: "Crafted in Portugal",
  },

  // 2. Women's Mulberry Silk Dress (MineMart Direct)
  {
    id: "prod-102",
    name: "Pleated Mulberry Silk Midi Dress",
    brand: "MineMart Collection",
    price: 220,
    originalPrice: 295,
    image: "/src/assets/images/product_womens_silk_dress_1791391911188.jpg",
    additionalImages: [
      "/src/assets/images/hero_fashion_editorial_1791391868816.jpg",
    ],
    category: "Women",
    subCategory: "Dresses",
    description: "A fluid midi dress cut from lustrous pure mulberry silk. Designed with delicate micro-pleating along the skirt, an asymmetrical neckline, and concealed side zip.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Olive", "Clay", "Black"],
    discount: 25,
    stock: 9,
    rating: 4.9,
    reviewCount: 47,
    section: "Trending",
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: "100% Grade 6A Mulberry Silk",
    fit: "True to size with fluid drape",
    care: "Specialist delicate dry clean",
    origin: "Hand-sewn in Como, Italy",
  },

  // 3. Footwear Leather Sneakers (MineMart Direct)
  {
    id: "prod-103",
    name: "Calfskin Minimal Low-Top Sneakers",
    brand: "Studio Veloce",
    price: 165,
    originalPrice: 195,
    image: "/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg",
    category: "Footwear",
    subCategory: "Sneakers",
    description: "Clean low-profile court sneakers crafted with buttery soft full-grain calf leather and custom stitched Margom rubber soles. Cushioned antimicrobial insole for all-day comfort.",
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
    colors: ["White", "Black"],
    discount: 15,
    stock: 22,
    rating: 4.7,
    reviewCount: 62,
    section: "Best Sellers",
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: "100% Full-Grain Calfskin Leather",
    fit: "Runs true to European sizing",
    care: "Wipe clean with soft damp cloth and leather balm",
    origin: "Made in Marche, Italy",
  },

  // 4. Nordstrom Authorized Partner Saddle Bag (External Retailer Link)
  {
    id: "prod-104",
    name: "Sculpted Top-Handle Saddle Bag",
    brand: "Nordstrom Designer Curations",
    price: 340,
    originalPrice: 425,
    image: "/src/assets/images/banner_summer_capsule_1791391953514.jpg",
    productUrl: "https://www.nordstrom.com/s/curated-luxury-leather-bag",
    partnerName: "Nordstrom Authorized Partner Store",
    category: "Accessories",
    subCategory: "Bags",
    description: "An architectural saddle silhouette featuring vegetable-tanned Spanish leather, brushed gold hardware, and a detachable shoulder strap for day-to-evening versatility.",
    sizes: ["One Size"],
    colors: ["Brown", "Forest Green"],
    discount: 20,
    rating: 4.9,
    reviewCount: 19,
    section: "Trending",
    isTrending: true,
    isNewArrival: true,
    isFeatured: true,
    fabric: "Spanish Vegetable-Tanned Cowhide",
    fit: "24cm W x 18cm H x 8cm D",
    care: "Store in protective dust bag",
    origin: "Authorized Nordstrom Retail Partner Sourced",
  },

  // 5. Men's Supima Cotton Tee (MineMart Direct)
  {
    id: "prod-105",
    name: "Heavyweight Supima Cotton Boxy Tee",
    brand: "MineMart Atelier",
    price: 48,
    originalPrice: 60,
    image: "/src/assets/images/hero_fashion_editorial_1791391868816.jpg",
    category: "Men",
    subCategory: "T-Shirts",
    description: "A 280 GSM heavyweight crewneck t-shirt knitted from extra-long staple Supima cotton. Cut in a contemporary boxy drape with a sturdy bound ribbed collar.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Charcoal", "Olive"],
    discount: 20,
    stock: 45,
    rating: 4.6,
    reviewCount: 91,
    section: "New Arrivals",
    isTrending: false,
    isNewArrival: true,
    isFeatured: false,
    fabric: "100% Certified Supima Cotton",
    fit: "Boxy, slightly dropped shoulder",
    care: "Machine wash cold, hang dry",
    origin: "Milled in California",
  },

  // 6. MatchesFashion Partner Cashmere Polo (External Retailer Link)
  {
    id: "prod-106",
    name: "Cashmere-Merino Ribbed Polo Sweater",
    brand: "MatchesFashion Curated",
    price: 215,
    originalPrice: 280,
    image: "/src/assets/images/product_mens_linen_jacket_1791391886873.jpg",
    productUrl: "https://www.matchesfashion.com/mens/clothing/knitwear",
    partnerName: "MatchesFashion Verified Affiliate",
    category: "Men",
    subCategory: "Knitwear",
    description: "Plush ribbed knit polo with a modern spread collar and mother-of-pearl buttons. Spun with ultra-fine Grade A Mongolian cashmere and Australian Merino wool.",
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "Espresso"],
    discount: 23,
    rating: 4.8,
    reviewCount: 29,
    section: "Trending",
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: "70% Merino Wool, 30% Cashmere",
    fit: "Regular Fit",
    care: "Hand wash cold or gentle dry clean",
    origin: "Authorized MatchesFashion Partner Link",
  },

  // 7. Women's Wide-Leg Trousers (MineMart Direct)
  {
    id: "prod-107",
    name: "Tailored Wide-Leg Pleated Trousers",
    brand: "MineMart Collection",
    price: 135,
    originalPrice: 165,
    image: "/src/assets/images/product_womens_silk_dress_1791391911188.jpg",
    category: "Women",
    subCategory: "Trousers",
    description: "High-waisted trousers with sharp double front pleats and an elegant sweeping wide leg. Features side slash pockets, back welt pockets, and extended tab closure.",
    sizes: ["US 2", "US 4", "US 6", "US 8", "US 10"],
    colors: ["Cream", "Black", "Forest Green"],
    discount: 18,
    stock: 18,
    rating: 4.7,
    reviewCount: 54,
    section: "New Arrivals",
    isTrending: false,
    isNewArrival: true,
    isFeatured: true,
    fabric: "70% Viscose, 26% Wool, 4% Elastane",
    fit: "High rise, wide drape leg",
    care: "Dry clean recommended",
    origin: "Crafted in Istanbul",
  },

  // 8. Kids Organic Cotton Romper (MineMart Direct)
  {
    id: "prod-108",
    name: "Organic Cotton Breton Stripe Romper",
    brand: "MineMart Petit",
    price: 36,
    originalPrice: 45,
    image: "/src/assets/images/hero_fashion_editorial_1791391868816.jpg",
    category: "Kids",
    subCategory: "Babywear",
    description: "Softest GOTS-certified organic cotton knit romper with nickel-free snaps along the inseam for effortless diaper changes. Gentle against delicate infant skin.",
    sizes: ["3-6M", "6-12M", "12-18M", "18-24M"],
    colors: ["Navy", "Terracotta"],
    discount: 20,
    stock: 25,
    rating: 4.9,
    reviewCount: 31,
    section: "New Arrivals",
    isTrending: false,
    isNewArrival: true,
    isFeatured: false,
    fabric: "100% GOTS Certified Organic Cotton",
    fit: "Comfortable relaxed infant fit",
    care: "Machine wash warm, tumble dry low",
    origin: "Portugal",
  },

  // 9. Farfetch Partner Leather Chelsea Boots (External Retailer Link)
  {
    id: "prod-109",
    name: "Goodyear-Welted Leather Chelsea Boots",
    brand: "Farfetch Official Partner",
    price: 290,
    originalPrice: 380,
    image: "/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg",
    productUrl: "https://www.farfetch.com/shopping/men/boots-shoes/items.aspx",
    partnerName: "Farfetch Global Luxury Retailer",
    category: "Footwear",
    subCategory: "Boots",
    description: "Classic elasticated Chelsea silhouette with storm-welted Dainite rubber soles and French calfskin upper. Built to withstand decades of resoling.",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Brown", "Black"],
    discount: 24,
    rating: 4.8,
    reviewCount: 42,
    section: "Best Sellers",
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
    fabric: "100% French Aniline Calf Leather",
    fit: "True to size with comfortable instep",
    care: "Condition regularly with beeswax cream",
    origin: "Northamptonshire, England via Farfetch",
  },

  // 10. Brass Chain Necklace (MineMart Direct)
  {
    id: "prod-110",
    name: "Chunky Link Brass Chain Necklace",
    brand: "MineMart Atelier",
    price: 75,
    originalPrice: 95,
    image: "/src/assets/images/banner_summer_capsule_1791391953514.jpg",
    category: "Accessories",
    subCategory: "Jewelry",
    description: "Statement paperclip chain cast in solid recycled brass and dipped in 18k yellow gold vermeil with an anti-tarnish protective micro-coating.",
    sizes: ["45cm (Adjustable)"],
    colors: ["Gold", "Silver"],
    discount: 21,
    stock: 30,
    rating: 4.7,
    reviewCount: 27,
    section: "Deals",
    isTrending: false,
    isNewArrival: true,
    isFeatured: false,
    fabric: "18k Gold Vermeil over Solid Brass",
    fit: "Length: 45cm with 5cm extender",
    care: "Avoid direct contact with perfumes and water",
    origin: "Artisanal Studio, Athens",
  },

  // 11. Minimalist Leather Tote (MineMart Direct)
  {
    id: "prod-111",
    name: "Structure Pebble Leather Everyday Tote",
    brand: "MineMart Atelier",
    price: 185,
    originalPrice: 240,
    image: "/src/assets/images/banner_summer_capsule_1791391953514.jpg",
    category: "Accessories",
    subCategory: "Bags",
    description: "Full-grain pebbled leather carryall tote featuring reinforced top handles, an interior padded laptop compartment, and solid brass magnetic closure.",
    sizes: ["One Size"],
    colors: ["Black", "Cognac", "Olive"],
    discount: 23,
    stock: 16,
    rating: 4.9,
    reviewCount: 88,
    section: "Best Sellers",
    isTrending: true,
    isNewArrival: false,
    isFeatured: true,
  },

  // 12. Men's Relaxed Linen Trousers (MineMart Direct)
  {
    id: "prod-112",
    name: "Drawstring Relaxed Pure Linen Trousers",
    brand: "MineMart Atelier",
    price: 89,
    originalPrice: 120,
    image: "/src/assets/images/product_mens_linen_jacket_1791391886873.jpg",
    category: "Men",
    subCategory: "Trousers",
    description: "Breathable pure European linen with an elasticated drawstring waistband and deep side pockets for effortless weekend comfort.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Natural Linen", "Navy", "Olive"],
    discount: 26,
    stock: 24,
    rating: 4.8,
    reviewCount: 52,
    section: "Deals",
    isTrending: false,
    isNewArrival: true,
    isFeatured: true,
  },

  /*
   * ==========================================================================
   * 🌟 EXAMPLE PRODUCTS YOU CAN COPY & PASTE TO ADD YOUR OWN PRODUCTS:
   * ==========================================================================
   * 
   * To add a product:
   * 1. Copy one of the examples below.
   * 2. Paste it right above this comment block.
   * 3. Change the `id`, `name`, `category`, `price`, `image`, etc.
   * 4. Save this file — that's it!
   */

  // --- EXAMPLE 1: Simple MineMart Direct Product (Minimal 6 fields) ---
  {
    id: "product-001",
    name: "Men's Casual Linen Shirt",
    category: "Men",
    price: 799,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    section: "Trending",
    description: "Comfortable casual shirt crafted with lightweight breathable cotton linen.",
  },

  // --- EXAMPLE 2: External Retailer / Affiliate Product (With productUrl) ---
  {
    id: "product-002",
    name: "Designer Floral Pleated Midi Dress",
    brand: "Nordstrom Official Store",
    category: "Women",
    price: 1299,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
    productUrl: "https://example.com/authorized-partner-link",
    partnerName: "Nordstrom Luxury Partner",
    section: "Best Sellers",
    description: "Curated partner piece with authorized checkout on the retailer store.",
  },

  // --- EXAMPLE 3: Footwear Product with Sizes and Colors ---
  {
    id: "product-003",
    name: "Retro Court Low-Top Sneakers",
    category: "Footwear",
    price: 999,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    section: "New Arrivals",
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White", "Black", "Navy"],
    discount: 33,
    description: "Everyday cushioned low-top sneakers with durable vulcanized rubber soles.",
  },

  // --- EXAMPLE 4: Accessories / Bag Product ---
  {
    id: "product-004",
    name: "Minimalist Crossbody Saddle Bag",
    category: "Accessories",
    price: 549,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    section: "Deals",
    colors: ["Tan", "Black", "Burgundy"],
    description: "Compact structured crossbody bag with adjustable shoulder strap.",
  },

  // --- EXAMPLE 5: Kids Organic Cotton Sweatshirt ---
  {
    id: "product-005",
    name: "Kids Cozy Organic Cotton Sweatshirt",
    category: "Kids",
    price: 399,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
    section: "Recommended",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Oatmeal", "Sage", "Terracotta"],
    description: "Ultra-soft brushed fleece pullover made from pure organic cotton.",
  },
];

/**
 * ============================================================================
 * AUTOMATIC CONVERSION ENGINE (Works behind the scenes)
 * ============================================================================
 * Converts `SimpleProduct` entries to the full `Product` interface used by
 * MineMart's shopping cart, detail page, category filters, and checkout.
 */

const COLOR_HEX_MAP: Record<string, string> = {
  black: '#18181b',
  white: '#f5f5f4',
  chalk: '#f5f5f0',
  navy: '#1e293b',
  blue: '#2563eb',
  beige: '#d7c7b5',
  cream: '#eee8aa',
  oatmeal: '#d7c7b5',
  gray: '#64748b',
  grey: '#64748b',
  charcoal: '#334155',
  olive: '#606c38',
  sage: '#606c38',
  green: '#15803d',
  forest: '#14532d',
  red: '#dc2626',
  terracotta: '#c2410c',
  clay: '#a26752',
  brown: '#451a03',
  espresso: '#3c2f2f',
  tan: '#9a3412',
  cognac: '#9a3412',
  gold: '#eab308',
  silver: '#cbd5e1',
  burgundy: '#800020',
};

/** Normalizes a category string to a valid CategorySlug */
function normalizeCategory(cat: string): CategorySlug {
  const clean = (cat || '').toLowerCase().trim();
  if (clean.includes('men') && !clean.includes('women')) return 'men';
  if (clean.includes('women')) return 'women';
  if (clean.includes('foot') || clean.includes('shoe')) return 'footwear';
  if (clean.includes('access') || clean.includes('bag') || clean.includes('jewel')) return 'accessories';
  if (clean.includes('kid') || clean.includes('child') || clean.includes('baby')) return 'kids';
  return 'men';
}

/** Converts a simple color (string or object) to a ProductColor */
function normalizeColors(colors?: (string | { name: string; hex: string })[]): ProductColor[] {
  if (!colors || colors.length === 0) {
    return [{ name: 'Standard', hex: '#18181b' }];
  }
  return colors.map((c) => {
    if (typeof c === 'object' && c !== null && 'name' in c && 'hex' in c) {
      return c as ProductColor;
    }
    const colorName = String(c);
    const key = colorName.toLowerCase().trim();
    const hex = COLOR_HEX_MAP[key] || '#52525b';
    return { name: colorName, hex };
  });
}

/**
 * Converts a SimpleProduct to a fully typed Product for the entire website
 */
export function convertSimpleProduct(item: SimpleProduct): Product {
  const normCat = normalizeCategory(item.category);
  const priceVal = item.price !== undefined ? Number(item.price) : 799;
  const origPrice = item.originalPrice !== undefined
    ? Number(item.originalPrice)
    : item.discount
    ? Math.round(priceVal / (1 - item.discount / 100))
    : priceVal;

  const calcDiscount =
    item.discount !== undefined
      ? item.discount
      : origPrice > priceVal
      ? Math.round(((origPrice - priceVal) / origPrice) * 100)
      : 0;

  const allImages = [item.image, ...(item.additionalImages || [])].filter(Boolean);
  const isDirect = !Boolean(item.productUrl);

  const sectionNorm = (item.section || '').toLowerCase();
  const isTrending = item.isTrending ?? (sectionNorm.includes('trend') || false);
  const isNewArrival = item.isNewArrival ?? (sectionNorm.includes('new') || sectionNorm.includes('arrival') || false);
  const isFeatured = item.isFeatured ?? (sectionNorm.includes('recommend') || sectionNorm.includes('feature') || true);

  return {
    id: item.id,
    title: item.name,
    brand: item.brand || 'MineMart',
    category: normCat,
    subCategory: item.subCategory || (normCat === 'men' ? 'Apparel' : normCat === 'women' ? 'Dresses' : 'Essentials'),
    price: priceVal,
    originalPrice: origPrice,
    discountPercent: calcDiscount,
    rating: item.rating !== undefined ? Number(item.rating) : 4.8,
    reviewCount: item.reviewCount !== undefined ? Number(item.reviewCount) : (sectionNorm.includes('best') ? 120 : 28),
    images: allImages.length > 0 ? allImages : ['/src/assets/images/product_mens_linen_jacket_1791391886873.jpg'],
    description: item.description || `${item.name} by ${item.brand || 'MineMart'}. Crafted with premium materials for versatile styling.`,
    details: {
      fabric: item.fabric || 'Premium Quality Blend',
      fit: item.fit || 'Regular True to Size Fit',
      care: item.care || 'Specialist Care or Machine Wash Cold',
      origin: item.origin || (isDirect ? 'MineMart Certified Atelier' : `${item.brand || 'Partner'} Authorized Sourcing`),
    },
    sizes: item.sizes && item.sizes.length > 0 ? item.sizes : (normCat === 'footwear' ? ['UK 8', 'UK 9', 'UK 10'] : normCat === 'accessories' ? ['One Size'] : ['S', 'M', 'L', 'XL']),
    colors: normalizeColors(item.colors),
    isDirectSale: isDirect,
    stock: isDirect ? (item.stock !== undefined ? Number(item.stock) : 25) : 0,
    externalPartner: !isDirect && item.productUrl ? {
      name: item.partnerName || `${item.brand || 'Partner'} Authorized Retailer`,
      url: item.productUrl,
      disclosureText: `Authorized Partner Listing. This item is offered via our verified partnership with ${item.partnerName || item.brand || 'our authorized retailer'}. Orders and returns are processed via the authorized retailer checkout.`,
      buttonText: 'Buy on Authorized Retailer',
      badgeText: 'Authorized Partner Item',
    } : undefined,
    isTrending,
    isNewArrival,
    isFeatured,
    section: item.section,
    createdAt: '2026-10-01',
  };
}

/**
 * INITIAL_PRODUCTS: The complete converted products list used across MineMart
 */
export const INITIAL_PRODUCTS: Product[] = PRODUCTS.map(convertSimpleProduct);
