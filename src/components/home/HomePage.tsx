import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { ProductCarousel } from '../common/ProductCarousel';
import { CategorySlug } from '../../types';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Flame,
  Tag,
  Award,
  Clock,
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

  const handleCategorySelect = (category: CategorySlug) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Curated product slices based on real product properties
  const trendingProducts = products.filter((p) => p.isTrending);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  const topDeals = [...products].sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 8);
  const directProducts = products.filter((p) => p.isDirectSale);
  const partnerProducts = products.filter((p) => !p.isDirectSale);
  const recommendedProducts = products.slice(0, 6);

  const categories = [
    {
      slug: 'men' as CategorySlug,
      name: 'Men',
      kicker: 'Tailoring',
      image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
    },
    {
      slug: 'women' as CategorySlug,
      name: 'Women',
      kicker: 'Silk Gowns',
      image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
    },
    {
      slug: 'footwear' as CategorySlug,
      name: 'Footwear',
      kicker: 'Sneakers',
      image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
    },
    {
      slug: 'accessories' as CategorySlug,
      name: 'Accessories',
      kicker: 'Bags & Accents',
      image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
    },
    {
      slug: 'kids' as CategorySlug,
      name: 'Kids',
      kicker: 'Organic Cotton',
      image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-16 overflow-x-hidden">
      {/* 1. Main Fashion Hero Campaign Banner */}
      {activeBanner && (
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
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-stone-900 hover:bg-stone-100 font-semibold text-[11px] sm:text-xs tracking-wider uppercase rounded transition-colors shadow-sm flex items-center gap-2 group"
                >
                  <span>{activeBanner.ctaText || 'Shop Collection'}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
                    setActiveView('catalog');
                  }}
                  className="px-3.5 sm:px-5 py-2.5 sm:py-3 border border-white/40 hover:border-white text-white font-medium text-[11px] sm:text-xs tracking-wider uppercase rounded transition-colors backdrop-blur-xs"
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
                  className="p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <div className="flex items-center gap-1 sm:gap-1.5 px-1.5">
                  {activeBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBannerIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
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
                  className="p-1.5 sm:p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. Shop by Category (Responsive Mobile Horizontal Quick-Pill Slider & Desktop Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-3 sm:mb-4 pb-2 border-b border-stone-200">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500">
              Department Curations
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mt-0.5">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'all' }));
              setActiveView('catalog');
            }}
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Horizontal Snap Scroll / Desktop Grid */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory py-1">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className="group cursor-pointer flex flex-col bg-stone-100 rounded-lg overflow-hidden border border-stone-200/70 hover:border-stone-400 transition-all duration-200 w-[130px] sm:w-auto shrink-0 snap-start"
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-white">
                    <h3 className="font-display text-sm sm:text-base md:text-lg font-semibold leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-300 font-sans truncate">
                      {cat.kicker}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Amazon-Style Horizontal Carousel: Trending Products */}
      <ProductCarousel
        title="Trending Products"
        kicker="Seasonal Highlights"
        icon={<Flame className="w-3.5 h-3.5 text-amber-700" />}
        products={trendingProducts}
        onViewAll={() => {
          setFilters((prev) => ({ ...prev, sortBy: 'rating' }));
          setActiveView('catalog');
        }}
      />

      {/* 4. Amazon-Style Horizontal Carousel: Top Deals & Offers */}
      <ProductCarousel
        title="Top Deals & Offers"
        kicker="Special Discounts"
        icon={<Tag className="w-3.5 h-3.5 text-amber-700" />}
        products={topDeals}
        onViewAll={() => {
          setFilters((prev) => ({ ...prev, sortBy: 'price-low' }));
          setActiveView('catalog');
        }}
      />

      {/* 5. Dual Model Spotlight: MineMart Direct vs Authorized Retail Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 sm:p-8 md:p-10">
          <div className="max-w-3xl space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500">
              The MineMart Model
            </span>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
              Direct Atelier Productions & Authorized Luxury Retail Partners
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              MineMart offers a seamless single-destination discovery experience. When shopping our direct atelier pieces, check out smoothly with bag and express delivery. When discovering our verified partner links, enjoy guaranteed authenticity with direct routing to authorized retailer checkouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                <Layers className="w-4 h-4 text-stone-900" />
                <span>MineMart Direct Atelier</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Items tailored and stocked in our certified fulfillment centers. Fully supported with size selection, bag checkout, coupons, COD, and tracked couriers.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, productType: 'direct' }));
                    setActiveView('catalog');
                  }}
                  className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1 py-1"
                >
                  <span>Browse Direct Products ({directProducts.length}+)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-2xs space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Authorized Partner Network</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Legitimate feeds from Nordstrom, MatchesFashion, Farfetch, and boutique labels. Transparent outbound affiliate links with zero scraping and verified merchant trust.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, productType: 'affiliate' }));
                    setActiveView('catalog');
                  }}
                  className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 py-1"
                >
                  <span>Browse Verified Partner Feeds ({partnerProducts.length}+)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Amazon-Style Horizontal Carousel: Best Sellers */}
      <ProductCarousel
        title="Best Sellers"
        kicker="Customer Favorites"
        icon={<Award className="w-3.5 h-3.5 text-amber-700" />}
        products={bestSellers}
        onViewAll={() => {
          setFilters((prev) => ({ ...prev, sortBy: 'rating' }));
          setActiveView('catalog');
        }}
      />

      {/* 7. Amazon-Style Horizontal Carousel: New Arrivals */}
      <ProductCarousel
        title="New Arrivals"
        kicker="Fresh Releases"
        icon={<Clock className="w-3.5 h-3.5 text-amber-700" />}
        products={newArrivals}
        onViewAll={() => {
          setFilters((prev) => ({ ...prev, sortBy: 'newest' }));
          setActiveView('catalog');
        }}
      />

      {/* 8. Recommended Products: Compact 2-Column Mobile Grid / 3-4 Column Desktop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-3 sm:mb-4 pb-2 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Selection</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mt-0.5">
              Recommended for You
            </h2>
          </div>
          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, category: 'all' }));
              setActiveView('catalog');
            }}
            className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1"
          >
            <span>View All Curations</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Compact 2-column mobile grid with 8-12px gaps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Popular Brands Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500">
            Curation Portfolio
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-stone-900 mt-0.5">
            Featured Labels & Boutiques
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { name: 'MineMart Atelier', type: 'In-House Label', count: 'Direct' },
            { name: 'Nordstrom Curations', type: 'Authorized Retailer', count: 'Partner Feed' },
            { name: 'MatchesFashion', type: 'Luxury Fashion', count: 'Affiliate' },
            { name: 'Farfetch Global', type: 'Authorized Outlet', count: 'Sourced' },
          ].map((brand, i) => (
            <div
              key={i}
              onClick={() => {
                setFilters((prev) => ({ ...prev, brands: [brand.name] }));
                setActiveView('catalog');
              }}
              className="p-3.5 sm:p-5 text-center bg-white border border-stone-200 rounded-lg hover:border-stone-400 cursor-pointer transition-colors"
            >
              <h3 className="font-display text-sm sm:text-base font-semibold text-stone-900 truncate">
                {brand.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 truncate">{brand.type}</p>
              <span className="inline-block mt-1 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                {brand.count}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
