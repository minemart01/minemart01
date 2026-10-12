import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCarousel } from '../common/ProductCarousel';
import { Award } from 'lucide-react';

export const BestSellersSection: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  // Find products explicitly in Best Sellers section or highest reviewCount
  const sectionBestSellers = products.filter(
    (p) => p.section?.toLowerCase().includes('best') || p.section?.toLowerCase().includes('seller')
  );

  const bestSellers = sectionBestSellers.length > 0
    ? sectionBestSellers
    : [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

  return (
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
  );
};
