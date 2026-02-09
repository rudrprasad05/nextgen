"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { Page, Site } from "@/lib/models";

interface SiteContextType {
  site: Site | null;
  currentPage: Page | null;
  setInitialSite: (site: Site) => void;
  setCurrentPageHelper: (page: Page) => void;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<Site | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setInitialSite = (site: Site) => {
    setSite(site);
  };

  const setCurrentPageHelper = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <SiteContext.Provider
      value={{
        site,
        isLoading,
        setInitialSite,
        setCurrentPageHelper,
        currentPage,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
