import Image from "next/image";
import Link from "next/link";

import { BrandArrow } from "@/components/brand";
import { TypeIn } from "@/components/type-in";
import { firmPhotos } from "@/lib/firm-images";

export function Firm() {
  return (
    <section data-nav-tone="light" className="relative bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left — a short statement of what the firm is */}
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow flex items-center gap-3 text-copper-500">
              <span className="h-px w-8 bg-copper-400" />
              <TypeIn text="The firm" />
            </p>
            <TypeIn
              as="h2"
              text="A leading full service firm for corporate and commercial work."
              className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl"
            />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
              We act as trusted advisors across a wide range of sectors and
              practice areas &mdash; and our lawyers helped draft the Ethiopian
              Commercial Code, and the country&rsquo;s investment and tax laws.
            </p>

            <Link
              href="/about-us"
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-copper-500 transition-colors hover:text-copper-600"
            >
              More about the firm
              <BrandArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — the firm itself: the boardroom mid-conversation, with the
              partners tucked into the corner so the pair reads as one picture
              of the practice rather than two stock shots. */}
          <div
            className="relative lg:col-span-6"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-950">
              <Image
                src={firmPhotos.boardroomCandid.src}
                alt={firmPhotos.boardroomCandid.alt}
                fill
                placeholder="blur"
                quality={90}
                // Deliberately over-declared: the frame is 36rem, but asking
                // for 60 lands on the 1080px rung of the candidate ladder
                // instead of the 640px one. This is a wide scene — ten faces
                // and the logo on the screen behind them — and at 640px each
                // face is only a few dozen pixels, so quality 90 mushes them.
                // Sending more pixels is the only fix that works: at the same
                // 64 KB, 640px at quality 100 scores SSIM 0.961 against the
                // source, while 1080px at 90 scores 0.995. The browser
                // downscales the extra pixels away and the averaging takes
                // the compression noise with it.
                sizes="(min-width: 1024px) 60rem, 120vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-5 hidden w-[44%] overflow-hidden rounded-2xl border-[6px] border-white bg-brand-950 shadow-2xl shadow-brand-900/20 sm:block">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={firmPhotos.partnersSeated.src}
                  alt=""
                  fill
                  placeholder="blur"
                  quality={90}
                  // Over-declared for the same reason as the photograph
                  // behind it. The inset frame is 16rem, and the candidate
                  // ladder has a rung at 256px — an honest 16rem lands exactly
                  // there and ships a 7 KB file for a 234px frame. Asking for
                  // 24 lands on 384 instead.
                  sizes="(min-width: 1024px) 24rem, 60vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
