import React from 'react';
import { ArrowLeft, Sparkles, Compass, ShieldCheck, Heart, Layers, ExternalLink } from 'lucide-react';

interface AboutUsProps {
  onNavigateHome: () => void;
  onSelectSection?: (sectionId: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigateHome, onSelectSection }) => {
  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Top Breadcrumb Bar */}
      <div className="bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 text-xs">
          <nav className="flex items-center gap-2 text-stone-600">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-stone-900 font-semibold">About Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>About MineMart Fashion</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Wear Your Identity.
            </h1>
            
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              MineMart Fashion is a curated fashion discovery and affiliate-shopping platform designed to help you explore complete outfit ideas, clothing, footwear, and accessories with zero styling guesswork.
            </p>
          </div>
        </div>

        {/* What is MineMart Fashion? */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-amber-700" />
            <span>Our Fashion Discovery Philosophy</span>
          </h2>
          
          <div className="space-y-3.5 text-stone-600 text-sm leading-relaxed font-light">
            <p>
              Finding great individual clothes online is easy, but putting together a cohesive, stylish outfit can be frustrating. Most online stores present products as isolated items on generic white backgrounds, leaving you wondering what jacket complements that dress or which footwear completes those trousers.
            </p>
            <p>
              At <strong>MineMart Fashion</strong>, we take a lookbook-first approach. We curate complete head-to-toe aesthetics—combining tops, bottoms, shoes, bags, eyewear, jewelry, and accessories into one unified visual presentation. You can view the entire styled look, inspect every piece in detail, and find direct shopping links to verified retailer stores.
            </p>
          </div>
        </section>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-base">Complete Head-to-Toe Looks</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Every outfit is presented as a complete set of matching pieces, from tops and trousers to shoes and watches.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-base">Direct Affiliate Shopping</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              We connect you directly to trusted retailers like Amazon, Myntra, Flipkart, and AJIO with official merchant links.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-stone-900 text-base">Pure Transparency</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              We never process customer payments or store sensitive card details. You always purchase securely on official merchant checkouts.
            </p>
          </div>
        </div>

        {/* How MineMart Works */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
            How MineMart Works
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 font-light leading-relaxed">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider block">Step 1</span>
              <h4 className="font-semibold text-stone-900 text-sm">Browse 6 Signature Sections</h4>
              <p>Explore our carefully categorized collections including Women&apos;s Chic, Men&apos;s Tailored, Streetwear, Everyday Casual, Formal Elegance, and Ethnic Traditions.</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider block">Step 2</span>
              <h4 className="font-semibold text-stone-900 text-sm">Open the Outfit Box</h4>
              <p>Click any outfit card to view the high-resolution photo on the left and all matching individual items arranged neatly on the right.</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider block">Step 3</span>
              <h4 className="font-semibold text-stone-900 text-sm">Quick-View Any Piece</h4>
              <p>Click &quot;Shop Now&quot; on any specific piece to inspect photos, price details, and stylist notes in our compact preview window.</p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider block">Step 4</span>
              <h4 className="font-semibold text-stone-900 text-sm">Secure Merchant Checkout</h4>
              <p>Follow the link directly to the verified retailer to complete your purchase safely with their standard guarantees, shipping, and returns.</p>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
          <div>
            <h4 className="font-semibold text-stone-900 text-sm">Ready to explore new styles?</h4>
            <p className="text-xs text-stone-600 font-light mt-0.5">Discover our latest curated looks across all 6 departments.</p>
          </div>
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer text-center"
          >
            Explore Homepage
          </button>
        </div>
      </main>
    </div>
  );
};
