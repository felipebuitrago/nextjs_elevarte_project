import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import { PostPublishedSwitch } from '@/components/ui/PostPublishedSwitch'
import { Post } from '@/types'

export default async function PostsPage() {
  const supabase = await createClient()

  // Obtener posts de la base de datos
  let posts: Post[] = [];
  try {
    const { data, error: postsError } = await supabase
    .from("Post")
    .select("*")
    .order('updatedAt', { ascending: false });
    
    posts = data ?? [];
    
    if (postsError) throw postsError;
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
          href="/dashboard/posts/nuevo"
          className="px-6 py-3 bg-amber-900 text-white rounded-2xl font-DMSans hover:bg-amber-800 transition-all duration-300 hover:scale-105 shadow-lg">
          + Nuevo Post
        </Link>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-Dongle text-amber-900">Posts</h1>
        <p className="text-lg text-amber-700/60 font-DMSans">Gestiona las entradas de tu blog</p>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-amber-900/10">
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Portada</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Título</th>
                  <th className="text-left p-6 text-amber-900 font-DMSans font-semibold">Publicado</th>
                  <th className="text-right p-6 text-amber-900 font-DMSans font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.id} className="border-b border-amber-900/5 hover:bg-white/20 transition-colors duration-200">
                      <td className="p-6 max-w-xs truncate">
                        <img
                          src={post.coverImage || ""}
                          alt=""
                          style={{ maxWidth: '50px', maxHeight: '50px', width: 'auto', height: 'auto' }}
                        />
                      </td>
                      <td className="p-6 text-amber-900 font-DMSans max-w-xs truncate">{post.title}</td>
                      <td className="p-6 text-amber-700/60 font-DMSans">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES') : 'No publicado'}
                      </td>
                      <td className="p-6 text-amber-700/60 font-DMSans flex justify-end">
                        <Link
                          href={`/dashboard/posts/editar?id=${post.id}`}
                          className="inline-flex items-center mr-6 p-2 rounded hover:bg-white/10 transition-colors"
                          aria-label="Editar post"
                        >
                          <Edit className="w-5 h-5 text-amber-900 hover:text-amber-700" />
                        </Link>
                        <PostPublishedSwitch
                          postId={post.id}
                          initialActive={post.published}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-amber-700/60 font-DMSans">
                      No hay posts disponibles. ¡Crea tu primer post!
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