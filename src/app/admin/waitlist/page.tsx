"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui";
import { mockWaitlistUsers } from "@/lib/mock-data";

/**
 * Waitlist Admin (Internal)
 * 리스트/필터 → 상세 → 상태 변경 → CSV Export
 */
export default function WaitlistAdminPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [searchEmail, setSearchEmail] = useState("");

  const filtered = mockWaitlistUsers.filter((u) => {
    if (filterStatus !== "all" && u.status !== filterStatus) return false;
    if (filterSource !== "all" && u.source !== filterSource) return false;
    if (
      searchEmail &&
      !u.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
      return false;
    return true;
  });

  const handleExportCSV = () => {
    const headers = ["id", "email", "source", "status", "relationship_intent", "created_at"];
    const rows = filtered.map((u) =>
      headers.map((h) => String((u as unknown as Record<string, unknown>)[h] ?? "")).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Waitlist Admin">
      <Breadcrumb
        items={[
          { label: "App", href: "/app/console" },
          { label: "Admin", href: "/admin/waitlist" },
          { label: "Waitlist" },
        ]}
      />

      <div className="mt-8 space-y-6">
        {/* 필터 */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">Filter</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              label="Search email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Search..."
            />
            <Select
              label="Status"
              options={[
                { value: "all", label: "All" },
                { value: "waiting", label: "Waiting" },
                { value: "invited", label: "Invited" },
                { value: "excluded", label: "Excluded" },
              ]}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            />
            <Select
              label="Source"
              options={[
                { value: "all", label: "All" },
                { value: "landing", label: "Landing" },
                { value: "moltbook", label: "Moltbook" },
              ]}
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
            />
            <div className="flex items-end">
              <Button onClick={handleExportCSV} variant="secondary">
                CSV Export
              </Button>
            </div>
          </div>
        </Card>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="elevated">
            <p className="text-body-secondary text-sm">Total</p>
            <p className="text-2xl font-bold text-headline">
              {mockWaitlistUsers.length}
            </p>
          </Card>
          <Card variant="elevated">
            <p className="text-body-secondary text-sm">Waiting</p>
            <p className="text-2xl font-bold text-headline">
              {mockWaitlistUsers.filter((u) => u.status === "waiting").length}
            </p>
          </Card>
          <Card variant="elevated">
            <p className="text-body-secondary text-sm">Invited</p>
            <p className="text-2xl font-bold text-headline">
              {mockWaitlistUsers.filter((u) => u.status === "invited").length}
            </p>
          </Card>
          <Card variant="elevated">
            <p className="text-body-secondary text-sm">Excluded</p>
            <p className="text-2xl font-bold text-headline">
              {mockWaitlistUsers.filter((u) => u.status === "excluded").length}
            </p>
          </Card>
        </div>

        {/* 리스트 */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">
            Waitlist ({filtered.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider text-left">
                  <th className="py-3 px-4 text-body-secondary">Email</th>
                  <th className="py-3 px-4 text-body-secondary">Source</th>
                  <th className="py-3 px-4 text-body-secondary">Status</th>
                  <th className="py-3 px-4 text-body-secondary">Intent</th>
                  <th className="py-3 px-4 text-body-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-divider/50">
                    <td className="py-3 px-4 text-body">{u.email}</td>
                    <td className="py-3 px-4 text-body-secondary">{u.source}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-pill text-xs ${
                          u.status === "invited"
                            ? "bg-accent-primary/20 text-accent-primary"
                            : u.status === "excluded"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-card-dark text-body"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-body-secondary">
                      {u.relationship_intent ?? "-"}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        className="bg-card-dark text-body rounded px-2 py-1 text-xs"
                        value={u.status}
                        onChange={(e) => {
                          const v = e.target.value as
                            | "waiting"
                            | "invited"
                            | "excluded";
                          // Mock: 상태 변경
                          console.log("status change", u.id, v);
                        }}
                      >
                        <option value="waiting">Waiting</option>
                        <option value="invited">Invite</option>
                        <option value="excluded">Exclude</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
