import Image from "next/image";
import Link from "next/link";

import { firm, type TeamMember } from "@/lib/content";

/**
 * The lawyers to contact about one practice area or sector, shown in the rail
 * beside the page's content.
 *
 * Each card carries a way to reach the person, not just their name: their own
 * address and direct line where the firm has supplied them, and the firm's
 * inbox and switchboard where it has not. The mailto carries a subject naming
 * the practice, so a message that starts here arrives already labelled.
 */
export function ServiceContacts({
  kind,
  name,
  members,
}: {
  kind: string;
  name: string;
  members: readonly TeamMember[];
}) {
  if (members.length === 0) return null;

  const subject = encodeURIComponent(`${name} — enquiry`);

  return (
    <div className="mt-10 border-t border-line pt-8">
      <p className="eyebrow text-copper-500">Key contacts</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The lawyers who lead our {name} work.
      </p>

      <ul className="mt-6 space-y-5">
        {members.map((member) => {
          const email = member.email || firm.email;
          const phone = member.phone || firm.phones.office;

          return (
            <li key={member.slug} className="flex gap-4">
              <Link
                href={`/team/${member.slug}`}
                className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-navy-900"
                aria-label={`${member.name}, ${member.role}`}
              >
                <Image
                  src={member.card}
                  alt=""
                  sizes="64px"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="min-w-0">
                <Link
                  href={`/team/${member.slug}`}
                  className="font-display text-lg leading-tight text-navy-800 transition-colors hover:text-copper-600"
                >
                  {member.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted">{member.role}</p>

                <div className="mt-2.5 space-y-1 text-[0.8125rem]">
                  <p>
                    <a
                      href={`mailto:${email}?subject=${subject}`}
                      className="break-all font-medium text-copper-500 transition-colors hover:text-copper-600"
                    >
                      {email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-muted transition-colors hover:text-navy-800"
                    >
                      {phone}
                    </a>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-7 text-xs leading-relaxed text-muted/80">
        Not sure who to ask? Write to{" "}
        <a
          href={`mailto:${firm.email}?subject=${subject}`}
          className="font-semibold text-copper-500 transition-colors hover:text-copper-600"
        >
          {firm.email}
        </a>{" "}
        and we will put you with the right {kind.toLowerCase()} lawyer.
      </p>
    </div>
  );
}
