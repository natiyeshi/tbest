import type { StaticImageData } from "next/image";
import Image from "next/image";

/**
 * A member's photograph that cross-fades to a second cut-out on hover. Purely
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

  return (
    <>
      <Image
        src={portrait}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full ${frame} transition-opacity duration-500 ease-out ${
          portraitAlt ? "group-hover:opacity-0" : ""
        }`}
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
