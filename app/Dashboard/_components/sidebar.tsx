import Link from "next/link"
import { SidebarRoutes } from "./sidebar-routes"
import { Logo } from "./logo"

export const Sidebar = () => {
  return (
    <div className="h-[100vh] border-r flex flex-col overflow-y-auto shadow-sm dark:bg-[#3a1136]">
      <div className="text-center mx-auto">
        <Link href="/"><Logo/></Link>
      </div>
      <div className="flex flex-col ml-[-10px] mt-[-90px] w-full ">
        <SidebarRoutes />
      </div>
    </div>
  )
}