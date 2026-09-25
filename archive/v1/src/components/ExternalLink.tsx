import Link from "next/link";
import type { ComponentProps } from "react";

type ExternalLinkProps = Omit<ComponentProps<typeof Link>, "target" | "rel">;

/**
 * Enlaces externos. suppressHydrationWarning evita avisos cuando extensiones
 * del navegador modifican estilos del <a> antes de que React hidrate.
 */
export function ExternalLink({ children, className, ...props }: ExternalLinkProps) {
  return (
    <Link
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      suppressHydrationWarning
    >
      {children}
    </Link>
  );
}

type ExternalAnchorProps = ComponentProps<"a">;

export function ExternalAnchor({
  children,
  className,
  href,
  ...props
}: ExternalAnchorProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      suppressHydrationWarning
    >
      {children}
    </a>
  );
}
