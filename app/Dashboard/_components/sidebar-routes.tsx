"use client";

import { BarChart, Braces, Code, Compass, Bot, Layout, List, MessageSquareHeart } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { color } from 'framer-motion';

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/Dashboard/progress",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/Dashboard/search",
  },
  {
    icon: MessageSquareHeart,
    label: "Feedback",
    href: "/image-to-code",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/Dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/Dashboard/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-[103%] ">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}