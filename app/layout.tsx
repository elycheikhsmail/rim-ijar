import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNav from "./ConditionalNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RIM IJAR",
  description: "trouver des maisons,appartement, voiture, engine a louer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}
      >
        <ConditionalNav />
        {children}
      </body>
    </html>
  );
}
