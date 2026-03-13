type ReportStatus = "Complete" | "In Progress" | "Pending";

const statusColors: Record<ReportStatus, { bg: string; color: string }> = {
  Complete: { bg: "var(--color-success-bg)", color: "var(--color-success)" },
  "In Progress": { bg: "var(--color-warning-bg)", color: "var(--color-warning)" },
  Pending: { bg: "var(--color-error-bg)", color: "var(--color-error)" },
};

export default function ReportCard({
  title,
  description,
  date,
  status,
}: {
  title: string;
  description: string;
  date: string;
  status: ReportStatus;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "0",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h3
          style={{
            fontSize: "var(--font-size-base)",
            fontWeight: 600,
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </h3>
        <span
          style={{
            display: "inline-block",
            padding: "var(--spacing-xs) var(--spacing-sm)",
            borderRadius: "var(--radius-full)",
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            backgroundColor: statusColors[status].bg,
            color: statusColors[status].color,
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      </div>
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
      <div
        style={{
          fontSize: "var(--font-size-xs)",
          color: "var(--color-text-secondary)",
          marginTop: "auto",
        }}
      >
        {date}
      </div>
    </div>
  );
}
