"use client";

import { agendarSessionWhatsApp } from "@/lib/utils";

export default function HeroSection() {
  return (
    <div id='hero-section' className="relative min-h-screen overflow-hidden">
      {/* SVG Background with Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img 
          src="/elevarte_logo.svg" 
          alt="Espiral Elevarte" 
          className="spiral-animation w-[500px] h-[500px] md:w-[550px] md:h-[550px] "
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Brand Name */}
        <h1 className="text-8xl lg:text-9xl mb-4 animate-fadeInUp">
          <span className="text-white font-Dongle">ELEV</span>
          <span className="text-amber-800 font-Dongle">ARTE</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-3xl text-amber-900/80 font-DMSans mb-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Reiki, Coaching y Energía para transformar tu vida
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <button
            className="px-8 py-4 bg-amber-800 text-white text-xl rounded-full font-Zain hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => window.open(agendarSessionWhatsApp, '_blank')}
          >
            Agenda tu sesión
          </button>
        </div>

        {/* Contact Info */}
        <div id="contact" className="flex flex-wrap justify-center gap-6 text-amber-900/70 animate-fadeInUp font-DMSans" style={{ animationDelay: '0.8s' }}>
          "Elevarte: un camino de equilibrio entre cuerpo, mente y espíritu."
        </div>
      </div>

      <style>{`
        .spiral-animation {
          animation: spiralRotate 35s linear infinite;
          opacity: 0.8;
        }

        @keyframes spiralRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out backwards;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .spiral-animation {
            width: 400px;
            height: 400px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .spiral-animation {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}