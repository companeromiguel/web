export interface Alert {
  id: string;
  level: "info" | "warning" | "advisory";
  message: string;
  href?: string;
}

// ── Replace with real data or leave empty to hide ─────────────
const alerts: Alert[] = [];
// ──────────────────────────────────────────────────────────────

const levelAccent: Record<Alert["level"], string> = {
  info:     "border-l-[#0591D4] bg-[#F0F8FE]",
  warning:  "border-l-amber-400  bg-amber-50",
  advisory: "border-l-[#D7CCCD] bg-[#FAF8F8]",
};

const levelDot: Record<Alert["level"], string> = {
  info:     "bg-[#0591D4]",
  warning:  "bg-amber-400",
  advisory: "bg-[#A1CBE1]",
};

export default function AlertBanner() {
  if (alerts.length === 0) return null;

  return (
    <div role="region" aria-label="Service alerts">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={[
            "border-l-4 px-4 py-2.5 text-sm text-[#2A2A29]",
            levelAccent[alert.level],
          ].join(" ")}
        >
          <div className="mx-auto max-w-7xl flex items-center gap-3">
            <span
              className={["size-1.5 rounded-full shrink-0", levelDot[alert.level]].join(" ")}
              aria-hidden="true"
            />
            <p className="flex-1 leading-snug">{alert.message}</p>
            {alert.href && (
              <a
                href={alert.href}
                className="shrink-0 text-[#0591D4] text-xs font-medium hover:underline whitespace-nowrap"
              >
                Details →
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
