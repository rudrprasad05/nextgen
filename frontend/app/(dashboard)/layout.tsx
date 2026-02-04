import { Header } from "@/components/sidebar/Header";
import { SideBar } from "@/components/sidebar/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <SideBar />
        <div className="flex-1 flex flex-col relative bg-background">
          <Header />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
