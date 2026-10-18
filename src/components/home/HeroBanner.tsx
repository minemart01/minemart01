import React, { useState, useEffect } from 'react';
import { HomeBanner } from '../../types';
import { HOME_BANNERS } from '../../data/homeSections';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  banners?: HomeBanner[];
  onSelectCategory?: (categoryId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  banners = HOME_BANNERS,
  onSelectCategory,
}) => {
  const activeBanners = banners.filter((b) => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto cycle every 6 seconds
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;
  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleAction = () => {
    if (onSelectCategory && currentBanner.categoryId) {
      onSelectCategory(currentBanner.categoryId);
    }
  };

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Banner Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover object-center filter brightness-[0.70] transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/65 to-transparent" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase text-stone-300 font-semibold">
            <span className="w-5 sm:w-6 h-px bg-amber-400" />
            <span className="text-amber-400">{currentBanner.tag}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-balance">
            {currentBanner.title}
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
            {currentBanner.subtitle}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleAction}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>{currentBanner.ctaText || 'Explore Outfits'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Full Outfit Inspiration with Direct Links</span>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? activeBanners.length - 1 : prev - 1
                )
              }
              className="p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-1">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % activeBanners.length)
              }
              className="p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
