export default function KpiCard({
  title,
  value,
  change,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-lg)",
        boxShadow: "var(--shadow-sm)",
        flex: "1 1 0",
        minWidth: "200px",
      }}
    >
      <div
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--spacing-sm)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "var(--font-size-3xl)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: "var(--spacing-sm)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "var(--font-size-sm)",
          color: trend === "up" ? "var(--color-success)" : "var(--color-error)",
          fontWeight: 500,
        }}
      >
        {trend === "up" ? "\u2191" : "\u2193"} {change}
      </div>
    </div>
  );
}
