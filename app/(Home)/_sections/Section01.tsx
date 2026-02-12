"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "../styles/index.css";
import { useRouter } from "next/navigation";

export const Section01 = () => {

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
    <div className="text-7xl text-[rgb(255,255,255)] z-21">
      <motion.section
        style={{ opacity }}
        ref={targetRef}
        className="relative mt-[50px] wide:mt-[50px] desktop:mt-[100px] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-60"
      >
        <motion.div
          style={{ 
            scale, 
            position,
          }}
          className="inset-0 w-screen h-screen z-10 flex items-center justify-center"
        >
          <div className="flex items-center justify-center gap-8" id="first-section">
            <div className="min-w-[570px] md:max-md text-black">
              <h1 className="ptSans mt-4 mb-9 nunito text-black text-left text-[54px] font-bold leading-[1]">
                Grow Skills Together
              </h1>
              <p className="BricolageGrotesque leading-[1.3] text-[32pt] max-w-[570px]">
                Boost Your Skills Through Collaborative Teamwork and Shared
                Learning Together
              </p>

              <a
                href="/Dashboard/progress"
                target="_blank"
                className="mt-[40px] mr-[20px] text-[18px] font-semibold bg-[#94e689] py-[13px] px-[20px] rounded-[11px]"
              >
                Check it out
              </a>
              <button className="mt-[40px] text-[18px] font-semibold border-black border-[2px] py-[9px] px-[18px] rounded-[11px]">
                Start Free Trial
              </button>
            </div>

            <div className="mask1 mt-[100px] h-[500px] w-[590px] overflow-hidden">
              <img src="https://raw.githubusercontent.com/DINITH-MV/LearnLoop-LMS-Platform/refs/heads/main/images/banner2.gif" alt="My GIF" className="ml-[35px] w-full h-[89%] object-cover" />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
};
