// app/dashboard/testimonios/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function TestimoniosPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  
  if (userError || !userData?.user) {
    redirect('/')
  }

  // Obtener testimonios de la base de datos
  const { data: testimonios, error } = await supabase
    .from('testimonios')
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
          + Nuevo Testimonio
        </button>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-Dongle text-amber-900">Testimonios</h1>
        <p className="text-lg text-amber-700/60 font-DMSans">Gestiona las reseñas de tus clientes</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-900/10">
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Cliente</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Testimonio</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Rating</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Fecha</th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {testimonios && testimonios.length > 0 ? (
                  testimonios.map((testimonio) => (
                    <tr key={testimonio.id} className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
                      <td className="p-6 text-amber-900 font-DMSans">{testimonio.client_name}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans max-w-md truncate">
                        "{testimonio.content}"
                      </td>
                      <td className="p-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < (testimonio.rating || 5) ? 'text-amber-500' : 'text-amber-200'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="p-6 text-amber-700/60 font-DMSans">
                        {new Date(testimonio.created_at).toLocaleDateString('es-ES')}
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
                      No hay testimonios disponibles. ¡Agrega tu primer testimonio!
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