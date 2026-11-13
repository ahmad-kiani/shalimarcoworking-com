import { montserrat } from "../fonts";

// Listicle pages use the ad pages' Montserrat for headings, close to the geometric sans of the advertorial they're modelled on.
export default function ListicleLayout({ children }: LayoutProps<"/pages">) {
  return <div className={`${montserrat.variable} bg-white`}>{children}</div>;
}
