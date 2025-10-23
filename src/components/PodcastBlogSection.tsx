"use client";
import { useEffect, useRef, useState } from 'react';
import { Podcast, BookOpen, Play, Calendar, Headphones, FileText } from 'lucide-react';

const podcasts = [
  {
    id: 'podcast-1',
    title: 'El poder de la intuición',
    description: 'Aprende a escuchar tu voz interior y diferenciar la intuición del miedo',
    date: '15 Oct 2024',
    duration: '28 min',
    platform: 'spotify',
    thumbnail: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
  },
  {
    id: 'podcast-2',
    title: 'Reiki para principiantes',
    description: 'Todo lo que necesitas saber antes de iniciar tu formación en Reiki',
    date: '8 Oct 2024',
    duration: '35 min',
    platform: 'youtube',
    thumbnail: 'linear-gradient(135deg, #C19A6B 0%, #D4A574 100%)'
  },
  {
    id: 'podcast-3',
    title: 'Sanación emocional',
    description: 'Cómo liberar heridas del pasado y abrirte a nuevas oportunidades',
    date: '1 Oct 2024',
    duration: '42 min',
    platform: 'spotify',
    thumbnail: 'linear-gradient(135deg, #A0522D 0%, #CD853F 100%)'
  }
];

const blogPosts = [
  {
    id: 'blog-1',
    title: '5 señales de que necesitas una limpieza energética',
    excerpt: 'Descubre si tu hogar o espacio de trabajo necesita una purificación energética para recuperar la armonía...',
    date: '12 Oct 2024',
    readTime: '5 min',
    category: 'Energía',
    thumbnail: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 100%)'
  },
  {
    id: 'blog-2',
    title: 'Meditación diaria: Una práctica transformadora',
    excerpt: 'Cómo comenzar una rutina de meditación y los beneficios que experimentarás en tu vida diaria...',
    date: '5 Oct 2024',
    readTime: '7 min',
    category: 'Meditación',
    thumbnail: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
  },
  {
    id: 'blog-3',
    title: 'Diferencias entre Coaching Personal y Spiritual',
    excerpt: 'Entiende cuál es el camino adecuado para ti según tus necesidades y momento actual...',
    date: '28 Sep 2024',
    readTime: '6 min',
    category: 'Coaching',
    thumbnail: 'linear-gradient(135deg, #C19A6B 0%, #D4A574 100%)'
  }
];

export default function PodcastBlogSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const podcastsRef = useRef<(HTMLDivElement | null)[]>([]);
  const blogsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredPodcast, setHoveredPodcast] = useState<string | null>(null);
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate podcasts
            podcastsRef.current.forEach((card: HTMLElement | null, i) => {
              if (!(card instanceof HTMLElement)) return;
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(80px) scale(0.9)';
                
                setTimeout(() => {
                  card.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, 200 + (i * 150));
              }
            });

            // Animate blogs
            blogsRef.current.forEach((card: HTMLElement | null, i) => {
              if (!(card instanceof HTMLElement)) return;
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(80px) scale(0.9)';
                
                setTimeout(() => {
                  card.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, 400 + (i * 150));
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id='content-section'
      className="relative min-h-screen py-20 px-4 md:px-8"
    >

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
            Contenido
          </h2>
          
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Podcasts Column */}
          <div>
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#8B4513]/15 to-[#A0522D]/15 border border-white/50">
                <Podcast className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="text-2xl font-DMSans font-bold text-[#8B4513]">Podcast</h3>
                <p className="text-sm text-amber-700/70">Escucha en Spotify & YouTube</p>
              </div>
            </div>

            {/* Podcasts List */}
            <div className="space-y-4">
              {podcasts.map((podcast, index) => (
                <div
                  key={podcast.id}
                  ref={(el) => { podcastsRef.current[index] = el; }}
                  onMouseEnter={() => setHoveredPodcast(podcast.id)}
                  onMouseLeave={() => setHoveredPodcast(null)}
                  className="group relative cursor-pointer"
                >
                  <div className={`
                    relative backdrop-blur-xl bg-white/40 rounded-3xl p-6
                    border border-white/50 shadow-xl
                    transition-all duration-500 ease-out
                    ${hoveredPodcast === podcast.id ? 'shadow-2xl scale-[1.02]' : ''}
                  `}>
                    {/* Gradient glow on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-xl" />

                    {/* Top decoration line */}
                    <div className="absolute top-0 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div 
                        className="relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50"
                        style={{ background: podcast.thumbnail }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <Play className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-Zain text-[#8B4513] mb-2 group-hover:text-[#A0522D] transition-colors">
                          {podcast.title}
                        </h4>
                        <p className="text-sm text-[#8B4513]/70 mb-3 line-clamp-2 font-DMSans">
                          {podcast.description}
                        </p>
                        
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-[#8B4513]/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{podcast.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Headphones className="w-3 h-3" />
                            <span>{podcast.duration}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/20 capitalize">
                            {podcast.platform}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* View all podcasts */}
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-white/40 backdrop-blur-sm text-[#8B4513] rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                <Podcast className="w-4 h-4" />
                Ver todos los episodios
              </button>
            </div>
          </div>

          {/* Blog Column */}
          <div>
            {/* Column Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-[#C19A6B]/15 to-[#D4A574]/15 border border-white/50">
                <BookOpen className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="text-2xl font-DMSans font-bold text-[#8B4513]">Blog</h3>
                <p className="text-sm text-amber-700/70">Últimos artículos publicados</p>
              </div>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  ref={(el) => { blogsRef.current[index] = el; }}
                  onMouseEnter={() => setHoveredBlog(post.id)}
                  onMouseLeave={() => setHoveredBlog(null)}
                  className="group relative cursor-pointer"
                >
                  <div className={`
                    relative backdrop-blur-xl bg-white/40 rounded-3xl p-6
                    border border-white/50 shadow-xl
                    transition-all duration-500 ease-out
                    ${hoveredBlog === post.id ? 'shadow-2xl scale-[1.02]' : ''}
                  `}>
                    {/* Gradient glow on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10  -z-10 blur-xl" />

                    {/* Top decoration line */}
                    <div className="absolute top-0 left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-[#C19A6B] to-[#D4A574] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div 
                        className="relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50"
                        style={{ background: post.thumbnail }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <FileText className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <span className="text-sm px-2 py-1 rounded-full bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/20 font-Zain">
                            {post.category}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-Zain text-[#8B4513] mb-2 group-hover:text-[#A0522D] transition-colors">
                          {post.title}
                        </h4>
                        
                        <p className="text-sm text-[#8B4513]/70 mb-3 line-clamp-2 font-DMSans">
                          {post.excerpt}
                        </p>
                        
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-[#8B4513]/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{post.readTime} lectura</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* View all posts */}
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-white/40 backdrop-blur-sm text-[#8B4513] rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Ver todos los artículos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}