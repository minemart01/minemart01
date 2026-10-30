import productStatus from '../data/productStatus';
import { Outfit, ProductItem } from '../data/types';

/**
 * ============================================================================
 * MINEMART PRODUCT & OUTFIT VISIBILITY ENGINE
 * File: src/utils/productVisibility.ts
 * ============================================================================
 *
 * Rules:
 * 1. Outfit Status Rule:
 *    - Must be explicitly set to true in productStatus.ts.
 *    - If false or missing from productStatus.ts, defaults to hidden (false).
 *    - If an outfit's status is false, hide that entire outfit everywhere on
 *      the customer-facing website (homepage, sections, carousels, search results).
 *    - If an outfit is false, none of its individual products should appear
 *      through that outfit or its related-product listings, even if an individual
 *      product status is true.
 *
 * 2. Outfit Product Requirement:
 *    - If an outfit's status is true, its outfit card may appear ONLY if it has
 *      at least one eligible, published product.
 *    - If all products inside an outfit are false (or ineligible), do NOT show
 *      that outfit to customers.
 *
 * 3. Product Status & Visibility:
 *    - If an outfit is true and an individual product is false, hide only that
 *      individual product while allowing the outfit to appear if at least one
 *      other eligible product remains.
 *    - Missing product status defaults to hidden (false).
 *
 * 4. Product Validity & Completeness:
 *    Even if marked true in productStatus.ts:
 *    - Must have valid product information (non-empty name).
 *    - Must have a valid, displayable image URL.
 *    - Must have a valid affiliate purchase link (productUrl).
 * ============================================================================
 */

/**
 * Helper to check status in productStatus record with defensive alias matching
 * (e.g., support both 's1-o1' letter O and 's1-01' digit zero)
 */
function checkStatusRecord(id?: string): boolean {
  if (!id || typeof id !== 'string') return false;
  const cleanId = id.trim();
  if (productStatus[cleanId] === true) return true;

  // Check digit-0 vs letter-o variations defensively
  const aliasWithZero = cleanId.replace(/-o(\d+)/, '-0$1');
  const aliasWithO = cleanId.replace(/-0(\d+)/, '-o$1');
  if (productStatus[aliasWithZero] === true || productStatus[aliasWithO] === true) {
    return true;
  }

  return false;
}

/**
 * Checks if an outfit ID has its status explicitly set to true in productStatus.ts.
 * Missing status defaults to false.
 */
export function isOutfitStatusEnabled(outfitId?: string): boolean {
  if (!outfitId) return false;
  return checkStatusRecord(outfitId);
}

/**
 * Checks if a product ID has its status explicitly set to true in productStatus.ts.
 * Missing status defaults to false.
 */
export function isProductStatusEnabled(productId?: string): boolean {
  if (!productId) return false;
  return checkStatusRecord(productId);
}

/**
 * Validates whether an image URL is non-empty and well-formed
 */
export function isValidImageUrl(img?: string): boolean {
  if (!img || typeof img !== 'string') return false;
  const trimmed = img.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.toLowerCase().includes('placeholder-empty')) return false;
  return true;
}

/**
 * Validates whether an affiliate shopping link is well-formed
 */
export function isValidAffiliateUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (trimmed.length === 0) return false;
  // Must be a valid web URL or protocol-relative link
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('//')
  );
}

export type AnyProductItem = {
  id: string;
  name?: string;
  image?: string;
  productUrl?: string;
  price?: string | number;
  outfitId?: string;
  [key: string]: any;
};

/**
 * Checks if a product item meets all validity criteria (non-empty name, image, affiliate link)
 */
export function isProductEligible(item?: AnyProductItem | null): boolean {
  if (!item) return false;

  // 1. Must have valid product information (name)
  if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
    return false;
  }

  // 2. Must have a valid image
  if (!isValidImageUrl(item.image)) {
    return false;
  }

  // 3. Must have a valid affiliate purchase link
  if (!isValidAffiliateUrl(item.productUrl)) {
    return false;
  }

  return true;
}

/**
 * Checks if an individual product item is visible and valid for customer display.
 * If parentOutfitId is provided:
 * - If the parent outfit status is false, returns false (none of its products appear).
 * - Otherwise, checks the individual product's status and eligibility.
 */
export function isProductVisible(item?: AnyProductItem | null, parentOutfitId?: string): boolean {
  if (!item || !item.id) return false;

  // Rule: If an outfit is false, none of its individual products should appear
  // through that outfit or its related-product listings, even if an individual product status is true.
  const outfitIdToCheck = parentOutfitId || item.outfitId;
  if (outfitIdToCheck) {
    if (!isOutfitStatusEnabled(outfitIdToCheck)) {
      return false;
    }
  }

  // Product status check (defaults to false if missing or false)
  if (!isProductStatusEnabled(String(item.id))) {
    return false;
  }

  // Product validity check (valid name, image, and affiliate link)
  if (!isProductEligible(item)) {
    return false;
  }

  return true;
}

/**
 * Filters an array of products to include only those that are enabled and valid.
 * If parentOutfitId is specified, verifies that the outfit itself is enabled.
 */
export function getVisibleProducts<T extends AnyProductItem = ProductItem>(items?: T[], parentOutfitId?: string): T[] {
  if (!items || !Array.isArray(items)) return [];

  // If parent outfit is provided and is false, no products should appear
  if (parentOutfitId && !isOutfitStatusEnabled(parentOutfitId)) {
    return [];
  }

  return items.filter((item) => isProductVisible(item, parentOutfitId));
}

/**
 * Returns the count of active, visible products for an outfit
 */
export function getVisibleProductCount(items?: ProductItem[], parentOutfitId?: string): number {
  return getVisibleProducts(items, parentOutfitId).length;
}

/**
 * Checks if an outfit itself is visible for customer display:
 * 1. Outfit's status in productStatus.ts must be true (missing defaults to false).
 * 2. Outfit must have at least one eligible, published product.
 * If all products inside an outfit are false or ineligible, returns false.
 */
export function isOutfitVisible(outfit?: Outfit | null): boolean {
  if (!outfit || !outfit.id) return false;

  // 1. Outfit status rule: must be explicitly true in productStatus.ts
  if (!isOutfitStatusEnabled(outfit.id)) {
    return false;
  }

  // 2. Outfit product rule: must have at least one eligible, published product
  const visibleProducts = getVisibleProducts(outfit.items, outfit.id);
  if (visibleProducts.length === 0) {
    return false;
  }

  return true;
}

/**
 * Filters an array of outfits to include only those that are visible
 * (outfit status is true AND at least one eligible, published product is included).
 */
export function getVisibleOutfits(outfits?: Outfit[]): Outfit[] {
  if (!outfits || !Array.isArray(outfits)) return [];
  return outfits.filter(isOutfitVisible);
}
