import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { site, whatsapp, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility Statement | Shalimar Coworking",
  description:
    "How accessible the Shalimar Coworking website is, what we've done, known limitations, access at our space and how to get help or give feedback.",
};

const PREPARED = "22 October 2026";
const TESTED = "22 October 2026";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const Email = () => <a href={`mailto:${site.email}`}>{site.email}</a>;
const Phone = () => <a href={`tel:${site.phoneHref}`}>{site.phone}</a>;

export default function AccessibilityStatement() {
  return (
    <LegalPage title="Accessibility Statement" updated={PREPARED}>
      <p>
        Shalimar Coworking wants everyone to be able to find out about our space and get in touch with us, whatever
        device, browser or assistive technology they use. This statement covers this website, including the home
        page, the <Link href="/privacy-policy">Privacy Policy</Link> and this page.
      </p>

      <h2>Conformance status</h2>
      <p>
        We aim to meet the{" "}
        <Ext href="https://www.w3.org/TR/WCAG22/">Web Content Accessibility Guidelines (WCAG) 2.2</Ext> at level
        AA, the international standard for accessible websites. We follow it voluntarily.
      </p>
      <p>
        This website is <strong>partially conformant</strong> with WCAG 2.2 level AA. This means most of the site
        meets the standard, with a few exceptions that are outside our control. They are listed under{" "}
        <a href="#limitations">known limitations</a>.
      </p>

      <h2>What we&rsquo;ve done</h2>
      <h3>Moving content</h3>
      <ul>
        <li>The background video and the scrolling banner have a pause button, so you can stop them at any time.</li>
        <li>If your device is set to reduce motion, they don&rsquo;t move at all.</li>
      </ul>
      <h3>Keyboard and navigation</h3>
      <ul>
        <li>A &ldquo;Skip to content&rdquo; link lets keyboard users jump past the menu.</li>
        <li>
          Everything works with a keyboard, including the menu, the &ldquo;Interested in&rdquo; list (arrow keys, or
          type to jump to an option) and the pricing switches (arrow keys).
        </li>
        <li>Every link, button and form field shows a clear outline when it has keyboard focus.</li>
        <li>Pages use headings in a logical order and clearly marked page regions for screen readers.</li>
      </ul>
      <h3>Seeing and reading</h3>
      <ul>
        <li>
          Text has strong colour contrast against its background, and form fields and switches have clearly visible
          edges.
        </li>
        <li>
          The layout adapts to any screen, from small phones to large desktops, and you can zoom to 400% without
          scrolling sideways.
        </li>
        <li>Icons are decorative. All information is also given as text.</li>
        <li>
          Discounted prices are read out as &ldquo;was&rdquo; and &ldquo;now&rdquo;, not shown only as crossed-out
          text.
        </li>
      </ul>
      <h3>Forms</h3>
      <ul>
        <li>Every field has a visible label, and required fields are clearly marked.</li>
        <li>If something needs fixing, the message says which field, and screen readers announce it.</li>
        <li>Screen readers announce when your enquiry is being sent and when it has been received.</li>
        <li>Fields support autofill and bring up the right keyboard on phones.</li>
      </ul>
      <h3>Touch</h3>
      <ul>
        <li>Buttons and links are large enough to tap easily. Most are at least 44 pixels high.</li>
      </ul>
      <p>We don&rsquo;t use accessibility overlay widgets. We build accessibility into the site itself.</p>

      <h2 id="limitations">Known limitations and alternatives</h2>
      <ul>
        <li>
          <strong>Google Maps:</strong> the map on our home page comes from Google and may not work fully with screen
          readers or keyboards. Our address is always shown as text next to it, with a &ldquo;Get directions&rdquo;
          link.
        </li>
        <li>
          <strong>WhatsApp:</strong> chats take place in the WhatsApp app, which we don&rsquo;t control. You can also
          reach us by phone or email.
        </li>
        <li>
          <strong>Phone and email links:</strong> these open your device&rsquo;s phone or email app. Our number and
          address are always shown as text, so you can use them however suits you.
        </li>
      </ul>

      <h2>Compatibility</h2>
      <p>
        The website is designed to work with current versions of Chrome, Safari, Firefox and Edge on computers,
        phones and tablets, and with screen readers, screen magnifiers, browser zoom and keyboard-only use. It uses
        HTML, CSS, JavaScript and WAI-ARIA, and needs JavaScript for the enquiry form.
      </p>

      <h2>How we tested this website</h2>
      <p>
        Our web team assessed the website itself. We used automated checks (axe-core), then tested by hand with a
        keyboard only, with browser zoom up to 400%, on screen sizes from small phones to 4K displays, and with a
        screen reader. The website was last tested on {TESTED}.
      </p>

      <h2>Visiting our space</h2>
      <p>
        Shalimar is on Floor 1 of ATS Centre, Blue Area, Islamabad, and can be reached by lift or stairs. If you have
        any access needs, for example help on arrival or a particular room for a meeting, please tell us before your
        visit and we&rsquo;ll do our best to help.
      </p>

      <h2>Feedback and other formats</h2>
      <p>
        If anything on this website is hard to use, or you need information in a different format, please tell us:
      </p>
      <ul>
        <li>
          Email: <Email />
        </li>
        <li>
          Phone: <Phone />
        </li>
        <li>
          WhatsApp: <Ext href={whatsappLink()}>{whatsapp.display}</Ext>
        </li>
      </ul>
      <p>
        It helps to tell us which page you were on, what the problem was and which device or assistive technology
        you were using. We&rsquo;ll acknowledge your message within 2 working days and reply in full within 5
        working days.
      </p>

      <h2>If you&rsquo;re not happy with our response</h2>
      <p>
        Ask us to pass your feedback to our manager, who will review it and get back to you.
      </p>

      <h2>About this statement</h2>
      <p>
        This statement was prepared on {PREPARED} and last reviewed on {PREPARED}. We&rsquo;ll update it whenever we
        make significant changes to the website.
      </p>
    </LegalPage>
  );
}
