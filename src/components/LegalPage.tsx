import Footer from "./Footer";
import Header from "./Header";
import { gutter } from "./styles";

// Shared shell for text pages such as the privacy policy.
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header alwaysSolid />
      <main className={`mx-auto max-w-3xl ${gutter} pt-24 pb-24 sm:pt-32 lg:pt-40`}>
        <h1 className="font-serif text-5xl leading-[1.05] max-[359px]:text-[2.5rem] sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
        <div className="mt-12 space-y-5 leading-relaxed text-ink/85 [&_a]:text-garden [&_a]:underline [&_a]:underline-offset-4 [&_a]:[overflow-wrap:anywhere] [&_h2]:scroll-mt-24 [&_h2]:pt-6 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_h3]:pt-2 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:pl-1 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.9375rem] [&_td]:border-b [&_td]:border-sand [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_th]:border-b-2 [&_th]:border-sand [&_th]:pb-2 [&_th]:pr-4 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-[0.15em] [&_th]:text-muted [&_th]:uppercase [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
