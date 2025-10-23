"use client";
import { Home, HandHeart, User2, Podcast, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DockNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = [
    { icon: User2, label: 'Sobre Mí', id: 'about-section' },
    { icon: HandHeart, label: 'Servicios', id: 'services-section' },
    { icon: Home, label: 'Inicio', id: 'hero-section', isCenter: true },
    { icon: Podcast, label: 'Contenido', id: 'content-section' },
    { icon: GraduationCap, label: 'Formación', id: 'courses-section' },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      setHoveredIndex(null);
    }, 500);
  };
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hero = document.getElementById('hero');

    if (!hero) {
      // Fallback: show after a small scroll if there's no #hero element
      const onScroll = () => setShowDock(window.scrollY > 100);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowDock(!entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!showDock) return null;
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative">
        {/* Dock Container */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;
            const isCenter = item.isCenter;

            // Calculate scale based on distance from hovered item
            let scale = 1;
            if (hoveredIndex !== null) {
              const distance = Math.abs(hoveredIndex - index);
              if (distance === 0) scale = 1.4;
              else if (distance === 1) scale = 1.2;
              else if (distance === 2) scale = 1.1;
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative group transition-all duration-300 ease-out
                  ${isCenter ? 'mx-1' : ''}
                `}
                style={{
                  transform: `scale(${scale}) translateY(${isHovered ? '-8px' : '0px'})`,
                }}
                aria-label={item.label}
              >
                {/* Icon Container */}
                <div
                  className={`
                    flex items-center justify-center rounded-xl
                    transition-all duration-300
                    ${isCenter
                      ? 'w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-800/50'
                      : 'w-12 h-12'
                    }
                  `}
                >
                  <Icon
                    className={`
                      ${isCenter ? 'w-7 h-7 text-white' : 'w-6 h-6 text-amber-800'} 
                      transition-transform duration-300
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Tooltip */}
                <div
                  className={`
                    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    px-3 py-1.5 rounded-lg
                    bg-amber-900/95 backdrop-blur-sm
                    text-white text-xs font-medium whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    transition-all duration-200
                    pointer-events-none
                    shadow-lg
                  `}
                >
                  {item.label}
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                    <div className="w-2 h-2 rotate-45 bg-amber-900/95"></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reflection Effect */}
        <div
          className="absolute top-full left-0 right-0 h-8 opacity-20 blur-sm"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        ></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        /* Smooth hover transitions */
        button {
          will-change: transform;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          nav {
            bottom: 1rem;
          }
        }

        /* Prevent double-tap zoom on mobile */
        button {
          touch-action: manipulation;
        }

        /* Add subtle animation on mount */
        nav > div {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}