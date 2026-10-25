import React, { useRef, useState, useEffect } from 'react';
import { SectionData } from '../data/types';
import { OutfitCard } from './OutfitCard';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface SectionSliderProps {
  section: SectionData;
  onSelectOutfit: (outfitId: string) => void;
  sectionNumber?: number;
}

export const SectionSlider: React.FC<SectionSliderProps> = ({
  section,
  onSelectOutfit,
  sectionNumber,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [section.outfits]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700">
            <Sparkles className="w-3 h-3 text-amber-600" />
            {section.badge && (
              <span className="bg-stone-900 text-white px-1.5 py-0.5 rounded font-bold text-[9px]">
                {section.badge}
              </span>
            )}
            <span className="text-stone-500 font-medium hidden sm:inline">
              {section.outfits.length} Curated Looks
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mt-1">
            {section.title}
          </h2>

          {section.subtitle && (
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5 max-w-2xl line-clamp-1 sm:line-clamp-none">
              {section.subtitle}
            </p>
          )}
        </div>

        {/* Desktop Slider Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none cursor-pointer ${
              canScrollLeft
                ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 shadow-2xs'
                : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-40'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none cursor-pointer ${
              canScrollRight
                ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 shadow-2xs'
                : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-40'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Product Slider with Smooth Snap */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 scroll-smooth"
        >
          {section.outfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onClick={() => onSelectOutfit(outfit.id)}
              variant="slider"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
