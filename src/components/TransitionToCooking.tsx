import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TransitionToCooking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.45, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const words = ['Now,', 'we', 'make', 'it.'];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-gradient-to-b from-[#F5F0E7] via-[#241711] to-[#1C120D] text-[#FAF6EE] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Decorative Parallax Ambient Flame Glow */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute w-[650px] h-[350px] bg-[#B87543]/30 rounded-full filter blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div style={{ y: textY }} className="max-w-4xl mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <span className="text-[11px] tracking-[0.35em] uppercase font-sans text-[#B87543] font-semibold">
            THE RITUAL BEGINS
          </span>
        </motion.div>

        {/* Staggered Word Mask Reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 py-2">
          {words.map((word, idx) => (
            <div key={word} className="overflow-hidden py-1">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.95,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block font-serif text-5xl sm:text-6xl md:text-8xl font-light tracking-tight ${
                  word === 'it.' ? 'text-[#FAF6EE]' : 'text-[#FAF6EE]/90'
                }`}
              >
                {word === 'it.' ? (
                  <>
                    it<span className="text-[#B87543]">.</span>
                  </>
                ) : (
                  word
                )}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-5 text-base sm:text-lg md:text-xl font-serif italic text-[#FAF6EE]/75 max-w-lg mx-auto leading-relaxed"
        >
          The saucepan warms. The water takes to the flame.
        </motion.p>
      </motion.div>
    </div>
  );
};
