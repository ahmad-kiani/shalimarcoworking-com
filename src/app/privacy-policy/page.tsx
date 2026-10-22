import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Shalimar Coworking",
  description:
    "What personal information Shalimar Coworking collects through this website, by email, WhatsApp and at our space, why we collect it, who we share it with and how long we keep it.",
};

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "what-we-collect", title: "What we collect and why" },
  { id: "cookies", title: "Cookies and browser storage" },
  { id: "sharing", title: "Who we share it with" },
  { id: "transfers", title: "Information processed outside Pakistan" },
  { id: "retention", title: "How long we keep it" },
  { id: "your-rights", title: "Your choices and rights" },
  { id: "complaints", title: "Complaints" },
  { id: "security", title: "How we protect it" },
  { id: "automated-decisions", title: "Automated decisions" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

function H2({ id }: { id: string }) {
  return <h2 id={id}>{sections.find((s) => s.id === id)!.title}</h2>;
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const Email = () => <a href={`mailto:${site.email}`}>{site.email}</a>;
const Phone = () => <a href={`tel:${site.phoneHref}`}>{site.phone}</a>;

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="22 October 2026">
      <div className="space-y-3 rounded-sm bg-sand/60 p-5 sm:p-6">
        <p className="font-semibold text-ink">In short</p>
        <ul>
          <li>This website has no accounts, no advertising, no analytics and no cookies of our own.</li>
          <li>
            We only receive personal information when you contact us, visit our space or become a member, and we use
            it to look after you.
          </li>
          <li>We never sell your information or use it for advertising.</li>
          <li>
            Questions or requests about your information: <Email /> or <Phone />.
          </li>
        </ul>
      </div>

      <p>
        This policy explains what personal information Shalimar Coworking (&ldquo;Shalimar&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects through this website, when you get in touch with us, when you visit our space and
        when you become a member. It explains why we collect it, who we share it with, how long we keep it and the
        choices you have.
      </p>

      <nav aria-label="On this page" className="rounded-sm border border-sand p-5 sm:p-6">
        <p className="font-semibold text-ink">On this page</p>
        <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 pl-5 sm:grid-cols-2">
          {sections.map((s) => (
            <li key={s.id} className="pl-1">
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <H2 id="who-we-are" />
      <p>
        Shalimar Coworking, {site.address[0]}, {site.address[1]}. Email <Email />, phone <Phone />.
      </p>
      <p>We decide how and why your personal information is used, and we&rsquo;re responsible for it.</p>

      <H2 id="what-we-collect" />
      <p>We only collect what we need. Here is what we collect, why, and the reason we&rsquo;re allowed to use it.</p>

      <h3>When you send the enquiry form</h3>
      <ul>
        <li>
          <strong>What:</strong> your name, company, email address, phone number, the workspace you&rsquo;re
          interested in and your message.
        </li>
        <li>
          <strong>Why:</strong> to reply to you, answer your questions and arrange a tour. We also send you a
          one-time confirmation email that we&rsquo;ve received your enquiry. It isn&rsquo;t marketing.
        </li>
        <li>
          <strong>Basis:</strong> you asked us to get in touch.
        </li>
      </ul>

      <h3>When you email, call or WhatsApp us</h3>
      <ul>
        <li>
          <strong>What:</strong> your contact details and whatever you choose to tell us. When you email{" "}
          <Email />, you receive a one-time automatic acknowledgement. Our WhatsApp buttons open a chat with a
          message already typed, for example the plan and price you were looking at. You can change it before
          sending.
        </li>
        <li>
          <strong>Why:</strong> to answer you and arrange tours, bookings and memberships.
        </li>
        <li>
          <strong>Basis:</strong> you contacted us.
        </li>
      </ul>

      <h3>When you visit our space</h3>
      <ul>
        <li>
          <strong>Visitor sign-in:</strong> your name, who you&rsquo;re visiting, and the date and time, so we know
          who is in the building.
        </li>
        <li>
          <strong>CCTV:</strong> cameras record parts of our space for the safety and security of members, guests
          and staff. Signs show where cameras are in use.
        </li>
        <li>
          <strong>Basis:</strong> keeping our space, members and guests safe and secure.
        </li>
      </ul>

      <h3>When you become a member</h3>
      <ul>
        <li>
          <strong>What:</strong> your name, contact details and company; a copy of your CNIC or passport; your
          membership details; and billing and payment records.
        </li>
        <li>
          <strong>Why:</strong> to confirm who you are, set up and manage your membership, give you access to the
          space, invoice you and keep the accounting records the law requires.
        </li>
        <li>
          <strong>Basis:</strong> our membership agreement with you, our legal and tax obligations, and keeping the
          space secure.
        </li>
      </ul>

      <h3>When you use our Wi-Fi</h3>
      <ul>
        <li>
          <strong>What:</strong> your login details and connection logs, such as device identifiers and connection
          times.
        </li>
        <li>
          <strong>Why:</strong> to give you access, keep the network running and protect it from misuse.
        </li>
        <li>
          <strong>Basis:</strong> providing the service you use, and keeping the network secure.
        </li>
      </ul>

      <h3>When you visit this website</h3>
      <ul>
        <li>
          <strong>What:</strong> technical information such as your IP address and browser type. Our host keeps
          short-lived logs of requests to the site. When you send the form, your IP address is used briefly to block
          spam and repeated submissions, and is recorded if our spam filter is triggered.
        </li>
        <li>
          <strong>Why:</strong> to deliver the website and keep it and the enquiry form secure.
        </li>
        <li>
          <strong>Basis:</strong> running a secure website.
        </li>
      </ul>

      <p>
        You don&rsquo;t have to give us any information. But without your name and an email address or phone number,
        we can&rsquo;t reply to an enquiry, and we need certain details before we can offer you a membership.
      </p>

      <H2 id="cookies" />
      <p>
        We don&rsquo;t set any cookies of our own. The website stores one small note in your browser&rsquo;s session
        storage so that the &ldquo;Chat with us&rdquo; greeting on the WhatsApp button appears only once per visit. It
        contains no personal information, isn&rsquo;t used for tracking and is deleted when you close the tab.
      </p>
      <p>
        The map on our home page is provided by Google. Google may set its own cookies when the map loads (see{" "}
        <a href="#sharing">who we share it with</a>).
      </p>

      <H2 id="sharing" />
      <p>We use a small number of trusted services to run the website and our business:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">What it does with your information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Ext href="https://vercel.com/legal/privacy-policy">Vercel</Ext>
              </td>
              <td>Hosts this website. It processes technical data and the content of forms you send, on our behalf.</td>
            </tr>
            <tr>
              <td>
                <Ext href="https://resend.com/legal/privacy-policy">Resend</Ext>
              </td>
              <td>
                Delivers enquiry form messages to our inbox and sends your confirmation email, on our behalf. It
                handles everything you enter in the form and keeps delivery logs for about 30 days.
              </td>
            </tr>
            <tr>
              <td>
                <Ext href="https://policies.google.com/privacy">Google Workspace</Ext>
              </td>
              <td>Our email. Enquiries and emails you send us are stored in our Google mailbox, on our behalf.</td>
            </tr>
            <tr>
              <td>
                <Ext href="https://policies.google.com/privacy">Google Maps</Ext>
              </td>
              <td>
                Shows the map on our home page. Your browser connects to Google as the page loads and the map appears
                as you scroll. Google uses this data under its own privacy policy.
              </td>
            </tr>
            <tr>
              <td>
                <Ext href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp</Ext>
              </td>
              <td>Carries chats you start with us. WhatsApp handles your messages under its own privacy policy.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        We may also share information with our accountants and professional advisers, and with authorities when the
        law requires it. We never sell your information or share it for advertising.
      </p>

      <H2 id="transfers" />
      <p>
        Some of these services store or process information outside Pakistan, mainly in the United States. Emails
        from our website are sent through Resend&rsquo;s servers in Japan, and its logs are kept in the United
        States. We choose established providers and rely on their contracts and security measures to protect your
        information.
      </p>

      <H2 id="retention" />
      <p>We keep information only as long as we need it, then delete it:</p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">How long</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enquiries that don&rsquo;t lead to a membership</td>
              <td>Up to 24 months</td>
            </tr>
            <tr>
              <td>Email delivery logs (Resend)</td>
              <td>About 30 days</td>
            </tr>
            <tr>
              <td>Visitor sign-in records</td>
              <td>12 months</td>
            </tr>
            <tr>
              <td>CCTV recordings</td>
              <td>30 days, unless needed to look into an incident</td>
            </tr>
            <tr>
              <td>Wi-Fi connection logs</td>
              <td>90 days</td>
            </tr>
            <tr>
              <td>Copies of member ID (CNIC or passport)</td>
              <td>Until your membership ends</td>
            </tr>
            <tr>
              <td>Membership agreements, invoices and payment records</td>
              <td>While you&rsquo;re a member, then 6 years, as Pakistan&rsquo;s tax law requires</td>
            </tr>
            <tr>
              <td>WhatsApp chats and emails</td>
              <td>As long as needed to help you, and for members, while you&rsquo;re a member</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2 id="your-rights" />
      <p>You can ask us to:</p>
      <ul>
        <li>show you the personal information we hold about you;</li>
        <li>correct anything that&rsquo;s wrong or out of date;</li>
        <li>delete your information;</li>
        <li>stop using your information for a particular purpose; you can object at any time;</li>
        <li>stop doing anything you previously agreed to.</li>
      </ul>
      <p>
        Email <Email /> or call <Phone />. We&rsquo;ll reply within one month, and we may ask you to confirm who you
        are first. Sometimes we must keep certain records by law, such as invoices for tax purposes. If so,
        we&rsquo;ll tell you.
      </p>

      <H2 id="complaints" />
      <p>
        If you&rsquo;re unhappy with how we&rsquo;ve handled your information, please contact us first and
        we&rsquo;ll do our best to put it right. Pakistan doesn&rsquo;t yet have a data protection authority. You can
        report the misuse of personal information to the National Cyber Crime Investigation Agency (NCCIA) under the
        Prevention of Electronic Crimes Act 2016. If you live in the European Union or the United Kingdom, you can
        also contact your local data protection authority.
      </p>

      <H2 id="security" />
      <p>
        The website and enquiry form use encrypted connections (HTTPS). Access to enquiries, member records, CCTV and
        Wi-Fi logs is limited to the people at Shalimar who need it, and we use established providers with strong
        security. No system is completely secure, but if something goes wrong, we&rsquo;ll act quickly and tell
        anyone affected when appropriate.
      </p>

      <H2 id="automated-decisions" />
      <p>
        We don&rsquo;t make decisions about you by automated means alone. Our spam filter only blocks automated
        form submissions.
      </p>

      <H2 id="children" />
      <p>
        Our services are for adults. We don&rsquo;t knowingly collect information from anyone under 18. If you
        think a child has given us their information, contact us and we&rsquo;ll delete it.
      </p>

      <H2 id="changes" />
      <p>
        If we change this policy, we&rsquo;ll update this page and the date at the top. If the changes are
        significant, we&rsquo;ll also tell our members by email.
      </p>

      <H2 id="contact" />
      <p>
        Shalimar Coworking, {site.address[0]}, {site.address[1]}
        <br />
        Email <Email />
        <br />
        Phone <Phone />
      </p>
    </LegalPage>
  );
}
