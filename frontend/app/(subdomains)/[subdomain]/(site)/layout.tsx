import SiteAdminButton from "@/components/site/site-admin-button";
import "../../../globals.css";
import { SiteProvider } from "@/context/SiteContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SiteProvider>
      <main className="relative">
        <SiteAdminButton />
        {children}
      </main>
    </SiteProvider>
  );
}
