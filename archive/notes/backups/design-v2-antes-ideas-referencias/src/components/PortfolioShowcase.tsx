import Link from "next/link";
import type { PortfolioItem } from "@/lib/types";
import { PlayIcon } from "./icons/ServiceIcon";
import { MediaCover } from "./MediaCover";

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  featuredLabel: string;
}

function ShowcaseTile({
  item,
  featuredLabel,
  large,
}: {
  item: PortfolioItem;
  featuredLabel?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={item.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden bg-media ${large ? "lg:col-span-7" : "min-h-[220px] lg:min-h-0"}`}
    >
      <div
        className={`relative overflow-hidden ${
          large ? "aspect-[4/5] lg:aspect-auto lg:min-h-[540px]" : "h-full min-h-[220px]"
        }`}
      >
        <MediaCover
          image={item.thumbnail}
          video={item.videoUrl}
          alt={item.title}
          imageClassName="object-cover transition duration-700 group-hover:scale-105"
          sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-100 transition group-hover:opacity-0">
            <span className="flex h-14 w-14 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-sm">
              <PlayIcon />
            </span>
          </div>
        )}
        <div className={`absolute bottom-0 left-0 ${large ? "p-8 md:p-10" : "p-6"}`}>
          {featuredLabel && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
              {featuredLabel}
            </p>
          )}
          <h3
            className={`font-light tracking-tight ${large ? "mt-3 text-2xl md:text-3xl" : "text-lg font-medium"}`}
          >
            {item.title}
          </h3>
          {large && item.description && (
            <p className="mt-3 max-w-md text-sm text-foreground/70">{item.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function PortfolioShowcase({ items, featuredLabel }: PortfolioShowcaseProps) {
  const [lead, ...rest] = items;

  return (
    <div className="grid gap-px bg-border lg:grid-cols-12">
      {lead && <ShowcaseTile item={lead} featuredLabel={featuredLabel} large />}
      <div className="grid grid-rows-2 gap-px bg-border lg:col-span-5 lg:min-h-[540px]">
        {rest.slice(0, 2).map((item) => (
          <ShowcaseTile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
