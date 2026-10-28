/**
 * ============================================================================
 * MINEMART FASHION — "Wear Your Identity."
 * Modern, Professional Fashion Affiliate Platform
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { Home } from './pages/Home';
import { OutfitDetails } from './pages/OutfitDetails';
import { WishlistPage } from './pages/WishlistPage';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { AffiliateDisclosure } from './pages/AffiliateDisclosure';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { ALL_SECTIONS } from './data/allSections';
import { Sparkles, ShieldCheck, Heart, Home as HomeIcon, Compass, ArrowUp, FileText } from 'lucide-react';

type ViewState =
  | 'home'
  | 'outfit-details'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'affiliate-disclosure';

function AppContent() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section1');
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>('s1-o1');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { totalUniqueCount } = useWishlist();

  // Synchronize with URL hash for seamless browser back/forward history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash === 'wishlist' || hash === 'saved') {
        setCurrentView('wishlist');
      } else if (hash === 'about' || hash === 'about-us') {
        setCurrentView('about');
      } else if (hash === 'contact' || hash === 'contact-us') {
        setCurrentView('contact');
      } else if (hash === 'privacy' || hash === 'privacy-policy') {
        setCurrentView('privacy');
      } else if (hash === 'terms' || hash === 'terms-conditions' || hash === 'terms-and-conditions') {
        setCurrentView('terms');
      } else if (hash === 'affiliate' || hash === 'affiliate-disclosure') {
        setCurrentView('affiliate-disclosure');
      } else if (hash.startsWith('outfit=')) {
        const outId = hash.replace('outfit=', '');
        setSelectedOutfitId(outId);
        setCurrentView('outfit-details');
      } else if (hash.startsWith('section=')) {
        const secId = hash.replace('section=', '');
        setSelectedSectionId(secId);
        setCurrentView('home');
        // Scroll to section after view updates
        setTimeout(() => {
          const el = document.getElementById(secId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const navigateToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWishlist = () => {
    setCurrentView('wishlist');
    window.location.hash = 'saved';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToInfoPage = (view: ViewState, hash: string) => {
    setCurrentView(view);
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSection = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = `section=${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      window.location.hash = `section=${sectionId}`;
    }
  };

  const navigateToOutfit = (outfitId: string) => {
    setSelectedOutfitId(outfitId);
    setCurrentView('outfit-details');
    window.location.hash = `outfit=${outfitId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* 1. Opening Animation (Intro Screen) */}
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      {/* 2. Global Navigation Header */}
      <Header
        onNavigateHome={navigateToHome}
        onNavigateWishlist={navigateToWishlist}
        onSelectSection={navigateToSection}
        onSelectOutfit={navigateToOutfit}
        onReplayIntro={() => setShowIntro(true)}
        currentSectionId={selectedSectionId}
        isDetailsPage={currentView === 'outfit-details'}
        isWishlistPage={currentView === 'wishlist'}
      />

      {/* 3. Main Views */}
      <div className="flex-1">
        {currentView === 'home' && (
          <Home
            onSelectSection={navigateToSection}
            onSelectOutfit={navigateToOutfit}
          />
        )}

        {currentView === 'outfit-details' && (
          <OutfitDetails
            outfitId={selectedOutfitId}
            onNavigateHome={navigateToHome}
            onSelectSection={navigateToSection}
            onSelectOutfit={navigateToOutfit}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistPage
            onNavigateHome={navigateToHome}
            onSelectOutfit={navigateToOutfit}
            onSelectSection={navigateToSection}
          />
        )}

        {currentView === 'about' && (
          <AboutUs
            onNavigateHome={navigateToHome}
            onSelectSection={navigateToSection}
          />
        )}

        {currentView === 'contact' && (
          <ContactUs onNavigateHome={navigateToHome} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy onNavigateHome={navigateToHome} />
        )}

        {currentView === 'terms' && (
          <TermsAndConditions onNavigateHome={navigateToHome} />
        )}

        {currentView === 'affiliate-disclosure' && (
          <AffiliateDisclosure onNavigateHome={navigateToHome} />
        )}
      </div>

      {/* 4. Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-30 p-2.5 rounded-full bg-stone-900 text-white shadow-xl hover:bg-stone-800 transition-all border border-stone-700 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* 5. Mobile Quick Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-stone-900/98 backdrop-blur-md text-stone-300 border-t border-stone-800 z-30 px-2 py-1 flex items-center justify-around text-[10px]">
        <button
          onClick={navigateToHome}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
            currentView === 'home' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <HomeIcon className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateToSection('section1')}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Women</span>
        </button>

        <button
          onClick={() => navigateToSection('section2')}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Men</span>
        </button>

        <button
          onClick={navigateToWishlist}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer relative ${
            currentView === 'wishlist' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Heart className={`w-4 h-4 ${totalUniqueCount > 0 ? 'text-red-500 fill-current' : 'text-stone-400'}`} />
            {totalUniqueCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[8px] font-bold px-1 rounded-full min-w-[14px] text-center shadow-xs">
                {totalUniqueCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </button>
      </nav>

      {/* 6. Clean, Professional Footer */}
      <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-20 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Transparency & Affiliate Disclosure Banner */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white tracking-wide">
                    Affiliate Disclosure &amp; Official Checkouts
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2 py-0.5 rounded bg-amber-400/15">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed max-w-3xl">
                  MineMart Fashion is an independent style inspiration and outfit discovery platform. All &quot;Buy Now&quot; and &quot;Shop Now&quot; buttons open authorized partner websites (such as Myntra, AJIO, Amazon, and Flipkart). We do not collect payments or manage customer shopping carts. We may earn a small affiliate commission at zero additional cost to you.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigateToInfoPage('affiliate-disclosure', 'affiliate-disclosure')}
                className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-stone-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Read Full Disclosure
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct Merchant Checkout</span>
              </div>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pt-2">
            {/* Brand Column */}
            <div className="space-y-3 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold tracking-tight text-white">
                  MineMart
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  Fashion
                </span>
              </div>
              <p className="text-xs italic text-amber-300 font-display">
                &ldquo;Wear Your Identity.&rdquo;
              </p>
              <p className="text-xs text-stone-400 leading-relaxed">
                Curating head-to-toe outfit lookbooks, aesthetic inspirations, and direct affiliate shopping links across 6 signature fashion departments.
              </p>
            </div>

            {/* Sections Column 1 */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
                Core Departments
              </h5>
              <ul className="space-y-2 text-xs text-stone-400">
                {ALL_SECTIONS.slice(0, 3).map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => navigateToSection(sec.id)}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                    >
                      {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections Column 2 */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
                More Aesthetics
              </h5>
              <ul className="space-y-2 text-xs text-stone-400">
                {ALL_SECTIONS.slice(3, 6).map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => navigateToSection(sec.id)}
                      className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                    >
                      {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
                MineMart Platform
              </h5>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button onClick={navigateToHome} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Homepage
                  </button>
                </li>
                <li>
                  <button onClick={navigateToWishlist} className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-red-400 fill-current" />
                    <span>My Saved Looks &amp; Wishlist ({totalUniqueCount})</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowIntro(true)} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Replay Opening Intro
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSection('section1')} className="hover:text-amber-300 transition-colors cursor-pointer">
                    Trending Looks of the Week
                  </button>
                </li>
              </ul>
            </div>

            {/* Information & Legal (The 5 Requested Pages) */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-white">
                Company &amp; Legal
              </h5>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => navigateToInfoPage('about', 'about-us')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToInfoPage('contact', 'contact-us')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToInfoPage('privacy', 'privacy-policy')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToInfoPage('terms', 'terms-and-conditions')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateToInfoPage('affiliate-disclosure', 'affiliate-disclosure')}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <span>Affiliate Disclosure</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Dedicated 5 Footer Pages Links Row */}
          <div className="border-t border-stone-800/80 pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400 font-medium">
            <button
              onClick={() => navigateToInfoPage('about', 'about-us')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <button
              onClick={() => navigateToInfoPage('contact', 'contact-us')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <button
              onClick={() => navigateToInfoPage('privacy', 'privacy-policy')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <button
              onClick={() => navigateToInfoPage('terms', 'terms-and-conditions')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <button
              onClick={() => navigateToInfoPage('affiliate-disclosure', 'affiliate-disclosure')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Affiliate Disclosure
            </button>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="border-t border-stone-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
            <p>© {new Date().getFullYear()} MineMart Fashion. &ldquo;Wear Your Identity.&rdquo; All rights reserved.</p>
            <p className="text-[11px] text-stone-500">
              Independent fashion discovery. Links to Amazon, Flipkart, Myntra &amp; AJIO.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <AppContent />
    </WishlistProvider>
  );
}
