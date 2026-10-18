import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Droplets, Sparkles } from 'lucide-react';

interface MilkPourSimulationProps {
  className?: string;
}

export const MilkPourSimulation: React.FC<MilkPourSimulationProps> = ({ className = '' }) => {
  const [pourKey, setPourKey] = useState(0);
  const [isPouring, setIsPouring] = useState(true);

  const handleReplayPour = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPouring(false);
    setTimeout(() => {
      setPourKey((k) => k + 1);
      setIsPouring(true);
    }, 150);
  };

  return (
    <div
      key={pourKey}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* SVG Liquid Filter Definition for Realistic Viscous Swirls */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="milk-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.08"
              numOctaves="3"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.04 0.08; 0.035 0.09; 0.04 0.08"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Milk stream linear gradient */}
          <linearGradient id="milk-stream-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFF9F0" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#F5ECE0" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#EADBCC" stopOpacity="0.85" />
          </linearGradient>

          {/* Specular sheen gradient */}
          <linearGradient id="milk-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic Animated Marbling Billows (Milk spreading through dark spiced tea) */}
      <AnimatePresence>
        {isPouring && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Billowing Cream Cloud */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.8, 1.25, 1.35], opacity: [0.3, 0.7, 0.55] }}
              transition={{ duration: 7, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatType: 'reverse' }}
              className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-64 h-56 rounded-full bg-gradient-radial from-[#FFFDF9]/65 via-[#E8D4BE]/35 to-transparent filter blur-md mix-blend-screen pointer-events-none animate-marbling"
            />

            {/* Secondary Swirling Tendril (Organic Marble Flow) */}
            <motion.div
              initial={{ scale: 0.5, rotate: 0, opacity: 0 }}
              animate={{ scale: [0.7, 1.4, 1.5], rotate: [0, 45, 90], opacity: [0.2, 0.65, 0.4] }}
              transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-72 h-64 rounded-full bg-gradient-radial from-[#FAF2E6]/50 via-[#C99E75]/25 to-transparent filter blur-lg mix-blend-screen pointer-events-none"
            />

            {/* Golden Amber to Creamy Caramel Thermal Dispersion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.45, 0.3] }}
              transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
              className="absolute top-[44%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-80 h-72 rounded-full bg-[#E3C6A4]/20 filter blur-xl mix-blend-overlay"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Realistic Fluid Stream Vector (Originating from Jug Spout to Saucepan Liquid) */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        {/* Falling Milk Stream Outer Glow */}
        <motion.path
          d="M 330,135 Q 365,220 388,340 Q 392,355 394,360"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
          filter="url(#milk-distortion)"
        />

        {/* Falling Milk Stream Main Body */}
        <motion.path
          d="M 332,135 Q 366,220 388,340 Q 391,355 393,360"
          stroke="url(#milk-stream-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="20 6"
          fill="none"
          className="animate-milk-flow"
        />

        {/* Specular Liquid Highlight Streak */}
        <motion.path
          d="M 334,138 Q 367,222 387,338 Q 390,352 392,358"
          stroke="url(#milk-sheen)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </svg>

      {/* Dynamic Concentric Shockwave Ripples at Impact Zone */}
      <div className="absolute top-[58%] left-[49%] -translate-x-1/2 -translate-y-1/2 w-32 h-16 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-white/80 animate-pour-ripple-1 filter blur-[0.5px]" />
        <div className="absolute inset-0 rounded-full border border-[#FFF8E7]/70 animate-pour-ripple-2 filter blur-[0.5px]" />
        <div className="absolute inset-0 rounded-full border border-[#F0DFCD]/60 animate-pour-ripple-3 filter blur-[0.5px]" />

        {/* Impact Froth Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 rounded-full bg-white/95 shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse" />
      </div>

      {/* Floating Micro-foam and Droplet Beads */}
      <div className="absolute top-[57%] left-[47%] w-1.5 h-1.5 rounded-full bg-white/90 shadow-sm animate-simmer" />
      <div className="absolute top-[59%] left-[51%] w-2 h-2 rounded-full bg-[#FAF3E8]/85 shadow-sm animate-simmer" style={{ animationDelay: '0.6s' }} />
      <div className="absolute top-[56%] left-[50%] w-1 h-1 rounded-full bg-white/80 animate-simmer" style={{ animationDelay: '1.1s' }} />

      {/* Thermal Vapor Mist rising around cold-meets-hot point */}
      <motion.div
        animate={{ y: [-5, -25], opacity: [0.2, 0.5, 0] }}
        transition={{ duration: 2.8, ease: 'easeOut', repeat: Infinity }}
        className="absolute top-[52%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-white/30 rounded-full filter blur-md pointer-events-none"
      />

      {/* Interactive Editorial Control Overlay (Pointer Events enabled for this button) */}
      <div className="absolute top-4 right-4 pointer-events-auto z-20">
        <button
          onClick={handleReplayPour}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-[#FAF6EE] text-[10px] font-sans tracking-[0.18em] uppercase transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95 group"
          title="Watch the milk pour animation again"
        >
          <RotateCw className="w-3 h-3 text-[#B87543] group-hover:rotate-180 transition-transform duration-500" />
          <span>POUR AGAIN</span>
        </button>
      </div>

      {/* Live Pour Status Tag */}
      <div className="absolute top-4 left-4 pointer-events-none z-20 flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B87543]/85 backdrop-blur-md text-white text-[10px] font-sans tracking-[0.2em] uppercase font-semibold shadow-md">
          <Droplets className="w-3 h-3 text-white animate-bounce" />
          <span>LIVE INFUSION</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-serif italic text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          <Sparkles className="w-2.5 h-2.5 text-amber-300" />
          Marbling Active
        </span>
      </div>
    </div>
  );
};
