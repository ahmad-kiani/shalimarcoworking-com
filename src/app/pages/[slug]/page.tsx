import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import StickyDeal from "@/components/StickyDeal";
import { ReasonsArticle } from "@/components/Reasons";
import { AbroadArticle } from "@/components/Abroad";
import { TeamsArticle } from "@/components/Teams";
import { Hero, OfferCard, pill, PressStrip, ReasonRow, ReviewBand, SaleBar, Title, wrap } from "@/components/Listicle";
import { getListicle, listicles } from "@/content/listicles";
import { getReasonsPage, reasonsPages } from "@/content/reasons";
import { sale, whatsapp, whatsappLink } from "@/content/site";

// Advertorial pages: the story-style listicles (src/content/listicles.ts) and the "10 reasons" pages
// (src/content/reasons.ts). Any other slug shows the 404 page.
export function generateStaticParams() {
  return [...listicles, ...reasonsPages].map((l) => ({ slug: l.slug }));
}

const dealLink = (offer: string, code: string) =>
  whatsappLink(`${whatsapp.tourMessage} I saw the ${offer} on your website. (Ref: ${code})`);

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const reasons = getReasonsPage(slug);
  if (reasons)
    return {
      title: reasons.meta.title,
      description: reasons.meta.description,
      alternates: { canonical: `/pages/${reasons.slug}` },
      openGraph: { title: reasons.meta.title, description: reasons.meta.description, images: [reasons.meta.image] },
      robots: reasons.index ? undefined : { index: false, follow: false },
    };
  const page = getListicle(slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/pages/${page.slug}` },
    openGraph: { title: page.meta.title, description: page.meta.description, images: [page.hero.src] },
    robots: page.index ? undefined : { index: false, follow: false },
  };
}

export default async function ListiclePage({ params }: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const reasons = getReasonsPage(slug);
  if (reasons) {
    const deal = dealLink(sale.name, reasons.code);
    return (
      <>
        <SaleBar />
        <main id="content" data-listicle className="outline-none">
          {reasons.layout === "abroad" ? (
            <AbroadArticle page={reasons} deal={deal} />
          ) : reasons.layout === "teams" ? (
            <TeamsArticle page={reasons} deal={deal} />
          ) : (
            <ReasonsArticle page={reasons} deal={deal} />
          )}
        </main>
        <Footer />
        <StickyDeal href={deal} label="Claim deal" />
      </>
    );
  }

  const page = getListicle(slug);
  if (!page) notFound();
  const deal = dealLink(page.offer.title, page.code);

  return (
    <>
      <SaleBar />
      <main id="content" data-listicle className="outline-none">
        <article>
          <Hero page={page} />
          <Title page={page} />
          <PressStrip page={page} />
          <ol className={`${wrap} pt-4 sm:pt-8`}>
            {page.reasons.map((r, i) => (
              <ReasonRow key={r.title} n={i + 1} reason={r} />
            ))}
          </ol>
          <OfferCard page={page} href={deal} />
          <ReviewBand page={page} reviews={page.reviews} />
          <div data-deal-end className={`${wrap} flex justify-center pt-4 pb-16 sm:pb-20`}>
            <a href={deal} target="_blank" rel="noopener noreferrer" className={pill}>
              {page.offer.cta}
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <StickyDeal href={deal} label="Claim deal" />
    </>
  );
}
