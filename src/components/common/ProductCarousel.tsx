import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  icon?: React.ReactNode;
  products: Product[];
  onViewAll?: () => void;
  viewAllText?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  kicker,
  icon,
  products,
  onViewAll,
  viewAllText = 'See All',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Scroll by ~80% of visible container width
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title & Action */}
      <div className="flex items-end justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-stone-200">
        <div>
          {kicker && (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700">
              {icon}
              <span>{kicker}</span>
            </div>
          )}
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mt-0.5">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-stone-500 mt-0.5 hidden sm:block">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group py-1"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Desktop Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none ${
                canScrollLeft
                  ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 cursor-pointer shadow-2xs'
                  : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-full border border-stone-200 bg-white transition-colors focus:outline-none ${
                canScrollRight
                  ? 'text-stone-800 hover:bg-stone-100 hover:border-stone-400 cursor-pointer shadow-2xs'
                  : 'text-stone-300 border-stone-100 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollContainerRef}
          className="flex gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1 items-stretch"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(46%-5px)] sm:w-[calc(33.333%-11px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-13px)] shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
