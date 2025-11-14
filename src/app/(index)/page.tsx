import AboutMeSection from "@/components/AboutMeSection";
import CoursesSection from "@/components/CoursesSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import PodcastBlogSection from "@/components/PodcastBlogSection";
import ServiceSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DockNavigation from "@/components/ui/DockNavigation";
import { PostWithTag } from "@/types";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {

  const supabase = await createClient();
    
  // ✅ Testimonials
  const { data: testimonials, error: testimonialsError } = await supabase
    .from('Testimonial') // Nombre de tu tabla (verifica en Supabase)
    .select('*')
    .eq('published', true);
  
  // ✅ Posts con relación de tag
  const { data: posts, error: postsError } = await supabase
    .from('Post')
    .select(`
      *,
      tag:Tag(*)
    `)
    .eq('published', true)
    .order('publishedAt', { ascending: false })
    .limit(3);
  
  if (postsError) console.error('Error fetching posts:', postsError);
  if (testimonialsError) console.error('Error fetching testimonials:', testimonialsError);
  
  const safeTestimonials: any[] = testimonials ?? [];
  const safePosts: PostWithTag[] = posts ?? [];

  return (
    <div className='bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589]'>
      <DockNavigation />

      <HeroSection />
      <AboutMeSection />
      <ServiceSection />
      <CoursesSection />
      <TestimonialsSection testimonials={safeTestimonials} />
      <PodcastBlogSection posts={safePosts}/>
      <FooterSection />
    </div>
  )
}