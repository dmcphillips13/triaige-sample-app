import Header from "@/components/header";
import DataTable from "@/components/data-table";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@acme.com", role: "Admin", status: "Active" as const, lastLogin: "2025-03-01" },
  { id: 2, name: "Bob Smith", email: "bob@acme.com", role: "Editor", status: "Active" as const, lastLogin: "2025-03-02" },
  { id: 3, name: "Carol Williams", email: "carol@acme.com", role: "Viewer", status: "Inactive" as const, lastLogin: "2025-02-15" },
  { id: 4, name: "David Brown", email: "david@acme.com", role: "Editor", status: "Active" as const, lastLogin: "2025-03-03" },
  { id: 5, name: "Eva Martinez", email: "eva@acme.com", role: "Admin", status: "Suspended" as const, lastLogin: "2025-01-20" },
  { id: 6, name: "Frank Lee", email: "frank@acme.com", role: "Viewer", status: "Active" as const, lastLogin: "2025-03-01" },
  { id: 7, name: "Grace Kim", email: "grace@acme.com", role: "Editor", status: "Active" as const, lastLogin: "2025-03-04" },
  { id: 8, name: "Henry Chen", email: "henry@acme.com", role: "Viewer", status: "Inactive" as const, lastLogin: "2025-02-10" },
  { id: 9, name: "Iris Patel", email: "iris@acme.com", role: "Admin", status: "Active" as const, lastLogin: "2025-03-03" },
  { id: 10, name: "Jack Wilson", email: "jack@acme.com", role: "Editor", status: "Active" as const, lastLogin: "2025-03-02" },
  { id: 11, name: "Karen Davis", email: "karen@acme.com", role: "Viewer", status: "Suspended" as const, lastLogin: "2025-01-05" },
  { id: 12, name: "Leo Garcia", email: "leo@acme.com", role: "Editor", status: "Active" as const, lastLogin: "2025-03-04" },
];

export default function UsersPage() {
  return (
    <>
      <Header title="Users" />
      <div style={{ padding: "var(--spacing-xl)" }}>
        <DataTable rows={users} />
      </div>
    </>
  );
}
