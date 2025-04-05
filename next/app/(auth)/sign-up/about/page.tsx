import React from "react";
import AboutForm from "../../../../components/ui/authUi/singUpUi/AboutForm";
import SignUpHeader from "../../../../components/ui/authUi/singUpUi/SignUpHeader";

export const metadata = {
  title: "Sign Up - Spotify Clone",
  description:
    "Tell us about yourself to start listening to music on Spotify Clone",
  icons: {
    icon: "/spoti_logo_title.svg",
  },
};

export default function pageAbout() {
  return (
	<>
    <SignUpHeader progress={0.66} />
		<div className="flex flex-col items-center justify-start bg-black text-white min-h-screen">
      <div className="w-full max-w-md">
        <AboutForm />
      </div>
    </div>
	</>
  );
}
