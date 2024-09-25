import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center rounded-[15px] shadow-sm bg-white dark:bg-[#3a1136]">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
