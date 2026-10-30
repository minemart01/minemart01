/**
 * MINEMART FASHION — PRODUCT & OUTFIT VISIBILITY STATUS
 * File: src/data/productStatus.ts
 *
 * VISIBILITY RULES:
 * - true  : Entity (outfit or product) is ON / enabled for publishing.
 * - false : Entity is OFF / hidden from customers.
 * - Missing outfit or product status defaults to hidden (false).
 *
 * OUTFIT VISIBILITY ENGINE RULES:
 * 1. If an outfit's status is false, that entire outfit is hidden everywhere
 *    on the customer-facing website (homepage, sections, outfit listings,
 *    carousels, search results).
 * 2. If an outfit's status is true, its card may appear ONLY if it has at least
 *    one eligible, published product (status = true, valid name, image, and affiliate link).
 * 3. If all products inside an outfit are false or ineligible, the outfit is NOT shown.
 * 4. If an outfit is false, none of its individual products appear through that outfit
 *    or its related-product listings, even if an individual product status is true.
 * 5. If an outfit is true and an individual product is false, only that individual
 *    product is hidden, while allowing the outfit to appear if at least one other
 *    eligible product remains.
 *
 * NOTE: To publish any outfit or product, simply change its value below from false to true.
 */

const productStatus: Record<string, boolean> = {
  // ==========================================================================
  // SECTION 1: WOMEN'S ELEVATED ESSENTIALS
  // ==========================================================================
  "s1-o1": false,
  "s1-o1-i1": false,
  "s1-o1-i2": false,
  "s1-o1-i3": false,
  "s1-o1-i4": false,
  "s1-o1-i5": false,
  "s1-o1-i6": false,
  "s1-o1-i7": false,
  "s1-o1-i8": false,

  "s1-o2": false,
  "s1-o2-i1": false,
  "s1-o2-i2": false,
  "s1-o2-i3": false,
  "s1-o2-i4": false,
  "s1-o2-i5": false,
  "s1-o2-i6": false,
  "s1-o2-i7": false,
  "s1-o2-i8": false,

  "s1-o3": false,
  "s1-o3-i1": false,
  "s1-o3-i2": false,
  "s1-o3-i3": false,
  "s1-o3-i4": false,
  "s1-o3-i5": false,

  "s1-o4": false,
  "s1-o4-i1": false,
  "s1-o4-i2": false,
  "s1-o4-i3": false,
  "s1-o4-i4": false,
  "s1-o4-i5": false,

  "s1-o5": false,
  "s1-o5-i1": false,
  "s1-o5-i2": false,
  "s1-o5-i3": false,
  "s1-o5-i4": false,
  "s1-o5-i5": false,

  "s1-o6": false,
  "s1-o6-i1": false,
  "s1-o6-i2": false,
  "s1-o6-i3": false,
  "s1-o6-i4": false,
  "s1-o6-i5": false,

  "s1-o7": false,
  "s1-o7-i1": false,
  "s1-o7-i2": false,
  "s1-o7-i3": false,
  "s1-o7-i4": false,
  "s1-o7-i5": false,

  "s1-o8": false,
  "s1-o8-i1": false,
  "s1-o8-i2": false,
  "s1-o8-i3": false,
  "s1-o8-i4": false,
  "s1-o8-i5": false,

  "s1-o9": false,
  "s1-o9-i1": false,
  "s1-o9-i2": false,
  "s1-o9-i3": false,
  "s1-o9-i4": false,
  "s1-o9-i5": false,

  "s1-o10": false,
  "s1-o10-i1": false,
  "s1-o10-i2": false,
  "s1-o10-i3": false,
  "s1-o10-i4": false,
  "s1-o10-i5": false,

  // ==========================================================================
  // SECTION 2: MEN'S MODERN CLASSICS
  // ==========================================================================
  "s2-o1": false,
  "s2-o1-i1": false,
  "s2-o1-i2": false,
  "s2-o1-i3": false,
  "s2-o1-i4": false,
  "s2-o1-i5": false,

  "s2-o2": false,
  "s2-o2-i1": false,
  "s2-o2-i2": false,
  "s2-o2-i3": false,
  "s2-o2-i4": false,
  "s2-o2-i5": false,

  "s2-o3": false,
  "s2-o3-i1": false,
  "s2-o3-i2": false,
  "s2-o3-i3": false,
  "s2-o3-i4": false,
  "s2-o3-i5": false,

  "s2-o4": false,
  "s2-o4-i1": false,
  "s2-o4-i2": false,
  "s2-o4-i3": false,
  "s2-o4-i4": false,
  "s2-o4-i5": false,

  "s2-o5": false,
  "s2-o5-i1": false,
  "s2-o5-i2": false,
  "s2-o5-i3": false,
  "s2-o5-i4": false,
  "s2-o5-i5": false,

  "s2-o6": false,
  "s2-o6-i1": false,
  "s2-o6-i2": false,
  "s2-o6-i3": false,
  "s2-o6-i4": false,
  "s2-o6-i5": false,

  "s2-o7": false,
  "s2-o7-i1": false,
  "s2-o7-i2": false,
  "s2-o7-i3": false,
  "s2-o7-i4": false,
  "s2-o7-i5": false,

  "s2-o8": false,
  "s2-o8-i1": false,
  "s2-o8-i2": false,
  "s2-o8-i3": false,
  "s2-o8-i4": false,
  "s2-o8-i5": false,

  "s2-o9": false,
  "s2-o9-i1": false,
  "s2-o9-i2": false,
  "s2-o9-i3": false,
  "s2-o9-i4": false,
  "s2-o9-i5": false,

  "s2-o10": false,
  "s2-o10-i1": false,
  "s2-o10-i2": false,
  "s2-o10-i3": false,
  "s2-o10-i4": false,
  "s2-o10-i5": false,

  // ==========================================================================
  // SECTION 3: STREETWEAR & URBAN AESTHETIC
  // ==========================================================================
  "s3-o1": false,
  "s3-o1-i1": false,
  "s3-o1-i2": false,
  "s3-o1-i3": false,
  "s3-o1-i4": false,
  "s3-o1-i5": false,

  "s3-o2": false,
  "s3-o2-i1": false,
  "s3-o2-i2": false,
  "s3-o2-i3": false,
  "s3-o2-i4": false,
  "s3-o2-i5": false,

  "s3-o3": false,
  "s3-o3-i1": false,
  "s3-o3-i2": false,
  "s3-o3-i3": false,
  "s3-o3-i4": false,
  "s3-o3-i5": false,

  "s3-o4": false,
  "s3-o4-i1": false,
  "s3-o4-i2": false,
  "s3-o4-i3": false,
  "s3-o4-i4": false,
  "s3-o4-i5": false,

  "s3-o5": false,
  "s3-o5-i1": false,
  "s3-o5-i2": false,
  "s3-o5-i3": false,
  "s3-o5-i4": false,
  "s3-o5-i5": false,

  "s3-o6": false,
  "s3-o6-i1": false,
  "s3-o6-i2": false,
  "s3-o6-i3": false,
  "s3-o6-i4": false,
  "s3-o6-i5": false,

  "s3-o7": false,
  "s3-o7-i1": false,
  "s3-o7-i2": false,
  "s3-o7-i3": false,
  "s3-o7-i4": false,
  "s3-o7-i5": false,

  "s3-o8": false,
  "s3-o8-i1": false,
  "s3-o8-i2": false,
  "s3-o8-i3": false,
  "s3-o8-i4": false,
  "s3-o8-i5": false,

  "s3-o9": false,
  "s3-o9-i1": false,
  "s3-o9-i2": false,
  "s3-o9-i3": false,
  "s3-o9-i4": false,
  "s3-o9-i5": false,

  "s3-o10": false,
  "s3-o10-i1": false,
  "s3-o10-i2": false,
  "s3-o10-i3": false,
  "s3-o10-i4": false,
  "s3-o10-i5": false,

  // ==========================================================================
  // SECTION 4: CASUAL CHIC & SMART DAILY
  // ==========================================================================
  "s4-o1": false,
  "s4-o1-i1": false,
  "s4-o1-i2": false,
  "s4-o1-i3": false,
  "s4-o1-i4": false,
  "s4-o1-i5": false,

  "s4-o2": false,
  "s4-o2-i1": false,
  "s4-o2-i2": false,
  "s4-o2-i3": false,
  "s4-o2-i4": false,
  "s4-o2-i5": false,

  "s4-o3": false,
  "s4-o3-i1": false,
  "s4-o3-i2": false,
  "s4-o3-i3": false,
  "s4-o3-i4": false,
  "s4-o3-i5": false,

  "s4-o4": false,
  "s4-o4-i1": false,
  "s4-o4-i2": false,
  "s4-o4-i3": false,
  "s4-o4-i4": false,
  "s4-o4-i5": false,

  "s4-o5": false,
  "s4-o5-i1": false,
  "s4-o5-i2": false,
  "s4-o5-i3": false,
  "s4-o5-i4": false,
  "s4-o5-i5": false,

  "s4-o6": false,
  "s4-o6-i1": false,
  "s4-o6-i2": false,
  "s4-o6-i3": false,
  "s4-o6-i4": false,
  "s4-o6-i5": false,

  "s4-o7": false,
  "s4-o7-i1": false,
  "s4-o7-i2": false,
  "s4-o7-i3": false,
  "s4-o7-i4": false,
  "s4-o7-i5": false,

  "s4-o8": false,
  "s4-o8-i1": false,
  "s4-o8-i2": false,
  "s4-o8-i3": false,
  "s4-o8-i4": false,
  "s4-o8-i5": false,

  "s4-o9": false,
  "s4-o9-i1": false,
  "s4-o9-i2": false,
  "s4-o9-i3": false,
  "s4-o9-i4": false,
  "s4-o9-i5": false,

  "s4-o10": false,
  "s4-o10-i1": false,
  "s4-o10-i2": false,
  "s4-o10-i3": false,
  "s4-o10-i4": false,
  "s4-o10-i5": false,

  // ==========================================================================
  // SECTION 5: PARTY WEAR & EVENING GLAMOUR
  // ==========================================================================
  "s5-o1": false,
  "s5-o1-i1": false,
  "s5-o1-i2": false,
  "s5-o1-i3": false,
  "s5-o1-i4": false,
  "s5-o1-i5": false,

  "s5-o2": false,
  "s5-o2-i1": false,
  "s5-o2-i2": false,
  "s5-o2-i3": false,
  "s5-o2-i4": false,
  "s5-o2-i5": false,

  "s5-o3": false,
  "s5-o3-i1": false,
  "s5-o3-i2": false,
  "s5-o3-i3": false,
  "s5-o3-i4": false,
  "s5-o3-i5": false,

  "s5-o4": false,
  "s5-o4-i1": false,
  "s5-o4-i2": false,
  "s5-o4-i3": false,
  "s5-o4-i4": false,
  "s5-o4-i5": false,

  "s5-o5": false,
  "s5-o5-i1": false,
  "s5-o5-i2": false,
  "s5-o5-i3": false,
  "s5-o5-i4": false,
  "s5-o5-i5": false,

  "s5-o6": false,
  "s5-o6-i1": false,
  "s5-o6-i2": false,
  "s5-o6-i3": false,
  "s5-o6-i4": false,
  "s5-o6-i5": false,

  "s5-o7": false,
  "s5-o7-i1": false,
  "s5-o7-i2": false,
  "s5-o7-i3": false,
  "s5-o7-i4": false,
  "s5-o7-i5": false,

  "s5-o8": false,
  "s5-o8-i1": false,
  "s5-o8-i2": false,
  "s5-o8-i3": false,
  "s5-o8-i4": false,
  "s5-o8-i5": false,

  "s5-o9": false,
  "s5-o9-i1": false,
  "s5-o9-i2": false,
  "s5-o9-i3": false,
  "s5-o9-i4": false,
  "s5-o9-i5": false,

  "s5-o10": false,
  "s5-o10-i1": false,
  "s5-o10-i2": false,
  "s5-o10-i3": false,
  "s5-o10-i4": false,
  "s5-o10-i5": false,

  // ==========================================================================
  // SECTION 6: ETHNIC & TRADITIONAL LOOKS
  // ==========================================================================
  "s6-o1": false,
  "s6-o1-i1": false,
  "s6-o1-i2": false,
  "s6-o1-i3": false,
  "s6-o1-i4": false,
  "s6-o1-i5": false,

  "s6-o2": false,
  "s6-o2-i1": false,
  "s6-o2-i2": false,
  "s6-o2-i3": false,
  "s6-o2-i4": false,
  "s6-o2-i5": false,

  "s6-o3": false,
  "s6-o3-i1": false,
  "s6-o3-i2": false,
  "s6-o3-i3": false,
  "s6-o3-i4": false,
  "s6-o3-i5": false,

  "s6-o4": false,
  "s6-o4-i1": false,
  "s6-o4-i2": false,
  "s6-o4-i3": false,
  "s6-o4-i4": false,
  "s6-o4-i5": false,

  "s6-o5": false,
  "s6-o5-i1": false,
  "s6-o5-i2": false,
  "s6-o5-i3": false,
  "s6-o5-i4": false,
  "s6-o5-i5": false,

  "s6-o6": false,
  "s6-o6-i1": false,
  "s6-o6-i2": false,
  "s6-o6-i3": false,
  "s6-o6-i4": false,
  "s6-o6-i5": false,

  "s6-o7": false,
  "s6-o7-i1": false,
  "s6-o7-i2": false,
  "s6-o7-i3": false,
  "s6-o7-i4": false,
  "s6-o7-i5": false,

  "s6-o8": false,
  "s6-o8-i1": false,
  "s6-o8-i2": false,
  "s6-o8-i3": false,
  "s6-o8-i4": false,
  "s6-o8-i5": false,

  "s6-o9": false,
  "s6-o9-i1": false,
  "s6-o9-i2": false,
  "s6-o9-i3": false,
  "s6-o9-i4": false,
  "s6-o9-i5": false,

  "s6-o10": false,
  "s6-o10-i1": false,
  "s6-o10-i2": false,
  "s6-o10-i3": false,
  "s6-o10-i4": false,
  "s6-o10-i5": false,

  // ==========================================================================
  // CATALOG ITEMS & ALTERNATIVE OUTFIT IDS
  // ==========================================================================
  "outfit-001": false,
  "item-001-1": false,
  "item-001-2": false,
  "item-001-3": false,
  "item-001-4": false,

  "outfit-002": false,
  "item-002-1": false,
  "item-002-2": false,
  "item-002-3": false,
  "item-002-4": false,
  "item-002-5": false,

  "outfit-003": false,
  "item-003-1": false,
  "item-003-2": false,
  "item-003-3": false,

  "outfit-005": false,
  "item-005-1": false,
  "item-005-2": false,
  "item-005-3": false,
  "item-005-4": false,

  "outfit-006": false,
  "item-006-1": false,
  "item-006-2": false,
  "item-006-3": false,

  "outfit-008": false,
  "item-008-1": false,
  "item-008-2": false,
  "item-008-3": false,
  "item-008-4": false,

  "outfit-013": false,
  "item-013-1": false,
  "item-013-2": false,
  "item-013-3": false,

  "outfit-015": false,
  "item-015-1": false,
  "item-015-2": false,
  "item-015-3": false,
  "item-015-4": false,

  "outfit-017": false,
  "item-017-1": false,
  "item-017-2": false,
  "item-017-3": false,

  "outfit-019": false,
  "item-019-1": false,
  "item-019-2": false,
  "item-019-3": false,

  "1.1": false,
  "1.2": false,
  "1.3": false,
  "1.4": false,
  "2.1": false,
  "2.2": false,
  "2.3": false,
  "3.1": false,
  "3.2": false,
  "3.3": false,
  "4.1": false,
  "4.2": false,
  "5.1": false,
  "5.2": false,
  "6.1": false,
  "6.2": false,
  "7.1": false,
  "7.2": false,
  "8.1": false,
  "8.2": false,

  "prod-101": false,
  "prod-102": false,
  "prod-103": false,
  "prod-104": false,
  "prod-105": false,
  "prod-106": false,
  "prod-107": false,
  "prod-108": false,
  "prod-109": false,
  "prod-110": false,
  "prod-111": false,
  "prod-112": false,
  "product-001": false,
  "product-002": false,
  "product-003": false,
  "product-004": false,
  "product-005": false,
};

export default productStatus;
