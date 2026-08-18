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
}: {
  portrait: StaticImageData;
  portraitAlt?: StaticImageData;
  alt: string;
  sizes?: string;
}) {
  return (
    <>
      <Image
        src={portrait}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        className={`absolute inset-0 h-full w-full object-contain object-bottom transition-opacity duration-500 ease-out ${
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
          className="absolute inset-0 h-full w-full object-contain object-bottom opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
      )}
    </>
  );
}
