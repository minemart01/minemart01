/**
 * ============================================================================
 * SECTION 2: MEN'S FASHION
 * File: src/data/my-products/section-2.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "2.X":
 *   - 2.1 = Section 2, Product 1
 *   - 2.2 = Section 2, Product 2
 *   - 2.3 = Section 2, Product 3
 *   - 2.4 = Section 2, Product 4
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_2_INFO: SectionConfig = {
  sectionNumber: 2,
  id: 'mens-fashion',
  name: "Men's Fashion",
  image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
  description: 'Contemporary menswear, relaxed linen tailoring, structured overshirts, and sharp essentials.',
  kicker: 'Tailoring & Basics',
  badge: 'Trending',
};

export const SECTION_2_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 2.1
  // --------------------------------------------------------------------------
  {
    id: '2.1',
    aliasId: 'outfit-005',
    title: 'Unstructured Linen-Wool Blazer & Tailored Chino Set',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    price: '₹5,499',
    description: 'Versatile contemporary tailoring: single-breasted beige linen blazer, crisp white poplin shirt, and olive pleated trousers.',
    isTrending: true,
    isPopular: true,
    tags: ['Tailored', 'Smart Casual', 'Linen Blend'],
    items: [
      {
        name: 'Unstructured Linen-Virgin Wool Blazer',
        image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
        price: '₹2,899',
        originalPrice: '₹3,799',
        brand: 'MineMart Atelier Selection',
        productUrl: 'https://www.nordstrom.com/s/mens-linen-wool-blazer',
        categoryTag: 'Jacket',
        description: 'Italian linen and virgin wool fabric, natural soft shoulder, patch pockets.',
      },
      {
        name: 'Crisp Egyptian Cotton Poplin Dress Shirt',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
        price: '₹1,199',
        originalPrice: '₹1,599',
        brand: 'J.Crew Verified',
        productUrl: 'https://www.jcrew.com/m/mens/categories/clothing/shirts',
        categoryTag: 'Shirt',
        description: 'Spread collar with mother-of-pearl buttons and tailored modern fit.',
      },
      {
        name: 'Pleat-Front Olive Relaxed Tailored Chinos',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
        price: '₹1,499',
        brand: 'Todd Snyder Partner',
        productUrl: 'https://www.toddsnyder.com/collections/pants',
        categoryTag: 'Pants',
        description: 'Garment-dyed stretch cotton twill with single forward pleats.',
      },
      {
        name: 'Calfskin Minimal Low-Top Court Sneakers',
        image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
        price: '₹2,499',
        originalPrice: '₹2,999',
        brand: 'Studio Veloce',
        productUrl: 'https://www.nordstrom.com/s/mens-leather-sneakers',
        categoryTag: 'Shoes',
        description: 'Buttery full-grain calf leather upper and custom Margom rubber sole.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 2.2
  // --------------------------------------------------------------------------
  {
    id: '2.2',
    aliasId: 'outfit-006',
    title: 'Cashmere Knit Polo & Minimal Leather Sneakers Fit',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    price: '₹4,199',
    description: 'Clean luxury knitwear: ribbed cashmere-merino Johnny collar polo, tailored drawstring wool trousers, and white sneakers.',
    isTrending: true,
    isNewArrival: true,
    isPopular: true,
    tags: ['Quiet Luxury', 'Polo', 'Sneakers'],
    items: [
      {
        name: 'Ribbed Cashmere-Merino Johnny Collar Polo',
        image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
        price: '₹2,299',
        originalPrice: '₹2,999',
        brand: 'MatchesFashion Curated',
        productUrl: 'https://www.matchesfashion.com/mens/clothing/knitwear',
        categoryTag: 'Polo',
        description: 'Fine-gauge featherweight polo with buttonless open Johnny collar.',
      },
      {
        name: 'Drawstring Tropical Wool Flannel Trousers',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
        price: '₹1,899',
        brand: 'Suitsupply Partner',
        productUrl: 'https://suitsupply.com/en-us/men/trousers',
        categoryTag: 'Trousers',
        description: 'Pure Italian tropical wool with internal drawstring and elasticated back.',
      },
      {
        name: 'Minimal Chronograph Watch with Brown Leather Strap',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        price: '₹2,499',
        originalPrice: '₹3,200',
        brand: 'Nordstrom Watch Collection',
        productUrl: 'https://www.nordstrom.com/s/mens-leather-watch',
        categoryTag: 'Watch',
        description: 'Sapphire crystal glass with Japanese quartz movement and Horween strap.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 2.3
  // --------------------------------------------------------------------------
  {
    id: '2.3',
    aliasId: 'outfit-007',
    title: 'Suede Overshirt & Selvedge Denim Capsule',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    price: '₹4,799',
    productUrl: 'https://www.nordstrom.com/s/mens-suede-overshirt',
    description: 'Tobacco suede snap-front overshirt over a heavyweight supima tee, paired with Japanese raw selvedge denim and Chelsea boots.',
    isTrending: false,
    isNewArrival: true,
    isPopular: false,
    tags: ['Layering', 'Suede', 'Selvedge'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 2.4:
   * {
   *   id: "2.4",
   *   title: "Casual Oxford Shirt & Chinos",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹1,299"
   * }
   */
];
