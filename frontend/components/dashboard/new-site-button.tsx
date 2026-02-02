import { UserRoles } from "@/lib/models";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";

export function NewSiteButton() {
  return (
    <Link href={"/builder"}>
      <div
        className={`${buttonVariants({
          variant: "default",
        })} w-full text-start justify-start px-2 my-2`}
      >
        <Plus />
        New Site
      </div>
    </Link>
  );
}
