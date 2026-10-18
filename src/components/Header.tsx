import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentTheme?: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ currentTheme = 'light' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'hero' | 'ingredients' | 'process' | 'finish'>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Determine active section
      const ingredientsEl = document.getElementById('ingredients');
      const processEl = document.getElementById('process');
      const finishEl = document.getElementById('finish');

      if (finishEl && scrollY >= finishEl.offsetTop - 300) {
        setActiveSection('finish');
      } else if (processEl && scrollY >= processEl.offsetTop - 300) {
        setActiveSection('process');
      } else if (ingredientsEl && scrollY >= ingredientsEl.offsetTop - 300) {
        setActiveSection('ingredients');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(el, { offset: -20, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDark = currentTheme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out px-6 md:px-12 py-5 md:py-6 ${
        isScrolled
          ? isDark
            ? 'bg-[#241711]/85 backdrop-blur-md border-b border-[#FAF6EE]/10'
            : 'bg-[#F5F0E7]/85 backdrop-blur-md border-b border-[#302019]/10 shadow-[0_4px_24px_rgba(48,32,25,0.03)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Typographic Wordmark */}
        <button
          onClick={scrollToTop}
          className="group text-left cursor-pointer focus:outline-none"
          aria-label="Back to top"
        >
          <span
            className={`font-serif text-2xl md:text-3xl font-light tracking-[0.2em] transition-colors duration-500 ${
              isDark ? 'text-[#FAF6EE]' : 'text-[#302019]'
            }`}
          >
            CHAI<span className="text-[#B87543]">.</span>
          </span>
        </button>

        {/* Right: Minimal Navigation */}
        <nav className="flex items-center space-x-6 md:space-x-10 text-xs md:text-sm font-sans tracking-[0.2em] uppercase">
          <button
            onClick={() => scrollTo('ingredients')}
            className={`group relative py-1 cursor-pointer transition-colors duration-500 focus:outline-none ${
              isDark
                ? activeSection === 'ingredients'
                  ? 'text-[#FAF6EE] font-medium'
                  : 'text-[#FAF6EE]/65 hover:text-[#FAF6EE]'
                : activeSection === 'ingredients'
                ? 'text-[#302019] font-medium'
                : 'text-[#302019]/70 hover:text-[#302019]'
            }`}
          >
            <span>THE INGREDIENTS</span>
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B87543] transition-all duration-300 ${
                activeSection === 'ingredients' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          <button
            onClick={() => scrollTo('process')}
            className={`group relative py-1 cursor-pointer transition-colors duration-500 focus:outline-none ${
              isDark
                ? activeSection === 'process'
                  ? 'text-[#FAF6EE] font-medium'
                  : 'text-[#FAF6EE]/65 hover:text-[#FAF6EE]'
                : activeSection === 'process'
                ? 'text-[#302019] font-medium'
                : 'text-[#302019]/70 hover:text-[#302019]'
            }`}
          >
            <span>THE PROCESS</span>
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B87543] transition-all duration-300 ${
                activeSection === 'process' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          <button
            onClick={() => scrollTo('finish')}
            className={`group relative py-1 cursor-pointer transition-colors duration-500 focus:outline-none ${
              isDark
                ? activeSection === 'finish'
                  ? 'text-[#FAF6EE] font-medium'
                  : 'text-[#FAF6EE]/65 hover:text-[#FAF6EE]'
                : activeSection === 'finish'
                ? 'text-[#302019] font-medium'
                : 'text-[#302019]/70 hover:text-[#302019]'
            }`}
          >
            <span>THE FINISH</span>
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B87543] transition-all duration-300 ${
                activeSection === 'finish' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>
        </nav>
      </div>
    </header>
  );
};
