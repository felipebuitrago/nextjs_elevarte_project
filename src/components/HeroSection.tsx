"use client";
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Configuration
    const numArms = 12;
    const particlesPerArm = 35;
    const maxRadius = 250;
    const minRadius = 20;
    const rotations = 4.5;

    // Clear existing content
    container.innerHTML = '';

    // Create spiral wrapper for rotation
    const spiralWrapper = document.createElement('div');
    spiralWrapper.className = 'spiral-wrapper';
    container.appendChild(spiralWrapper);

    // Generate particles for each spiral arm
    for (let arm = 0; arm < numArms; arm++) {
      const armOffset = (360 / numArms) * arm;
      
      for (let i = 0; i < particlesPerArm; i++) {
        const progress = i / (particlesPerArm - 1);
        
        // Linear radius progression from outside to center
        const radius = maxRadius - (maxRadius - minRadius) * progress;
        
        // Calculate spiral angle - increases as we go inward
        const angle = armOffset + (rotations * 360 * progress);
        const angleRad = (angle * Math.PI) / 180;
        
        // Calculate position on the spiral
        const x = radius * Math.cos(angleRad);
        const y = radius * Math.sin(angleRad);
        
        // Particle size variation (smaller toward center)
        const size = 2 + (4 * (1 - progress));
        
        // Create particle
        const particle = document.createElement('div');
        particle.className = 'spiral-particle';
        
        // Distribute delays across full animation duration for continuous flow
        const totalParticles = numArms * particlesPerArm;
        const particleIndex = arm * particlesPerArm + i;
        const animationDuration = 8; // seconds
        const delay = -(particleIndex / totalParticles) * animationDuration;
        
        particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          animation-delay: ${delay}s;
          --x: ${x}px;
          --y: ${y}px;
        `;
        
        spiralWrapper.appendChild(particle);
      }
    }
  }, []);

  return (
    <div id='hero-section' className="relative min-h-screen overflow-hidden">
      {/* Spiral Animation Container */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" />

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
        .spiral-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          animation: spiralRotate 35s linear infinite;
        }

        .spiral-particle {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 25%;
          background: rgba(255, 255, 255, 0.56);
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
          transform: translate(var(--x), var(--y));
          will-change: opacity;
        }

        @keyframes spiralRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out backwards;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .spiral-wrapper {
            transform: scale(0.75);
          }
        }

        @media (max-width: 768px) {
          .spiral-wrapper {
            transform: scale(0.5);
          }
          .spiral-particle:nth-child(3n) {
            display: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .spiral-wrapper {
            animation: none;
          }
          .spiral-particle {
            animation: particleFade 2s ease-out infinite;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}