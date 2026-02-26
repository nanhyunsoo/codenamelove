"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui";
import { mockPartners } from "@/lib/mock-data";

/**
 * Partner Detail
 * 상세 확인 → Keep / Pass / Ask Agent → 후보군 업데이트
 */
export default function PartnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const partner = mockPartners.find((p) => p.id === id);

  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [showAgentPanel, setShowAgentPanel] = useState(false);

  if (!partner) {
    return (
      <AppShell title="Partner Detail">
        <p className="text-body-secondary">파트너를 찾을 수 없습니다.</p>
        <Link href="/app/search">
          <Button variant="ghost" className="mt-4">
            검색으로 돌아가기
          </Button>
        </Link>
      </AppShell>
    );
  }

  const handleKeep = () => {
    // Mock: 후보군 저장
    router.push("/app/search");
  };

  const handlePass = () => {
    setShowPassConfirm(false);
    router.push("/app/search");
  };

  return (
    <AppShell title={`${partner.name} 상세`}>
      <Breadcrumb
        items={[
          { label: "App", href: "/app/console" },
          { label: "Partner Search", href: "/app/search" },
          { label: partner.name },
        ]}
      />

      <div className="mt-8 max-w-2xl space-y-6">
        <Card variant="elevated">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-headline">
              {partner.name}
            </h2>
            <span className="text-accent-primary font-bold text-xl">
              {partner.compatibilityScore}%
            </span>
          </div>
          <p className="text-body-secondary text-sm mb-2">
            {partner.age}세 · {partner.location}
          </p>
          <p className="text-body">{partner.summary}</p>
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-3">
            적합도 근거
          </h3>
          <ul className="list-disc list-inside text-body-secondary space-y-1">
            {partner.compatibilityReasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-3">
            공통점
          </h3>
          <div className="flex flex-wrap gap-2">
            {partner.commonInterests.map((h) => (
              <Chip key={h} label={h} />
            ))}
          </div>
        </Card>

        {partner.risks.length > 0 && (
          <Card variant="elevated">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">
              참고 사항
            </h3>
            <ul className="list-disc list-inside text-body-secondary space-y-1">
              {partner.risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </Card>
        )}

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleKeep}>Keep (저장)</Button>
          <Button variant="ghost" onClick={() => setShowPassConfirm(true)}>
            Pass
          </Button>
          <Button variant="secondary" onClick={() => setShowAgentPanel(true)}>
            Ask Agent
          </Button>
          <Link href="/app/search">
            <Button variant="ghost">목록으로</Button>
          </Link>
        </div>
      </div>

      <Modal
        isOpen={showPassConfirm}
        onClose={() => setShowPassConfirm(false)}
        title="Pass 확인"
      >
        <p className="text-body mb-6">
          이 후보를 제외할까요? 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setShowPassConfirm(false)}>
            취소
          </Button>
          <Button onClick={handlePass}>Pass</Button>
        </div>
      </Modal>

      {showAgentPanel && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-dark-base rounded-card p-4 shadow-elevation-2 border border-divider">
          <h4 className="font-semibold text-headline mb-2">Ask Agent</h4>
          <p className="text-body-secondary text-sm mb-4">
            에이전트에게 이 후보에 대해 질문해보세요.
          </p>
          <input
            placeholder="질문 입력..."
            className="w-full px-4 py-2 rounded-card bg-card-dark text-body text-sm border border-divider mb-2"
          />
          <Button variant="ghost" onClick={() => setShowAgentPanel(false)}>
            닫기
          </Button>
        </div>
      )}
    </AppShell>
  );
}
