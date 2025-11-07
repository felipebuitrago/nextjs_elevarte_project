'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `https://nextjs-elevarte-project-glbazy5nl-felipe-buitragos-projects.vercel.app/auth/callback`,
    },
  });

  if (error) {
    redirect("/error");
  }
  
  redirect(data.url);
}