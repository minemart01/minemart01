/**
 * ============================================================================
 * SECTION 4: CASUAL OUTFITS
 * File: src/data/my-products/section-4.ts
 * ============================================================================
 * 
 * In this file, all products use the ID format "4.X":
 *   - 4.1 = Section 4, Product 1
 *   - 4.2 = Section 4, Product 2
 *   - 4.3 = Section 4, Product 3
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct } from './types';

export const SECTION_4_INFO: SectionConfig = {
  sectionNumber: 4,
  id: 'casual-outfits',
  name: 'Casual Outfits',
  image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
  description: 'Daily comfort meets clean aesthetics. Versatile denim, relaxed tees, and casual knitwear.',
  kicker: 'Everyday Wear',
};

export const SECTION_4_PRODUCTS: SimpleSectionProduct[] = [
  // --------------------------------------------------------------------------
  // PRODUCT 4.1
  // --------------------------------------------------------------------------
  {
    id: '4.1',
    aliasId: 'outfit-011',
    title: 'Striped Breton Longsleeve & Relaxed Wide Denim',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    price: '₹2,199',
    productUrl: 'https://www.nordstrom.com/s/breton-striped-shirt',
    description: 'Timeless nautical stripe heavyweight tee tucked into high-rise vintage washed denim with leather slingback flats.',
    isTrending: true,
    isPopular: true,
    tags: ['Parisian Casual', 'Breton Stripe', 'Everyday'],
    items: [
      {
        name: 'Heavyweight Striped Cotton Boatneck Top',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
        price: '₹899',
        productUrl: 'https://www.nordstrom.com/s/striped-boatneck-top',
        categoryTag: 'Top',
      },
      {
        name: 'High-Rise Relaxed Wide-Leg Denim',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
        price: '₹1,299',
        productUrl: 'https://www.nordstrom.com/s/relaxed-wide-leg-jeans',
        categoryTag: 'Pants',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // PRODUCT 4.2
  // --------------------------------------------------------------------------
  {
    id: '4.2',
    aliasId: 'outfit-012',
    title: 'Linen Button-Down & Tailored Bermuda Short Look',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    price: '₹1,899',
    productUrl: 'https://www.nordstrom.com/s/summer-linen-shirt',
    description: 'Breezy sky blue linen shirt left unbuttoned over a white ribbed tank with pleat-front twill shorts and woven leather slides.',
    isNewArrival: true,
    tags: ['Summer Casual', 'Linen', 'Resort'],
  },

  /*
   * 📋 COPY & PASTE TO ADD PRODUCT 4.3:
   * {
   *   id: "4.3",
   *   title: "White Linen Shirt & Chino Shorts",
   *   image: "PASTE_IMAGE_LINK_HERE",
   *   productUrl: "PASTE_SHOPPING_LINK_HERE",
   *   price: "₹999"
   * }
   */
];
