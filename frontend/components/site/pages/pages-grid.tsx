"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpDown,
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageCard } from "./page-card";
import { PageCardSkeleton } from "./page-card-skeleton";
import { SectionHeader } from "@/components/global/SectionHeader";
import { H1, LargeText } from "@/components/font/Fonts";
import { NewPageButton } from "./new-page-button";
import {
  ApiResponse,
  FIVE_MINUTE_CACHE,
  Page,
  QueryObject,
} from "@/lib/models";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetPagesForOneSite } from "@/actions/page";
import PaginationSection from "@/components/global/PaginationSection";

interface PagesGridProps {
  siteSlug: string;
}

export function PagesGrid({ siteSlug }: PagesGridProps) {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
    slug: siteSlug,
  });

  const query = useQuery({
    queryKey: ["site-admin-pages", siteSlug, pagination],
    queryFn: () =>
      GetPagesForOneSite({
        ...pagination,
        slug: siteSlug,
      }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  if (query.isError) {
    return (
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Pages</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Failed to load pages
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Please try again later.
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={() => query.refetch()}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        pagination={pagination}
        setPagination={setPagination}
        newButton={<NewPageButton />}
      >
        <H1>Your Pages</H1>
        <LargeText className="text-muted-foreground">
          Begin building your website by selecting a page from the list
        </LargeText>
      </SectionHeader>

      <HandleDataSection
        query={query}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}

function HandleDataSection({
  query,
  pagination,
  setPagination,
}: {
  query: UseQueryResult<ApiResponse<Page[]>, Error>;
  pagination: QueryObject;
  setPagination: React.Dispatch<React.SetStateAction<QueryObject>>;
}) {
  if (query.isError) {
    return <div className="text-red-500">Error loading sites.</div>;
  }

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <PageCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  const data = query.data?.data ?? [];
  const meta = query.data?.meta;

  console.log(query.data);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.map((page) => (
          <PageCard key={page.id} page={page} />
        ))}
      </div>
      <div className="py-8">
        <PaginationSection
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
}
