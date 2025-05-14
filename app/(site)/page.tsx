import Main from "../../components/main/main";
import Header from "../../components/header/header";

export const metadata = {
  title: "Wavely",
  description: "Wavely is a most popular music streaming service in the world",
  icons: {
    icon: "/wavely_logo_title_green.png",
  },
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Main />
      </div>
    </div>
  );
}
