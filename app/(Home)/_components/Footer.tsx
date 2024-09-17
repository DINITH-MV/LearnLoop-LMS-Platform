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
    <div className="">
      
    </div>
  );
}
