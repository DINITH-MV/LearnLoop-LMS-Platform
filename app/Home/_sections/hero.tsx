"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const Hero = () => {
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
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative mb-[8rem] h-screen py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-60"
    >
      <motion.div
        style={{ position, scale, x: "30%", y: "20%" }}
        className="fixed z-10 flex flex-col"
      >
        <div className="min-w-[510px] md:max-md :flex border text-black">
          <h1 className="mb-9 text-black text-left font-heading text-[54px] font-semibold leading-[1]">
            Grow Skills Together
          </h1>
          <p className="text-[40pt] max-w-[510px]">Boost skills <br/> with Teamwork and shared Learning</p>
        </div>
        <video width="320" height="240" controls preload="none">
      <source src="C:\Users\Dinith\Desktop\6781547-uhd_3840_2160_30fps.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
      </motion.div>
    </motion.section>
  );
};
