"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu/UserMenu";
import Navigation from "./Navigation/navigation";
import SearchBar from "./SearchBar/SearchBar";
import { supabase } from "../../lib/supabaseClient";
import Loading from "../auth/loading/Loading";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu/MobileMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-1 w-full bg-black text-white md:hidden">
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

      <div className="md:hidden flex items-center">
        <button
          className="text-white active:scale-95"
          data-testid="menu-button"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
