import BlogListView from '@/components/ui/BlogListView'
import db from '@/lib/db'

export default async function BlogPage(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
    sort?: string;
  }>;
}) {

  let error = null
  let posts: Post[] = []
  let tags: Tag[] = []
  let page = 1
  let totalPosts = 0
  const postsPerPage = 5
  let sort = 'desc'
  const searchParams = await props.searchParams;

  try {

    page = parseInt(searchParams?.page || '1')
    const tag = searchParams?.tag || ''
    sort = searchParams?.sort || 'desc'

    posts = await db.post.findMany({
      where: {
        published: true,
        ...(tag && { tag: { slug: tag } })
      },
      include: { tag: true },
      orderBy: { publishedAt: sort === 'asc' ? 'asc' : 'desc' },
      skip: (page - 1) * postsPerPage,
      take: postsPerPage
    })

    totalPosts = await db.post.count({
      where: {
        published: true,
        ...(tag && { tag: { slug: tag } })
      }
    })

    tags = await db.tag.findMany()
  } catch (e) {
    console.error(e)
    error = "failed to fetch data"
  }


  return (
    <BlogListView
      posts={posts}
      tags={tags}
      currentPage={page}
      totalPages={Math.ceil(totalPosts / postsPerPage)}
      currentSort={sort}
    />
  )
}

interface Tag {
  id: string
  name: string
  slug: string
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  publishedAt: Date | null
  tag: Tag | null
}