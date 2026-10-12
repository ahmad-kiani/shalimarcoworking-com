import Mark from "./Mark";

// Lockup: the three-diamond mark, a hairline divider, then the wordmark in Libre Baskerville.
// "COWORKING" is spread letter by letter so it spans exactly the width of "Shalimar".
export default function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`flex items-center ${large ? "gap-5" : "gap-3"}`}>
      <Mark className={`w-auto shrink-0 text-brass ${large ? "h-12" : "h-7 lg:h-8"}`} />
      <span aria-hidden="true" className={`w-px self-stretch bg-current opacity-25 ${large ? "my-1" : "my-1.5"}`} />
      <span className="inline-grid leading-none">
        <span className={`font-logo ${large ? "text-5xl" : "text-[24px] lg:text-[26px]"}`}>Shalimar</span>
        <span
          aria-hidden="true"
          className={`flex justify-between font-sans font-semibold text-brass ${
            large ? "mt-2.5 text-[12px]" : "mt-1.5 text-[8px] lg:text-[8.5px]"
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
