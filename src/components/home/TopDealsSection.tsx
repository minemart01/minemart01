import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCarousel } from '../common/ProductCarousel';
import { Tag } from 'lucide-react';

export const TopDealsSection: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  // Find products marked with Deals section, or sort by highest discount percentage
  const dealProducts = products
    .filter((p) => p.discountPercent > 0 || p.section?.toLowerCase().includes('deal') || p.section?.toLowerCase().includes('offer'))
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 10);

  return (
    <ProductCarousel
      title="Top Deals & Offers"
      kicker="Special Discounts"
      icon={<Tag className="w-3.5 h-3.5 text-amber-700" />}
      products={dealProducts}
      onViewAll={() => {
        setFilters((prev) => ({ ...prev, sortBy: 'price-low' }));
        setActiveView('catalog');
      }}
    />
  );
};
