import SignOutButton from '@/components/ui/SignOut'
import Link from 'next/link';

const options = [
  {
    title: "Tags",
    description: "Edita las tags para filtrar tus posts",
    slug: "tags",
  },
  {
    title: "Posts",
    description: "Edita y crea posts para tu blog",
    slug: "posts",
  },
  {
    title: "Ofertas",
    description: "Modifica o elimina tus ofertas",
    slug: "ofertas",
  },
  {
    title: "Testimonios",
    description: "Gestiona los testimonios de clientes",
    slug: "testimonios",
  }
];

export default async function PrivatePage() {

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className="mb-12 text-center space-y-1">
        <h1 className="text-5xl font-DMSans text-amber-900">Dashboard</h1>
      </div>
      <div className='max-w-4xl w-full justify-start mb-5'>
        <Link
          href="/"
          className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300 mt-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-DMSans">Volver a inicio</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl">
        {options.map((option, index) => {

          return (
            <Link href={`/dashboard/${option.slug}`} key={option.title + "-menu"}>
              <div
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className={`
                      relative h-full backdrop-blur-xl bg-white/40 rounded-3xl p-8
                      border border-white/50 shadow-xl
                      transition-all duration-500 ease-out
                      hover:shadow-2xl hover:scale-[1.02]
                    `}>
                  {/* Gradient border effect on hover */}
                  <div className={`
                        absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                        transition-opacity duration-500
                        bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10
                        -z-10 blur-xl
                      `} />

                  {/* Top decoration line */}
                  <div className={`
                        absolute top-0 left-8 right-8 h-[3px] rounded-full
                        bg-gradient-to-r from-[#8B4513] to-[#A0522D]
                        transform origin-left scale-x-0 group-hover:scale-x-100
                        transition-transform duration-700 ease-out
                      `} />

                  {/* Content */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="text-4xl md:text-5xl font-Dongle text-amber-900 mb-1">
                        {option.title}
                      </h3>
                    </div>

                  </div>

                  {/* Info bar */}
                  <div className="mb-6 p-4 bg-white/30 rounded-2xl border border-white/40">
                    <div>
                      <div className="text-lg text-amber-700/60 font-DMSans">{option.description}</div>
                    </div>
                  </div>

                </div>
              </div>

            </Link>
          );
        })}
      </div>
      <div className='mt-3 pt-3'>
        <SignOutButton/>
      </div>

    </div>
  )
}