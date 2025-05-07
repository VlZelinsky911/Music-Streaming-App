"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error.message);
        return;
      }
      setUser(data.user as SupabaseUser);
      console.log(data.user);
    };

    fetchUser();
  }, []);

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/user/${user?.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-1/3 bg-neutral-900 p-6 space-y-6">
        <h2 className="text-xl font-bold mb-4">Your Library</h2>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Create your first playlist
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            It's easy, we'll help you.
          </p>
          <button className="bg-white text-black rounded-full px-4 py-2">
            Create Playlist
          </button>
        </div>
        <div className="bg-neutral-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Browse some podcasts</h3>
          <p className="text-sm text-gray-400 mb-3">
            We'll keep you updated on new episodes.
          </p>
          <button className="bg-white text-black rounded-full px-4 py-2">
            Browse Podcasts
          </button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col">
        <div className="bg-gradient-to-b from-neutral-800 to-black p-8">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 bg-neutral-700 rounded-full flex items-center justify-center text-4xl">
              <span className="text-gray-400">👤</span>
            </div>
            <div>
              <p className="text-sm uppercase">Profile</p>
						<h1 className="text-5xl font-bold">{user?.email || "Guest"}</h1>
            </div>
          </div>
        </div>

        <div className="p-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className=" text-white text-3xl hover:text-gray-400 active:scale-90 transition-transform duration-100 cursor-pointer"
          >
            ⋯
          </button>

          {menuOpen && (
            <div className="absolute mt-2 py-2 px-1 w-48 bg-[#282828] text-[#DFDFDF] rounded-lg shadow-lg z-50">
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
                <div className="text-sm text-green-400 px-4 pt-1">
									Copied!
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="flex-grow bg-neutral-950 text-gray-400 text-sm p-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h3 className="text-white font-bold mb-2">Company</h3>
              <ul>
                <li>About</li>
                <li>Jobs</li>
                <li>For the Record</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Communities</h3>
              <ul>
                <li>For Artists</li>
                <li>For Developers</li>
                <li>For Advertisers</li>
                <li>For Investors</li>
                <li>For Vendors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Useful Links</h3>
              <ul>
                <li>Support</li>
                <li>Free Mobile App</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Spotify Plans</h3>
              <ul>
                <li>Premium Individual</li>
                <li>Premium Duo</li>
                <li>Premium Family</li>
                <li>Premium Student</li>
                <li>Spotify Free</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
