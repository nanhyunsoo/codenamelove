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
                Agent settings
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                Preferences from onboarding are applied to the Agent.
              </p>
              <div className="text-body-secondary text-sm">
                <p>• Relationship: Long-term</p>
                <p>• Distance: Same city</p>
                <p>• Hobbies: Cooking, Reading, Travel</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "train" && (
          <div className="space-y-6">
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                Run training
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                The Agent learns from your preference data. Takes about 5–10 minutes.
              </p>
              <Button onClick={() => setTrainConfirmOpen(true)}>
                Run Train
              </Button>
            </Card>
            <Card variant="elevated">
              <h3 className="text-lg font-semibold text-headline mb-4">
                Logs
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
                Deploy
              </h3>
              <p className="text-body-secondary text-sm mb-4">
                Deploy the Agent to use it for partner search. Confirm sharing scope and permissions.
              </p>
              <Button
                onClick={() => setDeployConfirmOpen(true)}
                disabled={deployed}
              >
                {deployed ? "Deployed" : "Deploy"}
              </Button>
              {deployed && (
                <p className="mt-2 text-accent-primary text-sm font-medium">
                  Deploy complete. Share link generated.
                </p>
              )}
            </Card>
          </div>
        )}
      </div>

      <Modal
        isOpen={trainConfirmOpen}
        onClose={() => setTrainConfirmOpen(false)}
        title="Confirm Train"
      >
        <p className="text-body mb-6">
          Running training will use resources and time. Continue?
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTrainConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setTrainConfirmOpen(false);
            }}
          >
            Run
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={deployConfirmOpen}
        onClose={() => setDeployConfirmOpen(false)}
        title="Confirm Deploy"
      >
        <p className="text-body mb-6">
          Sharing scope: Personal. Permissions: Search & match.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setDeployConfirmOpen(false)}>
            Cancel
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
      <Suspense fallback={<div className="text-body-secondary">Loading...</div>}>
        <ConsoleContent />
      </Suspense>
    </AppShell>
  );
}
