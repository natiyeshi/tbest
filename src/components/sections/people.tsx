import Image from "next/image";
import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { firmPhotos } from "@/lib/firm-images";

/**
 * "Meet the team" on the landing page. It replaced the three partner cards:
 * the firm asked for the whole team to be shown, so the section now stands on
 * the full group portrait, with the copy set into the dark foot of the frame
 * where the photograph is chairs and floor rather than faces.
 *
 * The portrait is held in a rounded card set well in from the page edges,
 * rather than running full bleed, so it reads as a framed photograph on the
 * page instead of a band splitting it in two.
 */
export function People() {
  const photo = firmPhotos.teamFull;

  return (
    <section
      data-nav-tone="light"
      className="flex bg-white px-5 py-12 sm:h-svh sm:min-h-[36rem] sm:px-10 sm:pt-24 sm:pb-8 lg:px-16 lg:pt-28 lg:pb-10"
    >
      {/* The section is one screen tall from sm up; the card fills it inside a
          generous margin, so the frame always reads as a card on the page.
          The deeper top margin clears the fixed site header. */}
      <div className="relative isolate mx-auto flex w-full max-w-7xl flex-col justify-end overflow-hidden rounded-[2rem] bg-navy-900 shadow-2xl shadow-navy-900/15 sm:h-full">
        {/* On a phone the group is too wide to sit behind the copy without
            the copy landing on faces, so the photograph takes the top of the
            card and the copy follows on navy. From sm it fills the card. */}
        <div className="relative aspect-[4/3] sm:absolute sm:inset-0 sm:-z-10 sm:aspect-auto">
          <Image
            src={photo.src}
            alt={photo.alt}
            placeholder="blur"
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover object-[center_30%]"
          />
          {/* Clear through the faces, heavy at the foot where the copy sits. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-navy-900/25 to-navy-900"
          />
        </div>

        <div className="w-full px-6 pt-2 pb-8 sm:px-10 sm:pt-24 sm:pb-10 lg:px-14 lg:pb-12">
          <div
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            data-reveal
          >
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-3 text-copper-300">
                <span className="h-px w-8 bg-copper-400" />
                <TypeIn text="Meet the team" />
              </p>
              <TypeIn
                as="h2"
                text="The people behind the advice."
                className="mt-6 block font-display text-4xl leading-[1.12] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl"
              />
              <p className="mt-6 text-base leading-relaxed text-white/85">
                Partners who have practised in academia, in government and in
                the private sector, working alongside a team of lawyers who know
                Ethiopian business law inside out. Clients work with them
                directly.
              </p>
            </div>
            <Link
              href="/team"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-copper-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-copper-600 lg:self-auto"
            >
              Meet the team
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
