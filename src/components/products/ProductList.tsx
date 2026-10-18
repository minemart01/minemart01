import React from 'react';
import { OutfitItem } from '../../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Layers } from 'lucide-react';

interface ProductListProps {
  items: OutfitItem[];
}

export const ProductList: React.FC<ProductListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-stone-200">
        <Sparkles className="w-6 h-6 text-amber-600 mx-auto mb-2" />
        <h4 className="font-display text-sm font-semibold text-stone-900">
          Individual Items Being Cataloged
        </h4>
        <p className="text-xs text-stone-500 mt-1">
          Direct shopping links for this outfit are currently being verified with our retail partners.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-700" />
          <h3 className="font-display text-base sm:text-lg font-bold text-stone-900">
            Items in this Look ({items.length})
          </h3>
        </div>
        <span className="text-[11px] text-stone-500 font-medium">
          Click &quot;Shop Now&quot; to view on retailer
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {items.map((item, index) => (
          <ProductCard key={item.id} item={item} itemNumber={index + 1} />
        ))}
      </div>
    </div>
  );
};
