import AboutForm from "../../../../components/auth/authUi/singUpUi/Form/AboutForm";
import SignUpHeader from "../../../../components/auth/authUi/singUpUi/SignUpHeader";
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
      <SignUpHeader />
      <div className="flex flex-col items-center justify-start bg-black text-white min-h-screen">
        <div className="w-full max-w-sm">
          <AboutForm />
        </div>
      </div>
    </>
  );
}
