import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./Navbar";


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
        <NavBar />
        <div className='md:pl-32'>
          {children}
        </div>
      </body>
    </html>
  );
}
