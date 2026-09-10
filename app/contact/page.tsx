import type { Metadata } from "next";
import Link from "next/link";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Contact & Service Area",
  description:
    "Contact the Trece Martires City Water District — office address, telephone numbers, email, and service area coverage.",
};

const departments = [
  { department: "Customer Service",      contact: "[ADD phone/email]" },
  { department: "Billing & Collection",  contact: "[ADD phone/email]" },
  { department: "New Connections",       contact: "[ADD phone/email]" },
  { department: "Emergency / Leaks",     contact: "[ADD 24-hr hotline]" },
  { department: "FOI Receiving Officer", contact: "[ADD name and email]" },
];

const serviceArea: string[] = [
  "[Barangay 1]",
  "[Barangay 2]",
  "[Barangay 3]",
  "[Barangay 4]",
  "[Barangay 5]",
  "[ADD remaining barangays]",
];

const thClass = "px-4 py-3 text-left text-xs font-semibold text-[#2A2A29]/50 uppercase tracking-wide border-b border-[#E8EEF2] bg-[#F7FAFB]";
const tdClass = "px-4 py-3 text-sm text-[#2A2A29] border-b border-[#E8EEF2]";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact & Service Area"
        description="Get in touch with TMCWD or verify whether your barangay is within our service franchise area."
      >
        <Breadcrumb current="Contact" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Office + Map */}
        <section aria-labelledby="office-heading">
          <h2 id="office-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-6">
            Main Office
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Contact card */}
            <div className="bg-[#F7FAFB] border border-[#E8EEF2] p-6">
              <address className="not-italic text-sm text-[#2A2A29] space-y-2">
                <p className="font-medium">[ADD: Street address]</p>
                <p className="text-[#2A2A29]/60">Trece Martires City, Cavite</p>
                <div className="pt-2 space-y-1.5">
                  <p>
                    <span className="text-[#2A2A29]/45 text-xs mr-1.5">Tel</span>
                    <a href="tel:+63464191234" className="hover:text-[#0591D4] transition-colors">
                      (046) 419-1234
                    </a>
                  </p>
                  <p>
                    <span className="text-[#2A2A29]/45 text-xs mr-1.5">Email</span>
                    <a href="mailto:info@tmcwd.gov.ph" className="text-[#0591D4] hover:underline">
                      info@tmcwd.gov.ph
                    </a>
                  </p>
                  <p>
                    <span className="text-[#2A2A29]/45 text-xs mr-1.5">Fax</span>
                    <span className="text-[#2A2A29]/55">[ADD: fax number]</span>
                  </p>
                </div>
              </address>
              <div className="mt-4 pt-4 border-t border-[#E8EEF2] text-xs text-[#2A2A29]/50">
                <p>Office hours: Monday – Friday, 8:00 AM – 5:00 PM</p>
                <p className="mt-0.5">Closed on official public holidays.</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#F7FAFB] border border-[#E8EEF2] flex flex-col">
              <div className="flex-1 min-h-52 flex items-center justify-center text-xs text-[#2A2A29]/35">
                {/*
                  Replace with a static map image (<Image>) or an <iframe> embed.
                  For a static export, a Mapbox Static Image or Google Maps embed via
                  iframe both work; avoid Next.js Image optimization (unoptimized is set).
                */}
                [ADD: Map image or iframe embed]
              </div>
              <div className="px-5 py-3 border-t border-[#E8EEF2]">
                <a
                  href="https://maps.google.com/?q=Trece+Martires+City+Water+District"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0591D4] hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Department contacts */}
        <section aria-labelledby="departments-heading">
          <h2 id="departments-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-5">
            Department Contacts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>Department</th>
                  <th className={thClass}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.department} className="hover:bg-[#F7FAFB] transition-colors">
                    <td className={`${tdClass} font-medium`}>{d.department}</td>
                    <td className={`${tdClass} text-[#2A2A29]/55`}>{d.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Service area */}
        <section aria-labelledby="service-area-heading">
          <h2 id="service-area-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-2">
            Service Area
          </h2>
          <p className="text-sm text-[#2A2A29]/55 mb-6 max-w-2xl">
            TMCWD provides water service to the following barangays in Trece Martires City,
            Cavite, under its LWUA-granted franchise.
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 list-none p-0">
            {serviceArea.map((brgy) => (
              <li key={brgy} className="text-sm text-[#2A2A29] bg-[#F7FAFB] border border-[#E8EEF2] px-3 py-2">
                {brgy}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#2A2A29]/40">
            Unsure if your property is covered? Contact our Customer Service department.
          </p>
        </section>

        {/* Feedback */}
        <section aria-labelledby="feedback-heading" className="bg-[#F7FAFB] border-l-2 border-[#0591D4] px-6 py-5 max-w-2xl">
          <h2 id="feedback-heading" className="font-heading text-base font-semibold text-[#2A2A29] mb-2">
            Feedback &amp; Complaints
          </h2>
          <p className="text-sm text-[#2A2A29]/65 leading-relaxed">
            Submit feedback in person, by email, or by phone. All complaints are logged
            and handled per TMCWD&apos;s Citizen&apos;s Charter.{" "}
            <Link href="/transparency/#citizens-charter" className="text-[#0591D4] hover:underline">
              View the Citizen&apos;s Charter →
            </Link>
          </p>
        </section>

      </div>
    </>
  );
}
