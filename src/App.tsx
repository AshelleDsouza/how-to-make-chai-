import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IngredientsSection } from './components/IngredientsSection';
import { TransitionToCooking } from './components/TransitionToCooking';
import { CookingSequence } from './components/CookingSequence';
import { FinalScene } from './components/FinalScene';

export function App() {
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light');

  // Initialize Lenis smooth inertial scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Sync header theme with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const processEl = document.getElementById('process');
      const finishEl = document.getElementById('finish');

      if (!processEl || !finishEl) return;

      const processTop = processEl.offsetTop - 80;
      const finishTop = finishEl.offsetTop - 120;

      // Dark theme applies during the process / cooking section
      if (scrollY >= processTop && scrollY < finishTop) {
        setHeaderTheme('dark');
      } else {
        setHeaderTheme('light');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReset = () => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F0E7] text-[#302019] selection:bg-[#B87543]/20 selection:text-[#302019]">
      {/* Floating Header */}
      <Header currentTheme={headerTheme} />

      {/* Main Content */}
      <main className="w-full">
        {/* Hero: The Opening Cinematic Experience */}
        <Hero />

        {/* Ingredients: An Editorial Ingredient Reveal */}
        <IngredientsSection />

        {/* Transition from Ingredients to Cooking */}
        <TransitionToCooking />

        {/* The Cooking Sequence: Genuine Scroll-Linked Pinned Storytelling (6 Steps) */}
        <CookingSequence />

        {/* Final Scene: The Perfect Cup */}
        <FinalScene onReset={handleReset} />
      </main>
    </div>
  );
}

export default App;
