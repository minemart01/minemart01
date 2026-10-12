import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CategorySlug } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  slug: CategorySlug;
  name: string;
  kicker: string;
  image: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    slug: 'men',
    name: 'Men',
    kicker: 'Tailoring',
    image: '/src/assets/images/product_mens_linen_jacket_1791391886873.jpg',
  },
  {
    slug: 'women',
    name: 'Women',
    kicker: 'Silk Gowns',
    image: '/src/assets/images/product_womens_silk_dress_1791391911188.jpg',
  },
  {
    slug: 'footwear',
    name: 'Footwear',
    kicker: 'Sneakers',
    image: '/src/assets/images/product_footwear_leather_sneakers_1791391938169.jpg',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    kicker: 'Bags & Accents',
    image: '/src/assets/images/banner_summer_capsule_1791391953514.jpg',
  },
  {
    slug: 'kids',
    name: 'Kids',
    kicker: 'Organic Cotton',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
  },
];

export const CategoriesSection: React.FC = () => {
  const { setActiveView, setFilters } = useStore();

  const handleCategorySelect = (category: CategorySlug) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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
          className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1 cursor-pointer"
        >
          <span>All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Mobile Horizontal Snap Scroll / Desktop Grid */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory py-1">
          {CATEGORIES.map((cat) => (
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
  );
};
