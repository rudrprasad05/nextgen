"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UsersFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleChange: (value: string) => void
  siteFilter: string
  onSiteChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export function UsersFilters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  siteFilter,
  onSiteChange,
  statusFilter,
  onStatusChange,
}: UsersFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by username or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={roleFilter} onValueChange={onRoleChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      <Select value={siteFilter} onValueChange={onSiteChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Site Access" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sites</SelectItem>
          <SelectItem value="marketing-website">Marketing Website</SelectItem>
          <SelectItem value="e-commerce-store">E-commerce Store</SelectItem>
          <SelectItem value="blog-platform">Blog Platform</SelectItem>
          <SelectItem value="customer-portal">Customer Portal</SelectItem>
          <SelectItem value="documentation-site">Documentation Site</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="disabled">Disabled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
