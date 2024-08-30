import type { Metadata } from "next";
import {
  Inter,
  Cousine,
  Poppins,
  Nunito,
  Anek_Devanagari,
  PT_Sans,
} from "next/font/google";
import { ToastProvider } from "@/components/providers/toaster-provider";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const AnekDevanagari = Anek_Devanagari({
  subsets: ["latin"],
  variable: "--font-anek-devanagari",
  display: "swap",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  variable: "--font-pt-sans",
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     
      <html suppressHydrationWarning >
        <body
          className={`bg-[#fbf6f2] ${nunito.variable} ${AnekDevanagari.variable} ${ptSans.variable}`}
        > 
        <ToastProvider />
          {children}
        </body>
      </html>
  );
}
