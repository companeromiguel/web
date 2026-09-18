import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import AnnouncementHero from "@/components/layout/AnnouncementHero";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";

export const metadata: Metadata = {
  title: "Contact & Service Area",
  description: "Contact Trece Martires City Water District by telephone or email, find its office, and inquire about water services and connection availability.",
};

// Published agency contacts, checked September 18, 2026:
// https://tmcwaterdistrict.weebly.com/contact-us.html (contact-info.jpg)
// https://tmcwaterdistrict.weebly.com/transparency-seal2.html
const phoneNumbers = [
  { label: "(046) 419-2665", href: "tel:+63464192665" },
  { label: "(046) 419-0054", href: "tel:+63464190054" },
  { label: "(046) 419-2664", href: "tel:+63464192664" },
  { label: "(046) 419-0378", href: "tel:+63464190378" },
];
const emails = ["tmcwd@yahoo.com", "tmcwd@gmail.com"];
const inquiries = [
  { title: "Billing & account inquiries", description: "For questions about a water bill or account, contact the office using the telephone numbers or email addresses above.", href: "mailto:tmcwd@yahoo.com", action: "Email the office" },
  { title: "Leaks & water service concerns", description: "Report the location and a nearby landmark, and describe the leak or water supply concern when contacting the office.", href: "tel:+63464192665", action: "Call the office" },
  { title: "Freedom of Information", description: "Read the district’s FOI manual for the procedure and requirements for requesting public records.", href: "/transparency/foi/", action: "View FOI information" },
];
const panelClass = "rounded-2xl border border-[#C4DAE7] bg-white p-6 shadow-[0_8px_24px_rgba(35,82,110,0.10)] sm:p-8";
const linkClass = "text-[#087FB8] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087FB8]";

export default function ContactPage() {
  return <>
    <AnnouncementHero slug="contact" eyebrow="Get in touch" title="Contact & Service Area"
      description="Reach our office for water service inquiries, account concerns, and assistance with your connection."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
    <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
      <TransparencyWaveBackground animated />
      <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <section aria-labelledby="office-heading">
          <h2 id="office-heading" className="mb-6 font-heading text-2xl font-semibold text-[#087FB8]">Visit or contact our office</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={panelClass}>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 shrink-0 text-[#087FB8]" size={22} aria-hidden="true" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#087FB8]">Trece Martires City Water District</h3>
                  <address className="mt-2 text-sm not-italic leading-7 text-[#52616B]">Barangay San Agustin<br />Trece Martires City, Cavite</address>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4 border-t border-[#E0EBF2] pt-6">
                <Phone className="mt-1 shrink-0 text-[#087FB8]" size={22} aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-[#294C61]">Telephone</h3>
                  <ul className="mt-3 grid list-none gap-x-8 gap-y-3 p-0 text-sm sm:grid-cols-2">
                    {phoneNumbers.map((phone) => <li key={phone.href}><a href={phone.href} className={linkClass}>{phone.label}</a></li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4 border-t border-[#E0EBF2] pt-6">
                <Mail className="mt-1 shrink-0 text-[#087FB8]" size={22} aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#294C61]">Email</h3>
                  <ul className="mt-3 list-none space-y-3 p-0 text-sm">
                    {emails.map((email) => <li key={email}><a href={`mailto:${email}`} className={`${linkClass} break-words`}>{email}</a></li>)}
                  </ul>
                </div>
              </div>
              <p className="mt-6 rounded-xl bg-[#F1F7FA] p-4 text-sm leading-6 text-[#52616B]">Planning a visit? Contact the office to confirm its current schedule and the requirements for your transaction.</p>
            </div>
            <div className="flex flex-col overflow-hidden rounded-2xl border border-[#C4DAE7] bg-white shadow-[0_8px_24px_rgba(35,82,110,0.10)]">
              <iframe title="Trece Martires City Water District office location" src="https://maps.google.com/maps?cid=10092507030261381943&output=embed" width="100%" height="420" className="min-h-72 flex-1 border-0" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              <div className="border-t border-[#E0EBF2] p-5">
                <a href="https://www.google.com/maps?cid=10092507030261381943" target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2 text-sm font-semibold`}>Open in Google Maps <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="inquiries-heading">
          <h2 id="inquiries-heading" className="mb-6 font-heading text-2xl font-semibold text-[#087FB8]">How can we help?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {inquiries.map((item) => <article key={item.title} className={`${panelClass} flex flex-col`}>
              <h3 className="font-heading text-lg font-semibold text-[#087FB8]">{item.title}</h3>
              <p className="mb-6 mt-3 text-sm leading-7 text-[#52616B]">{item.description}</p>
              <Link href={item.href} className={`${linkClass} mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold`}>{item.action} <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </article>)}
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="service-area-heading" className={panelClass}>
            <h2 id="service-area-heading" className="font-heading text-xl font-semibold text-[#087FB8]">Check connection availability</h2>
            <p className="mt-3 text-sm leading-7 text-[#52616B]">For a property in Trece Martires City, contact the office with your barangay, subdivision or street, and a nearby landmark to ask whether a water connection is available at your address.</p>
            <p className="mt-3 text-sm leading-7 text-[#52616B]">Availability should be confirmed for the specific property before applying.</p>
            <a href="mailto:tmcwd@yahoo.com?subject=Water%20connection%20availability%20inquiry" className={`${linkClass} mt-5 inline-flex items-center gap-2 text-sm font-semibold`}>Ask about your address <ArrowUpRight size={16} aria-hidden="true" /></a>
          </section>
          <section aria-labelledby="feedback-heading" className={panelClass}>
            <h2 id="feedback-heading" className="font-heading text-xl font-semibold text-[#087FB8]">Feedback & complaints</h2>
            <p className="mt-3 text-sm leading-7 text-[#52616B]">Contact the office by telephone, email, or in person to raise a concern. Include a clear description and your preferred contact details for a reply.</p>
            <Link href="/transparency/citizens-charter/" className={`${linkClass} mt-5 inline-flex items-center gap-2 text-sm font-semibold`}>View the Citizen&apos;s Charter <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </section>
        </div>
      </div>
    </div>
  </>;
}
