import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { banners, setActiveView, setFilters } = useStore();
  const activeBanners = banners.filter((b) => b.active);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto cycle active hero banner every 6.5 seconds
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const activeBanner = activeBanners[currentBannerIndex] || activeBanners[0];

  const handleBannerAction = () => {
    if (activeBanner?.linkCategory) {
      setFilters((prev) => ({ ...prev, category: activeBanner.linkCategory!, searchQuery: '' }));
      setActiveView('catalog');
    } else {
      setActiveView('catalog');
    }
  };

  if (!activeBanner) return null;

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto min-h-[380px] sm:min-h-[460px] md:min-h-[540px] flex items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeBanner.image}
            alt={activeBanner.title}
            className="w-full h-full object-cover object-center filter brightness-[0.72] transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
        </div>

        {/* Hero Copy Content */}
        <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase text-stone-300 font-semibold">
            <span className="w-5 sm:w-6 h-px bg-amber-400" />
            <span>{activeBanner.tag}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight text-balance">
            {activeBanner.title}
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
            {activeBanner.subtitle}
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4">
            <button
              onClick={handleBannerAction}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-[11px] sm:text-xs tracking-wider uppercase rounded transition-colors shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>{activeBanner.ctaText || 'Shop Collection'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
                setActiveView('catalog');
              }}
              className="px-3.5 sm:px-5 py-2.5 sm:py-3 border border-white/40 hover:border-white text-white font-medium text-[11px] sm:text-xs tracking-wider uppercase rounded transition-colors backdrop-blur-xs cursor-pointer"
            >
              Explore All
            </button>
          </div>
        </div>

        {/* Banner Carousel Controls */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() =>
                setCurrentBannerIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1))
              }
              className="p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5 px-1.5">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBannerIndex(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentBannerIndex ? 'w-5 sm:w-6 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length)
              }
              className="p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors cursor-pointer"
              aria-label="Next banner"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
