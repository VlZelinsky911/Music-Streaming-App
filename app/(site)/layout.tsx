import "../globals.css";
import ToasterCustom from "../../components/auth/ToasterCustom/ToasterCustom";

export const metadata = {
  title: "Wavely",
  description:
    "Wavely is a most popular music streaming service in the world",
  icons: {
    icon: "wavely_logo_green.svg",
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
