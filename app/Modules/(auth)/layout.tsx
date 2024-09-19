"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs'; // Clerk hook
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth(); // Clerk's authentication status

  useEffect(() => {
    // Redirect the user if they are signed in
    if (isLoaded && isSignedIn) {
      router.push('Modules/dashboard'); // Redirect to dashboard after successful sign-in
    }
  }, [isLoaded, isSignedIn, router]);
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
