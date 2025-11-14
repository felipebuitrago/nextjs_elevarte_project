import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/ui/LoginForm';

export default async function LoginPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    redirect('/dashboard');
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4c4b0] via-[#c9b59a] to-[#b8a589] flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}