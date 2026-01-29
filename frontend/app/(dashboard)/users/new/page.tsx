"use client"

import React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/users/page-header"
import { BasicInfoSection } from "@/components/users/form-sections/basic-info"
import { RoleAccessSection } from "@/components/users/form-sections/role-access"
import { SiteAccessSection } from "@/components/users/form-sections/site-access"
import { PagePermissionsSection } from "@/components/users/form-sections/page-permissions"
import { SecuritySection } from "@/components/users/form-sections/security"
import { AdvancedSettingsSection } from "@/components/users/form-sections/advanced-settings"
import { defaultFormData, type UserFormData } from "@/lib/users/types"

export default function CreateUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<UserFormData>(defaultFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = <K extends keyof UserFormData>(field: K, value: UserFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field as string]
        return newErrors
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = useMemo(() => {
    return (
      formData.username.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword
    )
  }, [formData.username, formData.email, formData.password, formData.confirmPassword])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      siteAccess: formData.siteAccess,
      pagePermissions: formData.pagePermissions.map((p) => p.pageId),
      ipWhitelist: formData.ipWhitelist,
      flags: formData.flags,
    }

    console.log("POST /api/users payload:", payload)
    router.push("/dashboard/users")
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Create User"
        breadcrumbs={[
          { label: "Users", href: "/dashboard/users" },
          { label: "Create User" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6 p-6">
          <BasicInfoSection
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
          <RoleAccessSection formData={formData} onChange={handleChange} />
          {formData.accessType === "restricted" && (
            <>
              <SiteAccessSection formData={formData} onChange={handleChange} />
              <PagePermissionsSection formData={formData} onChange={handleChange} />
            </>
          )}
          <SecuritySection formData={formData} onChange={handleChange} />
          <AdvancedSettingsSection formData={formData} onChange={handleChange} />

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-background py-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/users">Cancel</Link>
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Create User
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
