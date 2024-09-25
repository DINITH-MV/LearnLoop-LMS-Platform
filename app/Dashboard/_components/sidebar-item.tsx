"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  data?: object;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex dark:text-white items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:bg-[#ffeece] dark:hover:bg-[#fff8f87c]",
        isActive && "text-[#eb2727] bg-[#ffe7e7] dark:bg-[#fff8f87c]"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={24}
          className={cn(
            "text-[#8f8f8f] dark:text-[#ffdaf7]",
            isActive && "dark:text-[#fff1fc] text-[#eb2727] "
          )}
        />
        <p className="text-[17pt]">{label}</p>
      </div>
      <div
        className={cn(
          "ml-auto dark:text-white opacity-0 border-2 border-[#eb2727] h-full transition-all",
          isActive && "opacity-100 dark:text-[#fff5ff] dark:border-[#ffffff]"
        )}
      />
    </button>
  )
}