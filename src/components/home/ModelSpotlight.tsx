import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Layers, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

export const ModelSpotlight: React.FC = () => {
  const { products, setActiveView, setFilters } = useStore();

  const directProducts = products.filter((p) => p.isDirectSale);
  const partnerProducts = products.filter((p) => !p.isDirectSale);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 sm:p-8 md:p-10">
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-stone-500">
            The MineMart Model
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
            Direct Atelier Productions & Authorized Luxury Retail Partners
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            MineMart offers a seamless single-destination discovery experience. When shopping our direct atelier pieces, check out smoothly with bag and express delivery. When discovering our verified partner links, enjoy guaranteed authenticity with direct routing to authorized retailer checkouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-2xs space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Layers className="w-4 h-4 text-stone-900" />
              <span>MineMart Direct Atelier</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Items tailored and stocked in our certified fulfillment centers. Fully supported with size selection, bag checkout, coupons, COD, and tracked couriers.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, productType: 'direct' }));
                  setActiveView('catalog');
                }}
                className="text-xs font-semibold text-stone-900 hover:underline flex items-center gap-1 py-1 cursor-pointer"
              >
                <span>Browse Direct Products ({directProducts.length}+)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border border-stone-200 shadow-2xs space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Authorized Partner Network</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Legitimate feeds from Nordstrom, MatchesFashion, Farfetch, and boutique labels. Transparent outbound affiliate links with zero scraping and verified merchant trust.
            </p>
            <div className="pt-1">
              <button
                onClick={() => {
                  setFilters((prev) => ({ ...prev, productType: 'affiliate' }));
                  setActiveView('catalog');
                }}
                className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 py-1 cursor-pointer"
              >
                <span>Browse Verified Partner Feeds ({partnerProducts.length}+)</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
