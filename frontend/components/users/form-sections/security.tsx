"use client"

import React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserFormData } from "@/lib/users/types"

interface SecurityProps {
  formData: UserFormData
  onChange: <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => void
}

export function SecuritySection({ formData, onChange }: SecurityProps) {
  const [ipInput, setIpInput] = useState("")

  const handleAddIp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const ip = ipInput.trim().replace(",", "")
      if (ip && !formData.ipWhitelist.includes(ip)) {
        onChange("ipWhitelist", [...formData.ipWhitelist, ip])
        setIpInput("")
      }
    }
  }

  const handleRemoveIp = (ipToRemove: string) => {
    onChange(
      "ipWhitelist",
      formData.ipWhitelist.filter((ip) => ip !== ipToRemove)
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network & Security Restrictions</CardTitle>
        <CardDescription>Configure IP restrictions and security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="restrict-ip">Restrict access by IP</Label>
            <p className="text-sm text-muted-foreground">
              Only allow login from specific IP addresses
            </p>
          </div>
          <Switch
            id="restrict-ip"
            checked={formData.restrictByIp}
            onCheckedChange={(checked) => onChange("restrictByIp", checked)}
          />
        </div>

        {formData.restrictByIp && (
          <div className="space-y-2">
            <Label htmlFor="ip-whitelist">IP Whitelist</Label>
            <Input
              id="ip-whitelist"
              placeholder="Enter IP address and press Enter"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              onKeyDown={handleAddIp}
            />
            {formData.ipWhitelist.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.ipWhitelist.map((ip) => (
                  <Badge key={ip} variant="secondary" className="gap-1 pr-1">
                    {ip}
                    <button
                      type="button"
                      onClick={() => handleRemoveIp(ip)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {ip}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Press Enter or comma to add an IP address
            </p>
          </div>
        )}

        <div className="rounded-lg border border-dashed border-border p-4">
          <p className="text-sm text-muted-foreground">
            Login time restrictions coming soon
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
