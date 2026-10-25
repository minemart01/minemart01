import React, { useState, useEffect } from 'react';
import { ALL_SECTIONS, HERO_BANNERS, HeroBanner } from '../data/allSections';
import { SectionSlider } from '../components/SectionSlider';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Layers,
  Heart,
} from 'lucide-react';

interface HomeProps {
  onSelectSection: (sectionId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectSection, onSelectOutfit }) => {
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Auto-advance banner every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeBanner = HERO_BANNERS[currentBannerIdx] || HERO_BANNERS[0];

  return (
    <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-20 overflow-x-hidden">
      {/* 1. Fashion Hero Banner Carousel */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto min-h-[360px] sm:min-h-[440px] md:min-h-[500px] flex items-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          {/* Background Image with Dark Vignette */}
          <div className="absolute inset-0 z-0">
            <img
              src={activeBanner.image}
              alt={activeBanner.title}
              className="w-full h-full object-cover object-center filter brightness-[0.65] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/65 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest uppercase text-stone-300 font-semibold">
              <span className="w-5 sm:w-6 h-px bg-amber-400" />
              <span className="text-amber-400">{activeBanner.tag}</span>
              <span className="text-stone-400">•</span>
              <span className="italic font-display text-amber-200">Wear Your Identity</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {activeBanner.title}
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-light line-clamp-2 sm:line-clamp-none">
              {activeBanner.subtitle}
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectSection(activeBanner.sectionId)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>{activeBanner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pl-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Complete Outfits with Direct Buy Links</span>
              </div>
            </div>
          </div>

          {/* Banner Slider Controls */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentBannerIdx((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1))
              }
              className="p-1.5 sm:p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {HERO_BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBannerIdx(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentBannerIdx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentBannerIdx((prev) => (prev + 1) % HERO_BANNERS.length)}
              className="p-1.5 sm:p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white backdrop-blur-xs border border-white/20 transition-colors cursor-pointer"
              aria-label="Next banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Section Switcher Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Sections:</span>
          </span>
          {ALL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-800 text-xs font-medium hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all whitespace-nowrap cursor-pointer shadow-2xs"
            >
              {sec.title}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Style Curation & Brand Identity Trust Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-200/90 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MineMart Fashion — &ldquo;Wear Your Identity.&rdquo;</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              Discover Complete Outfit Ideas &amp; Shop Every Piece
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore 60 curated head-to-toe lookbooks across 6 specialized fashion sections. Tap any outfit to view all 5 matching pieces and click &quot;Buy Now&quot; to purchase directly from verified retail partners like Myntra, Ajio, Amazon, and Flipkart.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onSelectSection('section1')}
              className="px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
            >
              Women&apos;s
            </button>
            <button
              onClick={() => onSelectSection('section2')}
              className="px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
            >
              Men&apos;s
            </button>
            <button
              onClick={() => onSelectSection('section3')}
              className="px-4 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer"
            >
              Streetwear
            </button>
          </div>
        </div>
      </section>

      {/* 4. Exactly 6 Main Fashion Sections with Sliders */}
      <div className="space-y-10 sm:space-y-14 md:space-y-16">
        {ALL_SECTIONS.map((section, idx) => (
          <SectionSlider
            key={section.id}
            section={section}
            onSelectOutfit={onSelectOutfit}
            sectionNumber={idx + 1}
          />
        ))}
      </div>
    </div>
  );
};
