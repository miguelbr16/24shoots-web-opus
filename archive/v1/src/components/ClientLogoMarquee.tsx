"use client";

import Image from "next/image";
import type { ClientLogo } from "@/lib/types";

interface ClientLogoMarqueeProps {
  clients: ClientLogo[];
  ariaLabel: string;
}

function monogram(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

function LogoChip({ client }: { client: ClientLogo }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-elevated shadow-md ring-1 ring-accent/15 sm:h-16 sm:w-16"
      title={client.name}
    >
      {client.logo ? (
        <Image
          src={client.logo}
          alt={client.name}
          width={64}
          height={64}
          unoptimized
          className="h-[72%] w-[72%] object-contain"
        />
      ) : (
        <span className="text-[8px] font-bold uppercase tracking-wide text-foreground/90">
          {monogram(client)}
        </span>
      )}
    </div>
  );
}

export function ClientLogoMarquee({ clients, ariaLabel }: ClientLogoMarqueeProps) {
  if (clients.length === 0) return null;

  const track = [...clients, ...clients, ...clients];

  return (
    <div className="overflow-hidden py-2" aria-label={ariaLabel}>
      <div className="flex w-max animate-marquee gap-5 px-2">
        {track.map((client, i) => (
          <LogoChip key={`${client.id}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}
