import React from "react";
import Image from "next/image";

const NoTracksFound = () => {
  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className="bg-zinc-800/60 backdrop-blur-md px-5 py-3 sm:p-10 rounded-2xl shadow-2xl w-full max-w-xl border border-zinc-700">
        <div className="text-center mb-8">
          <Image
            src="/wavely_logo_white.png"
            alt="Wavely Logo"
            className="mx-auto mb-4"
            width={60}
            height={60}
          />
          <h2 className="text-2xl sm:text-4xl font-bold tracking-wide">
            Wavely Pet Project
          </h2>
        </div>

        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <section className="bg-[#1E1E1E]/80 p-6 rounded-xl border border-zinc-700 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              🎧 No tracks listened to
            </h3>
            <p>
              You haven't listened to any tracks yet. Come back later or add
              tracks to your playlist!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NoTracksFound;
