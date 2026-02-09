import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const features = [
  "Unlimited sites",
  "Unlimited exports",
  "AI-powered assistance",
  "Full source code access",
  "Docker deployment ready",
  "Lifetime updates",
  "Priority support",
  "Commercial license",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Pay once, own forever
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            No subscriptions. No recurring fees. One purchase gives you lifetime
            access to everything.
          </p>
        </div>

        {/* Pricing card */}
        <div className="relative max-w-lg mx-auto">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-400/10 rounded-3xl blur-xl" />

          <div className="relative p-8 md:p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Lifetime License
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-6xl font-bold">$30</span>
                <span className="text-muted-foreground">USD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                One-time payment
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-400/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="w-full h-12 text-base rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/dashboard">
                Get NextGen Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
