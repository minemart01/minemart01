import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'tagline' | 'reveal' | 'exit'>('enter');

  useEffect(() => {
    // Phase timing:
    // 0 - 1000ms: Brand Name fade and slide in
    // 1000 - 2400ms: Tagline "Wear Your Identity" glides in
    // 2400 - 3400ms: Subtle glow reveal & completion
    // 3400ms+: Exit
    const pTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(pTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 34); // ~3.4 seconds total

    const t1 = setTimeout(() => setPhase('tagline'), 900);
    const t2 = setTimeout(() => setPhase('reveal'), 2200);
    const t3 = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 450);
    }, 3400);

    return () => {
      clearInterval(pTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('exit');
    setTimeout(onComplete, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-950 text-white overflow-hidden transition-all duration-500 ${
        phase === 'exit' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Editorial Fashion Background with Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80"
          alt="Fashion editorial aesthetic"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-125 scale-105 transition-transform duration-[4000ms] ease-out transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-stone-950/40 to-stone-950/95" />
      </div>

      {/* Subtle Geometric Framing */}
      <div className="absolute inset-6 sm:inset-10 border border-white/10 pointer-events-none rounded-xl" />

      {/* Skip Button */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs text-stone-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Animated Branding Content */}
      <div className="relative z-10 max-w-lg mx-auto px-6 text-center space-y-6">
        {/* Monogram Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900/90 border border-amber-400/40 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-75 duration-700">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 animate-pulse" />
        </div>

        {/* Brand Name */}
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-amber-400/90 block">
            Curated Fashion & Outfits
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            MineMart <span className="font-light italic text-amber-300">Fashion</span>
          </h1>
        </div>

        {/* Tagline: "Wear Your Identity." */}
        <div
          className={`transition-all duration-700 transform ${
            phase !== 'enter'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-amber-400/80" />
            <p className="font-display italic text-lg sm:text-2xl text-stone-200 tracking-wide font-normal">
              &ldquo;Wear Your Identity.&rdquo;
            </p>
            <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 font-light tracking-wider uppercase">
            Head-to-Toe Lookbooks & Verified Retailer Shopping
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className="pt-4 max-w-xs mx-auto space-y-2">
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-widest">
            <span>Entering Store</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
