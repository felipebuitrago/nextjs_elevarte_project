"use client";
import { useEffect, useRef } from 'react';
import { Heart, BookOpen, Podcast, GraduationCap } from 'lucide-react';

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Card animation
            if (cardRef.current) {
              cardRef.current.style.opacity = '0';
              cardRef.current.style.transform = 'translateY(60px)';
              
              setTimeout(() => {
                cardRef.current!.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                cardRef.current!.style.opacity = '1';
                cardRef.current!.style.transform = 'translateY(0)';
              }, 100);
            }

            // Image animation
            if (imageRef.current) {
              imageRef.current.style.opacity = '0';
              imageRef.current.style.transform = 'scale(0.8) rotate(-10deg)';
              
              setTimeout(() => {
                imageRef.current!.style.transition = 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
                imageRef.current!.style.opacity = '1';
                imageRef.current!.style.transform = 'scale(1) rotate(0deg)';
              }, 300);
            }

            // Content stagger
            if (contentRef.current) {
              const elements = contentRef.current.children;
              Array.from(elements).forEach((el: Element, i: number) => {
                if (!(el instanceof HTMLElement)) return;
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                  el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                }, 500 + (i * 150));
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id='about-section'
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden"
    >

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
          ¿Quién Soy?
        </h2>
      </div>

      {/* Main Card */}
      <div className="max-w-6xl mx-auto">
        <div 
          ref={cardRef}
          className="relative backdrop-blur-xl bg-white/40 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50"
          style={{
            boxShadow: '0 25px 50px -12px rgba(139, 69, 19, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.1)'
          }}
        >
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Image Container */}
            <div ref={imageRef} className="relative flex-shrink-0">
              <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#D2B48C]/30 to-white/20 blur-xl animate-pulse" />
                
                {/* Main image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-2xl bg-gradient-to-br from-[#D2B48C] to-[#DEB887]">
                  <img 
                    src="/photo.jpg" 
                    alt="Camila Rodríguez - Reiki Master" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative rotating ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-spin-very-slow" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] backdrop-blur-sm px-5 py-3 rounded-full shadow-xl border-2 border-white/50">
                <span className="text-md font-Zain text-white flex items-center gap-2">
                  Reiki Master
                </span>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="flex-1 space-y-6">
              <div>
                <h3 className="text-5xl lg:text-7xl font-Dongle text-[#8B4513] mb-2">
                  Camila Rodríguez
                </h3>
                <p className="text-lg text-[#A0522D] font-DMSans">
                  Terapeuta Holística & Spiritual Coach
                </p>
              </div>

              {/* Credentials badges */}
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 text-md text-[#8B4513] font-Zain flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Mount Royal University
                </div>
                <div className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 text-md text-[#8B4513] font-Zain">
                  +10 años experiencia
                </div>
                <div className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 text-md text-[#8B4513] font-Zain">
                  Psicóloga
                </div>
              </div>

              <div className="space-y-4 text-[#8B4513]/80 leading-relaxed">
                <p className='font-DMSans'>
                  Reiki Usui Master certificada por Mount Royal University, Terapeuta Holística, Life & Spiritual Coach, facilitadora en PNL y Psicóloga, con más de 10 años de experiencia en meditación y prácticas espirituales.
                </p>
                
                <p className='font-DMSans'>
                  Mi acompañamiento integra diferentes enfoques para guiar procesos de transformación profunda desde la energía, la conciencia y el autoconocimiento, con un enfoque emocional, holístico y espiritual.
                </p>

                <div className="bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm rounded-2xl p-5 border-l-4 border-[#8B4513]">
                  <p className="font-DMSans font-bold text-[#8B4513] flex items-start gap-2">
                    <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Mi propósito es acompañarte hacia mayor claridad, equilibrio y armonía interior, conectándote con tu propia luz y esencia.</span>
                  </p>
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="group relative backdrop-blur-xl bg-white/30 rounded-2xl p-5 border border-white/50 hover:bg-white/40 hover:scale-105 hover:shadow-xl transition-all cursor-pointer">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-lg" />
                  <BookOpen className="w-7 h-7 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-Zain text-xl font-bold text-[#8B4513] mb-1">Blog</h4>
                  <p className="text-sm text-[#8B4513]/70 font-DMSans">Reflexiones y herramientas</p>
                </div>

                <div className="group relative backdrop-blur-xl bg-white/30 rounded-2xl p-5 border border-white/50 hover:bg-white/40 hover:scale-105 hover:shadow-xl transition-all cursor-pointer">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-lg" />
                  <Podcast className="w-7 h-7 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-Zain text-xl font-bold text-[#8B4513] mb-1">Podcast</h4>
                  <p className="text-sm text-[#8B4513]/70 font-DMSans">Desarrollo personal y espiritual</p>
                </div>
              </div>

              {/* Signature */}
              <div className="pt-6 border-t-2 border-white/30">
                <p className="text-[#8B4513]/70 font-DMSans italic text-sm mb-3">
                  "Elevarte es un espacio seguro de sanación, cambio y autoconocimiento"
                </p>
                <p className="text-[#8B4513] font-DMSans font-bold text-lg flex items-center gap-2">
                  Con cariño, Camila 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 30s linear infinite;
        }
      `}</style>
    </section>
  );
}