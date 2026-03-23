import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Grape, Hamburger, IceCream, Milk } from "lucide-react"
import SidebarLink from "@/components/nav/sidebar-link"

export default function AppSidebar() {
  return (
    <Sidebar className="bg-inherit" collapsible="offcanvas" variant="inset">
      <SidebarHeader className="my-3">
        <h3 className="font-bold text-2xl">Menu</h3>
      </SidebarHeader>
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  )
}