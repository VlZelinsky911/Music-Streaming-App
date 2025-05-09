import React from "react";
import Link from "next/link";
import SearchBar from "../SearchBar/SearchBar";
import UserMenu from "../UserMenu/UserMenu";
import { X } from "lucide-react";
import MobileAuth from "../MobileAuth/MobileAuth";



export default function MobileMenu({ isOpen, onClose }: MobileMenu) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-gray-400 transition active:scale-95"
				data-testid="close-mobile"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      <div className="p-8">
        <MobileAuth />

        <span className="mb-3 block text-xl font-bold">―</span>

        <nav className="flex flex-col gap-4 font-medium text-sm">
          <Link href="#">Premium</Link>
          <Link href="#">Support</Link>
          <Link href="/legal/policy">Privacy Policy</Link>
          <Link href="/legal/terms">Terms</Link>
        </nav>
      </div>
    </div>
  );
}
