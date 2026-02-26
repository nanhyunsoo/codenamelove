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
  { id: "relation", label: "Relationship type" },
  { id: "distance", label: "Distance/Location" },
  { id: "hobbies", label: "Hobbies/Interests" },
  { id: "preferences", label: "Additional preferences" },
  { id: "summary", label: "Summary" },
];

const relationshipOptions = [
  { value: "longterm", label: "Long-term" },
  { value: "casual", label: "Casual" },
  { value: "open", label: "Open relationship" },
  { value: "marriage", label: "Marriage" },
];

const distanceOptions = [
  { value: "same_city", label: "Same city" },
  { value: "within_1hr", label: "Within 1 hour" },
  { value: "any", label: "No limit" },
];

const hobbyChips = ["Cooking", "Reading", "Travel", "Music", "Movies", "Walking", "Cafes", "Fitness"];

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
            <h2 className="text-type-h3 font-semibold text-headline mb-4">
              Select your preferred relationship type
            </h2>
            <Select
              options={relationshipOptions}
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
              placeholder="Select"
            />
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-type-h3 font-semibold text-headline mb-4">
              Preferred distance/location
            </h2>
            <Select
              options={distanceOptions}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Select"
            />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-type-h3 font-semibold text-headline mb-4">
              Hobbies and interests (select multiple)
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
            <h2 className="text-type-h3 font-semibold text-headline mb-4">
              Anything else that matters to you
            </h2>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g. Values communication, extroverted..."
              className="w-full px-4 py-3 rounded-card bg-dark-base text-type-body text-body border border-divider focus:border-accent-primary focus:outline-none placeholder:text-body-secondary min-h-[120px]"
            />
          </>
        )}
        {step === 4 && (
          <div className="bg-card-dark rounded-card p-6 space-y-4">
            <h2 className="text-type-h3 font-semibold text-headline">Summary</h2>
            <p className="text-type-body-sm text-body-secondary">
              Relationship: {relationshipOptions.find((o) => o.value === relationshipType)?.label ?? "-"}
            </p>
            <p className="text-type-body-sm text-body-secondary">
              Distance: {distanceOptions.find((o) => o.value === distance)?.label ?? "-"}
            </p>
            <p className="text-type-body-sm text-body-secondary">
              Hobbies: {hobbies.length ? hobbies.join(", ") : "-"}
            </p>
            {preferences && (
              <p className="text-type-body-sm text-body-secondary">Additional: {preferences}</p>
            )}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Button variant="ghost" onClick={handleBack}>
            {step === 0 ? "Exit" : "Back"}
          </Button>
          <Button onClick={handleNext}>
            {step === STEPS.length - 1 ? "Save & Start" : "Next"}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        title="Leave onboarding?"
      >
        <p className="text-type-body mb-6">
          Your progress will not be saved if you leave. Continue?
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setShowExitConfirm(false)}>
            Cancel
          </Button>
          <Button onClick={handleExit}>Exit</Button>
        </div>
      </Modal>
    </AppShell>
  );
}
