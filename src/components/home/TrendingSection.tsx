import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCarousel } from '../common/ProductCarousel';
import { Flame } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  const trendingProducts = products.filter(
    (p) => p.isTrending || p.section?.toLowerCase().includes('trend')
  );

  return (
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
  );
};
