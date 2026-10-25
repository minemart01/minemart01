/**
 * ============================================================================
 * MINEMART — CENTRAL SECTION & PRODUCT REGISTRY
 * File: src/data/my-products/index.ts
 * ============================================================================
 * 
 * This file gathers all your section files (section-1.ts, section-2.ts, etc.)
 * and connects them seamlessly to the Home Page, Category Page, and Outfit Details Page.
 * 
 * YOU DO NOT NEED TO EDIT THIS FILE TO ADD PRODUCTS.
 * Just edit section-1.ts, section-2.ts, etc.!
 * ============================================================================
 */

import { SectionConfig, SimpleSectionProduct, SectionProductItem } from './types';
import { Category, Outfit, OutfitItem } from '../../types';

import { SECTION_1_INFO, SECTION_1_PRODUCTS } from './section-1';
import { SECTION_2_INFO, SECTION_2_PRODUCTS } from './section-2';
import { SECTION_3_INFO, SECTION_3_PRODUCTS } from './section-3';
import { SECTION_4_INFO, SECTION_4_PRODUCTS } from './section-4';
import { SECTION_5_INFO, SECTION_5_PRODUCTS } from './section-5';
import { SECTION_6_INFO, SECTION_6_PRODUCTS } from './section-6';
import { SECTION_7_INFO, SECTION_7_PRODUCTS } from './section-7';
import { SECTION_8_INFO, SECTION_8_PRODUCTS } from './section-8';

export * from './types';

export interface SectionBundle {
  info: SectionConfig;
  products: SimpleSectionProduct[];
}

/** Array of all configured sections in order */
export const ALL_SECTION_BUNDLES: SectionBundle[] = [
  { info: SECTION_1_INFO, products: SECTION_1_PRODUCTS },
  { info: SECTION_2_INFO, products: SECTION_2_PRODUCTS },
  { info: SECTION_3_INFO, products: SECTION_3_PRODUCTS },
  { info: SECTION_4_INFO, products: SECTION_4_PRODUCTS },
  { info: SECTION_5_INFO, products: SECTION_5_PRODUCTS },
  { info: SECTION_6_INFO, products: SECTION_6_PRODUCTS },
  { info: SECTION_7_INFO, products: SECTION_7_PRODUCTS },
  { info: SECTION_8_INFO, products: SECTION_8_PRODUCTS },
];

/** Parse numeric price from string like "₹1,499" or "$45" */
function parsePrice(val?: string | number): number | undefined {
  if (val === undefined || val === null) return undefined;
  if (typeof val === 'number') return val;
  const digits = val.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(digits);
  return isNaN(parsed) ? undefined : parsed;
}

/** Convert a SimpleSectionProduct into the standard Outfit model */
function convertToOutfit(
  prod: SimpleSectionProduct,
  categoryInfo: SectionConfig
): Outfit {
  return {
    id: prod.id,
    categoryId: categoryInfo.id,
    title: prod.title,
    image: prod.image,
    description: prod.description || `${prod.title} curated in ${categoryInfo.name}.`,
    price: prod.price,
    isTrending: Boolean(prod.isTrending),
    isNewArrival: Boolean(prod.isNewArrival),
    isPopular: Boolean(prod.isPopular),
    tags: prod.tags || [categoryInfo.kicker || 'Curated Look'],
    likes: 250 + Math.floor((parsePrice(prod.price) || 500) / 10),
  };
}

/** Convert items from a SimpleSectionProduct into OutfitItem array */
function convertToOutfitItems(
  prod: SimpleSectionProduct,
  categoryInfo: SectionConfig
): OutfitItem[] {
  // If user provided individual breakdown items (shirt, pants, etc.):
  if (prod.items && prod.items.length > 0) {
    return prod.items.map((item, idx) => ({
      id: `item-${prod.id}-${idx + 1}`,
      outfitId: prod.id,
      name: item.name,
      image: item.image || prod.image,
      price: parsePrice(item.price),
      originalPrice: parsePrice(item.originalPrice),
      brand: item.brand || categoryInfo.name,
      productUrl: item.productUrl,
      categoryTag: item.categoryTag || 'Look Item',
      description: item.description,
    }));
  }

  // If user provided a direct shopping link for the product itself:
  if (prod.productUrl) {
    return [
      {
        id: `item-${prod.id}-main`,
        outfitId: prod.id,
        name: prod.title,
        image: prod.image,
        price: parsePrice(prod.price),
        brand: categoryInfo.name,
        productUrl: prod.productUrl,
        categoryTag: categoryInfo.kicker || 'Direct Product',
        description: prod.description,
      },
    ];
  }

  return [];
}

