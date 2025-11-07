import Tiptap from "@/components/Tiptap";
import db from "@/lib/db";
import Link from "next/link";

export default async function HomePage() {

  let tags : { id: string; name: string; }[] = [];
  try {
    tags = await db.tag.findMany();
  } catch (error) {
    console.error(error);
  }

  return (
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
          <h1 className="text-5xl font-Dongle text-amber-900">Nuevo Post</h1>
          <p className="text-lg text-amber-700/60 font-DMSans">Crea un nuevo post para tu blog</p>
        </div>
        <div className="justify-center">

          <Tiptap tags={tags}/>
        </div>
      </div>
    </div>
  )
}

