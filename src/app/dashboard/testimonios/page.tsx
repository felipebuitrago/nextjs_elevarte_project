import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { TestimonialActiveSwitch } from '@/components/ui/TestimonialActiveSwitch'
import { Edit, Edit2 } from 'lucide-react'
import { Testimonial } from '@/types'

export default async function TestimonialsPage() {
  const supabase = await createClient()

  // Obtener testimonios de la base de datos
  let testimonials: Testimonial[] = [];

  try {
    const { data, error } = await supabase
      .from('Testimonial')
      .select('id, name, body, published, rating')
      .order('updatedAt', { ascending: false });
    
    if (error) throw error;
    
    testimonials = data ?? [];
    
  } catch (error) {
    console.error('Error fetching testimonials:', error);
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
          href="/dashboard/testimonios/nuevo"
          className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          + Nuevo Testimonio
        </Link>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-Dongle text-amber-900">Testimonios</h1>
        <p className="text-lg text-amber-700/60 font-DMSans">Gestiona los testimonios de tus website</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-900/10">
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Nombre</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Rating</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Testimonio</th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
                      <td className="p-6 text-amber-900 font-DMSans">{testimonial.name}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans">{testimonial.rating}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans">{testimonial.body}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans flex">
                        <Link
                          href={`/dashboard/testimonios/editar?id=${testimonial.id}`}
                          className="inline-flex items-center mr-6 p-2 rounded hover:bg-white/10 transition-colors"
                          aria-label={`Editar testimonio ${testimonial.name}`}
                        >
                          <Edit className="w-5 h-5 text-amber-900 hover:text-amber-700" />
                        </Link>
                        <TestimonialActiveSwitch
                          testimonialId={testimonial.id}
                          initialActive={testimonial.published}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-12 text-center text-amber-700/60 font-DMSans">
                      No hay testimonios disponibles. ¡Crea tu primer testimonio!
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