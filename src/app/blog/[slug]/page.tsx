import db from "@/lib/db";
import { ArrowLeft, Calendar, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Post } from "../page";

export default async function PostPage(props: {
  params?: Promise<{
    slug?: string;
  }>;
}) {
  const params = await props.params
  const slug = params?.slug || ''

  let post: Post | null = null

  // Buscar el post por slug
  try {
    post = await db.post.findUnique({
      where: {
        slug: slug,
        published: true
      },
      include: {
        tag: true
      }
    })
    
  } catch (error) {
    console.error(error)
  }

  // Si no existe, mostrar 404
  if (!post) {
    notFound()
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors font-Zain text-lg mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a blogs
        </Link>

        {/* Post Header */}
        <article className="bg-white/30 backdrop-blur-sm rounded-2xl border border-amber-900/20 overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-1 text-amber-900/70">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-Zain">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              )}
              
              {post.tag && (
                <div className="flex items-center gap-2">
                  <TagIcon className="w-4 h-4" />
                  <span className="text-sm font-Zain">
                    {post.tag.name}
                  </span>
                </div>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-amber-900 mb-6 font-Dongle">
              {post.title}
            </h1>

            {/* Content */}
            <div 
              className="prose prose-lg prose-amber max-w-none
                prose-headings:font-Zain prose-headings:text-amber-900
                prose-p:text-amber-900/90 prose-p:font-Zain prose-p:leading-relaxed
                prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-amber-900 prose-strong:font-bold
                prose-ul:text-amber-900/90 prose-ol:text-amber-900/90
                prose-li:font-Zain prose-li:marker:text-amber-900/60
                prose-blockquote:border-amber-900/30 prose-blockquote:text-amber-900/80
                prose-code:text-amber-800 prose-code:bg-amber-50 prose-code:px-1 prose-code:rounded
                prose-pre:bg-amber-900/5 prose-pre:border prose-pre:border-amber-900/20
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}