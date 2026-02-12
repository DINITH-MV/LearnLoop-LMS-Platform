"use client";

import ImageConverter from "../icons/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stylesWithCssVar } from "../utils/motion";
import refactor from "../icons/refactor";
import generator from "../icons/generator";
import debug from "../icons/debug";
import snippets from "../icons/snippets";
import subtitles from "../icons/subtitles";

const content = [
  {
    icon: ImageConverter,
    title: "IMAGE TO CODE ANALYZER",
    text: "Convert images into readable code for analysis",
    link: "/Features/image-to-code",
  },
  {
    icon: refactor,
    title: "CODE REFACTOR",
    text: "Java code refactoring tool with customization",
    link: "/Features/code-refactor",
  },
  {
    icon: generator,
    title: "CODE GENERATOR",
    text: (
      <>
        Generate code quickly using <br />
        AI-powered automation
      </>
    ),
    link: "/Features/code-generator",
  },
  {
    icon: debug,
    title: "CODE DEBUGGER",
    text: "Efficiently resolve code errors with streamlined debugging.",
    link: "/Features/code-debugger",
  },
  {
    icon: subtitles,
    title: "CODE COMPILER",
    text: "Converts code between programming languages",
    link: "/Features/online-compiler",
  },
  {
    icon: subtitles,
    title: "CODE TRANSLATOR",
    text: "Converts code between programming languages",
    link: "/Features/code-translator",
  }
];

export const Section03 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const text1Y = useTransform(
    scrollYProgress,
    [0, 1, 1, 1],
    ["200px", "0px", "0px", "200px"]
  );

  const text2Opacity = useTransform(
    scrollYProgress, [0, 0.9, 1], [0.9, 1, 0]
  );

  const text4Opacity = useTransform(
    scrollYProgress,
    [0.4, 0.7, 1], // when the text will be visible
    [1, 1, 0] // how long the text will be visible
  );

  return (
    <div id="second-section" className="relative h-[900px] flex flex-col items-center justify-center">
      {/* Header Section */}
      <motion.div
        style={stylesWithCssVar({
          opacity: text2Opacity,
        })}
        className="flex items-center justify-center mb-8"
      >
        <div className="w-[520px] text-center py-[40px] bg-[linear-gradient(87deg,#ffe292,#FF7755)] rounded-r-[70px] p-[20px]">
          <p className="text-[32pt] text-center text-[#fffce8] ptSans font-semibold leading-[1.4]">
            INTRODUCING OUR <br />
            LATEST AI FEATURES
          </p>
        </div>
      </motion.div>

      {/* Content Section */}
      <section ref={targetRef} className="flex items-center justify-center">
        <motion.div
          style={stylesWithCssVar({
            opacity: text4Opacity,
            "--y": text1Y,
          })}
          className="flex items-center justify-center"
        >
          <div className="w-[820px] max-w-[90vw] grid grid-cols-2 gap-4 rounded-tl-[80px] rounded-tr-[30px] rounded-br-[80px] rounded-bl-[30px] bg-gradient-to-r from-[#cb6866] to-[#ffe292] border-[20px] border-white p-[15px]">
            {content.map(({ icon: Icon, title, text, link }) => (
              <div
                key={title}
                className="bg-[#fff] h-[218px] w-full p-[15px] rounded-tl-[35px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[40px]"
              >
                <span className="mb-[14px] flex h-[72px] w-[72px] items-center justify-center rounded-tl-[27px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] bg-gradient-to-r from-[#ba654f] to-[#cb6866]">
                  <Icon className="h-7 w-7" />
                </span>
                <a href={link} target="_blank" className="text-[#000]">
                  <div className="max-w-full bg-[#ffe292] rounded-t-[6px] rounded-bl-[6px] rounded-br-[25px] h-[102px] p-[9px] pl-[15px] pr-[20px]">
                    <h3 className="YeonSung mb-[5px] text-[24px] tracking-wide text-black font-bold">
                      {title}
                    </h3>
                    <p className="englebert text-[18px] tracking-wider text-[#000000] text-justify leading-[23px]">
                      {text}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
