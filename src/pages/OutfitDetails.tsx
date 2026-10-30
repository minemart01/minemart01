import React, { useState } from 'react';
import { Outfit, ProductItem } from '../data/types';
import { ALL_SECTIONS, getOutfitById } from '../data/allSections';
import { OutfitCard } from '../components/OutfitCard';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { useWishlist } from '../context/WishlistContext';
import { isProductVisible, getVisibleProducts, isOutfitVisible, getVisibleOutfits } from '../utils/productVisibility';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Heart,
  Bookmark,
  Share2,
  Check,
  ExternalLink,
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
  const rawOutfit = getOutfitById(outfitId);
  const isVisible = rawOutfit ? isOutfitVisible(rawOutfit) : false;

  const outfit = isVisible && rawOutfit ? rawOutfit : null;
  const section = outfit ? ALL_SECTIONS.find((s) => s.id === outfit.sectionId) : null;
  const visibleItems = outfit ? getVisibleProducts(outfit.items, outfit.id) : [];

  const { isLiked, isWishlisted, toggleLike, toggleWishlist } = useWishlist();
  const liked = outfit ? isLiked(outfit.id) : false;
  const wishlisted = outfit ? isWishlisted(outfit.id) : false;

  // Images for thumbnail switcher (defaults to [outfit.image] if not specified)
  const imageList = outfit && outfit.images && outfit.images.length > 0 ? outfit.images : outfit ? [outfit.image] : [];
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0] || '');
  const [copied, setCopied] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  // Sync selected image if outfit changes
  React.useEffect(() => {
    if (outfit) {
      setSelectedImage((outfit.images && outfit.images[0]) || outfit.image);
    }
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [outfitId, outfit]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Other looks from the same section (only visible looks)
  const relatedLooks = section && outfit
    ? getVisibleOutfits(section.outfits.filter((o) => o.id !== outfit.id)).slice(0, 4)
    : [];

  // If outfit is hidden (status false, missing, or no eligible products), show clean unavailable state
  if (!outfit) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-150 text-stone-500 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            This Curated Look is Currently Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            The items for this style edit are being updated or are not currently available for retail shopping. Please explore our other curated looks.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-8 pb-20">
      {/* Top Breadcrumb Navigation */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 text-xs">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-stone-500 overflow-x-auto no-scrollbar min-w-0">
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
                  className="hover:text-stone-900 transition-colors font-medium truncate max-w-[100px] sm:max-w-none cursor-pointer shrink-0"
                >
                  {section.title}
                </button>
                <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              </>
            )}
            <span className="text-stone-900 font-semibold truncate max-w-[140px] sm:max-w-md">
              {outfit.name}
            </span>
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-2 py-1 rounded shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share Look'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =======================================================================
          THE MAIN BOX: ONE CONNECTED OUTFIT CONTAINER (Mobile & Desktop)
          - LEFT SIDE: Product list of all individual products (Shirt, Pants, Shoes, etc.)
          - RIGHT SIDE: Complete outfit photo (vertically centered, object-contain)
          ======================================================================= */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-3.5 sm:p-6 overflow-hidden">
          {/* Main Box Header: Visual Grouping & Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 sm:pb-4 border-b border-stone-100">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Complete the Look</span>
                </span>
                <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                  {visibleItems.length > 0
                    ? `${visibleItems.length} Shoppable ${visibleItems.length === 1 ? 'Piece' : 'Pieces'}`
                    : 'Curated Lookbook'}
                </span>
              </div>
              <h1 className="font-display text-base sm:text-2xl font-bold text-stone-900 leading-snug mt-1.5">
                {outfit.name}
              </h1>
            </div>

            {outfit.price && (
              <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                <span className="text-xs sm:text-base font-bold text-stone-900 bg-amber-50 text-amber-950 border border-amber-200 px-2.5 py-1 rounded">
                  {outfit.price}
                </span>
                <span className="text-[10px] text-stone-400">Complete Look</span>
              </div>
            )}
          </div>

          {/* Connected Two-Column Layout: OUTFIT PHOTO LEFT | PRODUCTS AND SHOPPING LINKS RIGHT */}
          <div className="grid grid-cols-12 gap-2.5 sm:gap-6 lg:gap-8 pt-3 sm:pt-6 items-stretch">
            {/* ===============================================================
                LEFT SIDE: The Complete Outfit Photo
                - Vertically centered within its column (my-auto, self-center)
                - Sensible size with object-fit: contain to preserve proportions
                - Balances empty space above and below when fewer products exist
                =============================================================== */}
            <div className="col-span-5 sm:col-span-5 lg:col-span-5 flex flex-col justify-center items-center my-auto self-center h-full">
              <div className="w-full flex flex-col items-center justify-center my-auto">
                {/* Outfit Photo Frame */}
                <div className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-50 border border-stone-200/90 shadow-2xs flex items-center justify-center max-h-[380px] sm:max-h-[500px]">
                  <img
                    src={selectedImage}
                    alt={outfit.name}
                    className="w-full h-auto max-h-[350px] sm:max-h-[460px] object-contain object-center rounded-xl bg-stone-50"
                  />

                  {/* Corner Like Button */}
                  <button
                    onClick={() => toggleLike(outfit.id)}
                    className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-xs shadow-md transition-all active:scale-90 cursor-pointer ${
                      liked ? 'bg-red-500 text-white' : 'bg-stone-900/80 text-white hover:bg-stone-900'
                    }`}
                    aria-label={liked ? 'Unlike outfit' : 'Like outfit'}
                    title={liked ? 'Liked' : 'Like'}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </button>

                  {/* Trending Badge */}
                  {outfit.isTrending && (
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-amber-300 px-1.5 sm:px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                      <span className="hidden sm:inline">Trending Look</span>
                      <span className="sm:hidden">Trend</span>
                    </span>
                  )}
                </div>

                {/* Photo Angle Switcher Thumbnails (if multiple images exist) */}
                {imageList.length > 1 && (
                  <div className="w-full flex items-center justify-center gap-1.5 mt-2 sm:mt-2.5 overflow-x-auto no-scrollbar py-0.5">
                    {imageList.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-7 h-9 sm:w-11 sm:h-14 rounded-lg border-2 transition-all shrink-0 overflow-hidden cursor-pointer ${
                          selectedImage === img
                            ? 'border-amber-600 ring-2 ring-amber-400/40 scale-105'
                            : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Photo angle ${idx + 1}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Visual balance note / brand signature */}
                <div className="mt-2 text-center text-[10px] sm:text-[11px] text-stone-400 hidden sm:block">
                  <span className="italic font-display">&ldquo;Wear Your Identity.&rdquo;</span>
                  <span className="mx-1.5">•</span>
                  <span>Curated by MineMart</span>
                </div>
              </div>
            </div>

            {/* ===============================================================
                RIGHT SIDE: List of Individual Products Belonging to This Outfit
                Supports any number of products (3, 5, 7, 8 or more)
                =============================================================== */}
            <div className="col-span-7 sm:col-span-7 lg:col-span-7 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-[11px] sm:text-xs font-semibold text-stone-700">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" />
                    <span>Matching Outfit Pieces ({visibleItems.length})</span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-medium hidden sm:inline">
                    Official Retailer Checkouts
                  </span>
                </div>

                {/* Individual Products List: Flexible container accommodating any number of active items */}
                {visibleItems.length > 0 ? (
                  <div className="space-y-1.5 sm:space-y-2.5 pt-2 max-h-[460px] sm:max-h-[560px] overflow-y-auto pr-0.5 sm:pr-1 no-scrollbar">
                    {visibleItems.map((item, index) => (
                      <div
                        key={item.id || index}
                        onClick={() => setQuickViewProduct(item)}
                        className="bg-stone-50 hover:bg-amber-50/40 border border-stone-200/80 hover:border-amber-300/80 rounded-xl p-1.5 sm:p-2.5 flex items-center justify-between gap-1.5 sm:gap-3 transition-all group cursor-pointer"
                      >
                        {/* Product Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg object-cover bg-white border border-stone-200 shrink-0 group-hover:scale-102 transition-transform"
                        />

                        {/* Product Name, Category & Price */}
                        <div className="min-w-0 flex-1">
                          {item.categoryTag && (
                            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-amber-800 block truncate leading-none mb-0.5">
                              {item.categoryTag}
                            </span>
                          )}
                          <h3
                            className="text-[10px] sm:text-xs font-semibold text-stone-800 group-hover:text-stone-950 truncate leading-snug"
                            title={item.name}
                          >
                            {item.name}
                          </h3>
                          {item.price && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[9px] sm:text-xs font-bold text-stone-900">
                                {typeof item.price === 'number'
                                  ? `₹${item.price.toLocaleString('en-IN')}`
                                  : item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-[8px] sm:text-[10px] text-stone-400 line-through hidden sm:inline">
                                  {typeof item.originalPrice === 'number'
                                    ? `₹${item.originalPrice.toLocaleString('en-IN')}`
                                    : item.originalPrice}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Shop Now Action Button (Opens centered quick-view popup) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(item);
                          }}
                          className="shrink-0 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-[9px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-2xs flex items-center gap-0.5 sm:gap-1 transition-all cursor-pointer"
                          aria-label={`Shop Now for ${item.name}`}
                        >
                          <span>Shop Now</span>
                          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 sm:py-12 px-4 text-center bg-stone-50/70 border border-dashed border-stone-200 rounded-xl my-3 space-y-2">
                    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-700">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-800">
                        Pieces Being Curated
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                        Individual shopping links for this outfit are currently being refreshed by our styling team.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action Strip inside the Products Column */}
              <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-stone-100 flex items-center justify-between gap-1 text-[10px] sm:text-xs text-stone-500">
                <div className="flex items-center gap-1 text-[9px] sm:text-xs text-stone-600 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">Direct checkout on partner retailers</span>
                </div>

                <button
                  onClick={() => toggleWishlist(outfit.id)}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg border text-[9px] sm:text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                    wishlisted
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  <Bookmark className="w-3 h-3 fill-current" />
                  <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Look Description & Stylist Note Card */}
        {outfit.description && (
          <div className="mt-4 bg-white rounded-xl border border-stone-200 p-3.5 sm:p-4 space-y-1 text-xs">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Stylist &amp; Aesthetic Notes</span>
            </h3>
            <p className="text-stone-600 leading-relaxed text-xs sm:text-sm font-light">
              {outfit.description}
            </p>
          </div>
        )}
      </main>

      {/* More Outfits from This Section */}
      {relatedLooks.length > 0 && section && (
        <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 border-t border-stone-200">
          <div className="flex items-end justify-between mb-4 pb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700">
                Keep Exploring
              </span>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-stone-900 mt-0.5">
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

      {/* Product Quick-View Popup / Modal */}
      <ProductQuickViewModal
        item={quickViewProduct && isProductVisible(quickViewProduct, outfit.id) ? quickViewProduct : null}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
