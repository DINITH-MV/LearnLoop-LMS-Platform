import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center rounded-[15px] shadow-sm bg-slate-50">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}