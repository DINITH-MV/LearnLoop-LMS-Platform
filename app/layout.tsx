"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { motion } from "framer-motion";
import {
  Cousine,
  Poppins,
  Nunito,
  Anek_Devanagari,
  PT_Sans,
  Combo,
  Englebert,
} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";

const englebert = Englebert({
  subsets: ["latin"],
  variable: "--font-englebert",
  display: "swap",
  weight: "400",
});

const combo = Combo({
  subsets: ["latin"],
  variable: "--font-combo",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      transition: {
        type: "spring", // "spring" makes it move more naturally
        stiffness: 1400, // Increase this value for faster movement
        damping: 70, // Lower this value to reduce "lag" when stopping
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-duotone-solid.css"
        />
        <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-solid.css"/>
      </head>
      <ClerkProvider> 
        <body
          className={`bg-[#fbf6f2] ${nunito.variable} ${AnekDevanagari.variable} ${ptSans.variable} ${inter.variable} ${combo.variable} ${englebert.variable}`}
        >
          <motion.div
            className="cursor"
            variants={variants}
            animate={cursorVariant}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 99,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#00000060",
              pointerEvents: "none",
            }}
          />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
