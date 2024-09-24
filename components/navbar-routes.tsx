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
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/Dashboard/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <div className="w-[45px] h-[55px] rounded-[6px] bg-[rgb(150,255,173)] flex justify-center items-center">
          <UserButton/>
        </div>
      </div>
    </>
  );
};
