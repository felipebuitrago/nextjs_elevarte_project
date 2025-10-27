"use client";
import { signInWithGoogle } from "@/lib/auth-actions";

const GoogleSignInButton = () => {
  return (
    <button
      type="button"
      className="w-full border border-gray-300 text-gray-700 bg-transparent rounded-md px-4 py-2 hover:bg-gray-50"
      onClick={() => {
        signInWithGoogle();
      }}
    >
      Login with Google
    </button>
  );
};

export default GoogleSignInButton;