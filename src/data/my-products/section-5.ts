/**
 * ============================================================================
 * SECTION 5: PARTY WEAR
 * File: src/data/my-products/section-5.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "5.X":
 *   - 5.1 = Section 5, Product 1
 *   - 5.2 = Section 5, Product 2
 *   - 5.3 = Section 5, Product 3
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_5_INFO: SectionConfig = {
  sectionNumber: 5,
  id: 'party-wear',
  name: 'Party Wear',
  image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
  description: 'Glamorous evening looks, sculpted satin dresses, sharp velvet blazers, and party statement fits.',
  kicker: 'Night Out & Events',
};

export const SECTION_5_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 5.1
  // --------------------------------------------------------------------------
  {
    id: '5.1',
    aliasId: 'outfit-013',
    title: 'Emerald Green Asymmetrical Satin Slip & Crystal Heels',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    price: '₹4,999',
    description: 'A dazzling emerald satin halter gown paired with metallic strappy crystal heels, drop earrings, and a clutch.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Cocktail', 'Satin Dress', 'Crystal Glam'],
    items: [
      {
        name: 'Asymmetrical Emerald Cowl Neck Silk Gown',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        price: '₹3,299',
        originalPrice: '₹4,200',
        brand: 'Reformation Partner',
        productUrl: 'https://www.thereformation.com/dresses/evening',
        categoryTag: 'Dress',
        description: 'Floor-skimming heavy silk charmeuse with deep thigh split and cowl back.',
      },
      {
        name: 'Metallic Strappy Crystal Stiletto Heels',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        price: '₹2,499',
        originalPrice: '₹3,199',
        brand: 'Farfetch Luxury',
        productUrl: 'https://www.farfetch.com/shopping/women/shoes-heels.aspx',
        categoryTag: 'Shoes',
        description: 'Delicate crystal-encrusted straps on metallic silver mirror leather.',
      },
      {
        name: 'Satin Knotted Minaudière Evening Clutch',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        price: '₹1,499',
        brand: 'Nordstrom Curated',
        productUrl: 'https://www.nordstrom.com/s/evening-clutch',
        categoryTag: 'Bag',
        description: 'Hard-case evening clutch wrapped in emerald satin with detachable chain.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 5.2
  // --------------------------------------------------------------------------
  {
    id: '5.2',
    aliasId: 'outfit-014',
    title: 'Velvet Shawl-Collar Tuxedo Jacket & Silk Shirt',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    price: '₹5,999',
    productUrl: 'https://www.nordstrom.com/s/mens-velvet-tuxedo',
    description: 'Midnight navy plush velvet dinner jacket with satin peak lapels, black silk dress shirt, and patent Oxford shoes.',
    isTrending: true,
    tags: ['Black Tie', 'Velvet Blazer', 'Evening Wear'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 5.3:
   * {
   *   id: "5.3",
   *   title: "Sequined Cocktail Mini Dress",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹2,499"
   * }
   */
];
