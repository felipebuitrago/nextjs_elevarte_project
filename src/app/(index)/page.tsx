import AboutMeSection from "@/components/AboutMeSection";
import CoursesSection from "@/components/CoursesSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import PodcastBlogSection from "@/components/PodcastBlogSection";
import ServiceSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DockNavigation from "@/components/ui/DockNavigation";
import db from "@/lib/db";

export default async function HomePage() {

  const testimonials = await db.testimonial.findMany();

  return (
    <div className='bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589]'>
      <DockNavigation />

      <HeroSection />
      <AboutMeSection />
      <ServiceSection />
      <CoursesSection />
      <TestimonialsSection testimonials={testimonials}/>
      <PodcastBlogSection />
      <FooterSection />
    </div>
  )
}