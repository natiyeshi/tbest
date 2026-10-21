import type { StaticImageData } from "next/image";
import Image from "next/image";

/**
 * A member's photograph that cross-fades to a second frame on hover. Purely
 * CSS-driven: the parent must carry the `group` class (and position the box),
 * and this renders the two stacked images filling it. When no alternate is
 * supplied it renders the single portrait unchanged.
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

  // A cut-out has transparent edges, so the frame underneath has to fade out or
  // the two silhouettes overlap through each other mid-swap. A photograph that
  // fills the box does not: the incoming frame hides it completely, so holding
  // it at full opacity is both simpler and correct. Fading both at once left a
  // window in the middle of the hover where neither was solid and whatever the
  // card had behind it showed through.
  const swaps = Boolean(portraitAlt);
  const base = swaps && fit === "contain" ? "group-hover:opacity-0" : "";

  return (
    <>
      <Image
        src={portrait}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full ${frame} transition-opacity duration-500 ease-out ${base}`}
      />
      {portraitAlt && (
        <Image
          src={portraitAlt}
          alt=""
          aria-hidden="true"
          placeholder="blur"
          sizes={sizes}
          className={`absolute inset-0 h-full w-full ${frame} opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100`}
        />
      )}
    </>
  );
}
