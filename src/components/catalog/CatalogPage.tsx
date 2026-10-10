import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { CategorySlug } from '../../types';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Star,
  Check,
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { products, filters, setFilters, resetFilters } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract all available brands, sizes from the products dataset
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  // Filter and sort the products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesSubcat = p.subCategory.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesSubcat && !matchesDesc) {
          return false;
        }
      }

      // Product Type filter (Direct vs Affiliate)
      if (filters.productType === 'direct' && !p.isDirectSale) {
        return false;
      }
      if (filters.productType === 'affiliate' && p.isDirectSale) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !p.sizes.some((s) => filters.sizes.includes(s))) {
        return false;
      }

      // Rating filter
      if (filters.minRating && p.rating < filters.minRating) {
        return false;
      }

      // Price filter
      if (filters.minPrice !== undefined && p.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && p.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // default featured order
    });
  }, [products, filters]);

  const handleBrandToggle = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handlePriceRange = (min?: number, max?: number) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.brands.length > 0 ||
    filters.sizes.length > 0 ||
    filters.minRating !== undefined ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.productType !== 'all' ||
    Boolean(filters.searchQuery);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumb & Heading */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span>Home</span>
          <span aria-hidden="true">/</span>
          <span>Catalog</span>
          {filters.category !== 'all' && (
            <>
              <span aria-hidden="true">/</span>
              <span className="capitalize text-stone-900 font-medium">{filters.category}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 capitalize">
              {filters.searchQuery
                ? `Results for "${filters.searchQuery}"`
                : filters.category === 'all'
                ? 'All Fashion Curations'
                : `${filters.category} Collection`}
            </h1>
            <p className="text-xs text-stone-500 mt-1 tabular-nums">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 rounded border border-stone-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="hidden sm:inline">Sort by:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="bg-white border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:outline-none focus:border-stone-900"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Releases</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
            <span className="text-xs text-stone-400">Active filters:</span>

            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span className="capitalize">{filters.category}</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.productType !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span>{filters.productType === 'direct' ? 'Direct MineMart' : 'Authorized Partner'}</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, productType: 'all' }))}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span>Search: {filters.searchQuery}</span>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.brands.map((b) => (
              <span key={b} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span>{b}</span>
                <button onClick={() => handleBrandToggle(b)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.sizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span>Size: {s}</span>
                <button onClick={() => handleSizeToggle(s)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                <span>
                  Price: ${filters.minPrice || 0} - ${filters.maxPrice || 'Any'}
                </span>
                <button onClick={() => handlePriceRange(undefined, undefined)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:underline flex items-center gap-1 ml-2 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Catalog Area: Sidebar + Grid */}
      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0 space-y-6">
          {/* Category Filter */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Department</h3>
            <div className="space-y-1">
              {(['all', 'men', 'women', 'footwear', 'accessories', 'kids'] as CategorySlug[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded capitalize transition-colors flex items-center justify-between ${
                    filters.category === cat
                      ? 'bg-stone-900 text-white font-medium'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat === 'all' ? 'All Collections' : cat}</span>
                  {filters.category === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Product Origin Type (Direct vs Affiliate) */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Fulfillment Model</h3>
            <div className="space-y-1 text-xs">
              {[
                { label: 'All Items', value: 'all' },
                { label: 'Direct MineMart Atelier', value: 'direct' },
                { label: 'Authorized Partner Links', value: 'affiliate' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer py-1 text-stone-700 hover:text-stone-900">
                  <input
                    type="radio"
                    name="productTypeDesktop"
                    checked={filters.productType === opt.value}
                    onChange={() => setFilters((prev) => ({ ...prev, productType: opt.value as any }))}
                    className="accent-stone-900 text-stone-900"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Price Range</h3>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'All Prices', min: undefined, max: undefined },
                { label: 'Under $50', min: 0, max: 50 },
                { label: '$50 to $150', min: 50, max: 150 },
                { label: '$150 to $250', min: 150, max: 250 },
                { label: '$250 and Above', min: 250, max: 1000 },
              ].map((range, idx) => {
                const isSelected = filters.minPrice === range.min && filters.maxPrice === range.max;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePriceRange(range.min, range.max)}
                    className={`w-full text-left py-1 text-stone-700 hover:text-stone-950 flex items-center justify-between ${
                      isSelected ? 'font-semibold text-stone-950' : ''
                    }`}
                  >
                    <span>{range.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 bg-stone-900 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Brand / Retailer</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 hover:text-stone-950">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded accent-stone-900"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="space-y-2 border-b border-stone-200 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Available Sizes</h3>
            <div className="flex flex-wrap gap-1.5">
              {availableSizes.map((size) => {
                const isSelected = filters.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 font-medium'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pb-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900">Rating</h3>
            <div className="space-y-1 text-xs">
              {[4, 4.5].map((stars) => (
                <button
                  key={stars}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      minRating: prev.minRating === stars ? undefined : stars,
                    }))
                  }
                  className={`w-full text-left py-1 flex items-center gap-1.5 text-stone-700 hover:text-stone-900 ${
                    filters.minRating === stars ? 'font-semibold text-stone-950' : ''
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{stars}★ and above</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-stone-200 rounded-lg p-8">
              <Search className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <h3 className="font-display text-lg font-semibold text-stone-900">No products match your criteria</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try widening your price range, clearing brand selections, or searching for broader terms.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3.5 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full overflow-y-auto p-5 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-display text-lg font-semibold text-stone-900">Filter Curations</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-stone-900">Department</h4>
              <div className="grid grid-cols-2 gap-1.5">
                {(['all', 'men', 'women', 'footwear', 'accessories', 'kids'] as CategorySlug[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                    className={`text-xs py-1.5 px-2 rounded capitalize text-left ${
                      filters.category === cat ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Type */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-stone-900">Fulfillment Model</h4>
              <div className="space-y-1 text-xs">
                {[
                  { label: 'All Items', value: 'all' },
                  { label: 'Direct MineMart Atelier', value: 'direct' },
                  { label: 'Authorized Partner Links', value: 'affiliate' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="productTypeMobile"
                      checked={filters.productType === opt.value}
                      onChange={() => setFilters((prev) => ({ ...prev, productType: opt.value as any }))}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-stone-900">Price</h4>
              <div className="space-y-1 text-xs">
                {[
                  { label: 'All Prices', min: undefined, max: undefined },
                  { label: 'Under $50', min: 0, max: 50 },
                  { label: '$50 to $150', min: 50, max: 150 },
                  { label: '$150 to $250', min: 150, max: 250 },
                ].map((range, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePriceRange(range.min, range.max)}
                    className="w-full text-left py-1 text-stone-700 block"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset / Apply */}
            <div className="pt-4 border-t border-stone-200 flex gap-2">
              <button
                onClick={resetFilters}
                className="w-1/2 py-2 text-xs font-medium border border-stone-300 rounded text-stone-700"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2 text-xs font-semibold bg-stone-900 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
