import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ALL_OUTFITS, getOutfitById, ALL_SECTIONS } from '../data/allSections';
import { Outfit } from '../data/types';
import { getVisibleProductCount, getVisibleOutfits } from '../utils/productVisibility';
import {
  Heart,
  Bookmark,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ShoppingBag,
  Info,
  Check,
} from 'lucide-react';

interface WishlistPageProps {
  onNavigateHome: () => void;
  onSelectOutfit: (outfitId: string) => void;
  onSelectSection: (sectionId: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onNavigateHome,
  onSelectOutfit,
  onSelectSection,
}) => {
  const {
    likedIds,
    wishlistIds,
    uniqueSavedIds,
    toggleLike,
    toggleWishlist,
    isLiked,
    isWishlisted,
    removeOutfitFromAll,
    clearAllSaved,
    totalUniqueCount,
    likedCount,
    wishlistCount,
  } = useWishlist();

  const [activeTab, setActiveTab] = useState<'all' | 'liked' | 'wishlist'>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  // Determine which outfit IDs to display based on active tab
  const activeIds =
    activeTab === 'all'
      ? uniqueSavedIds
      : activeTab === 'liked'
      ? likedIds
      : wishlistIds;

  // Resolve full outfit objects from ALL_OUTFITS that are currently visible
  const outfits: Outfit[] = getVisibleOutfits(
    activeIds
      .map((id) => getOutfitById(id))
      .filter((o): o is Outfit => Boolean(o))
  );

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-stone-600">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-stone-900 font-semibold">Saved Outfits &amp; Wishlist</span>
          </nav>

          {totalUniqueCount > 0 && (
            <div className="flex items-center gap-2">
              {confirmClear ? (
                <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2 py-1 rounded text-xs text-red-700 animate-in fade-in">
                  <span>Clear all?</span>
                  <button
                    onClick={() => {
                      clearAllSaved();
                      setConfirmClear(false);
                    }}
                    className="font-bold underline hover:text-red-900 cursor-pointer"
                  >
                    Yes
                  </button>
                  <span className="text-red-300">|</span>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="hover:text-stone-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove all saved outfits"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-stone-900 text-white py-8 sm:py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                Personal Stylebook
              </span>
              <span className="text-xs text-stone-400">
                {totalUniqueCount} {totalUniqueCount === 1 ? 'Unique Outfit' : 'Unique Outfits'} Saved
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              My Saved Outfits &amp; Wishlist
            </h1>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              Your curated collection of head-to-toe outfits from across all MineMart fashion departments. Click any look to view matching pieces, prices, and direct retailer purchase links.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar border-b border-stone-800 pb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 ${
                activeTab === 'all'
                  ? 'border-amber-400 text-amber-300 bg-stone-800/80 font-bold'
                  : 'border-transparent text-stone-400 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Saved</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === 'all'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {totalUniqueCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('liked')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 ${
                activeTab === 'liked'
                  ? 'border-amber-400 text-amber-300 bg-stone-800/80 font-bold'
                  : 'border-transparent text-stone-400 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-red-400 fill-current" />
              <span>Liked Outfits</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === 'liked'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {likedCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 ${
                activeTab === 'wishlist'
                  ? 'border-amber-400 text-amber-300 bg-stone-800/80 font-bold'
                  : 'border-transparent text-stone-400 hover:text-white hover:bg-stone-800/40'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Wishlist Items</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === 'wishlist'
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {wishlistCount}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid or Empty State */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {outfits.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-8 sm:p-14 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              {activeTab === 'liked' ? (
                <Heart className="w-8 h-8 text-stone-300" />
              ) : activeTab === 'wishlist' ? (
                <Bookmark className="w-8 h-8 text-stone-300" />
              ) : (
                <ShoppingBag className="w-8 h-8 text-stone-300" />
              )}
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-lg sm:text-xl font-bold text-stone-900">
                {activeTab === 'liked'
                  ? 'No Liked Outfits Yet'
                  : activeTab === 'wishlist'
                  ? 'Your Wishlist is Empty'
                  : 'No Saved Looks Yet'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
                {activeTab === 'liked'
                  ? 'Tap the heart icon on any outfit while exploring to save your favorite style looks.'
                  : activeTab === 'wishlist'
                  ? 'Save outfits to your wishlist to compare individual pieces and buy later.'
                  : 'Explore the 6 fashion departments and tap the heart icon on any outfit photo to curate your stylebook.'}
              </p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onNavigateHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Explore Trending Outfits</span>
              </button>

              <button
                onClick={() => onSelectSection('section1')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Browse Women&apos;s Looks
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Outfits Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {outfits.map((outfit) => {
                const liked = isLiked(outfit.id);
                const wishlisted = isWishlisted(outfit.id);

                return (
                  <div
                    key={outfit.id}
                    className="group bg-white rounded-xl overflow-hidden border border-stone-200/90 hover:border-stone-800 hover:shadow-xl transition-all duration-300 flex flex-col relative select-none"
                  >
                    {/* Outfit Photo Container */}
                    <div
                      onClick={() => onSelectOutfit(outfit.id)}
                      className="aspect-[3/4] overflow-hidden bg-stone-100 relative cursor-pointer"
                    >
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Action Badges: Heart and Wishlist */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(outfit.id);
                          }}
                          className={`p-1.5 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
                            liked
                              ? 'bg-red-500 text-white'
                              : 'bg-stone-900/70 text-white hover:bg-stone-900'
                          }`}
                          title={liked ? 'Unlike this outfit' : 'Like this outfit'}
                          aria-label="Toggle Like"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(outfit.id);
                          }}
                          className={`p-1.5 rounded-full shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer ${
                            wishlisted
                              ? 'bg-amber-500 text-white'
                              : 'bg-stone-900/70 text-white hover:bg-stone-900'
                          }`}
                          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          aria-label="Toggle Wishlist"
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Pieces Count Pill */}
                      <div className="absolute bottom-2.5 right-2.5 z-10">
                        <span className="text-[10px] font-semibold bg-stone-900/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/20">
                          <Layers className="w-2.5 h-2.5 text-amber-400" />
                          <span>{getVisibleProductCount(outfit.items, outfit.id) > 0 ? `${getVisibleProductCount(outfit.items, outfit.id)} ${getVisibleProductCount(outfit.items, outfit.id) === 1 ? 'Piece' : 'Pieces'}` : 'Curated Look'}</span>
                        </span>
                      </div>

                      {/* Status Pills */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                        {liked && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded shadow-xs">
                            Liked
                          </span>
                        )}
                        {wishlisted && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-600 text-white px-1.5 py-0.5 rounded shadow-xs">
                            Wishlist
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Outfit Card Info */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        {outfit.category && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 block truncate">
                            {outfit.category}
                          </span>
                        )}

                        <h3
                          onClick={() => onSelectOutfit(outfit.id)}
                          className="font-display text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 cursor-pointer transition-colors"
                        >
                          {outfit.name}
                        </h3>

                        {outfit.price && (
                          <div className="pt-0.5">
                            <span className="text-xs sm:text-sm font-bold text-stone-900">
                              {outfit.price}
                            </span>
                            <span className="text-[10px] text-stone-400 ml-1.5">
                              (Complete Look)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons: View Look & Remove */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectOutfit(outfit.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-stone-950 transition-colors cursor-pointer"
                        >
                          <span>View Look</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => removeOutfitFromAll(outfit.id)}
                          className="text-[11px] text-stone-400 hover:text-red-600 flex items-center gap-1 py-1 px-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Remove from saved outfits"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Local Browser Storage Disclosure Notice */}
        <div className="mt-12 bg-stone-100 border border-stone-200/90 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 max-w-4xl mx-auto">
          <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-700 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs text-stone-600">
            <h4 className="font-semibold text-stone-900">
              Browser-Saved Wishlist &amp; Privacy
            </h4>
            <p className="leading-relaxed text-stone-500">
              Your liked looks and wishlist selections are saved directly in your web browser&apos;s local storage. You do not need to create an account, log in, or provide personal details to keep your stylebook active on this device.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
