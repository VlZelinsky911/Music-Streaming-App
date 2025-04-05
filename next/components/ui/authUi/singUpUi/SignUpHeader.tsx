'use client';

import Image from 'next/image';

export default function SignUpHeader({ progress = 0.33 }) {
  return (
    <div className="flex flex-col items-center justify-center pt-6 bg-black">
      <Image src="/spoti_logo_white.svg" alt="Spotify Logo" width={50} height={50} className="mb-4" />

      <div className="w-full max-w-md h-[2px] bg-gray-600 relative">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
