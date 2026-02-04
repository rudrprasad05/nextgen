import type { Metadata } from "next";
import "../../globals.css";
import TanstackProvider from "@/context/TanstackProvider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { FullPageLoader } from "@/components/global/LoadingContainer";
import { AuthProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body>{children}</body>
    </html>
  );
}
