"use client";
import { useEffect, useRef, useState } from 'react';
import { GraduationCap, X } from 'lucide-react';

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

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
          className="relative backdrop-blur-xl bg-white/40 rounded-[2.5rem] md:rounded-[3rem] px-8 md:px-12 py-8 md:py-12 shadow-2xl border border-white/50 cursor-pointer group"
          style={{
            boxShadow: '0 25px 50px -12px rgba(139, 69, 19, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.1)'
          }}
          onClick={() => setOpenModal(true)}
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
                  Terapeuta Holística
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
                  Soy Camila, terapeuta holística y Reiki Master. Te acompaño mediante procesos de sanación y transformación personal desde una mirada integral, uniendo energía, conciencia y espiritualidad con herramientas prácticas y humanas.
                </p>

                <p className='font-DMSans'>
                  Elevarte es el espacio que nace de ese camino: un refugio para reconectar contigo, liberar lo que ya no te sirve y vivir con mayor calma, propósito y autenticidad. Aquí trabajamos cuerpo, mente y espíritu desde el respeto profundo por tu proceso.
                </p>
              </div>

              {/* Action Cards
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <Link
                  href="/blog"
                  className="group relative backdrop-blur-xl bg-white/30 rounded-2xl p-5 border border-white/50 hover:bg-white/40 hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-lg" />
                  <BookOpen className="w-7 h-7 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-Zain text-xl font-bold text-[#8B4513] mb-1">Blog</h4>
                  <p className="text-sm text-[#8B4513]/70 font-DMSans">
                    Reflexiones y herramientas
                  </p>
                </Link>

                <a
                  href="https://linktr.ee/ElevarteHolistico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative backdrop-blur-xl bg-white/30 rounded-2xl p-5 border border-white/50 hover:bg-white/40 hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-lg" />
                  <Podcast className="w-7 h-7 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-Zain text-xl font-bold text-[#8B4513] mb-1">Podcast</h4>
                  <p className="text-sm text-[#8B4513]/70 font-DMSans">
                    Desarrollo personal y espiritual
                  </p>
                </a>
              </div>

              {/* Signature
              <div className="pt-6 border-t-2 border-white/30">
                <p className="text-[#8B4513]/70 font-DMSans italic text-sm mb-3">
                  "Elevarte es un espacio seguro de sanación, cambio y autoconocimiento"
                </p>
                <p className="text-[#8B4513] font-DMSans font-bold text-lg flex items-center gap-2">
                  Con cariño, Camila
                </p>
              </div> */}
            </div>
          </div>
          {/* Click to view more hint */}
          <div className="text-center pt-6 text-sm text-[#8B4513]/60 font-Zain group-hover:text-[#8B4513] group-hover:scale-105 transition-all">
            Click para ver más información →
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

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setOpenModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          {/* Modal Content */}
          <div
            className="relative bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-2 border-white/50 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Close button - stays on top during scroll */}
            <button
              onClick={() => setOpenModal(false)}
              className="relative right-0 p-3 z-[9999] rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg border border-white/50 cursor-pointer"
            >
              <X className="w-5 h-5 text-amber-900" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {/* Header with image and gradient */}
              <div className="relative">
                <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                  {/* Text side */}
                  <div className="space-y-3">
                    <h3 className="text-6xl md:text-7xl font-Dongle text-amber-900 leading-tight">
                      Sobre Mí y Elevarte
                    </h3>
                    <p className="text-lg text-amber-700/70 font-DMSans">
                      Un espacio de sanación y transformación
                    </p>
                  </div>

                  {/* Image side */}
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-white/40">
                    <img
                      src="/img.jpg"
                      alt="Camila - Elevarte"
                      className="w-full h-full object-cover"
                    />
                    {/* Optional gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Body - Content with styled paragraphs */}
              <div className="p-5 md:p-12 space-y-6  mb-12 md:mt-[-27px]">
                {/* Content card */}
                <div className="backdrop-blur-xl bg-white/40 rounded-3xl p-6 md:p-10 border border-white/50 shadow-lg space-y-6">
                  <p className="text-amber-900 font-DMSans leading-relaxed text-lg">
                    Mi nombre es <span className="font-semibold">Camila</span> y soy Reiki Usui Master certificada por la Mount Royal University en Calgary, Canadá, soy Terapeuta Holística, Life & Spiritual Coach y facilitadora en Programación Neurolingüística (PNL). También soy psicóloga graduada en Colombia, una formación que complementa mi mirada integral del ser humano y que enriquece cada acompañamiento.
                  </p>

                  <p className="text-amber-900 font-DMSans leading-relaxed text-lg">
                    Con más de <span className="font-semibold text-amber-800">10 años de experiencia</span> en meditación, mindfulness y prácticas espirituales no religiosas, he integrado herramientas de distintas tradiciones para acompañarte en procesos profundos de transformación emocional, energética y espiritual. Sin embargo, más allá de los títulos, soy un alma en constante evolución, comprometida con su camino y con el deseo genuino de guiar a otros hacia su luz interior.
                  </p>

                  {/* Highlighted section */}
                  <div className="bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 rounded-2xl p-6 border border-amber-900/20">
                    <p className="text-amber-900 font-DMSans leading-relaxed text-lg">
                      <span className="font-Dongle text-4xl text-amber-800">Elevarte</span>&nbsp;
                      No es un espacio de psicoterapia clínica, sino un espacio de sanación y autoconocimiento con enfoque holístico, creado para que reconectes contigo y con lo que te da sentido. Aquí trabajamos desde la calma, la conciencia y el respeto profundo por tu proceso, para ayudarte a armonizar cuerpo, mente y espíritu.
                    </p>
                  </div>

                  <p className="text-amber-900 font-DMSans leading-relaxed text-lg">
                    En este refugio seguro encontrarás herramientas para liberar tensiones, sanar heridas, ordenar emociones y despertar tu potencial. Elevarte no es solo una terapia holística, es una invitación a vivir con propósito, desde el amor y la autenticidad.
                  </p>

                  <p className="text-amber-900 font-DMSans leading-relaxed text-lg">
                    Si sientes el llamado a iniciar o continuar tu camino de sanación, crecimiento y claridad, te invito a explorar los servicios que ofrezco, leer mi blog y escuchar el podcast. Y si deseas experimentar de forma directa los beneficios del Reiki, el coaching o las formaciones, estaré encantada de acompañarte.
                  </p>

                  {/* Final message */}
                  <div className="pt-4 border-t border-amber-900/10">
                    <p className="text-amber-900 font-DMSans leading-relaxed text-lg italic">
                      Y recuerda que Elevarte es un espacio seguro de sanación, cambio y autoconocimiento.
                    </p>
                    <p className="text-amber-800 font-DMSans text-xl mt-4 font-semibold">
                      Con cariño, Camila Rodríguez
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}