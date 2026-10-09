import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setActiveView, toggleWishlist, addToCart } = useStore();

  const wishProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <button
            onClick={() => setActiveView('catalog')}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900">
            Saved Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-0.5 tabular-nums">
            {wishProducts.length} {wishProducts.length === 1 ? 'curated piece' : 'curated pieces'} saved
          </p>
        </div>
      </div>

      {/* Grid or Empty */}
      {wishProducts.length === 0 ? (
        <div className="p-16 text-center bg-white border border-stone-200 rounded-xl space-y-3">
          <Heart className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-display text-lg font-semibold text-stone-900">Your wishlist is empty</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Save tailoring, cashmere knitwear, or authorized designer bags while browsing to compare and purchase later.
          </p>
          <button
            onClick={() => setActiveView('catalog')}
            className="mt-2 px-5 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
