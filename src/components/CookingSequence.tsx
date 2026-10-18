import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { COOKING_STEPS } from '../data/chaiData';
import { CookingStageVisual } from './CookingStageVisual';
import { ArrowLeft, ArrowRight, Clock, Flame, ChevronDown } from 'lucide-react';

interface CookingSequenceProps {
  onStepChange?: (stepIndex: number) => void;
}

export const CookingSequence: React.FC<CookingSequenceProps> = ({ onStepChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isManualNavigating, setIsManualNavigating] = useState(false);

  const totalSteps = COOKING_STEPS.length;
  const currentStep = COOKING_STEPS[currentStepIndex];

  // Genuine Scroll-Linked Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Continuous progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['16.6%', '100%']);

  // Sync scroll progress with active step
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isManualNavigating) return;
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const stepIdx = Math.floor(clamped * totalSteps);
    if (stepIdx !== currentStepIndex && stepIdx >= 0 && stepIdx < totalSteps) {
      setCurrentStepIndex(stepIdx);
      onStepChange?.(stepIdx);
    }
  });

  // Smoothly scroll to a specific step in the pinned sequence
  const scrollToStep = (index: number) => {
    if (!containerRef.current || index < 0 || index >= totalSteps) return;

    setIsManualNavigating(true);
    setCurrentStepIndex(index);
    onStepChange?.(index);

    const containerTop = containerRef.current.offsetTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    // Target position positioned nicely within the step's scroll range
    const targetRatio = (index + 0.35) / totalSteps;
    const targetScrollY = containerTop + targetRatio * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });

    const timer = setTimeout(() => {
      setIsManualNavigating(false);
    }, 750);

    return () => clearTimeout(timer);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentStepIndex < totalSteps - 1) {
          scrollToStep(currentStepIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentStepIndex > 0) {
          scrollToStep(currentStepIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  return (
    <div
      id="process"
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#1C120D] text-[#FAF6EE]"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 md:py-10 px-6 md:px-14 overflow-hidden z-20">
        {/* Dynamic Background Ambient Tone Color Wash per step */}
        <div
          className="absolute inset-0 transition-colors duration-1000 -z-10"
          style={{ backgroundColor: currentStep.ambientTone }}
        />

        {/* Ambient Radial Vignette */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] -z-10"
          aria-hidden="true"
        />

        {/* TOP BAR: Stage Switcher Tabs & Stage Name */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-30 pt-1 md:pt-2 mb-2 sm:mb-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B87543] animate-pulse" />
            <span className="text-[11px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#FAF6EE]/90 font-medium">
              STAGE {currentStepIndex + 1} OF {totalSteps} — {currentStep.stage}
            </span>
          </div>

          {/* Stage pills for direct navigation */}
          <div className="flex items-center space-x-1 sm:space-x-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
            {COOKING_STEPS.map((step, idx) => (
              <button
                key={step.stage}
                onClick={() => scrollToStep(idx)}
                className={`px-2.5 sm:px-3.5 py-1 text-[10px] tracking-[0.2em] font-sans rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  currentStepIndex === idx
                    ? 'bg-[#B87543] text-white font-semibold shadow-[0_2px_12px_rgba(184,117,67,0.5)] scale-105'
                    : 'text-[#FAF6EE]/60 hover:text-[#FAF6EE] hover:bg-white/10'
                }`}
                aria-label={`Jump to stage ${step.stage}`}
              >
                {step.stage}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center text-xs font-mono text-[#FAF6EE]/75 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-[#B87543]" />
            <span>{currentStep.duration}</span>
          </div>
        </div>

        {/* MAIN STAGE: Left Narrative / Right Visual */}
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 my-auto z-20 py-2">
          {/* LEFT: Step Number, Staggered Headline, Instructions */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            {/* Oversized Step Number with Elastic Slide Transition */}
            <div className="flex items-baseline gap-3 mb-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStep.number}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-[#B87543] tracking-tighter"
                >
                  {currentStep.number}
                </motion.span>
              </AnimatePresence>
              <span className="font-sans text-xs md:text-sm tracking-[0.25em] text-[#FAF6EE]/40 uppercase">
                / 0{totalSteps}
              </span>
            </div>

            {/* Vertical Animated Headline Transition */}
            <div className="relative min-h-[4rem] md:min-h-[5.5rem] overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentStep.stage}
                  initial={{ y: 45, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#FAF6EE]"
                >
                  {currentStep.headline}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Instruction Body with Staggered Fade */}
            <div className="relative min-h-[6rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.instruction}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-sans text-base sm:text-lg text-[#FAF6EE]/95 leading-relaxed font-light">
                    {currentStep.instruction}
                  </p>
                  <p className="mt-3 font-serif italic text-sm text-[#FAF6EE]/70 leading-relaxed">
                    {currentStep.subdetail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Note Indicator */}
            <div className="mt-5 flex items-center gap-2 text-xs font-sans text-[#B87543]">
              <Flame className="w-4 h-4 text-[#B87543]" />
              <span className="tracking-[0.2em] uppercase text-[11px] font-medium">
                {currentStep.visualNote}
              </span>
            </div>
          </div>

          {/* RIGHT: Authentic Physical Cooking Stage Visual */}
          <div className="w-full lg:w-7/12 flex items-center justify-center">
            <CookingStageVisual stepIndex={currentStepIndex} />
          </div>
        </div>

        {/* BOTTOM CONTROLS & CONTINUOUS SCROLL-LINKED PROGRESS BAR */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-3.5 z-30 pt-2">
          {/* Continuous Scroll-Linked Progress Indicator Line */}
          <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B87543] to-[#E6D5BD]"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Previous Step Button */}
            <button
              onClick={() => scrollToStep(currentStepIndex - 1)}
              disabled={currentStepIndex === 0}
              className={`flex items-center space-x-2 px-5 py-2 rounded-full border text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                currentStepIndex === 0
                  ? 'border-white/10 text-white/20 cursor-not-allowed'
                  : 'border-white/25 text-[#FAF6EE]/80 hover:text-[#FAF6EE] hover:border-[#B87543] hover:bg-white/10 active:scale-95'
              }`}
              aria-label="Previous step"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>

            {/* Scroll Cue Hint */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-sans text-white/55 tracking-[0.2em] uppercase">
              <ChevronDown className="w-3.5 h-3.5 text-[#B87543] animate-bounce" />
              <span>Scroll down to advance steps • Or use ← →</span>
            </div>

            {/* Next Step Button / The Finish */}
            <button
              onClick={() => {
                if (currentStepIndex === totalSteps - 1) {
                  const el = document.getElementById('finish');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  scrollToStep(currentStepIndex + 1);
                }
              }}
              className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#B87543] text-white text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#B87543]/85 transition-all duration-300 shadow-[0_4px_16px_rgba(184,117,67,0.35)] focus:outline-none cursor-pointer active:scale-95 font-medium"
              aria-label={currentStepIndex === totalSteps - 1 ? 'Go to final cup' : 'Next step'}
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'THE FINISH →' : 'NEXT'}</span>
              {currentStepIndex !== totalSteps - 1 && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
