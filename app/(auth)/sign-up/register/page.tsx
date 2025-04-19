import RegisterForm from "../../../../components/auth/authUi/singUpUi/Form/RegisterForm";
import SignUpHeader from "../../../../components/auth/authUi/singUpUi/SignUpHeader";

export const metadata = {
  title: "Sign Up - Wavely",
  description: "To start listening to music on Wavely",
  icons: {
    icon: "/wavely_logo_title.svg",
  },
};
export default function RegisterPage() {
  return (
    <>
      <SignUpHeader />
      <div className="flex flex-col items-center justify-start bg-black text-white min-h-screen">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
