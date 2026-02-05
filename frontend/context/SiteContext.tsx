"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { GetMe } from "@/actions/auth";
import { ApiResponse, Site, User } from "@/lib/models";

interface SiteContextType {
  site: Site | null;
  setInitialSite: (site: Site) => void;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setInitialSite = (site: Site) => {
    setSite(site);
  };

  return (
    <SiteContext.Provider value={{ site, isLoading, setInitialSite }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
