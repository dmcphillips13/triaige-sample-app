import Header from "@/components/header";
import KpiCard from "@/components/kpi-card";

const kpis = [
  { title: "Total Users", value: "12,847", change: "+12.5% from last month", trend: "up" as const },
  { title: "Revenue", value: "$48,352", change: "+8.2% from last month", trend: "up" as const },
  { title: "Active Sessions", value: "1,429", change: "-3.1% from last hour", trend: "down" as const },
  { title: "Error Rate", value: "0.12%", change: "-0.03% from yesterday", trend: "down" as const },
];

export default function OverviewPage() {
  return (
    <>
      <Header title="Overview" />
      <div style={{ padding: "var(--spacing-xl)" }}>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-lg)",
            flexWrap: "wrap",
          }}
        >
          {kpis.map((kpi) => (
            <KpiCard key={kpi.title} {...kpi} />
          ))}
        </div>
      </div>
    </>
  );
}
