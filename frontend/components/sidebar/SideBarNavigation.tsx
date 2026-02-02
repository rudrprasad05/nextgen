"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/UserContext";
import { cn } from "@/lib/utils";

import { LayoutDashboard, LucideIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavArr {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function SideBarNavigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  const segments = pathname.split("/").filter(Boolean);
  const base = `/${segments[0]}`;

  const superAdminItems: INavArr[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: UsersIcon,
    },
  ];

  return (
    <SidebarGroup className="h-full">
      <SidebarGroupContent className="h-full">
        <SidebarMenu className="h-full">
          {superAdminItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "" : " ",
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
