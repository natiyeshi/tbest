import type { StaticImageData } from "next/image";

import teamSix from "../../public/new/team/b24.webp";
import partnersStanding from "../../public/new/team/b26.webp";
import partnersSeated from "../../public/new/team/b28.webp";
import teamWomen from "../../public/new/team/b30.webp";
import teamFull from "../../public/new/team/b32.webp";
import teamMen from "../../public/new/team/b34.webp";
import pairSeniorPortrait from "../../public/new/team/b35.webp";
import pairPortrait from "../../public/new/team/b36.webp";
import pairSmilingPortrait from "../../public/new/team/b37.webp";
import boardroomFull from "../../public/new/team/b41.webp";
import boardroomCandid from "../../public/new/team/b45.webp";
import boardroomPartners from "../../public/new/team/b49.webp";

/**
 * The firm's own photography, from the 2026 shoot in `public/new/team`. Two
 * families: studio group portraits against the light wall, and the boardroom at
 * Africa Avenue. Named here rather than imported by filename across the site,
 * so the alt text travels with the picture and a swap is one edit.
 */
export type FirmPhoto = {
  src: StaticImageData;
  /** Empty where the photograph is decorative and the copy already says it. */
  alt: string;
};

export const firmPhotos = {
  /** The whole firm, three partners seated at the front. */
  teamFull: {
    src: teamFull,
    alt: "The lawyers of TBeST Law LLP",
  },
  /** Six of the firm's lawyers, standing. */
  teamSix: { src: teamSix, alt: "Lawyers of TBeST Law LLP" },
  /** The women of the firm. */
  teamWomen: { src: teamWomen, alt: "The women of TBeST Law LLP" },
  /** The men of the firm. */
  teamMen: { src: teamMen, alt: "Lawyers of TBeST Law LLP" },
  /** The three partners, standing. */
  partnersStanding: {
    src: partnersStanding,
    alt: "The partners of TBeST Law LLP",
  },
  /** The three partners, one seated. */
  partnersSeated: {
    src: partnersSeated,
    alt: "The partners of TBeST Law LLP",
  },
  /** Portrait-orientation pairings, for tall frames. */
  pairPortrait: { src: pairPortrait, alt: "Lawyers of TBeST Law LLP" },
  pairSeniorPortrait: {
    src: pairSeniorPortrait,
    alt: "Lawyers of TBeST Law LLP",
  },
  pairSmilingPortrait: {
    src: pairSmilingPortrait,
    alt: "Lawyers of TBeST Law LLP",
  },
  /** The team around the boardroom table at the firm's office. */
  boardroomFull: {
    src: boardroomFull,
    alt: "The team of TBeST Law LLP in the firm's boardroom in Addis Ababa",
  },
  /** The same room, mid-conversation. */
  boardroomCandid: {
    src: boardroomCandid,
    alt: "Lawyers of TBeST Law LLP at work in the firm's boardroom",
  },
  /** The partners at the head of the boardroom table. */
  boardroomPartners: {
    src: boardroomPartners,
    alt: "The partners of TBeST Law LLP in the firm's boardroom",
  },
} satisfies Record<string, FirmPhoto>;
