"use client";

import { Section02 } from "./(Home)/_sections/Section02";
import Head from "next/head";
import { Section01 } from "./(Home)/_sections/section01";
import { Section03 } from "./(Home)/_sections/Section03";
import { useState, useEffect } from "react";
import Header from "./(Home)/_components/Header";
import Footer from "./(Home)/_components/Footer";
import AIAssistant from "./(Home)/_components/AI-Assistant";
import TopScrollButton from "./(Home)/_components/TopScrollButton";

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
        <Section01 />
        <div className="relative z-10 w-full">
          <Section02 />
          <Section03 />
        </div>
        <div className="z-[100] relative">
          <Footer />
        </div>
        <AIAssistant />
        <TopScrollButton />
      </main>
    </div>
  );
}
