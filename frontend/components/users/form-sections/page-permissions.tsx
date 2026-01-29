"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserFormData, PagePermission } from "@/lib/users/types"
import { availablePages } from "@/lib/users/types"

interface PagePermissionsProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => void
}

export function PagePermissionsSection({ formData, onChange }: PagePermissionsProps) {
  const [expandedPages, setExpandedPages] = useState<string[]>([])

  const toggleExpanded = (pageId: string) => {
    setExpandedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    )
  }

  const getPagePermissions = (pageId: string): ("read" | "write" | "admin")[] => {
    const page = formData.pagePermissions.find((p) => p.pageId === pageId)
    return page?.permissions || []
  }

  const handlePermissionToggle = (
    pageId: string,
    pageName: string,
    permission: "read" | "write" | "admin"
  ) => {
    const existingPage = formData.pagePermissions.find((p) => p.pageId === pageId)
    if (existingPage) {
      const hasPermission = existingPage.permissions.includes(permission)
      const updatedPermissions = formData.pagePermissions.map((p) => {
        if (p.pageId !== pageId) return p
        return {
          ...p,
          permissions: hasPermission
            ? p.permissions.filter((perm) => perm !== permission)
            : [...p.permissions, permission],
        }
      })
      onChange("pagePermissions", updatedPermissions as PagePermission[])
    } else {
      onChange("pagePermissions", [
        ...formData.pagePermissions,
        { pageId, pageName, permissions: [permission] },
      ])
    }
  }

  const renderPermissionCheckboxes = (pageId: string, pageName: string) => (
    <div className="flex gap-4">
      {(["read", "write", "admin"] as const).map((permission) => (
        <div key={permission} className="flex items-center gap-2">
          <Checkbox
            id={`${pageId}-${permission}`}
            checked={getPagePermissions(pageId).includes(permission)}
            onCheckedChange={() => handlePermissionToggle(pageId, pageName, permission)}
          />
          <Label
            htmlFor={`${pageId}-${permission}`}
            className="cursor-pointer text-sm capitalize text-muted-foreground"
          >
            {permission}
          </Label>
        </div>
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page & Feature Access</CardTitle>
        <CardDescription>Configure granular permissions for pages and features.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 rounded-lg border border-border p-4">
          {availablePages.map((page) => (
            <div key={page.pageId} className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  {page.children && page.children.length > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleExpanded(page.pageId)}
                    >
                      {expandedPages.includes(page.pageId) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <span className="font-medium">{page.pageName}</span>
                </div>
                {renderPermissionCheckboxes(page.pageId, page.pageName)}
              </div>
              {page.children &&
                page.children.length > 0 &&
                expandedPages.includes(page.pageId) && (
                  <div className="ml-8 space-y-2">
                    {page.children.map((child) => (
                      <div
                        key={child.pageId}
                        className="flex items-center justify-between rounded-md border border-border p-3"
                      >
                        <span className="text-sm">{child.pageName}</span>
                        {renderPermissionCheckboxes(child.pageId, child.pageName)}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
