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
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-sidebar)",
        padding: "var(--spacing-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xs)",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          fontSize: "var(--font-size-xl)",
          fontWeight: 700,
          color: "var(--color-text-sidebar-active)",
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
                color: isActive ? "var(--color-text-sidebar-active)" : "var(--color-text-sidebar)",
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
    </aside>
  );
}
