import { Tag } from '@/app/blog/page';
import EditPostPage from '@/components/EditPostPage';
import db from '@/lib/db'
import Link from 'next/link';

export default async function EditPost(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const id = searchParams?.id || '';

  let tags: Tag[] = [];
  let post: Post | null = null;

  try {
    tags = await db.tag.findMany();
    post = await db.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        tagId: true,
        content: true,
        excerpt: true,
        published: true,
        publishedAt: true
      },
    });
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

interface Post {
  id: string,
  title: string,
  slug: string,
  coverImage: string | null,
  tagId: string | null,
  content: string,
  excerpt: string | null,
  published: boolean,
  publishedAt: Date | null,
}