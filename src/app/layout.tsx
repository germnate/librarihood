import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Librarihood",
  description: "Lend and Share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
