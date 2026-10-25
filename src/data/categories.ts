/**
 * ============================================================================
 * MINEMART CATEGORIES DATA (src/data/categories.ts)
 * ============================================================================
 * 
 * NOTE: Category details and products are now managed in individual section files
 * inside `src/data/my-products/`:
 *   - Section 1: src/data/my-products/section-1.ts (Aesthetic Women)
 *   - Section 2: src/data/my-products/section-2.ts (Men's Fashion)
 *   - Section 3: src/data/my-products/section-3.ts (Streetwear)
 *   - Section 4: src/data/my-products/section-4.ts (Casual Outfits)
 *   - Section 5: src/data/my-products/section-5.ts (Party Wear)
 *   - Section 6: src/data/my-products/section-6.ts (Ethnic Wear)
 *   - Section 7: src/data/my-products/section-7.ts (Shoes & Footwear)
 *   - Section 8: src/data/my-products/section-8.ts (Bags & Accessories)
 * 
 * To add or edit products, edit those section files directly!
 * ============================================================================
 */

import {
  UNIFIED_CATEGORIES,
  getCategoryById as getUnifiedCategoryById,
} from './my-products';

export const CATEGORIES = UNIFIED_CATEGORIES;
export const getCategoryById = getUnifiedCategoryById;
