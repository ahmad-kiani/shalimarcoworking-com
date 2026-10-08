import Footer from "./Footer";
import Header from "./Header";

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
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 lg:pt-40">
        <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated {updated}</p>
        <div className="mt-12 space-y-5 leading-relaxed text-ink/85 [&_a]:text-garden [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
