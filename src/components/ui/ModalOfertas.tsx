"use client";
import { Oferta } from "@/types";
import { X, Tag, CheckCircle } from "lucide-react";

interface ModalOfertasProps {
  isOpen: boolean;
  onClose: () => void;
  ofertas: Oferta[];
}

export default function ModalOfertas({ isOpen, onClose, ofertas }: ModalOfertasProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white z-10 hover:bg-amber-50 transition-colors"
        aria-label="Cerrar modal"
      >
        <X className="w-6 h-6 text-amber-900" />
      </button>

      {/* Modal Content */}
      <div
        className="relative bg-white/95 backdrop-blur-2xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-white/50 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-100/80 to-amber-100/60 border-b-2 border-white/50 p-8 md:p-10">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-5xl md:text-7xl font-Dongle text-amber-900">
              Ofertas Especiales
            </h2>
          </div>
          <p className="text-lg text-amber-900/70 font-DMSans">
            Aprovecha estas promociones exclusivas por tiempo limitado
          </p>
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 space-y-6">
          {ofertas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-amber-900/60 font-DMSans">
                No hay ofertas disponibles en este momento
              </p>
            </div>
          ) : (
            ofertas.map((oferta) => (
              <div
                key={oferta.id}
                className={`
                  relative bg-gradient-to-br from-white/60 to-white/40 
                  backdrop-blur-sm rounded-2xl p-6 md:p-8 
                  border-2 ${oferta.destacada ? 'border-amber-500/50 shadow-xl' : 'border-white/50'}
                  transition-all duration-300 hover:shadow-2xl
                `}
              >
                {/* Contenido de la oferta */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Info principal */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Título */}
                    <h3 className="text-3xl md:text-4xl font-Dongle text-amber-900 leading-tight">
                      {oferta.titulo}
                    </h3>

                    {/* Descripción */}
                    {oferta.descripcion && (
                      <p className="text-base text-amber-900/80 font-DMSans leading-relaxed">
                        {oferta.descripcion}
                      </p>
                    )}

                    {/* Qué incluye */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-Zain text-amber-900 font-semibold flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Incluye:
                      </h4>
                      <div className="space-y-2">
                        {oferta.incluye.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 text-amber-900/80 font-DMSans"
                          >
                            <CheckCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Válido hasta */}
                    {oferta.validoHasta && (
                      <div className="inline-flex items-center gap-2 bg-amber-100/50 text-amber-900 px-4 py-2 rounded-full text-sm font-DMSans border border-amber-200/50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Válido hasta: {oferta.validoHasta}
                      </div>
                    )}
                  </div>

                  {/* Precio */}
                  <div className="flex flex-col justify-center items-center bg-gradient-to-br from-amber-50/80 to-amber-100/60 rounded-xl p-6 border border-amber-200/50">
                    {/* Descuento badge */}
                    {oferta.descuento && (
                      <div
                        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-md"
                        style={{
                          backgroundColor: '#ef4444', // red-500
                          position: 'relative',
                          zIndex: 1
                        }}
                      >
                        -{oferta.descuento}
                      </div>
                    )}

                    {/* Precio original tachado */}
                    {oferta.precioOriginal && (
                      <div className="text-lg text-amber-900/50 line-through font-DMSans mb-1" style={{ textDecoration: 'line-through' }}>
                        $ {oferta.precioOriginal}
                      </div>
                    )}

                    {/* Precio actual */}
                    <div className="text-4xl md:text-5xl font-bold text-amber-900 font-Zain mb-2">
                      $ {oferta.precio}
                    </div>

                    {/* CTA Button */}
                    <button
                      className="
                        w-full mt-4 py-3 px-6 rounded-xl font-Zain font-bold text-lg
                        bg-gradient-to-r from-[#8B4513] to-[#A0522D]
                        text-white shadow-lg
                        transform transition-all duration-300
                        hover:shadow-xl hover:scale-105
                        active:scale-95
                      "
                      onClick={() => {
                        const mensaje = `Hola! Me interesa la oferta: ${oferta.titulo}`;
                        // Reemplaza con tu número de WhatsApp
                        window.open(`https://wa.me/14035890618?text=${encodeURIComponent(mensaje)}`, '_blank');
                      }}
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-amber-50/50 to-amber-100/30 border-t-2 border-white/50 p-6 md:p-8">
          <p className="text-center text-sm text-amber-900/70 font-DMSans">
            Las ofertas están sujetas a disponibilidad y pueden cambiar sin previo aviso
          </p>
        </div>
      </div>
    </div>
  );
}