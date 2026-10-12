// Text wordmark until the real Shalimar logo arrives.
export default function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className={`font-serif ${large ? "text-6xl" : "text-[28px] lg:text-[32px]"}`}>Shalimar</span>
      <span
        className={`font-sans font-medium tracking-[0.42em] text-brass uppercase ${
          large ? "mt-2 text-xs" : "mt-0.5 text-[9px]"
        }`}
      >
        Coworking
      </span>
    </span>
  );
}
