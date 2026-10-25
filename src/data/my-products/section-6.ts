/**
 * ============================================================================
 * SECTION 6: ETHNIC WEAR
 * File: src/data/my-products/section-6.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "6.X":
 *   - 6.1 = Section 6, Product 1
 *   - 6.2 = Section 6, Product 2
 *   - 6.3 = Section 6, Product 3
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_6_INFO: SectionConfig = {
  sectionNumber: 6,
  id: 'ethnic-wear',
  name: 'Ethnic Wear',
  image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  description: 'Artisanal embroideries, regal silhouettes, handwoven textiles, and modern fusion festive wear.',
  kicker: 'Traditional & Fusion',
};

export const SECTION_6_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 6.1
  // --------------------------------------------------------------------------
  {
    id: '6.1',
    aliasId: 'outfit-015',
    title: 'Handcrafted Chanderi Silk Kurta & Dupatta Set',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    price: '₹3,799',
    description: 'An ivory and gold handwoven chanderi anarkali with delicate zari borders, matched with straight palazzos and juttis.',
    isTrending: true,
    isPopular: true,
    tags: ['Festive', 'Chanderi Silk', 'Handcrafted'],
    items: [
      {
        name: 'Handwoven Chanderi Zari Embroidered Anarkali',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        price: '₹2,499',
        originalPrice: '₹3,199',
        brand: 'Fabindia Affiliate',
        productUrl: 'https://www.fabindia.com/women-clothing/anarkali-sets',
        categoryTag: 'Kurta',
        description: 'Pure Chanderi silk with intricate gota patti hand embroidery and cotton lining.',
      },
      {
        name: 'Tissue Zari Border Organza Dupatta',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        price: '₹799',
        brand: 'Artisanal Partner',
        productUrl: 'https://www.fabindia.com/dupattas',
        categoryTag: 'Dupatta',
        description: 'Airy gold sheen organza framed with scallop hand-embroidered borders.',
      },
      {
        name: 'Kundan Chandelier Jhumka Earrings',
        image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
        price: '₹599',
        originalPrice: '₹899',
        brand: 'Curated Jewels',
        productUrl: 'https://www.nordstrom.com/s/kundan-earrings',
        categoryTag: 'Jewelry',
        description: 'Gold-plated brass with faux pearls and faceted glass kundan stones.',
      },
      {
        name: 'Hand-Embroidered Raw Silk Mojari Juttis',
        image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
        price: '₹899',
        brand: 'Heritage Footwear',
        productUrl: 'https://www.nordstrom.com/s/ethnic-juttis',
        categoryTag: 'Shoes',
        description: 'Cushioned leather sole with dabka and sequin artisanal handwork.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 6.2
  // --------------------------------------------------------------------------
  {
    id: '6.2',
    aliasId: 'outfit-016',
    title: 'Raw Silk Bundi Jacket with Draped Kurta',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    price: '₹4,499',
    productUrl: 'https://www.fabindia.com/men-clothing/jackets',
    description: 'Royal mustard silk nehru waistcoat featuring antique metallic buttons worn over a crisp pintuck draped kurta and churidar.',
    isNewArrival: true,
    isPopular: true,
    tags: ['Traditional', 'Nehru Jacket', 'Wedding Guest'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 6.3:
   * {
   *   id: "6.3",
   *   title: "Embroidered Georgette Saree",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹2,999"
   * }
   */
];
