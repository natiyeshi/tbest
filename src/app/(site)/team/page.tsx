import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClosingCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import type { TeamMember } from "@/lib/content";
import { businessServices, lawyers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

import addisTowerStreet from "../../../../public/hero/addis-tower-street.jpg";

export const metadata: Metadata = pageMetadata({
  title: "Team — TBeST Law LLP",
  description:
    "The lawyers and staff of TBeST Law LLP — partners, associates and support — advising business across corporate, commercial and investment law in Ethiopia.",
  path: "/team",
  image: "/og/team.jpg",
});

/**
 * One person's card: photograph, role, name. The photograph holds still on
 * hover; the person's second frame is kept for their own profile page.
 */
function MemberCard({ member, sizes }: { member: TeamMember; sizes: string }) {
  return (
    <li>
      <Link href={`/team/${member.slug}`} className="group block">
        {/* Flat fill, not a patterned panel: the photograph covers the frame,
            so anything drawn back here is only ever seen while the image is
            still loading. */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={member.card}
            alt={`${member.name}, ${member.role} at TBeST Law LLP`}
            placeholder="blur"
            sizes={sizes}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
        <p className="mt-4 eyebrow text-copper-500">{member.role}</p>
        <p className="mt-1.5 font-display text-xl text-navy-800 transition-colors group-hover:text-copper-600">
          {member.name}
        </p>
      </Link>
    </li>
  );
}

/**
 * A grid of cards, four to a row at `lg`. The container is 1200px wide there (a
 * max-w-7xl of 1280px less two 40px gutters), so each card is 282px.
 */
function MemberGrid({ members }: { members: readonly TeamMember[] }) {
  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {members.map((member) => (
        <MemberCard
          key={member.slug}
          member={member}
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
        />
      ))}
    </ul>
  );
}

/**
 * The heading over one band of the roster. Deliberately quieter than the copper
 * role on the cards themselves — it is a divider, not a second label competing
 * with the one on every card below it — and the rule carries it to the edge so
 * the band reads as a band even where it holds a single person.
 */
function TierHeading({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h3 className="eyebrow text-navy-800/45">{label}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

/** A named group of people, with a count beside the heading. */
function Roster({
  title,
  blurb,
  count,
  children,
}: {
  title: string;
  blurb: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="font-display text-2xl leading-tight tracking-tight text-navy-800 sm:text-3xl">
          {title}
        </h2>
        <span className="font-display text-sm text-copper-500">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
        {blurb}
      </p>

      <div className="mt-10 space-y-12">{children}</div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="The people you will work with."
        lead="Expertise Driven by People."
        crumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
        image={addisTowerStreet}
      />

      {/* The roster, split by what people actually do — the practice first, the
          people who run it second. */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-10">
          <div data-reveal>
            <Roster
              title="Our partners"
              blurb="Partners and associates advising on corporate, commercial, investment and tax matters."
              count={lawyers.length}
            >
              {/* Every lawyer in one continuous grid, most senior first. The
                  role on each card says the rank, so the bands no longer start
                  a new row per rank. */}
              <MemberGrid members={lawyers} />
            </Roster>
          </div>

          {/* Business support stays apart from the lawyers, under the same
              quiet divider the rank bands used to carry rather than a second
              bold heading. */}
          {businessServices.length > 0 && (
            <div className="border-t border-line pt-16" data-reveal>
              <TierHeading label="Business support" />
              <MemberGrid members={businessServices} />
            </div>
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
