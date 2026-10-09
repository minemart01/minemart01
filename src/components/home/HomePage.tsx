import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { CategorySlug } from '../../types';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    banners,
    products,
    setActiveView,
    setFilters,
  } = useStore();

  const activeBanners = banners.filter((b) => b.active);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto cycle active hero banner every 6 seconds
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

  const handleCategorySelect = (category: CategorySlug) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const directProducts = products.filter((p) => p.isDirectSale).slice(0, 4);
  const partnerProducts = products.filter((p) => !p.isDirectSale).slice(0, 3);

  const categories = [
    {
      slug: 'men' as CategorySlug,
      name: 'Men',
      kicker: 'Tailoring & Casuals',
      image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    },
    {
      slug: 'women' as CategorySlug,
      name: 'Women',
      kicker: 'Silk & Evening Gowns',
      image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    },
    {
      slug: 'footwear' as CategorySlug,
      name: 'Footwear',
      kicker: 'Leather & Sneakers',
      image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    },
    {
      slug: 'accessories' as CategorySlug,
      name: 'Accessories',
      kicker: 'Bags & Jewelry',
      image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    },
    {
      slug: 'kids' as CategorySlug,
      name: 'Kids',
      kicker: 'Organic Essentials',
      image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Campaign Banner (Admin Manageable) */}
      {activeBanner && (
        <section className="relative bg-stone-900 text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto min-h-[500px] md:min-h-[580px] flex items-center px-4 sm:px-6 lg:px-8 py-16">
            {/* Background Image with Scrim */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeBanner.image}
                alt={activeBanner.title}
                className="w-full h-full object-cover object-center filter brightness-[0.72] transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/50 to-transparent" />
            </div>

            {/* Hero Copy Content */}
            <div className="relative z-10 max-w-xl space-y-4">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-300 font-semibold">
                <span className="w-6 h-px bg-amber-400" />
                <span>{activeBanner.tag}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] text-balance">
                {activeBanner.title}
              </h1>

              <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light">
                {activeBanner.subtitle}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleBannerAction}
                  className="px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs tracking-wider uppercase rounded transition-colors shadow-sm flex items-center gap-2 group"
                >
                  <span>{activeBanner.ctaText || 'Shop Collection'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
                    setActiveView('catalog');
                  }}
                  className="px-5 py-3 border border-white/40 hover:border-white text-white font-medium text-xs tracking-wider uppercase rounded transition-colors backdrop-blur-xs"
                >
                  View Full Catalog
                </button>
              </div>
            </div>

            {/* Banner Carousel Controls */}
            {activeBanners.length > 1 && (
              <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentBannerIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1))
                  }
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {activeBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBannerIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentBannerIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length)
                  }
                  className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. Category Department Discovery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Department Curations
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'all' }));
              setActiveView('catalog');
            }}
            className="mt-3 sm:mt-0 text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              className="group cursor-pointer flex flex-col bg-stone-100 rounded-lg overflow-hidden border border-stone-200/60 hover:border-stone-400 transition-all duration-200"
            >
              <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-display text-lg font-semibold leading-tight">{cat.name}</h3>
                  <p className="text-[11px] text-stone-300 font-sans">{cat.kicker}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Trending Edit (Featured Products Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Season Highlights</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              Trending Edit
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'rating' }));
              setActiveView('catalog');
            }}
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Dual Model Spotlight: MineMart Direct vs Authorized Retail Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-6 sm:p-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              The MineMart Model
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
              Direct Atelier Productions & Authorized Luxury Retail Partners
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              MineMart offers a seamless single-destination discovery experience. When shopping our direct atelier pieces, check out smoothly with bag and express delivery. When discovering our verified partner links, enjoy guaranteed authenticity with direct routing to authorized retailer checkouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Layers className="w-4 h-4 text-stone-900" />
                <span>MineMart Direct Atelier</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Items tailored and stocked in our certified fulfillment centers. Fully supported with size selection, bag checkout, coupons, COD, and tracked couriers.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, productType: 'direct' }));
                    setActiveView('catalog');
                  }}
                  className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1"
                >
                  <span>Browse Direct Products ({directProducts.length}+)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Authorized Partner Network</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Legitimate feeds from Nordstrom, MatchesFashion, Farfetch, and boutique labels. Transparent outbound affiliate links with zero scraping and verified merchant trust.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, productType: 'affiliate' }));
                    setActiveView('catalog');
                  }}
                  className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1"
                >
                  <span>Browse Verified Partner Feeds ({partnerProducts.length}+)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Just Added to Catalog
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'newest' }));
              setActiveView('catalog');
            }}
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Popular Brands Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Curation Portfolio
          </span>
          <h2 className="font-display text-2xl font-semibold text-stone-900 mt-1">
            Featured Labels & Boutiques
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'MineMart Atelier', type: 'In-House House Label', count: 'Direct Direct' },
            { name: 'Nordstrom Curations', type: 'Authorized Retailer', count: 'Partner Feed' },
            { name: 'MatchesFashion', type: 'Luxury Fashion Partner', count: 'Affiliate Catalog' },
            { name: 'Farfetch Global', type: 'Authorized Outlet', count: 'Global Sourcing' },
          ].map((brand, i) => (
            <div
              key={i}
              onClick={() => {
                setFilters((prev) => ({ ...prev, brands: [brand.name] }));
                setActiveView('catalog');
              }}
              className="p-5 text-center bg-white border border-stone-200 rounded-lg hover:border-stone-400 cursor-pointer transition-colors"
            >
              <h3 className="font-display text-base font-semibold text-stone-900">{brand.name}</h3>
              <p className="text-xs text-stone-500 mt-1">{brand.type}</p>
              <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                {brand.count}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
