import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export default function HomeLayout({
  children,  
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
