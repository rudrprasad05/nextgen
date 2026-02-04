"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BasicDetails } from "@/components/site/form-sections/basic-details";
import { TemplatePicker } from "@/components/site/form-sections/template-picker";
import { SeoSettings } from "@/components/site/form-sections/seo-settings";
import { Branding } from "@/components/site/form-sections/branding";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { CreateSite } from "@/actions/site";
import { toast } from "sonner";
import { PageSchema } from "@/lib/page-builder/types";
import { useAuth } from "@/context/UserContext";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export interface CreateSiteRequestDto {
  name: string;
  slug: string;
  description: string;
  template: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  favicon: File | null;
  status: string;
  ownerId: string;
}

export default function CreateSitePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState("blank");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [favicon, setFavicon] = useState<File | null>(null);

  // Validation
  const [slugError, setSlugError] = useState<string | undefined>();

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugManuallyEdited && name) {
      setSlug(generateSlug(name));
    }
  }, [name, slugManuallyEdited]);

  // Validate slug
  useEffect(() => {
    if (slug) {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(slug)) {
        setSlugError(
          "Slug can only contain lowercase letters, numbers, and hyphens",
        );
      } else if (slug.length < 3) {
        setSlugError("Slug must be at least 3 characters");
      } else {
        setSlugError(undefined);
      }
    } else {
      setSlugError(undefined);
    }
  }, [slug]);

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const isValid = name.trim().length > 0 && slug.length >= 3 && !slugError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("slug", slug);
    formData.append("description", description.trim());
    formData.append("template", template);
    formData.append("defaultSeoTitle", seoTitle.trim());
    formData.append("defaultSeoDescription", seoDescription.trim());
    if (favicon) {
      formData.append("favicon", favicon);
    }
    formData.append("status", "draft");
    formData.append("ownerId", user?.id as string); // Replace with actual user ID

    console.log("Creating site:", formData.values());

    const res = await CreateSite(formData);

    if (res.success) {
      toast.success("Site created successfully!");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border ">
        <div className="flex items-center justify-between h-16 px-6 mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold text-foreground">
              Create New Site
            </h1>
          </div>
          <Button onClick={handleSubmit} disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Continue to Builder
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              1
            </span>
            <span className="text-foreground font-medium">Site Details</span>
            <div className="w-8 h-px bg-border" />
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              2
            </span>
            <span>Build</span>
            <div className="w-8 h-px bg-border" />
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              3
            </span>
            <span>Publish</span>
          </div>

          {/* Form Sections */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <div className="p-6 rounded-xl border border-border bg-card">
              <BasicDetails
                name={name}
                slug={slug}
                description={description}
                onNameChange={setName}
                onSlugChange={handleSlugChange}
                onDescriptionChange={setDescription}
                slugError={slugError}
              />
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <SeoSettings
                seoTitle={seoTitle}
                seoDescription={seoDescription}
                onSeoTitleChange={setSeoTitle}
                onSeoDescriptionChange={setSeoDescription}
              />
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <TemplatePicker
                selectedTemplate={template}
                onTemplateSelect={setTemplate}
              />
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <Branding favicon={favicon} onFaviconChange={setFavicon} />
            </div>
          </div>

          {/* Bottom CTA (mobile) */}
          <div className="lg:hidden pt-4 border-t border-border">
            <Button
              type="submit"
              className="w-full h-12"
              //   disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Site...
                </>
              ) : (
                <>
                  Continue to Builder
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
