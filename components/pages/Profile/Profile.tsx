"use client";

import React from "react";
import ProfilPhoto from "./ProfilPhoto/ProfilPhoto";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { Twitter } from "lucide-react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";

import Link from "next/link";

export default function ProfilePage() {
  const { username } = useSelector((state: RootState) => state.user);
  
  const stats = [
    { label: "Playlists", value: 12 },
    { label: "Followers", value: 34 },
    { label: "Following", value: 7 },
    { label: "Liked Songs", value: 56 },
  ];

  const recentlyPlayed = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      cover: "/covers/cover1.svg",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      cover: "/covers/cover2.svg",
    },
    { title: "Levitating", artist: "Dua Lipa", cover: "/covers/cover3.svg" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="w-full flex justify-center">
        <div className="w-full bg-gradient-to-b from-green-500/80 to-black p-8 rounded-b-3xl shadow-lg mb-6">
          <div className="flex items-center space-x-6">
            <ProfilPhoto />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm uppercase text-white/70">Profile</p>

                <ProfileMenu />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold">
                {username || "Guest"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl flex justify-around mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
          <div className="flex gap-4 overflow-x-auto">
            {recentlyPlayed.map((track) => (
              <div
                key={track.title}
                className="bg-neutral-900 rounded-lg p-3 flex flex-col items-center min-w-[120px] hover:scale-95 transition"
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-20 h-20 rounded mb-2 shadow"
                />
                <div className="text-sm font-medium truncate">
                  {track.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {track.artist}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-grow" />

      <footer className="w-full relative mt-8">
        <div className="absolute -top-8 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1200 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16"
          >
            <path
              d="M0 40 Q 300 80 600 40 T 1200 40 V80 H0 V40Z"
              fill="#18181b"
              opacity="0.8"
            />
          </svg>
        </div>

        <div className="relative z-10 bg-neutral-950 bg-opacity-95 backdrop-blur-md text-gray-400 text-sm py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
            <div className="text-lg font-semibold text-white mb-2">
              Let the music play!
            </div>

            <div className="flex gap-6 mb-2">
              <Link
                href="#"
                className="hover:text-green-400 transition"
                aria-label="Instagram"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="hover:text-green-400 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="hover:text-green-400 transition"
                aria-label="Youtube"
              >
                <FaTelegramPlane className="w-6 h-6" />
              </Link>
            </div>

            <div className="flex gap-8 mb-2">
              <Link
                href="/legal/privacy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
              <a
                href="mailto:support@wawely.com"
                className="hover:text-white transition"
              >
                Contact Us
              </a>
            </div>

            <div className="text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} Wawely. All rights reserved.
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-2 px-4 py-1 rounded-full bg-green-600/80 text-white text-xs font-semibold hover:bg-green-500 transition"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
