import Link from "next/link";
import EmailForm from "../../../components/auth/authUi/singUpUi/Form/EmailForm";
import TermsOfService from "../../../components/auth/legal/TermsOfService";
import SocialButton from "../../../components/auth/authUi/socialButton";
import Image from "next/image";

export const metadata = {
  title: "Sign Up - Wavely",
  description: "Create an account to start listening to music on Wavely",
  icons: {
    icon: "/wavely_logo_title.svg",
  },
};
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-black text-center">
        <header>
          <Image
            src="/wavely_logo_white.png"
            alt="Wavely Logo"
            className="mx-auto w-12 mb-6"
            width={48}
            height={48}
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

          <SocialButton />

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
