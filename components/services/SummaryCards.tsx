import type { ServiceGuide, SummaryCard } from "@/lib/service-charter";

function Card({ label, title, detail }: SummaryCard) {
  return (
    <div className="border border-[#E8EEF2] bg-[#F7FAFB] p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0591D4]">{label}</p>
      <h2 className="mt-2 font-heading text-lg font-semibold text-[#2A2A29]">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#2A2A29]/65">{detail}</p>
    </div>
  );
}

export default function SummaryCards({ guide }: { guide: ServiceGuide }) {
  const hasHighlights = Boolean(guide.highlights?.length);

  if (process.env.NODE_ENV === "development" && guide.pageType !== "informational" && !hasHighlights) {
    const missing = [
      !guide.fee?.trim() && "fee",
      !guide.time?.trim() && "time",
    ].filter(Boolean);

    if (missing.length > 0) {
      console.warn(`SummaryCards: transactional service "${guide.title}" is missing ${missing.join(" and ")} and has no highlights.`);
    }
  }

  const cards: SummaryCard[] = guide.pageType === "informational"
    ? guide.highlights
    : hasHighlights ? guide.highlights! : [
        {
          label: "Before you begin",
          title: "Prepare your request",
          detail: "Review the charter's requirements below before contacting Customer Service.",
        },
        { label: "Fees", title: "As listed in the charter", detail: guide.fee },
        { label: "Processing time", title: guide.time, detail: "Total shown in the 2025 Citizen's Charter." },
      ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => <Card key={card.title} {...card} />)}
    </div>
  );
}
