import React, { useState } from 'react';
import { OutfitItem } from '../../types';
import { ExternalLink, Tag, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  item: OutfitItem;
  itemNumber?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, itemNumber }) => {
  const [imageError, setImageError] = useState(false);

  const discountPercent =
    item.price && item.originalPrice && item.originalPrice > item.price
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : null;

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Product Image Box */}
        <div className="aspect-[4/5] sm:aspect-square bg-stone-100 rounded-lg overflow-hidden relative mb-3">
          <img
            src={
              imageError
                ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
                : item.image
            }
            alt={item.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          />

          {/* Item Number Badge (e.g. #1, #2) */}
          {itemNumber !== undefined && (
            <div className="absolute top-2 left-2 z-10">
              <span className="w-6 h-6 rounded-full bg-stone-900/90 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {itemNumber}
              </span>
            </div>
          )}

          {/* Category Tag (e.g. Shoes, Bag, Dress) */}
          {item.categoryTag && (
            <div className="absolute top-2 right-2 z-10">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-stone-800 px-2 py-0.5 rounded shadow-xs border border-stone-200">
                {item.categoryTag}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {discountPercent && (
            <div className="absolute bottom-2 left-2 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                <span>{discountPercent}% OFF</span>
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          {item.brand && (
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-500 font-semibold truncate">
              {item.brand}
            </p>
          )}

          <h4 className="font-display text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2">
            {item.name}
          </h4>

          {item.description && (
            <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            {item.price !== undefined ? (
              <>
                <span className="text-sm sm:text-base font-bold text-stone-900">
                  ${item.price}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-xs text-stone-400 line-through">
                    ${item.originalPrice}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-medium text-stone-600">
                View price on retailer
              </span>
            )}
          </div>
        </div>
      </div>

      {/* External Action Button */}
      <div className="pt-3 mt-3 border-t border-stone-150">
        <a
          href={item.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer group/btn shadow-xs text-center"
        >
          <span>Shop Now</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
        <p className="text-[9px] text-stone-600 text-center mt-1.5">
          Opens on authorized retailer
        </p>
      </div>
    </div>
  );
};
