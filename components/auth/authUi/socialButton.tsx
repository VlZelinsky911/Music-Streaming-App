"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { useEffect } from "react";
import ToasterCustom from "../ToasterCustom/ToasterCustom";
import toast from "react-hot-toast";

export default function SocialButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });

    if (error) console.error("Google sign-in error:", error.message);
  };

  const handleDiscordSignIn = async () => {
		console.log("Discord sign-in not implemented yet.");
  };

  const handleGithubSignIn = async () => {
    console.log("Github sign-in not implemented yet.");
  };

  return (
    <>
      <button
        className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative"
        onClick={handleGoogleSignIn}
      >
        <Image
          src="/google_icon.svg"
          alt="Google"
          className="w-6 h-6 mr-2 absolute left-6"
          width={24}
          height={24}
        />
        Sign up with Google
      </button>

      <button
        className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative"
        onClick={handleDiscordSignIn}
      >
        <Image
          src="/discord_icon.svg"
          alt="Discord"
          className="w-6 h-6 mr-2 absolute left-6"
          width={24}
          height={24}
        />
        Sign up with Discord
      </button>

      <button
        className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full relative"
        onClick={handleGithubSignIn}
      >
        <Image
          src="/github_icon.svg"
          alt="Github"
          className="w-6 h-6 mr-2 absolute left-6"
          width={24}
          height={24}
        />
        Sign in with Github
      </button>
    </>
  );
}
