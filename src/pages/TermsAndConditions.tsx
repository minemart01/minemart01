import React from 'react';
import { ArrowLeft, FileText, AlertCircle, ShoppingBag, ShieldAlert, Award } from 'lucide-react';

interface TermsAndConditionsProps {
  onNavigateHome: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onNavigateHome }) => {
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
            <span className="text-stone-900 font-semibold">Terms &amp; Conditions</span>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Legal Terms
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Last Updated: October 2026 • MineMart Fashion (&ldquo;Wear Your Identity.&rdquo;)
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-8 text-stone-700 text-xs sm:text-sm font-light leading-relaxed shadow-2xs">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              <span>1. Agreement to Terms &amp; Permitted Use</span>
            </h2>
            <p>
              By accessing and using <strong>MineMart Fashion</strong>, you acknowledge and agree to comply with these Terms &amp; Conditions. Our website is provided solely for personal, non-commercial fashion inspiration, outfit idea discovery, and browsing styled lookbooks. You agree not to misuse the website, attempt unauthorized access, or reproduce content in bulk without prior consent.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>2. Product Information &amp; Pricing Accuracy</span>
            </h2>
            <p>
              MineMart Fashion curates outfits and highlights matching pieces available on external retailer platforms. While we strive to maintain up-to-date descriptions, images, and prices:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>Prices, discounts, coupons, and sizes are set solely by the external merchant websites and can fluctuate dynamically at any time without notice.</li>
              <li>Product availability and stock levels are controlled solely by third-party retailers. An item featured in our lookbook may become sold out or discontinued by the merchant.</li>
              <li>The final price and availability displayed at checkout on the retailer&apos;s website will always govern your transaction.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-700" />
              <span>3. External Shopping Websites &amp; Affiliate Links</span>
            </h2>
            <p>
              MineMart Fashion contains links to third-party merchant websites (such as Amazon, Myntra, Flipkart, AJIO, and respective brand stores). When you click &quot;Shop Now&quot; or an external product link:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>You leave MineMart Fashion and enter a third-party website operated independently of us.</li>
              <li>Any purchase, order fulfillment, shipping, package tracking, warranty, return, or refund is strictly handled between you and that merchant.</li>
              <li>MineMart Fashion does not handle money, process transactions, or retain merchant order records.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>4. Limitation of Liability &amp; Disclaimers</span>
            </h2>
            <p>
              MineMart Fashion provides all content on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied.
            </p>
            <p>
              Under no circumstances shall MineMart Fashion, its creators, or operators be held liable for any direct, indirect, incidental, special, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>Any dispute, defect, or dissatisfaction with merchandise purchased from a third-party retailer.</li>
              <li>Shipping delays, incorrect deliveries, or damaged goods received from external merchants.</li>
              <li>Temporary technical downtime, broken external URLs, or inaccuracies in product specifications.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-700" />
              <span>5. Intellectual Property &amp; Trademarks</span>
            </h2>
            <p>
              All MineMart Fashion branding, original styling curation, lookbook arrangements, and interface design are protected by applicable intellectual property rights.
            </p>
            <p>
              All external product names, brand names, and merchant trademarks (including Amazon, Flipkart, Myntra, AJIO, and apparel brands) referenced on this site remain the exclusive property of their respective trademark holders. Their use on MineMart Fashion is strictly for product identification, descriptive editorial categorization, and affiliate referral purposes.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-stone-900">
              6. Modifications to These Terms
            </h2>
            <p>
              We reserve the right to revise or replace these Terms &amp; Conditions at our discretion. Any revisions become effective immediately upon being published on this page. Your continued use of MineMart Fashion following changes constitutes acceptance of the amended terms.
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
