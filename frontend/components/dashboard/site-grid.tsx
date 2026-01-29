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

type SortOption = "recent" | "alphabetical";

export function SiteGrid() {
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredAndSortedSites = useMemo(() => {
    let result = sites.filter((site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortBy === "recent") {
      result = result.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } else {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [sites, searchQuery, sortBy]);

  const handleCreateSite = (): string => {
    const newSite: Site = {
      id: `site-${Date.now()}`,
      name: `Untitled Site ${sites.length + 1}`,
      updatedAt: new Date().toISOString(),
      status: "draft",
    };
    setSites((prev) => [newSite, ...prev]);
    return newSite.id;
  };

  const isEmpty = sites.length === 0;
  const noResults = filteredAndSortedSites.length === 0 && !isEmpty;

  return (
    <div className="flex flex-1 flex-col ">
      <header className="flex h-14 items-center justify-between border-b border-primary/20 px-6">
        <h1 className="text-lg font-semibold">Your Sites</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 pl-9"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortBy === "recent" ? "Recent" : "A-Z"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                Alphabetical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        {isEmpty && (
          <div className="mb-4 text-center text-sm text-muted-foreground">
            Create your first site to get started.
          </div>
        )}
        {noResults && (
          <div className="mb-4 text-center text-sm text-muted-foreground">
            No sites found matching "{searchQuery}"
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NewSiteCard onCreateSite={handleCreateSite} />
          {filteredAndSortedSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </main>
    </div>
  );
}
