import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SteamAnimation } from './SteamAnimation';
import { CHAI_SPECS, INGREDIENTS } from '../data/chaiData';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSceneProps {
  onReset: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ onReset }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const cupY = useTransform(scrollYProgress, [0, 1], [40, -25]);
  const cupScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.02]);
  const glowY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  const handleResetClick = () => {
    // Subtle golden warm spark
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#B87543', '#E6D5BD', '#F5F0E7', '#302019'],
    });

    onReset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="finish"
      ref={sectionRef}
      className="relative w-full min-h-[100svh] py-28 md:py-36 px-6 md:px-16 bg-[#F5F0E7] text-[#302019] flex flex-col justify-between overflow-hidden"
    >
      {/* Warm ivory ambient light backdrop with parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-50 filter blur-[140px] bg-[#E6D5BD]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10 my-auto">
        {/* Left: Final Headline, Aromas & Recipe Recap */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#B87543]" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-sans font-medium text-[#B87543]">
              THE PERFECT SERVE
            </span>
          </motion.div>

          {/* Heading Line 1 */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#302019]/80"
            >
              And finally,
            </motion.h2>
          </div>

          {/* Heading Line 2 */}
          <div className="overflow-hidden py-1 -mt-2">
            <motion.div
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal text-[#302019] leading-[0.9]"
            >
              Chai<span className="text-[#B87543]">.</span>
            </motion.div>
          </div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl font-serif italic text-[#302019]/80 leading-relaxed max-w-md"
          >
            “Freshly brewed. Warmly spiced. Ready to enjoy.”
          </motion.p>

          {/* Metadata badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-xs font-sans text-[#302019]/75"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-[#E6D5BD]/60 border border-[#302019]/10">
              <span className="font-semibold text-[#302019]">PREP:</span> {CHAI_SPECS.prepTime}
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#E6D5BD]/60 border border-[#302019]/10">
              <span className="font-semibold text-[#302019]">YIELD:</span> {CHAI_SPECS.servings}
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#E6D5BD]/60 border border-[#302019]/10">
              <span className="font-semibold text-[#302019]">STYLE:</span> Kadak Cutting Chai
            </div>
          </motion.div>

          {/* Minimal 6 Ingredients Checklist with Staggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 pt-6 border-t border-[#302019]/15"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#302019]/60 font-semibold mb-3 block">
              INFUSED BOTANICALS & ELEMENTS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-sans">
              {INGREDIENTS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.75 + idx * 0.08 }}
                  className="flex items-center space-x-1.5 text-[#302019]/80"
                >
                  <Check className="w-3.5 h-3.5 text-[#B87543] shrink-0" />
                  <span>{item.name.replace('Pure ', '').replace('Fresh ', '')}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Button: MAKE ANOTHER CUP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-10"
          >
            <button
              onClick={handleResetClick}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#302019] text-[#FAF6EE] text-xs font-sans tracking-[0.25em] uppercase hover:bg-[#B87543] transition-all duration-300 shadow-[0_8px_30px_rgba(48,32,25,0.2)] focus:outline-none cursor-pointer active:scale-95 group"
            >
              <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180 text-[#B87543] group-hover:text-white" />
              <span className="font-medium">MAKE ANOTHER CUP</span>
            </button>
          </motion.div>
        </div>

        {/* Right: The Final Perfect Chai Cup Visual with Soft Light, Parallax & Steam */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <motion.div
            style={{ y: cupY, scale: cupScale }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(48,32,25,0.22)] border border-[#302019]/10 group"
          >
            <img
              src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85"
              alt="Steaming hot Indian milk chai served in ceramic cup with frothy crema"
              className="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.02] transform transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Subtle natural vignetting & warm rim light overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#302019]/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Delicate Rising Steam Layer */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-64 pointer-events-none">
              <SteamAnimation intensity="medium" color="rgba(255, 250, 240, 0.65)" />
            </div>

            {/* Floating Editorial Badge on Image */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none text-white/90">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                A Sip of Home
              </span>
              <span className="text-[11px] font-serif italic text-white/80">
                Piping Hot & Golden
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
