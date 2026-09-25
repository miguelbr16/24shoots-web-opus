type AccentRuleAlign = "left" | "center";

interface AccentRuleProps {
  align?: AccentRuleAlign;
  wide?: boolean;
  className?: string;
}

export function AccentRule({
  align = "left",
  wide = false,
  className = "",
}: AccentRuleProps) {
  const width = wide ? "w-24" : "w-14";
  const alignClass = align === "center" ? "mx-auto" : "";

  return (
    <div
      className={`h-px ${width} bg-accent/90 ${alignClass} ${className}`}
      aria-hidden
    />
  );
}

interface AccentDividerProps {
  className?: string;
}

/** Línea horizontal fina naranja que desvanece en los extremos */
export function AccentDivider({ className = "" }: AccentDividerProps) {
  return (
    <div
      className={`accent-divider mx-auto w-full max-w-6xl ${className}`}
      aria-hidden
    />
  );
}
