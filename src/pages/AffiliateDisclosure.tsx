import React from 'react';
import { ArrowLeft, ShieldCheck, DollarSign, ExternalLink, HelpCircle, AlertTriangle, Sparkles } from 'lucide-react';

interface AffiliateDisclosureProps {
  onNavigateHome: () => void;
}

export const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({ onNavigateHome }) => {
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
            <span className="text-stone-900 font-semibold">Affiliate Disclosure</span>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Transparency &amp; Compliance
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Affiliate Disclosure
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Last Updated: October 2026 • MineMart Fashion (&ldquo;Wear Your Identity.&rdquo;)
          </p>
        </div>

        {/* Amazon Associates Official Required Notice Box */}
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-7 space-y-2 relative shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Official Amazon Associates Disclosure Statement</span>
          </div>
          <blockquote className="text-base sm:text-lg font-serif italic font-bold text-stone-900 border-l-4 border-amber-600 pl-4 py-1">
            &ldquo;As an Amazon Associate I earn from qualifying purchases.&rdquo;
          </blockquote>
          <p className="text-xs text-stone-600 font-light pt-1">
            This statement is provided in full compliance with the Amazon Associates Program Operating Agreement.
          </p>
        </div>

        {/* Core Disclosure Body */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-8 text-stone-700 text-xs sm:text-sm font-light leading-relaxed shadow-2xs">
          {/* Section 1: How Affiliate Shopping Works */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-700" />
              <span>1. How Our Affiliate Model Works</span>
            </h2>
            <p>
              MineMart Fashion is an independent fashion discovery and outfit curation platform. To support our styling research and editorial work, we participate in various affiliate marketing programs.
            </p>
            <p>
              When you click on an outfit item link, view a product quick-view preview, or click a <strong>&ldquo;Shop Now&rdquo;</strong> / <strong>&ldquo;Buy Now&rdquo;</strong> button on our website, you are directed to an external online retailer. If you choose to make a purchase on that merchant&apos;s website, MineMart Fashion may earn a small referral commission at <strong>no additional cost to you</strong>.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 2: Zero Extra Cost Guarantee */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>2. Zero Extra Cost to You as a Shopper</span>
            </h2>
            <p>
              The prices displayed on merchant websites remain exactly the same whether you use our affiliate links or go directly to the merchant through your own browser. The commission is paid entirely by the retailer from their standard advertising and referral budget.
            </p>
            <p>
              You continue to receive all retailer promotions, coupon codes, rewards, discounts, loyalty points, and merchant guarantees just as you normally would.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 3: Independence & Non-Affiliation Statement */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>3. Independent Operation &amp; Non-Affiliation Statement</span>
            </h2>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-stone-700">
              <p className="font-medium text-stone-900">
                MineMart Fashion is an independent fashion publication and outfit curation site.
              </p>
              <p>
                <strong>MineMart Fashion is NOT owned by, operated by, endorsed by, or officially affiliated with Amazon, Flipkart, Myntra, or AJIO</strong>, or any of their parent corporations, subsidiaries, or affiliates.
              </p>
              <p className="text-xs text-stone-500">
                All merchant names, brand trademarks, logos, and product imagery mentioned on this website belong strictly to their respective owners and are used purely for product identification and referral purposes.
              </p>
            </div>
          </section>

          <hr className="border-stone-100" />

          {/* Section 4: Editorial Independence */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>4. Editorial Curation &amp; Integrity</span>
            </h2>
            <p>
              Our styling team selects outfit pieces based on aesthetic harmony, lookbook cohesion, and quality style inspiration. Retailers cannot pay for biased placements or force uncurated items into our lookbooks. Our primary goal is always to deliver modern, inspiring head-to-toe outfits that help you &ldquo;Wear Your Identity.&rdquo;
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 5: External Checkout Notice */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900">
              5. Transactions, Shipping &amp; Customer Support
            </h2>
            <p>
              Because all transactions occur entirely on external retailer websites (e.g. Amazon, Myntra, Flipkart, AJIO), MineMart Fashion does not process orders, fulfill shipments, or collect credit card information. For questions regarding order status, returns, or product warranties, please consult customer service at the retailer where your order was placed.
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <div className="text-center pt-2">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </main>
    </div>
  );
};
