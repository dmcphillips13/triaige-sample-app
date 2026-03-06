export function TextField({
  label,
  defaultValue,
  placeholder,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
      <label
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: 500,
          color: "var(--color-text-primary)",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        style={{
          padding: "var(--spacing-sm) var(--spacing-md)",
          border: "1px solid var(--color-border-input)",
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-size-sm)",
          backgroundColor: "var(--color-bg-input)",
          color: "var(--color-text-primary)",
          outline: "none",
        }}
      />
    </div>
  );
}

export function SelectField({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
      <label
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: 500,
          color: "var(--color-text-primary)",
        }}
      >
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        style={{
          padding: "var(--spacing-sm) var(--spacing-md)",
          border: "1px solid var(--color-border-input)",
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-size-sm)",
          backgroundColor: "var(--color-bg-input)",
          color: "var(--color-text-primary)",
          outline: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ToggleField({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <input type="checkbox" defaultChecked={defaultChecked} />
      <label
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-primary)",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export function TextAreaField({
  label,
  defaultValue,
  placeholder,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
      <label
        style={{
          fontSize: "var(--font-size-sm)",
          fontWeight: 500,
          color: "var(--color-text-primary)",
        }}
      >
        {label}
      </label>
      <textarea
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={4}
        style={{
          padding: "var(--spacing-sm) var(--spacing-md)",
          border: "1px solid var(--color-border-input)",
          borderRadius: "var(--radius-md)",
          fontSize: "var(--font-size-sm)",
          backgroundColor: "var(--color-bg-input)",
          color: "var(--color-text-primary)",
          outline: "none",
          resize: "vertical",
        }}
      />
    </div>
  );
}
