/**
 * ============================================================================
 * MINEMART — SIMPLE SECTION PRODUCT TYPES
 * ============================================================================
 */

export interface SectionProductItem {
  /** Name of the individual item, e.g. "White Linen Shirt" */
  name: string;

  /** Photo of the product (optional, uses outfit image if not provided) */
  image?: string;

  /** Price of this item, e.g. "₹799", "$45", or 799 (optional) */
  price?: string | number;

  /** Original price before discount, e.g. "₹1,299" (optional) */
  originalPrice?: string | number;

  /** The external retailer / affiliate shopping link (required) */
  productUrl: string;

  /** Tag for this piece, e.g. "Shirt", "Pants", "Shoes", "Bag", "Accessories" */
  categoryTag?: string;

  /** Brand or store name, e.g. "Nordstrom", "Zara", "Nike" (optional) */
  brand?: string;

  /** Short description (optional) */
  description?: string;
}

export interface SimpleSectionProduct {
  /**
   * Product ID using the simple numbering system:
   * First number = Section Number
   * Second number = Product Number
   * Examples: "1.1", "1.2", "1.5", "2.1", "3.4"
   */
  id: string;

  /** Title of the product or outfit look */
  title: string;

  /** Main photo link for this product or full outfit */
  image: string;

  /** Price (optional, e.g. "₹799", "$49", or 799) */
  price?: string | number;

  /** Main external shopping link (optional if individual items are listed below) */
  productUrl?: string;

  /** Short description of the look or product (optional) */
  description?: string;

  /** Show this product in the Homepage "Trending Looks" carousel? (optional) */
  isTrending?: boolean;

  /** Show this product in the Homepage "New Arrivals" carousel? (optional) */
  isNewArrival?: boolean;

  /** Show this product in the Homepage "Popular Outfits" carousel? (optional) */
  isPopular?: boolean;

  /** Style tags, e.g. ["Casual", "Linen", "Summer"] (optional) */
  tags?: string[];

  /**
   * Individual pieces that make up this outfit (Shirt, Pants, Shoes, Bag, etc.)
   * When someone clicks this outfit, these items appear on its Outfit Details Page.
   */
  items?: SectionProductItem[];

  /** Legacy ID alias to maintain backward compatibility (e.g. "outfit-001") */
  aliasId?: string;
}

export interface SectionConfig {
  sectionNumber: number;
  id: string; // e.g. "aesthetic-women"
  name: string;
  image: string;
  description: string;
  kicker?: string;
  badge?: string;
}
