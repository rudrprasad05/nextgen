"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { mockSites, type Site } from "@/lib/dashboard/types";
import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { NewSiteCard } from "./new-site-card";
import { SiteCard } from "./site-card";
import { H1, H3, LargeText, P } from "../font/Fonts";
import { ApiResponse, FIVE_MINUTE_CACHE, QueryObject } from "@/lib/models";
import { GetAllSites } from "@/actions/site";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { NewSiteButton } from "./new-site-button";
import { LoadingCard, NoDataContainer } from "../global/LoadingContainer";
import PaginationSection from "../global/PaginationSection";
import { SectionHeader } from "../global/SectionHeader";

export function SiteGrid() {
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const query = useQuery({
    queryKey: ["admin-site", pagination],
    queryFn: () => GetAllSites({ ...pagination }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  return (
    <>
      <SectionHeader
        pagination={pagination}
        setPagination={setPagination}
        newButton={<NewSiteButton />}
      >
        <H1>Your Sites</H1>
        <LargeText className="text-muted-foreground">
          Begin building your website by selecting a site from the list
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
  query: UseQueryResult<ApiResponse<Site[]>, Error>;
  pagination: QueryObject;
  setPagination: React.Dispatch<React.SetStateAction<QueryObject>>;
}) {
  if (query.isError) {
    return <div className="text-red-500">Error loading sites.</div>;
  }

  const data = query.data?.data ?? [];
  const meta = query.data?.meta;

  console.log(data);

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (data.length == 0) {
    return <NoDataContainer />;
  }

  return (
    <>
      <div>
        {data.map((site) => (
          <SiteCard key={site.id} site={site} />
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
