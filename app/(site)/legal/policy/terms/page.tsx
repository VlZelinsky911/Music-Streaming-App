import React from "react";
import Image from "next/image";

export const metadata = {
	title: "Terms - Spotify Pet Project",
	description:
		"Read our privacy policy and terms of service for the Spotify-style pet project. Transparency and user trust come first.",
	icons: {
		icon: "/spoti_logo_title.svg",
	},
};


const page = () => {
	return (
		<div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 min-h-screen flex items-center justify-center px-4 text-white">
			<div className="bg-zinc-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-zinc-700">
				<div className="text-center mb-6">
					<Image
						src="/spoti_logo_white.svg"
						alt="Spotify Logo"
						className="mx-auto mb-3"
						width={48}
						height={48}
					/>
					<h2 className="text-3xl font-bold tracking-wide">Spotify Pet Project</h2>
					<p className="text-sm text-gray-400 mt-1">Terms of Service</p>
				</div>

				<div className="max-h-96 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent text-sm text-gray-300 leading-relaxed">
					<section className="bg-[#1E1E1E]/80 p-4 rounded-xl border border-zinc-700">
						<h3 className="text-lg font-semibold text-white mb-2">Terms of Service</h3>
						<p>
							This app is provided “as is” for non-commercial and educational use only. The developer is not affiliated with Spotify and does not claim any rights to the Spotify name, logo, or service.
						</p>
						<p className="mt-2">
							By using this app, you agree that it is for testing and demonstration only. The developer assumes no liability for any misuse or unauthorized access.
						</p>
						<p className="mt-2">
							For real-world use or production deployment, proper legal terms, policies, and security measures must be implemented.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default page;

