import { motion, useScroll, useTransform } from "framer-motion";
import { stylesWithCssVar } from "../utils/motion";
import { useRef } from "react";

export default function Footer() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });
    const text1Y = useTransform(
        scrollYProgress,
        [0, 1, 1, 1],
        ["200px", "0px", "0px", "0px"]
      );
    
      const text2Opacity = useTransform(
        scrollYProgress,
        [0.1, 0.2, 0.9], // when the text will be visible
        [1, -10, 0] // how long the text will be visible
      );
    
      const text4Opacity = useTransform(
        scrollYProgress,
        [0.1, 1, 0.9], // when the text will be visible
        [1, -3, 0] // how long the text will be visible
      );
    return (
        <div>
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
<div className="w-[400px] border-[3px] border-black h-[100px]"></div>
        </motion.div>
        </div>
        </div>
    );
}