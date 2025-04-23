"use client";

import Image from "next/image";
import Link from "next/link";
import UserMenu from "./userMenu/UserMenu";
import Navigation from "./navigation/navigation";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 w-full bg-black text-white">
      <div className="flex items-center gap-4 min-w-[150px]">
        <Link href="/">
          <Image
            src="/wawely.png"
            alt="Logo"
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </Link>
      </div>

      <Navigation />

      <div className="flex items-center min-w-[200px] justify-end gap-6 text-sm font-medium">
        <Link href="#" className="hover:underline">
          Premium
        </Link>
        <Link href="#" className="hover:underline">
          Support
        </Link>
        <span className="text-gray-600">|</span>

        <UserMenu />
      </div>
    </header>
  );
}
