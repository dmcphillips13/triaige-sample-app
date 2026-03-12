"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/settings", label: "Settings" },
  { href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      data-testid="sidebar"
      style={{
        width: "var(--sidebar-width)",
        height: "100vh",
        backgroundColor: "#1e293b",
        padding: "var(--spacing-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xs)",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: 700,
          color: "#f8fafc",
          marginBottom: "var(--spacing-xl)",
          padding: "var(--spacing-sm)",
        }}
      >
        Acme Dashboard
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "var(--spacing-sm) var(--spacing-md)",
                borderRadius: "var(--radius-md)",
                color: isActive ? "#ffffff" : "#94a3b8",
                backgroundColor: isActive ? "var(--color-accent)" : "transparent",
                textDecoration: "none",
                fontSize: "var(--font-size-sm)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--spacing-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-sm)",
          }}
        >
          <div
            style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "var(--spacing-xs)",
            }}
          >
            Help & Support
          </div>
          <a href="#" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-sidebar)", textDecoration: "none" }}>
            Documentation
          </a>
          <a href="#" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-sidebar)", textDecoration: "none" }}>
            Contact Support
          </a>
          <a href="#" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-sidebar)", textDecoration: "none" }}>
            Keyboard Shortcuts
          </a>
          <div
            style={{
              marginTop: "var(--spacing-sm)",
              fontSize: "var(--font-size-xs)",
              color: "var(--color-text-secondary)",
            }}
          >
            v2.4.1
          </div>
        </div>
      </div>
    </aside>
  );
}
