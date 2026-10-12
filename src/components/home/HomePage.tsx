import React from 'react';
import { HeroBanner } from './HeroBanner';
import { CategoriesSection } from './CategoriesSection';
import { TrendingSection } from './TrendingSection';
import { TopDealsSection } from './TopDealsSection';
import { ModelSpotlight } from './ModelSpotlight';
import { BestSellersSection } from './BestSellersSection';
import { NewArrivalsSection } from './NewArrivalsSection';
import { RecommendedSection } from './RecommendedSection';
import { BrandsSection } from './BrandsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-14 md:space-y-16 pb-16 overflow-x-hidden">
      {/* 1. Main Hero Campaign Carousel Banner */}
      <HeroBanner />

      {/* 2. Shop by Category (Mobile Horizontal Quick-Slider & Desktop Grid) */}
      <CategoriesSection />

      {/* 3. Amazon-Style Horizontal Carousel: Trending Products */}
      <TrendingSection />

      {/* 4. Amazon-Style Horizontal Carousel: Top Deals & Offers */}
      <TopDealsSection />

      {/* 5. Dual Model Spotlight: MineMart Direct vs Authorized Retail Partners */}
      <ModelSpotlight />

      {/* 6. Amazon-Style Horizontal Carousel: Best Sellers */}
      <BestSellersSection />

      {/* 7. Amazon-Style Horizontal Carousel: New Arrivals */}
      <NewArrivalsSection />

      {/* 8. Recommended Products: Compact 2-Column Mobile Grid */}
      <RecommendedSection />

      {/* 9. Popular Brands Portfolio */}
      <BrandsSection />
    </div>
  );
};
