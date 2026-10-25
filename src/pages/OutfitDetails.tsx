import React, { useState } from 'react';
import { Outfit } from '../data/types';
import { ALL_SECTIONS, getOutfitById } from '../data/allSections';
import { ProductCard } from '../components/ProductCard';
import { OutfitCard } from '../components/OutfitCard';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Heart,
  Share2,
  Check,
} from 'lucide-react';

interface OutfitDetailsProps {
  outfitId: string;
  onNavigateHome: () => void;
  onSelectSection: (sectionId: string) => void;
  onSelectOutfit: (outfitId: string) => void;
}

export const OutfitDetails: React.FC<OutfitDetailsProps> = ({
  outfitId,
  onNavigateHome,
  onSelectSection,
  onSelectOutfit,
}) => {
  const outfit = getOutfitById(outfitId) || ALL_SECTIONS[0].outfits[0];
  const section = ALL_SECTIONS.find((s) => s.id === outfit.sectionId);

  // Images for thumbnail switcher (defaults to [outfit.image] if not specified)
  const imageList = outfit.images && outfit.images.length > 0 ? outfit.images : [outfit.image];
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0]);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync selected image if outfit changes
  React.useEffect(() => {
    setSelectedImage((outfit.images && outfit.images[0]) || outfit.image);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [outfitId]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Other looks from the same section
  const relatedLooks = section
    ? section.outfits.filter((o) => o.id !== outfit.id).slice(0, 4)
    : [];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-stone-500 overflow-x-auto no-scrollbar">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer shrink-0 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
            {section && (
              <>
                <button
                  onClick={() => onSelectSection(section.id)}
                  className="hover:text-stone-900 transition-colors font-medium truncate max-w-[140px] sm:max-w-none cursor-pointer shrink-0"
                >
                  {section.title}
                </button>
                <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              </>
            )}
            <span className="text-stone-900 font-semibold truncate max-w-[180px] sm:max-w-md">
              {outfit.name}
            </span>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-2.5 py-1 rounded shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? 'Link Copied' : 'Share Look'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ===================================================================
              LEFT SIDE: Large Outfit Photo + Small Clickable Thumbnails
              =================================================================== */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative lg:sticky lg:top-24">
              {/* Main Large Photo */}
              <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative">
                <img
                  src={selectedImage}
                  alt={outfit.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Trending Badge */}
                {outfit.isTrending && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Trending Look</span>
                    </span>
                  </div>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-full backdrop-blur-xs shadow-md transition-colors cursor-pointer ${
                      liked ? 'bg-red-500 text-white' : 'bg-stone-900/80 text-white hover:bg-stone-900'
                    }`}
                    aria-label="Save look"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Pieces Count Pill */}
                <div className="absolute bottom-3 right-3 z-10">
                  <span className="text-[10px] font-semibold bg-stone-900/90 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-white/20">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>{outfit.items.length} Shoppable Pieces</span>
                  </span>
                </div>
              </div>

              {/* Clickable Photo Thumbnails Switcher */}
              {imageList.length > 1 && (
                <div className="p-3 bg-stone-50 border-t border-stone-200">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                    Click Thumbnail to Switch Photo:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {imageList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-14 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          selectedImage === img
                            ? 'border-amber-500 ring-2 ring-amber-400/30 scale-102'
                            : 'border-stone-200 hover:border-stone-400 opacity-75 hover:opacity-100'
                        }`}
                        aria-label={`View photo angle ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${outfit.name} view ${idx + 1}`}
                          className="w-full h-full object-cover object-center"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Look Summary Box */}
              <div className="p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between">
                  {section && (
                    <button
                      onClick={() => onSelectSection(section.id)}
                      className="text-[11px] font-bold uppercase tracking-widest text-amber-700 hover:underline block cursor-pointer"
                    >
                      {section.title}
                    </button>
                  )}
                  {outfit.price && (
                    <span className="text-xs font-bold text-stone-900 bg-amber-50 text-amber-950 border border-amber-200 px-2 py-0.5 rounded">
                      Complete Look: {outfit.price}
                    </span>
                  )}
                </div>

                <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                  {outfit.name}
                </h1>

                {outfit.description && (
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {outfit.description}
                  </p>
                )}

                <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-stone-800">
                    &ldquo;Wear Your Identity.&rdquo;
                  </span>
                  <span>•</span>
                  <span>Curated by MineMart Stylists</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT SIDE: The Five Individual Products or Accessories + "Buy Now"
              =================================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Context Box */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  How to Shop This Outfit
                </h3>
                <p className="text-xs text-amber-800/95 leading-relaxed">
                  Below are the <strong>5 matching pieces and accessories</strong> that make up this complete look. Click <strong>&quot;Buy Now&quot;</strong> on any product to open the official retailer website in a new tab.
                </p>
              </div>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <h3 className="font-display text-base sm:text-lg font-bold text-stone-900">
                  Products in this Look ({outfit.items.length})
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                Tap &quot;Buy Now&quot; to shop on official store
              </span>
            </div>

            {/* Grid of the 5 Individual Related Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
              {outfit.items.map((item, index) => (
                <ProductCard key={item.id} item={item} itemIndex={index} />
              ))}
            </div>

            {/* Affiliate Guarantee Notice */}
            <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 text-xs text-stone-500 space-y-1">
              <p className="font-semibold text-stone-800">
                Official Retailer Integration &amp; Affiliate Disclosure
              </p>
              <p>
                When you click &quot;Buy Now&quot;, you are redirected to authorized shopping portals (Myntra, Ajio, Amazon, Flipkart, or official brand stores). MineMart may earn a small affiliate commission at zero additional cost to you.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* More Outfits from This Section */}
      {relatedLooks.length > 0 && section && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200">
          <div className="flex items-end justify-between mb-4 pb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">
                Keep Exploring
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                More Looks from {section.title}
              </h2>
            </div>
            <button
              onClick={() => onSelectSection(section.id)}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1 cursor-pointer"
            >
              <span>View All Section Looks</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {relatedLooks.map((look) => (
              <OutfitCard
                key={look.id}
                outfit={look}
                onClick={() => onSelectOutfit(look.id)}
                variant="grid"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
