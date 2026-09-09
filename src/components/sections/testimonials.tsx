import { TypeIn } from "@/components/type-in";
import { testimonials } from "@/lib/recognition";

/**
 * What clients and the market say, laid out as cards so every quote is on the
 * page at once.
 *
 * This used to be a single rotating quote on a dark band. One quote at a time
 * meant the reader saw a fraction of the evidence and had to wait — or steer —
 * for the rest, and a large centred line of praise on brand colour reads as
 * decoration rather than testimony. All of it, on white, in the reader's own
 * time, is the stronger claim.
 */
export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section
      data-nav-tone="light"
      className="border-y border-line bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow flex items-center gap-3 text-copper-500">
            <span className="h-px w-8 bg-copper-400" />
            <TypeIn text="In their words" />
          </p>
          <TypeIn
            as="h2"
            text="What clients and the market say."
            className="mt-7 block font-display text-4xl leading-[1.12] tracking-tight text-brand-900 sm:text-5xl"
          />
        </div>

        {/* The lead quote runs double width, so the grid fills exactly and the
            strongest line gets the room it deserves. */}
        <ul
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {lead && (
            <li className="sm:col-span-2">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-bone p-8 lg:p-10">
                <QuoteMark />
                <blockquote className="mt-5 font-display text-2xl leading-snug tracking-tight text-brand-900 sm:text-[1.75rem]">
                  {lead.quote}
                </blockquote>
              </figure>
            </li>
          )}

          {rest.map((item) => (
            <li key={item.quote}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-900/[0.06]">
                <QuoteMark />
                <blockquote className="mt-4 text-[0.9375rem] leading-relaxed text-brand-800">
                  {item.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <span
      aria-hidden="true"
      className="font-display text-4xl leading-none text-copper-400"
    >
      &ldquo;
    </span>
  );
}
