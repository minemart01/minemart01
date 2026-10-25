/**
 * ============================================================================
 * MINEMART OUTFIT INSPIRATION CATALOG (src/data/outfits.ts)
 * ============================================================================
 * 
 * NOTE: Outfits are now managed in individual section files with simple numbers!
 * Files:
 *   - Section 1 (Aesthetic Women) : src/data/my-products/section-1.ts (IDs: 1.1, 1.2, 1.3...)
 *   - Section 2 (Men's Fashion)   : src/data/my-products/section-2.ts (IDs: 2.1, 2.2, 2.3...)
 *   - Section 3 (Streetwear)      : src/data/my-products/section-3.ts (IDs: 3.1, 3.2, 3.3...)
 *   - Section 4 (Casual Outfits)  : src/data/my-products/section-4.ts (IDs: 4.1, 4.2...)
 *   - Section 5 (Party Wear)      : src/data/my-products/section-5.ts (IDs: 5.1, 5.2...)
 *   - Section 6 (Ethnic Wear)     : src/data/my-products/section-6.ts (IDs: 6.1, 6.2...)
 *   - Section 7 (Shoes & Footwear): src/data/my-products/section-7.ts (IDs: 7.1, 7.2...)
 *   - Section 8 (Bags & Accs)     : src/data/my-products/section-8.ts (IDs: 8.1, 8.2...)
 * 
 * See `src/data/PRODUCT-GUIDE.md` for simple instructions on adding products.
 * ============================================================================
 */

import {
  UNIFIED_OUTFITS,
  getOutfitsByCategory as getUnifiedOutfitsByCategory,
  getOutfitById as getUnifiedOutfitById,
  getTrendingOutfits as getUnifiedTrendingOutfits,
  getNewArrivalOutfits as getUnifiedNewArrivalOutfits,
  getPopularOutfits as getUnifiedPopularOutfits,
} from './my-products';

export const OUTFITS = UNIFIED_OUTFITS;
export const getOutfitsByCategory = getUnifiedOutfitsByCategory;
export const getOutfitById = getUnifiedOutfitById;
export const getTrendingOutfits = getUnifiedTrendingOutfits;
export const getNewArrivalOutfits = getUnifiedNewArrivalOutfits;
export const getPopularOutfits = getUnifiedPopularOutfits;
