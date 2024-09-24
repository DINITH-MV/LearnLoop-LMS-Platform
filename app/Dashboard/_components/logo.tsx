import { Combo } from "next/font/google";

const combo = Combo({
  subsets: ["latin"],
  variable: "--font-combo",
  display: "swap",
  weight: "400",
});

export const Logo = () => {
  return (
    <div className={`${combo.variable} h-[100px] text-[30px]`}>
      LearnLoop
      </div>
  )
}