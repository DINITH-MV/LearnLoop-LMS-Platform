import { useRouter } from 'next/navigation';

export default function AIAssistant() {
    const router = useRouter(); // Initialize the router

  const handleNavigation = () => {
    // Navigate to the desired page
    router.push("/your-page"); // Replace 'your-page' with the path to navigate to
  };

  return (
    <button onClick={handleNavigation}>
      <div>
        <div className="z-[100] fixed bottom-20 right-[105px] h-[70px] w-[70px] rounded-[30px]">
          <span
            className="fa-stack fa-2x fa-shake"
            style={
              {
                fontSize: "24pt",
                top: "3px",
                left: "-4.5px",
              } as React.CSSProperties
            }
          >
            <i
              className="fa-solid fa-square fa-stack-2x"
              style={
                {
                  color: "#fb5d5d",
                  borderRadius: "30px",
                } as React.CSSProperties
              }
            ></i>
            <i
              className="fa-duotone fa-solid fa-message-bot z-[102]"
              style={
                {
                  "--fa-primary-color": "#fff",
                  "--fa-secondary-color": "#fff",
                  "--fa-secondary-opacity": "0.8",
                  fontSize: "24pt",
                  top: "0px",
                  left: "0px",
                } as React.CSSProperties
              }
            ></i>
          </span>
        </div>
      </div>
    </button>
  );
}
