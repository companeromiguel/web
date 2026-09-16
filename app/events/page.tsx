import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Recent events, programs, and activities conducted by the Trece Martires City Water District.",
};

interface Event {
  id: string;
  date: string;
  dateISO: string;
  category: "Community" | "Training" | "Program" | "Ceremony" | "Meeting";
  title: string;
  description: string;
  location: string;
}

const events: Event[] = [
  {
    id: "1",
    date: "September 5, 2026",
    dateISO: "2026-09-05",
    category: "Program",
    title: "Water Conservation Awareness Program",
    description:
      "TMCWD conducted a water conservation awareness program for residents of Barangay San Agustin, promoting responsible water use and leak reporting.",
    location: "Barangay San Agustin Covered Court, Trece Martires City",
  },
  {
    id: "2",
    date: "August 22, 2026",
    dateISO: "2026-08-22",
    category: "Training",
    title: "Staff Training on Water Quality Monitoring",
    description:
      "Technical staff attended a two-day training on updated water quality testing procedures in compliance with LWUA standards.",
    location: "TMCWD Training Room, Governor's Drive",
  },
  {
    id: "3",
    date: "August 12, 2026",
    dateISO: "2026-08-12",
    category: "Ceremony",
    title: "Blessing and Inauguration of New Water Facility",
    description:
      "A blessing and inauguration ceremony was held for the newly completed booster pump station serving Barangay Conchu and adjacent communities.",
    location: "Barangay Conchu, Trece Martires City",
  },
  {
    id: "4",
    date: "July 30, 2026",
    dateISO: "2026-07-30",
    category: "Community",
    title: "Free Leak Check and Pipe Inspection Drive",
    description:
      "TMCWD field teams conducted a free household leak check and pipe inspection drive across five barangays to help concessionaires reduce water wastage.",
    location: "Various Barangays, Trece Martires City",
  },
  {
    id: "5",
    date: "July 18, 2026",
    dateISO: "2026-07-18",
    category: "Meeting",
    title: "Board of Directors Regular Meeting — Q3 2026",
    description:
      "The Board of Directors convened for its third quarter regular meeting to review operational reports, financial performance, and upcoming infrastructure projects.",
    location: "TMCWD Board Room, Governor's Drive",
  },
  {
    id: "6",
    date: "June 25, 2026",
    dateISO: "2026-06-25",
    category: "Community",
    title: "Brigada Eskwela Water Station Setup",
    description:
      "In support of Brigada Eskwela, TMCWD donated and installed water stations in five public schools within the city's franchise area.",
    location: "Selected Public Schools, Trece Martires City",
  },
];

const categoryStyle: Record<Event["category"], string> = {
  Community: "bg-[#DEEEFA] text-[#0591D4]",
  Training:  "bg-[#e8f4f0] text-[#1a7a5a]",
  Program:   "bg-[#f0eefa] text-[#370A77]",
  Ceremony:  "bg-[#fff4e0] text-[#b06000]",
  Meeting:   "bg-[#D7CCCD] text-[#2A2A29]",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        description="Recent programs, activities, and milestones from the Trece Martires City Water District."
      >
        <Breadcrumb current="Events" />
      </PageHeader>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">

        {/* Timeline list */}
        <ol className="list-none p-0 space-y-5" aria-label="Events timeline">
          {events.map((event) => (
            <li key={event.id}>

              {/* Card */}
              <div className="rounded-2xl border border-[#E8EEF2] bg-white px-6 py-5 hover:border-[#A1CBE1] hover:shadow-sm transition-all duration-200">

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <time
                    dateTime={event.dateISO}
                    className="text-xs text-[#2A2A29]/40 tabular-nums"
                  >
                    {event.date}
                  </time>
                  <span
                    className={[
                      "text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full",
                      categoryStyle[event.category],
                    ].join(" ")}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-base font-semibold text-[#370A77] leading-snug mb-2">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-[#2A2A29]/65 leading-relaxed mb-3">
                  {event.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-[#2A2A29]/40">
                  <svg className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>{event.location}</span>
                </div>

                {/* Image placeholder — replace with <img> when photos are ready */}
                <div className="mt-4 w-full rounded-xl bg-[#EEF4F8] border border-dashed border-[#A1CBE1] h-40 flex flex-col items-center justify-center gap-1.5 text-[#A1CBE1]">
                  <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className="text-xs font-medium">Photo coming soon</span>
                </div>

              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs text-[#2A2A29]/35 text-center">
          For more updates, follow the{" "}
          <a
            href="https://www.facebook.com/tmcwdCMUHelpDesk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0591D4] hover:underline"
          >
            official TMCWD Facebook page
          </a>
          .
        </p>
      </div>
    </>
  );
}
