import React, { useState } from 'react';
import { ArrowLeft, Mail, Clock, MessageSquare, Check, Copy } from 'lucide-react';

interface ContactUsProps {
  onNavigateHome: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onNavigateHome }) => {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'minemartfashiom0085@gmail.com';

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
            <span className="text-stone-900 font-semibold">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Help &amp; Inquiries
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Contact MineMart Fashion
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            Have a question about a curated look, an affiliate partnership, or general feedback? We would love to hear from you.
          </p>
        </div>

        {/* Primary Contact Card with Email Placeholder */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                Official Email Address
              </h2>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Reach out directly to the MineMart Fashion editorial and affiliate management team.
              </p>
            </div>
          </div>

          {/* Email Display Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
                Direct Contact Email:
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="font-mono text-sm sm:text-base font-semibold text-stone-900 hover:text-amber-700 transition-colors select-all block"
              >
                {contactEmail}
              </a>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Expected Response Time & Types of Inquiries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Response Timeline</span>
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              We respond to all genuine style suggestions, broken link reports, and brand collaboration inquiries within <strong>24 to 48 business hours</strong>.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Inquiries We Handle</span>
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Outfit suggestions, partnership opportunities, copyright notices, and feedback to help make MineMart Fashion even better.
            </p>
          </div>
        </div>

        {/* Important Order Notice */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-3 shadow-2xs">
          <h3 className="text-sm font-bold text-stone-900">
            Important Note Regarding Orders, Shipping &amp; Payments
          </h3>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            MineMart Fashion is an affiliate discovery and curation website. We do not sell products directly, hold physical stock, or process financial payments. If you have inquiries regarding an order, shipment status, return, or refund for an item purchased through our links, please contact customer support at the respective retailer where the order was completed (e.g., Amazon, Myntra, Flipkart, or AJIO).
          </p>
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
