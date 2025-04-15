import React from "react";
import Image from "next/image";

export const metadata = {
  title: "Feature Unavailable - Spotify Pet Project",
  description:
    "We apologize for the inconvenience — this feature is currently under development. Thank you for your patience.",
  icons: {
    icon: "/spoti_logo_title.svg",
  },
};

const page = () => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-zinc-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-zinc-700">
        <div className="text-center mb-8">
          <Image
            src="/spoti_logo_white.svg"
            alt="Spotify Logo"
            className="mx-auto mb-4"
            width={60}
            height={60}
          />
          <h2 className="text-4xl font-bold tracking-wide">
            Spotify Pet Project
          </h2>
        </div>

        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <section className="bg-[#1E1E1E]/80 p-6 rounded-xl border border-zinc-700 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              🚧 Feature Under Development
            </h3>
            <p>
              We’re sorry, but this feature is currently under development.
              <br />
              Our team is working hard to make it available as soon as possible.
              <br />
              Thank you for your patience and understanding! 🙏
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
