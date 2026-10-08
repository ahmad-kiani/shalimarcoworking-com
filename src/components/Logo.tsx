import Mark from "./Mark";

// Lockup: the three-diamond mark, a hairline divider, then the wordmark.
// "COWORKING" is spread letter by letter so it always spans exactly the width of "Shalimar".
export default function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`flex items-center ${large ? "gap-5" : "gap-3"}`}>
      <Mark className={`w-auto shrink-0 text-brass ${large ? "h-14" : "h-8 lg:h-9"}`} />
      <span aria-hidden="true" className={`w-px self-stretch bg-current opacity-25 ${large ? "my-1" : "my-1.5"}`} />
      <span className="inline-grid leading-none">
        <span className={`font-serif tracking-[-0.01em] ${large ? "text-6xl" : "text-[28px] lg:text-[30px]"}`}>
          Shalimar
        </span>
        <span
          aria-hidden="true"
          className={`flex justify-between font-sans font-semibold text-brass ${
            large ? "mt-2 text-[13px]" : "mt-1 text-[8.5px] lg:text-[9px]"
          }`}
        >
          {"COWORKING".split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </span>
        <span className="sr-only">Coworking</span>
      </span>
    </span>
  );
}
