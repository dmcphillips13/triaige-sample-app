export default function Header({ title }: { title: string }) {
  return (
    <header
      data-testid="header"
      style={{
        height: "96px",
        backgroundColor: "var(--color-bg-header)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--spacing-xl)",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "var(--font-size-xl)",
            fontWeight: 600,
            margin: 0,
            color: "var(--color-text-header)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-xs)",
            color: "var(--color-text-secondary)",
            margin: "4px 0 0 0",
          }}
        >
          Acme Dashboard — Internal Tools
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-header)",
          }}
        >
          admin@acme.com
        </span>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "var(--font-size-sm)",
            fontWeight: 600,
          }}
        >
          A
        </div>
      </div>
    </header>
  );
}
