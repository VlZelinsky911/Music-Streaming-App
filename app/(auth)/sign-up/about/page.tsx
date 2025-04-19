import AboutForm from "../../../../components/auth/authUi/singUpUi/Form/AboutForm";
import SignUpHeader from "../../../../components/auth/authUi/singUpUi/SignUpHeader";
export const metadata = {
  title: "Sign Up - Wavely",
  description:
    "Tell us about yourself to start listening to music on Wavely",
  icons: {
    icon: "/wavely_logo_title.svg",
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
