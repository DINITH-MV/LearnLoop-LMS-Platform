import { useEffect, useState } from "react";

export default function TopScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Get the current scroll position
      if (scrollPosition >= 5190) {
        setIsVisible(true); // Show the button when scrolled beyond 5239px
      } else {
        setIsVisible(false); // Hide the button when scrolled above 5239px
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <div
      className={`z-[20] fixed bottom-[65px] right-[220px] h-[70px] w-[70px] rounded-[30px] ${
        isVisible ? "block" : "hidden"
      }`} // Show/hide button based on isVisible state
    >
      <button
        className="border-[#bf1f1fab] border-[4px] w-[35px] h-[35px] rounded-[40px]"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-sharp fa-solid fa-caret-up text-[#cf1c1c] text-[15pt]"></i>
      </button>
    </div>
  );
}
