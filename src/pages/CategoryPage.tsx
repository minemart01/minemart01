import React, { useState, useMemo } from 'react';
import { CATEGORIES, getCategoryById } from '../data/categories';
import { getOutfitsByCategory } from '../data/outfits';
import { OutfitGrid } from '../components/categories/OutfitGrid';
import {
  ArrowLeft,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Flame,
  Clock,
  Compass,
} from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  onNavigateHome: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onNavigateHome,
  onSelectCategory,
  onSelectOutfit,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'trending' | 'new-arrivals'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const category = getCategoryById(categoryId) || {
    id: categoryId,
    name: 'Fashion Collection',
    description: 'Explore curated outfit inspirations and head-to-toe style guides.',
    image: '/src/assets/images/hero_fashion_editorial_1791391868816.jpg',
  };

  const rawOutfits = useMemo(() => {
    return getOutfitsByCategory(categoryId);
  }, [categoryId]);

  const filteredOutfits = useMemo(() => {
    let result = [...rawOutfits];

    if (filterType === 'trending') {
      result = result.filter((o) => o.isTrending);
    } else if (filterType === 'new-arrivals') {
      result = result.filter((o) => o.isNewArrival);
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          (o.description && o.description.toLowerCase().includes(q)) ||
          (o.tags && o.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [rawOutfits, filterType, searchFilter]);

  return (
    <div className="pb-20 space-y-8 sm:space-y-10">
      {/* Category Hero Editorial Header */}
      <div className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center filter brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <button
              onClick={onNavigateHome}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-stone-600" />
            <span className="text-amber-400 font-semibold">{category.name}</span>
          </nav>

          <div className="max-w-2xl space-y-2">
            {category.kicker && (
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
                {category.kicker}
              </span>
            )}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed font-light">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
            <span className="flex items-center gap-1 bg-stone-800/80 px-2.5 py-1 rounded-full border border-stone-700">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>{rawOutfits.length} Curated Looks</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Tap any outfit to view individual pieces & affiliate links</span>
          </div>
        </div>
      </div>

      {/* Category Horizontal Quick Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Collections:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const isCurrent = cat.id.toLowerCase() === category.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setFilterType('all');
                  setSearchFilter('');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  isCurrent
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar for Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200/90 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Outfits ({rawOutfits.length})
            </button>
            <button
              onClick={() => setFilterType('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                filterType === 'trending'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Flame className="w-3 h-3 text-amber-500" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setFilterType('new-arrivals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                filterType === 'new-arrivals'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Clock className="w-3 h-3 text-amber-500" />
              <span>New Looks</span>
            </button>
          </div>

          {/* Search within this category */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by keyword (e.g. blazer, silk)..."
              className="w-full px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Outfits Grid (Supports 100+ entries effortlessly) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing <strong className="text-stone-900">{filteredOutfits.length}</strong> outfit inspiration {filteredOutfits.length === 1 ? 'look' : 'looks'}
          </span>
          <span className="hidden sm:inline">Tap any card to view items & shop</span>
        </div>

        <OutfitGrid
          outfits={filteredOutfits}
          onSelectOutfit={onSelectOutfit}
          onExploreOther={onNavigateHome}
        />
      </main>
    </div>
  );
};
