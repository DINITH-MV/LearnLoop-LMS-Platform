"use client";

import { link } from "fs";
import { Flow } from "../icons/flow";
import { Intellisense } from "../icons/intellisense";
import { Keyboard } from "../icons/keyboard";
import { MagicBranch } from "../icons/magic-branch";
import { Prebuilds } from "../icons/prebuilds";
import { Preview } from "../icons/preview";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { stylesWithCssVar } from "../utils/motion";

const content = [
  {
    icon: Prebuilds,
    title: "Prebuilds",
    text: "CodeSandbox continuously prebuilds your branches.  finish.",
    link: "/Features/code-generator",
  },
  {
    icon: Intellisense,
    title: "IntelliSense",
    text: "Go beyond syntax highlighting and autocomplete. ",
    link: "@/app/Features/code-generator",
  },
  {
    icon: Flow,
    title: "Built for flow",
    text: "A completely redesigned experience to keep you in flow.",
    link: "@/app/Features/code-generator",
  },
  {
    icon: MagicBranch,
    title: "Magic Branch Management",
    text: "Organize your development workflow and help your team move work forward",
    link: "@/app/Features/code-generator",
  },
  {
    icon: Keyboard,
    title: "Keyboard first design",
    text: "Quick access makes for an efficient workflow.",
    link: "@/app/Features/code-generator",
  },
  {
    icon: Preview,
    title: "Live preview",
    text: "See changes as you make them. With Hot reload Previews see your changes instantly. ",
    link: "@/app/Features/code-generator",
  },
];

export const MoreFeatures = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.9], [0.9, 1]);
  const x = useTransform(scrollYProgress, [0.8, 1], ["0vw", "50vw"]); // Horizontal movement

  const opacity2 = useTransform(scrollYProgress, [0, 0.9], [0.9, 1]);

  const text0Y = useTransform(
    scrollYProgress,
    [3, 4, 5],
    ["-400px", "0px", "400px"]
  );

  const text1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.2,0], // when the text will be visible
    [1, 0.8, 0.9,1] // how long the text will be visible
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0, 1, 1, 1],
    ["200px", "0px","0px", "0px"]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.9], // when the text will be visible
    [1, 0, 0] // how long the text will be visible
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
    <div>      
        <div className="sticky top-[-11vh] h-[66.8vh] px-16 text-2xl leading-[1] text-white [&_p]:w-[45rem] [&_p]:max-w-[90%]">
          
        <motion.div
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text0Y,
            marginTop: "200px",
            marginLeft: "390px",
            width: "500px",
            textAlign: "center",
            borderRadius: "30px",
          })}
          className="translate-x-[100px] translate-y-[-350px] absolute top-1/2 left-0"
        >
          <div className="mt-[5px] w-[500px] text-center py-[40px] bg-[linear-gradient(287deg,#ea92ff,#5ad2f3)] rounded-r-[70px] p-[20px] ml-[0px]">
            <p className="text-[32pt] text-left ml-[20px] text-[#fdfff9] ptSans font-semibold leading-[1.4]">
              DISCOVER OUR <br />LATEST
               AI FEATURES
            </p>
          </div>
        </motion.div>
                 
      </div>

      <section
        ref={targetRef}
        className="bg-[#fff] flex h-[500vh] flex-col items-center justify-start"
      >
        <motion.div
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text1Y,
            color: "black",
            width: "350px",
            size: "24pt",
            marginLeft: "260px",
            marginTop: "-40px",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
         <div className="mt-[400px] rounded-tl-[50px] rounded-br-[50px] grid w-[1100px] bg-gradient-to-r from-[#5ad2f3] to-[#24528d] ... border px-[10px] max-w-[120rem] grid-cols-3 gap-[5px] py-[10px]">
            {content.map(({ icon: Icon, title, text, link }) => (
              <div
                key={title}
                className="bg-[#fff] rounded-tl-[40px] rounded-br-[40px] h-[220px] w-[340px] p-[10px] m-[10px]"
              >
                <span className="mb-4 flex h-32 w-32 items-center justify-center rounded-tl-[30px] bg-gradient-to-r from-black via-gray-800 to-gray-900 ...">
                  <Icon className="h-12 w-12" />
                </span>
                <a href={link} className="text-[#000]">
                  <h3 className="mb-2 text-xl text-black">{title}</h3>
                  <p className="text-md text-black">{text}</p>
                </a>
              </div>
            ))}
          </div>
          </motion.div>
      </section>
    </div>
  );
};
