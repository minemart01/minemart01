import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CategorySlug } from '../../types';
import { ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setFilters } = useStore();

  const handleNavCategory = (category: CategorySlug) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      {/* Trust & Transparency Pillars */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-stone-100 text-sm">Authorized Partnerships</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Direct atelier productions alongside verified luxury retailer feeds with full transparency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-stone-100 text-sm">Inspected Direct Shipping</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Complimentary express dispatch on direct orders over $150 with live carrier tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-stone-100 text-sm">14-Day Complimentary Returns</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Pre-printed return shipping labels included with all direct MineMart parcels.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-stone-100 text-sm">Encrypted Safe Checkout</h4>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                256-bit SSL transaction encryption, Cash on Delivery option, and zero credential storage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-white tracking-tight">MineMart</span>
              <span className="text-[10px] tracking-widest uppercase text-stone-400 font-sans border-l border-stone-700 pl-2">
                Fashion Platform
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              MineMart connects fashion discoverers with curated atelier apparel, premium footwear, and hand-selected partner garments from verified global luxury retailers.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <p className="font-medium text-stone-200">Customer Atelier Service</p>
              <p className="mt-0.5 text-stone-400">support@minemart.com · Mon–Fri 9am–8pm EST</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleNavCategory('men')} className="hover:text-white transition-colors">
                  Men Tailoring & Casuals
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('women')} className="hover:text-white transition-colors">
                  Women Silk & Dresses
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('footwear')} className="hover:text-white transition-colors">
                  Footwear & Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('accessories')} className="hover:text-white transition-colors">
                  Bags & Fine Accents
                </button>
              </li>
              <li>
                <button onClick={() => handleNavCategory('kids')} className="hover:text-white transition-colors">
                  Kids Organic Essentials
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { setActiveView('profile'); }} className="hover:text-white transition-colors">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('profile'); }} className="hover:text-white transition-colors">
                  Delivery & Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('profile'); }} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('wishlist'); }} className="hover:text-white transition-colors">
                  Saved Wishlist
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100 mb-3">Administrative</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => { setActiveView('admin'); }} className="text-amber-400 hover:text-amber-300 font-medium transition-colors flex items-center gap-1">
                  <span>Merchant Admin Console</span>
                </button>
              </li>
              <li>
                <span className="text-stone-500">Authorized Partner API Integrations</span>
              </li>
              <li>
                <span className="text-stone-500">Affiliate Program Transparency</span>
              </li>
              <li>
                <span className="text-stone-500">Security & Privacy Governance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure & Legal Notice */}
        <div className="mt-10 pt-6 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>
            &copy; 2026 MineMart Retail Platform. All rights reserved. Outbound partner items indicate verified affiliate or retail links.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Terms of Service</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Authorized Partner Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
