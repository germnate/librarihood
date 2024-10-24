import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./Navbar";
import { NavBarStatusProvider } from "./NavBarStatusContext";

export const metadata: Metadata = {
  title: "Librarihood",
  description: "Lend and Borrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBarStatusProvider>
          <NavBar />
          {children}
        </NavBarStatusProvider>
      </body>
    </html>
  );
}
