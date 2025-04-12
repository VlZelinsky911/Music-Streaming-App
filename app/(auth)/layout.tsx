import RootLayout from "@/(site)/layout";
import { ReactNode } from "react";

export const metadata = {
  title: 'Зареєструватися - Spotify Clone',
  description: 'Створіть акаунт, щоб почати слухати музику в Spotify Clone',
  icons: {
    icon: 'spoti_logo_title.svg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout>
          {children}
    </RootLayout>
  );
}
