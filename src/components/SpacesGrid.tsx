import Image from "next/image";
import { spaces } from "@/content/site";
import ScrollArea from "./ScrollArea";

// Phones: a swipe row where the next card peeks in. Tablets: 2×2. Laptops and up, and phones held sideways: all four
// side by side (sideways, the photos are shorter so a title still shows under them).
export default function SpacesGrid() {
  return (
    <ScrollArea
      as="ul"
      label="Spaces"
      className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 sm:short:grid-cols-4 sm:short:gap-x-4 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
    >
      {spaces.items.map((space) => (
        <li key={space.name} className="group w-[82%] shrink-0 snap-start max-[359px]:w-[86%] min-[520px]:w-[64%] max-sm:short:w-[42%] sm:w-auto">
          <div className="relative aspect-[4/3.4] overflow-hidden bg-sand short:aspect-[4/3]">
            <Image
              src={space.image}
              alt={space.name}
              fill
              // From 1920 the whole layout scales with the screen, so the cards keep growing (about 15vw).
              sizes="(min-width: 1920px) 15vw, (min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 82vw"
              // Mouse/trackpad only: the photo eases in slightly inside its frame while the card is hovered.
              className="object-cover transition-[scale] duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <div className="mt-5 flex flex-col items-start gap-1">
            <h3 className="font-serif text-3xl short:text-2xl lg:text-[1.75rem]">{space.name}</h3>
            <span className="text-xs font-medium tracking-[0.2em] text-brass-dark uppercase">{space.meta}</span>
          </div>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{space.body}</p>
        </li>
      ))}
    </ScrollArea>
  );
}
