"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/errors/error-page"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <ErrorPage
      code="500"
      title="Something Went Wrong"
      description="An unexpected error occurred. Our team has been notified and is working to fix the issue. Please try again later."
      showHomeButton
      showRetryButton
      onRetry={reset}
    />
  )
}
