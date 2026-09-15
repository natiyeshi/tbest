"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigation } from "@/lib/content";
import {
  fallbackImage,
  getInsightImage,
  getPracticeImage,
} from "@/lib/practice-images";
import type { PracticeLink } from "@/lib/practices";
import { sectors } from "@/lib/sectors";

type MegaItem = {
  label: string;
  href: string;
  blurb: string;
  /** A bundled import, or a URL for artwork uploaded through the admin. */
  image: string | StaticImageData;
};

const staticMenus = {
  sectors: {
    href: "/sectors",
    // Sectors have no dedicated images yet, so they share the Addis skyline.
    items: sectors.map((s) => ({
      label: s.name,
      href: `/sectors/${s.slug}`,
      blurb: s.blurb,
      image: fallbackImage,
    })),
  },
  updates: {
    href: "/updates",
    items: [
      {
        label: "Legal Updates",
        href: "/updates/legal-updates",
        blurb:
          "Concise notes on the regulatory changes shaping business in Ethiopia.",
        image: getInsightImage("Tax"),
      },
      {
        label: "Blog",
        href: "/updates/blog",
        blurb: "Longer-form commentary and reflections from the firm's lawyers.",
        image: getInsightImage("Corporate"),
      },
      {
        label: "News",
        href: "/updates/news",
        blurb: "Announcements and milestones from the firm.",
        image: getInsightImage("Firm"),
      },
    ],
  },
} as const;

type Tone = "dark" | "light" | "copper";

/** Where the header samples the section tone — just below its own bar. */
const SAMPLE_LINE = 72;

export function SiteHeader({ practices }: { practices: PracticeLink[] }) {
  // The practice menu is the only one that changes without a deploy, so it is
  // built from the list the layout read rather than from a bundled constant.
  const menus = {
    practices: {
      href: "/practices",
      items: practices.map((p) => ({
        label: p.name,
        href: `/practices/${p.slug}`,
        blurb: p.blurb,
        image: p.image || getPracticeImage(p.slug),
      })),
    },
    ...staticMenus,
  };

  // The bar recolours to match the section beneath it: sections mark themselves
  // with data-nav-tone, and the header samples whichever one crosses its base.
  const [tone, setTone] = useState<Tone>("dark");
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setAtTop(window.scrollY < 24);
      let found: Tone = "light";
      for (const el of document.querySelectorAll<HTMLElement>("[data-nav-tone]")) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= SAMPLE_LINE && rect.bottom > SAMPLE_LINE) {
          const t = el.dataset.navTone;
          if (t === "dark" || t === "light" || t === "copper") found = t;
          break;
        }
      }
      setTone(found);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  // The open mobile sheet is white, so force the light treatment behind it.
  const effectiveTone: Tone = menuOpen ? "light" : tone;
  const onDark = effectiveTone === "dark" || effectiveTone === "copper";
  const solid = !atTop || menuOpen;

  const barBg = !solid
    ? "border-transparent bg-transparent"
    : effectiveTone === "dark"
      ? "border-white/10 bg-brand-950/80 backdrop-blur-md"
      : effectiveTone === "copper"
        ? "border-copper-400/40 bg-copper-600/90 backdrop-blur-md"
        : "border-line bg-white/90 backdrop-blur-md";

  const linkColor = onDark
    ? "text-white/85 hover:text-white"
    : "text-brand-800 hover:text-copper-600";
  const activeColor = onDark ? "text-white" : "text-copper-600";

  const ctaClass = onDark
    ? "bg-white text-brand-900 hover:bg-brand-50"
    : "bg-copper-500 text-white hover:bg-copper-600";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${barBg}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          onClick={close}
          className="relative block h-9 w-40 shrink-0"
          aria-label="TBeST Law LLP — home"
        >
          <Image
            src="/logo/logo-color.svg"
            alt="TBeST Law LLP"
            fill
            priority
            className={`object-contain object-left transition-opacity duration-500 ${
              onDark ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/logo/logo-white.svg"
            alt=""
            fill
            priority
            aria-hidden="true"
            className={`object-contain object-left transition-opacity duration-500 ${
              onDark ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            if ("group" in item && item.group) {
              const menu = menus[item.group];
              const open = openGroup === item.group;
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(item.group)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={open}
                    onFocus={() => setOpenGroup(item.group)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors ${linkColor} ${
                      isActive(item.href) ? activeColor : ""
                    }`}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 10 6"
                      className={`h-1.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {open && (
                    <MegaMenu items={menu.items} onNavigate={close} />
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors ${linkColor} ${
                  isActive(item.href) ? activeColor : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact-us"
            className={`ml-2 rounded-full px-6 py-2.5 text-[0.8125rem] font-semibold transition-colors ${ctaClass}`}
          >
            Get in touch
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden ${
            onDark ? "text-white" : "text-brand-800"
          }`}
        >
          <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-px w-6 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <nav className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navigation.map((item) =>
              "group" in item && item.group ? (
                <MobileGroup
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={menus[item.group].items}
                  onNavigate={close}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="border-b border-line py-4 font-display text-2xl text-brand-800"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact-us"
              onClick={close}
              className="mt-5 rounded-full bg-copper-500 px-6 py-3.5 text-center text-sm font-semibold text-white"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

/** Desktop mega menu: a list of items on the left, a live preview (image +
 *  description of the hovered item) on the right. */
function MegaMenu({
  items,
  onNavigate,
}: {
  items: readonly MegaItem[];
  onNavigate: () => void;
}) {
  const [active, setActive] = useState(0);
  const preview = items[active];

  return (
    <div className="absolute left-1/2 top-full w-[42rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3">
      <div className="grid grid-cols-[1.1fr_1fr] gap-2 overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-brand-950/15">
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`block rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  index === active
                    ? "bg-bone text-copper-600"
                    : "text-brand-800 hover:bg-bone"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={preview.href}
          onClick={onNavigate}
          className="group relative flex flex-col overflow-hidden rounded-xl bg-brand-900"
        >
          <div className="relative h-40 overflow-hidden">
            <Image
              src={preview.image}
              alt=""
              fill
              sizes="22rem"
              className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
          </div>
          <div className="relative -mt-9 flex flex-1 flex-col p-5">
            <p className="font-display text-lg leading-snug text-white">
              {preview.label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-brand-100/75">
              {preview.blurb}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-copper-300">
              Read more
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function MobileGroup({
  label,
  href,
  items,
  onNavigate,
}: {
  label: string;
  href: string;
  items: readonly { label: string; href: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <div className="flex items-center justify-between">
        <Link href={href} onClick={onNavigate} className="py-4 font-display text-2xl text-brand-800">
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${label}`}
          className="p-2 text-brand-500"
        >
          <svg viewBox="0 0 12 12" className={`h-3 w-3 transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="flex flex-col pb-3">
          {items.map((sub) => (
            <Link key={sub.href} href={sub.href} onClick={onNavigate} className="py-2.5 pl-4 text-sm text-muted">
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
