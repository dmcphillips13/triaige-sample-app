type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
};

const statusColors: Record<Row["status"], { bg: string; color: string }> = {
  Active: { bg: "var(--color-success-bg)", color: "var(--color-success)" },
  Inactive: { bg: "var(--color-warning-bg)", color: "var(--color-warning)" },
  Suspended: { bg: "var(--color-error-bg)", color: "var(--color-error)" },
};

export default function DataTable({ rows }: { rows: Row[] }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {["Name", "Email", "Role", "Status", "Last Login"].map((col) => (
              <th
                key={col}
                style={{
                  textAlign: "left",
                  padding: "var(--spacing-md)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 600,
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <td style={{ padding: "var(--spacing-md)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                {row.name}
              </td>
              <td style={{ padding: "var(--spacing-md)", fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                {row.email}
              </td>
              <td style={{ padding: "var(--spacing-md)", fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                {row.role}
              </td>
              <td style={{ padding: "var(--spacing-md)" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "var(--spacing-xs) var(--spacing-sm)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 600,
                    backgroundColor: statusColors[row.status].bg,
                    color: statusColors[row.status].color,
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td style={{ padding: "var(--spacing-md)", fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                {row.lastLogin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
