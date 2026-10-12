import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const RecommendedSection: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  const sectionRecommended = products.filter(
    (p) => p.section?.toLowerCase().includes('recommend')
  );

  const recommendedProducts = sectionRecommended.length > 0
    ? sectionRecommended
    : products.slice(0, 8);

  return (
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
          className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1 cursor-pointer"
        >
          <span>View All Curations</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Compact 2-column mobile grid with 8-12px gaps / 3-4 column desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
