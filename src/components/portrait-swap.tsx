import type { StaticImageData } from "next/image";
import Image from "next/image";

/**
 * A member's photograph, with a second cut-out that unfolds across it from left
 * to right on hover and folds back the same way on leave. Purely CSS-driven —
 * the parent must carry the `group` class (and position the box), and this
 * renders the two stacked images filling it; the fold itself is `.portrait-unfold`
 * in globals.css. When no alternate is supplied it renders the single portrait
 * unchanged, with no hover behaviour at all.
 */
export function PortraitSwap({
  portrait,
  portraitAlt,
  alt,
  sizes,
  fit = "contain",
}: {
  portrait: StaticImageData;
  portraitAlt?: StaticImageData;
  alt: string;
  sizes?: string;
  /**
   * "contain" stands a cut-out on the box's baseline; "cover" fills the box
   * with a photograph, anchored at the top so the face is never the part that
   * gets cropped.
   */
  fit?: "contain" | "cover";
}) {
  const frame =
    fit === "cover"
      ? "object-cover object-top"
      : "object-contain object-bottom";

  return (
    <>
      {/* The frame underneath holds still: the one above is what travels, so
          there is no cross-fade through a muddy middle. */}
      <Image
        src={portrait}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full ${frame}`}
      />
      {portraitAlt && (
        <Image
          src={portraitAlt}
          alt=""
          aria-hidden="true"
          placeholder="blur"
          sizes={sizes}
          className={`portrait-unfold absolute inset-0 h-full w-full ${frame}`}
        />
      )}
    </>
  );
}
