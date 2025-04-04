import "../globals.css";


export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone',
  icons: {
    icon: 'spoti_logo_title.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
