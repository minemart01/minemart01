import React, { useState } from 'react';
import { Outfit } from '../data/types';
import { Layers, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { getVisibleProductCount } from '../utils/productVisibility';

interface OutfitCardProps {
  outfit: Outfit;
  onClick: () => void;
  variant?: 'slider' | 'grid';
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  onClick,
  variant = 'slider',
}) => {
  const [imgError, setImgError] = useState(false);
  const { isLiked, toggleLike } = useWishlist();
  const liked = isLiked(outfit.id);
  const visibleCount = getVisibleProductCount(outfit.items);

  // Fallback fashion image
  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    : outfit.image;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/90 hover:border-stone-900 hover:shadow-xl transition-all duration-300 relative select-none ${
        variant === 'slider'
          ? 'w-[200px] sm:w-[240px] md:w-[260px] shrink-0 snap-start'
          : 'w-full'
      }`}
    >
      {/* Outfit Photo Frame */}
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
        <img
          src={displayImage}
          alt={outfit.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges: Trending Look */}
        {outfit.isTrending && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>Trending</span>
            </span>
          </div>
        )}

        {/* Heart Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(outfit.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full backdrop-blur-xs shadow-md transition-all active:scale-90 cursor-pointer ${
            liked ? 'bg-red-500 text-white' : 'bg-stone-900/70 text-white hover:bg-stone-900'
          }`}
          aria-label={liked ? 'Unlike outfit' : 'Like outfit'}
          title={liked ? 'Liked' : 'Like'}
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current text-white' : 'text-stone-200'}`} />
        </button>

        {/* Pieces Count Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="text-[10px] font-semibold bg-stone-900/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/20">
            <Layers className="w-2.5 h-2.5 text-amber-400" />
            <span>{visibleCount > 0 ? `${visibleCount} ${visibleCount === 1 ? 'Piece' : 'Pieces'}` : 'Curated Look'}</span>
          </span>
        </div>
      </div>

      {/* Outfit Card Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {outfit.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 block truncate">
              {outfit.category}
            </span>
          )}

          <h3 className="font-display text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-amber-900 transition-colors">
            {outfit.name}
          </h3>

          {outfit.description && (
            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
              {outfit.description}
            </p>
          )}
        </div>

        {/* Pricing & Call to Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            {outfit.price && (
              <span className="text-xs sm:text-sm font-bold text-stone-900 block">
                {outfit.price}
              </span>
            )}
            <span className="text-[10px] text-stone-400 block">Complete Look</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-800 group-hover:text-stone-950 transition-colors">
            <span className="text-[11px]">View Look</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
