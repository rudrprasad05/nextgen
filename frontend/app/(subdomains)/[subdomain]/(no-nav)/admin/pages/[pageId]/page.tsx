import { PageBuilder } from "@/components/page-builder/page-builder";

interface PagesAdminPageProps {
  params: Promise<{ subdomain: string }>;
}

export default async function PagesEditPage({ params }: PagesAdminPageProps) {
  const { subdomain } = await params;

  console.log("sub", subdomain);

  return <PageBuilder slug={subdomain} />;
}
