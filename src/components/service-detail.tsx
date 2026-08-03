import type { StaticImageData } from "next/image";

import { PageHero } from "@/components/page-hero";
import { ContactCTA } from "@/components/contact-cta";
import { RelatedRail, type ServiceItem } from "@/components/service-links";

/**
 * Shared detail layout for a practice area or an industry sector. Both content
 * types share the same shape — intro paragraphs plus a checklist of services —
 * so they share one presentation.
 */
export function ServiceDetail({
  kind,
  name,
  intro,
  servicesLead,
  services,
  statute,
  image,
  crumbLabel,
  crumbHref,
  related,
}: {
  kind: string;
  name: string;
  intro: readonly string[];
  servicesLead: string;
  services: readonly string[];
  statute?: string;
  image?: StaticImageData;
  crumbLabel: string;
  crumbHref: string;
  related: {
    title: string;
    items: readonly ServiceItem[];
    base: string;
    currentSlug: string;
    seeAllHref: string;
    slug: string;
  };
}) {
  return (
    <>
      <PageHero
        eyebrow={kind}
        title={name}
        lead={intro[0]}
        image={image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: crumbLabel, href: crumbHref },
          { label: name },
        ]}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          {/* Left rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-copper-500">{kind}</p>
              <p className="mt-4 font-display text-2xl leading-snug text-brand-900">
                {name}
              </p>
              {statute && (
                <div className="mt-6 border-l-2 border-copper-400/70 pl-4">
                  <p className="eyebrow text-brand-500">Worked under</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {statute}
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Body */}
          <div className="lg:col-span-8" data-reveal>
            <div className="space-y-6">
              {intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base leading-relaxed text-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-line pt-10">
              <h2 className="font-display text-2xl tracking-tight text-brand-900">
                {servicesLead}
              </h2>
              <ul className="mt-7 grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
                {services.map((service) => (
                  <li
                    key={service.slice(0, 40)}
                    className="flex gap-3 border-b border-line py-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-400"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-brand-800">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RelatedRail
        title={related.title}
        items={related.items}
        base={related.base}
        currentSlug={related.slug}
        seeAllHref={related.seeAllHref}
      />

      <ContactCTA />
    </>
  );
}
