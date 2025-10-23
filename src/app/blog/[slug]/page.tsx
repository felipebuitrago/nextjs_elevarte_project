import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage(props: {
  params?: Promise<{
    slug?: string;
  }>;
}) {
  
  const params = await props.params
  const slug = params?.slug || ''

  // Buscar el post por slug
  const post = await db.post.findUnique({
    where: {
      slug: slug,
      published: true
    },
    include: {
      tag: true
    }
  })

  // Si no existe, mostrar 404
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors font-Zain text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a blogs
          </Link>
          {post.content}
        </div>
      </div>
    </div>
  )
}