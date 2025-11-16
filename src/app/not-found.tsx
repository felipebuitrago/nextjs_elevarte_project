import Link from 'next/link'
import { Home, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589] flex items-center justify-center p-4">
      <div className="text-center">

        {/* Contenido principal */}
        <div 
          className="backdrop-blur-xl rounded-3xl border shadow-2xl p-12 max-w-md mx-auto"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >

          {/* Mensaje */}
          <h2 className="text-4xl md:text-5xl font-Dongle text-amber-900 mb-3">
            Página no encontrada
          </h2>
          <p className="text-lg text-amber-900/70 font-DMSans mb-8">
            La página que buscas no existe o ha sido movida
          </p>

          {/* Botón */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-2xl font-Zain text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>

        {/* Texto decorativo inferior */}
        <p className="text-white/60 font-DMSans text-sm mt-8">
          ¿Perdido? Te ayudamos a encontrar el camino
        </p>
      </div>
    </div>
  )
}