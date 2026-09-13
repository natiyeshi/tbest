"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { FirmPhoto } from "@/lib/firm-images";

/**
 * One frame of the wall. The grid placement travels with the picture rather
 * than being derived, so the bento stays written out cell by cell — the layout
 * is the point — and every span class stays visible to Tailwind.
 */
export type PhotoWallCell = {
  photo: FirmPhoto;
  /** Column and row spans for this frame. */
  className: string;
  sizes: string;
  /** Where the crop sits inside the frame. */
  objectPosition?: string;
};

/** 3 of 12 -> "03 / 12". */
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The firm's photography as a clickable wall: each frame opens the picture
 * whole — uncropped, as large as the viewport allows — and the reader moves
 * through the set from there with the arrows, the keyboard, a swipe, or the
 * thumbnail rail.
 *
 * The viewer is a native `<dialog>` opened with `showModal()`, which puts it in
 * the top layer above the site header, traps focus and handles Escape without
 * any of that being reimplemented here.
 */
export function PhotoWall({
  cells,
  className,
}: {
  cells: readonly PhotoWallCell[];
  className?: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = cells.length;
  const step = useCallback(
    (delta: number) =>
      setOpenAt((at) => (at === null ? at : (at + delta + count) % count)),
    [count],
  );

  // Open and close the dialog itself as the state changes; `close()` fires the
  // native close event, so Escape and the buttons all land in the same place.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openAt !== null && !dialog.open) dialog.showModal();
    else if (openAt === null && dialog.open) dialog.close();
  }, [openAt]);

  // The page behind the viewer must not scroll under it. Keyed on open/closed
  // rather than on the index, so moving through the set doesn't churn it.
  const isOpen = openAt !== null;
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Keep the current thumbnail in view as the reader moves through the set.
  useEffect(() => {
    if (openAt === null) return;
    railRef.current
      ?.querySelector("[data-current=true]")
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [openAt]);

  const close = useCallback(() => {
    const returnTo = openAt;
    setOpenAt(null);
    // Focus goes back to the frame the reader opened, not to the top of the page.
    if (returnTo !== null) triggersRef.current[returnTo]?.focus();
  }, [openAt]);

  const current = openAt === null ? null : cells[openAt].photo;
  // The neighbours are fetched off-screen while the reader looks at the current
  // one, so the next press of an arrow paints immediately. Their `sizes` match
  // the viewer's, so the browser picks the candidate it is about to need.
  const neighbours =
    openAt === null
      ? []
      : [
          cells[(openAt + 1) % count].photo,
          cells[(openAt - 1 + count) % count].photo,
        ];

  return (
    <>
      <div className={className}>
        {cells.map((cell, index) => (
          <button
            key={cell.photo.src.src}
            type="button"
            ref={(node) => {
              triggersRef.current[index] = node;
            }}
            onClick={() => setOpenAt(index)}
            aria-label={`${cell.photo.alt} — view full size`}
            className={`group relative cursor-zoom-in overflow-hidden rounded-2xl bg-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bone ${cell.className}`}
          >
            <Image
              src={cell.photo.src}
              alt={cell.photo.alt}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes={cell.sizes}
              placeholder="blur"
              quality={90}
              style={{ objectPosition: cell.objectPosition ?? "center" }}
            />
            {/* A quiet hint that the frame opens, rather than a standing badge. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-brand-950/45 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <ExpandIcon />
              </span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenAt(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
        aria-label="The firm's photography"
        className="photo-viewer fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-brand-950/95 backdrop:backdrop-blur-sm"
      >
        {current && openAt !== null && (
          <div className="flex h-full w-full flex-col">
            <div className="flex shrink-0 items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
              <p className="font-display text-sm tracking-wide text-white/70">
                <span className="text-white">{pad(openAt + 1)}</span>
                <span className="mx-1.5 text-white/35">/</span>
                {pad(count)}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-400"
              >
                <CloseIcon />
              </button>
            </div>

            {/* The picture, whole. Clicking the space around it closes, the way
                a lightbox is expected to. */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-20 sm:py-6"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                const from = touchStartX.current;
                touchStartX.current = null;
                if (from === null) return;
                const travelled = event.changedTouches[0].clientX - from;
                if (Math.abs(travelled) > 48) step(travelled < 0 ? 1 : -1);
              }}
            >
              <Image
                key={current.src.src}
                src={current.src}
                alt={current.alt}
                sizes="100vw"
                quality={90}
                placeholder="blur"
                className="photo-viewer-frame h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl shadow-black/50"
              />

              {count > 1 && (
                <>
                  <NavButton side="left" onClick={() => step(-1)} />
                  <NavButton side="right" onClick={() => step(1)} />
                </>
              )}
            </div>

            <div className="shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
              <p className="text-center text-[0.8125rem] leading-relaxed text-white/70">
                {current.alt}
              </p>

              {count > 1 && (
                <div
                  ref={railRef}
                  className="mt-4 flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center"
                >
                  {cells.map((cell, index) => (
                    <button
                      key={cell.photo.src.src}
                      type="button"
                      data-current={index === openAt}
                      onClick={() => setOpenAt(index)}
                      aria-label={`Photograph ${index + 1} of ${count}`}
                      aria-current={index === openAt}
                      className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 ${
                        index === openAt
                          ? "opacity-100 ring-2 ring-copper-400"
                          : "opacity-45 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={cell.photo.src}
                        alt=""
                        sizes="64px"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            >
              {neighbours.map((photo) => (
                <Image
                  key={photo.src.src}
                  src={photo.src}
                  alt=""
                  sizes="100vw"
                  quality={90}
                  loading="eager"
                />
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photograph" : "Next photograph"}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 sm:h-12 sm:w-12 ${
        side === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
    >
      <ChevronIcon side={side} />
    </button>
  );
}

function ChevronIcon({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d={side === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
    </svg>
  );
}
