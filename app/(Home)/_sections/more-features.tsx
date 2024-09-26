"use client";

import { link } from "fs";
import { Flow } from "../icons/flow";
import { Intellisense } from "../icons/intellisense";
import { Keyboard } from "../icons/keyboard";
import { MagicBranch } from "../icons/magic-branch";
import ImageConverter from "../icons/image";
import { Preview } from "../icons/preview";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stylesWithCssVar } from "../utils/motion";
import CodeGenerator from "../icons/CodeGenerator";
import refactor from "../icons/refactor";
import generator from "../icons/generator";
import debug from "../icons/debug";

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
    icon: MagicBranch,
    title: "CODE SNIPPETS",
    text: "Organize, store, and share reusable code snippets.",
    link: "/Features/code-snippets",
  },
  {
    icon: MagicBranch,
    title: "CODE TRANSLATOR",
    text: "Converts code between programming languages",
    link: "/Features/code-translator",
  },
];

export const MoreFeatures = () => {
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
    scrollYProgress,
    [0.4, 0.8, 0.9], // when the text will be visible
    [1, -10, -2] // how long the text will be visible
  );

  const text4Opacity = useTransform(
    scrollYProgress,
    [0.4, 1], // when the text will be visible
    [1, 0] // how long the text will be visible
  );

  return (
    <div id="second-section">
      <div className="sticky top-[-11vh] h-[66.8vh] px-16 text-2xl leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
        <motion.div
          style={stylesWithCssVar({
            opacity: text2Opacity,
            marginTop: "255px",
            marginLeft: "90px",
            width: "500px",
            textAlign: "center",
            borderRadius: "30px",
          })}
          className="translate-x-[400px] translate-y-[-350px] absolute top-1/2 left-0"
        >
          <div className="mt-[-55px] w-[520px] text-center py-[40px] bg-[linear-gradient(87deg,#ffe292,#FF7755)] rounded-r-[70px] p-[20px] ml-[0px]">
            <p className="text-[32pt] text-left ml-[20px] text-[#fffce8]  ptSans font-semibold leading-[1.4]">
              INTRODUCING OUR <br />
              LATEST AI FEATURES
            </p>
          </div>
        </motion.div>
      </div>

      <section
        ref={targetRef}
        className="sticky top-[-11vh] h-[66.8vh] px-16 leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]"
      >
        <motion.div
          style={stylesWithCssVar({
            opacity: text4Opacity,
            "--y": text1Y,
            color: "black",
            width: "350px",
            marginLeft: "400px",
            marginTop: "-400px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="mt-[440px] rounded-tl-[80px] rounded-tr-[30px] rounded-br-[80px] grid rounded-bl-[30px] w-[820px] bg-gradient-to-r from-[#cb6866] to-[#ffe292] ... border-[20px] border-white px-[15px] max-w-[120rem] grid-cols-2 py-[15px]">
            {content.map(({ icon: Icon, title, text, link }) => (
              <div 
                key={title}
                className="bg-[#fff] rounded-tl-[35px] rounded-br- [40px]  rounded-bl-[8px] rounded-tr-[8px] rounded-br-[40px] h-[218px] w-[340px] p-[15px] my-[15px] ml-[15px]"
              >
                <span className="mb-[14px] flex h-[72px] w-[72px] items-center justify-center rounded-tl-[27px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] bg-gradient-to-r from-[#ba654f] to-[#cb6866] ...">
                  <Icon className="h-7 w-7 " />
                </span>
                <a href={link} target="_blank" className="text-[#000]">
                  <div className="max-w-[320px] bg-[#ffe292] rounded-t-[6px] rounded-bl-[6px] rounded-br-[25px] h-[102px] p-[11px] pl-[15px] pr-[20px]">
                  <h3 className="mb-2 text-[22px] text-black font-bold w-[340px]">{title}</h3>
                    <p className="text-[17px] text-[#000000] text-justify leading-[23px]">{text}</p>
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
