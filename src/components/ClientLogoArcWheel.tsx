"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { ClientLogo } from "@/lib/types";
import type { ReactNode } from "react";

interface ClientLogoArcWheelProps {
  clients: ClientLogo[];
  ariaLabel: string;
  center: ReactNode;
}

const TARGET_LOGO_COUNT = 22;
const ORBIT_DURATION_S = 58;

function monogram(client: ClientLogo): string {
  return client.monogram ?? client.name.slice(0, 3).toUpperCase();
}

function buildWheelClients(clients: ClientLogo[]): ClientLogo[] {
  if (clients.length === 0) return [];
  if (clients.length >= TARGET_LOGO_COUNT) return clients.slice(0, TARGET_LOGO_COUNT);
  const out: ClientLogo[] = [];
  for (let i = 0; i < TARGET_LOGO_COUNT; i++) {
    out.push(clients[i % clients.length]);
  }
  return out;
}

export function ClientLogoArcWheel({ clients, ariaLabel, center }: ClientLogoArcWheelProps) {
  const wheelClients = useMemo(() => buildWheelClients(clients), [clients]);
  const n = wheelClients.length;
  if (n === 0) return null;

  const uniqueCount = clients.length;

  return (
    <div
      className="client-wheel-group relative mx-auto w-full max-w-[48rem]"
      aria-label={ariaLabel}
    >
      <div className="relative h-[clamp(20rem,60vw,28rem)] overflow-hidden md:h-[29rem]">
        <div className="client-orbit-stage absolute inset-0">
          {/* Anillo fijo — nunca se anima */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="client-orbit-ring aspect-square rounded-full border border-border/60" />
          </div>

          {/* Logos recorren un círculo fijo (offset-path) */}
          {wheelClients.map((client, i) => {
            const isDuplicate = i >= uniqueCount;
            return (
              <div
                key={`${client.id}-${i}`}
                className="client-orbit-item pointer-events-auto"
                style={{
                  animationDelay: `${-(i / n) * ORBIT_DURATION_S}s`,
                  ["--orbit-offset" as string]: `${(i / n) * 100}%`,
                }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-elevated shadow-[0_12px_32px_rgba(0,0,0,0.5)] ring-1 ring-accent/20 sm:h-[4.5rem] sm:w-[4.5rem] md:h-24 md:w-24"
                  title={client.name}
                  aria-hidden={isDuplicate}
                >
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={isDuplicate ? "" : client.name}
                      width={80}
                      height={80}
                      unoptimized
                      className="h-[76%] w-[76%] object-contain"
                    />
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-wide text-foreground/90">
                      {monogram(client)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(ellipse_50%_42%_at_50%_50%,var(--color-background)_0%,var(--color-background)_38%,transparent_72%)]"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4">
          <div className="pointer-events-auto w-full max-w-[17rem] text-center sm:max-w-xs md:max-w-sm">
            {center}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent md:h-12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
