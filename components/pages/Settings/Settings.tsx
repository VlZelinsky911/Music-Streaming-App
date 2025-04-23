"use client";

import { useState } from "react";

import SettingToggle from "./SettingsToggle/SettingsToggle";
import SettingItem from "./SettingItem/SettingItem";
import router, { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [explicitContent, setExplicitContent] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    setLoading(true);

    const res = await fetch("/api/delete-account", { method: "POST" });

    if (res.ok) {
      alert("Account deleted.");
      router.push("/");
    } else {
      toast.error("Failed to delete account.");
    }

    setLoading(false);
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
          <SettingItem label="Email" value="your@email.com" />
          <SettingItem label="Delete profile" onDelete={handleDelete}/>
        </div>
      </section>
    </>
  );
}
