import Image from "next/image";
import Link from "next/link";
import { caseMedia } from "@/content/cases";
import { t } from "@/content/copy";
import { href, type L, type Locale } from "@/lib/i18n";

const SHEET_ALTS: L<string[]> = {
  es: [
    "Vista aérea del recinto antes de empezar",
    "Invitados en el photocall del 50 aniversario",
    "Invitados reunidos antes de los discursos",
    "Bandera de Huhtamaki en primer plano",
    "Dirección escuchando los discursos",
    "Discurso en el escenario",
    "Brindis junto a la tarta del aniversario",
    "Invitados con sombrero posando",
    "Paella servida en la comida",
    "Banda tocando en directo",
    "Vista aérea de los asistentes bailando",
    "Foto de grupo frente a la planta",
  ],
  en: [
    "Aerial view of the site before it starts",
    "Guests at the 50th anniversary photocall",
    "Guests gathering before the speeches",
    "Huhtamaki flag in the foreground",
    "Leadership listening to the speeches",
    "Speech on stage",
    "Toast next to the anniversary cake",
    "Guests in hats posing",
    "Paella served at lunch",
    "Band playing live",
    "Aerial view of guests dancing",
    "Group photo in front of the site",
  ],
};

const tc = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const f = Math.floor((s % 1) * 25);
  return `00:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

/** "Un día, todo el año": the proposition, shown with a real contact sheet. */
export function DaySection({ locale }: { locale: Locale }) {
  const c = t(locale).day;
  const m = caseMedia("huhtamaki-50");
  const sheet = m.sheet!;
  const times = m.sheetTimes!;
  return (
    <section aria-labelledby="day-title" className="on-paper py-20 md:py-32">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="t-mono text-soot">{c.kicker}</p>
          <h2 id="day-title" className="t-h2 mt-5">
            {c.title}
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="t-lead">{c.body}</p>
          <p className="t-mono mt-10 text-soot">{c.fromOneShoot}</p>
          <ul className="mt-3">
            {c.outputs.map((o) => (
              <li key={o} className="flex items-baseline gap-3 py-2.5 rule-b">
                <span className="rec-dot bg-rec-deep!" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>

        <figure className="col-span-12 mt-6 md:mt-12">
          <ol className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-6">
            {sheet.map((src, i) => (
              <li key={src} data-reveal="expose" style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
                <div className="relative aspect-video bg-ink">
                  <Image src={src} alt={SHEET_ALTS[locale][i]} fill sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw" quality={65} className="object-cover" />
                </div>
                <span className="t-mono mt-1.5 flex justify-between text-[0.62rem] text-soot">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden sm:inline">{tc(times[i])}</span>
                </span>
              </li>
            ))}
          </ol>
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
            <span className="t-mono text-soot">{c.sheetCaption}</span>
            <Link className="link" href={href.case(locale, "huhtamaki-50")}>
              {t(locale).work.view} →
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
