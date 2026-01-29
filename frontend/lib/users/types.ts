export interface SitePermission {
  siteId: string
  siteName: string
  permissions: ("view" | "edit" | "publish")[]
}

export interface PagePermission {
  pageId: string
  pageName: string
  permissions: ("read" | "write" | "admin")[]
  children?: PagePermission[]
}

export interface UserFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  profilePicture?: string
  role: "admin" | "user" | "custom"
  accessType: "full" | "restricted"
  siteAccess: {
    allSites: boolean
    sites: SitePermission[]
  }
  pagePermissions: PagePermission[]
  ipWhitelist: string[]
  restrictByIp: boolean
  flags: {
    canManageUsers: boolean
    canManageRoles: boolean
    canDeploySites: boolean
  }
  notes: string
}

export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user" | "custom"
  sites: string[]
  status: "active" | "disabled"
  createdOn: string
  avatar?: string
}

export const defaultFormData: UserFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  accessType: "restricted",
  siteAccess: {
    allSites: false,
    sites: [],
  },
  pagePermissions: [],
  ipWhitelist: [],
  restrictByIp: false,
  flags: {
    canManageUsers: false,
    canManageRoles: false,
    canDeploySites: false,
  },
  notes: "",
}

export const availableSites = [
  { id: "site-1", name: "Marketing Website" },
  { id: "site-2", name: "E-commerce Store" },
  { id: "site-3", name: "Blog Platform" },
  { id: "site-4", name: "Customer Portal" },
  { id: "site-5", name: "Documentation Site" },
]

export const availablePages: PagePermission[] = [
  {
    pageId: "dashboard",
    pageName: "Dashboard",
    permissions: [],
    children: [
      { pageId: "dashboard-analytics", pageName: "Analytics", permissions: [] },
      { pageId: "dashboard-reports", pageName: "Reports", permissions: [] },
    ],
  },
  {
    pageId: "sites",
    pageName: "Sites",
    permissions: [],
    children: [
      { pageId: "sites-create", pageName: "Create Site", permissions: [] },
      { pageId: "sites-edit", pageName: "Edit Site", permissions: [] },
      { pageId: "sites-delete", pageName: "Delete Site", permissions: [] },
    ],
  },
  {
    pageId: "users",
    pageName: "Users",
    permissions: [],
    children: [
      { pageId: "users-create", pageName: "Create User", permissions: [] },
      { pageId: "users-edit", pageName: "Edit User", permissions: [] },
      { pageId: "users-delete", pageName: "Delete User", permissions: [] },
    ],
  },
  {
    pageId: "settings",
    pageName: "Settings",
    permissions: [],
    children: [
      { pageId: "settings-general", pageName: "General Settings", permissions: [] },
      { pageId: "settings-security", pageName: "Security Settings", permissions: [] },
    ],
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "admin",
    sites: ["Marketing Website", "E-commerce Store"],
    status: "active",
    createdOn: "2024-01-15",
    avatar: "JD",
  },
  {
    id: "2",
    username: "janesmith",
    email: "jane.smith@example.com",
    role: "user",
    sites: ["Blog Platform"],
    status: "active",
    createdOn: "2024-02-20",
    avatar: "JS",
  },
  {
    id: "3",
    username: "bobwilson",
    email: "bob.wilson@example.com",
    role: "custom",
    sites: ["Customer Portal", "Documentation Site"],
    status: "disabled",
    createdOn: "2024-03-10",
    avatar: "BW",
  },
  {
    id: "4",
    username: "alicejohnson",
    email: "alice.johnson@example.com",
    role: "user",
    sites: ["Marketing Website"],
    status: "active",
    createdOn: "2024-04-05",
    avatar: "AJ",
  },
]
