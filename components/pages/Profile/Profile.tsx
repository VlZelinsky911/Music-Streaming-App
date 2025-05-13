"use client";

import React from "react";
import ProfilPhoto from "./ProfilPhoto/ProfilPhoto";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import { useUserAvatar } from "../../../hooks/useUserAvatar";
import Loading from "../../auth/loading/Loading";

export default function ProfilePage() {
  const { username } = useSelector((state: RootState) => state.user);


  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="hidden md:block w-1/3 bg-neutral-900 p-6 space-y-6 ">
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

      <div className="w-full md:w-2/3 flex flex-col">
        <div className="bg-gradient-to-b from-neutral-800 to-black p-8">
          <div className="flex items-center space-x-6">
            <ProfilPhoto />
            <div>
              <p className="text-sm uppercase">Profile</p>
              <h1 className="text-2xl md:text-4xl font-bold">
                {username || "Guest"}
              </h1>
            </div>
          </div>
        </div>

        <ProfileMenu />

        <footer className="flex-grow bg-neutral-950 text-gray-400 text-sm p-6">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4">
            <div>
              <h3 className="text-sm sm:text-base text-white font-bold mb-2">
                Company
              </h3>
              <ul className="text-sm sm:text-base">
                <li>About</li>
                <li>Jobs</li>
                <li>For the Record</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base text-white font-bold mb-2">
                Communities
              </h3>
              <ul className="text-sm sm:text-base">
                <li>For Artists</li>
                <li>For Developers</li>
                <li>For Advertisers</li>
                <li>For Investors</li>
                <li>For Vendors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base text-white font-bold mb-2">
                Useful Links
              </h3>
              <ul className="text-sm sm:text-base">
                <li>Support</li>
                <li>Free Mobile App</li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <h3 className="text-white font-bold mb-2">Wawely Plans</h3>
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
