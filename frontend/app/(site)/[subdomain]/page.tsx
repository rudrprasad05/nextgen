// app/[subdomain]/page.tsx
import { GetSiteJson } from "@/actions/site";
import { CanvasElement } from "@/components/page-builder/canvas-element";
import { Site } from "@/lib/models";
import { generateReactStyleObject } from "@/packages/generate-page";

async function fetchSite(subdomain: string): Promise<Site | null> {
  console.log(subdomain);
  const res = await GetSiteJson(subdomain);

  if (!res.success) return null;

  if (!res.data) return null;

  return res.data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const site = await fetchSite(subdomain);

  if (!site) {
    return {
      title: "Site not found",
      description: "",
    };
  }

  return {
    title: site.name,
    icons: site.screenshot?.url,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const site = await fetchSite(subdomain);

  if (!site) return <div>Site not found</div>;

  let mainPage = site.pages[0];

  console.log("page", mainPage);
  console.log("site", site);

  return (
    <main>
      <img src={site.screenshot?.url} />
      <div className="flex flex-col gap-4">
        {mainPage.schema.root.children?.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            parentId={mainPage.schema.root.id}
          />
        ))}
      </div>
    </main>
  );
}
