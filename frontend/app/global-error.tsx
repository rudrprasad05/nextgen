"use client"

import { useEffect } from "react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <span className="text-[10rem] font-bold leading-none tracking-tighter text-gray-100">
                500
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold tracking-tight text-gray-900">
                  500
                </span>
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Something Went Wrong
              </h1>
              <p className="text-gray-600">
                A critical error occurred. Please try refreshing the page or come
                back later.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={reset}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Try Again
              </button>
              <a
                href="/"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
