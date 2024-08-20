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

  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [0.8, 0.8, 1]); 
  const x = useTransform(scrollYProgress, [0.9, 1], ["25%", "0%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.85, 0.9],
    [1, 1, 0.4, 0.4, 1]
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
    ["100px", "70px", "100px"]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    [0, 1, 0]
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    ["100px", "70px", "100px"]
  );

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    [0, 1, 0]
  );
  const text3Y = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    ["30px", "0px", "-30px"]
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
              src="https://pouch.jumpshare.com/preview/UBIxa5GMOkYn5Fvn55lA2ngbLLPZaXjee44u2FIbdYGrZeHmiAE5IY1DZP22aMMaujdhxQ5GODuM6rq-fjw3Y4DAihLeUFHFQ9pXQm5Je6k"
              className="rounded-[60pt] mt-[70px] h-full w-auto"
            />
          </motion.figure>
        </motion.div>

        <motion.p
          style={stylesWithCssVar({
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
            width: "380px",
            size: "24pt",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border pl-[30px] py-[30px] bg-[#ddceb4] rounded-[40px]">
            <p className="ptSans text-[#b48c4d] text-right text-[28pt] font-bold leading-[1.1]">
              Guided Learning <br /> At Home
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[20pt] leading-[1.2] text-right">
            Empowering and inspiring young minds with AI-driven insights, personalized guidance, and unwavering support for their growth and success.
            </p>
            <button className="mt-[-40px] mr-[40px] text-[18px] float-right font-semibold bg-[#f0f7e5] py-[10px] px-[10px] rounded-[11px]">
              Learn more
            </button>
          </div>
        </motion.div>

        <motion.div
          style={stylesWithCssVar({
            opacity: text2Opacity,
            "--y": text2Y,            
            width: "380px",
            color: "black",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-60px]"
        >
          <div className="border pl-[30px] py-[30px] bg-[#ceddb4] rounded-[40px]">
            <p className="ptSans text-[#80ad46] text-right text-[28pt] font-bold leading-[1.2]">
            Learning Together, <br /> Growing Stronger
            </p>

            <p className="AnekDevanagari mt-[30px] pb-[60px] text-[20pt] leading-[1.2] text-right">
            Inspiring young minds with AI-enhanced learning, personalized guidance, and unwavering support for their growth and success.
            </p>
            <button className="mt-[-40px] mr-[40px] text-[18px] float-right font-semibold bg-[#f0f7e5] py-[10px] px-[10px] rounded-[11px]">
              Learn more
            </button>
          </div>
        </motion.div>

        <motion.p
          style={stylesWithCssVar({
            opacity: text3Opacity,
            "--y": text3Y,
            color: "black",
          })}
          className="translate-y-centered-offset absolute top-1/2 left-[-20px]"
        >
          <span className="text-primary">Devtools</span>
          <br />
          We've bundled useful tools to help you get your work done faster and
          more efficiently.
        </motion.p>
      </div>
    </section>
  );
};
