import React from 'react';
import { Outfit } from '../../types';
import { OutfitCard } from './OutfitCard';
import { Sparkles, Compass } from 'lucide-react';

interface OutfitGridProps {
  outfits: Outfit[];
  onSelectOutfit: (outfitId: string) => void;
  onExploreOther?: () => void;
}

export const OutfitGrid: React.FC<OutfitGridProps> = ({
  outfits,
  onSelectOutfit,
  onExploreOther,
}) => {
  if (outfits.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/80 max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-stone-900">
            No Outfits in this Collection Yet
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            New outfit inspiration is actively being added to this collection. Check back shortly or explore other trending styles.
          </p>
        </div>
        {onExploreOther && (
          <button
            onClick={onExploreOther}
            className="px-5 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Explore Other Collections
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
      {outfits.map((outfit) => (
        <OutfitCard
          key={outfit.id}
          outfit={outfit}
          onClick={() => onSelectOutfit(outfit.id)}
        />
      ))}
    </div>
  );
};
