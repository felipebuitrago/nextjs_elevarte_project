"use client";
import { agendarSessionWhatsApp } from '@/lib/utils';
import {
  Instagram,
  Facebook,
  Youtube,
  Heart,
} from 'lucide-react';

export default function FooterSection() {
  return (
    <footer
      className="relative text-white overflow-hidden"
    >

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Logo and Tagline */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center mb-12">

          {/* Brand Name */}
          <h1 className="text-6xl lg:text-7xl">
            <span className="text-white font-Dongle">ELEV</span>
            <span className="text-amber-800 font-Dongle">ARTE</span>
          </h1>

          <p className="text-lg md:text-xl text-amber-900/80 font-DMSans mt-[-1em]">
            Reiki, Coaching y Energía para transformar tu vida
          </p>
        </div>

        {/* Social Media & CTA */}
        <div className="bg-white/10 rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Social Links */}
            <div>
              <p className="text-white/90 mb-4 text-center md:text-left">Sígueme en redes sociales</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/Elevarte.reiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Instagram className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/share/1FKyVftVG4/?mibextid=LQQJ4d"
                  target="_blank"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Facebook className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
                <a
                  href="https://www.youtube.com/@ElevarteHolistico"
                  target="_blank"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Youtube className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
                <a
                  href="https://open.spotify.com/show/2d9CXA6PAJMT7FqiFTFiph"
                  target="_blank"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <svg  className="spotify-icon w-5 h-5 group-hover:text-[#D2B48C] transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.33 1333.3" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"><path d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z" fill="#fff" fillRule="nonzero"/></svg>
                </a>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-1 animate-fadeInUp" >
              <button
                onClick={() => window.open(agendarSessionWhatsApp, '_blank')}
                className="px-8 py-4 bg-amber-800 text-white text-xl rounded-full font-Zain hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Agenda tu sesión
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-sm text-center md:text-left font-DMSans">
              © {new Date().getFullYear()} ELEVARTE. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-6">
              <p className="text-white/80 text-sm flex items-center gap-1 font-DMSans">
                Hecho con <Heart className="w-3 h-3 text-red-400 animate-pulse" fill="currentColor" /> por DevDocky
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="h-2 bg-gradient-to-r from-[#8B4513] via-[#D2B48C] to-[#8B4513]" />
    </footer>
  );
}