import Image from "next/image";



interface DifferentiatorSectionProps {

  eyebrow: string;

  title: string;

  subtitle: string;

  contrast: { instead: string; with: string }[];

  pillars: { title: string; description: string }[];

  media?: string[];

}



export function DifferentiatorSection({

  eyebrow,

  title,

  subtitle,

  contrast,

  pillars,

  media = [],

}: DifferentiatorSectionProps) {

  return (

    <section className="border-b border-border bg-background py-24 md:py-32">

      <div className="mx-auto max-w-6xl px-4 md:px-6">

        {media.length > 0 && (

          <div className="mb-14 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">

            {media.slice(0, 4).map((src) => (

              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-media">

                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />

                <div className="absolute inset-0 bg-black/15" />

              </div>

            ))}

          </div>

        )}



        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">

              {eyebrow}

            </p>

            <h2 className="mt-5 text-balance text-4xl font-light leading-[1.08] tracking-tight md:text-5xl">

              {title}

            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">

              {subtitle}

            </p>



            <ul className="mt-10 space-y-4">

              {contrast.map((item) => (

                <li

                  key={item.instead}

                  className="border-l-2 border-accent/40 pl-5"

                >

                  <p className="text-sm text-muted/70 line-through decoration-muted/40">

                    {item.instead}

                  </p>

                  <p className="mt-1 text-sm font-medium text-foreground">

                    {item.with}

                  </p>

                </li>

              ))}

            </ul>

          </div>



          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">

            {pillars.map((pillar, i) => (

              <div key={pillar.title} className="bg-background p-8">

                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/60">

                  {String(i + 1).padStart(2, "0")}

                </span>

                <h3 className="mt-4 text-base font-medium tracking-tight">

                  {pillar.title}

                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">

                  {pillar.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );

}

