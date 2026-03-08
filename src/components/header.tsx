export default function Header({ title }: { title: string }) {
  return (
    <header
      data-testid="header"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--color-bg-header)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--spacing-xl)",
      }}
    >
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
