import React, { useState } from 'react';
import { ProductItem } from '../data/types';
import { ExternalLink, Tag } from 'lucide-react';

interface ProductCardProps {
  item: ProductItem;
  itemIndex?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, itemIndex }) => {
  const [imgError, setImgError] = useState(false);

  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    : item.image;

  // Format price
  const formatPrice = (val?: string | number) => {
    if (!val) return '';
    const s = String(val).trim();
    if (s.startsWith('₹') || s.startsWith('$') || s.startsWith('€') || s.startsWith('£')) {
      return s;
    }
    return `₹${s}`;
  };

  const formattedPrice = formatPrice(item.price);
  const formattedOriginalPrice = formatPrice(item.originalPrice);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open affiliate purchase URL in a new tab
    if (item.productUrl) {
      window.open(item.productUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Product Image Frame */}
        <div className="aspect-[4/5] sm:aspect-square bg-stone-100 rounded-lg overflow-hidden relative mb-3">
          <img
            src={displayImage}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          />

          {/* Category Tag (e.g. Shirt, Shoes, Bag, Watch) */}
          {item.categoryTag && (
            <div className="absolute top-2 right-2 z-10">
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-stone-800 px-2 py-0.5 rounded shadow-xs border border-stone-200">
                {item.categoryTag}
              </span>
            </div>
          )}

          {/* Piece Indicator */}
          {itemIndex !== undefined && (
            <div className="absolute top-2 left-2 z-10">
              <span className="text-[10px] font-bold bg-stone-900/90 text-white px-2 py-0.5 rounded shadow-xs">
                Piece #{itemIndex + 1}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          {item.brand && (
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-500 font-semibold truncate">
              {item.brand}
            </p>
          )}

          <h4 className="font-display text-xs sm:text-sm font-bold text-stone-900 leading-snug line-clamp-2">
            {item.name}
          </h4>

          {item.description && (
            <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            {formattedPrice && (
              <span className="text-sm sm:text-base font-bold text-stone-900">
                {formattedPrice}
              </span>
            )}
            {formattedOriginalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Prominent "Buy Now" Affiliate Action Button */}
      <div className="pt-3 mt-3 border-t border-stone-100">
        <a
          href={item.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleBuyNow}
          className="w-full py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer text-center group/btn"
        >
          <span>Buy Now</span>
          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-amber-400" />
        </a>
      </div>
    </div>
  );
};
