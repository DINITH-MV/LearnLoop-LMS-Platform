import React from "react";
import part1 from "../../../images/part1.png";
import part2 from "../../../images/part2.png";
import part3 from "../../../images/part3.png";
import Image from "next/image";

const Section04 = () => {
  return (
    <div className="flex -mt-[305px] bg-white min-h-[1040px] flex-col items-center justify-start px-8">
      <div className="mt-[100px] w-[500px] bg-[linear-gradient(140deg,#ff5e64,#ffbe77)] rounded-l-[80px] py-[28pt] p-[20px]">
        <p className="text-center text-[#ffffffd8] text-[32pt] ml-[20px] ptSans font-semibold leading-[1.4]">
          EDUCAION DESERVES <br /> MORE THAN SLIDES
        </p>
      </div>

      <div className="grid grid-cols-1 ptSans mt-[50px] md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {/* Peer-Powered Motivation */}
        <div className="mt-[60px] flex flex-col items-center justify-center text-center bg-[#ffe3ccce] shadow-lg h-[510px] px-5 rounded-[45px]">
          <div className="w-[330px] flex items-center justify-center">
            <Image src={part1} alt="" />
          </div>
          <div className="w-[300px] bg-[#ffa958bb] p-2 rounded-[20px]">
            <div className="text-left">
              <div className="text-[18pt] font-bold text-[#ff4401] my-2">
                Peer-Powered Motivation
              </div>
              <p className="text-[14pt] text-black text-justify">
                <strong>Most learning is a lonely journey. </strong>
                We make learning social, so you stay engaged, accountable, and
                motivated.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive By Design */}
        <div className="mt-[22px] flex flex-col items-center justify-center text-center bg-[#ffe3ccce] shadow-lg h-[570px] px-5 rounded-[45px]">
          <div className="w-[330px] flex items-center justify-center">
            <Image src={part2} alt="" />
          </div>
          <div className="w-[300px] bg-[#ffa958bb] p-2 rounded-[20px]">
            <div className="text-left">
              <div className="text-[18pt] font-bold text-[#ff4401] my-2">
                Interactive By Design
              </div>
              <p className="text-[14pt] text-black text-justify">
                <strong>Most digital courses feel like tasks. </strong>
                We bring learning to life with reflections, peer dialogue, and
                media that makes you think, not just finish.
              </p>
            </div>
          </div>
        </div>

        {/* Career-Visible Outcomes */}
        <div className="mt-[102px] flex flex-col items-center justify-center text-center bg-[#ffe3ccce] shadow-lg h-[460px] px-5 rounded-[45px]">
          <div className="w-[330px] flex items-center justify-center">
            <Image src={part3} alt="" />
          </div>
          <div className="w-[300px] bg-[#ffa958bb] p-2 rounded-[20px]">
            <div className="text-left">
              <div className="text-[18pt] font-bold text-[#ff4401] my-2">
                Career-Visible Outcomes
              </div>
              <p className="text-[14pt] text-black text-justify">
                <strong>Most learning stays buried. </strong>
                We help make it visible: to peers and to employers globally
                through your portfolios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section04;
