import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-[55.58vh] flex justify-center items-center" style={{ zoom: "180%" }} 
    >
      <div className="text-[18pt] flex justify-center items-center">        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
