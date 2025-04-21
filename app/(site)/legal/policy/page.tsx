import React from "react";
import Image from "next/image";

export const metadata = {
	title: "Privacy Policy - Wavely",
	description:
		"Read our privacy policy and terms of service for the Spotify-style pet project. Transparency and user trust come first.",
	icons: {
		icon: "/wavely_logo_title.svg",
	},
};


const page = () => {
	return (
		<div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 min-h-screen flex items-center justify-center px-4 text-white">
			<div className="bg-zinc-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-zinc-700">
				<div className="text-center mb-6">
					<Image
						src="/wavely_logo_white.png"
						alt="Wavely Logo"
						className="mx-auto mb-3"
						width={48}
						height={48}
					/>
					<h2 className="text-3xl font-bold tracking-wide">Wavely</h2>
					<p className="text-sm text-gray-400 mt-1">Privacy Policy of Service</p>
				</div>

				<div className="max-h-96 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent text-sm text-gray-300 leading-relaxed">
					<section className="bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
						<h3 className="text-lg font-semibold text-white mb-2">Privacy Policy</h3>
						<p>
							This is a student project built for learning purposes. We do not store, share, or sell your personal data.
							Authentication is handled via Supabase and Google OAuth. Your email address is only used to log in to the app and is not shared with any third parties.
						</p>
						<p className="mt-2">
							We do not track activity, and no cookies are stored by this app. For more information about how Google handles your account, see{" "}
							<a
								href="https://policies.google.com/privacy"
								target="_blank"
								rel="noopener noreferrer"
								className="text-green-400 underline hover:text-green-300"
							>
								Google’s Privacy Policy
							</a>.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default page;

