"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import PillTabs from "@/components/ui/PillTabs";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui";
import { mockConsoleLogs } from "@/lib/mock-data";

const TABS = [
  { id: "build", label: "Build" },
  { id: "train", label: "Train" },
  { id: "deploy", label: "Deploy" },
];

function ConsoleContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = TABS.some((t) => t.id === tabParam) ? tabParam! : "build";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [trainConfirmOpen, setTrainConfirmOpen] = useState(false);
  const [deployConfirmOpen, setDeployConfirmOpen] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "App", href: "/app/console" },
          { label: "Console", href: "/app/console" },
          { label: activeTab.charAt(0).toUpperCase() + activeTab.slice(1) },
        ]}
      />

      <div className="mt-6">
        <PillTabs
          tabs={TABS}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
        />
      </div>

      <div className="mt-8">
        {activeTab === "build" && (
          <div className="space-y-6 max-w-2xl">
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                에이전트 설정
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                온보딩에서 입력한 선호가 에이전트에 반영됩니다.
              </p>
              <div className="text-body-secondary text-sm">
                <p>• 관계 형태: 장기 연애</p>
                <p>• 거리: 같은 도시</p>
                <p>• 취미: 요리, 독서, 여행</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "train" && (
          <div className="space-y-6">
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                학습 실행
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                에이전트가 선호 데이터를 학습합니다. 약 5–10분 소요됩니다.
              </p>
              <Button onClick={() => setTrainConfirmOpen(true)}>
                Train 실행
              </Button>
            </Card>
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                로그
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {mockConsoleLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`${
                      log.level === "error"
                        ? "text-red-400"
                        : log.level === "warn"
                          ? "text-amber-400"
                          : "text-body-secondary"
                    }`}
                  >
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "deploy" && (
          <div className="space-y-6">
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                배포
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                에이전트를 배포하면 파트너 검색에 사용할 수 있습니다. 공유 범위와
                권한을 확인해주세요.
              </p>
              <Button
                onClick={() => setDeployConfirmOpen(true)}
                disabled={deployed}
              >
                {deployed ? "배포됨" : "Deploy"}
              </Button>
              {deployed && (
                <p className="mt-2 text-accent-primary text-sm font-medium">
                  배포 완료. 공유 링크가 생성되었습니다.
                </p>
              )}
            </Card>
          </div>
        )}
      </div>

      <Modal
        isOpen={trainConfirmOpen}
        onClose={() => setTrainConfirmOpen(false)}
        title="Train 실행 확인"
      >
        <p className="text-body mb-6">
          학습을 실행하면 비용과 시간이 소요됩니다. 계속할까요?
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTrainConfirmOpen(false)}>
            취소
          </Button>
          <Button
            onClick={() => {
              setTrainConfirmOpen(false);
              // Mock: 학습 완료
            }}
          >
            실행
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={deployConfirmOpen}
        onClose={() => setDeployConfirmOpen(false)}
        title="Deploy 확인"
      >
        <p className="text-body mb-6">
          공유 범위: 개인용. 권한: 검색 및 매칭.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setDeployConfirmOpen(false)}>
            취소
          </Button>
          <Button
            onClick={() => {
              setDeployed(true);
              setDeployConfirmOpen(false);
            }}
          >
            Deploy
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default function ConsolePage() {
  return (
    <AppShell
      title="Agent Console"
      statusBadge="Deployed"
    >
      <Suspense fallback={<div className="text-body-secondary">로딩 중...</div>}>
        <ConsoleContent />
      </Suspense>
    </AppShell>
  );
}
