// Eyebrow on the left and a large serif title on the right; they stack on mobile.
export default function SectionHeading({
  eyebrow,
  lines,
  accent,
  dark = false,
}: {
  eyebrow: string;
  lines: string[];
  accent?: string;
  dark?: boolean;
}) {
  const accentColor = dark ? "text-brass" : "text-brass-dark";

  return (
    <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:items-end">
      <p className={`flex items-center gap-4 text-xs font-medium tracking-[0.3em] uppercase lg:pb-3 ${dark ? "text-brass-light" : "text-brass-dark"}`}>
        <span className="h-px w-8 bg-brass" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[4rem] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {lines.map((line, i) => (
          <span key={i} className={i === lines.length - 1 && !accent ? `${accentColor} italic` : ""}>
            {line}{" "}
          </span>
        ))}
        {accent && <span className={`${accentColor} italic`}>{accent}</span>}
      </h2>
    </div>
  );
}
