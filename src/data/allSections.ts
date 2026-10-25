/**
 * ============================================================================
 * MINEMART FASHION — ALL 6 SECTIONS MASTER INDEX
 * "Wear Your Identity"
 * ============================================================================
 * 
 * Aggregates section1, section2, section3, section4, section5, section6.
 * ============================================================================
 */

import { SectionData, Outfit, ProductItem } from './types';
import { section1Data } from './section1';
import { section2Data } from './section2';
import { section3Data } from './section3';
import { section4Data } from './section4';
import { section5Data } from './section5';
import { section6Data } from './section6';

export const ALL_SECTIONS: SectionData[] = [
  section1Data,
  section2Data,
  section3Data,
  section4Data,
  section5Data,
  section6Data,
];

/** All 60 outfits flattened */
export const ALL_OUTFITS: Outfit[] = ALL_SECTIONS.flatMap((sec) => sec.outfits);

/** Get outfit by ID */
export function getOutfitById(id: string): Outfit | undefined {
  const cleanId = id.trim().toLowerCase();
  return ALL_OUTFITS.find(
    (o) =>
      o.id.toLowerCase() === cleanId ||
      o.name.toLowerCase() === cleanId
  );
}

/** Get section by ID */
export function getSectionById(id: string): SectionData | undefined {
  const cleanId = id.trim().toLowerCase();
  return ALL_SECTIONS.find(
    (s) => s.id.toLowerCase() === cleanId || s.title.toLowerCase().includes(cleanId)
  );
}

/** Hero promotional banners inspired by Amazon & Myntra */
export interface HeroBanner {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  tag: string;
  image: string;
  sectionId: string;
  ctaText: string;
}

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'b1',
    title: 'The Autumn Silhouette',
    tagline: 'Wear Your Identity',
    subtitle: 'Curated outerwear, modern tailoring, and effortless quiet luxury looks for the new season.',
    tag: 'Capsule Curation',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
    sectionId: 'section1',
    ctaText: 'Explore Women',
  },
  {
    id: 'b2',
    title: 'Contemporary Men’s Essentials',
    tagline: 'Wear Your Identity',
    subtitle: 'Unstructured blazers, premium knit polos, and tailored trousers designed for effortless styling.',
    tag: 'Menswear Edit',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80',
    sectionId: 'section2',
    ctaText: 'Shop Menswear',
  },
  {
    id: 'b3',
    title: 'Streetwear & Urban Culture',
    tagline: 'Wear Your Identity',
    subtitle: 'Heavyweight graphic hoodies, parachute cargos, and vintage-wash layering pieces.',
    tag: 'Urban Drop',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=80',
    sectionId: 'section3',
    ctaText: 'Discover Streetwear',
  },
  {
    id: 'b4',
    title: 'Festive & Royal Ethnic Wear',
    tagline: 'Wear Your Identity',
    subtitle: 'Handcrafted Chanderi silks, royal bandhgalas, banarasi weaves, and temple jewelry.',
    tag: 'Royal Celebration',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80',
    sectionId: 'section6',
    ctaText: 'Shop Ethnic Outfits',
  },
];
