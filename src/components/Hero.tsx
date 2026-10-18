import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SteamAnimation } from './SteamAnimation';
import { CHAI_SPECS } from '../data/chaiData';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Layered Parallax Scroll Progress
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  const scrollToIngredients = () => {
    const el = document.getElementById('ingredients');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quotePhrases = [
    '“A little water.',
    'A little warmth.',
    'A perfect cup.”',
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-between px-6 md:px-16 pt-28 md:pt-36 pb-10 bg-[#F5F0E7] text-[#302019] overflow-hidden"
    >
      {/* Layered Subtle Warm Atmospheric Parallax Glow */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute top-1/4 right-1/4 w-[520px] h-[520px] rounded-full pointer-events-none opacity-45 filter blur-[130px] bg-[#E6D5BD]"
        aria-hidden="true"
      />

      {/* Main Hero Composition */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-10"
      >
        {/* Left: Editorial Headline & Staggered Metadata */}
        <motion.div style={{ y: textY }} className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* Metadata badges fading in sequentially */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="px-2.5 py-1 text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-[#302019]/80 bg-[#E6D5BD]/60 rounded-full border border-[#302019]/10 shadow-xs"
            >
              {CHAI_SPECS.category}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xs text-[#B87543] font-serif"
            >
              •
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#302019]/75"
            >
              {CHAI_SPECS.prepTime}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xs text-[#B87543] font-serif"
            >
              •
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#302019]/75"
            >
              {CHAI_SPECS.servings}
            </motion.span>
          </div>

          {/* Vertical clipping-mask headline reveal */}
          <div className="overflow-hidden py-1">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#302019]/85 leading-[1.05]"
            >
              First,
            </motion.h1>
          </div>

          <div className="overflow-hidden py-1 -mt-2 md:-mt-3">
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.25, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-normal text-[#302019] leading-[0.9] tracking-tight"
            >
              Chai<span className="text-[#B87543]">.</span>
            </motion.div>
          </div>

          {/* Staggered Supporting Text Phrases */}
          <div className="mt-6 md:mt-8 flex flex-wrap gap-x-2 text-base md:text-xl font-serif italic text-[#302019]/80 max-w-md leading-relaxed">
            {quotePhrases.map((phrase, idx) => (
              <div key={phrase} className="overflow-hidden py-0.5">
                <motion.span
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.95 + idx * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {phrase}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-6 text-xs font-sans tracking-[0.2em] text-[#302019]/55 uppercase font-medium"
          >
            A traditional Indian milk tea ritual
          </motion.div>
        </motion.div>

        {/* Right: Parallax-Layered Realistic Indian Milk Chai Glass with Steam */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0, x: 70, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] sm:w-[360px] md:w-[440px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(48,32,25,0.18)] border border-[#302019]/10 group"
          >
            {/* The Image */}
            <img
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85"
              alt="Authentic freshly brewed Indian cutting chai in glass cup"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.02] transform transition-transform duration-1000 group-hover:scale-105"
              loading="eager"
            />

            {/* Subtle natural vignetting & warm rim light overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#302019]/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#FAF6EE]/15 pointer-events-none"
              aria-hidden="true"
            />

            {/* Rising Steam Animation above the cup rim */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none">
              <SteamAnimation intensity="medium" color="rgba(255, 250, 240, 0.65)" />
            </div>

            {/* Floating Editorial Badge on Image */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none text-white/90">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                Freshly Brewed
              </span>
              <span className="text-[11px] font-serif italic text-white/80">
                Kadak & Velvety
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="w-full flex flex-col items-center justify-center pt-8 z-10"
      >
        <button
          onClick={scrollToIngredients}
          className="group flex flex-col items-center text-[#302019]/65 hover:text-[#302019] transition-colors focus:outline-none cursor-pointer"
          aria-label="Scroll to Ingredients"
        >
          <span className="text-[10px] md:text-[11px] font-sans tracking-[0.28em] uppercase mb-2 font-medium">
            SCROLL TO BEGIN
          </span>
          <span className="font-serif text-lg animate-scroll-bounce text-[#B87543]">
            ↓
          </span>
        </button>
      </motion.div>
    </section>
  );
};
