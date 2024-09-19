import Link from "next/link"
import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-[100vh] border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-6">
        <Link href="/"><Logo /></Link>
      </div>
      <div className="flex flex-col ml-[-10px] mt-[-90px] w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}