/**
 * ============================================================================
 * MINEMART OUTFIT INSPIRATION CATALOG (src/data/outfits.ts)
 * ============================================================================
 * 
 * Manage your outfit looks here.
 * 
 * TO ADD A NEW OUTFIT:
 * 1. Copy one of the outfit entries below.
 * 2. Paste it into the `OUTFITS` array.
 * 3. Give it a unique `id` (e.g. "outfit-101") and the matching `categoryId`.
 * 4. Add the individual breakdown pieces to `src/data/outfitItems.ts` with matching `outfitId`.
 * 5. Save the file!
 * ============================================================================
 */

import { Outfit } from '../types';

export const OUTFITS: Outfit[] = [
  // --------------------------------------------------------------------------
  // CATEGORY: Aesthetic Women
  // --------------------------------------------------------------------------
  {
    id: 'outfit-001',
    categoryId: 'aesthetic-women',
    title: 'Minimalist Pleated Silk Midi & Trench Look',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    description: 'A fluid olive pleated silk midi dress layered with an oversized double-breasted trench and neutral accessories.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Quiet Luxury', 'Monochrome', 'Silk', 'Formal Daywear'],
    likes: 342,
  },
  {
    id: 'outfit-002',
    categoryId: 'aesthetic-women',
    title: 'Warm Beige Cashmere & Wide-Leg Linen Trouser Fit',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: 'Tone-on-tone neutral perfection: chunky knit cashmere mock neck paired with flowing pleated trousers and suede mules.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Cozy Luxe', 'Neutral Palette', 'Minimal'],
    likes: 512,
  },
  {
    id: 'outfit-003',
    categoryId: 'aesthetic-women',
    title: 'Sculpted Linen Blazer & Slip Skirt Ensemble',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural ecru blazer belted over a champagne satin bias-cut slip skirt with minimal strappy sandals.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Tailored', 'Satin Slip', 'Modern Feminine'],
    likes: 278,
  },
  {
    id: 'outfit-004',
    categoryId: 'aesthetic-women',
    title: 'Chunky Cardigan & High-Waist Raw Denim',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-knit cropped cardigan over a ribbed organic tank, styled with straight-leg light wash jeans and leather loafers.',
    isTrending: false,
    isNewArrival: false,
    isPopular: true,
    tags: ['Weekend Chic', 'Denim', 'Knitwear'],
    likes: 420,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Men's Fashion
  // --------------------------------------------------------------------------
  {
    id: 'outfit-005',
    categoryId: 'mens-fashion',
    title: 'Unstructured Linen-Wool Blazer & Tailored Chino Set',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    description: 'Versatile contemporary tailoring: single-breasted beige linen blazer, crisp white poplin shirt, and olive pleated trousers.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Tailored', 'Smart Casual', 'Linen Blend'],
    likes: 624,
  },
  {
    id: 'outfit-006',
    categoryId: 'mens-fashion',
    title: 'Cashmere Knit Polo & Minimal Leather Sneakers Fit',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    description: 'Clean luxury knitwear: ribbed cashmere-merino Johnny collar polo, tailored drawstring wool trousers, and white sneakers.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Quiet Luxury', 'Polo', 'Sneakers'],
    likes: 489,
  },
  {
    id: 'outfit-007',
    categoryId: 'mens-fashion',
    title: 'Suede Overshirt & Selvedge Denim Capsule',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Tobacco suede snap-front overshirt over a heavyweight supima tee, paired with Japanese raw selvedge denim and Chelsea boots.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Layering', 'Suede', 'Selvedge'],
    likes: 310,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Streetwear
  // --------------------------------------------------------------------------
  {
    id: 'outfit-008',
    categoryId: 'streetwear',
    title: 'Oversized Boxy Graphic Hoodie & Cargo Pant Look',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight 450 GSM boxy washed hoodie with technical multi-pocket parachute pants and chunky retro runners.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Streetwear', 'Oversized', 'Parachute Pants', 'Sneakers'],
    likes: 840,
  },
  {
    id: 'outfit-009',
    categoryId: 'streetwear',
    title: 'Varsity Bomber Jacket & Baggy Carpenter Denim',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    description: 'Wool varsity jacket with chenille patches, vintage-wash faded carpenter jeans, and high-top skate sneakers.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Vintage Street', 'Varsity', 'Skate Style'],
    likes: 720,
  },
  {
    id: 'outfit-010',
    categoryId: 'streetwear',
    title: 'Gorpcore Utility Shell & Technical Crossbody Bag',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    description: 'Waterproof technical shell jacket in earth tones, modular ripstop track pants, trail runners, and a nylon sling pack.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Gorpcore', 'Technical', 'Utility'],
    likes: 415,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Casual Outfits
  // --------------------------------------------------------------------------
  {
    id: 'outfit-011',
    categoryId: 'casual-outfits',
    title: 'Striped Breton Longsleeve & Relaxed Wide Denim',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: 'Timeless nautical stripe heavyweight tee tucked into high-rise vintage washed denim with leather slingback flats.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Parisian Casual', 'Breton Stripe', 'Everyday'],
    likes: 388,
  },
  {
    id: 'outfit-012',
    categoryId: 'casual-outfits',
    title: 'Linen Button-Down & Tailored Bermuda Short Look',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    description: 'Breezy sky blue linen shirt left unbuttoned over a white ribbed tank with pleat-front twill shorts and woven leather slides.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Summer Casual', 'Linen', 'Resort'],
    likes: 290,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Party Wear
  // --------------------------------------------------------------------------
  {
    id: 'outfit-013',
    categoryId: 'party-wear',
    title: 'Emerald Green Asymmetrical Satin Slip & Crystal Heels',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: 'A dazzling emerald satin halter gown paired with metallic strappy crystal heels, drop earrings, and a clutch.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Cocktail', 'Satin Dress', 'Crystal Glam'],
    likes: 910,
  },
  {
    id: 'outfit-014',
    categoryId: 'party-wear',
    title: 'Velvet Shawl-Collar Tuxedo Jacket & Silk Shirt',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Midnight navy plush velvet dinner jacket with satin peak lapels, black silk dress shirt, and patent Oxford shoes.',
    isTrending: true,
    isNewArrival: false,
    isPopular: false,
    tags: ['Black Tie', 'Velvet Blazer', 'Evening Wear'],
    likes: 470,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Ethnic Wear
  // --------------------------------------------------------------------------
  {
    id: 'outfit-015',
    categoryId: 'ethnic-wear',
    title: 'Handcrafted Chanderi Silk Kurta & Dupatta Set',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'An ivory and gold handwoven chanderi anarkali with delicate zari borders, matched with straight palazzos and juttis.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Festive', 'Chanderi Silk', 'Handcrafted'],
    likes: 780,
  },
  {
    id: 'outfit-016',
    categoryId: 'ethnic-wear',
    title: 'Raw Silk Bundi Jacket with Draped Kurta',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Royal mustard silk nehru waistcoat featuring antique metallic buttons worn over a crisp pintuck draped kurta and churidar.',
    isTrending: false,
    isNewArrival: true,
    isPopular: true,
    tags: ['Traditional', 'Nehru Jacket', 'Wedding Guest'],
    likes: 540,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Shoes & Footwear
  // --------------------------------------------------------------------------
  {
    id: 'outfit-017',
    categoryId: 'shoes',
    title: 'Italian Calfskin White Minimal Low-Top Sneakers & Socks',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    description: 'Buttery soft full-grain white calfskin court sneakers styled with ribbed organic cotton crew socks and cropped selvedge denim.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Kicks', 'Court Sneakers', 'Minimal'],
    likes: 670,
  },
  {
    id: 'outfit-018',
    categoryId: 'shoes',
    title: 'Goodyear-Welted French Aniline Leather Chelsea Boots',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Classic storm-welted Chelsea boots in burnished chestnut leather, equipped with durable Dainite rubber soles.',
    isTrending: false,
    isNewArrival: true,
    isPopular: true,
    tags: ['Boots', 'Chelsea', 'Leather Craft'],
    likes: 495,
  },

  // --------------------------------------------------------------------------
  // CATEGORY: Bags & Accessories
  // --------------------------------------------------------------------------
  {
    id: 'outfit-019',
    categoryId: 'bags-accessories',
    title: 'Spanish Saddle Bag & Gold Chunky Paperclip Chain Set',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    description: 'Hand-finished saddle crossbody in vegetable-tanned leather paired with 18k gold vermeil chain and tortoise sunglasses.',
    isTrending: true,
    isNewArrival: false,
    isPopular: true,
    tags: ['Luxury Leather', 'Crossbody', '18k Gold'],
    likes: 830,
  },
  {
    id: 'outfit-020',
    categoryId: 'bags-accessories',
    title: 'Architectural Top-Handle Mini Bag & Silk Twilly Scarf',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Structured pebbled leather mini handbag wrapped with a hand-rolled printed silk twilly and brushed brass turnlock.',
    isTrending: true,
    isNewArrival: true,
    isPopular: false,
    tags: ['Mini Bag', 'Silk Scarf', 'Statement Accent'],
    likes: 560,
  },

  /*
   * --------------------------------------------------------------------------
   * 📋 EXAMPLE OUTFIT TEMPLATE (Copy & paste above to add a new outfit):
   * --------------------------------------------------------------------------
   * {
   *   id: "outfit-021",
   *   categoryId: "aesthetic-women",
   *   title: "Oversized Trench & Cream Knit Set",
   *   image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
   *   description: "Classic double-breasted cotton trench draped over a ribbed crewneck sweater.",
   *   isTrending: true,
   *   isNewArrival: true,
   *   isPopular: false,
   *   tags: ["Trench", "Knit", "Classic"],
   *   likes: 310,
   * },
   */
];

/** Helpers for querying outfits */
export function getOutfitsByCategory(categoryId: string): Outfit[] {
  if (!categoryId || categoryId.toLowerCase() === 'all') {
    return OUTFITS;
  }
  return OUTFITS.filter(
    (o) => o.categoryId.toLowerCase() === categoryId.toLowerCase()
  );
}

export function getOutfitById(id: string): Outfit | undefined {
  return OUTFITS.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

export function getTrendingOutfits(): Outfit[] {
  return OUTFITS.filter((o) => o.isTrending);
}

export function getNewArrivalOutfits(): Outfit[] {
  return OUTFITS.filter((o) => o.isNewArrival);
}

export function getPopularOutfits(): Outfit[] {
  return OUTFITS.filter((o) => o.isPopular);
}
