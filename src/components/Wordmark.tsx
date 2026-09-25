/**
 * Typographic wordmark. PENDING: replace with the vector logo when 24SHOOTS supplies it
 * (only a 150 px JPG exists, see archive/brand/). Colour logic follows that logo: "24" in orange.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`t-credit inline-flex items-baseline text-[1.55rem] leading-none ${className}`}>
      <span className="sr-only">24SHOOTS</span>
      <span aria-hidden className="text-rec">24</span>
      <span aria-hidden>SHOOTS</span>
    </span>
  );
}
