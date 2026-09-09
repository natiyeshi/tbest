"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** How long the photograph holds before the clip runs again. */
const REPLAY_MS = 6000;

/**
 * Where the frame sits over the source when it has to crop.
 *
 * These were shot with a generous margin of wall above the head, so anchoring
 * to the top (the obvious choice) spent the frame on empty ceiling and took the
 * crop out of the subject's legs instead. At 60% most of the overflow comes off
 * the top, closing that gap, and the rest off the bottom. Raise it toward 100%
 * to crop harder from the top, lower it toward 0 for more headroom.
 *
 * Set inline rather than as an arbitrary utility, as `page-hero` does: Tailwind
 * only generates a class it can find in the source, and it does not pick one
 * out of a bare constant.
 */
const OBJECT_POSITION = "center 40%";

/**
 * A member's short clip, on a cycle: it plays once, rests on its final frame,
 * and runs again six seconds later.
 *
 * The photograph sits underneath at all times, so it is what shows before the
 * clip has decoded and if the clip never arrives — nothing here gates
 * visibility on a load event. (An earlier version did, and whenever the video
 * was ready before React hydrated the listener was attached too late and the
 * video never appeared at all.)
 *
 * The clip is decorative — the alt text belongs to the photograph — and since
 * the cycle repeats indefinitely it carries a control to stop it. That control
 * doubles as a restart while the clip is resting, so the reader never has to
 * wait out the gap.
 */
export function PortraitClip({
  clip,
  photo,
  alt,
  sizes,
  priority = false,
}: {
  /** Public path to the clip, e.g. "/new/linda-tedla/compressed/x.webm". */
  clip?: string;
  photo: StaticImageData;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<number>(0);

  // "playing" while the clip runs, "resting" once it has stopped on its final
  // frame and is waiting to run again, "paused" when the reader stopped it.
  // Only the video's own events move it, all of them well after hydration.
  const [mode, setMode] = useState<"playing" | "resting" | "paused">("playing");

  const runClip = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  const handleEnded = () => {
    // No swap back to the photograph: the video holds its last frame, so the
    // rest reads as a pause in the clip rather than a change of picture.
    setMode("resting");
    timer.current = window.setTimeout(runClip, REPLAY_MS);
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    window.clearTimeout(timer.current);
    if (video.paused) runClip();
    else video.pause();
  };

  // Readers who prefer reduced motion get the photograph and no cycle. Pausing
  // the element is enough: the `pause` handler below carries that into state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.pause();
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <>
      <Image
        src={photo}
        alt={alt}
        placeholder="blur"
        sizes={sizes}
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: OBJECT_POSITION }}
      />

      {clip && (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: OBJECT_POSITION }}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            onEnded={handleEnded}
            onPlay={() => setMode("playing")}
            // Reaching the end of a clip fires `pause` before `ended`, so a
            // plain handler would call this a reader-initiated stop. Only a
            // pause away from the end is one.
            onPause={() => {
              if (!videoRef.current?.ended) setMode("paused");
            }}
          >
            <source src={clip} type="video/webm" />
          </video>

          <button
            type="button"
            onClick={toggle}
            aria-label={
              mode === "playing"
                ? "Pause this clip"
                : mode === "resting"
                  ? "Play this clip again"
                  : "Play this clip"
            }
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-brand-950/45 text-white/85 backdrop-blur-sm transition-colors hover:border-white/70 hover:text-white"
          >
            {mode === "playing" && (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M5 3v10M11 3v10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
            {mode === "resting" && (
              // Circular arrow: the clip has finished and can be run again.
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M13 8a5 5 0 1 1-1.7-3.76"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M13 2v3.2h-3.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {mode === "paused" && (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </>
      )}
    </>
  );
}
