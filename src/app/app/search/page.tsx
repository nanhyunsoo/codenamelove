"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { Button, Input, Select } from "@/components/ui";
import { mockPartners } from "@/lib/mock-data";

/**
 * Partner Search (Matching)
 * 조건 확인/수정 → 검색 실행 → 결과 리스트 → 상세 보기
 */
export default function SearchPage() {
  const [results] = useState(mockPartners);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <AppShell title="Partner Search">
      <Breadcrumb
        items={[
          { label: "App", href: "/app/console" },
          { label: "Partner Search", href: "/app/search" },
        ]}
      />

      <div className="mt-8 space-y-6">
        {/* 검색 조건 */}
        <Card variant="elevated">
          <h3 className="text-type-h3 font-semibold text-headline mb-4">
            Search criteria
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Relationship type"
              options={[
                { value: "longterm", label: "Long-term" },
                { value: "casual", label: "Casual" },
              ]}
              placeholder="Select"
            />
            <Input label="Location" placeholder="e.g. New York" />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </Card>

        {/* 결과 리스트 */}
        <div>
          <h3 className="text-type-h3 font-semibold text-headline mb-4">
            Results ({results.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((p) => (
              <Link key={p.id} href={`/app/partners/${p.id}`} className="block">
                <Card variant="elevated">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-type-body font-semibold text-headline">{p.name}</h4>
                    <span className="text-type-body-sm text-accent-primary font-medium">
                      {p.compatibilityScore}%
                    </span>
                  </div>
                  <p className="text-type-body-sm text-body-secondary line-clamp-2">
                    {p.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.commonInterests.slice(0, 3).map((h) => (
                      <Chip key={h} label={h} />
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