/**
 * ----------------------------------------------------------------------------
 * DERIVED UNIFIED COLLECTIONS (Single Source of Truth)
 * ----------------------------------------------------------------------------
 */

/** All Categories dynamically derived from section files */
export const UNIFIED_CATEGORIES: Category[] = ALL_SECTION_BUNDLES.map(
  ({ info, products }) => ({
    id: info.id,
    name: info.name,
    image: info.image,
    description: info.description,
    kicker: info.kicker,
    badge: info.badge,
    itemCount: products.length,
  })
);

/** Map of all Outfits indexed by their new ID (e.g. "1.1") and aliasId (e.g. "outfit-001") */
const outfitLookup = new Map<string, Outfit>();
const outfitItemsLookup = new Map<string, OutfitItem[]>();

export const UNIFIED_OUTFITS: Outfit[] = [];
export const UNIFIED_OUTFIT_ITEMS: OutfitItem[] = [];

ALL_SECTION_BUNDLES.forEach(({ info, products }) => {
  products.forEach((prod) => {
    const outfit = convertToOutfit(prod, info);
    const items = convertToOutfitItems(prod, info);

    UNIFIED_OUTFITS.push(outfit);
    UNIFIED_OUTFIT_ITEMS.push(...items);

    // Index by primary ID (e.g. "1.1")
    outfitLookup.set(prod.id.toLowerCase(), outfit);
    outfitItemsLookup.set(prod.id.toLowerCase(), items);

    // Index by alias ID if present (e.g. "outfit-001")
    if (prod.aliasId) {
      outfitLookup.set(prod.aliasId.toLowerCase(), outfit);
      outfitItemsLookup.set(prod.aliasId.toLowerCase(), items);
    }
  });
});

/**
 * ----------------------------------------------------------------------------
 * EASY QUERY HELPER FUNCTIONS
 * ----------------------------------------------------------------------------
 */

/** Find a category by ID (supports "aesthetic-women", "section-1", "1") */
export function getCategoryById(id: string): Category | undefined {
  if (!id) return undefined;
  const clean = id.toLowerCase().trim();

  // Match exact ID
  const direct = UNIFIED_CATEGORIES.find((c) => c.id.toLowerCase() === clean);
  if (direct) return direct;

  // Match section number e.g. "1" or "section-1"
  const secNum = parseInt(clean.replace('section-', ''), 10);
  if (!isNaN(secNum) && secNum >= 1 && secNum <= ALL_SECTION_BUNDLES.length) {
    return UNIFIED_CATEGORIES[secNum - 1];
  }

  return undefined;
}

/** Get all outfits belonging to a category or section */
export function getOutfitsByCategory(categoryId: string): Outfit[] {
  if (!categoryId || categoryId.toLowerCase() === 'all') {
    return UNIFIED_OUTFITS;
  }
  const category = getCategoryById(categoryId);
  if (!category) return [];

  return UNIFIED_OUTFITS.filter(
    (o) => o.categoryId.toLowerCase() === category.id.toLowerCase()
  );
}

/** Find a specific product/outfit by ID (supports "1.1", "outfit-001", etc.) */
export function getOutfitById(id: string): Outfit | undefined {
  if (!id) return undefined;
  return outfitLookup.get(id.toLowerCase().trim());
}

/** Get all individual shopping items for a product (e.g. for "1.1") */
export function getItemsByOutfit(outfitId: string): OutfitItem[] {
  if (!outfitId) return [];
  return outfitItemsLookup.get(outfitId.toLowerCase().trim()) || [];
}

/** Get Trending Products for Homepage Carousels */
export function getTrendingOutfits(): Outfit[] {
  return UNIFIED_OUTFITS.filter((o) => o.isTrending);
}

/** Get New Arrival Products for Homepage Carousels */
export function getNewArrivalOutfits(): Outfit[] {
  return UNIFIED_OUTFITS.filter((o) => o.isNewArrival);
}

/** Get Popular Products for Homepage Carousels */
export function getPopularOutfits(): Outfit[] {
  return UNIFIED_OUTFITS.filter((o) => o.isPopular);
}
