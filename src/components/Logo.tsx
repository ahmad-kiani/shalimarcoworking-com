import Mark from "./Mark";

// Lockup: the three-diamond mark, a hairline divider, then the wordmark in Libre Baskerville.
// "COWORKING" is spread letter by letter so it spans exactly the width of "Shalimar".
export default function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`flex items-center ${large ? "gap-4 sm:gap-5" : "gap-2.5 min-[360px]:gap-3"}`}>
      <Mark className={`w-auto shrink-0 text-brass ${large ? "h-9 sm:h-12" : "h-7 lg:h-8"}`} />
      <span aria-hidden="true" className={`w-px self-stretch bg-current opacity-25 ${large ? "my-1" : "my-1.5"}`} />
      <span className="inline-grid leading-none">
        <span className={`font-logo ${large ? "text-[2rem] min-[360px]:text-4xl sm:text-5xl" : "text-[1.5rem] lg:text-[1.625rem]"}`}>Shalimar</span>
        <span
          aria-hidden="true"
          className={`flex justify-between font-sans font-semibold text-brass ${
            large ? "mt-2 text-[0.625rem] sm:mt-2.5 sm:text-xs" : "mt-1.5 text-[max(0.5rem,8px)] lg:text-[max(0.53125rem,8px)]"
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
