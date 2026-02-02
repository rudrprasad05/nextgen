const testimonials = [
  {
    quote:
      "NextGen has completely transformed how we deliver client projects. What used to take weeks now takes days.",
    author: "Sarah Chen",
    role: "Agency Owner",
    company: "PixelCraft Studios",
  },
  {
    quote:
      "The code export is remarkably clean. It's like having a senior developer build your Next.js projects.",
    author: "Marcus Rodriguez",
    role: "Lead Developer",
    company: "TechForward Inc.",
  },
  {
    quote:
      "Finally, a page builder that doesn't lock you in. Export, modify, deploy anywhere. Game changer.",
    author: "Emily Watson",
    role: "Freelance Developer",
    company: "Independent",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-purple-400 mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Loved by developers
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl border border-border/50 bg-card/30"
            >
              <blockquote className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-background font-semibold text-sm">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
