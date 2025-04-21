import UpdatePasswordPage from "../../../../components/auth/password/UpdatePassForm";

export const metadata = {
  title: "Set a New Password | Wavely",
  description:
    "Securely set a new password to continue using your Wavely account. Make sure your new password is strong and unique.",
  icons: {
    icon: "/wavely_logo_title.svg",
  },
};

const page = () => {
  return (
    <>
		<UpdatePasswordPage/>
    </>
  );
};

export default page;
