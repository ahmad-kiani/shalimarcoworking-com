import type { Metadata } from "next";
import CopyLink from "@/components/CopyLink";
import { gutter } from "@/components/styles";
import { listicles } from "@/content/listicles";
import { reasonsPages } from "@/content/reasons";
import { siteUrl } from "@/content/site";

// Internal list of every ad page (/pages), for the team only: no link to it anywhere on the site, kept out of
// Google and out of the sitemap. New pages added to listicles.ts or reasons.ts appear here by themselves.
export const metadata: Metadata = {
  title: "Ad pages | Shalimar Coworking",
  robots: { index: false, follow: false },
};

// The address people use, with www (the bare domain redirects to it).
const base = siteUrl.includes("://www.") ? siteUrl : siteUrl.replace("://", "://www.");
const display = "font-(family-name:--font-montserrat) font-semibold tracking-[-0.01em]";

const pages = [
  ...listicles.map((l) => ({ code: l.code, slug: l.slug, title: l.title, audience: "Security", layout: "Story listicle", index: l.index })),
  ...reasonsPages.map((r) => ({
    code: r.code,
    slug: r.slug,
    title: r.title,
    // Hidden pages are A/B copies of another page (LS3 = LS2 with the Twin Cities headline).
    audience: r.index ? r.eyebrow : `${r.eyebrow} (A/B variant)`,
    layout: r.layout === "abroad" ? "Dark hero, world clocks" : r.layout === "teams" ? "Split hero, team calculator" : "5 reasons",
    index: r.index,
  })),
].sort((a, b) => a.code.localeCompare(b.code, "en", { numeric: true }));

export default function AdPagesIndex() {
  return (
    <main id="content" className={`mx-auto min-h-dvh max-w-[60rem] bg-white ${gutter} py-12 sm:py-16`}>
      <p className="text-[0.75rem] font-semibold tracking-[0.18em] text-brass-dark uppercase">Internal · not linked from the site</p>
      <h1 className={`${display} mt-3 text-[2rem] leading-tight text-ink sm:text-[2.5rem]`}>Ad pages</h1>
      <p className="mt-3 max-w-[40rem] text-[0.9375rem] leading-relaxed text-ink/75">
        {pages.length} pages. Every WhatsApp message from a page ends with its code (for example &ldquo;Ref: {pages[0].code}&rdquo;), so each lead shows
        which page it came from.
      </p>

      <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {pages.map((p) => {
          const url = `${base}/pages/${p.slug}`;
          return (
            <li key={p.slug} className="grid gap-4 py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
              <span className={`${display} w-fit rounded-sm bg-brass px-2.5 py-1 text-[0.875rem] text-ink`}>{p.code}</span>
              <div className="min-w-0">
                <h2 className={`${display} text-[1.0625rem] leading-snug text-ink`}>{p.title}</h2>
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-ink/65">
                  <span>{p.audience}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.layout}</span>
                  <span aria-hidden="true">·</span>
                  <span className={p.index ? "text-[#2f7d4b]" : "text-ink/65"}>{p.index ? "In Google" : "Hidden from Google"}</span>
                </p>
                <a href={`/pages/${p.slug}`} target="_blank" rel="noopener" className="mt-2 block text-[0.8125rem] break-all text-ink/80 underline underline-offset-2 hover:text-brass-dark">
                  {url}
                </a>
              </div>
              <CopyLink url={url} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
