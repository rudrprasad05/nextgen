import {
  Code2,
  CreditCard,
  Layers,
  MousePointerClick,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: MousePointerClick,
    title: "Drag & Drop Builder",
    description:
      "Intuitive visual editor with live preview. Build layouts by dragging elements exactly where you want them.",
  },
  {
    icon: Code2,
    title: "Automatic Code Generation",
    description:
      "Export fully working Next.js projects with clean, production-ready code. No manual coding required.",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description:
      "Generate content, layouts, and styles with AI assistance. Speed up your workflow 10x.",
  },
  {
    icon: Layers,
    title: "Customizable Components",
    description:
      "Headings, paragraphs, images, sections, and more. Full control over styles and properties.",
  },
  {
    icon: Users,
    title: "Admin Dashboard",
    description:
      "Manage users, sites, and permissions easily. Built-in role-based access control.",
  },
  {
    icon: CreditCard,
    title: "One-Time Purchase",
    description:
      "Pay once, own forever. No subscriptions, no recurring fees. Lifetime updates included.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Everything you need to build the web
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            A complete toolkit for creating, managing, and deploying static
            websites without writing code.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/40 flex items-center justify-center mb-4 group-hover:bg-purple-400/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
