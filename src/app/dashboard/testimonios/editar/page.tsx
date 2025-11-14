import EditTestimonialPage from '@/components/EditTestimonialPage';
import { Testimonial } from '@/types';
import { createClient } from '@/utils/supabase/server';

export default async function EditTestimonial(props: {
  searchParams?: Promise<{
    id?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const supabase = await createClient()

  const id = searchParams?.id || '';

  let testimonial: Testimonial | null = null;
  
  try {
    testimonial = await supabase
    .from('Testimonial')
    .select('*')
    .eq('id', id)
    .single()
    .then(({ data }) => data);
      
  } catch (error) {
    console.error(error);
  }

  if (!testimonial) {
    return <div className="p-8">Testimonio no encontrado.</div>;
  }

  return <EditTestimonialPage testimonial={testimonial} />
}