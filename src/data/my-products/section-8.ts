/**
 * ============================================================================
 * SECTION 8: BAGS & ACCESSORIES
 * File: src/data/my-products/section-8.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "8.X":
 *   - 8.1 = Section 8, Product 1
 *   - 8.2 = Section 8, Product 2
 *   - 8.3 = Section 8, Product 3
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_8_INFO: SectionConfig = {
  sectionNumber: 8,
  id: 'bags-accessories',
  name: 'Bags & Accessories',
  image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
  description: 'Sculpted leather crossbodies, minimalist jewelry, statement eyewear, and luxury tote bags.',
  kicker: 'Finishing Touches',
};

export const SECTION_8_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 8.1
  // --------------------------------------------------------------------------
  {
    id: '8.1',
    aliasId: 'outfit-019',
    title: 'Spanish Saddle Bag & Gold Chunky Paperclip Chain Set',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    price: '₹3,499',
    description: 'Hand-finished saddle crossbody in vegetable-tanned leather paired with 18k gold vermeil chain and tortoise sunglasses.',
    isTrending: true,
    isPopular: true,
    tags: ['Luxury Leather', 'Crossbody', '18k Gold'],
    items: [
      {
        name: 'Spanish Vegetable-Tanned Leather Saddle Crossbody',
        image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
        price: '₹2,999',
        originalPrice: '₹3,750',
        brand: 'Nordstrom Designer Curations',
        productUrl: 'https://www.nordstrom.com/s/curated-luxury-leather-bag',
        categoryTag: 'Bag',
        description: 'Vegetable-tanned leather, brushed gold hardware, detachable strap.',
      },
      {
        name: 'Chunky Paperclip Link 18k Vermeil Chain',
        image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
        price: '₹899',
        originalPrice: '₹1,199',
        brand: 'Mejuri Partner',
        productUrl: 'https://mejuri.com/shop/products/chunky-chain-necklace',
        categoryTag: 'Jewelry',
        description: 'Solid brass base heavily electroplated in 18k gold with anti-tarnish coat.',
      },
      {
        name: 'Acetate Cat-Eye Sunglasses in Honey Tortoise',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
        price: '₹1,299',
        originalPrice: '₹1,699',
        brand: 'Le Specs Affiliate',
        productUrl: 'https://lespecs.com/collections/sunglasses',
        categoryTag: 'Eyewear',
        description: 'Hand-polished Italian acetate frame with 100% UV400 protective polarized lenses.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 8.2
  // --------------------------------------------------------------------------
  {
    id: '8.2',
    aliasId: 'outfit-020',
    title: 'Architectural Top-Handle Mini Bag & Silk Twilly Scarf',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    price: '₹2,799',
    productUrl: 'https://www.nordstrom.com/s/top-handle-mini-bag',
    description: 'Structured pebbled leather mini handbag wrapped with a hand-rolled printed silk twilly and brushed brass turnlock.',
    isTrending: true,
    isNewArrival: true,
    tags: ['Mini Bag', 'Silk Scarf', 'Statement Accent'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 8.3:
   * {
   *   id: "8.3",
   *   title: "Classic Leather Tote Bag",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹1,999"
   * }
   */
];
