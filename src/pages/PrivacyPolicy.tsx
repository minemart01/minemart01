import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, ExternalLink, HardDrive, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigateHome }) => {
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
            <span className="text-stone-900 font-semibold">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Legal &amp; Trust
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Effective Date: October 2026 • MineMart Fashion (&ldquo;Wear Your Identity.&rdquo;)
          </p>
        </div>

        {/* Quick Summary Highlights */}
        <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 space-y-4 border border-stone-800 shadow-lg">
          <h2 className="font-semibold text-white text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span>Our Commitment to Your Privacy at a Glance</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300 font-light pt-2">
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="text-amber-400 font-bold block">No Accounts Required</span>
              <span>Browse outfits freely without signups, passwords, or personal profiles.</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="text-amber-400 font-bold block">No Payment Collection</span>
              <span>We never collect or store credit cards or banking details.</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="text-amber-400 font-bold block">Client-Side Wishlist</span>
              <span>Saved looks stay solely on your browser via localStorage.</span>
            </div>
          </div>
        </div>

        {/* Full Policy Sections */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-8 text-stone-700 text-xs sm:text-sm font-light leading-relaxed shadow-2xs">
          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-700" />
              <span>1. Overview of MineMart Fashion</span>
            </h3>
            <p>
              MineMart Fashion is an editorial style discovery and fashion affiliate website operating under the slogan <em>&ldquo;Wear Your Identity.&rdquo;</em> Our purpose is to curate inspiring outfit lookbooks and connect visitors to official, verified online retailers where matching apparel, footwear, and accessories can be purchased.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>2. Information We Do NOT Collect</span>
            </h3>
            <p>
              To maintain utmost privacy, MineMart Fashion does not maintain an internal e-commerce shopping cart, customer checkout system, or mandatory user accounts. As a result:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>We do <strong>not</strong> collect payment card numbers, CVVs, expiration dates, or bank details.</li>
              <li>We do <strong>not</strong> require you to register a personal account, username, or password.</li>
              <li>We do <strong>not</strong> sell, rent, or trade personal consumer lists to third-party data brokers.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-amber-700" />
              <span>3. Local Browser Storage (Saved Outfits &amp; Wishlist)</span>
            </h3>
            <p>
              When you like an outfit or add looks to your Wishlist, this information is stored locally inside your web browser using HTML5 <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 text-xs">localStorage</code>.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-600">
              <li>This preference data never leaves your device and is not transmitted to our servers.</li>
              <li>You can remove items individually, click the <em>&ldquo;Clear All Saved&rdquo;</em> button on the Wishlist page, or clear your browser cache at any time to delete this data completely.</li>
            </ul>
          </section>

          <hr className="border-stone-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-amber-700" />
              <span>4. External Shopping Links &amp; Third-Party Retailers</span>
            </h3>
            <p>
              When you click on an individual fashion product or the &ldquo;Shop Now&rdquo; button, you will be redirected to an external third-party merchant website (such as Amazon, Myntra, Flipkart, AJIO, or official brand storefronts).
            </p>
            <p>
              Once you leave MineMart Fashion, our Privacy Policy no longer governs your activity. Third-party merchants operate their own independent privacy policies, terms of service, and cookie tracking. We strongly encourage you to review their respective privacy notices prior to completing any order or submitting personal data.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>5. Standard Web Server Logs &amp; Affiliate Tracking</span>
            </h3>
            <p>
              Like almost all websites, the web servers hosting MineMart Fashion may automatically record basic non-personally identifiable diagnostic information (such as your device&apos;s IP address, browser type, referral source, and request timestamps) solely for security, DDoS prevention, and server performance diagnostics.
            </p>
            <p>
              Additionally, when clicking external affiliate links, partner affiliate networks (e.g., Amazon Associates or affiliate tracking programs) may use tracking cookies or parameters on their own platforms to verify referral source and calculate qualifying sales commissions.
            </p>
          </section>

          <hr className="border-stone-100" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h3 className="font-display text-lg font-bold text-stone-900">
              6. Policy Updates &amp; Contact
            </h3>
            <p>
              We may revise this Privacy Policy periodically to reflect enhancements to our service. Any updates will be published directly on this page with an updated effective date. For any questions regarding this policy, please reach out via our Contact Us page.
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
