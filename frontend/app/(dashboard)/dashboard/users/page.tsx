"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/users/page-header";
import { UsersEmpty } from "@/components/users/users-empty";
import { UsersFilters } from "@/components/users/users-filters";
import { UsersTable } from "@/components/users/users-table";
import { mockUsers } from "@/lib/users/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      const matchesSite =
        siteFilter === "all" ||
        user.sites.some((site) =>
          site.toLowerCase().replace(/\s+/g, "-").includes(siteFilter),
        );

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesSite && matchesStatus;
    });
  }, [searchQuery, roleFilter, siteFilter, statusFilter]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Users"
        actions={
          <Button asChild>
            <Link href="/users/new">
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Link>
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <UsersFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            siteFilter={siteFilter}
            onSiteChange={setSiteFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
          {filteredUsers.length > 0 ? (
            <UsersTable users={filteredUsers} />
          ) : (
            <UsersEmpty />
          )}
        </div>
      </div>
    </div>
  );
}
