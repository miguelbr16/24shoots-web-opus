import Image from "next/image";

import { SectionHeading } from "./ui";



interface ProcessStepsProps {

  title: string;

  subtitle: string;

  steps: { title: string; description: string; image?: string }[];

}



export function ProcessSteps({ title, subtitle, steps }: ProcessStepsProps) {

  return (

    <section className="border-y border-border bg-surface py-24 md:py-32">

      <div className="mx-auto max-w-6xl px-4 md:px-6">

        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, i) => (

            <div key={step.title} className="bg-background">

              {step.image && (

                <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-media">

                  <Image

                    src={step.image}

                    alt=""

                    fill

                    className="object-cover"

                    sizes="(max-width: 1024px) 50vw, 25vw"

                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                </div>

              )}

              <div className="p-8 md:p-10">

                <span className="text-4xl font-light text-accent/40">

                  {String(i + 1).padStart(2, "0")}

                </span>

                <h3 className="mt-6 text-base font-medium tracking-tight">{step.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

