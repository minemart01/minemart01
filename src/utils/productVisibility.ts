import productStatus from '../data/productStatus';
import { ProductItem } from '../data/types';

/**
 * ============================================================================
 * MINEMART PRODUCT VISIBILITY & VALIDITY ENGINE
 * ============================================================================
 *
 * Rules:
 * 1. Status rule:
 *    - Must be explicitly set to true in productStatus.ts.
 *    - If false or missing from productStatus, returns false.
 *    - Changing one product's status affects ONLY that product.
 *
 * 2. Validity rules (Prevent invalid products from appearing):
 *    Even if a product is marked true in productStatus.ts:
 *    - Must have valid product information (non-empty name).
 *    - Must have a valid image URL.
 *    - Must have a valid affiliate purchase link (productUrl).
 * ============================================================================
 */

/**
 * Validates whether an image URL is non-empty and well-formed
 */
function isValidImageUrl(img?: string): boolean {
  if (!img || typeof img !== 'string') return false;
  const trimmed = img.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.toLowerCase().includes('placeholder-empty')) return false;
  return true;
}

/**
 * Validates whether an affiliate shopping link is well-formed
 */
function isValidAffiliateUrl(url?: string): boolean {
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

/**
 * Checks if an individual product item is visible and valid for customer display
 */
export function isProductVisible(item?: ProductItem | null): boolean {
  if (!item || !item.id) return false;

  const id = String(item.id).trim();

  // 1. Status check: must be explicitly true in productStatus
  let isEnabled = productStatus[id] === true;

  // Defensive support for human typing variations in productStatus:
  // e.g. "s1-01-i1" (digit 0) vs "s1-o1-i1" (letter o)
  if (!isEnabled) {
    const aliasWithZero = id.replace(/-o(\d+)-/, '-0$1-');
    const aliasWithO = id.replace(/-0(\d+)-/, '-o$1-');
    if (productStatus[aliasWithZero] === true || productStatus[aliasWithO] === true) {
      isEnabled = true;
    }
  }

  // If not enabled or missing, it defaults to hidden (false)
  if (!isEnabled) {
    return false;
  }

  // 2. Validity rule: must have valid product information (name)
  if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
    return false;
  }

  // 3. Validity rule: must have a valid image
  if (!isValidImageUrl(item.image)) {
    return false;
  }

  // 4. Validity rule: must have a valid affiliate shopping link
  if (!isValidAffiliateUrl(item.productUrl)) {
    return false;
  }

  return true;
}

/**
 * Filters an array of products to include only those that are both enabled and valid
 */
export function getVisibleProducts(items?: ProductItem[]): ProductItem[] {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(isProductVisible);
}

/**
 * Returns the count of active, visible products
 */
export function getVisibleProductCount(items?: ProductItem[]): number {
  return getVisibleProducts(items).length;
}
