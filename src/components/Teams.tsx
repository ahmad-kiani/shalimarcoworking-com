import Image from "next/image";
import TeamCost from "./TeamCost";
import { gutter } from "./styles";
import { noWidow, pill, Rich } from "./Listicle";
import { Closing, display, eyebrow, Faq, MemberReviews, Title } from "./Reasons";
import { pricing, sale } from "@/content/site";
import { seatsLeft } from "@/content/listicles";
import type { ReasonsPage } from "@/content/reasons";

// The small-teams page (LS5): same content model and colours as the reasons pages, its own layout.
// A light split hero (text left, a tall private-office photo right with the team review over it), a team cost
// calculator, an "own office vs here" checklist built from `compare`, the reasons as large photos with an overlapping
// text card, then the same review cards as LS2/LS4, the FAQ and the closing call to visit.

const wide = `mx-auto max-w-[72rem] ${gutter}`;
const pad = (n: number) => String(n).padStart(2, "0");
const h2 = `${display} text-[1.75rem] leading-[1.1] text-ink uppercase sm:text-[2.5rem]`;

function Mark({ ok }: { ok: boolean }) {
  return (
    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${ok ? "bg-brass text-ink" : "bg-ink/10 text-ink/50"}`} aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="size-2.5">
        {ok ? <path d="M2.5 6.2 5 8.5l4.5-5" /> : <path d="M3 3l6 6M9 3l-6 6" />}
      </svg>
    </span>
  );
}

export function TeamsArticle({ page, deal }: { page: ReasonsPage; deal: string }) {
  const offices = seatsLeft("Private Office");
  const officeLeft = pricing.plans.find((p) => p.name === "Private Office")!.left;
  return (
    <article className="bg-cream">
      {/* Hero */}
      <header data-deal-start className={`${wide} grid gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pb-20`}>
        <div>
          <p className={`${eyebrow} flex items-center gap-3 text-brass-dark`}>
            <span className="h-px w-8 bg-brass max-sm:hidden" aria-hidden="true" />
            {page.eyebrow}
          </p>
          <h1 className={`${display} mt-4 text-[clamp(1.5rem,calc((100vw-2.5rem)/9.6),2.25rem)] leading-[1.1] text-balance text-ink sm:mt-5 sm:text-[2.75rem] lg:text-[3rem]`}>
            <Title text={page.title} phoneLines={page.titlePhoneLines} />
          </h1>
          <p className="mt-4 max-w-[36rem] text-[0.9375rem] leading-[1.65] text-ink/75 sm:mt-5 sm:text-[1.0625rem]">{page.intro}</p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a href={deal} target="_blank" rel="noopener noreferrer" className={`${pill} sm:w-auto`}>
              {page.offer.cta}
            </a>
            <a href="#cost" className="inline-flex min-h-11 items-center justify-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] text-ink uppercase underline-offset-4 hover:underline">
              See your team&rsquo;s cost <span aria-hidden="true">&darr;</span>
            </a>
          </div>
          {officeLeft > 0 && (
            <p className="mt-5 flex items-center gap-2 text-[0.875rem] font-semibold text-[#b3261e]">
              <span className="size-2 rounded-full bg-current" aria-hidden="true" />
              {offices} at the {sale.name.toLowerCase()} price
            </p>
          )}
        </div>
        <figure className="relative pb-24 sm:pb-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image src={page.meta.image} alt="A private office at Shalimar Coworking, with desks, monitors and a window onto the trees" fill priority sizes="(min-width: 64rem) 32rem, 100vw" className="object-cover" />
          </div>
          <div className="absolute right-4 bottom-0 left-4 rounded-md bg-white p-5 shadow-[0_12px_40px_rgb(0_0_0/0.16)] sm:right-auto sm:left-0 sm:max-w-[26rem] lg:-left-10">
            <span className="text-[0.875rem] tracking-[0.2em] text-brass" role="img" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
            <blockquote className="mt-2 text-[0.9375rem] leading-relaxed text-ink">&ldquo;{noWidow(page.callout.quote)}&rdquo;</blockquote>
            <figcaption className="mt-3 text-[0.75rem] font-bold tracking-[0.12em] text-ink uppercase">&mdash; {page.callout.name}</figcaption>
          </div>
        </figure>
      </header>

      {/* Team cost */}
      <section id="cost" aria-labelledby="cost-title" className="scroll-mt-12 border-y border-ink/10 bg-sand/45 py-14 sm:py-20">
        <div data-deal-card className={wide}>
          <p className={`${eyebrow} text-center text-brass-dark`}>{sale.name} &middot; up to {sale.upTo}% off</p>
          <h2 id="cost-title" className={`${h2} mt-3 text-center`}>
            What It Costs For Your Team
          </h2>
          <p className="mx-auto mt-3 mb-8 max-w-[34rem] text-center text-[0.9375rem] text-ink/75 sm:text-base">{page.offer.body}</p>
          <TeamCost code={page.code} />
        </div>
      </section>

      {/* Own office vs here */}
      <section aria-labelledby="compare-title" className={`${wide} pt-16 sm:pt-24`}>
        <h2 id="compare-title" className={`${h2} text-center`}>
          {page.compare.title}
        </h2>
        <div className="mx-auto mt-8 grid max-w-[60rem] gap-5 md:grid-cols-2">
          <div className="rounded-md border border-ink/10 bg-white/60 p-6 sm:p-8">
            <p className={`${display} text-[1.125rem] text-ink/70 uppercase`}>{page.compare.them}</p>
            <ul className="mt-5 space-y-3.5">
              {page.compare.rows.map((r) => (
                <li key={r.label} className="flex gap-3 text-[0.9375rem] leading-snug text-ink/65">
                  <Mark ok={false} />
                  {r.them}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-ink p-6 text-cream sm:p-8">
            <p className={`${display} text-[1.125rem] uppercase`}>A private office at Shalimar</p>
            <ul className="mt-5 space-y-3.5">
              {page.compare.rows.map((r) => (
                <li key={r.label} className="flex gap-3 text-[0.9375rem] leading-snug text-cream/90">
                  <Mark ok />
                  {r.us}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-[40rem] text-center text-[0.9375rem] text-ink/75">{page.compare.summary}</p>
      </section>

      {/* Reasons: big photo with an overlapping card, alternating sides */}
      <section aria-labelledby="reasons-title" className={`${wide} pt-16 sm:pt-24`}>
        <h2 id="reasons-title" className={`${h2} text-center`}>
          Why Small Teams Choose Shalimar
        </h2>
        <ol className="mt-10 space-y-12 sm:mt-14 md:space-y-16">
          {page.reasons.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={r.title} className="md:grid md:grid-cols-12 md:items-center">
                <div className={`relative aspect-[16/10] overflow-hidden rounded-md md:row-start-1 ${flip ? "md:col-start-5 md:col-end-13" : "md:col-start-1 md:col-end-9"}`}>
                  <Image
                    src={r.visual.src}
                    alt={r.visual.alt}
                    fill
                    sizes="(min-width: 72rem) 44rem, (min-width: 48rem) 66vw, 100vw"
                    className="object-cover"
                    style={r.visual.position ? { objectPosition: r.visual.position } : undefined}
                  />
                </div>
                <div
                  className={`relative z-10 mx-4 -mt-10 rounded-md bg-white p-6 shadow-[0_12px_40px_rgb(0_0_0/0.12)] sm:mx-8 sm:p-8 md:row-start-1 md:mx-0 md:mt-0 ${
                    flip ? "md:col-start-1 md:col-end-7" : "md:col-start-7 md:col-end-13"
                  }`}
                >
                  <p className="flex items-baseline gap-3">
                    <span className={`${display} text-[2rem] leading-none text-brass`} aria-hidden="true">
                      {pad(i + 1)}
                    </span>
                    <span className={`${eyebrow} text-brass-dark`}>{r.tag}</span>
                  </p>
                  <h3 className={`${display} mt-3 text-[1.25rem] leading-[1.15] text-ink uppercase sm:text-[1.5rem]`}>{r.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink/80">
                    <Rich text={r.body} />
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="pt-16 sm:pt-24">
        <MemberReviews page={page} />
      </div>
      <div className="pt-16 sm:pt-20">
        <Faq faq={page.faq} />
      </div>
      <Closing closing={page.closing} cta={page.offer.cta} deal={deal} />
    </article>
  );
}
