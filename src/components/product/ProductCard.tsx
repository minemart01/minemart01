import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Star, ExternalLink, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    setSelectedProductId,
    setActiveView,
    toggleWishlist,
    isWishlisted,
    addToCart,
    logAffiliateClick,
  } = useStore();

  const [imageError, setImageError] = useState(false);
  const wish = isWishlisted(product.id);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePartnerDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.externalPartner) {
      logAffiliateClick(product);
      window.open(product.externalPartner.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isDirectSale) {
      const defaultSize = product.sizes[0] || 'M';
      const defaultColor = product.colors[0]?.name || 'Standard';
      addToCart(product, defaultSize, defaultColor, 1);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-stone-200/80 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        {!imageError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="font-display text-lg text-stone-600 mb-1">{product.brand}</span>
            <span className="text-xs">{product.subCategory}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors z-10 focus:outline-none ${
            wish
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 backdrop-blur-sm text-stone-600 hover:bg-white hover:text-stone-900'
          }`}
          aria-label={wish ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
        </button>

        {/* Quiet Origin / Channel Marker (Clean unboxed text, no pills) */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          {product.isDirectSale ? (
            <span className="text-[11px] font-medium text-stone-900 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-2xs">
              MineMart Direct
            </span>
          ) : (
            <span className="text-[11px] font-medium text-amber-900 bg-amber-50/95 backdrop-blur-sm px-2 py-0.5 rounded border border-amber-200/50 shadow-2xs flex items-center gap-1">
              <span>Partner Listing</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        {/* Quick Add Overlay on hover (Direct Sale only) */}
        {product.isDirectSale && (
          <div className="absolute inset-x-2.5 bottom-2.5 hidden sm:flex justify-end opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={handleQuickAdd}
              className="text-xs bg-stone-900 text-white font-medium py-1.5 px-3 rounded shadow hover:bg-stone-800 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Quick Bag</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Brand & Category line (Clean unboxed text with dot) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className="uppercase tracking-wider text-[11px] text-stone-600 truncate">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px] truncate">{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-stone-900 mt-1 line-clamp-2 leading-snug group-hover:text-stone-700 transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Pricing & Rating */}
        <div>
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-bold text-stone-950 font-sans">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-stone-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-semibold text-emerald-700">
                  {product.discountPercent}% off
                </span>
              </>
            )}
          </div>

          {/* Quiet Rating & Outbound indicator */}
          <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium text-stone-700 tabular-nums">{product.rating}</span>
              <span className="text-stone-400 tabular-nums">({product.reviewCount})</span>
            </div>

            {!product.isDirectSale && product.externalPartner && (
              <button
                onClick={handlePartnerDirectClick}
                className="text-[11px] text-stone-700 hover:text-stone-950 underline underline-offset-2 flex items-center gap-1"
                title={`Visit ${product.externalPartner.name}`}
              >
                <span>Partner Link</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
