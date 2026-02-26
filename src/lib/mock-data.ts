/**
 * Mock 데이터: 관계형 구조, 고유 ID 포함
 * 실제 API 연동 전 개발/프로토타입용
 */

// 대기자
export interface WaitlistUser {
  id: string;
  email: string;
  source: "landing" | "moltbook";
  status: "waiting" | "invited" | "excluded";
  relationship_intent?: string;
  created_at: string;
}

// 파트너 후보
export interface PartnerCandidate {
  id: string;
  name: string;
  age: number;
  location: string;
  summary: string;
  compatibilityScore: number;
  compatibilityReasons: string[];
  commonInterests: string[];
  risks: string[];
  avatarUrl?: string;
}

// 에이전트 설정
export interface AgentConfig {
  id: string;
  relationshipType: string;
  distance: string;
  hobbies: string[];
  preferences: string;
}

// 콘솔 로그
export interface ConsoleLog {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
}

// Mock 데이터
export const mockWaitlistUsers: WaitlistUser[] = [
  {
    id: "wl-001",
    email: "alice@example.com",
    source: "landing",
    status: "waiting",
    relationship_intent: "Long-term",
    created_at: "2026-02-20T10:00:00Z",
  },
  {
    id: "wl-002",
    email: "bob@example.com",
    source: "moltbook",
    status: "invited",
    created_at: "2026-02-21T14:30:00Z",
  },
  {
    id: "wl-003",
    email: "carol@example.com",
    source: "landing",
    status: "waiting",
    relationship_intent: "Casual",
    created_at: "2026-02-22T09:15:00Z",
  },
];

export const mockPartners: PartnerCandidate[] = [
  {
    id: "p-001",
    name: "Alex",
    age: 28,
    location: "Manhattan, NY",
    summary: "Startup PM. Loves travel and cooking. Looking for a long-term relationship.",
    compatibilityScore: 92,
    compatibilityReasons: [
      "Similar values (growth, family)",
      "Shared hobbies (cooking, reading)",
      "Compatible communication style",
    ],
    commonInterests: ["Cooking", "Reading", "Travel"],
    risks: ["Busy schedule may limit meeting frequency"],
  },
  {
    id: "p-002",
    name: "Jordan",
    age: 31,
    location: "Brooklyn, NY",
    summary: "Software developer. Loves walking and cafe-hopping. Prefers serious relationships.",
    compatibilityScore: 88,
    compatibilityReasons: [
      "Similar career (IT)",
      "Compatible lifestyle",
      "Both seek long-term commitment",
    ],
    commonInterests: ["Cafes", "Walking", "Music"],
    risks: [],
  },
  {
    id: "p-003",
    name: "Sam",
    age: 26,
    location: "Queens, NY",
    summary: "Designer. Enjoys exhibitions and movies. Open and communicative.",
    compatibilityScore: 85,
    compatibilityReasons: [
      "Creative personality",
      "Similar communication style",
      "Some shared interests",
    ],
    commonInterests: ["Movies", "Exhibitions", "Food"],
    risks: ["About 30 min away"],
  },
];

export const mockConsoleLogs: ConsoleLog[] = [
  { id: "log-1", timestamp: "2026-02-26 10:00:01", level: "info", message: "Agent build complete" },
  { id: "log-2", timestamp: "2026-02-26 10:00:15", level: "info", message: "Training data loaded" },
  { id: "log-3", timestamp: "2026-02-26 10:01:02", level: "info", message: "Train epoch 1/5 complete" },
];
