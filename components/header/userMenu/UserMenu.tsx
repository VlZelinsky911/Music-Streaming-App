"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabaseClient";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, [supabase]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = (emailOrName: string) =>
    emailOrName?.charAt(0).toUpperCase() || "?";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!user) {
    return (
      <>
        <Link href="/sign-up" className="hover:underline">
          Sign up
        </Link>
        <Link href="/sign-in">
          <button className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition cursor-pointer">
            Sign in
          </button>
        </Link>
      </>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <div className="relative w-12 h-12 cursor-pointer group">

        <div className="absolute inset-0 rounded-full bg-[#1a1a1a] transition duration-300 group-hover:scale-105 group-hover:shadow-md" />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-9 h-9 flex items-center justify-center cursor-pointer bg-green-500 rounded-full text-black font-bold m-auto top-1.5 
               transition duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:bg-green-600"
        >
          {getInitial(user.email || user.user_metadata?.name)}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 py-2 px-1 w-40 bg-[#282828] text-[#DFDFDF] rounded-lg shadow-lg z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-[#3a3a3a] hover:underline transition duration-150 rounded-md active:scale-95"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-[#3a3a3a] hover:underline transition duration-150 rounded-md active:scale-95"
          >
            Settings
          </Link>
          <div className="my-2 border-t border-[#444]" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-[#3a3a3a] hover:underline transition duration-150 rounded-md active:scale-95"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
