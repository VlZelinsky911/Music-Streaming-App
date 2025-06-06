"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../lib/supabaseClient";
import { ChevronDown } from "lucide-react";

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
  }, []);

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
      <div className="flex gap-2 items-center">
        <Link href="/sign-up" className="hover:underline text-white/90">
          Sign up
        </Link>
        <Link href="/sign-in">
          <button className="bg-[#1DB954] text-black px-4 py-1.5 rounded-full hover:bg-[#1ed760] transition cursor-pointer font-semibold">
            Sign in
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#191414] text-white hover:bg-neutral-800 transition cursor-pointer group"
        aria-label="User menu"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1DB954] to-[#1ed760] flex items-center justify-center text-black font-bold overflow-hidden">
          <span className="text-sm select-none">
            {getInitial(user.email || user.user_metadata?.name)}
          </span>
        </div>
        <span className="text-sm font-semibold truncate max-w-[100px]">
          {user.email?.split("@")[0] || "User"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-3 py-2 w-48 bg-[#191414] bg-opacity-95 backdrop-blur-md text-white rounded-xl shadow-2xl z-50 border border-[#222] transition-all duration-200 animate-fade-in">
          <Link
            href="/profile"
            className="block px-5 py-2 hover:bg-neutral-800 rounded-lg transition font-medium active:scale-95"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-5 py-2 hover:bg-neutral-800 rounded-lg transition font-medium active:scale-95"
          >
            Settings
          </Link>
          <div className="my-2 border-t border-[#333]" />
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-400 px-5 py-2 hover:bg-neutral-800 hover:text-red-500 rounded-lg transition font-medium active:scale-95"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
