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
    let selectedTagId: string | null = null;

    // Si hay filtro por tag, primero obtener el ID del tag
    if (tagSlug) {
      const { data: selectedTag, error: tagError } = await supabase
        .from('Tag')
        .select('id')
        .eq('slug', tagSlug)
        .eq('active', true)
        .single();

      if (tagError) {
        console.error('Tag not found:', tagError);
        // Tag no existe, retornar sin posts
        selectedTagId = null;
      } else {
        selectedTagId = selectedTag.id;
      }
    }

    // Query de posts con filtro por tagId si existe
    let postsQuery = supabase
      .from('Post')
      .select('*, tag:Tag(*)', { count: 'exact' })
      .eq('published', true);

    // Filtrar por tagId si hay tag seleccionado
    if (selectedTagId) {
      postsQuery = postsQuery.eq('tagId', selectedTagId);
    }

    // Ordenar y paginar
    postsQuery = postsQuery
      .order('publishedAt', { ascending: sort === 'asc' })
      .range((page - 1) * postsPerPage, page * postsPerPage - 1);

    const { data: postsData, error: postsError, count } = await postsQuery;

    if (postsError) throw postsError;

    posts = postsData ?? [];
    totalPosts = count ?? 0;

    // ✅ Obtener solo tags activos que tienen posts
    const { data: tagsData, error: tagsError } = await supabase
      .from('Tag')
      .select(`
      id,
      name,
      slug,
      active,
      createdAt,
      updatedAt
      `)
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