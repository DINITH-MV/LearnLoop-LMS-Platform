"use client";

import { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "./_components/Header";
import { motion } from 'framer-motion';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function HomeLayout(
  {  
  children,  
}: {
  children: React.ReactNode;  
}
) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
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
    }
  };

  return (
    <html suppressHydrationWarning>
      <body className={inter.variable}>
        
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
        {/* Render the children */}
        {children}
      </body>
    </html>
  );
}
