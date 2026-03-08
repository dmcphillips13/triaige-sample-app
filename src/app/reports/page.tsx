import Header from "@/components/header";
import ReportCard from "@/components/report-card";

const reports = [
  {
    title: "Q4 Revenue Summary",
    description: "Quarterly revenue breakdown by product line and region with year-over-year comparison.",
    date: "Dec 31, 2024",
    status: "Complete" as const,
  },
  {
    title: "User Growth Analysis",
    description: "Monthly active user trends and cohort retention analysis for the past 12 months.",
    date: "Jan 15, 2025",
    status: "Complete" as const,
  },
  {
    title: "Infrastructure Costs",
    description: "Cloud spend breakdown by service and environment with optimization recommendations.",
    date: "Feb 01, 2025",
    status: "In Progress" as const,
  },
  {
    title: "Security Audit",
    description: "Annual security assessment covering authentication, data handling, and compliance.",
    date: "Feb 15, 2025",
    status: "In Progress" as const,
  },
  {
    title: "Customer Satisfaction",
    description: "NPS survey results and customer feedback analysis from Q1 support interactions.",
    date: "Mar 01, 2025",
    status: "Pending" as const,
  },
  {
    title: "Performance Benchmarks",
    description: "Application performance metrics including response times, error rates, and throughput.",
    date: "Mar 15, 2025",
    status: "Pending" as const,
  },
];

export default function ReportsPage() {
  const complete = reports.filter((r) => r.status === "Complete").length;
  const inProgress = reports.filter((r) => r.status === "In Progress").length;
  const pending = reports.filter((r) => r.status === "Pending").length;

  return (
    <>
      <Header title="Reports" />
      <div style={{ padding: "var(--spacing-xl)" }}>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-lg)",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          {[
            { label: "Complete", count: complete, color: "var(--color-success)" },
            { label: "In Progress", count: inProgress, color: "var(--color-warning)" },
            { label: "Pending", count: pending, color: "var(--color-text-secondary)" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-md) var(--spacing-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-2xl)",
                  fontWeight: 700,
                  color: stat.color,
                }}
              >
                {stat.count}
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--spacing-lg)",
          }}
        >
          {reports.map((report) => (
            <ReportCard key={report.title} {...report} />
          ))}
        </div>
      </div>
    </>
  );
}
