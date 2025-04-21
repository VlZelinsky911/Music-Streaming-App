'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpHeader: React.FC = () => {
  const pathname = usePathname();
  const stepMap: Record<string, number> = {
    "/sign-up/password": 1,
    "/sign-up/about": 2,
    "/sign-up/register": 3,
  };

  const step = stepMap[pathname] || 1;
  const totalSteps = 3;
  const targetProgress = step / totalSteps;

  const [animatedProgress, setAnimatedProgress] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("signUpProgress");
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(targetProgress);
      localStorage.setItem("signUpProgress", targetProgress.toString());
    }, 50);
    return () => clearTimeout(timeout);
  }, [targetProgress]);

  return (
    <div className="flex flex-col items-center justify-center pt-6 bg-black">
      <Image
        src="/wavely_logo_white.png"
        alt="Wavely Logo"
        width={50}
        height={50}
        className="mb-4"
      />
      <div className="w-full max-w-md h-[2px] bg-gray-600 relative">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-700 ease-out"
          style={{ width: `${animatedProgress * 100}%` }}
        />
      </div>
    </div>
  );
};
export default SignUpHeader;
