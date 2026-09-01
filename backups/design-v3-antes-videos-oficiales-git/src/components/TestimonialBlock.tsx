interface TestimonialBlockProps {
  label: string;
  quote: string;
  author: string;
  role: string;
}

export function TestimonialBlock({ label, quote, author, role }: TestimonialBlockProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
          {label}
        </p>
        <blockquote className="mt-8 text-2xl font-light leading-relaxed tracking-tight text-foreground md:text-3xl">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <footer className="mt-10">
          <p className="text-sm font-medium">{author}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">{role}</p>
        </footer>
      </div>
    </section>
  );
}
