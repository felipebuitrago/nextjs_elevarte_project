"use client";

import { createClient } from '@/utils/supabase/client'
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

const SignOutButton = () => {
  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      redirect('/')
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-4 bg-white/40 backdrop-blur-sm text-amber-900 rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
    >
      <LogOut/>
    </button>
  )
}

export default SignOutButton