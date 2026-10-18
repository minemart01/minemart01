/**
 * ============================================================================
 * MINEMART CATEGORIES DATA (src/data/categories.ts)
 * ============================================================================
 * 
 * Manage your fashion collections here.
 * 
 * TO ADD A NEW CATEGORY:
 * 1. Copy one of the category objects in the `CATEGORIES` array.
 * 2. Paste it at the end of the list.
 * 3. Change `id`, `name`, `image`, and `description`.
 * 4. Save the file. It will immediately appear on the Homepage and navigation!
 * ============================================================================
 */

import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'aesthetic-women',
    name: 'Aesthetic Women',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    description: 'Minimalist silhouettes, neutral palettes, quiet luxury, and timeless feminine tailoring.',
    kicker: 'Effortless Chic',
    badge: 'Popular',
  },
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    description: 'Contemporary menswear, relaxed linen tailoring, structured overshirts, and sharp essentials.',
    kicker: 'Tailoring & Basics',
    badge: 'Trending',
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    description: 'Boxy silhouettes, oversized cargos, statement sneakers, graphic layers, and urban utility.',
    kicker: 'Urban & Edgy',
    badge: 'Hot',
  },
  {
    id: 'casual-outfits',
    name: 'Casual Outfits',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    description: 'Daily comfort meets clean aesthetics. Versatile denim, relaxed tees, and casual knitwear.',
    kicker: 'Everyday Wear',
  },
  {
    id: 'party-wear',
    name: 'Party Wear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous evening looks, sculpted satin dresses, sharp velvet blazers, and party statement fits.',
    kicker: 'Night Out & Events',
  },
  {
    id: 'ethnic-wear',
    name: 'Ethnic Wear',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Artisanal embroideries, regal silhouettes, handwoven textiles, and modern fusion festive wear.',
    kicker: 'Traditional & Fusion',
  },
  {
    id: 'shoes',
    name: 'Shoes & Footwear',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    description: 'Curated calfskin sneakers, sleek Chelsea boots, chunky loafers, and statement heels.',
    kicker: 'Kicks & Loafers',
  },
  {
    id: 'bags-accessories',
    name: 'Bags & Accessories',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    description: 'Sculpted leather crossbodies, minimalist jewelry, statement eyewear, and luxury tote bags.',
    kicker: 'Finishing Touches',
  },

  /*
   * --------------------------------------------------------------------------
   * 📋 EXAMPLE CATEGORY TEMPLATE (Copy & paste above to add a new category):
   * --------------------------------------------------------------------------
   * {
   *   id: "vintage-retro",
   *   name: "Vintage & Retro",
   *   image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
   *   description: "90s nostalgia, reworked denim, and classic heritage pieces.",
   *   kicker: "Heritage Revival",
   *   badge: "New",
   * },
   */
];

/** Helper to find a category by its ID */
export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.id.toLowerCase() === id.toLowerCase());
}
