"use client";

/**
 * Pill Tabs: Build / Train / Deploy 스타일
 * design.json: tabDefault surface #1C1C1F, tabActive #F05A28
 */
interface Tab {
  id: string;
  label: string;
}

interface PillTabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function PillTabs({
  tabs,
  activeId,
  onChange,
  className = "",
}: PillTabsProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 rounded-pill bg-transparent ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`
              px-[18px] py-2 rounded-pill text-type-body-sm font-medium transition-colors focus-ring
              ${
                isActive
                  ? "bg-accent-primary text-cta-dark"
                  : "bg-card-dark text-body hover:bg-card-dark-hover"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
