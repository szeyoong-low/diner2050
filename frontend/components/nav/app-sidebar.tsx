import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Grape, Hamburger, IceCream, Milk } from "lucide-react"
import SidebarLink from "@/components/nav/sidebar-link"

export default function AppSidebar() {
  return (
    <Sidebar className="bg-inherit" collapsible="offcanvas" variant="inset">
      <SidebarHeader className="my-3">
        <h3 className="font-bold text-2xl">Menu</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarLink href="/#appetizers">
            <Grape />
            <p>Appetisers</p>
          </SidebarLink>
          <SidebarLink href="/#mains">
            <Hamburger />
            <p>Mains</p>
          </SidebarLink>
          <SidebarLink href="/#desserts">
            <IceCream />
            <p>Desserts</p>
          </SidebarLink>
          <SidebarLink href="/#drinks">
            <Milk />
            <p>Drinks</p>
          </SidebarLink>
        </SidebarGroup>

        <div className="w-full h-px bg-gray-950 dark:bg-white my-4" />

        <SidebarGroup>
          <SidebarLink href="https://github.com/szeyoong-low/diner2050">
            <FaGithub />
            <p>GitHub repo</p>
          </SidebarLink>
          <SidebarLink href="https://www.linkedin.com/in/szeyoong-low">
            <FaLinkedin />
            <p>LinkedIn</p>
          </SidebarLink>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}