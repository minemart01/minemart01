import React, { useState } from 'react';
import { Category } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  variant?: 'grid' | 'carousel';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
  variant = 'grid',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col bg-stone-900 rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-900 hover:shadow-lg transition-all duration-300 relative ${
        variant === 'carousel' ? 'w-[145px] sm:w-[190px] shrink-0 snap-start' : 'w-full'
      }`}
    >
      {/* Category Image with Editorial Scrim */}
      <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
              : category.image
          }
          alt={category.name}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

        {/* Badge if present */}
        {category.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 px-2 py-0.5 rounded shadow-xs">
              {category.badge}
            </span>
          </div>
        )}

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 text-white z-10">
          {category.kicker && (
            <p className="text-[10px] sm:text-[11px] text-amber-300 font-medium tracking-wide uppercase truncate">
              {category.kicker}
            </p>
          )}
          <h3 className="font-display text-sm sm:text-base md:text-lg font-bold leading-snug truncate group-hover:text-amber-200 transition-colors">
            {category.name}
          </h3>
          <div className="flex items-center justify-between mt-1 text-[10px] text-stone-300">
            <span className="truncate">View Outfits</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 text-amber-400 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
