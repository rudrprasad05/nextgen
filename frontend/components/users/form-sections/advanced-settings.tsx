"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserFormData } from "@/lib/users/types"

interface AdvancedSettingsProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => void
}

export function AdvancedSettingsSection({ formData, onChange }: AdvancedSettingsProps) {
  const handleFlagChange = (flag: keyof UserFormData["flags"], value: boolean) => {
    onChange("flags", {
      ...formData.flags,
      [flag]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>Configure advanced user capabilities and notes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="can-manage-users">Can manage users</Label>
              <p className="text-sm text-muted-foreground">
                Allow this user to create, edit, and disable other users
              </p>
            </div>
            <Switch
              id="can-manage-users"
              checked={formData.flags.canManageUsers}
              onCheckedChange={(checked) => handleFlagChange("canManageUsers", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="can-manage-roles">Can manage roles</Label>
              <p className="text-sm text-muted-foreground">
                Allow this user to create and modify roles
              </p>
            </div>
            <Switch
              id="can-manage-roles"
              checked={formData.flags.canManageRoles}
              onCheckedChange={(checked) => handleFlagChange("canManageRoles", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="can-deploy-sites">Can deploy sites</Label>
              <p className="text-sm text-muted-foreground">
                Allow this user to publish and deploy sites
              </p>
            </div>
            <Switch
              id="can-deploy-sites"
              checked={formData.flags.canDeploySites}
              onCheckedChange={(checked) => handleFlagChange("canDeploySites", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes / Internal Comments</Label>
          <Textarea
            id="notes"
            placeholder="Add any internal notes about this user..."
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
