import RootLayout from "@/(site)/layout";
import { ReactNode } from "react";

export const metadata = {
  title: "Sign Up - Wavely",
  description: "Create an account to start listening to music on Wavely",
  icons: {
    icon: 'wavely_logo_title.svg',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout>
          {children}
    </RootLayout>
  );
}
