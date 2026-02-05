import { SiteProvider } from "@/context/SiteContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteProvider>{children}</SiteProvider>;
}
