import React from "react";
import Image from "next/image";

export const metadata = {
  title: "Confirm Your Email - Spotify Clone",
  description:
    "Complete your registration by confirming your email. We've sent you a link – check your inbox and get started with your Spotify-style experience.",
  icons: {
    icon: "/spoti_logo_title.svg",
  },
};

const page = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-zinc-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700">
        <div className="text-center mb-6">
          <Image
            src="/spoti_logo_white.svg"
            alt="Spotify Logo"
            className="mx-auto mb-3"
            width={48}
            height={48}
          />
          <h2 className="text-3xl font-bold tracking-wide">Spotify</h2>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
          <h3 className="text-base leading-relaxed bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
            You're just one step away from completing your registration. Check your inbox for the confirmation email we just sent you via Supabase.
            Click the <strong>"Confirm Email"</strong> button in the message to finalize your sign-up.
          </h3>

          <p className="text-sm text-gray-300 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
            Once confirmed, you'll be redirected to the login page where you can enter your credentials (email / password).
          </p>

          <p className="text-sm text-gray-300 bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700 mb-6">
            Didn't receive the email? Try refreshing your inbox or checking your spam folder.
          </p>

          <a
            href="https://support.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-green-400 underline text-sm hover:text-green-300 transition"
          >
            Need help? Our friendly support team is here to assist you with any questions you may have.
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
