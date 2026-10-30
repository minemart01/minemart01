import React, { useState } from 'react';
import { ALL_SECTIONS } from '../data/allSections';
import { useWishlist } from '../context/WishlistContext';
import { isProductVisible, getVisibleProductCount } from '../utils/productVisibility';
import {
  Sparkles,
  Search,
  Menu,
  X,
  Compass,
  ArrowRight,
  RotateCcw,
  Heart,
} from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateWishlist?: () => void;
  onSelectSection: (sectionId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
  onReplayIntro?: () => void;
  currentSectionId?: string;
  isDetailsPage?: boolean;
  isWishlistPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateWishlist,
  onSelectSection,
  onSelectOutfit,
  onReplayIntro,
  currentSectionId,
  isDetailsPage,
  isWishlistPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalUniqueCount } = useWishlist();

  // Collect all searchable outfits
  const allOutfits = ALL_SECTIONS.flatMap((s) => s.outfits);

  const query = searchQuery.trim().toLowerCase();
  const matchedOutfits = query
    ? allOutfits.filter(
        (o) =>
          o.name.toLowerCase().includes(query) ||
          (o.description && o.description.toLowerCase().includes(query)) ||
          o.items.some((i) => isProductVisible(i) && i.name.toLowerCase().includes(query))
      )
    : [];

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-900/98 backdrop-blur-md text-white border-b border-stone-800 shadow-md">
      {/* Top Banner with Brand Tagline & Transparency */}
      <div className="bg-stone-950 text-stone-300 text-[11px] py-1 px-4 text-center border-b border-stone-800/80 font-medium tracking-wide flex items-center justify-between sm:justify-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-semibold text-white">MineMart Fashion</span>
          <span className="text-stone-500">•</span>
          <span className="italic text-amber-300 font-display">&ldquo;Wear Your Identity.&rdquo;</span>
        </div>
        <span className="hidden md:inline text-stone-500">|</span>
        <span className="hidden md:inline text-stone-400">
          Curated Complete Lookbooks & Direct Retailer &quot;Buy Now&quot; Links
        </span>

        {onReplayIntro && (
          <button
            onClick={onReplayIntro}
            title="Replay Brand Intro"
            className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-amber-300 transition-colors ml-2 cursor-pointer"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">Intro</span>
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
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
                  Fashion
                </span>
              </div>
              <span className="text-[9px] tracking-widest uppercase text-stone-400 font-medium">
                Wear Your Identity
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links for All 6 Sections */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={onNavigateHome}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${
                !isDetailsPage && !currentSectionId
                  ? 'text-white bg-stone-800'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              Home
            </button>

            {ALL_SECTIONS.map((sec, idx) => {
              const isActive = currentSectionId === sec.id;
              // Clean short labels for header navigation
              const shortLabels = [
                "Women's",
                "Men's",
                'Streetwear',
                'Casual',
                'Party Wear',
                'Ethnic Wear',
              ];
              const label = shortLabels[idx] || sec.title;

              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={`px-2.5 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-amber-300 bg-stone-800 font-bold border-b-2 border-amber-400'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search, Wishlist (Desktop only) & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 lg:flex-initial justify-end min-w-0">
            {/* Search Trigger - Expanded to use freed space on mobile */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex-1 sm:flex-initial max-w-[280px] sm:max-w-none flex items-center gap-2 bg-stone-800/90 hover:bg-stone-700/80 text-stone-300 hover:text-white px-3 sm:px-4 py-2 rounded-lg text-xs tracking-wide transition-all border border-stone-700/70 cursor-pointer shadow-2xs min-w-0 justify-start"
              aria-label="Search outfits and pieces"
            >
              <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Search outfits, pieces...</span>
            </button>

            {/* Wishlist / Saved Looks Button (Visible ONLY on Desktop/Tablet, Hidden on Mobile Header) */}
            <button
              onClick={() => {
                if (onNavigateWishlist) {
                  onNavigateWishlist();
                  setMobileMenuOpen(false);
                }
              }}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer relative ${
                isWishlistPage
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-stone-800/90 hover:bg-stone-700/80 text-stone-300 hover:text-white border-stone-700/70'
              }`}
              aria-label={`Wishlist and saved outfits (${totalUniqueCount} saved)`}
              title="Saved Outfits & Wishlist"
            >
              <div className="relative flex items-center justify-center">
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    totalUniqueCount > 0 ? 'text-red-500 fill-current' : 'text-stone-300'
                  }`}
                />
                {totalUniqueCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                    {totalUniqueCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-medium ml-1">Wishlist</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-900/98 px-4 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs font-semibold tracking-wider uppercase text-stone-400">
            <span>6 Fashion Sections</span>
            <span className="text-[10px] text-amber-400">MineMart Fashion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700 text-left cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore All (Homepage)</span>
            </button>

            <button
              onClick={() => {
                if (onNavigateWishlist) onNavigateWishlist();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between p-3 rounded-lg text-xs font-semibold border cursor-pointer ${
                isWishlistPage
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                  : 'bg-stone-850 text-stone-200 hover:bg-stone-800 border-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className={`w-4 h-4 ${totalUniqueCount > 0 ? 'text-red-500 fill-current' : 'text-stone-400'}`} />
                <span>Saved Looks &amp; Wishlist</span>
              </div>
              <span className="text-[10px] font-bold bg-stone-900 text-amber-400 px-2 py-0.5 rounded-full border border-stone-700">
                {totalUniqueCount}
              </span>
            </button>

            {ALL_SECTIONS.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => {
                  onSelectSection(sec.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-lg text-left text-xs transition-colors flex items-center justify-between border cursor-pointer ${
                  currentSectionId === sec.id
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 font-semibold'
                    : 'bg-stone-850 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div>
                  <span className="font-semibold block">{sec.title}</span>
                  <span className="text-[10px] text-stone-400 line-clamp-1">{sec.subtitle}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="pt-2 text-center text-[11px] text-stone-400 border-t border-stone-800">
            <p className="italic text-amber-300 font-display">&ldquo;Wear Your Identity.&rdquo;</p>
            <p className="mt-0.5 text-stone-500">Tap any outfit to view individual pieces &amp; buy links.</p>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[80vh]">
            <div className="p-3 sm:p-4 border-b border-stone-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search outfits, dresses, shirts, sneakers, jewelry..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-stone-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 text-xs text-stone-400 hover:text-white rounded bg-stone-800 cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {searchQuery.trim() === '' ? (
                <div className="space-y-4">
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                    Browse All 6 Sections
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ALL_SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => {
                          onSelectSection(sec.id);
                          setSearchOpen(false);
                        }}
                        className="p-3 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-left text-xs transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-white block truncate">{sec.title}</span>
                        <span className="text-[10px] text-amber-400/80">{sec.badge || 'Explore'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : matchedOutfits.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                    Found {matchedOutfits.length} Outfits
                  </span>
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
                        alt={outfit.name}
                        className="w-14 h-14 rounded-md object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                            {outfit.name}
                          </h4>
                          {outfit.price && (
                            <span className="text-xs font-bold text-amber-300 ml-2 shrink-0">
                              {outfit.price}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-1">
                          {outfit.description}
                        </p>
                        <span className="text-[10px] text-stone-500 mt-0.5 block">
                          {getVisibleProductCount(outfit.items) > 0
                            ? `${getVisibleProductCount(outfit.items)} related ${getVisibleProductCount(outfit.items) === 1 ? 'piece' : 'pieces'} included`
                            : 'Curated lookbook'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-stone-400">
                  <p className="text-sm">No outfits found matching &quot;{searchQuery}&quot;.</p>
                  <p className="text-xs text-stone-500 mt-1">
                    Try searching for &quot;blazer&quot;, &quot;silk&quot;, &quot;hoodie&quot;, &quot;chinos&quot;, or &quot;kurta&quot;.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
