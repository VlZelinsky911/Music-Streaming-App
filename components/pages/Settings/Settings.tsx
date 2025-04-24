"use client";

import { useEffect, useState } from "react";
import SettingToggle from "./SettingsToggle/SettingsToggle";
import SettingItem from "./SettingItem/SettingItem";
import router from "next/router";
import toast from "react-hot-toast";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

export default function SettingsPage() {
  const [explicitContent, setExplicitContent] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Not authorized");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("email, username, birth_date, gender")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error loading profile", profileError.message);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setIsOpen(true);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Not authorized");
      }

      // Delete user's profile
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) {
        throw profileError;
      }

      // Delete user's account using the correct method
      const { error: deleteError } = await supabase.rpc("delete_user");

      if (deleteError) {
        throw deleteError;
      }

      // Sign out the user
      await supabase.auth.signOut();

      // Redirect to home page
      router.push("/");

      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <section className="bg-[#1E1E1E]/70 p-6 rounded-xl border border-zinc-700 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">🎧 Playback</h3>
        <div className="space-y-4">
          <SettingToggle
            label="Allow explicit content"
            enabled={explicitContent}
            setEnabled={setExplicitContent}
          />
          <SettingToggle
            label="Enable dark mode"
            enabled={darkMode}
            setEnabled={setDarkMode}
          />
        </div>
      </section>

      <section className="bg-[#1E1E1E]/70 p-6 rounded-xl border border-zinc-700">
        <h3 className="text-lg font-semibold text-white mb-4">👤 Account</h3>
        <div className="flex flex-col gap-4">
          <SettingItem label="Subscription Plan" value="Premium" />
          <SettingItem label="Email" value={profile?.email} />
          <SettingItem label="Delete profile" handleUpdate={handleUpdate} />
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 backdrop-blur-lg transition-all"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-zinc-800/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/wavely_logo_white.png"
              alt="Wavely Logo"
              className="mx-auto mb-4"
              width={60}
              height={60}
              priority
            />
            <h2 className="text-3xl font-bold tracking-wide text-white text-center">
              Delete Account
            </h2>
            <p className="text-sm text-gray-400 mt-1 text-center">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-between mt-6 w-full max-w-sm">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-300 hover:text-gray-200 font-medium px-5 py-2 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-500 hover:text-red-400 font-medium px-5 py-2 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
