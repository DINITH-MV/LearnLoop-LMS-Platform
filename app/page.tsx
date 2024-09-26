"use client";

import { Features } from "./(Home)/_sections/features";
import Head from "next/head";
import { Hero } from "./(Home)/_sections/hero";
import { MoreFeatures } from "./(Home)/_sections/more-features";
import { useState, useEffect } from "react";
import Header from "./(Home)/_components/Header";
import Footer from "./(Home)/_components/Footer";
import AIAssistant from "./(Home)/_components/AI-Assistant";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Next js scroll Animations with Framer Motion</title>
        <meta
          name="description"
          content="Scroll animations with Framer Motion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="h-[5140px] ">
        <Header />
        <Hero />
        <div className="relative z-10 w-full">
          <Features />
          <MoreFeatures />
        </div>
        <div className="z-[100] relative">
          <Footer />
        </div>
        <AIAssistant/>
      </main>
    </div>
  );
}
