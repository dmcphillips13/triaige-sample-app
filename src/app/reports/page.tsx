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
  return (
    <>
      <Header title="Reports" />
      <div style={{ padding: "var(--spacing-xl)" }}>
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
