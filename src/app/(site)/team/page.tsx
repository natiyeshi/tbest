import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { PortraitSwap } from "@/components/portrait-swap";
import type { TeamMember } from "@/lib/content";
import { businessServices, lawyers, lawyerTiers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

import addisTowerStreet from "../../../../public/hero/addis-tower-street.jpg";

export const metadata: Metadata = pageMetadata({
  title: "Team — TBeST Law LLP",
  description:
    "The lawyers and staff of TBeST Law LLP — partners, associates and support — advising business across corporate, commercial and investment law in Ethiopia.",
  path: "/team",
  image: "/og/team.jpg",
});

/** One person's card: photograph, role, name. */
function MemberCard({ member, sizes }: { member: TeamMember; sizes: string }) {
  return (
    <li>
      <Link href={`/team/${member.slug}`} className="group block">
        {/* Flat fill, not a patterned panel: the photograph covers the frame,
            so anything drawn back here is only ever seen while the image is
            still loading. */}
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-100">
          <PortraitSwap
            portrait={member.card}
            portraitAlt={member.cardAlt}
            alt={`${member.name}, ${member.role} at TBeST Law LLP`}
            sizes={sizes}
            fit="cover"
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
 * A row of cards. The container is 1200px wide at `lg` (a max-w-7xl of 1280px
 * less two 40px gutters), so three to a row makes each card 384px and four
 * makes it 282px — hence the two `sizes`, which were understated at 16rem and
 * left a 1x screen stretching a 256px file. Both class strings are written out
 * rather than interpolated so Tailwind can see them.
 */
function MemberGrid({
  members,
  columns,
}: {
  members: readonly TeamMember[];
  columns: 3 | 4;
}) {
  return (
    <ul
      className={`grid grid-cols-2 gap-6 sm:grid-cols-3 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      }`}
    >
      {members.map((member) => (
        <MemberCard
          key={member.slug}
          member={member}
          sizes={
            columns === 3
              ? "(min-width: 1024px) 24rem, (min-width: 640px) 30vw, 45vw"
              : "(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
          }
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
        lead="Our partners, associates and business services staff advise companies across corporate, commercial and investment law in Ethiopia."
        crumbs={[{ label: "Home", href: "/" }, { label: "Team" }]}
        image={addisTowerStreet}
      />

      {/* The roster, split by what people actually do — the practice first, the
          people who run it second. */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-10">
          <div data-reveal>
            <Roster
              title="Lawyers"
              blurb="Partners and associates advising on corporate, commercial, investment and tax matters."
              count={lawyers.length}
            >
              {/* One band per rank, most senior first, each starting its own
                  row — so a rank holding a single person still gets a row of
                  their own rather than being tucked onto the end of the one
                  above. The top band runs three across when it holds exactly
                  three, which fills its row flush and leaves the partners'
                  cards reading a size larger than the bands below; everything
                  else runs at the standard four. */}
              {lawyerTiers.map((tier, index) => (
                <div key={tier.label}>
                  <TierHeading label={tier.label} />
                  <MemberGrid
                    members={tier.members}
                    columns={index === 0 && tier.members.length === 3 ? 3 : 4}
                  />
                </div>
              ))}
            </Roster>
          </div>

          {businessServices.length > 0 && (
            <div className="border-t border-line pt-16" data-reveal>
              <Roster
                title="Business services"
                blurb="The team that keeps the practice running, from the office itself to its accounts."
                count={businessServices.length}
              >
                <MemberGrid members={businessServices} columns={4} />
              </Roster>
            </div>
          )}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
