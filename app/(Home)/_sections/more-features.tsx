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

const content = [
  {
    icon: Prebuilds,
    title: "Prebuilds",
    text: "CodeSandbox continuously prebuilds your branches. This means no more waiting for dependencies to be downloaded and builds to finish.",
    link: "/Features/code-generator",
    
  },
  {
    icon: Intellisense,
    title: "IntelliSense",
    text: "Go beyond syntax highlighting and autocomplete. With smart completions based on variable types, function definitions, and imported modules.",
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
    text: "Quick access makes for an efficient workflow. Navigate quickly with our extensive keyboard shortcuts.",
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

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const x = useTransform(scrollYProgress, [0.8, 1], ["0vw", "50vw"]); // Horizontal movement

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="mt-[-150px] relative mb-[15rem] h-screen py-16 text-white "
    >
      <motion.section
        ref={targetRef}
        style={{ opacity, x }} // Apply x transform instead of y
        className="flex flex-col items-center justify-star "
      >
        <div className="mt-[5px] w-[540px] text-center py-[28px] bg-[linear-gradient(135deg,#fba946,#ffba7f)] rounded-r-[70px] p-[20px] ml-[0px]">
          <p className="text-[32pt] text-left ml-[20px] text-[#80643ae5] ptSans font-semibold leading-[1.4]">
            DISCOVER OUR LATEST<br/> AI FEATURES
          </p>
        </div>

        <div className="mt-[42px] rounded-tl-[50px] rounded-br-[50px] grid w-[1100px] bg-gradient-to-r from-black via-gray-800 to-gray-900 ... border-black border px-[10px] max-w-[120rem] grid-cols-3 gap-[5px] py-[10px]">
          {content.map(({ icon: Icon, title, text,link }) => (
            <div key={title} className="bg-[#fff] rounded-tl-[40px] rounded-br-[40px] h-[260px] w-[340px] p-[10px] m-[10px]">
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
      </motion.section>
    </motion.section>
  );
};
