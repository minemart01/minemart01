import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCarousel } from '../common/ProductCarousel';
import { Clock } from 'lucide-react';

export const NewArrivalsSection: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  const newArrivals = products.filter(
    (p) => p.isNewArrival || p.section?.toLowerCase().includes('new') || p.section?.toLowerCase().includes('arrival')
  );

  return (
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
  );
};
