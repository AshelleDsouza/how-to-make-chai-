import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COOKING_STEPS } from '../data/chaiData';
import { SteamAnimation } from './SteamAnimation';
import { MilkPourSimulation } from './MilkPourSimulation';
import { Flame, Sparkles } from 'lucide-react';

interface CookingStageVisualProps {
  stepIndex: number;
}

export const CookingStageVisual: React.FC<CookingStageVisualProps> = ({ stepIndex }) => {
  const step = COOKING_STEPS[stepIndex];

  return (
    <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] border border-white/15 bg-black/60 group">
      {/* Real High-Resolution Culinary Photograph */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={step.image}
            alt={step.headline}
            className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.04]"
          />

          {/* Cinematic Vignette Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Animated Realistic Milk-Pour Simulation for Step 04 (MILK) */}
      {stepIndex === 3 && <MilkPourSimulation />}

      {/* Realistic Rising Steam Layer */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none">
        <SteamAnimation
          intensity={stepIndex === 4 ? 'simmer' : stepIndex === 3 ? 'subtle' : 'medium'}
          color="rgba(255, 248, 235, 0.6)"
        />
      </div>

      {/* Bottom Floating Editorial Pill */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white/95 text-xs font-sans">
          {stepIndex === 3 ? (
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          ) : (
            <Flame className="w-3.5 h-3.5 text-[#B87543]" />
          )}
          <span className="tracking-[0.18em] uppercase text-[10px] sm:text-[11px] font-medium">
            {step.visualNote}
          </span>
        </div>

        <div className="hidden sm:block text-[11px] font-serif italic text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          Stage 0{stepIndex + 1}
        </div>
      </div>
    </div>
  );
};
