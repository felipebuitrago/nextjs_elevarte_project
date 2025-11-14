import { Post, Tag } from '@/types';
import EditPostPage from '@/components/EditPostPage';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function EditPost(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const supabase = await createClient()
  const id = searchParams?.id || '';

  let tags: Tag[] = [];
  let post: Post | null = null;

  try {
    const { data: dataTags, error } = await supabase
      .from('Tag')
      .select('*')
      .eq('active', true)
      .order('name', { ascending: true });
    tags = dataTags ?? [];
    
    const { data: dataPost, error: postError } = await supabase
      .from('Post')
      .select('*')
      .eq('id', id)
      .single();
    post = dataPost;
    
    if (error) throw error;
    if (postError) throw postError;
    
  } catch (error) {
    console.error(error);
  }

  if (!post) {
    return <div className="p-8">Post no encontrado.</div>;
  }

  return (
    <>

      <div className='p-8'>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/dashboard/posts"
            className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-lg font-DMSans">Descartar y Volver</span>
          </Link>
        </div>

        <div className='max-w-6xl mx-auto'>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-Dongle text-amber-900">Editar Post</h1>
          </div>
          <div className="justify-center">

            <EditPostPage post={{ ...post, coverImage: post.coverImage ?? '', excerpt: post.excerpt ?? '' }} tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
}