import { Download, Eye, MousePointer2, Sliders } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointer2,
    title: "Drag & Drop Elements",
    description:
      "Select from headings, paragraphs, images, and sections. Drag them onto the canvas to build your layout.",
  },
  {
    number: "02",
    icon: Sliders,
    title: "Configure Styles",
    description:
      "Use the inspector panel to adjust colors, spacing, typography, and more. See changes in real-time.",
  },
  {
    number: "03",
    icon: Eye,
    title: "Preview Live",
    description:
      "Preview your page exactly as it will appear. Test responsiveness across different screen sizes.",
  },
  {
    number: "04",
    icon: Download,
    title: "Export & Deploy",
    description:
      "Export a production-ready Next.js project. Deploy anywhere or run locally with Docker.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            From idea to deployment in minutes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            A simple four-step workflow to build and ship websites faster than
            ever.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] right-[-50%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="text-center">
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/50 border border-border/50 mb-6">
                  <step.icon className="w-7 h-7 text-purple-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
