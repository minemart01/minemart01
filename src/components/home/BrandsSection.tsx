import React from 'react';
import { useStore } from '../../context/StoreContext';

interface BrandItem {
  name: string;
  type: string;
  count: string;
}

const BRANDS: BrandItem[] = [
  { name: 'MineMart Atelier', type: 'In-House Label', count: 'Direct' },
  { name: 'Nordstrom Curations', type: 'Authorized Retailer', count: 'Partner Feed' },
  { name: 'MatchesFashion', type: 'Luxury Fashion', count: 'Affiliate' },
  { name: 'Farfetch Global', type: 'Authorized Outlet', count: 'Sourced' },
];

export const BrandsSection: React.FC = () => {
  const { setActiveView, setFilters } = useStore();

  return (
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
        {BRANDS.map((brand, i) => (
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
  );
};
