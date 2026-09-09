import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MarkPattern } from "@/components/brand";
import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { PortraitSwap } from "@/components/portrait-swap";
import type { TeamMember } from "@/lib/content";
import { businessServices, lawyers } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";

export const metadata: Metadata = {
  title: "Team — TBeST Law LLP",
  description:
    "The lawyers and staff of TBeST Law LLP — partners, associates and support — advising business across corporate, commercial and investment law in Ethiopia.",
};

/** One person's card: photograph, role, name. */
function MemberCard({ member }: { member: TeamMember }) {
  return (
    <li>
      <Link href={`/team/${member.slug}`} className="group block">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
          <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-b from-neutral-100 to-neutral-200">
            <MarkPattern
              id={`team-card-${member.slug}`}
              size={70}
              className="absolute inset-0 h-full w-full text-brand-900/[0.06]"
            />
          </div>
          <PortraitSwap
            portrait={member.card}
            portraitAlt={member.cardAlt}
            alt={`${member.name}, ${member.role} at TBeST Law LLP`}
            // A card is 282px in the four-column grid (1200px of container,
            // less three 24px gaps). 16rem understated that, so a 1x screen
            // was handed a 256px file and stretched it.
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 30vw, 45vw"
            fit="cover"
          />
        </div>
        <p className="mt-4 eyebrow text-copper-500">{member.role}</p>
        <p className="mt-1.5 font-display text-xl text-brand-900 transition-colors group-hover:text-copper-600">
          {member.name}
        </p>
      </Link>
    </li>
  );
}

/** A named group of people, with a count beside the heading. */
function Roster({
  title,
  blurb,
  members,
}: {
  title: string;
  blurb: string;
  members: readonly TeamMember[];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="font-display text-2xl leading-tight tracking-tight text-brand-900 sm:text-3xl">
          {title}
        </h2>
        <span className="font-display text-sm text-copper-500">
          {String(members.length).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
        {blurb}
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <MemberCard key={member.slug} member={member} />
        ))}
      </ul>
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
        image={firmPhotos.boardroomFull.src}
        imagePosition="center 35%"
      />

      {/* The roster, split by what people actually do — the practice first, the
          people who run it second. */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-10">
          <div data-reveal>
            <Roster
              title="Lawyers"
              blurb="Partners and associates advising on corporate, commercial, investment and tax matters."
              members={lawyers}
            />
          </div>

          {businessServices.length > 0 && (
            <div className="border-t border-line pt-16" data-reveal>
              <Roster
                title="Business services"
                blurb="The team that keeps the practice running, from the office itself to its accounts."
                members={businessServices}
              />
            </div>
          )}
        </div>
      </section>

      {/* The firm's own photography, as a bento: one anchor frame and a set of
          smaller ones around it, so the wall has a shape rather than a rhythm.
          Written out cell by cell rather than mapped — the layout is the point,
          and every span class stays visible to Tailwind. */}
      <section className="border-t border-line bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-copper-500">
            <span className="h-px w-8 bg-copper-400" />
            Inside the firm
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight tracking-tight text-brand-900 sm:text-4xl">
            {lawyers.length} lawyers, one practice.
          </h2>

          <div className="mt-12 grid auto-rows-[8rem] grid-cols-2 gap-4 sm:auto-rows-[10rem] sm:gap-5 lg:auto-rows-[12rem] lg:grid-cols-4">
            {/* Anchor: the whole team around the table, two by two. */}
            <figure className="col-span-2 row-span-2 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.boardroomFull.src}
                alt={firmPhotos.boardroomFull.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 38rem, 90vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 35%" }}
              />
            </figure>

            <figure className="col-span-1 row-span-1 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.teamWomen.src}
                alt={firmPhotos.teamWomen.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 18rem, 45vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 30%" }}
              />
            </figure>

            <figure className="col-span-1 row-span-1 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.teamMen.src}
                alt={firmPhotos.teamMen.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 18rem, 45vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 30%" }}
              />
            </figure>

            <figure className="col-span-2 row-span-1 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.boardroomCandid.src}
                alt={firmPhotos.boardroomCandid.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 38rem, 90vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 45%" }}
              />
            </figure>

            <figure className="col-span-2 row-span-1 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.teamSix.src}
                alt={firmPhotos.teamSix.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 38rem, 90vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 30%" }}
              />
            </figure>

            <figure className="col-span-2 row-span-1 overflow-hidden rounded-2xl bg-brand-950">
              <Image
                src={firmPhotos.partnersSeated.src}
                alt={firmPhotos.partnersSeated.alt}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 38rem, 90vw"
                placeholder="blur"
                quality={90}
                style={{ objectPosition: "center 30%" }}
              />
            </figure>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
