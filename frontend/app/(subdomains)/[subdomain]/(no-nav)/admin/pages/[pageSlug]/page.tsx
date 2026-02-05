import { PageBuilder } from "@/components/page-builder/page-builder";
import { PagesGrid } from "@/components/site/pages/pages-grid";

interface PagesAdminPageProps {
  params: Promise<{ pageSlug: string }>;
}

export default async function PagesEditPage({ params }: PagesAdminPageProps) {
  const { pageSlug } = await params;

  console.log("sub", pageSlug);

  return <PageBuilder />;
}
