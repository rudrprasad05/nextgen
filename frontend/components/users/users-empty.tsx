"use client"

import { Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function UsersEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-foreground">No users found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new user.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/users/new">
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Link>
      </Button>
    </div>
  )
}
