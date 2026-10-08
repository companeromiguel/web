/**
 * Site-wide search index — fully client-safe, no server imports.
 * All data is inlined statically.
 */

export type SearchResultKind = "page" | "service" | "document" | "event";

export interface SearchResult {
  kind: SearchResultKind;
  title: string;
  description: string;
  href: string;
  group: string;
}

export const searchIndex: SearchResult[] = [
  /* ── Pages ────────────────────────────────────────────────────── */
  { kind: "page", title: "About Us",              description: "History, mission, vision, and people behind TMCWD",       href: "/about/",                    group: "Pages" },
  { kind: "page", title: "History",               description: "How TMCWD was established and key milestones since 1997", href: "/about/#history",             group: "Pages" },
  { kind: "page", title: "Mission & Vision",      description: "Mission, vision, and service pledge of TMCWD",            href: "/about/#mission-vision",      group: "Pages" },
  { kind: "page", title: "Board of Directors",    description: "Chairperson, members, and management officers",           href: "/about/#officers",            group: "Pages" },
  { kind: "page", title: "Transparency",          description: "Public documents, procurement, FOI, financial reports",   href: "/transparency/",              group: "Pages" },
  { kind: "page", title: "Transparency Seal",     description: "Budgets, financial statements, SALN certifications",      href: "/transparency/seal/",         group: "Pages" },
  { kind: "page", title: "Freedom of Information","description": "FOI manual, procedure, and requirements",               href: "/transparency/foi/",          group: "Pages" },
  { kind: "page", title: "Citizen's Charter",     description: "Service standards, turnaround times, complaints process", href: "/transparency/citizens-charter/", group: "Pages" },
  { kind: "page", title: "Procurement",           description: "Annual procurement plans and related documents",          href: "/transparency/procurement/",  group: "Pages" },
  { kind: "page", title: "Bidding",               description: "Bid opportunities, notices of award, notices to proceed", href: "/transparency/bidding/",      group: "Pages" },
  { kind: "page", title: "Announcements",         description: "Latest news, advisories, and service updates",            href: "/news/",                      group: "Pages" },
  { kind: "page", title: "Events",                description: "Community activities and milestones",                     href: "/events/",                    group: "Pages" },
  { kind: "page", title: "Gallery",               description: "Photos from TMCWD events and programs",                  href: "/gallery/",                   group: "Pages" },
  { kind: "page", title: "Contact",               description: "Office address, phone numbers, email, and map",          href: "/contact/",                   group: "Pages" },
  { kind: "page", title: "Water Quality",         description: "Consumer Confidence Reports and laboratory test results", href: "/water-quality/",             group: "Pages" },
  { kind: "page", title: "Board Meetings",        description: "Board of Directors meeting records",                      href: "/board-meetings/",            group: "Pages" },
  { kind: "page", title: "Online Bill Inquiry",   description: "Check and pay your water bill online",                   href: "/online-bill-inquiry/how-to-pay/", group: "Pages" },
  { kind: "page", title: "Statement of Account",  description: "View your Statement of Account (SOA)",                   href: "/online-bill-inquiry/soa/",   group: "Pages" },
  { kind: "page", title: "How to Pay Online",     description: "GCash step-by-step payment guide video",                 href: "/online-bill-inquiry/how-to-pay/", group: "Pages" },

  /* ── Services ─────────────────────────────────────────────────── */
  { kind: "service", title: "New Water Application",   description: "Apply for a new water connection",                 href: "/services/new-water-application/",    group: "Services" },
  { kind: "service", title: "Meter Reading & Statement", description: "How meter readings and statements are issued",   href: "/services/meter-reading/",            group: "Services" },
  { kind: "service", title: "Payment of Water Bill",   description: "Payment methods, schedules, and where to pay",    href: "/services/payment/",                  group: "Services" },
  { kind: "service", title: "Change Ball Valve",       description: "Request a ball valve replacement",                 href: "/services/change-ball-valve/",        group: "Services" },
  { kind: "service", title: "Leak Repair Request",     description: "Report and request repair of leaks",               href: "/services/leak-repair/",              group: "Services" },
  { kind: "service", title: "Water Supply Operation",  description: "Information on water supply and operations",       href: "/services/water-supply/",             group: "Services" },
  { kind: "service", title: "Temporary Disconnection", description: "Request a temporary disconnection of service",     href: "/services/temporary-disconnection/",  group: "Services" },
  { kind: "service", title: "Reconnection Service",    description: "Request reconnection after disconnection",         href: "/services/reconnection/",             group: "Services" },
  { kind: "service", title: "Change Name/Address",     description: "Update account name or address on record",         href: "/services/change-name-address/",      group: "Services" },
  { kind: "service", title: "Change Meter Request",    description: "Request a meter replacement",                      href: "/services/change-meter/",             group: "Services" },
  { kind: "service", title: "Senior Citizen Discount", description: "Water bill discount eligibility and application",  href: "/services/senior-citizen-discount/",  group: "Services" },
  { kind: "service", title: "Feedback & Complaints",   description: "File a feedback or complaint with the district",   href: "/services/feedback/",                 group: "Services" },

  /* ── Documents ────────────────────────────────────────────────── */
  { kind: "document", title: "Annual Budget — FY 2022",                       description: "Budgets",                   href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "First Supplemental Budget — FY 2024",          description: "Budgets",                   href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Second Supplemental Budget — FY 2024",         description: "Budgets",                   href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Financial Statements — 2015",                  description: "Financial statements",      href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Financial Statements — 2016",                  description: "Financial statements",      href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Financial Statements — 2017",                  description: "Financial statements",      href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Financial Statements — 2018",                  description: "Financial statements",      href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "Financial Statements — 2020",                  description: "Financial statements",      href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "SALN Certification — 2019",                    description: "SALN certifications",       href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "SALN Certification — 2025",                    description: "SALN certifications",       href: "/transparency/seal/",             group: "Documents" },
  { kind: "document", title: "FOI Manual",                                   description: "Freedom of Information",    href: "/transparency/foi/",              group: "Documents" },
  { kind: "document", title: "Citizen's Charter",                            description: "Service standards guide",   href: "/transparency/citizens-charter/", group: "Documents" },
  { kind: "document", title: "Annual Procurement Plan",                      description: "Procurement documents",     href: "/transparency/procurement/",      group: "Documents" },

  /* ── Events ───────────────────────────────────────────────────── */
  { kind: "event", title: "Disaster Preparedness and Awareness (2019)", description: "Fire drill and safety activities",              href: "/events/", group: "Events" },
  { kind: "event", title: "20th Founding Anniversary (2018)",           description: "Milestone celebration of TMCWD",                href: "/events/", group: "Events" },
  { kind: "event", title: "Water Safety Plan (2018)",                   description: "Water safety planning activities",               href: "/events/", group: "Events" },
  { kind: "event", title: "Elderly Physical Fitness (2015)",            description: "Community activity for senior citizens",         href: "/events/", group: "Events" },
  { kind: "event", title: "Clean and Green Program (2014)",             description: "Environmental program of TMCWD",                 href: "/events/", group: "Events" },
  { kind: "event", title: "World Water Day (2012)",                     description: "Celebrating the importance of water",            href: "/events/", group: "Events" },
];

export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return searchIndex
    .filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    )
    .slice(0, 12);
}
