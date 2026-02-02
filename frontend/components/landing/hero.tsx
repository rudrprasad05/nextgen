"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-border/50 bg-secondary/30 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Pay Once, Own Forever
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance mb-6">
          <span className="text-foreground">Build Websites.</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            No Limits.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
          Drag, drop, and export fully working Next.js websites with AI-powered helpers. The complete platform for developers and agencies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-base rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-border/50 bg-transparent hover:bg-secondary/50">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        {/* Terminal snippet */}
        <div className="mt-16 max-w-md mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary/30 border border-border/50 font-mono text-sm text-muted-foreground">
            <span className="text-cyan-400">$</span>
            <span>npx create-nextgen-app@latest</span>
          </div>
        </div>
      </div>
    </section>
  )
}
