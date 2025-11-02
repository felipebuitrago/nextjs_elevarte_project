import BlogListView from '@/components/ui/BlogListView'
import db from '@/lib/db'

export default async function BlogPage(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
    sort?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const page = parseInt(searchParams?.page || '1')
  const tag = searchParams?.tag || ''
  const sort = searchParams?.sort || 'desc'
  const postsPerPage = 5

  const posts = await db.post.findMany({
    where: {
      published: true,
      ...(tag && { tag: { slug: tag } })
    },
    include: { tag: true },
    orderBy: { publishedAt: sort === 'asc' ? 'asc' : 'desc' },
    skip: (page - 1) * postsPerPage,
    take: postsPerPage
  })

  const totalPosts = await db.post.count({
    where: { 
      published: true,
      ...(tag && { tag: { slug: tag } })
    }
  })

  const tags = await db.tag.findMany()

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