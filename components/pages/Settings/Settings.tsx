"use client";

import { use, useEffect, useState } from "react";
import SettingToggle from "./SettingsToggle/SettingsToggle";
import SettingItem from "./SettingItem/SettingItem";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import Loading from "../../auth/loading/Loading";
import DeleteModal from "./Modal/DeleteModal";
import PasswordModal from "./Modal/PasswordModal";

export default function SettingsPage({ user }: SettingProps) {
  const [explicitContent, setExplicitContent] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      await supabase.auth.signOut();
      router.push("/");

      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setShow2FA(true);
  };
  const handleChangePassword = async () => {
    setShowPasswordModal(true);
  };

  const handle2FAUpdate = () => {
    router.push("legal/inProgress");
  };

  if (!user || isPageLoading) return <Loading />;

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
          <SettingItem label="Email" value={user?.email || "Guest"} />
          <SettingItem label="Delete profile" handleUpdate={handleUpdate} />
          <SettingItem label="2FA" handle2FAUpdate={handle2FAUpdate} />
          <SettingItem
            label="Change password"
            handleChangePassword={handleChangePassword}
          />
        </div>
      </section>

      {show2FA && (
        <DeleteModal
          setIsOpen={setShow2FA}
          loading={loading}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}

      {showPasswordModal && (
        <PasswordModal 
				setShowPasswordModal={setShowPasswordModal} 
				/>
      )}
    </>
  );
}
