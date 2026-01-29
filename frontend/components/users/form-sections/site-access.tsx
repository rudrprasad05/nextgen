"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserFormData, SitePermission } from "@/lib/users/types"
import { availableSites } from "@/lib/users/types"

interface SiteAccessProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => void
}

export function SiteAccessSection({ formData, onChange }: SiteAccessProps) {
  const handleAllSitesChange = (checked: boolean) => {
    onChange("siteAccess", {
      allSites: checked,
      sites: checked ? [] : formData.siteAccess.sites,
    })
  }

  const handleSiteToggle = (siteId: string, siteName: string) => {
    const existingSite = formData.siteAccess.sites.find((s) => s.siteId === siteId)
    if (existingSite) {
      onChange("siteAccess", {
        ...formData.siteAccess,
        sites: formData.siteAccess.sites.filter((s) => s.siteId !== siteId),
      })
    } else {
      onChange("siteAccess", {
        ...formData.siteAccess,
        sites: [
          ...formData.siteAccess.sites,
          { siteId, siteName, permissions: ["view"] },
        ],
      })
    }
  }

  const handlePermissionToggle = (
    siteId: string,
    permission: "view" | "edit" | "publish"
  ) => {
    const updatedSites = formData.siteAccess.sites.map((site) => {
      if (site.siteId !== siteId) return site
      const hasPermission = site.permissions.includes(permission)
      return {
        ...site,
        permissions: hasPermission
          ? site.permissions.filter((p) => p !== permission)
          : [...site.permissions, permission],
      }
    })
    onChange("siteAccess", {
      ...formData.siteAccess,
      sites: updatedSites as SitePermission[],
    })
  }

  const isSiteSelected = (siteId: string) =>
    formData.siteAccess.sites.some((s) => s.siteId === siteId)

  const getSitePermissions = (siteId: string) =>
    formData.siteAccess.sites.find((s) => s.siteId === siteId)?.permissions || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Access</CardTitle>
        <CardDescription>Configure which sites the user can access.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="all-sites"
            checked={formData.siteAccess.allSites}
            onCheckedChange={handleAllSitesChange}
          />
          <Label htmlFor="all-sites" className="cursor-pointer">
            Access to all sites
          </Label>
        </div>

        {!formData.siteAccess.allSites && (
          <div className="space-y-3 rounded-lg border border-border p-4">
            {availableSites.map((site) => (
              <div key={site.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={site.id}
                    checked={isSiteSelected(site.id)}
                    onCheckedChange={() => handleSiteToggle(site.id, site.name)}
                  />
                  <Label htmlFor={site.id} className="cursor-pointer font-medium">
                    {site.name}
                  </Label>
                </div>
                {isSiteSelected(site.id) && (
                  <div className="ml-7 flex gap-4">
                    {(["view", "edit", "publish"] as const).map((permission) => (
                      <div key={permission} className="flex items-center gap-2">
                        <Checkbox
                          id={`${site.id}-${permission}`}
                          checked={getSitePermissions(site.id).includes(permission)}
                          onCheckedChange={() =>
                            handlePermissionToggle(site.id, permission)
                          }
                        />
                        <Label
                          htmlFor={`${site.id}-${permission}`}
                          className="cursor-pointer text-sm capitalize text-muted-foreground"
                        >
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
