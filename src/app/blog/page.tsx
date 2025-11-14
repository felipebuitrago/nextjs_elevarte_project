// app/blog/page.tsx
import BlogListView from '@/components/ui/BlogListView'
import { createClient } from '@/utils/supabase/server'
import { PostWithTag, Tag } from '@/types/'

export default async function BlogPage(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
    sort?: string;
  }>;
}) {
  const supabase = await createClient();
  const searchParams = await props.searchParams;
  
  const page = parseInt(searchParams?.page || '1');
  const tagSlug = searchParams?.tag || '';
  const sort = searchParams?.sort || 'desc';
  const postsPerPage = 5;
  
  let posts: PostWithTag[] = [];
  let tags: Tag[] = [];
  let totalPosts = 0;
  let error = null;

  try {
    // Query base para posts
    let postsQuery = supabase
      .from('Post')
      .select('*, tag:Tag(*)', { count: 'exact' })
      .eq('published', true)
      .order('publishedAt', { ascending: sort === 'asc' })
      .range((page - 1) * postsPerPage, page * postsPerPage - 1);

    // Filtro por tag si existe
    if (tagSlug) {
      postsQuery = postsQuery.eq('tag.slug', tagSlug);
    }

    const { data: postsData, error: postsError, count } = await postsQuery;

    if (postsError) throw postsError;

    posts = postsData ?? [];
    totalPosts = count ?? 0;

    // Obtener todos los tags
    const { data: tagsData, error: tagsError } = await supabase
      .from('Tag')
      .select('*')
      .eq('active', true)
      .order('name');

    if (tagsError) throw tagsError;

    tags = tagsData ?? [];

  } catch (e) {
    console.error('Error fetching blog data:', e);
    error = "Failed to fetch data";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BlogListView
      posts={posts}
      tags={tags}
      currentPage={page}
      totalPages={Math.ceil(totalPosts / postsPerPage)}
      currentSort={sort}
    />
  );
}