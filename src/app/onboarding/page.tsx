"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Stepper from "@/components/ui/Stepper";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Chip from "@/components/ui/Chip";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui";

const STEPS = [
  { id: "relation", label: "관계 형태" },
  { id: "distance", label: "거리/지역" },
  { id: "hobbies", label: "취미/관심사" },
  { id: "preferences", label: "추가 선호" },
  { id: "summary", label: "확인" },
];

const relationshipOptions = [
  { value: "longterm", label: "장기 연애" },
  { value: "casual", label: "캐주얼" },
  { value: "open", label: "오픈 관계" },
  { value: "marriage", label: "결혼 상대" },
];

const distanceOptions = [
  { value: "same_city", label: "같은 도시" },
  { value: "within_1hr", label: "1시간 이내" },
  { value: "any", label: "제한 없음" },
];

const hobbyChips = ["요리", "독서", "여행", "음악", "영화", "산책", "카페", "운동"];

/**
 * Onboarding (Agent Setup)
 * 단계형 폼 → 요약/확인 → 저장 → Agent Console
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [relationshipType, setRelationshipType] = useState("");
  const [distance, setDistance] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");

  const toggleHobby = (h: string) => {
    setHobbies((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      // 저장 후 콘솔로
      router.push("/app/console?tab=build");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else setShowExitConfirm(true);
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <AppShell title="Onboarding">
      <Stepper
        steps={STEPS}
        currentIndex={step}
        onStepClick={(i) => setStep(i)}
      />

      <div className="mt-8 max-w-xl">
        {step === 0 && (
          <>
            <h2 className="text-xl font-semibold text-headline mb-4">
              원하시는 관계 형태를 선택해주세요
            </h2>
            <Select
              options={relationshipOptions}
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
              placeholder="선택"
            />
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold text-headline mb-4">
              선호하는 거리/지역
            </h2>
            <Select
              options={distanceOptions}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="선택"
            />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-headline mb-4">
              관심 있는 취미/관심사 (복수 선택)
            </h2>
            <div className="flex flex-wrap gap-2">
              {hobbyChips.map((h) => (
                <Chip
                  key={h}
                  label={h}
                  selected={hobbies.includes(h)}
                  onToggle={() => toggleHobby(h)}
                />
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold text-headline mb-4">
              추가로 중요한 점을 알려주세요
            </h2>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="예: 대화를 중요시함, 외향적..."
              className="w-full px-4 py-3 rounded-card bg-dark-base text-body border border-divider focus:border-accent-primary focus:outline-none placeholder:text-body-secondary min-h-[120px]"
            />
          </>
        )}
        {step === 4 && (
          <div className="bg-card-dark rounded-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-headline">요약</h2>
            <p className="text-body-secondary">
              관계 형태: {relationshipOptions.find((o) => o.value === relationshipType)?.label ?? "-"}
            </p>
            <p className="text-body-secondary">
              거리: {distanceOptions.find((o) => o.value === distance)?.label ?? "-"}
            </p>
            <p className="text-body-secondary">
              취미: {hobbies.length ? hobbies.join(", ") : "-"}
            </p>
            {preferences && (
              <p className="text-body-secondary">추가: {preferences}</p>
            )}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Button variant="ghost" onClick={handleBack}>
            {step === 0 ? "나가기" : "이전"}
          </Button>
          <Button onClick={handleNext}>
            {step === STEPS.length - 1 ? "저장하고 시작" : "다음"}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        title="온보딩 중단"
      >
        <p className="text-body mb-6">
          온보딩을 중단하면 진행 내용이 저장되지 않습니다. 계속할까요?
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setShowExitConfirm(false)}>
            취소
          </Button>
          <Button onClick={handleExit}>나가기</Button>
        </div>
      </Modal>
    </AppShell>
  );
}
