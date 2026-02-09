import { PageSchema } from "@/lib/page-builder/types";
import { ElementContent } from "./element-content";

export default function SiteRenderer({ schema }: { schema: PageSchema }) {
  return (
    <>
      {schema.root?.children?.map((element) => (
        <ElementContent element={element} />
      ))}
    </>
  );
}
