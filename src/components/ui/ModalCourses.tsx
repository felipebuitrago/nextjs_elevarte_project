"use client";
import React from "react"
import type { Curso } from "../CoursesSection"
import { AlertCircle, CheckCircle, Globe, MapPin, X } from "lucide-react"

export default function ModalCourses({
  selectedCurso,
  setSelectedCurso,
}: {
  selectedCurso: Curso | null
  setSelectedCurso: (Curso: Curso | null) => void
}) {
  if (!selectedCurso) return null
  return (
    <>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={() => setSelectedCurso(null)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

        {/* Close button */}
        <button
          onClick={() => setSelectedCurso(null)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white z-10"
        >
          <X className="w-6 h-6 text-amber-900" />
        </button>

        {/* Modal Content */}
        <div
          className="relative bg-white/95 backdrop-blur-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-white/50 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className={`bg-gradient-to-br from-[#8B4513]/15 to-[#A0522D]/15 border-b-2 border-white/50 p-8 md:p-10`}>
            <h3 className="text-5xl md:text-7xl font-Dongle text-amber-900">
              {selectedCurso.title}
            </h3>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-amber-900/80 font-DMSans leading-relaxed">
                {selectedCurso.fullDescription}
              </p>
            </div>

            {/* Info Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
              <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                <div className="text-xl text-amber-900/60 font-Dongle">Duración</div>
                <div className="text-2xl font-Zain font-bold text-amber-900">{selectedCurso.duracion}</div>
              </div>

              <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                <div className="text-xl text-amber-900/60 font-Dongle">Inversión</div>
                <div className="text-2xl font-Zain font-bold text-amber-900">{selectedCurso.precio}</div>
              </div>
            </div>


            {/* Requisitos */}
            {selectedCurso.requisitos && (<div className="bg-gradient-to-r from-[#D2B48C]/20 to-[#DEB887]/20 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <h4 className="text-2xl font-Dongle text-amber-900 mb-2 uppercase tracking-wide">✓ Requisitos</h4>
              <p className="text-amber-900/80 font-DMSans">{selectedCurso.requisitos}</p>
            </div>)}

            {/* Incluye */}
            <div>
              <h4 className="text-4xl font-Dongle text-amber-900 mb-4">
                {selectedCurso.esReiki ? 'Incluye' : 'Aprenderás'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCurso.incluye.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 font-DMSans">
                    <CheckCircle className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-900/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios */}
            {selectedCurso.beneficios && (
              <div>
                <h4 className="text-4xl font-Dongle text-amber-900 mb-4">Beneficios</h4>
                <div className="space-y-3">
                  {selectedCurso.beneficios.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-white/40 rounded-xl p-4 border border-white/50">
                      <span className="text-amber-700/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Práctica Adicional */}
            {selectedCurso.practicaAdicional && (
              <div className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h4 className="text-2xl font-Dongle text-amber-900 mb-3">
                  Sesiones de Práctica Adicional (Opcional)
                </h4>
                <p className="text-sm text-amber-900/70 font-DMSans mb-4 leading-relaxed">
                  Si deseas un espacio extra para realizar práctica energética acompañada y supervisada, puedes agendar una sesión individual dedicada:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white/50 border border-amber-900/10">
                    <p className="text-xs text-amber-900/60 font-Zain mb-1">Presencial (1 hora)</p>
                    <p className="text-lg font-Zain font-bold text-amber-900">
                      {selectedCurso.practicaAdicional.presencial}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/50 border border-amber-900/10">
                    <p className="text-xs text-amber-900/60 font-Zain mb-1">Virtual (1 hora)</p>
                    <p className="text-lg font-Zain font-bold text-amber-900">
                      {selectedCurso.practicaAdicional.virtual}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nota Final */}
            {selectedCurso.notaFinal && (
              <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-900/10">
                <p className="text-sm text-amber-900/80 font-DMSans leading-relaxed">
                  <strong className="font-Zain">📝 Nota final:</strong> {selectedCurso.notaFinal}
                </p>
              </div>
            )}

            {/* Modalidad */}
            {(selectedCurso.id != "limpieza-espacios" && selectedCurso.id != "terapia-reiki") && (
              <div>
                <h4 className="text-4xl font-Dongle text-amber-900 mb-4">Modalidad</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedCurso.modalidad.map((mod: string, i: number) => (
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
              Agendar {selectedCurso.title}
            </button>
          </div>
        </div>
      </div>

    </>
  )
}