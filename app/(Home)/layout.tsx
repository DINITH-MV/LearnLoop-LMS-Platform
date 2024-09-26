"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./styles/index.css";
import Header from "./_components/Header";
import { motion } from "framer-motion";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <body>
        {children}        
      </body>
    </div>
  );
}
