
export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className='bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589] min-h-screen py-12 px-4'>
        <div className="flex items-center justify-center px-6 text-center">

        {/* Brand Name */}
        <h1 className="text-8xl lg:text-9xl animate-fadeInUp">
          <span className="text-white font-Dongle">ELEV</span>
          <span className="text-amber-800 font-Dongle">ARTE</span>
        </h1>
        <p className="text-xl md:text-3xl text-amber-900/80 font-DMSans mb-5 ml-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Blog
        </p>

      </div>
      {children}
    </div>
  );
}