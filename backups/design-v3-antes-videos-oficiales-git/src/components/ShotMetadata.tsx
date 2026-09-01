interface ShotMetadataProps {
  items: string[];
  className?: string;
  size?: "sm" | "md";
}

export function ShotMetadata({ items, className = "", size = "sm" }: ShotMetadataProps) {
  const text =
    size === "sm"
      ? "text-[9px] tracking-[0.22em]"
      : "text-[10px] tracking-[0.28em]";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono uppercase text-muted ${text} ${className}`}
      aria-hidden
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-3">
          {i > 0 && <span className="text-accent/40">/</span>}
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
