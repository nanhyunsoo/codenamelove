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
          <h3 className="text-lg font-semibold text-headline mb-4">
            검색 조건
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Select
              label="관계 형태"
              options={[
                { value: "longterm", label: "장기 연애" },
                { value: "casual", label: "캐주얼" },
              ]}
              placeholder="선택"
            />
            <Input label="지역" placeholder="서울" />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "검색 중..." : "검색 실행"}
          </Button>
        </Card>

        {/* 결과 리스트 */}
        <div>
          <h3 className="text-lg font-semibold text-headline mb-4">
            검색 결과 ({results.length})
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((p) => (
              <Link key={p.id} href={`/app/partners/${p.id}`} className="block">
                <Card variant="elevated">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-headline">{p.name}</h4>
                    <span className="text-accent-primary font-medium">
                      {p.compatibilityScore}%
                    </span>
                  </div>
                  <p className="text-body-secondary text-sm line-clamp-2">
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
