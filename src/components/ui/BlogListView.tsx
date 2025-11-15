'use client'

import { useState, useRef } from 'react'
import { ArrowLeft, Calendar, Tag as TagIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { PostWithTag, Tag } from '@/types'

interface BlogListViewProps {
  posts: PostWithTag[]
  tags: Tag[]
  currentPage: number
  totalPages: number
  currentSort: string
}

export default function BlogListView({
  posts,
  tags,
  currentPage,
  totalPages,
  currentSort
}: BlogListViewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const selectedTag = searchParams.get('tag') || 'todas'
  const selectedSort = searchParams.get('sort') || 'desc'

  const handleTagChange = (tagSlug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tagSlug === 'todas') {
      params.delete('tag')
    } else {
      params.set('tag', tagSlug)
    }
    params.delete('page') // Reset to page 1 when filtering
    router.push(`/blog?${params.toString()}`)
  }

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (sortValue === 'desc') {
      params.delete('sort')
    } else {
      params.set('sort', sortValue)
    }
    params.delete('page') // Reset to page 1 when sorting
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors font-Zain text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a página principal
          </Link>


          {/* Filters Container */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Tag Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="tag-filter" className="text-amber-900 font-Zain text-sm sm:text-base whitespace-nowrap">
                Categoría:
              </label>
              <select
                id="tag-filter"
                value={selectedTag}
                onChange={(e) => handleTagChange(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/50 border border-amber-900/20 text-amber-900 font-Zain backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-900/30 transition-all cursor-pointer text-sm sm:text-base"
              >
                <option value="todas">Todas</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label htmlFor="sort-filter" className="text-amber-900 font-Zain text-sm sm:text-base whitespace-nowrap">
                Fecha:
              </label>
              <select
                id="sort-filter"
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/50 border border-amber-900/20 text-amber-900 font-Zain backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-900/30 transition-all cursor-pointer text-sm sm:text-base"
              >
                <option value="desc">Más recientes</option>
                <option value="asc">Más antiguos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-amber-900/60 font-Zain">
                No hay posts publicados en esta categoría
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post.id}
                ref={(el) => { cardsRef.current[index] = el }}
                onMouseEnter={() => setHoveredCard(post.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className={`
                  relative h-full backdrop-blur-xl bg-white/40 rounded-3xl p-8
                  border border-white/50 shadow-xl
                  transition-all duration-500 ease-out
                  ${hoveredCard === post.id ? 'shadow-2xl scale-[1.02]' : ''}
                `}>
                  {/* Gradient border effect on hover */}
                  <div className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10
                    -z-10 blur-xl
                  `} />

                  {/* Top decoration line */}
                  <div className={`
                    absolute top-0 left-8 right-8 h-[3px] rounded-full
                    bg-gradient-to-r from-[#8B4513] to-[#A0522D]
                    transform origin-left scale-x-0 group-hover:scale-x-100
                    transition-transform duration-700 ease-out
                  `} />

                  {/* Content */}
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    {post.coverImage && (
                      <div className="lg:w-1/3 flex-shrink-0">
                        <div className="relative h-48 lg:h-[300px] max-h-[200px] rounded-2xl overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full max-h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-Dongle text-amber-900 mb-2">
                          {post.title}
                        </h2>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-amber-700/70 font-DMSans mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>

                          {post.tag && (
                            <div className="flex items-center gap-1.5">
                              <span className="px-3 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20">
                                {post.tag.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-amber-800/80 leading-relaxed font-DMSans line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Click hint */}
                      <div className="text-sm text-[#8B4513]/60 font-Zain group-hover:text-[#8B4513] transition-colors pt-2">
                        Click para leer más →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-white/50 border border-amber-900/20 text-amber-900 font-Zain backdrop-blur-sm hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Anterior
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full font-Zain transition-all ${currentPage === page
                    ? 'bg-amber-900 text-white'
                    : 'bg-white/50 border border-amber-900/20 text-amber-900 hover:bg-white/70'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full bg-white/50 border border-amber-900/20 text-amber-900 font-Zain backdrop-blur-sm hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  )
}