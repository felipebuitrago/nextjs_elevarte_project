"use client";
import React from "react"
import type { Servicio } from "../ServicesSection"
import { AlertCircle, CheckCircle, Globe, MapPin, X } from "lucide-react"

export default function ModalServicesCourses({
  selectedServicio,
  setSelectedServicio,
}: {
  selectedServicio: Servicio | null
  setSelectedServicio: (servicio: Servicio | null) => void
}) {
  if (!selectedServicio) return null
  return (
    <>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={() => setSelectedServicio(null)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

        {/* Modal Content */}
        <div
          className="relative bg-white/95 backdrop-blur-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-white/50 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedServicio(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-all z-10"
          >
            <X className="w-6 h-6 text-amber-900" />
          </button>

          {/* Header with gradient */}
          <div className={`bg-gradient-to-br from-[#8B4513]/15 to-[#A0522D]/15 border-b-2 border-white/50 p-8 md:p-10`}>
            <div className={`inline-flex p-4 rounded-2xl bg-white/40 border border-white/60 mb-4`}>
              {React.createElement(selectedServicio.icon, { className: "w-10 h-10 text-amber-900" })}
            </div>
            <h3 className="text-5xl md:text-7xl font-Dongle text-amber-900">
              {selectedServicio.title}
            </h3>
            <p className="text-lg text-amber-700/70 font-DMSans">
              {selectedServicio.subtitle}
            </p>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-amber-900/80 font-DMSans leading-relaxed">
                {selectedServicio.fullDescription}
              </p>
            </div>

            {/* Info Grid */}
            <div className={`grid grid-cols-1 ${selectedServicio.formato ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
              <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                <div className="text-xl text-amber-900/60 font-Dongle">Duración</div>
                <div className="text-2xl font-Zain font-bold text-amber-900">{selectedServicio.duracion}</div>
                <div className="text-xs font-DMSans text-amber-900/60">{selectedServicio.sesiones}</div>
              </div>

              <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                <div className="text-xl text-amber-900/60 font-Dongle">Inversión</div>
                <div className="text-2xl font-Zain font-bold text-amber-900">{selectedServicio.precio}</div>
              </div>

              {selectedServicio.formato && (<div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                <div className="text-xl text-amber-900/60 font-Dongle">Formato</div>
                <div className="text-2xl font-Zain font-bold text-amber-900">1-2 personas</div>
                <div className="text-xs text-amber-900/60">Personalizado</div>
              </div>)}
            </div>

            {/* Requisitos */}
            {selectedServicio.requisitos && (<div className="bg-gradient-to-r from-[#D2B48C]/20 to-[#DEB887]/20 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <h4 className="text-2xl font-Dongle text-amber-900 mb-2 uppercase tracking-wide">✓ Requisitos</h4>
              <p className="text-amber-900/80 font-DMSans">{selectedServicio.requisitos}</p>
            </div>)}

            {/* Contenido */}
            {selectedServicio.contenido && (<div>
              <h4 className="text-4xl font-Dongle text-amber-900 mb-4">Contenido del Curso</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedServicio.contenido.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 font-DMSans">
                    <CheckCircle className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-900/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>)}
            
            {/* Qué puedes trabajar */}
            {selectedServicio.queTrabajas && (
              <div>
                <h4 className="text-4xl font-Dongle text-amber-900 mb-4">¿Qué puedes trabajar en estas sesiones?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedServicio.queTrabajas.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 font-DMSans">
                    <span className="text-amber-900/80">&middot; {item}</span>
                  </div>
                ))}
              </div>
            </div>)}
            
            {/* Beneficios */}
            <div>
              <h4 className="text-4xl font-Dongle text-amber-900 mb-4">Beneficios</h4>
              <div className="space-y-3">
                {selectedServicio.beneficios.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/40 rounded-xl p-4 border border-white/50">
                    <span className="text-amber-700/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modalidad */}
            <div>
              <h4 className="text-4xl font-Dongle text-amber-900 mb-4">Modalidad</h4>
              <div className="flex flex-wrap gap-3">
                {selectedServicio.modalidad.map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-white/50 to-white/40 border border-white/60 text-amber-900 font-Zain text-lg"
                  >
                    {(mod.includes('Presencial') || mod.includes('Calgary')) ? (
                      <MapPin className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            {/* Nota ética */}
            {selectedServicio.notaEtica && (
              <div className="bg-gradient-to-r from-amber-100/50 to-amber-50/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-200/50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-2xl font-bold font-Dongle text-amber-900 uppercase tracking-wide">Nota ética</h4>
                    <p className="text-amber-800/90 text-sm leading-relaxed font-DMSans">{selectedServicio.notaEtica}</p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <button className={`
                w-full py-5 px-6 rounded-2xl font-Zain font-bold text-xl md:text-2xl
                bg-gradient-to-r from-[#8B4513] to-[#A0522D]
                text-white shadow-xl
                transform transition-all duration-300
                hover:shadow-2xl hover:scale-[1.02]
                active:scale-95
              `}>
              Agendar {selectedServicio.title}
            </button>
          </div>
        </div>
      </div>

    </>
  )
}