import type { Metadata } from "next";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Board & Meetings",
  description:
    "TMCWD Board of Directors composition, meeting schedule, agendas, minutes, and resolutions.",
};

const boardMembers = [
  { name: "[Name]",  position: "Chairman",     appointedBy: "LWUA", term: "[Year]–[Year]" },
  { name: "[Name]",  position: "Vice-Chairman", appointedBy: "LWUA", term: "[Year]–[Year]" },
  { name: "[Name]",  position: "Member",        appointedBy: "LWUA", term: "[Year]–[Year]" },
  { name: "[Name]",  position: "Member",        appointedBy: "LWUA", term: "[Year]–[Year]" },
  { name: "[Name]",  position: "Member",        appointedBy: "LWUA", term: "[Year]–[Year]" },
];

const meetingRecords = [
  { date: "[DATE]", type: "Regular", agenda: "#", minutes: "#", resolutions: "#" },
  { date: "[DATE]", type: "Special", agenda: "#", minutes: "#", resolutions: "#" },
  { date: "[DATE]", type: "Regular", agenda: "#", minutes: "#", resolutions: "#" },
];

const thClass = "px-4 py-3 text-left text-xs font-semibold text-[#2A2A29]/50 uppercase tracking-wide border-b border-[#E8EEF2] bg-[#F7FAFB]";
const tdClass = "px-4 py-3 text-sm text-[#2A2A29] border-b border-[#E8EEF2]";

export default function BoardMeetingsPage() {
  return (
    <>
      <PageHeader
        title="Board & Meetings"
        description="The TMCWD Board of Directors is constituted and exercises its powers in accordance with Presidential Decree No. 198 and relevant LWUA regulations."
      >
        <Breadcrumb current="Board & Meetings" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Board of Directors */}
        <section aria-labelledby="board-heading">
          <h2 id="board-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-5">
            Board of Directors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Position</th>
                  <th className={thClass}>Appointed by</th>
                  <th className={thClass}>Term</th>
                </tr>
              </thead>
              <tbody>
                {boardMembers.map((m, i) => (
                  <tr key={i} className="hover:bg-[#F7FAFB] transition-colors">
                    <td className={`${tdClass} font-medium`}>{m.name}</td>
                    <td className={tdClass}>{m.position}</td>
                    <td className={tdClass}>{m.appointedBy}</td>
                    <td className={`${tdClass} text-[#2A2A29]/50 font-mono text-xs`}>{m.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#2A2A29]/40">
            Board members are appointed pursuant to P.D. 198, §11.
          </p>
        </section>

        {/* Meeting schedule */}
        <section aria-labelledby="schedule-heading">
          <h2 id="schedule-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-3">
            Meeting Schedule
          </h2>
          <div className="bg-[#F7FAFB] border-l-2 border-[#370A77] px-6 py-5 max-w-2xl text-sm text-[#2A2A29]/75">
            <p>
              Regular Board Meetings are held on{" "}
              <strong className="text-[#2A2A29]">[ADD: day of month]</strong> at{" "}
              <strong className="text-[#2A2A29]">[ADD: time]</strong>, at the TMCWD Main Office.
            </p>
            <p className="mt-2 text-[#2A2A29]/55">
              Special meetings may be called by the Chairman or upon written request of a
              majority of the Board.
            </p>
          </div>
        </section>

        {/* Agendas, minutes & resolutions */}
        <section aria-labelledby="records-heading">
          <h2 id="records-heading" className="font-heading text-lg font-semibold text-[#2A2A29] mb-1">
            Agendas, Minutes &amp; Resolutions
          </h2>
          <p className="text-sm text-[#2A2A29]/55 mb-6 max-w-2xl">
            Board documents are posted after approval at the succeeding regular meeting.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className={thClass}>Date</th>
                  <th className={thClass}>Type</th>
                  <th className={thClass}>Agenda</th>
                  <th className={thClass}>Minutes</th>
                  <th className={thClass}>Resolutions</th>
                </tr>
              </thead>
              <tbody>
                {meetingRecords.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F7FAFB] transition-colors">
                    <td className={`${tdClass} whitespace-nowrap font-mono text-xs`}>{r.date}</td>
                    <td className={tdClass}>{r.type}</td>
                    <td className={tdClass}>
                      <a href={r.agenda} className="text-[#0591D4] hover:underline text-xs font-medium">PDF ↓</a>
                    </td>
                    <td className={tdClass}>
                      <a href={r.minutes} className="text-[#0591D4] hover:underline text-xs font-medium">PDF ↓</a>
                    </td>
                    <td className={tdClass}>
                      <a href={r.resolutions} className="text-[#0591D4] hover:underline text-xs font-medium">PDF ↓</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
}
