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
    name: "김민지",
    age: 28,
    location: "서울 강남",
    summary: "스타트업 PM, 여행과 요리 좋아함. 장기 연애를 원함.",
    compatibilityScore: 92,
    compatibilityReasons: [
      "비슷한 가치관 (성장, 가족)",
      "취미 겹침 (요리, 독서)",
      "커뮤니케이션 스타일 일치",
    ],
    commonInterests: ["요리", "독서", "여행"],
    risks: ["바쁜 업무로 인한 만남 빈도 제한 가능"],
  },
  {
    id: "p-002",
    name: "이준혁",
    age: 31,
    location: "서울 마포",
    summary: "개발자, 산책과 카페 탐방. 진지한 관계 선호.",
    compatibilityScore: 88,
    compatibilityReasons: [
      "직업군 유사 (IT)",
      "라이프스타일 호환",
      "장기 관계 의향 일치",
    ],
    commonInterests: ["카페", "산책", "음악"],
    risks: [],
  },
  {
    id: "p-003",
    name: "박수진",
    age: 26,
    location: "경기 분당",
    summary: "디자이너, 전시회와 영화. 오픈한 대화 좋아함.",
    compatibilityScore: 85,
    compatibilityReasons: [
      "크리에이티브 성향",
      "소통 방식 유사",
      "취미 일부 겹침",
    ],
    commonInterests: ["영화", "전시", "맛집"],
    risks: ["거리 약 30분"],
  },
];

export const mockConsoleLogs: ConsoleLog[] = [
  { id: "log-1", timestamp: "2026-02-26 10:00:01", level: "info", message: "Agent 빌드 완료" },
  { id: "log-2", timestamp: "2026-02-26 10:00:15", level: "info", message: "학습 데이터 로드 완료" },
  { id: "log-3", timestamp: "2026-02-26 10:01:02", level: "info", message: "Train epoch 1/5 완료" },
];
