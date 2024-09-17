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

const content = [
  {
    icon: ImageConverter,
    title: "IMAGE TO CODE ANALYZER",
    text: "A completely redesigned experience to keep you in flow.",
    link: "/Features/image-to-code",
  },
  {
    icon: Preview,
    title: "CODE GENERATOR",
    text: "A completely redesigned experience to keep you in flow.",
    link: "/Features/code-generator",
  },
  {
    icon: Flow,
    title: "CODE DEBUGGER",
    text: "A completely redesigned experience to keep you in flow.",
    link: "/Features/code-debugger",
  },
  {
    icon: MagicBranch,
    title: "Code Snippets",
    text: "Organize your development workflow and help your team move work forward",
    link: "/Features/code-snippets",
  },
  {
    icon: MagicBranch,
    title: "AI CODE ASSISTANT",
    text: "Organize your development workflow and help your team move work forward",
    link: "/Features/code-snippets",
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
    [1,-10, -2] // how long the text will be visible
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
        className="sticky top-[-11vh] h-[66.8vh] px-16 text-2xl leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">   >
       
        <motion.div
          style={stylesWithCssVar({
            opacity: text4Opacity,
            "--y": text1Y,
            color: "black",
            width: "350px",
            size: "24pt",
            marginLeft: "400px",
            marginTop: "-400px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="mt-[440px] rounded-tl-[50px] rounded-br-[50px] grid rounded-bl-[8px] rounded-tr-[8px]  w-[780px] bg-gradient-to-r from-[#cb6866] to-[#ffe292] ... border px-[15px] max-w-[120rem] grid-cols-2 py-[15px]">
            {content.map(({ icon: Icon, title, text, link }) => (
              <div
                key={title}
                className="bg-[#fff] rounded-tl-[35px] rounded-br- [40px]  rounded-bl-[8px] rounded-tr-[8px] rounded-br-[40px] h-[220px] w-[340px] p-[15px] my-[15px] ml-[15px]"
              >
                <span className="mb-4 flex h-32 w-32 items-center justify-center rounded-tl-[27px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] bg-gradient-to-r from-[#ba654f] to-[#cb6866] ...">
                  <Icon className="h-12 w-12 " />
                </span>
                <a href={link} target="_blank" className="text-[#000]">
                  <h3 className="mb-2 text-xl text-black">{title}</h3>
                  <p className="text-md text-black max-w-[300px]">{text}</p>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
