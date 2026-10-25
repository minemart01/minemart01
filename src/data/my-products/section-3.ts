/**
 * ============================================================================
 * SECTION 3: STREETWEAR
 * File: src/data/my-products/section-3.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "3.X":
 *   - 3.1 = Section 3, Product 1
 *   - 3.2 = Section 3, Product 2
 *   - 3.3 = Section 3, Product 3
 *   - 3.4 = Section 3, Product 4
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_3_INFO: SectionConfig = {
  sectionNumber: 3,
  id: 'streetwear',
  name: 'Streetwear',
  image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
  description: 'Boxy silhouettes, oversized cargos, statement sneakers, graphic layers, and urban utility.',
  kicker: 'Urban & Edgy',
  badge: 'Hot',
};

export const SECTION_3_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 3.1
  // --------------------------------------------------------------------------
  {
    id: '3.1',
    aliasId: 'outfit-008',
    title: 'Oversized Boxy Graphic Hoodie & Cargo Pant Look',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    price: '₹3,299',
    description: 'Heavyweight 450 GSM boxy washed hoodie with technical multi-pocket parachute pants and chunky retro runners.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Streetwear', 'Oversized', 'Parachute Pants', 'Sneakers'],
    items: [
      {
        name: 'Vintage Washed Heavyweight 450 GSM Hoodie',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        price: '₹1,499',
        originalPrice: '₹1,999',
        brand: 'Farfetch Urban',
        productUrl: 'https://www.farfetch.com/shopping/men/hoodies-sweats.aspx',
        categoryTag: 'Hoodie',
        description: '100% French Terry custom vintage wash with boxy double-layered hood.',
      },
      {
        name: 'Technical Multi-Pocket Parachute Cargo Pants',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        price: '₹1,299',
        brand: 'Urban Outfitters Affiliate',
        productUrl: 'https://www.urbanoutfitters.com/mens-cargos',
        categoryTag: 'Pants',
        description: 'Lightweight ripstop fabric with adjustable bungee ankle toggles.',
      },
      {
        name: 'Chunky Retro Trail Runner Sneakers',
        image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
        price: '₹2,199',
        originalPrice: '₹2,799',
        brand: 'ASOS Partner Feed',
        productUrl: 'https://www.asos.com/us/men/shoes/sneakers',
        categoryTag: 'Shoes',
        description: 'Layered mesh and suede overlays with aggressive traction lug sole.',
      },
      {
        name: 'Tactical Nylon Crossbody Sling Pack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        price: '₹799',
        brand: 'Nordstrom Sourced',
        productUrl: 'https://www.nordstrom.com/s/mens-crossbody-bag',
        categoryTag: 'Bag',
        description: 'Water-resistant Cordura nylon with quick-release magnetic buckle.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 3.2
  // --------------------------------------------------------------------------
  {
    id: '3.2',
    aliasId: 'outfit-009',
    title: 'Varsity Bomber Jacket & Baggy Carpenter Denim',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    price: '₹3,799',
    productUrl: 'https://www.farfetch.com/shopping/men/varsity-jackets',
    description: 'Wool varsity jacket with chenille patches, vintage-wash faded carpenter jeans, and high-top skate sneakers.',
    isTrending: true,
    isPopular: true,
    tags: ['Vintage Street', 'Varsity', 'Skate Style'],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 3.3
  // --------------------------------------------------------------------------
  {
    id: '3.3',
    aliasId: 'outfit-010',
    title: 'Gorpcore Utility Shell & Technical Crossbody Bag',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    price: '₹2,999',
    productUrl: 'https://www.nordstrom.com/s/utility-shell-jacket',
    description: 'Waterproof technical shell jacket in earth tones, modular ripstop track pants, trail runners, and a nylon sling pack.',
    isNewArrival: true,
    tags: ['Gorpcore', 'Technical', 'Utility'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 3.4:
   * {
   *   id: "3.4",
   *   title: "Black Graphic Tee & Wide Skate Cargo Pants",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹999"
   * }
   */
];
