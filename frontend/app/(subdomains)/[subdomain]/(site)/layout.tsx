import type { Metadata } from "next";
import TanstackProvider from "@/context/TanstackProvider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { FullPageLoader } from "@/components/global/LoadingContainer";
import { AuthProvider } from "@/context/UserContext";
import "../../../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="">{children}</main>;
}
