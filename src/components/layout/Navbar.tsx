import React, { useState } from 'react';
import { CATEGORIES } from '../../data/categories';
import { OUTFITS } from '../../data/outfits';
import {
  Search,
  Sparkles,
  Menu,
  X,
  Compass,
  ArrowRight,
  Tag,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onNavigateHome: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
  currentView?: string;
  selectedCategoryId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onSelectCategory,
  onSelectOutfit,
  currentView,
  selectedCategoryId,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Search filter across categories and outfits
  const query = searchQuery.trim().toLowerCase();
  const matchedCategories = query
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      )
    : [];

  const matchedOutfits = query
    ? OUTFITS.filter(
        (o) =>
          o.title.toLowerCase().includes(query) ||
          (o.description && o.description.toLowerCase().includes(query)) ||
          (o.tags && o.tags.some((t) => t.toLowerCase().includes(query)))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-white border-b border-stone-800 shadow-sm">
      {/* Top Affiliate Trust Bar */}
      <div className="bg-stone-950 text-stone-400 text-[11px] py-1 px-4 text-center border-b border-stone-800/80 font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
        <span>MineMart Curated Fashion Discovery & Verified Affiliate Links</span>
        <span className="hidden sm:inline text-stone-600">|</span>
        <span className="hidden sm:inline text-stone-400">Head-to-Toe Outfit Inspiration & Direct Retailer Shopping</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="group flex flex-col text-left focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                  MineMart
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  Affiliate
                </span>
              </div>
              <span className="text-[9px] tracking-widest uppercase text-stone-400 font-medium">
                Fashion & Outfit Discovery
              </span>
            </button>
          </div>

          {/* Desktop Categories Quick-Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
                currentView === 'home'
                  ? 'text-white bg-stone-800'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              Home
            </button>
            {CATEGORIES.slice(0, 5).map((cat) => {
              const isActive = currentView === 'category' && selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase font-medium rounded transition-colors ${
                    isActive
                      ? 'text-white bg-stone-800 font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
            <button
              onClick={() => setSearchOpen(true)}
              className="px-3 py-1.5 text-xs tracking-wider uppercase font-medium text-amber-400 hover:text-amber-300 hover:bg-stone-800/60 rounded flex items-center gap-1 transition-colors"
            >
              <span>All ({CATEGORIES.length})</span>
            </button>
          </nav>

          {/* Right Action Controls: Search & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 bg-stone-800/90 hover:bg-stone-700/80 text-stone-300 hover:text-white px-3 sm:px-4 py-2 rounded-lg text-xs tracking-wide transition-all border border-stone-700/70 cursor-pointer shadow-2xs"
              aria-label="Search outfits"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Search outfits, styles, items...</span>
              <span className="sm:hidden text-xs">Search</span>
              <kbd className="hidden md:inline text-[10px] bg-stone-900 px-1.5 py-0.5 rounded text-stone-400 border border-stone-700">
                /
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900/98 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs font-semibold tracking-wider uppercase text-stone-400">
            <span>Fashion Categories</span>
            <span className="text-[10px] text-amber-400">{CATEGORIES.length} Collections</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-800 text-stone-200 text-xs font-medium hover:bg-stone-700 text-left col-span-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore All (Homepage)</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between border ${
                  selectedCategoryId === cat.id && currentView === 'category'
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 font-semibold'
                    : 'bg-stone-850 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {cat.badge && (
                  <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-amber-400/20 text-amber-300">
                    {cat.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-stone-400">
              Affiliate disclosure: We curate fashion and earn commissions via qualifying partner links.
            </p>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[80vh]">
            {/* Search Header */}
            <div className="p-3 sm:p-4 border-b border-stone-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search outfits, streetwear, aesthetic looks, blazer..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 text-xs text-stone-400 hover:text-white rounded bg-stone-800"
              >
                ESC
              </button>
            </div>

            {/* Results Area */}
            <div className="p-4 overflow-y-auto space-y-5 flex-1">
              {searchQuery.trim() === '' ? (
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                    Popular Collections
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setSearchOpen(false);
                        }}
                        className="p-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-left text-xs transition-colors"
                      >
                        <span className="font-medium text-stone-200 block truncate">{cat.name}</span>
                        <span className="text-[10px] text-amber-400/80">{cat.kicker || 'Explore'}</span>
                      </button>
                    ))}
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block pt-2">
                    Trending Outfits
                  </span>
                  <div className="space-y-2">
                    {OUTFITS.filter((o) => o.isTrending)
                      .slice(0, 4)
                      .map((outfit) => (
                        <div
                          key={outfit.id}
                          onClick={() => {
                            onSelectOutfit(outfit.id);
                            setSearchOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg bg-stone-800/40 hover:bg-stone-800 cursor-pointer transition-colors"
                        >
                          <img
                            src={outfit.image}
                            alt={outfit.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-stone-200 truncate">
                              {outfit.title}
                            </h4>
                            <p className="text-[11px] text-stone-400 truncate">
                              {outfit.description}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {matchedCategories.length > 0 && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                        Categories ({matchedCategories.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {matchedCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              onSelectCategory(cat.id);
                              setSearchOpen(false);
                            }}
                            className="p-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-left text-xs flex items-center justify-between"
                          >
                            <div>
                              <span className="font-semibold text-white block">{cat.name}</span>
                              <span className="text-[10px] text-stone-400 line-clamp-1">
                                {cat.description}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-2" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedOutfits.length > 0 ? (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                        Outfits ({matchedOutfits.length})
                      </span>
                      <div className="space-y-2">
                        {matchedOutfits.map((outfit) => (
                          <div
                            key={outfit.id}
                            onClick={() => {
                              onSelectOutfit(outfit.id);
                              setSearchOpen(false);
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-stone-800/50 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors"
                          >
                            <img
                              src={outfit.image}
                              alt={outfit.title}
                              className="w-14 h-14 rounded-md object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                                {outfit.title}
                              </h4>
                              <p className="text-[11px] text-stone-400 line-clamp-1">
                                {outfit.description}
                              </p>
                              {outfit.tags && outfit.tags.length > 0 && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  {outfit.tags.slice(0, 2).map((t, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[9px] px-1.5 py-0.5 rounded bg-stone-700/70 text-stone-300"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    matchedCategories.length === 0 && (
                      <div className="text-center py-8 text-stone-400">
                        <p className="text-sm">No outfits or categories found matching &quot;{searchQuery}&quot;.</p>
                        <p className="text-xs text-stone-500 mt-1">
                          Try searching for &quot;women&quot;, &quot;streetwear&quot;, &quot;blazer&quot;, or &quot;party&quot;.
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
