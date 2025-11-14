"use client";
import React from "react"
import type { Servicio } from "../ServicesSection"
import { AlertCircle, CheckCircle, Globe, MapPin, X } from "lucide-react"

export default function ModalServices({
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

        {/* Close button */}
        <button
          onClick={() => setSelectedServicio(null)}
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
              {selectedServicio.title}
            </h3>
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
            {
              selectedServicio.id != "terapia-reiki" && (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                  <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                    <div className="text-xl text-amber-900/60 font-Dongle">Duración</div>
                    <div className="text-2xl font-Zain font-bold text-amber-900">{selectedServicio.duracion}</div>
                    <div className="text-xs font-DMSans text-amber-900/60">{selectedServicio.sesiones}</div>
                  </div>

                  <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl p-5 border border-white/50">
                    <div className="text-xl text-amber-900/60 font-Dongle">Inversión</div>
                    <div className="text-2xl font-Zain font-bold text-amber-900">
                      {selectedServicio.id === "limpieza-espacios"
                        ? selectedServicio.precio?.split('\n').map((linea, index) => (
                            <div key={index}>{linea}</div>
                          ))
                        : <span>{selectedServicio.precio}</span>
                      }
                    </div>
                  </div>
                </div>
              )
            }

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
                <h4 className="text-4xl font-Dongle text-amber-900 mb-4">
                  {
                    selectedServicio.id !== "limpieza-espacios"
                      ? "¿Qué puedes trabajar en estas sesiones?"
                      : "Una limpieza energética ayuda a:"
                  }
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedServicio.queTrabajas.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 font-DMSans">
                      <span className="text-amber-900/80">&middot; {item}</span>
                    </div>
                  ))}
                </div>
              </div>)}

            {/* Beneficios */}
            {selectedServicio.beneficios && (
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
            )}

            {/* Opciones de Reiki */}
            {selectedServicio.id === "terapia-reiki" && selectedServicio.opciones && (
              <div className="space-y-6">
                <h4 className="text-4xl font-Dongle text-amber-900 mb-6">
                  Opciones de Sesión
                </h4>

                {selectedServicio.opciones.map((opcion, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/50 space-y-4"
                  >
                    {/* Título de la opción */}
                    <h5 className="text-3xl font-Dongle text-amber-900 border-b border-amber-900/10 pb-3">
                      Opción {index + 1} — {opcion.nombre}
                    </h5>

                    {/* Grid de duración e inversión */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {/* Duración */}
                      <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                        <div className="text-sm text-amber-900/60 font-Zain mb-1">Duración</div>
                        <div className="text-lg font-DMSans text-amber-900 font-semibold leading-tight">
                          {opcion.duracion}
                        </div>
                        {opcion.retroalimentacion && (
                          <div className="text-xs text-amber-900/60 font-DMSans mt-2 leading-tight">
                            + {opcion.retroalimentacion}
                          </div>
                        )}
                      </div>

                      {/* Inversión */}
                      <div className="bg-white/50 rounded-xl p-4 border border-white/50">
                        <div className="text-sm text-amber-900/60 font-Zain mb-1">Inversión</div>
                        <div className="space-y-1">
                          {opcion.inversion.map((inv, i) => (
                            <div key={i} className="text-base font-DMSans text-amber-900">
                              <span className="font-semibold">{inv.tipo}:</span> {inv.precio}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Ideal para */}
                    <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-900/10">
                      <p className="text-sm text-amber-900/80 font-DMSans leading-relaxed">
                        {opcion.idealPara}
                      </p>
                    </div>

                    {/* Nota específica de la opción */}
                    {opcion.nota && (
                      <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-900/10">
                        <p className="text-sm text-blue-900/70 font-DMSans leading-relaxed">
                          <strong className="font-Zain">Nota:</strong> {opcion.nota}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Nota general */}
                {selectedServicio.notaGeneral && (
                  <div className="bg-gradient-to-r from-amber-100/50 to-amber-50/50 backdrop-blur-sm rounded-xl p-5 border border-amber-200/50">
                    <p className="text-sm text-amber-900/80 font-DMSans leading-relaxed">
                      <strong>Nota general:</strong> {selectedServicio.notaGeneral}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Modalidad */}
            {(selectedServicio.id != "limpieza-espacios" && selectedServicio.id != "terapia-reiki") && (
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
            )}

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