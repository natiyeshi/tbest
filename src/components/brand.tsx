/**
 * Brand marks derived from the official artwork in
 * `public/TBest - Logo Variations/SVG`. The swoosh path is lifted verbatim from
 * the vector files; the enclosing ring is redrawn as a stroked circle so its
 * weight can be tuned per usage (the original hairline vanishes when scaled down).
 */

const SWOOSH_PATH =
  "M598.38,635s-1.9-71.55-61.83-128.54c-64-60.82-142-61.74-142-61.74H598.38Z";

/** Drawn bounds of the monogram inside the original 1080 artboard. */
const GLYPH_ORIGIN = { x: 346, y: 316 };
const GLYPH_SIZE = 388;

/** Ring + swoosh, drawn in the original artboard coordinate space. */
function MarkGlyph({ ringWidth = 10 }: { ringWidth?: number }) {
  return (
    <>
      <circle
        cx="540"
        cy="510"
        r="194"
        stroke="currentColor"
        strokeWidth={ringWidth}
        fill="none"
      />
      <path d={SWOOSH_PATH} fill="currentColor" />
    </>
  );
}

type MarkProps = {
  className?: string;
  /** Ring thickness in artboard units (the ring radius is 194). */
  ringWidth?: number;
};

/** The circular TBeST monogram: ring enclosing the swoosh. */
export function LogoMark({ className, ringWidth = 6 }: MarkProps) {
  return (
    <svg
      viewBox="330 300 420 420"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <MarkGlyph ringWidth={ringWidth} />
    </svg>
  );
}

/**
 * The full TBeST monogram used as an inline mark in place of a plain arrow —
 * the exact artwork from "Artboard 1 copy 8.svg" (ring, swoosh and the ®),
 * filled with currentColor so it takes the surrounding text colour.
 */
export function BrandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="336 312 396 396"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M598.38,635s-1.9-71.55-61.83-128.54c-64-60.82-142-61.74-142-61.74H598.38Z" />
      <path d="M597.78,635c0-.72-2.59-72-61.64-128.13-63.07-60-140.78-61.56-141.56-61.57v-1.19H599V635Zm-189.6-189.7C433.43,448.57,489.36,460.76,537,506c45.23,43,57.52,94.85,60.82,117.47V445.31Z" />
      <path d="M540,705.09c-107.57,0-195.09-87.52-195.09-195.09S432.43,314.91,540,314.91,735.09,402.43,735.09,510,647.57,705.09,540,705.09Zm0-387.8c-106.26,0-192.71,86.45-192.71,192.71S433.74,702.71,540,702.71,732.71,616.26,732.71,510,646.26,317.29,540,317.29Z" />
      <path d="M643.66,466.9a13.53,13.53,0,1,1,4-9.58A13,13,0,0,1,643.66,466.9ZM625.9,449.1a11.23,11.23,0,0,0-3.39,8.22,11.38,11.38,0,0,0,3.37,8.27,11.59,11.59,0,0,0,16.44,0,11.75,11.75,0,0,0,0-16.49,11.56,11.56,0,0,0-16.42,0Zm7.94.77a11.48,11.48,0,0,1,4,.53,3.68,3.68,0,0,1,2.29,3.76,3.23,3.23,0,0,1-1.45,2.92,5.68,5.68,0,0,1-2.15.72,3.58,3.58,0,0,1,2.56,1.45,4,4,0,0,1,.81,2.3v1.08c0,.35,0,.71,0,1.11a2.64,2.64,0,0,0,.13.77l.09.18h-2.44c0-.05,0-.1,0-.15s0-.1,0-.16l0-.48v-1.18c0-1.71-.47-2.85-1.4-3.4a6.23,6.23,0,0,0-2.9-.48h-2.06v5.85h-2.61V449.87Zm2.8,2.34a6.67,6.67,0,0,0-3.15-.56h-2.22V457h2.35a7.06,7.06,0,0,0,2.48-.33,2.66,2.66,0,0,0,.54-4.48Z" />
    </svg>
  );
}

