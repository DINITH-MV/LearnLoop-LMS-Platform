"use client";
import UserButton from "@/app/(auth)/(routes)/user-profile/page";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./ui/mode-toggle";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isAnalyticsPage = pathname?.includes("/analytics");
  const isFeedbackPage = pathname?.endsWith("teacher/feedback");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        <ModeToggle />
        {isTeacherPage || isCoursePage || isAnalyticsPage || isFeedbackPage ? (
          <Link href="/Dashboard/progress">
            <Button size="default" variant="ghost">
              <LogOut className="h-3 w-3 mr-2" />
              <p className="text-[14pt]">Exit</p>
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/Dashboard/teacher/courses">
            <Button size="default" variant="ghost">
              <p className="text-[14pt] dark:text-[#000] ">Teacher mode</p>
            </Button>
          </Link>
        ) : null}
        <div className="w-[44px] h-[54px] rounded-[6px] bg-[rgb(223,223,223)] border-[3px] border-white flex justify-center items-center">
          <UserButton/>
        </div>
      </div>
    </>
  );
};
