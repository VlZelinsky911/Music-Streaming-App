import ResetPasswordPage from "../../../../components/auth/password/ResetPassForm";

export const metadata = {
	title: "Reset Your Password | Wavely",
	description:
		"Forgot your password? Reset it securely and set a new one to continue using your Wavely account.",
	icons: {
		icon: "/wavely_logo_title.svg",
	},
};

const page = () => {
  return (
    <>
      <ResetPasswordPage />
    </>
  );
};

export default page;
