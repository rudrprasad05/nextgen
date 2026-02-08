"use client";

import { CreateNewPage } from "@/actions/page";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSlug } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type NewPageSchema = {
  siteSlug: string;
  title: string;
  slug: string;
};

export default function NewPageButton() {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();
  const { subdomain } = useParams<{ subdomain: string }>();
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState<string | undefined>();

  const isValid = title.trim().length > 0 && slug.length >= 3 && !slugError;

  async function handleSubmit() {
    setIsSaving(true);
    let tempSchema: NewPageSchema = {
      slug: slug,
      title: title,
      siteSlug: subdomain,
    };
    const res = await CreateNewPage({ slug: subdomain }, tempSchema);

    if (!res.success) {
      console.log(res.message);
      toast.error("Failed to create page");
    } else {
      toast.success("Page created");

      queryClient.invalidateQueries({
        queryKey: ["site-admin-pages", subdomain, {}],
        exact: false,
      });

      setOpen(false);
    }
    setIsSaving(false);
  }

  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited]);

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <div
          className={`${buttonVariants({
            variant: "default",
          })} w-full text-start justify-start px-2 my-2`}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Page
        </div>
      </DialogTrigger>
      <DialogContent className="border-border">
        <DialogHeader>
          <DialogTitle>Create new page</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new page
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="taxName" className="text-right">
              Page Name
            </Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="col-span-3"
              placeholder="e.g. About Us"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="taxPercentage" className="text-right">
              Page Slug
            </Label>
            <div className="col-span-3 grid grid-cols-1 grid-rows-2 gap-2">
              <Input
                id="site-slug"
                placeholder="my-awesome-website"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className={`${slugError ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {slugError ? (
                <p className="text-xs text-destructive">{slugError}</p>
              ) : (
                <p className="text-xs flex gap-2 items-baseline text-muted-foreground">
                  Your site will be available at:
                  <span className="font-mono text-foreground">
                    {slug}.procyonfiji.com
                  </span>
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  Saving <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
