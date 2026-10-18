import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { HomeSection } from '../components/home/HomeSection';
import { HOME_BANNERS, HOME_SECTIONS } from '../data/homeSections';
import { CATEGORIES } from '../data/categories';
import {
  OUTFITS,
  getTrendingOutfits,
  getNewArrivalOutfits,
  getPopularOutfits,
  getOutfitsByCategory,
} from '../data/outfits';
import { Sparkles, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSelectCategory: (categoryId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectCategory,
  onSelectOutfit,
}) => {
  return (
    <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-16 overflow-x-hidden">
      {/* 1. Hero Promotional Campaign Banners */}
      <HeroBanner
        banners={HOME_BANNERS}
        onSelectCategory={onSelectCategory}
      />

      {/* 2. Style Mission & Affiliate Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-200/90 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Head-To-Toe Style Curation</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              Discover Complete Looks, Shop Every Item
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              MineMart takes the guesswork out of fashion. Browse editorial outfit ideas, examine every matching piece from tops to shoes, and shop with verified official partner retailers in one click.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onSelectCategory('aesthetic-women')}
              className="px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-xs"
            >
              Browse Women
            </button>
            <button
              onClick={() => onSelectCategory('mens-fashion')}
              className="px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-2xs"
            >
              Browse Men
            </button>
          </div>
        </div>
      </section>

      {/* 3. Reusable Dynamic Homepage Sections from homeSections.ts */}
      {HOME_SECTIONS.map((section) => {
        let sectionOutfits = OUTFITS;

        if (section.filterType === 'trending') {
          sectionOutfits = getTrendingOutfits();
        } else if (section.filterType === 'new-arrivals') {
          sectionOutfits = getNewArrivalOutfits();
        } else if (section.filterType === 'popular') {
          sectionOutfits = getPopularOutfits();
        } else if (section.categoryId) {
          sectionOutfits = getOutfitsByCategory(section.categoryId);
        } else if (section.outfitIds && section.outfitIds.length > 0) {
          const idSet = new Set(section.outfitIds);
          sectionOutfits = OUTFITS.filter((o) => idSet.has(o.id));
        }

        return (
          <HomeSection
            key={section.id}
            section={section}
            outfits={sectionOutfits}
            categories={CATEGORIES}
            onSelectCategory={onSelectCategory}
            onSelectOutfit={onSelectOutfit}
          />
        );
      })}

      {/* 4. Quick Category Directory Footer Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-stone-200 pt-8 text-center space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Explore All Fashion Aesthetics
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs hover:border-stone-400 hover:text-stone-950 transition-colors cursor-pointer"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
