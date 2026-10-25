import React, { useState } from 'react';
import { getOutfitById, getOutfitsByCategory } from '../data/outfits';
import { getCategoryById } from '../data/categories';
import { getItemsByOutfit } from '../data/outfitItems';
import { ProductList } from '../components/products/ProductList';
import { OutfitCard } from '../components/categories/OutfitCard';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Share2,
  Check,
  Heart,
  Tag,
  Layers,
} from 'lucide-react';

interface OutfitDetailsPageProps {
  outfitId: string;
  onNavigateHome: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const OutfitDetailsPage: React.FC<OutfitDetailsPageProps> = ({
  outfitId,
  onNavigateHome,
  onSelectCategory,
  onSelectOutfit,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const outfit = getOutfitById(outfitId);

  if (!outfit) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          Outfit Inspiration Not Found
        </h2>
        <p className="text-sm text-stone-500">
          The outfit look you requested could not be located. It may have been updated or moved.
        </p>
        <button
          onClick={onNavigateHome}
          className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const category = getCategoryById(outfit.categoryId);
  const items = getItemsByOutfit(outfit.id);

  // More looks from the same category
  const relatedOutfits = getOutfitsByCategory(outfit.categoryId)
    .filter((o) => o.id !== outfit.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pb-20 space-y-10 sm:space-y-12">
      {/* Breadcrumbs Navigation */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-stone-500 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            {category && (
              <>
                <button
                  onClick={() => onSelectCategory(category.id)}
                  className="hover:text-stone-900 transition-colors font-medium truncate max-w-[120px] sm:max-w-none cursor-pointer shrink-0"
                >
                  {category.name}
                </button>
                <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              </>
            )}
            <span className="text-stone-900 font-semibold truncate max-w-[160px] sm:max-w-md">
              {outfit.title}
            </span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-2.5 py-1 rounded shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Outfit Showcase & Items Breakdown Frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Full Outfit Image (Large Inspiration Card) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative sticky top-24">
              <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative">
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {outfit.isTrending && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Trending Look</span>
                    </span>
                  )}
                  {outfit.isNewArrival && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2.5 py-1 rounded shadow-sm">
                      Fresh Look
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                  <span className="text-xs font-semibold bg-stone-900/90 backdrop-blur-xs text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/20">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>{items.length} Shoppable Pieces</span>
                  </span>

                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-full backdrop-blur-xs shadow-md transition-colors ${
                      liked ? 'bg-red-500 text-white' : 'bg-stone-900/80 text-white hover:bg-stone-900'
                    }`}
                    aria-label="Save look"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Look Info Box */}
              <div className="p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  {category && (
                    <button
                      onClick={() => onSelectCategory(category.id)}
                      className="text-[11px] font-bold uppercase tracking-widest text-amber-700 hover:underline block cursor-pointer"
                    >
                      Collection: {category.name}
                    </button>
                  )}
                  {outfit.price ? (
                    <span className="text-xs font-bold text-stone-900 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                      Complete Look: {outfit.price}
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Curated Look
                    </span>
                  )}
                </div>
                <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                  {outfit.title}
                </h1>
                {outfit.description && (
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {outfit.description}
                  </p>
                )}

                {/* Style Tags */}
                {outfit.tags && outfit.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {outfit.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Complete Individual Items Breakdown List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Context Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  How to Shop This Outfit
                </h3>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Below are the exact and curated matching pieces that create this complete look. Click <strong>&quot;Shop Now&quot;</strong> on any product to view details and purchase directly on the authorized retailer&apos;s site.
                </p>
              </div>
            </div>

            {/* Shoppable Products List for this Outfit */}
            <ProductList items={items} />

            {/* Affiliate Guarantee Notice */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-500 space-y-1">
              <p className="font-semibold text-stone-800">
                Official Retailer Integration & Authenticity
              </p>
              <p>
                Product availability, sizing, and pricing are maintained by the external merchant partners. As an affiliate partner, MineMart may receive a small commission when you purchase through these links at no extra cost to you.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* More Outfits from This Collection */}
      {relatedOutfits.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200">
          <div className="flex items-end justify-between mb-4 pb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">
                Keep Exploring
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                More Looks from {category?.name || 'this Collection'}
              </h2>
            </div>
            {category && (
              <button
                onClick={() => onSelectCategory(category.id)}
                className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1 cursor-pointer"
              >
                <span>View Full Collection</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {relatedOutfits.map((related) => (
              <OutfitCard
                key={related.id}
                outfit={related}
                onClick={() => {
                  onSelectOutfit(related.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
