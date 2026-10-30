import React, { useState, useEffect } from 'react';
import { ProductItem } from '../data/types';
import { isProductVisible } from '../utils/productVisibility';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Tag,
  Sparkles,
} from 'lucide-react';

interface ProductQuickViewModalProps {
  item: ProductItem | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  item,
  onClose,
}) => {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset active image index when item changes
  useEffect(() => {
    setActiveImgIdx(0);
  }, [item]);

  if (!item || !isProductVisible(item)) return null;

  // Resolve gallery images: support multiple images or fallback to single primary image
  const imageList: string[] =
    item.images && item.images.length > 0 ? item.images : [item.image];
  const hasMultipleImages = imageList.length > 1;

  const currentImage = imageList[activeImgIdx] || item.image;

  // Helper to format currency
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

  // Compute discount percentage if both prices are numbers
  let discountPercent = 0;
  if (typeof item.price === 'number' && typeof item.originalPrice === 'number') {
    if (item.originalPrice > item.price) {
      discountPercent = Math.round(
        ((item.originalPrice - item.price) / item.originalPrice) * 100
      );
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % imageList.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="quick-view-title"
    >
      {/* Centered, Compact, Square-like Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200 select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-1.5 sm:p-2 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white shadow-md transition-all active:scale-90 cursor-pointer"
          aria-label="Close product quick view"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto no-scrollbar flex-1 flex flex-col">
          {/* Main Photo / Gallery Container (Compact, Square-like) */}
          <div className="relative aspect-[4/3] sm:aspect-square bg-stone-50 border-b border-stone-100 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <img
              src={currentImage}
              alt={item.name}
              className="w-full h-full object-contain object-center transition-all duration-300"
            />

            {/* Category / Brand Badge */}
            {item.categoryTag && (
              <span className="absolute top-3 left-3 z-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-white px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                <Tag className="w-2.5 h-2.5 text-amber-400" />
                <span>{item.categoryTag}</span>
              </span>
            )}

            {/* Gallery Previous/Next Controls (Only when multiple images exist) */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all active:scale-90 cursor-pointer border border-stone-200"
                  aria-label="Previous product image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md transition-all active:scale-90 cursor-pointer border border-stone-200"
                  aria-label="Next product image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Clickable Image Thumbnails (Only when multiple images exist) */}
          {hasMultipleImages && (
            <div className="p-2 sm:p-2.5 bg-stone-50 border-b border-stone-100 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-amber-600 ring-2 ring-amber-400/40 scale-105'
                      : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${item.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Product Info & Details */}
          <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-1.5">
              {item.brand && (
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-800 block">
                  {item.brand}
                </span>
              )}

              <h2
                id="quick-view-title"
                className="font-display text-base sm:text-lg font-bold text-stone-900 leading-snug"
              >
                {item.name}
              </h2>

              {/* Pricing Row */}
              <div className="flex items-center gap-2 pt-0.5">
                {formattedPrice && (
                  <span className="text-base sm:text-xl font-bold text-stone-900">
                    {formattedPrice}
                  </span>
                )}
                {formattedOriginalPrice && (
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Short Description */}
              {item.description ? (
                <p className="text-xs text-stone-600 leading-relaxed font-light pt-1">
                  {item.description}
                </p>
              ) : (
                <p className="text-xs text-stone-500 leading-relaxed font-light pt-1">
                  Stylist-matched piece for this complete outfit lookbook. Tap &ldquo;Shop Now&rdquo; to purchase directly from the official verified partner website.
                </p>
              )}
            </div>

            {/* Bottom Actions & Transparency */}
            <div className="space-y-2.5 pt-3 border-t border-stone-100">
              {/* Prominent Shop Now Button */}
              {item.productUrl ? (
                <a
                  href={item.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-98 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group text-center"
                >
                  <span>Shop Now</span>
                  <ExternalLink className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : (
                <div className="w-full py-2.5 px-3 rounded-lg bg-stone-100 text-stone-400 text-xs text-center font-medium">
                  Direct shopping link currently unavailable
                </div>
              )}

              {/* Verified Partner Retailer Guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Official Partner Store • Secure Direct Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
