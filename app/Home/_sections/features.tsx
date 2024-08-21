"use client";

import { stylesWithCssVar } from "../utils/motion";
import { useScroll, useTransform, motion, color } from "framer-motion";
import { useRef } from "react";

export const Features = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1, 1], [0.8, 0.8, 0]); 
  const x = useTransform(scrollYProgress, [0.9, 1], ["23%", "84%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9, 0, 0, 0.9],
    [1, 1, 1, 1, 0]
  );

  const text0Y = useTransform(
    scrollYProgress,
    [3, 4, 5],
    ["-1600px", "0px", "1600px"]
  );

  const text1Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5], // when the text will be visible
    [0, 2, 0] // how long the text will be visible
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5],
    ["100px", "65px", "100px"]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    [0, 2, 0]
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    ["100px", "65px", "100px"]
  );

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    [0, 2, 0]
  );
  const text3Y = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    ["100px", "60px", "100px"]
  );

  return (
    <section
      ref={targetRef}
      className="flex h-[500vh] flex-col items-center justify-start"
    >
      <div className="sticky top-[16.7vh] h-[66.8vh] px-16 text-2xl leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
        <motion.div style={{ x, scale }} className="relative h-full">
          <motion.figure className="h-full">
            <img
              src="https://pouch.jumpshare.com/preview/UBIxa5GMOkYn5Fvn55lA2ngbLLPZaXjee44u2FIbdYGrZeHmiAE5IY1DZP22aMMaJtRKZkNnv8bFOsYdQVm8qniHEc-h9Y276s_Zw4v1iDE"
              className="rounded-[60pt] mt-[70px] h-full w-auto"
            />
          </motion.figure>
        </motion.div>
       
        <motion.p
          style={stylesWithCssVar({
            opacity: opacity,
            "--y": text0Y,
            color: "black",
            marginLeft: "70px",
            width: "700px",
            textAlign: "center",
          })}
          className="translate-x-[100px] translate-y-[-350px] absolute top-1/2 left-0"
        >
          <span className="text-[#474747] ptSans font-semibold leading-[1.4]">
            Building a Learning Culture with AI to Enhance Essential Skills
          </span>
        </motion.p>

        <motion.div
          style={stylesWithCssVar({
            opacity: text1Opacity,
            "--y": text1Y,
            color: "black",
            width: "360px",
            size: "24pt",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border  py-[30px] bg-[#ddceb4] pl-[10px] rounded-[40px]">
            <p className="ptSans text-[#b48c4d] text-right text-[28pt] font-bold leading-[1.2]">
            AI-Powered <br />Learning for everyone
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[20pt] leading-[1.2] text-right">
            Our LMS now uses AI to suggest content and track progress, making learning easier and personalized.
            </p>
            <button className="mt-[-40px] mr-[38px] text-[18px] float-right font-semibold bg-[#f4f7e5] py-[10px] px-[10px] rounded-[11px]">
              Learn more
            </button>
          </div>
        </motion.div>

        <motion.div
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text2Y,            
            width: "360px",
            color: "black",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border pl-[30px] py-[30px] bg-[#ceddb4] rounded-[40px]">
            <p className="ptSans text-[#80ad46] text-right text-[28pt] font-bold leading-[1.2]">
            Smart Learning <br /> Made Simple
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[20pt] leading-[1.2] text-right">
            With AI, our LMS adapts lessons and monitors progress, creating a smoother and more focused learning path.
            </p>
            <button className="mt-[-40px] mr-[40px] text-[18px] float-right font-semibold bg-[#f0f7e5] py-[10px] px-[10px] rounded-[11px]">
              Learn more
            </button>
          </div>
        </motion.div>

        <motion.div
          style={stylesWithCssVar({
            opacity: text3Opacity,
            "--y": text3Y,
            width: "370px",
            color: "black",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-70px]"
          >
            <div className="border pl-[30px] py-[30px] bg-[#e7cef5] rounded-[40px]">
              <p className="ptSans text-[#a62e96] text-right text-[28pt] font-bold leading-[1.2]">
              AI for Personalized Learning Paths
              </p>
  
              <p className="AnekDevanagari mt-[30px] pb-[60px] text-[20pt] leading-[1.2] text-right">
              Our LMS tailors lessons using AI, offering students the right content at the right time to boost their learning journey.
              </p>
              <button className="mt-[-35px] mr-[38px] text-[18px] float-right font-semibold bg-[#fef5fd] py-[10px] px-[10px] rounded-[11px]">
                Learn more
              </button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
