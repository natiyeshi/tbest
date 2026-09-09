import type { Metadata } from "next";

import { LogoMark } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { SocialIcon } from "@/components/social-icon";
import { firm } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";

export const metadata: Metadata = {
  title: "Contact — TBeST Law LLP",
  description:
    "Contact TBeST Law LLP in Addis Ababa, Ethiopia. Our office on Africa Avenue, by phone, email, or the enquiry form.",
};

export default function ContactPage() {
  const allPhones = [firm.phones.office, ...firm.phones.mobile];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are working on."
        lead="Send a short note describing the matter and we will come back to you with the right partner for it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={firmPhotos.boardroomPartners.src}
        // The partners sit low in this frame, so hold the bottom of it.
        imagePosition="center 62%"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5" data-reveal>
              <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 lg:p-10">
                <LogoMark
                  ringWidth={4}
                  className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 text-copper-500/[0.10]"
                />
                <dl className="relative space-y-8">
                  <div>
                    <dt className="eyebrow text-copper-300">Email</dt>
                    <dd className="mt-3">
                      <a
                        href={`mailto:${firm.email}`}
                        className="font-display text-xl text-white transition-colors hover:text-copper-300"
                      >
                        {firm.email}
                      </a>
                    </dd>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <dt className="eyebrow text-copper-300">Phone</dt>
                    <dd className="mt-3 space-y-1.5">
                      {allPhones.map((phone, index) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-sm text-brand-100/80 transition-colors hover:text-white"
                        >
                          {phone}
                          {index === 0 && (
                            <span className="ml-2 text-xs text-brand-100/50">Office</span>
                          )}
                        </a>
                      ))}
                    </dd>
                  </div>

                  <div className="border-t border-white/10 pt-8">
                    <dt className="eyebrow text-copper-300">Follow</dt>
                    <dd className="mt-3 flex flex-wrap gap-2.5">
                      {firm.social.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-brand-100/80 transition-colors hover:border-copper-300/60 hover:bg-white/5 hover:text-white"
                        >
                          <SocialIcon label={item.label} className="h-4 w-4" />
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Office */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                {firm.offices.map((office) => (
                  <div key={office.line1} className="rounded-2xl border border-line bg-bone p-6">
                    <p className="eyebrow text-copper-500">{office.label}</p>
                    <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-muted">
                      <p className="text-brand-900">{office.line1}</p>
                      <p>{office.landmark}</p>
                      <p>{office.street}</p>
                      <p>{office.country}</p>
                    </address>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div
              className="lg:col-span-7"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <div className="rounded-2xl border border-line p-8 lg:p-10">
                <h2 className="font-display text-2xl tracking-tight text-brand-900 sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Tell us a little about the matter. We will route it to the
                  partner best placed to help.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where to find us */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className="overflow-hidden rounded-2xl border border-line"
            data-reveal
          >
            <iframe
              title="TBeST Law LLP on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.0623264002584!2d38.76608778280333!3d9.006413534432065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8500652cb2db%3A0x69f9510b0bfd0304!2sTBeST%20Law%20LLP!5e1!3m2!1sen!2set!4v1785743909963!5m2!1sen!2set"
              className="block h-[380px] w-full lg:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
