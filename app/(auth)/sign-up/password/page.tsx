import PasswordForm from "../../../../components/auth/authUi/singUpUi/Form/PasswordForm";
import SignUpHeader from "../../../../components/auth/authUi/singUpUi/SignUpHeader";
export const metadata = {
  title: "Sign Up - Spotify Clone",
  description: "Create a password to start listening to music on Spotify Clone",
  icons: {
    icon: "/spoti_logo_title.svg",
  },
};

export default function SignUpPasswordPage() {
  return (
    <>
      <SignUpHeader />
      <div className="min-h-screen flex justify-center bg-black px-4">
        <div className="w-full max-w-sm px-8 py-4 bg-black text-center">
          <PasswordForm />
        </div>
      </div>
    </>
  );
}
