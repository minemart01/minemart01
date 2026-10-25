/**
 * ============================================================================
 * SECTION 1: AESTHETIC WOMEN
 * File: src/data/my-products/section-1.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "1.X":
 *   - 1.1 = Section 1, Product 1
 *   - 1.2 = Section 1, Product 2
 *   - 1.3 = Section 1, Product 3
 *   - 1.4 = Section 1, Product 4
 *   - 1.5 = Section 1, Product 5
 * 
 * TO ADD A NEW PRODUCT OR OUTFIT:
 * 1. Scroll down to the end of SECTION_1_PRODUCTS.
 * 2. Copy the EXAMPLE template at the bottom.
 * 3. Change "1.5" to your new number, paste your image link and shopping link.
 * 4. Save this file — that's all!
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_1_INFO: SectionConfig = {
  sectionNumber: 1,
  id: 'aesthetic-women',
  name: 'Aesthetic Women',
  image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
  description: 'Minimalist silhouettes, neutral palettes, quiet luxury, and timeless feminine tailoring.',
  kicker: 'Effortless Chic',
  badge: 'Popular',
};

export const SECTION_1_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 1.1
  // --------------------------------------------------------------------------
  {
    id: '1.1',
    aliasId: 'outfit-001',
    title: 'Minimalist Pleated Silk Midi & Trench Look',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    price: '₹4,999',
    description: 'A fluid olive pleated silk midi dress layered with an oversized double-breasted trench and neutral accessories.',
    isTrending: true,
    isPopular: true,
    tags: ['Quiet Luxury', 'Monochrome', 'Silk', 'Formal Daywear'],
    items: [
      {
        name: 'Pleated Mulberry Silk Midi Dress',
        image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
        price: '₹2,499',
        originalPrice: '₹3,299',
        brand: 'MineMart Atelier Selection',
        productUrl: 'https://www.nordstrom.com/s/pleated-silk-midi-dress',
        categoryTag: 'Dress',
        description: 'Cut from pure 6A grade mulberry silk with micro-pleated skirt and fluid drape.',
      },
      {
        name: 'Relaxed Water-Resistant Cotton Trench Coat',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        price: '₹3,499',
        originalPrice: '₹4,200',
        brand: 'Everlane Curated',
        productUrl: 'https://www.everlane.com/products/womens-drape-trench',
        categoryTag: 'Outerwear',
        description: 'Double-breasted timeless silhouette with storm flap and tortoiseshell buckle.',
      },
      {
        name: 'Sculpted Top-Handle Saddle Crossbody Bag',
        image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
        price: '₹2,999',
        originalPrice: '₹3,750',
        brand: 'Nordstrom Designer',
        productUrl: 'https://www.nordstrom.com/s/curated-luxury-leather-bag',
        categoryTag: 'Bag',
        description: 'Vegetable-tanned Spanish leather with brushed gold turnlock closure.',
      },
      {
        name: 'Minimal Strappy Leather Heeled Sandals',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        price: '₹1,899',
        originalPrice: '₹2,499',
        brand: 'Reformation Partner',
        productUrl: 'https://www.thereformation.com/shoes/minimal-sandals',
        categoryTag: 'Shoes',
        description: 'Barely-there delicate leather straps with comfortable 65mm block heel.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 1.2
  // --------------------------------------------------------------------------
  {
    id: '1.2',
    aliasId: 'outfit-002',
    title: 'Warm Beige Cashmere & Wide-Leg Linen Trouser Fit',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    price: '₹3,899',
    description: 'Tone-on-tone neutral perfection: chunky knit cashmere mock neck paired with flowing pleated trousers and suede mules.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Cozy Luxe', 'Neutral Palette', 'Minimal'],
    items: [
      {
        name: 'Oversized Cashmere-Merino Mock Neck Sweater',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
        price: '₹2,199',
        originalPrice: '₹2,899',
        brand: 'MatchesFashion',
        productUrl: 'https://www.matchesfashion.com/womens/clothing/knitwear',
        categoryTag: 'Top',
        description: 'Ultra-soft 7-gauge Mongolian cashmere knit in natural oatmeal tone.',
      },
      {
        name: 'High-Rise Double Pleated Wide-Leg Trousers',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
        price: '₹1,599',
        originalPrice: '₹1,999',
        brand: 'COS Partner',
        productUrl: 'https://www.cos.com/en_usd/women/trousers/wide-leg',
        categoryTag: 'Pants',
        description: 'Fluid wool-viscose blend with deep front pleats and fluid movement.',
      },
      {
        name: 'Pointed Suede Mules in Warm Taupe',
        image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
        price: '₹1,699',
        brand: 'Farfetch Sourced',
        productUrl: 'https://www.farfetch.com/shopping/women/shoes-mules.aspx',
        categoryTag: 'Shoes',
        description: 'Slip-on Italian calf suede mules with cushioned leather insole.',
      },
      {
        name: 'Pebbled Leather Slouchy Shoulder Hobo',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        price: '₹2,499',
        originalPrice: '₹3,199',
        brand: 'Madewell Affiliate',
        productUrl: 'https://www.madewell.com/womens/accessories/bags',
        categoryTag: 'Bag',
        description: 'Generous everyday leather bag with magnetic tab and interior zipped pouch.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 1.3
  // --------------------------------------------------------------------------
  {
    id: '1.3',
    aliasId: 'outfit-003',
    title: 'Sculpted Linen Blazer & Slip Skirt Ensemble',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    price: '₹3,499',
    description: 'An architectural ecru blazer belted over a champagne satin bias-cut slip skirt with minimal strappy sandals.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Tailored', 'Satin Slip', 'Modern Feminine'],
    items: [
      {
        name: 'Sculpted Hourglass Linen-Blend Blazer',
        image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
        price: '₹2,299',
        originalPrice: '₹2,999',
        brand: 'Mango Verified',
        productUrl: 'https://shop.mango.com/us/women/blazers',
        categoryTag: 'Blazer',
        description: 'Tailored waistline, sharp peaked lapels, and horn button detail.',
      },
      {
        name: 'Bias-Cut Silk Charmeuse Slip Skirt',
        image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
        price: '₹1,499',
        brand: 'Quince Affiliate',
        productUrl: 'https://www.quince.com/women/silk/silk-skirt',
        categoryTag: 'Skirt',
        description: '100% washable silk with an elastic waistband and flattering midi drape.',
      },
      {
        name: '18k Gold Plated Link Chunky Necklace',
        image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
        price: '₹899',
        originalPrice: '₹1,199',
        brand: 'Mejuri Partner',
        productUrl: 'https://mejuri.com/shop/products/chunky-chain-necklace',
        categoryTag: 'Jewelry',
        description: 'Statement recycled brass paperclip chain with anti-tarnish coating.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 1.4
  // --------------------------------------------------------------------------
  {
    id: '1.4',
    aliasId: 'outfit-004',
    title: 'Chunky Cardigan & High-Waist Raw Denim',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    price: '₹2,799',
    productUrl: 'https://www.nordstrom.com/s/chunky-knit-cardigan',
    description: 'Hand-knit cropped cardigan over a ribbed organic tank, styled with straight-leg light wash jeans and leather loafers.',
    isTrending: false,
    isNewArrival: false,
    isPopular: true,
    tags: ['Weekend Chic', 'Denim', 'Knitwear'],
  },

  /*
   * --------------------------------------------------------------------------
   * 📋 EXAMPLE: COPY & PASTE TO ADD PRODUCT 1.5
   * --------------------------------------------------------------------------
   * {
   *   id: "1.5",
   *   title: "Oversized Wool Trench & Beige Trousers",
   *   image: "PASTE_OUTFIT_IMAGE_URL_HERE",
   *   price: "₹3,999",
   *   productUrl: "PASTE_MAIN_SHOPPING_LINK_HERE",
   *   description: "Classic relaxed fit outerwear for everyday styling.",
   *   items: [
   *     {
   *       name: "Beige Wool Trench Coat",
   *       image: "PASTE_COAT_IMAGE_URL_HERE",
   *       price: "₹2,999",
   *       productUrl: "PASTE_COAT_SHOPPING_LINK_HERE",
   *       categoryTag: "Coat"
   *     },
   *     {
   *       name: "Wide-Leg Tailored Trousers",
   *       image: "PASTE_PANTS_IMAGE_URL_HERE",
   *       price: "₹1,499",
   *       productUrl: "PASTE_PANTS_SHOPPING_LINK_HERE",
   *       categoryTag: "Pants"
   *     }
   *   ]
   * }
   */
];
