import Settings from "../../../../components/pages/Settings/Settings";
import Image from "next/image";
import { createSupabaseServerClient } from "../../../../lib/supabaseServerClient";

export const metadata = {
  title: "Wavely - Settings",
  description:
    "Manage your Wavely preferences: playback, account, appearance and more.",
  icons: {
    icon: "/wavely_logo_title.svg",
  },
};

export default async function SettingsPage() {
	const supabase = createSupabaseServerClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-zinc-800/60 backdrop-blur-md my-4 p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-zinc-700">
        <div className="text-center mb-8">
          <Image
            src="/wavely_logo_white.png"
            alt="Wavely Logo"
            className="mx-auto mb-3"
            width={48}
            height={48}
          />
          <h2 className="text-3xl font-bold tracking-wide">Settings</h2>
          <p className="text-sm text-gray-400 mt-1">
            Customize your experience
          </p>
        </div>
        <Settings user={user}/>
      </div>
    </div>
  );
}
