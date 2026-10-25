import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

interface WishlistContextType {
  likedIds: string[];
  wishlistIds: string[];
  toggleLike: (outfitId: string) => void;
  toggleWishlist: (outfitId: string) => void;
  isLiked: (outfitId: string) => boolean;
  isWishlisted: (outfitId: string) => boolean;
  isSaved: (outfitId: string) => boolean;
  removeOutfitFromAll: (outfitId: string) => void;
  clearAllSaved: () => void;
  uniqueSavedIds: string[];
  totalUniqueCount: number;
  likedCount: number;
  wishlistCount: number;
}

const LIKED_STORAGE_KEY = 'minemart_liked_outfits_v1';
const WISHLIST_STORAGE_KEY = 'minemart_wishlist_outfits_v1';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LIKED_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore JSON parse error
    }
    // Default starter likes so new visitors immediately see how the feature looks
    return ['s1-o1', 's2-o1'];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore JSON parse error
    }
    return ['s1-o1', 's3-o1'];
  });

  // Persist liked outfits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedIds));
    } catch (e) {
      console.warn('Failed to save liked outfits to localStorage', e);
    }
  }, [likedIds]);

  // Persist wishlist outfits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to save wishlist outfits to localStorage', e);
    }
  }, [wishlistIds]);

  const toggleLike = useCallback((outfitId: string) => {
    setLikedIds((prev) =>
      prev.includes(outfitId) ? prev.filter((id) => id !== outfitId) : [...prev, outfitId]
    );
  }, []);

  const toggleWishlist = useCallback((outfitId: string) => {
    setWishlistIds((prev) =>
      prev.includes(outfitId) ? prev.filter((id) => id !== outfitId) : [...prev, outfitId]
    );
  }, []);

  const isLiked = useCallback(
    (outfitId: string) => likedIds.includes(outfitId),
    [likedIds]
  );

  const isWishlisted = useCallback(
    (outfitId: string) => wishlistIds.includes(outfitId),
    [wishlistIds]
  );

  const isSaved = useCallback(
    (outfitId: string) => likedIds.includes(outfitId) || wishlistIds.includes(outfitId),
    [likedIds, wishlistIds]
  );

  const removeOutfitFromAll = useCallback((outfitId: string) => {
    setLikedIds((prev) => prev.filter((id) => id !== outfitId));
    setWishlistIds((prev) => prev.filter((id) => id !== outfitId));
  }, []);

  const clearAllSaved = useCallback(() => {
    setLikedIds([]);
    setWishlistIds([]);
  }, []);

  // Compute unique outfit IDs (an outfit liked AND wishlisted is counted once)
  const uniqueSavedIds = useMemo(() => {
    return Array.from(new Set([...likedIds, ...wishlistIds]));
  }, [likedIds, wishlistIds]);

  const totalUniqueCount = uniqueSavedIds.length;
  const likedCount = likedIds.length;
  const wishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        likedIds,
        wishlistIds,
        toggleLike,
        toggleWishlist,
        isLiked,
        isWishlisted,
        isSaved,
        removeOutfitFromAll,
        clearAllSaved,
        uniqueSavedIds,
        totalUniqueCount,
        likedCount,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
