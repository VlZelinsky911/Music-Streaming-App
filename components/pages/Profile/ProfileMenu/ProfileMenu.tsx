import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Pencil } from "lucide-react";

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { userId } = useSelector((state: RootState) => state.user);

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/user/${userId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const closeMenu = () => setMenuOpen(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition duration-200 ease-in-out active:scale-95 cursor-pointer"
      >
        <Pencil className="w-4 h-4 text-white" />
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute mt-2 py-2 px-1 w-48 bg-[#282828] text-[#DFDFDF] rounded-lg shadow-lg z-50"
        >
          <Link
            href="/profile/edit"
            className="flex items-center px-4 py-2 hover:bg-[#3a3a3a] hover:underline transition duration-150 rounded-md active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5l3 3L14 13l-4 1 1-4 8.5-8.5z"
              />
            </svg>
            Edit Profile
          </Link>

          <button
            onClick={copyProfileUrl}
            className="w-full text-left flex items-center px-4 py-2 hover:bg-[#3a3a3a] hover:underline transition duration-150 rounded-md active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V7a2 2 0 00-2-2H9l-2 2H5a2 2 0 00-2 2v10a2 2 0 002 2h2z"
              />
            </svg>
            Profile URL
          </button>
          {copied && (
            <div className="text-sm text-green-400 px-4 pt-1">Copied!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
