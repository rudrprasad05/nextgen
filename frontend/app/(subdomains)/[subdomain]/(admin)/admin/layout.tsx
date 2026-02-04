import type { Metadata } from "next";
import TanstackProvider from "@/context/TanstackProvider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { FullPageLoader } from "@/components/global/LoadingContainer";
import { AuthProvider } from "@/context/UserContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/sidebar/SideBar";
import { Header } from "@/components/sidebar/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <SideBar type="site-dashboard" />
        <div className="flex-1 flex flex-col relative bg-background">
          <Header />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
