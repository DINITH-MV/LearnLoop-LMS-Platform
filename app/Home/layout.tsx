import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Cousine } from "@next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cousine = Cousine({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cousine",
  display: "swap",
});

export default function RootLayout({
  children,  
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${cousine.variable} font-body text-text`}
      >
        {children}
      </body>
    </html>
  );
}
