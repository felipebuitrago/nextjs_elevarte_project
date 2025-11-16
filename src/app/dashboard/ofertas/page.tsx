import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import OfertaRow from '@/components/ui/OfertaRow'
import { Oferta } from '@/types'

export default async function OfertasPage() {
  const supabase = await createClient()

  let ofertas: Oferta[] = [];

  try {
    const { data, error } = await supabase
      .from('Oferta')
      .select('*')
      .order('updatedAt', { ascending: false });

    ofertas = data ?? [];

    if (error) throw error;
  } catch (error) {
    console.error(error);
  }

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

        <Link
          href="/dashboard/ofertas/nuevo"
          className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          + Nueva Oferta
        </Link>
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
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">
                    Título
                  </th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">
                    Precio
                  </th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">
                    Descuento
                  </th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">
                    Válida hasta
                  </th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">
                    Estado
                  </th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {ofertas && ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <OfertaRow key={oferta.id} oferta={oferta} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-amber-700/60 font-DMSans">
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