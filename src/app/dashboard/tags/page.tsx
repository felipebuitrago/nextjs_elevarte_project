// app/dashboard/tags/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import db from '@/lib/db'
import { TagActiveSwitch } from '@/components/ui/TagActiveSwitch'

export default async function TagsPage() {
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()
  
  if (userError || !userData?.user) {
    redirect('/')
  }

  // Obtener tags de la base de datos
  const tags = await db.tag.findMany({
    select: { 
      id: true, 
      name: true, 
      slug: true, 
      active: true 
    }, 
    orderBy: { name: 'asc' }
  })

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
          href="/dashboard/tags/nuevo"
          className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          + Nueva Tag
        </Link>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-Dongle text-amber-900">Tags</h1>
        <p className="text-lg text-amber-700/60 font-DMSans">Gestiona las etiquetas de tus posts</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-900/10">
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Nombre</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Slug</th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">Activo</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <tr key={tag.id} className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
                      <td className="p-6 text-amber-900 font-DMSans">{tag.name}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans">{tag.slug}</td>
                      <td className="p-6 text-right">
                        <TagActiveSwitch 
                          tagId={tag.id} 
                          initialActive={tag.active} 
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-12 text-center text-amber-700/60 font-DMSans">
                      No hay tags disponibles. ¡Crea tu primera tag!
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