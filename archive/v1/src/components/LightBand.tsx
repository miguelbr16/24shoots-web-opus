type LightBandAccent = "top" | "none";

interface LightBandProps {
  children: React.ReactNode;
  accent?: LightBandAccent;
  bright?: boolean;
  className?: string;
  innerClassName?: string;
  contained?: boolean;
}

export function LightBand({
  children,
  accent = "none",
  bright = false,
  className = "",
  innerClassName = "",
  contained = true,
}: LightBandProps) {
  const accentTop =
    accent === "top" ? "section-rule-strong-t" : "border-t-accent/40";
  const bgClass = bright ? "bg-light-band-bright" : "bg-light-band";

  return (
    <section
      className={`border-y border-light-band-border border-b-accent/25 py-12 text-light-band-text md:py-16 ${bgClass} ${accentTop} ${className}`}
    >
      {contained ? (
        <div className={`mx-auto max-w-6xl px-4 md:px-6 ${innerClassName}`}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
