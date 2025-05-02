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

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error getting user: ", error.message);
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(!!user);
        }
      } catch (err) {
        console.error("Error in useEffect:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

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

        {!isLoggedIn && (
          <div className="hidden sm:flex">
            <SearchBar />
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button
          className="text-white"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="ml-4 hidden lg:block">
        {isLoggedIn ? <Navigation /> : <div className="flex-1" />}
      </div>

      <div className="hidden md:flex items-center min-w-[200px] justify-end gap-6 text-sm font-medium">
        <Link href="#" className="hover:underline">
          Premium
        </Link>
        <Link href="https://t.me/wawelySupport" target="_blank" className="hover:underline">
          Support
        </Link>
        <span className="text-gray-600">|</span>

        <UserMenu />
      </div>
    </header>
  );
}
