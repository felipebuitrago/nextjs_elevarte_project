import EditTestimonialPage from '@/components/EditTestimonialPage';
import db from '@/lib/db'
import { Testimonial } from '../page';

export default async function EditTestimonial(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const id = searchParams?.id || '';

  let testimonial: Testimonial | null = null;
  
  try {
    testimonial = await db.testimonial.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        body: true,
        rating: true,
        published: true
      },
    });
  } catch (error) {
    console.error(error);
  }

  if (!testimonial) {
    return <div className="p-8">Testimonio no encontrado.</div>;
  }

  return <EditTestimonialPage testimonial={testimonial} />
}