type PatternProps = {
  /** Unique id — SVG pattern ids are global, so each instance needs its own. */
  id: string;
  className?: string;
  /** Spacing of the tile grid in px. */
  size?: number;
  /** Mark diameter as a fraction of `size`. Keep below 1 so marks never touch. */
  scale?: number;
};

/**
 * Tiled monogram watermark. The tile is a 2x2 grid carrying two marks on a
 * diagonal, which reads as a woven field rather than a rigid grid. Both marks
 * sit fully inside the tile so nothing is clipped at the tile seams.
 */
export function MarkPattern({
  id,
  className,
  size = 132,
  scale = 0.6,
}: PatternProps) {
  const tile = size * 2;
  const glyphScale = (size * scale) / GLYPH_SIZE;
  // Centre each mark in its half of the tile.
  const inset = (size * (1 - scale)) / 2;
  const place = (col: number, row: number) =>
    `translate(${inset + col * size} ${inset + row * size}) scale(${glyphScale}) translate(${-GLYPH_ORIGIN.x} ${-GLYPH_ORIGIN.y})`;

  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width={tile}
          height={tile}
        >
          <g transform={place(0, 0)}>
            <MarkGlyph />
          </g>
          <g transform={place(1, 1)}>
            <MarkGlyph />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

type CirclePatternProps = {
  /** Unique id — SVG pattern ids are global, so each instance needs its own. */
  id: string;
  className?: string;
  /** Square tile side in px. */
  size?: number;
  /**
   * Circle radius in px. Defaults to half the tile side, so the circle is
   * inscribed in its square.
   */
  radius?: number;
};

/**
 * A grid of squares each with an inscribed circle punched out (even-odd fill):
 * the tile colour shows only in the four corners, so tiled — with the circles
 * revealing the background beneath — those corners meet as a diamond lattice.
 * Colour comes from `currentColor`, so tint and opacity are set with a Tailwind
 * `text-*` class on the element.
 */
export function CirclePattern({
  id,
  className,
  size = 40,
  radius,
}: CirclePatternProps) {
  const r = radius ?? size / 2;
  const c = size / 2;
  // Square outline, then the circle as a subpath; even-odd turns the circle
  // into a hole so only the corners are painted.
  const d = `M0 0H${size}V${size}H0Z M${c - r} ${c}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width={size}
          height={size}
        >
          <path d={d} fill="currentColor" fillRule="evenodd" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

type DiamondFieldProps = {
  /** Unique id — SVG pattern ids are global, so each instance needs its own. */
  id: string;
  className?: string;
  /** Tile height in px. One diamond sits in each tile. */
  size?: number;
};

/**
 * The diamond artwork from `public/icons/diamond.svg`, tiled across its
 * container. Its four vertices sit at the tile edge midpoints, so tiled the
 * diamonds meet point-to-point and read as a chain in every direction. Colour
 * is `currentColor`, so tint and opacity come from a Tailwind `text-*` class.
 */
// Path, transform and bounding box taken verbatim from public/icons/diamond.svg.
const DIAMOND_PATH =
  "M0 0C-138.121-18.347-244.698-136.576-244.698-279.725-244.698-136.576-351.251-18.323-489.395 0-351.251 18.324-244.698 136.577-244.698 279.726-244.698 136.577-138.121 18.348 0 0";
const DIAMOND_TRANSFORM = "matrix(1,0,0,-1,770.5443,528.9373)";
const DIAMOND_VIEWBOX = "281.149 249.211 489.395 559.452";
const DIAMOND_ASPECT = 489.395 / 559.452;

export function DiamondField({ id, className, size = 60 }: DiamondFieldProps) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    >
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width={size * DIAMOND_ASPECT}
          height={size}
          viewBox={DIAMOND_VIEWBOX}
        >
          <path
            transform={DIAMOND_TRANSFORM}
            d={DIAMOND_PATH}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
