"use client";

import AppShell from "@/components/layout/AppShell";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui";

/**
 * Settings: 테마, 알림, 개인정보/선호 수정
 */
export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <Breadcrumb
        items={[
          { label: "App", href: "/app/console" },
          { label: "Settings" },
        ]}
      />

      <div className="mt-8 max-w-xl space-y-6">
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">테마</h3>
          <Select
            label="화면 모드"
            options={[
              { value: "dark", label: "다크" },
              { value: "light", label: "라이트" },
            ]}
            value="dark"
            onChange={() => {}}
          />
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">알림</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" defaultChecked className="rounded" />
              학습 완료 알림
            </label>
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" defaultChecked className="rounded" />
              매칭 추천 알림
            </label>
          </div>
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">
            개인정보/선호
          </h3>
          <Input label="이름" placeholder="이름" />
          <div className="mt-4">
            <Button>저장</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
