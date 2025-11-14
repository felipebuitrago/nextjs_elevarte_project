import GoogleSignInButton from '@/components/ui/GoogleSignInButton';
import Link from 'next/link';

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={`w-full max-w-md ${className ?? ""}`} {...props}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Logo o título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#d4c4b0] to-[#b8a589] rounded-full mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-DMSans text-gray-800 mb-2">
            Login
          </h1>
        </div>

        {/* Botón de Google */}
        <GoogleSignInButton />
      </div>

      {/* Link de regreso */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-md font-DMSans">Volver</span>
        </Link>
      </div>
    </div>
  );
}