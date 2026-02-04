"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import {
  BarChart,
  BookA,
  Cog,
  Globe,
  LayoutDashboard,
  LucideIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavArr {
  title: string;
  href: string;
  icon: LucideIcon;
}

interface SideBarProps {
  type?: "admin-dashboard" | "site-dashboard" | undefined;
}

export function SideBarNavigation({ type }: SideBarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const segments = pathname.split("/").filter(Boolean);
  const base = `/${segments[0]}`;

  console.log(segments);

  let items: INavArr[];

  switch (type) {
    case "admin-dashboard":
      items = [
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
        {
          title: "Sites",
          href: "/dashboard/sites",
          icon: Globe,
        },
      ];
      break;
    case "site-dashboard":
      items = [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Pages",
          href: "/admin/pages",
          icon: BookA,
        },
        {
          title: "Stats",
          href: "/admin/stats",
          icon: BarChart,
        },
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Cog,
        },
      ];
      break;
    default:
      items = items = [
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
        {
          title: "Sites",
          href: "/dashboard/sites",
          icon: Globe,
        },
      ];
      break;
  }

  return (
    <SidebarGroup className="h-full">
      <SidebarGroupContent className="h-full">
        <SidebarMenu className="h-full">
          {items.map((item) => {
            const isActive = pathname.includes(item.href.slice(1));
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors",
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
