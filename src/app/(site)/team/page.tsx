import type { Metadata } from "next";
import Link from "next/link";

import { MarkPattern } from "@/components/brand";
import { ContactCTA } from "@/components/contact-cta";
import { PageHero } from "@/components/page-hero";
import { PhotoWall } from "@/components/photo-wall";
import { PortraitSwap } from "@/components/portrait-swap";
import type { TeamMember } from "@/lib/content";
import { businessServices, lawyers, lawyerTiers } from "@/lib/content";
import { firmPhotos } from "@/lib/firm-images";
import { pageMetadata } from "@/lib/seo";

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
            sizes={sizes}
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
      <h3 className="eyebrow text-brand-900/45">{label}</h3>
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
        <h2 className="font-display text-2xl leading-tight tracking-tight text-brand-900 sm:text-3xl">
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

      {/* The firm's own photography, as a bento: two anchor frames, two tall
          ones and a set of wider and smaller ones between them, so the wall has
          a shape rather than a rhythm. The spans tile four columns exactly —
          4+1+1+2, 4+2+2, 2+2, 2+1+1, 2+2 — so there are no holes; move a cell
          and that arithmetic has to come out again. Written out cell by cell
          rather than mapped, because the layout is the point and every span
          class stays visible to Tailwind. Each frame is a crop; PhotoWall opens
          the picture whole on click and lets the reader walk the set. */}
      <section className="border-t border-line bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-copper-500">
            <span className="h-px w-8 bg-copper-400" />
            Inside the firm
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight tracking-tight text-brand-900 sm:text-4xl">
            {lawyers.length} lawyers, one practice.
          </h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
            Select a photograph to see it full size.
          </p>

          <PhotoWall
            className="mt-12 grid auto-rows-[8rem] grid-cols-2 gap-4 sm:auto-rows-[10rem] sm:gap-5 lg:auto-rows-[12rem] lg:grid-cols-4"
            cells={[
              {
                // Anchor: the whole team around the table, two by two.
                photo: firmPhotos.boardroomFull,
                className: "col-span-2 row-span-2",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 35%",
              },
              {
                photo: firmPhotos.teamWomen,
                className: "col-span-1 row-span-1",
                sizes: "(min-width: 1024px) 18rem, 45vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.teamMen,
                className: "col-span-1 row-span-1",
                sizes: "(min-width: 1024px) 18rem, 45vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.boardroomCandid,
                className: "col-span-2 row-span-1",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 45%",
              },
              {
                // Second anchor, and the only frame with everyone in it.
                photo: firmPhotos.teamFull,
                className: "col-span-2 row-span-2",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 30%",
              },
              {
                // The two tall frames: the shoot's portrait-orientation
                // pairings, which is what they were taken for.
                photo: firmPhotos.pairPortrait,
                className: "col-span-1 row-span-2",
                sizes: "(min-width: 1024px) 18rem, 45vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.pairSmilingPortrait,
                className: "col-span-1 row-span-2",
                sizes: "(min-width: 1024px) 18rem, 45vw",
                objectPosition: "center 30%",
              },
               {
                photo: firmPhotos.partnersStanding,
                className: "col-span-2 row-span-2",
                sizes: "(min-width: 1024px) 55rem, 70vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.boardroomPartners,
                className: "col-span-2 row-span-2",
                sizes: "(min-width: 1024px) 55rem, 70vh",
                objectPosition: "center 45%",
              },
              
              // {
              //   photo: firmPhotos.teamFour,
              //   className: "col-span-2 row-span-1",
              //   sizes: "(min-width: 1024px) 38rem, 90vw",
              //   objectPosition: "center 30%",
              // },
             
              // {
              //   // A wide frame of a tall composition: the crop has to sit high
              //   // or it takes the tops off the two standing partners.
              //   photo: firmPhotos.partnersSeated,
              //   className: "col-span-2 row-span-1",
              //   sizes: "(min-width: 1024px) 38rem, 90vw",
              //   objectPosition: "center 12%",
              // },
              {
                photo: firmPhotos.boardroomThree,
               className: "col-span-2 row-span-2",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.teamStanding,
                className: "col-span-2 row-span-1",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 30%",
              },
              {
                photo: firmPhotos.teamSix,
                className: "col-span-2 row-span-1",
                sizes: "(min-width: 1024px) 38rem, 90vw",
                objectPosition: "center 30%",
              },
            ]}
          />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
