/**
 * ============================================================================
 * SECTION 7: SHOES & FOOTWEAR
 * File: src/data/my-products/section-7.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "7.X":
 *   - 7.1 = Section 7, Product 1
 *   - 7.2 = Section 7, Product 2
 *   - 7.3 = Section 7, Product 3
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_7_INFO: SectionConfig = {
  sectionNumber: 7,
  id: 'shoes',
  name: 'Shoes & Footwear',
  image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
  description: 'Curated calfskin sneakers, sleek Chelsea boots, chunky loafers, and statement heels.',
  kicker: 'Kicks & Loafers',
};

export const SECTION_7_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 7.1
  // --------------------------------------------------------------------------
  {
    id: '7.1',
    aliasId: 'outfit-017',
    title: 'Italian Calfskin White Minimal Low-Top Sneakers & Socks',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    price: '₹2,499',
    description: 'Buttery soft full-grain white calfskin court sneakers styled with ribbed organic cotton crew socks and cropped selvedge denim.',
    isTrending: true,
    isPopular: true,
    tags: ['Kicks', 'Court Sneakers', 'Minimal'],
    items: [
      {
        name: 'Minimal Full-Grain White Italian Leather Sneakers',
        image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
        price: '₹2,499',
        originalPrice: '₹3,199',
        brand: 'Studio Veloce',
        productUrl: 'https://www.nordstrom.com/s/mens-leather-sneakers',
        categoryTag: 'Shoes',
        description: 'Handcrafted in Marche with antimicrobial memory foam insoles.',
      },
      {
        name: 'Japanese Selvedge Denim 14oz Raw Jeans',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
        price: '₹1,899',
        originalPrice: '₹2,400',
        brand: 'Unbranded Brand Affiliate',
        productUrl: 'https://theunbrandedbrand.com/products/tapered-selvedge',
        categoryTag: 'Pants',
        description: 'Rope-dyed indigo selvedge denim woven on vintage shuttle looms.',
      },
      {
        name: 'Heavyweight Ribbed Organic Cotton Crew Socks (3-Pack)',
        image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
        price: '₹499',
        brand: 'Bombas Partner',
        productUrl: 'https://bombas.com/products/mens-rib-crew',
        categoryTag: 'Accessories',
        description: 'Seamless toe finish with reinforced honeycomb arch support system.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 7.2
  // --------------------------------------------------------------------------
  {
    id: '7.2',
    aliasId: 'outfit-018',
    title: 'Goodyear-Welted French Aniline Leather Chelsea Boots',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    price: '₹3,899',
    productUrl: 'https://www.farfetch.com/shopping/men/boots-shoes/items.aspx',
    description: 'Classic storm-welted Chelsea boots in burnished chestnut leather, equipped with durable Dainite rubber soles.',
    isNewArrival: true,
    isPopular: true,
    tags: ['Boots', 'Chelsea', 'Leather Craft'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 7.3:
   * {
   *   id: "7.3",
   *   title: "Chunky Suede Penny Loafers",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹1,999"
   * }
   */
];
