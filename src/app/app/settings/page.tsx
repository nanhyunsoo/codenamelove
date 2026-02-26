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
          <h3 className="text-lg font-semibold text-headline mb-4">Theme</h3>
          <Select
            label="Display mode"
            options={[
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
            ]}
            value="dark"
            onChange={() => {}}
          />
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" defaultChecked className="rounded" />
              Training complete
            </label>
            <label className="flex items-center gap-2 text-body">
              <input type="checkbox" defaultChecked className="rounded" />
              Match recommendations
            </label>
          </div>
        </Card>

        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-headline mb-4">
            Profile & preferences
          </h3>
          <Input label="Name" placeholder="Your name" />
          <div className="mt-4">
            <Button>Save</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
