import React, { useState } from 'react';
import { Outfit } from '../../types';
import { getItemsByOutfit } from '../../data/outfitItems';
import { Sparkles, ArrowRight, Layers, Tag } from 'lucide-react';

import { isProductVisible, isOutfitStatusEnabled } from '../../utils/productVisibility';

interface OutfitCardProps {
  outfit: Outfit;
  onClick: () => void;
  variant?: 'grid' | 'carousel';
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  onClick,
  variant = 'grid',
}) => {
  const [imageError, setImageError] = useState(false);
  const rawItems = getItemsByOutfit(outfit.id);
  const items = isOutfitStatusEnabled(outfit.id)
    ? rawItems.filter((item) => isProductVisible(item, outfit.id))
    : [];
  const itemCount = items.length;

  // Format first item price or estimated total
  const firstItemPrice = items.length > 0 && items[0].price ? items[0].price : null;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all duration-300 relative ${
        variant === 'carousel'
          ? 'w-[165px] sm:w-[220px] md:w-[250px] shrink-0 snap-start'
          : 'w-full'
      }`}
    >
      {/* Outfit Hero Image */}
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
              : outfit.image
          }
          alt={outfit.title}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim for subtle bottom text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-Left Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {outfit.isTrending && (
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>Trending</span>
            </span>
          )}
          {outfit.isNewArrival && !outfit.isTrending && (
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2 py-0.5 rounded shadow-xs">
              New Look
            </span>
          )}
        </div>


        {/* Piece Count Badge */}
        {itemCount > 0 && (
          <div className="absolute bottom-2 right-2 z-10">
            <span className="text-[9px] sm:text-[10px] font-semibold bg-stone-900/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/20">
              <Layers className="w-2.5 h-2.5 text-amber-400" />
              <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
            </span>
          </div>
        )}
      </div>

      {/* Outfit Card Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            {outfit.tags && outfit.tags.length > 0 && (
              <span className="uppercase font-semibold tracking-wider text-amber-700 block truncate">
                {outfit.tags[0]}
              </span>
            )}
            {firstItemPrice && (
              <span className="font-semibold text-stone-900">
                From ₹{firstItemPrice}
              </span>
            )}
          </div>

          <h3 className="font-display text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2 group-hover:text-amber-900 transition-colors">
            {outfit.title}
          </h3>

          {outfit.description && (
            <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {outfit.description}
            </p>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-2 border-t border-stone-150 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
          <span className="text-[11px] sm:text-xs">Shop This Look</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
