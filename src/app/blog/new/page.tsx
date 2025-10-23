import Tiptap from "@/components/Tiptap";

export default function HomePage() {
  return (
    <div className='bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589] p-20 min-h-screen'>
      <div className="justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center mb-1 mt-[-2em]">

          {/* Brand Name */}
          <h1 className="text-6xl lg:text-7xl">
            <span className="text-white font-Dongle">ELEV</span>
            <span className="text-amber-800 font-Dongle">ARTE</span>
          </h1>

        </div>
        <Tiptap />
      </div>
    </div>
  )
}

