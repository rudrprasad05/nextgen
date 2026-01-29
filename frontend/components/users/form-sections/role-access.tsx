"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserFormData } from "@/lib/users/types"

interface RoleAccessProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => void
}

export function RoleAccessSection({ formData, onChange }: RoleAccessProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Role & Global Access</CardTitle>
        <CardDescription>Define the user's role and system-wide access level.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Role</Label>
          <RadioGroup
            value={formData.role}
            onValueChange={(value) => onChange("role", value as "admin" | "user" | "custom")}
            className="grid gap-3 sm:grid-cols-3"
          >
            <Label
              htmlFor="role-admin"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value="admin" id="role-admin" />
              <div>
                <p className="font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">Full system access</p>
              </div>
            </Label>
            <Label
              htmlFor="role-user"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value="user" id="role-user" />
              <div>
                <p className="font-medium">User</p>
                <p className="text-xs text-muted-foreground">Standard access</p>
              </div>
            </Label>
            <Label
              htmlFor="role-custom"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value="custom" id="role-custom" />
              <div>
                <p className="font-medium">Custom</p>
                <p className="text-xs text-muted-foreground">Custom permissions</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Access Type</Label>
          <RadioGroup
            value={formData.accessType}
            onValueChange={(value) => onChange("accessType", value as "full" | "restricted")}
            className="grid gap-3 sm:grid-cols-2"
          >
            <Label
              htmlFor="access-full"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value="full" id="access-full" />
              <div>
                <p className="font-medium">Full System Access</p>
                <p className="text-xs text-muted-foreground">Unrestricted access to all features</p>
              </div>
            </Label>
            <Label
              htmlFor="access-restricted"
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
            >
              <RadioGroupItem value="restricted" id="access-restricted" />
              <div>
                <p className="font-medium">Restricted Access</p>
                <p className="text-xs text-muted-foreground">Permissions configured below</p>
              </div>
            </Label>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
