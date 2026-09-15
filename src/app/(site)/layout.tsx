import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPracticeLinks } from "@/lib/public-content";

/**
 * The public site's chrome. It lives here rather than in the root layout so the
 * dashboard under /admin — which is not the website and should not carry its
 * header, footer or scroll animations — can sit outside it.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Read once here and handed to both the menu and the footer, so a practice
  // added or removed in the dashboard is reflected in the chrome as well as on
  // the pages themselves.
  const practices = await getPracticeLinks();

  return (
    <>
      {/* With JS disabled the reveal animation cannot run, so reveal everything
          up front — the effect is decorative, not a gate on the content. */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "[data-reveal]{opacity:1!important;transform:none!important}[data-typein] .tw-char{opacity:1!important}.tw-caret{display:none!important}",
          }}
        />
      </noscript>
      <ScrollReveal />
      <SiteHeader practices={practices} />
      <main className="flex-1">{children}</main>
      <SiteFooter practices={practices} />
    </>
  );
}
