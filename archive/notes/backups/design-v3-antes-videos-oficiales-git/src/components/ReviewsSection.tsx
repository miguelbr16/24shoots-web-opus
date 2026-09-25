import { SectionHeading } from "./ui";

interface Review {
  quote: string;
  author: string;
  role: string;
  service: string;
}

interface ReviewsSectionProps {
  title: string;
  subtitle: string;
  items: Review[];
}

function Stars() {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 fill-accent"
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.35 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection({ title, subtitle, items }: ReviewsSectionProps) {
  return (
    <section className="border-y border-border bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {items.map((item) => (
            <article key={item.author} className="flex flex-col bg-background p-8 md:p-10">
              <Stars />
              <blockquote className="mt-6 flex-1 text-base font-light leading-relaxed text-foreground">
                <span className="text-premium/60">&ldquo;</span>
                {item.quote}
                <span className="text-premium/60">&rdquo;</span>
              </blockquote>
              <footer className="mt-8 border-t border-border pt-6">
                <p className="text-sm font-medium">{item.author}</p>
                <p className="mt-1 text-xs text-muted">{item.role}</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.service}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
