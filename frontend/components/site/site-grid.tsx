"use client";

import { GetAllSites } from "@/actions/site";
import { useAuth } from "@/context/UserContext";
import { type Site } from "@/lib/dashboard/types";
import { ApiResponse, FIVE_MINUTE_CACHE, QueryObject } from "@/lib/models";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { H1, LargeText } from "../font/Fonts";
import { LoadingCard, NoDataContainer } from "../global/LoadingContainer";
import PaginationSection from "../global/PaginationSection";
import { SectionHeader } from "../global/SectionHeader";
import { NewSiteButton } from "./new-site-button";
import { SiteCard } from "./site-card";

export function SiteGrid() {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id;
  const [pagination, setPagination] = useState<QueryObject>({
    pageNumber: 1,
    totalCount: 0,
    pageSize: 8,
    totalPages: 0,
  });

  const query = useQuery({
    queryKey: ["admin-site", userId, pagination],
    queryFn: () =>
      GetAllSites({
        ...pagination,
        uuid: userId!, // safe because enabled guarantees it
      }),
    enabled: !!userId,
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

  console.log(query.data);

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
