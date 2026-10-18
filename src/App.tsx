/**
 * ============================================================================
 * MINEMART — FASHION AFFILIATE DISCOVERY WEBSITE
 * ============================================================================
 * 
 * Exactly Three Main Pages:
 * 1. Home Page (src/pages/HomePage.tsx)
 * 2. Category / Collection Page (src/pages/CategoryPage.tsx)
 * 3. Outfit Details Page (src/pages/OutfitDetailsPage.tsx)
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { OutfitDetailsPage } from './pages/OutfitDetailsPage';
import { CATEGORIES } from './data/categories';
import { Compass, Sparkles, Home, Layers } from 'lucide-react';

type PageView = 'home' | 'category' | 'outfit-details';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('aesthetic-women');
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>('outfit-001');

  // Sync state with URL hash for browser Back/Forward navigation support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('category=')) {
        const catId = hash.replace('category=', '');
        setSelectedCategoryId(catId);
        setCurrentView('category');
      } else if (hash.startsWith('outfit=')) {
        const outId = hash.replace('outfit=', '');
        setSelectedOutfitId(outId);
        setCurrentView('outfit-details');
      } else {
        setCurrentView('home');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation Handlers that update hash and scroll smoothly to top
  const navigateToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentView('category');
    window.location.hash = `category=${categoryId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOutfit = (outfitId: string) => {
    setSelectedOutfitId(outfitId);
    setCurrentView('outfit-details');
    window.location.hash = `outfit=${outfitId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 pb-16 sm:pb-0 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Global Navigation Bar */}
      <Navbar
        onNavigateHome={navigateToHome}
        onSelectCategory={navigateToCategory}
        onSelectOutfit={navigateToOutfit}
        currentView={currentView}
        selectedCategoryId={selectedCategoryId}
      />

      {/* 2. Main Content Frame (Exactly Three Pages) */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onSelectCategory={navigateToCategory}
            onSelectOutfit={navigateToOutfit}
          />
        )}

        {currentView === 'category' && (
          <CategoryPage
            categoryId={selectedCategoryId}
            onNavigateHome={navigateToHome}
            onSelectCategory={navigateToCategory}
            onSelectOutfit={navigateToOutfit}
          />
        )}

        {currentView === 'outfit-details' && (
          <OutfitDetailsPage
            outfitId={selectedOutfitId}
            onNavigateHome={navigateToHome}
            onSelectCategory={navigateToCategory}
            onSelectOutfit={navigateToOutfit}
          />
        )}
      </div>

      {/* 3. Global Footer with Affiliate Disclosures */}
      <Footer
        onNavigateHome={navigateToHome}
        onSelectCategory={navigateToCategory}
      />

      {/* 4. Mobile Bottom Quick Bar for Convenient Thumb Navigation */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 bg-stone-900/98 backdrop-blur-md text-stone-300 border-t border-stone-800 z-40 px-3 py-1.5 flex items-center justify-around text-[10px]">
        <button
          onClick={navigateToHome}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            currentView === 'home' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateToCategory(selectedCategoryId || CATEGORIES[0].id)}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors cursor-pointer ${
            currentView === 'category' ? 'text-amber-400 font-bold' : 'text-stone-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Collections</span>
        </button>

        <button
          onClick={() => navigateToCategory('aesthetic-women')}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Trending</span>
        </button>
      </nav>
    </div>
  );
}
