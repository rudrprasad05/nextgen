export type Site = {
  id: string;
  name: string;
  updatedAt: string;
  status: "draft" | "published";
  screenshot?: string | null;
};

export const mockSites: Site[] = [
  {
    id: "site-1",
    name: "Marketing Website",
    updatedAt: "2026-01-28T14:30:00Z",
    status: "published",
  },
  {
    id: "site-2",
    name: "Product Landing",
    updatedAt: "2026-01-27T09:15:00Z",
    status: "draft",
  },
  {
    id: "site-3",
    name: "Documentation Portal",
    updatedAt: "2026-01-25T16:45:00Z",
    status: "published",
  },
  {
    id: "site-4",
    name: "Blog",
    updatedAt: "2026-01-20T11:00:00Z",
    status: "draft",
  },
];
