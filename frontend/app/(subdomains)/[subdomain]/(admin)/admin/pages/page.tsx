import { PagesGrid } from "@/components/site/pages/pages-grid";

interface PagesAdminPageProps {
  params: Promise<{ subdomain: string }>;
}

export default async function PagesAdminPage({ params }: PagesAdminPageProps) {
  const { subdomain } = await params;

  console.log("sub", subdomain);

  return <PagesGrid siteSlug={subdomain} />;
}
