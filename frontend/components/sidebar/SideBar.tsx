import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SideBarLogo } from "./SideBarLogo";
import { SideBarNavigation } from "./SideBarNavigation";
import { SideBarUserMenu } from "./SideBarUserMenu";

export function SideBar() {
  return (
    <Sidebar className="border-r bg-background border-primary/20">
      <SidebarHeader className="border-b border-primary/20 border-solid p-4">
        <SideBarLogo />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SideBarNavigation />
      </SidebarContent>

      <SidebarFooter className="border-t border-solid border-primary/20 p-2">
        <SideBarUserMenu />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
