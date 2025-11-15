import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { PostWithTag } from '@/types';
import Link from 'next/link';
import { ArrowLeft, Calendar, TagIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import '@/assets/post-styles.css';

export default async function PostPage(props: {
  params?: Promise<{
    slug?: string;
  }>;
}) {
  const params = await props.params;
  const slug = params?.slug || '';
  
  let post: PostWithTag | null = null;

  try {
    const supabase = await createClient();
    
    // Buscar el post por slug
    const { data, error } = await supabase
      .from('Post')
      .select('*, tag:Tag(*)')
      .eq('slug', slug)
      .eq('published', true)
      .single(); // .single() lanza error si no encuentra nada

    if (error) {
      // Si es error "not found", retornar null
      if (error.code === 'PGRST116') {
        post = null;
      } else {
        throw error;
      }
    } else {
      post = data;
    }
    
  } catch (error) {
    console.error('Error fetching post:', error);
    post = null;
  }

  // Si no existe, mostrar 404
  if (!post) {
    notFound();
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
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}