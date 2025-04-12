"use client";

import Image from "next/image";

export default function SocialButton() {
  const handleGoogleLogin = () => {
		window.location.href = "http://localhost:1337/api/connect/google";
	};	

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative"
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

      <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative">
        <Image
          src="/facebook_icon.svg"
          alt="Facebook"
          className="w-6 h-6 mr-2 absolute left-6"
          width={24}
          height={24}
        />
        Sign up with Facebook
      </button>

      <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full relative">
        <Image
          src="/apple_icon.svg"
          alt="Apple"
          className="w-6 h-6 mr-2 absolute left-6"
          width={24}
          height={24}
        />
        Sign in with Apple
      </button>
    </>
  );
}
