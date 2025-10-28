// app/dashboard/ofertas/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function OfertasPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  
  if (userError || !userData?.user) {
    redirect('/')
  }

  // Obtener ofertas de la base de datos
  const { data: ofertas, error } = await supabase
    .from('ofertas')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className='p-8'>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-DMSans">Volver al Dashboard</span>
        </Link>
        
        <button className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg">
          + Nueva Oferta
        </button>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-Dongle text-amber-900">Ofertas</h1>
        <p className="text-lg text-amber-700/60 font-DMSans">Gestiona tus ofertas y promociones</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-900/10">
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Título</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Descuento</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Válida hasta</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Estado</th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ofertas && ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <tr key={oferta.id} className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
                      <td className="p-6 text-amber-900 font-DMSans">{oferta.title}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans font-semibold">{oferta.discount}%</td>
                      <td className="p-6 text-amber-700/60 font-DMSans">
                        {oferta.valid_until ? new Date(oferta.valid_until).toLocaleDateString('es-ES') : 'Sin límite'}
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-DMSans ${
                          oferta.active 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {oferta.active ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-3 justify-end">
                          <button className="px-4 py-2 bg-white/50 text-amber-900 rounded-xl font-DMSans hover:bg-white/70 transition-all duration-300 border border-white/40">
                            Editar
                          </button>
                          <button className="px-4 py-2 bg-amber-900/10 text-amber-900 rounded-xl font-DMSans hover:bg-amber-900/20 transition-all duration-300 border border-amber-900/20">
                            Ocultar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-amber-700/60 font-DMSans">
                      No hay ofertas disponibles. ¡Crea tu primera oferta!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}