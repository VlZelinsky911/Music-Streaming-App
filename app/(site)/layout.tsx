import "../globals.css";
import ToasterCustom from "../../components/auth/ToasterCustom/ToasterCustom";

export const metadata = {
  title: "Spotify Clone",
  description:
    "Spotify Clone is a most popular music streaming service in the world",
  icons: {
    icon: "spoti_logo_green.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterCustom />
        {children}
      </body>
    </html>
  );
}
