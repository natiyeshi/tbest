import Image from "next/image";
import Link from "next/link";

import { DiamondFieldReveal } from "@/components/diamond-field-reveal";
import { SocialIcon } from "@/components/social-icon";
import { firm } from "@/lib/content";
import { practices } from "@/lib/practices";
import { sectors } from "@/lib/sectors";

const explore = [
  { label: "About", href: "/about-us" },
  { label: "Team", href: "/team" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact-us" },
];

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 pt-20 pb-10">
      <DiamondFieldReveal
        id="footer-diamond"
        size={78}
        className="text-brand-200/[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity + head office */}
          <div className="lg:col-span-4">
            <Image
              src="/logo/logo-white.svg"
              alt="TBeST Law LLP"
              width={176}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-brand-100/60">
              {firm.tagline}
            </p>
            <address className="mt-7 space-y-1 text-sm not-italic text-brand-100/60">
              <p>{firm.offices[0].line1}</p>
              <p>{firm.offices[0].street}, {firm.offices[0].country}</p>
              <p className="pt-2">
                <a href={`tel:${firm.phones.office.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {firm.phones.office}
                </a>
              </p>
              <p>
                <a href={`mailto:${firm.email}`} className="transition-colors hover:text-white">
                  {firm.email}
                </a>
              </p>
            </address>
          </div>

          {/* Practices */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-copper-300">Practices</p>
            <ul className="mt-5 space-y-2.5">
              {practices.map((practice) => (
                <li key={practice.slug}>
                  <Link
                    href={`/practices/${practice.slug}`}
                    className="text-sm text-brand-100/70 transition-colors hover:text-white"
                  >
                    {practice.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-copper-300">Sectors</p>
            <ul className="mt-5 space-y-2.5">
              {sectors.map((sector) => (
                <li key={sector.slug}>
                  <Link
                    href={`/sectors/${sector.slug}`}
                    className="text-sm text-brand-100/70 transition-colors hover:text-white"
                  >
                    {sector.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore + social */}
          <div className="lg:col-span-2">
            <p className="eyebrow text-copper-300">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-100/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {firm.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-brand-100/70 transition-colors hover:border-copper-300/60 hover:bg-white/5 hover:text-white"
                  >
                    <SocialIcon label={item.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-100/50">
            &copy; {new Date().getFullYear()} {firm.name}. All rights reserved.
          </p>
          <p className="text-xs text-brand-100/50">
            {firm.offices[0].street}, {firm.offices[0].country}
          </p>
        </div>
      </div>
    </footer>
  );
}
