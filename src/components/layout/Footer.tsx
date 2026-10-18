import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { ShieldCheck, Sparkles, ExternalLink, Heart, Compass } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onSelectCategory }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Affiliate Disclosure Banner Card */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                <span>Affiliate Disclosure & Transparency Statement</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2 py-0.5 rounded bg-amber-400/15">
                  Verified
                </span>
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed max-w-3xl">
                MineMart is a fashion discovery and style inspiration platform. We feature curated outfits and head-to-toe looks with links to official retailer websites. MineMart may earn a commission from qualifying purchases through our affiliate links at zero additional cost to you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-stone-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Guaranteed Official Retailer Checkouts</span>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                MineMart
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                Fashion
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curating modern outfit inspiration, aesthetic looks, and seamless head-to-toe shopping links for the style-conscious individual.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-stone-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Independent editorial fashion discovery</span>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
              Trending Collections
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Collections */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
              More Aesthetics
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* How It Works */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
              How MineMart Works
            </h5>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400">1.</span>
                <span>Discover curated head-to-toe outfit inspiration</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400">2.</span>
                <span>Click any look to view individual matching pieces</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400">3.</span>
                <span>Click &quot;Shop Now&quot; to purchase directly from authorized retailers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimers */}
        <div className="pt-8 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} MineMart Fashion Discovery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-300 transition-colors"
            >
              Home
            </button>
            <span>•</span>
            <span>All affiliate links route to authorized merchant partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
