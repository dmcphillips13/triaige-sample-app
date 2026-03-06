"use client";

import Header from "@/components/header";
import { TextField, SelectField, ToggleField, TextAreaField } from "@/components/form-field";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div style={{ padding: "var(--spacing-xl)", maxWidth: "640px" }}>
        <div
          style={{
            backgroundColor: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-xl)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-xl)",
          }}
        >
          {/* Profile Section */}
          <div>
            <h2
              style={{
                fontSize: "var(--font-size-lg)",
                fontWeight: 600,
                margin: "0 0 var(--spacing-md) 0",
                color: "var(--color-text-primary)",
              }}
            >
              Profile
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              <TextField label="Display Name" defaultValue="Admin User" />
              <TextField label="Email" defaultValue="admin@acme.com" />
              <SelectField
                label="Timezone"
                options={["UTC", "US/Eastern", "US/Central", "US/Pacific", "Europe/London"]}
                defaultValue="US/Eastern"
              />
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h2
              style={{
                fontSize: "var(--font-size-lg)",
                fontWeight: 600,
                margin: "0 0 var(--spacing-md) 0",
                color: "var(--color-text-primary)",
              }}
            >
              Notifications
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              <ToggleField label="Email notifications" defaultChecked={true} />
              <ToggleField label="Push notifications" defaultChecked={false} />
              <ToggleField label="Weekly digest" defaultChecked={true} />
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h2
              style={{
                fontSize: "var(--font-size-lg)",
                fontWeight: 600,
                margin: "0 0 var(--spacing-md) 0",
                color: "var(--color-text-primary)",
              }}
            >
              Bio
            </h2>
            <TextAreaField
              label="About"
              defaultValue="Dashboard administrator with full access."
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            style={{
              padding: "var(--spacing-sm) var(--spacing-lg)",
              backgroundColor: "var(--color-accent)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
