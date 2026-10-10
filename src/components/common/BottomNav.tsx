import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  onOpenAuth: () => void;
  onOpenCart: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenAuth, onOpenCart }) => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlist,
    currentUser,
    setFilters,
  } = useStore();

  const handleHome = () => {
    setFilters((prev) => ({ ...prev, category: 'all', searchQuery: '' }));
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplore = () => {
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlist = () => {
    setActiveView('wishlist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccount = () => {
    if (currentUser) {
      setActiveView('profile');
    } else {
      onOpenAuth();
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around h-14 px-2">
        {/* Home */}
        <button
          onClick={handleHome}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeView === 'home'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* Explore / Catalog */}
        <button
          onClick={handleExplore}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeView === 'catalog'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Explore Categories"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Explore</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeView === 'wishlist'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums leading-none">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Wishlist</span>
        </button>

        {/* Bag / Cart */}
        <button
          onClick={onOpenCart}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeView === 'cart' || activeView === 'checkout'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Shopping Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-stone-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums leading-none">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Bag</span>
        </button>

        {/* Account */}
        <button
          onClick={handleAccount}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeView === 'profile' || activeView === 'admin'
              ? 'text-stone-950 font-semibold'
              : 'text-stone-500 hover:text-stone-900'
          }`}
          aria-label="Account"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {currentUser ? 'Account' : 'Sign In'}
          </span>
        </button>
      </div>
    </nav>
  );
};
