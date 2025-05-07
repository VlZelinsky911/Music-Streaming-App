import Profile from "../../../../components/pages/Profile/Profile";

export const metadata = {
  title: "Wavely - Profile",
  description: "Wavely is a most popular music streaming service in the world",
  icons: {
    icon: "/wavely_logo_title_green.png",
  },
};

export default function ProfilePage() {
	return (
		<>
			<Profile/>
		</>
	);
}
