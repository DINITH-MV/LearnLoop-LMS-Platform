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

  const scale = useTransform(scrollYProgress, [0.8, 0.2], [0.8, 0.8]); 
  const x = useTransform(scrollYProgress, [0.9, 1], ["23%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    [0.9, 1]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0,  0.9],
    [0.9,  1]
  );

  const text0Y = useTransform(
    scrollYProgress,
    [3, 4, 5],
    ["-1600px", "0px", "1600px"]
  );

  const text1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5], // when the text will be visible
    [0, 1, 0] // how long the text will be visible
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5],
    ["65px", "65px", "100px"]
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
      <div className="sticky top-[28vh] h-[66.8vh] px-16 text-2xl leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
        <motion.div style={{ x, scale, opacity:opacity1}} className="relative h-full">
          <motion.figure className="h-full">
            <img
              src="https://pouch.jumpshare.com/preview/FeD4eNVR379qAw1-4kK-IVfTHTI9nHxxfw33ARvA2koacPNnFsagf9PngOczRn7iL20qD2zNBMcXxsIsaoERX3oQ1hk0ZPt_03V6Q0YH9DA"
              className="rounded-l-[150px] ml-[100px] mt-[54px] h-[400px]"
            />
            
          </motion.figure>
        </motion.div>
       
        <motion.div
          style={stylesWithCssVar({
            opacity: opacity,
            "--y": text0Y,
            marginTop: "-100px",
            marginLeft: "80px",
            width: "480px",
            textAlign: "center",
            borderRadius: "30px",
          })}
          className="translate-x-[100px] translate-y-[-350px] absolute top-1/2 left-0"
        >
          <div className="bg-[linear-gradient(140deg,#ff8f93,#ffbe77)] ... rounded-r-[80px] py-[28pt] p-[20px]">
          <p className="text-[#725123d8] ml-[20px] text-justify ptSans font-semibold leading-[1.4]">
            BUILDING LEARNING <br/> CULTURE WITH AI
          </p>
          </div>
        </motion.div>

        <motion.div
          style={stylesWithCssVar({
            opacity: text1Opacity,
            "--y": text1Y,
            color: "black",
            width: "350px",
            size: "24pt",
            marginLeft: "60px",
            marginTop: "-30px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border  py-[30px] bg-[#f3e3c8] pl-[10px] rounded-[40px]">
            <p className="ptSans text-[#9c7840] text-right text-[28pt] font-bold leading-[1.2]">
            AI-Powered <br />Learning for everyone
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[16pt] leading-[1.2] text-right">
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
            marginLeft: "50px",
            marginTop: "-50px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border pl-[30px] py-[30px] bg-[#ceddb4] rounded-[40px]">
            <p className="ptSans text-[#4c7c29] text-right text-[28pt] font-bold leading-[1.2]">
            Smart Learning <br /> Made Simple
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[16pt] leading-[1.2] text-right">
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
            width: "340px",
            color: "black",
            marginLeft: "80px",
            marginTop: "-20px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-70px]"
          >
            <div className="border pl-[30px] py-[30px] bg-[#f2e1ce] rounded-[40px]">
              <p className="ptSans text-[#b4634d] text-right text-[28pt] font-bold leading-[1.2]">
              AI for Personalized Learning Paths
              </p>
  
              <p className="AnekDevanagari mt-[30px] pb-[60px] text-[16pt] leading-[1.2] text-right">
              Our LMS tailors lessons using AI, offering students the right content at the right time to boost their learning journey.
              </p>
              <button className="mt-[-35px] mr-[33px] text-[18px] float-right font-semibold bg-[#fef5fd] py-[10px] px-[10px] rounded-[11px]">
                Learn more
              </button>
            </div>
        </motion.div>
      </div>
    </section>
  );
};
