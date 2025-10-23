import BlogListView from '@/components/ui/BlogListView'
import db from '@/lib/db'

export default async function BlogPage(props: {
  searchParams?: Promise<{
    page?: string;
    tag?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const page = parseInt(searchParams?.page || '1')
  const tag = searchParams?.tag || ''
  const postsPerPage = 10

  const posts = await db.post.findMany({
    where: {
      published: true,
      ...(tag && { tag: { slug: tag } })
    },
    include: { tag: true },
    orderBy: { publishedAt: 'desc' },
    skip: (page - 1) * postsPerPage,
    take: postsPerPage
  })

  const totalPosts = await db.post.count({
    where: { published: true }
  })

  const tags = await db.tag.findMany()

  return (
    <BlogListView
      posts={posts}
      tags={tags}
      currentPage={page}
      totalPages={Math.ceil(totalPosts / postsPerPage)}
    />
  )
}