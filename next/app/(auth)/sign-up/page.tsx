import Link from "next/link";
import EmailForm from "../../../components/ui/authUi/singUpUi/Form/EmailForm";
import TermsOfService from "../../../components/ui/legal/TermsOfService";

export const metadata = {
  title: "Sign Up - Spotify Clone",
  description: "Create an account to start listening to music on Spotify Clone",
  icons: {
    icon: "/spoti_logo_title.svg",
  },
};
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-black text-center">
        <header>
          <img
            src="spoti_logo_white.svg"
            alt="Spotify Logo"
            className="mx-auto w-12 mb-6"
          />
          <h1 className="mx-auto w-[320px] text-2xl font-bold mb-15">
            Sign up to start listening
          </h1>
        </header>

        <main>
          <EmailForm />
        </main>

        <footer>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>
          <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative">
            <img
              src="/google_icon.svg"
              alt="Google"
              className="w-6 h-6 mr-2 absolute left-6"
            />
            Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full mb-3 relative">
            <img
              src="/facebook_icon.svg"
              alt="Facebook"
              className="w-6 h-6 mr-2 absolute left-6"
            />
            Sign up with Facebook
          </button>
          <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-full relative">
            <img
              src="apple_icon.svg"
              alt="Apple"
              className="w-6 h-6 mr-2 absolute left-6"
            />
            Sign in with Apple
          </button>

          <p className="text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-white underline">
              Sign in here.
            </Link>
          </p>

					<TermsOfService />
        </footer>
      </div>
    </div>
  );
}
