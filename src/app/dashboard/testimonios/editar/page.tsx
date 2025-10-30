import EditTestimonialPage from '@/components/EditTestimonialPage';
import db from '@/lib/db'

export default async function EditTestimonial(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {

  const searchParams = await props.searchParams;

  const id = searchParams?.id || '';

  const testimonial = await db.testimonial.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      body: true,
      rating: true,
    },
  });

  if (!testimonial) {
    return <div className="p-8">Testimonio no encontrado.</div>;
  }

  return <EditTestimonialPage testimonial={testimonial} />
}