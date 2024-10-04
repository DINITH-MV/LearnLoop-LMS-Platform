"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "../styles/index.css";
import { useRouter } from 'next/navigation';

export const Section01 = () => {
  const router = useRouter();
  const handleRedirectToDashboard = () => {
    router.push('/Dashboard/progress'); // Navigates to the dashboard page
  };

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  // in scrollYProgress = 0, opacity = 1, and so on
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div>
      <motion.section
        style={{ opacity }}
        ref={targetRef}
        className="relative mt-[-50px] mb-[300px] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-60"
      >
        <motion.div
          style={{ scale, position, x: 140, y: 100 }}
          className="fixed z-10 flex flex-col"
        >
          <div className="flex ml-[20px]" id="first-section">
            <div className="min-w-[570px] md:max-md text-black">
              <h1 className="ptSans mt-4 mb-9  nunito text-black text-left text-[54px] font-bold leading-[1]">
                Grow Skills Together
              </h1>
              <p className="AnekDevanagari text-[32pt] max-w-[510px]">
                Boost Your Skills Through Collaborative Teamwork and Shared
                Learning Together
              </p>

              <button onClick={handleRedirectToDashboard} className="mt-[40px] mr-[20px] text-[18px] font-semibold bg-[#94e689] py-[10px] px-[20px] rounded-[11px]">
                Check it out
              </button>
              <button className="mt-[40px] text-[18px] font-semibold border-black border-[2px] py-[9px] px-[18px] rounded-[11px]">
                Start Free Trial
              </button>
            </div>

            <div className="mask1 h-[600px] w-[770px]">
              <img src="https://s11.gifyu.com/images/SoVll.gif" />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};
