import SearchPage from "../../../../components/searchPage/searchPage";

export const metadata = {
	title: "Wavely - Search",
	description: "Wavely is a most popular music streaming service in the world",
	icons: {
		icon: "/wavely_logo_title_green.png",
	},
};

export default function Search() {
	return (
		<>
			<SearchPage />
		</>
	);
}