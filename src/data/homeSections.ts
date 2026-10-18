/**
 * ============================================================================
 * MINEMART HOMEPAGE SECTIONS & BANNERS (src/data/homeSections.ts)
 * ============================================================================
 * 
 * Manage your homepage carousel banners, featured collections, and section
 * headings here without altering the UI layout.
 * ============================================================================
 */

import { HomeBanner, HomeSection } from '../types';

export const HOME_BANNERS: HomeBanner[] = [
  {
    id: 'banner-1',
    title: 'The Autumn Silhouette',
    subtitle: 'Curated outerwear, modern tailoring, and effortless quiet luxury looks for the new season.',
    tag: 'Capsule Curation',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    ctaText: 'Explore Looks',
    categoryId: 'aesthetic-women',
    active: true,
  },
  {
    id: 'banner-2',
    title: 'Contemporary Men’s Essentials',
    subtitle: 'Unstructured blazers, premium knit polos, and tailored trousers designed for effortless styling.',
    tag: 'Menswear Edit',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    ctaText: "Shop Men's Outfits",
    categoryId: 'mens-fashion',
    active: true,
  },
  {
    id: 'banner-3',
    title: 'Urban Streetwear & Utility',
    subtitle: 'Heavyweight graphic hoodies, parachute cargos, and vintage-wash layering pieces.',
    tag: 'Streetwear Drop',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Discover Streetwear',
    categoryId: 'streetwear',
    active: true,
  },
  {
    id: 'banner-4',
    title: 'Handcrafted Accessories & Accents',
    subtitle: 'Sculpted leather crossbodies, minimal jewelry, and artisanal footwear for the finished look.',
    tag: 'Statement Accents',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    ctaText: 'View Accessories',
    categoryId: 'bags-accessories',
    active: true,
  },
];

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: 'sec-trending',
    title: 'Trending Looks of the Week',
    kicker: 'Style Inspiration',
    description: 'Most loved fashion ensembles curated by stylists and trendsetters.',
    type: 'carousel',
    filterType: 'trending',
    badge: 'Popular Now',
  },
  {
    id: 'sec-categories',
    title: 'Explore Fashion Collections',
    kicker: 'Style by Department',
    description: 'Discover curated outfit inspiration across our core fashion aesthetics.',
    type: 'categories',
  },
  {
    id: 'sec-new-arrivals',
    title: 'Fresh Releases & New Arrivals',
    kicker: 'Just In',
    description: 'Fresh seasonal outfit combinations and newly added shopping guides.',
    type: 'carousel',
    filterType: 'new-arrivals',
    badge: 'New',
  },
  {
    id: 'sec-popular',
    title: 'Popular Outfit Combinations',
    kicker: 'Community Favorites',
    description: 'Top-voted complete look ideas with full head-to-toe breakdown.',
    type: 'carousel',
    filterType: 'popular',
  },
  {
    id: 'sec-streetwear',
    title: 'Streetwear & Urban Culture',
    kicker: 'Modern Edge',
    description: 'Oversized silhouettes, technical utility, and casual sneakers.',
    type: 'grid',
    categoryId: 'streetwear',
    badge: 'Trending',
  },
];
