import Link from "next/link";

/** The 24SHOOTS action: a rectangular orange label with its own arrow cell. */
export function CtaSlab({ href, children, block, className = "" }: { href: string; children: React.ReactNode; block?: boolean; className?: string }) {
  return (
    <Link href={href} className={`cta-slab ${block ? "cta-slab--block" : ""} ${className}`}>
      <span>{children}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}
