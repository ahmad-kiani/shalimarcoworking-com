// Stand-in for a real photo: a garden-green panel with a lattice pattern.
export default function Photo({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} (photo coming soon)`}
      className={`jali relative flex items-end overflow-hidden bg-linear-to-br from-garden to-garden-deep ${className}`}
    >
      <span className="m-4 rounded-sm bg-black/25 px-2.5 py-1 text-[0.6875rem] tracking-[0.18em] text-cream/80 uppercase">
        Photo · {label}
      </span>
    </div>
  );
}
