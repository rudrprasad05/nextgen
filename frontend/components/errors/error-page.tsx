'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  code: string
  title: string
  description: string
  showHomeButton?: boolean
  showBackButton?: boolean
  showRetryButton?: boolean
  onRetry?: () => void
}

export function ErrorPage({
  code,
  title,
  description,
  showHomeButton = true,
  showBackButton = false,
  showRetryButton = false,
  onRetry,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <span className="text-[10rem] font-bold leading-none tracking-tighter text-muted-foreground/10">
            {code}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold tracking-tight text-foreground">
              {code}
            </span>
          </div>
        </div>

        <div className="max-w-md space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="bg-transparent"
            >
              Go Back
            </Button>
          )}
          {showRetryButton && onRetry && (
            <Button variant="outline" onClick={onRetry} className="bg-transparent">
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <Link href="/support" className="text-primary underline-offset-4 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
