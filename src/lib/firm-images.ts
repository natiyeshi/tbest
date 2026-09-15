import type { StaticImageData } from "next/image";

import teamSix from "../../public/new/team/original/b24.jpg";
import partnersStanding from "../../public/new/team/original/b26.jpg";
import partnersSeated from "../../public/new/team/original/b28.jpg";
import teamWomen from "../../public/new/team/original/b30.jpg";
import teamFull from "../../public/new/team/original/b32.jpg";
import teamStanding from "../../public/new/team/original/b33.jpg";
import teamMen from "../../public/new/team/original/b34.jpg";
import pairSeniorPortrait from "../../public/new/team/original/b35.jpg";
import pairPortrait from "../../public/new/team/original/b36.jpg";
import pairSmilingPortrait from "../../public/new/team/original/b37.jpg";
import teamFour from "../../public/new/team/original/b39.jpg";
import boardroomFull from "../../public/new/team/original/b41.jpg";
import boardroomCandid from "../../public/new/team/original/b45.jpg";
import boardroomPartners from "../../public/new/team/original/b49.jpg";
import boardroomThree from "../../public/new/team/original/b50.jpg";

/**
 * The firm's own photography, from the 2026 shoot. Two families: studio group
 * portraits against the light wall, and the boardroom at Africa Avenue. Named
 * here rather than imported by filename across the site, so the alt text
 * travels with the picture and a swap is one edit.
 *
 * These point at the untouched camera files in `public/new/team/original`, and
 * the image optimiser is off site-wide (next.config.ts), so the browser gets
 * each photograph byte for byte.
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
  /** The whole firm again, this time standing in one line. */
  teamStanding: {
    src: teamStanding,
    alt: "The lawyers and staff of TBeST Law LLP",
  },
  /** Six of the firm's lawyers, standing. */
  teamSix: { src: teamSix, alt: "Lawyers of TBeST Law LLP" },
  /** Four of the firm's lawyers, standing. */
  teamFour: { src: teamFour, alt: "Lawyers of TBeST Law LLP" },
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
  /** Three of the firm's lawyers along one side of the table. */
  boardroomThree: {
    src: boardroomThree,
    alt: "Lawyers of TBeST Law LLP at the boardroom table",
  },
} satisfies Record<string, FirmPhoto>;
