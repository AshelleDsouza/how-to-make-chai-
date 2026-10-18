import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { INGREDIENTS } from '../data/chaiData';
import type { Ingredient } from '../types';
import { X, Sparkles } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered Parallax for grid columns
  const col1Y = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const bgGlowY = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  const headingWords = ['Everything', 'starts', 'somewhere.'];

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 px-6 md:px-14 bg-[#F5F0E7] text-[#302019] overflow-hidden"
    >
      {/* Subtle Layered Ambient Aura */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute top-1/3 left-10 w-[550px] h-[550px] rounded-full pointer-events-none opacity-30 filter blur-[140px] bg-[#E6D5BD]"
        aria-hidden="true"
      />

      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-3"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase font-sans font-medium text-[#B87543]">
            SECTION 01 / THE FOUNDATION
          </span>
        </motion.div>

        {/* Staggered Word Reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-5 py-1">
          {headingWords.map((word, idx) => (
            <div key={word} className="overflow-hidden py-1">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.95,
                  delay: idx * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#302019]"
              >
                {word}
              </motion.h2>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-4 text-base sm:text-lg md:text-xl font-serif italic text-[#302019]/75 max-w-xl mx-auto"
        >
          Six simple ingredients. One comforting cup.
        </motion.p>
      </div>

      {/* Pristine, Uniform Editorial Grid with Layered Parallax Columns */}
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {INGREDIENTS.map((item, index) => {
            const isSelected = selectedIngredient?.id === item.id;
            const colIndex = index % 3;
            const columnY = colIndex === 0 ? col1Y : colIndex === 1 ? col2Y : col3Y;

            return (
              <motion.div
                key={item.id}
                style={{ y: columnY }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full flex"
              >
                {/* Uniform Ingredient Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIngredient(isSelected ? null : item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedIngredient(isSelected ? null : item);
                    }
                  }}
                  className={`w-full cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 p-5 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#B87543] ring-2 ring-[#B87543]/20 shadow-[0_20px_45px_-10px_rgba(48,32,25,0.14)] bg-[#FAF6EE] scale-[1.02]'
                      : 'bg-[#FAF6EE]/80 border-[#302019]/10 hover:border-[#B87543]/50 hover:bg-[#FAF6EE] hover:shadow-[0_16px_36px_-10px_rgba(48,32,25,0.1)]'
                  }`}
                  aria-label={`Ingredient details for ${item.name}`}
                  aria-expanded={isSelected}
                >
                  {/* Top Portion: Image & Header */}
                  <div>
                    {/* Uniform Image Container (Aspect 4/3, Crisp Frame) */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#E6D5BD]/40 shadow-inner group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#302019]/40 via-transparent to-transparent opacity-50"
                        aria-hidden="true"
                      />

                      {/* Uniform Measurement Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF6EE]/95 backdrop-blur-md text-[10px] tracking-[0.2em] font-sans font-medium uppercase text-[#302019] border border-[#302019]/10 shadow-sm">
                        {item.quantity} {item.unit}
                      </div>

                      {/* Hindi Name Badge */}
                      {item.hindiName && (
                        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-serif italic text-white/95 bg-black/50 backdrop-blur-sm border border-white/10">
                          {item.hindiName}
                        </div>
                      )}
                    </div>

                    {/* Meta Row: Role & Number */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#B87543] font-semibold">
                        {item.role}
                      </span>
                      <span className="text-xs text-[#302019]/40 font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-normal text-[#302019] tracking-tight">
                      {item.name}
                    </h3>

                    {/* Consistent Description */}
                    <p className="mt-2 text-xs md:text-sm font-sans text-[#302019]/75 leading-relaxed min-h-[3rem]">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Portion: Aromatics & Interaction Indicator */}
                  <div className="mt-5 pt-3 border-t border-[#302019]/10 flex items-center justify-between text-[11px]">
                    <span className="font-serif italic text-[#302019]/60 truncate max-w-[180px]">
                      {item.aromaNote}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-semibold text-[#B87543] shrink-0">
                      {isSelected ? 'Active' : 'Tap to focus'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Focus Modal / Drawer if user taps an ingredient to pin details */}
      <AnimatePresence>
        {selectedIngredient && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:bottom-10 max-w-md z-40 bg-[#FAF6EE] text-[#302019] p-6 rounded-2xl shadow-[0_20px_50px_rgba(48,32,25,0.25)] border border-[#302019]/15 backdrop-blur-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87543]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#B87543] font-semibold">
                    {selectedIngredient.role}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-medium text-[#302019]">
                  {selectedIngredient.name}{' '}
                  {selectedIngredient.hindiName && (
                    <span className="text-base italic font-light text-[#302019]/60">
                      ({selectedIngredient.hindiName})
                    </span>
                  )}
                </h4>
              </div>
              <button
                onClick={() => setSelectedIngredient(null)}
                className="p-1 rounded-full hover:bg-[#E6D5BD]/50 text-[#302019]/70 hover:text-[#302019] transition-colors focus:outline-none cursor-pointer"
                aria-label="Close ingredient modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3 py-2 px-3 bg-[#E6D5BD]/40 rounded-lg flex items-center justify-between text-xs font-sans">
              <span className="text-[#302019]/70">Required for 2 Cups:</span>
              <span className="font-semibold text-[#302019] tracking-wide">
                {selectedIngredient.quantity} {selectedIngredient.unit}
              </span>
            </div>

            <p className="text-xs md:text-sm font-sans text-[#302019]/80 leading-relaxed">
              {selectedIngredient.description}
            </p>

            <div className="mt-3 text-[11px] font-serif italic text-[#B87543]">
              Aromatics: {selectedIngredient.aromaNote}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
