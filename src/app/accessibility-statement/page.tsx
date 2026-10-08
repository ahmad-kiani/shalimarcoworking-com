import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility Statement | Shalimar Coworking",
  description: "Shalimar Coworking's commitment to an accessible website and how to reach us if something doesn't work for you.",
};

export default function AccessibilityStatement() {
  return (
    <LegalPage title="Accessibility Statement" updated="8 October 2026">
      <p>
        Shalimar Coworking wants everyone to be able to find out about our space and get in touch with us, whatever
        device or assistive technology they use. We aim for this website to meet the{" "}
        <a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">
          Web Content Accessibility Guidelines (WCAG) 2.1
        </a>{" "}
        at level AA.
      </p>

      <h2>What we&rsquo;ve done</h2>
      <ul>
        <li>The layout adapts to any screen size, from small phones to large desktops, without sideways scrolling.</li>
        <li>Pages can be navigated with a keyboard, and headings follow a logical order for screen readers.</li>
        <li>Text and buttons use strong colour contrast against their backgrounds.</li>
        <li>Buttons and links are large enough to tap easily on touch screens.</li>
        <li>Every form field has a visible label, and fields bring up the right keyboard on phones.</li>
        <li>Moving content, such as the scrolling banner, stops if your device is set to reduce motion.</li>
        <li>Icons are decorative only. All information is also given as text.</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        The map on our home page is provided by Google and may not work fully with every assistive technology. Our
        address is always shown as text next to the map, with a link to directions.
      </p>

      <h2>Visiting us</h2>
      <p>
        If you have accessibility needs for your visit, please let us know before your tour and we&rsquo;ll do our best
        to help.
      </p>

      <h2>Feedback</h2>
      <p>
        If anything on this website is hard to use, or you need information in another format, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
        We&rsquo;ll get back to you as soon as we can.
      </p>
    </LegalPage>
  );
}
