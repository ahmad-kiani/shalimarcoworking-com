import Image, { type StaticImageData } from "next/image";

// A space photo, or a garden-green placeholder panel when no photo is set.
export default function Photo({
  label,
  image,
  alt,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 82vw",
  className = "",
}: {
  label: string;
  image?: StaticImageData;
  alt?: string;
  sizes?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <Image src={image} alt={alt ?? label} fill sizes={sizes} placeholder="blur" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${label} (photo coming soon)`}
      className={`jali relative flex items-end overflow-hidden bg-linear-to-br from-garden to-garden-deep ${className}`}
    >
      <span className="m-4 rounded-sm bg-black/25 px-2.5 py-1 text-[11px] tracking-[0.18em] text-cream/80 uppercase">
        Photo · {label}
      </span>
    </div>
  );
}
