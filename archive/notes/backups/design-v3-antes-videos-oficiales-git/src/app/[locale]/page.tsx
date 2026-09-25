import { notFound } from "next/navigation";
import { ScrollHero } from "@/components/ScrollHero";
import { Marquee } from "@/components/Marquee";
import { MediaFilmstrip } from "@/components/MediaFilmstrip";
import { DifferentiatorSection } from "@/components/DifferentiatorSection";
import { SectorsBand } from "@/components/SectorsBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { StatsStrip } from "@/components/StatsStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { ReelBand } from "@/components/ReelBand";
import { ServiceCard } from "@/components/ServiceCard";
import { InstagramGrid } from "@/components/InstagramGrid";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { FaqSection } from "@/components/FaqSection";
import { MetadataTicker } from "@/components/MetadataTicker";
import { SectionHeading, Button } from "@/components/ui";
import { getPortfolioCaseLabels } from "@/lib/portfolio-labels";
import {
  getInstagramPosts,
  getPages,
  getPortfolio,
  getServices,
  getSiteConfig,
} from "@/lib/content";
import { buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import { getRoute, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const site = getSiteConfig();
  return buildMetadata({ locale, description: site.description[locale] });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const site = getSiteConfig();
  const pages = getPages(locale);
  const services = getServices(locale);
  const portfolio = getPortfolio(locale).filter((p) => p.featured).slice(0, 3);
  const instagramPosts = getInstagramPosts(locale);
  const { home } = pages;

  const jsonLd = buildOrganizationJsonLd(locale);
  const instagramHandle = site.contact.instagram
    .replace(/https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/\/$/, "");

  const caseLabels = getPortfolioCaseLabels(pages.portfolio);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollHero
        locale={locale}
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        description={home.hero.description}
        ctaPrimary={home.hero.ctaPrimary}
        ctaSecondary={home.hero.ctaSecondary}
        videoSrc={site.heroVideo}
        posterSrc={site.heroPoster}
      />

      <Marquee text={home.marqueeText} />
      {home.marqueeMedia && home.marqueeMedia.length > 0 && (
        <MediaFilmstrip
          items={home.marqueeMedia.map((src) => ({ src }))}
          reverse
        />
      )}

      {home.metadataTicker && home.metadataTicker.length > 0 && (
        <MetadataTicker items={home.metadataTicker} />
      )}

      <DifferentiatorSection
        eyebrow={home.differentiatorSection.eyebrow}
        title={home.differentiatorSection.title}
        subtitle={home.differentiatorSection.subtitle}
        contrast={home.differentiatorSection.contrast}
        pillars={home.differentiatorSection.pillars}
        media={home.differentiatorSection.media}
      />

      <SectorsBand title={home.sectorsSection.title} sectors={pages.sectors} />

      <BeforeAfterSection
        title={home.beforeAfterSection.title}
        subtitle={home.beforeAfterSection.subtitle}
        rawLabel={home.beforeAfterSection.rawLabel}
        editedLabel={home.beforeAfterSection.editedLabel}
        dragHint={home.beforeAfterSection.dragHint}
        image={home.beforeAfterSection.image}
      />

      <StatsStrip stats={home.statsSection} />

      <section className="border-b border-border py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            title={home.portfolioSection.title}
            subtitle={home.portfolioSection.subtitle}
          />
          <PortfolioShowcase
            items={portfolio}
            featuredLabel={home.portfolioSection.featuredLabel}
            caseLabels={caseLabels}
            locale={locale}
          />
          <div className="mt-12 text-center">
            <Button href={getRoute(locale, "portfolio")} variant="secondary" showArrow>
              {pages.nav.portfolio}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <SectionHeading
          title={home.servicesSection.title}
          subtitle={home.servicesSection.subtitle}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services
            .filter((s) => s.featured)
            .map((service, i) => (
              <ServiceCard key={service.id} service={service} locale={locale} index={i} />
            ))}
        </div>
        <div className="mt-12 text-center">
          <Button href={getRoute(locale, "services")} variant="secondary" showArrow>
            {pages.nav.services}
          </Button>
        </div>
      </section>

      <InstagramGrid
        title={home.instagramSection.title}
        subtitle={home.instagramSection.subtitle}
        handle={instagramHandle}
        profileUrl={site.contact.instagram}
        followLabel={home.instagramSection.followLabel}
        posts={instagramPosts}
      />

      <ReviewsSection
        title={home.reviewsSection.title}
        subtitle={home.reviewsSection.subtitle}
        items={home.reviewsSection.items}
      />

      <ReelBand
        title={home.reelSection.title}
        subtitle={home.reelSection.subtitle}
        cta={home.reelSection.cta}
        href={getRoute(locale, "portfolio")}
        image={home.reelSection.image}
        video={home.reelSection.video}
      />

      <ProcessSteps
        title={home.processSection.title}
        subtitle={home.processSection.subtitle}
        steps={home.processSection.steps}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <SectionHeading title={home.whySection.title} />
        <div className="grid gap-12 md:grid-cols-3">
          {home.whySection.items.map((item, i) => (
            <div key={item.title} className="border-t border-border pt-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection
        title={home.faqSection.title}
        subtitle={home.faqSection.subtitle}
        items={home.faqSection.items}
      />

      <section className="border-t border-border bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            24Shoots
          </p>
          <h2 className="mt-4 text-balance text-3xl font-light tracking-tight md:text-4xl">
            {home.ctaSection.title}
          </h2>
          <p className="mt-4 text-muted">{home.ctaSection.description}</p>
          <div className="mt-10">
            <Button href={getRoute(locale, "contact")} showArrow>
              {home.ctaSection.button}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
