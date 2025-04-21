"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import UserMenu from "./userMenu/UserMenu";
import InputSearch from "./inputSearch/inputSearch";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-black text-white">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/wawely.png"
            alt="Logo"
            className="w-10 h-10"
            width={40}
            height={40}
          />
        </Link>
				
        <InputSearch/>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="#" className="hover:underline">
          Premium
        </Link>
        <Link href="#" className="hover:underline">
          Support
        </Link>
        <span className="text-gray-600">|</span>
				
        <UserMenu/>

      </div>
    </header>
  );
}
