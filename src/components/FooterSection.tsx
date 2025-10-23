"use client";
import {
  Phone,
  Mail,
  MapPin,
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

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Column 1 - Servicios */}
          <div>
            <h3 className="text-3xl font-Dongle mb-3 flex items-center gap-2 text-amber-800">
              Servicios
            </h3>
            <ul className="space-y-3 font-DMSans">
              <li>
                <a href="#terapia-reiki" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Terapia Reiki
                </a>
              </li>
              <li>
                <a href="#limpieza" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Limpieza Energética
                </a>
              </li>
              <li>
                <a href="#coaching-personal" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Coaching Personal
                </a>
              </li>
              <li>
                <a href="#spiritual-coaching" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Spiritual Coaching
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Cursos */}
          <div>
            <h3 className="text-3xl font-Dongle mb-3 flex items-center gap-2 text-amber-800">
              Formación
            </h3>
            <ul className="space-y-3 font-DMSans">
              <li>
                <a href="#desarrollo-intuitivo" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Desarrollo Intuitivo
                </a>
              </li>
              <li>
                <a href="#reiki-nivel-1" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Reiki Nivel I
                </a>
              </li>
              <li>
                <a href="#reiki-nivel-2" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Reiki Nivel II
                </a>
              </li>
              <li>
                <a href="#reiki-nivel-3" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Reiki Nivel III
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contenido */}
          <div>
            <h3 className="text-3xl font-Dongle mb-3 flex items-center gap-2 text-amber-800">
              Contenido
            </h3>
            <ul className="space-y-3 font-DMSans">
              <li>
                <a href="#blog" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Blog
                </a>
              </li>
              <li>
                <a href="#podcast" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Podcast
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="text-white/90 hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-white/80 group-hover:w-2 group-hover:bg-white transition-all" />
                  Sobre Mí
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contacto */}
          <div>
            <h3 className="text-3xl font-Dongle mb-3 flex items-center gap-2 text-amber-800">
              Contacto
            </h3>
            <ul className="space-y-4 font-DMSans">
              <li>
                <a
                  href="tel:+15878346698"
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>+1 587 834 6698</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:solocamir1@gmail.com"
                  className="text-white/90 hover:text-white transition-colors flex items-center gap-3 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="break-all">solocamir1@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="text-white/90 flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Calgary, Alberta - Canada</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className="bg-white/10 rounded-3xl p-8 border border-white/20 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Social Links */}
            <div>
              <p className="text-white/90 mb-4 text-center md:text-left">Sígueme en redes sociales</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://instagram.com/elevarte.reiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Instagram className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Facebook className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 hover:scale-110 transition-all group"
                >
                  <Youtube className="w-5 h-5 group-hover:text-[#D2B48C] transition-colors" />
                </a>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-1 animate-fadeInUp" >
              <button
                //onClick={scrollToContact}
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