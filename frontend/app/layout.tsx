import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "@/context/TanstackProvider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { FullPageLoader } from "@/components/global/LoadingContainer";
import { AuthProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "NextGen | Static Site Generator",
  description:
    "NextGen is a powerful internal drag-and-drop static site generator. Create, customize, and export fully functional Next.js websites with ease.",
  keywords: [
    "NextGen",
    "static site generator",
    "Next.js",
    "drag and drop",
    "website builder",
    "code export",
    "frontend builder",
    "internal tool",
  ],
  authors: [{ name: "NextGen Team", url: "https://nextgen.local" }],
  creator: "NextGen",
  openGraph: {
    title: "NextGen | Drag-and-Drop Static Site Generator",
    description:
      "Design and export fully functional Next.js websites using NextGen. Internal tool for developers and designers.",
    url: "https://nextgen.local",
    siteName: "NextGen",
    images: [
      {
        url: "https://nextgen.local/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextGen - Static Site Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen | Static Site Generator",
    description:
      "Drag, drop, and export fully functional Next.js websites with NextGen.",
    images: ["https://nextgen.local/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-foreground border-border bg-background">
      <body>
        <TanstackProvider>
          <AuthProvider>
            <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
            <Toaster />
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
