"use client";

import { Features } from "./(Home)/_sections/features";
import Head from "next/head";
import { Hero } from "./(Home)/_sections/hero";
import { MoreFeatures } from "./(Home)/_sections/more-features";
import { useState, useEffect } from "react";
import Header from "./(Home)/_components/Header";
import Footer from "./(Home)/_components/Footer";

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
        <div className="z-[100] fixed bottom-20 right-[105px] h-[70px] w-[70px] rounded-[30px]">
          <span
            className="fa-stack fa-2x fa-shake"
            style={
              {
                fontSize: "24pt",
                top: "3px",
                left: "-4.5px",
              } as React.CSSProperties
            }
          >
            <i
              className="fa-solid fa-square fa-stack-2x"
              style={
                {
                  color: "#fb5d5d",
                  borderRadius: "30px",
                } as React.CSSProperties
              }
            ></i>
            <i
              className="fa-duotone fa-solid fa-message-bot z-[102]"
              style={
                {
                  "--fa-primary-color": "#fff",
                  "--fa-secondary-color": "#fff",
                  "--fa-secondary-opacity": "0.8",
                  fontSize: "24pt",
                  top: "0px",
                  left: "20px",
                } as React.CSSProperties
              }
            ></i>
          </span>
        </div>
      </main>
    </div>
  );
}
