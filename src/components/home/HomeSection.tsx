import React, { useRef, useState, useEffect } from 'react';
import { Outfit, Category, HomeSection as HomeSectionType } from '../../types';
import { OutfitCard } from '../categories/OutfitCard';
import { CategoryCard } from '../categories/CategoryCard';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HomeSectionProps {
  section: HomeSectionType;
  outfits?: Outfit[];
  categories?: Category[];
  onSelectCategory: (categoryId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  section,
  outfits = [],
  categories = [],
  onSelectCategory,
  onSelectOutfit,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [outfits, categories]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleViewAll = () => {
    if (section.categoryId) {
      onSelectCategory(section.categoryId);
    } else if (categories.length > 0) {
      onSelectCategory(categories[0].id);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-stone-200">
        <div>
          {section.kicker && (
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Sparkles className="w-3 h-3" />
              <span>{section.kicker}</span>
              {section.badge && (
                <span className="ml-1 text-[9px] bg-stone-900 text-white px-1.5 py-0.5 rounded font-bold">
                  {section.badge}
                </span>
              )}
            </div>
          )}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mt-0.5">
            {section.title}
          </h2>
          {section.description && (
            <p className="text-xs text-stone-500 mt-0.5 hidden sm:block">
              {section.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {section.categoryId && (
            <button
              onClick={handleViewAll}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Desktop Carousel Arrow Buttons */}
          {section.type === 'carousel' && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-1.5 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none ${
                  canScrollLeft
                    ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 cursor-pointer shadow-2xs'
                    : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-1.5 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none ${
                  canScrollRight
                    ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 cursor-pointer shadow-2xs'
                    : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Rendering based on Section Type */}
      {section.type === 'categories' ? (
        /* Categories Horizontal Snap on Mobile / Grid on Desktop */
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory py-1">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={() => onSelectCategory(cat.id)}
                variant="grid"
              />
            ))}
          </div>
        </div>
      ) : section.type === 'carousel' ? (
        /* Outfits Horizontal Scroll Snap */
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 scroll-smooth"
          >
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onClick={() => onSelectOutfit(outfit.id)}
                variant="carousel"
              />
            ))}
          </div>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {outfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onClick={() => onSelectOutfit(outfit.id)}
              variant="grid"
            />
          ))}
        </div>
      )}
    </section>
  );
};
