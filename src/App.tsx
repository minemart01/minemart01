/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { OrderTrackingPage } from './components/checkout/OrderTrackingPage';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { AuthModal } from './components/auth/AuthModal';
import { BottomNav } from './components/common/BottomNav';

const StorefrontContent: React.FC = () => {
  const { activeView } = useStore();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 pb-14 md:pb-0">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Main Dynamic Viewport Frame */}
      <main className="flex-1">
        {activeView === 'home' && <HomePage />}
        {activeView === 'catalog' && <CatalogPage />}
        {activeView === 'product-detail' && (
          <ProductDetailPage onOpenCart={() => setCartDrawerOpen(true)} />
        )}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'order-confirmation' && <OrderConfirmationPage />}
        {activeView === 'tracking' && <OrderTrackingPage />}
        {activeView === 'profile' && <UserProfilePage />}
        {activeView === 'wishlist' && <WishlistPage />}
        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Notification Toast Stack */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}
