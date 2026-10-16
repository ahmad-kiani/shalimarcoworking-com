import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Shalimar Coworking",
  description: "How Shalimar Coworking handles the personal information you share with us.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="16 October 2026">
      <p>
        This policy explains what personal information Shalimar Coworking (&ldquo;Shalimar&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects through this website and when you get in touch with us, how we use it, and the choices
        you have.
      </p>

      <h2>Who we are</h2>
      <p>
        Shalimar Coworking, {site.address[0]}, {site.address[1]}. You can reach us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        This website has no accounts, no advertising and no analytics, and we don&rsquo;t set cookies of our own. We
        only receive personal information when you choose to contact us:
      </p>
      <ul>
        <li>
          <strong>Enquiry form.</strong> When you send the enquiry form, the details you enter come straight to our
          email. This can include your name, company, email address, phone number, the workspace you&rsquo;re interested
          in and your message.
        </li>
        <li>
          <strong>Email and phone.</strong> Anything you include when you email or call us.
        </li>
        <li>
          <strong>Members.</strong> If you become a member, the details needed to set up and manage your membership and
          payments.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and arrange a tour.</li>
        <li>To set up, manage and bill your membership.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>
      <p>We don&rsquo;t sell your information or use it for advertising.</p>

      <h2>Third-party services</h2>
      <ul>
        <li>
          <strong>Hosting.</strong> The website is hosted by Vercel. Like any web host, it processes technical data
          such as your IP address and browser type to deliver the site and keep it secure.
        </li>
        <li>
          <strong>Google Maps.</strong> The map on our home page is provided by Google. When it loads, Google may
          collect data and set cookies under the{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Email.</strong> Enquiry forms and emails you send us are delivered to and stored by our email
          provider.
        </li>
        <li>
          <strong>WhatsApp.</strong> The WhatsApp, Book a tour and pricing buttons open a chat with us in WhatsApp. Messages you send there are
          handled by WhatsApp under the{" "}
          <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            WhatsApp Privacy Policy
          </a>
          .
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as we need them to respond and follow up, and member records for as long as
        your membership lasts and our legal and accounting obligations require.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to show you, correct or delete the personal information we hold about you by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Children</h2>
      <p>Our services are for working professionals. We don&rsquo;t knowingly collect information from children.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we&rsquo;ll update it on this page along with the date above.</p>
    </LegalPage>
  );
}
